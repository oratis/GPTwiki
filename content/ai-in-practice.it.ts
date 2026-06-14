import type { DraftArticle } from './types';
import { aiInPracticeEn } from './ai-in-practice.en';

// Batch: AI in Practice (versione nativa in italiano / espansione linguistica
// Fase 2). Condivide gli stessi topicKey di en/zh/ja e riutilizza le immagini
// hero già memorizzate su GCS per ciascun topicKey (costo di generazione
// immagini pari a zero). I testi non sono traduzioni automatiche, ma riscritture
// pensate per chi legge in italiano.

const promptOf = (key: string): string => {
  const hit = aiInPracticeEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const aiInPracticeIt: DraftArticle[] = [
  {
    topicKey: 'rag-vs-fine-tuning',
    title: 'RAG o fine-tuning: quale scegliere?',
    question: 'Per adattare un LLM ai miei dati conviene usare il RAG o il fine-tuning?',
    summary:
      'Il RAG inietta conoscenza fresca e verificabile al momento della richiesta, mentre il fine-tuning cambia il comportamento del modello. Quasi tutti i team dovrebbero partire dal RAG e aggiungere il fine-tuning solo per stile, formato o obiettivi di latenza.',
    tags: ['ai', 'llm', 'rag', 'fine-tuning', 'apprendimento automatico'],
    language: 'it',
    image: { prompt: promptOf('rag-vs-fine-tuning'), alt: 'Pipeline di recupero e reticolo di un modello messo a punto che alimentano un unico nucleo neurale' },
    sources: [
      { title: 'Lewis et al., «Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks» (2020)', url: 'https://arxiv.org/abs/2005.11401' },
      { title: 'Hu et al., «LoRA: Low-Rank Adaptation of Large Language Models» (2021)', url: 'https://arxiv.org/abs/2106.09685' },
      { title: 'Gao et al., «Retrieval-Augmented Generation for Large Language Models: A Survey» (2023)', url: 'https://arxiv.org/abs/2312.10997' },
    ],
    content: `# RAG o fine-tuning: quale scegliere?

Risposta breve: se il problema è **ciò che il modello sa**, usa la generazione aumentata dal recupero (RAG); se il problema è **come il modello si comporta**, usa il fine-tuning. I due approcci non sono rivali — i sistemi maturi spesso li usano entrambi — ma come primo investimento il RAG è più economico da costruire, più facile da aggiornare e più facile da controllare.

## Cosa fa davvero ciascuna tecnica

Il **RAG** mantiene il modello congelato e ne cambia l'*input*. Al momento della richiesta un retriever cerca tra i tuoi documenti (di solito tramite embedding in un indice vettoriale) e i passaggi più rilevanti vengono incollati nel prompt, così il modello risponde a partire da quelli. La conoscenza vive in un database che puoi modificare in qualsiasi momento.

Il **fine-tuning** cambia i *pesi* del modello. Lo addestri su coppie di esempio input–output, così il modello interiorizza un tono, un formato, una policy o un lessico di dominio. Con metodi efficienti come LoRA non servono più hardware enormi — ma il risultato resta impresso finché non riaddestri.

## Tabella decisionale

| La tua situazione | Scelta migliore | Perché |
| --- | --- | --- |
| I fatti cambiano ogni settimana (prezzi, policy, documenti) | RAG | Aggiorni l'indice, non il modello |
| Le risposte devono citare le fonti | RAG | I passaggi recuperati fungono da citazioni |
| Corpus privato troppo grande da memorizzare | RAG | Il recupero scala con lo storage, non con i parametri |
| L'output deve seguire uno stile o uno schema rigorosi | Fine-tuning | Lo stile è comportamento, non conoscenza |
| Ti serve un modello specialista piccolo, veloce ed economico | Fine-tuning | Distilli il compito in meno parametri |
| I prompt sono diventati enormi tra istruzioni ed esempi | Fine-tuning | Sposti le istruzioni ricorrenti nei pesi |
| Il modello fraintende il gergo di dominio | Entrambi | Il recupero fornisce contesto; il tuning corregge l'interpretazione |

## Quando il RAG è la prima mossa giusta

- **Freschezza**: la tua conoscenza cambia più in fretta di quanto potresti mai riaddestrare.
- **Tracciabilità**: le risposte regolamentate e rivolte ai clienti hanno bisogno dell'ancoraggio «secondo il documento X», che riduce anche in modo misurabile le allucinazioni.
- **Velocità di iterazione**: un prototipo funzionante richiede qualche giorno di sviluppo; niente GPU, niente etichettatura di dati di addestramento.
- **Isolamento per tenant**: i dati di ogni cliente restano nel proprio indice invece di colare in pesi condivisi.

Il costo è un pezzo in più da gestire: chunking, embedding, qualità dell'indice e valutazione del recupero diventano parte del prodotto. Un recupero scadente, non il modello, è il punto di rottura più comune dei sistemi RAG.

## Quando il fine-tuning ripaga

- **Conformità di formato**: JSON sempre valido, uno scheletro fisso di report, il tono del tuo team di supporto.
- **Latenza e costo dei token**: un modello messo a punto può eliminare gli esempi few-shot e le istruzioni lunghe da ogni chiamata.
- **Trasferimento di capacità ai modelli piccoli**: mettere a punto un modello compatto a pesi aperti su un compito ristretto può eguagliare un modello generale molto più grande a una frazione del costo di inferenza.
- **Competenze implicite**: classificazione, estrazione e instradamento con migliaia di esempi etichettati spesso battono il prompting.

Il costo è operativo: curare i dati di addestramento, rieseguire le valutazioni a ogni aggiornamento del modello base e accettare che correggere un comportamento sbagliato significhi un altro ciclo di addestramento.

## Usare entrambi

Uno schema di produzione comune: metti a punto un modello perché *segua in modo affidabile il tuo formato e la tua policy di rifiuto* e usa il RAG per *alimentarlo con fatti aggiornati*. Il tuning rende il comportamento prevedibile; il recupero mantiene i contenuti veri e attuali.

## FAQ

**Il fine-tuning insegna al modello fatti nuovi?**
Male. Gli aggiornamenti dei pesi possono memorizzare qualche fatto, ma il richiamo è inaffidabile e gli aggiornamenti richiedono di riaddestrare. Il recupero è il modo affidabile per aggiungere conoscenza.

**Il RAG è sempre più economico?**
Da costruire, quasi sempre. A volumi di query molto elevati, i lunghi contesti recuperati gonfiano il costo dei token per chiamata, e un modello messo a punto con prompt brevi può diventare più conveniente. Misura al tuo livello di traffico.

**Posso evitarli entrambi e usare solo una finestra di contesto lunga?**
Per corpus piccoli e stabili, sì: infilare i documenti nel prompt (magari con il caching del prompt) è l'opzione più semplice. Oltre qualche centinaio di pagine o con aggiornamenti frequenti, il recupero vince su costo e qualità delle risposte.`,
  },
  {
    topicKey: 'prompt-engineering',
    title: 'Guida pratica al prompt engineering',
    question: 'Come scrivo prompt efficaci per i grandi modelli linguistici?',
    summary:
      'Gran parte della qualità di un prompt nasce da cinque leve: istruzioni chiare, contesto, esempi, formato di output esplicito e spazio per ragionare. Questa guida copre le tecniche che sopravvivono all’impatto con il lavoro reale.',
    tags: ['ai', 'llm', 'prompt engineering', 'produttività'],
    language: 'it',
    image: { prompt: promptOf('prompt-engineering'), alt: 'Pannello di controllo in vetro che modella un fascio di luce in un output strutturato' },
    sources: [
      { title: 'Wei et al., «Chain-of-Thought Prompting Elicits Reasoning in Large Language Models» (2022)', url: 'https://arxiv.org/abs/2201.11903' },
      { title: 'Wang et al., «Self-Consistency Improves Chain of Thought Reasoning» (2022)', url: 'https://arxiv.org/abs/2203.11171' },
      { title: 'Prompt Engineering Guide (DAIR.AI)', url: 'https://www.promptingguide.ai' },
    ],
    content: `# Guida pratica al prompt engineering

Un prompt è una specifica, non una formula magica. I modelli reagiscono male alle richieste vaghe per lo stesso motivo per cui lo fanno gli artigiani: i requisiti non sono mai stati dichiarati. Cinque leve spiegano gran parte della qualità che puoi ottenere — istruzioni, contesto, esempi, formato di output e spazio per ragionare.

## Le cinque leve

**1. Formula il compito come un ordine di lavoro.** Includi l'obiettivo, il pubblico, i vincoli e cosa significa «fatto». «Riassumi le clausole di recesso di questo contratto per chi non è avvocato, in meno di 150 parole, segnalando qualsiasi anomalia» batte «riassumi questo».

**2. Fornisci il contesto che il modello non può indovinare.** Incolla il documento rilevante, lo schema, il log degli errori, la guida di stile. Separalo dalle istruzioni con delimitatori chiari (tag in stile XML o blocchi di codice), così i dati non vengono mai confusi con le direttive.

**3. Mostra, non limitarti a dire (few-shot).** Due o tre esempi input → output definiscono un compito con più precisione di interi paragrafi di descrizione, e fissano i casi limite: includi un esempio difficile, non solo quelli facili.

**4. Fissa il formato di output.** Chiedi una struttura precisa — un oggetto JSON con campi nominati, una tabella markdown, «esattamente tre punti elenco». L'output strutturato è più facile da validare, analizzare e confrontare. Se la tua piattaforma supporta l'output vincolato a uno schema, usalo.

**5. Dai spazio al ragionamento.** Per analisi, matematica o decisioni a più passi, chiedi al modello di lavorare sul problema prima di rispondere (catena di pensiero). Ricerca e pratica concordano che questo migliora in modo concreto l'accuratezza nei compiti di ragionamento; per le risposte ad alto rischio, campiona più percorsi di ragionamento e prendi la maggioranza (autoconsistenza).

## Tecnica → quando ricorrervi

| Tecnica | Da usare quando |
| --- | --- |
| Ruolo/persona («Sei un SRE senior») | Lessico e giudizio devono corrispondere a una professione |
| Delimitatori attorno agli input | Qualsiasi dato incollato, sempre |
| Esempi few-shot | Formato o giudizio difficili da descrivere in astratto |
| Catena di pensiero | Matematica, logica, decisioni con più vincoli |
| Scomposizione (più chiamate) | Compiti con fasi distinte — estrai, poi valuta, poi scrivi |
| Autoconsistenza (voto su più campioni) | Risposte singole ad alto rischio che valgono il costo extra |
| «Di' 'non lo so' se non sei sicuro» | Domande fattuali dove una risposta sbagliata è peggio di nessuna |

## Schemi di fallimento comuni

- **Il prompt-calderone**: venti regole, metà contraddittorie. I modelli seguono l'ultima e la più forte; sfoltisci senza pietà.
- **Domande nascoste**: chiedere due cose in una frase e ottenere risposta a una sola.
- **Contesto implicito**: riferirsi a «il file» o «il nostro formato abituale» che il modello non ha mai visto.
- **Esempi in overfitting**: tre campioni few-shot quasi identici insegnano lo schema superficiale, non la regola.
- **Nessun ciclo di iterazione**: i prompt sono codice. Tieni un piccolo set di test con input reali, eseguilo dopo ogni modifica e versiona i tuoi prompt.

## Tratta i prompt come artefatti di ingegneria

Quando un prompt conta in produzione: mettilo sotto controllo di versione, allegagli un set di test di regressione con input rappresentativi e proprietà attese, e rieseguilo a ogni aggiornamento del modello. I cambi di versione del modello spostano il comportamento in silenzio; i tuoi test lo intercettano prima dei tuoi utenti.

## FAQ

**Le frasi magiche tipo «fai un respiro profondo» aiutano davvero?**
Occasionalmente, marginalmente e in modo inaffidabile tra un modello e l'altro. Struttura, contesto ed esempi surclassano gli incantesimi.

**I prompt lunghi costano di più — la spesa ne vale la pena?**
Di solito sì per i compiti critici sulla qualità, ma taglia il peso morto: regole ridondanti ed esempi obsoleti aggiungono costo senza accuratezza. Il caching del prompt rende economici i lunghi prefissi statici su gran parte delle piattaforme.

**In cosa cambia il prompting per i modelli orientati al ragionamento?**
I modelli che ragionano internamente prima di rispondere hanno meno bisogno di essere guidati su *come* pensare — mantieni le istruzioni su obiettivo e vincoli, e abbandona il micromanagement passo passo a meno che la qualità dell'output non dica il contrario.`,
  },
  {
    topicKey: 'ai-agents',
    title: 'Che cos’è un agente IA — e quando ne hai davvero bisogno?',
    question: 'Che cos’è un agente IA, e quando il mio caso d’uso ha davvero bisogno di uno?',
    summary:
      'Un agente IA è un LLM che gira in un ciclo, con strumenti e un obiettivo, e che decide da solo il passo successivo. Potente per compiti aperti, eccessivo per tutto ciò che un flusso fisso può fare: questo articolo spiega la differenza.',
    tags: ['ai', 'llm', 'agenti', 'automazione', 'architettura software'],
    language: 'it',
    image: { prompt: promptOf('ai-agents'), alt: 'Un nucleo neurale con strumenti in orbita che sceglie il proprio percorso tra piattaforme ramificate' },
    sources: [
      { title: 'Yao et al., «ReAct: Synergizing Reasoning and Acting in Language Models» (2022)', url: 'https://arxiv.org/abs/2210.03629' },
      { title: 'Anthropic Engineering, «Building Effective Agents»', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
      { title: 'Schick et al., «Toolformer: Language Models Can Teach Themselves to Use Tools» (2023)', url: 'https://arxiv.org/abs/2302.04761' },
    ],
    content: `# Che cos'è un agente IA — e quando ne hai davvero bisogno?

Un agente IA è un modello linguistico che gira in un ciclo: ha un obiettivo, un insieme di strumenti e la libertà di decidere da solo l'azione successiva in base a ciò che l'ultima azione ha restituito. È proprio quest'ultima parte a definirlo. Uno script che chiama un LLM tre volte in un ordine fisso è un **flusso di lavoro**; un sistema in cui è il modello stesso a scegliere cosa fare dopo è un **agente**.

## L'anatomia di un agente

Ogni agente concreto è fatto di quattro pezzi:

- **Un modello** capace di ragionamento a più passi e di chiamate agli strumenti affidabili.
- **Strumenti** — funzioni che il modello può invocare: ricerca, esecuzione di codice, modifiche ai file, chiamate API, query al database.
- **Contesto/memoria** — la trascrizione in corso di azioni e osservazioni (più, a volte, note esterne che sopravvivono alla sessione).
- **Il ciclo** — il modello agisce → l'ambiente risponde → il risultato viene aggiunto → il modello agisce di nuovo, finché non dichiara raggiunto l'obiettivo o non incontra una condizione di arresto.

Lo schema di alternare ragionamento e uso degli strumenti è stato reso popolare nella ricerca con il nome di ReAct, ed è ormai la spina dorsale di assistenti alla scrittura di codice, agenti di ricerca e sistemi di controllo del computer.

## Agente vs flusso di lavoro vs chiamata singola

| Approccio | Flusso di controllo deciso da | Ideale per | Modo di fallire |
| --- | --- | --- | --- |
| Chiamata LLM singola | Te | Classificazione, redazione, estrazione | Ambito limitato |
| Flusso di lavoro (chiamate concatenate) | Te | Processi multi-passo noti e ripetibili | Rigido quando gli input variano |
| Agente (ciclo + strumenti) | Il modello | Compiti aperti in cui il percorso non è noto a priori | Costo ed errori che si accumulano |

## Quando un agente è davvero la scelta giusta

- **Il percorso è imprevedibile in anticipo.** Eseguire il debug di una build che fallisce, indagare su una domanda vaga, pilotare un browser — ogni passo successivo dipende da ciò che ha rivelato il precedente.
- **L'ambiente fornisce feedback.** Compilatori, suite di test e risultati di ricerca permettono all'agente di verificare il proprio lavoro e autocorreggersi. Gli agenti prosperano proprio dove la verifica costa poco.
- **Il compito tollera costo e latenza variabili.** Un agente può richiedere cinque passi o cinquanta.

## Quando è eccessivo

Se una persona può scrivere i passi, scrivili — un flusso fisso è più economico, più veloce, debuggabile e prevedibile. Compilazione di moduli, pipeline documentali, report pianificati ed ETL standard non hanno quasi mai bisogno di un agente. La regola ingegneristica onesta dei professionisti è: **usa lo schema più semplice che funziona, e aggiungi autonomia solo quando il compito lo richiede.**

## Cosa va storto

- **Accumulo degli errori**: un passo affidabile al 95% ha all'incirca il 60% di probabilità di sopravvivere intatto a dieci passi. I cicli lunghi hanno bisogno di checkpoint, passi di verifica o cancelli di revisione umana.
- **Costo fuori controllo**: ogni iterazione del ciclo rilegge una trascrizione che cresce. Imposta budget e limiti di passi.
- **Obiettivi ambigui**: a un agente a cui dici «migliora il codice» farà *qualcosa*; che fosse quello che volevi è un altro discorso. Definisci cosa significa «fatto».
- **Superficie di sicurezza**: gli strumenti che possono scrivere file, spendere denaro o inviare messaggi hanno bisogno di confini di permesso e log di audit.

## FAQ

**I «sistemi multi-agente» sono migliori di un singolo buon agente?**
A volte — la ricerca in parallelo con un sintetizzatore è uno schema collaudato. Ma il coordinamento introduce i suoi modi di fallire; il multi-agente è un'ottimizzazione, non un punto di partenza.

**Gli agenti hanno bisogno di modelli speciali?**
Hanno bisogno di forte affidabilità nelle chiamate agli strumenti e di coerenza su orizzonti lunghi. I modelli generali di frontiera sono al momento la scelta più sicura; i modelli piccoli vanno bene per cicli ristretti e ben strumentati.

**Come valuto un agente?**
Sui risultati, non sui passi: definisci un insieme di compiti rappresentativi con stati finali verificabili, eseguili ripetutamente (gli agenti sono non deterministici) e monitora il tasso di successo, il costo e i passi necessari al completamento.`,
  },
  {
    topicKey: 'local-llm-hardware',
    title: 'Quale hardware serve per eseguire un LLM in locale?',
    question: 'Di quale hardware ho bisogno per far girare un grande modello linguistico sulla mia macchina?',
    summary:
      'È la memoria, non la potenza di calcolo, a decidere cosa puoi eseguire: un modello 8B quantizzato sta in 8 GB, un 32B vuole circa 24 GB e i modelli di classe 70B chiedono 48 GB o più. Ecco i numeri reali e il software da usare.',
    tags: ['ai', 'llm', 'llm locale', 'hardware', 'gpu'],
    language: 'it',
    image: { prompt: promptOf('local-llm-hardware'), alt: 'Un cubo luminoso di reticolo neurale posato su una scheda grafica dentro un case PC aperto' },
    sources: [
      { title: 'llama.cpp — inferenza LLM in C/C++ (GGUF, quantizzazione)', url: 'https://github.com/ggml-org/llama.cpp' },
      { title: 'Ollama — esegui LLM aperti in locale', url: 'https://ollama.com' },
      { title: 'vLLM — serving LLM ad alto throughput', url: 'https://github.com/vllm-project/vllm' },
    ],
    content: `# Quale hardware serve per eseguire un LLM in locale?

Il vincolo determinante è la **memoria, non la velocità**. I pesi di un modello devono stare nella VRAM della tua GPU (o nella memoria unificata Apple) per avere prestazioni utilizzabili, e il conto è semplice: con la quantizzazione a 4 bit, un modello richiede all'incirca **0,5–0,7 GB per miliardo di parametri**, più 1–4 GB di margine per la cache del contesto.

## La tabella rapida di dimensionamento

| Classe di modello | Pesi a 4 bit | Configurazione comoda | Esempi di ciò che gira |
| --- | --- | --- | --- |
| 3–4B | ~2–3 GB | Qualsiasi laptop moderno, 8 GB di RAM | Piccoli assistenti, completamento automatico |
| 7–9B | ~4–6 GB | GPU da 8 GB o Mac da 16 GB | Modelli piccoli Llama/Qwen/Mistral |
| 13–14B | ~8–10 GB | GPU da 12–16 GB o Mac da 24 GB | Modelli di chat e coding di taglia media |
| 30–34B | ~18–22 GB | GPU da 24 GB (es. RTX 3090/4090) o Mac da 36–48 GB | Solidi generalisti locali |
| 70–72B | ~40–48 GB | 2 GPU da 24 GB o Mac Studio da 64 GB+ | Modelli aperti quasi di frontiera |
| Mixture-of-experts grandi | molto variabile | Classe workstation/server | Controlla la documentazione del singolo modello |

Due note su come leggerla: la quantizzazione (GGUF a 4 bit e simili) scambia una perdita di qualità piccola e di solito accettabile con un taglio di memoria di 4× rispetto a 16 bit; e i contesti lunghi fanno crescere la cache KV — chattare a un contesto di 32k può aggiungere diversi GB sopra ai pesi.

## GPU, Mac o CPU?

- **GPU NVIDIA**: il miglior throughput e il miglior supporto dell'ecosistema. La dimensione della VRAM conta più della generazione della GPU — una RTX 3090 usata da 24 GB resta una scelta economica amatissima per i modelli di classe 30B.
- **Apple Silicon**: la memoria unificata rende i Mac silenziosamente eccellenti — una macchina M-series da 64 GB esegue modelli quantizzati di classe 70B, più lenta di una configurazione a doppia GPU ma silenziosa e semplice. Compra RAM, non core.
- **Solo CPU**: funziona tramite llama.cpp, ma aspettati pochi token al secondo sui modelli piccoli — va bene per i lavori in batch, doloroso per la chat.

## Stack software

- **Ollama** — l'avvio più semplice: un comando per scaricare ed eseguire un modello, con un'API locale compatibile con OpenAI.
- **llama.cpp** — il motore sotto a gran parte dell'ecosistema; massimo controllo su quantizzazione e offloading.
- **LM Studio** — interfaccia grafica per sfogliare, scaricare e chattare.
- **vLLM** — quando servi molti utenti concorrenti da un vero server GPU invece che da un singolo desktop.

## Cosa aspettarsi, onestamente

Un modello quantizzato da 8–14B ben scelto gestisce riassunti, redazione, estrazione e un discreto aiuto alla scrittura di codice. I modelli aperti di classe 30B–70B sono davvero solidi, ma restano dietro ai modelli ospitati di frontiera sul ragionamento difficile. Le ragioni per andare in locale sono **privacy, uso offline, token illimitati a costo fisso e libertà di sperimentare** — non battere il cloud sulla qualità pura.

## FAQ

**Eseguire in locale fa risparmiare?**
Solo con un uso intenso e continuativo. L'hardware si ripaga se altrimenti bruceresti token API ogni giorno; per un uso occasionale le API sono più economiche.

**Posso eseguire modelli più grandi della mia VRAM?**
Sì — i layer possono riversarsi nella RAM di sistema a un costo elevato in velocità. Un modello che eccede la VRAM del 20% spesso va bene; 2× oltre è un supplizio.

**E il fine-tuning in locale?**
I metodi efficienti (LoRA/QLoRA) rendono fattibile il fine-tuning di modelli piccoli su una GPU da 24 GB. Il fine-tuning completo dei modelli grandi resta territorio da data center.`,
  },
  {
    topicKey: 'mcp-explained',
    title: 'Che cos’è l’MCP (Model Context Protocol)?',
    question: 'Che cos’è il Model Context Protocol e quale problema risolve?',
    summary:
      'L’MCP è uno standard aperto che consente a qualsiasi applicazione IA di connettersi a qualsiasi strumento o fonte di dati tramite un unico protocollo — sostituendo le integrazioni personalizzate fatte app per app e strumento per strumento. Una sorta di USB-C per il contesto dell’IA.',
    tags: ['ai', 'mcp', 'llm', 'integrazioni', 'standard aperti'],
    language: 'it',
    image: { prompt: promptOf('mcp-explained'), alt: 'Cavi dati di colori diversi che convergono in un’unica porta cristallina universale' },
    sources: [
      { title: 'Model Context Protocol — sito ufficiale e specifica', url: 'https://modelcontextprotocol.io' },
      { title: 'Anthropic, «Introducing the Model Context Protocol»', url: 'https://www.anthropic.com/news/model-context-protocol' },
    ],
    content: `# Che cos'è l'MCP (Model Context Protocol)?

Il Model Context Protocol (MCP) è uno standard aperto per connettere le applicazioni IA a strumenti e dati esterni. Prima della sua comparsa, ogni app IA doveva costruire un'integrazione personalizzata per ogni strumento — N app × M strumenti significavano N×M adattatori. L'MCP riduce tutto a N + M: un'app implementa il protocollo una volta come *client*, uno strumento lo espone una volta come *server*, e qualsiasi client può dialogare con qualsiasi server. L'analogia ormai diffusa ha preso piede perché è accurata: **USB-C per l'IA**.

## Perché esiste

Gli LLM sono utili tanto quanto il contesto che riescono a raggiungere. Il tuo assistente diventa enormemente più capace quando può leggere i tuoi file, interrogare il tuo database, cercare nei tuoi ticket o inviare un messaggio — ma collegare tutto questo in modo improvvisato produceva integrazioni fragili, non portabili e legate a un singolo fornitore. L'MCP, introdotto da Anthropic alla fine del 2024 e da allora adottato ampiamente in tutto il settore, standardizza questo collegamento. Al 2026 l'ecosistema conta migliaia di server della community e dei fornitori, per qualunque cosa, da GitHub e Slack a database e browser.

## Come funziona

L'MCP prevede tre ruoli:

- **Host** — l'applicazione IA con cui l'utente interagisce (un'app di chat, un IDE, un runtime di agenti).
- **Client** — la connessione di protocollo che l'host apre, una per server.
- **Server** — un programma (di solito piccolo) che espone capacità tramite il protocollo, in locale via stdio o da remoto via HTTP.

Un server può offrire tre tipi di capacità:

| Primitiva | Cos'è | Esempio |
| --- | --- | --- |
| **Strumenti** | Funzioni che il modello può chiamare | \`create_issue\`, \`query_database\` |
| **Risorse** | Dati che l'host può leggere nel contesto | Un file, uno schema, una dashboard |
| **Prompt** | Modelli parametrizzati riutilizzabili | «Rivedi questa PR con la nostra checklist» |

Il modello dell'host vede le definizioni degli strumenti, decide quando chiamarli, e il server le esegue e restituisce i risultati — il protocollo gestisce in modo uniforme scoperta, invocazione e trasporto.

## MCP vs semplice function calling

Il function calling è il modo in cui un *modello* invoca una funzione che il suo sviluppatore ha registrato in quella singola applicazione. L'MCP standardizza lo strato attorno: da dove vengono gli strumenti, come vengono scoperti, autenticati e trasportati — così lo stesso server funziona in qualsiasi app compatibile con MCP senza modifiche al codice. I due si compongono: sotto il cofano, una chiamata a uno strumento MCP raggiunge comunque il modello come function calling.

## Come iniziare

La rampa di accesso pratica è usare i server esistenti, non scriverne uno: gran parte dei principali client IA permette di aggiungere un server MCP con poche righe di configurazione, e gli SDK ufficiali (TypeScript, Python e altri) rendono la scrittura di un proprio server un lavoro da un pomeriggio — definisci qualche funzione tipizzata, e ogni client MCP può usarla.

## FAQ

**L'MCP è legato a un solo fornitore di modelli?**
No. È nato in Anthropic, ma è una specifica aperta con adozione multi-fornitore e un processo di governance aperto; client e server esistono in tutti i principali ecosistemi.

**È sicuro connettere server arbitrari?**
Tratta i server MCP come le estensioni del browser: girano con permessi reali. Usa fonti affidabili, esamina quali strumenti espone un server e preferisci host che richiedono l'approvazione esplicita dell'utente per ogni azione sensibile.

**Quando dovrei scrivere un mio server?**
Quando il tuo team ha un'API o un dataset interni che più strumenti IA dovrebbero raggiungere — un solo server li rende disponibili a ogni client compatibile con MCP usato dalla tua azienda.`,
  },
  {
    topicKey: 'vector-databases',
    title: 'Che cos’è un database vettoriale — e quando ti serve?',
    question: 'Che cos’è un database vettoriale e quando mi serve davvero?',
    summary:
      'I database vettoriali memorizzano gli embedding e trovano il «significato più vicino» invece delle corrispondenze esatte, alimentando ricerca semantica e RAG. Sotto il ~1 milione di vettori, strumenti più semplici come pgvector di solito bastano.',
    tags: ['ai', 'database vettoriale', 'embedding', 'ricerca', 'rag'],
    language: 'it',
    image: { prompt: promptOf('vector-databases'), alt: 'Un punto-query che propaga un’onda attraverso costellazioni raggruppate di vettori di embedding' },
    sources: [
      { title: 'Malkov & Yashunin, «Efficient and Robust ANN Search Using HNSW Graphs» (2016)', url: 'https://arxiv.org/abs/1603.09320' },
      { title: 'FAISS — libreria per la ricerca di similarità efficiente', url: 'https://github.com/facebookresearch/faiss' },
      { title: 'pgvector — similarità vettoriale per Postgres', url: 'https://github.com/pgvector/pgvector' },
    ],
    content: `# Che cos'è un database vettoriale — e quando ti serve?

Un database vettoriale memorizza gli **embedding** — liste di numeri che rappresentano il significato di testo, immagini o audio — e risponde a una sola domanda in modo eccellente: *«trova gli elementi più simili a questo».* È l'operazione che sta dietro a ricerca semantica, recupero per il RAG, raccomandazioni e rilevamento dei duplicati. Se ti serva uno dedicato dipende quasi interamente dalla scala.

## Gli embedding in un minuto

Un modello di embedding mappa i contenuti in un punto di uno spazio ad alta dimensionalità (di solito 256–3072 dimensioni) in modo tale che significati simili finiscano vicini tra loro. «Come reimposto la mia password» e «Sono stato bloccato fuori dal mio account» condividono poco vocabolario, ma come vettori si trovano vicini. La similarità si misura geometricamente — di solito con la similarità del coseno — quindi la ricerca diventa: incorpora la query, trova i punti memorizzati più vicini.

## Cosa lo rende un problema da *database*

Confrontare una query con ogni vettore memorizzato (forza bruta) è esatto ma lineare — va bene per migliaia di elementi, lento per milioni. I database vettoriali usano indici di **ricerca approssimata del vicino più prossimo (ANN)**, i più celebri grafi HNSW, che trovano il ~99% dei veri vicini in una frazione minima del tempo. Attorno a quel nucleo aggiungono le solite comodità da database: filtraggio sui metadati («solo i documenti di questo tenant»), aggiornamenti e cancellazioni, persistenza e scalabilità orizzontale.

## Quando ti serve davvero — onestamente

| Dimensione del corpus | Scelta ragionevole |
| --- | --- |
| Fino a ~100k vettori | Un array in memoria, FAISS o estensioni di SQLite — la forza bruta va bene |
| ~100k–qualche milione | **pgvector nel Postgres che già usi** — il default pragmatico |
| Molti milioni, QPS elevati, multi-tenant | Motore dedicato: Qdrant, Milvus, Weaviate o servizi gestiti come Pinecone |

L'errore architetturale più comune è aggiungere un nuovo pezzo di infrastruttura per 50.000 chunk. Se già usi Postgres, pgvector tiene i vettori accanto ai tuoi dati relazionali, transazionali e collegabili in join. Ricorri a un motore dedicato quando hai una scala reale, obiettivi di latenza stringenti o ricerche filtrate pesanti.

## Leve di qualità che contano più del database

- **Chunking**: il modo in cui suddividi i documenti incide sul recupero più di quale motore scegli. I chunk dovrebbero essere pensieri autonomi, spesso da 200–800 token con sovrapposizione.
- **Scelta del modello di embedding**: i modelli multilingue più recenti battono nettamente quelli più vecchi; riprodurre gli embedding di un corpus è fastidioso, quindi scegli con cura.
- **Ricerca ibrida**: combinare la similarità vettoriale con il classico punteggio per parole chiave (BM25) cattura nomi, codici e termini rari che gli embedding sfumano.
- **Reranking**: recuperare 50 candidati a basso costo e riassegnare il punteggio ai migliori con un cross-encoder di solito alza la qualità delle risposte più della messa a punto dell'indice.

## FAQ

**Gli embedding fanno trapelare i miei dati al fornitore dell'embedding?**
Il testo va a chi calcola l'embedding. Con le API ospitate è il fornitore (controlla i termini di conservazione); i modelli di embedding a pesi aperti girano completamente in locale.

**I vettori possono essere aggiornati quando i documenti cambiano?**
Sì — ma è compito della tua pipeline ri-suddividere e ri-incorporare i documenti modificati. I vettori obsoleti che servono in silenzio vecchi contenuti sono il classico bug di produzione.

**Una dimensione di embedding più grande è meglio?**
Non automaticamente. Le dimensioni più alte costano storage e latenza; molti modelli moderni offrono dimensioni troncabili dove 512–1024 mantengono quasi tutta la qualità. Misura sul tuo set di recupero.`,
  },
  {
    topicKey: 'ai-coding-assistants',
    title: 'Come ottenere valore reale dagli assistenti IA per la scrittura di codice',
    question: 'Come uso efficacemente gli assistenti IA per il codice senza danneggiare la qualità?',
    summary:
      'Gli strumenti IA per il codice danno i risultati migliori su boilerplate, test e terreni poco familiari — se fornisci loro contesto e ne rivedi l’output. Pratiche che funzionano, rischi da gestire e dove il tempo si guadagna davvero.',
    tags: ['ai', 'programmazione', 'assistenti per il codice', 'strumenti per sviluppatori', 'produttività'],
    language: 'it',
    image: { prompt: promptOf('ai-coding-assistants'), alt: 'Una mano umana e una robotica di luce che costruiscono insieme un ponte di blocchi di codice' },
    sources: [
      { title: 'Peng et al., «The Impact of AI on Developer Productivity: Evidence from GitHub Copilot» (2023)', url: 'https://arxiv.org/abs/2302.06590' },
      { title: 'SWE-bench — benchmark di LLM su issue reali di GitHub', url: 'https://www.swebench.com' },
    ],
    content: `# Come ottenere valore reale dagli assistenti IA per la scrittura di codice

Gli assistenti IA per il codice sono davvero produttivi — studi controllati hanno mostrato accelerazioni notevoli su compiti autonomi, e entro il 2026 gli strumenti agentici che eseguono test e modificano più file sono andati ben oltre il completamento automatico. Ma i guadagni sono disomogenei, e sono condizionati da due abitudini: **dare allo strumento un contesto reale** e **rivedere ciò che scrive**. I team che saltano una delle due tendono a spedire bug sottili più in fretta.

## Dove si concentrano i guadagni

- **Boilerplate e collante**: endpoint CRUD, configurazione, serializzazione, wrapper di client API.
- **Test**: generare suite di test unitari complete a partire dal codice esistente è uno degli usi a più alto valore per minuto.
- **Terreni poco familiari**: un nuovo linguaggio, framework o API — l'assistente comprime in minuti ore di lettura della documentazione.
- **Refactoring meccanici**: rinomine, cambi di firma, applicazione di uno schema noto su più file.
- **Spiegazione del codice**: prendere confidenza con un modulo legacy ponendogli domande.

Dove i guadagni si riducono: logica di dominio profonda, kernel critici per le prestazioni, grandi decisioni architetturali e codice in cui sbagliare costa caro. Lì l'assistente è uno sparring partner, non un autore.

## Pratiche che separano gli esiti buoni da quelli cattivi

**Delimita la richiesta.** «Aggiungi la paginazione a questo endpoint, seguendo come fa \`listUsers\`» batte «migliora questa API». Incrementi piccoli e verificabili si sommano; le generazioni da mille righe sono incubi da rivedere.

**Fornisci il contesto in modo deliberato.** Indirizza lo strumento ai file rilevanti, al messaggio di errore, allo schema, alle convenzioni del team. Gli assistenti agentici moderni sanno trovare il contesto da soli — ma indicare i file di partenza giusti dimezza comunque il loro vagare.

**Lascia che esegua i test.** Il singolo miglioramento di affidabilità più grande è un ciclo di feedback: un assistente che può eseguire la suite di test intercetta i propri errori invece di spedirteli.

**Rivedi come faresti con la PR di un junior sicuro di sé.** Il codice si legge in modo plausibile; ed è proprio per questo che scorrerlo distrattamente è pericoloso. Controlla casi limite, gestione degli errori e superfici sensibili alla sicurezza (validazione degli input, autenticazione, query) con piena attenzione.

**Tieni test e tipi come guardrail.** Una tipizzazione forte e una buona copertura trasformano «l'IA ha rotto qualcosa» da incidente in produzione a CI in rosso.

## Tipo di compito → aspettativa realistica

| Compito | Aspettativa |
| --- | --- |
| Test unitari per codice esistente | Grande accelerazione, alta affidabilità |
| Boilerplate/impalcatura | Grande accelerazione |
| Correzione di bug con test riproducibile | Buona — gli strumenti agentici spesso la centrano |
| Funzionalità in un framework poco familiare | Forte compressione della curva di apprendimento |
| Concorrenza/prestazioni sottili | Aiuto modesto; verifica con rigore |
| Progettazione di sistemi | Utile interlocutore, non un oracolo |

## Guardrail a livello di team

Adotta in modo esplicito, non di nascosto: concorda dove gli assistenti sono incoraggiati, richiedi lo stesso livello di revisione per il codice generato, sorveglia l'output verbatim sensibile alle licenze nelle codebase regolamentate e mantieni la CI come autorità. E proteggi il ciclo di apprendimento — i junior che incollano senza leggere si arenano; i junior che interrogano l'assistente imparano più in fretta di qualsiasi generazione precedente.

## FAQ

**Gli assistenti mi renderanno un ingegnere peggiore?**
Erodono le competenze che smetti di esercitare e amplificano quelle che dirigi. Gli ingegneri capaci di specificare, scomporre e verificare ottengono più leva ogni anno; la pura velocità di battitura smette di contare.

**Perché l'assistente produce con sicurezza codice che non compila?**
Predice codice plausibile, e a volte allucina le API. Tratta compilazione e test come arbitro — e preferisci strumenti che compilano/eseguono il codice prima di mostrartelo.

**Agente o completamento automatico?**
Entrambi, per lavori diversi: completamento in linea per il flusso mentre scrivi; modalità agentica per compiti autonomi che sai descrivere e verificare, come «fai passare questi test».`,
  },
  {
    topicKey: 'llm-hallucinations',
    title: 'Perché i grandi modelli linguistici hanno le allucinazioni?',
    question: 'Perché i grandi modelli linguistici si inventano le cose, e come si possono ridurre le allucinazioni?',
    summary:
      'Gli LLM sono addestrati a produrre testo plausibile, non verità verificata — quando la conoscenza finisce, a riempire il vuoto arriva la congettura fluente. Perché accade, quando peggiora e le mitigazioni che funzionano davvero.',
    tags: ['ai', 'llm', 'allucinazioni', 'affidabilità', 'apprendimento automatico'],
    language: 'it',
    image: { prompt: promptOf('llm-hallucinations'), alt: 'Un fascio da un nucleo neurale che rende struttura solida e nebbia che si dissolve' },
    sources: [
      { title: 'Huang et al., «A Survey on Hallucination in Large Language Models» (2023)', url: 'https://arxiv.org/abs/2311.05232' },
      { title: 'Lin et al., «TruthfulQA: Measuring How Models Mimic Human Falsehoods» (2021)', url: 'https://arxiv.org/abs/2109.07958' },
      { title: 'Liu et al., «Lost in the Middle: How Language Models Use Long Contexts» (2023)', url: 'https://arxiv.org/abs/2307.03172' },
    ],
    content: `# Perché i grandi modelli linguistici hanno le allucinazioni?

Un modello linguistico è addestrato a fare una cosa sola: predire il testo che plausibilmente prosegue ciò che è venuto prima. Verità e plausibilità di solito coincidono — è per questo che i modelli sono utili — ma quando al modello manca il fatto che hai chiesto, l'obiettivo di addestramento esige comunque un output fluente. Il risultato è una risposta sbagliata, sicura e ben formata. L'allucinazione non è un difetto innestato sugli LLM; è il comportamento predefinito dei sistemi che massimizzano la plausibilità ai margini della loro conoscenza.

## I meccanismi

- **Compressione con perdita.** L'addestramento comprime terabyte di testo in un insieme fisso di pesi. La conoscenza comune sopravvive con alta fedeltà; i fatti rari — i dettagli di un piccolo paese, un articolo minore, le specifiche di un prodotto di nicchia — si sfumano o si perdono, e il modello non riesce a dire in modo affidabile quali.
- **Nessun passo di consultazione.** Un modello puro non interroga un database prima di rispondere; genera dalla memoria statistica. Non esiste un flag interno che dica «questo è un fatto recuperato» rispetto a «questo è completamento di schema».
- **L'addestramento premia il rispondere.** I modelli regolati sulle preferenze umane imparano che le risposte utili, sicure e complete sono valutate bene — storicamente, benchmark e valutatori penalizzavano il «non lo so», insegnando ai modelli a tirare a indovinare.
- **Accumulo degli errori.** La generazione è sequenziale; un solo token sbagliato all'inizio (un nome inventato, un anno errato) viene elaborato in un paragrafo falso e coerente.

## Dove peggiora, in modo prevedibile

Citazioni e riferimenti (il formato è facile da imitare, i contenuti non sono memorizzati), numeri e date precisi, entità rare, documenti lunghi (i modelli prestano meno attenzione in modo affidabile al centro di contesti lunghi), aritmetica fatta nel testo e qualsiasi domanda fondata su una falsità che il modello accetta cortesemente.

## Mitigazioni che funzionano

| Mitigazione | A cosa rimedia |
| --- | --- |
| RAG / ancoraggio a documenti recuperati | Sostituisce la memoria con fatti forniti; abilita le citazioni |
| Uso di strumenti (calcolatrice, codice, ricerca) | Esternalizza ciò che i modelli calcolano peggio |
| «Rispondi solo dal contesto; altrimenti di' non lo so» | Dà il permesso di rifiutare |
| Temperatura più bassa per i compiti fattuali | Taglia il campionamento creativo-ma-sbagliato |
| Autoverifica / controllo in seconda passata | Cattura le incongruenze che la prima passata ha mancato |
| Citazioni obbligatorie + flusso di verifica a campione | Rende gli errori individuabili dalle persone |
| Modelli di ragionamento sui problemi difficili | Procedere per passi riduce gli errori non forzati |

L'ancoraggio è il peso massimo: quando il passaggio giusto è nel contesto, il compito del modello passa dal *ricordare* al *leggere*, cosa che fa in modo molto più affidabile. È per questo che il RAG resta l'architettura standard per i prodotti fattuali.

## Si può risolvere del tutto?

Non con le architetture attuali — un sistema che deve sempre produrre testo a volte produrrà testo non supportato. La ricerca continua a ridurre i tassi (calibrazione migliore, addestrare i modelli ad astenersi, strati di verifica), e i modelli capaci di ragionare allucinano meno sui problemi a più passi. La postura ingegneristica, al 2026: progettare **assumendo** un'allucinazione residua — ancorare le risposte, richiedere citazioni per le affermazioni che contano, tenere le persone nel ciclo dove gli errori costano cari.

## FAQ

**Perché il modello suona PIÙ sicuro quando ha torto?**
Fluenza e sicurezza sono schemi stilistici appresi dal testo, non correlati alla certezza interna. Non usare il tono come segnale di verità.

**Chiedere «sei sicuro?» aiuta?**
A volte innesca un'autorevisione utile, a volte un accordo sicofantico con il dubbio che hai implicato. La verifica indipendente batte l'interrogatorio.

**I modelli più grandi sono più veritieri?**
In generale sì sulla fattualità ampia, ma nessuna dimensione elimina l'invenzione — e anche lo stile sicuro scala. La scala riduce il problema; ancoraggio e verifica gestiscono ciò che resta.`,
  },
  {
    topicKey: 'open-vs-closed-llms',
    title: 'LLM open source o closed source: come scegliere',
    question: 'Conviene costruire su grandi modelli linguistici open source o closed source?',
    summary:
      'Le API chiuse comprano capacità di frontiera con zero operatività; i modelli a pesi aperti comprano controllo, privacy e scala economica. I fattori decisivi sono la sensibilità dei dati, l’economia dei volumi e quanta capacità il tuo compito richiede davvero.',
    tags: ['ai', 'llm', 'open source', 'strategia', 'infrastruttura'],
    language: 'it',
    image: { prompt: promptOf('open-vs-closed-llms'), alt: 'Un nucleo aperto a reticolo accanto a un nucleo sigillato e lucido con una sola porta' },
    sources: [
      { title: 'LMArena — classifica della community che confronta modelli aperti e chiusi', url: 'https://lmarena.ai' },
      { title: 'Hugging Face — hub di modelli aperti', url: 'https://huggingface.co/models' },
    ],
    content: `# LLM open source o closed source: come scegliere

«Aperto o chiuso» è meno una questione ideologica che una questione di approvvigionamento: **chi esegue il modello, chi vede i tuoi dati e chi si fa carico del peso operativo.** I modelli chiusi (serviti via API — le famiglie GPT, Claude e Gemini) vendono capacità di frontiera con zero infrastruttura. I modelli a pesi aperti (le famiglie Llama, Qwen, DeepSeek, Mistral e molte altre) ti consegnano i pesi e con essi controllo, privacy e il conto per servirli.

Una nota terminologica che conta nei contratti: gran parte dei modelli «open source» sono per la precisione **a pesi aperti** — puoi scaricarli ed eseguirli, ma i dati di addestramento non sono pubblicati e le licenze possono comportare restrizioni d'uso. Leggi la licenza, non il marketing.

## La tabella dei compromessi

| Dimensione | Chiuso (API) | Pesi aperti (self-hosted) |
| --- | --- | --- |
| Capacità di picco | Frontiera; i più forti sul ragionamento difficile | I migliori modelli aperti si avvicinano e guidano sul costo per qualità |
| Forma del costo | Per token, scala con l'uso | Infrastruttura fissa + operatività, scala con la capacità |
| Controllo dei dati | I dati transitano per il fornitore (controlla i termini di conservazione/addestramento) | Non lasciano mai la tua rete |
| Personalizzazione | Prompting, qualche fine-tuning ospitato | Fine-tuning completo, quantizzazione, modifiche profonde |
| Peso operativo | Nessuno | GPU, stack di serving, aggiornamenti, reperibilità |
| Stabilità | I modelli vengono deprecati secondo i tempi del fornitore | I pesi sono tuoi per sempre |
| Conformità | Certificazioni del fornitore | La storia più semplice per regole stringenti di residenza dei dati |

## Quando vince il chiuso

Ti serve il ragionamento più forte disponibile; il tuo volume è modesto o irregolare; non hai capacità operative su GPU/ML; vuoi che i miglioramenti di capacità ti arrivino con continuità. Per il primo anno di gran parte dei team di prodotto, un'API di frontiera è la via più rapida per scoprire se il prodotto funziona davvero — ottimizza dopo che lo fa.

## Quando vince l'aperto

I dati non possono uscire (sanità, difesa, residenza stringente); un volume elevato e continuativo fa sì che il prezzo per token domini i tuoi margini; ti serve una personalizzazione profonda o un piccolo specialista veloce distillato per un compito; stai integrando un modello in hardware o in ambienti isolati; oppure il lock-in del fornitore è un rischio strategico che sei pagato per evitare.

## Lo schema su cui finiscono i team più maturi

**Instrada, non giurare fedeltà.** Un modello chiuso capace gestisce la coda difficile e a basso volume; un modello aperto messo a punto gestisce il nucleo ad alto volume e ben compreso; i carichi sensibili restano on-premise. Gli strati di astrazione e gli stack di serving compatibili con OpenAI rendono economico costruire l'instradamento multi-modello, e il divario tra i livelli si rimisura ogni trimestre — perché al 2026 continua a muoversi.

## FAQ

**I modelli aperti sono «una generazione indietro»?**
Il divario alla frontiera persiste ma si è ristretto enormemente, e per molti compiti concreti (estrazione, riassunto, coding di routine) i forti modelli aperti sono semplicemente sufficienti. Misura il tuo compito, non i titoli dei giornali.

**Il self-hosting è davvero più economico?**
Solo con l'utilizzo. Una GPU che serve al 5% della capacità è la fabbrica di token più costosa del pianeta; le API gestite di modelli aperti sono la via di mezzo — pesi aperti, GPU di qualcun altro.

**Posso cambiare in seguito?**
Il comportamento a livello di prompt si trasferisce in modo imperfetto tra i modelli. Mantieni una suite di valutazione fin dal primo giorno; il costo della migrazione è soprattutto rivalidazione, e le valutazioni la trasformano da settimane di sensazioni a giorni di diff.`,
  },
  {
    topicKey: 'llm-tokens-pricing',
    title: 'Cosa sono i token e come funziona il prezzo degli LLM?',
    question: 'Che cos’è esattamente un token e come fanno pagare l’uso i fornitori di LLM?',
    summary:
      'I token sono i frammenti di sottoparola che i modelli leggono e scrivono — all’incirca ¾ di una parola inglese ciascuno. Il prezzo delle API è per milione di token, con l’output che costa diverse volte l’input e caching/batching come grandi leve.',
    tags: ['ai', 'llm', 'token', 'prezzo', 'api'],
    language: 'it',
    image: { prompt: promptOf('llm-tokens-pricing'), alt: 'Un prisma che taglia un nastro di luce-testo in token pesati su una bilancia' },
    sources: [
      { title: 'tiktoken — tokenizzatore BPE veloce usato dai modelli OpenAI', url: 'https://github.com/openai/tiktoken' },
      { title: 'Sennrich et al., «Neural Machine Translation of Rare Words with Subword Units» (BPE, 2015)', url: 'https://arxiv.org/abs/1508.07909' },
    ],
    content: `# Cosa sono i token e come funziona il prezzo degli LLM?

I modelli non leggono caratteri né parole — leggono **token**: frammenti di sottoparola prodotti da un tokenizzatore. «Understanding» potrebbe essere un token; «unconstitutionally» potrebbe essere quattro; una emoji rara potrebbe essere tre. Ogni limite di capacità (la finestra di contesto) e ogni fattura delle API sono espressi in queste unità, quindi farsi un'idea di massima si ripaga in fretta.

## Regole pratiche

- **Inglese**: 1 token ≈ 4 caratteri ≈ ¾ di parola. Un documento di 1.000 parole ≈ 1.300–1.500 token.
- **Codice**: più denso di token della prosa — punteggiatura, indentazione e identificatori costano tutti.
- **Cinese/giapponese/coreano**: all'incirca 1–2 caratteri per token sui tokenizzatori moderni; per *informazione trasmessa*, il testo CJK è spesso paragonabile o leggermente più costoso dell'inglese.
- **Numeri e URL**: sorprendentemente costosi; gli ID lunghi si frantumano in molti token.

I tokenizzatori sono costruiti con la codifica a coppie di byte (BPE): partendo dai byte e fondendo ripetutamente le coppie più frequenti, così le stringhe comuni diventano singoli token. Ogni famiglia di modelli ha il proprio tokenizzatore — i conteggi differiscono tra i fornitori, ed è per questo che i confronti di costo andrebbero fatti sul *tuo* traffico reale.

## Come gira il contatore

Il prezzo delle API ha una forma standard tra i fornitori:

| Contatore | Cosa conta | Relazione tipica |
| --- | --- | --- |
| **Token di input** | Tutto ciò che invii: system prompt, cronologia, documenti recuperati, la domanda | Tariffa di base |
| **Token di output** | Tutto ciò che il modello genera, incluso il ragionamento nascosto su alcuni modelli di ragionamento | Comunemente ~3–5× la tariffa di input |
| **Input in cache** | Prefissi stabili e ripetuti (system prompt, documenti lunghi) | Spesso ~10× più economico dell'input fresco |
| **Batch/asincrono** | Lavori non urgenti inviati in blocco | Comunemente ~metà prezzo |

Ne derivano due fatti strutturali. Primo, **la cronologia della conversazione viene rinviata a ogni turno** — il costo di una chat cresce in modo quadratico con la sua lunghezza, a meno che tu non tronchi, riassuma o ti affidi al caching. Secondo, **l'output domina** quando generi testi lunghi, quindi le istruzioni «sii conciso» e i limiti di output sono veri controlli di costo, non semplici preferenze di stile.

## Stimare un carico di lavoro

L'aritmetica è sempre la stessa: (richieste al giorno) × (token medi di input × tariffa input + token medi di output × tariffa output). Esempio svolto con tariffe segnaposto — poniamo che l'input costi 3 $ e l'output 15 $ per milione di token: un bot di supporto che risponde a 10.000 richieste al giorno con prompt da 2.000 token (istruzioni + contesto recuperato) e risposte da 300 token costa 10.000 × (2.000×3 $ + 300×15 $)/1M ≈ **105 $/giorno**, di cui due terzi di input. Quel rapporto è tipico per le app RAG — ed è per questo che il caching del prompt e lo sfoltimento del contesto di solito fanno risparmiare più che cambiare modello.

## Le grandi leve, in ordine

1. **Metti in cache i prefissi stabili** — vittorie quasi gratuite per qualsiasi app con un lungo system prompt fisso o documenti condivisi.
2. **Dimensiona il modello correttamente** — instrada il traffico facile verso un livello più economico; riserva i modelli di frontiera alla coda difficile.
3. **Sfoltisci il contesto** — recupera meno chunk ma migliori; riassumi i vecchi turni di chat; deduplica il boilerplate.
4. **Limita e modella l'output** — imposta lunghezze massime; preferisci risposte brevi e strutturate dove possibile.
5. **Metti in batch ciò che non è urgente** — la classificazione notturna e i backfill non dovrebbero pagare prezzi interattivi.

## FAQ

**Perché mi sono stati addebitati più token di quanto suggerisca la lunghezza del mio testo?**
System prompt, definizioni degli strumenti, formattazione dei messaggi e (sui modelli di ragionamento) i token di pensiero contano tutti, e il testo non inglese o ricco di codice si tokenizza più densamente della regola pratica per l'inglese.

**Le finestre di contesto cambiano il prezzo?**
La finestra è un limite di capacità, non un prezzo — ma riempirla lo è. Alcuni fornitori applicano anche tariffe maggiorate oltre certe dimensioni di contesto, quindi le chiamate a contesto gigante meritano attenzione.

**Come conto i token prima di inviare?**
Usa la libreria di tokenizzazione del fornitore o l'endpoint di conteggio dei token (per i tokenizzatori della famiglia OpenAI, tiktoken gira in locale). Per i preventivi, l'euristica dei ≈4 caratteri di solito sta entro il 20%.`,
  },
];
