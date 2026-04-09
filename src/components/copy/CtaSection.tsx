'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CtaSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.cta-reveal',
                { opacity: 0, y: 32 },
                {
                    opacity: 1, y: 0, duration: 1.1, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#07070f] py-24 md:py-36 px-[8%] overflow-hidden border-t border-white/[0.04]"
        >
            {/* ambient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full bg-[#576ebd]/[0.07] blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

                {/* left — statement */}
                <div className="cta-reveal flex-1">
                    <span className="block text-[10px] font-black tracking-[0.28em] uppercase text-white/30 mb-6">
                        Inizia la tua storia
                    </span>
                    <h2
                        className="font-black font-satoshi tracking-tighter text-white leading-[1.0] uppercase"
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                    >
                        Parlaci<br />
                        del tuo progetto.<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4e92d8] to-[#614aa2]">
                            Al resto pensiamo noi.
                        </span>
                    </h2>
                </div>

                {/* right — cta block */}
                <div className="cta-reveal flex flex-col items-start md:items-end gap-6 shrink-0">
                    <p className="text-sm font-medium text-white/30 leading-relaxed max-w-xs text-left md:text-right">
                        Che tu stia cercando le parole giuste per il tuo sito, il tuo brand o la tua prossima campagna — il primo passo è una conversazione.
                    </p>

                    <a
                        href="mailto:info@gleeye.eu"
                        className="group relative px-10 py-5 bg-white text-black rounded-full overflow-hidden flex items-center gap-3 transition-all duration-700"
                    >
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{ backgroundImage: 'linear-gradient(130deg, #4e92d8, #614aa2)' }}
                        />
                        <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.22em] group-hover:text-white transition-colors duration-500 font-satoshi">
                            Contattaci subito
                        </span>
                        <svg
                            className="relative z-10 w-3 h-3 group-hover:translate-x-1 transition-transform duration-500 group-hover:[stroke:white]"
                            viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"
                        >
                            <path d="M2 6h8M6 2l4 4-4 4" />
                        </svg>
                    </a>

                    <div className="flex items-center gap-6 mt-2">
                        <a href="tel:+390100954533" className="text-[11px] font-mono text-white/25 hover:text-white/60 transition-colors duration-300 tracking-wider">
                            +39 010 09 54 533
                        </a>
                        <span className="w-px h-3 bg-white/10" />
                        <a href="mailto:info@gleeye.eu" className="text-[11px] font-mono text-white/25 hover:text-white/60 transition-colors duration-300 tracking-wider">
                            info@gleeye.eu
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
