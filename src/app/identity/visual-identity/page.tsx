import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/identity/visual-identity/HeroSection';
import MarqueeSection from '@/components/identity/visual-identity/MarqueeSection';
import PositioningSection from '@/components/identity/visual-identity/PositioningSection';
import ServicesSection from '@/components/identity/visual-identity/ServicesSection';
import ProcessSection from '@/components/identity/visual-identity/ProcessSection';
import ForWhoSection from '@/components/identity/visual-identity/ForWhoSection';
import WhySection from '@/components/identity/visual-identity/WhySection';
import DarkBand from '@/components/subpage/DarkBand';
import FaqSection from '@/components/identity/visual-identity/FaqSection';
import CtaSection from '@/components/identity/visual-identity/CtaSection';

export const metadata = {
  title: 'Visual Identity — Gleeye Identity',
  description: "Identità visiva professionale: logo, palette, tipografia, sistema grafico. Un brand che si riconosce a colpo d'occhio, su qualsiasi supporto.",
};

export default function VisualIdentityPage() {
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
