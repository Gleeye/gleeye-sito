import HeroSection from '@/components/video-explainer/HeroSection';
import ValueSection from '@/components/video-explainer/ValueSection';
import ExamplesSection from '@/components/video-explainer/ExamplesSection';
import EssenceSection from '@/components/video-explainer/EssenceSection';
import ProcessStack from '@/components/video-explainer/ProcessStack';
import FaqSection from '@/components/video-explainer/FaqSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Video Explainer',
  description:
    'Video explainer animati per spiegare prodotti, servizi e processi complessi in un minuto: script, storyboard, animazione e voce. Gleeye, Genova.',
  path: '/video-explainer',
});

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
