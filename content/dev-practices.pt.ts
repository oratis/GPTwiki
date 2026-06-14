import type { DraftArticle } from './types';
import { devPracticesEn } from './dev-practices.en';

// Batch: Programming & Development (versão nativa em português). Mesmos temas e
// mesmos topicKeys de dev-practices.en.ts, escritos de forma nativa para o
// contexto de desenvolvedores brasileiros. As imagens são compartilhadas.

const promptOf = (key: string): string => {
  const hit = devPracticesEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const devPracticesPt: DraftArticle[] = [
  {
    topicKey: 'rebase-vs-merge',
    title: 'Git rebase vs merge: quando usar cada um',
    question: 'Qual é a diferença entre git merge e git rebase, e quando devo usar cada um?',
    summary:
      'O merge preserva o histórico exatamente como aconteceu, criando um commit de merge; o rebase reescreve seus commits sobre uma nova base para um histórico limpo e linear. Use merge em branches compartilhados e rebase no seu trabalho privado antes de compartilhar.',
    tags: ['programação', 'git', 'controle de versão', 'ferramentas de desenvolvimento'],
    language: 'pt',
    image: {
      prompt: promptOf('rebase-vs-merge'),
      alt: 'Dois trilhos se unindo num entroncamento vs um trilho reassentado em uma única linha reta',
    },
    sources: [
      { title: 'Livro Pro Git — Rebasing', url: 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing' },
      { title: 'Atlassian — Merging vs Rebasing', url: 'https://www.atlassian.com/git/tutorials/merging-vs-rebasing' },
    ],
    content: `# Git rebase vs merge: quando usar cada um

Tanto o \`merge\` quanto o \`rebase\` resolvem o mesmo problema — combinar o trabalho de um branch em outro — mas contam duas histórias diferentes sobre como isso aconteceu. O merge registra o histórico *como ele de fato ocorreu*, com ramificações e tudo. O rebase *reescreve* o histórico para parecer que você trabalhou em linha reta o tempo todo. Nenhum é "o correto"; cada um é otimizado para objetivos diferentes, e a regra famosa que os governa decorre diretamente do que cada um faz.

## O que cada comando realmente faz

O **merge** pega os dois branches e os amarra com um novo **commit de merge** que tem dois pais. Os commits do seu branch ficam exatamente onde estavam; o commit de merge une as linhas do tempo. O histórico vira um grafo que mostra honestamente "estes evoluíram em paralelo e depois se juntaram".

O **rebase**, em vez disso, recolhe os commits do seu branch, os põe de lado, vai até a ponta do branch de destino e **reaplica seus commits um a um** sobre ela. O resultado é uma linha reta — como se você tivesse começado seu trabalho a partir do código mais recente. Mas esses commits reaplicados são *commits novos, com novos IDs*; os originais são descartados. Esse é o detalhe crucial: o rebase reescreve o histórico.

## O trade-off

| | Merge | Rebase |
| --- | --- | --- |
| Forma do histórico | Grafo ramificado, fiel aos fatos | Linha reta e limpa |
| Cria novos commits? | Um commit de merge | Reescreve todos os commits reaplicados |
| Preserva o contexto | Sim — mostra quando/onde o trabalho divergiu | Não — achata a história |
| Tratamento de conflitos | Resolve uma vez, no merge | Pode resolver por commit durante a reaplicação |
| Seguro em branches compartilhados | Sim | Não — reescreve a base dos outros |

## A única regra que evita desastres

**Nunca faça rebase de commits que outras pessoas já têm.** Como o rebase substitui commits por novos, fazer rebase de um branch compartilhado/público reescreve o histórico sobre o qual os outros já basearam trabalho — quando eles fizerem o próximo pull, o histórico deles e o seu não vão bater, produzindo commits duplicados e uma confusão dolorosa. A regra de ouro: *faça rebase do trabalho local e privado; faça merge de qualquer coisa compartilhada.*

Um fluxo comum e seguro combina os dois: enquanto desenvolve um branch de feature sozinho, faça periodicamente o **rebase dele sobre a main mais recente** para se manter atualizado com um histórico limpo; depois, para integrá-lo à main compartilhada, faça **merge** (em geral via pull request). Você fica com um histórico local arrumado e uma integração honesta e não destrutiva.

## Orientações práticas

- **Use merge** para trazer um branch concluído para um branch compartilhado, e sempre que o branch for público.
- **Use rebase** para atualizar seu branch privado em andamento sobre novos commits da main, e para arrumar seus próprios commits locais bagunçados (rebase interativo) antes da revisão.
- **Evite rebase** na \`main\`/branches compartilhados, e pare se não tiver certeza se alguém já tem seus commits.

## Perguntas frequentes

**O rebase apaga meu trabalho?**
Não — ele reescreve commits, mas as mudanças são preservadas (e os commits antigos permanecem no reflog para recuperação). Ele muda os IDs e a ordem dos commits, não o conteúdo das suas edições.

**Por que alguns times proíbem commits de merge?**
Eles preferem um histórico perfeitamente linear, mais fácil de ler e de fazer bisect, então exigem rebase antes do merge (ou "squash merge"). É uma escolha de estilo com trade-offs reais, não uma questão de certo ou errado.

**O que é squash merge?**
Ele condensa todos os commits de um branch em um único commit no branch de destino — um histórico arrumado de um commit por feature, ao custo de perder a granularidade dos commits individuais do branch.`,
  },
  {
    topicKey: 'rest-vs-graphql',
    title: 'REST vs GraphQL: qual estilo de API escolher?',
    question: 'Qual é a diferença entre APIs REST e GraphQL, e quando devo usar cada uma?',
    summary:
      'REST expõe muitos endpoints fixos, cada um retornando um formato pré-definido; GraphQL expõe um único endpoint onde o cliente pede exatamente os campos que quer. GraphQL brilha em necessidades de dados complexas e variadas; REST continua mais simples, cacheável e onipresente.',
    tags: ['programação', 'api', 'rest', 'graphql'],
    language: 'pt',
    image: {
      prompt: promptOf('rest-vs-graphql'),
      alt: 'Muitas vending machines fixas vs um único balcão atendendo um pedido sob medida exato',
    },
    sources: [
      { title: 'GraphQL — introdução oficial', url: 'https://graphql.org/learn/' },
      { title: 'MDN — Visão geral dos conceitos de HTTP e REST', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
    ],
    content: `# REST vs GraphQL: qual estilo de API escolher?

REST e GraphQL são duas maneiras de projetar como os clientes pedem dados a um servidor. O **REST** te dá muitas URLs (endpoints), cada uma retornando um pedaço fixo de dados. O **GraphQL** te dá um único endpoint e uma linguagem de consulta, então o cliente especifica *exatamente* quais campos quer e recebe precisamente isso — nem mais, nem menos. O contraste se resume a quem decide o formato da resposta: o servidor (REST) ou o cliente (GraphQL).

## Como diferem na prática

Digamos que você queira o nome de um usuário e os títulos dos três últimos posts dele.

**Com REST**, você normalmente chama \`/users/123\` (retorna o objeto de usuário inteiro) e depois \`/users/123/posts\` (retorna os objetos de post completos). Você recebeu muito mais do que pediu (todos os campos de usuário e de post) e fez duas idas e vindas. Esses são os atritos clássicos do REST: **over-fetching** (campos demais) e **under-fetching** (precisar de mais chamadas para montar uma visão).

**Com GraphQL**, você envia uma única consulta a um único endpoint pedindo \`user.name\` e \`user.posts(last: 3).title\`, e recebe exatamente esses campos em uma resposta. O cliente obteve precisamente os seus dados em uma única requisição.

## A tabela de trade-offs

| | REST | GraphQL |
| --- | --- | --- |
| Endpoints | Muitos, baseados em recursos | Um |
| Formato da resposta | Fixado pelo servidor | Escolhido pelo cliente |
| Over/under-fetching | Comum | Evitado por design |
| Cache | Simples (cache HTTP por URL) | Mais difícil (uma URL, consultas variadas) |
| Curva de aprendizado e ferramentas | Menor, universal | Maior; exige um schema e uma camada de servidor |
| Versionamento | Geralmente /v1, /v2 | Evoluir o schema, deprecar campos |
| Melhor para | Recursos simples, estáveis e cacheáveis | Dados complexos, aninhados e que variam por cliente |

## Quando escolher cada um

**Recorra ao REST quando** seus dados forem relativamente simples e no formato de recursos, você quiser apoiar-se em cache e ferramentas HTTP maduros, estiver construindo uma API pública que muitos clientes desconhecidos vão consumir, ou simplesmente quiser a opção de menor atrito e mais universalmente compreendida. O REST ainda é o padrão por bons motivos.

**Recorra ao GraphQL quando** os clientes precisarem de muitas fatias diferentes de dados ricamente conectados (clássico em apps mobile que minimizam requisições e em dashboards complexos), você estiver agregando várias fontes de backend atrás de um único grafo, ou os times de front-end quiserem iterar nas necessidades de dados sem esperar por novos endpoints. O custo é a complexidade adicional no servidor, um schema para manter e um cache mais difícil.

## Perguntas frequentes

**O GraphQL é "melhor" que o REST?**
Não — ele resolve o over/under-fetching de forma elegante, mas adiciona complexidade e desafios de cache. Para APIs simples, o REST costuma ser a melhor escolha de engenharia. Combine a ferramenta com as necessidades de dados.

**Posso usar os dois?**
Sim, e é comum — muitos sistemas expõem REST para superfícies simples/públicas e GraphQL para dados complexos internos/de app, ou envolvem serviços REST atrás de um gateway GraphQL.

**O GraphQL substitui o banco de dados?**
Não — ele é uma camada de consulta de API entre o cliente e o servidor. Seu servidor ainda busca dados em bancos de dados ou outros serviços; o GraphQL apenas modela o que o cliente recebe.`,
  },
  {
    topicKey: 'sql-vs-nosql',
    title: 'SQL vs NoSQL: como escolher um banco de dados',
    question: 'Qual é a diferença entre bancos de dados SQL e NoSQL, e como faço para escolher?',
    summary:
      'Bancos SQL armazenam linhas estruturadas com um schema fixo e consultas relacionais poderosas; o NoSQL troca parte dessa estrutura por flexibilidade e escalabilidade horizontal mais fácil. A escolha certa depende do formato dos seus dados, das suas necessidades de consistência e da escala.',
    tags: ['programação', 'bancos de dados', 'sql', 'nosql'],
    language: 'pt',
    image: {
      prompt: promptOf('sql-vs-nosql'),
      alt: 'Uma grade rígida de células interligadas vs um agrupamento flexível de recipientes variados',
    },
    sources: [
      { title: 'MongoDB — Bancos NoSQL vs SQL', url: 'https://www.mongodb.com/resources/basics/databases/nosql-explained' },
      { title: 'PostgreSQL — sobre (banco de dados relacional)', url: 'https://www.postgresql.org/about/' },
    ],
    content: `# SQL vs NoSQL: como escolher um banco de dados

"SQL vs NoSQL" classifica os bancos de dados pela forma como organizam os dados. Os **bancos SQL (relacionais)** — PostgreSQL, MySQL e outros — armazenam dados em tabelas de linhas e colunas com um schema predefinido, e ligam tabelas por relacionamentos. **NoSQL** é um guarda-chuva para todo o resto: bancos de documentos, de chave-valor, de coluna larga e de grafos, que relaxam a estrutura rígida de tabelas em troca de flexibilidade e escala. A decisão não é sobre mais novo versus mais antigo; é sobre adequar o banco ao formato dos seus dados e às demandas do seu sistema.

## A diferença central: schema e estrutura

Um banco **relacional** insiste em estrutura desde o início: você define tabelas e tipos de coluna, toda linha se conforma, e o banco impõe isso. Em troca, você ganha consultas poderosas (joins SQL entre tabelas), garantias fortes e décadas de confiabilidade. O custo é a rigidez — mudar o schema depois exige cuidado, e o modelo relacional tradicionalmente escala *para cima* (um servidor maior) com mais naturalidade do que *para fora* (muitos servidores).

Um banco **NoSQL de documentos** (o tipo mais comum) armazena documentos flexíveis, parecidos com JSON. Registros diferentes podem ter campos diferentes; você pode aninhar dados relacionados dentro de um único documento. Isso combina com dados que evoluem rápido ou irregulares, e foi projetado desde o começo para **escalar horizontalmente** entre muitas máquinas. O custo: menos garantias embutidas, consultas entre registros mais fracas e o risco de dados inconsistentes sem o schema para policiar.

## O trade-off, por tipo

| Tipo | Armazena | Forte em | Exemplo de uso |
| --- | --- | --- | --- |
| Relacional (SQL) | Tabelas, linhas | Consultas complexas, transações, integridade | Finanças, pedidos, qualquer coisa relacional |
| Documentos | Docs parecidos com JSON | Schema flexível, dados aninhados | Catálogos, perfis de usuário, conteúdo |
| Chave-valor | Simples chave → valor | Buscas ultrarrápidas, cache | Sessões, caches, feature flags |
| Coluna larga | Linhas com colunas dinâmicas | Escala massiva de escrita | Séries temporais, logging em escala |
| Grafo | Nós e relacionamentos | Dados altamente conectados | Grafos sociais, recomendações |

## Como escolher

Faça três perguntas:

- **Seus dados são relacionais e a consistência é crítica?** (Dinheiro, estoque, qualquer coisa onde uma atualização pela metade é inaceitável.) → SQL, pelas transações e integridade.
- **O formato dos seus dados é irregular ou muda rápido, ou você precisa escalar as escritas entre muitos servidores?** → Um tipo de NoSQL adequado ao padrão de acesso.
- **Quais são seus padrões de consulta?** Muitos joins ad-hoc e relatórios favorecem SQL; buscas simples por chave favorecem chave-valor; travessias profundamente conectadas favorecem grafo.

O padrão moderno e honesto: **comece com um banco relacional sólido (por exemplo, PostgreSQL), a menos que tenha um motivo específico para não fazê-lo.** Ele atende a uma enorme variedade de necessidades, hoje suporta colunas JSON para flexibilidade e escala mais do que as pessoas imaginam. Recorra ao NoSQL quando um requisito concreto — escala extrema, um padrão de acesso específico, dados genuinamente sem schema — exigir.

## Perguntas frequentes

**NoSQL é mais rápido que SQL?**
Não inerentemente — pode ser mais rápido para padrões específicos (buscas simples por chave, escritas massivas) e mais lento ou desajeitado para outros (joins complexos). "Mais rápido" depende inteiramente da operação.

**Bancos SQL conseguem escalar para sistemas grandes?**
Sim — com replicação, particionamento e cache, bancos relacionais rodam sistemas enormes. A afirmação de que "SQL não escala" está datada; escalar só exige um design mais deliberado.

**Tenho que escolher apenas um?**
Não — "persistência poliglota" é comum: um banco relacional para os registros centrais, mais um cache chave-valor e talvez um armazenamento de busca ou de grafo, cada um para o que faz de melhor.`,
  },
  {
    topicKey: 'https-how-it-works',
    title: 'Como o HTTPS mantém sua conexão segura',
    question: 'O que o HTTPS de fato faz, e como o cadeado mantém meus dados seguros?',
    summary:
      'O HTTPS embrulha o tráfego web comum em criptografia para que ninguém entre você e o site possa ler ou adulterar, e usa certificados para provar que você está mesmo falando com o servidor certo. Ele protege a privacidade e a integridade — mas não o site em si.',
    tags: ['programação', 'segurança', 'https', 'web'],
    language: 'pt',
    image: {
      prompt: promptOf('https-how-it-works'),
      alt: 'Uma mensagem viajando por um tubo protetor, embaralhada para quem está de fora, selada como verificada',
    },
    sources: [
      { title: 'MDN — O que é HTTPS / TLS', url: 'https://developer.mozilla.org/en-US/docs/Glossary/HTTPS' },
      { title: "Let's Encrypt — como funciona", url: 'https://letsencrypt.org/how-it-works/' },
    ],
    content: `# Como o HTTPS mantém sua conexão segura

HTTPS é apenas HTTP — o protocolo básico de requisição/resposta da web — com uma camada de segurança ao redor (o "S" é de Secure, fornecido pelo TLS). O HTTP puro envia tudo como texto legível que qualquer um no caminho da rede pode ver e alterar. O HTTPS corrige isso com duas garantias: **criptografia** (pessoas de fora não conseguem ler seu tráfego) e **autenticação** (você está realmente falando com o site que pensa, e não com um impostor). O cadeado é uma promessa sobre a *conexão*, e entender exatamente o que ele promete — e o que não promete — é genuinamente útil.

## Os dois problemas que ele resolve

**1. Interceptação.** No HTTP puro, sua rede WiFi, seu provedor de internet ou qualquer um no meio pode ler cada página e senha que você envia. O HTTPS criptografa o tráfego para que ele vire um amontoado ilegível para qualquer um além dos dois pontos da conexão — mesmo viajando pela mesma internet pública.

**2. Falsificação de identidade e adulteração.** Como você sabe que o servidor que responde é mesmo o seu banco, e não um atacante interceptando a conexão? O HTTPS usa **certificados** emitidos por autoridades confiáveis para provar a identidade do servidor, e verificações de integridade para que qualquer adulteração em trânsito seja detectada. Sem isso, só a criptografia seria inútil — você poderia estar conversando em particular com um ladrão.

## Como funciona o handshake (simplificado)

Quando você se conecta via HTTPS, uma negociação rápida acontece antes de qualquer dado real fluir:

1. **Verificação do certificado.** O servidor apresenta seu certificado. Seu navegador verifica que ele foi emitido por uma autoridade confiável para este domínio exato e que não está expirado nem revogado — confirmando a identidade.
2. **Troca de chaves.** Usando criptografia engenhosa (matemática de chave pública), os dois lados combinam uma chave secreta compartilhada *sem nunca enviá-la aberta*, mesmo que alguém esteja observando.
3. **Sessão criptografada.** Daí em diante, todo o tráfego é criptografado com essa chave compartilhada — criptografia simétrica rápida para o resto da conversa.

A parte elegante é o passo 2: as duas partes estabelecem uma chave privada por um canal público, de modo que mesmo um interceptador que viu o handshake inteiro não consegue derivá-la.

## O que o cadeado significa e o que não significa

| O cadeado garante | O cadeado NÃO garante |
| --- | --- |
| O tráfego é criptografado em trânsito | O site é honesto ou seguro |
| Você está conectado ao domínio real | O site não vai te enganar |
| Os dados não foram alterados no caminho | A empresa por trás é confiável |

Este é o ponto mais mal compreendido: o HTTPS protege o *cano*, não o *destino*. Um site de phishing pode ter um cadeado válido — isso só significa que sua conexão *com o golpe* é privada. O HTTPS protege seus dados de terceiros; ele não atesta as intenções do site.

## Perguntas frequentes

**O HTTPS é mais lento que o HTTP?**
Hoje, de forma desprezível — hardware e protocolos modernos tornam o custo da criptografia minúsculo, e o HTTPS muitas vezes habilita recursos de protocolo mais rápidos. A velha preocupação de que "criptografia é lenta" está obsoleta.

**Por que o HTTPS agora é exigido em toda parte, até para blogs?**
Porque até a leitura de uma página revela informações privadas, e páginas não criptografadas podem ser modificadas em trânsito (anúncios/malware injetados). Os navegadores agora marcam o HTTP puro como "Não seguro", e os certificados gratuitos removeram a barreira de custo.

**O HTTPS protege os dados depois que chegam ao servidor?**
Não — ele protege os dados *em trânsito*. Quando os dados chegam ao servidor, sua segurança depende de como o site os armazena e manuseia. O HTTPS é uma camada, não a segurança inteira.`,
  },
  {
    topicKey: 'what-is-an-api',
    title: 'O que é uma API, de verdade? Uma explicação em bom português',
    question: 'O que é uma API, e como ela de fato funciona, em termos simples?',
    summary:
      'Uma API é um contrato que permite a um programa solicitar serviços de outro sem conhecer seus detalhes internos — como o cardápio de um restaurante entre você e a cozinha. Ela define o que você pode pedir e o que recebe de volta, escondendo a complexidade por trás.',
    tags: ['programação', 'api', 'fundamentos', 'web'],
    language: 'pt',
    image: {
      prompt: promptOf('what-is-an-api'),
      alt: 'Um cardápio entregue sobre um balcão, escondendo uma cozinha complexa, devolvendo um prato pronto',
    },
    sources: [
      { title: 'MDN — Introdução às APIs web', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction' },
      { title: 'Red Hat — O que é uma API?', url: 'https://www.redhat.com/en/topics/api/what-are-application-programming-interfaces' },
    ],
    content: `# O que é uma API, de verdade? Uma explicação em bom português

API significa Application Programming Interface (Interface de Programação de Aplicações), o que não explica nada. Eis a versão útil: uma API é um **contrato que permite a dois pedaços de software conversarem entre si** — um programa oferece serviços, e a API define exatamente como outro programa pode pedi-los. A analogia clássica é a de um restaurante. Você (um programa) lê um **cardápio** (a API), pede um prato (faz uma requisição), e a **cozinha** (o outro programa) o prepara e o entrega (a resposta). Você nunca entra na cozinha nem aprende suas receitas; o cardápio é a interface acordada entre vocês.

## Por que isso importa

Aquele arranjo do restaurante captura todo o ponto: **você obtém o que precisa sem saber como é feito.** Quando um app te mostra um mapa, ele não contém a geografia do mundo — ele pede a uma API de mapas. Quando um site te deixa "pagar com PayPal", ele não processa pagamentos sozinho — ele chama a API do PayPal. As APIs permitem que software se construa sobre software, então ninguém precisa reinventar mapas, pagamentos, dados de clima ou sistemas de login do zero.

Isso traz três grandes benefícios:

- **Abstração** — você usa um serviço sem entender seus detalhes internos (você pede comida sem saber como a cozinha funciona).
- **Reúso** — um serviço bem construído alimenta milhares de apps.
- **Separação** — a cozinha pode mudar completamente suas receitas e, contanto que o cardápio continue o mesmo, seu pedido ainda funciona. Os times podem mudar seus detalhes internos sem quebrar todos que dependem deles.

## Como funciona uma chamada de API web

As APIs mais comuns hoje são as **APIs web**, faladas pela internet. O fluxo é simples:

1. Seu programa envia uma **requisição** para uma URL específica (o "item do cardápio"), muitas vezes com parâmetros ("um café médio, sem açúcar").
2. O servidor a recebe, faz o trabalho (consulta um banco de dados, executa lógica), e
3. Devolve uma **resposta** — geralmente dados estruturados no formato **JSON**, que os programas leem com facilidade.

Por exemplo, um app de clima requisita \`api.weather.com/forecast?city=Tokyo\` e recebe de volta um JSON com a temperatura e as condições, que então exibe de forma bonita. O app forneceu a pergunta; a API forneceu os dados.

## APIs estão por toda parte

| Você vê | Por trás, uma chamada de API para |
| --- | --- |
| "Entrar com o Google" | A API de autenticação do Google |
| Um mapa embutido num app | Uma API de mapas |
| Rastreamento de entrega em tempo real | A API da transportadora |
| "Pagar com cartão" | A API de uma processadora de pagamentos |
| Um chatbot num app | A API de um provedor de IA |

O software moderno é em grande parte **APIs chamando APIs** — cada app é uma pequena cozinha que também faz pedidos a outras.

## Perguntas frequentes

**Uma API é a mesma coisa que um site?**
Não — um site retorna páginas estilizadas para humanos; uma API retorna dados estruturados para programas. Mesma ideia (requisição → resposta), público diferente.

**APIs custam dinheiro?**
Algumas são gratuitas, muitas cobram por uso (por requisição ou por volume), e algumas exigem uma chave de API para identificar e cobrar você. APIs de mapas, pagamentos e IA comumente medem o uso.

**O que é uma "chave de API"?**
Um token secreto que identifica seu app para a API, usado para autenticar você, impor limites e rastrear o uso — como uma carteirinha de sócio que diz quem está fazendo o pedido.`,
  },
  {
    topicKey: 'sync-vs-async',
    title: 'Síncrono vs assíncrono: por que o código espera (ou não)',
    question: 'Qual é a diferença entre programação síncrona e assíncrona?',
    summary:
      'Código síncrono faz uma coisa de cada vez, bloqueando até cada etapa terminar; código assíncrono pode iniciar uma tarefa lenta e seguir em frente, lidando com o resultado depois. O assíncrono mantém os programas responsivos ao esperar por coisas lentas como rede e arquivos.',
    tags: ['programação', 'assíncrono', 'concorrência', 'fundamentos'],
    language: 'pt',
    image: {
      prompt: promptOf('sync-vs-async'),
      alt: 'Um cozinheiro esperando parado uma única panela vs um cozinheiro cuidando de várias panelas conforme ficam prontas',
    },
    sources: [
      { title: 'MDN — Introdução ao JavaScript assíncrono', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing' },
    ],
    content: `# Síncrono vs assíncrono: por que o código espera (ou não)

Essa distinção é sobre **o que um programa faz enquanto espera**. Código **síncrono** roda uma etapa de cada vez, e cada etapa precisa *terminar por completo* antes da próxima começar — se uma etapa é lenta, tudo atrás dela espera. Código **assíncrono** pode *iniciar* uma tarefa lenta, deixá-la de lado e continuar fazendo outro trabalho útil, lidando com o resultado quando estiver pronto. A diferença mal importa para operações rápidas e importa enormemente para as lentas — chamadas de rede, leituras de arquivo, consultas a banco de dados — que é exatamente onde os programas passam a maior parte do seu tempo ocioso.

## A analogia da cozinha

Imagine preparar o café da manhã. Um cozinheiro **síncrono** põe o pão na torradeira e então *fica ali olhando* até ele pular, sem fazer mais nada, antes de começar o café. Tempo total: a soma de cada etapa, uma após a outra, incluindo toda a espera.

Um cozinheiro **assíncrono** começa a torrada e, *enquanto ela torra*, começa o café e, *enquanto ele coa*, quebra os ovos — cuidando de cada um conforme termina. As mesmas tarefas, muito menos tempo total, porque a espera se sobrepôs ao trabalho útil. O cozinheiro não ficou mais rápido; ele parou de ficar parado à toa.

## Por que importa para programas reais

Os computadores passam muito tempo esperando por coisas lentas: um servidor respondendo, um disco lendo, um banco de dados respondendo — cada um uma eternidade comparado à velocidade do processador. Código síncrono que "bloqueia" durante essas esperas congela tudo atrás dele. Em um servidor web, uma chamada bloqueante poderia deixá-lo incapaz de atender qualquer outro usuário até que uma requisição lenta termine; em um app, é a temida interface congelada e sem resposta.

| | Síncrono | Assíncrono |
| --- | --- | --- |
| Ordem | Estritamente um de cada vez | Pode sobrepor períodos de espera |
| Numa etapa lenta | Tudo espera (bloqueia) | Outro trabalho continua |
| Simplicidade | Mais fácil de ler e raciocinar | Fluxo de controle mais complexo |
| Melhor para | Etapas rápidas e dependentes | I/O lento: rede, arquivos, BD |

## Como o assíncrono é expresso no código

Você não faz esse malabarismo manualmente — as linguagens oferecem ferramentas. Os padrões comuns incluem **callbacks** (rode isto quando terminar), **promises/futures** (um marcador para um resultado que vai chegar) e a sintaxe moderna de **async/await**, que deixa o código assíncrono *parecer* quase como código síncrono mantendo-se não bloqueante. O modelo mental chave: \`await\` significa "pause *esta* tarefa aqui até o resultado estar pronto, mas deixe outras tarefas rodarem enquanto isso" — e não "congele o programa inteiro".

O trade-off é real: código assíncrono é mais poderoso para a responsividade, mas mais difícil de raciocinar (ordenação, tratamento de erros e estado compartilhado ficam mais complicados). O ofício está em usá-lo onde a espera de fato acontece, e manter síncrona a lógica simples e rápida.

## Perguntas frequentes

**Assíncrono é a mesma coisa que multithread/paralelo?**
Não necessariamente. O assíncrono é sobre não *esperar ociosamente*; ele pode rodar em uma única thread intercalando tarefas durante seus tempos de espera. O paralelismo é genuinamente fazer coisas *ao mesmo tempo* em múltiplos núcleos. São relacionados mas distintos — o assíncrono sobrepõe espera, o paralelismo sobrepõe trabalho.

**O assíncrono faz meu código rodar mais rápido?**
Ele não acelera o trabalho em si; ele para de desperdiçar tempo esperando, melhorando a vazão e a responsividade. Para trabalho pesado de CPU sem espera, o assíncrono sozinho oferece pouco — é aí que o paralelismo ajuda.

**Por que o código assíncrono parece tão mais confuso?**
Porque a execução não flui mais de cima para baixo no tempo — coisas começam agora e terminam depois, erros chegam fora de ordem, e você raciocina sobre "quando" além de "o quê". O async/await domestica boa parte disso, mas a não linearidade subjacente é a real dificuldade.`,
  },
  {
    topicKey: 'what-is-docker',
    title: 'O que é Docker, e por que os desenvolvedores adoram contêineres?',
    question: 'O que é Docker, o que são contêineres e por que são tão usados?',
    summary:
      'Um contêiner empacota um app com tudo de que ele precisa para rodar em uma única unidade portátil, então ele se comporta de forma idêntica em qualquer lugar — resolvendo o "na minha máquina funciona". Contêineres são mais leves que máquinas virtuais porque compartilham o kernel do SO do host.',
    tags: ['programação', 'docker', 'contêineres', 'devops'],
    language: 'pt',
    image: {
      prompt: promptOf('what-is-docker'),
      alt: 'Uma fileira de contêineres lacrados, cada um com um app autossuficiente, empilháveis em qualquer plataforma',
    },
    sources: [
      { title: 'Docker — o que é um contêiner?', url: 'https://www.docker.com/resources/what-container/' },
    ],
    content: `# O que é Docker, e por que os desenvolvedores adoram contêineres?

Docker é a ferramenta que tornou os **contêineres** mainstream, e os contêineres resolvem uma das dores de cabeça mais persistentes do software: *"na minha máquina funciona"* — código que roda bem para o desenvolvedor mas quebra em outro lugar porque o outro computador tem versões, configurações diferentes ou peças faltando. Um contêiner conserta isso **empacotando uma aplicação junto com tudo de que ela precisa para rodar** — código, runtime, bibliotecas, ferramentas de sistema, configuração — em uma única unidade lacrada e portátil que se comporta de forma idêntica onde quer que rode. A analogia do contêiner de carga é exata: padronize a caixa, e qualquer navio, guindaste ou caminhão pode lidar com ela sem se importar com o que há dentro.

## O problema que ele resolve

O software depende do seu ambiente: uma versão específica de linguagem, bibliotecas particulares, certas configurações de sistema. Mova o app para o notebook de um colega, um servidor de teste ou produção, e qualquer incompatibilidade pode quebrá-lo. Reproduzir o ambiente exato em toda parte na mão é frágil e enlouquecedor. Um contêiner empacota o ambiente *junto* com o app, então "o ambiente" viaja junto e não há nada para incompatibilizar. Construa uma vez; ele roda igual no seu notebook, na máquina do seu colega e na nuvem.

## Contêineres vs máquinas virtuais

Os contêineres são frequentemente comparados a máquinas virtuais (VMs), que também isolam software — mas a diferença de peso é o ponto chave:

| | Máquina virtual | Contêiner |
| --- | --- | --- |
| Empacota | Um sistema operacional convidado inteiro + app | Apenas o app + suas dependências |
| Compartilha | Nada — um SO completo cada | O kernel do SO do host |
| Tamanho | Gigabytes | Megabytes |
| Inicialização | Minutos | Segundos ou menos |
| Densidade | Poucos por máquina | Muitos por máquina |

Uma VM virtualiza um computador inteiro, carregando um sistema operacional completo por app — poderoso, mas pesado. Um contêiner compartilha o kernel do SO do host e isola apenas o que está acima dele, o que o torna dramaticamente mais leve e mais rápido para iniciar. Você consegue rodar muitos contêineres onde caberiam apenas algumas VMs.

## Por que desenvolvedores e ops os adoram

- **Consistência** — elimina a deriva de ambiente entre dev, teste e produção. A desculpa do "na minha máquina funciona" morre.
- **Portabilidade** — a mesma imagem de contêiner roda em qualquer máquina com um runtime de contêiner, incluindo todas as principais nuvens.
- **Isolamento** — cada contêiner é autossuficiente, então apps com dependências conflitantes coexistem em paz em um único host.
- **Velocidade e densidade** — a inicialização leve os torna ideais para escalar para cima e para baixo e para empacotar de forma eficiente nos servidores.
- **Base da infraestrutura moderna** — os contêineres são o bloco de construção para microsserviços e sistemas de orquestração (como o Kubernetes) que os rodam em escala.

## Perguntas frequentes

**Docker é a mesma coisa que um contêiner?**
Não exatamente — contêineres são o conceito/tecnologia; Docker é o conjunto de ferramentas popular que os constrói e roda. Existem outras ferramentas, mas o Docker popularizou o fluxo de trabalho e o formato de imagem.

**Contêineres substituem máquinas virtuais?**
Muitas vezes, mas nem sempre — eles são frequentemente usados *juntos* (contêineres rodando dentro de VMs na nuvem). As VMs ainda importam para isolamento mais forte e para rodar sistemas operacionais diferentes; os contêineres vencem em leveza e velocidade.

**Um contêiner é uma fronteira de segurança?**
Ele fornece isolamento, mas mais fraco que o de uma VM, porque os contêineres compartilham o kernel do host. Para a maioria dos usos é suficiente; para cargas hostis multi-tenant, os times adicionam reforço extra ou combinam com VMs.`,
  },
  {
    topicKey: 'big-o-notation',
    title: 'Notação Big-O explicada sem a dor de cabeça da matemática',
    question: 'O que é a notação Big-O, e por que os programadores se importam com ela?',
    summary:
      'A Big-O descreve como o trabalho de um algoritmo cresce à medida que a entrada cresce — não a velocidade exata, mas o comportamento de escala. É por isso que uma abordagem se mantém rápida com milhões de itens enquanto outra trava, e ela orienta a escolha da abordagem certa.',
    tags: ['programação', 'algoritmos', 'ciência da computação', 'desempenho'],
    language: 'pt',
    image: {
      prompt: promptOf('big-o-notation'),
      alt: 'Várias curvas a partir de uma origem divergindo de crescimento plano a quase vertical',
    },
    sources: [
      { title: 'Khan Academy — Notação assintótica', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation' },
    ],
    content: `# Notação Big-O explicada sem a dor de cabeça da matemática

A notação Big-O soa como matemática intimidadora, mas a ideia é simples e prática: ela descreve **como a quantidade de trabalho que um algoritmo faz cresce à medida que a entrada fica maior.** Ela deliberadamente ignora os tempos exatos (que dependem do hardware) e foca na *forma* do crescimento. É isso que de fato importa em escala: um algoritmo que vai bem com 100 itens pode levar uma fração de segundo ou pode levar uma semana com 10 milhões de itens, e a Big-O te diz qual — antes que você descubra do jeito doloroso.

## Por que "como cresce" vence "quão rápido"

O tempo de execução real depende da máquina, da linguagem, do dia. A Big-O tira isso de cena para comparar o *comportamento de escala* — porque é isso que sobrevive ao crescimento. Uma abordagem duas vezes mais rápida em entradas pequenas, mas com crescimento pior, vai perder catastroficamente conforme os dados crescem. A pergunta que a Big-O responde não é "quanto tempo leva?", mas "**o que acontece quando a entrada fica 10× ou 1000× maior?**" — a pergunta que decide se o seu software ainda vai funcionar no ano que vem.

## As classes comuns, em termos simples

Pense em \`n\` como o tamanho da entrada (número de itens):

| Big-O | Nome | Significado simples | Exemplo |
| --- | --- | --- | --- |
| O(1) | Constante | O mesmo trabalho independentemente do tamanho | Buscar um item por índice |
| O(log n) | Logarítmico | Cresce muito devagar; reduz pela metade a cada passo | Busca binária em dados ordenados |
| O(n) | Linear | O trabalho cresce no mesmo passo da entrada | Percorrer uma lista uma vez |
| O(n log n) | Linearítmico | Um pouco pior que linear | Bons algoritmos de ordenação |
| O(n²) | Quadrático | O trabalho explode; cada item contra cada item | Comparar todos os pares (ingênuo) |
| O(2ⁿ) | Exponencial | Catastrófico; dobra a cada item adicionado | Força bruta em todas as combinações |

O abismo é assombroso em escala. Para um milhão de itens, um algoritmo O(n) faz ~1 milhão de passos; um O(n²) faz ~1.000.000.000.000 — a diferença entre instantâneo e efetivamente nunca. É por isso que uma abordagem O(n²) escondida em um laço é um desastre clássico de desempenho, e por que encontrar uma alternativa O(n log n) ou O(n) pode transformar um programa sem esperança em algo rápido.

## Como usá-la na prática

Você não precisa deduzir provas. A habilidade prática é **reconhecer padrões**: um único laço sobre os dados costuma ser O(n); um laço dentro de um laço sobre os mesmos dados costuma ser O(n²) — uma bandeira vermelha para reconsiderar; reduzir o problema pela metade repetidamente sugere O(log n). Quando algo está lento com entradas grandes, o raciocínio Big-O te aponta o culpado (muitas vezes um laço aninhado acidental ou uma busca lenta) e o caminho para a correção (uma estrutura de dados ou algoritmo melhor). É também por isso que escolher a estrutura de dados certa — um hash map para buscas O(1) em vez de percorrer uma lista — é uma das decisões de desempenho de maior alavancagem.

## Perguntas frequentes

**Uma Big-O menor sempre significa mais rápido?**
Não para entradas pequenas — a Big-O descreve crescimento, ignorando constantes, então uma classe "pior" pode vencer em dados minúsculos. Ela importa mais à medida que a entrada cresce; para um punhado de itens, a simplicidade frequentemente vence a otimalidade teórica.

**Qual é a diferença entre melhor, médio e pior caso?**
Um algoritmo pode se comportar de formas diferentes dependendo da entrada (por exemplo, já ordenada vs aleatória). A Big-O frequentemente cita o pior caso como uma garantia, mas o caso médio muitas vezes importa mais na prática.

**A Big-O é só sobre velocidade?**
Não — ela também descreve o crescimento de **memória** (complexidade de espaço). Um algoritmo pode ser rápido mas usar memória que cresce mal com a entrada; ambas as dimensões importam ao escolher uma abordagem.`,
  },
  {
    topicKey: 'what-is-caching',
    title: 'O que é cache, e por que ele está em toda parte?',
    question: 'O que é cache, como funciona e por que é tão importante para o desempenho?',
    summary:
      'Um cache guarda cópias de dados onde é mais rápido alcançá-los, então requisições repetidas pulam a fonte original lenta. É um dos truques de velocidade mais poderosos da computação — usado em cada camada — e seu problema mais difícil é saber quando a cópia está desatualizada.',
    tags: ['programação', 'cache', 'desempenho', 'sistemas'],
    language: 'pt',
    image: {
      prompt: promptOf('what-is-caching'),
      alt: 'Um item necessário guardado numa prateleira próxima por um caminho curto vs um caminho longo até um armazém distante',
    },
    sources: [
      { title: 'MDN — Cache HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching' },
      { title: 'Cloudflare — o que é cache', url: 'https://www.cloudflare.com/learning/cdn/what-is-caching/' },
    ],
    content: `# O que é cache, e por que ele está em toda parte?

Um cache é um estoque de cópias guardadas em algum lugar rápido, para que você não precise buscar de um lugar lento toda vez. O princípio é intuitivo: se você pega o mesmo livro o tempo todo, você o mantém na sua mesa em vez de caminhar até a biblioteca a cada vez. Na computação, "a biblioteca" pode ser um banco de dados, um servidor distante ou um disco lento, e "a sua mesa" é uma memória rápida ali perto. O cache é uma das **técnicas de desempenho mais universais de toda a computação** — presente em praticamente cada camada — porque as diferenças de velocidade entre armazenamento rápido e lento são enormes, e a maioria dos sistemas pede as mesmas coisas repetidas vezes.

## Por que funciona tão bem

Dois fatos fazem o cache compensar massivamente. Primeiro, **as diferenças de velocidade são enormes**: ler da memória pode ser milhares de vezes mais rápido do que do disco ou através de uma rede. Segundo, **o acesso é repetitivo**: programas e usuários tendem a querer os mesmos dados repetidamente (o vídeo popular, o perfil do usuário logado, a página inicial). Mantenha os itens frequentemente desejados por perto, e a vasta maioria das requisições é atendida rapidamente, pagando o caminho lento só de vez em quando. Mesmo cachear uma pequena fração dos dados "quentes" já atende a maior parte do tráfego.

## O cache está em cada camada

Você está cercado por caches trabalhando invisivelmente:

| Cache | O que ele acelera |
| --- | --- |
| Cache de CPU | O processador alcançar dados mais rápido que a memória principal |
| Cache do navegador | Recarregar sites sem rebaixar imagens/scripts |
| CDN (rede de distribuição de conteúdo) | Servir o conteúdo de um servidor perto de você, e não do outro lado do mundo |
| Cache de aplicação/em memória (ex.: Redis) | Evitar consultas repetidas ao banco de dados |
| Cache de banco de dados | Reutilizar resultados de consultas recentes |
| Cache de DNS | Pular buscas de endereço repetidas |

Um único carregamento de página pode se beneficiar de meia dúzia de caches empilhados — é por isso que a segunda visita a um site é muito mais rápida que a primeira.

## A parte difícil: saber quando uma cópia está desatualizada

A dificuldade famosa do cache não é armazenar cópias — é saber **quando uma cópia está desatualizada.** Se os dados originais mudam mas o cache ainda serve a cópia antiga, os usuários veem informações erradas (um preço que já mudou, um perfil que foi atualizado). Isso é a "invalidação de cache", metade de uma piada famosa sobre os dois problemas mais difíceis da ciência da computação. Os sistemas a gerenciam com estratégias como **expiração** (as cópias vivem por um tempo definido e depois se renovam), **invalidação** (limpar ativamente a cópia quando a fonte muda) e aceitar a **consistência eventual** (tolerar uma desatualização breve em troca de velocidade). Decidir o quão recentes os dados precisam ser — versus o quão rápidos — é o trade-off central do cache.

## Perguntas frequentes

**Por que não cachear tudo para sempre?**
Porque os dados mudam, e cópias desatualizadas causam bugs; além disso, os caches têm espaço limitado, então eles descartam os itens menos usados. O cache troca o frescor perfeito por velocidade — você cacheia aquilo que é seguro estar um pouco velho.

**O que "limpar o cache" resolve?**
Ele força cópias novas da fonte. Quando um site parece quebrado ou desatualizado, seu navegador pode estar mostrando arquivos cacheados antigos; limpar faz com que ele rebusque as versões atuais.

**O cache pode causar bugs?**
Sim — servir dados desatualizados é o clássico. Uma parcela surpreendente dos problemas de "não está atualizando!" são caches segurando cópias antigas em algum ponto da cadeia. Poderoso, mas uma fonte real de problemas sutis.`,
  },
];
