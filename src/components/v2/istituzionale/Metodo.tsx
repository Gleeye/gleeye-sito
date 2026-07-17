'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Canvas hero: 240 particelle nel caos che, scorrendo, si allineano  */
/* in una linea perfetta. Il metodo, reso fisico.                     */
/* ------------------------------------------------------------------ */

type P = { cx: number; cy: number; ox: number; oy: number; ph: number; sp: number };

const FASI = [
  {
    nome: 'Analisi del bisogno',
    tesi: 'Ogni progetto inizia con una domanda scomoda.',
    testo:
      "Identifichiamo la necessità reale dietro la richiesta. Dove la comunicazione attuale tradisce il valore del prodotto? Cosa serve davvero — e cosa è solo rumore? Prima di produrre qualsiasi cosa, mettiamo a fuoco il problema.",
    accent: '#8257e6',
    viz: 'radar',
  },
  {
    nome: 'Strategia',
    tesi: 'Il percorso si disegna prima di percorrerlo.',
    testo:
      'La boutique disegna la rotta: posizionamento, identità, priorità. Niente pezzi separati — un sistema, dove ogni scelta sostiene le altre e ogni investimento sa dove sta andando.',
    accent: '#4e92d8',
    viz: 'route',
  },
  {
    nome: 'Produzione',
    tesi: 'La strategia diventa materia.',
    testo:
      'La factory trasforma la rotta in asset finiti: video, siti, contenuti, campagne. Tempi certi, standard costante — la creatività ingegnerizzata in un processo che non dipende dall’ispirazione del momento.',
    accent: '#4757c4',
    viz: 'build',
  },
  {
    nome: 'Presidio',
    tesi: 'Il risultato va difeso nel tempo.',
    testo:
      'Supervisione continua e controllo qualità: ogni uscita resta coerente con l’immagine, ogni fornitore allineato allo standard. Il valore costruito non si disperde — si consolida.',
    accent: '#8fc1ee',
    viz: 'pulse',
  },
];

function VizRadar({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" aria-hidden="true">
      {[30, 58, 86].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      ))}
      <line x1="100" y1="100" x2="100" y2="14" stroke={accent} strokeWidth="1.5" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="5s" repeatCount="indefinite" />
      </line>
      <circle cx="100" cy="100" r="86" stroke="none" fill={`${accent}12`} />
      {[[142, 66], [70, 138], [126, 128]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill={accent}>
          <animate attributeName="opacity" values="0.15;1;0.15" dur="2.6s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function VizRoute({ accent }: { accent: string }) {
  const d = 'M20 170 C 60 120, 60 90, 100 90 S 150 50, 180 30';
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" aria-hidden="true">
      <path d={d} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 6" />
      <path d={d} stroke={accent} strokeWidth="2" strokeLinecap="round" pathLength="100" className="metodo-viz-draw" style={{ strokeDasharray: 100, strokeDashoffset: 100 }} />
      <circle cx="20" cy="170" r="4" fill={accent} />
      <circle cx="180" cy="30" r="6" stroke={accent} strokeWidth="2" fill="none">
        <animate attributeName="r" values="5;8;5" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle r="3.5" fill="#fff">
        <animateMotion dur="4.5s" repeatCount="indefinite" path={d} />
      </circle>
    </svg>
  );
}

