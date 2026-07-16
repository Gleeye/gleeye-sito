'use client';

import { useEffect, useRef } from 'react';

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

type P = { x: number; y: number; px: number; py: number; life: number; max: number; c: number };

/**
 * Flow field: scie luminose che scorrono lungo un campo vettoriale animato.
 * Blu→viola su nero, pesate a destra. Disegnato dal codice, nessuna immagine.
 */
export default function AreaBackdrop({ from = '#6db5ff', to = '#9b7bff' }: { from?: string; to?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const a = hexToRgb(from);
    const b = hexToRgb(to);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const BG = 'rgba(10,10,16,';

    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG + '1)';
      ctx.fillRect(0, 0, w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    // spawn pesato a destra
    const spawn = (): P => {
      const x = w * (0.32 + Math.random() * 0.78);
      const y = Math.random() * h;
      return { x, y, px: x, py: y, life: 0, max: 140 + Math.random() * 220, c: Math.random() };
    };
    const COUNT = Math.max(160, Math.min(680, Math.round((w * h) / 2600)));
    const parts: P[] = Array.from({ length: COUNT }, spawn);

    const scale = 0.0022;
    let raf = 0;
    let running = true;
    let t = 0;

    const field = (x: number, y: number) =>
      (Math.sin(x * scale + t) +
        Math.sin(y * scale * 1.3 - t * 0.8) +
        Math.sin((x + y) * scale * 0.7 + t * 0.5)) *
      1.25;

    const draw = () => {
      if (!running) return;
      t += 0.003;

      // dissolvenza delle scie
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = BG + '0.055)';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = 1.7;
      for (const p of parts) {
        const ang = field(p.x, p.y);
        p.px = p.x;
        p.py = p.y;
        p.x += Math.cos(ang) * 1.6;
        p.y += Math.sin(ang) * 1.6;
        p.life++;

        const fade = Math.sin((p.life / p.max) * Math.PI); // 0→1→0
        const r = Math.round(a.r + (b.r - a.r) * p.c);
        const g = Math.round(a.g + (b.g - a.g) * p.c);
        const bl = Math.round(a.b + (b.b - a.b) * p.c);
        // più visibile a destra
        const rightBias = Math.min(1, Math.max(0.22, (p.x / w - 0.1) / 0.9));
        ctx.strokeStyle = `rgba(${r},${g},${bl},${0.95 * fade * rightBias})`;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        if (p.life > p.max || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          Object.assign(p, spawn());
        }
      }
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
  }, [from, to]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
