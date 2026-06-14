import type { DraftArticle } from './types';
import { aiInPracticeEn } from './ai-in-practice.en';

// Batch: AI in Practice (versão nativa em português / expansão de idiomas da
// Fase 2). Compartilha os mesmos topicKey de en/zh, e reutiliza as imagens de
// herói já em cache no GCS por topicKey (custo zero de geração extra). O texto
// não é tradução automática: foi reescrito para o leitor brasileiro.

const promptOf = (key: string): string => {
  const hit = aiInPracticeEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const aiInPracticePt: DraftArticle[] = [
  {
    topicKey: 'rag-vs-fine-tuning',
    title: 'RAG ou fine-tuning: qual você deve escolher?',
    question: 'Devo usar RAG ou fine-tuning para adaptar um LLM aos meus dados?',
    summary:
      'O RAG injeta conhecimento novo e verificável no momento da consulta; o fine-tuning muda como o modelo se comporta. A maioria dos times deve começar pelo RAG e só adicionar fine-tuning por metas de estilo, formato ou latência.',
    tags: ['ai', 'llm', 'rag', 'fine-tuning', 'aprendizado de máquina'],
    language: 'pt',
    image: { prompt: promptOf('rag-vs-fine-tuning'), alt: 'Pipeline de recuperação e malha de modelo ajustado alimentando um núcleo neural' },
    sources: [
      { title: 'Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (2020)', url: 'https://arxiv.org/abs/2005.11401' },
      { title: 'Hu et al., "LoRA: Low-Rank Adaptation of Large Language Models" (2021)', url: 'https://arxiv.org/abs/2106.09685' },
      { title: 'Gao et al., "Retrieval-Augmented Generation for Large Language Models: A Survey" (2023)', url: 'https://arxiv.org/abs/2312.10997' },
    ],
    content: `# RAG ou fine-tuning: qual você deve escolher?

Resposta curta: se o seu problema é **o que o modelo sabe**, use geração aumentada por recuperação (RAG); se o problema é **como o modelo se comporta**, use fine-tuning. Os dois não são rivais — sistemas maduros costumam usar ambos — mas, como primeiro investimento, o RAG é mais barato de construir, mais fácil de atualizar e mais fácil de auditar.

## O que cada técnica realmente faz

O **RAG** mantém o modelo congelado e muda a *entrada* dele. No momento da consulta, um recuperador busca nos seus documentos (normalmente via embeddings em um índice vetorial), e os trechos mais relevantes são colados no prompt para que o modelo responda a partir deles. O conhecimento vive em um banco de dados que você pode editar a qualquer instante.

O **fine-tuning** muda os *pesos* do modelo. Você treina com pares de entrada–saída para que o modelo internalize um tom, um formato, uma política ou o jargão do domínio. Com métodos eficientes em parâmetros como o LoRA, isso já não exige hardware gigante — mas o resultado fica gravado até você treinar de novo.

## Tabela de decisão

| Sua situação | Encaixe melhor | Por quê |
| --- | --- | --- |
| Fatos mudam toda semana (preços, políticas, docs) | RAG | Atualize o índice, não o modelo |
| Respostas precisam citar fontes | RAG | Os trechos recuperados já servem de citação |
| Corpus privado grande demais para memorizar | RAG | A recuperação escala com o armazenamento, não com os parâmetros |
| A saída deve seguir um estilo ou esquema rígido | Fine-tuning | Estilo é comportamento, não conhecimento |
| Você precisa de um modelo especialista pequeno, rápido e barato | Fine-tuning | Destile a tarefa em menos parâmetros |
| Os prompts incharam de instruções e exemplos | Fine-tuning | Mova instruções recorrentes para os pesos |
| O modelo entende mal o jargão do domínio | Ambos | A recuperação dá o contexto; o ajuste corrige a interpretação |

## Quando o RAG é a primeira jogada certa

- **Atualidade**: seu conhecimento muda mais rápido do que você jamais retreinaria.
- **Rastreabilidade**: respostas reguladas e voltadas ao cliente precisam de embasamento "segundo o documento X", o que também reduz de forma mensurável as alucinações.
- **Velocidade de iteração**: um protótipo funcional leva alguns dias de engenharia; sem GPUs, sem rotulagem de dados de treino.
- **Isolamento por cliente**: os dados de cada cliente ficam no próprio índice, em vez de vazar para pesos compartilhados.

O custo é uma peça móvel a mais: fragmentação, embeddings, qualidade do índice e avaliação da recuperação passam a fazer parte do seu produto. Recuperação ruim, e não o modelo, é o ponto de falha mais comum em sistemas RAG.

## Quando o fine-tuning vale o investimento

- **Conformidade de formato**: JSON sempre válido, um esqueleto fixo de relatório, o tom do seu time de suporte.
- **Latência e custo de tokens**: um modelo ajustado pode dispensar exemplos few-shot e instruções longas em cada chamada.
- **Transferência de capacidade para modelos pequenos**: ajustar um modelo aberto compacto em uma tarefa estreita pode igualar um modelo geral muito maior por uma fração do custo de servir.
- **Habilidades implícitas**: tarefas de classificação, extração e roteamento com milhares de exemplos rotulados costumam superar o prompting.

O custo é operacional: curar os dados de treino, rodar as avaliações de novo a cada atualização do modelo base e aceitar que corrigir um comportamento ruim significa mais um ciclo de treino.

## Usando os dois

Um padrão comum em produção: ajustar um modelo para que ele *siga seu formato e sua política de recusa de forma confiável* e usar RAG para *alimentá-lo com fatos atuais*. O ajuste torna o comportamento previsível; a recuperação mantém o conteúdo verdadeiro e atualizado.

## Perguntas frequentes

**O fine-tuning ensina fatos novos ao modelo?**
Mal. Atualizações de pesos podem memorizar alguns fatos, mas a recuperação é instável e exige retreino. A recuperação é o jeito confiável de adicionar conhecimento.

**O RAG é sempre mais barato?**
Para construir, quase sempre. Em volume de consultas muito alto, contextos recuperados longos inflam o custo de tokens por chamada, e um modelo ajustado com prompt curto pode sair mais barato. Meça no seu nível de tráfego.

**Posso pular os dois e só usar uma janela de contexto longa?**
Para corpora pequenos e estáveis — sim, enfiar os documentos no prompt (talvez com cache de prompt) é a opção mais simples. Acima de algumas centenas de páginas ou com atualizações frequentes, a recuperação vence em custo e qualidade de resposta.`,
  },
  {
    topicKey: 'prompt-engineering',
    title: 'Um guia prático de engenharia de prompts',
    question: 'Como eu escrevo prompts eficazes para grandes modelos de linguagem?',
    summary:
      'A maior parte da qualidade de um prompt vem de cinco alavancas: instruções claras, contexto, exemplos, formato de saída explícito e espaço para raciocinar. Este guia cobre as técnicas que sobrevivem ao contato com o trabalho real.',
    tags: ['ai', 'llm', 'engenharia de prompts', 'produtividade'],
    language: 'pt',
    image: { prompt: promptOf('prompt-engineering'), alt: 'Painel de controle de vidro moldando um feixe de luz em uma saída estruturada' },
    sources: [
      { title: 'Wei et al., "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (2022)', url: 'https://arxiv.org/abs/2201.11903' },
      { title: 'Wang et al., "Self-Consistency Improves Chain of Thought Reasoning" (2022)', url: 'https://arxiv.org/abs/2203.11171' },
      { title: 'Prompt Engineering Guide (DAIR.AI)', url: 'https://www.promptingguide.ai' },
    ],
    content: `# Um guia prático de engenharia de prompts

Um prompt é uma especificação, não um feitiço mágico. Modelos vão mal com pedidos vagos pelo mesmo motivo que empreiteiros vão: os requisitos nunca foram declarados. Cinco alavancas respondem pela maior parte da qualidade que dá para obter — instruções, contexto, exemplos, formato de saída e espaço para raciocinar.

## As cinco alavancas

**1. Declare a tarefa como uma ordem de serviço.** Inclua o objetivo, o público, as restrições e como é o "pronto". "Resuma as cláusulas de rescisão deste contrato para alguém sem formação jurídica, em menos de 150 palavras, sinalizando qualquer coisa incomum" ganha de "resuma isto".

**2. Forneça o contexto que o modelo não tem como adivinhar.** Cole o documento relevante, o esquema, o log de erro, o guia de estilo. Separe-o das instruções com delimitadores claros (tags estilo XML ou blocos cercados), para que dados nunca se confundam com diretrizes.

**3. Mostre, não apenas conte (few-shot).** Dois ou três exemplos de entrada → saída definem uma tarefa com mais precisão do que parágrafos de descrição, e fixam os casos extremos: inclua um exemplo difícil, não só os fáceis.

**4. Fixe o formato de saída.** Peça uma estrutura específica — um objeto JSON com campos nomeados, uma tabela em markdown, "exatamente três marcadores". Saída estruturada é mais fácil de validar, analisar e comparar. Se a sua plataforma suporta saída com esquema imposto, use.

**5. Dê espaço para raciocinar.** Para análise, matemática ou decisões de múltiplas etapas, peça que o modelo resolva o problema antes de responder (cadeia de pensamento). Pesquisa e prática concordam que isso melhora materialmente a precisão em tarefas de raciocínio; para respostas de alto risco, amostre vários caminhos de raciocínio e fique com a maioria (autoconsistência).

## Técnica → quando recorrer a ela

| Técnica | Use quando |
| --- | --- |
| Papel/persona ("Você é um SRE sênior") | Vocabulário e julgamento devem combinar com uma profissão |
| Delimitadores ao redor das entradas | Qualquer dado colado, sempre |
| Exemplos few-shot | Formato ou julgamento é difícil de descrever de forma abstrata |
| Cadeia de pensamento | Matemática, lógica, decisões com várias restrições |
| Decomposição (várias chamadas) | Tarefas com fases distintas — extrair, depois julgar, depois escrever |
| Autoconsistência (voto sobre amostras) | Respostas únicas de alto risco que valem o custo extra |
| "Diga 'desconhecido' se não tiver certeza" | Consultas factuais em que uma resposta errada é pior que nenhuma |

## Padrões comuns de falha

- **O prompt pia-de-cozinha**: vinte regras, metade contraditórias. Modelos seguem a última e a mais alta; corte sem dó.
- **Perguntas escondidas**: pedir duas coisas numa frase e receber resposta a uma só.
- **Contexto implícito**: referir-se a "o arquivo" ou "o nosso formato de sempre" que o modelo nunca viu.
- **Exemplos superajustados**: três amostras few-shot quase idênticas ensinam o padrão de superfície, não a regra.
- **Sem ciclo de iteração**: prompts são código. Mantenha um pequeno conjunto de teste com entradas reais, rode-o depois de cada edição e versione seus prompts.

## Trate prompts como artefatos de engenharia

Quando um prompt passa a importar em produção: coloque-o sob controle de versão, anexe um conjunto de teste de regressão com entradas representativas e propriedades esperadas, e rode de novo a cada atualização de modelo. Mudanças de versão do modelo deslocam o comportamento em silêncio; seus testes pegam isso antes dos seus usuários.

## Perguntas frequentes

**Frases mágicas como "respire fundo" ajudam mesmo?**
De vez em quando, marginalmente, e de forma instável entre modelos. Estrutura, contexto e exemplos ofuscam encantamentos.

**Prompts longos custam mais — o gasto compensa?**
Em geral sim para tarefas críticas em qualidade, mas corte o peso morto: regras redundantes e exemplos obsoletos somam custo sem precisão. O cache de prompt deixa prefixos estáticos longos baratos na maioria das plataformas.

**Como o prompting muda para modelos focados em raciocínio?**
Modelos que raciocinam internamente antes de responder precisam de menos orientação sobre *como* pensar — mantenha as instruções sobre objetivo e restrições e abandone a microgestão passo a passo, a menos que a qualidade da saída diga o contrário.`,
  },
  {
    topicKey: 'ai-agents',
    title: 'O que é um agente de IA — e quando você realmente precisa de um?',
    question: 'O que é um agente de IA e quando o meu caso de uso realmente precisa de um?',
    summary:
      'Um agente de IA é um LLM rodando em loop, com ferramentas e um objetivo, decidindo sozinho o próximo passo. Poderoso para tarefas abertas, exagero para qualquer coisa que um fluxo fixo resolva — este artigo explica a diferença.',
    tags: ['ai', 'llm', 'agentes', 'automação', 'arquitetura de software'],
    language: 'pt',
    image: { prompt: promptOf('ai-agents'), alt: 'Um núcleo neural com ferramentas em órbita escolhendo seu caminho por plataformas ramificadas' },
    sources: [
      { title: 'Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models" (2022)', url: 'https://arxiv.org/abs/2210.03629' },
      { title: 'Anthropic Engineering, "Building Effective Agents"', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
      { title: 'Schick et al., "Toolformer: Language Models Can Teach Themselves to Use Tools" (2023)', url: 'https://arxiv.org/abs/2302.04761' },
    ],
    content: `# O que é um agente de IA — e quando você realmente precisa de um?

Um agente de IA é um modelo de linguagem rodando em loop: ele tem um objetivo, um conjunto de ferramentas e a liberdade de decidir a própria próxima ação com base no que a ação anterior retornou. Essa última oração é a que define tudo. Um script que chama um LLM três vezes em ordem fixa é um **fluxo de trabalho**; um sistema em que o próprio modelo escolhe o que fazer em seguida é um **agente**.

## A anatomia de um agente

Todo agente prático tem quatro peças:

- **Um modelo** capaz de raciocínio em várias etapas e de chamadas de ferramenta confiáveis.
- **Ferramentas** — funções que o modelo pode invocar: busca, execução de código, edição de arquivos, chamadas de API, consultas a banco de dados.
- **Contexto/memória** — o histórico corrente de ações e observações (e, às vezes, anotações externas que sobrevivem à sessão).
- **O loop** — o modelo age → o ambiente responde → o resultado é anexado → o modelo age de novo, até declarar o objetivo cumprido ou bater numa condição de parada.

O padrão de intercalar raciocínio com uso de ferramentas foi popularizado na pesquisa como ReAct e hoje é a espinha dorsal de assistentes de código, agentes de pesquisa e sistemas de uso de computador.

## Agente vs fluxo de trabalho vs chamada única

| Abordagem | Quem decide o fluxo de controle | Melhor para | Modo de falha |
| --- | --- | --- | --- |
| Chamada única de LLM | Você | Classificação, redação, extração | Escopo limitado |
| Fluxo de trabalho (chamadas encadeadas) | Você | Processos de várias etapas conhecidos e repetíveis | Rígido quando as entradas variam |
| Agente (loop + ferramentas) | O modelo | Tarefas abertas em que o caminho é desconhecido de antemão | Custo e acúmulo de erros |

## Quando um agente é genuinamente a escolha certa

- **O caminho é impossível de saber de antemão.** Depurar um build que falha, pesquisar uma pergunta vaga, operar um navegador — cada próximo passo depende do que o anterior revelou.
- **O ambiente dá feedback.** Compiladores, suítes de teste e resultados de busca deixam o agente conferir o próprio trabalho e se autocorrigir. Agentes prosperam exatamente onde a verificação é barata.
- **A tarefa tolera custo e latência variáveis.** Um agente pode levar cinco passos ou cinquenta.

## Quando é exagero

Se um humano consegue escrever os passos, escreva-os — um fluxo fixo é mais barato, mais rápido, depurável e previsível. Preenchimento de formulários, pipelines de documentos, relatórios agendados e ETL padrão quase nunca precisam de um agente. A regra honesta de engenharia, vinda da prática, é: **use o padrão mais simples que funcione e adicione autonomia só quando a tarefa exigir.**

## O que dá errado

- **Acúmulo de erros**: um passo 95% confiável tem cerca de 60% de chance de sobreviver intacto a dez passos. Loops longos precisam de pontos de checagem, etapas de verificação ou portões de revisão humana.
- **Custo descontrolado**: cada iteração do loop relê um histórico que cresce. Defina orçamentos e limites de passos.
- **Objetivos ambíguos**: um agente instruído a "melhorar a base de código" vai fazer *algo*; se era o que você queria é outra história. Defina o "pronto".
- **Superfície de segurança**: ferramentas que podem escrever arquivos, gastar dinheiro ou enviar mensagens precisam de limites de permissão e logs de auditoria.

## Perguntas frequentes

**"Sistemas multiagente" são melhores que um único bom agente?**
Às vezes — pesquisa em paralelo com um sintetizador é um padrão comprovado. Mas a coordenação traz seus próprios modos de falha; multiagente é uma otimização, não um ponto de partida.

**Agentes precisam de modelos especiais?**
Precisam de forte confiabilidade em chamadas de ferramenta e de coerência em horizontes longos. Modelos gerais de fronteira são, hoje, a escolha mais segura; modelos pequenos servem para loops estreitos e bem instrumentados.

**Como eu avalio um agente?**
Por resultados, não por passos: defina um conjunto de tarefas representativas com estados finais verificáveis, rode repetidamente (agentes são não determinísticos) e acompanhe taxa de sucesso, custo e passos até concluir.`,
  },
  {
    topicKey: 'local-llm-hardware',
    title: 'Que hardware você precisa para rodar um LLM localmente?',
    question: 'Que hardware eu preciso para rodar um grande modelo de linguagem na minha própria máquina?',
    summary:
      'A memória, não o poder de processamento, decide o que dá para rodar: um modelo 8B quantizado cabe em 8 GB, um 32B pede cerca de 24 GB, e modelos da classe 70B querem 48 GB ou mais. Aqui vão os números reais e o software a usar.',
    tags: ['ai', 'llm', 'llm local', 'hardware', 'gpu'],
    language: 'pt',
    image: { prompt: promptOf('local-llm-hardware'), alt: 'Um cubo de malha neural brilhante sobre uma placa de vídeo dentro de um gabinete aberto' },
    sources: [
      { title: 'llama.cpp — inferência de LLM em C/C++ (GGUF, quantização)', url: 'https://github.com/ggml-org/llama.cpp' },
      { title: 'Ollama — rode LLMs abertos localmente', url: 'https://ollama.com' },
      { title: 'vLLM — serviço de LLM de alta vazão', url: 'https://github.com/vllm-project/vllm' },
    ],
    content: `# Que hardware você precisa para rodar um LLM localmente?

A restrição que manda é **memória, não velocidade**. Os pesos de um modelo precisam caber na VRAM da sua GPU (ou na memória unificada da Apple) para ter desempenho usável, e a conta é simples: com quantização de 4 bits, um modelo precisa de aproximadamente **0,5–0,7 GB por bilhão de parâmetros**, mais 1–4 GB de folga para o cache de contexto.

## A tabela rápida de dimensionamento

| Classe do modelo | Pesos em 4 bits | Configuração confortável | Exemplos do que roda |
| --- | --- | --- | --- |
| 3–4B | ~2–3 GB | Qualquer notebook moderno, 8 GB de RAM | Assistentes pequenos, autocompletar |
| 7–9B | ~4–6 GB | GPU de 8 GB ou Mac de 16 GB | Modelos pequenos Llama/Qwen/Mistral |
| 13–14B | ~8–10 GB | GPU de 12–16 GB ou Mac de 24 GB | Modelos médios de chat e código |
| 30–34B | ~18–22 GB | GPU de 24 GB (ex.: RTX 3090/4090) ou Mac de 36–48 GB | Generalistas locais fortes |
| 70–72B | ~40–48 GB | 2×GPU de 24 GB ou Mac Studio de 64 GB+ | Modelos abertos quase de fronteira |
| Mistura de especialistas grande | varia muito | Classe workstation/servidor | Confira a doc de cada modelo |

Duas notas para ler a tabela: a quantização (GGUF de 4 bits e similares) troca uma perda de qualidade pequena, em geral aceitável, por um corte de 4× na memória frente a 16 bits; e contextos longos fazem o cache KV crescer — conversar com 32k de contexto pode somar vários GB além dos pesos.

## GPU, Mac ou CPU?

- **GPU NVIDIA**: melhor vazão e suporte de ecossistema. O tamanho da VRAM importa mais que a geração da GPU — uma RTX 3090 usada de 24 GB segue sendo a queridinha do orçamento para modelos da classe 30B.
- **Apple Silicon**: a memória unificada deixa os Macs discretamente excelentes — uma máquina M-series de 64 GB roda modelos quantizados da classe 70B, mais devagar que um equipamento de duas GPUs, mas silenciosa e simples. Compre RAM, não núcleos.
- **Só CPU**: funciona via llama.cpp, mas espere poucos tokens por segundo em modelos pequenos — ótimo para jobs em lote, sofrido para chat.

## Pilha de software

- **Ollama** — o começo mais fácil: um comando para baixar e rodar um modelo, com uma API local compatível com OpenAI.
- **llama.cpp** — o motor por baixo de boa parte do ecossistema; controle máximo sobre quantização e offloading.
- **LM Studio** — interface gráfica para navegar, baixar e conversar.
- **vLLM** — quando você atende muitos usuários simultâneos a partir de um servidor com GPU de verdade, e não de um único desktop.

## O que esperar com honestidade

Um modelo quantizado de 8–14B bem escolhido dá conta de resumo, redação, extração e ajuda decente com código. Modelos abertos da classe 30B–70B são genuinamente fortes, mas ainda ficam atrás dos modelos hospedados de fronteira em raciocínio difícil. As razões para ir local são **privacidade, uso offline, tokens ilimitados a custo fixo e liberdade para experimentar** — não vencer a nuvem em qualidade bruta.

## Perguntas frequentes

**Rodar localmente economiza dinheiro?**
Só com uso pesado e sustentado. O hardware se paga se você fosse, de outro modo, queimar tokens de API todo dia; para uso ocasional, as APIs saem mais baratas.

**Dá para rodar modelos maiores que a minha VRAM?**
Sim — camadas podem transbordar para a RAM do sistema com forte penalidade de velocidade. Um modelo 20% acima da VRAM costuma ir bem; 2× acima é sofrimento.

**E fine-tuning localmente?**
Métodos eficientes em parâmetros (LoRA/QLoRA) tornam viável ajustar modelos pequenos numa GPU de 24 GB. Fine-tuning completo de modelos grandes continua sendo território de datacenter.`,
  },
  {
    topicKey: 'mcp-explained',
    title: 'O que é o MCP (Model Context Protocol)?',
    question: 'O que é o Model Context Protocol e que problema ele resolve?',
    summary:
      'O MCP é um padrão aberto que permite a qualquer aplicação de IA se conectar a qualquer ferramenta ou fonte de dados por um único protocolo — substituindo integrações sob medida por app e por ferramenta. Pense num USB-C para contexto de IA.',
    tags: ['ai', 'mcp', 'llm', 'integrações', 'padrões abertos'],
    language: 'pt',
    image: { prompt: promptOf('mcp-explained'), alt: 'Cabos de dados de cores diferentes convergindo para uma única porta cristalina universal' },
    sources: [
      { title: 'Model Context Protocol — site oficial e especificação', url: 'https://modelcontextprotocol.io' },
      { title: 'Anthropic, "Introducing the Model Context Protocol"', url: 'https://www.anthropic.com/news/model-context-protocol' },
    ],
    content: `# O que é o MCP (Model Context Protocol)?

O Model Context Protocol (MCP) é um padrão aberto para conectar aplicações de IA a ferramentas e dados externos. Antes dele, cada app de IA precisava construir uma integração sob medida para cada ferramenta — N apps × M ferramentas significavam N×M adaptadores. O MCP reduz isso a N + M: um app implementa o protocolo uma vez como *cliente*, uma ferramenta o expõe uma vez como *servidor*, e qualquer cliente pode falar com qualquer servidor. A analogia padrão pegou porque é precisa: **USB-C para IA**.

## Por que ele existe

LLMs só são tão úteis quanto o contexto que conseguem alcançar. Seu assistente fica drasticamente mais capaz quando pode ler seus arquivos, consultar seu banco de dados, buscar nos seus chamados ou enviar uma mensagem — mas ligar tudo isso de forma improvisada produzia integrações frágeis, não portáveis e presas a um único fornecedor. O MCP, lançado pela Anthropic no fim de 2024 e desde então amplamente adotado pelo setor, padroniza essa ligação. Em 2026 o ecossistema conta milhares de servidores da comunidade e de fornecedores para tudo, de GitHub e Slack a bancos de dados e navegadores.

## Como funciona

O MCP tem três papéis:

- **Host** — a aplicação de IA com a qual o usuário interage (um app de chat, uma IDE, um runtime de agente).
- **Cliente** — a conexão de protocolo que o host abre, uma por servidor.
- **Servidor** — um programa (geralmente pequeno) que expõe capacidades pelo protocolo, seja localmente via stdio ou remotamente por HTTP.

Um servidor pode oferecer três tipos de capacidade:

| Primitiva | O que é | Exemplo |
| --- | --- | --- |
| **Ferramentas** | Funções que o modelo pode chamar | \`create_issue\`, \`query_database\` |
| **Recursos** | Dados que o host pode ler para o contexto | Um arquivo, um esquema, um painel |
| **Prompts** | Modelos parametrizados reutilizáveis | "Revise este PR com a nossa checklist" |

O modelo do host vê as definições de ferramenta, decide quando chamá-las, e o servidor executa e devolve os resultados — o protocolo cuida da descoberta, da invocação e do transporte de forma uniforme.

## MCP vs chamada de função pura

A chamada de função é como um *modelo* invoca uma função que o desenvolvedor registrou naquela única aplicação. O MCP padroniza a camada ao redor: de onde vêm as ferramentas, como são descobertas, autenticadas e transportadas — para que o mesmo servidor funcione em qualquer app compatível com MCP sem mudança de código. Eles se compõem: por baixo, uma chamada de ferramenta MCP ainda chega ao modelo como chamada de função.

## Como começar

A rampa de acesso prática é usar servidores existentes, não escrever um: a maioria dos grandes clientes de IA deixa você adicionar um servidor MCP com algumas linhas de configuração, e os SDKs oficiais (TypeScript, Python e outros) tornam escrever o seu próprio servidor um projeto de uma tarde — defina algumas funções tipadas, e todo cliente MCP poderá usá-las.

## Perguntas frequentes

**O MCP está preso a um único fornecedor de modelo?**
Não. Começou na Anthropic, mas é uma especificação aberta com adoção de vários fornecedores e um processo de governança aberto; existem clientes e servidores em todos os grandes ecossistemas.

**É seguro conectar servidores arbitrários?**
Trate servidores MCP como extensões de navegador: eles rodam com permissões reais. Use fontes confiáveis, revise quais ferramentas um servidor expõe e prefira hosts que exijam aprovação explícita do usuário a cada ação sensível.

**Quando devo escrever meu próprio servidor?**
Quando seu time tem uma API ou um conjunto de dados internos que várias ferramentas de IA deveriam alcançar — um servidor o disponibiliza para todo cliente compatível com MCP que a sua empresa usa.`,
  },
  {
    topicKey: 'vector-databases',
    title: 'O que é um banco de dados vetorial — e quando você precisa de um?',
    question: 'O que é um banco de dados vetorial e quando eu realmente preciso de um?',
    summary:
      'Bancos de dados vetoriais armazenam embeddings e encontram o "significado mais próximo" em vez de correspondências exatas, sustentando busca semântica e RAG. Abaixo de ~1 milhão de vetores, ferramentas mais simples como o pgvector costumam bastar.',
    tags: ['ai', 'banco de dados vetorial', 'embeddings', 'busca', 'rag'],
    language: 'pt',
    image: { prompt: promptOf('vector-databases'), alt: 'Um ponto de consulta gerando ondulações por constelações agrupadas de vetores de embedding' },
    sources: [
      { title: 'Malkov & Yashunin, "Efficient and Robust ANN Search Using HNSW Graphs" (2016)', url: 'https://arxiv.org/abs/1603.09320' },
      { title: 'FAISS — biblioteca para busca de similaridade eficiente', url: 'https://github.com/facebookresearch/faiss' },
      { title: 'pgvector — similaridade vetorial para Postgres', url: 'https://github.com/pgvector/pgvector' },
    ],
    content: `# O que é um banco de dados vetorial — e quando você precisa de um?

Um banco de dados vetorial armazena **embeddings** — listas de números que representam o significado de texto, imagens ou áudio — e responde a uma consulta extremamente bem: *"encontre os itens mais parecidos com este"*. Essa é a operação por trás de busca semântica, recuperação para RAG, recomendações e detecção de duplicatas. Se você precisa de um dedicado depende quase inteiramente da escala.

## Embeddings em um minuto

Um modelo de embedding mapeia o conteúdo para um ponto em um espaço de alta dimensão (em geral 256–3072 dimensões), de modo que significados parecidos caiam perto uns dos outros. "Como redefino minha senha" e "Estou trancado para fora da minha conta" compartilham pouco vocabulário, mas ficam próximos como vetores. A similaridade é medida geometricamente — normalmente por similaridade do cosseno — então a busca vira: faça o embedding da consulta e encontre os pontos armazenados mais próximos.

## O que faz disso um problema de *banco de dados*

Comparar uma consulta com cada vetor armazenado (força bruta) é exato, porém linear — tudo bem para milhares de itens, lento para milhões. Bancos de dados vetoriais usam índices de **vizinho mais próximo aproximado (ANN)**, sendo o mais famoso o grafo HNSW, que encontram ~99% dos vizinhos verdadeiros numa fração mínima do tempo. Em torno desse núcleo eles somam as comodidades usuais de banco de dados: filtragem por metadados ("apenas os documentos deste cliente"), atualizações e exclusões, persistência e escala horizontal.

## Quando você precisa de um — com honestidade

| Tamanho do corpus | Escolha razoável |
| --- | --- |
| Até ~100 mil vetores | Um array em memória, FAISS ou extensões do SQLite — força bruta serve |
| ~100 mil a alguns milhões | **pgvector no Postgres que você já roda** — o padrão pragmático |
| Muitos milhões, QPS alto, multicliente | Motor dedicado: Qdrant, Milvus, Weaviate ou serviços gerenciados como o Pinecone |

O erro de arquitetura mais comum é adicionar uma nova peça de infraestrutura para 50 mil fragmentos. Se você já roda Postgres, o pgvector mantém os vetores ao lado dos seus dados relacionais, transacionais e passíveis de join. Recorra a um motor dedicado quando tiver escala real, metas de latência rígidas ou busca filtrada pesada.

## Alavancas de qualidade que importam mais que o banco

- **Fragmentação**: como você divide os documentos afeta a recuperação mais do que qual motor você escolhe. Os fragmentos devem ser ideias autocontidas, em geral de 200–800 tokens com sobreposição.
- **Escolha do modelo de embedding**: modelos multilíngues mais novos superam materialmente os antigos; refazer o embedding de um corpus é chato, então escolha com cuidado.
- **Busca híbrida**: combinar similaridade vetorial com a pontuação clássica de palavras-chave (BM25) captura nomes, códigos e termos raros que os embeddings borram.
- **Reranqueamento**: recuperar 50 candidatos de forma barata e repontuar os melhores com um cross-encoder costuma elevar a qualidade da resposta mais do que ajustar o índice.

## Perguntas frequentes

**Embeddings vazam meus dados para o provedor de embedding?**
O texto vai para quem calcula o embedding. Com APIs hospedadas, é o provedor (verifique os termos de retenção); modelos de embedding abertos rodam totalmente local.

**Os vetores podem ser atualizados quando os documentos mudam?**
Sim — mas é responsabilidade do seu pipeline refazer a fragmentação e o embedding dos documentos alterados. Vetores obsoletos servindo conteúdo antigo em silêncio é o bug clássico de produção.

**Uma dimensão de embedding maior é melhor?**
Não automaticamente. Dimensões mais altas custam armazenamento e latência; muitos modelos modernos oferecem dimensões truncáveis em que 512–1024 retêm quase toda a qualidade. Avalie no seu próprio conjunto de recuperação.`,
  },
  {
    topicKey: 'ai-coding-assistants',
    title: 'Como extrair valor real de assistentes de programação com IA',
    question: 'Como eu uso assistentes de programação com IA de forma eficaz sem prejudicar a qualidade do código?',
    summary:
      'Ferramentas de código com IA dão seus maiores ganhos em código repetitivo, testes e território desconhecido — se você der contexto e revisar a saída. Práticas que funcionam, riscos a gerenciar e onde o tempo de fato vai.',
    tags: ['ai', 'programação', 'assistentes de código', 'ferramentas de desenvolvimento', 'produtividade'],
    language: 'pt',
    image: { prompt: promptOf('ai-coding-assistants'), alt: 'Mãos humana e de IA construindo juntas uma ponte de blocos de código' },
    sources: [
      { title: 'Peng et al., "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot" (2023)', url: 'https://arxiv.org/abs/2302.06590' },
      { title: 'SWE-bench — avaliando LLMs em issues reais do GitHub', url: 'https://www.swebench.com' },
    ],
    content: `# Como extrair valor real de assistentes de programação com IA

Assistentes de programação com IA são genuinamente produtivos — estudos controlados mostraram grandes acelerações em tarefas autocontidas e, em 2026, ferramentas agênticas que rodam testes e editam vários arquivos foram bem além do autocompletar. Mas os ganhos são desiguais, e dependem de dois hábitos: **dar ao agente contexto de verdade** e **revisar o que ele escreve**. Times que pulam qualquer um dos dois tendem a entregar bugs sutis mais rápido.

## Onde os ganhos se concentram

- **Código repetitivo e de cola**: endpoints CRUD, configuração, serialização, wrappers de cliente de API.
- **Testes**: gerar suítes completas de testes unitários a partir de código existente é um dos usos de maior valor por minuto.
- **Território desconhecido**: uma nova linguagem, framework ou API — o assistente comprime horas de leitura de documentação em minutos.
- **Refatorações mecânicas**: renomeações, mudanças de assinatura, aplicar um padrão conhecido por vários arquivos.
- **Explicar código**: entrar em um módulo legado fazendo perguntas sobre ele.

Onde os ganhos encolhem: lógica de domínio profunda, kernels críticos em desempenho, grandes decisões de arquitetura e código em que errar sai caro. Ali, o assistente é um parceiro de sparring, não um autor.

## Práticas que separam bons de maus resultados

**Delimite o pedido.** "Adicione paginação a este endpoint, seguindo como o \`listUsers\` faz" ganha de "melhore esta API". Incrementos pequenos e verificáveis se acumulam; gerações de mil linhas são pesadelos de revisão.

**Alimente o contexto de propósito.** Aponte o agente para os arquivos relevantes, a mensagem de erro, o esquema, as convenções do time. Assistentes agênticos modernos conseguem achar contexto sozinhos — mas nomear os arquivos iniciais certos ainda corta pela metade a perambulação deles.

**Deixe-o rodar os testes.** A maior melhoria isolada de confiabilidade é um ciclo de feedback: um assistente que consegue executar a suíte de testes pega os próprios erros em vez de despachá-los para você.

**Revise como o PR de um júnior confiante.** O código lê de forma plausível; é exatamente por isso que ler por cima é perigoso. Cheque casos extremos, tratamento de erro e superfícies sensíveis à segurança (validação de entrada, autenticação, consultas) com atenção total.

**Mantenha testes e tipos como guarda-corpos.** Tipagem forte e boa cobertura convertem "a IA quebrou algo" de um incidente em produção numa execução de CI vermelha.

## Tipo de tarefa → expectativa realista

| Tarefa | Expectativa |
| --- | --- |
| Testes unitários para código existente | Grande aceleração, alta confiabilidade |
| Código repetitivo/scaffolding | Grande aceleração |
| Correção de bug com teste reproduzível | Bom — ferramentas agênticas costumam acertar |
| Funcionalidade em framework desconhecido | Grande compressão da curva de aprendizado |
| Trabalho sutil de concorrência/desempenho | Ajuda modesta; verifique com rigor |
| Projeto de sistema | Parceiro de discussão útil, não um oráculo |

## Guarda-corpos no nível do time

Adote de forma explícita, não às escondidas: combine onde os assistentes são incentivados, exija o mesmo nível de revisão para o código gerado, fique atento a saída literal sensível a licença em bases reguladas e mantenha o CI como autoridade. E proteja o ciclo de aprendizado — juniores que colam sem ler estagnam; juniores que interrogam o assistente aprendem mais rápido do que qualquer geração anterior.

## Perguntas frequentes

**Os assistentes vão me tornar um engenheiro pior?**
Eles corroem as habilidades que você deixa de praticar e amplificam as que você direciona. Engenheiros que sabem especificar, decompor e verificar ganham mais alavancagem a cada ano; pura velocidade de digitação deixa de importar.

**Por que o assistente produz, com confiança, código que não compila?**
Ele prevê código plausível e, às vezes, alucina APIs. Trate compilação e testes como o árbitro — e prefira ferramentas que compilam/rodam o código antes de mostrá-lo a você.

**Agente ou autocompletar?**
Os dois, para trabalhos diferentes: complemento em linha para o fluxo enquanto você escreve; modo agêntico para tarefas autocontidas que você consegue descrever e verificar, como "faça estes testes passarem".`,
  },
  {
    topicKey: 'llm-hallucinations',
    title: 'Por que os grandes modelos de linguagem alucinam?',
    question: 'Por que os grandes modelos de linguagem inventam coisas, e como dá para reduzir as alucinações?',
    summary:
      'LLMs são treinados para produzir texto plausível, não verdade verificada — quando o conhecimento acaba, o chute fluente preenche a lacuna. Por que acontece, quando piora e as mitigações que de fato funcionam.',
    tags: ['ai', 'llm', 'alucinação', 'confiabilidade', 'aprendizado de máquina'],
    language: 'pt',
    image: { prompt: promptOf('llm-hallucinations'), alt: 'Um feixe de um núcleo neural renderizando estrutura sólida e névoa que se dissolve' },
    sources: [
      { title: 'Huang et al., "A Survey on Hallucination in Large Language Models" (2023)', url: 'https://arxiv.org/abs/2311.05232' },
      { title: 'Lin et al., "TruthfulQA: Measuring How Models Mimic Human Falsehoods" (2021)', url: 'https://arxiv.org/abs/2109.07958' },
      { title: 'Liu et al., "Lost in the Middle: How Language Models Use Long Contexts" (2023)', url: 'https://arxiv.org/abs/2307.03172' },
    ],
    content: `# Por que os grandes modelos de linguagem alucinam?

Um modelo de linguagem é treinado para fazer uma coisa: prever o texto que plausivelmente continua o que veio antes. Verdade e plausibilidade costumam coincidir — é por isso que os modelos são úteis — mas, quando o modelo não tem o fato que você pediu, o objetivo de treino ainda exige saída fluente. O resultado é uma resposta confiante, bem-formada e errada. A alucinação não é um defeito parafusado nos LLMs; é o comportamento padrão de sistemas que maximizam plausibilidade na borda do seu conhecimento.

## A mecânica

- **Compressão com perdas.** O treino espreme terabytes de texto num conjunto fixo de pesos. O conhecimento comum sobrevive com alta fidelidade; fatos raros — detalhes de uma cidadezinha, artigos menores, especificações de produtos de nicho — ficam borrados ou se perdem, e o modelo não sabe dizer com segurança quais.
- **Sem etapa de consulta.** Um modelo simples não consulta um banco de dados antes de responder; ele gera a partir da memória estatística. Não há uma flag interna que diga "isto é fato recuperado" versus "isto é completar padrão".
- **O treino recompensa responder.** Modelos ajustados às preferências humanas aprendem que respostas prestativas, confiantes e completas são bem avaliadas — historicamente, benchmarks e avaliadores penalizavam o "não sei", ensinando os modelos a chutar.
- **Acúmulo de erros.** A geração é sequencial; um token errado lá no começo (um nome fabricado, um ano errado) é elaborado num parágrafo falso e coerente.

## Onde piora, de forma previsível

Citações e referências (o formato é fácil de imitar, o conteúdo não está memorizado), números e datas precisos, entidades raras, documentos longos (os modelos atendem com menos confiabilidade ao meio de contextos longos), aritmética feita no corpo do texto e qualquer pergunta baseada numa falsidade que o modelo aceita educadamente.

## Mitigações que funcionam

| Mitigação | O que ela ataca |
| --- | --- |
| RAG / embasamento em documentos recuperados | Substitui a memória por fatos fornecidos; viabiliza citações |
| Uso de ferramentas (calculadora, código, busca) | Terceiriza o que os modelos calculam pior |
| "Responda só a partir do contexto; senão, diga desconhecido" | Dá permissão para recusar |
| Temperatura mais baixa para tarefas factuais | Apara a amostragem criativa-porém-errada |
| Autoverificação / checagem em segunda passada | Pega inconsistências que a primeira passada perdeu |
| Citações exigidas + fluxo de conferência por amostragem | Torna os erros detectáveis por humanos |
| Modelos de raciocínio em problemas difíceis | Resolver por etapas reduz erros forçados |

O embasamento é o pesos-pesados: quando o trecho certo está no contexto, o trabalho do modelo passa de *lembrar* para *ler*, o que ele faz de forma muito mais confiável. É por isso que o RAG continua sendo a arquitetura padrão para produtos factuais.

## Dá para resolver totalmente?

Não com as arquiteturas atuais — um sistema que precisa sempre produzir texto às vezes produzirá texto sem embasamento. A pesquisa segue reduzindo as taxas (melhor calibração, treinar modelos para se abster, camadas de verificação), e modelos capazes de raciocínio alucinam menos em problemas de várias etapas. A postura de engenharia, em 2026: projete **assumindo** alucinação residual — embase as respostas, exija citações para afirmações que importam, mantenha humanos no ciclo onde os erros saem caros.

## Perguntas frequentes

**Por que o modelo soa MAIS confiante quando está errado?**
Fluência e confiança são padrões estilísticos aprendidos do texto, sem correlação com a certeza interna. Não use o tom como sinal de verdade.

**Perguntar "você tem certeza?" ajuda?**
Às vezes dispara uma autorrevisão útil, às vezes uma concordância bajuladora com a dúvida que você insinuou. Verificação independente ganha do interrogatório.

**Modelos maiores são mais verdadeiros?**
Em geral sim na factualidade ampla, mas nenhum tamanho elimina a fabricação — e o estilo confiante também cresce com a escala. A escala encolhe o problema; embasamento e verificação gerenciam o que resta.`,
  },
  {
    topicKey: 'open-vs-closed-llms',
    title: 'LLMs de código aberto vs fechado: como escolher',
    question: 'Devo construir sobre grandes modelos de linguagem de código aberto ou de código fechado?',
    summary:
      'APIs fechadas compram capacidade de fronteira com zero operação; modelos de peso aberto compram controle, privacidade e escala barata. Os fatores decisivos são a sensibilidade dos dados, a economia de volume e quanta capacidade sua tarefa realmente exige.',
    tags: ['ai', 'llm', 'código aberto', 'estratégia', 'infraestrutura'],
    language: 'pt',
    image: { prompt: promptOf('open-vs-closed-llms'), alt: 'Um núcleo de malha aberta ao lado de um núcleo polido e selado com uma única porta' },
    sources: [
      { title: 'LMArena — placar comunitário comparando modelos abertos e fechados', url: 'https://lmarena.ai' },
      { title: 'Hugging Face — hub de modelos abertos', url: 'https://huggingface.co/models' },
    ],
    content: `# LLMs de código aberto vs fechado: como escolher

"Aberto vs fechado" é menos uma questão de ideologia do que de aquisição: **quem roda o modelo, quem vê seus dados e quem absorve o fardo operacional.** Modelos fechados (servidos por API — as famílias GPT, Claude e Gemini) vendem capacidade de fronteira com zero infraestrutura. Modelos de peso aberto (as famílias Llama, Qwen, DeepSeek, Mistral e muitas outras) entregam os pesos a você e, com eles, controle, privacidade e a conta de servir.

Uma observação de terminologia que importa em contratos: a maioria dos modelos "de código aberto" é, com precisão, **de peso aberto** — você pode baixar e rodar, mas os dados de treino não são publicados e as licenças podem trazer restrições de uso. Leia a licença, não o marketing.

## A tabela de trade-offs

| Dimensão | Fechado (API) | Peso aberto (auto-hospedado) |
| --- | --- | --- |
| Capacidade de pico | Fronteira; mais forte em raciocínio difícil | Os melhores modelos abertos se aproximam e lideram em custo por qualidade |
| Formato de custo | Por token, escala com o uso | Infra fixa + operação, escala com a capacidade |
| Controle de dados | Os dados transitam pelo provedor (verifique termos de retenção/treino) | Nunca saem da sua rede |
| Personalização | Prompting, algum fine-tuning hospedado | Fine-tuning completo, quantização, cirurgia |
| Fardo operacional | Nenhum | GPUs, pilha de serviço, atualizações, plantão |
| Estabilidade | Modelos são descontinuados no cronograma do fornecedor | Os pesos são seus para sempre |
| Conformidade | Certificações do fornecedor | A história mais fácil para regras estritas de residência de dados |

## Quando o fechado vence

Você precisa do raciocínio mais forte disponível; seu volume é modesto ou irregular; você não tem capacidade de operação de GPU/ML; você quer ganhos de capacidade entregues a você continuamente. Para o primeiro ano da maioria dos times de produto, uma API de fronteira é o caminho mais rápido para descobrir se o produto funciona — otimize depois que funcionar.

## Quando o aberto vence

Os dados não podem sair (saúde, defesa, residência estrita); volume alto e sustentado faz o preço por token dominar suas margens; você precisa de personalização profunda ou de um especialista pequeno e rápido destilado para uma tarefa; você está embutindo um modelo em hardware ou em ambientes isolados; ou o aprisionamento a um fornecedor é um risco estratégico que você é pago para evitar.

## O padrão em que a maioria dos times maduros chega

**Roteie, não jure lealdade.** Um modelo fechado capaz cuida da cauda difícil e de baixo volume; um modelo aberto ajustado cuida do núcleo de alto volume e bem compreendido; cargas sensíveis ficam on-premises. Camadas de abstração e pilhas de serviço compatíveis com OpenAI tornam o roteamento multimodelo barato de construir, e a distância entre os níveis é remedida a cada trimestre — porque, em 2026, ela continua se movendo.

## Perguntas frequentes

**Os modelos abertos estão "uma geração atrás"?**
A distância na fronteira persiste, mas encolheu drasticamente, e para muitas tarefas concretas (extração, resumo, codificação de rotina) modelos abertos fortes são simplesmente suficientes. Avalie sua tarefa, não as manchetes.

**Auto-hospedar é mesmo mais barato?**
Só com utilização. Uma GPU servindo a 5% de capacidade é a fábrica de tokens mais cara da Terra; APIs gerenciadas de modelos abertos são o meio-termo — pesos abertos, GPUs de outra pessoa.

**Posso trocar depois?**
O comportamento em nível de prompt transfere de forma imperfeita entre modelos. Mantenha uma suíte de avaliação desde o primeiro dia; o custo de migração é, na maior parte, revalidação, e as avaliações transformam isso de semanas de achismo em dias de diffs.`,
  },
  {
    topicKey: 'llm-tokens-pricing',
    title: 'O que são tokens e como funciona a precificação de LLMs?',
    question: 'O que exatamente é um token, e como os provedores de LLM cobram pelo uso?',
    summary:
      'Tokens são os pedaços de subpalavra que os modelos leem e escrevem — cerca de ¾ de uma palavra em inglês cada. A precificação de API é por milhão de tokens, com a saída custando várias vezes a entrada, e cache/lote como as grandes alavancas.',
    tags: ['ai', 'llm', 'tokens', 'precificação', 'api'],
    language: 'pt',
    image: { prompt: promptOf('llm-tokens-pricing'), alt: 'Um prisma fatiando uma fita de texto-luz em tokens pesados numa balança' },
    sources: [
      { title: 'tiktoken — tokenizador BPE rápido usado pelos modelos da OpenAI', url: 'https://github.com/openai/tiktoken' },
      { title: 'Sennrich et al., "Neural Machine Translation of Rare Words with Subword Units" (BPE, 2015)', url: 'https://arxiv.org/abs/1508.07909' },
    ],
    content: `# O que são tokens e como funciona a precificação de LLMs?

Os modelos não leem caracteres nem palavras — eles leem **tokens**: pedaços de subpalavra produzidos por um tokenizador. "Understanding" pode ser um token; "unconstitutionally" pode ser quatro; um emoji raro pode ser três. Todo limite de capacidade (janela de contexto) e toda fatura de API são denominados nessas unidades, então uma noção aproximada delas se paga rápido.

## Regras de bolso

- **Inglês**: 1 token ≈ 4 caracteres ≈ ¾ de uma palavra. Um documento de 1.000 palavras ≈ 1.300–1.500 tokens.
- **Código**: mais denso em tokens que a prosa — pontuação, indentação e identificadores todos custam.
- **Chinês/japonês/coreano**: cerca de 1–2 caracteres por token nos tokenizadores modernos; por *informação transmitida*, o texto CJK costuma ser comparável ao inglês ou um pouco mais caro.
- **Números e URLs**: surpreendentemente caros; IDs longos se desfazem em muitos tokens.

Os tokenizadores são construídos por codificação por pares de bytes (BPE): partindo dos bytes e fundindo repetidamente os pares mais frequentes, de modo que cadeias comuns viram tokens únicos. Cada família de modelos tem seu próprio tokenizador — as contagens diferem entre provedores, e é por isso que comparações de custo devem ser feitas no *seu* tráfego real.

## Como o medidor roda

A precificação de API tem um formato padrão entre provedores:

| Medidor | O que conta | Relação típica |
| --- | --- | --- |
| **Tokens de entrada** | Tudo o que você envia: prompt de sistema, histórico, documentos recuperados, a pergunta | Tarifa de base |
| **Tokens de saída** | Tudo o que o modelo gera, incluindo o raciocínio oculto em alguns modelos de raciocínio | Em geral ~3–5× a tarifa de entrada |
| **Entrada em cache** | Prefixos estáveis repetidos (prompts de sistema, documentos longos) | Muitas vezes ~10× mais barato que entrada nova |
| **Lote/assíncrono** | Jobs não urgentes enviados em massa | Em geral ~metade do preço |

Daí seguem dois fatos estruturais. Primeiro, **o histórico da conversa é reenviado a cada turno** — o custo de um chat cresce de forma quadrática com o comprimento, a menos que você trunque, resuma ou conte com o cache. Segundo, **a saída domina** quando você gera texto longo, então instruções de "seja conciso" e limites de saída são controles de custo reais, não só preferências de estilo.

## Estimando uma carga de trabalho

A aritmética é sempre a mesma: (requisições por dia) × (tokens médios de entrada × tarifa de entrada + tokens médios de saída × tarifa de saída). Exemplo trabalhado com tarifas de exemplo — digamos que a entrada custe US$ 3 e a saída US$ 15 por milhão de tokens: um bot de suporte respondendo a 10.000 consultas/dia com prompts de 2.000 tokens (instruções + contexto recuperado) e respostas de 300 tokens custa 10.000 × (2.000×US$ 3 + 300×US$ 15)/1M ≈ **US$ 105/dia**, dois terços disso de entrada. Essa proporção é típica de apps RAG — e é por isso que o cache de prompt e o enxugamento de contexto costumam economizar mais do que trocar de modelo.

## As grandes alavancas, em ordem

1. **Coloque em cache os prefixos estáveis** — ganhos quase de graça para qualquer app com um prompt de sistema fixo longo ou documentos compartilhados.
2. **Dimensione o modelo certo** — roteie o tráfego fácil para um nível mais barato; reserve os modelos de fronteira para a cauda difícil.
3. **Enxugue o contexto** — recupere menos fragmentos, e melhores; resuma turnos antigos do chat; remova boilerplate duplicado.
4. **Limite e molde a saída** — defina comprimentos máximos; prefira respostas curtas e estruturadas quando possível.
5. **Coloque o não urgente em lote** — classificação noturna e reprocessamentos não deveriam pagar preços interativos.

## Perguntas frequentes

**Por que fui cobrado por mais tokens do que o comprimento do meu texto sugere?**
Prompts de sistema, definições de ferramenta, formatação das mensagens e (em modelos de raciocínio) tokens de pensamento contam todos, e texto não inglês ou cheio de código tokeniza mais denso do que a regra de bolso do inglês.

**Janelas de contexto mudam a precificação?**
A janela é um limite de capacidade, não um preço — mas enchê-la, sim. Alguns provedores também cobram tarifas premium acima de certos tamanhos de contexto, então chamadas de contexto gigante merecem escrutínio.

**Como eu conto tokens antes de enviar?**
Use a biblioteca de tokenizador do provedor ou o endpoint de contagem de tokens (para tokenizadores da família OpenAI, o tiktoken roda localmente). Para orçamento, a heurística de ≈4 caracteres costuma ficar dentro de 20%.`,
  },
];
