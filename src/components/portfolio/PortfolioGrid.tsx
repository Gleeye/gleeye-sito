'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { CaseStudy } from '@/lib/portfolio';
import CaseStudyCard from './CaseStudyCard';

const FILTERS = [
  { key: 'all', label: 'Tutti' },
  { key: 'factory', label: 'Factory' },
  { key: 'identity', label: 'Identity' },
  { key: 'digital', label: 'Digital' },
];

export default function PortfolioGrid({ initialItems }: { initialItems: CaseStudy[] }) {
  const searchParams = useSearchParams();
  const areaParam = searchParams.get('area');

  const [active, setActive] = useState(() => {
    // Initialize from URL param if valid
    const valid = FILTERS.map(f => f.key);
    return areaParam && valid.includes(areaParam) ? areaParam : 'all';
  });

  // Sync if URL changes (e.g. browser back/forward)
  useEffect(() => {
    const valid = FILTERS.map(f => f.key);
    if (areaParam && valid.includes(areaParam)) setActive(areaParam);
  }, [areaParam]);

  const filtered = active === 'all'
    ? initialItems
    : initialItems.filter(cs => cs.area === active);

  return (
    <section className="pb-0">
      {/* Filter bar */}
      <div className="px-8 md:px-14 pb-10">
        <div className="flex gap-1">
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setActive(f.key)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 border-b-2 ${
                active === f.key
                  ? 'border-[#4e92d8] text-white'
                  : 'border-transparent text-white/30 hover:text-white/60'
              }`}>
              {f.label}
              <span className="ml-2 text-[10px] opacity-40">
                {f.key === 'all' ? initialItems.length : initialItems.filter(cs => cs.area === f.key).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid — gap-px for tight newspaper-style layout */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {filtered.map((cs, i) => (
            <CaseStudyCard key={cs.id} cs={cs} index={i} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center text-white/20 text-sm px-8">Nessun progetto trovato.</div>
      )}
    </section>
  );
}
