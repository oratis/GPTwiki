import type { DraftArticle } from './types';
import { careersWorkEn } from './careers-work.en';

const promptOf = (key: string): string => {
  const hit = careersWorkEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const careersWorkEs: DraftArticle[] = [
  {
    topicKey: 'resume-that-works',
    title: 'Cómo escribir un currículum que de verdad se lea',
    question: '¿Qué hace que un currículum sea eficaz y cómo paso el primer filtro?',
    summary:
      'Un currículum es un documento de marketing con un solo trabajo: ganar un "sí" en 30 segundos. Los que funcionan empiezan con logros cuantificados, reflejan el lenguaje de la oferta, mantienen un formato que las máquinas puedan leer y eliminan todo lo que no demuestre que puedes hacer el puesto.',
    tags: ['empleo', 'búsqueda de trabajo', 'currículum', 'trabajo'],
    language: 'es',
    image: { prompt: promptOf('resume-that-works'), alt: 'Un haz de luz que destaca unos pocos logros cuantificados en un documento limpio' },
    sources: [
      { title: 'Oficina de Servicios Profesionales de Harvard — Guía de currículums y cartas de presentación', url: 'https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/' },
      { title: 'Oficina de Estadísticas Laborales de EE. UU. — Manual de Perspectivas Ocupacionales', url: 'https://www.bls.gov/ooh/' },
    ],
    content: `# Cómo escribir un currículum que de verdad se lea

Un currículum no es tu autobiografía: es **un documento de marketing con un único objetivo: conseguirte la entrevista**. El reclutador que le echa un vistazo dispone de unos pocos segundos para decidir "quizá" o "no". Todo en un currículum eficaz se deriva de esa economía brutal de la atención: empieza con tu evidencia más fuerte, hazlo fácil de hojear y elimina todo lo que no demuestre que puedes hacer *este* trabajo.

## Empieza con logros, no con tareas

El error más común en un currículum es enumerar responsabilidades —lo que se *suponía* que debías hacer— en lugar de logros —lo que de verdad *conseguiste*—. Compara:

| Débil (tarea) | Fuerte (logro) |
| --- | --- |
| "Responsable de gestionar redes sociales" | "Aumenté los seguidores de Instagram un 40% en 6 meses, generando 1.200 leads" |
| "Atención de tickets de soporte al cliente" | "Resolví más de 50 tickets/día con un 95% de satisfacción, reduciendo el tiempo de respuesta un 30%" |
| "Trabajé en el sistema de pago" | "Rediseñé el flujo de pago, reduciendo el abandono del carrito un 18%" |

El patrón es **verbo de acción + lo que hiciste + resultado cuantificado**. Los números son la mayor mejora que pueden hacer la mayoría de los currículums: convierten afirmaciones vagas en evidencia. Incluso cifras aproximadas ("~15%", "decenas", "el doble") superan a la nada, porque demuestran que piensas en términos de impacto.

## Adáptalo al puesto, y al software de selección

Los currículums genéricos pierden frente a los adaptados. Lee la oferta, identifica las habilidades y palabras clave que enfatiza y asegúrate de que tu currículum refleje las que de verdad posees, con las propias palabras de la descripción. Esto importa por partida doble: una persona ve una coincidencia evidente, y muchas empresas pasan los currículums por sistemas de selección automatizados (ATS) que buscan términos relevantes. Para superar el filtro automático, mantén el formato sencillo: encabezados de sección estándar, sin texto enterrado en imágenes, tablas o columnas que el lector automático pueda revolver. Un diseño ingenioso puede literalmente volver tu experiencia invisible para el software.

## Recorta sin piedad

- **Extensión:** una página al principio de la carrera, dos con experiencia sustancial. Más largo indica incapacidad para priorizar.
- **La declaración de objetivo:** anticuada y desperdicia espacio. Un breve resumen de lo que ofreces está bien; "busco un puesto desafiante" no.
- **Historia antigua e irrelevante:** el trabajo a tiempo parcial de hace 15 años rara vez se gana su espacio.
- **Relleno evidente:** "trabajador y buen compañero de equipo", "dominio de Microsoft Word". Demuéstralo, no lo afirmes.

Cada línea debería responder: "¿esto me hace más contratable para *este* puesto?". Si no, está diluyendo las líneas que sí lo hacen.

## Preguntas frecuentes

**¿Necesito un currículum distinto para cada candidatura?**
No desde cero: ten una versión maestra y luego adapta el tercio superior (resumen, habilidades, primeros puntos) a cada puesto. Esa orientación es lo que convierte; una hora de adaptación supera a cincuenta envíos genéricos.

**¿Debo incluir foto, edad o estado civil?**
En EE. UU./Reino Unido/Canadá, no: invita al sesgo y desperdicia espacio (las normas varían según el país; algunas regiones esperan foto). Ante la duda, deja que hable el trabajo.

**¿Cómo manejo los vacíos laborales?**
No los ocultes con torpeza. Un encuadre breve y honesto (cuidados, estudios, una pausa planeada, búsqueda de empleo) más el foco en habilidades mantenidas al día es mucho mejor que juegos sospechosos con las fechas. A la mayoría de los empleadores les importa más lo que puedes hacer ahora que una cronología impecable y sin interrupciones.`,
  },
  {
    topicKey: 'job-interview-prep',
    title: 'Cómo prepararte para una entrevista de trabajo',
    question: '¿Cómo debo prepararme para una entrevista de trabajo y rendir de verdad?',
    summary:
      'El éxito en una entrevista nace de la preparación, no del carisma: investiga la empresa, prepara historias que demuestren tus habilidades con una estructura como STAR, ensaya en voz alta y trátala como una conversación de doble vía en la que tú también los evalúas.',
    tags: ['empleo', 'búsqueda de trabajo', 'entrevistas', 'trabajo'],
    language: 'es',
    image: { prompt: promptOf('job-interview-prep'), alt: 'Dos sillas iguales con luz fluyendo en ambos sentidos y tarjetas de historias preparadas esperando' },
    sources: [
      { title: 'Departamento de Trabajo de EE. UU. CareerOneStop — Preparación de la entrevista', url: 'https://www.careeronestop.org/JobSearch/Interview/interview-preparation.aspx' },
      { title: 'Asesoría Profesional del MIT — Entrevistas conductuales y STAR', url: 'https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/' },
    ],
    content: `# Cómo prepararte para una entrevista de trabajo

Las entrevistas recompensan la preparación mucho más que el encanto natural. El candidato que parece "bueno por naturaleza" en la sala es casi siempre quien hizo el trabajo invisible de antemano: investigó la empresa, conectó sus propias historias con el puesto y ensayó hasta que las respuestas sonaron naturales. No puedes controlar las preguntas, pero sí cuán preparado estás para las predecibles, que son la mayoría.

## Investiga como si ya trabajaras allí

Antes de la entrevista, aprende lo suficiente sobre la empresa como para hablar de ella de forma específica: qué hace, quiénes son sus clientes, noticias recientes y cómo encaja el puesto al que aspiras. Esto rinde en dos lugares: responderás "¿por qué quieres trabajar aquí?" con sustancia en lugar de halagos, y harás preguntas más agudas. El entusiasmo genérico suena a "aceptaría cualquier trabajo"; el conocimiento específico suena a "quiero *este*".

## Prepara historias, no adjetivos

La mayoría de las entrevistas se apoyan en **preguntas conductuales** —"cuéntame de una vez en que…"— porque el comportamiento pasado predice el futuro mejor que la autodescripción. El error es responder con rasgos ("se me da muy bien resolver problemas"). Responde con una *historia*, estructurada para que cale:

**STAR** mantiene las historias precisas y completas:
- **Situación** — el contexto, en breve.
- **Tarea** — lo que necesitabas lograr.
- **Acción** — lo que *tú* hiciste específicamente (no "nosotros").
- **Resultado** — el desenlace, cuantificado si es posible.

Prepara de 6 a 8 historias flexibles de tu experiencia que cubran temas comunes: un conflicto, un fracaso y lo que aprendiste, un momento de liderazgo, un plazo ajustado, una vez en que influiste sin tener autoridad. La mayoría de las preguntas conductuales son variaciones de estas, así que un puñado de historias bien construidas cubre un rango sorprendente.

## Ensaya en voz alta, y prepara tus propias preguntas

Leer las respuestas en tu cabeza no es ensayar; decirlas en voz alta sí. Practicar en voz alta (ante un amigo, una cámara o una sala vacía) saca a la luz las divagaciones y los huecos que la revisión silenciosa esconde, y hace que lo real se sienta familiar. Prepara también las clásicas —"háblame de ti", "por qué este puesto", "tu mayor debilidad"— y un buen cierre: preguntas reflexivas para *ellos*. Preguntar por el equipo, los retos o cómo se ve el éxito señala interés genuino y te da la información para decidir si siquiera quieres el trabajo.

## Preguntas frecuentes

**¿Cómo respondo a "cuál es tu mayor debilidad"?**
Elige una debilidad real pero no descalificante y, sobre todo, qué estás haciendo al respecto. El punto no es el defecto, sino si tienes autoconocimiento honesto y el impulso de mejorar. Evita la respuesta falsa de "trabajo demasiado"; no engaña a nadie.

**¿Y si no sé la respuesta a una pregunta técnica?**
Piensa en voz alta y muestra tu razonamiento en lugar de bloquearte o fingir. A los entrevistadores suele importarles más cómo abordas lo desconocido que si lo sabes al instante. "No estoy seguro, pero así es como lo averiguaría" es una respuesta fuerte.

**Es una entrevista, pero yo también los evalúo, ¿de verdad?**
Sí, y esa mentalidad te ayuda. Tratarla como mutua —tú decides si este trabajo te conviene— reduce la desesperación, mejora tus preguntas y se percibe como confianza. Los mejores resultados vienen del encaje, no de "ganar" un puesto que no es para ti.`,
  },
  {
    topicKey: 'salary-negotiation',
    title: 'Cómo negociar tu salario (sin perder la oferta)',
    question: '¿Cómo negocio el salario con eficacia? ¿Es arriesgado pedir más?',
    summary:
      'Negociar es lo esperado, rara vez te cuesta la oferta y se compone a lo largo de toda tu carrera. Las claves: conoce tu valor de mercado, deja que el empleador diga una cifra primero cuando puedas, ancla con un rango investigado y negocia el paquete completo, no solo el sueldo base.',
    tags: ['empleo', 'negociación salarial', 'dinero', 'trabajo'],
    language: 'es',
    image: { prompt: promptOf('salary-negotiation'), alt: 'Una balanza que equilibra habilidades y monedas, con sitio para añadir más' },
    sources: [
      { title: 'Oficina de Estadísticas Laborales de EE. UU. — Datos salariales por ocupación', url: 'https://www.bls.gov/oes/' },
      { title: 'Programa de Negociación de Harvard — Investigación sobre negociación salarial', url: 'https://www.pon.harvard.edu/category/daily/salary-negotiations/' },
    ],
    content: `# Cómo negociar tu salario (sin perder la oferta)

La mayoría de la gente acepta la primera cifra que le ofrecen, y deja dinero sobre la mesa durante años en silencio, porque los aumentos y las futuras ofertas suelen construirse sobre esa cifra inicial. Negociar parece arriesgado e incómodo, pero la realidad es tranquilizadora: **los empleadores lo esperan, una oferta casi nunca se retira por una contraoferta educada y razonable, y la ventaja se compone a lo largo de toda tu carrera**. Unos miles más al principio, multiplicados durante décadas, valen mucho más que la incomodidad de una sola conversación.

## Conoce tu cifra antes de hablar

El negociador que ha hecho los deberes tiene un poder silencioso. Antes de cualquier conversación, investiga la **tarifa de mercado** del puesto —por cargo, ubicación, sector y tu nivel de experiencia— usando sitios de datos salariales, rangos públicos y personas de tu red. Esto te da un rango defendible en lugar de una suposición esperanzada, y te impide tanto pedir de menos como nombrar algo tan disparatado que suene ingenuo. Ten claras tres cifras: tu objetivo realista, tu "gran resultado" y el suelo a partir del cual te retiras.

## Deja que vayan primero, y luego ancla

Cuando puedas, **evita ser el primero en dar una cifra**. Si te preguntan tus expectativas pronto, está bien esquivarlo: "Me gustaría entender primero el puesto y el paquete completo. ¿Qué rango tienen presupuestado?". La primera cifra concreta ancla la negociación, y prefieres que sea la suya. Cuando des una cifra, ofrece un **rango investigado** con tu objetivo cerca del extremo bajo del punto en el que estarías contento, y átalo al valor: "Según mi experiencia con X y el mercado para este puesto, mi objetivo es Y".

## Negocia el paquete completo, y mantente colaborativo

El salario base es el titular, pero no es la única palanca, y a veces tampoco la más flexible:

| Palanca | Cuándo ayuda |
| --- | --- |
| Bono de contratación | Salva una brecha cuando el base está topado |
| Acciones / equity | Recorrido significativo en startups y grandes tecnológicas |
| Vacaciones / flexibilidad | Alto valor personal, bajo coste para el empleador |
| Cargo / fecha de inicio / momento de la revisión | A veces vale más que un pequeño aumento |
| Presupuesto de formación, ayuda para remoto | Síes fáciles que aportan valor real |

En todo momento, mantén un tono **colaborativo, no adversarial**. No estás peleando contra ellos; estáis resolviendo juntos "¿cómo hacemos que esto funcione?". Una petición cálida, específica y bien documentada ("Me ilusiona este puesto, ¿podemos llevar el base a Y?") casi nunca ofende, y señala justo el tipo de confianza que los empleadores quieren en la gente que contratan.

## Preguntas frecuentes

**¿Pedir más podría costarme la oferta?**
Muy rara vez, si eres educado y razonable. Los empleadores esperan la negociación y dejan margen. Una contraoferta respetuosa sobre una oferta real casi nunca hace que la retiren; las historias de terror casi siempre implican ultimátums agresivos, no peticiones normales.

**¿Y si preguntan mi salario actual?**
En muchos lugares puedes declinar (y en algunos es ilegal que lo pregunten). Redirige hacia tu objetivo según el puesto y el mercado: "Prefiero centrarme en el valor que aportaría a esta posición". Tu sueldo anterior no debería poner techo al nuevo.

**¿Debo negociar aunque la oferta sea buena?**
Suele valer la pena intentarlo: una sola contraoferta educada a menudo rinde más, y un "no" simplemente te devuelve a la oferta original. La asimetría favorece preguntar. Pero una vez que has acordado, cúmplelo; no reabras un trato cerrado.`,
  },
  {
    topicKey: 'remote-work-effectively',
    title: 'Cómo trabajar en remoto sin quemarte ni estancar tu carrera',
    question: '¿Cómo me mantengo productivo, visible y cuerdo trabajando en remoto?',
    summary:
      'El trabajo remoto cambia el desplazamiento y la fricción de la oficina por dos retos nuevos: proteger el límite entre trabajo y hogar, y mantenerte visible cuando nadie te ve trabajar. Triunfar en ello exige comunicación deliberada, un corte firme al día y mostrar tu trabajo de forma proactiva.',
    tags: ['empleo', 'trabajo remoto', 'productividad', 'trabajo'],
    language: 'es',
    image: { prompt: promptOf('remote-work-effectively'), alt: 'Una isla de escritorio en casa enlazada por luz a compañeros lejanos, con un límite entre trabajo y descanso' },
    sources: [
      { title: 'Stanford — Investigación de Nicholas Bloom sobre la productividad del trabajo remoto', url: 'https://www.gsb.stanford.edu/faculty-research/working-papers' },
      { title: 'CDC / NIOSH — Equilibrio vida-trabajo y bienestar en el trabajo remoto', url: 'https://www.cdc.gov/niosh/index.html' },
    ],
    content: `# Cómo trabajar en remoto sin quemarte ni estancar tu carrera

El trabajo remoto elimina costes evidentes —desplazamientos, ruido de oficina, interrupciones constantes— y añade en silencio dos más sutiles. Primero, el límite entre trabajo y vida se disuelve cuando tu oficina es tu casa, así que el riesgo no es holgazanear; es **no desconectar nunca**. Segundo, cuando nadie te ve trabajar físicamente, desaparece la visibilidad natural de una oficina, y el buen trabajo puede pasar inadvertido. Prosperar en remoto significa gestionar ambas cosas de forma deliberada.

## Protege el límite

En una oficina, el desplazamiento y el acto de marcharse crean un final natural de la jornada. En casa ese ritual se pierde, y "solo una cosa más" puede estirar el día indefinidamente hasta que las noches entre semana y los fines de semana se difuminan en trabajo. Reconstruye el límite a propósito:

- **Un corte firme.** Decide cuándo termina el trabajo y represéntalo: cierra el portátil, cámbiate de ropa, sal de la habitación. Un pequeño ritual le señala a tu cerebro "se acabó".
- **Un espacio dedicado**, aunque sea un rincón. Trabajar desde la cama o el sofá entrena a tu cerebro para nunca descansar del todo *ni* concentrarse del todo.
- **Pausas de verdad.** Sin colegas que te arrastren a comer, te saltarás las pausas a menos que las programes. Sal fuera; muévete.

La verdad contraintuitiva: quienes trabajan en remoto tienden a *trabajar de más*, no de menos. Proteger tus horas libres no es holgazanear; es lo que te mantiene productivo durante meses en lugar de quemarte en uno.

## Comunica de forma deliberada y mantente visible

Las oficinas comunican por ósmosis: contexto oído al pasar, charlas de pasillo, ajetreo visible. El trabajo remoto no tiene nada de eso, así que debes hacer la comunicación **explícita**:

- **Sobrecomunica tu estado.** Comparte en qué trabajas, qué está bloqueado y qué terminaste. El silencio de quien trabaja en remoto se lee como ausencia, aunque estés entregando con la cabeza agachada.
- **Por defecto, asíncrono y por escrito.** Las actualizaciones escritas claras superan a esperar que alguien notara tu trabajo; además dejan registro y respetan a quienes están en otras zonas horarias.
- **Haz tu impacto legible.** Esto no es presumir; es reemplazar la visibilidad que la oficina daba gratis. Resume resultados, demuestra lo que construiste, habla en las reuniones. Si lo permites, "fuera de la vista" se vuelve en silencio "fuera de la mente" a la hora de los ascensos.

## Combate el aislamiento

El trabajo remoto puede ser solitario, y la soledad erosiona tanto el bienestar como la motivación. Mantén contacto humano deliberado: videollamadas ocasionales sin agenda, un café virtual, un encuentro presencial cuando sea posible. La conexión es un insumo real del trabajo remoto sostenible, no un capricho.

## Preguntas frecuentes

**¿Tengo menos probabilidades de ascender trabajando en remoto?**
Hay un riesgo real de "sesgo de proximidad": jefes que favorecen a quienes ven. Lo contrarrestas haciendo tu trabajo y tus resultados muy visibles, construyendo relaciones a propósito y teniendo conversaciones directas de carrera con tu jefe en lugar de asumir que el buen trabajo habla por sí solo.

**¿Cómo dejo de trabajar todo el tiempo?**
Fija un corte firme y hazlo cumplir con un ritual y separación física (cierra el portátil, sal de la habitación, apaga las notificaciones). Trata el final de tu jornada como algo tan innegociable como una reunión. El límite no aparecerá por sí solo.

**¿De verdad el trabajo remoto es igual de productivo?**
La investigación suele hallar que quienes trabajan en remoto o de forma híbrida son al menos igual de productivos en el trabajo concentrado, y los esquemas híbridos a menudo puntúan más alto en satisfacción y retención. La cuestión de la productividad suele depender menos de la ubicación que de las normas de comunicación y la gestión.`,
  },
  {
    topicKey: 'career-networking',
    title: 'Networking para quienes odian el networking',
    question: '¿Cómo hago networking eficaz si el networking tradicional me resulta incómodo?',
    summary:
      'La mayoría de los empleos y oportunidades fluyen a través de relaciones, no de candidaturas, pero el networking eficaz no es adular. Es construir vínculos genuinos siendo útil y curioso, mantener un contacto ligero y recordar que los "vínculos débiles" (los conocidos) son los que abren más puertas.',
    tags: ['empleo', 'networking', 'búsqueda de trabajo', 'trabajo'],
    language: 'es',
    image: { prompt: promptOf('career-networking'), alt: 'Una red cálida de nodos que brilla más donde las conexiones son genuinas y recíprocas' },
    sources: [
      { title: 'Mark Granovetter, "La fuerza de los vínculos débiles" (1973)', url: 'https://www.jstor.org/stable/2776392' },
      { title: 'Departamento de Trabajo de EE. UU. CareerOneStop — Networking', url: 'https://www.careeronestop.org/JobSearch/Network/network-with-people.aspx' },
    ],
    content: `# Networking para quienes odian el networking

Si "networking" te hace imaginar charla forzada y repartir tarjetas a desconocidos, te han vendido la peor versión de algo de verdad valioso. Aquí va el replanteamiento: **el networking no es más que construir y mantener relaciones reales**, y la mayoría de las oportunidades (empleos, clientes, colaboraciones, consejos) viajan a través de gente que te conoce, no de candidaturas en frío. No tienes que volverte extrovertido. Tienes que volverte útil y localizable.

## Por qué los conocidos importan más que los amigos

Uno de los hallazgos más famosos de la sociología, "la fuerza de los vínculos débiles" de Mark Granovetter, lo explica: tus amigos cercanos en su mayoría conocen a la misma gente y las mismas oportunidades que tú ya conoces. Tus **vínculos débiles** —excompañeros, antiguos compañeros de clase, conocidos— se mueven en otros círculos, así que son ellos quienes sacan a la luz empleos e información que de otro modo nunca oirías. Esto es liberador para quien rehúye el networking: no necesitas forjar lazos profundos con todo el mundo. Una red amplia y ligeramente mantenida de conocidos es justo lo que abre puertas.

## Da antes de pedir

El networking que da grima es transaccional: contactar solo cuando necesitas algo. El que funciona es lo contrario: **sé útil primero**. Comparte un artículo que alguien valoraría, haz una presentación entre dos personas, ofrece ayuda, felicita un logro, responde una pregunta de tu área. Estos gestos pequeños y genuinos construyen buena voluntad sin agenda, de modo que cuando *sí* necesites algo más adelante, seas un contacto real y no un desconocido con una petición. El motor es la generosidad, no el encanto.

La curiosidad hace el resto. La ansiedad del networking suele venir de sentir que tienes que impresionar; sustitúyela por un interés genuino en la otra persona: en qué trabaja, qué está resolviendo. La gente recuerda a quienes se interesaron por *ellos*, y la curiosidad es mucho más fácil de sostener que la actuación.

## Mantén un contacto ligero (la parte que todos se saltan)

La mayoría hace networking solo cuando busca empleo, que es el peor momento: desesperado y unidireccional. El enfoque duradero es el **contacto ligero y continuo**: un mensaje cada pocos meses, un comentario sobre el trabajo de alguien, un reencuentro ocasional. Cuesta poco y significa que, cuando necesites una recomendación o un consejo, contactas con una relación tibia en lugar de resucitar una fría. Un "vi esto y me acordé de ti" de dos líneas mantiene viva una conexión durante años.

## Preguntas frecuentes

**Soy introvertido, ¿simplemente se me da mal esto?**
No. Los introvertidos a menudo hacen networking *mejor* uno a uno, donde la profundidad y la escucha superan a moverse por la sala. Sáltate los grandes eventos si los odias; construye un número menor de relaciones reales mediante cafés, comunidades en línea e intereses compartidos. La calidad vence al volumen.

**¿Cómo pido ayuda sin sentir que estoy usando a la gente?**
Sé específico, pónselo fácil para decir que no y respeta su tiempo ("¿Podría hacerte dos preguntas sobre X? Sin problema si andas a tope"). Las peticiones específicas, modestas y fáciles de rechazar se sienten como un cumplido, no como una imposición, y a la mayoría de la gente le gusta de verdad ayudar cuando se le pide bien.

**¿Cuenta el networking en línea?**
Por supuesto: participar con reflexión en comunidades profesionales, compartir trabajo útil y comentar con genuinidad construyen relaciones y alcance reales. Para mucha gente es menos agotador y más eficaz que los eventos presenciales.`,
  },
  {
    topicKey: 'changing-careers',
    title: 'Cómo cambiar de carrera (sin empezar de cero)',
    question: '¿Cómo cambio a un nuevo campo profesional? ¿Tendré que empezar de nuevo?',
    summary:
      'Los cambios de carrera rara vez significan empezar de cero: la mayoría de tus habilidades se transfieren. El camino es identificar esas habilidades transferibles, cerrar de forma deliberada las brechas concretas, construir pruebas con proyectos y contar por qué el cambio tiene sentido.',
    tags: ['empleo', 'cambio de carrera', 'habilidades', 'trabajo'],
    language: 'es',
    image: { prompt: promptOf('changing-careers'), alt: 'Una figura cruzando un puente hecho de habilidades transferibles hacia una nueva isla' },
    sources: [
      { title: 'Oficina de Estadísticas Laborales de EE. UU. — Manual de Perspectivas Ocupacionales (habilidades transferibles, perspectivas)', url: 'https://www.bls.gov/ooh/' },
      { title: 'CareerOneStop — Evaluación de habilidades y herramientas de cambio de carrera', url: 'https://www.careeronestop.org/' },
    ],
    content: `# Cómo cambiar de carrera (sin empezar de cero)

El miedo que frena a la mayoría de quienes quieren cambiar de carrera es "tendré que empezar de cero, desde abajo". Suele ser falso. A menos que cambies a algo muy técnico y blindado por credenciales (como medicina o derecho), **la mayoría de lo que has construido se transfiere**: el truco está en reconocerlo, encuadrarlo y rellenar solo las brechas concretas que queden. Un cambio de carrera es un puente, no un precipicio.

## Haz inventario de tus habilidades transferibles

Las habilidades vienen en dos clases. Las **habilidades de dominio** son específicas de un campo (saber derecho fiscal, escribir Python). Las **habilidades transferibles** viajan a cualquier sitio: comunicación, gestión de proyectos, análisis, liderazgo, resolución de problemas, trato con clientes, gestión de presupuestos. La mayor parte de tu valor vive en el montón de las transferibles, y te sigue a un nuevo campo. Una maestra que pasa a la formación corporativa lleva consigo habilidades de presentación, diseño curricular y dominio de la sala; un periodista que pasa al marketing lleva investigación, redacción y cumplir plazos. Antes que nada, enumera lo que de verdad haces bien con independencia de tu cargo actual: ese es tu capital de partida.

## Cierra la brecha a propósito, y luego demuéstralo

Una vez que conoces el puesto objetivo, identifica las habilidades o conocimientos **concretos** que requiere y que aún no tienes —no "todo", solo las brechas genuinas—. Luego ciérralas a propósito: un curso enfocado, una certificación donde de verdad importe, o aprender haciendo. Y, crucialmente, **construye pruebas**. En la mayoría de los campos, la capacidad demostrada vence a las credenciales: una pieza de portafolio, un proyecto freelance, un rol de voluntariado, un proyecto paralelo o una contribución a una comunidad abierta muestran que puedes hacer el nuevo trabajo, no solo que te interesa. La prueba es lo que convierte a un candidato esperanzado en uno creíble.

## Cuenta una historia coherente

Quienes cambian de carrera pierden entrevistas no por capacidad, sino por una narrativa confusa. Los empleadores se preguntan: "¿Por qué el cambio? ¿Se quedará? ¿De verdad puede hacer esto?". Anticípate con una historia clara que enmarque el cambio como una progresión lógica, no como una huida: qué te atrajo del nuevo campo, qué lo conecta con tu pasado y por qué tu trayectoria inusual es un *activo*, no un lastre. "Mis años en ventas me enseñaron exactamente con qué luchan los clientes, por eso pasé a producto" supera a un disculpe "solo quería algo diferente". Tu trayectoria mixta es una virtud: encuádrala como tal.

## Preguntas frecuentes

**¿Tendré que aceptar un recorte de sueldo?**
A veces, sobre todo al entrar en un campo totalmente nuevo en un nivel más junior, pero no siempre, y rara vez de vuelta a cero. Unas habilidades transferibles sólidas, la prueba de capacidad y una buena negociación limitan la caída, y la trayectoria a largo plazo en un trabajo que te encaja mejor a menudo la recupera con creces.

**¿Soy demasiado mayor para cambiar de carrera?**
La gente cambia de carrera con éxito a cualquier edad. La experiencia y la madurez son activos que los empleadores valoran; tus habilidades transferibles y tu historial de sacar cosas adelante no caducan. El mayor riesgo suele ser quedarse por miedo en un sitio que no es para ti.

**¿Necesito volver a estudiar?**
A menudo no. La reeducación formal importa para campos con licencia (sanidad, derecho, ingeniería), pero para muchos puestos, cursos específicos más un portafolio de trabajo real te llevan allí más rápido y más barato. Busca un título solo cuando el campo de verdad lo exija.`,
  },
  {
    topicKey: 'work-burnout',
    title: 'Burnout: qué es realmente y cómo recuperarse',
    question: '¿Qué es el burnout, en qué se diferencia del estrés normal y cómo me recupero?',
    summary:
      'El burnout es estrés laboral crónico que ha desbordado tu capacidad de afrontamiento, marcado por agotamiento, cinismo y eficacia reducida. Es un problema sistémico, no una debilidad personal, y recuperarse suele exigir cambiar las condiciones, no solo descansar con más fuerza.',
    tags: ['trabajo', 'burnout', 'salud mental', 'bienestar'],
    language: 'es',
    image: { prompt: promptOf('work-burnout'), alt: 'Una lámpara titilante restaurada al quitarle pesos y dejar entrar aire, no al forzarla' },
    sources: [
      { title: 'Organización Mundial de la Salud — El burnout como fenómeno ocupacional (CIE-11)', url: 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases' },
      { title: 'Maslach y Leiter — Investigación sobre las dimensiones del burnout', url: 'https://www.apa.org/monitor/2022/01/special-burnout-stress' },
    ],
    content: `# Burnout: qué es realmente y cómo recuperarse

El burnout es más que "estoy cansado" o "esta semana fue dura". La Organización Mundial de la Salud lo define específicamente como un síndrome resultante de **estrés laboral crónico que no se ha gestionado con éxito**. Tiene tres señas: un profundo **agotamiento** (vaciamiento físico y emocional), **cinismo** (creciente distancia o negatividad hacia tu trabajo) y una sensación de **eficacia reducida** (sentir que ya no haces buen trabajo, por más que te esfuerces). Si esa tríada te suena, vale la pena tomarla en serio, y vale la pena saber que es un fenómeno ocupacional reconocido, no un defecto de carácter.

## Estrés vs. burnout: una diferencia importante

El estrés normal es "demasiado": demasiadas demandas, pero aún puedes imaginar alivio al otro lado. El burnout es "vacío": estás vaciado, desenganchado, y un fin de semana libre ya no te recarga. El estrés se siente como ahogarse entre responsabilidades; el burnout se siente como estar seco y más allá de que te importe. La distinción importa porque las soluciones difieren: el estrés puede ceder con mejor gestión del tiempo o un descanso, mientras que el burnout genuino suele requerir cambiar las **condiciones** que lo causaron, no solo descansar con más fuerza y volver a la misma rueda.

## Suele ser la situación, no tú

El replanteamiento más importante: el burnout lo impulsa en gran medida **el entorno laboral**, no la debilidad personal. La investigación lo vincula sistemáticamente a condiciones concretas:

| Detonante | Cómo se ve |
| --- | --- |
| Carga de trabajo insostenible | Sobrecarga crónica sin recuperación |
| Falta de control | Sin voz sobre cómo o cuándo trabajas |
| Recompensa insuficiente | Esfuerzo no reconocido, mal pagado, invisible |
| Injusticia | Favoritismo, confianza rota, incoherencia |
| Conflicto de valores | Que te pidan actuar contra tus principios |
| Ruptura de la comunidad | Aislamiento, conflicto, ningún apoyo |

Fíjate en que estas son en su mayoría *organizativas*, no individuales. Por eso "solo haz yoga y duerme más" fracasa tan a menudo como cura: el autocuidado puede ayudarte a afrontarlo, pero no puede arreglar un trabajo fundamentalmente insostenible. Recuperarse a menudo significa renegociar la carga, los límites, el rol o, a veces, el propio empleo.

## Recuperarse

La recuperación real suele combinar lo personal y lo estructural: descanso y desconexión genuinos para volver a llenar el depósito; reafirmar los límites (decir que no, proteger las horas libres); reconectar con lo que daba sentido al trabajo; y —a menudo el paso decisivo— **cambiar las condiciones**, ya sea hablando con tu jefe sobre la carga y el control, reestructurando tu rol o marchándote. El apoyo también importa: el burnout prospera en el aislamiento, y hablar con la gente (incluido un profesional si es grave) es parte de la salida, no una admisión de fracaso.

## Preguntas frecuentes

**¿Puedo recuperarme del burnout sin renunciar a mi trabajo?**
A menudo sí, si los detonantes de fondo pueden cambiar. Renegociar la carga, ganar más control, poner límites más firmes y reajustar tu rol pueden bastar. Pero si las condiciones son fijas y tóxicas, a veces marcharse es la opción más sana y racional, no una derrota.

**¿El burnout es lo mismo que la depresión?**
Se solapan y pueden coexistir, pero el burnout está específicamente ligado al trabajo, mientras que la depresión es más amplia e impregna toda la vida. El ánimo bajo persistente, la desesperanza o los pensamientos de autolesión van más allá del burnout y justifican ayuda profesional sin demora.

**¿Unas vacaciones lo arreglarán?**
Un descanso puede aliviar el agotamiento agudo, pero si vuelves a las mismas condiciones que te vaciaron, el burnout suele regresar en semanas. El descanso trata el síntoma; cambiar las condiciones trata la causa.`,
  },
  {
    topicKey: 'cover-letter',
    title: '¿Siguen importando las cartas de presentación, y cómo escribir una buena?',
    question: '¿Sigue valiendo la pena escribir cartas de presentación, y qué debería decir una?',
    summary:
      'Las cartas de presentación hoy suelen ser opcionales, pero, bien hechas, aún inclinan las decisiones reñidas. Una buena no es un currículum en prosa: argumenta de forma específica por qué tú y este puesto encajáis, demuestra que entiendes la empresa y aporta el contexto que el currículum no puede.',
    tags: ['empleo', 'búsqueda de trabajo', 'carta de presentación', 'trabajo'],
    language: 'es',
    image: { prompt: promptOf('cover-letter'), alt: 'Una carta que se despliega en un solo haz que enlaza a una persona con una empresa' },
    sources: [
      { title: 'Oficina de Servicios Profesionales de Harvard — Guía de cartas de presentación', url: 'https://careerservices.fas.harvard.edu/resources/create-a-strong-cover-letter/' },
      { title: 'CareerOneStop — Conceptos básicos de la carta de presentación', url: 'https://www.careeronestop.org/JobSearch/Resumes/cover-letters.aspx' },
    ],
    content: `# ¿Siguen importando las cartas de presentación, y cómo escribir una buena?

La respuesta honesta sobre si las cartas de presentación siguen importando: **depende, y son opcionales más a menudo que antes**, pero una buena aún inclina las decisiones reñidas a tu favor, y una débil o ausente puede costarte cuando un responsable de contratación elige entre candidatos similares. Trata la carta de presentación como una opción de alto apalancamiento: sáltala donde de verdad no se quiera, invierte en ella donde pueda diferenciarte.

## Para qué sirve de verdad una carta de presentación

El mayor error es escribir una carta que se limite a recontar el currículum en párrafos. El currículum ya enumera *qué* has hecho; el trabajo de la carta es construir el **argumento** que el currículum no puede, en concreto: *por qué tú y este puesto encajáis con fuerza*. Una buena hace tres cosas que el currículum no:

- **Demuestra que entiendes la empresa y el puesto** —específico, no halago genérico—, probando que de verdad quieres *este* trabajo.
- **Conecta tu experiencia con sus necesidades** —"necesitáis X; esta es la vez en que entregué exactamente eso".
- **Aporta contexto** que el currículum no puede cargar: un cambio de carrera explicado, un vacío abordado, un entusiasmo inusual por una misión concreta.

## Una estructura sencilla y eficaz

| Parte | Trabajo |
| --- | --- |
| **Apertura** | Engánchalos: por qué este puesto/empresa en concreto, no "le escribo para solicitar…" |
| **Cuerpo (1-2 párrafos)** | Tu evidencia más fuerte y relevante atada a *sus* necesidades, con un ejemplo concreto |
| **Cierre** | Reafirma el encaje, breve y con confianza, con un siguiente paso claro |

Mantenla en **una página, tres o cuatro párrafos ajustados**. Dirígete a una persona real si puedes encontrarla. Empieza con algo específico y enérgico; la apertura genérica "le escribo para expresar mi interés en el puesto" desperdicia tu mejor línea. Y adapta cada carta: una carta reciclada de "buscar y reemplazar" suele ser peor que ninguna, porque se notan las costuras.

## Cuándo molestarse (y cuándo no)

Escribe una carta de presentación genuina cuando: la candidatura la pide, cambias de carrera o tienes un vacío que explicar, te apasiona especialmente esa empresa concreta, o es un puesto competitivo donde cualquier ventaja ayuda. Sáltala o minimízala cuando el formulario la marque como claramente opcional y no tengas nada que añadir más allá del currículum: una carta hecha sin ganas no suma nada y puede restar. La regla: escribe una cuando tengas un *argumento real y específico* que hacer; no rellenes cuando no lo tengas.

## Preguntas frecuentes

**¿Debería usar IA para escribir mi carta de presentación?**
Como apoyo para redactar, está bien, pero el resultado genérico de la IA suena genérico, que es justo el modo de fallo a evitar. Úsala para empezar y luego hazla específica: detalles reales sobre la empresa, ejemplos reales de tu vida, tu voz auténtica. La especificidad es todo el punto, y solo tú la tienes.

**¿Cuán formal debe ser?**
Ajústala a la cultura de la empresa —un tono pulido para un bufete, uno más cálido para una startup informal—, pero siempre profesional y sin errores. Una sola errata en un documento corto y deliberado destaca para mal.

**¿Y si no encuentro el nombre del responsable de contratación?**
"Estimado equipo de selección" o "Estimado equipo de [departamento]" sirve. Evita el anticuado "A quien corresponda". Un poco de investigación (el sitio de la empresa, LinkedIn) a veces saca un nombre, y ese pequeño esfuerzo se nota.`,
  },
  {
    topicKey: 'asking-for-raise',
    title: 'Cómo pedir un aumento (y conseguirlo de verdad)',
    question: '¿Cómo pido un aumento y qué me da la mejor probabilidad de un sí?',
    summary:
      'Conseguir un aumento es un argumento que construyes, no un favor que pides. Documenta tu impacto, investiga tu valor de mercado, elige bien el momento y enfócalo en el valor que entregas; luego pide de forma directa y específica en lugar de esperar a que lo noten.',
    tags: ['empleo', 'salario', 'aumento', 'trabajo'],
    language: 'es',
    image: { prompt: promptOf('asking-for-raise'), alt: 'Bloques de logros apilándose más alto con una flecha de valor mientras se añade uno más' },
    sources: [
      { title: 'Programa de Negociación de Harvard — Pedir un aumento', url: 'https://www.pon.harvard.edu/category/daily/salary-negotiations/' },
      { title: 'Oficina de Estadísticas Laborales de EE. UU. — Datos de salarios e ingresos', url: 'https://www.bls.gov/bls/wages.htm' },
    ],
    content: `# Cómo pedir un aumento (y conseguirlo de verdad)

Esperar en silencio a que recompensen el buen trabajo es la estrategia de aumento más común, y una de las peores. Los jefes están ocupados, los presupuestos son finitos, y la rueda que chirría pero con razón es la que recibe el aceite. El replanteamiento que lo cambia todo: **un aumento es un caso de negocio que construyes y presentas, no un favor personal que pides**. Tu trabajo es hacer que decir que sí sea fácil y esté bien justificado para tu jefe, y eso requiere preparación, no solo valor.

## Construye el caso: documenta tu impacto

Mucho antes de la conversación, lleva un registro continuo de tus **logros e impacto**: proyectos entregados, problemas resueltos, ingresos influidos, costes recortados, responsabilidades que crecieron más allá de tu rol original. Los datos concretos con números son tu evidencia: "Lideré el proyecto que trajo X" o "Asumí las funciones del puesto senior vacante durante seis meses". La memoria no es fiable y el recuerdo interesado no convence; un registro concreto te permite entrar con pruebas en lugar de sensaciones. El caso más fuerte muestra que ya operas por encima de tu sueldo actual.

## Conoce tu valor de mercado, y elige bien el momento

Empareja tu caso interno con **datos externos**: ¿cuánto paga este puesto en otros sitios, para tu experiencia y ubicación? Si te pagan por debajo del mercado por lo que entregas, ese es un argumento poderoso y objetivo. En cuanto al **momento**, tus probabilidades suben en instantes naturales: tras una victoria clara, en un ciclo de evaluación, cuando has asumido más, o cuando a la empresa le va bien. Evita pedir justo después de que el equipo no alcanzara sus objetivos, durante una congelación de contrataciones, o cuando tu jefe está visiblemente desbordado. Leer el momento es parte de la petición.

## Haz la petición: directa, específica, enmarcada en el valor

Cuando llegue el momento, sé **directo y específico**. No insinúes ni esperes a que lo deduzcan: di claramente que te gustaría hablar de tu remuneración, presenta tu caso (impacto + datos de mercado) y nombra una cifra o un rango concreto. Enmárcalo en torno al **valor, no a la necesidad**: "Según mis contribuciones y el mercado para este puesto, me gustaría llevar mi salario a Y", no "tengo gastos en aumento". Luego calla y deja que respondan. Si la respuesta es "ahora no", conviértela en progreso: pregunta exactamente qué tendría que ser cierto para ganarlo, y para cuándo, transformando un no en una hoja de ruta concreta.

## Preguntas frecuentes

**¿Y si dicen que no?**
No lo trates como el final. Pregunta qué resultados o plazo concretos harían posible un sí, y consíguelo por escrito si puedes. Un camino claro ("alcanza estos objetivos, lo revisamos en seis meses") es una victoria. Si la respuesta honesta es "nunca", esa es información importante sobre si quedarte.

**¿Debería mencionar una oferta competidora?**
Solo si es real y de verdad considerarías aceptarla; farolear puede salir muy mal. Una oferta real es una palanca, pero usarla también puede cambiar la relación, y algunos jefes te dejarán marchar. Sopésalo con cuidado en lugar de blandirlo a la ligera.

**¿Es mejor cambiar de trabajo para conseguir un aumento?**
A menudo los movimientos externos rinden saltos mayores que los aumentos internos, y eso vale la pena saberlo, pero cambiar tiene costes (riesgo, periodo de adaptación, antigüedad perdida). Usa ese conocimiento para valorarte con precisión; deja que nutra tu petición interna antes de decidir que marcharte es el único camino.`,
  },
  {
    topicKey: 'imposter-syndrome',
    title: 'Síndrome del impostor: por qué la gente capaz se siente un fraude',
    question: '¿Qué es el síndrome del impostor, por qué es tan común y cómo lo manejo?',
    summary:
      'El síndrome del impostor es la sensación persistente de ser un fraude pese a la competencia real, común precisamente entre la gente capaz. Se alimenta de atribuir el éxito a la suerte y temer ser descubierto, y se alivia cuando reúnes evidencia, lo normalizas y actúas a pesar de la duda.',
    tags: ['trabajo', 'síndrome del impostor', 'confianza', 'bienestar'],
    language: 'es',
    image: { prompt: promptOf('imposter-syndrome'), alt: 'Una figura capaz con una sombra encogida y distorsionada junto a un espejo que muestra su forma real' },
    sources: [
      { title: 'Clance e Imes, "El fenómeno del impostor en mujeres de alto rendimiento" (1978)', url: 'https://psycnet.apa.org/record/1979-26502-001' },
      { title: 'Asociación Americana de Psicología — Panorama del fenómeno del impostor', url: 'https://www.apa.org/monitor/2021/06/cover-impostor-phenomenon' },
    ],
    content: `# Síndrome del impostor: por qué la gente capaz se siente un fraude

El síndrome del impostor es la sensación persistente e insistente de que eres un fraude que ha engañado a todos —que en realidad no mereces tu puesto y que, en cualquier momento, te van a "descubrir"— *a pesar* de la clara evidencia de tu competencia. Lo más cruel es la paradoja: golpea sobre todo a personas capaces y logradas, porque sentirse un impostor requiere haber logrado lo suficiente como para sentir que quizá no lo mereces. Descrito por primera vez en 1978 (originalmente estudiando a mujeres de alto rendimiento, aunque hoy se sabe que afecta a personas de todo tipo), es extraordinariamente común: la mayoría lo siente en algún momento, sobre todo al estirarse hacia algo nuevo.

## Por qué persiste: las trampas del pensamiento

Los sentimientos de impostor funcionan sobre unos pocos hábitos mentales autodestructivos:

- **Descontar el éxito.** Cuando las cosas van bien, lo atribuyes a la suerte, al momento o a "es que les caigo bien", a cualquier cosa menos a tu propia capacidad. Las victorias nunca actualizan tu autoimagen.
- **Apropiarte del fracaso.** Cuando las cosas van mal, *eso* sí te lo atribuyes de lleno. Así la evidencia solo fluye en una dirección: hacia "no soy lo bastante bueno".
- **Comparar tu interior con el exterior de los demás.** Mides tus dudas privadas contra la superficie pulida de todos los demás, sin ver nunca que ellos a menudo también fingen confianza.
- **Mover la portería.** Cada logro se redefine como "en realidad no fue tan difícil" en el instante en que lo alcanzas, así que nunca sientes que has triunfado de verdad.

Juntos crean un bucle cerrado en el que ninguna cantidad de logros se siente nunca suficiente, y por eso quienes más logran pueden sentirlo con más intensidad.

## Lo que de verdad ayuda

Rara vez *piensas* tu salida de los sentimientos de impostor, pero puedes aflojar su agarre:

| Enfoque | Por qué funciona |
| --- | --- |
| Lleva un archivo de evidencia (victorias, elogios, resultados) | Contrarresta el hábito del cerebro de descontar el éxito |
| Ponle nombre y habla de ello | Descubrir que tus pares sienten lo mismo rompe el aislamiento |
| Separa los sentimientos de los hechos | "Me siento un fraude" no es "soy un fraude" |
| Reformula la duda como crecimiento | Sentirte estirado suele significar que aprendes, no que fracasas |
| Actúa a pesar del sentimiento | La confianza suele seguir a la acción; esperar a sentirse listo rara vez funciona |

El replanteamiento más liberador: **el sentimiento no es evidencia**. Sentirte un fraude no dice nada sobre si de verdad lo eres, y el hecho de que te preocupe ser lo bastante bueno es en sí mismo una señal de responsabilidad, no de fraude. (Los fraudes genuinos, cabe destacar, rara vez se preocupan por ello.)

## Preguntas frecuentes

**¿El síndrome del impostor desaparece del todo alguna vez?**
Para la mayoría reaparece, sobre todo con cada nuevo reto o nivel, lo cual es normal e incluso una señal de que creces. La meta no es eliminarlo, sino dejar de permitir que mande: siente la duda y avanza igualmente.

**¿Es saludable algo de duda sobre uno mismo?**
Sí. Una pizca de humildad te mantiene aprendiendo, abierto a la crítica y libre de arrogancia. El problema solo aparece cuando la duda se vuelve crónica y paralizante, frenándote de oportunidades, de hablar o de pedir lo que te has ganado.

**¿Cómo apoyo a alguien con síndrome del impostor?**
Sé específico en tu reconocimiento: "tu análisis detectó un problema real" cala mejor que "eres genial". Normalízalo compartiendo tus propias dudas y reta con suavidad su costumbre de descontar sus victorias. Saber que un colega respetado también lo siente suele ser lo más tranquilizador de todo.`,
  },
];
