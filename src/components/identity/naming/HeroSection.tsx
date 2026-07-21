'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const HEAD = { plain: ["UN NOME"], accent: "che resta.", inline: false, size: "xl" };
const PLAIN_SIZE = { xl: 'text-[9vw] md:text-[min(7.4vw,6.6rem)]', lg: 'text-[7.6vw] md:text-[min(6.8vw,5.8rem)]', md: 'text-[6.2vw] md:text-[min(6vw,5.2rem)]' } as const;
const ACCENT_SIZE = { xl: 'text-[13vw] md:text-[min(10vw,8.4rem)]', lg: 'text-[10vw] md:text-[min(8.2vw,6.8rem)]', md: 'text-[8.5vw] md:text-[min(7.4vw,6.2rem)]' } as const;

export default function NamingHeroSection() {
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
      {/* Gradient orbs */}
      <div ref={orb1Ref} className="pointer-events-none absolute top-[15%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px] opacity-25" style={{ background: '#614aa2' }} />
      <div ref={orb2Ref} className="pointer-events-none absolute top-[40%] right-[5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-[140px] opacity-20" style={{ background: '#4e92d8' }} />
      <div ref={orb3Ref} className="pointer-events-none absolute bottom-[10%] left-[30%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full blur-[100px] opacity-15" style={{ background: '#614aa2' }} />

      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
        <span
          className="font-satoshi font-black text-[22vw] leading-none whitespace-nowrap"
          style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.04)' }}
        >
          NAME
        </span>
      </div>

      {/* Badge */}
      <div ref={badgeRef} className="relative z-10 flex justify-center">
        <span className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-white/35 font-satoshi border border-white/10 px-4 py-2 rounded-full">
          Identity / Naming
        </span>
      </div>

      {/* Headline */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-12 text-center">
        <div className="flex flex-col items-center gap-y-1 text-center">
          {HEAD.plain.map((line, i) => {
            const isLast = i === HEAD.plain.length - 1;
            return (
              <div key={line} className="overflow-hidden pb-[0.14em]">
                <span
                  ref={el => { wordRefs.current[i] = el; }}
                  className={`block font-satoshi font-black uppercase leading-[1.02] tracking-tight text-white ${PLAIN_SIZE[HEAD.size as keyof typeof PLAIN_SIZE]}`}
                >
                  {line}
                  {isLast && HEAD.inline && (
                    <>
                      {' '}
                      <span className="text-gradient font-playfair italic font-medium normal-case tracking-[-0.01em]">
                        {HEAD.accent}
                      </span>
                    </>
                  )}
                </span>
              </div>
            );
          })}
          {!HEAD.inline && (
            <div className="overflow-hidden pb-[0.22em]">
              <span
                ref={el => { wordRefs.current[HEAD.plain.length] = el; }}
                className={`block text-gradient font-playfair italic font-medium normal-case leading-[1.12] tracking-[-0.01em] pr-[0.06em] ${ACCENT_SIZE[HEAD.size as keyof typeof ACCENT_SIZE]}`}
              >
                {HEAD.accent}
              </span>
            </div>
          )}
        </div>

        <p ref={subRef} className="mt-8 max-w-xl font-jakarta font-medium text-lg md:text-xl text-white/30 leading-relaxed">
          Il nome è il primo racconto che un brand fa di sé.
        </p>
      </div>

      {/* Bottom CTA */}
      <div ref={ctaRef} className="relative z-10 flex items-center justify-center gap-6">
        <a
          href="#parliamone"
          className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden flex items-center justify-center transition-all duration-700"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#614aa2] to-[#4e92d8] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="relative z-10 font-satoshi text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-500">
            Parliamo del tuo progetto
          </span>
        </a>
      </div>
    </section>
  );
}
