'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Compass, Feather, Eye, BookOpen } from 'lucide-react';

// ─── Brand colors ─────────────────────────────────────────────────────────────
const CLOSED_H = 72;
const N        = 4;
const PANEL_BG = '#07070f';
const BLUE     = [78, 146, 216] as const;
const PURPLE   = [97, 74, 162]  as const;
const rgba = (rgb: readonly number[], a: number) =>
  `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
const mix = (t: number): readonly number[] => [
  Math.round(BLUE[0] + (PURPLE[0] - BLUE[0]) * t),
  Math.round(BLUE[1] + (PURPLE[1] - BLUE[1]) * t),
  Math.round(BLUE[2] + (PURPLE[2] - BLUE[2]) * t),
];

// ─── Panel position formula ───────────────────────────────────────────────────
const getPanelPos = (i: number, activeIdx: number, vh: number) => {
  if (i < activeIdx)   return { top: i * CLOSED_H,            height: CLOSED_H };
  if (i === activeIdx) return { top: activeIdx * CLOSED_H,    height: vh - (N - 1) * CLOSED_H };
  return                      { top: vh - (N - i) * CLOSED_H, height: CLOSED_H };
};

function useCanvasSetup(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const resize = () => {
      if (canvas.offsetWidth > 0 && canvas.offsetHeight > 0) {
        canvas.width  = canvas.offsetWidth  * devicePixelRatio;
        canvas.height = canvas.offsetHeight * devicePixelRatio;
      }
    };
    resize();
    // ResizeObserver catches panel expand/collapse (GSAP height animation)
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener('resize', resize);
    return () => { ro.disconnect(); window.removeEventListener('resize', resize); };
  }, []);
}

// ─── Canvas 01: BRAND DISCOVERY — Particle network with blue + purple nodes ───
// Concept: mapping connections, auditing a brand's touchpoints
function DiscoveryCanvas({ isActive }: { isActive: boolean }) {
  const ref   = useRef<HTMLCanvasElement>(null);
  const rafR  = useRef(0);
  const opR   = useRef(0);
  const timeR = useRef(0);
  const iaRef = useRef(isActive);
  useEffect(() => { iaRef.current = isActive; }, [isActive]);
  useCanvasSetup(ref);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const DPR = devicePixelRatio;

    const pts = Array.from({ length: 62 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5 * DPR,
      vy: (Math.random() - 0.5) * 0.5 * DPR,
      r:  (Math.random() * 1.5 + 0.5) * DPR,
      t:  Math.random(), // 0=blue, 1=purple
    }));
    // One central "brand core" node — brighter, larger
    const core = { x: canvas.width * 0.62, y: canvas.height * 0.5, r: 3.5 * DPR, t: 0.5 };
    const LINK = 145 * DPR;

    // Periodic pulse from core
    let pulseR = 0, pulsing = false;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      timeR.current += 0.012;
      opR.current = iaRef.current
        ? Math.min(1, opR.current + 0.022)
        : Math.max(0, opR.current - 0.022);
      ctx.clearRect(0, 0, W, H);

      // Trigger pulse every ~5s
      if (Math.floor(timeR.current * 60) % 300 === 0) { pulsing = true; pulseR = 0; }
      if (pulsing) {
        pulseR += 2.5 * DPR;
        if (pulseR > Math.hypot(W, H) * 0.7) pulsing = false;
      }

      if (opR.current > 0) {
        const o = opR.current;
        // Update positions
        pts.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        });

        const allPts = [...pts, { x: W * 0.62, y: H * 0.5, vx: 0, vy: 0, r: core.r, t: core.t }];

        // Edges
        for (let i = 0; i < allPts.length; i++) {
          for (let j = i + 1; j < allPts.length; j++) {
            const dx = allPts[i].x - allPts[j].x, dy = allPts[i].y - allPts[j].y;
            const d = Math.hypot(dx, dy);
            if (d < LINK) {
              // Check if within pulse radius (illuminate briefly)
              const coreX = W * 0.62, coreY = H * 0.5;
              const mid_x = (allPts[i].x + allPts[j].x) / 2;
              const mid_y = (allPts[i].y + allPts[j].y) / 2;
              const distFromCore = Math.hypot(mid_x - coreX, mid_y - coreY);
              const pulseBoost = pulsing && Math.abs(distFromCore - pulseR) < 40 * DPR ? 2.5 : 1;

              const col = mix((allPts[i].t + allPts[j].t) / 2);
              ctx.beginPath(); ctx.moveTo(allPts[i].x, allPts[i].y); ctx.lineTo(allPts[j].x, allPts[j].y);
              ctx.strokeStyle = rgba(col, (1 - d / LINK) * 0.4 * o * pulseBoost);
              ctx.lineWidth = 0.8; ctx.stroke();
            }
          }
        }

        // Nodes
        pts.forEach(p => {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = rgba(mix(p.t), 0.85 * o); ctx.fill();
        });

        // Core node
        const coreX = W * 0.62, coreY = H * 0.5;
        const cg = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, 40 * DPR);
        cg.addColorStop(0, rgba(mix(0.5), 0.7 * o));
        cg.addColorStop(1, rgba(mix(0.5), 0));
        ctx.fillStyle = cg; ctx.fillRect(0, 0, W, H);
        ctx.beginPath(); ctx.arc(coreX, coreY, core.r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(mix(0.5), 0.9 * o); ctx.fill();
      }
      rafR.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafR.current);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ─── Canvas 02: NAMING — Vocabulary words floating upward, mixed blue-purple ──
// Concept: language, words, semantic identity
function NamingCanvas({ isActive }: { isActive: boolean }) {
  const ref   = useRef<HTMLCanvasElement>(null);
  const rafR  = useRef(0);
  const opR   = useRef(0);
  const iaRef = useRef(isActive);
  useEffect(() => { iaRef.current = isActive; }, [isActive]);
  useCanvasSetup(ref);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const DPR = devicePixelRatio;

    const WORDS = ['BRAND', 'NOME', 'DNA', 'VOCE', 'CLAIM', 'STORIA', 'MARCHIO',
                   'VISION', 'SEGNO', 'ECO', 'SUONO', 'PAYOFF', 'PAROLA',
                   'MANIFESTO', 'IDENTITY', 'MARK'];

    type Word = { text: string; x: number; y: number; speed: number; size: number; colorT: number; alpha: number };

    const spawnWord = (W: number, H: number): Word => ({
      text:   WORDS[Math.floor(Math.random() * WORDS.length)],
      x:      W * (0.35 + Math.random() * 0.5), // right half mostly
      y:      H + Math.random() * H * 0.3,
      speed:  (0.3 + Math.random() * 0.4) * DPR,
      size:   (9 + Math.random() * 14) * DPR,
      colorT: Math.random(),
      alpha:  0,
    });

    let words: Word[] = [];

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      opR.current = iaRef.current
        ? Math.min(1, opR.current + 0.018)
        : Math.max(0, opR.current - 0.018);
      ctx.clearRect(0, 0, W, H);

      // Spawn
      if (words.length < 22) words.push(spawnWord(W, H));

      if (opR.current > 0) {
        const o = opR.current;
        words = words.filter(w => w.y > -60 * DPR);

        words.forEach(w => {
          w.y -= w.speed;
          // Fade in bottom, fade out top
          const progress = 1 - (w.y / H);
          const fadeIn  = Math.min(1, progress * 4);
          const fadeOut = 1 - Math.max(0, (progress - 0.6) / 0.4);
          w.alpha = fadeIn * fadeOut;

          const col = mix(w.colorT);
          ctx.font = `700 ${w.size}px -apple-system, "Helvetica Neue", Arial, sans-serif`;
          ctx.letterSpacing = `${0.18 * w.size}px`;
          ctx.fillStyle = rgba(col, w.alpha * 0.60 * o);
          ctx.fillText(w.text, w.x, w.y);
        });
        ctx.letterSpacing = '0px';

        // Subtle ambient glow: blue-left, purple-right
        const glL = ctx.createRadialGradient(W * 0.3, H * 0.5, 0, W * 0.3, H * 0.5, W * 0.5);
        glL.addColorStop(0, rgba(BLUE, 0.12 * o)); glL.addColorStop(1, rgba(BLUE, 0));
        ctx.fillStyle = glL; ctx.fillRect(0, 0, W, H);
        const glR = ctx.createRadialGradient(W * 0.7, H * 0.5, 0, W * 0.7, H * 0.5, W * 0.5);
        glR.addColorStop(0, rgba(PURPLE, 0.12 * o)); glR.addColorStop(1, rgba(PURPLE, 0));
        ctx.fillStyle = glR; ctx.fillRect(0, 0, W, H);
      }
      rafR.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafR.current);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ─── Canvas 03: VISUAL IDENTITY — Color blobs + geometric mark drawing itself ─
// Concept: palette, logo system, visual language forming
function VisualCanvas({ isActive }: { isActive: boolean }) {
  const ref   = useRef<HTMLCanvasElement>(null);
  const rafR  = useRef(0);
  const opR   = useRef(0);
  const tR    = useRef(0);
  const markP = useRef(0); // mark draw progress 0→1
  const iaRef = useRef(isActive);
  useEffect(() => { iaRef.current = isActive; }, [isActive]);
  useCanvasSetup(ref);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const DPR = devicePixelRatio;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      tR.current += 0.006;
      const t = tR.current;
      opR.current = iaRef.current
        ? Math.min(1, opR.current + 0.018)
        : Math.max(0, opR.current - 0.018);
      markP.current = iaRef.current
        ? Math.min(1, markP.current + 0.008)
        : markP.current;
      ctx.clearRect(0, 0, W, H);

      if (opR.current > 0) {
        const o = opR.current;

        // ── Animated color blobs — both blue and purple ──
        const blobs = [
          { x: W * 0.62 + Math.sin(t * 1.1) * W * 0.09,  y: H * 0.38 + Math.cos(t * 0.8) * H * 0.08, r: W * 0.40, col: rgba(BLUE,   0.28 * o) },
          { x: W * 0.68 + Math.cos(t * 0.9) * W * 0.08,  y: H * 0.60 + Math.sin(t * 1.3) * H * 0.07, r: W * 0.34, col: rgba(PURPLE, 0.24 * o) },
          { x: W * 0.55 + Math.sin(t * 1.7 + 1) * W * 0.06, y: H * 0.5 + Math.cos(t * 2.1) * H * 0.04, r: W * 0.18, col: rgba(mix(0.5), 0.30 * o) },
          { x: W * 0.78 + Math.cos(t * 0.6 + 2) * W * 0.05, y: H * 0.3 + Math.sin(t * 1.4) * H * 0.06, r: W * 0.22, col: rgba(BLUE, 0.18 * o) },
          { x: W * 0.5  + Math.sin(t * 0.5 + 3) * W * 0.07, y: H * 0.7 + Math.cos(t * 0.7) * H * 0.05, r: W * 0.22, col: rgba(PURPLE, 0.18 * o) },
        ];
        blobs.forEach(b => {
          const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          g.addColorStop(0, b.col); g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        });

        // ── Geometric mark: circle + inner ring + cross — draws itself ──
        const mp = markP.current;
        if (mp > 0) {
          const cx = W * 0.62, cy = H * 0.5;
          const R1 = Math.min(W, H) * 0.14; // outer circle
          const R2 = R1 * 0.6;              // inner circle
          ctx.lineWidth = 1.5 * DPR;

          // Outer circle (blue)
          const arc1 = mp * Math.PI * 2;
          ctx.beginPath(); ctx.arc(cx, cy, R1, -Math.PI / 2, -Math.PI / 2 + arc1);
          ctx.strokeStyle = rgba(BLUE, 0.70 * o * mp); ctx.stroke();

          // Inner circle (purple) — starts drawing at 30% progress
          if (mp > 0.3) {
            const innerP = (mp - 0.3) / 0.7;
            const arc2 = innerP * Math.PI * 2;
            ctx.beginPath(); ctx.arc(cx, cy, R2, -Math.PI / 2, -Math.PI / 2 + arc2);
            ctx.strokeStyle = rgba(PURPLE, 0.75 * o * innerP); ctx.stroke();
          }

          // Cross lines — start at 50% progress
          if (mp > 0.5) {
            const crossP = (mp - 0.5) / 0.5;
            const lineLen = R1 * 1.5 * crossP;
            // Horizontal line (mixed)
            const gradH = ctx.createLinearGradient(cx - lineLen, cy, cx + lineLen, cy);
            gradH.addColorStop(0, rgba(PURPLE, 0.50 * o * crossP));
            gradH.addColorStop(1, rgba(BLUE,   0.50 * o * crossP));
            ctx.beginPath(); ctx.moveTo(cx - lineLen, cy); ctx.lineTo(cx + lineLen, cy);
            ctx.strokeStyle = gradH; ctx.lineWidth = 1 * DPR; ctx.stroke();
            // Vertical line
            ctx.beginPath(); ctx.moveTo(cx, cy - lineLen); ctx.lineTo(cx, cy + lineLen);
            ctx.strokeStyle = rgba(mix(0.4), 0.3 * o * crossP); ctx.stroke();
          }

          // Center dot
          ctx.beginPath(); ctx.arc(cx, cy, 3 * DPR, 0, Math.PI * 2);
          ctx.fillStyle = rgba(mix(0.5), 0.7 * o * mp); ctx.fill();
        }
      }
      rafR.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafR.current);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ─── Canvas 04: BRAND GUIDELINES — Blueprint grid drawing itself ───────────────
// Concept: system, order, codification — columns blue, rows purple
function GuidelinesCanvas({ isActive }: { isActive: boolean }) {
  const ref    = useRef<HTMLCanvasElement>(null);
  const rafR   = useRef(0);
  const opR    = useRef(0);
  const gpR    = useRef(0); // grid draw progress
  const timeR  = useRef(0);
  const iaRef  = useRef(isActive);
  useEffect(() => { iaRef.current = isActive; }, [isActive]);
  useCanvasSetup(ref);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const DPR = devicePixelRatio;
    const CELL = 60 * DPR;

    // Pre-compute accent dots (sparse)
    type Dot = { cx: number; cy: number; colorT: number };
    let dots: Dot[] = [];
    const buildDots = () => {
      dots = [];
      const cols = Math.ceil(canvas.width  / CELL) + 1;
      const rows = Math.ceil(canvas.height / CELL) + 1;
      for (let c = 0; c <= cols; c++) for (let r = 0; r <= rows; r++) {
        if (Math.random() < 0.2) dots.push({ cx: c * CELL, cy: r * CELL, colorT: Math.random() });
      }
    };
    buildDots();

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      timeR.current += 0.01;
      opR.current = iaRef.current
        ? Math.min(1, opR.current + 0.018)
        : Math.max(0, opR.current - 0.018);
      gpR.current = iaRef.current
        ? Math.min(1, gpR.current + 0.005)
        : gpR.current;
      ctx.clearRect(0, 0, W, H);

      if (opR.current > 0) {
        const o  = opR.current;
        const gp = gpR.current;
        const cols = Math.ceil(W / CELL) + 1;
        const rows = Math.ceil(H / CELL) + 1;
        const total = cols + rows;

        // Vertical lines — BLUE
        ctx.lineWidth = 0.8;
        for (let c = 0; c <= cols; c++) {
          const lp = Math.min(1, Math.max(0, gp * total - c));
          if (lp <= 0) continue;
          ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, H * lp);
          ctx.strokeStyle = rgba(BLUE, 0.25 * o); ctx.stroke();
        }

        // Horizontal lines — PURPLE
        for (let r = 0; r <= rows; r++) {
          const lp = Math.min(1, Math.max(0, gp * total - cols - r));
          if (lp <= 0) continue;
          ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(W * lp, r * CELL);
          ctx.strokeStyle = rgba(PURPLE, 0.25 * o); ctx.stroke();
        }

        // Intersection dots — alternating colors with pulse
        const pulse = 0.6 + Math.sin(timeR.current * 1.5) * 0.2;
        dots.forEach(d => {
          const col = mix(d.colorT);
          ctx.beginPath(); ctx.arc(d.cx, d.cy, 2.2 * DPR, 0, Math.PI * 2);
          ctx.fillStyle = rgba(col, 0.75 * o * gp * pulse); ctx.fill();
        });

        // Corner accent brackets (top-right quadrant) — a "codex" marker
        if (gp > 0.6) {
          const bx = W * 0.62, by = H * 0.5, bSize = 28 * DPR;
          const bp = (gp - 0.6) / 0.4;
          ctx.lineWidth = 1.5 * DPR;
          // TL corner bracket (blue)
          ctx.beginPath(); ctx.moveTo(bx - bSize, by - bSize + bSize * 0.5); ctx.lineTo(bx - bSize, by - bSize); ctx.lineTo(bx - bSize + bSize * 0.5, by - bSize);
          ctx.strokeStyle = rgba(BLUE, 0.55 * o * bp); ctx.stroke();
          // BR corner bracket (purple)
          ctx.beginPath(); ctx.moveTo(bx + bSize, by + bSize - bSize * 0.5); ctx.lineTo(bx + bSize, by + bSize); ctx.lineTo(bx + bSize - bSize * 0.5, by + bSize);
          ctx.strokeStyle = rgba(PURPLE, 0.55 * o * bp); ctx.stroke();
          // TR + BL (mix)
          ctx.beginPath(); ctx.moveTo(bx + bSize, by - bSize + bSize * 0.5); ctx.lineTo(bx + bSize, by - bSize); ctx.lineTo(bx + bSize - bSize * 0.5, by - bSize);
          ctx.strokeStyle = rgba(mix(0.3), 0.4 * o * bp); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(bx - bSize, by + bSize - bSize * 0.5); ctx.lineTo(bx - bSize, by + bSize); ctx.lineTo(bx - bSize + bSize * 0.5, by + bSize);
          ctx.strokeStyle = rgba(mix(0.7), 0.4 * o * bp); ctx.stroke();
        }
      }
      rafR.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafR.current);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ─── Service data ─────────────────────────────────────────────────────────────
const services = [
  {
    id: 'discovery', number: '01', title: 'BRAND DISCOVERY',
    tagline: 'Strategic Audit & DNA Aziendale',
    pullQuote: 'Partiamo da dove nessuno guarda: le contraddizioni tra quello che siete e quello che comunicate.',
    bodyText: 'Ogni brand ha un DNA — spesso ignorato, spesso tradito. Lo troviamo, lo documentiamo, lo usiamo come bussola per tutto quello che verrà dopo.',
    items: [
      'Analisi del posizionamento e dei competitor diretti',
      "Audit dei punti di sabotaggio d'immagine",
      'Workshop strategici con il management',
      'Mappa di posizionamento e value proposition',
    ],
    accent: '#576ebd', Icon: Compass, Canvas: DiscoveryCanvas, textSide: 'left' as const,
  },
  {
    id: 'naming', number: '02', title: 'NAMING',
    tagline: 'Verbal Identity System',
    pullQuote: 'Il nome sbagliato costa più di quanto pensi — in ogni presentazione, ogni annuncio, ogni firma email.',
    bodyText: 'Lo costruiamo con metodo: ricerca semantica, test, benchmark linguistico. Il risultato deve funzionare tra dieci anni, non solo domani.',
    items: [
      'Naming aziendale, di prodotto e di linea',
      'Claim, payoff e tagline strategica',
      'Tono di voce e verbal identity guidelines',
      'Manifesto del brand e storytelling istituzionale',
    ],
    accent: '#576ebd', Icon: Feather, Canvas: NamingCanvas, textSide: 'right' as const,
  },
  {
    id: 'visual', number: '03', title: 'VISUAL IDENTITY',
    tagline: 'Logo, Type & Color System',
    pullQuote: "Un logo non è un'identità — è il manifesto di un sistema più grande.",
    bodyText: "Costruiamo l'ecosistema visivo completo: logotipo, palette, tipografia, texture, motion. Ogni elemento parla la stessa lingua, su ogni supporto.",
    items: [
      'Logo design, declinazioni e varianti di sistema',
      'Palette cromatica strategica e architettura tipografica',
      'Icone, pattern e asset visivi di corredo',
      'Mockup su supporti reali (print, digital, packaging)',
    ],
    accent: '#576ebd', Icon: Eye, Canvas: VisualCanvas, textSide: 'left' as const,
  },
  {
    id: 'guidelines', number: '04', title: 'BRAND GUIDELINES',
    tagline: 'Codifica & Rebranding',
    pullQuote: 'La coerenza non si ottiene per caso: si fissa su carta.',
    bodyText: "Un brand book non è solo un pdf — è il contratto che il brand firma con se stesso. Lo scriviamo perché chiunque lo tocchi sappia esattamente cosa fare.",
    items: [
      "Brand book con regole d'uso e controesempi chiari",
      'Manuale di identità visiva per team e fornitori',
      'Rebranding chirurgico per brand obsoleti',
      "Supervisione applicazione su tutti i canali",
    ],
    accent: '#576ebd', Icon: BookOpen, Canvas: GuidelinesCanvas, textSide: 'right' as const,
  },
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function IdentityServicesAccordion() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const bodyRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const vh = window.innerHeight;
    services.forEach((_, i) => {
      const panel = panelRefs.current[i]; if (!panel) return;
      const { top, height } = getPanelPos(i, 0, vh);
      gsap.set(panel, { top, height });
    });
    bodyRefs.current.forEach((body, i) => { if (body) gsap.set(body, { opacity: i === 0 ? 1 : 0 }); });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const vh = window.innerHeight;
    services.forEach((_, i) => {
      const panel = panelRefs.current[i];
      const body  = bodyRefs.current[i];
      if (!panel) return;
      const { top, height } = getPanelPos(i, activeIdx, vh);
      gsap.to(panel, { top, height, duration: 0.72, ease: 'power3.inOut' });
      if (body) {
        if (i === activeIdx) {
          gsap.to(body, { opacity: 1, duration: 0.45, delay: 0.3, ease: 'power2.out' });
          const el  = (s: string) => body.querySelector(s);
          const els = (s: string) => body.querySelectorAll(s);
          if (el('.svc-tagline'))        gsap.fromTo(el('.svc-tagline'),        { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, delay: 0.38, ease: 'power3.out' });
          if (el('.svc-pull'))           gsap.fromTo(el('.svc-pull'),           { y: 24,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, delay: 0.46, ease: 'power3.out' });
          if (el('.svc-body'))           gsap.fromTo(el('.svc-body'),           { y: 16,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.6,  delay: 0.60, ease: 'power2.out' });
          if (els('.svc-bullet').length) gsap.fromTo(els('.svc-bullet'), { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.07, delay: 0.68, ease: 'power2.out' });
          if (el('.svc-cta'))            gsap.fromTo(el('.svc-cta'),            { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.94, ease: 'power2.out' });
        } else {
          gsap.to(body, { opacity: 0, duration: 0.2, ease: 'power2.in' });
        }
      }
    });
  }, [activeIdx]);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current; if (!el) return;
      const scrolledIn = -el.getBoundingClientRect().top;
      setActiveIdx(Math.max(0, Math.min(N - 1, Math.floor(scrolledIn / window.innerHeight))));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id="identity-services" ref={containerRef} style={{ height: `${(N + 1) * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: PANEL_BG }}>
        {services.map((svc, i) => {
          const isActive    = i === activeIdx;
          const { Icon, Canvas } = svc;
          const textOnRight = svc.textSide === 'right';

          return (
            <div
              key={svc.id}
              ref={el => { panelRefs.current[i] = el; }}
              className="absolute left-0 right-0 overflow-hidden border-t border-white/[0.05]"
              style={{ zIndex: N + 1 - i, background: PANEL_BG }}
            >
              {/* Header bar */}
              <div className="relative flex items-center justify-between px-8 md:px-14" style={{ height: CLOSED_H, zIndex: 10 }}>
                <div className="flex items-center gap-5 md:gap-7 min-w-0">
                  <span className="shrink-0 text-[10px] font-black tracking-[0.28em] text-white/20 uppercase font-mono">
                    {svc.number}
                  </span>
                  <h2
                    className="text-base md:text-2xl font-black tracking-tight font-satoshi uppercase whitespace-nowrap transition-colors duration-500"
                    style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
                  >
                    {svc.title}
                  </h2>
                  <span
                    className="hidden md:block text-sm font-medium whitespace-nowrap font-jakarta transition-all duration-500"
                    style={{ color: svc.accent, opacity: isActive ? 0.7 : 0, transform: isActive ? 'translateX(0)' : 'translateX(-10px)' }}
                  >
                    — {svc.tagline}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="hidden md:block text-[9px] font-black tracking-[0.22em] uppercase font-satoshi"
                    style={{ color: svc.accent, opacity: isActive ? 0.5 : 0 }}
                  >
                    Scorri
                  </span>
                  <div
                    className="w-2 h-2 rounded-full shrink-0 transition-all duration-500"
                    style={{
                      border: `1.5px solid ${svc.accent}`,
                      backgroundColor: isActive ? svc.accent : 'transparent',
                      boxShadow: isActive ? `0 0 8px ${svc.accent}99` : 'none',
                      transform: isActive ? 'scale(1.25)' : 'scale(1)',
                    }}
                  />
                </div>
              </div>

              {/* Body */}
              <div
                ref={el => { bodyRefs.current[i] = el; }}
                className="absolute left-0 right-0 bottom-0 overflow-hidden"
                style={{ top: CLOSED_H, opacity: 0 }}
              >
                {/* Full-bleed canvas */}
                <div className="absolute inset-0">
                  <Canvas isActive={isActive} />
                </div>

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: textOnRight
                      ? `linear-gradient(to left,  ${PANEL_BG}f0 0%, ${PANEL_BG}cc 38%, ${PANEL_BG}88 58%, transparent 100%)`
                      : `linear-gradient(to right, ${PANEL_BG}f0 0%, ${PANEL_BG}cc 38%, ${PANEL_BG}88 58%, transparent 100%)`,
                  }}
                />

                {/* Text content */}
                <div className="absolute inset-0 flex items-center" style={{ zIndex: 5 }}>
                  <div className="w-full px-[8%] flex">
                    <div className={`w-full max-w-[500px] flex flex-col justify-center py-10 ${textOnRight ? 'ml-auto' : ''}`}>

                      <div className="svc-tagline flex items-center gap-3 mb-6">
                        <Icon style={{ width: 15, height: 15, color: svc.accent, opacity: 0.8 }} strokeWidth={1.5} />
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase font-satoshi" style={{ color: svc.accent, opacity: 0.8 }}>
                          {svc.tagline}
                        </span>
                      </div>

                      <p
                        className="svc-pull text-xl md:text-2xl font-black leading-snug font-satoshi mb-4 text-white"
                        style={{ borderLeft: `2px solid ${svc.accent}`, paddingLeft: '1rem' }}
                      >
                        {svc.pullQuote}
                      </p>

                      <p className="svc-body text-sm md:text-[15px] font-medium leading-relaxed mb-7 font-jakarta text-white/45 pl-[1.25rem]">
                        {svc.bodyText}
                      </p>

                      <ul className="space-y-3 mb-9">
                        {svc.items.map((item, j) => (
                          <li key={j} className="svc-bullet flex items-start gap-3">
                            <span className="mt-[9px] w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: svc.accent }} />
                            <span className="text-sm text-white/50 font-medium leading-snug font-jakarta">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href="/#contatti"
                        className="svc-cta group inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-60"
                        style={{ color: svc.accent }}
                      >
                        Inizia il percorso
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Number watermark */}
                <span
                  className="absolute font-black leading-none font-satoshi select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(100px,18vw,220px)',
                    color: svc.accent, opacity: 0.04, bottom: '-0.1em',
                    ...(textOnRight ? { left: '2%' } : { right: '2%' }),
                  }}
                >
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
