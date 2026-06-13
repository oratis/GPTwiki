import type { DraftArticle } from './types';
import { devPracticesEn } from './dev-practices.en';

const promptOf = (key: string): string => {
  const hit = devPracticesEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const devPracticesTr: DraftArticle[] = [
  {
    topicKey: 'rebase-vs-merge',
    title: 'Git Rebase mi Merge mi: Hangisi Ne Zaman Kullanılır?',
    question: 'git merge ile git rebase arasındaki fark nedir ve her birini ne zaman kullanmalıyım?',
    summary:
      'Merge geçmişi olduğu gibi korur ve bir birleştirme commit’i oluşturur; rebase ise commit’lerinizi yeni bir tabana yeniden uygulayarak temiz, doğrusal bir geçmiş üretir. Paylaşılan dallarda merge, kendi özel çalışmanızı paylaşmadan önce rebase kullanın.',
    tags: ['programlama', 'git', 'sürüm kontrolü', 'geliştirici araçları'],
    language: 'tr',
    image: {
      prompt: promptOf('rebase-vs-merge'),
      alt: 'İki rayın bir kavşakta birleşmesi ile tek bir rayın yeniden tek düz hat olarak döşenmesinin karşılaştırması',
    },
    sources: [
      { title: 'Pro Git kitabı — Rebasing', url: 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing' },
      { title: 'Atlassian — Merging vs Rebasing', url: 'https://www.atlassian.com/git/tutorials/merging-vs-rebasing' },
    ],
    content: `# Git Rebase mi Merge mi: Hangisi Ne Zaman Kullanılır?

Hem \`merge\` hem \`rebase\` aynı sorunu çözer — bir daldaki çalışmayı bir başkasına birleştirmek — ama bunun nasıl olduğuna dair iki farklı hikâye anlatırlar. Merge geçmişi *gerçekte olduğu gibi*, dallarıyla birlikte kaydeder. Rebase ise geçmişi *yeniden yazarak* sanki baştan beri düz bir çizgide çalışmışsınız gibi gösterir. Hiçbiri "doğru" değildir; ikisi farklı hedefler için optimize edilmiştir ve onları yöneten ünlü kural, her birinin yaptığı işten doğrudan çıkar.

## Her komut aslında ne yapar

**Merge** iki dalı alır ve iki ebeveyni olan yeni bir **birleştirme commit’i** ile birbirine bağlar. Dalınızın commit’leri tam olduğu yerde kalır; birleştirme commit’i zaman çizgilerini birleştirir. Geçmiş, "bunlar paralel gelişti, sonra birleşti" gerçeğini dürüstçe gösteren bir grafiğe dönüşür.

**Rebase** ise dalınızın commit’lerini alır, bir kenara koyar, hedef dalın ucuna geçer ve **commit’lerinizi tek tek yeniden uygular** onun üzerine. Sonuç düz bir çizgidir — sanki çalışmanıza en güncel koddan başlamışsınız gibi. Ancak o yeniden uygulanan commit’ler *yeni kimliklere sahip yeni commit’lerdir*; orijinaller atılır. İşte can alıcı ayrıntı bu: rebase geçmişi yeniden yazar.

## Ödünleşim

| | Merge | Rebase |
| --- | --- | --- |
| Geçmiş biçimi | Dallanan grafik, olaylara sadık | Temiz düz çizgi |
| Yeni commit oluşturur mu? | Bir birleştirme commit’i | Yeniden uygulanan tüm commit’leri yeniden yazar |
| Bağlamı korur | Evet — işin ne zaman/nerede ayrıldığını gösterir | Hayır — hikâyeyi düzleştirir |
| Çakışma yönetimi | Birleştirmede bir kez çöz | Yeniden uygulama sırasında commit başına çözülebilir |
| Paylaşılan dallarda güvenli | Evet | Hayır — başkalarının tabanını yeniden yazar |

## Felaketleri önleyen tek kural

**Başkalarının halihazırda sahip olduğu commit’leri asla rebase etmeyin.** Rebase commit’leri yenileriyle değiştirdiğinden, paylaşılan/herkese açık bir dalı rebase etmek başkalarının üzerine çalışma kurduğu geçmişi yeniden yazar — bir sonraki pull’larında onların geçmişi ile sizinki uyuşmaz, bu da çoğaltılmış commit’ler ve acı verici bir kafa karışıklığı doğurur. Altın kural: *özel, yerel çalışmayı rebase et; paylaşılan her şeyi merge et.*

Yaygın ve güvenli bir iş akışı ikisini birleştirir: bir özellik dalını tek başınıza geliştirirken, güncel kalmak için onu düzenli olarak **en güncel main üzerine rebase edin**, temiz bir geçmişle; sonra paylaşılan main’e entegre etmek için **merge edin** (genellikle bir pull request aracılığıyla). Hem derli toplu bir yerel geçmiş hem de dürüst, yıkıcı olmayan bir entegrasyon elde edersiniz.

## Pratik rehberlik

- **Merge kullanın**: tamamlanmış bir dalı paylaşılan bir dala getirmek için ve dal herkese açık olduğunda her zaman.
- **Rebase kullanın**: devam eden özel dalınızı yeni main commit’leri üzerine güncellemek için ve incelemeden önce kendi dağınık yerel commit’lerinizi düzenlemek için (etkileşimli rebase).
- **Rebase’ten kaçının**: \`main\`/paylaşılan dallarda; ve başka birinin commit’lerinize sahip olup olmadığından emin değilseniz durun.

## SSS

**Rebase çalışmamı siler mi?**
Hayır — commit’leri yeniden yazar ama değişiklikler korunur (ve eski commit’ler kurtarma için reflog’da bir süre kalır). Düzenlemelerinizin içeriğini değil, commit kimliklerini ve sırasını değiştirir.

**Bazı ekipler neden birleştirme commit’lerini yasaklar?**
Okunabilirlik ve bisect için kusursuz doğrusal bir geçmiş tercih ederler, bu yüzden merge’ten önce rebase (veya "squash merge") şart koşarlar. Gerçek ödünleşimleri olan bir stil tercihidir, doğruluk meselesi değil.

**Squash merge nedir?**
Bir dalın tüm commit’lerini hedef dalda tek bir commit’e yoğunlaştırır — derli toplu, özellik başına tek commit’lik bir geçmiş, dalın tek tek commit ayrıntısını yitirme pahasına.`,
  },
  {
    topicKey: 'rest-vs-graphql',
    title: 'REST mi GraphQL mi: Hangi API Stilini Seçmelisiniz?',
    question: 'REST ile GraphQL API’leri arasındaki fark nedir ve her birini ne zaman kullanmalıyım?',
    summary:
      'REST her biri belirli bir biçim döndüren çok sayıda sabit uç nokta sunar; GraphQL ise istemcinin tam olarak istediği alanları sorduğu tek bir uç nokta sunar. GraphQL karmaşık, değişken veri ihtiyaçlarında parlar; REST daha basit, önbelleklenebilir ve her yerde kalır.',
    tags: ['programlama', 'api', 'rest', 'graphql'],
    language: 'tr',
    image: {
      prompt: promptOf('rest-vs-graphql'),
      alt: 'Çok sayıda sabit otomat gözü ile bir listeye göre tam olarak sipariş hazırlayan tek bir tezgâhın karşılaştırması',
    },
    sources: [
      { title: 'GraphQL — resmi tanıtım', url: 'https://graphql.org/learn/' },
      { title: 'MDN — HTTP ve REST kavramlarına genel bakış', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
    ],
    content: `# REST mi GraphQL mi: Hangi API Stilini Seçmelisiniz?

REST ve GraphQL, istemcilerin bir sunucudan veriyi nasıl istediğini tasarlamanın iki yoludur. **REST** size her biri sabit bir veri parçası döndüren birçok URL (uç nokta) verir. **GraphQL** ise size tek bir uç nokta ve bir sorgu dili verir, böylece istemci *tam olarak* hangi alanları istediğini belirtir ve ne fazla ne eksik, tam onu alır. Karşıtlık şuna iner: yanıtın biçimine kim karar verir — sunucu (REST) mu istemci (GraphQL) mi?

## Pratikte nasıl farklılaşırlar

Diyelim ki bir kullanıcının adını ve son üç gönderisinin başlıklarını istiyorsunuz.

**REST ile**, genellikle \`/users/123\` çağırırsınız (tüm kullanıcı nesnesini döndürür), sonra \`/users/123/posts\` (tam gönderi nesnelerini döndürür). İstediğinizden çok daha fazlasını aldınız (her kullanıcı ve gönderi alanını) ve iki gidiş-dönüş yaptınız. Bunlar REST’in klasik sürtünmeleridir: **aşırı getirme** (çok fazla alan) ve **eksik getirme** (bir görünümü oluşturmak için daha fazla çağrı gerekmesi).

**GraphQL ile**, tek bir uç noktaya tek bir sorgu gönderir, \`user.name\` ve \`user.posts(last: 3).title\` istersiniz ve tek bir yanıtta tam olarak o alanları alırsınız. İstemci verisini tek bir istekte tastamam aldı.

## Ödünleşim tablosu

| | REST | GraphQL |
| --- | --- | --- |
| Uç noktalar | Çok sayıda, kaynak tabanlı | Bir |
| Yanıt biçimi | Sunucu tarafından sabitlenir | İstemci tarafından seçilir |
| Aşırı/eksik getirme | Yaygın | Tasarımı gereği önlenir |
| Önbellekleme | Basit (URL’ye göre HTTP önbellekleme) | Daha zor (tek URL, çeşitli sorgular) |
| Öğrenme eğrisi ve araçlar | Daha düşük, evrensel | Daha yüksek; bir şema ve sunucu katmanı gerekir |
| Sürümleme | Çoğu zaman /v1, /v2 | Şemayı geliştir, alanları kullanımdan kaldır |
| En iyi olduğu yer | Basit, kararlı, önbelleklenebilir kaynaklar | Karmaşık, iç içe, istemciye göre değişen veri |

## Hangisini ne zaman seçmeli

**REST’e yönelin** verileriniz görece basit ve kaynak biçiminde olduğunda, olgun HTTP önbelleklemesine ve araçlarına yaslanmak istediğinizde, birçok bilinmeyen istemcinin tüketeceği herkese açık bir API kurduğunuzda ya da yalnızca en az sürtünmeli, en evrensel anlaşılan seçeneği istediğinizde. REST hâlâ haklı nedenlerle varsayılan seçenektir.

**GraphQL’e yönelin** istemciler zengin biçimde bağlantılı verinin birçok farklı dilimine ihtiyaç duyduğunda (istekleri en aza indiren mobil uygulamalar için klasik, ve karmaşık kontrol panelleri), birden çok arka uç kaynağını tek bir grafiğin arkasında topladığınızda ya da ön uç ekipleri yeni uç noktalar beklemeden veri ihtiyaçları üzerinde yinelemek istediğinde. Bedeli, eklenen sunucu karmaşıklığı, bakımı yapılacak bir şema ve daha zor önbelleklemedir.

## SSS

**GraphQL, REST’ten "daha mı iyi"?**
Hayır — aşırı/eksik getirmeyi zarif biçimde çözer ama karmaşıklık ve önbellekleme zorlukları ekler. Basit API’ler için REST çoğu zaman daha iyi bir mühendislik tercihidir. Aracı veri ihtiyaçlarına uydurun.

**İkisini birden kullanabilir miyim?**
Evet, hem de yaygın olarak — birçok sistem basit/herkese açık yüzeyler için REST, karmaşık dahili/uygulama verisi için GraphQL sunar ya da REST servislerini bir GraphQL ağ geçidinin arkasına sarar.

**GraphQL veritabanının yerini alır mı?**
Hayır — istemci ile sunucu arasında bir API sorgu katmanıdır. Sunucunuz hâlâ veritabanlarından veya diğer servislerden veri çeker; GraphQL yalnızca istemcinin ne aldığını biçimlendirir.`,
  },
  {
    topicKey: 'sql-vs-nosql',
    title: 'SQL mi NoSQL mi: Veritabanı Nasıl Seçilir?',
    question: 'SQL ile NoSQL veritabanları arasındaki fark nedir ve nasıl seçim yaparım?',
    summary:
      'SQL veritabanları yapılandırılmış satırları sabit bir şemayla ve güçlü ilişkisel sorgularla saklar; NoSQL bu yapının bir kısmını esneklik ve daha kolay yatay ölçeklenme karşılığında takas eder. Doğru seçim verinizin biçimine, tutarlılık ihtiyaçlarınıza ve ölçeğinize bağlıdır.',
    tags: ['programlama', 'veritabanları', 'sql', 'nosql'],
    language: 'tr',
    image: {
      prompt: promptOf('sql-vs-nosql'),
      alt: 'Birbirine bağlı düzenli hücre ızgarası ile çeşitli serbest biçimli kapların esnek, gevşek kümesinin karşılaştırması',
    },
    sources: [
      { title: 'MongoDB — NoSQL vs SQL veritabanları', url: 'https://www.mongodb.com/resources/basics/databases/nosql-explained' },
      { title: 'PostgreSQL — hakkında (ilişkisel veritabanı)', url: 'https://www.postgresql.org/about/' },
    ],
    content: `# SQL mi NoSQL mi: Veritabanı Nasıl Seçilir?

"SQL vs NoSQL" veritabanlarını verileri nasıl düzenlediklerine göre ayırır. **SQL (ilişkisel) veritabanları** — PostgreSQL, MySQL ve diğerleri — verileri önceden tanımlanmış bir şemayla satırlardan ve sütunlardan oluşan tablolarda saklar ve tabloları ilişkilerle bağlar. **NoSQL** geri kalan her şeyin şemsiyesidir: belge depoları, anahtar-değer depoları, geniş sütunlu ve grafik veritabanları, ki bunlar esneklik ve ölçek için katı tablo yapısını gevşetir. Karar yeni-eskiyle ilgili değildir; veritabanını verinizin biçmine ve sisteminizin taleplerine uydurmakla ilgilidir.

## Temel fark: şema ve yapı

Bir **ilişkisel** veritabanı baştan yapı dayatır: tabloları ve sütun türlerini tanımlarsınız, her satır uyar ve veritabanı bunu zorlar. Karşılığında güçlü sorgulama (tablolar arası SQL join’leri), güçlü garantiler ve onlarca yıllık güvenilirlik elde edersiniz. Bedeli katılıktır — şemayı sonradan değiştirmek özen ister ve ilişkisel model geleneksel olarak *dışarı* doğru (birçok sunucu) değil, *yukarı* doğru (daha büyük bir sunucu) daha doğal ölçeklenir.

Bir **belge tabanlı NoSQL** veritabanı (en yaygın tür) esnek, JSON benzeri belgeler saklar. Farklı kayıtların farklı alanları olabilir; ilişkili veriyi tek bir belgenin içine yuvalayabilirsiniz. Bu, hızla evrilen veya düzensiz veriye uyar ve en baştan birçok makineye **yatay ölçeklenmek** için tasarlanmıştır. Bedeli: daha az yerleşik garanti, daha zayıf kayıtlar arası sorgulama ve veriyi denetleyecek şema olmadan tutarsız veri riski.

## Türlere göre ödünleşim

| Tür | Saklar | Güçlü olduğu yer | Örnek kullanım |
| --- | --- | --- | --- |
| İlişkisel (SQL) | Tablolar, satırlar | Karmaşık sorgular, işlemler, bütünlük | Finans, siparişler, ilişkisel her şey |
| Belge | JSON benzeri belgeler | Esnek şema, iç içe veri | Kataloglar, kullanıcı profilleri, içerik |
| Anahtar-değer | Basit anahtar → değer | Çok hızlı aramalar, önbellekleme | Oturumlar, önbellekler, özellik bayrakları |
| Geniş sütunlu | Dinamik sütunlu satırlar | Devasa yazma ölçeği | Zaman serisi, ölçekli günlükleme |
| Grafik | Düğümler ve ilişkiler | Yoğun bağlantılı veri | Sosyal grafikler, öneriler |

## Nasıl seçilir

Üç soru sorun:

- **Verileriniz ilişkisel ve tutarlılık açısından kritik mi?** (Para, envanter, yarım kalmış bir güncellemenin kabul edilemez olduğu her şey.) → İşlemleri ve bütünlüğü için SQL.
- **Verinizin biçimi düzensiz veya hızla değişen mi, ya da yazmaları birçok sunucuya ölçeklemeniz mi gerekiyor?** → Erişim desenine uygun bir NoSQL türü.
- **Sorgu desenleriniz neler?** Bol miktarda anlık join ve raporlama SQL’i, anahtara göre basit aramalar anahtar-değeri, derin bağlantılı gezinmeler grafiği destekler.

Dürüst modern varsayılan: **aksini gerektiren özel bir nedeniniz yoksa, sağlam bir ilişkisel veritabanıyla (örneğin PostgreSQL) başlayın.** Çok geniş bir ihtiyaç yelpazesini karşılar, esneklik için artık JSON sütunlarını destekler ve insanların sandığından daha ileri ölçeklenir. Somut bir gereksinim — uç ölçek, belirli bir erişim deseni, gerçekten şemasız veri — talep ettiğinde NoSQL’e yönelin.

## SSS

**NoSQL, SQL’den daha mı hızlı?**
Doğası gereği değil — belirli desenler için (basit anahtar aramaları, devasa yazmalar) daha hızlı, başkaları için (karmaşık join’ler) daha yavaş veya daha hantal olabilir. "Daha hızlı" tamamen işleme bağlıdır.

**SQL veritabanları büyük sistemlere ölçeklenebilir mi?**
Evet — çoğaltma, bölümleme ve önbellekleme ile ilişkisel veritabanları devasa sistemler işletir. "SQL ölçeklenemez" iddiası eskidir; ölçeklemek yalnızca daha bilinçli bir tasarım gerektirir.

**Yalnızca birini mi seçmek zorundayım?**
Hayır — "çoklu kalıcılık" yaygındır: çekirdek kayıtlar için bir ilişkisel veritabanı, artı bir anahtar-değer önbelleği ve belki bir arama veya grafik deposu, her biri en iyi yaptığı iş için.`,
  },
  {
    topicKey: 'https-how-it-works',
    title: 'HTTPS Bağlantınızı Nasıl Güvende Tutar?',
    question: 'HTTPS aslında ne yapar ve kilit simgesi verimi nasıl güvende tutar?',
    summary:
      'HTTPS sıradan web trafiğini şifrelemeyle sarar; böylece sizinle site arasındaki hiç kimse onu okuyamaz veya kurcalayamaz, ve gerçekten doğru sunucuyla konuştuğunuzu kanıtlamak için sertifikalar kullanır. Gizliliği ve bütünlüğü korur — ama sitenin kendisini değil.',
    tags: ['programlama', 'güvenlik', 'https', 'web'],
    language: 'tr',
    image: {
      prompt: promptOf('https-how-it-works'),
      alt: 'Bir mesajın koruyucu bir tüpten geçişi, dışarıdakiler için karıştırılması ve varış noktasında doğrulanmış mühürle gösterilmesi',
    },
    sources: [
      { title: 'MDN — HTTPS / TLS nedir', url: 'https://developer.mozilla.org/en-US/docs/Glossary/HTTPS' },
      { title: "Let's Encrypt — nasıl çalışır", url: 'https://letsencrypt.org/how-it-works/' },
    ],
    content: `# HTTPS Bağlantınızı Nasıl Güvende Tutar?

HTTPS yalnızca HTTP’dir — web’in temel istek/yanıt protokolü — etrafına sarılmış bir güvenlik katmanıyla ("S" Secure’dur, yani Güvenli, TLS tarafından sağlanır). Düz HTTP her şeyi, ağ yolundaki herkesin görüp değiştirebileceği okunabilir metin olarak gönderir. HTTPS bunu iki garantiyle düzeltir: **şifreleme** (dışarıdakiler trafiğinizi okuyamaz) ve **kimlik doğrulama** (gerçekten sandığınız siteyle konuşuyorsunuz, bir sahtekârla değil). Kilit simgesi *bağlantı* hakkında bir sözdür ve neyi vaat edip neyi etmediğini tam olarak anlamak gerçekten yararlıdır.

## Çözdüğü iki sorun

**1. Dinleme.** Düz HTTP’de WiFi ağınız, internet sağlayıcınız veya aradaki herkes gönderdiğiniz her sayfayı ve parolayı okuyabilir. HTTPS trafiği şifreler, böylece iki uç nokta dışında herkes için okunamaz bir karmaşaya dönüşür — aynı genel interneti kat etse de.

**2. Taklit ve kurcalama.** Yanıt veren sunucunun gerçekten bankanız olduğunu, bağlantıyı araya giren bir saldırgan olmadığını nereden bilirsiniz? HTTPS sunucunun kimliğini kanıtlamak için güvenilir otoritelerce verilen **sertifikalar** ve aktarım sırasındaki herhangi bir kurcalamanın saptanması için bütünlük denetimleri kullanır. Bu olmadan şifreleme tek başına işe yaramazdı — bir hırsızla özel olarak sohbet ediyor olabilirdiniz.

## El sıkışma nasıl çalışır (basitleştirilmiş)

HTTPS üzerinden bağlandığınızda, gerçek veri akmadan önce hızlı bir görüşme gerçekleşir:

1. **Sertifika kontrolü.** Sunucu sertifikasını sunar. Tarayıcınız bunun tam bu alan adı için güvenilir bir otorite tarafından verildiğini ve süresinin dolmadığını veya iptal edilmediğini doğrular — kimliği teyit eder.
2. **Anahtar değişimi.** Akıllıca kriptografiyle (açık anahtar matematiği), iki taraf onu *asla açıkta göndermeden* paylaşılan bir gizli anahtar üzerinde anlaşır, herkes izliyor olsa bile.
3. **Şifreli oturum.** Bundan sonra tüm trafik o paylaşılan anahtarla şifrelenir — konuşmanın geri kalanı için hızlı simetrik şifreleme.

Zarif olan kısım 2. adımdır: iki taraf açık bir kanal üzerinden özel bir anahtar oluşturur, böylece tüm el sıkışmayı gören bir dinleyici bile onu türetemez.

## Kilit simgesi ne demektir, ne demek değildir

| Kilit şunu garanti eder | Kilit şunu garanti **etmez** |
| --- | --- |
| Trafik aktarım sırasında şifrelenir | Sitenin dürüst veya güvenli olduğunu |
| Gerçek alan adına bağlısınız | Sitenin sizi dolandırmayacağını |
| Veri yolda değiştirilmedi | Ardındaki şirketin güvenilir olduğunu |

Bu, en çok yanlış anlaşılan noktadır: HTTPS *boruyu* güvenceye alır, *varış noktasını* değil. Bir oltalama sitesinin geçerli bir kilidi olabilir — bu yalnızca *dolandırıcılığa* olan bağlantınızın özel olduğu anlamına gelir. HTTPS verilerinizi üçüncü taraflardan korur; sitenin niyetlerine kefil olmaz.

## SSS

**HTTPS, HTTP’den daha mı yavaş?**
Bugün ihmal edilebilir ölçüde — modern donanım ve protokoller şifreleme yükünü minik kılar ve HTTPS çoğu zaman daha hızlı protokol özelliklerini etkinleştirir. "Şifreleme yavaştır" eski endişesi geçerliliğini yitirdi.

**Neden artık bloglarda bile HTTPS gerekli?**
Çünkü bir sayfayı okumak bile özel bilgileri açığa çıkarır ve şifrelenmemiş sayfalar aktarım sırasında değiştirilebilir (reklam/zararlı yazılım enjekte edilir). Tarayıcılar artık düz HTTP’yi "Güvenli Değil" olarak işaretler ve ücretsiz sertifikalar maliyet engelini kaldırdı.

**HTTPS veriyi sunucuya ulaştıktan sonra korur mu?**
Hayır — *aktarım sırasındaki* veriyi korur. Veri sunucuya ulaştığında güvenliği, sitenin onu nasıl sakladığına ve işlediğine bağlıdır. HTTPS bir katmandır, güvenliğin tamamı değil.`,
  },
  {
    topicKey: 'what-is-an-api',
    title: 'API Aslında Nedir? Sade Bir Açıklama',
    question: 'API nedir ve sade bir dille aslında nasıl çalışır?',
    summary:
      'API, bir programın iç işleyişini bilmeden bir başkasından hizmet istemesini sağlayan bir sözleşmedir — sizinle mutfak arasındaki bir restoran menüsü gibi. Ne isteyebileceğinizi ve ne geri alacağınızı tanımlar, ardındaki karmaşıklığı gizler.',
    tags: ['programlama', 'api', 'temel kavramlar', 'web'],
    language: 'tr',
    image: {
      prompt: promptOf('what-is-an-api'),
      alt: 'Bir tezgâhın üzerinden uzatılan bir menü isteği, karmaşık bir mutfağı gizleyen ve hazır bir tabak geri getiren sahne',
    },
    sources: [
      { title: 'MDN — Web API’lerine giriş', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction' },
      { title: 'Red Hat — API nedir?', url: 'https://www.redhat.com/en/topics/api/what-are-application-programming-interfaces' },
    ],
    content: `# API Aslında Nedir? Sade Bir Açıklama

API, Application Programming Interface’in (Uygulama Programlama Arayüzü) kısaltmasıdır ki bu hiçbir şey açıklamaz. İşte yararlı sürümü: API, **iki yazılım parçasının birbiriyle konuşmasını sağlayan bir sözleşmedir** — bir program hizmet sunar ve API başka bir programın bunları tam olarak nasıl isteyebileceğini tanımlar. Klasik benzetme bir restorandır. Siz (bir program) **menüye** (API) bakar, bir yemek ısmarlar (bir istek yapar), **mutfak** (diğer program) onu hazırlar ve gönderir (yanıt). Mutfağa hiç girmez veya tariflerini öğrenmezsiniz; menü aranızdaki üzerinde anlaşılmış arayüzdür.

## Bu neden önemli

O restoran düzeni bütün meseleyi yakalar: **nasıl yapıldığını bilmeden ihtiyacınız olanı alırsınız.** Bir uygulama size bir harita gösterdiğinde, dünyanın coğrafyasını içermez — bir harita API’sine sorar. Bir site size "PayPal ile öde" dediğinde, ödemeleri kendisi işlemez — PayPal’ın API’sini çağırır. API’ler yazılımın yazılım üzerine inşa edilmesini sağlar, böylece kimsenin haritaları, ödemeleri, hava durumu verisini veya oturum açma sistemlerini sıfırdan yeniden icat etmesi gerekmez.

Bu üç büyük fayda sağlar:

- **Soyutlama** — bir hizmeti iç işleyişini anlamadan kullanırsınız (mutfağın nasıl çalıştığını bilmeden yemek ısmarlarsınız).
- **Yeniden kullanım** — iyi kurulmuş bir hizmet binlerce uygulamayı besler.
- **Ayrışma** — mutfak tariflerini tamamen değiştirebilir ve menü aynı kaldığı sürece siparişiniz hâlâ işler. Ekipler iç işleyişlerini, kendilerine bağımlı olan herkesi bozmadan değiştirebilir.

## Bir web API çağrısı nasıl çalışır

Bugün en yaygın API’ler internet üzerinden konuşulan **web API’leridir**. Akış basittir:

1. Programınız belirli bir URL’ye ("menü öğesi") bir **istek** gönderir, çoğu zaman parametrelerle ("orta boy bir kahve, şekersiz").
2. Sunucu bunu alır, işi yapar (bir veritabanı sorgular, mantık çalıştırır), ve
3. Bir **yanıt** geri gönderir — genellikle programların kolayca okuduğu **JSON** biçiminde yapılandırılmış veri.

Örneğin, bir hava durumu uygulaması \`api.weather.com/forecast?city=Tokyo\` ister ve sıcaklık ile koşulları içeren JSON alır, sonra onu güzelce gösterir. Uygulama soruyu sağladı; API veriyi sağladı.

## API’ler her yerde

| Siz şunu görürsünüz | Ardında şuna bir API çağrısı |
| --- | --- |
| "Google ile oturum aç" | Google’ın kimlik doğrulama API’si |
| Bir uygulamaya gömülü harita | Bir haritalama API’si |
| Canlı kargo takibi | Kargo şirketinin API’si |
| "Kartla öde" | Bir ödeme işlemcisinin API’si |
| Bir uygulamadaki sohbet botu | Bir yapay zekâ sağlayıcısının API’si |

Modern yazılım büyük ölçüde **API’lerin API’leri çağırmasıdır** — her uygulama, başkalarından da sipariş veren küçük bir mutfaktır.

## SSS

**API ile web sitesi aynı şey mi?**
Hayır — bir web sitesi insanlar için biçimlendirilmiş sayfalar döndürür; bir API programlar için yapılandırılmış veri döndürür. Aynı fikir (istek → yanıt), farklı kitle.

**API’ler para tutar mı?**
Bazıları ücretsizdir, çoğu kullanıma göre ücretlendirir (istek başına veya hacme göre) ve bazıları sizi tanımlamak ve faturalandırmak için bir API anahtarı gerektirir. Haritalar, ödemeler ve yapay zekâ API’leri yaygın olarak kullanımı ölçer.

**"API anahtarı" nedir?**
Uygulamanızı API’ye tanıtan gizli bir belirteçtir; sizi doğrulamak, sınırları uygulamak ve kullanımı izlemek için kullanılır — siparişi kimin verdiğini söyleyen bir üyelik kartı gibi.`,
  },
  {
    topicKey: 'sync-vs-async',
    title: 'Senkron mu Asenkron mu: Kod Neden Bekler (ya da Beklemez)',
    question: 'Senkron programlama ile asenkron programlama arasındaki fark nedir?',
    summary:
      'Senkron kod bir kerede tek iş yapar, her adım bitene dek bloke olur; asenkron kod yavaş bir işi başlatıp devam edebilir ve sonucu sonradan ele alır. Asenkron, ağlar ve dosyalar gibi yavaş şeyleri beklerken programları yanıt verir tutar.',
    tags: ['programlama', 'asenkron', 'eşzamanlılık', 'temel kavramlar'],
    language: 'tr',
    image: {
      prompt: promptOf('sync-vs-async'),
      alt: 'Tek bir tencereyi boşuna bekleyen bir aşçı ile hazır oldukça birkaç tencereye bakan bir aşçının karşılaştırması',
    },
    sources: [
      { title: 'MDN — Asenkron JavaScript’e giriş', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing' },
    ],
    content: `# Senkron mu Asenkron mu: Kod Neden Bekler (ya da Beklemez)

Bu ayrım, **bir programın beklerken ne yaptığıyla** ilgilidir. **Senkron** kod tek seferde bir adım çalışır ve her adım bir sonrakine başlamadan önce *tamamen bitmelidir* — bir adım yavaşsa, ardındaki her şey bekler. **Asenkron** kod yavaş bir işi *başlatabilir*, kenara koyabilir ve başka yararlı işler yapmaya devam edebilir, sonucu hazır olduğunda ele alır. Bu fark hızlı işlemler için pek önemli değildir ve yavaş olanlar için son derece önemlidir — ağ çağrıları, dosya okumaları, veritabanı sorguları — ki bunlar tam da programların boşta geçirdiği zamanın çoğunu harcadığı yerdir.

## Mutfak benzetmesi

Kahvaltı hazırladığınızı düşünün. **Senkron** bir aşçı ekmeği tost makinesine koyar ve sonra kahveyi başlatmadan önce, başka hiçbir şey yapmadan *orada durup ona bakar* fırlayana kadar. Toplam süre: tüm bekleme dahil, her adımın art arda toplamı.

**Asenkron** bir aşçı tostu başlatır ve *o kızarırken* kahveyi başlatır ve *o demlenirken* yumurtaları kırar — hangisi biterse ona bakar. Aynı işler, çok daha az toplam süre, çünkü bekleme yararlı işle çakıştı. Aşçı hızlanmadı; yalnızca boşta durmayı bıraktı.

## Gerçek programlar için neden önemli

Bilgisayarlar yavaş şeyleri beklemek için çok zaman harcar: bir sunucunun yanıt vermesi, bir diskin okuması, bir veritabanının yanıtlaması — her biri işlemcinin hızına kıyasla bir sonsuzluk. Bu beklemeler sırasında "bloke olan" senkron kod ardındaki her şeyi dondurur. Bir web sunucusunda, bloke eden bir çağrı, bir yavaş istek bitene kadar onun başka herhangi bir kullanıcıya hizmet veremez hale gelmesine yol açabilir; bir uygulamada ise o korkunç donmuş, yanıt vermeyen arayüzdür.

| | Senkron | Asenkron |
| --- | --- | --- |
| Sıra | Kesinlikle teker teker | Bekleme süreleri çakışabilir |
| Yavaş bir adımda | Her şey bekler (bloke olur) | Diğer işler sürer |
| Sadelik | Okunması ve akıl yürütülmesi daha kolay | Daha karmaşık denetim akışı |
| En uygun olduğu | Hızlı, bağımlı adımlar | Yavaş I/O: ağ, dosyalar, veritabanı |

## Asenkron kodda nasıl ifade edilir

Bunu elle hokkabazlık etmezsiniz — diller araçlar sağlar. Yaygın desenler arasında **geri çağırmalar** (bittiğinde bunu çalıştır), **promise/future** (gelecek bir sonuç için yer tutucu) ve modern **async/await** sözdizimi vardır ki bu, asenkron kodun bloke olmadan kalırken neredeyse senkron kod gibi *okunmasını* sağlar. Anahtar zihinsel model: \`await\` "*bu* görevi burada sonuç hazır olana kadar duraklat ama bu sırada diğer görevlerin çalışmasına izin ver" demektir — "tüm programı dondur" değil.

Ödünleşim gerçektir: asenkron kod yanıt verme açısından daha güçlüdür ama akıl yürütmesi daha zordur (sıralama, hata yönetimi ve paylaşılan durum daha çetrefilli hale gelir). Ustalık, onu beklemenin gerçekten gerçekleştiği yerde kullanmak ve basit, hızlı mantığı senkron tutmaktır.

## SSS

**Asenkron, çok iş parçacıklı/paralel ile aynı mı?**
Şart değil. Asenkron *boşta beklememekle* ilgilidir; tek bir iş parçacığında, görevleri bekleme süreleri boyunca araya sıkıştırarak çalışabilir. Paralellik gerçekten birden çok çekirdekte *aynı anda* iş yapmaktır. İlişkilidirler ama farklıdırlar — asenkron beklemeyi çakıştırır, paralellik işi çakıştırır.

**Asenkron kodumu daha hızlı mı çalıştırır?**
İşin kendisini hızlandırmaz; beklerken zaman israfını durdurur, verimi ve yanıt vermeyi iyileştirir. Beklemesiz, CPU yoğun işler için tek başına asenkron pek az fayda sağlar — orada paralellik yardım eder.

**Asenkron kod neden bu kadar daha kafa karıştırıcı görünüyor?**
Çünkü yürütme artık zaman içinde yukarıdan aşağıya akmaz — işler şimdi başlar ve sonra biter, hatalar sırasız gelir ve "ne" kadar "ne zaman" hakkında da akıl yürütürsünüz. async/await bunun çoğunu evcilleştirir ama altta yatan doğrusalsızlık asıl güçlüktür.`,
  },
  {
    topicKey: 'what-is-docker',
    title: 'Docker Nedir ve Geliştiriciler Konteynerleri Neden Sever?',
    question: 'Docker nedir, konteynerler nedir ve neden bu kadar yaygın kullanılır?',
    summary:
      'Bir konteyner, bir uygulamayı çalışması için gereken her şeyle birlikte tek bir taşınabilir birime paketler, böylece her yerde aynı şekilde davranır — "benim makinemde çalışıyor"u çözer. Konteynerler sanal makinelerden daha hafiftir çünkü ana makinenin işletim sistemi çekirdeğini paylaşırlar.',
    tags: ['programlama', 'docker', 'konteynerler', 'devops'],
    language: 'tr',
    image: {
      prompt: promptOf('what-is-docker'),
      alt: 'Her biri tüm parçalarıyla kendine yeten bir uygulama barındıran, herhangi bir platforma istiflenebilen bir sıra mühürlü konteyner',
    },
    sources: [
      { title: 'Docker — konteyner nedir?', url: 'https://www.docker.com/resources/what-container/' },
    ],
    content: `# Docker Nedir ve Geliştiriciler Konteynerleri Neden Sever?

Docker, **konteynerleri** ana akım yapan araçtır ve konteynerler yazılımın en inatçı baş ağrılarından birini çözer: *"benim makinemde çalışıyor"* — geliştiride sorunsuz çalışan ama başka yerde bozulan kod, çünkü diğer bilgisayarda farklı sürümler, ayarlar veya eksik parçalar vardır. Bir konteyner bunu **bir uygulamayı çalışması için gereken her şeyle birlikte paketleyerek** düzeltir — kod, çalışma zamanı, kütüphaneler, sistem araçları, yapılandırma — mühürlü, taşınabilir tek bir birim içinde, nerede çalışırsa çalışsın aynı davranır. Nakliye konteyneri benzetmesi tamdır: kutuyu standartlaştırın, böylece herhangi bir gemi, vinç veya kamyon içinde ne olduğunu umursamadan onu taşıyabilir.

## Çözdüğü sorun

Yazılım ortamına bağlıdır: belirli bir dil sürümü, belirli kütüphaneler, belirli sistem ayarları. Uygulamayı bir meslektaşın dizüstü bilgisayarına, bir test sunucusuna veya üretime taşıyın, herhangi bir uyumsuzluk onu bozabilir. Tam ortamı her yerde elle yeniden üretmek kırılgan ve çıldırtıcıdır. Bir konteyner ortamı uygulamayla *birlikte* paketler, böylece "ortam" da onunla seyahat eder ve uyumsuzluğa konu olacak hiçbir şey kalmaz. Bir kez derleyin; dizüstü bilgisayarınızda, takım arkadaşınızın makinesinde ve bulutta aynı çalışır.

## Konteynerler ve sanal makineler

Konteynerler sıklıkla, yine yazılımı yalıtan sanal makinelerle (VM’ler) karşılaştırılır — ama ağırlıktaki fark asıl önemli olandır:

| | Sanal makine | Konteyner |
| --- | --- | --- |
| Paketler | Tüm bir konuk işletim sistemi + uygulama | Yalnızca uygulama + bağımlılıkları |
| Paylaşır | Hiçbir şeyi — her biri tam bir OS | Ana makinenin OS çekirdeğini |
| Boyut | Gigabaytlar | Megabaytlar |
| Başlangıç | Dakikalar | Saniyeler veya daha az |
| Yoğunluk | Makine başına birkaç | Makine başına birçok |

Bir VM tüm bir bilgisayarı sanallaştırır, uygulama başına tam bir işletim sistemi taşır — güçlü ama ağır. Bir konteyner ana makinenin OS çekirdeğini paylaşır ve yalnızca onun üzerindekini yalıtır, bu da onu çarpıcı biçimde daha hafif ve başlatması daha hızlı kılar. Yalnızca birkaç VM’nin sığacağı yerde birçok konteyner çalıştırabilirsiniz.

## Geliştiriciler ve operasyon neden sever

- **Tutarlılık** — geliştirme, test ve üretim arasındaki ortam kaymasını ortadan kaldırır. "Benim makinemde çalışıyor" bahanesi ölür.
- **Taşınabilirlik** — aynı konteyner imajı, her büyük bulut dahil, bir konteyner çalışma zamanı olan herhangi bir makinede çalışır.
- **Yalıtım** — her konteyner kendine yeterlidir, böylece çakışan bağımlılıkları olan uygulamalar tek bir ana makinede barış içinde bir arada bulunur.
- **Hız ve yoğunluk** — hafif başlangıç, onları ölçeği büyütüp küçültmek ve sunuculara verimli biçimde istiflemek için ideal kılar.
- **Modern altyapının temeli** — konteynerler, onları ölçekte çalıştıran mikroservislerin ve orkestrasyon sistemlerinin (Kubernetes gibi) yapı taşıdır.

## SSS

**Docker ile konteyner aynı şey mi?**
Tam olarak değil — konteynerler kavram/teknolojidir; Docker onları derleyip çalıştıran popüler araç takımıdır. Başka araçlar da var ama Docker bu iş akışını ve imaj biçimini yaygınlaştırdı.

**Konteynerler sanal makinelerin yerini alır mı?**
Çoğu zaman, ama her zaman değil — sıklıkla *birlikte* kullanılırlar (bulutta VM’lerin içinde çalışan konteynerler). VM’ler daha güçlü yalıtım ve farklı işletim sistemleri çalıştırma için hâlâ önemlidir; konteynerler hafiflik ve hızda kazanır.

**Konteyner bir güvenlik sınırı mıdır?**
Yalıtım sağlar ama bir VM’ninkinden daha zayıftır, çünkü konteynerler ana makine çekirdeğini paylaşır. Çoğu kullanım için yeterlidir; düşmanca, çok kiracılı iş yükleri için ekipler ek sertleştirme ekler veya VM’lerle birleştirir.`,
  },
  {
    topicKey: 'big-o-notation',
    title: 'Big-O Gösterimi: Matematik Baş Ağrısı Olmadan',
    question: 'Big-O gösterimi nedir ve programcılar neden onu önemser?',
    summary:
      'Big-O, bir algoritmanın işinin girdi büyüdükçe nasıl arttığını tanımlar — kesin hızını değil, ölçeklenme davranışını. Bir yaklaşımın milyonlarca öğede hızlı kalmasının, başka birinin tıkanmasının nedeni budur ve doğru yaklaşımı seçmeye rehberlik eder.',
    tags: ['programlama', 'algoritmalar', 'bilgisayar bilimi', 'performans'],
    language: 'tr',
    image: {
      prompt: promptOf('big-o-notation'),
      alt: 'Ortak bir başlangıçtan yükselen, düzden neredeyse dikeye doğru ıraksayan birkaç parlak büyüme eğrisi',
    },
    sources: [
      { title: 'Khan Academy — Asimptotik gösterim', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation' },
    ],
    content: `# Big-O Gösterimi: Matematik Baş Ağrısı Olmadan

Big-O gösterimi göz korkutan bir matematik gibi geliyor ama fikir basit ve pratiktir: **bir algoritmanın yaptığı iş miktarının girdi büyüdükçe nasıl arttığını** tanımlar. Kesin süreleri (donanıma bağlı olanları) kasıtlı olarak yok sayar ve büyümenin *şekline* odaklanır. Ölçekte asıl önemli olan da budur: 100 öğede sorunsuz olan bir algoritma, 10 milyon öğede bir saniyenin kesri kadar sürebilir ya da bir hafta sürebilir, ve Big-O bunu siz acı yoldan öğrenmeden önce hangisi olduğunu söyler.

## Neden "nasıl büyüdüğü", "ne kadar hızlı"yı yener

Gerçek çalışma süresi makineye, dile, güne bağlıdır. Big-O bunu sıyırır ve *ölçeklenme davranışını* karşılaştırır — çünkü büyümeye dayanan odur. Küçük girdilerde iki kat daha hızlı ama büyümesi daha kötü bir yaklaşım, veri büyüdükçe felaketle kaybeder. Big-O’nun yanıtladığı soru "ne kadar sürer?" değil, "**girdi 10 kat veya 1000 kat büyüdüğünde ne olur?**" — yani yazılımınızın gelecek yıl hâlâ çalışıp çalışmayacağına karar veren soru.

## Yaygın sınıflar, sade dille

\`n\`'i girdinin boyutu (öğe sayısı) olarak düşünün:

| Big-O | Ad | Sade anlamı | Örnek |
| --- | --- | --- | --- |
| O(1) | Sabit | Boyuttan bağımsız aynı iş | Bir öğeye dizinle erişmek |
| O(log n) | Logaritmik | Çok yavaş büyür; her adımda yarıya iner | Sıralı veride ikili arama |
| O(n) | Doğrusal | İş girdiyle aynı oranda büyür | Bir listeyi bir kez taramak |
| O(n log n) | Doğrusal-logaritmik | Doğrusaldan biraz kötü | İyi sıralama algoritmaları |
| O(n²) | Karesel | İş patlar; her öğe her öğeye karşı | Tüm çiftleri karşılaştırmak (naif) |
| O(2ⁿ) | Üstel | Felaket; eklenen her öğede ikiye katlanır | Tüm kombinasyonları kaba kuvvetle denemek |

Ölçekte uçurum hayret vericidir. Bir milyon öğe için, bir O(n) algoritması ~1 milyon adım yapar; bir O(n²) ~1.000.000.000.000 — anlık ile fiilen asla arasındaki fark. İşte bu yüzden bir döngünün içine gizlenmiş bir O(n²) yaklaşımı klasik bir performans felaketidir, ve işte bu yüzden bir O(n log n) veya O(n) alternatifi bulmak umutsuz bir programı hızlı kılabilir.

## Pratikte nasıl kullanılır

İspat türetmeniz gerekmez. Pratik beceri **desenleri tanımaktır**: veri üzerinde tek bir döngü genellikle O(n)’dir; aynı veri üzerinde bir döngü içinde bir döngü çoğu zaman O(n²)’dir — yeniden düşünmeniz gereken bir kırmızı bayrak; sorunu tekrar tekrar yarıya indirmek O(log n)’i ima eder. Bir şey büyük girdilerde yavaş olduğunda, Big-O düşüncesi sizi suçluya (çoğu zaman kazara bir iç içe döngü veya yavaş bir arama) ve çözüme (daha iyi bir veri yapısı veya algoritma) yönlendirir. Doğru veri yapısını seçmenin — bir listeyi taramak yerine O(1) aramalar için bir karma tablo — en yüksek kaldıraçlı performans kararlarından biri olmasının nedeni de budur.

## SSS

**Daha düşük bir Big-O her zaman daha hızlı mı demektir?**
Küçük girdiler için değil — Big-O büyümeyi tanımlar, sabitleri yok sayar, bu yüzden "daha kötü" bir sınıf minik veride kazanabilir. En çok girdi büyüdükçe önemlidir; bir avuç öğe için sadelik çoğu zaman teorik en iyiliği yener.

**En iyi, ortalama ve en kötü durum arasındaki fark nedir?**
Bir algoritma girdiye göre farklı davranabilir (örneğin önceden sıralanmış ile rastgele). Big-O çoğu zaman bir garanti olarak en kötü durumu belirtir ama pratikte ortalama durum sıklıkla daha önemlidir.

**Big-O yalnızca hızla mı ilgili?**
Hayır — **bellek** büyümesini de tanımlar (alan karmaşıklığı). Bir algoritma hızlı olabilir ama belleği girdiyle kötü büyüyebilir; bir yaklaşım seçerken her iki boyut da önemlidir.`,
  },
  {
    topicKey: 'what-is-caching',
    title: 'Önbellekleme Nedir ve Neden Her Yerde?',
    question: 'Önbellekleme nedir, nasıl çalışır ve performans için neden bu kadar önemlidir?',
    summary:
      'Bir önbellek, verinin kopyalarını daha hızlı ulaşılabilen bir yerde saklar, böylece tekrarlayan istekler yavaş özgün kaynağı atlar. Bilişimin en güçlü hız hilelerinden biridir — her katmanda kullanılır — ve en zor sorunu kopyanın ne zaman bayatladığını bilmektir.',
    tags: ['programlama', 'önbellekleme', 'performans', 'sistemler'],
    language: 'tr',
    image: {
      prompt: promptOf('what-is-caching'),
      alt: 'Sık gereken bir öğenin yakındaki bir rafta kısa yolla tutulması ile aynı öğenin uzak bir depoda uzun yolla saklanmasının karşılaştırması',
    },
    sources: [
      { title: 'MDN — HTTP önbellekleme', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching' },
      { title: 'Cloudflare — önbellekleme nedir', url: 'https://www.cloudflare.com/learning/cdn/what-is-caching/' },
    ],
    content: `# Önbellekleme Nedir ve Neden Her Yerde?

Bir önbellek, hızlı bir yerde tutulan bir kopya yığınıdır, böylece her seferinde yavaş bir yerden getirmek zorunda kalmazsınız. İlke sezgiseldir: sürekli aynı kitaba uzanıyorsanız, her seferinde kütüphaneye yürümek yerine onu masanızda tutarsınız. Bilişimde "kütüphane" bir veritabanı, uzak bir sunucu veya yavaş bir disk olabilir ve "masanız" yakındaki daha hızlı bellektir. Önbellekleme, **tüm bilişimdeki en evrensel performans tekniklerinden biridir** — neredeyse her katmanda bulunur — çünkü hızlı ve yavaş depolama arasındaki hız farkları devasadır ve çoğu sistem aynı şeyleri tekrar tekrar ister.

## Neden bu kadar iyi işler

İki gerçek önbeklemeyi son derece kârlı kılar. Birincisi, **hız farkları çok büyüktür**: bellekten okumak diskten veya bir ağ üzerinden okumaktan binlerce kat daha hızlı olabilir. İkincisi, **erişim tekrarlayıcıdır**: programlar ve kullanıcılar aynı veriyi tekrar tekrar isteme eğilimindedir (popüler video, oturum açmış kullanıcının profili, ana sayfa). Sık istenen öğeleri yakın tutun, böylece isteklerin büyük çoğunluğu hızla karşılanır, yalnızca arada bir yavaş yolun bedeli ödenir. Az miktarda "sıcak" veriyi önbelleğe almak bile trafiğin çoğuna hizmet edebilir.

## Önbellekleme her katmandadır

Görünmez biçimde çalışan önbelleklerle çevrilisiniz:

| Önbellek | Neyi hızlandırır |
| --- | --- |
| CPU önbelleği | İşlemcinin veriye ana bellekten daha hızlı erişmesi |
| Tarayıcı önbelleği | Görselleri/betikleri yeniden indirmeden siteleri yeniden yüklemek |
| CDN (içerik dağıtım ağı) | Site içeriğini dünyanın öbür ucundan değil, size yakın bir sunucudan sunmak |
| Uygulama/bellek-içi önbellek (örneğin Redis) | Tekrarlayan veritabanı sorgularından kaçınmak |
| Veritabanı önbelleği | Son sorguların sonuçlarını yeniden kullanmak |
| DNS önbelleği | Tekrarlayan adres aramalarını atlamak |

Tek bir sayfa yüklemesi, üst üste yığılmış yarım düzine önbellekten yararlanabilir — işte bu yüzden bir siteye ikinci ziyaret birincisinden çok daha hızlıdır.

## Zor kısım: bir kopyanın ne zaman bayatladığını bilmek

Önbeklemenin ünlü zorluğu kopya saklamak değil — bir kopyanın **ne zaman güncelliğini yitirdiğini** bilmektir. Özgün veri değişir ama önbellek hâlâ eski kopyayı sunarsa, kullanıcılar yanlış bilgi görür (çoktan değişmiş bir fiyat, güncellenmiş bir profil). Bu "önbellek geçersizleştirme"dir, bilgisayar biliminin iki en zor sorunu hakkındaki ünlü bir programlama şakasının yarısıdır. Sistemler bunu şu stratejilerle yönetir: **süre dolumu** (kopyalar belirli bir süre yaşar, sonra yenilenir), **geçersizleştirme** (kaynak değiştiğinde kopyayı etkin biçimde temizleme) ve **nihai tutarlılığı** kabul etme (hız için kısa süreli bayatlığa tolerans gösterme). Verinin ne kadar taze olması gerektiğine — ne kadar hızlı olmasına karşı — karar vermek, önbellemenin temel ödünleşimidir.

## SSS

**Neden her şeyi sonsuza dek önbelleğe almıyoruz?**
Çünkü veri değişir ve bayat kopyalar hatalara yol açar; ayrıca önbelleklerin sınırlı alanı vardır, bu yüzden daha az kullanılan öğeleri tahliye ederler. Önbellekleme kusursuz tazeliği hız karşılığında takas eder — biraz eski olması güvenli olanı önbelleğe alırsınız.

**"Önbelleği temizle" neyi düzeltir?**
Kaynaktan taze kopyaları zorlar. Bir site bozuk veya güncelliğini yitirmiş göründüğünde, tarayıcınız bayat önbellek dosyaları gösteriyor olabilir; temizleme onun güncel sürümleri yeniden getirmesini sağlar.

**Önbellekleme hatalara yol açabilir mi?**
Evet — bayat veri sunmak klasik olanıdır. "Güncellenmiyor!" sorunlarının şaşırtıcı bir kısmı, zincirin bir yerinde eski kopyaları tutan önbelleklerdir. Güçlüdür ama gerçekten ince sorunların bir kaynağıdır.`,
  },
];
