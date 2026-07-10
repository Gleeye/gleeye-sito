'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    n: '01',
    title: 'Analisi del bisogno',
    desc: "Identifichiamo la necessità reale dietro la richiesta. Dove la comunicazione attuale tradisce il valore del prodotto?",
  },
  {
    n: '02',
    title: 'Strategia',
    desc: 'La boutique disegna il percorso: posizionamento, identità, priorità. Niente pezzi separati, un sistema.',
  },
  {
    n: '03',
    title: 'Produzione',
    desc: 'La factory trasforma la strategia in asset finiti: video, siti, contenuti. Tempi certi, standard costante.',
  },
  {
    n: '04',
    title: 'Presidio',
    desc: "Supervisione continua e controllo qualità: il risultato resta coerente con l'immagine, nel tempo.",
  },
];

export default function Method() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from('.method-head > *', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.method-head', start: 'top 85%', once: true },
      });

      /* the connective line draws itself */
      gsap.fromTo(
        '.method-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.method-steps', start: 'top 75%', end: 'top 30%', scrub: 0.6 },
        }
      );

      gsap.utils.toArray<HTMLElement>('.method-step', root).forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.method-steps', start: 'top 70%', once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0a0a10] py-28 text-[#f8f9fa] md:py-40">
      <div className="blueprint absolute inset-0" />
      <div className="grain absolute inset-0" />
      <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#614aa2]/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="method-head mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <div>
            <p className="voice-mono mb-4 text-[#6db5ff]">[ 04 — Il metodo ]</p>
            <h2 className="voice-display text-4xl md:text-6xl">
              Dall&apos;idea
              <br />
              all&apos;<span className="text-gradient">asset.</span>
            </h2>
          </div>
          <p className="max-w-sm font-jakarta font-medium leading-relaxed text-white/50">
            Il cliente delega la complessità e riceve un prodotto finito che
            rispetta lo standard Glee to eye. Un solo interlocutore, tutta la
            catena del valore.
          </p>
        </div>

        <div className="method-steps relative">
          {/* connective line */}
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/10 md:block">
            <div className="method-line h-px w-full origin-left bg-gradient-to-r from-[#4e92d8] via-[#9b7bff] to-[#614aa2]" />
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
            {STEPS.map((step) => (
              <div key={step.n} className="method-step relative md:pt-10">
                <span className="absolute left-0 top-0 hidden h-[15px] w-[15px] rounded-full border-2 border-[#6db5ff] bg-[#0a0a10] animate-pulse-dot md:block" />
                <p className="voice-mono mb-4 text-[#6db5ff]">{step.n}</p>
                <h3 className="voice-display mb-4 text-2xl">{step.title}</h3>
                <p className="font-jakarta text-sm font-medium leading-relaxed text-white/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
