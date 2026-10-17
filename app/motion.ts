/* ============================================================
   BOUND FOR FUTURE — Motion Engine
   Abhängigkeitsfrei. Ein rAF-Loop, gecachte Messwerte,
   ausschließlich transform / opacity / filter / clip-path.
   ============================================================ */
import { mountGlobe, type GlobeHandle } from './globe';
import { PLACES } from '@/lib/geo';

type Cleanup = () => void;

const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = () => typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll(s)) as T[];

/* ---------------- Scroll-Tracks ---------------- */
type Measure = (el: HTMLElement, vh: number) => [number, number];
interface Track { el: HTMLElement; measure: Measure; cb: (p: number) => void; s: number; e: number; p: number }
let tracks: Track[] = [];
let observers: IntersectionObserver[] = [];
let listeners: [EventTarget, string, EventListenerOrEventListenerObject, boolean | AddEventListenerOptions][] = [];

function on<K extends keyof WindowEventMap>(t: EventTarget, ev: string, fn: EventListenerOrEventListenerObject, opt: boolean | AddEventListenerOptions = false) {
  t.addEventListener(ev, fn, opt);
  listeners.push([t, ev, fn, opt]);
}
function addTrack(el: HTMLElement | null, measure: Measure, cb: (p: number) => void) {
  if (el) tracks.push({ el, measure, cb, s: 0, e: 1, p: -1 });
}
function measureAll() {
  const vh = window.innerHeight;
  for (const t of tracks) {
    const [s, e] = t.measure(t.el, vh);
    t.s = s; t.e = e === s ? s + 1 : e; t.p = -1;
  }
}
const docTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

/* ---------------- Smooth Scroll ---------------- */
const smooth = { target: 0, current: 0, active: false, velocity: 0, self: 0 };
function initSmooth(): Cleanup {
  if (reduced() || !fine()) return () => {};
  document.documentElement.classList.add('lenis');
  smooth.target = smooth.current = window.scrollY;
  smooth.active = true;
  const maxY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const onWheel = (e: Event) => {
    const w = e as WheelEvent;
    if (document.body.classList.contains('menu-open')) return;
    if ((w.target as HTMLElement)?.closest?.('[data-native-scroll]')) return;
    w.preventDefault();
    const unit = w.deltaMode === 1 ? 18 : w.deltaMode === 2 ? window.innerHeight : 1;
    smooth.target = clamp(smooth.target + w.deltaY * unit, 0, maxY());
  };
  const onKey = (e: Event) => {
    const k = (e as KeyboardEvent).key;
    const tag = ((e as KeyboardEvent).target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    const step = k === 'PageDown' || k === ' ' ? window.innerHeight * 0.9
      : k === 'PageUp' ? -window.innerHeight * 0.9
      : k === 'ArrowDown' ? 90 : k === 'ArrowUp' ? -90
      : k === 'End' ? maxY() : k === 'Home' ? -maxY() : 0;
    if (!step) return;
    e.preventDefault();
    smooth.target = clamp(smooth.target + step, 0, maxY());
  };
  const onScroll = () => {
    if (smooth.self > 0) { smooth.self = 0; return; }
    if (Math.abs(window.scrollY - smooth.current) > 2) smooth.target = smooth.current = window.scrollY;
  };
  on(window, 'wheel', onWheel, { passive: false });
  on(window, 'keydown', onKey);
  on(window, 'scroll', onScroll, { passive: true });
  return () => { smooth.active = false; document.documentElement.classList.remove('lenis'); };
}
function scrollToY(y: number) {
  const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const t = clamp(y, 0, maxY);
  if (smooth.active) smooth.target = t;
  else window.scrollTo({ top: t, behavior: reduced() ? 'auto' : 'smooth' });
}

/* ---------------- Reveals ---------------- */
function initReveals() {
  const els = $$('[data-reveal]');
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
  observers.push(io);
  els.forEach((el) => {
    const st = el.getAttribute('data-stagger');
    if (st) el.style.setProperty('--d', st + 'ms');
    io.observe(el);
  });

  const mio = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      const host = en.target as HTMLElement;
      $$('.line-mask', host).forEach((m, i) => {
        (m as HTMLElement).style.setProperty('--d', i * 92 + 'ms');
        m.classList.add('is-in');
      });
      mio.unobserve(host);
    }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.12 });
  observers.push(mio);
  $$('.lines').forEach((el) => mio.observe(el));

  // Zeichenweise Enthüllung
  const cio = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      en.target.classList.add('is-in');
      cio.unobserve(en.target);
    }
  }, { threshold: 0.3 });
  observers.push(cio);
  $$('.chars').forEach((el) => {
    if (el.dataset.split === '1') { cio.observe(el); return; }
    const txt = el.textContent || '';
    el.textContent = '';
    let i = 0;
    for (const ch of txt) {
      const b = document.createElement('b');
      b.textContent = ch === ' ' ? ' ' : ch;
      b.style.setProperty('--cd', (i * 22) + 'ms');
      el.appendChild(b);
      i++;
    }
    el.dataset.split = '1';
    cio.observe(el);
  });

  requestAnimationFrame(() => {
    const vhNow = window.innerHeight;
    els.forEach((el) => {
      if (el.classList.contains('is-in')) return;
      if (el.getBoundingClientRect().top < vhNow - 8) { el.classList.add('is-in'); io.unobserve(el); }
    });
  });
}