function VizBuild({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" aria-hidden="true">
      {[
        'M100 38 L156 64 L100 90 L44 64 Z',
        'M44 96 L100 122 L156 96',
        'M44 128 L100 154 L156 128',
      ].map((d, i) => (
        <path key={i} d={d} stroke={accent} strokeWidth="2.5" strokeLinejoin="round" pathLength="100" className="metodo-viz-draw" style={{ strokeDasharray: 100, strokeDashoffset: 100 }} />
      ))}
      <circle cx="100" cy="64" r="4" fill={accent}>
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function VizPulse({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" aria-hidden="true">
      <circle cx="100" cy="100" r="34" stroke={accent} strokeWidth="2.5" pathLength="100" className="metodo-viz-draw" style={{ strokeDasharray: 100, strokeDashoffset: 100 }} />
      {[0, 1.3, 2.6].map((b, i) => (
        <circle key={i} cx="100" cy="100" r="34" stroke={accent} strokeWidth="1.5" fill="none" opacity="0">
          <animate attributeName="r" values="34;88" dur="3.9s" begin={`${b}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="3.9s" begin={`${b}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <circle cx="100" cy="100" r="5" fill={accent} />
    </svg>
  );
}

const VIZ = { radar: VizRadar, route: VizRoute, build: VizBuild, pulse: VizPulse } as const;

export default function Metodo() {
  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orderRef = useRef({ value: 0 });

  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!root || !hero || !canvas) return;

    /* ---- canvas caos→ordine ---- */
    const c2d = canvas.getContext('2d');
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      c2d?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const N = 240;
    const parts: P[] = Array.from({ length: N }, (_, i) => ({
      cx: ((i * 73.7) % 100) / 100,
      cy: ((i * 41.3) % 100) / 100,
      ox: i / (N - 1),
      oy: 0.5,
      ph: (i * 2.399) % (Math.PI * 2),
      sp: 0.0004 + ((i * 13) % 7) * 0.0001,
    }));

    const draw = (now: number) => {
      if (!c2d) return;
      const p = orderRef.current.value; /* 0 caos → 1 ordine */
      const ease = p * p * (3 - 2 * p);
      c2d.clearRect(0, 0, w, h);

      let prevX = 0, prevY = 0;
      for (let i = 0; i < N; i++) {
        const pt = parts[i];
        const chaosX = (pt.cx + Math.sin(now * pt.sp + pt.ph) * 0.08) * w;
        const chaosY = (pt.cy + Math.cos(now * pt.sp * 1.3 + pt.ph) * 0.1) * h;
        const ordX = (0.06 + pt.ox * 0.88) * w;
        const ordY = pt.oy * h + Math.sin(now * 0.0006 + pt.ox * 6) * 6 * (1 - ease) ;
        const x = chaosX + (ordX - chaosX) * ease;
        const y = chaosY + (ordY - chaosY) * ease;

        const k = x / w;
        const r = Math.round(130 + (78 - 130) * k);
        const g = Math.round(87 + (146 - 87) * k);
        const b = Math.round(230 + (216 - 230) * k);
        c2d.fillStyle = `rgba(${r},${g},${b},${0.35 + ease * 0.55})`;
        c2d.beginPath();
        c2d.arc(x, y, 1.4 + ease * 1.2, 0, Math.PI * 2);
        c2d.fill();

        /* più ordine = più connessioni: la linea si materializza */
        if (i > 0 && ease > 0.35) {
          c2d.strokeStyle = `rgba(${r},${g},${b},${(ease - 0.35) * 0.9})`;
          c2d.lineWidth = 1;
          c2d.beginPath();
          c2d.moveTo(prevX, prevY);
          c2d.lineTo(x, y);
          c2d.stroke();
        }
        prevX = x; prevY = y;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const ctx = gsap.context(() => {
      gsap.from('.mt-hero-line', {
        yPercent: 110, duration: 1.3, stagger: 0.1, ease: 'power4.out', delay: 0.2,
      });

      /* pin dell'hero: lo scroll ordina il caos */
      gsap.to(orderRef.current, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      /* la scritta finale dell'hero appare quando l'ordine è fatto */
      gsap.fromTo('.mt-hero-out', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: '+=160%', scrub: 0.5 },
      });

      /* fasi: viz che si disegnano + testi */
      gsap.utils.toArray<HTMLElement>('.mt-fase', root).forEach((f) => {
        gsap.to(f.querySelectorAll('.metodo-viz-draw'), {
          strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut',
          scrollTrigger: { trigger: f, start: 'top 70%', once: true },
        });
        gsap.from(f.querySelectorAll('.mt-fase-reveal'), {
          y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: f, start: 'top 75%', once: true },
        });
      });

      /* filo che collega le fasi */
      gsap.fromTo('.mt-thread', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.mt-fasi', start: 'top 55%', end: 'bottom 85%', scrub: 0.6 },
      });
    }, root);

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0a0a10] text-[#f8f9fa]">
      <div className="grain absolute inset-0" />

      {/* ------- hero pinnato: caos → ordine ------- */}
      <div ref={heroRef} className="relative h-svh overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="relative flex h-full flex-col justify-between px-5 py-24 md:px-10">
          <div>
            <h1>
              <span className="block overflow-hidden py-[0.03em]">
                <span className="mt-hero-line voice-display block text-[12vw] leading-[0.9] md:text-[8vw]">Il caos non è</span>
              </span>
              <span className="block overflow-hidden py-[0.03em]">
                <span className="mt-hero-line voice-display block text-[12vw] leading-[0.9] md:text-[8vw]">
                  un <span className="text-gradient-flow">metodo</span>.
                </span>
              </span>
            </h1>
            <p className="mt-hero-line mt-6 max-w-md font-jakarta text-base font-medium leading-relaxed text-white/50">
              Scorri: quello che vedi succedere qui sotto è quello che facciamo ai progetti.
            </p>
          </div>
          <p className="mt-hero-out voice-mono self-end text-white/60">
            Dall&apos;incertezza alla linea retta — in quattro fasi.
          </p>
        </div>
      </div>

      {/* ------- le quattro fasi ------- */}
      <div className="mt-fasi relative mt-24">
        <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-white/[0.07] md:left-1/2">
          <div className="mt-thread h-full w-full origin-top bg-gradient-to-b from-[#8257e6] via-[#4e92d8] to-[#8fc1ee] opacity-70" style={{ transform: 'scaleY(0)' }} />
        </div>

        {FASI.map((f, i) => {
          const Viz = VIZ[f.viz as keyof typeof VIZ];
          const invert = i % 2 === 1;
          return (
            <div key={f.nome} className="mt-fase relative grid min-h-[80vh] grid-cols-1 items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-0 md:px-10">
              {/* viz */}
              <div className={`mt-fase-reveal relative mx-auto h-56 w-56 md:h-80 md:w-80 ${invert ? 'md:order-2' : ''}`}>
                <div className="absolute inset-0 scale-125 rounded-full blur-3xl" style={{ background: `radial-gradient(closest-side, ${f.accent}22, transparent)` }} />
                <Viz accent={f.accent} />
              </div>
              {/* testo */}
              <div className={`relative ${invert ? 'md:order-1 md:pr-24 md:text-right' : 'md:pl-24'}`}>
                <p className="mt-fase-reveal voice-mono mb-5" style={{ color: f.accent }}>{f.nome}</p>
                <h2 className="mt-fase-reveal voice-display text-3xl leading-tight md:text-5xl">{f.tesi}</h2>
                <p className={`mt-fase-reveal mt-6 max-w-md font-jakarta text-sm font-medium leading-relaxed text-white/50 md:text-base ${invert ? 'md:ml-auto' : ''}`}>
                  {f.testo}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ------- chiusura ------- */}
      <div className="relative flex min-h-[55vh] flex-col items-center justify-center px-5 pb-32 text-center">
        <p className="voice-display max-w-4xl text-3xl leading-tight md:text-5xl">
          Un processo che elimina l&apos;incertezza — <span className="text-gradient-flow">la tua</span>.
        </p>
        <a
          href="/contatti"
          className="mt-12 inline-flex items-center gap-3 rounded-full px-10 py-5 font-satoshi text-xs font-black uppercase tracking-[0.2em] text-white"
          style={{ background: 'linear-gradient(120deg, #8257e6, #4e92d8)' }}
        >
          Mettiamolo al lavoro per te <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
