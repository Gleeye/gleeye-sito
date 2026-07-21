import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/factory/podcast/HeroSection';
import MarqueeSection from '@/components/factory/podcast/MarqueeSection';
import PositioningSection from '@/components/factory/podcast/PositioningSection';
import ServicesSection from '@/components/factory/podcast/ServicesSection';
import ProcessSection from '@/components/factory/podcast/ProcessSection';
import ForWhoSection from '@/components/factory/podcast/ForWhoSection';
import WhySection from '@/components/factory/podcast/WhySection';
import DarkBand from '@/components/subpage/DarkBand';
import FaqSection from '@/components/factory/podcast/FaqSection';

export const metadata = {
  title: 'Podcast & Audio Branding — Gleeye Factory',
  description: 'Produzione podcast e audio branding per aziende: format editoriale, registrazione in studio o da remoto, video podcast, sound design e distribuzione. La voce del tuo brand, ascoltata fino in fondo.',
};

export default function PodcastPage() {
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
