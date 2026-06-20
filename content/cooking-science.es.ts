import type { DraftArticle } from './types';
import { cookingScienceEn } from './cooking-science.en';

// Batch: Cooking Science (versión nativa en español). Mismos temas y topicKeys
// que cooking-science.en.ts; el contenido está redactado de forma nativa para
// lectores hispanohablantes. Las imágenes se comparten por topicKey.

const promptOf = (key: string): string => {
  const hit = cookingScienceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const cookingScienceEs: DraftArticle[] = [
  {
    topicKey: 'maillard-reaction',
    title: 'Por qué dorar la comida la hace tan sabrosa: la reacción de Maillard',
    question: '¿Por qué la comida sellada, asada o tostada sabe mucho mejor que la hervida?',
    summary:
      'La reacción de Maillard es la química del dorado: cuando el calor hace reaccionar aminoácidos y azúcares, se crean cientos de compuestos nuevos de sabor y aroma. Por eso un filete sellado, el pan crujiente y el café tostado saben profundos y sabrosos, no sosos.',
    tags: ['cocina', 'ciencia de los alimentos', 'química', 'sabor'],
    language: 'es',
    image: { prompt: promptOf('maillard-reaction'), alt: 'Comida pálida dorándose en una corteza dorada con chispas aromáticas elevándose' },
    sources: [
      { title: 'Harold McGee — La cocina y los alimentos (la reacción de Maillard)', url: 'https://www.curiouscook.com/' },
      { title: 'Royal Society of Chemistry — La reacción de Maillard', url: 'https://edu.rsc.org/' },
    ],
    content: `# Por qué dorar la comida la hace tan sabrosa: la reacción de Maillard

Hierve un trozo de pollo y sabe plano; séllalo hasta dorarlo y sabe rico, profundo y sabroso. Esa diferencia tiene nombre: la **reacción de Maillard**, la pieza de química más importante de una cocina. Es lo que convierte la masa pálida en pan crujiente, los granos crudos en café tostado, y un filete gris en uno dorado, con costra y que se hace agua la boca. Entenderla explica una enorme parte de lo que hace deliciosa la comida cocinada, y cómo conseguir más.

## Qué ocurre en realidad

La reacción de Maillard es una danza química entre dos cosas presentes en la mayoría de los alimentos: los **aminoácidos** (los componentes de las proteínas) y ciertos **azúcares**. Cuando aplicas suficiente calor, reaccionan y se reordenan en **cientos de compuestos completamente nuevos** que no existían en el alimento crudo, compuestos responsables de los sabores y aromas tostados, a galleta, a carne, a fruto seco y sabrosos. No es solo que la comida se oscurezca; es que se crea desde cero una explosión de nuevas moléculas de sabor. El color marrón y el sabor profundo llegan juntos porque son la *misma* química.

Bautizada en honor al químico francés que la describió a principios del siglo XX, la reacción ocurre siempre que la comida se dora con el calor sin quemarse: al sellar, asar, hacer a la parrilla, hornear, tostar o freír.

## Cómo conseguir más

Como es una reacción química, puedes favorecerla. Los dos enemigos del dorado son la **temperatura baja** y el **agua**, y las palancas se siguen directamente:

| Palanca | Por qué ayuda |
| --- | --- |
| **Calor alto** | La reacción necesita más o menos 140 °C para arrancar de verdad |
| **Una superficie seca** | El agua mantiene la comida a 100 °C (hervor); debe evaporarse antes de que empiece el dorado |
| **No abarrotar la sartén** | Abarrotar atrapa el vapor y mantiene la superficie húmeda y fría |
| **Secar la comida antes** | Menos humedad superficial que evaporar = dorado más rápido |

Esta es la ciencia detrás de los consejos comunes de cocina: seca el filete, calienta la sartén hasta que esté ardiendo y no la llenes de comida. No estás siendo quisquilloso: estás eliminando las dos cosas (humedad y calor bajo) que bloquean la reacción de Maillard.

## Maillard frente a caramelización

La gente suele mezclar ambas, pero son distintas. La **caramelización** es el dorado de los azúcares *por sí solos* (piensa en el caramelo, o en los bordes de la cebolla asada). La **reacción de Maillard** necesita tanto azúcares *como* aminoácidos (proteínas), por lo que domina en la carne, el pan y otros alimentos con proteínas. Ambas crean dorado y sabor profundo mediante el calor; solo parten de ingredientes distintos, y a menudo ocurren codo con codo.

## Preguntas frecuentes

**¿La comida dorada es mala para la salud?**
La comida muy dorada o carbonizada puede formar algunos compuestos menos deseables, así que conviene moderar las partes ennegrecidas o quemadas, pero el dorado dorado normal de Maillard es una piedra angular de cómo los humanos han hecho deliciosa la comida durante milenios. Dorar no es quemar.

**¿Por qué un poco de bicarbonato acelera el dorado?**
La reacción de Maillard va más rápido en condiciones menos ácidas (más alcalinas), así que una pizca de bicarbonato puede acelerar el dorado, un truco usado para cebollas muy doradas o pretzels. Úsalo con moderación; demasiado afecta al sabor.

**¿Por qué la comida hervida o al vapor no se dora?**
Porque el agua mantiene la superficie a 100 °C, por debajo de la temperatura que necesita la reacción de Maillard. Por mucho que hiervas, no puedes dorar, que es justo por lo que la comida hervida sabe más suave que la asada.`,
  },
  {
    topicKey: 'salt-in-cooking',
    title: 'Por qué la sal importa más que cualquier otro condimento',
    question: '¿Por qué la sal es tan importante al cocinar y cómo hace que la comida sepa mejor?',
    summary:
      'La sal no solo hace la comida salada: suprime el amargor, amplifica los aromas y hace que los demás sabores sepan más a sí mismos. Usada durante la cocción y no solo en la mesa, transforma la comida; por eso quedarse corto de sal es el error de cocina más común.',
    tags: ['cocina', 'ciencia de los alimentos', 'sal', 'sabor'],
    language: 'es',
    image: { prompt: promptOf('salt-in-cooking'), alt: 'Cristales de sal disolviéndose en la comida, avivando sus colores y apartando una neblina tenue' },
    sources: [
      { title: 'Samin Nosrat — Sal, grasa, ácido, calor', url: 'https://www.saltfatacidheat.com/' },
      { title: 'Harold McGee — La cocina y los alimentos (la sal y el gusto)', url: 'https://www.curiouscook.com/' },
    ],
    content: `# Por qué la sal importa más que cualquier otro condimento

Si un plato sabe plano, aburrido o "como si le faltara algo", la respuesta casi siempre es sal, no un ingrediente más sofisticado. La sal es la herramienta más poderosa de la cocina, y aprender a usarla bien hace más por tu comida que cualquier receta o técnica. Pero su tarea es mucho más interesante que "hacer las cosas saladas". La sal es un *amplificador* de sabor, y entender cómo funciona cambia tu manera de cocinar.

## Qué le hace la sal al sabor en realidad

La sal afecta al gusto de varias maneras a la vez, y la mayoría no tienen nada que ver con saber salado:

- **Suprime el amargor.** La sal silencia selectivamente las notas amargas, por lo que una pizca hace que el café, el chocolate negro o las verduras amargas sepan más suaves y redondos.
- **Amplifica los demás sabores.** Al bajar el amargor y realzar nuestra percepción de otros gustos (incluidos el umami sabroso y el dulzor), la sal hace que un tomate sepa más a tomate y la carne sepa más a carne. Sube el volumen del carácter propio de la comida.
- **Potencia el aroma.** Gran parte del "sabor" es en realidad olfato, y la sal ayuda a liberar moléculas aromáticas, haciendo que la comida huela —y por tanto sepa— más rica.

Por eso un plato bien salado no sabe *salado*, sino *vívido*. Quedarse corto de sal, en cambio, deja todo ese sabor amortiguado, que es la razón más común de que la comida casera sepa más apagada que la de restaurante.

## Cuándo salas importa tanto como cuánto

La mayor mejora que puede hacer la mayoría de quienes cocinan en casa es **salar durante toda la cocción, no solo al final**. La sal añadida pronto tiene tiempo de penetrar y sazonar la comida desde dentro y de hacer su química; la sal espolvoreada solo en la mesa se queda en la superficie y solo sabe a sal. Sazona por capas —el agua de la pasta, la cebolla mientras se cocina, la salsa mientras hierve a fuego lento— probando sobre la marcha. Un plato sazonado por etapas sabe sazonado de principio a fin; un plato salado solo al final sabe soso con una superficie salada.

Hay incluso un efecto físico: la sal extrae humedad de la carne y las verduras y luego la devuelve (salar pronto, como el salado en seco, sazona más hondo y puede mejorar la textura), y refuerza el gluten en la masa de pan.

## Cómo salar con confianza

El miedo a "demasiada sal" lleva a la mayoría a usar muy poca. El método fiable es **probar y ajustar**: añade un poco, prueba, añade más si sigue plano, hasta que la comida sepa a una versión más vívida de sí misma, deteniéndote justo antes de que sepa salada. Con práctica aprendes el umbral. Ten en cuenta que los tipos de sal difieren en salinidad por volumen (una cucharadita de sal fina de mesa es mucho más salada que una de sal en escamas), así que fíate de tu lengua más que de la cuchara medidora.

## Preguntas frecuentes

**¿No es la sal poco saludable?**
El exceso de sodio es una preocupación real para la salud, sobre todo el de los alimentos procesados, que son la fuente dominante para la mayoría de la gente. Salar a tu gusto tu propia comida fresca es una fracción pequeña de eso, y cocinar en casa desde cero suele tener mucho menos sodio que las comidas envasadas. Importan más la moderación y cocinar fresco que temer al salero.

**¿Qué diferencia hay entre los tipos de sal?**
Químicamente casi todas son cloruro de sodio; las diferencias son el tamaño del cristal y los minerales traza. El impacto práctico es que se miden distinto por volumen y se disuelven a ritmos distintos, por lo que las recetas y quienes cocinan a menudo especifican un tipo. Las diferencias de sabor son sutiles.

**¿Puedo arreglar un plato demasiado salado?**
A veces: diluir con más líquido o ingredientes sin sal, o añadir ácido (un chorrito de limón) o dulzor para reequilibrar, puede ayudar. Pero prevenir probando sobre la marcha es mucho más fácil que rescatar.`,
  },
  {
    topicKey: 'resting-meat',
    title: 'Por qué deberías dejar reposar la carne después de cocinarla',
    question: '¿Por qué dejar reposar la carne tras cocinarla la hace más jugosa?',
    summary:
      'Reposar la carne deja que su temperatura se iguale y que sus fibras musculares se relajen para reabsorber los jugos en vez de derramarlos. Corta un filete recién salido del fuego y el jugo se escapa; déjalo reposar unos minutos y el mismo filete queda mucho más jugoso.',
    tags: ['cocina', 'ciencia de los alimentos', 'carne', 'técnica'],
    language: 'es',
    image: { prompt: promptOf('resting-meat'), alt: 'Un filete reposado reteniendo los jugos de forma uniforme frente a otro tenso que los exprime' },
    sources: [
      { title: 'Serious Eats / J. Kenji López-Alt — The Food Lab', url: 'https://www.seriouseats.com/the-food-lab' },
      { title: 'Harold McGee — La cocina y los alimentos (la carne y el calor)', url: 'https://www.curiouscook.com/' },
    ],
    content: `# Por qué deberías dejar reposar la carne después de cocinarla

Es uno de los consejos de cocina más repetidos —"deja reposar la carne antes de cortarla"— y uno de los más ignorados, porque esperar cuando la cena está lista es difícil. Pero reposar funciona de verdad, y la razón es una física sencilla que ocurre dentro de la carne. Corta un filete o un asado en el instante en que sale del fuego y verás cómo el jugo precioso inunda la tabla. Dale antes unos minutos y ese mismo jugo se queda en su mayoría *dentro* de la carne, donde lo quieres.

## Qué ocurre por dentro

Mientras la carne reposa pasan dos cosas:

- **La temperatura se iguala.** Cuando cocinas carne, el exterior se calienta mucho más que el centro. Ese calor sigue avanzando hacia el interior después de que dejas de cocinar (lo que se llama "cocción residual"), así que reposar deja que la temperatura se equilibre: las capas externas calientes se enfrían, el centro se calienta un poco y toda la pieza se asienta en un punto más uniforme.
- **Las fibras musculares se relajan y reabsorben el jugo.** El calor hace que las fibras musculares se contraigan y aprieten, empujando su humedad hacia el centro bajo presión. Si cortas de inmediato, ese jugo a presión se escapa. Deja reposar la carne y las fibras se relajan, la presión cede y gran parte del jugo se reabsorbe y se redistribuye, de modo que se queda en la rebanada en vez de en la tabla.

Imagina las fibras musculares como esponjas que el calor apretó. Reposar deja que se aflojen y vuelvan a absorber el jugo antes de que cortes.

## Cómo reposar bien la carne

- **Ajusta el tiempo al corte.** Un filete fino necesita solo unos 5 minutos; un asado grande se beneficia de 15 a 30. Más grande y más caliente significa más tiempo.
- **Cúbrela sin apretar.** Una carpa floja de papel de aluminio la mantiene caliente sin atrapar vapor (que ablandaría cualquier costra crujiente).
- **No la reposes de más.** Reposar demasiado deja que se enfríe; el objetivo es "asentada", no "tibia".
- **Guarda los jugos.** Lo que sí se escape a la tabla es puro sabor: viértelo de nuevo sobre la carne cortada o en la salsa.

## Un matiz útil

Reposar importa más en cortes gruesos y asados cocinados con calor fuerte y rápido, donde el gradiente de temperatura y la tensión de las fibras son mayores. Importa menos en piezas finas o braseadas a fuego lento. Y reposar no es solo cuestión de jugosidad: esa cocción residual significa que deberías retirar la carne del fuego unos grados *antes* de tu temperatura objetivo, dejando que llegue al punto perfecto durante el reposo. Planifícalo en lugar de luchar contra él.

## Preguntas frecuentes

**¿No se enfriará la carne mientras reposa?**
Apenas, en el tiempo adecuado: un filete pierde poco calor en 5 minutos, y un asado grande retiene el calor mucho más de lo que crees. Cubrirla sin apretar y no reposarla de más la mantiene lo bastante caliente; la ganancia en jugosidad compensa de sobra la pequeña bajada de temperatura.

**¿Reposar funciona para toda la carne?**
Ayuda sobre todo en filetes, chuletas y asados cocinados a calor alto. Las piezas braseadas a fuego lento o muy finas se benefician menos. Las aves y los asados grandes recompensan especialmente un buen reposo.

**¿Es cierto que los jugos quedan "sellados" al sellar primero?**
Es un mito: sellar crea sabor (la reacción de Maillard) pero no sella los jugos. Lo que mantiene la carne jugosa es reposar, no sellar.`,
  },
  {
    topicKey: 'onions-make-you-cry',
    title: 'Por qué las cebollas te hacen llorar (y cómo evitarlo)',
    question: '¿Por qué las cebollas nos hacen llorar y cómo puedo cortarlas sin lágrimas?',
    summary:
      'Cortar una cebolla rompe sus células y libera enzimas que generan un gas volátil de azufre. El gas asciende, reacciona con el agua de tus ojos formando un ácido suave, y tus ojos lo expulsan con lágrimas. El frío, los cuchillos afilados y la corriente de aire lo reducen.',
    tags: ['cocina', 'ciencia de los alimentos', 'química', 'cocina doméstica'],
    language: 'es',
    image: { prompt: promptOf('onions-make-you-cry'), alt: 'Una cebolla cortada liberando una columna de gas ascendente, desviada por una corriente de aire fría' },
    sources: [
      { title: 'Royal Society of Chemistry — Por qué las cebollas te hacen llorar', url: 'https://edu.rsc.org/' },
      { title: 'Harold McGee — La cocina y los alimentos (las cebollas y el azufre)', url: 'https://www.curiouscook.com/' },
    ],
    content: `# Por qué las cebollas te hacen llorar (y cómo evitarlo)

La cebolla es el único ingrediente que hace llorar de forma rutinaria a quien cocina, y no es algo emocional: es un pequeño experimento de química ocurriendo en tu tabla de cortar. La cebolla no intenta dar sabor a tu comida cuando te escuece los ojos; se está defendiendo. Entender la sorprendentemente ingeniosa "trampa" química del interior de una cebolla no solo satisface la curiosidad, sino que apunta directamente a cómo picarla sin llorar.

## La defensa química de la cebolla

Una cebolla intacta es inofensiva: la química irritante solo se dispara cuando la dañas. Aquí va la reacción en cadena:

1. Las células de la cebolla almacenan, por separado, ciertos **compuestos de azufre** y **enzimas**.
2. Cuando cortas, rompes las células y esos dos se juntan y reaccionan.
3. La reacción produce un **gas** pequeño y volátil (un compuesto de azufre que los químicos llaman factor lacrimógeno, o "que hace llorar").
4. Ese gas asciende por el aire y llega a tus ojos.
5. Reacciona con la fina capa de agua de tus ojos formando un **ácido sulfúrico** suave, un pequeño irritante.
6. Tus ojos detectan la irritación y la expulsan de la única manera que pueden: **lágrimas.**

Es una defensa elegante, evolucionada para disuadir a los animales de comerse el bulbo de la cebolla. El "arma" solo se ensambla cuando se corta la cebolla, que es justo por lo que una cebolla entera en el bol nunca te molesta.

## Cómo cortar cebollas sin llorar

Todos los trucos eficaces funcionan atacando alguno de los pasos de arriba: ralentizando la reacción o impidiendo que el gas llegue a tus ojos:

| Truco | Cómo funciona |
| --- | --- |
| **Enfría la cebolla antes** | El frío ralentiza la reacción enzimática, así que se forma menos gas |
| **Usa un cuchillo afilado** | Los cortes limpios rompen menos células que aplastar con una hoja roma |
| **Corta cerca de una corriente de aire** | Un ventilador, una ventana abierta o la campana alejan el gas de tu cara |
| **No cortes la parte de la raíz** | La base de la raíz concentra la mayor cantidad de enzimas |
| **Moja la cebolla / el cuchillo** | El agua cerca del corte absorbe parte del gas antes de que ascienda |

Un cuchillo afilado, más una cebolla fría, más algo de corriente de aire bastan para la mayoría de la gente. Las gafas de protección también sirven, si vas a cortar mucho: sellar los ojos simplemente impide que el gas los alcance.

## Preguntas frecuentes

**¿Por qué algunas cebollas hacen llorar más que otras?**
El contenido de azufre varía según el tipo de cebolla y las condiciones de cultivo. Las cebollas de guarda picantes tienden a ser las peores; las variedades más dulces o suaves producen menos irritante. La frescura y el almacenamiento también influyen.

**¿De verdad funciona cortar bajo el agua?**
Puede funcionar —el agua absorbe el gas volátil antes de que llegue a tus ojos— pero picar sumergido es incómodo y poco práctico. Cortar cerca de agua corriente o de una superficie húmeda es una versión más suave de la misma idea.

**¿Por qué cocinar una cebolla no hace llorar?**
El calor destruye las enzimas y expulsa el gas volátil, así que las cebollas cocinadas no escuecen, y saben más dulces, porque el calor también transforma sus afilados compuestos de azufre en otros más suaves y dulces.`,
  },
  {
    topicKey: 'baking-is-chemistry',
    title: 'Por qué la repostería es química (y cocinar es más indulgente)',
    question: '¿Por qué tengo que medir con precisión en repostería pero puedo improvisar al cocinar?',
    summary:
      'La repostería depende de reacciones químicas de proporción fija —levadura, gluten y almidón actuando de forma predecible—, así que medir con precisión importa. Cocinar al fuego deja probar y ajustar sobre la marcha, así que tolera la improvisación. Saber cuál haces define cuánto seguir la receta.',
    tags: ['cocina', 'repostería', 'ciencia de los alimentos', 'química'],
    language: 'es',
    image: { prompt: promptOf('baking-is-chemistry'), alt: 'Una balanza de precisión para repostería junto a una cazuela a fuego lento que se ajusta libremente al cocinar' },
    sources: [
      { title: 'Harold McGee — La cocina y los alimentos (la química de la repostería)', url: 'https://www.curiouscook.com/' },
      { title: "America's Test Kitchen — La ciencia de la repostería", url: 'https://www.americastestkitchen.com/' },
    ],
    content: `# Por qué la repostería es química (y cocinar es más indulgente)

Hay una razón por la que quienes cocinan con soltura e improvisan la cena cada noche, de repente siguen las recetas de pastel al gramo. **Cocinar y hornear son actividades fundamentalmente distintas**, aunque ambas ocurran en la cocina. Cocinar —un salteado, una sopa, una salsa— es un proceso flexible, de probar sobre la marcha. La repostería se parece más a llevar a cabo una reacción química: los ingredientes interactúan en proporciones fijas *antes* de que puedas probar el resultado, y equivocarse en las proporciones te da un pastel plano o un ladrillo de pan. Saber en qué modo estás te dice con cuánto rigor seguir la receta.

## Por qué la repostería exige precisión

En repostería, los ingredientes no son solo sabores: son **reactivos** en una química que tiene que equilibrarse:

- **Los gasificantes** (bicarbonato, levadura química, levadura de panadería) producen burbujas de gas que hacen subir los horneados. Demasiado poco y queda denso; demasiado y sube para luego desplomarse. La cantidad está ligada a los demás ingredientes.
- **El gluten**, la red de proteínas del harina y el agua, da estructura. Cuánta harina, cuánto líquido y cuánto amasas cambian la textura.
- **Las proporciones de harina, líquido, grasa, azúcar y huevos** determinan si obtienes un pastel, una galleta, un muffin o una galleta crujiente: los *mismos* ingredientes en distintas proporciones hacen cosas completamente diferentes.
- **Todo cuaja en el horno**, de forma irreversible. Una vez horneado, no puedes probar y corregir: la química ya ocurrió.

Ese último punto es el quid. Quien cocina puede probar una salsa y añadir sal; quien hornea no puede probar la textura *final* de una masa de pastel y corregirla después de hornear. Las decisiones se fijan de antemano, así que las mediciones tienen que ser correctas de antemano.

## Por qué cocinar al fuego es indulgente

Cocinar en los fogones es iterativo y reversible de una manera en que la repostería no lo es. Puedes probar en cada etapa y ajustar: más sal, más ácido, más líquido, más tiempo a fuego lento. Un puñado más de verduras no arruinará un guiso. Rara vez hay un equilibrio químico delicado que un pequeño cambio vaya a derribar, así que estimar, sustituir e improvisar suelen funcionar bien. Por eso las recetas de sopas y salteados pueden decir "sazona al gusto" mientras las de pastel especifican 1,5 cucharaditas de levadura química exactamente.

| | Repostería | Cocina al fuego |
| --- | --- | --- |
| Precisión necesaria | Alta — proporciones fijas | Menor — ajustar al gusto |
| ¿Puedes probar a mitad del proceso? | No (cuaja en el horno) | Sí, constantemente |
| ¿Tolera sustituciones? | A menudo mal | Por lo general bien |
| Mentalidad | Química / seguir la receta | Oficio / usar el criterio |

## La conclusión práctica

Adapta tu enfoque a la tarea. **Hornea como un químico:** mide con cuidado (por peso cuando sea posible, es más preciso que las tazas), no cambies ingredientes a la ligera y sigue el método. **Cocina como un artista:** prueba constantemente, ajusta con libertad y trata las recetas como guías flexibles. Muchas frustraciones de cocina vienen de improvisar un pastel (desastre) o medir rígidamente una sopa (innecesariamente quisquilloso). Saber a qué juego estás jugando es la mitad de la destreza.

## Preguntas frecuentes

**¿Puedo improvisar alguna vez en repostería?**
Dentro de unos límites: puedes ajustar los sabores (especias, extractos, añadidos como pepitas de chocolate) con bastante libertad, pero las proporciones estructurales (harina, líquido, gasificante, grasa) son donde importa la precisión. Cámbialas solo si entiendes lo que hacen.

**¿Por qué pesar los ingredientes en vez de usar tazas?**
Una "taza" de harina puede variar mucho según cómo se recoja y se compacte, lo que altera las proporciones. El peso es constante, que es por lo que las recetas serias de repostería dan gramos: elimina una gran fuente de fracaso.

**¿Es hornear pan lo más estricto de todo?**
El pan es preciso pero también receptivo: la masa da pistas a través de cómo se siente y cómo sube, así que quienes hornean con experiencia ajustan al tacto. Mezcla química (proporciones, fermentación) con oficio (leer la masa), que es parte de por qué resulta tan gratificante aprenderlo.`,
  },
  {
    topicKey: 'emulsions',
    title: 'Cómo funcionan las emulsiones: la ciencia de la mayonesa, la vinagreta y las salsas cremosas',
    question: '¿Cómo se combinan el aceite y el agua en salsas suaves como la mayonesa si normalmente se separan?',
    summary:
      'El aceite y el agua odian mezclarse, pero una emulsión obliga a diminutas gotas de uno a quedar suspendidas en el otro, separadas por un emulsionante como la yema o la mostaza. Esa es la ciencia de la mayonesa, la vinagreta, la holandesa y muchas salsas cremosas, y de por qué a veces se "cortan".',
    tags: ['cocina', 'ciencia de los alimentos', 'salsas', 'química'],
    language: 'es',
    image: { prompt: promptOf('emulsions'), alt: 'Aceite y agua separados convirtiéndose en una suspensión cremosa de gotas envueltas en emulsionante' },
    sources: [
      { title: 'Harold McGee — La cocina y los alimentos (las emulsiones)', url: 'https://www.curiouscook.com/' },
      { title: 'Serious Eats — La ciencia de las emulsiones', url: 'https://www.seriouseats.com/' },
    ],
    content: `# Cómo funcionan las emulsiones: la ciencia de la mayonesa, la vinagreta y las salsas cremosas

La mayonesa es sobre todo aceite y un poco de líquido a base de agua —dos cosas que célebremente se niegan a mezclarse—, y sin embargo es suave, espesa y cremosa, no un charco aceitoso. La magia que lo hace posible se llama **emulsión**, y está detrás de una enorme variedad de alimentos: vinagreta, holandesa, alioli, aderezos cremosos e incluso algunas salsas suaves. Una vez que entiendes las emulsiones, puedes hacer estas salsas de forma fiable y rescatarlas cuando fallan.

## Por qué el aceite y el agua no se mezclan

Las moléculas de aceite y de agua son fundamentalmente incompatibles: las de agua se aferran entre sí y excluyen el aceite, así que ambos se separan en capas (el aceite flotando arriba). Agítalos juntos y obtendrás una mezcla turbia breve que se vuelve a separar enseguida. Para hacer una salsa cremosa *estable* necesitas hacer dos cosas: romper un líquido en diminutas gotas dispersas en el otro, **y** evitar que esas gotas se encuentren entre sí y se fusionen de nuevo en una capa.

## Los dos ingredientes de una emulsión

Toda emulsión necesita:

- **Fuerza mecánica** para destrozar un líquido en diminutas gotas suspendidas en el otro: batir, licuar o agitar con vigor. Cuanto más pequeñas las gotas, más suave y estable el resultado.
- **Un emulsionante**, una molécula especial que tiene un extremo al que le gusta el agua y otro al que le gusta el aceite. Recubre cada gota, situándose en la frontera entre aceite y agua, e impide que las gotas se fusionen. Este es el ingrediente secreto. En la mayonesa y la holandesa es la **yema de huevo** (rica en el emulsionante lecitina); en la vinagreta suele ser la **mostaza**; la miel, la pasta de ajo y otros también pueden ayudar.

Así que la mayonesa son millones de gotas microscópicas de aceite, cada una envuelta en emulsionante de yema de huevo, suspendidas en un poco de líquido a base de agua, que nuestra boca percibe como suave y cremoso.

## Por qué las emulsiones se "cortan" y cómo arreglarlas

Una emulsión se "corta" cuando las gotas escapan de su emulsionante y se fusionan de nuevo en aceite y agua separándose (un desastre cortado y grasiento). Las causas habituales: **añadir el aceite demasiado rápido** (saturando el emulsionante antes de que pueda recubrir las gotas), **demasiado poco emulsionante** o **choques de temperatura**. La prevención clásica es añadir el aceite *despacio* al principio —un hilo fino mientras bates—, dando tiempo al emulsionante para envolver cada gota. Para rescatar una salsa cortada, a menudo empiezas de cero con un poco de emulsionante nuevo (una yema de huevo, o una cucharada de la salsa cortada más mostaza) y bates de vuelta la mezcla cortada poco a poco.

## Preguntas frecuentes

**¿Por qué mi vinagreta se separa pero la mayonesa no?**
Una vinagreta rápida es una emulsión *temporal*: batir dispersa el aceite brevemente, pero con poco emulsionante se vuelve a separar (basta con agitar antes de usar). La mayonesa tiene mucho emulsionante (yema de huevo) y gotas diminutas, lo que la convierte en una emulsión *estable* y duradera.

**¿Puedo hacer mayonesa sin huevo?**
Sí: funcionan otros emulsionantes, como las proteínas de ciertos líquidos vegetales (el aquafaba, el líquido de los garbanzos en lata, es un emulsionante sin huevo muy popular), o la mostaza y la lecitina de soja. El principio es idéntico; solo cambia el emulsionante.

**¿Por qué una batidora facilita las emulsiones?**
Aplica una fuerza mecánica intensa y constante, destrozando el aceite en gotas muy finas de forma rápida y uniforme, lo que produce una emulsión más suave y estable que batir a mano y perdona más añadir el aceite un poco rápido.`,
  },
  {
    topicKey: 'how-bread-rises',
    title: 'Cómo sube el pan: levadura, gluten y gas atrapado',
    question: '¿Cómo sube la masa de pan y se convierte en una hogaza ligera y esponjosa?',
    summary:
      'La levadura se come los azúcares de la masa y libera gas dióxido de carbono; una red elástica de gluten atrapa ese gas en burbujas, inflando la masa como incontables globos diminutos. El horno fija la estructura y deja la miga esponjosa de una hogaza terminada.',
    tags: ['cocina', 'repostería', 'pan', 'ciencia de los alimentos'],
    language: 'es',
    image: { prompt: promptOf('how-bread-rises'), alt: 'Levadura liberando burbujas de gas atrapadas en una red elástica de gluten, inflando la masa' },
    sources: [
      { title: 'Harold McGee — La cocina y los alimentos (el pan y la fermentación)', url: 'https://www.curiouscook.com/' },
      { title: 'Royal Society of Chemistry — La química del pan', url: 'https://edu.rsc.org/' },
    ],
    content: `# Cómo sube el pan: levadura, gluten y gas atrapado

Una masa de harina y agua se convierte en una hogaza alta, ligera y esponjosa, y la transformación puede parecer casi mágica. No lo es; es el trabajo en equipo de dos cosas: un **microorganismo vivo** que produce gas y una **red elástica de proteínas** que lo atrapa. El pan sube porque incontables burbujas diminutas de gas se inflan dentro de la masa y se retienen allí. Entender a los dos protagonistas explica todo, desde por qué amasas hasta por qué la masa necesita tiempo, pasando por por qué una hogaza terminada está llena de agujeros.

## Protagonista uno: la levadura produce gas

La **levadura** es un hongo vivo unicelular. Cuando se mezcla en la masa con calor y humedad, hace lo que hacen los seres vivos: comer. La levadura se alimenta de los azúcares y almidones de la harina y, al digerirlos mediante la **fermentación**, libera **gas dióxido de carbono** (y pequeñas cantidades de alcohol y compuestos de sabor, que es por lo que el pan huele tan bien). Cada célula de levadura es una diminuta fábrica de gas. Con tiempo, miles de millones de ellas llenan la masa de dióxido de carbono.

Pero el gas por sí solo simplemente burbujearía y se escaparía. Algo tiene que *atraparlo*.

## Protagonista dos: el gluten atrapa el gas

Ese algo es el **gluten**, una red elástica de proteínas que se forma cuando la harina de trigo se mezcla con agua y se trabaja (se amasa). El gluten es lo que hace la masa elástica y capaz de mantener su forma. A medida que la levadura produce dióxido de carbono, la red de gluten atrapa el gas en miles de pequeñas bolsas, inflándose como una red de globos microscópicos. La masa se expande, volviéndose más ligera y esponjosa: eso es el "levado". Por eso **amasar** importa: desarrolla el gluten en una red fuerte y elástica que puede retener el gas en lugar de dejarlo escapar.

Así que: la levadura infla, el gluten contiene. Ambos son necesarios. Quita la levadura y no hay gas; quita el gluten y el gas se escapa.

## El horno lo hace permanente

El paso final ocurre con el calor. En el horno, el gas atrapado se expande más con el calor (un último impulso rápido llamado "salto de horno"), y luego el calor **fija la estructura**: el gluten se endurece y los almidones se solidifican, bloqueando la red esponjosa de agujeros en su sitio de forma permanente. Las burbujas que eran blandas e inflables se convierten en una miga fija y ligera. La corteza se dora mediante la reacción de Maillard, y tienes pan.

## Preguntas frecuentes

**¿Qué hace el bicarbonato o la levadura química de forma distinta a la levadura de panadería?**
Son gasificantes químicos: producen dióxido de carbono mediante una reacción química rápida en vez de una fermentación biológica lenta. Por eso los "panes rápidos", los pasteles y los muffins (levados con levadura química o bicarbonato) no necesitan tiempo de levado, mientras que los panes con levadura de panadería necesitan horas pero desarrollan un sabor más complejo.

**¿Por qué la masa necesita subir dos veces en muchas recetas?**
El primer levado construye sabor y gas; desinflar y dejar que suba de nuevo crea una miga más fina y uniforme y más desarrollo de sabor. No todos los panes necesitan dos levados, pero muchos se benefician de la fermentación extra.

**¿Por qué la masa madre es diferente?**
La masa madre usa levaduras y bacterias silvestres de un "fermento" en vez de levadura comercial. El mismo mecanismo de gas y gluten la hace subir, pero las bacterias también producen ácidos que le dan a la masa madre su sabor ácido y afectan a su textura y conservación.`,
  },
  {
    topicKey: 'marinades',
    title: 'Qué hacen los adobos en realidad (y qué no)',
    question: '¿De verdad los adobos ablandan y dan sabor a la carne en lo profundo?',
    summary:
      'Los adobos sobre todo dan sabor a la superficie de la comida y pueden afectar levemente a la textura, pero no penetran hondo ni ablandan de verdad la carne dura como se suele creer. Saber qué hacen en realidad (y qué no) te ayuda a usarlos bien y a evitar esfuerzo desperdiciado.',
    tags: ['cocina', 'ciencia de los alimentos', 'carne', 'técnica'],
    language: 'es',
    image: { prompt: promptOf('marinades'), alt: 'Carne en adobo con el sabor concentrado en una fina capa superficial, desvaneciéndose hacia el interior' },
    sources: [
      { title: 'Serious Eats / J. Kenji López-Alt — la ciencia de los adobos', url: 'https://www.seriouseats.com/' },
      { title: 'Harold McGee — La cocina y los alimentos (los adobos)', url: 'https://www.curiouscook.com/' },
    ],
    content: `# Qué hacen los adobos en realidad (y qué no)

Los adobos están rodeados de folclore de cocina: deja la carne toda la noche, el ácido la "ablandará", los sabores penetrarán hondo hasta el centro. La mayoría de eso está exagerado. Los adobos son realmente útiles, pero por razones distintas de las que la gente cree, y entender qué hacen en realidad te ahorra tiempo desperdiciado y resultados decepcionantes y blandos. Separemos los efectos reales de los mitos.

## Qué hacen los adobos en realidad

- **Dan sabor a la superficie.** Esta es su tarea principal y real. Los condimentos, las hierbas, el ajo y los aromáticos de un adobo recubren y penetran ligeramente la capa externa de la comida, donde añaden sabor y ayudan al dorado. Esa superficie sazonada es deliciosa, pero es sobre todo *superficie*.
- **La sal sí penetra (despacio).** Si un adobo contiene sal (o salsa de soja, etc.), la sal sí se mueve hacia el interior de la carne con el tiempo y la sazona más hondo, muy parecido a una salmuera. La sal es el único ingrediente que viaja hacia dentro de forma significativa.
- **Pueden ayudar al dorado y a la humedad.** Los azúcares de un adobo ayudan a dorar la superficie (con cuidado: pueden quemarse), y los adobos a base de aceite ayudan a conducir el calor y a evitar que se pegue.

## Qué no hacen, en su mayoría

Aquí es donde los mitos se desmoronan:

- **No penetran hondo.** La mayoría de las moléculas del adobo (ácidos, aceites, compuestos de sabor) son demasiado grandes para viajar lejos dentro de la carne densa. Tras horas de adobo, el interior queda en gran parte intacto: el sabor se concentra en los pocos milímetros externos. Adobar más tiempo sobre todo sazona más la superficie, no el centro.
- **El ácido no ablanda de verdad, y puede arruinar la textura.** La gente cree que el ácido (limón, vinagre, yogur) "descompone" la carne dura en algo tierno. En realidad, el ácido solo afecta a la superficie misma, y *demasiado* o *demasiado tiempo* la deja **blanda y seca**, no tierna: desnaturaliza las proteínas de la superficie de forma desagradable. Los adobos ácidos largos a menudo perjudican más que ayudan.

| Creencia | Realidad |
| --- | --- |
| "Los adobos dan sabor a toda la pieza" | Sobre todo a la superficie; la sal penetra despacio |
| "Más tiempo siempre es mejor" | Pasado un punto, solo arriesgas una superficie blanda |
| "El ácido ablanda los cortes duros" | Solo afecta a la superficie y puede dejarla blanda |
| "Los adobos vuelven tierna la carne barata" | La ternura viene del corte y del método de cocción |

## Cómo usar bien los adobos

Usa los adobos para **dar sabor y dorar, no para ablandar**. Mantén los adobos ácidos relativamente cortos (a menudo menos de unas horas) para evitar que quede blando; apóyate en la **sal** si quieres una sazón más honda (esa sí viaja hacia dentro); y recuerda que la ternura real viene de elegir el corte adecuado y cocinarlo bien (a fuego lento y largo para los cortes duros, calor alto y rápido para los tiernos), no de un remojo. Para alimentos finos o porosos como trozos de pollo, tofu o verduras, los adobos funcionan relativamente mejor porque hay más superficie y menos interior denso.

## Preguntas frecuentes

**¿Cuánto tiempo debo adobar?**
Normalmente menos de lo que crees: a menudo de 30 minutos a unas horas bastan para el sabor, y los adobos ácidos en especial no deben durar demasiado. Toda la noche está bien para adobos a base de sal y poco ácido, pero arriesga que quede blando con los muy ácidos.

**¿Pinchar agujeros o hacer cortes ayuda a que el adobo penetre?**
Un poco: crea más superficie y canales, pero aun así no dará sabor en lo profundo del centro, y puede dejar escapar los jugos durante la cocción. Mejor apoyarte en la sazón superficial más sal.

**¿Qué ablanda de verdad la carne dura?**
El tiempo y el calor: la cocción lenta y húmeda (brasear, guisar) disuelve el tejido conectivo duro (el colágeno) en gelatina, que es lo que vuelve un corte duro tierno hasta deshacerse. Un adobo no puede hacer eso; solo el método de cocción adecuado puede.`,
  },
  {
    topicKey: 'searing-juices-myth',
    title: '¿Sellar la carne "encierra" los jugos? (Desmontando un mito de cocina)',
    question: '¿De verdad sellar la carne primero encierra los jugos y la mantiene jugosa?',
    summary:
      'No: la idea popular de que sellar forma un sello a prueba de jugos es un mito, refutado por pruebas sencillas. Sellar vale la pena, pero por el sabor (la reacción de Maillard), no por la humedad. Lo que de verdad mantiene jugosa la carne es no cocerla de más y dejarla reposar.',
    tags: ['cocina', 'ciencia de los alimentos', 'carne', 'mitos'],
    language: 'es',
    image: { prompt: promptOf('searing-juices-myth'), alt: 'Un filete sellado cuya costra aporta chispas de sabor pero no encierra los jugos' },
    sources: [
      { title: 'Harold McGee — La cocina y los alimentos (el mito del sellado)', url: 'https://www.curiouscook.com/' },
      { title: 'Serious Eats / J. Kenji López-Alt — sellar y humedad', url: 'https://www.seriouseats.com/' },
    ],
    content: `# ¿Sellar la carne "encierra" los jugos? (Desmontando un mito de cocina)

Es una de las creencias más repetidas en la cocina: sella la carne primero para formar una costra que "encierre" los jugos y la mantenga jugosa. Suena lógico, se ha impreso en incontables libros de cocina y es **falso**: un mito que lleva más de un siglo circulando y que se refuta con experimentos sencillos. Sellar vale la pena por completo, pero no por la razón que la mayoría cree. Aclarar este mito te hace mejor cocinero, porque te apunta a lo que *de verdad* mantiene jugosa la carne.

## De dónde viene el mito

La idea se remonta a un químico del siglo XIX que sugirió que sellar formaba una cáscara hermética alrededor de la carne. Era una hipótesis que sonaba razonable para su época, y caló, repetida a lo largo de generaciones de libros de cocina. El problema es que nunca fue cierta, y es fácil de comprobar.

## Por qué es falsa

La refutación más sencilla: cocina dos trozos de carne similares, uno sellado primero y otro no, y pesa los jugos que pierde cada uno. El trozo sellado **no** retiene más humedad: la carne sellada pierde más o menos tanto jugo como la no sellada, a veces *más*, porque el calor alto del sellado en realidad expulsa algo de humedad. Una costra dorada no es impermeable; los jugos la atraviesan sin más. Incluso puedes verlo: un filete sellado y "sellado" igual suelta abundante jugo cuando lo cortas. La costra es deliciosa, pero no es un sello.

## Para qué sirve sellar en realidad

Entonces, ¿por qué sellar? Por el **sabor y la textura**, mediante la **reacción de Maillard**: la química del dorado que crea cientos de compuestos de sabor ricos, sabrosos y tostados, y una costra satisfactoria. Un filete sellado sabe mucho mejor que uno gris y hervido, no porque sea más jugoso, sino porque esa superficie dorada está cargada de sabor profundo. Sellar es una de las técnicas más valiosas de la cocina; solo está haciendo un trabajo distinto del que afirma el mito.

## Qué mantiene jugosa la carne en realidad

Si no es sellar, ¿entonces qué? Tres cosas controlan de verdad la jugosidad:

| Para carne jugosa | Por qué |
| --- | --- |
| **No la cuezas de más** | El factor n.º 1: el calor exprime la humedad, así que cocinar más allá de tu objetivo la reseca |
| **Déjala reposar tras cocinarla** | Deja que las fibras se relajen y reabsorban el jugo en vez de derramarlo |
| **Elige el corte y el método adecuados** | Ajusta el corte al estilo de cocción; sala con antelación (salado en seco) para retener humedad |

La conclusión: **sella por el sabor, pero confía en el control de la temperatura y el reposo para la jugosidad.** Muchos cocineros ahora sellan *después* de cocinar con suavidad (el "sellado inverso") precisamente porque la costra es cuestión de sabor y puede añadirse al final, mientras que la cocción cuidadosa y suave mantiene jugoso el interior.

## Preguntas frecuentes

**Entonces, ¿debería dejar de sellar?**
Para nada: sigue sellando, porque el sabor y la costra que crea son maravillosos. Solo no creas que mantiene la carne húmeda; ese es el trabajo de no cocerla de más y de reposar. Sella por el sabor, gestiona la temperatura por la jugosidad.

**¿Qué es un "sellado inverso"?**
Cocinar la carne con suavidad hasta casi la temperatura objetivo primero (en un horno bajo), y luego sellar el exterior con calor fuerte y rápido al final. Separa los dos trabajos —un interior uniforme y jugoso de la cocción suave, una gran costra de un sellado final— y funciona de maravilla para filetes gruesos.

**¿Hay otros mitos de cocina tan persistentes como este?**
Montones: "el alcohol se evapora del todo al cocinar", "sellar encierra los jugos", "la pasta necesita aceite en el agua"; muchos son simplificaciones que no sobreviven a una prueba. Un buen hábito: cuando una regla de cocina afirma un mecanismo pulcro, pregúntate si de verdad se ha comprobado. A menudo la explicación real es más interesante.`,
  },
  {
    topicKey: 'umami',
    title: '¿Qué es el umami, el quinto sabor que hace la comida sabrosa?',
    question: '¿Qué es el umami y por qué ingredientes como el caldo, el queso y los tomates hacen la comida tan sabrosa?',
    summary:
      'El umami es el quinto sabor básico —profundidad sabrosa, a carne— que activan el glutamato y ciertos nucleótidos del caldo, el queso curado, los tomates, las setas y la salsa de soja. Combinar ingredientes ricos en umami multiplica el efecto, el secreto tras la comida muy satisfactoria.',
    tags: ['cocina', 'ciencia de los alimentos', 'sabor', 'umami'],
    language: 'es',
    image: { prompt: promptOf('umami'), alt: 'Ingredientes ricos en umami vertiendo cada uno un resplandor sabroso en un caldo central intenso' },
    sources: [
      { title: 'Centro de Información del Umami — ¿Qué es el umami?', url: 'https://www.umamiinfo.com/what-is-umami/' },
      { title: 'Harold McGee — La cocina y los alimentos (el gusto y el glutamato)', url: 'https://www.curiouscook.com/' },
    ],
    content: `# ¿Qué es el umami, el quinto sabor que hace la comida sabrosa?

Durante mucho tiempo, se enseñó que había cuatro sabores básicos: dulce, ácido, salado y amargo. Pero cualquiera que haya probado un caldo de carne intenso, un parmesano curado o un tomate perfectamente maduro sabe que hay otra cualidad: una satisfacción profunda, sabrosa, que llena la boca y que ninguno de esos cuatro describe. Esa cualidad es el **umami**, hoy reconocido como el **quinto sabor básico**. Es el nombre científico de la "profundidad sabrosa", y entenderlo es un atajo para hacer que casi cualquier comida sepa más rica y satisfactoria.

## Un sabor real y distinto

El umami (una palabra japonesa que significa aproximadamente "sabroso agradable") fue identificado hace más de un siglo por un científico que aisló lo que hace tan satisfactorio el caldo de alga kombu. Descubrió que el sabor venía del **glutamato**, un aminoácido. Hoy sabemos que nuestra lengua tiene receptores específicos para él, igual que para el dulce o el salado, que es lo que hace del umami un genuino sabor *básico* y no una combinación de los otros. Es la sensación sabrosa, a caldo, a carne, que hace que la comida sepa plena y completa.

## De dónde viene el umami

Los ingredientes ricos en umami son algunos de los más queridos en toda cocina, a menudo alimentos curados, fermentados, madurados o cocinados a fuego lento, procesos que aumentan el glutamato libre. Fuentes comunes:

- **Carnes y caldos** (en especial los caldos de hueso cocinados a fuego lento)
- **Quesos curados** (el parmesano es famoso por su carga de umami)
- **Tomates**, sobre todo maduros o concentrados (concentrado, secados al sol)
- **Setas**, en particular las secas
- **Alimentos fermentados**: salsa de soja, miso, salsa de pescado
- **Algas** (kombu) y pescado curado (anchoas, bonito)

Por eso un chorrito de salsa de soja, una corteza de parmesano en una sopa o una cucharada de concentrado de tomate pueden hacer que un plato sepa muchísimo más rico: estás añadiendo glutamato.

## El truco multiplicador del umami

Aquí va la pieza más útil de la ciencia del umami: ciertos compuestos **se amplifican entre sí**. El glutamato aporta umami, pero otras dos sustancias —unos nucleótidos llamados inosinato (de la carne y el pescado) y guanilato (de las setas)— multiplican la sensación de umami cuando se combinan con el glutamato. Juntos crean mucho más impacto sabroso que cualquiera por separado.

Esta sinergia es la lógica oculta tras los maridajes de sabores clásicos de todo el mundo: **kombu (glutamato) + copos de bonito (inosinato)** en el dashi japonés; **tomates + parmesano** en la cocina italiana; **setas + carne** en incontables guisos. Quienes cocinan descubrieron estas combinaciones por el gusto a lo largo de siglos; la ciencia explica *por qué* son tan satisfactorias, y te permite inventar las tuyas combinando una fuente de glutamato con una de setas o de carne/pescado.

## Preguntas frecuentes

**¿El glutamato monosódico (GMS) es lo mismo que el umami natural?**
Químicamente, el glutamato del GMS (glutamato monosódico) es la misma molécula que tu cuerpo saborea en los tomates o el queso: el GMS es simplemente glutamato aislado. Aporta umami de forma directa. Pese a viejos temores, las autoridades de seguridad alimentaria consideran el GMS seguro en cantidades normales; las "reacciones" que se le atribuían no han resistido bien en estudios controlados.

**¿En qué se diferencia el umami de lo simplemente "salado" o "a carne"?**
Es su propio sabor, distinto del salado: puedes tener umami sin mucha sal (un tomate) y sal sin umami (agua salada simple). "A carne" es una buena descripción de la *sensación*, pero el umami también viene de muchos alimentos sin carne, como los tomates, las setas y las algas.

**¿Cómo puedo añadir umami sin carne?**
Con facilidad: los tomates, las setas (sobre todo secas), la salsa de soja, el miso, la levadura nutricional, las algas, los alimentos fermentados y los quesos curados son todos ricas fuentes de umami aptas para vegetarianos. Combinar un par de ellas (digamos, setas + soja + tomate) construye un sabor sabroso profundo en la cocina vegetariana.`,
  },
];