/* ---------------- Navigation ---------------- */
function initNav() {
  const body = document.body;
  const menu = $('.menu');
  const burger = $('.nav__burger');
  const progress = $('.nav__progress i');

  const onScroll = () => {
    body.classList.toggle('scrolled', window.scrollY > 20);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? clamp(window.scrollY / max) : 0).toFixed(4) + ')';
    }
  };
  onScroll();
  on(window, 'scroll', onScroll, { passive: true });

  const close = () => {
    body.classList.remove('menu-open');
    body.style.overflow = '';
    burger?.setAttribute('aria-expanded', 'false');
  };
  if (burger) on(burger, 'click', () => {
    const open = body.classList.toggle('menu-open');
    body.style.overflow = open ? 'hidden' : '';
    burger.setAttribute('aria-expanded', String(open));
  });
  if (menu) on(menu, 'click', (e) => { if ((e.target as HTMLElement).closest('a')) close(); });
  on(document, 'keydown', (e) => { if ((e as KeyboardEvent).key === 'Escape') close(); });

  on(document, 'click', (e) => {
    const a = (e.target as HTMLElement).closest?.('a[href*="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const hash = href.slice(href.indexOf('#') + 1);
    if (!hash || href.startsWith('http')) return;
    const path = href.split('#')[0];
    if (path && path !== '/' && path !== location.pathname) return;
    const t = document.getElementById(hash);
    if (!t) return;
    e.preventDefault();
    close();
    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
    scrollToY(docTop(t) - navH - 6);
    history.replaceState(null, '', '#' + hash);
  });

  const links = $$<HTMLAnchorElement>('.nav__links a[href*="#"]');
  const sections = links.map((l) => document.getElementById((l.getAttribute('href') || '').split('#')[1] || '')).filter(Boolean) as HTMLElement[];
  if (sections.length) {
    const sio = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        links.forEach((l) => l.setAttribute('aria-current', String((l.getAttribute('href') || '').endsWith('#' + en.target.id))));
      }
    }, { rootMargin: '-45% 0px -50% 0px' });
    observers.push(sio);
    sections.forEach((s) => sio.observe(s));
  }
}

/* ---------------- Cursor + Magnete ---------------- */
const cur = { x: 0, y: 0, cx: 0, cy: 0, on: false };
function initCursor() {
  if (!fine() || reduced()) return;
  const ring = $('.cursor'), dot = $('.cursor-dot'), label = $('.cursor__label');
  if (!ring || !dot) return;
  const root = document.documentElement;
  cur.on = true;
  on(window, 'pointermove', (e) => {
    const p = e as PointerEvent;
    cur.x = p.clientX; cur.y = p.clientY;
    if (!root.classList.contains('cursor-ready')) root.classList.add('cursor-ready');
  }, { passive: true });
  on(document, 'pointerover', (e) => {
    const t = e.target as HTMLElement;
    const media = t.closest?.('[data-cursor]') as HTMLElement | null;
    const hot = t.closest?.('a, button, [role="button"], input, textarea, label');
    root.classList.toggle('cursor-media', !!media);
    root.classList.toggle('cursor-hot', !!hot && !media);
    if (media && label) label.textContent = media.getAttribute('data-cursor') || '';
  });
}

