'use client';

import { useEffect, useState } from 'react';

const KEY = 'bff-consent';

/** Optional ist nur Google reCAPTCHA (Spam-Schutz). Ohne Site-Key gibt es nichts Einwilligungspflichtiges. */
export default function CookieConsent({ recaptcha }: { recaptcha: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(KEY); } catch { /* Speicher gesperrt */ }
    if (!stored) setOpen(true);
    const show = () => setOpen(true);
    window.addEventListener('bff:open-consent', show);
    return () => window.removeEventListener('bff:open-consent', show);
  }, []);

  const save = (value: 'all' | 'necessary') => {
    try { localStorage.setItem(KEY, value); } catch { /* Speicher gesperrt */ }
    setOpen(false);
    window.dispatchEvent(new CustomEvent('bff:consent', { detail: value }));
  };

  if (!open) return null;

  return (
    <div className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-h">
      <p className="consent__t" id="consent-h">Cookies &amp; Datenschutz</p>
      <p className="consent__p">
        {recaptcha
          ? 'Wir setzen technisch notwendige Speicherung ein. Zusätzlich können Sie Google reCAPTCHA zum Spam-Schutz des Kontaktformulars erlauben; dabei werden Daten an Google übertragen.'
          : 'Diese Website nutzt nur technisch notwendige Speicherung und setzt keine Tracking- oder Marketing-Cookies ein.'}{' '}
        Mehr in der <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>
      <div className="consent__row">
        {recaptcha ? (
          <>
            <button type="button" className="btn" onClick={() => save('necessary')}>Nur notwendige</button>
            <button type="button" className="btn btn--accent" onClick={() => save('all')}>Alle akzeptieren</button>
          </>
        ) : (
          <button type="button" className="btn btn--accent" onClick={() => save('necessary')}>Verstanden</button>
        )}
      </div>
    </div>
  );
}
