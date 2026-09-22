import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/identity/brand-guidelines/HeroSection';
import MarqueeSection from '@/components/identity/brand-guidelines/MarqueeSection';
import PositioningSection from '@/components/identity/brand-guidelines/PositioningSection';
import ServicesSection from '@/components/identity/brand-guidelines/ServicesSection';
import ProcessSection from '@/components/identity/brand-guidelines/ProcessSection';
import ForWhoSection from '@/components/identity/brand-guidelines/ForWhoSection';
import WhySection from '@/components/identity/brand-guidelines/WhySection';
import DarkBand from '@/components/subpage/DarkBand';
import FaqSection from '@/components/identity/brand-guidelines/FaqSection';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Brand Guidelines',
  description:
    'Il manuale che protegge il brand: regole d\'uso di logo, colori, tipografia e tono di voce, chiare per chiunque lavori con la tua identità.',
  path: '/identity/brand-guidelines',
});

export default function BrandGuidelinesPage() {
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
