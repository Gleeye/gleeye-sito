import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/identity/brand-strategy/HeroSection';
import MarqueeSection from '@/components/identity/brand-strategy/MarqueeSection';
import PositioningSection from '@/components/identity/brand-strategy/PositioningSection';
import ServicesSection from '@/components/identity/brand-strategy/ServicesSection';
import StatsSection from '@/components/identity/brand-strategy/StatsSection';
import ProcessSection from '@/components/identity/brand-strategy/ProcessSection';
import ForWhoSection from '@/components/identity/brand-strategy/ForWhoSection';
import WhySection from '@/components/identity/brand-strategy/WhySection';
import FaqSection from '@/components/identity/brand-strategy/FaqSection';
import CtaSection from '@/components/identity/brand-strategy/CtaSection';

export const metadata = {
  title: 'Brand Strategy — Gleeye Identity',
  description: 'Brand strategy per aziende che vogliono posizionarsi con chiarezza. Positioning, architettura di brand, framework valoriale. La strategia che precede tutto il resto.',
};

export default function BrandStrategyPage() {
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
