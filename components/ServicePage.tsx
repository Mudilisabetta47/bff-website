import type { CSSProperties } from 'react';
import { BRAND, CITIES, SERVICES, type Service } from '@/lib/content';
import { Arrow, Kicker, Lines } from './ui';
import { Finale, Footer, Marquee } from './Home';

/* ---------------- Hero-Mechaniken ---------------- */
function Mech({ s }: { s: Service }) {
  if (s.hero === 'browser') {
    return (
      <div className="mech" aria-hidden="true" style={{ perspective: '1400px' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="mech__browser"
            data-depth={1 + i * 0.55}
            style={{ right: `${-4 + i * 12}%`, top: `${8 + i * 20}%`, opacity: 1 - i * 0.26, zIndex: 3 - i }}
          >
            <div className="mech__bar">
              <u />
              <u />
              <u />
            </div>
            <div className="mech__wire">
              <s className="a" />
              <s className="b" />
              <s className="c" />
              <div className="mech__grid2">
                <s />
                <s />
                <s />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (s.hero === 'brand') {
    const marks = [
      <path key="a" d="M6 6h20v20H6z M12 12h8v8h-8z" />,
      <path key="b" d="M16 4l12 12-12 12L4 16z" />,
      <circle key="c" cx="16" cy="16" r="12" />,
      <path key="d" d="M16 4l12 22H4z" />,
      <path key="e" d="M16 3l11 6.5v13L16 29 5 22.5v-13z" />,
      <path key="f" d="M16 4a12 12 0 010 24z M16 4a12 12 0 000 24" />,
      <path key="g" d="M16 3l3.4 9.6L29 16l-9.6 3.4L16 29l-3.4-9.6L3 16l9.6-3.4z" />,
      <path key="h" d="M6 10h20v12H6z M6 16h20" />,
      <path key="i" d="M4 16h24 M16 4v24" />,
      <path key="j" d="M8 8h16v16H8z M8 8l16 16 M24 8L8 24" />,
      <path key="k" d="M16 6a10 10 0 110 20 10 10 0 110-20z M16 11a5 5 0 110 10 5 5 0 110-10z" />,
      <path key="l" d="M16 4l6 12-6 12-6-12z M4 16h24" />,
    ];
    return (
      <div className="mech" aria-hidden="true">
        <div className="mech__marks">
          {marks.map((m, i) => (
            <div className="mech__mark" key={i}>
              <svg viewBox="0 0 32 32" width="46%" fill="none"
                stroke={i % 3 === 0 ? s.accent : 'rgba(234,238,246,0.6)'} strokeWidth="1.2">
                {m}
              </svg>
            </div>
          ))}
        </div>
        <div className="mech__swatches">
          {[s.accent, '#FF6A3D', '#EAEEF6', '#6B7689', '#141B27', '#7FB4FF'].map((c, i) => (
            <i key={i} style={{ background: c, '--d': `${i * 80}ms` } as CSSProperties} />
          ))}
        </div>
      </div>
    );
  }
  if (s.hero === 'campaign') {
    const h = [0.35, 0.5, 0.42, 0.66, 0.58, 0.78, 0.7, 0.9, 0.82, 1, 0.94, 0.86];
    return (
      <div className="mech" aria-hidden="true">
        <div className="mech__chart" style={{ '--tint': s.accent } as CSSProperties}>
          {h.map((v, i) => (
            <i key={i} data-h={v} />
          ))}
        </div>
      </div>
    );
  }
  if (s.hero === 'serp') {
    const order = [4, 0, 5, 1, 6, 2, 3];
    return (
      <div className="mech" aria-hidden="true">
        <div className="mech__serp">
          {order.map((to, i) => (
            <div className={'mech__row' + (i === 1 ? ' top' : '')} key={i} data-to={to}>
              <b>{String(i + 1).padStart(2, '0')}</b>
              <div>
                <s style={{ width: `${44 + ((i * 13) % 40)}%` }} />
                <s />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (s.hero === 'feed') {
    return (
      <div className="mech" aria-hidden="true">
        <div className="mech__feed" style={{ '--tint': s.accent } as CSSProperties}>
          {[0, 1, 2].map((c) => (
            <div className="mech__col" key={c}>
              {Array.from({ length: 4 }, (_, i) => (
                <div className="mech__card" key={i} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  const nodes = [
    [14, 30], [30, 18], [30, 46], [50, 28], [50, 62], [68, 20], [68, 48], [86, 34], [44, 82], [70, 76],
  ];
  const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [3, 6], [5, 7], [6, 7], [4, 8], [6, 9], [8, 9]];
  return (
    <div className="mech mech__nodes" aria-hidden="true" style={{ '--tint': s.accent } as CSSProperties}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map(([a, b], i) => (
          <path key={i} d={`M${nodes[a][0]} ${nodes[a][1]} L${nodes[b][0]} ${nodes[b][1]}`} style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.1 : 0.6} opacity={i % 3 === 0 ? 0.9 : 0.5} />
        ))}
      </svg>
    </div>
  );
}

/* ---------------- Seite ---------------- */
export function ServicePage({ s }: { s: Service }) {
  const others = SERVICES.filter((x) => x.slug !== s.slug);
  return (
    <div style={{ '--tint': s.accent } as CSSProperties}>
      <header className="phead">
        <Mech s={s} />
        <div className="phead__scrim" aria-hidden="true" />
        <div className="shell phead__in">
          <nav className="crumb" aria-label="Brotkrumen">
            <a href="/">Start</a>
            <i>/</i>
            <span>Leistungen</span>
            <i>/</i>
            <span style={{ color: 'var(--text)' }}>{s.short}</span>
          </nav>
          <p className="kicker" style={{ marginBottom: 'clamp(16px,2vw,26px)' }}>
            Leistung {s.index}
          </p>
          <h1 className="display d-lg" style={{ maxWidth: '18ch' }}>
            <Lines items={[s.title]} />
          </h1>
          <p className="d-sm" style={{ color: s.accent, marginTop: 'clamp(16px,2vw,26px)' }} data-reveal="up">
            {s.claim}
          </p>
          <p className="lead" data-reveal="up" data-stagger="120" style={{ marginTop: '18px' }}>
            {s.lead}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'clamp(22px,3vw,34px)' }} data-reveal="up" data-stagger="220">
            <a className="btn btn--accent" href="/#kontakt" data-magnet="0.22">
              Projekt starten <Arrow />
            </a>
            <a className="btn btn--ghost" href="#leistungsumfang" data-magnet="0.16">
              Leistungsumfang <Arrow />
            </a>
          </div>
        </div>
      </header>

      <Marquee items={[s.short, ...s.items.map((i) => i.t)]} />

      <section className="section" id="leistungsumfang" aria-labelledby="lu-h">
        <div className="shell">
          <div style={{ display: 'grid', gap: 'clamp(18px,2.4vw,30px)', marginBottom: 'clamp(28px,3.6vw,52px)' }}>
            <Kicker>Leistungsumfang</Kicker>
            <h2 className="display d-md" id="lu-h">
              <Lines items={['Was konkret dazugehört.']} />
            </h2>
          </div>
          <div className="svcgrid">
            {s.items.map((it, i) => (
              <article key={it.t} data-reveal="up" data-stagger={String(i * 60)}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <h3>{it.t}</h3>
                <p>{it.d}</p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 'clamp(34px,4.4vw,64px)', display: 'grid', gap: '18px' }}>
            <p className="kicker">Ergebnisse</p>
            <ul className="deliver" data-reveal="up">
              {s.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="faq-h">
        <div className="shell">
          <div style={{ display: 'grid', gap: 'clamp(18px,2.4vw,30px)', marginBottom: 'clamp(24px,3vw,40px)' }}>
            <Kicker>Häufige Fragen</Kicker>
            <h2 className="display d-md" id="faq-h">
              <Lines items={[`${s.short} — kurz erklärt.`]} />
            </h2>
          </div>
          <div className="faq">
            {s.faq.map((f, i) => (
              <div className="faq__item" key={f.q}>
                <button className="faq__q" type="button" aria-expanded="false" id={`faq-${s.slug}-${i}`}>
                  {f.q}
                  <i aria-hidden="true" />
                </button>
                <div className="faq__a" role="region" aria-labelledby={`faq-${s.slug}-${i}`}>
                  <div>{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="more-h">
        <div className="shell">
          <div style={{ display: 'grid', gap: 'clamp(18px,2.4vw,30px)', marginBottom: 'clamp(22px,3vw,36px)' }}>
            <Kicker>Weitere Leistungen</Kicker>
            <h2 className="display d-md" id="more-h">
              <Lines items={['Passt oft zusammen.']} />
            </h2>
          </div>
          <div className="cities">
            {others.map((o) => (
              <a key={o.slug} href={`/leistungen/${o.slug}`} data-transition="">
                <b>{o.title}</b>
                <Arrow className="" />
              </a>
            ))}
          </div>

          <div style={{ marginTop: 'clamp(30px,4vw,54px)', display: 'grid', gap: '18px' }}>
            <p className="kicker">Standorte</p>
            <div className="cities">
              {CITIES.map((c) => (
                <a key={c.slug} href={`/standorte/${c.slug}`} data-transition="">
                  <b>
                    {s.short} {c.name}
                  </b>
                  <Arrow className="" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Finale />
      <Footer />
      <span hidden>{BRAND.name}</span>
    </div>
  );
}
