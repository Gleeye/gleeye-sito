import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/blog';
import { SITE_URL } from '@/lib/seo';

/* www: l'apex fa 308 su www, e una sitemap che dichiara l'host sbagliato manda
   Google a indicizzare URL che poi redirigono. */
const BASE = SITE_URL;

/* Gli slug dei ~120 articoli nativi (/blog/<slug>) vengono dal DB del sito
   (public.blog_posts). Rigenerato con la pagina (ISR). Nessun fetch a
   old.gleeye.eu. */

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: '', priority: 1 },
    { path: '/chi-siamo', priority: 0.8 },
    { path: '/mission-e-vision', priority: 0.6 },
    { path: '/manifesto', priority: 0.6 },
    { path: '/metodo', priority: 0.7 },
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
    { path: '/factory/podcast', priority: 0.7 },
    { path: '/copy', priority: 0.7 },
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

  const slugs = await getAllSlugs();
  const blogEntries: MetadataRoute.Sitemap = slugs.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.modified_at ? new Date(p.modified_at) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
