import type { DraftArticle } from '../types';

// Turkish (tr) translations of the editorial drafts. Faithful, natural
// translations of the English originals; tags are localized. Built up batch
// by batch.
export const tr: DraftArticle[] = [
  // ── Batch 1: Bilim ve doğa ──
  {
    title: 'Fotosentez',
    question: 'Bitkiler güneş ışığını nasıl besine dönüştürür?',
    summary:
      'Fotosentez; bitkilerin, alglerin ve bazı bakterilerin ışık enerjisini, suyu ve karbondioksiti şeker olarak depolanan kimyasal enerjiye dönüştürdüğü, yan ürün olarak oksijen saldığı süreçtir.',
    tags: ['biyoloji', 'bitkiler', 'enerji', 'kimya', 'bilim'],
    language: 'tr',
    content: `# Fotosentez

Fotosentez, bitkilerin, alglerin ve bazı bakterilerin ışıktan kendi besinlerini üretmesini sağlayan biyokimyasal süreçtir. Dünya'daki neredeyse tüm besin zincirlerinin temelidir ve soluduğumuz oksijenin kaynağıdır.

## Temel tepkime

Basitleştirilmiş biçimde fotosentez, ışık enerjisini kullanarak karbondioksit ve suyu birleştirip glikoz ve oksijen üretir:

\`\`\`
6 CO2 + 6 H2O + ışık enerjisi -> C6H12O6 + 6 O2
\`\`\`

Şeker (glikoz), organizmanın daha sonra büyümek ve metabolizma için kullandığı kimyasal enerjiyi depolar. Oksijen ise atmosfere salınır.

## İki aşama

- **Işığa bağlı tepkimeler.** Tilakoit adı verilen yapıların zarlarında, yeşil pigment **klorofil** ışığı soğurur. Bu enerji su moleküllerini parçalar, oksijeni serbest bırakır ve ATP ile NADPH adlı iki enerji taşıyıcısında yakalanır.
- **Calvin döngüsü (ışıktan bağımsız tepkimeler).** Çevredeki sıvıda (stroma), ATP ve NADPH, karbondioksiti şekere bağlayan bir dizi tepkimeyi besler.

## Neden önemli

Fotosentez havadan karbondioksiti çekip canlı dokuya hapseder; bu da onu küresel karbon döngüsünün ve iklim düzenlemesinin merkezine yerleştirir. Fosil yakıtlar, özünde milyonlarca yıl önce fotosentezle yakalanmış kadim güneş ışığıdır.

## Çeşitlemeler

Sıcak ve kurak iklimlerin bitkileri çoğu zaman uyarlanmış yollar kullanır — **C4** ve **CAM** fotosentezi denir — bunlar su kaybını azaltır ve stres altında verimi artırır. Mısır ve şeker kamışı gibi ürünlerin yakıcı güneş altında neden geliştiğini bu açıklar.`,
  },
  {
    title: 'Su Döngüsü',
    question: 'Su gezegen boyunca nasıl dolaşır?',
    summary:
      'Su döngüsü; buharlaşma, yoğuşma, yağış ve akış yoluyla suyun sürekli hareketidir ve Dünya üzerindeki tatlı suyu yeniden dağıtır.',
    tags: ['yer bilimi', 'su', 'iklim', 'coğrafya', 'bilim'],
    language: 'tr',
    content: `# Su Döngüsü

Su döngüsü, ya da hidrolojik döngü, suyun okyanuslar, atmosfer ve kara arasında durmaksızın nasıl dolaştığını anlatır. Dünya'daki toplam su miktarı neredeyse sabit kalır; döngü onu yalnızca farklı hazneler arasında taşır.

## Ana aşamalar

- **Buharlaşma.** Güneş'in ısısı sıvı suyu — çoğu okyanuslardan — buhara dönüştürür. Bitkiler **terleme** yoluyla nem ekler; ikisi birlikte bazen *evapotranspirasyon* diye anılır.
- **Yoğuşma.** Yükselip soğudukça buhar, küçücük parçacıkların çevresinde yoğuşarak bulutları oluşturur.
- **Yağış.** Damlalar yeterince ağırlaşınca yağmur, kar, ince dolu ya da dolu olarak düşer.
- **Toplanma ve akış.** Su; ırmaklarda, göllerde ve okyanuslarda toplanır ya da toprağa sızarak yer altı sularını besler, en sonunda denize geri döner.

## Hazneler ve kalış süresi

Su her haznede çok farklı süreler geçirebilir — atmosferde günler, ama derin yer altı sularında ya da kutup buzunda binlerce yıl. Bu "kalış süreleri" kirliliğin ya da kuraklığın etkilerinin sistemde ne kadar hızlı yayılacağını belirler.

## Neden önemli

Su döngüsü ekosistemlere ve tarıma tatlı su taşır, havayı ve aşınmayı biçimlendirir, devasa miktarda ısıyı taşıyarak sıcaklığı düzenler. İnsan etkinliği — ırmaklara baraj kurmak, sulak alanları kurutmak ve iklimi ısıtmak — döngünün dengesini bozarak selleri ve kuraklıkları şiddetlendirebilir.`,
  },
  {
    title: 'Levha Tektoniği',
    question: 'Kıtalar neden hareket eder ve depremler neden olur?',
    summary:
      'Levha tektoniği, Dünya\'nın dış katmanının hareketli levhalara bölündüğü ve bu levhaların etkileşimlerinin dağları ve okyanusları oluşturup depremleri ve yanardağları doğurduğu kuramdır.',
    tags: ['yer bilimi', 'jeoloji', 'depremler', 'yanardağlar', 'bilim'],
    language: 'tr',
    content: `# Levha Tektoniği

Levha tektoniği, jeolojinin birleştirici kuramıdır. Dünya'nın sert dış katmanının — **litosfer** — yaklaşık bir düzine büyük ve birkaç küçük levhaya bölündüğünü, bunların altlarındaki daha sıcak, kısmen erimiş kaya üzerinde yavaşça kaydığını açıklar.

## Hareketi ne sağlar

Levhalar, üst mantonun sünek bir katmanı olan **astenosfer** üzerine oturur. Dünya'nın içinden çıkan ısı yavaş bir konveksiyon yaratır; batan yoğun dilimlerin çekişi ("levha çekmesi") gibi kuvvetler levhaları yılda birkaç santimetre — aşağı yukarı tırnakların uzama hızında — hareket ettirir.

## Üç tür sınır

- **Iraksak.** Levhalar birbirinden uzaklaşır ve magma yükselerek yeni kabuk oluşturur — örneğin Orta Atlantik Sırtı boyunca.
- **Yakınsak.** Levhalar çarpışır. Biri diğerinin altına dalabilir (**dalma-batma**), derin çukurlar, yanardağlar ve depremler oluşturur; ya da iki kıta kıvrılarak Himalayalar gibi dağları yükseltir.
- **Dönüşüm (transform).** Levhalar yatay olarak birbirinin yanından kayar — Kaliforniya'daki San Andreas Fayı gibi — gerilim biriktirir ve bu depremlerle boşalır.

## Kanıtlar

Kuram, kıtaların kayması üzerine daha eski fikirlerden doğdu. Birbirine uyan kıyı çizgileri, bugün uzak kıtalardaki aynı fosiller ve okyanus tabanı kayasında donmuş bantlı manyetik desenler, levhaların yüz milyonlarca yıl boyunca yerküreyi yeniden çizdiğini — ve hâlâ çizdiğini — doğruladı.`,
  },
  {
    title: 'İnsan Bağışıklık Sistemi',
    question: 'Vücut hastalıklara karşı kendini nasıl savunur?',
    summary:
      'Bağışıklık sistemi; patojenleri saptayıp etkisizleştirirken vücudun kendi hücrelerini dış tehditlerden ayırt eden, hücrelerden, dokulardan ve moleküllerden oluşan katmanlı bir ağdır.',
    tags: ['biyoloji', 'tıp', 'sağlık', 'insan vücudu', 'bilim'],
    language: 'tr',
    content: `# İnsan Bağışıklık Sistemi

Bağışıklık sistemi, vücudun bakterilere, virüslere, mantarlara ve diğer tehditlere karşı savunma ağıdır. Fiziksel engellerden son derece özgül hücresel yanıtlara dek, üst üste binen katmanlar hâlinde çalışır.

## Doğuştan bağışıklık

İlk savunma hattı hızlı ama geneldir. Deri ve mukus gibi fiziksel engelleri, ayrıca istilacıları yutan **makrofajlar** ve **nötrofiller** gibi hücreleri içerir. İltihap ve ateş, patojenleri yavaşlatmak ve yardım çağırmak için tasarlanmış bu hızlı yanıtın parçasıdır.

## Edinilmiş bağışıklık

Tehdit sürerse, **edinilmiş** sistem hedefli bir saldırı düzenler:

- **B lenfositleri**, **antikorlar** üretir: bir patojenin belirli moleküllerine (antijenler) tutunup onu yok edilmek üzere işaretleyen proteinler.
- **T lenfositleri**, enfekte hücreleri doğrudan öldürür ya da daha geniş yanıtı eşgüdümler.

Çok önemli bir özelliği **bellektir**: enfeksiyondan sonra uzun ömürlü bellek hücreleri kalır, böylece aynı patojen geri dönerse vücut çok daha hızlı yanıt verir. Bu, bağışıklık sistemini bir patojenin zararsız bir biçimi ya da parçasıyla eğiten **aşılamanın** ilkesidir.

## Bir şeyler ters gittiğinde

Sistem "kendi"yi "yabancı"dan ayırt etmek zorundadır. Başarısızlıkları **otoimmün hastalıklara** (kendi dokusuna saldırma), **alerjilere** (zararsız maddelere aşırı tepki) ya da **bağışıklık yetmezliğine** (fazla zayıf yanıt) yol açar. Duyarlılık ile dizginlemeyi dengelemek, biyolojinin en dikkat çekici başarılarından biridir.`,
  },
  {
    title: 'Mitokondri',
    question: 'Mitokondriye neden hücrenin enerji santrali denir?',
    summary:
      'Mitokondri; bir hücrenin kullanılabilir enerjisinin çoğunu solunumla üreten ve uzak bir bakteri atasından miras alınan kendi DNA\'sını taşıyan organellerdir.',
    tags: ['biyoloji', 'hücreler', 'enerji', 'genetik', 'bilim'],
    language: 'tr',
    content: `# Mitokondri

Mitokondri, hücrelerimizin çoğunun içindeki minik yapılardır; yaşamı hareket ettiren enerjinin çoğunu ürettiği için "hücrenin enerji santrali" diye ünlüdür.

## Enerji üretmek

Mitokondri, **aerobik solunum** yapar; besinleri ve oksijeni, hücrelerin enerji parası olarak kullandığı molekül olan **ATP**'ye (adenozin trifosfat) dönüştürür. Süreç, mitokondrinin katlanmış iç zarında gerçekleşir; bu zarın kıvrımları (kristalar), enerji üreten tepkimeler için kullanılabilir yüzeyi artırır. Tek bir hücre, enerji gereksinimine göre birden binlerce mitokondri barındırabilir; kas ve kalp hücreleri bunlarca özellikle zengindir.

## Bir bakteri ata

Mitokondrinin kendi küçük DNA halkası vardır ve tıpkı bakteriler gibi bölünerek çoğalır. Bu, **iç-ortakyaşam (endosimbiyoz) kuramını** destekler: mitokondri, yaklaşık iki milyar yıl önce ilkel bir hücre tarafından yutulup kalıcı ortaklara dönüşen serbest yaşayan bakterilerden iner.

## Anneden miras

Spermler neredeyse hiç mitokondri katkısı yapmadığından, **mitokondriyal DNA** anne soyundan neredeyse değişmeden aktarılır. Genetikçiler bunu, insanın soyunu ve göçlerini uzak geçmişe dek izlemek için kullanır.

## Sağlıkla bağlar

Mitokondri kusurları çeşitli kalıtsal bozukluklara yol açabilir; mitokondriyal gerileme ise yaşlanmanın ve Parkinson gibi hastalıkların bir etkeni olarak incelenir.`,
  },
  {
    title: 'Okyanus Akıntıları',
    question: 'Deniz suyunu dünya çevresinde dev halkalar hâlinde dolaştıran nedir?',
    summary:
      'Okyanus akıntıları; rüzgâr, sıcaklık ve tuzlulukla sürülen büyük ölçekli deniz suyu akışlarıdır; ısıyı gezegen boyunca yeniden dağıtır ve bölgesel iklimleri biçimlendirir.',
    tags: ['yer bilimi', 'oşinografi', 'iklim', 'coğrafya', 'bilim'],
    language: 'tr',
    content: `# Okyanus Akıntıları

Okyanus akıntıları, deniz suyunun sürekli, yönlü hareketleridir. Gezegeni saran bir dolaşım sistemi gibi davranır; ısıyı, besinleri ve deniz yaşamını binlerce kilometre taşır.

## Yüzey akıntıları

Yüzeye yakın yerlerde akıntılar her şeyden önce **rüzgârla** sürülür. Dünya'nın dönüşü, yollarını **Coriolis etkisiyle** saptırarak onları **girdaplar (gyre)** denen büyük dönen sistemlere düzenler. Örneğin Gulf Stream, tropiklerden sıcak suyu Avrupa'ya doğru taşır ve Batı Avrupa'ya enleminden beklenenden daha ılıman bir iklim kazandırır.

## Derin dolaşım

Yüzeyin altında akıntılar, sıcaklık ve tuzluluğa bağlı **yoğunluk** farklarıyla sürülür. Kutuplara yakın soğuk, tuzlu su batar ve okyanus tabanı boyunca akar; daha sıcak su ise başka yerlerde yükselir. Bu yavaş küresel halkaya **termohalin dolaşım** ya da "okyanus taşıma bandı" denir ve tam bir tur yaklaşık bin yıl sürebilir.

## Neden önemli

Akıntılar, ısıyı ekvatordan kutuplara taşıyarak küresel sıcaklıkları yumuşatır. Dünyanın en zengin balıkçılık sahalarından bazılarını besleyen besin **yükselmesini (upwelling)** sürer ve El Niño gibi hava olaylarını etkiler. Taşıma bandı soğuk, yoğun kutup suyunun batmasına bağlı olduğundan, bilim insanları eriyen buzların ve ısınan denizin onu zayıflatabileceğine dair işaretleri izler.`,
  },
  {
    title: 'Sera Etkisi',
    question: "Atmosfer gazları Dünya'yı nasıl sıcak tutar?",
    summary:
      'Sera etkisi; belirli atmosfer gazlarının Dünya yüzeyinden ışıyan ısıyı tutmasıyla ortaya çıkan ısınmadır; gezegeni yaşanabilir kılar ama bu gazlar arttıkça şiddetlenir.',
    tags: ['iklim', 'yer bilimi', 'atmosfer', 'çevre', 'bilim'],
    language: 'tr',
    content: `# Sera Etkisi

Sera etkisi, Dünya'yı yaşam için yeterince sıcak tutan doğal süreçtir. Onsuz, gezegen yüzeyinin ortalama sıcaklığı donma noktasının çok altında olurdu.

## Nasıl işler

Güneş ışığı atmosferi geçip Dünya yüzeyini ısıtır. Yüzey de bu enerjiyi **kızılötesi** ışıma (ısı) olarak dışarı geri ışır. Belirli gazlar — özellikle **karbondioksit, metan, su buharı ve diazot monoksit** — dışarı çıkan bu kızılötesinin bir kısmını soğurup yüzeye doğru da dahil olmak üzere her yöne yeniden ışır. Sonuçta ısı, uzaya doğrudan kaçmak yerine alt atmosferde kalır.

Ad, gevşek bir sera benzetmesinden gelir; oysa gerçek bir sera, kızılötesini tutmaktan çok hava hareketini engelleyerek ısınır.

## Doğal denge

Tarihin çoğunda sera gazlarının miktarı ile Dünya'dan ayrılan enerji yaklaşık bir dengede kaldı ve iklimi görece kararlı tuttu.

## İnsan etkisi

Fosil yakıt yakmak, ormansızlaşma ve tarım, karbondioksit ile metan derişimlerini yüz binlerce yıldır görülmeyen düzeylere çıkardı. Bu **güçlenmiş** sera etkisi dengeyi bozar ve gezegenin daha çok ısı tutmasına yol açar. Sonuçlar arasında küresel sıcaklıkların yükselmesi, hava düzenlerinin değişmesi, buzulların erimesi ve deniz seviyesinin yükselmesi vardır — modern iklim değişikliğinin merkezî mekanizması.`,
  },
  {
    title: 'Biyolüminesans',
    question: 'Bazı canlılar karanlıkta nasıl ve neden ışıldar?',
    summary:
      'Biyolüminesans; canlı organizmaların kimyasal bir tepkimeyle ışık üretmesidir; iletişim, kamuflaj, av çekme ve eş bulma için kullanılır.',
    tags: ['biyoloji', 'kimya', 'oşinografi', 'hayvanlar', 'bilim'],
    language: 'tr',
    content: `# Biyolüminesans

Biyolüminesans, canlı organizmaların kendi ışıklarını üretebilme yeteneğidir. Bir yaz gecesi yanıp sönen ateş böceklerinden karanlık bir kıyıda parıldayan dalgalara dek, yaşam ağacının her yerinde görülür — ve derin denizde özellikle yaygındır.

## Kimya

Parıltı, ısıdan değil kimyasal bir tepkimeden doğar; bu da onu neredeyse hiç enerji harcamayan bir "soğuk ışık" biçimi yapar. **Lusiferin** adlı ışık yayan bir molekül, **lusiferaz** adlı bir enzimin yardımıyla oksijenle tepkimeye girer. Tepkime enerjiyi görünür ışık olarak salar; genellikle mavi ya da yeşil — deniz suyunda en uzağa giden renkler.

## Organizmalar neden ışıldar

Biyolüminesans pek çok amaca hizmet eder:

- **Av çekmek.** Fener balığı, ağzının önünde ışıldayan bir yem sallar.
- **Savunma.** Bazı kalamarlar avcıları şaşırtmak için ışıldayan bulutlar salar; bazıları üstten gelen soluk parıltıya karışmak için ışık kullanır (karşı-aydınlatma).
- **İletişim ve kur.** Ateş böcekleri eş bulmak için her türe özgü desenlerde ışık çakar.
- **Ortakyaşam.** Pek çok hayvan ışığı kendisi üretmez, özel organlarda ışıldayan bakteriler barındırır.

## Derin okyanusta

Işık, birkaç yüz metre aşağıda koyu karanlığa söner; bunun altında hayvanların ezici çoğunluğu ışık üretebilir. Işıksız bu dünyada biyolüminesans, bir meraktan çok bir hayatta kalma diliridir.`,
  },
  // ── Batch 2: Tarih ve toplum ──
  {
    title: 'İpek Yolu',
    question: 'İpek Yolu neydi ve neden önemliydi?',
    summary:
      'İpek Yolu; Doğu Asya\'yı bin yılı aşkın süre Akdeniz\'e bağlayan, uygarlıklar arasında mallar, teknolojiler, dinler ve fikirler taşıyan bir ticaret yolları ağıydı.',
    tags: ['tarih', 'ticaret', 'asya', 'uygarlık', 'coğrafya'],
    language: 'tr',
    content: `# İpek Yolu

İpek Yolu tek bir taş döşeli yol değil, Çin'i, Orta Asya'yı, Hindistan'ı, İran'ı ve Akdeniz dünyasını bağlayan geniş bir kara ve deniz yolları ağıydı. Yaklaşık MÖ 2. yüzyıldan 15. yüzyıla dek etkin kalarak dokunduğu her toplumun gelişimini biçimlendirdi.

## İpekten fazlası

Çin ipeği, ağa modern adını veren lükstü (adı 19. yüzyılda bir coğrafyacı türetti), ama üzerinde sayısız mal akıyordu: baharat, çay, porselen, cam, değerli madenler, atlar ve kâğıt. Çok az tüccar bütün mesafeyi kat ederdi; bunun yerine mallar, Semerkant ve Kaşgar gibi tüccarlar ve vaha kentleri zinciri boyunca elden ele geçerdi.

## Fikirlerin yolu

Yolun en derin etkisi kültüreldi. **Budizm**, bu güzergâhlarla Hindistan'dan Çin'e yayıldı; İslam, Hıristiyanlık ve Maniheizm de tüccarlarla yolculuk etti. Önemli teknolojiler — **kâğıt, barut ve pusula** — batıya doğru hareket ederek onları benimseyen toplumları dönüştürdü.

## Hastalık ve gerileme

Ticareti taşıyan aynı bağlantılar hastalığı da taşıdı; pek çok tarihçi İpek Yolu'nu 14. yüzyılda **Kara Ölüm'ün** yayılmasına bağlar. Deniz yolları ucuzlayıp güvenlileştikçe ve kara imparatorlukları parçalandıkça ağ yavaş yavaş geriledi.

## Miras

İpek Yolu, tarihin büyük alışveriş motorlarından biri olarak anılır — uzak uygarlıkların sanılandan çok daha erken ve çok daha derinden bağlı olduğunun kanıtı.`,
  },
  {
    title: 'Matbaa',
    question: 'Matbaa dünyayı nasıl değiştirdi?',
    summary:
      'Johannes Gutenberg\'in yaklaşık 1440\'ta geliştirdiği matbaa, kitapları ucuz ve bol kıldı; okuryazarlığı, bilimi, dinî reformu ve Avrupa\'da fikirlerin yayılmasını hızlandırdı.',
    tags: ['tarih', 'teknoloji', 'iletişim', 'kültür', 'avrupa'],
    language: 'tr',
    content: `# Matbaa

Matbaa, tarihin en belirleyici icatlarından biridir. Metin kopyalamayı makineleştirerek kitapları elle kopyalanan nadir hazinelerden seri üretilen nesnelere dönüştürdü.

## Gutenberg'in atılımı

Oyma bloklarla baskı Doğu Asya'da zaten vardı, ama yaklaşık 1440'ta Alman kuyumcu **Johannes Gutenberg** birçok yeniliği işlevsel bir sistemde birleştirdi: dayanıklı **metal hareketli harfler**, metale tutunan yağ esaslı mürekkep ve şarap üretiminden uyarlanmış vidalı bir pres. **42 satırlık İncili** (yaklaşık 1455), yöntemin maliyetin küçük bir bölümüyle el yazmalarının güzelliğiyle yarışabileceğini gösterdi.

## Bir bilgi patlaması

Matbaadan önce bir müstensih tek bir kitabı kopyalamak için aylar harcayabilirdi. Sonrasında bir matbaa, aynı sürede yüzlerce özdeş nüsha üretebiliyordu. 1500'e gelindiğinde Avrupa genelindeki presler milyonlarca cilt çıkarmıştı. Fiyatlar düştü, okuryazarlık arttı ve standartlaşmış metinler bilginin güvenilir biçimde birikmesini sağladı.

## Toplumu yeniden biçimlendirmek

Sonuçlar derindi:

- **Protestan Reformu** hızla yayıldı, çünkü broşürler ve çevrilmiş İnciller sıradan okurlara ulaştı.
- **Bilim Devrimi**, bilginlerin sınırlar ötesinde kesin çizimleri ve verileri paylaşabilmesine bağlıydı.
- Standart baskı, ulusal dilleri istikrara kavuşturmaya ve halk dilindeki edebiyatı yaymaya yardım etti.

## Miras

Matbaa çoğu zaman bilgiyi demokratikleştiren ilk bilgi teknolojisi sayılır — gazetelerden internete dek her sonraki sıçramanın öncüsü.`,
  },
  {
    title: 'Sanayi Devrimi',
    question: 'Sanayi Devrimi neydi ve toplumu nasıl dönüştürdü?',
    summary:
      '18. yüzyıl İngiltere\'sinde başlayan Sanayi Devrimi, el üretiminden makineli imalata geçişti; dünya çapında ekonomileri, kentleri, emeği ve gündelik yaşamı yeniden biçimlendirdi.',
    tags: ['tarih', 'ekonomi', 'teknoloji', 'toplum', 'sanayi'],
    language: 'tr',
    content: `# Sanayi Devrimi

Sanayi Devrimi, yaklaşık 1760'ta Britanya'da başlayan ve ekonomilerin tarımdan ve el zanaatından makineli sanayiye ve fabrika üretimine geçtiği keskin bir değişim dönemiydi.

## Neden Britanya, neden o zaman

Birçok etken birleşti: yakıt olarak bol **kömür**, demir cevheri yatakları, ticaretten gelen sermaye, kırsaldan ayrılan iş gücü ve bir dizi işlevsel icat. James Watt'ın olgunlaştırdığı gelişmiş **buhar makinesi**, fabrikalara güçlü, konumdan bağımsız bir enerji kaynağı verdi. Makineleşmiş tekstil tezgâhları, tek bir işçinin üretimini kat kat artırdı.

## Çiftlikten fabrikaya

Üretim, dağınık evlerden enerji ve ulaşım yakınında kurulan merkezî **fabrikalara** taşındı. Demir ve sonra çelik, makineleri ve demir yollarını olanaklı kıldı; kanallar ve ardından demir yolu, mal taşımacılığını çarpıcı biçimde ucuzlattı. İnsanlar sanayi işine göç ettikçe kentler şişti.

## Maliyetler ve yararlar

Devrim sonunda yaşam standardını ve ömrü yükseltti ve bütünüyle yeni sanayiler yarattı. Ama ilk on yılları sert koşullar getirdi: uzun çalışma saatleri, çocuk işçiliği, tehlikeli makineler, tıka basa dolu gecekondular ve kirlilik. Bu sıkıntılar işçi hareketlerini, reform yasalarını ve işçi hakları üzerine yeni siyasi fikirleri körükledi.

## Kalıcı bir dönüm noktası

19. yüzyıl sonundaki bir "İkinci Sanayi Devrimi" elektriği, kimyayı ve seri üretimi ekledi. Bu dönüşümler birlikte modern sanayi dünyasının kalıbını çizdi — ve bugün iklim sorunlarını süren fosil yakıt kullanımındaki artışı başlattı.`,
  },
  {
    title: 'Yazının Kökenleri',
    question: 'İnsanlar yazıyı ne zaman ve neden icat etti?',
    summary:
      'Yazı; birçok kadim uygarlıkta bağımsız olarak, MÖ 3400 dolaylarında Mezopotamya\'da başlayarak icat edildi; başlangıçta ekonomik kayıt tutmak içindi, sonra dili tam anlamıyla aktaracak biçimde gelişti.',
    tags: ['tarih', 'dil', 'uygarlık', 'iletişim', 'kültür'],
    language: 'tr',
    content: `# Yazının Kökenleri

Yazı — dili görünür, kalıcı işaretlerle kaydetmek — insanlığı tanımlayan icatlardan biridir. En az birkaç yerde bağımsız olarak ortaya çıktı ve her seferinde onu geliştiren toplumları dönüştürdü.

## Muhasebeden doğdu

Bilinen en eski yazı, yaklaşık MÖ 3400-3200'de **Mezopotamya'dan** (bugünkü Irak) gelir. Edebiyat olarak değil, **muhasebe** olarak başladı: tapınak yöneticilerinin tahılı, hayvanları ve ticareti izlemesi gerekiyordu. Kile kazınan basit resimler, yavaş yavaş **çiviyazısı** denen kama biçimli işaretlere dönüştü; bir kamış kalemle çiziliyordu.

## Bağımsız icatlar

Yazı **Mısır'da** (hiyeroglifler), **Çin'de** (kehanet için kullanılan Çin yazı karakterlerinin ataları) ve **Mezoamerika'da** (Mayalar ve onların öncülleri) da kendiliğinden doğdu. Birden fazla kez icat edilmiş olması, karmaşık toplumların derin bir gereksinimini karşıladığını gösterir.

## Resimlerden seslere

İlk yazılar, nesneleri gösteren simgelerle sesleri gösteren simgeleri karıştırırdı. Büyük bir sıçrayış, **alfabeydi** — tek tek sesleri temsil eden küçük bir işaretler kümesi — yaklaşık MÖ 1800'de Sami dili konuşan halklara dek uzanır ve sonra Fenikeliler ve Yunanlar tarafından uyarlandı. Alfabeler okuma ve yazmayı öğrenmesi ve yayması daha kolay kıldı.

## Neden önemliydi

Yazı; bilgiyi, yasaları, sözleşmeleri ve anlatıları yaratıcılarından daha uzun yaşattı. İmparatorlukları yönetilebilir kıldı, bilimin birikmesini sağladı ve belleği kırılgan kişisel bir edimden ortak, kalıcı bir kayda dönüştürdü.`,
  },
  {
    title: 'Enflasyon',
    question: 'Enflasyona ne yol açar ve neden önemlidir?',
    summary:
      'Enflasyon, genel fiyat düzeyinde paranın alım gücünü azaltan sürekli bir artıştır; ölçülü enflasyon olağandır, ama yüksek ya da istikrarsız enflasyon ekonomilere zarar verir.',
    tags: ['ekonomi', 'finans', 'para', 'siyaset', 'toplum'],
    language: 'tr',
    content: `# Enflasyon

Enflasyon, mal ve hizmetlerin genel fiyat düzeyinin zaman içinde yükselme hızıdır. Enflasyon olduğunda, her para birimi eskisinden biraz daha azını satın alır — para, alım gücünü yitirir.

## Nasıl ölçülür

Ekonomistler enflasyonu **fiyat endeksleriyle** ölçer; en yaygını, gündelik mal ve hizmetlerden oluşan temsilî bir "sepetin" maliyetini izleyen tüketici fiyat endeksidir (TÜFE). Sepet bir yıl öncesine göre %3 daha pahalıysa, yıllık enflasyon %3'tür.

## Neye yol açar

Enflasyon genellikle iki büyük güçten doğar:

- **Talep çekişi.** Talep, bir ekonominin üretebileceğini aştığında, alıcılar fiyatları yukarı iter.
- **Maliyet itişi.** Enerji ya da emek gibi girdilerin maliyeti yükseldiğinde, işletmeler bunu fiyatlara yansıtır.

Her iki durumda da çoğu ekonomist, sürekli enflasyonun gerçek üretime kıyasla **para arzının** büyümesiyle sıkı sıkıya bağlı olduğunu savunur.

## Neden önemli

Biraz enflasyon — merkez bankaları genellikle %2 dolayını hedefler — sağlıklı sayılır, çünkü harcamayı ve yatırımı özendirir ve fiyatların düşmesinin (**deflasyon**) tehlikelerinden kaçınır. Ama yüksek enflasyon birikimleri kemirir, kararları çarpıtır ve denetimden çıkabilir; fiyatların günler içinde ikiye katlandığı **hiperenflasyon** örneklerinde olduğu gibi.

## Nasıl yönetilir

Merkez bankaları aşırı enflasyonla en çok **faiz oranlarını** yükselterek savaşır; bu da borçlanmayı ve harcamayı soğutur. Enflasyonu istihdam ve büyümeyle dengelemek, ekonomi politikasının merkezî güçlüklerinden biridir.`,
  },
  {
    title: 'Bilimsel Yöntem',
    question: 'Bilim gerçekte nasıl işler?',
    summary:
      'Bilimsel yöntem; gözlem, hipotez, deney ve gözden geçirme yoluyla bilgi inşa etmenin, kanıtı ve sınanabilirliği otoritenin üzerinde tutan dizgesel bir yaklaşımıdır.',
    tags: ['bilim', 'felsefe', 'yöntem', 'tarih', 'eğitim'],
    language: 'tr',
    content: `# Bilimsel Yöntem

Bilimsel yöntem, bilimin dünyayı araştırmak için kullandığı disiplinli süreçtir. Katı bir reçeteden çok, fikirleri kanıta karşı sınamaya ve tutmayanları bırakmaya istekli olmaya dayanan bir tutumdur.

## Çekirdek döngü

Tipik bir döngü birkaç aşamadan geçer:

1. **Gözlem.** Bir olguyu ya da bilmeceyi fark etmek.
2. **Soru.** Onun hakkında belirli bir şey biçimlendirmek.
3. **Hipotez.** Sınanabilir bir açıklama önermek — ilke olarak yanlışlanabilecek bir önerme.
4. **Öndeyi.** Hipotez doğruysa ne olması gerektiğini çıkarsamak.
5. **Deney.** Öndeyiyi denetimli koşullarda, ideal olarak her seferinde tek bir etkeni değiştirerek sınamak.
6. **Çözümleme ve gözden geçirme.** Sonuçları öndeyiyle karşılaştırıp hipotezi geliştirmek, reddetmek ya da genişletmek.

## Temel ilkeler

- **Sınanabilirlik ve yanlışlanabilirlik.** Bilimsel bir önerme, başarısız olabilecek öndeyiler vermelidir. Her şeyi açıklayan ve hiçbir şeyi yasaklamayan fikirler bilimsel değildir.
- **Yinelenebilirlik.** Başkaları deneyi tekrarlayıp aynı sonucu elde edebilmelidir.
- **Hakem denetimi.** Yeni çalışmalar yaygın kabul görmeden önce başka uzmanlarca incelenir.
- **Geçici bilgi.** İyi temellendirilmiş kuramlar bile daha iyi kanıt çıkarsa gözden geçirilmeye açık kalır.

## Neden işler

Kanıt isteyerek ve eleştiriye çağırarak bilimsel yöntem, zamanla kendi hatalarını düzeltir. Kesinlik vaat etmez, ama doğanın güvenilir, birikimli bir kavranışını üretmekte olağanüstü güçlü olduğunu kanıtlamıştır.`,
  },
  {
    title: 'Atina Demokrasisi',
    question: "Antik Atina'da demokrasi nasıl başladı?",
    summary:
      'MÖ 5. yüzyılda gelişen Atina demokrasisi, yurttaşların doğrudan öz-yönetiminin erken bir sistemiydi; çarpıcı sınırlarına karşın modern demokratik fikirlerin atası olarak etkili oldu.',
    tags: ['tarih', 'siyaset', 'yunanistan', 'demokrasi', 'uygarlık'],
    language: 'tr',
    content: `# Atina Demokrasisi

Antik Atina çoğu zaman demokrasinin beşiği diye anılır. MÖ 5. ve 4. yüzyıllarda, devletin kararlarını kralların ya da dar bir seçkinler zümresinin değil sıradan yurttaşların aldığı bir sistem geliştirdi.

## Nasıl işlerdi

Atina demokrasisi temsilî değil **doğrudandı**. Büyük kararları, tüm hak sahibi yurttaşlara açık olan **Halk Meclisi (Ekklesia)** alır; bu yurttaşlar yasalar, savaş ve siyaset üzerine bizzat tartışır ve oy verirdi. Kurayla seçilen **Beş Yüzler Meclisi** gündemi hazırlar; çoğu kamu görevi ve jüri de seçimle değil **kurayla** doldurulurdu — gücün yoğunlaşmasını engellemeye yönelik bilinçli bir çaba.

## Önemli reformcular

Yol birçok kişiden geçti: **Solon** borçları hafifletti ve katılımı genişletti; **Kleisthenes** yaklaşık MÖ 508'de yurttaşları eski sadakatleri kesen yeni gruplara yeniden örgütledi ve çoğu zaman sistemin kurucusu sayılır; **Perikles** ise onun olgun, kendine güvenli zirvesine başkanlık etti.

## Çarpıcı sınırlar

Modern ölçütlere göre sistem dardı. Yurttaşlık — dolayısıyla siyasi ses — **kadınları, köleleştirilmiş insanları ve yabancı sakinleri** dışlıyor, katılım hakkını nüfusun yalnızca bir azınlığına bırakıyordu.

## Miras

Bu sınırlara karşın Atina demokrasisi kalıcı fikirler getirdi: meşru otoritenin yönetilenlerde olabileceği, yurttaşların açıkça müzakere etmesi gerektiği ve kimsenin yasanın üstünde olmadığı. Bu ilkeler Aydınlanma'da yankılandı ve modern demokrasilerin tasarımına işledi.`,
  },
  {
    title: 'Altın Standardı',
    question: 'Altın standardı neydi ve ülkeler neden onu terk etti?',
    summary:
      'Altın standardı, bir paranın değerinin belirli bir altın miktarına bağlandığı parasal bir sistemdi; döviz kurlarını istikrara kavuşturdu ama esnekliği kısıtladı ve 20. yüzyılda terk edildi.',
    tags: ['ekonomi', 'tarih', 'para', 'finans', 'siyaset'],
    language: 'tr',
    content: `# Altın Standardı

Altın standardı, bir ülkenin parasının değerinin doğrudan altına bağlı olduğu bir sistemdi. Tam bir altın standardı altında, kâğıt para talep üzerine sabit bir altın miktarına çevrilebilirdi.

## Nasıl işlerdi

Her para birimi belirli bir altın ağırlığını temsil ederdi ve hükûmetler banknotları bu kur üzerinden altına çevirmeyi taahhüt ederdi. Birçok ülke parasını altına bağladığından, aralarındaki döviz kurları fiilen **sabitti**; bu da uluslararası ticareti ve yatırımı daha öngörülebilir kılardı.

## Üstünlükleri

Savunucuları altın standardını **istikrar** ve **disiplin** için değerli bulurdu. Para sınırlı bir fiziksel malla karşılandığından, hükûmetler harcamayı finanse etmek için kolayca para basamazdı; bu da uzun vadeli enflasyonu düşük tutma ve paraya güven yaratma eğilimindeydi.

## Sakıncaları

Bu aynı katılık onun zayıflığıydı. Para arzı ekonominin gereksinimlerine değil altın rezervlerine bağlıydı, bu yüzden hükûmetlerin durgunluklara, banka krizlerine ya da şoklara yanıt verme alanı azdı. Birçok ekonomist, ülkeler ekonomilerini canlandırmak yerine ona sarıldığından, altın standardının 1930'ların **Büyük Buhranını** derinleştirip yaydığını savunur.

## Altının sonu

Uluslar altından aşamalı olarak koptu. Sistem 1971'de, ABD doların altına çevrilebilirliğine son verince tamamen çöktü. Bugün dünya, değeri fiziksel bir mala değil hükûmetlere ve merkez bankalarına duyulan güvene dayanan **itibarî paraya (fiat)** dayanır.`,
  },
  // ── Batch 3: Teknoloji ve matematik ──
  {
    title: 'GPS Nasıl Çalışır',
    question: 'GPS nerede olduğunuzu tam olarak nasıl bilir?',
    summary:
      'GPS; konumu, birçok uydudan gelen sinyallerin yol süresini ölçerek ve üçlü uzaklık ölçümü (trilaterasyon) kullanarak belirler; hassas atom saatleri ve görelilik düzeltmeleri onu birkaç metreye dek doğru kılar.',
    tags: ['teknoloji', 'navigasyon', 'uydular', 'fizik', 'mühendislik'],
    language: 'tr',
    content: `# GPS Nasıl Çalışır

Küresel Konumlandırma Sistemi (GPS), telefonunuzdaki, arabanızdaki ya da saatinizdeki bir alıcının Dünya'nın herhangi bir yerinde nerede olduğunu, genellikle birkaç metre içinde bulmasını sağlar. Bir uydu takımyıldızına ve ustaca bir fiziğe dayanır.

## Uydular ve sinyaller

GPS, yaklaşık 20.000 km yükseklikte yörüngede olan, gezegenin herhangi bir noktasından her zaman birkaçı görünecek biçimde yerleştirilmiş yaklaşık 30 uydu kullanır. Her biri, gönderildiği tam **zamanı** ve uydunun **konumunu** taşıyan bir radyo sinyalini sürekli yayınlar.

## Trilaterasyon

Alıcı, her sinyalin ulaşmasının ne kadar sürdüğünü ölçer. Radyo dalgaları ışık hızında gittiği için yol süresi, o uyduya olan **uzaklığı** ortaya koyar. Bir uyduya olan uzaklığı bilmek sizi onun çevresindeki bir küre üzerinde bir yere yerleştirir; birçok uyduya olan uzaklıkları birleştirmek konumunuzu tek bir noktaya daraltır. Bu geometrik tekniğe **trilaterasyon** denir. En az dört uydudan sinyal gerekir — üçü konumu belirlemek, dördüncüsü alıcının saat hatasını çözmek için.

## Saatler ve görelilik neden önemli

Eşzamanlama olağanüstü hassas olmalıdır: saniyenin milyonda birlik bir hata, konumu yüzlerce metre kaydırır. Uydular **atom saatleri** taşır; sistem, **Einstein'ın göreliliğini** bile düzeltir — uyduların hızı ve daha zayıf yerçekimi, saatlerini yerdekilerden biraz farklı bir hızda işletir. Bu düzeltmeler olmasa GPS günde kilometrelerce şaşardı.

## Konumlandırmanın ötesinde

Aynı hassas eşzamanlama; finans ağlarını, elektrik şebekelerini ve telekomünikasyonu destekler ve GPS'i modern altyapının sessiz bir bel kemiği yapar.`,
  },
  {
    title: 'Açık Anahtarlı Kriptografi',
    question: 'İki yabancı açık internette nasıl güvenle iletişim kurabilir?',
    summary:
      'Açık anahtarlı kriptografi; matematiksel olarak bağlı anahtar çiftleri — biri açık, biri özel — kullanır; böylece insanlar önceden bir sır paylaşmadan iletileri şifreler ve kimlikleri doğrular.',
    tags: ['teknoloji', 'kriptografi', 'güvenlik', 'matematik', 'internet'],
    language: 'tr',
    content: `# Açık Anahtarlı Kriptografi

Açık anahtarlı kriptografi, hiç karşılaşmamış insanlar arasında güvenli iletişimi olanaklı kılan atılımdır. HTTPS'in, güvenli mesajlaşmanın, dijital imzaların ve kripto paraların temelidir.

## Anahtar çifti fikri

Geleneksel ("simetrik") şifreleme, bir iletiyi kilitlemek ve açmak için tek bir paylaşılan anahtar kullanır — bu da bir sorun yaratır: o anahtar başlangıçta güvenle nasıl paylaşılır? Açık anahtarlı (ya da **asimetrik**) kriptografi bunu bir anahtar **çiftiyle** çözer:

- Herkesin görebileceği bir **açık anahtar**.
- Sahibinin gizli tuttuğu bir **özel anahtar**.

İkisi öyle matematiksel olarak bağlıdır ki bir anahtarın kilitlediğini yalnızca diğeri açabilir — ama açık anahtarı bilmek özel anahtarı hesaplamayı sağlamaz.

## İki ana kullanım

- **Şifreleme.** Birine gizli bir ileti göndermek için onu *o kişinin açık anahtarıyla* şifrelersiniz; yalnızca onun özel anahtarı çözebilir.
- **Dijital imzalar.** Bir iletinin gerçekten size ait olduğunu kanıtlamak için onu *kendi özel anahtarınızla* imzalarsınız; herkes açık anahtarınızla doğrulayabilir; bu da gerçekliği ve değiştirilmediğini onaylar.

## Arkasındaki matematik

Güvenlik, bir yönde hesaplaması kolay ama tersine çevirmesi son derece zor sorunlara dayanır — devasa sayıları **çarpanlarına ayırmak** (RSA) ya da **eliptik eğriler** üzerinde ayrık logaritmaları çözmek gibi. Bunları tersine çevirmek, uygulanamaz miktarda hesaplama gerektirir.

## Gündelik yaşamda

Tarayıcınız bir kilit gösterdiğinde, siteyi doğrulamak ve oturumun geri kalanı için hızlı bir paylaşılan anahtar kurmak üzere açık anahtarlı kriptografiyi çoktan kullanmıştır.`,
  },
  {
    title: 'Fibonacci Dizisi',
    question: 'Fibonacci dizisi nedir ve doğada neden görünür?',
    summary:
      'Fibonacci dizisi, her sayının kendinden önceki ikisinin toplamı olduğu bir seridir; altın oranla ilişkilidir ve çiçek taç yaprakları ile sarmal kabuklar gibi desenlerde görünür.',
    tags: ['matematik', 'desenler', 'doğa', 'geometri', 'bilim'],
    language: 'tr',
    content: `# Fibonacci Dizisi

Fibonacci dizisi, matematiğin en ünlü desenlerinden biridir: geometriyle ve doğal dünyayla şaşırtıcı bağlantılar üreten basit bir kural.

## Kural

0 ve 1 ile başlayın ve her yeni sayıyı **önceki ikisinin toplamı** yapın:

\`\`\`
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
\`\`\`

Dizi, adını İtalyan matematikçi **Pisalı Leonardo'dan** (Fibonacci) alır; onu 1202'de tavşan üretimi üzerine bir bilmeceyle Avrupa'ya tanıttı, ama dizi Hint matematiğinde daha önceden biliniyordu.

## Altın oranla bağ

Herhangi bir Fibonacci sayısını kendinden öncekine bölün; sonuç giderek yaklaşık **1,618'e** — **altın orana** (çoğunlukla φ ile gösterilir) — yaklaşır. Dizide ne kadar ilerlerseniz yaklaşım o kadar kesinleşir.

## Doğada neden görünür

Fibonacci sayıları, birçok çiçeğin taç yaprak sayısında, ayçiçeği tohumlarının diziliminde ve bitkilerin dallanmasında görünür. Daha derin nedeni **verimli paketlemedir**: yaprakları ya da tohumları altın oranla ilişkili açılarla dizmek, bir bitkinin güneş ışığını yakalamasını ya da tohumları en az örtüşmeyle yerleştirmesini sağlar. Yani desen, mistik bir imzadan çok, eniyilemenin doğal bir sonucudur.

## Biyolojinin ötesinde

Dizi ayrıca bilgisayar algoritmalarında, finansal çözümlemede ve sanatta da ortaya çıkar; orada altın oran uzun süredir hoş orantılarla ilişkilendirilir.`,
  },
  {
    title: 'Asal Sayılar',
    question: 'Asal sayılar nedir ve neden önemlidir?',
    summary:
      'Asal sayılar; birden büyük, bir ve kendisi dışında böleni olmayan tam sayılardır; aritmetiğin yapı taşları ve modern kriptografinin temelidir.',
    tags: ['matematik', 'sayılar', 'kriptografi', 'kuram', 'bilim'],
    language: 'tr',
    content: `# Asal Sayılar

Asal sayı, yalnızca 1'e ve kendisine tam bölünebilen 1'den büyük bir tam sayıdır. İlk asal sayılar 2, 3, 5, 7, 11 ve 13'tür. 6 (= 2 × 3) gibi ek bölenleri olan sayılara **bileşik** denir.

## Aritmetiğin atomları

Asal sayılar, **aritmetiğin temel teoremi** nedeniyle temeldir: 1'den büyük her tam sayı, asalların çarpımı olarak tek bir biçimde yazılabilir (sıra sayılmazsa). Örneğin 60 = 2 × 2 × 3 × 5. Bu anlamda asal sayılar, diğer tüm sayıların kendisinden inşa edildiği bölünmez "atomlardır".

## Sonsuz çoklukta

Yunan matematikçi **Öklid**, iki bin yıldan fazla önce en büyük asalın olmadığını kanıtladı — liste sonsuza dek sürer. Yine de asallar, sayılar büyüdükçe seyrekleşir; tam olarak nerede düştüklerini öngörmek, ünlü **Riemann hipoteziyle** bağlı, derin ve hâlâ çözülmemiş bir matematik alanıdır.

## Bugün neden önemli

Asal sayılar modern **kriptografiyi** sürer. RSA gibi yöntemler işlevsel bir asimetriye dayanır: iki büyük asalı çarpmak kolaydır, ama ortaya çıkan devasa sayıyı alıp özgün asalları geri elde etmek (**çarpanlarına ayırmak**) bugünün bilgisayarları için son derece zordur. Bu güçlük; çevrim içi bankacılığı, mesajlaşmayı ve ticareti güvende tutar.

## Süregelen bir arayış

Bilgisayar ağları kullanan matematikçiler ve gönüllüler, giderek daha büyük asallar aramayı sürdürür. Bilinen en büyük asal sayılar bugün on milyonlarca basamak içerir.`,
  },
  {
    title: 'Bileşik Faiz',
    question: 'Bileşik faiz zaman içinde neden bu kadar güçlüdür?',
    summary:
      'Bileşik faiz; hem özgün anaparaya hem de daha önce birikmiş faize kazanılan faizdir; bu da erken ve uzun vadeli birikimi ödüllendiren üstel bir büyüme üretir.',
    tags: ['finans', 'ekonomi', 'matematik', 'para', 'kişisel finans'],
    language: 'tr',
    content: `# Bileşik Faiz

Bileşik faiz, çoğu zaman finansın en güçlü kuvveti diye anılır. Yalnızca başlangıçta yatırdığınız paraya değil, o paranın daha önce kazandığı faize de faiz kazanma sürecidir.

## Basit faize karşı bileşik faiz

**Basit faizde**, her dönemde yalnızca özgün tutara (**anapara**) dayanan sabit bir miktar kazanırsınız. **Bileşik faizde**, her dönemin faizi bakiyeye eklenir, böylece bir sonraki dönemin faizi daha büyük bir tutar üzerinden hesaplanır. Dolayısıyla büyüme zaman içinde hızlanır — doğrusal değil **üsteldir**.

## Hızlı bir örnek

1000'i yıllık %7 ile yatırın:

- 1 yıl sonra: 1070
- 10 yıl sonra: yaklaşık 1967
- 30 yıl sonra: yaklaşık 7612

Para, tek kuruş eklemeden yaklaşık her on yılda **ikiye katlanır** — ve ne kadar uzun tutulursa sonuç o kadar çarpıcı olur.

## 72 kuralı

İşlevsel bir kestirme, **72 kuralı**, bir yatırımın ikiye katlanmasının ne kadar süreceğini tahmin eder: 72'yi yıllık faiz oranına bölün. %8'de para yaklaşık 9 yılda ikiye katlanır (72 ÷ 8).

## Zaman neden en çok önemli

Bileşik faiz kendi üzerine inşa ettiğinden, **erken başlamak** çoğu zaman daha sonra büyük tutarlar yatırmaktan daha önemlidir. Aynı mantık borçla tersine işler: yüksek faizli kredilerin ya da kartların ödenmemiş bakiyeleri borçlunun aleyhine birikir, bu yüzden böyle bir borç ürkütücü bir hızla büyüyebilir.`,
  },
  {
    title: 'Özet (Hash) Fonksiyonları',
    question: 'Özet fonksiyonu nedir ve nerede kullanılır?',
    summary:
      'Özet fonksiyonu, herhangi bir boyuttaki veriyi sabit uzunlukta bir diziye dönüştürür; iyi kriptografik özet fonksiyonları hızlı, belirlenimci ve tersine çevrilmesi ya da çakışma üretilmesi işlevsel olarak olanaksızdır.',
    tags: ['teknoloji', 'bilgisayar bilimi', 'kriptografi', 'güvenlik', 'veri'],
    language: 'tr',
    content: `# Özet (Hash) Fonksiyonları

Özet fonksiyonu, hesaplamada küçük ama temel bir araçtır. Herhangi bir uzunlukta bir girdi alır — bir sözcük, bir dosya, koca bir veritabanı — ve **özet** ya da **sindirim (digest)** denen sabit uzunlukta bir çıktı üretir.

## Temel özellikler

İşe yarar bir özet fonksiyonu:

- **Belirlenimcidir.** Aynı girdi her zaman aynı özeti verir.
- Hesaplaması **hızlıdır**.
- **Sabit uzunluktadır.** Tek karakterlik bir ileti ve bir gigabaytlık bir dosya, örneğin 256 bitlik bir sonuç verir.

Bir *kriptografik* özet fonksiyonu daha güçlü güvenceler ekler:

- **Tek yönlü.** Bir özetten, özgün girdi işlevsel olarak geri elde edilemez.
- **Çakışmaya dirençli.** Aynı özete sahip iki farklı girdi bulmak işlevsel olarak olanaksızdır.
- **Çığ etkisi.** Girdinin tek bir karakterini değiştirmek çıktıyı tümüyle karıştırır.

## Gündelik kullanımlar

- **Parola saklama.** Sistemler, parolanın kendisini değil özetini saklar; böylece bir veritabanı sızıntısı kullanıcıların sırlarını doğrudan açığa çıkarmaz.
- **Bütünlük denetimleri.** İndirmeler çoğu zaman bir dosyanın bozulmadan ve oynanmadan geldiğini doğrulamak için bir özet yayımlar.
- **Veri yapıları.** **Özet tabloları**, ne kadar veri saklanırsa saklansın öğeleri neredeyse anında bulmak için özetlemeyi kullanır.
- **Blok zincirleri.** Kripto paralar, blokları özetlerle birbirine bağlayarak defteri oynanmaya karşı korur.

## Yaygın algoritmalar

Modern sistemler **SHA-256** gibi güçlü fonksiyonları yeğler. MD5 ve SHA-1 gibi eskiler, araştırmacılar çakışma üretmenin yollarını bulduğundan bugün güvenlik açısından kırılmış sayılır ve duyarlı verileri korumak için kullanılmamalıdır.`,
  },
  {
    title: 'Turing Makinesi',
    question: 'Turing makinesi nedir ve hesaplama için neden temeldir?',
    summary:
      'Turing makinesi; Alan Turing\'in 1936\'da tasarladığı, bir sorunun hesaplanabilir olmasının ne demek olduğunu tanımlayan ve tüm hesaplamayı destekleyen basit bir matematiksel hesaplama modelidir.',
    tags: ['bilgisayar bilimi', 'matematik', 'kuram', 'tarih', 'teknoloji'],
    language: 'tr',
    content: `# Turing Makinesi

Turing makinesi, fiziksel bir aygıt değil bir düşünce deneyidir — hesaplama fikrinin ta kendisini yakalayan matematiksel bir model. 1936'da **Alan Turing** tarafından önerilen makine, bilgisayar biliminin kuramsal temeli olmayı sürdürür.

## Aldatıcı ölçüde basit bir tasarım

Bir Turing makinesi şunlardan oluşur:

- Her birinde bir simge bulunan hücrelere bölünmüş, sonsuz uzunlukta bir **şerit**.
- Altındaki simgeyi okuyup yazabilen ve sola ya da sağa hareket edebilen bir **kafa**.
- Makineye, o anki durumuna ve okuduğu simgeye göre ne yapacağını söyleyen bir **durumlar** kümesi ile bir **kurallar** tablosu.

Bu asgari parçalardan makine, herhangi bir adım adım yordamı yürütebilir. Turing'in sezgisi, bu basit sistemin bir algoritmayla betimlenebilecek **herhangi** bir hesaplamayı yürütecek kadar güçlü olduğuydu.

## Evrensellik

Turing ayrıca, başka herhangi bir Turing makinesinin betimini okuyup onu taklit edebilen **evrensel** bir makine de betimledi. Bu, modern programlanabilir bilgisayarın kuramsal atasıdır: her görev için ayrı bir aygıt yerine farklı programlar çalıştıran bir makine.

## Hesaplamanın sınırları

Model sınırları da açığa çıkardı. Turing, bazı sorunların **karar verilemez** olduğunu kanıtladı: hiçbir algoritma onları çözemez. En ünlüsü **durma sorunudur**: her program ve girdi için, programın sonunda duracağını mı yoksa sonsuza dek mi çalışacağını belirleyecek genel bir yöntem yoktur.

## Kalıcı bir etki

Gerçek bir bilgisayarın hesaplayabildiği her şeyi, bir Turing makinesi de hesaplayabilir (yeterli zaman ve şerit verilirse). Bu denklik, modelin bilgisayarların neyi yapabileceğinin — ve yapamayacağının — sınırlarını hâlâ tanımlamasının nedenidir.`,
  },
  {
    title: 'Bant Genişliği ve Gecikme',
    question: 'Bant genişliği ile gecikme arasındaki fark nedir?',
    summary:
      'Bant genişliği, bir bağlantının saniyede ne kadar veri taşıyabildiğidir; gecikme ise verinin gelmeye başlamasından önceki bekleme süresidir; ikisi de bir ağın ne kadar "hızlı" göründüğünü biçimler, ama aynı şey değildir.',
    tags: ['teknoloji', 'ağlar', 'internet', 'bilgisayar bilimi', 'mühendislik'],
    language: 'tr',
    content: `# Bant Genişliği ve Gecikme

İnsanlar çoğu zaman bir bağlantının "hızlı" olduğunu söyler, ama hızın aslında iki ayrı boyutu vardır: **bant genişliği** ve **gecikme**. Bunları karıştırmak, ağlardan duyulan hayal kırıklığının yaygın bir kaynağıdır.

## Bant genişliği: ne kadar

**Bant genişliği**, bir bağlantının belirli bir sürede aktarabileceği en yüksek veri miktarıdır; genellikle saniyede megabit ya da gigabit olarak ölçülür. İşe yarar bir benzetme borunun genişliğidir: daha geniş bir boru bir seferde daha çok su geçirir. Bant genişliği, en çok **büyük** miktarda veri taşımakta işe yarar — yüksek çözünürlüklü video akışı, büyük dosyalar indirmek ya da buluta yedeklemek.

## Gecikme: ne kadar erken

**Gecikme**, bir istek göndermekle ilk yanıtı almak arasındaki beklemedir; milisaniyeyle ölçülür. Boru benzetmesinde, suyun bir uçtan diğerine gitmesinin ne kadar sürdüğüdür. Gecikme; uzaklığa (sinyaller ışık hızını aşamaz), ağ sıçramalarının sayısına ve işlem gecikmelerine bağlıdır. Gecikme en çok **etkileşimli** görevlerde önemlidir — görüntülü aramalar, çevrim içi oyunlar ve hızlı web istekleri.

## Fark neden önemli

Bir bağlantının bant genişliği yüksek ama gecikmesi yüksek olabilir ya da tersi. Bir uydu bağlantısı çok veri taşıyabilir ve yine de yavaş görünebilir, çünkü her sinyal on binlerce kilometre kat eder. Bu yüzden bir video akıcı oynayabilirken (bant genişliği) bir oyun hâlâ takılıyormuş gibi gelebilir (gecikme).

## İlgili terimler

**İş çıkarımı (throughput)**, uygulamada gerçekten elde edilen veri hızıdır; genellikle kuramsal bant genişliğinden düşüktür. **Titreşim (jitter)**, gecikmenin zaman içindeki dalgalanmasıdır; ortalama gecikme düşük olsa bile sesi ve videoyu bozabilir.`,
  },
  // ── Batch 4: Zihin, sağlık ve gündelik yaşam ──
  {
    title: 'Plasebo Etkisi',
    question: 'Sahte bir tedavi yine de insanları nasıl daha iyi hissettirebilir?',
    summary:
      'Plasebo etkisi; etkin maddesi olmayan bir tedavinin, kişi yardım beklediği için belirtilerini iyileştirmesiyle ortaya çıkar ve zihin ile beden arasındaki güçlü bağı açığa vurur.',
    tags: ['sağlık', 'psikoloji', 'tıp', 'beyin', 'bilim'],
    language: 'tr',
    content: `# Plasebo Etkisi

Plasebo etkisi, tıbbın en büyüleyici olgularından biridir: insanlar çoğu zaman hiçbir iyileştirici gücü olmayan bir tedaviden sonra iyileşir — bir şeker hapı, bir serum fizyolojik iğnesi ya da göstermelik bir işlem — yalnızca yardım edeceğine inandıkları için.

## Ne olur

Plasebo, sahte bir tedavidir. Biri onu gerçek sanarak aldığında, iyileşme beklentisi ölçülebilir değişiklikleri tetikleyebilir: daha az bildirilen ağrı, daha iyi ruh hâli, hatta bedensel işaretlerde değişimler. Etki en çok beyin tarafından düzenlenen belirtilerde güçlüdür — **ağrı, kaygı, yorgunluk ve mide bulantısı** gibi.

## Neden olur

Birkaç düzenek işin içinde gibidir:

- **Beklenti.** Rahatlama beklemek, beyni endorfin gibi doğal maddeler salmaya yöneltebilir.
- **Koşullanma.** Öğrenilmiş çağrışımlar (beyaz önlük, hap alma edimi), alışkanlıkla gerçek tepkiler uyandırabilir.
- **Kaygının azalması.** İlgi görmek stresi azaltır, bu da tek başına belirtileri hafifletebilir.

Şunu belirtmek önemli: plasebolar tümörleri küçültmez, enfeksiyonları iyileştirmez — çoğunlukla **algıyı** ve beyin tarafından düzenlenen bazı tepkileri değiştirir.

## Bilim için neden önemli

Plasebolar bu denli güçlü olduğundan, yeni ilaçların onları **plasebo denetimli denemelerde** geçmesi gerekir. Katılımcılar, hangisini aldıklarını bilmeden gerçek tedaviyi alanlar ve plaseboyu alanlar olarak ayrılır; ancak gerçek tedavi plaseboyu açıkça geçerse gerçekten işe yaradığı kabul edilir.

## Karanlık akraba

**Nosebo etkisi** bunun tersidir: zarar beklemek gerçek olumsuz belirtiler doğurabilir; kişi yalnızca bir şeker hapı almış olsa bile, bir uyarı yüzünden yan etki hissetmek gibi.`,
  },
  {
    title: 'Neden Uyuruz',
    question: 'Her gece uyumaya neden gerek duyarız?',
    summary:
      'Uyku; belleği, hücre onarımını, hormon düzenlemesini ve beyin temizliğini destekleyen hayati bir biyolojik durumdur; süreğen yoksunluk sağlığa ve zihinsel işleve zarar verir.',
    tags: ['sağlık', 'biyoloji', 'beyin', 'uyku', 'bilim'],
    language: 'tr',
    content: `# Neden Uyuruz

Yaşamımızın yaklaşık üçte birini uyuyarak geçiririz, ama uyku kayıp zaman olmaktan çok uzaktır. Beden ve zihin için zorunlu, etkin ve özenle düzenlenen bir süreçtir. Bilim insanları tüm işlevlerini hâlâ tartışsa da, öneminin kanıtları ezicidir.

## Uyku ne yapar

Uyku birçok hayati işlevi yerine getiriyor gibidir:

- **Bellek pekiştirme.** Beyin, günün anılarını yeniden işler ve güçlendirir; öğrendiklerimizi kısa süreli bellekten uzun süreli belleğe taşır.
- **Hücre temizliği.** Uyku sırasında beyin, metabolik atıkları daha hızlı atar; bunların arasında sinir-yıkımı hastalıklarıyla bağlı proteinler de vardır.
- **Onarım ve büyüme.** Beden dokuları onarır, kemik ve kas yapar ve büyüme için önemli hormonları salar.
- **Düzenleme.** Uyku; iştahı, ruh hâlini, bağışıklık işlevini ve hormon dengesini ayarlar.

## Uyku evreleri

Uyku, yaklaşık 90 dakikalık döngüler hâlinde akar; **REM dışı** uyku (fiziksel toparlanma için en iyi olan derin yavaş dalga uykusu dahil) ile **REM** uykusu (canlı rüyaların çoğunun görüldüğü, belleğe ve duygu düzenlemesine yardım eden) arasında dönüşümlüdür. Sağlıklı bir gece, bu tam döngülerden birkaçından geçer.

## Kötü uykunun bedeli

Süreğen uyku yoksunluğu; bellek sorunları, bozulmuş yargı, sarsılmış ruh hâli ve obezite, diyabet, kalp hastalığı ile bağışıklık eksikliği riskinin artmasıyla bağlıdır. Ölçülü bir uyku kaybı bile dikkati ve tepki süresini alkol kadar bozar.

## Ne kadar gerekir

Çoğu yetişkin gecede 7-9 saate, ergenler ve çocuklar daha fazlasına gereksinim duyar. Gereksinim kişiden kişiye değişir, ama çok azı az uykuyla sürekli gerçekten iyi işlev görebilir.`,
  },
  {
    title: 'Kafein ve Beyin',
    question: 'Kafein bizi nasıl daha uyanık kılar?',
    summary:
      'Kafein; beynin uyku veren kimyasalı olan adenozini bloke ederek yorgunluğu geçici olarak azaltır ve uyanıklığı artırır — bu yüzden dünyanın en çok kullanılan uyarıcısıdır.',
    tags: ['sağlık', 'beyin', 'kimya', 'biyoloji', 'gündelik'],
    language: 'tr',
    content: `# Kafein ve Beyin

Kafein, dünyanın en çok tüketilen ruh etkin maddesidir; kahvede, çayda, çikolatada, gazlı içeceklerde ve enerji içeceklerinde bulunur. Uykuyu kovma yeteneği, beyindeki kesin bir biyokimyasal hileden gelir.

## Uyku işaretini bloke etmek

Uyanık geçen gün boyunca beyinde **adenozin** adlı bir madde birikir. Alıcılara bağlanır ve yavaş yavaş yorgunluk duygusu üretir; sonunda bizi uyutan "uyku basıncını" oluşturmaya yardım eder.

Kafeinin moleküler yapısı adenozine epey benzer. Aynı alıcılara oturur ve onları etkinleştirmeden **bloke eder**. Adenozinin yorgunluk işaretleri kesilince daha uyanık ve diri hissedersiniz — ama altta yatan yorgunluk hâlâ aşağıda, bekler; kafeinin etkisi geçtiğinde geri gelir.

## İkincil etkiler

Adenozini bloke ederek kafein, **dopamin** gibi başka kimyasal habercilerin de daha serbest çalışmasına izin verir; bu da ruh hâlini, odaklanmayı ve tepki süresini biraz iyileştirebilir. Ölçülü bir dozun bu denli yararlı görünmesinin nedeni budur.

## Tolerans ve yoksunluk

Düzenli kullanımla beyin, **daha çok** adenozin alıcısı yaparak uyum sağlar, böylece aynı etki için daha çok kafein gerekir — bu **toleranstır**. Kişi birden bırakırsa, tüm o fazladan alıcı adenozine açık kalır; beyin yeniden ayarlanana dek baş ağrısı, yorgunluk ve sinirlilik yaratır.

## Zamanlama ve miktar

Kafein tam etkisine yaklaşık 20-45 dakikada ulaşır ve "yarı ömrü" yaklaşık 5 saattir, bu yüzden öğleden sonraki bir doz gece uykusunu yine de bozabilir. Ölçülü dozlar çoğu kişi için güvenlidir, ama fazlası kaygı, çarpıntı ve uykusuzluğa yol açabilir.`,
  },
  {
    title: 'Doppler Etkisi',
    question: 'Bir ambulans sireni geçerken perdesini neden değiştirir?',
    summary:
      'Doppler etkisi; kaynak ile gözlemci birbirine göre hareket ettiğinde bir dalganın frekansındaki değişimdir; geçen sirenlerde duyulur ve radardan astronomiye dek kullanılır.',
    tags: ['fizik', 'ses', 'dalgalar', 'astronomi', 'bilim'],
    language: 'tr',
    content: `# Doppler Etkisi

Doppler etkisi; bir dalganın kaynağı ile gözlemci birbirine göre hareket ettiğinde dalganın frekansındaki değişimdir. Bir ambulans sireninin yaklaşırken daha tiz, geçtikten sonra daha pes gelmesinin nedeni budur.

## Neden olur

Ses dalgaları bir uzaklığı sabit bir hızda kat eder. Sesin kaynağı size doğru hareket ederse, her ardışık dalga biraz daha yakın bir noktadan çıkar, böylece dalgalar **sıkışır** — daha yüksek frekans, daha tiz perde. Kaynak uzaklaştıkça dalgalar **gerilir** — daha düşük frekans, daha pes perde. Değişimin kendisi, kaynağın tam yanınızdan geçtiği anda olur.

## Yalnızca ses değil

Doppler etkisi ışık dahil tüm dalgalara uygulanır. Işık için, yaklaşan bir nesnenin dalgaları tayfın **mavi** ucuna doğru sıkışır (maviye kayma), uzaklaşan bir nesneninkiler **kırmızıya** doğru gerilir (kırmızıya kayma). Değişimler gündelik hızlarda görülemeyecek kadar küçüktür, ama astronomik ölçeklerde ölçülebilir hâle gelir.

## Gerçek dünyada kullanımlar

- **Radar ve hız radarları**, dalgaları araçlardan sektirir ve hızı hesaplamak için kaymayı ölçer.
- **Hava tahmini**, yağmurun ve fırtınaların hareketini izlemek için Doppler radarını kullanır.
- **Tıp**, kan akışını görüntülemek için Doppler ultrasonunu kullanır.
- **Astronomi**, yıldızların ve gökadaların hareket hızını ölçmek için kırmızıya kaymayı kullanır.

## Bir kozmik ipucu

Işığın Doppler kayması, evrenin genişlediğinin başlıca kanıtlarından biridir: uzak gökadalar kırmızıya kayma gösterir, bu da neredeyse hepsinin bizden uzaklaştığına işaret eder.`,
  },
  {
    title: 'Gökyüzü Neden Mavi',
    question: 'Gökyüzü gündüz neden mavi, gün batımında neden kırmızıdır?',
    summary:
      'Gökyüzü mavidir çünkü hava molekülleri kısa dalga boylu (mavi) güneş ışığını uzun dalga boylu olandan daha güçlü saçar; bu sürece Rayleigh saçılması denir.',
    tags: ['fizik', 'ışık', 'atmosfer', 'renk', 'bilim'],
    language: 'tr',
    content: `# Gökyüzü Neden Mavi

Gökyüzünün gündüz mavi olması, güneş ışığının Dünya atmosferiyle nasıl etkileştiğinin sonucudur. Açıklama, **Rayleigh saçılması** denen bir süreçten gelir.

## Güneş ışığı birçok renkten oluşur

Beyaz görünse de güneş ışığı, her biri kendi dalga boyuna sahip gökkuşağının tüm renklerinin bir karışımıdır. Mavi ve mor ışığın dalga boyu **kısadır**; kırmızı ve turuncununki **uzundur**.

## Saçılma maviyi kayırır

Atmosfere girerken güneş ışığı, dalga boyundan çok daha küçük gaz molekülleriyle çarpışır. Bu moleküller kısa dalga boylarını uzun olanlardan çok daha güçlü saçar — mavi ışık, kırmızıdan birkaç kat fazla saçılır. Sonuçta mavi ışık tüm gökyüzüne dağılır ve nereye bakarsanız bakın gökyüzünün maviliği bu saçılan mavi ışıktan gelir.

## Peki ya mor?

Morun dalga boyu maviden bile kısadır ve daha da fazla saçılır. Ama gökyüzü mor görünmez, çünkü Güneş daha az mor ışık yayar ve gözlerimiz ona çok daha az duyarlıdır; bu yüzden gökyüzünü mavi algılarız.

## Kırmızı gün batımları

Gün doğumu ve gün batımına yakın, güneş ışığı bize ulaşmak için atmosferin çok daha kalın bir diliminden geçer. Bu yol boyunca o kadar çok mavi ışık saçılır ki çoğunlukla uzun dalga boyları kalır ve gökyüzünü kırmızıya, turuncuya ve pembeye boğar.

## Aynı fizik başka yerlerde

Rayleigh saçılması ayrıca uzak nesnelerin neden mavimsi göründüğünü ve uzaydan görülen Dünya atmosferinin ufukta neden ince bir mavi çizgi gösterdiğini de açıklar.`,
  },
  {
    title: 'Antibiyotik Direnci',
    question: 'Antibiyotikler neden etkisini yitiriyor?',
    summary:
      'Antibiyotik direnci; bakteriler onları öldürmek için tasarlanan ilaçlardan kurtulacak biçimde evrildiğinde ortaya çıkar; aşırı ve yanlış kullanımla hızlanır ve yaygın enfeksiyonları yeniden tehlikeli kılmakla tehdit eder.',
    tags: ['sağlık', 'tıp', 'biyoloji', 'evrim', 'bilim'],
    language: 'tr',
    content: `# Antibiyotik Direnci

Antibiyotik direnci, küresel sağlığa yönelik en ciddi tehditlerden biridir. Bakteriler, daha önce onlara karşı etkili olan antibiyotiklerce artık öldürülmeyecek biçimde evrildiğinde ortaya çıkar ve enfeksiyonların tedavisini zorlaştırır — kimi zaman olanaksızlaştırır.

## Direnç nasıl ortaya çıkar

Antibiyotikler duyarlı bakterileri öldürür, ama bakteri toplulukları devasa ve çeşitlidir. Rastlantıyla bazıları, hayatta kalmaya yardım eden mutasyonlar taşır. Bir antibiyotik duyarlı bakterileri ortadan kaldırdığında, dirençli olanlar hayatta kalır ve çoğalır — bu, iş başında **doğal seçilimdir**. Bakteriler ayrıca direnç genlerini doğrudan birbirleriyle değiş tokuş eder ve bu yeteneği hızla yayar.

## Sorunu ne hızlandırır

Birkaç etken direnci ağırlaştırır:

- Antibiyotiklerin **aşırı kullanımı**, etkili olmadıkları soğuk algınlığı gibi viral enfeksiyonlar için bile.
- **Eksik tedavi**, hastalar ilacı çok erken bıraktığında en dirençli mikropların hayatta kalmasına izin verir.
- **Tarımda yoğun kullanım**, sağlıklı hayvanlara büyümeyi hızlandırmak için antibiyotik verilir.

Her maruz kalış, bakterilere savunma geliştirmek için daha çok fırsat verir.

## Neden önemli

Antibiyotikler modern tıbbı destekler — yalnızca enfeksiyonları tedavi etmez, ameliyatı, kemoterapiyi ve doğumu güvenli kılar. Kimi zaman "süper mikroplar" denen dirençli bakteriler, bu ilerlemeyi geri almakla tehdit eder ve bizi çiziklerin ve yaygın enfeksiyonların ölümcül olabildiği bir çağa döndürebilir.

## Ne işe yarar

Çözümler; antibiyotikleri yalnızca gerektiğinde kullanmayı, verilen tedavileri tamamlamayı, hijyeni ve enfeksiyon denetimini iyileştirmeyi, tarımsal kullanımı sınırlamayı ve yeni antibiyotikler ile alternatif tedavilerin araştırmasına yatırım yapmayı içerir.`,
  },
  {
    title: 'Azot Döngüsü',
    question: 'Azot, canlılar ile çevre arasında nasıl dolaşır?',
    summary:
      'Azot döngüsü; tepkimesiz azot gazını canlıların kullanabileceği biçimlere çevirir ve onu atmosfere geri verir; bakteriler, bitkiler ve ayrışma yoluyla tüm yaşamı besler.',
    tags: ['biyoloji', 'kimya', 'ekoloji', 'yer bilimi', 'bilim'],
    language: 'tr',
    content: `# Azot Döngüsü

Azot yaşam için zorunludur — proteinlerin ve DNA'nın anahtar bir bileşenidir. Dünya atmosferi %78 azot gazı olsa da, çoğu canlı bu biçimi doğrudan kullanamaz. Azot döngüsü, azotu kullanılabilir biçimlere çeviren ve sonunda havaya geri veren süreçler bütünüdür.

## Tepkimesiz azot sorunu

Atmosferik azot gazı (N₂) olağanüstü kararlıdır: iki atomu, kırılması çok enerji isteyen bir üçlü bağla birleşmiştir. Bitkiler ve hayvanlar azotu kullanabilmeden önce, onun amonyak ya da nitrat gibi daha tepkin biçimlere "bağlanması" gerekir.

## Ana aşamalar

- **Bağlama.** Özel bakteriler — çoğu fasulye gibi baklagillerin köklerinde yaşar — N₂'yi amonyağa çevirir. Şimşekler ve sanayi gübreleri de azotu bağlar.
- **Nitrifikasyon.** Başka bakteriler amonyağı nitrite, sonra nitrata çevirir; bu, bitkilerin en kolay soğurduğu biçimdir.
- **Özümseme.** Bitkiler azot bileşiklerini alıp protein yapmak için kullanır; hayvanlar azotu bitki yiyerek elde eder.
- **Amonifikasyon.** Ayrıştırıcılar, atıkları ve ölü canlıları parçalayarak azotu toprağa amonyak olarak geri verir.
- **Denitrifikasyon.** Yine başka bakteriler nitratı azot gazına geri çevirir, onu atmosfere geri verir ve döngüyü kapatır.

## İnsan etkisi

Azotun sanayide bağlanmasının (Haber-Bosch süreci) icadı, besin üretimini muazzam artırdı, ama fazla gübre ırmaklara ve okyanuslara akar. Orada oksijeni tüketen ve "ölü bölgeler" yaratan denetimsiz alg patlamalarını besler; bu da doğal bir döngünün dengesizliğinin ne denli geniş kapsamlı sonuçlar doğurduğunu gösterir.`,
  },
  {
    title: 'Bellek Nasıl Çalışır',
    question: 'Beyin anıları nasıl saklar ve geri çağırır?',
    summary:
      'Bellek; beynin nöron ağları aracılığıyla bilgiyi kodlaması, saklaması ve geri çağırmasıdır; farklı sistemleri kapsar ve kusursuz bir kayıt değil, yeniden kurucu bir süreçtir.',
    tags: ['beyin', 'psikoloji', 'biyoloji', 'öğrenme', 'bilim'],
    language: 'tr',
    content: `# Bellek Nasıl Çalışır

Bellek, beynin bilgiyi kodlama, saklama ve geri çağırma yeteneğidir. Bir video kaydedicisinden çok uzak; kim olduğumuzu biçimlendiren etkin, yeniden kurucu bir sistemdir.

## Üç temel aşama

- **Kodlama.** Duyulardan gelen bilgi, beynin saklayabileceği bir biçime çevrilir.
- **Saklama.** Bu bilgi zaman içinde tutulur, saniyelerden bir ömre dek.
- **Geri çağırma.** Saklanan bilgi gerektiğinde geri getirilir — anımsama edimi.

## Bellek türleri

Bellek tek bir şey değildir. Psikologlar onu farklı sistemlere ayırır:

- **Duyusal bellek**, saniyenin kesirleri kadar süren kısa izlenimleri tutar.
- **Kısa süreli (ya da işleyen) bellek**, onu kullandığınız sürece az miktarda bilgiyi saniyelerce tutar.
- **Uzun süreli bellek**, bilgiyi uzun süreler saklar ve çok geniş bir sığası vardır. **Açık** anıları (bilinçli olarak çağırdığınız olgular ve olaylar) ve **örtük** anıları (bisiklete binmek gibi beceriler ve alışkanlıklar) içerir.

## Fiziksel temel

Anılar, nöronlar arasındaki bağlantı desenleri olarak saklanır. Öğrenirken belirli nöronlar arasındaki sinapslar güçlenir — çoğu zaman "birlikte ateşlenen nöronlar birlikte bağlanır" diye özetlenen bir ilke. Kararlı bir anının pekişmesi, uykuya ve beyindeki **hipokampüs** denen bir bölgeye güçlü biçimde bağlıdır.

## Bellek neden yanıltır — ve bizi aldatır

Bellek yeniden kurucudur: bir anıyı her geri çağırdığımızda onu yeniden birleştiririz ve farkında olmadan değiştirebiliriz. Bu, anıların neden canlı ama yine de yanlış olabileceğini, görgü tanıklıklarının neden güvenilmez olduğunu ve yinelemenin ile çağrışımların bilgiyi tutmaya neden yardım ettiğini açıklar.`,
  },
  // ── Batch 5: Uzay ve astronomi ──
  {
    title: 'Ayın Evreleri',
    question: 'Ay neden ay boyunca biçim değiştirir?',
    summary:
      "Ayın evreleri; gezegenimizin çevresinde dönerken güneş ışığının ona vurma biçiminden kaynaklanan, Dünya'dan görülen aydınlık kısmının değişen biçimleridir.",
    tags: ['astronomi', 'ay', 'uzay', 'bilim', 'güneş sistemi'],
    language: 'tr',
    content: `# Ayın Evreleri

Ay, yaklaşık bir ay boyunca biçim değiştiriyor gibi görünür; ince bir hilalden dolunaya ve geri döner. Bu **evreler**, Dünya'nın düşürdüğü bir gölgeden değil, güneş ışığının Ay'a nasıl vurduğu ile ona hangi açıdan baktığımızın birleşiminden doğar.

## Gerçek neden

Ayın yarısı her zaman Güneş'le aydınlıktır, tıpkı Dünya'nın yarısının gündüzü yaşaması gibi. Ama Ay, Dünya'nın çevresinde döndükçe o aydınlık yarının farklı miktarlarını görürüz. Ay bize göre Güneş'in karşı tarafındayken, aydınlık yüzün tamamını görürüz — **dolunay**. Bizimle Güneş arasındayken, bize dönük yüz karanlıktır — **yeniay**.

## Evreler döngüsü

Tam döngü yaklaşık 29,5 gün sürer ve sekiz evreden geçer:

1. **Yeniay** — neredeyse görünmez.
2. **Büyüyen hilal** — ince bir dilim görünmeye başlar.
3. **İlk dördün** — yarısı aydınlık, dolmayı sürdürür.
4. **Büyüyen şişkin ay** — yarıdan fazlası aydınlık.
5. **Dolunay** — tüm disk aydınlık.
6. **Küçülen şişkin ay** — azalmaya başlar.
7. **Son dördün** — karşı taraftan, yine yarım ay.
8. **Küçülen hilal** — yeniayın dönüşünden önce ince bir dilim.

"Büyüyen" aydınlık kısmın arttığı; "küçülen" azaldığı anlamına gelir.

## Aynı yüz

Ayın kendi ekseninde bir kez dönmesi ile Dünya'nın çevresinde dönmesi aynı süreyi alır; bu olguya **eşzamanlı dönme** denir. Bu yüzden bize hep aynı yüzünü gösterir ve "uzak taraf" Dünya'dan hiç görünmez.`,
  },
  {
    title: 'Kuyrukluyıldızlar',
    question: 'Kuyrukluyıldızlar nedir ve nereden gelir?',
    summary:
      "Kuyrukluyıldızlar; güneş sisteminin oluşumundan artakalan, Güneş'e yaklaştıklarında ve ısı buzlarını buharlaştırdığında parlak kuyruklar geliştiren buzlu cisimlerdir.",
    tags: ['astronomi', 'kuyrukluyıldızlar', 'uzay', 'güneş sistemi', 'bilim'],
    language: 'tr',
    content: `# Kuyrukluyıldızlar

Kuyrukluyıldızlar, gece gökyüzünün en görkemli cisimlerinden bazılarıdır: Güneş'e yaklaştıklarında canlanan buz ve toz topları. Çoğu zaman "kirli kar topları" diye anılırlar ve erken güneş sisteminin donmuş kalıntılarıdır.

## Neyden yapılmışlardır

Bir kuyrukluyıldızın kalbi **çekirdektir**; yalnızca birkaç kilometre genişliğinde, buz, toz, kaya ve donmuş bileşiklerden oluşan katı bir karışım. Milyarlarca yıl boyunca güneş sisteminin buzlu kıyılarında donmuş kalırlar.

## Kuyrukları neden büyür

Bir kuyrukluyıldızın yörüngesi onu Güneş'e yaklaştırdığında, ısı buzunu doğrudan gaza çevirir; bu sürece **süblimleşme** denir. Bu, çekirdeğin çevresinde bulanık, parlak bir atmosfer — **koma** — oluşturur ve toz salar. Güneş ışınımının basıncı ve güneş rüzgârı bu maddeyi Güneş'ten uzağa iter ve milyonlarca kilometre uzanabilen bir ya da daha çok **kuyruk** yaratır. Bu yüzden bir kuyrukluyıldızın kuyruğu her zaman hareketinin gerisine değil, Güneş'in karşı yönüne işaret eder.

## Nereden gelirler

Çoğu kuyrukluyıldız iki uzak bölgeden gelir:

- **Kuiper kuşağı**, Neptün'ün ötesinde buzlu cisimlerden oluşan bir disk; birçok kısa dönemli kuyrukluyıldızın kaynağı.
- **Oort bulutu**, güneş sistemini saran çok daha uzak küresel bir kabuk; uzun dönemli kuyrukluyıldızların kaynağı.

## Geçmişten ziyaretçiler

Kuyrukluyıldızlar güneş sisteminin ilk günlerinden donmuş madde sakladığından, zaman kapsülleri gibidir. Bilim insanları onları 4,6 milyar yıl önceki koşulları öğrenmek için inceler; bazıları kuyrukluyıldızların erken Dünya'ya su ve organik moleküller getirmeye yardım ettiğinden kuşkulanır.`,
  },
  {
    title: 'Bir Yıldızın Yaşam Döngüsü',
    question: 'Yıldızlar nasıl doğar, yaşar ve ölür?',
    summary:
      'Yıldızlar çöken gaz bulutlarından oluşur, elementleri kaynaştırarak milyonlarca ya da milyarlarca yıl parlar ve kütlelerine göre farklı biçimlerde ölür — ak cücelerden süpernovalara dek.',
    tags: ['astronomi', 'yıldızlar', 'uzay', 'fizik', 'bilim'],
    language: 'tr',
    content: `# Bir Yıldızın Yaşam Döngüsü

Yıldızlar sonsuz gibi görünür, ama devasa zaman ölçeklerinde doğar, yaşar ve ölür. Bir yıldızın yazgısı neredeyse tümüyle tek bir özelliğe bağlıdır: **kütlesi**.

## Doğum

Yıldızlar, **bulutsu** denen devasa gaz ve toz bulutlarının içinde doğar. Bir bölge yeterince yoğunlaştığında yerçekimi onu çökertir ve ısıtır. Çekirdek yaklaşık 10 milyon dereceye ulaştığında **çekirdek kaynaşması** başlar — hidrojen atomları helyuma kaynaşır ve enerji salar. Bir yıldız doğmuştur.

## Orta yaş

Yaşamının çoğunda bir yıldız, içe doğru sıkıştıran yerçekimi kuvvetini dışa doğru iten kaynaşma basıncıyla dengeleyerek **anakol** üzerinde bulunur. Güneşimiz yaklaşık 4,6 milyar yıldır bu kararlı evrededir ve 5 milyar yıl daha sürecektir. Daha küçük, daha soğuk yıldızlar yakıtını yavaş yakar ve trilyonlarca yıl yaşar; büyük, sıcak olanlar yakıtını yalnızca birkaç milyon yılda tüketir.

## Ölüm

Bir yıldızın sonu kütlesine bağlıdır:

- **Güneş gibi yıldızlar**, şişerek **kırmızı dev** olur, dış katmanlarını atar ve geride **ak cüce** denen yoğun, soğuyan bir çekirdek bırakır.
- **Çok daha kütleli yıldızlar**, kısa bir an için koca bir gökadadan daha parlak olabilen **süpernova** denen yıkıcı bir patlamayla son bulur. Geriye kalan, aşırı yoğun bir **nötron yıldızı** ya da yıldız yeterince kütleliyse bir **karadelik** olur.

## Kozmik fırınlar

Yıldızlar evrenin fabrikalarıdır. İçlerindeki kaynaşma ve onları sona erdiren patlamalar, hidrojenden ağır neredeyse tüm elementleri yarattı — içinizdeki karbon ve oksijen dahil. Sözcüğün tam anlamıyla yıldız tozundan yapıldık.`,
  },
  {
    title: 'Kutup Işıkları',
    question: 'Kuzey ve güney ışıklarına ne yol açar?',
    summary:
      "Kutup ışıkları; Güneş'ten gelen yüklü parçacıkların gezegenin manyetik alanıyla yönlendirilerek atmosfer gazlarıyla çarpışmasıyla oluşan, Dünya'nın kutuplarına yakın renkli ışık gösterileridir.",
    tags: ['astronomi', 'atmosfer', 'fizik', 'uzay', 'bilim'],
    language: 'tr',
    content: `# Kutup Işıkları

Kutup ışıkları — **kuzey ışıkları** (aurora borealis) ve **güney ışıkları** (aurora australis) — doğanın en görkemli gösterilerinden biridir: kutup gökyüzünde dans eden yeşil, pembe ve mor ışıktan parıldayan perdeler.

## Neden: güneş rüzgârı

Işıklar Güneş'te başlar; Güneş, **güneş rüzgârı** denen bir yüklü parçacık akışını durmaksızın üfler. Bu parçacıklar Dünya'ya ulaştığında çoğu, gezegenin **manyetik alanıyla** saptırılır. Ama manyetik kutuplara yakın yerlerde alan çizgileri atmosfere dalar ve bazı parçacıkları aşağı doğru kanalize eder.

## Işığın yaratılması

Üst atmosfere dalan bu enerjik parçacıklar, gaz atomlarına ve moleküllerine çarpar. Çarpışmalar gazları uyarır — elektronlarını daha yüksek enerji düzeylerine iter. Elektronlar normale döndüğünde, fazla enerjiyi ışık olarak salar. Farklı gazlar farklı renklerde ışıldar:

- **Oksijen**, yeşil (en yaygın) ve yüksek irtifalarda kırmızı verir.
- **Azot**, mavi ve mor verir.

## Neden kutuplara yakın

Dünya'nın manyetik alanının biçimi parçacıkları kutup bölgelerine doğru kanalize ettiğinden, ışıklar yüksek enlemlerde, **kutup ışığı ovalleri** denen halkaların çevresinde en yaygındır. Güçlü güneş fırtınaları sırasında olağandan çok daha ekvatora yakın görülebilir.

## Dünya'nın ötesinde

Kutup ışıkları yalnızca Dünya'ya özgü değildir. Manyetik alanları ve atmosferleri olan Jüpiter, Satürn ve başka gezegenlerde de benzer gösteriler gözlendi — gezegenimizin Güneş'le hareket eden bir güneş sisteminin parçası olduğunun bir anımsatıcısı.`,
  },
  {
    title: 'Işık Yılları ve Kozmik Uzaklıklar',
    question: 'Işık yılı nedir ve astronomlar uzayı nasıl ölçer?',
    summary:
      'Işık yılı, ışığın bir yılda kat ettiği uzaklıktır; astronomlar onu ve ıraklık açısı (paralaks) gibi teknikleri yıldızlar ile gökadalar arasındaki uçsuz bucaksız uzaklıkları ölçmek için kullanır.',
    tags: ['astronomi', 'uzay', 'uzaklık', 'fizik', 'bilim'],
    language: 'tr',
    content: `# Işık Yılları ve Kozmik Uzaklıklar

Uzaydaki uzaklıklar o kadar uçsuz bucaksızdır ki kilometreler işe yaramaz olur. Kozmosu ölçmek için astronomlar **ışık yılını** — ve şeylerin gerçekte ne kadar uzak olduğunu belirlemek için ustaca bir teknikler merdivenini — kullanır.

## Işık yılı nedir

Işık yılı bir **uzaklık** ölçüsüdür, zaman değil: ışığın bir yılda kat ettiği uzaklıktır, yaklaşık 9,5 trilyon kilometre. Işık sonlu bir hızda gittiğinden, uzaya bakmak geçmişe bakmaktır. Güneş dışındaki en yakın yıldız yaklaşık 4,2 ışık yılı uzaktadır, bu yüzden onu dört yıldan fazla önceki hâliyle görürüz. Bazı gökadaları milyarlarca yıl önceki hâlleriyle görürüz.

## Yakın uzaklıkları ölçmek: paralaks

Görece yakın yıldızlar için astronomlar **paralaksı** kullanır. Bir yıldıza Dünya'nın yörüngesinin karşıt yanlarından (altı ay arayla) bakıldığında, yıldız daha uzak arka plana göre biraz kayar gibi görünür. Kayma ne kadar büyükse yıldız o kadar yakındır. Bu, sırayla bir gözünüzü kapatıp başparmağınızın zıpladığını görmenizle aynı etkidir.

## Daha büyük uzaklıkları ölçmek

Paralaksın erişiminin ötesinde astronomlar "standart mumlar" kullanır — gerçek parlaklığı bilinen cisimler. Gerçek parlaklıklarını ne kadar sönük göründükleriyle karşılaştırarak uzaklık çıkarılır. **Sefe değişen yıldızları** ve belirli bir **süpernova** türü bu mumlar olarak iş görür ve uzak gökadalara dek uzaklıkları ölçmeyi sağlar.

## Alçaltıcı bir ölçek

Bu araçlar şaşırtıcı genişlikte bir evren açığa çıkarır: milyarlarca gökada, her birinde milyarlarca yıldız, o kadar büyük uzaklıklara serpilmiş ki bugün yakaladığımız ışık, Dünya var olmadan çok önce yola çıkmıştı.`,
  },
  {
    title: 'Ötegezegenler',
    question: 'Ötegezegenler nedir ve onları nasıl buluruz?',
    summary:
      'Ötegezegenler, başka yıldızların çevresinde dönen gezegenlerdir; binlercesi dolaylı yöntemlerle keşfedildi, bazıları sıvı suyun bulunabileceği yaşanabilir bölgede.',
    tags: ['astronomi', 'ötegezegenler', 'uzay', 'bilim', 'keşif'],
    language: 'tr',
    content: `# Ötegezegenler

Ötegezegen, Güneşimiz dışında bir yıldızın çevresinde dönen bir gezegendir. Yüzyıllarca böyle dünyaları yalnızca hayal edebildik; bugün binlercesini biliyoruz ve bu bilim, evrendeki yerimize bakışımızı dönüştürdü.

## Neden görmesi zor

Ötegezegenleri doğrudan gözlemek son derece zordur. Kendi ışıklarını yaymazlar ve yıldızlarının yoğun parıltısında kaybolurlar — bir projektörün yanındaki bir ateş böceğini görmeye çalışmak gibi. Bu yüzden neredeyse tüm ötegezegenler **dolaylı** yollarla bulunur.

## Onları nasıl buluruz

Aramaya iki yöntem egemendir:

- **Geçiş yöntemi.** Bir gezegenin yörüngesi bizimle yıldızı arasından geçerse, yıldızın ışığının küçücük bir kesrini engeller. Parlaklıktaki bu küçük düzenli düşüşleri ölçmek gezegeni açığa çıkarır ve boyutunu gösterir. Kepler uzay teleskobu bu yöntemle binlerce dünya buldu.
- **Dikine hız yöntemi.** Dönen bir gezegen, yıldızını yerçekimiyle hafifçe çeker ve onu yalpalatır. Bu yalpa, yıldızın ışığını biraz kaydırır ve gezegenin varlığını ile kütlesini açığa çıkarır.

## Şaşırtıcı bir çeşitlilik

Ötegezegenler inanılmaz çeşitli çıktı: yıldızlarına yapışık dönen dev gazlı "sıcak Jüpiterler", gezegenimizden büyük kayalık "süper Dünyalar" ve iki güneşli dünyalar. Birçok sistem bizimkine hiç benzemez.

## Yaşam arayışı

En çok istenen ödül, **yaşanabilir bölgede** — yüzeyde sıvı suyun bulunabileceği, bir yıldıza olan uzaklıkta — gezegenler bulmaktır. Yeni teleskoplar, yaşama işaret edebilecek gazlar için ötegezegenlerin atmosferlerini çözümlemeye başlıyor ve "yalnız mıyız?" sorusunu sonunda sınanabilir kılıyor.`,
  },
  {
    title: 'Büyük Patlama',
    question: 'Evren nasıl başladı?',
    summary:
      'Büyük Patlama kuramı; evrenin yaklaşık 13,8 milyar yıl önce sıcak, yoğun bir durumdan genişlediğini betimler ve kozmik artık parıltı ile uzaklaşan gökadalar gibi kanıtlarla desteklenir.',
    tags: ['astronomi', 'kozmoloji', 'evren', 'fizik', 'bilim'],
    language: 'tr',
    content: `# Büyük Patlama

Büyük Patlama kuramı, evrenin nasıl başladığının en iyi bilimsel açıklamasıdır. Tüm uzayın, zamanın, maddenin ve enerjinin yaklaşık **13,8 milyar yıl önce** olağanüstü sıcak ve yoğun bir durumdan ortaya çıktığını ve evrenin o zamandan beri genişlediğini savunur.

## Uzayda bir patlama değildi

Adına karşın Büyük Patlama, maddeyi önceden var olan boş bir uzaya saçan bir patlama değildi. **Uzayın kendisinin** hızlı genişlemesiydi; bugün gördüğümüz her şeyin akıl almaz ölçüde küçük, sıcak ve yoğun bir hacme sıkıştığı bir durumdan. Uzay genişledikçe soğudu ve madde yavaş yavaş oluşup kümelenebildi.

## Kanıtlar

Kuramı üç temel gözlem destekler:

- **Uzaklaşan gökadalar.** 1920'lerde Edwin Hubble, uzak gökadaların bizden uzaklaştığını ve ne kadar uzaksa o kadar hızlı olduğunu keşfetti — tam da genişleyen bir evrenden beklenecek şey.
- **Kozmik mikrodalga arka plan ışınımı.** Gökyüzünün her yönünden sönük bir mikrodalga parıltı gelir — erken evrenin soğumuş artık ısısı, keşfedilmeden önce öngörülmüştü.
- **Hafif elementlerin bolluğu.** Gözlenen hidrojen ve helyum oranları, evrenin ilk birkaç dakikasındaki tepkimelerin öngördüğüyle tam olarak örtüşür.

## Sonra ne oldu

Evren soğudukça madde atomları, sonra yıldızları oluşturdu ve bunlar gökadalarda kümelendi. Milyarlarca yıl boyunca yerçekimi, bugün gördüğümüz yapıları inşa etti.

## Büyük Patlama'nın açıklamadığı

Kuram, evrenin başlangıçtan saniyenin bir kesri sonrasından itibaren nasıl evrildiğini betimler, ama onu neyin "yol açtığını" ya da "öncesinde" ne olduğunu söylemez — bilimin en derin sorularından biri olmayı sürdüren sorular.`,
  },
  {
    title: 'Tutulmalar',
    question: 'Güneş ve Ay tutulmalarına ne yol açar?',
    summary:
      "Tutulmalar; Güneş, Dünya ve Ay hizalandığında bir cismin gölgesini bir diğerinin üzerine düşürmesiyle oluşur; Güneş tutulmaları Güneş'i örter, Ay tutulmaları dolunayı karartır.",
    tags: ['astronomi', 'ay', 'güneş', 'uzay', 'bilim'],
    language: 'tr',
    content: `# Tutulmalar

Bir tutulma; Güneş, Dünya ve Ay öyle hizalandığında olur ki biri gölgesini bir diğerinin üzerine düşürür. Bu etkileyici olaylar bir zamanlar uğursuzluk belirtisi diye korkulurdu; bugün onları güzel ve öngörülebilir bir gök geometrisi olarak anlıyoruz.

## Güneş tutulmaları

Güneş tutulması yeniay sırasında, Ay tam Dünya ile Güneş arasından geçip güneş ışığını engellediğinde olur. Ay Güneş'ten çok daha küçük olsa da yaklaşık 400 kat daha yakındır, bu yüzden ikisi gökyüzünde neredeyse aynı boyutta görünür — dikkat çekici bir rastlantı.

- **Tam** Güneş tutulmasında Ay, Güneş'i tümüyle örter; kısa anlar için Güneş'in sönük dış atmosferini — **taç (korona)** — açığa çıkarır ve gündüzü alacakaranlığa çevirir.
- **Parçalı** tutulmada Güneş'in yalnızca bir bölümü örtülür.
- **Halkalı** tutulmada Ay biraz daha uzaktadır ve silüetinin çevresinde parlak bir "ateş halkası" bırakır.

## Ay tutulmaları

Ay tutulması dolunay sırasında, Dünya Güneş ile Ay arasına girip gölgesini Ay'ın üzerine düşürdüğünde olur. Güneş tutulmalarının tersine, çıplak gözle izlemek güvenlidir ve Dünya'nın tüm gece tarafından aynı anda görülür.

**Tam** bir Ay tutulması sırasında Ay, çoğu zaman kızıl bir renk alır — sözde "kanlı Ay" — çünkü Dünya'nın atmosferi kızılımsı güneş ışığını yüzeyine kırar.

## Neden her ay olmaz

Ayın yörüngesi Dünya'nınkine göre hafifçe eğiktir, bu yüzden Ay genellikle tam hizalanmanın biraz üstünden ya da altından geçer. Tutulmalar yalnızca üç cismin tam olarak hizalandığı birkaç durumda olur; bu da her birini özel bir olay kılar.`,
  },
  // ── Batch 6: Sanat, dil ve kültür ──
  {
    title: 'Renk Kuramı',
    question: 'Renkler nasıl işler ve bazıları neden uyumludur?',
    summary:
      'Renk kuramı; renklerin nasıl ilişkili olduğunu, karıştığını ve uyuştuğunu açıklar ve sanatçılara, tasarımcılara ve renkle çalışanlara yol göstermek için renk çemberi gibi araçlar kullanır.',
    tags: ['sanat', 'tasarım', 'renk', 'görsel', 'kültür'],
    language: 'tr',
    content: `# Renk Kuramı

Renk kuramı; renklerin birbiriyle nasıl ilişkili olduğunu, nasıl karıştığını ve bir araya getirildiğinde nasıl farklı etkiler ürettiğini betimleyen ilkeler bütünüdür. Sanatçılar, tasarımcılar ve dekoratörler bunu uyumlu ya da karşıtlık dolu görüntüler yaratmak için kullanır.

## Renk çemberi

Merkezî araç **renk çemberidir**; renkleri ilişkilerini göstermek için bir halkaya dizer. Üç küme çevresinde örgütlenir:

- **Birincil renkler** (geleneksel pigment modelinde: kırmızı, sarı ve mavi) başkalarını karıştırarak elde edilemez.
- **İkincil renkler** (yeşil, turuncu, mor) iki birincilin karışımından doğar.
- **Üçüncül renkler** bir birincilin komşu bir ikincille karışımından doğar.

## Işık ve pigment karıştırmak

Rengin ortama göre farklı biçimlerde karıştığını kavramak çok önemlidir. **Işığı** karıştırmak (ekranlardaki gibi) **toplamsaldır** — kırmızı, yeşil ve maviyi birleştirmek beyaz üretir. **Pigmentleri** karıştırmak (boyalardaki gibi) **çıkarımsaldır** — birçok rengi birleştirmek koyuya ve çamurumsuya kaçar.

## Renk düzenleri

Kuram, çoğu zaman göze hoş gelen birleşimleri betimler:

- **Tamamlayıcı:** çemberde karşılıklı renkler (mavi ve turuncu gibi), canlı bir karşıtlık yaratır.
- **Komşu (analog):** yakın renkler (mavi, mavi-yeşil ve yeşil gibi), uyum yaratır.
- **Üçlü (triadik):** eşit aralıklı üç renk, çeşitlilik ile dengeyi gözetir.

## Estetikten fazlası

Renkler ayrıca bir **sıcaklık** (sıcak kırmızılar ve turuncular; soğuk maviler ve yeşiller) ve ruh hâlini ile anlamı etkileyen ruhsal çağrışımlar taşır. Bu etkileri anlamak, kimi birleşimlerin bize neden enerjik, sakin ya da gergin geldiğini açıklamaya yardım eder.`,
  },
  {
    title: 'Çizgisel Perspektif',
    question: 'Sanatçılar düz bir yüzeyde derinlik yanılsamasını nasıl yaratır?',
    summary:
      'Çizgisel perspektif; düz bir yüzeyde üç boyutlu derinlik yanılsaması yaratmak için yakınsayan çizgileri ve kaçış noktalarını kullanan, Rönesans sanatında devrim yaratan bir tekniktir.',
    tags: ['sanat', 'tarih', 'teknik', 'görsel', 'kültür'],
    language: 'tr',
    content: `# Çizgisel Perspektif

Çizgisel perspektif, düz bir yüzeyde derinlik ve uzam yanılsaması yaratmanın bir yöntemidir. Rönesans İtalya'sında kurallaştırılan teknik, sanatçıların dünyayı tek bir bakış noktasından görüldüğü gibi gerçekçi biçimde göstermesine olanak vererek resmi dönüştürdü.

## Temel fikir

Çizgisel perspektif basit bir gözleme dayanır: paralel nesneler uzaklaştıkça birbirine yaklaşıyor gibi görünür. Uzakta birleşiyormuş gibi görünen tren raylarını düşünün. Teknik bunu birkaç anahtar öğeyle kurallaştırır:

- Gözlemcinin göz hizasındaki **ufuk çizgisi**.
- O ufuk üzerinde, uzaklaşan paralel çizgilerin yakınsıyor gibi göründüğü bir ya da daha çok **kaçış noktası**.
- **Dikgen çizgiler**, geri çekilip bir kaçış noktasına yönelen çizgiler.

Nesneler uzaklaştıkça daha küçük ve kaçış noktasına daha yakın çizilir; bu da inandırıcı bir derinlik yaratır.

## Perspektif türleri

- **Tek noktalı perspektif** tek bir kaçış noktası kullanır; bir caddeye ya da koridora doğrudan bakmak için idealdir.
- **İki noktalı perspektif** iki nokta kullanır; bir binanın köşesini göstermekte işe yarar.
- **Üç noktalı perspektif** (üstte ya da altta) üçüncü bir nokta ekler; yukarı ya da aşağı bakan çarpıcı görünümler için.

## Tarihsel bir atılım

Mimar **Filippo Brunelleschi** yaklaşık 1420'de matematiksel perspektifi gösterdi ve teknik kısa sürede Batı sanatının bir temel taşı oldu. İlk kez ressamlar uzamsal olarak tutarlı sahneler kurabildi ve işlerine dikkat çekici bir gerçekçilik kazandırdı.

## Neden önemli

Çizgisel perspektif bir hileden fazlasıdır: ışığın ve görmenin gerçekte nasıl işlediğini yansıtır. Aynı ilkeler bugün teknik çizimi, mimarlığı, video oyunlarını ve bilgisayar grafiklerini destekler.`,
  },
  {
    title: 'Armoni ve Müzik Dizileri',
    question: 'Müzik notalarını birlikte güzel kılan nedir?',
    summary:
      'Armoni ve diziler, ses frekansları arasındaki matematiksel ilişkilere dayanır; basit oranlı notalar uyumlu duyulur ve müziğin yapı taşlarını oluşturur.',
    tags: ['müzik', 'ses', 'matematik', 'sanat', 'kültür'],
    language: 'tr',
    content: `# Armoni ve Müzik Dizileri

Bazı nota birleşimleri neden hoş, bazıları neden gergin duyulur? Yanıt; fizik, matematik ve insan algısı arasındaki büyüleyici bir etkileşimde yatar.

## Ses titreşimdir

Bir müzik notası, belirli bir frekansta titreşen bir şeyle üretilir; bu frekans hertz (saniyedeki titreşim) ile ölçülür. Daha hızlı titreşim daha tiz; daha yavaşı daha pes duyulur. İki notanın frekansları arasındaki oran, birlikte nasıl duyulduklarını belirler.

## Basit oranlar uyumlu duyulur

Antik Yunan'a dek uzanan anahtar sezgi şudur: frekansları **basit oranlar** oluşturan notalar uyumlu (kararlı ve hoş) duyulur:

- **Oktav**, 2:1 oranıdır — bir frekans diğerinin tam iki katı. İki nota o kadar benzer duyulur ki aynı adı alır.
- **Tam beşli**, 3:2 oranıdır; en hoş birleşimlerden biri.
- **Tam dörtlü**, 4:3'tür.

Daha karmaşık oranlar daha uyumsuz, ya da gergin duyulma eğilimindedir — müziğin gerilim yaratmak ve sonra çözmek için bilerek kullandığı bir şey.

## Dizilerin kuruluşu

Bir **dizi**, bir oktav içinde seçilmiş bir nota sırasıdır. Batı müziğinin çoğu, 12 eşit aralıklı perde kullanır; bunlardan **majör** (genellikle neşeli ve aydınlık) ile **minör** (çoğu zaman daha karanlık ya da hüzünlü) gibi yedi notalı diziler türetilir. Başka kültürler, kendi ayırt edici desenleriyle farklı diziler kullanır.

## Armoni

**Armoni**, aynı anda çalınan birden çok notanın sesidir; genellikle **akorlar** hâlinde. Akor ilerleyişleri devinim yaratır — kararlılıktan gerilime ve geri çözüme doğru ilerleyerek — ve bu da müziğe duygusal gücünün büyük bölümünü verir.`,
  },
  {
    title: 'Etimoloji',
    question: 'Sözcükler nereden gelir?',
    summary:
      'Etimoloji; sözcüklerin kökeninin ve anlamları ile biçimlerinin zaman içinde nasıl değiştiğinin incelenmesidir; tarihi, kültürel temasları ve diller arasındaki bağları açığa çıkarır.',
    tags: ['dil', 'sözcükler', 'tarih', 'dil bilimi', 'kültür'],
    language: 'tr',
    content: `# Etimoloji

Etimoloji, sözcüklerin kökeninin incelenmesidir: nereden geldikleri, biçimlerinin ve anlamlarının nasıl değiştiği ve başka dillerin sözcükleriyle nasıl ilişkili oldukları. Her sözcük, içinde tarihin bir parçasını taşır.

## Sözcüklerin geçmişini izlemek

Etimologlar, bir sözcüğün tarihini onu daha eski biçimlerle ve akraba dillerdeki kökteş sözcüklerle karşılaştırarak araştırır. Örneğin İngilizce *mother* ile Almanca *Mutter* sözcüklerinin ikisi de ortak bir eski kökten iner; bu da İngilizcenin, Almancanın ve daha pek çok dilin **Hint-Avrupa** ailesine ait olduğunun kanıtıdır.

## Sözcükler nasıl değişir

Sözcükler zaman içinde birçok yolla dönüşür:

- **Anlam kayması.** İngilizce *nice* sözcüğü bir zamanlar "aptal" anlamına gelirdi; anlamı yüzyıllar içinde kaydı.
- **Ödünç alma.** Diller birbirinden sözcük alır. Türkçe; Arapçadan (*kitap*, *kalem*), Farsçadan, Fransızcadan ve daha pek çok dilden terimler özümsedi.
- **Ses değişimi.** Söyleyiş kuşaklar boyunca evrilir, kimi zaman düzenli ve öngörülebilir biçimde.
- **Birleştirme ve kısaltma.** Yeni sözcükler, eski sözcükleri birleştirmekten ya da var olanları kısaltmaktan doğar.

## Yanıltıcı izler

Her benzerlik bir akrabalığı göstermez. **Sahte kökteşler**, ilişkili görünen ama olmayan sözcüklerdir; **halk etimolojileri** ise uydurma, çekici ama çoğu zaman yanlış çıkan öykülerdir. Ciddi etimologlar, salt tahmine değil belgelenmiş kanıtlara ve düzenli ses örüntülerine dayanır.

## Neden önemli

Etimoloji tarihi aydınlatır — göçleri, fetihleri, ticareti ve teknolojileri kaydederek. Dilin kendisinin anlaşılmasını da derinleştirir; yoksa ilgisiz görünecek sözcükler arasındaki gizli bağları açığa çıkarır.`,
  },
  {
    title: 'Mitolojinin Amacı',
    question: 'Her insan kültürü neden mit yaratır?',
    summary:
      'Mitler; dünyayı açıklayan, değerleri aktaran ve toplulukları birleştiren geleneksel öykülerdir; tüm insan kültürlerinde görülür ve derin ruhsal ve toplumsal işlevler görür.',
    tags: ['mitoloji', 'kültür', 'tarih', 'öykü anlatımı', 'toplum'],
    language: 'tr',
    content: `# Mitolojinin Amacı

Bilinen her insan kültürü mit yaratmıştır — tanrılar, kahramanlar ve dünyanın kökenleri üzerine geleneksel öyküler. Yalnızca düş ürünü olmaktan çok uzak, mitler toplumların varoluşu anlamlandırmasına yardım eden derin işlevler görür.

## Mit nedir

Mit; çoğu zaman kutsal, uzak bir geçmişte geçen ve dünya ya da insan doğası hakkında temel bir şeyi açıklayan geleneksel bir öyküdür. Mitler, fabllardan (kısa dersler) ve efsanelerden (tarihsel kişilere ya da olaylara dayalı) ayrılır; gerçi kategoriler çoğu zaman örtüşür.

## Mitolojinin işlevleri

Bilginler iç içe geçmiş birkaç rol belirler:

- **Açıklama.** Mitler büyük soruları yanıtlar: dünya nasıl başladı, ölüm neden var, gök gürültüsü ya da mevsimler nereden gelir. Bilimden önce bilinmeyene bir yapı verirdi.
- **Ahlaki ve toplumsal yönlendirme.** Mitler bir kültürün değerlerini, normlarını ve ideallerini aktarır; onurun, cesaretin ve iyi davranışın ne olduğunu gösterir.
- **Toplumsal bağlılık.** Paylaşılan öyküler toplulukları ortak bir kimlik ve bellekle birleştirir, kuşakları bağlar.
- **Ruhsal teselli.** Mitler insanların korkuyla, acıyla ve gizemle baş etmesine yardım eder; tek tek yaşamları daha büyük, anlamlı bir çerçeveye yerleştirir.

## Ortak örüntüler

Çok uzak kültürlerin mitolojileri kimi zaman çarpıcı temaları paylaşır — büyük tufanlar, kaostan yaratılış, sınamalardan geçen kahramanlar. Joseph Campbell gibi bilginler, birçok kahraman öyküsünün ortak bir "yolculuğu" izlediğini savunmuş ve insan imgeleminde paylaşılan örüntülere işaret etmiştir.

## Bugün mitler

Miti çoğu zaman antik dünyayla ilişkilendirsek de öyküler bugün de bu işlevleri görür — din, ulusal yazın ve hatta paylaşılan değerleri taşıyan süper kahraman serileri aracılığıyla.`,
  },
  {
    title: 'Tipografi',
    question: 'Tipografi nedir ve neden önemlidir?',
    summary:
      'Tipografi; metni okunabilir, açık ve anlatımlı kılmak için düzenleme sanatıdır; nasıl okuduğumuzu biçimler ve hem baskıda hem ekranda tonu ve açıklığı etkiler.',
    tags: ['tasarım', 'tipografi', 'iletişim', 'sanat', 'görsel'],
    language: 'tr',
    content: `# Tipografi

Tipografi, metni düzenleme sanatı ve tekniğidir. Yazı tiplerinin, boyutların, boşlukların ve mizanpajın seçimini ve yazılı sözü okunabilir, açık ve anlatımlı kılan her şeyi kapsar. İyi tipografi çoğu zaman fark edilmez, ama her okuyuşumuzu sessizce biçimler.

## Temel kavramlar

- Bir **yazı karakteri (typeface)**, bir işaretler kümesinin tasarımıdır (Helvetica ya da Times New Roman gibi); dar anlamda **font**, onun belirli bir biçimi ya da boyutudur.
- **Tırnaklı (serif)** yazı karakterlerinin harf uçlarında küçük çıkıntılar vardır; **tırnaksız (sans-serif)** olanların yoktur. Tırnaklılar çoğu zaman geleneksel; tırnaksızlar modern ve sade görünür.
- **Karakter aralama (kerning)**, iki belirli işaret arasındaki boşluğun ayarıdır; **izleme (tracking)** genel boşluktur; **satır arası (leading)** ise satırlar arasındaki dikey boşluktur.

## Tipografi neden önemli

Tipografi, hem **seçilebilirliği** (her işareti ayırt etme kolaylığı) hem de **okunabilirliği** (bütün bölümleri okuma kolaylığı) etkiler. İyi seçimler yorgunluğu azaltır, bakışı yönlendirir ve okurun neyin önemli olduğunu çabuk kavramasına yardım eder. Kötü seçimler — sıkışık metin, zayıf karşıtlık, hantal yazı tipleri — yorar ve okuru hatta uzaklaştırır.

## Tonu aktarmak

Yazı karakterleri bir kişilik taşır. Zarif bir tırnaklı, gelenek ve otorite çağrıştırabilir; yuvarlak bir tırnaksız, dostça ve ulaşılabilir görünebilir; el yazısı bir yazı tipi, gayriresmîlik uyandırabilir. Tipograflar, sözcüklerin iletisini güçlendirmek için tona göre seçer.

## Görsel hiyerarşi

Tipografi bir **hiyerarşi** yaratır — neyin başlık, alt başlık ve gövde metni olduğunu göstermek için boyutu, kalınlığı ve boşluğu kullanarak. Bu yapı, okurun içeriği gözden geçirmesine ve bilginin nasıl örgütlendiğini anlamasına yardım eder; ister bir kitapta, ister bir afişte, ister bir web sayfasında olsun.`,
  },
  {
    title: 'Anlatı Yapısı',
    question: 'İyi bir öyküye biçimini ne verir?',
    summary:
      'Anlatı yapısı, bir öyküyü örgütleyen iskelettir — durum, çatışma ve çözüm; üç perdelik yay gibi yaygın örüntüler, kültürler arasında doyurucu öyküler kurmaya yardım eder.',
    tags: ['öykü anlatımı', 'yazma', 'edebiyat', 'sanat', 'kültür'],
    language: 'tr',
    content: `# Anlatı Yapısı

Anlatı yapısı, bir öyküyü örgütleyen alttaki iskelettir — olayların sırası ve sunuluş biçimi. Öyküler engin ölçüde çeşitlense de çoğu, izleyicinin onları izlemesine ve hissetmesine yardım eden paylaşılan örüntülere dayanır.

## Temel yay

Birçok öykü, tanınabilir öğeler taşıyan bir yayı izler:

1. **Serim.** Karakterler, ortam ve durum sunulur.
2. **Yükselen eylem.** Bir çatışma ya da sorun doğar ve gerilim artar.
3. **Doruk.** Dönüm noktası ya da en yoğun an.
4. **Düşen eylem.** Doruğun sonuçları açılır.
5. **Çözülme (sonuç).** Öykü sona erer ve gevşek uçları bağlar.

Bu örüntü çoğu zaman "Freytag piramidi" olarak gösterilir.

## Yaygın yapılar

- **Üç perdelik yay**, öyküyü kuruluş, karşılaşma ve çözüme böler — sinemanın ve tiyatronun büyük bölümünün belkemiği.
- **Kahramanın yolculuğu**, sıradan dünyasını terk eden, sınamalardan geçen, dönüşen ve değişmiş olarak dönen bir başkahramanı betimler — dünyanın her yerindeki mitlerde görülen bir örüntü.

## Yapı neden işler

Yapı, **beklenti ve doyum** yaratır. Çatışmalar kurup sonra onları çözerek, ilginin ve duygunun ritmini denetler. Çözümsüz bir çatışma düş kırıklığı yaratır; biriktirilmiş çatışma olmadan bir çözüm boş gelir. İyi yapı, ikisini dengede tutar.

## Kuralları kırmak

Usta anlatıcılar çoğu zaman yapıyla oynar — ortadan başlayarak (*in medias res*), doğrusal olmayan zaman çizgileri ya da birden çok bakış açısı kullanarak. Ama bu çeşitlemeler genellikle tam da izleyicinin sezgiyle içinde taşıdığı tanıdık yapıyla oynadıkları için etkilidir.`,
  },
  {
    title: 'Sözsüz İletişim',
    question: 'Sözcükler olmadan ne kadar iletişim kurarız?',
    summary:
      'Sözsüz iletişim; beden dilini, yüz ifadelerini, el kol hareketlerini, tonu ve uzamı kapsar; anlamın büyük bölümünü taşır ve çoğu zaman sözcüklerden daha yüksek sesle konuşur.',
    tags: ['iletişim', 'psikoloji', 'kültür', 'davranış', 'toplum'],
    language: 'tr',
    content: `# Sözsüz İletişim

İnsan iletişiminin büyük bölümü tek bir sözcük olmadan gerçekleşir. Sözsüz iletişim — yüz ifadeleri, el kol hareketleri, duruş, ses tonu ve dahası — duyguları, tutumları ve niyetleri, çoğu zaman konuşmanın kendisinden daha güçlü biçimde aktarır.

## Sözsüzün kanalları

Sözsüz iletişim aynı anda birçok kanaldan akar:

- **Yüz ifadeleri.** Yüz, duyguları hızla iletir ve birkaç temel ifade (mutluluk, şaşkınlık ve öfke gibi) kültürler arasında tanınır.
- **El kol hareketi ve beden dili.** Ellerin hareketleri, duruş ve bedeni kullanma biçimi sözcükleri vurgular ya da onların yerini alır.
- **Göz teması.** Bakış; dikkat, meydan okuma ya da yakınlık gösterebilir, anlamı kültürler arasında çok değişir.
- **Yakınlık bilimi (proksemik).** Uzamın kullanımı; yakınlığı, resmiyeti ya da hiyerarşiyi imler.
- **Dil ötesi (paralinguistik).** Ton, ritim, ses yüksekliği ve duraklar sözcüklerin anlamını biçimler — bir şeyin *nasıl* söylendiği, yalnızca ne söylendiği değil.

## Neden önemli

Sözsüz iletişim, iletilerin nasıl alındığını güçlü biçimde biçimler. Aynı "iyiyim", tona ve ifadeye göre içten, alaycı ya da tereddütlü duyulabilir. Sözel ve sözsüz işaretler çeliştiğinde, insanlar sözsüze daha çok güvenme eğilimindedir.

## Kültürel değişkenlik

Bazı ifadeler evrensel olsa da birçok sözsüz işaret her kültüre özgüdür. El kol hareketleri, konuşma için uygun uzaklık ve göz teması kuralları geniş ölçüde değişir; kültürler arasında yanlış anlamalar kolayca doğabilir.

## İşaretleri okumak

Birini açık bir kitap gibi "okuyabileceğine" inanmak çekici olsa da sözsüz işaretler belirsizdir ve tek başına değil, birlikte ve bağlam içinde daha iyi yorumlanır. Yine de onların farkında olmak iletişimi daha zengin ve etkili kılar.`,
  },
];
