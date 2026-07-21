import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/portfolio';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudyDetail from '@/components/portfolio/CaseStudyDetail';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const all = await getAllCaseStudies();
  return all.map(cs => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Gleeye Portfolio`,
    description: cs.tagline,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#07070f]">
        <CaseStudyDetail cs={cs} />
      </main>
      <Footer />
    </>
  );
}
