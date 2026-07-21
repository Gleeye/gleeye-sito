'use client';

/**
 * NativeForm — renderer NATIVO del modulo di contatto dentro il sito.
 *
 * Legge la definizione del form dall'ERP (contact_forms) e la ridisegna col
 * design system del SITO (Tailwind, font Satoshi, accent-blue) — niente iframe,
 * niente vestito "glass" dell'ERP. Il cervello resta l'ERP: campi, validazione,
 * logica condizionale, honeypot e destinazione dei lead sono identici alla
 * pagina pubblica /form/:id. Cambia solo la pelle.
 *
 * Porting di PublicFormPage.jsx. Vedi formLogic.ts e useErpForm.ts.
 */

import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Check,
  AlertCircle,
  UploadCloud,
  FileText,
  X,
  Loader2,
} from 'lucide-react';
import {
  FormField,
  FormStep,
  SILENT,
  WIDTH_BASIS,
  buildSteps,
  evaluateRule,
} from './formLogic';
import { useErpForm } from './useErpForm';

type Props = {
  formId: string;
  /** Pagina del sito da cui parte il lead (es. "/factory/fotografia"). */
  sourcePage?: string;
  /** Chiamato quando l'utente chiude dopo il successo (facoltativo). */
  onDone?: () => void;
  /** Modulo protetto (reCAPTCHA): rimanda all'embed ERP invece di perdere il lead. */
  onProtectedFallback?: () => void;
};