interface Magnet { el: HTMLElement; x: number; y: number; tx: number; ty: number; r: number }
let magnets: Magnet[] = [];
function initMagnets() {
  if (!fine() || reduced()) return;
  $$('[data-magnet]').forEach((el) => {
    const m: Magnet = { el, x: 0, y: 0, tx: 0, ty: 0, r: parseFloat(el.getAttribute('data-magnet') || '0.3') };
    magnets.push(m);
    on(el, 'pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const p = e as PointerEvent;
      m.tx = (p.clientX - (r.left + r.width / 2)) * m.r;
      m.ty = (p.clientY - (r.top + r.height / 2)) * m.r;
    });
    on(el, 'pointerleave', () => { m.tx = 0; m.ty = 0; });
  });
}

/* ---------------- Marquee ---------------- */
interface MQ { track: HTMLElement; x: number; w: number; base: number; dir: number }
let marquees: MQ[] = [];
function initMarquee() {
  $$('.marquee__track').forEach((track) => {
    const group = $('.marquee__group', track);
    if (!group) return;
    marquees.push({
      track, x: 0, w: group.getBoundingClientRect().width,
      base: parseFloat(track.getAttribute('data-speed') || '0.5'),
      dir: track.getAttribute('data-dir') === 'rtl' ? -1 : 1,
    });
  });
}

/* ---------------- Globus + HUD ---------------- */
let globe: GlobeHandle | null = null;
function noGL() {
  return typeof location !== 'undefined' && (location.search.includes('nogl') ||
    (window as unknown as { __BFF_NO_GL?: boolean }).__BFF_NO_GL === true);
}
function initGlobe() {
  const host = $('.globe');
  if (!host) return;
  if (noGL()) { document.body.classList.add('intro-done'); return; }
  globe = mountGlobe(host, {});
  if (!globe) return;
  const g = globe;

  const skipBtn = $('.hero__skip');
  const done = () => { document.body.classList.add('intro-done'); };
  if (skipBtn) on(skipBtn, 'click', () => { g.skip(); done(); });
  window.setTimeout(done, 7600);
  if (reduced()) done();

  const hero = $('.hero');
  if (hero) {
    addTrack(hero, (el) => { const t = docTop(el); return [t, t + el.offsetHeight]; }, (p) => g.setScroll(p));
  }

  // HUD-Pins projizieren
  const hud = $('.hud');
  if (!hud) return;
  const pins = PLACES.map((pl) => {
    const el = document.createElement('div');
    el.className = 'hud__pin' + (pl.main ? ' hud__pin--main' : '') + ' hud__pin--' + pl.side;
    el.style.setProperty('--dy', pl.dy + 'px');
    el.innerHTML =
      '<div class="hud__dot"></div><div class="hud__label"><b>' + pl.label + '</b><span>' +
      pl.lat.toFixed(1) + '°N · ' + pl.lon.toFixed(1) + '°O</span></div>';
    hud.appendChild(el);
    return { el, pl };
  });
  hudPins = pins;
}
let hudPins: { el: HTMLElement; pl: (typeof PLACES)[number] }[] = [];

/* ---------------- Leistungs-Schiene ---------------- */
function initRail() {
  const rail = $('.svcRail'), track = $('.svcRail__track'), bar = $('.svcRail__bar i');
  if (!rail || !track) return;
  let dist = 0;
  const compute = () => {
    if (window.innerWidth <= 860) { dist = 0; track.style.transform = ''; rail.style.height = ''; return; }
    dist = Math.max(0, track.scrollWidth - window.innerWidth + 16);
    rail.style.height = window.innerHeight + dist * 1.08 + 'px';
  };
  compute();
  on(window, 'resize', compute);
  addTrack(rail, (el) => { const t = docTop(el); return [t, t + el.offsetHeight - window.innerHeight]; }, (p) => {
    if (!dist) return;
    track.style.transform = 'translate3d(' + (-p * dist).toFixed(2) + 'px,0,0)';
    if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
  });
}

/* ---------------- Arbeiten: Vorschau am Cursor ---------------- */
function initCasePeek() {
  const peek = $('.case__peek');
  if (!peek || !fine() || reduced()) return;
  const inner = $('[data-peek-art]', peek);
  $$('.case').forEach((row) => {
    on(row, 'pointerenter', () => {
      peek.classList.add('on');
      const art = $('.case__art', row);
      if (inner && art) inner.innerHTML = art.innerHTML;
    });
    on(row, 'pointerleave', () => peek.classList.remove('on'));
  });
  on(window, 'pointermove', (e) => {
    const p = e as PointerEvent;
    peek.style.left = p.clientX + 'px';
    peek.style.top = p.clientY + 'px';
  }, { passive: true });
}

