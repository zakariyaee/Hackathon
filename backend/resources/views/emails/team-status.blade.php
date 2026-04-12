@component('mail::message')
# Bonjour, {{ $team->leader_name }} !

@if($team->status === 'confirmed')
## 🎉 Votre inscription est **confirmée** !

Nous avons le plaisir de vous informer que l'inscription de votre équipe **{{ $team->team_name }}** au **Code Wars Hackathon 2026** a été officiellement **confirmée** par le club organisateur.

**Détails de votre équipe :**
- 👥 **Équipe :** {{ $team->team_name }}
- 👤 **Chef d'équipe :** {{ $team->leader_name }}
- 🔢 **Nombre de membres :** {{ $team->member_count }}
- 💡 **Sujet du projet :** {{ $team->project_idea }}

@component('mail::button', ['url' => '#', 'color' => 'success'])
Voir les détails de l'événement
@endcomponent

Préparez-vous pour une journée riche en innovation, collaboration et compétition ! L'équipe du Code Wars vous contactera prochainement avec plus d'informations.

@elseif($team->status === 'rejected')
## Mise à jour concernant votre inscription

Nous vous informons que l'inscription de votre équipe **{{ $team->team_name }}** au **Code Wars Hackathon 2026** n'a malheureusement **pas pu être retenue** lors de cette édition.

**Raisons possibles :**
- Le nombre maximum d'équipes a été atteint.
- Le Sujet que vous avez choisi n'est pas conforme au thème du Hackathon de cette année.

Si vous pensez qu'il s'agit d'une erreur ou si vous souhaitez plus d'informations, n'hésitez pas à nous contacter directement.

@component('mail::button', ['url' => '#', 'color' => 'red'])
Contactez-nous
@endcomponent

@else
Merci de votre intérêt pour le Code Wars Hackathon 2026. Votre demande est actuellement **en cours de traitement**.
@endif

Merci de votre participation,

**L'équipe du Code Wars Hackathon 2026**
ENSA Tétouan
@endcomponent
