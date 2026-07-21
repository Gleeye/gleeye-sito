'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TABS = [
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Mission e Vision', href: '/mission-e-vision' },
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Metodo', href: '/metodo' },
];

export default function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.mf-title-line', root).forEach((line, i) => {
        gsap.from(line, {
          x: i % 2 === 0 ? 80 : -80,
          opacity: 0,
          duration: 1.3,
          ease: 'power4.out',
          scrollTrigger: { trigger: root, start: 'top 78%' },
        });
      });

      gsap.from('.mf-reveal', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.mf-grid', start: 'top 85%' },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="manifesto"
      className="relative overflow-hidden bg-[#0a0a10] py-28 text-[#f8f9fa] md:py-40"
    >
      <div className="grain absolute inset-0" />
      <div className="absolute right-0 top-0 h-[45vh] w-[45vh] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#614aa2]/25 blur-[130px]" />
      <div className="absolute bottom-0 left-0 h-[40vh] w-[40vh] -translate-x-1/3 translate-y-1/3 rounded-full bg-[#4e92d8]/20 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        {/* Titolo */}
        <h2 className="voice-display mb-16 text-[13vw] leading-[0.9] md:mb-24 md:text-[min(7vw,7rem)]">
          <span className="mf-title-line block md:pl-[8%]">Dall&apos;intenzione</span>
          <span className="mf-title-line -mt-[1vw] block whitespace-nowrap text-gradient font-playfair italic font-medium normal-case tracking-[-0.01em] text-[15vw] leading-[0.9] md:text-[min(13vw,11rem)]">alla sostanza.</span>
        </h2>

        {/* Nav + due colonne di testo */}
        <div className="mf-grid grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Nav (pagine da costruire — per ora non cliccabili) */}
          <nav className="mf-reveal md:col-span-3">
            <div className="flex flex-col">
              {TABS.map((tab) => (
                <div key={tab.href} className="border-b border-white/10 py-5">
                  <Link href={tab.href} className="voice-mono group/tab inline-flex items-center gap-2 text-white/50 transition-colors duration-300 hover:text-white">
                    {tab.label}
                    <span className="opacity-0 transition-all duration-300 group-hover/tab:translate-x-1 group-hover/tab:opacity-100" aria-hidden>→</span>
                  </Link>
                </div>
              ))}
            </div>
          </nav>

          {/* Colonna 1 — affermazioni */}
          <div className="space-y-10 md:col-span-4">
            <p className="mf-reveal font-jakarta text-xl font-semibold leading-[1.35] tracking-tight text-white md:text-2xl">
              Ogni necessità richiede una struttura capace di sostenerla. In Gleeye
              presidiamo lo spazio che separa l&apos;intenzione dal risultato.
            </p>
            <p className="mf-reveal font-jakarta text-xl font-semibold leading-[1.35] tracking-tight text-white/90 md:text-2xl">
              Perché un progetto ha valore solo quando smette di essere un discorso
              e diventa sostanza.
            </p>
          </div>

          {/* Colonna 2 — approfondimento */}
          <div className="space-y-8 md:col-span-5">
            <p className="mf-reveal font-jakarta text-base font-medium leading-relaxed text-white/45 md:text-lg">
              La creatività non è un&apos;ispirazione estemporanea, ma
              un&apos;intelligenza che risolve. Non separiamo mai la strategia
              dall&apos;esecuzione: semplifichiamo i processi, diamo stabilità alla
              comunicazione e costruiamo asset che abbiano un peso reale.
            </p>
            <p className="mf-reveal font-jakarta text-base font-medium leading-relaxed text-white/45 md:text-lg">
              Assorbiamo l&apos;urto e l&apos;imprevedibilità del percorso per
              lasciarti solo la solidità dei risultati, trasformando
              l&apos;intuizione in un vantaggio competitivo concreto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
