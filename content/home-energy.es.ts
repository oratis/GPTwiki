import type { DraftArticle } from './types';
import { homeEnergyEn } from './home-energy.en';

const promptOf = (key: string): string => {
  const hit = homeEnergyEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const homeEnergyEs: DraftArticle[] = [
  {
    topicKey: 'ev-vs-gas',
    title: 'Coche eléctrico o de gasolina: ¿cuál te conviene de verdad?',
    question: '¿Debería comprar un coche eléctrico o uno de gasolina, y cuál sale realmente más barato?',
    summary:
      'Los eléctricos cuestan más al comprarlos, pero mucho menos en combustible y mantenimiento, y son más limpios a lo largo de su vida. Los de gasolina ganan en viajes largos, repostaje rápido y precio inicial bajo. La elección depende de cómo conduces y de si puedes cargar en casa.',
    tags: ['hogar', 'energía', 'vehículos eléctricos', 'coches'],
    language: 'es',
    image: { prompt: promptOf('ev-vs-gas'), alt: 'Coche eléctrico tomando luz de un cargador doméstico junto a un coche de gasolina alimentado por combustible' },
    sources: [
      { title: 'Departamento de Energía de EE. UU. / fueleconomy.gov — Coste y emisiones de eléctricos frente a gasolina', url: 'https://www.fueleconomy.gov/feg/evtech.shtml' },
      { title: 'Departamento de Energía de EE. UU. — Reducir la contaminación con vehículos eléctricos', url: 'https://www.energy.gov/eere/electricvehicles/electric-vehicle-basics' },
    ],
    content: `# Coche eléctrico o de gasolina: ¿cuál te conviene de verdad?

La respuesta honesta no es "los eléctricos son mejores" ni "la gasolina es mejor", sino "depende de cómo conduces y de dónde aparcas". Un vehículo eléctrico (VE) y uno de gasolina resuelven el mismo problema de maneras opuestas, y la elección acertada se reduce a unos cuantos hechos concretos de tu vida: cuánto conduces, si puedes cargar en casa y cómo sopesas el precio inicial frente a los costes de uso. Aquí tienes el marco para decidir.

## La historia del coste: precio inicial frente a coste de por vida

El mayor cambio de perspectiva es que un coche tiene *dos* costes —el precio de compra y el de mantenerlo en marcha— y los eléctricos y los de gasolina intercambian sus posiciones en cada uno:

| | Eléctrico (VE) | Gasolina |
| --- | --- | --- |
| Precio de compra | Más alto (aunque bajando, y las ayudas alivian) | Más bajo |
| Coste de "combustible" | Mucho más barato por kilómetro: la electricidad supera a la gasolina, sobre todo cargando en casa | Más alto, y volátil con el precio del petróleo |
| Mantenimiento | Bajo: sin cambios de aceite, muchas menos piezas móviles, los frenos duran más | Más alto: aceite, transmisión, escape, más desgaste |
| Depreciación | Varía según el modelo | Varía según el modelo |

El patrón: un eléctrico suele costar más al *comprarlo* y mucho menos al *mantenerlo*. Que salga ganando en conjunto depende de cuántos kilómetros recorras (cuanto más conduces, más favorece el combustible barato del eléctrico) y de cuánto tiempo lo conserves (cuanto más, más favorece su menor mantenimiento).

## La pregunta decisiva: ¿puedes cargar en casa?

Esto importa más que casi cualquier otra cosa. Si puedes enchufarlo donde aparcas por la noche, un eléctrico es maravillosamente cómodo: "repostas" mientras duermes y casi nunca visitas un cargador público. Si dependes de aparcar en la calle o de plazas de comunidad sin punto de carga, tener un eléctrico se vuelve bastante más difícil, apoyándote en cargadores públicos más lentos y menos predecibles. La carga en casa es esa función discreta que hace o deshace la experiencia con un eléctrico.

## Dónde gana cada uno de verdad

- **El eléctrico gana en:** los desplazamientos diarios y la conducción urbana, los bajos costes de uso, el par instantáneo y silencioso, la carga en casa, las menores emisiones a lo largo de su vida y el mínimo mantenimiento.
- **La gasolina gana en:** los viajes largos frecuentes (repostar en 5 minutos frente a paradas de carga más largas), no disponer de carga en casa, un presupuesto inicial muy ajustado y las zonas con poca infraestructura de carga.

Una regla práctica útil: si la mayor parte de tu conducción es diaria y local y puedes cargar en casa, un eléctrico probablemente encaje y ahorre dinero con el tiempo. Si conduces largas distancias con regularidad o no puedes cargar donde aparcas, un coche de gasolina (o híbrido) quizá siga siendo la opción pragmática.

## Preguntas frecuentes

**¿De verdad son más limpios los eléctricos si la electricidad viene de combustibles fósiles?**
A lo largo de su vida, sí, en casi todas las regiones: los eléctricos son más eficientes y las redes son cada vez más limpias. Los estudios encuentran de forma constante menores emisiones totales que los coches de gasolina comparables, incluso en redes mixtas, y la diferencia crece a medida que avanzan las renovables.

**¿Y la sustitución de la batería?**
Las baterías de los eléctricos modernos están diseñadas para durar la vida del coche y cuentan con muchos años de garantía; la mayoría se degrada despacio, perdiendo una fracción modesta de autonomía a lo largo de una década en lugar de fallar de golpe. Las sustituciones completas son poco comunes dentro de una propiedad típica.

**¿Es un híbrido un buen término medio?**
Para mucha gente, sí: un híbrido reduce el consumo de combustible y el mantenimiento frente a la gasolina pura, no necesita infraestructura de carga y evita la preocupación por la autonomía, mientras que un híbrido enchufable añade trayectos cortos solo en eléctrico. Es un puente sensato si un eléctrico completo todavía no encaja con tu aparcamiento o tus viajes.`,
  },
  {
    topicKey: 'how-solar-panels-work',
    title: '¿Cómo funcionan los paneles solares? ¿Y merecen la pena?',
    question: '¿Cómo generan electricidad realmente los paneles solares y resultan rentables?',
    summary:
      'Los paneles solares convierten la luz del sol directamente en electricidad mediante el efecto fotovoltaico, sin piezas móviles. Que sean rentables depende de tu sol, los precios de la luz, el tejado y las ayudas; en muchos sitios se amortizan en años y luego funcionan gratis durante décadas.',
    tags: ['hogar', 'energía', 'solar', 'electricidad'],
    language: 'es',
    image: { prompt: promptOf('how-solar-panels-work'), alt: 'La luz del sol arrancando cargas en un panel que fluyen como corriente hacia una casa' },
    sources: [
      { title: 'Departamento de Energía de EE. UU. — ¿Cómo funciona la energía solar?', url: 'https://www.energy.gov/eere/solar/how-does-solar-work' },
      { title: 'NREL (Laboratorio Nacional de Energías Renovables de EE. UU.) — Fundamentos fotovoltaicos', url: 'https://www.nrel.gov/research/re-photovoltaics.html' },
    ],
    content: `# ¿Cómo funcionan los paneles solares? ¿Y merecen la pena?

Un panel solar hace algo silenciosamente extraordinario: convierte la luz del sol *directamente* en electricidad, sin piezas móviles, sin combustible y sin ruido. No hay turbina girando ni nada que arda: solo luz que incide sobre un material especial y electricidad que sale por el otro lado. Entender la física sencilla hace mucho más fácil responder con honestidad a la pregunta práctica: "¿me resultará rentable?".

## El efecto fotovoltaico, en palabras llanas

Los paneles solares están hechos de células **fotovoltaicas** ("luz-electricidad"), normalmente de silicio. El hecho clave sobre estas células: cuando la luz incide sobre el silicio, su energía arranca electrones. La célula se construye con un desequilibrio eléctrico interno que empuja a esos electrones liberados a fluir en una dirección, y electrones fluyendo en una dirección *es* una corriente eléctrica. Así que entra luz del sol y sale electricidad, directamente. Cuanto más brillante la luz, más electrones fluyen y más energía produce el panel.

La electricidad que producen los paneles es corriente continua (CC), así que un dispositivo llamado **inversor** la convierte en la corriente alterna (CA) que usan tu casa y la red. Eso es básicamente todo el sistema: paneles, un inversor y una conexión al cableado de tu casa.

## Qué decide si "merecen la pena"

Aquí es donde importa la honestidad: la solar se amortiza de maravilla en algunas situaciones y despacio en otras. Las variables:

| Factor | Por qué importa |
| --- | --- |
| **Luz del sol** | Más sol (y un tejado orientado al sur y sin sombra) = más generación |
| **Precio de la luz** | Cuanto más pagas a la compañía, más ahorra cada kWh que tú mismo produces |
| **Coste inicial y ayudas** | Las deducciones fiscales, las subvenciones y la financiación cambian mucho las cuentas |
| **Tejado** | Orientación, inclinación, sombra, antigüedad y tamaño, todo cuenta |
| **Normas de balance neto** | Si tu compañía te compensa de forma justa por el excedente que viertes |

La forma de pensarlo: la solar es un gran coste inicial que luego produce electricidad casi gratis durante **más de 25 años** (los paneles suelen tener garantía de en torno a ese tiempo). Si el coste inicial dividido entre tu ahorro anual da una amortización de, digamos, 6 a 10 años, todo lo posterior es beneficio, a menudo un rendimiento sólido. En regiones de poco sol, precios bajos o instalación cara, la amortización se alarga y el argumento se debilita.

## Una imagen realista

La solar rara vez te lleva del todo "fuera de la red" salvo que añadas baterías caras: la mayoría de los sistemas domésticos siguen conectados a la red, tomando de ella por la noche y vertiendo el excedente de día. Y los paneles pierden solo una pizca de producción al año, así que un panel de 25 años todavía funciona bien. La tecnología es madura y de bajo mantenimiento; la verdadera pregunta es casi siempre la economía para *tu* tejado y tus tarifas, no si funciona.

## Preguntas frecuentes

**¿Funcionan los paneles solares en días nublados o en invierno?**
Sí, solo que menos. Funcionan con luz, no con calor, así que siguen generando en días nubosos (con menos producción) y de hecho prefieren condiciones frescas y soleadas. El frío no es el enemigo; la sombra y los días cortos de invierno sí.

**¿Necesito baterías?**
No para beneficiarte: la mayoría de los sistemas usan la red como "batería virtual" mediante el balance neto, guardando el excedente diurno para usarlo de noche. Las baterías añaden energía de respaldo durante los cortes y más autosuficiencia, pero con un coste extra considerable; son opcionales, no obligatorias.

**¿Qué mantenimiento necesitan?**
Muy poco: sin piezas móviles. Una limpieza ocasional si se acumula polvo o polen, y puede que el inversor haya que sustituirlo una vez durante la vida del sistema. Por lo demás, en su mayoría se quedan ahí y trabajan.`,
  },
  {
    topicKey: 'heat-pumps',
    title: 'La bomba de calor explicada: calefacción y refrigeración en un solo aparato',
    question: '¿Qué es una bomba de calor y cómo puede calentar una casa usando menos energía de la que produce?',
    summary:
      'Una bomba de calor no fabrica calor: lo transporta, bombeando calidez del aire exterior (incluso del aire frío) hacia tu casa, e invirtiéndose en verano para refrigerar. Como mover calor es mucho más eficiente que fabricarlo, puede entregar varias unidades de calor por cada unidad de electricidad.',
    tags: ['hogar', 'energía', 'bomba de calor', 'calefacción'],
    language: 'es',
    image: { prompt: promptOf('heat-pumps'), alt: 'Una bomba de calor recogiendo una calidez tenue del aire frío exterior hacia una casa cálida' },
    sources: [
      { title: 'Departamento de Energía de EE. UU. — Sistemas de bomba de calor', url: 'https://www.energy.gov/energysaver/heat-pump-systems' },
      { title: 'ENERGY STAR — Bombas de calor', url: 'https://www.energystar.gov/products/heat_pumps' },
    ],
    content: `# La bomba de calor explicada: calefacción y refrigeración en un solo aparato

Una bomba de calor suena a que tiene que romper las leyes de la física: puede entregar más energía térmica a tu casa que la energía eléctrica que consume. El truco es que **una bomba de calor no *crea* calor: lo *mueve***. Y mover calor de un sitio a otro requiere mucha menos energía que generarlo desde cero. En cuanto captas esa única idea, toda la tecnología —y por qué gobiernos y expertos en energía están tan entusiasmados con ella— cobra sentido.

## Mover el calor, no fabricarlo

Aquí está la parte contraintuitiva: incluso el aire frío contiene energía térmica (solo se siente "frío" en relación contigo). Una bomba de calor usa un refrigerante en circulación y un compresor para **recoger** esa calidez difusa del aire exterior, concentrarla y liberarla dentro de casa. Es la misma tecnología básica que tu nevera o tu aire acondicionado, que sacan calor *fuera* de un espacio frío; la bomba de calor simplemente lo hace en la dirección útil, llevando el calor *hacia dentro* de tu casa.

Como reubica calor existente en vez de quemar combustible o usar una resistencia, una bomba de calor puede ser notablemente eficiente: una buena entrega aproximadamente **3 unidades de calor por cada 1 unidad de electricidad** que usa. Un calefactor eléctrico tradicional, en cambio, nunca puede superar el 1 a 1: solo puede convertir la electricidad en una cantidad igual de calor. Esa brecha de eficiencia es justo el quid de la cuestión.

## Una máquina, dos estaciones

El segundo truco de la bomba de calor es que es **reversible**. En verano simplemente funciona al revés: recoge calor del *interior* de tu casa y lo vierte fuera, que es exactamente lo que hace un aire acondicionado. Así que un solo sistema calienta en invierno y refrigera en verano, sustituyendo a una caldera y un aire acondicionado por separado. En parte por eso las bombas de calor son cada vez más la recomendación por defecto para la climatización del hogar.

## Salvedades honestas

- **Climas muy fríos:** las bombas de calor antiguas perdían eficiencia con el frío intenso, pero los modelos modernos "para clima frío" funcionan bien incluso a temperaturas bajo cero; el rendimiento sí baja a medida que hace un frío extremo, necesitando a veces calor de apoyo los días más duros.
- **Coste inicial:** la instalación puede costar más que una caldera o un aire acondicionado básicos, aunque los costes de uso y las ayudas a menudo lo compensan con el tiempo.
- **Es un aparato eléctrico:** su coste de uso y sus emisiones dependen de tu precio de la luz y de lo limpia que sea tu red.

Aun así, para la mayoría de los hogares en la mayoría de los climas, una bomba de calor es hoy una de las maneras más eficientes y rentables de estar cómodo todo el año.

## Preguntas frecuentes

**¿Funciona una bomba de calor cuando hace menos de cero grados?**
Las bombas de calor modernas para clima frío sí: siguen extrayendo calor aprovechable del aire muy frío, solo que con menos eficiencia a medida que se desploman las temperaturas. Con frío extremo puede entrar en juego una fuente de calor de respaldo, pero la bomba de calor hace el grueso del trabajo la mayor parte del año.

**¿Es más barata de usar que una caldera de gas?**
A menudo, por su eficiencia, pero depende de los precios locales de la luz frente al gas. Donde la electricidad tiene un precio razonable (o tienes solar), las bombas de calor suelen ganar en coste de uso y siempre ganan en poder refrigerar también.

**¿Cuál es la diferencia entre una bomba de calor aerotérmica y una geotérmica?**
Las aerotérmicas recogen calor del aire exterior y son más baratas de instalar. Las geotérmicas toman de la temperatura más estable del subsuelo —más eficientes, pero mucho más caras de instalar porque requieren tuberías enterradas.`,
  },
  {
    topicKey: 'home-insulation',
    title: 'Por qué el aislamiento es la mejor inversión energética de tu casa',
    question: '¿Por qué es tan importante el aislamiento de la vivienda, y de verdad merece su coste?',
    summary:
      'El aislamiento frena el calor que se escapa sin parar de tu casa en invierno y el que entra en verano, de modo que la calefacción y la refrigeración trabajan menos. Suele ser la mejora energética más barata y rentable: ahorra dinero cada año y hace las habitaciones más confortables.',
    tags: ['hogar', 'energía', 'aislamiento', 'eficiencia'],
    language: 'es',
    image: { prompt: promptOf('home-insulation'), alt: 'Una casa envuelta en una manta luminosa que retiene la calidez, con huecos por donde se fuga la luz' },
    sources: [
      { title: 'Departamento de Energía de EE. UU. — Aislamiento', url: 'https://www.energy.gov/energysaver/insulation' },
      { title: 'ENERGY STAR — Sella y aísla tu casa', url: 'https://www.energystar.gov/saveathome/seal_insulate' },
    ],
    content: `# Por qué el aislamiento es la mejor inversión energética de tu casa

La mayoría piensa en la factura energética en términos de los aparatos que *fabrican* calor o frío: la caldera, el aire acondicionado. Pero hay un factor más discreto que a menudo importa más: con qué rapidez ese calor o ese frío **se fugan de vuelta**. El aislamiento es ese material poco vistoso de tus paredes, tejado y suelos cuyo único trabajo es frenar esa fuga. Con frecuencia es la mejora del hogar más barata con la mayor amortización y la más fiable, y funciona en silencio, cada hora de cada día, durante toda la vida del edificio.

## El calor siempre fluye hacia el frío

La física de fondo es sencilla e implacable: **el calor siempre se mueve de lo más cálido a lo más frío**. En invierno, la calidez que pagaste por crear escapa sin cesar a través de tus paredes, tejado y ventanas hacia el frío exterior. En verano, el calor de fuera se cuela sin parar *hacia dentro*. Tus sistemas de calefacción y refrigeración no solo crean confort: libran una fuga interminable. El aislamiento no detiene del todo ese flujo (nada lo hace), pero lo *frena* drásticamente, de modo que tus sistemas se encienden menos a menudo y queman menos energía para mantener la temperatura.

Un modelo mental útil: el aislamiento es una manta para tu casa. Una manta no genera calor; solo frena que se escape el calor que produce tu cuerpo, para que estés caliente con menos esfuerzo. El aislamiento del hogar hace exactamente lo mismo a escala de edificio.

## Por qué es tan buena inversión

- **Trabaja de forma constante y para siempre.** A diferencia de un aparato, el aislamiento no tiene coste de uso, ni piezas móviles, ni se desgasta. Instálalo una vez, ahorra cada año durante décadas.
- **Recorta la factura de calefacción *y* la de refrigeración.** La misma barrera que retiene el calor en invierno lo mantiene fuera en verano.
- **Mejora el confort, no solo el coste.** Las habitaciones bien aisladas tienen menos corrientes frías y puntos calientes y mantienen una temperatura estable.
- **Las victorias baratas llegan primero.** Sellar las fugas de aire (huecos alrededor de puertas, ventanas y pasos de instalaciones) y reforzar el aislamiento del desván suelen ser de bajo coste y alto impacto: el calor sube, así que el tejado suele ser la prioridad.

## Dónde poner el foco

No todo el aislamiento rinde igual. Las mayores y más baratas ganancias suelen ser: **sellar las fugas de aire** (una casa con corrientes derrocha energía por muy grueso que sea el aislamiento), luego el **desván/tejado** (por donde se escapa hacia arriba la mayor parte del calor), y después paredes y suelos. La eficacia del aislamiento se mide por su "valor R" —cuanto más alto, más resistencia al flujo de calor— y los niveles recomendados varían según el clima. El principio general vale en todas partes: una envolvente hermética y bien aislada permite que un sistema de calefacción y refrigeración más pequeño y barato de usar te mantenga cómodo.

## Preguntas frecuentes

**¿No es malo para la calidad del aire sellar una casa demasiado?**
Puede reducir el intercambio de aire fresco, así que las casas muy herméticas combinan el sellado con una ventilación controlada. Aun así, para la mayoría de las casas el problema mayor es ser demasiado permeables; sellar los peores huecos mejora el confort y la eficiencia sin perjudicar la calidad del aire.

**¿Cuál es el paso más rentable?**
Normalmente sellar el aire más aislar el desván. Son relativamente baratos, a menudo aptos para hacerlo uno mismo, y apuntan a donde más energía escapa. Mucha gente nota una reducción apreciable de la factura solo con esto.

**¿Ayuda el aislamiento también en climas cálidos?**
Por supuesto: frena que el calor de fuera se cuele hacia dentro, recortando el coste del aire acondicionado. La "manta" funciona en ambas direcciones; mantener el calor *fuera* es tan valioso como retenerlo dentro.`,
  },
  {
    topicKey: 'led-vs-incandescent',
    title: 'LED frente a incandescente: por qué los LED se impusieron',
    question: '¿Por qué son tan superiores las bombillas LED a las viejas incandescentes?',
    summary:
      'Las viejas bombillas incandescentes desperdician en torno al 90 % de su energía en forma de calor, y hacen luz casi por accidente. Los LED producen luz de forma directa y eficiente, usan una fracción de la energía y duran muchas más veces, por eso reemplazaron a la bombilla centenaria.',
    tags: ['hogar', 'energía', 'iluminación', 'eficiencia'],
    language: 'es',
    image: { prompt: promptOf('led-vs-incandescent'), alt: 'Una vieja bombilla caliente y derrochadora junto a un LED frío y eficiente que produce luz limpia' },
    sources: [
      { title: 'Departamento de Energía de EE. UU. — Iluminación LED', url: 'https://www.energy.gov/energysaver/led-lighting' },
      { title: 'ENERGY STAR — Bombillas', url: 'https://www.energystar.gov/products/light_bulbs' },
    ],
    content: `# LED frente a incandescente: por qué los LED se impusieron

Durante más de un siglo, la bombilla funcionó gracias a un accidente genial: calentar algo hasta que brille. Eso es la bombilla incandescente, y resulta que es un calefactor estupendo y un pésimo fabricante de luz. El LED la reemplazó no por un empujón de marketing, sino porque es fundamentalmente mejor en el único trabajo que tiene una bombilla: convertir electricidad en luz en lugar de en calor desperdiciado. La diferencia es lo bastante grande como para haber acabado con una tecnología de 100 años en apenas una década.

## Hacer luz frente a hacer calor

Una bombilla **incandescente** hace pasar electricidad por un hilo fino (filamento) hasta que se pone tan caliente que brilla con luz blanca. La luz es real, pero es casi un efecto secundario del calor: aproximadamente el **90 % de la energía se convierte en calor, y solo en torno al 10 % en luz visible**. Estás pagando sobre todo por calentar la habitación y obtienes luz de propina. Por eso una bombilla vieja quema al tocarla.

Un **LED** (diodo emisor de luz) hace luz de una manera completamente distinta: la electricidad pasa por un material semiconductor especial que emite luz *directamente*, con muy poco calor. No hay filamento caliente ni brillo por accidente, solo una conversión eficiente de electricidad en luz. El resultado es que un LED produce el mismo brillo que una bombilla vieja usando solo una pequeña fracción de la energía.

## Los números que zanjaron el debate

| | Incandescente | LED |
| --- | --- | --- |
| Energía → luz | ~10 % (el resto es calor) | La gran mayoría |
| Energía para un brillo similar | Alta | En torno a un 75–85 % menos |
| Vida útil | ~1.000 horas | ~15.000–25.000+ horas |
| Calor emitido | Caliente | De fresco a templado |
| Coste a lo largo del tiempo | Barata de comprar, cara de usar | Cuesta más al comprarla, mucho más barata en conjunto |

Un LED cuesta un poco más en la estantería, pero usa mucha menos electricidad y dura *muchas más veces*, así que a lo largo de su vida es muchísimo más barato: compras menos bombillas y pagas mucho menos por usarlas. Multiplica eso por cada portalámparas de una casa y el ahorro es considerable.

## Cómo elegir bien los LED

Dos cosas confunden a quien se pasa a los LED. Primero, el brillo ahora se mide en **lúmenes**, no en vatios: los vatios miden el consumo de energía, y los LED usan tan pocos que la vieja regla de "60 vatios = este brillo" ya no aplica; mira los lúmenes para el brillo. Segundo, los LED vienen en distintas **temperaturas de color** (medidas en kelvin): los números bajos (~2700 K) dan una luz cálida y amarillenta como las bombillas viejas; los altos (~5000 K) dan una luz "de día" fría y blanco-azulada. Elige la calidez que te guste; la eficiencia es excelente en ambos casos.

## Preguntas frecuentes

**¿Merece la pena reemplazar bombillas que aún funcionan por LED?**
A menudo sí en las luces de uso frecuente: el ahorro de energía puede amortizar la bombilla nueva rápidamente, y la reemplazarás muchas menos veces. Para la bombilla de un trastero que apenas se usa, es menos urgente.

**¿De verdad duran tanto los LED?**
Los de calidad sí, aunque las unidades baratas y una mala gestión del calor pueden acortar su vida. Los LED también tienden a atenuarse poco a poco en lugar de fundirse de golpe. Comprar bombillas de marcas fiables importa más que con la tecnología antigua.

**¿Fue alguna vez útil el calor de la bombilla vieja?**
Marginalmente, en habitaciones frías, pero es una manera tremendamente ineficiente de calentar, e inútil (incluso contraproducente) en verano cuando estás refrigerando. Como fuente de luz, el calor era casi puro derroche.`,
  },
  {
    topicKey: 'induction-cooking',
    title: 'Cómo funcionan las placas de inducción (y por qué son tan rápidas)',
    question: '¿Cómo calienta la comida una placa de inducción y es mejor que el gas o la eléctrica?',
    summary:
      'Las placas de inducción calientan la propia sartén directamente mediante un campo magnético, saltándose el paso derrochador de calentar antes una resistencia. Por eso son más rápidas, eficientes y precisas, y más frescas y seguras en la cocina, con una pega: las sartenes deben ser magnéticas.',
    tags: ['hogar', 'energía', 'cocina', 'cocción'],
    language: 'es',
    image: { prompt: promptOf('induction-cooking'), alt: 'Anillos magnéticos luminosos calentando una sartén directamente mientras la placa permanece fría' },
    sources: [
      { title: 'Departamento de Energía de EE. UU. — Cocción eficiente y la inducción', url: 'https://www.energy.gov/energysaver/energy-efficient-cooking' },
      { title: 'ENERGY STAR — Electrodomésticos de cocción', url: 'https://www.energystar.gov/' },
    ],
    content: `# Cómo funcionan las placas de inducción (y por qué son tan rápidas)

Si alguna vez has visto el agua hervir a una velocidad casi asombrosa en una placa de inducción —o has tocado la superficie junto a la sartén y la has encontrado fría— has presenciado el premio de un truco ingenioso de física. A diferencia del gas o de las placas eléctricas tradicionales, una placa de inducción no calienta una resistencia y luego pasa ese calor a la sartén. **Calienta la propia sartén, directamente**, saltándose al intermediario. Esa única diferencia es la razón de que la inducción sea más rápida, más eficiente y más segura.

## Calentar la sartén, no la placa

Bajo la lisa superficie de vidrio de una placa de inducción hay una bobina de hilo. Al encenderla, la electricidad que circula por esa bobina crea un **campo magnético** que cambia rápidamente. Cuando colocas encima una sartén magnética, ese campo induce corrientes eléctricas en remolino *dentro del propio metal de la sartén*, y la resistencia de la sartén a esas corrientes hace que se caliente. En otras palabras, la placa convierte el fondo de tu sartén en el elemento calefactor.

La superficie de la placa apenas se calienta por sí misma: solo se templa por el contacto con la sartén caliente que tiene encima. Por eso a menudo puedes tocar con seguridad la zona alrededor de la sartén, y por eso lo que se derrama no se quema sobre el vidrio.

## Por qué esto es mejor

| Ventaja | Por qué ocurre |
| --- | --- |
| **Velocidad** | La energía va directa a la sartén, así que el agua hierve notablemente más rápido |
| **Eficiencia** | Apenas se desperdicia calor calentando el aire, la resistencia o la cocina |
| **Precisión** | Los cambios de potencia son casi instantáneos, como el gas pero más controlables |
| **Seguridad y confort** | La superficie se mantiene relativamente fría; sin llama, menos calor residual en la cocina |
| **Limpieza fácil** | Lo que se derrama no se carboniza sobre una superficie fría |

Como el gas pierde mucho calor en el aire de alrededor y las resistencias eléctricas tradicionales desperdician energía calentándose primero a sí mismas, la inducción lleva más de su energía a la comida, lo que la convierte en la más eficiente de los tipos comunes de placa.

## La única pega real

La inducción solo funciona con **menaje magnético**: sartenes a las que se pega el imán de tu cocina, como el hierro fundido y la mayoría del acero inoxidable. El aluminio, el cobre y el vidrio no funcionan salvo que tengan una base magnética. La prueba rápida: si un imán se aferra con firmeza al fondo de la sartén, funcionará en inducción. Para algunas personas, el cambio implica reemplazar unas cuantas ollas favoritas, que es el principal obstáculo para adoptarla.

## Preguntas frecuentes

**¿Es la inducción lo mismo que una placa eléctrica vitrocerámica normal?**
No: se parecen pero funcionan distinto. Una placa eléctrica "vitro" normal calienta una resistencia bajo el vidrio que luego calienta la sartén (el vidrio se pone muy caliente). La inducción calienta la sartén directamente y se mantiene mucho más fría. Parecidas por fuera, muy distintas por dentro.

**¿Funcionará con mis sartenes actuales?**
Solo si son magnéticas. Acerca un imán al fondo: si se pega con firmeza, sí. El hierro fundido y la mayoría del acero inoxidable funcionan; el aluminio puro, el cobre y el vidrio no, salvo que estén etiquetados como compatibles con inducción.

**¿Consume mucha electricidad?**
Usa la electricidad de forma eficiente: llega más energía a la comida que con el gas o la resistencia eléctrica, así que para lo que cocinas suele ser la opción más económica y rápida, sobre todo para hervir y calentar deprisa.`,
  },
  {
    topicKey: 'home-battery',
    title: 'Baterías domésticas: ¿de verdad salen rentables?',
    question: '¿Qué hace una batería doméstica y merece su elevado coste?',
    summary:
      'Una batería doméstica almacena electricidad —de la solar o de la red barata en horas valle— para usarla luego. Su mayor valor real es el respaldo durante los cortes y el autoconsumo solar; el puro ahorro en la factura todavía rara vez justifica por sí solo el coste, aunque eso está cambiando.',
    tags: ['hogar', 'energía', 'batería', 'solar'],
    language: 'es',
    image: { prompt: promptOf('home-battery'), alt: 'Una batería de pared almacenando luz solar del día para dar energía a una casa de noche' },
    sources: [
      { title: 'Departamento de Energía de EE. UU. — Almacenamiento de energía en el hogar', url: 'https://www.energy.gov/energysaver/articles/should-you-get-battery-storage-your-home-solar-system' },
      { title: 'NREL — Fundamentos del almacenamiento en baterías', url: 'https://www.nrel.gov/research/energy-storage.html' },
    ],
    content: `# Baterías domésticas: ¿de verdad salen rentables?

Una batería doméstica es exactamente lo que parece: una gran batería recargable, normalmente montada en una pared o en el garaje, que almacena electricidad para usarla más tarde. El reclamo es atractivo: guarda tu propia energía solar, mantén las luces encendidas durante los cortes, esquiva la cara electricidad en horas punta. Pero las baterías domésticas también son caras, y que "salgan rentables" depende mucho de *por qué* la quieres. La respuesta honesta separa los tres trabajos distintos que puede hacer una batería.

## Qué hace en realidad una batería doméstica

Una batería almacena energía y la libera a demanda. En una casa se carga de una de dos fuentes —el **excedente de energía solar** generado durante el día, o la **electricidad barata de la red** en horas valle— y luego descarga esa energía almacenada cuando la necesitas: de noche, durante las caras horas punta o cuando se cae la red. Es un colchón entre el momento en que la energía es barata o abundante y el momento en que de verdad la usas.

## Las tres razones por las que la gente compra una, ordenadas por lo bien que se amortizan

| Razón | Cómo de bien se amortiza |
| --- | --- |
| **Respaldo durante los cortes** | El valor más claro: si los cortes son frecuentes o te salen caros, el valor de la batería está en la resiliencia, no en las cuentas de la factura |
| **Aprovechar más tu propia solar** | Buena si tu compañía paga poco por la solar vertida: la batería te deja autoconsumir en vez de vender barato y recomprar caro |
| **Puro arbitraje de tarifa** (almacenar barato, usar en punta) | Lo más difícil de justificar solo por el ahorro hoy: el ahorro a menudo no cubre el coste de la batería dentro de su vida, aunque va mejorando |

La idea clave: el argumento **financiero** de una batería (ahorrar dinero) suele ser más débil que su argumento de **resiliencia** (respaldo) o su argumento de **autoconsumo solar**. Si la compras puramente para bajar la factura, echa cuentas con cuidado: el ahorro anual frente al coste inicial a menudo implica una amortización cercana a la vida de la batería o más allá. Si valoras mantener el suministro durante los cortes, o tu solar vertida renta poco, la propuesta de valor es mucho más fuerte.

## Qué está cambiando

Los precios de las baterías siguen bajando, y en más sitios las compañías están pasando a tarifas según la hora que premian desplazar tu consumo, ambas cosas mejoran la economía con el tiempo. Emparejar una batería con la solar es además el encaje más natural, ya que te deja guardar la energía diurna que generaste para usarla tras el anochecer, sobre todo donde el balance neto se ha vuelto menos generoso.

## Preguntas frecuentes

**¿Puede una batería doméstica sacarme por completo de la red?**
Rara vez en la práctica: irse del todo fuera de la red requiere un banco de baterías grande y caro más suficiente solar para cubrir el peor tiempo, sin margen de error. La mayoría de las baterías domésticas están diseñadas para trabajar *con* la red, no para reemplazarla.

**¿Cuánto dura una batería doméstica?**
Normalmente con garantía de en torno a 10 años, y se degradan poco a poco como cualquier batería de litio, perdiendo capacidad despacio en vez de fallar de golpe. Ten en cuenta esa vida útil en cualquier cálculo de amortización.

**¿Necesito solar para tener una batería?**
No: una batería puede cargarse con electricidad barata de la red en horas valle para respaldo o para desplazar la factura. Pero las baterías y la solar forman una pareja natural, ya que la batería resuelve la principal limitación de la solar: que solo genera durante el día.`,
  },
  {
    topicKey: 'smart-thermostat',
    title: '¿De verdad ahorran dinero los termostatos inteligentes?',
    question: '¿Qué hace un termostato inteligente y de verdad reduce la factura energética?',
    summary:
      'Un termostato inteligente automatiza la calefacción y la refrigeración —programando, detectando cuándo no estás y aprendiendo tus hábitos— para que dejes de pagar por climatizar una casa vacía. El ahorro es real pero modesto, y proviene sobre todo del hábito que vuelve sin esfuerzo.',
    tags: ['hogar', 'energía', 'hogar inteligente', 'eficiencia'],
    language: 'es',
    image: { prompt: promptOf('smart-thermostat'), alt: 'Un termostato de pared detectando una habitación vacía y reduciendo su salida' },
    sources: [
      { title: 'ENERGY STAR — Termostatos inteligentes', url: 'https://www.energystar.gov/products/smart_thermostats' },
      { title: 'Departamento de Energía de EE. UU. — Termostatos', url: 'https://www.energy.gov/energysaver/thermostats' },
    ],
    content: `# ¿De verdad ahorran dinero los termostatos inteligentes?

La calefacción y la refrigeración suelen ser el mayor trozo de la factura energética de un hogar, y gran parte de esa energía se desperdicia manteniendo a la temperatura perfecta una casa *vacía*, o calentando a tope mientras todos duermen bajo las mantas. El propósito entero de un termostato inteligente es detener ese derroche automáticamente. El veredicto honesto: sí, ahorra dinero, pero el ahorro es **modesto, no mágico**, y proviene de volver sin esfuerzo los buenos hábitos, no de ninguna magia productora de energía.

## Qué lo hace "inteligente"

Un termostato tradicional solo mantiene la temperatura que fijaste hasta que la cambias. Un termostato inteligente añade automatización:

- **Programación:** baja automáticamente la calefacción/refrigeración por la noche y cuando sueles estar fuera, y devuelve la casa al confort antes de que vuelvas.
- **Detección de presencia:** detecta cuándo la casa está vacía (por la ubicación del móvil o sensores de movimiento) y se relaja, y luego se reactiva cuando vuelves.
- **Aprendizaje:** algunos modelos aprenden tus patrones y preferencias con el tiempo y se ajustan por sí solos.
- **Control remoto e información:** ajusta desde el móvil y consulta informes de consumo que revelan en qué estás gastando.

Nada de esto *crea* eficiencia como lo hacen el aislamiento o una bomba de calor. Lo que hace es aplicar de forma fiable el hábito gratuito más eficaz —**no climatizar un espacio que no estás usando**— sin que tengas que acordarte.

## De dónde sale el ahorro (y cuánto es)

El ahorro central es el "retroceso": dejar que la temperatura derive hacia las condiciones del exterior cuando nadie necesita confort, y recuperarla justo a tiempo. Hacerlo a mano ahorra la misma energía, pero casi nadie lo hace con constancia, que es justo el hueco que llena un termostato inteligente. El ahorro en el mundo real suele ser una porción apreciable pero no espectacular de los costes de climatización; los programas energéticos citan a menudo en torno a un **8–15 %** en calefacción y refrigeración, variando mucho según tu clima, tus hábitos y lo derrochador que fueras antes.

Así que el aparato se amortiza en unos pocos años para muchos hogares, más rápido si ahora climatizas mucho una casa vacía, más lento si ya eres diligente o rara vez estás fuera.

## ¿Te merece la pena a ti?

- **Buen encaje:** sueles estar fuera a horas predecibles, tiendes a "ponerlo y olvidarte", tus facturas son altas o te gusta el control remoto y los datos.
- **Encaje más débil:** ya eres disciplinado con un termostato programable, estás en casa la mayor parte del día a temperatura constante, o tus costes de climatización son pequeños de partida.

El confort y la comodidad —una casa cálida esperándote al llegar, el control desde la cama— son ventajas reales más allá del ahorro en euros, y a menudo el motivo mayor por el que la gente está contenta con ellos.

## Preguntas frecuentes

**¿Ahorrará dinero si estoy en casa todo el día?**
Menos: el mayor ahorro viene de relajarse mientras la casa está vacía. Si siempre estás en casa a temperatura estable, el ahorro se encoge, aunque programar retrocesos nocturnos sigue ayudando.

**¿Necesito uno para ahorrar energía?**
No: un termostato programable básico (o simplemente ajustar a mano) captura casi el mismo ahorro si eres disciplinado. El valor de la versión inteligente está en automatizarlo para que el ahorro ocurra de verdad.

**¿Merece el ahorro su precio?**
Para muchos hogares, sí, en unos pocos años, sobre todo con facturas altas o ausencias frecuentes. Trata el ahorro energético como el suelo y la comodidad como el extra; si nunca te molestarías en hacer retrocesos a mano, la automatización es donde se gana su sueldo.`,
  },
  {
    topicKey: 'ev-charging-explained',
    title: 'La carga del coche eléctrico explicada: niveles, velocidades y ansiedad de autonomía',
    question: '¿Cómo funciona la carga de un eléctrico? ¿Cuáles son los niveles y cuánto tarda?',
    summary:
      'La carga del eléctrico viene en tres velocidades: el lento Nivel 1 desde un enchufe normal, el más rápido Nivel 2 para casa y trabajo, y la rápida carga en corriente continua para viajes. La mayor parte se hace despacio en casa por la noche, por eso el día a día casi nunca implica esperar.',
    tags: ['hogar', 'energía', 'vehículos eléctricos', 'carga'],
    language: 'es',
    image: { prompt: promptOf('ev-charging-explained'), alt: 'Tres tamaños de cargador llenando una batería a distintas velocidades, además de la carga doméstica nocturna' },
    sources: [
      { title: 'Departamento de Energía de EE. UU. — Cargar en casa e infraestructura de carga', url: 'https://www.energy.gov/eere/electricvehicles/charging-home' },
      { title: 'Centro de Datos de Combustibles Alternativos del Departamento de Energía de EE. UU. — Niveles de carga de eléctricos', url: 'https://afdc.energy.gov/fuels/electricity_charging_home.html' },
    ],
    content: `# La carga del coche eléctrico explicada: niveles, velocidades y ansiedad de autonomía

El mayor obstáculo mental para quien se plantea un coche eléctrico es la carga: se siente desconocida y lenta comparada con un repostaje de dos minutos. Pero en cuanto entiendes los tres "niveles" de carga y, lo crucial, *dónde* ocurre la carga en el día a día, la mayoría de la preocupación se disuelve. El cambio de perspectiva clave: no conduces hasta un cargador y esperas. Para la mayoría de los dueños de un eléctrico, el coche se carga mientras está aparcado y ellos están haciendo otra cosa, normalmente durmiendo.

## Los tres niveles de carga

La velocidad de carga de un eléctrico viene en tres escalones, definidos por cuánta potencia entregan:

| Nivel | Fuente | Velocidad | Mejor para |
| --- | --- | --- | --- |
| **Nivel 1** | Enchufe doméstico estándar | El más lento: unos pocos kilómetros de autonomía por hora | Recargas nocturnas, híbridos enchufables, conductores de poco kilometraje |
| **Nivel 2** | Circuito de 240 V (como una secadora); estaciones domésticas y públicas | Mucho más rápido: una carga completa por la noche, o unas horas | El caballo de batalla diario: casa, trabajo, comercios |
| **Carga rápida en CC** | Estaciones públicas de alta potencia | Veloz: en torno a 20–40 min para una buena recarga | Viajes y conducción de larga distancia |

La forma más sencilla de recordarlo: el **Nivel 1** es un goteo desde un enchufe normal, el **Nivel 2** es el estándar práctico de casa o público que rellena el coche con holgura por la noche, y la **carga rápida en CC** es la opción de viaje que añade mucha autonomía en lo que dura un café.

## Por qué la carga diaria no es como repostar

Aquí está la idea que derrota la "ansiedad de autonomía": los coches de gasolina llegan casi vacíos y luego se llenan del todo en una estación. Los eléctricos funcionan al revés: **recargas poco y a menudo**, sobre todo en casa. Enchufa al aparcar por la noche y te despiertas "lleno" cada mañana, sin hacer nunca un viaje especial. Para la conducción diaria típica, puedes pasar semanas sin visitar un cargador público. La carga rápida es para la excepción —los viajes largos—, no para la rutina.

Por eso importa tanto la carga en casa (mira la decisión de eléctrico frente a gasolina): si puedes enchufar donde aparcas, la carga se vuelve invisible. Si no puedes, te apoyas más en la carga de Nivel 2 en el trabajo o en estaciones públicas, lo cual es viable pero menos cómodo.

## Entender la carga rápida en los viajes

En un viaje, la carga rápida en CC añade un buen trozo de autonomía deprisa, pero hay dos peculiaridades que sorprenden a los novatos. Primero, **la carga se ralentiza a medida que la batería se llena** (es más rápida de poca carga hasta en torno al 80 %, y luego se reduce a propósito para proteger la batería), así que la gente carga hasta ~80 % y sigue en vez de esperar al 100 %. Segundo, la velocidad de carga depende tanto de la potencia de la estación como de la tasa máxima de aceptación del coche: gana la más lenta de las dos. Planifica los viajes en torno a las ubicaciones de cargadores rápidos y las paradas coinciden más o menos con los descansos que harías de todos modos.

## Preguntas frecuentes

**¿Cuánto tarda en cargar de verdad?**
En casa con Nivel 2, toda la noche: nunca esperas, solo lo desenchufas por la mañana. En un viaje con carga rápida en CC, en torno a 20–40 minutos para una recarga sustancial. El Nivel 1 desde un enchufe normal es lento y mejor como goteo nocturno para conductores de poco uso.

**¿Desgastará la carga mi batería?**
La carga rutinaria está bien. La carga rápida en CC frecuente y cargar habitualmente al 100 % añaden un poco de desgaste extra, por eso mucha gente carga a diario hasta en torno al 80 % y reserva las cargas completas y la rápida para los viajes. Las baterías modernas gestionan esto bien.

**¿Y si no puedo cargar en casa?**
Sigue siendo viable mediante la carga en el trabajo, el Nivel 2 público y los cargadores rápidos —mucha gente lo hace—, pero es menos fluido. Si cargar en casa no es posible, sopesa lo cómoda que es la carga cercana antes de comprar.`,
  },
  {
    topicKey: 'reading-energy-bill',
    title: 'Cómo leer (y de verdad reducir) tu factura de la luz',
    question: '¿Cómo entiendo mi factura de la luz y qué la baja de verdad?',
    summary:
      'Tu factura te cobra por la energía consumida, medida en kilovatios-hora, a menudo más cuotas fijas y tarifas por horas. El mayor ahorro viene de tus mayores consumos —calefacción, refrigeración, agua caliente—, no de desenchufar cacharros pequeños. Aquí está cómo encontrarlos y recortarlos.',
    tags: ['hogar', 'energía', 'electricidad', 'ahorrar dinero'],
    language: 'es',
    image: { prompt: promptOf('reading-energy-bill'), alt: 'Una factura de la luz como gráfico de barras donde unos pocos grandes consumos dominan sobre muchos diminutos' },
    sources: [
      { title: 'EIA de EE. UU. (Administración de Información Energética) — Entender el uso de la electricidad y las facturas', url: 'https://www.eia.gov/energyexplained/use-of-energy/homes.php' },
      { title: 'Departamento de Energía de EE. UU. — Guía para ahorrar energía', url: 'https://www.energy.gov/energysaver/energy-saver' },
    ],
    content: `# Cómo leer (y de verdad reducir) tu factura de la luz

Una factura de la luz puede parecer una confusión deliberada: kilovatios-hora, término de potencia, peajes de distribución, tarifas por tramos horarios. Pero bajo la jerga es sencilla: pagas por la energía que usas, más unos costes fijos por estar conectado. En cuanto sabes leerla, puedes apuntar a las pocas cosas que de verdad la mueven, y evitar malgastar esfuerzo en las muchas que no. La mayoría de la gente se fija en el extremo equivocado de la factura.

## La única unidad que importa: el kilovatio-hora

El consumo de electricidad se mide en **kilovatios-hora (kWh)**: básicamente, cuánta potencia consume algo multiplicada por cuánto tiempo funciona. Un aparato de 1.000 vatios funcionando una hora consume un kWh. Tu factura es sobre todo: (kWh consumidos) × (precio por kWh), a menudo **más una cuota fija mensual** solo por estar conectado (por eso usar *menos* no llevará la factura a cero). Muchas compañías también añaden el **transporte/distribución** como conceptos aparte, y algunas cobran **tarifas distintas a distintas horas del día** (tarifa por tramos), donde la electricidad es más cara en las horas punta de demanda.

Saber esto te dice de inmediato las dos formas de pagar menos: **usar menos kWh**, o **usarlos cuando son más baratos** (si tienes una tarifa por tramos).

## Encuentra los grandes consumos, ignora los diminutos

El principio más útil para recortar una factura: **unos pocos grandes consumos dominan, y muchos pequeños apenas cuentan**. En la mayoría de los hogares, los gigantes son:

- **Calefacción y refrigeración** (a menudo el mayor de todos)
- **Calentar agua**
- **Grandes electrodomésticos** (nevera, secadora, horno)
- **Cualquier cosa que fabrique calor o frío**: empequeñecen a la electrónica

Mientras tanto, los cargadores del móvil y los cacharros en reposo (consumos "fantasma") son reales pero pequeños. Obsesionarse con desenchufar un cargador mientras se ignora un aire acondicionado viejo e ineficiente o se climatiza una casa vacía es optimizar el extremo equivocado. Ve a por las barras grandes primero.

## Qué reduce de verdad la factura

| Alto impacto (los grandes consumos) | Bajo impacto (parece productivo, ahorra poco) |
| --- | --- |
| Ajustar las temperaturas de climatización; aislar; sellar fugas | Desenchufar cargadores de móvil |
| Climatización eficiente (p. ej. una bomba de calor) | Apagar antes una sola bombilla LED |
| Bajar la temperatura del calentador; duchas calientes más cortas | Preocuparse por el reposo de un reloj |
| Pasar el uso intensivo a horas valle (en tarifas por tramos) | — |
| Electrodomésticos eficientes; lavavajillas/secadora a carga completa | — |
| Iluminación LED | — |

Dos movimientos infravalorados: comprueba si una **tarifa distinta** (p. ej. por tramos) encaja con tus hábitos, y usa los **datos de consumo** de tu compañía o un medidor de enchufe para ver adónde van de verdad tus kWh: adivinar suele estar mal, y los datos apuntan directos a los grandes objetivos.

## Preguntas frecuentes

**¿Por qué mi factura es alta aunque intento ahorrar?**
Normalmente porque los grandes consumos —calefacción, refrigeración, agua caliente— dominan, y los pequeños ahorros en otros sitios no los compensan. Revisa esos primero, y busca una cuota fija de conexión y los vaivenes estacionales (aire en verano, calefacción en invierno) que los hábitos pequeños no arreglan.

**¿Importan de verdad los consumos fantasma/en reposo?**
Son reales pero menores para la mayoría de los hogares: una pequeña porción de la factura. Vale una regleta inteligente para un grupo de aparatos electrónicos, pero no vale la pena estresarse mientras un consumo mucho mayor sigue sin control. Prioriza por tamaño.

**¿Merece la pena pasarse a la tarifa por tramos?**
Puede ahorrar dinero *si* puedes desplazar el uso intensivo (lavadora, lavavajillas, carga del eléctrico, preenfriar) a las horas valle. Si tu consumo cae inevitablemente en las horas punta, puede salir más caro: contrasta tu patrón con los tramos de la tarifa antes de cambiar.`,
  },
];
