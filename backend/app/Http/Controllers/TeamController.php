<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use App\Mail\TeamStatusUpdated;
use App\Mail\TeamRegistrationConfirmation;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;

class TeamController extends Controller
{
    public function index()
    {
        return Team::latest()->paginate(10);
    }

    public function store(Request $request)
    {
        $ip = $request->ip();

        // Check if this IP has already registered 3 times
        $registrationCount = Team::where('ip_address', $ip)->count();

        if ($registrationCount >= 3) {
            \Log::channel('security')->warning("Security Alert: IP address $ip attempted a 4th registration.");
            return response()->json([
                'message' => "Désolé, vous avez déjà atteint la limite d'inscriptions autorisées (3) pour cette adresse IP."
            ], 403);
        }

        $validated = $request->validate([
            'teamName'    => 'required|string|unique:teams,team_name',
            'memberCount' => 'required|integer|min:1|max:2',
            'projectIdea' => 'required|string',
            'leaderName'  => 'required|string',
            'email'       => 'required|email|unique:teams,email',
            'phone'       => 'required|string',
        ], [
            'email.unique' => 'Cet email est déjà utilisé pour une inscription.',
            'memberCount.max' => 'Le nombre maximum de membres par équipe est de 2.',
        ]);

        $trackingNumber = $this->generateTrackingNumber();

        $team = Team::create([
            'team_name'       => $validated['teamName'],
            'member_count'    => $validated['memberCount'],
            'project_idea'    => $validated['projectIdea'],
            'leader_name'     => $validated['leaderName'],
            'email'           => $validated['email'],
            'phone'           => $validated['phone'],
            'ip_address'      => $ip,
            'status'          => 'pending',
            'tracking_number' => $trackingNumber,
        ]);

        // Envoyer l'e-mail de confirmation d'inscription
        try {
            Mail::to($team->email)->send(new TeamRegistrationConfirmation($team));
        } catch (\Exception $e) {
            \Log::error('Registration Email sending failed: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Votre inscription a été reçue avec succès ! Un e-mail de confirmation a été envoyé à ' . $team->email,
            'team' => $team,
        ], 201);
    }

    public function track($tracking_number)
    {
        $team = Team::where('tracking_number', $tracking_number)->first();

        if (!$team) {
            return response()->json([
                'message' => 'Aucune demande trouvée avec ce numéro de suivi.'
            ], 404);
        }

        return response()->json($team);
    }

    public function updateStatus(Request $request, Team $team)
    {
        $request->validate([
            'status' => 'required|in:confirmed,rejected,pending',
        ]);

        $team->update(['status' => $request->status]);

        // Envoyer l'e-mail de notification
        try {
            Mail::to($team->email)->send(new TeamStatusUpdated($team));
        } catch (\Exception $e) {
            // On log l'erreur sans bloquer la réponse
            \Log::error('Mail sending failed: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Statut mis à jour avec succès.',
            'team'    => $team,
        ]);
    }

    public function stats()
    {
        return [
            'total_teams'   => Team::count(),
            'total_members' => Team::sum('member_count'),
            'status_counts' => Team::selectRaw('status, count(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status'),
        ];
    }

    public function export()
    {
        $teams = Team::all();
        
        $output = "
        <table border='1'>
            <tr>
                <th style='background-color: #63b3ed; color: white;'>ID</th>
                <th style='background-color: #63b3ed; color: white;'>Nom de l'équipe</th>
                <th style='background-color: #63b3ed; color: white;'>Membres</th>
                <th style='background-color: #63b3ed; color: white;'>Sujet du projet</th>
                <th style='background-color: #63b3ed; color: white;'>Chef d'équipe</th>
                <th style='background-color: #63b3ed; color: white;'>Email</th>
                <th style='background-color: #63b3ed; color: white;'>Téléphone</th>
                <th style='background-color: #63b3ed; color: white;'>Statut</th>
                <th style='background-color: #63b3ed; color: white;'>Date d'inscription</th>
            </tr>";

        foreach ($teams as $timeout) {
            $output .= "
            <tr>
                <td>{$timeout->id}</td>
                <td>{$timeout->team_name}</td>
                <td>{$timeout->member_count}</td>
                <td>{$timeout->project_idea}</td>
                <td>{$timeout->leader_name}</td>
                <td>{$timeout->email}</td>
                <td>{$timeout->phone}</td>
                <td>{$timeout->status}</td>
                <td>{$timeout->created_at}</td>
            </tr>";
        }
        $output .= "</table>";

        return Response::make($output, 200, [
            'Content-type'        => 'application/vnd.ms-excel',
            'Content-Disposition' => 'attachment; filename=teams_export.xls',
            'Pragma'              => 'no-cache',
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Expires'             => '0',
        ]);
    }

    private function generateTrackingNumber()
    {
        do {
            $code = 'HT-' . strtoupper(Str::random(5));
        } while (Team::where('tracking_number', $code)->exists());

        return $code;
    }
}
