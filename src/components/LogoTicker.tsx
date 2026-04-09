"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LogoTickerProps {
    logos: string[];
}

export default function LogoTicker({ logos = [] }: LogoTickerProps) {
    const tickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ticker = tickerRef.current;
        if (!ticker || logos.length === 0) return;

        // Clone the logos for seamless scroll
        const totalWidth = ticker.scrollWidth;

        gsap.to(ticker, {
            x: `-${totalWidth / 2}px`,
            duration: 40,
            ease: "none",
            repeat: -1,
        });
    }, [logos]);

    if (!logos || logos.length === 0) return null;

    return (
        <section className="relative z-50 bg-black py-24 overflow-hidden w-full">
            <div className="w-full relative flex items-center bg-black">
                {/* Extreme Edge Fades - Total invisibility at the boundaries */}
                <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />

                <div
                    ref={tickerRef}
                    className="flex whitespace-nowrap gap-10 md:gap-14 items-center"
                >
                    {/* Triplicato per sicurezza su schermi ultra-wide e scorrimento fluido */}
                    {[...logos, ...logos, ...logos].map((logo, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center flex-shrink-0 transition-all duration-700 opacity-50 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0 px-4 md:px-6"
                        >
                            <img
                                src={`/api/loghi/${encodeURIComponent(logo)}`}
                                alt={`Client Logo ${index}`}
                                className="h-6 md:h-8 lg:h-10 w-auto max-w-[200px] object-contain filter drop-shadow-md"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
