import { getSupabase } from './supabase';

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  client: string;
  area: 'factory' | 'identity' | 'digital' | string;
  services: string[];
  tagline: string;
  cover_url: string;
  tags: string[];
  year: number;
  sort_order: number;
  published: boolean;
  featured?: boolean;
};

/** Tutti i case study pubblicati, ordinati. Ritorna [] se Supabase non è configurato. */
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
  } catch {
    return [];
  }
}
