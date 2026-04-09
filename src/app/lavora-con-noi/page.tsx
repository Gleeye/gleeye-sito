import type { Metadata } from 'next';
import LavoraConNoi from '@/components/LavoraConNoi';

export const metadata: Metadata = {
    title: 'Lavora con noi | GLEEYE',
    description:
        'Prova di non essere un prompt. Cerchiamo umani capaci di sbagliare con genio, di intuire l\'impossibile e di dare sostanza al vuoto.',
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LavoraConNoiPage() {
    return (
        <>
            <Header />
            <main className="min-h-[100dvh]">
                <LavoraConNoi />
            </main>
            <Footer />
        </>
    );
}
