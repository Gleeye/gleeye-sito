import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/factory/copywriting/HeroSection';
import MarqueeSection from '@/components/factory/copywriting/MarqueeSection';
import PositioningSection from '@/components/factory/copywriting/PositioningSection';
import ServicesSection from '@/components/factory/copywriting/ServicesSection';
import StatsSection from '@/components/factory/copywriting/StatsSection';
import ProcessSection from '@/components/factory/copywriting/ProcessSection';
import ForWhoSection from '@/components/factory/copywriting/ForWhoSection';
import WhySection from '@/components/factory/copywriting/WhySection';
import FaqSection from '@/components/factory/copywriting/FaqSection';
import CtaSection from '@/components/factory/copywriting/CtaSection';

export const metadata = {
  title: 'Copywriting — Gleeye Factory',
  description: 'Copywriting strategico, verbal identity e contenuti per aziende che vogliono comunicare con precisione. Copy che costruisce brand, non solo li descrive.',
};

export default function CopywritingPage() {
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
