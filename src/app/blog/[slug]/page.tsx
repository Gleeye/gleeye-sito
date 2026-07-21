import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import BlogReveal from './BlogReveal';
import BlogToc, { type TocItem } from './BlogToc';
import HeroCover from './HeroCover';
import { getPost, getRelated, getAllSlugs, type BlogPost } from '@/lib/blog';
import '../blog-prose.css';

/* ————————————————————————————————————————————————————————————————
   Blog nativo — articolo. I contenuti vivono nel DB del sito
   (public.blog_posts) e le immagini nello storage Supabase (bucket blog-media).
   Nessun fetch a old.gleeye.eu a runtime. Template editoriale: hero magazine
   (titolo sulla foto), sommario laterale sticky, reveal allo scroll, correlati.

   generateStaticParams pre-genera tutti i 120 slug al build (SSG). Con dati nel
   nostro DB non c'è più il vincolo del vecchio hosting fragile.
   ———————————————————————————————————————————————————————————————— */

/* SSG completo dai 120 slug nel DB; ISR orario per riflettere eventuali
   modifiche fatte dal gestionale. dynamicParams: uno slug nuovo viene reso
   alla prima visita. */
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

/* ——— helpers ——— */

function readingMinutes(html: string): number {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean)
    .length;
  return Math.max(1, Math.round(words / 200));
}

/* Tinta di categoria (Livello 3): ogni categoria ha una coppia di accenti
   stabile, sempre dentro la palette Gleeye. Guida il duotone della copertina,
   l'iride WebGL di fallback e l'occhiello. Deterministica → la stessa categoria
   ha sempre la stessa tinta su tutti i 120. */
const CATEGORY_TINTS: [string, string][] = [
  ['#4e92d8', '#614aa2'], // blu → viola (default)
  ['#6db5ff', '#4e92d8'], // azzurri
  ['#614aa2', '#9b7bff'], // viola
  ['#4e92d8', '#9b7bff'], // blu → lilla
];

function tintFor(category: string | null): { c1: string; c2: string } {
  const [d1, d2] = CATEGORY_TINTS[0];
  if (!category) return { c1: d1, c2: d2 };
  let h = 0;
  for (let i = 0; i < category.length; i++) h = (h * 31 + category.charCodeAt(i)) >>> 0;
  const [c1, c2] = CATEGORY_TINTS[h % CATEGORY_TINTS.length];
  return { c1, c2 };
}

function slugifyHeading(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&[^;]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function decodeEntities(input: string): string {
  return input
    .replace(/&#8217;|&#039;|&#39;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

/* Inietta un id su ogni titolo (h2/h3/h4) e restituisce la lista per il TOC. */
function processContent(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(
    /<h([2-4])([^>]*)>([\s\S]*?)<\/h\1>/g,
    (m, lvl: string, attrs: string, inner: string) => {
      const text = decodeEntities(inner.replace(/<[^>]+>/g, '').trim());
      if (!text) return m;
      let id = slugifyHeading(text) || 'sezione';
      const base = id;
      let n = 2;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);
      toc.push({ id, text, level: Number(lvl) });
      const cleanAttrs = attrs.replace(/\s+id="[^"]*"/, '');
      return `<h${lvl}${cleanAttrs} id="${id}">${inner}</h${lvl}>`;
    },
  );
  return { html: out, toc };
}

/* ——— metadata ——— */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Articolo' }; // layout applica "%s — Gleeye"
  const title = post.title;
  const description = (post.excerpt ?? '').slice(0, 160);
  const cover = post.cover_url ?? undefined;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      images: cover ? [cover] : undefined,
    },
  };
}

/* ——— card articolo correlato ——— */

function RelatedCard({ post }: { post: BlogPost }) {
  const title = post.title;
  const cover = post.cover_url ?? undefined;
  const category = post.category;
  const { c1, c2 } = tintFor(category);
  const duo = `linear-gradient(130deg, ${c1}, ${c2})`;
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative mb-4 aspect-[3/2] overflow-hidden rounded-xl bg-[#0a0a10]/5">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full w-full" style={{ background: duo }} />
        )}
      </div>
      {category && <p className="voice-mono mb-2 text-black/40">{category}</p>}
      <h3 className="voice-serif text-xl leading-snug text-[#0a0a10] transition-colors group-hover:text-[#3f7fc4]">
        {title}
      </h3>
    </Link>
  );
}

/* ——— pagina ——— */

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const title = post.title;
  const category = post.category;
  const cover = post.cover_url ?? undefined;
  const coverAlt = title;
  const minutes = post.reading_time_min ?? readingMinutes(post.content_html);
  const { html, toc } = processContent(post.content_html);
  const related = await getRelated(category, slug);
  const tint = tintFor(category);

  return (
    <>
      <Header />
      <main className="bg-[#F8F9FA] text-[#0a0a10]">
        {/* ——— HERO magazine: titolo sulla foto ——— */}
        <section className="relative flex min-h-[82svh] flex-col justify-end overflow-hidden bg-[#0a0a10] md:min-h-[88svh]">
          <HeroCover src={cover} alt={coverAlt} c1={tint.c1} c2={tint.c2} />
          {/* scrim dal basso + velo piatto: il titolo resta leggibile anche
              sopra le copertine chiare (molte foto WP lo sono) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05050a] via-[#05050a]/80 to-[#05050a]/25" />
          <div className="pointer-events-none absolute inset-0 bg-[#05050a]/15" />
          <div className="grain pointer-events-none absolute inset-0" />
          {/* hairline brand in fondo */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#4e92d8] to-transparent opacity-70" />

          <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-14 pt-32 md:px-10 md:pb-20 md:pt-40">
            {category && (
              <p className="voice-mono mb-5 text-[#6db5ff]">{category}</p>
            )}
            <h1
              className="voice-serif max-w-4xl text-[2.6rem] leading-[1.05] tracking-[-0.01em] text-white md:text-[4.6rem] md:leading-[1.01]"
              style={{ fontWeight: 600 }}
            >
              {title}
            </h1>
            <p className="mt-7 font-jakarta text-sm text-white/55">
              {minutes} min di lettura
            </p>
          </div>
        </section>

        {/* ——— CORPO + SOMMARIO ——— */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-14 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[220px_minmax(0,1fr)]">
          <BlogToc items={toc} />
          <article className="min-w-0 max-w-2xl">
            <BlogReveal html={html} />
          </article>
        </div>

        {/* ——— CORRELATI ——— */}
        {related.length > 0 && (
          <section className="border-t border-black/10 px-5 py-16 md:px-10 md:py-24">
            <div className="mx-auto max-w-6xl">
              <p className="voice-mono mb-10 text-black/40">Continua a leggere</p>
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <RelatedCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ——— CTA ——— */}
        <section className="px-5 pb-24 md:px-10">
          <div className="mx-auto max-w-6xl rounded-3xl bg-[#0a0a10] px-8 py-12 text-[#f8f9fa] md:px-14 md:py-16">
            <p className="voice-mono mb-4 text-[#6db5ff]">Parliamone</p>
            <h2 className="font-satoshi text-2xl font-black leading-tight tracking-tight md:text-4xl">
              Hai un progetto di marketing da mettere a fuoco?
            </h2>
            <p className="mt-4 max-w-md font-jakarta text-white/60">
              Portiamo la stessa lucidità di questo articolo dentro il tuo brand.
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
