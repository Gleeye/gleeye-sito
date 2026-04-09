import { createClient } from '@supabase/supabase-js';

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

export type SiteContent = {
  id: string;
  page_slug: string;
  section_key: string;
  field_key: string;
  content: string;
  updated_at: string;
};

export type CopyGeneration = {
  id: string;
  page_slug: string | null;
  section_key: string | null;
  user_prompt: string;
  result: string;
  saved: boolean;
  created_at: string;
};
