"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fingerprint, Smartphone, TvMinimalPlay } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CoreAreas() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const areas = [
        {
            title: "IDENTITY",
            subtitle: "Branding & Strategia",
            description: "Costruiamo le fondamenta della tua comunicazione: posizionamento e identità visiva per renderti autorevole e riconoscibile.",
            icon: Fingerprint
        },
        {
            title: "DIGITAL",
            subtitle: "Web & Social Marketing",
            description: "Gestiamo i tuoi canali digitali con soluzioni su misura: sviluppo web e strategia social per ottimizzare ogni punto di contatto.",
            icon: Smartphone
        },
        {
            title: "FACTORY",
            subtitle: "Content Creation",
            description: "Produciamo asset d’impatto: video, fotografia e copywriting professionale per dare sostanza al tuo messaggio.",
            icon: TvMinimalPlay
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter(Boolean);

            // Stato iniziale: più basso e invisibile
            gsap.set([titleRef.current, cards], { opacity: 0, y: 100 });

            // ENTRANCE ANIMATION (Staggered slide up)
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 80%",
                onEnter: () => {
                    const tl = gsap.timeline();
                    tl.to(titleRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "expo.out"
                    })
                        .to(cards, {
                            opacity: 1,
                            y: 0,
                            duration: 1.2,
                            stagger: 0.15,
                            ease: "expo.out"
                        }, "-=0.8");
                },
                once: true
            });

            // 3D TILT EFFECT & PARALLAX BACKGROUND
            cards.forEach((card) => {
                if (!card) return;

                const bgIcon = card.querySelector(".bg-watermark-icon");

                const onMouseMove = (e: MouseEvent) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    // Calculate rotation
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;

                    gsap.to(card, {
                        rotateX: rotateX,
                        rotateY: rotateY,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: "auto"
                    });

                    if (bgIcon) {
                        gsap.to(bgIcon, {
                            x: (x - centerX) / 8,
                            y: (y - centerY) / 8,
                            scale: 1.1,
                            rotate: -12,
                            duration: 0.7,
                            ease: "power2.out",
                            overwrite: "auto"
                        });
                    }
                };

                const onMouseLeave = () => {
                    gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.8,
                        ease: "elastic.out(1, 0.3)"
                    });
                    if (bgIcon) {
                        gsap.to(bgIcon, {
                            x: 0,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            duration: 0.8,
                            ease: "elastic.out(1, 0.3)"
                        });
                    }
                };

                card.addEventListener("mousemove", onMouseMove as any);
                card.addEventListener("mouseleave", onMouseLeave as any);
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#F8F9FA] py-24 md:py-32 px-6 xl:px-0 min-h-screen flex items-center overflow-hidden [perspective:1000px]">
            {/* SVG Gradient Definition */}
            <svg width="0" height="0" className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                <defs>
                    <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4e92d8" />
                        <stop offset="100%" stopColor="#614aa2" />
                    </linearGradient>
                </defs>
            </svg>

            {/* GENTLE ORGANIC BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#4e92d8]/10 blur-[150px]" />
                <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#614aa2]/10 blur-[150px]" />
            </div>

            <div className="relative z-10 w-full max-w-[85rem] mx-auto xl:px-12">
                {/* Header */}
                <div ref={titleRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20 md:mb-28">
                    <h2 className="text-[14vw] md:text-[6.5rem] font-black font-satoshi tracking-tighter leading-[0.8] text-[#08080C] m-0 shrink-0">
                        LE AREE <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4e92d8] to-[#614aa2] pr-2">
                            CORE.
                        </span>
                    </h2>

                    <div className="max-w-md md:pb-4 md:border-l-[1px] md:border-[#08080C]/10 md:pl-10">
                        <p className="text-lg text-[#08080C]/60 font-medium leading-relaxed tracking-tight italic">
                            Il nostro metodo nasce da una sola domanda: cosa serve davvero alla tua realtà? Non crediamo nelle soluzioni standard, ma nell'eccellenza sartoriale.
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                    {areas.map((area, index) => {
                        const Icon = area.icon;

                        return (
                            <div
                                key={index}
                                ref={(el) => { cardsRef.current[index] = el; }}
                                className="core-card group relative flex flex-col p-10 md:p-12 rounded-[3.5rem] bg-white border border-black/[0.03] shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_50px_100px_-20px_rgba(78,146,216,0.12)] transition-shadow duration-500 h-[500px] overflow-hidden cursor-pointer"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Background Watermark Icon */}
                                <div className="bg-watermark-icon absolute -right-16 -top-16 text-black/[0.02] group-hover:text-[#4e92d8]/[0.05] transition-colors duration-700 pointer-events-none z-0">
                                    <Icon className="w-64 h-64" strokeWidth={1} />
                                </div>

                                <div className="card-body relative z-10 flex flex-col h-full" style={{ transform: 'translateZ(60px)' }}>
                                    {/* Label */}
                                    <div className="mb-auto">
                                        <span className="inline-block text-[11px] font-black tracking-[0.25em] uppercase text-[#08080C]/40 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-[#4e92d8] via-[#614aa2] to-[#614aa2] transition-colors duration-500">
                                            {area.subtitle}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-6">
                                        <h3 className="text-5xl font-black font-satoshi tracking-tight text-[#08080C] group-hover:text-transparent bg-clip-text bg-gradient-to-r from-[#4e92d8] via-[#614aa2] to-[#614aa2] transition-colors duration-500">
                                            {area.title}
                                        </h3>

                                        <p className="text-[15px] text-[#08080C]/50 font-medium leading-[1.6] group-hover:text-[#08080C]/70 transition-colors duration-500">
                                            {area.description}
                                        </p>

                                        {/* Interactive Line -> Arrow (Traveling effect) */}
                                        <div className="mt-8 relative flex items-center w-[85%] h-[2px] cursor-pointer pointer-events-none z-10 ml-auto">
                                            {/* The Gradient Line that GROWS */}
                                            <div className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-transparent via-[#4e92d8] to-[#614aa2] group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]">
                                                {/* Arrowhead attached to the MOVING tip of the line */}
                                                <svg
                                                    className="absolute top-1/2 -translate-y-1/2 -right-[2px] w-auto h-[10px] text-[#614aa2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                                                >
                                                    <path d="M1 1l5 5-5 5" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
