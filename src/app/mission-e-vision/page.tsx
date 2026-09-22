import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import MissionVision from '@/components/v2/istituzionale/MissionVision';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Mission e Vision',
  description:
    'Ridurre l\'attrito tra ciò che un\'azienda vale e ciò che si vede. La missione di Gleeye e il mercato che vogliamo: dove la forma non tradisce il valore.',
  path: '/mission-e-vision',
});

export default function MissionVisionPage() {
  return (
    <>
      <Header />
      <main>
        <MissionVision />
      </main>
      <Footer />
    </>
  );
}
