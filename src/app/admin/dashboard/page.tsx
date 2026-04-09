'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, FileText, Image, ChevronDown, ChevronRight } from 'lucide-react';
import { SITE_PAGES, STATUS_LABEL, STATUS_COLOR, type SitePage } from '@/lib/site-pages';
import { useRouter } from 'next/navigation';

const AREAS = ['Core', 'Area Pages', 'Factory', 'Digital', 'Identity', 'Landing Pages'];

export default function DashboardPage() {
  const router = useRouter();
  const [savedContent, setSavedContent] = useState<Record<string, number>>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const counts: Record<string, number> = {};
          data.forEach((d: any) => {
            counts[d.page_slug] = (counts[d.page_slug] || 0) + 1;
          });
          setSavedContent(counts);
        }
      });
  }, []);

  const live = SITE_PAGES.filter(p => p.status === 'live').length;
  const wip = SITE_PAGES.filter(p => p.status === 'wip').length;
  const missing = SITE_PAGES.filter(p => p.status === 'missing').length;

  return (
    <div className="p-8 max-w-5xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-satoshi font-black uppercase tracking-tight text-2xl text-white mb-1">Pagine del sito</h1>
        <p className="font-jakarta text-sm text-white/30">Panoramica e gestione di tutti i contenuti</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Online', value: live, color: '#4ade80' },
          { label: 'In corso', value: wip, color: '#facc15' },
          { label: 'Da costruire', value: missing, color: '#f87171' },
        ].map(s => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-4 flex items-center gap-4">
            <span className="font-satoshi font-black text-3xl" style={{ color: s.color }}>{s.value}</span>
            <span className="font-satoshi text-xs uppercase tracking-[0.15em] text-white/40">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Pages by area */}
      <div className="space-y-2">
        {AREAS.map(area => {
          const pages = SITE_PAGES.filter(p => p.area === area);
          if (!pages.length) return null;
          const isOpen = expanded === area;

          return (
            <div key={area} className="border border-white/[0.07] rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : area)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isOpen ? <ChevronDown size={14} className="text-white/40" /> : <ChevronRight size={14} className="text-white/40" />}
                  <span className="font-satoshi font-black text-sm uppercase tracking-[0.15em] text-white">{area}</span>
                  <span className="font-satoshi text-[9px] uppercase tracking-[0.1em] text-white/25 bg-white/[0.05] px-2 py-0.5 rounded-full">
                    {pages.length} pagine
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {pages.map(p => (
                    <span key={p.slug} className="w-2 h-2 rounded-full" style={{ background: STATUS_COLOR[p.status] }} />
                  ))}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-white/[0.07]">
                  {pages.map((page, i) => (
                    <PageRow
                      key={page.slug}
                      page={page}
                      savedCount={savedContent[page.slug] || 0}
                      isLast={i === pages.length - 1}
                      onCopyStudio={() => router.push(`/admin/copy?page=${page.slug}`)}
                      onVisuals={() => router.push(`/admin/visuals?page=${page.slug}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PageRow({ page, savedCount, isLast, onCopyStudio, onVisuals }: {
  page: SitePage;
  savedCount: number;
  isLast: boolean;
  onCopyStudio: () => void;
  onVisuals: () => void;
}) {
  return (
    <div className={`flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors ${!isLast ? 'border-b border-white/[0.05]' : ''}`}>

      {/* Status dot */}
      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: STATUS_COLOR[page.status] }} />

      {/* Title + path */}
      <div className="flex-1 min-w-0">
        <span className="font-satoshi font-black text-sm text-white">{page.title}</span>
        <span className="ml-3 font-jakarta text-xs text-white/25">{page.path}</span>
      </div>

      {/* Status badge */}
      <span className="font-satoshi text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border shrink-0"
        style={{ color: STATUS_COLOR[page.status], borderColor: `${STATUS_COLOR[page.status]}30`, background: `${STATUS_COLOR[page.status]}10` }}>
        {STATUS_LABEL[page.status]}
      </span>

      {/* Saved copy count */}
      {savedCount > 0 && (
        <span className="font-satoshi text-[9px] uppercase tracking-[0.1em] text-white/25 shrink-0">
          {savedCount} testi
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={onCopyStudio} title="Copy Studio"
          className="p-2 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.06] transition-all">
          <FileText size={13} />
        </button>
        <button onClick={onVisuals} title="Visual Generator"
          className="p-2 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.06] transition-all">
          <Image size={13} />
        </button>
        {page.status === 'live' && (
          <a href={page.path} target="_blank" rel="noopener noreferrer" title="Apri pagina"
            className="p-2 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.06] transition-all">
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
}
