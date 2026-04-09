const words = [
  'Reportage Aziendale', 'Product Shot', 'Editorial', 'Ritratti',
  'Corporate Photography', 'Still Life', 'Food Photography', 'Architettura',
  'Interior', 'Brand Photography', 'Event Photography', 'Backstage',
];

export default function FotografiaMarqueeSection() {
  const doubled = [...words, ...words];

  return (
    <div className="w-full bg-black border-y border-white/[0.06] py-5 overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee-foto 32s linear infinite' }}
      >
        {doubled.map((word, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-satoshi font-black uppercase tracking-[0.15em] text-sm text-white/20 px-8">
              {word}
            </span>
            <span className="text-white/10 text-xs">✦</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-foto {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
