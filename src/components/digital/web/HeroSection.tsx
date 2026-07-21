'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const WORDS = ['SITI', 'CHE', 'LAVORANO', 'MEGLIO'];

export default function WebHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.set(wordRefs.current, { yPercent: 110, opacity: 0 });
    gsap.set([badgeRef.current, subRef.current, ctaRef.current], { opacity: 0, y: 16 });
  }, []);

  useEffect(() => {
    gsap.to(orb1Ref.current, {
      x: 60, y: -40, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(orb2Ref.current, {
      x: -50, y: 60, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2,
    });
    gsap.to(orb3Ref.current, {
      x: 30, y: 50, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4,
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to(wordRefs.current, {
          yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out',
        }, '-=0.4')
        .to(subRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full bg-black flex flex-col justify-between px-6 pt-32 pb-12 md:pt-40 md:pb-24 overflow-hidden"
    >
      <div ref={orb1Ref} className="pointer-events-none absolute top-[15%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px] opacity-25" style={{ background: '#614aa2' }} />
      <div ref={orb2Ref} className="pointer-events-none absolute top-[40%] right-[5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-[140px] opacity-20" style={{ background: '#4e92d8' }} />
      <div ref={orb3Ref} className="pointer-events-none absolute bottom-[10%] left-[30%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full blur-[100px] opacity-15" style={{ background: '#614aa2' }} />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
        <span
          className="font-satoshi font-black text-[22vw] leading-none whitespace-nowrap"
          style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.04)' }}
        >
          WEB
        </span>
      </div>

      <div ref={badgeRef} className="relative z-10 flex justify-center">
        <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-white/35 font-satoshi border border-white/10 px-4 py-2 rounded-full">
          Digital / Web Design &amp; Dev
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-12 text-center">
        <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 lg:gap-x-8">
          {WORDS.map((word, i) => (
            <div key={word} className="overflow-hidden">
              <span
                ref={el => { wordRefs.current[i] = el; }}
                className={`block font-satoshi font-black tracking-tight leading-none text-[13vw] md:text-[10vw] lg:text-[8vw] xl:text-[7rem] ${
                  i === WORDS.length - 1
                    ? 'bg-gradient-to-r from-[#614aa2] to-[#4e92d8] bg-clip-text text-transparent'
                    : 'text-white'
                }`}
              >
                {word}
              </span>
            </div>
          ))}
        </div>

        <p ref={subRef} className="mt-8 max-w-xl font-jakarta font-medium text-lg md:text-xl text-white/30 leading-relaxed">
          Il tuo sito è il tuo venditore più disponibile. Lavora 24 ore su 24 — meglio che sia bravo.
        </p>
      </div>

      <div ref={ctaRef} className="relative z-10 flex items-center justify-center gap-6">
        <a
          href="#contatti"
          className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden flex items-center justify-center transition-all duration-700"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#614aa2] to-[#4e92d8] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="relative z-10 font-satoshi text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-500">
            Parliamo del tuo progetto
          </span>
        </a>
        <div className="flex items-center gap-4">
          <div className="w-px h-8 bg-white/10" />
          <span className="font-jakarta text-sm text-white/20">Design · Dev · Performance</span>
        </div>
      </div>
    </section>
  );
}
