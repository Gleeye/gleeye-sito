'use client';

import { useEffect, useRef } from 'react';

export default function Contact() {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const syncStyles = () => {
            const iframe = iframeRef.current;
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
            if (e.data.type === 'resize_iframe' && e.data.height && iframeRef.current) {
                iframeRef.current.style.height = `${e.data.height}px`;
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <section id="contatti" className="bg-background py-32 md:py-64 px-6 border-t border-black/5 relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-32 items-start relative z-10">
                <div className="lg:w-1/2 space-y-20">
                    <div className="space-y-8">
                        <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-accent-blue">Contact</span>
                        <h2 className="text-[10vw] lg:text-8xl font-black font-satoshi tracking-tighter text-foreground leading-[0.8]">
                            COSA SERVE <br /> <span className="text-foreground/20">DAVVERO?</span>
                        </h2>
                        <p className="text-2xl md:text-3xl text-foreground/50 font-medium leading-tight max-w-md">
                            Iniziamo una conversazione. Raccontaci la tua sfida: noi ci occuperemo della sua messa a terra.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                        <div className="space-y-4 group cursor-pointer">
                            <span className="text-[10px] font-bold tracking-[0.3em] text-foreground/30 uppercase">Email</span>
                            <a href="mailto:hello@gleeye.com" className="text-xl font-bold font-satoshi text-foreground block overflow-hidden">
                                <span className="inline-block group-hover:-translate-y-full transition-transform duration-500">hello@gleeye.com</span>
                                <span className="block text-accent-blue group-hover:-translate-y-full transition-transform duration-500">hello@gleeye.com</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 w-full p-2 bg-white rounded-[2rem] border border-black/[0.03] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.03)] group transition-all duration-1000 hover:shadow-[0_80px_120px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
                    <iframe
                        ref={iframeRef}
                        id="gleeye-form-517d363a-dea8-47d1-ba6e-1acf22498b99"
                        src="https://workspace.gleeye.eu/form.html?id=517d363a-dea8-47d1-ba6e-1acf22498b99"
                        width="100%"
                        height="500"
                        frameBorder="0"
                        className="w-full"
                        style={{ border: 'none', borderRadius: '12px', background: 'transparent' }}
                    />
                </div>
            </div>
        </section>
    );
}
