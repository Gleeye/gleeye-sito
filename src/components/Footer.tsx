import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#08080C] text-white py-20 px-6 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Logo */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block group">
                            <Image
                                src="/brand/logo bianco.png"
                                alt="Gleeye Logo"
                                width={500}
                                height={150}
                                className="h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                        </Link>
                    </div>

                    {/* Contatti */}
                    <div className="space-y-10 lg:pl-10">
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent-blue/60 mb-6">Contatti</h4>
                            <div className="space-y-8">
                                <p className="text-xl md:text-2xl font-medium text-white/90 leading-tight hover:text-white transition-colors duration-300">
                                    Piazza Brignole 2/3, <br />
                                    16122 Genova
                                </p>
                                <div className="space-y-2">
                                    <a href="mailto:info@gleeye.eu" className="block text-xl md:text-2xl font-medium text-white/50 hover:text-accent-blue transition-colors duration-300">
                                        info@gleeye.eu
                                    </a>
                                    <a href="tel:+390100954533" className="block text-xl md:text-2xl font-medium text-white/50 hover:text-accent-blue transition-colors duration-300">
                                        +39 010 09 54 533
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="space-y-10 lg:pl-10">
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent-blue/60 mb-6">Follow</h4>
                            <div className="flex flex-col gap-6">
                                {[
                                    { name: 'Instagram', url: 'https://www.instagram.com/gleeye' },
                                    { name: 'Facebook', url: 'https://www.facebook.com/gleeye/' },
                                    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/gleeye/' }
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl md:text-2xl font-medium text-white/50 hover:text-white transition-all duration-500 flex items-center group relative w-fit"
                                    >
                                        <span className="relative z-10">{social.name}</span>
                                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-blue transition-all duration-500 group-hover:w-full"></span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                    <div className="space-y-3">
                        <p className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
                            © {new Date().getFullYear()} GLEEYE S.R.L.
                        </p>
                        <p className="text-[10px] text-white/20 tracking-wide font-medium">
                            N. REA GE 521871 • Capitale sociale: 10.000,00 € • P.IVA 02944020995
                        </p>
                    </div>

                    <div className="flex flex-col lg:items-end gap-6 text-white/20">
                        <div className="text-[9px] leading-relaxed lg:text-right max-w-xs">
                            <p>
                                Questo sito è protetto da Google reCAPTCHA v3, <br />
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors duration-300">
                                    Privacy Policy
                                </a>{' '}
                                e{' '}
                                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors duration-300">
                                    Terms of Service
                                </a>{' '}
                                di Google.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-x-10 gap-y-4">
                            <Link
                                href="/privacy-policy"
                                className="text-[10px] font-bold tracking-widest uppercase text-white/30 hover:text-accent-blue transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/cookie-policy"
                                className="text-[10px] font-bold tracking-widest uppercase text-white/30 hover:text-accent-blue transition-colors duration-300"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
