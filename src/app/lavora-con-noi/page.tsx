import type { Metadata } from 'next';
import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import LavoraConNoi from '@/components/v2/LavoraConNoi';

export const metadata: Metadata = {
    title: 'Lavora con noi | GLEEYE',
    description:
        'Progetti veri dal primo giorno, uno standard che ti alza e una squadra che ama il proprio mestiere. Designer, videomaker, copywriter, developer: presentati.',
};

export default function LavoraConNoiPage() {
    return (
        <>
            <Header />
            <main className="bg-[#0a0a10] pt-16 md:pt-20">
                <LavoraConNoi />
            </main>
            <Footer />
        </>
    );
}
