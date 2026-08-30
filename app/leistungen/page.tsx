import type { Metadata } from 'next';
import { SERVICES } from '@/lib/content';
import { Arrow, Kicker, Lines } from '@/components/ui';
import { Finale, Footer } from '@/components/Home';

export const metadata: Metadata = {
  title: 'Leistungen — Webdesign, Branding, Marketing, SEO',
  description: 'Alle Leistungen von BOUND FOR FUTURE: Webdesign, Branding & Corporate Design, Online-Marketing, SEO, Content & Social Media und Digital Solutions.',
  alternates: { canonical: '/leistungen' },
};

export default function Page() {
  return (
    <main id="main">
      <header className="phead">
        <div className="phead__scrim" aria-hidden="true" />
        <div className="shell phead__in">
          <nav className="crumb" aria-label="Brotkrumen">
            <a href="/">Start</a>
            <i>/</i>
            <span style={{ color: 'var(--text)' }}>Leistungen</span>
          </nav>
          <Kicker>Leistungen</Kicker>
          <h1 className="display d-lg" style={{ margin: 'clamp(16px,2vw,26px) 0', maxWidth: '16ch' }}>
            <Lines items={['Sechs Disziplinen.', 'Ein Team.']} />
          </h1>
          <p className="lead" data-reveal="up">
            Von der Marke über die Website bis zur Kampagne — jede Leistung mit eigener Seite, eigenem Prozess und
            klar benannten Ergebnissen.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="shell">
          <div className="cities">
            {SERVICES.map((s) => (
              <a key={s.slug} href={`/leistungen/${s.slug}`} data-transition="" data-reveal="up">
                <span>
                  <b>{s.title}</b>
                  <span style={{ display: 'block', color: 'var(--dim)', fontSize: '0.875rem', marginTop: '6px' }}>{s.claim}</span>
                </span>
                <Arrow className="" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Finale />
      <Footer />
    </main>
  );
}
