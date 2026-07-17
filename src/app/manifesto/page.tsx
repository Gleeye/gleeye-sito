import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import Manifesto from '@/components/v2/istituzionale/Manifesto';

export const metadata = {
  title: 'Manifesto — Gleeye',
  description:
    'Glee to eye: il piacere per gli occhi come parametro di efficacia. Ciò in cui crediamo, senza giri di parole.',
};

export default function ManifestoPage() {
  return (
    <>
      <Header />
      <main>
        <Manifesto />
      </main>
      <Footer />
    </>
  );
}
