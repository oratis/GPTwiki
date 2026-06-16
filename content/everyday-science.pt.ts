import type { DraftArticle } from './types';
import { everydayScienceEn } from './everyday-science.en';

// Batch: Everyday Science (versão nativa em português). Mesmos temas e
// topicKeys de everyday-science.en.ts; conteúdo escrito de forma nativa para
// o leitor de língua portuguesa. As imagens são partilhadas por topicKey.

const promptOf = (key: string): string => {
  const hit = everydayScienceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const everydaySciencePt: DraftArticle[] = [
  {
    topicKey: 'why-sky-is-blue',
    title: 'Porque é que o céu é azul?',
    question: 'Porque é que o céu é azul durante o dia e vermelho ao pôr do sol?',
    summary:
      'A luz solar é branca — uma mistura de todas as cores — mas o ar dispersa os seus comprimentos de onda azuis, mais curtos, muito mais do que os vermelhos, pintando todo o céu de azul. Ao pôr do sol, a luz atravessa mais ar, o azul dispersa-se e sobram os vermelhos e laranjas.',
    tags: ['ciência', 'física', 'luz', 'natureza'],
    language: 'pt',
    image: { prompt: promptOf('why-sky-is-blue'), alt: 'Luz branca a atravessar uma atmosfera de vidro com o azul a dispersar-se em todas as direções' },
    sources: [
      { title: 'NASA Science — Porque é que o céu é azul?', url: 'https://spaceplace.nasa.gov/blue-sky/en/' },
      { title: 'NOAA — Dispersão da luz e ótica atmosférica', url: 'https://www.noaa.gov/' },
    ],
    content: `# Porque é que o céu é azul?

O céu é azul por causa de um cabo de guerra entre a luz solar e o ar. A luz do Sol parece branca, mas é na verdade uma mistura de todas as cores do arco-íris combinadas. À medida que essa luz se derrama pela atmosfera, as moléculas de gás no ar **dispersam-na** — empurram-na para novas direções — e eis o facto-chave: dispersam os comprimentos de onda curtos, azuis, muito mais fortemente do que os longos, vermelhos. Por isso a luz azul é atirada por todo o céu e, quando olhas para cima, o azul vem em tua direção de todos os lados. Toda a abóbada brilha em azul.

## A física, com calma

A luz viaja em ondas, e as cores diferem pelo **comprimento de onda**: a luz vermelha tem ondas longas, o azul e o violeta têm ondas curtas. Quando a luz atinge algo muito mais pequeno do que o seu comprimento de onda — como uma única molécula de azoto ou de oxigénio — dispersa-se de uma forma que favorece fortemente os comprimentos de onda mais curtos. O efeito (chamado dispersão de Rayleigh, em homenagem ao físico que o explicou) é dramático: a luz azul dispersa-se várias vezes mais do que a vermelha. O céu é, no fundo, luz azul que foi ricocheteada inúmeras vezes pela atmosfera antes de chegar ao teu olho.

## Duas perguntas naturais que se seguem

**Se o azul é o que mais se dispersa, porque é que o céu não é violeta?** O violeta tem um comprimento de onda ainda mais curto e dispersa-se ainda mais — mas há menos violeta na luz solar à partida, e os teus olhos são mais sensíveis ao azul do que ao violeta. A mistura que o teu cérebro perceciona cai no azul.

**E porque é que o próprio Sol é amarelado?** Porque o azul foi dispersado *para longe* do feixe direto. A luz que vem diretamente do Sol perdeu parte do seu azul para o céu, deixando o disco com um aspeto amarelo-branco.

## Porque é que o pôr do sol fica vermelho

Ao pôr do sol, o Sol está baixo, por isso a sua luz roça uma **camada de atmosfera muito mais espessa** até chegar a ti. Ao longo desse percurso longo, essencialmente todo o azul (e grande parte do verde) é dispersado para fora do feixe antes de chegar. O que resta para alcançar os teus olhos são os comprimentos de onda longos — vermelhos e laranjas — e é por isso que o Sol poente e as nuvens à sua volta ardem em cores quentes. A mesma dispersão que torna o meio-dia azul torna o pôr do sol vermelho; só mudou o comprimento do percurso.

## Perguntas frequentes

**Porque é que o céu é negro no espaço?**
Porque não há ar para dispersar a luz solar. Os astronautas veem o Sol e as estrelas contra um negro puro, mesmo de dia — sem atmosfera, não há azul.

**Isto explica porque é que o oceano é azul?**
Em parte é diferente. O azul do céu reflete-se na água, mas a água profunda também *absorve* a luz vermelha e dispersa o azul por si própria, por isso o oceano é azul por razões que se sobrepõem.

**Porque é que as nuvens são brancas e não azuis?**
As gotículas das nuvens são muito maiores do que as moléculas de ar, por isso dispersam *todas* as cores de forma aproximadamente igual. Todas as cores misturadas de novo dão branco.`,
  },
  {
    topicKey: 'how-vaccines-work',
    title: 'Como é que as vacinas funcionam, afinal?',
    question: 'Como é que as vacinas treinam o sistema imunitário para nos proteger?',
    summary:
      'Uma vacina mostra ao teu sistema imunitário uma pré-visualização inofensiva de um micróbio para que ele aprenda a reconhecê-lo de antemão. Depois cria células de memória que recordam a ameaça durante anos, para que uma infeção real seja derrotada depressa — muitas vezes antes de te sentires doente.',
    tags: ['ciência', 'biologia', 'sistema imunitário', 'saúde'],
    language: 'pt',
    image: { prompt: promptOf('how-vaccines-work'), alt: 'Sentinelas imunitárias a estudar uma réplica inofensiva de um micróbio e a guardar emblemas de memória' },
    sources: [
      { title: 'CDC — Compreender como funcionam as vacinas', url: 'https://www.cdc.gov/vaccines/hcp/conversations/understanding-vacc-work.html' },
      { title: 'OMS — Como funcionam as vacinas?', url: 'https://www.who.int/news-room/feature-stories/detail/how-do-vaccines-work' },
    ],
    content: `# Como é que as vacinas funcionam, afinal?

Uma vacina funciona **ensinando o teu sistema imunitário a reconhecer um micróbio antes de alguma vez encontrares o verdadeiro.** O teu sistema imunitário já é brilhante a combater infeções — mas, na primeira vez que encontra um micróbio novo, é lento, a aprender em pleno trabalho enquanto adoeces. Uma vacina salta essa primeira lição perigosa: mostra ao teu corpo uma pré-visualização segura da ameaça, de modo que, se o micróbio verdadeiro alguma vez aparecer, as tuas defesas já sabem exatamente o que fazer e o esmagam rapidamente.

## O que está realmente na pré-visualização

Uma vacina contém algo que *parece* um micróbio específico ao teu sistema imunitário mas que **não te pode deixar doente.** Consoante a vacina, isso pode ser:

- Uma versão enfraquecida ou inativada do micróbio,
- Apenas um pedaço inofensivo dele (uma proteína de superfície), ou
- Instruções (como o mRNA) que dizem às tuas próprias células para fabricarem brevemente um pedaço inofensivo do micróbio, para o teu sistema imunitário estudar.

Em todos os casos o princípio é idêntico: apresentar ao sistema imunitário a "forma" reconhecível do micróbio (um antigénio) sem o perigo.

## Reconhecer, responder, recordar

Quando o teu sistema imunitário vê este antigénio, faz três coisas:

1. **Reconhece-o** como estranho.
2. **Responde**, produzindo anticorpos — proteínas feitas à medida para se agarrarem àquele micróbio específico — e ativando células que destroem as células infetadas.
3. **Recorda-o**, criando **células de memória** de longa duração.

Esse terceiro passo é o objetivo de tudo. Essas células de memória podem persistir durante anos ou décadas. Se o micróbio verdadeiro alguma vez invadir, elas reconhecem-no instantaneamente e desencadeiam uma resposta rápida e maciça — muitas vezes derrotando a infeção antes de notares qualquer sintoma. Ganhaste a imunidade sem teres tido de sobreviver primeiro à doença.

## Porque é que às vezes é preciso mais do que uma dose, e porque é que um braço dorido é normal

Algumas vacinas precisam de várias doses ou de reforços porque a memória imunitária pode ser construída de forma mais forte com exposições repetidas, ou pode desvanecer-se com o tempo e precisar de ser reforçada. E a ligeira dor, o cansaço ou a febre baixa que algumas pessoas sentem depois não é o micróbio — é o teu sistema imunitário *a fazer o seu trabalho*, a aumentar a resposta à pré-visualização. Uma reação é sinal de que o treino está a funcionar, não de que estás doente.

## Perguntas frequentes

**Uma vacina pode dar-me a doença que previne?**
As vacinas padrão não podem causar a doença — não contêm nenhum micróbio vivo e capaz (ou apenas uma forma enfraquecida que não causa doença em pessoas saudáveis). O que podes sentir é a resposta imunitária, não uma infeção.

**O que é a "imunidade de grupo"?**
Quando há suficientes pessoas imunes numa comunidade, o micróbio tem dificuldade em encontrar novos hospedeiros e em propagar-se, o que protege indiretamente quem não pode ser vacinado (recém-nascidos, pessoas com certas doenças). A proteção torna-se coletiva.

**Porque é que algumas vacinas duram a vida toda e outras precisam de reforços?**
Depende do micróbio e de quão duradoura é a resposta de memória, e de se o micróbio sofre mutações (como a gripe) ao ponto de o treino do ano passado já não servir à versão deste ano. Algumas ameaças são estáveis; outras estão sempre a mudar.`,
  },
  {
    topicKey: 'why-seasons-happen',
    title: 'O que causa realmente as estações do ano?',
    question: 'O que causa as estações — a Terra está mais perto do Sol no verão?',
    summary:
      'As estações não são causadas pela distância ao Sol — um mito comum. Acontecem porque a Terra está inclinada sobre o seu eixo, por isso cada hemisfério pende para o Sol durante metade do ano (verão) e afasta-se na outra metade (inverno), mudando o quão diretamente a luz atinge o solo.',
    tags: ['ciência', 'astronomia', 'Terra', 'natureza'],
    language: 'pt',
    image: { prompt: promptOf('why-seasons-happen'), alt: 'Um globo inclinado com a luz solar a atingir um hemisfério diretamente e o outro num ângulo raso' },
    sources: [
      { title: 'NASA Science — O que causa as estações?', url: 'https://spaceplace.nasa.gov/seasons/en/' },
      { title: 'NOAA — A inclinação da Terra e as estações', url: 'https://www.noaa.gov/' },
    ],
    content: `# O que causa realmente as estações do ano?

Vamos esclarecer já o equívoco científico mais comum: **as estações não são causadas pela Terra ficar mais perto ou mais longe do Sol.** Na verdade, a Terra está ligeiramente *mais perto* do Sol em janeiro — durante o inverno do Hemisfério Norte. Se a distância fosse a causa, todo o planeta teria verão e inverno ao mesmo tempo. Mas não tem: quando é verão na Austrália, é inverno no Canadá. A verdadeira causa é a **inclinação** da Terra.

## A inclinação é tudo

A Terra gira sobre um eixo que está inclinado cerca de 23,5 graus em relação à sua órbita à volta do Sol. Essa inclinação mantém-se apontada na mesma direção no espaço durante todo o ano, enquanto a Terra dá a volta ao Sol. Por isso, durante metade da órbita, o Hemisfério Norte pende *para* o Sol e, na outra metade, afasta-se *dele* — e o Hemisfério Sul faz o oposto. Esse único facto produz tudo aquilo a que chamamos estações.

## Porque é que a inclinação aquece ou arrefece

Pender para o Sol muda o tempo de duas formas que se reforçam:

- **O quão direta é a luz solar.** Quando o teu hemisfério se inclina para o Sol, a luz solar atinge o solo mais **diretamente** — concentrada, como uma lanterna apontada a direito para baixo. Quando se inclina para o lado oposto, a mesma luz incide num **ângulo raso**, espalhada de forma ténue por mais área, por isso cada porção de solo recebe menos energia. A luz direta aquece muito mais eficazmente do que a luz inclinada.
- **A duração do dia.** A inclinação também faz com que o Sol esteja acima do horizonte **mais tempo** no verão, pelo que há mais horas de aquecimento e menos horas de arrefecimento noturno.

Luz mais concentrada, durante mais horas por dia, soma para dar verão. Luz inclinada durante menos horas soma para dar inverno.

## Porque é que isto explica tudo o resto

- **Hemisférios opostos, estações opostas:** quando o norte pende para o Sol, o sul afasta-se — por isso as suas estações estão sempre invertidas.
- **O equador quase não tem estações:** mantém-se aproximadamente de lado para o Sol o ano inteiro, por isso a luz solar é sempre bastante direta — daí o calor constante.
- **Os polos têm meses de luz do dia ou de escuridão:** a inclinação extrema faz com que, no verão, o Sol nunca se ponha por completo e, no inverno, nunca nasça por completo.

## Perguntas frequentes

**Então a distância da Terra ao Sol não faz nada?**
A sua órbita é apenas ligeiramente oval, por isso a variação da distância é pequena e é dominada pelo efeito da inclinação. Não é zero, mas é uma influência menor comparada com o ângulo da luz solar.

**Porque é que o tempo mais quente costuma vir depois do dia mais longo?**
Este "atraso sazonal" acontece porque a terra e os oceanos levam semanas a absorver calor e a aquecer. O pico de luz solar recebida é o solstício, mas o pico de calor acumulado chega um mês ou dois mais tarde.

**O que é um solstício ou um equinócio?**
Os solstícios são os dois momentos de inclinação máxima para o Sol ou contra ele (os dias mais longo e mais curto); os equinócios são os dois momentos intermédios em que a inclinação está de lado e o dia e a noite são quase iguais em todo o lado.`,
  },
  {
    topicKey: 'why-we-dream',
    title: 'Porque é que sonhamos?',
    question: 'Porque é que sonhamos, e os sonhos significam mesmo alguma coisa?',
    summary:
      'Ninguém sabe a resposta completa, mas a ciência mais consensual sugere que os sonhos não são aleatórios: parecem ajudar o cérebro a consolidar memórias, processar emoções e ensaiar situações. Os sonhos mais vívidos ocorrem no sono REM, quando o cérebro está quase tão ativo como acordado.',
    tags: ['ciência', 'neurociência', 'sono', 'cérebro'],
    language: 'pt',
    image: { prompt: promptOf('why-we-dream'), alt: 'Um cérebro adormecido a brilhar enquanto reproduz e arquiva fragmentos de memória por emoção' },
    sources: [
      { title: 'Instituto Nacional de Doenças Neurológicas e AVC (NIH) — Noções de cérebro: o sono', url: 'https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-understanding-sleep' },
      { title: 'Sleep Foundation — Porque é que sonhamos?', url: 'https://www.sleepfoundation.org/dreams' },
    ],
    content: `# Porque é que sonhamos?

Primeiro a resposta honesta: **a ciência não sabe ao certo porque é que sonhamos** — é uma das genuínas perguntas em aberto sobre o cérebro. Mas "não sabemos tudo" não quer dizer "não sabemos nada". Os investigadores têm teorias sólidas e apoiadas em evidências, e elas apontam numa direção consistente: os sonhos provavelmente não são ruído sem sentido. Parecem ser um subproduto — ou até uma função — da manutenção noturna essencial que o teu cérebro realiza enquanto dormes.

## Quando acontece o sonho

O sono passa por etapas em ciclos, e os sonhos mais vívidos e parecidos com histórias concentram-se numa etapa chamada **REM** (movimento rápido dos olhos), quando — estranhamente — o teu cérebro está quase tão ativo como quando estás acordado, ainda que o teu corpo esteja temporariamente paralisado (o que convenientemente te impede de encenar os sonhos). Passas por REM várias vezes por noite, com os períodos de REM a ficarem mais longos em direção à manhã, e é por isso que muitas vezes acordas a meio de um sonho. Também sonhas em etapas não-REM mais leves, mas esses sonhos tendem a ser mais vagos.

## As principais teorias

Nenhuma teoria venceu, e podem todas estar em parte certas:

| Teoria | A ideia |
| --- | --- |
| **Consolidação da memória** | Sonhar ajuda a arrumar as experiências do dia, reforçando as memórias importantes e podando as restantes |
| **Processamento emocional** | Os sonhos deixam-te reviver e desarmar eventos emocionais num estado seguro e "fora de linha" |
| **Ensaio de ameaças/social** | Sonhar simula desafios (perigos, situações sociais) para que estejas mais bem preparado para os reais |
| **O cérebro a dar sentido ao ruído** | Durante o REM o cérebro dispara de forma semi-aleatória, e os sonhos são a sua tentativa de tecer uma história a partir dessa atividade |

Repara que estas se sobrepõem em vez de competirem: o cérebro pode estar a arquivar memórias, a processar sentimentos *e* a fiar uma narrativa a partir da atividade, tudo ao mesmo tempo.

## Os sonhos "significam" alguma coisa?

Não no sentido de adivinhação — não há evidências de que os sonhos prevejam o futuro ou carreguem símbolos ocultos universais. Mas também não são aleatórios: o conteúdo dos sonhos baseia-se fortemente nas tuas experiências, preocupações e emoções recentes, por isso um sonho pode genuinamente refletir o que tens em mente. O significado, quando existe, é pessoal e emocional, não um código a decifrar a partir de um dicionário de sonhos.

## Perguntas frequentes

**Porque é que me esqueço dos sonhos tão depressa?**
O cérebro não dá prioridade a armazenar os sonhos na memória de longo prazo, e a química do sono REM não é ideal para a formação de memórias. Os sonhos desvanecem-se em minutos depois de acordar, a menos que os recordes de imediato — e é por isso que ter um bloco de notas ao lado da cama "funciona".

**Toda a gente sonha?**
Quase de certeza que sim — pensa-se que as pessoas que dizem nunca sonhar simplesmente não se lembram. Os estudos do sono mostram atividade REM mesmo em pessoas que relatam não ter sonhos.

**Para que servem os pesadelos?**
Podem ser o sistema de processamento emocional ou de ensaio de ameaças em sobrecarga, muitas vezes desencadeado por stress ou trauma. Pesadelos ocasionais são normais; pesadelos frequentes e angustiantes podem valer a pena abordar com um profissional.`,
  },
  {
    topicKey: 'how-planes-fly',
    title: 'Como é que os aviões se mantêm mesmo no ar?',
    question: 'Como é que aviões pesados geram sustentação suficiente para voar?',
    summary:
      'Uma asa gera sustentação ao desviar o ar para baixo — pela terceira lei de Newton, empurrar o ar para baixo empurra a asa para cima. A sua forma e inclinação fazem também o ar de cima fluir mais depressa e a menor pressão. Juntos, criam força ascendente que segura toneladas de metal no ar.',
    tags: ['ciência', 'física', 'voo', 'como funciona'],
    language: 'pt',
    image: { prompt: promptOf('how-planes-fly'), alt: 'Uma asa a desviar o fluxo de ar para baixo enquanto uma força de sustentação ascendente se eleva' },
    sources: [
      { title: 'NASA Glenn — Como as asas elevam o avião / Dinâmica do voo', url: 'https://www.grc.nasa.gov/www/k-12/airplane/lift1.html' },
      { title: 'NASA — As quatro forças do voo', url: 'https://www.nasa.gov/audience/foreducators/k-4/features/F_Four_Forces_of_Flight.html' },
    ],
    content: `# Como é que os aviões se mantêm mesmo no ar?

Parece quase inacreditável que algo tão pesado como um avião carregado consiga flutuar no ar rarefeito — mas o princípio é física sólida. A função de uma asa é gerar **sustentação**, uma força ascendente grande o suficiente para vencer o peso do avião, e fá-lo com um truque fundamental: **empurra o ar para baixo.** Pela terceira lei de Newton — toda a ação tem uma reação igual e oposta — empurrar uma enorme quantidade de ar *para baixo* faz o ar empurrar a asa *para cima*. Guarda esta ideia e o resto são detalhes.

## Duas formas de descrever a mesma sustentação

Os físicos explicam a sustentação de uma asa a partir de dois ângulos que, no fim, concordam:

- **A visão de Newton (o ar é desviado para baixo).** Uma asa está ligeiramente inclinada e tem uma forma tal que o ar que passa por ela é desviado **para baixo** ao deixar o bordo de fuga. A asa lança uma corrente contínua de ar para baixo; a força de reação empurra a asa para cima. Mais ar desviado, ou desviado com mais força, significa mais sustentação.
- **A visão da pressão (ar mais rápido, menor pressão).** Por causa da forma e do ângulo da asa, o ar flui **mais depressa por cima** do que por baixo. O ar que se move mais depressa tem *menor pressão* (princípio de Bernoulli), por isso há mais pressão a empurrar para cima por baixo do que a empurrar para baixo por cima — uma força ascendente líquida.

Estas não são explicações rivais; são duas descrições consistentes de um mesmo fenómeno. Ambas estão a acontecer, e ambas produzem a mesma sustentação.

## O que controla a quantidade de sustentação

Três alavancas, todas usadas por pilotos e projetistas:

- **Velocidade:** um fluxo de ar mais rápido sobre a asa significa muito mais sustentação — e é por isso que os aviões têm de acelerar por uma longa pista antes de poderem deixar o solo, e porque aterram devagar com ajuda extra.
- **Área e forma da asa:** asas maiores movem mais ar; o perfil curvo é afinado para desviar o ar de forma eficiente.
- **Ângulo de ataque:** inclinar o nariz da asa para cima, contra o fluxo de ar, aumenta a sustentação — até certo ponto. Inclina demasiado e o fluxo de ar suave descola, a sustentação colapsa e a asa entra em "perda".

É também por isso que vês os flapes a estender-se das asas durante a descolagem e a aterragem: alargam e recurvam temporariamente a asa para extrair sustentação extra a baixa velocidade.

## Perguntas frequentes

**A velha explicação "o topo é mais comprido, por isso o ar tem de acelerar para acompanhar" estava errada?**
Essa história popular (a ideia do "tempo de trânsito igual") é uma simplificação excessiva e falha — o ar sobre o topo vai realmente mais depressa, mas não por essa razão, e as asas até voam de cabeça para baixo. O núcleo fiável é: as asas desviam o ar para baixo, e a pressão é menor em cima.

**O que mantém um avião a avançar?**
Os motores fornecem **impulso**, vencendo o **arrasto** (resistência do ar). A sustentação combate o peso; o impulso combate o arrasto. O voo é o equilíbrio dessas quatro forças.

**Como é que os planadores voam sem motor?**
Trocam altitude por velocidade, descendo suavemente pelo ar para que o fluxo de ar continue a produzir sustentação — e aproveitam correntes de ar ascendentes para recuperar altura. Não é preciso motor, apenas movimento do ar.`,
  },
  {
    topicKey: 'why-ice-floats',
    title: 'Porque é que o gelo flutua (quando quase tudo o resto afunda)?',
    question: 'Porque é que o gelo flutua na água, quando a maioria dos sólidos afunda no seu próprio líquido?',
    summary:
      'A água é estranha: expande-se ao congelar. As suas moléculas encaixam-se num cristal aberto e espaçoso, mantido por pontes de hidrogénio, tornando o gelo cerca de 9% menos denso do que a água líquida — por isso flutua. Esta peculiaridade permite que os lagos congelem de cima para baixo.',
    tags: ['ciência', 'química', 'água', 'natureza'],
    language: 'pt',
    image: { prompt: promptOf('why-ice-floats'), alt: 'Uma rede hexagonal aberta de gelo a flutuar sobre moléculas de água líquida densamente compactadas' },
    sources: [
      { title: 'USGS — Densidade da água e o gelo', url: 'https://www.usgs.gov/special-topics/water-science-school/science/water-density' },
      { title: 'Royal Society of Chemistry — Pontes de hidrogénio na água', url: 'https://edu.rsc.org/' },
    ],
    content: `# Porque é que o gelo flutua (quando quase tudo o resto afunda)?

O gelo a flutuar na tua bebida é tão familiar que é fácil não reparar em como é *estranho*. Para quase todas as outras substâncias na Terra, a forma sólida é **mais densa** do que a líquida — deixa cair cera sólida na cera derretida e ela afunda. A água quebra esta regra: a água sólida (gelo) é **menos** densa do que a água líquida, por isso flutua. A razão é uma propriedade peculiar da molécula de água, e essa peculiaridade acaba por ser uma das razões pelas quais a vida na Terra sobrevive ao inverno.

## A densidade, numa frase

Que algo flutue resume-se à **densidade** — quanta massa está concentrada num dado espaço. Flutuas se fores menos denso do que o líquido à tua volta; afundas se fores mais denso. Por isso a verdadeira pergunta é: porque é que congelar faz a água *expandir* e tornar-se menos densa, quando congelar faz a maioria das coisas contrair?

## A arquitetura aberta do gelo

As moléculas de água são ligeiramente assimétricas na carga, o que lhes permite agarrarem-se umas às outras com atrações fracas chamadas **pontes de hidrogénio.** Na água líquida, as moléculas estão constantemente a empurrar-se, a deslizar e a compactar-se bastante. Mas quando a água congela, essas pontes de hidrogénio fixam as moléculas num cristal rígido e altamente **ordenado** — e, crucialmente, esse cristal é *espaçoso*. Para satisfazer todas as suas ligações, as moléculas organizam-se numa rede aberta e hexagonal, com espaços vazios incorporados na estrutura. As moléculas no gelo estão, na verdade, mantidas *mais afastadas* em média do que na água líquida.

Mais espaço entre as mesmas moléculas significa menos massa por volume — o gelo é cerca de **9% menos denso** do que a água líquida. É exatamente por isso que um cubo de gelo flutua com cerca de um décimo de si acima da superfície, e porque o mesmo volume de água se expande e pode rebentar canos ao congelar.

## Porque é que esta peculiaridade importa para a vida

Porque o gelo flutua, a água congela de **cima para baixo**. Uma lagoa gela primeiro à superfície, e essa camada de gelo flutuante atua como um cobertor isolante, abrandando o congelamento subsequente e mantendo líquida a água por baixo. Os peixes, as plantas e outras formas de vida sobrevivem ao inverno nessa camada líquida em baixo. Se o gelo afundasse, os lagos e até os oceanos congelariam por completo de baixo para cima, e a vida aquática tal como a conhecemos talvez nunca tivesse passado pelas estações frias. Um pequeno acidente molecular tem consequências muito grandes.

## Perguntas frequentes

**A água é mais densa no ponto de congelação?**
Não — e isso é outra esquisitice. A água é mais densa a cerca de 4 °C, ligeiramente *acima* da congelação. À medida que arrefece para além disso, em direção aos 0 °C, expande-se de facto um pouco antes de se transformar em gelo, e é por isso que a água mais fria de um lago fica no topo.

**A água salgada congela e flutua da mesma maneira?**
O gelo marinho continua a flutuar (é menos denso do que a água do mar), mas o sal baixa o ponto de congelação da água e muda os detalhes. O gelo puro que se forma exclui em grande medida o sal.

**Porque é que adicionar gelo arrefece tão bem uma bebida?**
Para além de estar frio, o gelo a derreter *absorve* muito calor do líquido para quebrar essas pontes de hidrogénio à medida que se transforma em água — retirando energia da tua bebida no processo.`,
  },
  {
    topicKey: 'how-soap-works',
    title: 'Como é que o sabão limpa, afinal?',
    question: 'Como é que o sabão remove gordura e germes que a água sozinha não consegue?',
    summary:
      'As moléculas de sabão têm uma personalidade dividida: uma ponta adora a água, a outra agarra-se à gordura e ao óleo. Cercam a sujidade gordurosa e os germes, soltam-nos das superfícies e deixam a água levar tudo — o que também explica por que o sabão é tão eficaz contra muitos vírus.',
    tags: ['ciência', 'química', 'higiene', 'como funciona'],
    language: 'pt',
    image: { prompt: promptOf('how-soap-works'), alt: 'Moléculas de sabão de duas pontas a envolver uma gota de gordura para a erguer na água' },
    sources: [
      { title: 'Royal Society of Chemistry — Como funciona o sabão (surfactantes)', url: 'https://edu.rsc.org/' },
      { title: 'CDC — A ciência mostra: porquê lavar as mãos?', url: 'https://www.cdc.gov/handwashing/why-handwashing.html' },
    ],
    content: `# Como é que o sabão limpa, afinal?

Já conheces o problema que o sabão resolve: a água sozinha é inútil contra a gordura. Passa uma frigideira gordurosa por água da torneira e o óleo simplesmente forma gotas e fica onde está. Isso porque a gordura e a água são notoriamente imiscíveis. O sabão funciona sendo um astuto **casamenteiro molecular** — faz a ponte entre a água e a gordura, para que a água consiga finalmente levar a gordura (e os germes que viajam nela) para longe.

## A molécula de duas faces

O segredo está na forma de uma molécula de sabão. Cada uma é como um pequeno girino, com duas pontas muito diferentes:

- Uma **cabeça** que é *hidrófila* — "amante da água". Liga-se de bom grado à água.
- Uma longa **cauda** que é *hidrófoba* — "que teme a água" — mas adora agarrar-se ao óleo e à gordura.

Esta personalidade dividida é todo o truque. Quando fazes espuma numa superfície gordurosa, as moléculas de sabão organizam-se com as caudas amantes da gordura a enterrarem-se no óleo e as cabeças amantes da água a apontarem para fora, na direção da água.

## Cercar, erguer e enxaguar

Milhares de moléculas de sabão enxameiam uma gota de gordura, caudas para dentro, cabeças para fora, até a bolha gordurosa ficar completamente envolvida numa esfera com uma superfície exterior amiga da água. Estas pequenas esferas chamam-se **micelas.** Agora a gordura, antes repelente, tem uma casca amante da água — por isso, quando enxaguas, a água corrente agarra essas micelas e leva o pacote inteiro, gordura e sujidade aprisionada incluídas, pelo ralo abaixo. O sabão não dissolveu a gordura; *empacotou-a* para que a água a pudesse transportar.

## Porque é que isto também destrói muitos germes

A mesma propriedade faz do sabão um herói discreto da higiene. Muitos germes — incluindo os coronavírus e outros vírus com envelope — estão envolvidos numa **membrana gordurosa** exterior. As caudas amantes da gordura do sabão forçam a entrada e rasgam essa cobertura gordurosa, despedaçando o germe, ao mesmo tempo que as micelas também erguem os germes da tua pele para serem enxaguados. É por isso que **20 segundos a esfregar com sabão comum** é tão eficaz: não estás apenas a enxaguar os germes, estás a desmantelar quimicamente muitos deles. A ação mecânica de esfregar também importa — solta o que está agarrado.

## Perguntas frequentes

**A água precisa de estar quente?**
Nem por isso — a água morna pode ajudar a dissolver mais depressa algumas gorduras e é mais confortável, mas o sabão faz o trabalho químico a qualquer temperatura razoável. O tempo de uma esfregadela cuidada importa mais do que o calor.

**O sabão antibacteriano é melhor do que o sabão comum?**
Para a lavagem diária das mãos, o sabão comum funciona igualmente bem para remover e destruir germes, e as agências de saúde geralmente não consideram os sabões antibacterianos de uso corrente mais eficazes. O mecanismo de sabão e esfregar é a parte essencial.

**Em que difere o detergente do sabão?**
Os detergentes funcionam exatamente pelo mesmo princípio de duas pontas (também são "surfactantes"), mas são sintetizados para terem melhor desempenho em água dura e a várias temperaturas. A mesma ideia, projetada para condições mais difíceis.`,
  },
  {
    topicKey: 'what-causes-rainbows',
    title: 'O que causa um arco-íris?',
    question: 'Como é que os arco-íris se formam, e porque é que as cores estão sempre na mesma ordem?',
    summary:
      'Um arco-íris é luz solar curvada e dividida dentro das gotas de chuva. Cada gota age como um pequeno prisma, separando a luz branca nas suas cores e refletindo-as de volta para ti. A geometria fixa a ordem das cores e curva tudo num arco centrado no lado oposto ao Sol.',
    tags: ['ciência', 'física', 'luz', 'meteorologia'],
    language: 'pt',
    image: { prompt: promptOf('what-causes-rainbows'), alt: 'Luz branca a entrar numa gota de chuva e a sair separada em cores espetrais ordenadas' },
    sources: [
      { title: 'NOAA SciJinks — Como se formam os arco-íris?', url: 'https://scijinks.gov/rainbow/' },
      { title: 'NASA Science — A luz e o espetro eletromagnético', url: 'https://science.nasa.gov/ems/' },
    ],
    content: `# O que causa um arco-íris?

Um arco-íris é um truque de luz e água — mais concretamente, **luz solar a ser curvada, dividida e ricocheteada de volta para ti por milhões de gotas de chuva.** Não é um objeto num lugar até onde possas caminhar; é um efeito ótico que depende inteiramente de onde estão o Sol, a chuva e *os teus olhos*. É por isso que nunca consegues chegar ao fim de um arco-íris, e porque a pessoa que está ao teu lado vê um ligeiramente diferente: cada arco-íris é construído à medida do observador.

## O que acontece dentro de uma única gota de chuva

Segue um raio de luz solar a entrar numa gota de chuva esférica:

1. **Curva-se ao entrar.** A luz abranda e muda de direção ao passar do ar para a água (refração). Crucialmente, cores diferentes curvam-se em quantidades ligeiramente diferentes — o violeta curva mais, o vermelho menos.
2. **Reflete-se no fundo.** O raio viaja até à superfície interior mais distante da gota e ressalta de volta.
3. **Curva-se outra vez ao sair** — e, a esta altura, as cores, cada uma curvada duas vezes, abriram-se em leque no espetro completo.

Assim, cada gota de chuva recebe luz solar branca e envia para fora um pequeno borrifo de cores separadas. Um arco-íris é o que vês quando milhões de gotas fazem isto ao mesmo tempo, cada uma a contribuir com uma cor para o teu olho consoante a sua posição no céu.

## Porque é que as cores estão sempre na mesma ordem

Como a quantidade de curvatura é fixada pela física, **o vermelho acaba sempre na orla exterior do arco e o violeta na orla interior**, com o laranja, o amarelo, o verde e o azul pelo meio — todas as vezes. A ordem nunca se baralha porque é definida por quanto cada comprimento de onda se refrata. A sequência familiar (vermelho, laranja, amarelo, verde, azul, violeta) é simplesmente o espetro, ordenado por comprimento de onda.

## Porque é que é um arco, e sempre no lado oposto ao Sol

A geometria só funciona a um ângulo específico — a luz volta ao teu olho com mais força a cerca de **42 graus** do ponto diretamente oposto ao Sol. Todas as direções a esse mesmo ângulo traçam um círculo, que vês como o arco familiar (o solo normalmente esconde a metade inferior). É também por isso que um arco-íris está sempre na parte do céu *oposta* ao Sol: tens de estar de costas para o Sol, com a chuva à tua frente, para que os ângulos se alinhem.

## Perguntas frequentes

**Porque é que acontecem arco-íris duplos?**
Por vezes a luz reflete-se **duas vezes** dentro das gotas antes de sair. Esse segundo arco, mais ténue, aparece mais acima, e as suas cores estão **invertidas** (o vermelho no interior), porque o ressalto extra troca a ordem.

**É possível chegar ao fim de um arco-íris?**
Não — não é um lugar físico. Move-te na sua direção e a geometria desloca-se contigo, por isso o arco-íris também se move. Existe apenas em relação ao teu ponto de vista.

**É preciso chuva para ver um?**
Precisas de gotículas de água e de luz solar no ângulo certo — por isso também vês arco-íris na névoa de uma cascata, nos aspersores do jardim e nos salpicos do mar. O que importa são as gotas, não a nuvem de chuva.`,
  },
  {
    topicKey: 'why-we-age',
    title: 'Porque é que envelhecemos?',
    question: 'O que faz realmente os nossos corpos envelhecerem ao longo do tempo?',
    summary:
      'O envelhecimento é a acumulação gradual de danos nas nossas células, mais depressa do que o corpo os consegue reparar — desde pontas de cromossomas gastas e erros no ADN até células avariadas e inflamação crescente. São muitos processos sobrepostos, não um único relógio, e daí a complexidade.',
    tags: ['ciência', 'biologia', 'envelhecimento', 'saúde'],
    language: 'pt',
    image: { prompt: promptOf('why-we-age'), alt: 'Células a acumular pontas de fios desgastadas e pequenos danos ao longo do tempo, à medida que a reparação abranda' },
    sources: [
      { title: 'Instituto Nacional do Envelhecimento (NIH) — O que sabemos sobre o envelhecimento saudável?', url: 'https://www.nia.nih.gov/health/what-do-we-know-about-healthy-aging' },
      { title: 'López-Otín et al., «The Hallmarks of Aging» (2013)', url: 'https://pubmed.ncbi.nlm.nih.gov/23746838/' },
    ],
    content: `# Porque é que envelhecemos?

O envelhecimento pode parecer um único relógio misterioso em contagem decrescente, mas biologicamente compreende-se melhor como **a lenta acumulação de danos** — desgaste ao nível das células e das moléculas que, ao longo de décadas, o corpo se torna cada vez menos capaz de reparar. Quando és novo, a reparação acompanha os danos. Com o tempo, os danos começam a ganhar. Não existe uma única causa do envelhecimento; existem muitas, sobrepostas, e é exatamente por isso que o envelhecimento é tão difícil de travar e que não existe uma "cura" única.

## Os principais motores do envelhecimento

Os cientistas identificaram um conjunto de processos interligados — muitas vezes chamados as "marcas do envelhecimento" — que, em conjunto, impulsionam o declínio. Alguns dos mais importantes:

| Processo | O que corre mal |
| --- | --- |
| **Encurtamento dos telómeros** | As tampas protetoras nas pontas dos cromossomas encurtam a cada divisão celular, acabando por limitar a divisão |
| **Danos no ADN** | Erros e danos acumulam-se no nosso código genético mais depressa do que são corrigidos |
| **Células gastas (senescência)** | Células danificadas deixam de se dividir mas permanecem, libertando sinais que prejudicam as vizinhas |
| **Problemas com as proteínas** | As células ficam piores a eliminar proteínas danificadas e mal dobradas, que se acumulam |
| **Centrais de energia a falhar** | As mitocôndrias (os geradores de energia das células) tornam-se menos eficientes |
| **Inflamação crónica** | Uma inflamação de baixo grau e por todo o corpo ("inflammaging") aumenta com a idade |

Nenhum destes, por si só, *é* o envelhecimento. Reforçam-se mutuamente — o ADN danificado cria células gastas, as células gastas atiçam a inflamação, a inflamação causa mais danos — por isso o declínio compõe-se.

## Porque é que envelhecemos de todo (a pergunta mais profunda)

A evolução oferece uma razão para o envelhecimento existir, em primeiro lugar: a seleção natural trabalha com mais afinco para nos manter saudáveis ao longo dos anos reprodutivos, e o seu domínio enfraquece depois disso. Genes e compromissos que beneficiam a juventude podem trazer custos que só se manifestam mais tarde, quando a pressão evolutiva para os corrigir é fraca. Em suma, os corpos estão afinados para levar os seus genes à geração seguinte, não para durar para sempre — por isso a manutenção é "suficientemente boa", não perfeita.

## Há alguma coisa que o possa abrandar?

O envelhecimento em si não pode ser travado hoje, mas a **velocidade** dos danos é em parte influenciada pela forma como vivemos. Não fumar, atividade física regular, sono decente, uma dieta razoável e a gestão do stress crónico estão repetidamente associados a um declínio mais lento e a uma vida saudável mais longa — não é magia, mas é a diferença entre envelhecer bem e envelhecer mal. A investigação sobre os mecanismos subjacentes é ativa, mas as alavancas comprovadas continuam a ser, sem glamour, práticas.

## Perguntas frequentes

**Existe um limite máximo para a vida humana?**
Parece haver um teto aproximado — mesmo com saúde perfeita, muito poucas pessoas passam dos ~115 anos, o que sugere que os danos acumulados acabam por sobrepor-se à reparação. O recorde atualmente verificado é de 122.

**Os animais maiores ou mais pequenos envelhecem mais depressa?**
Em geral, os animais mais pequenos vivem vidas mais curtas, mas há exceções notáveis (alguns morcegos pequenos e as ratazanas-toupeira-peladas vivem muito mais do que o seu tamanho prevê), e é exatamente por isso que os investigadores os estudam.

**A ciência alguma vez "curará" o envelhecimento?**
Ninguém sabe. Os investigadores estão a visar marcas individuais (eliminar células gastas, proteger o ADN), e algumas abrandam o envelhecimento em animais de laboratório — mas traduzir isso em prolongar com segurança uma vida humana saudável não está comprovado e está provavelmente longe.`,
  },
  {
    topicKey: 'what-is-electricity',
    title: 'O que é a eletricidade, na verdade?',
    question: 'O que é mesmo a eletricidade, e como alimenta os nossos aparelhos?',
    summary:
      'A eletricidade é o fluxo de carga elétrica — geralmente eletrões a derivar por um fio, empurrados pela tensão. As centrais não fabricam eletrões; fornecem o "empurrão" que move os que já estão nos fios, e esse movimento organizado leva energia aos teus aparelhos.',
    tags: ['ciência', 'física', 'eletricidade', 'como funciona'],
    language: 'pt',
    image: { prompt: promptOf('what-is-electricity'), alt: 'Cargas luminosas num fio a derivar juntas sob a tensão para acender um aparelho' },
    sources: [
      { title: 'Administração de Informação de Energia dos EUA — A eletricidade explicada', url: 'https://www.eia.gov/energyexplained/electricity/' },
      { title: 'NASA — Noções de eletricidade e magnetismo', url: 'https://science.nasa.gov/' },
    ],
    content: `# O que é a eletricidade, na verdade?

Usamos a palavra "eletricidade" de forma vaga, mas, no fundo, significa uma só coisa: **o fluxo de carga elétrica.** Tudo é feito de átomos, e os átomos contêm partículas com carga — sobretudo **eletrões**, que carregam uma carga negativa minúscula. Em certos materiais, especialmente os metais, alguns eletrões podem mover-se livremente. Quando enormes quantidades desses eletrões derivam na mesma direção por um fio, esse fluxo organizado *é* uma corrente elétrica. A eletricidade é, literalmente, carga em movimento.

## Três palavras que a tornam clara

Uma analogia simples de canalização faz os termos-chave encaixarem — imagina água em canos:

- A **tensão** é o *empurrão* — como a pressão da água. É a força que conduz as cargas através de um circuito. Sem pressão, não há fluxo.
- A **corrente** é o *caudal* — quanta carga passa de facto por um ponto a cada segundo (medida em amperes).
- A **resistência** é o quanto o material *se opõe* ao fluxo — um cano estreito e obstruído contra um cano largo e desimpedido.

Mais tensão empurra mais corrente; mais resistência permite menos. Essa relação (a lei de Ohm) governa quase todos os circuitos. E uma corrente precisa de um **circuito** completo — uma volta ininterrupta da fonte, através do aparelho, e de regresso — e é por isso que carregar num interruptor (quebrar a volta) faz parar tudo instantaneamente.

## Um equívoco crucial: a central não te envia eletrões

Eis o que surpreende a maioria das pessoas. A central elétrica não está a despachar eletrões para tua casa como água num camião-cisterna. **Os eletrões já estão nos fios.** O que a central fornece é o *empurrão* — a tensão que põe esses eletrões, já presentes, a tremer e a derivar. Na corrente alternada (CA) que sai da maioria das tomadas, os eletrões nem sequer viajam até ti; oscilam para a frente e para trás no mesmo sítio, muitas vezes por segundo. O que de facto viaja até ao teu aparelho, depressa, é a **energia** transportada por esse movimento coordenado — não os eletrões em si.

## Como é que isso se torna útil

Quando a carga em movimento encontra um aparelho, o aparelho obriga-a a realizar trabalho ao passar: uma resistência de aquecimento transforma o fluxo em calor, um motor transforma-o em movimento, um LED transforma-o em luz, um chip usa minúsculas correntes comutadas para calcular. Em todos os casos, a carga em movimento entrega energia, e o aparelho converte essa energia naquilo que querias.

## Perguntas frequentes

**O relâmpago é a mesma eletricidade que está na minha parede?**
É o mesmo fenómeno subjacente — um fluxo de carga — mas o relâmpago é uma descarga enorme e breve que iguala a carga acumulada entre a nuvem e o solo, a uma tensão muitíssimo superior à da rede doméstica.

**Qual é a diferença entre CA e CC?**
Na corrente contínua (CC, como numa pilha), a carga flui de forma constante num só sentido; na corrente alternada (CA, vinda da rede), inverte-se rapidamente para a frente e para trás. A CA é usada na rede porque é fácil aumentar e baixar a sua tensão para um transporte eficiente a longa distância.

**Porque é que os metais são bons condutores?**
Os seus átomos partilham um "mar" de eletrões frouxamente retidos e livres de se moverem, por isso a carga flui com facilidade. Os isolantes (borracha, vidro) prendem os seus eletrões com firmeza, e a carga não consegue fluir — é por isso que os fios são de cobre por dentro e de plástico por fora.`,
  },
];
