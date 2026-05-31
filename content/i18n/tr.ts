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
];
