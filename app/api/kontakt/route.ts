import { NextResponse } from 'next/server';

/**
 * Anfrage-Endpunkt. Standardmäßig wird nur validiert — hier den echten Versand
 * anbinden (z. B. Resend, Postmark, SMTP) und den Schlüssel als Umgebungsvariable setzen.
 */
export async function POST(req: Request) {
  let data: Record<string, string>;
  try {
    data = (await req.json()) as Record<string, string>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
  const email = (data.email || '').trim();
  const name = (data.name || '').trim();
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }
  if (!process.env.CONTACT_WEBHOOK_URL) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 501 });
  }
  await fetch(process.env.CONTACT_WEBHOOK_URL, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  });
  return NextResponse.json({ ok: true });
}