export default function NativeForm({ formId, sourcePage, onDone, onProtectedFallback }: Props) {
  const { form, loading, error, isProtected, submit } = useErpForm(formId);

  const [values, setValues] = useState<Record<string, unknown>>({});
  const [files, setFiles] = useState<Record<string, File>>({});
  const [step, setStep] = useState(0);
  const [stepError, setStepError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  // Honeypot: fuori da `values`, così non finisce mai nel payload.
  const honeypotRef = useRef<Record<string, string>>({});

  const steps = useMemo<FormStep[]>(() => (form ? buildSteps(form) : []), [form]);
  const honeypotFields = useMemo(
    () => (form?.fields || []).filter((f) => f.type === 'honeypot'),
    [form],
  );
  const primary = form?.primary_color && form.primary_color !== '#000000' ? form.primary_color : null;

  // Reset quando cambia modulo.
  useEffect(() => {
    setStep(0);
    setValues({});
    setFiles({});
    setDone(false);
    setStepError(null);
    setSubmitError(null);
  }, [form?.id]);

  // Campo visibile? (logica condizionale runtime + esclusione SILENT)
  const isVisible = useCallback(
    (f: FormField) => {
      if (SILENT.includes(f.type)) return false;
      if (!f.logic?.enabled || !f.logic?.dependency_id) return true;
      return evaluateRule(values[f.logic.dependency_id], f.logic.operator, f.logic.value);
    },
    [values],
  );

  const setValue = (fid: string, v: unknown) => {
    setValues((s) => ({ ...s, [fid]: v }));
    setStepError(null);
  };

  const validateStep = (s: Extract<FormStep, { kind: 'fields' }>): string | null => {
    for (const f of s.fields) {
      if (!f.required || !isVisible(f)) continue;
      if (f.type === 'file') {
        if (!files[f.id]) return f.label || 'obbligatorio';
        continue;
      }
      const v = values[f.id];
      if (f.type === 'checkbox') {
        if (!Array.isArray(v) || v.length === 0) return f.label || 'obbligatorio';
        continue;
      }
      if (f.type === 'acceptance') {
        if (!v) return f.label || 'obbligatorio';
        continue;
      }
      if (v == null || String(v).trim() === '') return f.label || 'obbligatorio';
    }
    return null;
  };

  const goNext = () => {
    const cur = steps[step];
    if (cur?.kind === 'fields') {
      const missing = validateStep(cur);
      if (missing) {
        setStepError(`Compila il campo obbligatorio: “${missing}”.`);
        return;
      }
    }
    setStepError(null);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const goPrev = () => {
    setStepError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    const cur = steps[step];
    if (cur?.kind === 'fields') {
      const missing = validateStep(cur);
      if (missing) {
        setStepError(`Compila il campo obbligatorio: “${missing}”.`);
        return;
      }
    }
    setSubmitting(true);
    setSubmitError(null);

    const honeypotFilled = honeypotFields.some(
      (f) => (honeypotRef.current[f.id] || '').trim() !== '',
    );
    if (honeypotFilled && !isProtected) {
      setSubmitting(false);
      setDone(true);
      return;
    }

    // Payload: solo campi visibili e non-SILENT (checkbox → join ", ").
    const data: Record<string, string> = {};
    for (const f of form?.fields || []) {
      if (f.type === 'step' || f.type === 'file') continue;
      if (SILENT.includes(f.type)) continue;
      if (!isVisible(f)) continue;
      const v = values[f.id];
      if (v == null) continue;
      data[f.id] = Array.isArray(v) ? v.join(', ') : String(v);
    }
    // Pagina d'origine del lead (per la Ricezione nell'ERP): sotto una chiave
    // che non collide con gli id dei campi del form.
    if (sourcePage) data['_source_page'] = sourcePage;
    const visibleFiles: Record<string, File> = {};
    for (const f of form?.fields || []) {
      if (f.type === 'file' && isVisible(f) && files[f.id]) visibleFiles[f.id] = files[f.id];
    }

    const { error: err } = await submit({ data, files: visibleFiles, honeypotFilled });
    setSubmitting(false);
    if (err) {
      setSubmitError(err);
      return;
    }
    setDone(true);
  };

  const accentStyle = primary
    ? ({ '--form-accent': primary } as React.CSSProperties)
    : undefined;

  // ── Stati non-form ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Shell accentStyle={accentStyle}>
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 py-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--form-accent)]" />
          <p className="font-jakarta text-sm text-black/45">Caricamento modulo…</p>
        </div>
      </Shell>
    );
  }

  if (error || !form) {
    return (
      <Shell accentStyle={accentStyle}>
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 py-16 text-center">
          <AlertCircle className="h-10 w-10 text-black/25" />
          <h3 className="font-satoshi text-xl font-black uppercase tracking-tight text-[#0a0a10]">
            Modulo non disponibile
          </h3>
          <p className="max-w-xs font-jakarta text-sm text-black/50">{error}</p>
        </div>
      </Shell>
    );
  }

  // Modulo protetto: non perdere il lead — rimanda all'embed ERP.
  if (isProtected) {
    return (
      <Shell accentStyle={accentStyle}>
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-5 py-14 text-center">
          <AlertCircle className="h-10 w-10 text-[var(--form-accent)]" />
          <h3 className="font-satoshi text-xl font-black uppercase tracking-tight text-[#0a0a10]">
            Un attimo di verifica
          </h3>
          <p className="max-w-sm font-jakarta text-sm leading-relaxed text-black/55">
            Questo modulo usa una verifica anti-spam. Apri la versione protetta per
            inviare la tua richiesta in sicurezza.
          </p>
          {onProtectedFallback && (
            <button
              type="button"
              onClick={onProtectedFallback}
              className="group mt-1 inline-flex items-center gap-2 rounded-full bg-[#0a0a10] px-7 py-3.5 font-satoshi text-sm font-black uppercase tracking-tight text-white transition-colors hover:bg-[var(--form-accent)]"
            >
              Apri il modulo protetto
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      </Shell>
    );
  }

  if (done) {
    return (
      <Shell accentStyle={accentStyle}>
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-5 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--form-accent)]/12 text-[var(--form-accent)]">
            <Check className="h-8 w-8" strokeWidth={2.5} />
          </span>
          <h3 className="font-satoshi text-2xl font-black uppercase tracking-tight text-[#0a0a10]">
            Fatto!
          </h3>
          <p className="max-w-sm font-jakarta text-base leading-relaxed text-black/55">
            {form.success_message || 'Grazie per averci contattato!'}
          </p>
          {onDone && (
            <button
              type="button"
              onClick={onDone}
              className="mt-2 font-satoshi text-sm font-bold uppercase tracking-tight text-black/40 underline underline-offset-4 transition-colors hover:text-[var(--form-accent)]"
            >
              Chiudi
            </button>
          )}
        </div>
      </Shell>
    );
  }

  // ── Form vivo ─────────────────────────────────────────────────────────────
  const dataSteps = steps.filter((s) => s.kind === 'fields');
  const cur = steps[step];
  const isLast = step === steps.length - 1;
  const stepType = form.step_settings?.type || 'number';
  const curDataIdx =
    steps.slice(0, step + 1).filter((s) => s.kind === 'fields').length - 1;
  const progressPct =
    dataSteps.length > 1 ? (Math.max(0, curDataIdx) / (dataSteps.length - 1)) * 100 : 100;

  return (
    <Shell accentStyle={accentStyle}>
      {/* Honeypot anti-spam: invisibile all'utente, esca per i bot. */}
      {honeypotFields.map((f) => (
        <input
          key={f.id}
          type="text"
          name={f.label || 'website'}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          defaultValue=""
          onChange={(e) => {
            honeypotRef.current[f.id] = e.target.value;
          }}
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 'auto',
            width: 1,
            height: 0,
            opacity: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Intestazione modulo — il nome interno (form.name, es. "Form contatto base")
         NON è un titolo pubblico: mostriamo solo l'overline "Scrivici". Se in futuro
         serve un titolo pubblico, va aggiunto come campo dedicato lato ERP. */}
      {cur?.kind !== 'welcome' && (
        <header className="mb-8">
          <p className="voice-mono mb-3 text-[var(--form-accent)]">Scrivici</p>
          {form.description && (
            <p className="mt-3 font-jakarta text-sm leading-relaxed text-black/50">
              {form.description}
            </p>
          )}
        </header>
      )}

      {/* Stepper */}
      {cur?.kind === 'fields' && dataSteps.length > 1 && stepType !== 'none' && (
        stepType === 'progress' ? (
          <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.07]">
            <div
              className="h-full rounded-full bg-[var(--form-accent)] transition-[width] duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        ) : (
          <ol className="mb-8 flex items-center gap-2">
            {dataSteps.map((s, idx) => {
              const state = idx === curDataIdx ? 'active' : idx < curDataIdx ? 'done' : 'todo';
              return (
                <li key={idx} className="flex flex-1 items-center gap-2 last:flex-none">
                  <span
                    className={[
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-satoshi text-xs font-bold transition-colors',
                      state === 'active'
                        ? 'bg-[var(--form-accent)] text-white'
                        : state === 'done'
                          ? 'bg-[var(--form-accent)]/15 text-[var(--form-accent)]'
                          : 'bg-black/[0.06] text-black/35',
                    ].join(' ')}
                  >
                    {state === 'done' ? <Check className="h-4 w-4" strokeWidth={3} /> : idx + 1}
                  </span>
                  {idx < dataSteps.length - 1 && (
                    <span
                      className={[
                        'h-px flex-1 transition-colors',
                        idx < curDataIdx ? 'bg-[var(--form-accent)]/40' : 'bg-black/10',
                      ].join(' ')}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        )
      )}

      {/* Contenuto step */}
      {cur?.kind === 'welcome' ? (
        <section className="py-6 text-center">
          <h2 className="font-satoshi text-3xl font-black uppercase leading-[1.02] tracking-tight text-[#0a0a10]">
            {cur.title}
          </h2>
          {cur.desc && (
            <p className="mx-auto mt-4 max-w-sm font-jakarta text-base leading-relaxed text-black/55">
              {cur.desc}
            </p>
          )}
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={goNext} className={btnPrimary}>
              {cur.btn}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      ) : (
        <section>
          {cur?.kind === 'fields' && cur.title && (
            <h3 className="mb-5 font-satoshi text-lg font-black uppercase tracking-tight text-[#0a0a10]">
              {cur.title}
            </h3>
          )}

          <div className="flex flex-wrap gap-4">
            {cur?.kind === 'fields' &&
              cur.fields.map((f) => (
                <Field
                  key={f.id}
                  field={f}
                  visible={isVisible(f)}
                  value={values[f.id]}
                  file={files[f.id]}
                  onChange={(v) => setValue(f.id, v)}
                  onFile={(file) => {
                    setFiles((s) => {
                      if (!file) {
                        const next = { ...s };
                        delete next[f.id];
                        return next;
                      }
                      return { ...s, [f.id]: file };
                    });
                    setStepError(null);
                  }}
                />
              ))}
          </div>

          {(stepError || submitError) && (
            <div className="mt-5 flex items-start gap-2 rounded-2xl bg-red-50 px-4 py-3 font-jakarta text-sm text-red-600">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{stepError || submitError}</span>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? (
              <button type="button" onClick={goPrev} className={btnGhost}>
                <ArrowLeft className="h-4 w-4" />
                Indietro
              </button>
            ) : (
              <span />
            )}
            {isLast ? (
              <button type="button" onClick={handleSubmit} disabled={submitting} className={btnPrimary}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Invio…
                  </>
                ) : (
                  <>
                    Invia
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </button>
            ) : (
              <button type="button" onClick={goNext} className={btnPrimary}>
                Continua
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}
    </Shell>
  );
}

// Guscio card: bianco, arrotondato, con accent-blue di default (override da primary_color).
function Shell({
  children,
  accentStyle,
}: {
  children: React.ReactNode;
  accentStyle?: React.CSSProperties;
}) {
  return (
    <div
      className="font-jakarta text-[#0a0a10] [--form-accent:#4e92d8]"
      style={accentStyle}
    >
      {children}
    </div>
  );
}

const btnPrimary =
  'group inline-flex items-center gap-2 rounded-full bg-[#0a0a10] px-7 py-3.5 font-satoshi text-sm font-black uppercase tracking-tight text-white transition-colors hover:bg-[var(--form-accent)] disabled:cursor-not-allowed disabled:opacity-60';
const btnGhost =
  'inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-satoshi text-sm font-bold uppercase tracking-tight text-black/45 transition-colors hover:text-[#0a0a10]';

const inputBase =
  'w-full rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3.5 font-jakarta text-[15px] text-[#0a0a10] outline-none transition-colors placeholder:text-black/30 focus:border-[var(--form-accent)] focus:bg-white focus:ring-4 focus:ring-[var(--form-accent)]/12';

// ── Singolo campo ─────────────────────────────────────────────────────────
function Field({
  field: f,
  visible,
  value,
  file,
  onChange,
  onFile,
}: {
  field: FormField;
  visible: boolean;
  value: unknown;
  file?: File;
  onChange: (v: unknown) => void;
  onFile: (file: File | null) => void;
}) {
  if (!visible) return null;

  const basis = WIDTH_BASIS[f.width || '100%'] || '100%';

  const label = f.type !== 'html' && (
    <label className="mb-2 block font-satoshi text-[13px] font-bold tracking-tight text-[#0a0a10]">
      {f.label}
      {f.required && <span className="ml-0.5 text-[var(--form-accent)]">*</span>}
    </label>
  );

  let control: React.ReactNode = null;

  if (['text', 'email', 'tel', 'url', 'number', 'password', 'date', 'time'].includes(f.type)) {
    control = (
      <input
        className={inputBase}
        type={f.type}
        value={(value as string) || ''}
        placeholder={f.placeholder || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  } else if (f.type === 'textarea') {
    control = (
      <textarea
        className={`${inputBase} resize-y`}
        rows={f.rows || 4}
        value={(value as string) || ''}
        placeholder={f.placeholder || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  } else if (f.type === 'select') {
    control = (
      <select
        className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 stroke=%22%23999%22 stroke-width=%222%22 viewBox=%220 0 24 24%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11`}
        value={(value as string) || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Scegli un&apos;opzione…
        </option>
        {(f.options || []).map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  } else if (f.type === 'radio') {
    control = (
      <div className="flex flex-col gap-2.5">
        {(f.options || []).map((opt, i) => (
          <Choice key={i} selected={value === opt} onClick={() => onChange(opt)} type="radio">
            {opt}
          </Choice>
        ))}
      </div>
    );
  } else if (f.type === 'checkbox') {
    const arr = Array.isArray(value) ? (value as string[]) : [];
    const toggle = (opt: string) =>
      onChange(arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt]);
    control = (
      <div className="flex flex-col gap-2.5">
        {(f.options || []).map((opt, i) => (
          <Choice key={i} selected={arr.includes(opt)} onClick={() => toggle(opt)} type="checkbox">
            {opt}
          </Choice>
        ))}
      </div>
    );
  } else if (f.type === 'acceptance') {
    control = (
      <Choice selected={!!value} onClick={() => onChange(value ? '' : 'accettato')} type="checkbox">
        {f.placeholder || 'Sì, accetto'}
      </Choice>
    );
  } else if (f.type === 'file') {
    const maxMb = f.max_size || 10;
    const onPick = (fl?: File | null) => {
      if (!fl) return;
      if (fl.size > maxMb * 1024 * 1024) {
        alert(`Il file è troppo grande. Limite ${maxMb}MB.`);
        return;
      }
      onFile(fl);
    };
    control = (
      <label
        className={[
          'flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed px-4 py-4 transition-colors',
          file
            ? 'border-[var(--form-accent)] bg-[var(--form-accent)]/[0.06]'
            : 'border-black/15 bg-black/[0.02] hover:border-[var(--form-accent)]/60',
        ].join(' ')}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onPick(e.dataTransfer.files?.[0]);
        }}
      >
        {file ? (
          <FileText className="h-5 w-5 shrink-0 text-[var(--form-accent)]" />
        ) : (
          <UploadCloud className="h-5 w-5 shrink-0 text-black/40" />
        )}
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-jakarta text-sm font-medium text-[#0a0a10]">
            {file ? file.name : 'Scegli un file o trascinalo qui'}
          </span>
          <span className="font-jakarta text-xs text-black/40">Dimensione massima: {maxMb}MB</span>
        </span>
        {file && (
          <button
            type="button"
            className="ml-auto shrink-0 rounded-full p-1 text-black/40 hover:text-[#0a0a10]"
            onClick={(e) => {
              e.preventDefault();
              onFile(null);
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <input type="file" hidden onChange={(e) => onPick(e.target.files?.[0])} />
      </label>
    );
  } else if (f.type === 'html') {
    control = (
      <div
        className="font-jakarta text-sm leading-relaxed text-black/60 [&_a]:text-[var(--form-accent)] [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: f.html_content || '' }}
      />
    );
  }

  return (
    <div style={{ flexBasis: basis }} className="min-w-0 grow">
      {label}
      {control}
    </div>
  );
}

// Opzione radio/checkbox in stile card, coerente col sito.
function Choice({
  children,
  selected,
  onClick,
  type,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  type: 'radio' | 'checkbox';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex items-center gap-3 rounded-2xl border px-4 py-3 text-left font-jakarta text-[15px] transition-colors',
        selected
          ? 'border-[var(--form-accent)] bg-[var(--form-accent)]/[0.06] text-[#0a0a10]'
          : 'border-black/10 bg-black/[0.02] text-black/70 hover:border-black/25',
      ].join(' ')}
    >
      <span
        className={[
          'flex h-5 w-5 shrink-0 items-center justify-center border transition-colors',
          type === 'radio' ? 'rounded-full' : 'rounded-md',
          selected ? 'border-[var(--form-accent)] bg-[var(--form-accent)] text-white' : 'border-black/25',
        ].join(' ')}
      >
        {selected &&
          (type === 'radio' ? (
            <span className="h-2 w-2 rounded-full bg-white" />
          ) : (
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          ))}
      </span>
      <span>{children}</span>
    </button>
  );
}
