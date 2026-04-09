'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, Shield, Clock } from 'lucide-react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ValueSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const items = [
        {
            title: "POSIZIONAMENTO",
            subtitle: "Authority Building",
            desc: "Ti posiziona come voce autorevole. Per clienti e partner: il tuo podcast diventa un asset che parla per te.",
            icon: Shield
        },
        {
            title: "SEMPLICITÀ",
            subtitle: "Zero Complessità",
            desc: "È facile, ci siamo noi. Non serve esperienza né tempo extra. Ti accompagniamo in ogni fase.",
            icon: Mic
        },
        {
            title: "LONGEVITÀ",
            subtitle: "Evergreen Asset",
            desc: "Un contenuto evergreen. Non vive di like: si ascolta quando conta. E resta online per sempre.",
            icon: Clock
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter(Boolean);

            gsap.set([titleRef.current, cards], { opacity: 0, y: 50 });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 85%",
                onEnter: () => {
                    const tl = gsap.timeline();
                    tl.to(titleRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out"
                    })
                        .to(cards, {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            stagger: 0.1,
                            ease: "power3.out"
                        }, "-=0.7");
                },
                once: true
            });

            cards.forEach((card) => {
                if (!card) return;
                const bgIcon = card.querySelector(".bg-watermark-icon");

                const onMouseMove = (e: MouseEvent) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 30;
                    const rotateY = (centerX - x) / 30;

                    gsap.to(card, {
                        rotateX,
                        rotateY,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: "auto"
                    });

                    if (bgIcon) {
                        gsap.to(bgIcon, {
                            x: (x - centerX) / 12,
                            y: (y - centerY) / 12,
                            scale: 1.05,
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
                        ease: "elastic.out(1, 0.4)"
                    });
                    if (bgIcon) {
                        gsap.to(bgIcon, {
                            x: 0,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            ease: "elastic.out(1, 0.4)"
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
        <section ref={sectionRef} className="relative bg-[#F8F9FA] py-20 md:py-24 px-6 border-t border-black/5 overflow-hidden [perspective:1000px]">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#4e92d8]/10 blur-[120px]" />
                <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#614aa2]/10 blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <div ref={titleRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-satoshi tracking-tighter leading-none text-[#08080C] uppercase">
                        C&apos;È UN MODO NUOVO <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4e92d8] to-[#614aa2]">
                            DI RACCONTARE CHI SEI.
                        </span>
                    </h2>

                    <div className="max-w-sm md:pb-2 md:border-l-[1px] md:border-[#08080C]/10 md:pl-8">
                        <p className="text-base text-[#08080C]/50 font-medium leading-relaxed tracking-tight group cursor-default">
                            Il tuo podcast diventa un asset digitale che parla della tua autorevolezza ogni volta che qualcuno preme play. <span className="text-[#08080C] font-bold">E resta nel tempo.</span>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                ref={(el) => { cardsRef.current[index] = el; }}
                                className="core-card group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] bg-white border border-black/[0.03] shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 h-[380px] overflow-hidden cursor-pointer"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="bg-watermark-icon absolute -right-12 -top-12 text-black/[0.02] group-hover:text-[#4e92d8]/[0.03] transition-colors duration-700 pointer-events-none z-0">
                                    <Icon className="w-48 h-48" strokeWidth={1} />
                                </div>

                                <div className="card-body relative z-10 flex flex-col h-full" style={{ transform: 'translateZ(40px)' }}>
                                    <div className="mb-auto">
                                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#08080C]/30 group-hover:text-[#4e92d8] transition-colors duration-500">
                                            {item.subtitle}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-3xl md:text-4xl font-black font-satoshi tracking-tight text-[#08080C] group-hover:text-transparent bg-clip-text bg-gradient-to-r from-[#4e92d8] via-[#614aa2] to-[#614aa2] transition-colors duration-500 uppercase">
                                            {item.title}
                                        </h3>
                                        <p className="text-[14px] text-[#08080C]/40 font-medium leading-relaxed group-hover:text-[#08080C]/60 transition-colors duration-500">
                                            {item.desc}
                                        </p>
                                        <div className="mt-6 w-12 h-px bg-black/5 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#4e92d8] group-hover:to-[#614aa2] transition-all duration-700 ease-out" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
