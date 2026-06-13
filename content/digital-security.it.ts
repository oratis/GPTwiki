import type { DraftArticle } from './types';
import { digitalSecurityEn } from './digital-security.en';

// Batch: Digital Privacy & Security (versione nativa in italiano). Stessi titoli e
// topicKey di digital-security.en.ts; i contenuti sono scritti in modo nativo per
// lettori italiani. Le immagini sono condivise.

const promptOf = (key: string): string => {
  const hit = digitalSecurityEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const digitalSecurityIt: DraftArticle[] = [
  {
    topicKey: 'password-managers',
    title: 'Perché dovresti usare un gestore di password',
    question: 'Che cos’è un gestore di password ed è davvero più sicuro che ricordarsele a memoria?',
    summary:
      'Un gestore di password genera e custodisce una password forte e unica per ogni account dietro un’unica password principale, così la violazione di un sito non sblocca tutti gli altri. È l’abitudine di sicurezza più efficace per la maggior parte delle persone.',
    tags: ['sicurezza', 'privacy', 'password', 'sicurezza digitale'],
    language: 'it',
    image: {
      prompt: promptOf('password-managers'),
      alt: 'Una chiave principale apre un caveau con centinaia di chiavi tutte diverse',
    },
    sources: [
      { title: 'NIST — Linee guida sull’identità digitale (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Usa password forti e gestori di password', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# Perché dovresti usare un gestore di password

Il problema centrale che un gestore di password risolve è il **riutilizzo**. Nessuno riesce a ricordare cento password forti e diverse, perciò le persone ne riciclano una manciata — il che significa che, nel momento in cui un sito qualunque viene violato, gli aggressori prendono quella coppia email-password e la provano sulla tua banca, sulla tua email e ovunque altro. Questo attacco automatizzato (chiamato credential stuffing) è uno dei modi più comuni con cui gli account vengono rubati. Un gestore di password lo elimina alla radice assegnando a ogni singolo account la propria password unica e casuale.

## Come funziona

Un gestore di password è un caveau cifrato. Tu ricordi esattamente **una** password principale forte; lui ricorda tutto il resto:

- **Genera** password lunghe e casuali (es. \`v8#mQ2!pLx9$\`) che non devi mai digitare né ricordare.
- **Le custodisce** cifrate, chiuse a chiave dalla tua password principale.
- **Compila in automatico** la credenziale giusta sul sito giusto — il che, come bonus, resiste al phishing, perché non inserirà la tua vera password bancaria in un dominio falso fatto somigliare a quello reale.

Il caveau è cifrato in modo che nemmeno l’azienda che fornisce il gestore possa leggere le tue password — una proprietà chiamata zero-knowledge. La tua password principale non lascia mai il tuo dispositivo in forma utilizzabile.

## L’obiezione, con risposta

Il timore istintivo è "non è pericoloso mettere tutte le mie password in un unico posto?" Sembra rischioso, ma i conti dicono il contrario:

| Senza un gestore | Con un gestore |
| --- | --- |
| Poche password, riutilizzate tantissimo | Una password unica per ogni sito |
| Una violazione → molti account cadono | Una violazione → un account, isolato |
| Scelte deboli ma memorizzabili | Scelte lunghe, casuali, non forzabili |
| Password digitate nei siti di phishing | Il riempimento automatico rifiuta i domini errati |

Sì, la password principale è un singolo punto di vulnerabilità — quindi proteggi *quella* bene (passphrase lunga, più la verifica in due passaggi sul gestore stesso) e accetti che difendere ferocemente un solo segreto batte difenderne cento male.

## Come scegliere e iniziare

I gestori affidabili — sia i servizi cloud ben recensiti, sia le rispettate soluzioni offline/open source — sono tutti enormemente meglio del riutilizzo. Indicazioni pratiche:

- **Password principale**: falla diventare una passphrase lunga di parole casuali, unica, mai usata altrove. È quella che memorizzi davvero.
- **Attiva la verifica in due passaggi** per l’account del gestore stesso.
- **Migra gradualmente**: lascia che importi le password esistenti, poi cambia per prime quelle riutilizzate sugli account importanti (email, banca, negozio principale).
- **Anche quello integrato nel browser** batte il riutilizzo — il comportamento chiave è avere password uniche ovunque, non la marca specifica.

## Domande frequenti

**E se dimentico la password principale?**
Con una vera cifratura zero-knowledge, il fornitore di solito non può recuperarla — è proprio questo il punto. Imposta le opzioni di recupero del gestore (kit di emergenza, codice di recupero) quando inizi e conservale offline.

**La sincronizzazione sul cloud è sicura?**
Il caveau si sincronizza già cifrato, quindi il server di sincronizzazione contiene sempre e solo un blocco illeggibile. A proteggerlo è la cifratura, non la rete.

**Le password salvate nel browser bastano?**
Sono molto meglio del riutilizzo e vanno bene per molte persone. I gestori dedicati aggiungono l’uso tra browser diversi, la condivisione sicura, gli avvisi di violazione e un isolamento più forte — convengono man mano che la tua lista di account cresce.`,
  },
  {
    topicKey: 'two-factor-auth',
    title: 'Verifica in due passaggi: quale tipo è davvero sicuro?',
    question: 'Che cos’è la verifica in due passaggi e perché l’SMS è la versione più debole?',
    summary:
      'La verifica in due passaggi aggiunge una seconda prova oltre alla password, così la sola password rubata non basta. Ma i tipi non si equivalgono: i codici via SMS possono essere intercettati o vittime di SIM swap, mentre le app di autenticazione e le chiavi hardware sono molto più robuste.',
    tags: ['sicurezza', '2fa', 'autenticazione', 'sicurezza digitale'],
    language: 'it',
    image: {
      prompt: promptOf('two-factor-auth'),
      alt: 'Una porta che richiede una chiave e un token dinamico separato per passare',
    },
    sources: [
      { title: 'NIST — Linee guida sull’identità digitale (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Più di una password (autenticazione a più fattori)', url: 'https://www.cisa.gov/MFA' },
    ],
    content: `# Verifica in due passaggi: quale tipo è davvero sicuro?

La verifica in due passaggi (2FA, o più in generale MFA) significa che accedere richiede **due tipi diversi di prova**: qualcosa che *sai* (la tua password) più qualcosa che *hai* (un codice, un’app, una chiave fisica). Il senso è la resilienza — anche se un aggressore ruba la tua password tramite una violazione o un phishing, senza il secondo fattore non riesce comunque a entrare. Attivarla è una delle cose più efficaci che puoi fare. Ma il secondo fattore si presenta in varie forme, e queste sono tutt’altro che equivalenti per robustezza.

## La scala, dalla più debole alla più forte

| Metodo | Come funziona | Punto debole |
| --- | --- | --- |
| **Codice via SMS** | Un codice inviato via messaggio al telefono | SIM swap, intercettazione di rete, vulnerabile al phishing |
| **App di autenticazione** | L’app genera un codice a 6 cifre che ruota ogni 30 s | Vulnerabile al phishing se lo digiti in un sito falso |
| **Approvazione push** | Richiesta "Approvi questo accesso?" sul telefono | Attacchi da "fatica" — spam finché non tocchi sì |
| **Chiave di sicurezza hardware / passkey** | Una chiave fisica o credenziale legata al dispositivo, vincolata crittograficamente al sito reale | Resiste al phishing per progettazione |

Tutto ciò che c’è in questo elenco batte la sola password. Ma i gradini contano.

## Perché l’SMS è il gradino debole

I codici via messaggio sono stati la prima 2FA di massa e restano comuni, ma hanno punti deboli reali e già sfruttati:

- **SIM swap**: un aggressore convince (o corrompe) il tuo operatore mobile a spostare il tuo numero sulla sua SIM, e i tuoi codici ora arrivano sul *suo* telefono. È un modo documentato e ricorrente con cui gli account di alto valore vengono svuotati.
- **Intercettazione**: la segnalazione di base della rete telefonica ha difetti noti che possono dirottare i messaggi.
- **Comunque vulnerabile al phishing**: una pagina di accesso falsa può semplicemente chiederti il codice SMS e ritrasmetterlo in tempo reale.

Il verdetto onesto: **la 2FA via SMS è molto meglio di niente** — tienila dove è l’unica opzione — ma sposta gli account importanti (email, finanza, identità principale) più in alto sulla scala.

## Cosa usare davvero

- **Usa per impostazione predefinita un’app di autenticazione** (codici rotanti) — gratuita, facile, immune al SIM swap e supportata quasi ovunque.
- **Per gli account più critici, usa una chiave hardware o una passkey** — sono *resistenti al phishing*: la credenziale è vincolata crittograficamente al sito autentico, perciò semplicemente non si autenticherà con un sito-sosia, sconfiggendo l’attacco che batte ogni metodo basato su codici.
- **Proteggi prima la tua email.** È la chiave principale — i reimpostamenti di password di tutto il resto passano da lì, quindi merita il tuo fattore più forte.

## Domande frequenti

**Una 2FA qualunque è meglio di nessuna?**
Sì, in modo netto. Persino l’SMS blocca la stragrande maggioranza degli attacchi automatizzati. Non lasciare che il discorso "l’SMS è debole" ti dissuada dall’attivarla dove è tutto ciò che viene offerto.

**Cosa succede se perdo il telefono / la chiave?**
Salva i codici di backup/recupero che ogni servizio offre durante la registrazione, e registra un secondo fattore (una chiave di riserva, o l’app su un secondo dispositivo). Conserva i codici di recupero offline.

**Le richieste push di "approvazione" sono sicure?**
Buone, ma vulnerabili agli attacchi da fatica — richieste infinite nella speranza che tu tocchi "approva" pur di farle smettere. Non approvare mai un accesso che non hai avviato tu; preferisci, dove disponibili, le richieste con abbinamento di numeri.`,
  },
  {
    topicKey: 'passkeys',
    title: 'Cosa sono le passkey e stanno sostituendo le password?',
    question: 'Che cos’è una passkey e in cosa si differenzia da una password?',
    summary:
      'Una passkey sostituisce la password con una coppia di chiavi crittografiche divisa tra il sito e il tuo dispositivo — nulla di segreto viene digitato o condiviso, quindi non c’è niente da phishare, riutilizzare o rubare in una violazione. È la successora designata dal settore alle password.',
    tags: ['sicurezza', 'passkey', 'autenticazione', 'password'],
    language: 'it',
    image: {
      prompt: promptOf('passkeys'),
      alt: 'Due metà di chiave dimostrano a distanza di combaciare senza toccarsi',
    },
    sources: [
      { title: 'FIDO Alliance — Panoramica sulle passkey', url: 'https://fidoalliance.org/passkeys/' },
      { title: 'NIST — Linee guida sull’identità digitale (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
    ],
    content: `# Cosa sono le passkey e stanno sostituendo le password?

Una passkey è una credenziale di accesso pensata per correggere i due peccati originali della password: le password sono **segreti condivisi** (tu e il sito conoscete entrambi la stessa stringa, quindi può essere rubata da una delle due parti) e vengono **digitate** (perciò possono essere phishate o riutilizzate). Una passkey non è né condivisa né digitata. Si fonda sulla crittografia a chiave pubblica e, una volta capita la divisione, i vantaggi di sicurezza sono evidenti.

## L’idea della coppia di chiavi, in parole semplici

Quando crei una passkey, il tuo dispositivo genera una **coppia** di chiavi collegate matematicamente:

- Una **chiave privata** che non lascia mai il tuo dispositivo (telefono, portatile o chiave di sicurezza), protetta dalla tua impronta, dal volto o dal PIN del dispositivo.
- Una **chiave pubblica** che viene consegnata al sito.

La chiave pubblica non è un segreto — non può essere usata per impersonarti. Per accedere, il sito invia una sfida; il tuo dispositivo dimostra di possedere la chiave privata corrispondente *senza mai rivelarla*. Nulla di segreto attraversa la rete, e nulla di riutilizzabile viene mai conservato sul server.

## Perché questo sconfigge gli attacchi più comuni

| Attacco | Contro le password | Contro le passkey |
| --- | --- | --- |
| Violazione del database | Ruba le password (con hash) | Ruba solo chiavi pubbliche — inutili per gli aggressori |
| Phishing | Il sito falso cattura ciò che digiti | Niente da digitare; la chiave è vincolata al dominio reale |
| Riutilizzo | Una fuga sblocca molti siti | Ogni passkey è unica e specifica del sito per progettazione |
| Credential stuffing | Funziona in massa | Niente da "stuffare" |

La resistenza al phishing è il punto forte. Una passkey è legata crittograficamente all’identità del sito autentico, perciò un dominio-sosia letteralmente non può attivarla — chiudendo la falla che persino i codici delle app di autenticazione lasciano aperta.

## Usarle oggi

In pratica, una passkey di solito è come **sbloccare il telefono**: compare una richiesta, confermi con impronta o volto, sei dentro — nessuna password, nessun codice da copiare. Le passkey in genere si sincronizzano attraverso l’ecosistema del tuo dispositivo (così un telefono nuovo le mantiene) oppure risiedono su una chiave di sicurezza hardware per la massima garanzia. La diffusione è ampia e crescente sulle principali piattaforme e su grandi siti web, anche se è a metà transizione: la maggior parte dei siti che offrono passkey conserva ancora le password come ripiego.

## Domande frequenti

**E se perdo il dispositivo?**
Le passkey sincronizzate sono recuperabili tramite il tuo account di piattaforma su un nuovo dispositivo (protetto dalla sua stessa solida sicurezza). Per le chiavi legate al dispositivo, registra una seconda passkey o tieni un metodo di backup — stessa disciplina del recupero della 2FA.

**Un’azienda che subisce una violazione può far trapelare la mia passkey?**
No — il server custodisce solo la tua chiave pubblica, che non è un segreto e non può accedere al posto tuo. È questo il vantaggio strutturale rispetto ai database di password.

**Mi serve ancora un gestore di password?**
Per ora sì — le passkey vengono distribuite gradualmente, quindi per anni avrai un mix. Molti gestori di password custodiscono già anche le passkey, diventando un caveau unico per entrambi.`,
  },
  {
    topicKey: 'phishing-scams',
    title: 'Come riconoscere phishing e truffe online',
    question: 'Come posso riconoscere un’email di phishing o un messaggio truffa prima che mi inganni?',
    summary:
      'Il phishing fabbrica urgenza per farti agire prima di pensare — un falso avviso, un’offerta troppo bella, un link "verifica subito". Le difese sono abitudini, non gadget: rallenta, controlla mittente e link reali, e non inserire mai le credenziali dal link di un messaggio.',
    tags: ['sicurezza', 'phishing', 'truffe', 'sicurezza digitale'],
    language: 'it',
    image: {
      prompt: promptOf('phishing-scams'),
      alt: 'Un amo travestito da busta si avvicina a un pesce fermo in un anello protettivo',
    },
    sources: [
      { title: 'CISA — Riconosci e segnala il phishing', url: 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing' },
      { title: 'FTC — Come riconoscere ed evitare le truffe di phishing', url: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams' },
    ],
    content: `# Come riconoscere phishing e truffe online

Il phishing è un raggiro fiduciario travestito da costume tecnico. L’aggressore non rompe la tua cifratura — fa in modo che sia *tu* a consegnare una password, un codice o del denaro, impersonando qualcuno di cui ti fidi e architettando un momento in cui agisci d’emozione invece che di giudizio. Poiché prende di mira i riflessi umani, anche la difesa è umana: poche abitudini che spezzano in modo affidabile il raggiro. La più utile in assoluto è riconoscere l’emozione che viene fabbricata.

## L’indizio universale: l’urgenza fabbricata

Quasi ogni truffa ha bisogno che tu agisca *in fretta*, prima che la parte pensante del cervello recuperi. Le leve emotive sono un breve elenco:

- **Paura**: "Il tuo account sarà sospeso", "rilevato accesso sospetto", "tassa non pagata — agisci ora".
- **Avidità**: "Hai vinto", "richiedi il tuo rimborso", "investimento che raddoppia ogni settimana".
- **Autorità**: un messaggio "da" parte della tua banca, del tuo capo, di un corriere o del governo.
- **Curiosità/disponibilità**: "Sei tu in questa foto?", "Mi serve un piccolo favore al volo".

Quando un messaggio ti fa accelerare il battito e ti spinge a cliccare, pagare o condividere *immediatamente*, quella pressione stessa è il segnale d’allarme — le organizzazioni legittime non operano con il "rispondi entro i prossimi 10 minuti o altrimenti".

## I controlli concreti

| Controllo | Cosa cercare |
| --- | --- |
| **Indirizzo del mittente** | Passaci sopra/espandilo — \`service@paypa1.com\` ≠ \`paypal.com\`. I nomi visualizzati mentono. |
| **Il link reale** | Passaci sopra (non cliccare) per vedere la vera destinazione; cerca domini-sosia |
| **Saluto generico** | "Gentile cliente" da un’azienda che conosce il tuo nome |
| **Allegati inattesi** | Fatture/ricevute che non ti aspettavi — un classico veicolo di malware |
| **Richieste di segreti** | Le istituzioni reali non chiedono mai la tua password, il PIN completo o un codice 2FA |
| **Pressione + segretezza** | "Non dirlo a nessuno", "bonifico urgente", pagamento con carte regalo — tutti enormi campanelli d’allarme |

## Le due regole che prevengono la maggior parte delle perdite

1. **Non accedere mai tramite un link in un messaggio.** Se un’email dice che c’è un problema con un account, non cliccare — apri una nuova scheda e digita tu stesso l’indirizzo (o usa il segnalibro/l’app). Questa singola abitudine sconfigge la maggior parte del phishing di credenziali, perché il sito falso non ha nemmeno l’occasione di comparire.

2. **Verifica su un canale separato per qualsiasi cosa riguardi denaro o segreti.** Il "capo" che chiede un bonifico o carte regalo, la "banca" che ti chiede di "spostare il denaro su un conto sicuro", un parente improvvisamente nei guai — fermati e conferma tramite un canale *separato e già noto* (chiama il numero ufficiale, non quello nel messaggio). L’urgenza unita a un metodo di pagamento insolito è la firma di una truffa.

## Domande frequenti

**Il messaggio sembra perfetto — logo, formattazione, il mio nome. È comunque giusto dubitare?**
Sì. I dettagli grafici convincenti sono banali da copiare, e i dati personali trapelano dalle violazioni. Giudica dalla *richiesta* (urgenza, segreti, pagamento) e verifica in modo indipendente, non da quanto è curato l’aspetto.

**Ho cliccato un link / inserito la password. E adesso?**
Agisci in fretta: cambia quella password (e ovunque sia stata riutilizzata) da un dispositivo affidabile, attiva la 2FA, sorveglia eventuali attività non autorizzate e contatta l’istituzione reale. La velocità limita il danno.

**Anche telefonate e messaggi sono phishing?**
Sì — il "vishing" (voce) e lo "smishing" (SMS) usano lo stesso copione, e la clonazione vocale con l’IA rende le chiamate più convincenti. La regola resta la stessa: riaggancia e richiama un numero ufficiale che hai cercato tu.`,
  },
  {
    topicKey: 'vpn-explained',
    title: 'Cosa fa davvero una VPN (e cosa non fa)',
    question: 'Cosa protegge realmente una VPN e mi serve davvero?',
    summary:
      'Una VPN cifra il tuo traffico verso un server che nasconde il tuo indirizzo IP e ti protegge sulle reti non affidabili. Non è anonimato o sicurezza totale — l’HTTPS protegge già la maggior parte dei dati, e una VPN sposta la tua fiducia sul fornitore VPN invece di eliminarla.',
    tags: ['sicurezza', 'privacy', 'vpn', 'reti'],
    language: 'it',
    image: {
      prompt: promptOf('vpn-explained'),
      alt: 'I dati attraversano un condotto sigillato che ne cela l’origine fino al relè remoto',
    },
    sources: [
      { title: 'EFF — Autodifesa dalla sorveglianza: le VPN', url: 'https://ssd.eff.org/module/choosing-vpn-thats-right-you' },
      { title: 'CISA — indicazioni sulle connessioni sicure', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# Cosa fa davvero una VPN (e cosa non fa)

Una VPN (rete privata virtuale) costruisce un tunnel cifrato dal tuo dispositivo a un server gestito dal fornitore VPN; il tuo traffico esce verso internet da *lì*, indossando l’indirizzo IP di quel server invece del tuo. È tutto qui il meccanismo — e da esso discendono sia i benefici reali sia un mucchio di esagerazioni di marketing. La cosa più utile da capire è che una VPN **ricolloca la tua fiducia**; non elimina il bisogno di averne.

## Cosa fa davvero

- **Nasconde il tuo indirizzo IP** ai siti che visiti — vedono la posizione del server VPN, non la tua casa o città. Utile per ridurre una forma di tracciamento e per non esporre la tua identità di rete.
- **Cifra il traffico sulla rete locale** — su un WiFi pubblico dubbio, la rete del bar, dell’aeroporto o dell’hotel (e chiunque vi origli) vede solo un tunnel cifrato, non ciò che stai facendo.
- **Nasconde la tua attività al tuo provider internet** — il tuo ISP vede che sei connesso a una VPN, ma non quali siti visiti.
- **Cambia la tua posizione apparente** — ecco perché c’è chi le usa per accedere a contenuti bloccati per regione (nel rispetto dei termini di ciascun servizio).

## Cosa NON fa

È qui che il marketing promette troppo:

| Mito | Realtà |
| --- | --- |
| "Una VPN ti rende anonimo" | Tutt’altro — login, cookie, impronta del browser e account ti identificano comunque |
| "Una VPN ti protegge da virus/hacking" | Non lo fa — è un tunnel, non un antivirus né un firewall contro il malware |
| "Una VPN cifra tutto ciò che fai" | La maggior parte dei siti è già cifrata end-to-end con HTTPS; la VPN protegge soprattutto il tratto *locale* |
| "Una VPN ti nasconde a tutti" | Il tuo fornitore VPN può vedere il tuo traffico — hai solo spostato la fiducia su di lui |

Quest’ultimo punto è quello cruciale. Senza una VPN, la tua rete locale e il tuo ISP possono osservare le tue connessioni. *Con* una, è l’azienda VPN a occupare quella posizione — quindi una VPN è affidabile solo quanto il suo gestore. Una VPN gratuita che si monetizza registrando e vendendo la tua attività può essere peggio di nessuna.

## Ti serve?

| Situazione | Verdetto |
| --- | --- |
| Spesso su WiFi pubblici/non affidabili | Ragionevole — aggiunge uno strato reale (anche se l’HTTPS copre già molto) |
| Vuoi nascondere la navigazione al tuo ISP | Sì, è un uso fondamentale |
| Accedere a contenuti bloccati per regione | Uso comune (attenzione ai termini di servizio) |
| Cercare il vero anonimato | Una VPN da sola non te lo darà |
| Già solo su reti affidabili, usando l’HTTPS | Opzionale — il beneficio è minore di quanto lascino intendere le pubblicità |

Se ne usi una, scegli un fornitore a pagamento affidabile con una politica no-log chiara e idealmente verificata da audit — gli stai affidando tutto ciò che il tuo ISP vedeva prima.

## Domande frequenti

**Una VPN impedisce ai siti di tracciarmi?**
Solo la parte basata sull’IP. Cookie, login e impronta del browser continuano a identificarti. L’anti-tracciamento richiede impostazioni/estensioni del browser, non una VPN.

**Una VPN gratuita va bene?**
Stai in guardia — gestire i server costa, e alcune VPN gratuite si rifanno registrando e vendendo i tuoi dati, l’opposto dell’obiettivo. Esistono livelli gratuiti affidabili, ma leggi l’informativa sulla privacy.

**Mi serve una VPN se i siti usano l’HTTPS?**
L’HTTPS cifra già il contenuto del tuo traffico end-to-end. Una VPN aggiunge l’occultamento dell’IP e protegge i metadati sulla rete locale, ma è un miglioramento più piccolo di quanto suggeriscano le pubblicità quando sei già su HTTPS.`,
  },
  {
    topicKey: 'end-to-end-encryption',
    title: 'Cos’è la cifratura end-to-end?',
    question: 'Cosa significa cifratura end-to-end e perché conta per la messaggistica?',
    summary:
      'La cifratura end-to-end blocca un messaggio in modo che solo mittente e destinatario possano leggerlo — non la rete, nemmeno l’azienda che gestisce il servizio. È la differenza tra una lettera sigillata e una cartolina che chiunque lungo il percorso può leggere.',
    tags: ['sicurezza', 'privacy', 'cifratura', 'messaggistica'],
    language: 'it',
    image: {
      prompt: promptOf('end-to-end-encryption'),
      alt: 'Un messaggio sigillato è illeggibile in transito e si apre solo al dispositivo finale',
    },
    sources: [
      { title: 'EFF — Autodifesa dalla sorveglianza: cos’è la cifratura', url: 'https://ssd.eff.org/module/what-encryption' },
      { title: 'NIST — Standard e linee guida crittografiche', url: 'https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines' },
    ],
    content: `# Cos’è la cifratura end-to-end?

La cifratura end-to-end (E2EE) significa che un messaggio viene cifrato sul dispositivo del mittente e può essere decifrato solo sul dispositivo del destinatario — quindi in nessun punto intermedio qualcun altro può leggerlo. Fondamentale: "qualcun altro" include l’azienda che gestisce il servizio. L’analogia classica: un messaggio normale è una **cartolina** che ogni addetto lungo il percorso può leggere; un messaggio cifrato end-to-end è una **lettera sigillata** che solo il destinatario può aprire. La differenza è chi *può* leggere le tue conversazioni, non solo chi *promette* di non farlo.

## La distinzione che conta davvero

La maggior parte dei servizi online cifra i dati "in transito" (tra te e i loro server) e "a riposo" (nel loro archivio). È un bene, ma in entrambi i casi **l’azienda può comunque leggere il tuo contenuto** — le chiavi sono nelle sue mani. La cifratura end-to-end è più forte: solo gli estremi possiedono le chiavi, perciò il fornitore è strutturalmente incapace di leggere i tuoi messaggi anche se volesse, fosse violato o ricevesse l’ordine di consegnarli.

| | Cifratura in transito/a riposo | Cifratura end-to-end |
| --- | --- | --- |
| Protetto da spie esterne | Sì | Sì |
| Leggibile dal fornitore del servizio | **Sì** | **No** |
| Esposto in una violazione dei dati del fornitore | Potenzialmente | Il contenuto resta illeggibile |
| Consegnato su richiesta legale | Possibile | Il fornitore non ha nulla di leggibile da dare |

## Come funziona, in breve

L’E2EE usa la stessa idea a chiave pubblica che sta dietro alle passkey e all’HTTPS. Ogni utente ha una chiave pubblica (condivisa liberamente) e una chiave privata (mai condivisa). Per scriverti, il mittente cifra con la *tua* chiave pubblica; solo la *tua* chiave privata può decifrare. Le chiavi risiedono sui dispositivi, non sul server — ed è esattamente per questo che il server non può leggere i contenuti. Le buone app di messaggistica aggiungono la "forward secrecy", ruotando le chiavi così che nemmeno una futura compromissione di una chiave possa sbloccare i messaggi passati.

## Dove ci fai affidamento

- **Messaggistica**: alcune app sono cifrate end-to-end per impostazione predefinita; altre solo in una modalità opzionale, altre per niente. Se la privacy conta, verifica quale.
- **Chiamate**: molte app voce/video ora offrono l’E2EE.
- **Backup e cloud**: una falla sottile — una chat può essere E2EE mentre il suo *backup sul cloud* non lo è, rendendo di nascosto i messaggi di nuovo leggibili. Controlla le impostazioni di backup.
- **Il web**: l’HTTPS è end-to-end tra il tuo browser e il sito (anche se il sito stesso, in quanto estremo, legge ciò che gli invii).

## Domande frequenti

**Se nemmeno l’azienda può leggerlo, chi può?**
Solo le persone che tengono in mano i dispositivi a ciascun estremo. Questo significa anche che la sicurezza del *dispositivo* conta — l’E2EE protegge i messaggi in transito, non un telefono che qualcuno sblocca. Inoltre i metadati (con chi hai parlato, quando) possono restare visibili anche quando il contenuto non lo è.

**L’E2EE aiuta i criminali?**
È la stessa cifratura che protegge le tue operazioni bancarie, le cartelle cliniche, i giornalisti e le comuni conversazioni private — una protezione di uso generale. Il consenso prevalente sulla sicurezza è che indebolirla per tutti (una "backdoor") rende tutti meno sicuri, perché una backdoor non può essere limitata ai "buoni".

**Come faccio a sapere che un’app la usa davvero?**
Cerca la dicitura esplicita "cifratura end-to-end" (non solo "cifrata"), preferisci le app che usano protocolli aperti ben revisionati e verifica se è attiva per impostazione predefinita o solo in una modalità speciale.`,
  },
  {
    topicKey: 'public-wifi-safety',
    title: 'Il WiFi pubblico è davvero pericoloso?',
    question: 'È sicuro usare il WiFi pubblico nei bar e negli aeroporti, e cosa dovrei evitare?',
    summary:
      'Il WiFi pubblico è molto più sicuro di un tempo perché quasi tutti i siti web ora usano l’HTTPS, che cifra i tuoi dati a prescindere dalla rete. I rischi residui reali sono gli hotspot falsi e le connessioni non cifrate — gestibili con poche abitudini.',
    tags: ['sicurezza', 'privacy', 'wifi', 'sicurezza digitale'],
    language: 'it',
    image: {
      prompt: promptOf('public-wifi-safety'),
      alt: 'Un portatile invia dati già sigillati su WiFi pubblico, accanto a un hotspot falso in agguato',
    },
    sources: [
      { title: 'FTC — Le reti WiFi pubbliche sono sicure?', url: 'https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-not-always' },
      { title: 'EFF — L’HTTPS e l’autodifesa dalla sorveglianza', url: 'https://ssd.eff.org/module/what-should-i-know-about-encryption' },
    ],
    content: `# Il WiFi pubblico è davvero pericoloso?

Il WiFi pubblico ha una reputazione spaventosa che è perlopiù **superata**. I vecchi avvertimenti vengono da un’epoca in cui i siti inviavano i dati in chiaro, perciò chiunque sulla stessa rete del bar poteva "annusare" le tue password dall’aria. Quell’epoca è in gran parte finita: oggi la stragrande maggioranza dei siti usa l’**HTTPS**, che cifra la tua connessione end-to-end tra il tuo browser e il sito — su qualsiasi rete, affidabile o no. Il lucchetto nella barra degli indirizzi sta facendo gran parte del lavoro di protezione che gli avvertimenti allarmistici attribuiscono a una VPN.

## Perché l’HTTPS ha cambiato il quadro

Quando ti connetti a un sito HTTPS, il tuo traffico viene cifrato *prima* di lasciare il tuo dispositivo, perciò chi origlia sullo stesso WiFi vede solo dati confusi e quale sito stai visitando — non la tua password, i messaggi o il numero di carta. Dato che i browser moderni ora segnalano i siti non HTTPS come "Non sicuro" e gran parte del web ha migrato, il classico attacco "password rubata al bar" è molto più difficile di un tempo.

## I rischi che restano

Il WiFi pubblico però non è a rischio *zero* — le minacce reali si sono spostate:

| Rischio | Di cosa si tratta | Difesa |
| --- | --- | --- |
| **Hotspot gemello malevolo** | Una rete falsa chiamata "Airport_Free_WiFi" gestita da un aggressore | Conferma il nome reale della rete; non unirti automaticamente a quelle sconosciute |
| **Siti non HTTPS** | Il raro sito che ancora invia dati in chiaro | Fai attenzione all’avviso "Non sicuro"; non inserire segreti lì |
| **Sbirciamento alle spalle** | Qualcuno che semplicemente guarda il tuo schermo | Filtro privacy, consapevolezza |
| **Dispositivo non aggiornato** | Bug non corretti sfruttabili sulle reti condivise | Tieni aggiornati sistema operativo e app |
| **Connessione automatica** | Il telefono che si unisce in silenzio a una rete malevola con nome noto | Disattiva l’unione automatica alle reti aperte |

Il rischio principale è il **gemello malevolo**: un hotspot ostile con un nome amichevole. Se ti ci connetti, l’aggressore controlla il tuo percorso di rete — ma anche allora l’HTTPS mantiene illeggibili le tue sessioni cifrate; il pericolo è soprattutto il traffico non HTTPS e il rischio di essere attirato verso pagine di accesso false.

## Abitudini sensate (senza paranoia)

- **Fidati del lucchetto HTTPS** e non aggirare mai un avviso sui certificati su un WiFi pubblico — quell’avviso è esattamente il momento in cui qualcosa non va.
- **Verifica il nome della rete** con il personale invece di tirare a indovinare; sii diffidente verso reti aperte che impersonano un marchio.
- **Disattiva la connessione automatica** alle reti aperte così i tuoi dispositivi non si riconnettono in silenzio a reti-sosia.
- **Una VPN aggiunge uno strato** cifrando anche i metadati e qualsiasi traffico non HTTPS — un’aggiunta ragionevole sulle reti non affidabili, ma non la necessità che lasciano intendere le pubblicità, dato l’HTTPS.
- **Tieni i dispositivi aggiornati**; la maggior parte dei restanti attacchi di rete punta a bug noti e già corretti.

## Domande frequenti

**Qualcuno può rubarmi la password della banca sul WiFi del bar?**
Se la tua banca usa l’HTTPS (lo fa) e non hai ignorato un avviso sui certificati né sei caduto in una pagina di accesso falsa, le tue credenziali sono cifrate sulla linea. Il pericolo maggiore è il phishing, non lo "sniffing".

**Mi serve davvero una VPN per il WiFi pubblico?**
È uno strato extra ragionevole, ma l’HTTPS protegge già il contenuto del tuo traffico. Una VPN aiuta soprattutto con il traffico non HTTPS e a nascondere quali siti visiti alla rete locale.

**I dati mobili del telefono sono più sicuri del WiFi pubblico?**
In genere sì — il cellulare è cifrato e non condividi una rete locale con sconosciuti. Per attività sensibili su una rete sconosciuta, passare ai dati mobili è una scelta semplice e solida.`,
  },
  {
    topicKey: 'online-tracking',
    title: 'Come funziona il tracciamento online (cookie, pixel e impronte)',
    question: 'Come fanno le aziende a tracciarmi attraverso il web, e posso davvero fermarle?',
    summary:
      'I tracciatori ti seguono con cookie, pixel di tracciamento invisibili e impronte del browser per costruire un profilo tra i siti. Non puoi diventare invisibile, ma alcune scelte del browser riducono drasticamente quanto viene raccolto.',
    tags: ['privacy', 'tracciamento', 'cookie', 'web'],
    language: 'it',
    image: {
      prompt: promptOf('online-tracking'),
      alt: 'Una figura lascia impronte che osservatori ricompongono, in parte disperse da un mantello',
    },
    sources: [
      { title: 'EFF — Cover Your Tracks (test dell’impronta del browser)', url: 'https://coveryourtracks.eff.org/' },
      { title: 'FTC — Proteggere la tua privacy online', url: 'https://consumer.ftc.gov/articles/protecting-your-privacy-online' },
    ],
    content: `# Come funziona il tracciamento online (cookie, pixel e impronte)

Gran parte del web "gratuito" è pagata dalla pubblicità, e la pubblicità mirata si regge sul sapere chi sei e cosa fai. Esiste perciò un intero settore dedicato a seguirti da un sito all’altro, cucendo la tua attività in un profilo. Funziona tramite tre tecniche principali, ognuna più sfuggente della precedente — e capirle è ciò che fa quadrare le difese.

## Le tre tecniche principali

**1. Cookie.** Un cookie è un piccolo file che un sito conserva nel tuo browser. I cookie *di prima parte* sono perlopiù innocui e utili — ti tengono connesso e ricordano il carrello. Il problema del tracciamento sono i cookie *di terza parte*: quando molti siti diversi incorporano tutti contenuti della stessa rete pubblicitaria, quella rete deposita un cookie che riconosce ovunque, riuscendo a vedere che lo stesso browser ha visitato il sito A, poi il B, poi il C. Quella scia tra i siti è il classico meccanismo di tracciamento (e quello che i browser stanno ora attivamente eliminando).

**2. Pixel di tracciamento.** Un’immagine invisibile da 1×1 (o un frammento di codice) caricata dal server di un tracciatore. Il solo caricarla — in una pagina web *o in un’email* — comunica al tracciatore che l’hai aperta, quando e alcuni dettagli sul tuo dispositivo. È così che chi fa marketing sa che hai aperto la sua email o visitato una pagina, senza alcun cookie.

**3. Impronta del browser.** La più subdola. Invece di conservare qualcosa sul tuo dispositivo, un sito *misura* la combinazione unica di caratteristiche del tuo dispositivo — dimensione dello schermo, font, sistema operativo, versione del browser, fuso orario, peculiarità grafiche — che insieme sono spesso abbastanza uniche da re-identificarti. Poiché non conserva nulla, cancellare i cookie non la cancella.

| Tecnica | Conserva qualcosa? | Sconfitta cancellando i cookie? |
| --- | --- | --- |
| Cookie di terza parte | Sì | Sì |
| Pixel di tracciamento | Usa cookie/log del server | In parte |
| Impronta del browser | No | **No** |

## Cosa riduce davvero il tracciamento

Non puoi essere invisibile, ma puoi ridurre molto la tua esposizione:

- **Usa un browser rispettoso della privacy o attiva la protezione dal tracciamento** — i browser moderni bloccano i cookie di terza parte e i tracciatori noti per impostazione predefinita o con un’unica opzione.
- **Aggiungi un blocco contenuti/pubblicità affidabile** — blocca gli script dei tracciatori e i pixel prima che si carichino, il che velocizza anche le pagine.
- **Blocca le immagini remote nelle email** per sconfiggere i pixel di tracciamento dell’apertura (la maggior parte delle app di posta lo permette).
- **Resisti all’impronta** con browser che standardizzano o randomizzano la tua impronta; è il tracciamento più difficile da fermare, ed è per questo che conta chi produce il tuo browser.
- **Riduci il profilo alla fonte**: limita la personalizzazione pubblicitaria nelle impostazioni del tuo account e sii parco con i login che legano l’attività a un’identità reale.

## Domande frequenti

**Quei banner "Accetta i cookie" mi proteggono davvero?**
Sono richieste di consenso (imposte dalle leggi sulla privacy), non una protezione. "Rifiuta i non essenziali" aiuta, ma la riduzione reale arriva dalle impostazioni del browser e dai blocchi, non dal cliccare i banner.

**La modalità privata/in incognito ferma il tracciamento?**
Per lo più no. Impedisce al *tuo browser* di salvare la cronologia locale e i cookie dopo la sessione, ma siti, tracciatori e la tua rete possono comunque osservarti durante, e l’impronta del browser funziona lo stesso.

**L’impronta del browser è davvero inarrestabile?**
Non inarrestabile, ma difficile — la difesa è usare un browser che fa deliberatamente sembrare l’impronta di tutti simile (così la tua non spicca). Prova la tua sul Cover Your Tracks dell’EFF.`,
  },
  {
    topicKey: 'data-breach-response',
    title: 'Cosa fare quando i tuoi dati finiscono in una violazione',
    question: 'Un’azienda che uso ha subito una violazione dei dati — cosa dovrei fare davvero?',
    summary:
      'Quando una violazione espone i tuoi dati, la priorità è contenere il riutilizzo: cambia quella password ovunque l’hai usata, attiva la verifica in due passaggi e fai attenzione al phishing successivo. Cosa fare dipende da cos’è trapelato — una password, una carta o i tuoi dati identificativi.',
    tags: ['sicurezza', 'privacy', 'violazione dati', 'sicurezza digitale'],
    language: 'it',
    image: {
      prompt: promptOf('data-breach-response'),
      alt: 'Una piccola perdita da un caveau viene contenuta con metodo tra i caveau vicini',
    },
    sources: [
      { title: 'FTC — Violazione dei dati: cosa fare', url: 'https://www.identitytheft.gov/databreach' },
      { title: 'Have I Been Pwned — verifica se i tuoi account sono comparsi nelle violazioni', url: 'https://haveibeenpwned.com/' },
    ],
    content: `# Cosa fare quando i tuoi dati finiscono in una violazione

Le violazioni dei dati ormai sono all’ordine del giorno — se usi internet da anni, le tue informazioni sono quasi certamente comparse in una. Suona allarmante, ma la maggior parte delle violazioni è superabile con una risposta calma e mirata. La chiave è far corrispondere la tua azione a **cosa è effettivamente trapelato**, perché una password trapelata, un numero di carta trapelato e dati identificativi trapelati richiedono mosse diverse. Il panico e l’inazione sono le due modalità di fallimento; una breve lista di controllo batte entrambe.

## Per prima cosa: capisci cosa è stato esposto

Le notifiche di violazione (e i servizi che le tracciano) di solito indicano quali dati erano coinvolti. La scala di gravità, all’incirca:

| Cosa è trapelato | Gravità | Perché |
| --- | --- | --- |
| Solo l’indirizzo email | Bassa | Significa perlopiù più spam/phishing |
| Password (anche con hash) | Alta | Il riutilizzo mette a rischio molti account |
| Carta di pagamento | Media | Le banche annullano le frodi; le carte sono sostituibili |
| Dati identificativi (numeri di documento, data di nascita, indirizzo) | Alta | Abilita il furto d’identità; non si può "reimpostare" |

## La risposta, in base a cosa è trapelato

**Se è trapelata una password** (il caso urgente più comune):
1. **Cambiala subito sul sito violato.**
2. **Cambiala ovunque l’hai riutilizzata** — è questo il pericolo reale, perché gli aggressori proveranno quella coppia email-password su banche, email e negozi (credential stuffing). Un gestore di password rende tutto ciò molto meno doloroso e previene la prossima volta.
3. **Attiva la verifica in due passaggi** su quell’account e su quelli importanti.

**Se è trapelata una carta di pagamento:** controlla gli estratti conto, segnala qualsiasi addebito sconosciuto (le banche di norma annullano le frodi) e lascia che la banca riemetta la carta se necessario. È il tipo di violazione più recuperabile.

**Se sono trapelati dati identificativi** (il più ostico, dato che non puoi cambiare la tua data di nascita): valuta un blocco del credito / un’allerta antifrode presso le agenzie di credito dove disponibile, fai attenzione ad account aperti a tuo nome e sii ancora più scettico verso i contatti che citano i tuoi dati reali.

## Poi: preparati alla seconda ondata

Il rischio successivo sottovalutato è il **phishing mirato**. Dopo una violazione, i criminali sanno quale azienda usi e alcuni dei tuoi dati reali, perciò inviano messaggi convincenti del tipo "[Azienda] avviso di sicurezza — verifica il tuo account". Aspettateli e applica la solita regola: non accedere mai tramite un link in un messaggio — vai direttamente al sito. Una violazione ti rende un bersaglio segnato per un po’.

## Domande frequenti

**Come faccio a sapere se sono in una violazione?**
Le aziende sono spesso obbligate per legge a notificartelo, ma vale la pena controllare un servizio affidabile di ricerca delle violazioni (come Have I Been Pwned) per la tua email, e attivare gli avvisi di violazione del tuo gestore di password.

**La violazione è di anni fa — devo comunque agire?**
Se nel frattempo hai reso quella password unica e hai attivato la 2FA, sei in gran parte coperto. Se *ancora* riutilizzi quella password da qualche parte, cambiala ora — le vecchie password trapelate vengono provate per anni.

**Conviene pagare per servizi di protezione dell’identità?**
Spesso le protezioni di base (blocco del credito, controllo dei propri estratti conto, password uniche + 2FA) sono gratuite e svolgono gran parte del lavoro. I servizi a pagamento possono aggiungere comodità, ma non sostituiscono le basi.`,
  },
];
