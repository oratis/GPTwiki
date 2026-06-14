import type { DraftArticle } from './types';
import { personalFinanceEn } from './personal-finance.en';

// Batch: Personal Finance (versione nativa italiana). Stessi titoli e
// topicKey di personal-finance.en.ts; i contenuti sono scritti in modo
// nativo per il lettore italiano (valuta in euro, concetti istituzionali
// tenuti generali, senza vincolarli al regime fiscale/previdenziale di un
// singolo paese). Le immagini sono condivise per topicKey.

const promptOf = (key: string): string => {
  const hit = personalFinanceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

const NOTE =
  '\n\n*Questo articolo è educazione finanziaria generale, non una consulenza finanziaria personalizzata.*';

export const personalFinanceIt: DraftArticle[] = [
  {
    topicKey: 'compound-interest',
    title: 'Come funziona davvero l’interesse composto',
    question: 'Come funziona l’interesse composto e perché lo definiscono così potente?',
    summary:
      'L’interesse composto fa rendere anche i rendimenti già maturati: il denaro cresce in modo esponenziale, non lineare. Più del tasso conta il tempo: la curva resta piatta per anni, poi s’impenna — ecco perché chi inizia presto vince.',
    tags: ['finanza', 'investimenti', 'interesse composto', 'risparmio'],
    language: 'it',
    image: {
      prompt: promptOf('compound-interest'),
      alt: 'Un seme di luce che cresce in un albero che si ramifica in modo esponenziale',
    },
    sources: [
      { title: 'Investor.gov (SEC) — Calcolatore dell’interesse composto', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Wiki Bogleheads — Filosofia d’investimento e concetti fondamentali', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Come funziona davvero l'interesse composto

L'interesse composto significa che guadagni un rendimento non solo sul denaro che hai versato, ma anche sui rendimenti che quel denaro ha già generato. L'interesse semplice cresce in linea retta; l'interesse composto cresce lungo una curva che parte piatta e finisce ripida. La maggior parte della magia avviene negli anni finali — ecco perché *quando* inizi conta più di quasi ogni altra cosa.

## Il meccanismo in un esempio

Investi 10.000 € in uno strumento che rende il 7% l'anno:

- **Anno 1**: guadagni 700 € (sui tuoi 10.000).
- **Anno 2**: guadagni 749 € — 700 sul capitale iniziale più 49 sul guadagno dell'anno scorso.
- **Anno 10**: il montante è circa 19.700 €; quel solo anno rende ~1.290 €.
- **Anno 30**: il montante è circa 76.000 €; un singolo anno ora rende ~5.000 € — metà del capitale iniziale, ogni anno, senza fare nulla.

La formula è A = C × (1 + r)^t, ma l'intuizione è più semplice: la crescita si nutre della crescita precedente, quindi i guadagni accelerano.

## La regola del 72

Dividi 72 per il tuo rendimento annuo per stimare in quanti anni il denaro raddoppia:

| Rendimento annuo | Raddoppia all'incirca ogni |
| --- | --- |
| 3% | 24 anni |
| 6% | 12 anni |
| 7% | ~10 anni |
| 10% | ~7 anni |

I raddoppi si sommano: al 7%, trent'anni sono circa tre raddoppi — 1× diventa ~8×. La stessa aritmetica gioca anche contro di te: un debito al 18% raddoppia in circa quattro anni, e un'inflazione al 3% dimezza il potere d'acquisto in circa 24.

## Perché il tempo batte il tasso

Versando 500 € al mese al 7%:

- Per **30 anni**: ~610.000 € (180.000 versati).
- Per **40 anni**: ~1.310.000 € (240.000 versati).

Dieci anni iniziali in più — solo 60.000 € versati in più — aggiungono circa 700.000 €, perché il denaro più vecchio compone più a lungo. Inseguire un punto percentuale di rendimento in più è molto meno affidabile che comprare anni in più iniziando subito.

## Che cosa compone nella vita reale

I conti di risparmio compongono alla lettera; i portafogli azionari compongono statisticamente (i rendimenti variano di anno in anno, ma i guadagni reinvestiti si sommano l'uno sull'altro); i dividendi compongono se reinvestiti. Anche i costi compongono, all'inverso: una commissione annua dell'1% su un rendimento lordo del 7% si mangia circa un quarto della tua ricchezza finale in 40 anni.

## Domande frequenti

**La frequenza di capitalizzazione (giornaliera vs mensile) conta molto?**
Molto meno di quanto si creda — al 5%, la capitalizzazione giornaliera rispetto a quella annuale differisce di circa 0,13 punti percentuali di rendimento effettivo. Dominano il tasso e il tempo.

**Da dove arriva il famoso 7% spesso citato?**
È all'incirca il rendimento storico di lungo periodo, al netto dell'inflazione, degli indici azionari statunitensi ad ampia base. È una media su anni molto turbolenti, non una promessa.

**L'interesse composto è davvero "l'ottava meraviglia del mondo" (Einstein)?**
La citazione è quasi certamente apocrifa — la matematica è meraviglia a sufficienza, senza bisogno dell'avallo di una celebrità.${NOTE}`,
  },
  {
    topicKey: 'index-funds',
    title: 'Che cos’è un fondo indicizzato — e perché gli esperti continuano a consigliarlo?',
    question: 'Che cos’è un fondo indicizzato e perché viene così spesso consigliato ai comuni risparmiatori?',
    summary:
      'Un fondo indicizzato compra automaticamente ogni titolo di un indice di mercato, con commissioni vicine allo zero. Decenni di dati mostrano che la grande maggioranza dei gestori professionisti non riesce a batterlo nel lungo periodo — ed è tutto qui l’argomento.',
    tags: ['finanza', 'investimenti', 'fondi indicizzati', 'investimento passivo'],
    language: 'it',
    image: {
      prompt: promptOf('index-funds'),
      alt: 'Centinaia di cubetti luminosi trasportati come un unico paniere',
    },
    sources: [
      { title: 'SPIVA — Pagelle S&P Indici vs Gestione attiva', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Wiki Bogleheads — Portafoglio a tre fondi', url: 'https://www.bogleheads.org/wiki/Three-fund_portfolio' },
      { title: 'Investor.gov (SEC) — Nozioni di base su fondi comuni ed ETF', url: 'https://www.investor.gov' },
    ],
    content: `# Che cos'è un fondo indicizzato — e perché gli esperti continuano a consigliarlo?

Un fondo indicizzato è un fondo che non prova a scegliere i vincenti. Si limita a comprare ogni titolo di un indice di mercato — tutte le ~500 società dell'S&P 500, o le migliaia di azioni di un indice total market — in proporzione alla loro dimensione, e a tenerli. Niente analisti, niente previsioni, niente sala operativa da mantenere. Sembra una resa; i dati dicono il contrario.

## L'argomento in tre fatti

**1. I mercati sono difficili da battere.** Le pagelle SPIVA, pubblicate da oltre vent'anni, rilevano ripetutamente che su finestre di 15 anni la grande maggioranza — spesso l'80–90% — dei fondi a gestione attiva sottoperforma il proprio indice di riferimento nei mercati principali. I professionisti, con team a tempo pieno, in media non riescono a battere l'indice rispetto al quale vengono misurati.

**2. Non puoi conoscere i vincenti in anticipo.** Alcuni fondi battono il mercato — ma i vincenti raramente persistono, e i risultati passati sono un pessimo selettore. Scegliere il gestore vincente del prossimo decennio è lo stesso problema dello scegliere l'azione vincente del prossimo decennio, un piano più in alto.

**3. I costi compongono contro di te.** I fondi indicizzati applicano spese correnti basse fino allo 0,03–0,2% l'anno; i fondi attivi applicano comunemente lo 0,5–1,5% più costi di negoziazione interni più alti. Un freno annuo dell'1%, composto su 40 anni, si mangia circa un quarto della ricchezza finale. Il fondo indicizzato vince in parte semplicemente rifiutandosi di spendere i tuoi soldi.

## Che cosa ottieni davvero

| Caratteristica | Fondo indicizzato | Tipico fondo attivo |
| --- | --- | --- |
| Obiettivo | Replicare il mercato | Battere il mercato |
| Commissione annua | ~0,03–0,2% | ~0,5–1,5%+ |
| Diversificazione | Centinaia–migliaia di titoli | Le scelte del gestore |
| Rischio persona chiave | Nessuno | L'addio del gestore conta |
| Prevedibilità | Ottieni il rendimento di mercato, meno ~nulla | Ampia dispersione attorno all'indice |

L'inquadratura onesta: un fondo indicizzato ti garantisce che non batterai mai il mercato — e in cambio ti rende statisticamente molto probabile battere la maggior parte di chi ci prova.

## Che cosa i fondi indicizzati non risolvono

Non rimuovono il rischio di mercato: un fondo total market è caduto di circa la metà nel 2008–09 e si è ripreso con il mercato. Non scelgono la tua asset allocation — quanto azioni rispetto a obbligazioni resta una tua decisione (e conta più della scelta del fondo). E un indice ristretto (un settore, un tema) non è diversificazione; il consiglio è puntare su indici ad ampia base.

## Domande frequenti

**Se tutti indicizzassero, i mercati non si romperebbero?**
A un estremo teorico la formazione dei prezzi si indebolirebbe — ma la negoziazione attiva domina ancora i volumi giornalieri, e qualunque inefficienza lasciata aperta richiamerebbe gli stock picker. Siamo lontanissimi da quel limite.

**Fondo indicizzato o ETF?**
Entrambi possono replicare lo stesso indice; la differenza è l'involucro di negoziazione. Per un risparmiatore di lungo periodo, vanno bene entrambi — contano di più le commissioni e l'indice replicato.

**I fondi indicizzati sono "accontentarsi della media"?**
Si accontentano del rendimento *del mercato*, che al netto dei costi è storicamente atterrato sopra i risultati della maggior parte dei professionisti. Prezzo medio, esito sopra la media.${NOTE}`,
  },
  {
    topicKey: 'inflation-purchasing-power',
    title: 'Come l’inflazione erode silenziosamente il tuo potere d’acquisto',
    question: 'Come fa l’inflazione a erodere davvero i risparmi e il potere d’acquisto nel tempo?',
    summary:
      'L’inflazione è una tassa lenta e composta sulla liquidità ferma: al 3% l’anno, il denaro perde metà del potere d’acquisto in circa 24 anni. Capire i rendimenti reali (al netto dell’inflazione) è ciò che distingue risparmiare dal preservare la ricchezza.',
    tags: ['finanza', 'inflazione', 'economia', 'risparmio'],
    language: 'it',
    image: {
      prompt: promptOf('inflation-purchasing-power'),
      alt: 'Una moneta che si rimpicciolisce in una clessidra mentre gli oggetti intorno crescono',
    },
    sources: [
      { title: 'US Bureau of Labor Statistics — Indice dei prezzi al consumo', url: 'https://www.bls.gov/cpi/' },
      { title: 'FRED (Fed di St. Louis) — serie di dati sull’inflazione', url: 'https://fred.stlouisfed.org' },
    ],
    content: `# Come l'inflazione erode silenziosamente il tuo potere d'acquisto

L'inflazione è il ritmo a cui i prezzi in generale salgono — equivalentemente, il ritmo a cui ogni unità di denaro compra di meno. Funziona esattamente come l'interesse composto, ma contro di te: piccole percentuali annue, che compongono in silenzio, finché l'effetto cumulato è enorme. La liquidità nascosta sotto il materasso non è "sicura"; è garantito che si rimpicciolisca.

## L'aritmetica composta della perdita

Usando la regola del 72 al contrario — 72 diviso il tasso d'inflazione dà gli anni perché il potere d'acquisto si dimezzi:

| Inflazione media | Il denaro si dimezza in |
| --- | --- |
| 2% | ~36 anni |
| 3% | ~24 anni |
| 5% | ~14 anni |
| 8% | ~9 anni |

A un modesto 3%, i 100 € nel tuo cassetto diventano, in termini di potere d'acquisto, circa 74 dopo dieci anni, 55 dopo venti e 48 dopo ventiquattro. Nessuno ha rubato nulla; tutto è semplicemente diventato più caro.

## Nominale vs reale: l'unica distinzione che conta

Un conto di risparmio che paga il 2% mentre l'inflazione corre al 3% ha un **rendimento reale di circa −1%** — stai perdendo potere d'acquisto mentre il saldo cresce. Sottrai sempre l'inflazione:

rendimento reale ≈ rendimento nominale − tasso d'inflazione

Questa singola sottrazione reimposta gran parte delle decisioni di denaro. "Il mio deposito paga il 4%" non significa nulla finché non sai se i prezzi salgono del 2% o del 6%. Storicamente, gli indici azionari ad ampia base hanno reso rendimenti reali positivi nel lungo periodo (circa il 6–7% reale negli USA su finestre molto lunghe), mentre la liquidità e i depositi a breve sono rimasti vicini allo zero reale — talvolta sotto.

## Chi viene danneggiato dall'inflazione e chi aiutato

- **Danneggia**: chi detiene liquidità e pagamenti fissi — risparmiatori su conti a basso rendimento, chiunque viva di una pensione fissa, i creditori che hanno bloccato tassi bassi.
- **Aiuta**: chi ha debiti a tasso fisso (li ripaga con denaro più a buon mercato), e i proprietari di beni reali — aziende, immobili, azioni — i cui prezzi e utili tendono a salire con il livello dei prezzi nel tempo.

Quell'asimmetria è il motivo per cui "tenere i risparmi di più decenni interamente in liquidità" è, storicamente, una delle strategie più affidabilmente perdenti, pur sembrando la più sicura.

## Inflazione misurata vs la tua inflazione

L'indice ufficiale dei prezzi traccia un paniere medio nazionale. Il tuo tasso personale varia con la tua vita: chi affitta in città calde, i genitori che pagano la retta o chi viaggia spesso può sperimentare un'inflazione ben sopra il dato principale; un proprietario di casa stabile può sperimentarne meno. Giudica le tue finanze rispetto al tuo paniere, non solo al numero del titolo di giornale.

## Domande frequenti

**Un po' d'inflazione è positiva?**
La maggior parte delle banche centrali punta deliberatamente a circa il 2% — un'inflazione lieve oliа gli aggiustamenti salariali e scoraggia l'accumulo di liquidità, mentre la deflazione (prezzi in calo) tende ad accompagnare la stagnazione economica e rende più pesante il debito.

**L'inflazione significa che dovrei evitare tutta la liquidità?**
No — il compito di un fondo di emergenza è la disponibilità, non la crescita, e il suo costo d'inflazione è il premio che paghi per la sicurezza. L'errore è tenere in liquidità il denaro con *orizzonte di decenni*.

**Che cosa protegge dall'inflazione?**
Su orizzonti lunghi: beni produttivi (azioni ad ampia base, immobili) e obbligazioni indicizzate all'inflazione. Su orizzonti brevi nulla è perfetto — ed è per questo che conta abbinare gli asset all'orizzonte temporale.${NOTE}`,
  },
  {
    topicKey: 'emergency-fund',
    title: 'Quanto dovrebbe essere grande il tuo fondo di emergenza?',
    question: 'Quanti mesi di spese dovrei tenere in un fondo di emergenza, e dove?',
    summary:
      'La risposta standard è 3–6 mesi di spese essenziali in forma immediatamente accessibile e priva di rischio — di più se il reddito è instabile. Il suo compito è l’assicurazione, non il rendimento: impedisce che la sfortuna diventi debito.',
    tags: ['finanza', 'risparmio', 'fondo di emergenza', 'budget'],
    language: 'it',
    image: {
      prompt: promptOf('emergency-fund'),
      alt: 'Una sfera su cuscino dentro un caveau di vetro che devia frammenti di tempesta',
    },
    sources: [
      { title: 'Consumer Financial Protection Bureau — guide al risparmio di emergenza', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# Quanto dovrebbe essere grande il tuo fondo di emergenza?

Un fondo di emergenza è denaro il cui unico compito è assorbire gli urti — perdita del lavoro, spese mediche, l'auto che muore la stessa settimana dello scaldabagno. La guida standard è **3–6 mesi di spese essenziali**, tenuti da qualche parte di noioso, liquido e privo di rischio. Rende poco per scelta: stai comprando un'assicurazione, e il rendimento a cui rinunci è il premio.

## Dimensionarlo onestamente

Conta la spesa mensile *essenziale* — casa, cibo, utenze, assicurazioni, trasporti, rate minime dei debiti — non l'intero tenore di vita. Poi scala in base a quanto è fragile il tuo reddito:

| Situazione | Obiettivo ragionevole |
| --- | --- |
| Due stipendi stabili in famiglia | 3 mesi di spese essenziali |
| Un solo stipendio stabile | 4–6 mesi |
| Lavoro autonomo / a provvigione / stagionale | 6–12 mesi |
| Reddito unico + persone a carico + mercato del lavoro debole | verso i 12 mesi |
| Rischio noto imminente (licenziamenti annunciati, contratto in scadenza) | quanto più possibile, subito |

Lo schema: il fondo copre il divario realistico tra il perdere il reddito e il sostituirlo, più gli urti di dimensione "franchigia" lungo la strada.

## Dove tenerlo

Tre requisiti: **disponibile in giorni, non in settimane; nessuna perdita di valore nominale; separato dal denaro di tutti i giorni.** Significa conti di risparmio ad alto rendimento, fondi monetari o depositi a breve con accesso senza penali. Esclude le azioni (che possono essere giù del 30% nel mese in cui ti servono), i lunghi vincoli e qualunque cosa esiteresti a vendere. Tenerlo in una banca diversa da quella del conto corrente aggiunge un utile attrito contro la tentazione di "prenderlo in prestito".

## Perché non investirlo invece?

Perché le emergenze sono correlate alle fasi di ribasso. Il classico scenario di fallimento: arriva la recessione, perdi il lavoro *e* il mercato azionario è giù del 35%, così il tuo "fondo di emergenza in fondi indicizzati" paga proprio quando è più piccolo. Il valore del fondo è che non è correlato alla tua fortuna. Sì, l'inflazione lo rosicchia — è il costo dell'assicurazione, ed è più economico che liquidare investimenti sul fondo o portarsi dietro un debito da carta di credito al 20% di TAEG.

## Costruirlo da zero

Una sequenza utile: prima porta avanti un mese (questo uccide gran parte dello stress del vivere da uno stipendio all'altro), poi costruisci verso tre mesi pagando almeno i minimi su tutti i debiti, poi rivaluta se merita priorità il debito ad alto interesse o il resto del fondo — matematicamente, abbattere una carta al 20% di TAEG è un "rendimento" imbattibile, quindi molte persone si fermano a un mese, eliminano il debito tossico e poi completano il fondo.

## Domande frequenti

**Una carta di credito è un fondo di emergenza accettabile?**
È un *ponte* d'emergenza, non un fondo — va bene per le 48 ore prima che il risparmio si trasferisca, pessimo come piano, perché le emergenze che contano di più (la perdita del lavoro) sono esattamente quando portarsi un debito al 20% di TAEG fa più male.

**Il fondo dovrebbe crescere con il mio reddito?**
Dovrebbe crescere con le tue *spese e i tuoi obblighi*. Un aumento che risparmi non richiede un fondo più grande; un mutuo e due figli sì.

**Che cosa conta come emergenza?**
Inatteso, necessario, urgente — scegline tre. Un'offerta sui voli non ne soddisfa nessuno; un cambio rotto che ti serve per lavorare li soddisfa tutti.${NOTE}`,
  },
  {
    topicKey: 'stocks-vs-bonds',
    title: 'Azioni vs obbligazioni: qual è la differenza reale?',
    question: 'Qual è la differenza reale tra azioni e obbligazioni, e come si comportano in modo diverso?',
    summary:
      'Un’azione è proprietà — il tuo rendimento dipende da come va l’impresa. Un’obbligazione è un prestito — il tuo rendimento è un contratto. Questa sola differenza spiega perché le azioni rendono di più in media e perché le obbligazioni stabilizzano un portafoglio.',
    tags: ['finanza', 'investimenti', 'azioni', 'obbligazioni'],
    language: 'it',
    image: {
      prompt: promptOf('stocks-vs-bonds'),
      alt: 'Una cresta frastagliata in salita accanto a una scalinata regolare di luce',
    },
    sources: [
      { title: 'Investor.gov (SEC) — introduzione ad azioni e obbligazioni', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) — dati storici sui rendimenti', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Azioni vs obbligazioni: qual è la differenza reale?

Un'**azione** ti rende comproprietario di un'impresa: partecipi ai suoi profitti (dividendi, crescita) e ai suoi fallimenti, senza alcuna promessa. Un'**obbligazione** ti rende creditore di un'impresa o di uno Stato: ti devono un interesse fisso e la restituzione del capitale a una data, per contratto. Tutto il resto — il divario di rendimento, il divario di rischio, il modo in cui i portafogli li mescolano — discende da proprietà contro prestito.

## L'accordo che ciascuna offre

| | Azione (proprietà) | Obbligazione (prestito) |
| --- | --- | --- |
| Il tuo rendimento | Ciò che resta dopo aver pagato tutti — guadagno illimitato | Cedole fisse + capitale restituito — guadagno limitato |
| Se l'azienda prospera | Catturi la crescita | Ricevi comunque le stesse cedole |
| Se fallisce | Sei l'ultimo in fila, spesso azzerato | I creditori sono pagati prima dei proprietari |
| Rischi principali | Risultati aziendali, umore del mercato | Insolvenza, inflazione, tassi in rialzo |
| Rendimento reale storico di lungo periodo (USA, finestre molto lunghe) | ~6–7% l'anno | ~1–3% l'anno |
| Anno cattivo tipico | −20% a −50% | −5% a −15% (shock dei tassi) |

Il rendimento medio più alto delle azioni non è un bonus; è il pagamento per accettare l'incertezza e lo status di ultimo in fila. La finanza lo chiama premio per il rischio azionario.

## Che cosa muove i prezzi delle obbligazioni

Le obbligazioni non sono statiche: i prezzi delle obbligazioni negoziate si muovono in direzione opposta ai tassi d'interesse. Se detieni un'obbligazione che paga il 2% e le nuove obbligazioni pagano il 5%, nessuno compra la tua al valore nominale — il suo prezzo scende finché i rendimenti non si allineano. Le obbligazioni a scadenza più lunga oscillano più forte. Ecco perché perfino i fondi obbligazionari "sicuri" hanno avuto un anno storicamente pessimo quando i tassi sono saliti, ed ecco perché le obbligazioni riducono ma non eliminano il rischio.

## Perché i portafogli li mescolano

Azioni e obbligazioni spesso (non sempre) zigzagano in momenti diversi: le recessioni che schiacciano le azioni di solito portano tagli dei tassi che sollevano le obbligazioni di alta qualità. Un classico mix 60/40 ha storicamente catturato gran parte della crescita delle azioni con drawdown sensibilmente più piccoli. Il mix è una manopola:

- **Più azioni** → crescita attesa più alta, ribassi più profondi e più lunghi. Adatto agli orizzonti lunghi.
- **Più obbligazioni** → percorso più stabile, crescita attesa più bassa. Adatto alle esigenze a breve e agli stomaci deboli.

L'impostazione giusta dipende da quando ti servono i soldi e da come ti comporti in un crollo — vendere azioni nel panico costa più di qualsiasi errore di allocazione.

## Domande frequenti

**Le obbligazioni sono "sicure"?**
Più sicure delle azioni contro il fallimento dell'azienda; non sicure contro l'inflazione o i movimenti dei tassi. Un titolo di Stato tenuto fino a scadenza restituisce il denaro promesso — che l'inflazione può svalutare in silenzio.

**Mi servono obbligazioni singole o un fondo obbligazionario?**
I fondi offrono facile diversificazione e liquidità; le obbligazioni singole offrono una data di rimborso nota. Per la maggior parte dei risparmiatori, un fondo obbligazionario ampio e di alta qualità è lo strumento più semplice.

**Perché non 100% azioni se sono giovane?**
Difendibile matematicamente con decenni di orizzonte e disciplina di ferro. Il rischio onesto è comportamentale: un drawdown del 45% mette alla prova la disciplina in modi che i fogli di calcolo non catturano.${NOTE}`,
  },
  {
    topicKey: 'dollar-cost-averaging',
    title: 'Che cos’è il piano di accumulo (PAC) — e quando ha senso?',
    question: 'Che cos’è il piano di accumulo, ed è meglio di un investimento in un’unica soluzione?',
    summary:
      'Il piano di accumulo investe un importo fisso a cadenza fissa, comprando più quote quando i prezzi sono bassi. Per chi risparmia dallo stipendio avviene in modo naturale; per una somma una tantum l’investimento in blocco di solito vince in matematica — il PAC vince sul piano comportamentale.',
    tags: ['finanza', 'investimenti', 'piano di accumulo', 'strategia'],
    language: 'it',
    image: {
      prompt: promptOf('dollar-cost-averaging'),
      alt: 'Gocce identiche che cadono a intervalli regolari in una pozza stabile',
    },
    sources: [
      { title: 'Wiki Bogleheads — Dollar cost averaging', url: 'https://www.bogleheads.org/wiki/Dollar_cost_averaging' },
      { title: 'Investor.gov (SEC) — nozioni di base sugli investimenti', url: 'https://www.investor.gov' },
    ],
    content: `# Che cos'è il piano di accumulo (PAC) — e quando ha senso?

Il piano di accumulo (in inglese dollar-cost averaging, DCA) significa investire lo stesso importo di denaro a intervalli regolari — diciamo 500 € il primo di ogni mese — indipendentemente da ciò che fa il mercato. L'importo fisso compra più quote quando i prezzi sono bassi e meno quando sono alti, ed elimina la peggiore domanda dell'investire ("è il momento giusto?") trasformando il timing in una non-decisione.

## L'aritmetica

Investi 300 € al mese in un fondo il cui prezzo oscilla:

| Mese | Prezzo | Quote acquistate |
| --- | --- | --- |
| Gen | 30 | 10,0 |
| Feb | 20 | 15,0 |
| Mar | 25 | 12,0 |
| Apr | 30 | 10,0 |

Hai speso 1.200 € per 47 quote — un costo medio di ~25,5 € a quota, *sotto* il prezzo medio semplice (26,25), perché il budget fisso ha automaticamente sovrappesato il mese a buon mercato. È questo il vantaggio meccanico: acquisto disciplinato dei ribassi senza prevedere nulla.

## Due situazioni molto diverse

**1. Investire dallo stipendio (la maggior parte delle persone).** Il PAC non è una scelta di strategia — è l'unica opzione, perché il denaro arriva mensilmente. Automatizzarlo è puro guadagno: nessuna decisione, nessuna esitazione durante i titoli spaventosi, decenni di disciplina forzata.

**2. Investire una somma una tantum (premio, eredità, vendita).** Qui *potresti* investirla tutta oggi o spalmarla su un anno. Matematicamente, l'investimento in blocco ha storicamente battuto la spalmatura circa due volte su tre, semplicemente perché i mercati salgono più spesso di quanto scendano e il PAC tiene il denaro a bordo campo. Ma il terzo delle volte in cui perde, perde nel momento psicologicamente peggiore — subito dopo che hai investito tutto.

| | In blocco | PAC su ~12 mesi |
| --- | --- | --- |
| Esito atteso | Più alto (più tempo nel mercato) | Leggermente più basso |
| Sensazione nel caso peggiore | Brutale (tutto dentro prima di un crollo) | Attutita |
| Rischio di non investire mai | Basso una volta fatto | "Mettere in pausa" a metà piano è comune |

La risposta pragmatica: se un mese cattivo ti farebbe abbandonare il piano o perdere il sonno, fai il PAC della somma su 6–12 mesi secondo un calendario scritto — un piccolo costo atteso per una grande garanzia comportamentale. Se davvero riesci a scrollarti di dosso la volatilità, investila e vai avanti.

## Dove il PAC fallisce in silenzio

Il PAC su una singola azione media il costo in qualcosa che potrebbe non riprendersi mai — il meccanismo "compra il ribasso" è utile solo quando l'asset è ampiamente diversificato e inclinato al rialzo nel lungo periodo. E interrompere i versamenti durante i crolli cancella tutto il senso: le quote a buon mercato sono proprio quelle che la strategia esiste per comprare.

## Domande frequenti

**Il PAC garantisce un profitto?**
No — modella *quando* compri, non se l'asset sale. Un asset in calo perde comunque denaro, solo da un costo medio più basso.

**Settimanale o mensile?**
Praticamente identici su archi di anni. Abbinalo allo stipendio e dimenticatene; la frequenza è discussione oziosa.

**Dovrei mettere in pausa il PAC quando i mercati sembrano cari?**
Quello è market timing travestito. Il valore della strategia è precisamente che ignora le tue sensazioni sulle valutazioni.${NOTE}`,
  },
  {
    topicKey: 'asset-allocation',
    title: 'Asset allocation e ribilanciamento, spiegati in modo semplice',
    question: 'Che cos’è l’asset allocation, e come funziona davvero il ribilanciamento?',
    summary:
      'L’asset allocation — la ripartizione tra azioni, obbligazioni e liquidità — determina gran parte del rischio e del comportamento di lungo periodo, molto più della scelta dei fondi. Il ribilanciamento riporta quella ripartizione sull’obiettivo, sfoltendo i vincitori e rimpinguando i perdenti.',
    tags: ['finanza', 'investimenti', 'asset allocation', 'portafoglio'],
    language: 'it',
    image: {
      prompt: promptOf('asset-allocation'),
      alt: 'Un grafico a torta luminoso in tre parti tenuto in equilibrio su una bilancia',
    },
    sources: [
      { title: 'Wiki Bogleheads — Asset allocation', url: 'https://www.bogleheads.org/wiki/Asset_allocation' },
      { title: 'Investor.gov (SEC) — nozioni di base sull’asset allocation', url: 'https://www.investor.gov' },
    ],
    content: `# Asset allocation e ribilanciamento, spiegati in modo semplice

L'asset allocation è la ripartizione percentuale del tuo portafoglio tra le classi di attività — tipicamente azioni per la crescita, obbligazioni per la stabilità, liquidità per l'immediatezza. È la singola decisione che domina il comportamento del tuo portafoglio: ricerche che risalgono a decenni fa attribuiscono la grande maggioranza della *variabilità* del rendimento di un portafoglio diversificato alla sua allocazione, non a quali fondi o azioni particolari riempiano i secchielli.

## Perché la ripartizione conta più delle scelte

Due investitori che detengono entrambi ottimi fondi a basso costo avranno esperienze del tutto diverse se uno è al 90% in azioni e l'altro al 30%. L'investitore 90/10 dovrebbe attendersi circa il doppio della crescita di lungo periodo — e drawdown vicini a −45% nei crolli peggiori. L'investitore 30/70 rinuncia a gran parte della crescita in cambio di ribassi che raramente superano −15%. Nessuno dei due sbaglia; rispondono a domande diverse: *quando serve il denaro, e cosa questa persona riesce a tenere senza farsi prendere dal panico?*

Una mappa approssimativa:

| Denaro necessario tra… | Forma di allocazione comune |
| --- | --- |
| < 3 anni | Per lo più liquidità e obbligazioni a breve |
| 3–10 anni | Bilanciata, es. 40–60% azioni |
| 10–30+ anni | A forte componente azionaria, es. 70–90% azioni |

Regole pratiche come "110 meno la tua età in azioni" sono punti di partenza grezzi — utili come àncora, non leggi. Contano sia la *capacità* di rischio (orizzonte temporale, stabilità del reddito) sia la *tolleranza* al rischio (ciò che riesci a sopportare dormendo), e dovrebbe vincere la più bassa delle due.

## Che cos'è il ribilanciamento

I mercati si muovono; la tua ripartizione va alla deriva. Dopo un ottimo anno azionario, un portafoglio 60/40 potrebbe ritrovarsi a 70/30 — silenziosamente più rischioso di quanto avevi scelto. Il ribilanciamento vende una parte di ciò che è cresciuto e compra ciò che è rimasto indietro, ripristinando l'obiettivo. È manutenzione del rischio, non inseguimento del rendimento: stai sistematicamente prendendo profitti dal lato caro e rimpinguando quello a buon mercato, a calendario, senza prevedere nulla.

Due trigger praticabili — scegline uno e automatizzalo:

- **Calendario**: una o due volte l'anno, sempre alla stessa data.
- **Soglia**: ribilancia quando un asset si discosta di più di ~5 punti percentuali dall'obiettivo.

Per chi versa con continuità, il metodo più economico è **ribilanciare con i versamenti**: indirizza il denaro nuovo verso ciò che è sotto obiettivo, evitando del tutto le vendite (e qualsiasi imposta o commissione).

## La disciplina che impone

Il superpotere silenzioso del ribilanciamento è comportamentale: ti costringe a comprare azioni dopo i crolli (quando il tuo obiettivo dice che sei sottopesato) e a sfoltirle dopo l'euforia — esattamente le operazioni a cui le emozioni resistono. Gli investitori che hanno ribilanciato attraverso il 2008–09 hanno comprato meccanicamente vicino al fondo senza bisogno di coraggio, solo di una regola.

## Domande frequenti

**Il ribilanciamento aumenta i rendimenti?**
A volte leggermente (tra asset con rendimenti simili), a volte costa un po' (sfoltire un lungo mercato rialzista). Il suo vero prodotto è mantenere il rischio al livello che hai scelto.

**Quanto precisi devono essere gli obiettivi?**
Numeri interi, bande larghe. 58/42 contro 60/40 è rumore; trasformare l'allocazione in continuo armeggio annulla il progetto.

**Dove rientrano altri asset — immobili, oro, cripto?**
Come fette deliberate e limitate (comunemente ≤5–10% ciascuna) aggiunte per diversificazione — dimensionate in modo che avere completamente torto su di esse non ti cambi la vita.${NOTE}`,
  },
  {
    topicKey: 'market-timing',
    title: 'Perché fare timing del mercato è così difficile (anche per i professionisti)',
    question: 'Perché il timing del mercato è considerato quasi impossibile, anche per i professionisti?',
    summary:
      'Il timing del mercato richiede di avere ragione due volte — vendere prima dei cali e comprare prima dei rialzi — contro prezzi che già incorporano le aspettative. Mancare anche solo la manciata di giorni migliori, che si addensano dentro i crolli, distrugge decenni di rendimenti.',
    tags: ['finanza', 'investimenti', 'market timing', 'comportamento'],
    language: 'it',
    image: {
      prompt: promptOf('market-timing'),
      alt: 'Frecce che provano e mancano di poco i picchi e gli avvallamenti di un’onda',
    },
    sources: [
      { title: 'SPIVA — pagelle su persistenza e gestione attiva', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Aswath Damodaran (NYU Stern) — dati e analisi di mercato', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Perché fare timing del mercato è così difficile (anche per i professionisti)

Il market timing — uscire prima dei cali e rientrare prima delle riprese — fallisce non perché le persone siano stupide, ma perché il gioco è strutturalmente truccato contro il giocatore. Devi avere ragione **due volte**, sul **quando**, contro **prezzi che già contengono il consenso**, mentre i giorni che pagano si nascondono **dentro le settimane più spaventose**. Ogni ostacolo da solo è difficile; moltiplicati insieme, spiegano perché le strategie di timing sembrano splendide nei racconti e povere nei risultati verificati.

## I quattro problemi strutturali

**1. Due chiamate corrette, errore che compone.** Uscire correttamente non vale nulla a meno che tu non rientri anche correttamente. Chi è accurato al 70% per chiamata — molto meglio di quanto l'evidenza sostenga — ha ragione sull'andata e ritorno solo ~49% delle volte, prima dei costi.

**2. I prezzi si muovono per primi.** I mercati guardano avanti: quando la recessione è al telegiornale, i prezzi sono caduti mesi fa; le riprese, allo stesso modo, iniziano tra titoli terribili, quando comprare sembra folle. Agire su ciò che sta visibilmente accadendo significa negoziare su informazioni già nel prezzo.

**3. I giorni migliori si addensano dentro i tratti peggiori.** Studi di lungo periodo mostrano ripetutamente che mancare solo i 10–20 singoli giorni migliori su *decenni* taglia drasticamente la ricchezza finale — comunemente della metà o più — e quei giorni avvengono in larga parte durante i crolli e i loro immediati rimbalzi, proprio quando chi fa timing è seduto sulla liquidità "in attesa di chiarezza".

**4. La frequenza di base punisce l'assenza.** Le azioni salgono nella maggior parte degli anni; la liquidità a bordo campo paga un costo opportunità per definizione. Chi fa timing non deve solo avere ragione — deve avere ragione di *più* della deriva al rialzo del mercato più imposte e costi di negoziazione.

## Che cosa mostra il curriculum dei professionisti

Decenni di pagelle SPIVA mostrano che la maggior parte dei fondi professionali — inclusi i fondi tattici e ad allocazione flessibile il cui intero mandato è il timing — restano indietro rispetto a semplici benchmark su finestre lunghe, e i pochi vincenti raramente si ripetono. Le previsioni raccolte su "dove sarà l'indice tra un anno" sbagliano di ampi margini regolarmente. È il fatto empirico più solido nell'investimento al dettaglio, ed è la ragione per cui domina il consiglio noioso.

## Che cosa funziona invece

Non la previsione — il *pre-impegno*:

| Invece di… | Fai… |
| --- | --- |
| "Uscirò prima del prossimo crollo" | Tieni un'allocazione il cui caso peggiore puoi sopravvivere |
| "Ricomprerò sul fondo" | Automatizza versamenti che comprano ogni mese, inclusi quelli terribili |
| "Liquidità finché le cose non sono più chiare" | Accetta che chiarezza e prezzi bassi non coesistono mai |
| Reagire ai titoli di giornale | Ribilanciare con regole di calendario/soglia |

Questo converte il timing da un problema di previsione (impossibile da vincere) a un problema di progettazione (molto vincibile).

## Domande frequenti

**"Comprare il ribasso" è market timing?**
Tenere liquidità *in attesa* dei ribassi lo è — e storicamente sottoperforma il semplice restare investiti. Impiegare denaro nuovo programmato durante i ribassi è solo disciplina di versamento.

**Non c'è chi ha previsto con precisione i grandi crolli?**
Qualcuno lo fa sempre — persone diverse ogni volta. Distinguere la lungimiranza da un grande campione di ipotesi rumorose è, a posteriori, quasi impossibile; scommettere i tuoi risparmi sul saperlo individuare in anticipo è il modo più difficile di imparare la statistica.

**Quindi i prezzi non sono mai prevedibili?**
Direzione di breve termine: in pratica no. I rendimenti attesi di lungo periodo si legano debolmente alle valutazioni — utili per impostare le aspettative, inutili come segnale di uscita.${NOTE}`,
  },
  {
    topicKey: 'etf-vs-mutual-fund',
    title: 'ETF vs fondo comune: quale involucro dovresti usare?',
    question: 'Qual è la differenza tra un ETF e un fondo comune, e quale dovrei scegliere?',
    summary:
      'ETF e fondi comuni sono due involucri dell’investimento collettivo e diversificato. Gli ETF si negoziano come azioni tutto il giorno, di norma a costi più bassi; i fondi comuni hanno un prezzo al giorno e automatizzano meglio i versamenti. Conta più la strategia interna dell’involucro.',
    tags: ['finanza', 'investimenti', 'etf', 'fondi'],
    language: 'it',
    image: {
      prompt: promptOf('etf-vs-mutual-fund'),
      alt: 'Un paniere di cubetti su un nastro veloce e uno pesato con calma su un piedistallo',
    },
    sources: [
      { title: 'Investor.gov (SEC) — Fondi comuni ed ETF', url: 'https://www.investor.gov' },
      { title: 'Morningstar — ricerca su fondi ed ETF', url: 'https://www.morningstar.com' },
    ],
    content: `# ETF vs fondo comune: quale involucro dovresti usare?

Un ETF (fondo negoziato in borsa) e un fondo comune possono detenere *esattamente lo stesso portafoglio* — lo stesso indice, le stesse azioni. La differenza è l'involucro: come compri, quando vengono fissati i prezzi, quanto costa e come si regolano le imposte. La scelta dell'involucro è una decisione logistica, non una decisione di strategia — e la logistica, comunque, conta lungo i decenni.

## Le differenze meccaniche

| | ETF | Fondo comune |
| --- | --- | --- |
| Negoziazione | Tutto il giorno in borsa, come un'azione | Una volta al giorno al NAV di chiusura |
| Importi minimi | Una quota (o una frazione, se il broker lo consente) | Spesso minimi fissi (variabile) |
| Costi tipici | Di solito le spese correnti più basse; paghi lo spread denaro-lettera quando negozi | Bassi per le versioni indicizzate; alcuni hanno commissioni di sottoscrizione/distribuzione — evitabili |
| Investimento automatico | Dipende dal broker, sempre più supportato | Nativo e fluido |
| Efficienza fiscale | La creazione/rimborso in natura di solito riduce al minimo le distribuzioni di plusvalenze | Più probabile la distribuzione di plusvalenze imponibili (dipende dalla giurisdizione) |
| Rischio comportamentale | La negoziabilità invita ad armeggiare | Il prezzo giornaliero scoraggia il trading intraday |

## Quando ciascun involucro si adatta meglio

**Gli ETF brillano quando** vuoi le commissioni correnti più basse, investi tramite un broker moderno, ti interessa il controllo infragiornaliero o la trasparenza delle posizioni, o (in alcune giurisdizioni, in particolare gli USA) vuoi meno distribuzioni imponibili a sorpresa in un conto tassabile.

**I fondi comuni brillano quando** la priorità è l'automazione senza attriti — importi mensili fissi, acquisti per importo esatto, reinvestimento dei dividendi, piani previdenziali collegati alla busta paga — dove "imposta e non guardare mai" è tutto il senso, e dove le versioni indicizzate costano essenzialmente come gli ETF equivalenti.

## Le trappole da evitare davvero

Il dibattito sull'involucro distrae dagli scenari di fallimento che costano davvero denaro:

- **Fondi ad alta commissione in entrambi gli involucri** — spese correnti dell'1%+ per un'esposizione tipo indice sono ciò da cui fuggire, non l'involucro.
- **Commissioni di sottoscrizione e retrocessioni** su alcuni fondi comuni — mai vale la pena pagarle per un'esposizione di base.
- **Tentazione di negoziare con gli ETF** — la possibilità di vendere alle 10:43 durante un titolo spaventoso è una funzione per i trader e un difetto per i risparmiatori.
- **ETF di nicchia poco scambiati** — gli ampi spread tassano silenziosamente ogni operazione; i fondi mainstream ad ampia base non hanno questo problema.

## Domande frequenti

**Uno è più sicuro dell'altro?**
Posizioni identiche comportano rischio di mercato identico. Entrambi gli involucri sono fortemente regolamentati; nessuno dei due ti protegge dalla caduta del mercato.

**Perché gli ETF di solito vincono sulle imposte negli USA?**
La creazione/rimborso delle loro quote avviene "in natura" con i market maker, permettendo al fondo di liberarsi di posizioni apprezzate senza venderle — così meno distribuzioni di plusvalenze colpiscono i detentori. Il vantaggio si riduce nei conti fiscalmente protetti e differisce da paese a paese.

**Posso scegliere solo in base alle spese correnti?**
Quasi: stesso indice, poi il costo complessivo più basso (spese correnti + spread tipico), poi l'involucro che il tuo flusso di versamenti automatizza meglio. Strategia, tasso di risparmio e allocazione fanno comunque impallidire tutto questo.${NOTE}`,
  },
  {
    topicKey: 'risk-and-return',
    title: 'Rischio e rendimento: lo scambio dietro ogni investimento',
    question: 'Come sono legati rischio e rendimento, e cosa significa davvero "più rischio, più rendimento"?',
    summary:
      '"Più rischio, più rendimento" significa davvero un rendimento *atteso* più alto come pagamento per accettare esiti più ampi — inclusi quelli cattivi. Capire volatilità, drawdown e il pranzo gratis della diversificazione trasforma il luogo comune in uno strumento utilizzabile.',
    tags: ['finanza', 'investimenti', 'rischio', 'fondamentali'],
    language: 'it',
    image: {
      prompt: promptOf('risk-and-return'),
      alt: 'Una sfera brillante e volatile e una sfera calma in equilibrio su un’altalena',
    },
    sources: [
      { title: 'Investor.gov (SEC) — nozioni di base sul rischio', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) — premi al rischio e rendimenti', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Rischio e rendimento: lo scambio dietro ogni investimento

"Più rischio, più rendimento" è la frase più male citata della finanza. La versione accurata: gli investimenti con intervalli di esiti più ampi e spaventosi devono offrire rendimenti **attesi** più alti, altrimenti nessuno li terrebbe. Il rendimento extra è *compenso*, pagato in media e nel tempo — non una ricompensa consegnata a ogni temerario. Moltissimi rischi non pagano nulla; l'abilità sta nel sapere quali rischi portano un premio.

## Che cosa significa davvero "rischio" qui

Diverse cose distinte viaggiano sotto una sola parola:

- **Volatilità** — quanto il valore rimbalza di anno in anno. Fastidiosa, sopravvivibile.
- **Drawdown** — la perdita dal picco al minimo. I mercati azionari ad ampia base sono ripetutamente caduti del 30–50%; non è uno scenario di coda, è il prezzo del biglietto.
- **Perdita permanente** — l'unica fatale: un'azienda che fallisce, una scommessa concentrata che implode, o *tu* che vendi sul fondo trasformando un drawdown temporaneo in una perdita permanente.
- **Rischio di insufficienza** — quello silenzioso: investire in modo così prudente che il denaro non cresce abbastanza per il suo scopo. Le scelte "sicure" ne contengono in abbondanza.

La volatilità di un portafoglio azionario diversificato è per lo più temporanea; il crollo di una singola azione è spesso permanente. Stessa classe di attività, rischio profondamente diverso.

## Quali rischi pagano un premio — e quali no

| Rischio | Compensato? | Perché |
| --- | --- | --- |
| Rischio del mercato azionario ad ampia base | Sì — il premio azionario | Non si può diversificare via; qualcuno deve sopportarlo |
| Prestare più a lungo / a debitori più deboli | Sì — premi di durata e di credito | Reale possibilità di perdita/erosione |
| Detenere una sola azione invece di molte | **No** | Diversificabile — il mercato non ti paga per rischi che potresti rimuovere gratis |
| Speculazione tipo lotteria | Negativo in media | Paghi per il sogno |

È la riga più preziosa della tabella: **la diversificazione rimuove a costo zero il rischio non compensato** — la cosa più vicina a un pranzo gratis in finanza. La concentrazione è razionale solo quando hai un vero vantaggio o una convinzione da insider; altrimenti è rischio non pagato.

## Abbinare il rischio allo scopo

La capacità di rischio è fissata dal *tempo*: il denaro che serve l'anno prossimo non può cavalcare un ribasso del 40%; il denaro che serve nel 2050 può ignorarne una dozzina. La tolleranza al rischio è fissata dal *temperamento*: l'allocazione che abbandoni nel panico non è mai stata giusta, qualunque cosa dicesse il foglio di calcolo. Regola pratica — prenditi il massimo rischio *utile* con il denaro a lungo orizzonte, e nessun rischio per cui non vieni pagato, a qualsiasi orizzonte.

## Domande frequenti

**Se le azioni sono più rischiose, perché i consulenti mettono i pensionati in qualche azione?**
Perché la pensione dura decenni e anche l'inflazione è un rischio. Una fetta azionaria da piccola a moderata combatte il rischio di insufficienza mentre le obbligazioni gestiscono gli anni vicini.

**La volatilità è la misura giusta del rischio?**
È l'approssimazione misurabile, non la verità. Per un investitore di lungo periodo, i veri rischi sono la perdita permanente e il non raggiungere l'obiettivo — la volatilità conta solo quando ti costringe o ti spaventa al punto di vendere.

**Posso ottenere rendimenti alti con rischio basso?**
Chiunque offra quella combinazione si sbaglia o sta vendendo qualcosa. Le reali opportunità a basso rischio e alto rendimento vengono arbitrate via in pochi minuti — non arrivano alle brochure per il dettaglio.${NOTE}`,
  },
  {
    topicKey: 'credit-card-interest',
    title: 'Come funzionano davvero gli interessi della carta di credito (e perché fanno valanga)',
    question: 'Come funzionano davvero gli interessi della carta di credito, e perché il debito cresce così in fretta?',
    summary:
      'Le carte di credito applicano tra i tassi più alti della finanza tradizionale — spesso il 15–25% di TAEG, con capitalizzazione giornaliera quando porti un saldo. I pagamenti minimi sono progettati per diluire il debito per anni; capire i meccanismi è la via di fuga.',
    tags: ['finanza', 'carte di credito', 'debito', 'interessi'],
    language: 'it',
    image: {
      prompt: promptOf('credit-card-interest'),
      alt: 'Una spirale di gradini di debito che sale da una carta mentre una palla di neve cresce',
    },
    sources: [
      { title: 'Consumer Financial Protection Bureau — risorse sulle carte di credito', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# Come funzionano davvero gli interessi della carta di credito (e perché fanno valanga)

Una carta di credito è due prodotti in una sola busta: uno strumento di pagamento meraviglioso se saldi il conto ogni mese, e uno dei prestiti più costosi della finanza tradizionale se non lo fai — comunemente il 15–25% di TAEG, con interessi che compongono. L'effetto valanga non è una metafora; è l'aritmetica di tassi alti applicati ogni giorno a un saldo che i pagamenti minimi intaccano appena.

## I meccanismi, passo dopo passo

- **Il periodo di grazia.** Paga l'*intero saldo dell'estratto conto* entro la scadenza e gli acquisti non ti costano interessi. È l'unica modalità in cui una carta è gestione del denaro a costo zero.
- **Perderlo.** Porta un qualsiasi saldo oltre la scadenza e gli interessi di norma si applicano agli acquisti dal primo giorno in poi — il periodo di grazia sparisce finché non azzeri di nuovo del tutto il saldo.
- **Capitalizzazione giornaliera.** La maggior parte delle carte calcola gli interessi ogni giorno: un TAEG del 20% è ~0,0548% al giorno applicato al saldo medio giornaliero. Gli interessi maturano sugli interessi già maturati — la capitalizzazione che lavora contro di te a un ritmo che le azioni possono solo sognare.
- **La trappola del pagamento minimo.** I minimi sono comunemente ~1–3% del saldo. Su 5.000 € al 20% di TAEG, gli interessi del solo primo anno sono circa 1.000 € — un minimo del 2% (100 €/mese) supera a malapena gli interessi, allungando il rimborso verso un decennio e moltiplicando il costo reale di qualunque cosa tu abbia comprato.

## Perché questo debito viene prima di quasi tutto

Estinguere un saldo al 20% di TAEG è, senza rischio, un "rendimento del 20%" — migliore di quanto qualsiasi investimento legittimo offra in modo affidabile. La gerarchia pratica è netta:

| Denaro disponibile | Uso migliore, di solito |
| --- | --- |
| Debito da carta al 15–25% | Aggrediscilo prima di investire oltre l'eventuale contributo del datore di lavoro |
| Scegliere quale carta pagare per prima | Prima il TAEG più alto ("valanga") — matematicamente ottimale |
| La motivazione è il collo di bottiglia | Prima il saldo più piccolo ("palla di neve") — psicologicamente più tenace |

Entrambi gli ordini battono il "minimo ovunque" di anni e migliaia di euro.

## Uscirne, in concreto

Smetti di aggiungere (sposta la spesa quotidiana sul bancomat mentre aggredisci il saldo); paga un importo *fisso* e aggressivo invece del minimo che si rimpicciolisce; valuta un trasferimento del saldo su una carta promozionale allo 0% *solo* con un piano scritto per azzerarlo entro la finestra promozionale (commissioni di trasferimento ~3–5%, e i tassi post-promo tornano brutali); e tratta il consolidamento con un prestito personale come riduzione del tasso, non come assoluzione — lo schema di spesa che ha costruito il saldo deve finire, altrimenti si ricostruisce.

## Domande frequenti

**Pagare il minimo protegge il mio punteggio di credito?**
Evita i segni di ritardo, sì — ma un utilizzo elevato (saldo ÷ limite) trascina comunque il punteggio. Sia per il punteggio sia per il portafoglio, la risposta è la stessa: abbassa il saldo.

**Vale la pena tenere un piccolo saldo "per il mio punteggio di credito"?**
Un mito persistente. Pagare per intero costruisce la stessa storia di pagamenti e costa zero interessi; portare un saldo arricchisce solo l'emittente.

**Gli anticipi di contante hanno lo stesso tasso?**
Di solito peggiore: TAEG più alto, una commissione iniziale e **nessun periodo di grazia** — gli interessi partono nel momento in cui il contante esce dallo sportello. Sono il pulsante più costoso della carta.${NOTE}`,
  },
  {
    topicKey: 'retirement-start-early',
    title: 'Perché iniziare presto a risparmiare per la pensione batte risparmiare di più più tardi',
    question: 'Quanto presto dovrei iniziare a risparmiare per la pensione, e quanta differenza fa l’età d’inizio?',
    summary:
      'Grazie alla capitalizzazione composta, ogni decennio di ritardo raddoppia all’incirca il risparmio mensile necessario per lo stesso montante pensionistico. Iniziare a 25 anni invece che a 35 — stesso importo mensile — può chiudere con circa il doppio del denaro.',
    tags: ['finanza', 'pensione', 'risparmio', 'interesse composto'],
    language: 'it',
    image: {
      prompt: promptOf('retirement-start-early'),
      alt: 'Un filo che parte presto si gonfia in un fiume accanto a un rivolo tardivo e stretto',
    },
    sources: [
      { title: 'Investor.gov (SEC) — Calcolatore dell’interesse composto', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Wiki Bogleheads — punti di partenza per la pianificazione pensionistica', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Perché iniziare presto a risparmiare per la pensione batte risparmiare di più più tardi

Il risparmio per la pensione ha una variabile predominante, e non è il reddito, la scelta dei fondi o nemmeno il tasso di risparmio — è **per quanti anni il denaro compone**. Ogni decennio di ritardo raddoppia all'incirca ciò che devi risparmiare ogni mese per arrivare allo stesso punto. I primi anni sembrano inutili (i saldi sono piccoli, la crescita invisibile) e sono matematicamente gli anni più preziosi che avrai mai.

## La doppia linea temporale

Stessi 500 €/mese, stesso rendimento medio annuo del 7%, pensione a 65 anni:

| Età d'inizio | Anni investiti | Totale versato | Montante finale (circa) |
| --- | --- | --- | --- |
| 25 | 40 | 240.000 | ~1.310.000 |
| 35 | 30 | 180.000 | ~610.000 |
| 45 | 20 | 120.000 | ~260.000 |

Il venticinquenne versa solo 60.000 € in più del trentacinquenne e finisce con circa **700.000 € in più**. Ribaltalo: per eguagliare il montante di chi è partito presto, il trentacinquenne deve risparmiare circa 1.100 €/mese, e il quarantacinquenne circa 2.500 — il costo del ritardo, fatturato mensilmente.

## Perché il denaro iniziale è speciale

Un versamento fatto a 25 anni compone per 40 anni — al 7% si moltiplica per ~15. Lo stesso versamento a 55 si moltiplica per ~2. Il tuo ultimo decennio prima della pensione di solito *guadagna* più di quanto tu *versi* in quegli anni, ma solo se i decenni precedenti hanno costruito la base da cui cresce. La capitalizzazione composta è una palla di neve: la prima spinta è quella che conta di più.

## Iniziare in modo imperfetto batte iniziare più tardi

L'ordine delle operazioni che serve la maggior parte delle persone:

1. **Cattura per intero l'eventuale contributo del datore di lavoro** — è un rendimento istantaneo del 50–100%; nessun investimento gli compete.
2. **Automatizza una percentuale, non un importo** — anche il 5–10% del reddito a 25 anni supera il 20% a 40. Aumentala di un punto a ogni aumento di stipendio.
3. **Imposta come default fondi indicizzati ampi e a basso costo** dentro il conto fiscalmente agevolato che il tuo paese offre — decenni di orizzonte sono esattamente ciò per cui esistono le allocazioni a forte componente azionaria.
4. **Non aspettare il "momento giusto"** — per un orizzonte di 40 anni, ogni punto di partenza storico, inclusa la vigilia dei crolli, ha battuto l'attesa di anni in cerca di chiarezza.

## Se stai iniziando tardi

La matematica è più dura, non senza speranza: il tasso di risparmio diventa la leva (la capitalizzazione ha meno pista, quindi i versamenti portano più del carico), lavorare anche solo 2–3 anni in più aiuta doppiamente (più versamenti, meno anni di prelievo), e la peggiore reazione è puntare su investimenti da quote-lotteria per "recuperare" — il rischio di sequenza punisce esattamente questo.

## Domande frequenti

**Dovrei risparmiare per la pensione mentre estinguo i debiti?**
Cattura il contributo del datore di lavoro anche allora (rende più di qualsiasi tasso d'interesse normale); oltre il contributo, il debito ad alto TAEG di solito merita priorità, quello a basso tasso di solito no.

**Il 7% è un'ipotesi sicura?**
È una media storica di lungo periodo di un indice azionario, non una garanzia — i piani seri dovrebbero testare anche il 4–6%. Nota che la conclusione non cambia: ogni tasso ipotizzato premia chi inizia presto.

**Quanto mi servirà in totale?**
Un'àncora di pianificazione grossolana: spesa annua × 25 (la "regola del 4%" rovesciata) — affinata in seguito dal panorama pensionistico del tuo paese. Il numero conta meno a 25 anni dell'abitudine; la precisione può aspettare, la capitalizzazione no.${NOTE}`,
  },
];
