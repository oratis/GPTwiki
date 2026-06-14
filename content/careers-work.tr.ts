import type { DraftArticle } from './types';
import { careersWorkEn } from './careers-work.en';

const promptOf = (key: string): string => {
  const hit = careersWorkEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const careersWorkTr: DraftArticle[] = [
  {
    topicKey: 'resume-that-works',
    title: 'Gerçekten Okunan Bir CV Nasıl Yazılır?',
    question: 'Bir CV’yi etkili kılan nedir ve ilk elemeyi nasıl geçerim?',
    summary:
      'CV, tek bir işi olan bir pazarlama belgesidir: 30 saniyelik bir “evet” kazanmak. İşe yarayanlar nicel başarılarla başlar, ilan dilini yansıtır, otomatik tarayıcıların ayrıştırabileceği kadar temiz kalır ve rolü yapabileceğinizin kanıtı olmayan her şeyi atar.',
    tags: ['kariyer', 'iş arama', 'cv', 'çalışma'],
    language: 'tr',
    image: { prompt: promptOf('resume-that-works'), alt: 'Temiz bir belgede birkaç nicel başarıyı aydınlatan tarama ışını' },
    sources: [
      { title: 'Harvard Kariyer Hizmetleri Ofisi — CV ve Niyet Mektubu rehberi', url: 'https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/' },
      { title: 'ABD Çalışma İstatistikleri Bürosu — Mesleki Görünüm El Kitabı', url: 'https://www.bls.gov/ooh/' },
    ],
    content: `# Gerçekten Okunan Bir CV Nasıl Yazılır?

CV özgeçmişiniz değildir — o, **tek bir hedefi olan bir pazarlama belgesidir: sizi mülakata taşımak.** Ona göz gezdiren işe alımcı, “belki” mi “hayır” mı diye karar vermek için yaklaşık birkaç saniye ayırır. Etkili bir CV’ye dair her şey, dikkatin bu acımasız ekonomisinden doğar: en güçlü kanıtınızla başlayın, taranabilir kılın ve *bu* işi yapabileceğinizin kanıtı olmayan her şeyi atın.

## Görevlerle değil, başarılarla başlayın

En yaygın CV hatası, sorumlulukları — *yapmanız gereken* şeyi — başarılar yerine — gerçekten *başardığınız* şey — listelemektir. Karşılaştırın:

| Zayıf (görev) | Güçlü (başarı) |
| --- | --- |
| “Sosyal medya yönetiminden sorumlu” | “6 ayda Instagram takipçisini %40 büyüttüm, 1.200 potansiyel müşteri getirdim” |
| “Müşteri destek taleplerini ele aldım” | “Günde 50+ talebi %95 memnuniyetle çözdüm, yanıt süresini %30 kısalttım” |
| “Ödeme sistemi üzerinde çalıştım” | “Ödeme akışını yeniden kurdum, sepet terkini %18 azalttım” |

Kalıp şudur: **eylem fiili + ne yaptığınız + nicel sonuç.** Sayılar, çoğu CV’nin yapabileceği en büyük iyileştirmedir: belirsiz iddiaları kanıta dönüştürürler. Kaba rakamlar bile (“~%15”, “düzinelerce”, “ikiye katladım”) hiç yoktan iyidir, çünkü etki üzerinden düşündüğünüzü gösterir.

## İşe — ve eleme yazılımına — göre uyarlayın

Genel CV’ler, uyarlanmışlara kaybeder. İlanı okuyun, vurguladığı becerileri ve anahtar kelimeleri belirleyin ve gerçekten sahip olduklarınızı — ilanın kendi diliyle — CV’nizin yansıttığından emin olun. Bu iki kez önemlidir: bir insan bariz bir eşleşme görür ve birçok şirket CV’leri, ilgili terimleri arayan otomatik eleme sistemlerinden (aday takip sistemleri) geçirir. Otomatik turu atlatmak için biçimlendirmeyi basit tutun — standart bölüm başlıkları, ayrıştırıcının karıştırabileceği görsellere, tablolara veya sütunlara gömülü metin yok. Akıllıca tasarım, deneyiminizi yazılım için resmen görünmez kılabilir.

## Acımasızca kesin

- **Uzunluk:** kariyerin başında bir sayfa, ciddi deneyimle iki sayfa. Daha uzunu, öncelik belirleyememe sinyali verir.
- **Hedef cümlesi:** modası geçmiş ve yer israfı. Sunduğunuz şeyin kısa bir özeti iyidir; “zorlu bir pozisyon arıyorum” değil.
- **Eski ve alakasız geçmiş:** 15 yıl önceki yarı zamanlı iş, kapladığı yeri nadiren hak eder.
- **Bariz dolgu:** “çalışkan ekip oyuncusu”, “Microsoft Word’de yetkin”. Göster, iddia etme.

Her satır şu soruyu yanıtlamalı: “bu, beni *bu* rol için daha işe alınabilir kılıyor mu?” Kılmıyorsa, kılan satırları sulandırıyordur.

## Sıkça Sorulanlar

**Her başvuru için farklı bir CV mi gerekir?**
Sıfırdan değil — bir ana sürüm tutun, sonra üst üçte birini (özet, beceriler, ilk maddeler) her role göre uyarlayın. Dönüşümü sağlayan hedeflemedir; bir saatlik uyarlama, elli genel gönderimi yener.

**Fotoğraf, yaş veya medeni durum eklemeli miyim?**
ABD/İngiltere/Kanada’da hayır — önyargıyı davet eder ve yer israf eder (normlar ülkeye göre değişir; bazı bölgeler fotoğraf bekler). Tereddütte kalınca işle başlayın.

**İstihdam boşluklarını nasıl ele alırım?**
Onları beceriksizce gizlemeyin. Kısa, dürüst bir çerçeve (bakım verme, eğitim, planlı bir ara, iş arama) ile güncel tutulan becerilere odaklanmak, şüpheli tarih oyunlarından çok daha iyidir. Çoğu işveren, kesintisiz temiz bir zaman çizelgesinden çok, şu an ne yapabildiğinizi önemser.`,
  },
  {
    topicKey: 'job-interview-prep',
    title: 'Bir İş Mülakatına Nasıl Hazırlanılır?',
    question: 'Gerçekten iyi bir performans için bir iş mülakatına nasıl hazırlanmalıyım?',
    summary:
      'Mülakat başarısı karizmadan değil hazırlıktan gelir: şirketi araştırın, STAR gibi bir yapıyla becerilerinizi kanıtlayan hikayeler hazırlayın, sesli prova yapın ve onu, sizin de onları değerlendirdiğiniz çift yönlü bir konuşma olarak görün.',
    tags: ['kariyer', 'iş arama', 'mülakat', 'çalışma'],
    language: 'tr',
    image: { prompt: promptOf('job-interview-prep'), alt: 'Işığın iki yönde aktığı eşit iki sandalye ve hazır bekleyen hikaye kartları' },
    sources: [
      { title: 'ABD Çalışma Bakanlığı CareerOneStop — Mülakat hazırlığı', url: 'https://www.careeronestop.org/JobSearch/Interview/interview-preparation.aspx' },
      { title: 'MIT Kariyer Danışmanlığı — Davranışsal mülakatlar ve STAR', url: 'https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/' },
    ],
    content: `# Bir İş Mülakatına Nasıl Hazırlanılır?

Mülakatlar, hazırlığı doğal çekicilikten çok daha fazla ödüllendirir. Odada “doğuştan iyi” görünen aday, neredeyse her zaman önceden görünmez bir iş yapmış olandır: şirketi araştırmış, kendi hikayelerini role eşlemiş ve yanıtlar doğal gelene dek prova etmiştir. Soruları kontrol edemezsiniz ama tahmin edilebilir olanlara — ki çoğu öyledir — ne kadar hazır olduğunuzu kontrol edebilirsiniz.

## Sanki orada çalışıyormuşsunuz gibi araştırın

Mülakattan önce, şirket hakkında onu özgül olarak konuşabilecek kadar bilgi edinin: ne yaptığı, müşterilerinin kim olduğu, son haberler ve başvurduğunuz rolün nasıl oturduğu. Bu iki yerde işe yarar — “neden burada çalışmak istiyorsunuz?” sorusunu yağcılık yerine içerikle yanıtlarsınız ve kendiniz daha keskin sorular sorarsınız. Genel bir heves, “herhangi bir işi kabul ederim” gibi okunur; özgül bilgi ise “*bunu* istiyorum” gibi.

## Sıfatları değil, hikayeleri hazırlayın

Çoğu mülakat **davranışsal sorulara** dayanır — “bana bir zaman anlatın…” — çünkü geçmiş davranış, gelecekteki davranışı öz tanımdan daha iyi öngörür. Hata, özelliklerle yanıt vermektir (“ben harika bir problem çözücüyüm”). Bir *hikaye* ile yanıtlayın, oturacak şekilde yapılandırarak:

**STAR**, hikayeleri sıkı ve eksiksiz tutar:
- **Durum (Situation)** — bağlam, kısaca.
- **Görev (Task)** — başarmanız gereken şey.
- **Eylem (Action)** — özellikle *sizin* yaptığınız şey (“biz” değil).
- **Sonuç (Result)** — mümkünse niceliklendirilmiş çıktı.

Deneyiminizden, ortak temaları kapsayan 6–8 esnek hikaye hazırlayın: bir çatışma, bir başarısızlık ve ondan öğrendiğiniz, bir liderlik anı, sıkı bir teslim tarihi, yetkiniz olmadan birini etkilediğiniz bir an. Çoğu davranışsal soru bunların varyasyonudur, bu yüzden iyi kurulmuş bir avuç hikaye, şaşırtıcı bir aralığı kapsar.

## Sesli prova yapın — ve kendi sorularınızı hazırlayın

Yanıtları kafanızda okumak prova değildir; onları sesli söylemek provadır. Sesli pratik (bir arkadaşa, bir kameraya veya boş bir odaya), sessiz tekrarın sakladığı gevezeliği ve boşlukları açığa çıkarır ve gerçeğini tanıdık kılar. Ayrıca standartları — “kendinizden bahsedin”, “neden bu rol”, “en büyük zayıflığınız” — ve güçlü bir kapanışı hazırlayın: *onlara* yönelik düşünceli sorular. Ekibi, zorlukları veya başarının neye benzediğini sormak gerçek bir ilgi sinyali verir ve işi gerçekten isteyip istemediğinize karar verecek bilgiyi size sağlar.

## Sıkça Sorulanlar

**“En büyük zayıflığınız nedir” sorusunu nasıl yanıtlarım?**
Gerçek ama eleyici olmayan bir zayıflık seçin ve, en önemlisi, onun için ne yaptığınızı söyleyin. Mesele kusur değil — dürüst bir öz farkındalığa ve gelişme arzusuna sahip olup olmadığınızdır. Sahte “çok çalışıyorum” yanıtından kaçının; kimseyi kandırmaz.

**Teknik bir sorunun yanıtını bilmiyorsam ne yaparım?**
Donmak veya blöf yapmak yerine sesli düşünün ve muhakemenizi gösterin. Mülakatçılar çoğu zaman, bilmediğiniz bir şeye nasıl yaklaştığınıza, onu anında bilip bilmediğinizden daha çok önem verir. “Emin değilim, ama nasıl çözeceğim şöyle” güçlü bir yanıttır.

**Bu bir mülakat, ama ben de onları değerlendiriyorum — gerçekten mi?**
Evet ve bu zihniyet işinize yarar. Onu karşılıklı olarak görmek — bu işin size uyup uymadığına siz de karar veriyorsunuz — çaresizliği azaltır, sorularınızı iyileştirir ve özgüven olarak okunur. En iyi sonuçlar uyumdan gelir, size yanlış gelen bir rolü “kazanmaktan” değil.`,
  },
  {
    topicKey: 'salary-negotiation',
    title: 'Maaşınızı Nasıl Müzakere Edersiniz (Teklifi Kaybetmeden)?',
    question: 'Maaşı etkili biçimde nasıl müzakere ederim ve daha fazla istemek riskli mi?',
    summary:
      'Müzakere beklenen bir şeydir, teklifinize nadiren mal olur ve tüm kariyeriniz boyunca bileşik getiri sağlar. Anahtarlar: piyasa değerinizi bilin, mümkün olduğunda rakamı önce işverene söyletin, araştırılmış bir aralıkla çapa atın ve sadece taban ücreti değil, tüm paketi müzakere edin.',
    tags: ['kariyer', 'maaş müzakeresi', 'para', 'çalışma'],
    language: 'tr',
    image: { prompt: promptOf('salary-negotiation'), alt: 'Becerileri ve madeni paraları dengeleyen, daha fazlasına yer kalan bir terazi' },
    sources: [
      { title: 'ABD Çalışma İstatistikleri Bürosu — mesleğe göre ücret verileri', url: 'https://www.bls.gov/oes/' },
      { title: 'Harvard Müzakere Programı — maaş müzakeresi araştırması', url: 'https://www.pon.harvard.edu/category/daily/salary-negotiations/' },
    ],
    content: `# Maaşınızı Nasıl Müzakere Edersiniz (Teklifi Kaybetmeden)?

Çoğu insan kendisine sunulan ilk rakamı kabul eder — ve yıllarca sessizce masada para bırakır, çünkü zamlar ve gelecekteki teklifler çoğu zaman o başlangıç rakamının üzerine kurulur. Müzakere riskli ve tuhaf hissettirir, ama gerçek rahatlatıcıdır: **işverenler bunu bekler, kibar ve makul bir karşı teklif yüzünden bir teklif çok nadiren geri çekilir ve kazanç, tüm kariyeriniz boyunca bileşik büyür.** Başta birkaç bin fazla, onyıllar içinde büyütüldüğünde, tek bir konuşmanın rahatsızlığından çok daha değerlidir.

## Konuşmadan önce rakamınızı bilin

Ödevini yapmış müzakereci, sessiz bir güce sahiptir. Herhangi bir görüşmeden önce, rol için **piyasa değerini** araştırın — unvana, konuma, sektöre ve deneyim seviyenize göre — maaş veri sitelerini, kamuya açık maaş aralıklarını ve ağınızdaki kişileri kullanarak. Bu size umutlu bir tahmin yerine savunulabilir bir aralık verir ve kendinizi ya çok düşük göstermenizi ya da naif okunacak kadar uzak bir rakam söylemenizi engeller. Üç rakam bilin: gerçekçi hedefiniz, “harika sonucunuz” ve çekip gideceğiniz taban.

## Önce onlar söylesin — sonra çapa atın

Mümkün olduğunda, **rakamı ilk söyleyen kişi olmaktan kaçının.** Erkenden beklentiniz sorulursa, savuşturmanız sorun değil: “Önce rolü ve tüm paketi anlamak isterim — bütçelediğiniz aralık nedir?” İlk somut rakam müzakereye çapa atar ve siz bunun onlarınki olmasını tercih edersiniz. Bir rakam söylediğinizde, **araştırılmış bir aralık** verin, hedefinizi mutlu olacağınız yerin alt ucuna yakın koyun ve onu değere bağlayın: “X konusundaki deneyimime ve bu rolün piyasasına dayanarak, Y’yi hedefliyorum.”

## Tüm paketi müzakere edin ve iş birlikçi kalın

Taban maaş manşettir, ama tek kaldıraç değildir — ve bazen en esnek olanı da değildir:

| Kaldıraç | Ne zaman yardımcı olur |
| --- | --- |
| İmza bonusu | Taban tavanlandığında bir boşluğu kapatır |
| Hisse senedi / pay | Girişimlerde ve büyük teknolojide ciddi yükseliş potansiyeli |
| İzin / esneklik | Yüksek kişisel değer, düşük işveren maliyeti |
| Unvan / başlangıç tarihi / değerlendirme zamanlaması | Küçük bir zamdan daha değerli olabilir |
| Öğrenme bütçesi, uzaktan çalışma ödeneği | Gerçek değer katan kolay “evet”ler |

Boyunca, tonu **iş birlikçi tutun, çatışmacı değil.** Onlarla savaşmıyorsunuz; “bunu nasıl yürütürüz?” sorusunu birlikte çözüyorsunuz. Sıcak, özgül, iyi araştırılmış bir istek (“Bu rol için heyecanlıyım — tabanı Y’ye çıkarabilir miyiz?”) neredeyse hiç gücendirmez ve işverenlerin işe aldıkları kişilerde tam olarak istedikleri türden bir özgüven sinyali verir.

## Sıkça Sorulanlar

**Daha fazla istemek bana teklifi kaybettirebilir mi?**
Kibar ve makul iseniz çok nadiren. İşverenler müzakereyi bekler ve içine pay koymuşlardır. Gerçek bir teklife saygılı bir karşı teklif, onu esasen hiçbir zaman geri çektirmez; korku hikayeleri neredeyse her zaman normal istekleri değil, saldırgan ültimatomları içerir.

**Şu anki maaşımı sorarlarsa ne yaparım?**
Birçok yerde reddedebilirsiniz (ve bazı yerlerde sormaları yasa dışıdır). Rol ve piyasaya dayalı hedefinize yönlendirin: “Bu pozisyona katacağım değere odaklanmayı tercih ederim.” Eski maaşınız yeni maaşınıza tavan koymamalı.

**Teklif iyi olsa bile müzakere etmeli miyim?**
Genellikle denemeye değer — tek bir kibar karşı teklif çoğu zaman daha fazlasını getirir ve bir “hayır” sizi yalnızca orijinal teklife geri döndürür. Asimetri, istemekten yanadır. Ama bir kez anlaştıktan sonra ona uyun; kapanmış bir anlaşmayı yeniden açmayın.`,
  },
  {
    topicKey: 'remote-work-effectively',
    title: 'Tükenmeden veya Kariyerinizi Durdurmadan Uzaktan Nasıl Çalışılır?',
    question: 'Uzaktan çalışırken üretken, görünür ve aklı başında nasıl kalırım?',
    summary:
      'Uzaktan çalışma, işe gidip gelmeyi ve ofis sürtünmesini iki yeni zorlukla takas eder: iş ile ev arasındaki sınırı korumak ve sizi kimse çalışırken görmediğinde görünür kalmak. Onu kazanmak; kasıtlı iletişim, günün kesin bir bitişi ve işinizi proaktif biçimde ortaya koymak demektir.',
    tags: ['kariyer', 'uzaktan çalışma', 'üretkenlik', 'çalışma'],
    language: 'tr',
    image: { prompt: promptOf('remote-work-effectively'), alt: 'Işıkla uzaktaki takım arkadaşlarına bağlı ev masası, iş ve dinlenme sınırıyla' },
    sources: [
      { title: 'Stanford — Nicholas Bloom’un uzaktan çalışma verimliliği araştırması', url: 'https://www.gsb.stanford.edu/faculty-research/working-papers' },
      { title: 'CDC / NIOSH — İş-yaşam dengesi ve uzaktan çalışma esenliği', url: 'https://www.cdc.gov/niosh/index.html' },
    ],
    content: `# Tükenmeden veya Kariyerinizi Durdurmadan Uzaktan Nasıl Çalışılır?

Uzaktan çalışma bariz maliyetleri kaldırır — işe gidip gelme, ofis gürültüsü, sürekli kesintiler — ve sessizce daha ince iki tanesini ekler. Birincisi, ofisiniz eviniz olduğunda iş ile yaşam arasındaki sınır çözünür, bu yüzden risk işten kaytarmak değil; **asla kapatamamaktır.** İkincisi, sizi fiziksel olarak kimse çalışırken görmediğinde, bir ofisin doğal görünürlüğü kaybolur ve iyi iş fark edilmeden kalabilir. Uzaktan başarmak, her ikisini de kasıtlı olarak yönetmek demektir.

## Sınırı koruyun

Bir ofiste, işe gidip gelme ve ayrılma eylemi iş gününe doğal bir son yaratır. Evde bu ritüel yoktur ve “sadece bir şey daha”, hafta içi akşamlar ve hafta sonları işe karışana dek günü süresiz uzatabilir. Sınırı bilinçli olarak yeniden kurun:

- **Kesin bir bitiş.** İşin ne zaman biteceğine karar verin ve bunu canlandırın — dizüstünü kapatın, kıyafet değiştirin, odadan çıkın. Küçük bir ritüel, beyninize “bitti” sinyali verir.
- **Ayrılmış bir alan**, bir köşe bile olsa. Yataktan veya kanepeden çalışmak, beyninizi asla tam dinlenmeyecek *ya da* tam odaklanmayacak şekilde eğitir.
- **Gerçek molalar.** Sizi öğle yemeğine çeken meslektaşlar olmadan, planlamadıkça molaları atlarsınız. Dışarı çıkın; hareket edin.

Sezgiye aykırı gerçek: uzaktan çalışanlar az çalışmaya değil, *fazla çalışmaya* eğilimlidir. Mesai dışı saatlerinizi korumak kaytarmak değildir — sizi tek seferde tükenmek yerine aylar boyunca üretken tutan şeydir.

## Kasıtlı iletişim kurun ve görünür kalın

Ofisler osmoz yoluyla iletişim kurar — kulak misafiri olunan bağlam, koridor sohbetleri, görünür meşguliyet. Uzaktan çalışmada bunların hiçbiri yoktur, bu yüzden iletişimi **açık** kılmalısınız:

- **Durumu fazlasıyla iletin.** Ne üzerinde çalıştığınızı, neyin engellendiğini ve neyi bitirdiğinizi paylaşın. Uzaktan bir çalışanın sessizliği, başınızı işe gömüp teslim ederken bile, yokluk olarak okunur.
- **Eşzamansız ve yazılı olanı varsayılan yapın.** Net yazılı güncellemeler, insanların işinizi fark etmesini ummaktan iyidir; ayrıca bir kayıt oluşturur ve farklı zaman dilimlerindeki insanlara saygı gösterir.
- **Etkinizi okunabilir kılın.** Bu övünmek değil — ofisin eskiden bedavaya sağladığı görünürlüğün yerini almaktır. Sonuçları özetleyin, kurduğunuz şeyi gösterin, toplantılarda konuşun. İzin verirseniz, “gözden uzak” terfi zamanında sessizce “gönülden ırak” olur.

## Yalnızlıkla savaşın

Uzaktan çalışma yalnızlaştırıcı olabilir ve yalnızlık hem esenliği hem motivasyonu aşındırır. Kasıtlı insan teması sürdürün: ara sıra gündemsiz görüntülü görüşmeler, sanal bir kahve, mümkün olduğunda yüz yüze bir buluşma. Bağlantı, sürdürülebilir uzaktan çalışmanın gerçek bir girdisidir, bir lüks değil.

## Sıkça Sorulanlar

**Uzaktan çalışırken terfi alma olasılığım daha mı düşük?**
Gerçek bir “yakınlık önyargısı” riski vardır — yöneticiler gördükleri kişileri kayırır. Bunu, işinizi ve sonuçlarınızı yüksek düzeyde görünür kılarak, ilişkileri kasıtlı olarak kurarak ve iyi işin kendini anlatacağını varsaymak yerine yöneticinizle doğrudan kariyer konuşmaları yaparak dengelersiniz.

**Sürekli çalışmayı nasıl bırakırım?**
Kesin bir bitiş belirleyin ve onu bir ritüel ve fiziksel ayrımla (dizüstünü kapatın, odadan çıkın, bildirimleri kapatın) uygulayın. Gün sonunuza, bir toplantı kadar pazarlık edilemez davranın. Sınır kendiliğinden belirmez.

**Uzaktan çalışma gerçekten o kadar üretken mi?**
Araştırmalar genellikle uzaktan ve hibrit çalışanların odaklanılan işte en az o kadar üretken olduğunu, hibrit düzenlemelerin ise çoğu zaman memnuniyet ve elde tutmada en yüksek puanı aldığını bulur. Üretkenlik sorusu genellikle konumdan çok, iletişim normları ve yönetimle ilgilidir.`,
  },
  {
    topicKey: 'career-networking',
    title: 'Ağ Kurmaktan Nefret Edenler İçin Ağ Kurma',
    question: 'Geleneksel ağ kurmayı tuhaf buluyorsam etkili biçimde nasıl ağ kurarım?',
    summary:
      'Çoğu iş ve fırsat, başvurulardan değil ilişkilerden akar — ama etkili ağ kurmak yağcılık değildir. Faydalı ve meraklı olarak gerçek bağlantılar kurmak, gevşekçe temasta kalmak ve “zayıf bağların” (tanıdıkların) en çok kapıyı açtığını hatırlamaktır.',
    tags: ['kariyer', 'ağ kurma', 'iş arama', 'çalışma'],
    language: 'tr',
    image: { prompt: promptOf('career-networking'), alt: 'Bağlantıların samimi ve karşılıklı olduğu yerlerde daha parlak yanan bir düğüm ağı' },
    sources: [
      { title: 'Mark Granovetter, “Zayıf Bağların Gücü” (1973)', url: 'https://www.jstor.org/stable/2776392' },
      { title: 'ABD Çalışma Bakanlığı CareerOneStop — Ağ kurma', url: 'https://www.careeronestop.org/JobSearch/Network/network-with-people.aspx' },
    ],
    content: `# Ağ Kurmaktan Nefret Edenler İçin Ağ Kurma

Eğer “ağ kurma” size zoraki sohbeti ve yabancılara kartvizit dağıtmayı çağrıştırıyorsa, size gerçekten değerli bir şeyin en kötü versiyonu satılmış. İşte yeniden çerçeve: **ağ kurmak, sadece gerçek ilişkiler kurmak ve sürdürmektir** — ve çoğu fırsat (işler, müşteriler, iş birlikleri, tavsiye) soğuk başvurulardan değil, sizi tanıyan insanlardan geçer. Dışa dönük birine dönüşmek zorunda değilsiniz. Faydalı ve ulaşılabilir olmaya başlamalısınız.

## Tanıdıklar neden arkadaşlardan daha önemli

Sosyolojinin en ünlü bulgularından biri, Mark Granovetter’ın “zayıf bağların gücü”, nedenini açıklar: yakın arkadaşlarınız çoğunlukla sizin zaten tanıdığınız aynı kişileri ve fırsatları bilir. **Zayıf bağlarınız** — eski meslektaşlar, sınıf arkadaşları, tanıdıklar — farklı çevrelerde dolaşır, bu yüzden başka türlü asla duyamayacağınız işleri ve bilgiyi yüzeye çıkaranlar onlardır. Bu, ağ kurmaktan kaçınanlar için özgürleştiricidir: herkesle derin bağlar kurmanız gerekmez. Geniş, hafifçe sürdürülen bir tanıdıklar ağı, tam da kapıları açan şeydir.

## İstemeden önce verin

İğrenç hissettiren ağ kurma, işlemseldir — yalnızca bir şeye ihtiyacınız olduğunda iletişime geçmek. İşe yarayan ağ kurma bunun tam tersidir: **önce faydalı olun.** Birinin değer vereceği bir makale paylaşın, bir tanıştırma yapın, yardım teklif edin, bir başarıyı tebrik edin, alanınızda bir soruyu yanıtlayın. Bu küçük, samimi eylemler hiçbir gündem olmadan iyi niyet biriktirir, böylece daha sonra *gerçekten* bir şeye ihtiyaç duyduğunuzda, bir istekle gelen yabancı değil, gerçek bir kişi olursunuz. Motor cömertliktir, çekicilik değil.

Merak gerisini taşır. Ağ kurma kaygısı genellikle etkilemek zorunda olduğunuz hissinden gelir; onu karşıdaki kişiye yönelik gerçek bir ilgiyle değiştirin — ne üzerinde çalıştıkları, neyi çözmeye çalıştıkları. İnsanlar *kendileriyle* ilgilenenleri hatırlar ve merak, performansa göre çok daha kolay sürdürülür.

## Gevşekçe temasta kalın (herkesin atladığı kısım)

Çoğu insan yalnızca iş ararken ağ kurar, ki bu en kötü zamandır — çaresiz ve tek yönlü. Kalıcı yaklaşım, **hafif, sürekli temastır**: birkaç ayda bir mesaj, birinin işine bir yorum, ara sıra bir hasret giderme. Çok az maliyetlidir ama bir tavsiye veya öğüde ihtiyaç duyduğunuzda, soğumuş bir ilişkiyi diriltmek yerine sıcak bir ilişkiye ulaşmanız anlamına gelir. İki satırlık bir “bunu gördüm ve seni hatırladım”, bir bağlantıyı yıllarca canlı tutar.

## Sıkça Sorulanlar

**İçe dönüğüm — bu konuda kötü müyüm yani?**
Hayır. İçe dönükler çoğu zaman birebir *daha iyi* ağ kurar, orada derinlik ve dinlemek, bir odayı çevirmeyi yener. Nefret ediyorsanız büyük buluşmaları atlayın; kahve sohbetleri, çevrimiçi topluluklar ve ortak ilgi alanları yoluyla daha az sayıda gerçek ilişki kurun. Kalite, niceliği yener.

**İnsanları kullanıyormuşum gibi hissetmeden nasıl yardım isterim?**
Özgül olun, hayır demeyi kolaylaştırın ve zamanlarına saygı gösterin (“X hakkında iki soru sorabilir miyim? İşin başından aşkınsa hiç sorun değil”). Özgül, mütevazı, geri çevirmeye açık istekler bir yük değil, bir iltifat gibi hissettirir — ve çoğu insan, iyi sorulduğunda yardım etmeyi gerçekten sever.

**Çevrimiçi ağ kurma sayılır mı?**
Kesinlikle — mesleki topluluklara düşünceli katılım, faydalı işi paylaşmak ve samimi yorumlar, gerçek ilişkiler ve erişim kurar. Birçok insan için yüz yüze etkinliklerden daha az yorucu ve daha etkilidir.`,
  },
  {
    topicKey: 'changing-careers',
    title: 'Kariyer Nasıl Değiştirilir (Sıfırdan Başlamadan)?',
    question: 'Yeni bir kariyer alanına nasıl geçerim ve baştan başlamak zorunda kalır mıyım?',
    summary:
      'Kariyer değişiklikleri nadiren sıfırdan başlamak demektir — becerilerinizin çoğu transfer olur. Yol; bu aktarılabilir becerileri belirlemek, belirli boşlukları kasıtlı olarak kapatmak, projelerle kanıt oluşturmak ve değişimin neden mantıklı olduğuna dair net bir hikaye anlatmaktır.',
    tags: ['kariyer', 'kariyer değişimi', 'beceriler', 'çalışma'],
    language: 'tr',
    image: { prompt: promptOf('changing-careers'), alt: 'Aktarılabilir becerilerden kurulu bir köprüde yeni bir adaya geçen bir figür' },
    sources: [
      { title: 'ABD Çalışma İstatistikleri Bürosu — Mesleki Görünüm El Kitabı (aktarılabilir beceriler, görünüm)', url: 'https://www.bls.gov/ooh/' },
      { title: 'CareerOneStop — Beceri değerlendirmesi ve kariyer değişimi araçları', url: 'https://www.careeronestop.org/' },
    ],
    content: `# Kariyer Nasıl Değiştirilir (Sıfırdan Başlamadan)?

Çoğu kariyer değiştireni durduran korku şudur: “En alttan baştan başlamak zorunda kalacağım.” Bu genellikle yanlıştır. Yüksek düzeyde teknik ve diplomayla kapılı bir şeye (tıp veya hukuk gibi) geçmiyorsanız, **inşa ettiğiniz şeyin çoğu transfer olur** — püf noktası, onu tanımak, çerçevelemek ve yalnızca kalan belirli boşlukları doldurmaktır. Kariyer değişimi bir uçurum değil, bir köprüdür.

## Aktarılabilir becerilerinizin envanterini çıkarın

Beceriler iki türdür. **Alan becerileri** alana özgüdür (vergi hukukunu bilmek, Python yazmak). **Aktarılabilir beceriler** her yere gider: iletişim, proje yönetimi, analiz, liderlik, problem çözme, müşterilerle çalışma, bütçe yönetimi. Değerinizin çoğu aktarılabilir yığında yaşar ve yeni bir alana sizinle gelir. Kurumsal eğitime geçen bir öğretmen sunum becerilerini, müfredat tasarımını ve bir odayı yönetmeyi taşır; pazarlamaya geçen bir gazeteci araştırmayı, yazmayı ve teslim tarihlerini tutturmayı taşır. Her şeyden önce, mevcut unvanınızdan bağımsız olarak gerçekten iyi yaptığınız şeyleri listeleyin — başlangıç sermayeniz odur.

## Boşluğu kasıtlı olarak kapatın, sonra kanıtlayın

Hedef rolü öğrendikten sonra, henüz sahip olmadığınız ve onun gerektirdiği **belirli** becerileri veya bilgiyi belirleyin — “her şey” değil, yalnızca gerçek boşluklar. Sonra onları kasıtlı olarak kapatın: odaklı bir kurs, gerçekten önemli olduğunda bir sertifika veya yaparak öğrenme. En önemlisi, **kanıt oluşturun.** Çoğu alanda, gösterilen yetenek diplomaları yener: bir portföy parçası, bir serbest çalışma projesi, bir gönüllü rol, bir yan proje veya açık bir topluluğa katkı, yeni işi yapabileceğinizi gösterir, sadece ona ilgi duyduğunuzu iddia etmenizi değil. Kanıt, umutlu bir adayı inandırıcı birine dönüştüren şeydir.

## Tutarlı bir hikaye anlatın

Kariyer değiştirenler mülakatları yetenek üzerinden değil, kafa karıştırıcı bir anlatı üzerinden kaybeder. İşverenler endişelenir: “Neden değişim? Kalır mı? Bunu gerçekten yapabilir mi?” Bunu, değişimi bir kaçış değil mantıklı bir ilerleme olarak çerçeveleyen net bir hikayeyle önleyin: sizi yeni alana neyin çektiği, onun geçmişinizle nasıl bağlandığı ve sıra dışı geçmişinizin neden bir yük değil bir *varlık* olduğu. “Satıştaki yıllarım bana müşterilerin tam olarak nerede zorlandığını öğretti, bu yüzden ürüne geçtim”, özür diler gibi bir “sadece farklı bir şey istedim”i yener. Karma geçmişiniz bir özelliktir — onu öyle çerçeveleyin.

## Sıkça Sorulanlar

**Maaş kesintisine uğramak zorunda mıyım?**
Bazen, özellikle tamamen yeni bir alana daha düşük bir seviyede girerken — ama her zaman değil ve nadiren sıfıra geri. Güçlü aktarılabilir beceriler, yetenek kanıtı ve iyi müzakere bu düşüşü sınırlar ve size daha uygun bir işteki uzun vadeli yörünge, çoğu zaman onu fazlasıyla geri kazandırır.

**Kariyer değiştirmek için çok mu yaşlıyım?**
İnsanlar her yaşta başarıyla kariyer değiştirir. Deneyim ve olgunluk işverenlerin değer verdiği varlıklardır; aktarılabilir becerileriniz ve işleri halletme geçmişiniz son kullanma tarihine sahip değildir. Daha büyük risk genellikle korkudan ötürü size yanlış gelen bir yerde kalmaktır.

**Okula geri dönmem gerekir mi?**
Çoğu zaman hayır. Resmî yeniden eğitim, ruhsatlı alanlar (sağlık, hukuk, mühendislik) için önemlidir, ama birçok rol için hedefli kurslar artı gerçek işten oluşan bir portföy sizi oraya daha hızlı ve daha ucuza ulaştırır. Yalnızca alan gerçekten diplomaya bağlıysa bir diplomaya uzanın.`,
  },
  {
    topicKey: 'work-burnout',
    title: 'Tükenmişlik: Aslında Ne Olduğu ve Nasıl Toparlanılacağı',
    question: 'Tükenmişlik nedir, sıradan stresten nasıl farklıdır ve nasıl toparlanırım?',
    summary:
      'Tükenmişlik, başa çıkma yetinizi alt eden kronik işyeri stresidir — bitkinlik, sinizm ve azalmış etkinlikle işaretlenir. Kişisel bir zayıflık değil, sistemik bir sorundur ve toparlanmak genellikle daha sıkı dinlenmeyi değil, koşulları değiştirmeyi gerektirir.',
    tags: ['çalışma', 'tükenmişlik', 'ruh sağlığı', 'esenlik'],
    language: 'tr',
    image: { prompt: promptOf('work-burnout'), alt: 'Zorlanarak değil, ağırlıklar kaldırılıp hava verilerek toparlanan, sönmek üzere bir fener' },
    sources: [
      { title: 'Dünya Sağlık Örgütü — Mesleki bir olgu olarak tükenmişlik (ICD-11)', url: 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases' },
      { title: 'Maslach & Leiter — tükenmişlik boyutları üzerine araştırma', url: 'https://www.apa.org/monitor/2022/01/special-burnout-stress' },
    ],
    content: `# Tükenmişlik: Aslında Ne Olduğu ve Nasıl Toparlanılacağı

Tükenmişlik, “yorgunum” veya “bu hafta zorluydu”dan fazlasıdır. Dünya Sağlık Örgütü onu özgül olarak **başarıyla yönetilmemiş kronik işyeri stresinden** kaynaklanan bir sendrom olarak tanımlar. Üç imzası vardır: derin **bitkinlik** (fiziksel ve duygusal tükenme), **sinizm** (işinize karşı artan kopukluk veya olumsuzluk) ve bir **azalmış etkinlik** duygusu (ne kadar uğraşırsanız uğraşın artık iyi iş çıkarmadığınızı hissetmek). Bu üçlü tanıdık geliyorsa, ciddiye almaya değer — ve bunun bir karakter kusuru değil, tanınmış bir mesleki olgu olduğunu bilmeye de.

## Stres ile tükenmişlik — önemli bir fark

Sıradan stres “çok fazla”dır — çok fazla talep, ama yine de öbür tarafta bir rahatlama hayal edebilirsiniz. Tükenmişlik “boş”tur — tükenmiş, kopuk olursunuz ve izinli bir hafta sonu artık şarj etmez. Stres, sorumluluklarda boğulmak gibi hissettirir; tükenmişlik, kurutulmuş ve umursamanın ötesinde olmak gibi. Ayrım önemlidir çünkü çözümler farklıdır: stres daha iyi zaman yönetimi veya bir molayla hafifleyebilir, gerçek tükenmişlik ise genellikle daha sıkı dinlenip aynı çarka dönmek yerine, ona neden olan **koşulları** değiştirmeyi gerektirir.

## Genellikle siz değil, durumdur

En önemli yeniden çerçeve: tükenmişlik büyük ölçüde kişisel zayıflıktan değil, **iş ortamından** kaynaklanır. Araştırmalar onu tutarlı biçimde belirli koşullarla ilişkilendirir:

| Etken | Neye benzer |
| --- | --- |
| Sürdürülemez iş yükü | Toparlanma olmadan kronik aşırı yük |
| Kontrol eksikliği | Nasıl veya ne zaman çalışacağınızda söz hakkı yok |
| Yetersiz ödül | Çaba tanınmaz, düşük ücretli, görülmez |
| Adaletsizlik | Kayırmacılık, kırılmış güven, tutarsızlık |
| Değer çatışması | İlkelerinize aykırı davranmaya zorlanmak |
| Topluluğun çöküşü | Yalıtım, çatışma, destek yokluğu |

Dikkat edin, bunlar çoğunlukla bireysel değil, *örgütseldir*. Bu yüzden “sadece yoga yap ve daha çok uyu” bir tedavi olarak sıkça başarısız olur — öz bakım başa çıkmanıza yardım edebilir ama temelde sürdürülemez bir işi düzeltemez. Toparlanmak sıkça iş yükünü, sınırları, rolü veya bazen işin kendisini yeniden müzakere etmek demektir.

## Toparlanma

Gerçek toparlanma, kişisel ve yapısal olanı birleştirme eğilimindedir: depoyu yeniden doldurmak için gerçek dinlenme ve bağlantısızlık; sınırları yeniden öne sürmek (hayır demek, mesai dışını korumak); işe anlam veren şeyle yeniden bağlanmak; ve — çoğu zaman belirleyici adım — yöneticinizle iş yükü ve kontrol hakkında konuşarak, rolünüzü yeniden yapılandırarak veya gidip başkasına geçerek **koşulları değiştirmek.** Destek de önemlidir: tükenmişlik yalıtımda gelişir ve insanlarla (şiddetliyse bir profesyonel dahil) konuşmak, bir başarısızlık itirafı değil, çıkışın bir parçasıdır.

## Sıkça Sorulanlar

**İşimi bırakmadan tükenmişlikten toparlanabilir miyim?**
Çoğu zaman evet — altta yatan etkenler değişebiliyorsa. İş yükünü yeniden müzakere etmek, daha fazla kontrol kazanmak, daha sıkı sınırlar koymak ve rolünüzü kaydırmak yeterli olabilir. Ama koşullar sabit ve zehirliyse, bazen ayrılmak bir yenilgi değil, en sağlıklı ve en rasyonel seçimdir.

**Tükenmişlik depresyonla aynı şey mi?**
Örtüşürler ve bir arada bulunabilirler, ama tükenmişlik özgül olarak işe bağlıdır, depresyon ise daha geniştir ve yaşamın tümüne yayılır. Kalıcı düşük ruh hali, umutsuzluk veya kendine zarar verme düşünceleri tükenmişliğin ötesine geçer ve hemen profesyonel yardım gerektirir.

**Bir tatil onu düzeltir mi?**
Bir mola akut bitkinliği hafifletebilir, ama sizi tüketen koşulların tam da aynısına geri dönerseniz, tükenmişlik genellikle haftalar içinde geri gelir. Dinlenme belirtiyi tedavi eder; koşulları değiştirmek nedeni tedavi eder.`,
  },
  {
    topicKey: 'cover-letter',
    title: 'Niyet Mektupları Hâlâ Önemli mi — ve İyi Bir Tanesi Nasıl Yazılır?',
    question: 'Niyet mektupları hâlâ yazmaya değer mi ve bir tanesi gerçekte ne söylemeli?',
    summary:
      'Niyet mektupları artık çoğu zaman isteğe bağlıdır ama iyi yapıldığında yine de yakın kararları lehinize çevirir. İyi bir tanesi, düzyazıyla bir CV değildir — sizin ve bu rolün neden uyduğuna dair özgül bir gerekçe sunar, şirketi anladığınızı gösterir ve CV’nin taşıyamadığı bağlamı ekler.',
    tags: ['kariyer', 'iş arama', 'niyet mektubu', 'çalışma'],
    language: 'tr',
    image: { prompt: promptOf('cover-letter'), alt: 'Bir kişiyi bir şirkete bağlayan tek bir odaklı ışın hâline açılan bir mektup' },
    sources: [
      { title: 'Harvard Kariyer Hizmetleri Ofisi — Niyet mektubu rehberi', url: 'https://careerservices.fas.harvard.edu/resources/create-a-strong-cover-letter/' },
      { title: 'CareerOneStop — Niyet mektubu temelleri', url: 'https://www.careeronestop.org/JobSearch/Resumes/cover-letters.aspx' },
    ],
    content: `# Niyet Mektupları Hâlâ Önemli mi — ve İyi Bir Tanesi Nasıl Yazılır?

Niyet mektuplarının hâlâ önemli olup olmadığına dair dürüst yanıt: **duruma bağlı ve eskisinden daha sık isteğe bağlılar** — ama güçlü bir tanesi yine de yakın kararları lehinize çevirir ve zayıf veya yok bir tanesi, bir işe alım yöneticisi benzer adaylar arasında karar verirken size mal olabilir. Niyet mektubunu yüksek kaldıraçlı bir seçenek olarak görün: gerçekten istenmediği yerde atlayın, sizi farklılaştırabileceği yere yatırım yapın.

## Bir niyet mektubu aslında ne işe yarar

En büyük hata, sadece CV’yi paragraflar hâlinde yeniden ifade eden bir niyet mektubu yazmaktır. CV zaten *ne* yaptığınızı listeler; niyet mektubunun işi, CV’nin yapamadığı **savı** ortaya koymaktır — özellikle, *sizin ve bu rolün neden güçlü bir eşleşme olduğunu.* İyi bir tanesi, CV’nin yapmadığı üç şeyi yapar:

- **Şirketi ve rolü anladığınızı gösterir** — özgül, genel yağcılık değil — *bu* işi gerçekten istediğinizi kanıtlayarak.
- **Deneyiminizi onların ihtiyaçlarına bağlar** — “X’e ihtiyacınız var; işte bunu tam olarak teslim ettiğim an.”
- **Bağlam ekler**, CV’nin taşıyamadığı — açıklanan bir kariyer değişimi, ele alınan bir boşluk, belirli bir misyona sıra dışı bir heves.

## Basit, etkili bir yapı

| Bölüm | İş |
| --- | --- |
| **Açılış** | Onları yakalayın — neden bu rol/şirket özellikle, “başvurmak için yazıyorum…” değil |
| **Orta (1–2 paragraf)** | En güçlü, en alakalı kanıtınız, *onların* ihtiyaçlarına bağlı, somut bir örnekle |
| **Kapanış** | Uyumu yeniden teyit edin, kısa ve özgüvenli, net bir sonraki adımla |

Onu **bir sayfa, üç ya da dört sıkı paragraf** ile sınırlayın. Bulabilirseniz gerçek bir kişiye hitap edin. Özgül ve enerjik bir şeyle başlayın; genel “Pozisyona olan ilgimi belirtmek için yazıyorum” açılışı en iyi tek satırınızı israf eder. Ve her mektubu uyarlayın — geri dönüştürülmüş, bul-değiştir bir mektup çoğu zaman hiç yoktan kötüdür, çünkü dikiş yerleri belli olur.

## Ne zaman zahmete değer (ve ne zaman değil)

Şu durumlarda samimi bir niyet mektubu yazın: başvuru bir tane istiyorsa, kariyer değiştireniyseniz veya açıklanacak bir boşluğunuz varsa, o belirli şirkete özellikle tutkuluysanız veya herhangi bir avantajın işe yaradığı rekabetçi bir rolse. Form onu açıkça isteğe bağlı kıldığında ve CV’nin ötesinde ekleyecek bir şeyiniz olmadığında atlayın veya en aza indirin — gönülsüz bir mektup hiçbir şey katmaz ve eksiltebilir. Kural: yapacak *gerçek, özgül bir savınız* olduğunda yazın; olmadığında doldurmayın.

## Sıkça Sorulanlar

**Niyet mektubumu yazmak için yapay zeka kullanmalı mıyım?**
Bir taslak yardımı olarak, sorun değil — ama genel yapay zeka çıktısı genel okunur, ki bu tam olarak kaçınılması gereken başarısızlık biçimidir. Başlamak için kullanın, sonra onu özgül kılın: şirket hakkında gerçek ayrıntılar, hayatınızdan gerçek örnekler, kendi sesiniz. Özgüllük tüm mesele ve ona yalnızca siz sahipsiniz.

**Ne kadar resmî olmalı?**
Şirketin kültürüne uyun — bir hukuk firması için cilalı bir ton, gündelik bir girişim için daha sıcak bir tane — ama her zaman profesyonel ve hatasız. Kısa, kasıtlı bir belgedeki tek bir yazım hatası kötü biçimde göze çarpar.

**İşe alım yöneticisinin adını bulamazsam ne yaparım?**
“Sayın İşe Alım Ekibi” veya “Sayın [Departman] Ekibi” iyidir. Modası geçmiş “İlgili Makama”dan kaçının. Biraz araştırma (şirket sitesi, LinkedIn) bazen bir ad ortaya çıkarır ve bu küçük çaba kendini gösterebilir.`,
  },
  {
    topicKey: 'asking-for-raise',
    title: 'Nasıl Zam İstenir (ve Gerçekten Alınır)?',
    question: 'Nasıl zam isterim ve “evet” alma şansımı en çok ne artırır?',
    summary:
      'Zam almak, talep ettiğiniz bir iyilik değil, kurduğunuz bir savdır. Etkinizi belgeleyin, piyasa değerinizi araştırın, isteği iyi zamanlayın ve onu sunduğunuz değer etrafında çerçeveleyin — sonra fark edilmeyi ummak yerine doğrudan ve özgül biçimde isteyin.',
    tags: ['kariyer', 'maaş', 'zam', 'çalışma'],
    language: 'tr',
    image: { prompt: promptOf('asking-for-raise'), alt: 'Bir blok daha eklenirken değer okuyla yükselen, istiflenmiş başarı blokları' },
    sources: [
      { title: 'Harvard Müzakere Programı — zam isteme', url: 'https://www.pon.harvard.edu/category/daily/salary-negotiations/' },
      { title: 'ABD Çalışma İstatistikleri Bürosu — ücret ve kazanç verileri', url: 'https://www.bls.gov/bls/wages.htm' },
    ],
    content: `# Nasıl Zam İstenir (ve Gerçekten Alınır)?

İyi iş için ödüllendirilmeyi sessizce beklemek, en yaygın zam stratejisidir ve en kötülerinden biri. Yöneticiler meşguldür, bütçeler sınırlıdır ve gıcırdayan ama makul olan tekerlek yağlanır. Her şeyi değiştiren yeniden çerçeve: **zam, talep ettiğiniz bir kişisel iyilik değil, kurup sunduğunuz bir iş gerekçesidir.** İşiniz, yöneticinizin “evet” demesini hem kolay hem iyi gerekçelendirilmiş kılmaktır — ve bu yalnızca cesaret değil, hazırlık ister.

## Savı kurun: etkinizi belgeleyin

O konuşmadan çok önce, **başarılarınızın ve etkinizin** süregelen bir kaydını tutun — teslim edilen projeler, çözülen sorunlar, etkilenen gelir, kesilen maliyetler, orijinal rolünüzün ötesinde büyüyen sorumluluklar. Sayılarla somut örnekler kanıtınızdır: “X’i getiren projeye liderlik ettim” veya “ayrılan kıdemli rolün görevlerini altı ay üstlendim.” Bellek güvenilmezdir ve kendine yontan hatırlama ikna edici değildir; somut bir kayıt, içeriye duygularla değil kanıtla girmenizi sağlar. En güçlü sav, halihazırda mevcut ücretinizin üzerinde çalıştığınızı gösterir.

## Piyasa değerinizi bilin ve iyi zamanlayın

İç gerekçenizi **dış verilerle** eşleştirin: bu rol başka yerde, sizin deneyiminiz ve konumunuz için ne öder? Teslim ettiğiniz şey için piyasanın altında ödeniyorsanız, bu güçlü, nesnel bir argümandır. **Zamanlamada**, doğal anlarda şansınız yükselir — net bir kazanımdan sonra, bir değerlendirme döngüsünde, daha fazlasını üstlendiğinizde veya şirket iyi gittiğinde. Ekip hedefleri kaçırdıktan hemen sonra, bir işe alım dondurması sırasında veya yöneticiniz gözle görülür biçimde işin altında ezilirken istemekten kaçının. Anı okumak, isteğin bir parçasıdır.

## İsteği yapın: doğrudan, özgül, değer odaklı

An geldiğinde, **doğrudan ve özgül** olun. İma etmeyin veya anlaşılmasını ummayın — ücretinizi konuşmak istediğinizi açıkça belirtin, savınızı sunun (etki + piyasa verisi) ve belirli bir rakam veya aralık söyleyin. Onu **ihtiyaç değil, değer** etrafında çerçeveleyin: “Katkılarıma ve bu rolün piyasasına dayanarak, maaşımı Y’ye çıkarmak isterim”, “artan giderlerim var” değil. Sonra konuşmayı bırakın ve onların yanıt vermesine izin verin. Yanıt “şimdi değil” ise, onu ilerlemeye dönüştürün: onu hak etmek için tam olarak neyin doğru olması gerektiğini ve ne zamana kadar olduğunu sorun — bir “hayır”ı somut bir yol haritasına çevirin.

## Sıkça Sorulanlar

**Hayır derlerse ne olur?**
Bunu son olarak görmeyin. Bir “evet”i mümkün kılacak belirli sonuçların veya zaman çizelgesinin ne olduğunu sorun ve mümkünse yazılı alın. Net bir yol (“bu hedeflere ulaş, altı ayda yeniden görüş”) bir kazançtır. Dürüst yanıt “asla” ise, bu kalıp kalmamak hakkında önemli bir bilgidir.

**Rakip bir teklifi anmalı mıyım?**
Yalnızca gerçekse ve onu kabul etmeyi gerçekten düşünüyorsanız — blöf yapmak kötü biçimde geri tepebilir. Gerçek bir teklif bir koz olsa da, onu kullanmak ilişkiyi de değiştirebilir ve bazı yöneticiler gitmenize izin verir. Onu gelişigüzel sallamak yerine dikkatlice tartın.

**Zam için iş değiştirmek daha mı iyi?**
Çoğu zaman dış geçişler, iç zamlardan daha büyük sıçramalar getirir, ki bunu bilmeye değer — ama geçiş yapmanın maliyetleri vardır (risk, hızlanma süreci, kaybedilen kıdem). Bu bilgiyi kendinizi doğru değerlendirmek için kullanın; ayrılmanın tek yol olduğuna karar vermeden önce, iç isteğinize bilgi vermesine izin verin.`,
  },
  {
    topicKey: 'imposter-syndrome',
    title: 'Sahtekârlık Sendromu: Yetenekli İnsanlar Neden Kendilerini Sahtekâr Gibi Hisseder',
    question: 'Sahtekârlık sendromu nedir, neden bu kadar yaygın ve onunla nasıl başa çıkarım?',
    summary:
      'Sahtekârlık sendromu, gerçek yetkinliğe rağmen kendini sahtekâr hissetmenin sürekli hâlidir ve tam da yetenekli insanlarda yaygındır. Başarıyı şansa atfetmekten ve ifşa korkusundan beslenir — ve kanıt topladığınızda, onu normalleştirdiğinizde ve şüpheye rağmen harekete geçtiğinizde hafifler.',
    tags: ['çalışma', 'sahtekârlık sendromu', 'özgüven', 'esenlik'],
    language: 'tr',
    image: { prompt: promptOf('imposter-syndrome'), alt: 'Yanında gerçek hâlini gösteren bir aynayla, küçücük çarpık bir gölge düşüren yetenekli bir figür' },
    sources: [
      { title: 'Clance & Imes, “Yüksek Başarılı Kadınlarda Sahtekârlık Olgusu” (1978)', url: 'https://psycnet.apa.org/record/1979-26502-001' },
      { title: 'Amerikan Psikoloji Derneği — Sahtekârlık olgusuna genel bakış', url: 'https://www.apa.org/monitor/2021/06/cover-impostor-phenomenon' },
    ],
    content: `# Sahtekârlık Sendromu: Yetenekli İnsanlar Neden Kendilerini Sahtekâr Gibi Hisseder

Sahtekârlık sendromu, herkesi kandırmış bir sahtekâr olduğunuz yönündeki sürekli, dırdırcı histir — rolünüzü gerçekten hak etmediğiniz ve her an “yakalanacağınız” — *yetkinliğinizin* açık kanıtına rağmen. En zalim kısım paradokstur: en çok yetenekli, başarılı insanları vurur, çünkü kendini sahtekâr gibi hissetmek, hak etmeyebileceğinizi hissedecek kadar başarmış olmayı gerektirir. İlk kez 1978’de tanımlandı (başlangıçta yüksek başarılı kadınları inceleyerek, ama artık her türden insanı etkilediği biliniyor) ve son derece yaygındır — çoğu insan bir noktada, özellikle yeni bir şeye uzanırken bunu hisseder.

## Neden ısrarcı: düşünce tuzakları

Sahtekârlık hisleri birkaç kendini baltalayan zihinsel alışkanlık üzerinde çalışır:

- **Başarıyı küçümseme.** İşler iyi gittiğinde, krediyi şansa, zamanlamaya veya “sadece beni seviyorlar”a verirsiniz — kendi yeteneğinizden başka her şeye. Kazanımlar öz imgenizi asla güncellemez.
- **Başarısızlığı sahiplenme.** İşler kötü gittiğinde, *onu* dosdoğru kendinize atfedersiniz. Böylece kanıt hep tek yönde akar: “yeterince iyi değilim”e doğru.
- **İçinizi başkalarının dışıyla kıyaslama.** Kendi özel şüphelerinizi herkesin cilalı yüzeyiyle ölçer, onların da çoğu zaman özgüven taklidi yaptığını asla görmezsiniz.
- **Kale direklerini oynatma.** Her başarı, ona ulaştığınız an “aslında o kadar da zor değildi” olarak yeniden tanımlanır, böylece gerçekten başardığınızı asla hissetmezsiniz.

Bunlar birlikte, hiçbir başarı miktarının asla yeterli hissettirmediği kapalı bir döngü yaratır — bu yüzden yüksek başarılı kişiler onu en keskin biçimde hissedebilir.

## Gerçekten yardımcı olan

Sahtekârlık hislerinden nadiren *düşünerek* çıkarsınız, ama tutuşunu gevşetebilirsiniz:

| Yaklaşım | Neden işe yarar |
| --- | --- |
| Bir kanıt dosyası tutun (kazanımlar, övgü, sonuçlar) | Beynin başarıyı küçümseme alışkanlığını dengeler |
| Adını koyun ve onun hakkında konuşun | Akranların da aynı şeyi hissettiğini keşfetmek yalıtımı kırar |
| Duyguları gerçeklerden ayırın | “Kendimi sahtekâr hissediyorum”, “Ben sahtekârım” değildir |
| Şüpheyi büyüme olarak yeniden çerçeveleyin | Zorlanmak genellikle başarısız olduğunuz değil, öğrendiğiniz anlamına gelir |
| Hisse rağmen harekete geçin | Özgüven çoğu zaman eylemi izler; hazır hissetmeyi beklemek nadiren işe yarar |

En özgürleştirici tek yeniden çerçeve: **his bir kanıt değildir.** Kendinizi sahtekâr gibi hissetmek, gerçekten öyle olup olmadığınız hakkında hiçbir şey söylemez — ve yeterince iyi olup olmadığınızı dert etmeniz, bizzat sahtekârlığın değil, vicdanlılığın bir işaretidir. (Gerçek sahtekârlar, özellikle, bunu nadiren dert eder.)

## Sıkça Sorulanlar

**Sahtekârlık sendromu hiç tamamen geçer mi?**
Çoğu insan için tekrarlar, özellikle her yeni zorluk veya seviyeyle — ki bu normaldir ve hatta büyüdüğünüzün bir işaretidir. Hedef onu yok etmek değil, sözü ona bırakmamaktır: şüpheyi hissedin ve yine de devam edin.

**Biraz öz şüphe aslında sağlıklı mı?**
Evet. Biraz alçakgönüllülük sizi öğrenmeye, geri bildirime açık ve kibirden uzak tutar. Sorun yalnızca şüphe kronik ve felç edici hâle geldiğinde ortaya çıkar — sizi fırsatlardan, konuşmaktan veya hak ettiğinizi istemekten alıkoyduğunda.

**Sahtekârlık sendromu olan birini nasıl desteklerim?**
Takdirinizde özgül olun — “analizin gerçek bir sorunu yakaladı”, “harikasın”dan daha iyi oturur. Kendi şüphelerinizi paylaşarak onu normalleştirin ve kazanımlarını küçümsemelerine nazikçe karşı çıkın. Saygı duyulan bir meslektaşın da bunu hissettiğini bilmek, çoğu zaman en güven verici şeydir.`,
  },
];
