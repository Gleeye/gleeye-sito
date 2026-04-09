import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoTicker from "@/components/LogoTicker";
import CoreAreas from "@/components/CoreAreas";
import Manifesto from "@/components/Manifesto";
import Identity from "@/components/Identity";
import SpecialUnits from "@/components/SpecialUnits";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const loghiDir = path.join(process.cwd(), 'upload/loghi clienti');
  let loghiFiles: string[] = [];
  try {
    if (fs.existsSync(loghiDir)) {
      loghiFiles = fs.readdirSync(loghiDir).filter(f => !f.startsWith('.')).sort();
    }
  } catch (e) {
    console.error("Error reading loghi directory", e);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent text-foreground">
        {/* Blocco 1 */}
        <Hero />
        <LogoTicker logos={loghiFiles} />

        {/* Blocco 2 */}
        <CoreAreas />

        {/* Blocco 4 */}
        <Manifesto />

        {/* Blocco 5 */}
        <Identity />

        {/* Blocco 6 */}
        <SpecialUnits />

        {/* Blocco 7 */}
        <Contact />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
