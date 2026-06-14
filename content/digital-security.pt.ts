import type { DraftArticle } from './types';
import { digitalSecurityEn } from './digital-security.en';

// Batch: Privacidade & Segurança Digital (versão nativa em português). Mesmos
// títulos e topicKeys de digital-security.en.ts; conteúdo escrito de forma
// nativa para leitores em português. Imagens compartilhadas por topicKey.

const promptOf = (key: string): string => {
  const hit = digitalSecurityEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const digitalSecurityPt: DraftArticle[] = [
  {
    topicKey: 'password-managers',
    title: 'Por que você deveria usar um gerenciador de senhas',
    question: 'O que é um gerenciador de senhas e ele é realmente mais seguro do que decorar minhas senhas?',
    summary:
      'Um gerenciador de senhas gera e guarda uma senha forte e única para cada conta atrás de uma única senha-mestra, de modo que o vazamento de um site não destrava os demais. É o hábito de segurança de maior impacto para a maioria das pessoas.',
    tags: ['segurança', 'privacidade', 'senhas', 'segurança digital'],
    language: 'pt',
    image: {
      prompt: promptOf('password-managers'),
      alt: 'Uma chave-mestra abrindo um cofre com centenas de chaves únicas',
    },
    sources: [
      { title: 'NIST — Diretrizes de Identidade Digital (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Use senhas fortes / gerenciadores de senhas', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# Por que você deveria usar um gerenciador de senhas

O problema central que um gerenciador de senhas resolve é a **reutilização**. Nenhum ser humano consegue lembrar de cem senhas fortes diferentes, então as pessoas reaproveitam um punhado delas — o que significa que, no momento em que qualquer site é violado, os atacantes pegam aquele par de e-mail e senha e o testam no seu banco, no seu e-mail e em todos os outros lugares. Esse ataque automatizado (chamado de credential stuffing) é uma das formas mais comuns de contas serem invadidas. Um gerenciador de senhas o elimina pela raiz ao dar a cada conta uma senha própria, única e aleatória.

## Como funciona

Um gerenciador de senhas é um cofre criptografado. Você lembra exatamente **uma** senha-mestra forte; ele lembra de todo o resto:

- **Gera** senhas longas e aleatórias (ex.: \`v8#mQ2!pLx9$\`) que você nunca precisa digitar nem decorar.
- **Guarda** tudo criptografado, trancado pela sua senha-mestra.
- **Preenche automaticamente** a credencial certa no site certo — o que, de bônus, resiste a phishing, porque ele não vai preencher a senha real do seu banco em um domínio falso parecido.

O cofre é criptografado de modo que nem a empresa que fornece o gerenciador consegue ler suas senhas — uma propriedade chamada conhecimento zero (zero-knowledge). Sua senha-mestra nunca sai do seu dispositivo em forma utilizável.

## A objeção, respondida

A preocupação instintiva é "não é perigoso colocar todas as minhas senhas em um só lugar?" Parece arriscado, mas a conta vai no sentido contrário:

| Sem um gerenciador | Com um gerenciador |
| --- | --- |
| Poucas senhas, muito reutilizadas | Senha única por site |
| Um vazamento → muitas contas caem | Um vazamento → uma conta, contida |
| Escolhas fracas e fáceis de lembrar | Escolhas longas, aleatórias, impossíveis de quebrar |
| Senhas digitadas em sites de phishing | Preenchimento recusa domínios errados |

Sim, a senha-mestra é um ponto único de falha — então você protege *bem ela* (uma frase-senha longa, mais autenticação de dois fatores no próprio gerenciador) e aceita que defender ferozmente um segredo é melhor do que defender mal uma centena deles.

## Como escolher e começar

Gerenciadores confiáveis — tanto serviços em nuvem bem avaliados quanto opções offline/de código aberto respeitadas — são todos drasticamente melhores do que a reutilização. Orientações práticas:

- **Senha-mestra**: faça dela uma frase-senha longa de palavras aleatórias, única, nunca usada em nenhum outro lugar. É a única que você de fato memoriza.
- **Ative a autenticação de dois fatores** na própria conta do gerenciador.
- **Migre aos poucos**: deixe-o importar as senhas existentes e depois troque as reutilizadas primeiro nas contas importantes (e-mail, banco, compras principais).
- **Até o gerenciador embutido no navegador** já é melhor do que reutilizar — o comportamento decisivo é ter senhas únicas em todo lugar, não a marca específica.

## Perguntas frequentes

**E se eu esquecer minha senha-mestra?**
Com criptografia de conhecimento zero de verdade, o provedor geralmente não consegue recuperá-la — esse é justamente o objetivo. Configure as opções de recuperação do gerenciador (kit de emergência, código de recuperação) logo no início e guarde isso offline.

**A sincronização em nuvem é segura?**
O cofre é sincronizado já criptografado, então o servidor de sincronização só guarda um bloco ilegível. É a criptografia, não a rede, que o protege.

**As senhas salvas no navegador são suficientes?**
São muito melhores do que reutilizar e bastam para muita gente. Gerenciadores dedicados acrescentam uso entre navegadores, compartilhamento seguro, alertas de vazamento e isolamento mais forte — vale a pena conforme sua lista de contas cresce.`,
  },
  {
    topicKey: 'two-factor-auth',
    title: 'Autenticação de dois fatores: qual tipo é realmente seguro?',
    question: 'O que é a autenticação de dois fatores e por que o SMS é a versão mais fraca?',
    summary:
      'A autenticação de dois fatores adiciona uma segunda prova além da sua senha, de modo que uma senha roubada sozinha não basta. Mas os tipos não são iguais: códigos por SMS podem ser interceptados ou alvo de troca de chip, enquanto aplicativos autenticadores e chaves de hardware são bem mais fortes.',
    tags: ['segurança', 'dois fatores', 'autenticação', 'segurança digital'],
    language: 'pt',
    image: {
      prompt: promptOf('two-factor-auth'),
      alt: 'Uma porta que exige uma chave e um token rotativo separado de luz',
    },
    sources: [
      { title: 'NIST — Diretrizes de Identidade Digital (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Mais do que uma senha (autenticação multifator)', url: 'https://www.cisa.gov/MFA' },
    ],
    content: `# Autenticação de dois fatores: qual tipo é realmente seguro?

A autenticação de dois fatores (2FA, ou mais amplamente MFA) significa que entrar exige **dois tipos diferentes de prova**: algo que você *sabe* (sua senha) mais algo que você *tem* (um código, um aplicativo, uma chave física). O objetivo é resiliência — mesmo que um atacante roube sua senha por meio de um vazamento ou de phishing, ele ainda não consegue entrar sem o segundo fator. Ativá-la é uma das coisas mais eficazes que você pode fazer. Mas o segundo fator vem em várias formas, e elas estão longe de ser iguais em força.

## A escada, da mais fraca à mais forte

| Método | Como funciona | Fraqueza |
| --- | --- | --- |
| **Código por SMS** | Um código enviado por mensagem ao seu telefone | Troca de chip (SIM swap), interceptação de rede, suscetível a phishing |
| **Aplicativo autenticador** | App gera um código de 6 dígitos que muda a cada 30s | Suscetível a phishing se você o digitar em um site falso |
| **Aprovação por push** | Aviso de "Aprovar este login?" no seu telefone | Ataques de "fadiga" — spam até você tocar em sim |
| **Chave de segurança de hardware / passkey** | Uma chave física ou credencial atrelada ao dispositivo, vinculada criptograficamente ao site real | Resiste a phishing por design |

Tudo nesta lista é melhor do que só a senha. Mas os degraus importam.

## Por que o SMS é o degrau fraco

Códigos por mensagem foram a primeira 2FA de massa e continuam comuns, mas têm fraquezas reais e já exploradas:

- **Troca de chip (SIM swap)**: um atacante convence (ou suborna) sua operadora a transferir seu número para o chip dele, e seus códigos passam a chegar no telefone *dele*. Essa é uma forma documentada e recorrente de contas de alto valor serem esvaziadas.
- **Interceptação**: a sinalização da rede telefônica subjacente tem falhas conhecidas que podem desviar mensagens.
- **Ainda suscetível a phishing**: uma página de login falsa pode simplesmente pedir o código por SMS e repassá-lo em tempo real.

O veredito honesto: **a 2FA por SMS é muito melhor do que nada** — mantenha-a onde for a única opção — mas mova as contas importantes (e-mail, finanças, identidade principal) para cima na escada.

## O que de fato usar

- **Use por padrão um aplicativo autenticador** (códigos rotativos) — gratuito, fácil, imune à troca de chip e suportado em quase todo lugar.
- **Nas suas contas mais críticas, use uma chave de hardware ou passkey** — elas são *resistentes a phishing*: a credencial é vinculada criptograficamente ao site genuíno, então simplesmente não vai se autenticar em um site parecido, derrotando o ataque que vence todo método baseado em código.
- **Proteja seu e-mail primeiro.** Ele é a chave-mestra — as redefinições de senha de todo o resto passam por ele, então merece o seu fator mais forte.

## Perguntas frequentes

**Qualquer 2FA é melhor do que nenhuma?**
Sim, sem dúvida. Até o SMS bloqueia a esmagadora maioria dos ataques automatizados. Não deixe que o papo de "SMS é fraco" o convença a não ativá-la onde é tudo o que se oferece.

**O que acontece se eu perder meu telefone / chave?**
Salve os códigos de backup/recuperação que cada serviço oferece ao se cadastrar e registre um segundo fator (uma chave reserva, ou o app em um segundo dispositivo). Guarde os códigos de recuperação offline.

**Os avisos de "aprovar" por push são seguros?**
Bons, mas vulneráveis a ataques de fadiga — avisos sem fim na esperança de que você toque em "aprovar" para fazer parar. Nunca aprove um login que você não iniciou; prefira avisos com correspondência de número quando disponíveis.`,
  },
  {
    topicKey: 'passkeys',
    title: 'O que são passkeys e elas estão substituindo as senhas?',
    question: 'O que é uma passkey e como ela é diferente de uma senha?',
    summary:
      'Uma passkey substitui a senha por um par de chaves criptográficas dividido entre o site e o seu dispositivo — nada secreto é digitado ou compartilhado, então não há nada para sofrer phishing, ser reutilizado ou roubado em um vazamento. É a sucessora oficial das senhas segundo a indústria.',
    tags: ['segurança', 'passkeys', 'autenticação', 'senhas'],
    language: 'pt',
    image: {
      prompt: promptOf('passkeys'),
      alt: 'Duas metades de chave provando que se encaixam sem nunca se tocar',
    },
    sources: [
      { title: 'FIDO Alliance — Visão geral de passkeys', url: 'https://fidoalliance.org/passkeys/' },
      { title: 'NIST — Diretrizes de Identidade Digital (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
    ],
    content: `# O que são passkeys e elas estão substituindo as senhas?

Uma passkey é uma credencial de login projetada para corrigir os dois pecados originais da senha: senhas são **segredos compartilhados** (você e o site conhecem a mesma sequência, então ela pode ser roubada de qualquer um dos lados) e são **digitadas** (então podem sofrer phishing ou ser reutilizadas). Uma passkey não é nem compartilhada nem digitada. Ela é construída sobre criptografia de chave pública, e quando você entende a divisão, os benefícios de segurança ficam óbvios.

## A ideia do par de chaves, em termos simples

Quando você cria uma passkey, seu dispositivo gera um **par** de chaves ligadas matematicamente:

- Uma **chave privada** que nunca sai do seu dispositivo (telefone, notebook ou chave de segurança), protegida pela sua impressão digital, rosto ou PIN do dispositivo.
- Uma **chave pública** que é entregue ao site.

A chave pública não é um segredo — ela não pode ser usada para se passar por você. Para entrar, o site envia um desafio; seu dispositivo prova que possui a chave privada correspondente *sem nunca revelá-la*. Nada secreto cruza a rede, e nada reutilizável fica armazenado no servidor.

## Por que isso derrota os ataques comuns

| Ataque | Contra senhas | Contra passkeys |
| --- | --- | --- |
| Vazamento de banco de dados | Rouba senhas (com hash) | Rouba apenas chaves públicas — inúteis para os atacantes |
| Phishing | Site falso captura o que você digita | Nada para digitar; a chave é vinculada ao domínio real |
| Reutilização | Um vazamento destrava muitos sites | Cada passkey é única e específica do site por design |
| Credential stuffing | Funciona em massa | Nada para testar |

A resistência a phishing é o destaque. Uma passkey é vinculada criptograficamente à identidade do site genuíno, então um domínio parecido literalmente não consegue acioná-la — fechando a brecha que até os códigos de aplicativos autenticadores deixam aberta.

## Usando-as hoje

Na prática, uma passkey geralmente parece **desbloquear seu telefone**: um aviso aparece, você confirma com impressão digital ou rosto, e está dentro — sem senha, sem código para copiar. As passkeys costumam sincronizar pelo ecossistema do seu dispositivo (então um telefone novo as mantém) ou ficam em uma chave de segurança de hardware para o nível mais alto de garantia. A adoção é ampla e crescente nas principais plataformas e grandes sites, embora esteja em meio à transição: a maioria dos sites que oferecem passkeys ainda mantém senhas como alternativa.

## Perguntas frequentes

**E se eu perder meu dispositivo?**
Passkeys sincronizadas podem ser recuperadas pela conta da sua plataforma em um novo dispositivo (protegida pela própria segurança forte dela). Para chaves atreladas ao dispositivo, registre uma segunda passkey ou mantenha um método de backup — a mesma disciplina da recuperação de 2FA.

**Uma empresa que sofrer um vazamento pode expor minha passkey?**
Não — o servidor só guarda sua chave pública, que não é um segredo e não pode entrar como você. Essa é a vantagem estrutural sobre os bancos de dados de senhas.

**Ainda preciso de um gerenciador de senhas?**
Por enquanto, sim — as passkeys estão sendo lançadas aos poucos, então você terá uma mistura por anos. Muitos gerenciadores de senhas já guardam passkeys também, tornando-se um cofre unificado para ambos.`,
  },
  {
    topicKey: 'phishing-scams',
    title: 'Como reconhecer phishing e golpes online',
    question: 'Como posso reconhecer um e-mail de phishing ou uma mensagem golpista antes de cair?',
    summary:
      'O phishing fabrica urgência para fazer você agir antes de pensar — um alerta falso, uma oferta boa demais, um link de "verifique agora". As defesas são hábitos, não aparelhos: vá com calma, confira o remetente e o link reais e nunca digite credenciais a partir do link de uma mensagem.',
    tags: ['segurança', 'phishing', 'golpes', 'segurança digital'],
    language: 'pt',
    image: {
      prompt: promptOf('phishing-scams'),
      alt: 'Um anzol disfarçado se aproximando de um peixe que pausa num anel protetor',
    },
    sources: [
      { title: 'CISA — Reconheça e denuncie phishing', url: 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing' },
      { title: 'FTC — Como reconhecer e evitar golpes de phishing', url: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams' },
    ],
    content: `# Como reconhecer phishing e golpes online

O phishing é um golpe de confiança vestido com uma fantasia técnica. O atacante não quebra sua criptografia — ele faz *você* entregar uma senha, um código ou dinheiro, se passando por alguém em quem você confia e criando um momento em que você age pela emoção em vez do julgamento. Como ele mira os reflexos humanos, a defesa também é humana: alguns hábitos que rompem o golpe de forma confiável. O mais útil de todos é reconhecer a emoção que está sendo fabricada.

## O sinal universal: urgência fabricada

Quase todo golpe precisa que você aja *rápido*, antes que a parte pensante do seu cérebro acompanhe. As alavancas emocionais são uma lista curta:

- **Medo**: "Sua conta será suspensa", "login suspeito detectado", "imposto em aberto — aja agora".
- **Ganância**: "Você ganhou", "resgate seu reembolso", "investimento que dobra toda semana".
- **Autoridade**: uma mensagem "do" seu banco, seu chefe, uma transportadora ou o governo.
- **Curiosidade/disposição em ajudar**: "É você nesta foto?", "Preciso de um favor rapidinho".

Quando uma mensagem faz seu coração acelerar e o empurra a clicar, pagar ou compartilhar *imediatamente*, essa pressão em si é o sinal de alerta — organizações legítimas não operam no esquema de "responda nos próximos 10 minutos ou então".

## As verificações concretas

| Verificação | O que observar |
| --- | --- |
| **Endereço do remetente** | Passe o mouse/expanda — \`service@paypa1.com\` ≠ \`paypal.com\`. Nomes de exibição mentem. |
| **O link de verdade** | Passe o mouse (não clique) para ver o destino real; procure domínios parecidos |
| **Saudação genérica** | "Prezado cliente" de uma empresa que sabe o seu nome |
| **Anexos inesperados** | Faturas/recibos que você não esperava — um clássico veículo de malware |
| **Pedidos de segredos** | Instituições reais nunca pedem sua senha, PIN completo ou um código de 2FA |
| **Pressão + sigilo** | "Não conte a ninguém", "transferência urgente", pagamento em vale-presente — todos enormes sinais de alerta |

## As duas regras que evitam a maioria das perdas

1. **Nunca faça login por um link em uma mensagem.** Se um e-mail diz que há um problema com uma conta, não clique — abra uma nova aba e digite o endereço você mesmo (ou use seu favorito/app). Esse único hábito derrota a maior parte do phishing de credenciais, porque o site falso nunca tem a chance.

2. **Verifique por outro canal qualquer coisa que envolva dinheiro ou segredos.** "Chefe" pedindo uma transferência ou vales-presente, "banco" pedindo para você "mover o dinheiro para uma conta segura", um parente em apuros repentinos — pare e confirme por um canal *separado e conhecido* (ligue para o número oficial, não para o da mensagem). Urgência somada a um método de pagamento incomum é a assinatura de um golpe.

## Perguntas frequentes

**A mensagem parece perfeita — logo, formatação, meu nome. Ainda assim vale duvidar?**
Sim. Visuais convincentes são triviais de copiar, e dados pessoais vazam de violações. Julgue pelo *pedido* (urgência, segredos, pagamento) e verifique de forma independente, não pelo quão polida ela parece.

**Cliquei em um link / digitei minha senha. E agora?**
Aja rápido: troque aquela senha (e em qualquer lugar onde foi reutilizada) a partir de um dispositivo confiável, ative a 2FA, fique de olho em atividades não autorizadas e contate a instituição real. A rapidez limita o estrago.

**Ligações e mensagens de texto também são phishing?**
Sim — o "vishing" (voz) e o "smishing" (SMS) usam o mesmo roteiro, e a clonagem de voz por IA torna as ligações mais convincentes. A mesma regra vale: desligue e retorne usando um número oficial que você mesmo procurou.`,
  },
  {
    topicKey: 'vpn-explained',
    title: 'O que uma VPN realmente faz (e o que não faz)',
    question: 'O que uma VPN realmente protege e eu de fato preciso de uma?',
    summary:
      'Uma VPN criptografa seu tráfego até um servidor que esconde seu endereço IP e o protege em redes não confiáveis. Não é anonimato nem segurança totais — o HTTPS já protege a maior parte dos dados, e uma VPN transfere sua confiança para o provedor de VPN em vez de eliminá-la.',
    tags: ['segurança', 'privacidade', 'vpn', 'redes'],
    language: 'pt',
    image: {
      prompt: promptOf('vpn-explained'),
      alt: 'Dados viajando por um tubo selado que oculta a origem até um relé distante',
    },
    sources: [
      { title: 'EFF — Autodefesa contra vigilância: VPNs', url: 'https://ssd.eff.org/module/choosing-vpn-thats-right-you' },
      { title: 'CISA — orientações sobre conexões seguras', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# O que uma VPN realmente faz (e o que não faz)

Uma VPN (rede privada virtual) constrói um túnel criptografado do seu dispositivo até um servidor operado pelo provedor de VPN; seu tráfego sai para a internet a partir de *lá*, vestindo o endereço IP daquele servidor em vez do seu. Esse é todo o mecanismo — e dele decorrem tanto os benefícios genuínos quanto uma pilha de exageros de marketing. A coisa mais útil de entender é que uma VPN **realoca sua confiança**; ela não elimina a necessidade de confiar.

## O que ela genuinamente faz

- **Esconde seu endereço IP** dos sites que você visita — eles veem a localização do servidor da VPN, não a sua casa ou cidade. Útil para reduzir uma forma de rastreamento e para não expor sua identidade de rede.
- **Criptografa o tráfego na rede local** — em um WiFi público duvidoso, a rede do café, do aeroporto ou do hotel (e quem estiver bisbilhotando) vê apenas um túnel criptografado, não o que você está fazendo.
- **Esconde sua atividade do seu provedor de internet** — seu provedor vê que você está conectado a uma VPN, mas não quais sites você visita.
- **Muda sua localização aparente** — por isso as pessoas as usam para acessar conteúdo bloqueado por região (sujeito aos termos de cada serviço).

## O que ela NÃO faz

É aqui que o marketing vende demais:

| Mito | Realidade |
| --- | --- |
| "Uma VPN te deixa anônimo" | Longe disso — logins, cookies, fingerprint do navegador e contas identificam você de qualquer forma |
| "Uma VPN te protege de vírus/invasões" | Não protege — é um túnel, não um antivírus nem um firewall contra malware |
| "Uma VPN criptografa tudo o que você faz" | A maioria dos sites já é criptografada de ponta a ponta por HTTPS; a VPN protege principalmente o salto *local* |
| "Uma VPN te esconde de todos" | Seu provedor de VPN consegue ver seu tráfego — você apenas transferiu a confiança para ele |

Esse último ponto é o crucial. Sem uma VPN, sua rede local e seu provedor podem observar suas conexões. *Com* uma, a empresa de VPN ocupa essa posição em vez deles — então uma VPN só é tão confiável quanto quem a opera. Uma VPN gratuita que monetiza registrando e vendendo sua atividade pode ser pior do que nenhuma.

## Você precisa de uma?

| Situação | Veredito |
| --- | --- |
| Frequentemente em WiFi público/não confiável | Razoável — acrescenta uma camada real (embora o HTTPS já cubra muita coisa) |
| Quer esconder a navegação do seu provedor | Sim, esse é um uso central |
| Acessar conteúdo bloqueado por região | Uso comum (atente aos termos de serviço) |
| Buscar anonimato verdadeiro | Uma VPN sozinha não entrega isso |
| Já só em redes confiáveis, usando HTTPS | Opcional — o benefício é menor do que os anúncios dão a entender |

Se você for usar uma, escolha um provedor pago de boa reputação, com uma política de não registro (no-logs) clara e, idealmente, auditada — você está confiando a ele tudo o que seu provedor de internet costumava ver.

## Perguntas frequentes

**Uma VPN impede que os sites me rastreiem?**
Apenas a parte baseada em IP. Cookies, logins e fingerprint do navegador ainda identificam você. O antirrastreamento precisa de configurações/extensões do navegador, não de uma VPN.

**Uma VPN gratuita serve?**
Desconfie — manter servidores custa dinheiro, e algumas VPNs gratuitas se pagam registrando e vendendo seus dados, o oposto do objetivo. Existem versões gratuitas de boa reputação, mas leia a política de privacidade.

**Preciso de uma VPN se os sites usam HTTPS?**
O HTTPS já criptografa o conteúdo do seu tráfego de ponta a ponta. Uma VPN acrescenta a ocultação do IP e protege metadados na rede local, mas é uma melhoria menor do que os anúncios sugerem quando você já está em HTTPS.`,
  },
  {
    topicKey: 'end-to-end-encryption',
    title: 'O que é criptografia de ponta a ponta?',
    question: 'O que significa criptografia de ponta a ponta e por que ela importa para mensagens?',
    summary:
      'A criptografia de ponta a ponta tranca uma mensagem de modo que só o remetente e o destinatário possam lê-la — nem a rede, nem mesmo a empresa que opera o serviço. É a diferença entre uma carta lacrada e um cartão-postal que todos no caminho podem ler.',
    tags: ['segurança', 'privacidade', 'criptografia', 'mensagens'],
    language: 'pt',
    image: {
      prompt: promptOf('end-to-end-encryption'),
      alt: 'Mensagem lacrada ilegível em trânsito, abrindo só no dispositivo de destino',
    },
    sources: [
      { title: 'EFF — Autodefesa contra vigilância: o que é criptografia?', url: 'https://ssd.eff.org/module/what-encryption' },
      { title: 'NIST — Padrões e diretrizes de criptografia', url: 'https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines' },
    ],
    content: `# O que é criptografia de ponta a ponta?

A criptografia de ponta a ponta (E2EE) significa que uma mensagem é embaralhada no dispositivo do remetente e só pode ser desembaralhada no dispositivo do destinatário — então, em nenhum ponto intermediário, mais ninguém consegue lê-la. O crucial é que "mais ninguém" inclui a empresa que opera o serviço. A analogia clássica: uma mensagem comum é um **cartão-postal** que todo mundo que a manuseia pelo caminho consegue ler; uma mensagem com criptografia de ponta a ponta é uma **carta lacrada** que só o destinatário consegue abrir. A diferença é quem *pode* ler suas conversas, não apenas quem *promete* não ler.

## A distinção que de fato importa

A maioria dos serviços online criptografa os dados "em trânsito" (entre você e os servidores deles) e "em repouso" (no armazenamento deles). Isso é bom, mas, nos dois casos, **a empresa ainda pode ler seu conteúdo** — ela guarda as chaves. A criptografia de ponta a ponta é mais forte: só os extremos guardam as chaves, então o provedor é estruturalmente incapaz de ler suas mensagens mesmo que quisesse, fosse invadido ou recebesse ordem de entregá-las.

| | Criptografia em trânsito/repouso | Criptografia de ponta a ponta |
| --- | --- | --- |
| Protegida de bisbilhoteiros externos | Sim | Sim |
| Legível pelo provedor do serviço | **Sim** | **Não** |
| Exposta em um vazamento de dados do provedor | Potencialmente | O conteúdo continua ilegível |
| Entregue por ordem judicial | Possível | O provedor não tem nada legível para entregar |

## Como funciona, em resumo

A E2EE usa a mesma ideia de chave pública por trás das passkeys e do HTTPS. Cada usuário tem uma chave pública (compartilhada livremente) e uma chave privada (nunca compartilhada). Para enviar uma mensagem a você, o remetente criptografa com a *sua* chave pública; só a *sua* chave privada consegue descriptografá-la. As chaves ficam nos dispositivos, não no servidor — que é exatamente por isso que o servidor não consegue ler o conteúdo. Bons aplicativos de mensagens acrescentam o "sigilo de encaminhamento" (forward secrecy), rotacionando chaves de modo que nem um comprometimento futuro de chave consiga destravar mensagens passadas.

## Onde você depende dela

- **Mensagens**: alguns aplicativos têm criptografia de ponta a ponta por padrão; outros só em um modo opcional, ou não têm nenhuma. Se a privacidade importa, verifique qual é o caso.
- **Chamadas**: muitos aplicativos de voz/vídeo agora oferecem E2EE.
- **Backups e nuvens**: uma brecha sutil — uma conversa pode ter E2EE enquanto o *backup na nuvem* dela não tem, deixando as mensagens legíveis de novo discretamente. Verifique as configurações de backup.
- **A web**: o HTTPS é de ponta a ponta entre o seu navegador e o site (embora o próprio site, como um dos extremos, leia o que você envia a ele).

## Perguntas frequentes

**Se nem a empresa consegue ler, quem consegue?**
Apenas as pessoas que seguram os dispositivos em cada extremo. Isso também significa que a segurança do *dispositivo* importa — a E2EE protege as mensagens em trânsito, não um telefone que alguém desbloqueia. E os metadados (com quem você falou, quando) ainda podem ficar visíveis mesmo quando o conteúdo não fica.

**A E2EE ajuda criminosos?**
É a mesma criptografia que protege seu banco, seus prontuários médicos, jornalistas e conversas privadas comuns — uma proteção de uso geral. O consenso de segurança predominante é que enfraquecê-la para todos (uma "porta dos fundos") torna todo mundo menos seguro, pois uma porta dos fundos não pode ser limitada aos "mocinhos".

**Como sei se um aplicativo realmente a usa?**
Procure por "criptografia de ponta a ponta" de forma explícita (não apenas "criptografado"), prefira aplicativos que usam protocolos abertos bem revisados e verifique se ela vem ativada por padrão ou só em um modo especial.`,
  },
  {
    topicKey: 'public-wifi-safety',
    title: 'O WiFi público é realmente perigoso?',
    question: 'É seguro usar WiFi público em cafés e aeroportos, e o que devo evitar?',
    summary:
      'O WiFi público é muito mais seguro do que costumava ser porque quase todos os sites agora usam HTTPS, que criptografa seus dados independentemente da rede. Os riscos residuais reais são pontos de acesso falsos e conexões não criptografadas — administráveis com alguns hábitos.',
    tags: ['segurança', 'privacidade', 'wifi', 'segurança digital'],
    language: 'pt',
    image: {
      prompt: promptOf('public-wifi-safety'),
      alt: 'Um notebook enviando dados já lacrados por WiFi público ao lado de um ponto falso',
    },
    sources: [
      { title: 'FTC — As redes WiFi públicas são seguras?', url: 'https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-not-always' },
      { title: 'EFF — HTTPS e autodefesa contra vigilância', url: 'https://ssd.eff.org/module/what-should-i-know-about-encryption' },
    ],
    content: `# O WiFi público é realmente perigoso?

O WiFi público tem uma reputação assustadora que está, em grande parte, **desatualizada**. Os velhos avisos vêm de uma época em que os sites enviavam dados às claras, de modo que qualquer um na mesma rede do café podia "farejar" suas senhas no ar. Essa época basicamente acabou: hoje a esmagadora maioria dos sites usa **HTTPS**, que criptografa sua conexão de ponta a ponta entre o seu navegador e o site — em qualquer rede, confiável ou não. O cadeado na sua barra de endereços está fazendo a maior parte do trabalho protetor que os avisos alarmistas atribuem a uma VPN.

## Por que o HTTPS mudou o cenário

Quando você se conecta a um site HTTPS, seu tráfego é criptografado *antes* de sair do seu dispositivo, então um bisbilhoteiro no mesmo WiFi vê apenas dados embaralhados e qual site você está visitando — não sua senha, mensagens ou número de cartão. Como os navegadores modernos agora sinalizam sites sem HTTPS como "Não seguro" e a maior parte da web migrou, o clássico ataque de "senha roubada na cafeteria" é muito mais difícil do que costumava ser.

## Os riscos que permanecem

O WiFi público não é de risco *zero*, porém — as ameaças reais mudaram:

| Risco | O que é | Defesa |
| --- | --- | --- |
| **Ponto de acesso gêmeo do mal** | Uma rede falsa chamada "Aeroporto_WiFi_Gratis" operada por um atacante | Confirme o nome real da rede; não entre automaticamente em redes desconhecidas |
| **Sites sem HTTPS** | O raro site que ainda envia dados em texto aberto | Atente para o aviso "Não seguro"; não digite segredos ali |
| **Espiar por cima do ombro** | Alguém simplesmente olhando sua tela | Película de privacidade, atenção |
| **Dispositivo desatualizado** | Falhas sem correção exploráveis em redes compartilhadas | Mantenha o sistema e os aplicativos atualizados |
| **Conexão automática** | Telefone entrando silenciosamente em uma rede maliciosa de nome conhecido | Desative a entrada automática em redes abertas |

O risco principal é o **gêmeo do mal**: um ponto de acesso malicioso com um nome amigável. Se você se conecta a ele, o atacante controla seu caminho de rede — mas mesmo assim o HTTPS mantém suas sessões criptografadas ilegíveis; o perigo vem principalmente de qualquer tráfego sem HTTPS e de ser atraído para páginas de login falsas.

## Hábitos sensatos (sem paranoia)

- **Confie no cadeado do HTTPS** e nunca ignore um aviso de certificado em WiFi público — esse aviso é exatamente o momento em que algo está errado.
- **Verifique o nome da rede** com a equipe em vez de adivinhar; desconfie de redes abertas se passando por uma marca.
- **Desative a conexão automática** a redes abertas para que seus dispositivos não voltem silenciosamente a redes parecidas.
- **Uma VPN acrescenta uma camada** ao criptografar até os metadados e qualquer tráfego sem HTTPS — um extra razoável em redes não confiáveis, mas não a necessidade que os anúncios dão a entender, dado o HTTPS.
- **Mantenha os dispositivos atualizados**; a maioria dos ataques de rede restantes mira falhas conhecidas e já corrigidas.

## Perguntas frequentes

**Alguém pode roubar a senha do meu banco no WiFi do café?**
Se o seu banco usa HTTPS (e usa) e você não ignorou um aviso de certificado nem caiu em uma página de login falsa, suas credenciais estão criptografadas no caminho. O perigo maior é o phishing, não a farejação.

**Eu realmente preciso de uma VPN para WiFi público?**
É uma camada extra razoável, mas o HTTPS já protege o conteúdo do seu tráfego. Uma VPN ajuda principalmente com o tráfego sem HTTPS e a esconder da rede local quais sites você visita.

**Os dados móveis do meu telefone são mais seguros do que o WiFi público?**
Em geral, sim — a rede celular é criptografada e você não compartilha uma rede local com estranhos. Para tarefas sensíveis em uma rede desconhecida, mudar para os dados móveis é uma escolha simples e sólida.`,
  },
  {
    topicKey: 'online-tracking',
    title: 'Como funciona o rastreamento online (cookies, pixels e fingerprints)',
    question: 'Como as empresas me rastreiam pela web e eu de fato consigo impedir isso?',
    summary:
      'Os rastreadores seguem você com cookies, pixels de rastreamento invisíveis e fingerprint do navegador para montar um perfil entre sites. Você não consegue ficar invisível, mas algumas escolhas no navegador reduzem drasticamente o quanto é coletado.',
    tags: ['privacidade', 'rastreamento', 'cookies', 'web'],
    language: 'pt',
    image: {
      prompt: promptOf('online-tracking'),
      alt: 'Uma figura deixa pegadas que observadores juntam, em parte dispersas por um manto',
    },
    sources: [
      { title: 'EFF — Cover Your Tracks (teste de fingerprint do navegador)', url: 'https://coveryourtracks.eff.org/' },
      { title: 'FTC — Protegendo sua privacidade online', url: 'https://consumer.ftc.gov/articles/protecting-your-privacy-online' },
    ],
    content: `# Como funciona o rastreamento online (cookies, pixels e fingerprints)

A maior parte da web "gratuita" é paga pela publicidade, e a publicidade direcionada funciona conhecendo quem você é e o que você faz. Por isso existe uma indústria inteira para seguir você de site em site, costurando sua atividade em um perfil. Ela funciona por meio de três técnicas principais, cada uma mais escorregadia que a anterior — e entendê-las é o que faz as defesas fazerem sentido.

## As três técnicas principais

**1. Cookies.** Um cookie é um pequeno arquivo que um site guarda no seu navegador. Cookies *de primeira parte* são, em sua maioria, inofensivos e úteis — eles mantêm você logado e lembram seu carrinho. O problema de rastreamento são os cookies *de terceiros*: quando muitos sites diferentes incorporam conteúdo da mesma rede de anúncios, essa rede deixa um cookie que ela reconhece em todo lugar, permitindo ver que o mesmo navegador visitou o site A, depois o B, depois o C. Esse rastro entre sites é o mecanismo clássico de rastreamento (e o que os navegadores agora estão ativamente eliminando).

**2. Pixels de rastreamento.** Uma imagem invisível de 1×1 (ou um trecho de código) carregada do servidor de um rastreador. O simples carregamento dele — em uma página web *ou em um e-mail* — diz ao rastreador que você o abriu, quando, e detalhes sobre o seu dispositivo. É assim que os profissionais de marketing sabem que você abriu o e-mail deles ou visitou uma página, sem nenhum cookie.

**3. Fingerprint do navegador.** A mais sorrateira. Em vez de guardar qualquer coisa no seu dispositivo, um site *mede* a combinação única de características do seu dispositivo — tamanho da tela, fontes, sistema operacional, versão do navegador, fuso horário, peculiaridades gráficas — que, juntas, costumam ser únicas o bastante para reidentificá-lo. Como não guarda nada, limpar os cookies não a apaga.

| Técnica | Guarda algo? | Vencida ao limpar cookies? |
| --- | --- | --- |
| Cookies de terceiros | Sim | Sim |
| Pixels de rastreamento | Usa cookies/registros do servidor | Em parte |
| Fingerprint | Não | **Não** |

## O que de fato reduz o rastreamento

Você não consegue ficar invisível, mas pode encolher muito sua exposição:

- **Use um navegador que respeite a privacidade ou ative a proteção contra rastreamento** — os navegadores modernos bloqueiam cookies de terceiros e rastreadores conhecidos por padrão ou com uma configuração.
- **Adicione um bloqueador de conteúdo/anúncios de boa reputação** — bloqueia scripts de rastreamento e pixels antes que carreguem, o que também deixa as páginas mais rápidas.
- **Bloqueie imagens remotas no e-mail** para derrotar os pixels de rastreamento de abertura (a maioria dos apps de e-mail oferece isso).
- **Resista ao fingerprint** com navegadores que padronizam ou randomizam seu fingerprint; esse é o rastreamento mais difícil de impedir, e por isso importa quem faz o seu navegador.
- **Reduza o perfil na origem**: limite a personalização de anúncios nas configurações da sua conta e seja econômico com logins que atrelam a atividade a uma identidade real.

## Perguntas frequentes

**Aqueles avisos de "Aceitar cookies" de fato me protegem?**
Eles são pedidos de consentimento (impulsionados por leis de privacidade), não proteção. "Rejeitar não essenciais" ajuda, mas a redução de verdade vem das configurações do navegador e de bloqueadores, não de clicar em banners.

**O modo privado/anônimo impede o rastreamento?**
Na maior parte, não. Ele evita que o *seu navegador* salve o histórico local e os cookies após a sessão, mas os sites, rastreadores e sua rede ainda podem observá-lo durante ela, e o fingerprint continua funcionando.

**O fingerprint é mesmo impossível de impedir?**
Não impossível, mas difícil — a defesa é usar um navegador que deliberadamente faz o fingerprint de todo mundo parecer semelhante (para que o seu não se destaque). Teste o seu no Cover Your Tracks da EFF.`,
  },
  {
    topicKey: 'data-breach-response',
    title: 'O que fazer quando seus dados estão em um vazamento',
    question: 'Uma empresa que eu uso teve um vazamento de dados — o que devo de fato fazer?',
    summary:
      'Quando um vazamento expõe seus dados, a prioridade é conter a reutilização: troque aquela senha em todos os lugares onde foi usada, ative a autenticação de dois fatores e fique atento ao phishing subsequente. O que fazer depende do que vazou — uma senha, um cartão ou seus dados de identidade.',
    tags: ['segurança', 'privacidade', 'vazamento de dados', 'segurança digital'],
    language: 'pt',
    image: {
      prompt: promptOf('data-breach-response'),
      alt: 'Um pequeno vazamento de cofre sendo contido metodicamente entre cofres vizinhos',
    },
    sources: [
      { title: 'FTC — Vazamento de dados: o que fazer', url: 'https://www.identitytheft.gov/databreach' },
      { title: 'Have I Been Pwned — verifique se suas contas apareceram em vazamentos', url: 'https://haveibeenpwned.com/' },
    ],
    content: `# O que fazer quando seus dados estão em um vazamento

Vazamentos de dados são rotina hoje em dia — se você usa a internet há anos, suas informações quase certamente apareceram em algum. Isso soa alarmante, mas a maioria dos vazamentos é superável com uma resposta calma e direcionada. A chave é ajustar sua ação ao **que de fato vazou**, porque uma senha vazada, um número de cartão vazado e dados de identidade vazados pedem movimentos diferentes. Pânico e inação são os dois modos de falha; uma lista de verificação curta vence ambos.

## Primeiro: descubra o que foi exposto

As notificações de vazamento (e os serviços que os acompanham) costumam dizer quais dados estavam envolvidos. A escada de gravidade, grosso modo:

| O que vazou | Gravidade | Por quê |
| --- | --- | --- |
| Apenas o endereço de e-mail | Baixa | Significa principalmente mais spam/phishing |
| Senha (mesmo com hash) | Alta | Reutilização significa muitas contas em risco |
| Cartão de pagamento | Média | Os bancos revertem fraudes; cartões são substituíveis |
| Dados de identidade (números de documento, data de nascimento, endereço) | Alta | Permite roubo de identidade; não dá para "redefinir" |

## A resposta, conforme o que vazou

**Se uma senha vazou** (o caso urgente mais comum):
1. **Troque-a no site violado imediatamente.**
2. **Troque-a em todo lugar onde você a reutilizou** — esse é o perigo real, porque os atacantes vão testar aquele par de e-mail e senha em bancos, e-mails e lojas (credential stuffing). Um gerenciador de senhas torna isso muito menos doloroso e evita o próximo.
3. **Ative a autenticação de dois fatores** nessa conta e nas importantes.

**Se um cartão de pagamento vazou:** fique de olho nos seus extratos, denuncie qualquer cobrança desconhecida (os bancos geralmente revertem fraudes) e deixe o banco reemitir o cartão se necessário. Esse é o tipo de vazamento mais recuperável.

**Se dados de identidade vazaram** (o mais difícil, já que você não pode mudar sua data de nascimento): considere um bloqueio de crédito / alerta de fraude junto aos birôs de crédito onde disponível, fique atento a contas abertas em seu nome e seja extra cético com contatos que mencionem seus dados reais.

## Em seguida: prepare-se para a segunda onda

O risco subsequente subestimado é o **phishing direcionado**. Após um vazamento, os criminosos sabem qual empresa você usa e alguns dos seus dados reais, então enviam mensagens convincentes de "[Empresa] alerta de segurança — verifique sua conta". Espere por elas e aplique a regra de sempre: nunca faça login por um link em uma mensagem — vá direto ao site. Um vazamento o torna um alvo marcado por um tempo.

## Perguntas frequentes

**Como eu fico sabendo se estou em um vazamento?**
As empresas muitas vezes são legalmente obrigadas a notificá-lo, mas vale verificar um serviço confiável de consulta de vazamentos (como o Have I Been Pwned) para o seu e-mail e ativar os alertas de vazamento do seu gerenciador de senhas.

**O vazamento foi há anos — ainda preciso agir?**
Se desde então você tornou aquela senha única e ativou a 2FA, está em grande parte protegido. Se você *ainda* reutiliza aquela senha em algum lugar, troque-a agora — senhas antigas vazadas são testadas por anos.

**Devo pagar por serviços de proteção de identidade?**
Muitas vezes as proteções centrais (bloqueio de crédito, monitorar seus próprios extratos, senhas únicas + 2FA) são gratuitas e fazem a maior parte do trabalho. Serviços pagos podem acrescentar comodidade, mas não substituem o básico.`,
  },
];
