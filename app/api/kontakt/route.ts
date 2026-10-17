import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    const data = await req.json();
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
    }
    const get = (key: string) => typeof data[key] === 'string' ? data[key].trim() : '';

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
      from: 'BOUND FOR FUTURE <noreply@boundforfuture.com>',
      to: ['kontakt@boundforfuture.com'],
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