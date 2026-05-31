import type { DraftArticle } from '../types';

// Portuguese (pt) translations of the editorial drafts. Faithful, natural
// translations of the English originals; tags are localized. Built up batch
// by batch.
export const pt: DraftArticle[] = [
  // ── Batch 1: Ciência e natureza ──
  {
    title: 'A fotossíntese',
    question: 'Como as plantas transformam a luz do sol em alimento?',
    summary:
      'A fotossíntese é o processo pelo qual plantas, algas e algumas bactérias convertem energia luminosa, água e dióxido de carbono em energia química armazenada como açúcares, liberando oxigênio como subproduto.',
    tags: ['biologia', 'plantas', 'energia', 'química', 'ciência'],
    language: 'pt',
    content: `# A fotossíntese

A fotossíntese é o processo bioquímico que permite a plantas, algas e certas bactérias fabricar o próprio alimento a partir da luz. É a base de quase todas as cadeias alimentares da Terra e a fonte do oxigênio que respiramos.

## A reação básica

De forma simplificada, a fotossíntese combina dióxido de carbono e água, usando energia luminosa, para produzir glicose e oxigênio:

\`\`\`
6 CO2 + 6 H2O + energia luminosa -> C6H12O6 + 6 O2
\`\`\`

O açúcar (glicose) armazena energia química que o organismo usa depois para crescer e fazer o metabolismo. O oxigênio é liberado na atmosfera.

## Duas etapas

- **Reações dependentes de luz.** Nas membranas de estruturas chamadas tilacoides, o pigmento verde **clorofila** absorve a luz. Essa energia quebra as moléculas de água, libera oxigênio e é capturada em dois transportadores de energia, o ATP e o NADPH.
- **O ciclo de Calvin (reações independentes de luz).** No fluido circundante (o estroma), o ATP e o NADPH alimentam uma série de reações que fixam o dióxido de carbono em açúcar.

## Por que importa

A fotossíntese retira dióxido de carbono do ar e o prende no tecido vivo, o que a torna central para o ciclo global do carbono e a regulação do clima. Os combustíveis fósseis são, na prática, luz solar antiga capturada pela fotossíntese há milhões de anos.

## Variações

Plantas de climas quentes e secos costumam usar vias adaptadas — chamadas fotossíntese **C4** e **CAM** — que reduzem a perda de água e melhoram a eficiência sob estresse. Isso explica por que culturas como o milho e a cana-de-açúcar prosperam sob sol intenso.`,
  },
  {
    title: 'O ciclo da água',
    question: 'Como a água se move pelo planeta?',
    summary:
      'O ciclo da água é o movimento contínuo da água por evaporação, condensação, precipitação e escoamento, que redistribui a água doce pela Terra.',
    tags: ['ciências da terra', 'água', 'clima', 'geografia', 'ciência'],
    language: 'pt',
    content: `# O ciclo da água

O ciclo da água, ou ciclo hidrológico, descreve como a água circula sem cessar entre os oceanos, a atmosfera e a terra. A quantidade total de água na Terra permanece praticamente constante; o ciclo apenas a desloca entre diferentes reservatórios.

## Etapas principais

- **Evaporação.** O calor do Sol transforma a água líquida — em sua maioria dos oceanos — em vapor. As plantas acrescentam umidade pela **transpiração**, e ambas juntas são por vezes chamadas de *evapotranspiração*.
- **Condensação.** Ao subir e esfriar, o vapor se condensa em torno de partículas minúsculas e forma nuvens.
- **Precipitação.** Quando as gotas ficam pesadas o bastante, caem como chuva, neve, granizo fino ou granizo.
- **Coleta e escoamento.** A água se reúne em rios, lagos e oceanos, ou se infiltra no solo para recarregar os aquíferos, e por fim retorna ao mar.

## Reservatórios e tempo de residência

A água pode passar tempos muito diferentes em cada reservatório — dias na atmosfera, mas milhares de anos nas águas subterrâneas profundas ou no gelo polar. Esses "tempos de residência" determinam a rapidez com que os efeitos da poluição ou da seca se movem pelo sistema.

## Por que importa

O ciclo da água leva água doce aos ecossistemas e à agricultura, molda o clima e a erosão e regula a temperatura ao deslocar enormes quantidades de calor. A atividade humana — represar rios, drenar áreas úmidas e aquecer o clima — pode intensificar enchentes e secas ao alterar o equilíbrio do ciclo.`,
  },
  {
    title: 'A tectônica de placas',
    question: 'Por que os continentes se movem e ocorrem terremotos?',
    summary:
      'A tectônica de placas é a teoria de que a camada externa da Terra está dividida em placas móveis cujas interações formam montanhas e oceanos e provocam terremotos e vulcões.',
    tags: ['ciências da terra', 'geologia', 'terremotos', 'vulcões', 'ciência'],
    language: 'pt',
    content: `# A tectônica de placas

A tectônica de placas é a teoria que unifica a geologia. Explica que a camada externa rígida da Terra — a **litosfera** — está dividida em cerca de uma dúzia de grandes placas e várias menores que se deslocam lentamente sobre a rocha mais quente e parcialmente fundida que há abaixo.

## O que impulsiona o movimento

As placas repousam sobre a **astenosfera**, uma camada dúctil do manto superior. O calor que escapa do interior da Terra gera uma lenta convecção, e forças como o puxão das lajes densas que afundam ("tração de placa") movem as placas alguns centímetros por ano — mais ou menos a velocidade com que crescem as unhas.

## Três tipos de limites

- **Divergentes.** As placas se afastam e o magma sobe para formar nova crosta — por exemplo, ao longo da Dorsal Mesoatlântica.
- **Convergentes.** As placas colidem. Uma pode mergulhar sob a outra (**subducção**), formando fossas profundas, vulcões e terremotos; ou dois continentes podem se enrugar e erguer montanhas como o Himalaia.
- **Transformantes.** As placas deslizam horizontalmente uma ao lado da outra, como na falha de San Andreas, na Califórnia, acumulando tensão que se libera em terremotos.

## Provas

A teoria surgiu de ideias anteriores sobre a deriva continental. Litorais que se encaixam, fósseis idênticos em continentes hoje distantes e os padrões magnéticos em faixas congelados na rocha do fundo oceânico confirmaram que as placas reorganizaram o globo ao longo de centenas de milhões de anos — e continuam a fazê-lo.`,
  },
  {
    title: 'O sistema imunológico humano',
    question: 'Como o corpo se defende das doenças?',
    summary:
      'O sistema imunológico é uma rede em camadas de células, tecidos e moléculas que detecta e neutraliza patógenos enquanto distingue as próprias células do corpo das ameaças externas.',
    tags: ['biologia', 'medicina', 'saúde', 'corpo humano', 'ciência'],
    language: 'pt',
    content: `# O sistema imunológico humano

O sistema imunológico é a rede de defesa do corpo contra bactérias, vírus, fungos e outras ameaças. Funciona em camadas sobrepostas, das barreiras físicas a respostas celulares muito específicas.

## Imunidade inata

A primeira linha de defesa é rápida, mas geral. Inclui barreiras físicas como a pele e o muco, além de células como os **macrófagos** e os **neutrófilos**, que engolem os invasores. A inflamação e a febre fazem parte dessa resposta rápida, pensada para frear os patógenos e recrutar ajuda.

## Imunidade adaptativa

Se a ameaça persiste, o sistema **adaptativo** monta um ataque dirigido:

- Os **linfócitos B** produzem **anticorpos**: proteínas que se prendem a moléculas específicas (antígenos) de um patógeno e o marcam para destruição.
- Os **linfócitos T** matam diretamente as células infectadas ou coordenam a resposta mais ampla.

Uma característica crucial é a **memória**: depois de uma infecção, restam células de memória de longa vida, de modo que o corpo responde muito mais rápido se o mesmo patógeno voltar. É o princípio da **vacinação**, que treina o sistema imunológico com uma versão ou um fragmento inofensivo de um patógeno.

## Quando algo dá errado

O sistema deve distinguir o "próprio" do "alheio". Suas falhas levam a **doenças autoimunes** (atacar o próprio tecido), **alergias** (reagir em excesso a substâncias inofensivas) ou **imunodeficiência** (uma resposta fraca demais). Equilibrar a sensibilidade e a contenção é uma das mais notáveis conquistas da biologia.`,
  },
  {
    title: 'As mitocôndrias',
    question: 'Por que as mitocôndrias são chamadas de usina de energia da célula?',
    summary:
      'As mitocôndrias são organelas que geram a maior parte da energia utilizável de uma célula pela respiração e carregam o próprio DNA, herdado de um distante ancestral bacteriano.',
    tags: ['biologia', 'células', 'energia', 'genética', 'ciência'],
    language: 'pt',
    content: `# As mitocôndrias

As mitocôndrias são estruturas minúsculas dentro da maioria das nossas células, famosas como a "usina de energia da célula" porque produzem a maior parte da energia que move a vida.

## Produzir energia

As mitocôndrias realizam a **respiração aeróbica**, convertendo nutrientes e oxigênio em **ATP** (trifosfato de adenosina), a molécula que as células usam como moeda de energia. O processo ocorre na membrana interna dobrada da mitocôndria, cujas dobras (cristas) aumentam a superfície disponível para as reações que produzem energia. Uma única célula pode abrigar de uma a milhares de mitocôndrias conforme suas necessidades de energia; as células musculares e cardíacas são especialmente ricas nelas.

## Um ancestral bacteriano

As mitocôndrias têm o próprio pequeno anel de DNA e se reproduzem dividindo-se, tal como as bactérias. Isso apoia a **teoria endossimbiótica**: as mitocôndrias descendem de bactérias de vida livre engolidas por uma célula primitiva há cerca de dois bilhões de anos e que se tornaram parceiras permanentes.

## Herdadas pela mãe

Como os espermatozoides quase não contribuem com mitocôndrias, o **DNA mitocondrial** se transmite pela linhagem materna quase sem mudanças. Os geneticistas o usam para rastrear a ascendência e as migrações humanas até um passado remoto.

## Vínculos com a saúde

Defeitos das mitocôndrias podem causar diversos distúrbios hereditários, e o declínio mitocondrial é estudado como fator do envelhecimento e de doenças como o Parkinson.`,
  },
  {
    title: 'As correntes oceânicas',
    question: 'O que faz a água do mar circular em laços gigantes pelo mundo?',
    summary:
      'As correntes oceânicas são fluxos de água do mar em grande escala impulsionados por vento, temperatura e salinidade; redistribuem o calor pelo planeta e moldam os climas regionais.',
    tags: ['ciências da terra', 'oceanografia', 'clima', 'geografia', 'ciência'],
    language: 'pt',
    content: `# As correntes oceânicas

As correntes oceânicas são movimentos contínuos e direcionados da água do mar. Atuam como um sistema circulatório que abrange o planeta, transportando calor, nutrientes e vida marinha por milhares de quilômetros.

## Correntes de superfície

Perto da superfície, as correntes são impulsionadas sobretudo pelo **vento**. A rotação da Terra desvia suas trajetórias pelo **efeito Coriolis**, organizando-as em grandes sistemas giratórios chamados **giros**. A Corrente do Golfo, por exemplo, leva água quente dos trópicos rumo à Europa, dando à Europa Ocidental um clima mais ameno do que se esperaria por sua latitude.

## Circulação profunda

Abaixo da superfície, as correntes são impulsionadas por diferenças de **densidade**, que depende da temperatura e da salinidade. A água fria e salgada perto dos polos afunda e flui pelo fundo oceânico, enquanto a água mais quente sobe em outros lugares. Esse lento laço global é chamado de **circulação termoalina** ou "esteira transportadora oceânica", e um percurso completo pode levar cerca de mil anos.

## Por que importam

As correntes moderam as temperaturas globais ao deslocar calor do equador para os polos. Impulsionam a **ressurgência** de nutrientes que sustenta algumas das pescarias mais ricas do mundo e influenciam padrões do clima como o El Niño. Como a esteira depende de que a água polar fria e densa afunde, os cientistas vigiam sinais de que o degelo e o aquecimento do mar possam enfraquecê-la.`,
  },
  {
    title: 'O efeito estufa',
    question: 'Como os gases da atmosfera mantêm a Terra aquecida?',
    summary:
      'O efeito estufa é o aquecimento que ocorre quando certos gases atmosféricos retêm o calor irradiado pela superfície da Terra, mantendo o planeta habitável, mas intensificando-se à medida que esses gases aumentam.',
    tags: ['clima', 'ciências da terra', 'atmosfera', 'meio ambiente', 'ciência'],
    language: 'pt',
    content: `# O efeito estufa

O efeito estufa é o processo natural que mantém a Terra quente o bastante para sustentar a vida. Sem ele, a temperatura média da superfície do planeta estaria muito abaixo do ponto de congelamento.

## Como funciona

A luz do sol atravessa a atmosfera e aquece a superfície da Terra. A superfície então irradia essa energia de volta para fora como radiação **infravermelha** (calor). Certos gases — sobretudo o **dióxido de carbono, o metano, o vapor d'água e o óxido nitroso** — absorvem parte desse infravermelho que sai e o reemitem em todas as direções, inclusive de volta ao solo. O resultado é que o calor permanece na atmosfera baixa em vez de escapar direto para o espaço.

O nome vem de uma vaga analogia com uma estufa, embora uma estufa real se aqueça sobretudo por bloquear o movimento do ar, e não por reter o infravermelho.

## O equilíbrio natural

Durante a maior parte da história, a quantidade de gases de efeito estufa e a energia que deixa a Terra mantiveram-se em equilíbrio aproximado, conservando o clima relativamente estável.

## A influência humana

A queima de combustíveis fósseis, o desmatamento e a agricultura elevaram as concentrações de dióxido de carbono e metano a níveis nunca vistos em centenas de milhares de anos. Esse efeito estufa **intensificado** desequilibra a balança e faz o planeta reter mais calor. As consequências incluem a alta das temperaturas globais, mudanças nos padrões do clima, o degelo e a elevação do nível do mar — o mecanismo central da mudança climática moderna.`,
  },
  {
    title: 'A bioluminescência',
    question: 'Como e por que alguns seres vivos brilham no escuro?',
    summary:
      'A bioluminescência é a produção de luz por organismos vivos por meio de uma reação química, usada para comunicação, camuflagem, atrair presas e encontrar parceiros.',
    tags: ['biologia', 'química', 'oceanografia', 'animais', 'ciência'],
    language: 'pt',
    content: `# A bioluminescência

A bioluminescência é a capacidade de organismos vivos de produzir a própria luz. De vaga-lumes que piscam numa noite de verão a ondas que brilham numa praia escura, ela aparece por toda a árvore da vida — e é especialmente comum no mar profundo.

## A química

O brilho vem de uma reação química e não do calor, o que faz dela uma forma de "luz fria" que quase não desperdiça energia. Uma molécula emissora de luz chamada **luciferina** reage com o oxigênio, com a ajuda de uma enzima chamada **luciferase**. A reação libera energia como luz visível, em geral azul ou verde — as cores que vão mais longe na água do mar.

## Por que os organismos brilham

A bioluminescência cumpre muitas funções:

- **Atrair presas.** O peixe-pescador balança uma isca brilhante diante da boca.
- **Defesa.** Algumas lulas soltam nuvens brilhantes para confundir predadores; outras usam a luz para se misturar ao tênue brilho que vem de cima (contrailuminação).
- **Comunicação e corte.** Os vaga-lumes emitem flashes com padrões próprios de cada espécie para encontrar parceiros.
- **Simbiose.** Muitos animais não produzem luz por si mesmos, mas abrigam bactérias luminosas em órgãos especiais.

## No oceano profundo

A luz se apaga em escuridão algumas centenas de metros abaixo, e abaixo disso a imensa maioria dos animais consegue produzir luz. Nesse mundo sem luz, a bioluminescência é menos uma curiosidade do que uma língua primordial de sobrevivência.`,
  },
  // ── Batch 2: História e sociedade ──
  {
    title: 'A Rota da Seda',
    question: 'O que foi a Rota da Seda e por que ela importou?',
    summary:
      'A Rota da Seda foi uma rede de rotas comerciais que ligou a Ásia Oriental ao Mediterrâneo por mais de mil anos, transportando mercadorias, tecnologias, religiões e ideias entre civilizações.',
    tags: ['história', 'comércio', 'ásia', 'civilização', 'geografia'],
    language: 'pt',
    content: `# A Rota da Seda

A Rota da Seda não foi uma única estrada pavimentada, mas uma vasta rede de rotas terrestres e marítimas que ligava a China, a Ásia Central, a Índia, a Pérsia e o mundo mediterrâneo. Ativa de cerca do século II a.C. ao século XV, moldou o desenvolvimento de cada sociedade que tocou.

## Mais que seda

A seda chinesa foi o luxo que deu à rede seu nome moderno (cunhado por um geógrafo do século XIX), mas inúmeros bens circulavam por ela: especiarias, chá, porcelana, vidro, metais preciosos, cavalos e papel. Poucos comerciantes percorriam toda a distância; em vez disso, as mercadorias passavam de mão em mão por uma cadeia de mercadores e cidades-oásis como Samarcanda e Caxgar.

## Uma estrada para as ideias

O impacto mais profundo da rota foi cultural. O **budismo** se difundiu da Índia para a China por esses caminhos, enquanto o islã, o cristianismo e o maniqueísmo também viajavam com os mercadores. Tecnologias cruciais — o **papel, a pólvora e a bússola** — moveram-se para o oeste, transformando as sociedades que as receberam.

## Doença e declínio

As mesmas conexões que levavam o comércio também levavam doença; muitos historiadores ligam a Rota da Seda à propagação da **peste negra** no século XIV. A rede declinou aos poucos à medida que as rotas marítimas ficavam mais baratas e seguras e os impérios terrestres se fragmentavam.

## Legado

A Rota da Seda é lembrada como um dos grandes motores de intercâmbio da história — prova de que civilizações distantes estavam conectadas muito antes e muito mais profundamente do que se acreditava.`,
  },
  {
    title: 'A imprensa',
    question: 'Como a imprensa mudou o mundo?',
    summary:
      'A imprensa, aperfeiçoada por Johannes Gutenberg por volta de 1440, tornou os livros baratos e abundantes, acelerando a alfabetização, a ciência, a reforma religiosa e a difusão de ideias pela Europa.',
    tags: ['história', 'tecnologia', 'comunicação', 'cultura', 'europa'],
    language: 'pt',
    content: `# A imprensa

A imprensa é uma das invenções mais decisivas da história. Ao mecanizar a cópia de textos, transformou os livros de tesouros raros copiados à mão em objetos produzidos em massa.

## O avanço de Gutenberg

A impressão com blocos entalhados já existia na Ásia Oriental, mas por volta de 1440 o ourives alemão **Johannes Gutenberg** reuniu várias inovações num sistema prático: **tipos móveis de metal** duráveis, uma tinta à base de óleo que aderia ao metal e uma prensa de parafuso adaptada da produção de vinho. Sua **Bíblia de 42 linhas** (c. 1455) mostrou que o método podia rivalizar com a beleza dos manuscritos a uma fração do custo.

## Uma explosão de informação

Antes da imprensa, um escriba podia levar meses para copiar um único livro. Depois, uma oficina de impressão podia produzir centenas de cópias idênticas no mesmo tempo. Em 1500, as prensas de toda a Europa haviam produzido milhões de volumes. Os preços caíram, a alfabetização cresceu e os textos padronizados permitiram que o conhecimento se acumulasse de forma confiável.

## Remodelar a sociedade

As consequências foram profundas:

- A **Reforma Protestante** se espalhou rapidamente porque panfletos e Bíblias traduzidas chegavam aos leitores comuns.
- A **Revolução Científica** dependeu de que os estudiosos compartilhassem diagramas e dados precisos através das fronteiras.
- A impressão padronizada ajudou a estabilizar as línguas nacionais e a difundir a literatura em língua vernácula.

## Legado

A imprensa é muitas vezes vista como a primeira tecnologia da informação a democratizar o conhecimento — precursora de cada salto posterior, dos jornais à internet.`,
  },
  {
    title: 'A Revolução Industrial',
    question: 'O que foi a Revolução Industrial e como transformou a sociedade?',
    summary:
      'A Revolução Industrial foi a passagem da produção manual para a fabricação por máquinas, iniciada na Inglaterra do século XVIII, que remodelou economias, cidades, o trabalho e a vida cotidiana no mundo todo.',
    tags: ['história', 'economia', 'tecnologia', 'sociedade', 'indústria'],
    language: 'pt',
    content: `# A Revolução Industrial

A Revolução Industrial foi um período de mudança drástica, iniciado na Grã-Bretanha por volta de 1760, em que as economias passaram da agricultura e do artesanato para a indústria mecanizada e a produção em fábricas.

## Por que a Grã-Bretanha, por que então

Vários fatores se combinaram: **carvão** abundante como combustível, jazidas de ferro, capital vindo do comércio, mão de obra deixando o campo e uma onda de invenções práticas. A **máquina a vapor** aprimorada, aperfeiçoada por James Watt, deu às fábricas uma fonte de energia potente e independente do local. As máquinas têxteis mecanizadas multiplicaram a produção de um único trabalhador.

## Da fazenda à fábrica

A produção saiu das casas dispersas para **fábricas** centralizadas, erguidas perto da energia e do transporte. O ferro, e depois o aço, tornaram possíveis máquinas e ferrovias; os canais e depois a ferrovia baratearam drasticamente o transporte de mercadorias. As cidades incharam à medida que as pessoas migravam para o trabalho industrial.

## Custos e benefícios

A revolução acabou elevando o padrão de vida e a expectativa de vida e criou indústrias inteiramente novas. Mas suas primeiras décadas trouxeram condições duras: jornadas longas, trabalho infantil, máquinas perigosas, cortiços superlotados e poluição. Essas agruras alimentaram os movimentos operários, as leis de reforma e novas ideias políticas sobre os direitos dos trabalhadores.

## Um ponto de virada duradouro

Uma "Segunda Revolução Industrial" no fim do século XIX acrescentou a eletricidade, a química e a produção em massa. Juntas, essas transformações fixaram o molde do mundo industrial moderno — e iniciaram o aumento do uso de combustíveis fósseis que hoje impulsiona os desafios do clima.`,
  },
  {
    title: 'As origens da escrita',
    question: 'Quando e por que os humanos inventaram a escrita?',
    summary:
      'A escrita foi inventada de forma independente em várias civilizações antigas, começando na Mesopotâmia por volta de 3400 a.C., originalmente para manter registros econômicos antes de evoluir para captar plenamente a linguagem.',
    tags: ['história', 'língua', 'civilização', 'comunicação', 'cultura'],
    language: 'pt',
    content: `# As origens da escrita

A escrita — o registro da linguagem por sinais visíveis e duradouros — é uma das invenções que definem a humanidade. Surgiu de forma independente em ao menos alguns lugares e, a cada vez, transformou as sociedades que a desenvolveram.

## Nascida da contabilidade

A escrita mais antiga conhecida vem da **Mesopotâmia** (o atual Iraque) por volta de 3400-3200 a.C. Não começou como literatura, mas como **contabilidade**: os administradores dos templos precisavam controlar o grão, o gado e o comércio. Simples desenhos gravados em argila tornaram-se aos poucos as marcas em forma de cunha conhecidas como **cuneiforme**, traçadas com um estilete de junco.

## Invenções independentes

A escrita também surgiu por conta própria no **Egito** (os hieróglifos), na **China** (os ancestrais dos caracteres chineses, usados para adivinhação) e na **Mesoamérica** (os maias e seus predecessores). O fato de ter sido inventada mais de uma vez mostra que respondia a uma necessidade profunda das sociedades complexas.

## Dos desenhos aos sons

As primeiras escritas misturavam símbolos para coisas com símbolos para sons. Um grande salto foi o **alfabeto** — um pequeno conjunto de sinais que representam sons individuais —, que remonta a povos de língua semítica por volta de 1800 a.C. e foi depois adaptado por fenícios e gregos. Os alfabetos tornaram a leitura e a escrita mais fáceis de aprender e difundir.

## Por que importou

A escrita permitiu que o conhecimento, as leis, os contratos e os relatos sobrevivessem a quem os criou. Tornou os impérios governáveis, permitiu que a ciência se acumulasse e transformou a memória de um frágil ato pessoal num registro compartilhado e duradouro.`,
  },
  {
    title: 'A inflação',
    question: 'O que causa a inflação e por que ela importa?',
    summary:
      'A inflação é uma alta sustentada do nível geral de preços, que reduz o poder de compra do dinheiro; uma inflação moderada é normal, mas uma inflação alta ou instável prejudica as economias.',
    tags: ['economia', 'finanças', 'dinheiro', 'política', 'sociedade'],
    language: 'pt',
    content: `# A inflação

A inflação é o ritmo em que o nível geral de preços de bens e serviços sobe ao longo do tempo. Quando há inflação, cada unidade de moeda compra um pouco menos do que antes — o dinheiro perde poder de compra.

## Como é medida

Os economistas medem a inflação com **índices de preços**, sendo o mais comum o Índice de Preços ao Consumidor (IPC), que acompanha o custo de uma "cesta" representativa de bens e serviços do dia a dia. Se a cesta custa 3% a mais do que um ano antes, a inflação anual é de 3%.

## O que a causa

A inflação costuma surgir de duas grandes forças:

- **Puxão da demanda.** Quando a demanda supera o que uma economia pode produzir, os compradores empurram os preços para cima.
- **Empurrão dos custos.** Quando o custo de insumos como energia ou trabalho sobe, as empresas o repassam.

Sob ambas, a maioria dos economistas sustenta que a inflação sustentada está intimamente ligada ao crescimento da **oferta de moeda** em relação à produção real.

## Por que importa

Um pouco de inflação — os bancos centrais costumam mirar em torno de 2% — é considerado saudável, pois estimula o gasto e o investimento e evita os perigos da queda de preços (**deflação**). Mas uma inflação alta corrói as poupanças, distorce as decisões e pode sair do controle, como nos casos de **hiperinflação** em que os preços dobram em dias.

## Como é administrada

Os bancos centrais combatem a inflação excessiva sobretudo elevando as **taxas de juros**, o que esfria o endividamento e o gasto. Equilibrar a inflação com o emprego e o crescimento é um dos desafios centrais da política econômica.`,
  },
  {
    title: 'O método científico',
    question: 'Como a ciência realmente funciona?',
    summary:
      'O método científico é uma abordagem sistemática para construir conhecimento por meio de observação, hipótese, experimento e revisão, que valoriza as provas e a testabilidade acima da autoridade.',
    tags: ['ciência', 'filosofia', 'método', 'história', 'educação'],
    language: 'pt',
    content: `# O método científico

O método científico é o processo disciplinado que a ciência usa para investigar o mundo. Mais do que uma receita rígida, é uma postura baseada em testar ideias contra as provas e estar disposto a descartar as que falham.

## O ciclo central

Um ciclo típico passa por várias etapas:

1. **Observação.** Notar um fenômeno ou um enigma.
2. **Pergunta.** Formular algo específico sobre ele.
3. **Hipótese.** Propor uma explicação testável — uma afirmação que, em princípio, poderia ser demonstrada falsa.
4. **Previsão.** Deduzir o que deveria acontecer se a hipótese for verdadeira.
5. **Experimento.** Testar a previsão em condições controladas, idealmente variando um único fator de cada vez.
6. **Análise e revisão.** Comparar os resultados com a previsão e então refinar, rejeitar ou ampliar a hipótese.

## Princípios-chave

- **Testabilidade e falseabilidade.** Uma afirmação científica deve fazer previsões que possam falhar. Ideias que explicam tudo e não proíbem nada não são científicas.
- **Reprodutibilidade.** Outros devem poder repetir um experimento e obter o mesmo resultado.
- **Revisão por pares.** Os trabalhos novos são examinados por outros especialistas antes de serem amplamente aceitos.
- **Conhecimento provisório.** Mesmo teorias bem fundamentadas permanecem abertas à revisão se surgirem provas melhores.

## Por que funciona

Ao exigir provas e convidar à crítica, o método científico corrige seus próprios erros ao longo do tempo. Não promete certeza, mas mostrou-se extraordinariamente poderoso para produzir uma compreensão confiável e cumulativa da natureza.`,
  },
  {
    title: 'A democracia ateniense',
    question: 'Como a democracia começou na Atenas antiga?',
    summary:
      'A democracia ateniense, desenvolvida no século V a.C., foi um sistema precoce de autogoverno direto dos cidadãos, influente como ancestral das ideias democráticas modernas apesar de seus limites marcantes.',
    tags: ['história', 'política', 'grécia', 'democracia', 'civilização'],
    language: 'pt',
    content: `# A democracia ateniense

A Atenas antiga é muitas vezes chamada de berço da democracia. Nos séculos V e IV a.C. desenvolveu um sistema em que os cidadãos comuns, e não os reis nem uma elite estreita, tomavam as decisões do Estado.

## Como funcionava

A democracia ateniense era **direta**, não representativa. As grandes decisões eram tomadas pela **Assembleia (Eclésia)**, aberta a todos os cidadãos com direito, que debatiam e votavam pessoalmente sobre leis, guerra e política. Um **Conselho dos Quinhentos**, escolhido por sorteio, preparava a pauta, e a maioria dos cargos públicos e dos júris também era preenchida por **sorteio** em vez de eleição — um esforço deliberado para impedir a concentração de poder.

## Reformadores-chave

O caminho passou por várias figuras: **Sólon** aliviou as dívidas e ampliou a participação; **Clístenes**, por volta de 508 a.C., reorganizou os cidadãos em novos grupos que atravessavam as antigas lealdades e é muitas vezes considerado o fundador do sistema; e **Péricles** presidiu seu ápice maduro e seguro.

## Limites marcantes

Pelos padrões modernos, o sistema era estreito. A cidadania — e, portanto, a voz política — excluía **as mulheres, as pessoas escravizadas e os residentes estrangeiros**, deixando participar apenas uma minoria da população.

## Legado

Apesar desses limites, a democracia ateniense introduziu ideias duradouras: que a autoridade legítima pode residir nos governados, que os cidadãos devem deliberar abertamente e que ninguém está acima da lei. Esses princípios ecoaram no Iluminismo e se incorporaram ao desenho das democracias modernas.`,
  },
  {
    title: 'O padrão-ouro',
    question: 'O que foi o padrão-ouro e por que os países o abandonaram?',
    summary:
      'O padrão-ouro foi um sistema monetário em que o valor de uma moeda era fixado a uma quantidade específica de ouro; estabilizava as taxas de câmbio, mas limitava a flexibilidade, e foi abandonado no século XX.',
    tags: ['economia', 'história', 'dinheiro', 'finanças', 'política'],
    language: 'pt',
    content: `# O padrão-ouro

O padrão-ouro foi um sistema em que o valor do dinheiro de um país estava diretamente ligado ao ouro. Sob um padrão-ouro pleno, o papel-moeda podia ser trocado, sob demanda, por uma quantidade fixa do metal.

## Como funcionava

Cada unidade de moeda representava um peso definido de ouro, e os governos comprometiam-se a converter as cédulas em ouro a essa taxa. Como muitos países ligavam suas moedas ao ouro, as taxas de câmbio entre elas eram de fato **fixas**, o que tornava o comércio e o investimento internacionais mais previsíveis.

## Vantagens

Seus defensores valorizavam o padrão-ouro pela **estabilidade** e pela **disciplina**. Como o dinheiro era lastreado por uma mercadoria física limitada, os governos não podiam imprimir moeda com facilidade para financiar gastos, o que tendia a manter baixa a inflação de longo prazo e a gerar confiança na moeda.

## As desvantagens

Essa mesma rigidez era sua fraqueza. A oferta de moeda estava presa às reservas de ouro em vez das necessidades da economia, de modo que os governos tinham pouca margem para responder a recessões, crises bancárias ou choques. Muitos economistas sustentam que o padrão-ouro aprofundou e espalhou a **Grande Depressão** dos anos 1930, pois os países se agarravam a ele em vez de estimular suas economias.

## O fim do ouro

As nações se desvincularam do ouro por etapas. O sistema desmoronou de vez em 1971, quando os Estados Unidos puseram fim à conversibilidade do dólar em ouro. Hoje o mundo usa **moeda fiduciária**, cujo valor repousa na credibilidade dos governos e dos bancos centrais, e não numa mercadoria física.`,
  },
  // ── Batch 3: Tecnologia e matemática ──
  {
    title: 'Como funciona o GPS',
    question: 'Como o GPS sabe exatamente onde você está?',
    summary:
      'O GPS determina a localização medindo o tempo de viagem dos sinais de vários satélites e usando trilateração; relógios atômicos precisos e correções relativísticas o tornam exato em poucos metros.',
    tags: ['tecnologia', 'navegação', 'satélites', 'física', 'engenharia'],
    language: 'pt',
    content: `# Como funciona o GPS

O Sistema de Posicionamento Global (GPS) permite a um receptor — no seu telefone, carro ou relógio — descobrir onde está em qualquer lugar da Terra, em geral com margem de poucos metros. Apoia-se numa constelação de satélites e em alguma física engenhosa.

## Satélites e sinais

O GPS usa cerca de 30 satélites em órbita a aproximadamente 20 000 km de altitude, dispostos de modo que sempre haja vários visíveis de qualquer ponto do planeta. Cada um emite sem parar um sinal de rádio que carrega a **hora** exata em que foi enviado e a **posição** do satélite.

## Trilateração

O receptor mede quanto tempo cada sinal levou para chegar. Como as ondas de rádio viajam à velocidade da luz, o tempo de viagem revela a **distância** até aquele satélite. Conhecer a distância a um satélite coloca você em algum ponto de uma esfera ao redor dele; combinar as distâncias a vários satélites reduz sua posição a um único ponto. Essa técnica geométrica chama-se **trilateração**. São necessários sinais de pelo menos quatro satélites — três para fixar a posição e um quarto para resolver o erro de relógio do receptor.

## Por que relógios e relatividade importam

A sincronização precisa ser extraordinariamente exata: um erro de um milionésimo de segundo desviaria a posição em centenas de metros. Os satélites levam **relógios atômicos**, e o sistema corrige até a **relatividade de Einstein** — a velocidade dos satélites e sua gravidade mais fraca fazem seus relógios andar a um ritmo um pouco diferente dos relógios em terra. Sem essas correções, o GPS se desviaria quilômetros por dia.

## Além do posicionamento

A mesma sincronização precisa sustenta as redes financeiras, as redes elétricas e as telecomunicações, fazendo do GPS uma espinha dorsal silenciosa da infraestrutura moderna.`,
  },
  {
    title: 'A criptografia de chave pública',
    question: 'Como dois desconhecidos podem se comunicar com segurança pela internet aberta?',
    summary:
      'A criptografia de chave pública usa pares de chaves ligadas matematicamente — uma pública e uma privada — para que as pessoas cifrem mensagens e verifiquem identidades sem jamais compartilhar um segredo de antemão.',
    tags: ['tecnologia', 'criptografia', 'segurança', 'matemática', 'internet'],
    language: 'pt',
    content: `# A criptografia de chave pública

A criptografia de chave pública é o avanço que torna possível a comunicação segura entre pessoas que nunca se conheceram. Sustenta o HTTPS, as mensagens seguras, as assinaturas digitais e as criptomoedas.

## A ideia do par de chaves

A cifragem tradicional ("simétrica") usa uma única chave compartilhada para trancar e destrancar uma mensagem — o que cria um problema: como compartilhar essa chave com segurança no início? A criptografia de chave pública (ou **assimétrica**) resolve isso com um **par** de chaves:

- Uma **chave pública**, que qualquer um pode ver.
- Uma **chave privada**, que o dono mantém em segredo.

As duas estão ligadas matematicamente de modo que o que uma chave tranca, só a outra pode destrancar — mas conhecer a chave pública não permite calcular a privada.

## Dois usos principais

- **Cifragem.** Para enviar a alguém uma mensagem confidencial, você a cifra com *a chave pública dela*; só a chave privada dela pode decifrá-la.
- **Assinaturas digitais.** Para provar que uma mensagem é mesmo sua, você a assina com *sua chave privada*; qualquer um pode verificá-la com sua chave pública, o que confirma a autenticidade e que não foi alterada.

## A matemática por trás

A segurança repousa em problemas fáceis de calcular num sentido, mas extremamente difíceis de reverter — como **fatorar** números enormes (RSA) ou resolver logaritmos discretos em **curvas elípticas**. Revertê-los exigiria quantidades de tempo de computação inviáveis.

## No dia a dia

Quando seu navegador mostra um cadeado, ele já usou criptografia de chave pública para verificar o site e estabelecer uma chave compartilhada rápida para o resto da sessão.`,
  },
  {
    title: 'A sequência de Fibonacci',
    question: 'O que é a sequência de Fibonacci e por que ela aparece na natureza?',
    summary:
      'A sequência de Fibonacci é uma série em que cada número é a soma dos dois anteriores; relaciona-se com a proporção áurea e aparece em padrões como as pétalas das flores e as conchas em espiral.',
    tags: ['matemática', 'padrões', 'natureza', 'geometria', 'ciência'],
    language: 'pt',
    content: `# A sequência de Fibonacci

A sequência de Fibonacci é um dos padrões mais famosos da matemática: uma regra simples que produz conexões surpreendentes com a geometria e o mundo natural.

## A regra

Comece com 0 e 1, e faça cada novo número ser a **soma dos dois anteriores**:

\`\`\`
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
\`\`\`

A sequência leva o nome do matemático italiano **Leonardo de Pisa** (Fibonacci), que a introduziu na Europa em 1202 por meio de um enigma sobre a criação de coelhos, embora já fosse conhecida antes na matemática indiana.

## Vínculo com a proporção áurea

Divida qualquer número de Fibonacci pelo anterior, e o resultado se aproxima cada vez mais de cerca de **1,618** — a **proporção áurea** (muitas vezes escrita φ). Quanto mais se avança na sequência, mais exata fica a aproximação.

## Por que aparece na natureza

Os números de Fibonacci aparecem na contagem de pétalas de muitas flores, no arranjo das sementes de um girassol e na ramificação das plantas. A razão mais profunda é o **empacotamento eficiente**: dispor folhas ou sementes em ângulos relacionados à proporção áurea permite a uma planta captar luz solar ou acomodar sementes com sobreposição mínima. Então o padrão é menos uma assinatura mística do que uma consequência natural da otimização.

## Além da biologia

A sequência também surge em algoritmos de computador, análise financeira e arte, onde a proporção áurea há muito é associada a proporções agradáveis.`,
  },
  {
    title: 'Os números primos',
    question: 'O que são números primos e por que são importantes?',
    summary:
      'Os números primos são inteiros maiores que um que não têm divisores além de um e de si mesmos; são os blocos de construção da aritmética e a base da criptografia moderna.',
    tags: ['matemática', 'números', 'criptografia', 'teoria', 'ciência'],
    language: 'pt',
    content: `# Os números primos

Um número primo é um inteiro maior que 1 que só pode ser dividido exatamente por 1 e por si mesmo. Os primeiros primos são 2, 3, 5, 7, 11 e 13. Os números com divisores adicionais, como o 6 (= 2 × 3), são chamados **compostos**.

## Os átomos da aritmética

Os primos são fundamentais por causa do **teorema fundamental da aritmética**: todo inteiro maior que 1 pode ser escrito como produto de primos de uma única maneira (sem contar a ordem). Por exemplo, 60 = 2 × 2 × 3 × 5. Nesse sentido, os primos são os "átomos" indivisíveis a partir dos quais se constroem todos os outros números.

## Infinitamente muitos

O matemático grego **Euclides** provou, há mais de dois mil anos, que não existe um primo máximo — a lista segue para sempre. Ainda assim, os primos ficam mais raros à medida que os números crescem, e prever exatamente onde caem é uma área profunda e ainda não resolvida da matemática, ligada à famosa **hipótese de Riemann**.

## Por que importam hoje

Os primos movem a **criptografia** moderna. Métodos como o RSA apoiam-se numa assimetria prática: multiplicar dois primos grandes é fácil, mas pegar o número enorme resultante e recuperar os primos originais (**fatorar**) é extraordinariamente difícil com os computadores atuais. Essa dificuldade mantém seguros o banco on-line, as mensagens e o comércio.

## Uma busca contínua

Matemáticos e voluntários usando computadores em rede continuam procurando primos cada vez maiores. Os maiores primos conhecidos têm hoje dezenas de milhões de dígitos.`,
  },
  {
    title: 'Os juros compostos',
    question: 'Por que os juros compostos são tão poderosos com o tempo?',
    summary:
      'Os juros compostos são os juros ganhos tanto sobre o capital original quanto sobre os juros já acumulados, o que produz um crescimento exponencial que recompensa a poupança precoce e de longo prazo.',
    tags: ['finanças', 'economia', 'matemática', 'dinheiro', 'finanças pessoais'],
    language: 'pt',
    content: `# Os juros compostos

Os juros compostos são muitas vezes chamados da força mais poderosa das finanças. São o processo de ganhar juros não só sobre o dinheiro que você investe no início, mas também sobre os juros que esse dinheiro já rendeu.

## Simples contra compostos

Com os **juros simples**, você ganha uma quantia fixa a cada período, baseada só na soma original (o **capital**). Com os **juros compostos**, os juros de cada período se somam ao saldo, de modo que os juros do período seguinte são calculados sobre uma quantia maior. O crescimento, portanto, acelera com o tempo — é **exponencial**, não linear.

## Um exemplo rápido

Invista 1000 a 7% ao ano:

- Após 1 ano: 1070
- Após 10 anos: cerca de 1967
- Após 30 anos: cerca de 7612

O dinheiro **dobra** aproximadamente a cada década sem acrescentar um centavo — e quanto mais tempo se mantém, mais espetacular é o efeito.

## A regra do 72

Um atalho prático, a **regra do 72**, estima quanto tempo um investimento leva para dobrar: divida 72 pela taxa de juros anual. A 8%, o dinheiro dobra em cerca de 9 anos (72 ÷ 8).

## Por que o tempo é o que mais importa

Como a capitalização se constrói sobre si mesma, **começar cedo** costuma importar mais do que investir grandes quantias mais tarde. A mesma lógica funciona ao contrário com a dívida: os saldos não pagos de empréstimos ou cartões de juros altos se compõem contra o devedor, por isso essa dívida pode crescer de forma alarmante.`,
  },
  {
    title: 'As funções hash',
    question: 'O que é uma função hash e onde ela é usada?',
    summary:
      'Uma função hash transforma dados de qualquer tamanho em uma cadeia de comprimento fixo; boas funções hash criptográficas são rápidas, determinísticas e praticamente impossíveis de reverter ou forjar colisões.',
    tags: ['tecnologia', 'computação', 'criptografia', 'segurança', 'dados'],
    language: 'pt',
    content: `# As funções hash

Uma função hash é uma ferramenta pequena, mas essencial, na computação. Ela recebe uma entrada de qualquer comprimento — uma palavra, um arquivo, um banco de dados inteiro — e produz uma saída de comprimento fixo chamada **hash** ou **resumo**.

## Propriedades-chave

Uma função hash útil é:

- **Determinística.** A mesma entrada sempre produz o mesmo hash.
- **Rápida** de calcular.
- **De comprimento fixo.** Uma mensagem de um caractere e um arquivo de um gigabyte dão, por exemplo, um resultado de 256 bits.

Uma função hash *criptográfica* acrescenta garantias mais fortes:

- **Unidirecional.** A partir de um hash, não se pode recuperar de forma viável a entrada original.
- **Resistente a colisões.** É praticamente impossível achar duas entradas distintas com o mesmo hash.
- **Efeito avalanche.** Mudar um único caractere da entrada embaralha por completo a saída.

## Usos cotidianos

- **Armazenamento de senhas.** Os sistemas guardam o hash de uma senha, não a senha em si, de modo que um vazamento do banco de dados não revela diretamente os segredos dos usuários.
- **Verificações de integridade.** Os downloads costumam publicar um hash para verificar que um arquivo chegou intacto e sem adulteração.
- **Estruturas de dados.** As **tabelas hash** usam o hashing para encontrar itens quase instantaneamente, não importa quantos dados estejam armazenados.
- **Cadeias de blocos.** As criptomoedas encadeiam blocos por meio de hashes, tornando o livro-razão à prova de adulteração.

## Algoritmos comuns

Os sistemas modernos preferem funções fortes como o **SHA-256**. Os mais antigos, como MD5 e SHA-1, hoje são considerados quebrados para a segurança porque pesquisadores acharam meios de criar colisões, e não devem ser usados para proteger dados sensíveis.`,
  },
  {
    title: 'A máquina de Turing',
    question: 'O que é uma máquina de Turing e por que é fundamental para a computação?',
    summary:
      'A máquina de Turing é um modelo matemático simples da computação, idealizado por Alan Turing em 1936, que define o que significa um problema ser computável e sustenta toda a computação.',
    tags: ['computação', 'matemática', 'teoria', 'história', 'tecnologia'],
    language: 'pt',
    content: `# A máquina de Turing

A máquina de Turing não é um dispositivo físico, mas um experimento mental — um modelo matemático que capta a própria ideia de computação. Proposta por **Alan Turing** em 1936, segue sendo o fundamento teórico da computação.

## Um projeto enganosamente simples

Uma máquina de Turing consiste em:

- Uma **fita** infinita dividida em células, cada uma com um símbolo.
- Um **cabeçote** que pode ler e escrever o símbolo abaixo dele e mover-se para a esquerda ou para a direita.
- Um conjunto de **estados** e uma tabela de **regras** que dizem à máquina o que fazer conforme seu estado atual e o símbolo que lê.

A partir dessas peças mínimas, a máquina pode executar qualquer procedimento passo a passo. A intuição de Turing foi que esse sistema simples é poderoso o bastante para realizar **qualquer** cálculo que possa ser descrito por um algoritmo.

## Universalidade

Turing também descreveu uma máquina **universal** capaz de ler a descrição de qualquer outra máquina de Turing e então imitá-la. Esse é o ancestral teórico do computador programável moderno: uma máquina que executa programas diferentes em vez de um dispositivo separado para cada tarefa.

## Os limites da computação

O modelo também revelou limites. Turing provou que alguns problemas são **indecidíveis**: nenhum algoritmo pode resolvê-los. O mais famoso é o **problema da parada**: não existe um método geral para determinar, para todo programa e entrada, se o programa acabará parando ou rodará para sempre.

## Uma influência duradoura

Tudo o que um computador real pode computar, uma máquina de Turing também pode (dados tempo e fita suficientes). Essa equivalência é a razão pela qual o modelo ainda define as fronteiras do que os computadores podem — e não podem — fazer.`,
  },
  {
    title: 'Largura de banda e latência',
    question: 'Qual é a diferença entre largura de banda e latência?',
    summary:
      'A largura de banda é quantos dados uma conexão pode transportar por segundo, enquanto a latência é o atraso antes de os dados começarem a chegar; ambas moldam quão "rápida" uma rede parece, mas não são a mesma coisa.',
    tags: ['tecnologia', 'redes', 'internet', 'computação', 'engenharia'],
    language: 'pt',
    content: `# Largura de banda e latência

As pessoas costumam dizer que uma conexão é "rápida", mas a velocidade tem, na verdade, duas dimensões distintas: a **largura de banda** e a **latência**. Confundi-las é uma fonte comum de frustração com as redes.

## Largura de banda: quanto

A **largura de banda** é a quantidade máxima de dados que uma conexão pode transferir num dado tempo, geralmente medida em megabits ou gigabits por segundo. Uma analogia útil é a largura de um cano: um cano mais largo deixa passar mais água de uma vez. A largura de banda ajuda sobretudo ao mover **grandes** quantidades de dados — transmitir vídeo de alta resolução, baixar arquivos grandes ou fazer backup na nuvem.

## Latência: quão cedo

A **latência** é o atraso entre enviar um pedido e receber a primeira resposta, medido em milissegundos. Na analogia do cano, é quanto tempo a água leva para ir de uma ponta à outra. A latência depende da distância (os sinais não podem superar a velocidade da luz), do número de saltos de rede e de atrasos de processamento. A latência importa sobretudo em tarefas **interativas** — videochamadas, jogos on-line e pedidos web rápidos.

## Por que a diferença importa

Uma conexão pode ter largura de banda alta mas latência alta, ou o contrário. Um enlace por satélite pode transportar muitos dados e ainda parecer lento porque cada sinal percorre dezenas de milhares de quilômetros. Por isso um vídeo pode transmitir com fluidez (largura de banda) enquanto um jogo ainda parece travado (latência).

## Termos relacionados

A **taxa de transferência (throughput)** é a taxa de dados realmente alcançada na prática, em geral menor do que a largura de banda teórica. O **jitter** é a variação da latência ao longo do tempo, que pode perturbar a voz e o vídeo mesmo quando a latência média é baixa.`,
  },
];
