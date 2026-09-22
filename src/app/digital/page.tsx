import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import AreaHero from '@/components/v2/area/AreaHero';
import AreaApproach from '@/components/v2/area/AreaApproach';
import AreaDarkBand from '@/components/v2/area/AreaDarkBand';
import AreaChapters from '@/components/v2/area/AreaChapters';
import AreaMethod from '@/components/v2/area/AreaMethod';
import AreaEssence from '@/components/v2/area/AreaEssence';
import { AREAS } from '@/components/v2/area/data';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Web Design, Social, SEO e Advertising',
  description:
    'Siti web veloci, social strategy, SEO e campagne Google e Meta: l\'infrastruttura digitale del brand, non solo la sua vetrina. Gleeye Digital, Genova.',
  path: '/digital',
});

export default function DigitalPage() {
  const area = AREAS.digital;
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
      </main>
      <Footer />
    </>
  );
}
