import { BRAND } from './content';

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export function firstName(name: string) {
  return name.replace(/[\r\n]+/g, ' ').trim().split(/\s+/)[0] || 'du';
}

interface ConfirmationInput { name: string; email: string; message: string; siteUrl: string; }

/** Bestätigungsmail an den Absender: dunkles BOUND-FOR-FUTURE-Design mit animiertem Header-GIF. */
export function confirmationMail({ name, email, message, siteUrl }: ConfirmationInput) {
  const first = firstName(name);
  const subject = `Hey ${first}, vielen Dank für Ihre Anfrage — ${BRAND.name}`;
  const gif = `${siteUrl}/mail/welcome.gif`;
  const accent = '#FF6A3D';
  const msgHtml = esc(message).replace(/\r?\n/g, '<br>');

  const step = (n: string, t: string, d: string) => `
    <tr>
      <td width="44" valign="top" style="padding:10px 0;font:500 12px 'Courier New',monospace;letter-spacing:.18em;color:${accent};">${n}</td>
      <td style="padding:10px 0;border-bottom:1px solid #1a2230;">
        <div style="font:600 15px Arial,Helvetica,sans-serif;color:#EAEEF6;">${t}</div>
        <div style="font:400 14px/1.5 Arial,Helvetica,sans-serif;color:#9AA5B8;">${d}</div>
      </td>
    </tr>`;

  const html = `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#04060B;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#04060B;">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#0B1018;border-radius:16px;overflow:hidden;border:1px solid #1a2230;">
    <tr><td style="line-height:0;"><img src="${gif}" width="600" alt="BOUND FOR FUTURE — Nächster Stopp: Zukunft." style="display:block;width:100%;max-width:600px;height:auto;border:0;"></td></tr>
    <tr><td style="height:3px;background:${accent};font-size:0;line-height:0;">&nbsp;</td></tr>
    <tr><td style="padding:36px 36px 8px;">
      <div style="font:700 30px/1.15 Arial,Helvetica,sans-serif;color:#EAEEF6;letter-spacing:-.02em;">Hey ${esc(first)},</div>
      <p style="margin:14px 0 0;font:400 17px/1.6 Arial,Helvetica,sans-serif;color:#C9D1DF;">vielen Dank für Ihre Anfrage! Wir haben Ihre Nachricht erhalten und melden uns <strong style="color:#EAEEF6;">innerhalb von 24 Stunden</strong> persönlich bei Ihnen.</p>
    </td></tr>
    <tr><td style="padding:22px 36px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${step('01', 'Wir lesen Ihre Anfrage', 'Unser Team schaut sich Ihr Anliegen in Ruhe an.')}
        ${step('02', 'Wir melden uns', 'Per E-Mail oder Telefon — mit ersten Ideen und einem Terminvorschlag.')}
        ${step('03', 'Wir starten', 'Gemeinsam bringen wir Ihr Projekt auf Kurs.')}
      </table>
    </td></tr>
    <tr><td style="padding:26px 36px 0;">
      <div style="font:500 11px 'Courier New',monospace;letter-spacing:.2em;text-transform:uppercase;color:#78849A;margin-bottom:10px;">Ihre Nachricht</div>
      <div style="background:#070A12;border:1px solid #1a2230;border-radius:12px;padding:16px 18px;font:400 14px/1.6 Arial,Helvetica,sans-serif;color:#C9D1DF;">
        <strong style="color:#EAEEF6;">${esc(name)}</strong> · ${esc(email)}<br><br>${msgHtml}
      </div>
    </td></tr>
    <tr><td align="left" style="padding:30px 36px 36px;">
      <a href="${siteUrl}" style="display:inline-block;background:${accent};color:#0A0A0A;font:700 15px Arial,Helvetica,sans-serif;text-decoration:none;padding:14px 26px;border-radius:999px;">Website ansehen →</a>
      <span style="font:400 14px Arial,Helvetica,sans-serif;color:#9AA5B8;margin-left:14px;">oder rufen Sie uns an: <a href="tel:${BRAND.phoneHref}" style="color:#EAEEF6;">${esc(BRAND.phone)}</a></span>
    </td></tr>
    <tr><td style="padding:22px 36px;background:#070A12;border-top:1px solid #1a2230;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:#78849A;">
      <strong style="color:#9AA5B8;">${BRAND.name}</strong> — ${BRAND.tagline}<br>
      ${esc(BRAND.operator)} · Kirchbachstraße 200 · 28211 Bremen<br>
      <a href="${siteUrl}/impressum" style="color:#9AA5B8;">Impressum</a> · <a href="${siteUrl}/datenschutz" style="color:#9AA5B8;">Datenschutz</a> · <a href="${siteUrl}/agb" style="color:#9AA5B8;">AGB</a><br><br>
      Diese E-Mail wurde automatisch versendet, weil über unser Kontaktformular eine Anfrage mit dieser Adresse abgeschickt wurde.
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`;

  const text = [
    `Hey ${first},`,
    '',
    'vielen Dank für Ihre Anfrage! Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden persönlich bei Ihnen.',
    '',
    'Ihre Nachricht:',
    message,
    '',
    `${BRAND.name} — ${BRAND.tagline}`,
    `${BRAND.operator}, Kirchbachstraße 200, 28211 Bremen`,
    `${siteUrl}`,
  ].join('\n');

  return { subject, html, text };
}
