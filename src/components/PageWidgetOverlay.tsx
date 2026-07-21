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

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Mail, Calendar, Phone } from "lucide-react";
import NativeForm from "@/components/form/NativeForm";

// Canali diretti Gleeye (sempre presenti nel ventaglio).
const WHATSAPP_URL = "https://wa.me/393351624363";
const PHONE_TEL = "tel:+393351624363";
const EMAIL_MAILTO = "mailto:info@gleeye.eu";
const WHATSAPP_GREEN = "#25D366";

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
  // Ventaglio dei canali (trigger collassato/aperto).
  const [fanOpen, setFanOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement | null>(null);

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

  // Ventaglio: chiudi cliccando fuori, o con ESC.
  useEffect(() => {
    if (!fanOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!fabRef.current?.contains(e.target as Node)) setFanOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFanOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [fanOpen]);

  // Quando si apre un modal (form/prenota), richiudi il ventaglio.
  useEffect(() => {
    if (open) setFanOpen(false);
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
  // window.dispatchEvent(new Event("gleeye:open-contact-form")) per il contatto,
  // oppure "gleeye:open-booking" per la prenotazione. Usato dai CTA del footer.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const openForm = () => {
      if (!w?.contact_form_id) return;
      setFormFallback(false);
      setOpen("form");
    };
    const openBooking = () => {
      if (!w?.booking_item_id) return;
      setOpen("booking");
    };
    window.addEventListener("gleeye:open-contact-form", openForm);
    window.addEventListener("gleeye:open-booking", openBooking);
    return () => {
      window.removeEventListener("gleeye:open-contact-form", openForm);
      window.removeEventListener("gleeye:open-booking", openBooking);
    };
  }, [w?.contact_form_id, w?.booking_item_id]);

  // Sorgente iframe: usata per la prenotazione, e come FALLBACK del form protetto.
  const iframeSrc =
    open === "booking"
      ? `${ERP_APP}/prenota?embed=true${w?.booking_item_id ? `&servizio=${w.booking_item_id}` : ""}`
      : open === "form" && formFallback && w?.contact_form_id
        ? `${ERP_APP}/form/${w.contact_form_id}?embed=true`
        : null;

  const showNativeForm = open === "form" && !formFallback && !!w?.contact_form_id;

  // ── Voci del ventaglio ────────────────────────────────────────────────────
  // 1-2 (Scrivici / Prenota) solo se assegnate dall'ERP; 3-5 (canali diretti)
  // sempre presenti. Ordine: dall'alto verso il FAB.
  const items: FanItem[] = [];
  if (w?.contact_form_id)
    items.push({
      key: "form",
      label: w.contact_button_label || "Scrivici",
      icon: <MessageCircle size={20} strokeWidth={2} />,
      iconColor: "#4e92d8",
      onClick: () => setOpen("form"),
    });
  if (w?.booking_item_id)
    items.push({
      key: "booking",
      label: w.booking_button_label || "Prenota",
      icon: <Calendar size={19} strokeWidth={2} />,
      iconColor: "#614aa2",
      onClick: () => setOpen("booking"),
    });
  items.push({
    key: "whatsapp",
    label: "WhatsApp",
    icon: <WhatsAppIcon />,
    iconColor: "#fff",
    bg: WHATSAPP_GREEN,
    href: WHATSAPP_URL,
    target: "_blank",
  });
  items.push({
    key: "phone",
    label: "Chiamaci",
    icon: <Phone size={18} strokeWidth={2} />,
    iconColor: "#614aa2",
    href: PHONE_TEL,
  });
  items.push({
    key: "email",
    label: "Email",
    icon: <Mail size={19} strokeWidth={2} />,
    iconColor: "#4e92d8",
    href: EMAIL_MAILTO,
  });

  const count = items.length;

  return (
    <>
      {/* Trigger: FAB gradiente che si apre a ventaglio verticale */}
      <FabStyles />
      <div
        ref={fabRef}
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          zIndex: 2147483000,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {/* Ventaglio (sopra il FAB) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "12px",
            marginBottom: "14px",
          }}
        >
          {items.map((it, i) => {
            // Il tondo più vicino al FAB (ultimo) entra per primo.
            const delay = fanOpen ? (count - 1 - i) * 45 : 0;
            const common = {
              className: `gl-fan-item${fanOpen ? " open" : ""}`,
              style: { transitionDelay: `${delay}ms` } as React.CSSProperties,
              tabIndex: fanOpen ? 0 : -1,
              "aria-hidden": !fanOpen,
              "aria-label": it.label,
              title: it.label,
            };
            const inner = (
              <>
                <span className="gl-fan-label">{it.label}</span>
                <span
                  className="gl-fan-dot"
                  style={{ background: it.bg || "#fff", color: it.iconColor }}
                >
                  {it.icon}
                </span>
              </>
            );
            return it.href ? (
              <a
                key={it.key}
                href={it.href}
                target={it.target}
                rel={it.target === "_blank" ? "noopener noreferrer" : undefined}
                onClick={() => setFanOpen(false)}
                {...common}
              >
                {inner}
              </a>
            ) : (
              <button
                key={it.key}
                type="button"
                onClick={() => {
                  it.onClick?.();
                  setFanOpen(false);
                }}
                {...common}
              >
                {inner}
              </button>
            );
          })}
        </div>

        {/* FAB */}
        <button
          type="button"
          onClick={() => setFanOpen((v) => !v)}
          aria-expanded={fanOpen}
          aria-label={fanOpen ? "Chiudi i contatti" : "Contattaci"}
          className="gl-fab"
        >
          <span className={`gl-fab-icon${fanOpen ? " open" : ""}`}>
            {fanOpen ? <X size={24} strokeWidth={2.4} /> : <ChatBubbleIcon />}
          </span>
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div onClick={close} className="gl-modal-overlay">
          {showNativeForm ? (
            // ── Renderer NATIVO: card del sito, niente iframe ──
            <div
              onClick={(e) => e.stopPropagation()}
              className="gl-sheet relative w-full max-w-[560px] overflow-y-auto rounded-[2rem] bg-white p-6 shadow-[0_30px_90px_rgba(2,6,23,0.35)] sm:p-8 md:p-10"
              style={{ maxHeight: "92vh" }}
            >
              <CloseButton onClick={close} />
              <NativeForm
                formId={w!.contact_form_id!}
                onDone={close}
                onProtectedFallback={() => setFormFallback(true)}
              />
            </div>
          ) : (
            // ── Iframe: prenotazione, o fallback del form protetto (embed) ──
            iframeSrc && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="gl-sheet gl-sheet-iframe"
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

type FanItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  iconColor: string;
  bg?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
};

/** Bolla-chat custom del FAB: bolla morbida con tre puntini "typing" ritagliati. */
function ChatBubbleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-8l-3 3.2a.8.8 0 0 1-1.35-.62L5.8 17A4 4 0 0 1 2 13V7a4 4 0 0 1 4-4Zm2 8.35a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Zm4 0a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Zm4 0a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Z"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** CSS del trigger: FAB gradiente + ventaglio a stagger. Scoped via prefisso gl-. */
function FabStyles() {
  return (
    <style>{`
      .gl-fab {
        width: 58px; height: 58px;
        display: flex; align-items: center; justify-content: center;
        border: none; cursor: pointer; padding: 0;
        border-radius: 50%;
        color: #fff;
        background: linear-gradient(135deg, #4e92d8 0%, #614aa2 100%);
        box-shadow: 0 10px 30px rgba(78,74,140,0.42), 0 2px 8px rgba(10,10,16,0.18);
        transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .28s ease;
      }
      .gl-fab:hover { transform: scale(1.06); box-shadow: 0 14px 38px rgba(78,74,140,0.5), 0 3px 10px rgba(10,10,16,0.2); }
      .gl-fab:active { transform: scale(0.96); }
      .gl-fab:focus-visible { outline: 3px solid rgba(109,181,255,0.7); outline-offset: 3px; }
      .gl-fab-icon { display: flex; transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
      .gl-fab-icon.open { transform: rotate(90deg); }

      /* ── Modal (desktop) / bottom-sheet (mobile) ── */
      .gl-modal-overlay {
        position: fixed; inset: 0; z-index: 2147483600;
        background: rgba(10,10,16,0.6);
        backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
        display: flex; align-items: center; justify-content: center;
        padding: min(4vw, 32px);
        animation: gl-fade-in .2s ease;
      }
      @keyframes gl-fade-in { from { opacity: 0; } to { opacity: 1; } }
      .gl-sheet { animation: gl-pop-in .32s cubic-bezier(.22,1,.36,1); }
      @keyframes gl-pop-in { from { opacity: 0; transform: translateY(10px) scale(.985); } to { opacity: 1; transform: none; } }

      /* Su mobile i pop-up salgono dal basso (bottom-sheet), come l'app di Argie. */
      @media (max-width: 640px) {
        .gl-modal-overlay { align-items: flex-end; padding: 0; }
        .gl-sheet {
          width: 100% !important;
          max-width: 100% !important;
          border-radius: 24px 24px 0 0 !important;
          max-height: 92vh !important;
          animation: gl-sheet-up .4s cubic-bezier(.22,1,.36,1);
        }
        .gl-sheet:not(.gl-sheet-iframe) { padding-top: 28px; }
        .gl-sheet-iframe { height: 90vh !important; }
        .gl-sheet::after {
          content: ""; position: absolute; top: 9px; left: 50%;
          transform: translateX(-50%);
          width: 40px; height: 4px; border-radius: 999px;
          background: rgba(10,10,16,0.2); z-index: 6; pointer-events: none;
        }
        .gl-sheet-iframe::after { background: rgba(10,10,16,0.3); }
      }
      @keyframes gl-sheet-up { from { transform: translateY(100%); } to { transform: translateY(0); } }

      .gl-fan-item {
        display: inline-flex; align-items: center; justify-content: flex-end;
        gap: 10px; text-decoration: none; background: none; border: none;
        padding: 0; cursor: pointer;
        opacity: 0; transform: translateY(14px) scale(0.5);
        pointer-events: none;
        transition: opacity .26s cubic-bezier(.22,1,.36,1),
                    transform .32s cubic-bezier(.34,1.56,.64,1);
      }
      .gl-fan-item.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

      .gl-fan-dot {
        width: 48px; height: 48px; flex: 0 0 48px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 50%;
        box-shadow: 0 6px 18px rgba(10,10,16,0.16), 0 1px 3px rgba(10,10,16,0.12);
        transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s ease;
      }
      .gl-fan-item:hover .gl-fan-dot,
      .gl-fan-item:focus-visible .gl-fan-dot {
        transform: scale(1.1);
        box-shadow: 0 8px 22px rgba(10,10,16,0.22), 0 2px 5px rgba(10,10,16,0.14);
      }
      .gl-fan-item:focus-visible { outline: none; }
      .gl-fan-item:focus-visible .gl-fan-dot { outline: 3px solid rgba(109,181,255,0.7); outline-offset: 2px; }

      .gl-fan-label {
        font-family: var(--font-jakarta, system-ui), sans-serif;
        font-size: 13px; font-weight: 600; letter-spacing: -0.01em;
        color: #fff; background: rgba(10,10,16,0.88);
        padding: 6px 12px; border-radius: 999px; white-space: nowrap;
        box-shadow: 0 4px 14px rgba(10,10,16,0.2);
        opacity: 0; transform: translateX(8px);
        transition: opacity .2s ease, transform .2s ease;
        pointer-events: none;
      }
      .gl-fan-item:hover .gl-fan-label,
      .gl-fan-item:focus-visible .gl-fan-label { opacity: 1; transform: translateX(0); }

      @media (max-width: 420px) {
        .gl-fan-label { opacity: 1; transform: translateX(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .gl-fab, .gl-fab-icon, .gl-fan-item, .gl-fan-dot, .gl-fan-label { transition-duration: .01ms !important; }
      }
    `}</style>
  );
}
