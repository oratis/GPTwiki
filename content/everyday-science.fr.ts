import type { DraftArticle } from './types';
import { everydayScienceEn } from './everyday-science.en';

// Batch : Everyday Science (version française native). Mêmes sujets et mêmes
// topicKey que everyday-science.en.ts, contenu rédigé nativement pour le
// lecteur francophone. Illustrations partagées.

const promptOf = (key: string): string => {
  const hit = everydayScienceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const everydayScienceFr: DraftArticle[] = [
  {
    topicKey: 'why-sky-is-blue',
    title: 'Pourquoi le ciel est-il bleu ?',
    question: 'Pourquoi le ciel est-il bleu le jour et rouge au coucher du soleil ?',
    summary:
      'La lumière du soleil est blanche — un mélange de toutes les couleurs — mais l’air diffuse ses courtes longueurs d’onde bleues bien plus que les rouges, peignant tout le ciel en bleu. Au crépuscule, la lumière traverse plus d’air, le bleu est dispersé, et les rouges restants atteignent vos yeux.',
    tags: ['science', 'physique', 'lumière', 'nature'],
    language: 'fr',
    image: { prompt: promptOf('why-sky-is-blue'), alt: 'Lumière blanche traversant une atmosphère de verre, ses rayons bleus diffusés en tous sens' },
    sources: [
      { title: 'NASA Science — Pourquoi le ciel est-il bleu ?', url: 'https://spaceplace.nasa.gov/blue-sky/en/' },
      { title: 'NOAA — Diffusion de la lumière et optique atmosphérique', url: 'https://www.noaa.gov/' },
    ],
    content: `# Pourquoi le ciel est-il bleu ?

Le ciel est bleu à cause d’un bras de fer entre la lumière du soleil et l’air. La lumière du soleil paraît blanche, mais c’est en réalité un mélange de toutes les couleurs de l’arc-en-ciel réunies. Lorsque cette lumière se déverse à travers l’atmosphère, les molécules de gaz de l’air la **diffusent** — la renvoient dans de nouvelles directions — et voici le fait essentiel : elles diffusent les courtes longueurs d’onde bleues bien plus fortement que les longues longueurs d’onde rouges. Le bleu est donc projeté dans tout le ciel, et quand vous levez les yeux, le bleu vous parvient de toutes les directions. La voûte entière rayonne de bleu.

## La physique, en douceur

La lumière se propage sous forme d’ondes, et les couleurs diffèrent par leur **longueur d’onde** : le rouge a de longues ondes, le bleu et le violet de courtes. Quand la lumière rencontre quelque chose de bien plus petit que sa longueur d’onde — comme une molécule d’azote ou d’oxygène — elle se diffuse d’une manière qui favorise fortement les plus courtes longueurs d’onde. L’effet (nommé diffusion Rayleigh, d’après le physicien qui l’a expliqué) est spectaculaire : le bleu se diffuse plusieurs fois plus que le rouge. Le ciel est essentiellement de la lumière bleue qui a été renvoyée d’innombrables fois dans l’atmosphère avant d’atteindre votre œil.

## Deux questions qui viennent naturellement

**Si le bleu se diffuse le plus, pourquoi le ciel n’est-il pas violet ?** Le violet a une longueur d’onde encore plus courte et se diffuse encore davantage — mais il y a au départ moins de violet dans la lumière du soleil, et vos yeux sont plus sensibles au bleu qu’au violet. Le mélange que perçoit votre cerveau se fixe sur le bleu.

**Et pourquoi le soleil lui-même est-il jaunâtre ?** Parce que le bleu a été diffusé *hors* du faisceau direct. La lumière venant tout droit du soleil a perdu une partie de son bleu au profit du ciel, ce qui laisse le disque solaire d’un blanc jaunâtre.

## Pourquoi les couchers de soleil virent au rouge

Au crépuscule, le soleil est bas, si bien que sa lumière effleure une **couche d’atmosphère bien plus épaisse** pour vous parvenir. Sur ce long trajet, pratiquement tout le bleu (et une bonne part du vert) est diffusé hors du faisceau avant d’arriver. Ce qui parvient encore à vos yeux, ce sont les longues longueurs d’onde — rouges et oranges — d’où ces couleurs chaudes qui embrasent le soleil couchant et les nuages qui l’entourent. La même diffusion qui rend le ciel bleu à midi le rend rouge au coucher ; seule la longueur du trajet a changé.

## FAQ

**Pourquoi le ciel est-il noir dans l’espace ?**
Parce qu’il n’y a pas d’air pour diffuser la lumière du soleil. Les astronautes voient le soleil et les étoiles se découper sur un noir absolu, même en plein jour — sans atmosphère, pas de bleu.

**Cela explique-t-il pourquoi l’océan est bleu ?**
En partie, mais pas tout à fait. Le bleu du ciel se reflète sur l’eau, mais l’eau profonde *absorbe* aussi le rouge et diffuse le bleu par elle-même, de sorte que l’océan est bleu pour des raisons qui se superposent.

**Pourquoi les nuages sont-ils blancs et non bleus ?**
Les gouttelettes des nuages sont bien plus grosses que les molécules d’air, si bien qu’elles diffusent *toutes* les couleurs à peu près également. Toutes les couleurs remélangées donnent du blanc.`,
  },
  {
    topicKey: 'how-vaccines-work',
    title: 'Comment les vaccins fonctionnent-ils réellement ?',
    question: 'Comment les vaccins entraînent-ils le système immunitaire à nous protéger ?',
    summary:
      'Un vaccin montre à votre système immunitaire un aperçu inoffensif d’un microbe pour qu’il apprenne à le reconnaître d’avance. Il fabrique ensuite des cellules mémoire qui retiennent la menace des années durant : une vraie infection est alors vaincue vite, souvent avant que vous vous sentiez malade.',
    tags: ['science', 'biologie', 'système immunitaire', 'santé'],
    language: 'fr',
    image: { prompt: promptOf('how-vaccines-work'), alt: 'Sentinelles immunitaires étudiant une réplique inoffensive d’un microbe et conservant des badges mémoire' },
    sources: [
      { title: 'CDC (Centres américains de contrôle des maladies) — Comprendre comment les vaccins fonctionnent', url: 'https://www.cdc.gov/vaccines/hcp/conversations/understanding-vacc-work.html' },
      { title: 'OMS (Organisation mondiale de la santé) — Comment les vaccins fonctionnent-ils ?', url: 'https://www.who.int/news-room/feature-stories/detail/how-do-vaccines-work' },
    ],
    content: `# Comment les vaccins fonctionnent-ils réellement ?

Un vaccin fonctionne en **apprenant à votre système immunitaire à reconnaître un microbe avant même que vous ne rencontriez le vrai.** Votre système immunitaire est déjà brillant pour combattre les infections — mais la première fois qu’il rencontre un nouveau microbe, il est lent, il apprend sur le tas pendant que vous tombez malade. Un vaccin saute cette dangereuse première leçon : il montre à votre corps un aperçu sûr de la menace, de sorte que si le vrai microbe se présente un jour, vos défenses sachent déjà exactement quoi faire et l’écrasent rapidement.

## Ce que contient réellement l’aperçu

Un vaccin contient quelque chose qui *ressemble* à un microbe précis aux yeux de votre système immunitaire mais qui **ne peut pas vous rendre malade.** Selon le vaccin, il peut s’agir :

- d’une version affaiblie ou inactivée du microbe,
- simplement d’un fragment inoffensif de celui-ci (une protéine de surface), ou
- d’instructions (comme l’ARNm) qui ordonnent à vos propres cellules de fabriquer brièvement un fragment inoffensif du microbe, afin que votre système immunitaire l’étudie.

Dans tous les cas, le principe est identique : présenter au système immunitaire la « forme » reconnaissable du microbe (un antigène) sans le danger.

## Reconnaître, répondre, retenir

Lorsque votre système immunitaire voit cet antigène, il fait trois choses :

1. Il le **reconnaît** comme étranger.
2. Il **répond** en produisant des anticorps — des protéines taillées sur mesure pour s’accrocher à ce microbe précis — et en activant des cellules qui détruisent les cellules infectées.
3. Il le **retient**, en créant des **cellules mémoire** de longue durée.

Cette troisième étape est tout l’enjeu. Ces cellules mémoire peuvent persister des années, voire des décennies. Si le vrai microbe envahit un jour, elles le reconnaissent instantanément et déclenchent une riposte rapide et massive — souvent en vainquant l’infection avant que vous ne remarquiez le moindre symptôme. Vous avez obtenu l’immunité sans avoir eu à survivre d’abord à la maladie.

## Pourquoi il faut parfois plus d’une dose, et pourquoi un bras endolori est normal

Certains vaccins nécessitent plusieurs doses ou des rappels, parce que la mémoire immunitaire peut être renforcée par une exposition répétée, ou qu’elle peut s’estomper avec le temps et avoir besoin d’un complément. Et la légère douleur, la fatigue ou la fièvre modérée que certains ressentent ensuite, ce n’est pas le microbe — c’est votre système immunitaire *qui fait son travail*, montant en puissance face à l’aperçu. Une réaction est le signe que l’entraînement fonctionne, pas que vous êtes malade.

## FAQ

**Un vaccin peut-il me donner la maladie qu’il prévient ?**
Les vaccins standard ne peuvent pas causer la maladie — ils ne contiennent aucun microbe vivant et capable (ou seulement une forme affaiblie incapable de rendre malade une personne en bonne santé). Ce que vous pouvez ressentir est la réponse immunitaire, et non une infection.

**Qu’est-ce que l’« immunité collective » ?**
Quand assez de personnes dans une communauté sont immunisées, le microbe peine à trouver de nouveaux hôtes et à se propager, ce qui protège indirectement ceux qui ne peuvent pas être vaccinés (nouveau-nés, personnes atteintes de certaines maladies). La protection devient collective.

**Pourquoi certains vaccins durent-ils toute la vie et d’autres exigent-ils des rappels ?**
Cela dépend du microbe et de la durabilité de la réponse mémoire, et de savoir si le microbe mute (comme la grippe) au point que l’entraînement de l’an dernier ne corresponde plus à la version de cette année. Certaines menaces sont stables, d’autres ne cessent de changer.`,
  },
  {
    topicKey: 'why-seasons-happen',
    title: 'Qu’est-ce qui cause réellement les saisons ?',
    question: 'Qu’est-ce qui cause les saisons — la Terre est-elle plus proche du soleil en été ?',
    summary:
      'Les saisons ne sont pas dues à la distance au soleil — un mythe répandu. Elles existent parce que la Terre est inclinée sur son axe : chaque hémisphère penche vers le soleil la moitié de l’année (été) et s’en éloigne l’autre moitié (hiver), changeant la façon dont la lumière frappe le sol.',
    tags: ['science', 'astronomie', 'Terre', 'nature'],
    language: 'fr',
    image: { prompt: promptOf('why-seasons-happen'), alt: 'Globe incliné en orbite, un hémisphère frappé directement par le soleil et l’autre en oblique' },
    sources: [
      { title: 'NASA Science — Qu’est-ce qui cause les saisons ?', url: 'https://spaceplace.nasa.gov/seasons/en/' },
      { title: 'NOAA — L’inclinaison de la Terre et les saisons', url: 'https://www.noaa.gov/' },
    ],
    content: `# Qu’est-ce qui cause réellement les saisons ?

Dissipons d’emblée l’idée fausse la plus répandue en science : **les saisons ne sont pas dues au fait que la Terre se rapproche ou s’éloigne du soleil.** En réalité, la Terre est légèrement *plus proche* du soleil en janvier — pendant l’hiver de l’hémisphère Nord. Si la distance en était la cause, la planète entière connaîtrait l’été et l’hiver en même temps. Ce n’est pas le cas : quand c’est l’été en Australie, c’est l’hiver au Canada. La vraie cause, c’est l’**inclinaison** de la Terre.

## L’inclinaison fait tout

La Terre tourne sur un axe incliné d’environ 23,5 degrés par rapport à son orbite autour du soleil. Cette inclinaison reste pointée dans la même direction de l’espace toute l’année tandis que la Terre fait le tour du soleil. Ainsi, pendant la moitié de l’orbite, l’hémisphère Nord penche *vers* le soleil, et pendant l’autre moitié il s’en *éloigne* — et l’hémisphère Sud fait l’inverse. Ce seul fait produit tout ce que nous appelons les saisons.

## Pourquoi l’inclinaison réchauffe ou refroidit

Pencher vers le soleil change le temps qu’il fait de deux manières qui se renforcent :

- **La verticalité de la lumière.** Quand votre hémisphère penche vers le soleil, la lumière frappe le sol plus **directement** — concentrée, comme une lampe de poche pointée droit vers le bas. Quand il s’en éloigne, la même lumière arrive sous un **angle rasant**, étalée en mince couche sur une plus grande surface, si bien que chaque parcelle de sol reçoit moins d’énergie. La lumière directe chauffe bien plus efficacement que la lumière oblique.
- **La durée du jour.** L’inclinaison signifie aussi que le soleil reste au-dessus de l’horizon **plus longtemps** en été, d’où plus d’heures de chauffe et moins d’heures de refroidissement nocturne.

Une lumière plus concentrée, pendant plus d’heures chaque jour, cela fait l’été. Une lumière oblique pendant moins d’heures, cela fait l’hiver.

## Pourquoi cela explique tout le reste

- **Hémisphères opposés, saisons opposées :** quand le Nord penche vers le soleil, le Sud s’en éloigne — leurs saisons sont donc toujours inversées.
- **L’équateur n’a presque pas de saisons :** il reste à peu près de profil face au soleil toute l’année, si bien que la lumière y est toujours assez directe — d’où une chaleur constante.
- **Les pôles connaissent des mois de jour ou de nuit :** l’inclinaison extrême fait qu’en été le soleil ne se couche jamais complètement, et qu’en hiver il ne se lève jamais complètement.

## FAQ

**Donc la distance de la Terre au soleil ne joue aucun rôle ?**
Son orbite n’est que légèrement ovale, si bien que la variation de distance est faible et largement dominée par l’effet de l’inclinaison. Ce n’est pas nul, mais c’est une influence mineure comparée à l’angle de la lumière.

**Pourquoi la chaleur la plus forte arrive-t-elle généralement après le jour le plus long ?**
Ce « décalage saisonnier » se produit parce que les terres et les océans mettent des semaines à absorber la chaleur et à se réchauffer. Le pic de lumière reçue est le solstice, mais le pic de chaleur accumulée vient un mois ou deux plus tard.

**Qu’est-ce qu’un solstice ou un équinoxe ?**
Les solstices sont les deux moments d’inclinaison maximale vers ou loin du soleil (les jours les plus longs et les plus courts) ; les équinoxes sont les deux moments intermédiaires où l’inclinaison est de profil et où le jour et la nuit sont presque égaux partout.`,
  },
  {
    topicKey: 'why-we-dream',
    title: 'Pourquoi rêvons-nous ?',
    question: 'Pourquoi rêvons-nous, et les rêves ont-ils vraiment un sens ?',
    summary:
      'Personne ne connaît la réponse complète, mais la science suggère que les rêves ne sont pas aléatoires : ils aideraient à consolider les souvenirs, traiter les émotions, répéter des situations. Les plus vifs surviennent en sommeil paradoxal, quand le cerveau est presque aussi actif qu’éveillé.',
    tags: ['science', 'neurosciences', 'sommeil', 'cerveau'],
    language: 'fr',
    image: { prompt: promptOf('why-we-dream'), alt: 'Cerveau endormi qui rejoue et classe des fragments de mémoire par émotion' },
    sources: [
      { title: 'Institut national des troubles neurologiques et de l’AVC (NIH) — Notions de base sur le cerveau : le sommeil', url: 'https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-understanding-sleep' },
      { title: 'Sleep Foundation — Pourquoi rêvons-nous ?', url: 'https://www.sleepfoundation.org/dreams' },
    ],
    content: `# Pourquoi rêvons-nous ?

Soyons honnêtes d’emblée : **la science ne sait pas vraiment pourquoi nous rêvons** — c’est l’une des authentiques énigmes du cerveau encore non résolues. Mais « nous ne savons pas tout » ne veut pas dire « nous ne savons rien ». Les chercheurs ont des théories solides, étayées par des preuves, et elles pointent dans une direction cohérente : les rêves ne sont probablement pas du bruit dénué de sens. Ils semblent être un sous-produit — voire une fonction — de l’indispensable maintenance nocturne que votre cerveau effectue pendant que vous dormez.

## Quand surviennent les rêves

Le sommeil passe par plusieurs stades, et les rêves les plus vifs, les plus narratifs, se concentrent dans un stade appelé **sommeil paradoxal** (REM, pour mouvements oculaires rapides), où — étrangement — votre cerveau est presque aussi actif qu’à l’éveil, alors même que votre corps est temporairement paralysé (ce qui vous empêche fort à propos de mimer vos rêves). Vous traversez plusieurs phases de sommeil paradoxal par nuit, et ces phases s’allongent vers le matin, raison pour laquelle vous vous réveillez souvent en plein rêve. Vous rêvez aussi dans les stades plus légers, hors sommeil paradoxal, mais ces rêves-là tendent à être plus flous.

## Les principales théories

Aucune théorie ne l’a emporté, et elles pourraient toutes avoir en partie raison :

| Théorie | L’idée |
| --- | --- |
| **Consolidation de la mémoire** | Rêver aide à trier les expériences de la journée, à renforcer les souvenirs importants et à élaguer le reste |
| **Traitement des émotions** | Les rêves permettent de revivre et de désamorcer des événements émotionnels dans un état sûr, « hors ligne » |
| **Répétition des menaces/du social** | Rêver simule des défis (dangers, situations sociales) pour vous préparer à mieux affronter les vrais |
| **Le cerveau donnant du sens au bruit** | En sommeil paradoxal, le cerveau décharge de façon semi-aléatoire, et le rêve est sa tentative d’en tisser une histoire |

Remarquez que ces théories se chevauchent plutôt qu’elles ne s’opposent : le cerveau pourrait classer des souvenirs, traiter des émotions, *et* filer un récit à partir de cette activité, tout à la fois.

## Les rêves « veulent-ils » dire quelque chose ?

Pas au sens de la voyance — rien ne prouve que les rêves prédisent l’avenir ou portent des symboles cachés universels. Mais ils ne sont pas aléatoires non plus : leur contenu puise largement dans vos expériences récentes, vos soucis et vos émotions, si bien qu’un rêve peut réellement refléter ce qui vous préoccupe. Le sens, quand il y en a un, est personnel et émotionnel, et non un code à déchiffrer dans un dictionnaire des rêves.

## FAQ

**Pourquoi est-ce que j’oublie mes rêves si vite ?**
Le cerveau ne donne pas priorité au stockage des rêves en mémoire à long terme, et la chimie du sommeil paradoxal n’est pas idéale pour la formation des souvenirs. Les rêves s’effacent en quelques minutes après le réveil, sauf si vous vous les remémorez aussitôt — d’où l’utilité du carnet posé sur la table de chevet.

**Tout le monde rêve-t-il ?**
Presque certainement oui — on pense que les personnes affirmant ne jamais rêver ne s’en souviennent simplement pas. Les études du sommeil montrent une activité de sommeil paradoxal même chez ceux qui disent ne pas rêver.

**À quoi servent les cauchemars ?**
Ils sont peut-être le système de traitement des émotions ou de répétition des menaces poussé à l’excès, souvent déclenché par le stress ou un traumatisme. Des cauchemars occasionnels sont normaux ; des cauchemars fréquents et angoissants méritent d’être abordés avec un professionnel.`,
  },
  {
    topicKey: 'how-planes-fly',
    title: 'Comment les avions restent-ils vraiment en l’air ?',
    question: 'Comment des avions lourds génèrent-ils assez de portance pour voler ?',
    summary:
      'Une aile génère de la portance en déviant l’air vers le bas : d’après la troisième loi de Newton, pousser l’air vers le bas pousse l’aile vers le haut. Sa forme et son inclinaison font aussi que l’air du dessus s’écoule plus vite, à pression plus basse. Ensemble, cela soutient des tonnes de métal.',
    tags: ['science', 'physique', 'vol', 'fonctionnement'],
    language: 'fr',
    image: { prompt: promptOf('how-planes-fly'), alt: 'Aile en coupe déviant le flux d’air vers le bas tandis qu’une force de portance s’élève' },
    sources: [
      { title: 'NASA Glenn — Comment les ailes soulèvent l’avion / Dynamique du vol', url: 'https://www.grc.nasa.gov/www/k-12/airplane/lift1.html' },
      { title: 'NASA — Les quatre forces du vol', url: 'https://www.nasa.gov/audience/foreducators/k-4/features/F_Four_Forces_of_Flight.html' },
    ],
    content: `# Comment les avions restent-ils vraiment en l’air ?

Cela semble presque incroyable qu’une chose aussi lourde qu’un avion de ligne chargé puisse flotter sur l’air ténu — pourtant le principe relève d’une physique solide. Le rôle d’une aile est de générer de la **portance**, une force vers le haut assez grande pour vaincre le poids de l’avion, et elle y parvient par une astuce fondamentale : **elle pousse l’air vers le bas.** D’après la troisième loi de Newton — toute action entraîne une réaction égale et opposée —, pousser une énorme quantité d’air vers le *bas* fait que l’air pousse l’aile vers le *haut*. Gardez cette idée en tête, et le reste n’est que détail.

## Deux façons de décrire la même portance

Les physiciens expliquent la portance d’une aile sous deux angles qui, au fond, s’accordent :

- **Le point de vue de Newton (l’air est dévié vers le bas).** Une aile est légèrement inclinée et profilée de sorte que l’air qui s’écoule le long d’elle est dévié vers le **bas** lorsqu’il quitte le bord de fuite. L’aile projette un flux d’air continu vers le bas ; la force de réaction pousse l’aile vers le haut. Plus d’air dévié, ou dévié plus fort, signifie plus de portance.
- **Le point de vue de la pression (air plus rapide, pression plus basse).** En raison de la forme et de l’angle de l’aile, l’air s’écoule **plus vite au-dessus** qu’en dessous. Un air plus rapide a une *pression plus basse* (principe de Bernoulli), si bien que la pression qui pousse vers le haut par-dessous est plus forte que celle qui pousse vers le bas par-dessus — d’où une force nette vers le haut.

Ce ne sont pas des explications rivales ; ce sont deux descriptions cohérentes d’un seul phénomène. Les deux se produisent, et toutes deux produisent la même portance.

## Ce qui détermine la quantité de portance

Trois leviers, que pilotes et ingénieurs utilisent tous :

- **La vitesse :** un flux d’air plus rapide sur l’aile signifie bien plus de portance — c’est pourquoi les avions doivent accélérer sur une longue piste avant de pouvoir décoller, et pourquoi ils atterrissent lentement avec une aide supplémentaire.
- **La surface et la forme de l’aile :** de plus grandes ailes déplacent plus d’air ; le profil incurvé est réglé pour dévier l’air efficacement.
- **L’angle d’attaque :** relever le « nez » de l’aile dans le flux d’air augmente la portance — jusqu’à une certaine limite. Inclinez trop fort et le flux d’air régulier décroche, la portance s’effondre, et l’aile « décroche ».

C’est aussi pourquoi vous voyez les volets se déployer des ailes au décollage et à l’atterrissage : ils agrandissent et recourbent temporairement l’aile pour arracher un surcroît de portance à basse vitesse.

## FAQ

**La vieille explication « le dessus est plus long, donc l’air doit accélérer pour suivre » était-elle fausse ?**
Cette histoire populaire (l’idée du « temps de transit égal ») est une simplification erronée — l’air au-dessus va effectivement plus vite, mais pas pour cette raison, et les ailes volent même à l’envers. Le noyau fiable est : les ailes dévient l’air vers le bas, et la pression est plus basse au-dessus.

**Qu’est-ce qui maintient l’avion en mouvement vers l’avant ?**
Les moteurs fournissent la **poussée**, vainquant la **traînée** (la résistance de l’air). La portance combat le poids ; la poussée combat la traînée. Voler, c’est l’équilibre de ces quatre forces.

**Comment les planeurs volent-ils sans moteur ?**
Ils échangent de l’altitude contre de la vitesse, descendant doucement à travers l’air de sorte que le flux continue de produire de la portance — et ils chevauchent les courants ascendants pour reprendre de la hauteur. Pas besoin de moteur, juste du mouvement de l’air.`,
  },
  {
    topicKey: 'why-ice-floats',
    title: 'Pourquoi la glace flotte-t-elle (alors que presque tout le reste coule) ?',
    question: 'Pourquoi la glace flotte-t-elle sur l’eau alors que la plupart des solides coulent dans leur propre liquide ?',
    summary:
      'L’eau est étrange : elle se dilate en gelant. Ses molécules s’emboîtent en un cristal ouvert et spacieux tenu par des liaisons hydrogène, rendant la glace environ 9 % moins dense que l’eau liquide — d’où sa flottaison. Ce caprice fait geler les lacs par le haut et laisse la vie survivre dessous.',
    tags: ['science', 'chimie', 'eau', 'nature'],
    language: 'fr',
    image: { prompt: promptOf('why-ice-floats'), alt: 'Réseau hexagonal ouvert de glace flottant sur des molécules d’eau liquide densément serrées' },
    sources: [
      { title: 'USGS (Institut d’études géologiques des États-Unis) — Densité de l’eau et glace', url: 'https://www.usgs.gov/special-topics/water-science-school/science/water-density' },
      { title: 'Royal Society of Chemistry — Les liaisons hydrogène dans l’eau', url: 'https://edu.rsc.org/' },
    ],
    content: `# Pourquoi la glace flotte-t-elle (alors que presque tout le reste coule) ?

La glace qui flotte dans votre verre est si familière qu’on en oublie facilement à quel point c’est *bizarre*. Pour presque toutes les autres substances sur Terre, la forme solide est **plus dense** que la liquide — laissez tomber de la cire solide dans de la cire fondue, elle coule. L’eau enfreint cette règle : l’eau solide (la glace) est **moins** dense que l’eau liquide, donc elle flotte. La raison tient à une propriété singulière de la molécule d’eau, et cette singularité se trouve être l’une des raisons pour lesquelles la vie sur Terre survit à l’hiver.

## La densité, en une phrase

Qu’une chose flotte ou non se résume à la **densité** — la quantité de masse tassée dans un espace donné. On flotte si l’on est moins dense que le liquide alentour ; on coule si l’on est plus dense. La vraie question est donc : pourquoi la congélation fait-elle *gonfler* l’eau et la rend-elle moins dense, alors que la congélation fait se contracter la plupart des choses ?

## L’architecture ouverte de la glace

Les molécules d’eau sont légèrement déséquilibrées en charge, ce qui leur permet de s’accrocher les unes aux autres par de faibles attractions appelées **liaisons hydrogène.** Dans l’eau liquide, les molécules se bousculent, glissent et se tassent assez étroitement en permanence. Mais quand l’eau gèle, ces liaisons hydrogène verrouillent les molécules en un **cristal** rigide et hautement **ordonné** — et, crucialement, ce cristal est *spacieux*. Pour satisfaire toutes leurs liaisons, les molécules s’agencent en un réseau hexagonal ouvert, avec des vides intégrés à la structure. Les molécules de la glace sont en fait tenues, en moyenne, *plus éloignées les unes des autres* que dans l’eau liquide.

Plus d’espace entre les mêmes molécules signifie moins de masse par volume — la glace est environ **9 % moins dense** que l’eau liquide. C’est exactement pourquoi un glaçon flotte avec environ un dixième de lui-même au-dessus de la surface, et pourquoi un même volume d’eau se dilate et peut fissurer des canalisations en gelant.

## Pourquoi ce caprice compte pour la vie

Parce que la glace flotte, l’eau gèle de **haut en bas**. Un étang se couvre d’abord de glace en surface, et cette couche de glace flottante agit comme une couverture isolante, ralentissant la suite du gel et maintenant liquide l’eau du dessous. Poissons, plantes et autres formes de vie survivent à l’hiver dans cette couche liquide en dessous. Si la glace coulait, lacs et même océans gèleraient en bloc de bas en haut, et la vie aquatique telle que nous la connaissons n’aurait peut-être jamais traversé les saisons froides. Un petit accident moléculaire a de très grandes conséquences.

## FAQ

**L’eau est-elle la plus dense au point de congélation ?**
Non — et c’est une autre bizarrerie. L’eau est la plus dense vers 4 °C, légèrement *au-dessus* du point de congélation. En refroidissant au-delà, vers 0 °C, elle se dilate en fait un peu avant de se transformer en glace, ce qui explique pourquoi l’eau la plus froide d’un lac se trouve en surface.

**L’eau salée gèle-t-elle et flotte-t-elle de la même façon ?**
La glace de mer flotte quand même (elle est moins dense que l’eau de mer), mais le sel abaisse le point de congélation de l’eau et change les détails. La glace pure qui se forme exclut en grande partie le sel.

**Pourquoi ajouter de la glace refroidit-il si bien une boisson ?**
Outre le fait d’être froide, la glace qui fond *absorbe* beaucoup de chaleur du liquide pour rompre ces liaisons hydrogène en se transformant en eau — soutirant ainsi de l’énergie à votre boisson au passage.`,
  },
  {
    topicKey: 'how-soap-works',
    title: 'Comment le savon nettoie-t-il réellement ?',
    question: 'Comment le savon élimine-t-il la graisse et les germes que l’eau seule ne peut pas enlever ?',
    summary:
      'Les molécules de savon ont une double personnalité : une extrémité adore l’eau, l’autre s’agrippe à la graisse. Elles entourent la saleté grasse et les germes, les décollent des surfaces et laissent l’eau tout rincer — ce qui explique aussi l’efficacité du savon contre de nombreux virus.',
    tags: ['science', 'chimie', 'hygiène', 'fonctionnement'],
    language: 'fr',
    image: { prompt: promptOf('how-soap-works'), alt: 'Molécules de savon à deux extrémités enrobant une gouttelette de graisse pour la soulever dans l’eau' },
    sources: [
      { title: 'Royal Society of Chemistry — Comment le savon fonctionne (les tensioactifs)', url: 'https://edu.rsc.org/' },
      { title: 'CDC — La science vous le montre : pourquoi se laver les mains ?', url: 'https://www.cdc.gov/handwashing/why-handwashing.html' },
    ],
    content: `# Comment le savon nettoie-t-il réellement ?

Vous connaissez déjà le problème que le savon résout : l’eau seule est désespérante face à la graisse. Rincez une poêle grasse sous le robinet et l’huile perle simplement et reste en place. C’est parce que la graisse et l’eau, c’est notoire, ne se mélangent pas. Le savon fonctionne en jouant les habiles **entremetteurs moléculaires** — il fait le pont entre l’eau et la graisse, de sorte que l’eau puisse enfin emporter la graisse (et les germes qui y voyagent).

## La molécule à deux visages

Le secret réside dans la forme d’une molécule de savon. Chacune ressemble à un minuscule têtard doté de deux extrémités très différentes :

- une **tête** qui est *hydrophile* — « qui aime l’eau ». Elle se lie volontiers à l’eau.
- une longue **queue** qui est *hydrophobe* — « qui craint l’eau » — mais qui adore s’accrocher à l’huile et à la graisse.

Cette double personnalité est toute l’astuce. Quand vous faites mousser sur une surface grasse, les molécules de savon s’organisent : leurs queues qui aiment la graisse s’enfouissent dans l’huile, et leurs têtes qui aiment l’eau pointent vers l’extérieur, vers l’eau.

## Entourer, soulever et rincer

Des milliers de molécules de savon s’agglutinent autour d’une gouttelette de graisse, queues vers l’intérieur, têtes vers l’extérieur, jusqu’à ce que la boule grasse soit entièrement emballée dans une sphère à la surface extérieure compatible avec l’eau. Ces petites sphères s’appellent des **micelles.** Désormais, la graisse jadis repoussante possède une coque qui aime l’eau — si bien qu’au rinçage, l’eau courante saisit ces micelles et emporte tout le paquet, graisse et saleté piégée comprises, dans le tuyau d’évacuation. Le savon n’a pas dissous la graisse ; il l’a *emballée* pour que l’eau puisse l’emporter.

## Pourquoi cela détruit aussi de nombreux germes

La même propriété fait du savon un héros discret de l’hygiène. De nombreux germes — dont les coronavirus et d’autres virus enveloppés — sont entourés d’une **membrane grasse** extérieure. Les queues du savon qui aiment la graisse s’insinuent dans cet enrobage gras et le déchirent, mettant le germe en pièces, tandis que les micelles soulèvent aussi les germes de votre peau pour les rincer. Voilà pourquoi **20 secondes de frottage avec un simple savon** sont si efficaces : vous ne faites pas que rincer les germes, vous en démantelez chimiquement beaucoup. L’action mécanique du frottement compte aussi — elle déloge ce qui est collé.

## FAQ

**L’eau doit-elle être chaude ?**
Pas vraiment — l’eau tiède peut aider à dissoudre certaines graisses plus vite et est plus confortable, mais le savon fait son travail chimique à toute température raisonnable. La durée d’un frottage minutieux compte plus que la chaleur.

**Le savon antibactérien vaut-il mieux que le savon ordinaire ?**
Pour le lavage des mains au quotidien, le savon ordinaire fonctionne tout aussi bien pour éliminer et détruire les germes, et les agences de santé ne trouvent généralement pas les savons antibactériens courants plus efficaces. Le mécanisme « savon et frottage » est l’élément clé.

**En quoi un détergent diffère-t-il du savon ?**
Les détergents reposent exactement sur le même principe à deux extrémités (ce sont aussi des « tensioactifs »), mais ils sont synthétisés pour mieux fonctionner en eau dure et à diverses températures. Même idée, conçue pour des conditions plus rudes.`,
  },
  {
    topicKey: 'what-causes-rainbows',
    title: 'Qu’est-ce qui cause un arc-en-ciel ?',
    question: 'Comment se forment les arcs-en-ciel, et pourquoi les couleurs sont-elles toujours dans le même ordre ?',
    summary:
      'Un arc-en-ciel, c’est la lumière du soleil courbée et décomposée dans les gouttes de pluie. Chaque goutte agit comme un petit prisme, séparant la lumière blanche en ses couleurs et vous les renvoyant. La géométrie fixe l’ordre des couleurs et courbe le tout en un arc centré à l’opposé du soleil.',
    tags: ['science', 'physique', 'lumière', 'météo'],
    language: 'fr',
    image: { prompt: promptOf('what-causes-rainbows'), alt: 'Lumière blanche entrant dans une goutte de pluie et ressortant décomposée en couleurs spectrales ordonnées' },
    sources: [
      { title: 'NOAA SciJinks — Comment se forment les arcs-en-ciel ?', url: 'https://scijinks.gov/rainbow/' },
      { title: 'NASA Science — La lumière et le spectre électromagnétique', url: 'https://science.nasa.gov/ems/' },
    ],
    content: `# Qu’est-ce qui cause un arc-en-ciel ?

Un arc-en-ciel est un tour de lumière et d’eau — plus précisément, **la lumière du soleil courbée, décomposée et renvoyée vers vous par des millions de gouttes de pluie.** Ce n’est pas un objet situé en un lieu où l’on pourrait marcher ; c’est un effet optique qui dépend entièrement de l’endroit où se trouvent le soleil, la pluie et *vos yeux*. Voilà pourquoi vous ne pouvez jamais atteindre le bout d’un arc-en-ciel, et pourquoi la personne à côté de vous en voit un légèrement différent : chaque arc-en-ciel est fabriqué sur mesure pour celui qui le regarde.

## Ce qui se passe à l’intérieur d’une seule goutte de pluie

Suivez un rayon de soleil entrant dans une goutte de pluie sphérique :

1. **Il se courbe en entrant.** La lumière ralentit et change de direction en passant de l’air à l’eau (réfraction). Surtout, les différentes couleurs se courbent dans des proportions légèrement différentes — le violet le plus, le rouge le moins.
2. **Il se réfléchit au fond.** Le rayon atteint la surface intérieure opposée de la goutte et rebondit.
3. **Il se courbe à nouveau en sortant** — et à ce stade, les couleurs, chacune courbée deux fois, se sont déployées en éventail sur tout le spectre.

Ainsi, chaque goutte de pluie absorbe la lumière blanche du soleil et renvoie une petite gerbe de couleurs séparées. Un arc-en-ciel est ce que vous voyez quand des millions de gouttes font cela à la fois, chacune apportant une couleur à votre œil selon sa position dans le ciel.

## Pourquoi les couleurs sont toujours dans le même ordre

Parce que l’ampleur de la courbure est fixée par la physique, **le rouge se retrouve toujours sur le bord extérieur de l’arc et le violet sur le bord intérieur**, avec l’orange, le jaune, le vert et le bleu entre les deux — à chaque fois. L’ordre ne se mélange jamais, car il est déterminé par le degré de réfraction de chaque longueur d’onde. La séquence familière (rouge, orange, jaune, vert, bleu, violet) n’est rien d’autre que le spectre, classé par longueur d’onde.

## Pourquoi c’est un arc, et toujours à l’opposé du soleil

La géométrie ne fonctionne qu’à un angle précis — la lumière revient le plus intensément à votre œil à environ **42 degrés** du point directement opposé au soleil. Toutes les directions à ce même angle tracent un cercle, que vous voyez comme l’arc familier (le sol en cache d’ordinaire la moitié inférieure). C’est aussi pourquoi un arc-en-ciel se trouve toujours dans la partie du ciel *opposée* au soleil : il faut tourner le dos au soleil, la pluie devant vous, pour que les angles s’alignent.

## FAQ

**Pourquoi des arcs-en-ciel doubles se produisent-ils ?**
Parfois, la lumière se réfléchit **deux fois** à l’intérieur des gouttes avant d’en sortir. Ce second arc, plus pâle, apparaît plus haut, et ses couleurs sont **inversées** (le rouge à l’intérieur), car le rebond supplémentaire retourne l’ordre.

**Peut-on un jour atteindre le bout d’un arc-en-ciel ?**
Non — ce n’est pas un lieu physique. Avancez vers lui et la géométrie se déplace avec vous, si bien que l’arc-en-ciel bouge aussi. Il n’existe que par rapport à votre point de vue.

**Faut-il de la pluie pour en voir un ?**
Il faut des gouttelettes d’eau et de la lumière du soleil sous le bon angle — on voit donc aussi des arcs-en-ciel dans la brume des cascades, les arroseurs de jardin et les embruns marins. Ce sont les gouttes, et non le nuage de pluie, qui importent.`,
  },
  {
    topicKey: 'why-we-age',
    title: 'Pourquoi vieillissons-nous ?',
    question: 'Qu’est-ce qui fait réellement vieillir notre corps au fil du temps ?',
    summary:
      'Le vieillissement, c’est l’accumulation de dommages dans nos cellules, plus vite que le corps ne les répare — extrémités de chromosomes usées, erreurs d’ADN, cellules défaillantes, inflammation qui monte. Ce sont de multiples processus qui se chevauchent, non une seule horloge.',
    tags: ['science', 'biologie', 'vieillissement', 'santé'],
    language: 'fr',
    image: { prompt: promptOf('why-we-age'), alt: 'Cellules accumulant au fil du temps des extrémités effilochées et de petits dommages tandis que la réparation ralentit' },
    sources: [
      { title: 'Institut national sur le vieillissement (NIH) — Que savons-nous d’un vieillissement en bonne santé ?', url: 'https://www.nia.nih.gov/health/what-do-we-know-about-healthy-aging' },
      { title: 'López-Otín et al., « The Hallmarks of Aging » (2013)', url: 'https://pubmed.ncbi.nlm.nih.gov/23746838/' },
    ],
    content: `# Pourquoi vieillissons-nous ?

Le vieillissement peut sembler une unique horloge mystérieuse qui décompte, mais d’un point de vue biologique, mieux vaut le comprendre comme **l’accumulation lente de dommages** — l’usure au niveau des cellules et des molécules que, au fil des décennies, le corps devient de moins en moins capable de réparer. Quand on est jeune, la réparation suit le rythme des dommages. Avec le temps, les dommages commencent à l’emporter. Il n’y a pas une cause du vieillissement ; il y en a beaucoup qui se chevauchent, ce qui explique précisément pourquoi le vieillissement est si difficile à arrêter et pourquoi aucun « remède » unique n’existe.

## Les principaux moteurs du vieillissement

Les scientifiques ont identifié un ensemble de processus imbriqués — souvent appelés les « marqueurs du vieillissement » — qui, ensemble, animent le déclin. Quelques-uns des plus importants :

| Processus | Ce qui ne va plus |
| --- | --- |
| **Raccourcissement des télomères** | Les coiffes protectrices aux extrémités des chromosomes raccourcissent à chaque division cellulaire, finissant par limiter la division |
| **Dommages à l’ADN** | Erreurs et dégâts s’accumulent dans notre code génétique plus vite qu’ils ne sont réparés |
| **Cellules usées (sénescence)** | Les cellules endommagées cessent de se diviser mais s’attardent, libérant des signaux qui nuisent aux voisines |
| **Problèmes de protéines** | Les cellules deviennent moins bonnes à éliminer les protéines endommagées et mal repliées, qui s’accumulent |
| **Centrales énergétiques défaillantes** | Les mitochondries (générateurs d’énergie des cellules) deviennent moins efficaces |
| **Inflammation chronique** | Une inflammation de faible intensité, à l’échelle du corps (« inflammaging »), s’élève avec l’âge |

Aucun de ces processus pris isolément n’*est* le vieillissement. Ils se renforcent mutuellement — un ADN endommagé crée des cellules usées, les cellules usées attisent l’inflammation, l’inflammation cause plus de dommages — si bien que le déclin se compose comme des intérêts.

## Pourquoi vieillissons-nous tout court (la question plus profonde)

L’évolution offre une raison à l’existence même du vieillissement : la sélection naturelle travaille le plus dur à nous maintenir en bonne santé durant nos années de reproduction, et son emprise faiblit ensuite. Des gènes et des compromis qui profitent à la jeunesse peuvent comporter des coûts ne se manifestant que plus tard, quand la pression évolutive pour les corriger est faible. En somme, les corps sont réglés pour transmettre leurs gènes à la génération suivante, non pour durer éternellement — la maintenance est donc « suffisamment bonne », pas parfaite.

## Peut-on le ralentir ?

Le vieillissement lui-même ne peut être arrêté aujourd’hui, mais le **rythme** des dommages est en partie influencé par notre mode de vie. Ne pas fumer, une activité physique régulière, un sommeil correct, une alimentation raisonnable et la gestion du stress chronique sont à maintes reprises associés à un déclin plus lent et à une durée de vie en bonne santé plus longue — pas de la magie, mais la différence entre bien vieillir et mal vieillir. La recherche sur les mécanismes sous-jacents est active, mais les leviers prouvés restent, sans gloire, terre à terre.

## FAQ

**Y a-t-il une durée de vie humaine maximale ?**
Il semble y avoir un plafond approximatif — même en parfaite santé, très peu de personnes dépassent ~115 ans, ce qui suggère que les dommages accumulés finissent par submerger la réparation. Le record vérifié actuel est de 122 ans.

**Les animaux plus grands ou plus petits vieillissent-ils plus vite ?**
En général, les petits animaux vivent moins longtemps, mais il existe des exceptions frappantes (certaines petites chauves-souris et les rats-taupes nus vivent bien plus longtemps que leur taille ne le laisse prévoir), et c’est précisément pourquoi les chercheurs les étudient.

**La science « guérira »-t-elle un jour le vieillissement ?**
Personne ne le sait. Les chercheurs ciblent des marqueurs individuels (éliminer les cellules usées, protéger l’ADN), et certains ralentissent le vieillissement chez l’animal de laboratoire — mais traduire cela en une prolongation sûre de la vie humaine en bonne santé n’est pas prouvé et reste probablement lointain.`,
  },
  {
    topicKey: 'what-is-electricity',
    title: 'Qu’est-ce que l’électricité, au juste ?',
    question: 'Qu’est-ce que l’électricité, exactement, et comment alimente-t-elle nos appareils ?',
    summary:
      'L’électricité est le flux de charge électrique — généralement des électrons dérivant dans un fil, poussés par la tension. Les centrales ne fabriquent pas les électrons ; elles fournissent la « poussée » qui déplace ceux déjà présents, mouvement organisé qui achemine l’énergie jusqu’à vos appareils.',
    tags: ['science', 'physique', 'électricité', 'fonctionnement'],
    language: 'fr',
    image: { prompt: promptOf('what-is-electricity'), alt: 'Charges lumineuses dans un fil dérivant ensemble sous la tension pour allumer un appareil' },
    sources: [
      { title: 'Agence américaine d’information sur l’énergie (EIA) — L’électricité expliquée', url: 'https://www.eia.gov/energyexplained/electricity/' },
      { title: 'NASA — Les bases de l’électricité et du magnétisme', url: 'https://science.nasa.gov/' },
    ],
    content: `# Qu’est-ce que l’électricité, au juste ?

Nous employons le mot « électricité » de façon assez vague, mais à la base il ne désigne qu’une seule chose : **le flux de charge électrique.** Tout est fait d’atomes, et les atomes contiennent des particules chargées — notamment les **électrons**, qui portent une minuscule charge négative. Dans certains matériaux, surtout les métaux, certains électrons sont libres de se déplacer. Quand d’énormes quantités de ces électrons dérivent dans la même direction le long d’un fil, ce flux organisé *est* un courant électrique. L’électricité est, au sens littéral, de la charge en mouvement.

## Trois mots qui l’éclaircissent

Une simple analogie de plomberie fait s’éclairer les termes clés — imaginez de l’eau dans des tuyaux :

- La **tension** est la *poussée* — comme la pression de l’eau. C’est la force qui pousse les charges à travers un circuit. Pas de pression, pas de flux.
- L’**intensité** est le *débit* — la quantité de charge qui passe réellement en un point chaque seconde (mesurée en ampères).
- La **résistance** est le degré auquel le matériau *s’oppose* au flux — un tuyau étroit et obstrué contre un tuyau large et dégagé.

Plus de tension pousse plus de courant ; plus de résistance en laisse passer moins. Cette relation (la loi d’Ohm) régit presque tous les circuits. Et un courant a besoin d’un **circuit** complet — une boucle ininterrompue de la source, à travers l’appareil, puis de retour — c’est pourquoi actionner un interrupteur (rompre la boucle) arrête tout instantanément.

## Une idée fausse cruciale : la centrale ne vous envoie pas d’électrons

Voici ce qui surprend la plupart des gens. La centrale électrique n’expédie pas des électrons jusqu’à votre maison comme de l’eau dans un camion-citerne. **Les électrons sont déjà dans les fils.** Ce que la centrale fournit, c’est la *poussée* — la tension qui met en branle et fait dériver ces électrons déjà présents. Dans le courant alternatif (CA) qui sort de la plupart des prises, les électrons ne voyagent même pas du tout jusqu’à vous ; ils oscillent d’avant en arrière sur place, plusieurs fois par seconde. Ce qui voyage réellement jusqu’à votre appareil, et vite, c’est l’**énergie** portée par ce mouvement coordonné — et non les électrons eux-mêmes.

## Comment cela devient utile

Quand la charge en mouvement rencontre un appareil, celui-ci la force à fournir un travail au passage : une résistance chauffante transforme le flux en chaleur, un moteur le transforme en mouvement, une LED le transforme en lumière, une puce se sert de minuscules courants commutés pour calculer. Dans tous les cas, la charge en mouvement délivre de l’énergie, et l’appareil convertit cette énergie en ce que vous vouliez.

## FAQ

**La foudre est-elle la même électricité que celle de ma prise murale ?**
C’est le même phénomène fondamental — un flux de charge — mais la foudre est une décharge énorme et brève qui égalise la charge accumulée entre le nuage et le sol, à une tension bien plus élevée que le courant domestique.

**Quelle est la différence entre le courant alternatif et le courant continu ?**
Dans le courant continu (CC, comme une pile), la charge s’écoule régulièrement dans un sens ; dans le courant alternatif (CA, venu du réseau), elle s’inverse rapidement d’avant en arrière. Le réseau utilise le CA parce qu’il est facile d’en relever et d’en abaisser la tension pour un transport efficace sur longue distance.

**Pourquoi les métaux sont-ils de bons conducteurs ?**
Leurs atomes partagent une « mer » d’électrons faiblement retenus, libres de se déplacer, si bien que la charge s’écoule aisément. Les isolants (caoutchouc, verre) retiennent fermement leurs électrons, donc la charge ne peut pas s’écouler — c’est pourquoi les fils sont en cuivre à l’intérieur et en plastique à l’extérieur.`,
  },
];
