'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const gradientText = {
  backgroundImage: 'linear-gradient(90deg, #6db5ff, #9b7bff)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

export type ShowreelData = {
  /** etichetta mono in alto (opzionale) */
  eyebrow?: string;
  /** titolo: parte bianca + parte in gradiente (opzionale) */
  title?: { plain: string; accent: string };
  videoSrc: string;
  poster: string;
};

/**
 * Banda video full-bleed a tutto schermo (dark), pensata per un "caso reale"
 * dopo la sezione servizi. Video 16:9 edge-to-edge, autoplay solo in viewport.
 * Reveal solo in opacità (nessun transform → niente rischio di sfasamento).
 */
export default function ShowreelSection({ data }: { data: ShowreelData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.sub-reel-head', { opacity: 0, y: 22 });
      gsap.set('.sub-reel-media', { opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to('.sub-reel-head', { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' });
          gsap.to('.sub-reel-media', { opacity: 1, duration: 1.1, ease: 'power2.out', delay: 0.15 });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0a0a10]">
      {(data.eyebrow || data.title) && (
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-12 md:px-16 md:pb-16 md:pt-16">
          {data.eyebrow && (
            <span className="sub-reel-head font-satoshi block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              {data.eyebrow}
            </span>
          )}
          {data.title && (
            <h2 className="sub-reel-head mt-5 max-w-3xl font-satoshi text-3xl font-black uppercase leading-[1.05] tracking-tight text-white md:text-4xl lg:text-5xl">
              {data.title.plain}{' '}
              <span style={gradientText}>{data.title.accent}</span>
            </h2>
          )}
        </div>
      )}

      {/* video full-bleed edge-to-edge, 16:9 */}
      <div className="sub-reel-media relative z-10 w-full">
        <video
          ref={videoRef}
          className="block aspect-video w-full object-cover"
          src={data.videoSrc}
          poster={data.poster}
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}
