import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
import { readdirSync, writeFileSync } from 'node:fs';
const prefix = process.argv[2] || 'home-d';
const cols = Number(process.argv[3] || 4);
const files = readdirSync('/home/claude/qa2').filter(f => f.startsWith(prefix + '-') && f.endsWith('.png')).sort();
const html = `<html><body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;padding:6px;font:11px system-ui;color:#fff">
${files.map(f => `<figure style="margin:0"><img src="${f}" style="width:100%;display:block;border:1px solid #333"><figcaption>${f.replace(prefix+'-','')}</figcaption></figure>`).join('')}
</body></html>`;
writeFileSync('/home/claude/qa2/_m.html', html);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.goto('file:///home/claude/qa2/_m.html');
await p.waitForTimeout(900);
await p.screenshot({ path: `/home/claude/m-${prefix}.png`, fullPage: true });
await b.close();
