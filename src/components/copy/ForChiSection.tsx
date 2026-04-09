'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const people = [
    {
        num: '01',
        title: 'Chi cerca le parole giuste.',
        desc: 'Imprenditori e professionisti che conoscono il valore di quello che fanno, ma non riescono a comunicarlo con la stessa efficacia. Sanno cosa vogliono dire — non sempre come dirlo.',
    },
    {
        num: '02',
        title: 'Chi vuole ridare lustro al proprio brand.',
        desc: 'Aziende che hanno una storia da raccontare ma una comunicazione che non la fa giustizia. Brand che vogliono rinnovarsi con strategie originali e un linguaggio che li rispecchi davvero.',
    },
    {
        num: '03',
        title: 'Chi ha bisogno di testi che lavorino per lui.',
        desc: 'Realtà che necessitano di testi per il sito, i social, le campagne, le brochure. Non parole qualsiasi — parole che fanno il loro lavoro anche quando non sei lì a spiegarle.',
    },
];

export default function ForChiSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.fchi-header',
                { opacity: 0, y: 24 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );
            gsap.fromTo('.fchi-item',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: 'power3.out',
                    scrollTrigger: { trigger: '.fchi-grid', start: 'top 82%' },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#07070f] py-24 md:py-36 px-[8%] overflow-hidden">

            {/* ambient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#4e92d8]/8 blur-[140px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#614aa2]/8 blur-[140px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* header */}
                <div className="fchi-header flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 md:mb-28">
                    <h2
                        className="font-black font-satoshi tracking-tighter uppercase text-white leading-[1.0]"
                        style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
                    >
                        Per tutti quelli<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4e92d8] to-[#614aa2]">
                            che…
                        </span>
                    </h2>
                    <p className="max-w-xs text-sm font-medium text-white/30 leading-relaxed border-l border-white/10 pl-6">
                        Non servono grandi budget o strutture complesse.
                        Serve avere qualcosa da dire — e volerlo dire bene.
                    </p>
                </div>

                {/* items */}
                <div className="fchi-grid flex flex-col divide-y divide-white/[0.06]">
                    {people.map((p, i) => (
                        <div
                            key={i}
                            className="fchi-item group flex flex-col md:flex-row gap-6 md:gap-16 py-10 md:py-14 hover:bg-white/[0.015] transition-colors duration-500 -mx-[8%] px-[8%] cursor-default"
                        >
                            {/* number */}
                            <span className="shrink-0 text-[10px] font-black tracking-[0.25em] text-white/20 font-mono mt-1.5 md:w-12">
                                {p.num}
                            </span>

                            {/* title + desc */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-20 flex-1 items-start md:items-baseline">
                                <h3
                                    className="shrink-0 font-black font-satoshi tracking-tighter text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#4e92d8] group-hover:to-[#614aa2] transition-all duration-500"
                                    style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', maxWidth: '22rem' }}
                                >
                                    {p.title}
                                </h3>
                                <p className="text-base font-medium text-white/35 leading-relaxed max-w-lg group-hover:text-white/50 transition-colors duration-500">
                                    {p.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
