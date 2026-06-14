import type { DraftArticle } from './types';
import { devPracticesEn } from './dev-practices.en';

// Batch: Programming & Development (version française native). Mêmes sujets et
// mêmes topicKey que dev-practices.en.ts, rédigés nativement pour un lectorat
// francophone de développeurs. Visuels partagés.

const promptOf = (key: string): string => {
  const hit = devPracticesEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const devPracticesFr: DraftArticle[] = [
  {
    topicKey: 'rebase-vs-merge',
    title: 'Git rebase ou merge : lequel choisir ?',
    question: 'Quelle est la différence entre git merge et git rebase, et quand utiliser chacun ?',
    summary:
      'Le merge préserve l’historique tel qu’il s’est produit en créant un commit de fusion ; le rebase rejoue vos commits sur une nouvelle base pour un historique linéaire et propre. Fusionnez les branches partagées, rebasez votre travail privé avant de le partager.',
    tags: ['programmation', 'git', 'contrôle de version', 'outils de développement'],
    language: 'fr',
    image: {
      prompt: promptOf('rebase-vs-merge'),
      alt: 'Deux voies se rejoignant à un aiguillage contre une voie reposée en une seule ligne droite',
    },
    sources: [
      { title: 'Pro Git — La rebase (Rebasing)', url: 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing' },
      { title: 'Atlassian — Merging vs Rebasing', url: 'https://www.atlassian.com/git/tutorials/merging-vs-rebasing' },
    ],
    content: `# Git rebase ou merge : lequel choisir ?

\`merge\` et \`rebase\` résolvent le même problème — combiner le travail d’une branche dans une autre — mais ils racontent deux histoires différentes de la façon dont cela s’est passé. Le merge enregistre l’historique *tel qu’il s’est réellement produit*, embranchements compris. Le rebase *réécrit* l’historique pour donner l’impression que vous aviez travaillé en ligne droite depuis le début. Aucun n’est « correct » ; ils sont optimisés pour des objectifs différents, et la fameuse règle qui les gouverne découle directement de ce que chacun fait.

## Ce que fait réellement chaque commande

Le **merge** prend les deux branches et les noue ensemble avec un nouveau **commit de fusion** qui possède deux parents. Les commits de votre branche restent exactement où ils étaient ; le commit de fusion réunit les chronologies. L’historique devient un graphe qui montre honnêtement « ces lignes se sont développées en parallèle, puis ont fusionné ».

Le **rebase**, lui, prend les commits de votre branche, les met de côté, se déplace jusqu’à la pointe de la branche cible, et **rejoue vos commits un par un** par-dessus. Le résultat est une ligne droite — comme si vous aviez démarré votre travail à partir du code le plus récent. Mais ces commits rejoués sont *de nouveaux commits avec de nouveaux ID* ; les originaux sont jetés. C’est le détail crucial : le rebase réécrit l’historique.

## Le compromis

| | Merge | Rebase |
| --- | --- | --- |
| Forme de l’historique | Graphe ramifié, fidèle aux faits | Ligne droite et propre |
| Crée-t-il de nouveaux commits ? | Un commit de fusion | Réécrit tous les commits rejoués |
| Préserve le contexte | Oui — montre quand et où le travail a divergé | Non — aplatit l’histoire |
| Gestion des conflits | Résolus une fois, dans la fusion | Possiblement par commit pendant le rejeu |
| Sûr sur les branches partagées | Oui | Non — réécrit la base des autres |

## La seule règle qui évite les catastrophes

**Ne rebasez jamais des commits que d’autres possèdent déjà.** Parce que le rebase remplace les commits par de nouveaux, rebaser une branche partagée/publique réécrit un historique sur lequel d’autres ont fondé leur travail — à leur prochain pull, leur historique et le vôtre divergent, produisant des commits dupliqués et une confusion pénible. La règle d’or : *rebasez le travail local privé ; fusionnez tout ce qui est partagé.*

Un flux de travail courant et sûr combine les deux : pendant que vous développez seul une branche de fonctionnalité, **rebasez-la régulièrement sur le dernier main** pour rester à jour avec un historique propre ; puis, pour l’intégrer dans le main partagé, faites un **merge** (souvent via une pull request). Vous obtenez à la fois un historique local soigné et une intégration honnête et non destructive.

## Conseils pratiques

- **Utilisez le merge** pour intégrer une branche terminée dans une branche partagée, et chaque fois que la branche est publique.
- **Utilisez le rebase** pour mettre à jour votre branche privée en cours sur de nouveaux commits de main, et pour ranger vos propres commits locaux désordonnés (rebase interactif) avant la revue.
- **Évitez le rebase** sur \`main\`/les branches partagées, et arrêtez-vous si vous ne savez pas si quelqu’un d’autre possède vos commits.

## FAQ

**Le rebase supprime-t-il mon travail ?**
Non — il réécrit les commits mais les changements sont préservés (et les anciens commits subsistent dans le reflog pour récupération). Il change les ID et l’ordre des commits, pas le contenu de vos modifications.

**Pourquoi certaines équipes interdisent-elles les commits de fusion ?**
Elles préfèrent un historique parfaitement linéaire pour la lisibilité et la bissection, alors elles imposent un rebase avant le merge (ou un « squash merge »). C’est un choix de style avec de vrais compromis, pas une question de correction.

**Qu’est-ce qu’un squash merge ?**
Il condense tous les commits d’une branche en un seul commit sur la branche cible — un historique soigné « un commit par fonctionnalité », au prix de la perte de la granularité des commits individuels de la branche.`,
  },
  {
    topicKey: 'rest-vs-graphql',
    title: 'REST ou GraphQL : quel style d’API choisir ?',
    question: 'Quelle est la différence entre les API REST et GraphQL, et quand utiliser chacune ?',
    summary:
      'REST expose de nombreux points d’accès fixes renvoyant chacun une forme définie ; GraphQL expose un seul point d’accès où le client demande exactement les champs voulus. GraphQL brille pour les besoins complexes et variés ; REST reste plus simple, cachable et omniprésent.',
    tags: ['programmation', 'api', 'rest', 'graphql'],
    language: 'fr',
    image: {
      prompt: promptOf('rest-vs-graphql'),
      alt: 'De multiples casiers de distribution fixes contre un comptoir unique honorant une commande sur mesure',
    },
    sources: [
      { title: 'GraphQL — introduction officielle', url: 'https://graphql.org/learn/' },
      { title: 'MDN — Aperçu des concepts HTTP et REST', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
    ],
    content: `# REST ou GraphQL : quel style d’API choisir ?

REST et GraphQL sont deux façons de concevoir la manière dont les clients demandent des données à un serveur. **REST** vous donne de nombreuses URL (points d’accès), chacune renvoyant un bloc de données fixe. **GraphQL** vous donne un point d’accès unique et un langage de requête, de sorte que le client précise *exactement* quels champs il veut et reçoit précisément cela — ni plus, ni moins. Le contraste se résume à qui décide de la forme de la réponse : le serveur (REST) ou le client (GraphQL).

## Comment ils diffèrent en pratique

Disons que vous voulez le nom d’un utilisateur et les titres de ses trois derniers articles.

**Avec REST**, vous appelez typiquement \`/users/123\` (renvoie tout l’objet utilisateur), puis \`/users/123/posts\` (renvoie les objets article complets). Vous avez obtenu bien plus que demandé (chaque champ d’utilisateur et d’article), et vous avez fait deux allers-retours. Ce sont les frictions classiques de REST : le **sur-chargement** (trop de champs) et le **sous-chargement** (devoir multiplier les appels pour composer une vue).

**Avec GraphQL**, vous envoyez une requête à un point d’accès unique en demandant \`user.name\` et \`user.posts(last: 3).title\`, et vous recevez exactement ces champs dans une seule réponse. Le client a obtenu précisément ses données en une seule requête.

## Le tableau des compromis

| | REST | GraphQL |
| --- | --- | --- |
| Points d’accès | Nombreux, par ressource | Un seul |
| Forme de la réponse | Fixée par le serveur | Choisie par le client |
| Sur/sous-chargement | Fréquent | Évité par conception |
| Mise en cache | Simple (cache HTTP par URL) | Plus difficile (une URL, requêtes variées) |
| Courbe d’apprentissage et outillage | Plus basse, universelle | Plus haute ; nécessite un schéma et une couche serveur |
| Versionnage | Souvent /v1, /v2 | Faire évoluer le schéma, déprécier les champs |
| Excelle pour | Ressources simples, stables, cachables | Données complexes, imbriquées, variables selon le client |

## Quand choisir l’un ou l’autre

**Optez pour REST quand** vos données sont relativement simples et structurées en ressources, que vous voulez vous appuyer sur un cache HTTP et un outillage mûrs, que vous construisez une API publique que de nombreux clients inconnus consommeront, ou que vous voulez simplement l’option la moins coûteuse en friction et la plus universellement comprise. REST reste le choix par défaut, et pour de bonnes raisons.

**Optez pour GraphQL quand** les clients ont besoin de nombreuses tranches différentes de données richement connectées (classique pour les applis mobiles qui minimisent les requêtes, et les tableaux de bord complexes), que vous agrégez plusieurs sources de back-end derrière un seul graphe, ou que les équipes front-end veulent itérer sur leurs besoins en données sans attendre de nouveaux points d’accès. Le coût : une complexité serveur accrue, un schéma à maintenir et une mise en cache plus difficile.

## FAQ

**GraphQL est-il « meilleur » que REST ?**
Non — il résout élégamment le sur/sous-chargement mais ajoute de la complexité et des défis de cache. Pour des API simples, REST est souvent le meilleur choix d’ingénierie. Adaptez l’outil aux besoins en données.

**Puis-je utiliser les deux ?**
Oui, c’est courant — beaucoup de systèmes exposent REST pour les surfaces simples/publiques et GraphQL pour les données complexes internes/applicatives, ou enveloppent des services REST derrière une passerelle GraphQL.

**GraphQL remplace-t-il la base de données ?**
Non — c’est une couche de requête d’API entre le client et le serveur. Votre serveur récupère toujours les données depuis des bases ou d’autres services ; GraphQL ne fait que façonner ce que le client reçoit.`,
  },
  {
    topicKey: 'sql-vs-nosql',
    title: 'SQL ou NoSQL : comment choisir une base de données',
    question: 'Quelle est la différence entre les bases SQL et NoSQL, et comment choisir ?',
    summary:
      'Les bases SQL stockent des lignes structurées avec un schéma fixe et de puissantes requêtes relationnelles ; le NoSQL échange une partie de cette structure contre flexibilité et mise à l’échelle horizontale. Le bon choix dépend de la forme de vos données, des besoins de cohérence et de l’échelle.',
    tags: ['programmation', 'bases de données', 'sql', 'nosql'],
    language: 'fr',
    image: {
      prompt: promptOf('sql-vs-nosql'),
      alt: 'Une grille rigide de cellules reliées contre une grappe souple de conteneurs variés',
    },
    sources: [
      { title: 'MongoDB — NoSQL vs SQL', url: 'https://www.mongodb.com/resources/basics/databases/nosql-explained' },
      { title: 'PostgreSQL — à propos (base relationnelle)', url: 'https://www.postgresql.org/about/' },
    ],
    content: `# SQL ou NoSQL : comment choisir une base de données

« SQL vs NoSQL » trie les bases de données selon la façon dont elles organisent les données. Les **bases SQL (relationnelles)** — PostgreSQL, MySQL et d’autres — stockent les données dans des tables de lignes et de colonnes avec un schéma prédéfini, et relient les tables par des relations. **NoSQL** est un terme parapluie pour tout le reste : magasins de documents, magasins clé-valeur, à colonnes larges et bases de graphes, qui assouplissent la structure rigide en tables pour gagner en flexibilité et en échelle. La décision ne tient pas à « plus récent contre plus ancien » ; il s’agit d’adapter la base à la forme de vos données et aux exigences de votre système.

## La différence essentielle : schéma et structure

Une base **relationnelle** exige une structure d’emblée : vous définissez les tables et les types de colonnes, chaque ligne s’y conforme, et la base l’impose. En retour, vous obtenez des requêtes puissantes (jointures SQL entre tables), de fortes garanties et des décennies de fiabilité. Le coût, c’est la rigidité — changer le schéma plus tard demande du soin, et le modèle relationnel passe traditionnellement à l’échelle plus naturellement *vers le haut* (un serveur plus gros) que *vers l’extérieur* (de nombreux serveurs).

Une base **NoSQL documentaire** (le type le plus courant) stocke des documents flexibles de type JSON. Différents enregistrements peuvent avoir différents champs ; vous pouvez imbriquer des données liées dans un même document. Cela convient aux données qui évoluent vite ou sont irrégulières, et c’était conçu dès le départ pour **passer à l’échelle horizontalement** sur de nombreuses machines. Le coût : moins de garanties intégrées, des requêtes inter-enregistrements plus faibles, et le risque de données incohérentes sans le schéma pour en assurer la police.

## Le compromis, par type

| Type | Stocke | Fort pour | Exemple d’usage |
| --- | --- | --- | --- |
| Relationnel (SQL) | Tables, lignes | Requêtes complexes, transactions, intégrité | Finance, commandes, tout ce qui est relationnel |
| Documentaire | Documents de type JSON | Schéma flexible, données imbriquées | Catalogues, profils, contenu |
| Clé-valeur | Clé simple → valeur | Recherches ultra-rapides, mise en cache | Sessions, caches, drapeaux de fonctionnalité |
| Colonnes larges | Lignes à colonnes dynamiques | Échelle d’écriture massive | Séries temporelles, journalisation à grande échelle |
| Graphe | Nœuds et relations | Données fortement connectées | Graphes sociaux, recommandations |

## Comment choisir

Posez trois questions :

- **Vos données sont-elles relationnelles et la cohérence est-elle critique ?** (Argent, inventaire, tout ce où une mise à jour à moitié faite est inacceptable.) → SQL, pour ses transactions et son intégrité.
- **La forme de vos données est-elle irrégulière ou changeante, ou devez-vous répartir les écritures sur de nombreux serveurs ?** → Un type de NoSQL adapté au schéma d’accès.
- **Quels sont vos schémas de requête ?** Beaucoup de jointures ad hoc et de reporting favorisent SQL ; les recherches simples par clé favorisent le clé-valeur ; les parcours profondément connectés favorisent le graphe.

Le défaut moderne honnête : **commencez avec une base relationnelle solide (par exemple PostgreSQL) sauf raison précise de faire autrement.** Elle couvre un éventail énorme de besoins, prend désormais en charge les colonnes JSON pour la flexibilité, et passe à l’échelle plus loin qu’on ne le croit. Tournez-vous vers NoSQL quand une exigence concrète — échelle extrême, schéma d’accès spécifique, données réellement sans schéma — l’impose.

## FAQ

**NoSQL est-il plus rapide que SQL ?**
Pas intrinsèquement — il peut être plus rapide pour des schémas précis (recherches simples par clé, écritures massives) et plus lent ou plus maladroit pour d’autres (jointures complexes). « Plus rapide » dépend entièrement de l’opération.

**Les bases SQL peuvent-elles passer à l’échelle de grands systèmes ?**
Oui — avec réplication, partitionnement et mise en cache, les bases relationnelles font tourner d’énormes systèmes. L’affirmation « SQL ne passe pas à l’échelle » est datée ; la montée en charge demande simplement une conception plus délibérée.

**Dois-je n’en choisir qu’une seule ?**
Non — la « persistance polyglotte » est courante : une base relationnelle pour les enregistrements centraux, plus un cache clé-valeur et peut-être un magasin de recherche ou de graphe, chacun pour ce qu’il fait le mieux.`,
  },
  {
    topicKey: 'https-how-it-works',
    title: 'Comment HTTPS sécurise votre connexion',
    question: 'Que fait réellement HTTPS, et comment le cadenas protège-t-il mes données ?',
    summary:
      'HTTPS enveloppe le trafic web ordinaire dans du chiffrement, pour que personne entre vous et le site ne puisse le lire ni l’altérer, et utilise des certificats pour prouver que vous parlez bien au bon serveur. Il protège la confidentialité et l’intégrité — mais pas le site lui-même.',
    tags: ['programmation', 'sécurité', 'https', 'web'],
    language: 'fr',
    image: {
      prompt: promptOf('https-how-it-works'),
      alt: 'Un message traversant un tube protecteur, brouillé pour les tiers, scellé comme vérifié',
    },
    sources: [
      { title: 'MDN — Qu’est-ce que HTTPS / TLS', url: 'https://developer.mozilla.org/en-US/docs/Glossary/HTTPS' },
      { title: 'Let’s Encrypt — comment ça marche', url: 'https://letsencrypt.org/how-it-works/' },
    ],
    content: `# Comment HTTPS sécurise votre connexion

HTTPS, c’est simplement HTTP — le protocole de requête/réponse de base du web — avec une couche de sécurité enroulée autour (le « S » signifie Secure, fourni par TLS). Le HTTP simple envoie tout en texte lisible que quiconque sur le chemin réseau peut voir et modifier. HTTPS corrige cela avec deux garanties : le **chiffrement** (les tiers ne peuvent pas lire votre trafic) et l’**authentification** (vous parlez bien au site que vous croyez, et non à un imposteur). Le cadenas est une promesse au sujet de la *connexion*, et comprendre exactement ce qu’il promet — et ne promet pas — est réellement utile.

## Les deux problèmes qu’il résout

**1. L’écoute clandestine.** En HTTP simple, votre réseau WiFi, votre fournisseur d’accès, ou quiconque entre les deux, peut lire chaque page et chaque mot de passe que vous envoyez. HTTPS chiffre le trafic pour qu’il soit du charabia illisible pour tout autre que les deux extrémités — même s’il transite par le même internet public.

**2. L’usurpation et l’altération.** Comment savez-vous que le serveur qui répond est vraiment votre banque, et non un attaquant qui intercepte la connexion ? HTTPS utilise des **certificats** émis par des autorités de confiance pour prouver l’identité du serveur, et des vérifications d’intégrité pour que toute altération en transit soit détectée. Sans cela, le chiffrement seul serait inutile — vous pourriez discuter en privé avec un voleur.

## Comment fonctionne la poignée de main (simplifiée)

Quand vous vous connectez en HTTPS, une négociation rapide a lieu avant que la moindre donnée réelle ne circule :

1. **Vérification du certificat.** Le serveur présente son certificat. Votre navigateur vérifie qu’il a été émis par une autorité de confiance pour ce domaine exact, qu’il n’est ni expiré ni révoqué — confirmant l’identité.
2. **Échange de clés.** À l’aide d’une cryptographie astucieuse (mathématiques à clé publique), les deux parties s’accordent sur une clé secrète partagée *sans jamais l’envoyer en clair*, même si quelqu’un observe.
3. **Session chiffrée.** À partir de là, tout le trafic est chiffré avec cette clé partagée — un chiffrement symétrique rapide pour le reste de la conversation.

La partie élégante, c’est l’étape 2 : les deux parties établissent une clé privée sur un canal public, de sorte que même un espion ayant vu toute la poignée de main ne peut pas la déduire.

## Ce que le cadenas signifie et ne signifie pas

| Le cadenas garantit | Le cadenas ne garantit PAS |
| --- | --- |
| Le trafic est chiffré en transit | Que le site est honnête ou sûr |
| Vous êtes connecté au vrai domaine | Que le site ne vous arnaquera pas |
| Les données n’ont pas été altérées en route | Que l’entreprise derrière est digne de confiance |

C’est le point le plus mal compris : HTTPS sécurise le *tuyau*, pas la *destination*. Un site d’hameçonnage peut avoir un cadenas valide — cela signifie seulement que votre connexion *vers l’arnaque* est privée. HTTPS protège vos données des tiers ; il ne se porte pas garant des intentions du site.

## FAQ

**HTTPS est-il plus lent que HTTP ?**
Négligeablement aujourd’hui — le matériel et les protocoles modernes rendent le surcoût de chiffrement minime, et HTTPS active souvent des fonctionnalités de protocole plus rapides. La vieille crainte « le chiffrement, c’est lent » est obsolète.

**Pourquoi HTTPS est-il désormais exigé partout, même pour les blogs ?**
Parce que même lire une page révèle des informations privées, et les pages non chiffrées peuvent être modifiées en transit (injection de pubs/maliciels). Les navigateurs marquent maintenant le HTTP simple comme « Non sécurisé », et les certificats gratuits ont supprimé la barrière du coût.

**HTTPS protège-t-il les données après leur arrivée sur le serveur ?**
Non — il protège les données *en transit*. Une fois arrivées sur le serveur, leur sécurité dépend de la façon dont le site les stocke et les traite. HTTPS est une couche, pas l’ensemble de la sécurité.`,
  },
  {
    topicKey: 'what-is-an-api',
    title: 'Qu’est-ce qu’une API, vraiment ? Une explication en clair',
    question: 'Qu’est-ce qu’une API, et comment fonctionne-t-elle concrètement, en termes simples ?',
    summary:
      'Une API est un contrat qui permet à un programme de demander des services à un autre sans connaître ses rouages internes — comme un menu de restaurant entre vous et la cuisine. Elle définit ce que vous pouvez demander et ce que vous recevez, en masquant la complexité derrière.',
    tags: ['programmation', 'api', 'fondamentaux', 'web'],
    language: 'fr',
    image: {
      prompt: promptOf('what-is-an-api'),
      alt: 'Un menu tendu par-dessus un comptoir, masquant une cuisine complexe, renvoyant un plat fini',
    },
    sources: [
      { title: 'MDN — Introduction aux API web', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction' },
      { title: 'Red Hat — Qu’est-ce qu’une API ?', url: 'https://www.redhat.com/en/topics/api/what-are-application-programming-interfaces' },
    ],
    content: `# Qu’est-ce qu’une API, vraiment ? Une explication en clair

API signifie « interface de programmation d’application » (Application Programming Interface), ce qui n’explique rien. Voici la version utile : une API est un **contrat qui permet à deux logiciels de se parler** — un programme offre des services, et l’API définit exactement comment un autre programme peut les demander. L’analogie classique est le restaurant. Vous (un programme) lisez un **menu** (l’API), commandez un plat (faites une requête), et la **cuisine** (l’autre programme) le prépare et l’envoie (la réponse). Vous n’entrez jamais dans la cuisine et n’apprenez pas ses recettes ; le menu est l’interface convenue entre vous.

## Pourquoi cela compte

Cet arrangement de restaurant capture tout l’intérêt : **vous obtenez ce dont vous avez besoin sans savoir comment c’est fait.** Quand une appli vous affiche une carte, elle ne contient pas la géographie du monde — elle interroge une API de cartographie. Quand un site vous laisse « payer avec PayPal », il ne traite pas les paiements lui-même — il appelle l’API de PayPal. Les API permettent aux logiciels de s’appuyer sur d’autres logiciels, pour que personne n’ait à réinventer les cartes, les paiements, les données météo ou les systèmes de connexion de zéro.

Cela apporte trois grands bénéfices :

- **L’abstraction** — vous utilisez un service sans en comprendre les rouages (vous commandez un plat sans savoir comment la cuisine fonctionne).
- **La réutilisation** — un seul service bien conçu propulse des milliers d’applis.
- **La séparation** — la cuisine peut changer entièrement ses recettes, et tant que le menu reste le même, votre commande fonctionne toujours. Les équipes peuvent modifier leurs rouages internes sans casser tous ceux qui en dépendent.

## Comment se déroule un appel d’API web

Les API les plus courantes aujourd’hui sont les **API web**, échangées par internet. Le déroulement est simple :

1. Votre programme envoie une **requête** à une URL précise (« l’article du menu »), souvent avec des paramètres (« un café moyen, sans sucre »).
2. Le serveur la reçoit, fait le travail (interroge une base de données, exécute la logique), puis
3. Renvoie une **réponse** — habituellement des données structurées au format **JSON**, que les programmes lisent facilement.

Par exemple, une appli météo demande \`api.weather.com/forecast?city=Tokyo\` et reçoit en retour un JSON avec la température et les conditions, qu’elle affiche ensuite joliment. L’appli a fourni la question ; l’API a fourni les données.

## Les API sont partout

| Ce que vous voyez | Derrière, un appel d’API à |
| --- | --- |
| « Se connecter avec Google » | L’API d’authentification de Google |
| Une carte intégrée dans une appli | Une API de cartographie |
| Le suivi de colis en direct | L’API du transporteur |
| « Payer par carte » | L’API d’un processeur de paiement |
| Un agent conversationnel dans une appli | L’API d’un fournisseur d’IA |

Le logiciel moderne est en grande partie des **API qui appellent des API** — chaque appli une petite cuisine qui commande aussi auprès d’autres.

## FAQ

**Une API, est-ce la même chose qu’un site web ?**
Non — un site web renvoie des pages mises en forme pour les humains ; une API renvoie des données structurées pour les programmes. Même idée (requête → réponse), public différent.

**Les API coûtent-elles de l’argent ?**
Certaines sont gratuites, beaucoup facturent à l’usage (par requête ou par volume), et certaines exigent une clé d’API pour vous identifier et vous facturer. Les API de cartographie, de paiement et d’IA mesurent couramment l’usage.

**Qu’est-ce qu’une « clé d’API » ?**
Un jeton secret qui identifie votre appli auprès de l’API, utilisé pour vous authentifier, imposer des limites et suivre l’usage — comme une carte de membre indiquant qui passe la commande.`,
  },
  {
    topicKey: 'sync-vs-async',
    title: 'Synchrone ou asynchrone : pourquoi le code attend (ou non)',
    question: 'Quelle est la différence entre programmation synchrone et asynchrone ?',
    summary:
      'Le code synchrone fait une chose à la fois, bloquant jusqu’à ce que chaque étape se termine ; le code asynchrone peut lancer une tâche lente et passer à autre chose, traitant le résultat plus tard. L’asynchrone garde les programmes réactifs face aux choses lentes comme le réseau et les fichiers.',
    tags: ['programmation', 'asynchrone', 'concurrence', 'fondamentaux'],
    language: 'fr',
    image: {
      prompt: promptOf('sync-vs-async'),
      alt: 'Un cuisinier attendant oisivement une casserole contre un cuisinier surveillant plusieurs casseroles à mesure',
    },
    sources: [
      { title: 'MDN — Introduction au JavaScript asynchrone', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing' },
    ],
    content: `# Synchrone ou asynchrone : pourquoi le code attend (ou non)

Cette distinction porte sur **ce qu’un programme fait pendant qu’il attend**. Le code **synchrone** s’exécute une étape à la fois, et chaque étape doit *se terminer complètement* avant que la suivante ne commence — si une étape est lente, tout ce qui la suit attend. Le code **asynchrone** peut *démarrer* une tâche lente, la mettre de côté, et continuer à faire d’autre travail utile, en traitant le résultat dès qu’il est prêt. La différence importe à peine pour les opérations rapides et énormément pour les lentes — appels réseau, lectures de fichiers, requêtes de base de données — qui sont précisément là où les programmes passent l’essentiel de leur temps d’inactivité.

## L’analogie de la cuisine

Imaginez préparer le petit-déjeuner. Un cuisinier **synchrone** met le pain dans le grille-pain puis *reste planté à le fixer* jusqu’à ce qu’il saute, sans rien faire d’autre, avant de lancer le café. Temps total : la somme de chaque étape, l’une après l’autre, attente comprise.

Un cuisinier **asynchrone** lance le pain et, *pendant qu’il grille*, démarre le café, et *pendant qu’il passe*, casse les œufs — surveillant chaque chose à mesure qu’elle se termine. Mêmes tâches, temps total bien moindre, parce que l’attente s’est chevauchée avec du travail utile. Le cuisinier n’est pas devenu plus rapide ; il a cessé de rester oisif.

## Pourquoi cela compte pour les vrais programmes

Les ordinateurs passent beaucoup de temps à attendre des choses lentes : un serveur qui répond, un disque qui lit, une base de données qui réplique — chacune une éternité comparée à la vitesse du processeur. Le code synchrone qui « bloque » pendant ces attentes gèle tout ce qui le suit. Dans un serveur web, un appel bloquant pourrait l’empêcher de servir tout autre utilisateur tant qu’une requête lente n’est pas finie ; dans une appli, c’est la redoutée interface figée et non réactive.

| | Synchrone | Asynchrone |
| --- | --- | --- |
| Ordre | Strictement une à la fois | Peut chevaucher les périodes d’attente |
| Sur une étape lente | Tout attend (bloque) | Le reste du travail continue |
| Simplicité | Plus facile à lire et à raisonner | Flot de contrôle plus complexe |
| Idéal pour | Étapes rapides et dépendantes | E/S lentes : réseau, fichiers, BD |

## Comment l’asynchrone s’exprime dans le code

Vous ne jonglez pas avec cela à la main — les langages fournissent des outils. Les schémas courants incluent les **callbacks** (exécute ceci une fois terminé), les **promises/futures** (un emplacement pour un résultat qui arrivera), et la syntaxe moderne **async/await** qui permet au code asynchrone de *se lire* presque comme du code synchrone tout en restant non bloquant. Le modèle mental clé : \`await\` signifie « mets en pause *cette* tâche-ci jusqu’à ce que le résultat soit prêt, mais laisse les autres tâches s’exécuter entre-temps » — et non « gèle tout le programme ».

Le compromis est réel : le code asynchrone est plus puissant pour la réactivité mais plus difficile à raisonner (l’ordre, la gestion des erreurs et l’état partagé deviennent plus délicats). L’art consiste à l’utiliser là où l’attente se produit réellement, et à garder la logique simple et rapide en synchrone.

## FAQ

**Asynchrone, est-ce la même chose que multithreadé/parallèle ?**
Pas nécessairement. L’asynchrone concerne le fait de ne pas *attendre oisivement* ; il peut s’exécuter sur un seul thread en entrelaçant les tâches pendant leurs temps d’attente. Le parallélisme, c’est vraiment faire des choses *en même temps* sur plusieurs cœurs. Ils sont liés mais distincts — l’asynchrone chevauche l’attente, le parallélisme chevauche le travail.

**L’asynchrone fait-il tourner mon code plus vite ?**
Il n’accélère pas le travail lui-même ; il cesse de gaspiller du temps à attendre, améliorant le débit et la réactivité. Pour du travail intensif en CPU sans attente, l’asynchrone seul apporte peu — c’est là que le parallelisme aide.

**Pourquoi le code asynchrone semble-t-il tellement plus déroutant ?**
Parce que l’exécution ne s’écoule plus de haut en bas dans le temps — les choses démarrent maintenant et finissent plus tard, les erreurs arrivent dans le désordre, et vous raisonnez sur le « quand » autant que sur le « quoi ». async/await dompte une bonne part de cela, mais la non-linéarité sous-jacente est la vraie difficulté.`,
  },
  {
    topicKey: 'what-is-docker',
    title: 'Qu’est-ce que Docker, et pourquoi les développeurs adorent les conteneurs ?',
    question: 'Qu’est-ce que Docker, que sont les conteneurs, et pourquoi sont-ils si répandus ?',
    summary:
      'Un conteneur empaquette une appli avec tout ce qu’il lui faut pour tourner en une unité portable, pour qu’elle se comporte de façon identique partout — résolvant le « ça marche sur ma machine ». Les conteneurs sont plus légers que les machines virtuelles car ils partagent le noyau de l’OS hôte.',
    tags: ['programmation', 'docker', 'conteneurs', 'devops'],
    language: 'fr',
    image: {
      prompt: promptOf('what-is-docker'),
      alt: 'Des conteneurs scellés identiques contenant chacun une appli autonome, empilables sur n’importe quelle plateforme',
    },
    sources: [
      { title: 'Docker — qu’est-ce qu’un conteneur ?', url: 'https://www.docker.com/resources/what-container/' },
    ],
    content: `# Qu’est-ce que Docker, et pourquoi les développeurs adorent les conteneurs ?

Docker est l’outil qui a rendu les **conteneurs** courants, et les conteneurs résolvent l’un des maux de tête les plus tenaces du logiciel : *« ça marche sur ma machine »* — du code qui tourne bien pour le développeur mais casse ailleurs parce que l’autre ordinateur a des versions, des réglages différents ou des pièces manquantes. Un conteneur corrige cela en **empaquetant une application avec tout ce dont elle a besoin pour tourner** — code, runtime, bibliothèques, outils système, configuration — en une seule unité scellée et portable qui se comporte de façon identique où qu’elle s’exécute. L’analogie du conteneur maritime est exacte : standardisez la boîte, et n’importe quel navire, grue ou camion peut la manipuler sans se soucier de ce qu’il y a dedans.

## Le problème qu’il résout

Le logiciel dépend de son environnement : une version de langage précise, des bibliothèques particulières, certains réglages système. Déplacez l’appli vers le portable d’un collègue, un serveur de test ou la production, et le moindre décalage peut la casser. Reproduire à la main l’environnement exact partout est fragile et exaspérant. Un conteneur regroupe l’environnement *avec* l’appli, de sorte que « l’environnement » voyage avec elle et qu’il n’y a rien à décaler. Construisez-le une fois ; il tourne à l’identique sur votre portable, la machine de votre coéquipier et le cloud.

## Conteneurs ou machines virtuelles

On compare souvent les conteneurs aux machines virtuelles (VM), qui isolent aussi le logiciel — mais la différence de poids est l’élément clé :

| | Machine virtuelle | Conteneur |
| --- | --- | --- |
| Empaquette | Tout un système d’exploitation invité + l’appli | Juste l’appli + ses dépendances |
| Partage | Rien — un OS complet chacun | Le noyau de l’OS hôte |
| Taille | Des gigaoctets | Des mégaoctets |
| Démarrage | Des minutes | Des secondes ou moins |
| Densité | Quelques-unes par machine | Beaucoup par machine |

Une VM virtualise un ordinateur entier, transportant un système d’exploitation complet par appli — puissant mais lourd. Un conteneur partage le noyau de l’OS hôte et n’isole que ce qui est au-dessus, ce qui le rend nettement plus léger et plus rapide à démarrer. Vous pouvez faire tourner de nombreux conteneurs là où vous ne logeriez que quelques VM.

## Pourquoi les développeurs et les ops les adorent

- **Cohérence** — élimine la dérive d’environnement entre dev, test et production. L’excuse du « ça marche sur ma machine » meurt.
- **Portabilité** — la même image de conteneur tourne sur toute machine dotée d’un runtime de conteneurs, y compris tous les grands clouds.
- **Isolation** — chaque conteneur est autonome, donc des applis aux dépendances conflictuelles coexistent paisiblement sur un même hôte.
- **Vitesse et densité** — le démarrage léger les rend idéaux pour monter et descendre en charge et pour s’empiler efficacement sur les serveurs.
- **Socle de l’infrastructure moderne** — les conteneurs sont la brique de base des microservices et des systèmes d’orchestration (comme Kubernetes) qui les font tourner à grande échelle.

## FAQ

**Docker, est-ce la même chose qu’un conteneur ?**
Pas exactement — les conteneurs sont le concept/la technologie ; Docker est la boîte à outils populaire qui les construit et les exécute. D’autres outils existent, mais Docker a popularisé le flux de travail et le format d’image.

**Les conteneurs remplacent-ils les machines virtuelles ?**
Souvent, mais pas toujours — ils sont fréquemment utilisés *ensemble* (des conteneurs tournant dans des VM dans le cloud). Les VM comptent encore pour une isolation plus forte et pour faire tourner différents systèmes d’exploitation ; les conteneurs l’emportent sur la légèreté et la vitesse.

**Un conteneur est-il une frontière de sécurité ?**
Il fournit une isolation, mais plus faible que celle d’une VM car les conteneurs partagent le noyau de l’hôte. Pour la plupart des usages, c’est suffisant ; pour des charges multi-locataires hostiles, les équipes ajoutent un durcissement supplémentaire ou combinent avec des VM.`,
  },
  {
    topicKey: 'big-o-notation',
    title: 'La notation Big-O expliquée sans le mal de crâne mathématique',
    question: 'Qu’est-ce que la notation Big-O, et pourquoi les programmeurs s’en soucient-ils ?',
    summary:
      'Le Big-O décrit comment le travail d’un algorithme croît à mesure que l’entrée grandit — non sa vitesse exacte, mais son comportement de mise à l’échelle. C’est pourquoi une approche reste rapide sur des millions d’éléments quand une autre s’enlise, et cela guide le choix de la bonne approche.',
    tags: ['programmation', 'algorithmes', 'informatique', 'performance'],
    language: 'fr',
    image: {
      prompt: promptOf('big-o-notation'),
      alt: 'Plusieurs courbes lumineuses partant d’une même origine, divergeant du plat au quasi-vertical',
    },
    sources: [
      { title: 'Khan Academy — Notation asymptotique', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation' },
    ],
    content: `# La notation Big-O expliquée sans le mal de crâne mathématique

La notation Big-O a des airs de mathématiques intimidantes, mais l’idée est simple et pratique : elle décrit **comment la quantité de travail d’un algorithme croît à mesure que l’entrée grandit.** Elle ignore délibérément les temps exacts (qui dépendent du matériel) et se concentre sur la *forme* de la croissance. C’est ce qui compte vraiment à grande échelle : un algorithme à l’aise sur 100 éléments pourrait prendre une fraction de seconde ou bien une semaine sur 10 millions d’éléments, et le Big-O vous dit lequel — avant que vous ne le découvriez de la manière douloureuse.

## Pourquoi « comment ça croît » prime sur « à quelle vitesse »

Le temps d’exécution réel dépend de la machine, du langage, du jour. Le Big-O élimine cela pour comparer le *comportement de mise à l’échelle* — parce que c’est ce qui survit à la croissance. Une approche deux fois plus rapide sur de petites entrées mais à la croissance pire perdra catastrophiquement à mesure que les données grandissent. La question à laquelle le Big-O répond n’est pas « combien de temps cela prend-il ? » mais « **que se passe-t-il quand l’entrée devient 10 fois ou 1000 fois plus grande ?** » — la question qui décide si votre logiciel fonctionnera encore l’an prochain.

## Les classes courantes, en clair

Pensez à \`n\` comme à la taille de l’entrée (le nombre d’éléments) :

| Big-O | Nom | Sens en clair | Exemple |
| --- | --- | --- | --- |
| O(1) | Constant | Même travail quelle que soit la taille | Récupérer un élément par son indice |
| O(log n) | Logarithmique | Croît très lentement ; divisé par deux à chaque étape | Recherche dichotomique dans des données triées |
| O(n) | Linéaire | Le travail croît au rythme de l’entrée | Parcourir une liste une fois |
| O(n log n) | Linéarithmique | Un peu pire que linéaire | Bons algorithmes de tri |
| O(n²) | Quadratique | Le travail explose ; chaque élément contre chaque élément | Comparer toutes les paires (naïf) |
| O(2ⁿ) | Exponentiel | Catastrophique ; double à chaque élément ajouté | Force brute sur toutes les combinaisons |

Le gouffre est stupéfiant à grande échelle. Pour un million d’éléments, un algorithme en O(n) fait ~1 million d’étapes ; un en O(n²) en fait ~1 000 000 000 000 — la différence entre l’instantané et le pratiquement jamais. Voilà pourquoi une approche en O(n²) cachée dans une boucle est un désastre de performance classique, et pourquoi trouver une alternative en O(n log n) ou O(n) peut rendre rapide un programme sans espoir.

## Comment l’utiliser en pratique

Vous n’avez pas besoin de dériver des preuves. La compétence pratique, c’est **reconnaître des motifs** : une simple boucle sur les données est généralement en O(n) ; une boucle dans une boucle sur les mêmes données est souvent en O(n²) — un signal d’alarme à reconsidérer ; diviser le problème par deux de façon répétée laisse présager du O(log n). Quand quelque chose est lent sur de grandes entrées, la pensée Big-O vous pointe vers le coupable (souvent une boucle imbriquée accidentelle ou une recherche lente) et vers la solution (une meilleure structure de données ou un meilleur algorithme). C’est aussi pourquoi choisir la bonne structure de données — une table de hachage pour des recherches en O(1) plutôt que parcourir une liste — est l’une des décisions de performance les plus à fort levier.

## FAQ

**Un Big-O plus bas signifie-t-il toujours plus rapide ?**
Pas pour de petites entrées — le Big-O décrit la croissance, en ignorant les constantes, donc une « pire » classe peut l’emporter sur des données minuscules. Il importe surtout quand l’entrée devient grande ; pour une poignée d’éléments, la simplicité bat souvent l’optimalité théorique.

**Quelle est la différence entre le meilleur, le moyen et le pire cas ?**
Un algorithme peut se comporter différemment selon l’entrée (par exemple déjà triée contre aléatoire). Le Big-O cite souvent le pire cas comme garantie, mais le cas moyen importe fréquemment davantage en pratique.

**Le Big-O ne concerne-t-il que la vitesse ?**
Non — il décrit aussi la croissance de la **mémoire** (complexité spatiale). Un algorithme peut être rapide mais utiliser une mémoire qui croît mal avec l’entrée ; les deux dimensions comptent au moment de choisir une approche.`,
  },
  {
    topicKey: 'what-is-caching',
    title: 'Qu’est-ce que la mise en cache, et pourquoi est-elle partout ?',
    question: 'Qu’est-ce que la mise en cache, comment fonctionne-t-elle, et pourquoi est-elle si importante pour la performance ?',
    summary:
      'Un cache stocke des copies de données là où elles sont plus rapides d’accès, pour que les requêtes répétées contournent la source d’origine lente. C’est l’une des astuces de vitesse les plus puissantes de l’informatique, et son problème le plus dur est de savoir quand la copie est périmée.',
    tags: ['programmation', 'mise en cache', 'performance', 'systèmes'],
    language: 'fr',
    image: {
      prompt: promptOf('what-is-caching'),
      alt: 'Un objet utile gardé sur une étagère proche par un court chemin contre un long chemin vers un entrepôt lointain',
    },
    sources: [
      { title: 'MDN — La mise en cache HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching' },
      { title: 'Cloudflare — qu’est-ce que la mise en cache', url: 'https://www.cloudflare.com/learning/cdn/what-is-caching/' },
    ],
    content: `# Qu’est-ce que la mise en cache, et pourquoi est-elle partout ?

Un cache est une réserve de copies gardées quelque part de rapide, pour que vous n’ayez pas à aller chercher dans un endroit lent à chaque fois. Le principe est intuitif : si vous attrapez sans cesse le même livre, vous le gardez sur votre bureau au lieu de marcher jusqu’à la bibliothèque chaque fois. En informatique, « la bibliothèque » peut être une base de données, un serveur lointain ou un disque lent, et « votre bureau » est une mémoire plus rapide à proximité. La mise en cache est l’une des **techniques de performance les plus universelles de toute l’informatique** — présente à pratiquement chaque couche — parce que les écarts de vitesse entre stockage rapide et lent sont énormes, et que la plupart des systèmes demandent les mêmes choses encore et encore.

## Pourquoi ça marche si bien

Deux faits rendent la mise en cache massivement rentable. D’abord, **les différences de vitesse sont énormes** : lire depuis la mémoire peut être des milliers de fois plus rapide que depuis un disque ou à travers un réseau. Ensuite, **l’accès est répétitif** : les programmes et les utilisateurs tendent à vouloir les mêmes données de façon répétée (la vidéo populaire, le profil de l’utilisateur connecté, la page d’accueil). Gardez les éléments fréquemment voulus à proximité, et la grande majorité des requêtes sont servies vite, ne payant qu’occasionnellement le chemin lent. Même mettre en cache une petite fraction de données « chaudes » peut servir l’essentiel du trafic.

## La mise en cache est à chaque couche

Vous êtes entouré de caches travaillant de façon invisible :

| Cache | Ce qu’il accélère |
| --- | --- |
| Cache CPU | Le processeur atteignant les données plus vite que la mémoire principale |
| Cache du navigateur | Recharger des sites sans re-télécharger images/scripts |
| CDN (réseau de diffusion de contenu) | Servir le contenu d’un site depuis un serveur proche de vous, et non à l’autre bout du monde |
| Cache applicatif/en mémoire (par ex. Redis) | Éviter les requêtes de base de données répétées |
| Cache de base de données | Réutiliser les résultats de requêtes récentes |
| Cache DNS | Sauter les recherches d’adresse répétées |

Un seul chargement de page peut bénéficier d’une demi-douzaine de caches empilés — c’est pourquoi la deuxième visite d’un site est bien plus rapide que la première.

## Le point délicat : savoir quand une copie est périmée

La fameuse difficulté de la mise en cache n’est pas de stocker des copies — c’est de savoir **quand une copie est périmée.** Si les données d’origine changent mais que le cache sert encore l’ancienne copie, les utilisateurs voient des informations erronées (un prix qui a déjà changé, un profil qui a été mis à jour). C’est « l’invalidation de cache », la moitié d’une célèbre blague de programmation sur les deux problèmes les plus durs de l’informatique. Les systèmes la gèrent avec des stratégies comme l’**expiration** (les copies vivent un temps défini, puis se rafraîchissent), l’**invalidation** (effacer activement la copie quand la source change), et l’acceptation de la **cohérence à terme** (tolérer une brève péremption au profit de la vitesse). Décider à quel point les données doivent être fraîches — par rapport à leur rapidité — est le compromis central de la mise en cache.

## FAQ

**Pourquoi ne pas simplement tout mettre en cache pour toujours ?**
Parce que les données changent, et que les copies périmées causent des bugs ; de plus, les caches ont un espace limité, donc ils évincent les éléments les moins utilisés. La mise en cache échange une fraîcheur parfaite contre de la vitesse — vous mettez en cache ce qu’il est sûr de laisser légèrement vieillir.

**Que corrige le fait de « vider son cache » ?**
Cela force des copies fraîches depuis la source. Quand un site paraît cassé ou périmé, votre navigateur affiche peut-être des fichiers en cache périmés ; vider l’oblige à re-télécharger les versions actuelles.

**La mise en cache peut-elle causer des bugs ?**
Oui — servir des données périmées est le cas classique. Une part surprenante des problèmes « ça ne se met pas à jour ! » sont des caches retenant d’anciennes copies quelque part dans la chaîne. Puissant, mais une vraie source de soucis subtils.`,
  },
];
