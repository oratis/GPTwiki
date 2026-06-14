import type { DraftArticle } from './types';
import { careersWorkEn } from './careers-work.en';

// Batch: Careers & Job-Hunting (versao nativa em portugues). Mesmos topicKeys
// e mesma ordem de careers-work.en.ts; conteudo escrito de forma nativa para
// leitores de lingua portuguesa. As imagens sao compartilhadas por topicKey.

const promptOf = (key: string): string => {
  const hit = careersWorkEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const careersWorkPt: DraftArticle[] = [
  {
    topicKey: 'resume-that-works',
    title: 'Como escrever um currículo que realmente é lido',
    question: 'O que torna um currículo eficaz, e como passar pela triagem inicial?',
    summary:
      'O currículo é um material de marketing com uma única missão: conquistar um "sim" de 30 segundos. Os que funcionam começam por conquistas quantificadas, espelham a linguagem da vaga, mantêm um layout que as triagens automáticas conseguem ler e cortam tudo que não prove que você dá conta do cargo.',
    tags: ['carreira', 'busca de emprego', 'currículo', 'trabalho'],
    language: 'pt',
    image: { prompt: promptOf('resume-that-works'), alt: 'Feixe de luz destacando algumas conquistas quantificadas num documento limpo' },
    sources: [
      { title: 'Harvard Office of Career Services — guia de currículos e cartas de apresentação', url: 'https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/' },
      { title: 'U.S. Bureau of Labor Statistics — Occupational Outlook Handbook', url: 'https://www.bls.gov/ooh/' },
    ],
    content: `# Como escrever um currículo que realmente é lido

Um currículo não é a sua autobiografia — é **um material de marketing com um único objetivo: levar você à entrevista**. O recrutador que dá uma olhada nele leva mais ou menos uns poucos segundos para decidir "talvez" ou "não". Tudo num currículo eficaz decorre dessa economia brutal de atenção: comece pela sua prova mais forte, deixe-o fácil de bater o olho e corte qualquer coisa que não comprove que você consegue fazer *este* trabalho.

## Comece por conquistas, não por atribuições

O erro mais comum em currículos é listar responsabilidades — o que você *deveria* fazer — em vez de realizações — o que você de fato *conquistou*. Compare:

| Fraco (atribuição) | Forte (conquista) |
| --- | --- |
| "Responsável por gerenciar as redes sociais" | "Aumentei os seguidores no Instagram em 40% em 6 meses, gerando 1.200 leads" |
| "Atendia chamados de suporte ao cliente" | "Resolvi 50+ chamados/dia com 95% de satisfação, reduzindo o tempo de resposta em 30%" |
| "Trabalhei no sistema de checkout" | "Reconstruí o fluxo de checkout, reduzindo o abandono de carrinho em 18%" |

O padrão é **verbo de ação + o que você fez + resultado quantificado**. Números são a maior melhoria que a maioria dos currículos pode fazer: transformam afirmações vagas em prova. Até números aproximados ("~15%", "dezenas", "dobrei") batem nada, porque mostram que você pensa em termos de impacto.

## Adapte-o à vaga — e ao software de triagem

Currículos genéricos perdem para os personalizados. Leia a descrição da vaga, identifique as competências e palavras-chave que ela enfatiza e garanta que o seu currículo reflita aquelas que você realmente tem — com as próprias palavras da descrição. Isso importa em dobro: um humano percebe um encaixe óbvio, e muitas empresas passam os currículos por uma triagem automática (sistemas de rastreamento de candidatos) que procura termos relevantes. Para sobreviver à passagem automática, mantenha a formatação simples — títulos de seção padrão, sem texto enterrado em imagens, tabelas ou colunas que o leitor automático possa embaralhar. Um design esperto pode literalmente deixar a sua experiência invisível para o software.

## Corte sem dó

- **Tamanho:** uma página no início da carreira, duas com experiência substancial. Mais que isso sinaliza incapacidade de priorizar.
- **O objetivo profissional:** datado e desperdiça espaço. Um resumo curto do que você oferece é ótimo; "em busca de um cargo desafiador" não é.
- **Histórico antigo e irrelevante:** o trabalho de meio período de 15 anos atrás raramente merece o espaço que ocupa.
- **Enchimento óbvio:** "trabalhador e bom de equipe", "domínio de Microsoft Word". Mostre, não afirme.

Cada linha deve responder "isso me torna mais contratável para *este* cargo?". Se não, está diluindo as linhas que tornam.

## Perguntas frequentes

**Preciso de um currículo diferente para cada candidatura?**
Não do zero — mantenha uma versão-mãe e personalize o terço de cima (resumo, competências, primeiros tópicos) para cada vaga. É o direcionamento que converte; uma hora personalizando vale mais que cinquenta envios genéricos.

**Devo incluir foto, idade ou estado civil?**
No Brasil é comum anexar foto, mas em muitos países (EUA, Reino Unido, Canadá) não — convida ao viés e desperdiça espaço (as normas variam por país). Siga o costume da região-alvo; na dúvida, deixe o trabalho falar.

**Como lidar com lacunas no emprego?**
Não as esconda de forma desajeitada. Um enquadramento breve e honesto (cuidar da família, estudo, uma pausa planejada, busca de emprego) somado ao foco em competências mantidas atualizadas é bem melhor do que jogos suspeitos com datas. A maioria dos empregadores se importa mais com o que você sabe fazer agora do que com uma linha do tempo impecável e sem interrupções.`,
  },
  {
    topicKey: 'job-interview-prep',
    title: 'Como se preparar para uma entrevista de emprego',
    question: 'Como devo me preparar para uma entrevista de emprego para realmente ir bem?',
    summary:
      'O sucesso numa entrevista vem da preparação, não do carisma: pesquise a empresa, prepare histórias que comprovem suas competências usando uma estrutura como o STAR, ensaie em voz alta e encare como uma conversa de mão dupla em que você também avalia a empresa.',
    tags: ['carreira', 'busca de emprego', 'entrevistas', 'trabalho'],
    language: 'pt',
    image: { prompt: promptOf('job-interview-prep'), alt: 'Duas cadeiras iguais com luz fluindo nos dois sentidos e cartões de história prontos ao lado' },
    sources: [
      { title: 'U.S. Dept. of Labor CareerOneStop — preparação para entrevistas', url: 'https://www.careeronestop.org/JobSearch/Interview/interview-preparation.aspx' },
      { title: 'MIT Career Advising — entrevistas comportamentais e STAR', url: 'https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/' },
    ],
    content: `# Como se preparar para uma entrevista de emprego

Entrevistas recompensam a preparação muito mais do que o charme natural. O candidato que parece "naturalmente bom" na sala é quase sempre o que fez um trabalho invisível antes: pesquisou a empresa, mapeou as próprias histórias para o cargo e ensaiou até as respostas soarem naturais. Você não controla as perguntas, mas controla o quanto está preparado para as previsíveis — que são a maioria delas.

## Pesquise como se já trabalhasse lá

Antes da entrevista, conheça a empresa o suficiente para falar dela com especificidade: o que ela faz, quem são os clientes, notícias recentes e como o cargo a que você se candidata se encaixa. Isso compensa em dois pontos — você responde "por que você quer trabalhar aqui?" com substância em vez de bajulação, e faz perguntas mais afiadas. Entusiasmo genérico soa como "eu aceito qualquer emprego"; conhecimento específico soa como "eu quero *este*".

## Prepare histórias, não adjetivos

A maioria das entrevistas se apoia em **perguntas comportamentais** — "me conte sobre uma vez em que você…" — porque o comportamento passado prevê o futuro melhor do que a autodescrição. O erro é responder com traços ("sou ótimo em resolver problemas"). Responda com uma *história*, estruturada para causar efeito:

**STAR** mantém as histórias enxutas e completas:
- **Situação (Situation)** — o contexto, em poucas palavras.
- **Tarefa (Task)** — o que você precisava alcançar.
- **Ação (Action)** — o que *você* especificamente fez (não "nós").
- **Resultado (Result)** — o desfecho, quantificado se possível.

Prepare de 6 a 8 histórias flexíveis da sua experiência cobrindo temas comuns: um conflito, um fracasso e o que você aprendeu, um momento de liderança, um prazo apertado, uma vez em que você influenciou sem ter autoridade. A maioria das perguntas comportamentais é variação dessas, então um punhado de histórias bem construídas cobre um leque surpreendente.

## Ensaie em voz alta — e prepare suas próprias perguntas

Ler as respostas na cabeça não é ensaio; dizê-las em voz alta é. Praticar em voz alta (para um amigo, uma câmera ou uma sala vazia) expõe o enrolar e as falhas que a revisão silenciosa esconde, e faz a hora real parecer familiar. Prepare também as clássicas — "fale sobre você", "por que este cargo", "seu maior defeito" — e um fechamento forte: boas perguntas para *eles*. Perguntar sobre a equipe, os desafios ou como é o sucesso sinaliza interesse genuíno e te dá a informação para decidir se você sequer quer a vaga.

## Perguntas frequentes

**Como respondo "qual é o seu maior defeito"?**
Escolha um defeito real, mas não eliminatório, e — o que é crucial — o que você está fazendo a respeito. O ponto não é a falha, é se você tem autoconhecimento honesto e a vontade de melhorar. Evite a resposta falsa "eu trabalho demais"; não engana ninguém.

**E se eu não souber a resposta de uma pergunta técnica?**
Pense em voz alta e mostre o seu raciocínio, em vez de travar ou fingir que sabe. Os entrevistadores muitas vezes se importam mais com como você aborda o desconhecido do que com saber a resposta na hora. "Não tenho certeza, mas é assim que eu descobriria" é uma resposta forte.

**É uma entrevista, mas eu também estou avaliando a empresa — sério?**
Sim, e essa mentalidade ajuda você. Encarar como algo mútuo — você está decidindo se a vaga serve para você — reduz o desespero, melhora as suas perguntas e soa como confiança. Os melhores desfechos vêm do encaixe, não de "vencer" uma vaga que é errada para você.`,
  },
  {
    topicKey: 'salary-negotiation',
    title: 'Como negociar seu salário (sem perder a proposta)',
    question: 'Como negocio salário de forma eficaz, e é arriscado pedir mais?',
    summary:
      'Negociar é esperado, raramente custa a proposta e rende juros compostos por toda a sua carreira. As chaves: conhecer o seu valor de mercado, deixar o empregador dizer um número primeiro quando der, ancorar com uma faixa pesquisada e negociar o pacote inteiro — não só o salário-base.',
    tags: ['carreira', 'negociação salarial', 'dinheiro', 'trabalho'],
    language: 'pt',
    image: { prompt: promptOf('salary-negotiation'), alt: 'Uma balança equilibrando competências e moedas com espaço para acrescentar mais' },
    sources: [
      { title: 'U.S. Bureau of Labor Statistics — dados salariais por ocupação', url: 'https://www.bls.gov/oes/' },
      { title: 'Harvard Program on Negotiation — pesquisa sobre negociação salarial', url: 'https://www.pon.harvard.edu/category/daily/salary-negotiations/' },
    ],
    content: `# Como negociar seu salário (sem perder a proposta)

A maioria das pessoas aceita o primeiro número que recebe — e silenciosamente deixa dinheiro na mesa por anos, porque aumentos e propostas futuras costumam se construir sobre essa cifra inicial. Negociar parece arriscado e constrangedor, mas a realidade é tranquilizadora: **os empregadores esperam que você negocie, uma proposta quase nunca é retirada por uma contraproposta educada e razoável, e o ganho rende juros compostos ao longo de toda a sua carreira**. Alguns milhares a mais no início, multiplicados por décadas, valem muito mais do que o desconforto de uma única conversa.

## Saiba o seu número antes de falar

Quem negocia tendo feito a lição de casa tem um poder silencioso. Antes de qualquer conversa, pesquise a **faixa de mercado** do cargo — por título, localidade, setor e seu nível de experiência — usando sites de dados salariais, faixas salariais públicas e pessoas da sua rede. Isso te dá uma faixa defensável em vez de um chute esperançoso, e impede você tanto de se subvalorizar quanto de dizer algo tão fora da realidade que soe ingênuo. Tenha em mente três números: o seu alvo realista, o seu "ótimo resultado" e o seu piso de desistência.

## Deixe a empresa falar primeiro — depois ancore

Quando der, **evite ser o primeiro a dizer um número**. Se perguntarem suas expectativas cedo, tudo bem desconversar: "Gostaria de entender melhor o cargo e o pacote completo primeiro — qual é a faixa que vocês têm orçada?". O primeiro número concreto ancora a negociação, e é melhor que ele venha da empresa. Quando você for dizer uma cifra, dê uma **faixa pesquisada** com o seu alvo perto da base de onde você ficaria feliz, e amarre-a ao valor: "Com base na minha experiência com X e no mercado para este cargo, meu alvo é Y".

## Negocie o pacote inteiro e mantenha o tom colaborativo

O salário-base é a manchete, mas não é a única alavanca — e às vezes não é a mais flexível:

| Alavanca | Quando ajuda |
| --- | --- |
| Bônus de contratação | Cobre uma diferença quando o base está no teto |
| Participação / ações | Potencial relevante de ganho em startups e big techs |
| Férias / flexibilidade | Alto valor pessoal, baixo custo para o empregador |
| Cargo / data de início / momento da avaliação | Às vezes vale mais que um aumento pequeno |
| Verba de aprendizado, auxílio home office | "Sins" fáceis que agregam valor real |

Em todo momento, mantenha o tom **colaborativo, não adversarial**. Você não está brigando com a empresa; vocês estão resolvendo juntos "como fazer isso dar certo?". Um pedido caloroso, específico e bem pesquisado ("Estou animado com esta vaga — dá para chegar a Y no base?") quase nunca ofende, e sinaliza exatamente o tipo de confiança que os empregadores querem em quem contratam.

## Perguntas frequentes

**Pedir mais pode me custar a proposta?**
Muito raramente, se você for educado e razoável. Os empregadores esperam negociação e têm margem embutida. Uma contraproposta respeitosa sobre uma proposta real praticamente nunca a derruba; as histórias de terror quase sempre envolvem ultimatos agressivos, não pedidos normais.

**E se perguntarem o meu salário atual?**
Em muitos lugares você pode se recusar (e em alguns é até ilegal perguntar). Redirecione para o seu alvo com base no cargo e no mercado: "Prefiro focar no valor que eu traria para esta posição". O seu salário antigo não deveria limitar o novo.

**Devo negociar mesmo se a proposta já é boa?**
Geralmente vale a tentativa — uma única contraproposta educada costuma render mais, e um "não" só te devolve à proposta original. A assimetria favorece pedir. Mas, uma vez fechado o acordo, honre-o; não reabra um trato já acertado.`,
  },
  {
    topicKey: 'remote-work-effectively',
    title: 'Como trabalhar de forma remota sem esgotar nem travar a carreira',
    question: 'Como me mantenho produtivo, visível e são trabalhando remotamente?',
    summary:
      'O trabalho remoto troca o trânsito e o atrito do escritório por dois novos desafios: proteger a fronteira entre trabalho e casa, e permanecer visível quando ninguém vê você trabalhando. Vencer nisso exige comunicação deliberada, um fim de expediente firme e expor o seu trabalho de forma proativa.',
    tags: ['carreira', 'trabalho remoto', 'produtividade', 'trabalho'],
    language: 'pt',
    image: { prompt: promptOf('remote-work-effectively'), alt: 'Uma ilha-escrivaninha em casa ligada por luz a colegas distantes, com uma fronteira entre trabalho e descanso' },
    sources: [
      { title: 'Stanford — pesquisa de Nicholas Bloom sobre produtividade no trabalho remoto', url: 'https://www.gsb.stanford.edu/faculty-research/working-papers' },
      { title: 'CDC / NIOSH — equilíbrio entre vida e trabalho e bem-estar no trabalho remoto', url: 'https://www.cdc.gov/niosh/index.html' },
    ],
    content: `# Como trabalhar de forma remota sem esgotar nem travar a carreira

O trabalho remoto elimina custos óbvios — deslocamento, barulho do escritório, interrupções constantes — e silenciosamente acrescenta dois mais sutis. Primeiro, a fronteira entre trabalho e vida se dissolve quando o seu escritório é a sua casa, então o risco não é fazer corpo mole; é **nunca conseguir desligar**. Segundo, quando ninguém vê você fisicamente trabalhando, a visibilidade natural de um escritório desaparece, e um bom trabalho pode passar despercebido. Prosperar no remoto significa gerenciar deliberadamente as duas coisas.

## Proteja a fronteira

Num escritório, o deslocamento e o ato de ir embora criam um fim natural para o expediente. Em casa, esse ritual some, e "só mais uma coisinha" pode esticar o dia indefinidamente até as noites de semana e os fins de semana virarem uma massa única de trabalho. Reconstrua a fronteira de propósito:

- **Um fim de expediente firme.** Decida quando o trabalho termina e encene isso — feche o notebook, troque de roupa, saia da sala. Um pequeno ritual sinaliza "acabou" para o seu cérebro.
- **Um espaço dedicado**, nem que seja um canto. Trabalhar da cama ou do sofá treina o cérebro a nunca descansar de verdade *nem* focar de verdade.
- **Pausas de verdade.** Sem colegas te puxando para o almoço, você vai pular as pausas a menos que as agende. Saia de casa; movimente-se.

A verdade contraintuitiva: quem trabalha remoto tende a *trabalhar demais*, não de menos. Proteger as suas horas livres não é fazer corpo mole — é o que mantém você produtivo ao longo de meses em vez de esgotar de uma vez.

## Comunique-se deliberadamente e permaneça visível

Escritórios se comunicam por osmose — contexto ouvido de passagem, conversas de corredor, ocupação visível. O trabalho remoto não tem nada disso, então você precisa tornar a comunicação **explícita**:

- **Comunique status em excesso.** Compartilhe o que você está fazendo, o que está travado e o que você concluiu. O silêncio de quem trabalha remoto é lido como ausência, mesmo quando você está de cabeça baixa entregando.
- **Tenha o assíncrono e o escrito como padrão.** Atualizações escritas e claras batem torcer para que percebam o seu trabalho; elas também criam um registro e respeitam quem está em outros fusos.
- **Torne o seu impacto legível.** Isso não é se gabar — é repor a visibilidade que o escritório costumava fornecer de graça. Resuma resultados, demonstre o que você construiu, fale nas reuniões. Longe dos olhos vira silenciosamente longe do coração na hora da promoção, se você deixar.

## Combata o isolamento

O trabalho remoto pode ser solitário, e a solidão corrói tanto o bem-estar quanto a motivação. Mantenha contato humano deliberado: videochamadas ocasionais sem pauta, um cafezinho virtual, um encontro presencial quando der. A conexão é um insumo real do trabalho remoto sustentável, não um luxo.

## Perguntas frequentes

**Tenho menos chance de ser promovido trabalhando remoto?**
Existe um risco real de "viés de proximidade" — gestores favorecerem quem eles veem. Você o combate tornando o seu trabalho e os seus resultados bem visíveis, construindo relações intencionalmente e tendo conversas diretas de carreira com o seu gestor, em vez de supor que o bom trabalho fala por si.

**Como paro de trabalhar o tempo todo?**
Defina um fim de expediente firme e imponha-o com um ritual e separação física (feche o notebook, saia da sala, desligue as notificações). Trate o fim do seu dia como inegociável, igual a uma reunião. A fronteira não vai surgir sozinha.

**O trabalho remoto é mesmo tão produtivo?**
As pesquisas em geral concluem que quem trabalha remoto ou híbrido é pelo menos tão produtivo em trabalho focado, com os arranjos híbridos muitas vezes pontuando mais alto em satisfação e retenção. A questão da produtividade costuma ser menos sobre o local e mais sobre as normas de comunicação e a gestão.`,
  },
  {
    topicKey: 'career-networking',
    title: 'Networking para quem detesta networking',
    question: 'Como faço networking de forma eficaz se acho o networking tradicional constrangedor?',
    summary:
      'A maioria dos empregos e oportunidades flui por relações, não por candidaturas — mas networking eficaz não é puxar saco. É construir conexões genuínas sendo útil e curioso, manter contato leve e lembrar que os "laços fracos" (conhecidos) são os que mais abrem portas.',
    tags: ['carreira', 'networking', 'busca de emprego', 'trabalho'],
    language: 'pt',
    image: { prompt: promptOf('career-networking'), alt: 'Uma teia calorosa de nós que brilha mais forte onde as conexões são genuínas e recíprocas' },
    sources: [
      { title: 'Mark Granovetter, "The Strength of Weak Ties" (1973)', url: 'https://www.jstor.org/stable/2776392' },
      { title: 'U.S. Dept. of Labor CareerOneStop — networking', url: 'https://www.careeronestop.org/JobSearch/Network/network-with-people.aspx' },
    ],
    content: `# Networking para quem detesta networking

Se "networking" te faz imaginar conversa fiada forçada e distribuir cartões a estranhos, te venderam a pior versão de uma coisa genuinamente valiosa. Eis o novo enquadramento: **networking é só construir e manter relações de verdade** — e a maioria das oportunidades (empregos, clientes, parcerias, conselhos) viaja por gente que conhece você, não por candidaturas frias. Você não precisa virar extrovertido. Você precisa ficar útil e acessível.

## Por que conhecidos importam mais que amigos

Uma das descobertas mais famosas da sociologia, a "força dos laços fracos" de Mark Granovetter, explica o porquê: os seus amigos próximos em geral conhecem as mesmas pessoas e oportunidades que você já conhece. Os seus **laços fracos** — ex-colegas, colegas de faculdade, conhecidos — circulam em outros meios, então são eles que trazem à tona empregos e informações que você jamais ouviria de outro jeito. Isso é libertador para quem tem aversão a networking: você não precisa forjar laços profundos com todo mundo. Uma teia ampla e levemente mantida de conhecidos é exatamente o que abre portas.

## Dê antes de pedir

O networking que dá ânsia é o transacional — só procurar as pessoas quando você precisa de algo. O que funciona é o oposto: **seja útil primeiro**. Compartilhe um artigo que alguém valorizaria, faça uma apresentação, ofereça ajuda, parabenize uma conquista, responda uma pergunta na sua área. Esses pequenos atos genuínos constroem boa vontade sem segundas intenções, de modo que, quando você *de fato* precisar de algo depois, será um contato real e não um estranho com um pedido. O motor é a generosidade, não o charme.

A curiosidade dá conta do resto. A ansiedade do networking costuma vir da sensação de que você tem que impressionar; troque isso por interesse genuíno na outra pessoa — no que ela faz, no que ela está tentando resolver. As pessoas lembram de quem se interessou por *elas*, e curiosidade é bem mais fácil de sustentar do que atuação.

## Mantenha contato leve (a parte que todo mundo pula)

A maioria só faz networking quando está procurando emprego, que é o pior momento — desesperado e unilateral. A abordagem duradoura é o **contato leve e contínuo**: uma mensagem a cada poucos meses, um comentário no trabalho de alguém, um eventual "colocar o papo em dia". Custa pouco e significa que, quando você precisar de uma indicação ou de um conselho, estará procurando uma relação morna e não ressuscitando uma fria. Um "vi isto e lembrei de você" de duas linhas mantém uma conexão viva por anos.

## Perguntas frequentes

**Sou introvertido — será que sou só ruim nisso?**
Não. Introvertidos muitas vezes fazem networking *melhor* um a um, onde profundidade e escuta batem circular numa sala cheia. Pule os grandes eventos se você os detesta; construa um número menor de relações de verdade por meio de cafés, comunidades on-line e interesses em comum. Qualidade vence volume.

**Como peço ajuda sem sentir que estou usando as pessoas?**
Seja específico, facilite o "não" e respeite o tempo da pessoa ("Posso te fazer duas perguntas sobre X? Sem problema se você estiver atolado"). Pedidos específicos, modestos e fáceis de recusar soam como elogio, não como imposição — e a maioria das pessoas genuinamente gosta de ajudar quando o pedido é bem-feito.

**Networking on-line conta?**
Com certeza — participação atenciosa em comunidades profissionais, compartilhar trabalho útil e comentários genuínos constroem relações reais e alcance. Para muita gente é menos cansativo e mais eficaz do que eventos presenciais.`,
  },
  {
    topicKey: 'changing-careers',
    title: 'Como mudar de carreira (sem começar do zero)',
    question: 'Como faço a transição para uma nova área, e vou ter que começar tudo de novo?',
    summary:
      'Mudanças de carreira raramente significam começar do zero — a maioria das suas competências é transferível. O caminho é identificá-las, fechar lacunas específicas de propósito, construir prova por meio de projetos e contar uma história clara de por que a mudança faz sentido.',
    tags: ['carreira', 'mudança de carreira', 'competências', 'trabalho'],
    language: 'pt',
    image: { prompt: promptOf('changing-careers'), alt: 'Uma figura atravessando uma ponte feita de competências transferíveis rumo a uma nova ilha' },
    sources: [
      { title: 'U.S. Bureau of Labor Statistics — Occupational Outlook Handbook (competências transferíveis, perspectivas)', url: 'https://www.bls.gov/ooh/' },
      { title: 'CareerOneStop — avaliação de competências e ferramentas de mudança de carreira', url: 'https://www.careeronestop.org/' },
    ],
    content: `# Como mudar de carreira (sem começar do zero)

O medo que paralisa a maioria de quem quer mudar de carreira é "vou ter que recomeçar lá de baixo". Em geral, é falso. A não ser que você esteja migrando para algo altamente técnico e dependente de credenciais (como medicina ou direito), **a maior parte do que você construiu é transferível** — o truque é reconhecer isso, enquadrar e preencher só as lacunas específicas que restam. Uma mudança de carreira é uma ponte, não um abismo.

## Faça o inventário das suas competências transferíveis

As competências vêm em dois tipos. As **competências de domínio** são específicas da área (saber legislação tributária, escrever Python). As **competências transferíveis** vão a qualquer lugar: comunicação, gestão de projetos, análise, liderança, resolução de problemas, lidar com clientes, gerir orçamentos. A maior parte do seu valor mora na pilha das transferíveis, e ela acompanha você para uma nova área. Um professor que migra para treinamento corporativo carrega habilidades de apresentação, desenho de currículo e domínio de plateia; um jornalista que migra para o marketing carrega pesquisa, escrita e cumprir prazos. Antes de qualquer coisa, liste o que você realmente faz bem, independentemente do seu cargo atual — esse é o seu capital inicial.

## Feche a lacuna de propósito e depois prove

Uma vez definido o cargo-alvo, identifique as competências ou conhecimentos **específicos** que ele exige e que você ainda não tem — não "tudo", só as lacunas reais. Depois feche-as de propósito: um curso focado, uma certificação onde ela realmente pese, ou aprender fazendo. O crucial é **construir prova**. Na maioria das áreas, capacidade demonstrada bate credencial: uma peça de portfólio, um projeto freelance, um trabalho voluntário, um projeto paralelo ou uma contribuição para uma comunidade aberta mostram que você consegue fazer o novo trabalho, não apenas que tem interesse nele. A prova é o que transforma um candidato esperançoso em um candidato crível.

## Conte uma história coerente

Quem muda de carreira perde entrevistas não pela capacidade, mas por uma narrativa confusa. Os empregadores se preocupam: "Por que a mudança? Vai ficar? Consegue mesmo fazer isso?". Antecipe-se com uma história clara que enquadre a mudança como progressão lógica, não como fuga: o que te atraiu para a nova área, o que a conecta ao seu passado e por que o seu histórico incomum é um *ativo*, não um problema. "Meus anos em vendas me ensinaram exatamente onde os clientes têm dificuldade, e foi por isso que migrei para produto" bate um "eu só queria algo diferente" pedindo desculpas. O seu histórico misto é uma vantagem — apresente-o como tal.

## Perguntas frequentes

**Vou ter que aceitar um corte salarial?**
Às vezes, sobretudo ao entrar numa área totalmente nova num nível mais júnior — mas nem sempre, e raramente de volta ao zero. Competências transferíveis fortes, prova de capacidade e boa negociação limitam a queda, e a trajetória de longo prazo num trabalho mais adequado a você costuma mais do que recuperá-la.

**Estou velho demais para mudar de carreira?**
As pessoas mudam de carreira com sucesso em qualquer idade. Experiência e maturidade são ativos que os empregadores valorizam; as suas competências transferíveis e o seu histórico de entregar resultados não têm prazo de validade. O risco maior costuma ser ficar, por medo, num lugar errado para você.

**Preciso voltar a estudar?**
Muitas vezes não. A reeducação formal importa para áreas regulamentadas (saúde, direito, engenharia), mas para muitos cargos cursos direcionados somados a um portfólio de trabalho real te levam lá mais rápido e mais barato. Busque um diploma só quando a área realmente o exigir.`,
  },
  {
    topicKey: 'work-burnout',
    title: 'Burnout: o que ele realmente é e como se recuperar',
    question: 'O que é burnout, como ele se diferencia do estresse comum e como me recupero?',
    summary:
      'Burnout é o estresse crônico no trabalho que sobrecarregou a sua capacidade de lidar com ele — marcado por exaustão, cinismo e queda de eficácia. É um problema sistêmico, não fraqueza pessoal, e recuperar-se costuma exigir mudar as condições, não apenas descansar com mais afinco.',
    tags: ['trabalho', 'burnout', 'saúde mental', 'bem-estar'],
    language: 'pt',
    image: { prompt: promptOf('work-burnout'), alt: 'Uma lanterna quase apagada restaurada ao remover pesos e deixar o ar entrar, não ao forçá-la' },
    sources: [
      { title: 'Organização Mundial da Saúde — burnout como fenômeno ocupacional (CID-11)', url: 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases' },
      { title: 'Maslach & Leiter — pesquisa sobre as dimensões do burnout', url: 'https://www.apa.org/monitor/2022/01/special-burnout-stress' },
    ],
    content: `# Burnout: o que ele realmente é e como se recuperar

Burnout é mais do que "estou cansado" ou "esta semana foi puxada". A Organização Mundial da Saúde o define especificamente como uma síndrome resultante de **estresse crônico no trabalho que não foi gerenciado com sucesso**. Ele tem três marcas: **exaustão** profunda (esgotamento físico e emocional), **cinismo** (distanciamento ou negatividade crescentes em relação ao trabalho) e uma sensação de **eficácia reduzida** (sentir que você não faz mais um bom trabalho, por mais que se esforce). Se esse trio soa familiar, vale levar a sério — e vale saber que é um fenômeno ocupacional reconhecido, não um defeito de caráter.

## Estresse vs burnout — uma diferença importante

O estresse comum é "demais" — exigências demais, mas você ainda consegue imaginar alívio do outro lado. O burnout é "vazio" — você está esgotado, desengajado, e um fim de semana de folga já não recarrega. O estresse parece se afogar em responsabilidades; o burnout parece estar ressecado e além do "ligar para isso". A distinção importa porque as soluções diferem: o estresse pode ceder com melhor gestão de tempo ou uma pausa, enquanto o burnout genuíno costuma exigir mudar as **condições** que o causaram, não apenas descansar com mais afinco e voltar à mesma roda-viva.

## Em geral é a situação, não você

O reenquadramento mais importante: o burnout é em grande parte movido pelo **ambiente de trabalho**, não por fraqueza pessoal. As pesquisas o ligam de forma consistente a condições específicas:

| Fator | Como se manifesta |
| --- | --- |
| Carga de trabalho insustentável | Sobrecarga crônica sem recuperação |
| Falta de controle | Nenhuma voz sobre como ou quando você trabalha |
| Recompensa insuficiente | Esforço não reconhecido, mal pago, invisível |
| Injustiça | Favoritismo, confiança quebrada, incoerência |
| Conflito de valores | Ser obrigado a agir contra os seus princípios |
| Ruptura da comunidade | Isolamento, conflito, nenhum apoio |

Repare que esses fatores são em sua maioria *organizacionais*, não individuais. É por isso que "é só fazer ioga e dormir mais" tantas vezes falha como cura — o autocuidado pode ajudar você a lidar, mas não conserta um trabalho fundamentalmente insustentável. Recuperar-se frequentemente significa renegociar carga de trabalho, fronteiras, função, ou às vezes o próprio emprego.

## A recuperação

A recuperação de verdade tende a combinar o pessoal e o estrutural: descanso e desconexão genuínos para reabastecer o tanque; reafirmar fronteiras (dizer não, proteger as horas livres); reconectar-se com aquilo que dava sentido ao trabalho; e — muitas vezes o passo decisivo — **mudar as condições**, seja conversando com o seu gestor sobre carga e controle, reestruturando a sua função ou seguindo em frente. O apoio também importa: o burnout prospera no isolamento, e conversar com as pessoas (inclusive com um profissional, se for grave) faz parte da saída, não é uma admissão de fracasso.

## Perguntas frequentes

**Dá para se recuperar do burnout sem pedir demissão?**
Muitas vezes sim — se os fatores subjacentes puderem mudar. Renegociar a carga de trabalho, ganhar mais controle, fixar fronteiras mais firmes e mudar a sua função podem bastar. Mas, se as condições são fixas e tóxicas, às vezes sair é a escolha mais saudável e racional, não uma derrota.

**Burnout é a mesma coisa que depressão?**
Eles se sobrepõem e podem coexistir, mas o burnout está especificamente ligado ao trabalho, enquanto a depressão é mais ampla e permeia toda a vida. Humor baixo persistente, desesperança ou pensamentos de autoagressão vão além do burnout e merecem ajuda profissional sem demora.

**Umas férias resolvem?**
Uma pausa pode aliviar a exaustão aguda, mas, se você voltar exatamente para as condições que te esgotaram, o burnout costuma reaparecer em semanas. O descanso trata o sintoma; mudar as condições trata a causa.`,
  },
  {
    topicKey: 'cover-letter',
    title: 'Carta de apresentação ainda importa — e como escrever uma boa?',
    question: 'Cartas de apresentação ainda valem a pena, e o que uma delas deve de fato dizer?',
    summary:
      'Cartas de apresentação hoje costumam ser opcionais, mas, bem-feitas, ainda desempatam decisões apertadas. Uma boa carta não é o currículo em prosa — ela argumenta por que você e a vaga combinam, mostra que você entende a empresa e acrescenta o contexto que o currículo não carrega.',
    tags: ['carreira', 'busca de emprego', 'carta de apresentação', 'trabalho'],
    language: 'pt',
    image: { prompt: promptOf('cover-letter'), alt: 'Uma carta se desdobrando em um único feixe que liga uma pessoa a uma empresa' },
    sources: [
      { title: 'Harvard Office of Career Services — guia de cartas de apresentação', url: 'https://careerservices.fas.harvard.edu/resources/create-a-strong-cover-letter/' },
      { title: 'CareerOneStop — fundamentos da carta de apresentação', url: 'https://www.careeronestop.org/JobSearch/Resumes/cover-letters.aspx' },
    ],
    content: `# Carta de apresentação ainda importa — e como escrever uma boa?

A resposta honesta sobre se cartas de apresentação ainda importam: **depende, e elas são opcionais com mais frequência do que costumavam ser** — mas uma carta forte ainda desempata casos apertados a seu favor, e uma fraca ou ausente pode te custar caro quando um gestor decide entre candidatos parecidos. Trate a carta de apresentação como uma opção de alta alavancagem: pule onde ela é genuinamente dispensável, invista onde ela pode te diferenciar.

## Para que serve de fato uma carta de apresentação

O maior erro é escrever uma carta que apenas repete o currículo em parágrafos. O currículo já lista *o que* você fez; o trabalho da carta é fazer o **argumento** que o currículo não consegue — especificamente, *por que você e esta vaga são um forte encaixe*. Uma boa carta faz três coisas que o currículo não faz:

- **Mostra que você entende a empresa e a vaga** — específico, não bajulação genérica — provando que você realmente quer *este* emprego.
- **Conecta a sua experiência às necessidades deles** — "vocês precisam de X; aqui está a vez em que eu entreguei exatamente isso".
- **Acrescenta contexto** que o currículo não carrega — uma mudança de carreira explicada, uma lacuna esclarecida, um entusiasmo incomum por uma missão específica.

## Uma estrutura simples e eficaz

| Parte | Função |
| --- | --- |
| **Abertura** | Fisgue o leitor — por que esta vaga/empresa especificamente, e não "venho por meio desta me candidatar a…" |
| **Meio (1 a 2 parágrafos)** | A sua prova mais forte e relevante, amarrada às necessidades *deles*, com um exemplo concreto |
| **Fechamento** | Reafirme o encaixe, de forma breve e confiante, com um próximo passo claro |

Mantenha em **uma página, três ou quatro parágrafos enxutos**. Dirija-se a uma pessoa real se você conseguir descobrir uma. Comece com algo específico e cheio de energia; a abertura genérica "venho por meio desta manifestar meu interesse na vaga" desperdiça a sua melhor linha. E personalize cada carta — uma carta reciclada, feita de "localizar e substituir", costuma ser pior do que nenhuma, porque as emendas aparecem.

## Quando vale a pena (e quando não)

Escreva uma carta de apresentação genuína quando: a candidatura pede uma, você está mudando de carreira ou tem uma lacuna a explicar, você é especialmente apaixonado por aquela empresa específica, ou é uma vaga competitiva em que qualquer vantagem ajuda. Pule ou minimize quando o formulário deixa claro que é opcional e você não tem nada a acrescentar além do currículo — uma carta feita nas coxas não agrega nada e pode até subtrair. A regra: escreva uma quando tiver um *argumento real e específico* a fazer; não encha linguiça quando não tiver.

## Perguntas frequentes

**Devo usar IA para escrever a minha carta de apresentação?**
Como apoio na hora de rascunhar, tudo bem — mas resultado genérico de IA soa genérico, que é exatamente o modo de falha a evitar. Use-a para começar e depois deixe específico: detalhes reais sobre a empresa, exemplos reais da sua vida, a sua voz de verdade. A especificidade é o ponto inteiro, e só você a tem.

**Quão formal ela deve ser?**
Combine com a cultura da empresa — um tom polido para um escritório de advocacia, um mais caloroso para uma startup descontraída — mas sempre profissional e sem erros. Um único erro de digitação num documento curto e deliberado salta aos olhos de um jeito ruim.

**E se eu não encontrar o nome do gestor de contratação?**
"Prezada equipe de recrutamento" ou "Prezada equipe de [departamento]" está ótimo. Evite o datado "A quem possa interessar". Uma breve pesquisa (o site da empresa, o LinkedIn) às vezes revela um nome, e o pequeno esforço pode demonstrar cuidado.`,
  },
  {
    topicKey: 'asking-for-raise',
    title: 'Como pedir um aumento (e realmente conseguir)',
    question: 'Como peço um aumento, e o que me dá a melhor chance de ouvir um sim?',
    summary:
      'Conseguir um aumento é um argumento que você constrói, não um favor que você pede. Documente o seu impacto, pesquise o seu valor de mercado, escolha bem o momento e enquadre tudo em torno do valor que você entrega — depois peça de forma direta e específica, em vez de torcer para ser notado.',
    tags: ['carreira', 'salário', 'aumento', 'trabalho'],
    language: 'pt',
    image: { prompt: promptOf('asking-for-raise'), alt: 'Blocos de conquista empilhados subindo com uma seta de valor enquanto mais um é acrescentado' },
    sources: [
      { title: 'Harvard Program on Negotiation — pedir um aumento', url: 'https://www.pon.harvard.edu/category/daily/salary-negotiations/' },
      { title: 'U.S. Bureau of Labor Statistics — dados de salários e rendimentos', url: 'https://www.bls.gov/bls/wages.htm' },
    ],
    content: `# Como pedir um aumento (e realmente conseguir)

Esperar quieto para ser recompensado pelo bom trabalho é a estratégia de aumento mais comum, e uma das piores. Gestores são ocupados, orçamentos são finitos, e quem range a roda — de forma razoável — recebe a graxa. O reenquadramento que muda tudo: **um aumento é um argumento de negócio que você constrói e apresenta, não um favor pessoal que você pede**. O seu trabalho é tornar o "sim" fácil e bem fundamentado para o seu gestor — e isso exige preparação, não só coragem.

## Construa o argumento: documente o seu impacto

Muito antes da conversa, mantenha um registro contínuo das suas **conquistas e do seu impacto** — projetos entregues, problemas resolvidos, receita influenciada, custos cortados, responsabilidades que cresceram além da sua função original. Detalhes com números são a sua prova: "liderei o projeto que trouxe X" ou "assumi as atribuições do cargo sênior que ficou vago por seis meses". A memória é pouco confiável e uma lembrança interesseira não convence; um registro concreto deixa você entrar com prova em vez de sentimentos. O argumento mais forte mostra que você já opera acima do que recebe hoje.

## Conheça o seu valor de mercado e escolha bem o momento

Combine o seu argumento interno com **dados externos**: quanto este cargo paga em outros lugares, para a sua experiência e a sua localidade? Se você é pago abaixo do mercado pelo que entrega, esse é um argumento poderoso e objetivo. Quanto ao **momento**, as suas chances sobem em ocasiões naturais — depois de uma vitória clara, no ciclo de avaliação, quando você assumiu mais, ou quando a empresa vai bem. Evite pedir logo depois de a equipe não bater as metas, durante um congelamento de contratações, ou quando o seu gestor está visivelmente afogado. Ler o momento faz parte do pedido.

## Faça o pedido: direto, específico, enquadrado em valor

Quando chegar a hora, seja **direto e específico**. Não dê indiretas nem torça para que infiram — diga com clareza que você gostaria de conversar sobre a sua remuneração, apresente o seu argumento (impacto + dados de mercado) e diga um número ou faixa específicos. Enquadre em torno do **valor, não da necessidade**: "Com base nas minhas contribuições e no mercado para este cargo, eu gostaria de levar o meu salário a Y", e não "minhas despesas aumentaram". Depois pare de falar e deixe a empresa responder. Se a resposta for "agora não", transforme-a em progresso: pergunte exatamente o que precisaria ser verdade para merecê-lo, e até quando — convertendo um não num roteiro concreto.

## Perguntas frequentes

**E se disserem não?**
Não trate como o fim. Pergunte quais resultados ou prazo específicos tornariam um sim possível, e coloque por escrito se conseguir. Um caminho claro ("bata estas metas, revisamos em seis meses") é uma vitória. Se a resposta honesta for "nunca", essa é uma informação importante sobre ficar ou não.

**Devo mencionar uma proposta concorrente?**
Só se ela for real e você de fato consideraria aceitá-la — blefar pode sair muito caro. Uma proposta real é alavancagem, mas usá-la também pode mudar a relação, e alguns gestores vão deixar você ir. Pondere com cuidado, em vez de brandi-la à toa.

**Para conseguir aumento, é melhor trocar de emprego?**
Muitas vezes mudanças externas rendem saltos maiores do que aumentos internos, o que vale saber — mas trocar tem custos (risco, tempo de adaptação, antiguidade perdida). Use esse conhecimento para se precificar com precisão; deixe-o embasar o seu pedido interno antes de concluir que sair é o único caminho.`,
  },
  {
    topicKey: 'imposter-syndrome',
    title: 'Síndrome do impostor: por que pessoas capazes se sentem fraudes',
    question: 'O que é a síndrome do impostor, por que é tão comum e como lido com ela?',
    summary:
      'A síndrome do impostor é o sentimento persistente de ser uma fraude apesar de competência real, comum justamente entre pessoas capazes. Ela se alimenta de atribuir o sucesso à sorte e de temer ser desmascarada — e cede quando você reúne provas, normaliza o sentimento e age apesar da dúvida.',
    tags: ['trabalho', 'síndrome do impostor', 'autoconfiança', 'bem-estar'],
    language: 'pt',
    image: { prompt: promptOf('imposter-syndrome'), alt: 'Uma figura capaz com uma sombra encolhida ao lado de um espelho que mostra a sua forma verdadeira' },
    sources: [
      { title: 'Clance & Imes, "The Imposter Phenomenon in High Achieving Women" (1978)', url: 'https://psycnet.apa.org/record/1979-26502-001' },
      { title: 'American Psychological Association — visão geral do fenômeno do impostor', url: 'https://www.apa.org/monitor/2021/06/cover-impostor-phenomenon' },
    ],
    content: `# Síndrome do impostor: por que pessoas capazes se sentem fraudes

A síndrome do impostor é a sensação persistente e incômoda de que você é uma fraude que enganou todo mundo — de que você não merece de verdade o seu cargo, e que a qualquer momento será "desmascarado" — *apesar* de provas claras da sua competência. A parte mais cruel é o paradoxo: ela atinge mais as pessoas capazes e realizadas, porque sentir-se um impostor exige já ter conquistado o bastante para achar que talvez não mereça. Descrita pela primeira vez em 1978 (originalmente estudando mulheres de alto desempenho, embora hoje se saiba que afeta pessoas de todo tipo), ela é extraordinariamente comum — a maioria das pessoas a sente em algum momento, sobretudo ao se esticar rumo a algo novo.

## Por que ela persiste: as armadilhas do pensamento

Os sentimentos de impostor funcionam a partir de alguns hábitos mentais autossabotadores:

- **Desconto do sucesso.** Quando as coisas dão certo, você credita à sorte, ao momento ou ao "eles só gostam de mim" — qualquer coisa, menos à sua própria capacidade. As vitórias nunca atualizam a sua autoimagem.
- **Apropriação do fracasso.** Quando as coisas dão errado, *isso* você atribui diretamente a si mesmo. Então a prova só flui num sentido: rumo ao "não sou bom o bastante".
- **Comparar o seu interior com o exterior dos outros.** Você mede as suas dúvidas privadas contra a superfície polida de todo mundo, sem nunca ver que eles muitas vezes também fingem confiança.
- **Mudar a trave do gol.** Cada conquista é redefinida como "não foi tão difícil assim" no instante em que você a alcança, de modo que você nunca sente que de fato teve sucesso.

Juntos, esses hábitos criam um ciclo fechado em que nenhuma quantidade de conquista jamais parece suficiente — e é por isso que quem mais realiza pode senti-la com mais intensidade.

## O que de fato ajuda

Você raramente *pensa* para sair dos sentimentos de impostor, mas consegue afrouxar o domínio deles:

| Abordagem | Por que funciona |
| --- | --- |
| Manter um arquivo de provas (vitórias, elogios, resultados) | Contraria o hábito do cérebro de descontar o sucesso |
| Dar nome a isso e conversar sobre o assunto | Descobrir que colegas sentem o mesmo rompe o isolamento |
| Separar sentimentos de fatos | "Eu me sinto uma fraude" não é "eu sou uma fraude" |
| Reenquadrar a dúvida como crescimento | Sentir-se esticado em geral significa que você está aprendendo, não fracassando |
| Agir apesar do sentimento | A confiança costuma vir depois da ação; esperar se sentir pronto raramente dá certo |

O reenquadramento mais libertador de todos: **o sentimento não é prova**. Sentir-se uma fraude nada diz sobre você de fato ser uma — e o próprio fato de você se preocupar em ser bom o bastante já é sinal de consciência, não de fraude. (Vale notar: fraudes de verdade raramente se preocupam com isso.)

## Perguntas frequentes

**A síndrome do impostor algum dia some de vez?**
Para a maioria das pessoas, ela retorna, sobretudo a cada novo desafio ou nível — o que é normal e até um sinal de que você está crescendo. O objetivo não é eliminá-la, mas parar de deixar que ela mande: sinta a dúvida e siga em frente mesmo assim.

**Uma pitada de autodúvida é, na verdade, saudável?**
Sim. Um pouco de humildade mantém você aprendendo, aberto a feedback e livre de arrogância. O problema só surge quando a dúvida vira crônica e paralisante — segurando você de aproveitar oportunidades, de falar ou de pedir o que você merece.

**Como apoio alguém com síndrome do impostor?**
Seja específico no seu reconhecimento — "a sua análise pegou um problema de verdade" cai melhor do que "você é ótimo". Normalize compartilhando as suas próprias dúvidas e desafie com delicadeza o desconto que a pessoa faz das próprias vitórias. Saber que um colega respeitado também sente isso costuma ser a coisa mais reconfortante de todas.`,
  },
];
