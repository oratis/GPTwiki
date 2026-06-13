import type { DraftArticle } from './types';
import { aiInPracticeEn } from './ai-in-practice.en';

// Batch: AI in Practice (Türkçe yerel sürüm / Phase 2 dil açılımı). en/zh/ja ile
// aynı topicKey'i paylaşır; her topicKey için GCS'te önbelleğe alınmış hero
// görseli yeniden kullanılır (ek görsel üretim maliyeti sıfır). Metin makine
// çevirisi değil, Türkçe okur için yeniden yazılmıştır.

const promptOf = (key: string): string => {
  const hit = aiInPracticeEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const aiInPracticeTr: DraftArticle[] = [
  {
    topicKey: 'rag-vs-fine-tuning',
    title: 'RAG mı, İnce Ayar mı: Hangisini Seçmelisiniz?',
    question: 'Verilerimi bir LLM’e uyarlamak için RAG mı yoksa ince ayar mı kullanmalıyım?',
    summary:
      'RAG sorgu anında taze ve doğrulanabilir bilgi enjekte eder; ince ayar ise modelin davranışını değiştirir. Çoğu ekip RAG ile başlamalı, ince ayarı yalnızca biçim, üslup ya da gecikme hedefleri için eklemelidir.',
    tags: ['ai', 'llm', 'rag', 'ince ayar', 'makine öğrenmesi'],
    language: 'tr',
    image: { prompt: promptOf('rag-vs-fine-tuning'), alt: 'Getirme hattı ve ince ayarlı model kafesi tek bir sinirsel çekirdeği besliyor' },
    sources: [
      { title: 'Lewis ve diğ., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (2020)', url: 'https://arxiv.org/abs/2005.11401' },
      { title: 'Hu ve diğ., "LoRA: Low-Rank Adaptation of Large Language Models" (2021)', url: 'https://arxiv.org/abs/2106.09685' },
      { title: 'Gao ve diğ., "Retrieval-Augmented Generation for Large Language Models: A Survey" (2023)', url: 'https://arxiv.org/abs/2312.10997' },
    ],
    content: `# RAG mı, İnce Ayar mı: Hangisini Seçmelisiniz?

Kısa yanıt: sorununuz **modelin ne bildiğiyse** getirme destekli üretimi (RAG) kullanın; sorununuz **modelin nasıl davrandığıysa** ince ayar kullanın. İkisi rakip değildir — olgun sistemler çoğu zaman her ikisini birden kullanır — ama ilk yatırım olarak RAG’i kurmak daha ucuz, güncellemesi daha kolay ve denetlemesi daha basittir.

## Her teknik aslında ne yapar

**RAG** modeli dondurulmuş tutar ve onun *girdisini* değiştirir. Sorgu anında bir getirici belgelerinizi tarar (genellikle bir vektör dizinindeki gömmeler aracılığıyla) ve en alakalı pasajlar isteme yapıştırılır; böylece model yanıtını onlardan üretir. Bilgi, istediğiniz an düzenleyebileceğiniz bir veritabanında yaşar.

**İnce ayar** modelin *ağırlıklarını* değiştirir. Örnek girdi–çıktı çiftleri üzerinde eğitim yaparak modele bir ton, bir biçim, bir politika ya da alana özgü ifadeyi içselleştirirsiniz. LoRA gibi parametre verimli yöntemlerle bu artık devasa donanım gerektirmez — ama sonuç, yeniden eğitene dek içine işlenmiş kalır.

## Karar tablosu

| Durumunuz | Daha uygun | Neden |
| --- | --- | --- |
| Bilgiler haftalık değişiyor (fiyatlar, politikalar, belgeler) | RAG | Modeli değil, dizini güncellersiniz |
| Yanıtlar kaynak göstermeli | RAG | Getirilen pasajlar aynı zamanda alıntı olur |
| Özel külliyat ezberlenemeyecek kadar büyük | RAG | Getirme, parametreyle değil depolamayla ölçeklenir |
| Çıktı katı bir kurumsal üsluba veya şemaya uymalı | İnce ayar | Üslup bilgi değil, davranıştır |
| Küçük, hızlı, ucuz bir uzman model gerekiyor | İnce ayar | Görevi daha az parametreye damıtın |
| İstemler talimat ve örneklerle devasa büyüdü | İnce ayar | Tekrarlayan talimatları ağırlıklara taşıyın |
| Model alan jargonunu yanlış anlıyor | İkisi de | Getirme bağlam sağlar; ayar yorumu düzeltir |

## RAG’in doğru ilk hamle olduğu durumlar

- **Tazelik**: bilginiz hiç yeniden eğitemeyeceğiniz kadar hızlı değişir.
- **İzlenebilirlik**: düzenlemeye tabi ve müşteriye dönük yanıtların "X belgesine göre" temellendirmesine ihtiyacı vardır; bu aynı zamanda halüsinasyonu ölçülebilir biçimde azaltır.
- **Yineleme hızı**: çalışan bir prototip birkaç günlük mühendisliktir; GPU yok, eğitim verisi etiketleme yok.
- **Kiracı bazında yalıtım**: her müşterinin verisi paylaşılan ağırlıklara sızmak yerine kendi dizininde kalır.

Bedeli fazladan bir hareketli parçadır: parçalama, gömmeler, dizin kalitesi ve getirme değerlendirmesi ürününüzün parçası hâline gelir. RAG sistemlerinde en sık görülen başarısızlık noktası model değil, kötü getirmedir.

## İnce ayarın hakkını verdiği durumlar

- **Biçim uyumu**: her zaman geçerli JSON, sabit bir rapor iskeleti, destek ekibinizin tonu.
- **Gecikme ve token maliyeti**: ayarlanmış bir model her çağrıdan az sayıdaki örneği ve uzun talimatları çıkarabilir.
- **Yeteneği küçük modellere taşıma**: dar bir görevde ince ayarlanmış kompakt bir açık ağırlıklı model, çok daha büyük bir genel modele yaklaşabilirken sunum maliyeti kat kat daha düşüktür.
- **Örtük beceriler**: binlerce etiketli örneğe sahip sınıflandırma, çıkarım ve yönlendirme görevleri çoğu zaman istem vermeyi geride bırakır.

Bedeli operasyoneldir: eğitim verisini derlemek, her temel model yükseltmesinde değerlendirmeleri yeniden çalıştırmak ve tek bir kötü davranışı düzeltmenin başka bir eğitim döngüsü demek olduğunu kabullenmek.

## İkisini birlikte kullanmak

Üretimde sık görülen bir kalıp: modeli, *biçiminizi ve reddetme politikanızı güvenilir biçimde izlesin* diye ince ayarlayın ve ona *güncel olguları beslemek* için RAG kullanın. Ayar davranışı öngörülebilir kılar; getirme içeriği doğru ve güncel tutar.

## SSS

**İnce ayar modele yeni olgular öğretir mi?**
Kötü öğretir. Ağırlık güncellemeleri bazı olguları ezberleyebilir ama hatırlama güvenilmezdir ve güncellemeler yeniden eğitim gerektirir. Bilgi eklemenin güvenilir yolu getirmedir.

**RAG her zaman daha mı ucuzdur?**
Kurmak için neredeyse her zaman. Çok yüksek sorgu hacminde uzun getirilmiş bağlamlar çağrı başına token maliyetini şişirir ve kısa istemli ayarlanmış bir model daha ucuz hâle gelebilir. Kendi trafiğinizde ölçün.

**İkisini de atlayıp yalnızca uzun bir bağlam penceresi kullanabilir miyim?**
Küçük, durağan külliyatlar için evet — belgeleri isteme tıkıştırmak (gerekirse istem önbelleğiyle) en basit seçenektir. Birkaç yüz sayfanın ötesinde ya da sık güncellemelerde, maliyet ve yanıt kalitesinde getirme kazanır.`,
  },
  {
    topicKey: 'prompt-engineering',
    title: 'İstem Mühendisliği için Pratik Bir Rehber',
    question: 'Büyük dil modelleri için etkili istemleri nasıl yazarım?',
    summary:
      'İstem kalitesinin çoğu beş kaldıraçtan gelir: açık talimatlar, bağlam, örnekler, açık çıktı biçimi ve akıl yürütme alanı. Bu rehber, gerçek işle temasta hayatta kalan teknikleri ele alır.',
    tags: ['ai', 'llm', 'istem mühendisliği', 'verimlilik'],
    language: 'tr',
    image: { prompt: promptOf('prompt-engineering'), alt: 'Cam bir kontrol paneli ışık huzmesini yapılandırılmış geometrik bir desene dönüştürüyor' },
    sources: [
      { title: 'Wei ve diğ., "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (2022)', url: 'https://arxiv.org/abs/2201.11903' },
      { title: 'Wang ve diğ., "Self-Consistency Improves Chain of Thought Reasoning" (2022)', url: 'https://arxiv.org/abs/2203.11171' },
      { title: 'Prompt Engineering Guide (DAIR.AI)', url: 'https://www.promptingguide.ai' },
    ],
    content: `# İstem Mühendisliği için Pratik Bir Rehber

Bir istem sihirli bir büyü değil, bir **şartnamedir**. Modeller muğlak isteklerde tıpkı müteahhitlerin yaptığı nedenle kötü iş çıkarır: gereksinimler hiç belirtilmemiştir. Elde edebileceğiniz kalitenin çoğunu beş kaldıraç belirler — talimatlar, bağlam, örnekler, çıktı biçimi ve akıl yürütme alanı.

## Beş kaldıraç

**1. Görevi bir iş emri gibi yazın.** Amacı, hedef kitleyi, kısıtları ve "bitti"nin neye benzediğini ekleyin. "Bu sözleşmenin fesih maddelerini hukukçu olmayan biri için 150 kelimenin altında özetle, sıra dışı her şeyi işaretle" ifadesi "bunu özetle"yi geride bırakır.

**2. Modelin tahmin edemeyeceği bağlamı verin.** İlgili belgeyi, şemayı, hata günlüğünü, üslup kılavuzunu yapıştırın. Verinin asla yönergeyle karışmaması için onu talimatlardan açık sınırlayıcılarla (XML tarzı etiketler veya çitli bloklar) ayırın.

**3. Anlatmakla kalmayın, gösterin (few-shot).** İki ya da üç girdi → çıktı örneği bir görevi paragraflarca tarifden daha kesin tanımlar ve uç durumları sabitler: yalnızca kolay olanları değil, çetrefil bir örnek de ekleyin.

**4. Çıktı biçimini sabitleyin.** Belirli bir yapı isteyin — adlandırılmış alanları olan bir JSON nesnesi, bir markdown tablosu, "tam olarak üç madde". Yapılandırılmış çıktının doğrulanması, ayrıştırılması ve farkının alınması daha kolaydır. Platformunuz şema dayatmalı çıktıyı destekliyorsa kullanın.

**5. Akıl yürütme alanı tanıyın.** Analiz, matematik ya da çok adımlı kararlarda modelden yanıt vermeden önce sorunu adım adım işlemesini isteyin (düşünce zinciri). Araştırma ve pratik, bunun akıl yürütme görevlerinde doğruluğu kayda değer biçimde artırdığında hemfikir; yüksek riskli yanıtlar için birkaç akıl yürütme yolu örnekleyip çoğunluğu alın (öz tutarlılık).

## Teknik → ne zaman başvurmalı

| Teknik | Ne zaman kullanılır |
| --- | --- |
| Rol/persona ("Kıdemli bir SRE'sin") | Söz dağarcığı ve yargı bir mesleğe uymalı |
| Girdilerin etrafına sınırlayıcılar | Yapıştırılan her veride, her zaman |
| Few-shot örnekleri | Biçim ya da yargı soyut anlatılması zor |
| Düşünce zinciri | Matematik, mantık, çok kısıtlı kararlar |
| Ayrıştırma (birden çok çağrı) | Belirgin aşamaları olan görevler — çıkar, sonra yargıla, sonra yaz |
| Öz tutarlılık (örnekler üzerinde oylama) | Ek maliyete değen, yüksek riskli tekil yanıtlar |
| "Emin değilsen 'bilinmiyor' de" | Yanlış yanıtın hiç yanıttan kötü olduğu olgusal sorular |

## Sık görülen başarısızlık kalıpları

- **Bulaşık-leğeni istemi**: yirmi kural, yarısı çelişkili. Modeller en son ve en yüksek sesli olanı izler; acımasızca budayın.
- **Gizli sorular**: tek cümlede iki şey sorup birine yanıt almak.
- **Örtük bağlam**: modelin hiç görmediği "o dosya" ya da "her zamanki biçimimiz"e atıfta bulunmak.
- **Aşırı uydurulmuş örnekler**: birbirine neredeyse özdeş üç few-shot örneği kuralı değil, yüzeysel kalıbı öğretir.
- **Yineleme döngüsü yok**: istemler koddur. Gerçek girdilerden küçük bir test kümesi tutun, her düzenlemeden sonra çalıştırın ve istemlerinizi sürümleyin.

## İstemleri mühendislik eserleri gibi ele alın

Bir istem üretimde önem kazandığında: sürüm denetimine alın, beklenen özelliklere sahip temsili girdilerden oluşan bir gerileme test kümesi iliştirin ve her model yükseltmesinde yeniden çalıştırın. Model sürümü değişiklikleri davranışı sessizce kaydırır; testleriniz bunu kullanıcılarınızdan önce yakalar.

## SSS

**"Derin bir nefes al" gibi sihirli ifadeler gerçekten yardımcı olur mu?**
Ara sıra, az miktarda ve modeller arası güvenilmez biçimde. Yapı, bağlam ve örnekler büyüleri cüceleştirir.

**Uzun istemler daha pahalıya mal olur — harcama buna değer mi?**
Kalitenin kritik olduğu görevlerde genelde evet, ama ölü ağırlığı kesin: gereksiz kurallar ve bayat örnekler doğruluk eklemeden maliyet ekler. İstem önbelleği çoğu platformda uzun durağan önekleri ucuzlatır.

**Akıl yürütme odaklı modeller için istem yazmak nasıl farklıdır?**
Yanıt vermeden önce içsel olarak akıl yürüten modeller *nasıl* düşünüleceği konusunda daha az el tutmaya ihtiyaç duyar — amaç ve kısıtlara dair talimatları tutun, çıktı kalitesi aksini söylemedikçe adım adım mikro yönetimi bırakın.`,
  },
  {
    topicKey: 'ai-agents',
    title: 'Yapay Zekâ Ajanı Nedir — ve Ona Gerçekten Ne Zaman İhtiyacınız Olur?',
    question: 'Yapay zekâ ajanı nedir ve kullanım senaryom gerçekten ne zaman bir ajana ihtiyaç duyar?',
    summary:
      'Yapay zekâ ajanı, araçlar ve bir hedefle döngü içinde çalışan, bir sonraki adımına kendi karar veren bir LLM’dir. Açık uçlu görevler için güçlü, sabit bir iş akışının yapabileceği her şey için aşırıdır — bu yazı farkı anlatır.',
    tags: ['ai', 'llm', 'ajanlar', 'otomasyon', 'yazılım mimarisi'],
    language: 'tr',
    image: { prompt: promptOf('ai-agents'), alt: 'Araçlarla çevrili bir sinirsel çekirdek, dallanan platformlar üzerinde yolunu seçiyor' },
    sources: [
      { title: 'Yao ve diğ., "ReAct: Synergizing Reasoning and Acting in Language Models" (2022)', url: 'https://arxiv.org/abs/2210.03629' },
      { title: 'Anthropic Engineering, "Building Effective Agents"', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
      { title: 'Schick ve diğ., "Toolformer: Language Models Can Teach Themselves to Use Tools" (2023)', url: 'https://arxiv.org/abs/2302.04761' },
    ],
    content: `# Yapay Zekâ Ajanı Nedir — ve Ona Gerçekten Ne Zaman İhtiyacınız Olur?

Yapay zekâ ajanı, bir döngü içinde çalışan bir dil modelidir: bir hedefi, bir araç kümesi ve son eylemin döndürdüğüne bakarak bir sonraki eylemine kendi karar verme özgürlüğü vardır. İşte tanımlayıcı olan o son cümle. Bir LLM’i sabit bir sırayla üç kez çağıran bir betik bir **iş akışıdır**; modelin kendisinin bir sonraki adıma karar verdiği bir sistem ise bir **ajandır**.

## Bir ajanın anatomisi

Pratik her ajan dört parçadır:

- **Bir model**: çok adımlı akıl yürütme ve güvenilir araç çağırma yapabilen.
- **Araçlar** — modelin çağırabileceği işlevler: arama, kod yürütme, dosya düzenleme, API çağrıları, veritabanı sorguları.
- **Bağlam/bellek** — eylemlerin ve gözlemlerin akan dökümü (bazen de oturumdan sağ çıkan dış notlar).
- **Döngü** — model eyler → ortam yanıtlar → sonuç eklenir → model yine eyler; ta ki hedefe ulaşıldığını ilan edene ya da bir durma koşuluna çarpana dek.

Akıl yürütmeyi araç kullanımıyla iç içe geçirme kalıbı araştırmada ReAct olarak yaygınlaştı ve artık kodlama yardımcılarının, araştırma ajanlarının ve bilgisayar kullanan sistemlerin belkemiğidir.

## Ajan, iş akışı ve tek çağrı

| Yaklaşım | Kontrol akışına karar veren | En uygunu | Başarısızlık biçimi |
| --- | --- | --- | --- |
| Tek LLM çağrısı | Siz | Sınıflandırma, taslak, çıkarım | Kapsam sınırlı |
| İş akışı (zincirli çağrılar) | Siz | Bilinen, tekrarlanabilir çok adımlı süreçler | Girdiler değişince katı kalır |
| Ajan (döngü + araçlar) | Model | Yolun önceden bilinmediği açık uçlu görevler | Maliyet ve hata birikmesi |

## Bir ajanın gerçekten doğru tercih olduğu durumlar

- **Yol önceden bilinemez.** Başarısız bir derlemeyi ayıklamak, muğlak bir soruyu araştırmak, bir tarayıcıyı çalıştırmak — her bir sonraki adım, öncekinin ortaya çıkardığına bağlıdır.
- **Ortam geri bildirim verir.** Derleyiciler, test takımları ve arama sonuçları ajanın kendi işini kontrol edip kendini düzeltmesini sağlar. Ajanlar tam da doğrulamanın ucuz olduğu yerde serpilir.
- **Görev değişken maliyet ve gecikmeyi kaldırır.** Bir ajan beş adım da atabilir, elli adım da.

## Aşırıya kaçtığı durumlar

İnsan adımları yazabiliyorsa, yazsın — sabit bir iş akışı daha ucuz, daha hızlı, ayıklanabilir ve öngörülebilirdir. Form doldurma, belge hatları, zamanlanmış raporlar ve standart ETL neredeyse hiçbir zaman ajan gerektirmez. Uygulayıcıların dürüst mühendislik kuralı şudur: **işe yarayan en basit kalıbı kullanın ve özerkliği yalnızca görev gerektirdiğinde ekleyin.**

## Neler ters gider

- **Hata birikmesi**: %95 güvenilir bir adımın on adım boyunca el değmeden sağ kalma olasılığı kabaca %60’tır. Uzun döngüler kontrol noktaları, doğrulama adımları ya da insan inceleme kapıları gerektirir.
- **Kontrolsüz maliyet**: her döngü yinelemesi büyüyen bir dökümü yeniden okur. Bütçeler ve adım sınırları koyun.
- **Muğlak hedefler**: "kod tabanını iyileştir" denen bir ajan *bir şeyler* yapacaktır; onu isteyip istemediğiniz başka mesele. "Bitti"yi tanımlayın.
- **Güvenlik yüzeyi**: dosya yazabilen, para harcayabilen veya mesaj gönderebilen araçların izin sınırlarına ve denetim günlüklerine ihtiyacı vardır.

## SSS

**"Çoklu ajan sistemleri" iyi bir tek ajandan daha mı iyidir?**
Bazen — bir sentezleyiciyle paralel araştırma kanıtlanmış bir kalıptır. Ama eşgüdüm kendi başarısızlık biçimlerini getirir; çoklu ajan bir başlangıç noktası değil, bir eniyilemedir.

**Ajanların özel modellere ihtiyacı var mı?**
Güçlü araç çağırma güvenilirliğine ve uzun ufuklu tutarlılığa ihtiyaçları var. Sınır genel modeller şu anda en güvenli seçim; küçük modeller dar, iyi cihazlanmış döngüler için işe yarar.

**Bir ajanı nasıl değerlendiririm?**
Adımlardan değil, sonuçlardan: kontrol edilebilir bitiş durumlarına sahip temsili bir görev kümesi tanımlayın, defalarca çalıştırın (ajanlar belirlenimci değildir) ve başarı oranını, maliyeti ve tamamlanmaya kadarki adımları izleyin.`,
  },
  {
    topicKey: 'local-llm-hardware',
    title: 'Yerelde Bir LLM Çalıştırmak için Hangi Donanım Gerekir?',
    question: 'Büyük bir dil modelini kendi makinemde çalıştırmak için hangi donanım gerekir?',
    summary:
      'Ne çalıştırabileceğinizi işlem değil bellek belirler: nicemlenmiş bir 8B model 8 GB’a sığar, bir 32B yaklaşık 24 GB ister ve 70B sınıfı modeller 48 GB veya daha fazlasını arar. İşte gerçek sayılar ve kullanılacak yazılımlar.',
    tags: ['ai', 'llm', 'yerel llm', 'donanım', 'gpu'],
    language: 'tr',
    image: { prompt: promptOf('local-llm-hardware'), alt: 'Açık bir bilgisayar kasasında ekran kartının üzerinde duran ışıltılı sinirsel kafes küpü' },
    sources: [
      { title: 'llama.cpp — C/C++ ile LLM çıkarımı (GGUF, nicemleme)', url: 'https://github.com/ggml-org/llama.cpp' },
      { title: 'Ollama — açık LLM’leri yerelde çalıştırın', url: 'https://ollama.com' },
      { title: 'vLLM — yüksek verimli LLM sunumu', url: 'https://github.com/vllm-project/vllm' },
    ],
    content: `# Yerelde Bir LLM Çalıştırmak için Hangi Donanım Gerekir?

Bağlayıcı kısıt **hız değil bellektir**. Bir modelin ağırlıkları kullanılabilir başarım için GPU’nuzun VRAM’ine (ya da Apple birleşik belleğine) sığmalıdır ve matematik basittir: 4 bit nicemlemede bir model milyar parametre başına kabaca **0,5–0,7 GB** ister, artı bağlam önbelleği için 1–4 GB pay.

## Hızlı boyutlandırma tablosu

| Model sınıfı | 4 bit ağırlıklar | Rahat kurulum | Neyin çalıştığına örnekler |
| --- | --- | --- | --- |
| 3–4B | ~2–3 GB | Herhangi bir modern dizüstü, 8 GB RAM | Küçük yardımcılar, otomatik tamamlama |
| 7–9B | ~4–6 GB | 8 GB GPU veya 16 GB Mac | Llama/Qwen/Mistral küçük modeller |
| 13–14B | ~8–10 GB | 12–16 GB GPU veya 24 GB Mac | Orta boy sohbet ve kodlama modelleri |
| 30–34B | ~18–22 GB | 24 GB GPU (örn. RTX 3090/4090) veya 36–48 GB Mac | Güçlü yerel çok yönlüler |
| 70–72B | ~40–48 GB | 2×24 GB GPU veya 64 GB+ Mac Studio | Sınıra yakın açık modeller |
| Büyük uzman karması (MoE) | çok değişken | İş istasyonu/sunucu sınıfı | Model başına belgelere bakın |

Tabloyu okurken iki not: nicemleme (GGUF 4 bit ve benzeri) küçük, genellikle kabul edilebilir bir kalite kaybını 16 bite kıyasla 4 kat bellek kesintisiyle takas eder; ve uzun bağlamlar KV önbelleğini büyütür — 32k bağlamda sohbet etmek ağırlıkların üstüne birkaç GB ekleyebilir.

## GPU, Mac mı, CPU mu?

- **NVIDIA GPU**: en iyi verim ve ekosistem desteği. VRAM boyutu GPU kuşağından daha çok önem taşır — ikinci el 24 GB’lık bir RTX 3090, 30B sınıfı modeller için hâlâ sevilen ekonomik bir tercihtir.
- **Apple Silikon**: birleşik bellek Mac’leri sessizce mükemmel kılar — 64 GB’lık bir M serisi makine, çift GPU’lu bir düzenekten daha yavaş ama sessiz ve basit biçimde 70B sınıfı nicemlenmiş modelleri çalıştırır. Çekirdek değil, RAM satın alın.
- **Yalnızca CPU**: llama.cpp ile çalışır ama küçük modellerde saniyede birkaç token bekleyin — toplu işler için iyi, sohbet için sancılı.

## Yazılım yığını

- **Ollama** — en kolay başlangıç: bir modeli çekip çalıştırmak için tek komut, OpenAI uyumlu yerel bir API ile.
- **llama.cpp** — ekosistemin çoğunun altındaki motor; nicemleme ve boşaltma üzerinde azami denetim.
- **LM Studio** — göz atma, indirme ve sohbet için bir grafik arayüz.
- **vLLM** — tek bir masaüstü yerine gerçek bir GPU sunucusundan birçok eşzamanlı kullanıcıya hizmet verdiğinizde.

## Dürüstçe ne beklemeli

İyi seçilmiş 8–14B’lik nicemlenmiş bir model özetlemeyi, taslak yazmayı, çıkarımı ve idare eder düzeyde kodlama yardımını kaldırır. 30B–70B sınıfı açık modeller gerçekten güçlüdür ama zorlu akıl yürütmede hâlâ sınır barındırılan modellerin gerisinde kalır. Yerele gitmenin nedenleri **gizlilik, çevrimdışı kullanım, sabit maliyette sınırsız token ve kurcalama özgürlüğüdür** — ham kalitede bulutu yenmek değil.

## SSS

**Yerelde çalıştırmak para kazandırır mı?**
Yalnızca sürekli yoğun kullanımda. Aksi hâlde her gün API tokenlarını tüketecekseniz donanım kendini amorti eder; ara sıra kullanım için API’ler daha ucuzdur.

**VRAM’imden büyük modelleri çalıştırabilir miyim?**
Evet — katmanlar dik bir hız bedeliyle sistem RAM’ine taşabilir. VRAM’i %20 aşan bir model çoğu zaman idaredir; 2 kat aşan ise eziyettir.

**Yerelde ince ayar peki?**
Parametre verimli yöntemler (LoRA/QLoRA) küçük model ince ayarını 24 GB’lık bir GPU’da uygulanabilir kılar. Büyük modellerin tam ince ayarı veri merkezi bölgesi olmayı sürdürür.`,
  },
  {
    topicKey: 'mcp-explained',
    title: 'MCP (Model Context Protocol) Nedir?',
    question: 'Model Context Protocol nedir ve hangi sorunu çözer?',
    summary:
      'MCP, herhangi bir yapay zekâ uygulamasının tek bir protokol üzerinden herhangi bir araç ya da veri kaynağına bağlanmasını sağlayan açık bir standarttır — uygulama ve araç başına özel entegrasyonların yerini alır. Yapay zekâ için USB-C gibi düşünün.',
    tags: ['ai', 'mcp', 'llm', 'entegrasyonlar', 'açık standartlar'],
    language: 'tr',
    image: { prompt: promptOf('mcp-explained'), alt: 'Farklı renkteki veri kabloları tek bir evrensel kristal porta yakınsıyor' },
    sources: [
      { title: 'Model Context Protocol — resmî site ve belirtim', url: 'https://modelcontextprotocol.io' },
      { title: 'Anthropic, "Introducing the Model Context Protocol"', url: 'https://www.anthropic.com/news/model-context-protocol' },
    ],
    content: `# MCP (Model Context Protocol) Nedir?

Model Context Protocol (MCP), yapay zekâ uygulamalarını dış araçlara ve verilere bağlamaya yarayan açık bir standarttır. Ondan önce her yapay zekâ uygulamasının her araç için özel bir entegrasyon kurması gerekiyordu — N uygulama × M araç, N×M adaptör demekti. MCP bunu N + M’ye indirir: bir uygulama protokolü bir kez *istemci* olarak gerçekler, bir araç onu bir kez *sunucu* olarak açar ve herhangi bir istemci herhangi bir sunucuyla konuşabilir. Yapışıp kalan benzetme doğru olduğu için tutmuştur: **yapay zekâ için USB-C**.

## Neden var

LLM’ler ancak erişebildikleri bağlam kadar yararlıdır. Yardımcınız dosyalarınızı okuyabildiğinde, veritabanınızı sorgulayabildiğinde, biletlerinizi arayabildiğinde ya da bir mesaj gönderebildiğinde çarpıcı biçimde yeteneklenir — ama bunları gelişigüzel bağlamak kırılgan, taşınamaz ve tek satıcıya bağlı entegrasyonlar üretiyordu. Anthropic’in 2024’ün sonunda tanıttığı ve o günden beri sektör genelinde yaygın biçimde benimsenen MCP, bu bağlantıyı standartlaştırır. 2026 itibarıyla ekosistem, GitHub ve Slack’ten veritabanlarına ve tarayıcılara kadar her şey için binlerce topluluk ve satıcı sunucusu barındırır.

## Nasıl çalışır

MCP’nin üç rolü vardır:

- **Konak (host)** — kullanıcının karşılaştığı yapay zekâ uygulaması (bir sohbet uygulaması, bir IDE, bir ajan çalışma ortamı).
- **İstemci** — konağın açtığı protokol bağlantısı, sunucu başına bir tane.
- **Sunucu** — yetenekleri protokol üzerinden açan (genellikle küçük) bir program; ya yerelde stdio üzerinden ya da uzaktan HTTP üzerinden.

Bir sunucu üç tür yetenek sunabilir:

| İlkel | Nedir | Örnek |
| --- | --- | --- |
| **Araçlar** | Modelin çağırabileceği işlevler | \`create_issue\`, \`query_database\` |
| **Kaynaklar** | Konağın bağlama okuyabileceği veri | Bir dosya, bir şema, bir gösterge paneli |
| **İstemler** | Yeniden kullanılabilir, parametreli şablonlar | "Bu PR’ı kontrol listemizle incele" |

Konağın modeli araç tanımlarını görür, bunları ne zaman çağıracağına karar verir; sunucu da yürütüp sonuçları döndürür — keşif, çağırma ve aktarımı protokol tekdüze biçimde yönetir.

## MCP ile düz işlev çağırma karşılaştırması

İşlev çağırma, bir *modelin* tek bir uygulamada geliştiricisinin kaydettiği bir işlevi nasıl çağırdığıdır. MCP bunun etrafındaki katmanı standartlaştırır: araçların nereden geldiği, nasıl keşfedildiği, kimlik doğrulandığı ve aktarıldığı — böylece aynı sunucu kod değişikliği olmadan herhangi bir MCP uyumlu uygulamada çalışır. Birbirini tamamlarlar: kaputun altında bir MCP araç çağrısı modele yine işlev çağrısı olarak ulaşır.

## Nasıl başlanır

Pratik giriş yolu, bir sunucu yazmak değil mevcut sunucuları kullanmaktır: başlıca yapay zekâ istemcilerinin çoğu birkaç satır yapılandırmayla bir MCP sunucusu eklemenize izin verir ve resmî SDK’ler (TypeScript, Python ve diğerleri) kendi sunucunuzu yazmayı bir öğleden sonralık işe çevirir — birkaç tip belirtilmiş işlev tanımlayın, her MCP istemcisi onları kullanabilsin.

## SSS

**MCP tek bir model satıcısına mı bağlıdır?**
Hayır. Anthropic’te başladı ama çok satıcılı benimsemeye ve açık bir yönetişim sürecine sahip açık bir belirtimdir; istemciler ve sunucular tüm büyük ekosistemlerde mevcuttur.

**Rastgele sunucuları bağlamak güvenli mi?**
MCP sunucularını tarayıcı eklentileri gibi görün: gerçek izinlerle çalışırlar. Güvenilir kaynaklar kullanın, bir sunucunun hangi araçları açtığını inceleyin ve duyarlı her eylem için açık kullanıcı onayı isteyen konakları yeğleyin.

**Kendi sunucumu ne zaman yazmalıyım?**
Ekibinizin, birden çok yapay zekâ aracının erişmesi gereken dahili bir API’si ya da veri kümesi olduğunda — tek bir sunucu onu şirketinizin kullandığı her MCP uyumlu istemciye sunar.`,
  },
  {
    topicKey: 'vector-databases',
    title: 'Vektör Veritabanı Nedir — ve Ona Ne Zaman İhtiyacınız Olur?',
    question: 'Vektör veritabanı nedir ve ona gerçekten ne zaman ihtiyacım olur?',
    summary:
      'Vektör veritabanları gömmeleri saklar ve tam eşleşme yerine "en yakın anlamı" bulur; anlamsal aramaya ve RAG’e güç verir. ~1M vektörün altında, pgvector gibi daha basit araçlar genellikle yeterlidir.',
    tags: ['ai', 'vektör veritabanı', 'gömmeler', 'arama', 'rag'],
    language: 'tr',
    image: { prompt: promptOf('vector-databases'), alt: 'Bir sorgu noktası, kümelenmiş gömme vektörü takımyıldızlarında dalgalanıyor' },
    sources: [
      { title: 'Malkov & Yashunin, "Efficient and Robust ANN Search Using HNSW Graphs" (2016)', url: 'https://arxiv.org/abs/1603.09320' },
      { title: 'FAISS — verimli benzerlik araması kütüphanesi', url: 'https://github.com/facebookresearch/faiss' },
      { title: 'pgvector — Postgres için vektör benzerliği', url: 'https://github.com/pgvector/pgvector' },
    ],
    content: `# Vektör Veritabanı Nedir — ve Ona Ne Zaman İhtiyacınız Olur?

Bir vektör veritabanı **gömmeleri** — metnin, görüntülerin ya da sesin anlamını temsil eden sayı listelerini — saklar ve tek bir sorguyu son derece iyi yanıtlar: *"buna en benzeyen ögeleri bul."* Anlamsal aramanın, RAG getirmesinin, önerilerin ve yinelenen tespitinin ardındaki işlem budur. Özel birine ihtiyacınız olup olmadığı neredeyse tümüyle ölçeğe bağlıdır.

## Bir dakikada gömmeler

Bir gömme modeli içeriği yüksek boyutlu bir uzayda bir noktaya (yaygın olarak 256–3072 boyut) eşler; öyle ki benzer anlamlar birbirine yakın düşer. "Parolamı nasıl sıfırlarım" ile "hesabıma giremiyorum" söz dağarcığı olarak az ortaklık taşır ama vektör olarak birbirine yakın oturur. Benzerlik geometrik olarak — genellikle kosinüs benzerliğiyle — ölçülür; böylece arama şuna dönüşür: sorguyu gömün, en yakın saklı noktaları bulun.

## Onu bir *veritabanı* sorunu yapan ne

Bir sorguyu saklı her vektörle karşılaştırmak (kaba kuvvet) kesin ama doğrusaldır — binlerce öge için iyi, milyonlarca için yavaş. Vektör veritabanları, gerçek komşuların ~%99’unu zamanın küçük bir kesrinde bulan, en meşhuru HNSW grafları olan **yaklaşık en yakın komşu (ANN)** dizinlerini kullanır. O çekirdeğin çevresine alışıldık veritabanı olanaklarını eklerler: meta veri süzme ("yalnızca bu kiracının belgeleri"), güncellemeler ve silmeler, kalıcılık ve yatay ölçekleme.

## Ona ne zaman ihtiyacınız olur — dürüstçe

| Külliyat boyutu | Makul tercih |
| --- | --- |
| ~100 bin vektöre kadar | Bellekte bir dizi, FAISS ya da SQLite uzantıları — kaba kuvvet idare eder |
| ~100 bin–birkaç milyon | **Zaten çalıştırdığınız Postgres’te pgvector** — pragmatik öntanımlı |
| Milyonlarca, yüksek QPS, çok kiracılı | Özel motor: Qdrant, Milvus, Weaviate ya da Pinecone gibi yönetilen hizmetler |

En sık yapılan mimari hata, 50.000 parça için yeni bir altyapı parçası eklemektir. Zaten Postgres çalıştırıyorsanız, pgvector vektörleri ilişkisel verinizin yanında, işlemsel ve birleştirilebilir tutar. Gerçek ölçeğiniz, katı gecikme hedefleriniz ya da ağır süzgeçli aramanız olduğunda özel bir motora uzanın.

## Veritabanından çok önem taşıyan kalite kaldıraçları

- **Parçalama**: belgeleri nasıl böldüğünüz, hangi motoru seçtiğinizden daha çok getirmeyi etkiler. Parçalar kendi içinde tamamlanmış düşünceler olmalı, çoğu zaman örtüşmeli olarak 200–800 token.
- **Gömme modeli seçimi**: daha yeni çok dilli modeller eskileri kayda değer biçimde geçer; bir külliyatı yeniden gömmek can sıkıcıdır, bu yüzden bilinçli seçin.
- **Karma arama**: vektör benzerliğini klasik anahtar sözcük puanlamasıyla (BM25) birleştirmek, gömmelerin bulanıklaştırdığı adları, kodları ve nadir terimleri yakalar.
- **Yeniden sıralama**: 50 aday ucuza getirip en üsttekileri bir çapraz kodlayıcıyla yeniden puanlamak, çoğu zaman dizini ayarlamaktan daha çok yanıt kalitesi kazandırır.

## SSS

**Gömmeler verimi gömme sağlayıcısına sızdırır mı?**
Metin, gömmeyi hesaplayan tarafa gider. Barındırılan API’lerde bu sağlayıcıdır (saklama koşullarını kontrol edin); açık ağırlıklı gömme modelleri tümüyle yerelde çalışır.

**Belgeler değiştiğinde vektörler güncellenebilir mi?**
Evet — ama değişen belgeleri yeniden parçalamak ve yeniden gömmek hattınızın işidir. Bayat vektörlerin sessizce eski içerik sunması klasik üretim hatasıdır.

**Daha büyük bir gömme boyutu daha mı iyidir?**
Otomatik olarak değil. Daha yüksek boyutlar depolama ve gecikmeye mal olur; birçok modern model, 512–1024’ün neredeyse tüm kaliteyi koruduğu kırpılabilir boyutlar sunar. Kendi getirme kümenizde kıyaslayın.`,
  },
  {
    topicKey: 'ai-coding-assistants',
    title: 'Yapay Zekâ Kodlama Yardımcılarından Gerçek Değer Nasıl Elde Edilir',
    question: 'Yapay zekâ kodlama yardımcılarını kod kalitesini zedelemeden nasıl etkili kullanırım?',
    summary:
      'Yapay zekâ kodlama araçları en büyük kazanımlarını şablon kodda, testlerde ve yabancı topraklarda verir — onlara bağlam verir ve çıktılarını incelerseniz. İşe yarayan uygulamalar, yönetilecek riskler ve zamanın gerçekte nereye gittiği.',
    tags: ['ai', 'programlama', 'kodlama yardımcıları', 'geliştirici araçları', 'verimlilik'],
    language: 'tr',
    image: { prompt: promptOf('ai-coding-assistants'), alt: 'İnsan eli ve ışıktan bir robot eli birlikte tek bir kod blokları köprüsü kuruyor' },
    sources: [
      { title: 'Peng ve diğ., "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot" (2023)', url: 'https://arxiv.org/abs/2302.06590' },
      { title: 'SWE-bench — gerçek GitHub sorunlarında LLM kıyaslaması', url: 'https://www.swebench.com' },
    ],
    content: `# Yapay Zekâ Kodlama Yardımcılarından Gerçek Değer Nasıl Elde Edilir

Yapay zekâ kodlama yardımcıları gerçekten üretkendir — denetimli çalışmalar kendi içinde tamamlanmış görevlerde büyük hızlanmalar göstermiştir ve 2026’ya gelindiğinde test çalıştırıp birden çok dosyayı düzenleyen ajanlı araçlar otomatik tamamlamanın çok ötesine geçmiştir. Ama kazanımlar dengesizdir ve iki alışkanlığa koşulludur: **araca gerçek bağlam vermek** ve **yazdığını incelemek**. Bu ikisinden birini atlayan ekipler, ince hataları yalnızca daha hızlı sevk eder.

## Kazanımların yoğunlaştığı yer

- **Şablon kod ve yapıştırıcı**: CRUD uç noktaları, yapılandırma, serileştirme, API istemci sarmalayıcıları.
- **Testler**: mevcut koddan kapsamlı birim testi takımları üretmek, dakika başına en yüksek değerli kullanımlardan biridir.
- **Yabancı topraklar**: yeni bir dil, çerçeve ya da API — yardımcı, belge okuma saatlerini dakikalara sıkıştırır.
- **Mekanik düzenlemeler**: yeniden adlandırmalar, imza değişiklikleri, bilinen bir kalıbı dosyalar arasında uygulama.
- **Kodu açıklama**: bir soruyla bir eski modüle dahil olarak ona sorular sorma.

Kazanımların küçüldüğü yer: derin alan mantığı, başarımın kritik olduğu çekirdekler, büyük mimari kararlar ve yanlış olmanın pahalıya patladığı kod. Orada yardımcı bir yazar değil, bir antrenman partneridir.

## İyi sonuçları kötüden ayıran uygulamalar

**İsteği daraltın.** "Bu uç noktaya, \`listUsers\` nasıl yapıyorsa ona uyarak sayfalama ekle" ifadesi "bu API’yi iyileştir"i geride bırakır. Küçük, doğrulanabilir artımlar bileşik kazanç sağlar; bin satırlık üretimler inceleme kâbusudur.

**Bağlamı bilinçli besleyin.** Aracı ilgili dosyalara, hata iletisine, şemaya, ekip kurallarına yönlendirin. Modern ajanlı yardımcılar bağlamı kendileri bulabilir — ama doğru başlangıç dosyalarını adıyla söylemek yine de dolanmalarını yarıya indirir.

**Testleri ona çalıştırtın.** Tek en büyük güvenilirlik yükseltmesi bir geri besleme döngüsüdür: test takımını yürütebilen bir yardımcı, hatalarını size sevk etmek yerine kendisi yakalar.

**Kendinden emin bir junior’ın PR’ı gibi inceleyin.** Kod akla yatkın okunur; göz gezdirmeyi tam da bu yüzden tehlikeli kılan budur. Uç durumları, hata işlemeyi ve güvenliğe duyarlı yüzeyleri (girdi doğrulama, kimlik doğrulama, sorgular) tam dikkatle kontrol edin.

**Testleri ve tipleri korkuluk olarak tutun.** Güçlü tipleme ve iyi kapsam, "yapay zekâ bir şeyi bozdu"yu bir üretim olayından kırmızı bir CI çalışmasına dönüştürür.

## Görev türü → gerçekçi beklenti

| Görev | Beklenti |
| --- | --- |
| Mevcut kod için birim testleri | Büyük hızlanma, yüksek güvenilirlik |
| Şablon/iskelet | Büyük hızlanma |
| Yeniden üretilebilir testli hata düzeltmesi | İyi — ajanlı araçlar bunları çoğu zaman tam yakalar |
| Yabancı çerçevede özellik | Öğrenme eğrisinde büyük sıkıştırma |
| İnce eşzamanlılık/başarım işi | Ölçülü yardım; titizce doğrulayın |
| Sistem tasarımı | Yararlı bir tartışma ortağı, kâhin değil |

## Ekip düzeyinde korkuluklar

Sinsice değil açıkça benimseyin: yardımcıların teşvik edildiği yerlerde anlaşın, üretilen kod için aynı inceleme çıtasını isteyin, düzenlemeye tabi kod tabanlarında lisansa duyarlı sözcüğü sözcüğüne çıktıya dikkat edin ve CI’yi yetkili tutun. Ve öğrenme döngüsünü koruyun — okumadan yapıştıran juniorlar yaylada takılır; yardımcıyı sorgulayan juniorlar önceki herhangi bir kuşaktan daha hızlı öğrenir.

## SSS

**Yardımcılar beni daha kötü bir mühendis yapar mı?**
Çalışmayı bıraktığınız becerileri aşındırır, yönlendirdiğiniz becerileri yükseltir. Belirtebilen, ayrıştırabilen ve doğrulayabilen mühendisler her yıl daha çok kaldıraç elde eder; salt yazma hızı önemini yitirir.

**Yardımcı neden kendinden emin biçimde derlenmeyen kod üretir?**
Akla yatkın kod tahmin eder ve bazen var olmayan API’ler halüsine eder. Derlemeyi ve testleri hakem belleyin — ve kodu size göstermeden önce derleyen/çalıştıran araçları yeğleyin.

**Ajan mı, otomatik tamamlama mı?**
Farklı işler için ikisi de: yazarken akış için satır içi tamamlama; "şu testleri geçir" gibi tarif edip doğrulayabileceğiniz, kendi içinde tamamlanmış görevler için ajan kipi.`,
  },
  {
    topicKey: 'llm-hallucinations',
    title: 'Büyük Dil Modelleri Neden Halüsinasyon Görür?',
    question: 'Büyük dil modelleri neden uydurma yapar ve halüsinasyonlar nasıl azaltılabilir?',
    summary:
      'LLM’ler doğrulanmış gerçeği değil, akla yatkın metin üretmek üzere eğitilir — bilgi tükendiğinde akıcı tahmin boşluğu doldurur. Neden olur, ne zaman kötüleşir ve hangi önlemler gerçekten işe yarar.',
    tags: ['ai', 'llm', 'halüsinasyon', 'güvenilirlik', 'makine öğrenmesi'],
    language: 'tr',
    image: { prompt: promptOf('llm-hallucinations'), alt: 'Bir sinirsel çekirdekten çıkan ışık yarı katı yapıya, yarı sise dönüşüyor' },
    sources: [
      { title: 'Huang ve diğ., "A Survey on Hallucination in Large Language Models" (2023)', url: 'https://arxiv.org/abs/2311.05232' },
      { title: 'Lin ve diğ., "TruthfulQA: Measuring How Models Mimic Human Falsehoods" (2021)', url: 'https://arxiv.org/abs/2109.07958' },
      { title: 'Liu ve diğ., "Lost in the Middle: How Language Models Use Long Contexts" (2023)', url: 'https://arxiv.org/abs/2307.03172' },
    ],
    content: `# Büyük Dil Modelleri Neden Halüsinasyon Görür?

Bir dil modeli tek bir şeyi yapmak üzere eğitilir: kendinden önce geleni akla yatkın biçimde sürdüren metni öngörmek. Gerçek ve akla yatkınlık çoğunlukla örtüşür — modeller bu yüzden yararlıdır — ama model sorduğunuz olgudan yoksun olduğunda, eğitim amacı yine de akıcı çıktı talep eder. Sonuç, kendinden emin, iyi biçimlenmiş, yanlış bir yanıttır. Halüsinasyon LLM’lere cıvatalanmış bir arıza değildir; bilgilerinin kıyısındaki akla yatkınlığı azamileştiren sistemlerin öntanımlı davranışıdır.

## Mekanik

- **Kayıplı sıkıştırma.** Eğitim, terabaytlarca metni sabit bir ağırlık kümesine sıkıştırır. Yaygın bilgi yüksek doğrulukla sağ kalır; nadir olgular — küçük kasaba ayrıntıları, ufak makaleler, niş ürün özellikleri — bulanıklaşır ya da yiter ve model hangisinin yittiğini güvenilir biçimde bilemez.
- **Arama adımı yok.** Düz bir model yanıtlamadan önce bir veritabanına danışmaz; istatistiksel bellekten üretir. "Bu getirilmiş bir olgu" ile "bu kalıp tamamlama"yı ayıran içsel bir bayrak yoktur.
- **Eğitim yanıt vermeyi ödüllendirir.** İnsan tercihleriyle ayarlanan modeller, yardımsever, kendinden emin, eksiksiz yanıtların yüksek puan aldığını öğrenir — tarihsel olarak kıyaslamalar ve değerlendiriciler "bilmiyorum"u cezalandırdı, modellere tahmin etmeyi öğretti.
- **Hata birikmesi.** Üretim ardışıktır; erken yanlış bir token (uydurulmuş bir ad, yanlış bir yıl), tutarlı yanlış bir paragrafa doğru genişletilir.

## Nerede öngörülebilir biçimde kötüleşir

Alıntılar ve kaynakça (biçimi taklit etmek kolay, içeriği ezberlenmemiş), kesin sayılar ve tarihler, nadir varlıklar, uzun belgeler (modeller uzun bağlamların ortasına daha az güvenilir biçimde dikkat verir), metin içinde yapılan aritmetik ve modelin kibarca kabul ettiği yanlış bir öncüle dayanan herhangi bir soru.

## İşe yarayan önlemler

| Önlem | Neyi ele alır |
| --- | --- |
| RAG / getirilen belgelerde temellendirme | Belleği sağlanan olgularla değiştirir; alıntıyı mümkün kılar |
| Araç kullanımı (hesap makinesi, kod, arama) | Modellerin en kötü hesapladığını dışarı verir |
| "Yalnızca bağlamdan yanıtla; yoksa bilinmiyor de" | Reddetme izni verir |
| Olgusal görevler için düşük sıcaklık | Yaratıcı-ama-yanlış örneklemeyi kırpar |
| Öz doğrulama / ikinci geçiş kontrolü | İlk geçişin kaçırdığı tutarsızlıkları yakalar |
| Alıntı zorunlu + nokta kontrol akışı | Hataları insanların tespit edebileceği hâle getirir |
| Zor sorunlarda akıl yürüten modeller | Adımları işlemek zorlanmamış hataları azaltır |

Ağır siklet olan **temellendirmedir** (grounding): doğru pasaj bağlamdayken modelin işi *hatırlamaktan* *okumaya* kayar, ki bunu çok daha güvenilir yapar. RAG’in olgusal ürünler için standart mimari olmayı sürdürmesinin nedeni budur.

## Tamamen çözülebilir mi?

Mevcut mimarilerle hayır — daima metin üretmek zorunda olan bir sistem, bazen desteksiz metin üretecektir. Araştırma oranları düşürmeyi sürdürüyor (daha iyi ayar, modelleri çekimser kalmaya eğitmek, doğrulama katmanları) ve akıl yürütebilen modeller çok adımlı sorunlarda daha az halüsinasyon görüyor. 2026 itibarıyla mühendislik duruşu: artık halüsinasyonu **varsayarak** tasarlamak — yanıtları temellendirin, önemli iddialar için alıntı isteyin, hataların pahalıya patladığı yerde insanları döngüde tutun.

## SSS

**Model yanlışken neden DAHA kendinden emin görünür?**
Akıcılık ve özgüven metinden öğrenilmiş üslup kalıplarıdır, içsel kesinlikle ilişkisizdir. Tonu bir doğruluk sinyali olarak kullanmayın.

**"Emin misin?" diye sormak yardımcı olur mu?**
Bazen yararlı bir öz incelemeyi tetikler, bazen ima ettiğiniz kuşkuya yağcı bir uyum gösterir. Bağımsız doğrulama, sorguya çekmeyi geride bırakır.

**Daha büyük modeller daha mı doğrucu?**
Geniş olgusallıkta genelde evet, ama hiçbir boyut uydurmayı ortadan kaldırmaz — ve kendinden emin üslup da boyutla büyür. Ölçek sorunu küçültür; temellendirme ve doğrulama kalanı yönetir.`,
  },
  {
    topicKey: 'open-vs-closed-llms',
    title: 'Açık Kaynak mı, Kapalı Kaynak mı LLM: Nasıl Seçilir',
    question: 'Açık kaynak mı yoksa kapalı kaynak mı büyük dil modelleri üzerine inşa etmeliyim?',
    summary:
      'Kapalı API’ler sıfır operasyonla sınır yeteneği satın aldırır; açık ağırlıklı modeller denetim, gizlilik ve ucuz ölçek satın aldırır. Belirleyici etkenler verinin duyarlılığı, hacim ekonomisi ve görevinizin gerçekte ne kadar yeteneğe ihtiyaç duyduğudur.',
    tags: ['ai', 'llm', 'açık kaynak', 'strateji', 'altyapı'],
    language: 'tr',
    image: { prompt: promptOf('open-vs-closed-llms'), alt: 'Kafesi açıkta duran bir çekirdeğin yanında tek portlu, mühürlü ve cilalı bir çekirdek' },
    sources: [
      { title: 'LMArena — açık ve kapalı modelleri karşılaştıran topluluk sıralaması', url: 'https://lmarena.ai' },
      { title: 'Hugging Face — açık model merkezi', url: 'https://huggingface.co/models' },
    ],
    content: `# Açık Kaynak mı, Kapalı Kaynak mı LLM: Nasıl Seçilir

"Açık mı kapalı mı" bir ideoloji sorusundan çok bir tedarik sorusudur: **modeli kim çalıştırır, verinizi kim görür ve operasyon yükünü kim soğurur.** Kapalı modeller (API ile sunulan — GPT, Claude ve Gemini aileleri) sınır yeteneğini sıfır altyapıyla satar. Açık ağırlıklı modeller (Llama, Qwen, DeepSeek, Mistral aileleri ve daha niceleri) size ağırlıkları teslim eder, beraberinde denetimi, gizliliği ve sunma faturasını.

Sözleşmelerde önem taşıyan bir terim notu: "açık kaynak" modellerin çoğu tam olarak **açık ağırlıklıdır** — indirip çalıştırabilirsiniz ama eğitim verisi yayımlanmaz ve lisanslar kullanım kısıtları taşıyabilir. Pazarlamayı değil, lisansı okuyun.

## Ödünleşim tablosu

| Boyut | Kapalı (API) | Açık ağırlıklı (kendi barındırdığınız) |
| --- | --- | --- |
| Tepe yetenek | Sınır; zor akıl yürütmede en güçlü | En iyi açık modeller yaklaşır ve kalite başına maliyette öne geçer |
| Maliyet biçimi | Token başına, kullanımla ölçeklenir | Sabit altyapı + operasyon, kapasiteyle ölçeklenir |
| Veri denetimi | Veri sağlayıcıdan geçer (saklama/eğitim koşullarını kontrol edin) | Ağınızdan asla çıkmaz |
| Özelleştirme | İstem verme, bir miktar barındırılan ince ayar | Tam ince ayar, nicemleme, ameliyat |
| Operasyon yükü | Yok | GPU’lar, sunma yığını, yükseltmeler, nöbet |
| Kararlılık | Modeller satıcının takvimine göre kullanımdan kalkar | Ağırlıklar sonsuza dek sizindir |
| Uyumluluk | Satıcı sertifikaları | Katı veri yerleşim kuralları için en kolay öykü |

## Kapalının kazandığı durumlar

Mevcut en güçlü akıl yürütmeye ihtiyacınız var; hacminiz ölçülü ya da inişli çıkışlı; GPU/ML operasyon kapasiteniz yok; yetenek kazanımlarının size sürekli ulaştırılmasını istiyorsunuz. Çoğu ürün ekibinin ilk yılı için bir sınır API’si, ürünün hiç çalışıp çalışmadığını öğrenmenin en hızlı yoludur — çalıştıktan sonra eniyileyin.

## Açığın kazandığı durumlar

Veri dışarı çıkamaz (sağlık, savunma, katı yerleşim); sürekli yüksek hacim token başına fiyatlandırmanın kâr marjlarınıza egemen olmasına yol açar; derin özelleştirmeye ya da tek bir görev için damıtılmış küçük, hızlı bir uzmana ihtiyacınız var; bir modeli donanıma ya da hava boşluklu ortamlara gömüyorsunuz; veya satıcı kilidi, önlemekle görevli olduğunuz stratejik bir risk.

## Olgun ekiplerin çoğunun vardığı kalıp

**Yönlendirin, biat etmeyin.** Yetenekli bir kapalı model zor, düşük hacimli kuyruğu kaldırır; ayarlanmış bir açık model yüksek hacimli, iyi anlaşılmış çekirdeği kaldırır; duyarlı iş yükleri şirket içinde kalır. Soyutlama katmanları ve OpenAI uyumlu sunma yığınları çoklu model yönlendirmesini ucuza kurdurur ve katmanlar arasındaki fark her çeyrekte yeniden ölçülür — çünkü 2026 itibarıyla durmadan kımıldıyor.

## SSS

**Açık modeller "bir kuşak geride" mi?**
Sınırdaki fark sürüyor ama çarpıcı biçimde daraldı ve birçok somut görevde (çıkarım, özetleme, rutin kodlama) güçlü açık modeller basitçe yeterli. Başlıkları değil, kendi görevinizi kıyaslayın.

**Kendi barındırma gerçekten daha mı ucuz?**
Yalnızca kullanım oranıyla. %5 kapasiteyle sunan bir GPU yeryüzündeki en pahalı token fabrikasıdır; yönetilen açık model API’leri orta yoldur — açık ağırlıklar, başkasının GPU’ları.

**Sonradan geçiş yapabilir miyim?**
İstem düzeyindeki davranış modeller arasında kusurlu biçimde aktarılır. İlk günden bir değerlendirme takımı tutun; göç maliyetinin çoğu yeniden doğrulamadır ve değerlendirmeler bunu haftalarca "his"ten günlerce "farka" çevirir.`,
  },
  {
    topicKey: 'llm-tokens-pricing',
    title: 'Token Nedir ve LLM Fiyatlandırması Nasıl İşler?',
    question: 'Token tam olarak nedir ve LLM sağlayıcıları kullanımı nasıl ücretlendirir?',
    summary:
      'Token’lar modellerin okuyup yazdığı alt-sözcük parçalarıdır — her biri kabaca bir İngilizce sözcüğün ¾’ü. API fiyatlandırması milyon token başınadır, çıktı girdinin birkaç katına mal olur ve önbellekleme/toplu işlem en büyük kaldıraçlardır.',
    tags: ['ai', 'llm', 'token', 'fiyatlandırma', 'api'],
    language: 'tr',
    image: { prompt: promptOf('llm-tokens-pricing'), alt: 'Bir prizma metin-ışığı şeridini token’lara dilimliyor ve bir terazide tartılıyor' },
    sources: [
      { title: 'tiktoken — OpenAI modellerinin kullandığı hızlı BPE token’layıcı', url: 'https://github.com/openai/tiktoken' },
      { title: 'Sennrich ve diğ., "Neural Machine Translation of Rare Words with Subword Units" (BPE, 2015)', url: 'https://arxiv.org/abs/1508.07909' },
    ],
    content: `# Token Nedir ve LLM Fiyatlandırması Nasıl İşler?

Modeller karakter ya da sözcük okumaz — **token** okur: bir token’layıcının ürettiği alt-sözcük parçaları. "Understanding" tek bir token olabilir; "unconstitutionally" dört olabilir; nadir bir emoji üç olabilir. Her yetenek sınırı (bağlam penceresi) ve her API faturası bu birimlerle ifade edilir, bu yüzden onlara dair kabaca bir his hızla kendini amorti eder.

## Pratik kurallar

- **İngilizce**: 1 token ≈ 4 karakter ≈ bir sözcüğün ¾’ü. 1.000 sözcüklük bir belge ≈ 1.300–1.500 token.
- **Kod**: düzyazıdan daha token-yoğun — noktalama, girinti ve tanımlayıcıların hepsi maliyetlidir.
- **Çince/Japonca/Korece**: modern token’layıcılarda kabaca token başına 1–2 karakter; *aktarılan bilgi* başına, CJK metni çoğu zaman İngilizceyle karşılaştırılabilir ya da bir tık daha maliyetlidir.
- **Sayılar ve URL’ler**: şaşırtıcı biçimde pahalıdır; uzun kimlikler birçok token’a parçalanır.

Token’layıcılar bayt çifti kodlamayla (BPE) inşa edilir: baytlardan başlayıp en sık çiftleri yinelemeli olarak birleştirerek yaygın diziler tek bir token olur. Her model ailesinin kendi token’layıcısı vardır — sayımlar sağlayıcılar arasında farklıdır, bu yüzden maliyet karşılaştırmaları *kendi* gerçek trafiğinizde yürütülmelidir.

## Sayaç nasıl döner

API fiyatlandırması sağlayıcılar arasında standart bir biçime sahiptir:

| Sayaç | Ne sayılır | Tipik ilişki |
| --- | --- | --- |
| **Girdi token’ları** | Gönderdiğiniz her şey: sistem istemi, geçmiş, getirilen belgeler, soru | Temel oran |
| **Çıktı token’ları** | Modelin ürettiği her şey; bazı akıl yürüten modellerde gizli akıl yürütme dahil | Yaygın olarak girdi oranının ~3–5 katı |
| **Önbelleğe alınmış girdi** | Tekrarlayan durağan önekler (sistem istemleri, uzun belgeler) | Genellikle taze girdiden ~10 kat ucuz |
| **Toplu/eşzamansız** | Toplu olarak gönderilen, acelesi olmayan işler | Yaygın olarak ~yarı fiyat |

Buradan iki yapısal olgu çıkar. Birincisi, **konuşma geçmişi her turda yeniden gönderilir** — bir sohbetin maliyeti, kırpmadıkça, özetlemedikçe ya da önbelleğe dayanmadıkça uzunluğuyla karesel olarak büyür. İkincisi, uzun metin ürettiğinizde **çıktı egemen olur**, bu yüzden "kısa tut" talimatları ve çıktı üst sınırları yalnızca üslup tercihleri değil, gerçek maliyet denetimleridir.

## Bir iş yükünü tahmin etmek

Aritmetik her zaman aynıdır: (günlük istek sayısı) × (ortalama girdi token’ı × girdi oranı + ortalama çıktı token’ı × çıktı oranı). Yer tutucu oranlarla işlenmiş bir örnek — diyelim girdi milyon token başına 3 dolara, çıktı 15 dolara mal olsun: 2.000 token’lık istemler (talimatlar + getirilen bağlam) ve 300 token’lık yanıtlarla günde 10.000 sorgu yanıtlayan bir destek botu, 10.000 × (2.000×3 + 300×15)/1M ≈ **günde 105 dolara** mal olur, üçte ikisi girdi. Bu oran RAG uygulamaları için tipiktir — istem önbellekleme ve bağlam kırpmanın çoğu zaman model değiştirmekten daha çok tasarruf etmesinin nedeni de budur.

## En büyük kaldıraçlar (sıralı)

1. **Durağan önekleri önbelleğe alın** — uzun, sabit bir sistem istemi ya da paylaşılan belgeleri olan herhangi bir uygulama için neredeyse bedava kazanç.
2. **Modeli doğru boyutlandırın** — kolay trafiği daha ucuz bir katmana yönlendirin; sınır modellerini zor kuyruğa ayırın.
3. **Bağlamı kırpın** — daha az ama daha iyi parça getirin; eski sohbet turlarını özetleyin; şablon tekrarını ayıklayın.
4. **Çıktıyı sınırlayın ve şekillendirin** — azami uzunluklar belirleyin; mümkünse yapılandırılmış kısa yanıtları yeğleyin.
5. **Acelesi olmayanı topluca işleyin** — gece boyu sınıflandırma ve geri doldurmalar etkileşimli fiyat ödememeli.

## SSS

**Neden metin uzunluğumun ima ettiğinden daha çok token ücretlendirildim?**
Sistem istemleri, araç tanımları, mesaj biçimlendirmesi ve (akıl yürüten modellerde) düşünme token’larının hepsi sayılır ve İngilizce dışı ya da kod yoğun metin, İngilizce pratik kuralından daha yoğun token’lanır.

**Bağlam pencereleri fiyatlandırmayı değiştirir mi?**
Pencere bir fiyat değil, bir kapasite sınırıdır — ama onu doldurmak öyledir. Bazı sağlayıcılar belirli bağlam boyutlarının üstünde primli oran da alır, bu yüzden devasa bağlamlı çağrılar incelemeyi hak eder.

**Göndermeden önce token’ları nasıl sayarım?**
Sağlayıcının token’layıcı kütüphanesini ya da token sayma uç noktasını kullanın (OpenAI ailesi token’layıcılar için tiktoken yerelde çalışır). Bütçeleme için ≈4 karakter sezgiseli genellikle %20 içindedir.`,
  },
];
