'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
uniform float u_zoom;

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

  /* l'iride segue il cursore — e cresce quando scrolli: entri nella pupilla */
  vec2 look = u_mouse * 0.10 / u_zoom;
  vec2 p = uv - look;
  float r = length(p) / ((0.9 + 0.35 * u_intro) * u_zoom);
  float ang = atan(p.y, p.x);

  float t = u_time * 0.1;

  /* crossfade attorno alla giuntura di atan2 (asse -x) per eliminare il taglio */
  float TAU = 6.2831853;
  float wseam = smoothstep(2.55, 3.14159, abs(ang));
  float angW = ang - sign(ang) * TAU;
  float fib  = mix(fbm(vec2(ang * 3.0, r * 6.0 - t * 1.6)), fbm(vec2(angW * 3.0, r * 6.0 - t * 1.6)), 0.5 * wseam);
  float fib2 = mix(fbm(vec2(ang * 9.0 + t, r * 16.0)),      fbm(vec2(angW * 9.0 + t, r * 16.0)),      0.5 * wseam);
  float rr = r + (fib - 0.5) * 0.15 + (fib2 - 0.5) * 0.05;

  vec3 ink    = vec3(0.039, 0.039, 0.063);
  vec3 blue   = vec3(0.306, 0.573, 0.847);
  vec3 purple = vec3(0.380, 0.290, 0.635);
  vec3 fluoB  = vec3(0.427, 0.710, 1.000);
  vec3 fluoV  = vec3(0.608, 0.482, 1.000);

  vec3 col = ink;

  float field = fbm(uv * 2.0 + vec2(t * 0.5, -t * 0.35));
  col += purple * 0.14 * smoothstep(1.05, 0.05, r) * field;
  col += blue * 0.05 * smoothstep(1.15, 0.10, r) * fbm(uv * 3.0 - t * 0.2);

  float iris = smoothstep(0.56, 0.32, rr) * smoothstep(0.10, 0.24, rr);
  vec3 irisCol = mix(purple, blue, smoothstep(0.16, 0.47, rr + (fib - 0.5) * 0.1));
  irisCol = mix(irisCol, fluoV, fib2 * 0.36);
  irisCol += fluoB * pow(fib, 3.0) * 0.38;
  col = mix(col, irisCol, iris * 0.82);

  col += fluoB * 0.11 * exp(-pow((rr - 0.455) * 10.0, 2.0));
  col += fluoV * 0.09 * exp(-pow((rr - 0.19) * 16.0, 2.0));

  float pupil = smoothstep(0.185, 0.155, rr);
  col = mix(col, ink * 0.5, pupil);

  col += vec3(0.9, 0.95, 1.0) * 0.15 * exp(-pow(length(p - vec2(-0.08, 0.09)) * 10.0 * u_zoom, 2.0));

  col *= 1.0 - smoothstep(0.5, 1.45, length(uv)) * 0.82 / u_zoom;
  col *= u_intro * 0.68;

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
  const zoomRef = useRef({ v: 1 });

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
    const uZoom = gl.getUniformLocation(prog, 'u_zoom');

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const resize = () => {
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
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
      gl.uniform1f(uZoom, zoomRef.current.v);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

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
      /* NOTE: no loseContext() — in dev StrictMode il canvas viene rimontato col contesto perso */
    };
  }, []);

  /* ——— entrata + portale: lo scroll ti porta DENTRO la pupilla ——— */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const zoom = zoomRef.current;

    const ctx = gsap.context(() => {
      gsap.set('.hero-line-inner', { yPercent: 120, skewY: 6 });
      gsap.set('.comunica-letter', { opacity: 0 });
      gsap.set('.hero-fade', { opacity: 0, y: 24 });

      const tl = gsap.timeline({ delay: 0.5 });
      /* Metodo / Visione: si "stampano" con lo slide-up */
      tl.to('.hero-line-inner', {
        yPercent: 0,
        skewY: 0,
        duration: 1.4,
        stagger: 0.14,
        ease: 'power4.out',
      }, 0)
        /* Comunicazione: macchina da scrivere — una lettera alla volta, secca */
        .to('.comunica-letter', {
          opacity: 1,
          duration: 0.02,
          ease: 'none',
          stagger: 0.052,
        }, 0.8)
        .to('.hero-fade', { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }, 1.35);

      /* portal zoom — pinned scrub */
      const portal = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=90%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });
      portal
        .to(zoom, { v: 7.5, ease: 'power2.in' }, 0)
        .to('.hero-content', { scale: 1.9, opacity: 0, ease: 'power2.in', transformOrigin: '50% 42%' }, 0)
        .to('.hero-frame', { opacity: 0, ease: 'power1.in' }, 0);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-[#0a0a10] text-[#f8f9fa]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="hero-content relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-28 md:px-16 lg:px-24">
        {/* cascata asimmetrica */}
        <h1 className="voice-display">
          <span className="block overflow-hidden">
            <span className="hero-line-inner block text-[14vw] leading-[0.88] md:text-[min(10vw,8rem)]">
              Metodo<span className="text-white">.</span>
            </span>
          </span>
          <span className="block overflow-hidden md:ml-[min(10vw,8rem)]">
            <span className="hero-line-inner block text-[14vw] leading-[0.88] md:text-[min(10vw,8rem)]">
              Visione<span className="text-white">.</span>
            </span>
          </span>
          <span className="-mt-[1vw] block overflow-visible md:-mt-[1.2vw]">
            <span className="comunica-line text-gradient block whitespace-nowrap text-center font-playfair italic font-medium normal-case tracking-[-0.01em] text-[12.3vw] leading-[0.95] md:text-[min(10vw,8.5rem)]">
              {'Comunicazione.'.split('').map((ch, i) => (
                <span key={i} className="comunica-letter">
                  {ch}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <div className="hero-fade mt-10 flex flex-col gap-6 md:max-w-md">
          <p className="font-jakarta text-base font-medium leading-relaxed text-white/90 md:text-lg">
            Soluzioni di comunicazione e marketing per far crescere la tua
            attività. Il nostro metodo nasce da una sola domanda: cosa serve
            davvero?
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contatti"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#f8f9fa] px-8 py-4 font-satoshi text-sm font-bold uppercase tracking-wide text-[#0a0a10]"
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-white">
                Parliamone
              </span>
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#614aa2] transition-colors duration-500 group-hover:bg-white animate-pulse-dot" />
            </Link>
            <Link
              href="/#metodo"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/25 px-8 py-4 font-satoshi text-sm font-bold uppercase tracking-wide text-white/85 transition-colors duration-500 hover:border-transparent hover:text-white"
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative">Scopri il metodo</span>
            </Link>
          </div>
        </div>
      </div>

      {/* striscia bassa */}
      <div className="hero-content relative z-10 mx-auto flex w-full max-w-7xl items-end justify-center px-5 pb-6 md:justify-between md:px-16 md:pb-8 lg:px-24">
        <p className="voice-mono hero-fade hidden whitespace-nowrap text-left text-white/35 md:block">
          Identity — Digital — Factory
        </p>
        <div className="hero-fade flex flex-col items-center gap-2" aria-hidden="true">
          <span className="voice-mono text-white/35">Scrolla</span>
          <span className="relative h-12 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-4 animate-[scrolldrip_1.8s_ease-in-out_infinite] bg-[#6db5ff]" />
          </span>
        </div>
        <div className="voice-mono hero-fade hidden whitespace-nowrap text-right leading-relaxed text-white/35 md:block">
          <span className="block">44.4056° N — 8.9463° E</span>
          <span className="flex items-center justify-end gap-1.5">
            {/* Lanterna di Genova — due tronconi DRITTI (pareti verticali),
                cornice sporgente a metà, lanterna col cupolino, roccia alla base */}
            <svg
              viewBox="0 0 16 28"
              className="h-[1.8em] w-auto shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 0.8v1.1" />
              <path d="M6.8 3.4Q8 2 9.2 3.4" />
              <path d="M6.8 3.4V5.5M9.2 3.4V5.5" />
              <path d="M6.2 5.5h3.6" />
              <path d="M7 5.9v8.1M9 5.9v8.1" />
              <path d="M5.6 14h4.8M5.6 14v2M10.4 14v2M5.6 16h4.8" />
              <path d="M6.3 16v7.5M9.7 16v7.5" />
              <path d="M2.2 27c.8-3 3-2 4.1-3.5" />
              <path d="M9.7 23.5c1.3 1.5 3.4.4 4.1 3.5" />
            </svg>
            Genova — Operativi ovunque
          </span>
        </div>
      </div>
    </section>
  );
}
