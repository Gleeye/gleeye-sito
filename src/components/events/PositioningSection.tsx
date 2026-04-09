'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function EventsPositioningSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.epos-label', { opacity: 0, y: 16, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.epos-statement', { opacity: 0, y: 40, duration: 1.2, ease: 'power3.out', delay: 0.1, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.epos-body', { opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.3, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FA] px-6 py-24 md:py-40">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-start justify-between gap-10 mb-16 md:mb-24">
          <span className="epos-label font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 pt-1">Il nostro approccio</span>
          <span className="epos-label font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 pt-1 hidden md:block">Comunicazione eventi · Genova</span>
        </div>

        <div className="epos-statement mb-16 md:mb-24">
          <h2 className="font-satoshi font-black tracking-tight uppercase text-[8vw] md:text-[5.5vw] lg:text-[4.5vw] text-black leading-[0.95] max-w-5xl">
            Un evento ben comunicato vale il doppio.{' '}
            <span style={{ background: 'linear-gradient(90deg, #614aa2, #4e92d8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Uno mal comunicato non vale niente.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 pt-12 border-t border-black/[0.08]">
          <p className="epos-body font-jakarta font-medium leading-relaxed text-black/50 text-base md:text-lg">
            Gli eventi aziendali sono un&apos;opportunità unica: costruire relazioni, raccontare un brand, generare contenuti che durano nel tempo. Ma organizzare non basta. Senza una comunicazione strutturata prima, durante e dopo, il potenziale si disperde nel giorno dell&apos;evento.
          </p>
          <p className="epos-body font-jakarta font-medium leading-relaxed text-black/50 text-base md:text-lg">
            Siamo il partner che trasforma ogni evento in un sistema di comunicazione. Foto, video, grafica, media relation, digital: tutto in un unico studio, con un&apos;unica regia. Puoi affidarti a noi per la copertura totale o scegliere i singoli servizi di cui hai bisogno.
          </p>
        </div>

      </div>
    </section>
  );
}
