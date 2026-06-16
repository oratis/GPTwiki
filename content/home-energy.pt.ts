import type { DraftArticle } from './types';
import { homeEnergyEn } from './home-energy.en';

// Batch: Home & Energy (versão nativa em português). Mesmos títulos e topicKeys
// que home-energy.en.ts, com conteúdo escrito de forma nativa para o leitor
// lusófono. As imagens são compartilhadas.

const promptOf = (key: string): string => {
  const hit = homeEnergyEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const homeEnergyPt: DraftArticle[] = [
  {
    topicKey: 'ev-vs-gas',
    title: 'Carro elétrico ou a gasolina: qual realmente faz sentido para você?',
    question: 'Devo comprar um carro elétrico ou a gasolina, e qual sai realmente mais barato?',
    summary:
      'O elétrico custa mais na compra, mas gasta muito menos para abastecer e manter, e é mais limpo ao longo da vida útil. O carro a gasolina vence em viagens longas, reabastecimento rápido e preço inicial baixo. A escolha depende de como você dirige e se consegue carregar em casa.',
    tags: ['casa', 'energia', 'veículos elétricos', 'carros'],
    language: 'pt',
    image: { prompt: promptOf('ev-vs-gas'), alt: 'Carro elétrico recebendo luz de um carregador doméstico ao lado de um carro a gasolina' },
    sources: [
      { title: 'Departamento de Energia dos EUA / fueleconomy.gov — Custo e emissões de elétricos vs gasolina', url: 'https://www.fueleconomy.gov/feg/evtech.shtml' },
      { title: 'Departamento de Energia dos EUA — Reduzir a poluição com veículos elétricos', url: 'https://www.energy.gov/eere/electricvehicles/electric-vehicle-basics' },
    ],
    content: `# Carro elétrico ou a gasolina: qual realmente faz sentido para você?

A resposta honesta não é "o elétrico é melhor" nem "a gasolina é melhor" — é "depende de como você dirige e de onde estaciona". Um veículo elétrico (VE) e um carro a gasolina resolvem o mesmo problema de maneiras opostas, e a escolha certa se resume a alguns fatos concretos da sua vida: quanto você dirige, se consegue carregar em casa e como pondera o preço de compra contra o custo de uso. Aqui está o roteiro para decidir.

## A história do custo: compra vs vida útil

A mudança de perspectiva mais importante é que um carro tem *dois* custos — o preço de etiqueta e o custo de mantê-lo rodando — e o elétrico e o a gasolina trocam de lugar em cada um:

| | Elétrico (VE) | Gasolina |
| --- | --- | --- |
| Preço de compra | Mais alto (embora caindo, e os incentivos ajudam) | Mais baixo |
| Custo de "combustível" | Muito mais barato por quilômetro — a eletricidade ganha da gasolina, sobretudo carregando em casa | Mais alto e volátil com o preço do petróleo |
| Manutenção | Baixa — sem troca de óleo, muito menos peças móveis, freios duram mais | Mais alta — óleo, câmbio, escapamento, mais desgaste |
| Depreciação | Varia conforme o modelo | Varia conforme o modelo |

O padrão: um elétrico costuma custar mais para *comprar* e muito menos para *ter*. Se ele sai na frente no geral depende de quantos quilômetros você roda (rodar mais favorece o combustível mais barato do VE) e por quanto tempo o mantém (mais tempo favorece a manutenção menor do VE).

## A pergunta decisiva: você consegue carregar em casa?

Isso importa mais do que quase tudo. Se você puder ligar na tomada onde estaciona à noite, um elétrico é maravilhosamente conveniente — você "reabastece" enquanto dorme e raramente visita um carregador público. Se você depende de estacionamento na rua ou de vagas de prédio sem carregamento, ter um elétrico fica bem mais difícil, apoiado em carregadores públicos mais lentos e menos previsíveis. Carregar em casa é o recurso silencioso que faz a experiência do elétrico dar certo ou não.

## Onde cada um realmente vence

- **O elétrico vence em:** deslocamento diário e direção urbana, baixo custo de uso, torque instantâneo e silencioso, carregamento em casa, menores emissões ao longo da vida útil e manutenção mínima.
- **A gasolina vence em:** viagens longas frequentes (abastecer em 5 minutos vs paradas de carga mais demoradas), ausência de carregamento em casa, orçamento de compra muito apertado e regiões com infraestrutura de recarga escassa.

Uma regra prática útil: se a maior parte da sua direção é diária e local e você consegue carregar em casa, um elétrico provavelmente serve e economiza dinheiro com o tempo. Se você dirige longas distâncias com frequência ou não consegue carregar onde estaciona, um carro a gasolina (ou híbrido) ainda pode ser a escolha pragmática.

## Perguntas frequentes

**Os elétricos são realmente mais limpos se a eletricidade vem de combustíveis fósseis?**
Ao longo da vida útil, sim, em quase todas as regiões — os elétricos são mais eficientes e as redes elétricas só ficam mais limpas. Estudos encontram de forma consistente emissões totais menores do que carros a gasolina comparáveis, mesmo em redes mistas, e a diferença aumenta conforme as renováveis crescem.

**E a troca de bateria?**
As baterias modernas de VE são projetadas para durar a vida do carro e têm garantia de muitos anos; a maioria degrada lentamente, perdendo uma fração modesta de autonomia ao longo de uma década, em vez de falhar de uma vez. Trocas completas são incomuns dentro do tempo de posse típico.

**Um híbrido é um bom meio-termo?**
Para muita gente, sim — um híbrido reduz o consumo e a manutenção em relação ao puramente a gasolina, não precisa de infraestrutura de recarga e evita a preocupação com autonomia, enquanto um híbrido plug-in acrescenta deslocamentos curtos só em modo elétrico. É uma ponte sensata se um elétrico completo ainda não combina com seu estacionamento ou suas viagens.`,
  },
  {
    topicKey: 'how-solar-panels-work',
    title: 'Como funcionam os painéis solares — e valem a pena?',
    question: 'Como os painéis solares realmente geram eletricidade, e eles se pagam?',
    summary:
      'Os painéis solares transformam a luz do sol diretamente em eletricidade pelo efeito fotovoltaico — sem peças móveis. Se valem a pena depende do seu sol, do preço da energia, do telhado e dos incentivos; em muitos lugares se pagam em poucos anos e rodam de graça por décadas depois.',
    tags: ['casa', 'energia', 'energia solar', 'eletricidade'],
    language: 'pt',
    image: { prompt: promptOf('how-solar-panels-work'), alt: 'Luz do sol soltando cargas num painel que fluem como corrente até uma casa' },
    sources: [
      { title: 'Departamento de Energia dos EUA — Como funciona a energia solar?', url: 'https://www.energy.gov/eere/solar/how-does-solar-work' },
      { title: 'NREL — Fundamentos da energia solar fotovoltaica', url: 'https://www.nrel.gov/research/re-photovoltaics.html' },
    ],
    content: `# Como funcionam os painéis solares — e valem a pena?

Um painel solar faz algo silenciosamente notável: transforma a luz do sol *diretamente* em eletricidade, sem peças móveis, sem combustível e sem ruído. Não há turbina girando nem nada queimando — apenas a luz atingindo um material especialmente fabricado e a eletricidade saindo do outro lado. Entender a física simples torna a pergunta prática — "eles vão se pagar para mim?" — muito mais fácil de responder com honestidade.

## O efeito fotovoltaico, em termos simples

Os painéis solares são feitos de células **fotovoltaicas** ("luz-eletricidade"), geralmente de silício. O fato-chave sobre essas células: quando a luz atinge o silício, sua energia solta elétrons. A célula é construída com um desequilíbrio elétrico embutido que empurra esses elétrons liberados a fluir em uma direção — e elétrons fluindo em uma direção *são* uma corrente elétrica. Então a luz entra e a eletricidade sai, diretamente. Quanto mais intensa a luz, mais elétrons fluem e mais energia o painel produz.

A eletricidade que os painéis produzem é corrente contínua (CC), então um aparelho chamado **inversor** a converte para a corrente alternada (CA) que sua casa e a rede usam. Isso é basicamente todo o sistema: painéis, um inversor e uma conexão com a fiação da sua casa.

## O que decide se eles "valem a pena"

É aqui que a honestidade importa — a energia solar se paga de forma brilhante em algumas situações e lentamente em outras. As variáveis:

| Fator | Por que importa |
| --- | --- |
| **Luz do sol** | Mais sol (e um telhado voltado para o norte, sem sombra) = mais geração |
| **Preço da energia** | Quanto mais você paga à distribuidora, mais cada kWh autoproduzido economiza |
| **Custo inicial e incentivos** | Créditos fiscais, descontos e financiamento mudam muito a conta |
| **Telhado** | Orientação, inclinação, sombra, idade e tamanho, tudo importa |
| **Regras de medição líquida** | Se a distribuidora credita você de forma justa pelo excedente que você exporta |

A forma de pensar nisso: a solar é um grande custo inicial que depois produz eletricidade quase de graça por **mais de 25 anos** (os painéis costumam ter garantia em torno desse prazo). Se o custo inicial dividido pela economia anual der um retorno de, digamos, 6 a 10 anos, tudo depois disso é lucro — muitas vezes um ótimo retorno. Em regiões de pouco sol, energia barata ou instalação cara, o retorno se estende e o caso enfraquece.

## Um retrato realista

A solar raramente leva você totalmente para "fora da rede", a menos que você acrescente baterias caras — a maioria dos sistemas domésticos permanece conectada à rede, puxando dela à noite e exportando o excedente de dia. E os painéis perdem só um pouquinho de produção por ano, então um painel de 25 anos ainda funciona bem. A tecnologia é madura e de baixa manutenção; a verdadeira questão é quase sempre a economia para *o seu* telhado e tarifas, não se ela funciona.

## Perguntas frequentes

**Os painéis solares funcionam em dias nublados ou no inverno?**
Sim, só que menos. Eles funcionam com luz, não com calor, então ainda geram em dias encobertos (com produção reduzida) e na verdade gostam de condições frias e ensolaradas. O frio não é o inimigo; a sombra e os dias curtos de inverno são.

**Preciso de baterias?**
Não para se beneficiar — a maioria dos sistemas usa a rede como uma "bateria virtual" via medição líquida, guardando o excedente do dia para uso à noite. As baterias acrescentam energia de reserva durante quedas e mais autossuficiência, mas a um custo extra significativo; são opcionais, não obrigatórias.

**Que manutenção eles exigem?**
Muito pouca — sem peças móveis. Limpeza ocasional se acumular poeira ou pólen, e o inversor pode precisar ser trocado uma vez ao longo da vida do sistema. Fora isso, eles praticamente só ficam ali e funcionam.`,
  },
  {
    topicKey: 'heat-pumps',
    title: 'Bombas de calor explicadas: aquecimento e refrigeração numa só máquina',
    question: 'O que é uma bomba de calor, e como ela aquece uma casa usando menos energia do que produz?',
    summary:
      'Uma bomba de calor não cria calor — ela o move, bombeando o calor do ar externo (mesmo o ar frio) para dentro de casa, e invertendo no verão para resfriar. Como mover calor é muito mais eficiente do que criá-lo, ela entrega várias unidades de calor por unidade de eletricidade.',
    tags: ['casa', 'energia', 'bomba de calor', 'aquecimento'],
    language: 'pt',
    image: { prompt: promptOf('heat-pumps'), alt: 'Bomba de calor recolhendo o calor tênue do ar externo frio para uma casa aquecida' },
    sources: [
      { title: 'Departamento de Energia dos EUA — Sistemas de bomba de calor', url: 'https://www.energy.gov/energysaver/heat-pump-systems' },
      { title: 'ENERGY STAR — Bombas de calor', url: 'https://www.energystar.gov/products/heat_pumps' },
    ],
    content: `# Bombas de calor explicadas: aquecimento e refrigeração numa só máquina

Uma bomba de calor parece que precisa quebrar as leis da física: ela consegue entregar mais energia térmica à sua casa do que a energia elétrica que consome. O truque é que **uma bomba de calor não *cria* calor — ela o *move*.** E mover calor de um lugar para outro exige muito menos energia do que gerar calor do zero. Quando você compreende essa única ideia, toda a tecnologia — e por que governos e especialistas em energia são tão entusiasmados com ela — faz sentido.

## Mover o calor, não criá-lo

Aqui está a parte contraintuitiva: até o ar frio contém energia térmica (ele só *parece* "frio" em relação a você). Uma bomba de calor usa um fluido refrigerante em circulação e um compressor para **recolher** esse calor difuso do ar externo, concentrá-lo e liberá-lo dentro de casa. É a mesma tecnologia básica da sua geladeira ou do ar-condicionado, que movem calor *para fora* de um espaço frio — a bomba de calor apenas faz isso na direção útil, movendo calor *para dentro* de casa.

Como ela está realocando calor já existente em vez de queimar combustível ou ligar um aquecedor por resistência, uma bomba de calor pode ser notavelmente eficiente: uma boa entrega cerca de **3 unidades de calor para cada 1 unidade de eletricidade** que usa. Um aquecedor elétrico tradicional, por outro lado, nunca consegue superar a proporção de 1 para 1 — ele só pode transformar eletricidade em uma quantidade igual de calor. Essa diferença de eficiência é o ponto central.

## Uma máquina, as duas estações

O segundo truque de uma bomba de calor é que ela é **reversível.** No verão, ela simplesmente roda ao contrário — recolhendo calor de *dentro* da casa e despejando-o para fora, que é exatamente o que um ar-condicionado faz. Assim, um único sistema aquece no inverno e refrigera no verão, substituindo um aquecedor e um ar-condicionado separados. É em parte por isso que as bombas de calor são cada vez mais a recomendação padrão para climatização doméstica.

## Ressalvas honestas

- **Climas muito frios:** as bombas de calor antigas perdiam eficiência no frio intenso, mas os modelos modernos "para clima frio" funcionam bem mesmo em temperaturas abaixo de zero; o desempenho cai conforme fica extremamente frio, às vezes exigindo aquecimento de reserva nos dias mais rigorosos.
- **Custo inicial:** a instalação pode custar mais do que um aquecedor ou ar-condicionado básico, embora os custos de uso e os incentivos muitas vezes compensem isso com o tempo.
- **É um aparelho elétrico:** seu custo de uso e suas emissões dependem do preço da sua eletricidade e de quão limpa é a sua rede.

Para a maioria das casas na maioria dos climas, porém, uma bomba de calor é hoje uma das formas mais eficientes e econômicas de manter o conforto o ano todo.

## Perguntas frequentes

**A bomba de calor funciona quando está abaixo de zero?**
As bombas de calor modernas para clima frio sim — elas ainda extraem calor utilizável do ar muito frio, apenas com menos eficiência conforme as temperaturas despencam. No frio extremo, uma fonte de calor de reserva pode entrar, mas a bomba de calor faz o grosso do trabalho na maior parte do ano.

**É mais barato operá-la do que um aquecedor a gás?**
Muitas vezes, por causa da eficiência, mas depende dos preços locais de eletricidade vs gás. Onde a eletricidade tem preço razoável (ou você tem energia solar), as bombas de calor geralmente vencem no custo de uso e sempre vencem por também poderem refrigerar.

**Qual a diferença entre uma bomba de calor de fonte de ar e de fonte de solo?**
As de fonte de ar recolhem calor do ar externo e são mais baratas de instalar. As de fonte de solo ("geotérmicas") puxam da temperatura mais estável do subsolo — mais eficientes, mas muito mais caras de instalar porque exigem tubulação enterrada.`,
  },
  {
    topicKey: 'home-insulation',
    title: 'Por que o isolamento é o melhor investimento em energia da sua casa',
    question: 'Por que o isolamento doméstico é tão importante, e ele realmente vale o custo?',
    summary:
      'O isolamento retarda o calor que vaza constantemente para fora da sua casa no inverno e para dentro no verão, então seu aquecimento e refrigeração trabalham menos. Costuma ser a melhoria de energia mais barata e de maior retorno — economiza dinheiro todo ano e deixa os cômodos mais confortáveis.',
    tags: ['casa', 'energia', 'isolamento', 'eficiência'],
    language: 'pt',
    image: { prompt: promptOf('home-insulation'), alt: 'Casa envolta num cobertor luminoso retendo o calor, com frestas deixando a luz vazar' },
    sources: [
      { title: 'Departamento de Energia dos EUA — Isolamento', url: 'https://www.energy.gov/energysaver/insulation' },
      { title: 'ENERGY STAR — Vede e isole a sua casa', url: 'https://www.energystar.gov/saveathome/seal_insulate' },
    ],
    content: `# Por que o isolamento é o melhor investimento em energia da sua casa

A maioria das pessoas pensa nas contas de energia em termos dos aparelhos que *produzem* calor ou frio — o aquecedor, o ar-condicionado. Mas há um fator mais silencioso que muitas vezes importa mais: a velocidade com que esse calor ou frio **vaza de volta para fora.** O isolamento é o material sem glamour nas suas paredes, no telhado e nos pisos, cujo único trabalho é retardar esse vazamento. Frequentemente é a melhoria doméstica mais barata com o retorno maior e mais confiável — e funciona em silêncio, a cada hora de cada dia, por toda a vida da construção.

## O calor sempre flui em direção ao frio

A física central é simples e implacável: **o calor sempre se move do mais quente para o mais frio.** No inverno, o calor que você pagou para criar escapa constantemente pelas paredes, pelo telhado e pelas janelas em direção ao frio lá fora. No verão, o calor externo vaza constantemente *para dentro*. Seus sistemas de aquecimento e refrigeração não estão apenas criando conforto — eles lutam contra um vazamento sem fim. O isolamento não interrompe esse fluxo por completo (nada interrompe), mas o *retarda* drasticamente, de modo que seus sistemas ligam menos e queimam menos energia para manter a temperatura.

Um modelo mental útil: o isolamento é um cobertor para a sua casa. Um cobertor não gera calor; ele apenas retarda a fuga do calor que seu corpo produz, para que você fique aquecido com menos esforço. O isolamento doméstico faz exatamente a mesma coisa na escala da construção.

## Por que é um investimento tão bom

- **Funciona de forma constante e para sempre.** Diferente de um aparelho, o isolamento não tem custo de uso, não tem peças móveis e não se desgasta. Instale uma vez, economize todo ano por décadas.
- **Reduz as contas tanto de aquecimento *quanto* de refrigeração.** A mesma barreira que mantém o calor dentro no inverno o mantém fora no verão.
- **Melhora o conforto, não só o custo.** Cômodos bem isolados têm menos correntes frias e pontos quentes e mantêm uma temperatura estável.
- **As vitórias baratas vêm primeiro.** Vedar frestas de ar (vãos ao redor de portas, janelas e passagens) e reforçar o isolamento do sótão costumam ser ações de baixo custo e alto impacto — o calor sobe, então o telhado costuma ser a prioridade.

## Onde concentrar esforços

Nem todo isolamento tem o mesmo retorno. Os ganhos maiores e mais baratos costumam ser: **vedar frestas de ar** (uma casa com correntes de ar desperdiça energia por mais grosso que seja o isolamento), depois o **sótão/telhado** (por onde mais calor escapa para cima) e então paredes e pisos. A eficácia do isolamento é avaliada pelo "valor R" — mais alto significa mais resistência ao fluxo de calor — e os níveis recomendados variam conforme o clima. O princípio geral vale em todo lugar: um invólucro vedado e bem isolado permite que um sistema de aquecimento e refrigeração menor e mais barato de operar mantenha você confortável.

## Perguntas frequentes

**Vedar a casa de forma muito hermética não é ruim para a qualidade do ar?**
Pode reduzir a troca de ar fresco, então casas muito vedadas combinam a vedação com ventilação controlada. Para a maioria das casas, porém, o problema maior é serem vazadas demais; vedar as piores frestas melhora o conforto e a eficiência sem prejuízo à qualidade do ar.

**Qual é o passo isolado mais custo-efetivo?**
Geralmente vedação de ar mais isolamento do sótão. São relativamente baratos, muitas vezes amigáveis para fazer você mesmo, e miram onde mais energia escapa. Muita gente vê reduções perceptíveis na conta só com isso.

**O isolamento ajuda também em climas quentes?**
Com certeza — ele retarda o vazamento do calor externo para dentro, cortando os custos de ar-condicionado. O "cobertor" funciona nas duas direções; manter o calor *do lado de fora* é tão valioso quanto mantê-lo dentro.`,
  },
  {
    topicKey: 'led-vs-incandescent',
    title: 'LED vs lâmpada incandescente: por que o LED dominou',
    question: 'Por que as lâmpadas de LED são tão melhores do que as antigas incandescentes?',
    summary:
      'As antigas lâmpadas incandescentes desperdiçam cerca de 90% da sua energia em calor, fazendo luz quase por acidente. Os LEDs produzem luz de forma direta e eficiente, usando uma fração da energia e durando muitas vezes mais — por isso substituíram a lâmpada centenária.',
    tags: ['casa', 'energia', 'iluminação', 'eficiência'],
    language: 'pt',
    image: { prompt: promptOf('led-vs-incandescent'), alt: 'Lâmpada antiga quente e desperdiçadora ao lado de um LED frio e eficiente com luz limpa' },
    sources: [
      { title: 'Departamento de Energia dos EUA — Iluminação LED', url: 'https://www.energy.gov/energysaver/led-lighting' },
      { title: 'ENERGY STAR — Lâmpadas', url: 'https://www.energystar.gov/products/light_bulbs' },
    ],
    content: `# LED vs lâmpada incandescente: por que o LED dominou

Por mais de um século, a lâmpada funcionou por um acidente brilhante: aquecer algo até brilhar. Essa é a lâmpada incandescente — e acontece que ela é um aquecedor maravilhoso e um péssimo produtor de luz. O LED a substituiu não por um empurrão de marketing, mas porque é fundamentalmente melhor na única tarefa que uma lâmpada tem: transformar eletricidade em luz em vez de em calor desperdiçado. A diferença é dramática o suficiente para ter encerrado uma tecnologia de 100 anos em pouco mais de uma década.

## Fazer luz vs fazer calor

Uma lâmpada **incandescente** passa eletricidade por um fio fino (filamento) até ele ficar tão quente que brilha em branco. A luz é real, mas é quase um efeito colateral do calor — cerca de **90% da energia vira calor, e só cerca de 10% vira luz visível.** Você está, na maior parte, pagando para aquecer o cômodo e recebendo luz como bônus. É por isso que uma lâmpada antiga fica quente demais para tocar.

Um **LED** (diodo emissor de luz) faz luz de uma forma completamente diferente: a eletricidade passa por um material semicondutor especial que emite luz *diretamente*, com pouquíssimo calor. Não há filamento quente, não há brilho-por-acidente — apenas conversão eficiente de eletricidade em luz. O resultado é que um LED produz o mesmo brilho de uma lâmpada antiga usando só uma pequena fração da energia.

## Os números que encerraram o debate

| | Incandescente | LED |
| --- | --- | --- |
| Energia → luz | ~10% (o resto é calor) | A grande maioria |
| Energia para brilho semelhante | Alta | Cerca de 75 a 85% menos |
| Vida útil | ~1.000 horas | ~15.000 a 25.000+ horas |
| Produção de calor | Quente | De fria a morna |
| Custo ao longo do tempo | Barata de comprar, cara de operar | Custa mais na compra, muito mais barata no geral |

Um LED custa um pouco mais na prateleira, mas usa muito menos eletricidade e dura *muitas vezes* mais, então ao longo da vida útil é drasticamente mais barato — você compra menos lâmpadas e paga muito menos para operá-las. Multiplique isso por cada soquete de uma casa e a economia é substancial.

## Escolhendo bem os LEDs

Duas coisas confundem quem migra para LEDs. Primeiro, o brilho agora é medido em **lúmens**, não em watts — os watts medem o consumo de energia, e os LEDs usam tão pouco que o velho atalho "60 watts = este brilho" já não se aplica; olhe os lúmens para o brilho. Segundo, os LEDs vêm em diferentes **temperaturas de cor** (medidas em kelvin): números mais baixos (~2700K) dão luz quente e amarelada como as lâmpadas antigas; números mais altos (~5000K) dão "luz do dia" fria e branco-azulada. Escolha a tonalidade que você gosta; a eficiência é excelente de qualquer modo.

## Perguntas frequentes

**Vale a pena trocar lâmpadas que ainda funcionam por LED?**
Muitas vezes sim para luzes de uso frequente — a economia de energia pode pagar a lâmpada nova rapidamente, e você a trocará com muito menos frequência. Para a lâmpada de um armário pouco usado, é menos urgente.

**Os LEDs realmente duram tanto assim?**
Os de qualidade sim, embora unidades baratas e má gestão de calor encurtem a vida útil. Os LEDs também tendem a escurecer gradualmente em vez de queimar de repente. Comprar lâmpadas de marcas confiáveis importa mais do que na tecnologia antiga.

**O calor da lâmpada antiga já foi útil?**
Marginalmente, em cômodos frios — mas é uma forma absurdamente ineficiente de aquecer, e inútil (até contraproducente) no verão, quando você está refrigerando. Como fonte de luz, o calor era quase puro desperdício.`,
  },
  {
    topicKey: 'induction-cooking',
    title: 'Como funcionam os fogões por indução (e por que são tão rápidos)',
    question: 'Como um fogão por indução aquece a comida, e ele é melhor do que gás ou elétrico?',
    summary:
      'Os fogões por indução aquecem a própria panela diretamente usando um campo magnético, pulando a etapa desperdiçadora de aquecer primeiro uma boca. Isso os torna mais rápidos, mais eficientes, mais precisos e mais frios e seguros na cozinha — com uma ressalva: as panelas precisam ser magnéticas.',
    tags: ['casa', 'energia', 'culinária', 'cozinha'],
    language: 'pt',
    image: { prompt: promptOf('induction-cooking'), alt: 'Anéis magnéticos luminosos aquecendo uma panela direto enquanto o fogão permanece frio' },
    sources: [
      { title: 'Departamento de Energia dos EUA — Cozinhar com eficiência energética e indução', url: 'https://www.energy.gov/energysaver/energy-efficient-cooking' },
      { title: 'ENERGY STAR — Eletrodomésticos de cozinha', url: 'https://www.energystar.gov/' },
    ],
    content: `# Como funcionam os fogões por indução (e por que são tão rápidos)

Se você já viu a água ferver de forma quase chocante de rápida num fogão por indução — ou tocou a superfície ao lado da panela e a achou fria — você viu o resultado de um pouco de física engenhosa. Diferente dos fogões a gás ou elétricos tradicionais, um fogão por indução não aquece uma boca e depois passa esse calor para a panela. **Ele aquece a própria panela, diretamente**, pulando o intermediário. Essa única diferença é por que a indução é mais rápida, mais eficiente e mais segura.

## Aquecer a panela, não o fogão

Sob a superfície lisa de vidro de um fogão por indução há uma bobina de fio. Quando você o liga, a eletricidade fluindo por essa bobina cria um **campo magnético** que muda rapidamente. Quando você coloca uma panela magnética em cima, esse campo induz correntes elétricas redemoinhantes *dentro do próprio metal da panela*, e a resistência da panela a essas correntes a faz esquentar. Em outras palavras, o fogão transforma o fundo da sua panela no elemento de aquecimento.

A superfície do fogão mal esquenta por conta própria — ela só se aquece pelo contato com a panela quente apoiada nela. É por isso que você muitas vezes consegue tocar a área ao redor da panela com segurança, e por que um respingo não queima grudado no vidro.

## Por que isso é melhor

| Benefício | Por que acontece |
| --- | --- |
| **Velocidade** | A energia vai direto para a panela, então a água ferve perceptivelmente mais rápido |
| **Eficiência** | Pouco calor é desperdiçado aquecendo o ar, a boca ou a cozinha |
| **Precisão** | As mudanças de potência são quase instantâneas, como no gás, mas mais controláveis |
| **Segurança e conforto** | A superfície permanece relativamente fria; sem chama, menos calor desperdiçado na cozinha |
| **Fácil de limpar** | Os respingos não cozinham grudados numa superfície fria |

Como o gás perde bastante calor para o ar ao redor e as resistências elétricas tradicionais desperdiçam energia aquecendo a si mesmas primeiro, a indução entrega mais da sua energia à comida — tornando-se o mais eficiente entre os tipos comuns de fogão.

## A única ressalva de verdade

A indução só funciona com **panelas magnéticas** — panelas em que o ímã da sua cozinha gruda, como ferro fundido e a maioria dos aços inoxidáveis. Panelas de alumínio, cobre e vidro não funcionam, a menos que tenham uma base magnética. O teste rápido: se um ímã se gruda firme no fundo da panela, ela funcionará na indução. Para algumas pessoas, mudar significa substituir algumas panelas favoritas, o que é o principal obstáculo à adoção.

## Perguntas frequentes

**A indução é a mesma coisa que um fogão elétrico comum de topo de vidro?**
Não — eles parecem semelhantes, mas funcionam de modo diferente. Um fogão elétrico "de superfície lisa" comum aquece uma resistência sob o vidro que então aquece a panela (o vidro fica muito quente). A indução aquece a panela diretamente e permanece bem mais fria. Parecidos por fora, muito diferentes por dentro.

**Vai funcionar com as minhas panelas atuais?**
Só se forem magnéticas. Encoste um ímã no fundo: se grudar firme, sim. Ferro fundido e a maioria dos aços inoxidáveis funcionam; alumínio puro, cobre e vidro não, a menos que estejam rotulados como compatíveis com indução.

**Ele gasta muita eletricidade?**
Ele usa a eletricidade de forma eficiente — mais da energia chega à comida do que no gás ou na resistência elétrica, então, para o que você cozinha, costuma ser a opção mais econômica e rápida, sobretudo para ferver e aquecer rápido.`,
  },
  {
    topicKey: 'home-battery',
    title: 'Baterias residenciais: elas realmente se pagam?',
    question: 'O que uma bateria residencial faz, e ela vale o custo alto?',
    summary:
      'Uma bateria residencial armazena eletricidade — da energia solar ou da rede barata fora do pico — para usar depois. Seu maior valor real é a energia de reserva nas quedas e o autoconsumo solar; a pura economia na conta raramente justifica o custo sozinha ainda, embora isso esteja mudando.',
    tags: ['casa', 'energia', 'bateria', 'energia solar'],
    language: 'pt',
    image: { prompt: promptOf('home-battery'), alt: 'Bateria de parede armazenando a luz solar do dia para abastecer uma casa à noite' },
    sources: [
      { title: 'Departamento de Energia dos EUA — Armazenamento de energia residencial', url: 'https://www.energy.gov/energysaver/articles/should-you-get-battery-storage-your-home-solar-system' },
      { title: 'NREL — Fundamentos do armazenamento em baterias', url: 'https://www.nrel.gov/research/energy-storage.html' },
    ],
    content: `# Baterias residenciais: elas realmente se pagam?

Uma bateria residencial é exatamente o que parece: uma grande bateria recarregável, geralmente fixada numa parede ou numa garagem, que armazena eletricidade para uso posterior. A proposta é atraente — guardar a sua própria energia solar, manter as luzes acesas durante quedas, escapar da cara eletricidade de horário de pico. Mas as baterias residenciais também são caras, e se elas "se pagam" depende muito de *por que* você quer uma. A resposta honesta separa os três trabalhos diferentes que uma bateria pode fazer.

## O que uma bateria residencial faz de fato

Uma bateria armazena energia e a libera sob demanda. Numa casa, ela é carregada por uma de duas fontes — o **excedente de energia solar** gerado durante o dia, ou a **eletricidade barata da rede** nas horas fora de pico — e depois descarrega essa energia armazenada quando você precisa: à noite, durante as caras horas de pico ou quando a rede cai. É um amortecedor entre o momento em que a energia é barata/abundante e o momento em que você de fato a usa.

## As três razões pelas quais as pessoas compram uma — ordenadas por quão bem se pagam

| Razão | Quão bem se paga |
| --- | --- |
| **Energia de reserva durante quedas** | O valor mais claro — se as quedas são frequentes ou custosas para você, o valor da bateria está na resiliência, não na conta de economia |
| **Usar mais da sua própria energia solar** | Bom se a sua distribuidora paga pouco pela solar exportada — a bateria permite autoconsumir em vez de vender barato e recomprar caro |
| **Pura arbitragem de tarifa** (armazenar barato, usar no pico) | O mais difícil de justificar só pela economia hoje — a economia muitas vezes não cobre o custo da bateria dentro da vida útil, embora isso esteja melhorando |

A percepção-chave: o caso **financeiro** de uma bateria (economizar dinheiro) costuma ser mais fraco do que o caso de **resiliência** (energia de reserva) ou o caso de **autoconsumo solar**. Se você está comprando uma puramente para cortar a conta, faça as contas com cuidado — a economia por ano contra o custo inicial muitas vezes implica um retorno perto ou além da vida útil da bateria. Se você valoriza manter a energia durante quedas, ou se a sua solar exportada rende pouco, a proposta de valor é muito mais forte.

## O que está mudando

Os preços das baterias seguem caindo, e em mais lugares as distribuidoras estão migrando para tarifas baseadas no horário, que recompensam deslocar o seu consumo — ambos melhoram a economia com o tempo. Combinar uma bateria com energia solar também é o encaixe mais natural, já que permite guardar a energia gerada de dia para usar depois do anoitecer, sobretudo onde a medição líquida ficou menos generosa.

## Perguntas frequentes

**Uma bateria residencial pode me tirar totalmente da rede?**
Raramente na prática — ir totalmente para fora da rede exige um banco de baterias grande e caro, além de energia solar suficiente para cobrir o pior clima, sem margem para erro. A maioria das baterias residenciais é projetada para trabalhar *com* a rede, não para substituí-la.

**Quanto tempo dura uma bateria residencial?**
Normalmente tem garantia em torno de 10 anos, e elas degradam gradualmente como qualquer bateria de lítio, perdendo capacidade aos poucos em vez de falhar de repente. Inclua essa vida útil em qualquer cálculo de retorno.

**Preciso de energia solar para ter uma bateria?**
Não — uma bateria pode carregar com a eletricidade barata da rede fora do pico, para reserva ou deslocamento de tarifa. Mas baterias e energia solar são um par natural, já que a bateria resolve a principal limitação da solar: que ela só gera durante o dia.`,
  },
  {
    topicKey: 'smart-thermostat',
    title: 'Os termostatos inteligentes realmente economizam dinheiro?',
    question: 'O que um termostato inteligente faz, e ele realmente reduz as contas de energia?',
    summary:
      'Um termostato inteligente automatiza o aquecimento e a refrigeração — agendando, percebendo quando você está fora e aprendendo seus hábitos — para você parar de pagar para aquecer ou resfriar uma casa vazia. A economia é real, mas modesta, e vem sobretudo do comportamento que ele torna fácil.',
    tags: ['casa', 'energia', 'casa inteligente', 'eficiência'],
    language: 'pt',
    image: { prompt: promptOf('smart-thermostat'), alt: 'Termostato de parede percebendo um cômodo vazio e reduzindo sua saída' },
    sources: [
      { title: 'ENERGY STAR — Termostatos inteligentes', url: 'https://www.energystar.gov/products/smart_thermostats' },
      { title: 'Departamento de Energia dos EUA — Termostatos', url: 'https://www.energy.gov/energysaver/thermostats' },
    ],
    content: `# Os termostatos inteligentes realmente economizam dinheiro?

Aquecimento e refrigeração costumam ser a maior fatia da conta de energia de uma casa, e boa parte dessa energia é desperdiçada mantendo uma casa *vazia* numa temperatura perfeita, ou aquecendo a todo vapor enquanto todos dormem sob cobertores. O propósito inteiro de um termostato inteligente é interromper esse desperdício automaticamente. O veredito honesto: sim, ele economiza dinheiro — mas a economia é **modesta, não mágica**, e vem de tornar bons hábitos fáceis, e não de qualquer mágica produtora de energia.

## O que o torna "inteligente"

Um termostato tradicional apenas mantém a temperatura que você definiu até você mudá-la. Um termostato inteligente acrescenta automação:

- **Agendamento:** baixa automaticamente o aquecimento/refrigeração à noite e quando você costuma estar fora, e traz a casa de volta ao conforto antes de você voltar.
- **Detecção de presença:** percebe quando a casa está vazia (pela localização do celular ou por sensores de movimento) e alivia, depois retoma quando você volta.
- **Aprendizado:** alguns modelos aprendem seus padrões e preferências com o tempo e ajustam sozinhos.
- **Controle remoto e feedback:** ajuste pelo celular e veja relatórios de consumo que revelam onde você está gastando.

Nada disso *cria* eficiência do jeito que o isolamento ou uma bomba de calor cria. O que ele faz é aplicar de forma confiável o hábito gratuito mais eficaz — **não aquecer nem resfriar espaços que você não está usando** — sem que você precise lembrar.

## De onde vem a economia (e quão grande)

A economia central é o "recuo": deixar a temperatura derivar em direção às condições externas quando ninguém precisa de conforto, e então recuperá-la bem na hora. Fazer isso manualmente economiza a mesma energia — mas quase ninguém faz isso de forma consistente, que é exatamente a lacuna que um termostato inteligente preenche. A economia no mundo real costuma ser uma fatia significativa, mas não dramática, dos custos de aquecimento e refrigeração; os programas de energia frequentemente citam cerca de **8 a 15%** em aquecimento e refrigeração, variando muito conforme o seu clima, seus hábitos e quão desperdiçador você era antes.

Então o aparelho se paga ao longo de alguns anos para muitos lares — mais rápido se você atualmente aquece ou resfria muito uma casa vazia, mais devagar se você já é diligente ou raramente sai.

## Vale a pena para você?

- **Encaixe forte:** você costuma estar fora em horários previsíveis, tende a "definir e esquecer", suas contas são altas, ou você gosta de controle remoto e de dados.
- **Encaixe fraco:** você já é disciplinado com um termostato programável, fica em casa a maior parte do dia numa temperatura constante, ou seus custos de aquecimento/refrigeração já são pequenos.

O conforto e a conveniência — uma casa aquecida esperando quando você chega, controle da cama — são vantagens reais além da economia em dinheiro, e muitas vezes a maior razão pela qual as pessoas ficam satisfeitas com eles.

## Perguntas frequentes

**Ele economiza dinheiro se eu fico em casa o dia todo?**
Menos — a maior economia vem de aliviar enquanto a casa está vazia. Se você está sempre em casa numa temperatura estável, a economia encolhe, embora agendar recuos durante a noite ainda ajude.

**Preciso de um para economizar energia?**
Não — um termostato programável básico (ou apenas ajustar manualmente) captura a maior parte da mesma economia se você for disciplinado. O valor da versão inteligente está em automatizar isso para que a economia realmente aconteça.

**A economia compensa o preço?**
Para muitos lares, sim, ao longo de alguns anos — sobretudo com contas altas ou ausências frequentes. Trate a economia de energia como o piso e a conveniência como o bônus; se você nunca se daria ao trabalho de fazer recuos manuais, é na automação que ele se paga.`,
  },
  {
    topicKey: 'ev-charging-explained',
    title: 'Carregamento de elétricos explicado: níveis, velocidades e ansiedade de autonomia',
    question: 'Como funciona o carregamento de elétricos — quais são os níveis e quanto tempo leva?',
    summary:
      'O carregamento de elétricos vem em três velocidades: o lento Nível 1 de uma tomada comum, o mais rápido Nível 2 para casa e trabalho, e a recarga rápida CC para viagens. A maior parte acontece devagar em casa, à noite — por isso o uso diário raramente envolve espera.',
    tags: ['casa', 'energia', 'veículos elétricos', 'carregamento'],
    language: 'pt',
    image: { prompt: promptOf('ev-charging-explained'), alt: 'Três carregadores de tamanhos diferentes enchendo uma bateria, mais o carregamento noturno em casa' },
    sources: [
      { title: 'Departamento de Energia dos EUA — Carregar em casa e infraestrutura de recarga', url: 'https://www.energy.gov/eere/electricvehicles/charging-home' },
      { title: 'Centro de Dados de Combustíveis Alternativos do Departamento de Energia dos EUA — Níveis de recarga de elétricos', url: 'https://afdc.energy.gov/fuels/electricity_charging_home.html' },
    ],
    content: `# Carregamento de elétricos explicado: níveis, velocidades e ansiedade de autonomia

O maior obstáculo mental para quem cogita um carro elétrico é o carregamento — ele parece desconhecido e lento comparado a um abastecimento de dois minutos. Mas, uma vez que você entende os três "níveis" de carregamento e, crucialmente, *onde* o carregamento de fato acontece na vida diária, a maior parte da preocupação se dissolve. A reformulação-chave: você não dirige até um carregador e espera. Para a maioria dos donos de elétricos, o carro carrega enquanto está estacionado e eles fazem outra coisa — geralmente dormindo.

## Os três níveis de carregamento

A velocidade de carregamento de elétricos vem em três faixas, definidas por quanta potência entregam:

| Nível | Fonte | Velocidade | Melhor para |
| --- | --- | --- | --- |
| **Nível 1** | Tomada doméstica comum | A mais lenta — alguns quilômetros de autonomia por hora | Reforços durante a noite, híbridos plug-in, motoristas de baixa quilometragem |
| **Nível 2** | Circuito de 240V (como o de uma secadora); estações domésticas e públicas | Muito mais rápido — uma carga completa durante a noite, ou em horas | O burro de carga do dia a dia: casa, trabalho, lojas |
| **Recarga rápida CC** | Estações públicas de alta potência | Veloz — cerca de 20 a 40 min para um reforço grande | Viagens e direção de longa distância |

A forma mais simples de lembrar: o **Nível 1** é um fio de água de uma tomada comum, o **Nível 2** é o padrão prático doméstico/público que reabastece o carro com folga durante a noite, e a **recarga rápida CC** é a opção de viagem que acrescenta muita autonomia numa pausa para o café.

## Por que carregar no dia a dia não é como abastecer

Aqui está a percepção que derrota a "ansiedade de autonomia": carros a gasolina rodam quase vazios e então reabastecem totalmente num posto. Os elétricos funcionam ao contrário — você **reforça pouco e com frequência**, na maior parte em casa. Ligue na tomada quando estacionar para a noite e acorde "cheio" toda manhã, sem nunca fazer uma viagem especial. Para a direção diária típica, você pode passar semanas sem visitar um carregador público. A recarga rápida é para a exceção — viagens longas — não para a rotina.

É por isso que carregar em casa importa tanto (veja a decisão entre elétrico e a gasolina): se você puder ligar na tomada onde estaciona, o carregamento se torna invisível. Se não puder, você se apoia mais no carregamento de Nível 2 no trabalho ou em estações públicas, o que é viável, mas menos cômodo.

## Entendendo a recarga rápida em viagens

Numa viagem, a recarga rápida CC acrescenta um grande pedaço de autonomia rapidamente — mas duas peculiaridades surpreendem os novatos. Primeiro, o carregamento **fica mais lento conforme a bateria enche** (é mais rápido de baixa até cerca de 80%, e então desacelera de propósito para proteger a bateria), então as pessoas carregam até ~80% e seguem em vez de esperar pelos 100%. Segundo, a velocidade de carregamento depende tanto da potência da estação quanto da taxa máxima de aceitação do carro — a mais lenta das duas prevalece. Planeje as viagens em torno dos locais de recarga rápida, e as paradas mais ou menos coincidem com os descansos que você faria de qualquer forma.

## Perguntas frequentes

**Quanto tempo realmente leva para carregar?**
Em casa, no Nível 2, durante a noite — você nunca espera, só desliga da tomada de manhã. Numa viagem com recarga rápida CC, cerca de 20 a 40 minutos para um reforço substancial. O Nível 1 de uma tomada comum é lento e melhor como um fio de água durante a noite para quem dirige pouco.

**Carregar vai desgastar a minha bateria?**
O carregamento de rotina é tranquilo. A recarga rápida CC frequente e o hábito de carregar até 100% acrescentam um pouco de desgaste extra, e por isso muita gente carrega diariamente até cerca de 80% e reserva as cargas completas e a recarga rápida para as viagens. As baterias modernas gerenciam isso bem.

**E se eu não conseguir carregar em casa?**
Ainda é viável via carregamento no trabalho, Nível 2 público e recargas rápidas — muita gente faz assim — mas é menos fluido. Se carregar em casa não for possível, pondere quão conveniente é a recarga próxima antes de comprar.`,
  },
  {
    topicKey: 'reading-energy-bill',
    title: 'Como ler (e realmente reduzir) sua conta de luz',
    question: 'Como entendo a minha conta de luz, e o que de fato a reduz?',
    summary:
      'Sua conta cobra pela energia usada, medida em quilowatt-hora, muitas vezes mais taxas fixas e tarifas por horário. A maior economia vem das suas maiores cargas — aquecimento, refrigeração, aquecimento de água — não de desligar pequenos aparelhos. Veja como encontrá-las e cortá-las.',
    tags: ['casa', 'energia', 'eletricidade', 'economizar dinheiro'],
    language: 'pt',
    image: { prompt: promptOf('reading-energy-bill'), alt: 'Conta de luz como um gráfico de barras onde poucas cargas grandes superam muitas minúsculas' },
    sources: [
      { title: 'EIA dos EUA — Entendendo o uso de eletricidade e as contas', url: 'https://www.eia.gov/energyexplained/use-of-energy/homes.php' },
      { title: 'Departamento de Energia dos EUA — Guia de economia de energia', url: 'https://www.energy.gov/energysaver/energy-saver' },
    ],
    content: `# Como ler (e realmente reduzir) sua conta de luz

Uma conta de luz pode parecer confusão deliberada — quilowatt-hora, encargos de geração, encargos de distribuição, tarifas por horário de uso. Mas, por baixo do jargão, é simples: você paga pela energia que usa, mais alguns custos fixos para estar conectado. Quando você consegue lê-la, pode mirar as poucas coisas que de fato a movem — e evitar gastar esforço com as muitas que não. A maioria das pessoas foca no lado errado da conta.

## A única unidade que importa: o quilowatt-hora

O uso de eletricidade é medido em **quilowatt-hora (kWh)** — basicamente, quanta potência algo puxa multiplicada por quanto tempo funciona. Um aparelho de 1.000 watts funcionando por uma hora usa um kWh. Sua conta é, na maior parte: (kWh usados) × (preço por kWh), muitas vezes **mais uma taxa fixa mensal** só por estar conectado (por isso usar *menos* não derruba a conta a zero). Muitas distribuidoras também acrescentam **distribuição/geração** como itens separados, e algumas cobram **tarifas diferentes em horários diferentes do dia** (horário de uso), em que a eletricidade é mais cara nas horas de pico de demanda.

Saber disso já mostra as duas formas de pagar menos: **usar menos kWh** ou **usá-los quando estão mais baratos** (se você está numa tarifa por horário).

## Encontre as grandes cargas — ignore as minúsculas

O princípio mais útil para reduzir uma conta: **algumas cargas grandes dominam, e muitas pequenas mal registram.** Na maioria das casas, os gigantes são:

- **Aquecimento e refrigeração** (muitas vezes a maior carga isolada)
- **Aquecimento de água**
- **Grandes eletrodomésticos** (geladeira, secadora, forno)
- **Qualquer coisa que produz calor ou frio** — elas fazem os eletrônicos parecerem insignificantes

Enquanto isso, carregadores de celular e aparelhos ociosos (cargas "fantasma") são reais, mas pequenos. Obcecar por desligar um carregador da tomada enquanto ignora um ar-condicionado velho e ineficiente ou aquece uma casa vazia é otimizar o lado errado. Vá atrás das barras grandes primeiro.

## O que de fato corta a conta

| Alto impacto (as grandes cargas) | Baixo impacto (parece produtivo, economiza pouco) |
| --- | --- |
| Ajustar as temperaturas de aquecimento/refrigeração; isolar; vedar frestas | Desligar carregadores de celular da tomada |
| Aquecimento/refrigeração eficientes (ex.: bomba de calor) | Apagar mais cedo uma única lâmpada de LED |
| Reduzir a temperatura do aquecedor de água; banhos quentes mais curtos | Se preocupar com o consumo em espera de um relógio |
| Deslocar o uso pesado para fora do pico (em planos de horário de uso) | — |
| Eletrodomésticos eficientes; cargas cheias na lava-louças/secadora | — |
| Iluminação LED | — |

Dois movimentos subestimados: verificar se um **plano de tarifa diferente** (ex.: horário de uso) combina com seus hábitos, e usar os **dados de consumo** da sua distribuidora ou um medidor de tomada para ver para onde seus kWh realmente vão — adivinhar costuma estar errado, e os dados apontam direto para os grandes alvos.

## Perguntas frequentes

**Por que minha conta está alta mesmo quando tento economizar?**
Geralmente porque as grandes cargas — aquecimento, refrigeração, aquecimento de água — dominam, e pequenas economias em outros lugares não conseguem compensá-las. Verifique essas primeiro, e procure uma taxa fixa de conexão e oscilações sazonais (ar-condicionado no verão, aquecimento no inverno) que pequenos hábitos não resolvem.

**As cargas fantasma/em espera realmente importam?**
São reais, mas pequenas para a maioria das casas — uma fatia pequena da conta. Vale um filtro de linha inteligente para um conjunto de eletrônicos, mas não vale estresse enquanto uma carga muito maior roda sem controle. Priorize pelo tamanho.

**Vale a pena migrar para a tarifa por horário de uso?**
Pode economizar *se* você conseguir deslocar o uso pesado (lavar roupa, lava-louças, carregar o elétrico, pré-resfriar) para fora do pico. Se o seu uso é inevitavelmente no horário de pico, pode sair mais caro — confira o seu padrão contra os horários do plano antes de migrar.`,
  },
];
