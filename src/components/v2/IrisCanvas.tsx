'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

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
uniform vec3 u_c1;
uniform vec3 u_c2;
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

  vec2 look = u_mouse * 0.10;
  vec2 p = uv - look;
  float r = length(p) / ((0.9 + 0.35 * u_intro) * u_zoom);
  float ang = atan(p.y, p.x);

  float t = u_time * 0.1;

  float fib  = fbm(vec2(ang * 3.0,  r * 6.0  - t * 1.6));
  float fib2 = fbm(vec2(ang * 9.0 + t, r * 16.0));
  float rr = r + (fib - 0.5) * 0.15 + (fib2 - 0.5) * 0.05;

  vec3 ink = vec3(0.039, 0.039, 0.063);

  vec3 col = ink;

  float field = fbm(uv * 2.0 + vec2(t * 0.5, -t * 0.35));
  col += u_c2 * 0.20 * smoothstep(1.0, 0.15, r) * field;
  col += u_c1 * 0.07 * smoothstep(1.2, 0.3, r) * fbm(uv * 3.0 - t * 0.2);

  float iris = smoothstep(0.47, 0.44, rr) * smoothstep(0.155, 0.185, rr);
  vec3 irisCol = mix(u_c2 * 0.7, u_c1 * 0.8, smoothstep(0.16, 0.47, rr + (fib - 0.5) * 0.1));
  irisCol = mix(irisCol, u_c2, fib2 * 0.5);
  irisCol += u_c1 * pow(fib, 3.0) * 1.1;
  col = mix(col, irisCol, iris);

  col += u_c1 * 0.32 * exp(-pow((rr - 0.455) * 26.0, 2.0));
  col += u_c2 * 0.20 * exp(-pow((rr - 0.19) * 30.0, 2.0));

  float pupil = smoothstep(0.185, 0.155, rr);
  col = mix(col, ink * 0.5, pupil);

  col += vec3(0.9, 0.95, 1.0) * 0.4 * exp(-pow(length(p - vec2(-0.08, 0.09)) * 10.0, 2.0));

  col *= 1.0 - smoothstep(0.45, 1.25, length(uv)) * 0.65;
  col *= u_intro;

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

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

/** Reusable WebGL liquid-iris canvas, tinted with two accent colors. */
export default function IrisCanvas({
  color1 = '#6db5ff',
  color2 = '#9b7bff',
  zoom = 1,
  className = '',
}: {
  color1?: string;
  color2?: string;
  zoom?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const uC1 = gl.getUniformLocation(prog, 'u_c1');
    const uC2 = gl.getUniformLocation(prog, 'u_c2');
    const uZoom = gl.getUniformLocation(prog, 'u_zoom');

    const c1 = hexToVec3(color1);
    const c2 = hexToVec3(color2);

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
    gsap.to(intro, { v: 1, duration: 2.2, ease: 'power2.inOut', delay: 0.2 });

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
      gl.uniform3f(uC1, c1[0], c1[1], c1[2]);
      gl.uniform3f(uC2, c2[0], c2[1], c2[2]);
      gl.uniform1f(uZoom, zoom);
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
      /* NOTE: no loseContext() here — in dev StrictMode the effect re-runs on the
         same canvas and getContext would return the already-lost context (white box). */
    };
  }, [color1, color2, zoom]);

  return <canvas ref={canvasRef} className={className} />;
}
