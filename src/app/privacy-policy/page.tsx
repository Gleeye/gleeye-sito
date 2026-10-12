import Header from "@/components/v2/Header";
import Footer from "@/components/v2/Footer";
import { seo } from '@/lib/seo';

export const metadata = seo({
  title: 'Privacy Policy',
  description:
    'Informativa privacy di Gleeye srl ai sensi del GDPR: quali dati raccogliamo, perché, per quanto tempo, chi li vede e come esercitare i tuoi diritti.',
  path: '/privacy-policy',
});

/* Quando cambia qualcosa di sostanziale qui (scopi, tempi, fornitori),
   aggiorna anche POLICY_VERSION in src/lib/consent.ts: il banner cookie si
   ripresenta a tutti con l'informativa nuova. */

type Purpose = {
  title: string;
  what: string;
  why: string;
  basis: string;
  keep: string;
};

const PURPOSES: Purpose[] = [
  {
    title: 'Navigare il sito',
    what: 'Indirizzo IP, tipo di browser, pagina richiesta, data e ora.',
    why: 'Far funzionare il sito e proteggerlo da abusi e attacchi.',
    basis: 'Nostro interesse legittimo a tenere il sito sicuro e funzionante (art. 6.1.f GDPR).',
    keep: 'Registri tecnici del fornitore di hosting, cancellati in automatico entro 30 giorni.',
  },
  {
    title: 'Rispondere a chi ci scrive',
    what: 'I dati che inserisci nei moduli di contatto e di prenotazione o che ci mandi per email: di solito nome, email, telefono, azienda e il messaggio.',
    why: 'Risponderti, fissare la chiamata, prepararti un preventivo.',
    basis: 'La tua richiesta: sono misure precontrattuali che ci chiedi tu (art. 6.1.b GDPR). Per questo non c’è nessuna casella da spuntare.',
    keep: '24 mesi dall’ultimo contatto. Se diventi cliente, i documenti del lavoro restano per i 10 anni previsti dalle norme fiscali e civili.',
  },
  {
    title: 'Candidature',
    what: 'I dati del modulo “Lavora con noi” e del curriculum che ci invii.',
    why: 'Valutare la candidatura per le selezioni in corso e per quelle dei mesi successivi.',
    basis: 'La tua richiesta di essere valutato (art. 6.1.b GDPR e art. 111-bis del Codice privacy). Ti chiediamo di non inserire dati sulla salute o altri dati particolari che non servono alla selezione.',
    keep: '24 mesi dall’invio. Prima, se ce lo chiedi, li cancelliamo.',
  },
  {
    title: 'Statistiche di visita',
    what: 'Pagine viste, durata della visita, provenienza, tipo di dispositivo, tramite Google Analytics 4.',
    why: 'Capire quali pagine servono e cosa migliorare.',
    basis: 'Solo il tuo consenso, dato nel banner (art. 6.1.a GDPR). Senza, Google Analytics non viene nemmeno caricato.',
    keep: 'Il cookie _ga dura 2 anni. I dati delle visite restano in Google Analytics al massimo 14 mesi.',
  },
  {
    title: 'Sapere chi ti ha mandato da noi',
    what: 'Se arrivi da un link di un nostro segnalatore: il suo codice e la pagina su cui sei arrivato.',
    why: 'Riconoscere al segnalatore il contatto che ci ha presentato, se poi ci scrivi.',
    basis: 'Per la visita in corso, il completamento della richiesta che stai facendo. Per tenerlo più a lungo, solo il tuo consenso ai cookie di marketing (art. 6.1.a GDPR).',
    keep: 'La durata della visita; 90 giorni nel tuo browser solo se acconsenti.',
  },
  {
    title: 'Ricordare le tue scelte sui cookie',
    what: 'La scelta fatta nel banner, la data, un codice anonimo e l’indirizzo IP accorciato (senza l’ultima parte).',
    why: 'Poter dimostrare che il consenso c’è stato, o che l’hai negato.',
    basis: 'Obbligo di legge (art. 6.1.c e art. 7.1 GDPR).',
    keep: '2 anni. Nel tuo browser la scelta vale 6 mesi, poi te la richiediamo.',
  },
];

const PROVIDERS = [
  { name: 'Vercel Inc.', role: 'ospita il sito', where: 'USA' },
  { name: 'Supabase Inc.', role: 'database del nostro gestionale, dove arrivano moduli, candidature e registro dei consensi', where: 'società americana, server in Irlanda' },
  { name: 'Google Ireland Ltd. / Google LLC', role: 'Google Analytics, solo se acconsenti', where: 'Irlanda e USA' },
  { name: 'Vimeo.com Inc.', role: 'i video, solo quando premi play', where: 'USA' },
  { name: 'Keliweb S.r.l.', role: 'la nostra posta elettronica', where: 'Italia' },
];

