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
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Visual Identity',
  description:
    'Logo, palette, tipografia e sistema grafico: un\'identità visiva che si riconosce a colpo d\'occhio e regge su stampa, web e social. Gleeye, Genova.',
  path: '/identity/visual-identity',
});

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
      </main>
      <Footer />
    </>
  );
}
