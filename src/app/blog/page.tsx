import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import { getAllPosts, type BlogPost } from '@/lib/blog';

/* ————————————————————————————————————————————————————————————————
   Blog nativo — INDICE (/blog). Magazine dei ~120 articoli (ex WordPress) resi
   dentro il Next col design del sito. I contenuti ora vivono nel DB del sito
   (public.blog_posts) e le immagini nello storage Supabase (bucket blog-media).
   Nessun fetch a old.gleeye.eu a runtime. Un post in evidenza + griglia di card;
   ognuna linka /blog/<slug> (rotta [slug]).

   ⚠️ Il routing è aperto dal middleware (src/middleware.ts, blocco "blog
   nativo"): /blog esatto è servito dal Next, le tassonomie /blog/category|tag|
   author restano su old.gleeye.eu.
   ———————————————————————————————————————————————————————————————— */

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Idee, metodo e visione sulla comunicazione d’impresa. Il magazine di Gleeye: branding, marketing digitale e produzione di contenuti.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Gleeye',
    description:
      'Idee, metodo e visione sulla comunicazione d’impresa. Il magazine di Gleeye.',
    type: 'website',
  },
};

/* ——— helpers (allineati a blog/[slug]/page.tsx) ——— */

function readingMinutes(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/* Tinta di categoria: stessa mappa deterministica del template articolo,
   così l'occhiello e i fallback copertina combaciano tra indice e articolo. */
const CATEGORY_TINTS: [string, string][] = [
  ['#4e92d8', '#614aa2'],
  ['#6db5ff', '#4e92d8'],
  ['#614aa2', '#9b7bff'],
  ['#4e92d8', '#9b7bff'],
];

function tintFor(category: string | null): { c1: string; c2: string } {
  const [d1, d2] = CATEGORY_TINTS[0];
  if (!category) return { c1: d1, c2: d2 };
  let h = 0;
  for (let i = 0; i < category.length; i++)
    h = (h * 31 + category.charCodeAt(i)) >>> 0;
  const [c1, c2] = CATEGORY_TINTS[h % CATEGORY_TINTS.length];
  return { c1, c2 };
}

type CardData = {
  slug: string;
  title: string;
  cover?: string;
  coverAlt: string;
  category: string | null;
  minutes: number;
  c1: string;
  c2: string;
};

function toCard(post: BlogPost): CardData {
  const title = post.title;
  const category = post.category;
  const { c1, c2 } = tintFor(category);
  return {
    slug: post.slug,
    title,
    cover: post.cover_url ?? undefined,
    coverAlt: title,
    category,
    minutes: post.reading_time_min ?? readingMinutes(post.content_html),
    c1,
    c2,
  };
}

/* ——— card griglia ——— */

function PostCard({ post }: { post: CardData }) {
  const duo = `linear-gradient(130deg, ${post.c1}, ${post.c2})`;
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative mb-5 aspect-[3/2] overflow-hidden rounded-xl bg-[#0a0a10]/5">
        {post.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover}
            alt={post.coverAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grain h-full w-full" style={{ background: duo }} />
        )}
      </div>
      <div className="flex items-center gap-3">
        {post.category && (
          <p className="voice-mono text-black/40">{post.category}</p>
        )}
        <span className="ml-auto font-jakarta text-xs text-black/35">
          {post.minutes} min
        </span>
      </div>
      <h3 className="voice-serif mt-2 text-xl leading-snug text-[#0a0a10] transition-colors group-hover:text-[#3f7fc4] md:text-2xl">
        {post.title}
      </h3>
    </Link>
  );
}

