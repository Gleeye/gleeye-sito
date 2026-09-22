import HeroSection     from '@/components/copy/HeroSection';
import ManifestoSection from '@/components/copy/ManifestoSection';
import ForChiSection   from '@/components/copy/ForChiSection';
import ServicesGrid    from '@/components/copy/ServicesGrid';
import Header          from '@/components/Header';
import Footer          from '@/components/Footer';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Servizi di Copywriting',
  description:
    'Copy strategy, testi per il sito, articoli e naming: scriviamo per farci capire in fretta. Servizi di copywriting per aziende a Genova.',
  path: '/copy',
});

export default function CopyPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen relative">
                <HeroSection />
                <ManifestoSection />
                <ForChiSection />
                <ServicesGrid />
            </main>
            <Footer />
        </>
    );
}
