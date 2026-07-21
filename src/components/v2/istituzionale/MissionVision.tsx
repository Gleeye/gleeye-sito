'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ————————————————————————————————————————————————————————————————
   CONCEPT — "La rotta".
   Il titolo della pagina è "Dove siamo diretti": la pagina è il viaggio.
   Una rotta luminosa parte dalla hero e si disegna con lo scroll; un punto
   — noi — la percorre. Passa per la missione (il lavoro di ogni giorno:
   la lama che toglie l'attrito alla frase), poi per la visione, e infine
   si tuffa in basso: il punto consegna il visitatore alla CTA del footer,
   che su questa pagina risponde al titolo ("Fatti vedere per ciò che vali.").
   ———————————————————————————————————————————————————————————————— */

/* Corsivo gradiente del sito: su chiaro: .text-gradient-deep (blu/viola pieni). */
function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-gradient-deep font-playfair italic font-medium normal-case">
      {children}
    </span>
  );
}

function MissionStatement() {
  return (
    <>
      Ridurre l&apos;attrito tra ciò che <Accent>vali</Accent> e ciò che si <Accent>vede</Accent>.
    </>
  );
}

/* Geometria della rotta (viewBox 1000×2600, stirata sull'intera pagina).
   La rotta parte sotto la hero, sfiora la missione (a destra), scende alla
   visione (a sinistra) e si tuffa in basso a sinistra: il punto consegna
   il visitatore alla CTA del footer ("Fatti vedere per ciò che vali."). */
const ROUTE_D =
  'M 140 300 C 300 450, 620 520, 720 700 C 810 860, 840 980, 760 1120 C 690 1240, 420 1330, 320 1500 C 240 1640, 240 1760, 330 1880 C 430 2010, 340 2290, 210 2565';
const VIEW_W = 1000;
const VIEW_H = 2600;
const END_X = 210;
const END_Y = 2565;

