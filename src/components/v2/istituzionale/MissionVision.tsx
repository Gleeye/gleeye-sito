'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isTouchDevice } from '@/lib/isTouch';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Corsivo gradiente del sito (come in home e nelle sottopagine). */
const accentGrad = {
  backgroundImage: 'linear-gradient(100deg, #4e92d8, #614aa2)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-playfair italic font-medium normal-case" style={accentGrad}>
      {children}
    </span>
  );
}

/* Il titolo della missione, due volte: la versione "comunicata male" (sfocata,
   con rumore cromatico) e quella nitida. Stesso markup = stesso wrapping. */
function MissionStatement({ degraded }: { degraded?: boolean }) {
  return (
    <>
      Ridurre l&apos;attrito tra ciò che <Accent>vali</Accent> e ciò che si <Accent>vede</Accent>.
    </>
  );
}

export default function MissionVision() {
  const rootRef = useRef<HTMLElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const degRef = useRef<HTMLHeadingElement>(null);
  const cleanRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const deg = degRef.current;
    const clean = cleanRef.current;
    const bar = barRef.current;
    if (!root || !deg || !clean || !bar) return;

    const ctx = gsap.context(() => {
      /* intro hero: sempre (è al load) */
      gsap.from('.mv-hero-line', {
        yPercent: 110, duration: 1.3, stagger: 0.12, ease: 'power4.out', delay: 0.2,
      });

      /* Su touch: niente scrub (su iOS post-nav lascerebbero tutto a metà).
         Stato finale: frase già "ripulita", orizzonte disegnato. */
      if (isTouchDevice()) {
        gsap.set(clean, { clipPath: 'inset(-8% 0% -8% 0)' });
        gsap.set(deg, { clipPath: 'inset(-8% 0 -8% 100%)' });
        gsap.set('.mv-word', { opacity: 1 });
        gsap.set('.mv-vis-title', { opacity: 1, y: 0 });
        if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1 });
        if (dotRef.current) gsap.set(dotRef.current, { left: 'calc(100% - 10px)' });
        return;
      }

      /* ————— ATTO I: la lama che toglie l'attrito ————— */
      ScrollTrigger.create({
        trigger: wipeRef.current,
        start: 'top 72%',
        end: 'bottom 38%',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress * 100;
          clean.style.clipPath = `inset(-8% ${100 - p}% -8% 0)`;
          deg.style.clipPath = `inset(-8% 0 -8% ${Math.max(0, p - 0.5)}%)`;
          bar.style.left = `${p}%`;
          bar.style.opacity = p > 0.5 && p < 99 ? '1' : '0';
        },
      });

      /* corpo: parola per parola */
      gsap.utils.toArray<HTMLElement>('.mv-body', root).forEach((b) => {
        gsap.fromTo(b.querySelectorAll('.mv-word'), { opacity: 0.12 }, {
          opacity: 1, stagger: 0.03, ease: 'none',
          scrollTrigger: { trigger: b, start: 'top 78%', end: 'center 45%', scrub: 0.5 },
        });
      });

      /* ————— ATTO II: l'orizzonte si disegna, il punto viaggia ————— */
      gsap.from('.mv-vis-title', {
        y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.mv-vis-title', start: 'top 85%', once: true },
      });
      if (lineRef.current && dotRef.current) {
        const horizonTl = gsap.timeline({
          scrollTrigger: { trigger: '.mv-horizon', start: 'top 85%', end: 'top 30%', scrub: 0.6 },
        });
        horizonTl
          .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
          .fromTo(dotRef.current, { left: '0%' }, { left: 'calc(100% - 10px)', ease: 'none' }, 0);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  const missionBody =
    "Il mercato è saturo di rumore visivo. La nostra missione è ripristinare l'ordine: comunicazione che non chiede sforzo a chi la riceve, bellezza intesa come cortesia verso chi guarda — non come decorazione. Ogni asset che produciamo deve smettere di essere una voce di spesa e diventare patrimonio dell'azienda.";
  const visionBody =
    "Lavoriamo per un'economia in cui nessuna buona impresa appaia mediocre per colpa della propria comunicazione. Dove ogni azienda possa presentarsi per ciò che vale davvero — e il lavoro fatto bene torni a essere lo standard, non l'eccezione.";

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#f8f9fa] text-[#0a0a10]">

      {/* ------- hero ------- */}
      <div className="relative flex min-h-svh flex-col justify-center px-5 md:px-10">
        <h1 className="relative">
          <span className="block overflow-hidden py-[0.04em]">
            <span className="mv-hero-line voice-display block text-[13vw] leading-[0.9] md:text-[9vw]">Dove siamo</span>
          </span>
          <span className="block overflow-hidden text-[13vw] leading-[0] pb-[0.22em] md:text-[9vw]">
            <span className="mv-hero-line voice-display block leading-[1.05]">
              diretti,{' '}
              <span
                className="inline-block align-baseline font-playfair font-medium normal-case italic leading-none pb-[0.34em] -mb-[0.3em]"
                style={accentGrad}
              >
                e perché.
              </span>
            </span>
          </span>
        </h1>
        <p className="mv-hero-line mt-10 max-w-md font-jakarta text-base font-medium leading-relaxed text-black/50 md:text-lg">
          La missione è il lavoro di ogni giorno. La visione è il punto all&apos;orizzonte.
        </p>
      </div>

      {/* ------- atto I: la missione — l'attrito che si toglie ------- */}
      <div className="relative px-5 py-24 md:px-10 md:py-40">
        <p className="voice-mono mb-10 text-black/40">La missione</p>

        {/* La frase esiste due volte: com'è quando la comunicazione tradisce
            (sfocata, rumore cromatico) e com'è quando l'attrito è tolto.
            Scrollando, una lama in gradiente la attraversa e la ripulisce. */}
        <div ref={wipeRef} className="relative max-w-5xl">
          <h2
            ref={degRef}
            aria-hidden="true"
            className="voice-display text-4xl leading-[1.06] md:text-7xl"
            style={{
              color: 'rgba(10,10,16,0.22)',
              filter: 'blur(6px)',
              textShadow: '10px 0 rgba(78,146,216,0.35), -10px 0 rgba(97,74,162,0.35)',
            }}
          >
            <MissionStatement degraded />
          </h2>
          <h2
            ref={cleanRef}
            className="voice-display absolute inset-0 text-4xl leading-[1.06] md:text-7xl"
            style={{ clipPath: 'inset(-8% 100% -8% 0)' }}
          >
            <MissionStatement />
          </h2>
          {/* la lama */}
          <div
            ref={barRef}
            className="pointer-events-none absolute bottom-[-6%] top-[-6%] w-[2px] opacity-0"
            style={{ left: '0%', background: 'linear-gradient(180deg, #4e92d8, #614aa2)', boxShadow: '0 0 22px 2px rgba(78,146,216,0.4)' }}
          />
        </div>

        <p className="mv-body mt-14 max-w-2xl font-satoshi text-xl font-black leading-snug tracking-tight md:ml-[26%] md:text-3xl">
          {missionBody.split(' ').map((w, i) => (
            <span key={i} className="mv-word inline-block" style={{ marginRight: '0.28em' }}>{w}</span>
          ))}
        </p>
      </div>

      {/* ------- atto II: la visione — il punto all'orizzonte ------- */}
      <div className="relative px-5 py-24 pb-32 md:px-10 md:py-40">
        <p className="voice-mono mb-10 text-black/40">La visione</p>
        <h2 className="mv-vis-title voice-display max-w-5xl text-4xl leading-[1.06] md:ml-[18%] md:text-7xl">
          Un mercato dove la forma non tradisce più il <Accent>valore</Accent>.
        </h2>
        <p className="mv-body mt-14 max-w-2xl font-satoshi text-xl font-black leading-snug tracking-tight md:ml-[18%] md:text-3xl">
          {visionBody.split(' ').map((w, i) => (
            <span key={i} className="mv-word inline-block" style={{ marginRight: '0.28em' }}>{w}</span>
          ))}
        </p>

        {/* l'orizzonte: la linea si disegna, il punto arriva a destinazione */}
        <div className="mv-horizon relative mt-28 h-10">
          <div
            ref={lineRef}
            className="absolute left-0 right-0 top-1/2 h-px origin-left"
            style={{ background: 'linear-gradient(90deg, rgba(78,146,216,0.12), #4e92d8 55%, #614aa2)', transform: 'scaleX(0)' }}
          />
          <div
            ref={dotRef}
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
            style={{ left: '0%', background: '#614aa2', boxShadow: '0 0 20px 5px rgba(97,74,162,0.45)', animation: 'mv-pulse 2.8s ease-in-out infinite' }}
          />
        </div>
        <p className="mt-8 text-right font-jakarta text-sm font-medium text-black/50">
          Il tragitto tra i due punti è il nostro{' '}
          <a href="/metodo" className="font-semibold text-[#0a0a10] underline decoration-[#4e92d8] underline-offset-4">metodo</a>.
        </p>
      </div>

      <style>{`
        @keyframes mv-pulse {
          0%, 100% { box-shadow: 0 0 14px 3px rgba(97,74,162,0.35); }
          50% { box-shadow: 0 0 26px 8px rgba(97,74,162,0.55); }
        }
      `}</style>
    </section>
  );
}
