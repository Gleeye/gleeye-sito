'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Landmark, Sparkles, ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const UNITS = [
  {
    icon: Landmark,
    name: 'Spicco',
    logo: '/brand/spicco-white.png',
    desc: 'Consulenza strategica per candidati e istituzioni: sintesi visiva, chiarezza del messaggio, gestione della reputazione in contesti elettorali.',
    accent: '#57b8ad',
    href: 'https://spicco.studio',
    external: true,
    cta: 'Visita spicco.studio',
  },
  {
    icon: Sparkles,
    name: 'Gleeye Events',
    logo: null,
    desc: "Presidio visivo degli eventi live: fiere, convention, lanci di prodotto. La messa a terra coerente con l'immagine boutique del brand.",
    accent: '#6db5ff',
    href: '/events',
    external: false,
    cta: 'Scopri gli eventi',
  },
];

export default function SpecialUnits() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const ctx = gsap.context(() => {
      gsap.from('.su-item', {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.su-grid', start: 'top 82%', once: true },
      });

      if (fine) {
        gsap.utils.toArray<HTMLElement>('.su-item', root).forEach((card) => {
          const onMove = (e: MouseEvent) => {
            const r = card.getBoundingClientRect();
            gsap.to(card, {
              rotateX: (e.clientY - r.top - r.height / 2) / 28,
              rotateY: (r.width / 2 - (e.clientX - r.left)) / 28,
              duration: 0.5,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          };
          const onLeave = () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
          };
          card.addEventListener('mousemove', onMove);
          card.addEventListener('mouseleave', onLeave);
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#f8f9fa] py-28 md:py-36">
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-14 md:mb-20">
          <h2 className="voice-display max-w-3xl text-4xl text-[#0a0a10] md:text-6xl">
            Divisioni <span className="text-gradient">verticali</span>
          </h2>
        </div>

        <div className="su-grid grid grid-cols-1 gap-6 [perspective:1200px] md:grid-cols-2">
          {UNITS.map((unit) => (
            <article
              key={unit.name}
              className="su-item group relative overflow-hidden rounded-[2rem] bg-[#0a0a10] p-8 text-[#f8f9fa] md:p-12"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-[90px] transition-opacity duration-700 group-hover:opacity-80"
                style={{ backgroundColor: unit.accent }}
              />
              <unit.icon
                className="pointer-events-none absolute -bottom-8 -right-8 h-48 w-48 opacity-[0.06]"
                strokeWidth={1}
                aria-hidden="true"
              />

              <div style={{ transform: 'translateZ(40px)' }}>
                {unit.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={unit.logo} alt={unit.name} className="mb-6 h-9 w-auto md:h-11" />
                ) : (
                  <>
                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/15">
                      <unit.icon className="h-5 w-5" style={{ color: unit.accent }} strokeWidth={1.6} />
                    </div>
                    <h3 className="voice-display mb-4 text-3xl md:text-4xl">{unit.name}</h3>
                  </>
                )}
                <p className="max-w-md font-jakarta text-sm font-medium leading-relaxed text-white/55 md:text-base">
                  {unit.desc}
                </p>
                {unit.external ? (
                  <a
                    href={unit.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 font-satoshi text-sm font-black uppercase tracking-wide transition-colors duration-300"
                    style={{ color: unit.accent }}
                  >
                    {unit.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  <Link
                    href={unit.href}
                    className="mt-7 inline-flex items-center gap-2 font-satoshi text-sm font-black uppercase tracking-wide transition-colors duration-300"
                    style={{ color: unit.accent }}
                  >
                    {unit.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