/* ---------------- Prozess ---------------- */
function initProcess() {
  const sec = $('#prozess');
  if (!sec) return;
  const rows = $$('.proc__row', sec);
  const big = $('.proc__big u'), label = $('.proc__label'), bar = $('.proc__bar i');
  const meta = $('.proc__meta');
  const ladder = $$('.proc__ladder li', sec);
  if (!rows.length) return;
  const names = rows.map((r) => r.getAttribute('data-title') || '');
  let cur2 = -1;
  addTrack(sec, (el) => { const t = docTop(el); return [t - window.innerHeight * 0.55, t + el.offsetHeight - window.innerHeight * 0.6]; }, (p) => {
    const i = clamp(Math.floor(p * rows.length), 0, rows.length - 1);
    if (bar) bar.style.transform = 'scaleX(' + clamp(p).toFixed(4) + ')';
    if (i === cur2) return;
    cur2 = i;
    rows.forEach((r, k) => r.classList.toggle('on', k === i));
    ladder.forEach((l, k) => l.classList.toggle('on', k <= i));
    const swap = () => {
      if (big) big.textContent = String(i + 1).padStart(2, '0');
      if (label) label.textContent = names[i];
      if (meta) meta.textContent = 'Schritt ' + (i + 1) + ' von ' + rows.length;
    };
    const wrap = big?.parentElement;
    if (!wrap || reduced()) { swap(); return; }
    wrap.classList.add('roll');
    window.setTimeout(() => { swap(); wrap.classList.remove('roll'); }, 250);
  });
}

