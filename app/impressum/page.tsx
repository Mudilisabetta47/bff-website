import type { Metadata } from 'next';
import { BRAND } from '@/lib/content';
import { Kicker, Lines } from '@/components/ui';
import { Footer } from '@/components/Home';

export const metadata: Metadata = {
  title: 'Impressum',
  description: `Impressum von ${BRAND.name}.`,
  robots: { index: false, follow: true },
  alternates: { canonical: '/impressum' },
};

export default function Page() {
  return (
    <main id="main" className="legal">
      <div className="shell">
        <Kicker>Rechtliches</Kicker>
        <h1 className="display d-lg" style={{ margin: '18px 0 40px' }}>
          <Lines items={['Impressum']} />
        </h1>
        <div className="legal__body">
          <div className="todo">
            <b>Vor dem Livegang ausfüllen</b>
            <p>
              Die folgenden Angaben sind Platzhalter. Tragen Sie vor der Veröffentlichung die echten Daten ein
              (§ 5 DDG / § 18 MStV). Ohne vollständiges Impressum drohen Abmahnungen.
            </p>
          </div>
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            <strong>{BRAND.name}</strong>
            <br />[Straße und Hausnummer]<br />[PLZ Ort]<br />Deutschland
          </p>
          <h2>Vertreten durch</h2>
          <p>[Vor- und Nachname der vertretungsberechtigten Person]</p>
          <h2>Kontakt</h2>
          <p>
            Telefon: [Telefonnummer]<br />
            E-Mail: <a className="ulink" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </p>
          <h2>Registereintrag &amp; Umsatzsteuer</h2>
          <p>[Registergericht, Registernummer]<br />USt-IdNr. gemäß § 27a UStG: [USt-IdNr.]</p>
          <h2>Verantwortlich nach § 18 Abs. 2 MStV</h2>
          <p>[Name, Anschrift]</p>
          <h2>Streitschlichtung</h2>
          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          <h2>Bildnachweis</h2>
          <p>
            Sämtliche Grafiken, der 3D-Globus und die Bildwelten dieser Website sind eigene, generativ erzeugte
            Darstellungen von {BRAND.name}. Es werden keine Stockfotos und keine fremden Marken verwendet.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
