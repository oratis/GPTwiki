import type { DraftArticle } from './types';
import { healthBasicsEn } from './health-basics.en';

// Batch: Health & Nutrition Basics (versão nativa em português). Mesmos títulos
// e topicKey de health-basics.en.ts, escritos nativamente para o leitor
// brasileiro. Imagens compartilhadas. Educação geral em saúde, não é
// aconselhamento médico; cada artigo termina com um aviso para procurar um
// profissional.

const promptOf = (key: string): string => {
  const hit = healthBasicsEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

const NOTE =
  '\n\n*Este artigo é educação geral em saúde, não aconselhamento médico. Para sintomas ou decisões pessoais, consulte um profissional de saúde qualificado.*';

export const healthBasicsPt: DraftArticle[] = [
  {
    topicKey: 'caffeine-how-it-works',
    title: 'Como a Cafeína Realmente Funciona no Seu Corpo',
    question: 'Como a cafeína desperta você, e por que ela para de funcionar com o tempo?',
    summary:
      'A cafeína não acrescenta energia — ela bloqueia o sinal de "estou cansado" do cérebro (a adenosina), mascarando o cansaço em vez de removê-lo. O uso regular cria tolerância, e a dívida de sono fica esperando embaixo o tempo todo.',
    tags: ['saúde', 'cafeína', 'sono', 'nutrição'],
    language: 'pt',
    image: {
      prompt: promptOf('caffeine-how-it-works'),
      alt: 'Uma molécula em forma de cafeína bloqueando uma molécula de cansaço em um receptor',
    },
    sources: [
      { title: 'Sleep Foundation — cafeína e sono', url: 'https://www.sleepfoundation.org/nutrition/caffeine-and-sleep' },
      { title: 'FDA — quanta cafeína é demais?', url: 'https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much' },
    ],
    content: `# Como a Cafeína Realmente Funciona no Seu Corpo

A cafeína é a droga mais popular do mundo, e quase todo mundo entende errado o que ela faz. Ela **não** dá energia. Não é combustível. O que ela realmente faz é bloquear o sinal que diz ao seu cérebro que você está cansado — um truque esperto que mascara o cansaço sem removê-lo. Entender esse único mecanismo explica o nervosismo, a queda, a tolerância, e por que a cafeína sabota o sono horas depois de você bebê-la.

## O truque da adenosina

Enquanto você está acordado, seu cérebro acumula uma molécula chamada **adenosina**. Ela se liga a receptores e, à medida que se acumula ao longo do dia, faz você se sentir progressivamente mais sonolento — é a contagem corrente do seu cérebro do "tempo passado acordado". O formato molecular da cafeína é parecido o suficiente com o da adenosina para encaixar nos mesmos receptores — e tapá-los, como uma chave que entra na fechadura mas não gira. Com os receptores bloqueados, o sinal de cansaço não consegue passar. Você se sente alerta.

Mas repare no que *não* aconteceu: a adenosina ainda está ali, ainda se acumulando, apenas incapaz de se acoplar. Você não quitou o cansaço — você o colocou no cartão de crédito. Quando a cafeína passa e libera os receptores, toda aquela adenosina represada chega de uma vez. Isso é a **queda**.

## Por que o horário importa mais do que você pensa

O número que define a cafeína é sua **meia-vida**: cerca de 5 a 6 horas num adulto típico, ou seja, metade da dose ainda está ativa esse tempo todo depois que você a bebe. Um café forte às 15h deixa uma quantidade significativa circulando às 21h, bloqueando silenciosamente o sinal de pressão para dormir exatamente quando você quer dormir. Mesmo pessoas que "pegam no sono numa boa" com cafeína tardia têm um sono profundo mensuravelmente pior — o descanso fica mais raso sem elas perceberem.

| Tempo depois de um café | Aproximadamente quanta cafeína resta |
| --- | --- |
| 0 horas | 100% |
| ~5–6 horas | 50% |
| ~10–12 horas | 25% |
| ~24 horas | um traço pequeno mas real |

(A meia-vida varia muito entre pessoas — genética, gravidez, alguns medicamentos e a função do fígado podem dobrá-la ou reduzi-la pela metade.)

## Tolerância e dependência

Use cafeína diariamente e seu cérebro se adapta **criando mais receptores de adenosina** — então a mesma dose bloqueia uma fração menor, e você precisa de mais para o mesmo efeito. Enquanto isso, com receptores extras, ficar sem cafeína faz a adenosina se ligar ainda mais facilmente do que antes: a clássica dor de cabeça de abstinência, o cansaço e a irritabilidade. Boa parte da experiência de "a cafeína me faz sentir normal" em usuários pesados é só aliviar a abstinência de volta à linha de base, não ganhar nada acima dela.

## Usando bem

O mecanismo sugere regras simples: estabeleça um **toque de recolher da cafeína** (geralmente parar ~8 a 10 horas antes de dormir); conheça o seu teto (autoridades de saúde citam até ~400 mg/dia — cerca de 4 xícaras de café — como moderado para a maioria dos adultos saudáveis, menos na gravidez); e lembre que ela **adia** a sonolência em vez de substituir o sono — a dívida sempre vence.

## Perguntas frequentes

**A cafeína desidrata?**
O leve efeito diurético é compensado pelo líquido da própria bebida; para quem consome regularmente, café e chá contam como hidratação. A preocupação com a desidratação é bastante exagerada.

**Por que o café deixa algumas pessoas ansiosas ou trêmulas?**
Ao bloquear o "acalme-se" da adenosina, a cafeína deixa os sinais estimulantes correrem mais alto — elevando a frequência cardíaca e, em pessoas sensíveis ou doses altas, a ansiedade. A genética influencia fortemente isso.

**Dá para "resetar" a minha tolerância?**
Sim — uma ou duas semanas sem cafeína fazem o número de receptores cair de volta para perto da linha de base, e depois a mesma dose volta a bater mais forte. Espere sintomas de abstinência durante o reset.${NOTE}`,
  },
  {
    topicKey: 'why-we-sleep',
    title: 'Por Que Precisamos Dormir, e o Que Acontece Se Não Dormimos?',
    question: 'Por que os humanos precisam de sono, e o que de fato acontece no cérebro e no corpo durante ele?',
    summary:
      'O sono não é tempo ocioso — é quando o cérebro limpa resíduos, consolida a memória e o corpo se repara. A privação crônica de sono degrada silenciosamente o humor, a imunidade, o metabolismo e o julgamento, muitas vezes sem a pessoa notar o declínio.',
    tags: ['saúde', 'sono', 'cérebro', 'bem-estar'],
    language: 'pt',
    image: {
      prompt: promptOf('why-we-sleep'),
      alt: 'Uma cabeça dormindo com luz purificadora varrendo resíduos e ordenando memórias',
    },
    sources: [
      { title: 'Sleep Foundation — de quanto sono você precisa', url: 'https://www.sleepfoundation.org/how-sleep-works/how-much-sleep-do-we-really-need' },
      { title: 'CDC — sobre sono e saúde', url: 'https://www.cdc.gov/sleep/about/index.html' },
    ],
    content: `# Por Que Precisamos Dormir, e o Que Acontece Se Não Dormimos?

Passamos cerca de um terço da vida dormindo e, por muito tempo, até os cientistas trataram isso como tempo desperdiçado — o cérebro desligado. O oposto é verdade. O sono é um dos processos mais *ativos* e essenciais da biologia: o cérebro executa uma manutenção que não consegue fazer acordado, as memórias são arquivadas e o corpo se repara. Pule-o e os custos são reais, cumulativos e — o mais perigoso — em parte invisíveis para quem os paga.

## O que o sono de fato faz

Ao longo de uma noite, o cérebro percorre repetidamente diferentes fases, cada uma fazendo um trabalho:

- **Sono profundo (de ondas lentas)** — o turno de reparo do corpo: crescimento de tecidos, fortalecimento da imunidade e um "enxágue" físico. O sistema glinfático do cérebro elimina resíduos metabólicos (incluindo proteínas ligadas à saúde cerebral de longo prazo) de forma muito mais eficaz do que durante a vigília.
- **Sono REM** — onde ocorrem os sonhos vívidos e o cérebro processa emoções e entrelaça novas informações ao conhecimento já existente. Está fortemente envolvido no aprendizado, na criatividade e na regulação emocional.
- **Consolidação da memória** — ao longo da noite, as frágeis memórias de curto prazo do dia são reproduzidas e transferidas para o armazenamento duradouro de longo prazo. Você não só descansa durante o sono; você *salva o seu trabalho*.

É por isso que virar a noite estudando sai pela culatra: a etapa de codificação que fixa o aprendizado literalmente exige sono.

## O custo de ficar sem

A perda de sono degrada o funcionamento numa curva íngreme, e boa parte do dano é silenciosa:

| Sistema | O que o sono curto faz |
| --- | --- |
| Atenção e julgamento | Reações mais lentas, decisões piores — comparável ao prejuízo do álcool depois de muito tempo acordado |
| Humor | Negatividade amplificada, irritabilidade, maior risco de ansiedade e depressão |
| Memória e aprendizado | Codificação e recordação prejudicadas |
| Imunidade | Defesa mais fraca; doenças mais frequentes |
| Metabolismo | Hormônios da fome desregulados, mais apetite, pior controle de açúcar no sangue |
| Saúde a longo prazo | O sono curto crônico está ligado a doença cardíaca, diabetes e mais |

A parte mais cruel: depois de alguns dias de restrição, as pessoas *sentem* que se adaptaram enquanto seu desempenho medido continua caindo. Você se torna um péssimo juiz do seu próprio prejuízo — que é exatamente por que "eu fico bem com 5 horas" está tão frequentemente errado.

## Quanto, e como protegê-lo

A maioria dos adultos precisa de **7 a 9 horas**; a população que de fato fica bem com menos é minúscula (uma rara minoria genética), muito menor do que a população que *afirma* fazer parte dela. A qualidade importa junto com a quantidade: horários consistentes (mesmo horário de dormir e acordar), um quarto escuro e fresco, e um toque de recolher para cafeína e luz de telas protegem as fases de sono profundo e REM, que fazem o trabalho pesado.

## Perguntas frequentes

**Dá para recuperar o sono no fim de semana?**
Em parte — alguma recuperação é real, mas dormir demais no fim de semana não desfaz totalmente o déficit da semana, e a própria oscilação de horários desregula o relógio biológico ("jet lag social").

**É verdade que algumas pessoas só precisam de 4 horas?**
Existe um gene genuíno de dormidor curto, mas ele é extraordinariamente raro. A esmagadora maioria que acredita pertencer a esse grupo está apenas cronicamente privada de sono e acostumada com isso.

**Cochilar ajuda?**
Um cochilo curto (~10 a 20 min) pode restaurar o estado de alerta sem moleza. Cochilos longos ou tardios podem reduzir a pressão de sono noturna e desregular seus horários.${NOTE}`,
  },
  {
    topicKey: 'protein-needs',
    title: 'Quanta Proteína Você Realmente Precisa?',
    question: 'De quanta proteína eu realmente preciso, e o hype da dieta rica em proteína se justifica?',
    summary:
      'A maioria das pessoas precisa de menos proteína do que o marketing fitness sugere, mas de mais do que o mínimo absoluto se forem ativas ou estiverem envelhecendo. O total diário e distribuí-la entre as refeições importam muito mais do que pós caros ou timing preciso.',
    tags: ['saúde', 'nutrição', 'proteína', 'dieta'],
    language: 'pt',
    image: {
      prompt: promptOf('protein-needs'),
      alt: 'Blocos de construção de proteína equilibrados contra um corpo, distribuídos ao longo de uma linha do tempo',
    },
    sources: [
      { title: 'NIH Office of Dietary Supplements / National Academies — DRI de proteína', url: 'https://www.nal.usda.gov/human-nutrition-and-food-safety/dri-calculator' },
      { title: 'Harvard T.H. Chan School of Public Health — proteína', url: 'https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/protein/' },
    ],
    content: `# Quanta Proteína Você Realmente Precisa?

A proteína está vivendo seu momento de marketing — adicionada a tudo, de cereal a água — e o resultado é uma confusão generalizada sobre quanto uma pessoa de fato precisa. A resposta honesta fica entre dois mitos: você precisa de muito menos do que os anúncios de suplementos sugerem, mas, se você é ativo, mais velho ou tenta preservar músculo enquanto perde peso, provavelmente precisa de mais do que o piso oficial mínimo. Veja como encontrar o seu número real.

## Para que serve a proteína

A proteína fornece aminoácidos, os blocos de construção que seu corpo usa para construir e reparar músculo, fabricar enzimas e hormônios, dar suporte às células imunes e manter pele, cabelo e ossos. Ao contrário da gordura, o corpo não consegue estocar uma reserva significativa de aminoácidos sobrando — e é por isso que importa um suprimento *diário*, e não uma média semanal.

## Os números, honestamente

O mínimo oficial para prevenir deficiência é **cerca de 0,8 g por kg de peso corporal por dia** — para um adulto de 70 kg, ~56 g. Mas "prevenir deficiência" é uma régua baixa. As evidências apoiam ingestões maiores para objetivos específicos:

| Situação | Meta diária razoável |
| --- | --- |
| Sedentário, só evitando deficiência | ~0,8 g/kg |
| Geralmente ativo, mantendo a saúde | ~1,0–1,2 g/kg |
| Treino de força / ganho de músculo | ~1,4–2,0 g/kg |
| Idosos (combatendo a perda muscular ligada à idade) | ~1,0–1,2+ g/kg |
| Perdendo peso (preservando músculo) | rumo à faixa mais alta |

Para uma pessoa ativa de 70 kg, isso dá cerca de 100 a 140 g/dia — alcançável pela comida, sem pós. Note que o ganho de músculo tem um teto: acima de aproximadamente 1,6 g/kg, a proteína extra rende pouco músculo adicional, apenas calorias caras.

## Timing e qualidade (as alavancas menores)

Dois refinamentos importam de forma modesta, depois que o total está certo:

- **Distribua.** O corpo usa proteína para construir músculo melhor em quantidades moderadas por refeição (muito grosseiramente, 20 a 40 g), então três ou quatro refeições com proteína superam um bife gigante e duas refeições vazias. A "janela anabólica" logo após o exercício é bem mais tolerante do que se acreditava — o total diário domina.
- **A qualidade varia.** As proteínas animais (carne, ovos, laticínios, peixe) contêm todos os aminoácidos essenciais em boas proporções. As proteínas vegetais podem absolutamente atender às necessidades, mas combinar fontes (ex.: grãos + leguminosas) garante o conjunto completo de aminoácidos; a soja e algumas outras são completas por conta própria.

## Perguntas frequentes

**Proteína demais é perigosa para os rins?**
Para rins saudáveis, uma proteína mais alta dentro dessas faixas é bem tolerada segundo as evidências. Pessoas com doença renal já existente são a exceção e devem seguir orientação médica.

**Eu preciso de pó de proteína?**
Não — ele é conveniente, não mágico. Os alimentos integrais fornecem os mesmos aminoácidos mais outros nutrientes. O pó é só um jeito portátil, às vezes mais barato, de atingir o seu número em dias corridos.

**Comer mais proteína vai automaticamente construir músculo?**
Não. A proteína é a matéria-prima; o *estímulo* é o exercício de resistência. Sem treino, o excedente de proteína é só caloria — o músculo é construído pela academia e abastecido pela cozinha.${NOTE}`,
  },
  {
    topicKey: 'metabolism-myths',
    title: 'Metabolismo: O Que Ele É e o Que Ele Não É',
    question: 'O que é o metabolismo de verdade, e dá para "acelerá-lo" para perder peso?',
    summary:
      'O metabolismo é a soma de toda a energia que seu corpo usa, a maior parte dela apenas para mantê-lo vivo em repouso. Ele varia menos entre as pessoas do que o folclore afirma, e os "aceleradores de metabolismo" vendidos para emagrecer são, em sua maioria, marketing.',
    tags: ['saúde', 'metabolismo', 'peso', 'nutrição'],
    language: 'pt',
    image: {
      prompt: promptOf('metabolism-myths'),
      alt: 'Um corpo com uma grande fornalha interna estável e luzes de atividade menores tremeluzentes',
    },
    sources: [
      { title: 'Harvard Health — o metabolismo importa na perda de peso?', url: 'https://www.health.harvard.edu/staying-healthy/does-metabolism-matter-in-weight-loss' },
      { title: 'NIH — pesquisa sobre equilíbrio energético e metabolismo', url: 'https://www.niddk.nih.gov/health-information/weight-management' },
    ],
    content: `# Metabolismo: O Que Ele É e o Que Ele Não É

O "metabolismo" leva a culpa por mais lutas com o peso do que quase qualquer outra palavra, normalmente como um botão misterioso que é "lento" em algumas pessoas azaradas e "rápido" em outras. A realidade é mais sem graça e mais útil: o metabolismo é simplesmente **a energia total que seu corpo gasta**, e a maior parte dela vai para mantê-lo vivo enquanto você não faz nada. Entender suas partes reais dissolve a maioria dos mitos vendidos em torno dele.

## Do que o metabolismo é feito

Seu gasto diário de energia tem três componentes principais:

- **Taxa metabólica de repouso (TMR)** — a energia para fazer seu corpo funcionar em repouso: batimentos, respiração, cérebro, função dos órgãos, manutenção das células. Essa é a **grande**, tipicamente **60 a 75%** do gasto diário total. Você gasta a maior parte das suas calorias simplesmente existindo.
- **Atividade física** — tudo, de treinos a se mexer na cadeira e andar por aí. Variável, e a parte mais sob o seu controle, mas geralmente menor do que as pessoas imaginam (frequentemente ~15 a 30%).
- **Efeito térmico dos alimentos** — energia usada para digerir e processar o que você come (~10%). A proteína é a que mais custa para processar, o que é um pequeno efeito real.

A surpresa principal: você não consegue "compensar com exercício" um excedente calórico sustentado com facilidade, porque a atividade é uma parcela minoritária, e o corpo compensa em parte queimando menos em outros lugares.

## Por que "metabolismo lento" é, em geral, um mito

Medidas entre pessoas de tamanho e composição corporal semelhantes mostram que as taxas metabólicas de repouso diferem muito menos do que o folclore sugere — geralmente dentro de uma faixa modesta, não uma diferença de 2×. O que *de fato* move a TMR de forma significativa:

| Fator | Efeito sobre a TMR |
| --- | --- |
| Tamanho do corpo e massa muscular | Corpos maiores e mais músculo queimam mais em repouso (a maior alavanca real) |
| Idade | Declínio gradual, em parte pela perda muscular — pesquisas recentes sugerem que é mais estável ao longo da meia-idade do que se supunha |
| Sexo | Diferenças amplamente explicadas pela composição corporal |
| Dieta severa | O corpo reduz um pouco ("termogênese adaptativa") |

Então metabolismos genuinamente diferentes existem, mas em sua maioria são explicados pela **composição corporal**, não por sorte. A pessoa com "metabolismo rápido" é, com frequência, simplesmente maior, mais musculosa ou mais ativa (inclusive inconscientemente).

## A verdade sobre os "aceleradores"

Os suplementos, chás e truques vendidos para "acelerar o metabolismo" entregam efeitos minúsculos, temporários ou imaginários. A cafeína e os alimentos picantes empurram o gasto de energia ligeira e brevemente — nem de longe o suficiente para importar para o peso. A única forma duradoura de elevar o gasto em repouso é **construir e manter músculo** (treino de força) e evitar a perda muscular que vem com as dietas radicais. Não existe pílula que acelere a fornalha de forma significativa e segura.

## Perguntas frequentes

**Comer refeições pequenas e frequentes "acende" o metabolismo?**
Não — o que custa energia é o total de comida processado, não a frequência das refeições. Seis refeições pequenas e duas grandes com a mesma comida queimam essencialmente o mesmo para digerir.

**Por que minha perda de peso estagnou mesmo comendo menos?**
Em parte pela termogênese adaptativa (um corpo menor queima menos, e o corpo economiza), em parte pela ingestão subestimada. É biologia real, mas não um metabolismo "quebrado" — e é por isso que preservar músculo e ter paciência importam.

**O músculo realmente pode elevar muito o meu metabolismo?**
Uma quantidade moderada — o músculo queima mais em repouso do que a gordura, embora o efeito por quilo seja muitas vezes superestimado. Seu valor maior está em preservar a TMR durante a perda de peso e em melhorar a saúde geral.${NOTE}`,
  },
  {
    topicKey: 'vitamin-supplements',
    title: 'Você Realmente Precisa de Suplementos de Vitaminas?',
    question: 'Vale a pena tomar suplementos de vitaminas, ou é desperdício de dinheiro para a maioria das pessoas?',
    summary:
      'Para a maioria das pessoas com uma dieta variada, os multivitamínicos amplos oferecem pouco benefício comprovado — o corpo descarta o que não consegue usar. Mas grupos específicos e deficiências específicas (como vitamina D ou B12) genuinamente se beneficiam de suplementação direcionada.',
    tags: ['saúde', 'vitaminas', 'suplementos', 'nutrição'],
    language: 'pt',
    image: {
      prompt: promptOf('vitamin-supplements'),
      alt: 'Um corpo nutrido por alimentos variados, com uma cápsula preenchendo uma única lacuna específica',
    },
    sources: [
      { title: 'NIH Office of Dietary Supplements — fichas de vitaminas e minerais', url: 'https://ods.od.nih.gov/factsheets/list-all/' },
      { title: 'Harvard T.H. Chan School of Public Health — vitaminas e suplementos', url: 'https://www.hsph.harvard.edu/nutritionsource/vitamins/' },
    ],
    content: `# Você Realmente Precisa de Suplementos de Vitaminas?

O corredor de suplementos promete saúde num frasco, e bilhões são gastos ali todo ano. As evidências contam uma história mais cheia de nuances: para uma pessoa geralmente saudável que come uma dieta variada, um multivitamínico diário mostrou **pouco benefício mensurável** em grandes estudos — enquanto, para pessoas específicas com lacunas específicas, suplementos direcionados são genuinamente valiosos, às vezes essenciais. A habilidade está em distinguir as duas situações.

## Por que os multivitamínicos amplos decepcionam

As vitaminas são substâncias de que seu corpo precisa em pequenas quantidades, mas que, em sua maioria, não consegue fabricar sozinho. A expressão-chave é *pequenas quantidades*. Uma vez que suas necessidades estão atendidas — algo fácil com uma dieta variada —, o excesso de vitaminas hidrossolúveis (do complexo B, C) é amplamente excretado, e as lipossolúveis (A, D, E, K) se acumulam, mas não oferecem bônus pelo excesso. Você não consegue "completar o tanque" rumo à supersaúde; além da suficiência, mais não faz nada de útil, e algumas podem prejudicar em excesso.

Grandes ensaios de multivitamínicos em populações bem nutridas geralmente não conseguiram mostrar reduções de doença cardíaca, câncer ou mortalidade. Para alguém que já come de forma razoável, o multivitamínico em sua maior parte produz, como brincam os pesquisadores, urina cara.

## Quando os suplementos realmente importam

As exceções são reais e importantes — direcionadas, não amplas:

| Situação | Suplemento que frequentemente vale a pena |
| --- | --- |
| Pouca exposição ao sol / latitudes mais altas | Vitamina D |
| Dieta vegana/vegetariana estrita | Vitamina B12 (não está em alimentos vegetais) |
| Gravidez ou tentando engravidar | Ácido fólico (previne defeitos de nascimento) |
| Deficiência diagnosticada (ferro, etc.) | O nutriente específico, guiado por exames |
| Idosos | A absorção/síntese de B12 e D declina com a idade |
| Dietas restritas / condições de má absorção | Depende da lacuna |

Repare no padrão: um suplemento conquista seu lugar ao preencher uma lacuna *conhecida* — uma restrição alimentar, uma fase da vida, um exame de sangue — e não por esperança genérica. A vitamina D e a B12 são as mais comumente úteis de verdade para grupos amplos.

## Usando suplementos com bom senso

Se você os toma: trate-os como preenchedores de lacunas, não como seguro contra uma dieta ruim (os alimentos integrais carregam fibras e compostos benéficos que pílula nenhuma replica); fique atento de que vitaminas lipossolúveis e minerais podem atingir níveis prejudiciais se exagerados; e lembre que a indústria de suplementos é pouco regulada em muitos países — "natural" não é "testado", e a precisão da dose e a pureza variam. Na dúvida, um exame de sangue vence o palpite.

## Perguntas frequentes

**Um multivitamínico pode me prejudicar?**
Doses padrão são geralmente seguras, mas megadoses podem prejudicar — vitamina A, ferro ou outros em excesso são genuinamente tóxicos. Mais não é mais seguro.

**Obter vitaminas da comida é realmente melhor do que de pílulas?**
Geralmente sim — a comida entrega nutrientes em combinações e com fibras e outros compostos que as pílulas isoladas não têm, e as evidências do benefício de alimentos integrais são muito mais fortes do que as dos suplementos.

**Como sei se estou de fato com deficiência?**
Por um exame de sangue solicitado por um profissional, e não só pelos sintomas (que costumam ser vagos e sobrepostos). Adivinhar leva tanto a pílulas desnecessárias quanto a deficiências reais não percebidas.${NOTE}`,
  },
  {
    topicKey: 'hydration-myth',
    title: 'Você Realmente Precisa de 8 Copos de Água por Dia?',
    question: 'A regra dos "8 copos de água por dia" é verdadeira, e de quanta água eu realmente preciso?',
    summary:
      'A famosa regra dos "8 copos" não tem base científica sólida. As necessidades reais variam com o tamanho do corpo, a atividade, o clima e a dieta — e comida e outras bebidas contam. Para a maioria das pessoas, a sede mais a urina amarelo-clara é um guia melhor do que qualquer número fixo.',
    tags: ['saúde', 'hidratação', 'água', 'nutrição'],
    language: 'pt',
    image: {
      prompt: promptOf('hydration-myth'),
      alt: 'Um corpo mantido em equilíbrio hídrico por fluxos de comida e várias bebidas, com um medidor claro',
    },
    sources: [
      { title: 'Harvard T.H. Chan School of Public Health — água e hidratação', url: 'https://www.hsph.harvard.edu/nutritionsource/water/' },
      { title: 'National Academies — valores de referência de ingestão de água', url: 'https://www.nationalacademies.org' },
    ],
    content: `# Você Realmente Precisa de 8 Copos de Água por Dia?

"Beba oito copos de água por dia" é uma das regras de saúde mais repetidas do mundo — e uma das menos respaldadas. Nenhum estudo sólido a estabeleceu; ela parece ser um número que ganhou vida própria, possivelmente a partir de uma diretriz de décadas atrás que também observava que *a maior parte dessa água vem da comida*, uma ressalva que o slogan deixou cair. O quadro real é ao mesmo tempo mais flexível e mais inteligente do que uma cota fixa.

## Por que um único número não pode estar certo

As necessidades de água dependem de variáveis que diferem enormemente entre pessoas e dias:

- **Tamanho do corpo** — uma pessoa grande precisa de mais do que uma pequena.
- **Atividade e suor** — um treino pesado ou trabalho braçal pode multiplicar as necessidades.
- **Clima** — calor e ar seco elevam as perdas acentuadamente.
- **Dieta** — frutas, verduras, sopas e a maioria dos alimentos carregam água; uma dieta rica em vegetais fornece bastante antes de você beber qualquer coisa.

Um "8 copos" fixo ignora tudo isso. A mesma regra pode deixar um maratonista no verão sub-hidratado e empurrar uma pessoa pequena e sedentária num clima ameno a beber mais do que precisa.

## O que realmente conta (mais do que você pensa)

Um mito persistente é que só a água pura "conta". Não funciona assim — seu corpo extrai água de quase tudo que você consome:

| Fonte | Contribui para a hidratação? |
| --- | --- |
| Água pura | Sim |
| Chá, café | Sim — o líquido supera o leve efeito diurético |
| Leite, suco, sopa | Sim |
| Frutas e verduras (muitas vezes 80–95% de água) | Sim, substancialmente |
| A maioria das refeições | Sim |

É por isso que as pessoas atendem às suas necessidades sem conscientemente "beber água" o dia todo — comida e outras bebidas fazem boa parte do trabalho. Café e chá, apesar do velho mito, hidratam com saldo positivo para quem consome regularmente.

## Um guia melhor do que contar

Seu corpo tem um sistema de sede finamente calibrado; pessoas saudáveis podem, em grande parte, **confiar na sede** em vez de bater uma cota. Duas verificações simples vencem qualquer número:

- **Sede** — beba quando tiver sede; é um sinal real, não um indício de que você já está falhando.
- **Cor da urina** — amarelo-palha clara significa bem hidratado; âmbar escuro significa beba mais; frequentemente transparente pode significar que você está exagerando.

Alguns grupos devem ser mais deliberados — idosos (sede embotada), atletas, pessoas no calor e certas condições médicas. E **mais nem sempre é melhor**: beber muito além da necessidade é desconfortável e, em casos extremos raros (beber em excesso durante provas de resistência), dilui o sódio do sangue de forma perigosa.

## Perguntas frequentes

**A desidratação leve realmente prejudica o foco e o humor?**
A desidratação significativa de fato prejudica a concentração e o humor, o que é uma boa razão para não ignorar a sede — mas não é razão para se forçar a beber em goles constantes quando você não está com sede.

**Devo beber antes de sentir sede?**
Para o dia a dia, a sede é oportuna o suficiente para a maioria das pessoas. Beber de forma preventiva faz sentido antes de exercício pesado ou exposição ao calor, em que as perdas superam o sinal de sede.

**É possível beber água demais?**
Sim, embora raro — consumir volumes extremos mais rápido do que os rins conseguem eliminar pode diluir o sódio de forma perigosa (hiponatremia). O risco famoso está nos esportes de resistência, não na vida diária normal.${NOTE}`,
  },
  {
    topicKey: 'exercise-minimum',
    title: 'Qual é o Mínimo de Exercício Que Realmente Ajuda?',
    question: 'Qual é a menor quantidade de exercício que ainda melhora a saúde de forma significativa?',
    summary:
      'Grandes ganhos de saúde começam com surpreendentemente pouco movimento — o salto de não fazer nada para fazer um pouco é o maior de todos. As diretrizes sugerem ~150 minutos de atividade moderada por semana, mas até uma fração supera o zero, e o trabalho de força também importa.',
    tags: ['saúde', 'exercício', 'condicionamento', 'bem-estar'],
    language: 'pt',
    image: {
      prompt: promptOf('exercise-minimum'),
      alt: 'Uma escada em que o primeiro degrau a partir do chão é o mais alto e o mais brilhante',
    },
    sources: [
      { title: 'OMS — diretrizes de atividade física', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity' },
      { title: 'CDC — fundamentos da atividade física', url: 'https://www.cdc.gov/physical-activity-basics/index.html' },
    ],
    content: `# Qual é o Mínimo de Exercício Que Realmente Ajuda?

Se o exercício parece um compromisso de tudo ou nada no qual você vive fracassando, a ciência tem uma boa notícia: **o exercício mais valioso que você vai fazer na vida é o primeiro pouquinho, feito por alguém que não fazia nada.** A curva de benefício à saúde é mais íngreme bem lá embaixo — ir de zero a um pouco entrega um ganho proporcional maior do que ir de muito a mais. Você não precisa de uma matrícula em academia ou de uma hora por dia para começar a colher benefícios reais.

## Por que o primeiro pouquinho importa mais

Os benefícios à saúde não sobem em linha reta com o exercício; eles sobem rápido no começo e depois se achatam. Estudos sobre atividade e mortalidade mostram consistentemente que a **maior redução de risco vem de sair do zero** — a pessoa antes sedentária que começa a caminhar regularmente ganha mais, proporcionalmente, do que a pessoa ativa que acrescenta um sexto treino semanal. A implicação é libertadora: atividade imperfeita, modesta e sustentável supera um plano ambicioso que você abandona.

## Os números das diretrizes (e quão pouco já garante a maior parte do benefício)

A meta amplamente citada para benefício substancial à saúde é:

| Atividade | Meta semanal |
| --- | --- |
| Aeróbico moderado (caminhada acelerada, pedalada leve) | ~150 minutos |
| OU aeróbico vigoroso (corrida, pedalada rápida) | ~75 minutos |
| Fortalecimento muscular | 2+ sessões/semana |

Mas a mesma pesquisa deixa claro que **fazer menos do que a meta ainda ajuda bastante** — cerca de metade da diretriz ainda rende uma grande parte do benefício, e rajadas bem curtas contam. Evidências recentes até dão crédito a "lanches de exercício" — alguns minutos subindo escadas, uma caminhada acelerada de 10 minutos — acumulados ao longo do dia. A velha ideia de que o exercício precisava vir em blocos de 30 minutos para contar está ultrapassada; **o que importa é o movimento total.**

## Não esqueça a força

A atividade aeróbica leva as manchetes, mas o **fortalecimento muscular** (treino de resistência, exercícios com o peso do corpo, carregar coisas pesadas) tem benefícios distintos e cruciais que o cardio não fornece por completo: preservar músculo e osso, sustentar o metabolismo e manter a independência e o equilíbrio à medida que você envelhece. Duas sessões curtas por semana são uma peça de alto valor e frequentemente pulada — e não exige academia.

## Fazendo o mínimo pegar

O melhor exercício é aquele que você de fato vai repetir. Alavancas práticas: acople o movimento a hábitos já existentes (caminhe durante ligações, escadas em vez de elevadores), comece bem menor do que parece impressionante (uma caminhada de 10 minutos que você faz todo dia supera uma hora que você faz duas vezes) e conte a atividade do dia a dia — caminhar acelerado, jardinagem e pedalar para resolver coisas todos contam. A constância se acumula; a intensidade pode vir depois.

## Perguntas frequentes

**Caminhar é exercício "de verdade"?**
Sim — a caminhada acelerada é atividade de intensidade moderada com benefícios bem documentados para a saúde do coração, o humor, o açúcar no sangue e a longevidade. É o exercício mais subestimado que existe.

**Os 10.000 passos precisam ser exatos?**
Não — 10.000 é um número redondo de origem em marketing, não um limiar médico. Os benefícios se acumulam bem abaixo disso; até ~7.000 passos mostram grandes ganhos sobre níveis sedentários. Mais é melhor até certo ponto, mas a meta não tem nada de mágico.

**É tarde demais para começar se eu sou mais velho ou estou fora de forma?**
Não — os benefícios aparecem em qualquer idade, e o ganho proporcional de começar é maior para quem parte do menos. Comece com calma, evolua aos poucos e consulte um profissional se você tiver condições de saúde.${NOTE}`,
  },
  {
    topicKey: 'added-sugar',
    title: 'Por Que o Açúcar Adicionado É Tratado de Forma Diferente do Açúcar Natural',
    question: 'O açúcar da fruta é igual ao açúcar adicionado, e por que eles são tratados de forma tão diferente?',
    summary:
      'Quimicamente, os açúcares são parecidos — mas a embalagem muda tudo. A fruta entrega o açúcar envolto em fibra e água que retardam a absorção; o açúcar adicionado chega rápido e concentrado. A diferença é dose e velocidade, não uma molécula diferente.',
    tags: ['saúde', 'açúcar', 'nutrição', 'dieta'],
    language: 'pt',
    image: {
      prompt: promptOf('added-sugar'),
      alt: 'Luz de açúcar liberada lentamente por uma malha de fibra versus derramada rápida e concentrada',
    },
    sources: [
      { title: 'Harvard T.H. Chan School of Public Health — açúcar adicionado', url: 'https://www.hsph.harvard.edu/nutritionsource/carbohydrates/added-sugar-in-the-diet/' },
      { title: 'OMS — diretriz sobre ingestão de açúcares', url: 'https://www.who.int/news/item/04-03-2015-who-calls-on-countries-to-reduce-sugars-intake-among-adults-and-children' },
    ],
    content: `# Por Que o Açúcar Adicionado É Tratado de Forma Diferente do Açúcar Natural

Uma objeção comum ao conselho de "cortar o açúcar adicionado" soa lógica: *açúcar é açúcar — a fruta também tem açúcar, então por que um é tranquilo e o outro é vilão?* É uma pergunta justa, e a resposta não é que as moléculas diferem muito. É que a **embalagem** em torno do açúcar — e a dose e a velocidade com que ele chega — muda completamente como seu corpo lida com ele. É o contexto, não a química, que conta a história inteira.

## Mesma molécula, entrega diferente

Os açúcares de uma maçã e de um refrigerante são, em grande parte, os mesmos compostos (glicose e frutose). Mas uma maçã os entrega envoltos em **fibra, água e volume**:

- **A fibra retarda a absorção**, então o açúcar pinga no seu sangue em vez de inundá-lo — uma subida mais suave, sem o pico-e-queda agudo.
- **A água e o volume geram saciedade**, então você para de comer; a fruta inteira é genuinamente difícil de consumir em excesso.
- **Os nutrientes vêm junto** — vitaminas, minerais, compostos vegetais benéficos.

Tire o açúcar dessa embalagem — como no refrigerante, na bala ou até no suco de fruta — e ele chega rápido, concentrado e fácil de consumir em grandes quantidades, sem um sinal de "pare". Um copo de suco pode conter o açúcar de várias frutas, menos a fibra que tornava a fruta autolimitante. **O problema nunca foi a molécula; é a dose e a velocidade.**

## Por que o açúcar rápido e concentrado é o problema

Quando o açúcar inunda rápido e com frequência, os efeitos se acumulam:

| Mecanismo | Consequência |
| --- | --- |
| Picos rápidos de açúcar no sangue | Quedas de energia, mais desejos, sobrecarga de longo prazo na regulação da glicose |
| Consumo excessivo fácil (sem freio de saciedade) | Excedente de calorias → ganho de peso |
| Especialmente o açúcar líquido | Calorias que não são registradas como "comida", então você não come menos para compensar |
| Desloca alimentos densos em nutrientes | Menos espaço para coisas de que seu corpo precisa |

É por isso que as diretrizes de saúde miram os açúcares **adicionados** e **livres** (aqueles acrescentados no processamento, mais os de sucos e xaropes) em vez do açúcar intacto da fruta e dos vegetais inteiros. A OMS sugere manter os açúcares livres abaixo de ~10% das calorias diárias, idealmente abaixo de 5% — enquanto a fruta inteira é amplamente incentivada.

## A conclusão prática

Você não precisa temer a fruta. A embalagem de fibra da fruta inteira torna seu açúcar um não problema para quase todo mundo. A jogada de alto valor é reduzir o **açúcar concentrado e adicionado** — especialmente as **bebidas açucaradas**, a maior fonte isolada para muita gente e a mais desacoplada da saciedade. Leia os rótulos em busca de açúcares adicionados, trate o suco mais como guloseima do que como alimento saudável, e deixe a fruta inteira satisfazer a vontade de doce.

## Perguntas frequentes

**O suco de fruta é tão ruim quanto o refrigerante?**
Nutricionalmente mais próximo do que sua imagem saudável sugere — o suco tem o açúcar concentrado sem a fibra, embora retenha algumas vitaminas. A fruta inteira é nitidamente melhor; o suco é melhor tratado como bebida ocasional, não como item diário.

**Os adoçantes naturais (mel, agave) são mais saudáveis do que o açúcar?**
Marginalmente, na melhor das hipóteses — o corpo os processa de forma parecida. Eles ainda são açúcares livres concentrados; "natural" não muda o problema da dose e da velocidade.

**Preciso cortar o açúcar completamente?**
Não — o objetivo é reduzir o excesso de açúcar concentrado/adicionado, não eliminar toda a doçura. Fruta inteira, e guloseimas modestas dentro de uma dieta no geral boa, são perfeitamente razoáveis.${NOTE}`,
  },
  {
    topicKey: 'immune-boosting-myth',
    title: 'Dá Mesmo para "Fortalecer" o Seu Sistema Imunológico?',
    question: 'Suplementos ou alimentos podem de fato fortalecer o seu sistema imunológico, ou isso é um mito?',
    summary:
      'Você não consegue aumentar a imunidade como um botão — um sistema imunológico "turbinado" nem é desejável (é isso que são as alergias e as doenças autoimunes). O que você pode fazer é apoiar o funcionamento normal da imunidade com sono, nutrição, exercício e vacinas.',
    tags: ['saúde', 'imunidade', 'suplementos', 'bem-estar'],
    language: 'pt',
    image: {
      prompt: promptOf('immune-boosting-myth'),
      alt: 'Uma rede de defesa interna equilibrada apoiada em pilares fundamentais de luz',
    },
    sources: [
      { title: 'Harvard Health — como fortalecer o sistema imunológico', url: 'https://www.health.harvard.edu/staying-healthy/how-to-boost-your-immune-system' },
      { title: 'NIH — visão geral do sistema imunológico', url: 'https://www.niaid.nih.gov/research/immune-system-overview' },
    ],
    content: `# Dá Mesmo para "Fortalecer" o Seu Sistema Imunológico?

"Fortalecer a imunidade" é uma das frases mais lucrativas do marketing de bem-estar — estampada em suplementos, chás, sucos e pós. Ela também é fundamentalmente enganosa. O sistema imunológico não é um único botão que você gira para cima e, mesmo que você pudesse girá-lo, **você não ia querer** — um sistema imunológico hiperativo é precisamente o que causa alergias, doenças autoimunes e inflamação crônica. O objetivo realista e que vale a pena não é *turbinar*; é *apoiar o funcionamento normal*.

## Por que "fortalecer" é a palavra errada

Seu sistema imunológico é uma rede vasta e intrincada — muitos tipos de células, órgãos e moléculas de sinalização, equilibrando constantemente dois modos de falha: fraco demais (infecções passam) e forte demais (ataca o próprio corpo ou coisas inofensivas como o pólen). Saúde é **equilíbrio**, não ativação máxima. A imagem de marketing de acelerar a imunidade ao máximo descreve algo mais próximo de uma doença do que de bem-estar.

E nenhum alimento ou pílula "turbina" esse sistema numa pessoa saudável. Uma vez que você não está deficiente nos nutrientes de que a imunidade precisa, acrescentar mais não empurra a função acima do normal — a mesma lógica de retornos decrescentes das vitaminas. A ideia da megadose de vitamina C para esmagar um resfriado foi testada extensivamente, com efeitos, na melhor das hipóteses, modestos e inconsistentes.

## O que de fato apoia a função imunológica

Os fundamentos sem glamour têm evidência real — eles mantêm o sistema funcionando como foi projetado:

| Alavanca | Por que importa |
| --- | --- |
| **Sono** | Os processos imunológicos dependem dele; o sono curto eleva mensuravelmente a suscetibilidade a infecções |
| **Nutrição equilibrada** | Deficiências (ex.: zinco, vitamina D, proteína) prejudicam a defesa — corrija lacunas, não faça megadose |
| **Exercício regular** | A atividade moderada apoia a vigilância imunológica; o excesso extremo e crônico de treino pode suprimi-la |
| **Não fumar, limitar o álcool** | Ambos prejudicam as defesas imunológicas |
| **Manejo do estresse** | O estresse crônico desregula a sinalização imunológica |
| **Vacinação** | O único "treinamento" verdadeiro e direcionado da imunidade — de longe a ferramenta mais eficaz |

Repare que estes *viabilizam o funcionamento normal e corrigem déficits* — eles não empurram um sistema saudável para além do normal. Não há vantagem acima de "funcionar direito".

## A única forma real de "atualizar" a imunidade

Se algo merece a palavra, são as **vacinas** — e elas funcionam de um jeito nada parecido com um fortalecimento genérico. Uma vacina *ensina* seu sistema imunológico a reconhecer uma ameaça específica com antecedência, de modo que ele responda de forma rápida e eficaz àquele patógeno. É treinamento direcionado, não um botão de volume — a forma genuína e baseada em evidências de melhorar sua defesa contra doenças específicas.

## Perguntas frequentes

**A vitamina C previne resfriados?**
Para a maioria das pessoas, a suplementação regular não previne resfriados e, na melhor das hipóteses, os encurta ligeiramente. A reputação supera em muito a evidência; não é o escudo que vendem.

**Os suplementos para "fortalecer a imunidade" são uma cilada?**
A alegação é enganosa por design. Corrigir uma deficiência real ajuda; "turbinar" um sistema já suficiente é marketing. Guarde o dinheiro para sono e verduras — ou, contra doenças específicas, para vacinas.

**Por que eu fico mais doente quando estou estressado ou sem dormir?**
Porque ambos genuinamente prejudicam a função imunológica — este é o lado oposto do "apoiar". Você não consegue facilmente turbinar a imunidade acima do normal, mas consegue, sim, arrastá-la para baixo do normal, e essas são as principais formas.${NOTE}`,
  },
];
