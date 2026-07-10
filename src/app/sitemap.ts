import type { MetadataRoute } from 'next';

const BASE = 'https://gleeye.eu';

export default function sitemap(): MetadataRoute.Sitemap {
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
    { path: '/lavora-con-noi', priority: 0.5 },
    { path: '/privacy-policy', priority: 0.2 },
    { path: '/cookie-policy', priority: 0.2 },
  ];

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: r.priority,
  }));
}
