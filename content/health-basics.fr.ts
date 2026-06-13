import type { DraftArticle } from './types';
import { healthBasicsEn } from './health-basics.en';

// Batch : Health & Nutrition Basics (version française native). Mêmes titres et
// mêmes topicKey que health-basics.en.ts, rédigés nativement pour un lectorat
// francophone. Images partagées. Vulgarisation santé générale, pas un avis
// médical ; chaque article se termine par une invitation à consulter.

const promptOf = (key: string): string => {
  const hit = healthBasicsEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

const NOTE =
  '\n\n*Cet article est une information générale de santé, pas un avis médical. Pour des symptômes ou des décisions personnelles, consultez un professionnel de santé qualifié.*';

export const healthBasicsFr: DraftArticle[] = [
  {
    topicKey: 'caffeine-how-it-works',
    title: 'Comment la caféine agit vraiment dans votre corps',
    question: 'Comment la caféine vous réveille-t-elle, et pourquoi finit-elle par ne plus faire effet ?',
    summary:
      'La caféine n’apporte pas d’énergie : elle bloque le signal « je suis fatigué » du cerveau (l’adénosine) et masque la fatigue au lieu de la supprimer. L’usage régulier crée une tolérance, et la dette de sommeil attend toujours en dessous.',
    tags: ['santé', 'caféine', 'sommeil', 'nutrition'],
    language: 'fr',
    image: {
      prompt: promptOf('caffeine-how-it-works'),
      alt: 'Une molécule de caféine bloquant un récepteur et empêchant une molécule de fatigue de s’y fixer',
    },
    sources: [
      { title: 'Sleep Foundation — caféine et sommeil', url: 'https://www.sleepfoundation.org/nutrition/caffeine-and-sleep' },
      { title: 'FDA — quelle quantité de caféine est excessive', url: 'https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much' },
    ],
    content: `# Comment la caféine agit vraiment dans votre corps

La caféine est la drogue la plus consommée au monde, et presque tout le monde se trompe sur ce qu'elle fait. Elle ne vous donne **pas** d'énergie. Ce n'est pas un carburant. Ce qu'elle fait réellement, c'est bloquer le signal qui dit à votre cerveau que vous êtes fatigué — une ruse habile qui masque la fatigue sans la supprimer. Comprendre ce seul mécanisme explique la nervosité, le contrecoup, la tolérance, et pourquoi la caféine sabote votre sommeil des heures après l'avoir bue.

## La ruse de l'adénosine

Pendant que vous êtes éveillé, votre cerveau accumule une molécule appelée **adénosine**. Elle se fixe sur des récepteurs et, à mesure qu'elle s'accumule au fil de la journée, vous rend de plus en plus somnolent — c'est le décompte que tient votre cerveau du « temps passé éveillé ». La forme de la caféine ressemble suffisamment à celle de l'adénosine pour s'emboîter dans les mêmes récepteurs — et les boucher, comme une clé qui entre dans la serrure mais ne tourne pas. Les récepteurs bloqués, le signal de fatigue ne passe plus. Vous vous sentez alerte.

Mais remarquez ce qui *n'a pas* eu lieu : l'adénosine est toujours là, continue de s'accumuler, simplement incapable de s'amarrer. Vous n'avez pas remboursé la fatigue — vous l'avez mise sur une carte de crédit. Quand la caféine se dissipe et libère les récepteurs, toute cette adénosine en attente déferle d'un coup. C'est le **contrecoup**.

## Pourquoi le moment compte plus que vous ne le pensez

Le chiffre qui définit la caféine, c'est sa **demi-vie** : environ 5 à 6 heures chez un adulte typique, ce qui signifie que la moitié de la dose est encore active aussi longtemps après l'avoir bue. Un café fort à 15 h laisse une quantité notable en circulation à 21 h, bloquant discrètement le signal de pression de sommeil exactement au moment où vous le voulez. Même les gens qui « s'endorment très bien » malgré un café tardif voient leur sommeil profond mesurablement dégradé — le repos est plus léger sans qu'ils le sachent.

| Temps après un café | Caféine restante, à peu près |
| --- | --- |
| 0 heure | 100 % |
| ~5–6 heures | 50 % |
| ~10–12 heures | 25 % |
| ~24 heures | une trace faible mais réelle |

(La demi-vie varie beaucoup d'une personne à l'autre — la génétique, la grossesse, certains médicaments et la fonction hépatique peuvent la doubler ou la réduire de moitié.)

## Tolérance et dépendance

Consommez de la caféine tous les jours et votre cerveau s'adapte en **fabriquant davantage de récepteurs à l'adénosine** — si bien que la même dose en bloque une fraction plus petite, et qu'il vous en faut plus pour le même coup de fouet. Dans le même temps, avec ces récepteurs supplémentaires, se passer de caféine laisse l'adénosine se fixer encore plus facilement qu'avant : c'est le classique mal de tête de sevrage, la fatigue et l'irritabilité. Chez les gros consommateurs, l'impression que « la caféine me fait me sentir normal » n'est souvent qu'un retour du sevrage vers la ligne de base, et non un gain au-dessus.

## Bien l'utiliser

Le mécanisme suggère des règles simples : instaurez un **couvre-feu caféine** (souvent : arrêter ~8 à 10 heures avant le coucher) ; connaissez votre plafond (les autorités de santé citent jusqu'à ~400 mg/jour — environ 4 tasses de café — comme modéré pour la plupart des adultes en bonne santé, moins pendant la grossesse) ; et rappelez-vous qu'elle **repousse** la somnolence au lieu de remplacer le sommeil — la dette finit toujours par être due.

## FAQ

**La caféine déshydrate-t-elle ?**
Le léger effet diurétique est compensé par le liquide de la boisson elle-même ; pour les consommateurs réguliers, café et thé comptent dans l'hydratation. La crainte de déshydratation est largement exagérée.

**Pourquoi le café rend-il certaines personnes anxieuses ou tremblantes ?**
En bloquant l'effet « apaisant » de l'adénosine, la caféine laisse les signaux stimulants monter plus haut — augmentant le rythme cardiaque et, chez les personnes sensibles ou à fortes doses, l'anxiété. La génétique y joue beaucoup.

**Puis-je « réinitialiser » ma tolérance ?**
Oui — une semaine ou deux sans en consommer fait redescendre le nombre de récepteurs vers la ligne de base, après quoi la même dose frappe à nouveau plus fort. Attendez-vous à des symptômes de sevrage pendant cette remise à zéro.${NOTE}`,
  },
  {
    topicKey: 'why-we-sleep',
    title: 'Pourquoi avons-nous besoin de dormir, et que se passe-t-il sinon ?',
    question: 'Pourquoi les humains ont-ils besoin de sommeil, et que se passe-t-il vraiment dans le cerveau et le corps pendant ce temps ?',
    summary:
      'Le sommeil n’est pas un temps mort : c’est quand le cerveau évacue ses déchets, consolide la mémoire et que le corps se répare. Un sommeil chroniquement court dégrade en silence l’humeur, l’immunité, le métabolisme et le jugement, souvent sans qu’on s’en aperçoive.',
    tags: ['santé', 'sommeil', 'cerveau', 'bien-être'],
    language: 'fr',
    image: {
      prompt: promptOf('why-we-sleep'),
      alt: 'Une tête endormie où une lumière nettoyante balaie les déchets et ordonne les souvenirs',
    },
    sources: [
      { title: 'Sleep Foundation — de combien de sommeil avez-vous besoin', url: 'https://www.sleepfoundation.org/how-sleep-works/how-much-sleep-do-we-really-need' },
      { title: 'CDC — sommeil et santé', url: 'https://www.cdc.gov/sleep/about/index.html' },
    ],
    content: `# Pourquoi avons-nous besoin de dormir, et que se passe-t-il sinon ?

Nous passons environ un tiers de notre vie à dormir, et longtemps même les scientifiques ont traité ce temps comme perdu — le cerveau éteint. C'est tout le contraire. Le sommeil est l'un des processus les plus *actifs* et essentiels de la biologie : le cerveau y effectue une maintenance impossible à l'éveil, les souvenirs sont classés, le corps se répare. Sautez-le et les coûts sont réels, cumulatifs, et — le plus dangereux — en partie invisibles pour celui qui les paie.

## Ce que fait réellement le sommeil

Au fil d'une nuit, le cerveau parcourt en boucle plusieurs stades, chacun accomplissant un travail différent :

- **Sommeil profond (à ondes lentes)** — l'équipe de réparation du corps : croissance des tissus, renforcement immunitaire, et un « rinçage » physique. Le système glymphatique du cerveau évacue les déchets métaboliques (dont des protéines liées à la santé cérébrale à long terme) bien plus efficacement qu'à l'éveil.
- **Sommeil paradoxal (REM)** — là où surviennent les rêves vivaces et où le cerveau traite les émotions et tisse l'information nouvelle dans le savoir existant. Il est fortement impliqué dans l'apprentissage, la créativité et la régulation émotionnelle.
- **Consolidation de la mémoire** — tout au long de la nuit, les fragiles souvenirs à court terme de la journée sont rejoués et transférés vers un stockage durable à long terme. Pendant le sommeil, vous ne faites pas que vous reposer ; vous *enregistrez votre travail*.

C'est pourquoi passer une nuit blanche pour réviser se retourne contre soi : l'étape d'encodage qui verrouille l'apprentissage exige littéralement du sommeil.

## Le coût du manque

Le manque de sommeil dégrade les fonctions selon une courbe abrupte, et une grande partie des dégâts est silencieuse :

| Système | Effet d'un sommeil court |
| --- | --- |
| Attention et jugement | Réactions plus lentes, pires décisions — comparable à l'alcoolémie après une longue veille |
| Humeur | Négativité amplifiée, irritabilité, risque accru d'anxiété et de dépression |
| Mémoire et apprentissage | Encodage et rappel altérés |
| Immunité | Défense affaiblie ; maladies plus fréquentes |
| Métabolisme | Hormones de la faim perturbées, appétit accru, moins bon contrôle de la glycémie |
| Santé à long terme | Le sommeil court chronique est lié aux maladies cardiaques, au diabète, et plus encore |

Le plus cruel : après quelques jours de restriction, les gens *ont l'impression* de s'être adaptés alors que leurs performances mesurées continuent de chuter. Vous devenez un mauvais juge de votre propre altération — c'est précisément pour cela que « moi, 5 heures me suffisent » est si souvent faux.

## Combien, et comment le protéger

La plupart des adultes ont besoin de **7 à 9 heures** ; la population qui va vraiment bien avec moins est minuscule (une rare minorité génétique), bien plus petite que celle qui *prétend* en faire partie. La qualité compte autant que la quantité : des horaires réguliers (mêmes heures de coucher et de lever), une chambre sombre et fraîche, et un couvre-feu caféine et lumière des écrans protègent les stades profond et paradoxal qui font le gros du travail.

## FAQ

**Puis-je rattraper le week-end ?**
En partie — une certaine récupération est réelle, mais faire la grasse matinée le week-end n'efface pas complètement le déficit de la semaine, et l'horaire en yo-yo perturbe lui-même l'horloge biologique (le « décalage horaire social »).

**Est-il vrai que certains n'ont besoin que de 4 heures ?**
Un véritable gène de court dormeur existe, mais il est extraordinairement rare. L'écrasante majorité de ceux qui se croient dans ce groupe sont simplement en manque de sommeil chronique et s'y sont habitués.

**La sieste aide-t-elle ?**
Une courte sieste (~10 à 20 min) peut restaurer la vigilance sans somnolence au réveil. Les siestes longues ou tardives peuvent émousser la pression de sommeil nocturne et dérégler votre rythme.${NOTE}`,
  },
  {
    topicKey: 'protein-needs',
    title: 'De combien de protéines avez-vous vraiment besoin ?',
    question: 'De combien de protéines ai-je réellement besoin, et le battage autour du « riche en protéines » est-il justifié ?',
    summary:
      'La plupart des gens ont besoin de moins de protéines que ne le suggère le marketing du fitness, mais de plus que le strict minimum s’ils sont actifs ou vieillissants. L’apport quotidien total et sa répartition sur les repas comptent bien plus que des poudres coûteuses ou un timing précis.',
    tags: ['santé', 'nutrition', 'protéines', 'alimentation'],
    language: 'fr',
    image: {
      prompt: promptOf('protein-needs'),
      alt: 'Des briques de protéines mises en balance avec une silhouette, réparties régulièrement le long d’une frise',
    },
    sources: [
      { title: 'NIH / Académies nationales (USA) — apports de référence en protéines (DRI)', url: 'https://www.nal.usda.gov/human-nutrition-and-food-safety/dri-calculator' },
      { title: 'École de santé publique Harvard T.H. Chan — protéines', url: 'https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/protein/' },
    ],
    content: `# De combien de protéines avez-vous vraiment besoin ?

Les protéines vivent leur heure de gloire marketing — ajoutées à tout, des céréales à l'eau en bouteille — et le résultat est une confusion généralisée sur la quantité dont une personne a réellement besoin. La réponse honnête se situe entre deux mythes : vous en avez besoin de bien moins que ne le laissent croire les publicités de compléments, mais si vous êtes actif, plus âgé, ou que vous cherchez à préserver votre muscle en perdant du poids, il vous en faut probablement plus que le plancher officiel minimal. Voici comment trouver votre vrai chiffre.

## À quoi servent les protéines

Les protéines fournissent des acides aminés, les briques que votre corps utilise pour construire et réparer le muscle, fabriquer enzymes et hormones, soutenir les cellules immunitaires, et entretenir peau, cheveux et os. Contrairement aux graisses, le corps ne peut pas constituer une réserve significative d'acides aminés en surplus — c'est pourquoi un apport *quotidien* compte, et non une moyenne hebdomadaire.

## Les chiffres, franchement

Le minimum officiel pour prévenir une carence est d'**environ 0,8 g par kg de poids corporel et par jour** — pour un adulte de 70 kg, ~56 g. Mais « prévenir une carence » est une barre basse. Les données soutiennent des apports plus élevés selon les objectifs :

| Situation | Cible quotidienne raisonnable |
| --- | --- |
| Sédentaire, juste éviter la carence | ~0,8 g/kg |
| Globalement actif, maintien de la santé | ~1,0–1,2 g/kg |
| Musculation / prise de muscle | ~1,4–2,0 g/kg |
| Personnes âgées (contrer la fonte musculaire liée à l'âge) | ~1,0–1,2+ g/kg |
| Perte de poids (préserver le muscle) | vers le haut de la fourchette |

Pour une personne active de 70 kg, cela fait environ 100 à 140 g/jour — atteignable par l'alimentation, sans poudres. À noter : la prise de muscle a un plafond : au-delà d'environ 1,6 g/kg, les protéines supplémentaires n'apportent guère de muscle en plus, juste des calories coûteuses.

## Timing et qualité (les leviers secondaires)

Deux ajustements comptent modérément, une fois l'apport total correct :

- **Répartissez.** Le corps utilise le mieux les protéines pour construire du muscle en quantités modérées par repas (très grossièrement 20 à 40 g), donc trois ou quatre repas contenant des protéines valent mieux qu'un steak géant et deux repas vides. La « fenêtre anabolique » juste après l'exercice est bien plus indulgente qu'on ne le croyait — c'est le total quotidien qui domine.
- **La qualité varie.** Les protéines animales (viande, œufs, produits laitiers, poisson) contiennent tous les acides aminés essentiels en bonnes proportions. Les protéines végétales peuvent tout à fait couvrir les besoins, mais combiner les sources (par ex. céréales + légumineuses) garantit le jeu complet d'acides aminés ; le soja et quelques autres sont complets à eux seuls.

## FAQ

**Trop de protéines est-il dangereux pour les reins ?**
Pour des reins en bonne santé, un apport plus élevé dans ces fourchettes est bien toléré selon les données. Les personnes ayant une maladie rénale existante sont l'exception et devraient suivre un avis médical.

**Ai-je besoin de poudre de protéines ?**
Non — c'est pratique, pas magique. Les aliments entiers délivrent les mêmes acides aminés et d'autres nutriments en plus. La poudre n'est qu'une façon portable, parfois moins chère, d'atteindre votre chiffre les jours chargés.

**Manger plus de protéines construit-il automatiquement du muscle ?**
Non. La protéine est la matière première ; le *stimulus*, c'est l'entraînement en résistance. Sans entraînement, l'excédent de protéines n'est que des calories — le muscle se construit à la salle et s'approvisionne en cuisine.${NOTE}`,
  },
  {
    topicKey: 'metabolism-myths',
    title: 'Le métabolisme : ce qu’il est et ce qu’il n’est pas',
    question: 'Qu’est-ce que le métabolisme au juste, et peut-on l’« accélérer » pour perdre du poids ?',
    summary:
      'Le métabolisme est la somme de toute l’énergie que dépense votre corps, dont l’essentiel sert juste à vous maintenir en vie au repos. Il varie moins d’une personne à l’autre que ne le prétend le folklore, et les « accélérateurs de métabolisme » vendus pour maigrir relèvent surtout du marketing.',
    tags: ['santé', 'métabolisme', 'poids', 'nutrition'],
    language: 'fr',
    image: {
      prompt: promptOf('metabolism-myths'),
      alt: 'Un corps avec une grande fournaise interne stable et de plus petites lueurs d’activité',
    },
    sources: [
      { title: 'Harvard Health — le métabolisme compte-t-il pour maigrir', url: 'https://www.health.harvard.edu/staying-healthy/does-metabolism-matter-in-weight-loss' },
      { title: 'NIH (NIDDK) — équilibre énergétique et gestion du poids', url: 'https://www.niddk.nih.gov/health-information/weight-management' },
    ],
    content: `# Le métabolisme : ce qu'il est et ce qu'il n'est pas

On accuse le « métabolisme » de plus de déboires de poids que presque n'importe quel autre mot, le plus souvent comme un cadran mystérieux qui serait « lent » chez certains malchanceux et « rapide » chez d'autres. La réalité est plus ennuyeuse et plus utile : le métabolisme, c'est simplement **l'énergie totale que dépense votre corps**, et l'essentiel sert à vous maintenir en vie pendant que vous ne faites rien du tout. Comprendre ses véritables composantes dissout la plupart des mythes qu'on vend à son sujet.

## De quoi le métabolisme est fait

Votre dépense énergétique quotidienne a trois grandes composantes :

- **Métabolisme de repos (MR)** — l'énergie pour faire tourner votre corps au repos : battements du cœur, respiration, cerveau, fonction des organes, entretien cellulaire. C'est **le gros poste**, typiquement **60 à 75 %** de la dépense quotidienne totale. Vous dépensez la plupart de vos calories juste à exister.
- **Activité physique** — de l'entraînement au fait de gigoter et de marcher. Variable, et la part que vous maîtrisez le plus, mais généralement plus petite qu'on ne le suppose (souvent ~15 à 30 %).
- **Effet thermique des aliments** — l'énergie pour digérer et transformer ce que vous mangez (~10 %). Les protéines coûtent le plus à traiter, ce qui est un petit effet réel.

La surprise marquante : on ne peut pas facilement « compenser par le sport » un surplus calorique soutenu, parce que l'activité est une part minoritaire, et que le corps compense en partie en brûlant moins ailleurs.

## Pourquoi le « métabolisme lent » est surtout un mythe

Mesurés entre personnes de taille et de composition corporelle similaires, les métabolismes de repos diffèrent bien moins que le folklore ne le suggère — généralement dans une fourchette modeste, pas un écart du simple au double. Ce qui *fait* réellement bouger le MR :

| Facteur | Effet sur le MR |
| --- | --- |
| Taille corporelle et masse musculaire | Un corps plus grand et plus de muscle brûlent plus au repos (le plus grand levier réel) |
| Âge | Déclin progressif, en partie dû à la perte de muscle — des travaux récents le montrent plus stable jusqu'au milieu de la vie qu'on ne le croyait |
| Sexe | Différences largement expliquées par la composition corporelle |
| Régime sévère | Le corps régule un peu à la baisse (« thermogenèse adaptative ») |

Des métabolismes réellement différents existent donc, mais ils s'expliquent surtout par la **composition corporelle**, non par la chance. La personne au « métabolisme rapide » est souvent simplement plus grande, plus musclée, ou plus active (y compris sans s'en rendre compte).

## La vérité sur les « accélérateurs »

Les compléments, tisanes et astuces vantés pour « booster le métabolisme » produisent des effets minuscules, temporaires ou imaginaires. La caféine et les aliments épicés poussent légèrement et brièvement la dépense énergétique — bien trop peu pour peser sur le poids. La seule façon durable d'élever la dépense de repos est de **construire et préserver du muscle** (entraînement en force) et d'éviter la perte musculaire qui accompagne les régimes draconiens. Aucune pilule n'accélère la fournaise de façon significative et sûre.

## FAQ

**Manger de petits repas fréquents « attise »-t-il le métabolisme ?**
Non — c'est la quantité totale d'aliments traités qui coûte de l'énergie, pas la fréquence des repas. Six petits repas ou deux gros, avec les mêmes aliments, coûtent à peu près autant à digérer.

**Pourquoi ma perte de poids stagne-t-elle alors que je mange moins ?**
En partie à cause de la thermogenèse adaptative (un corps plus petit brûle moins, et le corps économise), en partie à cause d'un apport sous-estimé. C'est de la vraie biologie, pas un métabolisme « cassé » — et c'est pourquoi préserver le muscle et la patience comptent.

**Le muscle peut-il vraiment beaucoup augmenter mon métabolisme ?**
Modérément — le muscle brûle plus au repos que la graisse, même si l'effet par kilo est souvent surestimé. Sa plus grande valeur est de préserver le MR pendant la perte de poids et d'améliorer la santé globale.${NOTE}`,
  },
  {
    topicKey: 'vitamin-supplements',
    title: 'Avez-vous vraiment besoin de compléments en vitamines ?',
    question: 'Les compléments en vitamines valent-ils la peine, ou sont-ils un gaspillage d’argent pour la plupart des gens ?',
    summary:
      'Pour la plupart des gens à l’alimentation variée, les multivitamines à large spectre offrent peu de bénéfice prouvé — le corps élimine ce qu’il ne peut utiliser. Mais certains groupes et certaines carences précises (vitamine D ou B12) tirent un vrai bénéfice d’une supplémentation ciblée.',
    tags: ['santé', 'vitamines', 'compléments', 'nutrition'],
    language: 'fr',
    image: {
      prompt: promptOf('vitamin-supplements'),
      alt: 'Un corps nourri par des aliments variés, avec une gélule comblant un unique manque précis',
    },
    sources: [
      { title: 'NIH — bureau des compléments alimentaires (fiches vitamines et minéraux)', url: 'https://ods.od.nih.gov/factsheets/list-all/' },
      { title: 'École de santé publique Harvard T.H. Chan — vitamines et compléments', url: 'https://www.hsph.harvard.edu/nutritionsource/vitamins/' },
    ],
    content: `# Avez-vous vraiment besoin de compléments en vitamines ?

Le rayon des compléments promet la santé en flacon, et des milliards y sont dépensés chaque année. Les données racontent une histoire plus nuancée : pour une personne globalement en bonne santé à l'alimentation variée, une multivitamine quotidienne a montré **peu de bénéfice mesurable** dans de grandes études — tandis que pour des personnes précises ayant des manques précis, des compléments ciblés sont réellement utiles, parfois essentiels. Tout l'art est de distinguer les deux situations.

## Pourquoi les multivitamines tous azimuts déçoivent

Les vitamines sont des substances dont votre corps a besoin en petites quantités mais qu'il ne peut, pour la plupart, pas fabriquer lui-même. L'expression clé est *petites quantités*. Une fois vos besoins couverts — facile avec une alimentation variée — l'excès de vitamines hydrosolubles (B, C) est largement éliminé, et les liposolubles (A, D, E, K) s'accumulent mais n'apportent aucun bonus en excès. On ne peut pas « faire le plein » jusqu'à la super-santé ; au-delà du suffisant, en avoir plus ne sert à rien d'utile, et quelques-unes peuvent nuire en excès.

De grands essais de multivitamines dans des populations bien nourries n'ont généralement pas réussi à montrer de réduction des maladies cardiaques, du cancer ou de la mortalité. Pour quelqu'un qui mange déjà correctement, la multivitamine produit surtout, comme le plaisantent les chercheurs, de l'urine coûteuse.

## Quand les compléments comptent vraiment

Les exceptions sont réelles et importantes — ciblées, pas généralisées :

| Situation | Complément souvent utile |
| --- | --- |
| Exposition au soleil limitée / hautes latitudes | Vitamine D |
| Régime végétalien / végétarien strict | Vitamine B12 (absente des aliments végétaux) |
| Grossesse ou désir d'enfant | Acide folique (prévient les malformations) |
| Carence diagnostiquée (fer, etc.) | Le nutriment précis, guidé par des analyses |
| Personnes âgées | L'absorption/synthèse de la B12 et de la D décline avec l'âge |
| Régimes restrictifs / troubles de l'absorption | Selon le manque |

Remarquez le motif : un complément gagne sa place en comblant un manque *connu* — une restriction alimentaire, une étape de la vie, une analyse de sang — et non par un espoir vague. La vitamine D et la B12 sont les deux plus souvent réellement utiles pour de larges groupes.

## Utiliser les compléments avec discernement

Si vous en prenez : traitez-les comme des bouche-trous, pas comme une assurance contre une mauvaise alimentation (les aliments entiers apportent fibres et composés bénéfiques qu'aucune pilule ne reproduit) ; méfiez-vous du fait que vitamines liposolubles et minéraux peuvent atteindre des niveaux nocifs en cas d'excès ; et rappelez-vous que l'industrie des compléments est peu réglementée dans bien des pays — « naturel » ne veut pas dire « testé », et l'exactitude des doses comme la pureté varient. Dans le doute, une analyse de sang vaut mieux que deviner.

## FAQ

**Une multivitamine peut-elle me nuire ?**
Aux doses standard, c'est généralement sûr, mais les mégadoses peuvent nuire — trop de vitamine A, de fer ou d'autres est réellement toxique. Plus n'est pas plus sûr.

**Obtenir ses vitamines par l'alimentation est-il vraiment mieux que par des pilules ?**
En général oui — l'aliment délivre les nutriments en combinaisons, avec fibres et autres composés que les pilules isolées n'ont pas, et les preuves du bénéfice des aliments entiers sont bien plus solides que pour les compléments.

**Comment savoir si je suis réellement carencé ?**
Par une analyse de sang prescrite par un clinicien, et non par les seuls symptômes (souvent vagues et qui se recoupent). Deviner conduit à la fois à des pilules inutiles et à de vraies carences manquées.${NOTE}`,
  },
  {
    topicKey: 'hydration-myth',
    title: 'Faut-il vraiment boire 8 verres d’eau par jour ?',
    question: 'La règle des « 8 verres d’eau par jour » est-elle vraie, et de combien d’eau ai-je réellement besoin ?',
    summary:
      'La célèbre règle des « 8 verres » n’a aucune base scientifique solide. Les besoins réels varient selon la corpulence, l’activité, le climat et l’alimentation — et les aliments comme les autres boissons comptent. Pour la plupart, la soif et une urine jaune pâle guident mieux que tout chiffre fixe.',
    tags: ['santé', 'hydratation', 'eau', 'nutrition'],
    language: 'fr',
    image: {
      prompt: promptOf('hydration-myth'),
      alt: 'Un corps maintenu en équilibre hydrique par des apports d’aliments et de boissons variés, avec une jauge pâle',
    },
    sources: [
      { title: 'École de santé publique Harvard T.H. Chan — eau et hydratation', url: 'https://www.hsph.harvard.edu/nutritionsource/water/' },
      { title: 'Académies nationales (USA) — valeurs de référence d’apport en eau', url: 'https://www.nationalacademies.org' },
    ],
    content: `# Faut-il vraiment boire 8 verres d'eau par jour ?

« Buvez huit verres d'eau par jour » est l'une des règles de santé les plus répétées au monde — et l'une des moins étayées. Aucune étude solide ne l'a établie ; cela ressemble à un chiffre qui a pris vie de lui-même, peut-être issu d'une recommandation vieille de décennies qui notait aussi que *l'essentiel de cette eau vient des aliments*, une réserve que le slogan a laissée tomber. Le tableau réel est à la fois plus souple et plus intelligent qu'un quota fixe.

## Pourquoi un chiffre unique ne peut pas être juste

Les besoins en eau dépendent de variables qui diffèrent énormément d'une personne et d'un jour à l'autre :

- **La corpulence** — une grande personne a besoin de plus qu'une petite.
- **L'activité et la sueur** — un effort intense ou un travail physique peut multiplier les besoins.
- **Le climat** — chaleur et air sec font fortement grimper les pertes.
- **L'alimentation** — fruits, légumes, soupes et la plupart des aliments contiennent de l'eau ; une alimentation riche en végétaux fournit beaucoup d'eau avant même de boire quoi que ce soit.

Un « 8 verres » fixe ignore tout cela. La même règle peut laisser un marathonien en été sous-hydraté et pousser une petite personne sédentaire, par temps frais, à boire plus que nécessaire.

## Ce qui compte vraiment (plus que vous ne le pensez)

Un mythe tenace veut que seule l'eau « compte ». Ça ne marche pas ainsi — votre corps extrait de l'eau de presque tout ce que vous consommez :

| Source | Contribue à l'hydratation ? |
| --- | --- |
| Eau plate | Oui |
| Thé, café | Oui — le liquide l'emporte sur le léger effet diurétique |
| Lait, jus, soupe | Oui |
| Fruits et légumes (souvent 80–95 % d'eau) | Oui, de façon substantielle |
| La plupart des repas | Oui |

C'est pourquoi les gens couvrent leurs besoins sans « boire de l'eau » consciemment toute la journée — les aliments et les autres boissons font l'essentiel du travail. Café et thé, malgré le vieux mythe, hydratent positivement les consommateurs réguliers.

## Un meilleur guide que de compter

Votre corps possède un système de soif finement réglé ; les personnes en bonne santé peuvent largement **se fier à la soif** plutôt qu'atteindre un quota. Deux vérifications simples battent tout chiffre :

- **La soif** — buvez quand vous avez soif ; c'est un vrai signal, pas le signe que vous êtes déjà en échec.
- **La couleur de l'urine** — jaune paille pâle signifie bien hydraté ; ambre foncé signifie buvez plus ; souvent incolore peut signifier que vous en faites trop.

Certains groupes devraient être plus attentifs — les personnes âgées (soif émoussée), les sportifs, les gens exposés à la chaleur, et certaines conditions médicales. Et **plus n'est pas toujours mieux** : boire bien au-delà du besoin est inconfortable et, dans de rares cas extrêmes (excès de boisson lors d'épreuves d'endurance), dilue dangereusement le sodium sanguin.

## FAQ

**Une déshydratation légère nuit-elle vraiment à la concentration et à l'humeur ?**
Une déshydratation notable altère bel et bien la concentration et l'humeur, ce qui est une bonne raison de ne pas ignorer la soif — mais pas une raison de se forcer à siroter sans cesse quand on n'a pas soif.

**Devrais-je boire avant d'avoir soif ?**
Pour la vie courante, la soif est assez ponctuelle pour la plupart des gens. Boire par anticipation a du sens avant un effort intense ou une exposition à la chaleur, là où les pertes devancent le signal de soif.

**Peut-on boire trop d'eau ?**
Oui, bien que ce soit rare — ingérer des volumes extrêmes plus vite que les reins ne peuvent les évacuer peut dangereusement diluer le sodium (hyponatrémie). Le risque célèbre concerne les sports d'endurance, pas la vie quotidienne normale.${NOTE}`,
  },
  {
    topicKey: 'exercise-minimum',
    title: 'Quel est le minimum d’exercice qui aide vraiment ?',
    question: 'Quelle est la plus petite quantité d’exercice qui améliore encore réellement la santé ?',
    summary:
      'Des gains de santé majeurs commencent avec étonnamment peu de mouvement — le passage de « rien » à « un peu » est le plus grand de tous. Les recommandations citent ~150 minutes d’activité modérée par semaine, mais même une fraction vaut mieux que zéro, et le renforcement compte aussi.',
    tags: ['santé', 'exercice', 'forme physique', 'bien-être'],
    language: 'fr',
    image: {
      prompt: promptOf('exercise-minimum'),
      alt: 'Un escalier où la première marche depuis le sol est la plus haute et la plus lumineuse',
    },
    sources: [
      { title: 'OMS — recommandations sur l’activité physique', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity' },
      { title: 'CDC — les bases de l’activité physique', url: 'https://www.cdc.gov/physical-activity-basics/index.html' },
    ],
    content: `# Quel est le minimum d'exercice qui aide vraiment ?

Si l'exercice vous semble un engagement du tout ou rien que vous ne cessez de rater, la science a une bonne nouvelle : **l'exercice le plus précieux que vous ferez jamais, c'est le premier, accompli par quelqu'un qui n'en faisait aucun.** La courbe des bénéfices pour la santé est la plus raide tout en bas — passer de zéro à un peu apporte un gain proportionnel plus grand que de passer de beaucoup à davantage. Pas besoin d'un abonnement à la salle ni d'une heure par jour pour commencer à récolter de vrais bénéfices.

## Pourquoi le premier pas compte le plus

Les bénéfices pour la santé ne montent pas en ligne droite avec l'exercice ; ils montent vite au début, puis s'aplatissent. Les études sur l'activité et la mortalité montrent systématiquement que **la plus grande réduction de risque vient du départ depuis zéro** — la personne auparavant sédentaire qui se met à marcher régulièrement gagne plus, proportionnellement, que la personne active qui ajoute une sixième séance hebdomadaire. La portée est libératrice : une activité imparfaite, modeste et durable vaut mieux qu'un plan ambitieux que vous abandonnez.

## Les chiffres des recommandations (et le peu qui suffit pour l'essentiel du bénéfice)

La cible largement citée pour un bénéfice de santé substantiel est :

| Activité | Cible hebdomadaire |
| --- | --- |
| Aérobie modérée (marche rapide, vélo tranquille) | ~150 minutes |
| OU aérobie intense (course, vélo rapide) | ~75 minutes |
| Renforcement musculaire | 2 séances et plus / semaine |

Mais les mêmes travaux sont clairs : **faire moins que la cible aide déjà beaucoup** — environ la moitié de la recommandation procure encore une grande part du bénéfice, et de très courtes salves comptent. Des données récentes créditent même les « collations d'exercice » — quelques minutes de montée d'escaliers, une marche rapide de 10 minutes — accumulées au fil de la journée. La vieille idée que l'exercice devait venir en blocs de 30 minutes pour compter est dépassée ; **c'est le mouvement total qui compte.**

## N'oubliez pas la force

L'aérobie fait les gros titres, mais le **renforcement musculaire** (entraînement en résistance, exercices au poids du corps, port de charges lourdes) a des bénéfices distincts et cruciaux que le cardio ne fournit pas pleinement : préserver le muscle et l'os, soutenir le métabolisme, et maintenir autonomie et équilibre en vieillissant. Deux courtes séances par semaine, c'est une pièce à forte valeur, souvent négligée — et sans salle de sport.

## Faire tenir le minimum

Le meilleur exercice est celui que vous répéterez vraiment. Leviers pratiques : rattachez le mouvement à des habitudes existantes (marcher pendant les appels, l'escalier plutôt que l'ascenseur) ; commencez bien plus petit que ce qui paraît impressionnant (une marche de 10 minutes faite chaque jour vaut mieux qu'une heure faite deux fois) ; et comptez l'activité du quotidien — marche rapide, jardinage, vélo pour les courses comptent tous. La régularité fait des intérêts composés ; l'intensité peut venir plus tard.

## FAQ

**La marche est-elle un « vrai » exercice ?**
Oui — la marche rapide est une activité d'intensité modérée aux bénéfices bien documentés pour le cœur, l'humeur, la glycémie et la longevité. C'est l'exercice le plus sous-estimé qui soit.

**Les 10 000 pas doivent-ils être exacts ?**
Non — 10 000 est un chiffre rond d'origine marketing, pas un seuil médical. Les bénéfices apparaissent bien en dessous ; même ~7 000 pas montrent de grands gains par rapport à la sédentarité. Plus vaut mieux jusqu'à un certain point, mais la cible n'a rien de magique.

**Est-il trop tard pour commencer si je suis plus âgé ou peu en forme ?**
Non — les bénéfices apparaissent à tout âge, et le gain proportionnel à se lancer est le plus grand pour ceux qui partent du plus bas. Commencez doucement, progressez par étapes, et consultez un clinicien si vous avez des problèmes de santé.${NOTE}`,
  },
  {
    topicKey: 'added-sugar',
    title: 'Pourquoi le sucre ajouté est traité différemment du sucre naturel',
    question: 'Le sucre des fruits est-il le même que le sucre ajouté, et pourquoi sont-ils traités si différemment ?',
    summary:
      'Chimiquement, ces sucres se ressemblent — mais l’emballage change tout. Le fruit livre son sucre enveloppé de fibres et d’eau qui ralentissent l’absorption ; le sucre ajouté arrive vite et concentré. La différence tient à la dose et à la vitesse, pas à une molécule différente.',
    tags: ['santé', 'sucre', 'nutrition', 'alimentation'],
    language: 'fr',
    image: {
      prompt: promptOf('added-sugar'),
      alt: 'La lumière du sucre libérée lentement par un maillage de fibres face à un déversement rapide et concentré',
    },
    sources: [
      { title: 'École de santé publique Harvard T.H. Chan — sucre ajouté', url: 'https://www.hsph.harvard.edu/nutritionsource/carbohydrates/added-sugar-in-the-diet/' },
      { title: 'OMS — recommandation sur l’apport en sucres', url: 'https://www.who.int/news/item/04-03-2015-who-calls-on-countries-to-reduce-sugars-intake-among-adults-and-children' },
    ],
    content: `# Pourquoi le sucre ajouté est traité différemment du sucre naturel

Une objection courante au conseil « réduisez le sucre ajouté » sonne logique : *le sucre, c'est le sucre — le fruit en contient aussi, alors pourquoi l'un est-il acceptable et l'autre un méchant ?* C'est une question légitime, et la réponse n'est pas que les molécules diffèrent beaucoup. C'est que l'**emballage** autour du sucre — ainsi que la dose et la vitesse auxquelles il arrive — change complètement la façon dont votre corps le gère. C'est le contexte, pas la chimie, qui fait toute l'histoire.

## Même molécule, livraison différente

Les sucres d'une pomme et d'un soda sont en grande partie les mêmes composés (glucose et fructose). Mais une pomme les livre enveloppés de **fibres, d'eau et de volume** :

- **Les fibres ralentissent l'absorption**, si bien que le sucre s'écoule goutte à goutte dans le sang plutôt que de l'inonder — une montée plus douce, sans pic abrupt suivi d'un contrecoup.
- **L'eau et le volume créent de la satiété**, donc vous vous arrêtez ; un fruit entier est vraiment difficile à surconsommer.
- **Les nutriments accompagnent** — vitamines, minéraux, composés végétaux bénéfiques.

Retirez le sucre de cet emballage — comme dans un soda, un bonbon, ou même un jus de fruit — et il arrive vite, concentré, et facile à consommer en grande quantité, sans signal d'« arrêt ». Un verre de jus peut contenir le sucre de plusieurs fruits, moins les fibres qui rendaient le fruit auto-limitant. **Le problème n'a jamais été la molécule ; c'est la dose et la vitesse.**

## Pourquoi le sucre rapide et concentré est le problème

Quand le sucre déferle vite et souvent, les effets se cumulent :

| Mécanisme | Conséquence |
| --- | --- |
| Pics de glycémie rapides | Coups de barre, plus de fringales, tension à long terme sur la régulation du glucose |
| Surconsommation facile (pas de frein de satiété) | Calories en excès → prise de poids |
| Sucre liquide surtout | Des calories non enregistrées comme « nourriture », donc on ne mange pas moins pour compenser |
| Évince les aliments riches en nutriments | Moins de place pour ce dont le corps a besoin |

C'est pourquoi les recommandations de santé ciblent les sucres **ajoutés** et **libres** (ceux ajoutés lors de la transformation, plus ceux des jus et sirops) plutôt que le sucre intact des fruits et légumes entiers. L'OMS suggère de garder les sucres libres sous ~10 % des calories quotidiennes, idéalement sous 5 % — tandis que le fruit entier est largement encouragé.

## La conclusion pratique

Vous n'avez pas à craindre les fruits. L'emballage de fibres du fruit entier fait de son sucre un non-problème pour presque tout le monde. Le geste à forte valeur est de réduire le sucre **concentré et ajouté** — surtout les **boissons sucrées**, la première source pour bien des gens et la plus déconnectée de la satiété. Lisez les étiquettes pour les sucres ajoutés, traitez le jus davantage comme une gourmandise que comme un aliment santé, et laissez le fruit entier satisfaire l'envie de sucré.

## FAQ

**Le jus de fruit est-il aussi mauvais que le soda ?**
Nutritionnellement plus proche que son image saine ne le laisse croire — le jus a le sucre concentré sans les fibres, même s'il conserve quelques vitamines. Le fruit entier est nettement meilleur ; le jus se prend de préférence comme une boisson occasionnelle, pas un pilier quotidien.

**Les édulcorants naturels (miel, agave) sont-ils plus sains que le sucre ?**
Marginalement au mieux — le corps les traite de façon similaire. Ce sont toujours des sucres libres concentrés ; « naturel » ne change rien au problème de la dose et de la vitesse.

**Dois-je supprimer complètement le sucre ?**
Non — l'objectif est de réduire l'excès de sucre concentré/ajouté, pas d'éliminer toute douceur. Le fruit entier, et des gourmandises modérées au sein d'une alimentation par ailleurs bonne, sont parfaitement raisonnables.${NOTE}`,
  },
  {
    topicKey: 'immune-boosting-myth',
    title: 'Peut-on vraiment « booster » son système immunitaire ?',
    question: 'Des compléments ou des aliments peuvent-ils vraiment booster le système immunitaire, ou est-ce un mythe ?',
    summary:
      'On ne pousse pas l’immunité comme un curseur — un système immunitaire « boosté » n’est même pas souhaitable (ce sont les allergies et les maladies auto-immunes). Ce que vous pouvez faire, c’est soutenir un fonctionnement immunitaire normal par le sommeil, la nutrition, l’exercice et les vaccins.',
    tags: ['santé', 'immunité', 'compléments', 'bien-être'],
    language: 'fr',
    image: {
      prompt: promptOf('immune-boosting-myth'),
      alt: 'Un réseau de défense interne équilibré reposant sur des piliers de lumière fondamentaux',
    },
    sources: [
      { title: 'Harvard Health — comment « booster » son système immunitaire', url: 'https://www.health.harvard.edu/staying-healthy/how-to-boost-your-immune-system' },
      { title: 'NIH (NIAID) — vue d’ensemble du système immunitaire', url: 'https://www.niaid.nih.gov/research/immune-system-overview' },
    ],
    content: `# Peut-on vraiment « booster » son système immunitaire ?

« Booster l'immunité » est l'une des expressions les plus lucratives du marketing bien-être — estampillée sur compléments, tisanes, jus et poudres. Elle est aussi fondamentalement trompeuse. Le système immunitaire n'est pas un curseur unique que l'on pousse, et même si vous le pouviez, **vous ne le voudriez pas** — un système immunitaire suractif est précisément ce qui cause allergies, maladies auto-immunes et inflammation chronique. L'objectif réaliste et valable n'est pas de *booster* ; c'est de *soutenir un fonctionnement normal*.

## Pourquoi « booster » est le mauvais mot

Votre système immunitaire est un réseau vaste et complexe — de nombreux types de cellules, des organes et des molécules de signalisation, équilibrant en permanence deux modes d'échec : trop faible (les infections passent) et trop fort (il attaque votre propre corps ou des choses inoffensives comme le pollen). La santé, c'est l'**équilibre**, pas l'activation maximale. L'image marketing d'une immunité poussée en surrégime décrit quelque chose de plus proche d'une maladie que du bien-être.

Et chez une personne en bonne santé, aucun aliment ni pilule ne « survitamine » ce système. Une fois que vous n'êtes plus carencé dans les nutriments dont l'immunité a besoin, en ajouter davantage ne pousse pas la fonction au-dessus de la normale — la même logique de rendements décroissants que pour les vitamines. L'idée de la mégadose de vitamine C pour écraser un rhume a été abondamment testée, avec au mieux des effets modestes et incohérents.

## Ce qui soutient réellement la fonction immunitaire

Les fondamentaux peu glamour ont de vraies preuves — ils maintiennent le système en marche comme prévu :

| Levier | Pourquoi ça compte |
| --- | --- |
| **Sommeil** | Les processus immunitaires en dépendent ; un sommeil court augmente mesurablement la susceptibilité aux infections |
| **Nutrition équilibrée** | Les carences (zinc, vitamine D, protéines) affaiblissent la défense — comblez les manques, ne mégadosez pas |
| **Exercice régulier** | Une activité modérée soutient la surveillance immunitaire ; un surentraînement extrême et chronique peut au contraire la supprimer |
| **Ne pas fumer, limiter l'alcool** | Les deux altèrent les défenses immunitaires |
| **Gestion du stress** | Un stress chronique dérègle la signalisation immunitaire |
| **Vaccination** | Le seul véritable « entraînement » ciblé de l'immunité — de loin l'outil le plus efficace |

Remarquez que ces leviers *permettent un fonctionnement normal et comblent les déficits* — ils ne poussent pas un système sain au-delà de la normale. Il n'y a aucun gain au-dessus de « fonctionne correctement ».

## La seule vraie façon d'« améliorer » l'immunité

Si quelque chose mérite ce mot, ce sont les **vaccins** — et ils ne fonctionnent en rien comme un boost générique. Un vaccin *apprend* à votre système immunitaire à reconnaître à l'avance une menace précise, afin qu'il réponde vite et efficacement à ce pathogène. C'est un entraînement ciblé, pas un bouton de volume — la façon authentique et fondée sur des preuves d'améliorer votre défense contre des maladies particulières.

## FAQ

**La vitamine C prévient-elle les rhumes ?**
Pour la plupart des gens, une supplémentation régulière ne prévient pas les rhumes et, au mieux, les raccourcit légèrement. Sa réputation dépasse largement les preuves ; ce n'est pas le bouclier qu'on vous vend.

**Les compléments « stimulants de l'immunité » sont-ils une arnaque ?**
L'allégation est trompeuse par conception. Corriger une vraie carence aide ; « booster » un système déjà suffisant relève du marketing. Gardez l'argent pour le sommeil et les légumes — ou, contre des maladies précises, pour les vaccins.

**Pourquoi suis-je plus souvent malade quand je suis stressé ou en manque de sommeil ?**
Parce que les deux altèrent réellement la fonction immunitaire — c'est le revers du « soutien ». On ne peut pas facilement pousser l'immunité au-dessus de la normale, mais on peut tout à fait la traîner en dessous, et ce sont là les principaux moyens.${NOTE}`,
  },
];
