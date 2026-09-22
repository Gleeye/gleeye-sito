import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/digital/advertising/HeroSection';
import MarqueeSection from '@/components/digital/advertising/MarqueeSection';
import PositioningSection from '@/components/digital/advertising/PositioningSection';
import ServicesSection from '@/components/digital/advertising/ServicesSection';
import ProcessSection from '@/components/digital/advertising/ProcessSection';
import ForWhoSection from '@/components/digital/advertising/ForWhoSection';
import WhySection from '@/components/digital/advertising/WhySection';
import FaqSection from '@/components/digital/advertising/FaqSection';
import DarkBand from '@/components/subpage/DarkBand';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Advertising: Google, Meta e LinkedIn Ads',
  description:
    'Campagne a pagamento su Google, Meta e LinkedIn: budget governato, creatività che converte e risultati misurabili mese per mese.',
  path: '/digital/advertising',
});

export default function AdvertisingPage() {
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
