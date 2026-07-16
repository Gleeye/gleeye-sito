'use client';

const WORDS = [
  'Brand Identity',
  'Web Design',
  'Video Production',
  'Social Strategy',
  'SEO',
  'Podcast',
  'Advertising',
  'Photography',
  'Copywriting',
  'Motion Graphics',
  'Naming',
  'Events',
];

/**
 * Double marquee: services words (top, left→) + client logos (bottom, →right).
 * The two rows slide in opposite directions — a printing press in motion.
 */
export default function Ticker({ logos = [] }: { logos?: string[] }) {
  const words = [...WORDS, ...WORDS];
  const doubledLogos = [...logos, ...logos];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#0a0a10] py-10 md:py-14">
      {/* services words */}
      <div className="animate-marquee flex w-max items-center [--marquee-speed:46s]">
        {words.map((w, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="voice-display px-6 text-4xl text-white/25 md:px-10 md:text-6xl">
              {w}
            </span>
            <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0 text-[#6db5ff]" aria-hidden="true">
              <path d="M9 0 L10.8 7.2 L18 9 L10.8 10.8 L9 18 L7.2 10.8 L0 9 L7.2 7.2 Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>

      {/* client logos */}
      {logos.length > 0 && (
        <div className="relative mt-10 md:mt-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r from-[#0a0a10] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/4 bg-gradient-to-l from-[#0a0a10] to-transparent" />
          <div className="animate-marquee-reverse flex w-max items-center gap-16 pr-16 [--marquee-speed:52s] hover:[animation-play-state:paused] md:gap-24 md:pr-24">
            {doubledLogos.map((logo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={`/api/loghi/${encodeURIComponent(logo)}`}
                alt=""
                loading="lazy"
                className="h-7 w-auto max-w-[160px] shrink-0 object-contain opacity-40 grayscale transition-all duration-500 hover:opacity-90 hover:grayscale-0 md:h-9"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
