import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const GLOBAL = '/home/claude/.npm-global/lib/node_modules';
const req = createRequire(pathToFileURL(GLOBAL + '/'));
const esbuild = req(GLOBAL + '/tsx/node_modules/esbuild/lib/main.js');
const { chromium } = await import(GLOBAL + '/playwright/index.mjs');
const ROOT = process.cwd();
mkdirSync('/home/claude/gtest', { recursive: true });

const out = await esbuild.build({
  entryPoints: ['app/globe.ts'], bundle: true, format: 'iife', globalName: 'G',
  alias: { '@': ROOT }, write: false, target: ['chrome100'], logLevel: 'warning',
});
const js = out.outputFiles[0].text;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;height:100%;background:#03050a;overflow:hidden}
#h{position:fixed;inset:0}
canvas{display:block}
</style></head><body><div id="h"></div><script>${js}
window.__g = G.mountGlobe(document.getElementById('h'), {});
window.__skip = () => window.__g && window.__g.skip();
</script></body></html>`;
writeFileSync('/home/claude/gtest/g.html', html);

const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
await p.goto('file:///home/claude/gtest/g.html');
await p.waitForTimeout(600);
console.log('mounted:', await p.evaluate(() => !!window.__g));
const ks = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.0];
for (const k of ks) {
  await p.evaluate((kk) => window.__g.seek(kk), k);
  await p.waitForTimeout(320);
  console.log('k=' + k, JSON.stringify(await p.evaluate(()=>window.__gdbg)));
  await p.screenshot({ path: `/home/claude/gtest/k-${String(Math.round(k*100)).padStart(3,'0')}.png` });
}
await p.evaluate(() => { window.__g.seek(1); window.__g.setScroll(0.55); });
await p.waitForTimeout(1400);
await p.screenshot({ path: '/home/claude/gtest/k-scroll.png' });
console.log('errors:', errs.slice(0,5));
await b.close();
