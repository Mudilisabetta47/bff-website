import type { Metadata } from 'next';
import { CITIES } from '@/lib/content';
import { Arrow, Kicker, Lines } from '@/components/ui';
import { Finale, Footer } from '@/components/Home';

export const metadata: Metadata = {
  title: 'Standorte — Digitalagentur in Norddeutschland',
  description: 'BOUND FOR FUTURE arbeitet für Unternehmen in Bremen, Hamburg, Hannover, Oldenburg und Osnabrück — remote-first und vor Ort.',
  alternates: { canonical: '/standorte' },
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
            <span style={{ color: 'var(--text)' }}>Standorte</span>
          </nav>
          <Kicker>Standorte</Kicker>
          <h1 className="display d-lg" style={{ margin: 'clamp(16px,2vw,26px) 0', maxWidth: '16ch' }}>
            <Lines items={['Nah genug für', 'echte Termine.']} />
          </h1>
          <p className="lead" data-reveal="up">
            Wir arbeiten remote-first, kommen aber dorthin, wo Entscheidungen fallen. Für jede Region gibt es eine
            eigene Seite mit lokalem Bezug.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="shell">
          <div className="cities">
            {CITIES.map((c) => (
              <a key={c.slug} href={`/standorte/${c.slug}`} data-transition="" data-reveal="up">
                <span>
                  <b>Agentur {c.name}</b>
                  <span style={{ display: 'block', color: 'var(--dim)', fontSize: '0.875rem', marginTop: '6px' }}>{c.region}</span>
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
