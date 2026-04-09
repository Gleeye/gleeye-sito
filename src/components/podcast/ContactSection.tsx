'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const iframe = document.getElementById('gleeye-form-podcast-landing') as HTMLIFrameElement;

        const syncStyles = () => {
            if (!iframe || !iframe.contentWindow) return;
            const computed = window.getComputedStyle(document.body);
            const styles = {
                fontFamily: computed.fontFamily,
                textColor: computed.color,
                bgColor: computed.backgroundColor,
                primaryColor: computed.getPropertyValue('--primary-color') || computed.getPropertyValue('--brand-color') || null
            };
            iframe.contentWindow.postMessage({ type: 'apply_styles', styles }, '*');
        };

        const handleMessage = (e: MessageEvent) => {
            if (e.data.type === 'ready_for_styles') syncStyles();
            if (e.data.type === 'resize_iframe' && e.data.height && iframe) {
                iframe.style.height = `${e.data.height}px`;
            }
        };

        window.addEventListener('message', handleMessage);

        const ctx = gsap.context(() => {
            gsap.from(contentRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }, sectionRef);

        return () => {
            window.removeEventListener('message', handleMessage);
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} id="contact-form" className="relative py-20 md:py-32 px-6 bg-white overflow-hidden border-t border-black/5">
            <div className="relative z-10 w-full max-w-5xl mx-auto">
                <div ref={contentRef} className="space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-satoshi tracking-tighter leading-none text-[#08080C] uppercase">
                            PARLIAMO DEL TUO <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4e92d8] to-[#614aa2]">
                                PROGETTO PODCAST.
                            </span>
                        </h2>
                        <div className="flex justify-center">
                            <p className="text-sm md:text-base text-[#08080C]/50 font-bold max-w-2xl mx-auto uppercase tracking-widest border-l border-black/10 pl-4">
                                Dicci la tua idea. <br /> Al resto pensiamo noi.
                            </p>
                        </div>
                    </div>

                    <div className="relative rounded-[2.5rem] overflow-hidden bg-[#F8F9FA] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-2 md:p-6 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
                        <iframe
                            id="gleeye-form-podcast-landing"
                            src="http://localhost:8080/form.html?id=517d363a-dea8-47d1-ba6e-1acf22498b99"
                            width="100%"
                            height="600"
                            frameBorder="0"
                            className="w-full rounded-[1.5rem]"
                            style={{ border: 'none', background: 'transparent' }}
                        />
                    </div>
                </div>
            </div>

            {/* Background Orbs */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#4e92d8] blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#614aa2] blur-[120px]" />
            </div>
        </section>
    );
}
