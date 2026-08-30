/** Rastert die Weltgeometrie zur Kontrolle in ein PNG. */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { readFileSync, writeFileSync } from 'node:fs';
const GLOBAL = '/home/claude/.npm-global/lib/node_modules';
const req = createRequire(pathToFileURL(GLOBAL + '/'));
const esbuild = req(GLOBAL + '/tsx/node_modules/esbuild/lib/main.js');
const sharp = req(GLOBAL + '/sharp');

const built = await esbuild.build({ entryPoints:['lib/geo.ts'], bundle:true, format:'esm', write:false, platform:'neutral' });
const mod = await import('data:text/javascript;base64,' + Buffer.from(built.outputFiles[0].text).toString('base64'));

const AR=process.argv[2]?process.argv[2].split(',').map(Number):null;
const [L0,L1,B0,B1]=AR||[-180,180,-90,90];
const W = 1440, H = Math.round(1440*(B1-B0)/(L1-L0));
const buf = Buffer.alloc(W*H*3, 0);
const px = (x,y,r,g,b) => { const i=(y*W+x)*3; buf[i]=r; buf[i+1]=g; buf[i+2]=b; };
const toXY = (lon,lat)=>[ (lon-L0)/(L1-L0)*W, (B1-lat)/(B1-B0)*H ];

function fill(ring, r,g,b) {
  const pts=[]; for(let i=0;i<ring.length;i+=2) pts.push(toXY(ring[i],ring[i+1]));
  let minY=1e9,maxY=-1e9; for(const p of pts){minY=Math.min(minY,p[1]);maxY=Math.max(maxY,p[1]);}
  for(let y=Math.max(0,Math.floor(minY)); y<=Math.min(H-1,Math.ceil(maxY)); y++){
    const cy=y+0.5, xs=[];
    for(let i=0,j=pts.length-1;i<pts.length;j=i++){
      const [x1,y1]=pts[i],[x2,y2]=pts[j];
      if((y1>cy)!==(y2>cy)) xs.push(x1+(cy-y1)/(y2-y1)*(x2-x1));
    }
    xs.sort((a,b)=>a-b);
    for(let k=0;k+1<xs.length;k+=2){
      for(let x=Math.max(0,Math.ceil(xs[k])); x<=Math.min(W-1,Math.floor(xs[k+1])); x++) px(x,y,r,g,b);
    }
  }
}
for (const r of mod.LAND) fill(r, 230,235,245);
for (const r of mod.SEA)  fill(r, 8,12,20);
// Gitternetz + Marker
for (const p of mod.PLACES) { const [x,y]=toXY(p.lon,p.lat); for(let dx=-3;dx<=3;dx++) for(let dy=-3;dy<=3;dy++) px(Math.round(x)+dx,Math.round(y)+dy,255,106,61); }
await sharp(buf, { raw:{ width:W, height:H, channels:3 } }).png().toFile(process.argv[3]||'/home/claude/map-check.png');
console.log('ok');
