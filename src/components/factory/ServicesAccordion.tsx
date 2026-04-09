'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { ArrowRight, Play, Camera, Type, Mic, Layers } from 'lucide-react';

const CLOSED_H = 76;
const PANEL_BG  = '#07070f';
const BLUE      = [78, 146, 216] as const;   // #4e92d8
const PURPLE    = [97, 74, 162]  as const;   // #614aa2

const services = [
  {
    id: 'video', number: '01', title: 'VIDEO PRODUCTION', tagline: 'High-End & Social Content',
    pullQuote: "Dal video corporate al reel che ferma il pollice.",
    bodyText:  "Ogni scelta — luce, ritmo, suono — risponde a una sola promessa: contenuti che si guadagnano l'attenzione frame per frame.",
    items: ['Video istituzionali e corporate identity', 'Social content — Reel, TikTok, YouTube', 'Interviste, storytelling e mini-documentari', 'Post-produzione, color grading e sound design'],
    link: { href: '/video', label: 'Scopri Video Production' }, Icon: Play, textSide: 'left' as const,
  },
  {
    id: 'photo', number: '02', title: 'PHOTOGRAPHY', tagline: "Visual Assets d'Élite",
    pullQuote: "Immagini che non illustrano: convincono.",
    bodyText:  "Fotografia di prodotto, corporate e ambientale post-prodotta secondo gli standard Gleeye — pulizia, impatto e coerenza garantiti.",
    items: ['Fotografia di prodotto e still life', 'Ritratti corporate e team shooting', 'Shooting ambientale e architetturale', 'Post-produzione e ritocco avanzato'],
    Icon: Camera, textSide: 'right' as const,
  },
  {
    id: 'copy', number: '03', title: 'COPYWRITING', tagline: 'Parole che lavorano',
    pullQuote: "Testi asciutti, chirurgici e funzionali.",
    bodyText:  "Scriviamo per abbattere il rumore di fondo e catturare l'attenzione di un mercato distratto. Ogni parola è lì perché ha guadagnato il suo posto.",
    items: ['Copy strategico per web e landing page', 'Content marketing e blog aziendale', 'Script per video, podcast e presentazioni', 'Naming, claim e verbal identity system'],
    Icon: Type, textSide: 'left' as const,
  },
  {
    id: 'podcast', number: '04', title: 'PODCAST', tagline: 'Design sonoro e produzione',
    pullQuote: "Il tuo podcast come asset di posizionamento — non come esperimento.",
    bodyText:  "Dalla strategia del format al mix finale: ci occupiamo di tutto perché tu ti occupi solo di parlare.",
    items: ['Definizione del format e del posizionamento', 'Registrazione in studio o da remoto', 'Editing professionale, mix e sound design', 'Distribuzione su tutte le piattaforme'],
    link: { href: '/podcast', label: 'Scopri il servizio Podcast' }, Icon: Mic, textSide: 'right' as const,
  },
  {
    id: 'design', number: '05', title: 'GRAPHIC DESIGN', tagline: 'Motion & Visual Systems',
    pullQuote: "Asset grafici che mantengono il brand vivo su ogni piattaforma.",
    bodyText:  "Dal kit social al motion graphics: il linguaggio visivo del brand, in movimento e sempre coerente.",
    items: ['Graphic design editoriale e pubblicitario', 'Motion graphics e animazioni per social e web', 'Template e kit visual per uso autonomo', 'Infografiche, presentazioni e data visualization'],
    Icon: Layers, textSide: 'left' as const,
  },
];

const N = services.length;
const getPanelPos = (i: number, activeIdx: number, vh: number) => {
  if (i < activeIdx)   return { top: i * CLOSED_H,            height: CLOSED_H };
  if (i === activeIdx) return { top: activeIdx * CLOSED_H,    height: vh - (N - 1) * CLOSED_H };
  return                      { top: vh - (N - i) * CLOSED_H, height: CLOSED_H };
};

