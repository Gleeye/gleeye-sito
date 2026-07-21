import type { MetadataRoute } from 'next';

const BASE = 'https://gleeye.eu';
const WP_API = 'https://old.gleeye.eu/wp-json/wp/v2';

/* Gli slug dei ~120 articoli nativi (/blog/<slug>) vengono dal vecchio WordPress
   via REST. Rigenerato con la pagina (ISR). Retry con backoff: il vecchio WP è
   su hosting fragile e sotto raffica chiude le connessioni. */
type WpSlug = { slug: string; modified?: string };

async function fetchJson<T>(url: string): Promise<T | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (res.ok) return (await res.json()) as T;
    } catch {
      /* rete ballerina: ritenta */
    }
    await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
  }
  return null;
}

async function getPostSlugs(): Promise<WpSlug[]> {
  const all: WpSlug[] = [];
  for (let page = 1; page <= 6; page++) {
    const posts = await fetchJson<WpSlug[]>(
      `${WP_API}/posts?per_page=100&page=${page}&_fields=slug,modified`,
    );
    if (!posts || posts.length === 0) break;
    all.push(...posts);
    if (posts.length < 100) break;
  }
  return all;
}

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: '', priority: 1 },
    { path: '/identity', priority: 0.9 },
    { path: '/digital', priority: 0.9 },
    { path: '/factory', priority: 0.9 },
    { path: '/identity/brand-strategy', priority: 0.7 },
    { path: '/identity/naming', priority: 0.7 },
    { path: '/identity/visual-identity', priority: 0.7 },
    { path: '/identity/brand-guidelines', priority: 0.7 },
    { path: '/digital/web', priority: 0.7 },
    { path: '/digital/social', priority: 0.7 },
    { path: '/digital/seo', priority: 0.7 },
    { path: '/digital/advertising', priority: 0.7 },
    { path: '/factory/video', priority: 0.7 },
    { path: '/factory/fotografia', priority: 0.7 },
    { path: '/factory/copywriting', priority: 0.7 },
    { path: '/factory/grafica', priority: 0.7 },
    { path: '/contatti', priority: 0.8 },
    { path: '/podcast', priority: 0.8 },
    { path: '/video-explainer', priority: 0.8 },
    { path: '/events', priority: 0.7 },
    { path: '/blog', priority: 0.8 },
    { path: '/lavora-con-noi', priority: 0.5 },
    { path: '/privacy-policy', priority: 0.2 },
    { path: '/cookie-policy', priority: 0.2 },
  ];

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: r.priority,
  }));

  const slugs = await getPostSlugs();
  const blogEntries: MetadataRoute.Sitemap = slugs.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.modified ? new Date(p.modified) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
