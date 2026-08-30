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

          <h2>Angaben gemäß § 5 DDG</h2>

          <p>

            <strong>BOUND FOR FUTURE</strong>

            <br />Kirchbachstraße 200

            <br />28211 Bremen

            <br />Deutschland

          </p>

          <h2>Inhaber</h2>

          <p>Mohammed Al Bakhit</p>

          <h2>Kontakt</h2>

          <p>

            Telefon: 0421 49958207

            <br />

            E-Mail: <a className="ulink" href="mailto:kontakt@boundforfuture.com">kontakt@boundforfuture.com</a>

          </p>

          <h2>Registereintrag &amp; Umsatzsteuer</h2>

          <p>Kein Handelsregistereintrag.</p>

          <h2>Verantwortlich nach § 18 Abs. 2 MStV</h2>

          <p>

            Mohammed Al Bakhit

            <br />Kirchbachstraße 200

            <br />28211 Bremen

          </p>

          <h2>Streitschlichtung</h2>

          <p>

            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer

            Verbraucherschlichtungsstelle teilzunehmen.

          </p>

          <h2>Bildnachweis</h2>

          <p>

            Sämtliche Grafiken, der 3D-Globus und die Bildwelten dieser Website sind eigene,

            generativ erzeugte Darstellungen von {BRAND.name}.

          </p>

        </div>

      </div>

      <Footer />

    </main>

  );

}
