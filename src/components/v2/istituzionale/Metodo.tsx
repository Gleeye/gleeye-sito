'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isTouchDevice } from '@/lib/isTouch';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ————————————————————————————————————————————————————————————————
   CONCEPT — "La linea".
   Il metodo trasforma l'incertezza in una linea retta. Quindi la pagina
   lo fa davvero: una linea attraversa lo schermo dall'inizio alla fine —
   parte come uno scarabocchio nervoso (il caos) e, scrollando, si
   raddrizza fase dopo fase, fino alla chiusura: "una linea retta."
   ———————————————————————————————————————————————————————————————— */

const FASI = [
  {
    num: '01',
    label: 'Analisi del bisogno',
    tesi: { plain: 'Ogni progetto comincia con', accent: 'una domanda scomoda.' },
    body: 'Cosa serve davvero — e cosa è solo rumore? Scaviamo dietro la richiesta fino alla necessità reale. Prima di produrre qualsiasi cosa, mettiamo a fuoco il problema.',
  },
  {
    num: '02',
    label: 'Strategia',
    tesi: { plain: 'La rotta si disegna', accent: 'prima di salpare.' },
    body: 'Posizionamento, identità, priorità: un sistema in cui ogni scelta sostiene le altre. Niente pezzi separati — ogni investimento sa dove sta andando.',
  },
  {
    num: '03',
    label: 'Produzione',
    tesi: { plain: 'La strategia diventa', accent: 'materia.' },
    body: 'Video, siti, contenuti, campagne. La factory trasforma la rotta in asset finiti: tempi certi, standard costante, zero dipendenza dall’ispirazione del momento.',
  },
  {
    num: '04',
    label: 'Presidio',
    tesi: { plain: 'Il risultato va difeso,', accent: 'ogni giorno.' },
    body: 'Ogni uscita resta coerente, ogni fornitore allineato, ogni dettaglio sotto controllo. Il valore costruito non si disperde: si consolida.',
  },
];

/* Corsivo gradiente del sito, ricetta inline-block anti-taglio discendenti. */
function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-gradient inline-block align-baseline font-playfair italic font-medium normal-case leading-[1.05] pb-[0.18em] -mb-[0.14em] pr-[0.04em]">
      {children}
    </span>
  );
}

export default function Metodo() {
  const rootRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!root || !path || !svg) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    const N = 72;
    /* rumore deterministico: somma di seni, niente Math.random */
    const noise = (i: number) =>
      Math.sin(i * 0.9) * 0.45 + Math.sin(i * 0.37 + 2.1) * 0.35 + Math.sin(i * 2.3 + 4.7) * 0.2;

    const draw = (p: number) => {
      progressRef.current = p;
      const amp = H * 0.16 * Math.pow(1 - p, 1.7); /* caos che si spegne */
      const base = H * 0.78;
      let d = `M -20 ${(base + noise(0) * amp).toFixed(1)}`;
      for (let i = 1; i <= N; i++) {
        const x = (i / N) * (W + 40) - 20;
        d += ` L ${x.toFixed(1)} ${(base + noise(i) * amp).toFixed(1)}`;
      }
      path.setAttribute('d', d);
      /* la linea è fixed: sfuma poco prima del footer, dopo il payoff */
      svg.style.opacity = p > 0.92 ? String(Math.max(0, (1 - p) / 0.08)) : '1';
    };

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      draw(progressRef.current);
    };
    window.addEventListener('resize', onResize);

    const ctx = gsap.context(() => {
      /* entrata hero: sempre */
      gsap.from('.mt-hero-line', { yPercent: 110, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.15 });
      gsap.from('.mt-hero-sub', { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', delay: 0.7 });

      /* Su touch: niente scrub — la linea è già retta, i contenuti visibili. */
      if (isTouchDevice()) {
        draw(1);
        return;
      }

      draw(0);
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        onUpdate: (self) => draw(self.progress),
      });

      /* reveal delle fasi: set + onEnter (pattern robusto) */
      gsap.utils.toArray<HTMLElement>('.mt-reveal', root).forEach((el) => {
        gsap.set(el, { opacity: 0, y: 36 });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 82%',
          once: true,
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }),
        });
      });
    }, root);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0a0a10] text-[#f8f9fa]">
      <div className="grain absolute inset-0" />

      {/* ————— la linea: dal caos alla retta, sempre in scena ————— */}
      <svg ref={svgRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="mtLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6db5ff" />
            <stop offset="100%" stopColor="#9b7bff" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          fill="none"
          stroke="url(#mtLine)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.7"
          style={{ filter: 'drop-shadow(0 0 8px rgba(109,181,255,0.35))' }}
        />
      </svg>

      {/* ————— hero ————— */}
      <div className="relative z-10 flex min-h-svh flex-col justify-center px-5 md:px-10">
        <h1>
          <span className="block overflow-hidden py-[0.04em]">
            <span className="mt-hero-line voice-display block text-[12vw] leading-[0.92] md:text-[8.5vw]">Il caos non è</span>
          </span>
          <span className="block overflow-hidden pt-[0.03em] pb-[0.2em]">
            <span className="mt-hero-line text-gradient block w-fit font-playfair italic font-medium normal-case leading-[1.02] tracking-[-0.01em] pb-[0.14em] pr-[0.05em] text-[13vw] md:text-[9vw]">
              un metodo.
            </span>
          </span>
        </h1>
        <p className="mt-hero-sub mt-8 max-w-xl font-jakarta text-lg font-medium leading-relaxed text-white/55 md:text-xl">
          La linea qui sotto è il caos con cui arriva ogni progetto. Scorri: guardala raddrizzarsi.
        </p>
      </div>

      {/* ————— le quattro fasi ————— */}
      {FASI.map((f, i) => (
        <div
          key={f.num}
          className="relative z-10 flex min-h-[70vh] items-center px-5 py-16 md:min-h-[85vh] md:px-10 md:py-24"
        >
          <div className={`mt-reveal w-full max-w-2xl ${i % 2 === 1 ? 'md:ml-auto' : ''}`}>
            <span
              className="voice-display block text-7xl leading-none md:text-9xl"
              style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.22)' }}
            >
              {f.num}
            </span>
            <p className="voice-mono mb-6 mt-5 text-white/40">{f.label}</p>
            <h2 className="voice-display text-3xl leading-[1.08] md:text-5xl">
              {f.tesi.plain} <Accent>{f.tesi.accent}</Accent>
            </h2>
            <p className="mt-6 max-w-xl font-jakarta text-base font-medium leading-relaxed text-white/55 md:text-xl">
              {f.body}
            </p>
          </div>
        </div>
      ))}

      {/* ————— chiusura: il payoff della linea ————— */}
      <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-5 pb-40 text-center">
        <h2 className="mt-reveal voice-display text-3xl leading-[1.1] md:text-6xl">
          Dal primo dubbio alla consegna:
          <span className="text-gradient mx-auto mt-3 block w-fit pb-[0.16em] pr-[0.05em] font-playfair italic font-medium normal-case leading-[1.05] tracking-[-0.01em]">
            una linea retta.
          </span>
        </h2>
      </div>
    </section>
  );
}
