import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

export function getSupabase() {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error('Supabase env vars missing');
    _client = createClient(url, key);
  }
  return _client;
}

// Alias per retrocompatibilità nei componenti client
export const supabase = typeof window !== 'undefined'
  ? getSupabase()
  : null as unknown as SupabaseClient;

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
