import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/events/HeroSection';
import PositioningSection from '@/components/events/PositioningSection';
import ServicesSection from '@/components/events/ServicesSection';
import TimelineSection from '@/components/events/TimelineSection';
import FaqSection from '@/components/events/FaqSection';
import CtaSection from '@/components/events/CtaSection';

export const metadata = {
  title: 'Comunicazione per Eventi Aziendali — Gleeye',
  description: 'Servizi di comunicazione e marketing per eventi aziendali: foto, video, grafica, media relation, digital marketing. Copertura totale prima, durante e dopo il tuo evento.',
};

export default function EventsPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PositioningSection />
        <ServicesSection />
        <TimelineSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
