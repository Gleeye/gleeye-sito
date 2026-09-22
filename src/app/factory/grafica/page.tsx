import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/factory/grafica/HeroSection';
import MarqueeSection from '@/components/factory/grafica/MarqueeSection';
import PositioningSection from '@/components/factory/grafica/PositioningSection';
import ServicesSection from '@/components/factory/grafica/ServicesSection';
import ProcessSection from '@/components/factory/grafica/ProcessSection';
import ForWhoSection from '@/components/factory/grafica/ForWhoSection';
import WhySection from '@/components/factory/grafica/WhySection';
import DarkBand from '@/components/subpage/DarkBand';
import FaqSection from '@/components/factory/grafica/FaqSection';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Graphic Design',
  description:
    'Design system, materiali stampati, grafica digitale e segnaletica: un sistema visivo coerente su ogni supporto. Graphic design per aziende, Genova.',
  path: '/factory/grafica',
});

export default function GraficaPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <PositioningSection />
        <ServicesSection />
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
