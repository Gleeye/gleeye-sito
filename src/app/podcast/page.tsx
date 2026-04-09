import HeroSection from '@/components/podcast/HeroSection';
import ValueSection from '@/components/podcast/ValueSection';
import EssenceSection from '@/components/podcast/EssenceSection';
import ProcessStack from '@/components/podcast/ProcessStack';
import FaqSection from '@/components/podcast/FaqSection';
import ContactSection from '@/components/podcast/ContactSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'GLEEYE Podcast Service',
    description: 'Design sonoro e produzione podcast di altissimo livello.',
};

export default function PodcastLandingPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen relative">
                <HeroSection />
                <ValueSection />
                <EssenceSection />
                <ProcessStack />
                <FaqSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
