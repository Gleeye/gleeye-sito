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
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Fotografia',
  description:
    'Fotografia per aziende: reportage aziendale, prodotto, ritratto e still life. Immagini costruite con intenzione, pronte per web, stampa e social.',
  path: '/factory/fotografia',
});

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
      </main>
      <Footer />
    </>
  );
}
