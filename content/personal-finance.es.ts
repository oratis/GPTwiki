import type { DraftArticle } from './types';
import { personalFinanceEn } from './personal-finance.en';

// Batch: Personal Finance (versión nativa en español). Mismo título y mismo
// topicKey que personal-finance.en.ts; el contenido está redactado de forma
// nativa para el lector hispanohablante (ejemplos en euros, conceptos
// institucionales mantenidos genéricos, sin atar la fiscalidad ni las cuentas
// de jubilación a un único país). Las imágenes se comparten por topicKey.

const promptOf = (key: string): string => {
  const hit = personalFinanceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

const NOTE =
  '\n\n*Este artículo es educación financiera general, no asesoramiento financiero personalizado.*';

export const personalFinanceEs: DraftArticle[] = [
  {
    topicKey: 'compound-interest',
    title: 'Cómo funciona realmente el interés compuesto',
    question: '¿Cómo funciona el interés compuesto y por qué se dice que es tan poderoso?',
    summary:
      'El interés compuesto genera rendimiento sobre el rendimiento: el dinero crece de forma exponencial, no lineal. El tiempo importa más que la tasa: la curva es suave durante años y luego se dispara, por eso empezar pronto gana.',
    tags: ['finanzas', 'inversión', 'interés compuesto', 'ahorro'],
    language: 'es',
    image: {
      prompt: promptOf('compound-interest'),
      alt: 'Una semilla de luz que crece hasta formar un árbol exponencial de ramas luminosas',
    },
    sources: [
      { title: 'Investor.gov (SEC) — Calculadora de interés compuesto', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Wiki de Bogleheads — Filosofía de inversión y conceptos clave', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Cómo funciona realmente el interés compuesto

El interés compuesto significa que ganas rendimiento no solo sobre el dinero que aportas, sino también sobre el rendimiento que ese dinero ya ha generado. El interés simple crece en línea recta; el compuesto crece en una curva que empieza plana y termina empinada. Casi toda la magia ocurre en los últimos años, y por eso el momento en que empiezas importa más que casi cualquier otra cosa.

## El mecanismo en un ejemplo

Inviertes 10 000 en un activo que renta un 7 % anual:

- **Año 1**: ganas 700 (sobre tus 10 000).
- **Año 2**: ganas 749 — 700 sobre el capital original más 49 sobre la ganancia del año anterior.
- **Año 10**: el saldo ronda los 19 700; solo ese año genera unos 1290.
- **Año 30**: el saldo ronda los 76 000; un solo año genera ya unos 5000 — la mitad de tu aporte inicial, cada año, sin hacer nada.

La fórmula es A = P × (1 + r)^t, pero la intuición es más sencilla: el crecimiento se alimenta del crecimiento previo, así que las ganancias se aceleran.

## La regla del 72

Divide 72 entre tu rendimiento anual para estimar cuántos años tarda el dinero en duplicarse:

| Rendimiento anual | Se duplica aproximadamente cada |
| --- | --- |
| 3 % | 24 años |
| 6 % | 12 años |
| 7 % | ~10 años |
| 10 % | ~7 años |

Las duplicaciones se acumulan: al 7 %, treinta años son unas tres duplicaciones — 1× se convierte en ~8×. La misma aritmética también juega en tu contra: una deuda al 18 % se duplica en unos cuatro años, y una inflación del 3 % reduce a la mitad el poder adquisitivo en unos 24.

## Por qué el tiempo vence a la tasa

Aportando 500 al mes al 7 %:

- Durante **30 años**: ~610 000 (180 000 aportados).
- Durante **40 años**: ~1 310 000 (240 000 aportados).

Diez años iniciales de más — solo 60 000 adicionales aportados — suman unos 700 000, porque el dinero más temprano capitaliza durante más tiempo. Perseguir un punto extra de rendimiento es mucho menos fiable que comprar años extra empezando ahora.

## Qué capitaliza en la vida real

Las cuentas de ahorro capitalizan literalmente; las carteras de acciones capitalizan estadísticamente (el rendimiento varía año a año, pero las ganancias reinvertidas se acumulan unas sobre otras); los dividendos capitalizan cuando se reinvierten. Las comisiones también capitalizan, a la inversa: una comisión anual del 1 % sobre un rendimiento bruto del 7 % se lleva aproximadamente una cuarta parte de tu riqueza final a lo largo de 40 años.

## Preguntas frecuentes

**¿Importa mucho la frecuencia de capitalización (diaria frente a mensual)?**
Mucho menos de lo que se supone — al 5 %, la capitalización diaria frente a la anual difiere en unos 0,13 puntos porcentuales de rendimiento efectivo. La tasa y el tiempo dominan.

**¿De dónde sale el famoso 7 % que tanto se cita?**
Es, a grandes rasgos, el rendimiento histórico a largo plazo ajustado por inflación de los índices bursátiles amplios de EE. UU. Es una media de años muy irregulares, no una promesa.

**¿Es de verdad el interés compuesto "la octava maravilla del mundo" (Einstein)?**
La cita es casi con seguridad apócrifa — las matemáticas son maravilla suficiente sin el respaldo de la celebridad.${NOTE}`,
  },
  {
    topicKey: 'index-funds',
    title: '¿Qué es un fondo indexado y por qué los expertos no dejan de recomendarlo?',
    question: '¿Qué es un fondo indexado y por qué se recomienda tanto al inversor común?',
    summary:
      'Un fondo indexado compra automáticamente todas las acciones de un índice y cobra comisiones casi nulas. Décadas de datos muestran que la gran mayoría de los gestores profesionales no logra batirlo a largo plazo: ese es todo el argumento.',
    tags: ['finanzas', 'inversión', 'fondos indexados', 'inversión pasiva'],
    language: 'es',
    image: {
      prompt: promptOf('index-funds'),
      alt: 'Cientos de cubos luminosos diminutos transportados como una sola cesta',
    },
    sources: [
      { title: 'SPIVA — Comparativas S&P de gestión activa frente a índices', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Wiki de Bogleheads — Cartera de tres fondos', url: 'https://www.bogleheads.org/wiki/Three-fund_portfolio' },
      { title: 'Investor.gov (SEC) — Conceptos básicos de fondos y ETF', url: 'https://www.investor.gov' },
    ],
    content: `# ¿Qué es un fondo indexado y por qué los expertos no dejan de recomendarlo?

Un fondo indexado es un fondo que no intenta elegir ganadores. Simplemente compra todos los valores de un índice de mercado — las ~500 empresas del S&P 500, o los miles de acciones de un índice de mercado total — en proporción a su tamaño, y los mantiene. Sin analistas, sin pronósticos, sin una mesa de operaciones que justifique su sueldo. Suena a rendirse; los datos dicen lo contrario.

## El argumento en tres hechos

**1. Es difícil batir al mercado.** Las comparativas SPIVA, publicadas desde hace más de dos décadas, encuentran una y otra vez que, en ventanas de 15 años, la gran mayoría — a menudo el 80–90 % — de los fondos de gestión activa rinde por debajo de su índice de referencia en los mercados principales. Los profesionales, con equipos a tiempo completo, de media no consiguen superar al índice contra el que se miden.

**2. No puedes saber de antemano quiénes ganarán.** Algunos fondos sí baten al mercado, pero los ganadores rara vez persisten, y el rendimiento pasado es un selector famosamente malo. Elegir al gestor ganador de la próxima década es el mismo problema que elegir la acción ganadora de la próxima década, un nivel más arriba.

**3. Los costes capitalizan en tu contra.** Los fondos indexados cobran ratios de gastos tan bajos como un 0,03–0,2 % anual; los fondos activos suelen cobrar un 0,5–1,5 % más unos costes de negociación internos más altos. Un lastre anual del 1 %, capitalizado durante 40 años, se lleva aproximadamente una cuarta parte de la riqueza final. El fondo indexado gana, en parte, por el simple hecho de negarse a gastar tu dinero.

## Lo que realmente obtienes

| Propiedad | Fondo indexado | Fondo activo típico |
| --- | --- | --- |
| Objetivo | Igualar al mercado | Batir al mercado |
| Comisión anual | ~0,03–0,2 % | ~0,5–1,5 %+ |
| Diversificación | Cientos o miles de posiciones | Las apuestas del gestor |
| Riesgo de persona clave | Ninguno | La salida del gestor importa |
| Previsibilidad | Obtienes el rendimiento del mercado, menos casi nada | Amplia dispersión en torno al índice |

El planteamiento honesto: un fondo indexado garantiza que nunca batirás al mercado — y, a cambio, te hace estadísticamente muy probable que batas a la mayoría de quienes lo intentan.

## Lo que los fondos indexados no arreglan

No eliminan el riesgo de mercado: un fondo de mercado total cayó cerca de la mitad en 2008–09 y se recuperó con el mercado. No eligen tu distribución de activos — cuánto en acciones frente a bonos sigue siendo tu decisión (y pesa más que la elección del fondo). Y un índice estrecho (un sector, un tema) no es diversificación; la recomendación son los índices amplios de mercado.

## Preguntas frecuentes

**Si todo el mundo se indexara, ¿no se rompería el mercado?**
En algún extremo teórico, el descubrimiento de precios se debilitaría — pero la negociación activa sigue dominando el volumen diario, y cualquier ineficiencia que dejara atraería de vuelta a los seleccionadores de acciones. Estamos lejísimos de ese límite.

**¿Fondo indexado o ETF?**
Ambos pueden replicar el mismo índice; la diferencia es el envoltorio de negociación. Para un ahorrador a largo plazo, cualquiera vale — importan más las comisiones y el índice replicado.

**¿Indexarse es "conformarse con la media"?**
Te conformas con el rendimiento *del mercado*, que tras costes ha quedado históricamente por encima de los resultados de la mayoría de los profesionales. Precio medio, resultado por encima de la media.${NOTE}`,
  },
  {
    topicKey: 'inflation-purchasing-power',
    title: 'Cómo la inflación erosiona en silencio tu poder adquisitivo',
    question: '¿Cómo erosiona realmente la inflación los ahorros y el poder adquisitivo con el tiempo?',
    summary:
      'La inflación es un impuesto compuesto y lento sobre el efectivo ocioso: al 3 % anual, el dinero pierde la mitad de su poder adquisitivo en unos 24 años. Entender el rendimiento real (tras inflación) es lo que separa ahorrar de preservar la riqueza.',
    tags: ['finanzas', 'inflación', 'economía', 'ahorro'],
    language: 'es',
    image: {
      prompt: promptOf('inflation-purchasing-power'),
      alt: 'Una moneda encogiéndose dentro de un reloj de arena mientras los objetos a su alrededor crecen',
    },
    sources: [
      { title: 'Oficina de Estadísticas Laborales de EE. UU. — Índice de Precios al Consumo', url: 'https://www.bls.gov/cpi/' },
      { title: 'FRED (Fed de San Luis) — series de datos de inflación', url: 'https://fred.stlouisfed.org' },
    ],
    content: `# Cómo la inflación erosiona en silencio tu poder adquisitivo

La inflación es el ritmo al que suben los precios en general — o, lo que es lo mismo, el ritmo al que cada unidad de dinero compra menos. Funciona exactamente como el interés compuesto, pero en tu contra: pequeños porcentajes anuales, capitalizando en silencio, hasta que el efecto acumulado es enorme. El efectivo escondido bajo el colchón no es "seguro"; tiene garantizado encogerse.

## La aritmética compuesta de la pérdida

Usando la regla del 72 a la inversa — 72 dividido entre la tasa de inflación da los años que tarda el poder adquisitivo en reducirse a la mitad:

| Inflación media | El dinero se reduce a la mitad en |
| --- | --- |
| 2 % | ~36 años |
| 3 % | ~24 años |
| 5 % | ~14 años |
| 8 % | ~9 años |

Con un modesto 3 %, los 100 de tu cajón se convierten, en términos de poder adquisitivo, en unos 74 al cabo de diez años, 55 a los veinte y 48 a los veinticuatro. Nadie te robó nada; simplemente todo se volvió más caro.

## Nominal frente a real: la única distinción que importa

Una cuenta de ahorro que paga un 2 % mientras la inflación corre al 3 % tiene un **rendimiento real de en torno al −1 %** — pierdes poder adquisitivo mientras el saldo crece. Resta siempre la inflación:

rendimiento real ≈ rendimiento nominal − tasa de inflación

Esta sola resta replantea la mayoría de las decisiones sobre el dinero. "Mi depósito paga un 4 %" no significa nada hasta saber si los precios suben un 2 % o un 6 %. Históricamente, los índices bursátiles amplios han ofrecido rendimientos reales positivos a largo plazo (alrededor del 6–7 % real en EE. UU. en ventanas muy largas), mientras que el efectivo y los depósitos a corto plazo han rondado el cero real — a veces por debajo.

## A quién perjudica la inflación y a quién ayuda

- **Perjudica**: a quienes tienen efectivo y pagos fijos — ahorradores en cuentas de baja rentabilidad, cualquiera con una pensión fija, prestamistas que fijaron tipos bajos.
- **Ayuda**: a los deudores con deuda a tipo fijo (que devuelven con dinero más barato) y a los dueños de activos reales — empresas, inmuebles, acciones — cuyos precios y beneficios tienden a subir con el nivel de precios con el tiempo.

Esa asimetría es la razón por la que "mantener los ahorros de varias décadas íntegramente en efectivo" es, históricamente, una de las estrategias que pierden de forma más fiable, pese a parecer la más segura.

## La inflación medida frente a tu inflación

El IPC oficial sigue una cesta media nacional. Tu tasa personal difiere según tu vida: quien alquila en ciudades caras, los padres que pagan matrículas o los viajeros frecuentes pueden experimentar una inflación muy por encima del titular; un propietario asentado puede experimentar menos. Juzga tus finanzas frente a tu cesta, no solo frente a la cifra del titular.

## Preguntas frecuentes

**¿Es buena algo de inflación?**
La mayoría de los bancos centrales fijan deliberadamente un objetivo del ~2 % — una inflación suave engrasa los ajustes salariales y desincentiva acumular efectivo, mientras que la deflación (precios a la baja) suele acompañar al estancamiento económico y vuelve más pesada la deuda.

**¿Significa la inflación que debo evitar todo el efectivo?**
No — el cometido de un fondo de emergencia es la disponibilidad, no el crecimiento, y su coste por inflación es la prima que pagas por la seguridad. El error es mantener en efectivo el dinero con *horizonte de décadas*.

**¿Qué protege frente a la inflación?**
A largo plazo: los activos productivos (acciones amplias, inmuebles) y los bonos ligados a la inflación. A corto plazo, nada es perfecto — por eso importa hacer coincidir los activos con el horizonte temporal.${NOTE}`,
  },
  {
    topicKey: 'emergency-fund',
    title: '¿De qué tamaño debe ser tu fondo de emergencia?',
    question: '¿Cuántos meses de gastos debo guardar en un fondo de emergencia, y dónde?',
    summary:
      'La respuesta estándar son 3–6 meses de gastos esenciales en una forma instantáneamente accesible y sin riesgo — más si tus ingresos son volátiles. Su cometido es ser un seguro, no rentar: evita que la mala suerte se convierta en deuda.',
    tags: ['finanzas', 'ahorro', 'fondo de emergencia', 'presupuesto'],
    language: 'es',
    image: {
      prompt: promptOf('emergency-fund'),
      alt: 'Una esfera acolchada dentro de una cámara de cristal que repele fragmentos de tormenta',
    },
    sources: [
      { title: 'Oficina de Protección Financiera del Consumidor (CFPB) — guías de ahorro de emergencia', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# ¿De qué tamaño debe ser tu fondo de emergencia?

Un fondo de emergencia es dinero cuyo único cometido es absorber sacudidas — la pérdida del empleo, una factura médica, el coche que muere la misma semana que el calentador. La pauta estándar son **3–6 meses de gastos esenciales**, guardados en algún sitio aburrido, líquido y sin riesgo. Renta poco por diseño: estás comprando un seguro, y el rendimiento al que renuncias es la prima.

## Dimensionarlo con honestidad

Cuenta el gasto mensual *esencial* — vivienda, comida, suministros, seguros, transporte, pagos mínimos de deuda — no todo tu ritmo de vida. Luego escálalo según lo frágiles que sean tus ingresos:

| Situación | Objetivo razonable |
| --- | --- |
| Dos salarios estables en el hogar | 3 meses de gastos esenciales |
| Un único salario estable | 4–6 meses |
| Ingresos autónomos / por comisión / estacionales | 6–12 meses |
| Un solo ingreso + dependientes + mercado laboral débil | hacia 12 meses |
| Riesgo conocido inminente (despidos anunciados, contrato que termina) | todo lo que puedas, ya |

El patrón: el fondo cubre el hueco realista entre perder los ingresos y reemplazarlos, más las sacudidas del tamaño de una franquicia por el camino.

## Dónde guardarlo

Tres requisitos: **disponible en días, no semanas; sin pérdida de valor nominal; separado del dinero del gasto diario.** Eso significa cuentas de ahorro de alta rentabilidad, fondos del mercado monetario o depósitos a corto plazo con acceso sin penalización. Descarta las acciones (que pueden estar un 30 % abajo el mes en que las necesitas), los bloqueos largos y cualquier cosa que dudarías en vender. Guardarlo en un banco distinto del de tu cuenta corriente añade una fricción útil contra el "tomar prestado" de él.

## ¿Por qué no invertirlo, en cambio?

Porque las emergencias se correlacionan con las recesiones. El fallo clásico: llega la recesión, pierdes el empleo *y* la bolsa cae un 35 %, así que tu "fondo de emergencia en fondos indexados" paga justo cuando es más pequeño. El valor del fondo está en que no se correlaciona con tu suerte. Sí, la inflación lo va mordiendo — ese es el coste del seguro, y es más barato que liquidar inversiones en el fondo o arrastrar una deuda de tarjeta al 20 % TAE.

## Construirlo desde cero

Una secuencia útil: primero adelántate un mes (esto elimina la mayor parte del estrés de vivir de nómina en nómina), luego avanza hacia los tres meses mientras pagas al menos los mínimos de toda la deuda, y después revisa si merece prioridad la deuda de alto interés o el resto del fondo — matemáticamente, amortizar una tarjeta al 20 % TAE es un "rendimiento" imbatible, así que mucha gente se queda en un mes, liquida la deuda tóxica y luego termina el fondo.

## Preguntas frecuentes

**¿Es una tarjeta de crédito un fondo de emergencia aceptable?**
Es un *puente* de emergencia, no un fondo — vale para las 48 horas antes de que llegue la transferencia del ahorro, pero es pésima como plan, ya que las emergencias que más importan (la pérdida del empleo) son justo cuando arrastrar deuda al 20 % TAE más duele.

**¿Debe crecer el fondo con mis ingresos?**
Debe crecer con tus *gastos y obligaciones*. Una subida de sueldo que ahorras no exige un fondo mayor; una hipoteca y dos hijos sí.

**¿Qué cuenta como emergencia?**
Inesperado, necesario, urgente — que cumpla los tres. Una oferta de vuelos no cumple ninguno; una caja de cambios rota que necesitas para trabajar los cumple los tres.${NOTE}`,
  },
  {
    topicKey: 'stocks-vs-bonds',
    title: 'Acciones frente a bonos: ¿cuál es la diferencia real?',
    question: '¿Cuál es la diferencia real entre acciones y bonos, y cómo se comportan de forma distinta?',
    summary:
      'Una acción es propiedad — tu rendimiento depende de cómo le vaya al negocio. Un bono es un préstamo — tu rendimiento es un contrato. Esa única diferencia explica por qué las acciones rentan más de media y por qué los bonos dan estabilidad a una cartera.',
    tags: ['finanzas', 'inversión', 'acciones', 'bonos'],
    language: 'es',
    image: {
      prompt: promptOf('stocks-vs-bonds'),
      alt: 'Una cresta montañosa irregular junto a una escalera suave y uniforme de luz',
    },
    sources: [
      { title: 'Investor.gov (SEC) — introducción a las acciones y los bonos', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) — datos históricos de rendimiento', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Acciones frente a bonos: ¿cuál es la diferencia real?

Una **acción** te convierte en copropietario de un negocio: compartes sus beneficios (dividendos, crecimiento) y sus fracasos, sin promesa alguna. Un **bono** te convierte en prestamista de una empresa o un gobierno: te deben intereses fijos y la devolución de tu dinero en una fecha, por contrato. Todo lo demás — la brecha de rendimiento, la de riesgo, la forma en que las carteras los mezclan — se deriva de la propiedad frente al préstamo.

## El trato que ofrece cada uno

| | Acción (propiedad) | Bono (préstamo) |
| --- | --- | --- |
| Tu rendimiento | Lo que queda tras pagar a todos — al alza sin tope | Cupones fijos + devolución del principal — al alza con tope |
| Si la empresa prospera | Capturas el crecimiento | Sigues cobrando los mismos cupones |
| Si fracasa | Eres el último de la fila, a menudo te quedas sin nada | Los acreedores cobran antes que los dueños |
| Riesgos principales | Resultados del negocio, sentimiento del mercado | Impago, inflación, subidas de tipos |
| Rendimiento real histórico a largo plazo (EE. UU., ventanas muy largas) | ~6–7 % anual | ~1–3 % anual |
| Mal año típico | −20 % a −50 % | −5 % a −15 % (shocks de tipos) |

El mayor rendimiento medio de las acciones no es un regalo; es el pago por aceptar la incertidumbre y el ser el último de la fila. Las finanzas lo llaman la prima de riesgo de las acciones.

## Qué mueve el precio de los bonos

Los bonos no son estáticos: el precio de los bonos negociados se mueve en sentido contrario a los tipos de interés. Si tienes un bono que paga un 2 % y los bonos nuevos pagan un 5 %, nadie compra el tuyo a la par — su precio cae hasta que las rentabilidades se igualan. Los bonos de mayor vencimiento oscilan con más fuerza. Por eso incluso los fondos de bonos "seguros" tuvieron un año históricamente malo cuando los tipos saltaron, y por eso los bonos reducen, pero no eliminan, el riesgo.

## Por qué las carteras los mezclan

Las acciones y los bonos suelen (no siempre) subir y bajar en momentos distintos: las recesiones que aplastan a las acciones suelen traer bajadas de tipos que impulsan a los bonos de alta calidad. Una mezcla clásica 60/40 ha capturado históricamente la mayor parte del crecimiento de las acciones con caídas notablemente menores. La mezcla es un dial:

- **Más acciones** → mayor crecimiento esperado, caídas más grandes y más largas. Apto para horizontes largos.
- **Más bonos** → un trayecto más estable, menor crecimiento esperado. Apto para necesidades cercanas y estómagos delicados.

El ajuste correcto depende de cuándo necesitas el dinero y de cómo te comportas en un desplome — vender acciones presa del pánico cuesta más que cualquier error de distribución.

## Preguntas frecuentes

**¿Son "seguros" los bonos?**
Más seguros que las acciones frente al fracaso del negocio; no seguros frente a la inflación o los movimientos de tipos. Un bono del Estado mantenido hasta vencimiento devuelve el efectivo prometido — que la inflación puede haber devaluado en silencio.

**¿Necesito bonos individuales o un fondo de bonos?**
Los fondos ofrecen diversificación y liquidez fáciles; los bonos individuales ofrecen una fecha de pago conocida. Para la mayoría de los ahorradores, un fondo de bonos amplio y de alta calidad es la herramienta más sencilla.

**¿Por qué no 100 % acciones si soy joven?**
Defendible matemáticamente con décadas de horizonte y una disciplina de hierro. El riesgo honesto es conductual: una caída del 45 % pone a prueba la disciplina de maneras que las hojas de cálculo no capturan.${NOTE}`,
  },
  {
    topicKey: 'dollar-cost-averaging',
    title: '¿Qué es el promedio de coste (DCA) y cuándo tiene sentido?',
    question: '¿Qué es el promedio de coste y es mejor que invertir todo de golpe?',
    summary:
      'El promedio de coste invierte una cantidad fija en un calendario fijo, comprando más participaciones cuando los precios están bajos. Para quien ahorra de su nómina ocurre de forma natural; con un capital de golpe, invertirlo todo suele ganar matemáticamente — el DCA gana en lo conductual.',
    tags: ['finanzas', 'inversión', 'promedio de coste', 'estrategia'],
    language: 'es',
    image: {
      prompt: promptOf('dollar-cost-averaging'),
      alt: 'Gotas idénticas cayendo a intervalos regulares hacia un estanque estable',
    },
    sources: [
      { title: 'Wiki de Bogleheads — Dollar cost averaging', url: 'https://www.bogleheads.org/wiki/Dollar_cost_averaging' },
      { title: 'Investor.gov (SEC) — conceptos básicos de inversión', url: 'https://www.investor.gov' },
    ],
    content: `# ¿Qué es el promedio de coste (DCA) y cuándo tiene sentido?

El promedio de coste (DCA, por *dollar-cost averaging*) consiste en invertir la misma cantidad de dinero a intervalos regulares — pongamos 500 el día 1 de cada mes — sin importar lo que haga el mercado. La cantidad fija compra más participaciones cuando los precios están bajos y menos cuando están altos, y elimina la peor pregunta de la inversión ("¿es ahora un buen momento?") al convertir el *timing* en una no-decisión.

## La aritmética

Inviertes 300 al mes en un fondo cuyo precio oscila:

| Mes | Precio | Participaciones compradas |
| --- | --- | --- |
| Ene | 30 | 10,0 |
| Feb | 20 | 15,0 |
| Mar | 25 | 12,0 |
| Abr | 30 | 10,0 |

Gastaste 1200 por 47 participaciones — un coste medio de ~25,5 por participación, *por debajo* del precio medio simple (26,25), porque el presupuesto fijo sobreponderó automáticamente el mes barato. Esa es la ventaja mecánica: comprar las caídas con disciplina sin pronosticar nada.

## Dos situaciones muy distintas

**1. Invertir desde la nómina (la mayoría de la gente).** El DCA no es una elección de estrategia, es la única opción, porque el dinero llega cada mes. Automatizarlo es pura ganancia: sin decisiones, sin titubeos ante titulares aterradores, décadas de disciplina forzada.

**2. Invertir un capital de golpe (una prima, una herencia, una venta).** Aquí sí *podrías* invertirlo todo hoy o repartirlo a lo largo de un año. Matemáticamente, invertir todo de golpe ha batido históricamente a repartir en torno a dos de cada tres veces, simplemente porque los mercados suben más a menudo de lo que caen y el DCA mantiene dinero al margen. Pero el tercio de las veces en que pierde, pierde en el peor momento psicológico — justo después de haberlo invertido todo.

| | Todo de golpe | DCA en ~12 meses |
| --- | --- | --- |
| Resultado esperado | Mayor (más tiempo en el mercado) | Algo menor |
| Sensación en el peor caso | Brutal (todo dentro antes de un desplome) | Amortiguada |
| Riesgo de no invertir nunca | Bajo una vez hecho | "Pausar" a mitad del plan es habitual |

La respuesta pragmática: si un mal mes fuera a hacerte abandonar el plan o perder el sueño, reparte el capital de golpe en 6–12 meses con un calendario por escrito — un pequeño coste esperado a cambio de una gran garantía conductual. Si de verdad puedes encogerte de hombros ante la volatilidad, inviértelo y sigue con tu vida.

## Dónde falla el DCA en silencio

Hacer DCA sobre una sola acción promedia hacia algo que quizá nunca se recupere — el mecanismo solo "compra la caída" de forma útil cuando el activo está ampliamente diversificado e inclinado al alza a largo plazo. Y detener las aportaciones durante los desplomes borra todo el sentido: las participaciones baratas son justo las que la estrategia existe para comprar.

## Preguntas frecuentes

**¿Garantiza el DCA un beneficio?**
No — moldea *cuándo* compras, no si el activo sube. Un activo a la baja sigue perdiendo dinero, solo que desde un coste medio más bajo.

**¿Semanal o mensual?**
Prácticamente idéntico a lo largo de los años. Sincronízalo con tu nómina y olvídate; la frecuencia es discutir por discutir.

**¿Debería pausar el DCA cuando el mercado parece caro?**
Eso es *timing* de mercado disfrazado. El valor de la estrategia es precisamente que ignora tus sensaciones sobre las valoraciones.${NOTE}`,
  },
  {
    topicKey: 'asset-allocation',
    title: 'Distribución de activos y reequilibrio, explicados de forma sencilla',
    question: '¿Qué es la distribución de activos y cómo funciona realmente el reequilibrio?',
    summary:
      'La distribución de activos — tu reparto entre acciones, bonos y efectivo — determina la mayor parte del riesgo y del comportamiento a largo plazo de una cartera, mucho más que elegir fondos. El reequilibrio mantiene ese reparto en su objetivo recortando ganadores y reforzando perdedores.',
    tags: ['finanzas', 'inversión', 'distribución de activos', 'cartera'],
    language: 'es',
    image: {
      prompt: promptOf('asset-allocation'),
      alt: 'Un gráfico circular luminoso de tres partes mantenido en equilibrio sobre una balanza',
    },
    sources: [
      { title: 'Wiki de Bogleheads — Distribución de activos', url: 'https://www.bogleheads.org/wiki/Asset_allocation' },
      { title: 'Investor.gov (SEC) — conceptos básicos de distribución de activos', url: 'https://www.investor.gov' },
    ],
    content: `# Distribución de activos y reequilibrio, explicados de forma sencilla

La distribución de activos es el reparto porcentual de tu cartera entre clases de activos — normalmente acciones para crecer, bonos para estabilidad, efectivo para inmediatez. Es la única decisión que domina cómo se comporta tu cartera: la investigación de las últimas décadas atribuye la gran mayoría de la *variabilidad* del rendimiento de una cartera diversificada a su distribución, y no a qué fondos o acciones concretos llenan cada compartimento.

## Por qué el reparto importa más que la selección

Dos inversores que tengan los dos excelentes fondos de bajo coste vivirán experiencias completamente distintas si uno está al 90 % en acciones y el otro al 30 %. El inversor 90/10 debería esperar aproximadamente el doble de crecimiento a largo plazo — y caídas cercanas al −45 % en los desplomes graves. El inversor 30/70 renuncia a buena parte del crecimiento a cambio de caídas que rara vez superan el −15 %. Ninguno se equivoca; responden a preguntas distintas: *¿cuándo se necesita el dinero, y qué puede aguantar esta persona sin entrar en pánico?*

Un mapa aproximado:

| Dinero necesario en… | Forma de distribución habitual |
| --- | --- |
| < 3 años | Sobre todo efectivo y bonos cortos |
| 3–10 años | Equilibrada, p. ej. 40–60 % acciones |
| 10–30+ años | Cargada de acciones, p. ej. 70–90 % acciones |

Reglas como "110 menos tu edad en acciones" son puntos de partida toscos — útiles para anclar, no leyes. La *capacidad* de riesgo (tu horizonte, la estabilidad de tus ingresos) y la *tolerancia* al riesgo (lo que puedes soportar mientras duermes) cuentan ambas, y debería ganar la menor de las dos.

## Qué es el reequilibrio

Los mercados se mueven; tu reparto se desvía. Tras un gran año bursátil, una cartera 60/40 podría quedar en 70/30 — más arriesgada en silencio de lo que elegiste. El reequilibrio vende algo de lo que creció y compra lo que se quedó atrás, restaurando el objetivo. Es mantenimiento del riesgo, no persecución del rendimiento: estás tomando beneficios de forma sistemática del lado caro y reforzando el barato, según calendario, sin pronosticar.

Dos detonantes que funcionan — elige uno y automatízalo:

- **Por calendario**: una o dos veces al año, en la misma fecha.
- **Por umbral**: reequilibra cuando cualquier activo se desvíe más de ~5 puntos porcentuales del objetivo.

Para quien aporta de forma continua, el método más barato es **reequilibrar con las aportaciones**: dirige el dinero nuevo hacia lo que esté por debajo del objetivo, evitando por completo las ventas (y cualquier impuesto o comisión).

## La disciplina que impone

El superpoder silencioso del reequilibrio es conductual: te obliga a comprar acciones tras los desplomes (cuando tu objetivo dice que estás infraponderado) y a recortarlas tras la euforia — justo las operaciones que las emociones rechazan. Los inversores que reequilibraron a lo largo de 2008–09 compraron de forma mecánica cerca del fondo sin necesitar valentía, solo una regla.

## Preguntas frecuentes

**¿Aumenta el rendimiento el reequilibrio?**
A veces algo (entre activos de rendimiento similar), a veces cuesta un poco (recortar un mercado alcista largo). Su producto real es mantener el riesgo en el nivel que elegiste.

**¿Cómo de precisos deben ser los objetivos?**
Números enteros, bandas amplias. 58/42 frente a 60/40 es ruido; convertir la distribución en un ajuste constante echa por tierra el diseño.

**¿Dónde encajan otros activos — inmuebles, oro, cripto?**
Como porciones deliberadas y limitadas (habitualmente ≤5–10 % cada una) añadidas para diversificar — dimensionadas de modo que equivocarte por completo con ellas no te cambie la vida.${NOTE}`,
  },
  {
    topicKey: 'market-timing',
    title: 'Por qué cronometrar el mercado es tan difícil (incluso para los profesionales)',
    question: '¿Por qué se considera casi imposible cronometrar el mercado, incluso para los profesionales?',
    summary:
      'Cronometrar el mercado exige acertar dos veces — vender antes de las caídas y comprar antes de las subidas — frente a precios veloces que ya incorporan las expectativas. Perderte solo el puñado de mejores días, que se agrupan dentro de los desplomes, destruye décadas de rendimiento.',
    tags: ['finanzas', 'inversión', 'timing de mercado', 'comportamiento'],
    language: 'es',
    image: {
      prompt: promptOf('market-timing'),
      alt: 'Flechas que intentan y fallan por poco al posarse en los picos y valles de una ola',
    },
    sources: [
      { title: 'SPIVA — comparativas de persistencia y gestión activa', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Aswath Damodaran (NYU Stern) — datos y análisis de mercado', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Por qué cronometrar el mercado es tan difícil (incluso para los profesionales)

Cronometrar el mercado — salir antes de las caídas y volver antes de las recuperaciones — fracasa no porque la gente sea tonta, sino porque el juego está estructuralmente amañado contra el jugador. Debes acertar **dos veces**, sobre el **cuándo**, frente a **precios que ya contienen el consenso**, mientras los días que dan el premio se esconden **dentro de las semanas más aterradoras**. Cada obstáculo por sí solo es difícil; multiplicados juntos, explican por qué las estrategias de *timing* lucen geniales en las anécdotas y pobres en los resultados auditados.

## Los cuatro problemas estructurales

**1. Dos aciertos, error que se multiplica.** Salir correctamente no vale nada salvo que además vuelvas a entrar correctamente. Alguien con un 70 % de acierto por decisión — mucho mejor de lo que respalda la evidencia — acierta la ida y vuelta solo en ~49 % de las ocasiones, antes de costes.

**2. Los precios se mueven primero.** Los mercados miran hacia delante: para cuando la recesión está en las noticias, los precios ya cayeron hace meses; las recuperaciones, igualmente, empiezan en medio de titulares pésimos, cuando comprar parece una locura. Actuar sobre lo que ocurre a la vista es operar con información que ya está en el precio.

**3. Los mejores días se agrupan dentro de los peores tramos.** Los estudios de largo plazo muestran una y otra vez que perderte solo los 10–20 mejores días de entre *décadas* recorta drásticamente la riqueza final — a menudo a la mitad o más — y esos días ocurren de forma abrumadora durante los desplomes y sus rebotes inmediatos, justo cuando quien cronometra está sentado en efectivo "esperando a que se aclare todo".

**4. La tasa base castiga la ausencia.** Las acciones suben la mayoría de los años; el efectivo al margen paga un coste de oportunidad por defecto. Quien cronometra no solo necesita acertar — necesita acertar por *más* que la deriva alcista del mercado más los impuestos y los costes de operar.

## Lo que muestra el historial profesional

Décadas de comparativas SPIVA muestran que la mayoría de los fondos profesionales — incluidos los fondos tácticos y de distribución flexible cuyo mandato entero es el *timing* — quedan por detrás de índices sencillos en ventanas largas, y los pocos ganadores rara vez repiten. Los pronósticos encuestados de "dónde estará el índice dentro de un año" fallan por amplios márgenes de forma rutinaria. Este es el hecho empírico más sólido de la inversión minorista, y es la razón por la que dominan los consejos aburridos.

## Lo que sí funciona

No la predicción, sino el *compromiso previo*:

| En lugar de… | Haz… |
| --- | --- |
| "Saldré antes del próximo desplome" | Mantén una distribución cuyo peor caso puedas sobrevivir |
| "Volveré a comprar en el fondo" | Automatiza aportaciones que compren cada mes, incluidos los pésimos |
| "Efectivo hasta que se aclaren las cosas" | Acepta que la claridad y los precios bajos nunca coinciden |
| Reaccionar a los titulares | Reequilibrar por reglas de calendario o umbral |

Esto convierte el *timing* de un problema de pronóstico (imposible de ganar) en un problema de diseño (muy posible de ganar).

## Preguntas frecuentes

**¿"Comprar la caída" es cronometrar el mercado?**
Mantener efectivo *esperando* caídas lo es — y, históricamente, rinde por debajo de simplemente seguir invertido. Desplegar dinero nuevo programado durante las caídas es solo disciplina de aportación.

**¿No hubo quien acertó famosamente los grandes desplomes?**
Siempre hay alguien — gente distinta cada vez. Distinguir la clarividencia de una gran muestra de conjeturas ruidosas es, a posteriori, casi imposible; apostar tus ahorros a identificarla de antemano es la forma cara de aprender estadística.

**¿Entonces los precios nunca son predecibles?**
Dirección a corto plazo: a efectos prácticos, no. Los rendimientos esperados a largo plazo se relacionan vagamente con las valoraciones — útil para fijar expectativas, inútil como señal de salida.${NOTE}`,
  },
  {
    topicKey: 'etf-vs-mutual-fund',
    title: 'ETF frente a fondo de inversión: ¿qué envoltorio te conviene?',
    question: '¿Cuál es la diferencia entre un ETF y un fondo de inversión, y cuál debería elegir?',
    summary:
      'Los ETF y los fondos son envoltorios de la misma idea: invertir de forma agrupada y diversificada. Los ETF cotizan como acciones todo el día y suelen costar menos; los fondos fijan precio una vez al día y automatizan mejor las aportaciones. La estrategia de dentro importa más que el envoltorio.',
    tags: ['finanzas', 'inversión', 'etf', 'fondos'],
    language: 'es',
    image: {
      prompt: promptOf('etf-vs-mutual-fund'),
      alt: 'Una cesta de cubos en una cinta veloz y otra pesada con calma sobre una balanza',
    },
    sources: [
      { title: 'Investor.gov (SEC) — Fondos de inversión y ETF', url: 'https://www.investor.gov' },
      { title: 'Morningstar — análisis de fondos y ETF', url: 'https://www.morningstar.com' },
    ],
    content: `# ETF frente a fondo de inversión: ¿qué envoltorio te conviene?

Un ETF (fondo cotizado) y un fondo de inversión pueden mantener *exactamente la misma cartera* — el mismo índice, las mismas acciones. La diferencia es el envoltorio: cómo compras, cuándo se fijan los precios, cuánto cuesta y cómo se liquidan los impuestos. Elegir el envoltorio es una decisión de logística, no de estrategia — y la logística aun así suma a lo largo de las décadas.

## Las diferencias mecánicas

| | ETF | Fondo de inversión |
| --- | --- | --- |
| Negociación | Todo el día en bolsa, como una acción | Una vez al día al valor liquidativo de cierre |
| Mínimos | Una participación (o una fracción, si el bróker lo permite) | A menudo mínimos fijos (varía) |
| Costes típicos | Suelen tener los ratios de gastos más bajos; pagas el diferencial de compraventa al operar | Bajos en las versiones indexadas; algunos cargan comisiones de suscripción o 12b-1 — evitables |
| Inversión automática | Depende del bróker, cada vez más soportada | Nativa y fluida |
| Eficiencia fiscal (EE. UU.) | La creación/reembolso en especie suele minimizar las distribuciones de plusvalías | Más propenso a distribuir ganancias imponibles (depende de la jurisdicción) |
| Riesgo conductual | La facilidad para operar invita a trastear | El precio diario desincentiva el *day-trading* |

## Cuándo encaja mejor cada envoltorio

**Los ETF brillan cuando** quieres las comisiones recurrentes más bajas, inviertes a través de un bróker moderno, te importa el control intradía o la transparencia de las posiciones, o (en algunas jurisdicciones, sobre todo EE. UU.) quieres menos distribuciones imponibles por sorpresa en una cuenta tributable.

**Los fondos de inversión brillan cuando** la prioridad es una automatización sin fricciones — cantidades mensuales fijas, compras por importe exacto, reinversión de dividendos, planes de jubilación ligados a la nómina — donde "configúralo y no lo mires nunca" es justo el objetivo, y donde las versiones indexadas cuestan esencialmente lo mismo que los ETF equivalentes.

## Las trampas que conviene evitar de verdad

El debate sobre el envoltorio distrae de los fallos que de verdad cuestan dinero:

- **Fondos de comisión alta en cualquiera de los dos envoltorios** — un ratio de gastos del 1 %+ para una exposición tipo índice es lo que hay que huir, no el envoltorio.
- **Comisiones de suscripción y retrocesiones** en algunos fondos de inversión — nunca vale la pena pagarlas por una exposición de uso común.
- **Tentación de operar con los ETF** — poder vender a las 10:43 ante un titular aterrador es una virtud para el operador y un defecto para el ahorrador.
- **ETF de nicho con poca negociación** — los diferenciales amplios cobran un impuesto silencioso en cada transacción; los fondos amplios y populares no tienen este problema.

## Preguntas frecuentes

**¿Es uno más seguro que el otro?**
Posiciones idénticas conllevan un riesgo de mercado idéntico. Ambos envoltorios están muy regulados; ninguno te protege de que el mercado caiga.

**¿Por qué suelen ganar los ETF en impuestos en EE. UU.?**
Su creación/reembolso de participaciones se hace "en especie" con los creadores de mercado, lo que permite al fondo deshacerse de posiciones revalorizadas sin venderlas — así llegan menos distribuciones de plusvalías a los partícipes. La ventaja se reduce en cuentas con ventaja fiscal y difiere según el país.

**¿Puedo elegir solo por el ratio de gastos?**
Casi: mismo índice, luego el coste total más bajo (ratio de gastos + diferencial típico), y luego el envoltorio que mejor automatice tu flujo de aportaciones. La estrategia, la tasa de ahorro y la distribución siguen empequeñeciendo todo esto.${NOTE}`,
  },
  {
    topicKey: 'risk-and-return',
    title: 'Riesgo y rentabilidad: la disyuntiva tras cada inversión',
    question: '¿Cómo se relacionan el riesgo y la rentabilidad, y qué significa de verdad "más riesgo, más rentabilidad"?',
    summary:
      '"Más riesgo, más rentabilidad" significa mayor rentabilidad *esperada* como pago por aceptar resultados más amplios, incluidos los malos. Entender la volatilidad, las caídas y el almuerzo gratis de la diversificación convierte el tópico en una herramienta útil.',
    tags: ['finanzas', 'inversión', 'riesgo', 'fundamentos'],
    language: 'es',
    image: {
      prompt: promptOf('risk-and-return'),
      alt: 'Una esfera brillante y volátil y otra calmada y estable en equilibrio sobre un balancín',
    },
    sources: [
      { title: 'Investor.gov (SEC) — conceptos básicos de riesgo', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) — primas de riesgo y rentabilidades', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Riesgo y rentabilidad: la disyuntiva tras cada inversión

"Más riesgo, más rentabilidad" es la frase peor citada de las finanzas. La versión exacta: las inversiones con rangos de resultados más amplios y aterradores deben ofrecer mayores rentabilidades **esperadas**, o nadie las mantendría. La rentabilidad extra es *compensación*, pagada de media y con el tiempo — no un premio entregado a todo el que asume riesgo. Muchísimos riesgos no pagan nada; la habilidad está en saber cuáles llevan prima.

## Qué significa "riesgo" aquí de verdad

Varias cosas distintas viajan bajo una misma palabra:

- **Volatilidad** — cuánto rebota el valor año tras año. Molesta, pero superable.
- **Caída máxima** — la pérdida de pico a valle. Los mercados de acciones amplios han caído repetidamente un 30–50 %; eso no es un escenario de cola, es el precio de la entrada.
- **Pérdida permanente** — la única fatal: una empresa que quiebra, una apuesta concentrada que implosiona, o *tú* vendiendo en el fondo y convirtiendo una caída temporal en una pérdida permanente.
- **Riesgo de quedarse corto** — el silencioso: invertir de forma tan cauta que el dinero no llega a crecer lo suficiente para su propósito. Las opciones "seguras" lo cargan a granel.

La volatilidad de una cartera de acciones diversificada es en su mayoría temporal; el desplome de una sola acción suele ser permanente. La misma clase de activo, un riesgo profundamente distinto.

## Qué riesgos pagan una prima, y cuáles no

| Riesgo | ¿Compensado? | Por qué |
| --- | --- | --- |
| Riesgo del mercado amplio de acciones | Sí — la prima de las acciones | No se puede diversificar; alguien tiene que soportarlo |
| Prestar a más plazo / a deudores más débiles | Sí — primas de plazo y de crédito | Posibilidad real de pérdida o erosión |
| Tener una sola acción en vez de muchas | **No** | Diversificable — el mercado no te paga por riesgos que podrías eliminar gratis |
| Especulación tipo lotería | Negativa de media | Pagas por el sueño |

Esta es la idea práctica más profunda de la tabla: **la diversificación elimina el riesgo no compensado a coste cero** — lo más parecido a un almuerzo gratis que hay en finanzas. La concentración solo es racional cuando tienes una ventaja genuina o una convicción de nivel privilegiado; de lo contrario, es riesgo sin pagar.

## Ajustar el riesgo al propósito

La capacidad de riesgo la fija el *tiempo*: el dinero que necesitas el año que viene no puede aguantar una caída del 40 %; el dinero que necesitas en 2050 puede ignorar una docena de ellas. La tolerancia al riesgo la fija el *temperamento*: la distribución que abandonas presa del pánico nunca fue la correcta, dijera lo que dijera la hoja de cálculo. Regla práctica: asume tu máximo riesgo *útil* con el dinero de horizonte largo, y ningún riesgo por el que no te paguen, en ningún horizonte.

## Preguntas frecuentes

**Si las acciones son más arriesgadas, ¿por qué los asesores ponen a los jubilados algo de acciones?**
Porque la jubilación dura décadas y la inflación también es un riesgo. Una porción de acciones de pequeña a moderada combate el riesgo de quedarse corto mientras los bonos cubren los años cercanos.

**¿Es la volatilidad la medida correcta del riesgo?**
Es el indicador medible, no la verdad. Para un inversor a largo plazo, los riesgos reales son la pérdida permanente y no alcanzar el objetivo — la volatilidad solo importa cuando te fuerza o te asusta a vender.

**¿Puedo obtener altas rentabilidades con bajo riesgo?**
Quien ofrezca esa combinación está equivocado o vendiéndote algo. Las oportunidades reales de bajo riesgo y alta rentabilidad se arbitran en minutos — no llegan a los folletos del minorista.${NOTE}`,
  },
  {
    topicKey: 'credit-card-interest',
    title: 'Cómo funcionan de verdad los intereses de la tarjeta de crédito (y por qué se disparan)',
    question: '¿Cómo funcionan en realidad los intereses de la tarjeta de crédito y por qué crece tan rápido la deuda?',
    summary:
      'Las tarjetas de crédito cobran de los tipos de interés más altos de las finanzas convencionales — a menudo un 15–25 % TAE, capitalizando a diario en cuanto arrastras un saldo. Los pagos mínimos están diseñados para estirar la deuda durante años; entender la mecánica es la vía de escape.',
    tags: ['finanzas', 'tarjetas de crédito', 'deuda', 'intereses'],
    language: 'es',
    image: {
      prompt: promptOf('credit-card-interest'),
      alt: 'Una espiral de peldaños de deuda que asciende desde una tarjeta mientras crece una bola de nieve',
    },
    sources: [
      { title: 'Oficina de Protección Financiera del Consumidor (CFPB) — recursos sobre tarjetas de crédito', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# Cómo funcionan de verdad los intereses de la tarjeta de crédito (y por qué se disparan)

Una tarjeta de crédito son dos productos en un mismo sobre: una herramienta de pago maravillosa si liquidas el saldo cada mes, y uno de los préstamos más caros de las finanzas convencionales si no lo haces — habitualmente un 15–25 % TAE, con intereses que capitalizan. El efecto bola de nieve no es una metáfora; es la aritmética de unos tipos altos aplicados a diario sobre un saldo que los pagos mínimos apenas mellan.

## La mecánica, paso a paso

- **El periodo de gracia.** Paga el *saldo total del extracto* antes de la fecha de vencimiento y las compras no te cuestan nada en intereses. Es el único modo en el que la tarjeta es gestión de dinero gratuita.
- **Perderlo.** Arrastra cualquier saldo más allá del vencimiento y los intereses suelen aplicarse a las compras desde el primer día en adelante — el periodo de gracia desaparece hasta que vuelvas a liquidar por completo el saldo.
- **Capitalización diaria.** La mayoría de las tarjetas cobran intereses a diario: un 20 % TAE es ~0,0548 % al día aplicado a tu saldo medio diario. Los intereses se acumulan sobre los intereses ya acumulados — la capitalización trabajando en tu contra a un ritmo con el que las acciones solo sueñan.
- **La trampa del pago mínimo.** Los mínimos suelen ser ~1–3 % del saldo. Sobre 5000 al 20 % TAE, los intereses del primer año por sí solos rondan los 1000 — un mínimo del 2 % (100 al mes) apenas le saca ventaja a los intereses, estirando la devolución hacia una década y multiplicando el coste real de lo que compraste.

## Por qué esta deuda está por encima de casi todo

Liquidar un saldo al 20 % TAE es, sin riesgo, un "rendimiento del 20 %" — mejor que el que cualquier inversión legítima ofrecerá de forma fiable. La jerarquía práctica es contundente:

| Dinero disponible | Mejor uso, por lo general |
| --- | --- |
| Arrastrar deuda de tarjeta al 15–25 % | Atácala antes de invertir más allá de cualquier aportación del empleador |
| Elegir qué tarjeta pagar primero | La de mayor TAE primero ("avalancha") — óptimo matemáticamente |
| La motivación es el cuello de botella | El saldo más pequeño primero ("bola de nieve") — psicológicamente sostenible |

Cualquiera de los dos órdenes le saca años y miles a "pagar solo el mínimo en todas".

## Salir, en concreto

Deja de añadir (cambia el gasto diario a la tarjeta de débito mientras atacas el saldo); paga una cantidad *fija* y agresiva en lugar del mínimo menguante; plantéate una transferencia de saldo a una tarjeta promocional al 0 % *solo* con un plan por escrito para liquidarla dentro del periodo promocional (las comisiones de transferencia rondan el 3–5 %, y los tipos tras la promoción vuelven a ser brutales); y trata la consolidación con un préstamo personal como una reducción de tipo, no como una absolución — el patrón de gasto que construyó el saldo debe terminar, o se reconstruye.

## Preguntas frecuentes

**¿Pagar el mínimo protege mi calificación crediticia?**
Evita las marcas de impago, sí — pero una utilización alta (saldo ÷ límite) aun así lastra la puntuación. Tanto en puntuación como en coste, la respuesta es la misma: baja el saldo.

**¿Vale la pena mantener un pequeño saldo "para mi calificación crediticia"?**
Un mito persistente. Pagar en su totalidad construye el mismo historial de pagos y cuesta cero intereses; arrastrar un saldo solo enriquece al emisor.

**¿Tienen los anticipos de efectivo el mismo tipo?**
Normalmente peor: TAE más alta, una comisión por adelantado y **ningún periodo de gracia** — los intereses empiezan en el momento en que el efectivo sale del cajero. Son el botón más caro de la tarjeta.${NOTE}`,
  },
  {
    topicKey: 'retirement-start-early',
    title: 'Por qué empezar pronto a ahorrar para la jubilación supera a ahorrar más tarde',
    question: '¿Con cuánta antelación debería empezar a ahorrar para la jubilación y cuánta diferencia marca la edad de inicio?',
    summary:
      'Gracias a la capitalización, cada década de retraso aproximadamente duplica el ahorro mensual necesario para el mismo capital de jubilación. Empezar a los 25 en vez de a los 35 — la misma cantidad mensual — puede terminar con cerca del doble de dinero.',
    tags: ['finanzas', 'jubilación', 'ahorro', 'interés compuesto'],
    language: 'es',
    image: {
      prompt: promptOf('retirement-start-early'),
      alt: 'Un hilo de luz que arranca pronto y se ensancha en un río junto a un arroyo tardío y estrecho',
    },
    sources: [
      { title: 'Investor.gov (SEC) — Calculadora de interés compuesto', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Wiki de Bogleheads — puntos de partida para planificar la jubilación', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Por qué empezar pronto a ahorrar para la jubilación supera a ahorrar más tarde

El ahorro para la jubilación tiene una variable abrumadora, y no son los ingresos, ni la elección de fondos, ni siquiera la tasa de ahorro — es **cuántos años capitaliza el dinero**. Cada década de retraso aproximadamente duplica lo que debes ahorrar al mes para llegar al mismo sitio. Los primeros años parecen inútiles (los saldos son pequeños, el crecimiento invisible) y son, matemáticamente, los años más valiosos que tendrás jamás.

## La doble línea temporal

Los mismos 500 al mes, el mismo 7 % de rendimiento medio anual, jubilándote a los 65:

| Edad de inicio | Años invertidos | Total aportado | Capital final (aprox.) |
| --- | --- | --- | --- |
| 25 | 40 | 240 000 | ~1 310 000 |
| 35 | 30 | 180 000 | ~610 000 |
| 45 | 20 | 120 000 | ~260 000 |

Quien empieza a los 25 aporta solo 60 000 más que quien empieza a los 35 y termina con cerca de **700 000 más**. Dale la vuelta: para igualar el capital de quien empezó pronto, quien empieza a los 35 debe ahorrar unos 1100 al mes, y quien empieza a los 45, unos 2500 — el coste del retraso, facturado mensualmente.

## Por qué el dinero temprano es especial

Una aportación hecha a los 25 capitaliza durante 40 años — al 7 % se multiplica por ~15. La misma aportación a los 55 se multiplica por ~2. Tu última década antes de la jubilación normalmente *genera* más de lo que *aportas* en ella, pero solo si las décadas anteriores construyeron la base de la que crece. La capitalización es una bola de nieve: el primer empujón es el que más importa.

## Empezar de forma imperfecta supera a empezar más tarde

El orden de operaciones que sirve a la mayoría de la gente:

1. **Captura íntegra cualquier aportación del empleador** — es un rendimiento instantáneo del 50–100 %; ninguna inversión compite.
2. **Automatiza un porcentaje, no una cantidad** — incluso un 5–10 % de los ingresos a los 25 supera a un 20 % a los 40. Súbelo un punto con cada subida de sueldo.
3. **Por defecto, fondos indexados amplios y de bajo coste** dentro de la cuenta con ventaja fiscal que ofrezca tu país — décadas de horizonte son justo para lo que sirven las distribuciones cargadas de acciones.
4. **No esperes al "momento adecuado"** — para un horizonte de 40 años, cada punto de partida histórico, incluida la víspera de los desplomes, superó a esperar años a que se aclarara todo.

## Si empiezas tarde

Las matemáticas son más duras, no imposibles: la tasa de ahorro pasa a ser la palanca (la capitalización tiene menos pista, así que las aportaciones cargan con más peso), trabajar incluso 2–3 años más ayuda por partida doble (más aportaciones, menos años de retirada), y la peor respuesta es recurrir a inversiones con probabilidades de lotería para "recuperar el tiempo" — el riesgo de secuencia castiga justamente eso.

## Preguntas frecuentes

**¿Debería ahorrar para la jubilación mientras pago deudas?**
Captura la aportación del empleador incluso entonces (paga más que cualquier tipo de interés normal); más allá de esa aportación, la deuda de TAE alta suele merecer prioridad, la de tipo bajo normalmente no.

**¿Es seguro suponer un 7 %?**
Es una media histórica a largo plazo de un índice bursátil, no una garantía — los planes serios deberían probar también un 4–6 %. Fíjate en que la conclusión no cambia: cualquier tasa supuesta recompensa a quien empieza pronto.

**¿Cuánto necesitaré en total?**
Un ancla de planificación aproximada: gasto anual × 25 (la "regla del 4 %" invertida) — afinada después según el panorama de pensiones de tu país. La cifra importa menos a los 25 que el hábito; la precisión puede esperar, la capitalización no.${NOTE}`,
  },
];