/* ——— pagina ——— */

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const cards = posts.map(toCard);
  const featured = cards[0];
  const rest = cards.slice(1);

  return (
    <>
      <Header />
      <main className="bg-[#F8F9FA] text-[#0a0a10]">
        {/* ——— INTESTAZIONE ——— */}
        <section className="relative overflow-hidden border-b border-black/10 px-5 pb-14 pt-32 md:px-10 md:pb-20 md:pt-44">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(10,10,16,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,16,0.06) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              maskImage:
                'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 78%)',
              WebkitMaskImage:
                'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 78%)',
            }}
          />
          <div className="relative mx-auto max-w-6xl">
            <p className="voice-mono mb-6 text-black/40">Il magazine</p>
            <h1
              className="voice-serif max-w-4xl text-[3rem] leading-[1.02] tracking-[-0.01em] text-[#0a0a10] md:text-[6rem]"
              style={{ fontWeight: 600 }}
            >
              Idee sulla comunicazione d’impresa
            </h1>
            <p className="mt-7 max-w-xl font-jakarta text-base leading-relaxed text-black/55 md:text-lg">
              Branding, marketing digitale e produzione di contenuti. Metodo e
              visione, un articolo alla volta.
            </p>
          </div>
        </section>

        {posts.length === 0 ? (
          <section className="mx-auto max-w-6xl px-5 py-32 text-center md:px-10">
            <p className="voice-serif text-2xl text-black/50">
              Gli articoli tornano tra poco.
            </p>
          </section>
        ) : (
          <>
            {/* ——— IN EVIDENZA ——— */}
            {featured && (
              <section className="px-5 pt-14 md:px-10 md:pt-20">
                <div className="mx-auto max-w-6xl">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#0a0a10]/5">
                      {featured.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={featured.cover}
                          alt={featured.coverAlt}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div
                          className="grain h-full w-full"
                          style={{
                            background: `linear-gradient(130deg, ${featured.c1}, ${featured.c2})`,
                          }}
                        />
                      )}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#4e92d8] to-transparent opacity-70" />
                    </div>
                    <div>
                      <div className="mb-5 flex items-center gap-3">
                        <span className="voice-mono rounded-full bg-[#0a0a10] px-3 py-1.5 text-[#6db5ff]">
                          In evidenza
                        </span>
                        {featured.category && (
                          <span className="voice-mono text-black/40">
                            {featured.category}
                          </span>
                        )}
                      </div>
                      <h2
                        className="voice-serif text-[2rem] leading-[1.06] tracking-[-0.01em] text-[#0a0a10] transition-colors group-hover:text-[#3f7fc4] md:text-[3.2rem]"
                        style={{ fontWeight: 600 }}
                      >
                        {featured.title}
                      </h2>
                      <p className="mt-6 font-jakarta text-sm text-black/45">
                        {featured.minutes} min di lettura
                      </p>
                    </div>
                  </Link>
                </div>
              </section>
            )}

            {/* ——— GRIGLIA ——— */}
            <section className="px-5 py-16 md:px-10 md:py-24">
              <div className="mx-auto max-w-6xl">
                <div className="mb-10 flex items-baseline justify-between border-t border-black/10 pt-8">
                  <p className="voice-mono text-black/40">Tutti gli articoli</p>
                  <p className="font-jakarta text-xs text-black/35">
                    {cards.length} articoli
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ——— CTA ——— */}
        <section className="px-5 pb-24 md:px-10">
          <div className="mx-auto max-w-6xl rounded-3xl bg-[#0a0a10] px-8 py-12 text-[#f8f9fa] md:px-14 md:py-16">
            <p className="voice-mono mb-4 text-[#6db5ff]">Parliamone</p>
            <h2 className="font-satoshi text-2xl font-black leading-tight tracking-tight md:text-4xl">
              Hai un progetto di marketing da mettere a fuoco?
            </h2>
            <p className="mt-4 max-w-md font-jakarta text-white/60">
              Portiamo la stessa lucidità di questi articoli dentro il tuo brand.
              Partiamo dalle domande giuste.
            </p>
            <Link
              href="/contatti"
              className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#f8f9fa] px-8 py-4 font-satoshi text-sm font-bold uppercase tracking-wide text-[#0a0a10]"
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#4e92d8] to-[#614aa2] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-white">
                Parliamo del tuo progetto
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
