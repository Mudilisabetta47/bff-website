import type { CSSProperties } from 'react';
import { BRAND, PROJECTS, type Project } from '@/lib/content';
import { Arrow, Kicker, Lines } from './ui';
import { CaseArt } from './art';
import { Finale, Footer } from './Home';

export function CasePage({ p }: { p: Project }) {
  const i = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const blocks = [
    { h: 'Herausforderung', t: p.challenge },
    { h: 'Ansatz', t: p.approach },
  ];
  return (
    <div style={{ '--tint': p.accent } as CSSProperties}>
      <header className="phead" data-parallax-host>
        <div className="phead__art" aria-hidden="true" data-parallax="-14">
          <CaseArt seed={p.visual} tint={p.accent} />
        </div>
        <div className="phead__scrim" aria-hidden="true" />
        <div className="shell phead__in">
          <nav className="crumb" aria-label="Brotkrumen">
            <a href="/">Start</a>
            <i>/</i>
            <a href="/#arbeiten">Arbeiten</a>
            <i>/</i>
            <span style={{ color: 'var(--text)' }}>{p.name}</span>
          </nav>
          <Kicker>Konzeptstudie · {p.year}</Kicker>
          <h1 className="display d-lg" style={{ margin: 'clamp(16px,2vw,26px) 0' }}>
            <Lines items={[p.name, p.claim]} />
          </h1>
          <p className="lead" data-reveal="up" data-stagger="120">
            {p.summary}
          </p>
        </div>
      </header>

      <section className="section section--tight">
        <div className="shell">
          <div className="svcgrid" style={{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>
            <article data-reveal="up">
              <b>Branche</b>
              <h3>{p.sector}</h3>
            </article>
            <article data-reveal="up" data-stagger="80">
              <b>Leistungen</b>
              <h3 style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.01em' }}>{p.disciplines.join(', ')}</h3>
            </article>
            <article data-reveal="up" data-stagger="160">
              <b>Status</b>
              <h3 style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
                Eigenarbeit von {BRAND.short} — kein Kundenprojekt
              </h3>
            </article>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(24px,4vw,60px)', marginTop: 'clamp(40px,5vw,80px)' }}>
            {blocks.map((b, k) => (
              <article key={b.h} data-reveal="up" data-stagger={String(k * 90)}>
                <h2 className="d-sm" style={{ marginBottom: '12px' }}>
                  {b.h}
                </h2>
                <p style={{ color: 'var(--dim)' }}>{b.t}</p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 'clamp(40px,5vw,80px)', display: 'grid', gap: '18px' }}>
            <p className="kicker">Ergebnis</p>
            <ul className="deliver" data-reveal="up">
              {p.result.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 'clamp(40px,5vw,80px)', borderTop: '1px solid var(--line)', paddingTop: 'clamp(26px,3.4vw,48px)', display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <p className="kicker">Nächste Studie</p>
              <p className="display d-md" style={{ marginTop: '12px' }}>
                {next.name}
              </p>
            </div>
            <a className="btn" href={`/arbeiten/${next.slug}`} data-transition="" data-magnet="0.22">
              Ansehen <Arrow />
            </a>
          </div>
        </div>
      </section>

      <Finale />
      <Footer />
    </div>
  );
}
