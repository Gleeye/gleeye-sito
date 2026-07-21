'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { CaseStudy, ContentBlock } from '@/lib/portfolio';
import { ArrowLeft, ArrowUpRight, Play } from 'lucide-react';

const AREA_LABELS: Record<string, string> = {
  factory: 'Factory',
  identity: 'Identity',
  digital: 'Digital',
};
const AREA_COLORS: Record<string, string> = {
  factory: '#4e92d8',
  identity: '#614aa2',
  digital: '#4e92d8',
};

// ─── TEXT PARSER (fallback when no content_blocks) ────────────────────────
// Splits "HEADING Body text ANOTHER HEADING More text" into [{heading, body}]
function isAllCaps(word: string): boolean {
  return word.length > 0 && !/[a-zàèéìòùü]/.test(word);
}

function parseRichText(text: string): { heading: string; body: string }[] {
  if (!text?.trim()) return [];
  const words = text.trim().split(/\s+/);
  const sections: { heading: string; body: string }[] = [];
  let i = 0;

  while (i < words.length) {
    const headingWords: string[] = [];
    while (i < words.length && isAllCaps(words[i])) {
      const word = words[i];
      const nextWord = words[i + 1];
      const isSingleLetter = word.replace(/['''-]/g, '').length <= 2;
      const nextIsAllCaps = nextWord != null && isAllCaps(nextWord);
      if (isSingleLetter && !nextIsAllCaps) break;
      headingWords.push(word);
      i++;
    }
    const bodyWords: string[] = [];
    while (i < words.length) {
      const curr = isAllCaps(words[i]);
      const next = i + 1 < words.length && isAllCaps(words[i + 1]);
      if (curr && next) break;
      bodyWords.push(words[i]);
      i++;
    }
    const heading = headingWords.join(' ');
    const body = bodyWords.join(' ');
    if (heading || body) sections.push({ heading, body });
  }
  return sections.length > 0 ? sections : [{ heading: '', body: text.trim() }];
}

// ─── SHARED PRIMITIVES ────────────────────────────────────────────────────

const DIVIDER = <div className="h-px bg-white/[0.07]" />;

function VimeoEmbed({ vimeoId }: { vimeoId: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://vumbnail.com/${vimeoId}.jpg`;

  if (playing) {
    return (
      <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div
      className="relative w-full bg-black cursor-pointer group/video"
      style={{ aspectRatio: '16/9' }}
      onClick={() => setPlaying(true)}
    >
      <img
        src={thumb}
        alt="Video thumbnail"
        className="w-full h-full object-cover opacity-60 group-hover/video:opacity-80 transition-opacity duration-500"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover/video:scale-110 group-hover/video:border-white/40 transition-all duration-300">
          <Play className="w-9 h-9 text-white fill-white ml-1" />
        </div>
      </div>
    </div>
  );
}

// ─── BLOCK RENDERERS ──────────────────────────────────────────────────────

// video block
function BlockVideo({ vimeo_id, caption }: { vimeo_id: string; caption?: string }) {
  return (
    <div className="px-8 md:px-14 py-10 max-w-7xl mx-auto">
      <div className="overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)]">
        <VimeoEmbed vimeoId={vimeo_id} />
      </div>
      {caption && (
        <p className="text-white/25 text-sm font-jakarta mt-4 text-center">{caption}</p>
      )}
    </div>
  );
}

// photo full-width block
function BlockPhotoFull({ url, alt, caption }: { url: string; alt?: string; caption?: string }) {
  return (
    <div className="py-6">
      <img
        src={url}
        alt={alt ?? ''}
        className="w-full h-auto block"
        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
      />
      {caption && (
        <p className="text-white/25 text-sm font-jakarta mt-4 text-center px-8">{caption}</p>
      )}
    </div>
  );
}

// gallery block (masonry)
function BlockGallery({ urls, columns = 2, label }: { urls: string[]; columns?: 2 | 3; label?: string }) {
  if (!urls.length) return null;

  if (urls.length === 1) {
    return (
      <div className="px-8 md:px-14 py-6 max-w-7xl mx-auto">
        {label && (
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/20 font-jakarta block mb-8">
            {label}
          </span>
        )}
        <img
          src={urls[0]}
          alt=""
          className="w-full h-auto rounded-xl"
          onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
        />
      </div>
    );
  }

  return (
    <div className="px-8 md:px-14 py-6 max-w-7xl mx-auto">
      {label && (
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/20 font-jakarta block mb-8">
          {label}
        </span>
      )}
      <div style={{ columns: String(columns), columnGap: '12px' }}>
        {urls.map((url, i) => (
          <div key={i} className="mb-3 break-inside-avoid overflow-hidden rounded-lg">
            <img
              src={url}
              alt=""
              className="w-full h-auto block hover:scale-[1.02] transition-transform duration-700"
              onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// text block (2-col: heading left, body right)
function BlockText({
  heading,
  body,
  ordinal,
  accentColor,
}: {
  heading?: string;
  body: string;
  ordinal?: string;
  accentColor: string;
}) {
  return (
    <div className="px-8 md:px-14 py-8 max-w-7xl mx-auto">
      {DIVIDER}
      <div className="grid md:grid-cols-[2fr_3fr] gap-8 md:gap-16 lg:gap-24 mt-10">
        <div>
          {ordinal && (
            <span
              className="text-[11px] font-bold tracking-[0.3em] mb-5 block font-jakarta"
              style={{ color: accentColor }}
            >
              {ordinal}
            </span>
          )}
          {heading && (
            <h3 className="font-satoshi font-black text-3xl md:text-4xl uppercase text-white leading-[1.05] tracking-tight">
              {heading}
            </h3>
          )}
        </div>
        <p className="font-jakarta text-white/55 text-base md:text-lg leading-[1.85] pt-1 md:pt-8">
          {body}
        </p>
      </div>
    </div>
  );
}

// split: text left, photo right
function BlockSplitTextPhoto({
  heading,
  body,
  url,
  alt,
}: {
  heading?: string;
  body: string;
  url: string;
  alt?: string;
}) {
  return (
    <div className="px-8 md:px-14 py-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          {heading && (
            <h3 className="font-satoshi font-black text-3xl md:text-4xl uppercase text-white leading-[1.05] tracking-tight mb-6">
              {heading}
            </h3>
          )}
          <p className="font-jakarta text-white/55 text-base md:text-lg leading-[1.85]">{body}</p>
        </div>
        <div className="overflow-hidden rounded-xl">
          <img
            src={url}
            alt={alt ?? ''}
            className="w-full h-auto block"
            onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
          />
        </div>
      </div>
    </div>
  );
}

// split: photo left, text right
function BlockSplitPhotoText({
  url,
  alt,
  heading,
  body,
}: {
  url: string;
  alt?: string;
  heading?: string;
  body: string;
}) {
  return (
    <div className="px-8 md:px-14 py-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="overflow-hidden rounded-xl">
          <img
            src={url}
            alt={alt ?? ''}
            className="w-full h-auto block"
            onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
          />
        </div>
        <div>
          {heading && (
            <h3 className="font-satoshi font-black text-3xl md:text-4xl uppercase text-white leading-[1.05] tracking-tight mb-6">
              {heading}
            </h3>
          )}
          <p className="font-jakarta text-white/55 text-base md:text-lg leading-[1.85]">{body}</p>
        </div>
      </div>
    </div>
  );
}

// quote block
function BlockQuote({ text, author }: { text: string; author?: string }) {
  return (
    <div className="px-8 md:px-14 py-16 max-w-5xl mx-auto text-center">
      <p className="font-satoshi font-black text-2xl md:text-4xl text-white/80 leading-[1.2] tracking-tight">
        &ldquo;{text}&rdquo;
      </p>
      {author && (
        <p className="mt-6 text-white/30 text-sm font-jakarta tracking-[0.2em] uppercase">{author}</p>
      )}
    </div>
  );
}

// ─── BLOCK DISPATCHER ────────────────────────────────────────────────────
function renderBlock(block: ContentBlock, index: number, accentColor: string) {
  switch (block.type) {
    case 'video':
      return <BlockVideo key={index} {...block.data} />;
    case 'photo_full':
      return <BlockPhotoFull key={index} {...block.data} />;
    case 'gallery':
      return <BlockGallery key={index} {...block.data} />;
    case 'text':
      return (
        <BlockText
          key={index}
          {...block.data}
          ordinal={block.data.ordinal ?? String(index + 1).padStart(2, '0')}
          accentColor={accentColor}
        />
      );
    case 'split_text_photo':
      return <BlockSplitTextPhoto key={index} {...block.data} />;
    case 'split_photo_text':
      return <BlockSplitPhotoText key={index} {...block.data} />;
    case 'quote':
      return <BlockQuote key={index} {...block.data} />;
    default:
      return null;
  }
}

// ─── FALLBACK: auto-generate blocks from challenge/solution text ──────────
function buildFallbackBlocks(
  challenge: string,
  solution: string,
  vimeo_id: string,
  gallery_urls: string[],
): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let ordinal = 1;

  // Video is the main deliverable → show it first, right below the hero
  if (vimeo_id) {
    blocks.push({ type: 'video', data: { vimeo_id } });
  }

  const challengeSections = parseRichText(challenge);
  const solutionSections = parseRichText(solution);
  const allSections = [...challengeSections, ...solutionSections].filter((s) => s.heading || s.body);

  for (const s of allSections) {
    if (s.body) {
      blocks.push({
        type: 'text',
        data: {
          heading: s.heading || undefined,
          body: s.body,
          ordinal: String(ordinal++).padStart(2, '0'),
        },
      });
    }
  }

  // Gallery at the end
  if (gallery_urls?.length) {
    blocks.push({ type: 'gallery', data: { urls: gallery_urls, label: 'Gallery' } });
  }

  return blocks;
}

// ─── HERO VARIANTS ────────────────────────────────────────────────────────

function HeroContent({ cs, accentColor }: { cs: CaseStudy; accentColor: string }) {
  return (
    <div className="relative z-10 px-8 md:px-14 pb-24 md:pb-32 max-w-7xl">
      <div className="flex items-center gap-4 mb-8">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.22em] px-3.5 py-1.5 rounded-full font-jakarta border"
          style={{
            color: accentColor,
            borderColor: `${accentColor}50`,
            backgroundColor: `${accentColor}15`,
          }}
        >
          {AREA_LABELS[cs.area]}
        </span>
        <span className="text-[11px] text-white/25 font-jakarta tracking-[0.15em]">{cs.year}</span>
      </div>

      <h1 className="font-satoshi font-black text-[clamp(2.4rem,5.5vw,5rem)] tracking-tight uppercase text-white leading-[0.92] mb-10">
        {cs.title}
      </h1>

      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/25 font-jakarta mb-1">
            Cliente
          </p>
          <p className="text-lg md:text-xl text-white/80 font-satoshi font-bold">{cs.client}</p>
        </div>
        {cs.tagline && (
          <p className="text-sm md:text-base text-white/35 font-jakarta leading-relaxed max-w-md border-l border-white/10 pl-6">
            {cs.tagline}
          </p>
        )}
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <div className="absolute top-0 inset-x-0 pt-32 md:pt-40 px-8 md:px-14 z-20">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white/70 transition-colors font-jakarta"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Portfolio
      </Link>
    </div>
  );
}

// Full-bleed photo, text overlaid — photo NOT repeated below
function PhotoHero({ cs, accentColor }: { cs: CaseStudy; accentColor: string }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-end bg-[#07070f] overflow-hidden">
      <img
        src={cs.cover_url}
        alt={cs.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55 }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07070f] via-[#07070f]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07070f]/60 via-transparent to-transparent" />
      <BackLink />
      <HeroContent cs={cs} accentColor={accentColor} />
    </section>
  );
}

// Atmospheric blurred bg from cover/vimeo thumb, video rendered as first block
function VideoHero({
  cs,
  heroSrc,
  accentColor,
}: {
  cs: CaseStudy;
  heroSrc: string | null;
  accentColor: string;
}) {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-end bg-[#07070f] overflow-hidden">
      {heroSrc && (
        <img
          src={heroSrc}
          alt={cs.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.25, filter: 'blur(3px)', transform: 'scale(1.05)' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07070f] via-[#07070f]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07070f]/70 via-transparent to-transparent" />
      <BackLink />
      <HeroContent cs={cs} accentColor={accentColor} />
    </section>
  );
}

// Dark texture, no media
function DarkHero({ cs, accentColor }: { cs: CaseStudy; accentColor: string }) {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-end bg-[#07070f] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.5) 39px, rgba(255,255,255,0.5) 40px)`,
        }}
      />
      <BackLink />
      <HeroContent cs={cs} accentColor={accentColor} />
    </section>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function CaseStudyDetail({ cs }: { cs: CaseStudy }) {
  const accentColor = AREA_COLORS[cs.area] || '#4e92d8';
  const hasVideo = !!cs.vimeo_id;
  const hasPhoto = !!cs.cover_url;
  const heroSrc = cs.cover_url || (cs.vimeo_id ? `https://vumbnail.com/${cs.vimeo_id}.jpg` : null);

  // Use explicit content_blocks if available, otherwise auto-generate from text fields
  const blocks: ContentBlock[] =
    cs.content_blocks && cs.content_blocks.length > 0
      ? cs.content_blocks
      : buildFallbackBlocks(cs.challenge, cs.solution, cs.vimeo_id, cs.gallery_urls);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      {hasVideo ? (
        <VideoHero cs={cs} heroSrc={heroSrc} accentColor={accentColor} />
      ) : hasPhoto ? (
        <PhotoHero cs={cs} accentColor={accentColor} />
      ) : (
        <DarkHero cs={cs} accentColor={accentColor} />
      )}

      {/* ── META STRIP ───────────────────────────────────────────── */}
      <div className="bg-[#07070f] px-8 md:px-14 pt-12 pb-0">
        <div className="max-w-7xl mx-auto border-t border-b border-white/[0.06] py-6">
          <div className="flex flex-wrap gap-x-12 gap-y-4 items-start">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20 font-jakarta mb-1.5">
                Cliente
              </p>
              <p className="text-sm text-white/70 font-satoshi font-black">{cs.client}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20 font-jakarta mb-1.5">
                Area
              </p>
              <p className="text-sm font-satoshi font-black" style={{ color: accentColor }}>
                {AREA_LABELS[cs.area]}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20 font-jakarta mb-1.5">
                Anno
              </p>
              <p className="text-sm text-white/70 font-satoshi font-black">{cs.year}</p>
            </div>
            {cs.services.length > 0 && (
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20 font-jakarta mb-1.5">
                  Servizi
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cs.services.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] text-white/40 border border-white/[0.08] px-2.5 py-0.5 rounded-full font-jakarta"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── DESCRIPTION ──────────────────────────────────────────── */}
      {cs.description && (
        <section className="bg-[#07070f] px-8 md:px-14 pt-20 pb-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-[2fr_3fr] gap-8 md:gap-16 lg:gap-24">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/20 font-jakarta">
                Il Progetto
              </span>
            </div>
            <p className="font-jakarta text-white/60 text-lg md:text-xl leading-[1.85]">
              {cs.description}
            </p>
          </div>
        </section>
      )}

      {/* ── FLEXIBLE CONTENT BLOCKS ──────────────────────────────── */}
      {blocks.length > 0 && (
        <section className="bg-[#07070f] pt-8 pb-20">
          {blocks.map((block, i) => renderBlock(block, i, accentColor))}
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-[#07070f] px-8 md:px-14 py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[2fr_3fr] gap-8 md:gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 font-jakarta mb-5">
              Lavoriamo insieme
            </p>
            <h2 className="font-satoshi font-black text-4xl md:text-5xl lg:text-6xl uppercase text-white tracking-tight leading-[0.95]">
              Vuoi un risultato simile?
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-white/35 font-jakarta text-base leading-relaxed max-w-sm">
              Raccontaci il tuo progetto. Ti risponderemo entro 24 ore.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <Link
                href="/#contatti"
                className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em] px-8 py-4 rounded-full transition-all duration-200 hover:opacity-80 font-jakarta"
                style={{ backgroundImage: 'linear-gradient(135deg, #614aa2, #4e92d8)', color: '#fff' }}
              >
                Inizia ora <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white/20 hover:text-white/50 transition-colors font-jakarta"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Tutti i lavori
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
