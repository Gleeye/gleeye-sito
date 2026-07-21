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
import CtaSection from '@/components/factory/grafica/CtaSection';

export const metadata = {
  title: 'Graphic Design — Gleeye Factory',
  description: 'Brand design system, print, digital graphics e wayfinding per aziende che vogliono comunicare con coerenza visiva. Design che costruisce reputazione.',
};

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
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
