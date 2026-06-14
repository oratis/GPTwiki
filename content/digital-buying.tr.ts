import type { DraftArticle } from './types';
import { digitalBuyingEn } from './digital-buying.en';

// Batch: Digital Buying Decisions (Türkçe özgün sürüm). digital-buying.en.ts
// ile aynı başlıklar ve aynı topicKey; Türk okuyucunun satın alma bağlamına
// göre özgün olarak yazıldı. Görseller ortak kullanılır.

const promptOf = (key: string): string => {
  const hit = digitalBuyingEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const digitalBuyingTr: DraftArticle[] = [
  {
    topicKey: 'oled-vs-lcd',
    title: 'OLED mi LCD mi: Hangi Ekran Gerçekten Daha İyi?',
    question: 'OLED ile LCD ekranlar arasındaki gerçek fark nedir ve hangisini almalıyım?',
    summary:
      'OLED her pikseli ayrı ayrı yakar; bu yüzden kusursuz siyah ve sonsuz kontrast verir. LCD ise bir arka aydınlatmayı sıvı kristal katmandan geçirir; daha yüksek sürekli parlaklık sunar ve ekran yanması riski yoktur. Doğru tercih ortama, içeriğe ve bütçeye bağlıdır.',
    tags: ['teknoloji', 'ekranlar', 'oled', 'televizyon alımı'],
    language: 'tr',
    image: {
      prompt: promptOf('oled-vs-lcd'),
      alt: 'Piksel piksel kendi ışığını veren panel ile eşit arka aydınlatmalı panelin karşılaştırması',
    },
    sources: [
      { title: 'RTINGS — OLED ile LED/LCD televizyon karşılaştırma yöntemi', url: 'https://www.rtings.com/tv/learn/led-vs-oled' },
    ],
    content: `# OLED mi LCD mi: Hangi Ekran Gerçekten Daha İyi?

Tüm fark tek bir soruya iner: **her piksel kendi ışığını mı üretir, yoksa bir arka aydınlatmayı mı paylaşırlar?** OLED pikselleri kendinden ışıklıdır; her biri tamamen sönebilen minik bir lambadır. LCD pikselleri ise hiç ışık üretmez; ayrı bir arka aydınlatmanın önündeki, açılıp kapanarak renge yol veren "panjurlardır". Aşağıdaki bütün güçlü ve zayıf yönler bu tek gerçekten doğar.

## OLED neden o görünüme sahip

OLED pikseli tamamen kapanabildiği için **kusursuz siyahı** üretir; koyu gri değil, sıfır ışık. Yanına parlak bir yıldız koyduğunuzda kontrast neredeyse sonsuz olur. Bu, OLED'in ünlü mürekkep gibi derin, üç boyutlu görünümünü ve piksel düzeyinde hassasiyeti getirir: koyu zeminde parlak nesnelerin etrafında sızan bir ışık halesi olmaz (LCD'lerin boğuştuğu "çiçeklenme"). Pikseller durumlarını da neredeyse anında değiştirir; bu da mükemmel hareket netliği sağlar.

Bedeli de aynı ölçüde fizikseldir: OLED, tam beyaz bir ekranda en iyi LCD'ler kadar göz alıcı parlaklığa ulaşamaz; ayrıca organik malzeme kullanımla yaşlandığı için *aynı* sabit öğeyi (haber bandı, kanal logosu, görev çubuğu) binlerce saat göstermek **ekran yanması** riski taşır; soluk, kalıcı bir hayalet iz. Modern paneller bunu agresif biçimde hafifletir ve tipik, değişken izleme bunu nadiren tetikler; ama sabit içeriğin ağırlıkta olduğu kullanımda hâlâ gerçek bir husustur.

## LCD neden hâlâ ayakta (ve gelişti)

LCD'nin arka aydınlatması acımasızca parlak olabilir; bu da onu güneşli odalarda ve tam ekran HDR vurgularında daha iyi bir oyuncu yapar. Ekran yanmasına dönüşmez ve her boyutta daha ucuzdur. Doğuştan zayıf yanı olan kusurlu siyahlar (arka aydınlatma "kapalı" piksellerden sızdığı için) **yerel karartma** ile daraltıldı: arka aydınlatmayı bağımsız kararabilen bölgelere bölmek. Mini-LED bunu binlerce minik bölgeyle daha da ileri taşır; LCD'nin parlaklığını korurken OLED'in kontrastına yaklaşır. Daha çok bölge, daha iyi siyahlar; ama asla OLED'in piksel düzeyindeki denetimine ulaşmaz.

## Hangisini almalı

| Durumunuz | Daha iyi tercih |
| --- | --- |
| Karanlık oda, film ve oyun, kontrast tutkunu | OLED |
| Pencere ve lambalı aydınlık oda | Mini-LED LCD (parlaklık kazanır) |
| Televizyon gün boyu sabit bir kanal logosu gösteriyor; PC saatlerce sabit görev çubuğuyla | LCD (ekran yanması derdi yok) |
| Kısıtlı bütçe ya da çok büyük boyut | LCD |
| En iyi piksel düzeyinde görüntüyü isteyen, biraz özen göstermeye razı | OLED |

## SSS

**Ekran yanması hâlâ vazgeçirici bir etken mi?**
Karışık izleme için (film, spor, çeşitli oyunlar) yerleşik korumalara sahip güncel panellerde olması çok düşük ihtimaldir. Günde 8 saat aynı sabit arayüz için ise LCD, uzun vadede daha güvenli bir bahistir.

**Peki QLED, bu üçüncü bir tür mü?**
Hayır. QLED, rengi ve parlaklığı iyileştiren bir kuantum nokta filmine sahip bir LCD'dir. Hâlâ arka aydınlatmalı bir LCD'dir; OLED gibi kendinden ışıklı bir panel değildir.

**OLED daha az mı güç tüketir?**
İçeriğe bağlıdır: karanlık sahneler az tüketir (sönük pikseller bedavadır), ama tam parlak bir ekran verimli bir LCD'den daha fazla çekebilir. Basit bir kazanan yoktur.`,
  },
  {
    topicKey: 'noise-cancelling',
    title: 'Gürültü Önleyici Kulaklıklar Gerçekte Nasıl Çalışır?',
    question: 'Gürültü önleyici kulaklıklar nasıl çalışır ve aktif ile pasif arasındaki fark nedir?',
    summary:
      'Aktif gürültü önleme, gelen sesi dinlemek için mikrofon kullanır ve onu yok eden ters bir dalga çalar; motor gibi düzenli alçak uğultuda harikadır, ani seslerde zayıftır. Pasif yalıtım ise sesi yalnızca fiziksel olarak engeller.',
    tags: ['teknoloji', 'kulaklıklar', 'ses', 'gürültü önleme'],
    language: 'tr',
    image: {
      prompt: promptOf('noise-cancelling'),
      alt: 'Gelen testere dişli ses dalgasının ayna görüntüsüyle buluşup düzleşmesi',
    },
    sources: [
      { title: 'RTINGS — kulaklık ses yalıtımı testi', url: 'https://www.rtings.com/headphones/tests/isolation/noise-isolation' },
    ],
    content: `# Gürültü Önleyici Kulaklıklar Gerçekte Nasıl Çalışır?

Dünyayı sessizleştirmenin birbirinden tamamen farklı iki yolu var ve iyi kulaklıkların çoğu ikisini birden kullanır. **Pasif yalıtım** sadece fiziktir: kulak tıkacı gibi sesi fiziksel olarak dışarıda tutan kulak yastıkları ve uçlar. **Aktif gürültü önleme (ANC)** ise zekice bir elektroniktir: bir mikrofon kulağınıza ulaşan gürültüyü dinler ve kulaklık onu yok etmek için *tam tersi* ses dalgasını üretir. Hangisinin neyi yaptığını anlamak, ANC'nin uçakta neden büyülü, ağlayan bir bebeğe karşı neden işe yaramaz hissettirdiğini açıklar.

## Aktif önlemenin arkasındaki numara

Ses bir basınç dalgasıdır. Tam ayna görüntüsü olan ikinci bir dalga çalarsanız (her tepe bir çukurla eşleşir) ikisi toplandığında neredeyse hiçe iner. Buna yıkıcı girişim denir. ANC kulaklıkları minik mikrofonlarla gelen gürültüyü örnekler, tersini hesaplar ve müziğinizle aynı sürücülerden gerçek zamanlı olarak çalar.

İşin püf noktası *zamandır*. Kulaklık, ses değişmeden önce ölçmeyi, hesaplamayı ve karşı dalgayı yaymayı bitirmek zorundadır. Bu, **düzenli, alçak frekanslı, öngörülebilir** gürültü için kusursuz çalışır; bir jet motorunun uğultusu, bir trenin gürültüsü, bir klimanın vızıltısı; çünkü bir sonraki an bir öncekine benzer. **Ani, yüksek frekanslı, öngörülemez** ses için ise kötü çalışır; yakındaki bir konuşma, havlayan bir köpek, çarpan bir kapı; çünkü sistem tepki verdiğinde ses çoktan değişmiştir. ANC'nin motor gürültüsünü susturup yan masadaki sohbete neredeyse hiç dokunamamasının nedeni budur.

## İş bölümü

| Tehdit | Esasen şununla halledilir | Neden |
| --- | --- | --- |
| Jet motoru, tren, klima vızıltısı | Aktif (ANC) | Alçak, düzenli, öngörülebilir; aynalanması kolay |
| Ofis gürültüsü, sesler | Pasif yalıtım | ANC'nin izleyemeyeceği kadar hızlı/değişken |
| Ani patlamalar | İkisi de iyi değil | Öngörülemez geçişler ikisini de yener |
| Rüzgâr | Çoğu zaman ANC'yle kötüleşir | Rüzgâr mikrofonlara doğrudan gürültü olarak çarpar |

Yüksek frekanslar aslında iyi bir *fiziksel* yalıtımla ANC'den daha iyi engellenir; bu yüzden oturma ve yalıtım muazzam önem taşır; sızdıran bir yalıtım her iki yöntemi de baltalar.

## Satın alırken nelere bakmalı

Önce **oturuşu ve yalıtımı** önceliklendirin (kulağınıza uyan kulak içi uçlar ya da kulağı tamamen saran üst kulaklık yastıkları); ANC kalitesi en çok *alçak frekans derinliğinde* ve *cızırtının yokluğunda* değişir (ucuz ANC kendi soluk beyaz gürültüsünü ekler); ve dışarıyı *içeri* almak için aynı mikrofonları kullanan bir **şeffaf mod** olup olmadığına bakın; kulaklığı çıkarmadan anonsları ya da konuşmaları duymak için kullanışlıdır.

## SSS

**ANC ses kalitesine zarar verir mi?**
İyi modern kulaklıklarda ihmal edilebilir düzeyde. Ucuz olanlarda cızırtı ekleyebilir ya da tonu hafifçe değiştirebilir. Daha sessiz arka plan, algılanan ayrıntıyı genellikle ANC'nin bozduğundan daha çok iyileştirir.

**ANC kulaklarıma zarar verir veya baş ağrısı yapar mı?**
Önlemenin kendisi zararsızdır, ama bazı insanlar sürekli alçak frekans işlemesinden basınca benzer bir his duyar. Kişiseldir; şeffaf mod ya da farklı bir model genelde çözer.

**Pahalı ANC, ucuza göre değer mi?**
Sık uçanlar ve toplu taşıma kullananlar için evet; alçak frekans önlemesi ve cızırtısız performanstaki fark gerçektir. Ara sıra sessizlik için iyi yalıtan pasif bir kulaklık yeterli olabilir.`,
  },
  {
    topicKey: 'phone-battery-mah',
    title: 'Telefon Pil Ömrü Neden Yalnızca mAh Meselesi Değil?',
    question: 'Aynı mAh pile sahip iki telefonun pil ömrü neden tamamen farklı oluyor?',
    summary:
      'mAh yalnızca bir pilin ne kadar şarj tuttuğunu ölçer. Gerçek pil ömrü, bu kapasitenin onu tüketen her şeye bölünmesidir; yonga verimliliği, ekran boyutu ve parlaklığı, yazılım ve sinyal. Bu yüzden küçük bir pil kolaylıkla daha uzun gidebilir.',
    tags: ['teknoloji', 'akıllı telefonlar', 'pil', 'satın alma tavsiyesi'],
    language: 'tr',
    image: {
      prompt: promptOf('phone-battery-mah'),
      alt: 'Tek bir ışık deposunun, onu farklı hızlarda tüketen çeşitli tüketicileri beslemesi',
    },
    sources: [
      { title: 'DXOMARK — akıllı telefon pil test protokolü', url: 'https://www.dxomark.com/category/smartphone-reviews/' },
    ],
    content: `# Telefon Pil Ömrü Neden Yalnızca mAh Meselesi Değil?

İki telefon da 5.000 mAh pil reklamı yapıyor, ama biri akşam yemeğine kadar ölüyor, diğeri ise rahatça ikinci güne giriyor. Sayı yalan söylemiyordu; sadece yanlış soruya yanıt veriyordu. **mAh deponun büyüklüğünü ölçer, kat edilen yolu değil.** Pil ömrü, depo büyüklüğünün tüketime *bölünmesidir* ve tüketim telefonlar arasında muazzam değişir. Yalnızca mAh'a bakarak telefon almak, motoru görmezden gelip yakıt deposunun boyutuna bakarak araba almak gibidir.

## Aslında önemli olan denklem

Kabaca: **pil ömrü ≈ kapasite ÷ güç çekişi.** Kapasite (mAh, daha doğrusu watt-saat) bir terimdir. Diğeri ise onu tüketen her şeydir:

- **Yonga verimliliği.** İşlemcinin üretim süreci ("nanometre" düğümü) aynı iş için ne kadar güç içtiğini muazzam ölçüde etkiler. Daha yeni, daha verimli bir yonga her miliamper başına daha fazla iş yapabilir; bazen ham kapasite farkını tamamen aşar.
- **Ekran.** Genellikle tek başına en büyük tüketim kalemidir. Daha büyük, daha parlak, daha yüksek yenileme hızlı (120Hz) bir ekran; daha küçük, daha sönük, 60Hz bir ekrandan çok daha fazla yakar. Büyük ekranlı telefonların başa baş gitmek için bile büyük pile ihtiyaç duymasının nedeni budur.
- **Yazılım optimizasyonu.** İşletim sisteminin arka plan uygulamalarını ne kadar agresif uyuttuğu, boştaki tüketimi nasıl kıstığı ve uyanmaları nasıl yönettiği, gün boyu dayanıklılığı çarpıcı biçimde değiştirebilir; aynı donanım, iyi ayarlanmış ile ayarlanmamış yazılım altında farklı dayanır.
- **Telsizler ve sinyal.** Zayıf hücresel sinyal telefonu daha yüksek sesle "bağırmaya" zorlar (daha çok güç); 5G, 4G'den fazla çekebilir; sürekli açık bağlantı birikir.

## Küçük bir pilin neden bazen kazandığı

Küçük bir pili verimli bir yonga, mütevazı bir ekran ve iyi ayarlanmış bir yazılımın arkasına koyun; güç oburu bir ekran ve gevşek optimizasyonla aşağı çekilen daha büyük bir pilden daha uzun dayanır. Teknik tablodaki 4.500 mAh, 5.000 mAh rakibini gerçekten yenebilir. Dürüst gösterge mAh sayısı değildir; **bağımsız incelemecilerin standartlaştırılmış testlerde ölçtüğü ekran açık kalma süresidir**; bu, tüm gizli değişkenleri karşılaştırılabilir tek bir sonuca katlar.

## Satın almadan önce neyi kontrol etmeli

| Şuna güvenme | Bunun yerine şuna güven |
| --- | --- |
| Tek başına mAh sayısı | İncelemecilerin ölçtüğü ekran açık kalma süresi / pil dayanıklılık puanları |
| "Daha büyük pil = daha uzun ömür" | Pilin yonga verimliliği ve ekranla eşleşmesi |
| Şarj cihazı vatını "pil ömrü" sanmak | Şarj hızı ile pil ömrü farklı şeylerdir |

Şarj hızı (vat) da ayrı bir konudur: bir telefon hem hızlı şarj olup *hem de* hızlı ölebilir. "30 dakikada dolar" ile "tüm gün dayanır"ı birbirine karıştırmayın.

## SSS

**Daha çok mAh hiç kötü olur mu?**
Daha büyük piller ağırlık ve kalınlık ekler ve dolması daha uzun sürer. "Rahatça tüm gün"ün ötesinde, daha fazla kapasitenin değeri daha hafif bir telefona kıyasla azalır.

**Pil ömrüm neden birkaç yılda kötüleşiyor?**
Lityum piller kimyasal olarak yaşlanır; her şarj döngüsüyle maksimum kapasitesini kaybeder; tipik olarak birkaç yüz tam döngüden sonra yaklaşık %80 tutar. Depo zamanla fiziksel olarak küçülür.

**5G gerçekten pile zarar verir mi?**
Verebilir, özellikle telefonun ağlar arasında dolaştığı düzensiz 5G kapsamalı bölgelerde. Birçok telefon, 5G hızı gerekmediğinde güç korumak için 4G/LTE'ye kısıtlamaya izin verir.`,
  },
  {
    topicKey: 'ssd-vs-hdd',
    title: 'SSD mi HDD mi: Fark Nedir ve Hangisine İhtiyacınız Var?',
    question: 'SSD ile sabit disk arasındaki fark nedir ve hangisini seçmeliyim?',
    summary:
      'SSD verileri hareketli parçası olmayan flash bellek yongalarında saklar; çok daha hızlı, sessiz ve sarsıntıya dayanıklıdır. HDD dönen manyetik plakalar kullanır; daha yavaş ama terabayt başına çok daha ucuzdur. Çoğu insan sistem için SSD, toplu depolama için HDD ister.',
    tags: ['teknoloji', 'depolama', 'ssd', 'bilgisayar alımı'],
    language: 'tr',
    image: {
      prompt: promptOf('ssd-vs-hdd'),
      alt: 'Statik yonga tabanlı depo ile okuma kolu olan dönen plakaların karşılaştırması',
    },
    sources: [
      { title: 'Backblaze — disk güvenilirliği ve depolama istatistikleri', url: 'https://www.backblaze.com/cloud-storage/resources/hard-drive-test-data' },
    ],
    content: `# SSD mi HDD mi: Fark Nedir ve Hangisine İhtiyacınız Var?

Dosyalarınızı saklamanın iki yolu, bir pikabın bir hafıza kartından ayrıldığı kadar köklü biçimde farklıdır. Bir **sabit disk sürücüsü (HDD)** veriyi dönen plakalara manyetik olarak yazar; doğru noktaya savrulan fiziksel bir kol bunu okur; minik, hızlı bir pikap gibi. Bir **katı hal sürücüsü (SSD)** ise veriyi flash bellek yongalarında elektrik yükü olarak saklar; **hiç hareketli parçası yoktur**. Bu mekanik-elektronik ayrımı, ardından gelen her farkı üretir.

## Hız: her gün hissettiğiniz uçurum

SSD'nin fiziksel olarak hareket ettirecek bir şeyi olmadığından veriyi neredeyse anında bulup teslim eder. HDD ise plakanın doğru yere dönmesini ve kolun doğru parçaya ulaşmasını beklemek zorundadır; bilgisayarın sadece açılmak ya da bir uygulama başlatmak için yaptığı binlerce minik okuma boyunca biriken milisaniyeler. Pratikte:

- **Açılış süresi:** SSD saniyeler, HDD bir dakika ya da daha fazla.
- **Uygulama ve dosya açma:** neredeyse anında, gözle görülür gecikmeye karşı.
- **Rastgele erişim** (dağınık küçük dosyalar; gündelik bilgisayar kullanımının gerçek hali): SSD'ler çarpıcı biçimde, çoğu zaman 10-100 kat daha hızlıdır.

Eski bir bilgisayara SSD takmak, mevcut en çarpıcı tek hız yükseltmesidir; bir makineyi başka hiçbir değişiklikten daha çok yenilenmiş hissettirir.

## Ödünleşmeler

| Özellik | SSD | HDD |
| --- | --- | --- |
| Hız | Çok hızlı | Çok daha yavaş |
| Terabayt başına fiyat | Daha yüksek | Çok daha ucuz; toplu için en iyi değer |
| Hareketli parça | Yok | Var; düşme/sarsıntıya açık |
| Gürültü ve ısı | Sessiz, serin | Duyulur dönüş, daha çok ısı |
| Kapasite tavanı (tüketici) | Büyük, tepede daha pahalı | En büyük kapasiteler en ucuzu |
| Arıza biçimi | Çoğu zaman ani, elektronik | Çoğu zaman uyarı sesi verir |

HDD'ler hâlâ **terabayt başına maliyette** kesin biçimde kazanır; bu yüzden toplu depolama (büyük medya kitaplıkları, yedekler, arşivler) onların kalesi olmaya devam eder. SSD'ler hızın ya da dayanıklılığın önemli olduğu her yerde kazanır.

## Çoğu insan için pratik yanıt

İkisini de role göre kullanın:

- **İşletim sistemi ve etkin uygulamalar/dosyalar için SSD** — bilgisayarı hızlı hissettiren budur.
- **Toplu arşivler için HDD (ya da bulut)** — videolar, fotoğraf kitaplıkları, her gün açmadığınız yedekler.

Bir cihazda yalnızca bir tanesi için yer varsa (çoğu dizüstü, tüm telefonlar) onu SSD yapın; hız, gigabayt başına fiyata değer ve toplu veriyi harici ya da bulut depolamaya yıkarsınız. SSD'lerde ayrıca *arabirime* dikkat edin: NVMe (PCIe) SSD'ler eski SATA SSD'lerden birkaç kat hızlıdır; yine de genel kullanımda SATA SSD bile herhangi bir HDD'ye kıyasla anında hissettirir.

## SSS

**Hangisi daha uzun ömürlü / daha güvenilir?**
Bugün ikisi de güvenilirdir. SSD'lerin mekanik olarak aşınacak parçası yoktur ama sınırlı sayıda yazma hakkı vardır (normal kullanımın çok ötesinde). HDD'ler bir düşmeyle ölebilir. Uzun ömür için en önemli şey bir yedeğe sahip olmaktır; herhangi bir tek sürücü arızalanabilir.

**SSD'ler çok fazla yazmadan aşınır mı?**
Bir yazma sınırı vardır, ama tipik kullanıcılar için sürücünün faydalı ömrü içinde fiilen ulaşılmaz. Ağır profesyonel yazma yükleri tek gerçek kaygıdır.

**Daha pahalı bir SSD her zaman daha mı hızlıdır?**
Her zaman anlamlı biçimde değil; bir noktadan sonra NVMe hızları gündelik görevlerin kullanabileceğini aşar. Kapasite ve güvenilirlik sizin için çoğu zaman zirve karşılaştırma sayılarından daha önemlidir.`,
  },
  {
    topicKey: 'megapixels-myth',
    title: 'Daha Çok Megapiksel, Daha İyi Kamera Demek mi?',
    question: 'Daha çok megapiksel daha iyi bir kamera yapar mı ve fotoğraf kalitesi için aslında ne önemli?',
    summary:
      'Megapiksel yalnızca ne kadar büyük basabileceğinizi ya da kırpabileceğinizi belirler; bir noktadan sonra küçük bir sensörde daha fazlası zararlı bile olabilir. Gerçekte gördüğünüz fotoğraflar için sensör boyutu, lens kalitesi ve görüntü işleme çok daha önemlidir.',
    tags: ['teknoloji', 'kameralar', 'fotoğrafçılık', 'akıllı telefonlar'],
    language: 'tr',
    image: {
      prompt: promptOf('megapixels-myth'),
      alt: 'Büyük sensörün bol ışık, minik sensörün ise yalnızca ince bir dilim toplaması',
    },
    sources: [
      { title: 'DXOMARK — kamera ve akıllı telefon görüntü kalitesi testi', url: 'https://www.dxomark.com' },
    ],
    content: `# Daha Çok Megapiksel, Daha İyi Kamera Demek mi?

Pazarlama megapikselleri sever çünkü "daha fazla" gibi duyulan tek bir büyük sayıdır. Ama megapiksel yalnızca dar bir soruya yanıt verir; **görüntüyü kaç nokta oluşturur** ve bu soru çoğu insan için yıllar önce önemli olmaktan çıktı. 12 megapiksellik bir fotoğraf, poster boyutunda basmaya ya da sahip olduğunuz herhangi bir ekranı doldurmaya yetecek kadar ayrıntı zaten tutar. Bir fotoğrafı gerçekten iyi gösteren şeyler başka yerde yaşar.

## Megapikselin kontrol ettiği ve etmediği şeyler

Megapiksel **çözünürlüğü** belirler: ne kadar büyük basabileceğinizi ya da görüntü blok blok olmaya başlamadan içine ne kadar kırpabileceğinizi. Hepsi bu. Renk, az ışık yeteneği, keskinlik ya da bir fotoğrafı "öne çıkaran" o adı zor konan nitelik hakkında hiçbir şey söylemez.

Daha kötüsü, küçük bir sensörde *daha çok* megapiksel ters tepebilir. Aynı minik yongaya daha çok piksel sıkıştırın; her piksel küçülür, daha az ışık yakalar; bu da loş sahnelerde daha çok parazit demektir. 12 MP bir telefonun 48 MP bir telefondan daha temiz gece fotoğrafları çekebilmesinin nedeni budur: daha büyük pikseller, her birine daha çok ışık. (Modern telefonlar "piksel birleştirme" ile karşılık verir; az ışıkta birkaç küçük pikseli daha büyük tek bir sanal piksele birleştirir, böylece çözünürlüğü temizlik karşılığında takas eder.)

## Fotoğraf kalitesini aslında ne belirler

| Etken | Neden önemli | Sade dille etkisi |
| --- | --- | --- |
| **Sensör boyutu** | Daha büyük sensör = toplanan toplam ışık daha çok | 1 numaralı donanım etkeni; daha iyi az ışık, daha hoş arka plan bulanıklığı |
| **Lens kalitesi** | Keskinlik, açıklık (alınan ışık), bozulma | İyi bir sensör kötü bir lensin arkasında ziyan olur |
| **Görüntü işleme** | Yazılım ham ışığı nihai görünüme çevirir | Telefonlarda çoğu zaman belirleyici etken |
| **Piksel boyutu** | Daha büyük pikseller her biri daha çok ışık toplar | Karanlıkta daha temiz görüntüler |
| Megapiksel | Yalnızca çözünürlük / kırpma payı | Yalnızca büyük baskı ya da ağır kırpmanın ötesinde önemli |

En önemli tek donanım gerçeği **sensör boyutudur**: "yalnızca" 24 MP'lik profesyonel bir kameranın 108 MP'lik bir telefonu ezmesinin nedeni budur; sensörü kat kat büyüktür ve çok daha fazla ışık toplar. Özellikle telefonlarda ise **işleme** (hesaplamalı fotoğrafçılık) herhangi bir teknik özellikten daha önemli olabilir; aynı sensöre sahip iki telefonun gözle görülür biçimde farklı fotoğraflar üretebilmesinin nedeni budur.

## Bir kamerayı gerçekte nasıl değerlendirmeli

Megapiksel manşetini görmezden gelin. Bunun yerine: **sensör boyutuna** bakın (çoğu zaman 1/1,3" gibi bir kesir olarak verilir; daha büyük daha iyidir), **örnek fotoğrafları ve bağımsız incelemeleri** kontrol edin; özellikle az ışık ve yakınlaştırma çekimlerini; ve **kullanacağınız özellikleri** tartın (sabitleme, ultra geniş, gerçek ile dijital yakınlaştırma). İncelemecilerin gerçek koşullarda çektiği fotoğrafların kendisi, teknik tablonun sakladığı her şeyi size anlatır.

## SSS

**Yani yüksek megapikselli telefonlar bir kandırmaca mı?**
Hayır; agresif kırparsanız ya da piksel birleştirme esnekliği isterseniz yüksek sayılar gerçekten yardımcı olur. Yalnızca sayının ima ettiği kalite kanıtı değildir.

**Profesyonel kameralar neden telefonlardan az megapiksele sahip?**
Çünkü ham piksel sayısı yerine büyük sensörlerde büyük pikselleri önceliklendirirler. Neredeyse her amaçta piksel başına görüntü kalitesi niceliği yener.

**Kutudaki daha fazla yakınlaştırma daha iyi yakınlaştırma demek mi?**
*Dijital* ile *optik*e dikkat edin. Optik yakınlaştırma (gerçek lens büyütmesi) kaliteyi korur; dijital yakınlaştırma yalnızca kırpıp büyütür, bunu herhangi bir megapiksel taklit edebilir. "100x yakınlaştırma" çoğunlukla dijitaldir ve çoğunlukla bulanıktır.`,
  },
  {
    topicKey: 'wifi-vs-bandwidth',
    title: 'Hızlı İnternet Paketiniz Neden Hâlâ Yavaş Hissettiriyor?',
    question: 'Hızlı bir internet paketi için para ödediğim hâlde WiFi neden yavaş?',
    summary:
      'Satın aldığınız hız evinize giren borudur; WiFi ise onun son birkaç metreyi kat etme biçimidir ve yavaşlığın çoğu bu son sıçramada yaşar. Mesafe, duvarlar, parazit, eski donanım ve kalabalık cihazlar gerçek hızı pakedin çok altına kısar.',
    tags: ['teknoloji', 'wifi', 'internet', 'ev ağı'],
    language: 'tr',
    image: {
      prompt: promptOf('wifi-vs-bandwidth'),
      alt: 'Geniş ışık borusunun daralarak duvarlardan geçen zayıflayan kablosuz dalgalara dönüşmesi',
    },
    sources: [
      { title: 'FCC — geniş bant hızı tüketici rehberi', url: 'https://www.fcc.gov/consumers/guides/getting-broadband-qa' },
    ],
    content: `# Hızlı İnternet Paketiniz Neden Hâlâ Yavaş Hissettiriyor?

"300 megabit" için ödüyorsunuz ama video ara belleğe alıyor ve sayfalar emekliyor. Paket muhtemelen yalan söylemiyor; tıkanıklık neredeyse her zaman internet evinize girdikten *sonra* yaşanır. Bunu iki ayrı yolculuk gibi düşünün: **paket hızı** binanıza ulaşan geniş borudur; **WiFi** ise cihazınıza havadan giden son birkaç metredir. Bu son, görünmez sıçrama, gerçek dünyadaki yavaşlığın çoğunu yaratır ve neredeyse hiç reklamı yapılmaz.

## İki yolculuk, ayrı ayrı

Faturanızdaki sayı evinize gelen bağlantıyı tanımlar (çoğu zaman yönlendiriciye giden kablolu bir hat). Yönlendiriciden sonra cihazlarınız genellikle **WiFi** ile (radyo dalgalarıyla) bağlanır ve radyo dalgaları kırılgandır. Mesafeyle zayıflar, duvarlarca emilir (özellikle beton, tuğla, metal ve su; insan vücudundaki su dahil) ve aynı dalga bantlarında komşular ile cihazlarla yarışır. 300 Mbps'lik bir paket, kabloyla bağlı bir cihaza 300 verirken iki oda ve üç duvar ötedeki bir telefona yalnızca 40 verebilir.

## Olağan suçlular (sıralı)

| Neden | Ne yapar | Çözüm |
| --- | --- | --- |
| **Mesafe ve duvarlar** | Sinyal engeller arasında hızla zayıflar | Yaklaşın; yönlendiriciyi merkezi ve yüksek bir yere koyun |
| **Eski yönlendirici** | Paket yapabilse de modern hızları veremez | Güncel WiFi'ye yükseltin (WiFi 6/6E/7) |
| **2,4 ile 5 GHz bandı** | 2,4GHz uzağa gider ama yavaş; 5GHz hızlı ama kısa | Yakında 5GHz, menzil için 2,4GHz kullanın |
| **Kalabalık dalga bantları** | Komşular/mikrodalgalar/Bluetooth parazit yapar | 5GHz ya da kanal değiştirin |
| **Çok fazla cihaz** | Hepsi tek bir yönlendiricinin ilgisini paylaşır | Mesh sistemi; ağır kullanıcıları kabloyla bağlayın |
| **Pakedin yükleme hızı** | Çoğu zaman indirmeden çok daha düşük | Sancı yüklemeler (görüşmeler, yedekler) mi diye bakın |

En yaygın tek çözüm yalnızca **yönlendirici konumudur**: merkezi, yüksek, açıkta; dolapta, bodrumda ya da televizyonun arkasında değil. Radyo köşelerden ve kapalı alanlardan nefret eder.

## Paket gerçekten sınır olduğunda

Bazen paketi *gerçekten* aşmış olursunuz: aynı anda görüntülü görüşmedeki ve 4K akıştaki birçok kişi küçük bir pakedi gerçekten doldurabilir. Ama yükseltmeden önce test edin; yönlendiricinin yanında **kabloyla bağlanarak** bir hız testi yapın (gerçek paket hızınız) ve **gerçekten kullandığınız yerde WiFi ile** tekrar yapın (gerçek deneyiminiz). Kablolu test pakedi vurup WiFi vurmuyorsa daha hızlı bir paket için ödeme yapmak işe yaramaz; WiFi'yi düzeltmek yarar.

## SSS

**Daha hızlı bir paket yavaş WiFi'yi düzeltir mi?**
Genellikle hayır. Tıkanıklık WiFi'deyse eve giren daha büyük boru yalnızca aynı dar son sıçramaya ulaşır. Önce WiFi'yi düzeltin.

**Mesh sistemi mi yoksa WiFi genişletici mi?**
Bir mesh sistemi (birden çok eşgüdümlü birim) genellikle tek bir genişleticiyi yener; genişletici çoğu zaman hızı yarıya indirir ve ayrı, daha zayıf bir ağ oluşturur. Büyük evler için modern yanıt mesh'tir.

**Cihazları kabloyla bağlamak hâlâ önemli mi?**
Evet; bir kablo (Ethernet) parazitsiz, tam ve kararlı hızı verir. Yer değiştirmeyen bir masaüstü, oyun konsolu ya da televizyon için kabloyla bağlamak mevcut en güvenilir yükseltmedir.`,
  },
  {
    topicKey: 'fast-charging',
    title: 'Hızlı Şarj Pilinize Zarar Verir mi?',
    question: 'Hızlı şarj telefon pilime zarar verir mi ve uzun ömürlü olması için nasıl şarj etmeliyim?',
    summary:
      'Hızlı şarj biraz ısı ve baskı ekler, ama modern telefonlar bunu dikkatle yönetir; bu yüzden gündelik etkisi ölçülüdür. Pilleri en çok ısı ve %100’de bekletmek yaşlandırır; alışkanlıklar şarj hızından daha önemlidir.',
    tags: ['teknoloji', 'piller', 'şarj', 'akıllı telefonlar'],
    language: 'tr',
    image: {
      prompt: promptOf('fast-charging'),
      alt: 'Hızla ışıkla dolan, güvenli sıcaklık bölgesinde serin tutulan bir pil',
    },
    sources: [
      { title: 'Battery University — lityum iyon piller nasıl yaşlanır', url: 'https://batteryuniversity.com/article/bu-808-how-to-prolong-lithium-based-batteries' },
    ],
    content: `# Hızlı Şarj Pilinize Zarar Verir mi?

Kısa yanıt: **hızlı şarj biraz fazladan aşınmaya neden olur, ama internetin korktuğundan çok daha azına; ve ısının yaptığından çok daha azına.** Modern telefonlar körlemesine güç boşaltmaz; şarjı dikkatle orkestre eder ve pil ömrünün en büyük düşmanları çoğu insanın görmezden geldiği şeyler çıkar. Nedenini görmek için bir lityum pilin nasıl yaşlandığını bilmeniz gerekir.

## Lityum piller nasıl yaşlanır

Bir lityum iyon pil iki mekanizmayla aşınır: **döngü yaşlanması** (her tam şarj-deşarj maksimum kapasiteyi yavaş yavaş azaltır) ve **takvim yaşlanması** (zamanla, ısıyla ve yüksek şarjda bekletmeyle hızlanan kimyasal bozulma). Onu en çok iki durum cezalandırır:

- **Isı.** Tek başına en büyük hızlandırıcı. Yüksek sıcaklık hücreyi bozan kimyasal tepkimeleri hızlandırır. Sıcak bir pil, nasıl ısındığından bağımsız olarak hızlı yaşlanır.
- **Uç şarj seviyeleri.** Tam %100'de oturmak (özellikle sıcakken) pile baskı yapar; %0'a düşürmek de öyle. Yumuşak orta (kabaca %20-80) lityumun en mutlu olduğu yerdir.

Hızlı şarj esas olarak *ısı ürettiği* için önemlidir; ama hücreye gerçekte ne kadarının ulaştığı tamamen telefonun tasarımına bağlıdır.

## Modern hızlı şarj neden çoğunlukla sorun değil

Telefonlar edilgen değildir. Şarjı etkin biçimde yönetirler:

- **Hız sabit değildir.** Hızlı şarj pil neredeyse boşken en hızlıdır, sonra dolarken bilinçli olarak yavaşlar; manşetteki "20 dakikada %0-50" hızının çoğu güvenli düşük aralıkta olur, tepeye yakın azalır.
- **Termal yönetim ısıya fren yapar.** Telefon sıcaklığı izler ve fazla ısınırsa şarj gücünü azaltır (ya da duraklatır).
- **Pil sağlığı özellikleri.** Birçok telefon artık rutininizi öğrenir ve gece boyunca %80'de tutar, siz uyanmadan hemen önce %100'e tamamlar; tam şarjda baskı altında geçen zamanı en aza indirir.

Yani telefonunuzla gelen, üreticinin tasarladığı hızlı şarj, hücreyi güvenli sınırlar içinde tutmak için mühendislikle geliştirilmiştir. İyi tasarlanmış bir telefonda hızlı ve yavaş şarj arasındaki gündelik kapasite kaybı farkı gerçektir ama ölçülüdür.

## Şarj hızından daha önemli alışkanlıklar

| Pile iyi gelir | Pile zarar verir |
| --- | --- |
| Serin tutmak | Isınana kadar şarj/oyun; güneş, sıcak arabalar |
| Kabaca %20-80 arasında yaşamak | Sürekli %100 (ya da %0'a boşaltmak) |
| Kaliteli/orijinal şarj cihazları kullanmak | Ucuz, sertifikasız şarj cihazları |
| "Optimize edilmiş şarjı" etkinleştirmek | Yastık altında şarj etmek (ısı hapseder) |

Şarj *hızının* neredeyse hiç görünmediğine dikkat edin; **sıcaklık ve şarj seviyesi başroldedir.** Sıcak bir telefonda %100'de gece boyu oyun oynarken hızlı şarjı dert etmek, deveyi yutup sineği süzmektir.

## SSS

**Pilimi korumak için hızlı şarjdan kaçınmalı mıyım?**
Bunun için tasarlanmış bir telefonda gerekli değil. Nazik olmak isterseniz optimize edilmiş şarj moduyla gece boyunca yavaş şarj edin ve hızlı şarjı hızlı bir takviyeye ihtiyaç duyduğunuz zamanlara saklayın.

**Telefonu bütün gece şarjda bırakmak kötü mü?**
Eskisi kadar değil; telefonlar %100'de güç çekmeyi durdurur ve birçoğu son dolumu geciktirir. Hafif olumsuz yan, %100'de geçen saatlerdir; optimize edilmiş şarj özellikleri tam da bunu hedefler.

**Üçüncü taraf hızlı şarj cihazları pile zarar verir mi?**
Telefonunuzun standardına uyan, saygın ve sertifikalı şarj cihazları sorun değildir. Risk, zayıf düzenlemeli ucuz, sertifikasız birimlerdedir; pahalı bir cihaz için yanlış bir tasarruf.`,
  },
  {
    topicKey: 'refresh-rate',
    title: 'Yenileme Hızı Nedir ve 120Hz Buna Değer mi?',
    question: 'Bir ekranda yenileme hızı (Hz) ne demek ve 120Hz bir ekran için para ödemeye değer mi?',
    summary:
      'Yenileme hızı, bir ekranın saniyede kaç kez yeniden çizdiğidir; 120Hz 60Hz’ten iki kat sık güncellenir ve hareketi ile kaydırmayı gözle görülür biçimde daha akıcı yapar. Oyun ve gündelik his için gerçek, hoş bir yükseltmedir, ama pile ve paraya mal olur.',
    tags: ['teknoloji', 'ekranlar', 'yenileme hızı', 'oyun'],
    language: 'tr',
    image: {
      prompt: promptOf('refresh-rate'),
      alt: 'Hareket eden bir ışık küresinin seyrek adımlar ile yoğun akıcı bir iz olarak karşılaştırması',
    },
    sources: [
      { title: 'RTINGS — monitör yenileme hızı ve hareket testi', url: 'https://www.rtings.com/monitor/tests/motion/refresh-rate-and-motion-blur' },
    ],
    content: `# Yenileme Hızı Nedir ve 120Hz Buna Değer mi?

Hertz (Hz) cinsinden ölçülen yenileme hızı, basitçe **ekranın görüntüsünü saniyede kaç kez yeniden çizdiğidir.** 60Hz'lik bir ekran saniyede 60 kez yenilenir; 120Hz'lik bir ekran 120 kez. Ekrandaki tüm hareket aslında durağan görüntülerden oluşan bir başparmak kitabı (flipbook) olduğundan, saniyede daha çok yenileme aralarındaki sıçramaların daha küçük olması demektir; gözünüz bunu daha akıcı hareket olarak okur. Faydasını adını koyamasanız bile anında hissedebileceğiniz az sayıdaki teknik özellikten biridir.

## Daha çok yenileme neden daha akıcı görünür

Ekranı geçen bir nesne hayal edin. 60Hz'de ekran konumunu yol boyunca 60 kez gösterir; 120Hz'de 120 kez; böylece her adım yarı kadar büyük olur ve hareket daha sürekli, daha az takılır görünür. Etki üç gündelik durumda en belirgindir:

- **Kaydırma** metin ve web sayfaları; bulanık bir kayma yerine harekette akıcı ve okunabilir.
- **Oyun** hızlı aksiyon akıcı görünür ve (onu sürecek donanımla) daha tepkisel hissedebilir.
- **Genel arayüz** animasyonlar, kaydırmalar ve geçişler basitçe "daha hoş" hissettirir; insanlar bunu bir amiral gemisi telefonda nedenini bilmeseler bile anında fark eder.

120Hz'e alıştıktan sonra 60Hz hafifçe takılıyor görünebilir; klasik bir "artık görmezden gelemezsin" yükseltmesi.

## Püf noktaları

| Fayda | Bedel |
| --- | --- |
| Daha akıcı hareket ve kaydırma | Daha yüksek fiyat |
| Daha tepkisel oyun hissi | Daha çok güç tüketir (telefonlar) |
| Üst düzey gündelik his | Bu kareleri gerçekten üretebilen içerik/donanım gerektirir |

İki dürüst uyarı. Birincisi, **pil**: iki kat sık yenilemek güç tüketir; bu yüzden birçok telefon "uyarlanabilir" yenileme sunar; sabit içerik için düşük hızlara iner ve yalnızca gerektiğinde yükselir. İkincisi, **gösterecek kareye ihtiyacınız var**: 120Hz bir ekran ancak bir şey saniyede 120 görüntü üretiyorsa yardımcı olur. Saniyede 45 kare çalışan bir oyun 120Hz bir ekranı doldurmaz; durağan bir fotoğraf herhangi bir yenileme hızında aynı görünür. Ekran *tavandır*, bir garanti değil.

## Buna değer mi?

| Siz… | Karar |
| --- | --- |
| Oyuncuysanız (PC ya da konsol) | Evet; en çok hissedilen yükseltmelerden biri |
| "His"e değer veren bir telefon alıcısıysanız | Evet; kaydırma ve arayüz akıcılığı süreklidir |
| Kısıtlı bütçeyle çoğunlukla video izliyorsanız | Düşük öncelik; film ~24fps'tir ve pek faydalanmaz |
| Pil ömrüne takıntılıysanız | Uyarlanabilir modu kullanın ya da takası tartın |

Çoğu amiral gemisi telefon ve oyun alıcısı için 120Hz, her gün hissedilen gerçek bir iyileşmedir. Esas olarak video ve mesajlaşma için kullanılan giriş seviyesi bir cihazda ise para çoğu zaman başka yere (parlaklık, pil, depolama) daha iyi harcanır.

## SSS

**İnsan gözü 60Hz'in ötesini görebilir mi?**
Evet; çoğu insan 120Hz'e olan akıcılık sıçramasını, özellikle harekette ve kaydırmada, açıkça algılar. Faydalar bunun üstünde de sürer; hızlı oyunlar için azalan getiriyle.

**120Hz bir ekran filmleri daha iyi yapar mı?**
Pek değil; çoğu film ~24fps'de hazırlanır, bu yüzden aynı görünür. Fayda etkileşimli içerikte ve kaydırmadadır, edilgen videoda değil.

**144Hz, 240Hz; 120'ye göre değer mi?**
Rekabetçi oyun için fazladan akıcılık ve tepkisellik yardımcı olur, azalan getiriyle. Telefonlar ve genel kullanım için 120Hz faydanın büyük kısmını zaten yakalar.`,
  },
  {
    topicKey: 'ram-explained',
    title: 'Gerçekte Ne Kadar RAM’e İhtiyacınız Var?',
    question: 'RAM ne işe yarar ve bir telefonda ya da dizüstü bilgisayarda gerçekte ne kadarına ihtiyacım var?',
    summary:
      'RAM cihazınızın kısa süreli çalışma alanıdır; etkin olarak kullandığınız şeyi tutar, böylece işlemci ona anında ulaşır. Daha fazlası aynı anda daha çok şeyi idare etmenizi sağlar, ama kullandığınızın ötesinde fazla RAM boşta durur. Depolama değildir ve bir hız çarpanı değildir.',
    tags: ['teknoloji', 'bilgisayarlar', 'ram', 'satın alma tavsiyesi'],
    language: 'tr',
    image: {
      prompt: promptOf('ram-explained'),
      alt: 'Etkin işlerin açık olduğu ışıltılı bir çalışma masası ile yanında kapalı bir depolama dolabı',
    },
    sources: [
      { title: 'Crucial — ne kadar RAM gerekir (bellek rehberi)', url: 'https://www.crucial.com/articles/about-memory/how-much-ram-do-i-need' },
    ],
    content: `# Gerçekte Ne Kadar RAM'e İhtiyacınız Var?

RAM (rastgele erişimli bellek), bilgisayarcılıktaki en yanlış anlaşılan teknik özelliktir, çünkü sürekli depolamayla karıştırılır. İşte temiz bir zihinsel model: **depolama dosya dolabınızdır; RAM masanızdır.** Dosya dolabı (SSD/sabit disk) her şeyi tutar, güç kapalıyken bile. Masa (RAM) yalnızca *şu anda üzerinde etkin olarak çalıştığınız* şeyi tutar; işlemcinin onu anında kapabileceği yerde. Daha büyük bir masa aynı anda daha çok şeyi açık tutmanızı sağlar; RAM'in tüm işi budur.

## RAM aslında ne yapar

Bir uygulamayı açtığınızda sistem onu yavaş depolamadan RAM'in hızlı "masasına" yükler; böylece işlemci onunla hızla çalışabilir. Çalışan her uygulama, her tarayıcı sekmesi, işletim sisteminin kendisi; hepsi masa alanı kaplar. Masa dolduğunda sistem yer açmak için şeyleri yavaş depolamaya geri taşımaya başlar ve *işte o* taşıma, yavaşlık olarak hissettiğiniz şeydir: geri döndüğünüzde yeniden yüklenen uygulamalar, çok sayıda sekme altında takılma. Daha çok RAM, daha çok şeyin açık ve anında erişilebilir kalması demektir; yeniden taşıma yok.

RAM'in **olmadığı** iki şey: depolama değildir (güç kapanınca her şeyi unutur; bir çalışma alanıdır, bir kasa değil) ve basit bir hız çarpanı değildir. İş yükünüzün kullandığının ötesine geçmek **hiçbir fayda sağlamaz**; masanın boş bir kısmı daha hızlı çalışmanızı sağlamaz. RAM eklemenin kazancı yalnızca yetersiz kalmayı bıraktığınız noktaya kadar gerçektir.

## Makul miktarlar (2020'lerin ortası itibarıyla)

| Kullanım | Rahat RAM |
| --- | --- |
| Hafif: web, e-posta, video, temel belgeler | 8 GB (kullanılabilir, daralıyor) |
| Yaygın: çok sekme, ofis uygulamaları, hafif çoklu görev | 16 GB; şu anki tatlı nokta |
| Ağır: büyük veri kümeleri, sanal makineler, profesyonel yaratıcı uygulamalar | 32 GB ve üzeri |
| Ciddi oyun | 16-32 GB |
| Telefonlar | Çoğu için 8 GB fazlasıyla yeter; 12 GB rahat bir pay |

Çoğu dizüstü alıcısı için **16 GB akıllı varsayılan değerdir**; asla dokunmayacağınız kapasiteye fazla ödeme yapmadan yıllarca özgürce çoklu görev için yeterli. 8 GB hafif kullanım için hâlâ işe yarar ama giderek kısıtlı hissettirir; 32 GB ise yalnızca gerçekten zorlu iş yükleri altında bedelini hak eder.

## Telefonlar üzerine bir not

Telefon RAM'i benzer biçimde çalışır ama işletim sistemi tarafından daha agresif yönetilir; sığdırmak için arka plan uygulamalarını askıya alır. Rahat bir miktarın ötesinde, daha çok RAM çoğunlukla daha çok uygulamayı arka planda "donmuş" tutar; hoş, ama azalan getiriyle. Bazı telefonlardaki dikkat çekici "16 GB", mobil yazılımın tipik olarak ihtiyaç duyduğunun çok ötesindedir; çoğu zaman hissedilen bir faydadan çok teknik tablo gösterişidir.

## SSS

**Daha çok RAM yavaş bilgisayarımı hızlandırır mı?**
Yalnızca gerçekten yetersiz kalıyorsanız (sürekli disk taşıma, uygulamaların yeniden yüklenmesi). Boşta payınız varsa tıkanıklık başka yerdedir; çoğu zaman eski bir sabit disk, ki orada gerçek çözüm bir SSD'dir.

**Daha hızlı RAM (daha yüksek MHz) buna değer mi?**
Çoğu kullanıcı için pek; kapasite (yeterli GB) hızdan çok daha önemlidir. Hız belirli iş yüklerine (bazı oyunlar, tümleşik grafikler) yardımcı olur ama genel kullanımı dönüştürmez.

**Sonradan RAM ekleyebilir miyim?**
Birçok masaüstünde ve bazı dizüstülerde evet; telefonlarda, ince dizüstülerde ve lehimli tasarımlarda hayır; satın aldığınız miktar kalıcıdır. Yükseltilemediğinde bugün ihtiyacınızdan biraz fazla pay alın.`,
  },
  {
    topicKey: 'usb-c-confusion',
    title: 'USB-C Kabloları Neden Bu Kadar Kafa Karıştırıcı?',
    question: 'Hepsi tıpatıp aynı göründüğü hâlde USB-C kabloları neden bu kadar farklı davranıyor?',
    summary:
      'USB-C yalnızca fişin şeklidir; içindeki değil. Tıpatıp aynı görünen iki kablo şarj gücü, veri hızı ve video desteği bakımından büyük ölçüde farklı olabilir, çünkü konektör standardı ile yetenekleri ayrı şeylerdir.',
    tags: ['teknoloji', 'usb-c', 'kablolar', 'satın alma tavsiyesi'],
    language: 'tr',
    image: {
      prompt: promptOf('usb-c-confusion'),
      alt: 'Tıpatıp aynı görünen konektörlerin çok farklı iç kablolamaları açığa çıkarması',
    },
    sources: [
      { title: 'USB Implementers Forum — USB-C ve sertifikasyon genel bakışı', url: 'https://www.usb.org/usb-c' },
    ],
    content: `# USB-C Kabloları Neden Bu Kadar Kafa Karıştırıcı?

USB-C hakkındaki çıldırtıcı gerçek şu: **konektör yalnızca bir şekildir.** O oval, tersinir fiş, kablonun gerçekte ne *yapabileceği* hakkında hiçbir şey söylemez; yalnızca bağlantı noktasına uyacağını. Tıpatıp aynı görünen, aynı hisseden ve fiyatları büyük ölçüde farklı olan iki kablo, içeride tamamen farklı yeteneklere sahip olabilir. Sektör fişi standartlaştırdı ama arkasındaki güçleri değil ve bu boşluk, kafa karışıklığının tüm kaynağıdır.

## Tek bir şekil, çok sayıda gizli yetenek

USB-C'yi, çok farklı şeylerin geçebileceği standartlaştırılmış bir kapı gibi düşünün. Tıpatıp aynı kapıların ardında belirli bir kablo şunları destekleyebilir:

- **Şarj gücü** bir damladan (bir telefona yeter) bir dizüstüye ve ötesine yetecek kadarına. Yüksek güçlü kablolarda daha kalın iç kablolama bulunur; ince, yalnızca şarj amaçlı bir kablo bir dizüstüyü hiç besleyemeyebilir.
- **Veri hızı** eski, yavaş USB 2.0 hızlarından göz alıcı modern aktarım hızlarına. Şarjı sorunsuz bir kablo dosyaları sürünerek taşıyabilir, çünkü veri ve güç farklı iç telleri kullanır.
- **Video çıkışı** kimi USB-C kabloları görüntü sinyali taşır (bir monitöre) kimisi taşımaz ve dışarıdan farkın hiçbir izi yoktur.

Yani çekmecedeki ucuz kablo telefonunuzu mükemmel şarj edebilir ama bir monitörü süremeyebilir ya da dosyaları hızlı aktaramayabilir; bozuk değil, sadece daha azı için yapılmış.

## Bu neden oldu

USB-C, eski uyumsuz fiş ormanının yerini almak için bilinçli olarak birçok olası özelliği tek bir evrensel konektörden geçirdi. Olumlu yanı her şey için tek bir bağlantı noktası; olumsuz yanı "USB-C fişine sahip olmak" artık yetenekleri söylemiyor; bunlar belirli kablonun ve cihazların hangi alttaki standartları (hangi telleri) uyguladığına bağlı. Markalama işi daha da kötüleştirdi: bağlantı noktasının ardındaki veri standartları defalarca yeniden adlandırıldı, bu yüzden etiketler bile kafa karıştırıyor.

## Yanıp kalmamak için

| Şunu istiyorsanız… | Bunu arayın |
| --- | --- |
| Bir dizüstüyü/yüksek güçlü cihazı şarj etmek | İhtiyacınız olan vata göre derecelendirilmiş bir kablo (örn. 100W / 240W); kalın, kaliteli kablolar |
| Dosyaları hızlı aktarmak | Veri özelliği (örn. "USB 3.2 / USB4 / 10-40 Gbps"), yalnızca "USB-C" değil |
| Bir monitöre bağlanmak | Açık video desteği ("DisplayPort Alt Mode" / Thunderbolt) |
| Sadece güvende olmak | Saygın markalar, sertifikalı kablolar; cihazla gelen kabloyu saklayıp etiketleyin |

İki pratik alışkanlık en çok derdi azaltır: **iyi kabloları etiketli tutmak** (dizüstünüzü şarj eden, kulaklıkla gelen bedavayla değiştirilebilir değildir) ve **saygın markalardan sertifikalı kablolar almak**; sertifikasız yüksek güçlü kablolar yalnızca bir performans değil, gerçek bir güvenlik kaygısıdır.

## SSS

**Telefonum neden bir kabloyla yavaş, başka bir kabloyla hızlı şarj oluyor?**
Yavaş kablo muhtemelen daha az gücü destekliyor ya da hızlı şarj anlaşması için gereken tellerden yoksun. Şarj hızı; kablonun, şarj cihazının *ve* telefonun hepsinin hızlı bir standartta anlaşmasına bağlıdır.

**Thunderbolt, USB-C ile aynı şey mi?**
Thunderbolt, USB-C konektörünü kullanır ama üst düzey bir üst kümedir; en yüksek hızlar, garantili video ve veri. Tüm Thunderbolt bağlantı noktaları USB-C şeklindedir; ama tüm USB-C bağlantı noktaları Thunderbolt değildir.

**Kötü bir kablo cihazıma zarar verebilir mi?**
Kötü yapılmış, sertifikasız yüksek güçlü bir kablo gerçek bir tehlike olabilir. Saygın, sertifikalı kabloların gücü doğru biçimde müzakere edecek güvenlik devreleri vardır; ciddi vat taşıyan her şeyde bu küçük fark değerlidir.`,
  },
];
