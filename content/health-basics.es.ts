import type { DraftArticle } from './types';
import { healthBasicsEn } from './health-basics.en';

// Batch: Health & Nutrition Basics (versión nativa en español). Mismos títulos
// y topicKey que health-basics.en.ts, redactados de forma nativa para el lector
// hispanohablante. Imágenes compartidas. Divulgación general de salud, no
// consejo médico; cada artículo termina con un aviso de consultar a un profesional.

const promptOf = (key: string): string => {
  const hit = healthBasicsEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

const NOTE = '\n\n*Este artículo es divulgación general de salud, no consejo médico. Para síntomas o decisiones personales, consulta a un profesional sanitario cualificado.*';

export const healthBasicsEs: DraftArticle[] = [
  {
    topicKey: 'caffeine-how-it-works',
    title: 'Cómo funciona realmente la cafeína en tu cuerpo',
    question: '¿Cómo te despierta la cafeína y por qué deja de hacer efecto con el tiempo?',
    summary:
      'La cafeína no aporta energía: bloquea la señal de "estoy cansado" del cerebro (la adenosina), enmascarando la fatiga en lugar de eliminarla. El uso habitual genera tolerancia, y la deuda de sueño sigue esperando debajo todo el tiempo.',
    tags: ['salud', 'cafeína', 'sueño', 'nutrición'],
    language: 'es',
    image: {
      prompt: promptOf('caffeine-how-it-works'),
      alt: 'Una molécula con forma de cafeína bloqueando el receptor e impidiendo el paso a la molécula del cansancio',
    },
    sources: [
      { title: 'Sleep Foundation — la cafeína y el sueño', url: 'https://www.sleepfoundation.org/nutrition/caffeine-and-sleep' },
      { title: 'FDA — ¿cuánta cafeína es demasiada?', url: 'https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much' },
    ],
    content: `# Cómo funciona realmente la cafeína en tu cuerpo

La cafeína es la droga más popular del mundo, y casi todos malinterpretan lo que hace. **No** te da energía. No es combustible. Lo que realmente hace es bloquear la señal que le dice a tu cerebro que estás cansado: un truco ingenioso que enmascara la fatiga sin eliminarla. Entender ese único mecanismo explica los temblores, el bajón, la tolerancia y por qué la cafeína sabotea el sueño horas después de tomarla.

## El truco de la adenosina

Mientras estás despierto, tu cerebro acumula una molécula llamada **adenosina**. Se une a unos receptores y, a medida que se acumula a lo largo del día, te hace sentir cada vez más somnoliento: es el recuento que lleva tu cerebro del "tiempo despierto". La forma molecular de la cafeína es lo bastante parecida a la de la adenosina como para encajar en los mismos receptores, y los tapona, como una llave que entra en la cerradura pero no gira. Con los receptores bloqueados, la señal de cansancio no puede pasar. Te sientes despierto.

Pero fíjate en lo que *no* ocurrió: la adenosina sigue ahí, sigue acumulándose, solo que no puede acoplarse. No has saldado la fatiga: la has pagado con tarjeta de crédito. Cuando la cafeína se elimina y libera los receptores, toda esa adenosina represada entra de golpe. Eso es el **bajón**.

## Por qué el momento importa más de lo que crees

El número que define a la cafeína es su **vida media**: unas 5–6 horas en un adulto típico, lo que significa que la mitad de la dosis sigue activa todo ese tiempo después de tomarla. Un café fuerte a las 3 de la tarde deja una cantidad considerable circulando a las 9 de la noche, bloqueando en silencio la señal de presión de sueño justo cuando la quieres. Incluso quienes "se duermen sin problema" con cafeína tardía tienen un sueño profundo mediblemente peor: el descanso es más superficial sin que lo noten.

| Tiempo tras un café | Cuánta cafeína queda aproximadamente |
| --- | --- |
| 0 horas | 100% |
| ~5–6 horas | 50% |
| ~10–12 horas | 25% |
| ~24 horas | un rastro pequeño pero real |

(La vida media varía mucho entre personas: la genética, el embarazo, algunos medicamentos y la función hepática pueden duplicarla o reducirla a la mitad.)

## Tolerancia y dependencia

Usa cafeína a diario y tu cerebro se adapta **fabricando más receptores de adenosina**, así que la misma dosis bloquea una fracción menor y necesitas más para el mismo empujón. Mientras tanto, con receptores de más, prescindir de la cafeína hace que la adenosina se una aún más fácilmente que antes: el clásico dolor de cabeza, la fatiga y la irritabilidad del síndrome de abstinencia. Buena parte de la experiencia de "la cafeína me hace sentir normal" en grandes consumidores no es más que aliviar la abstinencia hasta volver a la línea base, no ganar nada por encima de ella.

## Cómo usarla bien

El mecanismo sugiere reglas sencillas: mantén un **toque de queda de cafeína** (lo habitual es dejarla ~8–10 horas antes de dormir); conoce tu techo (las autoridades sanitarias citan hasta ~400 mg/día —unas 4 tazas de café— como moderado para la mayoría de adultos sanos, menos en el embarazo); y recuerda que **retrasa** el sueño en lugar de reemplazarlo: la deuda siempre se cobra.

## Preguntas frecuentes

**¿La cafeína deshidrata?**
El leve efecto diurético se compensa con el líquido de la propia bebida; para quien la consume con regularidad, el café y el té cuentan para la hidratación. La preocupación por la deshidratación está muy exagerada.

**¿Por qué el café pone nerviosas o temblorosas a algunas personas?**
Al bloquear el efecto "calmante" de la adenosina, la cafeína deja correr más alto las señales estimulantes, lo que eleva la frecuencia cardíaca y, en personas sensibles o con dosis altas, provoca ansiedad. La genética influye mucho.

**¿Puedo "reiniciar" mi tolerancia?**
Sí: una o dos semanas sin ella permiten que el número de receptores vuelva hacia la línea base, tras lo cual la misma dosis pega más fuerte de nuevo. Espera síntomas de abstinencia durante el reinicio.${NOTE}`,
  },
  {
    topicKey: 'why-we-sleep',
    title: '¿Por qué necesitamos dormir y qué pasa si no lo hacemos?',
    question: '¿Por qué los humanos necesitan dormir y qué ocurre realmente en el cerebro y el cuerpo durante el sueño?',
    summary:
      'Dormir no es tiempo muerto: es cuando el cerebro elimina desechos, consolida la memoria y el cuerpo se repara. El sueño corto crónico degrada en silencio el ánimo, la inmunidad, el metabolismo y el juicio, a menudo sin que la persona note el declive.',
    tags: ['salud', 'sueño', 'cerebro', 'bienestar'],
    language: 'es',
    image: {
      prompt: promptOf('why-we-sleep'),
      alt: 'Una cabeza dormida donde una luz limpiadora arrastra los desechos y ordena los recuerdos',
    },
    sources: [
      { title: 'Sleep Foundation — cuánto sueño necesitas', url: 'https://www.sleepfoundation.org/how-sleep-works/how-much-sleep-do-we-really-need' },
      { title: 'CDC — sobre el sueño y la salud', url: 'https://www.cdc.gov/sleep/about/index.html' },
    ],
    content: `# ¿Por qué necesitamos dormir y qué pasa si no lo hacemos?

Pasamos alrededor de un tercio de nuestra vida durmiendo y, durante mucho tiempo, hasta los científicos lo trataron como tiempo perdido: el cerebro apagado. Es justo lo contrario. El sueño es uno de los procesos más *activos* y esenciales de la biología: el cerebro realiza un mantenimiento que no puede hacer despierto, se archivan los recuerdos y el cuerpo se repara. Sáltatelo y los costes son reales, acumulativos y —lo más peligroso— en parte invisibles para quien los paga.

## Qué hace en realidad el sueño

A lo largo de la noche, el cerebro recorre repetidamente varias fases, cada una con un trabajo distinto:

- **Sueño profundo (de ondas lentas)**: el turno de reparación del cuerpo: crecimiento de tejidos, refuerzo inmunitario y un "enjuague" físico. El sistema glinfático del cerebro elimina los desechos metabólicos (incluidas proteínas vinculadas a la salud cerebral a largo plazo) con mucha más eficacia que durante la vigilia.
- **Sueño REM**: donde ocurren los sueños vívidos y el cerebro procesa las emociones y teje la información nueva con el conocimiento existente. Está muy implicado en el aprendizaje, la creatividad y la regulación emocional.
- **Consolidación de la memoria**: durante toda la noche, los frágiles recuerdos a corto plazo del día se reproducen y se transfieren a un almacenamiento duradero a largo plazo. Al dormir no solo descansas; *guardas tu trabajo*.

Por eso pasar la noche en vela para estudiar sale mal: el paso de codificación que fija el aprendizaje requiere, literalmente, dormir.

## El coste de prescindir de él

La falta de sueño degrada el funcionamiento siguiendo una curva pronunciada, y buena parte del daño es silencioso:

| Sistema | Qué provoca el sueño corto |
| --- | --- |
| Atención y juicio | Reacciones más lentas, peores decisiones —comparable al deterioro por alcohol tras una vigilia prolongada |
| Estado de ánimo | Negatividad amplificada, irritabilidad, mayor riesgo de ansiedad y depresión |
| Memoria y aprendizaje | Codificación y recuerdo deteriorados |
| Inmunidad | Defensas más débiles; enfermedades más frecuentes |
| Metabolismo | Hormonas del hambre alteradas, más apetito, peor control de la glucosa |
| Salud a largo plazo | El sueño corto crónico se vincula a enfermedad cardíaca, diabetes y más |

Lo más cruel: tras unos días de restricción, la gente *siente* que se ha adaptado mientras su rendimiento medido sigue cayendo. Te conviertes en mal juez de tu propio deterioro, que es justo por lo que "yo estoy bien con 5 horas" suele ser falso.

## Cuánto, y cómo protegerlo

La mayoría de los adultos necesita **7–9 horas**; la población que de verdad está bien con menos es minúscula (una rara minoría genética), mucho más pequeña que la que *afirma* pertenecer a ella. La calidad importa tanto como la cantidad: horarios constantes (la misma hora de acostarse y levantarse), una habitación oscura y fresca y un toque de queda para la cafeína y la luz de las pantallas protegen las fases profunda y REM, que hacen el trabajo pesado.

## Preguntas frecuentes

**¿Puedo recuperarlo el fin de semana?**
En parte: algo de recuperación es real, pero dormir de más el fin de semana no deshace por completo el déficit de la semana, y el propio horario oscilante altera tu reloj biológico ("jet lag social").

**¿Es cierto que algunas personas solo necesitan 4 horas?**
Existe un gen genuino de dormidor corto, pero es extraordinariamente raro. La inmensa mayoría que cree pertenecer a este grupo simplemente está crónicamente falta de sueño y se ha acostumbrado.

**¿Ayuda la siesta?**
Una siesta corta (~10–20 min) puede recuperar el estado de alerta sin atontamiento. Las siestas largas o tardías pueden mermar la presión de sueño nocturna y alterar tu horario.${NOTE}`,
  },
  {
    topicKey: 'protein-needs',
    title: '¿Cuánta proteína necesitas en realidad?',
    question: '¿Cuánta proteína necesito de verdad y está justificado el bombo de las dietas altas en proteína?',
    summary:
      'La mayoría necesita menos proteína de lo que sugiere el marketing del fitness, pero más que el mínimo si hace ejercicio o envejece. La ingesta diaria total y repartirla entre las comidas importan mucho más que los polvos caros o el momento exacto.',
    tags: ['salud', 'nutrición', 'proteína', 'dieta'],
    language: 'es',
    image: {
      prompt: promptOf('protein-needs'),
      alt: 'Bloques de proteína equilibrados frente a una silueta del cuerpo, repartidos de forma uniforme a lo largo de una línea de tiempo',
    },
    sources: [
      { title: 'NIH / Academias Nacionales de EE. UU. — DRI de proteína', url: 'https://www.nal.usda.gov/human-nutrition-and-food-safety/dri-calculator' },
      { title: 'Escuela de Salud Pública T.H. Chan de Harvard — proteína', url: 'https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/protein/' },
    ],
    content: `# ¿Cuánta proteína necesitas en realidad?

La proteína vive su momento de marketing —se le añade a todo, desde los cereales hasta el agua— y el resultado es una confusión generalizada sobre cuánta necesita una persona en realidad. La respuesta honesta queda entre dos mitos: necesitas mucha menos de la que insinúan los anuncios de suplementos, pero si haces ejercicio, eres mayor o intentas conservar músculo mientras pierdes peso, probablemente necesites más que el mínimo oficial. Así encuentras tu número real.

## Para qué sirve la proteína

La proteína aporta aminoácidos, los ladrillos que tu cuerpo usa para construir y reparar músculo, fabricar enzimas y hormonas, sostener las células inmunitarias y mantener piel, pelo y hueso. A diferencia de la grasa, el cuerpo no puede almacenar una reserva apreciable de aminoácidos sobrantes, y por eso importa el suministro *diario*, no el promedio semanal.

## Los números, con honestidad

El mínimo oficial para prevenir la deficiencia es **unos 0,8 g por kg de peso corporal al día**: para un adulto de 70 kg, ~56 g. Pero "prevenir la deficiencia" es un listón bajo. La evidencia respalda ingestas mayores para objetivos concretos:

| Situación | Objetivo diario razonable |
| --- | --- |
| Sedentario, solo evitar la deficiencia | ~0,8 g/kg |
| Generalmente activo, mantener la salud | ~1,0–1,2 g/kg |
| Entrenamiento de fuerza / ganar músculo | ~1,4–2,0 g/kg |
| Personas mayores (contra la pérdida muscular por la edad) | ~1,0–1,2+ g/kg |
| Pérdida de peso (conservar músculo) | hacia el extremo alto |

Para una persona activa de 70 kg, eso es aproximadamente 100–140 g/día, alcanzable con comida y sin polvos. Ten en cuenta que ganar músculo tiene un techo: más allá de unos 1,6 g/kg, la proteína extra rinde poco músculo adicional, solo calorías caras.

## Momento y calidad (las palancas menores)

Dos matices importan de forma modesta, una vez la ingesta total es correcta:

- **Repártela.** El cuerpo usa mejor la proteína para construir músculo en cantidades moderadas por comida (muy a grandes rasgos, 20–40 g), así que tres o cuatro comidas con proteína superan a un filete enorme y dos comidas vacías. La "ventana anabólica" justo después del ejercicio es mucho más indulgente de lo que se creía: domina el total diario.
- **La calidad varía.** Las proteínas animales (carne, huevos, lácteos, pescado) contienen todos los aminoácidos esenciales en buenas proporciones. Las proteínas vegetales pueden cubrir perfectamente las necesidades, pero combinar fuentes (p. ej. cereales + legumbres) garantiza el juego completo de aminoácidos; la soja y unas pocas más son completas por sí solas.

## Preguntas frecuentes

**¿Demasiada proteína es peligrosa para los riñones?**
Para riñones sanos, una proteína más alta dentro de estos rangos es bien tolerada según la evidencia. Las personas con enfermedad renal previa son la excepción y deben seguir la indicación médica.

**¿Necesito proteína en polvo?**
No: es cómoda, no mágica. Los alimentos enteros aportan los mismos aminoácidos más otros nutrientes. El polvo solo es una forma portátil, y a veces más barata, de llegar a tu número en los días con prisa.

**¿Comer más proteína construye músculo de forma automática?**
No. La proteína es la materia prima; el *estímulo* es el ejercicio de fuerza. Sin entrenar, la proteína sobrante son solo calorías: el músculo se construye en el gimnasio y se abastece en la cocina.${NOTE}`,
  },
  {
    topicKey: 'metabolism-myths',
    title: 'El metabolismo: qué es y qué no es',
    question: '¿Qué es realmente el metabolismo y se puede "acelerar" para perder peso?',
    summary:
      'El metabolismo es la suma de toda la energía que gasta tu cuerpo, la mayor parte solo para mantenerte vivo en reposo. Varía menos entre personas de lo que dice el folclore, y los "aceleradores del metabolismo" que se venden para adelgazar son, sobre todo, marketing.',
    tags: ['salud', 'metabolismo', 'peso', 'nutrición'],
    language: 'es',
    image: {
      prompt: promptOf('metabolism-myths'),
      alt: 'Un cuerpo con un gran horno interno constante y luces de actividad más pequeñas y parpadeantes',
    },
    sources: [
      { title: 'Harvard Health — ¿importa el metabolismo para perder peso?', url: 'https://www.health.harvard.edu/staying-healthy/does-metabolism-matter-in-weight-loss' },
      { title: 'NIH (NIDDK) — equilibrio energético y control del peso', url: 'https://www.niddk.nih.gov/health-information/weight-management' },
    ],
    content: `# El metabolismo: qué es y qué no es

Al "metabolismo" se le culpa de más problemas de peso que a casi cualquier otra palabra, normalmente como un dial misterioso que está "lento" en algunos desafortunados y "rápido" en otros. La realidad es más aburrida y más útil: el metabolismo es simplemente **la energía total que gasta tu cuerpo**, y la mayor parte se va en mantenerte vivo mientras no haces absolutamente nada. Entender sus partes reales disuelve la mayoría de los mitos que se venden a su alrededor.

## De qué se compone el metabolismo

Tu gasto energético diario tiene tres componentes principales:

- **Tasa metabólica en reposo (TMR)**: la energía para hacer funcionar tu cuerpo en reposo: latido, respiración, cerebro, función de los órganos, mantenimiento celular. Esta es la **grande**, normalmente el **60–75%** del gasto diario total. Gastas la mayoría de tus calorías simplemente existiendo.
- **Actividad física**: desde los entrenamientos hasta moverse inquieto y caminar. Variable, y la parte que más controlas, pero suele ser menor de lo que la gente supone (a menudo ~15–30%).
- **Efecto térmico de los alimentos**: la energía usada para digerir y procesar lo que comes (~10%). La proteína es la que más cuesta procesar, lo que supone un pequeño efecto real.

La gran sorpresa: no puedes "compensar con ejercicio" un superávit calórico sostenido con facilidad, porque la actividad es una parte minoritaria y el cuerpo compensa en parte quemando menos en otro lado.

## Por qué el "metabolismo lento" es sobre todo un mito

Medidas entre personas de tamaño y composición corporal similares, las tasas metabólicas en reposo difieren mucho menos de lo que sugiere el folclore: normalmente dentro de un margen modesto, no una diferencia del doble. Lo que *sí* mueve la TMR de forma apreciable:

| Factor | Efecto sobre la TMR |
| --- | --- |
| Tamaño corporal y masa muscular | Los cuerpos más grandes y con más músculo queman más en reposo (la mayor palanca real) |
| Edad | Descenso gradual, en parte por pérdida muscular —la investigación reciente sugiere que es más estable hasta la mediana edad de lo que se creía |
| Sexo | Las diferencias se explican en gran medida por la composición corporal |
| Dieta muy restrictiva | El cuerpo se regula a la baja en cierta medida ("termogénesis adaptativa") |

Así que existen metabolismos genuinamente distintos, pero se explican sobre todo por la **composición corporal**, no por la suerte. La persona con un "metabolismo rápido" suele ser sencillamente más grande, más musculosa o más activa (incluso de forma inconsciente).

## La verdad sobre los "aceleradores"

Los suplementos, infusiones y trucos que se promocionan para "acelerar el metabolismo" producen efectos diminutos, temporales o imaginarios. La cafeína y los alimentos picantes empujan el gasto energético de forma leve y breve, ni de lejos lo suficiente para importar en el peso. La única manera duradera de elevar el gasto en reposo es **construir y conservar músculo** (entrenamiento de fuerza) y evitar la pérdida muscular que acompaña a las dietas drásticas. No hay pastilla que acelere el horno de forma significativa y segura.

## Preguntas frecuentes

**¿Comer poco y a menudo "aviva" el metabolismo?**
No: lo que cuesta energía es el total de comida procesada, no la frecuencia de las comidas. Seis comidas pequeñas y dos grandes con la misma comida queman prácticamente lo mismo al digerirse.

**¿Por qué se estancó mi pérdida de peso aunque como menos?**
En parte por la termogénesis adaptativa (un cuerpo más pequeño quema menos, y el cuerpo economiza), en parte por subestimar la ingesta. Es biología real, pero no un metabolismo "roto", y por eso importan conservar músculo y tener paciencia.

**¿El músculo puede de verdad subir mucho mi metabolismo?**
En medida moderada: el músculo quema más en reposo que la grasa, aunque el efecto por kilo suele exagerarse. Su mayor valor está en conservar la TMR durante la pérdida de peso y mejorar la salud general.${NOTE}`,
  },
  {
    topicKey: 'vitamin-supplements',
    title: '¿De verdad necesitas suplementos de vitaminas?',
    question: '¿Merece la pena tomar suplementos de vitaminas o son un desperdicio de dinero para la mayoría?',
    summary:
      'Para la mayoría que sigue una dieta variada, los multivitamínicos generales aportan poco beneficio probado: el cuerpo descarta lo que no puede usar. Pero ciertos grupos y deficiencias concretas (como la vitamina D o la B12) sí se benefician de una suplementación dirigida.',
    tags: ['salud', 'vitaminas', 'suplementos', 'nutrición'],
    language: 'es',
    image: {
      prompt: promptOf('vitamin-supplements'),
      alt: 'Un cuerpo nutrido por alimentos variados, con una cápsula que llena un único hueco concreto',
    },
    sources: [
      { title: 'Oficina de Suplementos Dietéticos del NIH — fichas de vitaminas y minerales', url: 'https://ods.od.nih.gov/factsheets/list-all/' },
      { title: 'Escuela de Salud Pública T.H. Chan de Harvard — vitaminas y suplementos', url: 'https://www.hsph.harvard.edu/nutritionsource/vitamins/' },
    ],
    content: `# ¿De verdad necesitas suplementos de vitaminas?

El pasillo de los suplementos promete salud en un bote, y allí se gastan miles de millones cada año. La evidencia cuenta una historia más matizada: para una persona generalmente sana que sigue una dieta variada, un multivitamínico diario ha mostrado **poco beneficio medible** en estudios grandes; mientras que para personas concretas con carencias concretas, los suplementos dirigidos son genuinamente valiosos, a veces imprescindibles. La habilidad está en distinguir ambas situaciones.

## Por qué los multivitamínicos generales decepcionan

Las vitaminas son sustancias que tu cuerpo necesita en pequeñas cantidades pero que en su mayoría no puede fabricar. La frase clave es *pequeñas cantidades*. Una vez cubiertas tus necesidades —algo fácil con una dieta variada—, el exceso de vitaminas hidrosolubles (las del grupo B, la C) se elimina en gran parte, y las liposolubles (A, D, E, K) se acumulan pero no aportan ningún extra por el exceso. No puedes "rellenar el depósito" hasta una supersalud; pasada la suficiencia, más no hace nada útil, y unas pocas pueden dañar en exceso.

Los grandes ensayos de multivitamínicos en poblaciones bien nutridas no han logrado, por lo general, mostrar reducciones de enfermedad cardíaca, cáncer o mortalidad. Para quien ya come razonablemente, el multivitamínico produce, sobre todo, lo que los investigadores bromean que es orina cara.

## Cuándo los suplementos sí importan

Las excepciones son reales e importantes —dirigidas, no generales:

| Situación | Suplemento a menudo útil |
| --- | --- |
| Poca exposición al sol / latitudes altas | Vitamina D |
| Dieta vegana / vegetariana estricta | Vitamina B12 (no está en los alimentos vegetales) |
| Embarazo o búsqueda de embarazo | Ácido fólico (previene defectos congénitos) |
| Deficiencia diagnosticada (hierro, etc.) | El nutriente concreto, guiado por análisis |
| Personas mayores | La absorción/síntesis de B12 y D disminuye con la edad |
| Dietas restringidas / problemas de malabsorción | Depende de la carencia |

Fíjate en el patrón: un suplemento se gana su lugar al llenar un hueco *conocido* —una restricción dietética, una etapa de la vida, un análisis de sangre—, no por una esperanza general. La vitamina D y la B12 son las más habitualmente útiles para grupos amplios.

## Usar los suplementos con sensatez

Si los tomas: trátalos como rellena-huecos, no como un seguro contra una mala dieta (los alimentos enteros llevan fibra y compuestos beneficiosos que ninguna pastilla reproduce); ten cuidado porque las vitaminas liposolubles y los minerales pueden alcanzar niveles dañinos si te pasas; y recuerda que la industria de los suplementos está poco regulada en muchos países: "natural" no es "comprobado", y la exactitud de la dosis y la pureza varían. En la duda, un análisis de sangre vale más que adivinar.

## Preguntas frecuentes

**¿Puede hacerme daño un multivitamínico?**
Las dosis estándar suelen ser seguras, pero las megadosis pueden dañar: demasiada vitamina A, hierro u otros es genuinamente tóxico. Más no es más seguro.

**¿Obtener las vitaminas de la comida es de verdad mejor que de las pastillas?**
En general sí: la comida aporta los nutrientes en combinaciones y junto con fibra y otros compuestos que las pastillas aisladas no tienen, y la evidencia del beneficio del alimento entero es mucho más sólida que la de los suplementos.

**¿Cómo sé si de verdad tengo una deficiencia?**
Con un análisis de sangre pedido por un profesional clínico, no solo por los síntomas (que suelen ser vagos y solaparse). Adivinar lleva tanto a pastillas innecesarias como a pasar por alto deficiencias reales.${NOTE}`,
  },
  {
    topicKey: 'hydration-myth',
    title: '¿De verdad necesitas 8 vasos de agua al día?',
    question: '¿Es cierta la regla de "8 vasos de agua al día" y cuánta agua necesito en realidad?',
    summary:
      'La famosa regla de los "8 vasos" no tiene una base científica sólida. Las necesidades reales varían con el tamaño corporal, la actividad, el clima y la dieta, y la comida más otras bebidas cuentan. Para la mayoría, la sed y una orina amarillo pálido son mejor guía que cualquier cifra fija.',
    tags: ['salud', 'hidratación', 'agua', 'nutrición'],
    language: 'es',
    image: {
      prompt: promptOf('hydration-myth'),
      alt: 'Un cuerpo en equilibrio hídrico gracias a corrientes procedentes de la comida y de varias bebidas, con un indicador pálido',
    },
    sources: [
      { title: 'Escuela de Salud Pública T.H. Chan de Harvard — agua e hidratación', url: 'https://www.hsph.harvard.edu/nutritionsource/water/' },
      { title: 'Academias Nacionales de EE. UU. — valores de referencia de ingesta de agua', url: 'https://www.nationalacademies.org' },
    ],
    content: `# ¿De verdad necesitas 8 vasos de agua al día?

"Bebe ocho vasos de agua al día" es una de las reglas de salud más repetidas del mundo, y una de las menos respaldadas. Ningún estudio sólido la estableció; parece una cifra que cobró vida propia, posiblemente a partir de una recomendación de hace décadas que además señalaba que *la mayor parte de esa agua viene de la comida*, una salvedad que el eslogan dejó caer. El panorama real es a la vez más flexible y más inteligente que una cuota fija.

## Por qué una sola cifra no puede ser correcta

Las necesidades de agua dependen de variables que difieren enormemente entre personas y días:

- **Tamaño corporal**: una persona grande necesita más que una pequeña.
- **Actividad y sudor**: un entrenamiento duro o el trabajo físico pueden multiplicar las necesidades.
- **Clima**: el calor y el aire seco disparan las pérdidas.
- **Dieta**: frutas, verduras, sopas y la mayoría de los alimentos llevan agua; una dieta rica en vegetales aporta mucha antes de que bebas nada.

Una cifra fija de "8 vasos" ignora todo esto. La misma regla puede dejar a un maratoniano en verano poco hidratado y empujar a una persona pequeña y sedentaria en un clima fresco a beber más de lo que necesita.

## Qué cuenta de verdad (más de lo que crees)

Un mito persistente es que solo el agua sola "cuenta". No funciona así: tu cuerpo extrae agua de casi todo lo que consumes:

| Fuente | ¿Contribuye a la hidratación? |
| --- | --- |
| Agua sola | Sí |
| Té, café | Sí —el líquido supera el leve efecto diurético |
| Leche, zumo, sopa | Sí |
| Frutas y verduras (a menudo 80–95% agua) | Sí, de forma considerable |
| La mayoría de las comidas | Sí |

Por eso la gente cubre sus necesidades sin "beber agua" conscientemente todo el día: la comida y otras bebidas hacen buena parte del trabajo. El café y el té, pese al viejo mito, hidratan en términos netos para quien los consume con regularidad.

## Una guía mejor que contar

Tu cuerpo tiene un sistema de sed finamente ajustado; las personas sanas pueden, en gran medida, **confiar en la sed** en lugar de cumplir una cuota. Dos comprobaciones sencillas superan a cualquier cifra:

- **Sed**: bebe cuando tengas sed; es una señal real, no un signo de que ya estás fallando.
- **Color de la orina**: amarillo pajizo pálido significa bien hidratado; ámbar oscuro significa beber más; transparente con frecuencia puede indicar que te estás pasando.

Algunos grupos deberían ser más deliberados: personas mayores (sed atenuada), deportistas, gente con calor y ciertas afecciones médicas. Y **más no siempre es mejor**: beber muy por encima de lo necesario es incómodo y, en raros casos extremos (beber en exceso durante pruebas de resistencia), diluye peligrosamente el sodio de la sangre.

## Preguntas frecuentes

**¿La deshidratación leve perjudica de verdad la concentración y el ánimo?**
Una deshidratación apreciable sí deteriora la concentración y el ánimo, una buena razón para no ignorar la sed, pero no para forzarte a dar sorbos constantes cuando no tienes sed.

**¿Debo beber antes de sentir sed?**
Para la vida diaria, la sed llega a tiempo para la mayoría. Beber de forma preventiva tiene sentido antes de ejercicio intenso o de exposición al calor, cuando las pérdidas se adelantan a la señal de sed.

**¿Es posible beber demasiada agua?**
Sí, aunque es raro: consumir volúmenes extremos más rápido de lo que los riñones pueden eliminar puede diluir peligrosamente el sodio (hiponatremia). El riesgo célebre está en los deportes de resistencia, no en la vida diaria normal.${NOTE}`,
  },
  {
    topicKey: 'exercise-minimum',
    title: '¿Cuál es el mínimo de ejercicio que de verdad ayuda?',
    question: '¿Cuál es la menor cantidad de ejercicio que aún mejora la salud de forma significativa?',
    summary:
      'Las grandes mejoras de salud empiezan con sorprendentemente poco movimiento: el salto de no hacer nada a hacer un poco es el mayor de todos. Las guías sugieren ~150 minutos de actividad moderada a la semana, pero hasta una fracción supera al cero, y el trabajo de fuerza también importa.',
    tags: ['salud', 'ejercicio', 'forma física', 'bienestar'],
    language: 'es',
    image: {
      prompt: promptOf('exercise-minimum'),
      alt: 'Una escalera donde el primer escalón desde el suelo es el más alto y brillante',
    },
    sources: [
      { title: 'OMS — directrices de actividad física', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity' },
      { title: 'CDC — fundamentos de la actividad física', url: 'https://www.cdc.gov/physical-activity-basics/index.html' },
    ],
    content: `# ¿Cuál es el mínimo de ejercicio que de verdad ayuda?

Si el ejercicio te parece un compromiso de todo o nada en el que no dejas de fracasar, la ciencia tiene buenas noticias: **el ejercicio más valioso que harás jamás es el primer poco, hecho por alguien que no hacía nada.** La curva del beneficio para la salud es más pronunciada en el extremo inferior: pasar de cero a un poco aporta una ganancia proporcional mayor que pasar de mucho a más. No necesitas una cuota de gimnasio ni una hora al día para empezar a recoger beneficios reales.

## Por qué el primer poco es lo que más importa

Los beneficios para la salud no suben en línea recta con el ejercicio; suben deprisa al principio y luego se aplanan. Los estudios sobre actividad y mortalidad muestran de forma constante que **la mayor reducción del riesgo viene de despegar del cero**: la persona antes sedentaria que empieza a caminar con regularidad gana más, en proporción, que la persona activa que añade un sexto entrenamiento semanal. La implicación es liberadora: una actividad imperfecta, modesta y sostenible supera a un plan ambicioso que abandonas.

## Las cifras de las guías (y con qué poco se obtiene la mayor parte del beneficio)

El objetivo más citado para un beneficio sustancial es:

| Actividad | Objetivo semanal |
| --- | --- |
| Aeróbico moderado (caminata rápida, ciclismo suave) | ~150 minutos |
| O aeróbico vigoroso (correr, ciclismo rápido) | ~75 minutos |
| Fortalecimiento muscular | 2+ sesiones/semana |

Pero la misma investigación deja claro que **hacer menos del objetivo igualmente ayuda mucho**: cerca de la mitad de la guía aún rinde gran parte del beneficio, y los estallidos muy cortos cuentan. La evidencia reciente incluso acredita los "snacks de ejercicio" —unos minutos subiendo escaleras, una caminata rápida de 10 minutos— acumulados a lo largo del día. La vieja idea de que el ejercicio tenía que venir en bloques de 30 minutos para contar está obsoleta; **lo que importa es el movimiento total.**

## No olvides la fuerza

La actividad aeróbica acapara los titulares, pero el **fortalecimiento muscular** (entrenamiento de resistencia, ejercicios con el propio peso, cargar cosas pesadas) tiene beneficios propios y cruciales que el cardio no aporta del todo: conservar músculo y hueso, sostener el metabolismo y mantener la autonomía y el equilibrio al envejecer. Dos sesiones cortas a la semana son una pieza de alto valor, a menudo omitida, y no requiere gimnasio.

## Cómo hacer que el mínimo se mantenga

El mejor ejercicio es el que de verdad vas a repetir. Palancas prácticas: engancha el movimiento a hábitos que ya tienes (caminar durante las llamadas, escaleras en vez del ascensor); empieza mucho más pequeño de lo que parece impresionante (una caminata de 10 minutos diaria supera a una hora dos veces por semana); y cuenta la actividad cotidiana: caminar rápido, la jardinería y desplazarte en bici para los recados valen. La constancia se acumula; la intensidad puede llegar después.

## Preguntas frecuentes

**¿Caminar es ejercicio "de verdad"?**
Sí: caminar rápido es actividad de intensidad moderada con beneficios bien documentados para la salud del corazón, el ánimo, la glucosa y la longevidad. Es el ejercicio más infravalorado que existe.

**¿Los 10.000 pasos tienen que ser exactos?**
No: 10.000 es una cifra redonda de origen comercial, no un umbral médico. Los beneficios se acumulan muy por debajo; incluso ~7.000 pasos muestran grandes ganancias frente al sedentarismo. Más es mejor hasta cierto punto, pero la meta no es mágica.

**¿Es demasiado tarde para empezar si soy mayor o estoy en baja forma?**
No: los beneficios aparecen a cualquier edad, y la ganancia proporcional de empezar es mayor para quien parte de menos. Empieza con suavidad, aumenta poco a poco y consulta a un profesional si tienes problemas de salud.${NOTE}`,
  },
  {
    topicKey: 'added-sugar',
    title: 'Por qué el azúcar añadido se trata distinto del azúcar natural',
    question: '¿El azúcar de la fruta es lo mismo que el azúcar añadido y por qué se tratan de forma tan distinta?',
    summary:
      'Químicamente, los azúcares son parecidos, pero el envase lo cambia todo. La fruta entrega el azúcar envuelto en fibra y agua que frenan la absorción; el azúcar añadido llega rápido y concentrado. La diferencia es la dosis y la velocidad, no una molécula distinta.',
    tags: ['salud', 'azúcar', 'nutrición', 'dieta'],
    language: 'es',
    image: {
      prompt: promptOf('added-sugar'),
      alt: 'Luz-azúcar liberada despacio a través de una malla de fibra frente a otra vertida rápida y concentrada',
    },
    sources: [
      { title: 'Escuela de Salud Pública T.H. Chan de Harvard — azúcar añadido', url: 'https://www.hsph.harvard.edu/nutritionsource/carbohydrates/added-sugar-in-the-diet/' },
      { title: 'OMS — directriz sobre la ingesta de azúcares', url: 'https://www.who.int/news/item/04-03-2015-who-calls-on-countries-to-reduce-sugars-intake-among-adults-and-children' },
    ],
    content: `# Por qué el azúcar añadido se trata distinto del azúcar natural

Una objeción habitual al consejo de "reduce el azúcar añadido" suena lógica: *el azúcar es azúcar —la fruta también tiene azúcar—, así que ¿por qué uno está bien y el otro es el villano?* Es una pregunta justa, y la respuesta no es que las moléculas difieran mucho. Es que el **envase** alrededor del azúcar —y la dosis y la velocidad con que llega— cambia por completo cómo lo maneja tu cuerpo. El contexto, no la química, es toda la historia.

## La misma molécula, una entrega distinta

Los azúcares de una manzana y de un refresco son en gran parte los mismos compuestos (glucosa y fructosa). Pero una manzana los entrega envueltos en **fibra, agua y volumen**:

- **La fibra frena la absorción**, así que el azúcar gotea hacia la sangre en lugar de inundarla: una subida más suave, sin el pico y bajón brusco.
- **El agua y el volumen producen saciedad**, así que dejas de comer; la fruta entera es genuinamente difícil de consumir en exceso.
- **Los nutrientes vienen incluidos**: vitaminas, minerales, compuestos vegetales beneficiosos.

Saca el azúcar de ese envase —como en el refresco, los caramelos o incluso el zumo de fruta— y llega rápido, concentrado y fácil de consumir en grandes cantidades sin señal de "parar". Un vaso de zumo puede contener el azúcar de varias piezas de fruta, sin la fibra que hacía que la fruta se autolimitara. **El problema nunca fue la molécula; es la dosis y la velocidad.**

## Por qué el azúcar rápido y concentrado es el problema

Cuando el azúcar inunda deprisa y a menudo, los efectos se acumulan:

| Mecanismo | Consecuencia |
| --- | --- |
| Picos rápidos de glucosa | Bajones de energía, más antojos, sobrecarga a largo plazo de la regulación de la glucosa |
| Sobreconsumo fácil (sin freno de saciedad) | Calorías de sobra → aumento de peso |
| El azúcar líquido en especial | Calorías que no se registran como "comida", así que no comes menos para compensar |
| Desplaza a la comida densa en nutrientes | Menos sitio para lo que tu cuerpo necesita |

Por eso las recomendaciones de salud apuntan a los azúcares **añadidos** y **libres** (los agregados en el procesado, más los de zumos y siropes), y no al azúcar intacto de la fruta y la verdura enteras. La OMS sugiere mantener los azúcares libres por debajo de ~10% de las calorías diarias, idealmente por debajo del 5%, mientras que la fruta entera se fomenta ampliamente.

## La conclusión práctica

No necesitas temer a la fruta. El envase de fibra de la fruta entera hace que su azúcar no sea un problema para casi nadie. El movimiento de alto valor es reducir el azúcar **concentrado y añadido** —en especial las **bebidas azucaradas**, la mayor fuente individual para mucha gente y la más desligada de la saciedad—. Lee las etiquetas buscando azúcares añadidos, trata el zumo más como un capricho que como un alimento saludable y deja que la fruta entera satisfaga las ganas de dulce.

## Preguntas frecuentes

**¿El zumo de fruta es tan malo como el refresco?**
Nutricionalmente más cercano de lo que sugiere su imagen saludable: el zumo tiene el azúcar concentrado sin la fibra, aunque conserva algunas vitaminas. La fruta entera es claramente mejor; el zumo se trata mejor como una bebida ocasional, no como un básico diario.

**¿Los edulcorantes naturales (miel, agave) son más sanos que el azúcar?**
Marginalmente, como mucho: el cuerpo los procesa de forma parecida. Siguen siendo azúcares libres concentrados; "natural" no cambia el problema de la dosis y la velocidad.

**¿Necesito eliminar el azúcar por completo?**
No: el objetivo es reducir el exceso de azúcar concentrado/añadido, no eliminar todo el dulzor. La fruta entera, y caprichos moderados dentro de una dieta por lo demás buena, son perfectamente razonables.${NOTE}`,
  },
  {
    topicKey: 'immune-boosting-myth',
    title: '¿De verdad puedes "reforzar" tu sistema inmunitario?',
    question: '¿Los suplementos o los alimentos pueden de verdad reforzar tu sistema inmunitario o es un mito?',
    summary:
      'No puedes subir la inmunidad como un dial: un sistema inmunitario "reforzado" ni siquiera es deseable (eso son las alergias y las enfermedades autoinmunes). Lo que sí puedes hacer es apoyar la función inmunitaria normal con sueño, nutrición, ejercicio y vacunas.',
    tags: ['salud', 'inmunidad', 'suplementos', 'bienestar'],
    language: 'es',
    image: {
      prompt: promptOf('immune-boosting-myth'),
      alt: 'Una red de defensa interna equilibrada apoyada sobre pilares fundamentales de luz',
    },
    sources: [
      { title: 'Harvard Health — cómo "reforzar" tu sistema inmunitario', url: 'https://www.health.harvard.edu/staying-healthy/how-to-boost-your-immune-system' },
      { title: 'NIH (NIAID) — visión general del sistema inmunitario', url: 'https://www.niaid.nih.gov/research/immune-system-overview' },
    ],
    content: `# ¿De verdad puedes "reforzar" tu sistema inmunitario?

"Reforzar la inmunidad" es una de las frases más lucrativas del marketing del bienestar —estampada en suplementos, infusiones, zumos y polvos—. También es fundamentalmente engañosa. El sistema inmunitario no es un único dial que subes, y aunque pudieras forzarlo, **no querrías hacerlo**: un sistema inmunitario hiperactivo es precisamente lo que causa las alergias, las enfermedades autoinmunes y la inflamación crónica. El objetivo realista y valioso no es *reforzar*; es *apoyar la función normal*.

## Por qué "reforzar" es la palabra equivocada

Tu sistema inmunitario es una red vasta e intrincada —muchos tipos de células, órganos y moléculas de señalización— que equilibra constantemente dos modos de fallo: demasiado débil (las infecciones se cuelan) y demasiado fuerte (ataca a tu propio cuerpo o a cosas inofensivas como el polen). La salud es **equilibrio**, no máxima activación. La imagen de marketing de acelerar la inmunidad hasta el límite describe algo más cercano a una enfermedad que al bienestar.

Y ningún alimento ni pastilla "sobrecarga" este sistema en una persona sana. Una vez que no tienes carencia de los nutrientes que la inmunidad necesita, añadir más no empuja la función por encima de lo normal: la misma lógica de rendimientos decrecientes que con las vitaminas. La idea de megadosis de vitamina C para aplastar un resfriado se ha probado mucho, con efectos en el mejor de los casos modestos e inconsistentes.

## Qué apoya de verdad la función inmunitaria

Los fundamentos poco glamurosos tienen evidencia real: mantienen el sistema funcionando como está diseñado:

| Palanca | Por qué importa |
| --- | --- |
| **Sueño** | Los procesos inmunitarios dependen de él; el sueño corto eleva de forma medible la susceptibilidad a infecciones |
| **Nutrición equilibrada** | Las carencias (p. ej. zinc, vitamina D, proteína) deterioran la defensa —corrige huecos, no megadosifiques |
| **Ejercicio regular** | La actividad moderada apoya la vigilancia inmunitaria; el sobreentrenamiento extremo crónico puede suprimirla |
| **No fumar, limitar el alcohol** | Ambos deterioran las defensas inmunitarias |
| **Gestión del estrés** | El estrés crónico desregula la señalización inmunitaria |
| **Vacunación** | El único "entrenamiento" verdadero y dirigido de la inmunidad —con diferencia, la herramienta más eficaz |

Fíjate en que estos *permiten la función normal y corrigen déficits*: no empujan a un sistema sano más allá de lo normal. No hay margen al alza por encima de "funcionar bien".

## La única manera real de "mejorar" la inmunidad

Si algo merece la palabra, son las **vacunas** —y funcionan de un modo que no se parece en nada a un refuerzo genérico—. Una vacuna *enseña* a tu sistema inmunitario a reconocer de antemano una amenaza concreta, de modo que responda rápida y eficazmente a ese patógeno. Es entrenamiento dirigido, no un mando de volumen: la manera genuina y con respaldo científico de mejorar tu defensa frente a enfermedades concretas.

## Preguntas frecuentes

**¿La vitamina C previene los resfriados?**
Para la mayoría, la suplementación regular no previene los resfriados y, como mucho, los acorta ligeramente. Su reputación supera con creces a la evidencia; no es el escudo que se vende.

**¿Los suplementos "para reforzar la inmunidad" son una estafa?**
La afirmación es engañosa por diseño. Corregir una carencia real ayuda; "reforzar" un sistema ya suficiente es marketing. Ahorra el dinero para el sueño y las verduras —o, frente a enfermedades concretas, para las vacunas—.

**¿Por qué enfermo más cuando estoy estresado o falto de sueño?**
Porque ambos deterioran de verdad la función inmunitaria —es la otra cara de "apoyar"—. No puedes reforzar fácilmente la inmunidad por encima de lo normal, pero sí puedes arrastrarla por debajo, y estas son las vías principales.${NOTE}`,
  },
];
