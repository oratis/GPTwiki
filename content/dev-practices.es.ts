import type { DraftArticle } from './types';
import { devPracticesEn } from './dev-practices.en';

// Batch: Programming & Development (versión nativa en español). Mismos temas y
// topicKey que dev-practices.en.ts, redactados de forma nativa para el contexto
// hispanohablante. Las imágenes se comparten.

const promptOf = (key: string): string => {
  const hit = devPracticesEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const devPracticesEs: DraftArticle[] = [
  {
    topicKey: 'rebase-vs-merge',
    title: 'Git rebase vs merge: cuándo usar cada uno',
    question: '¿Cuál es la diferencia entre git merge y git rebase, y cuándo conviene usar cada uno?',
    summary:
      'merge conserva el historial tal como ocurrió y crea un commit de fusión; rebase reaplica tus commits sobre una nueva base para lograr un historial limpio y lineal. Usa merge en ramas compartidas y rebase en tu trabajo privado antes de compartirlo.',
    tags: ['programación', 'git', 'control de versiones', 'herramientas de desarrollo'],
    language: 'es',
    image: {
      prompt: promptOf('rebase-vs-merge'),
      alt: 'Dos vías que se unen en un cruce frente a una vía vuelta a tender como una sola línea recta',
    },
    sources: [
      { title: 'Libro Pro Git — Rebasing', url: 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing' },
      { title: 'Atlassian — Merging vs Rebasing', url: 'https://www.atlassian.com/git/tutorials/merging-vs-rebasing' },
    ],
    content: `# Git rebase vs merge: cuándo usar cada uno

Tanto \`merge\` como \`rebase\` resuelven el mismo problema —combinar el trabajo de una rama en otra— pero cuentan dos historias distintas sobre cómo ocurrió. merge registra el historial *tal como sucedió en realidad*, ramas incluidas. rebase *reescribe* el historial para que parezca que trabajaste en línea recta desde el principio. Ninguno es "el correcto"; están optimizados para objetivos distintos, y la famosa regla que los rige se deduce directamente de lo que hace cada uno.

## Qué hace en realidad cada comando

**merge** toma las dos ramas y las ata con un nuevo **commit de fusión** que tiene dos padres. Los commits de tu rama quedan exactamente donde estaban; el commit de fusión une las líneas de tiempo. El historial se convierte en un grafo que muestra con honestidad "estas se desarrollaron en paralelo y luego se unieron".

**rebase**, en cambio, levanta los commits de tu rama, los aparta, se mueve a la punta de la rama de destino y **reaplica tus commits uno a uno** encima de ella. El resultado es una línea recta, como si hubieras empezado tu trabajo desde el código más reciente. Pero esos commits reaplicados son *commits nuevos con IDs nuevos*; los originales se descartan. Ese es el detalle crucial: rebase reescribe el historial.

## El compromiso

| | merge | rebase |
| --- | --- | --- |
| Forma del historial | Grafo ramificado, fiel a los hechos | Línea recta y limpia |
| ¿Crea commits nuevos? | Un commit de fusión | Reescribe todos los commits reaplicados |
| Conserva el contexto | Sí: muestra cuándo y dónde divergió el trabajo | No: aplana la historia |
| Manejo de conflictos | Se resuelve una vez, en la fusión | Puede resolverse commit a commit durante el reaplicado |
| Seguro en ramas compartidas | Sí | No: reescribe la base de los demás |

## La única regla que evita desastres

**Nunca hagas rebase de commits que otras personas ya tienen.** Como rebase reemplaza commits por otros nuevos, hacer rebase de una rama compartida o pública reescribe un historial sobre el que otros han basado su trabajo; cuando vuelvan a hacer pull, su historial y el tuyo no coincidirán, lo que produce commits duplicados y una confusión dolorosa. La regla de oro: *haz rebase del trabajo privado y local; haz merge de cualquier cosa compartida.*

Un flujo de trabajo común y seguro combina ambos: mientras desarrollas una rama de funcionalidad en solitario, hazle **rebase sobre la última main** periódicamente para mantenerte al día con un historial limpio; luego, para integrarla en la main compartida, usa **merge** (a menudo mediante un pull request). Así obtienes un historial local ordenado y una integración honesta y no destructiva.

## Recomendaciones prácticas

- **Usa merge** para incorporar una rama terminada a una rama compartida, y siempre que la rama sea pública.
- **Usa rebase** para actualizar tu rama privada en curso sobre los nuevos commits de main, y para ordenar tus propios commits locales desordenados (rebase interactivo) antes de la revisión.
- **Evita el rebase** en \`main\` o ramas compartidas, y detente si no estás seguro de si alguien más ya tiene tus commits.

## Preguntas frecuentes

**¿rebase borra mi trabajo?**
No: reescribe los commits, pero los cambios se conservan (y los commits antiguos quedan un tiempo en el reflog para poder recuperarlos). Cambia los IDs y el orden de los commits, no el contenido de tus ediciones.

**¿Por qué algunos equipos prohíben los commits de fusión?**
Prefieren un historial perfectamente lineal por legibilidad y para hacer bisect, así que exigen rebase antes de fusionar (o "squash merge"). Es una decisión de estilo con compromisos reales, no una cuestión de corrección.

**¿Qué es un squash merge?**
Condensa todos los commits de una rama en un solo commit en la rama de destino: un historial ordenado de un commit por funcionalidad, a costa de perder la granularidad de los commits individuales de la rama.`,
  },
  {
    topicKey: 'rest-vs-graphql',
    title: 'REST vs GraphQL: ¿qué estilo de API elegir?',
    question: '¿Cuál es la diferencia entre las APIs REST y GraphQL, y cuándo conviene usar cada una?',
    summary:
      'REST expone muchos endpoints fijos, cada uno con una forma de datos predefinida; GraphQL expone un solo endpoint donde el cliente pide exactamente los campos que quiere. GraphQL brilla con necesidades de datos complejas y variadas; REST es más simple, cacheable y omnipresente.',
    tags: ['programación', 'api', 'rest', 'graphql'],
    language: 'es',
    image: {
      prompt: promptOf('rest-vs-graphql'),
      alt: 'Muchas ranuras de vending fijas frente a un solo mostrador que cumple un pedido exacto a medida',
    },
    sources: [
      { title: 'GraphQL — introducción oficial', url: 'https://graphql.org/learn/' },
      { title: 'MDN — Panorama de los conceptos de HTTP y REST', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
    ],
    content: `# REST vs GraphQL: ¿qué estilo de API elegir?

REST y GraphQL son dos formas de diseñar cómo los clientes le piden datos a un servidor. **REST** te da muchas URLs (endpoints), cada una devuelve un bloque fijo de datos. **GraphQL** te da un único endpoint y un lenguaje de consulta, de modo que el cliente especifica *exactamente* qué campos quiere y obtiene precisamente eso, ni más ni menos. El contraste se reduce a quién decide la forma de la respuesta: el servidor (REST) o el cliente (GraphQL).

## En qué se diferencian en la práctica

Supón que quieres el nombre de un usuario y los títulos de sus últimas tres publicaciones.

**Con REST**, normalmente llamas a \`/users/123\` (devuelve el objeto de usuario completo) y luego a \`/users/123/posts\` (devuelve los objetos de publicación completos). Obtuviste mucho más de lo que pediste (todos los campos de usuario y de publicación) y diste dos viajes de ida y vuelta. Estas son las fricciones clásicas de REST: **sobreobtención** (demasiados campos) e **infraobtención** (necesitar más llamadas para armar una vista).

**Con GraphQL**, envías una sola consulta a un solo endpoint pidiendo \`user.name\` y \`user.posts(last: 3).title\`, y recibes exactamente esos campos en una sola respuesta. El cliente obtuvo precisamente sus datos en una única petición.

## La tabla de compromisos

| | REST | GraphQL |
| --- | --- | --- |
| Endpoints | Muchos, basados en recursos | Uno |
| Forma de la respuesta | Fijada por el servidor | Elegida por el cliente |
| Sobre/infraobtención | Frecuente | Evitada por diseño |
| Caché | Simple (caché HTTP por URL) | Más difícil (una URL, consultas variadas) |
| Curva de aprendizaje y herramientas | Menor, universal | Mayor; requiere un esquema y una capa de servidor |
| Versionado | A menudo /v1, /v2 | Evolucionar el esquema, deprecar campos |
| Mejor para | Recursos simples, estables y cacheables | Datos complejos, anidados y variables según el cliente |

## Cuándo elegir cada uno

**Recurre a REST cuando** tus datos sean relativamente simples y con forma de recurso, quieras apoyarte en la madura caché y las herramientas de HTTP, estés construyendo una API pública que consumirán muchos clientes desconocidos, o simplemente quieras la opción de menor fricción y más universalmente comprendida. REST sigue siendo el valor por defecto, y con razón.

**Recurre a GraphQL cuando** los clientes necesiten muchas porciones distintas de datos densamente conectados (clásico en apps móviles que minimizan peticiones y en paneles complejos), estés agregando varias fuentes de backend tras un único grafo, o los equipos de frontend quieran iterar sobre sus necesidades de datos sin esperar nuevos endpoints. El costo es mayor complejidad en el servidor, un esquema que mantener y una caché más difícil.

## Preguntas frecuentes

**¿GraphQL es "mejor" que REST?**
No: resuelve la sobre/infraobtención con elegancia, pero añade complejidad y desafíos de caché. Para APIs simples, REST suele ser la mejor decisión de ingeniería. Ajusta la herramienta a las necesidades de datos.

**¿Puedo usar ambos?**
Sí, y es habitual: muchos sistemas exponen REST para superficies simples o públicas y GraphQL para datos internos o de app complejos, o envuelven servicios REST tras una pasarela GraphQL.

**¿GraphQL reemplaza a la base de datos?**
No: es una capa de consulta de API entre el cliente y el servidor. Tu servidor sigue obteniendo datos de bases de datos u otros servicios; GraphQL solo da forma a lo que recibe el cliente.`,
  },
  {
    topicKey: 'sql-vs-nosql',
    title: 'SQL vs NoSQL: cómo elegir una base de datos',
    question: '¿Cuál es la diferencia entre las bases de datos SQL y NoSQL, y cómo elijo?',
    summary:
      'Las bases de datos SQL almacenan filas estructuradas con un esquema fijo y potentes consultas relacionales; NoSQL cambia parte de esa estructura por flexibilidad y un escalado horizontal más sencillo. La elección correcta depende de la forma de tus datos, tus necesidades de consistencia y tu escala.',
    tags: ['programación', 'bases de datos', 'sql', 'nosql'],
    language: 'es',
    image: {
      prompt: promptOf('sql-vs-nosql'),
      alt: 'Una cuadrícula rígida de celdas enlazadas frente a un grupo flexible de contenedores variados',
    },
    sources: [
      { title: 'MongoDB — Bases de datos NoSQL vs SQL', url: 'https://www.mongodb.com/resources/basics/databases/nosql-explained' },
      { title: 'PostgreSQL — acerca de (base de datos relacional)', url: 'https://www.postgresql.org/about/' },
    ],
    content: `# SQL vs NoSQL: cómo elegir una base de datos

"SQL vs NoSQL" clasifica las bases de datos según cómo organizan los datos. **Las bases de datos SQL (relacionales)** —PostgreSQL, MySQL y otras— almacenan datos en tablas de filas y columnas con un esquema predefinido, y vinculan las tablas mediante relaciones. **NoSQL** es un término paraguas para todo lo demás: almacenes de documentos, de clave-valor, de columnas anchas y bases de datos de grafos, que relajan la rígida estructura de tablas a cambio de flexibilidad y escala. La decisión no es de "lo nuevo frente a lo viejo"; se trata de ajustar la base de datos a la forma de tus datos y a las exigencias de tu sistema.

## La diferencia central: esquema y estructura

Una base de datos **relacional** exige estructura por adelantado: defines tablas y tipos de columna, cada fila se ajusta y la base de datos lo hace cumplir. A cambio obtienes consultas potentes (joins de SQL entre tablas), garantías sólidas y décadas de fiabilidad. El costo es la rigidez: cambiar el esquema después requiere cuidado, y el modelo relacional tradicionalmente escala *hacia arriba* (un servidor más grande) con más naturalidad que *hacia afuera* (muchos servidores).

Una base de datos **NoSQL de documentos** (el tipo más común) almacena documentos flexibles parecidos a JSON. Distintos registros pueden tener distintos campos; puedes anidar datos relacionados dentro de un mismo documento. Esto se adapta a datos que evolucionan rápido o son irregulares, y se diseñó desde el principio para **escalar horizontalmente** a través de muchas máquinas. El costo: menos garantías integradas, consultas entre registros más débiles y el riesgo de datos inconsistentes sin un esquema que los vigile.

## El compromiso, por tipo

| Tipo | Almacena | Fuerte en | Uso de ejemplo |
| --- | --- | --- | --- |
| Relacional (SQL) | Tablas, filas | Consultas complejas, transacciones, integridad | Finanzas, pedidos, cualquier cosa relacional |
| Documentos | Docs parecidos a JSON | Esquema flexible, datos anidados | Catálogos, perfiles de usuario, contenido |
| Clave-valor | Clave simple → valor | Búsquedas ultrarrápidas, caché | Sesiones, cachés, feature flags |
| Columnas anchas | Filas con columnas dinámicas | Escala masiva de escritura | Series temporales, logging a gran escala |
| Grafos | Nodos y relaciones | Datos muy conectados | Grafos sociales, recomendaciones |

## Cómo elegir

Hazte tres preguntas:

- **¿Tus datos son relacionales y la consistencia es crítica?** (Dinero, inventario, cualquier cosa donde una actualización a medias sea inaceptable.) → SQL, por sus transacciones e integridad.
- **¿La forma de tus datos es irregular o cambia rápido, o necesitas escalar las escrituras a través de muchos servidores?** → Un tipo de NoSQL ajustado al patrón de acceso.
- **¿Cuáles son tus patrones de consulta?** Muchos joins ad hoc e informes favorecen a SQL; las búsquedas simples por clave favorecen a clave-valor; los recorridos densamente conectados favorecen a los grafos.

El valor por defecto moderno y honesto: **empieza con una base de datos relacional sólida (p. ej. PostgreSQL) a menos que tengas una razón concreta para no hacerlo.** Cubre una enorme variedad de necesidades, hoy admite columnas JSON para dar flexibilidad y escala más de lo que la gente supone. Recurre a NoSQL cuando un requisito concreto —escala extrema, un patrón de acceso específico, datos genuinamente sin esquema— lo exija.

## Preguntas frecuentes

**¿NoSQL es más rápido que SQL?**
No de forma inherente: puede ser más rápido para patrones específicos (búsquedas simples por clave, escrituras masivas) y más lento o más torpe para otros (joins complejos). "Más rápido" depende por completo de la operación.

**¿Las bases de datos SQL pueden escalar a sistemas grandes?**
Sí: con replicación, particionado y caché, las bases de datos relacionales operan sistemas enormes. La afirmación de que "SQL no escala" está anticuada; escalar solo requiere un diseño más deliberado.

**¿Tengo que elegir solo una?**
No: la "persistencia políglota" es común: una base de datos relacional para los registros centrales, más una caché de clave-valor y quizá un almacén de búsqueda o de grafos, cada uno para lo que mejor hace.`,
  },
  {
    topicKey: 'https-how-it-works',
    title: 'Cómo HTTPS mantiene segura tu conexión',
    question: '¿Qué hace realmente HTTPS y cómo mantiene a salvo mis datos el candado?',
    summary:
      'HTTPS envuelve el tráfico web normal en cifrado para que nadie entre tú y el sitio pueda leerlo ni alterarlo, y usa certificados para demostrar que de verdad hablas con el servidor correcto. Protege la privacidad y la integridad, pero no el sitio en sí.',
    tags: ['programación', 'seguridad', 'https', 'web'],
    language: 'es',
    image: {
      prompt: promptOf('https-how-it-works'),
      alt: 'Un mensaje que viaja por un tubo protector, ilegible para los de fuera, sellado como verificado',
    },
    sources: [
      { title: 'MDN — Qué es HTTPS / TLS', url: 'https://developer.mozilla.org/en-US/docs/Glossary/HTTPS' },
      { title: "Let's Encrypt — cómo funciona", url: 'https://letsencrypt.org/how-it-works/' },
    ],
    content: `# Cómo HTTPS mantiene segura tu conexión

HTTPS es simplemente HTTP —el protocolo básico de petición/respuesta de la web— con una capa de seguridad envuelta alrededor (la "S" es de Secure, "seguro", aportada por TLS). El HTTP plano envía todo como texto legible que cualquiera en el camino de la red puede ver y alterar. HTTPS lo soluciona con dos garantías: **cifrado** (los de fuera no pueden leer tu tráfico) y **autenticación** (de verdad hablas con el sitio que crees, no con un impostor). El candado es una promesa sobre la *conexión*, y entender exactamente qué promete —y qué no— resulta genuinamente útil.

## Los dos problemas que resuelve

**1. Escucha clandestina.** En HTTP plano, tu red WiFi, tu proveedor de internet o cualquiera por el medio puede leer cada página y contraseña que envías. HTTPS cifra el tráfico para que sea un galimatías ilegible para cualquiera salvo los dos extremos, aunque viaje por el mismo internet público.

**2. Suplantación y manipulación.** ¿Cómo sabes que el servidor que responde es de verdad tu banco y no un atacante interceptando la conexión? HTTPS usa **certificados** emitidos por autoridades de confianza para demostrar la identidad del servidor, y comprobaciones de integridad para detectar cualquier manipulación en tránsito. Sin esto, el cifrado por sí solo sería inútil: podrías estar charlando en privado con un ladrón.

## Cómo funciona el handshake (versión simplificada)

Cuando te conectas por HTTPS, ocurre una negociación rápida antes de que fluya ningún dato real:

1. **Verificación del certificado.** El servidor presenta su certificado. Tu navegador comprueba que fue emitido por una autoridad de confianza para este dominio exacto y que no está caducado ni revocado, confirmando la identidad.
2. **Intercambio de claves.** Usando criptografía ingeniosa (matemática de clave pública), las dos partes acuerdan una clave secreta compartida *sin enviarla nunca a la vista*, aunque cualquiera pueda estar mirando.
3. **Sesión cifrada.** A partir de ahí, todo el tráfico se cifra con esa clave compartida: cifrado simétrico rápido para el resto de la conversación.

La parte elegante es el paso 2: las dos partes establecen una clave privada sobre un canal público, de modo que ni un fisgón que viera todo el handshake puede deducirla.

## Qué significa y qué no significa el candado

| El candado garantiza | El candado NO garantiza |
| --- | --- |
| Que el tráfico va cifrado en tránsito | Que el sitio sea honesto o seguro |
| Que estás conectado al dominio real | Que el sitio no te estafará |
| Que los datos no se alteraron por el camino | Que la empresa detrás sea de fiar |

Este es el punto peor entendido: HTTPS asegura la *tubería*, no el *destino*. Un sitio de phishing puede tener un candado válido; eso solo significa que tu conexión *con la estafa* es privada. HTTPS protege tus datos de terceros; no responde por las intenciones del sitio.

## Preguntas frecuentes

**¿HTTPS es más lento que HTTP?**
Hoy de forma insignificante: el hardware y los protocolos modernos hacen que la sobrecarga del cifrado sea mínima, y HTTPS suele habilitar funciones de protocolo más rápidas. La vieja preocupación de que "el cifrado es lento" está obsoleta.

**¿Por qué ahora se exige HTTPS en todas partes, incluso en blogs?**
Porque incluso leer una página revela información privada, y las páginas sin cifrar pueden modificarse en tránsito (anuncios o malware inyectados). Los navegadores ahora marcan el HTTP plano como "No seguro", y los certificados gratuitos eliminaron la barrera del costo.

**¿HTTPS protege los datos después de llegar al servidor?**
No: protege los datos *en tránsito*. Una vez que los datos llegan al servidor, su seguridad depende de cómo el sitio los almacena y maneja. HTTPS es una capa, no la totalidad de la seguridad.`,
  },
  {
    topicKey: 'what-is-an-api',
    title: '¿Qué es realmente una API? Una explicación en lenguaje claro',
    question: '¿Qué es una API y cómo funciona en realidad, en términos sencillos?',
    summary:
      'Una API es un contrato que permite a un programa pedir servicios a otro sin conocer sus entrañas, como el menú de un restaurante entre tú y la cocina. Define qué puedes pedir y qué recibes, ocultando la complejidad que hay detrás.',
    tags: ['programación', 'api', 'fundamentos', 'web'],
    language: 'es',
    image: {
      prompt: promptOf('what-is-an-api'),
      alt: 'Una carta-pedido entregada sobre un mostrador, que oculta una cocina compleja y devuelve un plato terminado',
    },
    sources: [
      { title: 'MDN — Introducción a las APIs web', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction' },
      { title: 'Red Hat — ¿Qué es una API?', url: 'https://www.redhat.com/en/topics/api/what-are-application-programming-interfaces' },
    ],
    content: `# ¿Qué es realmente una API? Una explicación en lenguaje claro

API significa Application Programming Interface (interfaz de programación de aplicaciones), lo cual no explica nada. Aquí está la versión útil: una API es un **contrato que permite a dos piezas de software hablar entre sí**: un programa ofrece servicios, y la API define exactamente cómo otro programa puede pedirlos. La analogía clásica es un restaurante. Tú (un programa) lees un **menú** (la API), pides un plato (haces una petición), y la **cocina** (el otro programa) lo prepara y lo saca (la respuesta). Nunca entras en la cocina ni aprendes sus recetas; el menú es la interfaz acordada entre ambos.

## Por qué esto importa

Ese arreglo del restaurante captura todo el sentido: **obtienes lo que necesitas sin saber cómo se hace.** Cuando una app te muestra un mapa, no contiene la geografía del mundo: se la pide a una API de mapas. Cuando un sitio te deja "pagar con PayPal", no procesa los pagos por sí mismo: llama a la API de PayPal. Las APIs permiten que el software se construya sobre otro software, así nadie tiene que reinventar mapas, pagos, datos meteorológicos o sistemas de inicio de sesión desde cero.

Esto aporta tres grandes beneficios:

- **Abstracción**: usas un servicio sin entender sus entrañas (pides comida sin saber cómo funciona la cocina).
- **Reutilización**: un único servicio bien construido impulsa miles de apps.
- **Separación**: la cocina puede cambiar por completo sus recetas y, mientras el menú siga igual, tu pedido sigue funcionando. Los equipos pueden cambiar sus entrañas sin romperles nada a quienes dependen de ellos.

## Cómo funciona una llamada a una API web

Las APIs más comunes hoy son las **APIs web**, que se comunican por internet. El flujo es simple:

1. Tu programa envía una **petición** a una URL concreta (el "ítem del menú"), a menudo con parámetros ("un café mediano, sin azúcar").
2. El servidor la recibe, hace el trabajo (consulta una base de datos, ejecuta lógica), y
3. Devuelve una **respuesta**: normalmente datos estructurados en formato **JSON**, que los programas leen con facilidad.

Por ejemplo, una app del tiempo pide \`api.weather.com/forecast?city=Tokyo\` y recibe un JSON con la temperatura y las condiciones, que luego muestra de forma vistosa. La app aportó la pregunta; la API aportó los datos.

## Las APIs están por todas partes

| Lo que ves | Detrás, una llamada a la API de |
| --- | --- |
| "Iniciar sesión con Google" | La API de autenticación de Google |
| Un mapa incrustado en una app | Una API de mapas |
| Seguimiento de envíos en vivo | La API de la empresa de mensajería |
| "Pagar con tarjeta" | La API de un procesador de pagos |
| Un chatbot en una app | La API de un proveedor de IA |

El software moderno es en gran medida **APIs llamando a APIs**: cada app es una pequeña cocina que también pide a otras.

## Preguntas frecuentes

**¿Una API es lo mismo que un sitio web?**
No: un sitio web devuelve páginas con estilo para humanos; una API devuelve datos estructurados para programas. Misma idea (petición → respuesta), distinto público.

**¿Las APIs cuestan dinero?**
Algunas son gratuitas, muchas cobran por uso (por petición o por volumen) y algunas requieren una clave de API para identificarte y facturarte. Las APIs de mapas, pagos e IA suelen medir el uso.

**¿Qué es una "clave de API"?**
Un token secreto que identifica tu app ante la API, usado para autenticarte, hacer cumplir límites y rastrear el uso, como una tarjeta de socio que dice quién hace el pedido.`,
  },
  {
    topicKey: 'sync-vs-async',
    title: 'Síncrono vs asíncrono: por qué el código espera (o no)',
    question: '¿Cuál es la diferencia entre la programación síncrona y la asíncrona?',
    summary:
      'El código síncrono hace una cosa a la vez y se bloquea hasta que cada paso termina; el código asíncrono puede iniciar una tarea lenta y seguir adelante, manejando el resultado después. Lo asíncrono mantiene los programas receptivos al esperar cosas lentas como la red y los archivos.',
    tags: ['programación', 'asincronía', 'concurrencia', 'fundamentos'],
    language: 'es',
    image: {
      prompt: promptOf('sync-vs-async'),
      alt: 'Un cocinero esperando ocioso una sola olla frente a otro que atiende varias ollas a medida que están listas',
    },
    sources: [
      { title: 'MDN — Introducción a JavaScript asíncrono', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing' },
    ],
    content: `# Síncrono vs asíncrono: por qué el código espera (o no)

Esta distinción trata sobre **qué hace un programa mientras espera**. El código **síncrono** se ejecuta paso a paso, y cada paso debe *terminar por completo* antes de que empiece el siguiente; si un paso es lento, todo lo que viene detrás espera. El código **asíncrono** puede *iniciar* una tarea lenta, apartarla y seguir haciendo otro trabajo útil, ocupándose del resultado cuando esté listo. La diferencia apenas importa para las operaciones rápidas e importa enormemente para las lentas —llamadas de red, lecturas de archivos, consultas a bases de datos—, que es justo donde los programas pasan la mayor parte de su tiempo ocioso.

## La analogía de la cocina

Imagina que preparas el desayuno. Un cocinero **síncrono** mete el pan en la tostadora y luego *se queda ahí mirándola* hasta que salta, sin hacer nada más, antes de empezar el café. Tiempo total: la suma de cada paso, uno tras otro, incluida toda la espera.

Un cocinero **asíncrono** inicia la tostada y, *mientras se tuesta*, empieza el café, y *mientras este se prepara*, casca los huevos, atendiendo cada cosa a medida que termina. Las mismas tareas, mucho menos tiempo total, porque la espera se solapó con trabajo útil. El cocinero no se volvió más rápido; simplemente dejó de quedarse ocioso.

## Por qué importa para los programas reales

Las computadoras pasan mucho tiempo esperando cosas lentas: un servidor que responde, un disco que lee, una base de datos que contesta, cada una una eternidad comparada con la velocidad del procesador. El código síncrono que se "bloquea" durante estas esperas congela todo lo que viene detrás. En un servidor web, una llamada bloqueante podría dejarlo incapaz de atender a ningún otro usuario hasta que termine una petición lenta; en una app, es la temida interfaz congelada y sin responder.

| | Síncrono | Asíncrono |
| --- | --- | --- |
| Orden | Estrictamente uno a la vez | Puede solapar los periodos de espera |
| Ante un paso lento | Todo espera (se bloquea) | Otro trabajo continúa |
| Simplicidad | Más fácil de leer y razonar | Flujo de control más complejo |
| Mejor para | Pasos rápidos y dependientes | E/S lenta: red, archivos, BD |

## Cómo se expresa lo asíncrono en el código

No haces malabares con esto manualmente: los lenguajes ofrecen herramientas. Los patrones comunes incluyen **callbacks** (ejecuta esto cuando termine), **promesas/futuros** (un marcador de posición para un resultado que llegará) y la sintaxis moderna **async/await**, que permite que el código asíncrono se *lea* casi como síncrono sin dejar de ser no bloqueante. El modelo mental clave: \`await\` significa "pausa *esta* tarea aquí hasta que el resultado esté listo, pero deja que otras tareas corran mientras tanto", no "congela el programa entero".

El compromiso es real: el código asíncrono es más potente para la capacidad de respuesta, pero más difícil de razonar (el orden, el manejo de errores y el estado compartido se vuelven más delicados). El oficio está en usarlo donde de verdad ocurre la espera, y mantener síncrona la lógica simple y rápida.

## Preguntas frecuentes

**¿Asíncrono es lo mismo que multihilo/paralelo?**
No necesariamente. Lo asíncrono trata de no *esperar ociosamente*; puede correr en un solo hilo intercalando tareas durante sus tiempos de espera. El paralelismo es hacer cosas genuinamente *al mismo tiempo* en varios núcleos. Están relacionados pero son distintos: lo asíncrono solapa la espera, el paralelismo solapa el trabajo.

**¿Lo asíncrono hace que mi código corra más rápido?**
No acelera el trabajo en sí; deja de malgastar tiempo esperando, lo que mejora el rendimiento y la capacidad de respuesta. Para trabajo intensivo en CPU sin esperas, lo asíncrono por sí solo aporta poco: ahí es donde ayuda el paralelismo.

**¿Por qué el código asíncrono parece tanto más confuso?**
Porque la ejecución ya no fluye de arriba abajo en el tiempo: las cosas empiezan ahora y terminan después, los errores llegan fuera de orden y razonas sobre el "cuándo" además del "qué". async/await doma buena parte de esto, pero la no linealidad subyacente es la verdadera dificultad.`,
  },
  {
    topicKey: 'what-is-docker',
    title: '¿Qué es Docker y por qué los desarrolladores aman los contenedores?',
    question: '¿Qué es Docker, qué son los contenedores y por qué se usan tanto?',
    summary:
      'Un contenedor empaqueta una app con todo lo que necesita para ejecutarse en una unidad portátil, de modo que se comporta igual en todas partes, resolviendo el "en mi máquina funciona". Son más ligeros que las máquinas virtuales porque comparten el núcleo del sistema operativo anfitrión.',
    tags: ['programación', 'docker', 'contenedores', 'devops'],
    language: 'es',
    image: {
      prompt: promptOf('what-is-docker'),
      alt: 'Contenedores sellados idénticos, cada uno con una app autónoma, apilables en cualquier plataforma',
    },
    sources: [
      { title: 'Docker — ¿qué es un contenedor?', url: 'https://www.docker.com/resources/what-container/' },
    ],
    content: `# ¿Qué es Docker y por qué los desarrolladores aman los contenedores?

Docker es la herramienta que llevó los **contenedores** a la corriente principal, y los contenedores resuelven uno de los dolores de cabeza más persistentes del software: *"en mi máquina funciona"*, código que corre bien para quien lo desarrolla pero se rompe en otra parte porque la otra computadora tiene versiones, ajustes o piezas faltantes distintas. Un contenedor lo arregla **empaquetando una aplicación junto con todo lo que necesita para ejecutarse** —código, runtime, bibliotecas, herramientas del sistema, configuración— en una unidad sellada y portátil que se comporta igual dondequiera que corra. La analogía del contenedor de carga es exacta: estandariza la caja y cualquier barco, grúa o camión puede manejarla sin importar lo que lleve dentro.

## El problema que resuelve

El software depende de su entorno: una versión concreta del lenguaje, bibliotecas particulares, ciertos ajustes del sistema. Mueve la app al portátil de un colega, a un servidor de pruebas o a producción, y cualquier discordancia puede romperla. Reproducir a mano el entorno exacto en todas partes es frágil y exasperante. Un contenedor empaqueta el entorno *con* la app, así "el entorno" viaja junto y no hay nada que discordar. Constrúyelo una vez; corre igual en tu portátil, en la máquina de tu compañero y en la nube.

## Contenedores vs máquinas virtuales

A menudo se compara a los contenedores con las máquinas virtuales (VM), que también aíslan software, pero la diferencia de peso es la clave:

| | Máquina virtual | Contenedor |
| --- | --- | --- |
| Empaqueta | Un sistema operativo invitado completo + la app | Solo la app + sus dependencias |
| Comparte | Nada: un SO completo cada una | El núcleo del SO anfitrión |
| Tamaño | Gigabytes | Megabytes |
| Arranque | Minutos | Segundos o menos |
| Densidad | Pocas por máquina | Muchos por máquina |

Una VM virtualiza una computadora entera, cargando un sistema operativo completo por app: potente pero pesado. Un contenedor comparte el núcleo del SO anfitrión y aísla solo lo que está por encima, lo que lo hace drásticamente más ligero y rápido de arrancar. Puedes correr muchos contenedores donde solo cabrían unas pocas VM.

## Por qué los aman desarrollo y operaciones

- **Consistencia**: elimina la deriva de entornos entre desarrollo, pruebas y producción. La excusa de "en mi máquina funciona" muere.
- **Portabilidad**: la misma imagen de contenedor corre en cualquier máquina con un runtime de contenedores, incluida toda nube importante.
- **Aislamiento**: cada contenedor es autónomo, así que apps con dependencias en conflicto conviven en paz en un mismo anfitrión.
- **Velocidad y densidad**: el arranque ligero los hace ideales para escalar arriba y abajo y para empaquetarse eficientemente en los servidores.
- **Base de la infraestructura moderna**: los contenedores son el bloque de construcción de los microservicios y de los sistemas de orquestación (como Kubernetes) que los ejecutan a escala.

## Preguntas frecuentes

**¿Docker es lo mismo que un contenedor?**
No exactamente: los contenedores son el concepto o la tecnología; Docker es el popular conjunto de herramientas que los construye y ejecuta. Existen otras herramientas, pero Docker popularizó el flujo de trabajo y el formato de imagen.

**¿Los contenedores reemplazan a las máquinas virtuales?**
A menudo, pero no siempre: con frecuencia se usan *juntos* (contenedores corriendo dentro de VM en la nube). Las VM siguen importando para un aislamiento más fuerte y para ejecutar sistemas operativos distintos; los contenedores ganan en ligereza y velocidad.

**¿Es un contenedor una frontera de seguridad?**
Proporciona aislamiento, pero más débil que el de una VM porque los contenedores comparten el núcleo del anfitrión. Para la mayoría de los usos basta; para cargas hostiles de múltiples inquilinos, los equipos añaden endurecimiento extra o lo combinan con VM.`,
  },
  {
    topicKey: 'big-o-notation',
    title: 'La notación Big-O explicada sin el dolor de cabeza matemático',
    question: '¿Qué es la notación Big-O y por qué les importa a los programadores?',
    summary:
      'Big-O describe cómo crece el trabajo de un algoritmo a medida que crece la entrada: no su velocidad exacta, sino su comportamiento de escalado. Es la razón por la que un enfoque sigue siendo rápido con millones de elementos y otro se atasca, y guía la elección del enfoque correcto.',
    tags: ['programación', 'algoritmos', 'ciencias de la computación', 'rendimiento'],
    language: 'es',
    image: {
      prompt: promptOf('big-o-notation'),
      alt: 'Varias curvas que parten de un mismo origen y divergen de plana a casi vertical',
    },
    sources: [
      { title: 'Khan Academy — Notación asintótica', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation' },
    ],
    content: `# La notación Big-O explicada sin el dolor de cabeza matemático

La notación Big-O suena a matemática intimidante, pero la idea es simple y práctica: describe **cómo crece la cantidad de trabajo que hace un algoritmo a medida que la entrada se hace más grande.** Ignora deliberadamente los tiempos exactos (que dependen del hardware) y se centra en la *forma* del crecimiento. Eso es lo que de verdad importa a escala: un algoritmo que va bien con 100 elementos podría tardar una fracción de segundo o tardar una semana con 10 millones, y Big-O te dice cuál de las dos, antes de que lo averigües por las malas.

## Por qué "cómo crece" gana a "cuán rápido"

El tiempo de ejecución real depende de la máquina, el lenguaje, el día. Big-O quita todo eso para comparar el *comportamiento de escalado*, porque eso es lo que sobrevive al crecimiento. Un enfoque dos veces más rápido con entradas pequeñas pero con peor crecimiento perderá de forma catastrófica a medida que crezcan los datos. La pregunta que responde Big-O no es "¿cuánto tarda?", sino "**¿qué pasa cuando la entrada se hace 10 o 1000 veces más grande?**", la pregunta que decide si tu software seguirá funcionando el año que viene.

## Las clases comunes, en términos sencillos

Piensa en \`n\` como el tamaño de la entrada (número de elementos):

| Big-O | Nombre | Significado sencillo | Ejemplo |
| --- | --- | --- | --- |
| O(1) | Constante | El mismo trabajo sin importar el tamaño | Buscar un elemento por índice |
| O(log n) | Logarítmico | Crece muy despacio; se reduce a la mitad en cada paso | Búsqueda binaria en datos ordenados |
| O(n) | Lineal | El trabajo crece a la par de la entrada | Recorrer una lista una vez |
| O(n log n) | Linealítmico | Un poco peor que lineal | Buenos algoritmos de ordenación |
| O(n²) | Cuadrático | El trabajo explota; cada elemento contra cada elemento | Comparar todos los pares (ingenuo) |
| O(2ⁿ) | Exponencial | Catastrófico; se duplica por cada elemento añadido | Fuerza bruta sobre todas las combinaciones |

El abismo es asombroso a escala. Para un millón de elementos, un algoritmo O(n) hace unos 1 millón de pasos; uno O(n²) hace unos 1.000.000.000.000, la diferencia entre instantáneo y prácticamente nunca. Por eso un enfoque O(n²) escondido en un bucle es un desastre de rendimiento clásico, y por eso encontrar una alternativa O(n log n) u O(n) puede volver rápido un programa sin esperanza.

## Cómo usarlo en la práctica

No necesitas deducir demostraciones. La habilidad práctica es **reconocer patrones**: un solo bucle sobre los datos suele ser O(n); un bucle dentro de otro sobre los mismos datos a menudo es O(n²), una señal de alarma para reconsiderar; reducir el problema a la mitad repetidamente insinúa O(log n). Cuando algo es lento con entradas grandes, el pensamiento Big-O te apunta al culpable (a menudo un bucle anidado accidental o una búsqueda lenta) y hacia la solución (una mejor estructura de datos o algoritmo). También es la razón por la que elegir la estructura de datos correcta —un mapa hash para búsquedas O(1) en lugar de recorrer una lista— es una de las decisiones de rendimiento de mayor palanca.

## Preguntas frecuentes

**¿Un Big-O más bajo siempre significa más rápido?**
No con entradas pequeñas: Big-O describe el crecimiento e ignora las constantes, así que una clase "peor" puede ganar con datos diminutos. Importa sobre todo a medida que la entrada se hace grande; para un puñado de elementos, la simplicidad a menudo le gana a la optimalidad teórica.

**¿Cuál es la diferencia entre el mejor caso, el caso medio y el peor caso?**
Un algoritmo puede comportarse de forma distinta según la entrada (p. ej., ya ordenada vs aleatoria). Big-O suele citar el peor caso como garantía, pero el caso medio a menudo importa más en la práctica.

**¿Big-O solo trata de velocidad?**
No: también describe el crecimiento de la **memoria** (complejidad espacial). Un algoritmo podría ser rápido pero usar memoria que crece mal con la entrada; ambas dimensiones importan al elegir un enfoque.`,
  },
  {
    topicKey: 'what-is-caching',
    title: '¿Qué es el caché y por qué está en todas partes?',
    question: '¿Qué es el caché, cómo funciona y por qué es tan importante para el rendimiento?',
    summary:
      'Un caché guarda copias de datos donde es más rápido alcanzarlos, de modo que las peticiones repetidas se saltan la lenta fuente original. Es uno de los trucos de velocidad más potentes de la computación —usado en cada capa— y su problema más difícil es saber cuándo la copia está obsoleta.',
    tags: ['programación', 'caché', 'rendimiento', 'sistemas'],
    language: 'es',
    image: {
      prompt: promptOf('what-is-caching'),
      alt: 'Un objeto necesario en un estante cercano por un camino corto frente a un camino largo a un almacén lejano',
    },
    sources: [
      { title: 'MDN — Caché de HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching' },
      { title: 'Cloudflare — qué es el caché', url: 'https://www.cloudflare.com/learning/cdn/what-is-caching/' },
    ],
    content: `# ¿Qué es el caché y por qué está en todas partes?

Un caché es un alijo de copias guardadas en algún lugar rápido, para que no tengas que ir a buscar a algún lugar lento cada vez. El principio es intuitivo: si recurres constantemente al mismo libro, lo dejas en tu escritorio en vez de caminar a la biblioteca cada vez. En computación, "la biblioteca" podría ser una base de datos, un servidor lejano o un disco lento, y "tu escritorio" es memoria más rápida que tienes cerca. El caché es una de las **técnicas de rendimiento más universales de toda la computación** —presente en prácticamente cada capa— porque las diferencias de velocidad entre el almacenamiento rápido y el lento son enormes, y la mayoría de los sistemas piden las mismas cosas una y otra vez.

## Por qué funciona tan bien

Dos hechos hacen que el caché rinda enormemente. Primero, **las diferencias de velocidad son enormes**: leer de memoria puede ser miles de veces más rápido que de disco o a través de una red. Segundo, **el acceso es repetitivo**: los programas y los usuarios tienden a querer los mismos datos una y otra vez (el video popular, el perfil del usuario que inició sesión, la página de inicio). Mantén cerca los elementos que se piden con frecuencia y la inmensa mayoría de las peticiones se atenderán rápido, pagando solo de vez en cuando el camino lento. Incluso cachear una pequeña fracción de los datos "calientes" puede atender la mayor parte del tráfico.

## El caché está en cada capa

Estás rodeado de cachés trabajando de forma invisible:

| Caché | Qué acelera |
| --- | --- |
| Caché de CPU | Que el procesador alcance datos más rápido que la memoria principal |
| Caché del navegador | Recargar sitios sin volver a descargar imágenes/scripts |
| CDN (red de distribución de contenidos) | Servir el contenido del sitio desde un servidor cercano a ti, no al otro lado del mundo |
| Caché de aplicación/en memoria (p. ej. Redis) | Evitar consultas repetidas a la base de datos |
| Caché de base de datos | Reutilizar resultados de consultas recientes |
| Caché de DNS | Saltarse búsquedas repetidas de direcciones |

Una sola carga de página podría beneficiarse de media docena de cachés apilados juntos, y por eso la segunda visita a un sitio es mucho más rápida que la primera.

## La parte difícil: saber cuándo una copia está obsoleta

La famosa dificultad del caché no es guardar copias, sino saber **cuándo una copia está desactualizada.** Si los datos originales cambian pero el caché sigue sirviendo la copia antigua, los usuarios ven información incorrecta (un precio que ya cambió, un perfil que se ha actualizado). Esto es la "invalidación de caché", la mitad de un famoso chiste de programación sobre los dos problemas más difíciles de las ciencias de la computación. Los sistemas lo gestionan con estrategias como la **expiración** (las copias viven un tiempo fijado y luego se refrescan), la **invalidación** (borrar activamente la copia cuando la fuente cambia) y aceptar la **consistencia eventual** (tolerar una breve obsolescencia a cambio de velocidad). Decidir cuán frescos deben ser los datos —frente a cuán rápidos— es el compromiso central del caché.

## Preguntas frecuentes

**¿Por qué no cachear simplemente todo para siempre?**
Porque los datos cambian, y las copias obsoletas causan errores; además, los cachés tienen espacio limitado, así que desalojan los elementos menos usados. El caché cambia la frescura perfecta por velocidad: cacheas lo que es seguro que esté un poco viejo.

**¿Qué arregla "borrar el caché"?**
Fuerza copias frescas desde la fuente. Cuando un sitio se ve roto o desactualizado, tu navegador podría estar mostrando archivos en caché obsoletos; borrarlo hace que vuelva a obtener las versiones actuales.

**¿El caché puede causar errores?**
Sí: servir datos obsoletos es el clásico. Una sorprendente proporción de los problemas de "¡no se actualiza!" son cachés que retienen copias antiguas en algún punto de la cadena. Potente, pero una fuente real de problemas sutiles.`,
  },
];
