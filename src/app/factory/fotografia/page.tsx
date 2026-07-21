import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/factory/fotografia/HeroSection';
import MarqueeSection from '@/components/factory/fotografia/MarqueeSection';
import PositioningSection from '@/components/factory/fotografia/PositioningSection';
import ServicesSection from '@/components/factory/fotografia/ServicesSection';
import GallerySection from '@/components/factory/fotografia/GallerySection';
import ProcessSection from '@/components/factory/fotografia/ProcessSection';
import ForWhoSection from '@/components/factory/fotografia/ForWhoSection';
import WhySection from '@/components/factory/fotografia/WhySection';
import DarkBand from '@/components/subpage/DarkBand';
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
        <GallerySection />
        <ProcessSection />
        <DarkBand>
          <ForWhoSection />
          <WhySection />
        </DarkBand>
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
