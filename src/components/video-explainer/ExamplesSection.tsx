'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ExamplesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#F8F9FA] py-16 md:py-24 px-6 border-t border-black/[0.03] overflow-hidden">
            <div className="relative z-10 w-full max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="mb-12 lg:mb-16 text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black font-satoshi tracking-tight text-[#08080C]">
                        Guarda i video che hanno <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">fatto la differenza</span>
                    </h2>
                </div>

                {/* Case Study Block */}
                <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                    {/* Text Column (5/12) */}
                    <div className="lg:col-span-5 space-y-6">
                        <h3 className="text-2xl md:text-3xl font-black font-satoshi text-[#08080C] tracking-tight leading-none">
                            Seac Sub
                        </h3>

                        <div className="space-y-4">
                            <p className="text-base md:text-lg text-[#08080C]/70 font-medium leading-relaxed">
                                Abbiamo raccontato la trasformazione di un'eccellenza italiana. Dalla digitalizzazione dei reparti produttivi all'impegno verso la sostenibilità: un percorso di innovazione che meritava di essere mostrato al mondo.
                            </p>
                        </div>
                    </div>

                    {/* Video Column (7/12) */}
                    <div className="lg:col-span-7">
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-black/[0.03] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                            <iframe
                                src="https://player.vimeo.com/video/1090117906?h=f1f0796f96&badge=0&autopause=0&player_id=0&app_id=58479"
                                className="absolute inset-0 w-full h-full"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                                title="Seac Sub Explainer"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
