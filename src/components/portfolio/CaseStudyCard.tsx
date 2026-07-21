'use client';

import Link from 'next/link';
import type { CaseStudy } from '@/lib/portfolio';

const AREA_LABELS: Record<string, string> = {
  factory: 'Factory',
  identity: 'Identity',
  digital: 'Digital',
};

export default function CaseStudyCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const hasMedia = cs.vimeo_id || cs.cover_url;
  const thumbSrc = cs.cover_url || (cs.vimeo_id ? `https://vumbnail.com/${cs.vimeo_id}.jpg` : null);

  return (
    <Link href={`/portfolio/${cs.slug}`}
      className="group relative block overflow-hidden bg-[#0d0d1a]"
      style={{ aspectRatio: '4/3' }}>

      {/* Background image */}
      {thumbSrc && (
        <img src={thumbSrc} alt={cs.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      )}

      {/* No media fallback — gradient bg with number */}
      {!hasMedia && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#4e92d8]/10 to-[#614aa2]/10 flex items-center justify-center">
          <span className="text-[80px] font-black text-white/[0.04] font-satoshi leading-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* Permanent dark gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Top: area + year */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
          {AREA_LABELS[cs.area]}
        </span>
        <span className="text-[10px] text-white/30">{cs.year}</span>
      </div>

      {/* Play icon for video */}
      {cs.vimeo_id && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
            <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom: title + tagline */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-1.5">{cs.client}</p>
        <h3 className="text-lg font-black font-satoshi uppercase tracking-tight text-white leading-tight mb-2">{cs.title}</h3>
        <p className="text-xs text-white/50 font-jakarta leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 max-w-xs">
          {cs.tagline}
        </p>
      </div>
    </Link>
  );
}
