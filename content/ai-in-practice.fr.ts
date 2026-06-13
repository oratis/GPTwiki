import type { DraftArticle } from './types';
import { aiInPracticeEn } from './ai-in-practice.en';

// Batch : AI in Practice (version française native / pilote de l'expansion
// linguistique de la phase 2). Partage les mêmes topicKey que les variantes
// en/zh ; les images d'en-tête sont réutilisées depuis le cache GCS (une par
// topicKey), donc aucun coût de génération d'image supplémentaire. Le corps
// n'est pas une traduction automatique mais une rédaction pensée pour un
// lectorat francophone.

const promptOf = (key: string): string => {
  const hit = aiInPracticeEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const aiInPracticeFr: DraftArticle[] = [
  {
    topicKey: 'rag-vs-fine-tuning',
    title: 'RAG ou fine-tuning : lequel choisir ?',
    question: 'Pour adapter un LLM à mes données, dois-je utiliser le RAG ou le fine-tuning ?',
    summary:
      'Le RAG injecte au moment de la requête une connaissance fraîche et vérifiable, tandis que le fine-tuning change la façon dont le modèle se comporte. La plupart des équipes devraient commencer par le RAG et n’ajouter le fine-tuning que pour des objectifs de style, de format ou de latence.',
    tags: ['ai', 'llm', 'rag', 'fine-tuning', 'apprentissage automatique'],
    language: 'fr',
    image: { prompt: promptOf('rag-vs-fine-tuning'), alt: 'Pipeline de recherche et treillis d’un modèle affiné alimentant un même cœur neuronal' },
    sources: [
      { title: 'Lewis et al., « Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks » (2020)', url: 'https://arxiv.org/abs/2005.11401' },
      { title: 'Hu et al., « LoRA: Low-Rank Adaptation of Large Language Models » (2021)', url: 'https://arxiv.org/abs/2106.09685' },
      { title: 'Gao et al., « Retrieval-Augmented Generation for Large Language Models: A Survey » (2023)', url: 'https://arxiv.org/abs/2312.10997' },
    ],
    content: `# RAG ou fine-tuning : lequel choisir ?

Réponse courte : si votre problème porte sur **ce que le modèle sait**, utilisez la génération augmentée par récupération (RAG) ; s’il porte sur **la façon dont le modèle se comporte**, utilisez le fine-tuning. Les deux ne sont pas rivaux — les systèmes matures emploient souvent les deux — mais comme premier investissement, le RAG est moins coûteux à construire, plus facile à mettre à jour et plus facile à auditer.

## Ce que chaque technique fait réellement

Le **RAG** garde le modèle figé et change son *entrée*. Au moment de la requête, un moteur de recherche parcourt vos documents (généralement via des embeddings dans un index vectoriel), et les passages les plus pertinents sont collés dans le prompt pour que le modèle réponde à partir d’eux. La connaissance vit dans une base de données que vous pouvez éditer à tout instant.

Le **fine-tuning** change les *poids* du modèle. Vous l’entraînez sur des paires entrée–sortie d’exemple pour qu’il intériorise un ton, un format, une politique ou un vocabulaire métier. Avec des méthodes économes en paramètres comme LoRA, cela ne demande plus de matériel colossal — mais le résultat est figé dans le modèle jusqu’au prochain réentraînement.

## Tableau de décision

| Votre situation | Meilleur choix | Pourquoi |
| --- | --- | --- |
| Les faits changent chaque semaine (prix, règles, docs) | RAG | On met à jour l’index, pas le modèle |
| Les réponses doivent citer leurs sources | RAG | Les passages récupérés servent de citations |
| Corpus privé trop vaste pour être mémorisé | RAG | La récupération évolue avec le stockage, pas les paramètres |
| La sortie doit suivre un style maison ou un schéma strict | Fine-tuning | Le style est un comportement, pas une connaissance |
| Vous voulez un modèle spécialisé petit, rapide et bon marché | Fine-tuning | Distiller la tâche dans moins de paramètres |
| Les prompts ont enflé d’instructions et d’exemples | Fine-tuning | Déplacer les instructions récurrentes dans les poids |
| Le modèle comprend mal le jargon métier | Les deux | La récupération fournit le contexte ; le fine-tuning corrige l’interprétation |

## Quand le RAG est le bon premier pas

- **Fraîcheur** : votre connaissance change plus vite que vous ne pourriez jamais réentraîner.
- **Traçabilité** : les réponses réglementées et destinées aux clients ont besoin d’un ancrage « selon le document X », ce qui réduit aussi mesurablement les hallucinations.
- **Vitesse d’itération** : un prototype fonctionnel représente quelques jours d’ingénierie ; ni GPU, ni étiquetage de données d’entraînement.
- **Isolation par client** : les données de chaque client restent dans leur propre index au lieu de fuir dans des poids partagés.

Le coût, c’est une pièce mobile de plus : le découpage, les embeddings, la qualité de l’index et l’évaluation de la récupération deviennent une partie de votre produit. C’est la mauvaise récupération, et non le modèle, qui est le point de défaillance le plus courant des systèmes RAG.

## Quand le fine-tuning vaut son prix

- **Conformité de format** : un JSON toujours valide, un squelette de rapport fixe, le ton de votre équipe de support.
- **Latence et coût en tokens** : un modèle affiné peut abandonner les exemples few-shot et les longues instructions à chaque appel.
- **Transfert de capacités vers de petits modèles** : affiner un modèle compact à poids ouverts sur une tâche étroite peut égaler un modèle généraliste bien plus gros, pour une fraction du coût de service.
- **Compétences implicites** : les tâches de classification, d’extraction et de routage disposant de milliers d’exemples étiquetés battent souvent le prompting.

Le coût est opérationnel : constituer les données d’entraînement, relancer les évaluations à chaque mise à niveau du modèle de base, et accepter que corriger un mauvais comportement implique un nouveau cycle d’entraînement.

## Utiliser les deux

Un schéma de production courant : affiner un modèle pour qu’il *suive de façon fiable votre format et votre politique de refus*, et utiliser le RAG pour *lui fournir les faits courants*. Le fine-tuning rend le comportement prévisible ; la récupération garde le contenu vrai et à jour.

## FAQ

**Le fine-tuning enseigne-t-il de nouveaux faits au modèle ?**
Mal. Les mises à jour de poids peuvent mémoriser certains faits, mais le rappel est peu fiable et les mises à jour exigent un réentraînement. La récupération est la voie sûre pour ajouter de la connaissance.

**Le RAG est-il toujours moins cher ?**
À construire, presque toujours. À très haut volume de requêtes, les longs contextes récupérés gonflent le coût en tokens par appel, et un modèle affiné à prompt court peut devenir moins cher. Mesurez à votre niveau de trafic.

**Puis-je me passer des deux et utiliser simplement une longue fenêtre de contexte ?**
Pour de petits corpus stables — oui, bourrer les documents dans le prompt (éventuellement avec mise en cache du prompt) est l’option la plus simple. Au-delà de quelques centaines de pages ou avec des mises à jour fréquentes, la récupération l’emporte sur le coût et la qualité des réponses.`,
  },
  {
    topicKey: 'prompt-engineering',
    title: 'Guide pratique du prompt engineering',
    question: 'Comment rédiger des prompts efficaces pour les grands modèles de langage ?',
    summary:
      'L’essentiel de la qualité d’un prompt tient à cinq leviers : des instructions claires, du contexte, des exemples, un format de sortie explicite et de la place pour raisonner. Ce guide couvre les techniques qui survivent au contact du travail réel.',
    tags: ['ai', 'llm', 'prompt engineering', 'productivité'],
    language: 'fr',
    image: { prompt: promptOf('prompt-engineering'), alt: 'Panneau de contrôle en verre façonnant un faisceau de lumière en une sortie structurée' },
    sources: [
      { title: 'Wei et al., « Chain-of-Thought Prompting Elicits Reasoning in Large Language Models » (2022)', url: 'https://arxiv.org/abs/2201.11903' },
      { title: 'Wang et al., « Self-Consistency Improves Chain of Thought Reasoning » (2022)', url: 'https://arxiv.org/abs/2203.11171' },
      { title: 'Prompt Engineering Guide (DAIR.AI)', url: 'https://www.promptingguide.ai' },
    ],
    content: `# Guide pratique du prompt engineering

Un prompt est une spécification, pas une formule magique. Les modèles s’en sortent mal avec des demandes vagues pour la même raison que les artisans : les exigences n’ont jamais été formulées. Cinq leviers expliquent l’essentiel de la qualité que l’on peut obtenir — les instructions, le contexte, les exemples, le format de sortie et la place pour raisonner.

## Les cinq leviers

**1. Formulez la tâche comme un bon de travail.** Indiquez l’objectif, le public, les contraintes et à quoi ressemble « terminé ». « Résume les clauses de résiliation de ce contrat pour un non-juriste, en moins de 150 mots, en signalant tout ce qui sort de l’ordinaire » bat « résume ceci ».

**2. Fournissez le contexte que le modèle ne peut pas deviner.** Collez le document pertinent, le schéma, le journal d’erreurs, la charte de style. Séparez-le des instructions par des délimiteurs clairs (balises de type XML ou blocs de code) afin que les données ne soient jamais confondues avec des directives.

**3. Montrez, ne faites pas que dire (few-shot).** Deux ou trois exemples entrée → sortie définissent une tâche plus précisément que des paragraphes de description, et ils fixent les cas limites : incluez un exemple épineux, pas seulement des faciles.

**4. Fixez le format de sortie.** Demandez une structure précise — un objet JSON aux champs nommés, un tableau markdown, « exactement trois puces ». Une sortie structurée est plus facile à valider, à parser et à comparer. Si votre plateforme prend en charge une sortie contrainte par schéma, utilisez-la.

**5. Laissez de la place au raisonnement.** Pour l’analyse, les maths ou les décisions en plusieurs étapes, demandez au modèle de dérouler le problème avant de répondre (chaîne de pensée). Recherche et pratique s’accordent : cela améliore nettement la justesse sur les tâches de raisonnement ; pour les réponses à fort enjeu, échantillonnez plusieurs chemins de raisonnement et prenez la majorité (auto-cohérence).

## Technique → quand y recourir

| Technique | À utiliser quand |
| --- | --- |
| Rôle/persona (« Tu es un SRE chevronné ») | Le vocabulaire et le jugement doivent correspondre à un métier |
| Délimiteurs autour des entrées | Toute donnée collée, toujours |
| Exemples few-shot | Le format ou le jugement est difficile à décrire abstraitement |
| Chaîne de pensée | Maths, logique, décisions à contraintes multiples |
| Décomposition (plusieurs appels) | Tâches à phases distinctes — extraire, puis juger, puis rédiger |
| Auto-cohérence (vote sur plusieurs tirages) | Réponses uniques à fort enjeu qui méritent un surcoût |
| « Dis "inconnu" en cas de doute » | Questions factuelles où une mauvaise réponse vaut moins qu’aucune |

## Schémas d’échec courants

- **Le prompt fourre-tout** : vingt règles, à moitié contradictoires. Les modèles suivent la dernière et la plus forte ; élaguez sans pitié.
- **Les questions cachées** : poser deux choses en une phrase et n’obtenir de réponse qu’à une seule.
- **Le contexte implicite** : faire référence à « le fichier » ou à « notre format habituel » que le modèle n’a jamais vu.
- **Les exemples surajustés** : trois échantillons few-shot quasi identiques enseignent le motif de surface, pas la règle.
- **L’absence de boucle d’itération** : les prompts sont du code. Gardez un petit jeu de tests d’entrées réelles, exécutez-le après chaque modification et versionnez vos prompts.

## Traitez les prompts comme des artefacts d’ingénierie

Dès qu’un prompt compte en production : versionnez-le, attachez-lui un jeu de tests de régression d’entrées représentatives avec leurs propriétés attendues, et relancez-le à chaque mise à niveau du modèle. Les changements de version de modèle décalent silencieusement le comportement ; vos tests l’attrapent avant vos utilisateurs.

## FAQ

**Les formules magiques du genre « respire un grand coup » aident-elles vraiment ?**
Parfois, marginalement, et de façon peu fiable d’un modèle à l’autre. La structure, le contexte et les exemples écrasent les incantations.

**Les longs prompts coûtent plus cher — la dépense en vaut-elle la peine ?**
Le plus souvent oui pour les tâches critiques en qualité, mais coupez le poids mort : règles redondantes et exemples périmés ajoutent du coût sans justesse. La mise en cache du prompt rend les longs préfixes statiques bon marché sur la plupart des plateformes.

**En quoi le prompting diffère-t-il pour les modèles axés sur le raisonnement ?**
Les modèles qui raisonnent en interne avant de répondre ont besoin de moins d’accompagnement sur *comment* penser — gardez les instructions sur l’objectif et les contraintes, et abandonnez le micro-pilotage pas à pas, sauf si la qualité de sortie en décide autrement.`,
  },
  {
    topicKey: 'ai-agents',
    title: 'Qu’est-ce qu’un agent IA — et quand en avez-vous vraiment besoin ?',
    question: 'Qu’est-ce qu’un agent IA, et quand mon cas d’usage en a-t-il réellement besoin ?',
    summary:
      'Un agent IA est un LLM tournant en boucle, doté d’outils et d’un objectif, qui décide lui-même de son prochain pas. Puissant pour les tâches ouvertes, superflu pour tout ce qu’un workflow fixe peut accomplir — cet article explique la différence.',
    tags: ['ai', 'llm', 'agents', 'automatisation', 'architecture logicielle'],
    language: 'fr',
    image: { prompt: promptOf('ai-agents'), alt: 'Un cœur neuronal entouré d’outils choisissant son chemin sur des plateformes ramifiées' },
    sources: [
      { title: 'Yao et al., « ReAct: Synergizing Reasoning and Acting in Language Models » (2022)', url: 'https://arxiv.org/abs/2210.03629' },
      { title: 'Anthropic Engineering, « Building Effective Agents »', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
      { title: 'Schick et al., « Toolformer: Language Models Can Teach Themselves to Use Tools » (2023)', url: 'https://arxiv.org/abs/2302.04761' },
    ],
    content: `# Qu’est-ce qu’un agent IA — et quand en avez-vous vraiment besoin ?

Un agent IA est un modèle de langage tournant en boucle : il a un objectif, un ensemble d’outils et la liberté de décider de sa prochaine action selon ce que la précédente a renvoyé. Cette dernière proposition est celle qui définit tout. Un script qui appelle un LLM trois fois dans un ordre fixe est un **workflow** ; un système où le modèle lui-même choisit quoi faire ensuite est un **agent**.

## L’anatomie d’un agent

Tout agent concret se ramène à quatre pièces :

- **Un modèle** capable de raisonnement multi-étapes et d’appels d’outils fiables.
- **Des outils** — des fonctions que le modèle peut invoquer : recherche, exécution de code, édition de fichiers, appels d’API, requêtes en base.
- **Le contexte/la mémoire** — la transcription courante des actions et des observations (plus, parfois, des notes externes qui survivent à la session).
- **La boucle** — le modèle agit → l’environnement répond → le résultat est ajouté → le modèle agit de nouveau, jusqu’à ce qu’il déclare l’objectif atteint ou atteigne une condition d’arrêt.

Le schéma consistant à entrelacer raisonnement et usage d’outils a été popularisé dans la recherche sous le nom de ReAct, et constitue aujourd’hui la colonne vertébrale des assistants de code, des agents de recherche et des systèmes de contrôle d’ordinateur.

## Agent vs workflow vs appel unique

| Approche | Flux de contrôle décidé par | Idéal pour | Mode de défaillance |
| --- | --- | --- | --- |
| Appel LLM unique | Vous | Classification, rédaction, extraction | Portée limitée |
| Workflow (appels chaînés) | Vous | Processus multi-étapes connus et répétables | Rigide quand les entrées varient |
| Agent (boucle + outils) | Le modèle | Tâches ouvertes dont le chemin est inconnu d’avance | Coût et accumulation d’erreurs |

## Quand un agent est réellement le bon choix

- **Le chemin est imprévisible à l’avance.** Déboguer une compilation qui échoue, rechercher une question vague, piloter un navigateur — chaque pas suivant dépend de ce que le précédent a révélé.
- **L’environnement renvoie un retour.** Compilateurs, suites de tests et résultats de recherche permettent à l’agent de vérifier son propre travail et de s’auto-corriger. Les agents prospèrent précisément là où la vérification est bon marché.
- **La tâche tolère un coût et une latence variables.** Un agent peut prendre cinq étapes ou cinquante.

## Quand c’est démesuré

Si un humain peut écrire les étapes, écrivez-les — un workflow fixe est moins cher, plus rapide, débogable et prévisible. Le remplissage de formulaires, les pipelines de documents, les rapports planifiés et l’ETL standard n’ont presque jamais besoin d’un agent. La règle d’ingénierie honnête des praticiens est : **utilisez le schéma le plus simple qui fonctionne, et n’ajoutez de l’autonomie que lorsque la tâche l’exige.**

## Ce qui tourne mal

- **L’accumulation d’erreurs** : une étape fiable à 95 % a environ 60 % de chances de survivre intacte à dix étapes. Les longues boucles ont besoin de points de contrôle, d’étapes de vérification ou de barrières de revue humaine.
- **Le coût galopant** : chaque itération de boucle relit une transcription qui grossit. Fixez des budgets et des plafonds d’étapes.
- **Les objectifs ambigus** : un agent à qui l’on dit « améliore la base de code » fera *quelque chose* ; savoir si c’est ce que vous vouliez est une autre histoire. Définissez « terminé ».
- **La surface de sécurité** : les outils capables d’écrire des fichiers, de dépenser de l’argent ou d’envoyer des messages ont besoin de frontières de permissions et de journaux d’audit.

## FAQ

**Les « systèmes multi-agents » valent-ils mieux qu’un seul bon agent ?**
Parfois — la recherche en parallèle avec un synthétiseur est un schéma éprouvé. Mais la coordination ajoute ses propres modes de défaillance ; le multi-agent est une optimisation, pas un point de départ.

**Les agents ont-ils besoin de modèles spéciaux ?**
Ils ont besoin d’une grande fiabilité d’appel d’outils et d’une cohérence sur le long terme. Les modèles généralistes de pointe sont actuellement le choix le plus sûr ; les petits modèles conviennent aux boucles étroites et bien instrumentées.

**Comment évaluer un agent ?**
Sur les résultats, pas les étapes : définissez un jeu de tâches représentatives aux états finaux vérifiables, exécutez-le à plusieurs reprises (les agents sont non déterministes) et suivez le taux de réussite, le coût et le nombre d’étapes jusqu’à la complétion.`,
  },
  {
    topicKey: 'local-llm-hardware',
    title: 'Quel matériel faut-il pour faire tourner un LLM en local ?',
    question: 'De quel matériel ai-je besoin pour exécuter un grand modèle de langage sur ma propre machine ?',
    summary:
      'C’est la mémoire, pas la puissance de calcul, qui décide de ce que vous pouvez exécuter : un modèle 8B quantifié tient dans 8 Go, un 32B réclame environ 24 Go, et les modèles de classe 70B veulent 48 Go ou plus. Voici les vrais chiffres et les logiciels à utiliser.',
    tags: ['ai', 'llm', 'llm local', 'matériel', 'gpu'],
    language: 'fr',
    image: { prompt: promptOf('local-llm-hardware'), alt: 'Un cube de treillis neuronal lumineux posé sur une carte graphique dans un boîtier PC ouvert' },
    sources: [
      { title: 'llama.cpp — inférence LLM en C/C++ (GGUF, quantification)', url: 'https://github.com/ggml-org/llama.cpp' },
      { title: 'Ollama — exécuter des LLM ouverts en local', url: 'https://ollama.com' },
      { title: 'vLLM — service de LLM à haut débit', url: 'https://github.com/vllm-project/vllm' },
    ],
    content: `# Quel matériel faut-il pour faire tourner un LLM en local ?

La contrainte déterminante, c’est **la mémoire, pas la vitesse**. Les poids d’un modèle doivent tenir dans la VRAM de votre GPU (ou la mémoire unifiée d’Apple) pour des performances utilisables, et le calcul est simple : en quantification 4 bits, un modèle réclame environ **0,5 à 0,7 Go par milliard de paramètres**, plus 1 à 4 Go de marge pour le cache de contexte.

## Le tableau de dimensionnement rapide

| Classe de modèle | Poids en 4 bits | Configuration confortable | Exemples de ce qui tourne |
| --- | --- | --- | --- |
| 3–4B | ~2–3 Go | N’importe quel portable récent, 8 Go de RAM | Petits assistants, autocomplétion |
| 7–9B | ~4–6 Go | GPU 8 Go ou Mac 16 Go | Petits modèles Llama/Qwen/Mistral |
| 13–14B | ~8–10 Go | GPU 12–16 Go ou Mac 24 Go | Modèles de chat et de code de taille moyenne |
| 30–34B | ~18–22 Go | GPU 24 Go (ex. RTX 3090/4090) ou Mac 36–48 Go | Généralistes locaux solides |
| 70–72B | ~40–48 Go | 2× GPU 24 Go ou Mac Studio 64 Go+ | Modèles ouverts proches de la pointe |
| Mixture-of-experts large | très variable | Classe station de travail/serveur | Vérifier la doc de chaque modèle |

Deux remarques pour bien le lire : la quantification (GGUF 4 bits et similaires) échange une petite perte de qualité, généralement acceptable, contre une division par 4 de la mémoire par rapport au 16 bits ; et les longs contextes font grossir le cache KV — discuter avec un contexte de 32k peut ajouter plusieurs Go par-dessus les poids.

## GPU, Mac ou CPU ?

- **GPU NVIDIA** : meilleur débit et meilleur support de l’écosystème. La taille de VRAM compte plus que la génération du GPU — une RTX 3090 24 Go d’occasion reste un choix budget adoré pour les modèles de classe 30B.
- **Apple Silicon** : la mémoire unifiée rend les Mac discrètement excellents — une machine de la série M à 64 Go fait tourner des modèles de classe 70B quantifiés, plus lentement qu’une config bi-GPU mais en silence et en simplicité. Achetez de la RAM, pas des cœurs.
- **CPU seul** : ça marche via llama.cpp, mais attendez-vous à quelques tokens par seconde sur de petits modèles — convenable pour des traitements par lots, pénible pour du chat.

## Pile logicielle

- **Ollama** — le démarrage le plus simple : une commande pour télécharger et exécuter un modèle, avec une API locale compatible OpenAI.
- **llama.cpp** — le moteur sous-jacent à une grande partie de l’écosystème ; contrôle maximal sur la quantification et le déchargement.
- **LM Studio** — interface graphique pour parcourir, télécharger et discuter.
- **vLLM** — lorsque vous servez de nombreux utilisateurs simultanés depuis un véritable serveur GPU plutôt qu’un seul ordinateur de bureau.

## Ce qu’il faut honnêtement attendre

Un modèle quantifié 8–14B bien choisi gère le résumé, la rédaction, l’extraction et une aide au code correcte. Les modèles ouverts de classe 30B–70B sont vraiment solides mais restent en retrait des modèles hébergés de pointe sur le raisonnement difficile. Les raisons de passer au local sont **la confidentialité, l’usage hors ligne, des tokens illimités à coût fixe et la liberté de bidouiller** — pas de battre le cloud sur la qualité brute.

## FAQ

**Le local fait-il économiser de l’argent ?**
Seulement en usage soutenu et intensif. Le matériel se rentabilise si vous brûleriez sinon des tokens d’API tous les jours ; pour un usage occasionnel, les API reviennent moins cher.

**Puis-je exécuter des modèles plus gros que ma VRAM ?**
Oui — des couches peuvent déborder vers la RAM système au prix d’une forte chute de vitesse. Un modèle dépassant la VRAM de 20 % est souvent acceptable ; le double, c’est la misère.

**Et le fine-tuning en local ?**
Les méthodes économes en paramètres (LoRA/QLoRA) rendent le fine-tuning de petits modèles faisable sur un GPU 24 Go. Le fine-tuning complet de gros modèles reste du domaine du centre de données.`,
  },
  {
    topicKey: 'mcp-explained',
    title: 'Qu’est-ce que le MCP (Model Context Protocol) ?',
    question: 'Qu’est-ce que le Model Context Protocol et quel problème résout-il ?',
    summary:
      'Le MCP est un standard ouvert qui permet à n’importe quelle application IA de se connecter à n’importe quel outil ou source de données via un seul protocole — remplaçant les intégrations sur mesure, par application et par outil. Voyez-le comme l’USB-C du contexte IA.',
    tags: ['ai', 'mcp', 'llm', 'intégrations', 'standards ouverts'],
    language: 'fr',
    image: { prompt: promptOf('mcp-explained'), alt: 'Des câbles de données de couleurs variées convergeant vers un unique port cristallin universel' },
    sources: [
      { title: 'Model Context Protocol — site officiel et spécification', url: 'https://modelcontextprotocol.io' },
      { title: 'Anthropic, « Introducing the Model Context Protocol »', url: 'https://www.anthropic.com/news/model-context-protocol' },
    ],
    content: `# Qu’est-ce que le MCP (Model Context Protocol) ?

Le Model Context Protocol (MCP) est un standard ouvert pour connecter les applications IA à des outils et des données externes. Avant lui, chaque appli IA devait construire une intégration sur mesure pour chaque outil — N applis × M outils signifiait N×M adaptateurs. Le MCP réduit cela à N + M : une appli implémente le protocole une fois en tant que *client*, un outil l’expose une fois en tant que *serveur*, et n’importe quel client peut parler à n’importe quel serveur. L’analogie consacrée a tenu parce qu’elle est juste : **l’USB-C de l’IA**.

## Pourquoi il existe

Les LLM ne valent que par le contexte qu’ils peuvent atteindre. Votre assistant devient nettement plus capable lorsqu’il peut lire vos fichiers, interroger votre base de données, parcourir vos tickets ou envoyer un message — mais câbler tout cela au cas par cas produisait des intégrations fragiles, non portables et liées à un seul fournisseur. Le MCP, introduit par Anthropic fin 2024 et largement adopté depuis dans l’industrie, standardise ce câblage. En 2026, l’écosystème compte des milliers de serveurs communautaires et éditeurs, couvrant tout, de GitHub et Slack aux bases de données et aux navigateurs.

## Comment ça marche

Le MCP a trois rôles :

- **Hôte** — l’application IA face à l’utilisateur (une appli de chat, un IDE, un environnement d’exécution d’agent).
- **Client** — la connexion protocolaire que l’hôte ouvre, une par serveur.
- **Serveur** — un programme (généralement petit) exposant des capacités via le protocole, soit localement par stdio, soit à distance par HTTP.

Un serveur peut offrir trois types de capacités :

| Primitive | Ce que c’est | Exemple |
| --- | --- | --- |
| **Outils** | Fonctions que le modèle peut appeler | \`create_issue\`, \`query_database\` |
| **Ressources** | Données que l’hôte peut lire dans le contexte | Un fichier, un schéma, un tableau de bord |
| **Prompts** | Modèles paramétrés réutilisables | « Relis cette PR avec notre checklist » |

Le modèle de l’hôte voit les définitions d’outils, décide quand les appeler, et le serveur exécute puis renvoie les résultats — le protocole gère la découverte, l’invocation et le transport de façon uniforme.

## MCP vs simple appel de fonction

L’appel de fonction est la manière dont un *modèle* invoque une fonction que son développeur a enregistrée dans cette seule application. Le MCP standardise la couche qui l’entoure : d’où viennent les outils, comment ils sont découverts, authentifiés et transportés — si bien que le même serveur fonctionne dans n’importe quelle appli compatible MCP sans changement de code. Les deux se composent : sous le capot, un appel d’outil MCP atteint toujours le modèle sous forme d’appel de fonction.

## Pour commencer

La porte d’entrée pratique, c’est d’utiliser des serveurs existants, pas d’en écrire un : la plupart des grands clients IA permettent d’ajouter un serveur MCP en quelques lignes de configuration, et les SDK officiels (TypeScript, Python et d’autres) font d’un serveur maison l’affaire d’un après-midi — définissez quelques fonctions typées, et tout client MCP peut les utiliser.

## FAQ

**Le MCP est-il lié à un seul fournisseur de modèles ?**
Non. Il a démarré chez Anthropic mais c’est une spécification ouverte, dotée d’une adoption multi-fournisseurs et d’un processus de gouvernance ouvert ; clients et serveurs existent dans tous les grands écosystèmes.

**Est-il sûr de connecter des serveurs arbitraires ?**
Traitez les serveurs MCP comme des extensions de navigateur : ils tournent avec de vraies permissions. Utilisez des sources de confiance, examinez les outils qu’un serveur expose, et préférez les hôtes qui exigent une approbation explicite de l’utilisateur pour chaque action sensible.

**Quand devrais-je écrire mon propre serveur ?**
Quand votre équipe dispose d’une API ou d’un jeu de données interne que plusieurs outils IA devraient atteindre — un seul serveur le rend disponible à tous les clients compatibles MCP utilisés dans votre entreprise.`,
  },
  {
    topicKey: 'vector-databases',
    title: 'Qu’est-ce qu’une base de données vectorielle — et quand en avez-vous besoin ?',
    question: 'Qu’est-ce qu’une base de données vectorielle et quand en ai-je réellement besoin ?',
    summary:
      'Les bases vectorielles stockent des embeddings et trouvent le « sens le plus proche » plutôt que des correspondances exactes, alimentant la recherche sémantique et le RAG. En dessous d’environ 1 M de vecteurs, des outils plus simples comme pgvector suffisent généralement.',
    tags: ['ai', 'base de données vectorielle', 'embeddings', 'recherche', 'rag'],
    language: 'fr',
    image: { prompt: promptOf('vector-databases'), alt: 'Un point de requête se propageant à travers des constellations groupées de vecteurs d’embedding' },
    sources: [
      { title: 'Malkov & Yashunin, « Efficient and Robust ANN Search Using HNSW Graphs » (2016)', url: 'https://arxiv.org/abs/1603.09320' },
      { title: 'FAISS — bibliothèque de recherche de similarité efficace', url: 'https://github.com/facebookresearch/faiss' },
      { title: 'pgvector — similarité vectorielle pour Postgres', url: 'https://github.com/pgvector/pgvector' },
    ],
    content: `# Qu’est-ce qu’une base de données vectorielle — et quand en avez-vous besoin ?

Une base de données vectorielle stocke des **embeddings** — des listes de nombres qui représentent le sens d’un texte, d’une image ou d’un son — et répond extrêmement bien à une seule requête : *« trouve les éléments les plus similaires à celui-ci. »* C’est l’opération derrière la recherche sémantique, la récupération du RAG, les recommandations et la détection de doublons. Savoir si vous en avez besoin d’une dédiée dépend presque entièrement de l’échelle.

## Les embeddings en une minute

Un modèle d’embedding projette le contenu en un point d’un espace de grande dimension (couramment 256 à 3072 dimensions) de sorte que les sens proches atterrissent près les uns des autres. « Comment réinitialiser mon mot de passe » et « Je n’arrive plus à me connecter à mon compte » partagent peu de vocabulaire mais se situent tout près en tant que vecteurs. La similarité se mesure géométriquement — généralement par similarité cosinus — donc la recherche devient : embarquer la requête, trouver les points stockés les plus proches.

## Ce qui en fait un problème de *base de données*

Comparer une requête à chaque vecteur stocké (force brute) est exact mais linéaire — convenable pour des milliers d’éléments, lent pour des millions. Les bases vectorielles utilisent des index de **plus proches voisins approchés (ANN)**, les plus célèbres étant les graphes HNSW, qui trouvent ~99 % des vrais voisins en une fraction infime du temps. Autour de ce noyau, elles ajoutent les commodités habituelles d’une base : filtrage sur les métadonnées (« seulement les documents de ce client »), mises à jour et suppressions, persistance et mise à l’échelle horizontale.

## Quand en avez-vous besoin — honnêtement

| Taille du corpus | Choix raisonnable |
| --- | --- |
| Jusqu’à ~100 k vecteurs | Un tableau en mémoire, FAISS ou des extensions SQLite — la force brute suffit |
| ~100 k à quelques millions | **pgvector dans le Postgres que vous exploitez déjà** — le choix par défaut pragmatique |
| Plusieurs millions, fort QPS, multi-clients | Moteur dédié : Qdrant, Milvus, Weaviate, ou des services gérés comme Pinecone |

L’erreur d’architecture la plus courante est d’ajouter une nouvelle brique d’infrastructure pour 50 000 fragments. Si vous exploitez déjà Postgres, pgvector garde les vecteurs à côté de vos données relationnelles, transactionnels et joignables. Tournez-vous vers un moteur dédié quand vous avez une vraie échelle, des cibles de latence strictes ou de la recherche filtrée intensive.

## Les leviers de qualité qui comptent plus que la base

- **Le découpage** : la façon de fractionner les documents influe davantage sur la récupération que le moteur choisi. Les fragments devraient être des idées autonomes, souvent 200 à 800 tokens avec chevauchement.
- **Le choix du modèle d’embedding** : les modèles multilingues récents battent matériellement les anciens ; ré-embarquer un corpus est pénible, alors choisissez délibérément.
- **La recherche hybride** : combiner la similarité vectorielle avec un score par mots-clés classique (BM25) rattrape les noms, codes et termes rares que les embeddings estompent.
- **Le reranking** : récupérer 50 candidats à bas coût et re-scorer les premiers avec un cross-encoder relève généralement plus la qualité des réponses que le réglage de l’index.

## FAQ

**Les embeddings exposent-ils mes données au fournisseur d’embeddings ?**
Le texte va à qui calcule l’embedding. Avec les API hébergées, c’est le fournisseur (vérifiez les conditions de rétention) ; les modèles d’embedding à poids ouverts tournent entièrement en local.

**Les vecteurs peuvent-ils être mis à jour quand les documents changent ?**
Oui — mais il revient à votre pipeline de re-fragmenter et ré-embarquer les documents modifiés. Des vecteurs périmés servant silencieusement de l’ancien contenu est le bug de production classique.

**Une plus grande dimension d’embedding est-elle meilleure ?**
Pas automatiquement. Les dimensions plus élevées coûtent en stockage et en latence ; beaucoup de modèles modernes proposent des dimensions tronquables où 512 à 1024 conservent quasiment toute la qualité. Testez sur votre propre jeu de récupération.`,
  },
  {
    topicKey: 'ai-coding-assistants',
    title: 'Comment tirer une vraie valeur des assistants de code IA',
    question: 'Comment utiliser efficacement les assistants de code IA sans nuire à la qualité du code ?',
    summary:
      'Les outils de code IA livrent leurs plus grands gains sur le code répétitif, les tests et les terrains inconnus — à condition de leur donner du contexte et de relire leur sortie. Les pratiques qui marchent, les risques à gérer et où le temps se gagne réellement.',
    tags: ['ai', 'programmation', 'assistants de code', 'outils de développement', 'productivité'],
    language: 'fr',
    image: { prompt: promptOf('ai-coding-assistants'), alt: 'Une main humaine et une main robotique de lumière bâtissant ensemble un pont de blocs de code' },
    sources: [
      { title: 'Peng et al., « The Impact of AI on Developer Productivity: Evidence from GitHub Copilot » (2023)', url: 'https://arxiv.org/abs/2302.06590' },
      { title: 'SWE-bench — évaluation des LLM sur de vraies issues GitHub', url: 'https://www.swebench.com' },
    ],
    content: `# Comment tirer une vraie valeur des assistants de code IA

Les assistants de code IA sont réellement productifs — des études contrôlées ont montré de fortes accélérations sur des tâches autonomes, et d’ici 2026 les outils agentiques qui exécutent des tests et éditent plusieurs fichiers ont largement dépassé l’autocomplétion. Mais les gains sont inégaux, et ils sont conditionnés à deux habitudes : **donner à l’outil un vrai contexte** et **relire ce qu’il écrit**. Les équipes qui sautent l’une ou l’autre ont tendance à expédier des bugs subtils plus vite.

## Où les gains se concentrent

- **Code répétitif et de liaison** : points d’accès CRUD, configuration, sérialisation, wrappers de clients d’API.
- **Tests** : générer des suites de tests unitaires complètes à partir de code existant est l’un des usages au meilleur rapport valeur/minute.
- **Terrain inconnu** : un nouveau langage, framework ou API — l’assistant comprime des heures de lecture de documentation en minutes.
- **Refactorisations mécaniques** : renommages, changements de signature, application d’un motif connu à travers les fichiers.
- **Expliquer du code** : se familiariser avec un module hérité en lui posant des questions.

Là où les gains rétrécissent : la logique métier profonde, les noyaux critiques en performance, les grandes décisions d’architecture, et le code où se tromper coûte cher. Là, l’assistant est un partenaire d’entraînement, pas un auteur.

## Les pratiques qui séparent les bons des mauvais résultats

**Délimitez la demande.** « Ajoute la pagination à ce point d’accès, en suivant la façon dont \`listUsers\` le fait » bat « améliore cette API ». De petits incréments vérifiables se composent ; les générations de mille lignes sont des cauchemars de relecture.

**Alimentez le contexte délibérément.** Pointez l’outil vers les fichiers pertinents, le message d’erreur, le schéma, les conventions de l’équipe. Les assistants agentiques modernes savent trouver le contexte eux-mêmes — mais nommer les bons fichiers de départ réduit encore de moitié leur errance.

**Laissez-le exécuter les tests.** La plus grosse amélioration de fiabilité, c’est une boucle de rétroaction : un assistant capable d’exécuter la suite de tests attrape ses propres erreurs au lieu de vous les expédier.

**Relisez comme la PR d’un junior sûr de lui.** Le code se lit de façon plausible ; c’est exactement pourquoi le survol est dangereux. Vérifiez les cas limites, la gestion d’erreurs et les surfaces sensibles à la sécurité (validation des entrées, authentification, requêtes) avec toute votre attention.

**Gardez tests et types comme garde-fous.** Un typage fort et une bonne couverture transforment « l’IA a cassé quelque chose » d’un incident de production en un CI au rouge.

## Type de tâche → attente réaliste

| Tâche | Attente |
| --- | --- |
| Tests unitaires pour du code existant | Forte accélération, grande fiabilité |
| Code répétitif/échafaudage | Forte accélération |
| Correction de bug avec test reproductible | Bonne — les outils agentiques les réussissent souvent |
| Fonctionnalité dans un framework inconnu | Grande compression de la courbe d’apprentissage |
| Travail subtil de concurrence/performance | Aide modeste ; à vérifier rigoureusement |
| Conception de système | Partenaire de discussion utile, pas un oracle |

## Garde-fous au niveau de l’équipe

Adoptez-les explicitement, pas en douce : convenez des endroits où les assistants sont encouragés, exigez la même barre de relecture pour le code généré, surveillez les sorties verbatim sensibles aux licences dans les bases de code réglementées, et gardez le CI comme autorité. Et protégez la boucle d’apprentissage — les juniors qui collent sans lire plafonnent ; ceux qui interrogent l’assistant apprennent plus vite qu’aucune génération précédente.

## FAQ

**Les assistants vont-ils faire de moi un moins bon ingénieur ?**
Ils érodent les compétences que vous cessez de pratiquer et amplifient celles que vous dirigez. Les ingénieurs qui savent spécifier, décomposer et vérifier gagnent en levier chaque année ; la pure vitesse de frappe cesse de compter.

**Pourquoi l’assistant produit-il avec assurance du code qui ne compile pas ?**
Il prédit du code plausible, et hallucine parfois des API. Faites de la compilation et des tests l’arbitre — et préférez les outils qui compilent/exécutent le code avant de vous le montrer.

**Agent ou autocomplétion ?**
Les deux, pour des travaux différents : la complétion en ligne pour le flux pendant que vous écrivez ; le mode agentique pour les tâches autonomes que vous pouvez décrire et vérifier, comme « fais passer ces tests ».`,
  },
  {
    topicKey: 'llm-hallucinations',
    title: 'Pourquoi les grands modèles de langage hallucinent-ils ?',
    question: 'Pourquoi les grands modèles de langage inventent-ils des choses, et comment réduire les hallucinations ?',
    summary:
      'Les LLM sont entraînés à produire un texte plausible, pas une vérité vérifiée — quand la connaissance s’épuise, une conjecture fluide comble le vide. Pourquoi cela arrive, quand cela empire, et les parades qui marchent vraiment.',
    tags: ['ai', 'llm', 'hallucination', 'fiabilité', 'apprentissage automatique'],
    language: 'fr',
    image: { prompt: promptOf('llm-hallucinations'), alt: 'Un faisceau issu d’un cœur neuronal rendant une structure solide et se dissolvant en brume' },
    sources: [
      { title: 'Huang et al., « A Survey on Hallucination in Large Language Models » (2023)', url: 'https://arxiv.org/abs/2311.05232' },
      { title: 'Lin et al., « TruthfulQA: Measuring How Models Mimic Human Falsehoods » (2021)', url: 'https://arxiv.org/abs/2109.07958' },
      { title: 'Liu et al., « Lost in the Middle: How Language Models Use Long Contexts » (2023)', url: 'https://arxiv.org/abs/2307.03172' },
    ],
    content: `# Pourquoi les grands modèles de langage hallucinent-ils ?

Un modèle de langage est entraîné à faire une seule chose : prédire le texte qui prolonge de façon plausible ce qui précède. Vérité et plausibilité coïncident généralement — c’est pourquoi les modèles sont utiles — mais quand le modèle ne possède pas le fait que vous demandez, l’objectif d’entraînement exige toujours une sortie fluide. Le résultat est une réponse assurée, bien formée et fausse. L’hallucination n’est pas un défaut greffé sur les LLM ; c’est le comportement par défaut des systèmes maximisant la plausibilité aux confins de leur connaissance.

## Les mécanismes

- **Compression avec perte.** L’entraînement comprime des téraoctets de texte dans un ensemble fixe de poids. Le savoir commun survit avec une grande fidélité ; les faits rares — détails d’une petite ville, articles mineurs, spécifications de produits de niche — sont brouillés ou perdus, et le modèle ne peut pas dire de façon fiable lesquels.
- **Aucune étape de consultation.** Un modèle nu ne consulte pas de base de données avant de répondre ; il génère depuis une mémoire statistique. Aucun drapeau interne ne distingue « ceci est un fait récupéré » de « ceci est une complétion de motif ».
- **L’entraînement récompense le fait de répondre.** Les modèles ajustés sur les préférences humaines apprennent que des réponses utiles, assurées et complètes sont bien notées — historiquement, les benchmarks et les évaluateurs pénalisaient le « je ne sais pas », enseignant aux modèles à deviner.
- **L’accumulation d’erreurs.** La génération est séquentielle ; un seul token erroné en début (un nom fabriqué, une mauvaise année) est développé en un paragraphe faux mais cohérent.

## Là où cela empire, de façon prévisible

Les citations et références (le format est facile à imiter, le contenu n’est pas mémorisé), les nombres et dates précis, les entités rares, les longs documents (les modèles prêtent moins fiablement attention au milieu des longs contextes), l’arithmétique faite dans le texte, et toute question reposant sur une fausseté que le modèle accepte poliment.

## Les parades qui marchent

| Parade | Ce qu’elle traite |
| --- | --- |
| RAG / ancrage dans des documents récupérés | Remplace la mémoire par des faits fournis ; permet les citations |
| Usage d’outils (calculatrice, code, recherche) | Externalise ce que les modèles calculent le plus mal |
| « Réponds uniquement d’après le contexte ; sinon dis inconnu » | Donne la permission de refuser |
| Température plus basse pour les tâches factuelles | Élague l’échantillonnage créatif-mais-faux |
| Auto-vérification / contrôle en seconde passe | Attrape les incohérences que la première passe a manquées |
| Citations exigées + flux de vérification ponctuelle | Rend les erreurs détectables par les humains |
| Modèles de raisonnement sur les problèmes difficiles | Dérouler les étapes réduit les erreurs évitables |

L’ancrage est le poids lourd : quand le bon passage est dans le contexte, le travail du modèle passe de *se souvenir* à *lire*, ce qu’il fait bien plus fiablement. C’est pourquoi le RAG reste l’architecture standard des produits factuels.

## Peut-on le résoudre complètement ?

Pas avec les architectures actuelles — un système qui doit toujours produire du texte produira parfois du texte non étayé. La recherche ne cesse de réduire les taux (meilleure calibration, modèles entraînés à s’abstenir, couches de vérification), et les modèles capables de raisonner hallucinent moins sur les problèmes multi-étapes. La posture d’ingénierie, en 2026 : concevoir **en supposant** une hallucination résiduelle — ancrer les réponses, exiger des citations pour les affirmations qui comptent, garder des humains dans la boucle là où les erreurs coûtent cher.

## FAQ

**Pourquoi le modèle paraît-il PLUS sûr de lui quand il a tort ?**
Fluidité et assurance sont des motifs stylistiques appris du texte, sans corrélation avec une certitude interne. N’utilisez pas le ton comme signal de vérité.

**Demander « tu es sûr ? » aide-t-il ?**
Cela déclenche parfois une auto-relecture utile, parfois un acquiescement complaisant à votre doute implicite. Une vérification indépendante bat l’interrogatoire.

**Les modèles plus gros sont-ils plus véridiques ?**
En général oui sur la factualité large, mais aucune taille n’élimine la fabrication — et le style assuré grandit lui aussi avec l’échelle. L’échelle réduit le problème ; l’ancrage et la vérification gèrent ce qui reste.`,
  },
  {
    topicKey: 'open-vs-closed-llms',
    title: 'LLM open source ou propriétaires : comment choisir',
    question: 'Dois-je construire sur des grands modèles de langage open source ou propriétaires ?',
    summary:
      'Les API propriétaires achètent une capacité de pointe sans exploitation ; les modèles à poids ouverts achètent le contrôle, la confidentialité et le passage à l’échelle bon marché. Les facteurs décisifs : sensibilité des données, économie du volume et capacité réellement nécessaire.',
    tags: ['ai', 'llm', 'open source', 'stratégie', 'infrastructure'],
    language: 'fr',
    image: { prompt: promptOf('open-vs-closed-llms'), alt: 'Un cœur à treillis ouvert à côté d’un cœur poli scellé doté d’un seul port' },
    sources: [
      { title: 'LMArena — classement communautaire comparant modèles ouverts et fermés', url: 'https://lmarena.ai' },
      { title: 'Hugging Face — plateforme de modèles ouverts', url: 'https://huggingface.co/models' },
    ],
    content: `# LLM open source ou propriétaires : comment choisir

« Ouvert ou fermé » est moins une question d’idéologie qu’une question d’approvisionnement : **qui exploite le modèle, qui voit vos données, et qui absorbe la charge d’exploitation.** Les modèles fermés (servis par API — les familles GPT, Claude et Gemini) vendent une capacité de pointe sans aucune infrastructure. Les modèles à poids ouverts (les familles Llama, Qwen, DeepSeek, Mistral et bien d’autres) vous remettent les poids et, avec eux, le contrôle, la confidentialité et la facture du service.

Une note terminologique qui compte dans les contrats : la plupart des modèles « open source » sont précisément **à poids ouverts** — vous pouvez les télécharger et les exécuter, mais les données d’entraînement ne sont pas publiées et les licences peuvent comporter des restrictions d’usage. Lisez la licence, pas le marketing.

## Le tableau des compromis

| Dimension | Fermé (API) | Poids ouverts (auto-hébergé) |
| --- | --- | --- |
| Capacité de pointe | Pointe ; le plus fort sur le raisonnement difficile | Les meilleurs modèles ouverts se rapprochent, et mènent au coût par qualité |
| Forme du coût | Au token, croît avec l’usage | Infra fixe + exploitation, croît avec la capacité |
| Contrôle des données | Les données transitent par le fournisseur (vérifiez rétention/entraînement) | Ne quittent jamais votre réseau |
| Personnalisation | Prompting, fine-tuning hébergé partiel | Fine-tuning complet, quantification, chirurgie |
| Charge d’exploitation | Aucune | GPU, pile de service, mises à niveau, astreinte |
| Stabilité | Les modèles sont dépréciés selon le calendrier de l’éditeur | Les poids sont à vous pour toujours |
| Conformité | Certifications de l’éditeur | Récit le plus simple pour les règles strictes de résidence des données |

## Quand le fermé l’emporte

Vous avez besoin du raisonnement le plus puissant disponible ; votre volume est modeste ou en dents de scie ; vous n’avez aucune capacité d’exploitation GPU/ML ; vous voulez que les gains de capacité vous soient livrés en continu. Pour la première année de la plupart des équipes produit, une API de pointe est le chemin le plus rapide pour découvrir si le produit fonctionne tout court — optimisez une fois qu’il marche.

## Quand l’ouvert l’emporte

Les données ne peuvent pas sortir (santé, défense, résidence stricte) ; un volume élevé et soutenu fait dominer la tarification au token dans vos marges ; vous avez besoin d’une personnalisation profonde ou d’un petit modèle spécialisé rapide distillé pour une tâche ; vous embarquez un modèle dans du matériel ou des environnements isolés ; ou le verrouillage fournisseur est un risque stratégique qu’on vous paie pour éviter.

## Le schéma vers lequel convergent la plupart des équipes matures

**Routez, ne prêtez pas allégeance.** Un modèle fermé capable gère la longue traîne difficile et à faible volume ; un modèle ouvert affiné gère le cœur à fort volume et bien compris ; les charges sensibles restent sur site. Les couches d’abstraction et les piles de service compatibles OpenAI rendent le routage multi-modèles peu coûteux à construire, et l’écart entre les niveaux se remesure chaque trimestre — car en 2026, il ne cesse de bouger.

## FAQ

**Les modèles ouverts ont-ils « une génération de retard » ?**
L’écart à la pointe persiste mais s’est considérablement réduit, et pour beaucoup de tâches concrètes (extraction, résumé, code de routine) de bons modèles ouverts sont tout simplement suffisants. Testez votre tâche, pas les gros titres.

**L’auto-hébergement est-il réellement moins cher ?**
Seulement avec un taux d’utilisation. Un GPU servant à 5 % de sa capacité est la fabrique de tokens la plus chère du monde ; les API de modèles ouverts gérées sont la voie médiane — des poids ouverts, les GPU de quelqu’un d’autre.

**Puis-je changer plus tard ?**
Le comportement au niveau du prompt se transfère imparfaitement d’un modèle à l’autre. Maintenez une suite d’évaluation dès le premier jour ; le coût de migration tient surtout à la revalidation, et les évaluations la transforment de semaines d’impressions en jours de diffs.`,
  },
  {
    topicKey: 'llm-tokens-pricing',
    title: 'Que sont les tokens, et comment fonctionne la tarification des LLM ?',
    question: 'Qu’est-ce qu’un token exactement, et comment les fournisseurs de LLM facturent-ils l’usage ?',
    summary:
      'Les tokens sont les fragments de sous-mots que les modèles lisent et écrivent — environ ¾ d’un mot anglais chacun. La tarification des API se fait au million de tokens, la sortie coûtant plusieurs fois l’entrée, avec la mise en cache et le traitement par lots comme grands leviers.',
    tags: ['ai', 'llm', 'tokens', 'tarification', 'api'],
    language: 'fr',
    image: { prompt: promptOf('llm-tokens-pricing'), alt: 'Un prisme découpant un ruban de texte-lumière en tokens pesés sur une balance' },
    sources: [
      { title: 'tiktoken — tokeniseur BPE rapide utilisé par les modèles OpenAI', url: 'https://github.com/openai/tiktoken' },
      { title: 'Sennrich et al., « Neural Machine Translation of Rare Words with Subword Units » (BPE, 2015)', url: 'https://arxiv.org/abs/1508.07909' },
    ],
    content: `# Que sont les tokens, et comment fonctionne la tarification des LLM ?

Les modèles ne lisent ni caractères ni mots — ils lisent des **tokens** : des fragments de sous-mots produits par un tokeniseur. « Understanding » peut être un token ; « unconstitutionally » peut en faire quatre ; un emoji rare peut en faire trois. Chaque limite de capacité (la fenêtre de contexte) et chaque facture d’API se libellent dans ces unités, donc en avoir une idée approximative se rentabilise vite.

## Règles empiriques

- **Anglais** : 1 token ≈ 4 caractères ≈ ¾ d’un mot. Un document de 1 000 mots ≈ 1 300 à 1 500 tokens.
- **Code** : plus dense en tokens que la prose — ponctuation, indentation et identifiants ont tous un coût.
- **Chinois/japonais/coréen** : environ 1 à 2 caractères par token sur les tokeniseurs modernes ; à *information transmise* égale, le texte CJK revient souvent comparable ou légèrement plus cher que l’anglais.
- **Nombres et URL** : étonnamment coûteux ; les longs identifiants se déchirent en de nombreux tokens.

Les tokeniseurs sont construits par codage par paires d’octets (BPE) : on part des octets et on fusionne de façon répétée les paires les plus fréquentes, de sorte que les chaînes courantes deviennent des tokens uniques. Chaque famille de modèles a son propre tokeniseur — les comptes diffèrent d’un fournisseur à l’autre, ce qui explique pourquoi les comparaisons de coût devraient être faites sur *votre* trafic réel.

## Comment tourne le compteur

La tarification des API a une forme standard d’un fournisseur à l’autre :

| Compteur | Ce qui compte | Relation typique |
| --- | --- | --- |
| **Tokens d’entrée** | Tout ce que vous envoyez : prompt système, historique, documents récupérés, la question | Tarif de référence |
| **Tokens de sortie** | Tout ce que le modèle génère, y compris le raisonnement caché sur certains modèles de raisonnement | Couramment ~3 à 5× le tarif d’entrée |
| **Entrée mise en cache** | Préfixes stables répétés (prompts système, longs documents) | Souvent ~10× moins cher que l’entrée fraîche |
| **Lot/asynchrone** | Travaux non urgents soumis en masse | Couramment ~moitié prix |

Deux faits structurels en découlent. Premièrement, **l’historique de conversation est renvoyé à chaque tour** — le coût d’un chat croît de façon quadratique avec sa longueur, à moins de tronquer, de résumer ou de s’appuyer sur la mise en cache. Deuxièmement, **la sortie domine** quand vous générez de longs textes, donc les instructions « sois concis » et les plafonds de sortie sont de vrais leviers de coût, pas de simples préférences de style.

## Estimer une charge de travail

Le calcul est toujours le même : (requêtes par jour) × (tokens d’entrée moyens × tarif d’entrée + tokens de sortie moyens × tarif de sortie). Exemple chiffré avec des tarifs fictifs — disons une entrée à 3 $ et une sortie à 15 $ par million de tokens : un bot de support répondant à 10 000 requêtes/jour avec des prompts de 2 000 tokens (instructions + contexte récupéré) et des réponses de 300 tokens coûte 10 000 × (2 000×3 $ + 300×15 $)/1M ≈ **105 $/jour**, dont deux tiers d’entrée. Ce ratio est typique des applis RAG — c’est pourquoi la mise en cache du prompt et l’élagage du contexte économisent généralement plus que de changer de modèle.

## Les grands leviers, classés

1. **Mettre en cache les préfixes stables** — des gains quasi gratuits pour toute appli dotée d’un long prompt système fixe ou de documents partagés.
2. **Dimensionner le modèle au juste** — router le trafic facile vers un niveau moins cher ; réserver les modèles de pointe à la traîne difficile.
3. **Élaguer le contexte** — récupérer moins de fragments, mais meilleurs ; résumer les anciens tours de chat ; dédupliquer le code passe-partout.
4. **Plafonner et façonner la sortie** — fixer des longueurs maximales ; préférer des réponses courtes et structurées quand c’est possible.
5. **Mettre en lot le non urgent** — la classification nocturne et les rattrapages ne devraient pas payer des prix interactifs.

## FAQ

**Pourquoi ai-je été facturé plus de tokens que la longueur de mon texte ne le suggère ?**
Les prompts système, les définitions d’outils, la mise en forme des messages et (sur les modèles de raisonnement) les tokens de réflexion comptent tous, et le texte non anglais ou riche en code se tokenise plus densément que la règle empirique de l’anglais.

**Les fenêtres de contexte changent-elles la tarification ?**
La fenêtre est une limite de capacité, pas un prix — mais la remplir, si. Certains fournisseurs facturent aussi des tarifs majorés au-delà de certaines tailles de contexte, donc les appels à contexte géant méritent un examen attentif.

**Comment compter les tokens avant d’envoyer ?**
Utilisez la bibliothèque de tokeniseur du fournisseur ou son point d’accès de comptage de tokens (pour les tokeniseurs de la famille OpenAI, tiktoken tourne en local). Pour budgétiser, l’heuristique des ≈4 caractères tombe généralement à 20 % près.`,
  },
];
