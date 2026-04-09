'use client';

import { useState, useEffect } from 'react';
import { Copy, Save, Check, LogOut, ChevronDown, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PAGES = [
  { slug: 'factory/copywriting', label: 'Factory — Copywriting' },
  { slug: 'factory/fotografia', label: 'Factory — Fotografia' },
  { slug: 'factory/grafica', label: 'Factory — Grafica' },
  { slug: 'factory/video', label: 'Factory — Video' },
  { slug: 'factory/podcast', label: 'Factory — Podcast' },
  { slug: 'digital/social', label: 'Digital — Social' },
  { slug: 'digital/web', label: 'Digital — Web' },
  { slug: 'digital/seo', label: 'Digital — SEO' },
  { slug: 'digital/advertising', label: 'Digital — Advertising' },
  { slug: 'identity/brand-strategy', label: 'Identity — Brand Strategy' },
  { slug: 'identity/naming', label: 'Identity — Naming' },
  { slug: 'identity/visual-identity', label: 'Identity — Visual Identity' },
  { slug: 'identity/brand-guidelines', label: 'Identity — Brand Guidelines' },
  { slug: 'homepage', label: 'Homepage' },
];

const SECTIONS = ['Hero', 'Positioning', 'Services', 'Process', 'For Who', 'Why Gleeye', 'FAQ', 'CTA', 'Stats', 'Generale'];

const QUICK_REQUESTS = [
  'Scrivi headline e subheadline per questa sezione',
  'Scrivi il corpo testo principale (2 paragrafi)',
  'Genera 3 varianti del testo CTA',
  'Scrivi le FAQ per questo servizio (5 domande)',
  'Crea la sezione "Per chi è" con 3 punti',
  'Scrivi il copy SEO per questa pagina (title, description, intro)',
  'Riscrivi questo testo in tono più diretto e asciutto',
  'Scrivi la sezione "Come lavoriamo" con 4 step',
];

const BRAND_CONTEXT = `Stai scrivendo copy per il sito di Gleeye, agenzia di comunicazione a Genova.

BRAND:
- Gleeye = "Glee to eye" — architetti di percezioni, non semplici esecutori
- Modello ibrido: Boutique (strategia, qualità) + Factory (produzione scalabile)
- 3 aree: Identity (brand), Digital (web/social/seo/adv), Studio/Factory (video, foto, copy, podcast, grafica)

TONO DI VOCE:
- Asciutto, diretto, chirurgico — zero fuffa e zero riempitivi
- Autorevole ma accessibile, mai accademico
- Frasi brevi. Italiano corretto. No anglicismi inutili.
- MAI usare: "soluzioni su misura", "a 360 gradi", "eccellenza", "innovativo"

STILE HEADING: Satoshi Black, uppercase, tracking tight
STILE BODY: Plus Jakarta Sans Medium, leading relaxed
COLORI BRAND: Sky Blue #4e92d8, Deep Purple #614aa2`;

export default function AdminCopyPage() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState(PAGES[0].slug);
  const [selectedSection, setSelectedSection] = useState('');
  const [request, setRequest] = useState('');
  const [extraContext, setExtraContext] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [savedItems, setSavedItems] = useState<Array<{ page: string; section: string; content: string; id: string }>>([]);
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);

  // Load saved items on mount
  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSavedItems(data.map((d: any) => ({
            id: d.id,
            page: d.page_slug,
            section: d.section_key,
            content: d.content,
          })));
        }
      });
  }, []);

  const buildPrompt = () => {
    const page = PAGES.find(p => p.slug === selectedPage)?.label || selectedPage;
    const lines = [
      BRAND_CONTEXT,
      '',
      '---',
      '',
      `PAGINA: ${page}`,
      selectedSection ? `SEZIONE: ${selectedSection}` : '',
      extraContext ? `CONTESTO EXTRA: ${extraContext}` : '',
      '',
      `RICHIESTA: ${request}`,
    ].filter(l => l !== undefined && !(l === '' && !selectedSection && !extraContext));

    return lines.join('\n').trim();
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(buildPrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!result.trim()) return;
    setSaving(true);
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page_slug: selectedPage,
        section_key: selectedSection || 'generale',
        field_key: `saved_${Date.now()}`,
        content: result,
      }),
    });
    setSaving(false);
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2000);
    // Refresh list
    const updated = await fetch('/api/admin/content').then(r => r.json());
    if (Array.isArray(updated)) {
      setSavedItems(updated.map((d: any) => ({ id: d.id, page: d.page_slug, section: d.section_key, content: d.content })));
    }
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/admin/content', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setSavedItems(prev => prev.filter(i => i.id !== id));
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#08080C] text-white flex flex-col">

      {/* Header */}
      <header className="border-b border-white/[0.07] px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <img src="/brand/logo bianco.png" alt="Gleeye" className="h-8" />
          <span className="font-satoshi text-[10px] uppercase tracking-[0.2em] text-white/20">Copy Studio</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-white/25 hover:text-white/50 transition-colors">
          <LogOut size={13} />
          <span className="font-satoshi text-[9px] uppercase tracking-[0.15em]">Esci</span>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Left: prompt builder */}
        <div className="flex-1 flex flex-col p-6 gap-5 overflow-y-auto max-w-2xl border-r border-white/[0.07]">

          <div>
            <h1 className="font-satoshi font-black uppercase tracking-tight text-lg text-white mb-1">
              Generatore di prompt
            </h1>
            <p className="font-jakarta text-xs text-white/30 leading-relaxed">
              Configura la richiesta, copia il prompt, incollalo in Claude e poi salva il risultato qui sotto.
            </p>
          </div>

          {/* Page + Section */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1.5">Pagina</label>
              <div className="relative">
                <select
                  value={selectedPage}
                  onChange={e => setSelectedPage(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white font-jakarta text-xs appearance-none focus:outline-none focus:border-white/25 pr-7"
                >
                  {PAGES.map(p => (
                    <option key={p.slug} value={p.slug} className="bg-[#12121A]">{p.label}</option>
                  ))}
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1.5">Sezione</label>
              <div className="relative">
                <select
                  value={selectedSection}
                  onChange={e => setSelectedSection(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white font-jakarta text-xs appearance-none focus:outline-none focus:border-white/25 pr-7"
                >
                  <option value="" className="bg-[#12121A]">— Nessuna —</option>
                  {SECTIONS.map(s => <option key={s} value={s} className="bg-[#12121A]">{s}</option>)}
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Quick requests */}
          <div>
            <label className="block font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25 mb-2">Richieste rapide</label>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_REQUESTS.map(q => (
                <button key={q} onClick={() => setRequest(q)}
                  className={`px-2.5 py-1 rounded-md font-jakarta text-[11px] transition-all duration-150 ${request === q ? 'bg-white/12 text-white border border-white/20' : 'bg-white/[0.03] text-white/35 border border-white/[0.05] hover:bg-white/[0.06] hover:text-white/60'}`}>
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Custom request */}
          <div>
            <label className="block font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1.5">La tua richiesta</label>
            <textarea value={request} onChange={e => setRequest(e.target.value)}
              placeholder="Es: Scrivi il testo introduttivo della sezione hero, tono diretto, max 2 righe..."
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white font-jakarta text-sm placeholder-white/15 focus:outline-none focus:border-white/25 resize-none" />
          </div>

          {/* Extra context */}
          <div>
            <label className="block font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1.5">Contesto extra (opzionale)</label>
            <textarea value={extraContext} onChange={e => setExtraContext(e.target.value)}
              placeholder="Es: Il cliente è nel settore moda, target 25-40 anni, vuole distinguersi dai competitor..."
              rows={2}
              className="w-full bg-white/[0.04] border border-white/[0.07] rounded-lg px-4 py-3 text-white/60 font-jakarta text-xs placeholder-white/15 focus:outline-none focus:border-white/20 resize-none" />
          </div>

          {/* Copy prompt button */}
          <button onClick={handleCopyPrompt} disabled={!request.trim()}
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-satoshi font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-30"
            style={{ background: copied ? 'rgba(78,146,216,0.2)' : 'linear-gradient(135deg, #614aa2, #4e92d8)', border: copied ? '1px solid rgba(78,146,216,0.4)' : 'none' }}>
            {copied ? <><Check size={13} /> Prompt copiato!</> : <><Copy size={13} /> Copia prompt per Claude</>}
          </button>

          <div className="border-t border-white/[0.05] pt-4">
            <label className="block font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1.5">
              Incolla qui la risposta di Claude
            </label>
            <textarea value={result} onChange={e => setResult(e.target.value)}
              placeholder="Incolla qui il copy generato da Claude..."
              rows={8}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white font-jakarta text-sm placeholder-white/15 focus:outline-none focus:border-white/25 resize-none" />
            <button onClick={handleSave} disabled={!result.trim() || saving}
              className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-lg font-satoshi text-[9px] uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-30 bg-white/[0.06] hover:bg-white/10 text-white/60 hover:text-white">
              {savedOk ? <><Check size={12} className="text-green-400" /> Salvato!</> : saving ? 'Salvo...' : <><Save size={12} /> Salva in Supabase</>}
            </button>
          </div>
        </div>

        {/* Right: saved items */}
        <div className="w-80 flex flex-col p-5 gap-4 overflow-y-auto shrink-0">
          <h2 className="font-satoshi font-black uppercase tracking-tight text-sm text-white/60">
            Copy salvati ({savedItems.length})
          </h2>

          {savedItems.length === 0 ? (
            <p className="font-jakarta text-xs text-white/20 leading-relaxed">
              Nessun copy salvato ancora. Genera e salva il tuo primo testo.
            </p>
          ) : (
            <div className="space-y-3">
              {savedItems.map(item => (
                <div key={item.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 group">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="block font-satoshi text-[9px] uppercase tracking-[0.15em] text-white/40">{item.page}</span>
                      {item.section && <span className="block font-satoshi text-[9px] uppercase tracking-[0.1em] text-white/20">{item.section}</span>}
                    </div>
                    <button onClick={() => handleDelete(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <p className="font-jakarta text-xs text-white/50 leading-relaxed line-clamp-4">{item.content}</p>
                  <button onClick={() => navigator.clipboard.writeText(item.content)}
                    className="mt-2 font-satoshi text-[9px] uppercase tracking-[0.1em] text-white/20 hover:text-white/50 transition-colors">
                    Copia
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
