import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/digital/social/HeroSection';
import MarqueeSection from '@/components/digital/social/MarqueeSection';
import PositioningSection from '@/components/digital/social/PositioningSection';
import ServicesSection from '@/components/digital/social/ServicesSection';
import ProcessSection from '@/components/digital/social/ProcessSection';
import ForWhoSection from '@/components/digital/social/ForWhoSection';
import WhySection from '@/components/digital/social/WhySection';
import FaqSection from '@/components/digital/social/FaqSection';
import DarkBand from '@/components/subpage/DarkBand';

export const metadata = {
  title: 'Social Media — Gleeye Digital',
  description: 'Gestione social media professionale: strategia, produzione contenuti, community management. Social che costruisce brand, non solo follower.',
};

export default function SocialPage() {
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
