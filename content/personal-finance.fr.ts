import type { DraftArticle } from './types';
import { personalFinanceEn } from './personal-finance.en';

// Batch : Personal Finance (version française native). Mêmes titres et mêmes
// topicKey que personal-finance.en.ts ; le corps est rédigé pour un lectorat
// francophone (exemples chiffrés en euros, concepts institutionnels gardés
// génériques, sans lier la fiscalité ou les comptes retraite à un seul pays).
// Les images d’en-tête sont réutilisées par topicKey, sans coût de génération.

const promptOf = (key: string): string => {
  const hit = personalFinanceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

const NOTE =
  '\n\n*Cet article relève de l’éducation financière générale et ne constitue pas un conseil en investissement personnalisé.*';

export const personalFinanceFr: DraftArticle[] = [
  {
    topicKey: 'compound-interest',
    title: 'Comment fonctionnent vraiment les intérêts composés',
    question: 'Comment fonctionnent les intérêts composés, et pourquoi les dit-on si puissants ?',
    summary:
      'Les intérêts composés versent des gains sur vos gains : la richesse croît de façon exponentielle, pas linéaire. Le temps compte plus que le taux — la courbe est plate des années, puis s’envole. D’où l’avantage de commencer tôt.',
    tags: ['finance', 'investissement', 'intérêts composés', 'épargne'],
    language: 'fr',
    image: {
      prompt: promptOf('compound-interest'),
      alt: 'Une graine de lumière devenant un arbre aux branches exponentielles',
    },
    sources: [
      { title: 'Investor.gov (SEC) — Compound Interest Calculator', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Bogleheads wiki — Investment philosophy and core concepts', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Comment fonctionnent vraiment les intérêts composés

Les intérêts composés signifient que vous gagnez non seulement sur l’argent que vous placez, mais aussi sur les gains qu’il a déjà produits. L’intérêt simple progresse en ligne droite ; l’intérêt composé suit une courbe qui démarre plate et finit raide. L’essentiel de la magie se produit dans les dernières années — c’est pourquoi le moment où vous commencez compte plus que presque tout le reste.

## Le mécanisme en un exemple

Placez 10 000 dans un placement qui rapporte 7 % par an :

- **Année 1** : vous gagnez 700 (sur vos 10 000).
- **Année 2** : vous gagnez 749 — 700 sur le capital initial plus 49 sur le gain de l’an dernier.
- **Année 10** : le capital atteint environ 19 700 ; cette seule année rapporte ~1 290.
- **Année 30** : le capital atteint environ 76 000 ; une seule année rapporte désormais ~5 000 — la moitié de votre mise de départ, chaque année, sans rien faire.

La formule est A = P × (1 + r)^t, mais l’intuition est plus simple : la croissance se nourrit de la croissance passée, donc les gains accélèrent.

## La règle de 72

Divisez 72 par votre rendement annuel pour estimer le nombre d’années nécessaires au doublement de l’argent :

| Rendement annuel | Double environ tous les |
| --- | --- |
| 3 % | 24 ans |
| 6 % | 12 ans |
| 7 % | ~10 ans |
| 10 % | ~7 ans |

Les doublements s’empilent : à 7 %, trente ans font environ trois doublements — 1× devient ~8×. La même arithmétique joue aussi contre vous : une dette à 18 % double en environ quatre ans, et une inflation de 3 % réduit de moitié le pouvoir d’achat en environ 24.

## Pourquoi le temps bat le taux

En versant 500 par mois à 7 % :

- Sur **30 ans** : ~610 000 (180 000 versés).
- Sur **40 ans** : ~1 310 000 (240 000 versés).

Dix années précoces de plus — seulement 60 000 de versements supplémentaires — ajoutent environ 700 000, car l’argent le plus ancien capitalise le plus longtemps. Courir après un point de rendement supplémentaire est bien moins fiable que d’acheter des années en commençant maintenant.

## Ce qui capitalise dans la vraie vie

Les comptes d’épargne capitalisent littéralement ; les portefeuilles d’actions capitalisent statistiquement (les rendements varient d’une année à l’autre, mais les gains réinvestis se cumulent) ; les dividendes capitalisent lorsqu’ils sont réinvestis. Les frais capitalisent aussi, à l’envers : 1 % de frais annuels sur un rendement brut de 7 % consomme environ un quart de votre richesse finale sur 40 ans.

## FAQ

**La fréquence de capitalisation (quotidienne ou mensuelle) change-t-elle beaucoup ?**
Bien moins qu’on ne le croit — à 5 %, capitaliser chaque jour plutôt qu’une fois par an ne change le rendement effectif que d’environ 0,13 point. Le taux et le temps dominent.

**D’où vient ce fameux 7 % souvent cité ?**
C’est approximativement le rendement réel (corrigé de l’inflation) de long terme des grands indices d’actions américains, historiquement. C’est une moyenne sur des années très chahutées, pas une promesse.

**Les intérêts composés sont-ils vraiment « la huitième merveille du monde » (Einstein) ?**
La citation est presque certainement apocryphe — les maths se suffisent à elles-mêmes, sans caution de célébrité.${NOTE}`,
  },
  {
    topicKey: 'index-funds',
    title: 'Qu’est-ce qu’un fonds indiciel — et pourquoi les experts le recommandent-ils sans cesse ?',
    question: 'Qu’est-ce qu’un fonds indiciel, et pourquoi est-il si souvent recommandé aux particuliers ?',
    summary:
      'Un fonds indiciel achète automatiquement toutes les actions d’un indice, avec des frais quasi nuls. Des décennies de données montrent que la grande majorité des gérants professionnels échouent à le battre sur le long terme — c’est tout l’argument.',
    tags: ['finance', 'investissement', 'fonds indiciels', 'gestion passive'],
    language: 'fr',
    image: {
      prompt: promptOf('index-funds'),
      alt: 'Des centaines de petits cubes lumineux portés comme un seul panier',
    },
    sources: [
      { title: 'SPIVA — S&P Indices vs Active scorecards', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Bogleheads wiki — Three-fund portfolio', url: 'https://www.bogleheads.org/wiki/Three-fund_portfolio' },
      { title: 'Investor.gov (SEC) — Mutual funds and ETFs basics', url: 'https://www.investor.gov' },
    ],
    content: `# Qu’est-ce qu’un fonds indiciel — et pourquoi les experts le recommandent-ils sans cesse ?

Un fonds indiciel est un fonds qui ne cherche pas à choisir les gagnants. Il achète simplement tous les titres d’un indice de marché — les ~500 sociétés du S&P 500, ou des milliers d’actions dans un indice marché total — en proportion de leur taille, et les conserve. Pas d’analystes, pas de prévisions, pas de salle des marchés à rémunérer. Cela ressemble à un renoncement ; les données disent l’inverse.

## L’argument en trois faits

**1. Les marchés sont difficiles à battre.** Les bilans SPIVA, publiés depuis plus de vingt ans, constatent à répétition que sur des fenêtres de 15 ans, la grande majorité — souvent 80 à 90 % — des fonds gérés activement sous-performent leur indice de référence sur les grands marchés. Des professionnels avec des équipes à plein temps, en moyenne, ne parviennent pas à mieux choisir que l’indice auquel on les compare.

**2. On ne peut pas connaître les gagnants à l’avance.** Certains fonds battent bien le marché — mais les gagnants persistent rarement, et la performance passée est un sélecteur notoirement médiocre. Choisir le gérant gagnant de la prochaine décennie est le même problème que choisir l’action gagnante de la prochaine décennie, un étage plus haut.

**3. Les coûts capitalisent contre vous.** Les fonds indiciels facturent des frais aussi bas que 0,03 à 0,2 % par an ; les fonds actifs facturent couramment 0,5 à 1,5 % plus des coûts de transaction internes plus élevés. Un frein de 1 % par an, capitalisé sur 40 ans, consomme environ un quart de la richesse finale. Le fonds indiciel gagne en partie en refusant simplement de dépenser votre argent.

## Ce que vous obtenez réellement

| Propriété | Fonds indiciel | Fonds actif typique |
| --- | --- | --- |
| Objectif | Suivre le marché | Battre le marché |
| Frais annuels | ~0,03 à 0,2 % | ~0,5 à 1,5 %+ |
| Diversification | Des centaines à des milliers de lignes | Les choix du gérant |
| Risque lié à l’homme clé | Aucun | Le départ du gérant compte |
| Prévisibilité | Vous touchez le rendement du marché, à ~rien près | Forte dispersion autour de l’indice |

Le cadrage honnête : un fonds indiciel vous garantit de ne jamais battre le marché — et en échange, vous rend statistiquement très susceptible de battre la plupart de ceux qui essaient.

## Ce que les fonds indiciels ne corrigent pas

Ils n’éliminent pas le risque de marché : un fonds marché total a chuté d’environ moitié en 2008-09 et s’est redressé avec le marché. Ils ne choisissent pas votre allocation d’actifs — la part d’actions par rapport aux obligations reste votre décision (et compte plus que le choix du fonds). Et un indice étroit (un secteur, un thème) n’est pas une diversification ; la recommandation porte sur les indices larges.

## FAQ

**Si tout le monde indexait, les marchés ne casseraient-ils pas ?**
À un extrême théorique, la formation des prix s’affaiblirait — mais le trading actif domine encore le volume quotidien, et toute inefficience laissée attirerait de nouveau les sélectionneurs d’actions. Nous sommes très loin de cette limite.

**Fonds indiciel ou ETF ?**
Les deux peuvent suivre le même indice ; la différence est l’enveloppe de négociation. Pour un épargnant de long terme, l’un ou l’autre convient — les frais et l’indice suivi comptent davantage.

**Les fonds indiciels, est-ce « se contenter de la moyenne » ?**
Ils se contentent du rendement *du marché*, qui après frais a historiquement dépassé les résultats de la plupart des professionnels. Un prix moyen, un résultat au-dessus de la moyenne.${NOTE}`,
  },
  {
    topicKey: 'inflation-purchasing-power',
    title: 'Comment l’inflation érode discrètement votre pouvoir d’achat',
    question: 'Comment l’inflation érode-t-elle vraiment l’épargne et le pouvoir d’achat au fil du temps ?',
    summary:
      'L’inflation est un impôt à effet composé sur l’argent dormant : à 3 % par an, la monnaie perd la moitié de son pouvoir d’achat en environ 24 ans. Comprendre le rendement réel (après inflation) sépare l’épargne de la préservation du patrimoine.',
    tags: ['finance', 'inflation', 'économie', 'épargne'],
    language: 'fr',
    image: {
      prompt: promptOf('inflation-purchasing-power'),
      alt: 'Une pièce rétrécissant dans un sablier tandis que les objets grandissent',
    },
    sources: [
      { title: 'US Bureau of Labor Statistics — Consumer Price Index', url: 'https://www.bls.gov/cpi/' },
      { title: 'FRED (St. Louis Fed) — inflation data series', url: 'https://fred.stlouisfed.org' },
    ],
    content: `# Comment l’inflation érode discrètement votre pouvoir d’achat

L’inflation est le rythme auquel les prix montent en général — autrement dit, le rythme auquel chaque unité de monnaie achète moins. Elle agit exactement comme les intérêts composés, mais contre vous : de petits pourcentages annuels, capitalisant en silence, jusqu’à ce que l’effet cumulé devienne énorme. L’argent caché sous un matelas n’est pas « en sécurité » ; il est garanti de rétrécir.

## L’arithmétique composée de la perte

En utilisant la règle de 72 à l’envers — 72 divisé par le taux d’inflation donne le nombre d’années pour que le pouvoir d’achat soit réduit de moitié :

| Inflation moyenne | La monnaie perd la moitié en |
| --- | --- |
| 2 % | ~36 ans |
| 3 % | ~24 ans |
| 5 % | ~14 ans |
| 8 % | ~9 ans |

À un modeste 3 %, les 100 de votre tiroir deviennent, en pouvoir d’achat, environ 74 après dix ans, 55 après vingt, et 48 après vingt-quatre. Rien n’a été volé ; tout est simplement devenu plus cher.

## Nominal et réel : la seule distinction qui compte

Un compte d’épargne rapportant 2 % alors que l’inflation tourne à 3 % a un **rendement réel d’environ −1 %** — vous perdez du pouvoir d’achat pendant que le solde grossit. Soustrayez toujours l’inflation :

rendement réel ≈ rendement nominal − taux d’inflation

Cette seule soustraction recadre la plupart des décisions financières. « Mon dépôt rapporte 4 % » ne veut rien dire tant que vous ne savez pas si les prix montent de 2 % ou de 6 %. Historiquement, les indices d’actions larges ont livré des rendements réels positifs sur le long terme (environ 6 à 7 % réels aux États-Unis sur de très longues fenêtres), tandis que les liquidités et dépôts à court terme ont stagné près de zéro en réel — parfois en dessous.

## Qui l’inflation pénalise, et qui elle aide

- **Pénalise** : les détenteurs de liquidités et de revenus fixes — épargnants sur des comptes peu rémunérés, retraités à pension fixe, prêteurs ayant bloqué des taux bas.
- **Aide** : les emprunteurs à taux fixe (qui remboursent avec une monnaie moins chère), et les détenteurs d’actifs réels — entreprises, immobilier, actions — dont les prix et les bénéfices tendent à monter avec le niveau des prix au fil du temps.

Cette asymétrie explique pourquoi « garder une épargne de plusieurs décennies entièrement en liquidités » est, historiquement, l’une des stratégies les plus fiablement perdantes, malgré sa sensation de sécurité.

## L’inflation mesurée et votre inflation

L’indice officiel des prix suit un panier moyen national. Votre taux personnel diffère selon votre vie : locataires dans des villes tendues, parents payant des frais de scolarité, voyageurs fréquents peuvent connaître une inflation bien supérieure au chiffre affiché ; un propriétaire installé peut en connaître moins. Jugez vos finances à l’aune de votre panier, pas seulement du chiffre médiatisé.

## FAQ

**Un peu d’inflation, est-ce bon ?**
La plupart des banques centrales visent ~2 % délibérément — une inflation modérée lubrifie les ajustements de salaires et décourage la thésaurisation, tandis que la déflation (baisse des prix) tend à accompagner la stagnation économique et alourdit les dettes.

**L’inflation signifie-t-elle que je dois éviter toute liquidité ?**
Non — le rôle d’un fonds d’urgence est la disponibilité, pas la croissance, et son coût en inflation est la prime que vous payez pour la sécurité. L’erreur est de garder en liquidités de l’argent dont l’horizon se compte *en décennies*.

**Qu’est-ce qui protège contre l’inflation ?**
Sur le long terme : les actifs productifs (actions larges, immobilier) et les obligations indexées sur l’inflation. Sur le court terme, rien n’est parfait — d’où l’importance d’ajuster les actifs à l’horizon de temps.${NOTE}`,
  },
  {
    topicKey: 'emergency-fund',
    title: 'Quelle taille pour votre fonds d’urgence ?',
    question: 'Combien de mois de dépenses garder dans un fonds d’urgence, et où le placer ?',
    summary:
      'La réponse standard : 3 à 6 mois de dépenses essentielles, instantanément accessibles et sans risque — davantage si vos revenus sont irréguliers. Son rôle est l’assurance, pas le rendement : empêcher la malchance de devenir une dette.',
    tags: ['finance', 'épargne', 'fonds d’urgence', 'budget'],
    language: 'fr',
    image: {
      prompt: promptOf('emergency-fund'),
      alt: 'Une sphère sur un coussin dans un coffre de verre déviant des éclats',
    },
    sources: [
      { title: 'Consumer Financial Protection Bureau — emergency savings guides', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# Quelle taille pour votre fonds d’urgence ?

Un fonds d’urgence est de l’argent dont le seul rôle est d’absorber les chocs — perte d’emploi, frais médicaux, la voiture qui rend l’âme la même semaine que le chauffe-eau. La recommandation standard est de **3 à 6 mois de dépenses essentielles**, placés quelque part d’ennuyeux, liquide et sans risque. Il rapporte peu par conception : vous achetez une assurance, et le rendement abandonné est la prime.

## Le dimensionner honnêtement

Comptez les dépenses mensuelles *essentielles* — logement, alimentation, charges, assurances, transport, paiements minimaux des dettes — pas tout votre train de vie. Puis ajustez selon la fragilité de vos revenus :

| Situation | Cible raisonnable |
| --- | --- |
| Deux salaires stables dans le foyer | 3 mois d’essentiels |
| Un seul salaire stable | 4 à 6 mois |
| Revenus freelance / à la commission / saisonniers | 6 à 12 mois |
| Revenu unique + personnes à charge + marché de l’emploi tendu | vers 12 mois |
| Risque connu imminent (plan social annoncé, fin de contrat) | autant que possible, dès maintenant |

Le principe : le fonds couvre l’écart réaliste entre la perte d’un revenu et son remplacement, plus les chocs de l’ampleur d’une franchise rencontrés en chemin.

## Où le garder

Trois exigences : **disponible en jours, pas en semaines ; aucune perte de valeur nominale ; séparé de l’argent du quotidien.** Cela désigne les comptes d’épargne bien rémunérés, les fonds monétaires ou les dépôts à court terme à accès sans pénalité. Cela exclut les actions (qui peuvent être en baisse de 30 % le mois où vous en avez besoin), les blocages longs, et tout ce que vous hésiteriez à vendre. Le placer dans une autre banque que votre compte courant ajoute une friction utile contre la tentation d’y « emprunter ».

## Pourquoi ne pas l’investir plutôt ?

Parce que les urgences sont corrélées aux récessions. Le scénario d’échec classique : la récession frappe, vous perdez votre emploi *et* la Bourse a chuté de 35 %, si bien que votre « fonds d’urgence en fonds indiciels » paie exactement quand il est au plus bas. La valeur du fonds tient à son absence de corrélation avec votre chance. Oui, l’inflation le grignote — c’est le coût de l’assurance, et c’est moins cher que de liquider des placements au plancher ou de porter une dette de carte de crédit à 20 % de TAEG.

## Le constituer à partir de zéro

Une séquence utile : prendre d’abord un mois d’avance (cela supprime l’essentiel du stress du « fin de mois à zéro »), puis bâtir vers trois mois tout en payant au moins les minimums sur toutes les dettes, puis réexaminer si la dette à taux élevé ou le reste du fonds mérite la priorité — mathématiquement, rembourser une carte à 20 % de TAEG est un « rendement » imbattable, donc beaucoup s’arrêtent à un mois, soldent la dette toxique, puis finissent le fonds.

## FAQ

**Une carte de crédit est-elle un fonds d’urgence acceptable ?**
C’est un *pont* d’urgence, pas un fonds — utile pour les 48 heures avant qu’un virement d’épargne arrive, désastreux comme plan, puisque les urgences qui comptent le plus (la perte d’emploi) sont précisément le moment où porter une dette à 20 % de TAEG fait le plus mal.

**Le fonds doit-il grandir avec mes revenus ?**
Il doit grandir avec vos *dépenses et obligations*. Une augmentation que vous épargnez n’exige pas un fonds plus gros ; un crédit immobilier et deux enfants, oui.

**Qu’est-ce qui compte comme une urgence ?**
Imprévu, nécessaire, urgent — il faut les trois. Une promotion sur des billets d’avion échoue aux trois ; une boîte de vitesses cassée dont vous avez besoin pour travailler les valide toutes.${NOTE}`,
  },
  {
    topicKey: 'stocks-vs-bonds',
    title: 'Actions et obligations : quelle est la vraie différence ?',
    question: 'Quelle est la véritable différence entre actions et obligations, et comment se comportent-elles ?',
    summary:
      'Une action, c’est la propriété — votre rendement dépend de la marche de l’entreprise. Une obligation, c’est un prêt — votre rendement est un contrat. Cette seule différence explique pourquoi les actions rapportent plus en moyenne et pourquoi les obligations stabilisent un portefeuille.',
    tags: ['finance', 'investissement', 'actions', 'obligations'],
    language: 'fr',
    image: {
      prompt: promptOf('stocks-vs-bonds'),
      alt: 'Une crête abrupte ascendante à côté d’un escalier doux et régulier',
    },
    sources: [
      { title: 'Investor.gov (SEC) — introduction to stocks and bonds', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) — historical returns data', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Actions et obligations : quelle est la vraie différence ?

Une **action** fait de vous un copropriétaire d’une entreprise : vous partagez ses profits (dividendes, croissance) et ses échecs, sans aucune promesse. Une **obligation** fait de vous un prêteur d’une entreprise ou d’un État : on vous doit des intérêts fixes et votre argent à une date, par contrat. Tout le reste — l’écart de rendement, l’écart de risque, la façon dont les portefeuilles les mêlent — découle de la propriété face au prêt.

## Le contrat que chacune propose

| | Action (propriété) | Obligation (prêt) |
| --- | --- | --- |
| Votre rendement | Ce qui reste une fois tout le monde payé — potentiel illimité | Coupons fixes + capital remboursé — potentiel plafonné |
| Si l’entreprise prospère | Vous captez la croissance | Vous touchez les mêmes coupons |
| Si elle échoue | Vous êtes dernier servi, souvent ruiné | Les créanciers sont payés avant les propriétaires |
| Principaux risques | Résultats de l’entreprise, sentiment de marché | Défaut, inflation, hausse des taux |
| Rendement réel de long terme (É.-U., très longues fenêtres) | ~6 à 7 % par an | ~1 à 3 % par an |
| Mauvaise année typique | −20 % à −50 % | −5 % à −15 % (chocs de taux) |

Le rendement moyen plus élevé des actions n’est pas un cadeau ; c’est le paiement pour accepter l’incertitude et le statut de dernier servi. La finance l’appelle la prime de risque des actions.

## Ce qui fait bouger le prix des obligations

Les obligations ne sont pas figées : sur le marché secondaire, leur prix évolue à l’inverse des taux d’intérêt. Si vous détenez une obligation à 2 % et que les nouvelles paient 5 %, personne n’achète la vôtre à sa valeur nominale — son prix baisse jusqu’à ce que les rendements s’égalisent. Les obligations à longue échéance oscillent plus fort. Voilà pourquoi même les fonds obligataires « sûrs » ont connu une année historiquement mauvaise quand les taux ont bondi, et pourquoi les obligations réduisent sans éliminer le risque.

## Pourquoi les portefeuilles les mêlent

Actions et obligations zigzaguent souvent (pas toujours) à contretemps : les récessions qui écrasent les actions amènent en général des baisses de taux qui soulèvent les obligations de qualité. Un classique mélange 60/40 a historiquement capté l’essentiel de la croissance des actions avec des pertes nettement plus faibles. Le dosage est un cadran :

- **Plus d’actions** → croissance attendue plus élevée, creux plus profonds et plus longs. Convient aux horizons lointains.
- **Plus d’obligations** → trajet plus stable, croissance attendue plus faible. Convient aux besoins proches et aux estomacs fragiles.

Le bon réglage dépend du moment où vous avez besoin de l’argent et de votre comportement en cas de krach — vendre des actions dans la panique coûte plus cher que n’importe quelle erreur d’allocation.

## FAQ

**Les obligations sont-elles « sûres » ?**
Plus sûres que les actions face à la faillite de l’entreprise ; pas sûres face à l’inflation ou aux mouvements de taux. Une obligation d’État conservée jusqu’à l’échéance rend la somme promise — que l’inflation peut discrètement dévaloriser.

**Obligations en direct ou fonds obligataire ?**
Les fonds offrent diversification et liquidité faciles ; les obligations en direct offrent une date de paiement connue. Pour la plupart des épargnants, un fonds obligataire large et de qualité est l’outil le plus simple.

**Pourquoi pas 100 % actions si je suis jeune ?**
Mathématiquement défendable avec des décennies d’horizon et une discipline de fer. Le vrai risque est comportemental : une perte de 45 % met la discipline à l’épreuve d’une façon que les tableurs ne capturent pas.${NOTE}`,
  },
  {
    topicKey: 'dollar-cost-averaging',
    title: 'Qu’est-ce que l’investissement programmé — et quand est-il pertinent ?',
    question: 'Qu’est-ce que l’investissement programmé, et vaut-il mieux que d’investir une somme d’un coup ?',
    summary:
      'L’investissement programmé place un montant fixe à intervalle fixe, achetant plus de parts quand les prix sont bas. Pour les salariés, il se fait naturellement ; pour une rentrée d’argent, l’investissement en une fois gagne souvent mathématiquement — le programmé gagne psychologiquement.',
    tags: ['finance', 'investissement', 'investissement programmé', 'stratégie'],
    language: 'fr',
    image: {
      prompt: promptOf('dollar-cost-averaging'),
      alt: 'Des gouttes identiques tombant à intervalles réguliers dans un bassin stable',
    },
    sources: [
      { title: 'Bogleheads wiki — Dollar cost averaging', url: 'https://www.bogleheads.org/wiki/Dollar_cost_averaging' },
      { title: 'Investor.gov (SEC) — investing basics', url: 'https://www.investor.gov' },
    ],
    content: `# Qu’est-ce que l’investissement programmé — et quand est-il pertinent ?

L’investissement programmé (en anglais *dollar-cost averaging*, DCA) consiste à investir le même montant à intervalles réguliers — disons 500 le 1er de chaque mois — quoi que fasse le marché. Le montant fixe achète plus de parts quand les prix sont bas et moins quand ils sont hauts, et il supprime la pire question de l’investissement (« est-ce le bon moment ? ») en faisant du timing un non-choix.

## L’arithmétique

Investissez 300 par mois dans un fonds dont le prix oscille :

| Mois | Prix | Parts achetées |
| --- | --- | --- |
| Janv. | 30 | 10,0 |
| Févr. | 20 | 15,0 |
| Mars | 25 | 12,0 |
| Avr. | 30 | 10,0 |

Vous avez dépensé 1 200 pour 47 parts — un coût moyen d’environ 25,5 par part, *inférieur* au prix moyen simple (26,25), parce que le budget fixe a automatiquement surpondéré le mois bon marché. Voilà l’avantage mécanique : un achat discipliné des creux sans rien prévoir.

## Deux situations très différentes

**1. Investir depuis son salaire (la plupart des gens).** Le programmé n’est pas un choix de stratégie — c’est la seule option, puisque l’argent arrive chaque mois. L’automatiser est tout bénéfice : aucune décision, aucune hésitation devant les gros titres effrayants, des décennies de discipline forcée.

**2. Investir une rentrée d’argent (prime, héritage, vente).** Là, vous *pourriez* tout investir aujourd’hui ou l’étaler sur un an. Mathématiquement, l’investissement en une fois a historiquement battu l’étalement environ deux fois sur trois, simplement parce que les marchés montent plus souvent qu’ils ne baissent et que le programmé garde de l’argent sur la touche. Mais le tiers du temps où il perd, il perd au pire moment psychologique — juste après avoir tout investi.

| | En une fois | Programmé sur ~12 mois |
| --- | --- | --- |
| Résultat attendu | Plus élevé (plus de temps en marché) | Légèrement plus bas |
| Ressenti du pire cas | Brutal (tout misé avant un krach) | Amorti |
| Risque de ne jamais investir | Faible une fois fait | « Faire une pause » en cours de route est courant |

La réponse pragmatique : si un mauvais mois vous ferait abandonner le plan ou perdre le sommeil, étalez la rentrée d’argent sur 6 à 12 mois selon un calendrier écrit — un petit coût attendu pour une grande garantie comportementale. Si vous savez vraiment hausser les épaules face à la volatilité, investissez et passez à autre chose.

## Là où le programmé échoue discrètement

Le programmé sur une **action unique** vous fait moyenner dans quelque chose qui peut ne jamais se rétablir — le mécanisme « achète le creux » n’est utile que lorsque l’actif est largement diversifié et orienté à la hausse sur le long terme. Et arrêter les versements pendant les krachs efface tout l’intérêt : les parts bon marché sont précisément celles que la stratégie existe pour acheter.

## FAQ

**Le programmé garantit-il un profit ?**
Non — il façonne *quand* vous achetez, pas si l’actif monte. Un actif en baisse perd toujours de l’argent, simplement depuis un coût moyen plus bas.

**Hebdomadaire ou mensuel ?**
Pratiquement identique sur des années. Calez-le sur votre paie et oubliez-le ; la fréquence est un détail.

**Dois-je suspendre le programmé quand les marchés semblent chers ?**
C’est du market timing déguisé. La valeur de la stratégie tient précisément à ce qu’elle ignore vos sentiments sur les valorisations.${NOTE}`,
  },
  {
    topicKey: 'asset-allocation',
    title: 'L’allocation d’actifs et le rééquilibrage, expliqués simplement',
    question: 'Qu’est-ce que l’allocation d’actifs, et comment fonctionne vraiment le rééquilibrage ?',
    summary:
      'L’allocation d’actifs — votre répartition entre actions, obligations et liquidités — détermine l’essentiel du risque et du comportement de long terme d’un portefeuille, bien plus que le choix des fonds. Le rééquilibrage maintient cette répartition sur sa cible.',
    tags: ['finance', 'investissement', 'allocation d’actifs', 'portefeuille'],
    language: 'fr',
    image: {
      prompt: promptOf('asset-allocation'),
      alt: 'Un camembert lumineux en trois parts maintenu en équilibre sur une balance',
    },
    sources: [
      { title: 'Bogleheads wiki — Asset allocation', url: 'https://www.bogleheads.org/wiki/Asset_allocation' },
      { title: 'Investor.gov (SEC) — Asset allocation basics', url: 'https://www.investor.gov' },
    ],
    content: `# L’allocation d’actifs et le rééquilibrage, expliqués simplement

L’allocation d’actifs est la répartition en pourcentage de votre portefeuille entre les classes d’actifs — généralement les actions pour la croissance, les obligations pour la stabilité, les liquidités pour l’immédiateté. C’est la décision unique qui domine le comportement de votre portefeuille : des recherches remontant à des décennies attribuent la grande majorité de la *variabilité* du rendement d’un portefeuille diversifié à son allocation, et non aux fonds ou actions précis qui remplissent les cases.

## Pourquoi la répartition compte plus que les choix

Deux investisseurs détenant tous deux d’excellents fonds peu coûteux auront des expériences radicalement différentes si l’un est à 90 % d’actions et l’autre à 30 %. L’investisseur à 90/10 doit s’attendre à environ le double de croissance de long terme — et à des pertes proches de −45 % lors des mauvais krachs. L’investisseur à 30/70 cède une bonne part de la croissance contre des creux qui dépassent rarement −15 %. Aucun n’a tort ; ils répondent à des questions différentes : *quand a-t-on besoin de l’argent, et que cette personne peut-elle traverser sans paniquer ?*

Une carte grossière :

| Argent nécessaire d’ici… | Forme d’allocation courante |
| --- | --- |
| < 3 ans | Surtout liquidités et obligations courtes |
| 3 à 10 ans | Équilibré, p. ex. 40 à 60 % d’actions |
| 10 à 30 ans et plus | Orienté actions, p. ex. 70 à 90 % |

Les heuristiques du type « 110 moins votre âge en actions » sont des points de départ grossiers — utiles pour s’ancrer, pas des lois. La *capacité* de risque (votre horizon, la stabilité de vos revenus) et la *tolérance* au risque (ce que vous supportez sans perdre le sommeil) comptent toutes deux, et la plus basse des deux doit l’emporter.

## Ce qu’est le rééquilibrage

Les marchés bougent ; votre répartition dérive. Après une bonne année boursière, un portefeuille 60/40 peut se retrouver à 70/30 — silencieusement plus risqué que ce que vous aviez choisi. Le rééquilibrage vend une partie de ce qui a grimpé et achète ce qui a traîné, rétablissant la cible. C’est de l’entretien du risque, pas de la course au rendement : vous prenez systématiquement des profits sur le côté cher et vous renforcez le côté bon marché, sur un calendrier, sans rien prévoir.

Deux déclencheurs praticables — choisissez-en un et automatisez-le :

- **Calendaire** : une ou deux fois par an, à date fixe.
- **Seuil** : rééquilibrer quand un actif dérive de plus de ~5 points de sa cible.

Pour les épargnants réguliers, la méthode la moins chère est le **rééquilibrage par les versements** : diriger l’argent neuf vers ce qui est sous la cible, en évitant toute vente (et tout impôt ou frais).

## La discipline qu’il impose

Le superpouvoir discret du rééquilibrage est comportemental : il vous force à acheter des actions après les krachs (quand votre cible indique que vous êtes sous-pondéré) et à les alléger après l’euphorie — exactement les opérations auxquelles les émotions résistent. Les investisseurs qui ont rééquilibré pendant 2008-09 ont acheté près du plancher mécaniquement, sans avoir besoin de courage, juste d’une règle.

## FAQ

**Le rééquilibrage augmente-t-il les rendements ?**
Parfois un peu (entre actifs de rendement similaire), parfois il coûte un peu (alléger un long marché haussier). Son vrai produit est de maintenir le risque au niveau que vous avez choisi.

**Quelle précision pour les cibles ?**
Des nombres ronds, des bandes larges. 58/42 contre 60/40, c’est du bruit ; transformer l’allocation en bricolage permanent ruine le dispositif.

**Où placer les autres actifs — immobilier, or, crypto ?**
En tranches délibérées et plafonnées (couramment ≤ 5 à 10 % chacune), ajoutées pour la diversification — dimensionnées pour que se tromper complètement à leur sujet ne change pas votre vie.${NOTE}`,
  },
  {
    topicKey: 'market-timing',
    title: 'Pourquoi anticiper le marché est si difficile (même pour les pros)',
    question: 'Pourquoi anticiper le marché est-il jugé quasi impossible, même pour les professionnels ?',
    summary:
      'Anticiper le marché exige d’avoir raison deux fois — vendre avant les baisses, acheter avant les hausses — face à des prix qui intègrent déjà les anticipations. Manquer la poignée de meilleurs jours, qui se nichent dans les krachs, détruit des décennies de rendement.',
    tags: ['finance', 'investissement', 'market timing', 'comportement'],
    language: 'fr',
    image: {
      prompt: promptOf('market-timing'),
      alt: 'Des flèches tentant en vain de se poser sur les crêtes et creux d’une vague',
    },
    sources: [
      { title: 'SPIVA — persistence and active management scorecards', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Aswath Damodaran (NYU Stern) — market data and analysis', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Pourquoi anticiper le marché est si difficile (même pour les pros)

Anticiper le marché — sortir avant les baisses et revenir avant les reprises — échoue non parce que les gens sont bêtes, mais parce que le jeu est structurellement truqué contre le joueur. Vous devez avoir raison **deux fois**, sur le **quand**, face à des **prix qui contiennent déjà le consensus**, alors que les jours payants se cachent **dans les semaines les plus effrayantes**. Chaque obstacle isolé est difficile ; multipliés ensemble, ils expliquent pourquoi les stratégies de timing brillent dans les récits et déçoivent dans les résultats audités.

## Les quatre problèmes structurels

**1. Deux décisions justes, l’erreur se multiplie.** Sortir au bon moment ne vaut rien si vous ne revenez pas aussi au bon moment. Quelqu’un d’exact à 70 % par décision — bien mieux que ce que les données soutiennent — n’a raison sur l’aller-retour que ~49 % du temps, avant frais.

**2. Les prix bougent les premiers.** Les marchés anticipent : quand la récession est aux infos, les prix ont chuté il y a des mois ; les reprises débutent de même au milieu de gros titres terribles, quand acheter semble insensé. Agir sur ce qui est visiblement en train d’arriver, c’est négocier sur une information déjà dans le prix.

**3. Les meilleurs jours se nichent dans les pires phases.** Des études de long terme montrent à répétition que manquer seulement les 10 à 20 meilleurs jours sur des *décennies* ampute considérablement la richesse finale — souvent de moitié ou plus — et ces jours surviennent massivement pendant les krachs et leurs rebonds immédiats, précisément quand un anticipateur attend en liquidités « que ça s’éclaircisse ».

**4. La probabilité de base punit l’absence.** Les actions montent la plupart des années ; les liquidités sur la touche paient un coût d’opportunité par défaut. Un anticipateur ne doit pas seulement avoir raison — il doit avoir raison de *plus* que la dérive haussière du marché plus les impôts et frais de transaction.

## Ce que montre le bilan des professionnels

Des décennies de bilans SPIVA montrent que la plupart des fonds professionnels — y compris les fonds tactiques et d’allocation flexible dont le mandat même est le timing — restent derrière de simples indices de référence sur de longues fenêtres, et les rares gagnants se répètent rarement. Les prévisions de « où sera l’indice dans un an » se trompent largement de manière routinière. C’est le fait empirique le plus solide de l’investissement des particuliers, et la raison pour laquelle les conseils ennuyeux dominent.

## Ce qui marche à la place

Pas la prédiction — l’*engagement préalable* :

| Au lieu de… | Faites… |
| --- | --- |
| « Je sortirai avant le prochain krach » | Tenir une allocation dont vous pouvez survivre au pire cas |
| « Je rachèterai au plancher » | Automatiser des versements qui achètent chaque mois, même les pires |
| « Liquidités tant que ce n’est pas plus clair » | Accepter que clarté et prix bas ne coexistent jamais |
| Réagir aux gros titres | Rééquilibrer selon des règles calendaires ou de seuil |

Cela transforme le timing d’un problème de prévision (ingagnable) en un problème de conception (très gagnable).

## FAQ

**« Acheter le creux », est-ce du market timing ?**
Garder des liquidités en *attendant* les creux, oui — et cela sous-performe historiquement le simple fait de rester investi. Déployer de l’argent neuf programmé pendant les creux, c’est juste de la discipline de versement.

**Certains n’ont-ils pas annoncé les grands krachs ?**
Il y a toujours quelqu’un — des personnes différentes à chaque fois. Distinguer la clairvoyance d’un large échantillon de paris bruyants est, après coup, presque impossible ; miser votre épargne sur l’identification à l’avance est la façon la plus chère d’apprendre les statistiques.

**Les prix ne sont donc jamais prévisibles ?**
La direction de court terme : effectivement non, en pratique. Les rendements attendus de long terme sont vaguement liés aux valorisations — utile pour calibrer les attentes, inutile comme signal de sortie.${NOTE}`,
  },
  {
    topicKey: 'etf-vs-mutual-fund',
    title: 'ETF ou fonds classique : quelle enveloppe choisir ?',
    question: 'Quelle est la différence entre un ETF et un fonds classique, et lequel choisir ?',
    summary:
      'ETF et fonds classiques sont deux enveloppes d’une même idée : l’investissement mutualisé et diversifié. Les ETF se négocient comme des actions, avec des frais souvent plus bas ; les fonds classiques cotent une fois par jour et automatisent mieux les versements. La stratégie prime sur l’enveloppe.',
    tags: ['finance', 'investissement', 'etf', 'fonds'],
    language: 'fr',
    image: {
      prompt: promptOf('etf-vs-mutual-fund'),
      alt: 'Un panier de cubes sur un tapis roulant, un autre pesé sur un socle',
    },
    sources: [
      { title: 'Investor.gov (SEC) — Mutual funds and ETFs', url: 'https://www.investor.gov' },
      { title: 'Morningstar — fund and ETF research', url: 'https://www.morningstar.com' },
    ],
    content: `# ETF ou fonds classique : quelle enveloppe choisir ?

Un ETF (fonds négocié en Bourse) et un fonds classique peuvent détenir *exactement le même portefeuille* — le même indice, les mêmes actions. La différence est l’enveloppe : comment vous achetez, quand les prix sont fixés, ce que cela coûte, et comment les impôts se règlent. Le choix de l’enveloppe est une décision de logistique, pas de stratégie — et la logistique finit par compter sur des décennies.

## Les différences mécaniques

| | ETF | Fonds classique |
| --- | --- | --- |
| Négociation | Toute la journée en Bourse, comme une action | Une fois par jour à la valeur de clôture |
| Montant minimum | Une part (ou une fraction, selon le courtier) | Souvent des minimums fixes (variable) |
| Coûts typiques | Habituellement les frais les plus bas ; on paie l’écart achat-vente | Bas pour les versions indicielles ; certains portent des frais d’entrée — évitables |
| Versements automatiques | Dépend du courtier, de plus en plus supporté | Natifs et fluides |
| Efficacité fiscale (É.-U.) | La création/rachat en nature minimise en général les distributions de plus-values | Plus susceptible de distribuer des gains imposables (selon la juridiction) |
| Risque comportemental | La négociabilité invite au bricolage | La cotation quotidienne décourage le trading |

## Quand chaque enveloppe convient mieux

**Les ETF brillent quand** vous voulez les frais courants les plus bas, vous investissez via un courtier moderne, vous tenez au contrôle en séance ou à la transparence des positions, ou (dans certaines juridictions, notamment les États-Unis) vous voulez moins de distributions imposables surprises dans un compte taxable.

**Les fonds classiques brillent quand** la priorité est l’automatisation sans friction — montants mensuels fixes, achats au centime près, réinvestissement des dividendes, plans retraite liés à la paie — où « le mettre en place et ne plus jamais regarder » est tout l’intérêt, et où les versions indicielles coûtent essentiellement autant que les ETF équivalents.

## Les pièges à réellement éviter

Le débat sur l’enveloppe détourne des modes d’échec qui coûtent vraiment de l’argent :

- **Les fonds à frais élevés, quelle que soit l’enveloppe** — des frais de 1 %+ pour une exposition de type indiciel, voilà ce qu’il faut fuir, pas l’enveloppe.
- **Les frais d’entrée et commissions de suivi** sur certains fonds — jamais à payer pour une exposition banalisée.
- **La tentation de trader avec les ETF** — pouvoir vendre à 10 h 43 devant un gros titre effrayant est une fonctionnalité pour les traders et un défaut pour les épargnants.
- **Les ETF de niche peu échangés** — des écarts larges taxent discrètement chaque transaction ; les grands fonds généralistes n’ont pas ce problème.

## FAQ

**L’un est-il plus sûr que l’autre ?**
Des positions identiques portent un risque de marché identique. Les deux enveloppes sont étroitement réglementées ; aucune ne vous protège de la chute du marché.

**Pourquoi les ETF gagnent-ils souvent sur la fiscalité aux États-Unis ?**
Leur création/rachat de parts se fait « en nature » avec les teneurs de marché, ce qui permet au fonds de céder des positions appréciées sans vendre — donc moins de distributions de plus-values pour les porteurs. L’avantage se réduit dans les comptes défiscalisés et diffère selon les pays.

**Puis-je choisir seulement d’après les frais ?**
Presque : même indice, puis coût total le plus bas (frais + écart typique), puis l’enveloppe que votre flux de versement automatise le mieux. La stratégie, le taux d’épargne et l’allocation écrasent encore tout cela.${NOTE}`,
  },
  {
    topicKey: 'risk-and-return',
    title: 'Risque et rendement : l’arbitrage derrière chaque placement',
    question: 'Comment risque et rendement sont-ils liés, et que signifie vraiment « plus de risque, plus de rendement » ?',
    summary:
      '« Plus de risque, plus de rendement » signifie en réalité un rendement *espéré* plus élevé en paiement de l’acceptation d’issues plus larges — y compris mauvaises. Comprendre la volatilité, les pertes et le repas gratuit de la diversification transforme le cliché en outil.',
    tags: ['finance', 'investissement', 'risque', 'fondamentaux'],
    language: 'fr',
    image: {
      prompt: promptOf('risk-and-return'),
      alt: 'Une sphère vive et volatile et une sphère calme en équilibre sur une bascule',
    },
    sources: [
      { title: 'Investor.gov (SEC) — risk basics', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) — risk premiums and returns', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Risque et rendement : l’arbitrage derrière chaque placement

« Plus de risque, plus de rendement » est la phrase la plus mal citée de la finance. La version exacte : les placements aux fourchettes d’issues plus larges et plus effrayantes doivent offrir des rendements **espérés** plus élevés, sinon personne ne les détiendrait. Le rendement supplémentaire est une *compensation*, versée en moyenne et dans le temps — pas une récompense livrée à chaque preneur de risque. Quantité de risques ne paient rien ; l’art consiste à savoir lesquels portent une prime.

## Ce que « risque » signifie réellement ici

Plusieurs choses distinctes voyagent sous un seul mot :

- **Volatilité** — l’ampleur des soubresauts de valeur d’une année à l’autre. Agaçante, survivable.
- **Perte maximale (drawdown)** — la chute du sommet au creux. Les marchés d’actions larges ont chuté à répétition de 30 à 50 % ; ce n’est pas un scénario extrême, c’est le prix d’entrée.
- **Perte permanente** — la seule fatale : une entreprise qui fait faillite, un pari concentré qui implose, ou *vous* qui vendez au plancher et transformez une perte temporaire en perte permanente.
- **Risque d’insuffisance** — le discret : investir si prudemment que l’argent ne grossit pas assez pour son objectif. Les choix « sûrs » en regorgent.

La volatilité d’un portefeuille d’actions diversifié est surtout temporaire ; l’effondrement d’une action unique est souvent permanent. Même classe d’actifs, risque profondément différent.

## Quels risques paient une prime — et lesquels non

| Risque | Compensé ? | Pourquoi |
| --- | --- | --- |
| Risque large du marché actions | Oui — la prime de risque actions | Indiversifiable ; quelqu’un doit le porter |
| Prêter plus longtemps / à des emprunteurs plus faibles | Oui — primes de terme et de crédit | Réel risque de perte/d’érosion |
| Détenir une seule action plutôt que beaucoup | **Non** | Diversifiable — le marché ne paie pas les risques que vous pourriez supprimer gratuitement |
| Spéculation de type loterie | Négatif en moyenne | Vous payez pour le rêve |

C’est l’enseignement le plus profond du tableau : **la diversification supprime le risque non compensé à coût nul** — ce qui se rapproche le plus d’un repas gratuit en finance. La concentration n’est rationnelle que si vous disposez d’un véritable avantage ou d’une conviction de niveau initié ; sinon c’est du risque non payé.

## Adapter le risque à l’objectif

La capacité de risque est fixée par le *temps* : l’argent nécessaire l’an prochain ne peut traverser une chute de 40 % ; celui nécessaire en 2050 peut en ignorer une douzaine. La tolérance au risque est fixée par le *tempérament* : l’allocation que vous abandonnez dans la panique n’a jamais été la bonne, quoi qu’en dise le tableur. Règle pratique — prenez votre risque *utile* maximal avec l’argent de long horizon, et aucun risque non rémunéré, à quelque horizon que ce soit.

## FAQ

**Si les actions sont plus risquées, pourquoi les conseillers en mettent-ils chez les retraités ?**
Parce que la retraite dure des décennies et que l’inflation est aussi un risque. Une part d’actions petite à modérée combat le risque d’insuffisance tandis que les obligations gèrent les années proches.

**La volatilité est-elle la bonne mesure du risque ?**
C’est le substitut mesurable, pas la vérité. Pour un investisseur de long terme, les vrais risques sont la perte permanente et l’échec à atteindre l’objectif — la volatilité ne compte que lorsqu’elle vous force ou vous effraie à vendre.

**Puis-je obtenir des rendements élevés avec peu de risque ?**
Quiconque propose cette combinaison se trompe ou vend quelque chose. Les vraies occasions de faible risque et fort rendement sont arbitrées en quelques minutes — elles n’arrivent pas dans les brochures grand public.${NOTE}`,
  },
  {
    topicKey: 'credit-card-interest',
    title: 'Comment fonctionnent vraiment les intérêts de carte de crédit (et pourquoi ils s’emballent)',
    question: 'Comment fonctionnent les intérêts de carte de crédit, et pourquoi la dette grossit-elle si vite ?',
    summary:
      'Les cartes de crédit pratiquent parmi les taux les plus élevés de la finance courante — souvent 15 à 25 % de TAEG, capitalisant chaque jour dès qu’un solde subsiste. Les paiements minimaux sont conçus pour étirer la dette sur des années ; comprendre la mécanique est la sortie de secours.',
    tags: ['finance', 'cartes de crédit', 'dette', 'intérêts'],
    language: 'fr',
    image: {
      prompt: promptOf('credit-card-interest'),
      alt: 'Une spirale de marches de dette s’élevant d’une carte tandis qu’une boule grossit',
    },
    sources: [
      { title: 'Consumer Financial Protection Bureau — credit card resources', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# Comment fonctionnent vraiment les intérêts de carte de crédit (et pourquoi ils s’emballent)

Une carte de crédit, c’est deux produits dans une même enveloppe : un merveilleux outil de paiement si vous soldez le solde chaque mois, et l’un des prêts les plus chers de la finance courante si vous ne le faites pas — couramment 15 à 25 % de TAEG, avec des intérêts qui se composent. L’effet boule de neige n’est pas une métaphore ; c’est l’arithmétique de taux élevés appliqués chaque jour à un solde que les paiements minimaux entament à peine.

## La mécanique, étape par étape

- **Le délai de grâce.** Payez le *solde total relevé* avant l’échéance et vos achats ne coûtent aucun intérêt. C’est le seul mode où une carte est une gestion d’argent gratuite.
- **Le perdre.** Reportez le moindre solde au-delà de l’échéance et les intérêts s’appliquent en général aux achats dès le premier jour à partir de là — le délai de grâce disparaît jusqu’à ce que vous soldiez de nouveau tout le solde.
- **La capitalisation quotidienne.** La plupart des cartes facturent les intérêts chaque jour : un TAEG de 20 % fait ~0,0548 % par jour appliqué à votre solde quotidien moyen. Les intérêts s’accumulent sur les intérêts déjà accumulés — la capitalisation joue contre vous à un rythme dont les actions ne font que rêver.
- **Le piège du paiement minimum.** Les minimums tournent couramment autour de 1 à 3 % du solde. Sur 5 000 à 20 % de TAEG, les seuls intérêts de la première année font environ 1 000 — un minimum de 2 % (100/mois) dépasse à peine les intérêts, étirant le remboursement vers une décennie et multipliant le vrai coût de ce que vous avez acheté.

## Pourquoi cette dette passe avant presque tout

Rembourser un solde à 20 % de TAEG, c’est, sans risque, un « rendement de 20 % » — meilleur que ce qu’aucun placement légitime n’offrira de façon fiable. La hiérarchie pratique est sans détour :

| Argent disponible | Meilleur usage, en général |
| --- | --- |
| Solde de carte à 15 à 25 % | L’attaquer avant d’investir au-delà d’un éventuel abondement employeur |
| Choisir quelle carte rembourser en premier | Le TAEG le plus élevé d’abord (« avalanche ») — mathématiquement optimal |
| La motivation est le goulot | Le plus petit solde d’abord (« boule de neige ») — psychologiquement tenace |

L’un et l’autre ordre battent le « minimum partout » de plusieurs années et de milliers.

## En sortir, concrètement

Cessez d’ajouter (basculez les dépenses du quotidien sur la carte de débit pendant que vous attaquez le solde) ; payez un montant *fixe* et offensif plutôt que le minimum qui rétrécit ; envisagez un transfert de solde vers une carte promotionnelle à 0 % *uniquement* avec un plan écrit pour solder dans la fenêtre promotionnelle (frais de transfert de ~3 à 5 %, et taux post-promo qui redeviennent brutaux) ; et traitez la consolidation par prêt personnel comme une baisse de taux, pas une absolution — le schéma de dépense qui a bâti le solde doit cesser, sinon il se reconstitue.

## FAQ

**Payer le minimum protège-t-il mon score de crédit ?**
Cela évite les marques de retard, oui — mais un taux d’utilisation élevé (solde ÷ plafond) plombe quand même le score. Côté score comme côté coût, la réponse est la même : faites baisser le solde.

**Vaut-il la peine de garder un petit solde « pour mon score » ?**
Un mythe tenace. Payer en totalité bâtit le même historique de paiement et coûte zéro intérêt ; porter un solde ne fait qu’enrichir l’émetteur.

**Les avances de fonds sont-elles au même taux ?**
Généralement pire : TAEG plus élevé, des frais immédiats, et **aucun délai de grâce** — les intérêts démarrent dès que l’argent sort du distributeur. C’est le bouton le plus cher de la carte.${NOTE}`,
  },
  {
    topicKey: 'retirement-start-early',
    title: 'Pourquoi commencer tôt à épargner pour la retraite bat épargner plus tard',
    question: 'À quel âge commencer à épargner pour la retraite, et quelle différence fait l’âge de départ ?',
    summary:
      'Grâce à la capitalisation, chaque décennie de retard double à peu près l’épargne mensuelle requise pour le même capital retraite. Commencer à 25 ans plutôt qu’à 35 — même montant mensuel — peut finir avec environ deux fois plus d’argent.',
    tags: ['finance', 'retraite', 'épargne', 'intérêts composés'],
    language: 'fr',
    image: {
      prompt: promptOf('retirement-start-early'),
      alt: 'Un fil précoce gonflant en fleuve de lumière à côté d’un mince ruisseau tardif',
    },
    sources: [
      { title: 'Investor.gov (SEC) — Compound Interest Calculator', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Bogleheads wiki — retirement planning start points', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Pourquoi commencer tôt à épargner pour la retraite bat épargner plus tard

L’épargne retraite a une variable écrasante, et ce n’est ni le revenu, ni le choix des fonds, ni même le taux d’épargne — c’est **le nombre d’années pendant lesquelles l’argent capitalise**. Chaque décennie de retard double à peu près ce que vous devez épargner chaque mois pour arriver au même point. Les premières années paraissent inutiles (soldes minuscules, croissance invisible) et sont mathématiquement les plus précieuses que vous aurez jamais.

## La double ligne du temps

Mêmes 500/mois, même rendement annuel moyen de 7 %, départ à 65 ans :

| Âge de départ | Années investies | Total versé | Capital final (approx.) |
| --- | --- | --- | --- |
| 25 | 40 | 240 000 | ~1 310 000 |
| 35 | 30 | 180 000 | ~610 000 |
| 45 | 20 | 120 000 | ~260 000 |

Celui de 25 ans verse seulement 60 000 de plus que celui de 35 ans et termine avec environ **700 000 de plus**. Retournez-le : pour égaler le capital de celui qui a commencé tôt, celui de 35 ans doit épargner environ 1 100/mois, et celui de 45 ans environ 2 500 — le coût du retard, facturé chaque mois.

## Pourquoi l’argent précoce est spécial

Un versement effectué à 25 ans capitalise pendant 40 ans — à 7 % il se multiplie par ~15. Le même versement à 55 ans se multiplie par ~2. Votre dernière décennie avant la retraite *rapporte* en général plus que vous n’y *versez*, mais seulement si les décennies antérieures ont construit la base sur laquelle elle croît. La capitalisation est une boule de neige : la première poussée compte le plus.

## Commencer imparfaitement bat commencer plus tard

L’ordre des opérations qui sert la plupart des gens :

1. **Capter tout abondement employeur en entier** — c’est un rendement instantané de 50 à 100 % ; aucun placement ne rivalise.
2. **Automatiser un pourcentage, pas un montant** — même 5 à 10 % du revenu à 25 ans dépassent 20 % à 40 ans. Montez-le d’un point à chaque augmentation.
3. **Choisir par défaut des fonds indiciels larges et peu coûteux**, dans le compte fiscalement avantageux qu’offre votre pays — des décennies d’horizon sont exactement ce pour quoi les allocations à forte dose d’actions existent.
4. **Ne pas attendre le « bon moment »** — pour un horizon de 40 ans, tout point de départ historique, y compris la veille des krachs, a battu l’attente de plusieurs années « pour y voir clair ».

## Si vous commencez tard

Les maths sont plus dures, pas désespérées : le taux d’épargne devient le levier (la capitalisation a moins de piste, donc les versements portent davantage la charge), travailler même 2 à 3 ans de plus aide deux fois (plus de versements, moins d’années de retrait), et la pire réaction est de se rabattre sur des placements aux cotes de loterie pour « rattraper » — le risque de séquence punit précisément cela.

## FAQ

**Dois-je épargner pour la retraite tout en remboursant mes dettes ?**
Captez l’abondement employeur même alors (il surpasse n’importe quel taux d’intérêt normal) ; au-delà de l’abondement, une dette à TAEG élevé mérite en général la priorité, une dette à taux bas en général non.

**7 % est-il une hypothèse sûre ?**
C’est une moyenne historique de long terme d’un indice d’actions, pas une garantie — les vrais plans devraient aussi tester 4 à 6 %. Notez que la conclusion ne change pas : tout taux supposé récompense celui qui commence tôt.

**Combien me faudra-t-il en tout ?**
Un repère de planification grossier : dépenses annuelles × 25 (la « règle des 4 % » inversée) — affiné ensuite selon le paysage des retraites de votre pays. Le chiffre compte moins à 25 ans que l’habitude ; la précision peut attendre, la capitalisation non.${NOTE}`,
  },
];
