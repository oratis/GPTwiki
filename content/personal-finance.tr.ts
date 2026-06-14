import type { DraftArticle } from './types';
import { personalFinanceEn } from './personal-finance.en';

// Batch: Kişisel Finans (Türkçe özgün sürüm). personal-finance.en.ts ile aynı
// başlık ve topicKey; içerik Türkçe okur bağlamında özgün yazıldı (kurumsal
// kavramlar tek bir ülkenin vergi/emeklilik sistemine bağlanmadan genel
// tutuldu). Görseller topicKey üzerinden paylaşılır.

const promptOf = (key: string): string => {
  const hit = personalFinanceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

const NOTE = '\n\n*Bu yazı genel bir finans eğitimi niteliğindedir, kişiye özel yatırım tavsiyesi değildir.*';

export const personalFinanceTr: DraftArticle[] = [
  {
    topicKey: 'compound-interest',
    title: 'Bileşik Faiz Gerçekte Nasıl İşler?',
    question: 'Bileşik faiz nasıl çalışır ve neden bu kadar güçlü olduğu söylenir?',
    summary:
      'Bileşik faiz, getirinin üzerinden getiri kazandırır: para doğrusal değil üstel büyür. Oran değil, zaman belirleyicidir — eğri yıllarca yatay gider, sonra dikleşir. İşte bu yüzden erken başlamak kazandırır.',
    tags: ['finans', 'yatırım', 'bileşik faiz', 'tasarruf'],
    language: 'tr',
    image: {
      prompt: promptOf('compound-interest'),
      alt: 'Üstel olarak dallanan bir ışık ağacına dönüşen ışıktan bir tohum',
    },
    sources: [
      { title: 'Investor.gov (ABD SEC) — Bileşik Faiz Hesaplayıcısı', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Bogleheads wiki — Uzun vadeli yatırımın temel kavramları', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Bileşik Faiz Gerçekte Nasıl İşler?

Bileşik faiz şu demektir: yalnızca yatırdığınız anapara üzerinden değil, onun daha önce ürettiği **getiri** üzerinden de getiri kazanırsınız. Basit faiz düz bir çizgide ilerler; bileşik faiz başta yatay olup sonda dikleşen bir eğri çizer. Sihrin neredeyse tamamı son yıllarda yaşanır — bu yüzden "ne zaman başladığınız" diğer hemen her şeyden önemlidir.

## Mekanizmayı tek bir örnekle görelim

%7 yıllık getiri sağlayan bir yatırıma 10.000 koyun:

- **1. yıl**: 700 kazanırsınız (10.000 üzerinden).
- **2. yıl**: 749 kazanırsınız — anaparadan 700, geçen yılki kazançtan 49.
- **10. yıl**: birikim yaklaşık 19.700; yalnızca o yıl ~1.290 kazandırır.
- **30. yıl**: birikim yaklaşık 76.000; tek bir yıl artık ~5.000 kazandırır — her yıl, hiçbir şey yapmadan, anaparanızın yarısı kadar.

Formül A = P × (1 + r)^t'dir, ama sezgi daha basittir: büyüme önceki büyümeyle beslenir, böylece kazançlar hızlanır.

## 72 kuralı

Paranın ikiye katlanması için kaç yıl gerektiğini tahmin etmek için 72'yi yıllık getiriye bölün:

| Yıllık getiri | Kabaca her … yılda ikiye katlanır |
| --- | --- |
| %3 | 24 yıl |
| %6 | 12 yıl |
| %7 | ~10 yıl |
| %10 | ~7 yıl |

İkiye katlanmalar üst üste biner: %7'de otuz yıl yaklaşık üç katlanma demektir — 1× kabaca 8× olur. Aynı aritmetik tersine de işler: %18 faizli borç yaklaşık dört yılda ikiye katlanır, %3 enflasyon ise alım gücünü yaklaşık 24 yılda yarıya indirir.

## Neden zaman, orandan üstündür

%7 getiriyle ayda 500 katkı:

- **30 yıl** boyunca: ~610.000 (180.000 yatırılmış).
- **40 yıl** boyunca: ~1.310.000 (240.000 yatırılmış).

Ekstra on erken yıl — yalnızca 60.000 fazla yatırılmış — sonuca kabaca 700.000 ekler, çünkü en erken para en uzun süre bileşik kazanır. Fazladan bir puanlık getiri kovalamak, şimdi başlayarak fazladan yıl satın almaktan çok daha az güvenilirdir.

## Gerçek hayatta ne bileşiklenir

Mevduat hesapları kelimenin tam anlamıyla bileşiklenir; hisse senedi portföyleri istatistiksel olarak bileşiklenir (getiri yıldan yıla değişir ama tekrar yatırılan kazançlar üst üste birikir); temettüler tekrar yatırıldığında bileşiklenir. **Masraflar da bileşiklenir, ama ters yönde**: %7 brüt getiride %1'lik yıllık ücret, 40 yılda nihai servetinizin kabaca dörtte birini yer.

## SSS

**Bileşikleme sıklığı (günlük – aylık) çok mu önemli?**
İnsanların sandığından çok daha az — %5'te günlük ile yıllık bileşikleme, efektif getiride yaklaşık 0,13 puan fark eder. Belirleyici olan oran ve zamandır.

**Sık alıntılanan "%7" nereden geliyor?**
Kabaca geniş tabanlı ABD hisse senedi endekslerinin uzun dönem **enflasyondan arındırılmış** tarihsel getirisidir. Çok inişli çıkışlı yılların ortalamasıdır, bir söz değil.

**Bileşik faiz gerçekten "dünyanın sekizinci harikası" mı (Einstein)?**
Bu söz neredeyse kesinlikle uydurmadır — matematiğin kendisi, ünlü bir imza olmadan da yeterince hayranlık vericidir.${NOTE}`,
  },
  {
    topicKey: 'index-funds',
    title: 'Endeks Fonu Nedir — ve Uzmanlar Neden Sürekli Onu Öneriyor?',
    question: 'Endeks fonu nedir ve sıradan yatırımcılara neden bu kadar sık önerilir?',
    summary:
      'Endeks fonu bir piyasa endeksindeki tüm hisseleri otomatik satın alır ve neredeyse sıfır ücret alır. Onlarca yıllık veri, profesyonel hisse seçicilerin büyük çoğunluğunun uzun vadede onu yenemediğini gösterir — bütün argüman bu.',
    tags: ['finans', 'yatırım', 'endeks fonu', 'pasif yatırım'],
    language: 'tr',
    image: {
      prompt: promptOf('index-funds'),
      alt: 'Yüzlerce küçük ışıklı küpün tek bir sepet gibi taşınması',
    },
    sources: [
      { title: 'SPIVA — S&P "Aktif vs Endeks" uzun dönem karneleri', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Bogleheads wiki — Üç fonlu portföy', url: 'https://www.bogleheads.org/wiki/Three-fund_portfolio' },
      { title: 'Investor.gov (ABD SEC) — Yatırım fonları ve ETF temelleri', url: 'https://www.investor.gov' },
    ],
    content: `# Endeks Fonu Nedir — ve Uzmanlar Neden Sürekli Onu Öneriyor?

Endeks fonu, kazananları seçmeye çalışmayan bir fondur. Bir piyasa endeksindeki her menkul kıymeti — S&P 500'ün ~500 şirketinin tamamını ya da toplam piyasa endeksindeki binlerce hisseyi — büyüklüklerine orantılı olarak satın alır ve elinde tutar. Analist yok, tahmin yok, ekmeğini kazanan bir alım-satım masası yok. Pes etmek gibi görünüyor; veri ise tam tersini söylüyor.

## Argüman üç olguda

**1. Piyasayı yenmek zordur.** Yirmi yılı aşkın süredir yayımlanan SPIVA karneleri, 15 yıllık pencerelerde aktif yönetilen fonların büyük çoğunluğunun — çoğu zaman %80–90'ının — büyük piyasalarda kıyaslandıkları endeksin altında kaldığını tekrar tekrar bulur. Tam zamanlı ekipleri olan profesyoneller, ortalamada, ölçüldükleri endeksi seçimle geçemez.

**2. Kazananları önceden bilemezsiniz.** Bazı fonlar piyasayı gerçekten yener — ama kazananlar nadiren süreklilik gösterir ve geçmiş performans meşhur bir kötü seçicidir. Önümüzdeki on yılın kazanan yöneticisini seçmek, önümüzdeki on yılın kazanan hissesini seçmekle aynı problemdir, bir kat yukarıda.

**3. Maliyetler aleyhinize bileşiklenir.** Endeks fonları yılda %0,03–0,2 kadar düşük gider oranı alır; aktif fonlar genelde %0,5–1,5 artı daha yüksek içsel alım-satım maliyeti alır. Yıllık %1'lik sürtünme, 40 yıl boyunca bileşiklendiğinde nihai servetin kabaca dörtte birini yer. Endeks fonu, kısmen sadece paranızı harcamayı reddederek kazanır.

## Gerçekte ne elde edersiniz

| Özellik | Endeks fonu | Tipik aktif fon |
| --- | --- | --- |
| Amaç | Piyasaya eşlik etmek | Piyasayı yenmek |
| Yıllık ücret | ~%0,03–0,2 | ~%0,5–1,5+ |
| Çeşitlendirme | Yüzlerce–binlerce kıymet | Yöneticinin seçimleri |
| Kilit kişi riski | Yok | Yöneticinin ayrılması önemlidir |
| Öngörülebilirlik | Piyasa getirisini alırsınız, eksi ~hiçbir şey | Endeks etrafında geniş saçılım |

Dürüst çerçeve: endeks fonu piyasayı asla yenemeyeceğinizi garanti eder — karşılığında ise sizi istatistiksel olarak çok yüksek olasılıkla, denemeye kalkan çoğu insandan üstün kılar.

## Endeks fonlarının çözmediği şeyler

Piyasa riskini kaldırmazlar: toplam piyasa fonu 2008–09'da kabaca yarı yarıya düştü ve piyasayla birlikte toparlandı. Varlık dağılımınızı sizin yerinize seçmezler — ne kadar hisse, ne kadar tahvil hâlâ sizin kararınızdır (ve fon seçiminden daha önemlidir). Ayrıca dar bir endeks (tek sektör, tek tema) çeşitlendirme değildir; önerilen, **geniş tabanlı** endekslerdir.

## SSS

**Herkes endekse geçse, piyasalar bozulmaz mı?**
Teorik bir uçta fiyat keşfi zayıflardı — ama aktif alım-satım hâlâ günlük hacme hâkim ve bıraktığı her verimsizlik hisse seçicileri geri çeker. O sınırdan çok uzağız.

**Endeks fonu mu, ETF mi?**
İkisi de aynı endeksi izleyebilir; fark işlem kabuğundadır. Uzun vadeli bir tasarrufçu için ikisi de uygundur — önemli olan ücretler ve izlenen endekstir.

**Endeks fonu "ortalamaya razı olmak" mıdır?**
*Piyasanın* getirisine razı olunur ve bu getiri masraflardan sonra tarihsel olarak çoğu profesyonelin sonucunun üzerinde kalmıştır. Ortalama fiyat, ortalamanın üzerinde sonuç.${NOTE}`,
  },
  {
    topicKey: 'inflation-purchasing-power',
    title: 'Enflasyon Alım Gücünüzü Nasıl Sessizce Eritir?',
    question: 'Enflasyon zaman içinde tasarrufları ve alım gücünü gerçekte nasıl aşındırır?',
    summary:
      'Enflasyon, atıl nakit üzerine yavaş ve bileşik bir vergidir: yılda %3 ile para alım gücünün yarısını yaklaşık 24 yılda yitirir. Reel (enflasyondan arındırılmış) getiriyi anlamak, tasarruf etmekle serveti korumayı ayıran şeydir.',
    tags: ['finans', 'enflasyon', 'ekonomi', 'tasarruf'],
    language: 'tr',
    image: {
      prompt: promptOf('inflation-purchasing-power'),
      alt: 'Kum saatindeki bir madeni para küçülürken çevresindeki eşyaların büyümesi',
    },
    sources: [
      { title: 'ABD Çalışma İstatistikleri Bürosu — Tüketici Fiyat Endeksi (TÜFE)', url: 'https://www.bls.gov/cpi/' },
      { title: 'FRED (St. Louis Fed) — enflasyon veri serileri', url: 'https://fred.stlouisfed.org' },
    ],
    content: `# Enflasyon Alım Gücünüzü Nasıl Sessizce Eritir?

Enflasyon, fiyatların genel olarak yükselme hızıdır — eş deyişle, her bir para biriminin giderek daha az şey satın alma hızıdır. Tıpkı bileşik faiz gibi işler, ama aleyhinize: küçük yıllık yüzdeler, sessizce bileşiklenir, ta ki birikimli etki devasa olana dek. Yatağın altına saklanan nakit "güvende" değildir; küçülmesi **garantilidir**.

## Kaybın bileşik aritmetiği

72 kuralını tersine kullanarak — 72 bölü enflasyon oranı, alım gücünün yarıya inmesi için gereken yılı verir:

| Ortalama enflasyon | Para … yılda yarıya iner |
| --- | --- |
| %2 | ~36 yıl |
| %3 | ~24 yıl |
| %5 | ~14 yıl |
| %8 | ~9 yıl |

Ölçülü bir %3'te, çekmecenizdeki 100, alım gücü açısından on yıl sonra yaklaşık 74, yirmi yıl sonra 55, yirmi dört yıl sonra 48 olur. Hiçbir şey çalınmadı; sadece her şey pahalandı.

## Nominal vs reel: önemli olan tek ayrım

Enflasyon %3 iken %2 ödeyen bir mevduat hesabının **reel getirisi kabaca −%1'dir** — bakiye büyürken alım gücünüzü kaybedersiniz. Her zaman enflasyonu çıkarın:

reel getiri ≈ nominal getiri − enflasyon oranı

Bu tek çıkarma işlemi, para kararlarının çoğunu yeniden çerçeveler. "Mevduatım %4 veriyor" cümlesi, fiyatların %2 mi yoksa %6 mı arttığını bilene dek hiçbir şey ifade etmez. Tarihsel olarak, geniş tabanlı hisse endeksleri uzun dönemde pozitif reel getiri sağlamıştır (ABD'de çok uzun pencerelerde kabaca reel %6–7), nakit ve kısa vadeli mevduat ise reel olarak sıfıra yakın — bazen altında — gezinmiştir.

## Enflasyon kime zarar, kime yarar

- **Zarar görenler**: nakit ve sabit ödeme tutanlar — düşük getirili hesaplardaki tasarrufçular, sabit emekli aylığı alan herkes, düşük faizi kilitlemiş borç verenler.
- **Yarar görenler**: sabit faizli borcu olanlar (daha "ucuz" parayla geri ödeyenler) ve reel varlık sahipleri — işletmeler, gayrimenkul, hisseler — ki bunların fiyatı ve kazancı zamanla fiyat düzeyiyle birlikte yükselme eğilimindedir.

Bu asimetri, "onlarca yıllık birikimi tamamen nakitte tutmanın" en güvenli hissettiren ama tarihsel olarak en istikrarlı kaybettiren stratejilerden biri olmasının nedenidir.

## Ölçülen enflasyon vs sizin enflasyonunuz

Resmî TÜFE ulusal ortalama bir sepeti izler. Sizin kişisel oranınız hayatınıza göre değişir: pahalı şehirlerde kiracılar, okul ücreti ödeyen ebeveynler ya da sık seyahat edenler manşetin epey üzerinde enflasyon yaşayabilir; yerleşik bir ev sahibi daha azını yaşayabilir. Finansınızı yalnızca manşet rakama göre değil, **kendi sepetinize** göre değerlendirin.

## SSS

**Bir miktar enflasyon iyi midir?**
Çoğu merkez bankası bilerek ~%2 hedefler — ılımlı enflasyon ücret ayarlamalarını kolaylaştırır ve nakit istiflemeyi caydırır; deflasyon (düşen fiyatlar) ise ekonomik durgunluğa eşlik etme ve borcu ağırlaştırma eğilimindedir.

**Enflasyon, tüm nakitten kaçınmam gerektiği anlamına mı gelir?**
Hayır — acil durum fonunun işi büyümek değil erişilebilir olmaktır ve enflasyon maliyeti, güvenlik için ödediğiniz primdir. Hata, **onlarca yıl vadeli** parayı nakitte tutmaktır.

**Enflasyona karşı ne korur?**
Uzun vadede: üretken varlıklar (geniş tabanlı hisseler, gayrimenkul) ve enflasyona endeksli tahviller. Kısa vadede hiçbir şey kusursuz değildir — bu yüzden varlıkları vade ufkuna eşlemek önemlidir.${NOTE}`,
  },
  {
    topicKey: 'emergency-fund',
    title: 'Acil Durum Fonunuz Ne Kadar Büyük Olmalı?',
    question: 'Acil durum fonunda kaç aylık gider tutmalıyım ve nerede?',
    summary:
      'Standart yanıt: anında erişilebilir, risksiz biçimde 3–6 aylık temel gider; geliriniz oynaksa daha fazlası. İşi getiri değil sigortadır: kötü şansın borca dönüşmesini engeller.',
    tags: ['finans', 'tasarruf', 'acil durum fonu', 'bütçe'],
    language: 'tr',
    image: {
      prompt: promptOf('emergency-fund'),
      alt: 'Cam kubbe altında yastıkla korunan ve fırtına parçalarını savuşturan ışık küresi',
    },
    sources: [
      { title: 'ABD Tüketici Finansal Koruma Bürosu (CFPB) — acil durum tasarrufu rehberleri', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# Acil Durum Fonunuz Ne Kadar Büyük Olmalı?

Acil durum fonu, tek işi şokları emmek olan paradır — işsizlik, sağlık faturaları, su ısıtıcısıyla aynı hafta ölen araba. Standart yönlendirme **3–6 aylık temel gider**, sıkıcı, likit ve risksiz bir yerde tutulur. Tasarımı gereği az kazandırır: sigorta satın alıyorsunuz ve vazgeçilen getiri primdir.

## Tutarı dürüstçe belirlemek

**Temel** aylık harcamayı sayın — barınma, gıda, faturalar, sigorta, ulaşım, asgari borç ödemeleri — tüm yaşam tarzı harcamanızı değil. Sonra gelirinizin ne kadar kırılgan olduğuna göre ölçekleyin:

| Durum | Makul hedef |
| --- | --- |
| Hanede iki istikrarlı maaş | 3 aylık temel gider |
| Tek istikrarlı maaş | 4–6 ay |
| Serbest çalışma / prim / mevsimlik gelir | 6–12 ay |
| Tek gelir + bakmakla yükümlü kişiler + zayıf iş piyasası | 12 aya doğru |
| Yakın bilinen risk (işten çıkarma duyuruldu, sözleşme bitiyor) | şimdi, ne kadar mümkünse |

Kalıp şu: fon, geliri kaybetmekle yerine koymak arasındaki gerçekçi boşluğu, artı yol boyunca muafiyet ölçeğindeki şokları karşılar.

## Nerede tutmalı

Üç gereklilik: **haftalar değil günler içinde erişilebilir; nominal değer kaybı yok; harcama parasından ayrı.** Bu, yüksek getirili mevduat hesaplarını, para piyasası fonlarını ya da cezasız erişimli kısa vadeli mevduatları işaret eder. Hisseleri (ihtiyaç duyduğunuz ay %30 düşmüş olabilir), uzun kilit süreleri ve satmaya tereddüt edeceğiniz her şeyi devre dışı bırakır. Onu maaş kartınızdan farklı bir bankada tutmak, "ödünç alma" dürtüsüne karşı işe yarar bir sürtünme ekler.

## Neden bunun yerine yatırmamalı?

Çünkü acil durumlar düşüşlerle ilişkilidir. Klasik başarısızlık senaryosu: durgunluk vurur, işinizi kaybedersiniz **ve** borsa %35 düşmüştür, böylece "endeks fonundaki acil durum fonunuz" tam da en küçük olduğu anda ödeme yapar. Fonun değeri, sizin şansınızla ilişkisiz olmasıdır. Evet, enflasyon onu kemirir — bu sigortanın bedelidir ve yatırımları dipte bozdurmaktan ya da %20 faizli kredi kartı borcu taşımaktan daha ucuzdur.

## Sıfırdan inşa etmek

İşe yarar bir sıra: önce bir ay öne geçin (bu, "ay sonunu zor getirme" stresinin çoğunu öldürür), sonra tüm borçların en azından asgarisini öderken üç aya doğru ilerleyin, ardından yüksek faizli borcun mu yoksa fonun geri kalanının mı öncelikli olduğunu yeniden değerlendirin — matematiksel olarak %20 faizli bir kartı kapatmak yenilmez bir "getiri"dir, bu yüzden çoğu kişi bir ayda durur, zehirli borcu temizler, sonra fonu tamamlar.

## SSS

**Kredi kartı kabul edilebilir bir acil durum fonu mudur?**
O bir acil durum *köprüsü*dür, fon değil — tasarruf transferinden önceki 48 saat için uygun, plan olarak berbat, çünkü en önemli acil durumlar (işsizlik) tam da %20 faizli borç taşımanın en çok yaktığı andır.

**Fon gelirimle birlikte büyümeli mi?**
*Giderleriniz ve yükümlülüklerinizle* birlikte büyümeli. Biriktirdiğiniz bir zam daha büyük bir fon gerektirmez; bir konut kredisi ve iki çocuk gerektirir.

**Ne acil durum sayılır?**
Beklenmedik, gerekli, acil — herhangi üçünü seçin. Uçak biletinde indirim üçünü de geçemez; işiniz için gereken bozuk bir şanzıman üçünü de geçer.${NOTE}`,
  },
  {
    topicKey: 'stocks-vs-bonds',
    title: 'Hisse Senedi mi Tahvil mi: Gerçek Fark Nedir?',
    question: 'Hisse senedi ile tahvil arasındaki gerçek fark nedir ve nasıl farklı davranırlar?',
    summary:
      'Hisse senedi mülkiyettir — getiriniz işletmenin gidişatına bağlıdır. Tahvil bir kredidir — getiriniz bir sözleşmedir. Bu tek fark, hisselerin neden ortalamada daha çok kazandırdığını ve tahvillerin bir portföyü neden dengelediğini açıklar.',
    tags: ['finans', 'yatırım', 'hisse senedi', 'tahvil'],
    language: 'tr',
    image: {
      prompt: promptOf('stocks-vs-bonds'),
      alt: 'Engebeli yükselen bir sırtın yanında yumuşak ve düzgün bir ışık merdiveni',
    },
    sources: [
      { title: 'Investor.gov (ABD SEC) — hisse senedi ve tahvile giriş', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) — tarihsel getiri verileri', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Hisse Senedi mi Tahvil mi: Gerçek Fark Nedir?

Bir **hisse senedi** sizi bir işletmenin kısmi sahibi yapar: kârına (temettü, büyüme) ve başarısızlıklarına, hiçbir söz olmadan ortak olursunuz. Bir **tahvil** sizi bir işletmeye ya da devlete kredi veren yapar: size sözleşmeyle sabit faiz borçludurlar ve paranızı bir tarihte geri öderler. Geri kalan her şey — getiri farkı, risk farkı, portföylerin ikisini nasıl harmanladığı — mülkiyete karşı borç vermeden çıkar.

## Her birinin sunduğu anlaşma

| | Hisse senedi (mülkiyet) | Tahvil (kredi) |
| --- | --- | --- |
| Getiriniz | Herkese ödendikten sonra kalan — sınırsız yukarı potansiyel | Sabit kupon + anapara — sınırlı yukarı potansiyel |
| Şirket gelişirse | Büyümeyi yakalarsınız | Yine aynı kuponları alırsınız |
| Batarsa | En sondasınız, çoğu zaman silinirsiniz | Alacaklılar sahiplerden önce ödenir |
| Başlıca riskler | İşletme sonuçları, piyasa duyarlılığı | Temerrüt, enflasyon, yükselen faizler |
| Tarihsel uzun dönem reel getiri (ABD, çok uzun pencereler) | yılda ~%6–7 | yılda ~%1–3 |
| Tipik kötü yıl | −%20 ile −%50 | −%5 ile −%15 (faiz şokları) |

Hisselerin daha yüksek ortalama getirisi bir ikramiye değil, belirsizliği ve "en sonda olma" konumunu kabul etmenin **ödülüdür**. Finans buna hisse senedi risk primi der.

## Tahvil fiyatlarını ne hareket ettirir

Tahviller sabit değildir: ikincil piyasada işlem gören tahvil fiyatları faizlerle **ters yönde** hareket eder. %2 ödeyen bir tahvil tutuyorsanız ve yeni tahviller %5 ödüyorsa, kimse sizinkini nominalden almaz — getiriler eşitlenene dek fiyatı düşer. Daha uzun vadeli tahviller daha sert sallanır. Bu yüzden faizler sıçradığında "güvenli" tahvil fonları bile tarihsel olarak kötü bir yıl geçirdi ve tahviller riski **azaltır ama yok etmez**.

## Portföyler neden ikisini de tutar

Hisseler ve tahviller çoğu zaman (her zaman değil) farklı zamanlarda zikzak çizer: hisseleri ezen durgunluklar genellikle yüksek kaliteli tahvilleri yükselten faiz indirimleri getirir. Klasik 60/40 karışım, hisselerin büyümesinin çoğunu tarihsel olarak anlamlı ölçüde daha küçük düşüşlerle yakaladı. Karışım bir kadrandır:

- **Daha çok hisse** → daha yüksek beklenen büyüme, daha büyük ve daha uzun düşüşler. Uzun vadelere uyar.
- **Daha çok tahvil** → daha dengeli yolculuk, daha düşük beklenen büyüme. Yakın vadeli ihtiyaçlara ve zayıf midelere uyar.

Doğru ayar, paraya ne zaman ihtiyaç duyduğunuza ve çöküşte nasıl davrandığınıza bağlıdır — panikle hisse satmak, herhangi bir dağılım hatasından daha pahalıdır.

## SSS

**Tahviller "güvenli" midir?**
İşletme iflasına karşı hisselerden güvenli; enflasyona ya da faiz hareketlerine karşı değil. Vadeye kadar tutulan bir devlet tahvili söz verdiği nakdi öder — ki enflasyon bunu sessizce değersizleştirebilir.

**Tek tek tahvil mi yoksa tahvil fonu mu?**
Fonlar kolay çeşitlendirme ve likidite sunar; tek tahviller bilinen bir ödeme tarihi sunar. Çoğu tasarrufçu için geniş tabanlı, yüksek kaliteli bir tahvil fonu daha basit araçtır.

**Gencim, neden %100 hisse olmasın?**
Onlarca yıllık ufuk ve demir disiplinle matematiksel olarak savunulabilir. Dürüst risk davranışsaldır: %45'lik bir düşüş, disiplini hesap tablolarının yakalayamadığı biçimlerde sınar.${NOTE}`,
  },
  {
    topicKey: 'dollar-cost-averaging',
    title: 'Maliyet Ortalaması Nedir — ve Ne Zaman Mantıklıdır?',
    question: 'Maliyet ortalaması nedir ve bir kerede toplu yatırım yapmaktan daha mı iyidir?',
    summary:
      'Maliyet ortalaması, sabit tutarı sabit bir takvimde yatırır ve fiyatlar düşükken daha çok pay alır. Maaşla biriktirenler için kendiliğinden olur; bir miktar büyük para içinse toplu yatırım matematiksel olarak genelde kazanır — maliyet ortalaması ise davranışsal olarak kazanır.',
    tags: ['finans', 'yatırım', 'maliyet ortalaması', 'strateji'],
    language: 'tr',
    image: {
      prompt: promptOf('dollar-cost-averaging'),
      alt: 'Düzenli aralıklarla düşen damlaların dalgalı yüzey altında sakin bir havuzda toplanması',
    },
    sources: [
      { title: 'Bogleheads wiki — Dollar cost averaging', url: 'https://www.bogleheads.org/wiki/Dollar_cost_averaging' },
      { title: 'Investor.gov (ABD SEC) — yatırım temelleri', url: 'https://www.investor.gov' },
    ],
    content: `# Maliyet Ortalaması Nedir — ve Ne Zaman Mantıklıdır?

Maliyet ortalaması (DCA), düzenli aralıklarla aynı miktarda para yatırmak demektir — diyelim her ayın birinde 500 — piyasanın ne yaptığına bakmaksızın. Sabit tutar, fiyatlar düşükken daha çok, yüksekken daha az pay alır ve yatırımdaki en kötü soruyu ("şimdi iyi bir zaman mı?") zamanlamayı bir karar olmaktan çıkararak ortadan kaldırır.

## Aritmetik

Fiyatı dalgalanan bir fona ayda 300 yatırın:

| Ay | Fiyat | Alınan pay |
| --- | --- | --- |
| Oca | 30 | 10,0 |
| Şub | 20 | 15,0 |
| Mar | 25 | 12,0 |
| Nis | 30 | 10,0 |

47 pay için 1.200 harcadınız — pay başına ~25,5 ortalama maliyet, basit fiyat ortalamasının (26,25) *altında*, çünkü sabit bütçe ucuz ayı otomatik olarak ağırlıklandırdı. Mekanik avantaj budur: hiçbir şeyi tahmin etmeden, disiplinli biçimde düşüşten satın almak.

## Birbirinden çok farklı iki durum

**1. Maaştan yatırmak (çoğu insan).** DCA bir strateji seçimi değil — tek seçenektir, çünkü para aylık gelir. Onu otomatikleştirmek saf kazançtır: karar yok, korkutucu manşetlerde tereddüt yok, sisteme bırakılmış onlarca yıllık disiplin.

**2. Bir miktar büyük parayı yatırmak (ikramiye, miras, satış).** Burada tümünü bugün yatırabilir ya da bir yıla yayabilirsiniz. Matematiksel olarak toplu yatırım, yaymaya karşı tarihsel olarak kabaca üçte iki oranında kazanmıştır, çünkü piyasalar düştüğünden daha sık yükselir ve DCA parayı kenarda bekletir. Ama kaybettiği üçte birde, tam da en kötü psikolojik anda kaybeder — her şeyi yatırdıktan hemen sonra.

| | Toplu yatırım | ~12 aya yayılmış DCA |
| --- | --- | --- |
| Beklenen sonuç | Daha yüksek (piyasada daha çok zaman) | Biraz daha düşük |
| En kötü senaryonun hissi | Acımasız (çöküşten önce tam yatırım) | Yastıklanmış |
| Hiç yatırmama riski | Bittikten sonra düşük | Plan ortasında "duraklamak" yaygın |

Pragmatik yanıt: kötü bir ay planı terk etmenize ya da uyku kaçırmanıza yol açacaksa, büyük parayı yazılı bir takvime göre 6–12 aya yayın — büyük bir davranışsal güvence için küçük bir beklenen maliyet. Oynaklığa gerçekten omuz silkebiliyorsanız, yatırın ve devam edin.

## DCA nerede sessizce başarısız olur

**Tek bir hisseye** DCA, asla toparlanmayabilecek bir şeyde ortalama almaktır — mekanizma yalnızca varlık geniş tabanlı çeşitlenmiş ve uzun dönem yukarı eğilimliyken işe yarar şekilde "düşüşten alır". Ayrıca, **çöküşlerde katkıyı durdurmak** bütün anlamı siler: ucuz paylar, stratejinin var olma nedeni olan paylardır.

## SSS

**DCA kâr garanti eder mi?**
Hayır — *ne zaman* aldığınızı şekillendirir, varlığın yükselip yükselmeyeceğini değil. Düşen bir varlık yine para kaybettirir, sadece daha düşük bir ortalama maliyetten.

**Haftalık mı, aylık mı?**
Yıllar boyunca pratikte aynı. Maaşınıza eşleyip unutun; sıklık üzerine kafa yormak gereksiz ayrıntıdır.

**Piyasa pahalı görünürken DCA'yı duraklatmalı mıyım?**
Bu, kılık değiştirmiş zamanlamadır. Stratejinin değeri tam da değerlemelerle ilgili hislerinizi yok saymasıdır.${NOTE}`,
  },
  {
    topicKey: 'asset-allocation',
    title: 'Varlık Dağılımı ve Yeniden Dengeleme, Basitçe Anlatıldı',
    question: 'Varlık dağılımı nedir ve yeniden dengeleme gerçekte nasıl işler?',
    summary:
      'Hisse, tahvil ve nakit arasındaki dağılımınız, bir portföyün riskinin ve uzun dönem davranışının büyük kısmını belirler — fon seçiminden çok daha fazlasını. Yeniden dengeleme, kazananları budayıp kaybedenleri takviye ederek bu dağılımı hedefte tutar.',
    tags: ['finans', 'yatırım', 'varlık dağılımı', 'portföy'],
    language: 'tr',
    image: {
      prompt: promptOf('asset-allocation'),
      alt: 'Terazi üzerinde dengede tutulan üç renkli ışıklı bir pasta grafiği',
    },
    sources: [
      { title: 'Bogleheads wiki — Varlık dağılımı', url: 'https://www.bogleheads.org/wiki/Asset_allocation' },
      { title: 'Investor.gov (ABD SEC) — Varlık dağılımı temelleri', url: 'https://www.investor.gov' },
    ],
    content: `# Varlık Dağılımı ve Yeniden Dengeleme, Basitçe Anlatıldı

Varlık dağılımı, portföyünüzün varlık sınıfları arasındaki yüzde bölünmesidir — tipik olarak büyüme için hisse, istikrar için tahvil, anındalık için nakit. Portföyünüzün nasıl davranacağına hâkim olan **tek** karardır: onlarca yıl geriye giden araştırmalar, çeşitlenmiş bir portföyün getiri *değişkenliğinin* büyük kısmını, kovaları dolduran belirli fonlara ya da hisselere değil, dağılımına atfeder.

## Neden dağılım, seçimlerden daha önemlidir

İkisi de mükemmel düşük maliyetli fonlar tutan iki yatırımcı, biri %90 hisse diğeri %30 ise tamamen farklı deneyimler yaşar. 90/10 yatırımcısı kabaca iki katı uzun dönem büyüme beklemeli — ve kötü çöküşlerde −%45'e yakın düşüşler. 30/70 yatırımcısı büyümenin çoğundan vazgeçip nadiren −%15'i aşan düşüşler alır. İkisi de yanlış değil; farklı sorulara yanıt veriyorlar: *paraya ne zaman ihtiyaç var ve bu kişi panik etmeden neyi katlanabilir?*

Kaba bir harita:

| Paraya … içinde ihtiyaç | Yaygın dağılım biçimi |
| --- | --- |
| 3 yıldan az | Çoğunlukla nakit ve kısa tahvil |
| 3–10 yıl | Dengeli, örn. %40–60 hisse |
| 10–30+ yıl | Hisse ağırlıklı, örn. %70–90 hisse |

"110 eksi yaşınız kadar hisse" gibi pratik kurallar kaba başlangıç noktalarıdır — sabitlemek için yararlı, yasa değil. Risk *kapasitesi* (vadeniz, gelir istikrarı) ve risk *toleransı* (uykunuzu kaçırmadan katlanabildiğiniz) ikisi de sayılır ve **ikisinden düşük olanı kazanmalıdır**.

## Yeniden dengeleme nedir

Piyasalar hareket eder; dağılımınız kayar. Harika bir hisse yılının ardından 60/40 portföy 70/30'a oturabilir — seçtiğinizden sessizce daha riskli. Yeniden dengeleme, büyüyenden bir kısmını satıp geride kalanı alarak hedefi geri yükler. Getiri kovalama değil, **risk bakımı**dır: tahmin yapmadan, takvime göre, pahalı taraftan kâr alıp ucuz tarafı takviye edersiniz.

İki işe yarar tetikleyici — birini seçip otomatikleştirin:

- **Takvim**: yılda bir ya da iki kez, aynı tarih.
- **Eşik**: herhangi bir varlık hedeften ~5 puandan fazla saptığında dengeleyin.

Süregelen tasarrufçular için en ucuz yöntem **katkılarla yeniden dengelemedir**: yeni parayı hedefin altındaki varlığa yönlendirip satışlardan (ve her türlü vergi ya da ücretten) tamamen kaçınmak.

## Dayattığı disiplin

Yeniden dengelemenin sessiz süper gücü davranışsaldır: çöküşlerden sonra hisse almaya (hedefiniz az ağırlıkta olduğunuzu söylediğinde) ve coşkudan sonra budamaya zorlar — tam da duyguların direndiği işlemler. 2008–09 boyunca yeniden dengeleyen yatırımcılar, cesarete değil yalnızca bir kurala ihtiyaç duyarak dibe yakın yerde mekanik olarak satın aldılar.

## SSS

**Yeniden dengeleme getiriyi artırır mı?**
Bazen biraz (benzer getirili varlıklar arasında), bazen biraz maliyet getirir (uzun bir boğa koşusunu budamak). Asıl ürünü, riski seçtiğiniz düzeyde tutmaktır.

**Hedefler ne kadar kesin olmalı?**
Tam sayılar, geniş bantlar. 58/42 ile 60/40 gürültüdür; dağılımı sürekli kurcalamaya çevirmek tasarımı bozar.

**Gayrimenkul, altın, kripto gibi diğer varlıklar nereye girer?**
Çeşitlendirme için eklenen, kasıtlı ve üst sınırlı dilimler olarak (yaygın olarak her biri ≤%5–10) — onlar hakkında tamamen yanılmanın hayatınızı değiştirmeyeceği kadar küçük boyutlandırılmış.${NOTE}`,
  },
  {
    topicKey: 'market-timing',
    title: 'Piyasayı Zamanlamak Neden Bu Kadar Zor (Profesyoneller İçin Bile)?',
    question: 'Piyasayı zamanlamak neden profesyoneller için bile neredeyse imkânsız sayılır?',
    summary:
      'Piyasa zamanlaması iki kez haklı çıkmayı gerektirir — düşüşlerden önce satmak, yükselişlerden önce almak — beklentileri zaten içermiş, hızlı hareket eden fiyatlara karşı. Çöküşlerin içinde kümelenen birkaç en iyi günü kaçırmak, onlarca yıllık getiriyi yok eder.',
    tags: ['finans', 'yatırım', 'piyasa zamanlaması', 'davranış'],
    language: 'tr',
    image: {
      prompt: promptOf('market-timing'),
      alt: 'Dalganın tepe ve diplerine tam isabet etmeye çalışıp çoğu hafifçe ıskalayan oklar',
    },
    sources: [
      { title: 'SPIVA — süreklilik ve aktif yönetim karneleri', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Aswath Damodaran (NYU Stern) — piyasa verileri ve analizi', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Piyasayı Zamanlamak Neden Bu Kadar Zor (Profesyoneller İçin Bile)?

Piyasa zamanlaması — düşüşlerden önce çıkıp toparlanmalardan önce geri girmek — insanlar aptal olduğu için değil, oyun yapısal olarak oyuncunun aleyhine kurulduğu için başarısız olur. **İki kez** haklı çıkmalısınız, **ne zaman** üzerinde, **uzlaşıyı zaten içeren fiyatlara** karşı, üstelik ödül günleri **en korkutucu haftaların içinde** saklıyken. Her engel tek başına zordur; çarpıldıklarında, zamanlama stratejilerinin neden hikâyelerde harika, denetlenmiş sonuçlarda zayıf göründüğünü açıklarlar.

## Dört yapısal sorun

**1. İki doğru çağrı, hatayı çarpar.** Doğru çıkmak, doğru geri girmediğiniz sürece değersizdir. Çağrı başına %70 isabetli biri — kanıtların desteklediğinden çok daha iyi — gidiş-dönüşte yalnızca ~%49 oranında haklıdır, maliyetlerden önce.

**2. Fiyatlar önce hareket eder.** Piyasalar ileriye bakar: durgunluk haberlere düştüğünde fiyatlar aylar önce düşmüştür; toparlanmalar da korkunç manşetlerin ortasında, almak çılgınca hissettirirken başlar. Görünür şekilde olana göre hareket etmek, fiyatta zaten bulunan bilgiyle işlem yapmaktır.

**3. En iyi günler en kötü dönemlerin içinde kümelenir.** Uzun dönem çalışmaları tekrar tekrar gösteriyor ki *onlarca yıl* içinden yalnızca 10–20 tek en iyi günü kaçırmak nihai serveti çarpıcı biçimde — çoğu zaman yarı yarıya veya daha fazla — düşürür ve bu günler ezici çoğunlukla çöküşlerde ve hemen ardından gelen yükselişlerde, tam da bir zamanlayıcının nakitte "netlik bekleyerek" oturduğu sırada gerçekleşir.

**4. Taban oran, yoklukluğu cezalandırır.** Hisseler çoğu yıl yükselir; kenardaki nakit varsayılan olarak bir fırsat maliyeti öder. Bir zamanlayıcının sadece haklı olması gerekmez — piyasanın yukarı yönlü kaymasından, artı vergi ve işlem maliyetlerinden *daha fazla* haklı olması gerekir.

## Profesyonel sicil ne gösteriyor

Onlarca yıllık SPIVA karneleri, çoğu profesyonel fonun — tüm görevi zamanlama olan taktiksel ve esnek dağılımlı fonlar dahil — uzun pencerelerde basit kıyas ölçütlerinin gerisinde kaldığını ve az sayıdaki kazananın nadiren tekrar ettiğini gösteriyor. "Endeks bir yıl sonra nerede olacak" anketleri rutin olarak geniş farklarla ıskalıyor. Bu, bireysel yatırımdaki en sağlam ampirik olgudur ve sıkıcı tavsiyenin neden zirvede olduğunun nedenidir.

## Bunun yerine ne işe yarar

Tahmin değil — *önceden taahhüt*:

| Şu yerine… | Şunu yapın… |
| --- | --- |
| "Bir sonraki çöküşten önce çıkacağım" | En kötü senaryosuna dayanabileceğiniz bir dağılım tutun |
| "Dipten geri alacağım" | En kötüleri dahil her ay alan otomatik katkılar kurun |
| "Her şey netleşene dek nakit" | Netlik ile düşük fiyatların asla bir arada olmadığını kabul edin |
| Manşetlere tepki vermek | Takvim/eşik kurallarına göre yeniden dengelemek |

Bu, zamanlamayı bir tahmin probleminden (kazanılamaz) bir tasarım problemine (çok kazanılır) dönüştürür.

## SSS

**"Düşüşten al" piyasa zamanlaması mıdır?**
Düşüşleri *bekleyerek* nakit tutmak öyledir — ve tarihsel olarak yatırımda kalmanın gerisinde performans gösterir. Takvimli yeni parayı düşüşlerde yatırmak ise sadece katkı disiplinidir.

**Bazı insanlar büyük çöküşleri ünlü biçimde önceden söylemedi mi?**
Her zaman birileri söyler — her seferinde farklı insanlar. Öngörüyü, gürültülü tahminlerin büyük bir örnekleminden ayırmak iş işten geçtikten sonra neredeyse imkânsızdır; birikiminizi bunu önceden teşhis edebileceğinize yatırmak, istatistiği öğrenmenin zor yoludur.

**Yani fiyatlar hiç öngörülemez mi?**
Kısa vadeli yön: pratik amaçlar için, etkili biçimde hayır. Uzun dönem beklenen getiriler değerlemelerle gevşek biçimde ilişkilidir — beklentileri ayarlamak için yararlı, bir çıkış sinyali olarak yararsız.${NOTE}`,
  },
  {
    topicKey: 'etf-vs-mutual-fund',
    title: 'ETF mi Yatırım Fonu mu: Hangi Kabuğu Kullanmalısınız?',
    question: 'ETF ile yatırım fonu arasındaki fark nedir ve hangisini seçmeliyim?',
    summary:
      'ETF’ler ve yatırım fonları aynı fikrin kabuklarıdır — havuzlanmış, çeşitlendirilmiş yatırım. ETF’ler hisse gibi gün boyu işlem görür ve genelde daha düşük maliyetlidir; yatırım fonları günde bir kez fiyatlanır ve katkıları daha pürüzsüz otomatikleştirir. İçerideki strateji, kabuktan önemlidir.',
    tags: ['finans', 'yatırım', 'etf', 'fonlar'],
    language: 'tr',
    image: {
      prompt: promptOf('etf-vs-mutual-fund'),
      alt: 'Hızlı bir bantta kayan bir küp sepeti ile bir kaide terazisinde sakince tartılan bir sepet',
    },
    sources: [
      { title: 'Investor.gov (ABD SEC) — Yatırım fonları ve ETF’ler', url: 'https://www.investor.gov' },
      { title: 'Morningstar — fon ve ETF araştırması', url: 'https://www.morningstar.com' },
    ],
    content: `# ETF mi Yatırım Fonu mu: Hangi Kabuğu Kullanmalısınız?

Bir ETF (borsada işlem gören fon) ile bir yatırım fonu *tam olarak aynı portföyü* tutabilir — aynı endeks, aynı hisseler. Fark kabuktadır: nasıl satın aldığınız, fiyatların ne zaman belirlendiği, neye mal olduğu ve vergilerin nasıl sonuçlandığı. Kabuk seçimi bir lojistik kararıdır, strateji kararı değil — ve lojistik bile onlarca yılda birikir.

## Mekanik farklar

| | ETF | Yatırım fonu |
| --- | --- | --- |
| İşlem | Borsada gün boyu, hisse gibi | Günde bir kez kapanış NAV’ından |
| Asgari tutar | Bir pay (ya da aracı izin verirse kesir) | Genelde sabit asgariler (değişir) |
| Tipik maliyet | Genelde en düşük gider oranları; işlemde alış-satış farkı ödersiniz | Endeks sürümleri için düşük; bazıları satış/12b-1 ücreti taşır — kaçınılabilir |
| Otomatik yatırım | Aracıya bağlı, giderek daha çok destekleniyor | Yerleşik ve sorunsuz |
| Vergi verimliliği (ABD) | Ayni oluşturma/itfa genelde sermaye kazancı dağıtımını en aza indirir | Vergiye tabi kazanç dağıtma olasılığı daha yüksek (ülkeye bağlı) |
| Davranış riski | İşlem edilebilirlik kurcalamaya davet eder | Günlük fiyatlama gün içi işlemi caydırır |

## Her kabuğun daha iyi oturduğu durumlar

**ETF’ler şu durumda parlar**: en düşük süregelen ücretleri istiyorsanız, modern bir aracı kurum üzerinden yatırıyorsanız, gün içi kontrole ya da portföy şeffaflığına önem veriyorsanız, ya da (bazı ülkelerde, özellikle ABD) vergiye tabi bir hesapta daha az sürpriz dağıtım istiyorsanız.

**Yatırım fonları şu durumda parlar**: önceliğiniz sürtünmesiz otomasyon ise — sabit aylık tutarlar, kuruşu kuruşuna alımlar, temettü yeniden yatırımı, bordroya bağlı emeklilik planları — "kur ve hiç bakma" işin bütün amacıysa ve endeks sürümleri eşdeğer ETF’lerle esasen aynı maliyetteyse.

## Gerçekten kaçınılması gereken tuzaklar

Kabuk tartışması, asıl para yakan başarısızlık modlarından dikkat dağıtır:

- **Her iki kabuktaki yüksek ücretli fonlar** — endeks benzeri maruziyet için %1+ gider oranı, kabuktan değil ondan kaçılacak şeydir.
- **Bazı yatırım fonlarındaki satış ücretleri ve iz komisyonları** — emtia maruziyeti için ödemeye asla değmez.
- **ETF’lerle işlem dürtüsü** — korkutucu bir manşet sırasında saat 10:43’te satabilme yeteneği, işlemciler için bir özellik, tasarrufçular için bir hatadır.
- **Az işlem gören niş ETF’ler** — geniş farklar her işlemi sessizce vergilendirir; geniş tabanlı ana akım fonlarda bu sorun yoktur.

## SSS

**Biri diğerinden daha mı güvenli?**
Aynı portföy aynı piyasa riskini taşır. Her iki kabuk da sıkı denetlenir; hiçbiri sizi piyasanın düşmesinden korumaz.

**ABD’de ETF’ler vergide neden genelde kazanır?**
Pay oluşturma/itfaları piyasa yapıcılarla "ayni" gerçekleşir, fonun değer kazanmış pozisyonları satmadan elden çıkarmasına olanak tanır — böylece sahiplere daha az sermaye kazancı dağıtımı isabet eder. Avantaj vergiden korunaklı hesaplarda küçülür ve ülkeden ülkeye değişir.

**Sadece gider oranına göre seçebilir miyim?**
Neredeyse: aynı endeks, sonra en düşük toplam maliyet (gider oranı + tipik fark), sonra katkı akışınızı hangisi en iyi otomatikleştiriyorsa. Strateji, tasarruf oranı ve dağılım yine de tüm bunları gölgede bırakır.${NOTE}`,
  },
  {
    topicKey: 'risk-and-return',
    title: 'Risk ve Getiri: Her Yatırımın Ardındaki Takas',
    question: 'Risk ile getiri nasıl ilişkilidir ve "yüksek risk, yüksek getiri" gerçekte ne demektir?',
    summary:
      '"Yüksek risk, yüksek getiri" aslında daha geniş sonuçları — kötülerini de — kabul etmenin karşılığı olarak daha yüksek *beklenen* getiri demektir. Oynaklığı, düşüşleri ve çeşitlendirmenin bedava öğününü anlamak, bu klişeyi kullanılabilir bir araca çevirir.',
    tags: ['finans', 'yatırım', 'risk', 'temel kavramlar'],
    language: 'tr',
    image: {
      prompt: promptOf('risk-and-return'),
      alt: 'Bir tahterevallinin iki ucunda dengelenmiş parlak, hareketli bir küre ile sakin, durağan bir küre',
    },
    sources: [
      { title: 'Investor.gov (ABD SEC) — risk temelleri', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) — risk primleri ve getiriler', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Risk ve Getiri: Her Yatırımın Ardındaki Takas

"Yüksek risk, yüksek getiri" finansta en çok yanlış aktarılan cümledir. Doğru versiyon: daha geniş, daha korkutucu sonuç aralıkları olan yatırımlar daha yüksek **beklenen** getiri sunmalıdır, yoksa kimse onları tutmazdı. Ekstra getiri bir *tazminat*tır — ortalamada ve zamanla ödenir, her risk alana sunulan bir ödül değil. Pek çok risk hiçbir şey ödemez; ustalık, hangi risklerin prim taşıdığını bilmektir.

## Burada "risk" gerçekte ne demek

Tek bir kelime altında birkaç farklı şey gizlenir:

- **Oynaklık** — değerin yıldan yıla ne kadar zıpladığı. Sinir bozucu, atlatılabilir.
- **Düşüş (drawdown)** — tepeden dibe kayıp. Geniş tabanlı hisse piyasaları defalarca %30–50 düştü; bu bir kuyruk senaryosu değil, giriş bedelidir.
- **Kalıcı kayıp** — tek ölümcül olan: bir şirketin batması, yoğunlaşmış bir bahsin patlaması ya da *sizin* dipte satıp geçici bir düşüşü kalıcı bir kayba çevirmeniz.
- **Hedefe ulaşamama riski** — sessiz olan: o kadar temkinli yatırmak ki para amacı için yeterince büyümez. "Güvenli" seçimler bunu bolca taşır.

Çeşitlenmiş bir hisse portföyünün oynaklığı çoğunlukla geçicidir; tek bir hissenin çöküşü çoğu zaman kalıcıdır. Aynı varlık sınıfı, derinden farklı risk.

## Hangi riskler prim öder — hangileri ödemez

| Risk | Karşılığı var mı | Neden |
| --- | --- | --- |
| Geniş tabanlı hisse piyasası riski | Evet — hisse senedi primi | Çeşitlendirilemez; birinin taşıması gerekir |
| Daha uzun / daha zayıf borçluya borç vermek | Evet — vade ve kredi primleri | Gerçek kayıp/erime olasılığı |
| Çok yerine tek hisse tutmak | **Hayır** | Çeşitlendirilebilir — bedava kaldırabileceğiniz riske piyasa ödeme yapmaz |
| Piyango benzeri spekülasyon | Ortalamada negatif | Hayal için ödeme yaparsınız |

Tablodaki en derin pratik içgörü budur: **çeşitlendirme, karşılıksız riski sıfır maliyetle kaldırır** — finansta bedava öğüne en yakın şey. Yoğunlaşma yalnızca gerçek bir üstünlüğünüz ya da içeriden bilgi düzeyinde bir kanaatiniz varsa rasyoneldir; aksi halde karşılıksız risktir.

## Riski amaca eşlemek

Risk kapasitesi *zaman* tarafından belirlenir: gelecek yıl gereken para %40’lık bir düşüşü atlatamaz; 2050’de gereken para bir düzinesini yok sayabilir. Risk toleransı *mizaç* tarafından belirlenir: panikle terk ettiğiniz dağılım, hesap tablosu ne derse desin, hiçbir zaman doğru değildi. Pratik kural — uzun ufuklu parayla katlanabileceğiniz en yüksek *yararlı* riski alın ve hiçbir ufukta, karşılığını almadığınız hiçbir riski almayın.

## SSS

**Hisseler daha riskliyse, danışmanlar emeklilere neden hiç hisse koyuyor?**
Çünkü emeklilik onlarca yıl sürer ve enflasyon da bir risktir. Küçük-orta bir hisse dilimi hedefe ulaşamama riskiyle savaşırken tahviller yakın yılları yönetir.

**Oynaklık doğru risk ölçüsü müdür?**
Ölçülebilir vekildir, gerçeğin kendisi değil. Uzun vadeli bir yatırımcı için gerçek riskler kalıcı kayıp ve hedefe ulaşamamaktır — oynaklık yalnızca sizi satmaya zorladığında ya da korkuttuğunda önemlidir.

**Düşük riskle yüksek getiri alabilir miyim?**
Bu kombinasyonu sunan biri ya yanılıyordur ya da bir şey satıyordur. Gerçek düşük risk/yüksek getiri fırsatları dakikalar içinde arbitrajla yok edilir — tanıtım broşürlerine ulaşmazlar.${NOTE}`,
  },
  {
    topicKey: 'credit-card-interest',
    title: 'Kredi Kartı Faizi Gerçekte Nasıl İşler (ve Neden Çığ Gibi Büyür)?',
    question: 'Kredi kartı faizi gerçekte nasıl hesaplanır ve borç neden bu kadar hızlı büyür?',
    summary:
      'Kredi kartları ana akım finanstaki en yüksek faizlerden bazılarını uygular — genelde yıllık %15–25, bir bakiye taşımaya başladığınızda günlük bileşiklenir. Asgari ödemeler borcu yıllarca uzatacak şekilde tasarlanır; mekaniği anlamak kaçış yoludur.',
    tags: ['finans', 'kredi kartı', 'borç', 'faiz'],
    language: 'tr',
    image: {
      prompt: promptOf('credit-card-interest'),
      alt: 'Bir karttan yükselen borç merdiveni ve her dönüşte büyüyen bir kartopu',
    },
    sources: [
      { title: 'ABD Tüketici Finansal Koruma Bürosu (CFPB) — kredi kartı kaynakları', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# Kredi Kartı Faizi Gerçekte Nasıl İşler (ve Neden Çığ Gibi Büyür)?

Kredi kartı, tek bir zarftaki iki üründür: bakiyeyi her ay kapatırsanız muhteşem bir ödeme aracı, kapatmazsanız ana akım finanstaki en pahalı kredilerden biri — genelde yıllık %15–25, bileşiklenen faizle. Çığ etkisi bir mecaz değil; yüksek oranların, asgari ödemelerin zar zor azalttığı bir bakiyeye günlük uygulanmasının aritmetiğidir.

## Mekanik, adım adım

- **Faizsiz dönem (grace period).** *Tüm ekstre tutarını* son ödeme tarihine kadar ödeyin, alışverişler size hiç faize mal olmaz. Kartın "ücretsiz" para yönetimi olduğu tek mod budur.
- **Onu kaybetmek.** Son ödeme tarihini geçen herhangi bir bakiye taşırsanız, faiz genellikle bundan sonra alışverişlere ilk günden işler — bakiyeyi tekrar tamamen kapatana dek faizsiz dönem gider.
- **Günlük bileşikleme.** Çoğu kart faizi günlük uygular: yıllık %20, ortalama günlük bakiyenize uygulanan günde ~%0,0548’dir. Faiz, önceden işlemiş faiz üzerinden de işler — bileşikleme, hisselerin ancak rüyasında göreceği bir hızda aleyhinize çalışır.
- **Asgari ödeme tuzağı.** Asgariler genelde bakiyenin ~%1–3’üdür. %20 yıllık faizle 5.000 üzerinde ilk yılın faizi tek başına kabaca 1.000’dir — %2 asgari (ayda 100) faizi zar zor geçer, geri ödemeyi on yıla doğru uzatır ve aldığınız her şeyin gerçek maliyetini katlar.

## Bu borç neden hemen her şeyin önündedir

%20 yıllık faizli bir bakiyeyi kapatmak, risksiz biçimde bir "%20 getiri"dir — hiçbir meşru yatırımın güvenilir biçimde sunmayacağı bir şey. Pratik hiyerarşi açıktır:

| Eldeki para | Genelde en iyi kullanım |
| --- | --- |
| %15–25 ile kart borcu taşımak | Yatırımdan önce (işveren katkısı dışında) ona saldırın |
| Hangi kartı önce ödeyeceğine karar vermek | En yüksek faizli önce ("çığ yöntemi") — matematiksel olarak optimal |
| Darboğaz motivasyonsa | En küçük bakiye önce ("kartopu yöntemi") — psikolojik olarak kalıcı |

Her iki sıralama da "her yerde asgari ödeme"yi yıllarca ve binlerce lira farkla geçer.

## Mekanik olarak çıkış

Eklemeyi durdurun (bakiyeye saldırırken günlük harcamayı banka kartına çevirin); küçülen asgari yerine *sabit*, agresif bir tutar ödeyin; bakiyeyi promosyon penceresi içinde kapatmaya dair yazılı bir plan *olmadan* %0 promosyonlu bir karta bakiye transferini düşünmeyin (transfer ücretleri ~%3–5 ve promosyon sonrası oranlar acımasıza döner); ve kişisel kredi konsolidasyonunu af değil, faiz indirimi olarak görün — bakiyeyi oluşturan harcama düzeni bitmezse bakiye yeniden büyür.

## SSS

**Asgariyi ödemek kredi notumu korur mu?**
Geç ödeme izlerini önler, evet — ama yüksek kullanım oranı (bakiye ÷ limit) yine de notu aşağı çeker. Hem not hem maliyet açısından yanıt aynı: bakiyeyi düşürün.

**"Kredi notum için" küçük bir bakiye tutmaya değer mi?**
Kalıcı bir efsane. Tam ödeme aynı ödeme geçmişini oluşturur ve sıfır faize mal olur; bakiye taşımak yalnızca bankayı zenginleştirir.

**Nakit avans aynı oranda mıdır?**
Genelde daha kötü: daha yüksek faiz, peşin bir ücret ve **faizsiz dönem yok** — para makineden çıktığı an faiz başlar. Karttaki en pahalı düğmedir.${NOTE}`,
  },
  {
    topicKey: 'retirement-start-early',
    title: 'Emeklilik Birikimine Erken Başlamak Neden Sonra Daha Çok Biriktirmekten İyidir?',
    question: 'Emeklilik için ne kadar erken biriktirmeye başlamalıyım ve başlama yaşı ne kadar fark eder?',
    summary:
      'Bileşiklenme sayesinde her on yıllık gecikme, aynı emeklilik birikimi için gereken aylık tasarrufu kabaca ikiye katlar. 35 yerine 25’te başlamak — aynı aylık tutar — yaklaşık iki katı parayla bitebilir.',
    tags: ['finans', 'emeklilik', 'tasarruf', 'bileşik faiz'],
    language: 'tr',
    image: {
      prompt: promptOf('retirement-start-early'),
      alt: 'Erken başlayan ince bir iplik ışıktan bir nehre dönüşürken geç başlayanın dar bir dere kalması',
    },
    sources: [
      { title: 'Investor.gov (ABD SEC) — Bileşik Faiz Hesaplayıcısı', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Bogleheads wiki — emeklilik planlaması başlangıç noktaları', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Emeklilik Birikimine Erken Başlamak Neden Sonra Daha Çok Biriktirmekten İyidir?

Emeklilik birikiminin ezici tek bir değişkeni vardır ve bu gelir, fon seçimi, hatta tasarruf oranı bile değildir — **paranın kaç yıl bileşikleneceğidir**. Her on yıllık gecikme, aynı yere varmak için aylık biriktirmeniz gerekeni kabaca ikiye katlar. İlk yıllar anlamsız hissettirir (bakiyeler küçük, büyüme görünmez) ve matematiksel olarak sahip olacağınız en değerli yıllardır.

## İkiz zaman çizgisi

Aynı ayda 500, aynı %7 ortalama yıllık getiri, 65’te emeklilik:

| Başlangıç yaşı | Yatırım yılı | Toplam yatırılan | Nihai birikim (yaklaşık) |
| --- | --- | --- | --- |
| 25 | 40 | 240.000 | ~1.310.000 |
| 35 | 30 | 180.000 | ~610.000 |
| 45 | 20 | 120.000 | ~260.000 |

25 yaşındaki, 35 yaşındakinden yalnızca 60.000 fazla yatırır ve kabaca **700.000 fazlayla** biter. Tersinden bakın: erken başlayanın birikimine ulaşmak için 35 yaşındaki ayda kabaca 1.100, 45 yaşındaki ise kabaca 2.500 biriktirmelidir — gecikmenin bedeli, aylık fatura edilmiş.

## Erken para neden özeldir

25’te yapılan bir katkı 40 yıl bileşiklenir — %7’de kabaca 15× büyür. Aynı katkı 55’te kabaca 2× büyür. Emeklilik öncesi son on yılınız tipik olarak içinde *yatırdığınızdan* daha fazlasını *kazanır*, ama yalnızca daha önceki on yıllar üzerinde büyüdüğü tabanı inşa ettiyse. Bileşiklenme bir kartopudur: ilk itiş en önemlisidir.

## Kusurlu başlamak, daha geç başlamaktan iyidir

Çoğu insana hizmet eden işlem sırası:

1. **Varsa işveren katkısını tam alın** — bu anında bir %50–100 getiridir; hiçbir yatırım yarışamaz.
2. **Bir tutarı değil, bir yüzdeyi otomatikleştirin** — 25’te gelirin %5–10’u bile 40’ta %20’yi geçer. Her zamla bir puan artırın.
3. **Ülkenizin sunduğu vergi avantajlı hesap içinde, varsayılan olarak geniş tabanlı, düşük maliyetli endeks fonlarına yatırın** — onlarca yıllık ufuk tam da hisse ağırlıklı dağılımların var olma nedenidir.
4. **"Doğru zamanı" beklemeyin** — 40 yıllık bir ufuk için, çöküşlerin arifesi dahil her tarihsel başlangıç noktası, netlik için yıllarca beklemeyi geçti.

## Geç başladıysanız

Matematik daha sert, ama umutsuz değil: tasarruf oranı kaldıraç olur (bileşiklenmenin pisti kısaldığı için katkılar yükün daha fazlasını taşır); 2–3 yıl bile fazla çalışmak iki kez yardım eder (daha çok katkı, daha az çekim yılı); ve en kötü tepki, "açığı kapatmak" için piyango ihtimalli yatırımlara uzanmaktır — sıra riski tam da bunu cezalandırır.

## SSS

**Borç öderken emekliliğe de biriktirmeli miyim?**
İşveren katkısını o zaman bile alın (herhangi bir normal faiz oranından fazla öder); katkının ötesinde yüksek faizli borç genelde önceliği hak eder, düşük faizli borç genelde etmez.

**%7 güvenli bir varsayım mı?**
Uzun dönem tarihsel bir hisse endeksi ortalamasıdır, garanti değil — gerçek planlar %4–6’yı da test etmeli. Sonucun değişmediğine dikkat edin: varsayılan her oran erken başlayanı ödüllendirir.

**Toplamda ne kadar gerekecek?**
Kaba bir planlama çıpası: yıllık harcama × 25 ("%4 kuralı"nın tersi) — sonradan ülkenizin emeklilik düzenine göre ince ayar yapılır. 25’te kesin sayı, alışkanlık kadar önemli değildir; kesinlik bekleyebilir, bileşiklenme bekleyemez.${NOTE}`,
  },
];
