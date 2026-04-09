'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const services = [
    {
        num: '01',
        title: 'Copy Strategy',
        tag: 'Il piano prima delle parole',
        desc: 'Creare contenuti di qualità è la grande sfida di qualsiasi azienda. Siamo con te dall\'ideazione alla pubblicazione: definiamo strategia editoriale, architettura del messaggio e piano contenuti costruito sulla tua identità.',
    },
    {
        num: '02',
        title: 'Copy Content',
        tag: 'Ogni formato, il tono giusto',
        desc: 'Sito web, email marketing, post social, slogan, brochure. Ogni canale ha le sue regole narrative — le conosciamo e le applichiamo con coerenza. Il tuo brand parla con una voce sola, su tutti i touchpoint.',
    },
    {
        num: '03',
        title: 'Blogging',
        tag: 'Autorevolezza nel tempo',
        desc: 'Articoli per il blog aziendale che conquistano nuovi clienti, fidelizzano quelli esistenti e costruiscono autorevolezza nel tuo settore. Contenuti che lavorano per te anche quando non lavori.',
    },
    {
        num: '04',
        title: 'Naming, Claim e Payoff',
        tag: 'L\'identità verbale del brand',
        desc: 'Ogni azienda necessita di un nome che racconti e tramandi una storia complessa in modo intuitivo. Il claim che posiziona. Il payoff che resta nella mente. L\'identità verbale costruita per durare.',
    },
];

export default function ServicesGrid() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.sg-header',
                { opacity: 0, y: 24 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );
            gsap.fromTo('.sg-card',
                { opacity: 0, y: 36 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: '.sg-grid', start: 'top 82%' },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#F5F3EE] py-24 md:py-36 px-[8%] overflow-hidden border-t border-black/5">

            {/* ambient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[5%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-[#4e92d8]/[0.05] blur-[130px]" />
                <div className="absolute bottom-[5%] left-[-5%] w-[35vw] h-[35vw] rounded-full bg-[#614aa2]/[0.05] blur-[130px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* header */}
                <div className="sg-header flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-20">
                    <h2
                        className="font-black font-satoshi tracking-tighter uppercase text-[#08080C] leading-[1.0]"
                        style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
                    >
                        I nostri servizi<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4e92d8] to-[#614aa2]">
                            di copywriting.
                        </span>
                    </h2>
                    <p className="max-w-xs text-sm font-medium text-[#08080C]/45 leading-relaxed border-l border-black/10 pl-6">
                        Per il tuo marketing, la tua identità verbale e ogni testo che rappresenta il tuo brand.
                    </p>
                </div>

                {/* 2×2 grid */}
                <div className="sg-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-black/[0.06]">
                    {services.map((svc, i) => (
                        <div
                            key={i}
                            className="sg-card group relative bg-[#F5F3EE] p-10 md:p-14 flex flex-col gap-6 hover:bg-white transition-colors duration-500 cursor-default overflow-hidden"
                        >
                            {/* number watermark */}
                            <span
                                className="absolute -right-4 -bottom-6 font-black font-mono text-[#08080C]/[0.04] leading-none select-none pointer-events-none group-hover:text-[#576ebd]/[0.06] transition-colors duration-500"
                                style={{ fontSize: 'clamp(5rem, 10vw, 9rem)' }}
                                aria-hidden
                            >
                                {svc.num}
                            </span>

                            {/* tag */}
                            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#08080C]/30 group-hover:text-[#576ebd] transition-colors duration-500">
                                {svc.tag}
                            </span>

                            {/* title */}
                            <h3
                                className="font-black font-satoshi tracking-tight text-[#08080C] leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#4e92d8] group-hover:to-[#614aa2] transition-all duration-500"
                                style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)' }}
                            >
                                {svc.title}
                            </h3>

                            {/* divider */}
                            <div className="w-10 h-px bg-black/10 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#4e92d8] group-hover:to-[#614aa2] transition-all duration-700 ease-out" />

                            {/* desc */}
                            <p className="text-sm md:text-base font-medium text-[#08080C]/45 leading-relaxed group-hover:text-[#08080C]/65 transition-colors duration-500 max-w-md">
                                {svc.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
