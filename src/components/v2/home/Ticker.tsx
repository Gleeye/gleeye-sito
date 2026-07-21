'use client';

/** Marquee dei loghi clienti. */
export default function Ticker({ logos = [] }: { logos?: string[] }) {
  const doubledLogos = [...logos, ...logos];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#0a0a10] py-10 md:py-14">
      {/* client logos */}
      {logos.length > 0 && (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r from-[#0a0a10] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/4 bg-gradient-to-l from-[#0a0a10] to-transparent" />
          <div className="animate-marquee-reverse flex w-max items-center [--marquee-speed:52s] [@media(hover:hover)]:hover:[animation-play-state:paused]">
            {doubledLogos.map((logo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={`/api/loghi/${encodeURIComponent(logo)}`}
                alt=""
                loading="lazy"
                // margine a destra su OGNI logo (incluso l'ultimo): così le due
                // metà sono identiche e il loop a -50% si riaggancia senza scatti
                className="mr-16 h-7 w-auto max-w-[160px] shrink-0 object-contain opacity-40 grayscale transition-all duration-500 hover:opacity-90 hover:grayscale-0 md:mr-24 md:h-9"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
