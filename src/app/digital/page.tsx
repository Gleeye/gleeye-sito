import HeroSection       from '@/components/digital/HeroSection';
import ServicesAccordion from '@/components/digital/ServicesAccordion';
import Header            from '@/components/Header';
import Footer            from '@/components/Footer';

export const metadata = {
    title:       'Gleeye Digital — Web, Social, SEO e Advertising a Genova',
    description: 'Presenza digitale che converte. Gleeye progetta e gestisce siti web, social media, campagne SEO e advertising per brand che vogliono risultati misurabili.',
};

export default function DigitalPage() {
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
