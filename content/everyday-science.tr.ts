import type { DraftArticle } from './types';
import { everydayScienceEn } from './everyday-science.en';

const promptOf = (key: string): string => {
  const hit = everydayScienceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const everydayScienceTr: DraftArticle[] = [
  {
    topicKey: 'why-sky-is-blue',
    title: 'Gökyüzü Neden Mavidir?',
    question: 'Gökyüzü gündüz neden mavi, gün batımında neden kırmızıdır?',
    summary:
      'Güneş ışığı beyazdır — tüm renklerin karışımı — ama hava, kısa dalga boylu mavi ışığı kırmızıdan çok daha fazla saçar ve tüm gökyüzünü maviye boyar. Gün batımında ışık daha kalın bir havadan geçer, mavi saçılıp gider ve geriye kalan kırmızı ile turuncular gözünüze ulaşır.',
    tags: ['bilim', 'fizik', 'ışık', 'doğa'],
    language: 'tr',
    image: { prompt: promptOf('why-sky-is-blue'), alt: 'Beyaz ışığın cam atmosferden geçerken mavi ışınlarını dört bir yana saçması' },
    sources: [
      { title: 'NASA Science — Gökyüzü Neden Mavidir?', url: 'https://spaceplace.nasa.gov/blue-sky/en/' },
      { title: 'NOAA — Işığın saçılması ve atmosferik optik', url: 'https://www.noaa.gov/' },
    ],
    content: `# Gökyüzü Neden Mavidir?

Gökyüzü, güneş ışığı ile hava arasındaki bir halat çekme yarışı yüzünden mavidir. Güneş ışığı beyaz görünür, ama aslında gökkuşağındaki her rengin bir arada karışmış halidir. Bu ışık atmosfere dökülürken havadaki gaz molekülleri onu **saçar** — yeni yönlere savurur — ve işin can alıcı noktası şudur: kısa, mavi dalga boylarını uzun, kırmızı olanlardan çok daha güçlü saçarlar. Böylece mavi ışık tüm gökyüzüne savrulur ve yukarı baktığınızda mavi her yönden size gelir. Tüm kubbe maviye boyanır.

## Fizik, usulca

Işık dalgalar halinde yayılır ve renkler **dalga boyu** bakımından farklıdır: kırmızı ışığın dalgaları uzun, mavi ile morunkiler kısadır. Işık, dalga boyundan çok daha küçük bir şeye — örneğin tek bir azot ya da oksijen molekülüne — çarptığında, saçılması en kısa dalga boylarını güçlü biçimde kayırır. Bu etki (onu açıklayan fizikçinin adıyla Rayleigh saçılması olarak anılır) çarpıcıdır: mavi ışık, kırmızıya göre birkaç kat fazla saçılır. Gökyüzü, özünde, gözünüze ulaşmadan önce atmosferde sayısız kez sektirilmiş mavi ışıktır.

## İki doğal takip sorusu

**Madem mavi en çok saçılıyor, gökyüzü neden mor değil?** Morun dalga boyu daha da kısadır ve daha da çok saçılır — ama güneş ışığında en baştan mor daha azdır ve gözleriniz maviye, mora kıyasla daha duyarlıdır. Beyninizin algıladığı karışım maviye oturur.

**Peki güneşin kendisi neden sarımsıdır?** Çünkü mavi, doğrudan gelen ışından *saçılarak uzaklaşmıştır*. Doğrudan güneşten gelen ışık, mavisinin bir kısmını gökyüzüne kaptırmıştır ve geriye kalan kursak sarı-beyaz görünür.

## Gün batımları neden kızıllaşır

Gün batımında güneş alçaktır, bu yüzden ışığı size ulaşmak için **çok daha kalın bir atmosfer diliminden** sıyrılarak geçer. Bu uzun yol boyunca, mavinin neredeyse tamamı (ve yeşilin de büyük kısmı) ışın ulaşmadan önce saçılıp gider. Gözünüze ulaşmak üzere geriye kalanlar uzun dalga boylarıdır — kırmızılar ve turuncular — işte bu yüzden batan güneş ve çevresindeki bulutlar sıcak renklerle tutuşur. Öğle vaktini maviye boyayan saçılma, gün batımını da kızıla boyar; değişen sadece yol uzunluğudur.

## Sıkça Sorulan Sorular

**Uzayda gökyüzü neden siyahtır?**
Çünkü güneş ışığını saçacak hava yoktur. Astronotlar gündüz vakti bile güneşi ve yıldızları katıksız siyah bir fonun önünde görür — atmosfer yok, mavi de yok.

**Bu, okyanusun neden mavi olduğunu da açıklar mı?**
Kısmen farklı. Gökyüzünün mavisi su yüzeyinde yansır, ama derin su da kırmızı ışığı *soğurur* ve maviyi kendisi saçar, dolayısıyla okyanus, üst üste binen nedenlerle mavidir.

**Bulutlar neden mavi değil de beyazdır?**
Bulut damlacıkları hava moleküllerinden çok daha büyüktür, bu yüzden *tüm* renkleri aşağı yukarı eşit oranda saçarlar. Bütün renkler yeniden bir araya karışınca beyaz görünür.`,
  },
  {
    topicKey: 'how-vaccines-work',
    title: 'Aşılar Gerçekte Nasıl İşler?',
    question: 'Aşılar bağışıklık sistemini bizi korumak için nasıl eğitir?',
    summary:
      'Bir aşı, bağışıklık sisteminize bir mikrobun zararsız bir ön gösterimini sunar, böylece onu önceden tanımayı öğrenir. Ardından bu tehdidi yıllarca hatırlayan bellek hücreleri oluşturur, böylece gerçek bir enfeksiyon hızla — çoğu zaman siz hasta hissetmeden önce — alt edilir.',
    tags: ['bilim', 'biyoloji', 'bağışıklık sistemi', 'sağlık'],
    language: 'tr',
    image: { prompt: promptOf('how-vaccines-work'), alt: 'Bağışıklık nöbetçilerinin zararsız bir mikrop kopyasını incelemesi ve bellek rozetlerini saklaması' },
    sources: [
      { title: 'CDC (ABD Hastalık Kontrol Merkezleri) — Aşıların Nasıl İşlediğini Anlamak', url: 'https://www.cdc.gov/vaccines/hcp/conversations/understanding-vacc-work.html' },
      { title: 'WHO (Dünya Sağlık Örgütü) — Aşılar nasıl işler?', url: 'https://www.who.int/news-room/feature-stories/detail/how-do-vaccines-work' },
    ],
    content: `# Aşılar Gerçekte Nasıl İşler?

Bir aşı, **siz daha gerçeğiyle karşılaşmadan önce bağışıklık sisteminize bir mikrobu tanımayı öğreterek** işler. Bağışıklık sisteminiz enfeksiyonlarla savaşmakta zaten ustadır — ama yeni bir mikropla ilk kez karşılaştığında yavaştır, siz hastalanırken iş başında öğrenir. Aşı bu tehlikeli ilk dersi atlar: vücudunuza tehdidin güvenli bir ön gösterimini sunar, böylece gerçek mikrop ortaya çıkarsa savunmanız tam olarak ne yapacağını çoktan bilir ve onu hızla ezer.

## Ön gösterimde aslında ne var

Bir aşı, bağışıklık sisteminize belirli bir mikrop *gibi görünen* ama **sizi hasta edemeyecek** bir şey içerir. Aşının türüne göre bu şu olabilir:

- Mikrobun zayıflatılmış ya da etkisizleştirilmiş bir versiyonu,
- Yalnızca onun zararsız bir parçası (bir yüzey proteini), ya da
- Kendi hücrelerinize, bağışıklık sisteminizin incelemesi için mikrobun zararsız bir parçasını kısa süreliğine üretmelerini söyleyen talimatlar (örneğin mRNA).

Her durumda ilke aynıdır: bağışıklık sistemine, tehlike olmadan mikrobun tanınabilir "şeklini" (bir antijeni) sunmak.

## Tanı, yanıt ver, hatırla

Bağışıklık sistemi bu antijeni gördüğünde üç şey yapar:

1. Onu yabancı olarak **tanır**.
2. **Yanıt verir**: antikorlar üretir — o belirli mikroba kenetlenmek üzere özel yapılmış proteinler — ve enfekte hücreleri yok eden hücreleri etkinleştirir.
3. Onu **hatırlar**: uzun ömürlü **bellek hücreleri** oluşturur.

İşte bu üçüncü adım, bütün mesele budur. Bu bellek hücreleri yıllarca, hatta on yıllarca yaşayabilir. Gerçek mikrop bir gün istila ederse, onu anında tanır ve hızlı, devasa bir yanıtı tetiklerler — çoğu zaman siz herhangi bir belirti fark etmeden enfeksiyonu yenerek. Hastalığı önce atlatmak zorunda kalmadan bağışıklığı kazandınız.

## Neden bazen birden fazla doz gerekir ve kolun ağrıması neden normaldir

Bazı aşılar birden fazla doz ya da pekiştirme gerektirir, çünkü bağışıklık belleği tekrarlanan maruziyetle daha güçlü kurulabilir ya da zamanla zayıflayıp takviye edilmesi gerekebilir. Bazı kişilerin sonrasında hissettiği hafif ağrı, yorgunluk ya da düşük ateş ise mikrop değildir — bağışıklık sisteminizin *işini yapması*, ön gösterime karşı yanıtını sonuna kadar açmasıdır. Bir tepki, eğitimin işe yaradığının işaretidir, hasta olduğunuzun değil.

## Sıkça Sorulan Sorular

**Bir aşı, önlediği hastalığı bana bulaştırabilir mi?**
Standart aşılar hastalığa yol açamaz — canlı, hastalık yapma yeteneğine sahip bir mikrop içermezler (ya da yalnızca sağlıklı insanlarda hastalık yapamayan zayıflatılmış bir biçimini içerirler). Hissedebileceğiniz şey bir enfeksiyon değil, bağışıklık yanıtıdır.

**"Sürü bağışıklığı" nedir?**
Bir toplulukta yeterince insan bağışık olduğunda, mikrop yayılmak için yeni konak bulmakta zorlanır ve bu, aşı olamayanları (yenidoğanlar, belirli hastalıkları olan kişiler) dolaylı olarak korur. Koruma kolektif hale gelir.

**Bazı aşılar neden ömür boyu sürerken bazıları pekiştirme gerektirir?**
Bu, mikroba ve bellek yanıtının ne kadar kalıcı olduğuna, ayrıca mikrobun (grip gibi) geçen yılın eğitimi bu yılın versiyonuna artık uymayacak kadar mutasyona uğrayıp uğramadığına bağlıdır. Bazı tehditler değişmezdir; bazıları sürekli değişir.`,
  },
  {
    topicKey: 'why-seasons-happen',
    title: 'Mevsimlere Aslında Ne Yol Açar?',
    question: 'Mevsimlere ne yol açar — Dünya yazın güneşe daha mı yakındır?',
    summary:
      'Mevsimler, güneşe olan uzaklıktan kaynaklanmaz — yaygın bir efsanedir bu. Dünya kendi ekseni üzerinde eğik olduğu için olurlar: her yarıküre yılın yarısında güneşe doğru (yaz), diğer yarısında ondan uzağa (kış) eğilir ve bu, güneş ışığının yere ne kadar dik vurduğunu değiştirir.',
    tags: ['bilim', 'astronomi', 'dünya', 'doğa'],
    language: 'tr',
    image: { prompt: promptOf('why-seasons-happen'), alt: 'Eğik bir küreye güneş ışığının bir yarıküreye dik, diğerine sığ açıyla vurması' },
    sources: [
      { title: 'NASA Science — Mevsimlere Ne Yol Açar?', url: 'https://spaceplace.nasa.gov/seasons/en/' },
      { title: 'NOAA — Dünya’nın eğikliği ve mevsimler', url: 'https://www.noaa.gov/' },
    ],
    content: `# Mevsimlere Aslında Ne Yol Açar?

En yaygın bilim yanılgısını hemen baştan açıklığa kavuşturalım: **mevsimlere, Dünya’nın güneşe yaklaşması ya da ondan uzaklaşması yol açmaz.** Hatta Dünya, ocak ayında — Kuzey Yarıküre’nin kışında — güneşe biraz *daha yakındır*. Eğer neden uzaklık olsaydı, tüm gezegen aynı anda yaz ya da kış yaşardı. Oysa öyle olmuyor: Avustralya’da yaz iken Kanada’da kıştır. Gerçek neden, Dünya’nın **eğikliğidir**.

## Her şeyi belirleyen eğikliktir

Dünya, güneş çevresindeki yörüngesine göre yaklaşık 23,5 derece eğik bir eksen üzerinde döner. Dünya güneşin etrafında dönerken bu eğiklik tüm yıl boyunca uzayda aynı yönü gösterir. Böylece yörüngenin yarısında Kuzey Yarıküre güneşe *doğru* eğilir, diğer yarısında ondan *uzağa* — ve Güney Yarıküre tam tersini yapar. İşte bu tek olgu, mevsim dediğimiz her şeyi üretir.

## Eğiklik neden havayı daha sıcak ya da daha soğuk yapar

Güneşe doğru eğilmek, havayı birbirini pekiştiren iki yolla değiştirir:

- **Güneş ışığının dikliği.** Yarıküreniz güneşe doğru eğildiğinde, güneş ışığı yere daha **dik** vurur — yoğunlaşmış, dümdüz aşağı tutulan bir el feneri gibi. Uzağa eğildiğinde, aynı ışık **sığ bir açıyla** vurur, daha geniş bir alana incecik yayılır, böylece her bir toprak parçası daha az enerji alır. Dik ışık, eğik ışıktan çok daha verimli ısıtır.
- **Gündüzün uzunluğu.** Eğiklik ayrıca yazın güneşin ufkun üzerinde **daha uzun** kalması anlamına gelir, dolayısıyla ısınma saatleri daha çok, gece soğuma saatleri daha azdır.

Daha yoğun ışık, her gün daha çok saat boyunca, toplandığında yaz eder. Daha az saat boyunca eğik ışık ise kış eder.

## Bu neden geri kalan her şeyi açıklar

- **Karşıt yarıküreler, karşıt mevsimler:** kuzey güneşe doğru eğilince güney uzağa eğilir — bu yüzden mevsimleri her zaman terstir.
- **Ekvatorda neredeyse hiç mevsim yoktur:** tüm yıl boyunca aşağı yukarı güneşe yandan durur, bu yüzden güneş ışığı hep oldukça diktir — dolayısıyla istikrarlı bir sıcaklık.
- **Kutuplar aylarca gündüz ya da karanlık yaşar:** uç eğiklik, yazın güneşin hiç tam batmaması, kışın da hiç tam doğmaması demektir.

## Sıkça Sorulan Sorular

**Yani Dünya’nın güneşe uzaklığının hiç mi etkisi yok?**
Yörüngesi yalnızca hafifçe ovaldir, dolayısıyla uzaklık değişimi küçüktür ve eğiklik etkisi tarafından bastırılır. Sıfır değildir, ama güneş ışığının açısına kıyasla küçük bir etkidir.

**En sıcak hava neden genellikle en uzun günden sonra olur?**
Bu "mevsimsel gecikme", karanın ve okyanusların ısıyı soğurup ısınmasının haftalar sürmesinden kaynaklanır. Gelen güneş ışığının zirvesi gündönümüdür, ama biriken sıcaklığın zirvesi bir iki ay sonra gelir.

**Gündönümü ya da ekinoks nedir?**
Gündönümleri, eğikliğin güneşe doğru ya da ondan uzağa en üst düzeye ulaştığı iki andır (en uzun ve en kısa günler); ekinokslar ise aradaki, eğikliğin yandan olduğu ve her yerde gündüz ile gecenin neredeyse eşit olduğu iki andır.`,
  },
  {
    topicKey: 'why-we-dream',
    title: 'Neden Rüya Görürüz?',
    question: 'Neden rüya görürüz ve rüyaların gerçekten bir anlamı var mı?',
    summary:
      'Tam yanıtı kimse bilmiyor, ama önde gelen bilim rüyaların rastgele olmadığını öne sürüyor: beynin anıları pekiştirmesine, duyguları işlemesine ve durumları prova etmesine yardım ediyor gibi görünüyorlar. En canlı rüyalar, beynin neredeyse uyanıkkenki kadar etkin olduğu REM uykusunda olur.',
    tags: ['bilim', 'sinirbilim', 'uyku', 'beyin'],
    language: 'tr',
    image: { prompt: promptOf('why-we-dream'), alt: 'Uyuyan bir beynin anı parçalarını oynatıp duyguya göre arşivlemesi' },
    sources: [
      { title: 'ABD Ulusal Nörolojik Bozukluklar ve İnme Enstitüsü (NIH) — Beyin Temelleri: Uyku', url: 'https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-understanding-sleep' },
      { title: 'Sleep Foundation — Neden Rüya Görürüz?', url: 'https://www.sleepfoundation.org/dreams' },
    ],
    content: `# Neden Rüya Görürüz?

Önce dürüst yanıt: **bilim neden rüya gördüğümüzü tam olarak bilmiyor** — bu, beyne dair gerçek açık sorulardan biridir. Ama "her şeyi bilmiyoruz", "hiçbir şey bilmiyoruz" demek değildir. Araştırmacıların güçlü, kanıta dayalı kuramları var ve hepsi tutarlı bir yönü gösteriyor: rüyalar büyük olasılıkla anlamsız gürültü değildir. Beyninizin siz uyurken yürüttüğü o hayati gecelik bakımın bir yan ürünü — hatta bir işlevi — gibi görünüyorlar.

## Rüya görmek ne zaman olur

Uyku, evreler arasında döngüye girer ve en canlı, öyküye benzer rüyalar **REM (hızlı göz hareketi)** denen bir evrede kümelenir. Tuhaftır ki, o sırada beyniniz neredeyse uyanıkkenki kadar etkindir, oysa bedeniniz geçici olarak felçtir (bu da rüyaları oynamanızı işe yarar biçimde engeller). Bir gecede REM’den birkaç kez geçersiniz, sabaha doğru REM süreleri uzar — bu yüzden çoğu zaman rüyanın ortasında uyanırsınız. Daha hafif, REM dışı evrelerde de rüya görürsünüz, ama o rüyalar daha belirsiz olma eğilimindedir.

## Önde gelen kuramlar

Hiçbir kuram tek başına kazanmış değil ve hepsi kısmen doğru olabilir:

| Kuram | Fikir |
| --- | --- |
| **Bellek pekiştirme** | Rüya görmek, günün deneyimlerini ayıklamaya yardım eder; önemli anıları güçlendirir, gerisini budar |
| **Duygu işleme** | Rüyalar, duygusal olayları güvenli, "çevrimdışı" bir durumda yeniden yaşayıp etkisizleştirmenizi sağlar |
| **Tehdit/sosyal prova** | Rüya görmek zorlukları (tehlikeler, sosyal durumlar) simüle eder, böylece gerçekleri için daha hazırlıklı olursunuz |
| **Beynin gürültüden anlam çıkarması** | REM sırasında beyin yarı rastgele ateşler ve rüyalar, bu etkinlikten bir öykü örme girişimidir |

Dikkat edin, bunlar rekabet etmekten çok üst üste biniyor: beyin aynı anda anıları arşivliyor, duyguları işliyor *ve* bu etkinlikten bir anlatı örüyor olabilir.

## Rüyaların bir "anlamı" var mı?

Falcılık anlamında yok — rüyaların geleceği önceden bildirdiğine ya da evrensel gizli semboller taşıdığına dair bir kanıt yoktur. Ama rastgele de değiller: rüya içeriği, yakın geçmişteki deneyimlerinizden, kaygılarınızdan ve duygularınızdan yoğun biçimde beslenir, dolayısıyla bir rüya gerçekten de zihninizdekini yansıtabilir. Anlam, varsa, kişiseldir ve duygusaldır; bir "rüya sözlüğünden" çözülecek bir şifre değildir.

## Sıkça Sorulan Sorular

**Rüyalarımı neden bu kadar çabuk unutuyorum?**
Beyin rüyaları uzun süreli belleğe kaydetmeyi öncelemez ve REM uykusunun kimyası bellek oluşumu için ideal değildir. Uyanır uyanmaz hemen üzerinden geçmedikçe rüyalar dakikalar içinde silinir — bu yüzden "başucuna bir not defteri koymak" işe yarar.

**Herkes rüya görür mü?**
Neredeyse kesinlikle evet — hiç rüya görmediğini söyleyenlerin yalnızca hatırlamadığı düşünülür. Uyku çalışmaları, rüya görmediğini söyleyen kişilerde bile REM etkinliği gösterir.

**Kâbuslar ne işe yarar?**
Çoğu zaman stres ya da travmanın tetiklediği, duygu işleme ya da tehdit prova sisteminin aşırı yüklenmesi olabilirler. Ara sıra görülen kâbuslar normaldir; sık ve sıkıntı veren kâbuslar bir uzmana danışmaya değer olabilir.`,
  },
  {
    topicKey: 'how-planes-fly',
    title: 'Uçaklar Aslında Havada Nasıl Durur?',
    question: 'Ağır uçaklar uçmaya yetecek kaldırma kuvvetini nasıl üretir?',
    summary:
      'Bir kanat, havayı aşağı saptırarak kaldırma kuvveti üretir — Newton’un üçüncü yasasına göre havayı aşağı itmek kanadı yukarı iter. Kanadın biçimi ve eğimi, üstteki havanın daha hızlı ve daha düşük basınçta akmasını da sağlar. İkisi birlikte tonlarca metali havada tutmaya yeter.',
    tags: ['bilim', 'fizik', 'uçuş', 'nasıl çalışır'],
    language: 'tr',
    image: { prompt: promptOf('how-planes-fly'), alt: 'Bir kanadın hava akımını aşağı saptırırken yukarı bir kaldırma kuvveti kazandığı kesit' },
    sources: [
      { title: 'NASA Glenn — Kanatlar Uçağı Nasıl Kaldırır / Uçuş Dinamiği', url: 'https://www.grc.nasa.gov/www/k-12/airplane/lift1.html' },
      { title: 'NASA — Uçuşun Dört Kuvveti', url: 'https://www.nasa.gov/audience/foreducators/k-4/features/F_Four_Forces_of_Flight.html' },
    ],
    content: `# Uçaklar Aslında Havada Nasıl Durur?

Dolu bir yolcu uçağı kadar ağır bir şeyin incecik havanın üzerinde yüzebilmesi neredeyse inanılmaz gelir — ama altındaki ilke sağlam bir fiziktir. Bir kanadın işi, **kaldırma kuvveti** üretmektir: uçağın ağırlığını yenmeye yetecek kadar büyük, yukarı yönlü bir kuvvet. Bunu tek temel bir hileyle yapar: **havayı aşağı iter.** Newton’un üçüncü yasasına göre — her etkinin eşit ve zıt bir tepkisi vardır — devasa miktarda havayı *aşağı* itmek, havanın kanadı *yukarı* itmesini sağlar. Bu fikri aklınızda tutun, gerisi ayrıntıdır.

## Aynı kaldırma kuvvetini betimlemenin iki yolu

Fizikçiler bir kanadın kaldırma kuvvetini, sonunda birbiriyle uyuşan iki açıdan açıklar:

- **Newton bakışı (hava aşağı saptırılır).** Bir kanat hafifçe eğiktir ve öyle biçimlendirilmiştir ki yanından akan hava, firar kenarından ayrılırken **aşağı** doğru kıvrılır. Kanat sürekli bir hava akımını aşağı fırlatır; tepki kuvveti kanadı yukarı iter. Daha çok hava saptırıldıkça ya da daha sert saptırıldıkça kaldırma kuvveti artar.
- **Basınç bakışı (daha hızlı hava, daha düşük basınç).** Kanadın biçimi ve açısı nedeniyle hava **üst yüzeyden daha hızlı** akar. Daha hızlı hareket eden havanın *basıncı daha düşüktür* (Bernoulli ilkesi), bu yüzden alttan yukarı iten basınç, üstten aşağı bastıran basınçtan yüksektir — net olarak yukarı yönlü bir kuvvet.

Bunlar rakip açıklamalar değildir; tek bir olgunun iki tutarlı betimlemesidir. İkisi de gerçekleşir ve ikisi de aynı kaldırma kuvvetini üretir.

## Kaldırma kuvvetinin büyüklüğünü ne belirler

Üç kaldıraç, hepsini de pilotlar ve tasarımcılar kullanır:

- **Hız:** kanadın üzerinden akan hava ne kadar hızlıysa kaldırma kuvveti o kadar fazladır — bu yüzden uçaklar yerden ayrılabilmek için uzun bir pistte hızlanmalı, iniş sırasında da ağır uçabilmek için ekstra yardıma başvurmalıdır.
- **Kanat alanı ve biçimi:** daha büyük kanatlar daha çok hava hareket ettirir; eğimli kanat profili, havayı verimli biçimde saptıracak şekilde ayarlanmıştır.
- **Hücum açısı:** kanadın "burnunu" kaldırıp hava akımına çevirmek kaldırma kuvvetini artırır — ama bir noktaya kadar. Çok dik eğerseniz pürüzsüz hava akımı kopar, kaldırma kuvveti çöker ve kanat "perdövites"e girer.

İşte bu yüzden kalkış ve inişte kanatlardan kanatçıkların (flapların) uzandığını görürsünüz: kanadı geçici olarak büyütüp yeniden kıvırarak düşük hızlarda fazladan kaldırma kuvveti sıkıp çıkarırlar.

## Sıkça Sorulan Sorular

**O eski "üst yüzey daha uzun, bu yüzden hava yetişmek için hızlanmalı" açıklaması yanlış mıydı?**
O popüler öykü ("eşit geçiş süresi" fikri) kusurlu bir aşırı basitleştirmedir — üst yüzeydeki hava gerçekten daha hızlı gider, ama o nedenle değil ve kanatlar ters bile uçabilir. Güvenilir öz şudur: kanatlar havayı aşağı saptırır ve basınç üstte daha düşüktür.

**Uçağı ileri götüren nedir?**
Motorlar **itki** sağlar ve **sürüklemeyi** (hava direncini) yener. Kaldırma kuvveti ağırlıkla savaşır; itki sürüklemeyle savaşır. Uçuş, bu dört kuvvetin dengesidir.

**Planörler motorsuz nasıl uçar?**
Yüksekliği hıza çevirirler, havada usulca alçalarak hava akımının kaldırma kuvveti üretmeyi sürdürmesini sağlarlar — ve yükseklik kazanmak için yükselen hava akımlarına binerler. Motora gerek yok, yalnızca havanın hareketine.`,
  },
  {
    topicKey: 'why-ice-floats',
    title: 'Buz Neden Yüzer (Neredeyse Her Şey Batarken)?',
    question: 'Çoğu katı kendi sıvısında batarken buz neden suyun üstünde yüzer?',
    summary:
      'Su tuhaftır: donduğunda genleşir. Molekülleri hidrojen bağlarıyla açık, ferah bir kristale kilitlenir ve bu buzu sıvı sudan yaklaşık %9 daha az yoğun yapar — böylece buz yüzer. Bu acayiplik, göllerin yukarıdan aşağı donmasını ve yaşamın kışı altında atlatmasını sağlar.',
    tags: ['bilim', 'kimya', 'su', 'doğa'],
    language: 'tr',
    image: { prompt: promptOf('why-ice-floats'), alt: 'Açık altıgen buz kafesinin yoğun istiflenmiş sıvı su molekülleri üzerinde yüzdüğü kesit' },
    sources: [
      { title: 'USGS (ABD Jeoloji Araştırmaları Kurumu) — Suyun Yoğunluğu ve buz', url: 'https://www.usgs.gov/special-topics/water-science-school/science/water-density' },
      { title: 'Kraliyet Kimya Derneği — Sudaki hidrojen bağı', url: 'https://edu.rsc.org/' },
    ],
    content: `# Buz Neden Yüzer (Neredeyse Her Şey Batarken)?

İçeceğinizde yüzen buz o kadar tanıdıktır ki ne kadar *tuhaf* olduğunu fark etmek kolay değildir. Dünya’daki neredeyse her başka madde için katı hal, sıvıdan **daha yoğundur** — eriyen mumun içine katı mum atın, batar. Su bu kuralı kırar: katı su (buz) sıvı sudan **daha az** yoğundur, bu yüzden yüzer. Bunun nedeni su molekülünün acayip bir özelliğidir ve bu acayiplik, Dünya’daki yaşamın kışı atlatmasının nedenlerinden biri olarak ortaya çıkar.

## Tek cümlede yoğunluk

Bir şeyin yüzüp yüzmemesi **yoğunluğa** dayanır — belirli bir alana ne kadar kütle istiflendiğine. Çevrenizdeki sıvıdan daha az yoğunsanız yüzer, daha yoğunsanız batarsınız. O halde asıl soru şu: çoğu şeyi büzen donma, suyu neden *genleştirip* daha az yoğun yapar?

## Buzun açık mimarisi

Su molekülleri yükçe hafifçe asimetriktir, bu da onların **hidrojen bağı** denen zayıf çekimlerle birbirini kavramasını sağlar. Sıvı suda moleküller durmadan itişir, kayar ve oldukça sıkı istiflenir. Ama su donduğunda, bu hidrojen bağları molekülleri katı, son derece **düzenli bir kristale** kilitler — ve önemli olan, bu kristalin *ferah* olmasıdır. Tüm bağlarını karşılamak için moleküller, yapısına boşluklar gömülü açık, altıgen bir kafese dizilir. Buzdaki moleküller, aslında ortalama olarak sıvı sudakinden *daha uzakta* tutulur.

Aynı moleküller arasında daha çok boşluk, birim hacim başına daha az kütle demektir — buz, sıvı sudan yaklaşık **%9 daha az yoğundur**. Bir buz küpünün, yaklaşık onda biri yüzeyin üstünde kalacak şekilde yüzmesinin ve aynı hacim suyun donarken genleşip boruları çatlatabilmesinin nedeni tam da budur.

## Bu acayiplik yaşam için neden önemli

Buz yüzdüğü için su **yukarıdan aşağı** donar. Bir gölet önce yüzeyde buz tutar ve o yüzen buz tabakası, yalıtkan bir battaniye gibi davranarak daha fazla donmayı yavaşlatır ve altındaki suyu sıvı tutar. Balıklar, su bitkileri ve diğer canlılar kışı alttaki o sıvı tabakada atlatır. Buz batsaydı, göller ve hatta okyanuslar aşağıdan yukarı katı buza dönüşürdü ve bildiğimiz su yaşamı belki de soğuk mevsimleri hiç atlatamazdı. Küçük bir moleküler "kaza", çok büyük sonuçlar doğurur.

## Sıkça Sorulan Sorular

**Su, donma noktasında en mi yoğundur?**
Hayır — ve bu da bir başka tuhaflıktır. Su, donma noktasının biraz *üzerinde*, yaklaşık 4°C’de en yoğundur. Oradan 0°C’ye doğru soğurken, buza dönüşmeden önce aslında biraz genleşir; bu yüzden bir göldeki en soğuk su en üstte durur.

**Tuzlu su da aynı şekilde donup yüzer mi?**
Deniz buzu yine yüzer (deniz suyundan daha az yoğundur), ama tuz suyun donma noktasını düşürür ve ayrıntıları değiştirir. Oluşan saf buz, tuzu büyük ölçüde dışarıda bırakır.

**Buz eklemek bir içeceği neden bu kadar iyi soğutur?**
Buz, soğuk olmasının ötesinde, erirken o hidrojen bağlarını kırıp suya dönüşmek için bir hayli ısı *soğurur* — bu süreçte içeceğinizden enerji çekerek.`,
  },
  {
    topicKey: 'how-soap-works',
    title: 'Sabun Aslında Nasıl Temizler?',
    question: 'Sabun, suyun tek başına çıkaramadığı yağı ve mikropları nasıl çıkarır?',
    summary:
      'Sabun moleküllerinin çift kişiliği vardır: bir ucu suyu sever, diğeri yağa yapışır. Yağlı kiri ve mikropları sararlar, yüzeylerden kaldırırlar ve suyun her şeyi durulayıp götürmesini sağlarlar — bu, sabunun birçok virüse karşı bu kadar etkili olmasının da nedenidir.',
    tags: ['bilim', 'kimya', 'hijyen', 'nasıl çalışır'],
    language: 'tr',
    image: { prompt: promptOf('how-soap-works'), alt: 'İki uçlu sabun moleküllerinin bir yağ damlasını sarıp suya kaldırması' },
    sources: [
      { title: 'Kraliyet Kimya Derneği — Sabun nasıl işler (yüzey aktif maddeler)', url: 'https://edu.rsc.org/' },
      { title: 'CDC — Bilim Anlatıyor: Neden Ellerinizi Yıkamalısınız?', url: 'https://www.cdc.gov/handwashing/why-handwashing.html' },
    ],
    content: `# Sabun Aslında Nasıl Temizler?

Sabunun çözdüğü sorunu zaten biliyorsunuz: su tek başına yağ karşısında çaresizdir. Yağlı bir tavayı musluğun altında durulayın, yağ boncuklanıp olduğu yerde kalır. Çünkü yağ ile su, herkesin bildiği gibi karışmaz. Sabun, akıllı bir **moleküler çöpçatan** olarak işler — su ile yağ arasında köprü kurar, böylece su nihayet yağı (ve içinde gizlenen mikropları) götürebilir.

## İki yüzlü molekül

Sır, bir sabun molekülünün biçmindedir. Her biri, birbirinden çok farklı iki uçlu küçük bir iribaş gibidir:

- *Hidrofilik* — "suyu seven" — bir **baş**. Suyla mutlulukla bağ kurar.
- *Hidrofobik* — "sudan korkan" — ama yağa yapışmaya bayılan uzun bir **kuyruk**.

Bu çift kişilik, bütün hilenin ta kendisidir. Yağlı bir yüzeyde köpük çıkardığınızda, sabun molekülleri kendilerini şöyle dizer: yağı seven kuyruklar yağın içine gömülür, suyu seven başlar dışarı, suya doğru bakar.

## Sar, kaldır ve durula

Binlerce sabun molekülü bir yağ damlasının üzerine üşüşür, kuyruklar içe, başlar dışa, ta ki yağlı yumru, su dostu bir dış yüzeye sahip bir top içinde tamamen sarılana dek. Bu küçük kürelere **misel** denir. Artık bir zamanlar suyu iten yağın, suyu seven bir kabuğu vardır — böylece durulama yaptığınızda akan su bu miselleri yakalar ve tüm paketi, yağ ve içine sıkışmış kiriyle birlikte, lavaboya yıkar. Sabun yağı çözmedi; suyun taşıyabileceği biçimde *paketledi*.

## Bu, birçok mikrobu da neden yok eder

Aynı özellik, sabunu hijyenin sessiz bir kahramanı yapar. Birçok mikrop — koronavirüsler ve diğer zarflı virüsler dahil — dışında yağlı bir **zarla** kaplıdır. Sabunun yağı seven kuyrukları o yağlı kabuğun içine girip onu parçalayarak mikrobu paramparça eder, miseller de mikropları cildinizden kaldırıp durulanmaya hazır hale getirir. İşte bu yüzden **sade sabunla 20 saniye ovmak** bu kadar etkilidir: yalnızca mikropları durulayıp atmıyorsunuz, birçoğunu kimyasal olarak da söküp parçalıyorsunuz. Ovuşturmanın mekanik etkisi de önemlidir — yapışıp kalanı söker.

## Sıkça Sorulan Sorular

**Suyun sıcak olması gerekir mi?**
Pek değil — ılık su bazı yağları daha hızlı çözmeye yardım edebilir ve daha rahattır, ama sabun kimyasal işini her makul sıcaklıkta yapar. İyice ovma süresi, sıcaklıktan daha önemlidir.

**Antibakteriyel sabun, sade sabundan daha mı iyidir?**
Günlük el yıkama için sade sabun, mikropları çıkarıp yok etmede aynı derecede iyi iş görür ve sağlık kuruluşları genel olarak rutin antibakteriyel sabunları daha etkili bulmaz. Asıl mesele, "sabun ve ovma" mekanizmasıdır.

**Deterjan sabundan nasıl farklıdır?**
Deterjanlar tam olarak aynı "iki uçlu" ilkeyle çalışır (onlar da "yüzey aktif maddedir"), ama sert suda ve çeşitli sıcaklıklarda daha iyi performans göstermek üzere sentezlenmiştir. Aynı fikir, daha zorlu koşullar için mühendislikten geçirilmiştir.`,
  },
  {
    topicKey: 'what-causes-rainbows',
    title: 'Gökkuşağına Ne Yol Açar?',
    question: 'Gökkuşakları nasıl oluşur ve renkler neden hep aynı sıradadır?',
    summary:
      'Gökkuşağı, yağmur damlalarının içinde bükülüp ayrışan güneş ışığıdır. Her damla minik bir prizma gibi davranır, beyaz ışığı renklerine ayırır ve size geri yansıtır. Geometri, renk sırasını sabitler ve tüm gökkuşağını güneşin tam karşısını merkez alan bir yaya büker.',
    tags: ['bilim', 'fizik', 'ışık', 'hava durumu'],
    language: 'tr',
    image: { prompt: promptOf('what-causes-rainbows'), alt: 'Beyaz ışığın bir yağmur damlasına girip iç yansımanın ardından sıralı tayf renklerine ayrılarak çıkması' },
    sources: [
      { title: 'NOAA SciJinks — Gökkuşakları nasıl oluşur?', url: 'https://scijinks.gov/rainbow/' },
      { title: 'NASA Science — Işık ve elektromanyetik tayf', url: 'https://science.nasa.gov/ems/' },
    ],
    content: `# Gökkuşağına Ne Yol Açar?

Gökkuşağı, ışık ile suyun bir oyunudur — daha somut söylersek, **güneş ışığının milyonlarca yağmur damlası tarafından bükülmesi, ayrıştırılması ve size geri yansıtılmasıdır.** Yürüyüp ulaşabileceğiniz, bir yerde duran bir nesne değildir; tümüyle güneşin, yağmurun ve *gözlerinizin* nerede olduğuna bağlı bir optik etkidir. Bu yüzden bir gökkuşağının sonuna asla varamazsınız ve bu yüzden yanınızda duran kişi az farklı bir gökkuşağı görür: her gökkuşağı tam da onu izleyen kişi için kurulur.

## Tek bir yağmur damlasının içinde ne olur

Bir güneş ışınını, küresel bir yağmur damlasının içine kadar izleyin:

1. **Girerken bükülür.** Işık havadan suya geçerken yavaşlar ve yön değiştirir (kırılma). Önemli olan, farklı renklerin azıcık farklı miktarlarda bükülmesidir — mor en çok, kırmızı en az bükülür.
2. **Arka yüzeyden yansır.** Işın damlanın iç tarafındaki uzak yüzeye gider ve geri seker.
3. **Çıkarken yeniden bükülür** — ve bu noktada her biri iki kez bükülmüş renkler, tüm tayfa yelpaze gibi açılmıştır.

Böylece her yağmur damlası, beyaz güneş ışığını içine alır ve ayrışmış renklerden küçük bir demet gönderir. Bir gökkuşağı, milyonlarca damla bunu aynı anda yaptığında gördüğünüz şeydir — her damla, gökyüzündeki konumuna göre gözünüze bir renk katar.

## Renkler neden hep aynı sıradadır

Bükülmenin miktarı fizikle sabitlendiği için, **kırmızı her zaman yayın dış kenarında, mor iç kenarında** olur, turuncu, sarı, yeşil ve mavi de aralarında — her seferinde. Sıra asla karışmaz, çünkü her dalga boyunun ne kadar kırıldığıyla belirlenir. O tanıdık dizi (kırmızı, turuncu, sarı, yeşil, mavi, mor), basitçe dalga boyuna göre sıralanmış tayftır.

## Neden bir yaydır ve neden hep güneşin karşısındadır

Bu geometri yalnızca belirli bir açıda işler — ışık, güneşin tam karşısındaki noktaya yaklaşık **42 derece** açıda gözünüze en güçlü biçimde geri döner. Aynı açıdaki tüm yönler bir çember çizer, siz de onu o tanıdık yay olarak görürsünüz (zemin genellikle alt yarısını gizler). Bu, bir gökkuşağının neden her zaman gökyüzünün güneşin *karşı* tarafında olduğunu da açıklar: açıların hizalanması için güneşe sırtınız, yağmur önünüzde olmalıdır.

## Sıkça Sorulan Sorular

**Çift gökkuşağı neden olur?**
Bazen ışık, çıkmadan önce damlaların içinde **iki kez** yansır. O ikinci, daha soluk yay daha yukarıda belirir ve renkleri **ters** olur (kırmızı içte), çünkü fazladan sekme sırayı tersine çevirir.

**Bir gökkuşağının sonuna gerçekten asla varılamaz mı?**
Varılamaz — fiziksel bir yer değildir. Ona doğru ilerlerseniz geometri sizinle birlikte kayar, böylece gökkuşağı da hareket eder. Yalnızca sizin bakış açınıza göre vardır.

**Görmek için yağmur gerekir mi?**
Su damlacıkları ve doğru açıda güneş ışığı gerekir — bu yüzden şelale serpintisinde, bahçe fıskiyelerinde ve deniz köpüğünde de gökkuşağı görürsünüz. Önemli olan damlalardır, yağmur bulutu değil.`,
  },
  {
    topicKey: 'why-we-age',
    title: 'Neden Yaşlanırız?',
    question: 'Bedenlerimizin zamanla yaşlanmasına aslında ne yol açar?',
    summary:
      'Yaşlanma, hücrelerimizdeki hasarın, vücudun onarabileceğinden daha hızlı birikmesidir — aşınmış kromozom uçlarından ve DNA hatalarından, işlev bozukluğu olan hücrelere ve yükselen iltihaba dek. Tek bir saat değil, üst üste binen birçok süreçtir; yaşlanmanın bu kadar karmaşık olmasının nedeni budur.',
    tags: ['bilim', 'biyoloji', 'yaşlanma', 'sağlık'],
    language: 'tr',
    image: { prompt: promptOf('why-we-age'), alt: 'Hücrelerin zamanla aşınma biriktirmesi ve onarım yavaşlarken hâlâ çalışması' },
    sources: [
      { title: 'Ulusal Yaşlanma Enstitüsü (NIH) — Sağlıklı Yaşlanma Hakkında Ne Biliyoruz?', url: 'https://www.nia.nih.gov/health/what-do-we-know-about-healthy-aging' },
      { title: 'López-Otín ve ark., "Yaşlanmanın Belirtileri" (2013)', url: 'https://pubmed.ncbi.nlm.nih.gov/23746838/' },
    ],
    content: `# Neden Yaşlanırız?

Yaşlanma, geri sayan tek ve gizemli bir saat gibi hissettirebilir, ama biyolojik olarak en iyi şekilde **hasarın yavaş yavaş birikmesi** olarak anlaşılır — hücre ve molekül düzeyindeki aşınma ve yıpranma, on yıllar içinde vücudun onarmakta gitgide daha yetersiz kaldığı bir hasar. Gençken onarım, hasara ayak uydurur. Zamanla hasar kazanmaya başlar. Yaşlanmanın tek bir nedeni yoktur; üst üste binen pek çok nedeni vardır — bu da onu durdurmanın neden bu kadar zor olduğunun ve tek bir "tedavinin" neden var olmadığının ta kendisidir.

## Yaşlanmanın başlıca itici güçleri

Bilim insanları, birlikte gerilemeyi yöneten, birbirine kenetli bir dizi süreç belirledi — çoğu zaman "yaşlanmanın belirtileri" diye anılır. En önemlilerinden birkaçı:

| Süreç | Ne ters gider |
| --- | --- |
| **Telomer kısalması** | Kromozomların uçlarındaki koruyucu başlıklar her hücre bölünmesinde kısalır ve sonunda bölünmeyi sınırlar |
| **DNA hasarı** | Genetik kodumuzdaki hatalar ve hasar, onarılabileceğinden daha hızlı birikir |
| **Aşınmış hücreler (senesans)** | Hasarlı hücreler bölünmeyi durdurur ama oyalanır, komşularına zarar veren sinyaller sızdırır |
| **Protein sorunları** | Hücreler hasarlı, yanlış katlanmış proteinleri temizlemekte kötüleşir ve bunlar birikir |
| **Bozulan güç santralleri** | Mitokondriler (hücrelerin enerji üreteçleri) daha az verimli hale gelir |
| **Kronik iltihap** | Düşük dereceli, vücut çapında bir iltihap ("inflamasyonel yaşlanma") yaşla yükselir |

Bunlardan hiçbiri tek başına yaşlanma *değildir*. Birbirini pekiştirirler — hasarlı DNA aşınmış hücreler üretir, aşınmış hücreler iltihabı körükler, iltihap daha fazla hasara yol açar — böylece gerileme bileşik biçimde artar.

## Neden hiç yaşlanırız ki (daha derin soru)

Evrim, yaşlanmanın en başta neden var olduğuna dair bir gerekçe sunar: doğal seçilim en çok bizi üreme yıllarımız boyunca sağlıklı tutmak için çalışır ve bu yıllardan sonra etkisi zayıflar. Gençliğe yarayan, ama yalnızca ileri yaşta — onları düzeltmeye yönelik evrimsel baskının zayıf olduğu zamanda — ortaya çıkan maliyetler taşıyan genler ve ödünleşimler korunur. Kısacası, bedenler genlerini sonraki kuşağa taşımak üzere ayarlanmıştır, sonsuza dek dayanmak üzere değil — bu yüzden "bakım", kusursuz değil, "yeterince iyi"dir.

## Onu yavaşlatabilecek bir şey var mı?

Yaşlanmanın kendisi bugün durdurulamaz, ama hasarın **hızı** kısmen nasıl yaşadığımızdan etkilenir. Sigara içmemek, düzenli fiziksel etkinlik, düzgün uyku, makul bir beslenme ve kronik stresi yönetmek, defalarca daha yavaş gerileme ve daha uzun sağlıklı yaşam süresiyle ilişkilendirilir — sihir değil, ama "iyi yaşlanmak" ile "zor yaşlanmak" arasındaki fark. Altta yatan mekanizmalara yönelik araştırma etkindir, ama kanıtlanmış kaldıraçlar, görkemsiz biçimde pratik kalır.

## Sıkça Sorulan Sorular

**İnsan için bir azami yaşam süresi var mı?**
Kabaca bir tavan var gibi görünüyor — mükemmel sağlıkla bile çok az kişi yaklaşık 115 yaşı geçer, bu da biriken hasarın eninde sonunda onarımı bastırdığını düşündürür. Şu anki doğrulanmış rekor 122 yaştır.

**Daha büyük ya da daha küçük hayvanlar daha mı hızlı yaşlanır?**
Genelde daha küçük hayvanlar daha kısa yaşar, ama çarpıcı istisnalar vardır (bazı küçük yarasalar ve çıplak köstebek fareleri, boyutlarının öngördüğünden çok daha uzun yaşar) — araştırmacıların onları incelemesinin nedeni tam da budur.

**Bilim bir gün yaşlanmayı "tedavi" edebilecek mi?**
Kimse bilmiyor. Araştırmacılar tek tek belirtileri hedef alıyor (aşınmış hücreleri temizlemek, DNA’yı korumak) ve bazılarını laboratuvar hayvanlarında yavaşlatabiliyorlar — ama bunu, insan sağlıklı yaşamını güvenle uzatmaya çevirmek kanıtlanmamıştır ve büyük olasılıkla çok uzaktır.`,
  },
  {
    topicKey: 'what-is-electricity',
    title: 'Elektrik Gerçekte Nedir?',
    question: 'Elektrik aslında nedir ve cihazlarımızı nasıl çalıştırır?',
    summary:
      'Elektrik, elektrik yükünün akışıdır — genellikle gerilimin ittiği elektronların bir telde sürüklenmesi. Elektrik santralleri elektron üretmez; tellerde hâlihazırda var olanları hareket ettiren o "itişi" sağlar ve bu düzenli hareket, enerjiyi cihazlarınıza taşır.',
    tags: ['bilim', 'fizik', 'elektrik', 'nasıl çalışır'],
    language: 'tr',
    image: { prompt: promptOf('what-is-electricity'), alt: 'Bir teldeki yüklerin gerilim altında birlikte sürüklenip bir cihazı aydınlatması' },
    sources: [
      { title: 'ABD Enerji Enformasyon İdaresi (EIA) — Elektrik açıklanıyor', url: 'https://www.eia.gov/energyexplained/electricity/' },
      { title: 'NASA — Elektrik ve manyetizma temelleri', url: 'https://science.nasa.gov/' },
    ],
    content: `# Elektrik Gerçekte Nedir?

"Elektrik" sözcüğünü gevşek biçimde kullanırız, ama özünde tek bir şey demektir: **elektrik yükünün akışı.** Her şey atomlardan oluşur ve atomlar yüklü parçacıklar içerir — özellikle, küçücük bir negatif yük taşıyan **elektronlar**. Bazı malzemelerde, özellikle metallerde, bazı elektronlar serbestçe dolaşabilir. Çok sayıda elektron bir telde aynı yönde sürüklendiğinde, bu düzenli akış *zaten* bir elektrik akımıdır. Elektrik, tam anlamıyla, hareket halindeki yüktür.

## Onu açıklığa kavuşturan üç sözcük

Basit bir su tesisatı benzetmesi anahtar terimleri yerli yerine oturtur — borulardaki suyu hayal edin:

- **Gerilim**, o *itiştir* — su basıncı gibi. Yükleri bir devre boyunca süren kuvvettir. Basınç yoksa akış da yoktur.
- **Akım**, *akış hızıdır* — saniyede bir noktadan gerçekte ne kadar yük geçtiği (amper cinsinden ölçülür).
- **Direnç**, malzemenin akışa ne kadar *karşı koyduğudur* — dar, tıkalı bir boruya karşı geniş, açık bir boru.

Daha fazla gerilim daha fazla akım iter; daha fazla direnç daha az akıma izin verir. Bu ilişki (Ohm yasası) neredeyse her devreyi yönetir. Ve bir akımın eksiksiz bir **devreye** gereksinimi vardır — kaynaktan, cihazdan geçip geri dönen kesintisiz bir döngü — bu yüzden bir anahtarı çevirmek (döngüyü kesmek) her şeyi anında durdurur.

## Can alıcı bir yanılgı: elektrik santrali size elektron göndermez

İşte çoğu insanı şaşırtan nokta. Elektrik santrali, bir tanker su taşır gibi evinize elektron sevk etmez. **Elektronlar zaten tellerin içindedir.** Elektrik santralinin sağladığı şey o *itiştir* — hâlihazırda orada olan elektronları titretip sürükleyen gerilim. Çoğu prizden gelen alternatif akımda (AC), elektronlar size doğru hiç gitmez bile; saniyede birçok kez oldukları yerde ileri geri çalkalanırlar. Cihazınıza hızla ulaşan şey aslında, bu eşgüdümlü hareketin taşıdığı **enerjidir** — elektronların kendisi değil.

## Bu nasıl işe yarar hale gelir

Akan yük bir cihaza ulaştığında, cihaz onu geçerken iş yapmaya zorlar: bir ısıtma elemanı akışı ısıya çevirir, bir motor onu harekete çevirir, bir LED onu ışığa çevirir, bir çip hesaplama yapmak için küçücük anahtarlanmış akımlar kullanır. Her durumda hareket halindeki yük enerji teslim eder ve cihaz o enerjiyi istediğiniz şeye dönüştürür.

## Sıkça Sorulan Sorular

**Şimşek, duvarımdaki elektrikle aynı elektrik mi?**
Altta yatan olgu aynıdır — yükün akışı — ama şimşek, bulut ile yer arasında birikmiş yükü eşitleyen, ev elektriğinden çok daha yüksek gerilimde, devasa ve kısa bir boşalmadır.

**AC ile DC arasındaki fark nedir?**
Doğru akımda (DC, bir pil gibi) yük tek yönde düzenli akar; alternatif akımda (AC, şebekeden) hızla ileri geri yön değiştirir. Şebeke AC kullanır, çünkü geriliminin verimli uzak mesafe iletimi için yükseltilip alçaltılması kolaydır.

**Metaller neden iyi iletkendir?**
Atomları, serbestçe hareket edebilen, gevşekçe tutulan bir elektron "denizini" paylaşır, böylece yük kolayca akar. Yalıtkanlar (kauçuk, cam) elektronlarını sımsıkı tutar, bu yüzden yük akamaz — telin içinin bakır, dışının plastik olmasının nedeni budur.`,
  },
];
