import type { DraftArticle } from './types';
import { cookingScienceEn } from './cooking-science.en';

// Batch: Cooking Science (versão nativa em português). Mesmos topicKeys e temas
// que cooking-science.en.ts; conteúdo redigido de forma nativa para o leitor
// lusófono. As imagens são partilhadas por topicKey.

const promptOf = (key: string): string => {
  const hit = cookingScienceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const cookingSciencePt: DraftArticle[] = [
  {
    topicKey: 'maillard-reaction',
    title: 'Porque é que dourar deixa a comida tão saborosa: a reação de Maillard',
    question: 'Porque é que a comida selada, assada ou tostada sabe muito melhor do que a cozida?',
    summary:
      'A reação de Maillard é a química do dourar: o calor faz reagir aminoácidos e açúcares, criando centenas de novos compostos de sabor e aroma. É por isso que um bife selado, o pão de côdea e o café torrado sabem profundos e saborosos, em vez de insípidos.',
    tags: ['culinária', 'ciência dos alimentos', 'química', 'sabor'],
    language: 'pt',
    image: { prompt: promptOf('maillard-reaction'), alt: 'Comida pálida a dourar numa côdea dourada com faíscas de aroma a subir' },
    sources: [
      { title: 'Harold McGee — On Food and Cooking (a reação de Maillard)', url: 'https://www.curiouscook.com/' },
      { title: 'Royal Society of Chemistry — A reação de Maillard', url: 'https://edu.rsc.org/' },
    ],
    content: `# Porque é que dourar deixa a comida tão saborosa: a reação de Maillard

Coza um pedaço de frango e ele sabe a pouco; sele-o até ficar dourado e fica rico, profundo e saboroso. Essa diferença tem um nome: a **reação de Maillard**, a peça de química mais importante de uma cozinha. É o que transforma massa pálida em pão de côdea, grãos crus em café torrado e um bife acinzentado num pedaço castanho, com crosta, de fazer crescer água na boca. Compreendê-la explica uma enorme fração do que torna a comida cozinhada deliciosa — e como obter mais disso.

## O que está realmente a acontecer

A reação de Maillard é uma dança química entre duas coisas presentes na maioria dos alimentos: **aminoácidos** (os blocos de construção das proteínas) e certos **açúcares**. Quando se aplica calor suficiente, eles reagem e reorganizam-se em **centenas de compostos completamente novos** que não existiam no alimento cru — compostos responsáveis por sabores e aromas assados, tostados, de carne, de noz e saborosos. Não é apenas que a comida fica mais escura; é que uma explosão de novas moléculas de sabor está a ser criada do zero. A cor castanha e o sabor profundo chegam juntos porque são a *mesma* química.

Batizada com o nome do químico francês que a descreveu no início dos anos 1900, a reação acontece sempre que a comida doura com o calor sem queimar: selar, assar, grelhar, cozer no forno, tostar, fritar.

## Como obter mais dela

Como é uma reação química, pode incentivá-la. Os dois inimigos do dourar são a **temperatura baixa** e a **água**, e as alavancas seguem-se diretamente:

| Alavanca | Porque ajuda |
| --- | --- |
| **Calor alto** | A reação precisa de mais ou menos 140 °C para arrancar a sério |
| **Uma superfície seca** | A água limita a comida a 100 °C (fervura) — tem de evaporar antes de o dourar começar |
| **Não atulhe a frigideira** | Atulhar aprisiona o vapor, mantendo a superfície húmida e fria |
| **Seque a comida primeiro** | Menos humidade à superfície para evaporar = dourar mais rápido |

Esta é a ciência por trás dos conselhos comuns de cozinha: seque o bife, ponha a frigideira bem quente e não a encha de comida. Não está a ser exigente — está a remover as duas coisas (humidade e calor baixo) que bloqueiam a reação de Maillard.

## Maillard vs caramelização

As pessoas costumam juntar as duas, mas são diferentes. A **caramelização** é o açúcar a dourar *sozinho* (pense no caramelo, ou nas pontas das cebolas assadas). A **reação de Maillard** precisa de açúcares *e* aminoácidos (proteínas), e é por isso que domina na carne, no pão e noutros alimentos com proteína. Ambas criam dourar e sabor rico através do calor; apenas partem de ingredientes diferentes e muitas vezes acontecem lado a lado.

## Perguntas frequentes

**Comida dourada faz mal?**
Comida muito dourada ou queimada pode formar alguns compostos menos desejáveis, por isso vale a pena moderar as partes enegrecidas/queimadas — mas o cozinhar de Maillard normal, dourado, é uma pedra angular de como os humanos tornam a comida deliciosa há milénios. Dourar não é queimar.

**Porque é que um pouco de bicarbonato acelera o dourar?**
A reação de Maillard é mais rápida em condições menos ácidas (mais alcalinas), por isso uma pitada de bicarbonato pode acelerar o dourar — um truque usado para cebolas bem douradas ou pretzels. Use com parcimónia; demasiado afeta o sabor.

**Porque é que a comida cozida ou ao vapor não doura?**
Porque a água mantém a superfície a 100 °C, abaixo da temperatura de que a reação de Maillard precisa. Por mais que coza, não consegue dourar — que é exatamente por que a comida cozida sabe mais suave do que a assada.`,
  },
  {
    topicKey: 'salt-in-cooking',
    title: 'Porque é que o sal importa mais do que qualquer outro tempero',
    question: 'Porque é que o sal é tão importante na cozinha e como é que torna a comida mais saborosa?',
    summary:
      'O sal não se limita a salgar a comida — suprime o amargo, amplifica os aromas e faz com que os outros sabores saibam mais a si próprios. Usado ao longo do cozinhado, e não só à mesa, transforma a comida, e é por isso que pôr pouco sal é o erro mais comum.',
    tags: ['culinária', 'ciência dos alimentos', 'sal', 'sabor'],
    language: 'pt',
    image: { prompt: promptOf('salt-in-cooking'), alt: 'Cristais de sal a dissolver-se na comida, avivando as cores e afastando uma névoa baça' },
    sources: [
      { title: 'Samin Nosrat — Salt, Fat, Acid, Heat', url: 'https://www.saltfatacidheat.com/' },
      { title: 'Harold McGee — On Food and Cooking (o sal e o paladar)', url: 'https://www.curiouscook.com/' },
    ],
    content: `# Porque é que o sal importa mais do que qualquer outro tempero

Se um prato sabe a pouco, é monótono ou parece "estar a faltar qualquer coisa", a resposta é quase sempre sal — e não um ingrediente mais sofisticado. O sal é a ferramenta mais poderosa da cozinha, e aprender a usá-lo bem faz mais pela sua comida do que qualquer receita ou técnica. Mas o seu trabalho é muito mais interessante do que "salgar as coisas". O sal é um *amplificador* de sabor, e compreender como funciona muda a forma como cozinha.

## O que o sal faz realmente ao sabor

O sal afeta o paladar de várias maneiras ao mesmo tempo, e a maioria nada tem a ver com saber a salgado:

- **Suprime o amargo.** O sal atenua seletivamente as notas amargas, e é por isso que uma pitada faz o café, o chocolate negro ou os vegetais amargos saberem mais suaves e redondos.
- **Amplifica os outros sabores.** Ao baixar o amargo e realçar a nossa perceção dos outros sabores (incluindo o umami saboroso e o doce), o sal faz o tomate saber mais a tomate e a carne saber mais a carne. Aumenta o volume do carácter próprio da comida.
- **Realça o aroma.** Boa parte do "sabor" é, na verdade, cheiro, e o sal ajuda a libertar moléculas aromáticas, fazendo a comida cheirar — e, portanto, saber — mais rica.

É por isso que um prato bem temperado de sal não sabe a *salgado* — sabe a *vívido*. Pelo contrário, pôr pouco sal deixa todo esse sabor abafado, que é a razão mais comum para a comida caseira saber mais sem graça do que a de restaurante.

## Quando se salga importa tanto como quanto

A maior melhoria que a maioria dos cozinheiros caseiros pode fazer é **salgar ao longo do cozinhado, e não só no fim.** O sal adicionado cedo tem tempo de penetrar e temperar a comida por dentro e de fazer a sua química; o sal salpicado apenas à mesa fica à superfície e sabe só a sal. Tempere em camadas — a água da massa, as cebolas enquanto cozinham, o molho enquanto apura — provando à medida que avança. Um prato temperado por etapas sabe temperado de fora a fora; um prato salgado só no fim sabe insípido com uma superfície salgada.

Há até um efeito físico: o sal retira humidade da carne e dos legumes e depois fá-la voltar (salgar cedo, como na salga seca, tempera mais fundo e pode melhorar a textura), e fortalece o glúten na massa de pão.

## Como salgar com confiança

O medo de "sal a mais" leva a maioria das pessoas a usar de menos. O método fiável é **provar e ajustar**: ponha um pouco, prove, ponha mais se ainda estiver sem graça, até a comida saber a uma versão mais vívida de si própria — parando mesmo antes de saber a salgado. Com a prática, aprende-se o limiar. Note que os tipos de sal diferem em salinidade por volume (uma colher de chá de sal fino de mesa é muito mais salgada do que uma colher de chá de sal em flocos), por isso confie na sua língua mais do que na colher de medida.

## Perguntas frequentes

**O sal não é prejudicial?**
O excesso de sódio é uma verdadeira preocupação de saúde, sobretudo a partir de alimentos processados, que são a fonte dominante para a maioria das pessoas. Salgar a gosto a sua própria comida fresca é uma pequena fração disso, e cozinhar de raiz em casa é, em geral, muito mais baixo em sódio do que as refeições embaladas. A moderação e cozinhar fresco importam mais do que recear o saleiro.

**Qual é a diferença entre os tipos de sal?**
Quimicamente são quase todos cloreto de sódio; as diferenças estão no tamanho do cristal e nos minerais vestigiais. O impacto prático é que se medem de forma diferente por volume e dissolvem-se a ritmos diferentes — e é por isso que receitas e cozinheiros muitas vezes especificam um tipo. As diferenças de sabor são subtis.

**Posso salvar um prato salgado demais?**
Às vezes — diluir com mais líquido ou ingredientes sem sal, ou juntar acidez (umas gotas de limão) ou doçura para reequilibrar, pode ajudar. Mas prevenir, provando à medida que avança, é muito mais fácil do que o resgate.`,
  },
  {
    topicKey: 'resting-meat',
    title: 'Porque deve deixar a carne repousar depois de cozinhada',
    question: 'Porque é que deixar a carne repousar depois de cozinhada a torna mais suculenta?',
    summary:
      'Deixar a carne repousar permite que a temperatura uniformize e as fibras musculares relaxem, reabsorvendo os sucos em vez de os derramar. Corte um bife logo do lume e o suco escorre; deixe-o repousar uns minutos e o mesmo bife fica muito mais suculento.',
    tags: ['culinária', 'ciência dos alimentos', 'carne', 'técnica'],
    language: 'pt',
    image: { prompt: promptOf('resting-meat'), alt: 'Um bife repousado a reter sucos luminosos de forma uniforme versus um tenso a espremê-los' },
    sources: [
      { title: 'Serious Eats / J. Kenji López-Alt — The Food Lab', url: 'https://www.seriouseats.com/the-food-lab' },
      { title: 'Harold McGee — On Food and Cooking (a carne e o calor)', url: 'https://www.curiouscook.com/' },
    ],
    content: `# Porque deve deixar a carne repousar depois de cozinhada

É um dos conselhos de cozinha mais repetidos — "deixe a carne repousar antes de a cortar" — e um dos mais ignorados, porque esperar quando o jantar está pronto é difícil. Mas repousar funciona mesmo, e a razão é física simples a acontecer dentro da carne. Corte um bife ou um assado no instante em que sai do lume e vai ver o precioso suco inundar a tábua. Dê-lhe primeiro uns minutos e esse mesmo suco fica, na sua maioria, *dentro* da carne, onde o quer.

## O que acontece por dentro

Duas coisas acontecem enquanto a carne repousa:

- **A temperatura uniformiza-se.** Quando se cozinha carne, a parte de fora fica muito mais quente do que o centro. Esse calor continua a deslocar-se para dentro depois de parar de cozinhar (o chamado "cozinhado residual"), por isso repousar deixa a temperatura equalizar — as camadas exteriores quentes arrefecem, o centro aquece ligeiramente, e a peça inteira assenta num ponto mais uniforme.
- **As fibras musculares relaxam e reabsorvem o suco.** O calor faz as fibras musculares contrair e espremer, empurrando a sua humidade para o centro sob pressão. Corte logo e esse suco pressurizado escapa-se. Deixe a carne repousar e as fibras relaxam, a pressão alivia, e grande parte do suco é reabsorvido e redistribuído — por isso fica na fatia, e não na tábua.

Pense nas fibras musculares como esponjas que foram apertadas com força pelo calor. Repousar deixa-as afrouxar e voltar a embeber o suco antes de cortar.

## Como repousar bem a carne

- **Ajuste o tempo à peça.** Um bife fino precisa de apenas uns 5 minutos; um assado grande beneficia de 15 a 30. Maior e mais quente significa mais tempo.
- **Cubra de forma solta.** Uma tenda solta de papel de alumínio mantém o calor sem aprisionar o vapor (que amoleceria qualquer crosta estaladiça).
- **Não repouse de mais.** Repousar demasiado deixa a carne fria; o objetivo é "assentada", não "morna".
- **Aproveite os sucos.** Tudo o que escapa para a tábua é puro sabor — deite-o de volta sobre a carne fatiada ou no molho.

## Uma nuance útil

Repousar importa mais para peças grossas e assados cozinhados com calor alto e rápido, onde o gradiente de temperatura e a tensão das fibras são maiores. Importa menos para peças finas ou estufadas em lume brando. E repousar não é só uma questão de suculência — esse cozinhado residual significa que deve tirar a carne do lume uns graus *antes* da temperatura-alvo, deixando-a deslizar até ao ponto perfeito durante o repouso. Planeie-o em vez de lutar contra ele.

## Perguntas frequentes

**A carne não fica fria enquanto repousa?**
Mal se nota, no tempo certo — um bife perde pouco calor em 5 minutos, e um assado grande mantém o calor muito mais tempo do que se julga. Cobri-lo de forma solta e não repousar de mais mantém-no quente que chegue; o ganho em suculência compensa bem a pequena descida de temperatura.

**Repousar funciona para toda a carne?**
Ajuda mais em bifes, costeletas e assados cozinhados a calor alto. Peças estufadas em lume brando ou muito finas beneficiam menos. As aves e os grandes assados, em especial, recompensam um repouso a sério.

**É verdade que os sucos ficam "selados" ao selar primeiro?**
Isso é um mito — selar cria sabor (a reação de Maillard), mas não sela os sucos. É o repouso, e não o selar, que mantém a carne suculenta.`,
  },
  {
    topicKey: 'onions-make-you-cry',
    title: 'Porque é que as cebolas nos fazem chorar (e como evitá-lo)',
    question: 'Porque é que as cebolas nos fazem chorar e como posso cortá-las sem lágrimas?',
    summary:
      'Cortar uma cebola rompe as suas células, libertando enzimas que formam um gás de enxofre volátil. O gás sobe, reage com a água dos olhos formando um ácido suave, e os olhos expulsam-no com lágrimas. Frio, facas afiadas e ventilação reduzem tudo isto.',
    tags: ['culinária', 'ciência dos alimentos', 'química', 'cozinha'],
    language: 'pt',
    image: { prompt: promptOf('onions-make-you-cry'), alt: 'Uma cebola cortada a libertar um penacho de gás que é desviado por corrente de ar fresca' },
    sources: [
      { title: 'Royal Society of Chemistry — Porque é que as cebolas nos fazem chorar', url: 'https://edu.rsc.org/' },
      { title: 'Harold McGee — On Food and Cooking (cebolas e enxofre)', url: 'https://www.curiouscook.com/' },
    ],
    content: `# Porque é que as cebolas nos fazem chorar (e como evitá-lo)

As cebolas são o único ingrediente que faz os cozinheiros chorar com regularidade, e não é emocional — é uma pequena experiência de química a acontecer na sua tábua. A cebola não está a tentar temperar a comida quando lhe pica os olhos; está a defender-se. Compreender a armadilha química surpreendentemente engenhosa dentro de uma cebola não só satisfaz a curiosidade, como aponta diretamente para a forma de a picar sem chorar.

## A defesa química da cebola

Uma cebola intacta é inofensiva — a química irritante só dispara quando a danifica. Eis a reação em cadeia:

1. As células da cebola guardam, separadamente, certos **compostos de enxofre** e **enzimas**.
2. Quando corta, rompe as células, e esses dois juntam-se e reagem.
3. A reação produz um **gás** pequeno e volátil (um composto de enxofre a que os químicos chamam fator lacrimogéneo, ou seja, que provoca lágrimas).
4. Esse gás sobe pelo ar e chega aos seus olhos.
5. Reage com a fina camada de água dos olhos para formar um **ácido sulfúrico** suave — um pequeno irritante.
6. Os olhos detetam a irritação e expulsam-na da única forma que sabem: **lágrimas.**

É uma defesa elegante, evoluída para dissuadir os animais de comerem o bolbo da cebola. A "arma" só se monta quando a cebola é cortada — que é exatamente por que uma cebola inteira na taça nunca o incomoda.

## Como cortar cebolas sem chorar

Cada truque eficaz funciona atacando um dos passos acima — abrandando a reação, ou impedindo o gás de chegar aos olhos:

| Truque | Como funciona |
| --- | --- |
| **Refrigere a cebola primeiro** | O frio abranda a reação enzimática, formando-se menos gás |
| **Use uma faca afiada** | Cortes limpos rompem menos células do que esmagar com uma lâmina romba |
| **Corte junto a corrente de ar** | Uma ventoinha, janela aberta ou exaustor afastam o gás da cara |
| **Não corte a base da raiz** | A base da raiz concentra a maior parte das enzimas |
| **Molhe a cebola / a faca** | A água junto ao corte absorve algum gás antes de subir |

Uma faca afiada, mais uma cebola refrigerada, mais um pouco de ventilação resolvem o problema para a maioria. Os óculos de proteção também funcionam, se cortar muita — selar os olhos simplesmente impede o gás de lhes chegar.

## Perguntas frequentes

**Porque é que algumas cebolas fazem chorar mais do que outras?**
O teor de enxofre varia consoante o tipo de cebola e as condições de cultivo. As cebolas de armazenamento, picantes, costumam ser as piores; as variedades mais doces ou suaves produzem menos irritante. A frescura e o modo de armazenamento também contam.

**Cortar debaixo de água funciona mesmo?**
Pode — a água absorve o gás volátil antes de chegar aos olhos —, mas cortar submerso é desajeitado e pouco prático. Cortar junto a água corrente ou a uma superfície húmida é uma versão mais suave da mesma ideia.

**Porque é que cozinhar uma cebola não faz chorar?**
O calor destrói as enzimas e dissipa o gás volátil, por isso as cebolas cozinhadas não picam — e sabem mais doces, porque o calor também transforma os seus compostos de enxofre agressivos em outros mais suaves e doces.`,
  },
  {
    topicKey: 'baking-is-chemistry',
    title: 'Porque é que a pastelaria é química (e cozinhar perdoa mais)',
    question: 'Porque é que tenho de medir com precisão na pastelaria, mas posso improvisar a cozinhar?',
    summary:
      'A pastelaria assenta em reações químicas com proporções fixas — fermento, glúten e amido a comportar-se de forma previsível — por isso medir com precisão importa. Cozinhar no fogão deixa-o provar e ajustar, tolerando a improvisação. Saber qual está a fazer muda o rigor com que segue a receita.',
    tags: ['culinária', 'pastelaria', 'ciência dos alimentos', 'química'],
    language: 'pt',
    image: { prompt: promptOf('baking-is-chemistry'), alt: 'Uma balança de precisão para pastelaria ao lado de uma panela ajustada livremente para cozinhar' },
    sources: [
      { title: 'Harold McGee — On Food and Cooking (a química da pastelaria)', url: 'https://www.curiouscook.com/' },
      { title: "America's Test Kitchen — A ciência da pastelaria", url: 'https://www.americastestkitchen.com/' },
    ],
    content: `# Porque é que a pastelaria é química (e cozinhar perdoa mais)

Há uma razão para que cozinheiros confiantes que improvisam o jantar todas as noites de repente sigam as receitas de bolo ao grama. **Cozinhar e fazer pastelaria são atividades fundamentalmente diferentes**, ainda que ambas aconteçam na cozinha. Cozinhar — um salteado, uma sopa, um molho — é um processo flexível, de provar à medida que se avança. A pastelaria está mais próxima de conduzir uma reação química: os ingredientes interagem em proporções fixas *antes* de poder provar o resultado, e errar as proporções dá-lhe um bolo achatado ou um tijolo de pão. Saber em que modo está diz-lhe quão estritamente seguir a receita.

## Porque é que a pastelaria exige precisão

Na pastelaria, os ingredientes não são apenas sabores — são **reagentes** numa química que tem de equilibrar:

- **Os fermentos** (bicarbonato, fermento em pó, levedura) produzem bolhas de gás que fazem os bolos crescer. Pouco e fica denso; demasiado e cresce e depois colapsa. A quantidade está ligada aos outros ingredientes.
- **O glúten**, a rede proteica da farinha com água, dá estrutura. Quanta farinha, quanto líquido e quanto se mistura, tudo altera a textura.
- **As proporções de farinha, líquido, gordura, açúcar e ovos** determinam se obtém um bolo, uma bolacha, um queque ou uma bolacha de água e sal — os *mesmos* ingredientes em proporções diferentes fazem coisas completamente diferentes.
- **Tudo solidifica no forno**, de forma irreversível. Depois de cozido, não pode provar e corrigir — a química já aconteceu.

Este último ponto é o cerne. Um cozinheiro pode provar um molho e juntar sal; um pasteleiro não pode provar a textura *acabada* da massa de um bolo e corrigi-la depois de cozido. As decisões ficam fechadas à partida, por isso as medições têm de estar certas à partida.

## Porque é que cozinhar no fogão perdoa

Cozinhar no fogão é iterativo e reversível de uma forma que a pastelaria não é. Pode provar em cada etapa e ajustar — mais sal, mais acidez, mais líquido, apurar mais tempo. Um punhado a mais de legumes não estraga um guisado. Raramente há um equilíbrio químico delicado que uma pequena alteração derrube, por isso estimar, substituir e improvisar costumam resultar bem. É por isso que as receitas de sopas e salteados podem dizer "tempere a gosto", enquanto as de bolo especificam exatamente 1,5 colheres de chá de fermento em pó.

| | Pastelaria | Cozinhar no fogão |
| --- | --- | --- |
| Precisão necessária | Alta — proporções fixas | Menor — ajusta-se a gosto |
| Pode provar a meio? | Não (solidifica no forno) | Sim, constantemente |
| Tolera substituições? | Muitas vezes mal | Geralmente bem |
| Mentalidade | Química / seguir a receita | Ofício / usar o critério |

## A conclusão prática

Adeque a sua abordagem à tarefa. **Faça pastelaria como um químico:** meça com cuidado (por peso sempre que possível — é mais rigoroso do que as chávenas), não troque ingredientes de ânimo leve e siga o método. **Cozinhe como um artista:** prove constantemente, ajuste livremente e trate as receitas como guias flexíveis. Muitas frustrações de cozinha vêm de improvisar um bolo (desastre) ou medir rigidamente uma sopa (desnecessariamente fastidioso). Saber que jogo está a jogar já é metade da arte.

## Perguntas frequentes

**Alguma vez posso improvisar na pastelaria?**
Dentro de limites — pode ajustar sabores (especiarias, extratos, adições como pepitas de chocolate) com bastante liberdade, mas as proporções estruturais (farinha, líquido, fermento, gordura) são onde a precisão importa. Só as altere se perceber o que fazem.

**Porquê pesar os ingredientes em vez de usar chávenas?**
Uma "chávena" de farinha pode variar muito consoante a forma como é colhida e compactada, o que desequilibra as proporções. O peso é consistente, e é por isso que as receitas de pastelaria sérias dão gramas — elimina uma grande fonte de falha.

**Fazer pão é o mais rigoroso de todos?**
O pão é preciso, mas também responsivo — a massa dá retorno através da forma como se sente e cresce, por isso os pasteleiros experientes ajustam pelo tato. Combina química (proporções, fermentação) com ofício (ler a massa), o que é parte da razão por que é tão gratificante de aprender.`,
  },
  {
    topicKey: 'emulsions',
    title: 'Como funcionam as emulsões: a ciência da maionese, do vinagrete e dos molhos cremosos',
    question: 'Como é que o óleo e a água se combinam em molhos lisos como a maionese, quando normalmente se separam?',
    summary:
      'O óleo e a água detestam misturar-se, mas uma emulsão obriga gotículas de um a manter-se suspensas no outro, mantidas afastadas por um emulsionante como gema de ovo ou mostarda. É a ciência por trás da maionese, do vinagrete, do holandês e de muitos molhos cremosos — e de porque às vezes "talham".',
    tags: ['culinária', 'ciência dos alimentos', 'molhos', 'química'],
    language: 'pt',
    image: { prompt: promptOf('emulsions'), alt: 'Óleo e água separados a tornar-se uma suspensão cremosa de gotículas envoltas em emulsionante' },
    sources: [
      { title: 'Harold McGee — On Food and Cooking (emulsões)', url: 'https://www.curiouscook.com/' },
      { title: 'Serious Eats — A ciência das emulsões', url: 'https://www.seriouseats.com/' },
    ],
    content: `# Como funcionam as emulsões: a ciência da maionese, do vinagrete e dos molhos cremosos

A maionese é sobretudo óleo e um pouco de líquido aquoso — duas coisas que notoriamente se recusam a misturar —, e mesmo assim é lisa, espessa e cremosa, não uma poça oleosa. A magia que torna isto possível chama-se **emulsão**, e está por trás de uma enorme variedade de alimentos: vinagrete, holandês, aioli, molhos cremosos, e até alguns molhos lisos. Quando compreender as emulsões, vai conseguir fazer estes molhos de forma fiável e resgatá-los quando falham.

## Porque é que o óleo e a água não se misturam

As moléculas de óleo e de água são fundamentalmente incompatíveis — as moléculas de água agarram-se umas às outras e excluem o óleo, por isso os dois separam-se em camadas (o óleo a flutuar no topo). Agite-os juntos e obtém uma mistura turva e breve que rapidamente se volta a separar. Para fazer um molho cremoso *estável*, precisa de fazer duas coisas: partir um líquido em gotículas minúsculas dispersas no outro **e** impedir essas gotículas de se reencontrarem e voltarem a fundir-se numa camada.

## Os dois ingredientes de uma emulsão

Toda a emulsão precisa de:

- **Força mecânica** para fragmentar um líquido em gotículas minúsculas suspensas no outro — bater, triturar ou agitar com vigor. Quanto mais pequenas as gotículas, mais liso e estável o resultado.
- **Um emulsionante** — uma molécula especial que tem uma ponta que gosta de água e uma ponta que gosta de óleo. Reveste cada gotícula, instalando-se na fronteira entre óleo e água, e impede as gotículas de se fundirem. É o ingrediente secreto. Na maionese e no holandês é a **gema de ovo** (rica no emulsionante lecitina); no vinagrete é muitas vezes a **mostarda**; o mel, a pasta de alho e outros também podem ajudar.

Por isso, a maionese são milhões de gotículas microscópicas de óleo, cada uma envolta em emulsionante de gema de ovo, suspensas num pouco de líquido aquoso — o que a nossa boca perceciona como liso e cremoso.

## Porque é que as emulsões "talham" — e como corrigir

Uma emulsão "talha" quando as gotículas escapam ao emulsionante e voltam a fundir-se em óleo e água separados (uma confusão talhada e gordurosa). As causas habituais: **juntar o óleo depressa demais** (sobrecarregando o emulsionante antes de ele conseguir revestir as gotículas), **emulsionante a menos** ou **choques de temperatura**. A prevenção clássica é juntar o óleo *devagar* ao início — um fio fino enquanto bate —, dando tempo ao emulsionante para envolver cada gotícula. Para resgatar um molho talhado, costuma-se recomeçar com um pouco de emulsionante novo (uma gema de ovo, ou uma colher do molho talhado com mostarda) e bater lentamente a mistura talhada de volta.

## Perguntas frequentes

**Porque é que o meu vinagrete se separa, mas a maionese não?**
Um vinagrete rápido é uma emulsão *temporária* — bater dispersa o óleo por instantes, mas com pouco emulsionante volta a separar-se (basta agitar antes de usar). A maionese tem muito emulsionante (gema de ovo) e gotículas minúsculas, o que faz dela uma emulsão *estável* e duradoura.

**Posso fazer maionese sem ovos?**
Sim — outros emulsionantes funcionam, como as proteínas de certos líquidos vegetais (a aquafaba, o líquido do grão-de-bico em conserva, é um emulsionante popular sem ovo), ou a mostarda e a lecitina de soja. O princípio é idêntico; só muda o emulsionante.

**Porque é que uma varinha mágica facilita as emulsões?**
Aplica força mecânica intensa e consistente, fragmentando o óleo em gotículas muito finas de forma rápida e uniforme — o que faz uma emulsão mais lisa e estável do que bater à mão e é mais tolerante a juntar o óleo um pouco depressa.`,
  },
  {
    topicKey: 'how-bread-rises',
    title: 'Como o pão cresce: levedura, glúten e gás aprisionado',
    question: 'Como é que a massa de pão cresce e se transforma num pão leve e arejado?',
    summary:
      'A levedura come os açúcares da massa e liberta dióxido de carbono; uma rede elástica de glúten aprisiona esse gás em bolhas, inflando a massa como inúmeros pequenos balões. O forno fixa a estrutura, deixando o miolo arejado de um pão acabado.',
    tags: ['culinária', 'pastelaria', 'pão', 'ciência dos alimentos'],
    language: 'pt',
    image: { prompt: promptOf('how-bread-rises'), alt: 'Levedura a libertar bolhas de gás presas numa rede elástica de glúten, inflando a massa' },
    sources: [
      { title: 'Harold McGee — On Food and Cooking (pão e fermentação)', url: 'https://www.curiouscook.com/' },
      { title: 'Royal Society of Chemistry — A química do pão', url: 'https://edu.rsc.org/' },
    ],
    content: `# Como o pão cresce: levedura, glúten e gás aprisionado

Um pedaço de pasta de farinha e água transforma-se num pão alto, leve e arejado — e a transformação quase parece mágica. Não é; é o trabalho de equipa de duas coisas: um **microrganismo vivo** que produz gás e uma **rede proteica elástica** que o aprisiona. O pão cresce porque inúmeras bolhas de gás minúsculas são insufladas dentro da massa e ali retidas. Compreender os dois protagonistas explica tudo, desde porque se amassa, até porque a massa precisa de tempo, até porque um pão acabado está cheio de buracos.

## Protagonista um: a levedura faz gás

A **levedura** é um fungo vivo, unicelular. Quando misturada na massa com calor e humidade, faz o que os seres vivos fazem — come. A levedura alimenta-se dos açúcares e amidos da farinha e, à medida que os digere através da **fermentação**, liberta **dióxido de carbono** (e pequenas quantidades de álcool e compostos de sabor, e é por isso que o pão cheira tão bem). Cada célula de levedura é uma minúscula fábrica de gás. Com tempo, milhares de milhões delas enchem a massa de dióxido de carbono.

Mas o gás sozinho limitar-se-ia a borbulhar e escapar. Algo tem de o *apanhar*.

## Protagonista dois: o glúten aprisiona o gás

Esse algo é o **glúten** — uma rede elástica de proteínas que se forma quando a farinha de trigo é misturada com água e trabalhada (amassada). O glúten é o que torna a massa elástica e capaz de manter a forma. À medida que a levedura produz dióxido de carbono, a rede de glúten aprisiona o gás em milhares de pequenos bolsos, inflando como uma teia de balões microscópicos. A massa expande, ficando mais leve e arejada — é o "crescimento". É por isso que **amassar** importa: desenvolve o glúten numa teia forte e elástica que consegue reter o gás em vez de o deixar fugir.

Portanto: a levedura insufla, o glúten contém. Ambos são necessários. Tire a levedura e não há gás; tire o glúten e o gás escapa.

## O forno torna-o permanente

O passo final acontece com o calor. No forno, o gás aprisionado expande ainda mais com o calor (um último surto rápido chamado "salto de forno") e depois o calor **fixa a estrutura** — o glúten firma e os amidos solidificam, travando a rede arejada de buracos no lugar de forma permanente. As bolhas, que eram macias e infláveis, tornam-se um miolo fixo e leve. A côdea doura através da reação de Maillard, e fica com pão.

## Perguntas frequentes

**O que faz o bicarbonato ou o fermento em pó de diferente da levedura?**
São fermentos químicos — produzem dióxido de carbono através de uma reação química rápida em vez da fermentação biológica lenta. É por isso que os "pães rápidos", os bolos e os queques (levedados com fermento em pó/bicarbonato) não precisam de tempo de crescimento, ao passo que os pães de levedura precisam de horas, mas desenvolvem um sabor mais complexo.

**Porque é que a massa precisa de crescer duas vezes em muitas receitas?**
O primeiro crescimento constrói sabor e gás; bater para baixo e deixar crescer de novo cria um miolo mais fino e uniforme e mais desenvolvimento de sabor. Nem todos os pães precisam de dois crescimentos, mas muitos beneficiam da fermentação extra.

**Porque é que o pão de massa-mãe é diferente?**
O pão de massa-mãe usa leveduras e bactérias selvagens de um "fermento natural" em vez de levedura comercial. O mesmo mecanismo de gás e glúten fá-lo crescer, mas as bactérias também produzem ácidos que dão à massa-mãe o seu sabor acidulado e afetam a textura e a conservação.`,
  },
  {
    topicKey: 'marinades',
    title: 'O que as marinadas fazem realmente (e o que não fazem)',
    question: 'As marinadas tornam mesmo a carne tenra e dão-lhe sabor lá no fundo?',
    summary:
      'As marinadas dão sabor sobretudo à superfície dos alimentos e podem afetar ligeiramente a textura — mas não penetram fundo nem amaciam de verdade a carne dura como se julga. Saber o que fazem (e não fazem) ajuda a usá-las bem e a evitar esforço desperdiçado.',
    tags: ['culinária', 'ciência dos alimentos', 'carne', 'técnica'],
    language: 'pt',
    image: { prompt: promptOf('marinades'), alt: 'Carne em marinada com o sabor concentrado numa fina camada superficial, esvanecendo para dentro' },
    sources: [
      { title: 'Serious Eats / J. Kenji López-Alt — a ciência das marinadas', url: 'https://www.seriouseats.com/' },
      { title: 'Harold McGee — On Food and Cooking (marinadas)', url: 'https://www.curiouscook.com/' },
    ],
    content: `# O que as marinadas fazem realmente (e o que não fazem)

As marinadas estão rodeadas de folclore de cozinha: deixe a carne de molho de um dia para o outro, o ácido vai "amaciá-la", os sabores vão ensopar até ao centro. A maior parte disso é exagerada. As marinadas são genuinamente úteis, mas por razões diferentes das que se pensa — e perceber o que realmente fazem poupa-lhe tempo desperdiçado e resultados moles e dececionantes. Vamos separar os efeitos reais dos mitos.

## O que as marinadas fazem realmente

- **Dão sabor à superfície.** É o seu trabalho principal e real. Os temperos, ervas, alho e aromáticos de uma marinada revestem e penetram ligeiramente a camada exterior do alimento, onde acrescentam sabor e ajudam a dourar. Essa superfície temperada é deliciosa — mas é sobretudo *superfície*.
- **O sal penetra mesmo (devagar).** Se uma marinada contém sal (ou molho de soja, etc.), o sal desloca-se mesmo para dentro da carne ao longo do tempo e tempera-a mais fundo, tal como uma salmoura. O sal é o único ingrediente que viaja para dentro de forma significativa.
- **Podem ajudar a dourar e a reter humidade.** Os açúcares de uma marinada ajudam a superfície a dourar (com cuidado — podem queimar), e as marinadas com óleo ajudam a conduzir o calor e a evitar que pegue.

## O que, na sua maioria, não fazem

É aqui que os mitos se desmoronam:

- **Não penetram fundo.** A maioria das moléculas das marinadas (ácidos, óleos, compostos de sabor) é demasiado grande para viajar muito para dentro da carne densa. Depois de horas a marinar, o interior fica em grande parte intocado — o sabor concentra-se nos primeiros milímetros exteriores. Marinar mais tempo, na sua maioria, só tempera mais a superfície, não o centro.
- **O ácido não amacia de verdade — e pode arruinar a textura.** As pessoas acreditam que o ácido (limão, vinagre, iogurte) "desfaz" a carne dura em algo tenro. Na realidade, o ácido só afeta a superfície, e *demasiado* ou por *demasiado tempo* deixa essa superfície **mole e seca**, e não tenra — desnatura as proteínas da superfície de forma desagradável. As marinadas ácidas prolongadas muitas vezes prejudicam mais do que ajudam.

| Crença | Realidade |
| --- | --- |
| "As marinadas dão sabor à peça toda" | Sobretudo à superfície; o sal penetra devagar |
| "Mais tempo é sempre melhor" | A partir de certo ponto, só se arrisca uma superfície mole |
| "O ácido amacia peças duras" | Só afeta a superfície e pode deixá-la mole |
| "As marinadas tornam tenra a carne barata" | A maciez vem da peça e do método de cozinhar |

## Como usar bem as marinadas

Use as marinadas para **sabor e para dourar, não para amaciar.** Mantenha as marinadas ácidas relativamente curtas (muitas vezes menos de algumas horas) para evitar que fique mole; aposte no **sal** se quiser um tempero mais fundo (esse, sim, viaja para dentro); e lembre-se de que a verdadeira maciez vem de escolher a peça certa e de a cozinhar corretamente (lume brando e demorado para peças duras, calor alto e rápido para as tenras), e não de uma demolha. Para alimentos finos ou porosos como pedaços de frango, tofu ou legumes, as marinadas funcionam relativamente melhor, porque há mais superfície e menos interior denso.

## Perguntas frequentes

**Quanto tempo devo marinar?**
Normalmente menos tempo do que se pensa — muitas vezes 30 minutos a algumas horas chegam para o sabor, e as marinadas ácidas sobretudo não devem ir longe demais. De um dia para o outro está bem para marinadas com sal e pouco ácidas, mas arrisca deixar moles as muito ácidas.

**Picar furos ou fazer golpes ajuda a marinada a entrar?**
Um pouco — cria mais área de superfície e canais — mas mesmo assim não tempera o centro em profundidade, e pode deixar os sucos escapar durante o cozinhado. Mais vale apostar no tempero da superfície e no sal.

**Então o que amacia realmente a carne dura?**
Tempo e calor: o cozinhado lento e húmido (estufar, guisar) dissolve o tecido conjuntivo duro (o colagénio) em gelatina, que é o que torna uma peça dura tenra ao ponto de se desfazer. Uma marinada não consegue fazer isso — só o método de cozinhar certo o consegue.`,
  },
  {
    topicKey: 'searing-juices-myth',
    title: 'Selar "prende os sucos"? (a derrubar um mito de cozinha)',
    question: 'Selar a carne primeiro prende mesmo os sucos e mantém-na suculenta?',
    summary:
      'Não — a ideia popular de que selar forma um vedante à prova de sucos é um mito, refutado por testes simples. Selar vale a pena, mas pelo sabor (a reação de Maillard), não pela humidade. O que mantém a carne suculenta é não a cozinhar de mais e deixá-la repousar.',
    tags: ['culinária', 'ciência dos alimentos', 'carne', 'mitos'],
    language: 'pt',
    image: { prompt: promptOf('searing-juices-myth'), alt: 'Um bife selado cuja crosta acrescenta faíscas de sabor mas não prende os sucos' },
    sources: [
      { title: 'Harold McGee — On Food and Cooking (o mito de selar)', url: 'https://www.curiouscook.com/' },
      { title: 'Serious Eats / J. Kenji López-Alt — selar e humidade', url: 'https://www.seriouseats.com/' },
    ],
    content: `# Selar "prende os sucos"? (a derrubar um mito de cozinha)

É uma das crenças mais repetidas na cozinha: sele a carne primeiro para formar uma crosta que "prende os sucos" e a mantém suculenta. Soa lógico, foi impresso em incontáveis livros de receitas, e está **errado** — um mito que dura há mais de um século e é refutado por experiências simples. Selar vale absolutamente a pena, mas não pela razão que a maioria pensa. Esclarecer este mito torna-o melhor cozinheiro, porque o aponta para aquilo que *de facto* mantém a carne suculenta.

## De onde veio o mito

A ideia remonta a um químico do século XIX que sugeriu que selar formava uma casca estanque à volta da carne. Era uma hipótese de aparência razoável para a época — e pegou, repetida ao longo de gerações de livros de receitas. O problema é que nunca foi verdade, e é fácil de testar.

## Porque é falso

A refutação mais simples: cozinhe dois pedaços semelhantes de carne, um selado primeiro e outro não, e pese os sucos que cada um perde. O pedaço selado **não** retém mais humidade — a carne selada perde mais ou menos tanto suco como a não selada, às vezes *mais*, porque o calor alto do selar até dissipa alguma humidade. Uma crosta dourada não é à prova de água; os sucos atravessam-na sem problema. Até dá para ver: um bife selado e "vedado" liberta na mesma muito suco quando se corta. A crosta é deliciosa, mas não é um vedante.

## Para que serve mesmo selar

Então porquê selar? Por **sabor e textura**, via a **reação de Maillard** — a química do dourar que cria centenas de compostos de sabor ricos, saborosos e assados e uma crosta satisfatória. Um bife selado sabe muito melhor do que um cozido e acinzentado, não por ser mais suculento, mas porque essa superfície dourada está cheia de sabor profundo. Selar é uma das técnicas mais valiosas da cozinha; apenas faz um trabalho diferente do que o mito afirma.

## O que mantém mesmo a carne suculenta

Se não é o selar, então o quê? Três coisas controlam genuinamente a suculência:

| Para carne suculenta | Porquê |
| --- | --- |
| **Não a cozinhe de mais** | O fator nº 1 — o calor espreme a humidade, e cozinhar além do ponto-alvo resseca-a |
| **Deixe-a repousar depois de cozinhada** | Deixa as fibras relaxar e reabsorver o suco em vez de o derramar |
| **Escolha a peça e o método certos** | Adeque a peça ao estilo de cozinhar; salgue com antecedência (salga seca) para reter humidade |

A conclusão: **sele pelo sabor, mas confie no controlo da temperatura e no repouso para a suculência.** Muitos cozinheiros selam agora a carne *depois* de a cozinhar suavemente (a "selagem invertida") precisamente porque a crosta é uma questão de sabor e pode ser acrescentada no fim, enquanto o cozinhado cuidadoso e suave mantém o interior suculento.

## Perguntas frequentes

**Então devo deixar de selar?**
De modo nenhum — continue a selar, porque o sabor e a crosta que cria são maravilhosos. Só não acredite que está a manter a carne suculenta; isso é tarefa de não a cozinhar de mais e de a deixar repousar. Sele pelo sabor, controle a temperatura pela suculência.

**O que é uma "selagem invertida"?**
Cozinhar a carne suavemente até quase à temperatura-alvo primeiro (num forno baixo) e depois selar o exterior com calor alto e rápido no fim. Separa as duas tarefas — interior uniforme e suculento do cozinhado suave, ótima crosta de uma selagem final — e resulta lindamente em bifes grossos.

**Há outros mitos de cozinha persistentes como este?**
Muitos — "o álcool evapora todo", "selar prende os sucos", "a massa precisa de óleo na água" — muitos são simplificações que não sobrevivem ao teste. Um bom hábito: quando uma regra de cozinha afirma um mecanismo arrumadinho, pergunte se foi de facto testada. Muitas vezes a explicação real é mais interessante.`,
  },
  {
    topicKey: 'umami',
    title: 'O que é o umami — o quinto sabor que torna a comida saborosa?',
    question: 'O que é o umami e porque é que ingredientes como caldo, queijo e tomate tornam a comida tão rica?',
    summary:
      'O umami é o quinto sabor básico — uma profundidade saborosa, de carne — desencadeado pelo glutamato e por certos nucleótidos presentes em caldos, queijo curado, tomate, cogumelos e molho de soja. Combinar ingredientes ricos em umami multiplica o efeito, o segredo de comida muito satisfatória.',
    tags: ['culinária', 'ciência dos alimentos', 'sabor', 'umami'],
    language: 'pt',
    image: { prompt: promptOf('umami'), alt: 'Ingredientes ricos em umami a verter um brilho saboroso profundo para um caldo central rico' },
    sources: [
      { title: 'Umami Information Center — O que é o umami?', url: 'https://www.umamiinfo.com/what-is-umami/' },
      { title: 'Harold McGee — On Food and Cooking (paladar e glutamato)', url: 'https://www.curiouscook.com/' },
    ],
    content: `# O que é o umami — o quinto sabor que torna a comida saborosa?

Durante muito tempo, aprendeu-se que havia quatro sabores básicos: doce, ácido, salgado e amargo. Mas quem já provou um caldo de carne rico, parmesão curado ou um tomate perfeitamente maduro sabe que há outra qualidade — uma satisfação profunda, saborosa, que enche a boca, e que nenhum daqueles quatro descreve. Essa qualidade é o **umami**, hoje reconhecido como o **quinto sabor básico**. É o nome científico de "profundidade saborosa", e compreendê-lo é um atalho para tornar quase qualquer comida mais rica e satisfatória.

## Um sabor real e distinto

O umami (uma palavra japonesa que significa, mais ou menos, "sabor agradável e saboroso") foi identificado há mais de um século por um cientista que isolou o que torna o caldo de alga kombu tão satisfatório. Descobriu que o sabor vinha do **glutamato**, um aminoácido. Sabemos agora que a língua tem recetores específicos para ele, tal como para o doce ou o salgado — que é o que faz do umami um sabor *básico* genuíno, e não uma combinação dos outros. É a sensação saborosa, de caldo, de carne, que faz a comida saber plena e completa.

## De onde vem o umami

Os ingredientes ricos em umami estão entre os mais queridos de todas as cozinhas, muitas vezes alimentos curados, fermentados, amadurecidos ou cozinhados em lume brando — processos que aumentam o glutamato livre. Fontes comuns:

- **Carnes e caldos** (sobretudo caldos de osso apurados longamente)
- **Queijos curados** (o parmesão é famoso pela carga de umami)
- **Tomate**, especialmente maduro ou concentrado (concentrado, seco ao sol)
- **Cogumelos**, em particular secos
- **Alimentos fermentados**: molho de soja, miso, molho de peixe
- **Algas** (kombu) e peixe curado (anchovas, bonito)

É por isso que um fio de molho de soja, uma casca de parmesão numa sopa ou uma colher de concentrado de tomate podem tornar um prato dramaticamente mais rico — está a acrescentar glutamato.

## O truque multiplicador do umami

Eis a peça mais útil da ciência do umami: certos compostos **amplificam-se mutuamente.** O glutamato fornece umami, mas duas outras substâncias — nucleótidos chamados inosinato (da carne e do peixe) e guanilato (dos cogumelos) — multiplicam a sensação de umami quando combinados com glutamato. Juntos criam muito mais impacto saboroso do que qualquer um sozinho.

Esta sinergia é a lógica oculta por trás de emparelhamentos de sabor clássicos em todo o mundo: **kombu (glutamato) + flocos de bonito (inosinato)** no dashi japonês; **tomate + parmesão** na cozinha italiana; **cogumelos + carne** em incontáveis guisados. Os cozinheiros descobriram estas combinações pelo paladar ao longo de séculos; a ciência explica *porque* são tão satisfatórias — e deixa-o inventar as suas próprias, combinando uma fonte de glutamato com uma de cogumelos ou de carne/peixe.

## Perguntas frequentes

**O MSG é o mesmo que o umami natural?**
Quimicamente, o glutamato no MSG (glutamato monossódico) é a mesma molécula que o corpo prova no tomate ou no queijo — o MSG é simplesmente glutamato isolado. Fornece umami diretamente. Apesar dos receios antigos, as autoridades de segurança alimentar consideram o MSG seguro em quantidades normais; as "reações" que lhe atribuíram não se confirmaram bem em estudos controlados.

**Como é que o umami é diferente de só "salgado" ou "carne"?**
É um sabor próprio, distinto do salgado — pode ter umami sem muito sal (um tomate) e sal sem umami (água com sal simples). "Carne" é uma boa descrição da *sensação*, mas o umami também vem de muitos alimentos sem carne, como tomate, cogumelos e algas.

**Como posso acrescentar umami sem carne?**
Facilmente — tomate, cogumelos (sobretudo secos), molho de soja, miso, levedura nutricional, algas, alimentos fermentados e queijos curados são todos fontes ricas de umami amigas dos vegetais. Combinar uns quantos (digamos, cogumelos + soja + tomate) constrói um sabor saboroso e profundo na cozinha vegetariana.`,
  },
];
