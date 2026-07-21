/**
 * formLogic — logica pura del renderer nativo, portata 1:1 dall'ERP
 * (PublicFormPage.jsx + usePublicForm.js). Nessun CSS, nessun React: solo
 * costruzione step, validazione, logica condizionale e honeypot. Il "cervello"
 * (quali campi, dove finiscono i lead) resta identico all'ERP; il sito cambia
 * solo il vestito.
 */

export type FormField = {
  id: string;
  type: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  width?: string;
  options?: string[];
  rows?: number;
  html_content?: string;
  max_size?: number;
  logic?: {
    enabled?: boolean;
    dependency_id?: string;
    operator?: string;
    value?: string;
  };
};

export type ContactForm = {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  success_message?: string;
  has_welcome_screen?: boolean;
  welcome_title?: string;
  welcome_description?: string;
  welcome_button_text?: string;
  step_settings?: { type?: string; shape?: string };
  primary_color?: string | null;
  is_active?: boolean;
};

export type FormStep =
  | { kind: 'welcome'; title: string; desc?: string; btn: string }
  | { kind: 'fields'; title: string; fields: FormField[] };

// Campi non renderizzati come domanda (anti-spam / tecnici).
export const SILENT = ['hidden', 'honeypot', 'recaptcha', 'recaptcha_v3'];

// I separatori type==='step' dividono i campi in step; opzionale welcome screen.
export function buildSteps(form: ContactForm): FormStep[] {
  const steps: FormStep[] = [];
  if (form.has_welcome_screen && form.welcome_title) {
    steps.push({
      kind: 'welcome',
      title: form.welcome_title,
      desc: form.welcome_description,
      btn: form.welcome_button_text || 'Inizia',
    });
  }
  let group: { kind: 'fields'; title: string; fields: FormField[] } = {
    kind: 'fields',
    title: '',
    fields: [],
  };
  for (const f of form.fields || []) {
    if (f.type === 'step') {
      if (group.fields.length) steps.push(group);
      group = { kind: 'fields', title: f.label || '', fields: [] };
    } else {
      group.fields.push(f);
    }
  }
  if (group.fields.length) steps.push(group);
  return steps;
}

// Traduce la larghezza colonna in flex-basis, scalando per il gap (16px) così i
// campi affiancati (50/33/25/20%) stanno sulla stessa riga senza andare a capo.
export const WIDTH_BASIS: Record<string, string> = {
  '100%': '100%',
  '50%': 'calc(50% - 8px)',
  '33%': 'calc(33.333% - 11px)',
  '25%': 'calc(25% - 12px)',
  '20%': 'calc(20% - 13px)',
};

// Valuta la regola di logica condizionale (identica all'ERP).
export function evaluateRule(
  depVal: unknown,
  operator: string | undefined,
  targetVal: string | undefined,
): boolean {
  const d = (Array.isArray(depVal) ? depVal.join(',') : depVal || '')
    .toString()
    .toLowerCase()
    .trim();
  const t = (targetVal || '').toString().toLowerCase().trim();
  if (!d && operator !== 'not_empty') return false;
  switch (operator) {
    case 'equals':
      return d === t;
    case 'not_equals':
      return d !== t;
    case 'contains':
      return d.includes(t);
    case 'not_empty':
      return d.length > 0;
    default:
      return false;
  }
}

// Un modulo è "protetto" se tra i suoi campi c'è un reCAPTCHA.
export function isProtectedForm(form: ContactForm | null): boolean {
  return (form?.fields || []).some(
    (f) => f.type === 'recaptcha' || f.type === 'recaptcha_v3',
  );
}
