'use client';

import { useEffect, useState } from 'react';

export type TocItem = { id: string; text: string; level: number };

/* Sommario laterale sticky (solo desktop): scrollspy con IntersectionObserver
   per evidenziare la sezione corrente. Sotto le 2 voci non ha senso: si nasconde. */
export default function BlogToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (items.length < 2) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-18% 0px -72% 0px' },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav className="hidden lg:block" aria-label="Indice dell'articolo">
      <div className="sticky top-32">
        <p className="voice-mono mb-4 text-black/40">Indice</p>
        <ul className="space-y-2.5 border-l border-black/10">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  className={`-ml-px block border-l-2 py-0.5 text-[13px] leading-snug transition-colors duration-200 ${
                    it.level >= 3 ? 'pl-5' : 'pl-4'
                  } ${
                    isActive
                      ? 'border-[#4e92d8] font-semibold text-[#3f7fc4]'
                      : 'border-transparent text-black/45 hover:text-black/80'
                  }`}
                >
                  {it.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
