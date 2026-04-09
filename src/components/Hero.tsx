"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const container = useRef<HTMLElement>(null);
    const title1Ref = useRef<HTMLDivElement>(null);
    const title2Ref = useRef<HTMLDivElement>(null);
    const title3Ref = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLDivElement>(null);
    const dramaRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // GSAP Staggered Animations
            tl.from(title1Ref.current, {
                y: 80,
                opacity: 0,
                skewY: 2,
                duration: 1.5,
                ease: "power4.out",
            }, 1.0)
                .from(title2Ref.current, {
                    y: 80,
                    opacity: 0,
                    skewY: 2,
                    duration: 1.5,
                    ease: "power4.out",
                }, 1.2)
                .from(title3Ref.current, {
                    y: 80,
                    opacity: 0,
                    skewY: 2,
                    duration: 1.5,
                    ease: "power4.out",
                }, 1.4)
                .from(tagRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 1.2,
                    ease: "power3.out",
                }, 1.6)
                .from(subRef.current, {
                    opacity: 0,
                    x: 20,
                    duration: 1.5,
                    ease: "power3.out",
                }, 1.8)
                .from(buttonsRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    ease: "power3.out",
                }, 1.9)
                .from(scrollRef.current, {
                    opacity: 0,
                    y: -20,
                    duration: 1.5,
                    ease: "power3.out",
                }, 2.7);

            // Infinite bounce for scroll indicator
            gsap.to(scrollRef.current, {
                y: 10,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "linear"
            });

            // Fade out on scroll
            gsap.to(scrollRef.current, {
                opacity: 0,
                y: -20,
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "100px top",
                    scrub: 1,
                }
            });

            // Dynamic Animated Blobs Background (More chaotic & 3D forward/backward)
            const blobs = document.querySelectorAll(".animated-blob");
            blobs.forEach((blob) => {
                gsap.to(blob, {
                    x: "random(-250, 250)",
                    y: "random(-250, 250)",
                    scale: "random(0.5, 2.8)", // Dramatic scale for Z-axis illusion (avanti e indietro)
                    rotation: "random(-180, 180)",
                    opacity: "random(0.2, 0.9)",
                    duration: "random(2.5, 6)", // Faster pace
                    ease: "power2.inOut",
                    repeat: -1,
                    yoyo: true,
                    repeatRefresh: true,
                });
            });

            // Magnetic Buttons Effect
            const magnets = document.querySelectorAll(".magnetic-item");
            magnets.forEach((magnet) => {
                const item = magnet as HTMLElement;
                item.addEventListener("mousemove", (e: MouseEvent) => {
                    const position = item.getBoundingClientRect();
                    const x = e.clientX - position.left - position.width / 2;
                    const y = e.clientY - position.top - position.height / 2;

                    gsap.to(item, {
                        x: x * 0.3,
                        y: y * 0.3,
                        duration: 0.6,
                        ease: "power3.out",
                    });
                });

                item.addEventListener("mouseleave", () => {
                    gsap.to(item, {
                        x: 0,
                        y: 0,
                        duration: 1,
                        ease: "elastic.out(1, 0.3)"
                    });
                });
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative h-[100dvh] w-full overflow-hidden bg-black px-6 sm:px-12 flex items-center">

            {/* 1. Deep Black Base & Floating Dynamic Orbs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black filter blur-[80px] opacity-70">
                <div className="animated-blob absolute top-[10%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-[#4e92d8] to-transparent mix-blend-screen" />
                <div className="animated-blob absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-[#614aa2] to-transparent mix-blend-screen" />
                <div className="animated-blob absolute top-[30%] right-[30%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-[#4e92d8] to-transparent mix-blend-screen" />
                <div className="animated-blob absolute bottom-[10%] left-[30%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-br from-[#614aa2] to-transparent mix-blend-screen" />
            </div>

            {/* Fade Out Edge - Eliminates completely any hard cut between Hero and LogoTicker */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

            {/* Scroll Indicator with Arrow */}
            <div ref={scrollRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
                <span className="tech-label text-[8px] text-white/30 uppercase tracking-[0.3em]">Scroll</span>
                <div className="flex flex-col items-center">
                    <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-white/10" />
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white/40 -mt-1"
                    >
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-center pt-20">

                {/* Layer 2: Main Content Block */}
                <div className="w-full flex flex-col items-start relative z-20">
                    {/* TAG */}
                    <div ref={tagRef} className="flex items-center mb-6 w-fit">
                        <span className="tech-label text-[10px] text-white/50 tracking-[0.2em] font-medium uppercase">
                            Comunicazione & marketing · Genova, operativi ovunque
                        </span>
                    </div>

                    {/* TITLES */}
                    <div className="flex flex-col items-start leading-[0.85] w-full">
                        <div className="overflow-hidden pb-1">
                            <div ref={title1Ref}>
                                <h1 className="text-[11vw] lg:text-[7.5rem] xl:text-[8.5rem] font-black tracking-[-0.05em] font-satoshi text-[#FFFFFF]">
                                    METODO.
                                </h1>
                            </div>
                        </div>
                        <div className="overflow-hidden pb-1">
                            <div ref={title2Ref}>
                                <h1 className="text-[11vw] lg:text-[7.5rem] xl:text-[8.5rem] font-black tracking-[-0.05em] font-satoshi text-[#FFFFFF]">
                                    VISIONE.
                                </h1>
                            </div>
                        </div>
                        <div className="overflow-visible pb-4">
                            <div ref={title3Ref}>
                                <h1 className="text-[11vw] lg:text-[7.5rem] xl:text-[8.5rem] font-black tracking-[-0.05em] font-satoshi text-[#FFFFFF] whitespace-nowrap leading-none">
                                    COMUNICAZIONE.
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* NEW ASYMMETRIC BOTTOM BAR */}
                    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 pt-12">

                        {/* LEFT: Buttons */}
                        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-4">
                            <Link href="#identity" className="magnetic-item group relative px-10 py-5 bg-[#FFFFFF] text-[#08080C] rounded-full overflow-hidden flex items-center justify-center min-w-[200px]">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#4e92d8] to-[#614aa2] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <span className="relative z-10 tech-label text-[10px] font-bold text-[#08080C] group-hover:text-[#FFFFFF] transition-colors duration-500">Scopri il metodo</span>
                            </Link>
                            <Link href="#contatti" className="magnetic-item group px-10 py-5 bg-transparent border border-[#FFFFFF]/30 hover:border-[#FFFFFF] text-[#FFFFFF] rounded-full transition-all duration-500 flex items-center justify-center min-w-[170px]">
                                <span className="tech-label text-[10px]">Parla con noi</span>
                            </Link>
                        </div>

                        {/* RIGHT: Refined Copy Block (Solid Line & Natural Flow) */}
                        <div ref={subRef} className="max-w-md flex items-stretch gap-6 md:gap-10">
                            {/* The Line: Dedicated div to ensure it doesn't 'cut' early */}
                            <div className="w-px bg-white/30" />
                            <div className="py-1">
                                <p className="text-base md:text-lg font-medium text-white/40 leading-relaxed tracking-tight">
                                    Soluzioni di comunicazione e marketing per far crescere la tua attività. Il nostro metodo nasce da una sola domanda: cosa serve davvero?
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
