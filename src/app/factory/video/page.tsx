import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/factory/video/HeroSection';
import MarqueeSection from '@/components/factory/video/MarqueeSection';
import PositioningSection from '@/components/factory/video/PositioningSection';
import ServicesSection from '@/components/factory/video/ServicesSection';
import StatsSection from '@/components/factory/video/StatsSection';
import ProcessSection from '@/components/factory/video/ProcessSection';
import ForWhoSection from '@/components/factory/video/ForWhoSection';
import WhySection from '@/components/factory/video/WhySection';
import FaqSection from '@/components/factory/video/FaqSection';
import CtaSection from '@/components/factory/video/CtaSection';

export const metadata = {
  title: 'Video Production — Gleeye Factory',
  description: 'Video istituzionale, spot ADV, explainer e social video content. Produzione professionale dalla pre-produzione alla post. Un video sbagliato costa quanto uno giusto. Solo che non vende.',
};

export default function VideoPage() {
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
