import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/identity/brand-guidelines/HeroSection';
import MarqueeSection from '@/components/identity/brand-guidelines/MarqueeSection';
import PositioningSection from '@/components/identity/brand-guidelines/PositioningSection';
import ServicesSection from '@/components/identity/brand-guidelines/ServicesSection';
import StatsSection from '@/components/identity/brand-guidelines/StatsSection';
import ProcessSection from '@/components/identity/brand-guidelines/ProcessSection';
import ForWhoSection from '@/components/identity/brand-guidelines/ForWhoSection';
import WhySection from '@/components/identity/brand-guidelines/WhySection';
import FaqSection from '@/components/identity/brand-guidelines/FaqSection';
import CtaSection from '@/components/identity/brand-guidelines/CtaSection';

export const metadata = {
  title: 'Brand Guidelines — Gleeye Identity',
  description: 'Brand guidelines professionali: il manuale che protegge e propaga il tuo brand. Regole chiare per chiunque lavori con la tua identità.',
};

export default function BrandGuidelinesPage() {
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
