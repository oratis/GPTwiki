import type { DraftArticle } from './types';
import { digitalBuyingEn } from './digital-buying.en';

// Batch: Digital Buying Decisions (versão nativa em português). Mesmos temas e
// mesmos topicKey de digital-buying.en.ts, escritos de forma nativa para o
// contexto de compra do leitor brasileiro. Imagens compartilhadas.

const promptOf = (key: string): string => {
  const hit = digitalBuyingEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const digitalBuyingPt: DraftArticle[] = [
  {
    topicKey: 'oled-vs-lcd',
    title: 'OLED ou LCD: qual tela é realmente melhor?',
    question: 'Qual é a diferença real entre telas OLED e LCD, e qual eu deveria comprar?',
    summary:
      'O OLED acende cada pixel individualmente, garantindo pretos perfeitos e contraste infinito; o LCD usa uma luz de fundo atravessando uma camada de cristal líquido, ganhando em brilho sustentado e sem risco de burn-in. A escolha certa depende do ambiente, do conteúdo e do orçamento.',
    tags: ['tecnologia', 'telas', 'oled', 'compra de tv'],
    language: 'pt',
    image: {
      prompt: promptOf('oled-vs-lcd'),
      alt: 'Um painel de pixels autoiluminados ao lado de um painel iluminado por trás de forma uniforme',
    },
    sources: [
      { title: 'RTINGS — metodologia de comparação de TV OLED vs LED/LCD', url: 'https://www.rtings.com/tv/learn/led-vs-oled' },
    ],
    content: `# OLED ou LCD: qual tela é realmente melhor?

Toda a diferença se resume a uma única pergunta: **cada pixel produz a própria luz, ou todos compartilham uma luz de fundo?** Os pixels OLED são autoemissivos — cada um é uma luzinha que pode se apagar por completo. Os pixels LCD não produzem luz nenhuma; são persianas na frente de uma luz de fundo separada, abrindo e fechando para deixar a cor passar. Cada vantagem e cada fraqueza abaixo decorre desse único fato.

## Por que o OLED tem essa aparência

Como um pixel OLED pode se desligar totalmente, ele produz o **preto perfeito** — não cinza escuro, mas zero de luz. Coloque uma estrela brilhante ao lado dele e o contraste é praticamente infinito. Isso entrega aquela imagem profunda e tridimensional pela qual o OLED é famoso, além de precisão pixel a pixel: nenhum halo de luz vazando ao redor de objetos brilhantes sobre fundos escuros (o "blooming" que os LCDs combatem). Os pixels também mudam de estado quase instantaneamente, garantindo excelente nitidez em movimento.

As contrapartidas são igualmente físicas: o OLED não consegue ficar tão ofuscantemente brilhante numa tela inteiramente branca quanto os melhores LCDs, e, como o material orgânico envelhece com o uso, exibir o *mesmo* elemento estático (uma faixa de notícias, o logo de um canal, uma barra de tarefas) por milhares de horas traz risco de **burn-in** — um fantasma permanente e tênue. Os painéis modernos mitigam isso de forma agressiva, e o uso variado típico raramente provoca o problema, mas ele continua sendo uma consideração real para usos com muito conteúdo estático.

## Por que o LCD persiste (e melhorou)

A luz de fundo do LCD pode ser brutalmente intensa, o que faz dele o melhor desempenho em salas ensolaradas e para os realces vibrantes de HDR numa tela cheia. Ele não envelhece até virar burn-in e é mais barato em qualquer tamanho. Sua fraqueza nativa — pretos imperfeitos, porque a luz de fundo vaza pelos pixels "fechados" — foi reduzida pelo **escurecimento local (local dimming)**: dividir a luz de fundo em zonas que escurecem de forma independente. O Mini-LED leva isso adiante com milhares de zonas minúsculas, aproximando-se do contraste do OLED sem abrir mão do brilho do LCD. Mais zonas, pretos melhores — mas nunca o controle pixel a pixel do OLED.

## Qual comprar

| Sua situação | Melhor escolha |
| --- | --- |
| Sala escura, filmes e jogos, amante de contraste | OLED |
| Sala clara, com janelas e luminárias | LCD Mini-LED (o brilho vence) |
| TV exibindo o logo fixo de um canal o dia todo; PC com barra de tarefas fixa por horas | LCD (sem preocupação com burn-in) |
| Orçamento apertado, ou tamanho muito grande | LCD |
| Quer a melhor imagem pixel a pixel e aceita ter cuidado | OLED |

## Perguntas frequentes

**O burn-in ainda é um motivo para desistir?**
Para uso misto — filmes, esportes, jogos variados — é muito improvável nos painéis atuais, com suas proteções embutidas. Para 8 horas por dia da mesma interface estática, um LCD é a aposta mais segura no longo prazo.

**E o QLED — é um terceiro tipo?**
Não. O QLED é um LCD com um filme de pontos quânticos que melhora cor e brilho. Continua sendo um LCD com luz de fundo, não um painel autoemissivo como o OLED.

**O OLED consome menos energia?**
Depende do conteúdo: cenas escuras consomem pouco (pixels apagados não gastam nada), mas uma tela inteiramente brilhante pode consumir mais do que um LCD eficiente. Não há um vencedor simples.`,
  },
  {
    topicKey: 'noise-cancelling',
    title: 'Como os fones com cancelamento de ruído realmente funcionam',
    question: 'Como funcionam os fones com cancelamento de ruído, e qual é a diferença entre ativo e passivo?',
    summary:
      'O cancelamento ativo de ruído usa microfones para ouvir o som que chega e reproduz uma onda invertida que o anula — excelente para roncos graves e constantes, como motores, mas fraco contra vozes repentinas. O isolamento passivo apenas bloqueia o som fisicamente.',
    tags: ['tecnologia', 'fones de ouvido', 'áudio', 'cancelamento de ruído'],
    language: 'pt',
    image: {
      prompt: promptOf('noise-cancelling'),
      alt: 'Uma onda sonora irregular que chega encontra sua imagem espelhada e se aplaina',
    },
    sources: [
      { title: 'RTINGS — teste de isolamento de ruído em fones de ouvido', url: 'https://www.rtings.com/headphones/tests/isolation/noise-isolation' },
    ],
    content: `# Como os fones com cancelamento de ruído realmente funcionam

Existem duas maneiras completamente diferentes de deixar o mundo mais silencioso, e os bons fones usam as duas. O **isolamento passivo** é pura física: conchas e pontas que vedam o som fisicamente, como protetores auriculares. O **cancelamento ativo de ruído (ANC)** é eletrônica engenhosa: um microfone ouve o ruído que chega ao seu ouvido, e o fone gera o som *oposto* para anulá-lo. Entender o que cada um faz explica por que o ANC parece mágico num avião e inútil contra um bebê chorando.

## O truque por trás do cancelamento ativo

O som é uma onda de pressão. Se você reproduzir uma segunda onda que seja a imagem espelhada exata dela — cada pico casado com um vale — as duas somam quase nada. Isso é interferência destrutiva. Os fones com ANC captam o ruído que chega com microfones minúsculos, calculam o inverso e o reproduzem pelos mesmos drivers da sua música, em tempo real.

O problema é o *tempo*. O fone precisa medir, calcular e emitir a contraonda mais rápido do que o som muda. Isso funciona lindamente para ruído **constante, de baixa frequência e previsível** — o zumbido de uma turbina, o ronco de um trem, o hum de um ar-condicionado — em que o próximo instante é parecido com o anterior. Funciona mal para sons **repentinos, de alta frequência e imprevisíveis** — uma conversa próxima, um cachorro latindo, uma porta batendo — porque, quando o sistema reage, o som já mudou. É por isso que o ANC silencia o ronco do motor, mas mal arranha a conversa da mesa ao lado.

## A divisão de trabalho

| Ameaça | Tratada principalmente por | Por quê |
| --- | --- | --- |
| Turbina, trem, hum do ar-condicionado | Ativo (ANC) | Grave, constante, previsível — fácil de espelhar |
| Conversa de escritório, vozes | Vedação passiva | Rápido/variável demais para o ANC acompanhar |
| Estouros repentinos | Nenhum dos dois bem | Transientes imprevisíveis vencem ambos |
| Vento | Muitas vezes piorado pelo ANC | O vento atinge os microfones diretamente como ruído |

As altas frequências são, na verdade, bloqueadas melhor por uma boa vedação *física* do que pelo ANC, e é por isso que o encaixe importa enormemente — uma vedação que vaza sabota os dois métodos.

## O que observar na hora de comprar

Priorize **encaixe e vedação** primeiro (pontas in-ear que combinem com o seu ouvido, ou conchas over-ear que envolvam totalmente); a qualidade do ANC varia mais na *profundidade nas baixas frequências* e na *ausência de chiado* (ANC barato adiciona o próprio ruído branco tênue); e verifique se há um **modo de transparência** que usa os mesmos microfones para trazer o som de fora para *dentro* — útil para avisos ou conversas sem precisar tirar os fones.

## Perguntas frequentes

**O ANC prejudica a qualidade do som?**
Em bons fones modernos, de forma desprezível. Nos baratos, pode adicionar chiado ou alterar sutilmente o timbre. O fundo mais silencioso costuma melhorar a percepção de detalhes mais do que o ANC degrada.

**O ANC pode danificar meus ouvidos ou causar dor de cabeça?**
O cancelamento em si é inofensivo, mas algumas pessoas sentem uma espécie de pressão por causa do processamento constante de baixa frequência. É individual; o modo de transparência ou outro modelo costuma resolver.

**Um ANC caro vale a pena em relação ao barato?**
Para quem voa e se desloca com frequência, sim — a diferença no cancelamento de baixas frequências e no desempenho sem chiado é real. Para um silêncio ocasional, um par passivo com boa vedação pode bastar.`,
  },
  {
    topicKey: 'phone-battery-mah',
    title: 'Por que a bateria do celular não é só uma questão de mAh',
    question: 'Por que dois celulares com a mesma bateria em mAh têm durações completamente diferentes?',
    summary:
      'O mAh mede apenas quanta carga a bateria armazena. A duração real é essa capacidade dividida pela rapidez com que tudo a consome — eficiência do chip, tamanho e brilho da tela, software e sinal — então uma bateria menor pode facilmente durar mais.',
    tags: ['tecnologia', 'smartphones', 'bateria', 'dicas de compra'],
    language: 'pt',
    image: {
      prompt: promptOf('phone-battery-mah'),
      alt: 'Um tanque de luz alimentando vários consumidores que o esvaziam em ritmos diferentes',
    },
    sources: [
      { title: 'DXOMARK — protocolo de teste de bateria de smartphones', url: 'https://www.dxomark.com/category/smartphone-reviews/' },
    ],
    content: `# Por que a bateria do celular não é só uma questão de mAh

Dois celulares anunciam uma bateria de 5.000 mAh, mas um morre na hora do jantar e o outro segue tranquilo até o dia seguinte. O número não estava mentindo — ele apenas responde à pergunta errada. **O mAh mede o tamanho do tanque, não a autonomia.** A duração da bateria é o tamanho do tanque *dividido pelo* consumo, e o consumo varia enormemente entre celulares. Comprar só pelo mAh é como comprar um carro pelo tamanho do tanque ignorando o motor.

## A equação que realmente importa

Em termos gerais: **duração da bateria ≈ capacidade ÷ consumo de energia.** A capacidade (mAh, ou mais precisamente watts-hora) é um termo. O outro é tudo o que a esvazia:

- **Eficiência do chip.** O processo de fabricação do processador (seu "nanômetro") afeta enormemente quanta energia ele consome para o mesmo trabalho. Um chip mais novo e eficiente faz mais por miliampère — às vezes superando totalmente uma diferença bruta de capacidade.
- **A tela.** Geralmente o maior consumidor isolado. Uma tela maior, mais brilhante e com taxa de atualização mais alta (120 Hz) gasta muito mais do que uma menor, mais escura e de 60 Hz. É por isso que celulares de tela grande precisam de baterias grandes só para empatar.
- **Otimização de software.** A agressividade com que o sistema operacional adormece apps em segundo plano, limita o consumo ocioso e gerencia os despertares pode mudar drasticamente a autonomia de um dia inteiro — o mesmo hardware dura diferente sob um software ajustado ou não.
- **Rádios e sinal.** Sinal celular fraco faz o celular "gritar mais alto" (mais energia); o 5G pode consumir mais que o 4G; a conectividade sempre ativa vai somando.

## Por que uma bateria menor às vezes vence

Coloque uma bateria menor atrás de um chip eficiente, de uma tela modesta e de um software bem ajustado, e ela dura mais do que uma bateria maior arrastada por uma tela faminta de energia e por uma otimização frouxa. Os 4.500 mAh da ficha técnica podem genuinamente vencer o rival de 5.000 mAh. O sinal honesto não é o número de mAh — é o **tempo de tela medido por avaliadores independentes** em testes padronizados, que reúne todas as variáveis ocultas num único resultado comparável.

## O que verificar antes de comprar

| Não confie em | Confie nisso |
| --- | --- |
| Apenas no número de mAh | Tempo de tela medido por avaliadores / notas de autonomia |
| "Bateria maior = mais duração" | A combinação de bateria com a eficiência do chip e a tela |
| Potência do carregador como "duração" | Velocidade de carga e duração da bateria são coisas diferentes |

A velocidade de carga (watts) também é separada: um celular pode carregar rápido *e* descarregar rápido. Não confunda "completa em 30 minutos" com "dura o dia todo".

## Perguntas frequentes

**Mais mAh chega a ser ruim?**
Baterias maiores adicionam peso e espessura e demoram mais para carregar. Depois do "tranquilo o dia todo", mais capacidade tem valor decrescente diante de um celular mais leve.

**Por que a duração da minha bateria piora ao longo de alguns anos?**
As baterias de lítio envelhecem quimicamente, perdendo capacidade máxima a cada ciclo de carga — normalmente retendo cerca de 80% após algumas centenas de ciclos completos. O tanque encolhe fisicamente com o tempo.

**O 5G realmente prejudica a bateria?**
Pode, especialmente em áreas de 5G instável, onde o celular fica buscando entre redes. Muitos celulares permitem limitar ao 4G/LTE para economizar energia quando a velocidade do 5G não é necessária.`,
  },
  {
    topicKey: 'ssd-vs-hdd',
    title: 'SSD ou HD: qual é a diferença e de qual você precisa?',
    question: 'Qual é a diferença entre um SSD e um HD, e qual eu deveria escolher?',
    summary:
      'Um SSD guarda os dados em chips de memória flash, sem partes móveis — muito mais rápido, silencioso e resistente a impactos. Um HD usa discos magnéticos giratórios — mais lento, mas muito mais barato por terabyte. A maioria quer um SSD para o sistema e um HD para armazenamento em massa.',
    tags: ['tecnologia', 'armazenamento', 'ssd', 'compra de computador'],
    language: 'pt',
    image: {
      prompt: promptOf('ssd-vs-hdd'),
      alt: 'Um armazenamento baseado em chips estáticos ao lado de discos giratórios com um braço de leitura',
    },
    sources: [
      { title: 'Backblaze — estatísticas de confiabilidade e armazenamento de discos', url: 'https://www.backblaze.com/cloud-storage/resources/hard-drive-test-data' },
    ],
    content: `# SSD ou HD: qual é a diferença e de qual você precisa?

As duas formas de guardar seus arquivos diferem tão profundamente quanto uma vitrola difere de um cartão de memória. Um **disco rígido (HD)** grava os dados magneticamente em discos giratórios, lidos por um braço físico que se desloca até o ponto certo — como uma vitrola minúscula e veloz. Um **disco de estado sólido (SSD)** armazena os dados como carga elétrica em chips de memória flash, **sem nenhuma parte móvel**. Essa divisão entre mecânico e eletrônico produz cada diferença que vem a seguir.

## Velocidade: a diferença que você sente todo dia

Um SSD não tem nada para mover fisicamente, então encontra e entrega os dados quase instantaneamente. Um HD precisa esperar o disco girar até o lugar certo e o braço alcançar a trilha certa — milissegundos que se acumulam ao longo dos milhares de pequenas leituras que um computador faz só para iniciar ou abrir um app. Na prática:

- **Tempo de inicialização:** SSD em segundos vs HD em um minuto ou mais.
- **Abrir apps e arquivos:** quase instantâneo vs lentidão perceptível.
- **Acesso aleatório** (arquivos pequenos espalhados — o que a computação do dia a dia realmente é): os SSDs são drasticamente mais rápidos, muitas vezes 10 a 100×.

Colocar um SSD num computador antigo é a melhoria de velocidade mais dramática disponível — faz a máquina parecer nova mais do que qualquer outra mudança.

## As contrapartidas

| Propriedade | SSD | HD |
| --- | --- | --- |
| Velocidade | Muito rápido | Muito mais lento |
| Preço por terabyte | Mais alto | Muito mais barato — melhor custo para massa |
| Partes móveis | Nenhuma | Sim — vulnerável a quedas/impactos |
| Ruído e calor | Silencioso, frio | Giro audível, mais calor |
| Teto de capacidade (consumo) | Grande, mais caro no topo | As maiores capacidades pelo menor preço |
| Modo de falha | Muitas vezes súbito, eletrônico | Muitas vezes dá ruídos de aviso |

Os HDs ainda vencem decisivamente no **custo por terabyte**, e é por isso que o armazenamento em massa — grandes bibliotecas de mídia, backups, arquivos — continua sendo seu reduto. Os SSDs vencem em tudo onde velocidade ou durabilidade importam.

## A resposta prática para a maioria das pessoas

Use os dois, por função:

- **SSD para o sistema operacional e os apps/arquivos ativos** — é o que faz o computador parecer rápido.
- **HD (ou nuvem) para arquivos em massa** — vídeos, bibliotecas de fotos, backups que você não abre diariamente.

Se o aparelho só tem espaço para um (a maioria dos notebooks, todos os celulares), que seja um SSD — a velocidade vale o preço por gigabyte, e você descarrega a massa para armazenamento externo ou na nuvem. Para SSDs, observe também a *interface*: SSDs NVMe (PCIe) são várias vezes mais rápidos que os SSDs SATA antigos, embora, para o uso geral, até um SSD SATA pareça instantâneo perto de qualquer HD.

## Perguntas frequentes

**Qual dura mais / é mais confiável?**
Os dois são confiáveis hoje. Os SSDs não têm peças para desgastar mecanicamente, mas têm um número finito de gravações (muito além do uso normal). Os HDs podem morrer com uma queda. Para a longevidade, o que mais importa é ter um backup — qualquer disco isolado pode falhar.

**Os SSDs se desgastam por excesso de gravações?**
Existe um limite de gravação, mas, para usuários típicos, ele é efetivamente inalcançável dentro da vida útil do disco. Cargas profissionais pesadas de gravação são a única preocupação real.

**Um SSD mais caro é sempre mais rápido?**
Nem sempre de forma significativa — a partir de certo ponto, as velocidades NVMe excedem o que as tarefas do dia a dia conseguem usar. Capacidade e confiabilidade muitas vezes importam mais para você do que os números de pico em benchmarks.`,
  },
  {
    topicKey: 'megapixels-myth',
    title: 'Mais megapixels significam uma câmera melhor?',
    question: 'Mais megapixels fazem uma câmera melhor, e o que realmente importa para a qualidade da foto?',
    summary:
      'Os megapixels só definem o tamanho da impressão ou o quanto você pode recortar — passado certo ponto, ter mais deles num sensor pequeno pode até prejudicar. Tamanho do sensor, qualidade da lente e processamento de imagem importam muito mais para as fotos que você realmente vê.',
    tags: ['tecnologia', 'câmeras', 'fotografia', 'smartphones'],
    language: 'pt',
    image: {
      prompt: promptOf('megapixels-myth'),
      alt: 'Um sensor grande captando muita luz ao lado de um minúsculo captando pouca',
    },
    sources: [
      { title: 'DXOMARK — teste de qualidade de imagem de câmeras e smartphones', url: 'https://www.dxomark.com' },
    ],
    content: `# Mais megapixels significam uma câmera melhor?

O marketing adora megapixels porque são um único número grande que soa como "mais". Mas os megapixels respondem a apenas uma pergunta estreita — **quantos pontos compõem a imagem** — e essa pergunta deixou de importar para a maioria das pessoas anos atrás. Uma foto de 12 megapixels já tem detalhe suficiente para imprimir em tamanho de pôster ou preencher qualquer tela que você tenha. As coisas que realmente deixam uma foto bonita moram em outro lugar.

## O que os megapixels controlam e o que não controlam

Os megapixels determinam a **resolução**: o quanto você pode imprimir ou o quanto pode recortar para dentro antes de a imagem ficar quadriculada. Só isso. Eles não dizem nada sobre cor, desempenho em pouca luz, nitidez ou aquela qualidade difícil de nomear que faz uma foto "saltar".

Pior: num sensor pequeno, *mais* megapixels podem sair pela culatra. Amontoe mais pixels no mesmo chip minúsculo e cada pixel fica menor, captando menos luz — o que significa mais granulação em cenas escuras. É por isso que um celular de 12 MP pode tirar fotos noturnas mais limpas que um de 48 MP: pixels maiores, mais luz cada um. (Os celulares modernos reagem com o "pixel binning" — fundindo vários pixels pequenos num pixel virtual maior em pouca luz, trocando resolução por limpeza.)

## O que realmente determina a qualidade da foto

| Fator | Por que importa | Efeito em linguagem simples |
| --- | --- | --- |
| **Tamanho do sensor** | Sensor maior = mais luz total captada | O fator de hardware nº 1; melhor em pouca luz, desfoque de fundo mais bonito |
| **Qualidade da lente** | Nitidez, abertura (luz que entra), distorção | Um ótimo sensor atrás de uma lente ruim é desperdício |
| **Processamento de imagem** | O software transforma a luz bruta no resultado final | Muitas vezes o fator decisivo nos celulares |
| **Tamanho do pixel** | Pixels maiores captam mais luz cada um | Imagens mais limpas no escuro |
| Megapixels | Apenas resolução / margem de recorte | Só importa em grandes impressões ou recortes pesados |

O fato de hardware mais importante é o **tamanho do sensor**: é por isso que uma câmera profissional com "apenas" 24 MP esmaga um celular de 108 MP — seu sensor é muitas vezes maior, captando muito mais luz. E nos celulares, em especial, o **processamento** (fotografia computacional) pode importar mais que qualquer ficha técnica, e é por isso que dois celulares com sensores idênticos podem produzir fotos visivelmente diferentes.

## Como realmente avaliar uma câmera

Ignore a manchete dos megapixels. Em vez disso: observe o **tamanho do sensor** (muitas vezes indicado como uma fração, tipo 1/1,3"; maior é melhor), veja **fotos de amostra e avaliações independentes** — especialmente fotos em pouca luz e com zoom — e pese **os recursos que você vai usar** (estabilização, ultra-angular, zoom real vs digital). As próprias fotos, feitas por avaliadores em condições reais, dizem tudo o que a ficha técnica esconde.

## Perguntas frequentes

**Então celulares com muitos megapixels são uma cilada?**
Não — contagens altas ajudam de verdade se você recorta de forma agressiva ou quer a flexibilidade do pixel binning. Elas apenas não são a prova de qualidade que o número sugere.

**Por que câmeras profissionais têm menos megapixels que os celulares?**
Porque priorizam pixels grandes em sensores grandes em vez da contagem bruta de pixels. A qualidade de imagem por pixel vence a quantidade para quase todo propósito.

**Mais zoom na caixa significa zoom melhor?**
Fique atento a *digital* vs *óptico*. O zoom óptico (ampliação real da lente) preserva a qualidade; o zoom digital apenas recorta e amplia, o que qualquer megapixel consegue fingir. "Zoom de 100×" é, em sua maioria, digital e, em sua maioria, papa.`,
  },
  {
    topicKey: 'wifi-vs-bandwidth',
    title: 'Por que seu plano de internet rápido ainda parece lento',
    question: 'Por que meu WiFi é lento mesmo eu pagando por um plano de internet rápido?',
    summary:
      'A velocidade que você compra é o cano que entra na sua casa; o WiFi é como ela percorre os últimos metros — e é nesse trecho final que mora a maior parte da lentidão. Distância, paredes, interferência, hardware velho e excesso de dispositivos derrubam a velocidade real para muito abaixo do plano.',
    tags: ['tecnologia', 'wifi', 'internet', 'redes'],
    language: 'pt',
    image: {
      prompt: promptOf('wifi-vs-bandwidth'),
      alt: 'Um cano de luz largo estreitando-se em ondas sem fio que enfraquecem ao atravessar paredes',
    },
    sources: [
      { title: 'FCC — guia do consumidor sobre velocidade de banda larga', url: 'https://www.fcc.gov/consumers/guides/getting-broadband-qa' },
    ],
    content: `# Por que seu plano de internet rápido ainda parece lento

Você paga por "300 megabits", mas o vídeo trava e as páginas se arrastam. O plano provavelmente não está mentindo — o gargalo quase sempre está *depois* de a internet entrar na sua casa. Pense nisso como duas viagens separadas: a **velocidade do plano** é o cano largo chegando ao seu prédio; o **WiFi** é o último trecho de poucos metros pelo ar até o seu aparelho. Esse salto final e invisível é onde a maior parte da lentidão real é criada e quase nunca anunciada.

## As duas viagens, separadas

O número na sua conta descreve a conexão até a sua casa (muitas vezes um link com fio até o roteador). Do roteador em diante, seus aparelhos geralmente se conectam por **WiFi** — ondas de rádio — e as ondas de rádio são frágeis. Elas enfraquecem com a distância, são absorvidas por paredes (especialmente concreto, tijolo, metal e água — inclusive a água do corpo humano) e competem com vizinhos e eletrodomésticos nas mesmas frequências. Um plano de 300 Mbps pode entregar 300 a um aparelho conectado por cabo, mas só 40 a um celular a dois cômodos e três paredes de distância.

## Os suspeitos de sempre, em ordem

| Causa | O que faz | Solução |
| --- | --- | --- |
| **Distância e paredes** | O sinal enfraquece rápido através de obstáculos | Aproxime-se; reposicione o roteador central e alto |
| **Roteador velho** | Não entrega velocidades modernas, mesmo que o plano consiga | Atualize para o WiFi atual (WiFi 6/6E/7) |
| **Banda de 2,4 vs 5 GHz** | 2,4 GHz alcança longe mas é lento; 5 GHz é rápido mas curto | Use 5 GHz de perto, 2,4 GHz para alcance |
| **Frequências congestionadas** | Vizinhos/micro-ondas/Bluetooth interferem | 5 GHz, ou mude de canal |
| **Dispositivos demais** | Todos dividindo a atenção de um roteador | Sistema mesh; passe cabo nos usuários pesados |
| **O upload do plano** | Muitas vezes bem menor que o download | Veja se uploads (chamadas, backups) é que doem |

A solução isolada mais comum é simplesmente o **posicionamento do roteador**: central, elevado, à mostra — não dentro de um armário, no porão ou atrás da TV. O rádio detesta cantos e ambientes fechados.

## Quando o plano realmente é o limite

Às vezes você de fato *superou* o plano: muita gente em chamadas de vídeo e streams em 4K ao mesmo tempo pode genuinamente saturar um plano menor. Mas teste antes de fazer upgrade — rode um teste de velocidade **conectado por cabo** ao lado do roteador (sua velocidade real de plano) e de novo **no WiFi onde você de fato usa** (sua experiência real). Se o teste com fio atinge o plano mas o WiFi não, pagar por um plano mais rápido não vai ajudar; consertar o WiFi vai.

## Perguntas frequentes

**Um plano mais rápido vai consertar o WiFi lento?**
Geralmente não. Se o WiFi é o gargalo, um cano maior entrando na casa só chega ao mesmo trecho final estreito. Conserte o WiFi primeiro.

**Sistema mesh ou repetidor de WiFi?**
Um sistema mesh (várias unidades coordenadas) geralmente supera um repetidor isolado, que muitas vezes corta a velocidade pela metade e cria uma rede separada e mais fraca. Para casas maiores, o mesh é a resposta moderna.

**Passar cabo nos aparelhos ainda importa?**
Sim — um cabo (Ethernet) dá a velocidade plena e estável, sem interferência. Para um desktop, console ou TV que não se move, passar cabo é o upgrade mais confiável que existe.`,
  },
  {
    topicKey: 'fast-charging',
    title: 'O carregamento rápido faz mal para a bateria?',
    question: 'O carregamento rápido danifica a bateria do meu celular, e como devo carregar para ela durar mais?',
    summary:
      'O carregamento rápido adiciona algum calor e estresse, mas os celulares modernos gerenciam isso com cuidado, então o impacto no dia a dia é modesto. O calor e ficar em 100% é o que mais envelhece as baterias — os hábitos importam mais que a velocidade de carga.',
    tags: ['tecnologia', 'baterias', 'carregamento', 'smartphones'],
    language: 'pt',
    image: {
      prompt: promptOf('fast-charging'),
      alt: 'Uma bateria enchendo-se de luz rapidamente, mantida fria dentro de uma faixa segura de temperatura',
    },
    sources: [
      { title: 'Battery University — como as baterias de íon de lítio envelhecem', url: 'https://batteryuniversity.com/article/bu-808-how-to-prolong-lithium-based-batteries' },
    ],
    content: `# O carregamento rápido faz mal para a bateria?

A resposta curta: **o carregamento rápido causa algum desgaste extra, mas muito menos do que a internet teme — e muito menos do que o calor causa.** Os celulares modernos não despejam energia às cegas; eles orquestram a carga com cuidado, e os maiores inimigos da longevidade da bateria acabam sendo coisas que a maioria ignora. Para entender por quê, é preciso saber como uma bateria de lítio envelhece.

## Como as baterias de lítio envelhecem

Uma bateria de íon de lítio se desgasta por dois mecanismos: o **envelhecimento por ciclo** (cada carga-descarga completa reduz gradualmente a capacidade máxima) e o **envelhecimento de calendário** (degradação química com o tempo, acelerada pelo calor e por ficar em carga alta). Duas condições a punem mais:

- **Calor.** O maior acelerador isolado. A alta temperatura acelera as reações químicas que degradam a célula. Uma bateria quente envelhece rápido, não importa como tenha esquentado.
- **Níveis extremos de carga.** Ficar totalmente em 100% (especialmente quando quente) estressa a bateria, assim como descarregar a 0%. O meio suave (mais ou menos 20% a 80%) é onde o lítio fica mais feliz.

O carregamento rápido importa principalmente porque *gera calor* — mas o quanto realmente chega à célula depende inteiramente do projeto do celular.

## Por que o carregamento rápido moderno está, em geral, tranquilo

Os celulares não são passivos. Eles gerenciam ativamente o carregamento:

- **A velocidade não é constante.** O carregamento rápido é mais veloz quando a bateria está quase vazia, e depois desacelera de propósito conforme enche — a maior parte da velocidade da manchete "0 a 50% em 20 minutos" acontece na faixa baixa e segura, afrouxando perto do topo.
- **O gerenciamento térmico freia o calor.** O celular monitora a temperatura e reduz a potência de carga (ou pausa) se esquentar demais.
- **Recursos de saúde da bateria.** Muitos celulares agora aprendem sua rotina e seguram em 80% durante a noite, completando até 100% pouco antes de você acordar — minimizando o tempo passado estressado em carga cheia.

Então o carregamento rápido projetado pelo fabricante que vem com o seu celular é feito para manter a célula dentro de limites seguros. A diferença de perda de capacidade no dia a dia entre carga rápida e lenta, num celular bem projetado, é real, mas modesta.

## Hábitos que importam mais que a velocidade de carga

| Ajuda a bateria | Prejudica a bateria |
| --- | --- |
| Mantê-la fresca | Carregar/jogar até esquentar; sol, carro quente |
| Viver mais ou menos entre 20% e 80% | 100% constante (ou descarregar a 0%) |
| Usar carregadores de qualidade/oficiais | Carregadores baratos sem certificação |
| Ativar o "carregamento otimizado" | Carregar debaixo do travesseiro (retém calor) |

Repare que a *velocidade* de carga mal aparece — **a temperatura e o nível de carga dominam**. Preocupar-se com o carregamento rápido enquanto joga com o celular quente em 100% a noite toda é coar o mosquito e engolir o camelo.

## Perguntas frequentes

**Devo evitar o carregamento rápido para preservar a bateria?**
Não é necessário num celular projetado para ele. Se quer ser gentil, carregue devagar durante a noite usando o modo de carregamento otimizado, e reserve o carregamento rápido para quando precisar de um reforço rápido.

**É ruim deixar o celular carregando a noite toda?**
Menos do que costumava ser — os celulares param de puxar energia em 100% e muitos adiam a parcela final. A leve desvantagem são as horas passadas em 100%; os recursos de carregamento otimizado existem justamente para isso.

**Carregadores rápidos de terceiros danificam a bateria?**
Carregadores certificados e respeitáveis que correspondam ao padrão do seu celular estão ok. O risco está em unidades baratas e sem certificação, com regulação ruim — falsa economia para um aparelho caro.`,
  },
  {
    topicKey: 'refresh-rate',
    title: 'O que é taxa de atualização, e 120 Hz vale a pena?',
    question: 'O que significa a taxa de atualização (Hz) em uma tela, e uma tela de 120 Hz vale o preço?',
    summary:
      'A taxa de atualização é quantas vezes por segundo uma tela se redesenha — 120 Hz atualiza duas vezes mais que 60 Hz, deixando o movimento e a rolagem visivelmente mais suaves. É um upgrade real e agradável para jogos e para o tato do dia a dia, mas custa bateria e dinheiro.',
    tags: ['tecnologia', 'telas', 'taxa de atualização', 'jogos'],
    language: 'pt',
    image: {
      prompt: promptOf('refresh-rate'),
      alt: 'Um orbe em movimento mostrado como passos esparsos versus um rastro denso e suave',
    },
    sources: [
      { title: 'RTINGS — teste de taxa de atualização e movimento de monitores', url: 'https://www.rtings.com/monitor/tests/motion/refresh-rate-and-motion-blur' },
    ],
    content: `# O que é taxa de atualização, e 120 Hz vale a pena?

A taxa de atualização, medida em hertz (Hz), é simplesmente **quantas vezes por segundo a tela redesenha a imagem.** Uma tela de 60 Hz se atualiza 60 vezes por segundo; uma de 120 Hz, 120 vezes. Como todo movimento na tela é, na verdade, um flipbook de imagens estáticas, mais atualizações por segundo significam saltos menores entre elas — o que seu olho lê como movimento mais suave. É uma das poucas fichas técnicas cujo benefício você sente na hora, mesmo sem saber nomeá-lo.

## Por que mais atualizações parecem mais suaves

Imagine um objeto cruzando a tela. A 60 Hz, a tela mostra sua posição 60 vezes ao longo do caminho; a 120 Hz, 120 vezes — então cada passo é metade do tamanho, e o movimento parece mais contínuo e menos trêmulo. O efeito é mais óbvio em três situações do dia a dia:

- **Rolar** textos e páginas — suave e legível em movimento, em vez de um borrão deslizante.
- **Jogos** — a ação rápida parece fluida e (com o hardware para sustentá-la) pode parecer mais responsiva.
- **Interface em geral** — animações, gestos e transições simplesmente parecem "mais agradáveis", uma qualidade que as pessoas notam de imediato num celular topo de linha, mesmo sem saber por quê.

Depois de se acostumar com 120 Hz, 60 Hz pode parecer sutilmente engasgado — um clássico upgrade do tipo "não dá para desver".

## As pegadinhas

| Benefício | Custo |
| --- | --- |
| Movimento e rolagem mais suaves | Preço mais alto |
| Sensação mais responsiva nos jogos | Consome mais bateria (celulares) |
| Tato premium no dia a dia | Precisa de conteúdo/hardware que de fato produza os quadros |

Duas ressalvas honestas. Primeira, a **bateria**: atualizar duas vezes mais consome energia, e é por isso que muitos celulares oferecem atualização "adaptativa", que cai para taxas baixas em conteúdo estático e só sobe quando necessário. Segunda, **é preciso ter quadros para exibir**: uma tela de 120 Hz só ajuda se algo estiver produzindo 120 imagens por segundo. Um jogo rodando a 45 quadros por segundo não preenche uma tela de 120 Hz; uma foto estática fica idêntica em qualquer taxa de atualização. A tela é o *teto*, não uma garantia.

## Vale a pena?

| Você é… | Veredito |
| --- | --- |
| Gamer (PC ou console) | Sim — entre os upgrades mais sentidos |
| Comprador de celular que valoriza o "tato" | Sim — a suavidade da rolagem e da interface é constante |
| Com orçamento apertado, assistindo mais a vídeo | Prioridade baixa — cinema é ~24 fps e não se beneficia muito |
| Obcecado por duração de bateria | Use o modo adaptativo, ou pondere a troca |

Para a maioria dos compradores de celulares topo de linha e de jogos, 120 Hz é uma melhoria genuína e sentida diariamente. Para um aparelho de entrada usado principalmente para vídeo e mensagens, o dinheiro muitas vezes rende mais em outro lugar (brilho, bateria, armazenamento).

## Perguntas frequentes

**O olho humano consegue ver além de 60 Hz?**
Sim — a maioria das pessoas percebe claramente o salto de suavidade para 120 Hz, especialmente em movimento e rolagem. Os benefícios continuam acima disso para jogos rápidos, com retornos decrescentes.

**Uma tela de 120 Hz deixa os filmes melhores?**
Não muito — a maioria dos filmes é masterizada a ~24 fps, então parece igual. O benefício está no conteúdo interativo e na rolagem, não no vídeo passivo.

**144 Hz, 240 Hz — valem a pena em relação a 120?**
Para jogos competitivos, a suavidade e a responsividade extras ajudam, com retornos decrescentes. Para celulares e uso geral, 120 Hz já captura a maior parte do benefício.`,
  },
  {
    topicKey: 'ram-explained',
    title: 'Quanta RAM você realmente precisa?',
    question: 'O que a RAM faz, e quanta eu realmente preciso em um celular ou notebook?',
    summary:
      'A RAM é a área de trabalho de curto prazo do aparelho — guarda o que você está usando para que o processador a alcance na hora. Mais RAM permite fazer mais ao mesmo tempo, mas, além do que você usa, a extra fica ociosa. Não é armazenamento nem um multiplicador de velocidade.',
    tags: ['tecnologia', 'computadores', 'ram', 'dicas de compra'],
    language: 'pt',
    image: {
      prompt: promptOf('ram-explained'),
      alt: 'Uma mesa de trabalho iluminada com itens ativos ao lado de um armário de armazenamento fechado',
    },
    sources: [
      { title: 'Crucial — quanta RAM você precisa (orientação de memória)', url: 'https://www.crucial.com/articles/about-memory/how-much-ram-do-i-need' },
    ],
    content: `# Quanta RAM você realmente precisa?

A RAM (memória de acesso aleatório) é a ficha técnica mais mal compreendida da informática porque é constantemente confundida com armazenamento. Aqui vai o modelo mental limpo: **o armazenamento é o seu arquivo; a RAM é a sua mesa.** O arquivo (SSD/HD) guarda tudo, mesmo desligado. A mesa (RAM) guarda apenas o que você está *trabalhando ativamente agora*, onde o processador pode pegar na hora. Uma mesa maior permite manter mais coisas abertas ao mesmo tempo — esse é o trabalho inteiro da RAM.

## O que a RAM realmente faz

Quando você abre um app, o sistema o carrega do armazenamento lento para a "mesa" rápida da RAM, para que o processador trabalhe com ele em velocidade. Cada app em execução, cada aba do navegador, o próprio sistema operacional — todos ocupam espaço na mesa. Quando a mesa enche, o sistema começa a empurrar coisas de volta ao armazenamento lento para abrir espaço, e *esse* vaivém é o que você sente como lentidão: apps recarregando quando você volta a eles, travadinhas com muitas abas. Mais RAM significa que mais coisas podem ficar abertas e disponíveis na hora — sem reorganizações.

Duas coisas que a RAM **não** é: ela não é armazenamento (esquece tudo ao desligar — é uma área de trabalho, não um cofre) e não é um simples multiplicador de velocidade. Ir além do que sua carga de trabalho usa não traz **nenhum benefício** — uma parte vazia da mesa não faz você trabalhar mais rápido. O ganho de adicionar RAM só é real até o ponto em que você para de ficar sem ela.

## Quantidades sensatas (em meados da década de 2020)

| Uso | RAM confortável |
| --- | --- |
| Leve: web, e-mail, vídeo, documentos básicos | 8 GB (funcional, ficando apertado) |
| Comum: muitas abas, apps de escritório, multitarefa leve | 16 GB — o ponto ideal atual |
| Pesado: grandes conjuntos de dados, máquinas virtuais, apps profissionais de criação | 32 GB+ |
| Jogos sérios | 16 a 32 GB |
| Celulares | 8 GB já basta para a maioria; 12 GB é uma folga confortável |

Para a maioria dos compradores de notebook, **16 GB é o padrão inteligente** — suficiente para multitarefa livre por anos sem pagar a mais por uma capacidade que você nunca vai tocar. 8 GB ainda funciona para uso leve, mas se sente cada vez mais limitado; 32 GB só justifica o custo sob cargas genuinamente exigentes.

## Uma observação sobre celulares

A RAM dos celulares funciona de forma parecida, mas é gerenciada de modo mais agressivo pelo sistema, que suspende apps em segundo plano para caber. Além de uma quantidade confortável, mais RAM basicamente mantém mais apps "congelados" em segundo plano — bom, mas com retornos decrescentes. Os chamativos "16 GB" de alguns celulares estão muito além do que o software móvel costuma precisar; muitas vezes é mais flexão de ficha técnica do que benefício sentido.

## Perguntas frequentes

**Mais RAM vai acelerar meu computador lento?**
Só se você estiver de fato ficando sem ela (vaivém constante de disco, apps recarregando). Se você tem folga de sobra, o gargalo está em outro lugar — muitas vezes um HD antigo, onde um SSD é a verdadeira solução.

**RAM mais rápida (mais MHz) vale a pena?**
Para a maioria dos usuários, marginalmente — a capacidade (GB suficientes) importa muito mais que a velocidade. A velocidade ajuda em cargas específicas (alguns jogos, gráficos integrados), mas não transforma o uso geral.

**Posso adicionar RAM depois?**
Em muitos desktops e em alguns notebooks, sim; em celulares, notebooks finos e projetos soldados, não — a quantidade que você compra é permanente. Quando não dá para atualizar, compre um pouco mais de folga do que precisa hoje.`,
  },
  {
    topicKey: 'usb-c-confusion',
    title: 'Por que os cabos USB-C são tão confusos?',
    question: 'Por que os cabos USB-C se comportam de forma tão diferente se todos parecem idênticos?',
    summary:
      'USB-C é só o formato do plugue — não o que tem dentro. Dois cabos de aparência idêntica podem diferir muito em potência de carga, velocidade de dados e suporte a vídeo, porque o padrão do conector e suas capacidades são coisas separadas.',
    tags: ['tecnologia', 'usb-c', 'cabos', 'dicas de compra'],
    language: 'pt',
    image: {
      prompt: promptOf('usb-c-confusion'),
      alt: 'Conectores de aparência idêntica revelando fiações internas muito diferentes',
    },
    sources: [
      { title: 'USB Implementers Forum — visão geral do USB-C e certificação', url: 'https://www.usb.org/usb-c' },
    ],
    content: `# Por que os cabos USB-C são tão confusos?

A verdade enlouquecedora sobre o USB-C é que **o conector é só um formato.** Aquele plugue oval e reversível não diz nada sobre o que o cabo realmente consegue *fazer* — só que ele vai encaixar na porta. Dois cabos que parecem idênticos, têm o mesmo toque e custam valores muito diferentes podem ter capacidades completamente distintas por dentro. A indústria padronizou o plugue, mas não os poderes por trás dele, e essa lacuna é a origem inteira da confusão.

## Um formato, muitas habilidades ocultas

Pense no USB-C como uma porta padronizada pela qual coisas muito diferentes podem passar. Por trás de portas idênticas, um dado cabo pode ter suporte a:

- **Potência de carga** — de um fiozinho de energia (suficiente para um celular) até o bastante para um notebook e além. Os cabos de alta potência têm fiação interna mais grossa; um cabo fino só de carga pode se recusar a alimentar um notebook.
- **Velocidade de dados** — das velocidades antigas e lentas do USB 2.0 às taxas de transferência modernas e velozes. Um cabo que carrega bem pode mover arquivos a passo de lesma, porque dados e energia usam fios internos diferentes.
- **Saída de vídeo** — alguns cabos USB-C levam sinais de tela (a um monitor) e outros simplesmente não, sem nenhum sinal externo da diferença.

Então o cabo barato na gaveta pode carregar seu celular perfeitamente e ainda assim não conseguir alimentar um monitor ou transferir arquivos depressa — não está quebrado, só foi feito para menos.

## Por que isso aconteceu

O USB-C deliberadamente colocou muitos recursos possíveis através de um único conector universal, para substituir a antiga selva de plugues incompatíveis. A vantagem é uma porta para tudo; a desvantagem é que "tem um plugue USB-C" não diz mais as capacidades — elas dependem de quais padrões subjacentes (e quais fios) o cabo e os aparelhos específicos implementam. A nomenclatura piorou tudo: os padrões de dados por trás da porta foram renomeados repetidas vezes, então até os rótulos confundem.

## Como evitar se queimar

| Quer… | Procure por |
| --- | --- |
| Carregar um notebook / aparelho de alta potência | Um cabo classificado para a potência que você precisa (ex.: 100 W / 240 W); cabos grossos de qualidade |
| Transferir arquivos rápido | A especificação de dados (ex.: "USB 3.2 / USB4 / 10 a 40 Gbps"), não só "USB-C" |
| Conectar a um monitor | Suporte explícito a vídeo ("DisplayPort Alt Mode" / Thunderbolt) |
| Só ir no seguro | Marcas respeitáveis, cabos certificados; guarde o cabo que veio com o aparelho e identifique-o |

Dois hábitos práticos poupam mais dor de cabeça: **mantenha os bons cabos identificados** (o que carrega seu notebook não é intercambiável com o brinde que veio com os fones), e **compre cabos certificados de marcas respeitáveis** — cabos de alta potência sem certificação também são uma preocupação real de segurança, não só de desempenho.

## Perguntas frequentes

**Por que meu celular carrega devagar com um cabo, mas rápido com outro?**
O cabo lento provavelmente suporta menos potência ou não tem os fios para a negociação de carga rápida. A velocidade de carga depende do cabo, do carregador *e* do celular, todos concordando com um padrão rápido.

**Thunderbolt é a mesma coisa que USB-C?**
O Thunderbolt usa o conector USB-C, mas é um superconjunto de ponta — velocidades máximas, vídeo e dados garantidos. Todas as portas Thunderbolt têm formato USB-C; nem toda porta USB-C é Thunderbolt.

**Um cabo ruim pode danificar meu aparelho?**
Um cabo de alta potência mal feito e sem certificação pode ser um perigo real. Cabos certificados e respeitáveis têm o circuito de segurança para negociar a potência corretamente — vale o pequeno acréscimo em qualquer coisa que conduza potência séria.`,
  },
];
