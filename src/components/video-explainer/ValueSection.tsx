'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ValueSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const items = [
        "Dimostrare l'impatto del tuo progetto per l'economia e la società",
        "Rafforzare la tua immagine di partner affidabile per clienti e stakeholder",
        "Mettere in evidenza le tue competenze e la tua capacità per attrarre risorse e talenti"
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(contentRef.current, { opacity: 0, y: 40 });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 75%",
                onEnter: () => {
                    gsap.to(contentRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out"
                    });
                },
                once: true
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#08080C] px-6 overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#3b82f6]/[0.03] blur-[120px]" />
            </div>

            <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto py-24 lg:py-32 border-t border-white/[0.04]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left: Title + Paragraph */}
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black font-satoshi tracking-tight leading-tight text-white">
                            Perché raccontare il tuo progetto è{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">fondamentale</span>
                        </h2>

                        <p className="text-base text-white/40 font-medium leading-relaxed max-w-md">
                            Hai realizzato qualcosa di unico. Hai portato innovazione, risolto problemi e generato un impatto concreto. Il valore di ciò che hai fatto merita di essere riconosciuto e condiviso, <span className="text-white/70 font-bold">non può rimanere invisibile.</span>
                        </p>
                    </div>

                    {/* Right: Benefits List */}
                    <div>
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/20 block mb-8">
                            Con il nostro Explainer video puoi:
                        </span>

                        <div className="space-y-8">
                            {items.map((text, index) => (
                                <div key={index} className="flex items-start gap-5 group">
                                    {/* Gradient check icon */}
                                    <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-base md:text-lg font-semibold text-white/60 leading-snug group-hover:text-white/90 transition-colors duration-400">
                                        {text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
