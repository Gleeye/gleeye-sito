import fs from 'fs';
import path from 'path';

import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import HeroIris from '@/components/v2/home/HeroIris';
import Ticker from '@/components/v2/home/Ticker';
import Areas from '@/components/v2/home/Areas';
import Manifesto from '@/components/v2/home/Manifesto';
import Duality from '@/components/v2/home/Duality';
import Method from '@/components/v2/home/Method';
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
      <Header />
      <main>
        <HeroIris />
        <Ticker logos={loghiFiles} />
        <Areas />
        <Manifesto />
        <Duality />
        <Method />
        <SpecialUnits />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
