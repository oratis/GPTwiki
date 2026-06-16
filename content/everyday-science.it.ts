import type { DraftArticle } from './types';
import { everydayScienceEn } from './everyday-science.en';

// Batch: Everyday Science (versione nativa in italiano). Stessi titoli e
// topicKey di everyday-science.en.ts; contenuti scritti in modo nativo per il
// lettore italiano. Le immagini sono condivise per topicKey.

const promptOf = (key: string): string => {
  const hit = everydayScienceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const everydayScienceIt: DraftArticle[] = [
  {
    topicKey: 'why-sky-is-blue',
    title: 'Perché il cielo è azzurro?',
    question: 'Perché il cielo è azzurro di giorno e rosso al tramonto?',
    summary:
      'La luce del Sole è bianca — un misto di tutti i colori — ma l’aria diffonde le sue lunghezze d’onda blu, più corte, molto più del rosso, tingendo d’azzurro tutto il cielo. Al tramonto la luce attraversa più aria, il blu viene disperso e restano rossi e arancioni.',
    tags: ['scienza', 'fisica', 'luce', 'natura'],
    language: 'it',
    image: { prompt: promptOf('why-sky-is-blue'), alt: 'Luce bianca che disperde i suoi raggi blu attraverso un’atmosfera di vetro' },
    sources: [
      { title: 'NASA Science — Perché il cielo è azzurro?', url: 'https://spaceplace.nasa.gov/blue-sky/en/' },
      { title: 'NOAA — Diffusione della luce e ottica atmosferica', url: 'https://www.noaa.gov/' },
    ],
    content: `# Perché il cielo è azzurro?

Il cielo è azzurro per via di un braccio di ferro tra la luce del Sole e l'aria. La luce solare sembra bianca, ma in realtà è una miscela di ogni colore dell'arcobaleno mescolati insieme. Mentre quella luce si riversa attraverso l'atmosfera, le molecole di gas dell'aria la **diffondono** — la spingono in nuove direzioni — ed ecco il fatto chiave: diffondono le lunghezze d'onda corte, blu, molto più di quelle lunghe, rosse. Così la luce blu viene scagliata in tutto il cielo e, quando guardi in alto, l'azzurro ti arriva da ogni direzione. L'intera volta celeste si illumina di azzurro.

## La fisica, con delicatezza

La luce viaggia come onde, e i colori si distinguono per **lunghezza d'onda**: la luce rossa ha onde lunghe, il blu e il violetto le hanno corte. Quando la luce colpisce qualcosa di molto più piccolo della sua lunghezza d'onda — come una singola molecola di azoto o di ossigeno — si diffonde in un modo che favorisce fortemente le lunghezze d'onda più corte. L'effetto (chiamato diffusione di Rayleigh, dal fisico che lo spiegò) è notevole: la luce blu si diffonde diverse volte più di quella rossa. Il cielo è essenzialmente luce blu rimbalzata innumerevoli volte nell'atmosfera prima di raggiungere il tuo occhio.

## Due domande che vengono naturali

**Se il blu si diffonde di più, perché il cielo non è violetto?** Il violetto ha una lunghezza d'onda ancora più corta e si diffonde ancora di più — ma nella luce solare di violetto ce n'è meno fin dall'inizio, e i tuoi occhi sono più sensibili al blu che al violetto. La miscela che il tuo cervello percepisce finisce sull'azzurro.

**E perché il Sole stesso appare giallastro?** Perché il blu è stato diffuso *via* dal raggio diretto. La luce che arriva dritta dal Sole ha ceduto parte del suo blu al cielo, lasciando il disco di un giallo-bianco.

## Perché i tramonti diventano rossi

Al tramonto il Sole è basso, quindi la sua luce attraversa di sbieco uno **strato di atmosfera molto più spesso** per arrivare fino a te. Lungo quel percorso così lungo, praticamente tutto il blu (e gran parte del verde) viene diffuso fuori dal raggio prima che questo arrivi. Ciò che resta a raggiungere i tuoi occhi sono le lunghezze d'onda lunghe — rossi e arancioni — ed ecco perché il Sole al tramonto e le nuvole attorno avvampano di colori caldi. La stessa diffusione che rende azzurro il mezzogiorno rende rosso il tramonto; è cambiata solo la lunghezza del percorso.

## Domande frequenti

**Perché nello spazio il cielo è nero?**
Perché non c'è aria che diffonda la luce solare. Gli astronauti vedono il Sole e le stelle su uno sfondo nero assoluto, anche in pieno giorno — niente atmosfera, niente azzurro.

**Questo spiega perché il mare è blu?**
In parte è un'altra cosa. L'azzurro del cielo si riflette sull'acqua, ma l'acqua profonda *assorbe* anche la luce rossa e diffonde il blu per conto suo, quindi il mare è blu per ragioni che si sovrappongono.

**Perché le nuvole sono bianche e non azzurre?**
Le goccioline delle nuvole sono molto più grandi delle molecole d'aria, quindi diffondono *tutti* i colori più o meno allo stesso modo. Tutti i colori rimescolati insieme appaiono bianchi.`,
  },
  {
    topicKey: 'how-vaccines-work',
    title: 'Come funzionano davvero i vaccini?',
    question: 'Come fanno i vaccini ad addestrare il sistema immunitario a proteggerci?',
    summary:
      'Un vaccino mostra al sistema immunitario un’anteprima innocua di un germe, così da imparare a riconoscerlo in anticipo. Poi crea cellule della memoria che ricordano la minaccia per anni, perciò un’infezione vera viene sconfitta in fretta — spesso prima ancora di sentirti male.',
    tags: ['scienza', 'biologia', 'sistema immunitario', 'salute'],
    language: 'it',
    image: { prompt: promptOf('how-vaccines-work'), alt: 'Sentinelle immunitarie studiano una replica innocua di un germe e archiviano distintivi della memoria' },
    sources: [
      { title: 'CDC — Capire come funzionano i vaccini', url: 'https://www.cdc.gov/vaccines/hcp/conversations/understanding-vacc-work.html' },
      { title: 'OMS — Come funzionano i vaccini?', url: 'https://www.who.int/news-room/feature-stories/detail/how-do-vaccines-work' },
    ],
    content: `# Come funzionano davvero i vaccini?

Un vaccino funziona **insegnando al tuo sistema immunitario a riconoscere un germe prima ancora che tu incontri quello vero.** Il tuo sistema immunitario è già geniale nel combattere le infezioni — ma la prima volta che incontra un germe nuovo è lento, impara mentre lavora e nel frattempo ti ammali. Un vaccino salta quella pericolosa prima lezione: mostra al tuo corpo un'anteprima sicura della minaccia, così che, se il germe vero dovesse mai presentarsi, le tue difese sappiano già esattamente cosa fare e lo schiaccino in fretta.

## Cosa c'è davvero nell'anteprima

Un vaccino contiene qualcosa che al tuo sistema immunitario *sembra* un germe specifico, ma che **non può farti ammalare.** A seconda del vaccino, può essere:

- una versione indebolita o inattivata del germe,
- soltanto un suo frammento innocuo (una proteina di superficie), oppure
- istruzioni (come l'mRNA) che dicono alle tue stesse cellule di produrre per poco un frammento innocuo del germe, affinché il sistema immunitario lo studi.

In ogni caso il principio è identico: presentare al sistema immunitario la "forma" riconoscibile del germe (un antigene) senza il pericolo.

## Riconoscere, rispondere, ricordare

Quando il sistema immunitario vede questo antigene, fa tre cose:

1. lo **riconosce** come estraneo;
2. **risponde** producendo anticorpi — proteine fatte su misura per agganciare quello specifico germe — e attivando cellule che distruggono le cellule infette;
3. lo **ricorda**, creando **cellule della memoria** a lunga vita.

Quel terzo passo è tutto il senso della faccenda. Quelle cellule della memoria possono persistere per anni o decenni. Se il germe vero invade, lo riconoscono all'istante e scatenano una risposta rapida e massiccia — spesso sconfiggendo l'infezione prima che tu noti il minimo sintomo. Hai ottenuto l'immunità senza dover prima sopravvivere alla malattia.

## Perché a volte serve più di una dose, e perché un braccio dolorante è normale

Alcuni vaccini richiedono più dosi o richiami perché la memoria immunitaria può essere rafforzata con esposizioni ripetute, oppure può affievolirsi nel tempo e aver bisogno di un ritocco. E il lieve indolenzimento, la stanchezza o la febbricola che alcuni avvertono dopo non sono il germe — sono il tuo sistema immunitario *che fa il suo lavoro*, portando al massimo la risposta all'anteprima. Una reazione è segno che l'addestramento funziona, non che ti sei ammalato.

## Domande frequenti

**Un vaccino può darmi la malattia che previene?**
I vaccini standard non possono causare la malattia — non contengono germi vivi e capaci di farlo (o solo una forma indebolita che non può far ammalare le persone sane). Ciò che puoi avvertire è la risposta immunitaria, non un'infezione.

**Che cos'è l'"immunità di gregge"?**
Quando un numero sufficiente di persone in una comunità è immune, il germe fatica a trovare nuovi ospiti e a diffondersi, il che protegge indirettamente chi non può essere vaccinato (neonati, persone con certe malattie). La protezione diventa collettiva.

**Perché alcuni vaccini durano tutta la vita e altri richiedono richiami?**
Dipende dal germe e da quanto è duratura la risposta della memoria, e dal fatto che il germe muti (come l'influenza) abbastanza da rendere l'addestramento dell'anno scorso non più adatto alla versione di quest'anno. Alcune minacce sono stabili; altre cambiano di continuo.`,
  },
  {
    topicKey: 'why-seasons-happen',
    title: 'Cosa causa davvero le stagioni?',
    question: 'Cosa causa le stagioni — d’estate la Terra è più vicina al Sole?',
    summary:
      'Le stagioni non sono causate dalla distanza dal Sole — un mito diffuso. Accadono perché la Terra è inclinata sul proprio asse: ogni emisfero per metà anno è rivolto verso il Sole (estate) e per l’altra metà gli volta le spalle (inverno), cambiando quanto è diretta la luce.',
    tags: ['scienza', 'astronomia', 'Terra', 'natura'],
    language: 'it',
    image: { prompt: promptOf('why-seasons-happen'), alt: 'Un globo inclinato con la luce solare che colpisce un emisfero in modo diretto e l’altro con angolo radente' },
    sources: [
      { title: 'NASA Science — Cosa causa le stagioni?', url: 'https://spaceplace.nasa.gov/seasons/en/' },
      { title: 'NOAA — L’inclinazione della Terra e le stagioni', url: 'https://www.noaa.gov/' },
    ],
    content: `# Cosa causa davvero le stagioni?

Chiariamo subito l'equivoco scientifico più comune: **le stagioni non sono causate dalla Terra che si avvicina o si allontana dal Sole.** Anzi, la Terra è leggermente *più vicina* al Sole a gennaio — durante l'inverno dell'emisfero settentrionale. Se la causa fosse la distanza, l'intero pianeta avrebbe estate e inverno nello stesso momento. Ma non è così: quando in Australia è estate, in Canada è inverno. La vera causa è l'**inclinazione** della Terra.

## L'inclinazione è tutto

La Terra ruota su un asse inclinato di circa 23,5 gradi rispetto alla sua orbita attorno al Sole. Quell'inclinazione resta puntata nella stessa direzione nello spazio per tutto l'anno, mentre la Terra gira intorno al Sole. Così, per metà dell'orbita, l'emisfero settentrionale si inclina *verso* il Sole, e per l'altra metà gli si inclina *lontano* — e l'emisfero meridionale fa l'opposto. Quell'unico fatto produce tutto ciò che chiamiamo stagioni.

## Perché l'inclinazione rende più caldo o più freddo

Inclinarsi verso il Sole cambia il clima in due modi che si rinforzano a vicenda:

- **Quanto è diretta la luce solare.** Quando il tuo emisfero si inclina verso il Sole, la luce colpisce il suolo in modo più **diretto** — concentrata, come una torcia puntata dritta verso il basso. Quando si inclina lontano, la stessa luce arriva con un **angolo radente**, spalmata sottile su un'area più grande, così ogni porzione di terreno riceve meno energia. La luce diretta riscalda molto più efficacemente di quella obliqua.
- **La durata del giorno.** L'inclinazione fa sì che d'estate il Sole resti sopra l'orizzonte **più a lungo**, perciò ci sono più ore di riscaldamento e meno ore di raffreddamento notturno.

Luce più concentrata, per più ore al giorno, dà come somma l'estate. Luce obliqua per meno ore dà come somma l'inverno.

## Perché questo spiega tutto il resto

- **Emisferi opposti, stagioni opposte:** quando il nord si inclina verso il Sole, il sud si inclina lontano — perciò le loro stagioni sono sempre rovesciate.
- **All'equatore le stagioni quasi non esistono:** resta più o meno di taglio rispetto al Sole tutto l'anno, quindi la luce è sempre piuttosto diretta — da qui il calore costante.
- **Ai poli ci sono mesi di luce o di buio:** l'inclinazione estrema fa sì che d'estate il Sole non tramonti mai del tutto e d'inverno non sorga mai del tutto.

## Domande frequenti

**Quindi la distanza della Terra dal Sole non conta nulla?**
La sua orbita è solo leggermente ovale, perciò la variazione di distanza è piccola e viene sopraffatta dall'effetto dell'inclinazione. Non è zero, ma è un'influenza minore rispetto all'angolo della luce solare.

**Perché il caldo più intenso arriva di solito dopo il giorno più lungo?**
Questo "ritardo stagionale" accade perché terre e oceani impiegano settimane ad assorbire calore e a scaldarsi. Il picco della luce solare in arrivo è il solstizio, ma il picco del calore accumulato arriva uno o due mesi dopo.

**Cosa sono un solstizio o un equinozio?**
I solstizi sono i due momenti di massima inclinazione verso o lontano dal Sole (i giorni più lungo e più corto); gli equinozi sono i due momenti intermedi in cui l'inclinazione è di taglio e giorno e notte sono quasi uguali ovunque.`,
  },
  {
    topicKey: 'why-we-dream',
    title: 'Perché sogniamo?',
    question: 'Perché sogniamo, e i sogni significano davvero qualcosa?',
    summary:
      'Nessuno conosce la risposta completa, ma la scienza più accreditata suggerisce che i sogni non siano casuali: sembrano aiutare il cervello a consolidare i ricordi, elaborare le emozioni e provare situazioni. I sogni più vividi avvengono nel sonno REM, quando il cervello è quasi attivo come sveglio.',
    tags: ['scienza', 'neuroscienze', 'sonno', 'cervello'],
    language: 'it',
    image: { prompt: promptOf('why-we-dream'), alt: 'Un cervello addormentato che si illumina mentre rievoca e archivia frammenti di ricordi per emozione' },
    sources: [
      { title: 'National Institute of Neurological Disorders and Stroke — Brain Basics: il sonno', url: 'https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-understanding-sleep' },
      { title: 'Sleep Foundation — Perché sogniamo?', url: 'https://www.sleepfoundation.org/dreams' },
    ],
    content: `# Perché sogniamo?

Prima la risposta onesta: **la scienza non sa del tutto perché sogniamo** — è una delle autentiche domande aperte sul cervello. Ma "non sappiamo tutto" non significa "non sappiamo niente". I ricercatori hanno teorie solide e supportate da prove, e queste puntano in una direzione coerente: i sogni probabilmente non sono rumore privo di senso. Sembrano essere un sottoprodotto — o persino una funzione — della manutenzione notturna essenziale che il cervello svolge mentre dormi.

## Quando avviene il sogno

Il sonno attraversa diverse fasi in un ciclo, e i sogni più vividi e narrativi si concentrano in una fase chiamata sonno **REM** (rapid eye movement, movimento oculare rapido), quando — stranamente — il cervello è quasi attivo come da sveglio, anche se il corpo è temporaneamente paralizzato (il che opportunamente ti impedisce di mettere in atto i sogni). Attraversi la fase REM più volte a notte, con periodi REM che si allungano verso il mattino: ecco perché spesso ti svegli a metà di un sogno. Sogni anche nelle fasi non-REM più leggere, ma quei sogni tendono a essere più vaghi.

## Le teorie principali

Nessuna singola teoria ha prevalso, e potrebbero essere tutte in parte giuste:

| Teoria | L'idea |
| --- | --- |
| **Consolidamento della memoria** | Sognare aiuta a ordinare le esperienze del giorno, rafforzando i ricordi importanti e potando il resto |
| **Elaborazione emotiva** | I sogni ti permettono di rivivere e disinnescare gli eventi emotivi in uno stato sicuro, "offline" |
| **Prova di minacce/situazioni sociali** | Sognare simula le sfide (pericoli, situazioni sociali) così da arrivare più preparati a quelle reali |
| **Il cervello che dà un senso al rumore** | Durante il REM il cervello si attiva in modo semicasuale, e i sogni sono il suo tentativo di tessere una storia da quell'attività |

Nota che queste si sovrappongono invece di competere: il cervello potrebbe archiviare ricordi, elaborare emozioni *e* filare una narrazione da quell'attività, tutto in una volta.

## I sogni "significano" qualcosa?

Non nel senso della predizione del futuro — non ci sono prove che i sogni prevedano il futuro o portino simboli nascosti universali. Ma non sono nemmeno casuali: il contenuto dei sogni attinge molto alle tue esperienze recenti, alle tue preoccupazioni e alle tue emozioni, perciò un sogno può davvero riflettere ciò che hai in mente. Il significato, quando c'è, è personale ed emotivo, non un codice da decifrare con un dizionario dei sogni.

## Domande frequenti

**Perché dimentico i sogni così in fretta?**
Il cervello non dà priorità all'archiviazione dei sogni nella memoria a lungo termine, e la chimica del sonno REM non è ideale per la formazione dei ricordi. I sogni svaniscono entro pochi minuti dal risveglio, a meno che tu non li ripercorra subito — ecco perché tenere un taccuino sul comodino "funziona".

**Sognano tutti?**
Quasi certamente sì — si ritiene che chi dice di non sognare mai semplicemente non li ricordi. Gli studi sul sonno mostrano attività REM anche in chi riferisce di non fare sogni.

**A cosa servono gli incubi?**
Potrebbero essere il sistema di elaborazione emotiva o di prova delle minacce andato in sovraccarico, spesso innescato da stress o trauma. Gli incubi occasionali sono normali; quelli frequenti e angoscianti possono valere la pena di essere affrontati con un professionista.`,
  },
  {
    topicKey: 'how-planes-fly',
    title: 'Come fanno gli aerei a restare in aria?',
    question: 'Come fanno gli aerei pesanti a generare abbastanza portanza per volare?',
    summary:
      'Un’ala genera portanza deviando l’aria verso il basso — per la terza legge di Newton, spingere l’aria in giù spinge l’ala in su. La sua forma e la sua inclinazione fanno anche scorrere l’aria sopra più veloce e a pressione minore. Insieme bastano a sollevare tonnellate di metallo.',
    tags: ['scienza', 'fisica', 'volo', 'come funziona'],
    language: 'it',
    image: { prompt: promptOf('how-planes-fly'), alt: 'Un’ala che devia verso il basso un flusso d’aria luminoso mentre nasce una forza di portanza verso l’alto' },
    sources: [
      { title: 'NASA Glenn — Come le ali sollevano l’aereo / Dinamica del volo', url: 'https://www.grc.nasa.gov/www/k-12/airplane/lift1.html' },
      { title: 'NASA — Le quattro forze del volo', url: 'https://www.nasa.gov/audience/foreducators/k-4/features/F_Four_Forces_of_Flight.html' },
    ],
    content: `# Come fanno gli aerei a restare in aria?

Sembra quasi incredibile che qualcosa di pesante come un aereo di linea a pieno carico possa galleggiare sull'aria sottile — ma il principio è fisica solida. Il compito di un'ala è generare **portanza**, una forza verso l'alto abbastanza grande da vincere il peso dell'aereo, e lo fa con un trucco fondamentale: **spinge l'aria verso il basso.** Per la terza legge di Newton — a ogni azione corrisponde una reazione uguale e contraria — spingere una grande quantità d'aria verso il *basso* fa sì che l'aria spinga l'ala verso l'*alto*. Tieni a mente questa idea e il resto sono dettagli.

## Due modi di descrivere la stessa portanza

I fisici spiegano la portanza di un'ala da due punti di vista che alla fine concordano:

- **La visione di Newton (l'aria viene deviata in basso).** Un'ala è inclinata leggermente e sagomata in modo che l'aria che la lambisce venga piegata verso il **basso** quando lascia il bordo d'uscita. L'ala scaglia in giù un flusso continuo d'aria; la forza di reazione spinge l'ala in su. Più aria deviata, o deviata con più forza, significa più portanza.
- **La visione della pressione (aria più veloce, pressione più bassa).** Per via della forma e dell'angolo dell'ala, l'aria scorre **più veloce sopra** che sotto. L'aria più veloce ha *pressione più bassa* (principio di Bernoulli), perciò c'è una pressione maggiore che spinge in su dal basso rispetto a quella che spinge in giù dall'alto — una forza netta verso l'alto.

Non sono spiegazioni rivali; sono due descrizioni coerenti di un unico fenomeno. Entrambe avvengono, ed entrambe producono la stessa portanza.

## Cosa controlla quanta portanza

Tre leve, tutte usate da piloti e progettisti:

- **Velocità:** un flusso d'aria più veloce sull'ala significa molta più portanza — ecco perché gli aerei devono accelerare lungo una lunga pista prima di poter lasciare il suolo, ed ecco perché atterrano lentamente con un aiuto in più.
- **Superficie e forma dell'ala:** ali più grandi muovono più aria; il profilo curvo è messo a punto per deviare l'aria in modo efficiente.
- **Angolo di attacco:** inclinare il "muso" dell'ala verso l'alto, contro il flusso d'aria, aumenta la portanza — fino a un certo punto. Inclina troppo e il flusso d'aria regolare si stacca, la portanza crolla e l'ala "stalla".

È anche per questo che vedi i flap estendersi dalle ali durante decollo e atterraggio: ingrandiscono e ricurvano temporaneamente l'ala per spremere portanza extra alle basse velocità.

## Domande frequenti

**La vecchia spiegazione "il dorso è più lungo, quindi l'aria deve accelerare per tenere il passo" era sbagliata?**
Quella storia popolare (l'idea del "tempo di transito uguale") è una semplificazione eccessiva e difettosa — l'aria sul dorso va davvero più veloce, ma non per quel motivo, e le ali volano persino capovolte. Il nucleo affidabile è: le ali deviano l'aria verso il basso, e la pressione è più bassa sopra.

**Cosa tiene un aereo in movimento in avanti?**
I motori forniscono la **spinta**, vincendo la **resistenza** (l'attrito dell'aria). La portanza combatte il peso; la spinta combatte la resistenza. Il volo è l'equilibrio di quelle quattro forze.

**Come volano gli alianti senza motore?**
Scambiano quota per velocità, scendendo dolcemente nell'aria così che il flusso continui a produrre portanza — e cavalcano le correnti d'aria ascendente per riguadagnare altezza. Nessun motore necessario, solo movimento dell'aria.`,
  },
  {
    topicKey: 'why-ice-floats',
    title: 'Perché il ghiaccio galleggia (quando quasi tutto il resto affonda)?',
    question: 'Perché il ghiaccio galleggia sull’acqua, se la maggior parte dei solidi affonda nel proprio liquido?',
    summary:
      'L’acqua è strana: si dilata quando ghiaccia. Le sue molecole si bloccano in un cristallo aperto e spazioso tenuto dai legami a idrogeno, rendendo il ghiaccio circa il 9% meno denso dell’acqua liquida — perciò galleggia. Così i laghi gelano dall’alto e la vita sopravvive sotto.',
    tags: ['scienza', 'chimica', 'acqua', 'natura'],
    language: 'it',
    image: { prompt: promptOf('why-ice-floats'), alt: 'Un reticolo di ghiaccio esagonale e aperto che galleggia su molecole d’acqua liquida fittamente impacchettate' },
    sources: [
      { title: 'USGS — La densità dell’acqua e il ghiaccio', url: 'https://www.usgs.gov/special-topics/water-science-school/science/water-density' },
      { title: 'Royal Society of Chemistry — Il legame a idrogeno nell’acqua', url: 'https://edu.rsc.org/' },
    ],
    content: `# Perché il ghiaccio galleggia (quando quasi tutto il resto affonda)?

Il ghiaccio che galleggia nel tuo bicchiere è così familiare che è facile non accorgersi di quanto sia *strano*. Per quasi ogni altra sostanza sulla Terra, la forma solida è **più densa** di quella liquida — lascia cadere della cera solida nella cera fusa e affonda. L'acqua infrange questa regola: l'acqua solida (il ghiaccio) è **meno** densa dell'acqua liquida, quindi galleggia. La ragione è una proprietà peculiare della molecola d'acqua, e quella peculiarità si rivela essere una delle ragioni per cui la vita sulla Terra sopravvive all'inverno.

## La densità, in una frase

Che qualcosa galleggi o no dipende dalla **densità** — quanta massa è stipata in un dato spazio. Galleggi se sei meno denso del liquido che ti circonda; affondi se sei più denso. Quindi la vera domanda è: perché il congelamento fa *dilatare* l'acqua e la rende meno densa, quando il congelamento fa contrarre la maggior parte delle cose?

## L'architettura aperta del ghiaccio

Le molecole d'acqua sono leggermente sbilanciate nella carica, il che permette loro di afferrarsi a vicenda con deboli attrazioni chiamate **legami a idrogeno.** Nell'acqua liquida, le molecole si urtano, scivolano e si impacchettano abbastanza vicine di continuo. Ma quando l'acqua ghiaccia, quei legami a idrogeno bloccano le molecole in un cristallo rigido e altamente **ordinato** — e, cosa cruciale, quel cristallo è *spazioso*. Per soddisfare tutti i loro legami, le molecole si dispongono in un reticolo aperto, esagonale, con dei vuoti incorporati nella struttura. Le molecole nel ghiaccio sono in realtà tenute *più lontane* in media che nell'acqua liquida.

Più spazio tra le stesse molecole significa meno massa per volume — il ghiaccio è circa il **9% meno denso** dell'acqua liquida. È proprio per questo che un cubetto di ghiaccio galleggia con circa un decimo di sé sopra la superficie, ed è per questo che lo stesso volume d'acqua si dilata e può far scoppiare i tubi quando ghiaccia.

## Perché questa stranezza è importante per la vita

Poiché il ghiaccio galleggia, l'acqua ghiaccia **dall'alto verso il basso**. Uno stagno gela prima in superficie, e quello strato di ghiaccio galleggiante agisce da coperta isolante, rallentando l'ulteriore congelamento e mantenendo liquida l'acqua sottostante. Pesci, piante e altra vita sopravvivono all'inverno in quello strato liquido in basso. Se il ghiaccio affondasse, laghi e persino oceani gelerebbero come blocchi solidi dal fondo verso l'alto, e la vita acquatica come la conosciamo forse non avrebbe mai superato le stagioni fredde. Un piccolo incidente molecolare ha conseguenze enormi.

## Domande frequenti

**L'acqua è più densa al punto di congelamento?**
No — ed è un'altra stranezza. L'acqua è più densa a circa 4°C, leggermente *sopra* il punto di congelamento. Mentre si raffredda oltre, verso gli 0°C, in realtà si dilata un po' prima di trasformarsi in ghiaccio: ecco perché l'acqua più fredda di un lago sta in superficie.

**L'acqua salata ghiaccia e galleggia allo stesso modo?**
Il ghiaccio marino galleggia comunque (è meno denso dell'acqua di mare), ma il sale abbassa il punto di congelamento dell'acqua e ne cambia i dettagli. Il ghiaccio puro che si forma esclude in gran parte il sale.

**Perché aggiungere ghiaccio raffredda così bene una bevanda?**
Oltre a essere freddo, il ghiaccio che si scioglie *assorbe* una grande quantità di calore dal liquido per rompere quei legami a idrogeno mentre torna acqua — sottraendo energia alla tua bevanda nel processo.`,
  },
  {
    topicKey: 'how-soap-works',
    title: 'Come fa il sapone a pulire davvero?',
    question: 'Come fa il sapone a rimuovere grasso e germi che la sola acqua non riesce a togliere?',
    summary:
      'Le molecole di sapone hanno una doppia personalità: un’estremità ama l’acqua, l’altra si aggrappa a grasso e oli. Circondano lo sporco unto e i germi, li staccano dalle superfici e lasciano che l’acqua porti via tutto — ecco perché il sapone è così efficace anche contro molti virus.',
    tags: ['scienza', 'chimica', 'igiene', 'come funziona'],
    language: 'it',
    image: { prompt: promptOf('how-soap-works'), alt: 'Molecole di sapone a due estremità che avvolgono una goccia di grasso per sollevarla nell’acqua' },
    sources: [
      { title: 'Royal Society of Chemistry — Come funziona il sapone (tensioattivi)', url: 'https://edu.rsc.org/' },
      { title: 'CDC — La scienza lo dimostra: perché lavarsi le mani?', url: 'https://www.cdc.gov/handwashing/why-handwashing.html' },
    ],
    content: `# Come fa il sapone a pulire davvero?

Il problema che il sapone risolve lo conosci già: la sola acqua è impotente contro il grasso. Sciacqua una padella unta sotto il rubinetto e l'olio si raccoglie in goccioline e resta lì. Questo perché grasso e acqua, notoriamente, non si mescolano. Il sapone funziona facendo l'astuto **paraninfo molecolare** — colma il divario tra acqua e grasso, così che l'acqua possa finalmente portare via il grasso (e i germi che vi viaggiano dentro).

## La molecola a due facce

Il segreto è la forma di una molecola di sapone. Ognuna è come un minuscolo girino con due estremità molto diverse:

- una **testa** che è *idrofila* — "amante dell'acqua". Si lega volentieri all'acqua.
- una lunga **coda** che è *idrofoba* — "che teme l'acqua" — ma adora aggrapparsi a olio e grasso.

Questa doppia personalità è tutto il trucco. Quando fai schiuma su una superficie unta, le molecole di sapone si dispongono con le code amanti del grasso che si infilano nell'olio e le teste amanti dell'acqua che puntano verso l'esterno, verso l'acqua.

## Circondare, sollevare e sciacquare

Migliaia di molecole di sapone sciamano attorno a una goccia di grasso, code dentro e teste fuori, finché il grumo unto è completamente avvolto in una pallina con una superficie esterna affine all'acqua. Queste piccole sfere si chiamano **micelle.** Ora il grasso un tempo repellente ha un guscio amante dell'acqua — perciò, quando sciacqui, l'acqua corrente afferra quelle micelle e lava via l'intero pacchetto, grasso e sporco intrappolato compresi, giù per lo scarico. Il sapone non ha sciolto il grasso; lo ha *impacchettato* perché l'acqua potesse trasportarlo.

## Perché questo distrugge anche molti germi

La stessa proprietà rende il sapone un eroe silenzioso dell'igiene. Molti germi — compresi i coronavirus e altri virus dotati di involucro — sono avvolti in una **membrana grassa** esterna. Le code amanti del grasso del sapone fanno leva su quel rivestimento grasso e lo fanno a pezzi, smembrando il germe, mentre le micelle sollevano anche i germi dalla tua pelle per portarli via con il risciacquo. Ecco perché **20 secondi di strofinamento con del semplice sapone** sono così efficaci: non stai solo sciacquando via i germi, ne stai smontando chimicamente molti. Conta anche l'azione meccanica dello strofinare — stacca ciò che è incollato.

## Domande frequenti

**L'acqua deve essere calda?**
Non proprio — l'acqua tiepida può aiutare a sciogliere più in fretta alcuni grassi ed è più gradevole, ma il sapone svolge il lavoro chimico a qualsiasi temperatura ragionevole. Conta più il tempo di strofinamento accurato che il calore.

**Il sapone antibatterico è migliore del sapone normale?**
Per il lavaggio quotidiano delle mani, il semplice sapone funziona altrettanto bene nel rimuovere e distruggere i germi, e le autorità sanitarie in genere non trovano i comuni saponi antibatterici più efficaci. Il meccanismo "sapone più strofinamento" è la parte chiave.

**In cosa il detergente è diverso dal sapone?**
I detergenti funzionano esattamente sullo stesso principio a due estremità (anche loro sono "tensioattivi"), ma sono sintetizzati per rendere meglio in acqua dura e a varie temperature. Stessa idea, ingegnerizzata per condizioni più difficili.`,
  },
  {
    topicKey: 'what-causes-rainbows',
    title: 'Cosa provoca un arcobaleno?',
    question: 'Come si formano gli arcobaleni, e perché i colori sono sempre nello stesso ordine?',
    summary:
      'Un arcobaleno è luce solare piegata e scomposta dentro le gocce di pioggia. Ogni goccia agisce come un minuscolo prisma, separa la luce bianca nei suoi colori e li riflette verso di te. La geometria fissa l’ordine dei colori e curva il tutto in un arco centrato di fronte al Sole.',
    tags: ['scienza', 'fisica', 'luce', 'meteo'],
    language: 'it',
    image: { prompt: promptOf('what-causes-rainbows'), alt: 'Luce bianca che entra in una goccia di pioggia ed esce scomposta in colori spettrali ordinati' },
    sources: [
      { title: 'NOAA SciJinks — Come si formano gli arcobaleni?', url: 'https://scijinks.gov/rainbow/' },
      { title: 'NASA Science — La luce e lo spettro elettromagnetico', url: 'https://science.nasa.gov/ems/' },
    ],
    content: `# Cosa provoca un arcobaleno?

Un arcobaleno è un gioco di luce e acqua — più precisamente, **luce solare piegata, scomposta e rimandata verso di te da milioni di gocce di pioggia.** Non è un oggetto in un luogo fino a cui puoi camminare; è un effetto ottico che dipende interamente da dove si trovano il Sole, la pioggia e i *tuoi occhi*. Ecco perché non puoi mai raggiungere l'estremità di un arcobaleno, ed ecco perché la persona accanto a te ne vede uno leggermente diverso: ogni arcobaleno è costruito su misura per chi guarda.

## Cosa succede dentro una singola goccia di pioggia

Segui un raggio di luce solare che entra in una goccia di pioggia sferica:

1. **Si piega entrando.** La luce rallenta e cambia direzione passando dall'aria all'acqua (rifrazione). E, cosa cruciale, i diversi colori si piegano di quantità leggermente diverse — il violetto si piega di più, il rosso di meno.
2. **Si riflette sul fondo.** Il raggio viaggia fino alla superficie interna più lontana della goccia e rimbalza indietro.
3. **Si piega di nuovo uscendo** — e ormai i colori, ciascuno piegato due volte, si sono aperti a ventaglio nell'intero spettro.

Così ogni goccia di pioggia assorbe luce solare bianca ed emette un piccolo spruzzo di colori separati. Un arcobaleno è ciò che vedi quando milioni di gocce lo fanno tutte insieme, ciascuna contribuendo con un colore al tuo occhio a seconda della sua posizione nel cielo.

## Perché i colori sono sempre nello stesso ordine

Poiché l'entità della piegatura è fissata dalla fisica, **il rosso finisce sempre sul bordo esterno dell'arco e il violetto su quello interno**, con arancione, giallo, verde e blu in mezzo — ogni singola volta. L'ordine non si scompiglia mai perché è determinato da quanto ciascuna lunghezza d'onda si rifrange. La sequenza familiare (rosso, arancione, giallo, verde, blu, violetto) è semplicemente lo spettro, ordinato per lunghezza d'onda.

## Perché è un arco, e sempre di fronte al Sole

La geometria funziona solo a un angolo specifico — la luce torna al tuo occhio con la massima intensità a circa **42 gradi** dal punto direttamente opposto al Sole. Tutte le direzioni che formano quello stesso angolo tracciano un cerchio, che tu vedi come l'arco familiare (il terreno di solito nasconde la metà inferiore). È anche per questo che un arcobaleno è sempre nella parte di cielo *opposta* al Sole: devi dare le spalle al Sole, con la pioggia davanti a te, perché gli angoli si allineino.

## Domande frequenti

**Perché si formano i doppi arcobaleni?**
A volte la luce si riflette **due volte** dentro le gocce prima di uscire. Quel secondo arco, più tenue, appare più in alto, e i suoi colori sono **invertiti** (il rosso all'interno) perché il rimbalzo in più capovolge l'ordine.

**Si può davvero raggiungere l'estremità di un arcobaleno?**
No — non è un luogo fisico. Muoviti verso di esso e la geometria si sposta con te, perciò anche l'arcobaleno si muove. Esiste solo in relazione al tuo punto di vista.

**Serve la pioggia per vederne uno?**
Servono goccioline d'acqua e luce solare con l'angolo giusto — perciò vedi arcobaleni anche nella nebbiolina di una cascata, negli irrigatori del giardino e negli spruzzi del mare. A contare sono le gocce, non la nuvola di pioggia.`,
  },
  {
    topicKey: 'why-we-age',
    title: 'Perché invecchiamo?',
    question: 'Cosa fa davvero invecchiare il nostro corpo col tempo?',
    summary:
      'L’invecchiamento è l’accumulo graduale di danni nelle cellule più in fretta di quanto il corpo riesca a ripararli — da estremità dei cromosomi consumate ed errori del DNA a cellule malfunzionanti e infiammazione. Sono molti processi sovrapposti, non un solo orologio: ecco perché è così complesso.',
    tags: ['scienza', 'biologia', 'invecchiamento', 'salute'],
    language: 'it',
    image: { prompt: promptOf('why-we-age'), alt: 'Cellule che accumulano filamenti sfilacciati e piccoli danni nel tempo mentre la riparazione rallenta' },
    sources: [
      { title: 'National Institute on Aging (NIH) — Cosa sappiamo dell’invecchiamento in salute?', url: 'https://www.nia.nih.gov/health/what-do-we-know-about-healthy-aging' },
      { title: 'López-Otín et al., "The Hallmarks of Aging" (2013)', url: 'https://pubmed.ncbi.nlm.nih.gov/23746838/' },
    ],
    content: `# Perché invecchiamo?

L'invecchiamento può sembrare un unico orologio misterioso che scorre verso lo zero, ma dal punto di vista biologico si comprende meglio come **il lento accumulo di danni** — usura a livello di cellule e molecole che, nel corso dei decenni, il corpo diventa sempre meno capace di riparare. Quando sei giovane, la riparazione tiene il passo del danno. Col tempo, il danno comincia a vincere. Non c'è una sola causa dell'invecchiamento; ce ne sono molte sovrapposte, ed è esattamente per questo che è così difficile da fermare e che non esiste un'unica "cura".

## I principali motori dell'invecchiamento

Gli scienziati hanno individuato un insieme di processi intrecciati — spesso chiamati i "segni distintivi dell'invecchiamento" — che insieme guidano il declino. Alcuni tra i più importanti:

| Processo | Cosa va storto |
| --- | --- |
| **Accorciamento dei telomeri** | I cappucci protettivi alle estremità dei cromosomi si accorciano a ogni divisione cellulare, limitando alla fine la divisione |
| **Danno al DNA** | Errori e danni si accumulano nel nostro codice genetico più in fretta di quanto vengano corretti |
| **Cellule logore (senescenza)** | Le cellule danneggiate smettono di dividersi ma restano lì, rilasciando segnali che danneggiano le vicine |
| **Problemi alle proteine** | Le cellule diventano meno capaci di smaltire le proteine danneggiate e mal ripiegate, che si accumulano |
| **Centrali elettriche guaste** | I mitocondri (i generatori di energia delle cellule) diventano meno efficienti |
| **Infiammazione cronica** | Un'infiammazione di basso grado, diffusa in tutto il corpo ("inflammaging"), aumenta con l'età |

Nessuno di questi, da solo, *è* l'invecchiamento. Si rinforzano a vicenda — il DNA danneggiato crea cellule logore, le cellule logore alimentano l'infiammazione, l'infiammazione causa altri danni — perciò il declino si compone come gli interessi.

## Perché invecchiamo, in fondo (la domanda più profonda)

L'evoluzione offre una ragione per cui l'invecchiamento esiste in primo luogo: la selezione naturale lavora con più impegno per tenerci in salute durante gli anni riproduttivi, e la sua presa si allenta in seguito. Geni e compromessi che giovano alla giovinezza possono comportare costi che si manifestano solo più tardi, quando la pressione evolutiva a correggerli è debole. In breve, i corpi sono regolati per portare i loro geni nella generazione successiva, non per durare in eterno — perciò la manutenzione è "abbastanza buona", non perfetta.

## Si può rallentare in qualche modo?

L'invecchiamento in sé oggi non può essere fermato, ma la **velocità** del danno è in parte influenzata da come viviamo. Non fumare, fare attività fisica regolare, dormire in modo decente, una dieta ragionevole e gestire lo stress cronico sono ripetutamente associati a un declino più lento e a una vita in salute più lunga — non magia, ma la differenza tra invecchiare bene e invecchiare male. La ricerca sui meccanismi sottostanti è attiva, ma le leve dimostrate restano, senza alcun fascino, molto pratiche.

## Domande frequenti

**Esiste una durata massima della vita umana?**
Sembra esserci un tetto approssimativo — anche con una salute perfetta, pochissime persone superano i ~115 anni, il che suggerisce che il danno accumulato finisca per sopraffare la riparazione. L'attuale record verificato è di 122 anni.

**Gli animali più grandi o più piccoli invecchiano più in fretta?**
In generale gli animali più piccoli vivono vite più brevi, ma ci sono eccezioni sorprendenti (alcuni piccoli pipistrelli e gli eterocefali glabri vivono molto più a lungo di quanto la loro taglia preveda), ed è esattamente per questo che i ricercatori li studiano.

**La scienza riuscirà mai a "curare" l'invecchiamento?**
Nessuno lo sa. I ricercatori prendono di mira singoli segni distintivi (eliminare le cellule logore, proteggere il DNA), e alcuni rallentano l'invecchiamento negli animali da laboratorio — ma tradurlo in un'estensione sicura della vita umana in salute non è dimostrato e probabilmente è ancora lontano.`,
  },
  {
    topicKey: 'what-is-electricity',
    title: 'Cos’è davvero l’elettricità?',
    question: 'Cos’è davvero l’elettricità, e come alimenta i nostri dispositivi?',
    summary:
      'L’elettricità è il flusso di carica elettrica — di solito elettroni che vanno alla deriva in un filo, spinti dalla tensione. Le centrali non creano gli elettroni; forniscono la "spinta" che muove quelli già presenti nei fili, e quel moto organizzato porta energia ai tuoi dispositivi.',
    tags: ['scienza', 'fisica', 'elettricità', 'come funziona'],
    language: 'it',
    image: { prompt: promptOf('what-is-electricity'), alt: 'Cariche luminose in un filo che vanno alla deriva insieme sotto la tensione per accendere un dispositivo' },
    sources: [
      { title: 'U.S. Energy Information Administration — L’elettricità spiegata', url: 'https://www.eia.gov/energyexplained/electricity/' },
      { title: 'NASA — Le basi di elettricità e magnetismo', url: 'https://science.nasa.gov/' },
    ],
    content: `# Cos'è davvero l'elettricità?

Usiamo la parola "elettricità" in modo disinvolto, ma nel suo nucleo significa una cosa sola: **il flusso di carica elettrica.** Tutto è fatto di atomi, e gli atomi contengono particelle cariche — in particolare gli **elettroni**, che portano una minuscola carica negativa. In certi materiali, soprattutto nei metalli, alcuni elettroni sono liberi di muoversi. Quando un numero enorme di quegli elettroni va alla deriva nella stessa direzione lungo un filo, quel flusso organizzato *è* una corrente elettrica. L'elettricità è, alla lettera, carica in movimento.

## Tre parole che la rendono chiara

Una semplice analogia idraulica fa scattare i termini chiave — immagina l'acqua nei tubi:

- La **tensione** è la *spinta* — come la pressione dell'acqua. È la forza che fa scorrere le cariche attraverso un circuito. Niente pressione, niente flusso.
- La **corrente** è la *portata* — quanta carica passa effettivamente per un punto ogni secondo (misurata in ampere).
- La **resistenza** è quanto il materiale *si oppone* al flusso — un tubo stretto e ostruito contro uno largo e libero.

Più tensione spinge più corrente; più resistenza ne lascia passare meno. Quella relazione (la legge di Ohm) governa quasi ogni circuito. E una corrente ha bisogno di un **circuito** completo — un anello ininterrotto dalla sorgente, attraverso il dispositivo e ritorno — ed è per questo che azionare un interruttore (interrompere l'anello) ferma tutto all'istante.

## Un equivoco cruciale: la centrale non ti manda gli elettroni

Ecco ciò che sorprende la maggior parte delle persone. La centrale elettrica non ti spedisce elettroni a casa come acqua in un'autobotte. **Gli elettroni sono già nei fili.** Ciò che la centrale fornisce è la *spinta* — la tensione che mette quegli elettroni già presenti a vibrare e ad andare alla deriva. Nella corrente alternata (CA) che esce dalla maggior parte delle prese, gli elettroni non viaggiano nemmeno fino a te; sciabordano avanti e indietro sul posto, molte volte al secondo. Ciò che viaggia davvero fino al tuo dispositivo, in fretta, è l'**energia** trasportata da quel moto coordinato — non gli elettroni stessi.

## Come tutto questo diventa utile

Quando la carica in movimento incontra un dispositivo, il dispositivo la costringe a compiere lavoro mentre lo attraversa: una resistenza riscaldante trasforma il flusso in calore, un motore lo trasforma in movimento, un LED lo trasforma in luce, un chip usa minuscole correnti commutate per calcolare. In ogni caso, la carica in movimento consegna energia, e il dispositivo converte quell'energia in qualunque cosa tu volessi.

## Domande frequenti

**Il fulmine è la stessa elettricità che ho nel muro?**
È lo stesso fenomeno di fondo — un flusso di carica — ma il fulmine è una scarica enorme e brevissima che pareggia la carica accumulata tra nuvola e suolo, a una tensione enormemente più alta di quella domestica.

**Qual è la differenza tra corrente alternata e continua?**
Nella corrente continua (CC, come una batteria) la carica scorre in modo costante in una sola direzione; nella corrente alternata (CA, dalla rete) si inverte rapidamente avanti e indietro. La rete usa la CA perché è facile aumentarne e diminuirne la tensione per una trasmissione efficiente su lunghe distanze.

**Perché i metalli sono buoni conduttori?**
I loro atomi condividono un "mare" di elettroni debolmente trattenuti e liberi di muoversi, perciò la carica scorre con facilità. Gli isolanti (gomma, vetro) trattengono saldamente i loro elettroni, perciò la carica non può scorrere — ed è per questo che i fili sono di rame all'interno e di plastica all'esterno.`,
  },
];
