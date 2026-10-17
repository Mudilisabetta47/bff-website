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

            <strong>{BRAND.operator}</strong>

            <br />BOUND FOR FUTURE — eine Marke der MONVEX

            <br />Kirchbachstraße 200

            <br />28211 Bremen

            <br />Deutschland

          </p>

          <h2>Vertreten durch</h2>

          <p>Geschäftsführer: Mohammed Al Bakhit. Er ist einzelvertretungsberechtigt.</p>

          <h2>Kontakt</h2>

          <p>

            Telefon: <a className="ulink" href={`tel:${BRAND.phoneHref}`}>{BRAND.phone}</a>

            <br />

            E-Mail: <a className="ulink" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>

            <br />Website: <a className="ulink" href={BRAND.operatorUrl}>monvex-group.de</a>

          </p>

          <h2>Rechtsform und Registereintrag</h2>

          <p>
            Rechtsform: Unternehmergesellschaft (haftungsbeschränkt). Sitz: Bremen.
            <br />Die Gesellschaft befindet sich in Gründung (i. G.); die Eintragung im Handelsregister ist beantragt.
            <br />Registergericht: Amtsgericht Bremen.
            <br />Die Registernummer wird nach der Eintragung ergänzt.
          </p>

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
