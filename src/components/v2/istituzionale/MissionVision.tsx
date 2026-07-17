'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* stelle deterministiche (niente Math.random: SSR-safe) */
const STARS = Array.from({ length: 90 }, (_, i) => ({
  x: ((i * 37.7) % 100),
  y: ((i * 61.3) % 100),
  s: 1 + ((i * 7) % 3),
  d: (i % 5) * 0.8,
}));

export default function MissionVision() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from('.mv-hero-line', {
        yPercent: 110, duration: 1.3, stagger: 0.12, ease: 'power4.out', delay: 0.2,
      });

      /* il giorno diventa notte: lo sfondo si spegne tra i due atti */
      gsap.fromTo(root,
        { backgroundColor: '#f8f9fa' },
        {
          backgroundColor: '#0a0a10',
          ease: 'none',
          scrollTrigger: { trigger: '.mv-transition', start: 'top 90%', end: 'bottom 35%', scrub: 0.6 },
        },
      );

      /* il sole sale e si spegne diventando luna */
      gsap.fromTo('.mv-disc',
        { yPercent: 45, filter: 'saturate(1)' },
        {
          yPercent: -35,
          filter: 'saturate(0.35)',
          ease: 'none',
          scrollTrigger: { trigger: '.mv-transition', start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      );

      /* le stelle si accendono entrando nella notte */
      gsap.fromTo('.mv-stars', { opacity: 0 }, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.mv-vision', start: 'top 80%', end: 'top 30%', scrub: 0.6 },
      });

      /* testi: parola per parola */
      gsap.utils.toArray<HTMLElement>('.mv-body', root).forEach((b) => {
        gsap.fromTo(b.querySelectorAll('.mv-word'), { opacity: 0.1 }, {
          opacity: 1, stagger: 0.03, ease: 'none',
          scrollTrigger: { trigger: b, start: 'top 78%', end: 'center 45%', scrub: 0.5 },
        });
      });

      /* titoli d'atto: entrano da fuori con rotazione */
      gsap.utils.toArray<HTMLElement>('.mv-act-title', root).forEach((t) => {
        gsap.from(t, {
          y: 90, opacity: 0, rotate: 3, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: t, start: 'top 85%', once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const missionBody =
    "Il mercato è saturo di rumore visivo. La nostra missione è ripristinare l'ordine: comunicazione che non chiede sforzo a chi la riceve, bellezza intesa come cortesia verso chi guarda — non come decorazione. Ogni asset che produciamo deve smettere di essere una voce di spesa e diventare patrimonio dell'azienda.";
  const visionBody =
    "Lavoriamo per un'economia in cui nessuna buona impresa appaia mediocre per colpa della propria comunicazione. Dove ogni azienda possa presentarsi per ciò che vale davvero — e il lavoro fatto bene torni a essere lo standard, non l'eccezione.";

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#f8f9fa]">

      {/* ------- hero (giorno) ------- */}
      <div className="relative flex min-h-svh flex-col justify-center px-5 md:px-10">
        <h1 className="relative text-[#0a0a10]">
          <span className="block overflow-hidden py-[0.04em]">
            <span className="mv-hero-line voice-display block text-[13vw] leading-[0.9] md:text-[9vw]">Dove siamo</span>
          </span>
          <span className="block overflow-hidden py-[0.04em]">
            <span className="mv-hero-line voice-display block text-[13vw] leading-[0.9] md:text-[9vw]">
              diretti, <span className="text-gradient-flow">e perché</span>.
            </span>
          </span>
        </h1>
        <p className="mv-hero-line mt-10 max-w-md font-jakarta text-base font-medium leading-relaxed text-black/50 md:text-lg">
          La missione è il lavoro di ogni giorno. La visione è il punto all&apos;orizzonte. Questa pagina va dal giorno alla notte — come ogni progetto fatto bene.
        </p>
      </div>

      {/* ------- atto I: mission ------- */}
      <div className="relative px-5 py-28 md:px-10 md:py-40">
        <p className="voice-mono mb-8 text-black/40">Atto I — La missione</p>
        <h2 className="mv-act-title voice-display max-w-5xl text-4xl leading-[1.02] text-[#0a0a10] md:text-7xl">
          Ridurre l&apos;attrito tra ciò che <span className="text-gradient-flow">vali</span> e ciò che si <span className="text-gradient-flow">vede</span>.
        </h2>
        <p className="mv-body mt-14 max-w-2xl font-satoshi text-xl font-black leading-snug tracking-tight text-[#0a0a10] md:ml-[26%] md:text-3xl">
          {missionBody.split(' ').map((w, i) => (
            <span key={i} className="mv-word inline-block" style={{ marginRight: '0.28em' }}>{w}</span>
          ))}
        </p>
      </div>

      {/* ------- transizione: il sole tramonta ------- */}
      <div className="mv-transition pointer-events-none relative flex h-[70vh] items-center justify-center overflow-hidden">
        <div
          className="mv-disc h-[46vh] w-[46vh] rounded-full blur-[6px]"
          style={{ background: 'radial-gradient(circle at 35% 30%, #8fc1ee 0%, #4e92d8 40%, #614aa2 100%)', opacity: 0.9 }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* ------- atto II: vision (notte) ------- */}
      <div className="mv-vision relative px-5 py-28 pb-40 md:px-10 md:py-40">
        {/* cielo stellato */}
        <div className="mv-stars pointer-events-none absolute inset-0" style={{ opacity: 0 }}>
          {STARS.map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.s,
                height: s.s,
                opacity: 0.5,
                animation: `mv-twinkle 3.5s ease-in-out ${s.d}s infinite`,
              }}
            />
          ))}
        </div>
        <div className="grain absolute inset-0" />

        <p className="voice-mono relative mb-8 text-white/40">Atto II — La visione</p>
        <h2 className="mv-act-title voice-display relative max-w-5xl text-4xl leading-[1.02] text-[#f8f9fa] md:ml-[18%] md:text-7xl">
          Un mercato dove la forma non tradisce più il <span className="text-gradient-flow">valore</span>.
        </h2>
        <p className="mv-body relative mt-14 max-w-2xl font-satoshi text-xl font-black leading-snug tracking-tight text-white md:text-3xl">
          {visionBody.split(' ').map((w, i) => (
            <span key={i} className="mv-word inline-block" style={{ marginRight: '0.28em' }}>{w}</span>
          ))}
        </p>

        <div className="relative mt-24 border-t border-white/10 pt-10">
          <p className="font-jakarta text-sm font-medium text-white/40">
            Il tragitto tra i due punti è il nostro <a href="/metodo" className="text-white underline decoration-[#4e92d8] underline-offset-4">metodo</a>.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes mv-twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
