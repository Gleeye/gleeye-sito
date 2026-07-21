import HeroSection     from '@/components/copy/HeroSection';
import ManifestoSection from '@/components/copy/ManifestoSection';
import ForChiSection   from '@/components/copy/ForChiSection';
import ServicesGrid    from '@/components/copy/ServicesGrid';
import Header          from '@/components/Header';
import Footer          from '@/components/Footer';

export const metadata = {
    title:       'Servizi di Copywriting — Gleeye',
    description: 'Testi asciutti, chirurgici e funzionali. Gleeye scrive per abbattere il rumore di fondo: copy strategy, content, blogging e naming per brand che sanno cosa vogliono comunicare.',
};

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
