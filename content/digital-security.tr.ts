import type { DraftArticle } from './types';
import { digitalSecurityEn } from './digital-security.en';

// Batch: Dijital Gizlilik ve Güvenlik (Türkçe yerel sürüm). digital-security.en.ts
// ile aynı başlıklar ve aynı topicKey değerleri; içerik Türk okur bağlamına göre
// yerel olarak yazıldı. Görseller İngilizce sürümle ortak.

const promptOf = (key: string): string => {
  const hit = digitalSecurityEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const digitalSecurityTr: DraftArticle[] = [
  {
    topicKey: 'password-managers',
    title: 'Neden Bir Parola Yöneticisi Kullanmalısın?',
    question: 'Parola yöneticisi nedir ve parolaları ezberlemekten gerçekten daha güvenli mi?',
    summary:
      'Parola yöneticisi, her hesap için benzersiz ve güçlü bir parolayı tek bir ana parolanın ardında üretip saklar; böylece bir sitenin ele geçirilmesi diğerlerini açamaz. Çoğu insan için etkisi en yüksek tek güvenlik alışkanlığıdır.',
    tags: ['güvenlik', 'gizlilik', 'parolalar', 'dijital güvenlik'],
    language: 'tr',
    image: {
      prompt: promptOf('password-managers'),
      alt: 'Yüzlerce benzersiz anahtar dolu bir kasayı açan tek bir ana anahtar',
    },
    sources: [
      { title: 'NIST — Dijital Kimlik Kılavuzu (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Güçlü Parolalar ve parola yöneticileri', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# Neden Bir Parola Yöneticisi Kullanmalısın?

Parola yöneticisinin çözdüğü temel sorun **yeniden kullanımdır**. Hiç kimse yüz tane farklı güçlü parolayı ezberleyemez, bu yüzden insanlar bir avuç parolayı döndürüp durur — ve bu, herhangi bir site ele geçirildiği anda saldırganların o "e-posta ve parola" çiftini alıp bankanızda, e-postanızda ve her yerde denemesi demektir. **Kimlik bilgisi doldurma (credential stuffing)** denen bu otomatik saldırı, hesapların ele geçirilmesinin en yaygın yollarından biridir. Parola yöneticisi her hesaba kendi benzersiz, rastgele parolasını vererek bunu kökünden keser.

## Nasıl çalışır

Parola yöneticisi şifrelenmiş bir kasadır. Yalnızca **bir** güçlü ana parolayı hatırlarsınız; gerisini o hatırlar:

- **Üretir**: uzun, rastgele parolalar (örneğin \`v8#mQ2!pLx9\$\`) — bunları asla yazmanız ya da hatırlamanız gerekmez.
- **Saklar**: ana parolanızla kilitlenmiş şekilde şifreli olarak.
- **Otomatik doldurur**: doğru kimlik bilgisini doğru sitede — ve bir bonus olarak, kimlik avına direnir; çünkü gerçek banka parolanızı ona çok benzeyen sahte bir alan adına doldurmaz.

Kasa öyle şifrelenir ki yöneticiyi sağlayan şirket bile parolalarınızı okuyamaz — buna "sıfır bilgi (zero-knowledge)" denir. Ana parolanız cihazınızdan asla kullanılabilir bir biçimde çıkmaz.

## İtiraza yanıt

İçgüdüsel endişe şudur: "Bütün parolaları tek bir yere koymak tehlikeli değil mi?" Riskli gibi gelir, ama hesap tam tersi çıkar:

| Yönetici olmadan | Yönetici ile |
| --- | --- |
| Az parola, yoğun yeniden kullanım | Her site için benzersiz parola |
| Bir sızıntı → birçok hesap düşer | Bir sızıntı → tek hesap, sınırlandırılmış |
| Zayıf, akılda kalan seçimler | Uzun, rastgele, kırılamaz seçimler |
| Parolalar kimlik avı sitelerine yazılır | Otomatik doldurma yanlış alan adını reddeder |

Evet, ana parola tek bir hata noktasıdır — bu yüzden *onu* iyi korursunuz (uzun, rastgele kelimelerden bir parola cümlesi, artı yöneticinin kendisinde iki adımlı doğrulama) ve şunu kabul edersiniz: bir sırrı şiddetle savunmak, yüzünü berbat şekilde savunmaktan iyidir.

## Seçmek ve başlamak

İtibarlı yöneticiler — ister iyi değerlendirilen bulut hizmetleri, ister saygın çevrimdışı/açık kaynak seçenekler olsun — hepsi yeniden kullanımdan çok daha iyidir. Pratik öneriler:

- **Ana parola**: rastgele kelimelerden oluşan uzun bir parola cümlesi yapın; benzersiz olsun, başka hiçbir yerde kullanılmasın. Asıl ezberleyeceğiniz tek parola budur.
- **Yöneticinin hesabında iki adımlı doğrulamayı açın.**
- **Kademeli geçin**: mevcut parolaları içe aktarmasına izin verin, sonra önce önemli hesaplardaki (e-posta, bankacılık, ana alışveriş) yeniden kullanılan parolaları değiştirin.
- **Tarayıcının yerleşik aracı bile** yeniden kullanımdan iyidir — kilit davranış, her yerde benzersiz parolalardır; belirli bir marka değil.

## Sık sorulanlar

**Ana parolamı unutursam ne olur?**
Gerçek sıfır bilgi şifrelemesinde sağlayıcı genellikle onu kurtaramaz — olayın bütün mantığı budur. Başlarken yöneticinin kurtarma seçeneklerini (acil durum kiti, kurtarma kodu) ayarlayın ve bunu çevrimdışı saklayın.

**Bulut eşitlemesi güvenli mi?**
Kasa zaten **şifrelenmiş** olarak eşitlenir, dolayısıyla eşitleme sunucusu yalnızca okunamayan bir veri yığını tutar. Onu koruyan ağ değil, şifrelemenin kendisidir.

**Tarayıcıda kayıtlı parolalar yeterince iyi mi?**
Yeniden kullanımdan çok daha iyidir ve birçok kişi için yeterlidir. Özel yöneticiler tarayıcılar arası kullanım, güvenli paylaşım, sızıntı uyarıları ve daha güçlü yalıtım ekler — hesap listeniz büyüdükçe değerini gösterir.`,
  },
  {
    topicKey: 'two-factor-auth',
    title: 'İki Adımlı Doğrulama: Hangi Tür Gerçekten Güvenli?',
    question: 'İki adımlı doğrulama nedir ve SMS neden en zayıf sürümdür?',
    summary:
      'İki adımlı doğrulama, parolanın ötesinde ikinci bir kanıt ekler; böylece çalınmış bir parola tek başına yetmez. Ama türler eşit değil: SMS kodları araya girilerek ya da SIM takasıyla ele geçirilebilir, oysa doğrulama uygulamaları ve donanım anahtarları çok daha güçlüdür.',
    tags: ['güvenlik', 'iki adımlı doğrulama', 'kimlik doğrulama', 'dijital güvenlik'],
    language: 'tr',
    image: {
      prompt: promptOf('two-factor-auth'),
      alt: 'Hem anahtar hem de ayrı bir dönen jeton gerektiren bir kapı',
    },
    sources: [
      { title: 'NIST — Dijital Kimlik Kılavuzu (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Bir Paroladan Fazlası (çok faktörlü kimlik doğrulama)', url: 'https://www.cisa.gov/MFA' },
    ],
    content: `# İki Adımlı Doğrulama: Hangi Tür Gerçekten Güvenli?

İki adımlı doğrulama (2FA, daha genel olarak MFA), oturum açmanın **iki farklı türde kanıt** gerektirmesi demektir: *bildiğiniz* bir şey (parolanız) artı *sahip olduğunuz* bir şey (bir kod, bir uygulama, fiziksel bir anahtar). Amaç dayanıklılıktır — saldırgan bir sızıntı ya da kimlik avıyla parolanızı çalsa bile, ikinci faktör olmadan içeri giremez. Bunu açmak yapabileceğiniz en etkili şeylerden biridir. Ama ikinci faktörün çeşitli biçimleri vardır ve güçleri hiç de eşit değildir.

## Zayıftan güçlüye merdiven

| Yöntem | Nasıl çalışır | Zayıflık |
| --- | --- | --- |
| **SMS kodu** | Telefonunuza bir kod gönderilir | SIM takası, ağ üzerinden araya girme, kimlik avına açık |
| **Doğrulama uygulaması** | Uygulama her 30 saniyede dönen 6 haneli kod üretir | Sahte bir siteye yazarsanız kimlik avına yine açık |
| **Anlık onay (push)** | Telefonda "Bu girişi onayla?" istemi | "Yorgunluk" saldırıları — "evet"e basana dek spam |
| **Donanım güvenlik anahtarı / passkey** | Gerçek siteye kriptografik olarak bağlı fiziksel anahtar ya da cihaza özgü kimlik bilgisi | Tasarımı gereği kimlik avına dirençli |

Bu listedeki her şey yalnızca paroladan iyidir. Ama basamakların yüksekliği önemlidir.

## SMS neden zayıf basamak

Gönderilen kodlar ilk kitlesel 2FA'ydı ve hâlâ yaygındır, ama gerçek ve istismar edilen zayıflıkları var:

- **SIM takası**: saldırgan operatörünüzü numaranızı kendi SIM'ine taşımaya ikna eder (ya da rüşvetle kandırır) ve kodlarınız artık *onun* telefonuna gelir. Bu, yüksek değerli hesapların boşaltıldığı, belgelenmiş ve tekrar eden bir yöntemdir.
- **Araya girme**: alttaki telefon ağı sinyalleşmesinin, metinleri saptırabilen bilinen kusurları vardır.
- **Yine kimlik avına açık**: sahte bir oturum açma sayfası, SMS kodunu sizden isteyip gerçek zamanlı olarak iletebilir.

Dürüst sonuç: **SMS 2FA hiç yoktan çok daha iyidir** — tek seçenek olduğu yerde kullanın — ama önemli hesapları (e-posta, finans, ana kimlik) merdivende yukarı taşıyın.

## Aslında ne kullanmalı

- **Varsayılan olarak bir doğrulama uygulaması** (dönen kodlar) kullanın — ücretsiz, kolay, SIM takasına bağışık ve neredeyse her yerde destekli.
- **En kritik hesaplarınız için donanım anahtarı ya da passkey kullanın** — bunlar *kimlik avına dirençlidir*: kimlik bilgisi gerçek web sitesinin kimliğine kriptografik olarak bağlıdır, dolayısıyla ona benzeyen bir siteye asla doğrulama yapmaz ve kod tabanlı her yöntemi yenen saldırıyı boşa çıkarır.
- **Önce e-postanızı koruyun.** O, ana anahtardır — diğer her şeyin parola sıfırlamaları onun üzerinden akar, bu yüzden en güçlü faktörünüzü hak eder.

## Sık sorulanlar

**Herhangi bir 2FA hiç yoktan iyi mi?**
Evet, kesinlikle. SMS bile otomatik saldırıların ezici çoğunluğunu engeller. "SMS zayıftır" lafının, onu sunulan tek seçenek olduğu yerde açmaktan sizi caydırmasına izin vermeyin.

**Telefonumu / anahtarımı kaybedersem ne olur?**
Her hizmetin kayıt sırasında sunduğu yedek/kurtarma kodlarını saklayın ve ikinci bir faktör kaydedin (yedek bir anahtar ya da ikinci bir cihazdaki uygulama). Kurtarma kodlarını çevrimdışı saklayın.

**Anlık "onayla" istemleri güvenli mi?**
İyidir, ama yorgunluk saldırılarına açıktır — durdurmanız için "onayla"ya basmanızı umarak bitmek bilmeyen istemler. Başlatmadığınız bir girişi asla onaylamayın; sunulduğunda numara eşleştirmeli istemleri tercih edin.`,
  },
  {
    topicKey: 'passkeys',
    title: 'Passkey Nedir ve Parolaların Yerini mi Alıyor?',
    question: 'Passkey (geçiş anahtarı) nedir ve paroladan farkı nedir?',
    summary:
      'Passkey, parolayı web sitesi ile cihazınız arasında bölünmüş bir kriptografik anahtar çiftiyle değiştirir — hiçbir sır yazılmaz ya da paylaşılmaz, dolayısıyla kimlik avına uğrayacak, yeniden kullanılacak ya da bir sızıntıda çalınacak bir şey yoktur. Sektörün parolalara seçtiği haleftir.',
    tags: ['güvenlik', 'passkey', 'kimlik doğrulama', 'parolalar'],
    language: 'tr',
    image: {
      prompt: promptOf('passkeys'),
      alt: 'Birbirine değmeden uyduklarını kanıtlayan iki anahtar yarısı',
    },
    sources: [
      { title: 'FIDO Alliance — Passkey genel bakış', url: 'https://fidoalliance.org/passkeys/' },
      { title: 'NIST — Dijital Kimlik Kılavuzu (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
    ],
    content: `# Passkey Nedir ve Parolaların Yerini mi Alıyor?

Passkey (geçiş anahtarı), parolanın iki asli günahını gidermek için tasarlanmış bir oturum açma kimlik bilgisidir: parolalar **paylaşılan sırlardır** (siz ve site aynı dizgiyi bilirsiniz, dolayısıyla iki taraftan da çalınabilir) ve **yazılırlar** (dolayısıyla kimlik avına uğrayabilir ya da yeniden kullanılabilirler). Passkey ne paylaşılır ne de yazılır. Açık anahtarlı kriptografi üzerine kuruludur ve o "ikiye bölünmeyi" anladığınızda güvenlik avantajları apaçık ortaya çıkar.

## "Anahtar çifti" fikri, sade bir dille

Bir passkey oluşturduğunuzda cihazınız, matematiksel olarak birbirine bağlı bir **çift** anahtar üretir:

- Cihazınızdan asla çıkmayan, parmak izinizle, yüzünüzle ya da cihaz PIN'inizle korunan bir **özel anahtar** (telefon, dizüstü ya da güvenlik anahtarı).
- Web sitesine verilen bir **açık anahtar**.

Açık anahtar bir sır değildir — sizi taklit etmek için kullanılamaz. Oturum açmak için site bir meydan okuma gönderir; cihazınız eşleşen özel anahtara sahip olduğunu, *onu asla açığa çıkarmadan* kanıtlar. Ağ üzerinden hiçbir sır geçmez ve sunucuda yeniden kullanılabilir hiçbir şey saklanmaz.

## Bu, yaygın saldırıları neden yener

| Saldırı | Parolalara karşı | Passkey'lere karşı |
| --- | --- | --- |
| Veritabanı sızıntısı | (Karması alınmış) parolaları çalar | Yalnızca açık anahtarları çalar — saldırgan için yararsız |
| Kimlik avı | Sahte site yazdığınızı yakalar | Yazılacak bir şey yok; anahtar gerçek alan adına bağlı |
| Yeniden kullanım | Bir sızıntı birçok siteyi açar | Her passkey tasarımı gereği benzersiz ve siteye özeldir |
| Kimlik bilgisi doldurma | Toplu işler | Doldurulacak bir şey yok |

Kimlik avına direnç en büyük vaattir. Bir passkey gerçek web sitesinin kimliğine kriptografik olarak bağlıdır, dolayısıyla ona benzeyen bir alan adı onu kelimenin tam anlamıyla tetikleyemez — doğrulama uygulaması kodlarının bile açık bıraktığı boşluğu kapatır.

## Bugün nasıl kullanılır

Pratikte bir passkey genellikle **telefonunuzun kilidini açmak** gibi hissettirir: bir istem belirir, parmak izi ya da yüzle onaylarsınız, içeridesiniz — parola yok, kopyalanacak kod yok. Passkey'ler genellikle cihaz ekosisteminiz üzerinden eşitlenir (yeni bir telefon onları korur) ya da en yüksek güvence için bir donanım güvenlik anahtarında yaşar. Büyük platformlar ve büyük web siteleri genelinde benimsenme yaygın ve büyüyor olsa da geçişin ortasındayız: passkey sunan çoğu site hâlâ yedek olarak parolaları tutuyor.

## Sık sorulanlar

**Cihazımı kaybedersem ne olur?**
Eşitlenen passkey'ler, yeni bir cihazda platform hesabınız üzerinden (kendi güçlü güvenliğiyle korunan) kurtarılabilir. Cihaza bağlı anahtarlar için ikinci bir passkey kaydedin ya da bir yedek yöntem tutun — 2FA kurtarmayla aynı disiplin.

**Sızıntı yaşayan bir şirket passkey'imi sızdırabilir mi?**
Hayır — sunucu yalnızca açık anahtarınızı tutar; o bir sır değildir ve sizin olarak oturum açamaz. Parola veritabanlarına kıyasla yapısal avantaj tam da budur.

**Yine de bir parola yöneticisine ihtiyacım var mı?**
Şimdilik evet — passkey'ler kademeli olarak yayılıyor, dolayısıyla yıllarca karışık bir düzeniniz olacak. Birçok parola yöneticisi zaten passkey'leri de saklıyor ve her ikisi için birleşik bir kasa hâline geliyor.`,
  },
  {
    topicKey: 'phishing-scams',
    title: 'Kimlik Avı ve Çevrimiçi Dolandırıcılıkları Nasıl Tanırsın?',
    question: 'Bir kimlik avı e-postasını ya da dolandırıcılık mesajını, beni kandırmadan önce nasıl tanırım?',
    summary:
      'Kimlik avı, düşünmeden harekete geçmeniz için aciliyet üretir — sahte bir uyarı, fazla cazip bir teklif, "şimdi doğrula" bağlantısı. Savunma araç değil, alışkanlıktır: yavaşlayın, gerçek göndereni ve bağlantıyı denetleyin ve kimlik bilgilerinizi asla bir mesajdaki bağlantıdan girmeyin.',
    tags: ['güvenlik', 'kimlik avı', 'dolandırıcılık', 'dijital güvenlik'],
    language: 'tr',
    image: {
      prompt: promptOf('phishing-scams'),
      alt: 'Koruyucu bir halkada duran bir balığa yaklaşan, zarf kılığındaki olta',
    },
    sources: [
      { title: 'CISA — Kimlik avını tanı ve bildir', url: 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing' },
      { title: 'FTC — Kimlik avı dolandırıcılıklarını tanıma ve önleme', url: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams' },
    ],
    content: `# Kimlik Avı ve Çevrimiçi Dolandırıcılıkları Nasıl Tanırsın?

Kimlik avı, teknik bir kostüm giymiş bir güven oyunudur. Saldırgan şifrelemenizi kırmaz — güvendiğiniz birini taklit ederek ve yargı yerine duyguyla hareket ettiğiniz bir an tasarlayarak, *sizin* bir parolayı, bir kodu ya da parayı teslim etmenizi sağlar. İnsanın reflekslerini hedef aldığı için savunma da insanidir: oyunu güvenilir biçimde bozan birkaç alışkanlık. Bunların en yararlısı, üretilen duyguyu fark etmektir.

## Evrensel ipucu: üretilmiş aciliyet

Neredeyse her dolandırıcılık, beynin düşünen kısmı yetişmeden, *hızlı* hareket etmenizi gerektirir. Oynanan duygusal kollar kısa bir listedir:

- **Korku**: "Hesabınız askıya alınacak", "şüpheli giriş algılandı", "ödenmemiş vergi — hemen işlem yapın".
- **Açgözlülük**: "Kazandınız", "iadenizi talep edin", "haftalık ikiye katlayan yatırım".
- **Otorite**: bankanızdan, patronunuzdan, bir kargo şirketinden ya da devletten "gelen" bir mesaj.
- **Merak/yardımseverlik**: "Bu fotoğraftaki sen misin?", "küçük bir iyilik gerek".

Bir mesaj kalp atışınızı yükseltip sizi *hemen* tıklamaya, ödemeye ya da paylaşmaya itiyorsa, o baskının kendisi uyarı işaretidir — meşru kuruluşlar "önümüzdeki 10 dakika içinde yanıtla yoksa" mantığıyla çalışmaz.

## Somut denetimler

| Denetim | Neye bakmalı |
| --- | --- |
| **Gönderen adresi** | Üzerine gelin/genişletin — \`service@paypa1.com\` ≠ \`paypal.com\`. Görünen ad yalan söyler. |
| **Asıl bağlantı** | Üzerine gelin (tıklamayın), gerçek hedefi görün; ona benzeyen alan adlarına dikkat |
| **Genel hitap** | Adınızı bilen bir şirketten "Sayın müşterimiz" |
| **Beklenmedik ekler** | Beklemediğiniz fatura/makbuz — klasik bir zararlı yazılım teslimatı |
| **Sır isteme** | Gerçek kurumlar parolanızı, tam PIN'inizi ya da bir 2FA kodunu asla istemez |
| **Baskı + gizlilik** | "Kimseye söyleme", "acil havale", hediye kartıyla ödeme — hepsi dev birer kırmızı bayrak |

## Çoğu kaybı önleyen iki kural

1. **Bir mesajdaki bağlantı üzerinden asla oturum açmayın.** Bir e-posta hesabınızda sorun olduğunu söylüyorsa tıklamayın — yeni bir sekme açıp adresi kendiniz yazın (ya da yer iminizi/uygulamanızı kullanın). Bu tek alışkanlık çoğu kimlik bilgisi avını yener; çünkü sahte siteye hiç fırsat doğmaz.

2. **Para ya da sır içeren her şey için ağ dışı bir kanaldan doğrulayın.** Havale ya da hediye kartı isteyen "patron", "parayı güvenli bir hesaba taşı" diyen "banka", aniden başı derde giren bir akraba — durun ve *ayrı, bilinen* bir kanaldan teyit edin (mesajdaki numarayı değil, resmî numarayı arayın). Aciliyet artı olağandışı bir ödeme yöntemi, dolandırıcılığın imzasıdır.

## Sık sorulanlar

**Mesaj kusursuz görünüyor — logo, biçim, adım da var. Yine de şüphelenmeli miyim?**
Evet. İkna edici görseller kopyalamak çok kolaydır ve kişisel bilgiler sızıntılardan dışarı sızar. Ne kadar gösterişli göründüğüne değil, *isteğe* göre yargılayın (aciliyet, sırlar, ödeme) ve bağımsız olarak doğrulayın.

**Bir bağlantıya tıkladım / parolamı girdim. Şimdi ne olacak?**
Hızlı davranın: bilinen güvenli bir cihazdan o parolayı (ve yeniden kullanıldığı her yeri) değiştirin, 2FA'yı açın, yetkisiz etkinliğe dikkat edin ve gerçek kurumla iletişime geçin. Hız, hasarı sınırlar.

**Telefon görüşmeleri ve mesajlar da kimlik avı mı?**
Evet — "vishing" (ses) ve "smishing" (SMS) aynı oyun kitabını kullanır ve yapay zekâ ile ses klonlama görüşmeleri daha ikna edici kılar. Aynı kural geçerli: kapatın ve kendinizin bulduğu resmî bir numaradan geri arayın.`,
  },
  {
    topicKey: 'vpn-explained',
    title: 'Bir VPN Aslında Ne Yapar (ve Ne Yapmaz)',
    question: 'Bir VPN gerçekte neyi korur ve ona gerçekten ihtiyacım var mı?',
    summary:
      'VPN, trafiğinizi IP adresinizi gizleyen ve güvenilmeyen ağlarda sizi koruyan bir sunucuya şifreli olarak gönderir. Mutlak anonimlik ya da güvenlik değildir — HTTPS verinin çoğunu zaten korur ve VPN, güveni ortadan kaldırmak yerine VPN sağlayıcısına taşır.',
    tags: ['güvenlik', 'gizlilik', 'vpn', 'ağ'],
    language: 'tr',
    image: {
      prompt: promptOf('vpn-explained'),
      alt: 'Veri, uzak bir aktarıcıya dek kaynağını gizleyen kapalı bir tünelden geçer',
    },
    sources: [
      { title: 'EFF — Gözetime Karşı Öz Savunma: VPN’ler', url: 'https://ssd.eff.org/module/choosing-vpn-thats-right-you' },
      { title: 'CISA — güvenli bağlantılar üzerine kılavuz', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# Bir VPN Aslında Ne Yapar (ve Ne Yapmaz)

VPN (sanal özel ağ), cihazınızla VPN sağlayıcısının işlettiği bir sunucu arasında şifreli bir tünel kurar; trafiğiniz internete *oradan* çıkar ve sizinki yerine o sunucunun IP adresini taşır. Mekanizmanın tamamı budur — ve bundan hem gerçek faydalar hem de bir yığın pazarlama abartısı doğar. Anlaşılması en yararlı şey, bir VPN’in güveninizi **yeniden konumlandırdığıdır**; güven ihtiyacını ortadan kaldırmaz.

## Gerçekten yaptıkları

- **IP adresinizi gizler**: ziyaret ettiğiniz web siteleri eviniz ya da şehriniz yerine VPN sunucusunun konumunu görür. Bir tür takibi azaltmak ve ağ kimliğinizi ifşa etmemek için yararlıdır.
- **Yerel ağdaki trafiği şifreler**: kuşkulu bir genel WiFi’de — kafe, havalimanı ya da otel ağında (ve onu gözetleyen herkeste) — yalnızca şifreli bir tünel görünür, ne yaptığınız görünmez.
- **Etkinliğinizi internet sağlayıcınızdan gizler**: İSS bir VPN’e bağlandığınızı görür, ama hangi siteleri ziyaret ettiğinizi görmez.
- **Görünür konumunuzu değiştirir**: bu yüzden insanlar bölgesel kısıtlı içeriğe erişmek için kullanır (her hizmetin koşullarına tabi).

## Yapmadığı

Pazarlamanın fazla vaatte bulunduğu yer burası:

| Efsane | Gerçek |
| --- | --- |
| "VPN sizi anonim yapar" | Hiç de değil — girişler, çerezler, tarayıcı parmak izi ve hesaplar yine de sizi tanır |
| "VPN sizi virüslerden/saldırılardan korur" | Korumaz — o bir tüneldir; antivirüs ya da zararlı yazılıma karşı güvenlik duvarı değil |
| "VPN yaptığınız her şeyi şifreler" | Çoğu site zaten uçtan uca HTTPS şifrelidir; VPN esas olarak *yerel* sıçramayı korur |
| "VPN sizi herkesten gizler" | VPN sağlayıcınız trafiğinizi görebilir — güveni ona kaydırdınız |

Son nokta can alıcı olanı. VPN olmadan yerel ağınız ve İSS’niz bağlantılarınızı gözlemleyebilir. *VPN ile* o konumu VPN şirketi işgal eder — dolayısıyla bir VPN, ancak işletmecisi kadar güvenilirdir. Etkinliğinizi kaydedip satarak para kazanan ücretsiz bir VPN, hiç kullanmamaktan daha kötü olabilir.

## Ona ihtiyacınız var mı?

| Durum | Karar |
| --- | --- |
| Sık sık genel/güvenilmeyen WiFi’de | Makul — gerçek bir katman ekler (gerçi HTTPS çoğunu zaten kapsar) |
| Taramayı İSS’nizden gizlemek istiyorsunuz | Evet, bu temel bir kullanım |
| Bölgesel kısıtlı içeriğe erişim | Yaygın kullanım (hizmet koşullarına dikkat) |
| Gerçek anonimlik arıyorsunuz | Tek başına VPN bunu sağlamaz |
| Zaten yalnızca güvenilir ağlarda, HTTPS kullanarak | İsteğe bağlı — fayda reklamların ima ettiğinden küçük |

Kullanacaksanız, açık ve ideal olarak denetlenmiş bir kayıt tutmama (no-logs) politikasına sahip itibarlı bir ücretli sağlayıcı seçin — İSS’nizin eskiden gördüğü her şeyi ona emanet ediyorsunuz.

## Sık sorulanlar

**VPN, web sitelerinin beni takip etmesini durdurur mu?**
Yalnızca IP tabanlı kısmını. Çerezler, girişler ve tarayıcı parmak izi yine de sizi tanır. Takibe karşı koruma için VPN değil, tarayıcı ayarları/eklentileri gerekir.

**Ücretsiz bir VPN sorun değil mi?**
Temkinli olun — sunucu işletmek paraya mal olur ve bazı ücretsiz VPN’ler bunu verilerinizi kaydedip satarak çıkarır; amacın tam tersi. İtibarlı ücretsiz katmanlar vardır, ama gizlilik politikasını okuyun.

**Siteler HTTPS kullanıyorsa VPN’e ihtiyacım var mı?**
HTTPS trafiğinizin içeriğini zaten uçtan uca şifreler. VPN, IP gizleme ekler ve yerel ağdaki meta verileri korur, ama HTTPS’deyken bu, reklamların ima ettiğinden daha küçük bir yükseltmedir.`,
  },
  {
    topicKey: 'end-to-end-encryption',
    title: 'Uçtan Uca Şifreleme Nedir?',
    question: 'Uçtan uca şifreleme ne anlama gelir ve mesajlaşma için neden önemlidir?',
    summary:
      'Uçtan uca şifreleme bir mesajı yalnızca gönderen ve alıcı okuyabilecek şekilde kilitler — ne ağ, ne de hizmeti işleten şirket. Mühürlü bir mektup ile aktarımdaki herkesin okuyabileceği bir kartpostal arasındaki farktır.',
    tags: ['güvenlik', 'gizlilik', 'şifreleme', 'mesajlaşma'],
    language: 'tr',
    image: {
      prompt: promptOf('end-to-end-encryption'),
      alt: 'Aktarımda okunamayan, yalnızca karşı cihaza varınca açılan mühürlü mesaj',
    },
    sources: [
      { title: 'EFF — Gözetime Karşı Öz Savunma: Şifreleme nedir?', url: 'https://ssd.eff.org/module/what-encryption' },
      { title: 'NIST — Kriptografik standartlar ve kılavuzlar', url: 'https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines' },
    ],
    content: `# Uçtan Uca Şifreleme Nedir?

Uçtan uca şifreleme (E2EE), bir mesajın gönderenin cihazında karıştırılıp yalnızca alıcının cihazında çözülebilmesi demektir — dolayısıyla aradaki hiçbir noktada başka biri onu okuyamaz. Kritik olan, "başka biri"nin hizmeti işleten şirketi de kapsamasıdır. Klasik benzetme: normal bir mesaj, yoldaki her görevlinin okuyabildiği bir **kartpostaldır**; uçtan uca şifreli bir mesaj ise yalnızca alıcının açabildiği **mühürlü bir mektuptur**. Fark, konuşmalarınızı kimin okumamaya *söz verdiği* değil, kimin *okuyabildiğidir*.

## Asıl önemli olan ayrım

Çoğu çevrimiçi hizmet verileri "aktarımda" (sizinle sunucuları arasında) ve "beklemede" (depolamalarında) şifreler. Bu iyidir, ama her iki durumda da **şirket içeriğinizi yine de okuyabilir** — anahtarlar onların elindedir. Uçtan uca şifreleme daha güçlüdür: anahtarları yalnızca uçlar tutar, dolayısıyla sağlayıcı isteseydi, saldırıya uğrasaydı ya da teslim etmesi emredilseydi bile mesajlarınızı yapısal olarak okuyamaz.

| | Aktarım/bekleme şifrelemesi | Uçtan uca şifreleme |
| --- | --- | --- |
| Dış gözetlemeye karşı korunur | Evet | Evet |
| Hizmet sağlayıcı içeriği okuyabilir | **Evet** | **Hayır** |
| Sağlayıcı veri sızıntısında ifşa olur | Olabilir | İçerik okunamaz kalır |
| Yasal talep üzerine teslim edilir | Mümkün | Sağlayıcının verecek okunabilir bir şeyi yoktur |

## Kısaca nasıl çalışır

E2EE, passkey’lerin ve HTTPS’in arkasındaki aynı açık anahtar fikrini kullanır. Her kullanıcının bir açık anahtarı (özgürce paylaşılan) ve bir özel anahtarı (asla paylaşılmayan) vardır. Size mesaj göndermek için gönderen *sizin* açık anahtarınızla şifreler; yalnızca *sizin* özel anahtarınız çözebilir. Anahtarlar sunucuda değil cihazlarda yaşar — sunucunun içeriği okuyamamasının nedeni tam da budur. İyi mesajlaşma uygulamaları "ileri gizlilik (forward secrecy)" ekler ve anahtarları döndürür; böylece gelecekte bir anahtarın ele geçirilmesi bile geçmiş mesajları açamaz.

## Nerede ona güvenirsiniz

- **Mesajlaşma**: kimi uygulamalar varsayılan olarak uçtan uca şifrelidir; kimileri yalnızca isteğe bağlı bir kipte, kimileri ise hiç değildir. Gizlilik önemliyse hangisi olduğunu kontrol edin.
- **Aramalar**: birçok sesli/görüntülü uygulama artık E2EE sunuyor.
- **Yedekler ve bulutlar**: ince bir boşluk — bir sohbet E2EE olabilir ama *bulut yedeği* olmayabilir, mesajları sessizce yeniden okunabilir kılar. Yedek ayarlarını kontrol edin.
- **Web**: HTTPS, tarayıcınızla web sitesi arasında uçtan ucadır (gerçi web sitesinin kendisi bir uç olarak ona gönderdiğinizi okur).

## Sık sorulanlar

**Şirket bile okuyamıyorsa, kim okuyabilir?**
Yalnızca her uçta cihazları elinde tutan kişiler. Bu da *cihaz* güvenliğinin önemli olduğu anlamına gelir — E2EE aktarımdaki mesajları korur, birinin kilidini açtığı bir telefonu değil. Ayrıca meta veri (kiminle, ne zaman konuştuğunuz) içerik okunamadığında bile görünür olabilir.

**E2EE suçlulara mı yarar?**
Bankacılığınızı, sağlık kayıtlarınızı, gazetecileri ve sıradan özel konuşmaları koruyan aynı şifrelemedir — genel amaçlı bir korumadır. Ana akım güvenlik fikir birliği şudur: onu herkes için zayıflatmak (bir "arka kapı" açmak) herkesi daha güvensiz kılar; çünkü bir arka kapı yalnızca "iyilerle" sınırlanamaz.

**Bir uygulamanın gerçekten bunu kullandığını nasıl anlarım?**
Açıkça "uçtan uca şifreli" ibaresini arayın (yalnızca "şifreli" değil), iyi incelenmiş açık protokoller kullanan uygulamaları tercih edin ve bunun varsayılan olarak mı yoksa yalnızca özel bir kipte mi açık olduğunu kontrol edin.`,
  },
  {
    topicKey: 'public-wifi-safety',
    title: 'Genel WiFi Gerçekten Tehlikeli mi?',
    question: 'Kafelerde ve havalimanlarında genel WiFi kullanmak güvenli mi ve neden kaçınmalıyım?',
    summary:
      'Genel WiFi eskiye göre çok daha güvenli, çünkü artık neredeyse tüm web siteleri HTTPS kullanıyor ve bu, ağ ne olursa olsun verilerinizi şifreliyor. Geriye kalan asıl riskler sahte erişim noktaları ve şifresiz bağlantılar — birkaç alışkanlıkla yönetilebilir.',
    tags: ['güvenlik', 'gizlilik', 'wifi', 'dijital güvenlik'],
    language: 'tr',
    image: {
      prompt: promptOf('public-wifi-safety'),
      alt: 'Önceden mühürlenmiş veriyi genel WiFi’den gönderen dizüstü, yanında pusuda sahte erişim noktası',
    },
    sources: [
      { title: 'FTC — Genel WiFi ağları güvenli mi?', url: 'https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-not-always' },
      { title: 'EFF — HTTPS ve Gözetime Karşı Öz Savunma', url: 'https://ssd.eff.org/module/what-should-i-know-about-encryption' },
    ],
    content: `# Genel WiFi Gerçekten Tehlikeli mi?

Genel WiFi’nin korkutucu ününün büyük kısmı artık **modası geçmiş** durumda. Eski uyarılar, web sitelerinin verileri açık metin gönderdiği bir dönemden geliyor; o zamanlar aynı kafe ağındaki herkes parolanızı havadan "koklayabiliyordu". O dönem büyük ölçüde bitti: bugün web sitelerinin ezici çoğunluğu **HTTPS** kullanıyor ve bu, bağlantınızı tarayıcınızla site arasında uçtan uca şifreliyor — güvenilir olsun olmasın, hangi ağda olursanız olun. Adres çubuğunuzdaki o kilit, nefes nefese uyarıların VPN’e mal ettiği koruyucu işin çoğunu yapıyor.

## HTTPS tabloyu neden değiştirdi

Bir HTTPS sitesine bağlandığınızda trafiğiniz cihazınızdan *çıkmadan önce* şifrelenir, dolayısıyla aynı WiFi’deki bir gözetleyici yalnızca karmakarışık veri ve hangi siteyi ziyaret ettiğinizi görür — parolanızı, mesajlarınızı ya da kart numaranızı değil. Modern tarayıcılar artık HTTPS olmayan siteleri "Güvenli Değil" diye işaretlediği ve web’in çoğu taşındığı için, klasik "parola kafede çalındı" saldırısı eskiye göre çok daha zor.

## Geriye kalan riskler

Yine de genel WiFi *sıfır* risk değil — asıl tehditler biçim değiştirdi:

| Risk | Nedir | Savunma |
| --- | --- | --- |
| **İkiz kötü niyetli erişim noktası** | "Airport_Free_WiFi" adlı, bir saldırganın işlettiği sahte ağ | Gerçek ağ adını doğrulayın; bilinmeyenlere otomatik katılmayın |
| **HTTPS olmayan siteler** | Hâlâ açık metin gönderen seyrek site | "Güvenli Değil" uyarısına dikkat; orada sır girmeyin |
| **Omuz üstü gözetleme** | Birinin ekranınızı izlemesi | Gizlilik ekranı, farkındalık |
| **Güncel olmayan cihaz** | Paylaşılan ağda istismar edilebilen yamasız hatalar | İşletim sistemini ve uygulamaları güncel tutun |
| **Otomatik bağlanma** | Telefonun, aynı adlı kötü niyetli bir ağa sessizce katılması | Açık ağlar için otomatik katılmayı kapatın |

En büyük risk **ikiz erişim noktasıdır**: dostça bir adı olan kötü niyetli bir erişim noktası. Ona bağlanırsanız saldırgan ağ yolunuzu kontrol eder — ama o zaman bile HTTPS, şifreli oturumlarınızı okunamaz tutar; tehlike esas olarak HTTPS olmayan trafikten ve sahte oturum açma sayfalarına çekilmekten gelir.

## Paranoyaya kapılmadan makul alışkanlıklar

- **HTTPS kilidine güvenin** ve genel WiFi’de bir sertifika uyarısını asla atlamayın — o uyarı, tam olarak bir şeylerin ters gittiği andır.
- **Ağ adını** tahmin etmek yerine personelle doğrulayın; bir markayı taklit eden açık ağlardan şüphelenin.
- **Açık ağlara otomatik bağlanmayı kapatın** ki cihazlarınız sessizce ona benzeyenlere yeniden katılmasın.
- **VPN bir katman ekler**: meta verileri ve HTTPS olmayan her trafiği de şifreleyerek — güvenilmeyen ağlarda makul bir ekstra, ama HTTPS göz önüne alındığında reklamların ima ettiği gibi bir zorunluluk değil.
- **Cihazları güncel tutun**; kalan ağ saldırılarının çoğu bilinen ve hâlihazırda yamalanmış hataları hedefler.

## Sık sorulanlar

**Birisi kafe WiFi’sinde banka parolamı çalabilir mi?**
Bankanız HTTPS kullanıyorsa (kullanıyor) ve bir sertifika uyarısını yok saymadıysanız ya da sahte bir oturum açma sayfasına düşmediyseniz, kimlik bilgileriniz hat üzerinde şifrelidir. Asıl tehlike koklama değil, kimlik avıdır.

**Genel WiFi için gerçekten VPN’e ihtiyacım var mı?**
Makul bir ekstra katmandır, ama HTTPS trafiğinizin içeriğini zaten korur. VPN esas olarak HTTPS olmayan trafikte ve hangi siteleri ziyaret ettiğinizi yerel ağdan gizlemekte yardımcı olur.

**Telefonumun mobil verisi genel WiFi’den daha mı güvenli?**
Genellikle evet — hücresel ağ şifrelidir ve yabancılarla bir yerel ağı paylaşmazsınız. Bilinmeyen bir ağda hassas işler için mobil veriye geçmek basit ve sağlam bir seçimdir.`,
  },
  {
    topicKey: 'online-tracking',
    title: 'Çevrimiçi Takip Nasıl Çalışır? (Çerezler, Pikseller ve Parmak İzleri)',
    question: 'Şirketler beni web genelinde nasıl takip ediyor ve bunu gerçekten durdurabilir miyim?',
    summary:
      'Takipçiler sizi çerezler, görünmez takip pikselleri ve tarayıcı parmak iziyle izleyerek siteler arası bir profil oluşturur. Görünmez olamazsınız, ama birkaç tarayıcı tercihi toplanan miktarı çarpıcı biçimde azaltır.',
    tags: ['gizlilik', 'takip', 'çerezler', 'web'],
    language: 'tr',
    image: {
      prompt: promptOf('online-tracking'),
      alt: 'Uzaktaki merceklerin birleştirdiği, bir pelerinle kısmen dağıtılan ayak izleri bırakan figür',
    },
    sources: [
      { title: 'EFF — Cover Your Tracks (tarayıcı parmak izi testi)', url: 'https://coveryourtracks.eff.org/' },
      { title: 'FTC — Gizliliğinizi çevrimiçi koruma', url: 'https://consumer.ftc.gov/articles/protecting-your-privacy-online' },
    ],
    content: `# Çevrimiçi Takip Nasıl Çalışır? (Çerezler, Pikseller ve Parmak İzleri)

"Ücretsiz" web’in büyük kısmı reklamlarla finanse edilir ve hedefli reklamcılık, kim olduğunuzu ve ne yaptığınızı bilmeye dayanır. Bu yüzden sizi siteden siteye izleyip etkinliğinizi bir profilde birleştiren koca bir sektör vardır. Üç ana teknikle çalışır; her biri bir öncekinden daha kaygan — ve onları anlamak, savunmaları anlamlı kılan şeydir.

## Üç ana teknik

**1. Çerezler.** Çerez, bir sitenin tarayıcınızda sakladığı küçük bir dosyadır. *Birinci taraf* çerezler çoğunlukla zararsız, hatta yararlıdır — sizi oturumda tutar, sepetinizi hatırlar. Sorun *üçüncü taraf* çerezlerdir: birçok farklı site aynı reklam ağının içeriğini gömdüğünde, o ağ her yerde tanıdığı bir çerez bırakır ve aynı tarayıcının önce A’yı, sonra B’yi, sonra C’yi ziyaret ettiğini görür. Bu siteler arası iz, klasik takip mekanizmasıdır (ve tarayıcıların şimdi etkin biçimde aşamalı olarak kaldırdığıdır).

**2. Takip pikselleri.** Bir takipçinin sunucusundan yüklenen, görünmez bir 1×1 görsel (ya da bir kod parçası). Onu sadece yüklemek — bir web sayfasında *ya da bir e-postada* — takipçiye açtığınızı, ne zaman açtığınızı ve cihazınızla ilgili ayrıntıları bildirir. Pazarlamacılar, hiçbir çerez olmadan e-postalarını açtığınızı ya da bir sayfayı ziyaret ettiğinizi böyle bilir.

**3. Tarayıcı parmak izi.** En sinsisi. Cihazınızda hiçbir şey saklamak yerine, cihazınızın benzersiz özellik bileşimini *ölçer* — ekran boyutu, yazı tipleri, işletim sistemi, tarayıcı sürümü, saat dilimi, grafik tuhaflıkları — bunlar bir araya geldiğinde çoğu zaman sizi yeniden tanımaya yetecek kadar benzersizdir. Hiçbir şey saklamadığı için çerezleri temizlemek onu silmez.

| Teknik | Bir şey saklar mı? | Çerez temizlemekle yenilir mi? |
| --- | --- | --- |
| Üçüncü taraf çerezler | Evet | Evet |
| Takip pikselleri | Çerez/sunucu günlüklerini kullanır | Kısmen |
| Parmak izi | Hayır | **Hayır** |

## Takibi gerçekten ne azaltır

Görünmez olamazsınız, ama maruziyetinizi epeyce küçültebilirsiniz:

- **Gizliliğe saygılı bir tarayıcı kullanın ya da takip korumasını açın** — modern tarayıcılar üçüncü taraf çerezleri ve bilinen takipçileri varsayılan olarak ya da tek bir ayarla engeller.
- **İtibarlı bir içerik/reklam engelleyici ekleyin** — takip betiklerini ve pikselleri yüklenmeden engeller, bu da sayfaları hızlandırır.
- **E-postada uzak görselleri engelleyin** ki açılma takip piksellerini boşa çıkarsın (çoğu posta uygulaması bunu sunar).
- **Parmak izine direnin**: parmak izinizi standartlaştıran ya da rastgeleleştiren tarayıcılarla; durdurulması en zor takip budur, bu yüzden tarayıcınızı kimin yaptığı önemlidir.
- **Profili kaynağında küçültün**: hesap ayarlarınızda reklam kişiselleştirmesini sınırlayın ve etkinliği gerçek bir kimliğe bağlayan girişlerde tutumlu olun.

## Sık sorulanlar

**Şu "Çerezleri kabul et" başlıkları beni gerçekten koruyor mu?**
Onlar koruma değil, onam istemleridir (gizlilik yasalarınca yönlendirilir). "Zorunlu olmayanları reddet" yardımcı olur, ama gerçek azalma başlıklara tıklamaktan değil, tarayıcı ayarlarından ve engelleyicilerden gelir.

**Gizli/incognito kipi takibi durdurur mu?**
Çoğunlukla hayır. *Tarayıcınızın* oturumdan sonra yerel geçmişi ve çerezleri kaydetmesini önler, ama siteler, takipçiler ve ağınız oturum sırasında sizi yine gözlemleyebilir ve parmak izi yine çalışır.

**Parmak izi gerçekten durdurulamaz mı?**
Durdurulamaz değil, ama zor — savunma, herkesin parmak izini kasıtlı olarak birbirine benzeten bir tarayıcı kullanmaktır (böylece sizinki sırıtmaz). Kendinizinkini EFF’in Cover Your Tracks aracında test edin.`,
  },
  {
    topicKey: 'data-breach-response',
    title: 'Verileriniz Bir Sızıntıda Yer Aldığında Ne Yapmalı?',
    question: 'Kullandığım bir şirkette veri sızıntısı oldu — bununla ilgili gerçekte ne yapmalıyım?',
    summary:
      'Bir sızıntı verilerinizi açığa çıkardığında öncelik yeniden kullanımı sınırlamaktır: o parolayı kullanıldığı her yerde değiştirin, iki adımlı doğrulamayı açın ve ardından gelecek kimlik avına dikkat edin. Ne yapacağınız neyin sızdığına bağlıdır — bir parola, bir kart ya da kimlik bilgileriniz.',
    tags: ['güvenlik', 'gizlilik', 'veri sızıntısı', 'dijital güvenlik'],
    language: 'tr',
    image: {
      prompt: promptOf('data-breach-response'),
      alt: 'Küçük bir kasa sızıntısının çevredeki kasalarda yöntemlice sınırlandırılması',
    },
    sources: [
      { title: 'FTC — Veri sızıntısı: ne yapmalı', url: 'https://www.identitytheft.gov/databreach' },
      { title: 'Have I Been Pwned — hesaplarınızın sızıntılarda yer alıp almadığını kontrol edin', url: 'https://haveibeenpwned.com/' },
    ],
    content: `# Verileriniz Bir Sızıntıda Yer Aldığında Ne Yapmalı?

Veri sızıntıları artık sıradan — internette yıllardır bulunuyorsanız, bilgileriniz neredeyse kesinlikle bir sızıntıda yer almıştır. Bu kulağa alarm verici gelse de çoğu sızıntı, sakin ve hedefli bir yanıtla atlatılabilir. Anahtar, eyleminizi **gerçekte neyin sızdığına** uydurmaktır; çünkü sızdırılmış bir parola, sızdırılmış bir kart numarası ve sızdırılmış kimlik bilgileri farklı hamleler gerektirir. Panik ve hareketsizlik iki başarısızlık biçimidir; kısa bir kontrol listesi her ikisini de yener.

## Önce: neyin açığa çıktığını saptayın

Sızıntı bildirimleri (ve onları izleyen hizmetler) genellikle hangi verilerin söz konusu olduğunu söyler. Kabaca önem sıralaması:

| Sızan | Önem | Neden |
| --- | --- | --- |
| Yalnızca e-posta adresi | Düşük | Çoğunlukla daha çok spam/kimlik avı demek |
| Parola (karması alınmış bile olsa) | Yüksek | Yeniden kullanım, birçok hesabın riskte olması demek |
| Ödeme kartı | Orta | Bankalar dolandırıcılığı geri alır; kartlar değiştirilebilir |
| Kimlik bilgileri (kimlik no, doğum tarihi, adres) | Yüksek | Kimlik hırsızlığına olanak tanır; "sıfırlanamaz" |

## Sızan içeriğe göre yanıt

**Bir parola sızdıysa** (en yaygın acil durum):
1. **Sızdırılan sitede hemen değiştirin.**
2. **Onu yeniden kullandığınız her yerde değiştirin** — asıl tehlike budur; çünkü saldırganlar o "e-posta-parola" çiftini bankalarda, e-postada ve mağazalarda deneyecektir (kimlik bilgisi doldurma). Bir parola yöneticisi bunu çok daha az acı verici kılar ve bir sonrakini önler.
3. **O hesapta ve önemli hesaplarınızda iki adımlı doğrulamayı açın.**

**Bir ödeme kartı sızdıysa:** ekstrelerinizi izleyin, tanımadığınız her harcamayı bildirin (bankalar genellikle dolandırıcılığı geri alır) ve gerekirse bankanın kartı yeniden çıkarmasına izin verin. Bu, en kolay toparlanan sızıntı türüdür.

**Kimlik bilgileri sızdıysa** (en zoru, çünkü doğum tarihinizi değiştiremezsiniz): mümkün olan yerlerde kredi büroları aracılığıyla bir kredi dondurma / dolandırıcılık uyarısı düşünün, adınıza açılan hesaplara dikkat edin ve gerçek bilgilerinize atıfta bulunan iletişimlere karşı fazladan şüpheci olun.

## Sonra: ikinci dalgaya hazırlanın

Hafife alınan ardıl risk **hedefli kimlik avıdır**. Bir sızıntıdan sonra suçlular hangi şirketi kullandığınızı ve gerçek bilgilerinizin bir kısmını bilir, bu yüzden ikna edici "[Şirket] güvenlik uyarısı — hesabınızı doğrulayın" mesajları gönderirler. Geleceğini bekleyin ve her zamanki kuralı uygulayın: bir mesajdaki bağlantı üzerinden asla oturum açmayın — doğrudan siteye gidin. Bir sızıntı sizi bir süreliğine işaretli bir hedef yapar.

## Sık sorulanlar

**Bir sızıntıda olup olmadığımı nasıl bilirim?**
Şirketler çoğu zaman sizi bilgilendirmekle yasal olarak yükümlüdür, ama e-postanız için itibarlı bir sızıntı sorgulama hizmetini (Have I Been Pwned gibi) kontrol etmeye ve parola yöneticinizin sızıntı uyarılarını açmaya değer.

**Sızıntı yıllar önceydi — yine de harekete geçmeli miyim?**
O parolayı o zamandan beri benzersiz yaptıysanız ve 2FA’yı açtıysanız büyük ölçüde korunuyorsunuz. O parolayı bir yerde *hâlâ* yeniden kullanıyorsanız, şimdi değiştirin — sızdırılmış eski parolalar yıllarca denenir.

**Kimlik koruma hizmetlerine para vermeli miyim?**
Çoğu zaman temel korumalar (kredi dondurma, kendi ekstrelerinizi izleme, benzersiz parolalar + 2FA) ücretsizdir ve işin çoğunu yapar. Ücretli hizmetler kolaylık ekleyebilir, ama temel işlerin yerini tutmaz.`,
  },
];
