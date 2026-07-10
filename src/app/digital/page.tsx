import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import AreaHero from '@/components/v2/area/AreaHero';
import AreaChapters from '@/components/v2/area/AreaChapters';
import AreaEssence from '@/components/v2/area/AreaEssence';
import AreaCTA from '@/components/v2/area/AreaCTA';
import { AREAS } from '@/components/v2/area/data';

export const metadata = {
  title: 'Gleeye Digital — Web Design, Social, SEO e Advertising a Genova',
  description:
    "La tua presenza online non è un sito: è un'infrastruttura. Web design ad architettura piuma, social strategy, search authority e performance marketing.",
};

export default function DigitalPage() {
  const area = AREAS.digital;
  return (
    <>
      <Header />
      <main>
        <AreaHero area={area} />
        <AreaChapters area={area} />
        <AreaEssence area={area} />
        <AreaCTA area={area} />
      </main>
      <Footer />
    </>
  );
}
