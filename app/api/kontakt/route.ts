import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Record<string, string>;

    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const phone = (data.phone || '').trim();
    const service = (data.service || data.leistung || '').trim();
    const message = (data.message || data.nachricht || '').trim();

    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'validation' },
        { status: 422 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: 'not_configured' },
        { status: 501 }
      );
    }

    const { error } = await resend.emails.send({
      from: 'Website <noreply@boundforfuture.com>',
      to: ['kontakt@boundforfuture.com'],
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      text: [
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Telefon: ${phone || '-'}`,
        `Leistung: ${service || '-'}`,
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