'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Showreel: il video parte da solo (muto, in loop) appena entra in vista.
 * Lo scroll comanda solo l'ingresso: la card si allarga fino a prendersi
 * tutto lo schermo. Sempre muto, senza controllo audio.
 */
export default function Showreel({ clips = [] }: { clips?: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasClips = clips.length > 0;

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!root || !frame) return;

    const ctx = gsap.context(() => {
      /* ingresso: da card a schermo pieno mentre la sezione entra */
      gsap.fromTo(frame,
        { scale: 0.62, borderRadius: '1.5rem' },
        {
          scale: 1,
          borderRadius: '0rem',
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 92%',
            end: 'top 8%',
            scrub: 0.4,
          },
        },
      );

      /* il video gira solo quando è in vista (risparmia banda e batteria) */
      if (video) {
        ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => video.play().catch(() => {}),
          onEnterBack: () => video.play().catch(() => {}),
          onLeave: () => video.pause(),
          onLeaveBack: () => video.pause(),
        });
      }
    }, root);

    return () => ctx.revert();
  }, [hasClips]);

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-[#f8f9fa] py-6 md:py-10">
      <div className="mx-auto flex min-h-[50vh] items-center justify-center md:min-h-[82vh]">
        <div ref={frameRef} className="relative aspect-video w-full max-w-[1600px] overflow-hidden bg-black will-change-transform">
          {/* Sempre muto: niente controllo audio, nessuno lo alzerebbe. */}
          {hasClips ? (
            <video
              ref={videoRef}
              src={clips[0]}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 90% 70% at 30% 60%, #2b2350 0%, transparent 60%), radial-gradient(ellipse 70% 80% at 75% 30%, #17324d 0%, transparent 55%), #05050a',
              }}
            />
          )}

          <div className="grain pointer-events-none absolute inset-0" />
        </div>
      </div>
    </div>
  );
}
