'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function EssenceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );

            gsap.fromTo('.ess-reveal',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                    }
                }
            );

            gsap.fromTo('.ess-step',
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: '.ess-steps',
                        start: "top 80%",
                    }
                }
            );

            // Gentle float
            gsap.to('.ess-float-1', {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
            gsap.to('.ess-float-2', {
                y: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: '.ess-closer',
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const feather = {
        maskImage: 'radial-gradient(ellipse 75% 80% at center, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 80% at center, black 20%, transparent 100%)',
    } as React.CSSProperties;

    return (
        <section ref={sectionRef} className="py-12 md:py-20 relative bg-[#F8F9FA] overflow-hidden">

            <div
                ref={containerRef}
                className="w-[95%] max-w-[110rem] mx-auto bg-[#08080C] rounded-[3rem] md:rounded-[4rem] overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
            >

                {/* ===== TOP HERO ===== */}
                <div className="relative min-h-[500px] md:min-h-[600px] overflow-hidden flex items-end">

                    {/* Portrait image — oversized container to kill borders once and for all */}
                    <div
                        className="ess-float-1 absolute -top-32 right-[-20%] md:right-[0%] lg:right-[5%] z-0 pointer-events-none w-[900px] h-[1000px] flex items-center justify-center"
                        style={{
                            maskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)',
                            WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)',
                        }}
                    >
                        <Image
                            src="/upload/podcast-registrazione.webp"
                            alt="Background Gear"
                            width={1024}
                            height={1536}
                            className="h-[80%] w-auto opacity-80 object-contain"
                        />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-[#08080C] via-[#08080C]/50 to-transparent z-1" />

                    <div className="relative z-10 w-full px-8 md:px-20 pb-14 md:pb-20">
                        <div className="ess-reveal max-w-2xl">
                            <span className="text-xs font-black tracking-[0.3em] text-[#4e92d8] uppercase block mb-5">Podcast da Remoto Essential</span>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-satoshi tracking-tighter leading-[0.85] text-white uppercase mb-6">
                                HAI QUALCOSA <br />
                                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#4e92d8] via-[#a78bfa] to-[#614aa2] pr-6">DA DIRE?</span>
                            </h2>
                            <div className="flex items-center gap-5 mt-8">
                                <span className="w-16 h-[1px] bg-gradient-to-r from-[#4e92d8] to-transparent" />
                                <p className="text-lg md:text-2xl font-black font-satoshi tracking-tight text-white/90">
                                    TI AIUTIAMO A FARLO BENE.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== CONTENT ZONE ===== */}
                <div className="relative z-10 px-8 md:px-20 py-10 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Format Otto - Editorial Narrative (Left) */}
                    <div className="ess-reveal lg:col-span-6 flex flex-col justify-start">
                        <div className="max-w-xl">
                            <h3 className="text-3xl md:text-5xl font-black font-satoshi tracking-tighter text-white leading-[1.1] mb-8">
                                Un punto di partenza solido, <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">costruito per crescere.</span>
                            </h3>

                            <div className="space-y-6">
                                <p className="text-lg md:text-xl font-bold tracking-tight text-white leading-snug">
                                    Il percorso ideale per chi vuole lanciare un podcast con metodo, struttura e un risultato professionale.
                                </p>

                                <div className="w-12 h-[1px] bg-white/20" />

                                <p className="text-base text-white/50 font-medium leading-relaxed">
                                    Otto puntate che ti permettono di prendere ritmo, definire la tua voce e testare il potenziale del tuo format. E se il progetto funziona, puoi continuare: una nuova stagione, altri episodi, un&apos;evoluzione naturale.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 3 Steps - Technical Specifications (Right) */}
                    <div className="ess-steps lg:col-span-6 flex flex-col">
                        <div className="mb-10">
                            <h3 className="text-xl md:text-2xl font-black font-satoshi tracking-tight text-white/90">
                                Tutto quello che ti serve.
                            </h3>
                            <p className="text-xl md:text-2xl font-black font-satoshi tracking-tight text-white/90 mt-1">
                                Niente che ti complichi la vita.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {[
                                { num: "/01", title: "Definizione", desc: "Ci racconti chi sei e cosa vuoi comunicare. Insieme definiamo formato, tono e strumenti." },
                                { num: "/02", title: "Registrazione", desc: "Ti aiutiamo a preparare le puntate e registri con il nostro supporto in call." },
                                { num: "/03", title: "Post-produzione", desc: "Poi pensiamo noi al montaggio, al sound design e alla pubblicazione." }
                            ].map((step, i) => (
                                <div key={i} className="ess-step group flex gap-5 p-6 rounded-[1.5rem] bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-500 cursor-default">
                                    <span className="text-[10px] font-black shrink-0 mt-1 text-white/20">
                                        {step.num}
                                    </span>
                                    <div>
                                        <h4 className="text-sm font-black font-satoshi tracking-tight mb-1 text-white/90 group-hover:text-white transition-colors duration-500">
                                            {step.title}
                                        </h4>
                                        <p className="text-[12px] font-medium leading-relaxed text-white/30 group-hover:text-white/50 transition-colors duration-500">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ===== BOTTOM CLOSER ===== */}
                <div className="ess-closer relative min-h-[350px] md:min-h-[400px] overflow-hidden flex items-center">

                    {/* Landscape image — oversized container to kill borders once and for all */}
                    <div
                        className="ess-float-2 absolute -bottom-32 -left-32 md:left-[-10%] z-0 pointer-events-none w-[1000px] h-[800px] flex items-center justify-center"
                        style={{
                            maskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)',
                            WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)',
                        }}
                    >
                        <Image
                            src="/upload/servizio-podcast-remoto-1.webp"
                            alt="Background Remote gear"
                            width={1024}
                            height={576}
                            className="w-[80%] h-auto opacity-70 object-contain"
                        />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-l from-[#08080C] via-[#08080C]/40 to-transparent z-1" />

                    <div className="relative z-10 w-full px-8 md:px-20 py-14">
                        <div className="ess-reveal text-right max-w-4xl ml-auto">
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black font-satoshi text-white uppercase leading-[0.9] mb-6">
                                Registri da remoto.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4e92d8] to-[#a78bfa]">Al resto pensiamo noi.</span>
                            </h3>
                            <div className="flex justify-end gap-5">
                                {['Regia Live', 'Editing HQ', 'Distribution'].map((tag, i) => (
                                    <span key={i} className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
