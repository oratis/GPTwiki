import type { DraftArticle } from './types';
import { homeEnergyEn } from './home-energy.en';

const promptOf = (key: string): string => {
  const hit = homeEnergyEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const homeEnergyTr: DraftArticle[] = [
  {
    topicKey: 'ev-vs-gas',
    title: 'Elektrikli mi Benzinli mi: Hangisi Gerçekten Sana Uygun?',
    question: 'Elektrikli araba mı benzinli araba mı almalıyım, hangisi gerçekten daha ucuz?',
    summary:
      'Elektrikliler peşin olarak daha pahalı ama yakıt ve bakımda çok daha ucuz, ömür boyu da daha temiz. Benzinliler uzun yolda, hızlı dolumda ve düşük peşin fiyatta kazanır. Doğru seçim, nasıl sürdüğüne ve evde şarj edip edemediğine bağlı.',
    tags: ['ev', 'enerji', 'elektrikli araçlar', 'otomobil'],
    language: 'tr',
    image: { prompt: promptOf('ev-vs-gas'), alt: 'Ev şarjından elektrik çeken elektrikli araç ile yakıtla beslenen benzinli aracın yan yana karşılaştırması' },
    sources: [
      { title: 'ABD Enerji Bakanlığı / fueleconomy.gov — Elektrikli ve benzinli araçların maliyeti ve emisyonu', url: 'https://www.fueleconomy.gov/feg/evtech.shtml' },
      { title: 'ABD Enerji Bakanlığı — Elektrikli araçlarla kirliliği azaltmak', url: 'https://www.energy.gov/eere/electricvehicles/electric-vehicle-basics' },
    ],
    content: `# Elektrikli mi Benzinli mi: Hangisi Gerçekten Sana Uygun?

Dürüst cevap "elektrikliler daha iyi" ya da "benzinliler daha iyi" değil — "nasıl sürdüğüne ve aracı nereye park ettiğine bağlı"dır. Bir elektrikli araç (EV) ile bir benzinli araç aynı sorunu zıt yollardan çözer ve doğru seçim, hayatınla ilgili birkaç somut gerçeğe iner: ne kadar uzağa sürüyorsun, evde şarj edebiliyor musun, peşin fiyatı işletme maliyetine karşı nasıl tartıyorsun. İşte karar vermek için çerçeve.

## Maliyet hikâyesi: peşin fiyat vs ömür boyu

En büyük zihinsel düzeltme şu: bir aracın *iki* maliyeti vardır — etiket fiyatı ve onu çalışır tutmanın maliyeti — ve elektrikli ile benzinli araçlar her birinde yer değiştirir:

| | Elektrikli (EV) | Benzinli |
| --- | --- | --- |
| Peşin fiyat | Daha yüksek (ama düşüyor, teşvikler de yardımcı) | Daha düşük |
| "Yakıt" maliyeti | Kilometre başına çok daha ucuz — elektrik benzini yener, özellikle evde şarjda | Daha yüksek ve petrol fiyatlarıyla oynak |
| Bakım | Düşük — yağ değişimi yok, çok daha az hareketli parça, frenler daha uzun dayanır | Daha yüksek — yağ, şanzıman, egzoz, daha fazla aşınma |
| Değer kaybı | Modele göre değişir | Modele göre değişir |

Örüntü şu: bir EV genellikle *almak* için daha pahalıya gelir, *sahip olmak* için çok daha ucuza. Genel olarak öne geçip geçmemesi, kaç kilometre sürdüğüne (daha fazla sürüş EV'nin daha ucuz yakıtını öne çıkarır) ve onu ne kadar tuttuğuna (daha uzun süre EV'nin daha düşük bakımını öne çıkarır) bağlıdır.

## Belirleyici soru: evde şarj edebiliyor musun?

Bu, neredeyse her şeyden daha çok önemlidir. Gece park ettiğin yerde fişe takabiliyorsan, bir EV harikulade kullanışlıdır — uyurken "yakıt alır"sın ve halka açık şarj istasyonuna nadiren gidersin. Sokak park yerine ya da şarjı olmayan apartman otoparklarına bağımlıysan, EV sahipliği belirgin biçimde zorlaşır; daha yavaş ve daha az öngörülebilir halka açık istasyonlara yaslanır. Evde şarj, EV deneyimini ya yapan ya bozan o sessiz özelliktir.

## Her biri nerede gerçekten kazanır

- **EV kazanır:** günlük işe gidip gelme ve şehir içi sürüş, düşük işletme maliyetleri, anında ve sessiz tork, evde şarj, daha düşük ömür boyu emisyon ve asgari bakım.
- **Benzinli kazanır:** sık uzun yolculuklar (5 dakikalık dolum vs daha uzun şarj molaları), evde şarj imkânının olmaması, çok düşük peşin bütçe ve şarj altyapısının seyrek olduğu bölgeler.

İşe yarar bir pratik kural: sürüşünün çoğu günlük ve yerelse ve evde şarj edebiliyorsan, bir EV büyük olasılıkla uyar ve zamanla para biriktirir. Düzenli olarak uzun mesafeler sürüyorsan ya da park ettiğin yerde şarj edemiyorsan, benzinli (ya da hibrit) bir araç hâlâ pragmatik seçim olabilir.

## SSS

**Elektrik fosil yakıtlardan geliyorsa elektrikli araçlar gerçekten daha temiz mi?**
Ömür boyu bakıldığında, neredeyse tüm bölgelerde evet — elektrikliler daha verimlidir ve şebekeler giderek temizleniyor. Çalışmalar, karışık şebekelerde bile toplam emisyonun benzer benzinli araçlardan düşük olduğunu tutarlı şekilde buluyor ve yenilenebilirler büyüdükçe fark açılıyor.

**Peki ya batarya değişimi?**
Modern EV bataryaları aracın ömrü boyunca dayanacak şekilde tasarlanır ve uzun yıllar garantilidir; çoğu yavaşça yıpranır, on yıl içinde menzilin küçük bir kısmını kaybeder, tümüyle arızalanmaz. Tipik sahiplik süresi içinde komple değişim nadirdir.

**Hibrit iyi bir orta yol mu?**
Birçok kişi için evet — bir hibrit, saf benzinliye göre yakıt ve bakımı kısar, şarj altyapısı gerektirmez ve menzil kaygısını ortadan kaldırır; şarj edilebilir hibrit ise kısa, yalnızca elektrikli işe gidiş ekler. Tam bir EV park yerine ya da yolculuklarına henüz uymuyorsa, mantıklı bir köprüdür.`,
  },
  {
    topicKey: 'how-solar-panels-work',
    title: 'Güneş Panelleri Nasıl Çalışır — ve Buna Değer mi?',
    question: 'Güneş panelleri elektriği gerçekte nasıl üretir ve kendini amorti eder mi?',
    summary:
      'Güneş panelleri, fotovoltaik etkiyle güneş ışığını doğrudan elektriğe çevirir — hareketli parça yok. Değip değmemesi güneşine, elektrik fiyatlarına, çatına ve teşviklere bağlı; çoğu yerde birkaç yılda başabaş gelir, sonra onlarca yıl bedavaya çalışır.',
    tags: ['ev', 'enerji', 'güneş enerjisi', 'elektrik'],
    language: 'tr',
    image: { prompt: promptOf('how-solar-panels-work'), alt: 'Güneş ışığının panel içinde yükleri serbest bırakıp eve akım olarak akışını gösteren çizim' },
    sources: [
      { title: 'ABD Enerji Bakanlığı — Güneş enerjisi nasıl çalışır?', url: 'https://www.energy.gov/eere/solar/how-does-solar-work' },
      { title: 'NREL — Güneş fotovoltaik temelleri', url: 'https://www.nrel.gov/research/re-photovoltaics.html' },
    ],
    content: `# Güneş Panelleri Nasıl Çalışır — ve Buna Değer mi?

Bir güneş paneli sessizce dikkat çekici bir şey yapar: güneş ışığını *doğrudan* elektriğe çevirir; hareketli parça yok, yakıt yok, gürültü yok. Dönen bir türbin ya da yanan bir şey yok — sadece özel yapılmış bir malzemeye çarpan ışık ve diğer uçtan çıkan elektrik. Basit fiziği anlamak, pratik soruyu — "benim için kendini amorti eder mi?" — çok daha kolay ve dürüstçe yanıtlanır kılar.

## Sade bir dille fotovoltaik etki

Güneş panelleri **fotovoltaik** ("ışık-elektrik") hücrelerden yapılır, genellikle silisyumdan. Bu hücrelerle ilgili can alıcı gerçek şu: ışık silisyuma çarptığında, enerjisi elektronları yerinden koparır. Hücre, bu serbest kalan elektronları tek bir yönde akmaya iten dahili bir elektriksel dengesizlikle inşa edilir — ve elektronların tek yönde akması *zaten* bir elektrik akımıdır. Yani güneş ışığı girer, elektrik doğrudan çıkar. Işık ne kadar parlaksa, o kadar çok elektron akar ve panel o kadar çok güç üretir.

Panellerin ürettiği elektrik doğru akımdır (DC), bu yüzden **invertör** denen bir cihaz onu evinin ve şebekenin kullandığı alternatif akıma (AC) çevirir. Sistemin tamamı esasen budur: paneller, bir invertör ve evinin tesisatına bir bağlantı.

## Neyin "değer" olduğunu belirleyen şey

Dürüstlüğün önem kazandığı yer burası — güneş enerjisi bazı durumlarda muhteşem amorti eder, bazılarında yavaş. Değişkenler:

| Etmen | Neden önemli |
| --- | --- |
| **Güneş** | Daha fazla güneş (ve güneye bakan, gölgesiz bir çatı) = daha fazla üretim |
| **Elektrik fiyatı** | Şebekeye ne kadar çok ödüyorsan, kendi ürettiğin her kWh o kadar çok tasarruf sağlar |
| **Peşin maliyet ve teşvikler** | Vergi indirimleri, hibeler ve finansman hesabı epey değiştirir |
| **Çatı** | Yön, eğim, gölge, yaş ve büyüklük hepsi önemli |
| **Net ölçüm kuralları** | Şebekeye verdiğin fazla güç için tedarikçinin sana adil kredi verip vermediği |

Düşünme biçimi şu: güneş enerjisi büyük bir peşin maliyettir ve sonra **25+ yıl** boyunca neredeyse bedava elektrik üretir (paneller tipik olarak bu kadar süre garantilidir). Peşin maliyeti yıllık tasarrufuna bölerek bulduğun geri ödeme süresi diyelim 6–10 yılsa, ondan sonrası kârdır — çoğu zaman güçlü bir getiri. Düşük güneşli, düşük fiyatlı ya da yüksek kurulum maliyetli bölgelerde geri ödeme uzar ve gerekçe zayıflar.

## Gerçekçi bir tablo

Pahalı bataryalar eklemediğin sürece güneş enerjisi seni nadiren tümüyle "şebeke dışı" yapar — çoğu ev sistemi şebekeye bağlı kalır, geceleri şebekeden çeker, gündüz fazlayı verir. Ve paneller yılda yalnızca minik bir miktar çıktı kaybeder, dolayısıyla 25 yaşında bir panel hâlâ iyi çalışır. Teknoloji olgun ve düşük bakımlıdır; gerçek soru neredeyse her zaman *senin* çatın ve tarifelerin için ekonomidir, çalışıp çalışmadığı değil.

## SSS

**Güneş panelleri bulutlu günlerde ya da kışın çalışır mı?**
Evet, sadece daha az. Isıyla değil ışıkla çalışırlar, bu yüzden kapalı havalarda da (düşük çıktıyla) üretirler ve aslında serin, güneşli koşulları severler. Düşman soğuk değil; gölge ve kısa kış günleridir.

**Bataryaya ihtiyacım var mı?**
Yarar görmek için yok — çoğu sistem şebekeyi net ölçüm yoluyla "sanal batarya" olarak kullanır, gündüzün fazlasını gece kullanımı için biriktirir. Bataryalar kesintilerde yedek güç ve daha fazla kendine yeterlilik katar ama kayda değer ek maliyetle; isteğe bağlıdır, zorunlu değil.

**Ne tür bakım gerektirirler?**
Çok az — hareketli parça yok. Toz ya da polen birikirse ara sıra temizlik ve invertör sistemin ömründe bir kez değişebilir. Onun dışında çoğunlukla öylece durup çalışırlar.`,
  },
  {
    topicKey: 'heat-pumps',
    title: 'Isı Pompaları Anlatıldı: Tek Kutudan Isıtma ve Soğutma',
    question: 'Isı pompası nedir ve bir evi ürettiğinden daha az enerji kullanarak nasıl ısıtabilir?',
    summary:
      'Bir ısı pompası ısı üretmez — onu taşır; dışarıdaki havadan (soğuk havadan bile) sıcaklığı evine pompalar, yazın tersine dönüp soğutur. Isıyı taşımak üretmekten çok daha verimli olduğundan, kullandığı her birim elektrik için birkaç birim ısı sağlayabilir.',
    tags: ['ev', 'enerji', 'ısı pompası', 'ısıtma'],
    language: 'tr',
    image: { prompt: promptOf('heat-pumps'), alt: 'Soğuk dış havadan zayıf sıcaklık toplayıp ılık bir eve aktaran ısı pompası çizimi' },
    sources: [
      { title: 'ABD Enerji Bakanlığı — Isı pompası sistemleri', url: 'https://www.energy.gov/energysaver/heat-pump-systems' },
      { title: 'ENERGY STAR — Isı pompaları', url: 'https://www.energystar.gov/products/heat_pumps' },
    ],
    content: `# Isı Pompaları Anlatıldı: Tek Kutudan Isıtma ve Soğutma

Bir ısı pompası, fizik yasalarını çiğnemesi gerekiyormuş gibi duyulur: evine, tükettiği elektrik enerjisinden daha fazla ısı enerjisi verebilir. İşin sırrı şu: **bir ısı pompası ısı *üretmez* — onu *taşır*.** Ve ısıyı bir yerden başka bir yere taşımak, sıfırdan ısı üretmekten çok daha az enerji ister. Bu tek fikri kavradığında, tüm teknoloji — ve hükümetlerin ve enerji uzmanlarının ona neden bu kadar hevesli olduğu — anlam kazanır.

## Isıyı üretmek değil, taşımak

İşte sezgiye aykırı kısım: soğuk hava bile ısı enerjisi içerir (yalnızca sana göre "soğuk" hisseder). Bir ısı pompası, dolaşan bir soğutucu akışkan ve bir kompresör kullanarak dış havadaki o dağınık sıcaklığı **toplar**, yoğunlaştırır ve içeride serbest bırakır. Bu, ısıyı soğuk bir alanın *dışına* taşıyan buzdolabın ya da klimanla aynı temel teknolojidir — ısı pompası onu sadece yararlı yönde yapar, ısıyı evinin *içine* taşır.

Yakıt yakmak ya da dirençli bir ısıtıcı çalıştırmak yerine var olan ısıyı yeniden konumlandırdığı için, bir ısı pompası dikkat çekici biçimde verimli olabilir: iyi bir tanesi, kullandığı **her 1 birim elektrik için kabaca 3 birim ısı** verir. Buna karşılık geleneksel bir elektrikli ısıtıcı 1'e 1'i asla geçemez — elektriği yalnızca eşit miktarda ısıya çevirebilir. Bu verimlilik uçurumu, işin bütün noktasıdır.

## Bir makine, iki mevsim

Isı pompasının ikinci hüneri, **tersine çevrilebilir** olmasıdır. Yazın, sadece ters yönde çalışır — evinin *içinden* ısı toplar ve dışarı atar; bir klimanın tam olarak yaptığı şey budur. Böylece tek bir sistem kışın ısıtır, yazın soğutur ve ayrı bir kazan ile klimanın yerini alır. Isı pompalarının giderek ev iklim kontrolü için varsayılan öneri olmasının bir nedeni de budur.

## Dürüst uyarılar

- **Çok soğuk iklimler:** eski ısı pompaları yoğun soğukta verim kaybederdi ama modern "soğuk iklim" modelleri donma sıcaklıklarında bile iyi çalışır; aşırı soğudukça performans gerçekten düşer, en sert günlerde bazen yedek ısı gerekir.
- **Peşin maliyet:** kurulum, temel bir kazan ya da klimadan daha pahalıya gelebilir; ne var ki işletme maliyetleri ve teşvikler zamanla bunu çoğu kez telafi eder.
- **Elektrikli bir cihazdır:** işletme maliyeti ve emisyonu, elektrik fiyatına ve şebekenin ne kadar temiz olduğuna bağlıdır.

Yine de çoğu iklimdeki çoğu ev için ısı pompası artık yıl boyu rahat kalmanın en verimli ve en uygun maliyetli yollarından biridir.

## SSS

**Donma noktasının altında ısı pompası çalışır mı?**
Modern soğuk iklim ısı pompaları çalışır — çok soğuk havadan hâlâ kullanılabilir ısı çekerler, sadece sıcaklıklar düştükçe daha az verimli. Aşırı soğukta bir yedek ısı kaynağı devreye girebilir, ama yılın çoğunda işin büyük kısmını ısı pompası yapar.

**Bir gazlı kazandan daha ucuza mı çalışır?**
Verimliliği sayesinde çoğu zaman, ama yerel elektrik vs gaz fiyatlarına bağlıdır. Elektriğin makul fiyatlı olduğu (ya da güneş enerjin olduğu) yerde, ısı pompaları işletme maliyetinde genellikle kazanır ve "soğutabilmek" konusunda her zaman kazanır.

**Hava kaynaklı ile toprak kaynaklı ısı pompası arasındaki fark nedir?**
Hava kaynaklı pompalar dış havadan ısı toplar ve kurulumu daha ucuzdur. Toprak kaynaklı ("jeotermal") pompalar yer altının daha kararlı sıcaklığından çeker — daha verimli, ama gömülü borular gerektirdiği için kurulumu çok daha pahalı.`,
  },
  {
    topicKey: 'home-insulation',
    title: 'Yalıtım Neden Evindeki En İyi Enerji Yatırımıdır',
    question: 'Ev yalıtımı neden bu kadar önemli ve gerçekten maliyetine değer mi?',
    summary:
      'Yalıtım, kışın evinden sürekli dışarı, yazın içeri sızan ısıyı yavaşlatır, böylece ısıtman ve soğutman daha az çalışır. Çoğu zaman en ucuz, en yüksek getirili enerji iyileştirmesidir — her yıl para biriktirir ve odaları daha rahat kılar.',
    tags: ['ev', 'enerji', 'yalıtım', 'verimlilik'],
    language: 'tr',
    image: { prompt: promptOf('home-insulation'), alt: 'Işıltılı bir koruyucu battaniyeye sarılı, boşluklarından ışık sızan evin kesit çizimi' },
    sources: [
      { title: 'ABD Enerji Bakanlığı — Yalıtım', url: 'https://www.energy.gov/energysaver/insulation' },
      { title: 'ENERGY STAR — Evini sızdırmaz yap ve yalıt', url: 'https://www.energystar.gov/saveathome/seal_insulate' },
    ],
    content: `# Yalıtım Neden Evindeki En İyi Enerji Yatırımıdır

Çoğu insan enerji faturalarını, sıcağı ya da soğuğu *üreten* cihazlar açısından düşünür — kazan, klima. Ama çoğu zaman daha çok önem taşıyan daha sessiz bir etmen var: o sıcağın ya da soğuğun **geri dışarı ne kadar hızlı sızdığı.** Yalıtım, duvarlarındaki, çatındaki ve döşemelerindeki, tek işi bu sızıntıyı yavaşlatmak olan gösterişsiz malzemedir. Çoğunlukla en büyük, en güvenilir geri dönüşe sahip en ucuz ev iyileştirmesidir — ve binanın ömrü boyunca her günün her saati sessizce çalışır.

## Isı her zaman soğuğa doğru akar

Temel fizik basit ve amansızdır: **ısı her zaman daha sıcaktan daha soğuğa gider.** Kışın, üretmek için para ödediğin sıcaklık, duvarlarından, çatından ve pencerelerinden sürekli dışarıdaki soğuğa kaçar. Yazın, dışarıdaki ısı sürekli *içeri* sızar. Isıtma ve soğutma sistemlerin yalnızca konfor üretmez — bitmeyen bir sızıntıyla savaşır. Yalıtım bu akışı tümüyle durdurmaz (hiçbir şey durdurmaz), ama onu çarpıcı biçimde *yavaşlatır*, böylece sistemlerin daha seyrek çalışır ve sıcaklığı korumak için daha az enerji yakar.

İşe yarar bir zihinsel model: yalıtım evin için bir battaniyedir. Bir battaniye ısı üretmez; sadece vücudunun ürettiği ısının kaçmasını yavaşlatır, böylece daha az çabayla sıcak kalırsın. Ev yalıtımı, bina ölçeğinde tam olarak aynı şeyi yapar.

## Neden bu kadar iyi bir yatırım

- **Sürekli ve sonsuza dek çalışır.** Bir cihazın aksine yalıtımın işletme maliyeti yoktur, hareketli parçası yoktur ve yıpranmaz. Bir kez kur, onlarca yıl her yıl tasarruf et.
- **Hem ısıtma *hem* soğutma faturalarını kısar.** Kışın ısıyı içeride tutan aynı bariyer, yazın dışarıda tutar.
- **Yalnızca maliyeti değil, konforu da iyileştirir.** İyi yalıtılmış odalarda daha az soğuk cereyan ve sıcak nokta olur, sabit bir sıcaklık tutarlar.
- **Ucuz kazançlar önce gelir.** Hava sızıntılarını kapatmak (kapı, pencere ve geçiş boşlukları) ve çatı arası yalıtımını takviye etmek çoğu zaman düşük maliyetli ve yüksek etkilidir — ısı yükselir, bu yüzden çatı genellikle önceliktir.

## Nereye odaklanmalı

Tüm yalıtımın getirisi eşit değildir. En büyük, en ucuz kazançlar genellikle şunlardır: **hava sızıntılarını kapatmak** (cereyanlı bir ev, yalıtım ne kadar kalın olursa olsun enerji israf eder), sonra **çatı arası/çatı** (çoğu ısının yukarı kaçtığı yer), sonra duvarlar ve döşemeler. Yalıtımın etkinliği "R-değeri" ile derecelendirilir — yükseği ısı akışına daha fazla direnç demektir — ve önerilen seviyeler iklime göre değişir. Genel ilke her yerde geçerli: sıkı, iyi yalıtılmış bir kabuk, daha küçük ve işletmesi daha ucuz bir ısıtma-soğutma sisteminin seni rahat tutmasına izin verir.

## SSS

**Bir evi çok sıkı sızdırmaz yapmak hava kalitesi için kötü değil mi?**
Taze hava değişimini azaltabilir, bu yüzden çok sıkı evler sızdırmazlığı kontrollü havalandırmayla eşleştirir. Yine de çoğu ev için daha büyük sorun fazlasıyla sızdırmaktır; en kötü boşlukları kapatmak, hava kalitesinden ödün vermeden konfor ve verimliliği iyileştirir.

**En uygun maliyetli tek adım nedir?**
Genellikle hava sızdırmazlığı artı çatı arası yalıtımı. Görece ucuzdurlar, çoğu zaman kendin yapabilirsin ve en çok enerjinin kaçtığı yeri hedeflerler. Birçok kişi yalnızca bunlardan gözle görülür fatura düşüşleri görür.

**Yalıtım sıcak iklimlerde de yarar sağlar mı?**
Kesinlikle — dışarıdaki ısının içeri sızmasını yavaşlatır, klima maliyetlerini kısar. "Battaniye" her iki yönde de çalışır; ısıyı *dışarıda* tutmak, içeride tutmak kadar değerlidir.`,
  },
  {
    topicKey: 'led-vs-incandescent',
    title: 'LED ve Akkor Ampul: LED Neden Yerini Aldı',
    question: 'LED ampuller neden eski akkor ampullerden bu kadar daha iyi?',
    summary:
      'Eski akkor ampuller enerjilerinin yaklaşık %90’ını ısı olarak israf eder, ışığı neredeyse kazara üretir. LED’ler ışığı doğrudan ve verimli üretir, gücün küçük bir kısmını kullanır ve kat kat uzun dayanır — yüzyıllık ampulü bu yüzden değiştirdi.',
    tags: ['ev', 'enerji', 'aydınlatma', 'verimlilik'],
    language: 'tr',
    image: { prompt: promptOf('led-vs-incandescent'), alt: 'Kaynar ve savurgan eski ampulün yanında temiz ışık üreten serin ve verimli bir LED çizimi' },
    sources: [
      { title: 'ABD Enerji Bakanlığı — LED aydınlatma', url: 'https://www.energy.gov/energysaver/led-lighting' },
      { title: 'ENERGY STAR — Ampuller', url: 'https://www.energystar.gov/products/light_bulbs' },
    ],
    content: `# LED ve Akkor Ampul: LED Neden Yerini Aldı

Bir asırdan fazla süre boyunca ampul, parlak bir kazayla çalıştı: bir şeyi akkor hale gelene dek ısıt. İşte akkor ampul bu — ve harika bir ısıtıcı, berbat bir ışık üreticisi olduğu ortaya çıkıyor. LED onun yerini bir pazarlama hamlesiyle değil, bir ampulün tek işinde temelden daha iyi olduğu için aldı: elektriği israf edilen ısıya değil, ışığa çevirmek. Fark, 100 yıllık bir teknolojiyi yalnızca on yılda sona erdirecek kadar çarpıcı.

## Işık üretmek vs ısı üretmek

Bir **akkor** ampul, elektriği ince bir telden (flaman) o kadar ısınana dek geçirir ki beyaz ışıkla parlar. Işık gerçektir, ama neredeyse ısının bir yan etkisidir — kabaca **enerjinin %90'ı ısıya dönüşür ve yalnızca %10 kadarı görünür ışığa.** Çoğunlukla odayı ısıtmak için para ödersin ve ışığı ikramiye olarak alırsın. Eski bir ampulün dokunulamayacak kadar sıcak olmasının nedeni budur.

Bir **LED** (ışık yayan diyot) ışığı tümüyle farklı bir yolla üretir: elektrik, çok az ısıyla ışığı *doğrudan* yayan özel bir yarı iletken malzemeden geçer. Kaynar bir flaman yok, "kazara parlamak" yok — yalnızca elektriğin ışığa verimli dönüşümü. Sonuç olarak bir LED, eski bir ampulle aynı parlaklığı gücün yalnızca küçük bir kısmını kullanarak üretir.

## Tartışmayı bitiren sayılar

| | Akkor | LED |
| --- | --- | --- |
| Elektrik → ışık | ~%10 (gerisi ısı) | Büyük çoğunluk |
| Benzer parlaklık için güç | Yüksek | Kabaca %75–85 daha az |
| Ömür | ~1.000 saat | ~15.000–25.000+ saat |
| Isı çıkışı | Sıcak | Serinden ılığa |
| Zaman içindeki maliyet | Ucuza alınır, pahalıya çalışır | Peşin daha pahalı, genelde çok daha ucuz |

Bir LED rafta biraz daha pahalıdır ama çok daha az elektrik kullanır ve *kat kat* uzun dayanır, dolayısıyla ömrü boyunca çarpıcı biçimde daha ucuzdur — daha az ampul alır ve çalıştırmak için çok daha az ödersin. Bunu evdeki her duya çarp, tasarruf hatırı sayılır olur.

## LED'leri iyi seçmek

LED'lere geçerken insanları iki şey şaşırtır. Birincisi, parlaklık artık watt'la değil **lümenle** ölçülür — watt enerji kullanımını ölçer ve LED'ler o kadar az kullanır ki eski "60 watt = bu kadar parlak" kestirmesi artık geçerli değildir; parlaklık için lümene bak. İkincisi, LED'ler farklı **renk sıcaklıklarında** gelir (kelvin ile ölçülür): düşük sayılar (~2700K) eski ampuller gibi sıcak, sarımsı ışık verir; yüksek sayılar (~5000K) serin, mavimsi-beyaz "gün ışığı" verir. Sevdiğin sıcaklığı seç; verimlilik her iki yönde de mükemmel.

## SSS

**Hâlâ çalışan ampulleri LED ile değiştirmeye değer mi?**
Sık kullanılan ışıklar için çoğu zaman evet — enerji tasarrufu yeni ampulün parasını hızla geri ödeyebilir ve onu çok daha seyrek değiştirirsin. Nadiren kullanılan bir dolap ampulü için o kadar acil değil.

**LED'ler gerçekten o kadar uzun dayanır mı?**
Kaliteli olanlar dayanır, gerçi ucuz üniteler ve kötü ısı yönetimi ömrü kısaltabilir. LED'ler ayrıca aniden yanmak yerine kademeli olarak sönme eğilimindedir. İtibarlı ampuller almak, eski teknolojiye göre daha çok önemlidir.

**Eski ampulün ısısı hiç işe yaradı mı?**
Soğuk odalarda azıcık — ama bu son derece verimsiz bir ısıtma yöntemidir ve soğutma yaptığın yazın işe yaramaz (hatta ters etki yapar). Bir ışık kaynağı olarak o ısı neredeyse saf israftı.`,
  },
  {
    topicKey: 'induction-cooking',
    title: 'İndüksiyonlu Ocaklar Nasıl Çalışır (ve Neden Bu Kadar Hızlı)',
    question: 'Bir indüksiyonlu ocak yemeği nasıl ısıtır ve gazlı ya da elektrikliden daha mı iyi?',
    summary:
      'İndüksiyonlu ocaklar bir manyetik alan kullanarak tencerenin kendisini doğrudan ısıtır, önce bir gözü ısıtmanın savurgan adımını atlar. Bu onları daha hızlı, verimli, hassas ve mutfakta daha serin ve güvenli kılar — tek şartla: tencereler manyetik olmalı.',
    tags: ['ev', 'enerji', 'pişirme', 'mutfak'],
    language: 'tr',
    image: { prompt: promptOf('induction-cooking'), alt: 'Manyetik alanın parlayan halkalarla tencere tabanını doğrudan ısıtıp ocak yüzeyinin serin kaldığı çizim' },
    sources: [
      { title: 'ABD Enerji Bakanlığı — Enerji verimli pişirme ve indüksiyon', url: 'https://www.energy.gov/energysaver/energy-efficient-cooking' },
      { title: 'ENERGY STAR — Pişirme cihazları', url: 'https://www.energystar.gov/' },
    ],
    content: `# İndüksiyonlu Ocaklar Nasıl Çalışır (ve Neden Bu Kadar Hızlı)

Bir indüksiyonlu ocakta suyun şaşırtıcı denecek kadar hızlı kaynadığını gördüysen — ya da tencerenin yanındaki yüzeye dokunup onu serin bulduysan — zekice bir fizik parçasının getirisini görmüşsündür. Gazlı ya da geleneksel elektrikli ocakların aksine, bir indüksiyonlu ocak bir gözü ısıtıp sonra o ısıyı tencereye geçirmez. **Tencerenin kendisini doğrudan ısıtır** ve aradaki adamı atlar. İndüksiyonu daha hızlı, daha verimli ve daha güvenli kılan tam da bu tek farktır.

## Ocağı değil, tencereyi ısıtmak

Bir indüksiyonlu ocağın pürüzsüz cam yüzeyinin altında bir tel bobin bulunur. Açtığında, bobinden akan elektrik hızla değişen bir **manyetik alan** yaratır. Üstüne manyetik bir tencere koyduğunda, bu alan *tencerenin metalinin içinde* girdap biçimli elektrik akımları indükler ve tencerenin bu akımlara kendi direnci onu ısıtır. Başka bir deyişle, ocak tencerenin tabanını ısıtma elemanına dönüştürür.

Ocağın yüzeyi kendi başına neredeyse hiç ısınmaz — yalnızca üstünde duran sıcak tencereyle temastan ısınır. Bu yüzden tencerenin çevresindeki alana çoğu zaman güvenle dokunabilirsin ve dökülen bir şey cama yanıp yapışmaz.

## Bu neden daha iyi

| Fayda | Neden olur |
| --- | --- |
| **Hız** | Enerji doğruca tencereye gider, böylece su belirgin biçimde daha hızlı kaynar |
| **Verimlilik** | Havayı, gözü ya da mutfağı ısıtmak için çok az ısı israf edilir |
| **Hassasiyet** | Güç değişiklikleri neredeyse anlıktır, gaz gibi ama daha kontrol edilebilir |
| **Güvenlik ve konfor** | Yüzey görece serin kalır; alev yok, mutfakta daha az atık ısı |
| **Kolay temizlik** | Dökülenler serin bir yüzeyde pişip yapışmaz |

Gaz çevredeki havaya çok ısı kaybettiği ve geleneksel elektrikli rezistanslar önce kendilerini ısıtarak enerji israf ettiği için, indüksiyon enerjisinin daha fazlasını yemeğe ulaştırır — onu yaygın ocak tiplerinin en verimlisi kılar.

## Tek gerçek şart

İndüksiyon yalnızca **manyetik tencerelerle** çalışır — mutfak mıknatısının yapıştığı tencereler, dökme demir ve çoğu paslanmaz çelik gibi. Alüminyum, bakır ve cam tencereler, manyetik bir tabanları olmadıkça çalışmaz. Hızlı test: bir mıknatıs tencerenin tabanına sıkıca yapışıyorsa, indüksiyonda çalışır. Bazı insanlar için ocak değiştirmek birkaç sevdiği tencereyi değiştirmek anlamına gelir; ana benimsenme engeli budur.

## SSS

**İndüksiyon, sıradan bir cam yüzeyli elektrikli ocakla aynı mı?**
Hayır — benzer görünürler ama farklı çalışırlar. Sıradan bir "düz yüzeyli" elektrikli ocak, camın altında bir rezistansı ısıtır, o da tencereyi ısıtır (cam çok ısınır). İndüksiyon tencereyi doğrudan ısıtır ve çok daha serin kalır. Görünüşte benzer, içeride çok farklı.

**Mevcut tencerelerimle çalışır mı?**
Yalnızca manyetiklerse. Tabana bir mıknatıs tut: sıkı yapışma evet demektir. Dökme demir ve çoğu paslanmaz çelik çalışır; saf alüminyum, bakır ve cam, "indüksiyon uyumlu" etiketli olmadıkça çalışmaz.

**Çok elektrik kullanır mı?**
Elektriği verimli kullanır — enerjinin gaza ya da rezistanslı elektriğe göre daha fazlası yemeğe ulaşır, dolayısıyla yaptığın pişirme için tipik olarak en ekonomik ve en hızlı seçenektir, özellikle kaynatma ve hızlı ısıtmada.`,
  },
  {
    topicKey: 'home-battery',
    title: 'Ev Bataryaları: Gerçekten Kendini Amorti Eder mi?',
    question: 'Bir ev bataryası ne yapar ve yüksek maliyetine değer mi?',
    summary:
      'Bir ev bataryası elektriği depolar — güneşten ya da ucuz puant dışı şebeke gücünden — sonra kullanmak için. En büyük gerçek değeri kesintilerde yedek güç ve güneşi kendin kullanmaktır; salt fatura tasarrufu maliyeti henüz tek başına nadiren haklı çıkarır, gerçi bu değişiyor.',
    tags: ['ev', 'enerji', 'batarya', 'güneş enerjisi'],
    language: 'tr',
    image: { prompt: promptOf('home-battery'), alt: 'Gündüz güneş enerjisini depolayıp geceleri bir eve güç veren duvar bataryası çizimi' },
    sources: [
      { title: 'ABD Enerji Bakanlığı — Ev enerji depolama', url: 'https://www.energy.gov/energysaver/articles/should-you-get-battery-storage-your-home-solar-system' },
      { title: 'NREL — Batarya depolama temelleri', url: 'https://www.nrel.gov/research/energy-storage.html' },
    ],
    content: `# Ev Bataryaları: Gerçekten Kendini Amorti Eder mi?

Bir ev bataryası tam olarak kulağa geldiği şeydir: genellikle bir duvara ya da garaja monte edilen, elektriği sonradan kullanmak üzere depolayan büyük bir şarj edilebilir batarya. Vaadi cazip — kendi güneş gücünü depola, kesintilerde ışıkları açık tut, pahalı puant tarifeli elektrikten kaç. Ama ev bataryaları aynı zamanda pahalıdır ve "kendini amorti etmesi", onu *neden* istediğine epey bağlıdır. Dürüst cevap, bir bataryanın yapabileceği üç farklı işi birbirinden ayırır.

## Bir ev bataryası gerçekte ne yapar

Bir batarya enerjiyi depolar ve talep üzerine serbest bırakır. Bir evde, iki kaynaktan birinden şarj olur — gündüz üretilen **fazla güneş gücü** ya da puant dışı saatlerdeki **ucuz şebeke elektriği** — ve sonra ihtiyacın olduğunda depolanan o enerjiyi boşaltır: geceleri, pahalı puant saatlerinde ya da şebeke çöktüğünde. Enerjinin ucuz/bol olduğu an ile gerçekten kullandığın an arasında bir tampondur.

## İnsanların bir tane almasının üç nedeni — kendini ne kadar amorti ettiğine göre sıralı

| Neden | Ne kadar amorti eder |
| --- | --- |
| **Kesintilerde yedek güç** | En net değer — kesintiler senin için sık ya da pahalıysa, bataryanın değeri dayanıklılıktadır, fatura hesabında değil |
| **Kendi güneşinden daha fazla kullanmak** | Tedarikçin verdiğin güneş için az ödüyorsa iyi — batarya ucuza satıp pahalıya geri almak yerine kendin tüketmeni sağlar |
| **Salt fatura arbitrajı** (ucuza depola, puantta kullan) | Bugün tasarrufla haklı çıkarması en zoru — tasarruf çoğu zaman bataryanın ömrü içinde maliyetini karşılamaz, gerçi bu iyileşiyor |

Can alıcı içgörü: bir bataryanın **mali** gerekçesi (para biriktirmek), genellikle **dayanıklılık** gerekçesinden (yedek güç) ya da **güneşi kendin kullanma** gerekçesinden daha zayıftır. Salt faturanı kısmak için alıyorsan, hesabı dikkatle yap — yıllık tasarrufun peşin maliyete oranı çoğu zaman bataryanın ömrüne yakın ya da ötesinde bir geri ödeme süresi ima eder. Kesintilerde gücü korumaya değer veriyorsan ya da güneş ihracın az kazandırıyorsa, değer önerisi çok daha güçlüdür.

## Değişmekte olan şey

Batarya fiyatları düşmeyi sürdürüyor ve giderek daha çok yerde tedarikçiler kullanımını kaydırmayı ödüllendiren zaman bazlı fiyatlandırmaya geçiyor — ikisi de zamanla ekonomiyi iyileştiriyor. Bir bataryayı güneşle eşleştirmek aynı zamanda en doğal uyumdur, çünkü gündüz ürettiğin enerjiyi karanlık çöktükten sonra kullanmak üzere saklamanı sağlar, özellikle net ölçümün daha az cömert hale geldiği yerlerde.

## SSS

**Bir ev bataryası beni tümüyle şebeke dışına çıkarabilir mi?**
Pratikte nadiren — tümüyle şebeke dışına çıkmak büyük, pahalı bir batarya bankası ve en kötü havayı karşılamaya yetecek, hata payı olmayan güneş gerektirir. Çoğu ev bataryası şebekeyi değiştirmek için değil, şebekeyle *birlikte* çalışmak için tasarlanmıştır.

**Bir ev bataryası ne kadar dayanır?**
Tipik olarak 10 yıl civarı garantilidir ve herhangi bir lityum batarya gibi aniden arızalanmak yerine kademeli olarak yıpranır, yavaşça kapasite kaybeder. Bu ömrü herhangi bir geri ödeme hesabına dahil et.

**Batarya için güneş enerjisine ihtiyacım var mı?**
Hayır — bir batarya yedek ya da fatura kaydırma için ucuz puant dışı şebeke gücünden şarj olabilir. Ama bataryalar ve güneş doğal bir çifttir, çünkü batarya güneşin ana sınırlamasını çözer: yalnızca gündüz üretmesini.`,
  },
  {
    topicKey: 'smart-thermostat',
    title: 'Akıllı Termostatlar Gerçekten Para Biriktirir mi?',
    question: 'Bir akıllı termostat ne yapar ve enerji faturalarını gerçekten düşürür mü?',
    summary:
      'Bir akıllı termostat ısıtma ve soğutmayı otomatikleştirir — programlar, dışarıda olduğunu algılar ve alışkanlıklarını öğrenir — böylece boş bir evi ısıtmaya ya da soğutmaya para ödemeyi bırakırsın. Tasarruf gerçektir ama mütevazıdır ve çoğunlukla kolaylaştırdığı davranıştan gelir.',
    tags: ['ev', 'enerji', 'akıllı ev', 'verimlilik'],
    language: 'tr',
    image: { prompt: promptOf('smart-thermostat'), alt: 'Boş bir odayı algılayıp çıkışını kısan duvara monte akıllı termostat çizimi' },
    sources: [
      { title: 'ENERGY STAR — Akıllı termostatlar', url: 'https://www.energystar.gov/products/smart_thermostats' },
      { title: 'ABD Enerji Bakanlığı — Termostatlar', url: 'https://www.energy.gov/energysaver/thermostats' },
    ],
    content: `# Akıllı Termostatlar Gerçekten Para Biriktirir mi?

Isıtma ve soğutma genellikle bir evin enerji faturasının en büyük dilimidir ve bu enerjinin çoğu *boş* bir evi kusursuz bir sıcaklıkta tutmaya ya da herkes battaniye altında uyurken sonuna kadar ısıtmaya harcanır. Bir akıllı termostatın tüm amacı bu israfı otomatik olarak durdurmaktır. Dürüst hüküm: evet, para biriktirir — ama tasarruf **mütevazıdır, mucizevi değil** ve enerji üreten bir sihirden değil, iyi alışkanlıkları zahmetsiz kılmaktan gelir.

## Onu "akıllı" yapan şey

Geleneksel bir termostat, sen değiştirene dek yalnızca ayarladığın sıcaklığı korur. Bir akıllı termostat otomasyon ekler:

- **Programlama:** geceleri ve tipik olarak dışarıda olduğun zamanlarda ısıtmayı/soğutmayı otomatik olarak düşürür ve sen dönmeden önce evi konfora getirir.
- **Varlık algılama:** evin boş olduğunu (telefon konumu ya da hareket sensörleri aracılığıyla) algılar ve gevşetir, sonra döndüğünde sürdürür.
- **Öğrenme:** bazı modeller zaman içinde örüntülerini ve tercihlerini öğrenir ve kendi başına ayarlar.
- **Uzaktan kontrol ve geri bildirim:** telefonundan ayarla ve nereye harcadığını gösteren enerji kullanım raporlarını gör.

Bunların hiçbiri yalıtım ya da ısı pompasının yaptığı gibi verimlilik *üretmez*. Yaptığı şey, en etkili ücretsiz alışkanlığı — **kullanmadığın bir alanı ısıtmamak ya da soğutmamak** — sen hatırlamak zorunda kalmadan güvenilir biçimde uygulamaktır.

## Tasarruf nereden gelir (ve ne kadar büyük)

Temel tasarruf "geri çekme"dir: kimsenin konfora ihtiyacı olmadığında sıcaklığın dış koşullara doğru kaymasına izin vermek, sonra tam zamanında geri kazanmak. Bunu elle yapmak aynı enerjiyi biriktirir — ama bunu tutarlı biçimde neredeyse hiç kimse yapmaz, ki bir akıllı termostatın doldurduğu açık tam da budur. Gerçek dünyadaki tasarruf tipik olarak ısıtma ve soğutma maliyetlerinin anlamlı ama dramatik olmayan bir dilimidir; enerji programları çoğu zaman ısıtma ve soğutmada kabaca **%8–15** alıntılar; bu, iklimine, alışkanlıklarına ve önceden ne kadar savurgan olduğuna göre geniş ölçüde değişir.

Yani cihaz birçok hane için birkaç yılda kendini öder — şu anda boş bir evi çokça ısıtıyor ya da soğutuyorsan daha hızlı, zaten titizsen ya da nadiren dışarıdaysan daha yavaş.

## Senin için buna değer mi

- **İyi uyum:** sık sık öngörülebilir zamanlarda dışarıdasın, "ayarla ve unut" eğilimindesin, faturaların yüksek ya da uzaktan kontrol ve veriyi seviyorsun.
- **Zayıf uyum:** programlanabilir bir termostatla zaten disiplinlisin, günün çoğunda sabit bir sıcaklıkta evdesin ya da ısıtma/soğutma maliyetlerin baştan küçük.

Konfor ve kolaylık — eve geldiğinde seni bekleyen sıcak bir ev, yataktan kontrol — para tasarrufunun ötesinde gerçek artılardır ve çoğu zaman insanların onlardan memnun olmasının daha büyük nedenidir.

## SSS

**Bütün gün evdeysem para biriktirir mi?**
Daha az — en büyük tasarruf ev boşken gevşetmekten gelir. Her zaman sabit bir sıcaklıkta evdeysen, tasarruf küçülür, gerçi gece geri çekme programları yine de yardımcı olur.

**Enerji biriktirmek için ona ihtiyacım var mı?**
Hayır — temel bir programlanabilir termostat (ya da yalnızca elle ayarlamak), disiplinliysen aynı tasarrufun çoğunu yakalar. Akıllı sürümün değeri, tasarrufun gerçekten gerçekleşmesi için bunu otomatikleştirmektir.

**Tasarruf fiyatına değer mi?**
Birçok ev için, birkaç yıl içinde evet — özellikle yüksek faturalar ya da sık yokluklarla. Enerji tasarrufunu taban, kolaylığı ikramiye olarak gör; elle geri çekmeyle hiç uğraşmayacaksan, bu otomasyon maliyetini geri kazandığı yerdir.`,
  },
  {
    topicKey: 'ev-charging-explained',
    title: 'Elektrikli Araç Şarjı Anlatıldı: Seviyeler, Hızlar ve Menzil Kaygısı',
    question: 'Elektrikli araç şarjı nasıl çalışır — seviyeler nelerdir ve ne kadar sürer?',
    summary:
      'Elektrikli araç şarjı üç hızda gelir: normal prizden yavaş Seviye 1, ev ve iş için daha hızlı Seviye 2 ve uzun yollar için hızlı DC şarj. Şarjın çoğu evde gece yavaşça olur, bu yüzden günlük elektrikli araç hayatı neredeyse hiç bekleme içermez.',
    tags: ['ev', 'enerji', 'elektrikli araçlar', 'şarj'],
    language: 'tr',
    image: { prompt: promptOf('ev-charging-explained'), alt: 'Üç şarj konnektörünün bataryayı farklı hızlarda doldurması ve gece evde yavaş şarj çizimi' },
    sources: [
      { title: 'ABD Enerji Bakanlığı — Evde şarj ve şarj altyapısı', url: 'https://www.energy.gov/eere/electricvehicles/charging-home' },
      { title: 'ABD Enerji Bakanlığı Alternatif Yakıt Veri Merkezi — Elektrikli araç şarj seviyeleri', url: 'https://afdc.energy.gov/fuels/electricity_charging_home.html' },
    ],
    content: `# Elektrikli Araç Şarjı Anlatıldı: Seviyeler, Hızlar ve Menzil Kaygısı

Elektrikli araç düşünenler için en büyük zihinsel engel şarjdır — iki dakikalık benzin dolumuna kıyasla yabancı ve yavaş hisseder. Ama üç şarj "seviyesini" ve, can alıcı biçimde, şarjın günlük hayatta gerçekte *nerede* olduğunu anladığında, endişenin çoğu dağılır. Can alıcı yeniden çerçeveleme şu: bir şarj istasyonuna sürüp beklemezsin. Çoğu elektrikli araç sahibi için araç park halindeyken ve sen başka bir şey yaparken — genellikle uyurken — şarj olur.

## Üç şarj seviyesi

Elektrikli araç şarj hızı, ne kadar güç verdiklerine göre tanımlanan üç katmanda gelir:

| Seviye | Kaynak | Hız | En uygun |
| --- | --- | --- | --- |
| **Seviye 1** | Standart ev prizi | En yavaş — saatte birkaç kilometre menzil | Gece dolumları, şarj edilebilir hibritler, düşük kilometre sürücüleri |
| **Seviye 2** | 240V devre (kurutucu gibi); ev ve halka açık istasyonlar | Çok daha hızlı — gece boyunca tam şarj ya da saatler | Günlük iş atı: ev, işyeri, mağazalar |
| **DC Hızlı Şarj** | Yüksek güçlü halka açık istasyonlar | Hızlı — büyük bir dolum için kabaca 20–40 dk | Uzun yolculuklar ve uzun mesafe sürüş |

Hatırlamanın en basit yolu: **Seviye 1** sıradan bir prizden gelen bir damladır, **Seviye 2** bir aracı gece boyunca rahatça dolduran pratik ev/halka açık standardıdır ve **DC hızlı şarj** bir kahve molasında çok menzil ekleyen uzun yol seçeneğidir.

## Günlük şarj neden yakıt almak gibi değildir

İşte "menzil kaygısını" yenen içgörü: benzinli araçlar neredeyse boşa kadar gider, sonra bir istasyonda tümüyle doldurulur. Elektrikli araçlar tersine çalışır — **az ve sık dolum yaparsın**, çoğunlukla evde. Gece park ettiğinde fişe tak ve her sabah "dolu" uyan; hiçbir zaman özel bir yolculuk yapmadan. Tipik günlük sürüş için, halka açık bir şarj istasyonuna hiç gitmeden haftalar geçirebilirsin. Hızlı şarj istisna içindir — uzun yolculuklar — rutin için değil.

## Yolculuklarda hızlı şarjı anlamak

Bir uzun yolculukta DC hızlı şarj hızla büyük bir menzil dilimi ekler — ama yeni başlayanları şaşırtan iki tuhaflık var. Birincisi, **batarya doldukça şarj yavaşlar** (düşükten yaklaşık %80'e kadar en hızlıdır, sonra bataryayı korumak için kasıtlı olarak kısılır), bu yüzden insanlar %100'ü beklemek yerine ~%80'e kadar şarj edip yola koyulur. İkincisi, şarj hızı hem istasyonun gücüne hem aracın azami kabul oranına bağlıdır — ikisinden yavaş olanı belirler. Yolculukları hızlı şarj istasyonu konumlarına göre planla; molalar zaten alacağın aralarla kabaca çakışır.

## SSS

**Şarj gerçekte ne kadar sürer?**
Evde Seviye 2'de, gece boyunca — hiç beklemezsin, sabah sadece fişten çekersin. Bir uzun yolculukta DC hızlı şarjla, kayda değer bir dolum için kabaca 20–40 dakika. Normal bir prizden Seviye 1 yavaştır ve hafif sürücüler için gece damlası olarak en uygundur.

**Şarj bataryamı yıpratır mı?**
Rutin şarj sorun değil. Sık DC hızlı şarj ve alışkanlık halinde %100'e şarj etmek biraz fazladan aşınma katar; bu yüzden birçok kişi günlük olarak yaklaşık %80'e şarj eder ve tam şarjları ile hızlı şarjı yolculuklara saklar. Modern bataryalar bunu iyi yönetir.

**Evde şarj edemezsem ne olur?**
İşyeri şarjı, halka açık Seviye 2 ve hızlı şarjlar yoluyla hâlâ yapılabilir — birçok kişi öyle yapar — ama daha az kusursuzdur. Evde şarj mümkün değilse, satın almadan önce yakındaki şarjın ne kadar kullanışlı olduğunu tart.`,
  },
  {
    topicKey: 'reading-energy-bill',
    title: 'Elektrik Faturanı Nasıl Okursun (ve Gerçekten Düşürürsün)',
    question: 'Elektrik faturamı nasıl anlarım ve onu gerçekte ne düşürür?',
    summary:
      'Faturan, kilovatsaat olarak ölçülen kullandığın enerji için seni ücretlendirir, çoğu zaman artı sabit ücretler ve zaman bazlı tarifeler. En büyük tasarruf en büyük yüklerinden gelir — ısıtma, soğutma, su ısıtma — küçük cihazları fişten çekmekten değil. İşte onları bulup kısma yolu.',
    tags: ['ev', 'enerji', 'elektrik', 'para biriktirme'],
    language: 'tr',
    image: { prompt: promptOf('reading-energy-bill'), alt: 'Birkaç büyük çubuğun (ısıtma, soğutma, sıcak su) sayısız küçük çubuğun üstünde yükseldiği, fatura olarak bir çubuk grafik çizimi' },
    sources: [
      { title: 'ABD EIA — Elektrik kullanımını ve faturaları anlamak', url: 'https://www.eia.gov/energyexplained/use-of-energy/homes.php' },
      { title: 'ABD Enerji Bakanlığı — Enerji tasarrufu kılavuzu', url: 'https://www.energy.gov/energysaver/energy-saver' },
    ],
    content: `# Elektrik Faturanı Nasıl Okursun (ve Gerçekten Düşürürsün)

Bir elektrik faturası kasıtlı bir kafa karışıklığı gibi görünebilir — kilovatsaatler, tedarik ücretleri, dağıtım ücretleri, kullanım zamanı tarifeleri. Ama jargonun altında basittir: kullandığın enerji için, artı bağlı olmanın bazı sabit maliyetleri için ödersin. Onu okuyabildiğinde, onu gerçekten kıpırdatan o birkaç şeyi hedefleyebilir — ve kıpırdatmayan o birçok şeye çaba harcamaktan kaçınabilirsin. Çoğu insan faturanın yanlış ucuna odaklanır.

## Önemli olan tek birim: kilovatsaat

Elektrik kullanımı **kilovatsaat (kWh)** ile ölçülür — temelde, bir şeyin çektiği güç çarpı çalıştığı süre. 1.000 vatlık bir cihaz bir saat çalışınca bir kWh kullanır. Faturan çoğunlukla şudur: (kullanılan kWh) × (kWh başına fiyat), çoğu zaman **artı yalnızca bağlı olmak için sabit bir aylık ücret** (bu yüzden *daha az* kullanmak faturayı sıfıra düşürmez). Birçok tedarikçi ayrıca **dağıtım/tedariği** ayrı kalemler olarak ekler ve bazıları **günün farklı zamanlarında farklı tarifeler** uygular (kullanım zamanı), elektriğin puant talep saatlerinde daha pahalı olduğu yerde.

Bunu bilmek sana daha az ödemenin iki yolunu hemen söyler: **daha az kWh kullan** ya da (zaman bazlı bir tarifedeysen) **onları daha ucuz olduğunda kullan.**

## Büyük yükleri bul — küçükleri görmezden gel

Bir faturayı kısmada en yararlı ilke: **birkaç büyük yük baskındır ve birçok küçük olanı neredeyse hiç fark edilmez.** Çoğu evde devler şunlardır:

- **Isıtma ve soğutma** (çoğu zaman tek başına en büyüğü)
- **Su ısıtma**
- **Büyük cihazlar** (buzdolabı, kurutucu, fırın)
- **Sıcak ya da soğuk üreten her şey** — bunlar elektronikleri cüce bırakır

Bu arada telefon şarj cihazları ve boşta duran cihazlar ("hayalet" yükler) gerçektir ama küçüktür. Verimsiz eski bir klimayı ya da boş bir evi ısıtmayı görmezden gelirken bir şarj cihazını fişten çekmeye takılmak, yanlış uca optimizasyon yapmaktır. Önce büyük çubukların peşine düş.

## Faturayı gerçekte ne kısar

| Yüksek etki (büyük yükler) | Düşük etki (verimli hisseder, az biriktirir) |
| --- | --- |
| Isıtma/soğutma ayar noktalarını ayarla; yalıt; sızıntıları kapat | Telefon şarj cihazlarını fişten çekmek |
| Verimli ısıtma/soğutma (örn. ısı pompası) | Tek bir LED ampulü daha erken kapatmak |
| Su ısıtıcı sıcaklığını düşür; daha kısa sıcak duşlar | Bir saatin bekleme çekimine takılmak |
| Ağır kullanımı puant dışı saatlere kaydır (kullanım zamanı planlarında) | — |
| Verimli cihazlar; bulaşık makinesi/kurutucuda tam yük | — |
| LED aydınlatma | — |

İki hafife alınan hamle: alışkanlıklarına **farklı bir tarife planının** (örn. kullanım zamanı) uyup uymadığını kontrol et ve kWh'lerinin gerçekte nereye gittiğini görmek için tedarikçinin **kullanım verisini ya da bir prize takılan sayacı** kullan — tahmin genellikle yanlıştır ve veri doğruca büyük hedeflere işaret eder.

## SSS

**Tasarruf etmeye çalışsam da faturam neden yüksek?**
Genellikle büyük yükler — ısıtma, soğutma, su ısıtma — baskın olduğu ve başka yerdeki küçük tasarruflar onları dengeleyemediği için. Önce bunları kontrol et ve sabit bir bağlantı ücretini ve küçük alışkanlıkların düzeltemeyeceği mevsimsel dalgalanmaları (yazın klima, kışın ısıtma) ara.

**Hayalet/bekleme yükleri gerçekten önemli mi?**
Gerçektir ama çoğu ev için küçüktür — faturanın küçük bir dilimi. Bir küme elektronik için akıllı bir priz çubuğuna değer, ama çok daha büyük bir yük denetimsiz çalışırken bunun için strese girmeye değmez. Boyuta göre önceliklendir.

**Kullanım zamanı fiyatlandırmasına geçmeye değer mi?**
Ağır kullanımı (çamaşır, bulaşık makinesi, elektrikli araç şarjı, ön soğutma) puant dışı saatlere kaydırabilirsen para biriktirebilir. Kullanımın kaçınılmaz biçimde puant saatlerindeyse, daha pahalıya gelebilir — geçmeden önce örüntünü planın saatlerine karşı kontrol et.`,
  },
];
