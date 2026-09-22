import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import Manifesto from '@/components/v2/istituzionale/Manifesto';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Manifesto',
  description:
    'Glee to eye: il piacere per gli occhi come parametro di efficacia. In cosa crede Gleeye quando progetta comunicazione, senza giri di parole.',
  path: '/manifesto',
});

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
