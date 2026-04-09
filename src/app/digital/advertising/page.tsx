import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/digital/advertising/HeroSection';
import MarqueeSection from '@/components/digital/advertising/MarqueeSection';
import PositioningSection from '@/components/digital/advertising/PositioningSection';
import ServicesSection from '@/components/digital/advertising/ServicesSection';
import StatsSection from '@/components/digital/advertising/StatsSection';
import ProcessSection from '@/components/digital/advertising/ProcessSection';
import ForWhoSection from '@/components/digital/advertising/ForWhoSection';
import WhySection from '@/components/digital/advertising/WhySection';
import FaqSection from '@/components/digital/advertising/FaqSection';
import CtaSection from '@/components/digital/advertising/CtaSection';

export const metadata = {
  title: 'Advertising — Gleeye Digital',
  description: 'Campagne pubblicitarie digitali: Google Ads, Meta Ads, LinkedIn Ads. Budget ottimizzato, creatività che converte, risultati misurabili.',
};

export default function AdvertisingPage() {
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
