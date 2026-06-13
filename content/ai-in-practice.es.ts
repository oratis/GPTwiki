import type { DraftArticle } from './types';
import { aiInPracticeEn } from './ai-in-practice.en';

// Batch: AI in Practice (versión nativa en español / piloto de la fase 2 de
// expansión lingüística). Comparte los mismos topicKey que en/zh y reutiliza
// las imágenes de cabecera ya cacheadas en GCS por topicKey (coste de
// generación de imágenes cero). El cuerpo no es traducción automática, sino
// redacción nativa pensada para el lector hispanohablante.

const promptOf = (key: string): string => {
  const hit = aiInPracticeEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const aiInPracticeEs: DraftArticle[] = [
  {
    topicKey: 'rag-vs-fine-tuning',
    title: 'RAG o fine-tuning: ¿cuál deberías elegir?',
    question: '¿Debo usar RAG o fine-tuning para adaptar un LLM a mis datos?',
    summary:
      'RAG inyecta conocimiento fresco y verificable en el momento de la consulta, mientras que el fine-tuning cambia cómo se comporta el modelo. La mayoría de equipos deberían empezar con RAG y añadir fine-tuning solo por objetivos de estilo, formato o latencia.',
    tags: ['ai', 'llm', 'rag', 'fine-tuning', 'aprendizaje automático'],
    language: 'es',
    image: { prompt: promptOf('rag-vs-fine-tuning'), alt: 'Una tubería de recuperación y una retícula ajustada alimentando un único núcleo neuronal' },
    sources: [
      { title: 'Lewis et al., «Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks» (2020)', url: 'https://arxiv.org/abs/2005.11401' },
      { title: 'Hu et al., «LoRA: Low-Rank Adaptation of Large Language Models» (2021)', url: 'https://arxiv.org/abs/2106.09685' },
      { title: 'Gao et al., «Retrieval-Augmented Generation for Large Language Models: A Survey» (2023)', url: 'https://arxiv.org/abs/2312.10997' },
    ],
    content: `# RAG o fine-tuning: ¿cuál deberías elegir?

Respuesta corta: si tu problema es **lo que el modelo sabe**, usa generación aumentada por recuperación (RAG); si tu problema es **cómo se comporta el modelo**, usa fine-tuning. Las dos no son rivales —los sistemas maduros suelen usar ambas—, pero como primera inversión, RAG es más barato de construir, más fácil de actualizar y más fácil de auditar.

## Qué hace realmente cada técnica

**RAG** mantiene el modelo congelado y cambia su *entrada*. En el momento de la consulta, un recuperador busca en tus documentos (normalmente mediante embeddings en un índice vectorial) y los pasajes más relevantes se pegan en el prompt para que el modelo responda a partir de ellos. El conocimiento vive en una base de datos que puedes editar en cualquier momento.

**El fine-tuning** cambia los *pesos* del modelo. Entrenas con pares de ejemplo entrada–salida para que el modelo interiorice un tono, un formato, una política o el fraseo de un dominio. Con métodos eficientes en parámetros como LoRA, esto ya no requiere hardware enorme, pero el resultado queda fijado hasta que vuelvas a entrenar.

## Tabla de decisión

| Tu situación | Mejor opción | Por qué |
| --- | --- | --- |
| Los hechos cambian cada semana (precios, políticas, documentos) | RAG | Actualizas el índice, no el modelo |
| Las respuestas deben citar fuentes | RAG | Los pasajes recuperados sirven también de citas |
| Corpus privado demasiado grande para memorizarlo | RAG | La recuperación escala con el almacenamiento, no con los parámetros |
| La salida debe seguir un estilo o esquema estricto de la casa | Fine-tuning | El estilo es comportamiento, no conocimiento |
| Necesitas un modelo especialista pequeño, rápido y barato | Fine-tuning | Destila la tarea en menos parámetros |
| Los prompts han crecido enormemente con instrucciones y ejemplos | Fine-tuning | Mueve las instrucciones recurrentes a los pesos |
| El modelo malinterpreta la jerga del dominio | Ambas | La recuperación aporta contexto; el ajuste corrige la interpretación |

## Cuándo RAG es la primera jugada correcta

- **Frescura**: tu conocimiento cambia más rápido de lo que nunca volverías a entrenar.
- **Trazabilidad**: las respuestas reguladas y de cara al cliente necesitan un anclaje del tipo «según el documento X», que además reduce de forma medible las alucinaciones.
- **Velocidad de iteración**: un prototipo funcional son unos pocos días de ingeniería; sin GPUs, sin etiquetar datos de entrenamiento.
- **Aislamiento por cliente**: los datos de cada cliente permanecen en su propio índice en lugar de filtrarse a unos pesos compartidos.

El coste es una pieza móvil adicional: el troceado, los embeddings, la calidad del índice y la evaluación de la recuperación pasan a formar parte de tu producto. Una mala recuperación, no el modelo, es el punto de fallo más común de los sistemas RAG.

## Cuándo el fine-tuning se gana su sitio

- **Cumplimiento de formato**: JSON siempre válido, un esqueleto de informe fijo, el tono de tu equipo de soporte.
- **Latencia y coste por tokens**: un modelo ajustado puede eliminar los ejemplos few-shot y las instrucciones largas de cada llamada.
- **Transferencia de capacidad a modelos pequeños**: ajustar un modelo compacto de pesos abiertos en una tarea acotada puede igualar a un modelo general mucho mayor por una fracción del coste de servicio.
- **Habilidades implícitas**: las tareas de clasificación, extracción y enrutamiento con miles de ejemplos etiquetados a menudo superan al prompting.

El coste es operativo: curar los datos de entrenamiento, volver a ejecutar las evaluaciones en cada actualización del modelo base y aceptar que corregir un comportamiento malo significa otro ciclo de entrenamiento.

## Usar ambas

Un patrón habitual en producción: ajustar un modelo para que *siga tu formato y tu política de rechazo de forma fiable*, y usar RAG para *alimentarlo con hechos actuales*. El ajuste hace predecible el comportamiento; la recuperación mantiene el contenido veraz y vigente.

## Preguntas frecuentes

**¿El fine-tuning le enseña al modelo hechos nuevos?**
Mal. Las actualizaciones de pesos pueden memorizar algunos hechos, pero la recuperación de la memoria es poco fiable y actualizarlos exige reentrenar. La recuperación es la forma fiable de añadir conocimiento.

**¿RAG siempre es más barato?**
De construir, casi siempre. Con volúmenes de consulta muy altos, los contextos recuperados largos inflan el coste por llamada en tokens, y un modelo ajustado de prompt corto puede salir más barato. Mídelo a tu nivel de tráfico.

**¿Puedo saltarme ambas y usar solo una ventana de contexto larga?**
Para corpus pequeños y estables, sí: meter los documentos en el prompt (posiblemente con caché de prompts) es la opción más simple. Pasadas unas cientos de páginas o con actualizaciones frecuentes, la recuperación gana en coste y calidad de respuesta.`,
  },
  {
    topicKey: 'prompt-engineering',
    title: 'Guía práctica de ingeniería de prompts',
    question: '¿Cómo escribo prompts eficaces para grandes modelos de lenguaje?',
    summary:
      'La mayor parte de la calidad de un prompt viene de cinco palancas: instrucciones claras, contexto, ejemplos, formato de salida explícito y espacio para razonar. Esta guía cubre las técnicas que sobreviven al contacto con el trabajo real.',
    tags: ['ai', 'llm', 'ingeniería de prompts', 'productividad'],
    language: 'es',
    image: { prompt: promptOf('prompt-engineering'), alt: 'Un panel de control de cristal moldeando un haz de luz en una salida estructurada' },
    sources: [
      { title: 'Wei et al., «Chain-of-Thought Prompting Elicits Reasoning in Large Language Models» (2022)', url: 'https://arxiv.org/abs/2201.11903' },
      { title: 'Wang et al., «Self-Consistency Improves Chain of Thought Reasoning» (2022)', url: 'https://arxiv.org/abs/2203.11171' },
      { title: 'Prompt Engineering Guide (DAIR.AI)', url: 'https://www.promptingguide.ai' },
    ],
    content: `# Guía práctica de ingeniería de prompts

Un prompt es una especificación, no un conjuro mágico. A los modelos las peticiones vagas se les dan mal por la misma razón que a los contratistas: nunca se enunciaron los requisitos. Cinco palancas explican la mayor parte de la calidad que puedes conseguir: instrucciones, contexto, ejemplos, formato de salida y espacio para razonar.

## Las cinco palancas

**1. Enuncia la tarea como una orden de trabajo.** Incluye el objetivo, el público, las restricciones y qué aspecto tiene «terminado». «Resume las cláusulas de rescisión de este contrato para alguien sin formación jurídica, en menos de 150 palabras, y señala cualquier cosa inusual» supera a «resume esto».

**2. Aporta el contexto que el modelo no puede adivinar.** Pega el documento relevante, el esquema, el registro de errores, la guía de estilo. Sepáralo de las instrucciones con delimitadores claros (etiquetas tipo XML o bloques cercados) para que los datos nunca se confundan con las indicaciones.

**3. Muestra, no solo digas (few-shot).** Dos o tres ejemplos de entrada → salida definen una tarea con más precisión que párrafos de descripción, y fijan los casos límite: incluye un ejemplo difícil, no solo los fáciles.

**4. Fija el formato de salida.** Pide una estructura concreta: un objeto JSON con campos nombrados, una tabla en markdown, «exactamente tres viñetas». La salida estructurada es más fácil de validar, parsear y comparar. Si tu plataforma admite salida con esquema forzado, úsala.

**5. Da espacio para razonar.** Para análisis, matemáticas o decisiones de varios pasos, pídele al modelo que trabaje el problema antes de responder (cadena de pensamiento). La investigación y la práctica coinciden en que esto mejora de forma apreciable la precisión en tareas de razonamiento; para respuestas de alto riesgo, muestrea varias rutas de razonamiento y toma la mayoría (autoconsistencia).

## Técnica → cuándo recurrir a ella

| Técnica | Úsala cuando |
| --- | --- |
| Rol/persona («Eres un SRE sénior») | El vocabulario y el criterio deban encajar con una profesión |
| Delimitadores alrededor de las entradas | Cualquier dato pegado, siempre |
| Ejemplos few-shot | El formato o el criterio sea difícil de describir en abstracto |
| Cadena de pensamiento | Matemáticas, lógica, decisiones con múltiples restricciones |
| Descomposición (varias llamadas) | Tareas con fases distintas: extraer, luego juzgar, luego redactar |
| Autoconsistencia (votar entre muestras) | Respuestas únicas de alto riesgo que justifican el coste extra |
| «Di 'desconocido' si no estás seguro» | Consultas factuales donde una respuesta errónea es peor que ninguna |

## Patrones de fallo habituales

- **El prompt cajón de sastre**: veinte reglas, la mitad contradictorias. Los modelos siguen la última y la más ruidosa; recorta sin piedad.
- **Preguntas ocultas**: pedir dos cosas en una frase y obtener respuesta a una.
- **Contexto implícito**: referirte a «el archivo» o «nuestro formato de siempre» que el modelo nunca ha visto.
- **Ejemplos sobreajustados**: tres muestras few-shot casi idénticas enseñan el patrón superficial, no la regla.
- **Sin bucle de iteración**: los prompts son código. Mantén un pequeño conjunto de pruebas con entradas reales, ejecútalo después de cada edición y versiona tus prompts.

## Trata los prompts como artefactos de ingeniería

Una vez que un prompt importa en producción: ponlo bajo control de versiones, adjúntale un conjunto de pruebas de regresión con entradas representativas y propiedades esperadas, y vuelve a ejecutarlo en cada actualización del modelo. Los cambios de versión del modelo desplazan el comportamiento en silencio; tus pruebas lo detectan antes que tus usuarios.

## Preguntas frecuentes

**¿Las frases mágicas como «respira hondo» ayudan de verdad?**
A veces, marginalmente y de forma poco fiable entre modelos. La estructura, el contexto y los ejemplos eclipsan a los conjuros.

**Los prompts largos cuestan más, ¿merece la pena el gasto?**
Normalmente sí en tareas críticas para la calidad, pero corta el peso muerto: las reglas redundantes y los ejemplos obsoletos añaden coste sin precisión. La caché de prompts abarata los prefijos estáticos largos en la mayoría de plataformas.

**¿En qué se diferencia el prompting para modelos orientados al razonamiento?**
Los modelos que razonan internamente antes de responder necesitan menos guía sobre *cómo* pensar: mantén las instrucciones sobre el objetivo y las restricciones, y prescinde de la microgestión paso a paso salvo que la calidad de la salida diga lo contrario.`,
  },
  {
    topicKey: 'ai-agents',
    title: '¿Qué es un agente de IA y cuándo lo necesitas de verdad?',
    question: '¿Qué es un agente de IA y cuándo necesita realmente uno mi caso de uso?',
    summary:
      'Un agente de IA es un LLM ejecutándose en un bucle con herramientas y un objetivo, decidiendo por sí mismo el siguiente paso. Potente para tareas abiertas, excesivo para cualquier cosa que resuelva un flujo de trabajo fijo: este artículo explica la diferencia.',
    tags: ['ai', 'llm', 'agentes', 'automatización', 'arquitectura de software'],
    language: 'es',
    image: { prompt: promptOf('ai-agents'), alt: 'Un núcleo neuronal rodeado de herramientas eligiendo su camino entre plataformas ramificadas' },
    sources: [
      { title: 'Yao et al., «ReAct: Synergizing Reasoning and Acting in Language Models» (2022)', url: 'https://arxiv.org/abs/2210.03629' },
      { title: 'Anthropic Engineering, «Building Effective Agents»', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
      { title: 'Schick et al., «Toolformer: Language Models Can Teach Themselves to Use Tools» (2023)', url: 'https://arxiv.org/abs/2302.04761' },
    ],
    content: `# ¿Qué es un agente de IA y cuándo lo necesitas de verdad?

Un agente de IA es un modelo de lenguaje ejecutándose en un bucle: tiene un objetivo, un conjunto de herramientas y la libertad de decidir su propia acción siguiente en función de lo que devolvió la anterior. Esa última cláusula es la que lo define. Un script que llama a un LLM tres veces en un orden fijo es un **flujo de trabajo**; un sistema en el que el propio modelo elige qué hacer a continuación es un **agente**.

## La anatomía de un agente

Todo agente práctico son cuatro piezas:

- **Un modelo** capaz de razonamiento de varios pasos y de invocar herramientas de forma fiable.
- **Herramientas**: funciones que el modelo puede invocar: búsqueda, ejecución de código, edición de archivos, llamadas a API, consultas a bases de datos.
- **Contexto/memoria**: la transcripción en curso de acciones y observaciones (y, a veces, notas externas que sobreviven a la sesión).
- **El bucle**: el modelo actúa → el entorno responde → el resultado se añade → el modelo vuelve a actuar, hasta que declara cumplido el objetivo o alcanza una condición de parada.

El patrón de intercalar razonamiento con uso de herramientas se popularizó en la investigación como ReAct, y hoy es la columna vertebral de los asistentes de programación, los agentes de investigación y los sistemas de uso del ordenador.

## Agente vs flujo de trabajo vs llamada única

| Enfoque | El flujo de control lo decide | Mejor para | Modo de fallo |
| --- | --- | --- | --- |
| Llamada única a un LLM | Tú | Clasificación, redacción, extracción | Alcance limitado |
| Flujo de trabajo (llamadas encadenadas) | Tú | Procesos de varios pasos conocidos y repetibles | Rígido cuando las entradas varían |
| Agente (bucle + herramientas) | El modelo | Tareas abiertas en las que el camino no se conoce de antemano | Coste y acumulación de errores |

## Cuándo un agente es de verdad la opción correcta

- **El camino es imposible de conocer por adelantado.** Depurar una compilación que falla, investigar una pregunta vaga, manejar un navegador: cada paso siguiente depende de lo que reveló el anterior.
- **El entorno da retroalimentación.** Los compiladores, las baterías de pruebas y los resultados de búsqueda permiten al agente comprobar su propio trabajo y autocorregirse. Los agentes prosperan justo donde la verificación es barata.
- **La tarea tolera coste y latencia variables.** Un agente puede dar cinco pasos o cincuenta.

## Cuándo es excesivo

Si una persona puede escribir los pasos, escríbelos: un flujo de trabajo fijo es más barato, más rápido, depurable y predecible. El rellenado de formularios, las tuberías de documentos, los informes programados y el ETL estándar casi nunca necesitan un agente. La regla de ingeniería honesta de quienes lo practican es: **usa el patrón más simple que funcione y añade autonomía solo cuando la tarea lo exija.**

## Qué sale mal

- **Acumulación de errores**: un paso fiable al 95 % tiene aproximadamente un 60 % de probabilidad de sobrevivir intacto a diez pasos. Los bucles largos necesitan puntos de control, pasos de verificación o controles de revisión humana.
- **Coste descontrolado**: cada iteración del bucle vuelve a leer una transcripción que crece. Pon presupuestos y topes de pasos.
- **Objetivos ambiguos**: a un agente al que se le dice «mejora el código» hará *algo*; si era lo que querías es otra cuestión. Define qué es estar terminado.
- **Superficie de seguridad**: las herramientas que pueden escribir archivos, gastar dinero o enviar mensajes necesitan límites de permisos y registros de auditoría.

## Preguntas frecuentes

**¿Los «sistemas multiagente» son mejores que un único buen agente?**
A veces: la investigación en paralelo con un sintetizador es un patrón probado. Pero la coordinación añade sus propios modos de fallo; lo multiagente es una optimización, no un punto de partida.

**¿Los agentes necesitan modelos especiales?**
Necesitan una fuerte fiabilidad al invocar herramientas y coherencia a largo plazo. Los modelos generales de frontera son hoy la opción más segura; los modelos pequeños sirven para bucles acotados y bien instrumentados.

**¿Cómo evalúo un agente?**
Por resultados, no por pasos: define un conjunto de tareas representativas con estados finales comprobables, ejecútalas repetidamente (los agentes son no deterministas) y haz seguimiento de la tasa de éxito, el coste y los pasos hasta completarlas.`,
  },
  {
    topicKey: 'local-llm-hardware',
    title: '¿Qué hardware necesitas para ejecutar un LLM en local?',
    question: '¿Qué hardware necesito para ejecutar un gran modelo de lenguaje en mi propia máquina?',
    summary:
      'Lo que puedes ejecutar lo decide la memoria, no la potencia de cálculo: un modelo de 8B cuantizado cabe en 8 GB, uno de 32B necesita unos 24 GB y los modelos de la clase 70B quieren 48 GB o más. Aquí están las cifras reales y el software a usar.',
    tags: ['ai', 'llm', 'llm local', 'hardware', 'gpu'],
    language: 'es',
    image: { prompt: promptOf('local-llm-hardware'), alt: 'Un cubo de retícula neuronal brillante sobre una tarjeta gráfica dentro de una torre de PC abierta' },
    sources: [
      { title: 'llama.cpp — inferencia de LLM en C/C++ (GGUF, cuantización)', url: 'https://github.com/ggml-org/llama.cpp' },
      { title: 'Ollama — ejecuta LLM abiertos en local', url: 'https://ollama.com' },
      { title: 'vLLM — servicio de LLM de alto rendimiento', url: 'https://github.com/vllm-project/vllm' },
    ],
    content: `# ¿Qué hardware necesitas para ejecutar un LLM en local?

La restricción que manda es la **memoria, no la velocidad**. Los pesos de un modelo deben caber en la VRAM de tu GPU (o en la memoria unificada de Apple) para un rendimiento aprovechable, y la cuenta es simple: con cuantización de 4 bits, un modelo necesita aproximadamente **0,5–0,7 GB por cada mil millones de parámetros**, más 1–4 GB de margen para la caché de contexto.

## La tabla rápida de dimensionado

| Clase de modelo | Pesos a 4 bits | Configuración cómoda | Ejemplos de lo que corre |
| --- | --- | --- | --- |
| 3–4B | ~2–3 GB | Cualquier portátil moderno, 8 GB de RAM | Asistentes pequeños, autocompletado |
| 7–9B | ~4–6 GB | GPU de 8 GB o Mac de 16 GB | Modelos pequeños Llama/Qwen/Mistral |
| 13–14B | ~8–10 GB | GPU de 12–16 GB o Mac de 24 GB | Modelos medianos de chat y programación |
| 30–34B | ~18–22 GB | GPU de 24 GB (p. ej. RTX 3090/4090) o Mac de 36–48 GB | Generalistas locales potentes |
| 70–72B | ~40–48 GB | 2 GPUs de 24 GB o Mac Studio de 64 GB+ | Modelos abiertos casi de frontera |
| Mixture-of-experts grandes | varía mucho | Clase estación de trabajo/servidor | Consulta la documentación de cada modelo |

Dos apuntes para leerla: la cuantización (GGUF de 4 bits y similares) cambia una pérdida de calidad pequeña, normalmente aceptable, por un recorte de memoria de 4× frente a 16 bits; y los contextos largos hacen crecer la caché KV: conversar a 32k de contexto puede añadir varios GB por encima de los pesos.

## ¿GPU, Mac o CPU?

- **GPU NVIDIA**: el mejor rendimiento y soporte de ecosistema. El tamaño de la VRAM importa más que la generación de la GPU: una RTX 3090 de 24 GB de segunda mano sigue siendo una opción económica muy querida para los modelos de la clase 30B.
- **Apple Silicon**: la memoria unificada hace que los Mac sean discretamente excelentes: una máquina de la serie M con 64 GB ejecuta modelos cuantizados de la clase 70B, más lento que un equipo con doble GPU pero silencioso y sencillo. Compra RAM, no núcleos.
- **Solo CPU**: funciona mediante llama.cpp, pero espera unos pocos tokens por segundo en modelos pequeños: bien para trabajos por lotes, doloroso para chatear.

## La pila de software

- **Ollama**: el arranque más fácil: un comando para descargar y ejecutar un modelo, con una API local compatible con OpenAI.
- **llama.cpp**: el motor que hay debajo de buena parte del ecosistema; máximo control sobre la cuantización y la descarga a CPU.
- **LM Studio**: interfaz gráfica para explorar, descargar y chatear.
- **vLLM**: cuando sirves a muchos usuarios concurrentes desde un servidor GPU real en lugar de un solo escritorio.

## Qué esperar con honestidad

Un modelo cuantizado de 8–14B bien elegido se ocupa de resúmenes, redacción, extracción y de una ayuda decente para programar. Los modelos abiertos de la clase 30B–70B son genuinamente potentes pero siguen por detrás de los modelos alojados de frontera en razonamiento difícil. Las razones para irse a local son **la privacidad, el uso sin conexión, tokens ilimitados a coste fijo y la libertad de trastear**, no ganarle a la nube en calidad bruta.

## Preguntas frecuentes

**¿Ejecutar en local ahorra dinero?**
Solo con un uso intenso y sostenido. El hardware se amortiza si de otro modo quemarías tokens de API a diario; para un uso ocasional, las API salen más baratas.

**¿Puedo ejecutar modelos mayores que mi VRAM?**
Sí: las capas pueden desbordarse a la RAM del sistema a un alto coste de velocidad. Un modelo un 20 % por encima de la VRAM suele ir bien; el doble por encima es una agonía.

**¿Y el fine-tuning en local?**
Los métodos eficientes en parámetros (LoRA/QLoRA) hacen viable ajustar modelos pequeños en una GPU de 24 GB. El fine-tuning completo de modelos grandes sigue siendo territorio de centro de datos.`,
  },
  {
    topicKey: 'mcp-explained',
    title: '¿Qué es MCP (Model Context Protocol)?',
    question: '¿Qué es el Model Context Protocol y qué problema resuelve?',
    summary:
      'MCP es un estándar abierto que permite a cualquier aplicación de IA conectarse a cualquier herramienta o fuente de datos a través de un único protocolo, reemplazando las integraciones a medida por aplicación y por herramienta. Piensa en un USB-C para el contexto de la IA.',
    tags: ['ai', 'mcp', 'llm', 'integraciones', 'estándares abiertos'],
    language: 'es',
    image: { prompt: promptOf('mcp-explained'), alt: 'Cables de datos de distintos colores convergiendo en un único puerto cristalino universal' },
    sources: [
      { title: 'Model Context Protocol — sitio oficial y especificación', url: 'https://modelcontextprotocol.io' },
      { title: 'Anthropic, «Introducing the Model Context Protocol»', url: 'https://www.anthropic.com/news/model-context-protocol' },
    ],
    content: `# ¿Qué es MCP (Model Context Protocol)?

El Model Context Protocol (MCP) es un estándar abierto para conectar aplicaciones de IA a herramientas y datos externos. Antes de él, cada aplicación de IA tenía que construir una integración a medida para cada herramienta: N aplicaciones × M herramientas significaban N×M adaptadores. MCP reduce eso a N + M: una aplicación implementa el protocolo una vez como *cliente*, una herramienta lo expone una vez como *servidor*, y cualquier cliente puede hablar con cualquier servidor. La analogía habitual ha cuajado porque es exacta: **el USB-C de la IA**.

## Por qué existe

Los LLM solo son tan útiles como el contexto que pueden alcanzar. Tu asistente se vuelve mucho más capaz cuando puede leer tus archivos, consultar tu base de datos, buscar en tus tickets o enviar un mensaje, pero cablear todo eso de forma improvisada producía integraciones frágiles, no portables y atadas a un único proveedor. MCP, presentado por Anthropic a finales de 2024 y adoptado ampliamente en el sector desde entonces, estandariza ese cableado. A fecha de 2026, el ecosistema cuenta con miles de servidores de la comunidad y de proveedores para todo, desde GitHub y Slack hasta bases de datos y navegadores.

## Cómo funciona

MCP tiene tres roles:

- **Anfitrión (host)**: la aplicación de IA con la que se enfrenta el usuario (una app de chat, un IDE, un entorno de ejecución de agentes).
- **Cliente**: la conexión de protocolo que abre el anfitrión, una por servidor.
- **Servidor**: un programa (normalmente pequeño) que expone capacidades a través del protocolo, ya sea en local vía stdio o en remoto sobre HTTP.

Un servidor puede ofrecer tres tipos de capacidades:

| Primitiva | Qué es | Ejemplo |
| --- | --- | --- |
| **Herramientas** | Funciones que el modelo puede invocar | \`create_issue\`, \`query_database\` |
| **Recursos** | Datos que el anfitrión puede leer al contexto | Un archivo, un esquema, un panel |
| **Prompts** | Plantillas parametrizadas reutilizables | «Revisa este PR con nuestra checklist» |

El modelo del anfitrión ve las definiciones de las herramientas, decide cuándo invocarlas, y el servidor las ejecuta y devuelve los resultados: el protocolo gestiona el descubrimiento, la invocación y el transporte de forma uniforme.

## MCP frente al simple function calling

El function calling es cómo un *modelo* invoca una función que su desarrollador registró en esa única aplicación. MCP estandariza la capa que lo rodea: de dónde vienen las herramientas, cómo se descubren, autentican y transportan, de modo que el mismo servidor funcione en cualquier app compatible con MCP sin cambios de código. Se componen: por debajo, una invocación de herramienta MCP sigue llegando al modelo como function calling.

## Primeros pasos

La rampa de acceso práctica es usar servidores existentes, no escribir uno: la mayoría de los clientes de IA importantes permiten añadir un servidor MCP con unas pocas líneas de configuración, y los SDK oficiales (TypeScript, Python y otros) hacen que escribir tu propio servidor sea un proyecto de una tarde: define unas cuantas funciones tipadas y cualquier cliente MCP podrá usarlas.

## Preguntas frecuentes

**¿MCP está atado a un único proveedor de modelos?**
No. Empezó en Anthropic, pero es una especificación abierta con adopción de varios proveedores y un proceso de gobernanza abierto; hay clientes y servidores en todos los ecosistemas importantes.

**¿Es seguro conectar servidores arbitrarios?**
Trata los servidores MCP como extensiones de navegador: se ejecutan con permisos reales. Usa fuentes de confianza, revisa qué herramientas expone un servidor y prefiere anfitriones que exijan aprobación explícita del usuario en cada acción sensible.

**¿Cuándo debería escribir mi propio servidor?**
Cuando tu equipo tiene una API o un conjunto de datos internos al que varias herramientas de IA deberían llegar: un solo servidor lo pone a disposición de todos los clientes compatibles con MCP que usa tu empresa.`,
  },
  {
    topicKey: 'vector-databases',
    title: '¿Qué es una base de datos vectorial y cuándo la necesitas?',
    question: '¿Qué es una base de datos vectorial y cuándo la necesito realmente?',
    summary:
      'Las bases de datos vectoriales almacenan embeddings y encuentran el «significado más cercano» en lugar de coincidencias exactas, impulsando la búsqueda semántica y RAG. Por debajo de ~1 millón de vectores, herramientas más simples como pgvector suelen bastar.',
    tags: ['ai', 'base de datos vectorial', 'embeddings', 'búsqueda', 'rag'],
    language: 'es',
    image: { prompt: promptOf('vector-databases'), alt: 'Un punto de consulta ondulando entre constelaciones agrupadas de vectores de embedding' },
    sources: [
      { title: 'Malkov y Yashunin, «Efficient and Robust ANN Search Using HNSW Graphs» (2016)', url: 'https://arxiv.org/abs/1603.09320' },
      { title: 'FAISS — biblioteca para búsqueda de similitud eficiente', url: 'https://github.com/facebookresearch/faiss' },
      { title: 'pgvector — similitud vectorial para Postgres', url: 'https://github.com/pgvector/pgvector' },
    ],
    content: `# ¿Qué es una base de datos vectorial y cuándo la necesitas?

Una base de datos vectorial almacena **embeddings** —listas de números que representan el significado de texto, imágenes o audio— y responde a una consulta extremadamente bien: *«encuentra los elementos más parecidos a este»*. Esa es la operación detrás de la búsqueda semántica, la recuperación en RAG, las recomendaciones y la detección de duplicados. Que necesites una dedicada depende casi por completo de la escala.

## Los embeddings en un minuto

Un modelo de embeddings mapea el contenido a un punto en un espacio de muchas dimensiones (habitualmente 256–3072 dimensiones) de forma que los significados parecidos caen cerca unos de otros. «Cómo reinicio mi contraseña» y «No puedo entrar en mi cuenta» comparten poco vocabulario, pero quedan cerca como vectores. La similitud se mide geométricamente —normalmente con la similitud del coseno—, así que buscar se convierte en: embeber la consulta y encontrar los puntos almacenados más cercanos.

## Qué la convierte en un problema de *base de datos*

Comparar una consulta contra cada vector almacenado (fuerza bruta) es exacto pero lineal: bien para miles de elementos, lento para millones. Las bases de datos vectoriales usan índices de **vecino más cercano aproximado (ANN)**, los más famosos los grafos HNSW, que encuentran ~99 % de los vecinos verdaderos en una fracción ínfima del tiempo. Alrededor de ese núcleo añaden las comodidades habituales de una base de datos: filtrado por metadatos («solo los documentos de este cliente»), altas y bajas, persistencia y escalado horizontal.

## Cuándo necesitas una, con honestidad

| Tamaño del corpus | Elección razonable |
| --- | --- |
| Hasta ~100k vectores | Un array en memoria, FAISS o extensiones de SQLite: la fuerza bruta vale |
| ~100k–unos pocos millones | **pgvector en el Postgres que ya tienes**: el valor por defecto pragmático |
| Muchos millones, alto QPS, multicliente | Motor dedicado: Qdrant, Milvus, Weaviate o servicios gestionados como Pinecone |

El error de arquitectura más común es añadir una pieza nueva de infraestructura para 50 000 fragmentos. Si ya tienes Postgres, pgvector mantiene los vectores junto a tus datos relacionales, transaccionales y combinables. Recurre a un motor dedicado cuando tengas escala real, objetivos de latencia estrictos o mucha búsqueda con filtros.

## Palancas de calidad que importan más que la base de datos

- **Troceado**: cómo divides los documentos afecta a la recuperación más que el motor que elijas. Los fragmentos deberían ser ideas autocontenidas, a menudo de 200–800 tokens con solapamiento.
- **Elección del modelo de embeddings**: los modelos multilingües más nuevos superan claramente a los antiguos; volver a embeber un corpus es molesto, así que elige con criterio.
- **Búsqueda híbrida**: combinar la similitud vectorial con la puntuación clásica por palabras clave (BM25) captura nombres, códigos y términos raros que los embeddings difuminan.
- **Reordenación (reranking)**: recuperar 50 candidatos de forma barata y repuntuar los mejores con un cross-encoder suele elevar la calidad de la respuesta más que ajustar el índice.

## Preguntas frecuentes

**¿Los embeddings filtran mis datos al proveedor de embeddings?**
El texto va a quien calcula el embedding. Con las API alojadas, ese es el proveedor (revisa las condiciones de retención); los modelos de embeddings de pesos abiertos se ejecutan totalmente en local.

**¿Se pueden actualizar los vectores cuando cambian los documentos?**
Sí, pero es trabajo de tu tubería volver a trocear y embeber los documentos modificados. Que vectores obsoletos sirvan en silencio contenido viejo es el clásico bug de producción.

**¿Es mejor una dimensión de embedding más grande?**
No automáticamente. Las dimensiones más altas cuestan almacenamiento y latencia; muchos modelos modernos ofrecen dimensiones truncables donde 512–1024 conservan casi toda la calidad. Haz benchmark sobre tu propio conjunto de recuperación.`,
  },
  {
    topicKey: 'ai-coding-assistants',
    title: 'Cómo sacar valor real de los asistentes de programación con IA',
    question: '¿Cómo uso los asistentes de programación con IA de forma eficaz sin perjudicar la calidad del código?',
    summary:
      'Las herramientas de programación con IA dan sus mayores ganancias en código repetitivo, pruebas y terreno desconocido, si les das contexto y revisas su salida. Prácticas que funcionan, riesgos que gestionar y dónde se va realmente el tiempo.',
    tags: ['ai', 'programación', 'asistentes de programación', 'herramientas para desarrolladores', 'productividad'],
    language: 'es',
    image: { prompt: promptOf('ai-coding-assistants'), alt: 'Una mano humana y una mano de IA construyendo juntas un puente de bloques de código' },
    sources: [
      { title: 'Peng et al., «The Impact of AI on Developer Productivity: Evidence from GitHub Copilot» (2023)', url: 'https://arxiv.org/abs/2302.06590' },
      { title: 'SWE-bench — evaluación de LLM con issues reales de GitHub', url: 'https://www.swebench.com' },
    ],
    content: `# Cómo sacar valor real de los asistentes de programación con IA

Los asistentes de programación con IA son genuinamente productivos: estudios controlados han mostrado grandes aceleraciones en tareas autocontenidas, y para 2026 las herramientas agénticas que ejecutan pruebas y editan varios archivos han ido mucho más allá del autocompletado. Pero las ganancias son desiguales, y están condicionadas a dos hábitos: **darle a la herramienta contexto real** y **revisar lo que escribe**. Los equipos que se saltan cualquiera de los dos tienden a enviar bugs sutiles más rápido.

## Dónde se concentran las ganancias

- **Código repetitivo y de pegamento**: endpoints CRUD, configuración, serialización, envoltorios de clientes de API.
- **Pruebas**: generar baterías de pruebas unitarias exhaustivas a partir de código existente es uno de los usos de mayor valor por minuto.
- **Terreno desconocido**: un nuevo lenguaje, framework o API: el asistente comprime en minutos horas de lectura de documentación.
- **Refactorizaciones mecánicas**: renombrados, cambios de firma, aplicar un patrón conocido a varios archivos.
- **Explicar código**: incorporarte a un módulo heredado haciéndole preguntas.

Donde las ganancias menguan: la lógica de dominio profunda, los núcleos críticos para el rendimiento, las grandes decisiones de arquitectura y el código donde equivocarse sale caro. Ahí, el asistente es un compañero de entrenamiento, no un autor.

## Prácticas que separan los buenos resultados de los malos

**Acota la petición.** «Añade paginación a este endpoint, igual que hace \`listUsers\`» supera a «mejora esta API». Los incrementos pequeños y verificables se acumulan; las generaciones de mil líneas son pesadillas de revisión.

**Aporta contexto a propósito.** Apunta la herramienta a los archivos relevantes, al mensaje de error, al esquema, a las convenciones del equipo. Los asistentes agénticos modernos pueden encontrar contexto por sí mismos, pero nombrar los archivos de partida correctos sigue reduciendo a la mitad su deambular.

**Déjalo ejecutar las pruebas.** La mayor mejora de fiabilidad es un bucle de retroalimentación: un asistente que puede ejecutar la batería de pruebas atrapa sus propios errores en lugar de enviártelos.

**Revisa como si fuera el PR de un júnior con confianza.** El código se lee como plausible; precisamente por eso ojearlo es peligroso. Comprueba los casos límite, el manejo de errores y las superficies sensibles a la seguridad (validación de entradas, autenticación, consultas) con toda la atención.

**Mantén las pruebas y los tipos como barreras.** Un tipado fuerte y una buena cobertura convierten «la IA rompió algo» de un incidente en producción en una CI en rojo.

## Tipo de tarea → expectativa realista

| Tarea | Expectativa |
| --- | --- |
| Pruebas unitarias para código existente | Gran aceleración, alta fiabilidad |
| Código repetitivo/andamiaje | Gran aceleración |
| Corrección de bug con prueba reproducible | Buena: las herramientas agénticas suelen clavarlas |
| Funcionalidad en un framework desconocido | Gran compresión de la curva de aprendizaje |
| Trabajo sutil de concurrencia/rendimiento | Ayuda modesta; verifica con rigor |
| Diseño de sistemas | Interlocutor útil, no un oráculo |

## Barreras a nivel de equipo

Adóptalos de forma explícita, no a hurtadillas: acordad dónde se anima a usar asistentes, exigid el mismo listón de revisión para el código generado, vigilad la salida literal sensible a licencias en bases de código reguladas y mantened la CI como autoridad. Y proteged el bucle de aprendizaje: los júniores que pegan sin leer se estancan; los júniores que interrogan al asistente aprenden más rápido que cualquier generación anterior.

## Preguntas frecuentes

**¿Los asistentes me harán peor ingeniero?**
Erosionan las habilidades que dejas de practicar y amplifican las que diriges. Los ingenieros que saben especificar, descomponer y verificar ganan más apalancamiento cada año; la pura velocidad de tecleo deja de importar.

**¿Por qué el asistente produce con tanta seguridad código que no compila?**
Predice código plausible y a veces alucina API. Trata la compilación y las pruebas como árbitro, y prefiere herramientas que compilen/ejecuten el código antes de mostrártelo.

**¿Agente o autocompletado?**
Ambos, para trabajos distintos: completado en línea para fluir mientras escribes; modo agéntico para tareas autocontenidas que puedas describir y verificar, como «haz que pasen estas pruebas».`,
  },
  {
    topicKey: 'llm-hallucinations',
    title: '¿Por qué alucinan los grandes modelos de lenguaje?',
    question: '¿Por qué los grandes modelos de lenguaje se inventan cosas y cómo se pueden reducir las alucinaciones?',
    summary:
      'Los LLM se entrenan para producir texto plausible, no verdad verificada: cuando se acaba el conocimiento, las conjeturas fluidas llenan el hueco. Por qué ocurre, cuándo empeora y las mitigaciones que de verdad funcionan.',
    tags: ['ai', 'llm', 'alucinación', 'fiabilidad', 'aprendizaje automático'],
    language: 'es',
    image: { prompt: promptOf('llm-hallucinations'), alt: 'Un haz de un núcleo neuronal que en una mitad forma estructura sólida y en la otra se disuelve en niebla' },
    sources: [
      { title: 'Huang et al., «A Survey on Hallucination in Large Language Models» (2023)', url: 'https://arxiv.org/abs/2311.05232' },
      { title: 'Lin et al., «TruthfulQA: Measuring How Models Mimic Human Falsehoods» (2021)', url: 'https://arxiv.org/abs/2109.07958' },
      { title: 'Liu et al., «Lost in the Middle: How Language Models Use Long Contexts» (2023)', url: 'https://arxiv.org/abs/2307.03172' },
    ],
    content: `# ¿Por qué alucinan los grandes modelos de lenguaje?

Un modelo de lenguaje está entrenado para hacer una sola cosa: predecir texto que continúe de forma plausible lo que vino antes. La verdad y la plausibilidad suelen coincidir —por eso los modelos son útiles—, pero cuando al modelo le falta el dato que le pediste, el objetivo de entrenamiento sigue exigiendo una salida fluida. El resultado es una respuesta segura, bien formada y equivocada. La alucinación no es un fallo atornillado a los LLM; es el comportamiento por defecto de los sistemas que maximizan plausibilidad en el borde de su conocimiento.

## La mecánica

- **Compresión con pérdida.** El entrenamiento comprime terabytes de texto en un conjunto fijo de pesos. El conocimiento común sobrevive con alta fidelidad; los hechos raros —detalles de un pueblo pequeño, artículos menores, especificaciones de productos de nicho— se difuminan o se pierden, y el modelo no puede distinguir con fiabilidad cuáles.
- **No hay paso de consulta.** Un modelo a secas no consulta una base de datos antes de responder; genera a partir de su memoria estadística. No hay una bandera interna que diga «esto es un hecho recuperado» frente a «esto es completado de patrones».
- **El entrenamiento premia responder.** Los modelos ajustados a las preferencias humanas aprenden que las respuestas útiles, seguras y completas reciben buena valoración; históricamente, los benchmarks y los evaluadores penalizaban el «no lo sé», enseñando a los modelos a adivinar.
- **Acumulación de errores.** La generación es secuencial; un token temprano equivocado (un nombre fabricado, un año erróneo) se elabora hasta formar un párrafo falso coherente.

## Dónde empeora, de forma predecible

Las citas y referencias (el formato es fácil de imitar, los contenidos no están memorizados), los números y fechas precisos, las entidades raras, los documentos largos (los modelos atienden con menos fiabilidad a la parte central de los contextos largos), la aritmética hecha dentro del texto y cualquier pregunta basada en una falsedad que el modelo acepta cortésmente.

## Mitigaciones que funcionan

| Mitigación | Qué aborda |
| --- | --- |
| RAG / anclaje en documentos recuperados | Sustituye la memoria por hechos provistos; permite citas |
| Uso de herramientas (calculadora, código, búsqueda) | Externaliza lo que los modelos calculan peor |
| «Responde solo a partir del contexto; si no, di que no se sabe» | Da permiso para negarse |
| Temperatura más baja para tareas factuales | Recorta el muestreo creativo-pero-erróneo |
| Autoverificación / comprobación en segunda pasada | Atrapa incoherencias que la primera pasada no vio |
| Citas obligatorias + flujo de muestreo de control | Hace que los errores los puedan detectar las personas |
| Modelos de razonamiento en problemas difíciles | Trabajar los pasos reduce los errores no forzados |

El peso pesado es el **anclaje (grounding)**: cuando el pasaje correcto está en el contexto, el trabajo del modelo pasa de *recordar* a *leer*, algo que hace de forma mucho más fiable. Por eso RAG sigue siendo la arquitectura estándar para productos factuales.

## ¿Se puede resolver del todo?

No con las arquitecturas actuales: un sistema que debe producir texto siempre producirá a veces texto sin respaldo. La investigación sigue reduciendo las tasas (mejor calibración, entrenar a los modelos para abstenerse, capas de verificación), y los modelos capaces de razonar alucinan menos en problemas de varios pasos. La postura de ingeniería, a fecha de 2026: diseña **asumiendo** una alucinación residual: ancla las respuestas, exige citas para las afirmaciones que importan y mantén a las personas en el bucle allí donde los errores salen caros.

## Preguntas frecuentes

**¿Por qué el modelo suena MÁS seguro cuando se equivoca?**
La fluidez y la seguridad son patrones estilísticos aprendidos del texto, no correlacionados con la certeza interna. No uses el tono como señal de verdad.

**¿Preguntar «¿estás seguro?» ayuda?**
A veces desencadena una autorrevisión útil, a veces una conformidad servil con la duda que insinúas. La verificación independiente le gana al interrogatorio.

**¿Los modelos más grandes son más veraces?**
En general sí en factualidad amplia, pero ningún tamaño elimina la fabricación, y el estilo seguro también escala. La escala encoge el problema; el anclaje y la verificación gestionan lo que queda.`,
  },
  {
    topicKey: 'open-vs-closed-llms',
    title: 'LLM de código abierto frente a cerrado: cómo elegir',
    question: '¿Debo construir sobre grandes modelos de lenguaje de código abierto o cerrado?',
    summary:
      'Las API cerradas compran capacidad de frontera con cero operaciones; los modelos de pesos abiertos compran control, privacidad y escala barata. Los factores decisivos son la sensibilidad de los datos, la economía del volumen y cuánta capacidad necesita de verdad tu tarea.',
    tags: ['ai', 'llm', 'código abierto', 'estrategia', 'infraestructura'],
    language: 'es',
    image: { prompt: promptOf('open-vs-closed-llms'), alt: 'Un núcleo de retícula abierta junto a un núcleo pulido y sellado con un único puerto' },
    sources: [
      { title: 'LMArena — clasificación comunitaria que compara modelos abiertos y cerrados', url: 'https://lmarena.ai' },
      { title: 'Hugging Face — hub de modelos abiertos', url: 'https://huggingface.co/models' },
    ],
    content: `# LLM de código abierto frente a cerrado: cómo elegir

«Abierto frente a cerrado» es menos una cuestión ideológica que una cuestión de aprovisionamiento: **quién ejecuta el modelo, quién ve tus datos y quién absorbe la carga operativa.** Los modelos cerrados (servidos por API: las familias GPT, Claude y Gemini) venden capacidad de frontera con cero infraestructura. Los modelos de pesos abiertos (las familias Llama, Qwen, DeepSeek, Mistral y muchas otras) te entregan los pesos y, con ellos, el control, la privacidad y la factura de servirlos.

Una nota terminológica que importa en los contratos: la mayoría de los modelos «de código abierto» son, con precisión, **de pesos abiertos**: puedes descargarlos y ejecutarlos, pero los datos de entrenamiento no se publican y las licencias pueden traer restricciones de uso. Lee la licencia, no el marketing.

## La tabla de compromisos

| Dimensión | Cerrado (API) | Pesos abiertos (autoalojado) |
| --- | --- | --- |
| Capacidad máxima | Frontera; los más fuertes en razonamiento difícil | Los mejores modelos abiertos se acercan y lideran en coste por calidad |
| Forma del coste | Por token, escala con el uso | Infraestructura fija + operaciones, escala con la capacidad |
| Control de los datos | Los datos transitan por el proveedor (revisa retención/entrenamiento) | Nunca salen de tu red |
| Personalización | Prompting, algo de fine-tuning alojado | Fine-tuning completo, cuantización, cirugía |
| Carga operativa | Ninguna | GPUs, pila de servicio, actualizaciones, guardias |
| Estabilidad | Los modelos se retiran según el calendario del proveedor | Los pesos son tuyos para siempre |
| Cumplimiento | Certificaciones del proveedor | La historia más fácil para reglas estrictas de residencia de datos |

## Cuándo gana lo cerrado

Necesitas el razonamiento más fuerte disponible; tu volumen es modesto o irregular; no tienes capacidad de operaciones de GPU/ML; quieres que las mejoras de capacidad te lleguen de forma continua. Para el primer año de la mayoría de equipos de producto, una API de frontera es el camino más rápido para averiguar si el producto funciona siquiera; optimiza después de que lo haga.

## Cuándo gana lo abierto

Los datos no pueden salir (sanidad, defensa, residencia estricta); el volumen alto y sostenido hace que el precio por token domine tus márgenes; necesitas personalización profunda o un especialista pequeño y rápido destilado para una tarea; estás incrustando un modelo en hardware o entornos aislados; o el bloqueo de proveedor es un riesgo estratégico que te pagan por evitar.

## El patrón al que llegan la mayoría de los equipos maduros

**Enruta, no jures lealtad.** Un modelo cerrado capaz se ocupa de la cola difícil y de bajo volumen; un modelo abierto ajustado se ocupa del núcleo de alto volumen y bien entendido; las cargas sensibles se quedan en local. Las capas de abstracción y las pilas de servicio compatibles con OpenAI abaratan la construcción del enrutamiento multimodelo, y la diferencia entre niveles se vuelve a medir cada trimestre, porque a fecha de 2026 sigue moviéndose.

## Preguntas frecuentes

**¿Los modelos abiertos van «una generación por detrás»?**
La diferencia en la frontera persiste pero se ha estrechado de forma drástica, y para muchas tareas concretas (extracción, resumen, programación rutinaria) los modelos abiertos potentes son sencillamente suficientes. Haz benchmark de tu tarea, no de los titulares.

**¿Autoalojar es realmente más barato?**
Solo con utilización. Una GPU sirviendo al 5 % de capacidad es la fábrica de tokens más cara del planeta; las API gestionadas de modelos abiertos son el camino intermedio: pesos abiertos, GPUs de otro.

**¿Puedo cambiar más adelante?**
El comportamiento a nivel de prompt se transfiere de forma imperfecta entre modelos. Mantén una batería de evaluación desde el primer día; el coste de migración es sobre todo revalidación, y las evaluaciones la convierten de semanas de intuición en días de diffs.`,
  },
  {
    topicKey: 'llm-tokens-pricing',
    title: '¿Qué son los tokens y cómo funciona el precio de los LLM?',
    question: '¿Qué es exactamente un token y cómo cobran el uso los proveedores de LLM?',
    summary:
      'Los tokens son los fragmentos de subpalabra que los modelos leen y escriben, aproximadamente ¾ de una palabra en inglés cada uno. El precio de las API es por millón de tokens, con la salida costando varias veces la entrada, y la caché y los lotes como las grandes palancas.',
    tags: ['ai', 'llm', 'tokens', 'precios', 'api'],
    language: 'es',
    image: { prompt: promptOf('llm-tokens-pricing'), alt: 'Un prisma cortando una cinta de luz-texto en tokens pesados en una balanza' },
    sources: [
      { title: 'tiktoken — tokenizador BPE rápido usado por los modelos de OpenAI', url: 'https://github.com/openai/tiktoken' },
      { title: 'Sennrich et al., «Neural Machine Translation of Rare Words with Subword Units» (BPE, 2015)', url: 'https://arxiv.org/abs/1508.07909' },
    ],
    content: `# ¿Qué son los tokens y cómo funciona el precio de los LLM?

Los modelos no leen caracteres ni palabras: leen **tokens**, fragmentos de subpalabra que produce un tokenizador. «Understanding» podría ser un token; «unconstitutionally» podría ser cuatro; un emoji raro podría ser tres. Todo límite de capacidad (la ventana de contexto) y toda factura de API se denominan en estas unidades, así que tener una idea aproximada de ellos se amortiza pronto.

## Reglas generales

- **Inglés**: 1 token ≈ 4 caracteres ≈ ¾ de palabra. Un documento de 1000 palabras ≈ 1300–1500 tokens.
- **Código**: más denso en tokens que la prosa: la puntuación, el sangrado y los identificadores cuestan todos.
- **Chino/japonés/coreano**: aproximadamente 1–2 caracteres por token en los tokenizadores modernos; por *información transmitida*, el texto CJK suele ser comparable al inglés o ligeramente más caro.
- **Números y URL**: sorprendentemente caros; los identificadores largos se hacen trizas en muchos tokens.

Los tokenizadores se construyen por codificación por pares de bytes (BPE): partiendo de bytes y fusionando repetidamente los pares más frecuentes, de modo que las cadenas comunes se vuelven tokens únicos. Cada familia de modelos tiene su propio tokenizador —los conteos difieren entre proveedores—, por lo que las comparaciones de coste deberían hacerse sobre *tu* tráfico real.

## Cómo corre el contador

El precio de las API tiene una forma estándar entre proveedores:

| Contador | Qué cuenta | Relación típica |
| --- | --- | --- |
| **Tokens de entrada** | Todo lo que envías: prompt del sistema, historial, documentos recuperados, la pregunta | Tarifa base |
| **Tokens de salida** | Todo lo que genera el modelo, incluido el razonamiento oculto en algunos modelos de razonamiento | Comúnmente ~3–5× la tarifa de entrada |
| **Entrada en caché** | Prefijos estables repetidos (prompts de sistema, documentos largos) | A menudo ~10× más barata que la entrada nueva |
| **Lote/asíncrono** | Trabajos no urgentes enviados en bloque | Comúnmente ~la mitad de precio |

De ahí se siguen dos hechos estructurales. Primero, **el historial de la conversación se reenvía en cada turno**: el coste de un chat crece de forma cuadrática con su longitud salvo que trunques, resumas o te apoyes en la caché. Segundo, **la salida domina** cuando generas texto largo, así que las instrucciones de «sé conciso» y los topes de salida son controles de coste reales, no solo preferencias de estilo.

## Estimar una carga de trabajo

La aritmética es siempre la misma: (peticiones por día) × (tokens de entrada medios × tarifa de entrada + tokens de salida medios × tarifa de salida). Ejemplo trabajado con tarifas de marcador de posición —digamos que la entrada cuesta 3 $ y la salida 15 $ por millón de tokens—: un bot de soporte que responde 10 000 consultas al día con prompts de 2000 tokens (instrucciones + contexto recuperado) y respuestas de 300 tokens cuesta 10 000 × (2000×3 $ + 300×15 $)/1M ≈ **105 $/día**, dos tercios de ello entrada. Esa proporción es típica de las apps RAG, por lo que la caché de prompts y el recorte de contexto suelen ahorrar más que cambiar de modelo.

## Las grandes palancas, ordenadas

1. **Cachea los prefijos estables**: victorias casi gratuitas para cualquier app con un prompt de sistema fijo largo o documentos compartidos.
2. **Dimensiona el modelo**: enruta el tráfico fácil a un nivel más barato; reserva los modelos de frontera para la cola difícil.
3. **Recorta el contexto**: recupera menos fragmentos pero mejores; resume los turnos de chat viejos; elimina el texto repetido.
4. **Limita y modela la salida**: fija longitudes máximas; prefiere respuestas cortas y estructuradas cuando sea posible.
5. **Procesa por lotes lo no urgente**: la clasificación nocturna y los rellenos no deberían pagar precios interactivos.

## Preguntas frecuentes

**¿Por qué me facturaron más tokens de los que sugiere la longitud de mi texto?**
Los prompts de sistema, las definiciones de herramientas, el formateo de los mensajes y (en los modelos de razonamiento) los tokens de pensamiento cuentan todos, y el texto que no es inglés o con mucho código se tokeniza de forma más densa que la regla general del inglés.

**¿Las ventanas de contexto cambian el precio?**
La ventana es un límite de capacidad, no un precio, pero llenarla sí cuesta. Algunos proveedores también cobran tarifas premium por encima de ciertos tamaños de contexto, así que las llamadas de contexto gigante merecen escrutinio.

**¿Cómo cuento tokens antes de enviar?**
Usa la biblioteca de tokenizado del proveedor o su endpoint de conteo de tokens (para los tokenizadores de la familia OpenAI, tiktoken corre en local). Para presupuestar, la heurística de ≈4 caracteres suele quedar dentro del 20 %.`,
  },
];
