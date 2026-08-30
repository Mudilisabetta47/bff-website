/* ============================================================
   BOUND FOR FUTURE — Globus
   Rohes WebGL, keine Bibliothek. Eine Vollbild-Fläche, ein
   Fragment-Shader: Sphäre analytisch geschnitten, Landpunkte aus
   einer zur Laufzeit gerasterten Maske, Atmosphäre, Sternenfeld.
   ============================================================ */
import { LAND, SEA, type Ring } from '@/lib/geo';

export interface GlobeOptions {
  /** 0 = Weltall weit weg, 1 = Ziel erreicht */
  onProgress?: (p: number) => void;
  quality?: number;
}
export interface GlobeHandle {
  destroy(): void;
  /** Scroll-Fortschritt des Hero-Bereichs (0..1). */
  setScroll(p: number): void;
  /** Intro sofort beenden. */
  skip(): void;
  /** Bildschirmposition eines Ortes, oder null wenn abgewandt. */
  project(lat: number, lon: number): { x: number; y: number; front: boolean } | null;
  seek(k: number): void;
  ready: boolean;
}

const RAD = Math.PI / 180;
const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/* ---------- Landmaske rastern ---------- */
function buildMask(w = 2048, h = 1024): HTMLCanvasElement {
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const c = cv.getContext('2d')!;
  c.fillStyle = '#000';
  c.fillRect(0, 0, w, h);
  const path = (ring: Ring) => {
    c.beginPath();
    for (let i = 0; i < ring.length; i += 2) {
      const x = ((ring[i] + 180) / 360) * w;
      const y = ((90 - ring[i + 1]) / 180) * h;
      if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
    }
    c.closePath();
    c.fill();
  };
  c.fillStyle = '#fff';
  for (const r of LAND) path(r);
  c.fillStyle = '#000';
  for (const r of SEA) path(r);
  return cv;
}

/* ---------- Shader ---------- */
const VERT = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform vec2  uRes;
uniform float uTime;
uniform vec3  uCam;
uniform mat3  uBasis;
uniform float uFocal;
uniform float uSpin;
uniform float uDotStep;
uniform float uAlpha;
uniform float uWarp;
uniform vec2  uOffset;
uniform sampler2D uLand;

const float PI = 3.14159265359;

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}
float noise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n = mix(
    mix(mix(hash13(i), hash13(i + vec3(1,0,0)), f.x), mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x), mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y),
    f.z);
  return n;
}
vec3 sph(float lat, float lon) {
  float cl = cos(lat);
  return vec3(cl * cos(lon), sin(lat), cl * sin(lon));
}
float landAt(float lat, float lon) {
  float u = fract((lon + PI) / (2.0 * PI));
  float v = clamp(0.5 - lat / PI, 0.001, 0.999);
  return texture(uLand, vec2(u, v)).r;
}

// Sternenfeld in Blickrichtung
vec3 stars(vec3 rd) {
  vec3 col = vec3(0.0);
  for (int L = 0; L < 3; L++) {
    float sc = 120.0 + float(L) * 190.0;
    vec3 s = rd * sc;
    vec3 id = floor(s), f = fract(s) - 0.5;
    float h = hash13(id + float(L) * 17.0);
    float thr = 0.9855 - float(L) * 0.0018;
    if (h > thr) {
      float m = (h - thr) / (1.0 - thr);
      float d = length(f);
      float core = smoothstep(0.30, 0.0, d);
      float tw = 0.72 + 0.28 * sin(uTime * (1.4 + m * 3.0) + h * 60.0);
      vec3 tint = mix(vec3(0.72, 0.82, 1.0), vec3(1.0, 0.93, 0.82), hash13(id + 5.0));
      col += tint * core * m * tw * (1.1 - float(L) * 0.25);
    }
  }
  // sehr dezenter Nebel
  float n = noise(rd * 2.4 + 11.0) * noise(rd * 5.1 - 4.0);
  col += vec3(0.05, 0.08, 0.16) * pow(n, 2.2) * 1.5;
  return col;
}

