'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/* Testo in gradiente brand (blu→viola). backgroundImage, NON background: la
   shorthand azzera il background-clip e il gradiente riempirebbe tutto il box
   invece del solo testo. */
const gradientText = {
  backgroundImage: 'linear-gradient(90deg, #4e92d8, #614aa2)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

const phases = [
  {
    number: '01',
    label: 'Prima',
    sub: 'Lancio, promozione e costruzione dell\'attesa.',
    areas: [
      {
        name: 'Media Relations',
        items: ['Comunicato stampa di lancio', 'Conferenza stampa di presentazione', 'Media kit e stakeholder kit'],
      },
      {
        name: 'Grafica',
        items: ['Logo e immagine coordinata dell\'evento', 'Materiali online e offline', 'Cartellonistica — roll-up, striscioni, totem'],
      },
      {
        name: 'Video',
        items: ['Video promo, grafiche animate, slideshow con voiceover'],
      },
      {
        name: 'Digital Marketing',
        items: ['Sito web dedicato', 'Piano social e calendario', 'Campagne ADV online', 'Newsletter e digital PR'],
      },
    ],
  },
  {
    number: '02',
    label: 'Durante',
    sub: 'Copertura integrale. Niente si perde.',
    areas: [
      {
        name: 'Foto',
        items: ['Reportage fotografico integrale', 'Photobooth per ospiti e partecipanti'],
      },
      {
        name: 'Video',
        items: ['Riprese con una o più camere', 'Format Aftermovie e Multivox', 'Interviste a relatori e ospiti'],
      },
      {
        name: 'Digital Marketing',
        items: ['Contenuti pubblicati in tempo reale'],
      },
      {
        name: 'Media Relations',
        items: ['Key points notes per post live', 'Gestione rapporti con i giornalisti', 'Moderazione dell\'evento'],
      },
    ],
  },
  {
    number: '03',
    label: 'Dopo',
    sub: "Il lavoro non finisce il giorno dell'evento.",
    areas: [
      {
        name: 'Media Relations',
        items: ['Nota stampa di chiusura con numeri e takeaway', 'Follow-up con giornalisti e stakeholder', 'Contenuti speciali per copertura continuativa'],
      },
      {
        name: 'Digital Marketing',
        items: ['Resoconto post-evento su sito e social', 'Follow-up con i partecipanti', 'Contenuti riepilogativi e archivio multimediale'],
      },
    ],
  },
];

export default function EventsTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.etl-head', {
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.utils.toArray<HTMLElement>('.etl-col').forEach((col, i) => {
        gsap.from(col, {
          opacity: 0, y: 50, duration: 1.1, delay: i * 0.12, ease: 'power3.out',
          // clearProps: la colonna contiene l'etichetta in gradiente (Prima/
          // Durante/Dopo). Un transform residuo sull'antenato rompe
          // background-clip:text in Chrome → il gradiente riempie il box invece
          // del testo. A fine animazione togliamo il transform.
          clearProps: 'transform',
          scrollTrigger: { trigger: col, start: 'top 85%' },
        });
      });
      gsap.utils.toArray<HTMLElement>('.etl-area').forEach((area) => {
        gsap.from(area, {
          opacity: 0, y: 16, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: area, start: 'top 90%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="etl-head mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="font-satoshi font-black uppercase tracking-tight text-3xl md:text-4xl lg:text-5xl text-white">
            Come operiamo
          </h2>
          <p className="font-jakarta text-sm text-white/30 max-w-xs leading-relaxed">
            Copertura completa in ogni fase — prima, durante e dopo.
          </p>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
          {phases.map((phase, pi) => (
            <div key={phase.number} className="etl-col bg-black px-8 py-10 md:px-10 md:py-12 flex flex-col gap-10">

              {/* Phase header */}
              <div className="flex flex-col gap-3">
                <span
                  className="font-satoshi font-black leading-none select-none"
                  style={{
                    fontSize: 'clamp(4rem, 8vw, 7rem)',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.32)',
                  }}
                >
                  {phase.number}
                </span>
                <div>
                  <h3
                    className="font-satoshi font-black uppercase tracking-tight text-2xl md:text-3xl"
                    style={gradientText}
                  >
                    {phase.label}
                  </h3>
                  <p className="font-jakarta text-xs text-white/25 mt-1 leading-relaxed">
                    {phase.sub}
                  </p>
                </div>
              </div>

              {/* Gradient separator */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, #4e92d8, #614aa2)' }} />

              {/* Areas */}
              <div className="flex flex-col gap-8">
                {phase.areas.map((area) => (
                  <div key={area.name} className="etl-area flex flex-col gap-3">
                    <span className="font-satoshi text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      {area.name}
                    </span>
                    <ul className="space-y-2">
                      {area.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="shrink-0 mt-[7px] w-1 h-1 rounded-full opacity-40" style={{ background: 'linear-gradient(90deg, #4e92d8, #614aa2)' }} />
                          <span className="font-jakarta font-medium text-sm text-white/45 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
