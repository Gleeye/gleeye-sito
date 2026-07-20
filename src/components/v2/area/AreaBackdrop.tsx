'use client';

import { useEffect, useRef } from 'react';

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

type Rgb = { r: number; g: number; b: number };
type StepFn = (t: number) => void;

/**
 * Sfondo canvas per l'hero delle aree, un concetto diverso per ognuna:
 *  - identity → CONVERGENZA: creste concentriche (impronta) che respirano e
 *    si compongono; l'identità che emerge.
 *  - digital  → RETE: nodi connessi, impulsi che viaggiano lungo i collegamenti.
 *  - factory  → CATENA: griglia modulare percorsa da un'onda di accensione
 *    ordinata, come una linea di produzione.
 * Tutto disegnato dal codice, blu→viola su nero, pesato a destra (il testo sta
 * a sinistra). In movimento, mai a scorrimento.
 */
export default function AreaBackdrop({
  variant = 'identity',
  from = '#4e92d8',
  to = '#614aa2',
}: {
  variant?: string;
  from?: string;
  to?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const a = hexToRgb(from);
    const b = hexToRgb(to);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mix = (c: number) =>
      `${Math.round(a.r + (b.r - a.r) * c)},${Math.round(a.g + (b.g - a.g) * c)},${Math.round(a.b + (b.b - a.b) * c)}`;

    let w = 0;
    let h = 0;
    let step: StepFn = () => {};

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = 'rgba(10,10,16,1)';
      ctx.fillRect(0, 0, w, h);
      step = build(variant, ctx, w, h, mix);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    let running = true;
    let t = 0;
    const draw = () => {
      if (!running) return;
      t += 1;
      step(t);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([e]) => {
      const active = e.isIntersecting && !document.hidden;
      if (active && !running) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!active) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [variant, from, to]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

function build(variant: string, ctx: CanvasRenderingContext2D, w: number, h: number, mix: (c: number) => string): StepFn {
  if (variant === 'digital') return network(ctx, w, h, mix);
  if (variant === 'factory') return chain(ctx, w, h, mix);
  return convergence(ctx, w, h, mix);
}

/* IDENTITY — creste concentriche (impronta) che respirano */
function convergence(ctx: CanvasRenderingContext2D, w: number, h: number, mix: (c: number) => string): StepFn {
  const cx = w * 0.66;
  const cy = h * 0.5;
  const N = 15;
  const base = Math.min(w, h) * 0.05;
  const gap = Math.min(w, h) * 0.05;
  return (t) => {
    const tt = t * 0.006;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(10,10,16,0.07)';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = 1.4;
    for (let i = 0; i < N; i++) {
      const c = i / (N - 1);
      const rr = base + i * gap;
      const steps = 90;
      ctx.beginPath();
      for (let s = 0; s <= steps; s++) {
        const ang = (s / steps) * Math.PI * 2;
        const d =
          Math.sin(ang * 3 + i * 0.6 + tt * 0.7) * gap * 0.32 +
          Math.sin(ang * 2 - tt * 0.5 + i * 0.3) * gap * 0.18;
        const rad = rr + d;
        const x = cx + Math.cos(ang) * rad * 1.18;
        const y = cy + Math.sin(ang) * rad;
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      // luce che scorre attraverso gli anelli
      const hi = 0.1 + 0.28 * (0.5 + 0.5 * Math.sin(tt * 1.4 - i * 0.55));
      ctx.strokeStyle = `rgba(${mix(c)},${hi})`;
      ctx.stroke();
    }
  };
}

/* DIGITAL — nodi connessi + impulsi che viaggiano */
function network(ctx: CanvasRenderingContext2D, w: number, h: number, mix: (c: number) => string): StepFn {
  const n = Math.round(Math.min(95, Math.max(45, (w * h) / 22000)));
  const nodes = Array.from({ length: n }, () => ({
    x: w * (0.22 + Math.random() * 0.8),
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    c: Math.random(),
  }));
  const D = Math.min(w, h) * 0.17;
  const pulses: { a: number; b: number; t: number }[] = [];
  let acc = 0;
  return () => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(10,10,16,0.16)';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    for (const p of nodes) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < w * 0.18 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }

    ctx.lineWidth = 1;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < D) {
          const o = 1 - dist / D;
          const rb = Math.min(1, Math.max(0.18, nodes[i].x / w));
          ctx.strokeStyle = `rgba(${mix((nodes[i].c + nodes[j].c) / 2)},${0.28 * o * o * rb})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    for (const p of nodes) {
      const rb = Math.min(1, Math.max(0.22, p.x / w));
      ctx.fillStyle = `rgba(${mix(p.c)},${0.5 * rb})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, 7);
      ctx.fill();
    }

    acc++;
    if (acc > 12) {
      acc = 0;
      const i = Math.floor(Math.random() * n);
      let best = -1;
      let bd = D;
      for (let j = 0; j < n; j++) {
        if (j === i) continue;
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < bd) {
          bd = d;
          best = j;
        }
      }
      if (best >= 0) pulses.push({ a: i, b: best, t: 0 });
    }
    for (let k = pulses.length - 1; k >= 0; k--) {
      const pl = pulses[k];
      pl.t += 0.045;
      if (pl.t >= 1) {
        pulses.splice(k, 1);
        continue;
      }
      const A = nodes[pl.a];
      const B = nodes[pl.b];
      const x = A.x + (B.x - A.x) * pl.t;
      const y = A.y + (B.y - A.y) * pl.t;
      const rb = Math.min(1, Math.max(0.3, x / w));
      ctx.fillStyle = `rgba(${mix(0.5)},${0.9 * rb})`;
      ctx.beginPath();
      ctx.arc(x, y, 2.3, 0, 7);
      ctx.fill();
    }
  };
}

/* FACTORY — griglia modulare percorsa da un'onda di accensione ordinata */
function chain(ctx: CanvasRenderingContext2D, w: number, h: number, mix: (c: number) => string): StepFn {
  const cell = Math.max(30, Math.min(48, w / 32));
  const cols = Math.ceil(w / cell);
  const rows = Math.ceil(h / cell);
  const period = w * 1.35;
  const band = w * 0.28;
  return (t) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(10,10,16,0.16)';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    const scan = (t * 2.4) % (period + band);
    for (let cxi = 0; cxi < cols; cxi++) {
      for (let cyi = 0; cyi < rows; cyi++) {
        const x = cxi * cell + cell / 2;
        const y = cyi * cell + cell / 2;
        // l'onda passa da sinistra a destra, con una scia che sfuma dietro
        const dx = scan - x - (cyi % 2) * (cell * 0.5);
        let br = 0;
        if (dx >= 0 && dx < band) br = (1 - dx / band) ** 1.6;
        br = br * 0.85 + 0.11;
        const rb = Math.min(1, Math.max(0.16, x / w));
        ctx.fillStyle = `rgba(${mix(cxi / cols)},${br * rb * 0.6})`;
        ctx.fillRect(x - 1.8, y - 1.8, 3.6, 3.6);
      }
    }
  };
}
