import type { DraftArticle } from '../types';

// French (fr) translations of the editorial drafts. Faithful, natural
// translations of the English originals; tags are localized. Built up batch
// by batch.
export const fr: DraftArticle[] = [
  // ── Batch 1: Science et nature ──
  {
    title: 'La photosynthèse',
    question: 'Comment les plantes transforment-elles la lumière du soleil en nourriture ?',
    summary:
      'La photosynthèse est le processus par lequel les plantes, les algues et certaines bactéries convertissent l’énergie lumineuse, l’eau et le dioxyde de carbone en énergie chimique stockée sous forme de sucres, en libérant de l’oxygène comme sous-produit.',
    tags: ['biologie', 'plantes', 'énergie', 'chimie', 'science'],
    language: 'fr',
    content: `# La photosynthèse

La photosynthèse est le processus biochimique qui permet aux plantes, aux algues et à certaines bactéries de fabriquer leur propre nourriture à partir de la lumière. Elle est la base de presque toutes les chaînes alimentaires de la Terre et la source de l’oxygène que nous respirons.

## La réaction de base

En termes simplifiés, la photosynthèse combine le dioxyde de carbone et l’eau, en utilisant l’énergie lumineuse, pour produire du glucose et de l’oxygène :

\`\`\`
6 CO2 + 6 H2O + énergie lumineuse -> C6H12O6 + 6 O2
\`\`\`

Le sucre (glucose) stocke l’énergie chimique que l’organisme utilise ensuite pour croître et se métaboliser. L’oxygène est libéré dans l’atmosphère.

## Deux étapes

- **Les réactions dépendantes de la lumière.** Dans les membranes de structures appelées thylakoïdes, le pigment vert, la **chlorophylle**, absorbe la lumière. Cette énergie scinde les molécules d’eau, libère de l’oxygène et est capturée dans deux transporteurs d’énergie, l’ATP et le NADPH.
- **Le cycle de Calvin (réactions indépendantes de la lumière).** Dans le fluide environnant (le stroma), l’ATP et le NADPH alimentent une série de réactions qui fixent le dioxyde de carbone en sucre.

## Pourquoi c’est important

La photosynthèse retire le dioxyde de carbone de l’air et l’enferme dans le tissu vivant, ce qui la rend centrale pour le cycle mondial du carbone et la régulation du climat. Les combustibles fossiles sont, en effet, de la lumière solaire ancienne captée par la photosynthèse il y a des millions d’années.

## Variations

Les plantes des climats chauds et secs utilisent souvent des voies adaptées — appelées photosynthèse **C4** et **CAM** — qui réduisent la perte d’eau et améliorent l’efficacité en cas de stress. Cela explique pourquoi des cultures comme le maïs et la canne à sucre prospèrent sous un soleil intense.`,
  },
  {
    title: 'Le cycle de l’eau',
    question: 'Comment l’eau se déplace-t-elle autour de la planète ?',
    summary:
      'Le cycle de l’eau est le mouvement continu de l’eau par évaporation, condensation, précipitation et ruissellement, qui redistribue l’eau douce sur la Terre.',
    tags: ['sciences de la terre', 'eau', 'climat', 'géographie', 'science'],
    language: 'fr',
    content: `# Le cycle de l’eau

Le cycle de l’eau, ou cycle hydrologique, décrit comment l’eau circule sans cesse entre les océans, l’atmosphère et la terre. La quantité totale d’eau sur la Terre reste à peu près constante ; le cycle ne fait que la déplacer entre différents réservoirs.

## Étapes principales

- **Évaporation.** La chaleur du Soleil transforme l’eau liquide — surtout des océans — en vapeur. Les plantes ajoutent de l’humidité par la **transpiration**, et les deux ensemble sont parfois appelées *évapotranspiration*.
- **Condensation.** En s’élevant et en se refroidissant, la vapeur se condense autour de minuscules particules pour former des nuages.
- **Précipitation.** Quand les gouttes deviennent assez lourdes, elles tombent sous forme de pluie, de neige, de grésil ou de grêle.
- **Collecte et ruissellement.** L’eau se rassemble dans les rivières, les lacs et les océans, ou s’infiltre dans le sol pour recharger les nappes, et finit par retourner à la mer.

## Réservoirs et temps de séjour

L’eau peut passer des durées très différentes dans chaque réservoir — des jours dans l’atmosphère, mais des milliers d’années dans les eaux souterraines profondes ou la glace polaire. Ces « temps de séjour » déterminent la vitesse à laquelle les effets de la pollution ou de la sécheresse se propagent dans le système.

## Pourquoi c’est important

Le cycle de l’eau apporte de l’eau douce aux écosystèmes et à l’agriculture, façonne la météo et l’érosion, et régule la température en déplaçant d’énormes quantités de chaleur. L’activité humaine — barrer les rivières, drainer les zones humides et réchauffer le climat — peut intensifier les inondations et les sécheresses en perturbant l’équilibre du cycle.`,
  },
  {
    title: 'La tectonique des plaques',
    question: 'Pourquoi les continents bougent-ils et les séismes se produisent-ils ?',
    summary:
      'La tectonique des plaques est la théorie selon laquelle l’enveloppe externe de la Terre est divisée en plaques mobiles dont les interactions forment des montagnes et des océans et déclenchent séismes et volcans.',
    tags: ['sciences de la terre', 'géologie', 'séismes', 'volcans', 'science'],
    language: 'fr',
    content: `# La tectonique des plaques

La tectonique des plaques est la théorie qui unifie la géologie. Elle explique que l’enveloppe externe rigide de la Terre — la **lithosphère** — est divisée en une douzaine de grandes plaques et plusieurs plus petites qui se déplacent lentement sur la roche plus chaude et partiellement fondue située en dessous.

## Ce qui anime le mouvement

Les plaques reposent sur l’**asthénosphère**, une couche ductile du manteau supérieur. La chaleur qui s’échappe de l’intérieur de la Terre engendre une lente convection, et des forces comme la traction des dalles denses qui plongent (« traction de plaque ») déplacent les plaques de quelques centimètres par an, à peu près la vitesse de croissance des ongles.

## Trois types de limites

- **Divergentes.** Les plaques s’écartent et le magma remonte pour former une nouvelle croûte — par exemple le long de la dorsale médio-atlantique.
- **Convergentes.** Les plaques se heurtent. L’une peut plonger sous l’autre (**subduction**), formant fosses profondes, volcans et séismes ; ou deux continents peuvent se froisser et soulever des montagnes comme l’Himalaya.
- **Transformantes.** Les plaques glissent horizontalement l’une contre l’autre, comme la faille de San Andreas en Californie, accumulant une tension qui se libère en séismes.

## Preuves

La théorie est née d’idées antérieures sur la dérive des continents. Des littoraux qui s’emboîtent, des fossiles identiques sur des continents aujourd’hui éloignés et les bandes magnétiques figées dans la roche du plancher océanique ont confirmé que les plaques ont réorganisé le globe au fil de centaines de millions d’années — et continuent de le faire.`,
  },
  {
    title: 'Le système immunitaire humain',
    question: 'Comment le corps se défend-il contre les maladies ?',
    summary:
      'Le système immunitaire est un réseau en couches de cellules, de tissus et de molécules qui détecte et neutralise les agents pathogènes tout en distinguant les propres cellules du corps des menaces extérieures.',
    tags: ['biologie', 'médecine', 'santé', 'corps humain', 'science'],
    language: 'fr',
    content: `# Le système immunitaire humain

Le système immunitaire est le réseau de défense du corps contre les bactéries, les virus, les champignons et d’autres menaces. Il fonctionne en couches qui se chevauchent, des barrières physiques aux réponses cellulaires très spécifiques.

## Immunité innée

La première ligne de défense est rapide mais générale. Elle comprend des barrières physiques comme la peau et le mucus, ainsi que des cellules telles que les **macrophages** et les **neutrophiles**, qui engloutissent les envahisseurs. L’inflammation et la fièvre font partie de cette réponse rapide, conçue pour ralentir les agents pathogènes et recruter de l’aide.

## Immunité adaptative

Si la menace persiste, le système **adaptatif** monte une attaque ciblée :

- Les **lymphocytes B** produisent des **anticorps** : des protéines qui se fixent sur des molécules précises (antigènes) d’un agent pathogène et le marquent pour destruction.
- Les **lymphocytes T** tuent directement les cellules infectées ou coordonnent la réponse plus large.

Une caractéristique cruciale est la **mémoire** : après une infection, des cellules mémoire à longue durée de vie subsistent, de sorte que le corps réagit bien plus vite si le même agent pathogène revient. C’est le principe de la **vaccination**, qui entraîne le système immunitaire avec une version ou un fragment inoffensif d’un agent pathogène.

## Quand ça tourne mal

Le système doit distinguer le « soi » du « non-soi ». Ses défaillances mènent aux **maladies auto-immunes** (attaquer ses propres tissus), aux **allergies** (réagir excessivement à des substances inoffensives) ou à l’**immunodéficience** (une réponse trop faible). Équilibrer la sensibilité et la retenue est l’une des plus remarquables réussites de la biologie.`,
  },
  {
    title: 'Les mitochondries',
    question: 'Pourquoi appelle-t-on les mitochondries la centrale énergétique de la cellule ?',
    summary:
      'Les mitochondries sont des organites qui produisent l’essentiel de l’énergie utilisable d’une cellule par la respiration, et portent leur propre ADN, hérité d’un lointain ancêtre bactérien.',
    tags: ['biologie', 'cellules', 'énergie', 'génétique', 'science'],
    language: 'fr',
    content: `# Les mitochondries

Les mitochondries sont de minuscules structures à l’intérieur de la plupart de nos cellules, célèbres comme la « centrale énergétique de la cellule » parce qu’elles produisent l’essentiel de l’énergie qui anime la vie.

## Produire de l’énergie

Les mitochondries réalisent la **respiration aérobie**, convertissant nutriments et oxygène en **ATP** (adénosine triphosphate), la molécule que les cellules utilisent comme monnaie d’énergie. Le processus a lieu sur la membrane interne repliée de la mitochondrie, dont les replis (crêtes) augmentent la surface disponible pour les réactions productrices d’énergie. Une seule cellule peut contenir de une à des milliers de mitochondries selon ses besoins en énergie ; les cellules musculaires et cardiaques en sont particulièrement riches.

## Un ancêtre bactérien

Les mitochondries possèdent leur propre petite boucle d’ADN et se reproduisent par division, tout comme les bactéries. Cela appuie la **théorie endosymbiotique** : les mitochondries descendraient de bactéries libres englouties par une cellule primitive il y a environ deux milliards d’années et devenues des partenaires permanentes.

## Transmises par la mère

Comme les spermatozoïdes n’apportent presque pas de mitochondries, l’**ADN mitochondrial** se transmet par la lignée maternelle quasiment sans changement. Les généticiens l’utilisent pour retracer l’ascendance et les migrations humaines jusqu’à un passé lointain.

## Liens avec la santé

Les défauts des mitochondries peuvent causer divers troubles héréditaires, et le déclin mitochondrial est étudié comme facteur du vieillissement et de maladies comme celle de Parkinson.`,
  },
  {
    title: 'Les courants océaniques',
    question: 'Qu’est-ce qui fait circuler l’eau de mer en boucles géantes autour du monde ?',
    summary:
      'Les courants océaniques sont des flux d’eau de mer à grande échelle entraînés par le vent, la température et la salinité ; ils redistribuent la chaleur sur la planète et façonnent les climats régionaux.',
    tags: ['sciences de la terre', 'océanographie', 'climat', 'géographie', 'science'],
    language: 'fr',
    content: `# Les courants océaniques

Les courants océaniques sont des mouvements continus et orientés de l’eau de mer. Ils agissent comme un système circulatoire à l’échelle de la planète, transportant chaleur, nutriments et vie marine sur des milliers de kilomètres.

## Courants de surface

Près de la surface, les courants sont surtout entraînés par le **vent**. La rotation de la Terre courbe leurs trajectoires par l’**effet Coriolis**, les organisant en grands systèmes tournants appelés **gyres**. Le Gulf Stream, par exemple, transporte de l’eau chaude des tropiques vers l’Europe, donnant à l’Europe de l’Ouest un climat plus doux que ne le laisserait penser sa latitude.

## Circulation profonde

Sous la surface, les courants sont entraînés par des différences de **densité**, qui dépend de la température et de la salinité. L’eau froide et salée près des pôles plonge et s’écoule le long du fond océanique, tandis que l’eau plus chaude remonte ailleurs. Cette lente boucle mondiale est appelée **circulation thermohaline** ou « tapis roulant océanique », et un tour complet peut prendre près de mille ans.

## Pourquoi ils comptent

Les courants modèrent les températures mondiales en déplaçant la chaleur de l’équateur vers les pôles. Ils alimentent les **remontées d’eau** riches en nutriments qui soutiennent certaines des pêcheries les plus riches du monde et influencent des phénomènes météo comme El Niño. Comme le tapis roulant dépend de la plongée de l’eau polaire froide et dense, les scientifiques guettent les signes que la fonte des glaces et le réchauffement de la mer pourraient l’affaiblir.`,
  },
  {
    title: 'L’effet de serre',
    question: 'Comment les gaz de l’atmosphère maintiennent-ils la Terre au chaud ?',
    summary:
      'L’effet de serre est le réchauffement qui se produit lorsque certains gaz atmosphériques piègent la chaleur rayonnée par la surface de la Terre, gardant la planète habitable mais s’intensifiant à mesure que ces gaz augmentent.',
    tags: ['climat', 'sciences de la terre', 'atmosphère', 'environnement', 'science'],
    language: 'fr',
    content: `# L’effet de serre

L’effet de serre est le processus naturel qui maintient la Terre assez chaude pour abriter la vie. Sans lui, la température moyenne de surface de la planète serait bien en dessous du point de congélation.

## Comment ça marche

La lumière du soleil traverse l’atmosphère et réchauffe la surface de la Terre. La surface rayonne alors cette énergie vers l’extérieur sous forme de rayonnement **infrarouge** (chaleur). Certains gaz — surtout le **dioxyde de carbone, le méthane, la vapeur d’eau et le protoxyde d’azote** — absorbent une partie de cet infrarouge sortant et le réémettent dans toutes les directions, y compris vers le sol. Résultat : la chaleur s’attarde dans la basse atmosphère au lieu de s’échapper directement vers l’espace.

Le nom vient d’une vague analogie avec une serre, bien qu’une vraie serre se réchauffe surtout en bloquant le mouvement de l’air, et non en piégeant l’infrarouge.

## L’équilibre naturel

Pendant l’essentiel de l’histoire, la quantité de gaz à effet de serre et l’énergie quittant la Terre sont restées à peu près en équilibre, gardant le climat relativement stable.

## L’influence humaine

La combustion des énergies fossiles, la déforestation et l’agriculture ont porté les concentrations de dioxyde de carbone et de méthane à des niveaux jamais vus depuis des centaines de milliers d’années. Cet effet de serre **renforcé** rompt l’équilibre et fait que la planète retient plus de chaleur. Les conséquences comprennent la hausse des températures mondiales, des changements de la météo, la fonte des glaces et l’élévation du niveau de la mer : le mécanisme central du changement climatique moderne.`,
  },
  {
    title: 'La bioluminescence',
    question: 'Comment et pourquoi certains êtres vivants brillent-ils dans le noir ?',
    summary:
      'La bioluminescence est la production de lumière par des organismes vivants au moyen d’une réaction chimique, utilisée pour communiquer, se camoufler, attirer des proies et trouver un partenaire.',
    tags: ['biologie', 'chimie', 'océanographie', 'animaux', 'science'],
    language: 'fr',
    content: `# La bioluminescence

La bioluminescence est la capacité des organismes vivants à produire leur propre lumière. Des lucioles qui clignotent par une nuit d’été aux vagues qui brillent sur une plage sombre, elle apparaît dans tout l’arbre du vivant — et elle est surtout courante dans les grands fonds marins.

## La chimie

La lueur provient d’une réaction chimique plutôt que de la chaleur, ce qui en fait une forme de « lumière froide » qui ne gaspille presque pas d’énergie. Une molécule émettrice de lumière appelée **luciférine** réagit avec l’oxygène, aidée par une enzyme appelée **luciférase**. La réaction libère de l’énergie sous forme de lumière visible, le plus souvent bleue ou verte — les couleurs qui voyagent le plus loin dans l’eau de mer.

## Pourquoi les organismes brillent

La bioluminescence sert à de nombreuses fins :

- **Attirer des proies.** La baudroie balance un leurre lumineux devant sa bouche.
- **Défense.** Certains calmars libèrent des nuages lumineux pour désorienter les prédateurs ; d’autres utilisent la lumière pour se fondre dans la faible lueur venue d’en haut (contre-illumination).
- **Communication et parade.** Les lucioles émettent des éclairs aux motifs propres à chaque espèce pour trouver un partenaire.
- **Symbiose.** Beaucoup d’animaux ne produisent pas eux-mêmes de lumière, mais hébergent des bactéries lumineuses dans des organes spéciaux.

## Dans l’océan profond

La lumière s’évanouit dans l’obscurité quelques centaines de mètres plus bas, et en dessous, la grande majorité des animaux peut produire de la lumière. Dans ce monde sans lumière, la bioluminescence est moins une curiosité qu’un langage primordial de survie.`,
  },
  // ── Batch 2: Histoire et société ──
  {
    title: 'La route de la soie',
    question: 'Qu’était la route de la soie et pourquoi a-t-elle compté ?',
    summary:
      'La route de la soie était un réseau de routes commerciales reliant l’Asie de l’Est à la Méditerranée pendant plus de mille ans, transportant marchandises, technologies, religions et idées entre les civilisations.',
    tags: ['histoire', 'commerce', 'asie', 'civilisation', 'géographie'],
    language: 'fr',
    content: `# La route de la soie

La route de la soie n’était pas une unique route pavée, mais un vaste réseau de voies terrestres et maritimes reliant la Chine, l’Asie centrale, l’Inde, la Perse et le monde méditerranéen. Active d’environ le IIe siècle av. J.-C. au XVe siècle, elle a façonné le développement de chaque société qu’elle a touchée.

## Plus que de la soie

La soie chinoise était le luxe qui a donné son nom moderne au réseau (forgé par un géographe du XIXe siècle), mais d’innombrables biens y circulaient : épices, thé, porcelaine, verre, métaux précieux, chevaux et papier. Peu de marchands parcouraient toute la distance ; les marchandises passaient de main en main à travers une chaîne de marchands et de villes-oasis comme Samarcande et Kachgar.

## Une autoroute pour les idées

L’impact le plus profond de la route fut culturel. Le **bouddhisme** s’est diffusé de l’Inde vers la Chine par ces chemins, tandis que l’islam, le christianisme et le manichéisme voyageaient aussi avec les marchands. Des technologies cruciales — le **papier, la poudre à canon et la boussole** — se sont déplacées vers l’ouest, transformant les sociétés qui les recevaient.

## Maladie et déclin

Les mêmes connexions qui portaient le commerce portaient aussi la maladie ; beaucoup d’historiens lient la route de la soie à la propagation de la **peste noire** au XIVe siècle. Le réseau a décliné peu à peu à mesure que les routes maritimes devenaient moins chères et plus sûres et que les empires terrestres se fragmentaient.

## Héritage

La route de la soie est gardée en mémoire comme l’un des grands moteurs d’échange de l’histoire — preuve que des civilisations lointaines étaient reliées bien plus tôt et bien plus profondément qu’on ne le croyait.`,
  },
  {
    title: 'L’imprimerie',
    question: 'Comment l’imprimerie a-t-elle changé le monde ?',
    summary:
      'L’imprimerie, perfectionnée par Johannes Gutenberg vers 1440, a rendu les livres bon marché et abondants, accélérant l’alphabétisation, la science, la réforme religieuse et la diffusion des idées en Europe.',
    tags: ['histoire', 'technologie', 'communication', 'culture', 'europe'],
    language: 'fr',
    content: `# L’imprimerie

L’imprimerie est l’une des inventions les plus déterminantes de l’histoire. En mécanisant la copie des textes, elle a transformé les livres de trésors rares copiés à la main en objets produits en masse.

## La percée de Gutenberg

L’impression par blocs gravés existait déjà en Asie de l’Est, mais vers 1440 l’orfèvre allemand **Johannes Gutenberg** a réuni plusieurs innovations en un système pratique : des **caractères mobiles en métal** durables, une encre à base d’huile qui adhérait au métal, et une presse à vis adaptée de la vinification. Sa **Bible à 42 lignes** (v. 1455) a montré que la méthode pouvait rivaliser avec la beauté des manuscrits à une fraction du coût.

## Une explosion de l’information

Avant l’imprimerie, un copiste pouvait mettre des mois à copier un seul livre. Ensuite, un atelier d’imprimerie pouvait produire des centaines de copies identiques dans le même temps. En 1500, les presses de toute l’Europe avaient produit des millions de volumes. Les prix ont chuté, l’alphabétisation a augmenté, et les textes standardisés ont permis au savoir de s’accumuler de façon fiable.

## Remodeler la société

Les conséquences furent profondes :

- La **Réforme protestante** s’est répandue rapidement parce que les pamphlets et les Bibles traduites atteignaient les lecteurs ordinaires.
- La **révolution scientifique** dépendait du partage par les savants de diagrammes et de données précises par-delà les frontières.
- L’impression standardisée a aidé à stabiliser les langues nationales et à diffuser la littérature en langue vernaculaire.

## Héritage

On voit souvent dans l’imprimerie la première technologie de l’information à avoir démocratisé le savoir — précurseur de chaque bond ultérieur, des journaux à Internet.`,
  },
  {
    title: 'La révolution industrielle',
    question: 'Qu’était la révolution industrielle et comment a-t-elle transformé la société ?',
    summary:
      'La révolution industrielle fut le passage de la production manuelle à la fabrication par machines, amorcé dans l’Angleterre du XVIIIe siècle, remodelant les économies, les villes, le travail et la vie quotidienne dans le monde entier.',
    tags: ['histoire', 'économie', 'technologie', 'société', 'industrie'],
    language: 'fr',
    content: `# La révolution industrielle

La révolution industrielle fut une période de changement spectaculaire, commencée en Grande-Bretagne vers 1760, où les économies sont passées de l’agriculture et de l’artisanat vers l’industrie mécanisée et la production en usine.

## Pourquoi la Grande-Bretagne, pourquoi alors

Plusieurs facteurs se sont conjugués : un **charbon** abondant pour le combustible, des gisements de fer, des capitaux issus du commerce, une main-d’œuvre quittant la terre et une vague d’inventions pratiques. La **machine à vapeur** améliorée, perfectionnée par James Watt, a donné aux usines une source d’énergie puissante et indépendante du lieu. Les machines textiles mécanisées ont multiplié la production d’un seul ouvrier.

## De la ferme à l’usine

La production a quitté les chaumières dispersées pour des **usines** centralisées, bâties près de l’énergie et des transports. Le fer, puis l’acier, ont rendu possibles les machines et les chemins de fer ; les canaux, puis le rail, ont fait chuter le coût du transport des marchandises. Les villes ont gonflé à mesure que les gens migraient vers le travail industriel.

## Coûts et bénéfices

La révolution a fini par relever le niveau de vie et l’espérance de vie et a créé des industries entièrement nouvelles. Mais ses premières décennies ont apporté des conditions dures : longues journées, travail des enfants, machines dangereuses, taudis surpeuplés et pollution. Ces épreuves ont nourri les mouvements ouvriers, les lois de réforme et de nouvelles idées politiques sur les droits des travailleurs.

## Un tournant durable

Une « seconde révolution industrielle » à la fin du XIXe siècle a ajouté l’électricité, la chimie et la production de masse. Ensemble, ces transformations ont fixé le modèle du monde industriel moderne — et amorcé la hausse de l’usage des énergies fossiles qui alimente aujourd’hui les défis climatiques.`,
  },
  {
    title: 'Les origines de l’écriture',
    question: 'Quand et pourquoi les humains ont-ils inventé l’écriture ?',
    summary:
      'L’écriture a été inventée indépendamment dans plusieurs civilisations anciennes, à partir de la Mésopotamie vers 3400 av. J.-C., d’abord pour tenir des registres économiques avant d’évoluer pour capter pleinement le langage.',
    tags: ['histoire', 'langue', 'civilisation', 'communication', 'culture'],
    language: 'fr',
    content: `# Les origines de l’écriture

L’écriture — l’enregistrement du langage par des signes visibles et durables — est l’une des inventions qui définissent l’humanité. Elle a émergé indépendamment en au moins quelques endroits, et chaque fois a transformé les sociétés qui l’ont développée.

## Née de la comptabilité

L’écriture la plus ancienne connue vient de **Mésopotamie** (l’Irak actuel) vers 3400-3200 av. J.-C. Elle n’a pas débuté comme littérature, mais comme **comptabilité** : les administrateurs des temples devaient suivre le grain, le bétail et le commerce. De simples dessins pressés dans l’argile sont peu à peu devenus les marques en forme de coin appelées **cunéiforme**, tracées avec un calame de roseau.

## Inventions indépendantes

L’écriture est aussi apparue d’elle-même en **Égypte** (les hiéroglyphes), en **Chine** (les ancêtres des caractères chinois, utilisés pour la divination) et en **Mésoamérique** (les Mayas et leurs prédécesseurs). Le fait qu’elle ait été inventée plus d’une fois montre qu’elle répondait à un besoin profond des sociétés complexes.

## Des images aux sons

Les premières écritures mêlaient des symboles pour les choses et des symboles pour les sons. Un grand saut fut l’**alphabet** — un petit ensemble de signes représentant des sons individuels —, qui remonte à des peuples de langue sémitique vers 1800 av. J.-C. et fut ensuite adapté par les Phéniciens et les Grecs. Les alphabets ont rendu la lecture et l’écriture plus faciles à apprendre et à diffuser.

## Pourquoi cela a compté

L’écriture a permis au savoir, aux lois, aux contrats et aux récits de survivre à ceux qui les avaient créés. Elle a rendu les empires gouvernables, permis à la science de s’accumuler et transformé la mémoire d’un fragile acte personnel en un registre partagé et durable.`,
  },
  {
    title: 'L’inflation',
    question: 'Qu’est-ce qui cause l’inflation et pourquoi est-ce important ?',
    summary:
      'L’inflation est une hausse soutenue du niveau général des prix, qui réduit le pouvoir d’achat de la monnaie ; une inflation modérée est normale, mais une inflation élevée ou instable nuit aux économies.',
    tags: ['économie', 'finance', 'monnaie', 'politique', 'société'],
    language: 'fr',
    content: `# L’inflation

L’inflation est le rythme auquel le niveau général des prix des biens et services monte avec le temps. Quand il y a inflation, chaque unité de monnaie achète un peu moins qu’avant — la monnaie perd du pouvoir d’achat.

## Comment on la mesure

Les économistes mesurent l’inflation à l’aide d’**indices des prix**, le plus courant étant l’indice des prix à la consommation (IPC), qui suit le coût d’un « panier » représentatif de biens et services du quotidien. Si le panier coûte 3 % de plus qu’un an plus tôt, l’inflation annuelle est de 3 %.

## Ce qui la cause

L’inflation provient généralement de deux grandes forces :

- **Tirée par la demande.** Quand la demande dépasse ce qu’une économie peut produire, les acheteurs font monter les prix.
- **Poussée par les coûts.** Quand le coût des intrants comme l’énergie ou la main-d’œuvre augmente, les entreprises le répercutent.

Sous ces deux forces, la plupart des économistes estiment que l’inflation soutenue est étroitement liée à la croissance de la **masse monétaire** par rapport à la production réelle.

## Pourquoi c’est important

Un peu d’inflation — les banques centrales visent souvent autour de 2 % — est jugé sain : il encourage la dépense et l’investissement et évite les dangers de la baisse des prix (**déflation**). Mais une inflation élevée érode l’épargne, fausse les décisions et peut s’emballer, comme dans les cas d’**hyperinflation** où les prix doublent en quelques jours.

## Comment on la gère

Les banques centrales combattent l’inflation excessive surtout en relevant les **taux d’intérêt**, ce qui refroidit l’emprunt et la dépense. Équilibrer l’inflation avec l’emploi et la croissance est l’un des défis centraux de la politique économique.`,
  },
  {
    title: 'La méthode scientifique',
    question: 'Comment la science fonctionne-t-elle réellement ?',
    summary:
      'La méthode scientifique est une démarche systématique pour bâtir le savoir par l’observation, l’hypothèse, l’expérience et la révision, qui privilégie les preuves et la testabilité sur l’autorité.',
    tags: ['science', 'philosophie', 'méthode', 'histoire', 'éducation'],
    language: 'fr',
    content: `# La méthode scientifique

La méthode scientifique est le procédé rigoureux que la science emploie pour étudier le monde. Plutôt qu’une recette figée, c’est un état d’esprit fondé sur la confrontation des idées aux preuves et la volonté d’abandonner celles qui échouent.

## La boucle centrale

Un cycle type passe par plusieurs étapes :

1. **Observation.** Remarquer un phénomène ou une énigme.
2. **Question.** Poser quelque chose de précis à son sujet.
3. **Hypothèse.** Proposer une explication testable — une affirmation qui, en principe, pourrait être démontrée fausse.
4. **Prédiction.** Déduire ce qui devrait se produire si l’hypothèse est vraie.
5. **Expérience.** Tester la prédiction dans des conditions contrôlées, idéalement en variant un seul facteur à la fois.
6. **Analyse et révision.** Comparer les résultats à la prédiction, puis affiner, rejeter ou étendre l’hypothèse.

## Principes clés

- **Testabilité et réfutabilité.** Une affirmation scientifique doit faire des prédictions susceptibles d’échouer. Les idées qui expliquent tout et n’interdisent rien ne sont pas scientifiques.
- **Reproductibilité.** D’autres doivent pouvoir refaire une expérience et obtenir le même résultat.
- **Évaluation par les pairs.** Les travaux nouveaux sont examinés par d’autres experts avant d’être largement acceptés.
- **Savoir provisoire.** Même des théories bien étayées restent ouvertes à révision si de meilleures preuves surgissent.

## Pourquoi ça marche

En exigeant des preuves et en invitant la critique, la méthode scientifique corrige ses propres erreurs avec le temps. Elle ne promet pas la certitude, mais elle s’est révélée extraordinairement puissante pour produire une compréhension fiable et cumulative de la nature.`,
  },
  {
    title: 'La démocratie athénienne',
    question: 'Comment la démocratie a-t-elle commencé dans l’Athènes antique ?',
    summary:
      'La démocratie athénienne, développée au Ve siècle av. J.-C., fut un système précoce d’autogouvernement direct des citoyens, influent comme ancêtre des idées démocratiques modernes malgré ses limites marquées.',
    tags: ['histoire', 'politique', 'grèce', 'démocratie', 'civilisation'],
    language: 'fr',
    content: `# La démocratie athénienne

On appelle souvent l’Athènes antique le berceau de la démocratie. Aux Ve et IVe siècles av. J.-C., elle a développé un système où les citoyens ordinaires, et non les rois ni une élite étroite, prenaient les décisions de l’État.

## Comment elle fonctionnait

La démocratie athénienne était **directe**, et non représentative. Les grandes décisions étaient prises par l’**Assemblée (Ekklésia)**, ouverte à tous les citoyens éligibles, qui débattaient et votaient en personne sur les lois, la guerre et la politique. Un **Conseil des Cinq-Cents**, tiré au sort, préparait l’ordre du jour, et la plupart des charges publiques et des jurys étaient eux aussi pourvus par **tirage au sort** plutôt que par élection — un effort délibéré pour empêcher la concentration du pouvoir.

## Réformateurs clés

Le chemin passa par plusieurs figures : **Solon** allégea les dettes et élargit la participation ; **Clisthène**, vers 508 av. J.-C., réorganisa les citoyens en nouveaux groupes qui traversaient les anciennes allégeances et est souvent considéré comme le fondateur du système ; et **Périclès** présida à son apogée, mûre et assurée.

## Limites marquées

Selon les critères modernes, le système était étroit. La citoyenneté — et donc la voix politique — excluait **les femmes, les personnes asservies et les résidents étrangers**, ne laissant participer qu’une minorité de la population.

## Héritage

Malgré ces limites, la démocratie athénienne a introduit des idées durables : que l’autorité légitime peut résider dans les gouvernés, que les citoyens doivent délibérer ouvertement et que nul n’est au-dessus de la loi. Ces principes ont résonné dans les Lumières et se sont incorporés à la conception des démocraties modernes.`,
  },
  {
    title: 'L’étalon-or',
    question: 'Qu’était l’étalon-or et pourquoi les pays l’ont-ils abandonné ?',
    summary:
      'L’étalon-or était un système monétaire où la valeur d’une monnaie était fixée à une quantité précise d’or ; il stabilisait les taux de change mais limitait la flexibilité, et fut abandonné au XXe siècle.',
    tags: ['économie', 'histoire', 'monnaie', 'finance', 'politique'],
    language: 'fr',
    content: `# L’étalon-or

L’étalon-or était un système où la valeur de la monnaie d’un pays était directement liée à l’or. Sous un étalon-or complet, le papier-monnaie pouvait être échangé à la demande contre une quantité fixe de métal.

## Comment il fonctionnait

Chaque unité de monnaie représentait un poids défini d’or, et les gouvernements s’engageaient à convertir les billets en or à ce taux. Comme de nombreux pays liaient leur monnaie à l’or, les taux de change entre elles étaient en fait **fixes**, ce qui rendait le commerce et l’investissement internationaux plus prévisibles.

## Avantages

Ses partisans valorisaient l’étalon-or pour sa **stabilité** et sa **discipline**. Comme la monnaie était adossée à une marchandise physique limitée, les gouvernements ne pouvaient pas facilement imprimer de la monnaie pour financer leurs dépenses, ce qui tendait à maintenir une faible inflation à long terme et à bâtir la confiance dans la monnaie.

## Les inconvénients

Cette même rigidité était sa faiblesse. La masse monétaire était liée aux réserves d’or plutôt qu’aux besoins de l’économie, de sorte que les gouvernements avaient peu de marge pour répondre aux récessions, aux crises bancaires ou aux chocs. Beaucoup d’économistes soutiennent que l’étalon-or a aggravé et propagé la **Grande Dépression** des années 1930, les pays s’y accrochant au lieu de stimuler leur économie.

## La fin de l’or

Les nations se sont détachées de l’or par étapes. Le système s’est finalement effondré en 1971, quand les États-Unis ont mis fin à la convertibilité du dollar en or. Aujourd’hui, le monde utilise une **monnaie fiduciaire**, dont la valeur repose sur la crédibilité des gouvernements et des banques centrales et non sur une marchandise physique.`,
  },
];
