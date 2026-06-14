import type { DraftArticle } from './types';
import { digitalSecurityEn } from './digital-security.en';

// Batch: Privacidad y seguridad digital (versión nativa en español). Mismos
// títulos y mismo topicKey que digital-security.en.ts; el contenido está
// redactado de forma nativa para lectores hispanohablantes. Las imágenes se
// comparten con las variantes en inglés.

const promptOf = (key: string): string => {
  const hit = digitalSecurityEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const digitalSecurityEs: DraftArticle[] = [
  {
    topicKey: 'password-managers',
    title: '¿Por qué deberías usar un gestor de contraseñas?',
    question: '¿Qué es un gestor de contraseñas y de verdad es más seguro que memorizar mis contraseñas?',
    summary:
      'Un gestor de contraseñas genera y guarda una contraseña fuerte y única para cada cuenta detrás de una sola contraseña maestra, así una filtración en un sitio no abre los demás. Es el hábito de seguridad de mayor impacto para casi todo el mundo.',
    tags: ['seguridad', 'privacidad', 'contraseñas', 'seguridad digital'],
    language: 'es',
    image: {
      prompt: promptOf('password-managers'),
      alt: 'Una llave maestra abriendo una bóveda con cientos de llaves distintas',
    },
    sources: [
      { title: 'NIST — Guía de identidad digital (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Usa contraseñas fuertes / gestores de contraseñas', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# ¿Por qué deberías usar un gestor de contraseñas?

El problema de fondo que resuelve un gestor de contraseñas es la **reutilización**. Ningún ser humano puede memorizar cien contraseñas fuertes distintas, así que la gente reutiliza un puñado de ellas, y eso significa que en cuanto cualquier sitio sufre una filtración, los atacantes toman ese par de correo y contraseña y lo prueban en tu banco, tu correo y todas partes. Este ataque automatizado (llamado relleno de credenciales o credential stuffing) es una de las formas más habituales de que roben una cuenta. Un gestor de contraseñas lo corta de raíz dándole a cada cuenta su propia contraseña única y aleatoria.

## Cómo funciona

Un gestor de contraseñas es una bóveda cifrada. Tú recuerdas exactamente **una** contraseña maestra fuerte; él recuerda todo lo demás:

- **Genera** contraseñas largas y aleatorias (p. ej. \`v8#mQ2!pLx9$\`) que nunca tienes que teclear ni recordar.
- **Las guarda** cifradas, bloqueadas con tu contraseña maestra.
- **Las autocompleta** en el sitio correcto, lo que de paso resiste el phishing, porque no rellenará tu contraseña real del banco en un dominio falso que se le parezca.

La bóveda está cifrada de modo que ni siquiera la empresa que ofrece el gestor puede leer tus contraseñas, una propiedad llamada conocimiento cero (zero-knowledge). Tu contraseña maestra nunca sale de tu dispositivo de forma utilizable.

## La objeción, respondida

La preocupación instintiva es: "¿no es peligroso poner todas mis contraseñas en un solo sitio?". Suena arriesgado, pero las cuentas salen al revés:

| Sin gestor | Con gestor |
| --- | --- |
| Pocas contraseñas, muy reutilizadas | Una contraseña única por sitio |
| Una filtración → caen muchas cuentas | Una filtración → una cuenta, contenida |
| Elecciones débiles y memorizables | Elecciones largas, aleatorias, indescifrables |
| Contraseñas tecleadas en sitios de phishing | El autocompletado rechaza dominios erróneos |

Sí, la contraseña maestra es un único punto de fallo, así que proteges *esa* a fondo (una frase de contraseña larga, más doble factor en el propio gestor) y aceptas que defender un secreto con ferocidad supera a defender cien mal.

## Cómo elegir y empezar

Los gestores con buena reputación, tanto servicios en la nube bien valorados como opciones de código abierto o sin conexión respetadas, son todos drásticamente mejores que reutilizar. Consejos prácticos:

- **Contraseña maestra**: que sea una frase larga de palabras aleatorias, única, jamás usada en ningún otro sitio. Esta es la que de verdad memorizas.
- **Activa el doble factor** para la propia cuenta del gestor.
- **Migra de forma gradual**: deja que importe tus contraseñas actuales y luego cambia primero las reutilizadas en las cuentas importantes (correo, banca, tienda principal).
- **Incluso el integrado en el navegador** supera a reutilizar; lo que importa es usar contraseñas únicas en todas partes, no la marca concreta.

## Preguntas frecuentes

**¿Y si olvido mi contraseña maestra?**
Con cifrado de conocimiento cero de verdad, el proveedor normalmente no puede recuperarla; ese es justo el sentido. Configura las opciones de recuperación del gestor (kit de emergencia, código de recuperación) al empezar y guárdalas sin conexión.

**¿Es seguro el sincronizado en la nube?**
La bóveda se sincroniza ya cifrada, así que el servidor de sincronización solo guarda un bloque ilegible. Lo que la protege es el cifrado, no la red.

**¿Bastan las contraseñas guardadas en el navegador?**
Son muchísimo mejores que reutilizar y suficientes para mucha gente. Los gestores dedicados añaden uso entre navegadores, compartición segura, alertas de filtraciones y mejor aislamiento; merecen la pena a medida que crece tu lista de cuentas.`,
  },
  {
    topicKey: 'two-factor-auth',
    title: 'Verificación en dos pasos: ¿qué tipo es realmente seguro?',
    question: '¿Qué es la verificación en dos pasos y por qué el SMS es la versión más débil?',
    summary:
      'La verificación en dos pasos añade una segunda prueba además de tu contraseña, así una contraseña robada no basta. Pero los tipos no son iguales: los códigos por SMS se pueden interceptar o robar con un cambio de SIM, mientras que las apps de autenticación y las llaves físicas son mucho más fuertes.',
    tags: ['seguridad', '2fa', 'autenticación', 'seguridad digital'],
    language: 'es',
    image: {
      prompt: promptOf('two-factor-auth'),
      alt: 'Una puerta que exige una llave y un token giratorio independiente',
    },
    sources: [
      { title: 'NIST — Guía de identidad digital (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Más que una contraseña (autenticación multifactor)', url: 'https://www.cisa.gov/MFA' },
    ],
    content: `# Verificación en dos pasos: ¿qué tipo es realmente seguro?

La verificación en dos pasos (2FA, o de forma más amplia MFA) significa que para iniciar sesión hacen falta **dos tipos distintos de prueba**: algo que *sabes* (tu contraseña) más algo que *tienes* (un código, una app, una llave física). El objetivo es la resiliencia: aunque un atacante robe tu contraseña con una filtración o un phishing, sigue sin poder entrar sin el segundo factor. Activarla es una de las cosas más eficaces que puedes hacer. Pero el segundo factor viene en varias formas, y desde luego no son iguales en fortaleza.

## La escalera, de más débil a más fuerte

| Método | Cómo funciona | Debilidad |
| --- | --- | --- |
| **Código por SMS** | Un código enviado a tu móvil por mensaje | Cambio de SIM, interceptación de red, susceptible a phishing |
| **App de autenticación** | La app genera un código de 6 dígitos que rota cada 30 s | Susceptible a phishing si lo tecleas en un sitio falso |
| **Aprobación por notificación** | Aviso de "¿Aprobar este inicio de sesión?" en tu móvil | Ataques de "fatiga": acoso hasta que pulsas que sí |
| **Llave de seguridad física / passkey** | Llave física o credencial ligada al dispositivo, atada criptográficamente al sitio real | Resiste el phishing por diseño |

Todo lo de esta lista supera a usar solo contraseña. Pero los peldaños importan.

## Por qué el SMS es el peldaño débil

Los códigos por mensaje fueron el primer 2FA masivo y siguen siendo comunes, pero tienen debilidades reales y explotadas:

- **Cambio de SIM (SIM swapping)**: un atacante convence (o soborna) a tu operadora para pasar tu número a su SIM, y tus códigos pasan a llegar a *su* teléfono. Es una forma documentada y repetida de vaciar cuentas de alto valor.
- **Interceptación**: la señalización de la red telefónica subyacente tiene fallos conocidos que pueden desviar los mensajes.
- **Sigue siendo susceptible a phishing**: una página de inicio de sesión falsa puede pedirte el código por SMS sin más y retransmitirlo en tiempo real.

El veredicto honesto: **el 2FA por SMS es mucho mejor que nada**, mantenlo donde sea la única opción, pero sube las cuentas importantes (correo, finanzas, identidad principal) por la escalera.

## Qué usar de verdad

- **Por defecto, una app de autenticación** (códigos rotatorios): gratis, fácil, inmune al cambio de SIM y compatible casi en todas partes.
- **Para tus cuentas más críticas, usa una llave física o una passkey**: son *resistentes al phishing*, porque la credencial está atada criptográficamente al sitio web genuino, así que sencillamente no se autentica ante un dominio que se le parezca, derrotando el ataque que vence a todo método basado en códigos.
- **Protege primero tu correo.** Es la llave maestra: los restablecimientos de contraseña de todo lo demás pasan por él, así que merece tu factor más fuerte.

## Preguntas frecuentes

**¿Cualquier 2FA es mejor que ninguno?**
Sí, sin duda. Hasta el SMS bloquea la inmensa mayoría de ataques automatizados. No dejes que el "el SMS es débil" te convenza de no activarlo donde es lo único que se ofrece.

**¿Qué pasa si pierdo el móvil o la llave?**
Guarda los códigos de respaldo o recuperación que ofrece cada servicio al darte de alta y registra un segundo factor (una llave de reserva, o la app en un segundo dispositivo). Guarda los códigos de recuperación sin conexión.

**¿Son seguras las notificaciones de "aprobar"?**
Buenas, pero vulnerables a ataques de fatiga: avisos sin fin con la esperanza de que pulses "aprobar" para que paren. Nunca apruebes un inicio de sesión que no hayas iniciado tú; prefiere los avisos con coincidencia de números donde se ofrezcan.`,
  },
  {
    topicKey: 'passkeys',
    title: '¿Qué son las passkeys y están reemplazando a las contraseñas?',
    question: '¿Qué es una passkey y en qué se diferencia de una contraseña?',
    summary:
      'Una passkey sustituye la contraseña por un par de claves criptográficas repartido entre el sitio web y tu dispositivo: no se teclea ni se comparte nada secreto, así que no hay nada que robar por phishing, reutilizar ni sustraer en una filtración. Es el sucesor de las contraseñas según la industria.',
    tags: ['seguridad', 'passkeys', 'autenticación', 'contraseñas'],
    language: 'es',
    image: {
      prompt: promptOf('passkeys'),
      alt: 'Dos mitades de llave que prueban encajar sin llegar a tocarse',
    },
    sources: [
      { title: 'FIDO Alliance — Introducción a las passkeys', url: 'https://fidoalliance.org/passkeys/' },
      { title: 'NIST — Guía de identidad digital (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
    ],
    content: `# ¿Qué son las passkeys y están reemplazando a las contraseñas?

Una passkey es una credencial de inicio de sesión diseñada para corregir los dos pecados originales de la contraseña: las contraseñas son **secretos compartidos** (tú y el sitio conocéis la misma cadena, así que se puede robar desde cualquiera de los dos lados) y se **teclean** (así que se pueden robar por phishing o reutilizar). Una passkey no es ni compartida ni tecleada. Se basa en criptografía de clave pública, y en cuanto entiendes la división en dos partes, las ventajas de seguridad son evidentes.

## La idea del par de claves, en pocas palabras

Cuando creas una passkey, tu dispositivo genera un **par** de claves vinculadas matemáticamente:

- Una **clave privada** que nunca sale de tu dispositivo (móvil, portátil o llave de seguridad), protegida por tu huella, tu cara o el PIN del dispositivo.
- Una **clave pública** que se le entrega al sitio web.

La clave pública no es un secreto: no se puede usar para suplantarte. Para iniciar sesión, el sitio envía un reto; tu dispositivo demuestra que posee la clave privada que coincide *sin revelarla jamás*. Nada secreto cruza la red, y en el servidor nunca se guarda nada reutilizable.

## Por qué esto derrota los ataques habituales

| Ataque | Contra contraseñas | Contra passkeys |
| --- | --- | --- |
| Filtración de base de datos | Roba contraseñas (con hash) | Solo roba claves públicas: inútiles para los atacantes |
| Phishing | El sitio falso captura lo que tecleas | No hay nada que teclear; la clave está atada al dominio real |
| Reutilización | Una filtración abre muchos sitios | Cada passkey es única y propia de un sitio por diseño |
| Relleno de credenciales | Funciona en masa | No hay nada que rellenar |

La resistencia al phishing es el titular. Una passkey está atada criptográficamente a la identidad del sitio web genuino, así que un dominio que se le parezca literalmente no puede activarla, cerrando la brecha que dejan abierta incluso los códigos de las apps de autenticación.

## Cómo usarlas hoy

En la práctica, una passkey suele sentirse como **desbloquear el móvil**: aparece un aviso, confirmas con la huella o la cara y ya estás dentro; sin contraseña, sin código que copiar. Las passkeys suelen sincronizarse a través del ecosistema de tu dispositivo (así un móvil nuevo las conserva) o residen en una llave de seguridad física para la máxima garantía. La adopción es amplia y crece en las principales plataformas y grandes sitios web, aunque está a mitad de transición: la mayoría de los sitios que ofrecen passkeys aún mantienen las contraseñas como alternativa.

## Preguntas frecuentes

**¿Y si pierdo mi dispositivo?**
Las passkeys sincronizadas se recuperan a través de tu cuenta de la plataforma en un dispositivo nuevo (protegida por su propia seguridad fuerte). Para las claves ligadas al dispositivo, registra una segunda passkey o conserva un método de respaldo, la misma disciplina que la recuperación del 2FA.

**¿Una empresa con una filtración puede filtrar mi passkey?**
No: el servidor solo guarda tu clave pública, que no es un secreto y no puede iniciar sesión como tú. Esta es la ventaja estructural frente a las bases de datos de contraseñas.

**¿Sigo necesitando un gestor de contraseñas?**
Por ahora sí: las passkeys se están desplegando poco a poco, así que durante años tendrás una mezcla. Muchos gestores de contraseñas ya guardan passkeys también, convirtiéndose en una bóveda unificada para ambas.`,
  },
  {
    topicKey: 'phishing-scams',
    title: 'Cómo reconocer el phishing y las estafas en línea',
    question: '¿Cómo puedo reconocer un correo de phishing o un mensaje de estafa antes de que me engañe?',
    summary:
      'El phishing fabrica urgencia para que actúes antes de pensar: una alerta falsa, una oferta demasiado buena, un enlace de "verifica ahora". Las defensas son hábitos, no aparatos: ve más despacio, comprueba el remitente y el enlace reales, y nunca te conectes desde el enlace de un mensaje.',
    tags: ['seguridad', 'phishing', 'estafas', 'seguridad digital'],
    language: 'es',
    image: {
      prompt: promptOf('phishing-scams'),
      alt: 'Un anzuelo disfrazado se acerca a un pez que se detiene en un anillo protector',
    },
    sources: [
      { title: 'CISA — Reconoce y denuncia el phishing', url: 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing' },
      { title: 'FTC — Cómo reconocer y evitar las estafas de phishing', url: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams' },
    ],
    content: `# Cómo reconocer el phishing y las estafas en línea

El phishing es un timo de confianza con disfraz técnico. El atacante no rompe tu cifrado: consigue que *tú* entregues una contraseña, un código o dinero, suplantando a alguien en quien confías y creando un momento en el que actúas por emoción en lugar de por juicio. Como apunta a los reflejos humanos, la defensa también es humana: unos pocos hábitos que rompen el truco de forma fiable. El más útil de todos es reconocer la emoción que te están fabricando.

## La señal universal: la urgencia fabricada

Casi toda estafa necesita que actúes *rápido*, antes de que la parte pensante de tu cerebro se ponga al día. Las palancas emocionales son una lista corta:

- **Miedo**: "Tu cuenta será suspendida", "se ha detectado un inicio de sesión sospechoso", "impuesto impagado: actúa ya".
- **Codicia**: "Has ganado", "reclama tu reembolso", "inversión que se duplica cada semana".
- **Autoridad**: un mensaje "de" tu banco, tu jefe, una empresa de paquetería o el Gobierno.
- **Curiosidad o ganas de ayudar**: "¿Eres tú en esta foto?", "Necesito un favor rápido".

Cuando un mensaje te acelera el pulso y te empuja a hacer clic, pagar o compartir *de inmediato*, esa presión en sí misma es la señal de alerta: las organizaciones legítimas no funcionan con "responde en los próximos 10 minutos o si no...".

## Las comprobaciones concretas

| Comprobación | Qué mirar |
| --- | --- |
| **Dirección del remitente** | Pásale el cursor o despliégala: \`service@paypa1.com\` ≠ \`paypal.com\`. Los nombres mostrados mienten. |
| **El enlace real** | Pasa el cursor (no hagas clic) para ver el destino real; busca dominios que se parezcan |
| **Saludo genérico** | "Estimado cliente" de una empresa que conoce tu nombre |
| **Adjuntos inesperados** | Facturas o recibos que no esperabas: una entrega de malware clásica |
| **Petición de secretos** | Las instituciones reales nunca piden tu contraseña, el PIN completo ni un código 2FA |
| **Presión + secretismo** | "No se lo digas a nadie", "transferencia urgente", pago con tarjetas regalo: todas, banderas rojas enormes |

## Las dos reglas que evitan casi todas las pérdidas

1. **Nunca inicies sesión desde un enlace de un mensaje.** Si un correo dice que hay un problema con una cuenta, no hagas clic: abre una pestaña nueva y teclea tú mismo la dirección (o usa tu marcador o app). Solo este hábito derrota la mayoría del phishing de credenciales, porque el sitio falso nunca tiene su oportunidad.

2. **Verifica por otro canal cualquier cosa que implique dinero o secretos.** El "jefe" que pide una transferencia o tarjetas regalo, el "banco" que te pide "mover el dinero a una cuenta segura", un familiar en apuros repentinos: párate y confirma por un canal *aparte y conocido* (llama al número oficial, no al del mensaje). Urgencia más un método de pago inusual es la firma de una estafa.

## Preguntas frecuentes

**El mensaje parece perfecto: logotipo, formato, mi nombre. ¿Aun así está bien dudar?**
Sí. Los visuales convincentes son triviales de copiar, y los datos personales se filtran en las brechas. Juzga por la *petición* (urgencia, secretos, pago) y verifica de forma independiente, no por lo pulido que se vea.

**Hice clic en un enlace / introduje mi contraseña. ¿Y ahora qué?**
Actúa rápido: cambia esa contraseña (y donde la hayas reutilizado) desde un dispositivo de confianza, activa el 2FA, vigila la actividad no autorizada y contacta con la institución real. La velocidad limita el daño.

**¿Las llamadas y los mensajes de texto también son phishing?**
Sí: el "vishing" (voz) y el "smishing" (SMS) usan el mismo guion, y la clonación de voz con IA hace que las llamadas sean más convincentes. La regla se mantiene: cuelga y devuelve la llamada a un número oficial que hayas buscado tú mismo.`,
  },
  {
    topicKey: 'vpn-explained',
    title: 'Qué hace realmente una VPN (y qué no hace)',
    question: '¿Qué protege de verdad una VPN y realmente necesito una?',
    summary:
      'Una VPN cifra tu tráfico hacia un servidor que oculta tu dirección IP y te protege en redes no fiables. No es anonimato ni seguridad totales: HTTPS ya protege la mayoría de los datos, y una VPN traslada tu confianza al proveedor de la VPN en vez de eliminarla.',
    tags: ['seguridad', 'privacidad', 'vpn', 'redes'],
    language: 'es',
    image: {
      prompt: promptOf('vpn-explained'),
      alt: 'Datos que viajan por un túnel sellado que oculta su origen hasta un relé lejano',
    },
    sources: [
      { title: 'EFF — Autodefensa contra la vigilancia: VPN', url: 'https://ssd.eff.org/module/choosing-vpn-thats-right-you' },
      { title: 'CISA — Orientación sobre conexiones seguras', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# Qué hace realmente una VPN (y qué no hace)

Una VPN (red privada virtual) construye un túnel cifrado desde tu dispositivo hasta un servidor gestionado por el proveedor de la VPN; tu tráfico sale a internet desde *ahí*, llevando la dirección IP de ese servidor en lugar de la tuya. Ese es todo el mecanismo, y de él se derivan tanto los beneficios reales como un montón de exageraciones de marketing. Lo más útil que conviene entender es que una VPN **reubica tu confianza**; no elimina la necesidad de ella.

## Lo que sí hace de verdad

- **Oculta tu dirección IP** a los sitios web que visitas: ven la ubicación del servidor VPN, no tu casa ni tu ciudad. Útil para reducir una forma de rastreo y para no exponer tu identidad de red.
- **Cifra el tráfico en la red local**: en una WiFi pública dudosa, la red de la cafetería, el aeropuerto o el hotel (y quien la espíe) solo ve un túnel cifrado, no lo que haces.
- **Oculta tu actividad a tu proveedor de internet**: tu operador ve que estás conectado a una VPN, pero no qué sitios visitas.
- **Cambia tu ubicación aparente**: por eso la gente las usa para acceder a contenido restringido por región (sujeto a los términos de cada servicio).

## Lo que **no** hace

Aquí es donde el marketing exagera:

| Mito | Realidad |
| --- | --- |
| "Una VPN te hace anónimo" | Ni de lejos: los inicios de sesión, las cookies, la huella del navegador y las cuentas te identifican igual |
| "Una VPN te protege de virus o de que te hackeen" | No lo hace: es un túnel, no un antivirus ni un cortafuegos contra el malware |
| "Una VPN cifra todo lo que haces" | La mayoría de los sitios ya van cifrados de extremo a extremo con HTTPS; la VPN protege sobre todo el salto *local* |
| "Una VPN te oculta de todo el mundo" | Tu proveedor de VPN puede ver tu tráfico: has trasladado la confianza a él |

Ese último punto es el crucial. Sin VPN, tu red local y tu operador pueden observar tus conexiones. *Con* una, la empresa de VPN ocupa esa posición en su lugar, así que una VPN solo es tan fiable como quien la opera. Una VPN gratuita que se rentabiliza registrando y vendiendo tu actividad puede ser peor que ninguna.

## ¿La necesitas?

| Situación | Veredicto |
| --- | --- |
| A menudo en WiFi pública o no fiable | Razonable: añade una capa real (aunque HTTPS ya cubre mucho) |
| Quieres ocultar tu navegación a tu operador | Sí, ese es un uso central |
| Acceder a contenido restringido por región | Uso común (atento a los términos de servicio) |
| Buscar anonimato real | Una VPN por sí sola no lo logra |
| Ya solo en redes de confianza, usando HTTPS | Opcional: el beneficio es menor de lo que insinúan los anuncios |

Si la usas, elige un proveedor de pago con buena reputación y una política de no registros clara, idealmente auditada: le estás confiando todo lo que tu operador solía ver.

## Preguntas frecuentes

**¿Una VPN impide que los sitios web me rastreen?**
Solo la parte basada en la IP. Las cookies, los inicios de sesión y la huella del navegador siguen identificándote. El antirrastreo necesita ajustes o extensiones del navegador, no una VPN.

**¿Vale una VPN gratuita?**
Desconfía: mantener servidores cuesta dinero, y algunas VPN gratuitas lo recuperan registrando y vendiendo tus datos, lo contrario del objetivo. Existen capas gratuitas de buena reputación, pero lee la política de privacidad.

**¿Necesito una VPN si los sitios usan HTTPS?**
HTTPS ya cifra de extremo a extremo el contenido de tu tráfico. Una VPN añade ocultar la IP y proteger los metadatos en la red local, pero es una mejora menor de lo que sugieren los anuncios cuando ya estás en HTTPS.`,
  },
  {
    topicKey: 'end-to-end-encryption',
    title: '¿Qué es el cifrado de extremo a extremo?',
    question: '¿Qué significa el cifrado de extremo a extremo y por qué importa en la mensajería?',
    summary:
      'El cifrado de extremo a extremo bloquea un mensaje para que solo el remitente y el destinatario puedan leerlo: ni la red ni siquiera la empresa que opera el servicio. Es la diferencia entre una carta sellada y una postal que todos los que la transportan pueden leer.',
    tags: ['seguridad', 'privacidad', 'cifrado', 'mensajería'],
    language: 'es',
    image: {
      prompt: promptOf('end-to-end-encryption'),
      alt: 'Un mensaje sellado ilegible en tránsito que solo se abre en el dispositivo de destino',
    },
    sources: [
      { title: 'EFF — Autodefensa contra la vigilancia: ¿qué es el cifrado?', url: 'https://ssd.eff.org/module/what-encryption' },
      { title: 'NIST — Normas y directrices criptográficas', url: 'https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines' },
    ],
    content: `# ¿Qué es el cifrado de extremo a extremo?

El cifrado de extremo a extremo (E2EE) significa que un mensaje se cifra en el dispositivo del remitente y solo se puede descifrar en el del destinatario, así que en ningún punto intermedio puede leerlo nadie más. Y, crucialmente, ese "nadie más" incluye a la empresa que opera el servicio. La analogía clásica: un mensaje normal es una **postal** que cada persona que lo manipula por el camino puede leer; un mensaje cifrado de extremo a extremo es una **carta sellada** que solo el destinatario puede abrir. La diferencia está en quién *puede* leer tus conversaciones, no solo en quién *promete* no hacerlo.

## La distinción que de verdad importa

La mayoría de los servicios en línea cifran los datos "en tránsito" (entre tú y sus servidores) y "en reposo" (en su almacenamiento). Eso está bien, pero en ambos casos **la empresa puede seguir leyendo tu contenido**: ella tiene las claves. El cifrado de extremo a extremo es más fuerte: solo los extremos tienen las claves, así que el proveedor es estructuralmente incapaz de leer tus mensajes aunque quisiera, lo hackearan o le ordenaran entregarlos.

| | Cifrado en tránsito/reposo | Cifrado de extremo a extremo |
| --- | --- | --- |
| Protegido de fisgones externos | Sí | Sí |
| Legible por el proveedor del servicio | **Sí** | **No** |
| Expuesto en una filtración del proveedor | Posiblemente | El contenido sigue siendo ilegible |
| Entregado ante un requerimiento legal | Posible | El proveedor no tiene nada legible que dar |

## Cómo funciona, en breve

El E2EE usa la misma idea de clave pública que hay detrás de las passkeys y de HTTPS. Cada usuario tiene una clave pública (compartida libremente) y una clave privada (jamás compartida). Para escribirte, el remitente cifra con *tu* clave pública; solo *tu* clave privada puede descifrarlo. Las claves viven en los dispositivos, no en el servidor, que es justo por lo que el servidor no puede leer el contenido. Las buenas apps de mensajería añaden "confidencialidad hacia adelante" (forward secrecy), rotando claves para que ni siquiera un futuro compromiso de una clave pueda abrir los mensajes pasados.

## Dónde dependes de él

- **Mensajería**: algunas apps van cifradas de extremo a extremo por defecto; otras solo en un modo opcional, o en absoluto. Si la privacidad importa, comprueba cuál.
- **Llamadas**: muchas apps de voz y vídeo ya ofrecen E2EE.
- **Copias de seguridad y nubes**: una brecha sutil. Un chat puede ir con E2EE mientras que su *copia de seguridad en la nube* no, volviendo a hacer legibles los mensajes en silencio. Revisa los ajustes de copia de seguridad.
- **La web**: HTTPS es de extremo a extremo entre tu navegador y el sitio web (aunque el propio sitio, como extremo, lee lo que le envías).

## Preguntas frecuentes

**Si ni la empresa puede leerlo, ¿quién puede?**
Solo quienes tienen los dispositivos en cada extremo. Eso también significa que la seguridad del *dispositivo* importa: el E2EE protege los mensajes en tránsito, no un teléfono que alguien desbloquea. Y los metadatos (con quién hablaste, cuándo) pueden seguir siendo visibles aunque el contenido no lo sea.

**¿El E2EE ayuda a los delincuentes?**
Es el mismo cifrado que protege tu banca, tus historiales médicos, a los periodistas y las conversaciones privadas corrientes: una protección de uso general. El consenso de seguridad mayoritario es que debilitarlo para todos (una "puerta trasera") hace a todo el mundo menos seguro, porque una puerta trasera no se puede limitar a los "buenos".

**¿Cómo sé si una app lo usa de verdad?**
Busca que diga explícitamente "cifrado de extremo a extremo" (no solo "cifrado"), prefiere apps que usen protocolos abiertos bien revisados y comprueba si está activado por defecto o solo en un modo especial.`,
  },
  {
    topicKey: 'public-wifi-safety',
    title: '¿Es realmente peligrosa la WiFi pública?',
    question: '¿Es seguro usar la WiFi pública en cafeterías y aeropuertos, y qué debería evitar?',
    summary:
      'La WiFi pública es mucho más segura que antes porque casi todos los sitios web usan ya HTTPS, que cifra tus datos sea cual sea la red. Los riesgos reales que quedan son los puntos de acceso falsos y las conexiones sin cifrar, manejables con unos pocos hábitos.',
    tags: ['seguridad', 'privacidad', 'wifi', 'seguridad digital'],
    language: 'es',
    image: {
      prompt: promptOf('public-wifi-safety'),
      alt: 'Un portátil envía datos ya sellados por WiFi pública junto a un punto de acceso falso al acecho',
    },
    sources: [
      { title: 'FTC — ¿Son seguras las redes WiFi públicas?', url: 'https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-not-always' },
      { title: 'EFF — HTTPS y autodefensa contra la vigilancia', url: 'https://ssd.eff.org/module/what-should-i-know-about-encryption' },
    ],
    content: `# ¿Es realmente peligrosa la WiFi pública?

La WiFi pública tiene una fama aterradora que está, en su mayor parte, **desfasada**. Las viejas advertencias vienen de una época en que los sitios web enviaban los datos en claro, así que cualquiera en la misma red de la cafetería podía "olfatear" tus contraseñas del aire. Esa época terminó en gran medida: hoy la inmensa mayoría de los sitios web usan **HTTPS**, que cifra tu conexión de extremo a extremo entre tu navegador y el sitio, en cualquier red, fiable o no. El candado de tu barra de direcciones hace casi todo el trabajo de protección que las advertencias alarmistas atribuyen a una VPN.

## Por qué HTTPS cambió el panorama

Cuando te conectas a un sitio HTTPS, tu tráfico se cifra *antes* de salir de tu dispositivo, así que un fisgón en la misma WiFi solo ve datos revueltos y qué sitio visitas, no tu contraseña, tus mensajes ni el número de tu tarjeta. Como los navegadores modernos marcan ahora los sitios sin HTTPS como "No seguro" y casi toda la web ha migrado, el clásico ataque de "robar la contraseña en la cafetería" es mucho más difícil que antes.

## Los riesgos que quedan

La WiFi pública no es de riesgo *cero*, eso sí: las amenazas reales se desplazaron.

| Riesgo | Qué es | Defensa |
| --- | --- | --- |
| **Punto de acceso gemelo malicioso** | Una red falsa llamada "Aeropuerto_WiFi_Gratis" gestionada por un atacante | Confirma el nombre real de la red; no te unas automáticamente a desconocidas |
| **Sitios sin HTTPS** | El raro sitio que aún envía datos en texto claro | Atento al aviso "No seguro"; no introduzcas secretos ahí |
| **Mirar por encima del hombro** | Alguien que simplemente observa tu pantalla | Filtro de privacidad, atención |
| **Dispositivo desactualizado** | Fallos sin parchear explotables en redes compartidas | Mantén tu sistema y tus apps actualizados |
| **Conexión automática** | El móvil se une en silencio a una red maliciosa de nombre conocido | Desactiva la conexión automática a redes abiertas |

El riesgo estrella es el **gemelo malicioso**: un punto de acceso malicioso con un nombre amigable. Si te conectas a él, el atacante controla tu camino de red, pero aun así HTTPS mantiene ilegibles tus sesiones cifradas; el peligro está sobre todo en cualquier tráfico sin HTTPS y en que te atraigan a páginas de inicio de sesión falsas.

## Hábitos sensatos (sin paranoia)

- **Confía en el candado de HTTPS** y nunca saltes una advertencia de certificado en WiFi pública: ese aviso es justo cuando algo va mal.
- **Verifica el nombre de la red** con el personal en vez de adivinar; sospecha de redes abiertas que suplantan a una marca.
- **Desactiva la conexión automática** a redes abiertas para que tus dispositivos no se reconecten en silencio a imitaciones.
- **Una VPN añade una capa** al cifrar incluso los metadatos y cualquier tráfico sin HTTPS: un extra razonable en redes no fiables, pero no la necesidad que insinúan los anuncios, dado HTTPS.
- **Mantén los dispositivos actualizados**; casi todos los ataques de red que quedan apuntan a fallos conocidos y ya parcheados.

## Preguntas frecuentes

**¿Alguien puede robar la contraseña de mi banco en la WiFi de una cafetería?**
Si tu banco usa HTTPS (lo hace) y no ignoraste una advertencia de certificado ni caíste en una página de inicio de sesión falsa, tus credenciales van cifradas por el cable. El peligro mayor es el phishing, no el olfateo.

**¿De verdad necesito una VPN para la WiFi pública?**
Es una capa extra razonable, pero HTTPS ya protege el contenido de tu tráfico. Una VPN ayuda sobre todo con el tráfico sin HTTPS y a ocultar a la red local qué sitios visitas.

**¿Los datos móviles de mi teléfono son más seguros que la WiFi pública?**
En general sí: la red celular va cifrada y no compartes una red local con desconocidos. Para tareas sensibles en una red desconocida, pasarte a los datos móviles es una opción simple y sólida.`,
  },
  {
    topicKey: 'online-tracking',
    title: 'Cómo funciona el rastreo en línea (cookies, píxeles y huellas)',
    question: '¿Cómo me rastrean las empresas por toda la web y de verdad puedo impedirlo?',
    summary:
      'Los rastreadores te siguen con cookies, píxeles de seguimiento invisibles y la huella del navegador para construir un perfil entre sitios. No puedes volverte invisible, pero unas pocas decisiones del navegador reducen drásticamente cuánto se recopila.',
    tags: ['privacidad', 'rastreo', 'cookies', 'web'],
    language: 'es',
    image: {
      prompt: promptOf('online-tracking'),
      alt: 'Una figura deja huellas que las lentes lejanas unen, en parte dispersadas por una capa',
    },
    sources: [
      { title: 'EFF — Cover Your Tracks (prueba de huella del navegador)', url: 'https://coveryourtracks.eff.org/' },
      { title: 'FTC — Cómo proteger tu privacidad en línea', url: 'https://consumer.ftc.gov/articles/protecting-your-privacy-online' },
    ],
    content: `# Cómo funciona el rastreo en línea (cookies, píxeles y huellas)

La mayor parte de la web "gratuita" se paga con publicidad, y la publicidad dirigida funciona sabiendo quién eres y qué haces. Así que existe toda una industria dedicada a seguirte de sitio en sitio, cosiendo tu actividad en un perfil. Lo hace mediante tres técnicas principales, cada una más escurridiza que la anterior, y entenderlas es lo que hace que las defensas cobren sentido.

## Las tres técnicas principales

**1. Cookies.** Una cookie es un pequeño archivo que un sitio guarda en tu navegador. Las cookies *de origen* (first-party) son en su mayoría inofensivas y útiles: te mantienen con la sesión iniciada y recuerdan tu carrito. El problema de rastreo son las cookies *de terceros*: cuando muchos sitios distintos incrustan contenido de la misma red publicitaria, esa red deja caer una cookie que reconoce en todas partes, lo que le permite ver que el mismo navegador visitó el sitio A, luego el B, luego el C. Ese rastro entre sitios es el mecanismo de rastreo clásico (y el que los navegadores están eliminando activamente ahora).

**2. Píxeles de seguimiento.** Una imagen invisible de 1×1 (o un fragmento de código) que se carga desde el servidor de un rastreador. El simple hecho de cargarla, en una página web *o en un correo*, le dice al rastreador que la abriste, cuándo y detalles sobre tu dispositivo. Así es como los anunciantes saben que abriste su correo o visitaste una página, sin ninguna cookie.

**3. Huella del navegador (fingerprinting).** La más astuta. En lugar de guardar nada en tu dispositivo, un sitio *mide* la combinación única de rasgos de tu dispositivo (tamaño de pantalla, fuentes, sistema operativo, versión del navegador, zona horaria, peculiaridades gráficas) que, juntos, suelen ser lo bastante únicos como para volver a identificarte. Como no guarda nada, borrar las cookies no la elimina.

| Técnica | ¿Guarda algo? | ¿Se vence borrando cookies? |
| --- | --- | --- |
| Cookies de terceros | Sí | Sí |
| Píxeles de seguimiento | Usa cookies/registros del servidor | En parte |
| Huella del navegador | No | **No** |

## Qué reduce de verdad el rastreo

No puedes ser invisible, pero sí puedes reducir mucho tu exposición:

- **Usa un navegador respetuoso con la privacidad o activa la protección contra el rastreo**: los navegadores modernos bloquean las cookies de terceros y los rastreadores conocidos por defecto o con un solo ajuste.
- **Añade un bloqueador de contenido o de anuncios con buena reputación**: bloquea los scripts y píxeles de rastreo antes de que se carguen, lo que además acelera las páginas.
- **Bloquea las imágenes remotas en el correo** para derrotar los píxeles de apertura (la mayoría de las apps de correo lo ofrecen).
- **Resiste la huella** con navegadores que estandarizan o aleatorizan tu huella; este es el rastreo más difícil de detener, por eso importa quién hace tu navegador.
- **Reduce el perfil en la fuente**: limita la personalización de anuncios en los ajustes de tu cuenta y sé moderado con los inicios de sesión que atan tu actividad a una identidad real.

## Preguntas frecuentes

**¿Esos avisos de "Aceptar cookies" me protegen de verdad?**
Son avisos de consentimiento (impulsados por leyes de privacidad), no protección. "Rechazar las no esenciales" ayuda, pero la reducción real viene de los ajustes del navegador y los bloqueadores, no de pulsar avisos.

**¿El modo privado o de incógnito detiene el rastreo?**
En su mayoría no. Evita que *tu navegador* guarde el historial local y las cookies tras la sesión, pero los sitios, los rastreadores y tu red pueden seguir observándote durante ella, y la huella del navegador sigue funcionando.

**¿La huella del navegador es realmente imparable?**
No imparable, pero difícil: la defensa es usar un navegador que deliberadamente hace que la huella de todos se parezca (para que la tuya no destaque). Prueba la tuya en Cover Your Tracks de la EFF.`,
  },
  {
    topicKey: 'data-breach-response',
    title: 'Qué hacer cuando tus datos están en una filtración',
    question: 'Una empresa que uso sufrió una filtración de datos: ¿qué debería hacer realmente al respecto?',
    summary:
      'Cuando una filtración expone tus datos, la prioridad es contener la reutilización: cambia esa contraseña en todos los sitios donde la usaras, activa la verificación en dos pasos y vigila el phishing posterior. Qué hacer depende de qué se filtró: una contraseña, una tarjeta o tus datos de identidad.',
    tags: ['seguridad', 'privacidad', 'filtración de datos', 'seguridad digital'],
    language: 'es',
    image: {
      prompt: promptOf('data-breach-response'),
      alt: 'Una pequeña fuga en una bóveda contenida con método entre las bóvedas cercanas',
    },
    sources: [
      { title: 'FTC — Filtración de datos: qué hacer', url: 'https://www.identitytheft.gov/databreach' },
      { title: 'Have I Been Pwned — comprueba si tus cuentas aparecieron en filtraciones', url: 'https://haveibeenpwned.com/' },
    ],
    content: `# Qué hacer cuando tus datos están en una filtración

Las filtraciones de datos son ya rutina: si llevas años usando internet, tu información casi con certeza ha aparecido en alguna. Suena alarmante, pero la mayoría de las filtraciones se superan con una respuesta calmada y dirigida. La clave es ajustar tu acción a **qué se filtró realmente**, porque una contraseña filtrada, un número de tarjeta filtrado y unos datos de identidad filtrados piden movimientos distintos. El pánico y la inacción son los dos modos de fallo; una lista corta los supera a ambos.

## Primero: averigua qué quedó expuesto

Las notificaciones de filtración (y los servicios que las rastrean) suelen indicar qué datos estuvieron implicados. La escalera de gravedad, a grandes rasgos:

| Qué se filtró | Gravedad | Por qué |
| --- | --- | --- |
| Solo la dirección de correo | Baja | Sobre todo significa más spam/phishing |
| Contraseña (aunque tenga hash) | Alta | La reutilización pone en riesgo muchas cuentas |
| Tarjeta de pago | Media | Los bancos revierten el fraude; las tarjetas son reemplazables |
| Datos de identidad (números de documento, fecha de nacimiento, domicilio) | Alta | Permite la suplantación de identidad; no se puede "restablecer" |

## La respuesta, según lo que se filtró

**Si se filtró una contraseña** (el caso urgente más común):
1. **Cámbiala de inmediato en el sitio afectado.**
2. **Cámbiala en todos los sitios donde la reutilizaras**: ese es el peligro real, porque los atacantes probarán ese par de correo y contraseña en bancos, correos y tiendas (relleno de credenciales). Un gestor de contraseñas hace esto mucho menos doloroso y previene el siguiente caso.
3. **Activa la verificación en dos pasos** en esa cuenta y en las importantes.

**Si se filtró una tarjeta de pago:** vigila tus extractos, denuncia cualquier cargo desconocido (los bancos suelen revertir el fraude) y deja que el banco reexpida la tarjeta si hace falta. Es el tipo de filtración más recuperable.

**Si se filtraron datos de identidad** (lo más complicado, porque no puedes cambiar tu fecha de nacimiento): considera un bloqueo de crédito o una alerta de fraude con las agencias de crédito donde sea posible, vigila las cuentas abiertas a tu nombre y desconfía mucho de los contactos que mencionen tus datos reales.

## Después: prepárate para la segunda oleada

El riesgo posterior infravalorado es el **phishing dirigido**. Tras una filtración, los delincuentes saben qué empresa usas y algunos de tus datos reales, así que envían mensajes convincentes del tipo "[Empresa]: alerta de seguridad, verifica tu cuenta". Cuenta con que llegarán y aplica la regla de siempre: nunca inicies sesión desde un enlace de un mensaje; ve al sitio directamente. Una filtración te convierte en blanco marcado durante un tiempo.

## Preguntas frecuentes

**¿Cómo sé siquiera si estoy en una filtración?**
A menudo las empresas están obligadas por ley a notificártelo, pero vale la pena comprobar un servicio de consulta de filtraciones con buena reputación (como Have I Been Pwned) con tu correo, y activar las alertas de filtraciones de tu gestor de contraseñas.

**La filtración fue hace años, ¿aún tengo que actuar?**
Si desde entonces hiciste única esa contraseña y activaste el 2FA, estás cubierto en gran medida. Si *todavía* reutilizas esa contraseña en algún sitio, cámbiala ahora: las contraseñas viejas filtradas se prueban durante años.

**¿Debería pagar por servicios de protección de identidad?**
A menudo las protecciones básicas (bloqueo de crédito, vigilar tus propios extractos, contraseñas únicas + 2FA) son gratuitas y hacen casi todo el trabajo. Los servicios de pago pueden añadir comodidad, pero no sustituyen lo fundamental.`,
  },
];
