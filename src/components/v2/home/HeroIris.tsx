'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import Magnetic from '../Magnetic';

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intro;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);

  /* the iris drifts toward the cursor — it looks back at you */
  vec2 look = u_mouse * 0.10;
  vec2 p = uv - look;
  float r = length(p) / (0.9 + 0.35 * u_intro);
  float ang = atan(p.y, p.x);

  float t = u_time * 0.1;

  /* organic fibers */
  float fib  = fbm(vec2(ang * 3.0,  r * 6.0  - t * 1.6));
  float fib2 = fbm(vec2(ang * 9.0 + t, r * 16.0));
  float rr = r + (fib - 0.5) * 0.15 + (fib2 - 0.5) * 0.05;

  vec3 ink    = vec3(0.039, 0.039, 0.063);
  vec3 blue   = vec3(0.306, 0.573, 0.847);
  vec3 purple = vec3(0.380, 0.290, 0.635);
  vec3 fluoB  = vec3(0.427, 0.710, 1.000);
  vec3 fluoV  = vec3(0.608, 0.482, 1.000);

  vec3 col = ink;

  /* ambient nebula around the eye */
  float field = fbm(uv * 2.0 + vec2(t * 0.5, -t * 0.35));
  col += purple * 0.18 * smoothstep(0.85, 0.15, r) * field;
  col += blue * 0.06 * smoothstep(1.0, 0.3, r) * fbm(uv * 3.0 - t * 0.2);

  /* iris annulus */
  float iris = smoothstep(0.47, 0.44, rr) * smoothstep(0.155, 0.185, rr);
  vec3 irisCol = mix(purple, blue, smoothstep(0.16, 0.47, rr + (fib - 0.5) * 0.1));
  irisCol = mix(irisCol, fluoV, fib2 * 0.5);
  irisCol += fluoB * pow(fib, 3.0) * 1.1;
  col = mix(col, irisCol, iris);

  /* limbal glow ring */
  col += fluoB * 0.32 * exp(-pow((rr - 0.455) * 26.0, 2.0));
  col += fluoV * 0.20 * exp(-pow((rr - 0.19) * 30.0, 2.0));

  /* pupil */
  float pupil = smoothstep(0.185, 0.155, rr);
  col = mix(col, ink * 0.5, pupil);

  /* catchlight */
  col += vec3(0.9, 0.95, 1.0) * 0.45 * exp(-pow(length(p - vec2(-0.08, 0.09)) * 10.0, 2.0));

  /* vignette + intro fade */
  col *= 1.0 - smoothstep(0.45, 1.25, length(uv)) * 0.65;
  col *= u_intro;

  gl_FragColor = vec4(col, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function HeroIris() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ——— WebGL iris ——— */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uIntro = gl.getUniformLocation(prog, 'u_intro');

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const intro = { v: 0 };
    gsap.to(intro, { v: 1, duration: 2.4, ease: 'power2.inOut', delay: 0.25 });

    let raf = 0;
    let running = true;
    const start = performance.now();

    const loop = () => {
      if (!running) return;
      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uIntro, intro.v);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    /* pause offscreen / hidden tab */
    const io = new IntersectionObserver(([entry]) => {
      const active = entry.isIntersecting && !document.hidden;
      if (active && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!active) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      gsap.killTweensOf(intro);
      /* NOTE: no loseContext() here — in dev StrictMode the effect re-runs on the
         same canvas and getContext would return the already-lost context (white box). */
    };
  }, []);

  /* ——— entry choreography ——— */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.set('.hero-line-inner', { yPercent: 120, skewY: 6 });
      gsap.set('.hero-fade', { opacity: 0, y: 24 });

      const tl = gsap.timeline({ delay: 0.5 });
      tl.to('.hero-line-inner', {
        yPercent: 0,
        skewY: 0,
        duration: 1.4,
        stagger: 0.14,
        ease: 'power4.out',
      })
        .to('.hero-fade', { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }, '-=0.9');
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-[#0a0a10] text-[#f8f9fa]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="blueprint pointer-events-none absolute inset-0" />
      <div className="grain pointer-events-none absolute inset-0" />

      {/* corner registration marks — the optical instrument frame */}
      <div className="voice-mono pointer-events-none absolute left-5 top-24 hidden text-white/35 md:left-10 md:block hero-fade">
        44.4056° N — 8.9463° E
      </div>
      <div className="voice-mono pointer-events-none absolute right-5 top-24 hidden text-white/35 md:right-10 md:block hero-fade">
        [ EST. GENOVA ]
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-28 text-center md:px-10">
        <p className="voice-mono hero-fade mb-6 text-[#6db5ff]">
          Agenzia di comunicazione — Glee to eye
        </p>

        <h1 className="voice-display">
          <span className="block overflow-hidden">
            <span className="hero-line-inner block text-[14vw] text-transparent [-webkit-text-stroke:1.5px_rgba(248,249,250,0.75)] md:text-[9vw] md:[-webkit-text-stroke:2.5px_rgba(248,249,250,0.75)]">
              Architetti
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line-inner block text-[14vw] md:text-[9vw]">
              di <span className="text-gradient">percezioni.</span>
            </span>
          </span>
        </h1>

        <p className="hero-fade mt-8 max-w-xl font-jakarta text-base font-medium leading-relaxed text-white/60 md:text-lg">
          Boutique strategica, factory creativa. Costruiamo il modo in cui il
          tuo brand viene visto — e il motivo per cui viene ricordato.
        </p>

        <div className="hero-fade mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Magnetic strength={0.25}>
            <Link
              href="/contatti"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#f8f9fa] px-8 py-4 font-satoshi text-sm font-bold uppercase tracking-wide text-[#0a0a10]"
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-white">
                Parliamo del tuo progetto
              </span>
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#614aa2] transition-colors duration-500 group-hover:bg-white animate-pulse-dot" />
            </Link>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Link
              href="/#aree"
              className="inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 font-satoshi text-sm font-bold uppercase tracking-wide text-white/85 transition-colors duration-300 hover:border-[#6db5ff] hover:text-[#6db5ff]"
            >
              Le tre aree
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* bottom strip */}
      <div className="relative z-10 flex items-end justify-between px-5 pb-6 md:px-10 md:pb-8">
        <p className="voice-mono hero-fade max-w-[180px] text-left text-white/35">
          Comunicazione &amp; marketing · operativi ovunque
        </p>
        <div className="hero-fade flex flex-col items-center gap-2" aria-hidden="true">
          <span className="voice-mono text-white/35">Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-4 animate-[scrolldrip_1.8s_ease-in-out_infinite] bg-[#6db5ff]" />
          </span>
        </div>
        <p className="voice-mono hero-fade max-w-[180px] text-right text-white/35">
          Identity — Digital — Factory
        </p>
      </div>
    </section>
  );
}
