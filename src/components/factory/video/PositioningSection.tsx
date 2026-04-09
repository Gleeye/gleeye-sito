'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PositioningSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gvid-pos-label', {
        opacity: 0, y: 16, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.gvid-pos-statement', {
        opacity: 0, y: 40, duration: 1.2, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.gvid-pos-body', {
        opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FA] px-6 py-24 md:py-40">
      <div className="max-w-7xl mx-auto">

        {/* Top row */}
        <div className="flex items-start justify-between gap-10 mb-16 md:mb-24">
          <span className="gvid-pos-label font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 pt-1">
            Il nostro approccio
          </span>
          <span className="gvid-pos-label font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 pt-1 hidden md:block">
            Video Production · Genova
          </span>
        </div>

        {/* Main statement */}
        <div className="gvid-pos-statement mb-16 md:mb-24">
          <h2 className="font-satoshi font-black tracking-tight uppercase text-[8vw] md:text-[5.5vw] lg:text-[4.5vw] text-black leading-[0.95] max-w-5xl">
            Un video non documenta la tua azienda.{' '}
            <span
              className="inline"
              style={{
                background: 'linear-gradient(90deg, #614aa2, #4e92d8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              La racconta al posto tuo.
            </span>
          </h2>
        </div>

        {/* Two columns body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 pt-12 border-t border-black/08">
          <p className="gvid-pos-body font-jakarta font-medium leading-relaxed text-black/50 text-base md:text-lg">
            Nella catena dell&apos;attenzione digitale, il video è l&apos;unico formato che tiene il pubblico fermo — ammesso che sia fatto bene. Un video professionale non è un&apos;opzione: è il formato che trasforma visitatori in clienti.
          </p>
          <p className="gvid-pos-body font-jakarta font-medium leading-relaxed text-black/50 text-base md:text-lg">
            Dalla pre-produzione alla post, gestiamo l&apos;intero ciclo. Script, riprese, montaggio, color grading, sound design: niente viene lasciato al caso, perché ogni secondo di schermo ha un costo e deve guadagnarsi il suo posto.
          </p>
        </div>

      </div>
    </section>
  );
}
