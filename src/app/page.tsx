import fs from 'fs';
import path from 'path';

import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import Intro from '@/components/v2/Intro';
import HeroIris from '@/components/v2/home/HeroIris';
import Ticker from '@/components/v2/home/Ticker';
import Showreel from '@/components/v2/home/Showreel';
import Areas from '@/components/v2/home/Areas';

/* Showreel 2022 già montato — servito dall'hosting del sito attuale */
const SHOWREEL_URL = 'https://gleeye.eu/wp-content/uploads/2023/02/gleeye-shoowreel-case-history-2022.mp4';
import Manifesto from '@/components/v2/home/Manifesto';
import SpecialUnits from '@/components/v2/home/SpecialUnits';
import Contact from '@/components/v2/home/Contact';

export const dynamic = 'force-dynamic';

export default function Home() {
  const loghiDir = path.join(process.cwd(), 'upload/loghi clienti');
  let loghiFiles: string[] = [];
  try {
    if (fs.existsSync(loghiDir)) {
      loghiFiles = fs.readdirSync(loghiDir).filter((f) => !f.startsWith('.')).sort();
    }
  } catch (e) {
    console.error('Error reading loghi directory', e);
  }

  return (
    <>
      <Intro />
      <Header />
      <main>
        <HeroIris />
        <Ticker logos={loghiFiles} />
        <Areas />
        <Showreel clips={[SHOWREEL_URL]} />
        <Manifesto />
        <SpecialUnits />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
