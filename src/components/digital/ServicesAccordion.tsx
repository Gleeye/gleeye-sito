'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Globe, Share2, Search, Megaphone } from 'lucide-react';

// ─── Brand colors ─────────────────────────────────────────────────────────────
const CLOSED_H = 76;
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

// ─── Service data ─────────────────────────────────────────────────────────────
const services = [
  {
    id: 'web', number: '01', title: 'WEB DESIGN & DEV',
    tagline: 'Siti che lavorano per te',
    pullQuote: 'Un sito non è una brochure online — è il tuo commerciale più efficiente.',
    bodyText: "Progettiamo e sviluppiamo siti web che convertono: veloci, accessibili, con un design che guida l'utente esattamente dove vuoi.",
    items: [
      'Siti vetrina e portfolio di alto profilo',
      'Landing page ad alta conversione',
      'E-commerce e soluzioni custom',
      'Ottimizzazione performance e Core Web Vitals',
    ],
    accent: '#576ebd', Icon: Globe, textSide: 'left' as const,
  },
  {
    id: 'social', number: '02', title: 'SOCIAL MEDIA',
    tagline: 'Presenza che costruisce autorità',
    pullQuote: 'Non pubblichiamo contenuti: costruiamo un pubblico.',
    bodyText: 'Strategia editoriale, visual identity per i social e produzione di contenuti che generano engagement reale — non vanity metrics.',
    items: [
      'Strategia e piano editoriale mensile',
      'Produzione visual e copy per ogni piattaforma',
      'Community management e gestione DM',
      'Analisi performance e ottimizzazione continua',
    ],
    accent: '#576ebd', Icon: Share2, textSide: 'right' as const,
  },
  {
    id: 'seo', number: '03', title: 'SEO',
    tagline: 'Visibilità organica duratura',
    pullQuote: 'Il miglior posto dove nascondere qualcosa è la seconda pagina di Google.',
    bodyText: "SEO tecnico, on-page e off-page. Lavoriamo in profondità sul sito, i contenuti e l'autorità del dominio per portarti in cima — e tenerci.",
    items: [
      'Audit SEO tecnico e analisi keyword',
      'Ottimizzazione on-page e architettura contenuti',
      'Link building e digital PR',
      'Monitoraggio ranking e reporting mensile',
    ],
    accent: '#576ebd', Icon: Search, textSide: 'left' as const,
  },
  {
    id: 'adv', number: '04', title: 'ADVERTISING',
    tagline: 'Campagne a performance',
    pullQuote: 'Ogni euro speso deve sapere dove sta andando e perché.',
    bodyText: 'Google, Meta, LinkedIn — gestiamo campagne con un approccio data-driven rigoroso. Nessuna spesa senza obiettivo, nessun obiettivo senza misurazione.',
    items: [
      'Campagne Meta Ads e Google Ads',
      'Retargeting e funnel di conversione',
      'A/B testing su creatività e copy',
      'Dashboard di monitoraggio in tempo reale',
    ],
    accent: '#576ebd', Icon: Megaphone, textSide: 'right' as const,
  },
];

const N = services.length;

const getPanelPos = (i: number, activeIdx: number, vh: number) => {
  if (i < activeIdx)   return { top: i * CLOSED_H,            height: CLOSED_H };
  if (i === activeIdx) return { top: activeIdx * CLOSED_H,    height: vh - (N - 1) * CLOSED_H };
  return                      { top: vh - (N - i) * CLOSED_H, height: CLOSED_H };
};

