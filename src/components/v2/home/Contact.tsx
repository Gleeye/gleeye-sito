'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from('.ct-left > *', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });
      gsap.from('.ct-card', {
        opacity: 0,
        y: 60,
        duration: 1.1,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="contatti"
      className="relative overflow-hidden bg-[#0a0a10] py-28 text-[#f8f9fa] md:py-40"
    >
      <div className="grain absolute inset-0" />
      <div className="absolute -left-32 top-0 h-[55vh] w-[55vh] rounded-full bg-[#4e92d8]/20 blur-[150px]" />
      <div className="absolute -right-32 bottom-0 h-[55vh] w-[55vh] rounded-full bg-[#614aa2]/25 blur-[150px]" />

      {/* Due colonne solo da lg: a md la colonna sarebbe di 304px e il titolo
          si spezzerebbe comunque. */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* left */}
        <div className="ct-left">
          {/* Misure ricavate dalla larghezza reale del testo: la riga più lunga
              ("Hai un progetto") vale 8.95px per ogni px di corpo, e deve stare
              dentro la colonna a ogni breakpoint senza spezzarsi. */}
          <h2 className="voice-display text-[2rem] leading-[1.02] md:text-5xl lg:text-[min(4.4vw,3.75rem)]">
            Hai un progetto
            <br />
            da realizzare?
            <br />
            <span className="text-gradient">Contattaci.</span>
          </h2>
          <p className="mt-7 max-w-md font-jakarta text-lg font-medium leading-relaxed text-white/70">
            Fissiamo un appuntamento oppure organizza una video call.
          </p>

          <div className="mt-12 space-y-6">
            <div>
              <p className="voice-mono mb-2 text-white/35">Scrivi</p>
              <a
                href="mailto:info@gleeye.eu"
                className="group inline-flex items-center gap-2 font-satoshi text-2xl font-black text-white transition-colors hover:text-[#6db5ff] md:text-3xl"
              >
                info@gleeye.eu
                <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </div>
            <div>
              <p className="voice-mono mb-2 text-white/35">Chiama</p>
              <a href="tel:+390100954533" className="font-satoshi text-xl font-bold text-white/85 transition-colors hover:text-[#6db5ff]">
                +39 010 09 54 533
              </a>
            </div>
            {/* Niente "vieni a trovarci": la sede di Piazza Brignole è
                delegata, non è un ufficio dove ricevere. L'indirizzo resta
                nel footer e nella privacy policy, dove serve per legge. */}
            <div>
              <p className="voice-mono mb-2 text-white/35">Dove siamo</p>
              <p className="font-jakarta text-white/70">Genova — operativi ovunque</p>
            </div>
          </div>
        </div>

        {/* card CTA */}
        <div className="ct-card self-start overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md md:p-12">
          <p className="voice-mono text-white/35">Partiamo da qui</p>
          <h3 className="mt-4 font-satoshi text-3xl font-black uppercase leading-[1.05] tracking-tight md:text-4xl">
            Raccontaci
            <br />
            il progetto.
          </h3>
          <p className="mt-6 font-jakarta font-medium leading-relaxed text-white/60">
            Due righe su cosa hai in mente e chi sei. Ti rispondiamo entro un giorno
            lavorativo con una prima lettura e una proposta di call.
          </p>

          <a
            href="mailto:info@gleeye.eu?subject=Nuovo%20progetto"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-satoshi text-base font-black uppercase tracking-tight text-[#0a0a10] transition-colors hover:bg-[#6db5ff]"
          >
            Scrivici una mail
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>

          <p className="mt-6 font-jakarta text-sm text-white/45">
            Preferisci sentirci a voce?{' '}
            <a href="tel:+390100954533" className="text-white/75 underline underline-offset-4 transition-colors hover:text-[#6db5ff]">
              Chiamaci
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
