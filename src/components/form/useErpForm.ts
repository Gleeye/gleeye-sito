'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getErpSupabase } from '@/lib/erpSupabase';
import { ContactForm, isProtectedForm } from './formLogic';

/**
 * useErpForm — carica la DEFINIZIONE di un modulo dall'ERP e ne invia le risposte.
 * Porting fedele di `usePublicForm.js` dell'ERP: i lead devono arrivare identici.
 *
 *  • form / loading / error                    → il modulo attivo
 *  • isProtected                                → true se usa reCAPTCHA (fallback)
 *  • submit({ data, files, honeypotFilled })    → invio (insert diretto)
 */

export type SubmitArgs = {
  data: Record<string, string>;
  files: Record<string, File>;
  honeypotFilled?: boolean;
  /**
   * Attribuzione ambassador (vedi lib/referral). Va nelle COLONNE dedicate della
   * submission — `ambassador_ref` e `landed_from` — non fra le risposte: non è
   * roba che ha scritto la persona, ed è da lì che l'ERP fa nascere la
   * segnalazione. Senza codice non si aggiunge niente: la riga resta identica.
   */
  referral?: { ref: string; from: string } | null;
};

export function useErpForm(id: string | null) {
  const [form, setForm] = useState<ContactForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isProtected = useMemo(() => isProtectedForm(form), [form]);

  const fetchForm = useCallback(async () => {
    if (!id) {
      setError('ID Modulo mancante.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const supabase = getErpSupabase();
      const { data, error: err } = await supabase
        .from('contact_forms')
        .select('*')
        .eq('id', id)
        .single();
      if (err || !data) throw new Error('Modulo non trovato o non più disponibile.');
      if (!data.is_active) throw new Error('Questo modulo di contatto è stato disattivato.');
      setForm({ ...data, fields: Array.isArray(data.fields) ? data.fields : [] });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Errore di caricamento.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  // Carica gli allegati su Storage e sostituisce i File con le publicUrl.
  const uploadFiles = useCallback(
    async (data: Record<string, string>, files: Record<string, File>) => {
      const supabase = getErpSupabase();
      const payload: Record<string, string> = { ...data };
      const entries = Object.entries(files || {}).filter(
        ([, file]) => file instanceof File && file.size > 0,
      );
      for (const [fieldId, file] of entries) {
        const ext = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${ext}`;
        const filePath = `${id}/${fileName}`;
        const { error: upErr } = await supabase.storage
          .from('form-attachments')
          .upload(filePath, file);
        if (upErr) throw new Error(`Errore caricamento file: ${upErr.message}`);
        const { data: pub } = supabase.storage.from('form-attachments').getPublicUrl(filePath);
        payload[fieldId] = pub.publicUrl;
      }
      return payload;
    },
    [id],
  );

  const submit = useCallback(
    async ({
      data,
      files,
      honeypotFilled = false,
      referral = null,
    }: SubmitArgs): Promise<{ error: string | null }> => {
      try {
        // Modulo PROTETTO (reCAPTCHA): il renderer nativo non emette token v3,
        // quindi NON tentiamo l'insert diretto (verrebbe scartato o passerebbe
        // senza verifica). Il chiamante mostra un fallback verso l'embed ERP —
        // il lead non si perde. Qui restituiamo un errore parlante di sicurezza.
        if (isProtected) {
          return {
            error:
              'Questo modulo richiede una verifica anti-spam non ancora supportata nel form nativo.',
          };
        }

        // Bot honeypot su modulo non protetto: successo finto, nessuna insert.
        if (honeypotFilled) return { error: null };

        const supabase = getErpSupabase();
        const payload = await uploadFiles(data, files);
        const row: Record<string, unknown> = { form_id: id, data: payload, is_read: false };
        // Nessun codice = caso normale: la insert resta quella di sempre.
        if (referral) {
          row.ambassador_ref = referral.ref;
          row.landed_from = referral.from;
        }
        const { error: insErr } = await supabase.from('contact_submissions').insert([row]);
        if (insErr) throw new Error(insErr.message);
        return { error: null };
      } catch (e) {
        return { error: e instanceof Error ? e.message : 'Invio non riuscito, riprova.' };
      }
    },
    [id, isProtected, uploadFiles],
  );

  return { form, loading, error, isProtected, submit, refetch: fetchForm };
}
