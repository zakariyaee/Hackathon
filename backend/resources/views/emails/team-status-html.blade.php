<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Code Wars Hackathon 2026</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #0f1729;
      font-family: 'Inter', Arial, sans-serif;
      color: #e2e8f0;
      -webkit-font-smoothing: antialiased;
    }

    .wrapper {
      max-width: 620px;
      margin: 0 auto;
      padding: 32px 16px;
    }

    /* ── Header ── */
    .header {
      background: linear-gradient(135deg, #1e2d4d 0%, #162040 100%);
      border: 1px solid rgba(99, 179, 237, 0.15);
      border-radius: 16px 16px 0 0;
      padding: 32px 40px 24px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 200px; height: 200px;
      background: radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 70%);
      border-radius: 50%;
    }

    /* Logo CW */
    .logo-wrap {
      display: inline-block;
      text-align: center;
      margin-bottom: 20px;
    }
    .logo-row {
      display: inline-block;
      vertical-align: middle;
    }
    .logo-icon {
      display: inline-block;
      width: 40px; height: 40px;
      background: linear-gradient(135deg, #63b3ed, #4299e1);
      border-radius: 10px;
      font-weight: 800;
      font-size: 15px;
      color: #fff;
      letter-spacing: -0.5px;
      text-align: center;
      line-height: 40px;
      vertical-align: middle;
    }
    .logo-name {
      display: inline-block;
      font-size: 20px;
      font-weight: 700;
      color: #f8fafc;
      letter-spacing: -0.3px;
      vertical-align: middle;
      margin-left: 8px;
    }
    .logo-badge {
      display: inline-block;
      font-size: 11px;
      background: rgba(99,179,237,0.18);
      color: #90cdf4;
      border: 1px solid rgba(99,179,237,0.3);
      border-radius: 20px;
      padding: 2px 8px;
      font-weight: 600;
      vertical-align: middle;
      margin-left: 6px;
    }

    .header-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    .header-divider span.line {
      height: 1px; width: 48px;
      background: rgba(99,179,237,0.3);
      display: inline-block;
    }
    .header-subtitle {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #90cdf4;
    }

    /* ── Body card ── */
    .body-card {
      background: #162040;
      border: 1px solid rgba(99,179,237,0.12);
      border-top: none;
      padding: 36px 40px;
    }

    .greeting {
      font-size: 15px;
      color: #94a3b8;
      margin-bottom: 20px;
    }
    .greeting strong { color: #e2e8f0; }

    /* ── Status banner ── */
    .status-banner {
      border-radius: 12px;
      padding: 20px 24px;
      margin-bottom: 28px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }
    .status-banner.confirmed {
      background: rgba(72,187,120,0.08);
      border: 1px solid rgba(72,187,120,0.25);
    }
    .status-banner.rejected {
      background: rgba(252,129,129,0.07);
      border: 1px solid rgba(252,129,129,0.2);
    }
    .status-icon {
      width: 42px; height: 42px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
    }
    .status-icon.confirmed { background: rgba(72,187,120,0.15); }
    .status-icon.rejected  { background: rgba(252,129,129,0.12); }
    .status-text h2 {
      font-size: 18px; font-weight: 700;
      color: #f8fafc; margin-bottom: 4px;
    }
    .status-text p { font-size: 13px; color: #94a3b8; line-height: 1.5; }

    /* ── Team details box ── */
    .details-box {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(99,179,237,0.1);
      border-radius: 12px;
      padding: 20px 24px;
      margin-bottom: 28px;
    }
    .details-box h3 {
      font-size: 11px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.15em;
      color: #63b3ed; margin-bottom: 16px;
    }
    .detail-row {
      display: flex; align-items: flex-start;
      gap: 12px; margin-bottom: 12px;
    }
    .detail-row:last-child { margin-bottom: 0; }
    .detail-icon {
      font-size: 14px; width: 20px; flex-shrink: 0;
      padding-top: 1px;
    }
    .detail-label { font-size: 11px; color: #64748b; margin-bottom: 1px; }
    .detail-value { font-size: 14px; color: #e2e8f0; font-weight: 500; }

    /* Steps (for confirmed) */
    .steps { margin-bottom: 28px; }
    .steps h3 {
      font-size: 11px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.15em;
      color: #63b3ed; margin-bottom: 14px;
    }
    .step { display: flex; gap: 12px; margin-bottom: 10px; align-items: flex-start; }
    .step-num {
      width: 24px; height: 24px; border-radius: 50%;
      background: rgba(99,179,237,0.15);
      border: 1px solid rgba(99,179,237,0.3);
      color: #90cdf4; font-size: 12px; font-weight: 700;
      text-align: center;
      line-height: 22px;
      display: inline-block;
      flex-shrink: 0;
      margin-top: 0;
    }
    .step p { font-size: 13px; color: #94a3b8; line-height: 1.5; }

    /* CTA Button */
    .cta-wrap { text-align: center; margin-bottom: 24px; }
    .cta-btn {
      display: inline-block; padding: 13px 36px;
      border-radius: 10px; font-size: 14px; font-weight: 700;
      text-decoration: none; letter-spacing: 0.02em;
    }
    .cta-btn.confirmed {
      background: #48bb78; color: #fff;
    }
    .cta-btn.rejected {
      background: rgba(99,179,237,0.15);
      color: #90cdf4;
      border: 1px solid rgba(99,179,237,0.3);
    }

    /* ── Footer ── */
    .footer-card {
      background: #0f1729;
      border: 1px solid rgba(99,179,237,0.1);
      border-top: none;
      border-radius: 0 0 16px 16px;
      padding: 24px 40px;
      text-align: center;
    }
    .footer-card p {
      font-size: 12px; color: #475569; line-height: 1.7;
    }
    .footer-card .brand {
      font-weight: 700; color: #63b3ed;
    }
    .footer-divider {
      height: 1px;
      background: rgba(99,179,237,0.08);
      margin: 14px 0;
    }
    .meta-badge {
      display: inline-flex; gap: 6px; align-items: center;
      font-size: 11px; color: #475569;
    }
    .dot { color: rgba(99,179,237,0.4); }
  </style>
</head>
<body>
<div class="wrapper">

  {{-- HEADER --}}
  <div class="header">
    <div class="logo-wrap">
      <span class="logo-icon">CW</span><span class="logo-name">Code Wars</span><span class="logo-badge">2026</span>
    </div>
    <div class="header-divider">
      <span class="line"></span>
      <span class="header-subtitle">Hackathon &middot; ENSA Tétouan</span>
      <span class="line"></span>
    </div>
  </div>

  {{-- BODY --}}
  <div class="body-card">

    <p class="greeting">Bonjour, <strong>{{ $team->leader_name }}</strong> 👋</p>

    @if($team->status === 'confirmed')

    {{-- Status banner: CONFIRMED --}}
    <div class="status-banner confirmed">
      <div class="status-icon confirmed">🎉</div>
      <div class="status-text">
        <h2>Votre inscription est confirmée !</h2>
        <p>Félicitations ! Le club Infotech a examiné et validé votre demande d'inscription au Code Wars Hackathon 2026.</p>
      </div>
    </div>

    {{-- Team details --}}
    <div class="details-box">
      <h3>Détails de votre équipe</h3>
      <div class="detail-row">
        <span class="detail-icon">👥</span>
        <div>
          <div class="detail-label">Nom de l'équipe</div>
          <div class="detail-value">{{ $team->team_name }}</div>
        </div>
      </div>
      <div class="detail-row">
        <span class="detail-icon">👤</span>
        <div>
          <div class="detail-label">Chef d'équipe</div>
          <div class="detail-value">{{ $team->leader_name }}</div>
        </div>
      </div>
      <div class="detail-row">
        <span class="detail-icon">🔢</span>
        <div>
          <div class="detail-label">Nombre de membres</div>
          <div class="detail-value">{{ $team->member_count }} membre(s)</div>
        </div>
      </div>
      <div class="detail-row">
        <span class="detail-icon">💡</span>
        <div>
          <div class="detail-label">Sujet du projet</div>
          <div class="detail-value">{{ $team->project_idea }}</div>
        </div>
      </div>
    </div>

    {{-- Next steps --}}
    <div class="steps">
      <h3>Prochaines étapes</h3>
      <div class="step">
        <span class="step-num">1</span>
        <p>Pr&eacute;parez votre &eacute;quipe et affinez votre projet avant le <strong>17 Mai 2026</strong>.</p>
      </div>
      <div class="step">
        <span class="step-num">2</span>
        <p>Le club Infotech vous contactera avec les informations pratiques de l'&eacute;v&eacute;nement.</p>
      </div>
      <div class="step">
        <span class="step-num">3</span>
        <p>Soyez pr&ecirc;ts &agrave; pr&eacute;senter votre id&eacute;e devant le jury pendant <strong>15 minutes</strong>.</p>
      </div>
    </div>

    <div class="cta-wrap">
      <a href="#" class="cta-btn confirmed">Voir les détails de l'événement &rarr;</a>
    </div>

    @elseif($team->status === 'rejected')

    {{-- Status banner: REJECTED --}}
    <div class="status-banner rejected">
      <div class="status-icon rejected">❌</div>
      <div class="status-text">
        <h2>Mise à jour de votre inscription</h2>
        <p>Après examen de votre dossier, votre inscription n'a malheureusement pas pu être retenue pour cette édition.</p>
      </div>
    </div>

    {{-- Team details --}}
    <div class="details-box">
      <h3>Dossier examiné</h3>
      <div class="detail-row">
        <span class="detail-icon">👥</span>
        <div>
          <div class="detail-label">Nom de l'équipe</div>
          <div class="detail-value">{{ $team->team_name }}</div>
        </div>
      </div>
      <div class="detail-row">
        <span class="detail-icon">💡</span>
        <div>
          <div class="detail-label">Sujet soumis</div>
          <div class="detail-value">{{ $team->project_idea }}</div>
        </div>
      </div>
    </div>

    <p style="font-size:13px; color:#94a3b8; line-height:1.7; margin-bottom:24px;">
      <strong style="color:#e2e8f0;">Raisons possibles :</strong> le nombre maximum d'équipes peut avoir été atteint,
      ou le sujet que vous avez choisi n'est pas conforme au thème du Hackathon de cette année.<br><br>
      Si vous pensez qu'il s'agit d'une erreur ou souhaitez des précisions, n'hésitez pas à nous contacter.
    </p>



    @endif

  </div>{{-- end body-card --}}

  {{-- FOOTER --}}
  <div class="footer-card">
    <div class="meta-badge">
      <span>📅 17 Mai 2026</span>
      <span class="dot">&bull;</span>
      <span>📍 ENSA Tétouan</span>
      <span class="dot">&bull;</span>
      <span>🏆 5 000 MAD en prix</span>
    </div>
    <div class="footer-divider"></div>
    <p>
      Cet e-mail vous a été envoyé par le <span class="brand">Club Infotech — ENSA Tétouan</span><br>
      organisateur du <span class="brand">Code Wars Hackathon 2026</span>.<br>
      Si vous n'êtes pas le destinataire concerné, veuillez ignorer ce message.
    </p>
  </div>

</div>
</body>
</html>
