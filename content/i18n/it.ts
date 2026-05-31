import type { DraftArticle } from '../types';

// Italian (it) translations of the editorial drafts. Faithful, natural
// translations of the English originals; tags are localized. Built up batch
// by batch.
export const it: DraftArticle[] = [
  // ── Batch 1: Scienza e natura ──
  {
    title: 'La fotosintesi',
    question: 'Come trasformano le piante la luce del sole in cibo?',
    summary:
      'La fotosintesi è il processo con cui piante, alghe e alcuni batteri convertono energia luminosa, acqua e anidride carbonica in energia chimica immagazzinata come zuccheri, liberando ossigeno come sottoprodotto.',
    tags: ['biologia', 'piante', 'energia', 'chimica', 'scienza'],
    language: 'it',
    content: `# La fotosintesi

La fotosintesi è il processo biochimico che permette a piante, alghe e alcuni batteri di fabbricare il proprio cibo a partire dalla luce. È alla base di quasi tutte le catene alimentari della Terra e la fonte dell'ossigeno che respiriamo.

## La reazione di base

In forma semplificata, la fotosintesi combina anidride carbonica e acqua, usando l'energia luminosa, per produrre glucosio e ossigeno:

\`\`\`
6 CO2 + 6 H2O + energia luminosa -> C6H12O6 + 6 O2
\`\`\`

Lo zucchero (glucosio) immagazzina energia chimica che l'organismo usa poi per crescere e per il metabolismo. L'ossigeno viene liberato nell'atmosfera.

## Due fasi

- **Reazioni dipendenti dalla luce.** Nelle membrane di strutture dette tilacoidi, il pigmento verde **clorofilla** assorbe la luce. Questa energia spezza le molecole d'acqua, libera ossigeno e viene catturata in due trasportatori di energia, l'ATP e il NADPH.
- **Ciclo di Calvin (reazioni indipendenti dalla luce).** Nel fluido circostante (lo stroma), l'ATP e il NADPH alimentano una serie di reazioni che fissano l'anidride carbonica in zucchero.

## Perché conta

La fotosintesi sottrae anidride carbonica dall'aria e la fissa nel tessuto vivente, il che la rende centrale per il ciclo globale del carbonio e la regolazione del clima. I combustibili fossili sono, in sostanza, antica luce solare catturata dalla fotosintesi milioni di anni fa.

## Varianti

Le piante dei climi caldi e secchi usano spesso vie adattate — chiamate fotosintesi **C4** e **CAM** — che riducono la perdita d'acqua e migliorano l'efficienza sotto stress. Questo spiega perché colture come il mais e la canna da zucchero prosperano sotto il sole intenso.`,
  },
  {
    title: "Il ciclo dell'acqua",
    question: "Come si muove l'acqua attraverso il pianeta?",
    summary:
      "Il ciclo dell'acqua è il movimento continuo dell'acqua attraverso evaporazione, condensazione, precipitazione e deflusso, che ridistribuisce l'acqua dolce sulla Terra.",
    tags: ['scienze della Terra', 'acqua', 'clima', 'geografia', 'scienza'],
    language: 'it',
    content: `# Il ciclo dell'acqua

Il ciclo dell'acqua, o ciclo idrologico, descrive come l'acqua circola senza sosta tra gli oceani, l'atmosfera e la terraferma. La quantità totale d'acqua sulla Terra resta pressoché costante; il ciclo si limita a spostarla tra serbatoi diversi.

## Le fasi principali

- **Evaporazione.** Il calore del Sole trasforma l'acqua liquida — per lo più degli oceani — in vapore. Le piante aggiungono umidità con la **traspirazione**, e insieme sono talvolta dette *evapotraspirazione*.
- **Condensazione.** Salendo e raffreddandosi, il vapore si condensa attorno a minuscole particelle e forma le nubi.
- **Precipitazione.** Quando le gocce diventano abbastanza pesanti, cadono come pioggia, neve, nevischio o grandine.
- **Raccolta e deflusso.** L'acqua si raccoglie in fiumi, laghi e oceani, oppure s'infiltra nel suolo ricaricando le falde, e infine torna al mare.

## Serbatoi e tempo di residenza

L'acqua può trascorrere tempi assai diversi in ciascun serbatoio — giorni nell'atmosfera, ma migliaia di anni nelle acque sotterranee profonde o nel ghiaccio polare. Questi «tempi di residenza» determinano quanto rapidamente gli effetti dell'inquinamento o della siccità si propagano nel sistema.

## Perché conta

Il ciclo dell'acqua porta acqua dolce agli ecosistemi e all'agricoltura, modella il clima e l'erosione, e regola la temperatura spostando enormi quantità di calore. L'attività umana — sbarrare i fiumi, prosciugare le zone umide e riscaldare il clima — può intensificare alluvioni e siccità alterando l'equilibrio del ciclo.`,
  },
  {
    title: 'La tettonica delle placche',
    question: 'Perché i continenti si muovono e avvengono i terremoti?',
    summary:
      'La tettonica delle placche è la teoria secondo cui lo strato esterno della Terra è diviso in placche mobili le cui interazioni formano montagne e oceani e provocano terremoti e vulcani.',
    tags: ['scienze della Terra', 'geologia', 'terremoti', 'vulcani', 'scienza'],
    language: 'it',
    content: `# La tettonica delle placche

La tettonica delle placche è la teoria unificante della geologia. Spiega che lo strato esterno rigido della Terra — la **litosfera** — è diviso in una dozzina circa di grandi placche e diverse minori, che scivolano lentamente sulla roccia più calda e parzialmente fusa sottostante.

## Cosa muove le placche

Le placche poggiano sull'**astenosfera**, uno strato duttile del mantello superiore. Il calore che fuoriesce dall'interno della Terra genera una lenta convezione, e forze come il tiraggio delle lastre dense che sprofondano («trazione di placca») spostano le placche di alcuni centimetri all'anno — più o meno la velocità con cui crescono le unghie.

## Tre tipi di margini

- **Divergenti.** Le placche si allontanano e il magma risale formando nuova crosta — per esempio lungo la dorsale medio-atlantica.
- **Convergenti.** Le placche si scontrano. Una può sprofondare sotto l'altra (**subduzione**), formando fosse profonde, vulcani e terremoti; oppure due continenti si corrugano e sollevano catene come l'Himalaya.
- **Trasformi.** Le placche scivolano orizzontalmente l'una accanto all'altra, come nella faglia di Sant'Andrea in California, accumulando tensioni che si liberano nei terremoti.

## Le prove

La teoria nacque da idee precedenti sulla deriva dei continenti. Linee di costa combacianti, fossili identici su continenti oggi lontani e i motivi magnetici a bande congelati nella roccia del fondale oceanico hanno confermato che le placche hanno riplasmato il globo nel corso di centinaia di milioni di anni — e continuano a farlo.`,
  },
  {
    title: 'Il sistema immunitario umano',
    question: 'Come si difende il corpo dalle malattie?',
    summary:
      'Il sistema immunitario è una rete stratificata di cellule, tessuti e molecole che individua e neutralizza i patogeni distinguendo al contempo le cellule proprie del corpo dalle minacce esterne.',
    tags: ['biologia', 'medicina', 'salute', 'corpo umano', 'scienza'],
    language: 'it',
    content: `# Il sistema immunitario umano

Il sistema immunitario è la rete di difesa del corpo contro batteri, virus, funghi e altre minacce. Opera per strati sovrapposti, dalle barriere fisiche a risposte cellulari altamente specifiche.

## Immunità innata

La prima linea di difesa è rapida ma generica. Comprende barriere fisiche come la pelle e il muco, e cellule come i **macrofagi** e i **neutrofili**, che inghiottono gli invasori. L'infiammazione e la febbre fanno parte di questa risposta rapida, pensata per frenare i patogeni e richiamare aiuto.

## Immunità adattativa

Se la minaccia persiste, il sistema **adattativo** organizza un attacco mirato:

- I **linfociti B** producono **anticorpi**: proteine che si legano a molecole specifiche (antigeni) di un patogeno e lo contrassegnano per la distruzione.
- I **linfociti T** uccidono direttamente le cellule infette o coordinano la risposta più ampia.

Una caratteristica cruciale è la **memoria**: dopo un'infezione restano cellule di memoria a vita lunga, così il corpo risponde molto più in fretta se lo stesso patogeno ritorna. È il principio della **vaccinazione**, che allena il sistema immunitario con una versione o un frammento innocuo di un patogeno.

## Quando qualcosa va storto

Il sistema deve distinguere il «proprio» dall'«estraneo». I suoi fallimenti portano a **malattie autoimmuni** (attacco al proprio tessuto), **allergie** (reazione eccessiva a sostanze innocue) o **immunodeficienza** (risposta troppo debole). Bilanciare sensibilità e contenimento è una delle conquiste più notevoli della biologia.`,
  },
  {
    title: 'I mitocondri',
    question: 'Perché i mitocondri sono detti la centrale energetica della cellula?',
    summary:
      "I mitocondri sono organelli che generano gran parte dell'energia utilizzabile di una cellula tramite la respirazione e portano un proprio DNA, ereditato da un lontano antenato batterico.",
    tags: ['biologia', 'cellule', 'energia', 'genetica', 'scienza'],
    language: 'it',
    content: `# I mitocondri

I mitocondri sono minuscole strutture all'interno della maggior parte delle nostre cellule, famosi come «centrale energetica della cellula» perché producono gran parte dell'energia che muove la vita.

## Produrre energia

I mitocondri svolgono la **respirazione aerobica**, convertendo nutrienti e ossigeno in **ATP** (adenosintrifosfato), la molecola che le cellule usano come moneta energetica. Il processo avviene sulla membrana interna ripiegata del mitocondrio, le cui pieghe (creste) aumentano la superficie disponibile per le reazioni che producono energia. Una singola cellula può ospitare da uno a migliaia di mitocondri a seconda del suo fabbisogno energetico; le cellule muscolari e cardiache ne sono particolarmente ricche.

## Un antenato batterico

I mitocondri hanno un proprio piccolo anello di DNA e si riproducono per divisione, proprio come i batteri. Questo sostiene la **teoria endosimbiotica**: i mitocondri discendono da batteri a vita libera inghiottiti da una cellula primordiale circa due miliardi di anni fa e divenuti partner permanenti.

## Ereditati dalla madre

Poiché gli spermatozoi non apportano quasi mitocondri, il **DNA mitocondriale** si trasmette per linea materna quasi immutato. I genetisti lo usano per ricostruire l'ascendenza e le migrazioni umane fino a un passato remoto.

## Legami con la salute

I difetti dei mitocondri possono causare vari disturbi ereditari, e il declino mitocondriale è studiato come fattore dell'invecchiamento e di malattie come il Parkinson.`,
  },
  {
    title: 'Le correnti oceaniche',
    question: "Cosa fa circolare l'acqua di mare in giganteschi anelli intorno al mondo?",
    summary:
      'Le correnti oceaniche sono flussi su larga scala di acqua marina spinti da vento, temperatura e salinità; ridistribuiscono il calore sul pianeta e modellano i climi regionali.',
    tags: ['scienze della Terra', 'oceanografia', 'clima', 'geografia', 'scienza'],
    language: 'it',
    content: `# Le correnti oceaniche

Le correnti oceaniche sono movimenti continui e direzionali dell'acqua di mare. Agiscono come un sistema circolatorio che avvolge il pianeta, trasportando calore, nutrienti e vita marina per migliaia di chilometri.

## Correnti superficiali

In prossimità della superficie le correnti sono spinte soprattutto dal **vento**. La rotazione terrestre devia i loro percorsi con l'**effetto Coriolis**, organizzandole in grandi sistemi rotanti detti **vortici (gyre)**. La Corrente del Golfo, per esempio, porta acqua calda dai tropici verso l'Europa, regalando all'Europa occidentale un clima più mite di quanto ci si aspetterebbe dalla sua latitudine.

## Circolazione profonda

Sotto la superficie le correnti sono spinte da differenze di **densità**, che dipende da temperatura e salinità. L'acqua fredda e salata presso i poli sprofonda e scorre sul fondo oceanico, mentre acqua più calda risale altrove. Questo lento anello globale è detto **circolazione termoalina** o «nastro trasportatore oceanico», e un giro completo può richiedere circa mille anni.

## Perché contano

Le correnti mitigano le temperature globali spostando calore dall'equatore ai poli. Alimentano la **risalita (upwelling)** di nutrienti che sostiene alcune delle pescherie più ricche del mondo e influenzano fenomeni meteorologici come El Niño. Poiché il nastro dipende dallo sprofondare dell'acqua polare fredda e densa, gli scienziati sorvegliano i segnali che lo scioglimento dei ghiacci e il riscaldamento del mare possano indebolirlo.`,
  },
  {
    title: "L'effetto serra",
    question: 'Come tengono calda la Terra i gas atmosferici?',
    summary:
      "L'effetto serra è il riscaldamento che si verifica quando certi gas atmosferici trattengono il calore irradiato dalla superficie terrestre, mantenendo il pianeta abitabile ma intensificandosi al crescere di quei gas.",
    tags: ['clima', 'scienze della Terra', 'atmosfera', 'ambiente', 'scienza'],
    language: 'it',
    content: `# L'effetto serra

L'effetto serra è il processo naturale che mantiene la Terra abbastanza calda per la vita. Senza di esso la temperatura media della superficie del pianeta sarebbe ben al di sotto del punto di congelamento.

## Come funziona

La luce del sole attraversa l'atmosfera e scalda la superficie terrestre. La superficie poi irradia di nuovo quell'energia verso l'esterno come radiazione **infrarossa** (calore). Certi gas — soprattutto **anidride carbonica, metano, vapore acqueo e protossido di azoto** — assorbono parte di questo infrarosso in uscita e lo riemettono in tutte le direzioni, anche verso il basso. Il risultato è che il calore resta nella bassa atmosfera invece di sfuggire direttamente nello spazio.

Il nome viene da una vaga analogia con una serra, benché una vera serra si scaldi soprattutto bloccando il movimento dell'aria, non trattenendo l'infrarosso.

## L'equilibrio naturale

Per gran parte della storia, la quantità di gas serra e l'energia che lascia la Terra sono rimaste in approssimativo equilibrio, mantenendo il clima relativamente stabile.

## L'influenza umana

La combustione di combustibili fossili, la deforestazione e l'agricoltura hanno portato le concentrazioni di anidride carbonica e metano a livelli mai visti da centinaia di migliaia di anni. Questo effetto serra **potenziato** altera l'equilibrio e fa trattenere al pianeta più calore. Le conseguenze comprendono l'aumento delle temperature globali, il mutare dei regimi meteorologici, lo scioglimento dei ghiacci e l'innalzamento del livello del mare — il meccanismo centrale del cambiamento climatico moderno.`,
  },
  {
    title: 'La bioluminescenza',
    question: 'Come e perché alcuni esseri viventi brillano al buio?',
    summary:
      'La bioluminescenza è la produzione di luce da parte di organismi viventi mediante una reazione chimica, usata per comunicare, mimetizzarsi, attirare prede e trovare partner.',
    tags: ['biologia', 'chimica', 'oceanografia', 'animali', 'scienza'],
    language: 'it',
    content: `# La bioluminescenza

La bioluminescenza è la capacità degli organismi viventi di produrre la propria luce. Dalle lucciole che lampeggiano in una notte d'estate alle onde che brillano su una spiaggia buia, compare in tutto l'albero della vita — ed è particolarmente comune nelle profondità marine.

## La chimica

Il bagliore nasce da una reazione chimica e non dal calore, il che ne fa una forma di «luce fredda» che non spreca quasi energia. Una molecola emettitrice di luce detta **luciferina** reagisce con l'ossigeno, con l'aiuto di un enzima detto **luciferasi**. La reazione libera energia come luce visibile, di solito blu o verde — i colori che vanno più lontano nell'acqua di mare.

## Perché gli organismi brillano

La bioluminescenza assolve molti scopi:

- **Attirare prede.** Il pesce lanterna fa oscillare un'esca luminosa davanti alla bocca.
- **Difesa.** Alcuni calamari rilasciano nubi luminose per confondere i predatori; altri usano la luce per fondersi con il debole chiarore proveniente dall'alto (controilluminazione).
- **Comunicazione e corteggiamento.** Le lucciole emettono lampi con schemi propri di ogni specie per trovare partner.
- **Simbiosi.** Molti animali non producono luce da soli, ma ospitano batteri luminosi in organi appositi.

## Nell'oceano profondo

La luce si spegne nel buio totale qualche centinaio di metri più giù, e sotto quel limite la stragrande maggioranza degli animali sa produrre luce. In questo mondo privo di luce, la bioluminescenza è meno una curiosità che una lingua primordiale della sopravvivenza.`,
  },
  // ── Batch 2: Storia e società ──
  {
    title: 'La Via della Seta',
    question: "Cos'era la Via della Seta e perché fu importante?",
    summary:
      "La Via della Seta era una rete di rotte commerciali che collegò l'Asia orientale al Mediterraneo per oltre mille anni, trasportando merci, tecnologie, religioni e idee tra le civiltà.",
    tags: ['storia', 'commercio', 'asia', 'civiltà', 'geografia'],
    language: 'it',
    content: `# La Via della Seta

La Via della Seta non era un'unica strada lastricata, ma una vasta rete di rotte terrestri e marittime che collegava Cina, Asia centrale, India, Persia e mondo mediterraneo. Attiva dal II secolo a.C. circa al XV secolo, plasmò lo sviluppo di ogni società che toccò.

## Più della seta

La seta cinese fu il lusso che diede alla rete il suo nome moderno (coniato da un geografo dell'Ottocento), ma vi scorrevano innumerevoli merci: spezie, tè, porcellana, vetro, metalli preziosi, cavalli e carta. Pochi mercanti percorrevano l'intera distanza; le merci passavano piuttosto di mano in mano lungo una catena di commercianti e città-oasi come Samarcanda e Kashgar.

## Una via per le idee

L'impatto più profondo della rotta fu culturale. Il **buddismo** si diffuse dall'India alla Cina per queste vie, mentre anche islam, cristianesimo e manicheismo viaggiavano con i mercanti. Tecnologie cruciali — **carta, polvere da sparo e bussola** — si spostarono verso ovest, trasformando le società che le accolsero.

## Malattia e declino

Gli stessi collegamenti che portavano il commercio portavano anche la malattia; molti storici legano la Via della Seta alla diffusione della **peste nera** nel XIV secolo. La rete declinò gradualmente man mano che le rotte marittime divenivano più economiche e sicure e gli imperi terrestri si frammentavano.

## Eredità

La Via della Seta è ricordata come uno dei grandi motori di scambio della storia — prova che civiltà lontane erano collegate assai prima e assai più profondamente di quanto si credesse.`,
  },
  {
    title: 'La stampa a caratteri mobili',
    question: 'Come cambiò il mondo la stampa?',
    summary:
      "La stampa, perfezionata da Johannes Gutenberg intorno al 1440, rese i libri economici e abbondanti, accelerando l'alfabetizzazione, la scienza, la riforma religiosa e la diffusione delle idee in Europa.",
    tags: ['storia', 'tecnologia', 'comunicazione', 'cultura', 'europa'],
    language: 'it',
    content: `# La stampa a caratteri mobili

La stampa è una delle invenzioni più decisive della storia. Meccanizzando la copia dei testi, trasformò i libri da rari tesori copiati a mano in oggetti prodotti in serie.

## La svolta di Gutenberg

La stampa con blocchi intagliati esisteva già in Asia orientale, ma intorno al 1440 l'orafo tedesco **Johannes Gutenberg** riunì diverse innovazioni in un sistema pratico: **caratteri mobili in metallo** durevoli, un inchiostro a base d'olio che aderiva al metallo e un torchio a vite adattato dalla produzione del vino. La sua **Bibbia a 42 righe** (1455 circa) dimostrò che il metodo poteva rivaleggiare con la bellezza dei manoscritti a una frazione del costo.

## Un'esplosione di informazione

Prima della stampa, un amanuense poteva impiegare mesi per copiare un solo libro. Dopo, una tipografia poteva produrre centinaia di copie identiche nello stesso tempo. Entro il 1500 le stamperie di tutta Europa avevano prodotto milioni di volumi. I prezzi crollarono, l'alfabetizzazione crebbe e i testi standardizzati permisero al sapere di accumularsi in modo affidabile.

## Rimodellare la società

Le conseguenze furono profonde:

- La **Riforma protestante** si diffuse rapidamente perché opuscoli e Bibbie tradotte raggiungevano i lettori comuni.
- La **Rivoluzione scientifica** dipese dalla possibilità per gli studiosi di condividere diagrammi e dati precisi oltre i confini.
- La stampa standardizzata aiutò a stabilizzare le lingue nazionali e a diffondere la letteratura in volgare.

## Eredità

La stampa è spesso vista come la prima tecnologia dell'informazione a democratizzare il sapere — antesignana di ogni successivo balzo, dai giornali a Internet.`,
  },
  {
    title: 'La Rivoluzione Industriale',
    question: 'Cosa fu la Rivoluzione Industriale e come trasformò la società?',
    summary:
      "La Rivoluzione Industriale fu il passaggio dalla produzione manuale alla fabbricazione con macchine, iniziata nell'Inghilterra del Settecento, che rimodellò economie, città, lavoro e vita quotidiana nel mondo intero.",
    tags: ['storia', 'economia', 'tecnologia', 'società', 'industria'],
    language: 'it',
    content: `# La Rivoluzione Industriale

La Rivoluzione Industriale fu un periodo di cambiamento drastico, iniziato in Gran Bretagna intorno al 1760, in cui le economie passarono dall'agricoltura e dall'artigianato all'industria meccanizzata e alla produzione di fabbrica.

## Perché la Gran Bretagna, perché allora

Si combinarono diversi fattori: **carbone** abbondante come combustibile, giacimenti di ferro, capitale dal commercio, manodopera in fuga dalle campagne e un'ondata di invenzioni pratiche. La **macchina a vapore** migliorata, perfezionata da James Watt, diede alle fabbriche una fonte di energia potente e indipendente dal luogo. Le macchine tessili meccanizzate moltiplicarono la produzione di un singolo lavoratore.

## Dalla fattoria alla fabbrica

La produzione si spostò dalle case sparse a **fabbriche** centralizzate, erette presso l'energia e i trasporti. Il ferro, e poi l'acciaio, resero possibili macchine e ferrovie; i canali e poi la ferrovia abbassarono drasticamente il costo del trasporto delle merci. Le città si gonfiarono mentre la gente migrava verso il lavoro industriale.

## Costi e benefici

La rivoluzione finì per innalzare il tenore di vita e la durata della vita e creò industrie del tutto nuove. Ma i suoi primi decenni portarono condizioni dure: orari lunghi, lavoro minorile, macchine pericolose, baraccopoli sovraffollate e inquinamento. Questi disagi alimentarono i movimenti operai, le leggi di riforma e nuove idee politiche sui diritti dei lavoratori.

## Un punto di svolta duraturo

Una «seconda rivoluzione industriale» a fine Ottocento aggiunse l'elettricità, la chimica e la produzione di massa. Insieme, queste trasformazioni fissarono lo stampo del mondo industriale moderno — e avviarono l'aumento dell'uso dei combustibili fossili che oggi guida le sfide climatiche.`,
  },
  {
    title: 'Le origini della scrittura',
    question: 'Quando e perché gli esseri umani inventarono la scrittura?',
    summary:
      'La scrittura fu inventata in modo indipendente in diverse civiltà antiche, a partire dalla Mesopotamia intorno al 3400 a.C., in origine per tenere registri economici prima di evolversi fino a rendere pienamente il linguaggio.',
    tags: ['storia', 'lingua', 'civiltà', 'comunicazione', 'cultura'],
    language: 'it',
    content: `# Le origini della scrittura

La scrittura — la registrazione del linguaggio con segni visibili e durevoli — è una delle invenzioni che definiscono l'umanità. Comparve in modo indipendente in almeno alcuni luoghi e, ogni volta, trasformò le società che la svilupparono.

## Nata dalla contabilità

La più antica scrittura nota proviene dalla **Mesopotamia** (l'odierno Iraq) intorno al 3400-3200 a.C. Non nacque come letteratura, ma come **contabilità**: gli amministratori dei templi dovevano tenere conto di grano, bestiame e commerci. Semplici disegni incisi nell'argilla divennero a poco a poco i segni a forma di cuneo noti come **scrittura cuneiforme**, tracciati con uno stilo di canna.

## Invenzioni indipendenti

La scrittura sorse da sé anche in **Egitto** (i geroglifici), in **Cina** (gli antenati dei caratteri cinesi, usati per la divinazione) e in **Mesoamerica** (i Maya e i loro predecessori). L'essere stata inventata più di una volta mostra che rispondeva a un bisogno profondo delle società complesse.

## Dai disegni ai suoni

Le prime scritture mescolavano simboli per le cose e simboli per i suoni. Un grande balzo fu l'**alfabeto** — un piccolo insieme di segni che rappresentano singoli suoni — che risale a popoli di lingua semitica intorno al 1800 a.C. e fu poi adattato da Fenici e Greci. Gli alfabeti resero la lettura e la scrittura più facili da apprendere e diffondere.

## Perché contò

La scrittura permise a conoscenze, leggi, contratti e racconti di sopravvivere ai loro creatori. Rese governabili gli imperi, permise alla scienza di accumularsi e trasformò la memoria da fragile atto personale in un registro condiviso e duraturo.`,
  },
  {
    title: "L'inflazione",
    question: "Cosa causa l'inflazione e perché conta?",
    summary:
      "L'inflazione è un aumento sostenuto del livello generale dei prezzi, che riduce il potere d'acquisto del denaro; un'inflazione moderata è normale, ma un'inflazione alta o instabile danneggia le economie.",
    tags: ['economia', 'finanza', 'denaro', 'politica', 'società'],
    language: 'it',
    content: `# L'inflazione

L'inflazione è il ritmo con cui il livello generale dei prezzi di beni e servizi sale nel tempo. Quando c'è inflazione, ogni unità di valuta compra un po' meno di prima — il denaro perde potere d'acquisto.

## Come si misura

Gli economisti misurano l'inflazione con **indici dei prezzi**, il più comune dei quali è l'indice dei prezzi al consumo (IPC), che segue il costo di un «paniere» rappresentativo di beni e servizi quotidiani. Se il paniere costa il 3% in più rispetto a un anno prima, l'inflazione annua è del 3%.

## Cosa la causa

L'inflazione nasce di solito da due grandi forze:

- **Inflazione da domanda.** Quando la domanda supera ciò che un'economia può produrre, gli acquirenti spingono i prezzi verso l'alto.
- **Inflazione da costi.** Quando il costo di fattori come l'energia o il lavoro sale, le imprese lo scaricano sui prezzi.

In entrambi i casi, la maggior parte degli economisti ritiene che l'inflazione sostenuta sia strettamente legata alla crescita dell'**offerta di moneta** rispetto alla produzione reale.

## Perché conta

Un po' d'inflazione — le banche centrali mirano in genere al 2% circa — è considerato sano, perché stimola la spesa e gli investimenti ed evita i pericoli del calo dei prezzi (**deflazione**). Ma un'inflazione alta erode i risparmi, distorce le decisioni e può sfuggire al controllo, come nei casi di **iperinflazione** in cui i prezzi raddoppiano in giorni.

## Come si gestisce

Le banche centrali combattono l'inflazione eccessiva soprattutto alzando i **tassi d'interesse**, il che raffredda l'indebitamento e la spesa. Bilanciare l'inflazione con l'occupazione e la crescita è una delle sfide centrali della politica economica.`,
  },
  {
    title: 'Il metodo scientifico',
    question: 'Come funziona davvero la scienza?',
    summary:
      "Il metodo scientifico è un approccio sistematico per costruire conoscenza tramite osservazione, ipotesi, esperimento e revisione, che pone le prove e la testabilità al di sopra dell'autorità.",
    tags: ['scienza', 'filosofia', 'metodo', 'storia', 'istruzione'],
    language: 'it',
    content: `# Il metodo scientifico

Il metodo scientifico è il processo disciplinato che la scienza usa per indagare il mondo. Più che una ricetta rigida, è un atteggiamento fondato sul mettere alla prova le idee contro le prove e sull'essere disposti a scartare quelle che non reggono.

## Il ciclo centrale

Un ciclo tipico passa attraverso diverse fasi:

1. **Osservazione.** Notare un fenomeno o un enigma.
2. **Domanda.** Formulare qualcosa di specifico al riguardo.
3. **Ipotesi.** Proporre una spiegazione testabile — un'affermazione che, in linea di principio, potrebbe essere dimostrata falsa.
4. **Previsione.** Dedurre cosa dovrebbe accadere se l'ipotesi è vera.
5. **Esperimento.** Verificare la previsione in condizioni controllate, idealmente variando un solo fattore alla volta.
6. **Analisi e revisione.** Confrontare i risultati con la previsione e poi affinare, respingere o ampliare l'ipotesi.

## Principi chiave

- **Testabilità e falsificabilità.** Un'affermazione scientifica deve fare previsioni che possano fallire. Le idee che spiegano tutto e non vietano nulla non sono scientifiche.
- **Riproducibilità.** Altri devono poter ripetere un esperimento e ottenere lo stesso risultato.
- **Revisione tra pari.** I nuovi lavori sono esaminati da altri esperti prima di essere ampiamente accettati.
- **Conoscenza provvisoria.** Anche le teorie ben fondate restano aperte alla revisione se emergono prove migliori.

## Perché funziona

Esigendo prove e invitando alla critica, il metodo scientifico corregge i propri errori nel tempo. Non promette certezza, ma si è rivelato straordinariamente potente nel produrre una comprensione affidabile e cumulativa della natura.`,
  },
  {
    title: 'La democrazia ateniese',
    question: "Come cominciò la democrazia nell'antica Atene?",
    summary:
      'La democrazia ateniese, sviluppata nel V secolo a.C., fu un precoce sistema di autogoverno diretto dei cittadini, influente come antenato delle idee democratiche moderne nonostante i suoi marcati limiti.',
    tags: ['storia', 'politica', 'grecia', 'democrazia', 'civiltà'],
    language: 'it',
    content: `# La democrazia ateniese

L'antica Atene è spesso detta la culla della democrazia. Nel V e nel IV secolo a.C. sviluppò un sistema in cui i comuni cittadini, e non i re o una ristretta élite, prendevano le decisioni dello Stato.

## Come funzionava

La democrazia ateniese era **diretta**, non rappresentativa. Le grandi decisioni erano prese dall'**Assemblea (Ecclesia)**, aperta a tutti i cittadini aventi diritto, che dibattevano e votavano di persona su leggi, guerra e politica. Un **Consiglio dei Cinquecento**, scelto a sorte, preparava l'ordine del giorno, e la maggior parte delle cariche pubbliche e delle giurie era pure assegnata per **sorteggio** anziché per elezione — uno sforzo deliberato per impedire la concentrazione del potere.

## Riformatori chiave

Il percorso passò per diverse figure: **Solone** alleggerì i debiti e ampliò la partecipazione; **Clistene**, intorno al 508 a.C., riorganizzò i cittadini in nuovi gruppi che attraversavano le antiche fedeltà ed è spesso considerato il fondatore del sistema; e **Pericle** presiedette al suo apice maturo e sicuro.

## Limiti marcati

Per gli standard moderni il sistema era ristretto. La cittadinanza — e dunque la voce politica — escludeva **donne, schiavi e residenti stranieri**, lasciando partecipare solo una minoranza della popolazione.

## Eredità

Nonostante questi limiti, la democrazia ateniese introdusse idee durature: che l'autorità legittima possa risiedere nei governati, che i cittadini debbano deliberare apertamente e che nessuno sia al di sopra della legge. Questi principi riecheggiarono nell'Illuminismo e confluirono nel disegno delle democrazie moderne.`,
  },
  {
    title: 'Il gold standard',
    question: "Cos'era il gold standard e perché i paesi lo abbandonarono?",
    summary:
      "Il gold standard era un sistema monetario in cui il valore di una valuta era ancorato a una quantità specifica d'oro; stabilizzava i tassi di cambio ma limitava la flessibilità, e fu abbandonato nel XX secolo.",
    tags: ['economia', 'storia', 'denaro', 'finanza', 'politica'],
    language: 'it',
    content: `# Il gold standard

Il gold standard (sistema aureo) era un sistema in cui il valore del denaro di un paese era direttamente legato all'oro. Sotto un gold standard pieno, la carta moneta poteva essere convertita, su richiesta, in una quantità fissa di metallo.

## Come funzionava

Ogni unità di valuta rappresentava un peso definito d'oro, e i governi si impegnavano a convertire le banconote in oro a quel tasso. Poiché molti paesi ancoravano le proprie valute all'oro, i tassi di cambio tra esse erano di fatto **fissi**, il che rendeva più prevedibili il commercio e gli investimenti internazionali.

## I vantaggi

I suoi sostenitori apprezzavano il gold standard per la **stabilità** e la **disciplina**. Poiché il denaro era coperto da una merce fisica limitata, i governi non potevano stampare valuta con facilità per finanziare la spesa, il che tendeva a mantenere bassa l'inflazione di lungo periodo e a generare fiducia nella valuta.

## Gli svantaggi

Questa stessa rigidità era la sua debolezza. L'offerta di moneta era vincolata alle riserve auree anziché ai bisogni dell'economia, perciò i governi avevano poco margine per rispondere a recessioni, crisi bancarie o shock. Molti economisti ritengono che il gold standard abbia aggravato e diffuso la **Grande depressione** degli anni Trenta, poiché i paesi vi si aggrapparono invece di stimolare le proprie economie.

## La fine dell'oro

Le nazioni si sganciarono dall'oro per gradi. Il sistema crollò del tutto nel 1971, quando gli Stati Uniti posero fine alla convertibilità del dollaro in oro. Oggi il mondo usa la **moneta fiat**, il cui valore poggia sulla fiducia nei governi e nelle banche centrali, e non su una merce fisica.`,
  },
  // ── Batch 3: Tecnologia e matematica ──
  {
    title: 'Come funziona il GPS',
    question: 'Come fa il GPS a sapere esattamente dove ti trovi?',
    summary:
      'Il GPS determina la posizione misurando il tempo di viaggio dei segnali di più satelliti e usando la trilaterazione; orologi atomici precisi e correzioni relativistiche lo rendono accurato a pochi metri.',
    tags: ['tecnologia', 'navigazione', 'satelliti', 'fisica', 'ingegneria'],
    language: 'it',
    content: `# Come funziona il GPS

Il Sistema di Posizionamento Globale (GPS) permette a un ricevitore — nel tuo telefono, auto o orologio — di scoprire dove si trova in qualsiasi punto della Terra, di solito con un margine di pochi metri. Si basa su una costellazione di satelliti e su un po' di fisica ingegnosa.

## Satelliti e segnali

Il GPS usa circa 30 satelliti in orbita a circa 20.000 km di quota, disposti in modo che ce ne siano sempre diversi visibili da qualsiasi punto del pianeta. Ciascuno trasmette di continuo un segnale radio che porta l'**ora** esatta dell'invio e la **posizione** del satellite.

## Trilaterazione

Il ricevitore misura quanto tempo ha impiegato ciascun segnale ad arrivare. Poiché le onde radio viaggiano alla velocità della luce, il tempo di viaggio rivela la **distanza** da quel satellite. Conoscere la distanza da un satellite ti colloca da qualche parte su una sfera attorno a esso; combinare le distanze da più satelliti restringe la tua posizione a un unico punto. Questa tecnica geometrica si chiama **trilaterazione**. Servono segnali da almeno quattro satelliti — tre per fissare la posizione e un quarto per risolvere l'errore dell'orologio del ricevitore.

## Perché contano orologi e relatività

La sincronizzazione deve essere straordinariamente precisa: un errore di un milionesimo di secondo sposterebbe la posizione di centinaia di metri. I satelliti portano **orologi atomici**, e il sistema corregge perfino la **relatività di Einstein** — la velocità dei satelliti e la loro gravità più debole fanno scorrere i loro orologi a un ritmo un po' diverso da quelli a terra. Senza queste correzioni il GPS sbaglierebbe di chilometri al giorno.

## Oltre il posizionamento

La stessa sincronizzazione precisa sostiene le reti finanziarie, le reti elettriche e le telecomunicazioni, facendo del GPS una spina dorsale silenziosa dell'infrastruttura moderna.`,
  },
  {
    title: 'La crittografia a chiave pubblica',
    question: 'Come possono due estranei comunicare in modo sicuro su Internet aperta?',
    summary:
      'La crittografia a chiave pubblica usa coppie di chiavi legate matematicamente — una pubblica e una privata — perché le persone cifrino i messaggi e verifichino le identità senza mai condividere prima un segreto.',
    tags: ['tecnologia', 'crittografia', 'sicurezza', 'matematica', 'internet'],
    language: 'it',
    content: `# La crittografia a chiave pubblica

La crittografia a chiave pubblica è la svolta che rende possibile la comunicazione sicura tra persone che non si sono mai incontrate. È alla base di HTTPS, della messaggistica sicura, delle firme digitali e delle criptovalute.

## L'idea della coppia di chiavi

La cifratura tradizionale («simmetrica») usa un'unica chiave condivisa per chiudere e aprire un messaggio — il che crea un problema: come condividere quella chiave in modo sicuro all'inizio? La crittografia a chiave pubblica (o **asimmetrica**) lo risolve con una **coppia** di chiavi:

- Una **chiave pubblica**, che chiunque può vedere.
- Una **chiave privata**, che il proprietario tiene segreta.

Le due sono legate matematicamente in modo che ciò che una chiave chiude solo l'altra può aprire — ma conoscere la chiave pubblica non permette di calcolare quella privata.

## Due usi principali

- **Cifratura.** Per inviare a qualcuno un messaggio riservato, lo cifri con *la sua chiave pubblica*; solo la sua chiave privata può decifrarlo.
- **Firme digitali.** Per provare che un messaggio è davvero tuo, lo firmi con *la tua chiave privata*; chiunque può verificarlo con la tua chiave pubblica, il che conferma l'autenticità e l'assenza di manomissioni.

## La matematica dietro

La sicurezza poggia su problemi facili da calcolare in un senso ma estremamente difficili da invertire — come **fattorizzare** numeri enormi (RSA) o risolvere logaritmi discreti su **curve ellittiche**. Invertirli richiederebbe quantità di calcolo impraticabili.

## Nella vita quotidiana

Quando il tuo browser mostra un lucchetto, ha già usato la crittografia a chiave pubblica per verificare il sito e stabilire una rapida chiave condivisa per il resto della sessione.`,
  },
  {
    title: 'La successione di Fibonacci',
    question: "Cos'è la successione di Fibonacci e perché compare in natura?",
    summary:
      'La successione di Fibonacci è una serie in cui ogni numero è la somma dei due precedenti; è legata alla sezione aurea e compare in motivi come i petali dei fiori e le conchiglie a spirale.',
    tags: ['matematica', 'motivi', 'natura', 'geometria', 'scienza'],
    language: 'it',
    content: `# La successione di Fibonacci

La successione di Fibonacci è uno dei motivi più famosi della matematica: una regola semplice che produce connessioni sorprendenti con la geometria e il mondo naturale.

## La regola

Comincia con 0 e 1, e fai di ogni nuovo numero la **somma dei due precedenti**:

\`\`\`
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
\`\`\`

La successione prende il nome dal matematico italiano **Leonardo da Pisa** (Fibonacci), che la introdusse in Europa nel 1202 con un indovinello sull'allevamento dei conigli, benché fosse già nota nella matematica indiana.

## Il legame con la sezione aurea

Dividi un qualsiasi numero di Fibonacci per quello precedente, e il risultato si avvicina sempre più a circa **1,618** — la **sezione aurea** (spesso indicata con φ). Più avanzi nella successione, più preciso è l'avvicinamento.

## Perché compare in natura

I numeri di Fibonacci compaiono nel conteggio dei petali di molti fiori, nella disposizione dei semi di girasole e nella ramificazione delle piante. La ragione più profonda è l'**impacchettamento efficiente**: disporre foglie o semi ad angoli legati alla sezione aurea permette a una pianta di catturare luce solare o sistemare semi con minima sovrapposizione. Il motivo è quindi meno una firma mistica che una naturale conseguenza dell'ottimizzazione.

## Oltre la biologia

La successione compare anche negli algoritmi informatici, nell'analisi finanziaria e nell'arte, dove la sezione aurea è da tempo associata a proporzioni piacevoli.`,
  },
  {
    title: 'I numeri primi',
    question: 'Cosa sono i numeri primi e perché sono importanti?',
    summary:
      "I numeri primi sono interi maggiori di uno privi di divisori oltre a uno e se stessi; sono i mattoni dell'aritmetica e la base della crittografia moderna.",
    tags: ['matematica', 'numeri', 'crittografia', 'teoria', 'scienza'],
    language: 'it',
    content: `# I numeri primi

Un numero primo è un intero maggiore di 1 divisibile esattamente solo per 1 e per se stesso. I primi numeri primi sono 2, 3, 5, 7, 11 e 13. I numeri con divisori aggiuntivi, come 6 (= 2 × 3), sono detti **composti**.

## Gli atomi dell'aritmetica

I numeri primi sono fondamentali per il **teorema fondamentale dell'aritmetica**: ogni intero maggiore di 1 può essere scritto come prodotto di primi in un solo modo (senza contare l'ordine). Per esempio 60 = 2 × 2 × 3 × 5. In questo senso i primi sono gli «atomi» indivisibili da cui si costruiscono tutti gli altri numeri.

## Infinitamente tanti

Il matematico greco **Euclide** dimostrò oltre duemila anni fa che non esiste un primo massimo — la lista prosegue all'infinito. Eppure i primi si fanno più rari al crescere dei numeri, e prevedere esattamente dove cadano è un campo profondo e ancora irrisolto della matematica, legato alla celebre **ipotesi di Riemann**.

## Perché contano oggi

I numeri primi muovono la **crittografia** moderna. Metodi come RSA poggiano su un'asimmetria pratica: moltiplicare due grandi primi è facile, ma prendere l'enorme numero risultante e recuperare i primi originari (**fattorizzare**) è straordinariamente difficile con i computer attuali. Questa difficoltà mantiene sicuri l'home banking, i messaggi e il commercio.

## Una ricerca continua

Matematici e volontari che usano reti di computer continuano a cercare primi sempre più grandi. I maggiori primi noti oggi contano decine di milioni di cifre.`,
  },
  {
    title: "L'interesse composto",
    question: "Perché l'interesse composto è così potente nel tempo?",
    summary:
      "L'interesse composto è l'interesse guadagnato sia sul capitale iniziale sia sugli interessi già maturati, il che produce una crescita esponenziale che premia il risparmio precoce e di lungo periodo.",
    tags: ['finanza', 'economia', 'matematica', 'denaro', 'finanza personale'],
    language: 'it',
    content: `# L'interesse composto

L'interesse composto è spesso definito la forza più potente della finanza. È il processo di guadagnare interessi non solo sul denaro che investi all'inizio, ma anche sugli interessi che quel denaro ha già fruttato.

## Semplice contro composto

Con l'**interesse semplice** guadagni una somma fissa a ogni periodo, basata solo sulla somma iniziale (il **capitale**). Con l'**interesse composto** gli interessi di ogni periodo si aggiungono al saldo, così gli interessi del periodo successivo si calcolano su una somma maggiore. La crescita quindi accelera nel tempo — è **esponenziale**, non lineare.

## Un esempio rapido

Investi 1000 al 7% annuo:

- Dopo 1 anno: 1070
- Dopo 10 anni: circa 1967
- Dopo 30 anni: circa 7612

Il denaro **raddoppia** all'incirca ogni decennio senza aggiungere un centesimo — e più a lungo resta investito, più spettacolare è l'effetto.

## La regola del 72

Una scorciatoia pratica, la **regola del 72**, stima quanto tempo serve a un investimento per raddoppiare: dividi 72 per il tasso d'interesse annuo. All'8% il denaro raddoppia in circa 9 anni (72 ÷ 8).

## Perché il tempo conta più di tutto

Poiché la capitalizzazione si costruisce su se stessa, **cominciare presto** conta di solito più che investire grandi somme più tardi. La stessa logica funziona all'inverso con il debito: i saldi non pagati di prestiti o carte ad alto interesse si compongono contro il debitore, perciò tale debito può crescere a ritmi allarmanti.`,
  },
  {
    title: 'Le funzioni hash',
    question: "Cos'è una funzione hash e dove si usa?",
    summary:
      'Una funzione hash trasforma dati di qualsiasi dimensione in una stringa di lunghezza fissa; le buone funzioni hash crittografiche sono veloci, deterministiche e praticamente impossibili da invertire o falsificare con collisioni.',
    tags: ['tecnologia', 'informatica', 'crittografia', 'sicurezza', 'dati'],
    language: 'it',
    content: `# Le funzioni hash

Una funzione hash è uno strumento piccolo ma essenziale nell'informatica. Prende un input di qualsiasi lunghezza — una parola, un file, un intero database — e produce un output di lunghezza fissa detto **hash** o **digest**.

## Proprietà chiave

Una funzione hash utile è:

- **Deterministica.** Lo stesso input produce sempre lo stesso hash.
- **Veloce** da calcolare.
- **A lunghezza fissa.** Un messaggio di un carattere e un file da un gigabyte danno, per esempio, un risultato di 256 bit.

Una funzione hash *crittografica* aggiunge garanzie più forti:

- **A senso unico.** Da un hash non si può recuperare in modo praticabile l'input originale.
- **Resistente alle collisioni.** È praticamente impossibile trovare due input diversi con lo stesso hash.
- **Effetto valanga.** Cambiare un solo carattere dell'input rimescola completamente l'output.

## Usi quotidiani

- **Archiviazione delle password.** I sistemi memorizzano l'hash di una password, non la password stessa, così una fuga di dati non rivela direttamente i segreti degli utenti.
- **Verifiche d'integrità.** I download pubblicano spesso un hash per verificare che un file sia arrivato intatto e non manomesso.
- **Strutture dati.** Le **tabelle hash** usano l'hashing per trovare elementi quasi istantaneamente, per quanti dati siano archiviati.
- **Blockchain.** Le criptovalute concatenano i blocchi tramite hash, rendendo il registro a prova di manomissione.

## Algoritmi comuni

I sistemi moderni preferiscono funzioni robuste come **SHA-256**. Quelle più vecchie, come MD5 e SHA-1, sono oggi considerate violate ai fini della sicurezza perché i ricercatori hanno trovato modi di creare collisioni, e non andrebbero usate per proteggere dati sensibili.`,
  },
  {
    title: 'La macchina di Turing',
    question: "Cos'è la macchina di Turing e perché è fondamentale per il calcolo?",
    summary:
      'La macchina di Turing è un semplice modello matematico del calcolo, ideato da Alan Turing nel 1936, che definisce cosa significhi per un problema essere calcolabile e sostiene tutto il calcolo.',
    tags: ['informatica', 'matematica', 'teoria', 'storia', 'tecnologia'],
    language: 'it',
    content: `# La macchina di Turing

La macchina di Turing non è un dispositivo fisico ma un esperimento mentale — un modello matematico che cattura l'idea stessa di calcolo. Proposta da **Alan Turing** nel 1936, resta il fondamento teorico dell'informatica.

## Un progetto ingannevolmente semplice

Una macchina di Turing è composta da:

- Un **nastro** di lunghezza infinita diviso in celle, ciascuna con un simbolo.
- Una **testina** che può leggere e scrivere il simbolo sottostante e spostarsi a sinistra o a destra.
- Un insieme di **stati** e una tabella di **regole** che dicono alla macchina cosa fare in base allo stato attuale e al simbolo che legge.

Da queste parti minime la macchina può eseguire qualsiasi procedura passo passo. L'intuizione di Turing fu che questo semplice sistema è abbastanza potente da eseguire **qualsiasi** calcolo descrivibile con un algoritmo.

## Universalità

Turing descrisse anche una macchina **universale** capace di leggere la descrizione di qualsiasi altra macchina di Turing e poi di imitarla. È l'antenato teorico del moderno computer programmabile: una macchina che esegue programmi diversi anziché un dispositivo separato per ogni compito.

## I limiti del calcolo

Il modello rivelò anche dei limiti. Turing dimostrò che alcuni problemi sono **indecidibili**: nessun algoritmo può risolverli. Il più celebre è il **problema della fermata**: non esiste un metodo generale per stabilire, per ogni programma e input, se il programma alla fine si fermerà o girerà per sempre.

## Un'influenza duratura

Tutto ciò che un vero computer può calcolare, lo può calcolare anche una macchina di Turing (dati tempo e nastro sufficienti). Questa equivalenza è il motivo per cui il modello definisce ancora i confini di ciò che i computer possono — e non possono — fare.`,
  },
  {
    title: 'Larghezza di banda e latenza',
    question: 'Qual è la differenza tra larghezza di banda e latenza?',
    summary:
      'La larghezza di banda è quanti dati una connessione può trasportare al secondo, mentre la latenza è il ritardo prima che i dati comincino ad arrivare; entrambe plasmano quanto «veloce» appare una rete, ma non sono la stessa cosa.',
    tags: ['tecnologia', 'reti', 'internet', 'informatica', 'ingegneria'],
    language: 'it',
    content: `# Larghezza di banda e latenza

Si dice spesso che una connessione è «veloce», ma la velocità ha in realtà due dimensioni distinte: la **larghezza di banda** e la **latenza**. Confonderle è una fonte comune di frustrazione con le reti.

## Larghezza di banda: quanto

La **larghezza di banda** è la quantità massima di dati che una connessione può trasferire in un dato tempo, misurata di solito in megabit o gigabit al secondo. Un'analogia utile è la larghezza di un tubo: un tubo più largo lascia passare più acqua in una volta. La larghezza di banda aiuta soprattutto nello spostare **grandi** quantità di dati — trasmettere video ad alta risoluzione, scaricare file grandi o fare backup nel cloud.

## Latenza: quanto presto

La **latenza** è il ritardo tra l'invio di una richiesta e la ricezione della prima risposta, misurato in millisecondi. Nell'analogia del tubo è il tempo che l'acqua impiega ad andare da un capo all'altro. La latenza dipende dalla distanza (i segnali non possono superare la velocità della luce), dal numero di salti di rete e dai ritardi di elaborazione. La latenza conta soprattutto nei compiti **interattivi** — videochiamate, giochi online e richieste web rapide.

## Perché la differenza conta

Una connessione può avere larghezza di banda alta ma latenza alta, o viceversa. Un collegamento satellitare può trasportare molti dati e apparire comunque lento perché ogni segnale percorre decine di migliaia di chilometri. Per questo un video può trasmettersi fluido (larghezza di banda) mentre un gioco appare ancora a scatti (latenza).

## Termini correlati

Il **throughput** è la velocità di trasferimento dati effettivamente raggiunta nella pratica, di solito inferiore alla larghezza di banda teorica. Il **jitter** è la variazione della latenza nel tempo, che può disturbare voce e video anche quando la latenza media è bassa.`,
  },
];
