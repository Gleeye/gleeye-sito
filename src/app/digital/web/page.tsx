import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/digital/web/HeroSection';
import MarqueeSection from '@/components/digital/web/MarqueeSection';
import PositioningSection from '@/components/digital/web/PositioningSection';
import ServicesSection from '@/components/digital/web/ServicesSection';
import ShowreelSection from '@/components/digital/web/ShowreelSection';
import ProcessSection from '@/components/digital/web/ProcessSection';
import ForWhoSection from '@/components/digital/web/ForWhoSection';
import WhySection from '@/components/digital/web/WhySection';
import DarkBand from '@/components/subpage/DarkBand';
import FaqSection from '@/components/digital/web/FaqSection';
import CtaSection from '@/components/digital/web/CtaSection';

export const metadata = {
  title: 'Web Design & Development — Gleeye Digital',
  description: 'Siti web professionali: design, sviluppo, performance. Da sito vetrina a e-commerce, costruiamo esperienze digitali che convertono.',
};

export default function WebPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <PositioningSection />
        <ServicesSection />
        <ShowreelSection />
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
