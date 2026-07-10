import Link from 'next/link';
import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#0a0a10] px-5 text-center text-[#f8f9fa]">
        <div className="blueprint absolute inset-0" />
        <div className="grain absolute inset-0" />
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#614aa2]/20 blur-[140px]" />

        <p className="voice-mono relative mb-6 text-[#6db5ff]">[ Errore 404 ]</p>
        <h1 className="voice-display relative text-[26vw] leading-none text-transparent [-webkit-text-stroke:2px_rgba(248,249,250,0.5)] md:text-[16vw]">
          404
        </h1>
        <p className="voice-serif relative mt-4 text-2xl text-white/70 md:text-3xl">
          Questa pagina è sfuggita al nostro sguardo.
        </p>
        <Link
          href="/"
          className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#f8f9fa] px-8 py-4 font-satoshi text-sm font-bold uppercase tracking-wide text-[#0a0a10]"
        >
          <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] transition-transform duration-500 ease-out group-hover:translate-y-0" />
          <span className="relative transition-colors duration-500 group-hover:text-white">
            Torna alla home
          </span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
