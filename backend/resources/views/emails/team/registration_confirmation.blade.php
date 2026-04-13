<x-mail::message>
# Inscription reçue avec succès !

Bonjour l'équipe **{{ $teamName }}**,

Votre inscription au Hackathon a bien été enregistrée. Nous sommes ravis de vous compter parmi les participants potentiels !

Votre demande est actuellement **en attente de traitement**. Le comité d'organisation va examiner votre projet dans les plus brefs délais.

### Suivi de votre dossier
Vous pouvez suivre l'état d'avancement de votre inscription sur notre portail en utilisant le numéro de suivi suivant :

<x-mail::panel>
**Code de suivi : {{ $trackingNumber }}**
</x-mail::panel>

<x-mail::button :url="config('app.url') . '/track?code=' . $trackingNumber">
Suivre ma demande
</x-mail::button>

Merci et à bientôt !

L'équipe d'organisation,
{{ config('app.name') }}
</x-mail::message>
