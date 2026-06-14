import type { DraftArticle } from './types';
import { digitalBuyingEn } from './digital-buying.en';

// Batch: Digital Buying Decisions (version française native). Mêmes sujets et
// mêmes topicKey que digital-buying.en.ts, rédigés nativement pour le contexte
// d'achat francophone. Les images sont partagées.

const promptOf = (key: string): string => {
  const hit = digitalBuyingEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const digitalBuyingFr: DraftArticle[] = [
  {
    topicKey: 'oled-vs-lcd',
    title: 'OLED ou LCD : quel écran est vraiment le meilleur ?',
    question: 'Quelle est la vraie différence entre un écran OLED et un écran LCD, et lequel choisir ?',
    summary:
      'L’OLED allume chaque pixel individuellement : noirs parfaits, contraste infini. Le LCD éclaire une couche de cristaux liquides par un rétroéclairage : plus lumineux dans la durée, sans risque de marquage. Le bon choix dépend de la pièce, du contenu et du budget.',
    tags: ['technologie', 'écrans', 'oled', 'achat tv'],
    language: 'fr',
    image: {
      prompt: promptOf('oled-vs-lcd'),
      alt: 'Une dalle à pixels autoémissifs face à une dalle à rétroéclairage uniforme',
    },
    sources: [
      { title: 'RTINGS — méthodologie de comparaison TV OLED vs LED/LCD', url: 'https://www.rtings.com/tv/learn/led-vs-oled' },
    ],
    content: `# OLED ou LCD : quel écran est vraiment le meilleur ?

Toute la différence tient à une seule question : **chaque pixel produit-il sa propre lumière, ou partagent-ils un rétroéclairage ?** Les pixels OLED sont autoémissifs — chacun est une minuscule lampe qui peut s'éteindre complètement. Les pixels LCD ne produisent aucune lumière ; ce sont des volets placés devant un rétroéclairage séparé, qui s'ouvrent et se ferment pour laisser passer la couleur. Chaque force et chaque faiblesse ci-dessous découle de ce seul fait.

## Pourquoi l'OLED a ce rendu

Parce qu'un pixel OLED peut s'éteindre totalement, il produit un **noir parfait** — pas un gris foncé, mais zéro lumière. Placez une étoile brillante juste à côté et le contraste devient pour ainsi dire infini. D'où ce rendu profond, comme tracé à l'encre, en relief, qui fait la réputation de l'OLED, plus une précision pixel par pixel : aucun halo de lumière qui bave autour des objets clairs sur fond sombre (le « blooming » que les LCD combattent). Les pixels changent d'état presque instantanément, offrant une excellente netteté en mouvement.

Les compromis sont tout aussi physiques : l'OLED ne peut pas atteindre la luminosité aveuglante des meilleurs LCD sur un écran entièrement blanc, et comme le matériau organique vieillit à l'usage, afficher le *même* élément statique (un bandeau d'actualités, un logo de chaîne, une barre des tâches) pendant des milliers d'heures risque le **marquage** — un faible fantôme permanent. Les dalles modernes l'atténuent agressivement, et un visionnage varié habituel le déclenche rarement, mais cela reste une vraie considération pour les usages très statiques.

## Pourquoi le LCD persiste (et s'est amélioré)

Le rétroéclairage du LCD peut être brutalement lumineux, ce qui en fait le meilleur choix dans les pièces ensoleillées et pour des hautes lumières HDR percutantes en plein écran. Il ne peut pas subir de marquage, et il est moins cher à toutes les tailles. Sa faiblesse native — des noirs imparfaits, car le rétroéclairage fuit à travers les pixels « fermés » — a été réduite par le **local dimming** : on découpe le rétroéclairage en zones qui s'assombrissent indépendamment. Le Mini-LED pousse plus loin avec des milliers de minuscules zones, approchant le contraste de l'OLED tout en conservant la luminosité du LCD. Plus de zones, meilleurs noirs — mais jamais tout à fait le contrôle pixel par pixel de l'OLED.

## Lequel acheter

| Votre situation | Meilleur choix |
| --- | --- |
| Pièce sombre, films et jeux, amateur de contraste | OLED |
| Pièce lumineuse avec fenêtres et lampes | LCD Mini-LED (la luminosité l'emporte) |
| TV qui affiche un logo de chaîne fixe toute la journée ; PC avec barre des tâches fixe des heures durant | LCD (pas de souci de marquage) |
| Budget serré, ou très grande taille | LCD |
| Vous voulez la meilleure image pixel par pixel, en acceptant d'en prendre soin | OLED |

## Questions fréquentes

**Le marquage est-il toujours rédhibitoire ?**
Pour un visionnage mixte — films, sport, jeux variés — c'est très improbable sur les dalles actuelles, avec leurs protections intégrées. Pour 8 heures par jour de la même interface statique, un LCD est le pari le plus sûr sur le long terme.

**Et le QLED — est-ce un troisième type ?**
Non. Le QLED est un LCD doté d'un film à points quantiques qui améliore couleur et luminosité. Cela reste un LCD rétroéclairé, pas une dalle autoémissive comme l'OLED.

**L'OLED consomme-t-il moins ?**
Cela dépend du contenu : les scènes sombres consomment peu (les pixels éteints ne coûtent rien), mais un écran entièrement clair peut tirer plus qu'un LCD efficace. Il n'y a pas de vainqueur simple.`,
  },
  {
    topicKey: 'noise-cancelling',
    title: 'Comment fonctionnent vraiment les casques à réduction de bruit',
    question: 'Comment fonctionnent les casques antibruit, et quelle est la différence entre réduction active et passive ?',
    summary:
      'La réduction de bruit active capte le son entrant par des micros et diffuse une onde inversée qui l’annule — superbe sur les grondements graves et constants comme les moteurs, faible sur les voix soudaines. L’isolation passive, elle, bloque le son physiquement.',
    tags: ['technologie', 'casques', 'audio', 'réduction de bruit'],
    language: 'fr',
    image: {
      prompt: promptOf('noise-cancelling'),
      alt: 'Une onde sonore dentelée rencontre son image miroir et s’aplatit',
    },
    sources: [
      { title: 'RTINGS — test d’isolation phonique des casques', url: 'https://www.rtings.com/headphones/tests/isolation/noise-isolation' },
    ],
    content: `# Comment fonctionnent vraiment les casques à réduction de bruit

Il existe deux façons complètement différentes de rendre le monde plus silencieux, et la plupart des bons casques utilisent les deux. L'**isolation passive**, c'est de la pure physique : des coussinets et des embouts qui scellent physiquement le son, comme des bouchons d'oreille. La **réduction de bruit active (ANC)**, c'est de l'électronique astucieuse : un micro écoute le bruit qui atteint votre oreille, et le casque génère l'onde sonore *opposée* pour l'annuler. Comprendre qui fait quoi explique pourquoi l'ANC semble magique en avion et inutile contre un bébé qui pleure.

## L'astuce derrière la réduction active

Le son est une onde de pression. Si vous diffusez une seconde onde qui en est l'exacte image miroir — chaque crête face à un creux — les deux s'additionnent en presque rien. C'est l'interférence destructive. Les casques ANC échantillonnent le bruit entrant avec de minuscules micros, calculent l'inverse, et le diffusent par les mêmes transducteurs que votre musique, en temps réel.

Le hic, c'est le *temps*. Le casque doit mesurer, calculer et émettre la contre-onde plus vite que le son ne change. Cela marche à merveille pour un bruit **constant, à basse fréquence, prévisible** — le ronronnement d'un réacteur, le grondement d'un train, le bourdonnement d'une climatisation — où l'instant suivant ressemble au précédent. Cela marche mal pour un son **soudain, à haute fréquence, imprévisible** — une conversation toute proche, un chien qui aboie, une porte qui claque — car le temps que le système réagisse, le son a déjà changé. Voilà pourquoi l'ANC fait taire le rugissement du moteur mais entame à peine le brouhaha de la table d'à côté.

## La répartition des tâches

| Menace | Traitée surtout par | Pourquoi |
| --- | --- | --- |
| Réacteur, train, bourdonnement de clim | Active (ANC) | Grave, constant, prévisible — facile à mettre en miroir |
| Brouhaha de bureau, voix | Scellement passif | Trop rapide / variable pour que l'ANC suive |
| Bruits soudains | Aucun des deux vraiment | Les transitoires imprévisibles battent les deux |
| Vent | Souvent aggravé par l'ANC | Le vent frappe les micros directement, en bruit |

Les hautes fréquences sont en réalité mieux bloquées par un bon scellement *physique* que par l'ANC, ce qui explique pourquoi l'ajustement compte énormément — un scellement qui fuit sabote les deux méthodes.

## Que regarder à l'achat

Priorisez d'abord l'**ajustement et le scellement** (embouts intra-auriculaires adaptés à votre oreille, ou coques supra-auriculaires qui enveloppent entièrement) ; la qualité de l'ANC varie surtout sur la *profondeur dans les graves* et l'*absence de souffle* (l'ANC bon marché ajoute son propre léger bruit blanc) ; et vérifiez la présence d'un **mode transparence** qui utilise les mêmes micros pour faire entrer l'extérieur — utile pour les annonces ou une conversation sans retirer le casque.

## Questions fréquentes

**L'ANC dégrade-t-elle la qualité sonore ?**
Sur les bons casques modernes, de façon négligeable. Sur les modèles bon marché, elle peut ajouter du souffle ou altérer subtilement le timbre. Le fond plus silencieux améliore généralement le détail perçu plus que l'ANC ne le dégrade.

**L'ANC peut-elle abîmer mes oreilles ou donner mal à la tête ?**
L'annulation en elle-même est inoffensive, mais certaines personnes ressentent une sensation de pression due au traitement permanent des basses fréquences. C'est individuel ; le mode transparence ou un autre modèle règle généralement le problème.

**Une ANC chère vaut-elle mieux qu'une bon marché ?**
Pour les grands voyageurs et les usagers du transport quotidien, oui — l'écart sur la réduction des graves et l'absence de souffle est réel. Pour un peu de calme occasionnel, une bonne paire passive bien scellée peut suffire.`,
  },
  {
    topicKey: 'phone-battery-mah',
    title: 'Pourquoi l’autonomie d’un téléphone ne se résume pas aux mAh',
    question: 'Pourquoi deux téléphones avec la même batterie en mAh ont-ils une autonomie totalement différente ?',
    summary:
      'Les mAh ne mesurent que la charge stockée. L’autonomie réelle, c’est cette capacité divisée par la vitesse à laquelle tout la vide — efficacité de la puce, taille et luminosité de l’écran, logiciel, signal. Une plus petite batterie peut donc facilement durer plus longtemps.',
    tags: ['technologie', 'smartphones', 'batterie', 'conseils d’achat'],
    language: 'fr',
    image: {
      prompt: promptOf('phone-battery-mah'),
      alt: 'Un réservoir de lumière alimentant plusieurs consommateurs à des débits différents',
    },
    sources: [
      { title: 'DXOMARK — protocole de test d’autonomie des smartphones', url: 'https://www.dxomark.com/category/smartphone-reviews/' },
    ],
    content: `# Pourquoi l'autonomie d'un téléphone ne se résume pas aux mAh

Deux téléphones annoncent tous deux une batterie de 5 000 mAh, pourtant l'un rend l'âme avant le dîner et l'autre file tranquillement vers un deuxième jour. Le chiffre ne mentait pas — il répond simplement à la mauvaise question. **Les mAh mesurent la taille du réservoir, pas le kilométrage.** L'autonomie, c'est la taille du réservoir *divisée par* la consommation, et la consommation varie énormément d'un téléphone à l'autre. Acheter sur les seuls mAh, c'est choisir une voiture à la taille du réservoir en ignorant le moteur.

## L'équation qui compte vraiment

Grossièrement : **autonomie ≈ capacité ÷ consommation.** La capacité (mAh, plus exactement des wattheures) est un terme. L'autre, c'est tout ce qui la vide :

- **L'efficacité de la puce.** Le procédé de fabrication du processeur (sa finesse en « nanomètres ») influence énormément l'énergie qu'il sirote pour le même travail. Une puce plus récente et plus efficace fait plus par milliampère — parfois de quoi annuler entièrement un écart brut de capacité.
- **L'écran.** Généralement le plus gros poste de consommation. Un écran plus grand, plus lumineux, à plus haute fréquence de rafraîchissement (120 Hz) brûle bien plus qu'un écran plus petit, plus sombre, en 60 Hz. C'est pourquoi les téléphones à grand écran ont besoin de grosses batteries rien que pour s'en sortir.
- **L'optimisation logicielle.** À quel point le système endort les applis en arrière-plan, bride la décharge au repos et gère les réveils peut faire varier considérablement l'endurance sur une journée — le même matériel tient différemment selon que le logiciel est bien réglé ou non.
- **Les radios et le signal.** Un signal cellulaire faible fait « crier » plus fort le téléphone (plus d'énergie) ; la 5G peut tirer plus que la 4G ; la connectivité permanente s'accumule.

## Pourquoi une plus petite batterie l'emporte parfois

Mettez une plus petite batterie derrière une puce efficace, un écran modeste et un logiciel bien réglé, et elle dépasse une plus grosse batterie plombée par un écran gourmand et une optimisation relâchée. Les 4 500 mAh de la fiche technique peuvent réellement battre leur rivale de 5 000 mAh. Le signal honnête, ce n'est pas le chiffre en mAh — c'est le **temps d'écran allumé mesuré par les testeurs indépendants** lors de tests standardisés, qui replie toutes les variables cachées en un seul résultat comparable.

## Que vérifier avant d'acheter

| Ne vous fiez pas à | Fiez-vous plutôt à |
| --- | --- |
| Le seul chiffre en mAh | Le temps d'écran allumé / les scores d'endurance mesurés par les testeurs |
| « Plus grosse batterie = plus d'autonomie » | L'association batterie + efficacité de la puce + écran |
| La puissance du chargeur prise pour « autonomie » | Vitesse de charge et autonomie sont deux choses distinctes |

La vitesse de charge (watts) est elle aussi distincte : un téléphone peut charger vite *et* se vider vite. Ne confondez pas « plein en 30 minutes » avec « tient toute la journée ».

## Questions fréquentes

**Plus de mAh est-il parfois un inconvénient ?**
Les plus grosses batteries ajoutent du poids et de l'épaisseur, et mettent plus longtemps à charger. Passé le « confortablement toute la journée », la capacité supplémentaire perd de sa valeur face à un téléphone plus léger.

**Pourquoi mon autonomie se dégrade-t-elle au bout de quelques années ?**
Les batteries au lithium vieillissent chimiquement, perdant de la capacité maximale à chaque cycle de charge — elles conservent typiquement ~80 % après quelques centaines de cycles complets. Le réservoir rétrécit physiquement avec le temps.

**La 5G nuit-elle vraiment à la batterie ?**
Elle le peut, surtout dans les zones à 5G inégale où le téléphone bascule entre les réseaux. Beaucoup de téléphones permettent de se limiter à la 4G/LTE pour économiser quand la vitesse de la 5G n'est pas nécessaire.`,
  },
  {
    topicKey: 'ssd-vs-hdd',
    title: 'SSD ou disque dur : quelle différence et lequel vous faut-il ?',
    question: 'Quelle est la différence entre un SSD et un disque dur, et lequel choisir ?',
    summary:
      'Un SSD stocke les données dans des puces de mémoire flash, sans pièce mobile — bien plus rapide, silencieux, résistant aux chocs. Un disque dur utilise des plateaux magnétiques — plus lent, mais bien moins cher au téraoctet. L’idéal souvent : SSD pour le système, disque dur pour le volume.',
    tags: ['technologie', 'stockage', 'ssd', 'achat ordinateur'],
    language: 'fr',
    image: {
      prompt: promptOf('ssd-vs-hdd'),
      alt: 'Un stockage à puces statiques face à des plateaux tournants avec bras de lecture',
    },
    sources: [
      { title: 'Backblaze — fiabilité des disques et statistiques de stockage', url: 'https://www.backblaze.com/cloud-storage/resources/hard-drive-test-data' },
    ],
    content: `# SSD ou disque dur : quelle différence et lequel vous faut-il ?

Les deux façons de stocker vos fichiers diffèrent aussi profondément qu'un tourne-disque diffère d'une carte mémoire. Un **disque dur (HDD)** écrit les données magnétiquement sur des plateaux tournants, lus par un bras physique qui pivote au bon endroit — comme un minuscule tourne-disque ultra-rapide. Un **SSD (disque à semi-conducteurs)** stocke les données sous forme de charge électrique dans des puces de mémoire flash, **sans aucune pièce mobile**. Ce clivage mécanique contre électronique produit chacune des différences qui suivent.

## Vitesse : l'écart que vous sentez tous les jours

Un SSD n'a rien à déplacer physiquement, il trouve et livre donc les données presque instantanément. Un disque dur doit attendre que le plateau tourne au bon endroit et que le bras atteigne la bonne piste — des millisecondes qui s'accumulent sur les milliers de minuscules lectures qu'un ordinateur effectue rien que pour démarrer ou ouvrir une appli. En pratique :

- **Temps de démarrage :** quelques secondes en SSD contre une minute ou plus en disque dur.
- **Ouverture des applis et fichiers :** quasi instantanée contre une latence perceptible.
- **Accès aléatoire** (petits fichiers éparpillés — ce qu'est réellement l'informatique du quotidien) : les SSD sont radicalement, souvent 10 à 100× plus rapides.

Installer un SSD dans un vieil ordinateur est la mise à niveau de vitesse la plus spectaculaire qui existe — elle rajeunit une machine plus que n'importe quel autre changement.

## Les compromis

| Propriété | SSD | Disque dur |
| --- | --- | --- |
| Vitesse | Très rapide | Bien plus lent |
| Prix au téraoctet | Plus élevé | Bien moins cher — meilleur rapport pour le volume |
| Pièces mobiles | Aucune | Oui — vulnérable aux chutes / chocs |
| Bruit et chaleur | Silencieux, froid | Rotation audible, plus de chaleur |
| Plafond de capacité (grand public) | Grand, plus coûteux en haut de gamme | Plus grandes capacités les moins chères |
| Mode de panne | Souvent soudain, électronique | Donne souvent des bruits d'alerte |

Les disques durs gardent un avantage décisif sur le **coût au téraoctet**, ce qui explique que le stockage de masse — grandes médiathèques, sauvegardes, archives — reste leur bastion. Les SSD l'emportent partout où la vitesse ou la robustesse compte.

## La réponse pratique pour la plupart des gens

Utilisez les deux, par rôle :

- **SSD pour le système d'exploitation et les applis / fichiers actifs** — c'est ce qui rend l'ordinateur « rapide ».
- **Disque dur (ou cloud) pour les archives volumineuses** — vidéos, photothèques, sauvegardes que vous n'ouvrez pas tous les jours.

Si un appareil n'a de place que pour un seul (la plupart des portables, tous les téléphones), faites-en un SSD — la vitesse vaut le prix au gigaoctet, et vous déchargez le volume vers le stockage externe ou le cloud. Pour les SSD, notez aussi l'*interface* : les SSD NVMe (PCIe) sont plusieurs fois plus rapides que les anciens SSD SATA, même si, pour un usage général, même un SSD SATA paraît instantané face à n'importe quel disque dur.

## Questions fréquentes

**Lequel dure le plus longtemps / est le plus fiable ?**
Les deux sont fiables aujourd'hui. Les SSD n'ont aucune pièce à user mécaniquement mais ont un nombre fini d'écritures (bien au-delà d'un usage normal). Les disques durs peuvent être tués par une chute. Pour la longévité, ce qui compte le plus, c'est d'avoir une sauvegarde — n'importe quel disque seul peut tomber en panne.

**Les SSD s'usent-ils à force d'écritures ?**
Il y a une limite d'écriture, mais pour un utilisateur courant elle est en pratique inatteignable durant la vie utile du disque. Seules les lourdes charges d'écriture professionnelles sont une vraie préoccupation.

**Un SSD plus cher est-il toujours plus rapide ?**
Pas toujours de façon perceptible — au-delà d'un certain point, les vitesses NVMe dépassent ce que les tâches quotidiennes peuvent exploiter. La capacité et la fiabilité vous importent souvent plus que les pics de benchmark.`,
  },
  {
    topicKey: 'megapixels-myth',
    title: 'Plus de mégapixels, est-ce vraiment un meilleur appareil photo ?',
    question: 'Davantage de mégapixels font-ils un meilleur appareil photo, et qu’est-ce qui compte vraiment pour la qualité ?',
    summary:
      'Les mégapixels ne fixent que la taille d’impression ou de recadrage possible — passé un seuil, en accumuler sur un petit capteur peut même nuire. Taille du capteur, qualité de l’objectif et traitement d’image comptent bien plus pour les photos que vous voyez réellement.',
    tags: ['technologie', 'appareils photo', 'photographie', 'smartphones'],
    language: 'fr',
    image: {
      prompt: promptOf('megapixels-myth'),
      alt: 'Un grand capteur captant beaucoup de lumière face à un minuscule en captant peu',
    },
    sources: [
      { title: 'DXOMARK — tests de qualité d’image appareils et smartphones', url: 'https://www.dxomark.com' },
    ],
    content: `# Plus de mégapixels, est-ce vraiment un meilleur appareil photo ?

Le marketing adore les mégapixels parce que c'est un seul grand chiffre qui sonne comme « plus ». Mais les mégapixels ne répondent qu'à une question étroite — **combien de points composent l'image** — et cette question a cessé de compter pour la plupart des gens il y a des années. Une photo de 12 mégapixels contient déjà assez de détail pour une impression format affiche ou pour remplir n'importe quel écran que vous possédez. Ce qui rend réellement une photo belle vit ailleurs.

## Ce que les mégapixels contrôlent et ne contrôlent pas

Les mégapixels déterminent la **résolution** : la taille d'impression possible, ou jusqu'où vous pouvez recadrer avant que l'image ne se pixellise. C'est tout. Ils ne disent rien de la couleur, de l'aptitude en basse lumière, de la netteté, ni de cette qualité difficile à nommer qui fait qu'une photo « accroche ».

Pire, sur un petit capteur, *plus* de mégapixels peut se retourner contre vous. Entassez plus de pixels sur la même puce minuscule et chaque pixel devient plus petit, captant moins de lumière — d'où plus de grain dans les scènes sombres. C'est pourquoi un téléphone de 12 Mpx peut prendre des photos de nuit plus propres qu'un de 48 Mpx : des pixels plus grands, plus de lumière chacun. (Les téléphones modernes ripostent par le « pixel binning » — fusionner plusieurs petits pixels en un pixel virtuel plus grand en basse lumière, troquant de fait la résolution contre la propreté.)

## Ce qui détermine vraiment la qualité

| Facteur | Pourquoi ça compte | Effet en clair |
| --- | --- | --- |
| **Taille du capteur** | Plus grand = plus de lumière totale captée | Le facteur matériel n°1 ; meilleure basse lumière, plus joli flou d'arrière-plan |
| **Qualité de l'objectif** | Netteté, ouverture (lumière admise), distorsion | Un grand capteur derrière un mauvais objectif est gâché |
| **Traitement d'image** | Le logiciel transforme la lumière brute en rendu final | Souvent le facteur décisif sur les téléphones |
| **Taille des pixels** | Des pixels plus grands captent plus de lumière chacun | Images plus propres dans le noir |
| Mégapixels | Résolution / marge de recadrage seulement | Ne compte qu'au-delà des grandes impressions ou d'un recadrage important |

Le fait matériel le plus important, c'est la **taille du capteur** : voilà pourquoi un appareil professionnel « seulement » à 24 Mpx démolit un téléphone à 108 Mpx — son capteur est bien des fois plus grand et capte énormément plus de lumière. Et sur les téléphones surtout, le **traitement** (photographie computationnelle) peut compter plus que n'importe quelle spécification, ce qui explique que deux téléphones aux capteurs identiques produisent des photos visiblement différentes.

## Comment juger réellement un appareil

Ignorez la manchette des mégapixels. Regardez plutôt la **taille du capteur** (souvent indiquée comme une fraction du type 1/1,3" ; plus grand est mieux), examinez les **photos d'exemple et les tests indépendants** — surtout en basse lumière et au zoom — et pesez **les fonctions que vous utiliserez** (stabilisation, ultra grand-angle, vrai zoom vs zoom numérique). Les photos elles-mêmes, prises par les testeurs en conditions réelles, vous disent tout ce que la fiche technique cache.

## Questions fréquentes

**Les téléphones à très haute résolution sont-ils donc une arnaque ?**
Non — un nombre élevé aide réellement si vous recadrez beaucoup ou voulez la souplesse du pixel binning. Ce n'est simplement pas la preuve de qualité que le chiffre laisse croire.

**Pourquoi les appareils pro ont-ils moins de mégapixels que les téléphones ?**
Parce qu'ils privilégient de grands pixels sur de grands capteurs plutôt que le nombre brut de pixels. La qualité par pixel l'emporte sur la quantité pour presque tous les usages.

**Plus de zoom sur la boîte signifie-t-il un meilleur zoom ?**
Méfiez-vous du *numérique* contre l'*optique*. Le zoom optique (vraie magnification par l'objectif) préserve la qualité ; le zoom numérique se contente de recadrer et d'agrandir, ce que n'importe quel nombre de mégapixels peut feindre. Le « zoom 100× » est surtout numérique et surtout de la bouillie.`,
  },
  {
    topicKey: 'wifi-vs-bandwidth',
    title: 'Pourquoi votre forfait internet rapide paraît quand même lent',
    question: 'Pourquoi mon WiFi est-il lent alors que je paie un forfait internet rapide ?',
    summary:
      'La vitesse achetée, c’est le tuyau qui entre chez vous ; le WiFi, c’est la façon dont elle parcourt les derniers mètres — et c’est là que vit le plus gros de la lenteur. Distance, murs, interférences, matériel ancien et appareils trop nombreux brident la vitesse réelle bien en dessous du forfait.',
    tags: ['technologie', 'wifi', 'internet', 'réseau'],
    language: 'fr',
    image: {
      prompt: promptOf('wifi-vs-bandwidth'),
      alt: 'Un large tuyau de lumière se rétrécissant en ondes sans fil affaiblies à travers les murs',
    },
    sources: [
      { title: 'FCC — guide consommateur sur le débit haut débit', url: 'https://www.fcc.gov/consumers/guides/getting-broadband-qa' },
    ],
    content: `# Pourquoi votre forfait internet rapide paraît quand même lent

Vous payez pour « 300 mégabits », mais la vidéo met en mémoire tampon et les pages se traînent. Le forfait ne ment probablement pas — le goulot d'étranglement est presque toujours *après* l'entrée d'internet chez vous. Voyez cela comme deux trajets distincts : la **vitesse du forfait** est le large tuyau qui arrive à votre bâtiment ; le **WiFi** est le parcours des derniers mètres dans l'air jusqu'à votre appareil. Ce dernier saut, invisible, crée le plus gros de la lenteur réelle et n'est presque jamais mis en avant.

## Les deux trajets, séparés

Le chiffre sur votre facture décrit la connexion jusqu'à votre domicile (souvent un lien filaire jusqu'au routeur). À partir du routeur, vos appareils se connectent généralement en **WiFi** — des ondes radio — et les ondes radio sont fragiles. Elles s'affaiblissent avec la distance, sont absorbées par les murs (surtout béton, brique, métal et eau — y compris l'eau du corps humain), et se disputent les mêmes ondes avec les voisins et les appareils. Un forfait de 300 Mbit/s peut livrer 300 à un appareil branché par câble, mais seulement 40 à un téléphone deux pièces et trois murs plus loin.

## Les coupables habituels, classés

| Cause | Ce qu'elle fait | Solution |
| --- | --- | --- |
| **Distance et murs** | Le signal s'affaiblit vite à travers les obstacles | Rapprochez-vous ; placez le routeur central et en hauteur |
| **Routeur ancien** | Ne peut pas délivrer les débits modernes même si le forfait le peut | Passez au WiFi actuel (WiFi 6/6E/7) |
| **Bande 2,4 vs 5 GHz** | 2,4 GHz porte loin mais lentement ; 5 GHz rapide mais court | 5 GHz de près, 2,4 GHz pour la portée |
| **Ondes encombrées** | Voisins / micro-ondes / Bluetooth interfèrent | 5 GHz, ou changez de canal |
| **Trop d'appareils** | Tous partagent l'attention d'un seul routeur | Système mesh ; câblez les gros consommateurs |
| **L'envoi du forfait** | Souvent bien plus faible que la réception | Vérifiez si l'envoi (appels, sauvegardes) est le point douloureux |

La solution unique la plus courante, c'est simplement le **placement du routeur** : central, surélevé, à découvert — pas dans un placard, une cave ou derrière la télé. La radio déteste les coins et les enceintes fermées.

## Quand le forfait est réellement la limite

Parfois, vous avez *bel et bien* dépassé le forfait : de nombreuses personnes en visio et en flux 4K en même temps peuvent réellement saturer un petit forfait. Mais testez avant de passer à l'offre supérieure — lancez un test de débit **branché par câble** à côté du routeur (votre vraie vitesse de forfait) puis de nouveau **en WiFi là où vous l'utilisez vraiment** (votre expérience réelle). Si le test filaire atteint le forfait mais pas le WiFi, payer un forfait plus rapide n'aidera pas ; corriger le WiFi, oui.

## Questions fréquentes

**Un forfait plus rapide réglera-t-il un WiFi lent ?**
Généralement non. Si le WiFi est le goulot d'étranglement, un tuyau plus large vers la maison arrive simplement au même dernier saut étroit. Corrigez d'abord le WiFi.

**Système mesh ou répéteur WiFi ?**
Un système mesh (plusieurs unités coordonnées) bat en général un simple répéteur, qui divise souvent le débit par deux et crée un réseau séparé plus faible. Pour les grands logements, le mesh est la réponse moderne.

**Câbler les appareils a-t-il encore un intérêt ?**
Oui — un câble (Ethernet) donne le débit complet et stable, sans interférence. Pour un ordinateur de bureau, une console ou une télé qui ne bougent pas, le câbler est la mise à niveau la plus fiable qui soit.`,
  },
  {
    topicKey: 'fast-charging',
    title: 'La charge rapide abîme-t-elle votre batterie ?',
    question: 'La charge rapide endommage-t-elle la batterie de mon téléphone, et comment charger pour la faire durer ?',
    summary:
      'La charge rapide ajoute un peu de chaleur et de stress, mais les téléphones modernes la gèrent avec soin : l’impact quotidien reste modéré. Ce qui vieillit le plus une batterie, c’est la chaleur et le maintien à 100 % — les habitudes comptent plus que la vitesse de charge.',
    tags: ['technologie', 'batteries', 'charge', 'smartphones'],
    language: 'fr',
    image: {
      prompt: promptOf('fast-charging'),
      alt: 'Une batterie se remplissant vite de lumière, maintenue au frais dans une zone sûre',
    },
    sources: [
      { title: 'Battery University — comment vieillissent les batteries lithium-ion', url: 'https://batteryuniversity.com/article/bu-808-how-to-prolong-lithium-based-batteries' },
    ],
    content: `# La charge rapide abîme-t-elle votre batterie ?

Réponse courte : **la charge rapide cause une usure supplémentaire, mais bien moindre que ne le craint internet — et bien moindre que la chaleur.** Les téléphones modernes ne déversent pas l'énergie aveuglément ; ils orchestrent la charge avec soin, et les pires ennemis de la longévité d'une batterie se révèlent être des choses que la plupart des gens ignorent. Pour comprendre pourquoi, il faut savoir comment vieillit une batterie au lithium.

## Comment vieillissent les batteries au lithium

Une batterie lithium-ion s'use par deux mécanismes : le **vieillissement par cycles** (chaque charge-décharge complète réduit peu à peu la capacité maximale) et le **vieillissement calendaire** (dégradation chimique dans le temps, accélérée par la chaleur et par le maintien à charge élevée). Deux conditions la punissent le plus :

- **La chaleur.** Le principal accélérateur. La température élevée accélère les réactions chimiques qui dégradent la cellule. Une batterie chaude vieillit vite, peu importe comment elle a chauffé.
- **Les niveaux de charge extrêmes.** Rester pleine à 100 % (surtout en étant chaude) stresse la batterie, tout comme la vider à 0 %. Le doux milieu (environ 20–80 %) est là où le lithium est le plus heureux.

La charge rapide compte surtout parce qu'elle *génère de la chaleur* — mais la quantité qui atteint réellement la cellule dépend entièrement de la conception du téléphone.

## Pourquoi la charge rapide moderne est globalement sans souci

Les téléphones ne sont pas passifs. Ils gèrent activement la charge :

- **La vitesse n'est pas constante.** La charge rapide est la plus rapide quand la batterie est presque vide, puis ralentit délibérément en se remplissant — l'essentiel de la vitesse affichée « 0–50 % en 20 minutes » se produit dans la plage basse sûre, en s'estompant près du haut.
- **La gestion thermique freine la chaleur.** Le téléphone surveille la température et réduit la puissance de charge (ou met en pause) s'il chauffe trop.
- **Les fonctions de santé de la batterie.** Beaucoup de téléphones apprennent désormais votre routine et restent à 80 % toute la nuit, finissant à 100 % juste avant votre réveil — minimisant le temps passé sous le stress de la pleine charge.

Ainsi, la charge rapide conçue par le fabricant et livrée avec votre téléphone est pensée pour maintenir la cellule dans des limites sûres. Sur un téléphone bien conçu, la différence de perte de capacité au quotidien entre charge rapide et charge lente est réelle, mais modérée.

## Des habitudes qui comptent plus que la vitesse de charge

| Bon pour la batterie | Mauvais pour la batterie |
| --- | --- |
| La garder au frais | Charger / jouer jusqu'à la surchauffe ; soleil, voitures chaudes |
| Vivre grosso modo entre 20 et 80 % | Le 100 % permanent (ou la vider à 0 %) |
| Utiliser des chargeurs de qualité / officiels | Chargeurs bon marché non certifiés |
| Activer la « charge optimisée » | Charger sous un oreiller (piège à chaleur) |

Remarquez que la *vitesse* de charge n'apparaît quasiment pas — **la température et le niveau de charge dominent**. S'inquiéter de la charge rapide tout en jouant sur un téléphone brûlant à 100 % toute la nuit, c'est filtrer le moustique et avaler le chameau.

## Questions fréquentes

**Dois-je éviter la charge rapide pour préserver ma batterie ?**
Pas nécessaire sur un téléphone conçu pour. Si vous voulez être doux, chargez lentement la nuit en mode charge optimisée, et réservez la charge rapide aux appoints express.

**Est-ce mauvais de laisser mon téléphone charger toute la nuit ?**
Moins qu'avant — les téléphones cessent de tirer du courant à 100 % et beaucoup retardent le dernier remplissage. Le léger inconvénient, ce sont les heures passées à 100 % ; les fonctions de charge optimisée répondent précisément à cela.

**Les chargeurs rapides tiers abîment-ils la batterie ?**
Des chargeurs certifiés et réputés qui correspondent à la norme de votre téléphone sont sans problème. Le risque vient des modèles bon marché non certifiés à mauvaise régulation — une fausse économie pour un appareil coûteux.`,
  },
  {
    topicKey: 'refresh-rate',
    title: 'Qu’est-ce que la fréquence de rafraîchissement, et le 120 Hz en vaut-il la peine ?',
    question: 'Que signifie la fréquence de rafraîchissement (Hz) d’un écran, et un écran 120 Hz vaut-il le surcoût ?',
    summary:
      'La fréquence de rafraîchissement, c’est le nombre de fois par seconde où l’écran se redessine — le 120 Hz se met à jour deux fois plus souvent que le 60 Hz, rendant mouvement et défilement visiblement plus fluides. Un vrai plus pour le jeu et le ressenti, mais qui coûte en batterie et en argent.',
    tags: ['technologie', 'écrans', 'fréquence de rafraîchissement', 'jeu vidéo'],
    language: 'fr',
    image: {
      prompt: promptOf('refresh-rate'),
      alt: 'Un point mobile montré en étapes espacées face à une traînée fluide et dense',
    },
    sources: [
      { title: 'RTINGS — test de fréquence de rafraîchissement et de mouvement des moniteurs', url: 'https://www.rtings.com/monitor/tests/motion/refresh-rate-and-motion-blur' },
    ],
    content: `# Qu'est-ce que la fréquence de rafraîchissement, et le 120 Hz en vaut-il la peine ?

La fréquence de rafraîchissement, mesurée en hertz (Hz), c'est simplement **le nombre de fois par seconde où l'écran redessine son image.** Un écran 60 Hz se rafraîchit 60 fois par seconde ; un écran 120 Hz, 120 fois. Puisque tout mouvement à l'écran est en réalité un folioscope d'images fixes, plus de rafraîchissements par seconde signifie des sauts plus petits entre elles — ce que votre œil lit comme un mouvement plus fluide. C'est l'une des rares spécifications dont vous sentez le bénéfice instantanément, même sans pouvoir le nommer.

## Pourquoi plus de rafraîchissements paraît plus fluide

Imaginez un objet traversant l'écran. À 60 Hz, l'écran montre sa position 60 fois le long du trajet ; à 120 Hz, 120 fois — chaque pas est donc deux fois plus petit, et le mouvement paraît plus continu, moins saccadé. L'effet est le plus évident dans trois situations du quotidien :

- **Le défilement** de texte et de pages web — fluide et lisible en mouvement, au lieu d'un glissement flou.
- **Le jeu** — l'action rapide paraît fluide, et (avec le matériel pour l'alimenter) peut sembler plus réactive.
- **L'interface générale** — animations, balayages et transitions paraissent simplement « plus agréables », une qualité que les gens remarquent aussitôt sur un téléphone haut de gamme, même sans savoir pourquoi.

Une fois habitué au 120 Hz, le 60 Hz peut paraître subtilement saccadé — un classique « on ne peut plus l'ignorer ».

## Les pièges

| Bénéfice | Coût |
| --- | --- |
| Mouvement et défilement plus fluides | Prix plus élevé |
| Sensation de jeu plus réactive | Consomme plus de batterie (téléphones) |
| Ressenti quotidien premium | Exige du contenu / matériel capable de produire les images |

Deux mises en garde honnêtes. D'abord, la **batterie** : rafraîchir deux fois plus souvent coûte de l'énergie, c'est pourquoi beaucoup de téléphones proposent un rafraîchissement « adaptatif » qui descend à des fréquences basses pour le contenu statique et ne monte que lorsque c'est nécessaire. Ensuite, **il faut des images à montrer** : un écran 120 Hz n'aide que si quelque chose produit 120 images par seconde. Un jeu tournant à 45 images par seconde ne remplit pas un écran 120 Hz ; une photo fixe paraît identique à n'importe quelle fréquence. L'écran est le *plafond*, pas une garantie.

## Cela en vaut-il la peine ?

| Vous êtes… | Verdict |
| --- | --- |
| Un joueur (PC ou console) | Oui — l'une des mises à niveau les plus ressenties |
| Un acheteur de téléphone qui valorise le « ressenti » | Oui — la fluidité du défilement et de l'interface est constante |
| À budget serré, surtout pour de la vidéo | Priorité moindre — le film est à ~24 i/s et n'en profite guère |
| Obsédé par l'autonomie | Utilisez le mode adaptatif, ou pesez le compromis |

Pour la plupart des acheteurs de téléphones haut de gamme et de configurations de jeu, le 120 Hz est une amélioration réelle, ressentie au quotidien. Pour un appareil d'entrée de gamme surtout utilisé pour la vidéo et la messagerie, l'argent est souvent mieux dépensé ailleurs (luminosité, batterie, stockage).

## Questions fréquentes

**L'œil humain perçoit-il seulement au-delà de 60 Hz ?**
Oui — la plupart des gens perçoivent clairement le gain de fluidité jusqu'à 120 Hz, surtout en mouvement et au défilement. Les bénéfices continuent au-delà pour le jeu rapide, avec des rendements décroissants.

**Un écran 120 Hz rend-il les films meilleurs ?**
Pas vraiment — la plupart des films sont masterisés à ~24 i/s, donc ils paraissent identiques. Le bénéfice est dans le contenu interactif et le défilement, pas dans la vidéo passive.

**144 Hz, 240 Hz — cela vaut-il mieux que le 120 ?**
Pour le jeu compétitif, le surcroît de fluidité et de réactivité aide, avec des rendements décroissants. Pour les téléphones et l'usage général, le 120 Hz capte déjà l'essentiel du bénéfice.`,
  },
  {
    topicKey: 'ram-explained',
    title: 'De combien de RAM avez-vous réellement besoin ?',
    question: 'À quoi sert la RAM, et de combien ai-je vraiment besoin dans un téléphone ou un portable ?',
    summary:
      'La RAM est l’espace de travail à court terme de votre appareil — elle garde ce que vous utilisez activement pour que le processeur l’atteigne instantanément. Plus il y en a, plus vous jonglez à la fois ; au-delà, elle reste inactive. Ni stockage, ni multiplicateur de vitesse.',
    tags: ['technologie', 'ordinateurs', 'ram', 'conseils d’achat'],
    language: 'fr',
    image: {
      prompt: promptOf('ram-explained'),
      alt: 'Un bureau lumineux d’éléments actifs à côté d’une armoire de stockage fermée',
    },
    sources: [
      { title: 'Crucial — de combien de RAM avez-vous besoin (guide mémoire)', url: 'https://www.crucial.com/articles/about-memory/how-much-ram-do-i-need' },
    ],
    content: `# De combien de RAM avez-vous réellement besoin ?

La RAM (mémoire vive) est la spécification la plus mal comprise de l'informatique, car on la confond sans cesse avec le stockage. Voici le modèle mental propre : **le stockage est votre classeur ; la RAM est votre bureau.** Le classeur (SSD / disque dur) contient tout, même éteint. Le bureau (RAM) ne contient que ce sur quoi vous *travaillez activement en ce moment*, là où le processeur peut s'en saisir instantanément. Un bureau plus grand permet de garder plus de choses ouvertes à la fois — c'est là tout le rôle de la RAM.

## Ce que fait réellement la RAM

Quand vous ouvrez une appli, le système la charge depuis le stockage lent vers le « bureau » rapide qu'est la RAM, pour que le processeur la traite à pleine vitesse. Chaque appli active, chaque onglet de navigateur, le système d'exploitation lui-même — tout occupe de la place sur le bureau. Quand le bureau se remplit, le système se met à renvoyer des choses vers le stockage lent pour faire de la place, et *ce* va-et-vient est ce que vous ressentez comme un ralentissement : applis qui se rechargent quand vous y revenez, saccades sous de nombreux onglets. Plus de RAM signifie que plus de choses restent ouvertes et instantanément disponibles — sans réorganisation.

Deux choses que la RAM **n'est pas** : ce n'est pas du stockage (elle oublie tout une fois éteinte — c'est un espace de travail, pas un coffre-fort), et ce n'est pas un simple multiplicateur de vitesse. Dépasser ce que votre usage consomme n'apporte **aucun bénéfice** — une partie vide du bureau ne vous fait pas travailler plus vite. Le gain d'ajouter de la RAM n'est réel que jusqu'au point où vous cessez d'en manquer.

## Des quantités raisonnables (au milieu des années 2020)

| Usage | RAM confortable |
| --- | --- |
| Léger : web, e-mail, vidéo, documents de base | 8 Go (utilisable, ça commence à serrer) |
| Courant : nombreux onglets, bureautique, multitâche léger | 16 Go — le juste milieu actuel |
| Lourd : grands jeux de données, machines virtuelles, applis créatives pro | 32 Go et plus |
| Jeu sérieux | 16 à 32 Go |
| Téléphones | 8 Go suffisent amplement à la plupart ; 12 Go offrent une marge confortable |

Pour la plupart des acheteurs de portables, **16 Go sont le choix par défaut malin** — assez pour multitâcher librement pendant des années sans surpayer une capacité que vous ne toucherez jamais. 8 Go conviennent encore pour un usage léger mais paraissent de plus en plus à l'étroit ; 32 Go ne justifient leur coût que sous des charges réellement exigeantes.

## Une note sur les téléphones

La RAM des téléphones fonctionne de façon similaire mais est gérée plus agressivement par le système, qui suspend les applis en arrière-plan pour faire de la place. Au-delà d'une quantité confortable, plus de RAM ne fait surtout que garder plus d'applis « gelées » en arrière-plan — agréable, mais avec des rendements décroissants. Les « 16 Go » accrocheurs de certains téléphones dépassent de loin ce dont le logiciel mobile a typiquement besoin ; c'est souvent plus de l'esbroufe de fiche technique qu'un bénéfice ressenti.

## Questions fréquentes

**Plus de RAM accélérera-t-elle mon ordinateur lent ?**
Seulement si vous en manquez réellement (va-et-vient disque constant, applis qui se rechargent). Si vous avez de la marge, le goulot est ailleurs — souvent un vieux disque dur, où un SSD est la vraie solution.

**Une RAM plus rapide (MHz plus élevés) en vaut-elle la peine ?**
Pour la plupart des utilisateurs, marginalement — la capacité (assez de Go) importe bien plus que la vitesse. La vitesse aide certaines charges (quelques jeux, graphiques intégrés) mais ne transformera pas l'usage général.

**Puis-je ajouter de la RAM plus tard ?**
Sur beaucoup d'ordinateurs de bureau et certains portables, oui ; sur les téléphones, les portables fins et les conceptions soudées, non — la quantité achetée est définitive. Quand ce n'est pas évolutif, achetez un peu plus de marge que votre besoin du jour.`,
  },
  {
    topicKey: 'usb-c-confusion',
    title: 'Pourquoi les câbles USB-C sont-ils si déroutants ?',
    question: 'Pourquoi les câbles USB-C se comportent-ils si différemment alors qu’ils sont tous identiques ?',
    summary:
      'L’USB-C n’est que la forme de la fiche — pas ce qu’il y a à l’intérieur. Deux câbles d’aspect identique peuvent différer énormément en puissance de charge, vitesse de données et prise en charge vidéo, car le standard du connecteur et ses capacités sont deux choses distinctes.',
    tags: ['technologie', 'usb-c', 'câbles', 'conseils d’achat'],
    language: 'fr',
    image: {
      prompt: promptOf('usb-c-confusion'),
      alt: 'Des connecteurs d’aspect identique révélant un câblage interne très différent',
    },
    sources: [
      { title: 'USB Implementers Forum — aperçu de l’USB-C et de la certification', url: 'https://www.usb.org/usb-c' },
    ],
    content: `# Pourquoi les câbles USB-C sont-ils si déroutants ?

La vérité exaspérante à propos de l'USB-C, c'est que **le connecteur n'est qu'une forme.** Cette fiche ovale et réversible ne vous dit rien de ce que le câble peut réellement *faire* — seulement qu'il entrera dans le port. Deux câbles d'aspect identique, au toucher identique, mais aux prix radicalement différents, peuvent avoir des capacités complètement différentes à l'intérieur. L'industrie a normalisé la fiche, mais pas les pouvoirs derrière elle, et cet écart est la source entière de la confusion.

## Une forme, de multiples capacités cachées

Voyez l'USB-C comme une porte normalisée par laquelle des choses très différentes peuvent passer. Derrière des portes identiques, un câble donné peut prendre en charge :

- **La puissance de charge** — d'un filet (juste assez pour un téléphone) à de quoi alimenter un portable et au-delà. Les câbles haute puissance ont un câblage interne plus épais ; un câble fin « charge seule » peut tout simplement refuser d'alimenter un portable.
- **La vitesse de données** — de l'ancien et lent USB 2.0 aux débits modernes fulgurants. Un câble qui charge très bien peut transférer des fichiers à une allure d'escargot, car données et énergie empruntent des fils internes différents.
- **La sortie vidéo** — certains câbles USB-C transportent un signal d'affichage (vers un moniteur) et d'autres tout simplement pas, sans aucun signe extérieur de la différence.

Ainsi, le câble bon marché du tiroir peut charger parfaitement votre téléphone mais ne pas réussir à piloter un moniteur ni à transférer des fichiers rapidement — non pas cassé, juste conçu pour en faire moins.

## Pourquoi en est-on arrivé là

L'USB-C a délibérément fait passer de nombreuses fonctions possibles par un seul connecteur universel, pour remplacer l'ancienne jungle de fiches incompatibles. L'avantage, c'est un seul port pour tout ; l'inconvénient, c'est qu'« avoir une fiche USB-C » ne renseigne plus sur les capacités — elles dépendent des standards sous-jacents (et des fils) que le câble et les appareils implémentent réellement. La dénomination a aggravé les choses : les standards de données derrière le port ont été renommés à répétition, si bien que même les étiquettes sèment la confusion.

## Comment éviter de se faire avoir

| Pour… | Recherchez |
| --- | --- |
| Charger un portable / appareil haute puissance | Un câble certifié pour la puissance voulue (ex. 100 W / 240 W) ; des câbles épais de qualité |
| Transférer des fichiers vite | La spécification de données (ex. « USB 3.2 / USB4 / 10–40 Gbit/s »), pas seulement « USB-C » |
| Connecter à un moniteur | Une prise en charge vidéo explicite (« DisplayPort Alt Mode » / Thunderbolt) |
| Simplement jouer la sécurité | Marques réputées, câbles certifiés ; gardez le câble fourni avec l'appareil et étiquetez-le |

Deux habitudes pratiques épargnent le plus de soucis : **étiqueter les bons câbles** (celui qui charge votre portable n'est pas interchangeable avec le bonus fourni avec des écouteurs), et **acheter des câbles certifiés de marques réputées** — les câbles haute puissance non certifiés sont aussi une vraie question de sécurité, pas seulement de performance.

## Questions fréquentes

**Pourquoi mon téléphone charge-t-il lentement avec un câble et vite avec un autre ?**
Le câble lent prend probablement en charge moins de puissance, ou n'a pas les fils pour la négociation de charge rapide. La vitesse de charge dépend du câble, du chargeur *et* du téléphone, tous d'accord sur un même standard rapide.

**Thunderbolt est-il la même chose que l'USB-C ?**
Thunderbolt utilise le connecteur USB-C mais c'est un surensemble haut de gamme — débits maximaux, vidéo et données garanties. Tous les ports Thunderbolt sont de forme USB-C ; tous les ports USB-C ne sont pas Thunderbolt.

**Un mauvais câble peut-il endommager mon appareil ?**
Un câble haute puissance mal fabriqué et non certifié peut être un vrai danger. Les câbles certifiés réputés disposent des circuits de sécurité pour négocier correctement la puissance — un petit surcoût qui en vaut la peine sur tout ce qui transporte une puissance sérieuse.`,
  },
];
