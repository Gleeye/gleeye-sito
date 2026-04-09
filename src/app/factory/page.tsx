import HeroSection from '@/components/factory/HeroSection';
import ServicesAccordion from '@/components/factory/ServicesAccordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: "Gleeye Factory — Content Production d'Élite",
    description:
        'Video, fotografia, copywriting, podcast e graphic design. Il braccio produttivo di Gleeye: cinque discipline, un solo standard.',
};

export default function FactoryPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen relative">
                <HeroSection />
                <ServicesAccordion />
            </main>
            <Footer />
        </>
    );
}
