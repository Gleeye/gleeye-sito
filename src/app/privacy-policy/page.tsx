import { Metadata } from "next";
import Header from "@/components/v2/Header";
import Footer from "@/components/v2/Footer";

export const metadata: Metadata = {
    title: "Privacy Policy | GLEEYE",
    description: "Informativa sulla Privacy di GLEEYE S.R.L. ai sensi del GDPR.",
};

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
                        Ultimo aggiornamento: Luglio 2026
                    </p>
                </header>

                <article className="prose prose-lg prose-neutral max-w-none space-y-8 font-plex text-sm md:text-base leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">1. Titolare del Trattamento</h2>
                        <p>
                            I dati personali raccolti attraverso questo sito web sono trattati da <strong>GLEEYE S.R.L.</strong>,
                            con sede in Piazza Brignole 2/3, 16122 Genova (GE), P.IVA 02944020995 (di seguito "Titolare").<br />
                            Per qualsiasi informazione o richiesta relativa alla privacy, è possibile contattare il Titolare
                            all'indirizzo email: <a href="mailto:info@gleeye.eu" className="underline font-bold">info@gleeye.eu</a>.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">2. Tipologia di Dati Trattati</h2>
                        <p>Durante la navigazione del sito Web, il Titolare può raccogliere i seguenti dati:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Dati di navigazione:</strong> Gli applicativi software preposti al funzionamento di questo sito web acquisiscono, nel corso del loro normale esercizio, alcuni dati personali (es. indirizzi IP, nomi a dominio dei computer utilizzati dagli utenti che si connettono al sito).</li>
                            <li><strong>Dati forniti volontariamente dall'utente:</strong> L'invio facoltativo ed esplicito di posta elettronica agli indirizzi indicati su questo sito, nonché la compilazione dei form di contatto, comporta la successiva acquisizione dell'indirizzo del mittente, necessario per rispondere alle richieste, nonché degli eventuali altri dati personali inseriti.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">3. Finalità del Trattamento</h2>
                        <p>I dati personali sono trattati per le seguenti finalità:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Garantire il corretto funzionamento e la fruibilità del Sito.</li>
                            <li>Rispondere alle richieste di informazioni inoltrate dall'utente tramite i form di contatto.</li>
                            <li>Adempiere a eventuali obblighi previsti da leggi vigenti, regolamenti o normative comunitarie, o soddisfare richieste provenienti dalle autorità.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">4. Modalità del Trattamento e Conservazione</h2>
                        <p>
                            Il trattamento dei dati avviene mediante strumenti informatici e/o telematici,
                            con modalità organizzative e logiche strettamente correlate alle finalità indicate.
                            I dati vengono conservati per il tempo strettamente necessario a conseguire gli scopi per cui sono
                            stati raccolti, nel rispetto dei principi di minimizzazione e limitazione della conservazione del GDPR.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-satoshi tracking-tight">5. Diritti dell'Interessato</h2>
                        <p>Ai sensi degli articoli 15 e seguenti del GDPR, l'utente ha il diritto di:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Chiedere al Titolare l'accesso ai propri dati personali.</li>
                            <li>Chiedere la rettifica, la cancellazione o la limitazione del trattamento dei dati che lo riguardano.</li>
                            <li>Opporsi al trattamento e richiedere la portabilità dei dati.</li>
                            <li>Revocare il consenso in qualsiasi momento (limitatamente alle ipotesi in cui il trattamento sia basato sul consenso).</li>
                            <li>Proporre reclamo a un'autorità di controllo (Garante per la Protezione dei Dati Personali in Italia).</li>
                        </ul>
                    </section>

                    <section className="pt-8 border-t border-black/10 text-sm">
                        <p className="opacity-60 italic">
                            Invitiamo l'utente a leggere con attenzione questo documento. Il Titolare si riserva il diritto di
                            modificare o aggiornare la presente Privacy Policy per adeguarla alle normative sopravvenute.
                        </p>
                    </section>
                </article>
            </div>
        </main>
        <Footer />
        </>
    );
}
