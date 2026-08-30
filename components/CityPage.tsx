import { BRAND, CITIES, SERVICES, type City } from '@/lib/content';
import { Arrow, Kicker, Lines } from './ui';
import { Finale, Footer, Marquee } from './Home';

export function CityPage({ c }: { c: City }) {
  const others = CITIES.filter((x) => x.slug !== c.slug);
  return (
    <>
      <header className="phead">
        <div className="mech mech__nodes" aria-hidden="true">
          <svg viewBox="0 0 100 60" preserveAspectRatio="none">
            {Array.from({ length: 14 }, (_, i) => (
              <path key={i} d={`M${(i * 7) % 100} 60 L${(i * 13) % 100} 0`} style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </svg>
        </div>
        <div className="phead__scrim" aria-hidden="true" />
        <div className="shell phead__in">
          <nav className="crumb" aria-label="Brotkrumen">
            <a href="/">Start</a>
            <i>/</i>
            <span>Standorte</span>
            <i>/</i>
            <span style={{ color: 'var(--text)' }}>{c.name}</span>
          </nav>
          <Kicker>{c.region}</Kicker>
          <h1 className="display d-lg" style={{ margin: 'clamp(16px,2vw,26px) 0', maxWidth: '17ch' }}>
            <Lines items={['Digitalagentur', c.article + '.']} />
          </h1>
          <p className="lead" data-reveal="up" data-stagger="120">
            {c.intro} Wir arbeiten remote-first und vor Ort — mit klaren Terminen statt endloser Abstimmungsschleifen.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'clamp(22px,3vw,34px)' }} data-reveal="up" data-stagger="220">
            <a className="btn btn--accent" href="/#kontakt" data-magnet="0.22">
              Projekt starten <Arrow />
            </a>
          </div>
        </div>
      </header>

      <Marquee items={c.local.concat(['Webdesign', 'SEO', 'Branding'])} dir="rtl" />

      <section className="section" aria-labelledby="ci-h">
        <div className="shell">
          <div style={{ display: 'grid', gap: 'clamp(18px,2.4vw,30px)', marginBottom: 'clamp(28px,3.6vw,52px)' }}>
            <Kicker>Leistungen {c.article}</Kicker>
            <h2 className="display d-md" id="ci-h">
              <Lines items={[`Was wir für Unternehmen ${c.article} tun.`]} />
            </h2>
          </div>
          <div className="svcgrid">
            {SERVICES.map((s, i) => (
              <article key={s.slug} data-reveal="up" data-stagger={String(i * 60)}>
                <b>{s.index}</b>
                <h3>
                  <a className="ulink" href={`/leistungen/${s.slug}`} data-transition="">
                    {s.title} {c.article}
                  </a>
                </h3>
                <p>{s.claim}</p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 'clamp(40px,5vw,80px)', display: 'grid', gap: '20px', maxWidth: '76ch' }}>
            <h2 className="d-sm">Warum lokale Sichtbarkeit {c.article} zählt</h2>
            <p style={{ color: 'var(--dim)' }}>
              Wer {c.article} nach einer Agentur, einem Handwerksbetrieb oder einer Praxis sucht, entscheidet sich
              meist innerhalb der ersten Ergebnisse. Dafür braucht es mehr als eine schöne Website: konsistente
              Unternehmensdaten, eigene Seiten je Leistung und Standort, schnelle Ladezeiten auf dem Smartphone und
              Inhalte, die die tatsächlichen Fragen Ihrer Kundschaft beantworten.
            </p>
            <p style={{ color: 'var(--dim)' }}>
              Genau daran arbeiten wir: Wir verbinden technische Optimierung mit einem Auftritt, der auch ohne
              Suchmaschine überzeugt. Denn Sichtbarkeit bringt nur dann Anfragen, wenn das, was danach kommt,
              standhält. Bekannte Stadtteile wie {c.local.join(', ')} zeigen dabei, wie unterschiedlich Zielgruppen
              innerhalb einer Stadt suchen.
            </p>
          </div>

          <div style={{ marginTop: 'clamp(34px,4.4vw,64px)', display: 'grid', gap: '18px' }}>
            <p className="kicker">Weitere Standorte</p>
            <div className="cities">
              {others.map((o) => (
                <a key={o.slug} href={`/standorte/${o.slug}`} data-transition="">
                  <b>Agentur {o.name}</b>
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
    </>
  );
}
