const words = [
  'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Retargeting',
  'Display', 'Performance Max', 'A/B Testing', 'Conversioni',
  'ROAS', 'Audience', 'Creative Testing', 'Lead Generation',
];

export default function AdvMarqueeSection() {
  const doubled = [...words, ...words];

  return (
    <div className="w-full bg-black border-y border-white/[0.06] py-5 overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee-adv 28s linear infinite' }}
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
        @keyframes marquee-adv {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
