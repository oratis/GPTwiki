import type { DraftArticle } from './types';
import { everydayScienceEn } from './everyday-science.en';

// Lote: Everyday Science (versión nativa en español). Mismos títulos y
// topicKey que everyday-science.en.ts; el contenido está redactado de forma
// nativa para lectores hispanohablantes. Las imágenes se comparten.

const promptOf = (key: string): string => {
  const hit = everydayScienceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const everydayScienceEs: DraftArticle[] = [
  {
    topicKey: 'why-sky-is-blue',
    title: '¿Por qué el cielo es azul?',
    question: '¿Por qué el cielo es azul durante el día y rojo al atardecer?',
    summary:
      'La luz del sol es blanca —una mezcla de todos los colores—, pero el aire dispersa sus longitudes de onda azules, más cortas, mucho más que las rojas, y pinta de azul todo el cielo. Al atardecer la luz atraviesa más aire, el azul se dispersa y solo llegan los rojos y naranjas.',
    tags: ['ciencia', 'física', 'luz', 'naturaleza'],
    language: 'es',
    image: { prompt: promptOf('why-sky-is-blue'), alt: 'Luz blanca atravesando una atmósfera de cristal y dispersando sus rayos azules' },
    sources: [
      { title: 'NASA Science — ¿Por qué el cielo es azul?', url: 'https://spaceplace.nasa.gov/blue-sky/en/' },
      { title: 'NOAA — Dispersión de la luz y óptica atmosférica', url: 'https://www.noaa.gov/' },
    ],
    content: `# ¿Por qué el cielo es azul?

El cielo es azul por un tira y afloja entre la luz del sol y el aire. La luz solar parece blanca, pero en realidad es una mezcla de todos los colores del arcoíris juntos. A medida que esa luz se derrama a través de la atmósfera, las moléculas de gas del aire la **dispersan** —la desvían en nuevas direcciones— y aquí está el dato clave: dispersan las longitudes de onda cortas, las azules, mucho más que las largas, las rojas. Así que la luz azul queda esparcida por todo el cielo, y cuando levantas la vista, el azul te llega desde todas las direcciones. Toda la bóveda brilla azul.

## La física, con calma

La luz viaja como ondas, y los colores se diferencian por su **longitud de onda**: la luz roja tiene ondas largas, el azul y el violeta las tienen cortas. Cuando la luz choca con algo mucho más pequeño que su longitud de onda —como una sola molécula de nitrógeno u oxígeno— se dispersa de un modo que favorece con fuerza las longitudes de onda más cortas. El efecto (llamado dispersión de Rayleigh, por el físico que lo explicó) es notable: la luz azul se dispersa varias veces más que la roja. El cielo es, en esencia, luz azul que ha rebotado por la atmósfera incontables veces antes de llegar a tu ojo.

## Dos preguntas que surgen de inmediato

**Si el azul se dispersa más, ¿por qué el cielo no es violeta?** El violeta tiene una longitud de onda aún más corta y se dispersa todavía más, pero para empezar hay menos violeta en la luz solar, y tus ojos son más sensibles al azul que al violeta. La mezcla que percibe tu cerebro acaba en el azul.

**¿Por qué el sol mismo se ve amarillento?** Porque el azul ha sido dispersado *fuera* del haz directo. La luz que viene en línea recta desde el sol ha cedido parte de su azul al cielo, y deja el disco con un aspecto blanco amarillento.

## Por qué los atardeceres se vuelven rojos

Al atardecer el sol está bajo, así que su luz roza una **capa de atmósfera mucho más gruesa** para llegar hasta ti. A lo largo de ese trayecto tan largo, prácticamente todo el azul (y buena parte del verde) se dispersa fuera del haz antes de llegar. Lo que queda para alcanzar tus ojos son las longitudes de onda largas —rojos y naranjas—, y por eso el sol poniente y las nubes a su alrededor arden en colores cálidos. La misma dispersión que vuelve azul el mediodía vuelve rojo el atardecer; lo único que cambió es la longitud del trayecto.

## Preguntas frecuentes

**¿Por qué el cielo es negro en el espacio?**
Porque no hay aire que disperse la luz del sol. Los astronautas ven el sol y las estrellas sobre un fondo negro puro, incluso de día: sin atmósfera, no hay azul.

**¿Esto explica por qué el océano es azul?**
En parte es distinto. El azul del cielo se refleja en el agua, pero el agua profunda también *absorbe* la luz roja y dispersa la azul por su cuenta, así que el océano es azul por razones que se solapan.

**¿Por qué las nubes son blancas y no azules?**
Las gotitas de las nubes son mucho mayores que las moléculas del aire, así que dispersan *todos* los colores más o menos por igual. Todos los colores mezclados de nuevo se ven blancos.`,
  },
  {
    topicKey: 'how-vaccines-work',
    title: '¿Cómo funcionan realmente las vacunas?',
    question: '¿Cómo entrenan las vacunas al sistema inmunitario para protegernos?',
    summary:
      'Una vacuna le muestra a tu sistema inmunitario un anticipo inofensivo de un germen para que aprenda a reconocerlo de antemano. Luego construye células de memoria que recuerdan la amenaza durante años, de modo que una infección real se derrota rápido, a menudo antes de que te sientas enfermo.',
    tags: ['ciencia', 'biología', 'sistema inmunitario', 'salud'],
    language: 'es',
    image: { prompt: promptOf('how-vaccines-work'), alt: 'Centinelas inmunitarios estudiando una réplica inofensiva de un germen y guardando insignias de memoria' },
    sources: [
      { title: 'CDC (Centros para el Control de Enfermedades) — Cómo funcionan las vacunas', url: 'https://www.cdc.gov/vaccines/hcp/conversations/understanding-vacc-work.html' },
      { title: 'OMS (Organización Mundial de la Salud) — ¿Cómo funcionan las vacunas?', url: 'https://www.who.int/news-room/feature-stories/detail/how-do-vaccines-work' },
    ],
    content: `# ¿Cómo funcionan realmente las vacunas?

Una vacuna funciona **enseñando a tu sistema inmunitario a reconocer un germen antes de que llegues a encontrarte con el real.** Tu sistema inmunitario ya es brillante combatiendo infecciones, pero la primera vez que se topa con un germen nuevo es lento, aprendiendo sobre la marcha mientras tú enfermas. Una vacuna se salta esa peligrosa primera lección: le muestra a tu cuerpo un anticipo seguro de la amenaza, de modo que si el germen real aparece alguna vez, tus defensas ya saben exactamente qué hacer y lo aplastan rápido.

## Qué hay realmente en el anticipo

Una vacuna contiene algo que *se parece* a un germen concreto a ojos de tu sistema inmunitario, pero que **no puede enfermarte.** Según la vacuna, eso puede ser:

- Una versión debilitada o inactivada del germen,
- Solo un fragmento inofensivo de él (una proteína de superficie), o
- Instrucciones (como el ARNm) que le dicen a tus propias células que fabriquen brevemente un fragmento inofensivo del germen para que tu sistema inmunitario lo estudie.

En todos los casos el principio es idéntico: presentar al sistema inmunitario la "forma" reconocible del germen (un antígeno) sin el peligro.

## Reconocer, responder, recordar

Cuando tu sistema inmunitario ve este antígeno, hace tres cosas:

1. Lo **reconoce** como extraño.
2. **Responde** produciendo anticuerpos —proteínas hechas a medida para aferrarse a ese germen concreto— y activando células que destruyen las células infectadas.
3. Lo **recuerda**, creando **células de memoria** de larga vida.

Ese tercer paso es la clave de todo. Esas células de memoria pueden persistir durante años o décadas. Si el germen real invade alguna vez, lo reconocen al instante y desencadenan una respuesta rápida y masiva, que a menudo derrota la infección antes de que notes ningún síntoma. Conseguiste la inmunidad sin tener que sobrevivir primero a la enfermedad.

## Por qué a veces hace falta más de una dosis, y por qué un brazo dolorido es normal

Algunas vacunas necesitan varias dosis o refuerzos porque la memoria inmunitaria puede reforzarse con la exposición repetida, o puede desvanecerse con el tiempo y necesitar un repaso. Y el leve dolor, cansancio o febrícula que algunas personas sienten después no es el germen: es tu sistema inmunitario *haciendo su trabajo*, intensificando su respuesta ante el anticipo. Una reacción es señal de que el entrenamiento funciona, no de que estés enfermo.

## Preguntas frecuentes

**¿Puede una vacuna provocarme la enfermedad que previene?**
Las vacunas estándar no pueden causar la enfermedad: no contienen ningún germen vivo capaz de hacerlo (o solo una forma debilitada que no enferma a las personas sanas). Lo que puedes sentir es la respuesta inmunitaria, no una infección.

**¿Qué es la "inmunidad de grupo"?**
Cuando suficientes personas de una comunidad son inmunes, al germen le cuesta encontrar nuevos huéspedes y propagarse, lo que protege indirectamente a quienes no pueden vacunarse (recién nacidos, personas con ciertas enfermedades). La protección se vuelve colectiva.

**¿Por qué algunas vacunas duran toda la vida y otras necesitan refuerzos?**
Depende del germen y de lo duradera que sea la respuesta de memoria, y de si el germen muta (como la gripe) lo suficiente para que el entrenamiento del año pasado ya no encaje con la versión de este año. Algunas amenazas son estables; otras cambian sin parar.`,
  },
  {
    topicKey: 'why-seasons-happen',
    title: '¿Qué causa realmente las estaciones?',
    question: '¿Qué causa las estaciones? ¿Es porque la Tierra está más cerca del sol en verano?',
    summary:
      'Las estaciones no se deben a la distancia al sol, un mito muy común. Ocurren porque la Tierra está inclinada sobre su eje, así que cada hemisferio se inclina hacia el sol medio año (verano) y se aleja la otra mitad (invierno), cambiando cuán directamente incide la luz solar en el suelo.',
    tags: ['ciencia', 'astronomía', 'tierra', 'naturaleza'],
    language: 'es',
    image: { prompt: promptOf('why-seasons-happen'), alt: 'Un globo inclinado con la luz solar incidiendo de lleno en un hemisferio y de forma rasante en el otro' },
    sources: [
      { title: 'NASA Science — ¿Qué causa las estaciones?', url: 'https://spaceplace.nasa.gov/seasons/en/' },
      { title: 'NOAA — La inclinación de la Tierra y las estaciones', url: 'https://www.noaa.gov/' },
    ],
    content: `# ¿Qué causa realmente las estaciones?

Aclaremos de entrada el error científico más común: **las estaciones no se deben a que la Tierra se acerque o se aleje del sol.** De hecho, la Tierra está ligeramente *más cerca* del sol en enero, durante el invierno del hemisferio norte. Si la distancia fuera la causa, todo el planeta tendría verano e invierno al mismo tiempo. Pero no es así: cuando es verano en Australia, es invierno en Canadá. La verdadera causa es la **inclinación** de la Tierra.

## La inclinación lo es todo

La Tierra gira sobre un eje inclinado unos 23,5 grados respecto a su órbita alrededor del sol. Esa inclinación apunta siempre en la misma dirección del espacio durante todo el año mientras la Tierra rodea al sol. Así que en media órbita el hemisferio norte se inclina *hacia* el sol, y en la otra mitad se inclina *en sentido contrario*, y el hemisferio sur hace lo opuesto. Ese único hecho produce todo lo que llamamos estaciones.

## Por qué la inclinación calienta o enfría

Inclinarse hacia el sol cambia el clima de dos maneras que se refuerzan entre sí:

- **Lo directa que es la luz solar.** Cuando tu hemisferio se inclina hacia el sol, la luz incide en el suelo de forma más **directa**, concentrada, como una linterna apuntando hacia abajo en vertical. Cuando se inclina en sentido contrario, esa misma luz incide con un **ángulo rasante**, repartida finamente sobre más superficie, así que cada porción de suelo recibe menos energía. La luz directa calienta mucho más eficazmente que la luz oblicua.
- **La duración del día.** La inclinación también significa que el sol está por encima del horizonte **más tiempo** en verano, así que hay más horas de calentamiento y menos horas de enfriamiento nocturno.

Más luz concentrada, durante más horas al día, suma verano. Luz oblicua durante menos horas suma invierno.

## Por qué esto explica todo lo demás

- **Hemisferios opuestos, estaciones opuestas:** cuando el norte se inclina hacia el sol, el sur se aleja, así que sus estaciones están siempre invertidas.
- **El ecuador apenas tiene estaciones:** se mantiene más o menos de lado al sol todo el año, así que la luz es siempre bastante directa, de ahí su calor constante.
- **Los polos tienen meses de luz o de oscuridad:** la inclinación extrema hace que en verano el sol nunca se ponga del todo y en invierno nunca salga del todo.

## Preguntas frecuentes

**¿Entonces la distancia de la Tierra al sol no hace nada?**
Su órbita es solo ligeramente ovalada, así que el cambio de distancia es pequeño y queda eclipsado por el efecto de la inclinación. No es cero, pero es una influencia menor comparada con el ángulo de la luz solar.

**¿Por qué el tiempo más caluroso suele llegar después del día más largo?**
Este "retardo estacional" ocurre porque la tierra y los océanos tardan semanas en absorber el calor y calentarse. El máximo de luz solar entrante es el solsticio, pero el máximo de calor acumulado llega uno o dos meses más tarde.

**¿Qué es un solsticio o un equinoccio?**
Los solsticios son los dos momentos de máxima inclinación hacia el sol o en sentido contrario (los días más largo y más corto); los equinoccios son los dos momentos intermedios en que la inclinación queda de lado y el día y la noche son casi iguales en todas partes.`,
  },
  {
    topicKey: 'why-we-dream',
    title: '¿Por qué soñamos?',
    question: '¿Por qué soñamos y significan algo realmente los sueños?',
    summary:
      'Nadie conoce la respuesta completa, pero la ciencia más sólida sugiere que los sueños no son aleatorios: parecen ayudar al cerebro a consolidar recuerdos, procesar emociones y ensayar situaciones. Los sueños más vívidos ocurren en el sueño REM, cuando el cerebro está casi tan activo como despierto.',
    tags: ['ciencia', 'neurociencia', 'sueño', 'cerebro'],
    language: 'es',
    image: { prompt: promptOf('why-we-dream'), alt: 'Un cerebro dormido brillando mientras reproduce y archiva fragmentos de memoria por emoción' },
    sources: [
      { title: 'Instituto Nacional de Trastornos Neurológicos y Accidentes Cerebrovasculares (NIH) — El cerebro: el sueño', url: 'https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-understanding-sleep' },
      { title: 'Sleep Foundation — ¿Por qué soñamos?', url: 'https://www.sleepfoundation.org/dreams' },
    ],
    content: `# ¿Por qué soñamos?

Primero, la respuesta honesta: **la ciencia no sabe del todo por qué soñamos**, es una de las verdaderas preguntas abiertas sobre el cerebro. Pero "no lo sabemos todo" no significa "no sabemos nada". Los investigadores tienen teorías sólidas y respaldadas por pruebas, y apuntan en una dirección coherente: los sueños probablemente no son ruido sin sentido. Parecen ser un subproducto —o incluso una función— del mantenimiento nocturno esencial que tu cerebro realiza mientras duermes.

## Cuándo ocurren los sueños

El sueño pasa por varias fases, y los sueños más vívidos y con forma de historia se concentran en una fase llamada **REM** (movimientos oculares rápidos), cuando —curiosamente— tu cerebro está casi tan activo como cuando estás despierto, aunque tu cuerpo queda temporalmente paralizado (lo que convenientemente te impide representar los sueños). Pasas por la fase REM varias veces por noche, y los periodos REM se alargan hacia la mañana, por eso a menudo despiertas en mitad de un sueño. También sueñas en fases no REM más ligeras, pero esos sueños suelen ser más vagos.

## Las principales teorías

Ninguna teoría se ha impuesto, y puede que todas tengan parte de razón:

| Teoría | La idea |
| --- | --- |
| **Consolidación de la memoria** | Soñar ayuda a ordenar las experiencias del día, reforzando los recuerdos importantes y podando el resto |
| **Procesamiento emocional** | Los sueños permiten revivir y desactivar sucesos emocionales en un estado seguro y "fuera de línea" |
| **Ensayo de amenazas/social** | Soñar simula desafíos (peligros, situaciones sociales) para que estés mejor preparado ante los reales |
| **El cerebro dando sentido al ruido** | Durante el REM el cerebro se activa de forma casi aleatoria, y los sueños son su intento de tejer una historia con esa actividad |

Fíjate en que estas teorías se solapan en lugar de competir: el cerebro podría estar archivando recuerdos, procesando emociones *y* tejiendo una narración con la actividad, todo a la vez.

## ¿"Significan" algo los sueños?

No en el sentido adivinatorio: no hay pruebas de que los sueños predigan el futuro ni de que lleven símbolos ocultos universales. Pero tampoco son aleatorios: el contenido de los sueños se nutre en gran medida de tus experiencias, preocupaciones y emociones recientes, así que un sueño puede reflejar genuinamente lo que tienes en mente. El significado, cuando lo hay, es personal y emocional, no un código que descifrar con un "diccionario de los sueños".

## Preguntas frecuentes

**¿Por qué olvido los sueños tan rápido?**
El cerebro no da prioridad a guardar los sueños en la memoria a largo plazo, y la química del sueño REM no es ideal para formar recuerdos. Los sueños se desvanecen a los pocos minutos de despertar, a menos que los repases de inmediato, por eso "funciona" tener una libreta junto a la cama.

**¿Todo el mundo sueña?**
Casi con seguridad sí: se cree que quienes dicen no soñar nunca simplemente no lo recuerdan. Los estudios del sueño muestran actividad REM incluso en personas que afirman no soñar.

**¿Para qué sirven las pesadillas?**
Pueden ser el sistema de procesamiento emocional o de ensayo de amenazas funcionando a toda máquina, a menudo desencadenado por estrés o trauma. Las pesadillas ocasionales son normales; las frecuentes y angustiosas pueden merecer la atención de un profesional.`,
  },
  {
    topicKey: 'how-planes-fly',
    title: '¿Cómo se mantienen los aviones en el aire?',
    question: '¿Cómo generan los aviones pesados suficiente sustentación para volar?',
    summary:
      'Un ala genera sustentación desviando el aire hacia abajo: por la tercera ley de Newton, empujar el aire hacia abajo empuja el ala hacia arriba. Su forma e inclinación hacen además que el aire de encima fluya más rápido y a menor presión. Juntos sostienen toneladas de metal en el aire.',
    tags: ['ciencia', 'física', 'vuelo', 'cómo funciona'],
    language: 'es',
    image: { prompt: promptOf('how-planes-fly'), alt: 'Un ala desviando hacia abajo un flujo de aire luminoso mientras una fuerza de sustentación la eleva' },
    sources: [
      { title: 'NASA Glenn — Cómo el ala eleva el avión / Dinámica del vuelo', url: 'https://www.grc.nasa.gov/www/k-12/airplane/lift1.html' },
      { title: 'NASA — Las cuatro fuerzas del vuelo', url: 'https://www.nasa.gov/audience/foreducators/k-4/features/F_Four_Forces_of_Flight.html' },
    ],
    content: `# ¿Cómo se mantienen los aviones en el aire?

Parece casi increíble que algo tan pesado como un avión de pasajeros cargado pueda flotar sobre el aire ligero, pero el principio es física sólida. La misión de un ala es generar **sustentación**, una fuerza hacia arriba lo bastante grande para vencer el peso del avión, y lo logra con un truco fundamental: **empuja el aire hacia abajo.** Por la tercera ley de Newton —toda acción tiene una reacción igual y opuesta—, empujar una enorme cantidad de aire *hacia abajo* hace que el aire empuje el ala *hacia arriba*. Quédate con esa idea y el resto son detalles.

## Dos maneras de describir la misma sustentación

Los físicos explican la sustentación de un ala desde dos ángulos que, en el fondo, coinciden:

- **La visión de Newton (el aire se desvía hacia abajo).** Un ala está ligeramente inclinada y conformada de modo que el aire que pasa junto a ella se curva **hacia abajo** al abandonar el borde de salida. El ala lanza un chorro continuo de aire hacia abajo; la fuerza de reacción empuja el ala hacia arriba. Cuanto más aire se desvía, o cuanto más fuerte se desvía, mayor es la sustentación.
- **La visión de la presión (aire más rápido, menor presión).** Por la forma y el ángulo del ala, el aire fluye **más rápido por encima** que por debajo. El aire que se mueve más deprisa tiene *menor presión* (principio de Bernoulli), así que hay más presión empujando hacia arriba desde abajo que empujando hacia abajo desde arriba: una fuerza neta hacia arriba.

No son explicaciones rivales; son dos descripciones coherentes de un mismo fenómeno. Ambas suceden, y ambas producen la misma sustentación.

## Qué controla cuánta sustentación

Tres palancas, todas las cuales usan pilotos y diseñadores:

- **Velocidad:** un flujo de aire más rápido sobre el ala significa mucha más sustentación, por eso los aviones deben acelerar por una pista larga antes de poder despegar, y por eso aterrizan despacio con ayuda extra.
- **Superficie y forma del ala:** las alas más grandes mueven más aire; el perfil curvo está afinado para desviar el aire con eficiencia.
- **Ángulo de ataque:** inclinar el morro del ala hacia el flujo de aire aumenta la sustentación, hasta cierto punto. Si se inclina demasiado, el flujo suave se desprende, la sustentación se desploma y el ala "entra en pérdida".

Por eso también ves los flaps desplegarse de las alas durante el despegue y el aterrizaje: agrandan y recurvan temporalmente el ala para exprimir sustentación extra a baja velocidad.

## Preguntas frecuentes

**¿Era falsa la vieja explicación de que "la parte de arriba es más larga, así que el aire debe acelerar para mantener el ritmo"?**
Esa historia popular (la idea del "tiempo de tránsito igual") es una simplificación excesiva y defectuosa: el aire de arriba realmente va más rápido, pero no por esa razón, y las alas incluso vuelan boca abajo. El núcleo fiable es: las alas desvían el aire hacia abajo y la presión es menor por arriba.

**¿Qué mantiene el avión avanzando?**
Los motores proporcionan **empuje**, venciendo la **resistencia** (la resistencia del aire). La sustentación combate el peso; el empuje combate la resistencia. El vuelo es el equilibrio de esas cuatro fuerzas.

**¿Cómo vuelan los planeadores sin motor?**
Cambian altitud por velocidad, descendiendo suavemente por el aire para que el flujo siga produciendo sustentación, y aprovechan las corrientes de aire ascendente para recuperar altura. No necesitan motor, solo el movimiento del aire.`,
  },
  {
    topicKey: 'why-ice-floats',
    title: '¿Por qué flota el hielo (cuando casi todo lo demás se hunde)?',
    question: '¿Por qué flota el hielo en el agua, si la mayoría de los sólidos se hunden en su propio líquido?',
    summary:
      'El agua es rara: se expande al congelarse. Sus moléculas se traban en un cristal abierto y espacioso por los puentes de hidrógeno, lo que hace al hielo un 9 % menos denso que el agua líquida, así que flota. Por eso los lagos se congelan de arriba abajo y la vida sobrevive al invierno debajo.',
    tags: ['ciencia', 'química', 'agua', 'naturaleza'],
    language: 'es',
    image: { prompt: promptOf('why-ice-floats'), alt: 'Una red hexagonal abierta de hielo flotando sobre moléculas de agua líquida muy juntas' },
    sources: [
      { title: 'USGS (Servicio Geológico de EE. UU.) — La densidad del agua y el hielo', url: 'https://www.usgs.gov/special-topics/water-science-school/science/water-density' },
      { title: 'Real Sociedad de Química (Reino Unido) — Los puentes de hidrógeno en el agua', url: 'https://edu.rsc.org/' },
    ],
    content: `# ¿Por qué flota el hielo (cuando casi todo lo demás se hunde)?

El hielo flotando en tu bebida es tan familiar que es fácil pasar por alto lo *raro* que es. Para casi cualquier otra sustancia de la Tierra, la forma sólida es **más densa** que la líquida: deja caer cera sólida en cera fundida y se hunde. El agua rompe esta regla: el agua sólida (el hielo) es **menos** densa que el agua líquida, así que flota. La razón es una propiedad peculiar de la molécula de agua, y esa peculiaridad resulta ser una de las razones por las que la vida en la Tierra sobrevive al invierno.

## La densidad, en una frase

Que algo flote se reduce a la **densidad**: cuánta masa hay empaquetada en un espacio dado. Flotas si eres menos denso que el líquido que te rodea; te hundes si eres más denso. Así que la verdadera pregunta es: ¿por qué la congelación hace que el agua se *expanda* y se vuelva menos densa, cuando la congelación hace que la mayoría de las cosas se contraigan?

## La arquitectura abierta del hielo

Las moléculas de agua tienen la carga ligeramente desequilibrada, lo que les permite agarrarse entre sí con unas atracciones débiles llamadas **puentes de hidrógeno.** En el agua líquida, las moléculas se empujan, se deslizan y se empaquetan bastante juntas sin parar. Pero cuando el agua se congela, esos puentes de hidrógeno traban las moléculas en un cristal rígido y muy **ordenado**, y lo crucial es que ese cristal es *espacioso*. Para satisfacer todos sus enlaces, las moléculas se disponen en una red hexagonal abierta con huecos integrados en la estructura. Las moléculas del hielo están, de hecho, *más separadas* de media que en el agua líquida.

Más espacio entre las mismas moléculas significa menos masa por volumen: el hielo es alrededor de un **9 % menos denso** que el agua líquida. Eso es exactamente por qué un cubito de hielo flota con una décima parte de sí mismo por encima de la superficie, y por qué el mismo volumen de agua se expande y puede reventar tuberías al congelarse.

## Por qué esta rareza importa para la vida

Como el hielo flota, el agua se congela **de arriba abajo**. Un estanque se hiela primero en la superficie, y esa capa de hielo flotante actúa como una manta aislante, frenando la congelación posterior y manteniendo líquida el agua de debajo. Los peces, las plantas y otras formas de vida sobreviven al invierno en esa capa líquida de abajo. Si el hielo se hundiera, los lagos e incluso los océanos se congelarían por completo de abajo arriba, y la vida acuática tal como la conocemos quizá nunca habría superado las estaciones frías. Un pequeño accidente molecular tiene consecuencias enormes.

## Preguntas frecuentes

**¿El agua es más densa en su punto de congelación?**
No, y esa es otra rareza. El agua es más densa en torno a los 4 °C, ligeramente *por encima* del punto de congelación. A medida que se enfría más allá de eso hacia los 0 °C, en realidad se expande un poco antes de convertirse en hielo, por eso el agua más fría de un lago está en la superficie.

**¿El agua salada se congela y flota de la misma manera?**
El hielo marino sigue flotando (es menos denso que el agua de mar), pero la sal baja el punto de congelación del agua y cambia los detalles. El hielo puro que se forma excluye en gran medida la sal.

**¿Por qué añadir hielo enfría tan bien una bebida?**
Además de estar frío, al derretirse el hielo *absorbe* mucho calor del líquido para romper esos puentes de hidrógeno al convertirse en agua, extrayendo energía de tu bebida en el proceso.`,
  },
  {
    topicKey: 'how-soap-works',
    title: '¿Cómo limpia realmente el jabón?',
    question: '¿Cómo elimina el jabón la grasa y los gérmenes que el agua sola no puede?',
    summary:
      'Las moléculas de jabón tienen doble personalidad: un extremo ama el agua y el otro se aferra a la grasa. Rodean la suciedad grasienta y los gérmenes, los despegan de las superficies y dejan que el agua se lo lleve todo, que es también por qué el jabón es tan eficaz contra muchos virus.',
    tags: ['ciencia', 'química', 'higiene', 'cómo funciona'],
    language: 'es',
    image: { prompt: promptOf('how-soap-works'), alt: 'Moléculas de jabón de dos extremos envolviendo una gota de grasa para elevarla al agua' },
    sources: [
      { title: 'Real Sociedad de Química (Reino Unido) — Cómo funciona el jabón (tensioactivos)', url: 'https://edu.rsc.org/' },
      { title: 'CDC — La ciencia lo demuestra: ¿por qué lavarse las manos?', url: 'https://www.cdc.gov/handwashing/why-handwashing.html' },
    ],
    content: `# ¿Cómo limpia realmente el jabón?

Ya conoces el problema que resuelve el jabón: el agua sola no puede con la grasa. Enjuaga una sartén grasienta bajo el grifo y el aceite simplemente forma gotas y se queda ahí. Eso es porque la grasa y el agua, como es bien sabido, no se mezclan. El jabón funciona siendo un astuto **casamentero molecular**: tiende un puente entre el agua y la grasa, para que el agua pueda por fin llevarse la grasa (y los gérmenes que viajan en ella).

## La molécula de dos caras

El secreto está en la forma de una molécula de jabón. Cada una es como un renacuajo diminuto con dos extremos muy distintos:

- Una **cabeza** que es *hidrófila* —"amante del agua"—. Se une al agua con gusto.
- Una larga **cola** que es *hidrófoba* —"temerosa del agua"—, pero que adora aferrarse al aceite y la grasa.

Esta doble personalidad es todo el truco. Cuando frotas hasta hacer espuma sobre una superficie grasienta, las moléculas de jabón se disponen con sus colas amantes de la grasa hundiéndose en el aceite y sus cabezas amantes del agua apuntando hacia fuera, hacia el agua.

## Rodear, despegar y enjuagar

Miles de moléculas de jabón rodean una gota de grasa, con las colas hacia dentro y las cabezas hacia fuera, hasta que el grumo grasiento queda completamente envuelto en una bola con una superficie exterior afín al agua. Estas pequeñas esferas se llaman **micelas.** Ahora la grasa, antes repelente, tiene una cáscara amante del agua, así que cuando enjuagas, el agua corriente atrapa esas micelas y arrastra todo el paquete —grasa y suciedad atrapada incluidas— por el desagüe. El jabón no disolvió la grasa; la *empaquetó* para que el agua pudiera transportarla.

## Por qué esto también destruye muchos gérmenes

La misma propiedad convierte al jabón en un héroe silencioso de la higiene. Muchos gérmenes —incluidos los coronavirus y otros virus con envoltura— están recubiertos de una **membrana grasa** exterior. Las colas amantes de la grasa del jabón se introducen en esa capa grasa y la desgarran, haciendo pedazos al germen, mientras que las micelas además despegan los gérmenes de tu piel para que el agua se los lleve. Por eso **frotar con jabón normal durante 20 segundos** es tan eficaz: no solo estás enjuagando los gérmenes, sino desmantelando químicamente muchos de ellos. La acción mecánica de frotar también importa: desprende lo que está pegado.

## Preguntas frecuentes

**¿El agua tiene que estar caliente?**
En realidad no: el agua templada puede ayudar a disolver algunas grasas más rápido y es más cómoda, pero el jabón hace su trabajo químico a cualquier temperatura razonable. El tiempo de frotado a fondo importa más que el calor.

**¿Es mejor el jabón antibacteriano que el normal?**
Para el lavado de manos cotidiano, el jabón normal funciona igual de bien para eliminar y destruir gérmenes, y las autoridades sanitarias por lo general no encuentran que los jabones antibacterianos de uso rutinario sean más eficaces. El mecanismo de jabón y frotado es la parte clave.

**¿En qué se diferencia el detergente del jabón?**
Los detergentes funcionan con el mismo principio de dos extremos (también son "tensioactivos"), pero se sintetizan para rendir mejor en agua dura y a distintas temperaturas. La misma idea, diseñada para condiciones más exigentes.`,
  },
  {
    topicKey: 'what-causes-rainbows',
    title: '¿Qué causa un arcoíris?',
    question: '¿Cómo se forman los arcoíris y por qué los colores están siempre en el mismo orden?',
    summary:
      'Un arcoíris es luz solar curvada y descompuesta dentro de las gotas de lluvia. Cada gota actúa como un pequeño prisma, separando la luz blanca en sus colores y reflejándolos hacia ti. La geometría fija el orden de los colores y curva todo el conjunto en un arco centrado frente al sol.',
    tags: ['ciencia', 'física', 'luz', 'clima'],
    language: 'es',
    image: { prompt: promptOf('what-causes-rainbows'), alt: 'Luz blanca entrando en una gota de lluvia y saliendo descompuesta en colores espectrales ordenados' },
    sources: [
      { title: 'NOAA SciJinks — ¿Cómo se forman los arcoíris?', url: 'https://scijinks.gov/rainbow/' },
      { title: 'NASA Science — La luz y el espectro electromagnético', url: 'https://science.nasa.gov/ems/' },
    ],
    content: `# ¿Qué causa un arcoíris?

Un arcoíris es un truco de luz y agua; en concreto, **luz solar curvada, descompuesta y reflejada de vuelta hacia ti por millones de gotas de lluvia.** No es un objeto en un lugar al que puedas caminar; es un efecto óptico que depende por completo de dónde están el sol, la lluvia y *tus ojos*. Por eso nunca puedes alcanzar el final de un arcoíris, y por eso la persona que está a tu lado ve uno ligeramente distinto: cada arcoíris se construye a medida para quien lo observa.

## Qué ocurre dentro de una sola gota de lluvia

Sigue un rayo de luz solar al entrar en una gota de lluvia esférica:

1. **Se curva al entrar.** La luz se frena y cambia de dirección al pasar del aire al agua (refracción). Y lo crucial: los distintos colores se curvan en cantidades algo diferentes; el violeta se curva más, el rojo menos.
2. **Se refleja en la parte trasera.** El rayo viaja hasta la superficie interior más lejana de la gota y rebota de vuelta.
3. **Se vuelve a curvar al salir**, y para entonces los colores, cada uno curvado dos veces, se han abierto en abanico formando el espectro completo.

Así que cada gota de lluvia toma luz solar blanca y emite un pequeño abanico de colores separados. Un arcoíris es lo que ves cuando millones de gotas hacen esto a la vez, cada una aportando un color a tu ojo según su posición en el cielo.

## Por qué los colores están siempre en el mismo orden

Como la cantidad de curvatura está fijada por la física, **el rojo siempre acaba en el borde exterior del arco y el violeta en el interior**, con el naranja, el amarillo, el verde y el azul entre medias, todas y cada una de las veces. El orden nunca se desordena porque lo determina cuánto se refracta cada longitud de onda. La secuencia familiar (rojo, naranja, amarillo, verde, azul, violeta) no es más que el espectro, ordenado por longitud de onda.

## Por qué es un arco, y siempre frente al sol

La geometría solo funciona en un ángulo concreto: la luz vuelve a tu ojo con más intensidad a unos **42 grados** del punto directamente opuesto al sol. Todas las direcciones a ese mismo ángulo trazan un círculo, que ves como el arco familiar (el suelo suele ocultar la mitad inferior). Por eso también un arcoíris está siempre en la parte del cielo *opuesta* al sol: tienes que estar de espaldas al sol, con la lluvia delante, para que los ángulos cuadren.

## Preguntas frecuentes

**¿Por qué se producen los arcoíris dobles?**
A veces la luz se refleja **dos veces** dentro de las gotas antes de salir. Ese segundo arco, más tenue, aparece más arriba, y sus colores están **invertidos** (el rojo por dentro) porque el rebote extra da la vuelta al orden.

**¿De verdad nunca se puede llegar al final de un arcoíris?**
No, no es un lugar físico. Camina hacia él y la geometría se desplaza contigo, así que el arcoíris también se mueve. Existe solo en relación con tu punto de vista.

**¿Hace falta lluvia para ver uno?**
Necesitas gotas de agua y luz solar en el ángulo correcto, así que también ves arcoíris en la neblina de una cascada, en los aspersores del jardín y en la espuma del mar. Lo que importa son las gotas, no la nube de lluvia.`,
  },
  {
    topicKey: 'why-we-age',
    title: '¿Por qué envejecemos?',
    question: '¿Qué hace realmente que nuestro cuerpo envejezca con el tiempo?',
    summary:
      'El envejecimiento es la acumulación de daños en las células más rápido de lo que el cuerpo los repara: desde los extremos desgastados de los cromosomas y errores del ADN hasta células que fallan e inflamación creciente. Son muchos procesos solapados, no un solo reloj, y por eso es tan complejo.',
    tags: ['ciencia', 'biología', 'envejecimiento', 'salud'],
    language: 'es',
    image: { prompt: promptOf('why-we-age'), alt: 'Células acumulando extremos de hebras deshilachados y pequeños daños con el tiempo mientras la reparación se ralentiza' },
    sources: [
      { title: 'Instituto Nacional sobre el Envejecimiento (NIH) — ¿Qué sabemos sobre el envejecimiento saludable?', url: 'https://www.nia.nih.gov/health/what-do-we-know-about-healthy-aging' },
      { title: 'López-Otín et al., «Las señas de identidad del envejecimiento» (2013)', url: 'https://pubmed.ncbi.nlm.nih.gov/23746838/' },
    ],
    content: `# ¿Por qué envejecemos?

El envejecimiento puede sentirse como un único reloj misterioso que cuenta atrás, pero biológicamente se entiende mejor como **la lenta acumulación de daños**: el desgaste a nivel de células y moléculas que, a lo largo de décadas, el cuerpo es cada vez menos capaz de reparar. Cuando eres joven, la reparación va al ritmo del daño. Con el tiempo, el daño empieza a ganar. No hay una sola causa del envejecimiento; hay muchas que se solapan, y eso es precisamente lo que hace tan difícil detenerlo y por lo que no existe una única "cura".

## Los principales motores del envejecimiento

Los científicos han identificado un conjunto de procesos entrelazados —a menudo llamados "las señas de identidad del envejecimiento"— que juntos impulsan el deterioro. Algunos de los más importantes:

| Proceso | Qué falla |
| --- | --- |
| **Acortamiento de los telómeros** | Las cápsulas protectoras de los extremos de los cromosomas se acortan cada vez que una célula se divide, limitando al final la división |
| **Daño en el ADN** | Los errores y daños se acumulan en nuestro código genético más rápido de lo que se reparan |
| **Células desgastadas (senescencia)** | Las células dañadas dejan de dividirse pero permanecen, filtrando señales que perjudican a las vecinas |
| **Problemas con las proteínas** | Las células se vuelven peores eliminando proteínas dañadas y mal plegadas, que se acumulan |
| **Centrales eléctricas que fallan** | Las mitocondrias (los generadores de energía de la célula) se vuelven menos eficientes |
| **Inflamación crónica** | Una inflamación leve y generalizada por todo el cuerpo ("inflamación del envejecimiento") aumenta con la edad |

Ninguno de estos *es* por sí solo el envejecimiento. Se refuerzan mutuamente —el ADN dañado crea células desgastadas, las células desgastadas alimentan la inflamación, la inflamación causa más daño—, así que el deterioro se acumula como un interés compuesto.

## Por qué envejecemos siquiera (la pregunta más profunda)

La evolución ofrece una razón de por qué el envejecimiento existe en primer lugar: la selección natural trabaja con más empeño en mantenernos sanos durante los años reproductivos, y su control se debilita después. Los genes y las compensaciones que benefician a la juventud pueden acarrear costes que solo aparecen más tarde, cuando la presión evolutiva para corregirlos es débil. En resumen, los cuerpos están ajustados para llevar sus genes a la siguiente generación, no para durar eternamente, así que el mantenimiento es "suficientemente bueno", no perfecto.

## ¿Hay algo que pueda ralentizarlo?

El envejecimiento en sí no puede detenerse hoy, pero la **velocidad** del daño está influida en parte por cómo vivimos. No fumar, la actividad física regular, un sueño decente, una dieta razonable y manejar el estrés crónico se asocian una y otra vez con un deterioro más lento y una vida sana más larga: no es magia, pero es la diferencia entre envejecer bien y envejecer mal. La investigación sobre los mecanismos subyacentes es muy activa, pero las palancas demostradas siguen siendo, sin glamour, prácticas.

## Preguntas frecuentes

**¿Hay un límite máximo de vida humana?**
Parece haber un techo aproximado: incluso con una salud perfecta, muy pocas personas pasan de los 115 años, lo que sugiere que el daño acumulado acaba por superar a la reparación. El récord verificado actual es de 122 años.

**¿Los animales grandes o pequeños envejecen más rápido?**
En general, los animales más pequeños viven menos, pero hay excepciones llamativas (algunos murciélagos pequeños y las ratas topo desnudas viven mucho más de lo que predice su tamaño), que es justo por lo que los investigadores los estudian.

**¿Llegará la ciencia a "curar" el envejecimiento?**
Nadie lo sabe. Los investigadores están atacando señas de identidad concretas (eliminar células desgastadas, proteger el ADN), y algunas ralentizan el envejecimiento en animales de laboratorio, pero trasladar eso a prolongar de forma segura la vida sana humana no está demostrado y probablemente esté lejos.`,
  },
  {
    topicKey: 'what-is-electricity',
    title: '¿Qué es realmente la electricidad?',
    question: '¿Qué es en realidad la electricidad y cómo alimenta nuestros dispositivos?',
    summary:
      'La electricidad es el flujo de carga eléctrica, normalmente electrones desplazándose por un cable, empujados por el voltaje. Las centrales no fabrican electrones; suministran el "empujón" que mueve los que ya están en los cables, y ese movimiento organizado lleva energía a tus dispositivos.',
    tags: ['ciencia', 'física', 'electricidad', 'cómo funciona'],
    language: 'es',
    image: { prompt: promptOf('what-is-electricity'), alt: 'Cargas luminosas en un cable desplazándose juntas bajo el voltaje para encender un dispositivo' },
    sources: [
      { title: 'Administración de Información Energética de EE. UU. (EIA) — La electricidad explicada', url: 'https://www.eia.gov/energyexplained/electricity/' },
      { title: 'NASA — Fundamentos de electricidad y magnetismo', url: 'https://science.nasa.gov/' },
    ],
    content: `# ¿Qué es realmente la electricidad?

Usamos la palabra "electricidad" de forma laxa, pero en esencia significa una sola cosa: **el flujo de carga eléctrica.** Todo está hecho de átomos, y los átomos contienen partículas cargadas, en especial los **electrones**, que llevan una diminuta carga negativa. En ciertos materiales, sobre todo en los metales, algunos electrones tienen libertad para moverse. Cuando un número enorme de esos electrones se desplaza en la misma dirección por un cable, ese flujo organizado *es* una corriente eléctrica. La electricidad es, literalmente, carga en movimiento.

## Tres palabras que la desmitifican

Una sencilla analogía de fontanería hace que los términos clave encajen; imagina agua en tuberías:

- El **voltaje** es el *empuje*, como la presión del agua. Es la fuerza que impulsa las cargas a través de un circuito. Sin presión, no hay flujo.
- La **corriente** es el *caudal*: cuánta carga pasa realmente por un punto cada segundo (se mide en amperios).
- La **resistencia** es cuánto se *opone* el material al flujo: una tubería estrecha y obstruida frente a una ancha y despejada.

Más voltaje impulsa más corriente; más resistencia permite menos. Esa relación (la ley de Ohm) gobierna casi todos los circuitos. Y una corriente necesita un **circuito** completo: un bucle ininterrumpido desde la fuente, a través del dispositivo, y de vuelta, por eso accionar un interruptor (romper el bucle) detiene todo al instante.

## Un error crucial: la central no te envía electrones

Esto es lo que más sorprende a la gente. La central eléctrica no te envía electrones a casa como un camión cisterna lleva agua. **Los electrones ya están en los cables.** Lo que suministra la central es el *empuje*: el voltaje que pone a esos electrones, ya presentes, a vibrar y desplazarse. En la corriente alterna (CA) que sale de la mayoría de los enchufes, los electrones ni siquiera viajan hasta ti; se balancean de un lado a otro en el sitio, muchas veces por segundo. Lo que realmente viaja hasta tu dispositivo, y rápido, es la **energía** que transporta ese movimiento coordinado, no los electrones en sí.

## Cómo se vuelve útil

Cuando la carga en movimiento se encuentra con un dispositivo, este la obliga a realizar un trabajo de paso: una resistencia calefactora convierte el flujo en calor, un motor lo convierte en movimiento, un LED lo convierte en luz, un chip usa diminutas corrientes conmutadas para calcular. En todos los casos, la carga en movimiento entrega energía, y el dispositivo convierte esa energía en lo que tú querías.

## Preguntas frecuentes

**¿El rayo es la misma electricidad que la de mi pared?**
Es el mismo fenómeno subyacente —un flujo de carga—, pero el rayo es una descarga enorme y breve que iguala la carga acumulada entre la nube y el suelo, a un voltaje muchísimo mayor que el de la red doméstica.

**¿Cuál es la diferencia entre CA y CC?**
En la corriente continua (CC, como la de una pila) la carga fluye de forma constante en un solo sentido; en la corriente alterna (CA, de la red) se invierte rápidamente de un lado a otro. Se usa CA para la red porque es fácil subir y bajar su voltaje para una transmisión eficiente a larga distancia.

**¿Por qué los metales son buenos conductores?**
Sus átomos comparten un "mar" de electrones sueltos libres para moverse, así que la carga fluye con facilidad. Los aislantes (goma, vidrio) retienen sus electrones con fuerza, así que la carga no puede fluir, por eso los cables son de cobre por dentro y de plástico por fuera.`,
  },
];
