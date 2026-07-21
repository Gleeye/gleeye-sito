'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/* Testo in gradiente brand. backgroundImage, NON background: la shorthand
   azzera il background-clip e il gradiente riempirebbe il box come rettangolo. */
const gradientText = {
  backgroundImage: 'linear-gradient(90deg, #4e92d8, #614aa2)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

/**
 * "Il nostro approccio": la frase forte tiene la scena, il reel verticale
 * la interrompe entrando dal lato, due numeri danno peso. Il video vive qui
 * (non in una sezione a sé — sarebbe un doppione). Muto, in loop, parte in vista.
 */
export default function EventsPositioningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.epos-label', { opacity: 0, y: 16, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      // clearProps sugli elementi che CONTENGONO testo in gradiente: un
      // transform residuo rompe background-clip:text in Chrome (il gradiente
      // riempie il box invece del testo). Riguarda la frase e il numero "3".
      gsap.from('.epos-statement', { opacity: 0, y: 40, duration: 1.2, ease: 'power3.out', delay: 0.1, clearProps: 'transform', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.epos-reel', { opacity: 0, y: 60, duration: 1.2, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.epos-meta > *', { opacity: 0, y: 24, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.35, clearProps: 'transform', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
    }, sectionRef);

    // il video parte solo quando è in vista — niente sprechi di banda
    const video = videoRef.current;
    if (!video) return () => ctx.revert();
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FA] px-6 py-24 md:py-40">
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 flex items-start justify-between gap-10 md:mb-24">
          <span className="epos-label font-satoshi pt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-black/25">Il nostro approccio</span>
          <span className="epos-label font-satoshi hidden pt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 md:block">Comunicazione eventi · Genova</span>
        </div>

        {/* frase a sinistra, reel che entra da destra */}
        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[1fr_300px] md:gap-16 lg:grid-cols-[1fr_340px] lg:gap-20">
          <div>
            <h2 className="epos-statement font-satoshi text-[8vw] font-black uppercase leading-[0.98] tracking-tight text-black md:text-[4.5vw] lg:text-[3.8vw]">
              Un evento ben comunicato
              <br />
              vale il doppio.
              <span className="text-gradient mt-3 block w-fit pb-[0.08em] pr-[0.05em] font-playfair text-[9vw] font-medium italic normal-case leading-[1.08] tracking-[-0.01em] md:text-[5vw] lg:text-[4.2vw]">
                Uno comunicato male non vale niente.
              </span>
            </h2>

            {/* due numeri + testo */}
            <div className="epos-meta mt-12 border-t border-black/[0.1] pt-8">
              <div className="flex gap-10 md:gap-14">
                <div>
                  <div className="font-satoshi text-4xl font-black leading-none text-[#0a0a10] md:text-5xl">5</div>
                  <p className="mt-2 font-jakarta text-xs font-medium leading-snug text-black/50 md:text-sm">
                    discipline,
                    <br />
                    una sola regia
                  </p>
                </div>
                <div>
                  <div
                    className="font-satoshi text-4xl font-black leading-none md:text-5xl"
                    style={gradientText}
                  >
                    3
                  </div>
                  <p className="mt-2 font-jakarta text-xs font-medium leading-snug text-black/50 md:text-sm">
                    fasi presidiate:
                    <br />
                    prima, durante, dopo
                  </p>
                </div>
              </div>
              <p className="mt-8 max-w-md font-jakarta text-base font-medium leading-relaxed text-black/50 md:text-lg">
                Foto, video, grafica, media relation e digital in un unico studio, con
                un&apos;unica regia. Puoi affidarti a noi per la copertura totale o
                scegliere i singoli servizi di cui hai bisogno.
              </p>
            </div>
          </div>

          {/* reel verticale — full-bleed su mobile (sotto il testo), card a destra su desktop */}
          <div className="epos-reel -mx-6 w-[calc(100%+3rem)] md:mx-auto md:w-full md:max-w-[300px] md:-mt-2 lg:max-w-[340px]">
            <div className="relative aspect-[9/16] overflow-hidden bg-black md:rounded-[1.5rem] md:shadow-[0_20px_50px_-20px_rgba(10,10,16,0.4)]">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src="/video/reel-eventi.mp4"
                poster="/video/reel-eventi-poster.jpg"
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
