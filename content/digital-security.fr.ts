import type { DraftArticle } from './types';
import { digitalSecurityEn } from './digital-security.en';

// Batch: Digital Privacy & Security (version française native). Mêmes sujets et
// mêmes topicKey que digital-security.en.ts, mais rédigés nativement pour un
// lectorat francophone (exemples adaptés aux usages courants). Images partagées.

const promptOf = (key: string): string => {
  const hit = digitalSecurityEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const digitalSecurityFr: DraftArticle[] = [
  {
    topicKey: 'password-managers',
    title: 'Pourquoi vous devriez utiliser un gestionnaire de mots de passe',
    question: 'Qu’est-ce qu’un gestionnaire de mots de passe, et est-il vraiment plus sûr que de mémoriser mes mots de passe ?',
    summary:
      'Un gestionnaire de mots de passe génère et stocke un mot de passe fort et unique pour chaque compte derrière un seul mot de passe maître, si bien que la fuite d’un site ne déverrouille pas les autres. C’est l’habitude de sécurité la plus rentable pour la plupart des gens.',
    tags: ['sécurité', 'vie privée', 'mots de passe', 'sécurité numérique'],
    language: 'fr',
    image: {
      prompt: promptOf('password-managers'),
      alt: 'Une clé maître ouvrant un coffre rempli de centaines de clés toutes différentes',
    },
    sources: [
      { title: 'NIST — Lignes directrices sur l’identité numérique (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Utilisez des mots de passe forts et des gestionnaires', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# Pourquoi vous devriez utiliser un gestionnaire de mots de passe

Le problème central que résout un gestionnaire de mots de passe, c’est la **réutilisation**. Personne ne peut mémoriser cent mots de passe forts et différents, alors on en recycle une poignée — ce qui signifie qu’au moment où un seul site est piraté, les attaquants prennent ce couple e-mail/mot de passe et l’essaient sur votre banque, votre messagerie et partout ailleurs. Cette attaque automatisée (appelée *credential stuffing*, ou bourrage d’identifiants) est l’une des façons les plus courantes de se faire pirater un compte. Un gestionnaire la tue à la racine en donnant à chaque compte son propre mot de passe unique et aléatoire.

## Comment ça marche

Un gestionnaire de mots de passe est un coffre-fort chiffré. Vous mémorisez exactement **un seul** mot de passe maître fort ; il retient tout le reste :

- **Génère** de longs mots de passe aléatoires (par ex. \`v8#mQ2!pLx9$\`) que vous n’avez jamais à taper ni à retenir.
- **Stocke** le tout chiffré, verrouillé par votre mot de passe maître.
- **Remplit automatiquement** le bon identifiant sur le bon site — ce qui, bonus, résiste à l’hameçonnage, car il ne remplira pas votre vrai mot de passe bancaire sur un faux domaine sosie.

Le coffre est chiffré de telle sorte que même l’entreprise qui fournit le gestionnaire ne peut pas lire vos mots de passe — une propriété appelée « zéro connaissance ». Votre mot de passe maître ne quitte jamais votre appareil sous une forme exploitable.

## L’objection, traitée

L’inquiétude instinctive est : « mettre tous mes mots de passe au même endroit, n’est-ce pas dangereux ? » Ça paraît risqué, mais le calcul penche dans l’autre sens :

| Sans gestionnaire | Avec gestionnaire |
| --- | --- |
| Peu de mots de passe, fortement réutilisés | Un mot de passe unique par site |
| Une fuite → plusieurs comptes tombent | Une fuite → un seul compte, contenu |
| Choix faibles et mémorisables | Choix longs, aléatoires, incassables |
| Mots de passe tapés sur des sites d’hameçonnage | Le remplissage auto refuse les mauvais domaines |

Oui, le mot de passe maître est un point de défaillance unique — alors vous protégez *celui-là* solidement (longue phrase de passe, plus une double authentification sur le gestionnaire lui-même) et vous acceptez que défendre farouchement un seul secret vaut mieux que d’en défendre cent mal.

## Choisir et démarrer

Les gestionnaires réputés — qu’il s’agisse de services cloud bien évalués ou d’options hors ligne / open source respectées — sont tous radicalement meilleurs que la réutilisation. Conseils pratiques :

- **Mot de passe maître** : faites-en une longue phrase de passe de mots aléatoires, unique, jamais utilisée nulle part ailleurs. C’est celui que vous mémorisez vraiment.
- **Activez la double authentification** pour le compte du gestionnaire lui-même.
- **Migrez progressivement** : laissez-le importer vos mots de passe existants, puis changez d’abord ceux réutilisés sur les comptes importants (messagerie, banque, achats principaux).
- **Même celui intégré au navigateur** vaut mieux que la réutilisation — le comportement clé, c’est des mots de passe uniques partout, pas une marque précise.

## FAQ

**Et si j’oublie mon mot de passe maître ?**
Avec un vrai chiffrement à zéro connaissance, le fournisseur ne peut généralement pas le récupérer — c’est tout l’intérêt. Configurez les options de récupération du gestionnaire (kit d’urgence, code de récupération) dès le départ, et conservez-les hors ligne.

**La synchronisation cloud est-elle sûre ?**
Le coffre se synchronise déjà chiffré, donc le serveur de synchronisation ne détient jamais qu’un bloc illisible. C’est le chiffrement, pas le réseau, qui le protège.

**Les mots de passe enregistrés par le navigateur suffisent-ils ?**
Ils valent bien mieux que la réutilisation et conviennent à beaucoup de gens. Les gestionnaires dédiés ajoutent l’usage multi-navigateurs, le partage sécurisé, les alertes de fuite et une meilleure isolation — d’autant plus utile que votre liste de comptes s’allonge.`,
  },
  {
    topicKey: 'two-factor-auth',
    title: 'Double authentification : quel type est réellement sûr ?',
    question: 'Qu’est-ce que la double authentification, et pourquoi le SMS en est-il la version la plus faible ?',
    summary:
      'La double authentification ajoute une seconde preuve au-delà du mot de passe : un mot de passe volé ne suffit plus. Mais les types diffèrent : les codes SMS s’interceptent ou se détournent par échange de SIM, alors que les applis d’authentification et les clés matérielles sont bien plus solides.',
    tags: ['sécurité', '2fa', 'authentification', 'sécurité numérique'],
    language: 'fr',
    image: {
      prompt: promptOf('two-factor-auth'),
      alt: 'Une porte exigeant à la fois une clé et un jeton dynamique séparé',
    },
    sources: [
      { title: 'NIST — Lignes directrices sur l’identité numérique (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Plus qu’un mot de passe (authentification multifacteur)', url: 'https://www.cisa.gov/MFA' },
    ],
    content: `# Double authentification : quel type est réellement sûr ?

La double authentification (2FA, ou plus largement MFA) signifie que se connecter exige **deux types de preuves différents** : quelque chose que vous *savez* (votre mot de passe) plus quelque chose que vous *possédez* (un code, une appli, une clé physique). L’intérêt est la résilience — même si un attaquant vole votre mot de passe via une fuite ou un hameçonnage, il ne peut toujours pas entrer sans le second facteur. L’activer est l’une des choses les plus efficaces que vous puissiez faire. Mais le second facteur existe sous plusieurs formes, et elles sont loin d’être de force égale.

## L’échelle, du plus faible au plus fort

| Méthode | Comment ça marche | Faiblesse |
| --- | --- | --- |
| **Code SMS** | Un code envoyé par texto sur votre téléphone | Échange de SIM, interception réseau, hameçonnable |
| **Appli d’authentification** | L’appli génère un code à 6 chiffres qui change toutes les 30 s | Hameçonnable si vous le tapez sur un faux site |
| **Validation par notification** | Invite « Approuver cette connexion ? » sur votre téléphone | Attaques par « fatigue » — spam jusqu’à ce que vous validiez |
| **Clé de sécurité matérielle / passkey** | Clé physique ou identifiant lié à l’appareil, lié cryptographiquement au vrai site | Résiste à l’hameçonnage par conception |

Tout ce qui figure dans cette liste bat le mot de passe seul. Mais les barreaux comptent.

## Pourquoi le SMS est le barreau faible

Les codes envoyés par texto furent la première 2FA grand public et restent répandus, mais ils ont des faiblesses réelles et exploitées :

- **Échange de SIM (SIM swapping)** : un attaquant convainc (ou soudoie) votre opérateur mobile de transférer votre numéro vers sa SIM, et vos codes arrivent désormais sur *son* téléphone. C’est une façon documentée et récurrente de vider des comptes de grande valeur.
- **Interception** : la signalisation sous-jacente du réseau téléphonique présente des failles connues qui peuvent détourner les textos.
- **Toujours hameçonnable** : une fausse page de connexion peut simplement vous demander le code SMS et le relayer en temps réel.

Le verdict honnête : **la 2FA par SMS vaut bien mieux que rien** — gardez-la là où c’est la seule option — mais faites monter vos comptes importants (messagerie, finances, identité principale) dans l’échelle.

## Ce qu’il faut vraiment utiliser

- **Par défaut, une appli d’authentification** (codes tournants) — gratuite, simple, immunisée contre l’échange de SIM, et prise en charge presque partout.
- **Pour vos comptes les plus critiques, une clé matérielle ou une passkey** — elles *résistent à l’hameçonnage* : l’identifiant est lié cryptographiquement au site authentique, donc il ne s’authentifiera tout simplement pas sur un sosie, déjouant l’attaque qui bat toutes les méthodes à base de code.
- **Protégez d’abord votre messagerie.** C’est la clé maîtresse — les réinitialisations de mot de passe de tout le reste passent par elle, alors elle mérite votre facteur le plus fort.

## FAQ

**N’importe quelle 2FA vaut-elle mieux que rien ?**
Oui, sans hésiter. Même le SMS bloque l’immense majorité des attaques automatisées. Ne laissez pas le discours « le SMS est faible » vous dissuader de l’activer là où c’est tout ce qui est proposé.

**Que se passe-t-il si je perds mon téléphone / ma clé ?**
Enregistrez les codes de secours / récupération que chaque service propose à l’inscription, et inscrivez un second facteur (une clé de secours, ou l’appli sur un deuxième appareil). Conservez les codes de récupération hors ligne.

**Les invites de validation par notification sont-elles sûres ?**
Bonnes, mais vulnérables aux attaques par fatigue — des invites sans fin dans l’espoir que vous validiez pour que ça cesse. N’approuvez jamais une connexion que vous n’avez pas lancée ; préférez les invites avec correspondance de chiffres quand elles sont proposées.`,
  },
  {
    topicKey: 'passkeys',
    title: 'Que sont les passkeys, et remplacent-elles les mots de passe ?',
    question: 'Qu’est-ce qu’une passkey, et en quoi diffère-t-elle d’un mot de passe ?',
    summary:
      'Une passkey remplace le mot de passe par une paire de clés cryptographiques répartie entre le site et votre appareil — rien de secret n’est tapé ni partagé, donc il n’y a rien à hameçonner, à réutiliser ni à voler lors d’une fuite. C’est le successeur du mot de passe désigné par l’industrie.',
    tags: ['sécurité', 'passkey', 'authentification', 'mots de passe'],
    language: 'fr',
    image: {
      prompt: promptOf('passkeys'),
      alt: 'Deux moitiés de clé prouvant qu’elles s’emboîtent sans jamais se toucher',
    },
    sources: [
      { title: 'Alliance FIDO — Présentation des passkeys', url: 'https://fidoalliance.org/passkeys/' },
      { title: 'NIST — Lignes directrices sur l’identité numérique (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
    ],
    content: `# Que sont les passkeys, et remplacent-elles les mots de passe ?

Une passkey est un identifiant de connexion conçu pour corriger les deux péchés originels du mot de passe : les mots de passe sont des **secrets partagés** (vous et le site connaissez la même chaîne, donc elle peut être volée d’un côté comme de l’autre) et ils sont **tapés** (donc hameçonnables ou réutilisables). Une passkey n’est ni partagée ni tapée. Elle repose sur la cryptographie à clé publique, et une fois que vous comprenez la division, les avantages de sécurité sautent aux yeux.

## L’idée de la paire de clés, en clair

Quand vous créez une passkey, votre appareil génère une **paire** de clés liées mathématiquement :

- Une **clé privée** qui ne quitte jamais votre appareil (téléphone, ordinateur portable ou clé de sécurité), protégée par votre empreinte, votre visage ou le code de l’appareil.
- Une **clé publique** qui est remise au site.

La clé publique n’est pas un secret — on ne peut pas l’utiliser pour usurper votre identité. Pour vous connecter, le site envoie un défi ; votre appareil prouve qu’il détient la clé privée correspondante *sans jamais la révéler*. Rien de secret ne traverse le réseau, et rien de réutilisable n’est jamais stocké sur le serveur.

## Pourquoi cela déjoue les attaques courantes

| Attaque | Contre les mots de passe | Contre les passkeys |
| --- | --- | --- |
| Fuite de base de données | Vole les mots de passe (hachés) | Ne vole que les clés publiques — inutiles aux attaquants |
| Hameçonnage | Le faux site capture ce que vous tapez | Rien à taper ; la clé est liée au vrai domaine |
| Réutilisation | Une fuite déverrouille plusieurs sites | Chaque passkey est unique et propre à un site par conception |
| Bourrage d’identifiants | Fonctionne en masse | Rien à bourrer |

La résistance à l’hameçonnage est l’argument phare. Une passkey est liée cryptographiquement à l’identité du site authentique, si bien qu’un domaine sosie ne peut littéralement pas la déclencher — comblant la brèche que même les codes des applis d’authentification laissent ouverte.

## Les utiliser aujourd’hui

En pratique, une passkey donne souvent la sensation de **déverrouiller son téléphone** : une invite apparaît, vous confirmez par empreinte ou visage, et vous êtes connecté — pas de mot de passe, pas de code à recopier. Les passkeys se synchronisent généralement via l’écosystème de votre appareil (un nouveau téléphone les conserve) ou résident sur une clé de sécurité matérielle pour le niveau d’assurance le plus élevé. L’adoption est large et croissante sur les grandes plateformes et les grands sites, même si l’on est en pleine transition : la plupart des sites qui proposent des passkeys conservent encore le mot de passe en repli.

## FAQ

**Et si je perds mon appareil ?**
Les passkeys synchronisées sont récupérables via votre compte de plateforme sur un nouvel appareil (protégé par sa propre sécurité forte). Pour les clés liées à l’appareil, inscrivez une seconde passkey ou conservez une méthode de secours — la même discipline que pour la récupération de la 2FA.

**Une entreprise victime d’une fuite peut-elle divulguer ma passkey ?**
Non — le serveur ne détient que votre clé publique, qui n’est pas un secret et ne peut pas se connecter à votre place. C’est l’avantage structurel sur les bases de mots de passe.

**Ai-je encore besoin d’un gestionnaire de mots de passe ?**
Pour l’instant, oui — les passkeys se déploient progressivement, vous aurez donc un mélange pendant des années. Beaucoup de gestionnaires stockent déjà aussi les passkeys, devenant un coffre unifié pour les deux.`,
  },
  {
    topicKey: 'phishing-scams',
    title: 'Comment reconnaître l’hameçonnage et les arnaques en ligne',
    question: 'Comment reconnaître un e-mail d’hameçonnage ou un message frauduleux avant de me faire piéger ?',
    summary:
      'L’hameçonnage fabrique de l’urgence pour vous faire agir avant de réfléchir — fausse alerte, offre trop belle, lien « vérifiez maintenant ». Les défenses sont des habitudes, pas des gadgets : ralentir, vérifier le vrai expéditeur et le vrai lien, ne jamais saisir d’identifiants depuis un lien reçu.',
    tags: ['sécurité', 'hameçonnage', 'arnaques', 'sécurité numérique'],
    language: 'fr',
    image: {
      prompt: promptOf('phishing-scams'),
      alt: 'Un hameçon déguisé en enveloppe s’approchant d’un poisson dans un anneau protecteur',
    },
    sources: [
      { title: 'CISA — Reconnaître et signaler l’hameçonnage', url: 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing' },
      { title: 'FTC — Comment reconnaître et éviter les arnaques par hameçonnage', url: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams' },
    ],
    content: `# Comment reconnaître l’hameçonnage et les arnaques en ligne

L’hameçonnage est une escroquerie de confiance déguisée en costume technique. L’attaquant ne casse pas votre chiffrement — il fait en sorte que *vous* lui remettiez un mot de passe, un code ou de l’argent, en usurpant l’identité de quelqu’un en qui vous avez confiance et en orchestrant un moment où vous agissez sur l’émotion plutôt que sur le jugement. Comme il vise les réflexes humains, la défense est elle aussi humaine : quelques habitudes qui brisent fiablement le piège. La plus utile, c’est de reconnaître l’émotion qu’on cherche à fabriquer.

## Le signe universel : l’urgence fabriquée

Presque toute arnaque a besoin que vous agissiez *vite*, avant que la partie réfléchie de votre cerveau ne rattrape le coup. Les leviers émotionnels forment une courte liste :

- **Peur** : « Votre compte va être suspendu », « connexion suspecte détectée », « impôt impayé — agissez maintenant ».
- **Appât du gain** : « Vous avez gagné », « réclamez votre remboursement », « placement qui double chaque semaine ».
- **Autorité** : un message « de la part » de votre banque, votre patron, un transporteur ou l’administration.
- **Curiosité / serviabilité** : « C’est toi sur cette photo ? », « J’ai besoin d’un petit service ».

Quand un message fait monter votre rythme cardiaque et vous pousse à cliquer, payer ou partager *immédiatement*, cette pression est en elle-même le signal d’alerte — les organisations légitimes ne fonctionnent pas avec « répondez dans les 10 prochaines minutes, sinon ».

## Les vérifications concrètes

| Vérification | Ce qu’il faut regarder |
| --- | --- |
| **Adresse de l’expéditeur** | Survolez / dépliez-la — \`service@paypa1.com\` ≠ \`paypal.com\`. Les noms affichés mentent. |
| **Le lien réel** | Survolez (ne cliquez pas) pour voir la vraie destination ; méfiez-vous des domaines sosies |
| **Formule générique** | « Cher client » de la part d’une entreprise qui connaît votre nom |
| **Pièces jointes inattendues** | Factures / reçus que vous n’attendiez pas — un grand classique de la diffusion de malware |
| **Demandes de secrets** | Les vraies institutions ne demandent jamais votre mot de passe, votre code PIN complet ou un code 2FA |
| **Pression + secret** | « N’en parlez à personne », « virement urgent », paiement en cartes cadeaux — tous d’énormes drapeaux rouges |

## Les deux règles qui évitent la plupart des pertes

1. **Ne vous connectez jamais via un lien reçu dans un message.** Si un e-mail signale un problème sur un compte, ne cliquez pas — ouvrez un nouvel onglet et tapez l’adresse vous-même (ou utilisez votre favori / l’appli). Cette seule habitude déjoue la plupart des hameçonnages d’identifiants, car le faux site n’a jamais l’occasion d’apparaître.

2. **Vérifiez par un autre canal pour tout ce qui touche à l’argent ou aux secrets.** Un « patron » qui réclame un virement ou des cartes cadeaux, une « banque » qui vous demande de « déplacer votre argent vers un compte sûr », un proche soudain en détresse — arrêtez-vous et confirmez par un canal *séparé et connu* (appelez le numéro officiel, pas celui du message). L’urgence assortie d’un mode de paiement inhabituel est la signature d’une arnaque.

## FAQ

**Le message a l’air parfait — logo, mise en forme, mon nom. Faut-il quand même douter ?**
Oui. Les visuels convaincants se copient trivialement, et les données personnelles fuitent lors de violations. Jugez d’après la *demande* (urgence, secrets, paiement) et vérifiez de façon indépendante, pas d’après son apparence soignée.

**J’ai cliqué sur un lien / saisi mon mot de passe. Et maintenant ?**
Agissez vite : changez ce mot de passe (et partout où il était réutilisé) depuis un appareil de confiance, activez la 2FA, surveillez toute activité non autorisée et contactez la vraie institution. La rapidité limite les dégâts.

**Les appels et les SMS sont-ils aussi de l’hameçonnage ?**
Oui — le « vishing » (voix) et le « smishing » (SMS) suivent le même mode opératoire, et le clonage vocal par IA rend les appels plus convaincants. La même règle tient : raccrochez et rappelez un numéro officiel que vous avez vous-même cherché.`,
  },
  {
    topicKey: 'vpn-explained',
    title: 'Ce qu’un VPN fait réellement (et ce qu’il ne fait pas)',
    question: 'Que protège vraiment un VPN, et en ai-je réellement besoin ?',
    summary:
      'Un VPN chiffre votre trafic vers un serveur qui masque votre adresse IP et vous protège sur les réseaux non fiables. Ce n’est ni un anonymat ni une sécurité absolus — HTTPS protège déjà l’essentiel des données, et un VPN déplace votre confiance vers le fournisseur de VPN plutôt que de la supprimer.',
    tags: ['sécurité', 'vie privée', 'vpn', 'réseau'],
    language: 'fr',
    image: {
      prompt: promptOf('vpn-explained'),
      alt: 'Des données traversant un tube scellé qui masque leur origine jusqu’à un relais distant',
    },
    sources: [
      { title: 'EFF — Surveillance Self-Defense : les VPN', url: 'https://ssd.eff.org/module/choosing-vpn-thats-right-you' },
      { title: 'CISA — recommandations sur les connexions sécurisées', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# Ce qu’un VPN fait réellement (et ce qu’il ne fait pas)

Un VPN (réseau privé virtuel) établit un tunnel chiffré depuis votre appareil vers un serveur exploité par le fournisseur de VPN ; votre trafic ressort vers Internet depuis *là-bas*, portant l’adresse IP de ce serveur au lieu de la vôtre. C’est tout le mécanisme — et il en découle à la fois de véritables avantages et un tas d’exagérations marketing. Le plus utile à comprendre, c’est qu’un VPN **déplace votre confiance** ; il n’élimine pas le besoin de faire confiance.

## Ce qu’il fait vraiment

- **Masque votre adresse IP** aux yeux des sites que vous visitez — ils voient l’emplacement du serveur VPN, pas votre domicile ou votre ville. Utile pour réduire une forme de pistage et pour ne pas exposer votre identité réseau.
- **Chiffre le trafic sur le réseau local** — sur un Wi-Fi public douteux (café, aéroport, hôtel, et quiconque l’espionne), on ne voit qu’un tunnel chiffré, pas ce que vous faites.
- **Masque votre activité à votre fournisseur d’accès** — votre FAI voit que vous êtes connecté à un VPN, mais pas quels sites vous visitez.
- **Change votre emplacement apparent** — c’est pourquoi certains s’en servent pour accéder à des contenus géobloqués (sous réserve des conditions de chaque service).

## Ce qu’il ne fait PAS

C’est là que le marketing survend :

| Mythe | Réalité |
| --- | --- |
| « Un VPN vous rend anonyme » | Loin de là — connexions, cookies, empreinte du navigateur et comptes vous identifient quand même |
| « Un VPN vous protège des virus / piratages » | Non — c’est un tunnel, pas un antivirus ni un pare-feu contre les malwares |
| « Un VPN chiffre tout ce que vous faites » | La plupart des sites sont déjà chiffrés de bout en bout en HTTPS ; le VPN protège surtout le saut *local* |
| « Un VPN vous cache de tout le monde » | Votre fournisseur de VPN peut voir votre trafic — vous lui avez transféré votre confiance |

Ce dernier point est crucial. Sans VPN, votre réseau local et votre FAI peuvent observer vos connexions. *Avec* un VPN, c’est l’entreprise de VPN qui occupe cette position — un VPN ne vaut donc que la confiance qu’on peut accorder à son exploitant. Un VPN gratuit qui se monétise en enregistrant et revendant votre activité peut être pire que pas de VPN du tout.

## En avez-vous besoin ?

| Situation | Verdict |
| --- | --- |
| Souvent sur du Wi-Fi public / non fiable | Raisonnable — ajoute une vraie couche (même si HTTPS couvre déjà beaucoup) |
| Vouloir cacher sa navigation à son FAI | Oui, c’est un usage central |
| Accéder à des contenus géobloqués | Usage courant (attention aux conditions d’utilisation) |
| Rechercher un véritable anonymat | Un VPN seul n’y suffira pas |
| Déjà uniquement sur réseaux de confiance, en HTTPS | Facultatif — le bénéfice est moindre que ce que laissent croire les pubs |

Si vous en utilisez un, choisissez un fournisseur payant réputé, doté d’une politique « sans journaux » claire et idéalement auditée — vous lui confiez tout ce que votre FAI voyait auparavant.

## FAQ

**Un VPN empêche-t-il les sites de me pister ?**
Seulement la partie basée sur l’IP. Cookies, connexions et empreinte du navigateur vous identifient toujours. Le blocage du pistage passe par des réglages / extensions de navigateur, pas par un VPN.

**Un VPN gratuit, ça va ?**
Méfiance — faire tourner des serveurs coûte de l’argent, et certains VPN gratuits se rémunèrent en enregistrant et revendant vos données, à l’opposé du but recherché. Des offres gratuites sérieuses existent, mais lisez la politique de confidentialité.

**Ai-je besoin d’un VPN si les sites utilisent HTTPS ?**
HTTPS chiffre déjà le contenu de votre trafic de bout en bout. Un VPN ajoute le masquage de l’IP et protège les métadonnées sur le réseau local, mais c’est une amélioration plus modeste que ce que suggèrent les pubs quand vous êtes déjà en HTTPS.`,
  },
  {
    topicKey: 'end-to-end-encryption',
    title: 'Qu’est-ce que le chiffrement de bout en bout ?',
    question: 'Que signifie le chiffrement de bout en bout, et pourquoi est-il important pour la messagerie ?',
    summary:
      'Le chiffrement de bout en bout verrouille un message pour que seuls l’expéditeur et le destinataire puissent le lire — ni le réseau, ni même l’entreprise qui exploite le service. C’est la différence entre une lettre scellée et une carte postale lisible par tous en chemin.',
    tags: ['sécurité', 'vie privée', 'chiffrement', 'messagerie'],
    language: 'fr',
    image: {
      prompt: promptOf('end-to-end-encryption'),
      alt: 'Un message scellé illisible en transit, ne s’ouvrant qu’à l’appareil de destination',
    },
    sources: [
      { title: 'EFF — Surveillance Self-Defense : qu’est-ce que le chiffrement ?', url: 'https://ssd.eff.org/module/what-encryption' },
      { title: 'NIST — Normes et lignes directrices cryptographiques', url: 'https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines' },
    ],
    content: `# Qu’est-ce que le chiffrement de bout en bout ?

Le chiffrement de bout en bout (E2EE) signifie qu’un message est brouillé sur l’appareil de l’expéditeur et ne peut être débrouillé que sur celui du destinataire — si bien qu’à aucun point intermédiaire personne d’autre ne peut le lire. Surtout, « personne d’autre » inclut l’entreprise qui exploite le service. L’analogie classique : un message ordinaire est une **carte postale** que chaque intermédiaire peut lire en chemin ; un message chiffré de bout en bout est une **lettre scellée** que seul le destinataire peut ouvrir. La différence porte sur qui *peut* lire vos conversations, pas seulement sur qui *promet* de ne pas le faire.

## La distinction qui compte vraiment

La plupart des services en ligne chiffrent les données « en transit » (entre vous et leurs serveurs) et « au repos » (dans leur stockage). C’est bien, mais dans les deux cas **l’entreprise peut toujours lire votre contenu** — elle détient les clés. Le chiffrement de bout en bout est plus fort : seules les extrémités détiennent les clés, donc le fournisseur est structurellement incapable de lire vos messages, même s’il le voulait, était piraté ou recevait l’ordre de les remettre.

| | Chiffrement en transit / au repos | Chiffrement de bout en bout |
| --- | --- | --- |
| Protégé des espions extérieurs | Oui | Oui |
| Lisible par le fournisseur du service | **Oui** | **Non** |
| Exposé lors d’une fuite chez le fournisseur | Potentiellement | Le contenu reste illisible |
| Remis sur réquisition légale | Possible | Le fournisseur n’a rien de lisible à donner |

## Comment ça marche, en bref

L’E2EE utilise la même idée de clé publique qui sous-tend les passkeys et HTTPS. Chaque utilisateur a une clé publique (partagée librement) et une clé privée (jamais partagée). Pour vous écrire, l’expéditeur chiffre avec *votre* clé publique ; seule *votre* clé privée peut déchiffrer. Les clés résident sur les appareils, pas sur le serveur — c’est précisément pourquoi le serveur ne peut pas lire le contenu. Les bonnes applis de messagerie ajoutent la « confidentialité persistante » (forward secrecy), en faisant tourner les clés pour qu’une compromission future d’une clé ne puisse pas déverrouiller les messages passés.

## Là où vous comptez dessus

- **Messagerie** : certaines applis sont chiffrées de bout en bout par défaut, d’autres seulement dans un mode optionnel, d’autres pas du tout. Si la confidentialité compte, vérifiez laquelle.
- **Appels** : beaucoup d’applis voix/vidéo proposent désormais l’E2EE.
- **Sauvegardes et cloud** : une faille subtile — une conversation peut être en E2EE alors que sa *sauvegarde cloud* ne l’est pas, rendant discrètement les messages à nouveau lisibles. Vérifiez les réglages de sauvegarde.
- **Le Web** : HTTPS est de bout en bout entre votre navigateur et le site (même si le site lui-même, en tant qu’extrémité, lit ce que vous lui envoyez).

## FAQ

**Si même l’entreprise ne peut pas le lire, qui le peut ?**
Seules les personnes qui tiennent les appareils à chaque extrémité. Cela signifie aussi que la sécurité de l’*appareil* compte — l’E2EE protège les messages en transit, pas un téléphone que quelqu’un déverrouille. Et les métadonnées (avec qui, quand) peuvent rester visibles même quand le contenu ne l’est pas.

**L’E2EE aide-t-il les criminels ?**
C’est le même chiffrement qui protège vos opérations bancaires, vos dossiers médicaux, les journalistes et les conversations privées ordinaires — une protection à usage général. Le consensus en sécurité grand public est qu’affaiblir ce chiffrement pour tout le monde (une « porte dérobée ») rend tout le monde moins sûr, car une porte dérobée ne peut pas être réservée aux « gentils ».

**Comment savoir si une appli l’utilise vraiment ?**
Cherchez la mention explicite « chiffrement de bout en bout » (pas seulement « chiffré »), privilégiez les applis fondées sur des protocoles ouverts et bien examinés, et vérifiez si c’est activé par défaut ou seulement dans un mode spécial.`,
  },
  {
    topicKey: 'public-wifi-safety',
    title: 'Le Wi-Fi public est-il réellement dangereux ?',
    question: 'Est-il sûr d’utiliser le Wi-Fi public dans les cafés et aéroports, et que dois-je éviter ?',
    summary:
      'Le Wi-Fi public est bien plus sûr qu’avant, car presque tous les sites utilisent désormais HTTPS, qui chiffre vos données quel que soit le réseau. Les vrais risques résiduels sont les faux points d’accès et les connexions non chiffrées — gérables avec quelques habitudes.',
    tags: ['sécurité', 'vie privée', 'wifi', 'sécurité numérique'],
    language: 'fr',
    image: {
      prompt: promptOf('public-wifi-safety'),
      alt: 'Un ordinateur portable émettant des données déjà scellées sur un Wi-Fi public, près d’un faux point d’accès',
    },
    sources: [
      { title: 'FTC — Les réseaux Wi-Fi publics sont-ils sûrs ?', url: 'https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-not-always' },
      { title: 'EFF — HTTPS et Surveillance Self-Defense', url: 'https://ssd.eff.org/module/what-should-i-know-about-encryption' },
    ],
    content: `# Le Wi-Fi public est-il réellement dangereux ?

Le Wi-Fi public traîne une réputation effrayante qui est surtout **dépassée**. Les vieux avertissements datent d’une époque où les sites envoyaient les données en clair, si bien que n’importe qui sur le même réseau de café pouvait « renifler » vos mots de passe dans les airs. Cette époque est largement révolue : aujourd’hui, l’immense majorité des sites utilisent **HTTPS**, qui chiffre votre connexion de bout en bout entre votre navigateur et le site — sur n’importe quel réseau, de confiance ou non. Le cadenas dans votre barre d’adresse accomplit l’essentiel du travail de protection que les avertissements alarmistes attribuent à un VPN.

## Pourquoi HTTPS a changé la donne

Quand vous vous connectez à un site HTTPS, votre trafic est chiffré *avant* de quitter votre appareil, donc un espion sur le même Wi-Fi ne voit que des données brouillées et le site que vous visitez — pas votre mot de passe, vos messages ni votre numéro de carte. Comme les navigateurs modernes signalent désormais les sites non-HTTPS comme « Non sécurisé » et que la majeure partie du Web a migré, l’attaque classique du « mot de passe volé au café » est bien plus difficile qu’avant.

## Les risques qui subsistent

Le Wi-Fi public n’est pas pour autant à *zéro* risque — les menaces se sont déplacées :

| Risque | De quoi il s’agit | Défense |
| --- | --- | --- |
| **Point d’accès jumeau (evil twin)** | Un faux réseau nommé « Aeroport_WiFi_Gratuit » géré par un attaquant | Confirmez le vrai nom du réseau ; ne rejoignez pas automatiquement les inconnus |
| **Sites non-HTTPS** | Le rare site envoyant encore des données en clair | Surveillez l’avertissement « Non sécurisé » ; n’y saisissez pas de secrets |
| **Regard par-dessus l’épaule** | Quelqu’un qui regarde simplement votre écran | Filtre de confidentialité, vigilance |
| **Appareil obsolète** | Failles non corrigées exploitables sur des réseaux partagés | Gardez votre système et vos applis à jour |
| **Connexion automatique** | Téléphone rejoignant en silence un réseau malveillant de même nom | Désactivez la connexion auto aux réseaux ouverts |

Le risque phare est le **jumeau maléfique** : un point d’accès malveillant au nom amical. Si vous vous y connectez, l’attaquant contrôle votre chemin réseau — mais même alors, HTTPS garde vos sessions chiffrées illisibles ; le danger vient surtout du trafic non-HTTPS et du fait d’être attiré vers de fausses pages de connexion.

## Des habitudes sensées (sans paranoïa)

- **Faites confiance au cadenas HTTPS**, et ne contournez jamais un avertissement de certificat sur un Wi-Fi public — cet avertissement, c’est précisément le moment où quelque chose cloche.
- **Vérifiez le nom du réseau** auprès du personnel plutôt que de deviner ; méfiez-vous des réseaux ouverts usurpant une marque.
- **Désactivez la connexion automatique** aux réseaux ouverts pour que vos appareils ne rejoignent pas en silence des sosies.
- **Un VPN ajoute une couche** en chiffrant aussi les métadonnées et tout trafic non-HTTPS — un extra raisonnable sur les réseaux non fiables, mais pas la nécessité que prétendent les pubs, vu HTTPS.
- **Gardez vos appareils à jour** ; la plupart des attaques réseau restantes visent des failles connues et déjà corrigées.

## FAQ

**Quelqu’un peut-il voler mon mot de passe bancaire sur le Wi-Fi d’un café ?**
Si votre banque utilise HTTPS (c’est le cas) et que vous n’avez pas ignoré un avertissement de certificat ni cédé à une fausse page de connexion, vos identifiants sont chiffrés sur le réseau. Le plus grand danger, c’est l’hameçonnage, pas le reniflage.

**Ai-je vraiment besoin d’un VPN pour le Wi-Fi public ?**
C’est une couche supplémentaire raisonnable, mais HTTPS protège déjà le contenu de votre trafic. Un VPN aide surtout pour le trafic non-HTTPS et pour cacher au réseau local quels sites vous visitez.

**Les données mobiles de mon téléphone sont-elles plus sûres que le Wi-Fi public ?**
En général oui — le cellulaire est chiffré et vous ne partagez pas un réseau local avec des inconnus. Pour des tâches sensibles sur un réseau inconnu, basculer sur les données mobiles est un choix simple et solide.`,
  },
  {
    topicKey: 'online-tracking',
    title: 'Comment fonctionne le pistage en ligne (cookies, pixels et empreintes)',
    question: 'Comment les entreprises me pistent-elles d’un site à l’autre, et puis-je vraiment l’empêcher ?',
    summary:
      'Les traceurs vous suivent avec des cookies, des pixels espions invisibles et l’empreinte du navigateur pour bâtir un profil d’un site à l’autre. Vous ne pouvez pas devenir invisible, mais quelques choix de navigateur réduisent fortement ce qui est collecté.',
    tags: ['vie privée', 'pistage', 'cookies', 'web'],
    language: 'fr',
    image: {
      prompt: promptOf('online-tracking'),
      alt: 'Une silhouette laissant des empreintes recousues par des objectifs lointains, en partie dispersées',
    },
    sources: [
      { title: 'EFF — Cover Your Tracks (test d’empreinte du navigateur)', url: 'https://coveryourtracks.eff.org/' },
      { title: 'FTC — Protéger votre vie privée en ligne', url: 'https://consumer.ftc.gov/articles/protecting-your-privacy-online' },
    ],
    content: `# Comment fonctionne le pistage en ligne (cookies, pixels et empreintes)

L’essentiel du Web « gratuit » est financé par la publicité, et la publicité ciblée repose sur le fait de savoir qui vous êtes et ce que vous faites. Il existe donc toute une industrie pour vous suivre d’un site à l’autre, en recousant votre activité en un profil. Elle fonctionne grâce à trois techniques principales, chacune plus glissante que la précédente — et les comprendre, c’est ce qui donne du sens aux défenses.

## Les trois techniques principales

**1. Les cookies.** Un cookie est un petit fichier qu’un site stocke dans votre navigateur. Les cookies *propriétaires* (first-party) sont surtout bénins et utiles — ils vous gardent connecté et retiennent votre panier. Le problème de pistage vient des cookies *tiers* (third-party) : quand de nombreux sites différents intègrent tous du contenu du même réseau publicitaire, ce réseau dépose un cookie qu’il reconnaît partout, lui permettant de voir que le même navigateur a visité le site A, puis B, puis C. Cette trace inter-sites est le mécanisme de pistage classique (et celui que les navigateurs sont en train d’éliminer activement).

**2. Les pixels espions.** Une image invisible de 1×1 (ou un fragment de code) chargée depuis le serveur d’un traceur. Le simple fait de la charger — dans une page web *ou un e-mail* — indique au traceur que vous l’avez ouverte, quand, et des détails sur votre appareil. C’est ainsi que les marketeurs savent que vous avez ouvert leur e-mail ou visité une page, sans aucun cookie.

**3. L’empreinte du navigateur.** La plus sournoise. Au lieu de stocker quoi que ce soit sur votre appareil, un site *mesure* la combinaison unique de caractéristiques de votre appareil — taille d’écran, polices, système d’exploitation, version du navigateur, fuseau horaire, particularités graphiques — qui, réunies, sont souvent assez uniques pour vous ré-identifier. Comme rien n’est stocké, effacer les cookies ne l’efface pas.

| Technique | Stocke quelque chose ? | Battue en effaçant les cookies ? |
| --- | --- | --- |
| Cookies tiers | Oui | Oui |
| Pixels espions | Via cookies / journaux serveur | En partie |
| Empreinte | Non | **Non** |

## Ce qui réduit vraiment le pistage

Vous ne pouvez pas être invisible, mais vous pouvez beaucoup réduire votre exposition :

- **Utilisez un navigateur respectueux de la vie privée ou activez la protection contre le pistage** — les navigateurs modernes bloquent les cookies tiers et les traceurs connus par défaut ou en un réglage.
- **Ajoutez un bloqueur de contenu / publicité réputé** — il bloque les scripts traceurs et les pixels avant leur chargement, ce qui accélère aussi les pages.
- **Bloquez les images distantes dans les e-mails** pour déjouer les pixels de suivi d’ouverture (la plupart des applis de messagerie le proposent).
- **Résistez à l’empreinte** avec des navigateurs qui standardisent ou randomisent votre empreinte ; c’est le pistage le plus difficile à arrêter, d’où l’importance de qui fabrique votre navigateur.
- **Réduisez le profil à la source** : limitez la personnalisation publicitaire dans les réglages de votre compte, et soyez économe en connexions qui lient votre activité à une identité réelle.

## FAQ

**Ces bannières « Accepter les cookies » me protègent-elles vraiment ?**
Ce sont des demandes de consentement (imposées par les lois sur la vie privée), pas une protection. « Refuser les non essentiels » aide, mais la vraie réduction vient des réglages du navigateur et des bloqueurs, pas du clic sur les bannières.

**Le mode privé / navigation privée arrête-t-il le pistage ?**
Surtout non. Il empêche *votre navigateur* de conserver l’historique local et les cookies après la session, mais les sites, les traceurs et votre réseau peuvent toujours vous observer pendant, et l’empreinte fonctionne toujours.

**L’empreinte est-elle vraiment impossible à arrêter ?**
Pas impossible, mais difficile — la défense consiste à utiliser un navigateur qui rend délibérément l’empreinte de tout le monde semblable (pour que la vôtre ne ressorte pas). Testez la vôtre sur Cover Your Tracks de l’EFF.`,
  },
  {
    topicKey: 'data-breach-response',
    title: 'Que faire quand vos données sont dans une fuite',
    question: 'Une entreprise que j’utilise a subi une fuite de données — que dois-je réellement faire ?',
    summary:
      'Quand une fuite expose vos données, la priorité est de contenir la réutilisation : changez ce mot de passe partout où il a servi, activez la double authentification et guettez l’hameçonnage qui suit. Ce qu’il faut faire dépend de ce qui a fuité — mot de passe, carte ou données d’identité.',
    tags: ['sécurité', 'vie privée', 'fuite de données', 'sécurité numérique'],
    language: 'fr',
    image: {
      prompt: promptOf('data-breach-response'),
      alt: 'Une petite fuite de coffre contenue méthodiquement à travers les coffres voisins',
    },
    sources: [
      { title: 'FTC — Fuite de données : que faire', url: 'https://www.identitytheft.gov/databreach' },
      { title: 'Have I Been Pwned — vérifiez si vos comptes figurent dans des fuites', url: 'https://haveibeenpwned.com/' },
    ],
    content: `# Que faire quand vos données sont dans une fuite

Les fuites de données sont désormais monnaie courante — si vous utilisez Internet depuis des années, vos informations ont presque certainement figuré dans l’une d’elles. Cela paraît alarmant, mais la plupart des fuites se surmontent avec une réponse calme et ciblée. La clé est d’adapter votre action à **ce qui a réellement fuité**, car un mot de passe, un numéro de carte et des données d’identité divulgués appellent des gestes différents. La panique et l’inaction sont les deux modes d’échec ; une courte liste de contrôle bat les deux.

## D’abord : déterminer ce qui a été exposé

Les notifications de fuite (et les services qui les recensent) indiquent généralement quelles données étaient concernées. L’échelle de gravité, grosso modo :

| Ce qui a fuité | Gravité | Pourquoi |
| --- | --- | --- |
| Adresse e-mail seule | Faible | Surtout davantage de spam / hameçonnage |
| Mot de passe (même haché) | Élevée | La réutilisation met de nombreux comptes en danger |
| Carte de paiement | Moyenne | Les banques annulent la fraude ; les cartes se remplacent |
| Données d’identité (numéros, date de naissance, adresse) | Élevée | Permet l’usurpation d’identité ; impossible à « réinitialiser » |

## La réponse, selon ce qui a fuité

**Si un mot de passe a fuité** (le cas urgent le plus courant) :
1. **Changez-le immédiatement sur le site piraté.**
2. **Changez-le partout où vous l’avez réutilisé** — c’est le vrai danger, car les attaquants essaieront ce couple e-mail/mot de passe sur les banques, les messageries et les boutiques (bourrage d’identifiants). Un gestionnaire de mots de passe rend cela bien moins pénible et prévient la fois suivante.
3. **Activez la double authentification** sur ce compte et sur vos comptes importants.

**Si une carte de paiement a fuité :** surveillez vos relevés, signalez tout débit inconnu (les banques annulent généralement la fraude) et laissez la banque réémettre la carte si besoin. C’est le type de fuite le plus récupérable.

**Si des données d’identité ont fuité** (le plus délicat, puisqu’on ne change pas sa date de naissance) : envisagez un gel du crédit / une alerte à la fraude auprès des organismes là où c’est possible, guettez les comptes ouverts à votre nom, et soyez particulièrement sceptique face aux contacts qui citent vos vraies informations.

## Ensuite : préparez-vous à la deuxième vague

Le risque consécutif sous-estimé, c’est l’**hameçonnage ciblé**. Après une fuite, les criminels savent quelle entreprise vous utilisez et connaissent certaines de vos vraies informations, alors ils envoient des messages convaincants du type « [Entreprise] alerte de sécurité — vérifiez votre compte ». Attendez-vous-y, et appliquez la règle habituelle : ne vous connectez jamais via un lien reçu dans un message — allez directement sur le site. Une fuite fait de vous une cible désignée pendant un temps.

## FAQ

**Comment savoir si je suis dans une fuite ?**
Les entreprises sont souvent légalement tenues de vous prévenir, mais cela vaut la peine de vérifier votre e-mail sur un service de recherche de fuites réputé (comme Have I Been Pwned) et d’activer les alertes de fuite de votre gestionnaire de mots de passe.

**La fuite remonte à des années — dois-je encore agir ?**
Si vous avez depuis rendu ce mot de passe unique et activé la 2FA, vous êtes largement couvert. Si vous *réutilisez encore* ce mot de passe quelque part, changez-le maintenant — les anciens mots de passe fuités sont essayés pendant des années.

**Faut-il payer pour des services de protection contre l’usurpation d’identité ?**
Souvent, les protections de base (gel du crédit, surveillance de vos propres relevés, mots de passe uniques + 2FA) sont gratuites et accomplissent l’essentiel du travail. Les services payants ajoutent du confort, mais ne remplacent pas les fondamentaux.`,
  },
];
