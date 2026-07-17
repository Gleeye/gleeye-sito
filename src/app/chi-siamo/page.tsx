import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import ChiSiamo from '@/components/v2/istituzionale/ChiSiamo';

export const metadata = {
  title: 'Chi siamo — Gleeye',
  description:
    'Un team multidisciplinare progettato per la sintesi: visione strategica e capacità esecutiva, un interlocutore unico per trasformare le idee in progetti solidi.',
};

export default function ChiSiamoPage() {
  return (
    <>
      <Header />
      <main>
        <ChiSiamo />
      </main>
      <Footer />
    </>
  );
}
