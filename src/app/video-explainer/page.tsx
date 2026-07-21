import HeroSection from '@/components/video-explainer/HeroSection';
import ValueSection from '@/components/video-explainer/ValueSection';
import ExamplesSection from '@/components/video-explainer/ExamplesSection';
import EssenceSection from '@/components/video-explainer/EssenceSection';
import ProcessStack from '@/components/video-explainer/ProcessStack';
import FaqSection from '@/components/video-explainer/FaqSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'GLEEYE Video Explainer Service',
    description: 'Produzione video explainer ad alto impatto per brand che vogliono essere visti.',
};

export default function VideoExplainerLandingPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen relative">
                <HeroSection />
                <ValueSection />
                <ExamplesSection />
                <EssenceSection />
                <ProcessStack />
                <FaqSection />
            </main>
            <Footer />
        </>
    );
}