export default function MissionVision() {
  const rootRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const degRef = useRef<HTMLHeadingElement>(null);
  const cleanRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    const deg = degRef.current;
    const clean = cleanRef.current;
    const bar = barRef.current;
    if (!root || !path || !dot || !deg || !clean || !bar) return;

    const ctx = gsap.context(() => {
      /* intro hero: sempre */
      gsap.from('.mv-hero-line', {
        yPercent: 110, duration: 1.3, stagger: 0.12, ease: 'power4.out', delay: 0.2,
      });

      /* lunghezza REALE della rotta: il dash lavora in queste unità (robusto
         su tutti i browser, niente pathLength normalizzato) */
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);

      /* Anche su touch: scroll nativo + ScrollTrigger funzionano (niente pin
         qui); il refresh post-navigazione di SmoothScroll rimisura i trigger. */

      /* ————— la rotta si disegna e il punto la percorre ————— */
      path.style.strokeDashoffset = String(len);
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          path.style.strokeDashoffset = String(len * (1 - p));
          const pt = path.getPointAtLength(p * len);
          dot.style.left = `${(pt.x / VIEW_W) * 100}%`;
          dot.style.top = `${(pt.y / VIEW_H) * 100}%`;
          /* non può posarsi sulla CTA del footer (vive in un'altra sezione):
             nell'ultimo tratto si dissolve mentre si tuffa verso di lei */
          dot.style.opacity = p <= 0.015 ? '0' : p >= 0.88 ? String(Math.max(0, (0.98 - p) / 0.1)) : '1';
        },
      });

      /* ————— missione: la lama che toglie l'attrito ————— */
      ScrollTrigger.create({
        trigger: wipeRef.current,
        start: 'top 72%',
        end: 'bottom 38%',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress * 100;
          /* margini verticali larghi (accenti di CIÒ, discendenti) e snap agli
             estremi: a fine corsa nessun clip residuo che tagli le lettere */
          if (p >= 99.2) {
            clean.style.clipPath = 'none';
            deg.style.clipPath = 'inset(0 0 0 100%)';
          } else {
            clean.style.clipPath = `inset(-25% ${100 - p}% -25% 0)`;
            deg.style.clipPath = `inset(-25% 0 -25% ${Math.max(0, p - 0.5)}%)`;
          }
          bar.style.left = `${p}%`;
          bar.style.opacity = p > 0.5 && p < 99 ? '1' : '0';
        },
      });

      /* corpi: parola per parola */
      gsap.utils.toArray<HTMLElement>('.mv-body', root).forEach((b) => {
        gsap.fromTo(b.querySelectorAll('.mv-word'), { opacity: 0.12 }, {
          opacity: 1, stagger: 0.03, ease: 'none',
          scrollTrigger: { trigger: b, start: 'top 78%', end: 'center 45%', scrub: 0.5 },
        });
      });

      /* ————— visione: il titolo affiora quando il punto arriva ————— */
      gsap.from('.mv-vis-title', {
        y: 70, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.mv-vis-title', start: 'top 85%', once: true },
      });
      gsap.fromTo('.mv-vis-glow', { opacity: 0, scale: 0.7 }, {
        opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.mv-vis-title', start: 'top 80%', once: true },
      });

    }, root);

    return () => ctx.revert();
  }, []);

  const missionBody =
    "Il mercato è saturo di rumore visivo. La nostra missione è ripristinare l'ordine: comunicazione che non chiede sforzo a chi la riceve, bellezza intesa come cortesia verso chi guarda — non come decorazione. Ogni asset che produciamo deve smettere di essere una voce di spesa e diventare patrimonio dell'azienda.";
  const visionBody =
    "Lavoriamo per un'economia in cui nessuna buona impresa appaia mediocre per colpa della propria comunicazione. Dove ogni azienda possa presentarsi per ciò che vale davvero — e il lavoro fatto bene torni a essere lo standard, non l'eccezione.";

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#f8f9fa] text-[#0a0a10]">

      {/* ————— la rotta (dietro tutto) ————— */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mvRoute" gradientUnits="userSpaceOnUse" x1="140" y1="300" x2="500" y2="2380">
            <stop offset="0%" stopColor="#4e92d8" />
            <stop offset="55%" stopColor="#6db5ff" />
            <stop offset="100%" stopColor="#614aa2" />
          </linearGradient>
        </defs>
        {/* la rotta è già tracciata, appena percettibile: sai dove si va */}
        <path
          d={ROUTE_D}
          fill="none"
          stroke="rgba(10,10,16,0.06)"
          strokeWidth="1.5"
          strokeDasharray="3 9"
          vectorEffect="non-scaling-stroke"
        />
        {/* il tragitto percorso, in gradiente, si disegna con lo scroll.
            NIENTE pathLength normalizzato: con vector-effect alcuni browser
            (Safari) ignorano la normalizzazione e il dash da 1 unità diventa
            micro-trattini invisibili — "lo spago sparisce". Il dash viene
            impostato in JS con la lunghezza REALE (getTotalLength). */}
        <path
          ref={pathRef}
          d={ROUTE_D}
          fill="none"
          stroke="url(#mvRoute)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: 9000, strokeDashoffset: 9000, filter: 'drop-shadow(0 0 6px rgba(78,146,216,0.45))' }}
        />
      </svg>

      {/* il viaggiatore */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute z-[5] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${(140 / VIEW_W) * 100}%`,
          top: `${(300 / VIEW_H) * 100}%`,
          opacity: 0,
          background: 'linear-gradient(135deg, #4e92d8, #614aa2)',
          boxShadow: '0 0 18px 5px rgba(78,146,216,0.5)',
        }}
      />

      {/* ————— hero ————— */}
      <div className="relative z-10 flex min-h-svh flex-col justify-center px-5 md:px-10">
        <h1 className="relative">
          <span className="block overflow-hidden py-[0.04em]">
            <span className="mv-hero-line voice-display block text-[13vw] leading-[0.9] md:text-[9vw]">Dove siamo</span>
          </span>
          <span className="block overflow-hidden text-[13vw] leading-[0] pb-[0.22em] md:text-[9vw]">
            <span className="mv-hero-line voice-display block leading-[1.05]">
              diretti,{' '}
              <span className="text-gradient-deep inline-block align-baseline font-playfair font-medium normal-case italic leading-none pb-[0.34em] -mb-[0.3em]">
                e perché.
              </span>
            </span>
          </span>
        </h1>
        <p className="mv-hero-line mt-10 max-w-md font-jakarta text-base font-medium leading-relaxed text-black/50 md:text-lg">
          La missione è il lavoro di ogni giorno. La visione è il punto all&apos;orizzonte. Scorri: la rotta è già tracciata.
        </p>
      </div>

      {/* ————— tappa 1: la missione (a destra, la rotta la sfiora) ————— */}
      <div className="relative z-10 flex min-h-[95vh] items-center px-5 py-24 md:px-10">
        <div className="w-full md:ml-auto md:w-[58%]">
          <p className="voice-mono mb-8 text-black/40">La missione</p>

          <div ref={wipeRef} className="relative">
            <h2
              ref={degRef}
              aria-hidden="true"
              className="voice-display text-4xl leading-[1.06] md:text-6xl"
              style={{
                color: 'rgba(10,10,16,0.22)',
                filter: 'blur(6px)',
                textShadow: '10px 0 rgba(78,146,216,0.35), -10px 0 rgba(97,74,162,0.35)',
              }}
            >
              <MissionStatement />
            </h2>
            <h2
              ref={cleanRef}
              className="voice-display absolute inset-0 text-4xl leading-[1.06] md:text-6xl"
              style={{ clipPath: 'inset(-25% 100% -25% 0)' }}
            >
              <MissionStatement />
            </h2>
            <div
              ref={barRef}
              className="pointer-events-none absolute bottom-[-6%] top-[-6%] w-[2px] opacity-0"
              style={{ left: '0%', background: 'linear-gradient(180deg, #4e92d8, #614aa2)', boxShadow: '0 0 22px 2px rgba(78,146,216,0.4)' }}
            />
          </div>

          <p className="mv-body mt-12 max-w-xl font-satoshi text-lg font-black leading-snug tracking-tight md:text-2xl">
            {missionBody.split(' ').map((w, i) => (
              <span key={i} className="mv-word inline-block" style={{ marginRight: '0.28em' }}>{w}</span>
            ))}
          </p>
        </div>
      </div>

      {/* ————— tappa 2: la visione (a sinistra) ————— */}
      <div className="relative z-10 flex min-h-[95vh] items-center px-5 py-24 md:px-10">
        {/* bagliore che fiorisce quando il punto arriva alla tappa */}
        <div
          className="mv-vis-glow pointer-events-none absolute left-[8%] top-1/2 h-[60vh] w-[60vh] -translate-y-1/2 rounded-full opacity-0 blur-[120px]"
          style={{ background: 'radial-gradient(closest-side, rgba(78,146,216,0.18), rgba(97,74,162,0.10), transparent)' }}
        />
        <div className="relative w-full md:w-[58%]">
          <p className="voice-mono mb-8 text-black/40">La visione</p>
          <h2 className="mv-vis-title voice-display text-4xl leading-[1.06] md:text-6xl">
            Un mercato dove la forma non tradisce più il <Accent>valore</Accent>.
          </h2>
          <p className="mv-body mt-12 max-w-xl font-satoshi text-lg font-black leading-snug tracking-tight md:text-2xl">
            {visionBody.split(' ').map((w, i) => (
              <span key={i} className="mv-word inline-block" style={{ marginRight: '0.28em' }}>{w}</span>
            ))}
          </p>
        </div>
      </div>

      {/* ————— ultimo tratto: solo la rotta, che si tuffa sulla CTA del footer ————— */}
      <div className="relative h-[55vh]" />
    </section>
  );
}
