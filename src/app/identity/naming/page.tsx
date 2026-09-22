import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/identity/naming/HeroSection';
import MarqueeSection from '@/components/identity/naming/MarqueeSection';
import PositioningSection from '@/components/identity/naming/PositioningSection';
import ServicesSection from '@/components/identity/naming/ServicesSection';
import ProcessSection from '@/components/identity/naming/ProcessSection';
import ForWhoSection from '@/components/identity/naming/ForWhoSection';
import WhySection from '@/components/identity/naming/WhySection';
import DarkBand from '@/components/subpage/DarkBand';
import FaqSection from '@/components/identity/naming/FaqSection';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Naming',
  description:
    'Naming per brand, prodotti e aziende: un nome non si trova, si costruisce con metodo, verifiche di disponibilità e test di suono e memoria.',
  path: '/identity/naming',
});

export default function NamingPage() {
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
