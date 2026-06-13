import type { DraftArticle } from './types';
import { digitalBuyingEn } from './digital-buying.en';

// Batch: Digital Buying Decisions (versione nativa italiana). Stessi temi e
// stessi topicKey di digital-buying.en.ts, scritti in modo nativo per il
// contesto d'acquisto dei lettori italiani. Le immagini sono condivise.

const promptOf = (key: string): string => {
  const hit = digitalBuyingEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const digitalBuyingIt: DraftArticle[] = [
  {
    topicKey: 'oled-vs-lcd',
    title: 'OLED contro LCD: quale schermo è davvero migliore?',
    question: 'Qual è la vera differenza tra schermi OLED e LCD, e quale dovrei comprare?',
    summary:
      'L’OLED illumina ogni pixel singolarmente, per neri perfetti e contrasto infinito; l’LCD usa una retroilluminazione che attraversa uno strato di cristalli liquidi, con più luminosità costante e nessun rischio di burn-in. La scelta giusta dipende da ambiente, contenuti e budget.',
    tags: ['tecnologia', 'schermi', 'oled', 'acquisto tv'],
    language: 'it',
    image: {
      prompt: promptOf('oled-vs-lcd'),
      alt: 'Un pannello a pixel autoilluminanti accanto a un pannello retroilluminato in modo uniforme',
    },
    sources: [
      { title: 'RTINGS — confronto tra TV OLED e LED/LCD: metodologia', url: 'https://www.rtings.com/tv/learn/led-vs-oled' },
    ],
    content: `# OLED contro LCD: quale schermo è davvero migliore?

Tutta la differenza si riduce a una sola domanda: **ogni pixel produce la propria luce, oppure condividono una retroilluminazione?** I pixel OLED sono auto-emissivi: ognuno è una minuscola luce che può spegnersi del tutto. I pixel LCD non producono luce alcuna; sono otturatori davanti a una retroilluminazione separata, che si aprono e si chiudono per lasciar passare il colore. Ogni pregio e ogni difetto qui sotto discende da questo singolo fatto.

## Perché l'OLED ha quell'aspetto

Poiché un pixel OLED può spegnersi completamente, produce un **nero perfetto**: non grigio scuro, ma zero luce. Mettici accanto una stella luminosa e il contrasto è di fatto infinito. Ne nasce quell'aspetto cupo e tridimensionale per cui l'OLED è famoso, oltre alla precisione pixel per pixel: nessun alone di luce che sborda attorno agli oggetti chiari su sfondo scuro (il "blooming" che gli LCD combattono). I pixel cambiano stato anche quasi istantaneamente, dando un'ottima nitidezza in movimento.

I compromessi sono altrettanto fisici: l'OLED non riesce a diventare accecante su tutto uno schermo bianco quanto i migliori LCD, e poiché il materiale organico invecchia con l'uso, mostrare lo *stesso* elemento statico (un ticker di notizie, un logo di canale, una barra delle applicazioni) per migliaia di ore rischia il **burn-in**: un debole fantasma permanente. I pannelli moderni lo mitigano in modo aggressivo, e la visione varia tipica raramente lo innesca, ma resta una considerazione reale per gli usi a forte presenza di elementi statici.

## Perché l'LCD resiste (ed è migliorato)

La retroilluminazione dell'LCD può essere brutalmente luminosa, il che lo rende il migliore nelle stanze illuminate dal sole e per le incisive luci HDR a tutto schermo. Non può invecchiare nel burn-in, ed è più economico a ogni misura. Il suo limite nativo — neri imperfetti, perché la retroilluminazione filtra attraverso i pixel "chiusi" — è stato ridotto dal **local dimming**: la suddivisione della retroilluminazione in zone che si attenuano in modo indipendente. Il Mini-LED spinge oltre con migliaia di minuscole zone, avvicinandosi al contrasto dell'OLED pur mantenendo la luminosità dell'LCD. Più zone, neri migliori — ma mai del tutto il controllo pixel per pixel dell'OLED.

## Quale comprare

| La tua situazione | Scelta migliore |
| --- | --- |
| Stanza buia, film e giochi, amante del contrasto | OLED |
| Stanza luminosa con finestre e lampade | LCD Mini-LED (vince la luminosità) |
| TV che mostra tutto il giorno un logo di canale fisso; PC con barra fissa per ore | LCD (nessun timore di burn-in) |
| Budget stretto, o misura molto grande | LCD |
| Vuoi la migliore immagine pixel per pixel, accetti qualche attenzione | OLED |

## Domande frequenti

**Il burn-in è ancora un motivo per rinunciare?**
Per la visione mista — film, sport, giochi vari — è molto improbabile sui pannelli attuali con le loro protezioni integrate. Per 8 ore al giorno della stessa interfaccia statica, un LCD è la scommessa più sicura nel lungo periodo.

**E il QLED, è un terzo tipo?**
No. Il QLED è un LCD con una pellicola a quantum dot che migliora colore e luminosità. Resta un LCD retroilluminato, non un pannello auto-emissivo come l'OLED.

**L'OLED consuma meno?**
Dipende dal contenuto: le scene scure consumano pochissimo (i pixel spenti non costano nulla), ma uno schermo interamente luminoso può assorbire più di un LCD efficiente. Non c'è un vincitore semplice.`,
  },
  {
    topicKey: 'noise-cancelling',
    title: 'Come funzionano davvero le cuffie a cancellazione del rumore',
    question: 'Come funzionano le cuffie a cancellazione del rumore, e qual è la differenza tra attiva e passiva?',
    summary:
      'La cancellazione attiva usa dei microfoni per ascoltare il suono in arrivo e riproduce un’onda invertita che lo annulla — eccellente con i rumori bassi e costanti come i motori, debole con le voci improvvise. L’isolamento passivo blocca il suono solo fisicamente.',
    tags: ['tecnologia', 'cuffie', 'audio', 'cancellazione del rumore'],
    language: 'it',
    image: {
      prompt: promptOf('noise-cancelling'),
      alt: 'Un’onda sonora frastagliata in arrivo incontra la sua immagine speculare e si appiattisce',
    },
    sources: [
      { title: 'RTINGS — test di isolamento acustico delle cuffie', url: 'https://www.rtings.com/headphones/tests/isolation/noise-isolation' },
    ],
    content: `# Come funzionano davvero le cuffie a cancellazione del rumore

Ci sono due modi completamente diversi per rendere il mondo più silenzioso, e le cuffie migliori li usano entrambi. L'**isolamento passivo** è pura fisica: padiglioni e gommini che sigillano fuori il suono, come dei tappi per le orecchie. La **cancellazione attiva del rumore (ANC)** è elettronica ingegnosa: un microfono ascolta il rumore che arriva al tuo orecchio, e la cuffia genera l'onda sonora *opposta* per annullarlo. Capire chi fa cosa spiega perché l'ANC sembra magica in aereo e inutile contro un neonato che piange.

## Il trucco dietro la cancellazione attiva

Il suono è un'onda di pressione. Se riproduci una seconda onda che è la sua esatta immagine speculare — ogni picco abbinato a una valle — le due si sommano fino a quasi nulla. È l'interferenza distruttiva. Le cuffie ANC campionano il rumore in arrivo con minuscoli microfoni, ne calcolano l'inverso e lo riproducono attraverso gli stessi driver della tua musica, in tempo reale.

L'insidia è il *tempo*. La cuffia deve misurare, calcolare ed emettere la contro-onda più velocemente di quanto il suono cambi. Funziona splendidamente per i rumori **costanti, a bassa frequenza, prevedibili** — il ronzio di un motore a reazione, il rombo di un treno, il brusio di un condizionatore — dove l'istante successivo somiglia al precedente. Funziona male per i suoni **improvvisi, ad alta frequenza, imprevedibili** — una conversazione vicina, un cane che abbaia, una porta che sbatte — perché quando il sistema reagisce, il suono è già cambiato. Ecco perché l'ANC zittisce il boato del motore eppure intacca a malapena le chiacchiere al tavolo accanto.

## La divisione dei compiti

| Minaccia | Gestita soprattutto da | Perché |
| --- | --- | --- |
| Motore a reazione, treno, ronzio dell'AC | Attiva (ANC) | Bassa, costante, prevedibile — facile da rispecchiare |
| Chiacchiere d'ufficio, voci | Sigillo passivo | Troppo rapide/variabili perché l'ANC le segua |
| Botti improvvisi | Nessuna delle due bene | I transitori imprevedibili battono entrambe |
| Vento | Spesso peggiorato dall'ANC | Il vento colpisce i microfoni direttamente come rumore |

Le alte frequenze in realtà vengono bloccate meglio da un buon sigillo *fisico* che dall'ANC, ed è per questo che la calzata conta enormemente: un sigillo che perde sabota entrambi i metodi.

## Cosa guardare al momento dell'acquisto

Dai priorità prima a **calzata e tenuta** (gommini in-ear adatti al tuo orecchio, o padiglioni over-ear che racchiudano del tutto); la qualità dell'ANC varia di più sulla *profondità alle basse frequenze* e sull'*assenza di fruscio* (l'ANC economica aggiunge un suo debole rumore bianco); e verifica una **modalità trasparenza** che usa gli stessi microfoni per portare l'esterno *dentro* — utile per gli annunci o per una conversazione senza togliere le cuffie.

## Domande frequenti

**L'ANC peggiora la qualità del suono?**
Sulle buone cuffie moderne, in modo trascurabile. Su quelle economiche può aggiungere fruscio o alterare leggermente il timbro. Il fondo più silenzioso di solito migliora il dettaglio percepito più di quanto l'ANC lo degradi.

**L'ANC può danneggiare le orecchie o causare mal di testa?**
La cancellazione in sé è innocua, ma alcune persone avvertono una sensazione simile a una pressione dovuta al costante trattamento delle basse frequenze. È soggettivo; la modalità trasparenza o un modello diverso di solito risolvono.

**Vale la pena un'ANC costosa rispetto a una economica?**
Per chi vola e si sposta spesso, sì — il divario nella cancellazione delle basse frequenze e nelle prestazioni prive di fruscio è reale. Per il silenzio occasionale, un paio passivo che sigilla bene può bastare.`,
  },
  {
    topicKey: 'phone-battery-mah',
    title: 'Perché l’autonomia del telefono non dipende solo dai mAh',
    question: 'Perché due telefoni con la stessa batteria in mAh hanno un’autonomia completamente diversa?',
    summary:
      'I mAh misurano solo quanta carica contiene una batteria. L’autonomia reale è quella capacità divisa per quanto in fretta tutto la consuma — efficienza del chip, dimensione e luminosità dello schermo, software e segnale — perciò una batteria più piccola può facilmente durare di più.',
    tags: ['tecnologia', 'smartphone', 'batteria', 'consigli d’acquisto'],
    language: 'it',
    image: {
      prompt: promptOf('phone-battery-mah'),
      alt: 'Un serbatoio di luce che alimenta più utilizzatori prosciugandolo a ritmi diversi',
    },
    sources: [
      { title: 'DXOMARK — protocollo di test dell’autonomia degli smartphone', url: 'https://www.dxomark.com/category/smartphone-reviews/' },
    ],
    content: `# Perché l'autonomia del telefono non dipende solo dai mAh

Due telefoni dichiarano entrambi una batteria da 5.000 mAh, eppure uno muore prima di cena e l'altro veleggia nel secondo giorno. Il numero non mentiva — ha solo risposto alla domanda sbagliata. **I mAh misurano la dimensione del serbatoio, non i chilometri percorsi.** L'autonomia è la dimensione del serbatoio *divisa per* il consumo, e il consumo varia enormemente da un telefono all'altro. Comprare in base ai soli mAh è come comprare un'auto in base alla capienza del serbatoio ignorando il motore.

## L'equazione che conta davvero

Grosso modo: **autonomia ≈ capacità ÷ assorbimento di potenza.** La capacità (i mAh, più precisamente i wattora) è un termine. L'altro è tutto ciò che la prosciuga:

- **Efficienza del chip.** Il processo produttivo del processore (il suo nodo in "nanometri") incide enormemente su quanta energia consuma a parità di lavoro. Un chip più nuovo ed efficiente fa di più per ogni milliampere — a volte compensando del tutto una differenza di capacità grezza.
- **Lo schermo.** Di solito il singolo consumo maggiore. Un display più grande, più luminoso, ad alto refresh (120Hz) brucia molto più di uno più piccolo, più fioco, a 60Hz. Ecco perché i telefoni con schermi grandi hanno bisogno di batterie grandi solo per pareggiare.
- **Ottimizzazione del software.** Quanto aggressivamente il sistema operativo mette in pausa le app in background, frena il consumo a riposo e gestisce i risvegli può far oscillare drasticamente l'autonomia di una giornata — lo stesso hardware dura in modo diverso con software ben calibrato o no.
- **Radio e segnale.** Un segnale cellulare debole costringe il telefono a "gridare più forte" (più energia); il 5G può assorbire più del 4G; la connettività sempre attiva si somma.

## Perché a volte vince una batteria più piccola

Metti una batteria più piccola dietro un chip efficiente, uno schermo modesto e un software ben calibrato, e durerà più di una batteria più grande trascinata giù da un display assetato di energia e da un'ottimizzazione lasca. I 4.500 mAh della scheda tecnica possono davvero battere il rivale da 5.000 mAh. Il segnale onesto non è il numero dei mAh, ma il **tempo di schermo acceso misurato da recensori indipendenti** in test standardizzati, che ripiega tutte le variabili nascoste in un unico risultato confrontabile.

## Cosa controllare prima di comprare

| Non fidarti di | Fidati invece di |
| --- | --- |
| Solo il numero dei mAh | Il tempo di schermo acceso / i punteggi di autonomia misurati dai recensori |
| "Batteria più grande = autonomia più lunga" | L'abbinamento tra batteria, efficienza del chip e schermo |
| Il wattaggio del caricatore come "autonomia" | Velocità di ricarica e autonomia sono cose diverse |

Anche la velocità di ricarica (i watt) è un'altra faccenda: un telefono può ricaricarsi in fretta *e* scaricarsi in fretta. Non confondere "si riempie in 30 minuti" con "dura tutto il giorno".

## Domande frequenti

**Più mAh può mai essere un male?**
Le batterie più grandi aggiungono peso e spessore e impiegano più tempo a caricarsi. Oltre il "tranquillamente tutto il giorno", più capacità ha un valore decrescente rispetto a un telefono più leggero.

**Perché la mia autonomia peggiora dopo un paio d'anni?**
Le batterie al litio invecchiano chimicamente, perdendo capacità massima a ogni ciclo di ricarica — di solito trattenendo circa l'80% dopo qualche centinaio di cicli completi. Il serbatoio si rimpicciolisce fisicamente nel tempo.

**Il 5G danneggia davvero la batteria?**
Può farlo, soprattutto nelle zone con 5G a chiazze dove il telefono cerca tra le reti. Molti telefoni permettono di limitarsi al 4G/LTE per risparmiare energia quando la velocità del 5G non serve.`,
  },
  {
    topicKey: 'ssd-vs-hdd',
    title: 'SSD contro HDD: che differenza c’è e quale ti serve?',
    question: 'Qual è la differenza tra un SSD e un disco rigido, e quale dovrei scegliere?',
    summary:
      'Un SSD archivia i dati in chip di memoria flash senza parti mobili — molto più veloce, silenzioso e resistente agli urti. Un HDD usa piatti magnetici rotanti — più lento, ma molto più economico per terabyte. Quasi tutti vogliono un SSD per il sistema e un HDD per l’archiviazione di massa.',
    tags: ['tecnologia', 'archiviazione', 'ssd', 'acquisto computer'],
    language: 'it',
    image: {
      prompt: promptOf('ssd-vs-hdd'),
      alt: 'Un archivio a chip statici accanto a piatti rotanti con un braccio di lettura',
    },
    sources: [
      { title: 'Backblaze — affidabilità dei dischi e statistiche di archiviazione', url: 'https://www.backblaze.com/cloud-storage/resources/hard-drive-test-data' },
    ],
    content: `# SSD contro HDD: che differenza c'è e quale ti serve?

I due modi di archiviare i tuoi file differiscono tanto profondamente quanto un giradischi differisce da una scheda di memoria. Un **disco rigido (HDD)** scrive i dati magneticamente su piatti rotanti, letti da un braccio fisico che oscilla fino al punto giusto — come un minuscolo, rapidissimo giradischi. Un'**unità a stato solido (SSD)** archivia i dati come carica elettrica in chip di memoria flash, **senza alcuna parte in movimento**. Quel divario tra meccanico ed elettronico produce ogni differenza che segue.

## Velocità: il divario che senti ogni giorno

Un SSD non ha nulla da spostare fisicamente, quindi trova e consegna i dati quasi istantaneamente. Un HDD deve attendere che il piatto ruoti nel punto giusto e che il braccio raggiunga la traccia giusta — millisecondi che si accumulano nelle migliaia di minuscole letture che un computer compie solo per avviarsi o aprire un'app. In pratica:

- **Tempo di avvio:** secondi con l'SSD contro un minuto o più con l'HDD.
- **Apertura di app e file:** quasi istantanea contro un ritardo evidente.
- **Accesso casuale** (piccoli file sparsi — ciò che l'informatica di tutti i giorni è davvero): gli SSD sono enormemente, spesso da 10 a 100 volte più veloci.

Mettere un SSD in un vecchio computer è il singolo aggiornamento di velocità più clamoroso disponibile — fa sembrare nuova una macchina più di qualunque altra modifica.

## I compromessi

| Caratteristica | SSD | HDD |
| --- | --- | --- |
| Velocità | Molto veloce | Molto più lento |
| Prezzo per terabyte | Più alto | Molto più economico — il miglior rapporto per la massa |
| Parti in movimento | Nessuna | Sì — vulnerabile a cadute/urti |
| Rumore e calore | Silenzioso, fresco | Rotazione udibile, più calore |
| Tetto di capacità (consumer) | Ampia, più costosa ai vertici | Le capacità più grandi sono le più economiche |
| Modalità di guasto | Spesso improvvisa, elettronica | Spesso preceduta da rumori d'allarme |

Gli HDD vincono ancora nettamente sul **costo per terabyte**, ed è per questo che l'archiviazione di massa — grandi librerie multimediali, backup, archivi — resta la loro roccaforte. Gli SSD vincono ovunque contino la velocità o la robustezza.

## La risposta pratica per quasi tutti

Usali entrambi, per ruolo:

- **SSD per il sistema operativo e le app/file attivi** — è questo che fa sembrare veloce il computer.
- **HDD (o cloud) per gli archivi di massa** — video, librerie di foto, backup che non apri ogni giorno.

Se un dispositivo ha spazio per uno solo (quasi tutti i portatili, tutti i telefoni), fai che sia un SSD — la velocità vale il prezzo per gigabyte, e la massa la scarichi su un disco esterno o sul cloud. Per gli SSD, nota anche l'*interfaccia*: gli SSD NVMe (PCIe) sono diverse volte più veloci dei vecchi SSD SATA, anche se per l'uso generale persino un SSD SATA appare istantaneo rispetto a qualunque HDD.

## Domande frequenti

**Quale dura di più / è più affidabile?**
Entrambi sono affidabili oggi. Gli SSD non hanno parti da consumare meccanicamente ma hanno un numero finito di scritture (ben oltre l'uso normale). Gli HDD possono essere uccisi da una caduta. Per la longevità, ciò che conta di più è avere un backup — qualunque singolo disco può guastarsi.

**Gli SSD si consumano con troppe scritture?**
C'è un limite di scrittura, ma per gli utenti tipici è di fatto irraggiungibile entro la vita utile del disco. I carichi di scrittura professionali e intensi sono l'unica vera preoccupazione.

**Un SSD più costoso è sempre più veloce?**
Non sempre in modo significativo — oltre un certo punto, le velocità NVMe superano ciò che le attività di tutti i giorni possono usare. Capacità e affidabilità spesso contano per te più dei numeri di picco dei benchmark.`,
  },
  {
    topicKey: 'megapixels-myth',
    title: 'Più megapixel significano una fotocamera migliore?',
    question: 'Più megapixel rendono migliore una fotocamera, e cosa conta davvero per la qualità delle foto?',
    summary:
      'I megapixel stabiliscono solo quanto grande puoi stampare o ritagliare — oltre un certo punto, averne di più su un sensore piccolo può perfino nuocere. Dimensione del sensore, qualità dell’obiettivo ed elaborazione contano molto di più per le foto che vedi davvero.',
    tags: ['tecnologia', 'fotocamere', 'fotografia', 'smartphone'],
    language: 'it',
    image: {
      prompt: promptOf('megapixels-myth'),
      alt: 'Un grande sensore che raccoglie molta luce accanto a uno minuscolo che ne raccoglie poca',
    },
    sources: [
      { title: 'DXOMARK — test della qualità d’immagine di fotocamere e smartphone', url: 'https://www.dxomark.com' },
    ],
    content: `# Più megapixel significano una fotocamera migliore?

Il marketing adora i megapixel perché sono un unico grande numero che suona come "di più". Ma i megapixel rispondono solo a una domanda ristretta — **da quanti punti è composta l'immagine** — e quella domanda ha smesso di contare per quasi tutti molti anni fa. Una foto da 12 megapixel contiene già abbastanza dettaglio da stampare in formato poster o riempire qualunque schermo tu possieda. Le cose che rendono davvero bella una foto abitano altrove.

## Cosa controllano e non controllano i megapixel

I megapixel determinano la **risoluzione**: quanto grande puoi stampare o quanto puoi ritagliare prima che l'immagine diventi sgranata. Tutto qui. Non dicono nulla su colore, capacità in scarsa luce, nitidezza, o quella qualità difficile da nominare che fa "saltar fuori" una foto.

Peggio ancora, su un sensore piccolo *più* megapixel possono ritorcersi contro. Stipa più pixel sullo stesso minuscolo chip e ogni singolo pixel diventa più piccolo, catturando meno luce — il che significa più grana nelle scene buie. Ecco perché un telefono da 12 MP può scattare foto notturne più pulite di uno da 48 MP: pixel più grandi, più luce ciascuno. (I telefoni moderni rispondono con il "pixel binning" — fondere più pixel piccoli in un pixel virtuale più grande in scarsa luce, scambiando di fatto risoluzione per pulizia.)

## Cosa determina davvero la qualità della foto

| Fattore | Perché conta | Effetto in parole semplici |
| --- | --- | --- |
| **Dimensione del sensore** | Sensore più grande = più luce totale raccolta | Il fattore hardware n°1; migliore scarsa luce, sfondo più sfocato e gradevole |
| **Qualità dell'obiettivo** | Nitidezza, apertura (luce ammessa), distorsione | Un ottimo sensore dietro un obiettivo scadente è sprecato |
| **Elaborazione dell'immagine** | Il software trasforma la luce grezza nell'aspetto finale | Spesso il fattore decisivo sui telefoni |
| **Dimensione del pixel** | Pixel più grandi raccolgono più luce ciascuno | Immagini più pulite al buio |
| Megapixel | Solo risoluzione / margine di ritaglio | Conta solo oltre le grandi stampe o il ritaglio spinto |

Il singolo fatto hardware più importante è la **dimensione del sensore**: è il motivo per cui una fotocamera professionale con "appena" 24 MP demolisce un telefono da 108 MP — il suo sensore è molte volte più grande e raccoglie molta più luce. E sui telefoni in particolare, l'**elaborazione** (fotografia computazionale) può contare più di qualunque specifica, ed è per questo che due telefoni con sensori identici possono produrre foto visibilmente diverse.

## Come giudicare davvero una fotocamera

Ignora il titolone sui megapixel. Piuttosto: guarda la **dimensione del sensore** (spesso indicata come frazione tipo 1/1.3"; più grande è meglio), controlla **foto di esempio e recensioni indipendenti** — soprattutto scatti in scarsa luce e in zoom — e valuta **le funzioni che userai** (stabilizzazione, ultragrandangolo, zoom ottico contro digitale). Le foto stesse, scattate dai recensori in condizioni reali, ti dicono tutto ciò che la scheda tecnica nasconde.

## Domande frequenti

**Quindi i telefoni ad alti megapixel sono una truffa?**
No — i conteggi alti aiutano davvero se ritagli in modo aggressivo o vuoi la flessibilità del pixel binning. Semplicemente non sono la prova di qualità che il numero lascia intendere.

**Perché le fotocamere professionali hanno meno megapixel dei telefoni?**
Perché danno priorità a pixel grandi su sensori grandi rispetto al conteggio grezzo di pixel. La qualità per pixel batte la quantità per quasi ogni scopo.

**Più zoom sulla scatola significa zoom migliore?**
Attenzione al *digitale* contro l'*ottico*. Lo zoom ottico (vero ingrandimento dell'obiettivo) preserva la qualità; lo zoom digitale ritaglia e ingrandisce soltanto, cosa che qualunque megapixel può fingere. Lo "zoom 100×" è per lo più digitale e per lo più poltiglia.`,
  },
  {
    topicKey: 'wifi-vs-bandwidth',
    title: 'Perché il tuo abbonamento internet veloce sembra comunque lento',
    question: 'Perché il mio WiFi è lento anche se pago un abbonamento internet veloce?',
    summary:
      'La velocità che acquisti è il tubo che entra in casa; il WiFi è come percorre gli ultimi metri — e quell’ultimo balzo è dove vive gran parte della lentezza. Distanza, muri, interferenze, hardware vecchio e troppi dispositivi schiacciano la velocità reale ben sotto l’abbonamento.',
    tags: ['tecnologia', 'wifi', 'internet', 'reti domestiche'],
    language: 'it',
    image: {
      prompt: promptOf('wifi-vs-bandwidth'),
      alt: 'Un ampio tubo di luce che si restringe in onde wireless che si attenuano attraverso i muri',
    },
    sources: [
      { title: 'FCC — guida al consumatore sulla velocità della banda larga', url: 'https://www.fcc.gov/consumers/guides/getting-broadband-qa' },
    ],
    content: `# Perché il tuo abbonamento internet veloce sembra comunque lento

Paghi per "300 megabit", ma i video si bloccano e le pagine arrancano. Probabilmente l'abbonamento non sta mentendo — il collo di bottiglia è quasi sempre *dopo* che internet entra in casa. Pensalo come due viaggi distinti: la **velocità dell'abbonamento** è il tubo largo che arriva al tuo edificio; il **WiFi** sono gli ultimi metri attraverso l'aria fino al tuo dispositivo. Quell'ultimo balzo, invisibile, è dove nasce gran parte della lentezza del mondo reale e che quasi mai viene pubblicizzato.

## I due viaggi, separati

Il numero sulla tua bolletta descrive la connessione fino a casa tua (spesso un collegamento via cavo al router). Dal router in poi, i tuoi dispositivi di solito si collegano via **WiFi** — onde radio — e le onde radio sono fragili. Si indeboliscono con la distanza, vengono assorbite dai muri (specie cemento, mattoni, metallo e acqua — inclusa l'acqua nei corpi umani) e competono con i vicini e gli elettrodomestici sulle stesse frequenze. Un abbonamento da 300 Mbps può consegnare 300 a un dispositivo collegato via cavo, ma solo 40 a un telefono due stanze e tre muri più in là.

## I soliti colpevoli, in ordine

| Causa | Cosa fa | Soluzione |
| --- | --- | --- |
| **Distanza e muri** | Il segnale si indebolisce in fretta tra gli ostacoli | Avvicinati; riposiziona il router centrale e in alto |
| **Router vecchio** | Non riesce a consegnare velocità moderne anche se l'abbonamento può | Passa a un WiFi attuale (WiFi 6/6E/7) |
| **Banda 2.4 contro 5 GHz** | I 2.4GHz arrivano lontano ma lenti; i 5GHz veloci ma corti | Usa i 5GHz da vicino, i 2.4GHz per la portata |
| **Frequenze affollate** | Vicini/microonde/Bluetooth interferiscono | 5GHz, oppure cambia canale |
| **Troppi dispositivi** | Tutti a condividere l'attenzione di un router | Sistema mesh; collega via cavo gli utenti pesanti |
| **L'upload dell'abbonamento** | Spesso molto più basso del download | Verifica se il dolore sono gli upload (chiamate, backup) |

La singola soluzione più comune è semplicemente il **posizionamento del router**: centrale, sopraelevato, all'aperto — non in un mobiletto, in cantina o dietro la TV. La radio detesta gli angoli e gli spazi chiusi.

## Quando il limite è davvero l'abbonamento

A volte hai *davvero* superato l'abbonamento: molte persone in videochiamata e con stream in 4K contemporaneamente possono saturare per davvero un abbonamento più piccolo. Ma prova prima di passare a uno superiore — fai un test di velocità **collegato via cavo** accanto al router (la tua vera velocità d'abbonamento) e di nuovo **in WiFi dove lo usi realmente** (la tua esperienza reale). Se il test via cavo raggiunge l'abbonamento ma il WiFi no, pagare per un abbonamento più veloce non aiuterà; sistemare il WiFi sì.

## Domande frequenti

**Un abbonamento più veloce sistemerà un WiFi lento?**
Di solito no. Se il collo di bottiglia è il WiFi, un tubo più grande verso casa arriva comunque allo stesso stretto ultimo balzo. Sistema prima il WiFi.

**Sistema mesh o ripetitore WiFi?**
Un sistema mesh (più unità coordinate) generalmente batte un singolo ripetitore, che spesso dimezza la velocità e crea una rete separata più debole. Per case più grandi, il mesh è la risposta moderna.

**Collegare i dispositivi via cavo conta ancora?**
Sì — un cavo (Ethernet) dà la velocità piena e stabile senza interferenze. Per un fisso, una console o una TV che non si spostano, collegarli via cavo è l'aggiornamento più affidabile che esista.`,
  },
  {
    topicKey: 'fast-charging',
    title: 'La ricarica rapida fa male alla batteria?',
    question: 'La ricarica rapida danneggia la batteria del mio telefono, e come dovrei caricarlo per farlo durare?',
    summary:
      'La ricarica rapida aggiunge un po’ di calore e stress, ma i telefoni moderni la gestiscono con cura, perciò l’impatto quotidiano è modesto. Il calore e lo stare al 100% sono ciò che invecchia di più le batterie — le abitudini contano più della velocità di ricarica.',
    tags: ['tecnologia', 'batterie', 'ricarica', 'smartphone'],
    language: 'it',
    image: {
      prompt: promptOf('fast-charging'),
      alt: 'Una batteria che si riempie rapidamente di luce, mantenuta fresca entro una zona di temperatura sicura',
    },
    sources: [
      { title: 'Battery University — come invecchiano le batterie agli ioni di litio', url: 'https://batteryuniversity.com/article/bu-808-how-to-prolong-lithium-based-batteries' },
    ],
    content: `# La ricarica rapida fa male alla batteria?

La risposta breve: **la ricarica rapida causa un po' di usura in più, ma molto meno di quanto internet tema — e molto meno di quanto faccia il calore.** I telefoni moderni non riversano energia alla cieca; orchestrano la carica con attenzione, e i peggiori nemici della longevità della batteria si rivelano cose che quasi tutti ignorano. Per capire perché, devi sapere come invecchia una batteria al litio.

## Come invecchiano le batterie al litio

Una batteria agli ioni di litio si consuma attraverso due meccanismi: l'**invecchiamento da cicli** (ogni carica-scarica completa riduce gradualmente la capacità massima) e l'**invecchiamento da calendario** (degrado chimico nel tempo, accelerato dal calore e dallo stare a carica alta). Due condizioni la puniscono di più:

- **Il calore.** Il singolo acceleratore maggiore. L'alta temperatura velocizza le reazioni chimiche che degradano la cella. Una batteria calda invecchia in fretta a prescindere da come si sia scaldata.
- **I livelli di carica estremi.** Restare pieni al 100% (specie quando si è caldi) stressa la batteria, così come scaricarsi fino allo 0%. La gentile fascia centrale (più o meno 20–80%) è dove il litio è più contento.

La ricarica rapida conta soprattutto perché *genera calore* — ma quanto ne raggiunge davvero la cella dipende interamente dal progetto del telefono.

## Perché la ricarica rapida moderna va per lo più bene

I telefoni non sono passivi. Gestiscono attivamente la ricarica:

- **La velocità non è costante.** La ricarica rapida è più veloce quando la batteria è quasi vuota, poi rallenta deliberatamente man mano che si riempie — gran parte della velocità da titolo "0–50% in 20 minuti" avviene nella fascia bassa e sicura, calando vicino alla cima.
- **La gestione termica frena il calore.** Il telefono monitora la temperatura e riduce la potenza di ricarica (o la sospende) se si scalda troppo.
- **Funzioni per la salute della batteria.** Molti telefoni ora imparano la tua routine e restano all'80% durante la notte, completando al 100% appena prima che tu ti svegli — riducendo al minimo il tempo passato sotto stress a carica piena.

Perciò la ricarica rapida progettata dal produttore che arriva con il tuo telefono è ingegnerizzata per mantenere la cella entro limiti sicuri. La differenza di perdita di capacità quotidiana tra ricarica rapida e lenta, su un telefono ben progettato, è reale ma modesta.

## Abitudini che contano più della velocità di ricarica

| Aiuta la batteria | Danneggia la batteria |
| --- | --- |
| Tenerla fresca | Caricare/giocare fino a scaldarla; sole, auto rovente |
| Vivere più o meno tra 20–80% | Costante 100% (o scaricarsi fino a 0%) |
| Usare caricatori di qualità/ufficiali | Caricatori economici non certificati |
| Attivare la "ricarica ottimizzata" | Caricare sotto un cuscino (intrappola il calore) |

Nota che la *velocità* di ricarica appena compare — **temperatura e livello di carica dominano**. Preoccuparsi della ricarica rapida mentre si gioca con un telefono caldo al 100% tutta la notte è scolare il moscerino e ingoiare il cammello.

## Domande frequenti

**Dovrei evitare la ricarica rapida per salvare la batteria?**
Non è necessario su un telefono progettato per essa. Se vuoi essere delicato, carica lentamente di notte usando la modalità di ricarica ottimizzata, e riserva la ricarica rapida a quando ti serve un rabbocco veloce.

**È un male lasciare il telefono in carica tutta la notte?**
Meno di un tempo — i telefoni smettono di assorbire energia al 100% e molti ritardano il riempimento finale. Il modesto lato negativo sono le ore passate al 100%; le funzioni di ricarica ottimizzata affrontano proprio questo.

**I caricatori rapidi di terze parti danneggiano la batteria?**
I caricatori certificati e affidabili che rispettano lo standard del tuo telefono vanno bene. Il rischio sono le unità economiche non certificate con cattiva regolazione — un falso risparmio per un dispositivo costoso.`,
  },
  {
    topicKey: 'refresh-rate',
    title: 'Cos’è la frequenza di aggiornamento, e i 120Hz valgono la spesa?',
    question: 'Cosa significa la frequenza di aggiornamento (Hz) su uno schermo, e vale la pena pagare per un display a 120Hz?',
    summary:
      'La frequenza di aggiornamento è quante volte al secondo uno schermo si ridisegna — i 120Hz aggiornano il doppio dei 60Hz, rendendo movimento e scorrimento visibilmente più fluidi. È un miglioramento reale e piacevole per il gaming e la sensazione quotidiana, ma costa batteria e denaro.',
    tags: ['tecnologia', 'schermi', 'frequenza di aggiornamento', 'gaming'],
    language: 'it',
    image: {
      prompt: promptOf('refresh-rate'),
      alt: 'Una sfera in movimento mostrata come passi radi contro una scia densa e fluida',
    },
    sources: [
      { title: 'RTINGS — test di frequenza di aggiornamento e movimento dei monitor', url: 'https://www.rtings.com/monitor/tests/motion/refresh-rate-and-motion-blur' },
    ],
    content: `# Cos'è la frequenza di aggiornamento, e i 120Hz valgono la spesa?

La frequenza di aggiornamento, misurata in hertz (Hz), è semplicemente **quante volte al secondo lo schermo ridisegna la sua immagine.** Uno schermo a 60Hz si aggiorna 60 volte al secondo; uno a 120Hz, 120 volte. Poiché tutto il movimento sullo schermo è in realtà un flipbook di immagini ferme, più aggiornamenti al secondo significano salti più piccoli tra l'uno e l'altro — cosa che il tuo occhio legge come movimento più fluido. È una delle poche specifiche il cui beneficio puoi sentire all'istante, anche se non sai darle un nome.

## Perché più aggiornamenti appaiono più fluidi

Immagina un oggetto che attraversa lo schermo. A 60Hz, lo schermo ne mostra la posizione 60 volte lungo il percorso; a 120Hz, 120 — così ogni passo è grande la metà, e il movimento appare più continuo e meno a scatti. L'effetto è più evidente in tre situazioni quotidiane:

- **Lo scorrimento** di testo e pagine web — fluido e leggibile in movimento invece di una scivolata sfocata.
- **Il gaming** — l'azione veloce appare fluida e (con l'hardware per pilotarla) può sembrare più reattiva.
- **L'interfaccia generale** — animazioni, swipe e transizioni semplicemente sembrano "più gradevoli", una qualità che le persone notano immediatamente su un telefono di punta anche senza sapere perché.

Una volta abituati ai 120Hz, i 60Hz possono apparire leggermente a scatti — un classico aggiornamento "non si può più ignorare".

## Le insidie

| Beneficio | Costo |
| --- | --- |
| Movimento e scorrimento più fluidi | Prezzo più alto |
| Sensazione di gaming più reattiva | Consuma più batteria (telefoni) |
| Sensazione quotidiana premium | Serve contenuto/hardware in grado di produrre davvero i fotogrammi |

Due avvertenze oneste. Primo, la **batteria**: aggiornarsi il doppio delle volte costa energia, ed è per questo che molti telefoni offrono un refresh "adattivo" che scende a frequenze basse per i contenuti statici e sale solo quando serve. Secondo, **servono fotogrammi da mostrare**: uno schermo a 120Hz aiuta solo se qualcosa sta producendo 120 immagini al secondo. Un gioco che gira a 45 fotogrammi al secondo non riempie uno schermo a 120Hz; una foto statica appare identica a qualunque frequenza. Lo schermo è il *tetto*, non una garanzia.

## Ne vale la pena?

| Sei… | Verdetto |
| --- | --- |
| Un giocatore (PC o console) | Sì — tra gli aggiornamenti più percepibili |
| Un acquirente di telefoni che dà valore alla "sensazione" | Sì — la fluidità di scorrimento e interfaccia è costante |
| A budget stretto e guardi soprattutto video | Priorità bassa — il film è a circa 24fps e non ne beneficia molto |
| Ossessionato dall'autonomia | Usa la modalità adattiva, o soppesa il compromesso |

Per quasi tutti gli acquirenti di telefoni di punta e di prodotti da gaming, i 120Hz sono un miglioramento reale, percepito ogni giorno. Per un dispositivo economico usato soprattutto per video e messaggi, i soldi spesso sono spesi meglio altrove (luminosità, batteria, archiviazione).

## Domande frequenti

**L'occhio umano riesce davvero a vedere oltre i 60Hz?**
Sì — quasi tutti percepiscono chiaramente il salto di fluidità verso i 120Hz, specie in movimento e nello scorrimento. I benefici continuano oltre per il gaming veloce, con rendimenti decrescenti.

**Uno schermo a 120Hz rende migliori i film?**
Non proprio — quasi tutto il cinema è masterizzato a circa 24fps, quindi appare uguale. Il beneficio è nei contenuti interattivi e nello scorrimento, non nel video passivo.

**144Hz, 240Hz — valgono rispetto ai 120?**
Per il gaming competitivo, la fluidità e la reattività in più aiutano, con rendimenti decrescenti. Per i telefoni e l'uso generale, i 120Hz catturano già il grosso del beneficio.`,
  },
  {
    topicKey: 'ram-explained',
    title: 'Quanta RAM ti serve davvero?',
    question: 'Cosa fa la RAM, e quanta me ne serve davvero in un telefono o in un portatile?',
    summary:
      'La RAM è lo spazio di lavoro a breve termine del dispositivo — contiene ciò che usi attivamente, così il processore lo raggiunge all’istante. Più ne hai, più cose gestisci insieme; ma oltre quanto usi, quella in più resta inattiva. Non è archiviazione né un moltiplicatore di velocità.',
    tags: ['tecnologia', 'computer', 'ram', 'consigli d’acquisto'],
    language: 'it',
    image: {
      prompt: promptOf('ram-explained'),
      alt: 'Una scrivania luminosa con elementi attivi aperti accanto a un archivio chiuso',
    },
    sources: [
      { title: 'Crucial — quanta RAM ti serve (guida alla memoria)', url: 'https://www.crucial.com/articles/about-memory/how-much-ram-do-i-need' },
    ],
    content: `# Quanta RAM ti serve davvero?

La RAM (memoria ad accesso casuale) è la specifica più fraintesa dell'informatica, perché viene continuamente confusa con l'archiviazione. Ecco il modello mentale pulito: **l'archiviazione è il tuo schedario; la RAM è la tua scrivania.** Lo schedario (SSD/disco rigido) contiene tutto, anche da spento. La scrivania (la RAM) contiene solo ciò su cui stai *lavorando attivamente proprio ora*, dove il processore può afferrarlo all'istante. Una scrivania più grande ti permette di tenere aperte più cose insieme — è tutto il compito della RAM.

## Cosa fa davvero la RAM

Quando apri un'app, il sistema la carica dall'archiviazione lenta sulla "scrivania" veloce della RAM, così il processore può lavorarci a piena velocità. Ogni app in esecuzione, ogni scheda del browser, il sistema operativo stesso — tutto occupa spazio sulla scrivania. Quando la scrivania si riempie, il sistema inizia a rimescolare le cose nell'archiviazione lenta per fare spazio, e *quel* rimescolamento è ciò che percepisci come rallentamento: app che si ricaricano quando ci torni sopra, scatti con molte schede aperte. Più RAM significa che più cose possono restare aperte e immediatamente disponibili — niente rimescolamenti.

Due cose che la RAM **non** è: non è archiviazione (dimentica tutto da spenta — è uno spazio di lavoro, non una cassaforte), e non è un semplice moltiplicatore di velocità. Andare oltre ciò che il tuo carico di lavoro usa non dà **alcun beneficio** — una parte vuota della scrivania non ti fa lavorare più in fretta. Il guadagno dall'aggiungere RAM è reale solo fino al punto in cui smetti di restare a corto.

## Quantità sensate (a metà degli anni 2020)

| Uso | RAM comoda |
| --- | --- |
| Leggera: web, email, video, documenti di base | 8 GB (utilizzabile, si fa stretta) |
| Mainstream: molte schede, app per ufficio, multitasking leggero | 16 GB — l'attuale punto ideale |
| Pesante: grandi dataset, macchine virtuali, app creative professionali | 32 GB e oltre |
| Gaming serio | 16–32 GB |
| Telefoni | 8 GB bastano e avanzano per quasi tutti; 12 GB sono un margine comodo |

Per quasi tutti gli acquirenti di portatili, **16 GB sono lo standard intelligente** — abbastanza per fare multitasking liberamente per anni senza pagare troppo per una capacità che non toccherai mai. 8 GB funzionano ancora per l'uso leggero ma si sentono sempre più stretti; 32 GB si guadagnano il loro costo solo sotto carichi davvero esigenti.

## Una nota sui telefoni

La RAM dei telefoni funziona in modo simile ma è gestita più aggressivamente dal sistema operativo, che sospende le app in background per starci dentro. Oltre una quantità comoda, più RAM per lo più mantiene più app "congelate" in background — piacevole, ma con rendimenti decrescenti. I "16 GB" che fanno colpo su alcuni telefoni sono ben oltre ciò di cui il software mobile tipicamente ha bisogno; spesso è più sfoggio da scheda tecnica che beneficio percepito.

## Domande frequenti

**Più RAM velocizzerà il mio computer lento?**
Solo se stai davvero restando a corto (continuo rimescolamento sul disco, app che si ricaricano). Se hai margine in avanzo, il collo di bottiglia è altrove — spesso un vecchio disco rigido, dove un SSD è la vera soluzione.

**Una RAM più veloce (più MHz) vale la pena?**
Per quasi tutti, marginalmente — la capacità (abbastanza GB) conta molto più della velocità. La velocità aiuta carichi specifici (alcuni giochi, grafica integrata) ma non trasformerà l'uso generale.

**Posso aggiungere RAM in seguito?**
Su molti fissi e su alcuni portatili, sì; su telefoni, portatili sottili e progetti saldati, no — la quantità che compri è permanente. Quando non si può aggiornare, compra un po' più margine di quanto ti serva oggi.`,
  },
  {
    topicKey: 'usb-c-confusion',
    title: 'Perché i cavi USB-C sono così confusionari?',
    question: 'Perché i cavi USB-C si comportano in modo così diverso quando sembrano tutti identici?',
    summary:
      'L’USB-C è solo la forma della spina — non ciò che c’è dentro. Due cavi dall’aspetto identico possono differire enormemente in potenza di ricarica, velocità dei dati e supporto video, perché lo standard del connettore e le sue capacità sono cose distinte.',
    tags: ['tecnologia', 'usb-c', 'cavi', 'consigli d’acquisto'],
    language: 'it',
    image: {
      prompt: promptOf('usb-c-confusion'),
      alt: 'Connettori dall’aspetto identico che rivelano cablaggi interni molto diversi',
    },
    sources: [
      { title: 'USB Implementers Forum — panoramica su USB-C e certificazione', url: 'https://www.usb.org/usb-c' },
    ],
    content: `# Perché i cavi USB-C sono così confusionari?

La verità esasperante sull'USB-C è che **il connettore è solo una forma.** Quella spina ovale e reversibile non ti dice nulla su cosa il cavo sappia davvero *fare* — solo che entrerà nella porta. Due cavi che sembrano identici, si sentono identici e costano cifre molto diverse possono avere capacità completamente diverse al loro interno. L'industria ha standardizzato la spina ma non i poteri che ci stanno dietro, e quel divario è l'intera fonte della confusione.

## Una forma, molte capacità nascoste

Pensa all'USB-C come a una porta standardizzata attraverso cui possono passare cose molto diverse. Dietro porte identiche, un dato cavo potrebbe supportare:

- **Potenza di ricarica** — da un filo (sufficiente per un telefono) ad abbastanza per un portatile e oltre. I cavi ad alta potenza hanno un cablaggio interno più spesso; un cavo sottile da sola ricarica potrebbe rifiutarsi del tutto di alimentare un portatile.
- **Velocità dei dati** — dalle vecchie e lente velocità USB 2.0 a velocità di trasferimento moderne e fulminee. Un cavo che ricarica benissimo può spostare i file a passo di lumaca, perché dati e potenza usano fili interni diversi.
- **Uscita video** — alcuni cavi USB-C trasportano segnali video (verso un monitor) e altri semplicemente no, senza alcun segno esteriore della differenza.

Così il cavo economico nel cassetto potrebbe caricare il telefono alla perfezione eppure non riuscire a pilotare un monitor o a trasferire file in fretta — non è rotto, è solo costruito per fare di meno.

## Perché è successo

L'USB-C ha deliberatamente fatto passare molte funzioni possibili attraverso un unico connettore universale, per sostituire la vecchia giungla di spine incompatibili. Il vantaggio è una sola porta per tutto; lo svantaggio è che "ha una spina USB-C" non dice più le capacità — quelle dipendono da quali standard sottostanti (e quali fili) il cavo e i dispositivi specifici implementano. La nomenclatura ha peggiorato le cose: gli standard dei dati dietro la porta sono stati rinominati ripetutamente, così persino le etichette confondono.

## Come evitare di farsi fregare

| Vuoi… | Cerca |
| --- | --- |
| Caricare un portatile / dispositivo ad alta potenza | Un cavo certificato per il wattaggio che ti serve (es. 100W / 240W); cavi spessi e di qualità |
| Trasferire file in fretta | La specifica dei dati (es. "USB 3.2 / USB4 / 10–40 Gbps"), non solo "USB-C" |
| Collegarti a un monitor | Supporto video esplicito ("DisplayPort Alt Mode" / Thunderbolt) |
| Solo stare sul sicuro | Marche affidabili, cavi certificati; tieni il cavo arrivato col dispositivo ed etichettalo |

Due abitudini pratiche risparmiano più grattacapi: **tieni etichettati i cavi buoni** (quello che carica il tuo portatile non è intercambiabile con l'omaggio arrivato con gli auricolari), e **compra cavi certificati di marche affidabili** — i cavi ad alta potenza non certificati sono anche un vero problema di sicurezza, non solo di prestazioni.

## Domande frequenti

**Perché il mio telefono si carica lentamente con un cavo ma in fretta con un altro?**
Il cavo lento probabilmente supporta meno potenza o non ha i fili per la negoziazione della ricarica rapida. La velocità di ricarica dipende dal cavo, dal caricatore *e* dal telefono, che devono concordare tutti su uno standard rapido.

**Thunderbolt è la stessa cosa dell'USB-C?**
Thunderbolt usa il connettore USB-C ma è un superinsieme di fascia alta — velocità massime, video e dati garantiti. Tutte le porte Thunderbolt hanno la forma USB-C; non tutte le porte USB-C sono Thunderbolt.

**Un cavo scadente può danneggiare il mio dispositivo?**
Un cavo ad alta potenza mal costruito e non certificato può essere un vero pericolo. I cavi certificati e affidabili hanno la circuiteria di sicurezza per negoziare la potenza correttamente — vale il piccolo sovrapprezzo su qualunque cosa trasporti un wattaggio serio.`,
  },
];
