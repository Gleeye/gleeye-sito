"use client";

/**
 * PageWidgetOverlay — pulsante-overlay per-pagina.
 *
 * Legge dall'ERP (RPC pubblica get_page_widgets) quali "attacchi" sono stati
 * assegnati alla pagina corrente e mostra uno o due pulsanti flottanti:
 *  - Modulo di contatto  -> apre il RENDERER NATIVO (NativeForm) in overlay.
 *                           Il sito legge la definizione del form dall'ERP e la
 *                           ridisegna col proprio design system: niente iframe,
 *                           niente vestito "glass". Il cervello resta l'ERP.
 *  - Prenotazione        -> apre /prenota dell'ERP in iframe (con ?embed=true,
 *                           che toglie logo/titolo). Non ridisegnata: va già bene.
 *
 * Il governo dell'assegnazione vive nell'ERP (vista /sito). Qui si legge e basta.
 * Il trigger (pulsanti flottanti) è volutamente lasciato com'era: la sua
 * collocazione è una scelta di design ancora aperta.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NativeForm from "@/components/form/NativeForm";

type Widgets = {
  route: string;
  contact_form_id: string | null;
  contact_form_name: string | null;
  contact_button_label: string | null;
  booking_item_id: string | null;
  booking_item_name: string | null;
  booking_button_label: string | null;
};

const ERP_URL = process.env.NEXT_PUBLIC_ERP_SUPABASE_URL;
const ERP_KEY = process.env.NEXT_PUBLIC_ERP_SUPABASE_ANON_KEY;
const ERP_APP = process.env.NEXT_PUBLIC_ERP_APP_URL;

export default function PageWidgetOverlay() {
  const pathname = usePathname();
  const [w, setW] = useState<Widgets | null>(null);
  const [open, setOpen] = useState<null | "form" | "booking">(null);
  // Modulo protetto (reCAPTCHA): il renderer nativo rimanda all'embed ERP.
  const [formFallback, setFormFallback] = useState(false);

  useEffect(() => {
    if (!ERP_URL || !ERP_KEY) return;
    let alive = true;
    setW(null);
    setOpen(null);
    fetch(`${ERP_URL}/rest/v1/rpc/get_page_widgets`, {
      method: "POST",
      headers: {
        apikey: ERP_KEY,
        Authorization: `Bearer ${ERP_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_route: pathname }),
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((rows) => {
        if (!alive) return;
        const row = Array.isArray(rows) ? rows[0] : null;
        if (row && (row.contact_form_id || row.booking_item_id)) setW(row);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [pathname]);

  const close = () => {
    setOpen(null);
    setFormFallback(false);
  };

  // Blocca lo scroll di fondo mentre il modal è aperto.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Chiudi con ESC.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // ── Aggancio dei CTA editoriali DENTRO la pagina ──────────────────────────
  // I pulsanti di contatto del sito ("Parliamone / Scrivici / Contattaci" →
  // /contatti, oppure "Scrivici una mail" / l'indirizzo → mailto:info@gleeye.eu)
  // vengono intercettati e aprono in overlay ciò che l'ERP ha assegnato a QUELLA
  // pagina: il form nativo se presente, altrimenti la prenotazione. Zero
  // modifiche ai componenti editoriali: i link restano lì e funzionano come
  // fallback (JS off o pagina senza attacchi).
  //
  // Regola: agganciamo SOLO i link dentro <main> (il contenuto della pagina).
  // Così restano navigazione normale l'header, il footer e il menu a scomparsa
  // (che vivono in <header>/<footer>/<aside>, fuori da <main>).
  useEffect(() => {
    if (typeof document === "undefined") return;
    const hasContact = !!w?.contact_form_id;
    const hasBooking = !!w?.booking_item_id;
    if (!hasContact && !hasBooking) return;

    const onClick = (e: MouseEvent) => {
      // Rispetta ctrl/cmd-click, tasto centrale, target=_blank: apri come sempre.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      if (a.target && a.target !== "_self") return;
      if (!a.closest("main")) return; // solo CTA nel contenuto, non nella chrome

      const href = a.getAttribute("href") || "";
      const isContactCta =
        href === "/contatti" ||
        href.endsWith("/contatti") ||
        href === "#contatti" ||
        href.endsWith("#contatti") ||
        href.toLowerCase().startsWith("mailto:info@gleeye.eu");
      if (!isContactCta) return;

      e.preventDefault();
      e.stopPropagation();
      setFormFallback(false);
      // Preferenza: form se assegnato, altrimenti prenotazione.
      setOpen(hasContact ? "form" : "booking");
    };

    // Capture: scatta prima del router di Next, così niente navigazione.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [w?.contact_form_id, w?.booking_item_id]);

  // Apertura programmatica: qualsiasi elemento può fare
  // window.dispatchEvent(new Event("gleeye:open-contact-form")).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const opener = () => {
      if (!w?.contact_form_id) return;
      setFormFallback(false);
      setOpen("form");
    };
    window.addEventListener("gleeye:open-contact-form", opener);
    return () => window.removeEventListener("gleeye:open-contact-form", opener);
  }, [w?.contact_form_id]);

  if (!w) return null;

  // Sorgente iframe: usata per la prenotazione, e come FALLBACK del form protetto.
  const iframeSrc =
    open === "booking"
      ? `${ERP_APP}/prenota?embed=true`
      : open === "form" && formFallback && w.contact_form_id
        ? `${ERP_APP}/form/${w.contact_form_id}?embed=true`
        : null;

  const showNativeForm = open === "form" && !formFallback && !!w.contact_form_id;

  return (
    <>
      {/* Pulsanti flottanti (trigger attuale, invariato) */}
      <div
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          zIndex: 2147483000,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "flex-end",
        }}
      >
        {w.contact_form_id && (
          <button onClick={() => setOpen("form")} style={pillStyle("#2563eb")}>
            <span aria-hidden>✉</span>
            {w.contact_button_label || "Contattaci"}
          </button>
        )}
        {w.booking_item_id && (
          <button onClick={() => setOpen("booking")} style={pillStyle("#0f172a")}>
            <span aria-hidden>📅</span>
            {w.booking_button_label || "Prenota"}
          </button>
        )}
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483600,
            background: "rgba(10,10,16,0.6)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "min(4vw, 32px)",
          }}
        >
          {showNativeForm ? (
            // ── Renderer NATIVO: card del sito, niente iframe ──
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[560px] overflow-y-auto rounded-[2rem] bg-white p-6 shadow-[0_30px_90px_rgba(2,6,23,0.35)] sm:p-8 md:p-10"
              style={{ maxHeight: "92vh" }}
            >
              <CloseButton onClick={close} />
              <NativeForm
                formId={w.contact_form_id!}
                onDone={close}
                onProtectedFallback={() => setFormFallback(true)}
              />
            </div>
          ) : (
            // ── Iframe: prenotazione, o fallback del form protetto (embed) ──
            iframeSrc && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "relative",
                  width: "min(560px, 96vw)",
                  height: "min(760px, 92vh)",
                  background: "#fff",
                  borderRadius: "2rem",
                  overflow: "hidden",
                  boxShadow: "0 30px 90px rgba(2,6,23,0.35)",
                }}
              >
                <CloseButton onClick={close} />
                <iframe
                  src={iframeSrc}
                  title="Gleeye"
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Chiudi"
      style={{
        position: "absolute",
        top: "14px",
        right: "14px",
        zIndex: 2,
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        background: "rgba(10,10,16,0.06)",
        color: "#0a0a10",
        fontSize: "20px",
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      ×
    </button>
  );
}

function pillStyle(bg: string): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    background: bg,
    color: "#fff",
    fontWeight: 600,
    fontSize: "15px",
    boxShadow: "0 8px 24px rgba(2,6,23,0.28)",
  };
}
