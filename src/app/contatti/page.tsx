import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import Contact from '@/components/v2/home/Contact';

export const metadata = {
  title: 'Contatti — Parliamo del tuo progetto',
  description:
    'Raccontaci dove sei e dove vuoi arrivare: rispondiamo con un’analisi onesta. Gleeye, Piazza Brignole 2/3, Genova — info@gleeye.eu.',
};

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
