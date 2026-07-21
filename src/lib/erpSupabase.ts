import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Client Supabase dell'ERP (workspace.gleeye.eu), separato dal Supabase del sito.
 *
 * Serve SOLO a leggere la *definizione* dei moduli di contatto (tabella
 * `contact_forms`, SELECT pubblica anon) e a scriverne le risposte
 * (`contact_submissions`, INSERT pubblica) + upload allegati sul bucket pubblico
 * `form-attachments`. Il "cervello" del form resta l'ERP: qui il sito legge la
 * definizione e la ridisegna col proprio design system (renderer nativo).
 *
 * Istanza distinta da `lib/supabase.ts` (progetto diverso): i due client non
 * condividono storage-key, quindi convivono senza conflitti.
 */

const ERP_URL = process.env.NEXT_PUBLIC_ERP_SUPABASE_URL;
const ERP_KEY = process.env.NEXT_PUBLIC_ERP_SUPABASE_ANON_KEY;

let _client: SupabaseClient | null = null;

export function getErpSupabase(): SupabaseClient {
  if (!ERP_URL || !ERP_KEY) {
    throw new Error('ERP Supabase env vars mancanti (NEXT_PUBLIC_ERP_SUPABASE_*)');
  }
  if (!_client) {
    _client = createClient(ERP_URL, ERP_KEY, {
      auth: {
        // Modulo pubblico anonimo: niente sessione persistita né refresh,
        // così non interferisce con l'eventuale auth del sito.
        persistSession: false,
        autoRefreshToken: false,
        storageKey: 'gleeye-erp-anon',
      },
    });
  }
  return _client;
}

export const hasErpConfig = Boolean(ERP_URL && ERP_KEY);
