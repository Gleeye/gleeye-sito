import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/events/HeroSection';
import PositioningSection from '@/components/events/PositioningSection';
import ServicesSection from '@/components/events/ServicesSection';
import TimelineSection from '@/components/events/TimelineSection';
import FaqSection from '@/components/events/FaqSection';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Comunicazione per Eventi Aziendali',
  description:
    'Foto, video, grafica, ufficio stampa e social per eventi aziendali: copertura prima, durante e dopo. Un solo interlocutore per tutto l\'evento.',
  path: '/events',
});

export default function EventsPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {/* Il reel vive dentro "il nostro approccio" (PositioningSection):
            una sezione video a sé era un doppione. Case studies rimossa
            per ora su richiesta. */}
        <PositioningSection />
        <ServicesSection />
        <TimelineSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
