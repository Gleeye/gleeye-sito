'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The hybrid model as an interactive diptych: hovering a soul expands it.
 * Boutique — ice, serif, quiet. Factory — ink, mono, industrial.
 */
export default function Duality() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<'boutique' | 'factory' | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from('.duo-head > *', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.duo-head', start: 'top 85%', once: true },
      });

      const panels = gsap.utils.toArray<HTMLElement>('.duo-panel', root);
      gsap.set(panels, { opacity: 0, y: 70 });
      ScrollTrigger.create({
        trigger: root,
        start: 'top 65%',
        once: true,
        onEnter: () =>
          gsap.to(panels, { opacity: 1, y: 0, stagger: 0.15, duration: 1.1, ease: 'power3.out', overwrite: 'auto' }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const flexFor = (side: 'boutique' | 'factory') => {
    if (!active) return 1;
    return active === side ? 1.7 : 0.75;
  };

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#f8f9fa] py-28 md:py-36">
      <div className="blueprint-ink absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="duo-head mb-14 md:mb-20">
          <p className="voice-mono mb-4 text-[#614aa2]">[ 03 — Il modello ibrido ]</p>
          <h2 className="voice-display max-w-4xl text-4xl text-[#0a0a10] md:text-6xl">
            Due anime, <span className="voice-serif normal-case text-[#4e92d8]">nessun</span> compromesso.
          </h2>
          <p className="mt-6 max-w-xl font-jakarta font-medium leading-relaxed text-black/55">
            La cura del dettaglio di una boutique. La potenza di fuoco di una factory.
            Gleeye risolve la tensione tra le due — tenendole insieme.
          </p>
        </div>

        <div className="duo-grid flex flex-col gap-5 md:h-[560px] md:flex-row">
          {/* ——— BOUTIQUE ——— */}
          <article
            className="duo-panel group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#0a0a10]/10 bg-white p-8 [transition:flex_0.7s_cubic-bezier(0.6,0.05,0.15,1)] md:p-12"
            style={{ flex: flexFor('boutique') }}
            onMouseEnter={() => setActive('boutique')}
            onMouseLeave={() => setActive(null)}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#e5dff2]/70 via-transparent to-[#dce9f7]/60 opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
            <span className="voice-serif pointer-events-none absolute -right-6 -top-16 select-none text-[16rem] text-[#614aa2]/[0.07]" aria-hidden="true">
              B
            </span>

            <div className="relative">
              <p className="voice-mono mb-6 text-[#614aa2]">L&apos;anima boutique</p>
              <h3 className="voice-serif text-5xl text-[#0a0a10] md:text-6xl">Il presidio di qualità</h3>
            </div>

            <div className="relative mt-10">
              <p className="max-w-md font-jakarta font-medium leading-relaxed text-black/55">
                Non esecutori: partner. Supervisione intellettuale, consulenza di
                direzione, la garanzia che ogni output sia coerente con la strategia
                di lungo periodo.
              </p>
              <ul className="mt-8 space-y-3">
                {['Supervisione intellettuale', 'Ufficio comunicazione esternalizzato', 'Coerenza garantita nel tempo'].map((li) => (
                  <li key={li} className="flex items-center gap-3 font-jakarta text-sm font-semibold text-[#0a0a10]/75">
                    <span className="h-1.5 w-1.5 rotate-45 bg-[#614aa2]" />
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* center seal */}
          <div className="relative z-10 mx-auto -my-8 flex h-16 w-16 shrink-0 items-center justify-center self-center md:-mx-10 md:my-0" aria-hidden="true">
            <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-[#0a0a10]/30" />
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0a0a10] font-satoshi text-lg font-black text-white shadow-xl">
              ×
            </div>
          </div>

          {/* ——— FACTORY ——— */}
          <article
            className="duo-panel group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-[#0a0a10] p-8 text-[#f8f9fa] [transition:flex_0.7s_cubic-bezier(0.6,0.05,0.15,1)] md:p-12"
            style={{ flex: flexFor('factory') }}
            onMouseEnter={() => setActive('factory')}
            onMouseLeave={() => setActive(null)}
          >
            <div className="blueprint pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#4e92d8]/25 blur-[100px] transition-opacity duration-700 group-hover:opacity-100" />
            <span className="voice-display pointer-events-none absolute -right-4 -top-14 select-none text-[15rem] text-white/[0.05]" aria-hidden="true">
              F
            </span>

            <div className="relative">
              <p className="voice-mono mb-6 text-[#6db5ff]">L&apos;anima factory</p>
              <h3 className="voice-display text-4xl md:text-5xl">
                L&apos;ingegneria
                <br />
                della creatività
              </h3>
            </div>

            <div className="relative mt-10">
              <p className="max-w-md font-jakarta font-medium leading-relaxed text-white/60">
                L&apos;esperienza trasformata in protocollo replicabile: tempi certi,
                qualità costante, anche su volumi elevati. L&apos;eccellenza smette di
                dipendere dall&apos;ispirazione del momento.
              </p>
              <ul className="mt-8 space-y-3">
                {['Protocollo operativo replicabile', 'Tempi certi, qualità costante', 'Scalabilità senza perdita di standard'].map((li) => (
                  <li key={li} className="flex items-center gap-3 font-jakarta text-sm font-semibold text-white/75">
                    <span className="h-1.5 w-1.5 rotate-45 bg-[#6db5ff]" />
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
