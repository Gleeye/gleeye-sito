import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/identity/naming/HeroSection';
import MarqueeSection from '@/components/identity/naming/MarqueeSection';
import PositioningSection from '@/components/identity/naming/PositioningSection';
import ServicesSection from '@/components/identity/naming/ServicesSection';
import StatsSection from '@/components/identity/naming/StatsSection';
import ProcessSection from '@/components/identity/naming/ProcessSection';
import ForWhoSection from '@/components/identity/naming/ForWhoSection';
import WhySection from '@/components/identity/naming/WhySection';
import FaqSection from '@/components/identity/naming/FaqSection';
import CtaSection from '@/components/identity/naming/CtaSection';

export const metadata = {
  title: 'Naming — Gleeye Identity',
  description: 'Naming professionale per brand, prodotti e aziende. Un nome non si trova — si costruisce con metodo, test e una strategia precisa.',
};

export default function NamingPage() {
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
