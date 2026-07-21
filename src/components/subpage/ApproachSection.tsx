'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const gradientText = {
  backgroundImage: 'linear-gradient(90deg, #614aa2, #4e92d8)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

export type ApproachData = {
  /** etichetta in alto a destra, es. "Web Design & Dev · Genova" */
  eyebrowRight: string;
  /** frase forte: parte nera + parte in gradiente */
  statement: { plain: string; accent: string };
  /** due paragrafi sotto la linea */
  body: [string, string];
  /**
   * Video reale della pagina. Se presente prende il posto del reel: essendo
   * orizzontale (16:9) sta a destra e sborda oltre il bordo destro dello
   * schermo (tagliato dal limite). Se assente resta il placeholder verticale.
   */
  video?: { src: string; poster: string };
};

/**
 * "Il nostro approccio" (sottopagine). Testi a sinistra, visual a destra.
 * Con `video`: reel orizzontale che sborda oltre il bordo destro (clip del
 * viewport) — dinamico, editoriale. Senza: reel verticale placeholder.
 */
export default function ApproachSection({ data }: { data: ApproachData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = !!data.video;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // stato iniziale (mai animare il transform di .sub-pos-media: su desktop
      // porta il -translate-y-1/2 di centratura → solo opacità)
      gsap.set('.sub-pos-label, .sub-pos-body', { opacity: 0, y: 20 });
      gsap.set('.sub-pos-statement', { opacity: 0, y: 40 });
      // reveal del video solo in opacità (sul wrapper): nessun transform sulla
      // cornice → il full-bleed resta pieno anche se il reveal non parte
      gsap.set('.sub-pos-media', { opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.sub-pos-label', { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out' });
          // clearProps: la frase è in gradiente, un transform residuo romperebbe
          // background-clip:text in Chrome
          gsap.to('.sub-pos-statement', { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.1, clearProps: 'transform' });
          gsap.to('.sub-pos-body', { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.3, ease: 'power3.out' });
          gsap.to('.sub-pos-media', { opacity: 1, duration: 1.1, ease: 'power2.out', delay: 0.1 });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Autoplay del video solo quando entra in viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const statement = (
    <h2 className="sub-pos-statement font-satoshi text-[8vw] font-black leading-[1.06] tracking-tight text-black md:text-[3.6vw] lg:text-[3vw]">
      {data.statement.plain}
      <span className="mt-2 block pb-[0.14em]" style={gradientText}>
        {data.statement.accent}
      </span>
    </h2>
  );

  const eyebrow = (
    <div className="mb-16 flex items-start justify-between gap-10 md:mb-24">
      <span className="sub-pos-label font-satoshi pt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-black/25">
        Il nostro approccio
      </span>
      <span className="sub-pos-label font-satoshi hidden pt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-black/25 md:block">
        {data.eyebrowRight}
      </span>
    </div>
  );

  if (hasVideo) {
    return (
      <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#F8F9FA] py-24 md:py-36">
        <div className="pointer-events-none absolute right-[8%] top-1/2 h-[36vw] w-[36vw] -translate-y-1/2 rounded-full bg-[#4e92d8]/[0.06] blur-[150px]" />

        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <div className="grid items-center gap-14 lg:min-h-[27rem] lg:grid-cols-[minmax(0,42%)_1fr]">
            {/* TESTI a sinistra */}
            <div className="relative z-10">
              {statement}
              <div className="mt-10 flex flex-col gap-8 border-t border-black/10 pt-8 md:mt-12">
                <p className="sub-pos-body font-jakarta text-base font-medium leading-relaxed text-black/50 md:text-lg">
                  {data.body[0]}
                </p>
                <p className="sub-pos-body font-jakarta text-base font-medium leading-relaxed text-black/50 md:text-lg">
                  {data.body[1]}
                </p>
              </div>
            </div>
            {/* colonna destra: spazio riservato (solo desktop, il video è assoluto sul viewport) */}
            <div aria-hidden className="hidden lg:block" />
          </div>
        </div>

        {/*
          MOBILE + TABLET (< lg): video a schermo intero, edge-to-edge, impilato sotto il testo.
          DESKTOP (>= lg): ancorato al bordo destro del VIEWPORT, sborda oltre il limite.
        */}
        <div className="sub-pos-media relative mt-14 w-full will-change-[opacity] lg:absolute lg:right-[-4vw] lg:top-1/2 lg:mt-0 lg:w-[54vw] lg:-translate-y-1/2 xl:right-[-3vw] xl:w-[52vw]">
          <span className="pointer-events-none absolute -left-1 top-1/2 hidden origin-center -translate-y-1/2 -rotate-90 whitespace-nowrap font-satoshi text-[10px] font-bold uppercase tracking-[0.3em] text-black/25 lg:block">
            Reel · loghi
          </span>

          <div className="sub-pos-frame relative overflow-hidden rounded-none bg-white shadow-[0_40px_100px_-45px_rgba(10,10,16,0.45)] ring-1 ring-black/[0.06] will-change-transform lg:rounded-l-[1.75rem]">
            <video
              ref={videoRef}
              className="block aspect-video w-full object-cover"
              src={data.video!.src}
              poster={data.video!.poster}
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="w-full bg-[#F8F9FA] px-6 py-24 md:py-40">
      <div className="mx-auto max-w-7xl">
        {eyebrow}

        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[1fr_300px] md:gap-16 lg:grid-cols-[1fr_340px] lg:gap-20">
          <div className="order-2 md:order-1">
            {statement}
            <div className="mt-12 grid grid-cols-1 gap-10 border-t border-black/10 pt-8 md:grid-cols-2 md:gap-14">
              <p className="sub-pos-body font-jakarta text-base font-medium leading-relaxed text-black/50 md:text-lg">
                {data.body[0]}
              </p>
              <p className="sub-pos-body font-jakarta text-base font-medium leading-relaxed text-black/50 md:text-lg">
                {data.body[1]}
              </p>
            </div>
          </div>

          <div className="sub-pos-media order-1 mx-auto w-full max-w-[300px] md:order-2 md:-mt-2 lg:max-w-[340px]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-[#0a0a10] shadow-[0_20px_50px_-20px_rgba(10,10,16,0.4)]">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4e92d8]/25 blur-[70px]" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#614aa2]/25 blur-[70px]" />
              <div className="grain pointer-events-none absolute inset-0" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur">
                  <Play className="h-5 w-5 translate-x-[1px] text-white/80" fill="currentColor" />
                </span>
                <span className="font-satoshi text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                  Reel · presto
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
