'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { AreaConfig } from './data';
import { isTouchDevice } from '@/lib/isTouch';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Il nostro approccio": lo statement si illumina parola per parola mentre
 * scorri (scrub), poi due colonne di testo asimmetriche. Pattern preso dalla
 * pagina brand-strategy. Va dopo "Come lavoriamo", come continuazione del
 * metodo: la card galleggia, ma dietro corre lo stesso sfondo texturizzato
 * della sezione sopra (niente nero piatto attorno alla card).
 */
export default function AreaApproach({ area, bare = false }: { area: AreaConfig; bare?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Su touch niente reveal/pin: contenuto sempre visibile, scroll nativo.
    // (su iOS i trigger post-navigazione misurano male e lasciano tutto invisibile)
    if (isTouchDevice()) return;
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.aa-word', { opacity: 0.12 }, {
        opacity: 1, stagger: 0.05, ease: 'none',
        scrollTrigger: { trigger: '.aa-statement', start: 'top 72%', end: 'center 45%', scrub: 0.5 },
      });
      gsap.from('.aa-col', {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.aa-cols', start: 'top 82%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className={bare ? 'relative text-[#f8f9fa]' : 'relative overflow-hidden bg-[#0a0a10] text-[#f8f9fa]'}
    >
      {/* con bare lo sfondo continuo lo mette la fascia contenitore */}
      {!bare && (
        <>
          <div className="grain pointer-events-none absolute inset-0" />
          <div
            className="pointer-events-none absolute -left-40 top-1/3 h-[45vh] w-[45vh] rounded-full opacity-[0.12] blur-[150px]"
            style={{ backgroundColor: area.accent1 }}
          />
          <div
            className="pointer-events-none absolute -right-40 bottom-1/4 h-[40vh] w-[40vh] rounded-full opacity-[0.1] blur-[150px]"
            style={{ backgroundColor: area.accent2 }}
          />
        </>
      )}

      {/* la card arrotondata galleggia sopra lo sfondo continuo */}
      <div
        className="relative z-10 mx-3 my-12 rounded-[2.5rem] border-t border-white/[0.08] bg-gradient-to-b from-[#0e1020] to-[#0a0a10] px-5 py-24 md:mx-6 md:my-16 md:px-10 md:py-36"
        style={{ boxShadow: '0 -30px 80px -40px rgba(97,74,162,0.25), inset 0 1px 0 rgba(255,255,255,0.06)' }}
      >
        <span
          className="voice-mono pointer-events-none absolute left-6 top-10 hidden text-white/25 md:block"
          style={{ writingMode: 'vertical-rl' }}
        >
          Il nostro approccio
        </span>

        {/* Statement in Playfair Display corsivo (non maiuscolo), al posto del voice-display. */}
        <h2
          className="aa-statement max-w-4xl text-4xl leading-[1.06] md:ml-[14%] md:text-[3.75rem]"
          style={{
            fontFamily: 'var(--font-playfair-next), Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 500,
            letterSpacing: '-0.01em',
          }}
        >
          {/* ogni frase è un blocco: va a capo pulita su tutte le viste (niente
              inizio-frase orfano a fine riga); dentro, text-wrap:balance
              distribuisce le righe in modo uniforme, spezzando sulle virgole */}
          {area.approach.statement
            // "ogni volta" è un'unità: nbsp perché non si spezzi mai a fine riga
            .replace(/ogni volta/g, 'ogni volta')
            .split(/(?<=\.)\s+/)
            .map((sentence, si) => (
              <span
                key={si}
                className="block"
                style={{ textWrap: 'balance', marginTop: si > 0 ? '0.12em' : 0 }}
              >
                {sentence.split(' ').map((w, i) => (
                  <span key={`${si}-${i}`} className="aa-word inline-block" style={{ marginRight: '0.12em' }}>
                    {w}
                  </span>
                ))}
              </span>
            ))}
        </h2>

        <div className="aa-cols mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12">
          <p className="aa-col font-jakarta text-sm font-medium leading-relaxed text-white/55 md:col-span-4 md:col-start-2 md:text-base">
            {area.approach.body[0]}
          </p>
          <p className="aa-col font-jakarta text-sm font-medium leading-relaxed text-white/55 md:col-span-4 md:col-start-8 md:mt-20 md:text-base">
            {area.approach.body[1]}
          </p>
        </div>
      </div>
    </section>
  );
}
