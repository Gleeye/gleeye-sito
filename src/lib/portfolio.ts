import { getSupabase } from './supabase';

// ─── Content Blocks ────────────────────────────────────────────────────────
// Each block renders a distinct section below the hero/meta/description.
// Populate `content_blocks` in Supabase to override the default text rendering.

export type ContentBlockVideo = {
  type: 'video';
  data: { vimeo_id: string; caption?: string };
};
export type ContentBlockPhotoFull = {
  type: 'photo_full';
  data: { url: string; alt?: string; caption?: string };
};
export type ContentBlockGallery = {
  type: 'gallery';
  data: { urls: string[]; columns?: 2 | 3; label?: string };
};
export type ContentBlockText = {
  type: 'text';
  data: { heading?: string; body: string; ordinal?: string };
};
export type ContentBlockSplitTextPhoto = {
  type: 'split_text_photo';
  data: { heading?: string; body: string; url: string; alt?: string };
};
export type ContentBlockSplitPhotoText = {
  type: 'split_photo_text';
  data: { url: string; alt?: string; heading?: string; body: string };
};
export type ContentBlockQuote = {
  type: 'quote';
  data: { text: string; author?: string };
};

export type ContentBlock =
  | ContentBlockVideo
  | ContentBlockPhotoFull
  | ContentBlockGallery
  | ContentBlockText
  | ContentBlockSplitTextPhoto
  | ContentBlockSplitPhotoText
  | ContentBlockQuote;

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  client: string;
  area: 'factory' | 'identity' | 'digital';
  services: string[];
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  cover_url: string;
  vimeo_id: string;
  gallery_urls: string[];
  tags: string[];
  year: number;
  featured: boolean;
  sort_order: number;
  published: boolean;
  updated_at: string;
  // Flexible per-project layout blocks (optional — falls back to challenge/solution text)
  content_blocks: ContentBlock[] | null;
};

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('published', true)
      .order('sort_order');
    if (error || !data) return [];
    return data as CaseStudy[];
  } catch { return []; }
}

export async function getCaseStudiesByArea(area: string): Promise<CaseStudy[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('published', true)
      .eq('area', area)
      .order('sort_order');
    if (error || !data) return [];
    return data as CaseStudy[];
  } catch { return []; }
}

export async function getCaseStudiesByService(service: string): Promise<CaseStudy[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('published', true)
      .contains('services', [service])
      .order('sort_order');
    if (error || !data) return [];
    return data as CaseStudy[];
  } catch { return []; }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    if (error || !data) return null;
    return data as CaseStudy;
  } catch { return null; }
}

export async function getFeaturedCaseStudies(limit = 4): Promise<CaseStudy[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('sort_order')
      .limit(limit);
    if (error || !data) return [];
    return data as CaseStudy[];
  } catch { return []; }
}
