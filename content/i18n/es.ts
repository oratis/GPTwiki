import type { DraftArticle } from '../types';

// Spanish (es) translations of the editorial drafts. Faithful, natural
// translations of the English originals; tags are localized. Built up batch
// by batch.
export const es: DraftArticle[] = [
  // ── Batch 1: Ciencia y naturaleza ──
  {
    title: 'La fotosíntesis',
    question: '¿Cómo convierten las plantas la luz solar en alimento?',
    summary:
      'La fotosíntesis es el proceso por el cual las plantas, las algas y algunas bacterias convierten la energía de la luz, el agua y el dióxido de carbono en energía química almacenada como azúcares, liberando oxígeno como subproducto.',
    tags: ['biología', 'plantas', 'energía', 'química', 'ciencia'],
    language: 'es',
    content: `# La fotosíntesis

La fotosíntesis es el proceso bioquímico que permite a las plantas, las algas y ciertas bacterias fabricar su propio alimento a partir de la luz. Es la base de casi todas las cadenas alimentarias de la Tierra y la fuente del oxígeno que respiramos.

## La reacción básica

En términos simplificados, la fotosíntesis combina dióxido de carbono y agua, usando la energía de la luz, para producir glucosa y oxígeno:

\`\`\`
6 CO2 + 6 H2O + energía lumínica -> C6H12O6 + 6 O2
\`\`\`

El azúcar (glucosa) almacena energía química que el organismo utiliza después para crecer y metabolizar. El oxígeno se libera a la atmósfera.

## Dos etapas

- **Reacciones dependientes de la luz.** En las membranas de unas estructuras llamadas tilacoides, el pigmento verde **clorofila** absorbe la luz. Esa energía rompe las moléculas de agua, libera oxígeno y queda capturada en dos transportadores de energía: el ATP y el NADPH.
- **El ciclo de Calvin (reacciones independientes de la luz).** En el fluido circundante (el estroma), el ATP y el NADPH impulsan una serie de reacciones que fijan el dióxido de carbono en azúcar.

## Por qué importa

La fotosíntesis retira dióxido de carbono del aire y lo encierra en tejido vivo, por lo que es central para el ciclo global del carbono y la regulación del clima. Los combustibles fósiles son, en efecto, luz solar antigua capturada por la fotosíntesis hace millones de años.

## Variaciones

Las plantas de climas cálidos y secos suelen usar vías adaptadas —conocidas como fotosíntesis **C4** y **CAM**— que reducen la pérdida de agua y mejoran la eficiencia bajo estrés. Esto explica por qué cultivos como el maíz y la caña de azúcar prosperan bajo una luz solar intensa.`,
  },
  {
    title: 'El ciclo del agua',
    question: '¿Cómo se mueve el agua por todo el planeta?',
    summary:
      'El ciclo del agua es el movimiento continuo del agua mediante la evaporación, la condensación, la precipitación y la escorrentía, que redistribuye el agua dulce por la Tierra.',
    tags: ['ciencias de la tierra', 'agua', 'clima', 'geografía', 'ciencia'],
    language: 'es',
    content: `# El ciclo del agua

El ciclo del agua, o ciclo hidrológico, describe cómo el agua circula sin cesar entre los océanos, la atmósfera y la tierra. La cantidad total de agua en la Tierra se mantiene prácticamente constante; el ciclo simplemente la traslada entre distintos depósitos.

## Etapas principales

- **Evaporación.** El calor del Sol convierte el agua líquida —en su mayoría de los océanos— en vapor. Las plantas añaden humedad mediante la **transpiración**, y ambas juntas se denominan a veces *evapotranspiración*.
- **Condensación.** Al ascender y enfriarse, el vapor se condensa alrededor de partículas diminutas y forma nubes.
- **Precipitación.** Cuando las gotas se vuelven lo bastante pesadas, caen como lluvia, nieve, aguanieve o granizo.
- **Recolección y escorrentía.** El agua se reúne en ríos, lagos y océanos, o se filtra en el suelo para recargar los acuíferos, y finalmente regresa al mar.

## Depósitos y tiempo de residencia

El agua puede pasar tiempos muy distintos en cada depósito: días en la atmósfera, pero miles de años en las aguas subterráneas profundas o el hielo polar. Estos "tiempos de residencia" determinan con qué rapidez se mueven por el sistema los efectos de la contaminación o la sequía.

## Por qué importa

El ciclo del agua lleva agua dulce a los ecosistemas y la agricultura, modela el clima y la erosión, y regula la temperatura al desplazar enormes cantidades de calor. La actividad humana —construir presas, drenar humedales y calentar el clima— puede intensificar inundaciones y sequías al alterar el equilibrio del ciclo.`,
  },
  {
    title: 'La tectónica de placas',
    question: '¿Por qué se mueven los continentes y ocurren los terremotos?',
    summary:
      'La tectónica de placas es la teoría según la cual la capa externa de la Tierra está dividida en placas en movimiento cuyas interacciones forman montañas y océanos y provocan terremotos y volcanes.',
    tags: ['ciencias de la tierra', 'geología', 'terremotos', 'volcanes', 'ciencia'],
    language: 'es',
    content: `# La tectónica de placas

La tectónica de placas es la teoría que unifica la geología. Explica que la capa rígida externa de la Tierra —la **litosfera**— está dividida en una docena de grandes placas y varias más pequeñas que se desplazan lentamente sobre la roca más caliente y parcialmente fundida que hay debajo.

## Qué impulsa el movimiento

Las placas reposan sobre la **astenosfera**, una capa dúctil del manto superior. El calor que escapa del interior de la Tierra genera una lenta convección, y fuerzas como el tirón de las losas densas que se hunden ("tracción de placa") mueven las placas unos centímetros al año, aproximadamente lo que crecen las uñas.

## Tres tipos de límites

- **Divergentes.** Las placas se separan y el magma asciende para formar nueva corteza, por ejemplo a lo largo de la dorsal mesoatlántica.
- **Convergentes.** Las placas chocan. Una puede hundirse bajo la otra (**subducción**), formando fosas profundas, volcanes y terremotos; o dos continentes pueden arrugarse y levantar montañas como el Himalaya.
- **Transformantes.** Las placas se deslizan horizontalmente una junto a otra, como en la falla de San Andrés en California, acumulando tensión que se libera en forma de terremotos.

## Pruebas

La teoría surgió de ideas anteriores sobre la deriva continental. Las costas que encajan, fósiles idénticos en continentes hoy distantes y los patrones magnéticos a franjas congelados en la roca del fondo marino confirmaron que las placas han reorganizado el globo a lo largo de cientos de millones de años, y siguen haciéndolo hoy.`,
  },
  {
    title: 'El sistema inmunitario humano',
    question: '¿Cómo se defiende el cuerpo de las enfermedades?',
    summary:
      'El sistema inmunitario es una red de células, tejidos y moléculas en capas que detecta y neutraliza patógenos mientras distingue las propias células del cuerpo de las amenazas externas.',
    tags: ['biología', 'medicina', 'salud', 'cuerpo humano', 'ciencia'],
    language: 'es',
    content: `# El sistema inmunitario humano

El sistema inmunitario es la red de defensa del cuerpo frente a bacterias, virus, hongos y otras amenazas. Funciona en capas superpuestas, desde barreras físicas hasta respuestas celulares muy específicas.

## Inmunidad innata

La primera línea de defensa es rápida pero general. Incluye barreras físicas como la piel y la mucosidad, además de células como los **macrófagos** y los **neutrófilos**, que engullen a los invasores. La inflamación y la fiebre forman parte de esta respuesta rápida, diseñada para frenar a los patógenos y reclutar ayuda.

## Inmunidad adaptativa

Si la amenaza persiste, el sistema **adaptativo** monta un ataque dirigido:

- Los **linfocitos B** producen **anticuerpos**: proteínas que se adhieren a moléculas concretas (antígenos) de un patógeno y lo marcan para su destrucción.
- Los **linfocitos T** matan directamente a las células infectadas o coordinan la respuesta más amplia.

Una característica crucial es la **memoria**: tras una infección quedan células de memoria de larga vida, de modo que el cuerpo responde mucho más rápido si el mismo patógeno regresa. Este es el principio de la **vacunación**, que entrena al sistema inmunitario con una versión o fragmento inofensivo de un patógeno.

## Cuando algo falla

El sistema debe distinguir lo "propio" de lo "ajeno". Sus fallos provocan **enfermedades autoinmunes** (atacar el propio tejido), **alergias** (reaccionar en exceso a sustancias inofensivas) o **inmunodeficiencia** (una respuesta demasiado débil). Equilibrar la sensibilidad y la contención es uno de los logros más notables de la biología.`,
  },
  {
    title: 'Las mitocondrias',
    question: '¿Por qué se llama a las mitocondrias la central energética de la célula?',
    summary:
      'Las mitocondrias son orgánulos que generan la mayor parte de la energía utilizable de una célula mediante la respiración y portan su propio ADN, heredado de un lejano antepasado bacteriano.',
    tags: ['biología', 'células', 'energía', 'genética', 'ciencia'],
    language: 'es',
    content: `# Las mitocondrias

Las mitocondrias son estructuras diminutas dentro de la mayoría de nuestras células, famosas como la "central energética de la célula" porque producen la mayor parte de la energía que impulsa la vida.

## Producir energía

Las mitocondrias llevan a cabo la **respiración aeróbica**, convirtiendo nutrientes y oxígeno en **ATP** (adenosín trifosfato), la molécula que las células usan como moneda de energía. El proceso ocurre en la membrana interna plegada de la mitocondria, cuyos pliegues (crestas) aumentan la superficie disponible para las reacciones que producen energía. Una sola célula puede albergar desde una hasta miles de mitocondrias según sus necesidades energéticas; las células musculares y cardíacas son especialmente ricas en ellas.

## Un antepasado bacteriano

Las mitocondrias tienen su propio pequeño bucle de ADN y se reproducen dividiéndose, igual que las bacterias. Esto respalda la **teoría endosimbiótica**: que las mitocondrias descienden de bacterias de vida libre que fueron engullidas por una célula primitiva hace unos dos mil millones de años y se convirtieron en socias permanentes.

## Heredadas por vía materna

Como los espermatozoides apenas aportan mitocondrias, el **ADN mitocondrial** se transmite por la línea materna casi sin cambios. Los genetistas lo usan para rastrear la ascendencia y las migraciones humanas hasta un pasado remoto.

## Vínculos con la salud

Los defectos de las mitocondrias pueden causar diversos trastornos hereditarios, y el declive mitocondrial se estudia como factor del envejecimiento y de enfermedades como el párkinson.`,
  },
  {
    title: 'Las corrientes oceánicas',
    question: '¿Qué hace que el agua del mar se mueva en gigantescos bucles por el mundo?',
    summary:
      'Las corrientes oceánicas son flujos de agua marina a gran escala impulsados por el viento, la temperatura y la salinidad; redistribuyen el calor por el planeta y modelan los climas regionales.',
    tags: ['ciencias de la tierra', 'oceanografía', 'clima', 'geografía', 'ciencia'],
    language: 'es',
    content: `# Las corrientes oceánicas

Las corrientes oceánicas son movimientos continuos y dirigidos del agua del mar. Actúan como un sistema circulatorio que abarca todo el planeta, transportando calor, nutrientes y vida marina a través de miles de kilómetros.

## Corrientes superficiales

Cerca de la superficie, las corrientes son impulsadas sobre todo por el **viento**. La rotación de la Tierra desvía sus trayectorias mediante el **efecto Coriolis**, organizándolas en grandes sistemas giratorios llamados **giros**. La corriente del Golfo, por ejemplo, lleva agua cálida desde los trópicos hacia Europa, dando a Europa occidental un clima más templado de lo que cabría esperar por su latitud.

## Circulación profunda

Bajo la superficie, las corrientes son impulsadas por diferencias de **densidad**, que depende de la temperatura y la salinidad. El agua fría y salada cerca de los polos se hunde y fluye por el fondo oceánico, mientras que el agua más cálida asciende en otros lugares. Este lento bucle global se llama **circulación termohalina** o "cinta transportadora oceánica", y un recorrido completo puede tardar cerca de mil años.

## Por qué importan

Las corrientes moderan las temperaturas globales al trasladar calor del ecuador hacia los polos. Impulsan el **afloramiento** de nutrientes que sostiene algunas de las pesquerías más ricas del mundo e influyen en patrones meteorológicos como El Niño. Como la cinta transportadora depende de que el agua polar fría y densa se hunda, los científicos vigilan señales de que el deshielo y el calentamiento del mar puedan debilitarla.`,
  },
  {
    title: 'El efecto invernadero',
    question: '¿Cómo mantienen cálida la Tierra los gases de la atmósfera?',
    summary:
      'El efecto invernadero es el calentamiento que se produce cuando ciertos gases atmosféricos atrapan el calor que irradia la superficie de la Tierra, manteniendo el planeta habitable pero intensificándose a medida que esos gases aumentan.',
    tags: ['clima', 'ciencias de la tierra', 'atmósfera', 'medio ambiente', 'ciencia'],
    language: 'es',
    content: `# El efecto invernadero

El efecto invernadero es el proceso natural que mantiene la Tierra lo bastante cálida para sostener la vida. Sin él, la temperatura media de la superficie del planeta estaría muy por debajo del punto de congelación.

## Cómo funciona

La luz solar atraviesa la atmósfera y calienta la superficie de la Tierra. La superficie irradia entonces esa energía de vuelta hacia el exterior como radiación **infrarroja** (calor). Ciertos gases —principalmente el **dióxido de carbono, el metano, el vapor de agua y el óxido nitroso**— absorben parte de ese infrarrojo saliente y lo reemiten en todas direcciones, incluso de regreso hacia el suelo. El resultado es que el calor permanece en la atmósfera baja en lugar de escapar directamente al espacio.

El nombre proviene de una vaga analogía con un invernadero, aunque un invernadero real se calienta sobre todo bloqueando el movimiento del aire, no atrapando el infrarrojo.

## El equilibrio natural

Durante la mayor parte de la historia, la cantidad de gases de efecto invernadero y la energía que abandona la Tierra se mantuvieron en un equilibrio aproximado, conservando el clima relativamente estable.

## La influencia humana

La quema de combustibles fósiles, la deforestación y la agricultura han elevado las concentraciones de dióxido de carbono y metano a niveles no vistos en cientos de miles de años. Este efecto invernadero **intensificado** rompe el equilibrio y hace que el planeta retenga más calor. Las consecuencias incluyen el aumento de las temperaturas globales, cambios en los patrones meteorológicos, el deshielo y la subida del nivel del mar: el mecanismo central del cambio climático moderno.`,
  },
  {
    title: 'La bioluminiscencia',
    question: '¿Cómo y por qué brillan en la oscuridad algunos seres vivos?',
    summary:
      'La bioluminiscencia es la producción de luz por organismos vivos mediante una reacción química, usada para comunicarse, camuflarse, atraer presas y encontrar pareja.',
    tags: ['biología', 'química', 'oceanografía', 'animales', 'ciencia'],
    language: 'es',
    content: `# La bioluminiscencia

La bioluminiscencia es la capacidad de los organismos vivos de producir su propia luz. Desde las luciérnagas que parpadean en una noche de verano hasta las olas que brillan en una playa oscura, aparece a lo largo del árbol de la vida, y es especialmente común en el mar profundo.

## La química

El brillo proviene de una reacción química y no del calor, lo que lo convierte en una forma de "luz fría" que apenas desperdicia energía. Una molécula emisora de luz llamada **luciferina** reacciona con el oxígeno, con la ayuda de una enzima llamada **luciferasa**. La reacción libera energía en forma de luz visible, normalmente azul o verde: los colores que llegan más lejos a través del agua de mar.

## Por qué brillan los organismos

La bioluminiscencia cumple muchas funciones:

- **Atraer presas.** El rape balancea un señuelo brillante frente a su boca.
- **Defensa.** Algunos calamares sueltan nubes brillantes para confundir a los depredadores; otros usan la luz para mimetizarse con el tenue resplandor que viene de arriba (contrailuminación).
- **Comunicación y cortejo.** Las luciérnagas emiten destellos con patrones propios de cada especie para encontrar pareja.
- **Simbiosis.** Muchos animales no producen luz por sí mismos, sino que albergan bacterias luminosas en órganos especiales.

## En el océano profundo

La luz se desvanece en oscuridad unos cientos de metros más abajo, y por debajo de eso la inmensa mayoría de los animales puede producir luz. En este mundo sin luz, la bioluminiscencia es menos una curiosidad que un idioma primordial de supervivencia.`,
  },
  // ── Batch 2: Historia y sociedad ──
  {
    title: 'La Ruta de la Seda',
    question: '¿Qué fue la Ruta de la Seda y por qué fue importante?',
    summary:
      'La Ruta de la Seda fue una red de rutas comerciales que conectó Asia Oriental con el Mediterráneo durante más de mil años, transportando mercancías, tecnologías, religiones e ideas entre civilizaciones.',
    tags: ['historia', 'comercio', 'asia', 'civilización', 'geografía'],
    language: 'es',
    content: `# La Ruta de la Seda

La Ruta de la Seda no fue un único camino pavimentado, sino una vasta red de rutas terrestres y marítimas que enlazaba China, Asia Central, India, Persia y el mundo mediterráneo. Activa desde aproximadamente el siglo II a. C. hasta el siglo XV d. C., moldeó el desarrollo de cada sociedad que tocó.

## Más que seda

La seda china fue el lujo que dio su nombre moderno a la red (acuñado por un geógrafo del siglo XIX), pero por ella circularon incontables bienes: especias, té, porcelana, vidrio, metales preciosos, caballos y papel. Pocos comerciantes recorrían toda la distancia; en su lugar, las mercancías pasaban de mano en mano a través de una cadena de mercaderes y ciudades-oasis como Samarcanda y Kashgar.

## Una autopista para las ideas

El impacto más profundo de la ruta fue cultural. El **budismo** se difundió desde la India hacia China por estos caminos, mientras que el islam, el cristianismo y el maniqueísmo también viajaron con los comerciantes. Tecnologías cruciales —el **papel, la pólvora y la brújula**— se desplazaron hacia el oeste, transformando las sociedades que las recibieron.

## Enfermedad y declive

Las mismas conexiones que llevaban el comercio también llevaban enfermedades; muchos historiadores vinculan la Ruta de la Seda con la propagación de la **peste negra** en el siglo XIV. La red declinó poco a poco a medida que las rutas marítimas se volvieron más baratas y seguras y los imperios terrestres se fragmentaron.

## Legado

La Ruta de la Seda se recuerda como uno de los grandes motores de intercambio de la historia: prueba de que civilizaciones distantes estaban conectadas mucho antes y de forma mucho más profunda de lo que se creía.`,
  },
  {
    title: 'La imprenta',
    question: '¿Cómo cambió el mundo la imprenta?',
    summary:
      'La imprenta, perfeccionada por Johannes Gutenberg hacia 1440, hizo los libros baratos y abundantes, acelerando la alfabetización, la ciencia, la reforma religiosa y la difusión de ideas por Europa.',
    tags: ['historia', 'tecnología', 'comunicación', 'cultura', 'europa'],
    language: 'es',
    content: `# La imprenta

La imprenta es uno de los inventos más trascendentales de la historia. Al mecanizar la copia de textos, convirtió los libros de tesoros raros copiados a mano en objetos producidos en masa.

## El avance de Gutenberg

La impresión con bloques tallados existía antes en Asia Oriental, pero hacia 1440 el orfebre alemán **Johannes Gutenberg** combinó varias innovaciones en un sistema práctico: **tipos móviles de metal** duraderos, una tinta a base de aceite que se adhería al metal, y una prensa de tornillo adaptada de la elaboración del vino. Su **Biblia de 42 líneas** (h. 1455) demostró que el método podía rivalizar con la belleza de los manuscritos a una fracción del coste.

## Una explosión de información

Antes de la imprenta, un escriba podía tardar meses en copiar un solo libro. Después, un taller de impresión podía producir cientos de copias idénticas en el mismo tiempo. Para 1500, las imprentas de toda Europa habían producido millones de volúmenes. Los precios cayeron, la alfabetización aumentó y los textos estandarizados permitieron que el conocimiento se acumulara de forma fiable.

## Remodelar la sociedad

Las consecuencias fueron profundas:

- La **Reforma protestante** se extendió con rapidez porque los panfletos y las Biblias traducidas llegaron a los lectores comunes.
- La **Revolución científica** dependió de que los estudiosos compartieran diagramas y datos precisos a través de las fronteras.
- La impresión estandarizada ayudó a estabilizar las lenguas nacionales y a difundir la literatura en lengua vernácula.

## Legado

A menudo se considera la imprenta la primera tecnología de la información que democratizó el conocimiento: precursora de cada salto posterior, de los periódicos a internet.`,
  },
  {
    title: 'La Revolución Industrial',
    question: '¿Qué fue la Revolución Industrial y cómo transformó la sociedad?',
    summary:
      'La Revolución Industrial fue el paso de la producción manual a la fabricación con máquinas que comenzó en la Inglaterra del siglo XVIII, remodelando las economías, las ciudades, el trabajo y la vida cotidiana en todo el mundo.',
    tags: ['historia', 'economía', 'tecnología', 'sociedad', 'industria'],
    language: 'es',
    content: `# La Revolución Industrial

La Revolución Industrial fue un período de cambio drástico, iniciado en Gran Bretaña hacia 1760, en el que las economías pasaron de la agricultura y la artesanía hacia la industria mecanizada y la producción en fábricas.

## Por qué Gran Bretaña, por qué entonces

Se combinaron varios factores: abundante **carbón** como combustible, yacimientos de hierro, capital procedente del comercio, una mano de obra que abandonaba el campo y una oleada de inventos prácticos. La **máquina de vapor** mejorada, perfeccionada por James Watt, dio a las fábricas una fuente de energía potente e independiente de su ubicación. Las máquinas textiles mecanizadas multiplicaron muchas veces la producción de un solo trabajador.

## De la granja a la fábrica

La producción se trasladó de casas dispersas a **fábricas** centralizadas, construidas cerca de la energía y el transporte. El hierro, y más tarde el acero, hicieron posibles las máquinas y los ferrocarriles; los canales y luego el ferrocarril abarataron drásticamente el transporte de mercancías. Las ciudades crecieron a medida que la gente emigraba al trabajo industrial.

## Costes y beneficios

La revolución acabó por elevar el nivel de vida y la esperanza de vida y creó industrias enteramente nuevas. Pero sus primeras décadas trajeron condiciones duras: largas jornadas, trabajo infantil, maquinaria peligrosa, barrios marginales hacinados y contaminación. Estas penalidades alimentaron los movimientos obreros, las leyes de reforma y nuevas ideas políticas sobre los derechos de los trabajadores.

## Un punto de inflexión duradero

Una "Segunda Revolución Industrial" a finales del siglo XIX añadió la electricidad, los productos químicos y la producción en masa. Juntas, estas transformaciones fijaron el patrón del mundo industrial moderno, e iniciaron el aumento del uso de combustibles fósiles que hoy impulsa los retos climáticos.`,
  },
  {
    title: 'Los orígenes de la escritura',
    question: '¿Cuándo y por qué inventaron los humanos la escritura?',
    summary:
      'La escritura se inventó de forma independiente en varias civilizaciones antiguas, comenzando en Mesopotamia hacia el 3400 a. C., originalmente para llevar registros económicos antes de evolucionar para captar plenamente el lenguaje.',
    tags: ['historia', 'lengua', 'civilización', 'comunicación', 'cultura'],
    language: 'es',
    content: `# Los orígenes de la escritura

La escritura —el registro del lenguaje mediante signos visibles y duraderos— es uno de los inventos que definen a la humanidad. Surgió de forma independiente en al menos algunos lugares y, cada vez, transformó las sociedades que la desarrollaron.

## Nacida de la contabilidad

La escritura conocida más antigua proviene de **Mesopotamia** (el actual Irak) hacia el 3400-3200 a. C. No comenzó como literatura, sino como **contabilidad**: los administradores de los templos necesitaban llevar la cuenta del grano, el ganado y el comercio. Simples dibujos grabados en arcilla se convirtieron poco a poco en las marcas en forma de cuña conocidas como **cuneiforme**, trazadas con un estilo de caña.

## Invenciones independientes

La escritura también surgió por su cuenta en **Egipto** (los jeroglíficos), en **China** (los ancestros de los caracteres chinos, usados para la adivinación) y en **Mesoamérica** (los mayas y sus predecesores). El hecho de que se inventara más de una vez muestra que respondía a una necesidad profunda de las sociedades complejas.

## De los dibujos a los sonidos

Las primeras escrituras mezclaban símbolos para las cosas con símbolos para los sonidos. Un gran avance fue el **alfabeto** —un pequeño conjunto de signos que representan sonidos individuales—, que se remonta a pueblos de lengua semítica hacia el 1800 a. C. y fue adaptado más tarde por fenicios y griegos. Los alfabetos hicieron más fácil aprender y difundir la lectura y la escritura.

## Por qué importó

La escritura permitió que el conocimiento, las leyes, los contratos y los relatos sobrevivieran a quienes los crearon. Hizo gobernables los imperios, permitió que la ciencia se acumulara y convirtió la memoria de un frágil acto personal en un registro compartido y duradero.`,
  },
  {
    title: 'La inflación',
    question: '¿Qué causa la inflación y por qué importa?',
    summary:
      'La inflación es una subida sostenida del nivel general de precios que reduce el poder adquisitivo del dinero; una inflación moderada es normal, pero una inflación alta o inestable daña las economías.',
    tags: ['economía', 'finanzas', 'dinero', 'políticas', 'sociedad'],
    language: 'es',
    content: `# La inflación

La inflación es el ritmo al que sube el nivel general de precios de los bienes y servicios con el tiempo. Cuando hay inflación, cada unidad de moneda compra un poco menos que antes: el dinero pierde poder adquisitivo.

## Cómo se mide

Los economistas miden la inflación con **índices de precios**, el más común el Índice de Precios al Consumo (IPC), que sigue el coste de una "cesta" representativa de bienes y servicios cotidianos. Si la cesta cuesta un 3 % más que un año antes, la inflación anual es del 3 %.

## Qué la causa

La inflación suele surgir de dos grandes fuerzas:

- **Tirón de la demanda.** Cuando la demanda supera lo que una economía puede producir, los compradores hacen subir los precios.
- **Empuje de los costes.** Cuando suben los costes de insumos como la energía o la mano de obra, las empresas los trasladan.

Bajo ambas, la mayoría de los economistas sostiene que la inflación sostenida está estrechamente ligada al crecimiento de la **oferta monetaria** en relación con la producción real.

## Por qué importa

Un poco de inflación —los bancos centrales suelen fijar como objetivo en torno al 2 %— se considera saludable, pues anima el gasto y la inversión y evita los peligros de la caída de los precios (**deflación**). Pero una inflación alta erosiona los ahorros, distorsiona las decisiones y puede descontrolarse, como en los casos de **hiperinflación** en que los precios se duplican en días.

## Cómo se gestiona

Los bancos centrales combaten la inflación excesiva sobre todo subiendo los **tipos de interés**, lo que enfría el endeudamiento y el gasto. Equilibrar la inflación con el empleo y el crecimiento es uno de los retos centrales de la política económica.`,
  },
  {
    title: 'El método científico',
    question: '¿Cómo funciona realmente la ciencia?',
    summary:
      'El método científico es un enfoque sistemático para construir conocimiento mediante la observación, la hipótesis, el experimento y la revisión, que valora las pruebas y la comprobabilidad por encima de la autoridad.',
    tags: ['ciencia', 'filosofía', 'método', 'historia', 'educación'],
    language: 'es',
    content: `# El método científico

El método científico es el proceso disciplinado que usa la ciencia para investigar el mundo. Más que una receta rígida, es una mentalidad basada en contrastar las ideas con las pruebas y en estar dispuesto a descartar las que fallan.

## El ciclo central

Un ciclo típico atraviesa varios pasos:

1. **Observación.** Advertir un fenómeno o un enigma.
2. **Pregunta.** Plantear algo concreto sobre él.
3. **Hipótesis.** Proponer una explicación comprobable, una afirmación que, en principio, podría demostrarse falsa.
4. **Predicción.** Deducir qué debería ocurrir si la hipótesis es cierta.
5. **Experimento.** Poner a prueba la predicción en condiciones controladas, idealmente variando un solo factor cada vez.
6. **Análisis y revisión.** Comparar los resultados con la predicción y luego afinar, rechazar o ampliar la hipótesis.

## Principios clave

- **Comprobabilidad y falsabilidad.** Una afirmación científica debe hacer predicciones que puedan fallar. Las ideas que lo explican todo y no prohíben nada no son científicas.
- **Reproducibilidad.** Otros deben poder repetir un experimento y obtener el mismo resultado.
- **Revisión por pares.** El trabajo nuevo es escrutado por otros expertos antes de ser ampliamente aceptado.
- **Conocimiento provisional.** Incluso las teorías bien respaldadas permanecen abiertas a revisión si aparecen mejores pruebas.

## Por qué funciona

Al exigir pruebas e invitar a la crítica, el método científico corrige sus propios errores con el tiempo. No promete certeza, pero ha demostrado ser extraordinariamente poderoso para producir una comprensión fiable y acumulativa de la naturaleza.`,
  },
  {
    title: 'La democracia ateniense',
    question: '¿Cómo comenzó la democracia en la antigua Atenas?',
    summary:
      'La democracia ateniense, desarrollada en el siglo V a. C., fue un sistema temprano de autogobierno directo de los ciudadanos, influyente como antecesor de las ideas democráticas modernas pese a sus marcadas limitaciones.',
    tags: ['historia', 'política', 'grecia', 'democracia', 'civilización'],
    language: 'es',
    content: `# La democracia ateniense

A menudo se llama a la antigua Atenas la cuna de la democracia. En los siglos V y IV a. C. desarrolló un sistema en el que los ciudadanos comunes, y no los reyes ni una estrecha élite, tomaban las decisiones del Estado.

## Cómo funcionaba

La democracia ateniense era **directa**, no representativa. Las grandes decisiones las tomaba la **Asamblea (Ekklesía)**, abierta a todos los ciudadanos con derecho, que debatían y votaban en persona sobre leyes, guerra y política. Un **Consejo de los Quinientos**, elegido por sorteo, preparaba el orden del día, y la mayoría de los cargos públicos y los jurados se cubrían también por **sorteo** y no por elección, un esfuerzo deliberado por impedir que el poder se concentrara.

## Reformadores clave

El camino pasó por varias figuras: **Solón** alivió las deudas y amplió la participación; **Clístenes**, hacia el 508 a. C., reorganizó a los ciudadanos en nuevas agrupaciones que cruzaban las viejas lealtades y suele considerarse el fundador del sistema; y **Pericles** presidió su madura y segura cumbre.

## Limitaciones marcadas

Según criterios modernos, el sistema era estrecho. La ciudadanía —y, por tanto, la voz política— excluía a **las mujeres, las personas esclavizadas y los residentes extranjeros**, de modo que solo una minoría de la población podía participar.

## Legado

Pese a esas limitaciones, la democracia ateniense introdujo ideas duraderas: que la autoridad legítima puede residir en los gobernados, que los ciudadanos deben deliberar abiertamente y que nadie está por encima de la ley. Estos principios resonaron en la Ilustración y se incorporaron al diseño de las democracias modernas.`,
  },
  {
    title: 'El patrón oro',
    question: '¿Qué fue el patrón oro y por qué lo abandonaron los países?',
    summary:
      'El patrón oro fue un sistema monetario en el que el valor de una moneda se fijaba a una cantidad concreta de oro; estabilizaba los tipos de cambio pero limitaba la flexibilidad, y fue abandonado en el siglo XX.',
    tags: ['economía', 'historia', 'dinero', 'finanzas', 'políticas'],
    language: 'es',
    content: `# El patrón oro

El patrón oro fue un sistema en el que el valor del dinero de un país estaba directamente ligado al oro. Bajo un patrón oro pleno, el papel moneda podía cambiarse a demanda por una cantidad fija del metal.

## Cómo funcionaba

Cada unidad de moneda representaba un peso definido de oro, y los gobiernos se comprometían a convertir los billetes en oro a esa tasa. Como muchos países vinculaban sus monedas al oro, los tipos de cambio entre ellas quedaban de hecho **fijos**, lo que hacía el comercio y la inversión internacionales más predecibles.

## Ventajas

Sus partidarios valoraban el patrón oro por su **estabilidad** y **disciplina**. Como el dinero estaba respaldado por una mercancía física limitada, los gobiernos no podían imprimir moneda con facilidad para financiar el gasto, lo que tendía a mantener baja la inflación a largo plazo y a generar confianza en la moneda.

## Los inconvenientes

Esa misma rigidez era su debilidad. La oferta monetaria estaba atada a las reservas de oro en lugar de a las necesidades de la economía, de modo que los gobiernos tenían poco margen para responder a recesiones, crisis bancarias o sacudidas. Muchos economistas sostienen que el patrón oro agravó y propagó la **Gran Depresión** de los años treinta, pues los países se aferraban a él en vez de estimular sus economías.

## El fin del oro

Las naciones se desvincularon del oro por etapas. El sistema se derrumbó finalmente en 1971, cuando Estados Unidos puso fin a la convertibilidad del dólar en oro. Hoy el mundo usa **dinero fiduciario**, cuyo valor descansa en la credibilidad de los gobiernos y los bancos centrales y no en una mercancía física.`,
  },
  // ── Batch 3: Tecnología y matemáticas ──
  {
    title: 'Cómo funciona el GPS',
    question: '¿Cómo sabe el GPS exactamente dónde estás?',
    summary:
      'El GPS determina la ubicación midiendo el tiempo de viaje de las señales de varios satélites y usando trilateración; relojes atómicos precisos y correcciones relativistas lo hacen exacto hasta unos pocos metros.',
    tags: ['tecnología', 'navegación', 'satélites', 'física', 'ingeniería'],
    language: 'es',
    content: `# Cómo funciona el GPS

El Sistema de Posicionamiento Global (GPS) permite a un receptor —en tu teléfono, tu coche o tu reloj— averiguar dónde está en cualquier lugar de la Tierra, normalmente con un margen de unos pocos metros. Se apoya en una constelación de satélites y en algo de física ingeniosa.

## Satélites y señales

El GPS usa unos 30 satélites que orbitan a unos 20 000 km de altura, dispuestos de modo que siempre haya varios visibles desde cualquier punto del planeta. Cada uno emite sin cesar una señal de radio que lleva la **hora** exacta a la que se envió y la **posición** del satélite.

## Trilateración

El receptor mide cuánto tardó en llegar cada señal. Como las ondas de radio viajan a la velocidad de la luz, el tiempo de viaje revela la **distancia** a ese satélite. Conocer la distancia a un satélite te sitúa en algún punto de una esfera a su alrededor; combinar las distancias a varios satélites reduce tu posición a un único punto. Esta técnica geométrica se llama **trilateración**. Se necesitan señales de al menos cuatro satélites: tres para fijar la posición y un cuarto para resolver el error del reloj del receptor.

## Por qué importan los relojes y la relatividad

La sincronización debe ser extraordinariamente precisa: un error de una millonésima de segundo desviaría la posición cientos de metros. Los satélites llevan **relojes atómicos**, y el sistema corrige incluso la **relatividad de Einstein**: la velocidad de los satélites y su gravedad más débil hacen que sus relojes marchen a un ritmo algo distinto del de los relojes en tierra. Sin estas correcciones, el GPS se desviaría kilómetros al día.

## Más allá del posicionamiento

La misma sincronización precisa sustenta las redes financieras, las redes eléctricas y las telecomunicaciones, lo que convierte al GPS en una columna vertebral silenciosa de la infraestructura moderna.`,
  },
  {
    title: 'La criptografía de clave pública',
    question: '¿Cómo pueden dos desconocidos comunicarse de forma segura por la internet abierta?',
    summary:
      'La criptografía de clave pública usa pares de claves vinculadas matemáticamente —una pública y una privada— para que las personas cifren mensajes y verifiquen identidades sin compartir nunca un secreto de antemano.',
    tags: ['tecnología', 'criptografía', 'seguridad', 'matemáticas', 'internet'],
    language: 'es',
    content: `# La criptografía de clave pública

La criptografía de clave pública es el avance que hace posible la comunicación segura entre personas que nunca se han conocido. Sustenta el HTTPS, la mensajería segura, las firmas digitales y las criptomonedas.

## La idea del par de claves

El cifrado tradicional ("simétrico") usa una única clave compartida para cerrar y abrir un mensaje, lo que plantea un problema: ¿cómo compartir esa clave de forma segura en primer lugar? La criptografía de clave pública (o **asimétrica**) lo resuelve con un **par** de claves:

- Una **clave pública**, que cualquiera puede ver.
- Una **clave privada**, que el propietario mantiene en secreto.

Ambas están vinculadas matemáticamente de modo que lo que una clave cierra, solo la otra puede abrirlo, pero conocer la clave pública no permite calcular la privada.

## Dos usos principales

- **Cifrado.** Para enviar a alguien un mensaje confidencial, lo cifras con *su clave pública*; solo su clave privada puede descifrarlo.
- **Firmas digitales.** Para probar que un mensaje es realmente tuyo, lo firmas con *tu clave privada*; cualquiera puede verificarlo con tu clave pública, lo que confirma su autenticidad y que no fue alterado.

## La matemática detrás

La seguridad descansa en problemas fáciles de calcular en un sentido pero extremadamente difíciles de revertir, como **factorizar** números enormes (RSA) o resolver logaritmos discretos en **curvas elípticas**. Revertirlos llevaría cantidades de tiempo de cómputo poco prácticas.

## En la vida cotidiana

Cuando tu navegador muestra un candado, ya ha usado criptografía de clave pública para verificar el sitio web y establecer una clave compartida rápida para el resto de la sesión.`,
  },
  {
    title: 'La sucesión de Fibonacci',
    question: '¿Qué es la sucesión de Fibonacci y por qué aparece en la naturaleza?',
    summary:
      'La sucesión de Fibonacci es una serie en la que cada número es la suma de los dos anteriores; se relaciona con la proporción áurea y aparece en patrones como los pétalos de las flores y las conchas en espiral.',
    tags: ['matemáticas', 'patrones', 'naturaleza', 'geometría', 'ciencia'],
    language: 'es',
    content: `# La sucesión de Fibonacci

La sucesión de Fibonacci es uno de los patrones más famosos de las matemáticas: una regla sencilla que produce conexiones sorprendentes con la geometría y el mundo natural.

## La regla

Empieza con 0 y 1, y luego haz que cada número nuevo sea la **suma de los dos anteriores**:

\`\`\`
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
\`\`\`

La sucesión lleva el nombre del matemático italiano **Leonardo de Pisa** (Fibonacci), que la introdujo en Europa en 1202 mediante un acertijo sobre la cría de conejos, aunque ya se conocía antes en las matemáticas de la India.

## Vínculo con la proporción áurea

Divide cualquier número de Fibonacci entre el anterior y el resultado se acerca cada vez más a aproximadamente **1,618**: la **proporción áurea** (a menudo escrita φ). Cuanto más avanzas en la sucesión, más exacta es la aproximación.

## Por qué aparece en la naturaleza

Los números de Fibonacci aparecen en el número de pétalos de muchas flores, la disposición de las semillas en un girasol y la ramificación de las plantas. La razón más profunda es el **empaquetamiento eficiente**: colocar hojas o semillas en ángulos relacionados con la proporción áurea permite a una planta captar la luz solar o acomodar semillas con un solapamiento mínimo. Así que el patrón es menos una firma mística que una consecuencia natural de la optimización.

## Más allá de la biología

La sucesión también aparece en algoritmos informáticos, análisis financiero y arte, donde la proporción áurea se ha asociado durante mucho tiempo con proporciones agradables.`,
  },
  {
    title: 'Los números primos',
    question: '¿Qué son los números primos y por qué son importantes?',
    summary:
      'Los números primos son números enteros mayores que uno que no tienen más divisores que el uno y ellos mismos; son los componentes básicos de la aritmética y la base del cifrado moderno.',
    tags: ['matemáticas', 'números', 'criptografía', 'teoría', 'ciencia'],
    language: 'es',
    content: `# Los números primos

Un número primo es un número entero mayor que 1 que solo puede dividirse exactamente entre 1 y entre sí mismo. Los primeros primos son 2, 3, 5, 7, 11 y 13. Los números que tienen divisores adicionales, como el 6 (= 2 × 3), se llaman **compuestos**.

## Los átomos de la aritmética

Los primos son fundamentales por el **teorema fundamental de la aritmética**: todo número entero mayor que 1 puede escribirse como producto de primos de una única manera (sin contar el orden). Por ejemplo, 60 = 2 × 2 × 3 × 5. En este sentido, los primos son los "átomos" indivisibles a partir de los cuales se construyen todos los demás números.

## Infinitamente muchos

El matemático griego **Euclides** demostró hace más de dos mil años que no existe un primo más grande: la lista sigue para siempre. Sin embargo, los primos se vuelven más escasos a medida que crecen los números, y predecir exactamente dónde caen es un área profunda y aún sin resolver de las matemáticas, conectada con la famosa **hipótesis de Riemann**.

## Por qué importan hoy

Los primos impulsan la **criptografía** moderna. Métodos como RSA se apoyan en una asimetría práctica: multiplicar dos primos grandes es fácil, pero tomar el número enorme resultante y recuperar los primos originales (**factorizar**) es extraordinariamente difícil con los ordenadores actuales. Esa dificultad mantiene seguros la banca en línea, la mensajería y el comercio.

## Una búsqueda continua

Matemáticos y voluntarios que usan ordenadores en red siguen buscando primos cada vez mayores. Los primos más grandes conocidos tienen ya decenas de millones de dígitos.`,
  },
  {
    title: 'El interés compuesto',
    question: '¿Por qué el interés compuesto es tan poderoso con el tiempo?',
    summary:
      'El interés compuesto es el interés que se gana tanto sobre el capital original como sobre el interés ya acumulado, lo que produce un crecimiento exponencial que recompensa el ahorro temprano y a largo plazo.',
    tags: ['finanzas', 'economía', 'matemáticas', 'dinero', 'finanzas personales'],
    language: 'es',
    content: `# El interés compuesto

Al interés compuesto se le llama a menudo la fuerza más poderosa de las finanzas. Es el proceso de ganar interés no solo sobre el dinero que inviertes inicialmente, sino también sobre el interés que ese dinero ya ha generado.

## Simple frente a compuesto

Con el **interés simple**, ganas una cantidad fija cada período basada solo en la suma original (el **capital**). Con el **interés compuesto**, el interés de cada período se suma al saldo, de modo que el interés del período siguiente se calcula sobre una cantidad mayor. Por tanto, el crecimiento se acelera con el tiempo: es **exponencial** y no lineal.

## Un ejemplo rápido

Invierte 1000 al 7 % anual:

- Tras 1 año: 1070
- Tras 10 años: unos 1967
- Tras 30 años: unos 7612

El dinero se **duplica** aproximadamente cada década sin añadir ni un céntimo, y cuanto más tiempo se mantiene, más espectacular es el efecto.

## La regla del 72

Un atajo práctico, la **regla del 72**, estima cuánto tarda una inversión en duplicarse: divide 72 entre la tasa de interés anual. Al 8 %, el dinero se duplica en unos 9 años (72 ÷ 8).

## Por qué el tiempo es lo que más importa

Como la capitalización se construye sobre sí misma, **empezar pronto** suele importar más que invertir grandes cantidades más tarde. La misma lógica funciona a la inversa con la deuda: los saldos impagados de préstamos o tarjetas de alto interés se acumulan contra el deudor, por lo que esa deuda puede crecer de forma alarmante.`,
  },
  {
    title: 'Las funciones hash',
    question: '¿Qué es una función hash y dónde se usa?',
    summary:
      'Una función hash transforma datos de cualquier tamaño en una cadena de longitud fija; las buenas funciones hash criptográficas son rápidas, deterministas y prácticamente imposibles de revertir o de falsificar colisiones.',
    tags: ['tecnología', 'informática', 'criptografía', 'seguridad', 'datos'],
    language: 'es',
    content: `# Las funciones hash

Una función hash es una herramienta pequeña pero esencial en la informática. Toma una entrada de cualquier longitud —una palabra, un archivo, una base de datos entera— y produce una salida de longitud fija llamada **hash** o **resumen**.

## Propiedades clave

Una función hash útil es:

- **Determinista.** La misma entrada produce siempre el mismo hash.
- **Rápida** de calcular.
- **De longitud fija.** Un mensaje de un carácter y un archivo de un gigabyte dan, por ejemplo, un resultado de 256 bits.

Una función hash *criptográfica* añade garantías más fuertes:

- **Unidireccional.** Dado un hash, no se puede recuperar de forma viable la entrada original.
- **Resistente a colisiones.** Es prácticamente imposible hallar dos entradas distintas con el mismo hash.
- **Efecto avalancha.** Cambiar un solo carácter de la entrada altera por completo la salida.

## Usos cotidianos

- **Almacenamiento de contraseñas.** Los sistemas guardan el hash de una contraseña, no la contraseña en sí, de modo que una filtración de la base de datos no revela directamente los secretos de los usuarios.
- **Comprobaciones de integridad.** Las descargas suelen publicar un hash para verificar que un archivo llegó intacto y sin manipular.
- **Estructuras de datos.** Las **tablas hash** usan el hashing para encontrar elementos casi al instante, sin importar cuántos datos se almacenen.
- **Cadenas de bloques.** Las criptomonedas encadenan bloques mediante hashes, lo que hace el libro mayor a prueba de manipulaciones.

## Algoritmos comunes

Los sistemas modernos prefieren funciones fuertes como **SHA-256**. Las más antiguas, como MD5 y SHA-1, hoy se consideran rotas para la seguridad porque los investigadores hallaron formas de crear colisiones, y no deberían usarse para proteger datos sensibles.`,
  },
  {
    title: 'La máquina de Turing',
    question: '¿Qué es una máquina de Turing y por qué es fundamental para la informática?',
    summary:
      'La máquina de Turing es un modelo matemático simple de computación, ideado por Alan Turing en 1936, que define qué significa que un problema sea computable y sustenta toda la informática.',
    tags: ['informática', 'matemáticas', 'teoría', 'historia', 'tecnología'],
    language: 'es',
    content: `# La máquina de Turing

La máquina de Turing no es un dispositivo físico, sino un experimento mental: un modelo matemático que captura la idea misma de la computación. Propuesta por **Alan Turing** en 1936, sigue siendo el fundamento teórico de la informática.

## Un diseño engañosamente simple

Una máquina de Turing consta de:

- Una **cinta** infinita dividida en celdas, cada una con un símbolo.
- Un **cabezal** que puede leer y escribir el símbolo que tiene debajo y moverse a izquierda o derecha.
- Un conjunto de **estados** y una tabla de **reglas** que indican a la máquina qué hacer según su estado actual y el símbolo que lee.

A partir de estas piezas mínimas, la máquina puede llevar a cabo cualquier procedimiento paso a paso. La intuición de Turing fue que este sistema simple es lo bastante potente para realizar **cualquier** cálculo que pueda describirse mediante un algoritmo.

## Universalidad

Turing también describió una máquina **universal** capaz de leer la descripción de cualquier otra máquina de Turing y luego imitarla. Este es el ancestro teórico del ordenador programable moderno: una máquina que ejecuta distintos programas en lugar de un dispositivo separado para cada tarea.

## Los límites de la computación

El modelo también reveló límites. Turing demostró que algunos problemas son **indecidibles**: ningún algoritmo puede resolverlos. El más famoso es el **problema de la parada**: no existe un método general para determinar, para todo programa y entrada, si el programa acabará deteniéndose o se ejecutará para siempre.

## Una influencia duradera

Todo lo que un ordenador real puede computar, también puede computarlo una máquina de Turing (con tiempo y cinta suficientes). Esa equivalencia es la razón por la que el modelo sigue definiendo las fronteras de lo que los ordenadores pueden, y no pueden, hacer.`,
  },
  {
    title: 'Ancho de banda y latencia',
    question: '¿Cuál es la diferencia entre ancho de banda y latencia?',
    summary:
      'El ancho de banda es cuántos datos puede transportar una conexión por segundo, mientras que la latencia es el retardo antes de que los datos empiecen a llegar; ambos determinan lo "rápida" que se siente una red, pero no son lo mismo.',
    tags: ['tecnología', 'redes', 'internet', 'informática', 'ingeniería'],
    language: 'es',
    content: `# Ancho de banda y latencia

La gente suele decir que una conexión es "rápida", pero la velocidad tiene en realidad dos dimensiones distintas: el **ancho de banda** y la **latencia**. Confundirlas es una fuente común de frustración con las redes.

## Ancho de banda: cuánto

El **ancho de banda** es la cantidad máxima de datos que una conexión puede transferir en un tiempo dado, normalmente medida en megabits o gigabits por segundo. Una analogía útil es el grosor de una tubería: una tubería más ancha deja pasar más agua a la vez. El ancho de banda ayuda sobre todo al mover **grandes** cantidades de datos: transmitir vídeo de alta resolución, descargar archivos grandes o hacer copias de seguridad en la nube.

## Latencia: cuán pronto

La **latencia** es el retardo entre enviar una petición y recibir la primera respuesta, medido en milisegundos. En la analogía de la tubería, es cuánto tarda el agua en viajar de un extremo a otro. La latencia depende de la distancia (las señales no pueden superar la velocidad de la luz), del número de saltos de red y de los retardos de procesamiento. La latencia importa sobre todo en tareas **interactivas**: videollamadas, juegos en línea y peticiones web rápidas.

## Por qué importa la diferencia

Una conexión puede tener un ancho de banda alto pero una latencia alta, o al revés. Un enlace por satélite podría transportar muchos datos y aun así sentirse lento porque cada señal viaja decenas de miles de kilómetros. Por eso un vídeo puede transmitirse con fluidez (ancho de banda) mientras un juego sigue sintiéndose con retardo (latencia).

## Términos relacionados

El **rendimiento (throughput)** es la tasa de datos que realmente se logra en la práctica, que suele ser menor que el ancho de banda teórico. La **fluctuación (jitter)** es la variación de la latencia con el tiempo, que puede perturbar la voz y el vídeo aunque la latencia media sea baja.`,
  },
];
