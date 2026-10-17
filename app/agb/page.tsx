import type { Metadata } from 'next';

import { BRAND } from '@/lib/content';

import { Kicker, Lines } from '@/components/ui';

import { Footer } from '@/components/Home';

export const metadata: Metadata = {
  title: 'AGB',
  description: `Allgemeine Geschäftsbedingungen von ${BRAND.name}.`,
  robots: { index: false, follow: true },
  alternates: { canonical: '/agb' },
};

export default function Page() {
  return (
    <main id="main" className="legal">
      <div className="shell">
        <Kicker>Rechtliches</Kicker>

        <h1 className="display d-lg" style={{ margin: '18px 0 40px' }}>
          <Lines items={['AGB']} />
        </h1>

        <div className="legal__body">
          <h2>1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen{' '}
            <strong>{BRAND.operator}</strong>, Kirchbachstraße 200, 28211 Bremen (nachfolgend „Auftragnehmer“),
            und ihren Auftraggebern über Leistungen in den Bereichen Webdesign, Websites, Branding,
            Online-Marketing und verwandte digitale Dienstleistungen unter der Marke {BRAND.name}.
          </p>
          <p>
            Abweichende oder ergänzende Bedingungen des Auftraggebers werden nur Vertragsbestandteil, wenn der
            Auftragnehmer ihnen ausdrücklich in Textform zugestimmt hat.
          </p>

          <h2>2. Vertragsschluss</h2>
          <p>
            Die Darstellung der Leistungen auf dieser Website und eine Anfrage über das Kontaktformular sind
            unverbindlich. Ein Vertrag kommt erst zustande, wenn der Auftragnehmer ein Angebot in Textform
            abgibt und der Auftraggeber dieses annimmt oder der Auftragnehmer den Auftrag in Textform bestätigt.
            Angebote sind, soweit nicht anders angegeben, 30 Tage gültig.
          </p>

          <h2>3. Leistungsumfang</h2>
          <p>
            Art und Umfang der geschuldeten Leistungen ergeben sich aus dem jeweiligen Angebot. Der Auftragnehmer
            bestimmt Art und Weise der Ausführung nach eigenem Ermessen und ist berechtigt, qualifizierte Dritte
            als Subunternehmer einzusetzen. Änderungs- und Zusatzwünsche, die über das Angebot hinausgehen,
            werden gesondert angeboten und vergütet.
          </p>

          <h2>4. Mitwirkung des Auftraggebers</h2>
          <p>
            Der Auftraggeber stellt Texte, Bilder, Logos, Zugangsdaten und sonstige erforderliche Inhalte
            rechtzeitig, vollständig und in verwendbarer Form zur Verfügung und benennt einen Ansprechpartner.
            Er versichert, dass er zur Nutzung der gelieferten Inhalte berechtigt ist und diese keine Rechte Dritter
            verletzen. Verzögerungen durch fehlende Mitwirkung verschieben vereinbarte Termine entsprechend.
          </p>

          <h2>5. Termine und Fristen</h2>
          <p>
            Termine und Fristen sind nur verbindlich, wenn sie ausdrücklich als verbindlich vereinbart wurden.
            Bei höherer Gewalt und sonstigen vom Auftragnehmer nicht zu vertretenden Hindernissen verlängern sich
            Fristen angemessen.
          </p>

          <h2>6. Vergütung und Zahlung</h2>
          <p>
            Es gelten die im Angebot genannten Preise zuzüglich der gesetzlichen Umsatzsteuer, soweit diese
            anfällt. Sofern nichts anderes vereinbart ist, wird bei größeren Projekten eine Anzahlung von 50 %
            bei Beauftragung fällig; der Rest wird bei Abnahme bzw. Fertigstellung berechnet. Rechnungen sind
            innerhalb von 14 Tagen ohne Abzug zahlbar. Bei Zahlungsverzug gelten die gesetzlichen Regelungen.
          </p>
          <p>
            Laufende Leistungen (zum Beispiel Hosting, Wartung oder Betreuung) werden zu dem im Angebot
            genannten Intervall abgerechnet und können mit einer Frist von einem Monat zum Ende des
            Abrechnungszeitraums gekündigt werden, soweit nichts anderes vereinbart ist.
          </p>

          <h2>7. Abnahme</h2>
          <p>
            Werkleistungen sind nach Fertigstellung abzunehmen. Die Abnahme gilt als erfolgt, wenn der
            Auftraggeber die Leistung nicht innerhalb von 14 Tagen nach Bereitstellung unter Angabe konkreter
            Mängel in Textform beanstandet oder die Leistung produktiv nutzt.
          </p>

          <h2>8. Nutzungsrechte</h2>
          <p>
            Mit vollständiger Bezahlung erhält der Auftraggeber die für den vereinbarten Zweck erforderlichen
            einfachen Nutzungsrechte an den vertragsgemäß erstellten Arbeitsergebnissen. Nicht erfasst sind
            Rechte an Drittinhalten, Schriften, Software-Bibliotheken und Werkzeugen des Auftragnehmers, die
            nach den jeweiligen Lizenzbedingungen genutzt werden. Bis zur vollständigen Bezahlung verbleiben alle
            Rechte beim Auftragnehmer. Der Auftragnehmer darf erstellte Arbeiten mit Zustimmung des
            Auftraggebers als Referenz nennen.
          </p>

          <h2>9. Gewährleistung</h2>
          <p>
            Bei Mängeln leistet der Auftragnehmer zunächst Nacherfüllung nach seiner Wahl durch Nachbesserung
            oder Neuerstellung. Schlägt die Nacherfüllung fehl, gelten die gesetzlichen Rechte. Gegenüber
            Unternehmern beträgt die Verjährungsfrist für Mängelansprüche ein Jahr ab Abnahme. Für Suchmaschinen-
            Rankings, Reichweite, Umsätze oder sonstige Marketingergebnisse wird kein bestimmter Erfolg
            geschuldet, sofern dies nicht ausdrücklich zugesagt wurde.
          </p>

          <h2>10. Haftung</h2>
          <p>
            Der Auftragnehmer haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von
            Leben, Körper oder Gesundheit und nach dem Produkthaftungsgesetz. Bei leicht fahrlässiger Verletzung
            wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden
            begrenzt; im Übrigen ist die Haftung bei leichter Fahrlässigkeit ausgeschlossen. Für den Verlust von
            Daten haftet der Auftragnehmer nur, soweit der Auftraggeber regelmäßig Datensicherungen angefertigt hat.
          </p>

          <h2>11. Vertraulichkeit und Datenschutz</h2>
          <p>
            Beide Parteien behandeln vertrauliche Informationen der jeweils anderen Partei vertraulich. Die
            Verarbeitung personenbezogener Daten erfolgt nach der{' '}
            <a href="/datenschutz">Datenschutzerklärung</a>. Soweit der Auftragnehmer im Auftrag des
            Auftraggebers personenbezogene Daten verarbeitet, wird bei Bedarf ein Vertrag zur
            Auftragsverarbeitung geschlossen.
          </p>

          <h2>12. Widerrufsrecht für Verbraucher</h2>
          <p>
            Verbrauchern steht bei außerhalb von Geschäftsräumen oder im Fernabsatz geschlossenen Verträgen ein
            gesetzliches Widerrufsrecht von 14 Tagen zu. Die Widerrufsbelehrung wird dem Verbraucher mit dem
            Angebot in Textform mitgeteilt. Das Widerrufsrecht erlischt bei Dienstleistungen vorzeitig, wenn der
            Auftragnehmer die Leistung vollständig erbracht hat und erst mit der Ausführung begonnen hat, nachdem
            der Verbraucher ausdrücklich zugestimmt und bestätigt hat, dass er sein Widerrufsrecht bei
            vollständiger Vertragserfüllung verliert.
          </p>

          <h2>13. Schlussbestimmungen</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts; gegenüber
            Verbrauchern gilt diese Rechtswahl nur, soweit dadurch nicht zwingende Verbraucherschutzvorschriften
            des Staates entzogen werden, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat. Gerichtsstand
            ist bei Verträgen mit Kaufleuten, juristischen Personen des öffentlichen Rechts und öffentlich-
            rechtlichen Sondervermögen Bremen. Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die
            Wirksamkeit der übrigen Bestimmungen unberührt.
          </p>
          <p>Stand: Oktober 2026</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
