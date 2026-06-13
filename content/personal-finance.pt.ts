import type { DraftArticle } from './types';
import { personalFinanceEn } from './personal-finance.en';

// Batch: Personal Finance (versão nativa em português brasileiro). Mesmos
// títulos e topicKey de personal-finance.en.ts; o conteúdo é escrito de forma
// nativa para o leitor brasileiro (exemplos em reais, conceitos institucionais
// mantidos genéricos, sem amarrar a um único regime tributário/previdenciário).
// As imagens são compartilhadas por topicKey.

const promptOf = (key: string): string => {
  const hit = personalFinanceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

const NOTE =
  '\n\n*Este artigo traz educação financeira geral e não constitui recomendação de investimento personalizada.*';

export const personalFinancePt: DraftArticle[] = [
  {
    topicKey: 'compound-interest',
    title: 'Como os juros compostos realmente funcionam',
    question: 'Como funcionam os juros compostos e por que dizem que são tão poderosos?',
    summary:
      'Juros compostos rendem sobre os próprios rendimentos: o dinheiro cresce em curva, não em linha reta — suave por anos, depois íngreme. O tempo pesa mais que a taxa, e é por isso que começar cedo vence.',
    tags: ['finanças', 'investimentos', 'juros compostos', 'poupança'],
    language: 'pt',
    image: {
      prompt: promptOf('compound-interest'),
      alt: 'Uma semente de luz crescendo numa árvore que se ramifica exponencialmente',
    },
    sources: [
      { title: 'Investor.gov (SEC dos EUA) — Calculadora de juros compostos', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Wiki Bogleheads — Filosofia e conceitos centrais de investimento', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Como os juros compostos realmente funcionam

Juros compostos significam que você ganha rendimento não só sobre o dinheiro que aplicou, mas também sobre o rendimento que ele já gerou. O juro simples cresce em linha reta; o juro composto cresce numa curva que começa plana e termina íngreme. Quase toda a mágica acontece nos anos finais — por isso o *quando* você começa importa mais do que quase qualquer outra coisa.

## O mecanismo em um exemplo

Aplique R$ 10.000 num investimento que rende 7% ao ano:

- **Ano 1**: você ganha R$ 700 (sobre seus R$ 10.000).
- **Ano 2**: você ganha R$ 749 — R$ 700 sobre o valor original mais R$ 49 sobre o ganho do ano passado.
- **Ano 10**: o montante chega a cerca de R$ 19.700; só naquele ano rende ~R$ 1.290.
- **Ano 30**: o montante chega a cerca de R$ 76.000; um único ano agora rende ~R$ 5.000 — metade da sua aplicação original, todo ano, sem você fazer nada.

A fórmula é A = P × (1 + r)^t, mas a intuição é mais simples: o crescimento se alimenta do crescimento anterior, então os ganhos aceleram.

## A regra dos 72

Divida 72 pelo seu rendimento anual para estimar em quantos anos o dinheiro dobra:

| Rendimento anual | Dobra aproximadamente a cada |
| --- | --- |
| 3% | 24 anos |
| 6% | 12 anos |
| 7% | ~10 anos |
| 10% | ~7 anos |

As duplicações se acumulam: a 7%, trinta anos são cerca de três duplicações — 1× vira ~8×. A mesma aritmética também joga contra você: uma dívida a 18% dobra em cerca de quatro anos, e uma inflação de 3% corta o poder de compra pela metade em cerca de 24.

## Por que o tempo vence a taxa

Aportando R$ 500 por mês a 7%:

- Por **30 anos**: ~R$ 610.000 (R$ 180.000 aportados).
- Por **40 anos**: ~R$ 1.310.000 (R$ 240.000 aportados).

Dez anos iniciais a mais — só R$ 60.000 a mais aportados — adicionam cerca de R$ 700.000, porque o dinheiro mais antigo compõe por mais tempo. Perseguir um ponto percentual a mais de rendimento é bem menos confiável do que comprar anos extras começando agora.

## O que compõe na vida real

A poupança e a renda fixa compõem literalmente; carteiras de ações compõem estatisticamente (os retornos variam ano a ano, mas os ganhos reinvestidos se acumulam uns sobre os outros); dividendos compõem quando reinvestidos. As taxas também compõem, mas ao contrário: uma taxa anual de 1% sobre um retorno bruto de 7% consome cerca de um quarto da sua riqueza final ao longo de 40 anos.

## Perguntas frequentes

**A frequência de capitalização (diária vs. mensal) faz muita diferença?**
Bem menos do que se imagina — a 5%, a capitalização diária versus anual difere em cerca de 0,13 ponto percentual de rendimento efetivo. Taxa e tempo dominam.

**De onde vêm os 7% tão citados?**
É aproximadamente o retorno histórico de longo prazo, já descontada a inflação, de índices amplos de ações dos EUA. É uma média sobre anos muito acidentados, não uma promessa.

**Os juros compostos são mesmo "a oitava maravilha do mundo" (Einstein)?**
A citação é quase certamente apócrifa — a matemática já é maravilha suficiente sem o aval da celebridade.${NOTE}`,
  },
  {
    topicKey: 'index-funds',
    title: 'O que é um fundo de índice — e por que os especialistas vivem recomendando?',
    question: 'O que é um fundo de índice e por que ele é tão recomendado para o investidor comum?',
    summary:
      'Um fundo de índice compra automaticamente todas as ações de um índice de mercado, cobrando taxas próximas de zero. Décadas de dados mostram que a grande maioria dos gestores profissionais não bate o índice no longo prazo — esse é o argumento inteiro.',
    tags: ['finanças', 'investimentos', 'fundos de índice', 'investimento passivo'],
    language: 'pt',
    image: {
      prompt: promptOf('index-funds'),
      alt: 'Centenas de pequenos cubos luminosos carregados como uma só cesta',
    },
    sources: [
      { title: 'SPIVA — Placares S&P "Índice vs. Gestão Ativa"', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Wiki Bogleheads — Carteira de três fundos', url: 'https://www.bogleheads.org/wiki/Three-fund_portfolio' },
      { title: 'Investor.gov (SEC dos EUA) — Noções básicas de fundos e ETFs', url: 'https://www.investor.gov' },
    ],
    content: `# O que é um fundo de índice — e por que os especialistas vivem recomendando?

Um fundo de índice é um fundo que não tenta escolher vencedores. Ele simplesmente compra todos os papéis de um índice de mercado — todas as ~500 empresas do S&P 500, ou milhares de ações de um índice de mercado total — na proporção do tamanho de cada uma, e segura. Sem analistas, sem previsões, sem mesa de operações para sustentar. Parece desistir; os dados dizem o oposto.

## O argumento em três fatos

**1. É difícil bater o mercado.** Os placares SPIVA, publicados há mais de duas décadas, mostram repetidamente que, em janelas de 15 anos, a grande maioria — muitas vezes 80% a 90% — dos fundos de gestão ativa fica abaixo do seu índice de referência nos grandes mercados. Profissionais com equipes em tempo integral, na média, não conseguem superar o índice contra o qual são medidos.

**2. Não dá para saber os vencedores de antemão.** Alguns fundos realmente batem o mercado — mas os vencedores raramente se mantêm, e o desempenho passado é um seletor notoriamente ruim. Escolher o gestor vencedor da próxima década é o mesmo problema que escolher a ação vencedora da próxima década, um andar acima.

**3. Os custos compõem contra você.** Fundos de índice cobram taxas de administração tão baixas quanto 0,03% a 0,2% ao ano; fundos ativos costumam cobrar de 0,5% a 1,5% mais custos internos de negociação mais altos. Um arrasto anual de 1%, composto ao longo de 40 anos, consome cerca de um quarto da riqueza final. O fundo de índice vence em parte simplesmente por se recusar a gastar o seu dinheiro.

## O que você de fato recebe

| Propriedade | Fundo de índice | Fundo ativo típico |
| --- | --- | --- |
| Objetivo | Acompanhar o mercado | Bater o mercado |
| Taxa anual | ~0,03% a 0,2% | ~0,5% a 1,5%+ |
| Diversificação | Centenas a milhares de papéis | As escolhas do gestor |
| Risco de pessoa-chave | Nenhum | A saída do gestor importa |
| Previsibilidade | Você recebe o retorno do mercado, menos quase nada | Ampla dispersão em torno do índice |

O enquadramento honesto: um fundo de índice garante que você nunca vai bater o mercado — e em troca torna você estatisticamente muito propenso a bater a maioria das pessoas que tenta.

## O que os fundos de índice não resolvem

Eles não eliminam o risco de mercado: um fundo de mercado total caiu cerca de metade em 2008–09 e se recuperou junto com o mercado. Eles não escolhem sua alocação de ativos — quanto de ações versus renda fixa continua sendo decisão sua (e importa mais do que a seleção do fundo). E um índice estreito (um setor, um tema) não é diversificação; a recomendação é usar índices amplos de mercado.

## Perguntas frequentes

**Se todo mundo investisse em índices, o mercado não quebraria?**
Em algum extremo teórico, a descoberta de preços enfraqueceria — mas a negociação ativa ainda domina o volume diário, e qualquer ineficiência que ela deixasse atrairia os selecionadores de ações de volta. Estamos longe desse limite.

**Fundo de índice ou ETF?**
Ambos podem acompanhar o mesmo índice; a diferença é o invólucro de negociação. Para quem investe no longo prazo, qualquer um serve — as taxas e o índice acompanhado importam mais.

**Fundos de índice são "se contentar com a média"?**
Eles se contentam com o retorno *do mercado*, que, depois dos custos, historicamente ficou acima do resultado da maioria dos profissionais. Preço médio, resultado acima da média.${NOTE}`,
  },
  {
    topicKey: 'inflation-purchasing-power',
    title: 'Como a inflação corrói silenciosamente o seu poder de compra',
    question: 'Como a inflação realmente corrói as economias e o poder de compra ao longo do tempo?',
    summary:
      'A inflação é um imposto composto e lento sobre o dinheiro parado: a 3% ao ano, o dinheiro perde metade do poder de compra em cerca de 24 anos. Entender o retorno real (já descontada a inflação) é o que separa poupar de preservar riqueza.',
    tags: ['finanças', 'inflação', 'economia', 'poupança'],
    language: 'pt',
    image: {
      prompt: promptOf('inflation-purchasing-power'),
      alt: 'Uma moeda encolhendo dentro de uma ampulheta enquanto objetos crescem ao redor',
    },
    sources: [
      { title: 'Bureau of Labor Statistics dos EUA — Índice de Preços ao Consumidor', url: 'https://www.bls.gov/cpi/' },
      { title: 'FRED (Fed de St. Louis) — séries de dados de inflação', url: 'https://fred.stlouisfed.org' },
    ],
    content: `# Como a inflação corrói silenciosamente o seu poder de compra

A inflação é a velocidade com que os preços em geral sobem — ou, de forma equivalente, a velocidade com que cada unidade de dinheiro compra menos. Ela funciona exatamente como os juros compostos, mas contra você: pequenos percentuais anuais, compondo silenciosamente, até que o efeito acumulado seja enorme. Dinheiro escondido embaixo do colchão não é "seguro"; é garantia de encolher.

## A aritmética composta da perda

Usando a regra dos 72 ao contrário — 72 dividido pela taxa de inflação dá os anos para o poder de compra cair pela metade:

| Inflação média | Dinheiro cai à metade em |
| --- | --- |
| 2% | ~36 anos |
| 3% | ~24 anos |
| 5% | ~14 anos |
| 8% | ~9 anos |

A uma inflação modesta de 3%, os R$ 100 na sua gaveta viram, em poder de compra, cerca de R$ 74 depois de dez anos, R$ 55 depois de vinte e R$ 48 depois de vinte e quatro. Nada foi roubado; tudo apenas ficou mais caro.

## Nominal vs. real: a única distinção que importa

Uma aplicação que paga 2% enquanto a inflação corre a 3% tem um **retorno real de cerca de −1%** — você está perdendo poder de compra enquanto o saldo cresce. Sempre subtraia a inflação:

retorno real ≈ retorno nominal − taxa de inflação

Essa única subtração reformula a maioria das decisões financeiras. "Minha aplicação paga 4%" não significa nada até você saber se os preços sobem 2% ou 6%. Historicamente, índices amplos de ações entregaram retornos reais positivos no longo prazo (cerca de 6% a 7% reais nos EUA em janelas muito longas), enquanto dinheiro e depósitos de curto prazo ficaram perto de zero real — às vezes abaixo.

## Quem a inflação prejudica e quem ela ajuda

- **Prejudica**: quem tem dinheiro parado e pagamentos fixos — poupadores em contas de baixo rendimento, quem vive de uma aposentadoria fixa, credores que travaram taxas baixas.
- **Ajuda**: quem tem dívida com taxa prefixada (pagando com dinheiro mais barato) e donos de ativos reais — empresas, imóveis, ações — cujos preços e lucros tendem a subir com o nível de preços ao longo do tempo.

Essa assimetria é o motivo de "manter economias de décadas inteiramente em dinheiro" ser, historicamente, uma das estratégias que mais perde de forma confiável, apesar de parecer a mais segura.

## A inflação medida vs. a sua inflação

O IPCA oficial acompanha uma cesta média nacional. A sua taxa pessoal varia com a sua vida: quem aluga em cidades aquecidas, paga mensalidades escolares ou viaja com frequência pode sentir uma inflação bem acima do número oficial; um dono de imóvel já estabelecido pode sentir menos. Avalie suas finanças contra a sua cesta, não apenas contra o número da manchete.

## Perguntas frequentes

**Um pouco de inflação é bom?**
A maioria dos bancos centrais mira algo em torno de 2% deliberadamente — uma inflação leve lubrifica os ajustes de salário e desestimula entesourar dinheiro, enquanto a deflação (queda de preços) tende a acompanhar a estagnação econômica e deixa as dívidas mais pesadas.

**A inflação significa que devo evitar todo dinheiro em caixa?**
Não — a função de uma reserva de emergência é a disponibilidade, não o crescimento, e seu custo de inflação é o prêmio que você paga pela segurança. O erro é manter dinheiro de *horizonte de décadas* parado.

**O que protege contra a inflação?**
Em horizontes longos: ativos produtivos (ações amplas, imóveis) e títulos atrelados à inflação. Em horizontes curtos, nada é perfeito — por isso importa casar os ativos com o horizonte de tempo.${NOTE}`,
  },
  {
    topicKey: 'emergency-fund',
    title: 'De que tamanho deve ser a sua reserva de emergência?',
    question: 'Quantos meses de despesas devo manter numa reserva de emergência, e onde?',
    summary:
      'A resposta padrão é de 3 a 6 meses de despesas essenciais em formato de acesso imediato e sem risco — mais se a sua renda for instável. A função é ser seguro, não rendimento: evita que o azar vire dívida.',
    tags: ['finanças', 'poupança', 'reserva de emergência', 'orçamento'],
    language: 'pt',
    image: {
      prompt: promptOf('emergency-fund'),
      alt: 'Uma esfera amortecida dentro de um cofre de vidro desviando fragmentos de tempestade',
    },
    sources: [
      { title: 'Consumer Financial Protection Bureau — guias de poupança de emergência', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# De que tamanho deve ser a sua reserva de emergência?

Uma reserva de emergência é dinheiro cuja única função é absorver choques — perda de emprego, contas médicas, o carro que morre na mesma semana que o aquecedor. A orientação padrão é de **3 a 6 meses de despesas essenciais**, guardados em algum lugar entediante, líquido e sem risco. Ela rende pouco de propósito: você está comprando um seguro, e o retorno abrido mão é o prêmio.

## Dimensionando com honestidade

Conte o gasto mensal *essencial* — moradia, comida, contas de consumo, seguros, transporte, pagamentos mínimos de dívidas — e não o custo total do seu estilo de vida. Depois ajuste pelo quão frágil é a sua renda:

| Situação | Meta razoável |
| --- | --- |
| Dois salários estáveis na casa | 3 meses de essenciais |
| Um único salário estável | 4 a 6 meses |
| Renda autônoma / por comissão / sazonal | 6 a 12 meses |
| Renda única + dependentes + mercado de trabalho fraco | rumo a 12 meses |
| Risco conhecido iminente (demissões anunciadas, contrato acabando) | o máximo que conseguir, agora |

O padrão: a reserva cobre a lacuna realista entre perder a renda e repô-la, mais os choques do tamanho de uma franquia que aparecem pelo caminho.

## Onde guardar

Três requisitos: **disponível em dias, não em semanas; sem perda de valor nominal; separado do dinheiro do dia a dia.** Isso significa contas de alto rendimento, fundos de liquidez ou aplicações de curto prazo com resgate sem penalidade. Exclui ações (que podem estar 30% abaixo no mês em que você precisar), travas longas e qualquer coisa que você hesitaria em vender. Manter em um banco diferente da sua conta corrente acrescenta um atrito útil contra "pegar emprestado" dela.

## Por que não investir em vez disso?

Porque emergências se correlacionam com quedas. O modo clássico de fracasso: a recessão chega, você perde o emprego *e* a bolsa está 35% abaixo, então sua "reserva de emergência em fundos de índice" rende exatamente quando está menor. O valor da reserva é justamente não ter correlação com a sua sorte. Sim, a inflação a corrói aos poucos — esse é o custo do seguro, e é mais barato do que liquidar investimentos no fundo do poço ou carregar dívida de cartão a 20% ao ano.

## Construindo do zero

Uma sequência útil: primeiro fique um mês adiantado (isso mata a maior parte do estresse de viver de salário em salário), depois construa rumo a três meses pagando ao menos o mínimo de todas as dívidas, e então reavalie se a dívida cara ou o resto da reserva merece prioridade — matematicamente, quitar uma dívida de 20% ao ano é um "retorno" imbatível, então muitas pessoas estacionam em um mês, limpam a dívida tóxica e depois terminam a reserva.

## Perguntas frequentes

**Um cartão de crédito serve como reserva de emergência?**
É uma *ponte* de emergência, não uma reserva — ótimo para as 48 horas antes de a poupança cair, péssimo como plano, já que as emergências que mais importam (perda de emprego) são exatamente quando carregar dívida a 20% ao ano mais dói.

**A reserva deve crescer com a minha renda?**
Ela deve crescer com as suas *despesas e obrigações*. Um aumento que você poupa não exige uma reserva maior; um financiamento imobiliário e dois filhos exigem.

**O que conta como emergência?**
Inesperado, necessário, urgente — precisa ter os três. Uma promoção de passagens não cumpre nenhum; um câmbio quebrado de que você precisa para trabalhar cumpre todos.${NOTE}`,
  },
  {
    topicKey: 'stocks-vs-bonds',
    title: 'Ações vs. títulos de renda fixa: qual é a diferença de verdade?',
    question: 'Qual é a diferença real entre ações e renda fixa, e como elas se comportam de forma distinta?',
    summary:
      'Uma ação é propriedade — seu retorno depende de como a empresa vai. Um título de renda fixa é um empréstimo — seu retorno é um contrato. Essa única diferença explica por que ações rendem mais na média e por que a renda fixa estabiliza a carteira.',
    tags: ['finanças', 'investimentos', 'ações', 'renda fixa'],
    language: 'pt',
    image: {
      prompt: promptOf('stocks-vs-bonds'),
      alt: 'Uma crista acidentada ascendente ao lado de uma escada suave e uniforme de luz',
    },
    sources: [
      { title: 'Investor.gov (SEC dos EUA) — introdução a ações e títulos', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) — dados históricos de retorno', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Ações vs. títulos de renda fixa: qual é a diferença de verdade?

Uma **ação** torna você sócio de uma empresa: você participa dos lucros dela (dividendos, crescimento) e dos fracassos, sem promessas. Um **título de renda fixa** torna você credor de uma empresa ou governo: eles devem a você juros fixos e o seu dinheiro de volta numa data, por contrato. Todo o resto — a diferença de retorno, a diferença de risco, a forma como as carteiras os combinam — decorre de propriedade versus empréstimo.

## O acordo que cada um oferece

| | Ação (propriedade) | Renda fixa (empréstimo) |
| --- | --- | --- |
| Seu retorno | O que sobrar depois de todos receberem — alta ilimitada | Cupons fixos + principal de volta — alta limitada |
| Se a empresa prospera | Você captura o crescimento | Você ainda recebe os mesmos cupons |
| Se ela quebra | Você é o último da fila, muitas vezes zerado | Os credores recebem antes dos donos |
| Principais riscos | Resultado do negócio, humor do mercado | Calote, inflação, alta de juros |
| Retorno real histórico de longo prazo (EUA, janelas muito longas) | ~6% a 7% ao ano | ~1% a 3% ao ano |
| Ano ruim típico | −20% a −50% | −5% a −15% (choques de juros) |

O retorno médio mais alto das ações não é um bônus; é o pagamento por aceitar a incerteza e a posição de último da fila. As finanças chamam isso de prêmio de risco das ações.

## O que move o preço dos títulos

Títulos não são estáticos: o preço de um título negociado se move ao contrário das taxas de juros. Se você tem um título que paga 2% e novos títulos pagam 5%, ninguém compra o seu pelo valor de face — o preço cai até os rendimentos se igualarem. Títulos de prazo mais longo oscilam mais forte. É por isso que até fundos de renda fixa "seguros" tiveram um ano historicamente ruim quando os juros dispararam, e por que a renda fixa reduz, mas não elimina, o risco.

## Por que as carteiras combinam os dois

Ações e renda fixa muitas vezes (nem sempre) sobem e descem em momentos diferentes: recessões que esmagam ações costumam trazer cortes de juros que valorizam títulos de alta qualidade. Uma clássica mistura 60/40 historicamente capturou a maior parte do crescimento das ações com quedas bem menores. A mistura é um botão de ajuste:

- **Mais ações** → maior crescimento esperado, quedas maiores e mais longas. Combina com horizontes longos.
- **Mais renda fixa** → trajeto mais estável, crescimento esperado menor. Combina com necessidades de curto prazo e estômagos fracos.

O ajuste certo depende de quando você precisa do dinheiro e de como você se comporta num crash — vender ações no pânico custa mais do que qualquer erro de alocação.

## Perguntas frequentes

**Renda fixa é "segura"?**
Mais segura que ações contra a falência do negócio; não segura contra inflação ou movimentos de juros. Um título público mantido até o vencimento devolve o caixa prometido — que a inflação pode silenciosamente desvalorizar.

**Preciso de títulos individuais ou de um fundo de renda fixa?**
Fundos oferecem diversificação e liquidez fáceis; títulos individuais oferecem uma data de pagamento conhecida. Para a maioria, um fundo amplo de renda fixa de alta qualidade é a ferramenta mais simples.

**Por que não 100% em ações se sou jovem?**
Matematicamente defensável com décadas de horizonte e disciplina de ferro. O risco honesto é comportamental: uma queda de 45% testa a disciplina de formas que planilhas não capturam.${NOTE}`,
  },
  {
    topicKey: 'dollar-cost-averaging',
    title: 'O que é o aporte programado (preço médio) — e quando faz sentido?',
    question: 'O que é o aporte programado por preço médio e ele é melhor do que investir tudo de uma vez?',
    summary:
      'O aporte programado investe um valor fixo num cronograma fixo, comprando mais cotas quando os preços estão baixos. Para quem investe do salário, acontece naturalmente; para um valor avulso, investir tudo de uma vez costuma vencer na matemática — o aporte programado vence no comportamento.',
    tags: ['finanças', 'investimentos', 'aporte programado', 'estratégia'],
    language: 'pt',
    image: {
      prompt: promptOf('dollar-cost-averaging'),
      alt: 'Gotas idênticas caindo em intervalos regulares formando um lago estável',
    },
    sources: [
      { title: 'Wiki Bogleheads — Dollar cost averaging', url: 'https://www.bogleheads.org/wiki/Dollar_cost_averaging' },
      { title: 'Investor.gov (SEC dos EUA) — noções básicas de investimento', url: 'https://www.investor.gov' },
    ],
    content: `# O que é o aporte programado (preço médio) — e quando faz sentido?

O aporte programado por preço médio (em inglês, dollar-cost averaging) significa investir o mesmo valor em intervalos regulares — digamos R$ 500 no primeiro dia de cada mês — independentemente do que o mercado está fazendo. O valor fixo compra mais cotas quando os preços estão baixos e menos quando estão altos, e elimina a pior pergunta do mundo dos investimentos ("agora é uma boa hora?") ao transformar o timing numa não decisão.

## A aritmética

Invista R$ 300 por mês num fundo cujo preço oscila:

| Mês | Preço | Cotas compradas |
| --- | --- | --- |
| Jan | 30 | 10,0 |
| Fev | 20 | 15,0 |
| Mar | 25 | 12,0 |
| Abr | 30 | 10,0 |

Você gastou R$ 1.200 por 47 cotas — um custo médio de ~R$ 25,5 por cota, *abaixo* do preço médio simples (26,25), porque o orçamento fixo automaticamente pesou mais no mês barato. Essa é a vantagem mecânica: compra disciplinada nas quedas sem prever nada.

## Duas situações muito diferentes

**1. Investir a partir do salário (a maioria das pessoas).** O aporte programado não é uma escolha de estratégia — é a única opção, já que o dinheiro chega mensalmente. Automatizá-lo é puro ganho: nenhuma decisão, nenhuma hesitação durante manchetes assustadoras, décadas de disciplina forçada.

**2. Investir um valor avulso (bônus, herança, venda).** Aqui você *poderia* investir tudo hoje ou espalhar ao longo de um ano. Matematicamente, investir tudo de uma vez historicamente venceu o espalhamento cerca de duas vezes a cada três, simplesmente porque os mercados sobem mais vezes do que caem e o aporte programado deixa dinheiro parado fora do mercado. Mas no terço das vezes em que perde, perde no pior momento psicológico — logo depois de você ter investido tudo.

| | Tudo de uma vez | Aporte ao longo de ~12 meses |
| --- | --- | --- |
| Resultado esperado | Maior (mais tempo no mercado) | Levemente menor |
| Sensação no pior caso | Brutal (tudo dentro antes de um crash) | Amortecida |
| Risco de nunca investir | Baixo, uma vez feito | "Pausar" no meio do plano é comum |

A resposta pragmática: se um mês ruim faria você abandonar o plano ou perder o sono, faça o aporte do valor avulso ao longo de 6 a 12 meses num cronograma escrito — um pequeno custo esperado por uma grande garantia comportamental. Se você realmente consegue dar de ombros para a volatilidade, invista tudo e siga em frente.

## Onde o aporte programado falha em silêncio

Aportar numa única ação faz preço médio em algo que pode nunca se recuperar — o mecanismo só "compra a queda" de forma útil quando o ativo é amplamente diversificado e inclinado para cima no longo prazo. E parar os aportes durante os crashes apaga todo o sentido: as cotas baratas são justamente as que a estratégia existe para comprar.

## Perguntas frequentes

**O aporte programado garante lucro?**
Não — ele molda *quando* você compra, não se o ativo sobe. Um ativo em queda ainda perde dinheiro, só que a partir de um custo médio menor.

**Semanal ou mensal?**
Praticamente idêntico ao longo dos anos. Acompanhe o seu salário e esqueça; a frequência é discussão de menor importância.

**Devo pausar o aporte quando o mercado parece caro?**
Isso é fazer timing de mercado disfarçado. O valor da estratégia é justamente ignorar os seus sentimentos sobre o preço.${NOTE}`,
  },
  {
    topicKey: 'asset-allocation',
    title: 'Alocação de ativos e rebalanceamento, explicados de forma simples',
    question: 'O que é alocação de ativos e como o rebalanceamento funciona de verdade?',
    summary:
      'A alocação de ativos — a divisão entre ações, renda fixa e caixa — determina a maior parte do risco e do comportamento de longo prazo da carteira, muito mais do que escolher fundos. O rebalanceamento mantém essa divisão na meta aparando os vencedores e reforçando os perdedores.',
    tags: ['finanças', 'investimentos', 'alocação de ativos', 'carteira'],
    language: 'pt',
    image: {
      prompt: promptOf('asset-allocation'),
      alt: 'Um gráfico de pizza luminoso em três partes mantido em equilíbrio sobre uma balança',
    },
    sources: [
      { title: 'Wiki Bogleheads — Alocação de ativos', url: 'https://www.bogleheads.org/wiki/Asset_allocation' },
      { title: 'Investor.gov (SEC dos EUA) — noções básicas de alocação de ativos', url: 'https://www.investor.gov' },
    ],
    content: `# Alocação de ativos e rebalanceamento, explicados de forma simples

Alocação de ativos é a divisão percentual da sua carteira entre as classes de ativos — tipicamente ações para crescimento, renda fixa para estabilidade, caixa para imediatismo. É a única decisão que domina como a sua carteira se comporta: pesquisas que remontam a décadas atribuem a grande maioria da *variabilidade* de retorno de uma carteira diversificada à sua alocação, e não a quais fundos ou ações específicos preenchem os baldes.

## Por que a divisão importa mais do que as escolhas

Dois investidores, ambos com excelentes fundos de baixo custo, terão experiências completamente diferentes se um estiver 90% em ações e o outro 30%. O investidor 90/10 deve esperar cerca do dobro do crescimento de longo prazo — e quedas perto de −45% nos crashes ruins. O investidor 30/70 abre mão de boa parte do crescimento em troca de quedas que raramente passam de −15%. Nenhum está errado; eles respondem a perguntas diferentes: *quando o dinheiro é necessário e o que esta pessoa consegue segurar sem entrar em pânico?*

Um mapa aproximado:

| Dinheiro necessário em… | Formato comum de alocação |
| --- | --- |
| < 3 anos | Majoritariamente caixa e renda fixa curta |
| 3 a 10 anos | Equilibrada, p. ex. 40% a 60% em ações |
| 10 a 30+ anos | Pesada em ações, p. ex. 70% a 90% em ações |

Heurísticas como "110 menos a sua idade em ações" são pontos de partida grosseiros — úteis para ancorar, não leis. A *capacidade* de risco (seu prazo, estabilidade de renda) e a *tolerância* a risco (o que você consegue dormir aguentando) contam ambas, e a menor das duas deve vencer.

## O que é rebalanceamento

Os mercados se movem; a sua divisão deriva. Depois de um ótimo ano de ações, uma carteira 60/40 pode ir para 70/30 — silenciosamente mais arriscada do que você escolheu. Rebalancear vende parte do que cresceu e compra o que ficou para trás, restaurando a meta. É manutenção de risco, não busca de retorno: você está sistematicamente realizando lucro do lado caro e reforçando o lado barato, no cronograma, sem prever nada.

Dois gatilhos viáveis — escolha um e automatize:

- **Calendário**: uma ou duas vezes por ano, na mesma data.
- **Limite**: rebalanceie quando qualquer ativo derivar mais de ~5 pontos percentuais da meta.

Para quem aporta continuamente, o método mais barato é **rebalancear com os aportes**: direcione o dinheiro novo para o que estiver abaixo da meta, evitando vendas (e quaisquer impostos ou taxas) por completo.

## A disciplina que ele impõe

O superpoder silencioso do rebalanceamento é comportamental: ele força você a comprar ações depois dos crashes (quando a sua meta diz que você está subalocado) e a aparar depois da euforia — exatamente as operações que as emoções resistem. Investidores que rebalancearam durante 2008–09 compraram mecanicamente perto do fundo sem precisar de coragem, apenas de uma regra.

## Perguntas frequentes

**Rebalancear aumenta o retorno?**
Às vezes um pouco (entre ativos de retorno parecido), às vezes custa um pouco (aparar uma longa alta). Seu produto real é manter o risco no nível que você escolheu.

**Quão precisas devem ser as metas?**
Números redondos, faixas largas. 58/42 versus 60/40 é ruído; transformar a alocação em ajuste constante anula o desenho.

**Onde entram outros ativos — imóveis, ouro, cripto?**
Como fatias deliberadas e limitadas (comumente ≤5% a 10% cada) adicionadas para diversificar — dimensionadas para que estar completamente errado sobre elas não mude a sua vida.${NOTE}`,
  },
  {
    topicKey: 'market-timing',
    title: 'Por que acertar o timing do mercado é tão difícil (até para profissionais)',
    question: 'Por que acertar o timing do mercado é considerado quase impossível, mesmo para profissionais?',
    summary:
      'Acertar o timing do mercado exige estar certo duas vezes — vender antes das quedas e comprar antes das altas — contra preços velozes que já embutem as expectativas. Perder apenas os poucos melhores dias, que se concentram dentro dos crashes, destrói décadas de retorno.',
    tags: ['finanças', 'investimentos', 'timing de mercado', 'comportamento'],
    language: 'pt',
    image: {
      prompt: promptOf('market-timing'),
      alt: 'Flechas tentando e errando por pouco em pousar nos picos e vales de uma onda',
    },
    sources: [
      { title: 'SPIVA — placares de persistência e gestão ativa', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Aswath Damodaran (NYU Stern) — dados e análise de mercado', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Por que acertar o timing do mercado é tão difícil (até para profissionais)

Acertar o timing do mercado — sair antes das quedas e voltar antes das recuperações — falha não porque as pessoas são burras, mas porque o jogo é estruturalmente armado contra o jogador. Você precisa estar certo **duas vezes**, sobre o **quando**, contra **preços que já contêm o consenso**, enquanto os dias de payoff se escondem **dentro das semanas mais assustadoras**. Cada obstáculo sozinho é difícil; multiplicados, explicam por que estratégias de timing parecem ótimas em histórias e ruins em resultados auditados.

## Os quatro problemas estruturais

**1. Duas decisões corretas, erro que se compõe.** Sair na hora certa não vale nada a menos que você também volte na hora certa. Alguém com 70% de acerto por decisão — muito acima do que as evidências sustentam — acerta a ida e volta apenas ~49% das vezes, antes dos custos.

**2. Os preços se movem primeiro.** Os mercados olham para frente: quando a recessão está no noticiário, os preços já caíram meses atrás; as recuperações, da mesma forma, começam em meio a manchetes terríveis, quando comprar parece insano. Agir sobre o que está visivelmente acontecendo significa operar com informação já embutida no preço.

**3. Os melhores dias se concentram dentro dos piores trechos.** Estudos de longo prazo mostram repetidamente que perder apenas os 10 a 20 melhores dias isolados ao longo de *décadas* corta a riqueza final de forma drástica — comumente pela metade ou mais — e esses dias ocorrem em sua esmagadora maioria durante os crashes e seus repiques imediatos, exatamente quando quem faz timing está parado no caixa "esperando clareza".

**4. A probabilidade base pune a ausência.** As ações sobem na maioria dos anos; o dinheiro parado fora do mercado paga um custo de oportunidade por padrão. Quem faz timing não precisa só acertar — precisa acertar por *mais* do que a tendência de alta do mercado mais impostos e custos de negociação.

## O que mostra o histórico dos profissionais

Décadas de placares SPIVA mostram que a maioria dos fundos profissionais — incluindo fundos táticos e de alocação flexível cujo mandato inteiro é fazer timing — fica atrás de índices simples em janelas longas, e os poucos vencedores raramente se repetem. Previsões pesquisadas de "onde o índice estará daqui a um ano" erram por margens largas rotineiramente. Esse é o fato empírico mais forte do investimento de varejo, e é a razão de os conselhos entediantes dominarem.

## O que funciona no lugar

Não previsão — *pré-compromisso*:

| Em vez de… | Faça… |
| --- | --- |
| "Vou sair antes do próximo crash" | Manter uma alocação cujo pior caso você consiga sobreviver |
| "Vou comprar de volta no fundo" | Automatizar aportes que compram todo mês, inclusive os terríveis |
| "Caixa até as coisas ficarem mais claras" | Aceitar que clareza e preços baixos nunca coexistem |
| Reagir a manchetes | Rebalancear por regras de calendário/limite |

Isso converte o timing de um problema de previsão (impossível de vencer) em um problema de desenho (muito possível de vencer).

## Perguntas frequentes

**"Comprar na queda" é fazer timing de mercado?**
Manter caixa *esperando* quedas é — e historicamente rende menos do que simplesmente permanecer investido. Aplicar dinheiro novo programado durante as quedas é apenas disciplina de aporte.

**Mas algumas pessoas não previram famosamente os grandes crashes?**
Sempre alguém prevê — pessoas diferentes a cada vez. Distinguir clarividência de uma grande amostra de palpites barulhentos é, depois do fato, quase impossível; apostar suas economias em identificá-la de antemão é o jeito difícil de aprender estatística.

**Então os preços nunca são previsíveis?**
Direção de curto prazo: efetivamente não, para fins práticos. Os retornos esperados de longo prazo se relacionam vagamente com o preço — úteis para calibrar expectativas, inúteis como sinal de saída.${NOTE}`,
  },
  {
    topicKey: 'etf-vs-mutual-fund',
    title: 'ETF vs. fundo tradicional: qual invólucro você deve usar?',
    question: 'Qual é a diferença entre um ETF e um fundo tradicional, e qual devo escolher?',
    summary:
      'ETFs e fundos tradicionais são invólucros da mesma ideia: investir de forma diversificada e em conjunto. ETFs negociam como ações o dia todo, com custos geralmente menores; fundos têm preço uma vez ao dia e automatizam aportes melhor. A estratégia lá dentro importa mais que o invólucro.',
    tags: ['finanças', 'investimentos', 'etf', 'fundos'],
    language: 'pt',
    image: {
      prompt: promptOf('etf-vs-mutual-fund'),
      alt: 'Uma cesta de cubos numa esteira veloz e outra pesada com calma sobre um pedestal',
    },
    sources: [
      { title: 'Investor.gov (SEC dos EUA) — Fundos e ETFs', url: 'https://www.investor.gov' },
      { title: 'Morningstar — pesquisa de fundos e ETFs', url: 'https://www.morningstar.com' },
    ],
    content: `# ETF vs. fundo tradicional: qual invólucro você deve usar?

Um ETF (fundo negociado em bolsa) e um fundo tradicional podem ter *exatamente a mesma carteira* — o mesmo índice, as mesmas ações. A diferença é o invólucro: como você compra, quando os preços são definidos, quanto custa e como os impostos se acertam. A escolha do invólucro é uma decisão de logística, não de estratégia — e a logística ainda assim se acumula ao longo de décadas.

## As diferenças mecânicas

| | ETF | Fundo tradicional |
| --- | --- | --- |
| Negociação | O dia todo na bolsa, como uma ação | Uma vez ao dia, pelo valor da cota de fechamento |
| Mínimos | Uma cota (ou uma fração, se a corretora permitir) | Muitas vezes mínimos fixos (varia) |
| Custos típicos | Em geral as menores taxas; paga-se o spread de compra/venda ao negociar | Baixos nas versões de índice; alguns têm taxas de entrada/distribuição — evitáveis |
| Aporte automático | Depende da corretora, cada vez mais suportado | Nativo e sem fricção |
| Eficiência tributária (EUA) | A criação/resgate em espécie costuma minimizar a distribuição de ganhos de capital | Mais propenso a distribuir ganhos tributáveis (depende da jurisdição) |
| Risco comportamental | A negociabilidade convida ao remexer | O preço diário desestimula o day trade |

## Quando cada invólucro encaixa melhor

**ETFs brilham quando** você quer as menores taxas correntes, investe por uma corretora moderna, se importa com controle intradiário ou transparência das posições, ou (em algumas jurisdições, notadamente os EUA) quer menos distribuições tributáveis surpresa numa conta tributável.

**Fundos tradicionais brilham quando** a prioridade é a automação sem fricção — valores mensais fixos, compras em valor exato, reinvestimento de dividendos, planos de previdência vinculados à folha — onde "configure e nunca mais olhe" é o ponto todo, e onde as versões de índice custam essencialmente o mesmo que ETFs equivalentes.

## As armadilhas que de fato vale evitar

O debate sobre invólucro distrai dos modos de falha que realmente custam dinheiro:

- **Fundos de taxa alta em qualquer invólucro** — uma taxa de 1%+ para exposição parecida com índice é a coisa de que fugir, não o invólucro.
- **Taxas de entrada e comissões recorrentes** em alguns fundos — nunca vale pagar por exposição de prateleira.
- **A tentação de negociar com ETFs** — poder vender às 10h43 durante uma manchete assustadora é recurso para traders e defeito para poupadores.
- **ETFs de nicho pouco negociados** — spreads largos taxam silenciosamente cada transação; fundos amplos e populares não têm esse problema.

## Perguntas frequentes

**Um é mais seguro que o outro?**
Posições idênticas carregam risco de mercado idêntico. Ambos os invólucros são fortemente regulados; nenhum protege você da queda do mercado.

**Por que os ETFs costumam ganhar nos impostos nos EUA?**
A criação/resgate das suas cotas acontece "em espécie" com formadores de mercado, deixando o fundo se desfazer de posições valorizadas sem vender — então menos distribuições de ganho de capital atingem os cotistas. A vantagem encolhe em contas com isenção fiscal e difere por país.

**Posso escolher só pela taxa de administração?**
Quase: o mesmo índice, depois o menor custo total (taxa de administração + spread típico), depois o invólucro que melhor automatiza o seu fluxo de aportes. Estratégia, taxa de poupança e alocação ainda fazem tudo isso parecer pequeno.${NOTE}`,
  },
  {
    topicKey: 'risk-and-return',
    title: 'Risco e retorno: a troca por trás de todo investimento',
    question: 'Como risco e retorno se relacionam, e o que "mais risco, mais retorno" realmente significa?',
    summary:
      '"Mais risco, mais retorno" na verdade significa um retorno *esperado* maior como pagamento por aceitar resultados mais amplos — inclusive os ruins. Entender volatilidade, quedas e o almoço grátis da diversificação transforma o clichê numa ferramenta útil.',
    tags: ['finanças', 'investimentos', 'risco', 'fundamentos'],
    language: 'pt',
    image: {
      prompt: promptOf('risk-and-return'),
      alt: 'Uma esfera volátil e brilhante e uma esfera calma e estável equilibradas numa gangorra',
    },
    sources: [
      { title: 'Investor.gov (SEC dos EUA) — noções básicas de risco', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) — prêmios de risco e retornos', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Risco e retorno: a troca por trás de todo investimento

"Mais risco, mais retorno" é a frase mais mal citada das finanças. A versão precisa: investimentos com faixas de resultado mais amplas e assustadoras precisam oferecer retornos **esperados** mais altos, ou ninguém os manteria. O retorno extra é *compensação*, paga na média e ao longo do tempo — não uma recompensa entregue a todo aquele que corre risco. Muitos riscos não pagam nada; a habilidade está em saber quais riscos têm prêmio.

## O que "risco" de fato significa aqui

Várias coisas distintas viajam sob uma só palavra:

- **Volatilidade** — o quanto o valor balança ano a ano. Irritante, mas sobrevivível.
- **Queda (drawdown)** — perda do topo ao fundo. Mercados amplos de ações caíram repetidamente de 30% a 50%; isso não é um cenário de cauda, é o preço da entrada.
- **Perda permanente** — a única fatal: uma empresa indo à falência, uma aposta concentrada implodindo, ou *você* vendendo no fundo e convertendo uma queda temporária em perda permanente.
- **Risco de não atingir a meta** — o silencioso: investir de forma tão cautelosa que o dinheiro não cresce o suficiente para o seu propósito. As escolhas "seguras" carregam isso em quantidade.

A volatilidade de uma carteira de ações diversificada é em sua maior parte temporária; o colapso de uma única ação muitas vezes é permanente. A mesma classe de ativo, riscos profundamente diferentes.

## Quais riscos pagam um prêmio — e quais não

| Risco | Compensado? | Por quê |
| --- | --- | --- |
| Risco amplo do mercado de ações | Sim — o prêmio das ações | Não dá para diversificar; alguém precisa carregá-lo |
| Emprestar por mais tempo / a tomadores mais fracos | Sim — prêmios de prazo e de crédito | Chance real de perda/erosão |
| Ter uma ação em vez de muitas | **Não** | Diversificável — o mercado não paga por riscos que você poderia remover de graça |
| Especulação tipo loteria | Negativo na média | Você paga pelo sonho |

Essa é a percepção prática mais profunda da tabela: **a diversificação remove risco não compensado a custo zero** — a coisa mais próxima de um almoço grátis nas finanças. A concentração só é racional quando você tem vantagem genuína ou convicção de nível privilegiado; caso contrário, é risco não remunerado.

## Casando risco com propósito

A capacidade de risco é definida pelo *tempo*: o dinheiro necessário no ano que vem não consegue atravessar uma queda de 40%; o dinheiro necessário em 2050 pode ignorar uma dúzia delas. A tolerância a risco é definida pelo *temperamento*: a alocação que você abandona no pânico nunca foi a certa, não importa o que a planilha dizia. Regra prática — assuma o seu máximo de risco *útil* com o dinheiro de horizonte longo, e nenhum risco pelo qual você não seja pago, em qualquer horizonte.

## Perguntas frequentes

**Se as ações são mais arriscadas, por que os consultores colocam aposentados em ações?**
Porque a aposentadoria dura décadas e a inflação também é um risco. Uma fatia de ações de pequena a moderada combate o risco de não atingir a meta enquanto a renda fixa cuida dos anos próximos.

**A volatilidade é a medida certa de risco?**
É a aproximação mensurável, não a verdade. Para um investidor de longo prazo, os riscos reais são a perda permanente e não chegar à meta — a volatilidade só importa quando força ou assusta você a ponto de vender.

**Posso ter retornos altos com risco baixo?**
Quem oferece essa combinação está enganado ou vendendo alguma coisa. Oportunidades reais de baixo risco e alto retorno são arbitradas em minutos — não chegam aos folhetos de varejo.${NOTE}`,
  },
  {
    topicKey: 'credit-card-interest',
    title: 'Como os juros do cartão de crédito funcionam de verdade (e por que viram bola de neve)',
    question: 'Como funcionam os juros do cartão de crédito e por que a dívida cresce tão rápido?',
    summary:
      'Cartões de crédito cobram alguns dos juros mais altos das finanças tradicionais — muitas vezes na casa dos dois dígitos ao mês, compondo diariamente assim que você fica no rotativo. O pagamento mínimo é desenhado para esticar a dívida por anos; entender a mecânica é a rota de fuga.',
    tags: ['finanças', 'cartão de crédito', 'dívida', 'juros'],
    language: 'pt',
    image: {
      prompt: promptOf('credit-card-interest'),
      alt: 'Uma espiral de degraus de dívida subindo de um cartão enquanto uma bola de neve cresce',
    },
    sources: [
      { title: 'Consumer Financial Protection Bureau — recursos sobre cartão de crédito', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# Como os juros do cartão de crédito funcionam de verdade (e por que viram bola de neve)

Um cartão de crédito são dois produtos no mesmo envelope: uma ferramenta de pagamento maravilhosa se você zera a fatura todo mês, e um dos empréstimos mais caros das finanças tradicionais se você não zera — comumente juros de dois dígitos ao mês no rotativo, que se compõem. O efeito bola de neve não é metáfora; é a aritmética de juros altos aplicados diariamente a um saldo que o pagamento mínimo mal arranha.

## A mecânica, passo a passo

- **O prazo de carência.** Pague o *valor total da fatura* até o vencimento e as compras não custam nada em juros. Esse é o único modo em que o cartão é gestão de dinheiro gratuita.
- **Perder a carência.** Carregue qualquer saldo além do vencimento e os juros normalmente passam a incidir sobre as compras dali em diante — a carência some até você zerar o saldo de novo por completo.
- **Capitalização diária.** A maioria dos cartões cobra juros diariamente: 20% ao mês equivalem a cerca de 0,61% ao dia aplicados sobre o seu saldo médio diário. Os juros incidem sobre juros já acumulados — composição trabalhando contra você a uma taxa com que as ações só sonham.
- **A armadilha do pagamento mínimo.** Os mínimos costumam ser cerca de 15% do saldo. Num saldo de R$ 5.000 a 14% ao mês, os juros do primeiro ano sozinhos passam de R$ 5.000 — pagar só o mínimo mal supera os juros, esticando a quitação por anos e multiplicando o custo real do que quer que você tenha comprado.

## Por que essa dívida supera quase tudo

Quitar um saldo a 14% ao mês é, sem risco, um "retorno" enorme — melhor do que qualquer investimento legítimo vai oferecer de forma confiável. A hierarquia prática é direta:

| Dinheiro disponível | Melhor uso, em geral |
| --- | --- |
| Carregando dívida de cartão no rotativo | Ataque-a antes de investir |
| Escolhendo qual cartão pagar primeiro | O de maior juro primeiro ("avalanche") — matematicamente ótimo |
| A motivação é o gargalo | O menor saldo primeiro ("bola de neve") — psicologicamente sustentável |

Qualquer ordenação vence o "pagar só o mínimo em tudo" por anos e por milhares de reais.

## Saindo, na prática

Pare de adicionar (troque o gasto diário para o débito enquanto ataca o saldo); pague um valor *fixo* e agressivo em vez do mínimo que encolhe; considere parcelar a fatura ou migrar para uma linha mais barata, mas converta sempre para a taxa ao ano antes de decidir — "0,6% por parcela" soa gentil, mas o equivalente ao ano costuma passar de 13%; e trate a consolidação por empréstimo pessoal como redução de juro, não como absolvição — o padrão de gasto que construiu o saldo precisa acabar, ou ele se reconstrói.

## Perguntas frequentes

**Pagar o mínimo protege o meu score de crédito?**
Evita marcas de atraso, sim — mas a alta utilização (saldo ÷ limite) ainda derruba o score. Em termos de score e de custo, a resposta é a mesma: reduza o saldo.

**Vale manter um saldinho "para o meu score"?**
Um mito persistente. Pagar tudo constrói o mesmo histórico de pagamento e custa zero de juros; carregar saldo só enriquece o emissor.

**O saque em dinheiro tem a mesma taxa?**
Em geral pior: juro mais alto, uma taxa adiantada e **nenhuma carência** — os juros começam no momento em que o dinheiro sai da máquina. É o botão mais caro do cartão.${NOTE}`,
  },
  {
    topicKey: 'retirement-start-early',
    title: 'Por que começar a poupar para a aposentadoria cedo vence poupar mais depois',
    question: 'Com que antecedência devo começar a poupar para a aposentadoria, e quanta diferença faz a idade de início?',
    summary:
      'Graças aos juros compostos, cada década de atraso aproximadamente dobra a poupança mensal necessária para o mesmo montante de aposentadoria. Começar aos 25 em vez dos 35 — mesmo valor mensal — pode terminar com cerca do dobro do dinheiro.',
    tags: ['finanças', 'aposentadoria', 'poupança', 'juros compostos'],
    language: 'pt',
    image: {
      prompt: promptOf('retirement-start-early'),
      alt: 'Um fio de luz que começa cedo virando um rio ao lado de um riacho estreito que começa tarde',
    },
    sources: [
      { title: 'Investor.gov (SEC dos EUA) — Calculadora de juros compostos', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Wiki Bogleheads — pontos de partida do planejamento de aposentadoria', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Por que começar a poupar para a aposentadoria cedo vence poupar mais depois

A poupança para aposentadoria tem uma variável esmagadora, e ela não é a renda, a escolha do fundo nem mesmo a taxa de poupança — é **quantos anos o dinheiro compõe**. Cada década de atraso aproximadamente dobra o quanto você precisa poupar por mês para chegar ao mesmo lugar. Os primeiros anos parecem inúteis (os saldos são pequenos, o crescimento invisível) e são matematicamente os anos mais valiosos que você terá.

## A linha do tempo gêmea

Os mesmos R$ 500/mês, o mesmo retorno médio anual de 7%, aposentando-se aos 65:

| Idade de início | Anos investidos | Total aportado | Montante final (aprox.) |
| --- | --- | --- | --- |
| 25 | 40 | 240.000 | ~1.310.000 |
| 35 | 30 | 180.000 | ~610.000 |
| 45 | 20 | 120.000 | ~260.000 |

Quem começa aos 25 aporta apenas R$ 60.000 a mais do que quem começa aos 35 e termina com cerca de **R$ 700.000 a mais**. Invertendo: para igualar o montante de quem começou cedo, quem tem 35 precisa poupar cerca de R$ 1.100/mês, e quem tem 45, cerca de R$ 2.500 — o custo do atraso, faturado mensalmente.

## Por que o dinheiro inicial é especial

Um aporte feito aos 25 compõe por 40 anos — a 7%, ele se multiplica ~15×. O mesmo aporte aos 55 se multiplica ~2×. A sua última década antes da aposentadoria normalmente *rende* mais do que você *aporta* nela, mas só se as décadas anteriores construíram a base sobre a qual ela cresce. Os juros compostos são uma bola de neve: o primeiro empurrão é o que mais importa.

## Começar de forma imperfeita vence começar mais tarde

A ordem de operações que serve à maioria das pessoas:

1. **Capture por inteiro qualquer contrapartida do empregador** — é um retorno instantâneo de 50% a 100%; nenhum investimento compete.
2. **Automatize um percentual, não um valor** — mesmo 5% a 10% da renda aos 25 supera 20% aos 40. Suba um ponto a cada aumento.
3. **Vá por padrão para fundos de índice amplos e de baixo custo** dentro de qualquer conta com benefício fiscal que o seu país ofereça — décadas de horizonte são exatamente para o que servem as alocações pesadas em ações.
4. **Não espere pela "hora certa"** — para um horizonte de 40 anos, todo ponto de partida histórico, inclusive a véspera dos crashes, venceu esperar anos por clareza.

## Se você está começando tarde

A matemática é mais dura, não desesperadora: a taxa de poupança vira a alavanca (a composição tem menos pista, então os aportes carregam mais do peso), trabalhar mesmo 2 a 3 anos a mais ajuda em dobro (mais aportes, menos anos de retirada), e a pior reação é apelar para investimentos de chance de loteria para "recuperar o atraso" — o risco de sequência pune exatamente isso.

## Perguntas frequentes

**Devo poupar para a aposentadoria enquanto quito dívidas?**
Capture a contrapartida do empregador mesmo assim (ela rende mais do que qualquer taxa de juro normal); além da contrapartida, dívida de juro alto em geral merece prioridade, dívida de juro baixo em geral não.

**7% é uma premissa segura?**
É uma média histórica de longo prazo de índices de ações, não uma garantia — planos sérios deveriam testar também 4% a 6%. Note que a conclusão não muda: toda taxa assumida recompensa quem começa cedo.

**Quanto vou precisar no total?**
Uma âncora grosseira de planejamento: gasto anual × 25 (a "regra dos 4%" invertida) — refinada depois pelo cenário previdenciário do seu país. O número importa menos aos 25 do que o hábito; a precisão pode esperar, os juros compostos não.${NOTE}`,
  },
];
