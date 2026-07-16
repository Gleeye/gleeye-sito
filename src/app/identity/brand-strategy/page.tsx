import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import BrandDiscovery from '@/components/v2/identity/BrandDiscovery';

export const metadata = {
  title: 'Brand Discovery — Gleeye Identity',
  description:
    "Brand discovery e strategic audit: analizziamo il DNA aziendale e i punti di sabotaggio d'immagine. Prima di costruire, capiamo cosa c'è. A Genova, operativi ovunque.",
};

export default function BrandDiscoveryPage() {
  return (
    <>
      <Header />
      <main>
        <BrandDiscovery />
      </main>
      <Footer />
    </>
  );
}
