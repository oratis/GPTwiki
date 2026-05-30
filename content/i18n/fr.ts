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
  // ── Batch 3: Technologie et mathématiques ──
  {
    title: 'Comment fonctionne le GPS',
    question: 'Comment le GPS sait-il exactement où vous êtes ?',
    summary:
      'Le GPS détermine la position en mesurant le temps de trajet des signaux de plusieurs satellites et en utilisant la trilatération ; des horloges atomiques précises et des corrections relativistes le rendent exact à quelques mètres près.',
    tags: ['technologie', 'navigation', 'satellites', 'physique', 'ingénierie'],
    language: 'fr',
    content: `# Comment fonctionne le GPS

Le système de positionnement par satellites (GPS) permet à un récepteur — dans votre téléphone, votre voiture ou votre montre — de déterminer où il se trouve n’importe où sur la Terre, en général à quelques mètres près. Il repose sur une constellation de satellites et sur un peu de physique ingénieuse.

## Satellites et signaux

Le GPS utilise une trentaine de satellites en orbite à environ 20 000 km d’altitude, disposés de façon qu’il y en ait toujours plusieurs visibles depuis n’importe quel point de la planète. Chacun émet sans cesse un signal radio portant l’**heure** exacte de son envoi et la **position** du satellite.

## Trilatération

Le récepteur mesure le temps qu’a mis chaque signal à arriver. Comme les ondes radio voyagent à la vitesse de la lumière, le temps de trajet révèle la **distance** à ce satellite. Connaître la distance à un satellite vous place quelque part sur une sphère autour de lui ; combiner les distances à plusieurs satellites réduit votre position à un seul point. Cette technique géométrique s’appelle la **trilatération**. Il faut les signaux d’au moins quatre satellites — trois pour fixer la position et un quatrième pour résoudre l’erreur d’horloge du récepteur.

## Pourquoi les horloges et la relativité comptent

La synchronisation doit être extraordinairement précise : une erreur d’un millionième de seconde décalerait la position de centaines de mètres. Les satellites embarquent des **horloges atomiques**, et le système corrige même la **relativité d’Einstein** : la vitesse des satellites et leur gravité plus faible font battre leurs horloges à un rythme légèrement différent de celui des horloges au sol. Sans ces corrections, le GPS dériverait de plusieurs kilomètres par jour.

## Au-delà du positionnement

La même synchronisation précise sous-tend les réseaux financiers, les réseaux électriques et les télécommunications, faisant du GPS une colonne vertébrale discrète de l’infrastructure moderne.`,
  },
  {
    title: 'La cryptographie à clé publique',
    question: 'Comment deux inconnus peuvent-ils communiquer en sécurité sur l’Internet ouvert ?',
    summary:
      'La cryptographie à clé publique utilise des paires de clés liées mathématiquement — une publique, une privée — pour que chacun puisse chiffrer des messages et vérifier des identités sans jamais partager de secret au préalable.',
    tags: ['technologie', 'cryptographie', 'sécurité', 'mathématiques', 'internet'],
    language: 'fr',
    content: `# La cryptographie à clé publique

La cryptographie à clé publique est la percée qui rend possible la communication sécurisée entre des personnes qui ne se sont jamais rencontrées. Elle sous-tend le HTTPS, la messagerie sécurisée, les signatures numériques et les cryptomonnaies.

## L’idée de la paire de clés

Le chiffrement traditionnel (« symétrique ») utilise une unique clé partagée pour verrouiller et déverrouiller un message — ce qui pose un problème : comment partager cette clé en sécurité au départ ? La cryptographie à clé publique (ou **asymétrique**) le résout avec une **paire** de clés :

- Une **clé publique**, que tout le monde peut voir.
- Une **clé privée**, que le propriétaire garde secrète.

Les deux sont liées mathématiquement de sorte que ce qu’une clé verrouille, seule l’autre peut le déverrouiller — mais connaître la clé publique ne permet pas de calculer la clé privée.

## Deux usages principaux

- **Chiffrement.** Pour envoyer à quelqu’un un message confidentiel, vous le chiffrez avec *sa clé publique* ; seule sa clé privée peut le déchiffrer.
- **Signatures numériques.** Pour prouver qu’un message vient bien de vous, vous le signez avec *votre clé privée* ; chacun peut le vérifier avec votre clé publique, ce qui confirme l’authenticité et l’absence d’altération.

## La mathématique derrière

La sécurité repose sur des problèmes faciles à calculer dans un sens mais extrêmement difficiles à inverser — comme **factoriser** d’énormes nombres (RSA) ou résoudre des logarithmes discrets sur des **courbes elliptiques**. Les inverser demanderait un temps de calcul irréaliste.

## Dans la vie quotidienne

Quand votre navigateur affiche un cadenas, il a déjà utilisé la cryptographie à clé publique pour vérifier le site et établir une clé partagée rapide pour le reste de la session.`,
  },
  {
    title: 'La suite de Fibonacci',
    question: 'Qu’est-ce que la suite de Fibonacci et pourquoi apparaît-elle dans la nature ?',
    summary:
      'La suite de Fibonacci est une série où chaque nombre est la somme des deux précédents ; elle est liée au nombre d’or et apparaît dans des motifs comme les pétales des fleurs et les coquilles en spirale.',
    tags: ['mathématiques', 'motifs', 'nature', 'géométrie', 'science'],
    language: 'fr',
    content: `# La suite de Fibonacci

La suite de Fibonacci est l’un des motifs les plus célèbres des mathématiques : une règle simple qui produit des liens surprenants avec la géométrie et le monde naturel.

## La règle

Commencez par 0 et 1, puis faites de chaque nouveau nombre la **somme des deux précédents** :

\`\`\`
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
\`\`\`

La suite porte le nom du mathématicien italien **Léonard de Pise** (Fibonacci), qui l’a introduite en Europe en 1202 à travers une énigme sur l’élevage de lapins, bien qu’elle ait été connue plus tôt dans les mathématiques indiennes.

## Lien avec le nombre d’or

Divisez n’importe quel nombre de Fibonacci par le précédent, et le résultat se rapproche de plus en plus d’environ **1,618** — le **nombre d’or** (souvent noté φ). Plus on avance dans la suite, plus l’approximation devient exacte.

## Pourquoi elle apparaît dans la nature

Les nombres de Fibonacci apparaissent dans le nombre de pétales de nombreuses fleurs, la disposition des graines d’un tournesol et la ramification des plantes. La raison plus profonde est l’**empilement efficace** : disposer les feuilles ou les graines selon des angles liés au nombre d’or permet à une plante de capter la lumière ou de loger des graines avec un chevauchement minimal. Ce motif est donc moins une signature mystique qu’une conséquence naturelle de l’optimisation.

## Au-delà de la biologie

La suite apparaît aussi dans les algorithmes informatiques, l’analyse financière et l’art, où le nombre d’or est depuis longtemps associé à des proportions agréables.`,
  },
  {
    title: 'Les nombres premiers',
    question: 'Que sont les nombres premiers et pourquoi sont-ils importants ?',
    summary:
      'Les nombres premiers sont des entiers supérieurs à un qui n’ont d’autres diviseurs que un et eux-mêmes ; ils sont les briques de l’arithmétique et la base du chiffrement moderne.',
    tags: ['mathématiques', 'nombres', 'cryptographie', 'théorie', 'science'],
    language: 'fr',
    content: `# Les nombres premiers

Un nombre premier est un entier supérieur à 1 qui ne peut être divisé exactement que par 1 et par lui-même. Les premiers nombres premiers sont 2, 3, 5, 7, 11 et 13. Les nombres ayant d’autres diviseurs, comme 6 (= 2 × 3), sont dits **composés**.

## Les atomes de l’arithmétique

Les nombres premiers sont fondamentaux à cause du **théorème fondamental de l’arithmétique** : tout entier supérieur à 1 peut s’écrire comme produit de nombres premiers d’une seule manière (à l’ordre près). Par exemple, 60 = 2 × 2 × 3 × 5. En ce sens, les premiers sont les « atomes » indivisibles à partir desquels se construisent tous les autres nombres.

## En nombre infini

Le mathématicien grec **Euclide** a démontré il y a plus de deux mille ans qu’il n’existe pas de plus grand nombre premier — la liste se poursuit à l’infini. Pourtant, les premiers se raréfient à mesure que les nombres grandissent, et prédire exactement où ils se trouvent est un domaine profond et encore irrésolu des mathématiques, lié à la célèbre **hypothèse de Riemann**.

## Pourquoi ils comptent aujourd’hui

Les nombres premiers alimentent la **cryptographie** moderne. Des méthodes comme RSA reposent sur une asymétrie pratique : multiplier deux grands premiers est facile, mais prendre l’énorme nombre obtenu et retrouver les premiers d’origine (**factoriser**) est extraordinairement difficile avec les ordinateurs actuels. Cette difficulté garde sûrs la banque en ligne, la messagerie et le commerce.

## Une chasse continue

Des mathématiciens et des bénévoles utilisant des ordinateurs en réseau cherchent sans cesse des premiers toujours plus grands. Les plus grands premiers connus comptent désormais des dizaines de millions de chiffres.`,
  },
  {
    title: 'Les intérêts composés',
    question: 'Pourquoi les intérêts composés sont-ils si puissants avec le temps ?',
    summary:
      'Les intérêts composés sont les intérêts gagnés à la fois sur le capital initial et sur les intérêts déjà accumulés, ce qui produit une croissance exponentielle qui récompense l’épargne précoce et de long terme.',
    tags: ['finance', 'économie', 'mathématiques', 'monnaie', 'finances personnelles'],
    language: 'fr',
    content: `# Les intérêts composés

On appelle souvent les intérêts composés la force la plus puissante de la finance. C’est le fait de gagner des intérêts non seulement sur l’argent investi au départ, mais aussi sur les intérêts que cet argent a déjà rapportés.

## Simples ou composés

Avec les **intérêts simples**, vous gagnez un montant fixe à chaque période, fondé uniquement sur la somme de départ (le **capital**). Avec les **intérêts composés**, les intérêts de chaque période s’ajoutent au solde, de sorte que les intérêts de la période suivante se calculent sur un montant plus grand. La croissance s’accélère donc avec le temps : elle est **exponentielle** et non linéaire.

## Un exemple rapide

Placez 1 000 à 7 % par an :

- Après 1 an : 1 070
- Après 10 ans : environ 1 967
- Après 30 ans : environ 7 612

L’argent **double** à peu près chaque décennie sans ajouter un centime — et plus on le laisse, plus l’effet est spectaculaire.

## La règle de 72

Un raccourci pratique, la **règle de 72**, estime le temps qu’il faut pour qu’un placement double : divisez 72 par le taux d’intérêt annuel. À 8 %, l’argent double en environ 9 ans (72 ÷ 8).

## Pourquoi le temps compte le plus

Comme la capitalisation se construit sur elle-même, **commencer tôt** compte souvent plus qu’investir de grosses sommes plus tard. La même logique joue à l’inverse pour la dette : les soldes impayés des prêts ou des cartes à taux élevé se capitalisent contre l’emprunteur, ce qui explique pourquoi cette dette peut croître de façon alarmante.`,
  },
  {
    title: 'Les fonctions de hachage',
    question: 'Qu’est-ce qu’une fonction de hachage et où l’utilise-t-on ?',
    summary:
      'Une fonction de hachage transforme des données de toute taille en une chaîne de longueur fixe ; les bonnes fonctions de hachage cryptographiques sont rapides, déterministes et pratiquement impossibles à inverser ou à faire entrer en collision.',
    tags: ['technologie', 'informatique', 'cryptographie', 'sécurité', 'données'],
    language: 'fr',
    content: `# Les fonctions de hachage

Une fonction de hachage est un outil petit mais essentiel en informatique. Elle prend une entrée de n’importe quelle longueur — un mot, un fichier, une base de données entière — et produit une sortie de longueur fixe appelée **hachage** ou **empreinte**.

## Propriétés clés

Une fonction de hachage utile est :

- **Déterministe.** La même entrée produit toujours le même hachage.
- **Rapide** à calculer.
- **De longueur fixe.** Un message d’un caractère et un fichier d’un gigaoctet donnent, par exemple, un résultat de 256 bits.

Une fonction de hachage *cryptographique* ajoute des garanties plus fortes :

- **À sens unique.** À partir d’un hachage, on ne peut pas retrouver de façon réaliste l’entrée d’origine.
- **Résistante aux collisions.** Il est pratiquement impossible de trouver deux entrées différentes ayant le même hachage.
- **Effet d’avalanche.** Changer un seul caractère de l’entrée brouille entièrement la sortie.

## Usages quotidiens

- **Stockage des mots de passe.** Les systèmes stockent le hachage d’un mot de passe, pas le mot de passe lui-même, de sorte qu’une fuite de la base de données ne révèle pas directement les secrets des utilisateurs.
- **Vérifications d’intégrité.** Les téléchargements publient souvent un hachage pour vérifier qu’un fichier est arrivé intact et non altéré.
- **Structures de données.** Les **tables de hachage** utilisent le hachage pour trouver les éléments presque instantanément, quel que soit le volume de données.
- **Chaînes de blocs.** Les cryptomonnaies enchaînent les blocs au moyen de hachages, rendant le registre infalsifiable.

## Algorithmes courants

Les systèmes modernes préfèrent des fonctions robustes comme **SHA-256**. Les plus anciennes, comme MD5 et SHA-1, sont aujourd’hui considérées comme cassées pour la sécurité parce que des chercheurs ont trouvé des moyens de créer des collisions, et ne devraient pas servir à protéger des données sensibles.`,
  },
  {
    title: 'La machine de Turing',
    question: 'Qu’est-ce qu’une machine de Turing et pourquoi est-elle fondamentale pour l’informatique ?',
    summary:
      'La machine de Turing est un modèle mathématique simple du calcul, imaginé par Alan Turing en 1936, qui définit ce que signifie qu’un problème soit calculable et sous-tend toute l’informatique.',
    tags: ['informatique', 'mathématiques', 'théorie', 'histoire', 'technologie'],
    language: 'fr',
    content: `# La machine de Turing

La machine de Turing n’est pas un appareil physique, mais une expérience de pensée — un modèle mathématique qui saisit l’idée même de calcul. Proposée par **Alan Turing** en 1936, elle reste le fondement théorique de l’informatique.

## Une conception trompeusement simple

Une machine de Turing comprend :

- Un **ruban** infini divisé en cases, chacune contenant un symbole.
- Une **tête** qui peut lire et écrire le symbole situé en dessous et se déplacer à gauche ou à droite.
- Un ensemble d’**états** et une table de **règles** qui indiquent à la machine quoi faire selon son état actuel et le symbole qu’elle lit.

À partir de ces pièces minimales, la machine peut effectuer n’importe quelle procédure pas à pas. L’intuition de Turing fut que ce système simple est assez puissant pour réaliser **tout** calcul descriptible par un algorithme.

## Universalité

Turing a aussi décrit une machine **universelle** capable de lire la description de n’importe quelle autre machine de Turing puis de l’imiter. C’est l’ancêtre théorique de l’ordinateur programmable moderne : une machine qui exécute différents logiciels plutôt qu’un appareil distinct pour chaque tâche.

## Les limites du calcul

Le modèle a aussi révélé des limites. Turing a démontré que certains problèmes sont **indécidables** : aucun algorithme ne peut les résoudre. Le plus célèbre est le **problème de l’arrêt** : il n’existe pas de méthode générale pour déterminer, pour tout programme et toute entrée, si le programme finira par s’arrêter ou tournera indéfiniment.

## Une influence durable

Tout ce qu’un ordinateur réel peut calculer, une machine de Turing peut le calculer aussi (avec assez de temps et de ruban). Cette équivalence explique pourquoi le modèle définit encore les frontières de ce que les ordinateurs peuvent — et ne peuvent pas — faire.`,
  },
  {
    title: 'Débit et latence',
    question: 'Quelle est la différence entre le débit et la latence ?',
    summary:
      'Le débit est la quantité de données qu’une connexion peut transporter par seconde, tandis que la latence est le délai avant que les données commencent à arriver ; les deux déterminent la « rapidité » ressentie d’un réseau, mais ne sont pas la même chose.',
    tags: ['technologie', 'réseaux', 'internet', 'informatique', 'ingénierie'],
    language: 'fr',
    content: `# Débit et latence

On dit souvent qu’une connexion est « rapide », mais la vitesse a en réalité deux dimensions distinctes : le **débit** et la **latence**. Les confondre est une source fréquente de frustration avec les réseaux.

## Débit : combien

Le **débit** est la quantité maximale de données qu’une connexion peut transférer en un temps donné, généralement mesurée en mégabits ou gigabits par seconde. Une analogie utile est la largeur d’un tuyau : un tuyau plus large laisse passer plus d’eau à la fois. Le débit aide surtout à déplacer de **grandes** quantités de données — diffuser de la vidéo haute résolution, télécharger de gros fichiers ou sauvegarder dans le nuage.

## Latence : à quelle vitesse

La **latence** est le délai entre l’envoi d’une requête et la réception de la première réponse, mesuré en millisecondes. Dans l’analogie du tuyau, c’est le temps que met l’eau à aller d’un bout à l’autre. La latence dépend de la distance (les signaux ne peuvent pas dépasser la vitesse de la lumière), du nombre de sauts réseau et des délais de traitement. La latence compte surtout pour les tâches **interactives** — visioconférences, jeux en ligne et requêtes web rapides.

## Pourquoi la différence compte

Une connexion peut avoir un débit élevé mais une latence élevée, ou l’inverse. Une liaison par satellite peut transporter beaucoup de données et pourtant sembler lente parce que chaque signal parcourt des dizaines de milliers de kilomètres. C’est pourquoi une vidéo peut se diffuser sans accroc (débit) tandis qu’un jeu paraît encore saccadé (latence).

## Termes liés

Le **débit utile (throughput)** est le taux de données réellement atteint en pratique, généralement inférieur au débit théorique. La **gigue (jitter)** est la variation de la latence dans le temps, qui peut perturber la voix et la vidéo même si la latence moyenne est faible.`,
  },
  // ── Batch 4: Esprit, santé et vie quotidienne ──
  {
    title: 'L’effet placebo',
    question: 'Pourquoi un faux traitement peut-il parfois faire que les gens se sentent mieux ?',
    summary:
      'L’effet placebo est une amélioration réelle des symptômes produite par les attentes et les croyances d’une personne au sujet d’un traitement, et non par un principe actif.',
    tags: ['médecine', 'psychologie', 'santé', 'science', 'esprit'],
    language: 'fr',
    content: `# L’effet placebo

L’effet placebo se produit quand l’état de santé d’une personne s’améliore réellement après avoir reçu un traitement sans aucun principe actif thérapeutique — comme une pilule de sucre ou une injection de sérum physiologique. L’amélioration vient de la réponse du corps et de l’esprit au fait de *s’attendre* à aller mieux.

## Une réponse réelle et mesurable

Les placebos ne sont pas « tout dans la tête » au sens méprisant. L’attente peut déclencher de réels changements physiologiques : le cerveau peut libérer ses propres substances analgésiques (comme les endorphines), et les réponses au stress peuvent se modifier. L’effet est le plus fort sur les symptômes façonnés par la perception, comme la **douleur, les nausées, la fatigue et l’anxiété**, et le plus faible sur les processus objectifs de la maladie : un placebo ne réduira pas une tumeur ni ne guérira une infection.

## Pourquoi cela compte pour la science

Comme la seule attente peut changer le ressenti, les essais médicaux utilisent des **contrôles avec placebo**. Les patients reçoivent au hasard le vrai médicament ou un placebo et, idéalement, ni eux ni les chercheurs ne savent qui a reçu quoi (un essai en **double aveugle**). Un nouveau traitement doit faire mieux que le placebo pour être jugé efficace.

## L’effet nocebo

Le revers est l’**effet nocebo** : des attentes négatives peuvent produire de réels symptômes négatifs. Être simplement averti des effets secondaires possibles d’un médicament peut faire que certains les ressentent.

## Éthique et usage

Tromper délibérément les patients pose des problèmes éthiques, c’est pourquoi les médecins prescrivent rarement des placebos purs. Mais comprendre l’effet aide à expliquer pourquoi un cadre clinique bienveillant et assuré contribue lui-même à la guérison.`,
  },
  {
    title: 'Pourquoi nous dormons',
    question: 'Pourquoi les êtres humains ont-ils besoin de dormir ?',
    summary:
      'Le sommeil est un état vital et actif où le cerveau et le corps effectuent réparation, consolidation de la mémoire et élimination des déchets ; le manque chronique de sommeil nuit à la santé, à l’humeur et à la cognition.',
    tags: ['biologie', 'santé', 'neurosciences', 'psychologie', 'science'],
    language: 'fr',
    content: `# Pourquoi nous dormons

Le sommeil occupe environ un tiers de la vie humaine, mais il est loin d’être inactif. C’est un état actif et finement régulé, essentiel à la santé physique et mentale.

## Les stades du sommeil

Une nuit de sommeil parcourt des stades environ toutes les 90 minutes :

- **Le sommeil non paradoxal**, qui inclut le sommeil profond à « ondes lentes », quand le corps répare les tissus, fabrique os et muscles et renforce le système immunitaire.
- **Le sommeil paradoxal (mouvements oculaires rapides)**, quand surviennent la plupart des rêves vifs et que le cerveau est très actif.

## Ce que fait le sommeil

La recherche pointe plusieurs fonctions essentielles :

- **Consolidation de la mémoire.** Le cerveau rejoue et réorganise les expériences de la journée, déplaçant l’information vers le stockage à long terme et renforçant l’apprentissage.
- **Élimination des déchets.** Pendant le sommeil, le cerveau évacue des sous-produits métaboliques, dont des protéines liées aux maladies neurodégénératives.
- **Restauration.** Les hormones qui régulent la croissance, l’appétit et le stress se rééquilibrent.

## Le coût de trop peu de sommeil

La privation chronique de sommeil est liée à une baisse de l’attention et du jugement, à un affaiblissement de l’immunité, à une prise de poids et à un risque accru de maladies cardiaques, de diabète et de troubles de l’humeur. Même des déficits modestes mais durables réduisent de façon mesurable les performances mentales.

## L’horloge biologique

Le sommeil est régi par le **rythme circadien**, une horloge interne d’environ 24 heures synchronisée surtout par la lumière. Le perturber — par le travail posté, le décalage horaire ou les écrans tardifs — peut dégrader la qualité du sommeil même si le nombre total d’heures paraît suffisant.`,
  },
  {
    title: 'La caféine et le cerveau',
    question: 'Comment la caféine vous tient-elle éveillé ?',
    summary:
      'La caféine combat la somnolence en bloquant l’adénosine, une substance cérébrale qui s’accumule au cours de la journée et favorise le sommeil, masquant temporairement la fatigue plutôt que de l’éliminer.',
    tags: ['biologie', 'neurosciences', 'santé', 'chimie', 'esprit'],
    language: 'fr',
    content: `# La caféine et le cerveau

La caféine est la substance psychoactive la plus consommée au monde, présente dans le café, le thé, le chocolat et de nombreux sodas. Elle agit en interférant avec l’un des signaux de sommeil naturels du cerveau.

## Bloquer le signal de « fatigue »

Tant que vous restez éveillé, une molécule appelée **adénosine** s’accumule peu à peu dans le cerveau. Quand l’adénosine se lie à ses récepteurs, elle ralentit l’activité nerveuse et provoque la somnolence. La caféine a une forme semblable à l’adénosine, elle se glisse donc dans ces mêmes récepteurs et les bloque — sans les activer. Le cerveau cesse de recevoir le message « tu es fatigué » et la vigilance monte.

## Effets en cascade

L’adénosine étant bloquée, les stimulants naturels du cerveau, comme la dopamine et l’adrénaline, agissent plus librement. C’est pourquoi la caféine peut aiguiser la concentration, remonter l’humeur et accélérer le rythme cardiaque.

## Elle masque, mais n’efface pas, la fatigue

Surtout, la caféine n’élimine pas le besoin sous-jacent de sommeil. L’adénosine continue de s’accumuler derrière le blocage ; quand la caféine se dissipe, elle peut affluer vers les récepteurs désormais libres, ce qui provoque parfois un « coup de pompe ».

## Tolérance et sevrage

Avec un usage régulier, le cerveau crée davantage de récepteurs, il faut donc plus de caféine pour le même effet : la **tolérance**. Arrêter brutalement peut causer des symptômes de **sevrage**, comme maux de tête et irritabilité, pendant quelques jours. Les effets s’estompent aussi lentement : la caféine a une demi-vie de plusieurs heures, si bien qu’un café de l’après-midi peut encore perturber le sommeil de la nuit.`,
  },
  {
    title: 'L’effet Doppler',
    question: 'Pourquoi une sirène change-t-elle de hauteur quand elle passe près de vous ?',
    summary:
      'L’effet Doppler est le changement de la fréquence observée d’une onde lorsque la source et l’observateur se déplacent l’un par rapport à l’autre, ce qui explique la variation de hauteur des sirènes et le décalage vers le rouge des galaxies lointaines.',
    tags: ['physique', 'ondes', 'son', 'astronomie', 'science'],
    language: 'fr',
    content: `# L’effet Doppler

L’effet Doppler est le changement de fréquence d’une onde à mesure que sa source s’approche ou s’éloigne d’un observateur. Il est le plus familier avec le son, mais s’applique à toutes les ondes, y compris la lumière.

## L’exemple du quotidien

Quand une ambulance approche, sa sirène sonne plus aigu ; quand elle passe et s’éloigne, la hauteur baisse. La sirène elle-même ne change jamais. Ce qui change, c’est la façon dont les ondes sonores vous parviennent :

- Quand la source **approche**, chaque onde est émise un peu plus près que la précédente, si bien que les ondes se tassent : longueur d’onde plus courte, fréquence **plus élevée** (son plus aigu).
- Quand elle **s’éloigne**, les ondes s’étirent : longueur d’onde plus longue, fréquence **plus basse** (son plus grave).

## Pourquoi cela arrive

L’effet naît uniquement du mouvement relatif, qui comprime ou étire l’espacement entre les crêtes successives des ondes. Plus le mouvement relatif est rapide, plus le décalage est grand.

## L’effet Doppler avec la lumière

La lumière se décale aussi. Le mouvement d’éloignement étire la lumière vers des longueurs d’onde plus longues et plus rouges (**décalage vers le rouge**) ; celui de rapprochement la décale vers le bleu (**décalage vers le bleu**). C’est une pierre angulaire de l’astronomie : le décalage vers le rouge des galaxies lointaines a révélé que l’univers est en **expansion**, et les décalages Doppler permettent aux astronomes de mesurer le mouvement des étoiles et des galaxies.

## Usages pratiques

Le principe alimente les **radars** de vitesse, le radar météo qui suit le mouvement des tempêtes et l’**échographie Doppler** médicale, qui mesure le flux sanguin en renvoyant le son sur les cellules en mouvement.`,
  },
  {
    title: 'Pourquoi le ciel est bleu',
    question: 'Pourquoi le ciel est-il bleu le jour et rouge au coucher du soleil ?',
    summary:
      'Le ciel est bleu parce que les molécules de l’air diffusent la lumière bleue de courte longueur d’onde bien plus que les autres couleurs ; au coucher, la lumière traverse plus d’atmosphère, diffusant le bleu et laissant les rouges.',
    tags: ['physique', 'lumière', 'atmosphère', 'optique', 'science'],
    language: 'fr',
    content: `# Pourquoi le ciel est bleu

La couleur bleue du ciel de jour et les couleurs flamboyantes du coucher de soleil viennent de la même physique : la diffusion de la lumière solaire par l’atmosphère.

## La lumière du soleil est un mélange de couleurs

Bien qu’elle paraisse blanche, la lumière du soleil contient toutes les couleurs de l’arc-en-ciel, chacune avec une **longueur d’onde** différente — le bleu et le violet sont courts, le rouge et l’orange sont longs.

## La diffusion de Rayleigh

En traversant l’air, la lumière du soleil heurte des molécules de gaz bien plus petites que sa longueur d’onde. Ces minuscules molécules diffusent les **courtes** longueurs d’onde bien plus que les longues — un effet appelé **diffusion de Rayleigh**, où la diffusion augmente fortement quand la longueur d’onde diminue. La lumière bleue est diffusée environ dix fois plus que la rouge.

## Pourquoi le bleu, et non le violet

Le violet est diffusé encore plus que le bleu, alors pourquoi le ciel n’est-il pas violet ? Pour deux raisons : le Soleil émet moins de violet que de bleu, et l’œil humain est plus sensible au bleu. La combinaison fait que le ciel nous paraît bleu.

## Lever et coucher de soleil

Quand le Soleil est bas sur l’horizon, sa lumière traverse une tranche d’atmosphère bien plus épaisse. Le temps qu’elle vous parvienne, l’essentiel du bleu a été diffusé dans d’autres directions, laissant dominer les **rouges et oranges** de plus grande longueur d’onde. La poussière et la pollution peuvent encore intensifier ces couleurs.

## Sur d’autres mondes

La couleur d’un ciel dépend de son atmosphère. Mars, avec son air mince et poussiéreux, peut montrer un ciel de jour couleur caramel et des couchers de soleil bleutés — l’inverse de la Terre.`,
  },
  {
    title: 'La résistance aux antibiotiques',
    question: 'Pourquoi les antibiotiques deviennent-ils moins efficaces ?',
    summary:
      'La résistance aux antibiotiques apparaît quand des bactéries évoluent pour survivre à des médicaments qui les tuaient autrefois ; le surusage et le mésusage accélèrent ce processus, menaçant de rendre à nouveau dangereuses des infections courantes.',
    tags: ['médecine', 'biologie', 'santé', 'évolution', 'science'],
    language: 'fr',
    content: `# La résistance aux antibiotiques

La résistance aux antibiotiques est l’une des menaces les plus graves de la médecine moderne. Elle survient quand des bactéries changent de sorte que les médicaments conçus pour les tuer cessent de fonctionner.

## L’évolution en accéléré

Les antibiotiques tuent ou stoppent les bactéries, mais dans toute grande population, quelques microbes peuvent porter des mutations aléatoires qui les aident à survivre. Quand les antibiotiques éliminent les bactéries vulnérables, ces survivants résistants se multiplient et transmettent leur résistance. Les bactéries peuvent aussi **échanger directement des gènes de résistance** entre elles, propageant le trait rapidement. C’est de la **sélection naturelle** qui se produit en quelques jours, pas en millénaires.

## Ce qui l’alimente

Le processus est accéléré par le comportement humain :

- **Le surusage** — prescrire des antibiotiques pour des maladies virales comme le rhume, qu’ils ne peuvent traiter.
- **Les traitements incomplets** — s’arrêter trop tôt, laissant en vie les bactéries les plus coriaces.
- **L’usage intensif en agriculture** — administrer de façon routinière à des animaux sains.

## Pourquoi c’est dangereux

À mesure que la résistance se propage, des infections, des chirurgies et des traitements autrefois courants comme la chimiothérapie deviennent plus risqués. Les « superbactéries » résistantes à plusieurs médicaments causent déjà de nombreux décès chaque année, et le réservoir d’antibiotiques vraiment nouveaux est resté mince.

## Ce qui aide

Ralentir la résistance suppose d’utiliser les antibiotiques seulement quand c’est nécessaire, de terminer les traitements prescrits, d’améliorer l’hygiène et la vaccination pour prévenir les infections dès le départ, et d’investir dans la recherche de nouveaux traitements. C’est une responsabilité partagée entre patients, médecins, agriculteurs et gouvernements.`,
  },
  {
    title: 'Le cycle de l’azote',
    question: 'Comment l’azote circule-t-il entre l’air, le sol et les êtres vivants ?',
    summary:
      'Le cycle de l’azote est l’ensemble des processus qui convertissent l’azote entre sa forme atmosphérique inerte et des composés utilisables par le vivant, essentiel aux protéines et à l’ADN et central pour l’agriculture.',
    tags: ['biologie', 'sciences de la terre', 'agriculture', 'chimie', 'environnement'],
    language: 'fr',
    content: `# Le cycle de l’azote

L’azote est essentiel à toute vie — il fait partie des protéines et de l’ADN. Bien que l’air soit composé d’environ 78 % d’azote gazeux, la plupart des organismes ne peuvent pas l’utiliser directement. Le cycle de l’azote est la série de processus naturels qui convertit l’azote en formes utilisables, et inversement.

## Le problème du N2

L’azote atmosphérique existe sous forme de **N2**, deux atomes liés par une triple liaison exceptionnellement forte. Rompre cette liaison demande beaucoup d’énergie, si bien que les plantes et les animaux ne peuvent pas puiser par eux-mêmes dans la vaste réserve de l’air.

## Étapes clés

- **Fixation de l’azote.** Des **bactéries** spécialisées — dont beaucoup vivent dans les racines de légumineuses comme les haricots et le trèfle — convertissent le N2 en ammoniac. La foudre et les procédés industriels fixent aussi l’azote.
- **Nitrification.** D’autres bactéries convertissent l’ammoniac en **nitrites** puis en **nitrates**, la forme que la plupart des plantes absorbent par leurs racines.
- **Assimilation.** Les plantes captent les nitrates pour bâtir des protéines ; les animaux obtiennent leur azote en mangeant des plantes ou d’autres animaux.
- **Décomposition et ammonification.** Quand les organismes meurent ou excrètent, les décomposeurs renvoient l’azote au sol sous forme d’ammoniac.
- **Dénitrification.** Enfin, certaines bactéries reconvertissent les nitrates en N2 gazeux, bouclant le cycle.

## L’impact humain

L’invention du **procédé Haber-Bosch**, qui fixe l’azote industriellement pour fabriquer des engrais, a énormément accru la production alimentaire et soutient aujourd’hui une grande partie de la population mondiale. Mais l’excès d’engrais qui ruisselle surcharge rivières et mers, causant des **proliférations d’algues** et des « zones mortes » privées d’oxygène, faisant du cycle de l’azote une préoccupation environnementale majeure.`,
  },
  {
    title: 'Comment fonctionne la mémoire',
    question: 'Comment le cerveau stocke-t-il et retrouve-t-il les souvenirs ?',
    summary:
      'La mémoire est la capacité du cerveau d’encoder, de stocker et de récupérer l’information en modifiant les connexions entre neurones ; elle comporte plusieurs types et est reconstructive, non parfaite.',
    tags: ['neurosciences', 'psychologie', 'biologie', 'esprit', 'science'],
    language: 'fr',
    content: `# Comment fonctionne la mémoire

La mémoire nous permet d’apprendre du passé et de donner du sens au présent. Plutôt qu’un unique classeur, c’est un ensemble de systèmes liés.

## Trois processus de base

- **Encodage.** Transformer une expérience en une forme que le cerveau peut stocker, aidé par l’attention et le sens.
- **Stockage.** Conserver cette information dans le temps.
- **Récupération.** La ramener quand on en a besoin.

## Types de mémoire

- La **mémoire sensorielle** retient des impressions brutes pendant une fraction de seconde.
- La **mémoire à court terme (de travail)** garde une petite quantité d’information active pendant quelques secondes — assez pour composer un numéro de téléphone.
- La **mémoire à long terme** peut stocker d’énormes quantités pendant des années. Elle comprend la mémoire **explicite** (faits et événements que l’on peut décrire) et la mémoire **implicite** (compétences comme faire du vélo).

## La biologie

On pense que les souvenirs sont stockés sous forme de motifs de connexions renforcées entre neurones — un principe souvent résumé par « les neurones qui s’activent ensemble se câblent ensemble ». L’**hippocampe** est crucial pour former de nouveaux souvenirs à long terme, tandis que les souvenirs plus anciens et consolidés dépendent davantage du cortex. Le **sommeil** joue un rôle clé dans la consolidation de l’apprentissage de la journée.

## La mémoire est reconstructive

Se souvenir n’est pas comme rejouer un enregistrement. Chaque fois que vous vous rappelez quelque chose, le cerveau le reconstruit, et les détails peuvent se décaler ou se mêler à d’autres informations. C’est pourquoi les souvenirs des témoins peuvent être faux avec assurance, et pourquoi se remémorer de façon répétée peut subtilement réécrire l’original.`,
  },
  // ── Batch 5: Espace et astronomie ──
  {
    title: 'Les phases de la Lune',
    question: 'Pourquoi la Lune change-t-elle de forme au cours du mois ?',
    summary:
      'Les phases de la Lune sont dues au changement d’angle sous lequel nous voyons sa moitié éclairée par le Soleil ; la Lune ne change pas, seule la part de son côté éclairé qui nous fait face change.',
    tags: ['astronomie', 'lune', 'espace', 'sciences de la terre', 'science'],
    language: 'fr',
    content: `# Les phases de la Lune

La Lune semble changer de forme au cours d’un mois, passant d’un fin croissant à un disque plein puis revenant. La Lune elle-même ne change pas — ce qui change, c’est la part de sa moitié éclairée par le Soleil que nous pouvons voir depuis la Terre.

## Pourquoi les phases se produisent

Le Soleil éclaire toujours la moitié de la Lune, comme il éclaire la moitié de la Terre. À mesure que la Lune orbite autour de la Terre tous les 29,5 jours environ, l’angle entre le Soleil, la Lune et la Terre change, de sorte que nous voyons différentes fractions de cette moitié éclairée.

## Les phases principales

- **Nouvelle Lune.** La Lune se trouve entre la Terre et le Soleil, son côté éclairé nous tourne donc le dos et elle est presque invisible.
- **Premier croissant → premier quartier → gibbeuse croissante.** Chaque nuit, une part plus grande du côté éclairé apparaît.
- **Pleine Lune.** La Terre est entre le Soleil et la Lune, nous voyons donc toute la face éclairée.
- **Gibbeuse décroissante → dernier quartier → dernier croissant.** La part éclairée se réduit vers la prochaine nouvelle Lune.

« Croissante » signifie qui augmente ; « décroissante », qui diminue.

## Toujours la même face

La Lune est en **rotation synchrone** avec la Terre : elle tourne une fois par orbite, et nous montre donc toujours le même côté. Les phases ne sont pas la « face cachée » de la Lune qui apparaîtrait ; ce n’est que la ligne jour/nuit (le **terminateur**) qui balaie la face que nous voyons toujours.

## À ne pas confondre avec une éclipse

Les phases sont un résultat quotidien de la géométrie orbitale. Les **éclipses** sont des événements plus rares qui exigent que les trois corps s’alignent presque exactement.`,
  },
  {
    title: 'Les comètes',
    question: 'Que sont les comètes et pourquoi développent-elles une queue ?',
    summary:
      'Les comètes sont des corps glacés du système solaire externe qui, en approchant du Soleil, libèrent gaz et poussière pour former une chevelure brillante et de longues queues qui pointent toujours à l’opposé du Soleil.',
    tags: ['astronomie', 'comètes', 'système solaire', 'espace', 'science'],
    language: 'fr',
    content: `# Les comètes

On appelle souvent les comètes des « boules de neige sales » : de petits corps de glace, de poussière et de roche restés de la formation du système solaire. La plupart de leur vie, elles sont sombres et invisibles, mais un voyage près du Soleil peut les transformer en l’un des spectacles les plus saisissants du ciel.

## D’où elles viennent

Les comètes naissent dans les confins froids du système solaire : la **ceinture de Kuiper**, au-delà de Neptune, et le **nuage d’Oort**, bien plus lointain, une vaste enveloppe qui entourerait le Soleil. De temps à autre, une poussée gravitationnelle en envoie une chuter vers l’intérieur.

## Anatomie d’une comète

- **Le noyau.** Le cœur solide de glace et de poussière, généralement de quelques kilomètres seulement.
- **La chevelure (coma).** En approchant du Soleil, la glace se sublime (passe directement du solide au gaz) et entoure le noyau d’un nuage brillant de gaz et de poussière.
- **Les queues.** Les comètes en ont souvent deux : une **queue de poussière** qui s’incurve le long de la trajectoire, et une **queue ionique** droite et bleutée de gaz chargé, poussée directement par le vent solaire.

## Les queues pointent à l’opposé du Soleil

Une surprise fréquente : la queue d’une comète ne traîne pas derrière comme de la fumée. **Le rayonnement solaire et le vent solaire** poussent vers l’extérieur la matière libérée, si bien que la queue pointe toujours à peu près **à l’opposé du Soleil** — même quand la comète repart vers l’espace.

## Des visiteuses prévisibles

Certaines comètes reviennent selon un calendrier régulier. La plus célèbre, la **comète de Halley**, revient tous les 76 ans environ et a été observée depuis plus de deux mille ans.`,
  },
  {
    title: 'Le cycle de vie d’une étoile',
    question: 'Comment naissent les étoiles, et comment meurent-elles ?',
    summary:
      'Les étoiles se forment à partir de nuages de gaz en effondrement, brillent en fusionnant l’hydrogène pendant l’essentiel de leur vie, et finissent en naines blanches, étoiles à neutrons ou trous noirs selon leur masse.',
    tags: ['astronomie', 'étoiles', 'espace', 'physique', 'science'],
    language: 'fr',
    content: `# Le cycle de vie d’une étoile

Les étoiles ne sont pas éternelles. Elles naissent, vivent de millions à des milliards d’années, et meurent de façons qui dépendent presque entièrement de la masse avec laquelle elles ont commencé.

## Naissance

Les étoiles se forment dans de vastes nuages de gaz et de poussière appelés **nébuleuses**. Quand une partie du nuage devient assez dense, la gravité la rassemble en une boule chaude et tournante. Quand le cœur devient assez chaud et dense, la **fusion nucléaire** s’allume : les atomes d’hydrogène fusionnent en hélium, libérant une énergie énorme. Une étoile est née.

## La séquence principale

Pendant l’essentiel de sa vie, une étoile est dans une phase longue et stable appelée **séquence principale**, équilibrant l’attraction de la gravité vers l’intérieur et la poussée de l’énergie de fusion vers l’extérieur. Notre Soleil est à peu près à la moitié de sa vie sur la séquence principale, d’environ 10 milliards d’années.

## La mort dépend de la masse

Quand une étoile épuise son hydrogène, son destin bifurque selon la masse :

- Les **étoiles comme le Soleil** gonflent en **géantes rouges**, puis se débarrassent de leurs couches externes, laissant un cœur dense qui refroidit appelé **naine blanche**.
- Les **étoiles massives** brûlent leur combustible vite et finissent dans une explosion colossale — une **supernova** — qui surpasse un instant l’éclat d’une galaxie. Le cœur restant devient une **étoile à neutrons** ultradense ou, s’il est assez massif, un **trou noir**.

## Recyclage cosmique

Les supernovas forgent et dispersent dans l’espace des éléments lourds comme le fer, le carbone et l’or. Ceux-ci enrichissent de nouvelles nébuleuses, qui forment de nouvelles étoiles et planètes. En un sens bien réel, les atomes de notre corps ont été fabriqués dans des étoiles mortes depuis longtemps.`,
  },
  {
    title: 'Les aurores polaires',
    question: 'Qu’est-ce qui cause les aurores boréales et australes ?',
    summary:
      'Les aurores sont des rideaux de lumière brillante produits quand des particules chargées venues du Soleil sont canalisées par le champ magnétique terrestre vers la haute atmosphère, où elles excitent des molécules de gaz.',
    tags: ['astronomie', 'atmosphère', 'météo spatiale', 'physique', 'science'],
    language: 'fr',
    content: `# Les aurores polaires

Les aurores — boréales (*aurora borealis*) et australes (*aurora australis*) — sont des manifestations lumineuses dans le ciel nocturne près des pôles. Elles sont le résultat visible d’un lien entre le Soleil et le champ magnétique de la Terre.

## La source solaire

Le Soleil émet sans cesse des particules chargées appelées **vent solaire**, et des sursauts d’activité comme les éruptions solaires peuvent envoyer des rafales particulièrement fortes. Quand ces particules atteignent la Terre, la plupart sont déviées par le **champ magnétique** de la planète.

## Canalisées vers les pôles

Le champ magnétique canalise une partie des particules vers les **pôles magnétiques**, c’est pourquoi les aurores se voient surtout aux hautes latitudes. Quand les particules plongent dans la haute atmosphère, elles entrent en collision avec des molécules de gaz.

## Pourquoi les couleurs

Chaque collision énergise une molécule de gaz, qui libère ensuite cette énergie sous forme de lumière :

- Le **vert**, la couleur la plus courante, provient de l’oxygène à des altitudes moyennes.
- Le **rouge** provient de l’oxygène très haut.
- Le **bleu et le violet** proviennent de l’azote.

Il en résulte des rideaux, des arcs et des spirales ondoyants qui changent à mesure que varient les flux de particules.

## Météo spatiale

Les fortes tempêtes solaires peuvent pousser les aurores vers des latitudes plus basses et, surtout, perturber les satellites, les communications radio et les réseaux électriques. L’étude des aurores fait donc partie de la surveillance de la « **météo spatiale** », et d’autres planètes dotées d’un champ magnétique, comme Jupiter et Saturne, ont leurs propres aurores spectaculaires.`,
  },
  {
    title: 'Années-lumière et distances cosmiques',
    question: 'Qu’est-ce qu’une année-lumière et comment mesure-t-on les distances dans l’espace ?',
    summary:
      'Une année-lumière est la distance que parcourt la lumière en un an ; comme les distances cosmiques sont énormes, les astronomes utilisent le temps de trajet de la lumière et des méthodes ingénieuses fondées sur la géométrie et la luminosité pour les mesurer.',
    tags: ['astronomie', 'espace', 'physique', 'mesure', 'science'],
    language: 'fr',
    content: `# Années-lumière et distances cosmiques

L’espace est si vaste que les unités ordinaires comme le kilomètre deviennent peu maniables. Pour gérer ces échelles, les astronomes mesurent la distance à l’aide de la vitesse de la lumière.

## Ce qu’est une année-lumière

Une **année-lumière** est la distance que parcourt la lumière en un an — environ 9 500 milliards de kilomètres. Malgré son nom, elle mesure une *distance*, pas un temps. La lumière est ce qu’il y a de plus rapide dans l’univers, une année-lumière représente donc une étendue énorme.

## Regarder le passé

Comme la lumière met du temps à voyager, voir un objet lointain, c’est le voir tel qu’il *était* quand la lumière est partie. La lumière du Soleil a environ 8 minutes quand elle nous parvient ; le système stellaire le plus proche, Alpha du Centaure, est à environ 4 années-lumière, nous le voyons donc tel qu’il était il y a 4 ans. Les galaxies les plus lointaines sont à des milliards d’années-lumière : des fenêtres sur l’univers primitif.

## Comment on mesure les distances

Les astronomes bâtissent une « **échelle des distances cosmiques** », avec des méthodes qui portent de plus en plus loin :

- **La parallaxe.** Pour les étoiles proches, les astronomes mesurent le léger décalage de la position apparente d’une étoile à mesure que la Terre orbite le Soleil — le même effet que vous voyez quand un objet proche se décale sur le fond quand vous bougez la tête.
- **Les chandelles standard.** Certaines étoiles et étoiles en explosion (comme les supernovas de type Ia) ont une luminosité réelle connue. En comparant leur éclat *apparent* à leur éclat *réel*, les astronomes calculent la distance.
- **Le décalage vers le rouge.** Pour les galaxies les plus lointaines, l’étirement de leur lumière révèle leur vitesse d’éloignement, qui se rapporte à la distance dans un univers en expansion.

Chaque échelon est étalonné sur celui du dessous, ce qui permet aux astronomes de cartographier le cosmos jusqu’à son bord visible.`,
  },
  {
    title: 'Les exoplanètes',
    question: 'Comment les astronomes trouvent-ils des planètes autour d’autres étoiles ?',
    summary:
      'Les exoplanètes sont des planètes en orbite autour d’étoiles autres que le Soleil ; les astronomes les détectent surtout par le léger assombrissement de la lumière stellaire lors d’un transit, ou par le faible vacillement de l’étoile.',
    tags: ['astronomie', 'exoplanètes', 'espace', 'science', 'découverte'],
    language: 'fr',
    content: `# Les exoplanètes

Une exoplanète est une planète en orbite autour d’une étoile autre que notre Soleil. Les premières exoplanètes confirmées autour d’une étoile semblable au Soleil ont été trouvées dans les années 1990 ; depuis, on en a découvert des milliers, transformant notre vision de la galaxie.

## Pourquoi elles sont difficiles à voir

Les planètes ne produisent pas leur propre lumière et sont minuscules à côté de leur étoile hôte éblouissante — comme repérer de loin une luciole près d’un projecteur. Aussi les astronomes détectent-ils en général les exoplanètes de façon **indirecte**, par leurs effets sur l’étoile.

## Les principales méthodes de détection

- **La méthode du transit.** Si l’orbite d’une planète passe entre nous et son étoile, elle bloque une fraction minuscule de la lumière stellaire, causant une petite baisse régulière de luminosité. Mesurer ces baisses révèle la taille et l’orbite de la planète. Le télescope Kepler de la NASA s’en est servi pour trouver des milliers de planètes.
- **La méthode des vitesses radiales.** La gravité d’une planète tire son étoile et la fait vaciller légèrement. Ce vacillement décale la lumière de l’étoile (par effet Doppler) et révèle la masse et l’orbite de la planète.

D’autres méthodes incluent l’**imagerie directe** de planètes grandes et lointaines et la **microlentille gravitationnelle**.

## Ce que nous avons appris

Les exoplanètes sont étonnamment variées : « Jupiters chauds » brûlants qui orbitent en quelques jours, « super-Terres » plus grandes que la nôtre, et mondes dans la **zone habitable**, où les températures pourraient permettre l’eau liquide. Ces découvertes suggèrent que les planètes sont communes — la plupart des étoiles en abriteraient — ce qui aiguise la recherche de mondes capables d’abriter la vie.`,
  },
  {
    title: 'Le Big Bang',
    question: 'Qu’est-ce que la théorie du Big Bang et quelles preuves l’étayent ?',
    summary:
      'La théorie du Big Bang soutient que l’univers a commencé il y a environ 13,8 milliards d’années à partir d’un état extrêmement chaud et dense et s’est étendu depuis, étayée par plusieurs lignes de preuves.',
    tags: ['astronomie', 'cosmologie', 'physique', 'univers', 'science'],
    language: 'fr',
    content: `# Le Big Bang

La théorie du Big Bang est la principale explication scientifique du début de l’univers. Elle affirme qu’il y a environ **13,8 milliards d’années**, l’univers a démarré dans un état extraordinairement chaud et dense, et qu’il s’est depuis étendu et refroidi.

## Une idée fausse courante

Le Big Bang n’a pas été une explosion *dans* un espace vide. C’est plutôt l’espace lui-même qui a commencé à s’étendre partout à la fois. Il n’y a pas de « centre » unique de l’univers ; chaque région s’éloigne de toutes les autres, comme des points à la surface d’un ballon qui se gonfle.

## Les preuves

Trois grandes observations étayent la théorie :

- **L’univers en expansion.** Dans les années 1920, Edwin Hubble a découvert que les galaxies lointaines s’éloignent de nous, et d’autant plus vite qu’elles sont éloignées. Rembobiner cette expansion pointe vers un commencement dense.
- **Le fond diffus cosmologique (CMB).** Une faible lueur de rayonnement micro-onde remplit tout le ciel : la rémanence refroidie de l’univers primitif et chaud, prédite avant d’être trouvée en 1965.
- **L’abondance des éléments légers.** La théorie prédit avec précision les proportions d’hydrogène, d’hélium et de lithium formées dans les premières minutes de l’univers.

## Ce qu’elle dit et ne dit pas

Le Big Bang décrit l’*évolution* de l’univers à partir d’une fraction de seconde — pas le « pourquoi » ultime ni ce qui, le cas échéant, est venu « avant ». Des questions restent ouvertes, dont la nature de la **matière noire** et de l’**énergie noire**, qui constituent ensemble l’essentiel du contenu de l’univers et régissent son expansion en cours.`,
  },
  {
    title: 'Les éclipses',
    question: 'Quelle est la différence entre une éclipse de Soleil et une éclipse de Lune ?',
    summary:
      'Les éclipses se produisent quand le Soleil, la Terre et la Lune s’alignent : une éclipse de Soleil survient quand la Lune masque le Soleil, et une éclipse de Lune quand l’ombre de la Terre tombe sur la Lune.',
    tags: ['astronomie', 'lune', 'soleil', 'espace', 'science'],
    language: 'fr',
    content: `# Les éclipses

Une éclipse se produit quand le Soleil, la Terre et la Lune s’alignent de sorte que l’un projette une ombre sur un autre, ou lui masque la vue. Il en existe deux types principaux, et il est facile de les confondre.

## Éclipse de Soleil

Une **éclipse de Soleil** se produit lors de la nouvelle Lune, quand **la Lune passe entre le Soleil et la Terre**, bloquant la lumière du Soleil. Comme l’ombre de la Lune est petite, seuls les gens situés dans une bande étroite de la Terre la voient.

- Lors d’une éclipse solaire **totale**, la Lune couvre entièrement le Soleil, révélant un instant la ténue atmosphère externe du Soleil (la couronne) et transformant le jour en pénombre.
- Une coïncidence remarquable le rend possible : le Soleil est environ 400 fois plus large que la Lune, mais aussi environ 400 fois plus loin, si bien que les deux paraissent de même taille dans notre ciel.

⚠️ Regarder directement une éclipse de Soleil sans filtres adaptés peut endommager les yeux.

## Éclipse de Lune

Une **éclipse de Lune** se produit lors de la pleine Lune, quand **la Terre passe entre le Soleil et la Lune**, projetant son ombre sur la Lune. Elle est visible de partout sur la face nocturne de la Terre et son observation est tout à fait sans danger.

Lors d’une éclipse de Lune totale, la Lune luit souvent d’un rouge cuivré — une « **Lune de sang** » — parce qu’une partie de la lumière solaire se courbe en traversant l’atmosphère terrestre et tombe sur la Lune, filtrée vers le rouge comme les couchers de soleil.

## Pourquoi pas chaque mois

L’orbite de la Lune est inclinée d’environ 5° par rapport à l’orbite de la Terre autour du Soleil, si bien que les trois corps ne s’alignent généralement pas avec précision. Cette inclinaison explique que les éclipses n’arrivent que quelques fois par an et non chaque mois.`,
  },
];
