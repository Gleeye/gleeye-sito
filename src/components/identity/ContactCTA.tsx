'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function IdentityContactCTA() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start:   'top 75%',
                    once:    true,
                },
            });
            tl
                .from('.cta-label', {
                    opacity: 0, x: -20, duration: 0.8, ease: 'power3.out',
                })
                .from('.cta-headline', {
                    y: '108%', duration: 1.3, stagger: 0.15, ease: 'power4.out',
                }, '-=0.5')
                .from('.cta-body', {
                    opacity: 0, y: 24, duration: 1.0, ease: 'power3.out',
                }, '-=0.8')
                .from('.cta-button', {
                    opacity: 0, y: 20, scale: 0.96, duration: 0.9, ease: 'back.out(1.4)',
                }, '-=0.7');
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-black overflow-hidden py-28 md:py-40 px-6"
        >
            {/* Ambient glow */}
            <div
                className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full blur-[160px] opacity-[0.12] pointer-events-none"
                style={{ backgroundColor: '#614aa2' }}
            />
            <div
                className="absolute top-0 right-1/4 w-[400px] h-[250px] rounded-full blur-[140px] opacity-[0.08] pointer-events-none"
                style={{ backgroundColor: '#4e92d8' }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-end">

                    {/* Left — big headline */}
                    <div>
                        <div className="cta-label flex items-center gap-3 mb-10">
                            <div className="w-5 h-px bg-[#4e92d8]/40" />
                            <span className="text-[10px] font-black tracking-[0.32em] uppercase text-[#4e92d8]/70 font-satoshi">
                                Inizia il percorso
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight font-satoshi text-white leading-none mb-0">
                            {['Pronto a scoprire', 'chi sei', 'davvero?'].map((line, i) => (
                                <span key={i} className="block overflow-hidden">
                                    <span className="cta-headline inline-block">
                                        {line === 'chi sei' ? (
                                            <span
                                                className="bg-clip-text text-transparent"
                                                style={{ backgroundImage: 'linear-gradient(130deg, #4e92d8, #614aa2)' }}
                                            >
                                                {line}
                                            </span>
                                        ) : line}
                                    </span>
                                </span>
                            ))}
                        </h2>
                    </div>

                    {/* Right — copy + CTA */}
                    <div className="cta-body flex flex-col gap-10">
                        <p className="text-base md:text-lg font-medium font-jakarta text-white/38 leading-relaxed max-w-md">
                            Ogni percorso Identity parte da una{' '}
                            <span className="text-white/65">Brand Discovery session</span>{' '}
                            — un incontro di due ore per capire dove sei e dove vuoi arrivare.
                            Senza impegni. Con tutta la chiarezza.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Primary CTA */}
                            <Link
                                href="/contatti"
                                className="cta-button group relative px-9 py-5 rounded-full overflow-hidden flex items-center justify-center gap-3 font-satoshi"
                                style={{ backgroundImage: 'linear-gradient(130deg, #4e92d8, #614aa2)' }}
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white">
                                    Prenota una consulenza
                                </span>
                                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-400" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M2 6h8M6 2l4 4-4 4" />
                                </svg>
                            </Link>

                            {/* Secondary CTA */}
                            <Link
                                href="/contatti"
                                className="cta-button group px-9 py-5 rounded-full border border-white/15 flex items-center justify-center gap-3 hover:border-white/35 transition-colors duration-400 font-satoshi"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/60 group-hover:text-white/90 transition-colors duration-400">
                                    Scrivici
                                </span>
                            </Link>
                        </div>

                        {/* Trust signal */}
                        <p className="text-[11px] text-white/20 font-jakarta tracking-wide">
                            Prima consulenza gratuita. Nessun template preconfezionato.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
