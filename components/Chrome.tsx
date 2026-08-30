import type { CSSProperties } from 'react';
import { BRAND, NAV, SERVICES } from '@/lib/content';
import { Arrow, Wordmark } from './ui';

export function Curtain() {
  return (
    <div className="curtain" aria-hidden="true">
      <div className="curtain__mark">
        <Wordmark solo style={{ fontSize: 'clamp(1.6rem, 4.4vw, 2.6rem)' }} />
        <div className="curtain__bar">
          <i />
        </div>
      </div>
    </div>
  );
}

export function Cursor() {
  return (
    <>
      <div className="cursor" aria-hidden="true">
        <span className="cursor__label" />
      </div>
      <div className="cursor-dot" aria-hidden="true" />
    </>
  );
}

export function Backdrop() {
  return (
    <>
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-noise" aria-hidden="true" />
    </>
  );
}

export function Nav() {
  return (
    <>
      <header className="nav">
        <div className="shell nav__in">
          <a className="nav__logo" href="/" aria-label={`${BRAND.name} — Startseite`}>
            <Wordmark />
          </a>
          <nav className="nav__links" aria-label="Hauptnavigation">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="nav__right">
            <a className="btn nav__cta" href="/#kontakt" data-magnet="0.22">
              Projekt starten <Arrow />
            </a>
            <button className="nav__burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Menü">
              <i />
              <i />
            </button>
          </div>
        </div>
        <div className="nav__progress" aria-hidden="true">
          <i />
        </div>
      </header>

      <div className="menu" id="menu">
        <div className="shell">
          <nav className="menu__list" aria-label="Mobile Navigation">
            {NAV.map((n, i) => (
              <a key={n.href} href={n.href} style={{ '--d': `${110 + i * 55}ms` } as CSSProperties}>
                <span>{n.label}</span>
              </a>
            ))}
          </nav>
          <div className="menu__foot">
            <div style={{ display: 'grid', gap: '8px' }}>
              <p className="mono">Leistungen</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px' }}>
                {SERVICES.map((s) => (
                  <a className="ulink" key={s.slug} href={`/leistungen/${s.slug}`} data-transition="" style={{ fontSize: '0.9375rem', color: 'var(--dim)' }}>
                    {s.short}
                  </a>
                ))}
              </div>
            </div>
            <a className="btn btn--accent" href="/#kontakt" style={{ justifySelf: 'start' }}>
              Projekt starten <Arrow />
            </a>
            <a className="ulink" href={`mailto:${BRAND.email}`} style={{ color: 'var(--dim)' }}>
              {BRAND.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
