'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ── SVG icon paths ── */
const iconPaths: Record<string, React.ReactNode> = {
    target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    lightbulb: <><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="14" x2="8" y2="14.01" /><line x1="12" y1="14" x2="12" y2="14.01" /><line x1="16" y1="14" x2="16" y2="14.01" /></>,
    mic: <><path d="M12 1a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></>,
    bolt: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>,
    scissors: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
    megaphone: <><path d="M3 11l18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>,
};

const steps = [
    { num: '01', title: 'Brief iniziale', desc: 'Obiettivi, tono, pubblico. Un confronto che mette le basi del tuo progetto.', icon: 'target' },
    { num: '02', title: 'Format e concept', desc: 'Scegliamo il format più adatto: titolo, copertina, descrizione.', icon: 'lightbulb' },
    { num: '03', title: 'Palinsesto', desc: 'Definiamo gli argomenti e la struttura narrativa degli episodi.', icon: 'calendar' },
    { num: '04', title: 'Guida alla voce', desc: 'Miglioriamo insieme ritmo, chiarezza e naturalezza del parlato.', icon: 'mic' },
    { num: '05', title: 'Registrazione', desc: 'Ogni volta registri con la nostra regia in call. Mai da solo.', icon: 'bolt' },
    { num: '06', title: 'Montaggio', desc: 'Editing professionale, sound design e sigla dedicata.', icon: 'scissors' },
    { num: '07', title: 'Distribuzione', desc: 'Upload su Spotify, Apple Podcast e le principali piattaforme.', icon: 'rocket' },
    { num: '08', title: 'Promozione', desc: 'Snippet e asset per condividere gli episodi con efficacia.', icon: 'megaphone' },
];

export default function ProcessStack() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleProgress = useCallback((self: ScrollTrigger) => {
        const progress = self.progress; // 0 → 1
        const idx = Math.floor(progress * steps.length);
        setActiveIndex(Math.min(idx, steps.length - 1));
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        let ctx = gsap.context(() => {
            const scrollWidth = track.scrollWidth;
            const windowWidth = window.innerWidth;
            const totalScroll = Math.max(0, scrollWidth - windowWidth + 120);

            gsap.to(track, {
                x: -totalScroll,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${totalScroll}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    onUpdate: handleProgress,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [handleProgress]);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#F8F9FA] overflow-hidden border-t border-black/[0.03]"
        >
            {/* Ambient light */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#4e92d8]/[0.04] blur-[150px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#614aa2]/[0.04] blur-[150px]" />
            </div>

            <div className="h-screen flex flex-col justify-center relative z-10">
                {/* Header */}
                <div className="px-8 md:px-16 mb-12">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-satoshi tracking-tighter leading-[1] text-[#08080C]">
                        Un processo semplice.<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4e92d8] to-[#614aa2]">Un risultato solido.</span>
                    </h2>
                </div>

                {/* Horizontal scrolling track */}
                <div
                    ref={trackRef}
                    className="flex gap-6 px-8 md:px-16 items-stretch will-change-transform"
                >
                    {steps.map((step, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <div
                                className={`process-card shrink-0 w-[320px] md:w-[380px] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group cursor-default transition-all duration-700 ease-out
                                    ${isActive
                                        ? 'bg-gradient-to-br from-[#0c0e18] to-[#141628] text-white shadow-[0_20px_60px_-15px_rgba(78,146,216,0.3)] scale-[1.02]'
                                        : 'bg-white border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                                    }
                                `}
                                key={index}
                            >
                                {/* Active card glow */}
                                {isActive && (
                                    <div className="absolute inset-0 pointer-events-none transition-opacity duration-700">
                                        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#4e92d8]/20 blur-[80px]" />
                                        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#614aa2]/15 blur-[60px]" />
                                    </div>
                                )}

                                {/* Top section */}
                                <div className="relative z-10">
                                    {/* Step number + icon */}
                                    <div className="flex items-center justify-between mb-8">
                                        <span className={`text-5xl md:text-6xl font-black font-mono leading-none transition-all duration-700
                                            ${isActive
                                                ? 'bg-gradient-to-br from-[#4e92d8] to-[#a78bfa] bg-clip-text text-transparent opacity-40'
                                                : 'text-black/[0.04]'
                                            }
                                        `}>
                                            {step.num}
                                        </span>
                                        <span className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`}>
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                                stroke={isActive ? "url(#iconGradientActive)" : "url(#iconGradientDefault)"}
                                                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                            >
                                                <defs>
                                                    <linearGradient id="iconGradientDefault" x1="0" y1="0" x2="24" y2="24">
                                                        <stop offset="0%" stopColor="#4e92d8" />
                                                        <stop offset="100%" stopColor="#614aa2" />
                                                    </linearGradient>
                                                    <linearGradient id="iconGradientActive" x1="0" y1="0" x2="24" y2="24">
                                                        <stop offset="0%" stopColor="#7bb8f0" />
                                                        <stop offset="100%" stopColor="#a78bfa" />
                                                    </linearGradient>
                                                </defs>
                                                {iconPaths[step.icon]}
                                            </svg>
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className={`text-xl md:text-2xl font-black font-satoshi tracking-tight mb-4 leading-snug transition-colors duration-700
                                        ${isActive ? 'text-white' : 'text-[#08080C]'}
                                    `}>
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className={`text-sm leading-relaxed font-medium transition-colors duration-700
                                        ${isActive ? 'text-white/50' : 'text-[#08080C]/40'}
                                    `}>
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Bottom accent line */}
                                <div className="mt-10 relative z-10">
                                    <div className={`h-[2px] rounded-full transition-all duration-700
                                        ${isActive
                                            ? 'w-20 bg-gradient-to-r from-[#4e92d8] to-[#a78bfa]'
                                            : 'w-12 bg-black/[0.06]'
                                        }
                                    `} />
                                </div>

                                {/* Hover glow for inactive cards */}
                                {!isActive && (
                                    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#4e92d8]/5 blur-[40px]" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
