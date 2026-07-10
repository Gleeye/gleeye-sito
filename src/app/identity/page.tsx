import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import AreaHero from '@/components/v2/area/AreaHero';
import AreaChapters from '@/components/v2/area/AreaChapters';
import AreaEssence from '@/components/v2/area/AreaEssence';
import AreaCTA from '@/components/v2/area/AreaCTA';
import { AREAS } from '@/components/v2/area/data';

export const metadata = {
  title: 'Gleeye Identity — Brand Discovery, Naming e Visual Identity a Genova',
  description:
    "L'identità non si inventa: si scopre. Brand discovery, naming, visual identity system e brand guidelines. Il presidio dell'identità, a Genova.",
};

export default function IdentityPage() {
  const area = AREAS.identity;
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
