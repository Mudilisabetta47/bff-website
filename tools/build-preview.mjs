/** Baut aus denselben Komponenten eine einzelne, in sich geschlossene HTML-Datei. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const GLOBAL = '/home/claude/.npm-global/lib/node_modules';
const req = createRequire(pathToFileURL(GLOBAL + '/'));
const esbuild = req(GLOBAL + '/tsx/node_modules/esbuild/lib/main.js');
const ROOT = resolve(process.cwd());
mkdirSync(resolve(ROOT, '.build'), { recursive: true });

await esbuild.build({
  entryPoints: [resolve(ROOT, 'tools/render-entry.tsx')],
  outfile: resolve(ROOT, '.build/render.mjs'),
  bundle: true, platform: 'node', format: 'esm', target: 'node20', jsx: 'automatic',
  alias: { '@': ROOT },
  external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/server'],
  logLevel: 'warning',
});

const motion = await esbuild.build({
  entryPoints: [resolve(ROOT, 'app/motion.ts')],
  bundle: true, format: 'iife', globalName: 'BFF', alias: { '@': ROOT },
  target: ['chrome100', 'safari15', 'firefox100'], minify: true, write: false, logLevel: 'warning',
});
const motionJs = motion.outputFiles[0].text;

const { renderShell, renderRoutes } = await import(pathToFileURL(resolve(ROOT, '.build/render.mjs')).href);
const shell = renderShell();
const routes = renderRoutes();
const css = readFileSync(resolve(ROOT, 'app/globals.css'), 'utf8');

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Mono:wght@400;500&family=Inter+Tight:wght@300..700&display=swap">`;

const templates = routes
  .map((r) => `<template data-route="${r.route}" data-title="${r.title.replace(/"/g, '&quot;')}">${r.html}</template>`)
  .join('\n');

const ROUTER = `
(function(){
  var app = document.getElementById('app');
  var dispose = null, current = null;
  function tpl(route){
    var t = document.querySelector('template[data-route="' + route + '"]');
    return t || document.querySelector('template[data-route="/"]');
  }
  function mount(route, instant){
    var t = tpl(route);
    route = t.getAttribute('data-route');
    if (route === current) return;
    current = route;
    if (dispose) { try { dispose(); } catch(e){} dispose = null; }
    app.innerHTML = t.innerHTML;
    document.title = t.getAttribute('data-title') || 'BOUND FOR FUTURE';
    window.scrollTo(0, 0);
    try { history.replaceState(null, '', '#!' + route); } catch(e){}
    dispose = BFF.boot();
  }
  document.addEventListener('click', function(e){
    var t = e.target; if (!t || !t.closest) return;
    var a = t.closest('a[href^="/"]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('#') === 0) return;
    e.preventDefault(); e.stopPropagation();
    var path = href.split('#')[0] || '/';
    var hash = href.indexOf('#') > -1 ? href.split('#')[1] : '';
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    if (path === current) {
      if (hash) { var el = document.getElementById(hash); if (el) el.scrollIntoView({behavior:'smooth'}); }
      return;
    }
    document.documentElement.classList.remove('loaded');
    setTimeout(function(){
      mount(path);
      if (hash) setTimeout(function(){ var el = document.getElementById(hash); if (el) el.scrollIntoView(); }, 60);
    }, 430);
  }, true);
  window.addEventListener('hashchange', function(){
    var h = location.hash.indexOf('#!') === 0 ? location.hash.slice(2) : '/';
    if (h !== current) mount(h);
  });
  var start = location.hash.indexOf('#!') === 0 ? location.hash.slice(2) : '/';
  mount(start, true);
})();`;

const SCRIPT = `<script>${motionJs}\n${ROUTER}\n</script>`;
const TITLE = 'BOUND FOR FUTURE';

const artifact = `<title>${TITLE}</title>\n${FONTS}\n<style>\n${css}\n</style>\n${shell}\n<div id="app"></div>\n${templates}\n${SCRIPT}\n`;
writeFileSync(resolve(ROOT, '.build/bff-artifact.html'), artifact);

const standalone = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${TITLE}</title>
${FONTS}
<style>\n${css}\n</style></head><body>\n${shell}\n<div id="app"></div>\n${templates}\n${SCRIPT}\n</body></html>`;
writeFileSync(resolve(ROOT, '.build/bff-standalone.html'), standalone);

console.log('routes ', routes.length);
console.log('markup ', Math.round(templates.length / 1024) + ' KB');
console.log('motion ', (motionJs.length / 1024).toFixed(1) + ' KB');
console.log('css    ', (css.length / 1024).toFixed(1) + ' KB');
console.log('total  ', Math.round(artifact.length / 1024) + ' KB');
