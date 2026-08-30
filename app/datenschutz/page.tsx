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

          <h2>Datenschutz auf einen Blick</h2>

          <p>
            Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Diese
            Datenschutzerklärung informiert Sie darüber, welche personenbezogenen
            Daten beim Besuch dieser Website verarbeitet werden, zu welchen
            Zwecken dies geschieht und welche Rechte Ihnen zustehen.
          </p>

          <h2>1. Verantwortliche Stelle</h2>

          <p>
            <strong>BOUND FOR FUTURE</strong>
            <br />
            Inhaber: Mohammed Al Bakhit
            <br />
            Kirchbachstraße 200
            <br />
            28211 Bremen
            <br />
            Deutschland
            <br />
            Telefon: 0421 49958207
            <br />
            E-Mail:{' '}
            <a
              className="ulink"
              href="mailto:kontakt@boundforfuture.com"
            >
              kontakt@boundforfuture.com
            </a>
          </p>

          <h2>2. Datenerfassung beim Besuch der Website</h2>

          <p>
            Beim Aufruf dieser Website können technisch erforderliche
            Informationen verarbeitet und in Server-Logfiles gespeichert werden.
            Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs,
            angeforderte Inhalte, Referrer-URL sowie Informationen zum verwendeten
            Browser und Betriebssystem gehören.
          </p>

          <p>
            Die Verarbeitung dient der sicheren, stabilen und technisch
            ordnungsgemäßen Bereitstellung der Website. Rechtsgrundlage ist Art. 6
            Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses an einem
            sicheren und funktionsfähigen Internetauftritt.
          </p>

          <h2>3. Hosting und Auftragsverarbeitung</h2>

          <p>
            Diese Website wird über einen externen Hosting- bzw.
            Infrastruktur-Dienstleister bereitgestellt. Im Rahmen des Hostings
            können personenbezogene Daten verarbeitet werden, soweit dies für die
            Bereitstellung und Sicherheit der Website erforderlich ist.
          </p>

          <p>
            Soweit ein Dienstleister personenbezogene Daten in unserem Auftrag
            verarbeitet, erfolgt dies auf Grundlage eines Vertrags zur
            Auftragsverarbeitung gemäß Art. 28 DSGVO.
          </p>

          <h2>4. Google Fonts</h2>

          <p>
            Diese Website verwendet Schriftarten von Google Fonts. Dabei kann eine
            Verbindung zu Servern von Google hergestellt werden, wodurch
            insbesondere technische Verbindungsdaten wie die IP-Adresse an Google
            übertragen werden können.
          </p>

          <p>
            Google Fonts wird zur einheitlichen und ansprechenden Darstellung
            unserer Website eingesetzt. Soweit personenbezogene Daten verarbeitet
            werden, erfolgt dies auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          </p>

          <h2>5. Kontaktformular</h2>

          <p>
            Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen
            eingegebenen Angaben, insbesondere Name, E-Mail-Adresse, Telefonnummer,
            gewünschte Leistung und Nachricht, zur Bearbeitung Ihrer Anfrage.
          </p>

          <p>
            Die Verarbeitung erfolgt zur Durchführung vorvertraglicher Maßnahmen
            auf Ihre Anfrage hin gemäß Art. 6 Abs. 1 lit. b DSGVO sowie, soweit
            erforderlich, auf Grundlage unseres berechtigten Interesses an einer
            ordnungsgemäßen Bearbeitung von Kontaktanfragen gemäß Art. 6 Abs. 1
            lit. f DSGVO.
          </p>

          <p>
            Die Website übermittelt die Formulardaten technisch an einen hierfür
            vorgesehenen Webhook-Dienst. Eine weitergehende Speicherung oder
            Übermittlung erfolgt nur, soweit dies für die Bearbeitung der Anfrage
            erforderlich ist oder gesetzliche Verpflichtungen bestehen.
          </p>

          <h2>6. Analyse-Tools und Werbung</h2>

          <p>
            In der derzeit veröffentlichten Fassung dieser Website sind keine
            Google-Analytics- oder Google-Ads-Tracking-Skripte eingebunden.
            Insbesondere findet in der derzeitigen technischen Fassung kein
            Google-Ads-Conversion-Tracking über ein eingebundenes Werbe-Tag statt.
          </p>

          <p>
            Sollte künftig Google Ads Conversion-Tracking oder ein vergleichbarer
            Dienst eingebunden werden, wird diese Datenschutzerklärung vor dessen
            Einsatz entsprechend angepasst. Soweit gesetzlich erforderlich, wird
            hierfür zuvor eine Einwilligung eingeholt.
          </p>

          <h2>7. Cookies und ähnliche Technologien</h2>

          <p>
            In der derzeitigen Fassung dieser Website werden keine nicht
            technisch erforderlichen Analyse- oder Werbe-Cookies eingesetzt.
            Technisch notwendige Verarbeitungen können für den sicheren Betrieb
            der Website erforderlich sein.
          </p>

          <h2>8. Speicherdauer</h2>

          <p>
            Personenbezogene Daten werden nur so lange gespeichert, wie dies für
            den jeweiligen Verarbeitungszweck erforderlich ist oder gesetzliche
            Aufbewahrungspflichten bestehen.
          </p>

          <p>
            Soweit gesetzliche Aufbewahrungspflichten bestehen, können
            geschäfts- oder steuerrelevante Unterlagen je nach Art der Unterlagen
            insbesondere sechs oder zehn Jahre aufbewahrt werden. Nach Ablauf der
            jeweiligen Fristen werden die Daten gelöscht, sofern keine andere
            Rechtsgrundlage für eine weitere Speicherung besteht.
          </p>

          <h2>9. Ihre Betroffenenrechte</h2>

          <p>
            Sie haben nach Maßgabe der gesetzlichen Voraussetzungen insbesondere
            das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO),
            Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18
            DSGVO) sowie Datenübertragbarkeit (Art. 20 DSGVO).
          </p>

          <p>
            Außerdem haben Sie das Recht, einer Verarbeitung Ihrer
            personenbezogenen Daten zu widersprechen, soweit die gesetzlichen
            Voraussetzungen hierfür vorliegen (Art. 21 DSGVO).
          </p>

          <p>
            Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die
            Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
            Verarbeitung bleibt davon unberührt.
          </p>

          <h2>10. Beschwerderecht bei der Aufsichtsbehörde</h2>

          <p>
            Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über
            die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
          </p>

          <p>
            Zuständige Aufsichtsbehörde für Unternehmen mit Sitz in Bremen ist der
            <strong> Landesbeauftragte für Datenschutz und Informationsfreiheit der
            Freien Hansestadt Bremen</strong>.
          </p>

          <h2>11. SSL-/TLS-Verschlüsselung</h2>

          <p>
            Diese Website verwendet aus Sicherheitsgründen eine SSL-/TLS-
            Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie in der
            Regel an „https://“ in der Adresszeile Ihres Browsers und am
            Schloss-Symbol.
          </p>

          <h2>12. Widerspruch gegen Werbe-E-Mails</h2>

          <p>
            Der Nutzung der im Impressum veröffentlichten Kontaktdaten zur
            Übersendung von nicht ausdrücklich angeforderter Werbung wird hiermit
            widersprochen. Dies gilt auch für unerwünschte Werbe-E-Mails.
          </p>

          <h2>13. Aktualität dieser Datenschutzerklärung</h2>

          <p>
            Diese Datenschutzerklärung hat den Stand August 2026. Sie kann
            angepasst werden, wenn sich die technische Umsetzung dieser Website,
            die eingesetzten Dienste oder die rechtlichen Anforderungen ändern.
          </p>

        </div>
      </div>

      <Footer />
    </main>
  );
}