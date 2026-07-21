import { Suspense } from 'react';
import { getAllCaseStudies } from '@/lib/portfolio';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Portfolio — Gleeye',
  description: 'I nostri lavori: video production, brand identity, digital e molto altro. Case study da Genova e dintorni.',
};

export default async function PortfolioPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#07070f]">
        {/* Hero */}
        <section className="pt-40 pb-16 px-8 md:px-14">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-4">Portfolio</p>
            <h1 className="font-satoshi font-black text-5xl md:text-7xl tracking-tight uppercase text-white leading-none mb-6">
              I NOSTRI<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4e92d8] to-[#614aa2]">LAVORI.</span>
            </h1>
            <p className="text-base text-white/40 font-jakarta max-w-xl leading-relaxed">
              Ogni progetto è una storia. Queste sono le nostre — raccontate attraverso video, brand e presenza digitale.
            </p>
          </div>
        </section>

        <Suspense fallback={null}>
          <PortfolioGrid initialItems={caseStudies} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
