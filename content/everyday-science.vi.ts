import type { DraftArticle } from './types';
import { everydayScienceEn } from './everyday-science.en';

// Batch: Everyday Science (bản tiếng Việt bản địa). Cùng chủ đề và cùng
// topicKey với everyday-science.en.ts, nội dung được viết bản địa cho người
// đọc tiếng Việt. Ảnh minh họa dùng chung.

const promptOf = (key: string): string => {
  const hit = everydayScienceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const everydayScienceVi: DraftArticle[] = [
  {
    topicKey: 'why-sky-is-blue',
    title: 'Vì sao bầu trời có màu xanh?',
    question: 'Vì sao ban ngày bầu trời màu xanh, còn lúc hoàng hôn lại chuyển sang đỏ?',
    summary:
      'Ánh nắng vốn màu trắng — là hỗn hợp của mọi màu — nhưng không khí tán xạ ánh sáng xanh bước sóng ngắn mạnh hơn nhiều so với đỏ, nhuộm cả bầu trời thành xanh. Lúc hoàng hôn, ánh sáng đi qua lớp khí dày hơn, xanh bị tán xạ hết, chỉ còn đỏ và cam đến mắt bạn.',
    tags: ['khoa học', 'vật lý', 'ánh sáng', 'thiên nhiên'],
    language: 'vi',
    image: { prompt: promptOf('why-sky-is-blue'), alt: 'Ánh sáng trắng đi qua bầu khí quyển thủy tinh và tia xanh tán xạ ra mọi hướng' },
    sources: [
      { title: 'NASA Science — Vì sao bầu trời có màu xanh?', url: 'https://spaceplace.nasa.gov/blue-sky/en/' },
      { title: 'NOAA — Tán xạ ánh sáng và quang học khí quyển', url: 'https://www.noaa.gov/' },
    ],
    content: `# Vì sao bầu trời có màu xanh?

Bầu trời màu xanh là kết quả của một cuộc giằng co giữa ánh nắng và không khí. Ánh nắng trông trắng, nhưng thực ra là sự pha trộn của mọi màu trong cầu vồng. Khi luồng sáng ấy đổ xuyên qua khí quyển, các phân tử khí trong không khí **tán xạ** nó — hất nó đi theo những hướng mới — và đây là điều mấu chốt: chúng tán xạ ánh sáng xanh bước sóng ngắn mạnh hơn nhiều so với ánh sáng đỏ bước sóng dài. Thế là ánh sáng xanh bị văng ra khắp bầu trời, và khi bạn ngước lên, màu xanh ập đến từ mọi phía. Cả vòm trời rực lên màu xanh.

## Phần vật lý, nói nhẹ nhàng

Ánh sáng lan truyền dưới dạng sóng, và các màu khác nhau ở **bước sóng**: ánh sáng đỏ có sóng dài, còn xanh lam và tím có sóng ngắn. Khi ánh sáng va vào thứ gì đó nhỏ hơn nhiều so với bước sóng của nó — như một phân tử nitơ hay oxy đơn lẻ — nó tán xạ theo cách thiên mạnh về các bước sóng ngắn nhất. Hiệu ứng này (mang tên Rayleigh, theo tên nhà vật lý đã giải thích nó) rất rõ rệt: ánh sáng xanh tán xạ mạnh gấp nhiều lần ánh sáng đỏ. Bầu trời về cơ bản chính là ánh sáng xanh đã bị nảy đi nảy lại vô số lần trong khí quyển trước khi đến mắt bạn.

## Hai câu hỏi nối tiếp rất tự nhiên

**Nếu xanh tán xạ mạnh nhất, sao bầu trời không phải màu tím?** Tím có bước sóng còn ngắn hơn và tán xạ còn mạnh hơn — nhưng trong ánh nắng vốn đã có ít tím hơn, và mắt bạn lại nhạy với xanh hơn với tím. Hỗn hợp mà não bạn cảm nhận rốt cuộc rơi vào màu xanh.

**Thế sao bản thân mặt trời lại hơi vàng?** Vì màu xanh đã bị tán xạ *ra khỏi* chùm sáng trực tiếp. Ánh sáng đi thẳng từ mặt trời đã để mất một phần màu xanh cho bầu trời, khiến đĩa mặt trời trông vàng trắng.

## Vì sao hoàng hôn chuyển đỏ

Lúc hoàng hôn, mặt trời xuống thấp, nên ánh sáng của nó phải lướt qua một **lớp khí quyển dày hơn nhiều** mới tới được bạn. Trên quãng đường dài ấy, gần như toàn bộ màu xanh (và phần lớn màu lục) bị tán xạ ra khỏi chùm sáng trước khi đến nơi. Thứ còn lại đến được mắt bạn là các bước sóng dài — đỏ và cam — đó là lý do vì sao mặt trời lặn và những đám mây quanh nó bừng lên những sắc ấm. Chính sự tán xạ làm trời ban trưa xanh cũng làm hoàng hôn đỏ; chỉ có độ dài quãng đường là thay đổi.

## Câu hỏi thường gặp

**Vì sao bầu trời trong vũ trụ lại đen?**
Vì không có không khí để tán xạ ánh nắng. Phi hành gia thấy mặt trời và các ngôi sao in trên nền đen tuyền, ngay cả giữa ban ngày — không khí quyển, không màu xanh.

**Điều này có giải thích vì sao đại dương màu xanh không?**
Một phần khác. Màu xanh của bầu trời phản chiếu trên mặt nước, nhưng nước sâu cũng tự *hấp thụ* ánh sáng đỏ và tán xạ ánh sáng xanh, nên đại dương xanh vì nhiều lý do chồng lên nhau.

**Vì sao mây màu trắng, chứ không phải xanh?**
Giọt nước trong mây lớn hơn nhiều so với phân tử không khí, nên chúng tán xạ *mọi* màu gần như đều nhau. Mọi màu trộn lại với nhau trông thành màu trắng.`,
  },
  {
    topicKey: 'how-vaccines-work',
    title: 'Vắc-xin thực sự hoạt động như thế nào?',
    question: 'Vắc-xin huấn luyện hệ miễn dịch bảo vệ chúng ta bằng cách nào?',
    summary:
      'Vắc-xin cho hệ miễn dịch của bạn xem trước một "bản nháp" vô hại của mầm bệnh để nó học cách nhận diện từ sớm. Sau đó nó tạo ra các tế bào nhớ ghi nhớ mối đe dọa trong nhiều năm, nên khi nhiễm bệnh thật sẽ bị đánh bại nhanh — thường trước khi bạn kịp thấy ốm.',
    tags: ['khoa học', 'sinh học', 'hệ miễn dịch', 'sức khỏe'],
    language: 'vi',
    image: { prompt: promptOf('how-vaccines-work'), alt: 'Các tế bào miễn dịch canh gác nghiên cứu bản sao vô hại của mầm bệnh và lưu lại huy hiệu ký ức' },
    sources: [
      { title: 'CDC (Trung tâm Kiểm soát Bệnh tật Hoa Kỳ) — Hiểu về cách vắc-xin hoạt động', url: 'https://www.cdc.gov/vaccines/hcp/conversations/understanding-vacc-work.html' },
      { title: 'WHO (Tổ chức Y tế Thế giới) — Vắc-xin hoạt động như thế nào?', url: 'https://www.who.int/news-room/feature-stories/detail/how-do-vaccines-work' },
    ],
    content: `# Vắc-xin thực sự hoạt động như thế nào?

Vắc-xin hoạt động bằng cách **dạy hệ miễn dịch của bạn nhận ra một mầm bệnh trước khi bạn thật sự gặp mầm bệnh thật.** Hệ miễn dịch của bạn vốn đã rất giỏi chống nhiễm trùng — nhưng lần đầu gặp một mầm bệnh mới, nó chậm chạp, vừa học vừa làm trong khi bạn phát bệnh. Vắc-xin bỏ qua bài học đầu tiên đầy nguy hiểm ấy: nó cho cơ thể bạn xem trước mối đe dọa một cách an toàn, để nếu mầm bệnh thật xuất hiện, hệ phòng thủ của bạn đã biết chính xác phải làm gì và đè bẹp nó thật nhanh.

## Trong "bản xem trước" thực ra có gì

Vắc-xin chứa một thứ mà với hệ miễn dịch của bạn thì *trông giống* một mầm bệnh cụ thể nhưng **không thể làm bạn ốm.** Tùy loại vắc-xin, thứ đó có thể là:

- Phiên bản đã làm yếu hoặc bất hoạt của mầm bệnh,
- Chỉ một mảnh vô hại của nó (một protein bề mặt), hoặc
- Một bản chỉ dẫn (như mRNA) bảo chính các tế bào của bạn tạm thời tạo ra một mảnh vô hại của mầm bệnh để hệ miễn dịch nghiên cứu.

Trong mọi trường hợp, nguyên lý đều giống hệt nhau: trình cho hệ miễn dịch "hình dạng" nhận diện được của mầm bệnh (một kháng nguyên) mà không kèm theo mối nguy.

## Nhận diện, đáp ứng, ghi nhớ

Khi hệ miễn dịch nhìn thấy kháng nguyên này, nó làm ba việc:

1. **Nhận diện** nó là vật lạ.
2. **Đáp ứng** bằng cách tạo ra kháng thể — những protein được "may đo" để bám chặt vào đúng mầm bệnh đó — và kích hoạt các tế bào tiêu diệt những tế bào đã nhiễm.
3. **Ghi nhớ** nó, bằng cách tạo ra các **tế bào nhớ** sống lâu.

Bước thứ ba mới là toàn bộ trọng tâm. Những tế bào nhớ này có thể tồn tại nhiều năm hoặc nhiều thập kỷ. Nếu mầm bệnh thật xâm nhập, chúng nhận ra ngay lập tức và kích hoạt một phản ứng nhanh, mạnh mẽ — thường đánh bại sự nhiễm trùng trước khi bạn nhận thấy bất kỳ triệu chứng nào. Bạn có được miễn dịch mà không phải sống sót qua căn bệnh trước.

## Vì sao đôi khi cần hơn một liều, và vì sao đau tay là chuyện bình thường

Một số vắc-xin cần nhiều liều hoặc mũi tăng cường vì trí nhớ miễn dịch có thể được xây mạnh hơn nhờ tiếp xúc lặp lại, hoặc có thể phai theo thời gian và cần bổ sung. Còn cảm giác đau nhẹ, mệt mỏi hay sốt nhẹ mà một số người thấy sau đó không phải là mầm bệnh — đó là hệ miễn dịch của bạn *đang làm việc*, dồn sức đáp ứng với bản xem trước. Có phản ứng là dấu hiệu việc huấn luyện đang hiệu quả, chứ không phải bạn bị bệnh.

## Câu hỏi thường gặp

**Vắc-xin có thể gây cho tôi chính căn bệnh mà nó phòng ngừa không?**
Vắc-xin tiêu chuẩn không thể gây bệnh — chúng không chứa mầm bệnh sống, còn khả năng gây bệnh (hoặc chỉ chứa dạng đã làm yếu, không thể gây bệnh ở người khỏe mạnh). Thứ bạn có thể cảm thấy là phản ứng miễn dịch, không phải sự nhiễm trùng.

**"Miễn dịch cộng đồng" là gì?**
Khi đủ nhiều người trong một cộng đồng có miễn dịch, mầm bệnh khó tìm được vật chủ mới để lây lan, từ đó gián tiếp bảo vệ những người không thể tiêm chủng (trẻ sơ sinh, người mắc một số bệnh). Sự bảo vệ trở thành tập thể.

**Vì sao một số vắc-xin có tác dụng cả đời, số khác lại cần tiêm nhắc?**
Điều đó tùy vào mầm bệnh và độ bền của phản ứng ghi nhớ, cũng như việc mầm bệnh có biến đổi (như cúm) đủ nhiều khiến bài huấn luyện năm ngoái không còn khớp với phiên bản năm nay hay không. Có những mối đe dọa ổn định; số khác cứ liên tục thay đổi.`,
  },
  {
    topicKey: 'why-seasons-happen',
    title: 'Bốn mùa thực sự từ đâu mà có?',
    question: 'Điều gì tạo ra các mùa — mùa hè có phải vì Trái Đất ở gần Mặt Trời hơn không?',
    summary:
      'Các mùa không phải do khoảng cách tới Mặt Trời — một hiểu lầm phổ biến. Chúng xảy ra vì Trái Đất nghiêng trên trục của mình, nên mỗi bán cầu ngả về phía Mặt Trời nửa năm (mùa hè) và ngả ra xa nửa năm còn lại (mùa đông), làm thay đổi mức độ trực diện của ánh nắng chiếu xuống đất.',
    tags: ['khoa học', 'thiên văn', 'trái đất', 'thiên nhiên'],
    language: 'vi',
    image: { prompt: promptOf('why-seasons-happen'), alt: 'Quả địa cầu nghiêng quay quanh Mặt Trời, một bán cầu được chiếu trực diện còn bán cầu kia bị chiếu xiên' },
    sources: [
      { title: 'NASA Science — Điều gì tạo ra các mùa?', url: 'https://spaceplace.nasa.gov/seasons/en/' },
      { title: 'NOAA — Độ nghiêng của Trái Đất và các mùa', url: 'https://www.noaa.gov/' },
    ],
    content: `# Bốn mùa thực sự từ đâu mà có?

Hãy làm rõ ngay hiểu lầm khoa học phổ biến nhất: **các mùa không phải do Trái Đất tiến lại gần hay lùi ra xa Mặt Trời.** Thực tế, Trái Đất ở gần Mặt Trời hơn một chút vào tháng Một — đúng vào mùa đông của Bắc bán cầu. Nếu khoảng cách là nguyên nhân, thì cả hành tinh sẽ vào hè và vào đông cùng lúc. Nhưng không phải vậy: khi Úc là mùa hè thì Canada là mùa đông. Nguyên nhân thực sự là **độ nghiêng** của Trái Đất.

## Độ nghiêng quyết định tất cả

Trái Đất xoay quanh một trục nghiêng khoảng 23,5 độ so với quỹ đạo của nó quanh Mặt Trời. Độ nghiêng ấy giữ nguyên hướng trong không gian suốt cả năm khi Trái Đất đi vòng quanh Mặt Trời. Thế nên trong nửa quỹ đạo, Bắc bán cầu ngả *về phía* Mặt Trời, còn nửa kia thì ngả *ra xa* — và Nam bán cầu thì ngược lại. Chỉ một sự thật ấy thôi đã tạo ra tất cả những gì ta gọi là các mùa.

## Vì sao độ nghiêng làm trời ấm hơn hay lạnh hơn

Ngả về phía Mặt Trời làm thay đổi thời tiết theo hai cách củng cố lẫn nhau:

- **Độ trực diện của ánh nắng.** Khi bán cầu của bạn ngả về phía Mặt Trời, ánh nắng đập xuống đất **trực diện** hơn — tập trung, như đèn pin chĩa thẳng xuống. Khi nó ngả ra xa, cùng lượng ánh sáng ấy chiếu xuống ở một **góc rất nông**, trải mỏng trên diện tích lớn hơn, nên mỗi mảng đất nhận được ít năng lượng hơn. Ánh sáng trực diện sưởi ấm hiệu quả hơn nhiều so với ánh sáng chiếu xiên.
- **Độ dài ban ngày.** Độ nghiêng cũng có nghĩa là vào mùa hè, Mặt Trời ở trên đường chân trời **lâu hơn**, nên có nhiều giờ sưởi ấm hơn và ít giờ nguội đi ban đêm hơn.

Ánh sáng tập trung hơn, trong nhiều giờ mỗi ngày, cộng lại thành mùa hè. Ánh sáng chiếu xiên trong ít giờ hơn cộng lại thành mùa đông.

## Vì sao điều này giải thích mọi thứ còn lại

- **Hai bán cầu, hai mùa ngược nhau:** khi bắc ngả về phía Mặt Trời thì nam ngả ra xa — nên mùa của chúng luôn đảo ngược.
- **Xích đạo gần như không có mùa:** nó gần như luôn quay sườn về phía Mặt Trời cả năm, nên ánh nắng luôn khá trực diện — do đó luôn ấm ổn định.
- **Hai cực có nhiều tháng ngày hoặc đêm:** độ nghiêng cực đoan khiến mùa hè Mặt Trời không bao giờ lặn hẳn, còn mùa đông không bao giờ mọc hẳn.

## Câu hỏi thường gặp

**Vậy khoảng cách của Trái Đất tới Mặt Trời chẳng có tác dụng gì sao?**
Quỹ đạo của nó chỉ hơi bầu dục, nên thay đổi khoảng cách là nhỏ và bị hiệu ứng độ nghiêng lấn át. Không phải bằng không, nhưng là ảnh hưởng thứ yếu so với góc chiếu của ánh nắng.

**Vì sao thời tiết nóng nhất thường đến sau ngày dài nhất?**
"Độ trễ theo mùa" này xảy ra vì đất và đại dương mất nhiều tuần để hấp thụ nhiệt và ấm lên. Đỉnh điểm của ánh nắng tới là ngày hạ chí, nhưng đỉnh điểm của nhiệt tích lũy phải một hai tháng sau mới đến.

**Chí và phân là gì?**
Các điểm chí là hai thời khắc độ nghiêng về phía hoặc ra xa Mặt Trời đạt cực đại (ngày dài nhất và ngắn nhất); các điểm phân là hai thời khắc ở giữa, khi độ nghiêng quay ngang và ngày đêm gần như bằng nhau ở khắp nơi.`,
  },
  {
    topicKey: 'why-we-dream',
    title: 'Vì sao chúng ta nằm mơ?',
    question: 'Vì sao chúng ta nằm mơ, và giấc mơ có thật sự mang ý nghĩa gì không?',
    summary:
      'Chưa ai biết câu trả lời trọn vẹn, nhưng khoa học hàng đầu cho rằng giấc mơ không hề ngẫu nhiên: chúng dường như giúp não củng cố ký ức, xử lý cảm xúc và diễn tập các tình huống. Hầu hết giấc mơ sống động xảy ra trong giấc ngủ REM, khi não gần như hoạt động mạnh như lúc thức.',
    tags: ['khoa học', 'thần kinh học', 'giấc ngủ', 'não bộ'],
    language: 'vi',
    image: { prompt: promptOf('why-we-dream'), alt: 'Bộ não đang ngủ phát sáng khi phát lại và sắp xếp các mảnh ký ức theo cảm xúc' },
    sources: [
      { title: 'Viện Quốc gia về Rối loạn Thần kinh và Đột quỵ (NIH) — Kiến thức cơ bản về não: Giấc ngủ', url: 'https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-understanding-sleep' },
      { title: 'Sleep Foundation — Vì sao chúng ta nằm mơ?', url: 'https://www.sleepfoundation.org/dreams' },
    ],
    content: `# Vì sao chúng ta nằm mơ?

Nói thật trước đã: **khoa học chưa biết tường tận vì sao chúng ta nằm mơ** — đó là một trong những câu hỏi còn bỏ ngỏ thực sự về não bộ. Nhưng "chưa biết hết" không có nghĩa là "chẳng biết gì". Các nhà nghiên cứu có những giả thuyết mạnh, được chứng cứ hậu thuẫn, và chúng cùng chỉ về một hướng nhất quán: giấc mơ rất có thể không phải là thứ nhiễu vô nghĩa. Chúng dường như là sản phẩm phụ — thậm chí là một chức năng — của công việc "bảo trì ban đêm" thiết yếu mà não bạn thực hiện khi bạn ngủ.

## Giấc mơ diễn ra khi nào

Giấc ngủ luân chuyển qua nhiều giai đoạn, và những giấc mơ sống động, có cốt truyện nhất tụ lại ở một giai đoạn gọi là **REM** (chuyển động mắt nhanh), khi đó — lạ thay — não bạn gần như hoạt động mạnh như lúc thức, dù cơ thể bị tê liệt tạm thời (điều này tiện lợi giúp bạn không diễn lại giấc mơ ra ngoài). Bạn đi qua REM vài lần mỗi đêm, với các đợt REM dài dần về sáng, đó là lý do bạn thường tỉnh giấc giữa lúc đang mơ. Bạn cũng mơ trong các giai đoạn không-REM nông hơn, nhưng những giấc mơ ấy thường mơ hồ hơn.

## Những giả thuyết hàng đầu

Chưa có giả thuyết nào thắng cuộc, và có thể tất cả đều đúng một phần:

| Giả thuyết | Ý tưởng cốt lõi |
| --- | --- |
| **Củng cố ký ức** | Giấc mơ giúp sắp xếp trải nghiệm trong ngày, củng cố ký ức quan trọng và tỉa bớt phần còn lại |
| **Xử lý cảm xúc** | Giấc mơ cho bạn trải nghiệm lại và hóa giải các sự kiện cảm xúc trong trạng thái an toàn, "ngoại tuyến" |
| **Diễn tập mối đe dọa/xã hội** | Giấc mơ mô phỏng các thử thách (nguy hiểm, tình huống xã hội) để bạn chuẩn bị tốt hơn cho tình huống thật |
| **Não tạo nghĩa từ nhiễu** | Trong REM não phát xung bán ngẫu nhiên, và giấc mơ là nỗ lực dệt một câu chuyện từ hoạt động đó |

Lưu ý rằng những giả thuyết này chồng lấn chứ không loại trừ nhau: não hoàn toàn có thể vừa sắp xếp ký ức, vừa xử lý cảm xúc, *và* dệt một câu chuyện từ hoạt động ấy, tất cả cùng một lúc.

## Giấc mơ có "ý nghĩa" gì không?

Không theo nghĩa bói toán — không có chứng cứ nào cho thấy giấc mơ tiên đoán tương lai hay mang những biểu tượng ẩn giấu mang tính phổ quát. Nhưng chúng cũng không ngẫu nhiên: nội dung giấc mơ lấy nhiều chất liệu từ trải nghiệm, nỗi lo và cảm xúc gần đây của bạn, nên một giấc mơ có thể thật sự phản ánh điều đang vướng bận trong tâm trí bạn. Ý nghĩa, nếu có, là riêng tư và thuộc về cảm xúc, chứ không phải một mật mã để giải bằng một cuốn "từ điển giải mộng".

## Câu hỏi thường gặp

**Vì sao tôi quên giấc mơ nhanh đến vậy?**
Não không ưu tiên lưu giấc mơ vào trí nhớ dài hạn, và hóa học của giấc ngủ REM cũng không lý tưởng cho việc hình thành ký ức. Giấc mơ phai trong vài phút sau khi thức, trừ phi bạn lập tức nhẩm lại — đó là lý do "để cuốn sổ cạnh giường" có tác dụng.

**Ai cũng nằm mơ chứ?**
Gần như chắc chắn là có — những người nói rằng họ chẳng bao giờ mơ được cho là chỉ đơn giản không nhớ mà thôi. Các nghiên cứu giấc ngủ cho thấy hoạt động REM ngay cả ở những người nói mình không mơ.

**Ác mộng để làm gì?**
Chúng có thể là hệ thống xử lý cảm xúc hoặc diễn tập mối đe dọa hoạt động quá tải, thường bị kích hoạt bởi căng thẳng hay sang chấn. Ác mộng thi thoảng là bình thường; ác mộng thường xuyên, gây đau khổ thì đáng tìm đến chuyên gia.`,
  },
  {
    topicKey: 'how-planes-fly',
    title: 'Máy bay thực ra giữ mình lơ lửng trên không bằng cách nào?',
    question: 'Những chiếc máy bay nặng nề tạo ra đủ lực nâng để bay bằng cách nào?',
    summary:
      'Cánh tạo lực nâng bằng cách lái không khí xuống dưới — theo định luật ba của Newton, đẩy không khí xuống thì cánh bị đẩy lên. Hình dạng và độ nghiêng của cánh còn khiến luồng khí phía trên chảy nhanh hơn, áp suất thấp hơn. Cùng nhau, chúng tạo đủ lực hướng lên để giữ hàng tấn kim loại lơ lửng.',
    tags: ['khoa học', 'vật lý', 'bay', 'nguyên lý'],
    language: 'vi',
    image: { prompt: promptOf('how-planes-fly'), alt: 'Mặt cắt cánh máy bay lái luồng khí xuống dưới trong khi một lực nâng hướng lên đẩy cánh lên' },
    sources: [
      { title: 'NASA Glenn — Cánh nâng máy bay như thế nào / Động lực học bay', url: 'https://www.grc.nasa.gov/www/k-12/airplane/lift1.html' },
      { title: 'NASA — Bốn lực của chuyến bay', url: 'https://www.nasa.gov/audience/foreducators/k-4/features/F_Four_Forces_of_Flight.html' },
    ],
    content: `# Máy bay thực ra giữ mình lơ lửng trên không bằng cách nào?

Có vẻ gần như khó tin khi một thứ nặng như chiếc máy bay chở khách đầy tải lại có thể nổi trên không khí mỏng manh — nhưng nguyên lý là vật lý vững chắc. Việc của cánh là tạo ra **lực nâng**, một lực hướng lên đủ lớn để thắng trọng lượng máy bay, và nó làm điều này bằng một mẹo căn bản: **nó đẩy không khí xuống dưới.** Theo định luật ba của Newton — mọi tác dụng đều có một phản tác dụng bằng và ngược chiều — đẩy một khối lượng không khí khổng lồ xuống *dưới* khiến không khí đẩy cánh lên *trên*. Giữ lấy ý đó thì phần còn lại chỉ là chi tiết.

## Hai cách mô tả cùng một lực nâng

Các nhà vật lý giải thích lực nâng của cánh từ hai góc độ rốt cuộc đều ăn khớp:

- **Góc nhìn Newton (không khí bị lái xuống).** Cánh được nghiêng nhẹ và tạo hình sao cho luồng khí chảy qua nó bị bẻ **xuống dưới** khi rời mép sau. Cánh ném một dòng khí liên tục xuống dưới; phản lực đẩy cánh lên. Càng lái nhiều khí, hoặc lái mạnh hơn, thì lực nâng càng lớn.
- **Góc nhìn áp suất (khí nhanh hơn, áp suất thấp hơn).** Do hình dạng và góc của cánh, không khí chảy **nhanh hơn ở mặt trên** so với mặt dưới. Khí chuyển động nhanh hơn thì *áp suất thấp hơn* (nguyên lý Bernoulli), nên áp suất đẩy lên từ bên dưới cao hơn áp suất đè xuống từ bên trên — kết quả là một lực ròng hướng lên.

Đây không phải hai cách giải thích đối đầu nhau; chúng là hai mô tả nhất quán về cùng một hiện tượng. Cả hai đều đang diễn ra, và cả hai đều tạo ra cùng một lực nâng.

## Điều gì quyết định lực nâng lớn bao nhiêu

Ba "đòn bẩy", mà cả phi công lẫn nhà thiết kế đều dùng:

- **Tốc độ:** luồng khí qua cánh càng nhanh thì lực nâng càng lớn hơn nhiều — đó là lý do máy bay phải tăng tốc trên một đường băng dài trước khi rời mặt đất, và vì sao nó hạ cánh chậm với sự trợ giúp thêm.
- **Diện tích và hình dạng cánh:** cánh lớn hơn lái được nhiều khí hơn; biên dạng cong được tinh chỉnh để lái không khí hiệu quả.
- **Góc tấn:** ngóc mũi cánh lên đón luồng khí làm tăng lực nâng — đến một mức nào đó. Nghiêng quá dốc thì luồng khí mượt mà tách ra, lực nâng sụp đổ, và cánh "thất tốc".

Đây cũng là lý do bạn thấy các cánh tà bung ra từ cánh chính lúc cất và hạ cánh: chúng tạm thời nới rộng và uốn lại cánh để vắt ra thêm lực nâng ở tốc độ thấp.

## Câu hỏi thường gặp

**Cách giải thích cũ "mặt trên dài hơn nên không khí phải tăng tốc cho kịp" có sai không?**
Câu chuyện phổ biến ấy (ý tưởng "thời gian đi qua bằng nhau") là một cách đơn giản hóa quá mức và có khiếm khuyết — không khí ở mặt trên đúng là đi nhanh hơn thật, nhưng không phải vì lý do đó, và cánh thậm chí còn bay được khi lộn ngược. Cốt lõi đáng tin là: cánh lái không khí xuống dưới, và áp suất ở mặt trên thấp hơn.

**Điều gì giữ máy bay tiến về phía trước?**
Động cơ cung cấp **lực đẩy**, thắng **lực cản** (sức cản không khí). Lực nâng chống lại trọng lượng; lực đẩy chống lại lực cản. Bay là sự cân bằng của bốn lực đó.

**Tàu lượn không có động cơ thì bay bằng cách nào?**
Nó đánh đổi độ cao lấy tốc độ, hạ dần một cách nhẹ nhàng qua không khí để luồng khí tiếp tục tạo lực nâng — và cưỡi các dòng khí bốc lên để lấy lại độ cao. Không cần động cơ, chỉ cần sự chuyển động của không khí.`,
  },
  {
    topicKey: 'why-ice-floats',
    title: 'Vì sao nước đá nổi (trong khi hầu như mọi thứ khác đều chìm)?',
    question: 'Vì sao nước đá nổi trên nước, trong khi đa số chất rắn lại chìm trong chính chất lỏng của mình?',
    summary:
      'Nước rất lạ: nó nở ra khi đóng băng. Các phân tử của nó khóa vào một tinh thể thoáng, rộng được giữ bởi liên kết hydro, khiến nước đá có khối lượng riêng thấp hơn nước lỏng khoảng 9% — nên nước đá nổi. Điều kỳ quặc này khiến hồ đóng băng từ trên xuống và sự sống sống sót dưới lớp băng qua mùa đông.',
    tags: ['khoa học', 'hóa học', 'nước', 'thiên nhiên'],
    language: 'vi',
    image: { prompt: promptOf('why-ice-floats'), alt: 'Mạng tinh thể nước đá lục giác thoáng rộng nổi trên các phân tử nước lỏng xếp dày đặc' },
    sources: [
      { title: 'USGS (Cục Khảo sát Địa chất Hoa Kỳ) — Khối lượng riêng của nước và nước đá', url: 'https://www.usgs.gov/special-topics/water-science-school/science/water-density' },
      { title: 'Hội Hóa học Hoàng gia Anh — Liên kết hydro trong nước', url: 'https://edu.rsc.org/' },
    ],
    content: `# Vì sao nước đá nổi (trong khi hầu như mọi thứ khác đều chìm)?

Nước đá nổi trong ly nước quen thuộc đến mức ta dễ bỏ qua chuyện nó *kỳ lạ* đến nhường nào. Với gần như mọi chất khác trên Trái Đất, thể rắn **đặc hơn** thể lỏng — thả sáp rắn vào sáp đã nóng chảy thì nó chìm. Nước phá vỡ quy luật này: nước thể rắn (nước đá) **kém** đặc hơn nước thể lỏng, nên nó nổi. Nguyên do nằm ở một tính chất đặc biệt của phân tử nước, và sự đặc biệt ấy hóa ra là một trong những lý do giúp sự sống trên Trái Đất sống sót qua mùa đông.

## Khối lượng riêng, gói trong một câu

Một vật nổi hay không quy về **khối lượng riêng** — bao nhiêu khối lượng được nhồi vào một không gian cho trước. Nổi nếu bạn kém đặc hơn chất lỏng quanh mình; chìm nếu bạn đặc hơn. Vậy câu hỏi thực sự là: vì sao đóng băng lại làm nước *nở ra* và kém đặc đi, trong khi đóng băng làm hầu hết mọi thứ co lại?

## Kiến trúc thoáng rộng của nước đá

Phân tử nước hơi lệch về điện tích, điều này cho phép chúng níu lấy nhau bằng những lực hút yếu gọi là **liên kết hydro.** Trong nước lỏng, các phân tử liên tục xô đẩy, trượt qua nhau và xếp khá khít. Nhưng khi nước đóng băng, các liên kết hydro ấy khóa các phân tử vào một **tinh thể có trật tự**, cứng nhắc — và điều mấu chốt là tinh thể ấy *thoáng rộng*. Để thỏa mãn tất cả các liên kết của mình, các phân tử sắp thành một mạng lưới lục giác mở, có những khoảng trống được "xây" sẵn vào cấu trúc. Các phân tử trong nước đá thực ra được giữ *xa nhau hơn* tính trung bình so với trong nước lỏng.

Cùng những phân tử ấy mà có nhiều khoảng trống hơn giữa chúng nghĩa là khối lượng trên mỗi đơn vị thể tích ít hơn — nước đá có khối lượng riêng thấp hơn nước lỏng khoảng **9%**. Đó chính xác là vì sao một viên đá nổi với khoảng một phần mười nhô lên trên mặt nước, và vì sao cùng một thể tích nước nở ra và có thể làm nứt ống khi đóng băng.

## Vì sao điều kỳ quặc này quan trọng với sự sống

Vì nước đá nổi, nước đóng băng từ **trên xuống**. Một cái ao đóng băng trên bề mặt trước, và lớp băng nổi ấy đóng vai trò như một tấm chăn cách nhiệt, làm chậm sự đóng băng tiếp theo và giữ cho nước bên dưới ở thể lỏng. Cá, thực vật và những sinh vật khác sống sót qua mùa đông trong lớp nước lỏng bên dưới đó. Nếu nước đá chìm, hồ và thậm chí đại dương sẽ đóng băng thành khối đặc từ dưới lên, và sự sống dưới nước như ta biết có lẽ chẳng bao giờ vượt qua nổi những mùa lạnh. Một "tai nạn" phân tử nhỏ bé lại có những hệ quả vô cùng to lớn.

## Câu hỏi thường gặp

**Nước đặc nhất ở điểm đóng băng phải không?**
Không — và đó là một điều kỳ lạ nữa. Nước đặc nhất ở khoảng 4°C, hơi *cao* hơn điểm đóng băng. Khi nguội tiếp xuống dưới mức đó về phía 0°C, nó thực ra nở ra một chút trước khi hóa đá, đó là lý do nước lạnh nhất trong hồ lại nằm ở trên cùng.

**Nước mặn đóng băng và nổi theo cùng một cách chứ?**
Băng biển vẫn nổi (nó kém đặc hơn nước biển), nhưng muối hạ điểm đóng băng của nước và làm thay đổi chi tiết. Băng tinh khiết hình thành phần lớn loại trừ muối ra.

**Vì sao bỏ đá lại làm mát đồ uống tốt đến vậy?**
Ngoài bản thân lạnh, nước đá khi tan còn *hấp thụ* rất nhiều nhiệt từ chất lỏng để phá vỡ các liên kết hydro khi hóa thành nước — rút năng lượng ra khỏi đồ uống của bạn trong quá trình đó.`,
  },
  {
    topicKey: 'how-soap-works',
    title: 'Xà phòng thực ra làm sạch bằng cách nào?',
    question: 'Vì sao xà phòng tẩy được dầu mỡ và vi khuẩn mà nước thường không làm nổi?',
    summary:
      'Phân tử xà phòng có "tính cách kép": một đầu yêu nước, đầu kia bám chặt vào dầu mỡ. Chúng bao vây bụi bẩn nhờn và vi khuẩn, bóc chúng khỏi bề mặt, rồi để nước cuốn trôi tất cả — đây cũng là lý do xà phòng cực kỳ hiệu quả với nhiều loại virus.',
    tags: ['khoa học', 'hóa học', 'vệ sinh', 'nguyên lý'],
    language: 'vi',
    image: { prompt: promptOf('how-soap-works'), alt: 'Các phân tử xà phòng hai đầu bao bọc giọt dầu rồi nâng nó vào trong nước' },
    sources: [
      { title: 'Hội Hóa học Hoàng gia Anh — Xà phòng hoạt động như thế nào (chất hoạt động bề mặt)', url: 'https://edu.rsc.org/' },
      { title: 'CDC — Khoa học chỉ cho bạn: Vì sao phải rửa tay?', url: 'https://www.cdc.gov/handwashing/why-handwashing.html' },
    ],
    content: `# Xà phòng thực ra làm sạch bằng cách nào?

Bạn đã biết vấn đề mà xà phòng giải quyết: chỉ riêng nước thì bó tay trước dầu mỡ. Xối một cái chảo dính dầu dưới vòi và dầu cứ vón thành hạt, ì ra đó. Bởi vì dầu và nước nổi tiếng là không hòa lẫn. Xà phòng hoạt động bằng cách làm một **bà mối phân tử** khôn khéo — nó bắc cầu nối giữa nước và dầu, để nước cuối cùng có thể cuốn dầu (và cả vi khuẩn núp trong dầu) đi.

## Phân tử hai mặt

Bí mật nằm ở hình dạng của phân tử xà phòng. Mỗi phân tử như một con nòng nọc tí hon với hai đầu rất khác nhau:

- Một **đầu** *ưa nước* — "yêu nước". Nó vui vẻ kết hợp với nước.
- Một **đuôi** dài *kỵ nước* — "sợ nước" — nhưng lại thích bám chặt vào dầu mỡ.

Tính cách kép này chính là toàn bộ mẹo. Khi bạn đánh bọt trên một bề mặt dính dầu, các phân tử xà phòng tự sắp xếp với đuôi yêu dầu chui vào trong dầu và đầu yêu nước chĩa ra ngoài về phía nước.

## Bao vây, bóc tách, cuốn trôi

Hàng nghìn phân tử xà phòng bu vào một giọt dầu, đuôi quay vào, đầu quay ra, cho đến khi cục dầu nhờn được bọc trọn trong một quả cầu có bề mặt ngoài thân nước. Những quả cầu nhỏ này gọi là **mixen (micelle).** Giờ đây cục dầu vốn cự nước đã có một lớp vỏ yêu nước — nên khi bạn xối, dòng nước chảy túm lấy những mixen đó và rửa trôi cả gói, dầu lẫn bụi bẩn mắc kẹt bên trong, xuống cống. Xà phòng không hòa tan dầu; nó *đóng gói* dầu để nước có thể mang đi.

## Vì sao điều này cũng phá hủy nhiều vi khuẩn

Cùng tính chất ấy biến xà phòng thành một người hùng thầm lặng của vệ sinh. Nhiều mầm bệnh — gồm các coronavirus và các virus có vỏ bọc khác — được bao trong một lớp **màng béo** bên ngoài. Cái đuôi yêu dầu của xà phòng cạy vào và xé toạc lớp áo béo ấy, cấu mầm bệnh ra thành mảnh, trong khi các mixen đồng thời nâng vi khuẩn khỏi da bạn để được cuốn trôi. Đó là lý do **chà 20 giây bằng xà phòng thường** lại hiệu quả đến vậy: bạn không chỉ rửa trôi vi khuẩn, mà còn tháo dỡ nhiều con ở cấp độ hóa học. Tác động cơ học của việc chà xát cũng quan trọng — nó làm bong những thứ bám dính.

## Câu hỏi thường gặp

**Nước có cần nóng không?**
Thật ra không cần — nước ấm có thể giúp hòa tan một số loại dầu nhanh hơn và dễ chịu hơn, nhưng phần việc hóa học của xà phòng hoàn thành ở bất kỳ nhiệt độ hợp lý nào. Thời gian chà kỹ quan trọng hơn nhiệt độ.

**Xà phòng kháng khuẩn có tốt hơn xà phòng thường không?**
Với việc rửa tay hằng ngày, xà phòng thường cũng hiệu quả y như vậy trong việc loại bỏ và phá hủy vi khuẩn, và các cơ quan y tế nhìn chung không thấy xà phòng kháng khuẩn thông thường hiệu quả hơn. Cơ chế "xà phòng cộng chà xát" mới là phần then chốt.

**Chất tẩy rửa khác xà phòng ở chỗ nào?**
Chất tẩy rửa dùng đúng nguyên lý "hai đầu" giống hệt (chúng cũng là "chất hoạt động bề mặt"), nhưng được tổng hợp để hoạt động tốt hơn trong nước cứng và ở nhiều nhiệt độ khác nhau. Cùng một ý tưởng, được "kỹ thuật hóa" cho những điều kiện khắc nghiệt hơn.`,
  },
  {
    topicKey: 'what-causes-rainbows',
    title: 'Cầu vồng hình thành thế nào?',
    question: 'Cầu vồng hình thành ra sao, và vì sao thứ tự các màu luôn giống nhau?',
    summary:
      'Cầu vồng là ánh nắng bị bẻ cong và tách màu bên trong các giọt mưa. Mỗi giọt mưa hoạt động như một lăng kính tí hon, tách ánh sáng trắng thành các màu rồi phản chiếu lại tới mắt bạn. Hình học ấn định thứ tự màu và uốn toàn bộ thành một cung lấy điểm đối diện Mặt Trời làm tâm.',
    tags: ['khoa học', 'vật lý', 'ánh sáng', 'thời tiết'],
    language: 'vi',
    image: { prompt: promptOf('what-causes-rainbows'), alt: 'Ánh sáng trắng đi vào giọt mưa và đi ra sau khi phản xạ, tách thành các màu quang phổ theo thứ tự' },
    sources: [
      { title: 'NOAA SciJinks — Cầu vồng hình thành thế nào?', url: 'https://scijinks.gov/rainbow/' },
      { title: 'NASA Science — Ánh sáng và phổ điện từ', url: 'https://science.nasa.gov/ems/' },
    ],
    content: `# Cầu vồng hình thành thế nào?

Cầu vồng là một trò chơi của ánh sáng và nước — cụ thể là **ánh nắng bị hàng triệu giọt mưa bẻ cong, tách màu và phản chiếu trở lại tới mắt bạn.** Nó không phải một vật ở một địa điểm mà bạn có thể đi tới; nó là một hiệu ứng quang học hoàn toàn phụ thuộc vào vị trí của Mặt Trời, của mưa, và của *đôi mắt bạn*. Đó là lý do bạn không bao giờ chạm tới chân cầu vồng, và vì sao người đứng cạnh bạn lại thấy một cầu vồng hơi khác: mỗi cầu vồng được "may đo" riêng cho người ngắm.

## Bên trong một giọt mưa diễn ra điều gì

Hãy đi theo một tia nắng vào trong một giọt mưa hình cầu:

1. **Nó bị bẻ cong khi đi vào.** Ánh sáng chậm lại và đổi hướng khi đi từ không khí vào nước (khúc xạ). Điều mấu chốt là các màu khác nhau bị bẻ cong với mức độ hơi khác nhau — tím bẻ cong nhiều nhất, đỏ ít nhất.
2. **Nó phản xạ ở mặt sau.** Tia sáng đi tới mặt trong cùng phía xa của giọt nước rồi bật trở lại.
3. **Nó bị bẻ cong lần nữa khi đi ra** — và đến lúc này các màu, mỗi màu đã bị bẻ cong hai lần, đã xòe ra thành đủ một quang phổ.

Vậy là mỗi giọt mưa hút vào ánh nắng trắng và phun ra một chùm nhỏ những màu đã được tách. Cầu vồng là thứ bạn thấy khi hàng triệu giọt mưa cùng làm điều này một lúc, mỗi giọt góp một màu vào mắt bạn tùy theo vị trí của nó trên bầu trời.

## Vì sao thứ tự các màu luôn giống nhau

Vì mức độ bẻ cong được vật lý ấn định cố định, nên **đỏ luôn nằm ở mép ngoài của cung và tím ở mép trong**, với cam, vàng, lục, lam ở giữa — lần nào cũng vậy. Thứ tự không bao giờ bị xáo trộn vì nó được định bởi mỗi bước sóng khúc xạ bao nhiêu. Trình tự quen thuộc (đỏ, cam, vàng, lục, lam, tím) chỉ đơn giản là quang phổ, được sắp theo bước sóng.

## Vì sao nó là một cung, và luôn ở phía đối diện Mặt Trời

Hình học chỉ "ăn khớp" ở một góc cụ thể — ánh sáng quay về mắt bạn mạnh nhất ở khoảng **42 độ** so với điểm nằm thẳng đối diện Mặt Trời. Tất cả các phương ở cùng góc đó vạch ra một vòng tròn, mà bạn thấy thành cái cung quen thuộc (mặt đất thường che mất nửa dưới). Đây cũng là lý do cầu vồng luôn ở phần trời *đối diện* Mặt Trời: bạn phải quay lưng về phía Mặt Trời, với mưa ở trước mặt, thì các góc mới khớp được.

## Câu hỏi thường gặp

**Cầu vồng đôi xảy ra thế nào?**
Đôi khi ánh sáng phản xạ **hai lần** bên trong giọt nước trước khi đi ra. Cầu vồng thứ hai mờ hơn ấy xuất hiện cao hơn, và các màu của nó bị **đảo ngược** (đỏ ở phía trong) vì lần bật thêm đã lật ngược thứ tự.

**Có bao giờ chạm tới chân cầu vồng được không?**
Không — nó không phải một địa điểm vật lý. Bạn tiến về phía nó thì hình học dịch chuyển theo bạn, nên cầu vồng cũng dịch theo. Nó chỉ tồn tại tương đối với điểm nhìn của bạn.

**Có cần mưa mới thấy được cầu vồng không?**
Cái bạn cần là những giọt nước cộng với ánh nắng chiếu ở góc thích hợp — nên bạn cũng thấy cầu vồng trong làn sương của thác nước, vòi phun tưới vườn, và bụi nước biển. Quan trọng là những giọt nước, chứ không phải đám mây mưa.`,
  },
  {
    topicKey: 'why-we-age',
    title: 'Vì sao chúng ta già đi?',
    question: 'Rốt cuộc điều gì khiến cơ thể chúng ta già đi theo thời gian?',
    summary:
      'Lão hóa là sự tích tụ dần tổn thương trong tế bào nhanh hơn khả năng sửa chữa của cơ thể — từ đầu nhiễm sắc thể bị mòn, lỗi DNA, đến tế bào trục trặc và viêm gia tăng. Đó là nhiều quá trình chồng lấn chứ không phải một chiếc đồng hồ, và đó là lý do lão hóa phức tạp đến vậy.',
    tags: ['khoa học', 'sinh học', 'lão hóa', 'sức khỏe'],
    language: 'vi',
    image: { prompt: promptOf('why-we-age'), alt: 'Các tế bào tích tụ đầu sợi tưa và tổn thương nhỏ theo thời gian khi việc sửa chữa chậm lại' },
    sources: [
      { title: 'Viện Quốc gia về Lão hóa (NIH) — Chúng ta biết gì về lão hóa khỏe mạnh?', url: 'https://www.nia.nih.gov/health/what-do-we-know-about-healthy-aging' },
      { title: 'López-Otín và cộng sự, "Các dấu ấn của lão hóa" (2013)', url: 'https://pubmed.ncbi.nlm.nih.gov/23746838/' },
    ],
    content: `# Vì sao chúng ta già đi?

Lão hóa có thể tạo cảm giác như một chiếc đồng hồ bí ẩn đang đếm ngược, nhưng về mặt sinh học, hiểu đúng hơn là **sự tích tụ chậm rãi của tổn thương** — hao mòn ở cấp độ tế bào và phân tử mà qua nhiều thập kỷ, cơ thể ngày càng ít có khả năng sửa chữa. Khi còn trẻ, việc sửa chữa theo kịp tổn thương. Theo thời gian, tổn thương bắt đầu thắng thế. Lão hóa không có một nguyên nhân duy nhất; nó có nhiều nguyên nhân chồng lấn lên nhau, và đó chính xác là lý do nó khó ngăn chặn đến vậy và vì sao không tồn tại một "phương thuốc" duy nhất.

## Những động lực chính của lão hóa

Các nhà khoa học đã nhận diện một tập hợp những quá trình lồng vào nhau — thường được gọi là "các dấu ấn của lão hóa" — cùng nhau thúc đẩy sự suy giảm. Vài quá trình quan trọng nhất:

| Quá trình | Điều gì trục trặc |
| --- | --- |
| **Telomere ngắn lại** | Những chiếc mũ bảo vệ ở đầu nhiễm sắc thể ngắn đi mỗi lần tế bào phân chia, cuối cùng giới hạn việc phân chia |
| **Tổn thương DNA** | Lỗi và tổn thương tích tụ trong mã di truyền nhanh hơn tốc độ được sửa |
| **Tế bào lão suy (senescence)** | Tế bào hư hỏng ngừng phân chia nhưng vẫn ì lại, rò ra các tín hiệu gây hại cho hàng xóm |
| **Trục trặc protein** | Tế bào ngày càng kém trong việc dọn các protein hư hỏng, gập sai, khiến chúng tích lại |
| **Nhà máy điện hỏng hóc** | Ti thể (bộ máy sinh năng lượng của tế bào) trở nên kém hiệu quả |
| **Viêm mãn tính** | Một thứ viêm âm ỉ, lan khắp cơ thể ("viêm-lão hóa") tăng theo tuổi |

Không một quá trình đơn lẻ nào trong số này *chính là* lão hóa. Chúng củng cố lẫn nhau — DNA hư hỏng tạo ra tế bào lão suy, tế bào lão suy nhen lên viêm, viêm gây thêm tổn thương — nên sự suy giảm dồn lại theo kiểu lãi kép.

## Vì sao chúng ta lại già đi (câu hỏi sâu hơn)

Tiến hóa đưa ra một lý do vì sao lão hóa tồn tại ngay từ đầu: chọn lọc tự nhiên dồn sức nhiều nhất để giữ chúng ta khỏe mạnh qua những năm sinh sản, và sự kìm kẹp của nó suy yếu sau đó. Những gen và sự đánh đổi có lợi cho tuổi trẻ nhưng kèm những cái giá chỉ lộ ra về sau lại được giữ lại, vì áp lực tiến hóa để sửa chúng rất yếu. Nói ngắn gọn, cơ thể được tinh chỉnh để đưa gen của mình vào thế hệ kế tiếp, chứ không phải để trường tồn — nên "bảo trì" chỉ là "đủ tốt", chứ không hoàn hảo.

## Có thể làm chậm nó được không?

Bản thân lão hóa hôm nay chưa thể ngăn lại, nhưng **tốc độ** tổn thương phần nào chịu ảnh hưởng của cách ta sống. Không hút thuốc, vận động thể chất đều đặn, ngủ tử tế, ăn uống hợp lý và quản lý căng thẳng mãn tính được liên hệ lặp đi lặp lại với sự suy giảm chậm hơn và tuổi thọ khỏe mạnh dài hơn — không phải phép màu, nhưng là khác biệt giữa già đi an lành và già đi vất vả. Nghiên cứu về các cơ chế nền tảng đang sôi động, nhưng những "đòn bẩy" đã được chứng minh thì vẫn cứ thực dụng một cách bình dị.

## Câu hỏi thường gặp

**Có giới hạn tuổi thọ tối đa cho con người không?**
Dường như có một trần đại khái — ngay cả khi sức khỏe hoàn hảo, rất ít người vượt qua khoảng 115 tuổi, gợi ý rằng tổn thương tích lũy cuối cùng sẽ áp đảo khả năng sửa chữa. Kỷ lục được xác minh hiện tại là 122 tuổi.

**Động vật to hay nhỏ thì già nhanh hơn?**
Nhìn chung động vật nhỏ hơn sống ngắn hơn, nhưng có những ngoại lệ đáng kinh ngạc (một số loài dơi nhỏ và chuột chũi trụi lông sống lâu hơn nhiều so với kích thước dự đoán), và đó chính xác là lý do các nhà nghiên cứu nghiên cứu chúng.

**Liệu khoa học có bao giờ "chữa khỏi" lão hóa?**
Không ai biết. Các nhà nghiên cứu đang nhắm vào từng dấu ấn riêng lẻ (dọn các tế bào lão suy, bảo vệ DNA), và một số làm chậm lão hóa ở động vật thí nghiệm — nhưng chuyển điều đó thành việc kéo dài an toàn tuổi thọ khỏe mạnh của con người thì chưa được chứng minh và có lẽ còn xa.`,
  },
  {
    topicKey: 'what-is-electricity',
    title: 'Điện thực ra là gì?',
    question: 'Điện thực chất là gì, và nó cấp năng lượng cho thiết bị của chúng ta như thế nào?',
    summary:
      'Điện là dòng chuyển động của điện tích — thường là các electron trôi qua dây dẫn dưới sự thúc đẩy của điện áp. Nhà máy điện không tạo ra electron; nó cung cấp "lực đẩy" làm dịch chuyển những electron vốn đã có sẵn trong dây, và chuyển động có tổ chức ấy mang năng lượng tới thiết bị của bạn.',
    tags: ['khoa học', 'vật lý', 'điện', 'nguyên lý'],
    language: 'vi',
    image: { prompt: promptOf('what-is-electricity'), alt: 'Các điện tích phát sáng trong dây dẫn cùng trôi một hướng dưới điện áp để thắp sáng một thiết bị' },
    sources: [
      { title: 'Cơ quan Thông tin Năng lượng Hoa Kỳ (EIA) — Giải thích về điện', url: 'https://www.eia.gov/energyexplained/electricity/' },
      { title: 'NASA — Kiến thức cơ bản về điện và từ', url: 'https://science.nasa.gov/' },
    ],
    content: `# Điện thực ra là gì?

Ta dùng từ "điện" khá tùy tiện, nhưng ở cốt lõi nó chỉ một thứ: **dòng chuyển động của điện tích.** Vạn vật được tạo nên từ nguyên tử, và nguyên tử chứa các hạt mang điện — đáng kể nhất là **electron**, mang một điện tích âm nhỏ xíu. Trong một số vật liệu, đặc biệt là kim loại, một số electron tự do di chuyển. Khi một lượng khổng lồ những electron đó trôi cùng một hướng qua dây dẫn, dòng chảy có tổ chức ấy *chính là* dòng điện. Điện, theo đúng nghĩa đen, là điện tích đang chuyển động.

## Ba từ làm sáng tỏ tất cả

Một phép so sánh đơn giản với ống nước khiến các thuật ngữ then chốt vỡ lẽ ngay — hãy hình dung nước trong ống:

- **Điện áp** là *lực đẩy* — như áp suất nước. Đó là lực thúc đẩy điện tích đi qua mạch. Không áp suất, không có dòng chảy.
- **Dòng điện** là *lưu lượng* — bao nhiêu điện tích thực sự đi qua một điểm mỗi giây (đo bằng ampe).
- **Điện trở** là mức độ vật liệu *cản trở* dòng chảy — một ống hẹp, bị nghẽn so với một ống rộng, thông thoáng.

Điện áp càng lớn thì đẩy được dòng điện càng nhiều; điện trở càng lớn thì cho qua càng ít. Mối quan hệ ấy (định luật Ohm) chi phối gần như mọi mạch điện. Và dòng điện cần một **mạch kín** hoàn chỉnh — một vòng không đứt đoạn từ nguồn, qua thiết bị, rồi quay về — đó là lý do gạt một công tắc (làm đứt vòng) lập tức khiến mọi thứ dừng lại.

## Một hiểu lầm quan trọng: nhà máy điện không gửi electron tới bạn

Đây là điều khiến hầu hết mọi người ngạc nhiên. Nhà máy điện không vận chuyển electron tới nhà bạn như xe bồn chở nước. **Các electron vốn đã có sẵn trong dây.** Cái nhà máy điện cung cấp là *lực đẩy* — điện áp khiến những electron vốn có ấy rung lên và trôi đi. Trong dòng điện xoay chiều (AC) chảy ra từ phần lớn ổ cắm, các electron thậm chí chẳng hề đi về phía bạn; chúng chỉ dập dềnh tới lui tại chỗ, nhiều lần mỗi giây. Thứ thực sự truyền tới thiết bị của bạn, một cách nhanh chóng, là **năng lượng** do chuyển động đồng bộ ấy mang theo, chứ không phải bản thân các electron.

## Điều đó trở nên hữu ích như thế nào

Khi dòng điện tích đi tới một thiết bị, thiết bị buộc nó phải sinh công trên đường đi qua: một bộ phận tỏa nhiệt biến dòng chảy thành nhiệt, một động cơ biến nó thành chuyển động, một đèn LED biến nó thành ánh sáng, một con chip dùng những dòng điện đóng-ngắt tí hon để tính toán. Trong mọi trường hợp, điện tích chuyển động đều đang trao năng lượng, và thiết bị chuyển năng lượng đó thành thứ bạn muốn.

## Câu hỏi thường gặp

**Sét có phải cùng một loại điện như trong tường nhà tôi không?**
Cùng một hiện tượng nền tảng — một dòng chuyển động của điện tích — nhưng sét là một sự phóng điện khổng lồ, ngắn ngủi, cân bằng lượng điện tích tích tụ giữa mây và đất, ở điện áp cao hơn rất nhiều so với điện gia dụng.

**Khác nhau giữa AC và DC là gì?**
Trong dòng điện một chiều (DC, như pin), điện tích chảy đều đặn theo một hướng; trong dòng điện xoay chiều (AC, từ lưới điện), nó nhanh chóng đảo chiều tới lui. Lưới điện dùng AC vì điện áp của nó dễ tăng giảm, thuận tiện cho việc truyền tải đường dài hiệu quả.

**Vì sao kim loại là chất dẫn điện tốt?**
Các nguyên tử của chúng chia sẻ một "biển" electron được giữ lỏng lẻo, tự do di chuyển, nên điện tích chảy dễ dàng. Chất cách điện (cao su, thủy tinh) giữ electron của mình rất chặt, nên điện tích không chảy được — đó là lý do dây điện bên trong là đồng còn bên ngoài là nhựa.`,
  },
];
