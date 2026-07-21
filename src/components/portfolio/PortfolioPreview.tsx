'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/portfolio';
import CaseStudyCard from './CaseStudyCard';

type Props = {
  items: CaseStudy[];
  title?: string;
  viewAllHref?: string;
};

export default function PortfolioPreview({ items, title = 'Lavori recenti', viewAllHref = '/portfolio' }: Props) {
  if (!items.length) return null;

  return (
    <section className="px-8 md:px-14 py-20 bg-[#07070f]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/25 mb-2">Portfolio</p>
            <h2 className="font-satoshi font-black text-3xl md:text-4xl uppercase tracking-tight text-white">{title}</h2>
          </div>
          <Link href={viewAllHref}
            className="hidden md:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#4e92d8] hover:opacity-70 transition-opacity">
            Vedi tutti <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.slice(0, 3).map((cs, i) => (
            <CaseStudyCard key={cs.id} cs={cs} index={i} />
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Link href={viewAllHref}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#4e92d8]">
            Vedi tutti i lavori <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
