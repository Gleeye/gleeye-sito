'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const faqs = [
    {
        q: "Che cos'è Video Explainer?",
        a: "È un servizio di produzione video creato per raccontare in modo rapido, chiaro e professionale i risultati ottenuti, mettendo in luce la strategia con cui l'azienda ha investito nella digitalizzazione."
    },
    {
        q: "A chi si rivolge?",
        a: "Si rivolge a imprese protagoniste del cambiamento, fornitori tecnologici che vogliono mostrare i risultati dei loro progetti, e organizzazioni che devono rendicontare investimenti verso stakeholder e finanziatori."
    },
    {
        q: "In quali contesti posso usare il video?",
        a: "Presentazioni aziendali, supporto alla forza vendita, pitch con investitori, stand in fiere, eventi di settore e campagne di comunicazione sui canali social professionali."
    },
    {
        q: "Cosa include il servizio?",
        a: "Include brief creativo, stesura dello script, riprese professionali, montaggio, color-correction, sound design e un round di revisione finale. Tutto pensato per un asset pronto all'uso."
    },
    {
        q: "Quanto tempo serve per la consegna?",
        a: "Circa 3-4 settimane dall'approvazione dello script. Il processo è rapido e strutturato: brief (2gg), script (7gg), riprese (1gg), montaggio e consegna (10-14gg)."
    },
    {
        q: "Cosa devo fornire?",
        a: "Logo in alta definizione, linee guida di brand, accesso alle location per le riprese e i nominativi delle persone da intervistare o coinvolgere nel racconto."
    },
    {
        q: "Potete integrare girato già esistente?",
        a: "Assolutamente sì. Se disponi di materiale d'archivio di buona qualità, possiamo integrarlo nel montaggio per arricchire la narrazione e ottimizzare i tempi di ripresa."
    },
    {
        q: "Come si avvia il progetto?",
        a: "Tutto inizia con il modulo qui sotto. Una volta inviato, riceverai il contratto pre-compilato e il link per fissare la call di onboarding. Zero frizioni, massima operatività."
    }
];

/* ── Single FAQ Item with measured height for fluid animation ── */
function FaqItem({ faq, index, openIndex, toggle }: {
    faq: { q: string; a: string };
    index: number;
    openIndex: number | null;
    toggle: (i: number) => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const isOpen = openIndex === index;

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [isOpen]);

    return (
        <div className="border-b border-black/[0.06] last:border-b-0">
            <button
                onClick={() => toggle(index)}
                className="w-full flex items-start justify-between gap-6 py-7 text-left group cursor-pointer"
            >
                <h3
                    className="text-base md:text-lg font-bold font-satoshi tracking-tight leading-snug transition-colors duration-300"
                    style={isOpen ? {
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    } : {}}
                >
                    <span className={isOpen ? '' : 'text-[#08080C] group-hover:text-[#08080C]/70 transition-colors duration-300'}>
                        {faq.q}
                    </span>
                </h3>
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 mt-1.5 transition-all duration-500 ease-out ${isOpen ? 'rotate-180' : ''}`}
                >
                    <defs>
                        <linearGradient id={`chevGrad-${index}`} x1="0" y1="0" x2="24" y2="24">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                    <polyline
                        points="6 9 12 15 18 9"
                        stroke={isOpen ? `url(#chevGrad-${index})` : '#08080C'}
                        className={isOpen ? '' : 'opacity-15 group-hover:opacity-30 transition-opacity duration-300'}
                    />
                </svg>
            </button>

            {/* Measured content wrapper for fluid height animation */}
            <div
                style={{
                    height: isOpen ? height : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: 'height 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                    overflow: 'hidden',
                }}
            >
                <div ref={contentRef} className="pb-7">
                    <p className="text-sm md:text-[15px] text-[#08080C]/50 font-medium leading-relaxed pr-10 whitespace-pre-line">
                        {faq.a}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = useCallback((i: number) => {
        setOpenIndex(prev => prev === i ? null : i);
    }, []);

    const mid = Math.ceil(faqs.length / 2);
    const leftCol = faqs.slice(0, mid);
    const rightCol = faqs.slice(mid);

    return (
        <section className="relative py-20 md:py-32 bg-[#F8F9FA] overflow-hidden">
            {/* Ambient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-[#3b82f6]/[0.03] blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-[#8b5cf6]/[0.03] blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-satoshi tracking-tighter leading-[1] text-[#08080C]">
                        Domande frequenti.
                    </h2>
                    <p className="text-base md:text-lg text-[#08080C]/40 font-medium mt-4 max-w-lg">
                        Le risposte a quello che probabilmente ti stai chiedendo.
                    </p>
                </div>

                {/* Two-column FAQ grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0">
                    <div className="flex flex-col">
                        {leftCol.map((faq, i) => (
                            <FaqItem key={i} faq={faq} index={i} openIndex={openIndex} toggle={toggle} />
                        ))}
                    </div>
                    <div className="flex flex-col">
                        {rightCol.map((faq, i) => (
                            <FaqItem key={i + mid} faq={faq} index={i + mid} openIndex={openIndex} toggle={toggle} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
