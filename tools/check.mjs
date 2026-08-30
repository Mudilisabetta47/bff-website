/** Syntax- und Auflösungsprüfung aller Quelldateien (esbuild, ohne Typprüfung). */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
const GLOBAL = '/home/claude/.npm-global/lib/node_modules';
const esbuild = createRequire(pathToFileURL(GLOBAL + '/'))(GLOBAL + '/tsx/node_modules/esbuild/lib/main.js');
const ROOT = process.cwd();
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (f !== 'node_modules' && f !== '.build' && f !== '.next') walk(p); }
    else if (/\.(tsx?|mts)$/.test(f)) files.push(p);
  }
})(resolve(ROOT, 'app'));
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (/\.tsx?$/.test(f)) files.push(p); } })(resolve(ROOT, 'components'));
files.push(resolve(ROOT, 'lib/content.ts'));
const r = await esbuild.build({
  entryPoints: files, bundle: true, write: false, outdir: '/tmp/vcheck', platform: 'browser',
  jsx: 'automatic', alias: { '@': ROOT },
  external: ['react', 'react/*', 'react-dom', 'react-dom/*', 'next', 'next/*'],
  loader: { '.css': 'empty' }, logLevel: 'silent',
});
console.log('geprüft:', files.length, 'Dateien — Fehler:', r.errors.length, '| Warnungen:', r.warnings.length);
for (const e of [...r.errors, ...r.warnings]) console.log(' -', e.location?.file + ':' + e.location?.line, e.text);
