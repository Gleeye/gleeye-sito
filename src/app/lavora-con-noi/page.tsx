import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import LavoraConNoi from '@/components/v2/LavoraConNoi';
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Lavora con noi',
  description:
    'Posizioni aperte in Gleeye a Genova: designer, videomaker, copywriter, developer. Progetti veri dal primo giorno e una squadra che ama il mestiere.',
  path: '/lavora-con-noi',
});

export default function LavoraConNoiPage() {
    return (
        <>
            <Header />
            <main className="bg-[#0a0a10]">
                <LavoraConNoi />
            </main>
            <Footer />
        </>
    );
}
