"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Manifesto() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bgShapeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background Shape Parallax
            gsap.to(bgShapeRef.current, {
                y: -150,
                rotate: 15,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2
                }
            });

            // Title Animation: Asymmetric side reveals
            const lines = titleRef.current?.querySelectorAll(".title-line-inner");
            if (lines && lines.length >= 2) {
                // First line from right
                gsap.from(lines[0], {
                    x: 100,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                    }
                });
                // Second line from left
                gsap.from(lines[1], {
                    x: -100,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                    }
                });
            }

            // Paragraphs Fade In & Slide
            const paragraphs = contentRef.current?.querySelectorAll(".animate-p");
            if (paragraphs) {
                gsap.from(paragraphs, {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 85%",
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="manifesto" className="bg-[#08080C] text-white py-32 md:py-56 px-6 relative overflow-hidden">
            {/* Dynamic Personality Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />

                {/* Animated Depth Blob */}
                <div
                    ref={bgShapeRef}
                    className="absolute top-[20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#4e92d8]/30 to-[#614aa2]/30 blur-[150px] mix-blend-screen"
                />

                {/* Secondary Bottom Blob */}
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#4e92d8]/15 blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header: Più equilibrato e leggibile */}
                <div className="mb-12 md:mb-20 px-4 md:px-0">
                    <h2 ref={titleRef} className="text-[10vw] md:text-[7rem] font-black font-satoshi tracking-[-0.05em] md:tracking-[-0.06em] leading-[0.9] text-white">
                        <div className="py-2 md:pl-[8%] overflow-hidden px-4">
                            <span className="block title-line-inner">DALL’INTENZIONE</span>
                        </div>
                        <div className="py-2 overflow-hidden px-4">
                            <span className="block title-line-inner text-transparent bg-clip-text bg-gradient-to-r from-[#4e92d8] via-[#614aa2] to-[#4e92d8] bg-[length:200%_auto] animate-gradient-slow uppercase">
                                ALLA SOSTANZA.
                            </span>
                        </div>
                    </h2>
                </div>

                {/* Typographic Columns: Più vicine al titolo */}
                <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                    <div className="hidden md:block md:col-span-3" /> {/* Spacer per bilanciare lo shift */}

                    <div className="md:col-span-4 space-y-16">
                        <p className="animate-p text-xl md:text-2xl text-white font-medium leading-[1.3] tracking-tight">
                            Ogni necessità richiede una struttura capace di sostenerla. In Gleeye, presidiamo lo spazio che separa l’intenzione dal risultato.
                        </p>
                        <div className="animate-p">
                            <p className="text-xl md:text-2xl text-white/90 font-medium leading-[1.3] tracking-tight">
                                Perché un progetto ha valore solo quando smette di essere un discorso e diventa sostanza.
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-5 space-y-12">
                        <div className="space-y-10 group">
                            <p className="animate-p text-lg text-white/40 font-medium leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                                La creatività non è un’ispirazione estemporanea, ma un’intelligenza che risolve. Non separiamo mai la strategia dall’esecuzione: semplifichiamo i processi, diamo stabilità alla comunicazione e costruiamo asset che abbiano un peso reale.
                            </p>
                            <p className="animate-p text-lg text-white/40 font-medium leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                                Assorbiamo l’urto e l’imprevedibilità del percorso per lasciarti solo la solidità dei risultati, trasformando l’intuizione in un vantaggio competitivo concreto.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
