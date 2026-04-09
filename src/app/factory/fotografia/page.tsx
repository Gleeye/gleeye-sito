import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/factory/fotografia/HeroSection';
import MarqueeSection from '@/components/factory/fotografia/MarqueeSection';
import PositioningSection from '@/components/factory/fotografia/PositioningSection';
import ServicesSection from '@/components/factory/fotografia/ServicesSection';
import StatsSection from '@/components/factory/fotografia/StatsSection';
import ProcessSection from '@/components/factory/fotografia/ProcessSection';
import ForWhoSection from '@/components/factory/fotografia/ForWhoSection';
import WhySection from '@/components/factory/fotografia/WhySection';
import FaqSection from '@/components/factory/fotografia/FaqSection';
import CtaSection from '@/components/factory/fotografia/CtaSection';

export const metadata = {
  title: 'Fotografia — Gleeye Factory',
  description: 'Fotografia professionale per aziende: reportage aziendale, product photography, editorial e brand photography. Immagini costruite con intenzione, non solo scattate.',
};

export default function FotografiaPage() {
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