export default function PrivacyPolicy() {
    return (
        <>
        <Header />
        <main className="min-h-screen bg-[#F8F9FA] text-[#111111] pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-satoshi font-black tracking-tighter uppercase">
                        Privacy Policy
                    </h1>
                    <p className="text-xl md:text-2xl font-newsreader italic text-black/60">
                        Ultimo aggiornamento: 12 ottobre 2026
                    </p>
                    <p className="font-jakarta text-base md:text-lg leading-relaxed text-black/60 max-w-2xl">
                        Qui trovi, senza giri di parole, quali dati raccogliamo su questo sito, perché, per quanto tempo
                        li teniamo e chi li vede. Per qualsiasi domanda scrivici a{' '}
                        <a href="mailto:info@gleeye.eu" className="underline font-bold">info@gleeye.eu</a>.
                    </p>
                </header>

                <article className="prose prose-lg prose-neutral max-w-none space-y-10 font-plex text-sm md:text-base leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">1. Chi tratta i tuoi dati</h2>
                        <p>
                            <strong>GLEEYE S.R.L.</strong>, Piazza Brignole 2/3, 16122 Genova (GE), P.IVA 02944020995
                            (il &ldquo;Titolare&rdquo;). Email: <a href="mailto:info@gleeye.eu" className="underline font-bold">info@gleeye.eu</a>.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">2. Cosa raccogliamo, perché e per quanto</h2>
                        <div className="not-prose space-y-4">
                            {PURPOSES.map((p) => (
                                <div key={p.title} className="rounded-2xl border border-black/[0.06] bg-white/60 p-5 md:p-6">
                                    <h3 className="font-satoshi text-lg font-black tracking-tight text-[#0a0a10]">{p.title}</h3>
                                    <dl className="mt-3 grid gap-x-6 gap-y-2 font-jakarta text-sm leading-relaxed text-black/70 md:grid-cols-[9rem_1fr]">
                                        <dt className="voice-mono text-[10px] uppercase tracking-[0.18em] text-black/40 md:pt-1">Quali dati</dt>
                                        <dd>{p.what}</dd>
                                        <dt className="voice-mono text-[10px] uppercase tracking-[0.18em] text-black/40 md:pt-1">Perché</dt>
                                        <dd>{p.why}</dd>
                                        <dt className="voice-mono text-[10px] uppercase tracking-[0.18em] text-black/40 md:pt-1">Su che base</dt>
                                        <dd>{p.basis}</dd>
                                        <dt className="voice-mono text-[10px] uppercase tracking-[0.18em] text-black/40 md:pt-1">Per quanto</dt>
                                        <dd>{p.keep}</dd>
                                    </dl>
                                </div>
                            ))}
                        </div>
                        <p>
                            Teniamo i dati più a lungo solo se serve per un obbligo di legge o per difendere un nostro diritto
                            davanti a un giudice (art. 6.1.c e 6.1.f GDPR), e solo per il tempo necessario.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">3. Sei obbligato a darceli?</h2>
                        <p>
                            No. Ma senza i dati di contatto non possiamo risponderti, e senza curriculum non possiamo valutare
                            una candidatura. Dire no ai cookie di statistica o di marketing non cambia niente nell&apos;uso del sito.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">4. Chi vede i dati</h2>
                        <p>
                            Solo le persone di Gleeye che ne hanno bisogno per il loro lavoro, e i fornitori che ci danno gli
                            strumenti. Ognuno è vincolato da un contratto (art. 28 GDPR) e può usare i dati solo per farci il
                            servizio, non per scopi suoi:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            {PROVIDERS.map((p) => (
                                <li key={p.name}><strong>{p.name}</strong> &mdash; {p.role} ({p.where}).</li>
                            ))}
                        </ul>
                        <p>Non vendiamo i dati e non li passiamo a nessuno per fare pubblicità.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">5. Dati che escono dall&apos;Unione europea</h2>
                        <p>
                            Alcuni fornitori sono aziende americane, quindi i dati possono arrivare negli Stati Uniti. Succede
                            solo con aziende aderenti al <strong>Data Privacy Framework UE-USA</strong>, riconosciuto adeguato
                            dalla Commissione europea, oppure con le <strong>Clausole contrattuali standard</strong> approvate
                            dalla Commissione. Puoi chiederci una copia di queste garanzie scrivendo a info@gleeye.eu.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">6. I tuoi diritti</h2>
                        <p>Puoi chiederci in ogni momento, gratis, scrivendo a <a href="mailto:info@gleeye.eu" className="underline font-bold">info@gleeye.eu</a>:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>di vedere quali dati abbiamo su di te e averne una copia;</li>
                            <li>di correggerli o cancellarli, o di sospenderne l&apos;uso;</li>
                            <li>di riceverli in un formato leggibile, per portarli altrove;</li>
                            <li>di smettere di usarli quando la base è il nostro interesse legittimo;</li>
                            <li>
                                di ritirare un consenso: per i cookie basta il link &ldquo;Preferenze cookie&rdquo; in fondo a ogni
                                pagina, ed è facile come darlo.
                            </li>
                        </ul>
                        <p>
                            Ti rispondiamo entro un mese. Se pensi che trattiamo male i tuoi dati puoi fare reclamo al{' '}
                            <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="underline">Garante per la protezione dei dati personali</a>.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">7. Decisioni automatiche</h2>
                        <p>Nessuna. Ogni richiesta e ogni candidatura la legge una persona.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">8. Cookie</h2>
                        <p>
                            Quali cookie usiamo e come cambiare le tue scelte lo trovi nella{' '}
                            <a href="/cookie-policy" className="underline">Cookie Policy</a>.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-black/10 text-sm">
                        <p className="opacity-60 italic">
                            Se cambiamo qualcosa di importante in questa pagina aggiorniamo la data in alto e ti richiediamo
                            le scelte sui cookie alla visita successiva.
                        </p>
                    </section>
                </article>
            </div>
        </main>
        <Footer />
        </>
    );
}