void main() {
  vec2 uv = (vUv * uRes - 0.5 * uRes) / uRes.y - uOffset;
  vec3 rd = normalize(uBasis * vec3(uv, -uFocal));
  vec3 ro = uCam;

  vec3 col = stars(rd);

  float b = dot(ro, rd);
  float c = dot(ro, ro) - 1.0;
  float h = b * b - c;
  float closest = sqrt(max(c + 1.0 - b * b, 0.0));

  vec3 sunDir = normalize(vec3(cos(uTime * 0.035 + 1.1), 0.32, sin(uTime * 0.035 + 1.1)));

  if (h > 0.0) {
    float t = -b - sqrt(h);
    if (t > 0.0) {
      vec3 pos = ro + rd * t;
      vec3 n = normalize(pos);
      float lat = asin(clamp(n.y, -1.0, 1.0));
      float lon = atan(n.z, n.x) - uSpin;

      float ndl = clamp(dot(n, sunDir), -1.0, 1.0);
      float day = smoothstep(-0.12, 0.28, ndl);

      // Ozean
      vec3 ocean = mix(vec3(0.008, 0.017, 0.040), vec3(0.021, 0.055, 0.104), day);
      ocean += vec3(0.012, 0.030, 0.062) * pow(max(dot(reflect(-sunDir, n), -rd), 0.0), 90.0) * day * 0.8;
      col = ocean;

      // Punktraster: Bänder konstanter Winkelbreite, Längen nach cos(lat)
      float dLat = uDotStep;
      float band = floor((lat + PI * 0.5) / dLat);
      float latC = -PI * 0.5 + (band + 0.5) * dLat;
      float circ = max(1.0, floor(2.0 * PI * max(cos(latC), 0.02) / dLat));
      float dLon = 2.0 * PI / circ;
      float idx = floor((lon + PI) / dLon);
      float lonC = -PI + (idx + 0.5) * dLon;

      float isLand = landAt(latC, lonC);
      vec3 dirC = sph(latC, lonC + uSpin);
      float ang = length(n - dirC);
      float r = dLat * 0.34;
      float dot0 = 1.0 - smoothstep(r * 0.45, r, ang);
      float facing = clamp(dot(n, -rd), 0.0, 1.0);
      dot0 *= mix(0.30, 1.0, smoothstep(0.0, 0.55, facing));

      vec3 dayDot = vec3(0.84, 0.93, 1.0);
      vec3 nightDot = vec3(0.20, 0.27, 0.44);
      float lights = step(0.70, hash13(vec3(latC * 57.0, lonC * 57.0, 3.0)));
      vec3 dotCol = mix(nightDot + vec3(0.55, 0.26, 0.08) * lights, dayDot, day);
      col += dotCol * dot0 * isLand * (0.34 + 0.95 * day + 0.9 * (1.0 - day) * lights);

      // Gradnetz
      float glat = abs(fract(lat / (15.0 * PI / 180.0)) - 0.5) * 2.0;
      float glon = abs(fract(lon / (15.0 * PI / 180.0)) - 0.5) * 2.0;
      float gw = clamp(uDotStep * 18.0, 0.015, 0.24);
      float grid = smoothstep(1.0 - gw, 1.0, max(glat, glon));
      col += vec3(0.10, 0.22, 0.40) * grid * 0.16 * max(cos(lat), 0.25);

      // Terminator und Randlicht
      float fres = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 3.2);
      col += vec3(0.13, 0.36, 0.78) * fres * (0.30 + 0.70 * day) * 0.9;
      col += vec3(0.95, 0.45, 0.16) * pow(clamp(1.0 - abs(ndl) * 5.0, 0.0, 1.0), 3.0) * fres * 1.4;
    }
  } else {
    // Atmosphärenhalo
    float d = max(closest - 1.0, 0.0);
    col += vec3(0.16, 0.42, 0.92) * exp(-d * 16.0) * 0.55;
    col += vec3(0.45, 0.68, 1.0) * exp(-d * 70.0) * 0.45;
    col += vec3(0.95, 0.48, 0.20) * exp(-d * 120.0) * 0.16;
  }

  // Warp-Streifen beim schnellen Anflug
  if (uWarp > 0.001) {
    float a = atan(uv.y, uv.x);
    float rr = length(uv);
    float streak = pow(max(0.0, sin(a * 220.0 + hash13(vec3(floor(a * 70.0), 1.0, 2.0)) * 40.0)), 60.0);
    col += vec3(0.42, 0.60, 1.0) * streak * smoothstep(0.30, 1.4, rr) * uWarp * 0.22;
  }

  col = col / (col + vec3(0.86)) * 1.18;
  outColor = vec4(col * uAlpha, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(s) || 'shader');
  }
  return s;
}

