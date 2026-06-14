import type { DraftArticle } from './types';
import { devPracticesEn } from './dev-practices.en';

// Batch: Programming & Development (versione nativa italiana). Stessi temi e
// stessi topicKey di dev-practices.en.ts, scritti in modo nativo per il
// contesto degli sviluppatori italiani. Le immagini sono condivise.

const promptOf = (key: string): string => {
  const hit = devPracticesEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const devPracticesIt: DraftArticle[] = [
  {
    topicKey: 'rebase-vs-merge',
    title: 'Git rebase contro merge: quando usare l’uno o l’altro',
    question: 'Qual è la differenza tra git merge e git rebase, e quando dovrei usare ciascuno?',
    summary:
      'Il merge conserva la storia esattamente com’è avvenuta, creando un commit di merge; il rebase riscrive i tuoi commit su una nuova base per una storia lineare e pulita. Usa il merge sui rami condivisi, il rebase sul tuo lavoro privato prima di condividerlo.',
    tags: ['programmazione', 'git', 'controllo di versione', 'strumenti per sviluppatori'],
    language: 'it',
    image: {
      prompt: promptOf('rebase-vs-merge'),
      alt: 'Un raccordo che unisce due binari contro un binario riposato in un’unica linea dritta',
    },
    sources: [
      { title: 'Pro Git book — Rebasing', url: 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing' },
      { title: 'Atlassian — Merging vs Rebasing', url: 'https://www.atlassian.com/git/tutorials/merging-vs-rebasing' },
    ],
    content: `# Git rebase contro merge: quando usare l’uno o l’altro

Sia \`merge\` sia \`rebase\` risolvono lo stesso problema — combinare il lavoro di un ramo in un altro — ma raccontano due storie diverse su come sia successo. Il merge registra la storia *così come è realmente avvenuta*, diramazioni comprese. Il rebase *riscrive* la storia perché sembri che tu abbia lavorato in linea retta fin dall’inizio. Nessuno dei due è "corretto"; sono ottimizzati per obiettivi diversi, e la celebre regola che li governa discende direttamente da ciò che ciascuno fa.

## Che cosa fa davvero ciascun comando

**Merge** prende i due rami e li lega insieme con un nuovo **commit di merge** che ha due genitori. I commit del tuo ramo restano esattamente dove sono; il commit di merge unisce le linee temporali. La storia diventa un grafo che mostra onestamente "questi si sono sviluppati in parallelo, poi si sono uniti".

**Rebase** invece raccoglie i commit del tuo ramo, li mette da parte, si sposta sulla punta del ramo di destinazione e **riapplica i tuoi commit uno per uno** sopra di esso. Il risultato è una linea retta — come se avessi iniziato il tuo lavoro dal codice più recente. Ma quei commit riapplicati sono *nuovi commit con nuovi ID*; gli originali vengono scartati. Questo è il dettaglio cruciale: il rebase riscrive la storia.

## Il compromesso

| | Merge | Rebase |
| --- | --- | --- |
| Forma della storia | Grafo ramificato, fedele agli eventi | Linea retta pulita |
| Crea nuovi commit? | Un commit di merge | Riscrive tutti i commit riapplicati |
| Conserva il contesto | Sì — mostra quando/dove il lavoro è divergito | No — appiattisce la storia |
| Gestione dei conflitti | Risolvi una volta, nel merge | Può risolversi commit per commit durante la riapplicazione |
| Sicuro sui rami condivisi | Sì | No — riscrive la base altrui |

## L’unica regola che previene i disastri

**Non fare mai il rebase di commit che altri hanno già.** Poiché il rebase sostituisce i commit con commit nuovi, fare il rebase di un ramo condiviso/pubblico riscrive la storia su cui altri hanno basato il proprio lavoro — al loro prossimo pull, la loro storia e la tua non coincideranno, producendo commit duplicati e una confusione dolorosa. La regola d’oro: *fai il rebase del lavoro privato e locale; fai il merge di tutto ciò che è condiviso.*

Un flusso di lavoro comune e sicuro combina entrambi: mentre sviluppi da solo un ramo di funzionalità, **fai periodicamente il rebase sul main più recente** per restare aggiornato con una storia pulita; poi, per integrarlo nel main condiviso, fai il **merge** (spesso tramite una pull request). Ottieni una storia locale ordinata e un’integrazione onesta e non distruttiva.

## Indicazioni pratiche

- **Usa il merge** per portare un ramo finito in un ramo condiviso, e ogni volta che il ramo è pubblico.
- **Usa il rebase** per aggiornare il tuo ramo privato in lavorazione sui nuovi commit del main, e per riordinare i tuoi commit locali disordinati (rebase interattivo) prima della revisione.
- **Evita il rebase** su \`main\`/rami condivisi, e fermati se non sei sicuro che qualcun altro abbia già i tuoi commit.

## Domande frequenti

**Il rebase cancella il mio lavoro?**
No — riscrive i commit ma le modifiche sono conservate (e i vecchi commit restano nel reflog per il recupero). Cambia gli ID e l’ordine dei commit, non il contenuto delle tue modifiche.

**Perché alcuni team vietano i commit di merge?**
Preferiscono una storia perfettamente lineare per la leggibilità e la bisezione, quindi richiedono il rebase prima del merge (o lo "squash merge"). È una scelta di stile con compromessi reali, non una questione di correttezza.

**Che cos’è lo squash merge?**
Condensa tutti i commit di un ramo in un singolo commit sul ramo di destinazione — una storia ordinata di un-commit-per-funzionalità, al costo di perdere la granularità dei singoli commit del ramo.`,
  },
  {
    topicKey: 'rest-vs-graphql',
    title: 'REST contro GraphQL: quale stile di API scegliere?',
    question: 'Qual è la differenza tra API REST e GraphQL, e quando dovrei usare ciascuna?',
    summary:
      'REST espone molti endpoint fissi, ciascuno che restituisce una forma prestabilita; GraphQL espone un unico endpoint dove il client chiede esattamente i campi che vuole. GraphQL brilla per esigenze di dati complesse e variabili; REST resta più semplice, memorizzabile in cache e ubiqua.',
    tags: ['programmazione', 'api', 'rest', 'graphql'],
    language: 'it',
    image: {
      prompt: promptOf('rest-vs-graphql'),
      alt: 'Molte fessure distributrici fisse contro un unico banco che evade un ordine su misura esatto',
    },
    sources: [
      { title: 'GraphQL — introduzione ufficiale', url: 'https://graphql.org/learn/' },
      { title: 'MDN — Una panoramica dei concetti di HTTP e REST', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
    ],
    content: `# REST contro GraphQL: quale stile di API scegliere?

REST e GraphQL sono due modi di progettare come i client chiedono dati a un server. **REST** ti dà molti URL (endpoint), ciascuno che restituisce un blocco fisso di dati. **GraphQL** ti dà un unico endpoint e un linguaggio di query, così il client specifica *esattamente* quali campi vuole e ottiene precisamente quelli — né più né meno. Il contrasto si riduce a chi decide la forma della risposta: il server (REST) o il client (GraphQL).

## Come differiscono nella pratica

Supponi di volere il nome di un utente e i titoli dei suoi ultimi tre post.

**Con REST**, tipicamente chiami \`/users/123\` (restituisce l’intero oggetto utente), poi \`/users/123/posts\` (restituisce gli oggetti post completi). Hai ottenuto molto più di quanto avessi chiesto (ogni campo di utente e post), e hai fatto due viaggi di andata e ritorno. Questi sono i classici attriti di REST: l’**over-fetching** (troppi campi) e l’**under-fetching** (servono più chiamate per comporre una vista).

**Con GraphQL**, invii una query a un unico endpoint chiedendo \`user.name\` e \`user.posts(last: 3).title\`, e ricevi esattamente quei campi in un’unica risposta. Il client ha ottenuto precisamente i suoi dati in una sola richiesta.

## La tabella dei compromessi

| | REST | GraphQL |
| --- | --- | --- |
| Endpoint | Molti, basati sulle risorse | Uno |
| Forma della risposta | Fissata dal server | Scelta dal client |
| Over/under-fetching | Comune | Evitato per progettazione |
| Caching | Semplice (cache HTTP per URL) | Più difficile (un URL, query variabili) |
| Curva di apprendimento e strumenti | Più bassa, universale | Più alta; richiede uno schema e uno strato server |
| Versionamento | Spesso /v1, /v2 | Evolvere lo schema, deprecare i campi |
| Migliore per | Risorse semplici, stabili, memorizzabili in cache | Dati complessi, annidati, variabili per client |

## Quando scegliere l’uno o l’altro

**Opta per REST quando** i tuoi dati sono relativamente semplici e a forma di risorsa, vuoi appoggiarti a cache e strumenti HTTP maturi, stai costruendo un’API pubblica che molti client sconosciuti consumeranno, o vuoi semplicemente l’opzione a minor attrito e più universalmente compresa. REST è ancora la scelta predefinita per buone ragioni.

**Opta per GraphQL quando** i client hanno bisogno di molte fette diverse di dati riccamente connessi (classico per le app mobili che minimizzano le richieste, e per le dashboard complesse), stai aggregando diverse sorgenti di backend dietro un unico grafo, o i team di front-end vogliono iterare sulle esigenze di dati senza aspettare nuovi endpoint. Il costo è una maggiore complessità del server, uno schema da mantenere e una cache più difficile.

## Domande frequenti

**GraphQL è "migliore" di REST?**
No — risolve elegantemente l’over/under-fetching ma aggiunge complessità e sfide di cache. Per API semplici, REST è spesso la scelta ingegneristica migliore. Adatta lo strumento alle esigenze dei dati.

**Posso usarli entrambi?**
Sì, comunemente — molti sistemi espongono REST per le superfici semplici/pubbliche e GraphQL per i dati complessi interni/applicativi, oppure avvolgono i servizi REST dietro un gateway GraphQL.

**GraphQL sostituisce il database?**
No — è uno strato di query API tra client e server. Il tuo server continua a recuperare dai database o da altri servizi; GraphQL si limita a dare forma a ciò che il client riceve.`,
  },
  {
    topicKey: 'sql-vs-nosql',
    title: 'SQL contro NoSQL: come scegliere un database',
    question: 'Qual è la differenza tra database SQL e NoSQL, e come faccio a scegliere?',
    summary:
      'I database SQL memorizzano righe strutturate con uno schema fisso e potenti query relazionali; NoSQL baratta parte di quella struttura per flessibilità e scalabilità orizzontale più facile. La scelta giusta dipende dalla forma dei tuoi dati, dalle esigenze di coerenza e dalla scala.',
    tags: ['programmazione', 'database', 'sql', 'nosql'],
    language: 'it',
    image: {
      prompt: promptOf('sql-vs-nosql'),
      alt: 'Una griglia rigida e collegata di celle contro un grappolo flessibile di contenitori vari',
    },
    sources: [
      { title: 'MongoDB — Database NoSQL vs SQL', url: 'https://www.mongodb.com/resources/basics/databases/nosql-explained' },
      { title: 'PostgreSQL — informazioni (database relazionale)', url: 'https://www.postgresql.org/about/' },
    ],
    content: `# SQL contro NoSQL: come scegliere un database

"SQL vs NoSQL" classifica i database in base a come organizzano i dati. **I database SQL (relazionali)** — PostgreSQL, MySQL e altri — memorizzano i dati in tabelle di righe e colonne con uno schema predefinito, e collegano le tabelle tramite relazioni. **NoSQL** è un termine ombrello per tutto il resto: archivi documentali, archivi chiave-valore, a colonne larghe e database a grafo, che allentano la rigida struttura tabellare per flessibilità e scala. La decisione non riguarda il più nuovo contro il più vecchio; riguarda l’adattare il database alla forma dei tuoi dati e alle esigenze del tuo sistema.

## La differenza fondamentale: schema e struttura

Un database **relazionale** insiste sulla struttura fin dall’inizio: definisci tabelle e tipi di colonna, ogni riga vi si conforma, e il database lo impone. In cambio ottieni query potenti (join SQL tra tabelle), garanzie solide e decenni di affidabilità. Il costo è la rigidità — cambiare lo schema in seguito richiede attenzione, e il modello relazionale tradizionalmente scala *verso l’alto* (un server più grande) in modo più naturale che *verso l’esterno* (molti server).

Un database **NoSQL documentale** (il tipo più comune) memorizza documenti flessibili, simili a JSON. Record diversi possono avere campi diversi; puoi annidare dati correlati dentro un unico documento. Questo si adatta a dati che evolvono rapidamente o irregolari ed è stato progettato fin dall’inizio per **scalare orizzontalmente** su molte macchine. Il costo: meno garanzie integrate, query tra record più deboli, e il rischio di dati incoerenti senza lo schema a fare da guardiano.

## Il compromesso, per tipo

| Tipo | Memorizza | Forte in | Esempio d’uso |
| --- | --- | --- | --- |
| Relazionale (SQL) | Tabelle, righe | Query complesse, transazioni, integrità | Finanza, ordini, tutto ciò che è relazionale |
| Documentale | Documenti simili a JSON | Schema flessibile, dati annidati | Cataloghi, profili utente, contenuti |
| Chiave-valore | Semplice chiave → valore | Ricerche fulminee, caching | Sessioni, cache, feature flag |
| A colonne larghe | Righe con colonne dinamiche | Enorme scala di scrittura | Serie temporali, logging su larga scala |
| A grafo | Nodi e relazioni | Dati altamente connessi | Grafi sociali, raccomandazioni |

## Come scegliere

Poniti tre domande:

- **I tuoi dati sono relazionali e critici per la coerenza?** (Denaro, inventario, qualsiasi cosa in cui un aggiornamento lasciato a metà sia inaccettabile.) → SQL, per le sue transazioni e l’integrità.
- **La forma dei tuoi dati è irregolare o cambia rapidamente, oppure devi scalare le scritture su molti server?** → Un tipo NoSQL adatto al modello di accesso.
- **Quali sono i tuoi modelli di query?** Molti join ad-hoc e reportistica favoriscono SQL; semplici ricerche per chiave favoriscono chiave-valore; attraversamenti profondamente connessi favoriscono il grafo.

L’onesta scelta predefinita moderna: **parti da un solido database relazionale (ad es. PostgreSQL) a meno che tu non abbia una ragione specifica per non farlo.** Gestisce un’enorme varietà di esigenze, ora supporta colonne JSON per la flessibilità, e scala più di quanto la gente immagini. Ricorri a NoSQL quando un requisito concreto — scala estrema, uno specifico modello di accesso, dati genuinamente senza schema — lo esige.

## Domande frequenti

**NoSQL è più veloce di SQL?**
Non intrinsecamente — può essere più veloce per modelli specifici (semplici ricerche per chiave, scritture massicce) e più lento o macchinoso per altri (join complessi). "Più veloce" dipende interamente dall’operazione.

**I database SQL possono scalare a sistemi di grandi dimensioni?**
Sì — con replica, partizionamento e caching, i database relazionali fanno girare sistemi enormi. L’affermazione "SQL non scala" è datata; scalare richiede solo una progettazione più deliberata.

**Devo per forza sceglierne solo uno?**
No — la "persistenza poliglotta" è comune: un database relazionale per i record principali, più una cache chiave-valore e magari un archivio di ricerca o a grafo, ciascuno per ciò che fa meglio.`,
  },
  {
    topicKey: 'https-how-it-works',
    title: 'Come HTTPS protegge la tua connessione',
    question: 'Che cosa fa davvero HTTPS, e come fa il lucchetto a tenere al sicuro i miei dati?',
    summary:
      'HTTPS avvolge il normale traffico web nella crittografia, così nessuno tra te e il sito può leggerlo o manometterlo, e usa i certificati per dimostrare che stai parlando davvero con il server giusto. Protegge la privacy e l’integrità — ma non il sito stesso.',
    tags: ['programmazione', 'sicurezza', 'https', 'web'],
    language: 'it',
    image: {
      prompt: promptOf('https-how-it-works'),
      alt: 'Un messaggio che viaggia in un tubo protettivo, illeggibile agli estranei, sigillato come verificato',
    },
    sources: [
      { title: 'MDN — Che cos’è HTTPS / TLS', url: 'https://developer.mozilla.org/en-US/docs/Glossary/HTTPS' },
      { title: "Let's Encrypt — come funziona", url: 'https://letsencrypt.org/how-it-works/' },
    ],
    content: `# Come HTTPS protegge la tua connessione

HTTPS è semplicemente HTTP — il protocollo base di richiesta/risposta del web — con uno strato di sicurezza avvolto intorno (la "S" sta per Secure, fornita da TLS). Il semplice HTTP invia tutto come testo leggibile che chiunque sul percorso di rete può vedere e alterare. HTTPS lo risolve con due garanzie: la **crittografia** (gli estranei non possono leggere il tuo traffico) e l’**autenticazione** (stai parlando davvero con il sito che credi, non con un impostore). Il lucchetto è una promessa sulla *connessione*, e capire esattamente cosa promette — e cosa non promette — è davvero utile.

## I due problemi che risolve

**1. Intercettazione.** Sul semplice HTTP, la tua rete WiFi, il tuo provider internet o chiunque nel mezzo può leggere ogni pagina e password che invii. HTTPS cifra il traffico così che sia un illeggibile guazzabuglio per chiunque tranne i due endpoint — anche se viaggia sullo stesso internet pubblico.

**2. Impersonificazione e manomissione.** Come fai a sapere che il server che risponde è davvero la tua banca e non un aggressore che intercetta la connessione? HTTPS usa **certificati** rilasciati da autorità fidate per dimostrare l’identità del server, e controlli di integrità così che ogni manomissione in transito venga rilevata. Senza questo, la sola crittografia sarebbe inutile — potresti chiacchierare in privato con un ladro.

## Come funziona l’handshake (in modo semplificato)

Quando ti connetti tramite HTTPS, prima che fluisca qualsiasi dato reale avviene una rapida negoziazione:

1. **Verifica del certificato.** Il server presenta il suo certificato. Il tuo browser verifica che sia stato rilasciato da un’autorità fidata per questo esatto dominio e che non sia scaduto né revocato — confermando l’identità.
2. **Scambio di chiavi.** Usando un’ingegnosa crittografia (matematica a chiave pubblica), le due parti concordano una chiave segreta condivisa *senza mai inviarla in chiaro*, anche se chiunque potesse stare a guardare.
3. **Sessione cifrata.** Da lì in poi, tutto il traffico è cifrato con quella chiave condivisa — veloce crittografia simmetrica per il resto della conversazione.

La parte elegante è il passo 2: le due parti stabiliscono una chiave privata su un canale pubblico, così che persino un intercettatore che abbia visto l’intero handshake non possa ricavarla.

## Che cosa significa e non significa il lucchetto

| Il lucchetto garantisce | Il lucchetto NON garantisce |
| --- | --- |
| Il traffico è cifrato in transito | Il sito è onesto o sicuro |
| Sei connesso al dominio reale | Il sito non ti truffi |
| I dati non sono stati alterati lungo il percorso | L’azienda che vi sta dietro sia affidabile |

Questo è il punto più frainteso: HTTPS mette in sicurezza il *tubo*, non la *destinazione*. Un sito di phishing può avere un lucchetto valido — significa solo che la tua connessione *alla truffa* è privata. HTTPS protegge i tuoi dati da terze parti; non garantisce le intenzioni del sito.

## Domande frequenti

**HTTPS è più lento di HTTP?**
Oggi in modo trascurabile — l’hardware e i protocolli moderni rendono minuscolo il sovraccarico della crittografia, e HTTPS spesso abilita funzionalità di protocollo più veloci. La vecchia preoccupazione "la crittografia è lenta" è obsoleta.

**Perché ora HTTPS è richiesto ovunque, persino per i blog?**
Perché persino leggere una pagina rivela informazioni private, e le pagine non cifrate possono essere modificate in transito (pubblicità/malware iniettati). I browser ora segnano il semplice HTTP come "Non sicuro", e i certificati gratuiti hanno rimosso la barriera dei costi.

**HTTPS protegge i dati dopo che arrivano al server?**
No — protegge i dati *in transito*. Una volta che i dati raggiungono il server, la loro sicurezza dipende da come il sito li memorizza e li gestisce. HTTPS è uno strato, non l’intera sicurezza.`,
  },
  {
    topicKey: 'what-is-an-api',
    title: 'Che cos’è davvero un’API? Una spiegazione in parole semplici',
    question: 'Che cos’è un’API, e come funziona davvero in termini semplici?',
    summary:
      'Un’API è un contratto che permette a un programma di richiedere servizi a un altro senza conoscerne le viscere — come il menù di un ristorante tra te e la cucina. Definisce cosa puoi chiedere e cosa ricevi, nascondendo la complessità che vi sta dietro.',
    tags: ['programmazione', 'api', 'concetti fondamentali', 'web'],
    language: 'it',
    image: {
      prompt: promptOf('what-is-an-api'),
      alt: 'Un menù passato sopra un banco, che nasconde una cucina complessa, e restituisce un piatto finito',
    },
    sources: [
      { title: 'MDN — Introduzione alle Web API', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction' },
      { title: 'Red Hat — Che cos’è un’API?', url: 'https://www.redhat.com/en/topics/api/what-are-application-programming-interfaces' },
    ],
    content: `# Che cos’è davvero un’API? Una spiegazione in parole semplici

API sta per Application Programming Interface, il che non spiega nulla. Ecco la versione utile: un’API è un **contratto che permette a due pezzi di software di parlarsi** — un programma offre servizi, e l’API definisce esattamente come un altro programma può richiederli. L’analogia classica è un ristorante. Tu (un programma) leggi un **menù** (l’API), ordini un piatto (fai una richiesta), e la **cucina** (l’altro programma) lo prepara e lo manda fuori (la risposta). Non entri mai in cucina né impari le sue ricette; il menù è l’interfaccia concordata tra di voi.

## Perché questo conta

Quella disposizione del ristorante coglie tutto il punto: **ottieni ciò di cui hai bisogno senza sapere come è fatto.** Quando un’app ti mostra una mappa, non contiene la geografia del mondo — la chiede a un’API di mappe. Quando un sito ti permette di "pagare con PayPal", non elabora i pagamenti da sé — chiama l’API di PayPal. Le API permettono al software di costruire su altro software, così che nessuno debba reinventare mappe, pagamenti, dati meteo o sistemi di login da zero.

Questo dà tre grandi vantaggi:

- **Astrazione** — usi un servizio senza capirne le viscere (ordini cibo senza sapere come funziona la cucina).
- **Riuso** — un servizio ben costruito alimenta migliaia di app.
- **Separazione** — la cucina può cambiare completamente le sue ricette, e finché il menù resta lo stesso, il tuo ordine funziona ancora. I team possono cambiare le loro viscere senza rompere tutti coloro che dipendono da loro.

## Come funziona una chiamata a una Web API

Le API più comuni oggi sono le **Web API**, parlate attraverso internet. Il flusso è semplice:

1. Il tuo programma invia una **richiesta** a uno specifico URL (la "voce di menù"), spesso con parametri ("un caffè medio, senza zucchero").
2. Il server la riceve, fa il lavoro (interroga un database, esegue logica), e
3. Rimanda una **risposta** — di solito dati strutturati in formato **JSON**, che i programmi leggono facilmente.

Per esempio, un’app meteo richiede \`api.weather.com/forecast?city=Tokyo\` e riceve indietro JSON con la temperatura e le condizioni, che poi mostra graziosamente. L’app ha fornito la domanda; l’API ha fornito i dati.

## Le API sono ovunque

| Tu vedi | Dietro, una chiamata API a |
| --- | --- |
| "Accedi con Google" | L’API di autenticazione di Google |
| Una mappa incorporata in un’app | Un’API di mappe |
| Tracciamento spedizione in tempo reale | L’API del corriere |
| "Paga con carta" | L’API di un processore di pagamenti |
| Un chatbot in un’app | L’API di un fornitore di IA |

Il software moderno è in gran parte **API che chiamano API** — ogni app è una piccola cucina che ordina anch’essa da altre.

## Domande frequenti

**Un’API è la stessa cosa di un sito web?**
No — un sito web restituisce pagine impaginate per gli esseri umani; un’API restituisce dati strutturati per i programmi. Stessa idea (richiesta → risposta), pubblico diverso.

**Le API costano denaro?**
Alcune sono gratuite, molte addebitano in base all’uso (per richiesta o per volume), e alcune richiedono una chiave API per identificarti e fatturarti. Le API di mappe, pagamenti e IA misurano comunemente l’uso.

**Che cos’è una "chiave API"?**
Un token segreto che identifica la tua app all’API, usato per autenticarti, imporre limiti e tracciare l’uso — come una tessera che dice chi sta facendo l’ordine.`,
  },
  {
    topicKey: 'sync-vs-async',
    title: 'Sincrono contro asincrono: perché il codice aspetta (o no)',
    question: 'Qual è la differenza tra programmazione sincrona e asincrona?',
    summary:
      'Il codice sincrono fa una cosa alla volta, bloccandosi finché ogni passo non finisce; il codice asincrono può avviare un’operazione lenta e proseguire, gestendone il risultato più tardi. L’asincrono mantiene i programmi reattivi quando aspettano cose lente come reti e file.',
    tags: ['programmazione', 'asincrono', 'concorrenza', 'concetti fondamentali'],
    language: 'it',
    image: {
      prompt: promptOf('sync-vs-async'),
      alt: 'Un cuoco che aspetta inerte una pentola contro un cuoco che ne accudisce diverse mentre sono pronte',
    },
    sources: [
      { title: 'MDN — Introduzione al JavaScript asincrono', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing' },
    ],
    content: `# Sincrono contro asincrono: perché il codice aspetta (o no)

Questa distinzione riguarda **cosa fa un programma mentre aspetta**. Il codice **sincrono** esegue un passo alla volta, e ogni passo deve *finire completamente* prima che inizi il successivo — se un passo è lento, tutto ciò che gli sta dietro aspetta. Il codice **asincrono** può *avviare* un’operazione lenta, metterla da parte e continuare a fare altro lavoro utile, occupandosi del risultato quando è pronto. La differenza conta a malapena per le operazioni veloci e conta enormemente per quelle lente — chiamate di rete, letture di file, query a database — che è esattamente dove i programmi passano gran parte del loro tempo inattivo.

## L’analogia della cucina

Immagina di preparare la colazione. Un cuoco **sincrono** mette il pane nel tostapane e poi *ci sta lì impalato a fissarlo* finché non salta fuori, senza fare nient’altro, prima di iniziare il caffè. Tempo totale: la somma di ogni passo, uno dopo l’altro, comprese tutte le attese.

Un cuoco **asincrono** avvia il pane, e *mentre tosta*, inizia il caffè, e *mentre questo è in infusione*, rompe le uova — accudendo ciascuna cosa man mano che finisce. Stessi compiti, tempo totale molto minore, perché l’attesa si è sovrapposta al lavoro utile. Il cuoco non è diventato più veloce; ha smesso di starsene inattivo.

## Perché conta per i programmi reali

I computer passano un sacco di tempo ad aspettare cose lente: un server che risponde, un disco che legge, un database che risponde — ciascuna un’eternità rispetto alla velocità del processore. Il codice sincrono che "si blocca" durante queste attese congela tutto ciò che gli sta dietro. In un server web, una chiamata bloccante potrebbe lasciarlo incapace di servire qualsiasi altro utente finché una richiesta lenta non termina; in un’app, è la temuta interfaccia congelata e non reattiva.

| | Sincrono | Asincrono |
| --- | --- | --- |
| Ordine | Rigorosamente uno alla volta | Può sovrapporre i periodi d’attesa |
| Su un passo lento | Tutto aspetta (si blocca) | Altro lavoro continua |
| Semplicità | Più facile da leggere e ragionarci | Flusso di controllo più complesso |
| Migliore per | Passi rapidi e dipendenti | I/O lento: rete, file, DB |

## Come l’asincrono viene espresso nel codice

Non devi destreggiarti manualmente in tutto questo — i linguaggi forniscono strumenti. I modelli comuni includono le **callback** (esegui questo quando hai finito), le **promise/future** (un segnaposto per un risultato che arriverà) e la moderna sintassi **async/await** che permette al codice asincrono di *leggersi* quasi come codice sincrono pur restando non bloccante. Il modello mentale chiave: \`await\` significa "metti in pausa *questo* compito qui finché il risultato non è pronto, ma lascia che gli altri compiti girino nel frattempo" — non "congela l’intero programma".

Il compromesso è reale: il codice asincrono è più potente per la reattività ma più difficile su cui ragionare (ordine, gestione degli errori e stato condiviso diventano più insidiosi). L’arte sta nell’usarlo dove l’attesa effettivamente avviene, e nel mantenere sincrona la logica semplice e veloce.

## Domande frequenti

**Asincrono è la stessa cosa di multi-thread/parallelo?**
Non necessariamente. L’asincrono riguarda il non *aspettare inerti*; può girare su un singolo thread intercalando i compiti durante i loro tempi d’attesa. Il parallelismo è fare cose genuinamente *nello stesso momento* su più core. Sono correlati ma distinti — l’asincrono sovrappone l’attesa, il parallelismo sovrappone il lavoro.

**L’asincrono fa girare il mio codice più velocemente?**
Non accelera il lavoro in sé; smette di sprecare tempo nell’attesa, migliorando throughput e reattività. Per lavoro a uso intensivo di CPU senza attesa, l’asincrono da solo offre poco — è lì che aiuta il parallelismo.

**Perché il codice asincrono sembra così tanto più confuso?**
Perché l’esecuzione non scorre più dall’alto in basso nel tempo — le cose iniziano ora e finiscono dopo, gli errori arrivano fuori ordine, e ragioni sul "quando" oltre che sul "cosa". Async/await addomestica gran parte di questo, ma la non linearità sottostante è la vera difficoltà.`,
  },
  {
    topicKey: 'what-is-docker',
    title: 'Che cos’è Docker, e perché gli sviluppatori amano i container?',
    question: 'Che cos’è Docker, cosa sono i container, e perché sono così diffusi?',
    summary:
      'Un container impacchetta un’app con tutto ciò che le serve per funzionare in un’unica unità portatile, così si comporta in modo identico ovunque — risolvendo il "funziona sulla mia macchina". I container sono più leggeri delle macchine virtuali perché condividono il kernel dell’OS host.',
    tags: ['programmazione', 'docker', 'container', 'devops'],
    language: 'it',
    image: {
      prompt: promptOf('what-is-docker'),
      alt: 'Container sigillati identici, ciascuno con un’app autonoma, impilabili su qualsiasi piattaforma',
    },
    sources: [
      { title: 'Docker — che cos’è un container?', url: 'https://www.docker.com/resources/what-container/' },
    ],
    content: `# Che cos’è Docker, e perché gli sviluppatori amano i container?

Docker è lo strumento che ha reso i **container** un fenomeno di massa, e i container risolvono uno dei mal di testa più persistenti del software: *"funziona sulla mia macchina"* — codice che gira bene per lo sviluppatore ma si rompe altrove perché l’altro computer ha versioni, impostazioni o pezzi mancanti diversi. Un container lo risolve **impacchettando un’applicazione insieme a tutto ciò che le serve per funzionare** — codice, runtime, librerie, strumenti di sistema, configurazione — in un’unica unità sigillata e portatile che si comporta in modo identico ovunque venga eseguita. L’analogia del container da trasporto è esatta: standardizza la scatola, e qualsiasi nave, gru o camion può gestirla senza curarsi di cosa ci sia dentro.

## Il problema che risolve

Il software dipende dal suo ambiente: una versione specifica del linguaggio, librerie particolari, certe impostazioni di sistema. Sposta l’app sul portatile di un collega, su un server di test o in produzione, e qualsiasi discrepanza può romperla. Riprodurre a mano ovunque l’ambiente esatto è fragile ed esasperante. Un container raccoglie l’ambiente *insieme* all’app, così "l’ambiente" viaggia con essa e non c’è nulla da far discordare. Costruiscilo una volta; gira allo stesso modo sul tuo portatile, sulla macchina del tuo collega e nel cloud.

## Container contro macchine virtuali

I container vengono spesso paragonati alle macchine virtuali (VM), che anch’esse isolano il software — ma la differenza di peso è la chiave:

| | Macchina virtuale | Container |
| --- | --- | --- |
| Impacchetta | Un intero sistema operativo ospite + app | Solo l’app + le sue dipendenze |
| Condivide | Nulla — un OS completo ciascuna | Il kernel dell’OS host |
| Dimensione | Gigabyte | Megabyte |
| Avvio | Minuti | Secondi o meno |
| Densità | Poche per macchina | Molte per macchina |

Una VM virtualizza un intero computer, portandosi dietro un sistema operativo completo per ogni app — potente ma pesante. Un container condivide il kernel dell’OS host e isola solo ciò che vi sta sopra, rendendolo drasticamente più leggero e più rapido da avviare. Puoi far girare molti container dove ci starebbero solo poche VM.

## Perché sviluppatori e operativi li amano

- **Coerenza** — elimina la deriva dell’ambiente tra sviluppo, test e produzione. La scusa del "funziona sulla mia macchina" muore.
- **Portabilità** — la stessa immagine del container gira su qualsiasi macchina con un runtime per container, compreso ogni cloud principale.
- **Isolamento** — ogni container è autonomo, così app con dipendenze in conflitto convivono pacificamente su un unico host.
- **Velocità e densità** — l’avvio leggero li rende ideali per scalare su e giù e per impacchettarsi efficientemente nei server.
- **Fondamento dell’infrastruttura moderna** — i container sono il mattone costitutivo dei microservizi e dei sistemi di orchestrazione (come Kubernetes) che li fanno girare su larga scala.

## Domande frequenti

**Docker è la stessa cosa di un container?**
Non esattamente — i container sono il concetto/la tecnologia; Docker è il popolare insieme di strumenti che li costruisce e li esegue. Esistono altri strumenti, ma Docker ha reso popolari questo flusso di lavoro e il formato delle immagini.

**I container sostituiscono le macchine virtuali?**
Spesso, ma non sempre — vengono frequentemente usati *insieme* (container che girano dentro VM nel cloud). Le VM contano ancora per un isolamento più forte e per eseguire sistemi operativi diversi; i container vincono su leggerezza e velocità.

**Un container è un confine di sicurezza?**
Fornisce isolamento, ma più debole di quello di una VM perché i container condividono il kernel host. Per la maggior parte degli usi è sufficiente; per carichi multi-tenant ostili, i team aggiungono un irrobustimento extra o li combinano con le VM.`,
  },
  {
    topicKey: 'big-o-notation',
    title: 'La notazione Big-O spiegata senza il mal di testa della matematica',
    question: 'Che cos’è la notazione Big-O, e perché i programmatori ci tengono?',
    summary:
      'Il Big-O descrive come il lavoro di un algoritmo cresce al crescere dell’input — non la sua velocità esatta, ma il suo comportamento di scalabilità. È il motivo per cui un approccio resta veloce su milioni di elementi mentre un altro si pianta, e guida la scelta dell’approccio giusto.',
    tags: ['programmazione', 'algoritmi', 'informatica', 'prestazioni'],
    language: 'it',
    image: {
      prompt: promptOf('big-o-notation'),
      alt: 'Diverse curve luminose da un’unica origine che divergono dalla crescita piatta a quasi verticale',
    },
    sources: [
      { title: 'Khan Academy — Notazione asintotica', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation' },
    ],
    content: `# La notazione Big-O spiegata senza il mal di testa della matematica

La notazione Big-O suona come matematica intimidatoria, ma l’idea è semplice e pratica: descrive **come cresce la quantità di lavoro che un algoritmo svolge man mano che l’input diventa più grande.** Ignora deliberatamente i tempi esatti (che dipendono dall’hardware) e si concentra sulla *forma* della crescita. È questo che conta davvero su larga scala: un algoritmo che va bene su 100 elementi potrebbe impiegare una frazione di secondo o potrebbe impiegare una settimana su 10 milioni di elementi, e il Big-O ti dice quale — prima che tu lo scopra nel modo doloroso.

## Perché "come cresce" batte "quanto è veloce"

Il tempo di esecuzione reale dipende dalla macchina, dal linguaggio, dalla giornata. Il Big-O elimina tutto questo per confrontare il *comportamento di scalabilità* — perché è quello che sopravvive alla crescita. Un approccio due volte più veloce su input piccoli ma con una crescita peggiore perderà catastroficamente man mano che i dati crescono. La domanda a cui risponde il Big-O non è "quanto tempo ci vuole?" ma "**cosa succede quando l’input diventa 10 volte o 1000 volte più grande?**" — la domanda che decide se il tuo software funzionerà ancora l’anno prossimo.

## Le classi comuni, in parole semplici

Pensa a \`n\` come alla dimensione dell’input (numero di elementi):

| Big-O | Nome | Significato semplice | Esempio |
| --- | --- | --- | --- |
| O(1) | Costante | Stesso lavoro indipendentemente dalla dimensione | Cercare un elemento per indice |
| O(log n) | Logaritmica | Cresce molto lentamente; si dimezza a ogni passo | Ricerca binaria in dati ordinati |
| O(n) | Lineare | Il lavoro cresce di pari passo con l’input | Scorrere una lista una volta |
| O(n log n) | Linearitmica | Un po’ peggio di lineare | Buoni algoritmi di ordinamento |
| O(n²) | Quadratica | Il lavoro esplode; ogni elemento contro ogni elemento | Confrontare tutte le coppie (ingenuo) |
| O(2ⁿ) | Esponenziale | Catastrofica; raddoppia per ogni elemento aggiunto | Forzare tutte le combinazioni |

Il divario è impressionante su larga scala. Per un milione di elementi, un algoritmo O(n) compie circa 1 milione di passi; uno O(n²) ne compie circa 1.000.000.000.000 — la differenza tra istantaneo e di fatto mai. È per questo che un approccio O(n²) nascosto in un ciclo è un classico disastro prestazionale, ed è per questo che trovare un’alternativa O(n log n) o O(n) può rendere veloce un programma senza speranza.

## Come usarlo nella pratica

Non hai bisogno di ricavare dimostrazioni. L’abilità pratica è **riconoscere i modelli**: un singolo ciclo sui dati è di solito O(n); un ciclo dentro un ciclo sugli stessi dati è spesso O(n²) — un campanello d’allarme da riconsiderare; dimezzare ripetutamente il problema suggerisce O(log n). Quando qualcosa è lento su input grandi, il ragionamento Big-O ti indica il colpevole (spesso un ciclo annidato accidentale o una ricerca lenta) e la soluzione (una struttura dati o un algoritmo migliori). È anche il motivo per cui scegliere la struttura dati giusta — una hash map per ricerche O(1) invece di scorrere una lista — è una delle decisioni prestazionali a maggior leva.

## Domande frequenti

**Un Big-O più basso significa sempre più veloce?**
Non per input piccoli — il Big-O descrive la crescita, ignorando le costanti, quindi una classe "peggiore" può vincere su dati minuscoli. Conta soprattutto man mano che l’input diventa grande; per una manciata di elementi, la semplicità batte spesso l’ottimalità teorica.

**Qual è la differenza tra caso migliore, medio e peggiore?**
Un algoritmo può comportarsi diversamente a seconda dell’input (ad es. già ordinato contro casuale). Il Big-O cita spesso il caso peggiore come garanzia, ma il caso medio nella pratica conta frequentemente di più.

**Il Big-O riguarda solo la velocità?**
No — descrive anche la crescita della **memoria** (complessità spaziale). Un algoritmo potrebbe essere veloce ma usare una memoria che cresce malamente con l’input; entrambe le dimensioni contano quando si sceglie un approccio.`,
  },
  {
    topicKey: 'what-is-caching',
    title: 'Che cos’è il caching, e perché è ovunque?',
    question: 'Che cos’è il caching, come funziona, e perché è così importante per le prestazioni?',
    summary:
      'Una cache conserva copie dei dati dove è più rapido raggiungerli, così le richieste ripetute saltano la lenta sorgente originale. È uno dei trucchi di velocità più potenti dell’informatica — usato a ogni livello — e il suo problema più difficile è sapere quando la copia è scaduta.',
    tags: ['programmazione', 'caching', 'prestazioni', 'sistemi'],
    language: 'it',
    image: {
      prompt: promptOf('what-is-caching'),
      alt: 'Un oggetto utile su uno scaffale vicino con percorso breve contro un percorso lungo verso un magazzino distante',
    },
    sources: [
      { title: 'MDN — Caching HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching' },
      { title: 'Cloudflare — che cos’è il caching', url: 'https://www.cloudflare.com/learning/cdn/what-is-caching/' },
    ],
    content: `# Che cos’è il caching, e perché è ovunque?

Una cache è una scorta di copie tenute da qualche parte di veloce, così non devi recuperarle ogni volta da qualche parte di lento. Il principio è intuitivo: se afferri di continuo lo stesso libro, lo tieni sulla scrivania invece di camminare ogni volta fino alla biblioteca. Nell’informatica, "la biblioteca" potrebbe essere un database, un server distante o un disco lento, e "la tua scrivania" è una memoria più veloce lì vicino. Il caching è una delle **tecniche prestazionali più universali in tutta l’informatica** — presente praticamente a ogni livello — perché i divari di velocità tra archiviazione veloce e lenta sono enormi, e la maggior parte dei sistemi richiede le stesse cose più e più volte.

## Perché funziona così bene

Due fatti rendono il caching enormemente conveniente. Primo, **le differenze di velocità sono enormi**: leggere dalla memoria può essere migliaia di volte più veloce che dal disco o attraverso una rete. Secondo, **l’accesso è ripetitivo**: programmi e utenti tendono a volere gli stessi dati ripetutamente (il video popolare, il profilo dell’utente connesso, la homepage). Tieni vicini gli elementi richiesti di frequente, e la stragrande maggioranza delle richieste viene servita velocemente, pagando solo occasionalmente il percorso lento. Persino mettere in cache una piccola frazione di dati "caldi" può servire la maggior parte del traffico.

## Il caching è a ogni livello

Sei circondato da cache che lavorano invisibilmente:

| Cache | Cosa accelera |
| --- | --- |
| Cache della CPU | Il processore che raggiunge i dati più velocemente della memoria principale |
| Cache del browser | Ricaricare i siti senza riscaricare immagini/script |
| CDN (rete di distribuzione di contenuti) | Servire i contenuti del sito da un server vicino a te, non dall’altra parte del mondo |
| Cache applicativa/in memoria (ad es. Redis) | Evitare query ripetute al database |
| Cache del database | Riutilizzare i risultati di query recenti |
| Cache DNS | Saltare ricerche ripetute di indirizzi |

Un singolo caricamento di pagina potrebbe beneficiare di una mezza dozzina di cache impilate insieme — ed è per questo che la seconda visita a un sito è molto più veloce della prima.

## La parte difficile: sapere quando una copia è scaduta

La famigerata difficoltà del caching non è memorizzare copie — è sapere **quando una copia è obsoleta.** Se i dati originali cambiano ma la cache serve ancora la vecchia copia, gli utenti vedono informazioni sbagliate (un prezzo già cambiato, un profilo che è stato aggiornato). Questa è l’"invalidazione della cache", metà di una famosa battuta della programmazione sui due problemi più difficili dell’informatica. I sistemi la gestiscono con strategie come la **scadenza** (le copie vivono per un tempo prestabilito, poi si aggiornano), l’**invalidazione** (cancellare attivamente la copia quando la sorgente cambia) e l’accettazione della **coerenza finale** (tollerare una breve obsolescenza in cambio di velocità). Decidere quanto debbano essere freschi i dati — rispetto a quanto debbano essere veloci — è il compromesso centrale del caching.

## Domande frequenti

**Perché non mettere semplicemente tutto in cache per sempre?**
Perché i dati cambiano, e le copie obsolete causano bug; inoltre le cache hanno spazio limitato, quindi sfrattano gli elementi meno usati. Il caching baratta la freschezza perfetta con la velocità — metti in cache ciò che è sicuro che sia leggermente vecchio.

**Cosa risolve "svuotare la cache"?**
Forza copie fresche dalla sorgente. Quando un sito sembra rotto o datato, il tuo browser potrebbe mostrare file in cache obsoleti; svuotarla gli fa riscaricare le versioni correnti.

**Il caching può causare bug?**
Sì — servire dati obsoleti è quello classico. Una sorprendente quota di problemi del tipo "non si aggiorna!" sono cache che trattengono vecchie copie da qualche parte nella catena. Potente, ma una vera fonte di problemi insidiosi.`,
  },
];
