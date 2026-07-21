import { getSupabase } from './supabase';

/* ————————————————————————————————————————————————————————————————
   Blog nativo — data layer. Gli articoli (ex WordPress) ora vivono nel DB del
   sito (tabella public.blog_posts) e le immagini nello storage Supabase
   (bucket blog-media, pubblico). Nessun fetch a old.gleeye.eu a runtime.
   Lettura con la chiave anon (RLS: policy anon SELECT).
   ———————————————————————————————————————————————————————————————— */

export type BlogPost = {
  wp_id: number | null;
  slug: string;
  title: string;
  excerpt: string | null;
  content_html: string;
  cover_url: string | null;
  category: string | null;
  published_at: string | null;
  modified_at: string | null;
  reading_time_min: number | null;
};

const COLS =
  'wp_id, slug, title, excerpt, content_html, cover_url, category, published_at, modified_at, reading_time_min';

/* Tutti gli articoli, dal più recente. Usato dall'indice /blog. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await getSupabase()
    .from('blog_posts')
    .select(COLS)
    .order('published_at', { ascending: false, nullsFirst: false });
  if (error) {
    console.error('[blog] getAllPosts', error.message);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

/* Un singolo articolo per slug. */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await getSupabase()
    .from('blog_posts')
    .select(COLS)
    .eq('slug', slug)
    .maybeSingle();
  if (error) {
    console.error('[blog] getPost', slug, error.message);
    return null;
  }
  return (data as BlogPost) ?? null;
}

/* Correlati per categoria, escluso l'articolo corrente. */
export async function getRelated(
  category: string | null,
  excludeSlug: string,
  limit = 3,
): Promise<BlogPost[]> {
  if (!category) return [];
  const { data, error } = await getSupabase()
    .from('blog_posts')
    .select(COLS)
    .eq('category', category)
    .neq('slug', excludeSlug)
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(limit);
  if (error) {
    console.error('[blog] getRelated', error.message);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

/* Solo gli slug (+ modified) per generateStaticParams e sitemap. */
export async function getAllSlugs(): Promise<
  { slug: string; modified_at: string | null }[]
> {
  const { data, error } = await getSupabase()
    .from('blog_posts')
    .select('slug, modified_at')
    .order('published_at', { ascending: false, nullsFirst: false });
  if (error) {
    console.error('[blog] getAllSlugs', error.message);
    return [];
  }
  return (data ?? []) as { slug: string; modified_at: string | null }[];
}