function useCanvas(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const r = () => {
      if (c.offsetWidth > 0 && c.offsetHeight > 0) {
        c.width  = c.offsetWidth  * devicePixelRatio;
        c.height = c.offsetHeight * devicePixelRatio;
      }
    };
    r();
    // ResizeObserver catches panel expand/collapse (GSAP height animation)
    const ro = new ResizeObserver(r);
    ro.observe(c);
    window.addEventListener('resize', r);
    return () => { ro.disconnect(); window.removeEventListener('resize', r); };
  }, []);
}

const rgba = (rgb: readonly [number, number, number], a: number) =>
  `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

const mix = (t: number): readonly [number, number, number] => [
  Math.round(BLUE[0] + (PURPLE[0] - BLUE[0]) * t),
  Math.round(BLUE[1] + (PURPLE[1] - BLUE[1]) * t),
  Math.round(BLUE[2] + (PURPLE[2] - BLUE[2]) * t),
];

// ── 01 VIDEO — cinematic projector beams + dust particles ────────────────────
// Due fasci di luce (blu + viola) da angoli opposti, si incrociano al centro.
// Particelle di polvere fluttuano nei fasci. Vignetta con color grading.
function VideoCanvas({ isActive }: { isActive: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0); const op = useRef(0); const t = useRef(0);
  const ia = useRef(isActive); useEffect(() => { ia.current = isActive; }, [isActive]);
  useCanvas(ref);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const DPR = devicePixelRatio;
    // Dust particles floating in light beams
    const dust = Array.from({ length: 55 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00015,
      vy: -(0.00008 + Math.random() * 0.00012), // drift upward slowly
      r: (0.6 + Math.random() * 1.0) * DPR,
      colorT: Math.random(),
      phase: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      const W = c.width, H = c.height;
      t.current += 0.008;
      op.current = ia.current ? Math.min(1, op.current + 0.022) : Math.max(0, op.current - 0.022);
      ctx.clearRect(0, 0, W, H);
      if (op.current > 0) {
        const o = op.current;
        const T = t.current;

        // ── Beam 1: BLUE projector from top-left ──
        const b1x = W * (0.10 + Math.sin(T * 0.18) * 0.03);
        const b1y = H * -0.04;
        const b1tx = W * (0.58 + Math.sin(T * 0.22) * 0.04);
        const b1ty = H * 0.78;
        const b1spread = W * 0.22;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(b1x, b1y);
        ctx.lineTo(b1tx - b1spread, b1ty);
        ctx.lineTo(b1tx + b1spread * 0.3, b1ty);
        ctx.closePath();
        ctx.clip();
        const g1 = ctx.createRadialGradient(b1x, b1y, 0, b1tx, b1ty, Math.hypot(W, H) * 0.85);
        g1.addColorStop(0,   rgba(BLUE, 0.38 * o));
        g1.addColorStop(0.3, rgba(BLUE, 0.16 * o));
        g1.addColorStop(0.7, rgba(BLUE, 0.06 * o));
        g1.addColorStop(1,   rgba(BLUE, 0));
        ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);
        ctx.restore();

        // ── Beam 2: PURPLE projector from top-right ──
        const b2x = W * (0.90 + Math.cos(T * 0.15) * 0.03);
        const b2y = H * -0.04;
        const b2tx = W * (0.42 + Math.cos(T * 0.20) * 0.04);
        const b2ty = H * 0.78;
        const b2spread = W * 0.22;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(b2x, b2y);
        ctx.lineTo(b2tx - b2spread * 0.3, b2ty);
        ctx.lineTo(b2tx + b2spread, b2ty);
        ctx.closePath();
        ctx.clip();
        const g2 = ctx.createRadialGradient(b2x, b2y, 0, b2tx, b2ty, Math.hypot(W, H) * 0.85);
        g2.addColorStop(0,   rgba(PURPLE, 0.38 * o));
        g2.addColorStop(0.3, rgba(PURPLE, 0.16 * o));
        g2.addColorStop(0.7, rgba(PURPLE, 0.06 * o));
        g2.addColorStop(1,   rgba(PURPLE, 0));
        ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
        ctx.restore();

        // ── Intersection glow — where beams cross ──
        const ix = W * 0.5, iy = H * 0.52;
        const ig = ctx.createRadialGradient(ix, iy, 0, ix, iy, W * 0.28);
        ig.addColorStop(0, rgba(mix(0.5), 0.28 * o));
        ig.addColorStop(1, rgba(mix(0.5), 0));
        ctx.fillStyle = ig; ctx.fillRect(0, 0, W, H);

        // ── Scan line — thin horizontal bar drifting down ──
        const scanY = ((T * 0.12) % 1.1) * H;
        const sg = ctx.createLinearGradient(0, scanY - 2 * DPR, 0, scanY + 2 * DPR);
        sg.addColorStop(0, rgba(mix(0.4), 0));
        sg.addColorStop(0.5, rgba(mix(0.4), 0.15 * o));
        sg.addColorStop(1, rgba(mix(0.4), 0));
        ctx.fillStyle = sg; ctx.fillRect(0, scanY - 2 * DPR, W, 4 * DPR);

        // ── Dust particles ──
        dust.forEach(d => {
          d.x += d.vx + Math.sin(T * 1.2 + d.phase) * 0.00008;
          d.y += d.vy;
          if (d.y < -0.05) { d.y = 1.05; d.x = Math.random(); }
          if (d.x < 0 || d.x > 1) d.vx *= -1;
          ctx.beginPath(); ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
          ctx.fillStyle = rgba(mix(d.colorT), 0.45 * o); ctx.fill();
        });

        // ── Ambient glow corners ──
        const cl = ctx.createRadialGradient(0, H, 0, 0, H, W * 0.5);
        cl.addColorStop(0, rgba(PURPLE, 0.12 * o)); cl.addColorStop(1, rgba(PURPLE, 0));
        ctx.fillStyle = cl; ctx.fillRect(0, 0, W, H);
        const cr = ctx.createRadialGradient(W, 0, 0, W, 0, W * 0.5);
        cr.addColorStop(0, rgba(BLUE, 0.12 * o)); cr.addColorStop(1, rgba(BLUE, 0));
        ctx.fillStyle = cr; ctx.fillRect(0, 0, W, H);
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(raf.current);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ── 02 PHOTO — aperture + bokeh ──────────────────────────────────────────────
function PhotoCanvas({ isActive }: { isActive: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0); const op = useRef(0); const t = useRef(0);
  const ia = useRef(isActive); useEffect(() => { ia.current = isActive; }, [isActive]);
  useCanvas(ref);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const DPR = devicePixelRatio;
    // bokeh circles
    const bokeh = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random(), y: Math.random(),
      r: (12 + Math.random() * 28) * DPR,
      speed: 0.0003 + Math.random() * 0.0004,
      phase: Math.random() * Math.PI * 2,
      colorT: Math.random(),
    }));
    const draw = () => {
      const W = c.width, H = c.height;
      t.current += 0.008;
      op.current = ia.current ? Math.min(1, op.current + 0.018) : Math.max(0, op.current - 0.018);
      ctx.clearRect(0, 0, W, H);
      if (op.current > 0) {
        const o = op.current;
        // aperture blades
        const cx = W * 0.62, cy = H * 0.5;
        const BLADES = 9, OUTER = Math.min(W, H) * 0.36, INNER = OUTER * 0.18;
        const aperture = 0.68 + Math.sin(t.current * 0.4) * 0.06; // breathing
        for (let b = 0; b < BLADES; b++) {
          const a1 = (b / BLADES) * Math.PI * 2 + t.current * 0.06;
          const a2 = a1 + (Math.PI * 2 / BLADES) * aperture;
          const midA = (a1 + a2) / 2;
          const col = mix(b / BLADES);
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a1) * INNER, cy + Math.sin(a1) * INNER);
          ctx.quadraticCurveTo(
            cx + Math.cos(midA) * OUTER * 0.9, cy + Math.sin(midA) * OUTER * 0.9,
            cx + Math.cos(a2) * INNER, cy + Math.sin(a2) * INNER,
          );
          ctx.strokeStyle = rgba(col, 0.50 * o); ctx.lineWidth = 1.2 * DPR; ctx.stroke();
          ctx.fillStyle = rgba(col, 0.08 * o); ctx.fill();
        }
        // centre glow
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, INNER * 1.4);
        g.addColorStop(0, rgba(BLUE, 0.55 * o)); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        // bokeh
        bokeh.forEach(bk => {
          const bx = (bk.x + Math.sin(t.current * bk.speed + bk.phase) * 0.04) * W;
          const by = (bk.y + Math.cos(t.current * bk.speed * 0.7 + bk.phase) * 0.03) * H;
          const col = mix(bk.colorT);
          const bg = ctx.createRadialGradient(bx, by, 0, bx, by, bk.r);
          bg.addColorStop(0,   rgba(col, 0.22 * o));
          bg.addColorStop(0.4, rgba(col, 0.14 * o));
          bg.addColorStop(1,   'rgba(0,0,0,0)');
          ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(bx, by, bk.r, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(bx, by, bk.r, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(col, 0.32 * o); ctx.lineWidth = 0.8; ctx.stroke();
        });
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(raf.current);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ── 03 COPY — words rising like smoke ────────────────────────────────────────
function CopyCanvas({ isActive }: { isActive: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0); const op = useRef(0);
  const ia = useRef(isActive); useEffect(() => { ia.current = isActive; }, [isActive]);
  useCanvas(ref);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const DPR = devicePixelRatio;
    const WORDS = ['HOOK', 'VOICE', 'CLAIM', 'BRIEF', 'TONE', 'STORY', 'COPY', 'BRAND', 'IDEA', 'WORD', 'PITCH', 'SCRIPT'];
    type W = { text: string; x: number; y: number; vy: number; size: number; colorT: number; drift: number; phase: number };
    const words: W[] = WORDS.map((text, i) => ({
      text, x: 0.1 + Math.random() * 0.8, y: Math.random(),
      vy: 0.0008 + Math.random() * 0.0006,
      size: (14 + Math.random() * 22) * DPR,
      colorT: i / WORDS.length,
      drift: (Math.random() - 0.5) * 0.0002,
      phase: Math.random() * Math.PI * 2,
    }));
    let t = 0;
    const draw = () => {
      const W = c.width, H = c.height;
      t += 1;
      op.current = ia.current ? Math.min(1, op.current + 0.02) : Math.max(0, op.current - 0.02);
      ctx.clearRect(0, 0, W, H);
      if (op.current > 0) {
        const o = op.current;
        ctx.textAlign = 'center';
        words.forEach(w => {
          w.y -= w.vy;
          w.x += w.drift + Math.sin(t * 0.012 + w.phase) * 0.0003;
          if (w.y < -0.1) { w.y = 1.05; w.x = 0.1 + Math.random() * 0.8; }
          const lifeAlpha = Math.min(w.y * 8, (1 - w.y) * 8, 1);
          const col = mix(w.colorT);
          ctx.font = `900 ${w.size}px Arial`;
          ctx.fillStyle = rgba(col, 0.22 * o * lifeAlpha);
          ctx.fillText(w.text, w.x * W, w.y * H);
        });
        // subtle gradient field — blue top, purple bottom
        const gTop = ctx.createRadialGradient(W * 0.6, H * 0.15, 0, W * 0.6, H * 0.15, W * 0.5);
        gTop.addColorStop(0, rgba(BLUE, 0.06 * o)); gTop.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gTop; ctx.fillRect(0, 0, W, H);
        const gBot = ctx.createRadialGradient(W * 0.4, H * 0.85, 0, W * 0.4, H * 0.85, W * 0.45);
        gBot.addColorStop(0, rgba(PURPLE, 0.06 * o)); gBot.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gBot; ctx.fillRect(0, 0, W, H);
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(raf.current);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ── 04 PODCAST — frequency spectrum ──────────────────────────────────────────
function PodcastCanvas({ isActive }: { isActive: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0); const op = useRef(0); const t = useRef(0);
  const ia = useRef(isActive); useEffect(() => { ia.current = isActive; }, [isActive]);
  useCanvas(ref);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const DPR = devicePixelRatio;
    const BARS = 48;
    // simulated frequency envelope
    const envelope = Array.from({ length: BARS }, (_, i) => {
      const norm = i / (BARS - 1);
      return 0.05 + Math.pow(Math.sin(norm * Math.PI), 0.7) * 0.75;
    });
    const draw = () => {
      const W = c.width, H = c.height;
      t.current += 0.022;
      op.current = ia.current ? Math.min(1, op.current + 0.02) : Math.max(0, op.current - 0.02);
      ctx.clearRect(0, 0, W, H);
      if (op.current > 0) {
        const o = op.current;
        const BAR_W = W / (BARS * 1.6), GAP = BAR_W * 0.6;
        const totalW = BARS * (BAR_W + GAP);
        const startX = (W - totalW) / 2;
        const centerY = H * 0.5;
        for (let b = 0; b < BARS; b++) {
          const norm = b / (BARS - 1);
          const wave = Math.sin(t.current * 2.1 + b * 0.28) * 0.28
                     + Math.sin(t.current * 1.3 + b * 0.15) * 0.18
                     + Math.sin(t.current * 3.1 + b * 0.55) * 0.12;
          const amp = envelope[b] * (1 + wave) * H * 0.34;
          const x = startX + b * (BAR_W + GAP);
          const col = mix(norm); // blue → purple left to right
          const grd = ctx.createLinearGradient(x, centerY - amp, x, centerY + amp);
          grd.addColorStop(0,   rgba(col, 0.0));
          grd.addColorStop(0.2, rgba(col, 0.32 * o));
          grd.addColorStop(0.5, rgba(col, 0.50 * o));
          grd.addColorStop(0.8, rgba(col, 0.32 * o));
          grd.addColorStop(1,   rgba(col, 0.0));
          ctx.fillStyle = grd;
          ctx.fillRect(x, centerY - amp, BAR_W, amp * 2);
        }
        // mic glow center
        const mg = ctx.createRadialGradient(W * 0.38, H * 0.5, 0, W * 0.38, H * 0.5, H * 0.3);
        mg.addColorStop(0, `rgba(87,110,189,${0.08 * o})`); mg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = mg; ctx.fillRect(0, 0, W, H);
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(raf.current);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ── 05 GRAPHIC DESIGN — geometric shapes orbiting ────────────────────────────
function DesignCanvas({ isActive }: { isActive: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0); const op = useRef(0); const t = useRef(0);
  const ia = useRef(isActive); useEffect(() => { ia.current = isActive; }, [isActive]);
  useCanvas(ref);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const DPR = devicePixelRatio;
    const shapes = [
      { type: 'circle',   orbit: 0.28, speed: 0.37, phase: 0,              size: 22, colorT: 0    },
      { type: 'square',   orbit: 0.20, speed: -0.28, phase: Math.PI / 3,   size: 18, colorT: 0.25 },
      { type: 'triangle', orbit: 0.35, speed: 0.22,  phase: Math.PI,       size: 20, colorT: 0.5  },
      { type: 'circle',   orbit: 0.18, speed: -0.45, phase: Math.PI * 1.5, size: 12, colorT: 0.75 },
      { type: 'square',   orbit: 0.30, speed: 0.31,  phase: Math.PI * 0.7, size: 25, colorT: 1    },
      { type: 'triangle', orbit: 0.24, speed: -0.19, phase: Math.PI * 1.2, size: 16, colorT: 0.6  },
    ];
    const draw = () => {
      const W = c.width, H = c.height;
      t.current += 0.01;
      op.current = ia.current ? Math.min(1, op.current + 0.018) : Math.max(0, op.current - 0.018);
      ctx.clearRect(0, 0, W, H);
      if (op.current > 0) {
        const o = op.current;
        const cx = W * 0.62, cy = H * 0.5;
        shapes.forEach(s => {
          const angle = t.current * s.speed + s.phase;
          const r = Math.min(W, H) * s.orbit;
          const sx = cx + Math.cos(angle) * r, sy = cy + Math.sin(angle) * r;
          const sz = s.size * DPR;
          const col = mix(s.colorT);
          ctx.strokeStyle = rgba(col, 0.60 * o); ctx.lineWidth = 1.5 * DPR;
          ctx.fillStyle   = rgba(col, 0.12 * o);
          if (s.type === 'circle') {
            ctx.beginPath(); ctx.arc(sx, sy, sz, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          } else if (s.type === 'square') {
            ctx.save(); ctx.translate(sx, sy); ctx.rotate(angle * 0.5);
            ctx.fillRect(-sz, -sz, sz * 2, sz * 2); ctx.strokeRect(-sz, -sz, sz * 2, sz * 2);
            ctx.restore();
          } else {
            ctx.save(); ctx.translate(sx, sy); ctx.rotate(angle * 0.3);
            ctx.beginPath(); ctx.moveTo(0, -sz); ctx.lineTo(sz, sz * 0.7); ctx.lineTo(-sz, sz * 0.7); ctx.closePath();
            ctx.fill(); ctx.stroke(); ctx.restore();
          }
          // orbit trace
          ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(col, 0.04 * o); ctx.lineWidth = 0.6; ctx.stroke();
        });
        // centre glow (blue+purple blend)
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.15);
        g.addColorStop(0, `rgba(87,110,189,${0.40 * o})`); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(raf.current);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

const canvases = [VideoCanvas, PhotoCanvas, CopyCanvas, PodcastCanvas, DesignCanvas];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ServicesAccordion() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const bodyRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const vh = window.innerHeight;
    services.forEach((_, i) => { const p = panelRefs.current[i]; if (!p) return; const { top, height } = getPanelPos(i, 0, vh); gsap.set(p, { top, height }); });
    bodyRefs.current.forEach((b, i) => { if (b) gsap.set(b, { opacity: i === 0 ? 1 : 0 }); });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const vh = window.innerHeight;
    services.forEach((_, i) => {
      const panel = panelRefs.current[i], body = bodyRefs.current[i];
      if (!panel) return;
      const { top, height } = getPanelPos(i, activeIdx, vh);
      gsap.to(panel, { top, height, duration: 0.72, ease: 'power3.inOut' });
      if (body) {
        if (i === activeIdx) {
          gsap.to(body, { opacity: 1, duration: 0.45, delay: 0.3, ease: 'power2.out' });
          const q = (s: string) => body.querySelector(s), qa = (s: string) => body.querySelectorAll(s);
          if (q('.sp')) gsap.fromTo(q('.sp'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7,  delay: 0.42, ease: 'power3.out' });
          if (q('.sb')) gsap.fromTo(q('.sb'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6,  delay: 0.56, ease: 'power2.out' });
          if (qa('.si').length) gsap.fromTo(qa('.si'), { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.07, delay: 0.64, ease: 'power2.out' });
          if (q('.sc')) gsap.fromTo(q('.sc'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.92, ease: 'power2.out' });
        } else gsap.to(body, { opacity: 0, duration: 0.2, ease: 'power2.in' });
      }
    });
  }, [activeIdx]);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current; if (!el) return;
      setActiveIdx(Math.max(0, Math.min(N - 1, Math.floor(-el.getBoundingClientRect().top / window.innerHeight))));
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id="factory-services" ref={containerRef} style={{ height: `${(N + 1) * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: PANEL_BG }}>
        {services.map((svc, i) => {
          const isActive = i === activeIdx, CanvasComp = canvases[i], textOnRight = svc.textSide === 'right';
          // gradient accent — always mixed blue+purple
          const gradAccent = `rgba(87,110,189,0.85)`;
          return (
            <div key={svc.id} ref={el => { panelRefs.current[i] = el; }}
              className="absolute left-0 right-0 overflow-hidden border-t border-white/[0.05]"
              style={{ zIndex: N + 1 - i, background: PANEL_BG }}>

              {/* Header */}
              <div className="relative flex items-center justify-between px-8 md:px-14" style={{ height: CLOSED_H, zIndex: 10 }}>
                <div className="flex items-center gap-5 md:gap-7 min-w-0">
                  <span className="shrink-0 text-[10px] font-black tracking-[0.28em] text-white/20 uppercase font-mono">{svc.number}</span>
                  <h2 className="text-base md:text-2xl font-black tracking-tight font-satoshi uppercase whitespace-nowrap transition-colors duration-500"
                    style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.4)' }}>{svc.title}</h2>
                  <span className="hidden md:block text-sm font-medium whitespace-nowrap font-jakarta transition-all duration-500"
                    style={{ color: gradAccent, opacity: isActive ? 0.8 : 0, transform: isActive ? 'translateX(0)' : 'translateX(-10px)' }}>
                    — {svc.tagline}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden md:block text-[9px] font-black tracking-[0.22em] uppercase font-satoshi"
                    style={{ color: gradAccent, opacity: isActive ? 0.5 : 0 }}>Scorri</span>
                  <div className="w-2 h-2 rounded-full shrink-0 transition-all duration-500"
                    style={{ border: `1.5px solid ${gradAccent}`, backgroundColor: isActive ? gradAccent : 'transparent', boxShadow: isActive ? `0 0 8px rgba(87,110,189,0.6)` : 'none', transform: isActive ? 'scale(1.25)' : 'scale(1)' }} />
                </div>
              </div>

              {/* Body */}
              <div ref={el => { bodyRefs.current[i] = el; }} className="absolute left-0 right-0 bottom-0 overflow-hidden" style={{ top: CLOSED_H, opacity: 0 }}>
                <div className="absolute inset-0"><CanvasComp isActive={isActive} /></div>
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: textOnRight
                    ? `linear-gradient(to left,  ${PANEL_BG}f2 0%, ${PANEL_BG}d0 42%, ${PANEL_BG}80 62%, transparent 100%)`
                    : `linear-gradient(to right, ${PANEL_BG}f2 0%, ${PANEL_BG}d0 42%, ${PANEL_BG}80 62%, transparent 100%)`,
                }} />

                <div className="absolute inset-0 flex items-center" style={{ zIndex: 5 }}>
                  <div className="w-full px-[8%] flex">
                    <div className={`w-full max-w-[480px] flex flex-col justify-center py-10 ${textOnRight ? 'ml-auto' : ''}`}>
                      <p className="sp text-xl md:text-[1.35rem] font-black leading-snug font-satoshi mb-4 text-white"
                        style={{ borderLeft: `2px solid ${gradAccent}`, paddingLeft: '1rem' }}>{svc.pullQuote}</p>
                      <p className="sb text-sm md:text-[14px] font-medium leading-relaxed mb-7 font-jakarta text-white/45 pl-[1.25rem]">{svc.bodyText}</p>
                      <ul className="space-y-3 mb-9">
                        {svc.items.map((item, j) => (
                          <li key={j} className="si flex items-start gap-3">
                            <span className="mt-[9px] w-1 h-1 rounded-full shrink-0" style={{ background: gradAccent }} />
                            <span className="text-sm text-white/50 font-medium leading-snug font-jakarta">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {'link' in svc && svc.link ? (
                        <Link href={svc.link.href} className="sc group inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-60"
                          style={{ color: gradAccent }}>
                          {svc.link.label}<ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </Link>
                      ) : (
                        <a href="/#contatti" className="sc group inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-60"
                          style={{ color: gradAccent }}>
                          Parliamo del tuo progetto<ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <span className="absolute font-black leading-none font-satoshi select-none pointer-events-none"
                  style={{ fontSize: 'clamp(100px,18vw,220px)', color: gradAccent, opacity: 0.035, bottom: '-0.1em', ...(textOnRight ? { left: '2%' } : { right: '2%' }) }}>
                  {svc.number}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
