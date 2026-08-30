/** Abstrakte Vektorgrafiken — deterministisch, inline, ohne Bilddateien. */

function rnd(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function TileArt({ kind, tint }: { kind: string; tint: string }) {
  const r = rnd(kind.length * 977 + kind.charCodeAt(0) * 31);
  const paths: string[] = [];
  if (kind === 'browser') {
    for (let i = 0; i < 5; i++) paths.push(`M${20 + i * 14} ${40 + i * 12} h${180 - i * 22} v${110 - i * 14} h-${180 - i * 22} Z`);
  } else if (kind === 'brand') {
    for (let i = 0; i < 26; i++) {
      const x = 20 + (i % 7) * 34, y = 30 + Math.floor(i / 7) * 40;
      paths.push(`M${x} ${y} m-11 0 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0`);
    }
  } else if (kind === 'campaign') {
    for (let i = 0; i < 12; i++) {
      const h = 20 + r() * 130;
      paths.push(`M${18 + i * 20} ${190} v-${h} h12 v${h} Z`);
    }
  } else if (kind === 'serp') {
    for (let i = 0; i < 7; i++) paths.push(`M20 ${30 + i * 24} h${90 + r() * 130} `);
  } else if (kind === 'feed') {
    for (let i = 0; i < 9; i++) {
      const x = 16 + (i % 3) * 84, y = 16 + Math.floor(i / 3) * 62;
      paths.push(`M${x} ${y} h72 v52 h-72 Z`);
    }
  } else {
    for (let i = 0; i < 16; i++) {
      const x1 = 20 + r() * 230, y1 = 20 + r() * 170, x2 = 20 + r() * 230, y2 = 20 + r() * 170;
      paths.push(`M${x1.toFixed(0)} ${y1.toFixed(0)} L${x2.toFixed(0)} ${y2.toFixed(0)}`);
    }
  }
  return (
    <svg className="tile__art" viewBox="0 0 270 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`tg-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tint} stopOpacity="0.5" />
          <stop offset="1" stopColor={tint} stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <g stroke={`url(#tg-${kind})`} strokeWidth="1" fill="none">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

export function CaseArt({ seed, tint }: { seed: string; tint: string }) {
  const r = rnd(seed.split('').reduce((a, c) => a + c.charCodeAt(0) * 7, 11));
  const bars = Array.from({ length: 26 }, () => r());
  const rings = Array.from({ length: 6 }, (_, i) => 24 + i * 16);
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id={`cg-${seed}`} cx="0.34" cy="0.3" r="0.9">
          <stop offset="0" stopColor={tint} stopOpacity="0.42" />
          <stop offset="1" stopColor={tint} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="#0B1018" />
      <rect width="400" height="300" fill={`url(#cg-${seed})`} />
      <g stroke={tint} strokeOpacity="0.35" fill="none">
        {rings.map((rr, i) => (
          <circle key={i} cx="300" cy="70" r={rr} strokeOpacity={0.06 + i * 0.03} />
        ))}
      </g>
      <g fill={tint} fillOpacity="0.55">
        {bars.map((b, i) => (
          <rect key={i} x={14 + i * 14.5} y={280 - b * 150} width="6" height={b * 150} />
        ))}
      </g>
      <g stroke="#EAEEF6" strokeOpacity="0.10">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1="0" y1={i * 34} x2="400" y2={i * 34} />
        ))}
      </g>
    </svg>
  );
}
