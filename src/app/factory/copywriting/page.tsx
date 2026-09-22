import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/factory/copywriting/HeroSection';
import MarqueeSection from '@/components/factory/copywriting/MarqueeSection';
import PositioningSection from '@/components/factory/copywriting/PositioningSection';
import ServicesSection from '@/components/factory/copywriting/ServicesSection';
import ProcessSection from '@/components/factory/copywriting/ProcessSection';
import ForWhoSection from '@/components/factory/copywriting/ForWhoSection';
import WhySection from '@/components/factory/copywriting/WhySection';
import DarkBand from '@/components/subpage/DarkBand';
import FaqSection from '@/components/factory/copywriting/FaqSection';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Copywriting',
  description:
    'Copywriting e verbal identity per aziende: testi per siti, campagne e contenuti editoriali. Parole scelte per farsi capire, non per riempire.',
  path: '/factory/copywriting',
});

export default function CopywritingPage() {
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
