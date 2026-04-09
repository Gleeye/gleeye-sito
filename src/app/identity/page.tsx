import HeroSection        from '@/components/identity/HeroSection';
import ManifestoSection   from '@/components/identity/ManifestoSection';
import ServicesAccordion  from '@/components/identity/ServicesAccordion';
import ProcessSection     from '@/components/identity/ProcessSection';
import ContactCTA         from '@/components/identity/ContactCTA';
import Header             from '@/components/Header';
import Footer             from '@/components/Footer';

export const metadata = {
    title:       'Gleeye Identity — Brand Discovery, Naming e Visual Identity a Genova',
    description: "DNA. Nome. Volto. Il percorso di brand identity di Gleeye: audit strategico, naming, visual identity system e brand guidelines. Il presidio dell'identità, a Genova.",
};

export default function IdentityPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen relative">
                <HeroSection />
                <ManifestoSection />
                <ServicesAccordion />
                <ProcessSection />
                <ContactCTA />
            </main>
            <Footer />
        </>
    );
}
