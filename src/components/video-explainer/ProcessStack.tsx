'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const iconPaths: Record<string, React.ReactNode> = {
    target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    pen: <><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l5 5" /><path d="M11 11l1 1" /></>,
    video: <><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></>,
    scissors: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
};

const steps = [
    { num: '01', title: 'Brief & Obiettivi', desc: 'Analisi iniziale (1-2 gg) per definire target e messaggio chiave.', icon: 'target' },
    { num: '02', title: 'Script & Storyboard', desc: 'Scrittura del copy strategico e visualizzazione (7 gg).', icon: 'pen' },
    { num: '03', title: 'Riprese', desc: 'Shooting professionale on-site o in studio (1 gg).', icon: 'video' },
    { num: '04', title: 'Montaggio e Grafica', desc: 'Editing, motion graphics e sound design (10-14 gg).', icon: 'scissors' },
    { num: '05', title: 'Revisione e Consegna', desc: 'Feedback finale e consegna master HD e Social (3-4 gg).', icon: 'rocket' },
];

export default function ProcessStack() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleProgress = useCallback((self: ScrollTrigger) => {
        const progress = self.progress;
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
                <div className="absolute top-[20%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#3b82f6]/[0.04] blur-[150px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#8b5cf6]/[0.04] blur-[150px]" />
            </div>

            <div className="h-screen flex flex-col justify-center relative z-10">
                {/* Header */}
                <div className="px-8 md:px-16 mb-12">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-satoshi tracking-tighter leading-[1] text-[#08080C]">
                        Un processo semplice.<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">Un risultato solido.</span>
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
                                        ? 'bg-gradient-to-br from-[#0c0e18] to-[#141628] text-white shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)] scale-[1.02]'
                                        : 'bg-white border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                                    }
                                `}
                                key={index}
                            >
                                {/* Active card glow */}
                                {isActive && (
                                    <div className="absolute inset-0 pointer-events-none transition-opacity duration-700">
                                        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#3b82f6]/20 blur-[80px]" />
                                        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#8b5cf6]/15 blur-[60px]" />
                                    </div>
                                )}

                                {/* Top section */}
                                <div className="relative z-10">
                                    {/* Step number + icon */}
                                    <div className="flex items-center justify-between mb-8">
                                        <span className={`text-5xl md:text-6xl font-black font-mono leading-none transition-all duration-700
                                            ${isActive
                                                ? 'bg-gradient-to-br from-[#3b82f6] to-[#ffffff] bg-clip-text text-transparent opacity-40'
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
                                                        <stop offset="0%" stopColor="#3b82f6" />
                                                        <stop offset="100%" stopColor="#8b5cf6" />
                                                    </linearGradient>
                                                    <linearGradient id="iconGradientActive" x1="0" y1="0" x2="24" y2="24">
                                                        <stop offset="0%" stopColor="#60a5fa" />
                                                        <stop offset="100%" stopColor="#ffffff" />
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
                                            ? 'w-20 bg-gradient-to-r from-[#3b82f6] to-[#ffffff]'
                                            : 'w-12 bg-black/[0.06]'
                                        }
                                    `} />
                                </div>

                                {/* Hover glow for inactive cards */}
                                {!isActive && (
                                    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#3b82f6]/5 blur-[40px]" />
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
