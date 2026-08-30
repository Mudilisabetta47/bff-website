import type { Metadata } from 'next';
import { BRAND } from '@/lib/content';
import { Kicker, Lines } from '@/components/ui';
import { Footer } from '@/components/Home';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: `Datenschutzerklärung von ${BRAND.name}.`,
  robots: { index: false, follow: true },
  alternates: { canonical: '/datenschutz' },
};

export default function Page() {
  return (
    <main id="main" className="legal">
      <div className="shell">
        <Kicker>Rechtliches</Kicker>
        <h1 className="display d-lg" style={{ margin: '18px 0 40px' }}>
          <Lines items={['Datenschutz']} />
        </h1>
        <div className="legal__body">
          <div className="todo">
            <b>Entwurf — juristisch prüfen lassen</b>
            <p>
              Dieser Text ist ein technisch korrekter Ausgangspunkt für genau diese Website. Er ersetzt keine
              Rechtsberatung. Ergänzen Sie Hosting, Auftragsverarbeiter und eingesetzte Dienste.
            </p>
          </div>
          <h2>1. Verantwortliche Stelle</h2>
          <p>
            {BRAND.name}, [Anschrift], E-Mail:{' '}
            <a className="ulink" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </p>
          <h2>2. Zugriffsdaten</h2>
          <p>
            Beim Aufruf dieser Website verarbeitet der Hosting-Dienstleister technisch notwendige Daten in
            Server-Logfiles (IP-Adresse, Zeitpunkt, angeforderte Ressource, Referrer, User-Agent). Rechtsgrundlage
            ist Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse am sicheren, stabilen Betrieb.
          </p>
          <h2>3. Schriften</h2>
          <p>
            Diese Website lädt Schriftarten von Google Fonts. Dabei wird eine Verbindung zu Servern von Google
            hergestellt und die IP-Adresse übertragen. Auf Wunsch liefern wir die Schriften lokal aus — technisch
            ist das im Projekt vorbereitet.
          </p>
          <h2>4. Kontaktanfragen</h2>
          <p>
            Wenn Sie das Anfrageformular nutzen, verarbeiten wir die angegebenen Daten ausschließlich zur Bearbeitung
            Ihrer Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Ohne angebundenes Backend öffnet das Formular Ihr
            E-Mail-Programm; in diesem Fall findet keine Übertragung über die Website statt.
          </p>
          <h2>5. Kein Tracking</h2>
          <p>
            Diese Website setzt in der ausgelieferten Fassung keine Analyse-Cookies, kein Werbe-Tracking und keine
            externen Skripte außer den genannten Schriften ein. Wird später Analytics oder Werbe-Tracking ergänzt,
            ist ein Consent-Banner erforderlich und dieser Abschnitt anzupassen.
          </p>
          <h2>6. Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei einer Aufsichtsbehörde.
          </p>
          <h2>7. Speicherdauer</h2>
          <p>Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Fristen bestehen.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
