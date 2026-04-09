'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CopywritingIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.copy-intro-left', {
        opacity: 0,
        x: -40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.copy-intro-right', {
        opacity: 0,
        x: 40,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F8F9FA] px-6 py-24 md:py-36"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* Left: text */}
        <div className="copy-intro-left">
          <h2 className="font-satoshi font-black tracking-tight uppercase text-3xl md:text-4xl lg:text-5xl text-black leading-tight mb-10">
            Ogni azienda ha una storia. Il nostro lavoro è farla suonare bene.
          </h2>

          <div className="space-y-6">
            <p className="font-jakarta font-medium leading-relaxed text-black/55 text-base md:text-lg">
              Avete presente l&apos;albero che cade in una foresta dove non c&apos;è nessuno? Da una parte ci sono i fatti, dall&apos;altra le storie. Senza i primi, non ci sarebbe molto da raccontare. Ma senza le storie, i fatti rischiano di scomparire nel rumore.
            </p>
            <p className="font-jakarta font-medium leading-relaxed text-black/55 text-base md:text-lg">
              Sviluppiamo strategie di comunicazione e storytelling costruite sulla narrazione e sull&apos;identità della tua impresa. Un lavoro sartoriale, su misura. Perché impostare il vocabolario e il tone of voice di un brand non si improvvisa.
            </p>
          </div>
        </div>

        {/* Right: editorial accent */}
        <div className="copy-intro-right flex flex-col items-start md:items-end justify-start pt-2 md:pt-10">
          <div className="relative">
            <span
              className="block font-satoshi font-black text-[18vw] md:text-[12vw] lg:text-[10rem] leading-none select-none"
              style={{ color: 'transparent', WebkitTextStroke: '1px rgba(0,0,0,0.06)' }}
            >
              01
            </span>
          </div>
          <blockquote className="mt-6 md:mt-0 border-l-2 border-black/15 pl-6 max-w-xs">
            <p className="font-satoshi font-black text-lg md:text-xl text-black/30 uppercase tracking-tight leading-snug">
              &ldquo;Bisogna assomigliare alle parole che si dicono.&rdquo;
            </p>
            <cite className="mt-3 block font-jakarta text-sm text-black/25 not-italic">
              — Stefano Benni
            </cite>
          </blockquote>
        </div>

      </div>
    </section>
  );
}
