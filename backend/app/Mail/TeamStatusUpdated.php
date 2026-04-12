<?php

namespace App\Mail;

use App\Models\Team;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TeamStatusUpdated extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Team $team) {}

    public function envelope(): Envelope
    {
        $subject = match($this->team->status) {
            'confirmed' => '✅ Votre inscription au Code Wars Hackathon est confirmée !',
            'rejected'  => '❌ Mise à jour concernant votre inscription au Code Wars Hackathon',
            default     => 'Mise à jour de votre inscription',
        };

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        return new Content(view: 'emails.team-status-html', with: ['team' => $this->team]);
    }
}
