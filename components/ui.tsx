import type { CSSProperties, ReactNode } from 'react';
import { BRAND } from '@/lib/content';

export function Lines({ items, className }: { items: ReadonlyArray<ReactNode>; className?: string }) {
  return (
    <span className={['lines', className].filter(Boolean).join(' ')}>
      {items.map((t, i) => (
        <span className="line-mask" key={i}>
          <i>{t}</i>
        </span>
      ))}
    </span>
  );
}

export function Arrow({ className = 'arw' }: { className?: string }) {
  return (
    <svg className={className} width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true" focusable="false">
      <path d="M8.6 1L13.8 6L8.6 11M13.6 6H0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

/** Randfüllende Wortmarke — Breite unabhängig von der geladenen Schrift. */
export function WordmarkFill() {
  return (
    <svg viewBox="0 0 1000 250" role="img" aria-label={BRAND.name} preserveAspectRatio="xMidYMid meet">
      <text
        x="0" y="168" textLength="1000" lengthAdjust="spacingAndGlyphs"
        fontFamily="var(--ff-display)" fontWeight="800" fontSize="210"
        style={{ fontVariationSettings: "'wdth' 122" }} fill="currentColor"
      >
        BOUND
      </text>
      <text
        x="0" y="238" textLength="1000" lengthAdjust="spacingAndGlyphs"
        fontFamily="var(--ff-mono)" fontWeight="400" fontSize="52"
        fill="var(--dim)"
      >
        FOR FUTURE
      </text>
    </svg>
  );
}

export function Kicker({ children, dot }: { children: ReactNode; dot?: boolean }) {
  return <p className={dot ? 'kicker kicker--dot' : 'kicker'}>{children}</p>;
}

export function Wordmark({ solo, style }: { solo?: boolean; style?: CSSProperties }) {
  return (
    <span className={solo ? 'wm wm--solo' : 'wm'} style={style} aria-label={BRAND.name}>
      <span className="wm__top" aria-hidden="true">
        BOUND
      </span>
      <span className="wm__sub" aria-hidden="true">
        FOR FUTURE
      </span>
    </span>
  );
}
