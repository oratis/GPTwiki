import type { DraftArticle } from './types';
import { digitalBuyingEn } from './digital-buying.en';

// Batch: Digital Buying Decisions (versión nativa en español). Mismos temas y
// topicKey que digital-buying.en.ts, redactados de forma nativa para el contexto
// de compra del lector hispanohablante. Las imágenes se comparten.

const promptOf = (key: string): string => {
  const hit = digitalBuyingEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const digitalBuyingEs: DraftArticle[] = [
  {
    topicKey: 'oled-vs-lcd',
    title: 'OLED frente a LCD: ¿qué pantalla es realmente mejor?',
    question: '¿Cuál es la diferencia real entre las pantallas OLED y LCD, y cuál debería comprar?',
    summary:
      'El OLED ilumina cada píxel por separado, logrando negros puros y contraste infinito; el LCD usa una retroiluminación que atraviesa una capa de cristal líquido, con más brillo sostenido y sin riesgo de quemado. La elección depende de la sala, el contenido y el presupuesto.',
    tags: ['tecnología', 'pantallas', 'oled', 'compra de televisores'],
    language: 'es',
    image: {
      prompt: promptOf('oled-vs-lcd'),
      alt: 'Un panel de píxeles autoiluminados junto a un panel de retroiluminación uniforme',
    },
    sources: [
      { title: 'RTINGS — metodología de comparación de televisores OLED vs LED/LCD', url: 'https://www.rtings.com/tv/learn/led-vs-oled' },
    ],
    content: `# OLED frente a LCD: ¿qué pantalla es realmente mejor?

Toda la diferencia se reduce a una pregunta: **¿cada píxel genera su propia luz o comparten una retroiluminación?** Los píxeles OLED son autoemisivos: cada uno es una pequeña luz que puede apagarse por completo. Los píxeles LCD no producen luz alguna; son persianas frente a una retroiluminación independiente, que se abren y cierran para dejar pasar el color. Cada ventaja y cada defecto que viene a continuación nace de ese único hecho.

## Por qué el OLED se ve como se ve

Como un píxel OLED puede apagarse del todo, produce un **negro puro**: no gris oscuro, sino cero luz. Pon una estrella brillante a su lado y el contraste es prácticamente infinito. Eso da ese aspecto profundo y tridimensional por el que el OLED es famoso, además de una precisión por píxel: sin halo de luz desbordándose alrededor de objetos brillantes sobre fondos oscuros (el "blooming" que combaten los LCD). Los píxeles también cambian de estado casi al instante, ofreciendo una claridad de movimiento excelente.

Las contrapartidas son igual de físicas: el OLED no llega a ser tan cegadoramente brillante en una pantalla totalmente blanca como los mejores LCD, y como el material orgánico envejece con el uso, mostrar el *mismo* elemento estático (un teletipo de noticias, el logo de un canal, una barra de tareas) durante miles de horas arriesga un **quemado**: un tenue fantasma permanente. Los paneles modernos lo mitigan de forma agresiva, y un uso variado normal rara vez lo provoca, pero sigue siendo una consideración real para usos con mucho contenido estático.

## Por qué el LCD persiste (y mejoró)

La retroiluminación del LCD puede ser brutalmente brillante, lo que lo convierte en el mejor en salas soleadas y para luces HDR intensas a pantalla completa. No puede sufrir quemado y es más barato en cualquier tamaño. Su debilidad nativa —negros imperfectos, porque la retroiluminación se filtra por los píxeles "cerrados"— se ha reducido con el **atenuado local**: dividir la retroiluminación en zonas que se oscurecen de forma independiente. El Mini-LED lleva esto más lejos con miles de zonas diminutas, acercándose al contraste del OLED y conservando el brillo del LCD. Más zonas, mejores negros, pero nunca el control por píxel del OLED.

## Cuál comprar

| Tu situación | Mejor opción |
| --- | --- |
| Sala oscura, películas y juegos, amante del contraste | OLED |
| Sala luminosa con ventanas y lámparas | LCD Mini-LED (gana el brillo) |
| El televisor muestra un logo de canal fijo todo el día; PC con barra de tareas fija durante horas | LCD (sin preocuparte por el quemado) |
| Presupuesto ajustado, o tamaño muy grande | LCD |
| Quieres la mejor imagen por píxel y aceptas cuidarla | OLED |

## Preguntas frecuentes

**¿Sigue siendo el quemado un motivo de rechazo?**
Para un visionado mixto —películas, deportes, juegos variados— es muy improbable en los paneles actuales con sus protecciones integradas. Para 8 horas al día de la misma interfaz estática, un LCD es la apuesta más segura a largo plazo.

**¿Y el QLED, es un tercer tipo?**
No. El QLED es un LCD con una película de puntos cuánticos que mejora el color y el brillo. Sigue siendo un LCD con retroiluminación, no un panel autoemisivo como el OLED.

**¿El OLED consume menos energía?**
Depende del contenido: las escenas oscuras gastan poquísimo (los píxeles apagados no cuestan nada), pero una pantalla totalmente brillante puede consumir más que un LCD eficiente. No hay un ganador simple.`,
  },
  {
    topicKey: 'noise-cancelling',
    title: 'Cómo funcionan realmente los auriculares con cancelación de ruido',
    question: '¿Cómo funcionan los auriculares con cancelación de ruido y cuál es la diferencia entre activa y pasiva?',
    summary:
      'La cancelación activa usa micrófonos para escuchar el sonido entrante y reproduce una onda invertida que lo anula: estupenda con ruidos graves y constantes como los motores, floja con voces repentinas. El aislamiento pasivo simplemente bloquea el sonido físicamente.',
    tags: ['tecnología', 'auriculares', 'audio', 'cancelación de ruido'],
    language: 'es',
    image: {
      prompt: promptOf('noise-cancelling'),
      alt: 'Una onda de sonido entrante encontrándose con su imagen espejada y aplanándose',
    },
    sources: [
      { title: 'RTINGS — pruebas de aislamiento/cancelación de ruido en auriculares', url: 'https://www.rtings.com/headphones/tests/isolation/noise-isolation' },
    ],
    content: `# Cómo funcionan realmente los auriculares con cancelación de ruido

Hay dos formas completamente distintas de silenciar el mundo, y los buenos auriculares suelen usar ambas. El **aislamiento pasivo** es pura física: copas y almohadillas que sellan el sonido por fuera, como unos tapones. La **cancelación activa de ruido (ANC)** es electrónica ingeniosa: un micrófono escucha el ruido que llega a tu oído y el auricular genera la onda de sonido *opuesta* para anularlo. Entender qué hace cada uno explica por qué el ANC parece mágico en un avión e inútil contra un bebé que llora.

## El truco detrás de la cancelación activa

El sonido es una onda de presión. Si reproduces una segunda onda que es su imagen espejada exacta —cada cresta emparejada con un valle—, las dos suman casi nada. Esto es interferencia destructiva. Los auriculares con ANC muestrean el ruido entrante con micrófonos diminutos, calculan la onda inversa y la reproducen por los mismos altavoces que tu música, en tiempo real.

El problema es el *tiempo*. El auricular debe medir, calcular y emitir la contraonda más rápido de lo que cambia el sonido. Eso funciona de maravilla con ruido **constante, de baja frecuencia y predecible** —el zumbido de un motor a reacción, el traqueteo de un tren, el ronroneo de un aire acondicionado—, donde el momento siguiente se parece al anterior. Funciona mal con sonidos **repentinos, de alta frecuencia e impredecibles** —una conversación cercana, un perro que ladra, una puerta que se golpea—, porque para cuando el sistema reacciona, el sonido ya ha cambiado. Por eso el ANC silencia el rugido del motor pero apenas mella la charla de la mesa de al lado.

## La división del trabajo

| Amenaza | Gestionada sobre todo por | Por qué |
| --- | --- | --- |
| Motor a reacción, tren, zumbido del aire acondicionado | Activa (ANC) | Grave, constante, predecible: fácil de espejar |
| Charla de oficina, voces | Sello pasivo | Demasiado rápida/variable para que el ANC la siga |
| Golpes repentinos | Ninguna bien | Los transitorios impredecibles vencen a ambas |
| Viento | A menudo empeorado por el ANC | El viento golpea los micrófonos directamente como ruido |

Las altas frecuencias se bloquean en realidad mejor con un buen *sello físico* que con el ANC, por lo que el ajuste importa enormemente: un sello con fugas sabotea ambos métodos.

## Qué mirar al comprar

Prioriza primero el **ajuste y el sellado** (almohadillas intraurales que encajen en tu oído, o copas circumaurales que envuelvan por completo); la calidad del ANC varía más en la *profundidad en baja frecuencia* y en la *ausencia de siseo* (el ANC barato añade su propio ruido blanco tenue); y comprueba si hay un **modo de transparencia** que use los mismos micrófonos para meter el sonido exterior *hacia dentro*: útil para anuncios o conversaciones sin quitarte los auriculares.

## Preguntas frecuentes

**¿El ANC perjudica la calidad de sonido?**
En buenos auriculares modernos, de forma insignificante. En los baratos puede añadir siseo o alterar levemente el tono. El fondo más silencioso suele mejorar el detalle percibido más de lo que el ANC lo degrada.

**¿El ANC puede dañar mis oídos o causar dolor de cabeza?**
La cancelación en sí es inofensiva, pero algunas personas notan una sensación de presión por el procesamiento constante de baja frecuencia. Es individual; el modo de transparencia u otro modelo suele resolverlo.

**¿Vale la pena un ANC caro frente a uno barato?**
Para quienes vuelan y viajan a diario, sí: la diferencia en cancelación de graves y en rendimiento sin siseo es real. Para silencio ocasional, un par pasivo que selle bien puede bastar.`,
  },
  {
    topicKey: 'phone-battery-mah',
    title: 'Por qué la autonomía del móvil no es solo cuestión de mAh',
    question: '¿Por qué dos móviles con la misma batería en mAh tienen una autonomía completamente distinta?',
    summary:
      'Los mAh solo miden cuánta carga almacena una batería. La autonomía real es esa capacidad dividida por la velocidad a la que todo la consume —eficiencia del chip, tamaño y brillo de pantalla, software y señal—, así que una batería más pequeña puede durar más.',
    tags: ['tecnología', 'smartphones', 'batería', 'consejos de compra'],
    language: 'es',
    image: {
      prompt: promptOf('phone-battery-mah'),
      alt: 'Un depósito de luz que alimenta a varios consumidores que lo vacían a ritmos distintos',
    },
    sources: [
      { title: 'DXOMARK — protocolo de pruebas de batería en smartphones', url: 'https://www.dxomark.com/category/smartphone-reviews/' },
    ],
    content: `# Por qué la autonomía del móvil no es solo cuestión de mAh

Dos móviles anuncian una batería de 5.000 mAh, pero uno muere a la hora de cenar y el otro navega tranquilo hasta un segundo día. El número no mentía: simplemente responde a la pregunta equivocada. **Los mAh miden el tamaño del depósito, no los kilómetros que haces.** La autonomía es el tamaño del depósito *dividido por* el consumo, y el consumo varía enormemente entre móviles. Comprar solo por los mAh es como comprar un coche por el tamaño del depósito ignorando el motor.

## La ecuación que de verdad importa

A grandes rasgos: **autonomía ≈ capacidad ÷ consumo.** La capacidad (mAh, más exactamente vatios-hora) es un término. El otro es todo lo que la vacía:

- **Eficiencia del chip.** El proceso de fabricación del procesador (su nodo en "nanómetros") afecta enormemente a cuánta energía sorbe para el mismo trabajo. Un chip más nuevo y eficiente hace más por cada miliamperio, a veces compensando por completo una diferencia bruta de capacidad.
- **La pantalla.** Suele ser el mayor consumidor individual. Una pantalla más grande, más brillante y con mayor tasa de refresco (120 Hz) gasta mucho más que una más pequeña, más tenue y a 60 Hz. Por eso los móviles de pantalla grande necesitan baterías grandes solo para empatar.
- **Optimización del software.** Con qué agresividad el sistema operativo duerme las apps en segundo plano, frena el consumo en reposo y gestiona los despertares puede oscilar drásticamente la autonomía de todo el día: el mismo hardware dura distinto con software bien o mal afinado.
- **Antenas y señal.** Una señal celular débil hace que el móvil "grite más fuerte" (más consumo); el 5G puede gastar más que el 4G; la conectividad siempre activa se va sumando.

## Por qué a veces gana una batería más pequeña

Pon una batería más pequeña detrás de un chip eficiente, una pantalla modesta y un software bien afinado, y aguantará más que una batería mayor lastrada por una pantalla devoradora y una optimización floja. Los 4.500 mAh de la ficha técnica pueden ganar de verdad a su rival de 5.000 mAh. La señal honesta no es el número de mAh, sino el **tiempo de pantalla encendida medido por analistas independientes** en pruebas estandarizadas, que pliega todas las variables ocultas en un resultado comparable.

## Qué comprobar antes de comprar

| No te fíes de | Fíate mejor de |
| --- | --- |
| El número de mAh por sí solo | El tiempo de pantalla encendida medido en análisis / puntuaciones de autonomía |
| "Batería más grande = más autonomía" | La combinación de batería con eficiencia del chip y pantalla |
| Los vatios del cargador como "autonomía" | La velocidad de carga y la autonomía son cosas distintas |

La velocidad de carga (vatios) también es aparte: un móvil puede cargar rápido *y* morir rápido. No confundas "se llena en 30 minutos" con "dura todo el día".

## Preguntas frecuentes

**¿Más mAh puede ser malo?**
Las baterías más grandes añaden peso y grosor y tardan más en cargar. Pasado el "cómodamente todo el día", más capacidad tiene un valor decreciente frente a un móvil más ligero.

**¿Por qué empeora mi autonomía al cabo de un par de años?**
Las baterías de litio envejecen químicamente y pierden capacidad máxima con cada ciclo de carga; suelen conservar ~80 % tras unos cientos de ciclos completos. El depósito se encoge físicamente con el tiempo.

**¿El 5G perjudica de verdad a la batería?**
Puede hacerlo, sobre todo en zonas con 5G irregular donde el móvil salta entre redes. Muchos móviles permiten limitar a 4G/LTE para ahorrar energía cuando no necesitas la velocidad del 5G.`,
  },
  {
    topicKey: 'ssd-vs-hdd',
    title: 'SSD frente a HDD: ¿cuál es la diferencia y cuál necesitas?',
    question: '¿Cuál es la diferencia entre un SSD y un disco duro, y cuál debería elegir?',
    summary:
      'Un SSD guarda los datos en chips de memoria flash, sin partes móviles: muchísimo más rápido, silencioso y resistente a golpes. Un HDD usa platos magnéticos giratorios: más lento, pero mucho más barato por terabyte. La mayoría quiere un SSD para el sistema y un HDD para almacenamiento masivo.',
    tags: ['tecnología', 'almacenamiento', 'ssd', 'compra de ordenadores'],
    language: 'es',
    image: {
      prompt: promptOf('ssd-vs-hdd'),
      alt: 'Un almacén de chips estáticos junto a platos giratorios con un brazo de lectura',
    },
    sources: [
      { title: 'Backblaze — fiabilidad de unidades y estadísticas de almacenamiento', url: 'https://www.backblaze.com/cloud-storage/resources/hard-drive-test-data' },
    ],
    content: `# SSD frente a HDD: ¿cuál es la diferencia y cuál necesitas?

Las dos formas de guardar tus archivos difieren tan profundamente como un tocadiscos difiere de una tarjeta de memoria. Un **disco duro (HDD)** escribe los datos magnéticamente sobre platos giratorios, leídos por un brazo físico que se desplaza hasta el punto exacto, como un tocadiscos diminuto y velocísimo. Un **disco de estado sólido (SSD)** almacena los datos como carga eléctrica en chips de memoria flash, **sin ninguna parte móvil**. Esa división entre lo mecánico y lo electrónico produce todas las diferencias que siguen.

## Velocidad: la brecha que notas a diario

Un SSD no tiene nada que mover físicamente, así que encuentra y entrega los datos casi al instante. Un HDD debe esperar a que el plato gire hasta el lugar correcto y el brazo alcance la pista adecuada: milisegundos que se acumulan a lo largo de las miles de lecturas diminutas que un ordenador hace solo para arrancar o abrir una app. En la práctica:

- **Tiempo de arranque:** segundos con SSD frente a un minuto o más con HDD.
- **Abrir apps y archivos:** casi instantáneo frente a una lentitud perceptible.
- **Acceso aleatorio** (archivos pequeños dispersos, que es lo que de verdad es la informática diaria): los SSD son drásticamente más rápidos, a menudo entre 10 y 100 veces.

Poner un SSD en un ordenador viejo es la mejora de velocidad más espectacular que existe: hace que una máquina se sienta nueva más que cualquier otro cambio.

## Las contrapartidas

| Propiedad | SSD | HDD |
| --- | --- | --- |
| Velocidad | Muy rápido | Mucho más lento |
| Precio por terabyte | Más alto | Mucho más barato: mejor valor para volumen |
| Partes móviles | Ninguna | Sí: vulnerable a caídas/golpes |
| Ruido y calor | Silencioso, fresco | Giro audible, más calor |
| Techo de capacidad (consumo) | Grande, más caro en la gama alta | Las mayores capacidades, las más baratas |
| Modo de fallo | A menudo repentino, electrónico | A menudo avisa con ruidos |

Los HDD siguen ganando con holgura en **coste por terabyte**, por lo que el almacenamiento masivo —grandes bibliotecas multimedia, copias de seguridad, archivos— sigue siendo su bastión. Los SSD ganan en todo lo que importe velocidad o durabilidad.

## La respuesta práctica para la mayoría

Usa ambos, según su función:

- **SSD para el sistema operativo y las apps/archivos activos**: esto es lo que hace que el ordenador se sienta rápido.
- **HDD (o nube) para archivos masivos**: vídeos, bibliotecas de fotos, copias de seguridad que no abres a diario.

Si un equipo solo tiene sitio para uno (la mayoría de portátiles, todos los móviles), que sea un SSD: la velocidad compensa el precio por gigabyte, y el volumen lo descargas en almacenamiento externo o en la nube. En los SSD, fíjate también en la *interfaz*: los SSD NVMe (PCIe) son varias veces más rápidos que los antiguos SSD SATA, aunque para un uso general hasta un SSD SATA se siente instantáneo frente a cualquier HDD.

## Preguntas frecuentes

**¿Cuál dura más / es más fiable?**
Hoy ambos son fiables. Los SSD no tienen partes que se desgasten mecánicamente, pero sí un número finito de escrituras (muy por encima del uso normal). Un HDD puede morir por una caída. Para la longevidad, lo que más importa es tener una copia de seguridad: cualquier unidad individual puede fallar.

**¿Los SSD se desgastan por demasiadas escrituras?**
Hay un límite de escritura, pero para usuarios normales es prácticamente inalcanzable dentro de la vida útil de la unidad. Solo las cargas de trabajo profesionales de escritura intensiva son una preocupación real.

**¿Un SSD más caro siempre es más rápido?**
No siempre de forma significativa: pasado cierto punto, las velocidades NVMe superan lo que las tareas cotidianas pueden aprovechar. La capacidad y la fiabilidad a menudo te importan más que las cifras pico de los benchmarks.`,
  },
  {
    topicKey: 'megapixels-myth',
    title: '¿Más megapíxeles significan una cámara mejor?',
    question: '¿Más megapíxeles hacen una cámara mejor, y qué importa de verdad para la calidad de foto?',
    summary:
      'Los megapíxeles solo determinan cuánto puedes imprimir o recortar; pasado un punto, más megapíxeles en un sensor pequeño hasta pueden perjudicar. El tamaño del sensor, la calidad de la lente y el procesado de imagen importan mucho más para las fotos que realmente ves.',
    tags: ['tecnología', 'cámaras', 'fotografía', 'smartphones'],
    language: 'es',
    image: {
      prompt: promptOf('megapixels-myth'),
      alt: 'Un sensor grande captando abundante luz junto a uno diminuto captando muy poca',
    },
    sources: [
      { title: 'DXOMARK — pruebas de calidad de imagen de cámaras y smartphones', url: 'https://www.dxomark.com' },
    ],
    content: `# ¿Más megapíxeles significan una cámara mejor?

Al marketing le encantan los megapíxeles porque son un único número grande que suena a "más". Pero los megapíxeles responden solo a una pregunta muy estrecha —**cuántos puntos componen la imagen**— y esa pregunta dejó de importar para la mayoría hace años. Una foto de 12 megapíxeles ya contiene detalle suficiente para imprimir tamaño póster o llenar cualquier pantalla que tengas. Las cosas que de verdad hacen que una foto se vea bien viven en otra parte.

## Qué controlan y qué no los megapíxeles

Los megapíxeles determinan la **resolución**: cuánto puedes imprimir o cuánto puedes recortar antes de que la imagen se vuelva un mosaico. Eso es todo. No dicen nada sobre el color, la capacidad con poca luz, la nitidez ni esa cualidad difícil de nombrar que hace que una foto "resalte".

Peor aún: en un sensor pequeño, *más* megapíxeles pueden salir mal. Aprieta más píxeles en el mismo chip diminuto y cada píxel individual se hace más pequeño, captando menos luz, lo que significa más grano en escenas oscuras. Por eso un móvil de 12 MP puede tomar fotos nocturnas más limpias que uno de 48 MP: píxeles más grandes, más luz cada uno. (Los móviles modernos contraatacan con el "binning de píxeles": fusionan varios píxeles pequeños en uno virtual más grande con poca luz, cambiando en efecto resolución por limpieza.)

## Qué determina de verdad la calidad de foto

| Factor | Por qué importa | Efecto en lenguaje llano |
| --- | --- | --- |
| **Tamaño del sensor** | Sensor más grande = más luz total captada | El factor de hardware n.º 1; mejor con poca luz, mejor desenfoque de fondo |
| **Calidad de la lente** | Nitidez, apertura (luz que entra), distorsión | Un gran sensor tras una mala lente está desaprovechado |
| **Procesado de imagen** | El software convierte la luz bruta en el aspecto final | A menudo el factor decisivo en móviles |
| **Tamaño de píxel** | Los píxeles más grandes captan más luz cada uno | Imágenes más limpias en la oscuridad |
| Megapíxeles | Solo resolución / margen de recorte | Importa solo más allá de grandes impresiones o recortes severos |

El hecho de hardware más importante es el **tamaño del sensor**: por eso una cámara profesional de "solo" 24 MP demuele a un móvil de 108 MP, ya que su sensor es muchas veces más grande y capta muchísima más luz. Y en los móviles en especial, el **procesado** (fotografía computacional) puede importar más que cualquier especificación, por lo que dos móviles con sensores idénticos pueden producir fotos visiblemente distintas.

## Cómo juzgar de verdad una cámara

Ignora el titular de los megapíxeles. En su lugar: mira el **tamaño del sensor** (a menudo citado como una fracción tipo 1/1,3"; más grande es mejor), revisa **fotos de muestra y análisis independientes** —sobre todo tomas con poca luz y con zoom— y sopesa **las funciones que vas a usar** (estabilización, ultragran angular, zoom óptico frente a digital). Las fotos en sí, tomadas por analistas en condiciones reales, te cuentan todo lo que la ficha técnica oculta.

## Preguntas frecuentes

**Entonces, ¿los móviles de muchos megapíxeles son una estafa?**
No: los recuentos altos ayudan de verdad si recortas de forma agresiva o quieres la flexibilidad del binning de píxeles. Simplemente no son la prueba de calidad que el número da a entender.

**¿Por qué las cámaras profesionales tienen menos megapíxeles que los móviles?**
Porque priorizan píxeles grandes en sensores grandes por encima del recuento bruto. La calidad de imagen por píxel vence a la cantidad para casi cualquier propósito.

**¿Más zoom en la caja significa mejor zoom?**
Atento al zoom *digital* frente al *óptico*. El zoom óptico (aumento real de la lente) conserva la calidad; el zoom digital solo recorta y amplía, algo que cualquier cantidad de megapíxeles puede fingir. El "zoom 100x" es mayormente digital y mayormente papilla.`,
  },
  {
    topicKey: 'wifi-vs-bandwidth',
    title: 'Por qué tu plan de internet rápido sigue sintiéndose lento',
    question: '¿Por qué mi wifi va lento aunque pago un plan de internet rápido?',
    summary:
      'La velocidad que contratas es la tubería que entra en tu casa; el wifi recorre los últimos metros, y en ese tramo vive la mayor parte de la lentitud. La distancia, las paredes, las interferencias, el hardware viejo y los dispositivos saturados frenan la velocidad muy por debajo del plan.',
    tags: ['tecnología', 'wifi', 'internet', 'redes'],
    language: 'es',
    image: {
      prompt: promptOf('wifi-vs-bandwidth'),
      alt: 'Una tubería ancha de luz que se estrecha en ondas inalámbricas que se debilitan a través de paredes',
    },
    sources: [
      { title: 'FCC — guía del consumidor sobre la velocidad de banda ancha', url: 'https://www.fcc.gov/consumers/guides/getting-broadband-qa' },
    ],
    content: `# Por qué tu plan de internet rápido sigue sintiéndose lento

Pagas por "300 megas", pero el vídeo se atasca y las páginas van a paso de tortuga. Lo más probable es que el plan no mienta: el cuello de botella casi siempre está *después* de que internet entra en tu casa. Piénsalo como dos viajes separados: la **velocidad del plan** es la tubería ancha que llega a tu edificio; el **wifi** son los últimos metros por el aire hasta tu dispositivo. Ese salto final e invisible es donde se genera la mayor parte de la lentitud real y casi nunca se anuncia.

## Los dos viajes, separados

El número de tu factura describe la conexión a tu casa (a menudo un enlace por cable hasta el router). Del router en adelante, tus dispositivos suelen conectarse por **wifi** —ondas de radio—, y las ondas de radio son frágiles. Se debilitan con la distancia, las absorben las paredes (sobre todo hormigón, ladrillo, metal y agua, incluida la de los cuerpos humanos) y compiten con vecinos y electrodomésticos en las mismas ondas. Un plan de 300 Mbps puede entregar 300 a un dispositivo conectado por cable, pero solo 40 a un móvil a dos habitaciones y tres paredes de distancia.

## Los culpables habituales, por orden

| Causa | Qué hace | Solución |
| --- | --- | --- |
| **Distancia y paredes** | La señal se debilita rápido a través de obstáculos | Acércate; recoloca el router centrado y en alto |
| **Router viejo** | No entrega velocidades modernas aunque el plan pueda | Actualiza al wifi actual (WiFi 6/6E/7) |
| **Banda 2,4 vs 5 GHz** | 2,4 GHz llega lejos pero lento; 5 GHz rápido pero corto | Usa 5 GHz de cerca, 2,4 GHz para alcance |
| **Ondas saturadas** | Vecinos/microondas/Bluetooth interfieren | 5 GHz, o cambia de canal |
| **Demasiados dispositivos** | Todos compartiendo la atención de un router | Sistema mesh; cablea a los usuarios intensivos |
| **La subida del plan** | A menudo mucho menor que la bajada | Comprueba si lo que duele son las subidas (llamadas, copias) |

La solución individual más común es simplemente la **colocación del router**: centrado, elevado, a la vista, no en un mueble, un sótano o detrás del televisor. La radio odia las esquinas y los espacios cerrados.

## Cuándo el plan sí es el límite

A veces sí te has quedado corto con el plan: muchas personas en videollamadas y emisiones 4K a la vez pueden saturar de verdad un plan pequeño. Pero prueba antes de actualizar: haz un test de velocidad **conectado por cable** junto al router (tu velocidad de plan real) y otro **por wifi donde de verdad lo usas** (tu experiencia real). Si el test por cable alcanza el plan pero el wifi no, pagar por un plan más rápido no ayudará; arreglar el wifi sí.

## Preguntas frecuentes

**¿Un plan más rápido arreglará un wifi lento?**
Normalmente no. Si el cuello de botella es el wifi, una tubería más ancha hacia la casa solo llega al mismo salto final estrecho. Arregla primero el wifi.

**¿Sistema mesh o repetidor de wifi?**
Un sistema mesh (varias unidades coordinadas) suele superar a un único repetidor, que a menudo reduce la velocidad a la mitad y crea una red separada más débil. Para casas grandes, el mesh es la respuesta moderna.

**¿Cablear los dispositivos sigue importando?**
Sí: un cable (Ethernet) da la velocidad completa y estable, sin interferencias. Para un sobremesa, una consola o un televisor que no se mueven, cablearlos es la mejora más fiable que existe.`,
  },
  {
    topicKey: 'fast-charging',
    title: '¿La carga rápida es mala para tu batería?',
    question: '¿La carga rápida daña la batería de mi móvil y cómo debería cargar para que dure?',
    summary:
      'La carga rápida añade algo de calor y estrés, pero los móviles modernos la gestionan con cuidado, así que el impacto diario es moderado. El calor y dejar el móvil al 100 % son lo que más envejece las baterías: los hábitos importan más que la velocidad de carga.',
    tags: ['tecnología', 'baterías', 'carga', 'smartphones'],
    language: 'es',
    image: {
      prompt: promptOf('fast-charging'),
      alt: 'Una batería llenándose rápidamente de luz, mantenida fresca dentro de una zona de temperatura segura',
    },
    sources: [
      { title: 'Battery University — cómo envejecen las baterías de iones de litio', url: 'https://batteryuniversity.com/article/bu-808-how-to-prolong-lithium-based-batteries' },
    ],
    content: `# ¿La carga rápida es mala para tu batería?

La respuesta corta: **la carga rápida causa algo de desgaste extra, pero mucho menos del que teme internet, y mucho menos del que causa el calor.** Los móviles modernos no vuelcan energía a ciegas; orquestan la carga con cuidado, y los mayores enemigos de la longevidad de la batería resultan ser cosas que la mayoría ignora. Para verlo, hay que saber cómo envejece una batería de litio.

## Cómo envejecen las baterías de litio

Una batería de iones de litio se desgasta por dos mecanismos: el **envejecimiento por ciclos** (cada carga-descarga completa reduce poco a poco la capacidad máxima) y el **envejecimiento por calendario** (degradación química con el tiempo, acelerada por el calor y por permanecer con mucha carga). Dos condiciones la castigan más:

- **El calor.** El mayor acelerante individual. La temperatura alta acelera las reacciones químicas que degradan la celda. Una batería caliente envejece rápido, sin importar cómo se haya calentado.
- **Los niveles de carga extremos.** Quedarse al 100 % (sobre todo en caliente) estresa la batería, igual que descargarla hasta el 0 %. El punto medio suave (aproximadamente 20–80 %) es donde el litio está más feliz.

La carga rápida importa sobre todo porque *genera calor*, pero cuánto llega realmente a la celda depende por completo del diseño del móvil.

## Por qué la carga rápida moderna está mayormente bien

Los móviles no son pasivos. Gestionan la carga de forma activa:

- **La velocidad no es constante.** La carga rápida es más veloz cuando la batería está casi vacía y luego se ralentiza a propósito al llenarse; la mayor parte de la velocidad de titular "0–50 % en 20 minutos" ocurre en el rango bajo y seguro, frenando cerca del tope.
- **La gestión térmica frena el calor.** El móvil monitoriza la temperatura y reduce la potencia de carga (o la pausa) si se calienta demasiado.
- **Funciones de salud de la batería.** Muchos móviles ahora aprenden tu rutina y se quedan al 80 % durante la noche, completando hasta el 100 % justo antes de que despiertes, minimizando el tiempo estresados a plena carga.

Así que la carga rápida diseñada por el fabricante que viene con tu móvil está ingeniada para mantener la celda dentro de límites seguros. La diferencia de pérdida de capacidad diaria entre carga rápida y lenta, en un móvil bien diseñado, es real pero moderada.

## Hábitos que importan más que la velocidad de carga

| Ayuda a la batería | Perjudica a la batería |
| --- | --- |
| Mantenerla fresca | Cargar/jugar hasta calentarla; sol, coches calientes |
| Vivir más o menos entre 20–80 % | 100 % constante (o descargar hasta el 0 %) |
| Usar cargadores de calidad/oficiales | Cargadores baratos sin certificar |
| Activar la "carga optimizada" | Cargar bajo una almohada (atrapa el calor) |

Fíjate en que la *velocidad* de carga apenas aparece: **la temperatura y el nivel de carga dominan**. Preocuparse por la carga rápida mientras juegas con un móvil caliente al 100 % toda la noche es colar el mosquito y tragar el camello.

## Preguntas frecuentes

**¿Debería evitar la carga rápida para cuidar mi batería?**
No es necesario en un móvil diseñado para ella. Si quieres ser delicado, carga despacio durante la noche con el modo de carga optimizada y reserva la carga rápida para cuando necesites una recarga rápida.

**¿Es malo dejar el móvil cargando toda la noche?**
Menos que antes: los móviles dejan de tomar energía al 100 % y muchos retrasan el llenado final. La leve desventaja son las horas pasadas al 100 %; las funciones de carga optimizada abordan justamente esto.

**¿Los cargadores rápidos de terceros dañan la batería?**
Los cargadores certificados de buena reputación que coinciden con el estándar de tu móvil están bien. El riesgo son las unidades baratas sin certificar con mala regulación: una falsa economía para un dispositivo caro.`,
  },
  {
    topicKey: 'refresh-rate',
    title: '¿Qué es la tasa de refresco y vale la pena 120 Hz?',
    question: '¿Qué significa la tasa de refresco (Hz) en una pantalla y vale la pena pagar por una de 120 Hz?',
    summary:
      'La tasa de refresco es cuántas veces por segundo se redibuja una pantalla; 120 Hz se actualiza el doble que 60 Hz, haciendo el movimiento y el desplazamiento visiblemente más fluidos. Es una mejora real y agradable para juegos y para la sensación diaria, pero cuesta batería y dinero.',
    tags: ['tecnología', 'pantallas', 'tasa de refresco', 'videojuegos'],
    language: 'es',
    image: {
      prompt: promptOf('refresh-rate'),
      alt: 'Una esfera en movimiento mostrada como pasos espaciados frente a un rastro denso y fluido',
    },
    sources: [
      { title: 'RTINGS — pruebas de tasa de refresco y movimiento en monitores', url: 'https://www.rtings.com/monitor/tests/motion/refresh-rate-and-motion-blur' },
    ],
    content: `# ¿Qué es la tasa de refresco y vale la pena 120 Hz?

La tasa de refresco, medida en hercios (Hz), es sencillamente **cuántas veces por segundo la pantalla redibuja su imagen.** Una pantalla de 60 Hz se refresca 60 veces por segundo; una de 120 Hz, 120 veces. Como todo el movimiento en pantalla es en realidad un folioscopio de imágenes fijas, más refrescos por segundo significan saltos más pequeños entre ellas, lo que tu ojo lee como un movimiento más fluido. Es una de las pocas especificaciones cuyo beneficio se siente al instante, aunque no sepas nombrarlo.

## Por qué más refrescos se ven más fluidos

Imagina un objeto cruzando la pantalla. A 60 Hz, la pantalla muestra su posición 60 veces durante el recorrido; a 120 Hz, 120 veces, así que cada paso es la mitad de grande y el movimiento se ve más continuo y menos a trompicones. El efecto es más evidente en tres situaciones cotidianas:

- **Desplazar** texto y páginas web: fluido y legible en movimiento en lugar de un borrón deslizante.
- **Jugar**: la acción rápida se ve fluida y (con el hardware para moverla) puede sentirse más responsiva.
- **Interfaz general**: animaciones, deslizamientos y transiciones simplemente se sienten "mejor", una cualidad que la gente nota de inmediato en un móvil de gama alta aun sin saber por qué.

Una vez que te acostumbras a los 120 Hz, los 60 Hz pueden parecer sutilmente entrecortados: una mejora clásica de "ya no puedes dejar de verlo".

## Las pegas

| Beneficio | Coste |
| --- | --- |
| Movimiento y desplazamiento más fluidos | Precio más alto |
| Sensación de juego más responsiva | Consume más batería (móviles) |
| Sensación diaria premium | Necesita contenido/hardware que de verdad produzca los fotogramas |

Dos advertencias honestas. Primera, la **batería**: refrescar el doble de veces consume energía, por lo que muchos móviles ofrecen un refresco "adaptativo" que baja a tasas bajas con contenido estático y sube solo cuando hace falta. Segunda, **necesitas fotogramas que mostrar**: una pantalla de 120 Hz solo ayuda si algo produce 120 imágenes por segundo. Un juego que va a 45 fotogramas por segundo no llena una pantalla de 120 Hz; una foto estática se ve idéntica a cualquier tasa de refresco. La pantalla es el *techo*, no una garantía.

## ¿Vale la pena?

| Eres… | Veredicto |
| --- | --- |
| Jugador (PC o consola) | Sí: una de las mejoras más perceptibles |
| Comprador de móvil que valora la "sensación" | Sí: la fluidez al desplazar y en la interfaz es constante |
| Con presupuesto ajustado y viendo sobre todo vídeo | Prioridad baja: el cine va a ~24 fps y no se beneficia mucho |
| Obsesionado con la autonomía | Usa el modo adaptativo o sopesa el cambio |

Para la mayoría de compradores de móviles de gama alta y de juegos, los 120 Hz son una mejora genuina y perceptible a diario. Para un dispositivo económico usado sobre todo para vídeo y mensajería, ese dinero suele rendir más en otra parte (brillo, batería, almacenamiento).

## Preguntas frecuentes

**¿El ojo humano puede siquiera ver más allá de 60 Hz?**
Sí: la mayoría percibe claramente el salto de fluidez a 120 Hz, sobre todo en movimiento y al desplazar. Los beneficios continúan por encima para juegos rápidos, con rendimientos decrecientes.

**¿Una pantalla de 120 Hz hace mejores las películas?**
La verdad que no: la mayoría del cine se masteriza a ~24 fps, así que se ve igual. El beneficio está en el contenido interactivo y el desplazamiento, no en el vídeo pasivo.

**144 Hz, 240 Hz, ¿valen la pena frente a 120?**
Para juegos competitivos, la fluidez y la respuesta extra ayudan, con rendimientos decrecientes. Para móviles y uso general, los 120 Hz ya capturan el grueso del beneficio.`,
  },
  {
    topicKey: 'ram-explained',
    title: '¿Cuánta RAM necesitas de verdad?',
    question: '¿Qué hace la RAM y cuánta necesito en realidad en un móvil o un portátil?',
    summary:
      'La RAM es el espacio de trabajo a corto plazo del dispositivo: guarda lo que usas activamente para que el procesador lo alcance al instante. Más te deja manejar más cosas a la vez, pero pasado lo que usas, la extra queda inactiva. No es almacenamiento ni un multiplicador de velocidad.',
    tags: ['tecnología', 'ordenadores', 'ram', 'consejos de compra'],
    language: 'es',
    image: {
      prompt: promptOf('ram-explained'),
      alt: 'Un escritorio luminoso con elementos activos abiertos junto a un armario de almacenamiento cerrado',
    },
    sources: [
      { title: 'Crucial — cuánta RAM necesitas (orientación sobre memoria)', url: 'https://www.crucial.com/articles/about-memory/how-much-ram-do-i-need' },
    ],
    content: `# ¿Cuánta RAM necesitas de verdad?

La RAM (memoria de acceso aleatorio) es la especificación más malentendida de la informática porque se confunde constantemente con el almacenamiento. Aquí va el modelo mental limpio: **el almacenamiento es tu archivador; la RAM es tu escritorio.** El archivador (SSD/disco duro) guarda todo, incluso apagado. El escritorio (RAM) solo sostiene lo que estás *trabajando activamente ahora mismo*, donde el procesador puede tomarlo al instante. Un escritorio más grande te deja tener más cosas abiertas a la vez: ese es todo el trabajo de la RAM.

## Qué hace realmente la RAM

Cuando abres una app, el sistema la carga desde el almacenamiento lento al "escritorio" rápido de la RAM para que el procesador trabaje con ella a velocidad. Cada app en marcha, cada pestaña del navegador, el propio sistema operativo: todos ocupan espacio en el escritorio. Cuando el escritorio se llena, el sistema empieza a devolver cosas al almacenamiento lento para hacer hueco, y *ese* trasiego es lo que sientes como ralentización: apps que se recargan al volver a ellas, tirones con muchas pestañas. Más RAM significa que más cosas pueden quedarse abiertas y disponibles al instante, sin trasiego.

Dos cosas que la RAM **no** es: no es almacenamiento (lo olvida todo al apagarse; es un espacio de trabajo, no una caja fuerte) y no es un simple multiplicador de velocidad. Ir más allá de lo que usa tu carga de trabajo **no aporta beneficio**; una parte vacía del escritorio no hace que trabajes más rápido. La ganancia de añadir RAM solo es real hasta el punto en que dejas de quedarte sin ella.

## Cantidades sensatas (a mediados de los 2020)

| Uso | RAM cómoda |
| --- | --- |
| Ligero: web, correo, vídeo, documentos básicos | 8 GB (utilizable, empieza a quedarse corto) |
| General: muchas pestañas, ofimática, multitarea ligera | 16 GB: el punto dulce actual |
| Pesado: grandes conjuntos de datos, máquinas virtuales, apps creativas profesionales | 32 GB o más |
| Juego serio | 16–32 GB |
| Móviles | 8 GB sobran para la mayoría; 12 GB es un margen cómodo |

Para la mayoría de compradores de portátiles, **16 GB es el valor por defecto inteligente**: suficiente para hacer multitarea con libertad durante años sin pagar de más por una capacidad que nunca tocarás. 8 GB todavía sirve para uso ligero, pero cada vez se siente más restringido; 32 GB solo justifica su coste con cargas de trabajo genuinamente exigentes.

## Una nota sobre los móviles

La RAM de los móviles funciona de forma parecida, pero el sistema operativo la gestiona de manera más agresiva, suspendiendo apps en segundo plano para que quepan. Más allá de una cantidad cómoda, más RAM sobre todo mantiene más apps "congeladas" en segundo plano: agradable, pero con rendimientos decrecientes. Los llamativos "16 GB" de algunos móviles están muy por encima de lo que el software móvil suele necesitar; a menudo es más alarde de ficha técnica que beneficio percibido.

## Preguntas frecuentes

**¿Más RAM acelerará mi ordenador lento?**
Solo si de verdad te estás quedando sin ella (trasiego constante de disco, apps que se recargan). Si tienes margen de sobra, el cuello de botella está en otra parte, a menudo un disco duro viejo, donde un SSD es la solución real.

**¿Vale la pena una RAM más rápida (más MHz)?**
Para la mayoría, marginalmente: la capacidad (suficientes GB) importa mucho más que la velocidad. La velocidad ayuda en cargas concretas (algunos juegos, gráficos integrados) pero no transformará el uso general.

**¿Puedo añadir RAM después?**
En muchos sobremesas y algunos portátiles, sí; en móviles, portátiles finos y diseños soldados, no: la cantidad que compras es permanente. Cuando no se puede ampliar, compra un poco más de margen del que necesitas hoy.`,
  },
  {
    topicKey: 'usb-c-confusion',
    title: '¿Por qué los cables USB-C son tan confusos?',
    question: '¿Por qué los cables USB-C se comportan tan distinto cuando todos parecen idénticos?',
    summary:
      'El USB-C es solo la forma del conector, no lo que lleva dentro. Dos cables de aspecto idéntico pueden diferir enormemente en potencia de carga, velocidad de datos y soporte de vídeo, porque el estándar del conector y sus capacidades son cosas distintas.',
    tags: ['tecnología', 'usb-c', 'cables', 'consejos de compra'],
    language: 'es',
    image: {
      prompt: promptOf('usb-c-confusion'),
      alt: 'Conectores de aspecto idéntico que revelan un cableado interno muy diferente',
    },
    sources: [
      { title: 'USB Implementers Forum — visión general de USB-C y certificación', url: 'https://www.usb.org/usb-c' },
    ],
    content: `# ¿Por qué los cables USB-C son tan confusos?

La verdad enloquecedora del USB-C es que **el conector es solo una forma.** Ese enchufe ovalado y reversible no te dice nada sobre lo que el cable puede *hacer* realmente, solo que encajará en el puerto. Dos cables que se ven idénticos, se sienten idénticos y cuestan cantidades muy distintas pueden tener capacidades completamente diferentes dentro. La industria estandarizó el enchufe, pero no las facultades que hay detrás, y esa brecha es toda la fuente de la confusión.

## Una forma, muchas capacidades ocultas

Piensa en el USB-C como una puerta estandarizada por la que pueden pasar cosas muy distintas. Tras puertas idénticas, un cable dado podría admitir:

- **Potencia de carga**: desde un goteo (suficiente para un móvil) hasta lo bastante para un portátil y más allá. Los cables de alta potencia tienen un cableado interno más grueso; un cable fino "solo de carga" puede negarse por completo a alimentar un portátil.
- **Velocidad de datos**: desde las viejas y lentas velocidades de USB 2.0 hasta tasas de transferencia modernas vertiginosas. Un cable que carga bien puede mover archivos a paso de tortuga, porque los datos y la energía usan cables internos distintos.
- **Salida de vídeo**: algunos cables USB-C transportan señales de pantalla (a un monitor) y otros sencillamente no, sin ninguna señal externa de la diferencia.

Así que el cable barato del cajón podría cargar tu móvil a la perfección y aun así no mover un monitor ni transferir archivos rápido: no está roto, solo construido para menos.

## Por qué pasó esto

El USB-C metió deliberadamente muchas funciones posibles a través de un único conector universal, para reemplazar la antigua jungla de enchufes incompatibles. La ventaja es un puerto para todo; la desventaja es que "tiene un enchufe USB-C" ya no te dice las capacidades, que dependen de qué estándares subyacentes (y qué cables internos) implementan el cable y los dispositivos concretos. El marketing lo empeoró: los estándares de datos detrás del puerto se han renombrado repetidamente, así que hasta las etiquetas confunden.

## Cómo evitar llevarte un chasco

| Quieres… | Busca |
| --- | --- |
| Cargar un portátil / dispositivo de alta potencia | Un cable homologado para los vatios que necesitas (p. ej. 100 W / 240 W); cables gruesos de calidad |
| Transferir archivos rápido | La especificación de datos (p. ej. "USB 3.2 / USB4 / 10–40 Gbps"), no solo "USB-C" |
| Conectar a un monitor | Soporte de vídeo explícito ("DisplayPort Alt Mode" / Thunderbolt) |
| Solo ir sobre seguro | Marcas de confianza, cables certificados; guarda el cable que vino con el dispositivo y etiquétalo |

Dos hábitos prácticos ahorran más quebraderos de cabeza: **mantén etiquetados los cables buenos** (el que carga tu portátil no es intercambiable con el regalo que vino con unos auriculares) y **compra cables certificados de marcas de confianza**: los cables de alta potencia sin certificar son también una preocupación de seguridad genuina, no solo de rendimiento.

## Preguntas frecuentes

**¿Por qué mi móvil carga lento con un cable pero rápido con otro?**
El cable lento probablemente admite menos potencia o le faltan los cables para negociar la carga rápida. La velocidad de carga depende del cable, del cargador *y* del móvil, todos de acuerdo en un estándar rápido.

**¿Thunderbolt es lo mismo que USB-C?**
Thunderbolt usa el conector USB-C, pero es un superconjunto de gama alta: máximas velocidades, vídeo y datos garantizados. Todos los puertos Thunderbolt tienen forma de USB-C; no todos los puertos USB-C son Thunderbolt.

**¿Un cable malo puede dañar mi dispositivo?**
Un cable de alta potencia mal fabricado y sin certificar puede ser un peligro real. Los cables certificados de confianza llevan la circuitería de seguridad para negociar la potencia correctamente: vale el pequeño sobreprecio en cualquier cosa que transporte vatios serios.`,
  },
];
