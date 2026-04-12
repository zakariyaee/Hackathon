<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use App\Mail\TeamStatusUpdated;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Response;

class TeamController extends Controller
{
    public function index()
    {
        return Team::latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'teamName'    => 'required|string|unique:teams,team_name',
            'memberCount' => 'required|integer|min:1|max:4',
            'projectIdea' => 'required|string',
            'leaderName'  => 'required|string',
            'email'       => 'required|email|unique:teams,email',
            'phone'       => 'required|string',
        ]);

        $team = Team::create([
            'team_name'    => $validated['teamName'],
            'member_count' => $validated['memberCount'],
            'project_idea' => $validated['projectIdea'],
            'leader_name'  => $validated['leaderName'],
            'email'        => $validated['email'],
            'phone'        => $validated['phone'],
            'status'       => 'pending',
        ]);

        return response()->json([
            'message' => 'Votre inscription a été reçue avec succès ! Veuillez patienter, le club Infotech du ENSA Tétouan  traitera votre demande dans les plus brefs délais.',
            'team' => $team,
        ], 201);
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
        $csvHeader = ['ID', 'Team Name', 'Members', 'Project Idea', 'Leader', 'Email', 'Phone', 'Status', 'Date'];

        $callback = function() use ($teams, $csvHeader) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $csvHeader);
            foreach ($teams as $team) {
                fputcsv($file, [
                    $team->id,
                    $team->team_name,
                    $team->member_count,
                    $team->project_idea,
                    $team->leader_name,
                    $team->email,
                    $team->phone,
                    $team->status,
                    $team->created_at,
                ]);
            }
            fclose($file);
        };

        return Response::stream($callback, 200, [
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=teams_export.csv',
            'Pragma'              => 'no-cache',
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Expires'             => '0',
        ]);
    }
}
