import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import AreaHero from '@/components/v2/area/AreaHero';
import AreaApproach from '@/components/v2/area/AreaApproach';
import AreaDarkBand from '@/components/v2/area/AreaDarkBand';
import AreaChapters from '@/components/v2/area/AreaChapters';
import AreaMethod from '@/components/v2/area/AreaMethod';
import AreaEssence from '@/components/v2/area/AreaEssence';
import AreaCTA from '@/components/v2/area/AreaCTA';
import { AREAS } from '@/components/v2/area/data';

export const metadata = {
  title: 'Gleeye Factory — Video, Foto, Copy, Podcast e Graphic Design a Genova',
  description:
    "L'eccellenza come output prevedibile. Video production, fotografia, copywriting strategico, podcast e motion design: la content factory di Gleeye.",
};

export default function FactoryPage() {
  const area = AREAS.factory;
  return (
    <>
      <Header />
      <main>
        <AreaHero area={area} />
        <AreaChapters area={area} />
        <AreaDarkBand area={area}>
          <AreaMethod area={area} bare />
          <AreaApproach area={area} bare />
        </AreaDarkBand>
        <AreaEssence area={area} />
        <AreaCTA area={area} />
      </main>
      <Footer />
    </>
  );
}
