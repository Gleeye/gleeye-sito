import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import Contact from '@/components/v2/home/Contact';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Contatti',
  description:
    'Scrivici o prenota una call: Gleeye, Piazza Brignole 2/3, Genova. info@gleeye.eu, +39 010 09 54 533. Rispondiamo con un\'analisi onesta.',
  path: '/contatti',
});

export default function ContattiPage() {
  return (
    <>
      <Header />
      <main className="bg-[#0a0a10] pt-16 md:pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