/* ---------------- Zähler ---------------- */
function initCounters() {
  const els = $$('[data-count]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      const el = en.target as HTMLElement;
      io.unobserve(el);
      const to = parseFloat(el.getAttribute('data-count') || '0');
      const dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const pre = el.getAttribute('data-prefix') || '';
      const suf = el.getAttribute('data-suffix') || '';
      const fmt = (v: number) => pre + v.toFixed(dec).replace('.', ',') + suf;
      if (reduced()) { el.textContent = fmt(to); continue; }
      const t0 = performance.now(), dur = 1700;
      const step = (t: number) => {
        const k = clamp((t - t0) / dur);
        el.textContent = fmt(to * easeOutExpo(k));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, { threshold: 0.4 });
  observers.push(io);
  els.forEach((e) => io.observe(e));
}

/* ---------------- Parallax ---------------- */
function initParallax() {
  $$('[data-parallax]').forEach((el) => {
    const amt = parseFloat(el.getAttribute('data-parallax') || '10');
    const host = (el.closest('[data-parallax-host]') as HTMLElement) || (el.parentElement as HTMLElement) || el;
    addTrack(host, (e) => { const t = docTop(e); return [t - window.innerHeight, t + e.offsetHeight]; },
      (p) => { el.style.transform = 'translate3d(0,' + ((p - 0.5) * amt).toFixed(2) + '%,0)'; });
  });
}

/* ---------------- FAQ ---------------- */
function initFaq() {
  $$('.faq__item').forEach((item) => {
    const q = $('.faq__q', item), a = $('.faq__a', item);
    if (!q || !a) return;
    on(q, 'click', () => {
      const open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', String(open));
      a.style.height = open ? a.scrollHeight + 'px' : '0px';
    });
  });
}

/* ---------------- Hero-Mechaniken der Leistungsseiten ---------------- */
function initMech() {
  const mech = $('.mech');
  if (!mech) return;
  const host = mech.closest('.phead') as HTMLElement | null;
  if (!host) return;

  // Browserfenster im Raum
  const browsers = $$('.mech__browser', mech);
  browsers.forEach((b, i) => {
    const depth = parseFloat(b.getAttribute('data-depth') || String(1 + i * 0.4));
    addTrack(host, (el) => { const t = docTop(el); return [t, t + el.offsetHeight]; }, (p) => {
      b.style.transform =
        'translate3d(' + (-p * 8 * depth).toFixed(2) + 'vw,' + (p * 16 * depth).toFixed(2) + 'vh,0) ' +
        'rotateY(' + (-14 + p * 8).toFixed(2) + 'deg) rotateX(' + (6 - p * 5).toFixed(2) + 'deg) scale(' + (1 - p * 0.08).toFixed(3) + ')';
    });
  });

  // Diagrammbalken
  const bars = $$('.mech__chart i', mech);
  if (bars.length) {
    const io = new IntersectionObserver((en) => {
      if (!en[0].isIntersecting) return;
      bars.forEach((b, i) => {
        b.style.setProperty('--d', i * 70 + 'ms');
        b.style.transform = 'scaleY(' + (0.18 + parseFloat(b.getAttribute('data-h') || '0.5') * 0.82).toFixed(3) + ')';
      });
      io.disconnect();
    }, { threshold: 0.2 });
    observers.push(io);
    io.observe(mech);
  }

  // Suchergebnisse steigen
  const rows = $$('.mech__row', mech);
  if (rows.length) {
    addTrack(host, (el) => { const t = docTop(el); return [t - window.innerHeight * 0.4, t + el.offsetHeight]; }, (p) => {
      rows.forEach((r, i) => {
        const target = parseInt(r.getAttribute('data-to') || String(i), 10);
        const now = lerp(i, target, clamp((p - 0.1) * 2.2));
        r.style.transform = 'translateY(' + ((now - i) * 100).toFixed(2) + '%)';
        r.classList.toggle('top', now < 0.6);
      });
    });
  }

  // Feed-Spalten mit unterschiedlicher Geschwindigkeit
  $$('.mech__col', mech).forEach((col, i) => {
    const sp = [16, -22, 12][i % 3];
    addTrack(host, (el) => { const t = docTop(el); return [t - window.innerHeight, t + el.offsetHeight]; },
      (p) => { col.style.transform = 'translate3d(0,' + ((p - 0.5) * sp).toFixed(2) + '%,0)'; });
  });

  // Markenraster
  const marks = $$('.mech__mark', mech);
  if (marks.length) {
    addTrack(host, (el) => { const t = docTop(el); return [t, t + el.offsetHeight]; }, (p) => {
      marks.forEach((m, i) => {
        const phase = clamp(p * 3 - i * 0.06);
        m.style.opacity = String(0.22 + phase * 0.78);
        m.style.transform = 'scale(' + (0.82 + phase * 0.18).toFixed(3) + ') rotate(' + ((1 - phase) * -8).toFixed(2) + 'deg)';
      });
    });
    const sw = $$('.mech__swatches i', mech);
    const io = new IntersectionObserver((en) => {
      if (!en[0].isIntersecting) return;
      sw.forEach((s, i) => { s.style.setProperty('--d', i * 80 + 'ms'); s.style.transform = 'scaleY(1)'; });
      io.disconnect();
    }, { threshold: 0.2 });
    observers.push(io);
    io.observe(mech);
  }
}

/* ---------------- Finale: Sternenhimmel ---------------- */
function initSky() {
  const host = $('.finale__sky');
  if (!host || noGL()) return;
  const cv = document.createElement('canvas');
  host.appendChild(cv);
  const c = cv.getContext('2d');
  if (!c) return;
  let w = 0, h = 0, dpr = 1, raf = 0, t = 0;
  type Star = { x: number; y: number; z: number; s: number };
  let stars: Star[] = [];
  const still = reduced();

  const size = () => {
    const r = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    w = Math.max(2, Math.round(r.width)); h = Math.max(2, Math.round(r.height));
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    cv.style.width = w + 'px'; cv.style.height = h + 'px';
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(280, (w * h) / 5200));
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h * 0.92, z: 0.2 + Math.random() * 0.8, s: 0.3 + Math.random() * 1.3,
    }));
  };
  const draw = () => {
    t += 0.006;
    c.clearRect(0, 0, w, h);
    for (const st of stars) {
      const tw = 0.55 + 0.45 * Math.sin(t * (0.6 + st.z * 2) + st.x * 0.02);
      c.globalAlpha = st.z * tw * 0.85;
      c.fillStyle = st.z > 0.75 ? '#cfe0ff' : '#8ea6cc';
      c.fillRect(st.x, st.y, st.s, st.s);
      if (!still) { st.x -= st.z * 0.16; if (st.x < -2) st.x = w + 2; }
    }
    // Planetenrand am unteren Bildrand
    c.globalAlpha = 1;
    const cx = w * 0.5, cy = h * 1.62, r = h * 1.06;
    const g = c.createRadialGradient(cx, cy, r * 0.92, cx, cy, r * 1.06);
    g.addColorStop(0, 'rgba(9,14,26,0)');
    g.addColorStop(0.68, 'rgba(60,110,215,0.20)');
    g.addColorStop(0.9, 'rgba(150,190,255,0.60)');
    g.addColorStop(0.965, 'rgba(190,215,255,0.75)');
    g.addColorStop(1, 'rgba(150,190,255,0)');
    c.fillStyle = g;
    c.beginPath(); c.arc(cx, cy, r * 1.06, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#05070E';
    c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.fill();
    if (!still) raf = requestAnimationFrame(draw);
  };
  size(); draw();
  on(window, 'resize', () => { size(); if (still) draw(); });
  observers.push({ disconnect: () => cancelAnimationFrame(raf) } as unknown as IntersectionObserver);
}

