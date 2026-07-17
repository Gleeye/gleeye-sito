import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import Metodo from '@/components/v2/istituzionale/Metodo';

export const metadata = {
  title: 'Il Metodo — Gleeye',
  description:
    "Il caos non è un metodo. Quattro fasi — analisi, strategia, produzione, presidio — per trasformare l'incertezza in una linea retta.",
};

export default function MetodoPage() {
  return (
    <>
      <Header />
      <main>
        <Metodo />
      </main>
      <Footer />
    </>
  );
}
