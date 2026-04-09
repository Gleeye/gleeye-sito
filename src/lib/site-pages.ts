export type PageStatus = 'live' | 'wip' | 'missing';

export type SitePage = {
  slug: string;
  title: string;
  area: string;
  status: PageStatus;
  path: string;
  sections: string[];
};

export const SITE_PAGES: SitePage[] = [
  {
    slug: 'homepage',
    title: 'Homepage',
    area: 'Core',
    status: 'live',
    path: '/',
    sections: ['Hero', 'Logo Ticker', 'Core Areas', 'Manifesto', 'Identity', 'Special Units', 'Contact'],
  },
  {
    slug: 'factory',
    title: 'Factory',
    area: 'Area Pages',
    status: 'live',
    path: '/factory',
    sections: ['Hero', 'Services Accordion (Video, Photo, Copy, Podcast, Grafica)'],
  },
  {
    slug: 'identity',
    title: 'Identity',
    area: 'Area Pages',
    status: 'live',
    path: '/identity',
    sections: ['Hero', 'Services Accordion'],
  },
  {
    slug: 'digital',
    title: 'Digital',
    area: 'Area Pages',
    status: 'live',
    path: '/digital',
    sections: ['Hero', 'Services Accordion'],
  },
  {
    slug: 'factory/copywriting',
    title: 'Copywriting',
    area: 'Factory',
    status: 'live',
    path: '/factory/copywriting',
    sections: ['Hero', 'Marquee', 'Positioning', 'Services', 'Stats', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA'],
  },
  {
    slug: 'factory/fotografia',
    title: 'Fotografia',
    area: 'Factory',
    status: 'live',
    path: '/factory/fotografia',
    sections: ['Hero', 'Marquee', 'Positioning', 'Services', 'Stats', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA'],
  },
  {
    slug: 'factory/grafica',
    title: 'Graphic Design',
    area: 'Factory',
    status: 'live',
    path: '/factory/grafica',
    sections: ['Hero', 'Marquee', 'Positioning', 'Services', 'Stats', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA'],
  },
  {
    slug: 'factory/video',
    title: 'Video Production',
    area: 'Factory',
    status: 'live',
    path: '/factory/video',
    sections: ['Hero', 'Marquee', 'Positioning', 'Services', 'Stats', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA'],
  },
  {
    slug: 'factory/podcast',
    title: 'Podcast',
    area: 'Landing Pages',
    status: 'live',
    path: '/podcast',
    sections: ['Hero', 'Value', 'Essence', 'Process', 'FAQ', 'Contact'],
  },
  {
    slug: 'digital/social',
    title: 'Social Media',
    area: 'Digital',
    status: 'live',
    path: '/digital/social',
    sections: ['Hero', 'Positioning', 'Services', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA'],
  },
  {
    slug: 'digital/web',
    title: 'Web Design & Dev',
    area: 'Digital',
    status: 'live',
    path: '/digital/web',
    sections: ['Hero', 'Positioning', 'Services', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA'],
  },
  {
    slug: 'digital/seo',
    title: 'SEO',
    area: 'Digital',
    status: 'live',
    path: '/digital/seo',
    sections: ['Hero', 'Positioning', 'Services', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA'],
  },
  {
    slug: 'digital/advertising',
    title: 'Advertising',
    area: 'Digital',
    status: 'live',
    path: '/digital/advertising',
    sections: ['Hero', 'Positioning', 'Services', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA'],
  },
  {
    slug: 'identity/brand-strategy',
    title: 'Brand Strategy',
    area: 'Identity',
    status: 'live',
    path: '/identity/brand-strategy',
    sections: ['Hero', 'Positioning', 'Services', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA'],
  },
  {
    slug: 'identity/naming',
    title: 'Naming',
    area: 'Identity',
    status: 'live',
    path: '/identity/naming',
    sections: ['Hero', 'Positioning', 'Services', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA'],
  },
  {
    slug: 'identity/visual-identity',
    title: 'Visual Identity',
    area: 'Identity',
    status: 'live',
    path: '/identity/visual-identity',
    sections: ['Hero', 'Positioning', 'Services', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA'],
  },
  {
    slug: 'identity/brand-guidelines',
    title: 'Brand Guidelines',
    area: 'Identity',
    status: 'live',
    path: '/identity/brand-guidelines',
    sections: ['Hero', 'Positioning', 'Services', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA'],
  },
  {
    slug: 'video-explainer',
    title: 'Video Explainer',
    area: 'Landing Pages',
    status: 'live',
    path: '/video-explainer',
    sections: ['Hero', 'Value', 'Essence', 'Process', 'FAQ', 'Contact'],
  },
  {
    slug: 'events',
    title: 'Eventi Aziendali',
    area: 'Core',
    status: 'live',
    path: '/events',
    sections: ['Hero', 'Positioning', 'Services', 'Timeline (Prima/Durante/Dopo)', 'Case Studies', 'FAQ', 'CTA'],
  },
  {
    slug: 'lavora-con-noi',
    title: 'Lavora con noi',
    area: 'Core',
    status: 'live',
    path: '/lavora-con-noi',
    sections: ['Hero', 'Form'],
  },
];

export const STATUS_LABEL: Record<PageStatus, string> = {
  live: 'Online',
  wip: 'In corso',
  missing: 'Da costruire',
};

export const STATUS_COLOR: Record<PageStatus, string> = {
  live: '#4ade80',
  wip: '#facc15',
  missing: '#f87171',
};