/* ---------------- Formular ---------------- */
function initForm() {
  const form = $<HTMLFormElement>('form.form');
  if (!form) return;
  const done = $('.form__done', form);
  const mailLink = $<HTMLAnchorElement>('[data-mailto]', form);
  on(form, 'submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity() || form.getAttribute('aria-busy') === 'true') return;
    const fd = new FormData(form);
    const get = (key: string) => String(fd.get(key) || '').trim();
    const payload = { name: get('name'), email: get('email'), nachricht: get('nachricht') };
    if (!payload.name || !payload.nachricht) {
      const field = $<HTMLInputElement | HTMLTextAreaElement>(!payload.name ? '#f-name' : '#f-msg', form);
      field?.setCustomValidity('Bitte füllen Sie dieses Feld aus.');
      field?.reportValidity();
      field?.addEventListener('input', () => field.setCustomValidity(''), { once: true });
      return;
    }
    const body = `Name: ${payload.name}\nE-Mail: ${payload.email}\n\n${payload.nachricht}`;
    const to = form.getAttribute('data-mail');
    if (!to) return;
    const href = `mailto:${to}?subject=${encodeURIComponent('Projektanfrage — ' + payload.name)}&body=${encodeURIComponent(body)}`;
    if (mailLink) mailLink.href = href;
    const button = $<HTMLButtonElement>('button[type="submit"]', form);
    form.setAttribute('aria-busy', 'true');
    if (button) button.disabled = true;
    let sent = false;
    const endpoint = form.getAttribute('data-endpoint');
    if (endpoint) {
      const ac = new AbortController();
      const timeout = setTimeout(() => ac.abort(), 10000);
      try {
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: ac.signal });
        const result = await response.json();
        sent = response.ok && result.ok === true;
      } catch { sent = false; }
      finally { clearTimeout(timeout); }
    }
    form.removeAttribute('aria-busy');
    if (button) button.disabled = false;
    const title = $('[data-result-title]', form);
    const message = $('[data-result-body]', form);
    if (title) title.textContent = sent ? 'Angekommen.' : 'Bitte per E-Mail senden.';
    if (message) message.textContent = sent
      ? 'Danke — wir melden uns innerhalb von 24 Stunden.'
      : 'Der direkte Versand hat nicht geklappt. Öffnen Sie Ihr E-Mail-Programm und senden Sie die vorbereitete Anfrage ab.';
    const note = $('[data-fallback]', form);
    if (note) (note as HTMLElement).hidden = sent;
    form.classList.add('done');
    (done as HTMLElement | null)?.focus();
  });
}

/* ---------------- Seitenübergang ---------------- */
function initTransitions() {
  on(document, 'click', (e) => {
    const a = (e.target as HTMLElement).closest?.('a[data-transition]') as HTMLAnchorElement | null;
    if (!a || reduced()) return;
    const ev = e as MouseEvent;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || ev.metaKey || ev.ctrlKey || a.target === '_blank') return;
    e.preventDefault();
    document.documentElement.classList.remove('loaded');
    window.setTimeout(() => { location.href = a.href; }, 480);
  });
}

