import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import BrandStrategy from '@/components/v2/identity/BrandStrategy';

export const metadata = {
  title: 'Brand Strategy — Gleeye Identity',
  description:
    'Brand strategy per aziende che vogliono posizionarsi con chiarezza. Positioning, architettura di brand, framework valoriale. La strategia che precede tutto il resto.',
};

export default function BrandStrategyPage() {
  return (
    <>
      <Header />
      <main>
        <BrandStrategy />
      </main>
      <Footer />
    </>
  );
}
