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

            gsap.fromTo('.ess-card',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: '.ess-cards-container',
                        start: "top 80%",
                    }
                }
            );

            // Subtle image floats
            gsap.to('.ess-img-top', {
                y: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "center top",
                    scrub: 1
                }
            });

            gsap.to('.ess-img-bottom', {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-12 md:py-24 relative bg-[#F8F9FA] overflow-hidden">
            <div
                ref={containerRef}
                className="w-[95%] max-w-[110rem] mx-auto bg-[#08080C] rounded-[3rem] md:rounded-[4rem] overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/[0.05]"
            >
                {/* 1. TOP SECTION (Conceptual Hero) */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-10 md:p-20 flex flex-col justify-center order-2 lg:order-1 relative z-10">
                        <span className="ess-reveal text-[10px] font-black tracking-[0.4em] text-[#3b82f6] uppercase mb-6">
                            Video Explainer Digitalizzazione
                        </span>
                        <h2 className="ess-reveal text-5xl md:text-7xl lg:text-7xl font-black font-satoshi text-white uppercase leading-[0.8] tracking-tighter">
                            IL VIDEO<br />
                            ADATTO<br />
                            <span className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
                                A OGNI SITUAZIONE.
                            </span>
                        </h2>
                        <div className="ess-reveal mt-8 flex items-center gap-4">
                            <p className="text-lg md:text-xl font-bold text-white/80 uppercase tracking-tight">
                                TRADUCI IL TUO VALORE COMPRENSOSIBILE.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[400px] md:h-auto min-h-[500px] order-1 lg:order-2 overflow-hidden bg-[#0a0a0f]">
                        {/* Moody Fades & Overlays to match Podcast style */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent z-10 lg:hidden" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#08080C] via-transparent to-transparent hidden lg:block z-10" />
                        <div className="absolute inset-0 z-0 bg-[#08080C]">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08080C]/30 to-[#08080C] z-1" />
                            <Image
                                src="/upload/video-production-set.png"
                                alt="Video Production Set Illustration"
                                fill
                                className="ess-img-top object-cover object-center opacity-70 mix-blend-screen saturate-[1.2]"
                            />
                            {/* Ambient Glows */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-[#3b82f6]/10 to-transparent blur-[120px] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* 2. MIDDLE SECTION (Strategic List) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 p-10 md:p-20">
                    {/* Left text: Conceptual Soul */}
                    <div className="space-y-8 max-w-lg ess-reveal">
                        <h3 className="text-2xl md:text-4xl font-black font-satoshi text-white leading-[1] tracking-tight">
                            Un asset strategico,<br />
                            costruito per <span className="text-white/40">trasformare il tuo business.</span>
                        </h3>
                        <p className="text-base font-bold text-white/90 leading-snug italic">
                            Non è solo un video. È la traduzione della tua innovazione in un formato che genera impatto immediato.
                        </p>
                        <p className="text-sm font-medium text-white/40 leading-relaxed">
                            Progettiamo ogni frame per essere un volano di crescita. Dalla digitalizzazione dei processi complessi al supporto front-end per la forza vendita: creiamo strumenti che rimangono, evolvono e convertono.
                        </p>
                    </div>

                    {/* Right list: The Core Pillars */}
                    <div className="ess-cards-container space-y-6">
                        <div className="mb-8">
                            <h4 className="text-xl font-bold text-white/60">Obiettivi concreti.</h4>
                            <p className="text-xl font-black text-white uppercase tracking-tight">I format che fanno la differenza.</p>
                        </div>

                        {/* List Item 1 */}
                        <div className="ess-card border border-white/5 bg-white/[0.02] p-6 lg:p-10 rounded-[2rem] flex items-start gap-8 hover:bg-white/[0.04] transition-all group duration-500">
                            <span className="text-[10px] font-mono text-[#3b82f6] font-bold uppercase shrink-0 pt-1 tracking-widest">/01</span>
                            <div>
                                <h5 className="text-lg font-black font-satoshi text-white mb-2 uppercase tracking-tight group-hover:text-[#3b82f6] transition-colors">Azienda Innovativa</h5>
                                <p className="text-sm font-medium text-white/40 leading-relaxed">
                                    Presentare l'azienda come innovativa e digitale. Spiega in modo chiaro che ora hai un vantaggio competitivo globale.
                                </p>
                            </div>
                        </div>

                        {/* List Item 2 */}
                        <div className="ess-card border border-white/5 bg-white/[0.02] p-6 lg:p-10 rounded-[2rem] flex items-start gap-8 hover:bg-white/[0.04] transition-all group duration-500">
                            <span className="text-[10px] font-mono text-[#3b82f6] font-bold uppercase shrink-0 pt-1 tracking-widest">/02</span>
                            <div>
                                <h5 className="text-lg font-black font-satoshi text-white mb-2 uppercase tracking-tight group-hover:text-[#3b82f6] transition-colors">Supporto alla vendita</h5>
                                <p className="text-sm font-medium text-white/40 leading-relaxed">
                                    Rafforza il processo commerciale usando contenuto che dimostra il valore reale delle tue soluzioni, senza barriere linguistiche o tecniche.
                                </p>
                            </div>
                        </div>

                        {/* List Item 3 */}
                        <div className="ess-card border border-white/5 bg-white/[0.02] p-6 lg:p-10 rounded-[2rem] flex items-start gap-8 hover:bg-white/[0.04] transition-all group duration-500">
                            <span className="text-[10px] font-mono text-[#3b82f6] font-bold uppercase shrink-0 pt-1 tracking-widest">/03</span>
                            <div>
                                <h5 className="text-lg font-black font-satoshi text-white mb-2 uppercase tracking-tight group-hover:text-[#3b82f6] transition-colors">Comunicazione tecnica</h5>
                                <p className="text-sm font-medium text-white/40 leading-relaxed">
                                    Panoramica chiara e immediata di prodotti e installazioni complesse per pubblici specifici, tecnici o istituzionali.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 3. BOTTOM SECTION (Impactful Asset) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-[400px] md:h-auto min-h-[400px] overflow-hidden bg-[#08080C] order-2 lg:order-1">
                        {/* Final Moody Fades */}
                        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-[#08080C] via-transparent to-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent z-10 lg:hidden" />

                        <div className="absolute inset-0 z-0 bg-[#08080C]">
                            <Image
                                src="/upload/video-final-product.png"
                                alt="Final Video Product Illustration"
                                fill
                                className="ess-img-bottom object-cover opacity-70 mix-blend-screen saturate-[1.2]"
                            />
                            {/* Ambient Purple Glow */}
                            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-radial from-[#8b5cf6]/10 to-transparent blur-[120px] pointer-events-none" />
                        </div>
                    </div>
                    <div className="p-10 md:p-20 flex flex-col justify-center items-start lg:items-end text-left lg:text-right relative z-10 overflow-hidden order-1 lg:order-2">
                        {/* subtle glow behind the text */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 w-[80%] h-[80%] bg-[#3b82f6]/10 blur-[120px] rounded-full pointer-events-none" />

                        <h2 className="ess-reveal text-3xl md:text-5xl lg:text-6xl font-black font-satoshi text-white uppercase leading-[0.85] tracking-tighter relative z-10">
                            Digitalizza<br />
                            IL TUO VALORE.<br />
                            <span className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
                                Al resto pensiamo noi.
                            </span>
                        </h2>
                        <div className="ess-reveal flex gap-5 mt-8 relative z-10">
                            {['Strategia', 'Identità', 'Conversione'].map((tag, i) => (
                                <span key={i} className="text-[10px] font-black uppercase text-white/25 tracking-[0.3em]">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
