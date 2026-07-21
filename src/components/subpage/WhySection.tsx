'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isTouchDevice } from '@/lib/isTouch';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type Reason = { label: string; body: string };

/**
 * "Perché noi" (sottopagine). Vive nella CARD galleggiante sopra lo sfondo
 * condiviso (DarkBand). Composizione laterale come la reference (AreaApproach):
 * etichetta verticale nel margine, contenuto spostato. Le ragioni come principi
 * (etichetta + sottolineatura in gradiente), senza numeri e in layout diverso
 * dalla sezione "Per chi".
 */
export default function WhySection({
  heading = 'Perché Gleeye',
  intro,
  reasons,
}: {
  heading?: string;
  intro: string;
  reasons: Reason[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Su touch niente reveal/pin: contenuto sempre visibile, scroll nativo.
    // (su iOS i trigger post-navigazione misurano male e lasciano tutto invisibile)
    if (isTouchDevice()) return;
    const ctx = gsap.context(() => {
      gsap.from('.why-head', {
        opacity: 0, y: 24, duration: 1, ease: 'power3.out', clearProps: 'transform',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.utils.toArray<HTMLElement>('.why-item').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative pb-12 pt-4 md:pb-16">
      {/* card near-full-width come la reference; contenuto spostato lateralmente */}
      <div
        className="relative mx-3 rounded-[2.5rem] border-t border-white/[0.08] bg-gradient-to-b from-[#0e1020] to-[#0a0a10] px-6 py-24 md:mx-6 md:px-12 md:py-32"
        style={{ boxShadow: '0 -30px 80px -40px rgba(97,74,162,0.25), inset 0 1px 0 rgba(255,255,255,0.06)' }}
      >
        <span
          className="voice-mono pointer-events-none absolute left-6 top-10 hidden text-white/25 md:block"
          style={{ writingMode: 'vertical-rl' }}
        >
          {heading}
        </span>

        <div className="md:ml-[14%] md:mr-[4%]">
          <div className="why-head max-w-3xl">
            <p
              className="text-[1.9rem] leading-[1.12] text-white md:text-4xl lg:text-[3rem]"
              style={{
                fontFamily: 'var(--font-playfair-next), Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
            >
              {intro}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-14 gap-y-12 md:mt-24 md:grid-cols-3">
            {reasons.map((r, i) => (
              <div key={i} className="why-item">
                <div
                  className="mb-5 h-[3px] w-10 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #4e92d8, #614aa2)' }}
                />
                <h3 className="mb-3 font-satoshi text-lg font-black uppercase leading-snug tracking-tight text-white">
                  {r.label}
                </h3>
                <p className="font-jakarta text-sm font-medium leading-relaxed text-white/45 md:text-base">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
