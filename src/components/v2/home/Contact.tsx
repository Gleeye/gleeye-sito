'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Form Gleeye embeddato. NB: src su localhost — sostituire col dominio reale in produzione. */
const FORM_ID = '517d363a-dea8-47d1-ba6e-1acf22498b99';
const FORM_SRC = `http://localhost:5188/form/${FORM_ID}?embed=true`;

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [formHeight, setFormHeight] = useState(600);

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

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'gleeye-form-resize' && e.data.height) {
        setFormHeight(e.data.height);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
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

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 md:grid-cols-[1fr_1fr] md:gap-20 md:px-10">
        {/* left */}
        <div className="ct-left">
          <h2 className="voice-display text-5xl leading-[0.95] md:text-7xl">
            Hai un progetto
            <br />
            da realizzare<span className="text-[#6db5ff]">?</span>
            <br />
            <span className="text-gradient">Contattaci.</span>
          </h2>
          <p className="mt-8 max-w-md font-jakarta text-lg font-medium leading-relaxed text-white/70">
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
            <div>
              <p className="voice-mono mb-2 text-white/35">Vieni a trovarci</p>
              <p className="font-jakarta text-white/70">Piazza Brignole 2/3 — 16122 Genova</p>
            </div>
          </div>
        </div>

        {/* form embed */}
        <div className="ct-card self-start overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md md:p-4">
          <iframe
            id={`gleeye-form-${FORM_ID}`}
            title="Modulo di contatto Gleeye"
            src={FORM_SRC}
            width="100%"
            height={formHeight}
            style={{ width: '100%', border: 0, background: 'transparent' }}
          />
        </div>
      </div>
    </section>
  );
}
