import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/digital/seo/HeroSection';
import MarqueeSection from '@/components/digital/seo/MarqueeSection';
import PositioningSection from '@/components/digital/seo/PositioningSection';
import ServicesSection from '@/components/digital/seo/ServicesSection';
import StatsSection from '@/components/digital/seo/StatsSection';
import ProcessSection from '@/components/digital/seo/ProcessSection';
import ForWhoSection from '@/components/digital/seo/ForWhoSection';
import WhySection from '@/components/digital/seo/WhySection';
import FaqSection from '@/components/digital/seo/FaqSection';
import CtaSection from '@/components/digital/seo/CtaSection';

export const metadata = {
  title: 'SEO — Gleeye Digital',
  description: 'SEO strategica per aziende: audit tecnico, content strategy, link building. Posizionarsi su Google non è fortuna — è un metodo.',
};

export default function SeoPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <PositioningSection />
        <ServicesSection />
        <StatsSection />
        <ProcessSection />
        <ForWhoSection />
        <WhySection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
