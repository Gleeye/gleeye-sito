import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import MissionVision from '@/components/v2/istituzionale/MissionVision';

export const metadata = {
  title: 'Mission e Vision — Gleeye',
  description:
    "La missione: ridurre l'attrito tra ciò che le aziende valgono e ciò che si vede. La visione: un mercato dove la forma non tradisce più il valore.",
};

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