export function mountGlobe(host: HTMLElement, opts: GlobeOptions = {}): GlobeHandle | null {
  const cv = document.createElement('canvas');
  cv.className = 'globe__gl';
  const context = cv.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance' });
  if (!context) return null;
  const gl: WebGL2RenderingContext = context;
  host.appendChild(cv);

  let prog: WebGLProgram;
  try {
    prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
  } catch {
    cv.remove();
    return null;
  }
  gl.useProgram(prog);
  const U = (n: string) => gl.getUniformLocation(prog, n);
  const uRes = U('uRes'), uTime = U('uTime'), uCam = U('uCam'), uBasis = U('uBasis'),
    uFocal = U('uFocal'), uSpin = U('uSpin'), uDotStep = U('uDotStep'),
    uAlpha = U('uAlpha'), uWarp = U('uWarp'), uOffset = U('uOffset');

  const tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  const small = window.innerWidth < 820;
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, buildMask(small ? 1024 : 2048, small ? 512 : 1024));
  gl.uniform1i(U('uLand'), 0);

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  /* ---------- Kamera ---------- */
  const cam = { lat: 6, lon: -68, dist: 9.4, fov: 42 };
  const target = { lat: 50.4, lon: 10.4, dist: 2.35 };
  const state = {
    t0: performance.now(),
    intro: 0,
    scroll: 0,
    spin: 0,
    alpha: 0,
    running: true,
    skipped: false,
    ready: false,
  };
  const DUR = 7200;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) state.skipped = true;

  let W = 0, H = 0, dpr = 1;
  const resize = () => {
    const r = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 820 ? 1.35 : 1.6);
    W = Math.max(2, Math.round(r.width));
    H = Math.max(2, Math.round(r.height));
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    cv.style.width = W + 'px';
    cv.style.height = H + 'px';
    gl.viewport(0, 0, cv.width, cv.height);
  };
  resize();
  const onResize = () => resize();
  window.addEventListener('resize', onResize);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', onMove, { passive: true });
  }

  // aktueller Kamerazustand für Projektion
  const view = { pos: [0, 0, 0] as number[], basis: new Float32Array(9), focal: 1, aspect: 1 };
  let offX = 0, offY = 0;

  function computeCamera(now: number) {
    const el = now - state.t0;
    let k = state.skipped ? 1 : clamp(el / DUR);
    state.intro = k;
    const ke = easeInOut(k);

    // Anflugbogen: weit außen, Schwenk über den Atlantik, dann Zoom
    const p1 = easeInOut(clamp(k / 0.34));
    const p2 = easeInOut(clamp((k - 0.30) / 0.70));
    const lat = -16 + (target.lat + 16) * easeInOut(clamp((k - 0.14) / 0.82));
    const lon = -86 + (target.lon + 86) * easeInOut(clamp((k - 0.10) / 0.86));
    const dist = 9.4 + (7.1 - 9.4) * p1 + (target.dist - 7.1) * p2;

    // Scrollphase: wieder heraus und zur Seite
    const s = state.scroll;
    const sd = dist + s * 2.1;
    const sLat = lat + s * 16;
    const sLon = lon - s * 26;

    mouse.x += (mouse.tx - mouse.x) * 0.045;
    mouse.y += (mouse.ty - mouse.y) * 0.045;
    const mAmp = (1 - k) * 0.4 + 1.6;

    const cLat = (sLat + mouse.y * mAmp * 0.9) * RAD;
    const cLon = (sLon + state.spin / RAD + mouse.x * mAmp * 1.6) * RAD;

    const cl = Math.cos(cLat);
    const P = [cl * Math.cos(cLon) * sd, Math.sin(cLat) * sd, cl * Math.sin(cLon) * sd];

    const f = [-P[0] / sd, -P[1] / sd, -P[2] / sd];
    const upW = [0, 1, 0];
    let r = [
      f[1] * upW[2] - f[2] * upW[1],
      f[2] * upW[0] - f[0] * upW[2],
      f[0] * upW[1] - f[1] * upW[0],
    ];
    const rl = Math.hypot(r[0], r[1], r[2]) || 1;
    r = [r[0] / rl, r[1] / rl, r[2] / rl];
    const u = [
      r[1] * f[2] - r[2] * f[1],
      r[2] * f[0] - r[0] * f[2],
      r[0] * f[1] - r[1] * f[0],
    ];
    // Spalten: rechts, oben, -vorne  (rd = basis * vec3(uv, -focal))
    view.basis.set([r[0], r[1], r[2], u[0], u[1], u[2], -f[0], -f[1], -f[2]]);
    view.pos = P;
    const fov = (cam.fov + (1 - ke) * 16) * RAD;
    view.focal = 0.5 / Math.tan(fov / 2);
    view.aspect = W / Math.max(1, H);
    return { k, ke };
  }

  let raf = 0;
  let last = performance.now();
  function frame(now: number) {
    if (!state.running) return;
    const dt = Math.min(64, now - last); last = now;
    state.spin += dt * 0.0000105 * (state.skipped ? 1 : 1 + (1 - state.intro) * 2.2);

    const { k } = computeCamera(now);
    const wide = W > 900;
    const tOffX = wide ? (W < 1340 ? 0.4 : 0.28) * Math.min(1, state.intro / 0.85) : 0;
    const tOffY = wide ? 0.02 : -0.17 * Math.min(1, state.intro / 0.85);
    offX += (tOffX - offX) * 0.05;
    offY += (tOffY - offY) * 0.05;
    state.alpha += ((state.scroll > 0.92 ? 0 : 1) - state.alpha) * 0.06;

    gl.uniform2f(uRes, cv.width, cv.height);
    gl.uniform1f(uTime, (now - state.t0) / 1000);
    gl.uniform3f(uCam, view.pos[0], view.pos[1], view.pos[2]);
    gl.uniformMatrix3fv(uBasis, false, view.basis);
    gl.uniform1f(uFocal, view.focal);
    gl.uniform1f(uSpin, state.spin);
    gl.uniform1f(uAlpha, state.alpha);
    gl.uniform2f(uOffset, offX, offY);
    gl.uniform1f(uWarp, state.skipped ? 0 : Math.pow(1 - Math.min(1, k / 0.42), 2) * (k < 0.42 ? 1 : 0));


    // Punktdichte an die Bildschirmauflösung koppeln
    const d = Math.hypot(view.pos[0], view.pos[1], view.pos[2]);
    const visAngle = 2 * Math.asin(Math.min(1, 1 / d));
    const radPerPx = visAngle / (H * 0.86);
    gl.uniform1f(uDotStep, clamp(radPerPx * (window.innerWidth < 820 ? 11 : 8), 0.0022, 0.030));

    (window as unknown as { __gdbg?: unknown }).__gdbg = {
      k: +k.toFixed(3), dist: +d.toFixed(2), focal: +view.focal.toFixed(2), W, H,
      step: +(radPerPx * 8).toFixed(5),
    };
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!state.ready) { state.ready = true; host.classList.add('is-live'); }
    opts.onProgress?.(k);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return {
    ready: true,
    skip() {
      if (state.skipped) return;
      state.skipped = true;
      state.t0 = performance.now() - DUR;
    },
    /** Nur für Tests: Intro-Fortschritt direkt setzen. */
    seek(k: number) { state.skipped = false; state.t0 = performance.now() - clamp(k) * DUR; },
    setScroll(p) { state.scroll = clamp(p); },
    project(lat, lon) {
      const dir = [
        Math.cos(lat * RAD) * Math.cos(lon * RAD + state.spin),
        Math.sin(lat * RAD),
        Math.cos(lat * RAD) * Math.sin(lon * RAD + state.spin),
      ];
      const P = view.pos;
      const rel = [dir[0] - P[0], dir[1] - P[1], dir[2] - P[2]];
      const B = view.basis;
      const x = rel[0] * B[0] + rel[1] * B[1] + rel[2] * B[2];
      const y = rel[0] * B[3] + rel[1] * B[4] + rel[2] * B[5];
      const z = rel[0] * B[6] + rel[1] * B[7] + rel[2] * B[8];
      if (z >= -0.001) return null;
      const sx = (x * view.focal) / -z;
      const sy = (y * view.focal) / -z;
      const px = ((sx + offX) / view.aspect + 0.5) * W;
      const py = (0.5 - (sy + offY)) * H;
      const front = dir[0] * P[0] + dir[1] * P[1] + dir[2] * P[2] > 1.0;
      return { x: px, y: py, front };
    },
    destroy() {
      state.running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      gl.deleteTexture(tex);
      gl.deleteProgram(prog);
      cv.remove();
    },
  };
}
