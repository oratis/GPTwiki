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
  // ── Batch 4: Mente, salud y vida cotidiana ──
  {
    title: 'El efecto placebo',
    question: '¿Por qué un tratamiento falso a veces hace que la gente se sienta mejor?',
    summary:
      'El efecto placebo es una mejora real de los síntomas producida por las expectativas y creencias de una persona sobre un tratamiento, y no por un principio activo.',
    tags: ['medicina', 'psicología', 'salud', 'ciencia', 'mente'],
    language: 'es',
    content: `# El efecto placebo

El efecto placebo ocurre cuando la salud de una persona mejora de verdad tras recibir un tratamiento sin ningún principio activo terapéutico, como una pastilla de azúcar o una inyección de suero salino. La mejora proviene de la respuesta de la mente y el cuerpo a *esperar* mejorar.

## Una respuesta real y medible

Los placebos no están "todo en la cabeza" en un sentido despectivo. La expectativa puede desencadenar cambios fisiológicos reales: el cerebro puede liberar sus propias sustancias analgésicas (como las endorfinas) y las respuestas al estrés pueden modificarse. El efecto es más fuerte en síntomas moldeados por la percepción, como el **dolor, las náuseas, la fatiga y la ansiedad**, y más débil en los procesos objetivos de la enfermedad: un placebo no reducirá un tumor ni curará una infección.

## Por qué importa para la ciencia

Como la sola expectativa puede cambiar cómo se siente la gente, los ensayos médicos usan **controles con placebo**. Los pacientes reciben al azar el fármaco real o un placebo y, lo ideal, ni ellos ni los investigadores saben quién recibió cuál (un diseño **doble ciego**). Un tratamiento nuevo debe superar al placebo para considerarse eficaz.

## El efecto nocebo

La otra cara es el **efecto nocebo**: las expectativas negativas pueden producir síntomas negativos reales. Basta con advertir a alguien sobre los posibles efectos secundarios de un fármaco para que algunas personas los experimenten.

## Ética y uso

Engañar deliberadamente a los pacientes plantea problemas éticos, por lo que los médicos rara vez recetan placebos puros. Pero comprender el efecto ayuda a explicar por qué el propio entorno clínico, atento y seguro, contribuye a la curación.`,
  },
  {
    title: 'Por qué dormimos',
    question: '¿Por qué necesitan dormir los seres humanos?',
    summary:
      'El sueño es un estado vital y activo en el que el cerebro y el cuerpo realizan reparación, consolidación de la memoria y eliminación de desechos; la falta crónica de sueño daña la salud, el ánimo y la cognición.',
    tags: ['biología', 'salud', 'neurociencia', 'psicología', 'ciencia'],
    language: 'es',
    content: `# Por qué dormimos

El sueño ocupa cerca de un tercio de la vida humana, pero está lejos de ser inactividad. Es un estado activo y cuidadosamente regulado, esencial para la salud física y mental.

## Etapas del sueño

Una noche de sueño recorre etapas aproximadamente cada 90 minutos:

- **Sueño no REM**, que incluye el sueño profundo de "ondas lentas", cuando el cuerpo repara tejidos, forma hueso y músculo y refuerza el sistema inmunitario.
- **Sueño REM (movimientos oculares rápidos)**, cuando ocurren la mayoría de los sueños vívidos y el cerebro está muy activo.

## Qué hace el sueño

La investigación apunta a varias funciones esenciales:

- **Consolidación de la memoria.** El cerebro reproduce y reorganiza las experiencias del día, trasladando información al almacenamiento a largo plazo y reforzando el aprendizaje.
- **Eliminación de desechos.** Durante el sueño, el cerebro elimina subproductos metabólicos, incluidas proteínas vinculadas a enfermedades neurodegenerativas.
- **Restauración.** Las hormonas que regulan el crecimiento, el apetito y el estrés se reequilibran.

## El coste de dormir poco

La privación crónica de sueño se asocia con deterioro de la atención y el juicio, debilitamiento de la inmunidad, aumento de peso y mayor riesgo de cardiopatías, diabetes y trastornos del ánimo. Incluso déficits modestos pero sostenidos reducen de forma medible el rendimiento mental.

## El reloj corporal

El sueño está gobernado por el **ritmo circadiano**, un reloj interno de unas 24 horas sincronizado en gran medida por la luz. Alterarlo —con el trabajo por turnos, el desfase horario o las pantallas nocturnas— puede empeorar la calidad del sueño aunque las horas totales parezcan suficientes.`,
  },
  {
    title: 'La cafeína y el cerebro',
    question: '¿Cómo te mantiene despierto la cafeína?',
    summary:
      'La cafeína combate la somnolencia bloqueando la adenosina, una sustancia cerebral que se acumula durante el día y favorece el sueño, enmascarando temporalmente la fatiga en lugar de eliminarla.',
    tags: ['biología', 'neurociencia', 'salud', 'química', 'mente'],
    language: 'es',
    content: `# La cafeína y el cerebro

La cafeína es la sustancia psicoactiva más usada del mundo, presente en el café, el té, el chocolate y muchos refrescos. Actúa interfiriendo con una de las señales naturales de sueño del cerebro.

## Bloquear la señal de "cansancio"

Mientras permaneces despierto, una molécula llamada **adenosina** se acumula poco a poco en el cerebro. Cuando la adenosina se une a sus receptores, frena la actividad nerviosa y produce somnolencia. La cafeína tiene una forma parecida a la de la adenosina, así que se desliza en esos mismos receptores y los bloquea, sin activarlos. El cerebro deja de recibir el mensaje de "estás cansado" y aumenta la alerta.

## Efectos secundarios

Con la adenosina bloqueada, los estimulantes naturales del cerebro, como la dopamina y la adrenalina, actúan con más libertad. Por eso la cafeína puede agudizar la concentración, levantar el ánimo y elevar el ritmo cardíaco.

## Enmascara, no elimina, la fatiga

Es crucial entender que la cafeína no elimina la necesidad subyacente de dormir. La adenosina sigue acumulándose tras el bloqueo; cuando la cafeína se disipa, puede inundar los receptores ahora disponibles, lo que a veces produce un "bajón".

## Tolerancia y abstinencia

Con el uso regular, el cerebro crea más receptores, así que hace falta más cafeína para el mismo efecto: la **tolerancia**. Dejarla de golpe puede causar síntomas de **abstinencia**, como dolores de cabeza e irritabilidad, durante unos días. Los efectos también se desvanecen despacio: la cafeína tiene una vida media de varias horas, por lo que un café de la tarde puede aún perturbar el sueño de esa noche.`,
  },
  {
    title: 'El efecto Doppler',
    question: '¿Por qué cambia de tono una sirena al pasar junto a ti?',
    summary:
      'El efecto Doppler es el cambio en la frecuencia observada de una onda cuando la fuente y el observador se mueven uno respecto al otro, lo que explica el cambio de tono de las sirenas y el corrimiento al rojo de las galaxias lejanas.',
    tags: ['física', 'ondas', 'sonido', 'astronomía', 'ciencia'],
    language: 'es',
    content: `# El efecto Doppler

El efecto Doppler es el cambio en la frecuencia de una onda a medida que su fuente se acerca o se aleja de un observador. Es más familiar con el sonido, pero se aplica a todas las ondas, incluida la luz.

## El ejemplo cotidiano

Cuando se acerca una ambulancia, su sirena suena más aguda; al pasar y alejarse, el tono baja. La sirena en sí nunca cambia. Lo que cambia es cómo te llegan las ondas sonoras:

- Cuando la fuente se **acerca**, cada onda se emite un poco más cerca que la anterior, así que las ondas se apiñan: longitud de onda más corta, frecuencia **más alta** (tono más agudo).
- Cuando se **aleja**, las ondas se estiran: longitud de onda más larga, frecuencia **más baja** (tono más grave).

## Por qué ocurre

El efecto surge únicamente del movimiento relativo, que comprime o estira el espaciado entre las crestas sucesivas de las ondas. Cuanto más rápido es el movimiento relativo, mayor es el cambio.

## El efecto Doppler con la luz

La luz también se desplaza. El movimiento de alejamiento estira la luz hacia longitudes de onda más largas y rojas (**corrimiento al rojo**); el de acercamiento la desplaza hacia el azul (**corrimiento al azul**). Esto es una piedra angular de la astronomía: el corrimiento al rojo de las galaxias lejanas reveló que el universo se **expande**, y los corrimientos Doppler permiten a los astrónomos medir cómo se mueven las estrellas y las galaxias.

## Usos prácticos

El principio impulsa los **radares** de velocidad, el radar meteorológico que sigue el movimiento de las tormentas y la **ecografía Doppler** médica, que mide el flujo sanguíneo rebotando sonido en las células en movimiento.`,
  },
  {
    title: 'Por qué el cielo es azul',
    question: '¿Por qué el cielo es azul de día y rojo al atardecer?',
    summary:
      'El cielo es azul porque las moléculas del aire dispersan la luz azul de longitud de onda corta mucho más que los otros colores; al atardecer, la luz atraviesa más atmósfera, dispersa el azul y deja los rojos.',
    tags: ['física', 'luz', 'atmósfera', 'óptica', 'ciencia'],
    language: 'es',
    content: `# Por qué el cielo es azul

El color azul del cielo diurno y los colores encendidos del atardecer provienen de la misma física: la dispersión de la luz solar por la atmósfera.

## La luz solar es una mezcla de colores

Aunque parezca blanca, la luz solar contiene todos los colores del arcoíris, cada uno con una **longitud de onda** distinta: el azul y el violeta son cortos; el rojo y el naranja, largos.

## La dispersión de Rayleigh

Al atravesar el aire, la luz solar choca con moléculas de gas mucho más pequeñas que su longitud de onda. Estas moléculas diminutas dispersan las longitudes de onda **cortas** mucho más que las largas, un efecto llamado **dispersión de Rayleigh**, en el que la dispersión aumenta bruscamente al disminuir la longitud de onda. La luz azul se dispersa unas diez veces más que la roja.

## Por qué azul y no violeta

El violeta se dispersa aún más que el azul, entonces, ¿por qué el cielo no es violeta? Por dos razones: el Sol emite menos violeta que azul, y los ojos humanos son más sensibles al azul. La combinación hace que el cielo nos parezca azul.

## Amanecer y atardecer

Cuando el Sol está bajo en el horizonte, su luz atraviesa una porción mucho más gruesa de atmósfera. Para cuando te llega, la mayor parte del azul se ha dispersado en otras direcciones, dejando que dominen los **rojos y naranjas** de mayor longitud de onda. El polvo y la contaminación pueden intensificar aún más estos colores.

## En otros mundos

El color de un cielo depende de su atmósfera. Marte, con su aire fino y polvoriento, puede mostrar un cielo diurno color caramelo y atardeceres azulados, lo contrario de la Tierra.`,
  },
  {
    title: 'La resistencia a los antibióticos',
    question: '¿Por qué los antibióticos son cada vez menos eficaces?',
    summary:
      'La resistencia a los antibióticos surge cuando las bacterias evolucionan para sobrevivir a fármacos que antes las mataban; el uso excesivo y el mal uso aceleran este proceso, amenazando con volver peligrosas de nuevo a infecciones comunes.',
    tags: ['medicina', 'biología', 'salud', 'evolución', 'ciencia'],
    language: 'es',
    content: `# La resistencia a los antibióticos

La resistencia a los antibióticos es una de las amenazas más graves de la medicina moderna. Ocurre cuando las bacterias cambian de modo que los fármacos diseñados para matarlas dejan de funcionar.

## Evolución acelerada

Los antibióticos matan o detienen a las bacterias, pero en cualquier población grande unos pocos microbios pueden portar mutaciones aleatorias que les ayudan a sobrevivir. Cuando los antibióticos eliminan a las bacterias vulnerables, estos supervivientes resistentes se multiplican y transmiten su resistencia. Las bacterias también pueden **intercambiar genes de resistencia** directamente entre sí, propagando el rasgo con rapidez. Esto es **selección natural** que ocurre en días, no en milenios.

## Qué lo impulsa

El proceso se acelera por el comportamiento humano:

- **Uso excesivo:** recetar antibióticos para enfermedades víricas como los resfriados, que no pueden tratar.
- **Tratamientos incompletos:** dejarlos antes de tiempo, lo que deja vivas a las bacterias más resistentes.
- **Uso intensivo en la agricultura:** dosificar de forma rutinaria a animales sanos.

## Por qué es peligrosa

A medida que la resistencia se propaga, infecciones, cirugías y tratamientos antes rutinarios, como la quimioterapia, se vuelven más arriesgados. Las "superbacterias" resistentes a varios fármacos ya causan muchas muertes al año, y la cartera de antibióticos realmente nuevos ha sido escasa.

## Qué ayuda

Frenar la resistencia significa usar antibióticos solo cuando hacen falta, completar los tratamientos recetados, mejorar la higiene y la vacunación para prevenir infecciones de entrada, e invertir en investigar nuevos tratamientos. Es una responsabilidad compartida entre pacientes, médicos, agricultores y gobiernos.`,
  },
  {
    title: 'El ciclo del nitrógeno',
    question: '¿Cómo se mueve el nitrógeno entre el aire, el suelo y los seres vivos?',
    summary:
      'El ciclo del nitrógeno es el conjunto de procesos que convierten el nitrógeno entre su forma atmosférica inerte y compuestos utilizables por la vida, esencial para las proteínas y el ADN y central para la agricultura.',
    tags: ['biología', 'ciencias de la tierra', 'agricultura', 'química', 'medio ambiente'],
    language: 'es',
    content: `# El ciclo del nitrógeno

El nitrógeno es esencial para toda la vida: forma parte de las proteínas y el ADN. Aunque el aire es alrededor de un 78 % de nitrógeno gaseoso, la mayoría de los organismos no pueden usarlo directamente. El ciclo del nitrógeno es la serie de procesos naturales que convierte el nitrógeno en formas utilizables y de vuelta.

## El problema con el N2

El nitrógeno atmosférico existe como **N2**, dos átomos unidos por un triple enlace excepcionalmente fuerte. Romper ese enlace requiere mucha energía, así que las plantas y los animales no pueden aprovechar por sí mismos la vasta reserva del aire.

## Pasos clave

- **Fijación del nitrógeno.** **Bacterias** especializadas —muchas viven en las raíces de leguminosas como las judías y el trébol— convierten el N2 en amoníaco. Los rayos y los procesos industriales también fijan nitrógeno.
- **Nitrificación.** Otras bacterias convierten el amoníaco en **nitritos** y luego en **nitratos**, la forma que la mayoría de las plantas absorbe por las raíces.
- **Asimilación.** Las plantas captan nitratos para construir proteínas; los animales obtienen su nitrógeno comiendo plantas u otros animales.
- **Descomposición y amonificación.** Cuando los organismos mueren o excretan, los descomponedores devuelven el nitrógeno al suelo como amoníaco.
- **Desnitrificación.** Por último, ciertas bacterias convierten los nitratos de nuevo en N2 gaseoso, completando el ciclo.

## El impacto humano

La invención del **proceso de Haber-Bosch**, que fija nitrógeno industrialmente para fabricar fertilizantes, aumentó enormemente la producción de alimentos y hoy sostiene a buena parte de la población mundial. Pero el exceso de fertilizante que se filtra sobrecarga ríos y mares, causando **floraciones de algas** y "zonas muertas" sin oxígeno, lo que convierte el ciclo del nitrógeno en una preocupación ambiental clave.`,
  },
  {
    title: 'Cómo funciona la memoria',
    question: '¿Cómo almacena y recupera recuerdos el cerebro?',
    summary:
      'La memoria es la capacidad del cerebro de codificar, almacenar y recuperar información cambiando las conexiones entre neuronas; tiene varios tipos y es reconstructiva, no perfecta.',
    tags: ['neurociencia', 'psicología', 'biología', 'mente', 'ciencia'],
    language: 'es',
    content: `# Cómo funciona la memoria

La memoria nos permite aprender del pasado y dar sentido al presente. Más que un único archivador, es un conjunto de sistemas relacionados.

## Tres procesos básicos

- **Codificación.** Convertir una experiencia en una forma que el cerebro pueda almacenar, con ayuda de la atención y el significado.
- **Almacenamiento.** Conservar esa información a lo largo del tiempo.
- **Recuperación.** Traerla de vuelta cuando se necesita.

## Tipos de memoria

- La **memoria sensorial** retiene impresiones en bruto durante una fracción de segundo.
- La **memoria a corto plazo (de trabajo)** mantiene activa una pequeña cantidad de información durante segundos, lo bastante para marcar un número de teléfono.
- La **memoria a largo plazo** puede almacenar cantidades enormes durante años. Incluye la memoria **explícita** (hechos y sucesos que puedes describir) y la **implícita** (habilidades como montar en bici).

## La biología

Se cree que los recuerdos se almacenan como patrones de conexiones reforzadas entre neuronas, un principio que a menudo se resume como "las neuronas que se activan juntas se conectan juntas". El **hipocampo** es crucial para formar nuevos recuerdos a largo plazo, mientras que los recuerdos más antiguos y consolidados dependen más de la corteza. El **sueño** desempeña un papel clave en la consolidación del aprendizaje del día.

## La memoria es reconstructiva

Recordar no es como reproducir una grabación. Cada vez que recuerdas algo, el cerebro lo reconstruye, y los detalles pueden cambiar o mezclarse con otra información. Por eso los recuerdos de los testigos pueden estar equivocados con total seguridad, y por eso recordar repetidamente puede reescribir sutilmente el original.`,
  },
  // ── Batch 5: Espacio y astronomía ──
  {
    title: 'Las fases de la Luna',
    question: '¿Por qué cambia de forma la Luna a lo largo del mes?',
    summary:
      'Las fases de la Luna se deben al cambio del ángulo desde el que vemos su mitad iluminada por el Sol; la Luna no cambia, solo cuánto de su lado iluminado nos da la cara.',
    tags: ['astronomía', 'luna', 'espacio', 'ciencias de la tierra', 'ciencia'],
    language: 'es',
    content: `# Las fases de la Luna

La Luna parece cambiar de forma a lo largo de un mes, pasando de una fina media luna a un disco lleno y de vuelta. La Luna en sí no cambia; lo que cambia es cuánto de su mitad iluminada por el Sol podemos ver desde la Tierra.

## Por qué ocurren las fases

El Sol siempre ilumina la mitad de la Luna, igual que ilumina la mitad de la Tierra. A medida que la Luna orbita la Tierra cada 29,5 días aproximadamente, el ángulo entre el Sol, la Luna y la Tierra cambia, de modo que vemos distintas fracciones de esa mitad iluminada.

## Las fases principales

- **Luna nueva.** La Luna se sitúa entre la Tierra y el Sol, así que su lado iluminado nos da la espalda y resulta casi invisible.
- **Creciente → cuarto creciente → gibosa creciente.** Cada noche entra en vista una porción mayor del lado iluminado.
- **Luna llena.** La Tierra está entre el Sol y la Luna, así que vemos toda la cara iluminada.
- **Gibosa menguante → cuarto menguante → menguante.** La porción iluminada se reduce hacia la siguiente luna nueva.

"Creciente" significa que aumenta; "menguante", que disminuye.

## Siempre la misma cara

La Luna está en **rotación síncrona** con la Tierra: gira una vez por órbita, así que siempre nos muestra el mismo lado. Las fases no son la "cara oculta" de la Luna entrando en vista; son simplemente la línea día/noche (el **terminador**) barriendo la cara que siempre vemos.

## No es lo mismo que un eclipse

Las fases son un resultado cotidiano de la geometría orbital. Los **eclipses** son sucesos más raros que requieren que los tres cuerpos se alineen casi exactamente.`,
  },
  {
    title: 'Los cometas',
    question: '¿Qué son los cometas y por qué les crece una cola?',
    summary:
      'Los cometas son cuerpos helados del sistema solar exterior que, al acercarse al Sol, liberan gas y polvo para formar una coma brillante y largas colas que siempre apuntan en dirección contraria al Sol.',
    tags: ['astronomía', 'cometas', 'sistema solar', 'espacio', 'ciencia'],
    language: 'es',
    content: `# Los cometas

A los cometas se les suele llamar "bolas de nieve sucias": cuerpos pequeños de hielo, polvo y roca que quedaron de la formación del sistema solar. Durante la mayor parte de su vida son oscuros e invisibles, pero un viaje cerca del Sol puede transformarlos en uno de los espectáculos más asombrosos del cielo.

## De dónde vienen

Los cometas se originan en los confines fríos del sistema solar: el **cinturón de Kuiper**, más allá de Neptuno, y la **nube de Oort**, mucho más lejana, una vasta envoltura que se cree rodea al Sol. De vez en cuando, un empujón gravitatorio envía uno cayendo hacia el interior.

## Anatomía de un cometa

- **Núcleo.** El centro sólido de hielo y polvo, normalmente de solo unos kilómetros.
- **Coma.** Al acercarse al Sol, el hielo se vaporiza (pasa directamente de sólido a gas) y rodea el núcleo con una nube brillante de gas y polvo.
- **Colas.** Los cometas suelen tener dos: una **cola de polvo** que se curva a lo largo de la trayectoria, y una **cola de iones** recta y azulada de gas cargado, empujada directamente por el viento solar.

## Las colas apuntan lejos del Sol

Una sorpresa común es que la cola de un cometa no va arrastrándose detrás como el humo. **La radiación solar y el viento solar** empujan hacia fuera el material liberado, así que la cola siempre apunta más o menos **lejos del Sol**, incluso cuando el cometa regresa hacia el espacio.

## Visitantes predecibles

Algunos cometas orbitan en calendarios regulares. El más famoso, el **cometa Halley**, regresa cada 76 años aproximadamente y se ha registrado durante más de dos mil años.`,
  },
  {
    title: 'El ciclo de vida de una estrella',
    question: '¿Cómo nacen las estrellas y cómo mueren?',
    summary:
      'Las estrellas se forman a partir de nubes de gas en colapso, brillan fusionando hidrógeno durante la mayor parte de su vida y terminan como enanas blancas, estrellas de neutrones o agujeros negros según su masa.',
    tags: ['astronomía', 'estrellas', 'espacio', 'física', 'ciencia'],
    language: 'es',
    content: `# El ciclo de vida de una estrella

Las estrellas no son eternas. Nacen, viven de millones a miles de millones de años, y mueren de formas que dependen casi por completo de la masa con la que empezaron.

## Nacimiento

Las estrellas se forman dentro de vastas nubes de gas y polvo llamadas **nebulosas**. Cuando una parte de la nube se vuelve lo bastante densa, la gravedad la reúne en una bola caliente y giratoria. Cuando el núcleo se vuelve lo bastante caliente y denso, se enciende la **fusión nuclear**: los átomos de hidrógeno se fusionan en helio, liberando una energía enorme. Así nace una estrella.

## La secuencia principal

Durante la mayor parte de su vida, una estrella está en una fase larga y estable llamada **secuencia principal**, equilibrando el tirón hacia dentro de la gravedad con el empuje hacia fuera de la energía de fusión. Nuestro Sol está aproximadamente a la mitad de su vida en la secuencia principal, de unos 10 000 millones de años.

## La muerte depende de la masa

Cuando una estrella agota su hidrógeno, su destino se bifurca según la masa:

- Las **estrellas como el Sol** se hinchan en **gigantes rojas**, luego desprenden sus capas externas y dejan un núcleo denso que se enfría llamado **enana blanca**.
- Las **estrellas masivas** queman su combustible deprisa y terminan en una explosión colosal —una **supernova**— que por un instante brilla más que una galaxia. El núcleo que queda se convierte en una **estrella de neutrones** ultradensa o, si es lo bastante masivo, en un **agujero negro**.

## Reciclaje cósmico

Las supernovas forjan y esparcen elementos pesados como el hierro, el carbono y el oro por el espacio. Estos enriquecen nuevas nebulosas, que forman nuevas estrellas y planetas. En un sentido muy real, los átomos de nuestro cuerpo se fabricaron dentro de estrellas que murieron hace mucho.`,
  },
  {
    title: 'Las auroras',
    question: '¿Qué causa las luces del norte y del sur?',
    summary:
      'Las auroras son cortinas de luz brillante que se producen cuando partículas cargadas del Sol son canalizadas por el campo magnético de la Tierra hacia la atmósfera superior, donde excitan moléculas de gas.',
    tags: ['astronomía', 'atmósfera', 'clima espacial', 'física', 'ciencia'],
    language: 'es',
    content: `# Las auroras

Las auroras —las luces del norte (*aurora boreal*) y las del sur (*aurora austral*)— son despliegues brillantes de luz en el cielo nocturno cerca de los polos. Son el resultado visible de una conexión entre el Sol y el campo magnético de la Tierra.

## La fuente solar

El Sol emite sin cesar partículas cargadas llamadas **viento solar**, y los estallidos de actividad como las erupciones solares pueden enviar ráfagas especialmente fuertes. Cuando estas partículas llegan a la Tierra, la mayoría son desviadas por el **campo magnético** del planeta.

## Canalizadas hacia los polos

El campo magnético canaliza algunas partículas hacia los **polos magnéticos**, por eso las auroras suelen verse en latitudes altas. Cuando las partículas se precipitan en la atmósfera superior, chocan con moléculas de gas.

## Por qué los colores

Cada colisión energiza una molécula de gas, que luego libera esa energía como luz:

- El **verde**, el color más común, proviene del oxígeno a altitudes moderadas.
- El **rojo** proviene del oxígeno a gran altura.
- El **azul y el violeta** provienen del nitrógeno.

El resultado son cortinas, arcos y espirales ondulantes que cambian a medida que varían los flujos de partículas.

## Clima espacial

Las tormentas solares fuertes pueden empujar las auroras hacia latitudes más bajas y, lo que es más importante, pueden perturbar satélites, comunicaciones por radio y redes eléctricas. Por eso el estudio de las auroras forma parte de la vigilancia del "**clima espacial**", y otros planetas con campo magnético, como Júpiter y Saturno, tienen auroras espectaculares propias.`,
  },
  {
    title: 'Años luz y la distancia cósmica',
    question: '¿Qué es un año luz y cómo medimos las distancias en el espacio?',
    summary:
      'Un año luz es la distancia que recorre la luz en un año; como las distancias cósmicas son enormes, los astrónomos usan el tiempo de viaje de la luz y métodos ingeniosos basados en la geometría y el brillo para medirlas.',
    tags: ['astronomía', 'espacio', 'física', 'medición', 'ciencia'],
    language: 'es',
    content: `# Años luz y la distancia cósmica

El espacio es tan vasto que las unidades corrientes como los kilómetros resultan poco manejables. Para lidiar con estas escalas, los astrónomos miden la distancia usando la velocidad de la luz.

## Qué es un año luz

Un **año luz** es la distancia que recorre la luz en un año: unos 9,5 billones de kilómetros. A pesar del nombre, mide *distancia*, no tiempo. La luz es lo más rápido del universo, así que un año luz representa una extensión enorme.

## Mirar al pasado

Como la luz tarda en viajar, ver un objeto lejano significa verlo tal como *era* cuando la luz partió. La luz del Sol tiene unos 8 minutos cuando nos llega; el sistema estelar más cercano, Alfa Centauri, está a unos 4 años luz, así que lo vemos como era hace 4 años. Las galaxias más lejanas están a miles de millones de años luz: ventanas al universo primitivo.

## Cómo se miden las distancias

Los astrónomos construyen una "**escalera de distancias cósmicas**", con métodos que alcanzan cada vez más lejos:

- **Paralaje.** Para las estrellas cercanas, los astrónomos miden el ligero desplazamiento de su posición aparente a medida que la Tierra orbita el Sol, el mismo efecto que ves cuando un objeto cercano se desplaza contra el fondo al mover la cabeza.
- **Candelas estándar.** Ciertas estrellas y estrellas en explosión (como las supernovas de tipo Ia) tienen un brillo real conocido. Comparando lo brillantes que *parecen* con lo brillantes que *son* en realidad, los astrónomos calculan la distancia.
- **Corrimiento al rojo.** Para las galaxias más lejanas, el estiramiento de su luz revela a qué velocidad se alejan, lo que se relaciona con la distancia en un universo en expansión.

Cada peldaño se calibra con el de abajo, lo que permite a los astrónomos cartografiar el cosmos hasta su borde visible.`,
  },
  {
    title: 'Los exoplanetas',
    question: '¿Cómo encuentran los astrónomos planetas alrededor de otras estrellas?',
    summary:
      'Los exoplanetas son planetas que orbitan estrellas distintas del Sol; los astrónomos los detectan sobre todo por el ligero oscurecimiento de la luz estelar cuando un planeta transita, o por el leve bamboleo de la estrella.',
    tags: ['astronomía', 'exoplanetas', 'espacio', 'ciencia', 'descubrimiento'],
    language: 'es',
    content: `# Los exoplanetas

Un exoplaneta es un planeta que orbita una estrella distinta de nuestro Sol. Los primeros exoplanetas confirmados alrededor de una estrella similar al Sol se hallaron en la década de 1990; desde entonces se han descubierto miles, transformando nuestra visión de la galaxia.

## Por qué son difíciles de ver

Los planetas no producen su propia luz y son diminutos junto a sus deslumbrantes estrellas anfitrionas, como avistar de lejos una luciérnaga junto a un reflector. Por eso los astrónomos suelen detectar exoplanetas de forma **indirecta**, por sus efectos sobre la estrella.

## Los principales métodos de detección

- **El método del tránsito.** Si la órbita de un planeta pasa entre nosotros y su estrella, bloquea una fracción minúscula de la luz estelar, causando una pequeña y regular caída de brillo. Medir estas caídas revela el tamaño y la órbita del planeta. El telescopio Kepler de la NASA usó esto para hallar miles de planetas.
- **El método de la velocidad radial.** La gravedad de un planeta tira de su estrella y la hace bambolearse ligeramente. Este bamboleo desplaza la luz de la estrella (por el efecto Doppler) y revela la masa y la órbita del planeta.

Otros métodos incluyen la **imagen directa** de planetas grandes y lejanos y la **microlente gravitatoria**.

## Lo que hemos aprendido

Los exoplanetas son asombrosamente diversos: "júpiteres calientes" abrasadores que orbitan en días, "supertierras" mayores que la nuestra y mundos en la **zona habitable**, donde las temperaturas podrían permitir agua líquida. Los descubrimientos sugieren que los planetas son comunes —la mayoría de las estrellas probablemente los alberguen—, lo que agudiza la búsqueda de mundos que puedan sostener vida.`,
  },
  {
    title: 'El Big Bang',
    question: '¿Qué es la teoría del Big Bang y qué pruebas la respaldan?',
    summary:
      'La teoría del Big Bang sostiene que el universo comenzó hace unos 13 800 millones de años a partir de un estado extremadamente caliente y denso y se ha expandido desde entonces, respaldada por varias líneas de evidencia.',
    tags: ['astronomía', 'cosmología', 'física', 'universo', 'ciencia'],
    language: 'es',
    content: `# El Big Bang

La teoría del Big Bang es la principal explicación científica de cómo comenzó el universo. Sostiene que, hace unos **13 800 millones de años**, el universo partió de un estado extraordinariamente caliente y denso, y desde entonces se ha estado expandiendo y enfriando.

## Una idea equivocada común

El Big Bang no fue una explosión *hacia* un espacio vacío. Más bien, el propio espacio empezó a expandirse en todas partes a la vez. No hay un único "centro" del universo; cada región se aleja de todas las demás, como puntos en la superficie de un globo que se infla.

## Las pruebas

Tres grandes observaciones respaldan la teoría:

- **El universo en expansión.** En la década de 1920, Edwin Hubble descubrió que las galaxias lejanas se alejan de nosotros, y tanto más rápido cuanto más lejos están. Rebobinar esta expansión apunta a un comienzo denso.
- **El fondo cósmico de microondas (CMB).** Un tenue resplandor de radiación de microondas llena todo el cielo: el resplandor remanente y enfriado del universo primitivo y caliente, predicho antes de hallarse en 1965.
- **La abundancia de elementos ligeros.** La teoría predice con exactitud las proporciones de hidrógeno, helio y litio que se formaron en los primeros minutos del universo.

## Qué dice y qué no

El Big Bang describe la *evolución* del universo desde una fracción de segundo en adelante, no el "porqué" último ni qué, si es que algo, hubo "antes". Quedan preguntas abiertas, incluida la naturaleza de la **materia oscura** y la **energía oscura**, que juntas constituyen la mayor parte del contenido del universo y rigen su expansión en curso.`,
  },
  {
    title: 'Los eclipses',
    question: '¿Cuál es la diferencia entre un eclipse solar y uno lunar?',
    summary:
      'Los eclipses ocurren cuando el Sol, la Tierra y la Luna se alinean: un eclipse solar sucede cuando la Luna bloquea el Sol, y uno lunar cuando la sombra de la Tierra cae sobre la Luna.',
    tags: ['astronomía', 'luna', 'sol', 'espacio', 'ciencia'],
    language: 'es',
    content: `# Los eclipses

Un eclipse ocurre cuando el Sol, la Tierra y la Luna se alinean de modo que uno proyecta una sombra sobre otro, o le bloquea la vista. Hay dos tipos principales, y es fácil confundirlos.

## Eclipse solar

Un **eclipse solar** ocurre durante la luna nueva, cuando **la Luna pasa entre el Sol y la Tierra**, bloqueando la luz del Sol. Como la sombra de la Luna es pequeña, solo lo ve la gente situada en una franja estrecha de la Tierra.

- En un eclipse solar **total**, la Luna cubre por completo el Sol, revelando por un instante la tenue atmósfera exterior del Sol (la corona) y convirtiendo el día en penumbra.
- Una coincidencia notable lo hace posible: el Sol es unas 400 veces más ancho que la Luna, pero también está unas 400 veces más lejos, así que ambos parecen del mismo tamaño en nuestro cielo.

⚠️ Mirar directamente un eclipse solar sin filtros adecuados puede dañar los ojos.

## Eclipse lunar

Un **eclipse lunar** ocurre durante la luna llena, cuando **la Tierra pasa entre el Sol y la Luna**, proyectando su sombra sobre la Luna. Se ve desde cualquier lugar del lado nocturno de la Tierra y es completamente seguro de observar.

Durante un eclipse lunar total, la Luna suele brillar de un rojo cobrizo —una "**luna de sangre**"— porque parte de la luz solar se curva al atravesar la atmósfera terrestre y cae sobre la Luna, filtrada hacia el rojo igual que los atardeceres.

## Por qué no cada mes

La órbita de la Luna está inclinada unos 5° respecto a la órbita de la Tierra alrededor del Sol, así que los tres cuerpos no suelen alinearse con precisión. Esa inclinación es la razón por la que los eclipses ocurren solo unas pocas veces al año y no cada mes.`,
  },
];
