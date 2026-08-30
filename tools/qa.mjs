import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';
const OUT = '/home/claude/qa2';
mkdirSync(OUT, { recursive: true });
const FILE = 'file://' + process.cwd() + '/.build/bff-standalone.html';
const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });

async function shoot(name, viewport, route, spots, motion = 'reduce') {
  const ctx = await b.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: motion });
  await ctx.addInitScript(() => { window.__BFF_NO_GL = true; });
  const p = await ctx.newPage();
  p.setDefaultTimeout(60000);
  const errs = [];
  p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
  p.on('console', (m) => { if (m.type() === 'error' && !/ERR_(FILE|TUNNEL|NAME)/.test(m.text())) errs.push(m.text()); });
  await p.goto(FILE + (route === '/' ? '' : '#!' + route), { waitUntil: 'load' });
  await p.waitForTimeout(1800);
  const info = await p.evaluate(() => ({
    h: document.documentElement.scrollHeight,
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
  }));
  for (const s of spots) {
    await p.evaluate((y) => window.scrollTo(0, y), Math.round(info.h * s));
    await p.waitForTimeout(700);
    await p.screenshot({ path: `${OUT}/${name}-${String(Math.round(s * 100)).padStart(3, '0')}.png`, timeout: 90000 });
  }
  console.log(name.padEnd(16), 'h=' + info.h, info.sw > info.cw ? '!! OVERFLOW ' + info.sw + '>' + info.cw : 'ok', errs.length ? 'ERR: ' + errs.slice(0, 3).join(' | ') : '');
  await p.close(); await ctx.close();
}

const dsk = { width: 1512, height: 900 };
const mob = { width: 390, height: 844 };
await shoot('home-d', dsk, '/', [0, 0.08, 0.16, 0.24, 0.33, 0.42, 0.52, 0.62, 0.72, 0.82, 0.92, 1]);
await shoot('home-m', mob, '/', [0, 0.12, 0.25, 0.38, 0.5, 0.62, 0.75, 0.88, 1]);
await shoot('svc-web', dsk, '/leistungen/webdesign', [0, 0.2, 0.45, 0.7]);
await shoot('svc-brand', dsk, '/leistungen/branding', [0, 0.2]);
await shoot('svc-mkt', dsk, '/leistungen/online-marketing', [0, 0.2]);
await shoot('svc-seo', dsk, '/leistungen/seo', [0, 0.2]);
await shoot('svc-soc', dsk, '/leistungen/social-media', [0, 0.2]);
await shoot('svc-dig', dsk, '/leistungen/digital-solutions', [0, 0.2]);
await shoot('case', dsk, '/arbeiten/helion', [0, 0.3]);
await shoot('city', dsk, '/standorte/bremen', [0, 0.3]);
await b.close();
