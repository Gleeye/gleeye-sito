'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(contentRef.current, {
                opacity: 0,
                y: 30,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%"
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="contact-form" ref={sectionRef} className="py-24 bg-black px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#3b82f6]/20 blur-[150px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-white/5 blur-[150px]" />
            </div>

            <div ref={contentRef} className="max-w-5xl mx-auto relative z-10 text-center space-y-10">
                <div className="space-y-4">
                    <span className="text-[10px] font-black text-[#3b82f6] uppercase tracking-[0.4em]">Investment Ready</span>
                    <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black font-satoshi text-white tracking-tighter leading-none uppercase">
                        RACCONTA.<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-white to-white/30 pr-8">ORA.</span>
                    </h2>
                </div>

                <div className="flex flex-col items-center gap-8">
                    <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md max-w-lg w-full">
                        <p className="text-sm font-black text-white/40 uppercase tracking-[0.2em] mb-2">Prezzo Speciale Digitalizzazione</p>
                        <div className="text-5xl md:text-7xl font-black text-white font-satoshi">2.500€ <span className="text-xl md:text-2xl text-white/20">+ IVA</span></div>
                        <p className="text-[10px] text-white/20 mt-4 italic font-medium uppercase tracking-widest">* Esclusi costi di trasferta</p>
                    </div>

                    <a
                        href="mailto:info@gleeye.eu"
                        className="group relative px-14 py-6 bg-[#3b82f6] text-white rounded-full overflow-hidden flex items-center justify-center transition-all duration-700 hover:scale-105 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
                        <span className="relative z-10 text-[12px] font-black uppercase tracking-[0.3em]">Avvia il Progetto</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
