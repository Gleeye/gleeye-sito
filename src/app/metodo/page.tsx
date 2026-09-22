import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import Metodo from '@/components/v2/istituzionale/Metodo';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Il metodo in quattro fasi',
  description:
    'Analisi, strategia, produzione, presidio: come lavora Gleeye per trasformare l\'incertezza in una linea retta. Tempi certi e qualità costante.',
  path: '/metodo',
});

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