/* ---------------- Loop ---------------- */
let rafId = 0;
function loop() {
  if (smooth.active) {
    const prev = smooth.current;
    smooth.current = lerp(smooth.current, smooth.target, 0.16);
    if (Math.abs(smooth.target - smooth.current) < 0.12) smooth.current = smooth.target;
    smooth.velocity = smooth.current - prev;
    if (Math.abs(window.scrollY - smooth.current) > 0.4) { smooth.self++; window.scrollTo(0, smooth.current); }
  } else {
    const y = window.scrollY;
    smooth.velocity = y - smooth.current;
    smooth.current = y;
  }

  const y = smooth.active ? smooth.current : window.scrollY;
  for (const t of tracks) {
    const p = clamp((y - t.s) / (t.e - t.s));
    if (Math.abs(p - t.p) > 0.0004) { t.p = p; t.cb(p); }
  }

  const boost = clamp(Math.abs(smooth.velocity) * 0.05, 0, 3.4);
  for (const m of marquees) {
    if (!m.w) continue;
    m.x -= m.dir * m.base * (1 + boost);
    if (m.x <= -m.w) m.x += m.w;
    if (m.x >= 0) m.x -= m.w;
    m.track.style.transform = 'translate3d(' + m.x.toFixed(2) + 'px,0,0)';
  }

  if (cur.on) {
    cur.cx = lerp(cur.cx, cur.x, 0.17);
    cur.cy = lerp(cur.cy, cur.y, 0.17);
    const ring = document.querySelector('.cursor') as HTMLElement | null;
    const dot = document.querySelector('.cursor-dot') as HTMLElement | null;
    if (ring) ring.style.transform = 'translate3d(' + cur.cx.toFixed(1) + 'px,' + cur.cy.toFixed(1) + 'px,0)';
    if (dot) dot.style.transform = 'translate3d(' + cur.x.toFixed(1) + 'px,' + cur.y.toFixed(1) + 'px,0)';
  }

  for (const m of magnets) {
    m.x = lerp(m.x, m.tx, 0.15);
    m.y = lerp(m.y, m.ty, 0.15);
    if (Math.abs(m.x) < 0.02 && Math.abs(m.y) < 0.02) { m.x = 0; m.y = 0; }
    m.el.style.transform = 'translate3d(' + m.x.toFixed(2) + 'px,' + m.y.toFixed(2) + 'px,0)';
  }

  if (globe && hudPins.length) {
    for (const { el, pl } of hudPins) {
      const pr = globe.project(pl.lat, pl.lon);
      const show = pr && pr.front && document.body.classList.contains('intro-done');
      el.classList.toggle('on', !!show);
      if (pr) { el.style.left = pr.x + 'px'; el.style.top = pr.y + 'px'; }
    }
  }

  rafId = requestAnimationFrame(loop);
}

/* ---------------- Boot ---------------- */
export function boot(): Cleanup {
  const root = document.documentElement;
  root.classList.add('js');
  const cleanups: Cleanup[] = [];
  cleanups.push(initSmooth());
  window.setTimeout(initReveals, reduced() ? 0 : 900);
  initNav();
  initCursor();
  initMagnets();
  initMarquee();
  initGlobe();
  initRail();
  initCasePeek();
  initProcess();
  initCounters();
  initParallax();
  initFaq();
  initMech();
  initSky();
  initForm();
  initTransitions();

  measureAll();
  let rt = 0;
  const onResize = () => { window.clearTimeout(rt); rt = window.setTimeout(measureAll, 130); };
  on(window, 'resize', onResize);
  on(window, 'load', () => window.setTimeout(measureAll, 80));
  if ('fonts' in document) (document as Document & { fonts: FontFaceSet }).fonts.ready.then(() => measureAll());

  rafId = requestAnimationFrame(loop);
  window.setTimeout(() => root.classList.add('ready'), 40);
  window.setTimeout(() => root.classList.add('loaded'), 820);

  return () => {
    cancelAnimationFrame(rafId);
    cleanups.forEach((c) => c());
    listeners.forEach(([t, ev, fn, opt]) => t.removeEventListener(ev, fn, opt as boolean));
    listeners = [];
    observers.forEach((o) => o.disconnect());
    observers = [];
    globe?.destroy();
    globe = null;
    hudPins = [];
    tracks = [];
    magnets = [];
    marquees = [];
    document.body.classList.remove('intro-done', 'menu-open', 'scrolled');
    root.classList.remove('loaded', 'ready');
  };
}
