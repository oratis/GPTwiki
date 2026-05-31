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
];
