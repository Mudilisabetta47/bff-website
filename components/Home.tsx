import type { CSSProperties } from 'react';
import {
  BRAND, HERO, INTRO, SERVICES, PROJECTS, WHY, PROCESS, STATS, CONTACT, FOOTER, CITIES,
} from '@/lib/content';
import { Arrow, Kicker, Lines, Wordmark, WordmarkFill } from './ui';
import { TileArt, CaseArt } from './art';

/* ---------------- Hero ---------------- */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="globe" aria-hidden="true">
        <div className="globe__fallback" />
      </div>
      <div className="hud" aria-hidden="true" />
      <div className="hero__scrim" aria-hidden="true" />

      <div className="shell hero__in">
        <div className="hero__top">
          <Kicker>{HERO.eyebrow}</Kicker>
          <p className="mono">{HERO.coords}</p>
        </div>

        <h1 className="display d-xl hero__title lines">
          <span className="line-mask">
            <i>{HERO.line1}</i>
          </span>
          <span className="line-mask l2">
            <i>{HERO.line2}</i>
          </span>
        </h1>

        <div className="hero__bottom">
          <div>
            <p className="lead" data-reveal="up" data-stagger="220">
              {HERO.lead}
            </p>
            <div className="hero__actions" data-reveal="up" data-stagger="340">
              <a className="btn btn--accent" href={HERO.primary.href} data-magnet="0.24">
                {HERO.primary.label} <Arrow />
              </a>
              <a className="btn btn--ghost" href={HERO.secondary.href} data-magnet="0.16">
                {HERO.secondary.label} <Arrow />
              </a>
            </div>
          </div>
          <div className="hero__meta">
            <button className="hero__skip" type="button">
              {HERO.skip} <Arrow />
            </button>
            <span className="hero__scroll mono" aria-hidden="true">
              <i />
              {HERO.scroll}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Marquee({ items, dir = 'ltr' }: { items: string[]; dir?: 'ltr' | 'rtl' }) {
  const group = (
    <div className="marquee__group">
      {items.map((m) => (
        <span key={m}>{m}</span>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" data-speed="0.45" data-dir={dir}>
        {group}
        {group}
        {group}
      </div>
    </div>
  );
}

/* ---------------- Intro ---------------- */
export function Intro() {
  return (
    <section className="section" id="studio" aria-labelledby="intro-h">
      <div className="shell">
        <div className="intro__grid">
          <div style={{ display: 'grid', gap: 'clamp(20px,2.6vw,32px)' }}>
            <Kicker>{INTRO.kicker}</Kicker>
            <h2 className="display d-lg" id="intro-h">
              <Lines items={INTRO.lines} />
            </h2>
          </div>
          <p className="lead" data-reveal="up" data-stagger="120" style={{ maxWidth: '52ch' }}>
            {INTRO.lead}
          </p>
        </div>

        <div className="intro__points">
          {INTRO.points.map((p, i) => (
            <article className="point" key={p.n} data-reveal="up" data-stagger={String(i * 90)}>
              <b>{p.n}</b>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Leistungen ---------------- */
export function ServicesRail() {
  return (
    <section className="svc" id="leistungen" aria-labelledby="svc-h">
      <div className="shell" style={{ paddingBottom: 'clamp(34px,4vw,60px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: '20px' }}>
          <div style={{ display: 'grid', gap: 'clamp(18px,2.4vw,30px)' }}>
            <Kicker>Leistungen</Kicker>
            <h2 className="display d-lg" id="svc-h">
              <Lines items={['Sechs Disziplinen.', 'Ein Team.']} />
            </h2>
          </div>
          <p className="mono" data-reveal="fade">
            Jede Leistung mit eigener Seite
          </p>
        </div>
      </div>

      <div className="svcRail">
        <div className="svcRail__pin">
          <div className="svcRail__track">
            {SERVICES.map((s) => (
              <article className="tile" key={s.slug} style={{ '--tint': s.accent } as CSSProperties}>
                <a
                  className="tile__link"
                  href={`/leistungen/${s.slug}`}
                  data-transition=""
                  data-cursor="Ansehen"
                  aria-label={`${s.title} — Leistung ansehen`}
                />
                <TileArt kind={s.hero} tint={s.accent} />
                <div className="tile__head">
                  <span className="tile__n">{s.index}</span>
                  <span className="mono">Leistung</span>
                </div>
                <div className="tile__body">
                  <h3 className="tile__title">{s.title}</h3>
                  <p className="tile__claim">{s.claim}</p>
                  <span className="tile__go">
                    Zur Leistungsseite <Arrow />
                  </span>
                </div>
              </article>
            ))}

            <article className="tile" style={{ '--tint': 'var(--accent)' } as CSSProperties}>
              <a className="tile__link" href="/#kontakt" aria-label="Projekt starten" />
              <div className="tile__head">
                <span className="tile__n">07</span>
                <span className="mono">Nächster Schritt</span>
              </div>
              <div className="tile__body">
                <h3 className="tile__title">Ihr Projekt steht hier als Nächstes.</h3>
                <span className="tile__go">
                  Projekt starten <Arrow />
                </span>
              </div>
            </article>
          </div>
          <div className="svcRail__bar" aria-hidden="true">
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Arbeiten ---------------- */
export function Work() {
  return (
    <section className="section" id="arbeiten" aria-labelledby="work-h">
      <div className="shell">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: '20px', marginBottom: 'clamp(30px,4vw,58px)' }}>
          <div style={{ display: 'grid', gap: 'clamp(18px,2.4vw,30px)' }}>
            <Kicker>Arbeiten</Kicker>
            <h2 className="display d-lg" id="work-h">
              <Lines items={['Konzeptstudien.']} />
            </h2>
          </div>
          <p className="lead" data-reveal="fade" style={{ maxWidth: '40ch', fontSize: '0.9375rem' }}>
            BOUND FOR FUTURE startet ohne fremde Federn. Was Sie hier sehen, sind eigene Studien — keine erfundenen
            Kunden, keine geliehenen Ergebnisse.
          </p>
        </div>

        <div className="work__list">
          {PROJECTS.map((p, i) => (
            <article className="case" key={p.slug}>
              <a className="case__link" href={`/arbeiten/${p.slug}`} data-transition="" aria-label={`${p.name} — Konzeptstudie ansehen`} />
              <span className="case__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="case__name">{p.name}</h3>
              <p className="case__meta">{p.claim}</p>
              <ul className="case__tags">
                {p.disciplines.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <span className="case__arrow">
                <Arrow className="" />
              </span>
              <div className="case__art" hidden>
                <CaseArt seed={p.visual} tint={p.accent} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="case__peek" aria-hidden="true">
        <div data-peek-art style={{ width: '100%', height: '100%' }} />
      </div>
    </section>
  );
}

/* ---------------- Warum ---------------- */
export function Why() {
  return (
    <section className="section" aria-labelledby="why-h">
      <div className="shell">
        <div style={{ display: 'grid', gap: 'clamp(18px,2.4vw,30px)', marginBottom: 'clamp(30px,4vw,58px)' }}>
          <Kicker>{WHY.kicker}</Kicker>
          <h2 className="display d-lg" id="why-h">
            <Lines items={WHY.lines} />
          </h2>
        </div>
        <div className="why__grid">
          {WHY.items.map((w, i) => (
            <article className="why__cell" key={w.n} data-reveal="up" data-stagger={String(i * 80)}>
              <b>{w.n}</b>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Prozess ---------------- */
export function Process() {
  return (
    <section className="section" id="prozess" aria-labelledby="proc-h">
      <div className="shell">
        <div style={{ display: 'grid', gap: 'clamp(18px,2.4vw,30px)', marginBottom: 'clamp(30px,4vw,58px)' }}>
          <Kicker>Prozess</Kicker>
          <h2 className="display d-lg" id="proc-h">
            <Lines items={['Vom ersten Gedanken', 'zur fertigen Lösung.']} />
          </h2>
        </div>

        <div className="proc__grid">
          <div className="proc__sticky">
            <div className="proc__big" aria-hidden="true">
              <u>01</u>
            </div>
            <p className="proc__label" aria-hidden="true">
              {PROCESS[0].t}
            </p>
            <div className="proc__bar" aria-hidden="true">
              <i />
            </div>
            <p className="proc__meta">Schritt 1 von {PROCESS.length}</p>
            <ul className="proc__ladder" aria-hidden="true">
              {PROCESS.map((s2, i) => (
                <li key={s2.n} className={i === 0 ? 'on' : ''}>
                  <span>{s2.t}</span>
                </li>
              ))}
            </ul>
          </div>

          <ol className="proc__rows">
            {PROCESS.map((s, i) => (
              <li className={'proc__row' + (i === 0 ? ' on' : '')} key={s.n} data-title={s.t}>
                <b>{s.n}</b>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
                <em>{s.dur}</em>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Zahlen ---------------- */
export function Stats() {
  return (
    <section className="section section--tight" aria-labelledby="stats-h">
      <div className="shell">
        <div style={{ display: 'grid', gap: 'clamp(18px,2.4vw,30px)', marginBottom: 'clamp(26px,3.4vw,48px)' }}>
          <Kicker>{STATS.kicker}</Kicker>
          <h2 className="display d-md" id="stats-h">
            <Lines items={['Was wir zusichern —', 'und was nicht.']} />
          </h2>
        </div>
        <div className="stats__grid">
          {STATS.items.map((m, i) => (
            <div className="stat" key={m.label} data-reveal="up" data-stagger={String(i * 80)}>
              <span
                className="stat__v num"
                data-count={m.v}
                data-decimals={('decimals' in m ? m.decimals : 0) ?? 0}
                data-prefix={('prefix' in m ? m.prefix : '') ?? ''}
                data-suffix={m.suffix ?? ''}
              >
                {(('prefix' in m ? m.prefix : '') ?? '') + String(m.v).replace('.', ',') + (m.suffix ?? '')}
              </span>
              <span className="stat__l">{m.label}</span>
              <span className="stat__s">{m.sub}</span>
            </div>
          ))}
        </div>
        <p className="stats__note" data-reveal="up">
          <span>{STATS.note}</span>
        </p>
      </div>
    </section>
  );
}

/* ---------------- Finale + Kontakt ---------------- */
export function Finale() {
  return (
    <>
      <section className="finale" aria-labelledby="finale-h">
        <div className="finale__sky" aria-hidden="true" />
        <div className="finale__scrim" aria-hidden="true" />
        <div className="shell finale__in">
          <Kicker>Nächster Schritt</Kicker>
          <h2 className="display d-xl" id="finale-h" style={{ margin: 'clamp(20px,2.6vw,34px) 0' }}>
            <Lines items={['Lassen Sie uns', <>etwas bauen, das <span style={{ color: 'var(--accent)' }}>bleibt.</span></>]} />
          </h2>
          <div className="finale__row">
            <p className="lead" data-reveal="up">
              {CONTACT.lead}
            </p>
            <div data-reveal="up" data-stagger="120">
              <a className="btn btn--lg btn--accent" href="#kontakt" data-magnet="0.26">
                Projekt starten <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}

export function Contact() {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || undefined;
  return (
    <section className="section" id="kontakt" aria-labelledby="contact-h" style={{ paddingTop: 0 }}>
      <div className="shell">
        <div style={{ display: 'grid', gap: 'clamp(18px,2.4vw,30px)', marginBottom: 'clamp(30px,4vw,54px)' }}>
          <Kicker>{CONTACT.kicker}</Kicker>
          <h2 className="display d-md" id="contact-h">
            <Lines items={CONTACT.lines} />
          </h2>
        </div>

        <form className="form" data-mail={BRAND.email} data-endpoint="/api/kontakt" data-recaptcha={recaptchaKey}>
          <div className="form__steps">
            <p className="hp" aria-hidden="true">
              <label htmlFor="f-web">Website</label>
              <input id="f-web" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </p>
            <div className="fields">
              <p className="field">
                <input id="f-name" name="name" type="text" placeholder=" " required autoComplete="name" maxLength={120} />
                <label htmlFor="f-name">{CONTACT.fields.name}</label>
              </p>
              <p className="field">
                <input id="f-mail" name="email" type="email" placeholder=" " required autoComplete="email" maxLength={254} />
                <label htmlFor="f-mail">{CONTACT.fields.email}</label>
              </p>
              <p className="field field--full">
                <textarea id="f-msg" name="nachricht" placeholder=" " rows={3} required maxLength={5000} />
                <label htmlFor="f-msg">{CONTACT.fields.message}</label>
              </p>
            </div>
          </div>

          <p className="check">
            <input id="f-agb" name="agb" type="checkbox" required />
            <label htmlFor="f-agb">
              Ich habe die <a href="/agb" target="_blank" rel="noopener noreferrer">AGB</a> gelesen und akzeptiere sie.
            </label>
          </p>

          <div className="form__foot">
            <p className="form__legal">
              Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung der Anfrage zu. Mehr dazu in
              der <a href="/datenschutz">Datenschutzerklärung</a>.
              {recaptchaKey && (
                <> Diese Seite ist durch reCAPTCHA geschützt; es gelten die{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> und die{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Nutzungsbedingungen</a> von Google.</>
              )}
            </p>
            <button className="btn btn--lg btn--accent" type="submit" data-magnet="0.2">
              {CONTACT.submit} <Arrow />
            </button>
          </div>

          <div className="form__done" role="status" aria-live="polite" tabIndex={-1}>
            <p className="d-sm" data-result-title>{CONTACT.success.title}</p>
            <p className="lead" data-result-body>{CONTACT.success.body}</p>
            <p data-fallback>
              <a className="ulink" data-mailto href={`mailto:${BRAND.email}`}>
                E-Mail-Programm öffnen <Arrow />
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  const year = 2026;
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot__grid">
          <div className="foot__brand">
            <p className="d-sm" style={{ maxWidth: '20ch' }}>
              {BRAND.claim}
            </p>
            <a className="ulink" href={`mailto:${BRAND.email}`}>
              {BRAND.email}
            </a>
            <a className="ulink" href={`tel:${BRAND.phoneHref}`}>
              {BRAND.phone}
            </a>
            <p style={{ color: 'var(--dim)', fontSize: '0.875rem' }}>
              Eine Marke der <a className="ulink" href={BRAND.operatorUrl}>{BRAND.operator}</a>
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {FOOTER.social.map((s) => (
                <a className="ulink" key={s.l} href={s.h} style={{ color: 'var(--dim)', fontSize: '0.875rem' }}>
                  {s.l}
                </a>
              ))}
            </div>
          </div>
          {FOOTER.columns.map((c) => (
            <nav className="foot__col" key={c.title} aria-label={c.title}>
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l) => (
                  <li key={l.h + l.l}>
                    <a href={l.h} data-transition={l.h.includes('#') ? undefined : ''}>
                      {l.l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="foot__mark" data-reveal="fade">
          <i>
            <WordmarkFill />
          </i>
        </div>
        <p className="foot__claim" data-reveal="up">
          {BRAND.tagline}
        </p>

        <div className="foot__base">
          <p>
            © {year} {BRAND.name}. {BRAND.tagline}
          </p>
          <p>
            {CITIES.map((c) => c.name).join(' · ')}
          </p>
        </div>
      </div>
    </footer>
  );
}
