"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current, {
                y: -50,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                delay: 0.5 // Delay pesante come richiesto
            });
        }, headerRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 inset-x-0 z-[100] flex justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
                ? 'py-4 translate-y-0 px-6'
                : 'py-8 translate-y-0 px-10'
                }`}
        >
            {/* Dynamic Navigation Container */}
            <div className={`relative flex items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${scrolled
                    ? 'px-8 py-3 bg-[#08080C]/70 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] rounded-full gap-8 lg:gap-12'
                    : 'w-full justify-between bg-transparent border border-transparent shadow-none'
                }`}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="relative group flex items-center flex-shrink-0"
                >
                    <img
                        src={scrolled ? "/brand/logo bianco.png" : "/brand/logo.png"}
                        alt="GLEEYE Logo"
                        className={`transition-all duration-700 object-contain ${scrolled ? 'h-12 md:h-16' : 'h-8 md:h-12 lg:h-14'
                            }`}
                    />
                </Link>

                {/* Navigation Links */}
                <nav className={`hidden md:flex items-center transition-all duration-1000 ${scrolled
                    ? 'space-x-8 lg:space-x-10'
                    : 'space-x-12 lg:space-x-16 absolute left-1/2 -translate-x-1/2'
                    }`}>
                    {[
                        { name: 'Identity', href: '/identity' },
                        { name: 'Digital',  href: '/digital'  },
                        { name: 'Factory',  href: '/factory'  },
                        { name: 'Units',    href: '/#special-units' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="tech-label text-[10px] text-white hover:text-[#4e92d8] transition-colors relative group uppercase tracking-widest"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#4e92d8] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <Link
                    href="#contatti"
                    className={`group relative overflow-hidden rounded-full flex-shrink-0 border transition-all duration-500 ${scrolled
                        ? 'px-6 py-2 border-white/20 hover:border-white/50'
                        : 'px-8 py-2.5 border-white/30 hover:border-white'
                        }`}
                >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full" />
                    <span className={`relative z-10 tech-label text-white group-hover:text-[#08080C] transition-colors duration-500 uppercase font-bold tracking-wider ${scrolled ? 'text-[9px]' : 'text-[10px]'
                        }`}>
                        Contatti
                    </span>
                </Link>
            </div>
        </header>
    );
}
