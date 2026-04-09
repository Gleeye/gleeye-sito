'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ManifestoSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.man-reveal',
                { opacity: 0, y: 32 },
                {
                    opacity: 1, y: 0, duration: 1.1, stagger: 0.14, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#F5F3EE] py-24 md:py-36 px-[8%] overflow-hidden">

            {/* giant background watermark */}
            <span
                className="pointer-events-none select-none absolute -right-[4%] top-1/2 -translate-y-1/2 font-black font-satoshi tracking-tighter uppercase leading-none text-[#08080C]/[0.025]"
                style={{ fontSize: 'clamp(8rem, 22vw, 22rem)' }}
                aria-hidden
            >
                WORDS
            </span>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* quote */}
                <div className="man-reveal mb-20 md:mb-28">
                    <blockquote className="border-l-2 border-[#576ebd] pl-8 md:pl-12">
                        <p
                            className="font-black font-satoshi tracking-tighter text-[#08080C] leading-[1.1]"
                            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' }}
                        >
                            &ldquo;Bisogna assomigliare<br className="hidden md:block" /> alle parole che si dicono.&rdquo;
                        </p>
                        <cite className="block mt-5 text-[11px] font-black tracking-[0.25em] uppercase text-[#08080C]/35 not-italic">
                            Stefano Benni
                        </cite>
                    </blockquote>
                </div>

                {/* two-column editorial body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* left — big statement */}
                    <div className="man-reveal lg:col-span-5">
                        <h2
                            className="font-black font-satoshi tracking-tighter uppercase text-[#08080C] leading-[1.0]"
                            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
                        >
                            Avete presente<br />
                            l&apos;albero che non fa<br />
                            rumore se cade dove<br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4e92d8] to-[#614aa2]">
                                non c&apos;è nessuno?
                            </span>
                        </h2>
                    </div>

                    {/* right — flowing text */}
                    <div className="man-reveal lg:col-span-7 flex flex-col gap-6 pt-2">
                        <p className="text-lg md:text-xl font-bold text-[#08080C] leading-snug tracking-tight">
                            Nel marketing vale lo stesso principio.
                        </p>
                        <div className="w-10 h-px bg-[#576ebd]/40" />
                        <p className="text-base md:text-lg font-medium text-[#08080C]/55 leading-relaxed">
                            Da una parte ci sono i fatti, dall&apos;altra le storie. Senza i primi,
                            non ci sarebbe molto da raccontare. Ma senza le seconde,
                            nessuno ascolterebbe.
                        </p>
                        <p className="text-base md:text-lg font-medium text-[#08080C]/55 leading-relaxed">
                            Anche nel marketing, tutto comincia con una storia — con protagonisti,
                            sfide, ostacoli e lezioni da imparare. Ogni azienda ha il suo stile,
                            la sua voce, la sua cifra identitaria.
                        </p>
                        <p className="text-base md:text-lg font-medium text-[#08080C]/55 leading-relaxed">
                            Rendere un&apos;impresa riconoscibile, impostandone vocabolario e tone of voice,
                            è un&apos;attività delicatissima. Non si improvvisa.
                            Svilupperemo assieme una strategia costruita su una narrazione efficace
                            — <strong className="text-[#08080C] font-bold">un&apos;esperienza di sartoria, su misura.</strong>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