function useCanvasSetup(ref: React.RefObject<HTMLCanvasElement | null>) {
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

// ─── 01 WEB — Connection graph, nodes each tinted along blue↔purple spectrum ──
function WebCanvas({ isActive }: { isActive: boolean }) {
  const ref   = useRef<HTMLCanvasElement>(null);
  const raf   = useRef(0);
  const op    = useRef(0);
  const iaRef = useRef(isActive);
  useEffect(() => { iaRef.current = isActive; }, [isActive]);
  useCanvasSetup(ref);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const DPR = devicePixelRatio;

    const pts = Array.from({ length: 58 }, () => ({
      x:  Math.random() * c.width,
      y:  Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.55 * DPR,
      vy: (Math.random() - 0.5) * 0.55 * DPR,
      r:  (Math.random() * 1.6 + 0.5) * DPR,
      t:  Math.random(),   // color factor: 0=blue, 1=purple
    }));
    const LINK = 135 * DPR;

    const draw = () => {
      const W = c.width, H = c.height;
      op.current = iaRef.current
        ? Math.min(1, op.current + 0.022)
        : Math.max(0, op.current - 0.022);
      ctx.clearRect(0, 0, W, H);

      if (op.current > 0) {
        const o = op.current;
        pts.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        });
        // Draw edges — color blended between node colors
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
            const d = Math.hypot(dx, dy);
            if (d < LINK) {
              const col = mix((pts[i].t + pts[j].t) / 2);
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = rgba(col, (1 - d / LINK) * 0.38 * o);
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
        // Draw nodes
        pts.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = rgba(mix(p.t), 0.85 * o);
          ctx.fill();
        });
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ─── 02 SOCIAL — Dual broadcast origins (blue + purple), ripples converge ─────
function SocialCanvas({ isActive }: { isActive: boolean }) {
  const ref   = useRef<HTMLCanvasElement>(null);
  const raf   = useRef(0);
  const op    = useRef(0);
  const tick  = useRef(0);
  const iaRef = useRef(isActive);
  useEffect(() => { iaRef.current = isActive; }, [isActive]);
  useCanvasSetup(ref);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const DPR = devicePixelRatio;

    type Ring = { cx: number; cy: number; r: number; maxR: number; colorT: number };
    const rings: Ring[] = [];

    // Three broadcast origins: blue left, purple right, mid center-top
    const origins = [
      { rx: 0.26, ry: 0.40, colorT: 0   },
      { rx: 0.74, ry: 0.58, colorT: 1   },
      { rx: 0.50, ry: 0.30, colorT: 0.5 },
    ];

    // Small engagement dots
    type Dot = { x: number; y: number; tx: number; ty: number; p: number; colorT: number };
    const dots: Dot[] = [];

    const draw = () => {
      const W = c.width, H = c.height;
      tick.current++;
      op.current = iaRef.current
        ? Math.min(1, op.current + 0.02)
        : Math.max(0, op.current - 0.02);
      ctx.clearRect(0, 0, W, H);

      // Spawn rings
      if (tick.current % 52 === 0) {
        const orig = origins[Math.floor(Math.random() * origins.length)];
        rings.push({ cx: W * orig.rx, cy: H * orig.ry, r: 0, maxR: Math.hypot(W, H) * 0.62, colorT: orig.colorT });
      }
      // Spawn dots between origins
      if (tick.current % 70 === 0) {
        const from = origins[Math.floor(Math.random() * 2)];
        const to   = origins[Math.floor(Math.random() * origins.length)];
        dots.push({ x: W * from.rx, y: H * from.ry, tx: W * to.rx, ty: H * to.ry, p: 0, colorT: (from.colorT + to.colorT) / 2 });
      }

      if (op.current > 0) {
        const o = op.current;

        // Draw rings
        rings.forEach(ring => { ring.r += 2 * DPR; });
        for (let i = rings.length - 1; i >= 0; i--) {
          if (rings[i].r >= rings[i].maxR) { rings.splice(i, 1); continue; }
          const life = rings[i].r / rings[i].maxR;
          const col  = mix(rings[i].colorT);
          ctx.beginPath(); ctx.arc(rings[i].cx, rings[i].cy, rings[i].r, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(col, (1 - life) * 0.50 * o);
          ctx.lineWidth = 1.5 * DPR; ctx.stroke();
        }

        // Origin glows
        origins.forEach(orig => {
          const col = mix(orig.colorT);
          const grd = ctx.createRadialGradient(W * orig.rx, H * orig.ry, 0, W * orig.rx, H * orig.ry, 50 * DPR);
          grd.addColorStop(0, rgba(col, 0.65 * o));
          grd.addColorStop(1, rgba(col, 0));
          ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
        });

        // Flying dots
        for (let i = dots.length - 1; i >= 0; i--) {
          const d = dots[i];
          d.p += 0.018;
          if (d.p >= 1) { dots.splice(i, 1); continue; }
          const ease = d.p < 0.5 ? 2 * d.p * d.p : -1 + (4 - 2 * d.p) * d.p;
          const x = d.x + (d.tx - d.x) * ease;
          const y = d.y + (d.ty - d.y) * ease;
          const a = Math.sin(d.p * Math.PI) * 0.7 * o;
          ctx.beginPath(); ctx.arc(x, y, 2 * DPR, 0, Math.PI * 2);
          ctx.fillStyle = rgba(mix(d.colorT), a); ctx.fill();
        }
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ─── 03 SEO — Ascending bars, purple→blue gradient across, climbing particles ─
function SeoCanvas({ isActive }: { isActive: boolean }) {
  const ref    = useRef<HTMLCanvasElement>(null);
  const raf    = useRef(0);
  const op     = useRef(0);
  const timeR  = useRef(0);
  const iaRef  = useRef(isActive);
  useEffect(() => { iaRef.current = isActive; }, [isActive]);
  useCanvasSetup(ref);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const DPR = devicePixelRatio;
    const BARS = 14;
    // Heights rise from left to right (ranking up)
    const baseH = Array.from({ length: BARS }, (_, i) => 0.12 + (i / (BARS - 1)) * 0.76);

    type Climber = { bar: number; y: number; speed: number };
    const climbers: Climber[] = [];

    const draw = () => {
      const W = c.width, H = c.height;
      timeR.current += 0.012;
      op.current = iaRef.current
        ? Math.min(1, op.current + 0.02)
        : Math.max(0, op.current - 0.02);
      ctx.clearRect(0, 0, W, H);

      if (op.current > 0) {
        const o = op.current;
        const BAR_W = W * 0.030, GAP = W * 0.010;
        const totalW = BARS * (BAR_W + GAP);
        const startX = (W - totalW) / 2;

        // Spawn climbers
        if (Math.random() < 0.04) {
          const bar = Math.floor(Math.random() * BARS);
          climbers.push({ bar, y: H, speed: (1 + Math.random() * 1.2) * DPR });
        }

        // Bars — color gradient: purple on left, blue on right
        baseH.forEach((h, i) => {
          const x     = startX + i * (BAR_W + GAP);
          const wave  = Math.sin(timeR.current * 1.2 + i * 0.4) * 0.04;
          const barH  = (h + wave) * H * 0.65;
          const colorT = 1 - i / (BARS - 1); // 0=blue at right, 1=purple at left
          const col   = mix(colorT);
          const alpha = (0.14 + h * 0.26) * o;
          const grd   = ctx.createLinearGradient(x, H - barH, x, H);
          grd.addColorStop(0, rgba(col, alpha + 0.18));
          grd.addColorStop(1, rgba(col, alpha * 0.15));
          ctx.fillStyle = grd;
          ctx.fillRect(x, H - barH, BAR_W, barH);
        });

        // Top connecting line — gradient purple→blue
        ctx.beginPath();
        baseH.forEach((h, i) => {
          const x    = startX + i * (BAR_W + GAP) + BAR_W / 2;
          const wave = Math.sin(timeR.current * 1.2 + i * 0.4) * 0.04;
          const y    = H - (h + wave) * H * 0.65;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        const lineGrd = ctx.createLinearGradient(startX, 0, startX + totalW, 0);
        lineGrd.addColorStop(0, rgba(PURPLE, 0.55 * o));
        lineGrd.addColorStop(1, rgba(BLUE,   0.55 * o));
        ctx.strokeStyle = lineGrd; ctx.lineWidth = 1.5 * DPR; ctx.stroke();

        // Climbers
        for (let i = climbers.length - 1; i >= 0; i--) {
          const cl = climbers[i];
          cl.y -= cl.speed;
          const x    = startX + cl.bar * (BAR_W + GAP) + BAR_W / 2;
          const wave = Math.sin(timeR.current * 1.2 + cl.bar * 0.4) * 0.04;
          const topY = H - (baseH[cl.bar] + wave) * H * 0.65;
          if (cl.y < topY - 8 * DPR) { climbers.splice(i, 1); continue; }
          const colorT = 1 - cl.bar / (BARS - 1);
          ctx.beginPath(); ctx.arc(x, cl.y, 2 * DPR, 0, Math.PI * 2);
          ctx.fillStyle = rgba(mix(colorT), 0.85 * o); ctx.fill();
        }
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

// ─── 04 ADV — Two spotlights (blue + purple) converging on focal point ────────
function AdvCanvas({ isActive }: { isActive: boolean }) {
  const ref   = useRef<HTMLCanvasElement>(null);
  const raf   = useRef(0);
  const op    = useRef(0);
  const timeR = useRef(0);
  const iaRef = useRef(isActive);
  useEffect(() => { iaRef.current = isActive; }, [isActive]);
  useCanvasSetup(ref);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const DPR = devicePixelRatio;

    // Ambient particles drifting through the light beams
    const particles = Array.from({ length: 22 }, () => ({
      x:      Math.random() * (c.width  || 1200),
      y:      Math.random() * (c.height || 800),
      vy:     (0.3 + Math.random() * 0.6) * DPR,
      size:   (0.8 + Math.random() * 1.4) * DPR,
      colorT: Math.random(),
    }));

    const draw = () => {
      const W = c.width, H = c.height;
      timeR.current += 0.007;
      op.current = iaRef.current
        ? Math.min(1, op.current + 0.018)
        : Math.max(0, op.current - 0.018);
      ctx.clearRect(0, 0, W, H);

      if (op.current > 0) {
        const o = op.current;
        // Focal point — where both beams meet
        const fx = W * 0.5 + Math.sin(timeR.current * 0.3) * W * 0.03;
        const fy = H * 0.76;
        const spread = W * 0.20;

        // ── Blue spotlight from top-left ──
        const s1x = W * 0.18 + Math.sin(timeR.current * 0.5) * W * 0.04;
        const s1y = -H * 0.05;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(s1x, s1y);
        ctx.lineTo(fx - spread * 0.65, fy);
        ctx.lineTo(fx + spread * 0.35, fy);
        ctx.closePath();
        ctx.clip();
        const g1 = ctx.createRadialGradient(s1x, s1y, 0, fx, fy, Math.hypot(W, H) * 0.75);
        g1.addColorStop(0,   rgba(BLUE, 0.35 * o));
        g1.addColorStop(0.4, rgba(BLUE, 0.12 * o));
        g1.addColorStop(1,   rgba(BLUE, 0));
        ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);
        ctx.restore();

        // ── Purple spotlight from top-right ──
        const s2x = W * 0.82 + Math.cos(timeR.current * 0.4 + 1.2) * W * 0.04;
        const s2y = -H * 0.05;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(s2x, s2y);
        ctx.lineTo(fx - spread * 0.35, fy);
        ctx.lineTo(fx + spread * 0.65, fy);
        ctx.closePath();
        ctx.clip();
        const g2 = ctx.createRadialGradient(s2x, s2y, 0, fx, fy, Math.hypot(W, H) * 0.75);
        g2.addColorStop(0,   rgba(PURPLE, 0.35 * o));
        g2.addColorStop(0.4, rgba(PURPLE, 0.12 * o));
        g2.addColorStop(1,   rgba(PURPLE, 0));
        ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
        ctx.restore();

        // ── Convergence glow at focal point (blended color) ──
        const midCol = mix(0.5);
        const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, spread * 0.8);
        fg.addColorStop(0, rgba(midCol, 0.60 * o));
        fg.addColorStop(1, rgba(midCol, 0));
        ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H);

        // ── Floating particles ──
        particles.forEach(p => {
          p.y += p.vy;
          if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; }
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = rgba(mix(p.colorT), 0.28 * o); ctx.fill();
        });
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

const canvases = [WebCanvas, SocialCanvas, SeoCanvas, AdvCanvas];

// ─── Main component ───────────────────────────────────────────────────────────
export default function DigitalServicesAccordion() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const bodyRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const vh = window.innerHeight;
    services.forEach((_, i) => {
      const p = panelRefs.current[i]; if (!p) return;
      const { top, height } = getPanelPos(i, 0, vh);
      gsap.set(p, { top, height });
    });
    bodyRefs.current.forEach((b, i) => { if (b) gsap.set(b, { opacity: i === 0 ? 1 : 0 }); });
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
          if (el('.svc-pull'))           gsap.fromTo(el('.svc-pull'),           { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7,  delay: 0.42, ease: 'power3.out' });
          if (el('.svc-body'))           gsap.fromTo(el('.svc-body'),           { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6,  delay: 0.56, ease: 'power2.out' });
          if (els('.svc-bullet').length) gsap.fromTo(els('.svc-bullet'), { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.07, delay: 0.64, ease: 'power2.out' });
          if (el('.svc-cta'))            gsap.fromTo(el('.svc-cta'),            { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.92, ease: 'power2.out' });
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
    <div id="digital-services" ref={containerRef} style={{ height: `${(N + 1) * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: PANEL_BG }}>
        {services.map((svc, i) => {
          const isActive   = i === activeIdx;
          const CanvasComp = canvases[i];
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
                {/* Canvas */}
                <div className="absolute inset-0"><CanvasComp isActive={isActive} /></div>

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
                      <div className="flex items-center gap-3 mb-5">
                        <svc.Icon style={{ width: 15, height: 15, color: svc.accent, opacity: 0.8 }} strokeWidth={1.5} />
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
                        Parliamo del tuo progetto
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
