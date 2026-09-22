import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import ChiSiamo from '@/components/v2/istituzionale/ChiSiamo';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Chi siamo: strategia e produzione a Genova',
  description:
    'Gleeye è un team di strategia e produzione a Genova: branding, digitale e contenuti con un interlocutore unico, dall\'idea alla messa a terra.',
  path: '/chi-siamo',
});

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
