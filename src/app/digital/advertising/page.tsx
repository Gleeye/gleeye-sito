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
import CtaSection from '@/components/digital/advertising/CtaSection';
import DarkBand from '@/components/subpage/DarkBand';

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
