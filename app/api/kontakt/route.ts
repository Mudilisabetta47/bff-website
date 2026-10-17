import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { BRAND } from '@/lib/content';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: 'not_configured' },
        { status: 501 }
      );
    }

    const resend = new Resend(apiKey);

    // Optional: CONTACT_TO_EMAIL (mehrere Adressen mit Komma trennen), sonst BRAND.email.
    const recipients = (process.env.CONTACT_TO_EMAIL || '')
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);
    if (!recipients.length) recipients.push(BRAND.email);

    const data = await req.json();
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
    }
    const get = (key: string) => typeof data[key] === 'string' ? data[key].trim() : '';

    // Honeypot: Bots füllen das versteckte Feld aus; still als Erfolg quittieren.
    if (get('website')) return NextResponse.json({ ok: true });

    // Nur prüfen, wenn Secret-Key und Site-Key gesetzt sind; sonst sendet das Formular kein Token.
    const secret = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? process.env.RECAPTCHA_SECRET_KEY : '';
    if (secret) {
      const token = get('recaptcha');
      let human = false;
      if (token) {
        try {
          const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ secret, response: token }),
          });
          const v = await res.json();
          human = v.success === true && (v.score ?? 0) >= 0.5 && (!v.action || v.action === 'kontakt');
        } catch (err) {
          console.error('reCAPTCHA verify error:', err);
        }
      }
      if (!human) {
        return NextResponse.json({ ok: false, error: 'recaptcha' }, { status: 403 });
      }
    }

    const name = get('name');
    const email = get('email');
    const message = get('nachricht') || get('message');

    if (!name || !email || !message || name.length > 120 || email.length > 254 || message.length > 5000) {
      return NextResponse.json(
        { ok: false, error: 'validation' },
        { status: 422 }
      );
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'validation' },
        { status: 422 }
      );
    }

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'BOUND FOR FUTURE <noreply@monvex-group.de>',
      to: recipients,
      replyTo: email,
      subject: `Neue Website-Anfrage von ${name}`,
      text: [
        'Neue Anfrage über die Website',
        '',
        `Name: ${name}`,
        `E-Mail: ${email}`,
        '',
        'Nachricht:',
        message || '-',
      ].join('\n'),
    });

    if (error) {
      console.error('Resend error:', error);

      return NextResponse.json(
        { ok: false, error: 'mail_send_failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      { ok: false, error: 'server_error' },
      { status: 500 }
    );
  }
}