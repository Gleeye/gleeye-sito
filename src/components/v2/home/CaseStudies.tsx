'use client';

import { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/portfolio';

/* Placeholder mostrati SOLO se Supabase non restituisce dati (progetto da ricollegare).
   Quando arrivano i dati veri con cover_url, questi spariscono. */
const PLACEHOLDER = [
  { id: 'ph1', client: 'Edilporta', services: ['Restyling logo', 'Sito web', 'Servizi foto'] },
  { id: 'ph2', client: 'Az. Agricola Filippo Gallino', services: ['Sito web'] },
  { id: 'ph3', client: 'Ortopedia Stringhini', services: ['Sito web', 'Servizi foto', 'Video'] },
  { id: 'ph4', client: 'Gleeye', services: ['Brand identity', 'Digital'] },
] as unknown as CaseStudy[];

const PH_GRAD = [
  'linear-gradient(150deg, #2b2350 0%, #4757c4 100%)',
  'linear-gradient(150deg, #17324d 0%, #4e92d8 100%)',
  'linear-gradient(150deg, #2a1e46 0%, #8257e6 100%)',
  'linear-gradient(150deg, #1c2b52 0%, #6a6cd6 100%)',
];

export default function CaseStudies({ cases }: { cases: CaseStudy[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const items = cases && cases.length ? cases : PLACEHOLDER;

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#f8f9fa] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          {/* Colonna sinistra */}
          <div className="md:col-span-4">
            <p className="voice-mono mb-4 text-[#614aa2]">Case studies</p>
            <h2 className="voice-display text-4xl leading-[0.95] text-[#0a0a10] md:text-5xl">
              Un estratto di ciò che abbiamo{' '}
              <span className="text-gradient">già realizzato.</span>
            </h2>
            <p className="mt-5 max-w-xs font-jakarta text-base font-medium leading-relaxed text-black/55">
              Un assaggio di quello che abbiamo costruito, per immaginare quello
              che faremo insieme.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => scroll(-1)}
                aria-label="Precedente"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0a0a10]/15 text-[#0a0a10] transition-colors duration-300 hover:border-[#0a0a10] hover:bg-[#0a0a10] hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Successivo"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0a0a10]/15 text-[#0a0a10] transition-colors duration-300 hover:border-[#0a0a10] hover:bg-[#0a0a10] hover:text-white"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Carosello */}
          <div className="md:col-span-8">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {items.map((c, i) => (
                <article
                  key={c.id}
                  data-card
                  style={c.cover_url ? undefined : { background: PH_GRAD[i % PH_GRAD.length] }}
                  className="group relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden rounded-[1.6rem] bg-[#0a0a10] sm:w-[46vw] md:w-[300px] lg:w-[340px]"
                >
                  {c.cover_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.cover_url}
                      alt={c.client || c.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="voice-display text-2xl leading-[0.95] text-white md:text-[1.7rem]">
                      {c.client || c.title}
                    </h3>
                    {c.services?.length > 0 && (
                      <p className="mt-2 font-jakarta text-sm font-medium leading-snug text-white/70">
                        {c.services.join(' · ')}
                      </p>
                    )}
                  </div>
                  <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
