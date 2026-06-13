import type { DraftArticle } from './types';
import { personalFinanceEn } from './personal-finance.en';

// Batch: Personal Finance (phiên bản tiếng Việt nguyên bản). Cùng chủ đề và
// topicKey với personal-finance.en.ts; nội dung được viết bản địa cho người
// đọc Việt Nam (ví dụ minh họa dùng VND, các khái niệm có tính thể chế giữ ở
// mức phổ quát, không gắn với hệ thống thuế/hưu trí của một quốc gia cụ thể).
// Ảnh minh họa dùng chung theo topicKey.

const promptOf = (key: string): string => {
  const hit = personalFinanceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

const NOTE = '\n\n*Bài viết này nhằm cung cấp kiến thức tài chính phổ thông, không phải lời khuyên đầu tư dành riêng cho cá nhân.*';

export const personalFinanceVi: DraftArticle[] = [
  {
    topicKey: 'compound-interest',
    title: 'Lãi kép thực sự vận hành như thế nào?',
    question: 'Lãi kép hoạt động theo nguyên lý nào, và vì sao người ta gọi nó là sức mạnh khủng khiếp?',
    summary:
      'Lãi kép sinh lời trên chính khoản lời đã có, khiến tiền lớn lên theo cấp số nhân chứ không phải đường thẳng. Thời gian quan trọng hơn lãi suất: đường cong phẳng nhiều năm rồi mới dốc đứng — đó là lý do bắt đầu sớm luôn thắng.',
    tags: ['tài chính', 'đầu tư', 'lãi kép', 'tiết kiệm'],
    language: 'vi',
    image: {
      prompt: promptOf('compound-interest'),
      alt: 'Một hạt mầm ánh sáng lớn thành cây phân nhánh theo cấp số nhân',
    },
    sources: [
      { title: 'Investor.gov (SEC Hoa Kỳ) — Công cụ tính lãi kép', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Bogleheads wiki — Triết lý và khái niệm cốt lõi khi đầu tư', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Lãi kép thực sự vận hành như thế nào?

Lãi kép nghĩa là bạn không chỉ kiếm lời trên số tiền bỏ vào, mà còn kiếm lời trên chính phần lời nó đã tạo ra. Lãi đơn lớn lên theo đường thẳng; lãi kép lớn lên theo một đường cong bắt đầu phẳng rồi kết thúc dốc đứng. Phần lớn "phép màu" xảy ra ở những năm về sau — vì thế bạn bắt đầu khi nào còn quan trọng hơn gần như mọi yếu tố khác.

## Cơ chế qua một ví dụ

Bỏ 100 triệu vào một khoản đầu tư sinh lời 7%/năm:

- **Năm 1**: bạn kiếm được 7 triệu (trên 100 triệu của mình).
- **Năm 2**: bạn kiếm 7,49 triệu — 7 triệu trên vốn gốc cộng 490 nghìn trên khoản lời năm ngoái.
- **Năm 10**: số dư khoảng 197 triệu; riêng năm đó sinh ra ~12,9 triệu.
- **Năm 30**: số dư khoảng 760 triệu; một năm bây giờ sinh ra ~50 triệu — bằng nửa vốn gốc ban đầu, mỗi năm, mà chẳng phải làm gì.

Công thức là A = P × (1 + r)^t, nhưng trực giác thì đơn giản hơn: tăng trưởng nuôi tăng trưởng cũ, nên khoản lời tăng tốc.

## Quy tắc số 72

Chia 72 cho lợi suất năm để ước lượng số năm tiền cần để nhân đôi:

| Lợi suất năm | Nhân đôi khoảng mỗi |
| --- | --- |
| 3% | 24 năm |
| 6% | 12 năm |
| 7% | ~10 năm |
| 10% | ~7 năm |

Các lần nhân đôi cộng dồn: ở mức 7%, ba mươi năm là khoảng ba lần nhân đôi — 1× thành ~8×. Đúng phép tính ấy cũng quay lại cắn bạn: nợ ở mức 18% nhân đôi trong khoảng bốn năm, và lạm phát 3% làm sức mua giảm một nửa sau khoảng 24 năm.

## Vì sao thời gian thắng lãi suất

Góp 5 triệu mỗi tháng ở mức 7%:

- Trong **30 năm**: ~6,1 tỷ (đã góp 1,8 tỷ).
- Trong **40 năm**: ~13,1 tỷ (đã góp 2,4 tỷ).

Mười năm sớm hơn — chỉ góp thêm 600 triệu — đem lại thêm khoảng 7 tỷ, vì những đồng vào sớm nhất được sinh lãi kép lâu nhất. Săn thêm một phần trăm lợi suất kém tin cậy hơn nhiều so với việc mua thêm thời gian bằng cách bắt đầu ngay bây giờ.

## Trong đời thực, cái gì sinh lãi kép

Tài khoản tiết kiệm sinh lãi kép theo đúng nghĩa đen; danh mục cổ phiếu sinh lãi kép theo nghĩa thống kê (lợi suất biến động qua từng năm nhưng phần lời tái đầu tư chồng lên nhau); cổ tức sinh lãi kép khi được tái đầu tư. Phí cũng sinh lãi kép, nhưng theo chiều ngược: phí 1%/năm trên mức sinh lời gộp 7% ăn mất khoảng một phần tư tài sản cuối cùng của bạn trong 40 năm.

## Câu hỏi thường gặp

**Tần suất ghép lãi (theo ngày so với theo tháng) có quan trọng nhiều không?**
Ít hơn nhiều so với người ta tưởng — ở mức 5%, ghép lãi theo ngày so với theo năm chỉ chênh khoảng 0,13 điểm phần trăm lợi suất thực. Lãi suất và thời gian mới là yếu tố áp đảo.

**Con số 7% hay được trích dẫn đến từ đâu?**
Đó đại khái là lợi suất dài hạn đã điều chỉnh lạm phát của các chỉ số cổ phiếu rộng của Mỹ trong lịch sử. Nó là trung bình của những năm rất gập ghềnh, không phải một lời hứa.

**Lãi kép có thật là "kỳ quan thứ tám của thế giới" (Einstein) không?**
Câu nói gần như chắc chắn là gán ghép — bản thân phép toán đã đủ kỳ diệu mà không cần một người nổi tiếng chứng thực.${NOTE}`,
  },
  {
    topicKey: 'index-funds',
    title: 'Quỹ chỉ số là gì — và vì sao chuyên gia cứ khuyên dùng nó?',
    question: 'Quỹ chỉ số là gì, và vì sao nó thường được khuyên cho nhà đầu tư bình thường đến vậy?',
    summary:
      'Quỹ chỉ số mua tự động mọi cổ phiếu trong một chỉ số thị trường, với phí gần như bằng không. Hàng chục năm dữ liệu cho thấy đa số người chọn cổ phiếu chuyên nghiệp không thắng nổi nó về dài hạn — đó là toàn bộ luận điểm.',
    tags: ['tài chính', 'đầu tư', 'quỹ chỉ số', 'đầu tư thụ động'],
    language: 'vi',
    image: {
      prompt: promptOf('index-funds'),
      alt: 'Hàng trăm khối lập phương phát sáng được nhấc lên như một giỏ duy nhất',
    },
    sources: [
      { title: 'SPIVA — Bảng so kè "Chủ động vs Chỉ số" của S&P', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Bogleheads wiki — Danh mục ba quỹ', url: 'https://www.bogleheads.org/wiki/Three-fund_portfolio' },
      { title: 'Investor.gov (SEC Hoa Kỳ) — Kiến thức cơ bản về quỹ tương hỗ và ETF', url: 'https://www.investor.gov' },
    ],
    content: `# Quỹ chỉ số là gì — và vì sao chuyên gia cứ khuyên dùng nó?

Quỹ chỉ số là một quỹ không cố chọn người thắng. Nó chỉ đơn giản mua mọi chứng khoán trong một chỉ số thị trường — toàn bộ ~500 công ty của S&P 500, hay hàng nghìn cổ phiếu trong một chỉ số toàn thị trường — theo tỷ trọng quy mô của chúng, rồi nắm giữ. Không chuyên viên phân tích, không dự báo, không bàn giao dịch nào phải tự kiếm cơm. Nghe như buông xuôi; dữ liệu lại nói ngược lại.

## Luận điểm gói trong ba sự thật

**1. Thị trường rất khó thắng.** Bảng so kè SPIVA, công bố hơn hai thập kỷ, liên tục cho thấy trong các cửa sổ 15 năm thì phần đông — thường là 80–90% — quỹ quản lý chủ động thua chỉ số tham chiếu của chúng ở các thị trường lớn. Những người chuyên nghiệp với cả đội toàn thời gian, tính trung bình, không chọn hơn nổi chỉ số mà họ bị đem ra đo.

**2. Bạn không thể biết trước người thắng.** Một số quỹ có thắng thị trường — nhưng người thắng hiếm khi giữ phong độ, và thành tích quá khứ là bộ lọc dở nổi tiếng. Chọn người quản lý quỹ thắng của thập kỷ tới cũng đúng là bài toán chọn cổ phiếu thắng của thập kỷ tới, chỉ lùi lên một tầng.

**3. Chi phí sinh lãi kép chống lại bạn.** Quỹ chỉ số tính tỷ lệ chi phí thấp tới 0,03–0,2% mỗi năm; quỹ chủ động thường tính 0,5–1,5% cộng chi phí giao dịch nội bộ cao hơn. Một mức bào mòn 1%/năm, sinh lãi kép suốt 40 năm, ăn mất khoảng một phần tư tài sản cuối cùng. Quỹ chỉ số thắng một phần đơn giản vì nó từ chối tiêu tiền của bạn.

## Bạn thực sự nhận được gì

| Đặc tính | Quỹ chỉ số | Quỹ chủ động điển hình |
| --- | --- | --- |
| Mục tiêu | Bám sát thị trường | Thắng thị trường |
| Phí năm | ~0,03–0,2% | ~0,5–1,5%+ |
| Phân tán | Hàng trăm đến hàng nghìn mã | Danh sách của người quản lý |
| Rủi ro nhân vật chủ chốt | Không | Người quản lý nghỉ là chuyện lớn |
| Khả năng dự đoán | Bạn nhận lợi suất thị trường, trừ đi ~không gì | Phân tán rộng quanh chỉ số |

Cách diễn đạt thành thật: quỹ chỉ số đảm bảo bạn sẽ không bao giờ thắng thị trường — và đổi lại, khiến bạn về mặt thống kê rất nhiều khả năng thắng đa số những người cố thắng.

## Quỹ chỉ số không giải quyết điều gì

Nó không loại bỏ rủi ro thị trường: một quỹ toàn thị trường rớt khoảng một nửa trong 2008–09 rồi hồi phục cùng thị trường. Nó không chọn giúp bạn tỷ trọng tài sản — bao nhiêu cổ phiếu so với trái phiếu vẫn là quyết định của bạn (và quan trọng hơn việc chọn quỹ). Và một chỉ số hẹp (một ngành, một chủ đề) không phải là phân tán; lời khuyên là các chỉ số thị trường rộng.

## Câu hỏi thường gặp

**Nếu ai cũng mua chỉ số thì thị trường có sụp không?**
Ở một thái cực lý thuyết nào đó, việc định giá sẽ yếu đi — nhưng giao dịch chủ động vẫn chiếm phần lớn khối lượng hằng ngày, và bất kỳ sự kém hiệu quả nào nó để lại sẽ hút những người chọn cổ phiếu quay lại. Chúng ta còn cách giới hạn đó rất xa.

**Quỹ chỉ số hay ETF?**
Cả hai đều có thể bám cùng một chỉ số; khác biệt là lớp vỏ giao dịch. Với người tiết kiệm dài hạn, loại nào cũng ổn — phí và chỉ số được bám mới quan trọng hơn.

**Mua quỹ chỉ số có phải là "chấp nhận mức trung bình"?**
Bạn chấp nhận lợi suất của *thị trường*, mà sau chi phí thì trong lịch sử nó đã vượt kết quả của đa số dân chuyên nghiệp. Giá trung bình, kết quả trên trung bình.${NOTE}`,
  },
  {
    topicKey: 'inflation-purchasing-power',
    title: 'Lạm phát âm thầm bào mòn sức mua của bạn ra sao',
    question: 'Lạm phát thực sự bào mòn tiền tiết kiệm và sức mua theo thời gian như thế nào?',
    summary:
      'Lạm phát là một thứ thuế sinh lãi kép đánh chậm lên tiền mặt nằm không: ở mức 3%/năm, tiền mất một nửa sức mua sau khoảng 24 năm. Hiểu lợi suất thực (sau lạm phát) là điều phân tách "tiết kiệm" với "giữ gìn tài sản".',
    tags: ['tài chính', 'lạm phát', 'kinh tế học', 'tiết kiệm'],
    language: 'vi',
    image: {
      prompt: promptOf('inflation-purchasing-power'),
      alt: 'Đồng xu co lại trong đồng hồ cát còn đồ vật xung quanh cao dần lên',
    },
    sources: [
      { title: 'Cục Thống kê Lao động Hoa Kỳ — Chỉ số Giá Tiêu dùng (CPI)', url: 'https://www.bls.gov/cpi/' },
      { title: 'FRED (Fed St. Louis) — chuỗi dữ liệu lạm phát', url: 'https://fred.stlouisfed.org' },
    ],
    content: `# Lạm phát âm thầm bào mòn sức mua của bạn ra sao

Lạm phát là tốc độ giá cả nói chung tăng lên — nói cách khác, là tốc độ mỗi đồng tiền mua được ít đi. Nó vận hành y hệt lãi kép, nhưng chống lại bạn: những phần trăm nhỏ mỗi năm, lặng lẽ sinh lãi kép, cho đến khi tác động tích lũy trở nên khổng lồ. Tiền mặt giấu dưới gối không hề "an toàn"; nó được đảm bảo sẽ co lại.

## Phép tính lãi kép của sự mất mát

Dùng quy tắc số 72 theo chiều ngược — 72 chia cho tỷ lệ lạm phát cho ra số năm để sức mua giảm một nửa:

| Lạm phát trung bình | Sức mua giảm nửa sau |
| --- | --- |
| 2% | ~36 năm |
| 3% | ~24 năm |
| 5% | ~14 năm |
| 8% | ~9 năm |

Ở mức khiêm tốn 3%, 100 nghìn trong ngăn kéo của bạn trở thành, xét theo sức mua, khoảng 74 nghìn sau mười năm, 55 nghìn sau hai mươi năm, và 48 nghìn sau hai mươi tư năm. Không ai lấy trộm gì cả; chỉ là mọi thứ đều đắt lên.

## Danh nghĩa và thực: phân biệt duy nhất đáng kể

Một tài khoản tiết kiệm trả 2% trong khi lạm phát chạy 3% có **lợi suất thực khoảng −1%** — bạn đang mất sức mua dù số dư vẫn tăng. Luôn trừ lạm phát:

lợi suất thực ≈ lợi suất danh nghĩa − tỷ lệ lạm phát

Một phép trừ đơn lẻ này định hình lại phần lớn quyết định tiền bạc. "Khoản gửi của tôi trả 4%" chẳng nói lên điều gì cho tới khi bạn biết giá đang tăng 2% hay 6%. Trong lịch sử, các chỉ số cổ phiếu rộng đem lại lợi suất thực dương về dài hạn (khoảng 6–7% thực ở Mỹ qua những cửa sổ rất dài), còn tiền mặt và khoản gửi ngắn hạn lửng lơ quanh mức gần như bằng không thực — đôi khi âm.

## Lạm phát hại ai, và giúp ai

- **Hại**: người nắm tiền mặt và các khoản thu cố định — người gửi tiết kiệm ở tài khoản lãi thấp, ai nhận lương hưu cố định, người cho vay đã khóa lãi suất thấp.
- **Giúp**: người vay nợ lãi suất cố định (trả bằng đồng tiền rẻ hơn), và chủ sở hữu tài sản thực — doanh nghiệp, bất động sản, cổ phiếu — mà giá và thu nhập có xu hướng tăng theo mặt bằng giá theo thời gian.

Sự bất đối xứng đó là lý do "giữ toàn bộ khoản tiết kiệm hàng chục năm hoàn toàn bằng tiền mặt", trong lịch sử, là một trong những chiến lược thua đáng tin cậy nhất, dù cảm giác có vẻ an toàn nhất.

## Lạm phát đo được và lạm phát của riêng bạn

CPI chính thức theo dõi một rổ hàng trung bình toàn quốc. Tỷ lệ cá nhân của bạn khác đi tùy cuộc sống: người thuê nhà ở các thành phố nóng, cha mẹ đóng học phí, hay người hay đi lại có thể trải nghiệm lạm phát cao hơn hẳn con số tiêu đề; một chủ nhà đã an cư có thể trải qua mức thấp hơn. Hãy đánh giá tài chính của mình theo rổ hàng của bạn, không chỉ theo con số tiêu đề.

## Câu hỏi thường gặp

**Có chút lạm phát có tốt không?**
Phần lớn ngân hàng trung ương cố tình đặt mục tiêu ~2% — lạm phát nhẹ bôi trơn việc điều chỉnh lương và làm nản lòng việc tích trữ tiền mặt, trong khi giảm phát (giá rớt) thường đi kèm trì trệ kinh tế và làm nợ nặng thêm.

**Lạm phát có nghĩa là tôi nên tránh hết tiền mặt không?**
Không — nhiệm vụ của quỹ dự phòng là tính sẵn sàng, không phải tăng trưởng, và cái giá lạm phát của nó là phần bạn trả cho sự an toàn. Sai lầm là giữ tiền *chân trời hàng chục năm* dưới dạng tiền mặt.

**Cái gì chống lại lạm phát?**
Về dài hạn: tài sản sinh lợi (cổ phiếu rộng, bất động sản) và trái phiếu gắn với lạm phát. Về ngắn hạn, không gì hoàn hảo — đó là lý do việc khớp tài sản với chân trời thời gian mới quan trọng.${NOTE}`,
  },
  {
    topicKey: 'emergency-fund',
    title: 'Quỹ dự phòng của bạn nên lớn cỡ nào?',
    question: 'Tôi nên giữ quỹ dự phòng bằng bao nhiêu tháng chi tiêu, và để ở đâu?',
    summary:
      'Câu trả lời tiêu chuẩn là 3–6 tháng chi tiêu thiết yếu, ở dạng lấy ra được ngay và không rủi ro — nhiều hơn nếu thu nhập của bạn bấp bênh. Nhiệm vụ của nó là bảo hiểm, không phải lợi nhuận: nó ngăn vận rủi biến thành nợ.',
    tags: ['tài chính', 'tiết kiệm', 'quỹ dự phòng', 'lập ngân sách'],
    language: 'vi',
    image: {
      prompt: promptOf('emergency-fund'),
      alt: 'Quả cầu trên đệm trong két kính, vòm chắn gạt đi các mảnh bão',
    },
    sources: [
      { title: 'Cục Bảo vệ Tài chính Người tiêu dùng Hoa Kỳ (CFPB) — hướng dẫn tiết kiệm dự phòng', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# Quỹ dự phòng của bạn nên lớn cỡ nào?

Quỹ dự phòng là khoản tiền mà nhiệm vụ duy nhất là hấp thụ các cú sốc — mất việc, viện phí, chiếc xe chết máy đúng tuần bình nóng lạnh cũng hỏng. Hướng dẫn tiêu chuẩn là **3–6 tháng chi tiêu thiết yếu**, để ở chỗ nào đó nhàm chán, dễ lấy và không rủi ro. Nó sinh lời ít theo đúng thiết kế: bạn đang mua bảo hiểm, và phần lợi suất phải bỏ qua chính là phí bảo hiểm.

## Định cỡ một cách thành thật

Đếm chi tiêu *thiết yếu* hằng tháng — nhà ở, ăn uống, điện nước, bảo hiểm, đi lại, khoản trả nợ tối thiểu — chứ không phải toàn bộ mức sống. Rồi nhân lên theo độ mong manh của thu nhập:

| Tình huống | Mục tiêu hợp lý |
| --- | --- |
| Hai nguồn lương ổn định trong nhà | 3 tháng chi tiêu thiết yếu |
| Một nguồn lương ổn định | 4–6 tháng |
| Thu nhập tự do / hoa hồng / theo mùa | 6–12 tháng |
| Một nguồn thu + người phụ thuộc + thị trường việc làm eo hẹp | hướng tới 12 tháng |
| Rủi ro đã biết sắp xảy đến (có tin cắt giảm, hợp đồng sắp hết) | càng nhiều càng tốt, ngay bây giờ |

Khuôn mẫu: quỹ bao phủ khoảng trống thực tế giữa lúc mất thu nhập và lúc thay được nó, cộng các cú sốc cỡ "mức khấu trừ" dọc đường.

## Để ở đâu

Ba yêu cầu: **lấy ra trong vài ngày chứ không phải vài tuần; không mất giá trị danh nghĩa; tách khỏi tiền tiêu xài.** Tức là tài khoản tiết kiệm lãi cao, quỹ thị trường tiền tệ, hoặc khoản gửi ngắn hạn rút được mà không bị phạt. Nó loại trừ cổ phiếu (có thể đang giảm 30% đúng tháng bạn cần), các khoản khóa dài, và bất cứ thứ gì mà bán đi bạn còn phải lưỡng lự. Để nó ở ngân hàng khác với tài khoản chi tiêu hằng ngày sẽ thêm chút ma sát hữu ích chống lại việc "mượn tạm" từ nó.

## Vì sao không đem nó đi đầu tư?

Vì khủng hoảng thường tương quan với suy thoái. Kịch bản thất bại kinh điển: suy thoái ập đến, bạn mất việc *đồng thời* thị trường cổ phiếu giảm 35%, nên "quỹ dự phòng để trong quỹ chỉ số" trả tiền đúng lúc nó nhỏ nhất. Giá trị của quỹ là nó không tương quan với vận may của bạn. Đúng, lạm phát gặm nó — đó là cái giá của bảo hiểm, và nó rẻ hơn việc bán tháo khoản đầu tư ở đáy hoặc gánh nợ thẻ tín dụng lãi 20%/năm.

## Gây dựng từ con số không

Một trình tự hữu ích: trước tiên đi trước một tháng (việc này dập tắt phần lớn căng thẳng "ăn bữa nay lo bữa mai"), rồi tiến tới ba tháng trong khi trả ít nhất mức tối thiểu mọi khoản nợ, rồi xem lại liệu nợ lãi cao hay phần còn lại của quỹ nên được ưu tiên — về mặt toán học, trả một thẻ lãi 20%/năm là một "lợi suất" không thể đánh bại, nên nhiều người dừng ở một tháng, dọn sạch nợ độc hại, rồi hoàn tất quỹ.

## Câu hỏi thường gặp

**Thẻ tín dụng có phải một quỹ dự phòng chấp nhận được không?**
Nó là *cây cầu* dự phòng, không phải *quỹ* — ổn cho 48 giờ trước khi tiền tiết kiệm chuyển tới, tệ khi làm kế hoạch chính, vì những trường hợp khẩn cấp đáng kể nhất (mất việc) đúng là lúc gánh nợ 20%/năm đau nhất.

**Quỹ có nên tăng theo thu nhập của tôi không?**
Nó nên tăng theo *chi tiêu và nghĩa vụ* của bạn. Một khoản tăng lương mà bạn tiết kiệm không đòi hỏi một quỹ lớn hơn; một khoản vay mua nhà và hai đứa con thì có.

**Cái gì được tính là khẩn cấp?**
Bất ngờ, cần thiết, cấp bách — chọn cả ba. Một đợt vé máy bay giảm giá trượt cả ba; một hộp số hỏng mà bạn cần để đi làm thì đạt cả ba.${NOTE}`,
  },
  {
    topicKey: 'stocks-vs-bonds',
    title: 'Cổ phiếu so với trái phiếu: khác biệt thực sự là gì?',
    question: 'Khác biệt thực sự giữa cổ phiếu và trái phiếu là gì, và chúng hành xử khác nhau ra sao?',
    summary:
      'Cổ phiếu là quyền sở hữu — lợi suất của bạn tùy doanh nghiệp làm ăn ra sao. Trái phiếu là một khoản cho vay — lợi suất của bạn là một hợp đồng. Đúng một khác biệt ấy giải thích vì sao cổ phiếu kiếm nhiều hơn trung bình và vì sao trái phiếu làm danh mục vững hơn.',
    tags: ['tài chính', 'đầu tư', 'cổ phiếu', 'trái phiếu'],
    language: 'vi',
    image: {
      prompt: promptOf('stocks-vs-bonds'),
      alt: 'Sống núi gồ ghề đi lên cạnh một cầu thang đều đặn thoai thoải bằng ánh sáng',
    },
    sources: [
      { title: 'Investor.gov (SEC Hoa Kỳ) — nhập môn cổ phiếu và trái phiếu', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) — dữ liệu lợi suất lịch sử', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Cổ phiếu so với trái phiếu: khác biệt thực sự là gì?

Một **cổ phiếu** biến bạn thành đồng chủ một doanh nghiệp: bạn chia phần lợi nhuận (cổ tức, tăng trưởng) lẫn thất bại của nó, không lời hứa nào cả. Một **trái phiếu** biến bạn thành chủ nợ của một doanh nghiệp hoặc chính phủ: họ nợ bạn lãi cố định và hoàn vốn vào một ngày, theo hợp đồng. Mọi thứ khác — khoảng cách lợi suất, khoảng cách rủi ro, cách danh mục pha trộn chúng — đều suy ra từ "sở hữu so với cho vay".

## Thỏa thuận mà mỗi loại đưa ra

| | Cổ phiếu (sở hữu) | Trái phiếu (cho vay) |
| --- | --- | --- |
| Lợi suất của bạn | Phần còn lại sau khi mọi người được trả — không trần | Lãi định kỳ cố định + hoàn vốn — có trần |
| Nếu công ty phát đạt | Bạn hưởng phần tăng trưởng | Bạn vẫn nhận đúng các khoản lãi đó |
| Nếu nó thất bại | Bạn xếp cuối hàng, thường mất trắng | Chủ nợ được trả trước chủ sở hữu |
| Rủi ro chính | Kết quả kinh doanh, tâm lý thị trường | Vỡ nợ, lạm phát, lãi suất tăng |
| Lợi suất thực dài hạn (Mỹ, cửa sổ rất dài) | ~6–7% mỗi năm | ~1–3% mỗi năm |
| Năm tệ điển hình | −20% đến −50% | −5% đến −15% (cú sốc lãi suất) |

Lợi suất trung bình cao hơn của cổ phiếu không phải tiền thưởng; nó là khoản trả cho việc bạn chấp nhận bất định và vị trí cuối hàng. Tài chính gọi nó là phần bù rủi ro vốn cổ phần.

## Cái gì làm giá trái phiếu biến động

Trái phiếu không bất động: giá trái phiếu giao dịch trên thị trường biến động ngược với lãi suất. Nếu bạn giữ một trái phiếu trả 2% và trái phiếu mới trả 5%, không ai mua của bạn theo mệnh giá — giá của nó rớt cho tới khi lợi suất bằng nhau. Trái phiếu kỳ hạn dài hơn dao động mạnh hơn. Đây là lý do ngay cả các quỹ trái phiếu "an toàn" cũng có một năm tệ trong lịch sử khi lãi suất nhảy vọt, và vì sao trái phiếu giảm chứ không xóa được rủi ro.

## Vì sao danh mục pha trộn cả hai

Cổ phiếu và trái phiếu thường (không phải luôn luôn) lên xuống lệch nhịp: suy thoái nghiền nát cổ phiếu thường kéo theo cắt lãi suất, làm trái phiếu chất lượng cao tăng giá. Một hỗn hợp 60/40 kinh điển trong lịch sử nắm được phần lớn tăng trưởng của cổ phiếu với mức sụt đáng kể nhỏ hơn. Hỗn hợp là một nút vặn:

- **Nhiều cổ phiếu hơn** → tăng trưởng kỳ vọng cao hơn, các đợt sụt lớn hơn và dài hơn. Hợp với chân trời dài.
- **Nhiều trái phiếu hơn** → hành trình êm hơn, tăng trưởng kỳ vọng thấp hơn. Hợp với nhu cầu gần và tim yếu.

Vặn đúng mức tùy thuộc khi nào bạn cần tiền và bạn hành xử thế nào khi sụp đổ — bán cổ phiếu trong hoảng loạn tốn kém hơn bất kỳ sai lầm phân bổ nào.

## Câu hỏi thường gặp

**Trái phiếu có "an toàn" không?**
An toàn hơn cổ phiếu trước nguy cơ doanh nghiệp thất bại; không an toàn trước lạm phát hay biến động lãi suất. Một trái phiếu chính phủ giữ đến đáo hạn trả đúng dòng tiền đã hứa — mà lạm phát có thể đã âm thầm làm mất giá.

**Tôi cần trái phiếu riêng lẻ hay một quỹ trái phiếu?**
Quỹ cho phân tán và thanh khoản dễ dàng; trái phiếu riêng lẻ cho một ngày trả tiền đã biết. Với đa số người tiết kiệm, một quỹ trái phiếu chất lượng cao, rộng là công cụ đơn giản hơn.

**Sao không 100% cổ phiếu khi tôi còn trẻ?**
Bảo vệ được về mặt toán học với chân trời hàng chục năm và kỷ luật thép. Rủi ro thành thật nằm ở hành vi: một đợt sụt 45% thử thách kỷ luật theo cách bảng tính không thể nắm bắt.${NOTE}`,
  },
  {
    topicKey: 'dollar-cost-averaging',
    title: 'Đầu tư đều đặn (trung bình giá) là gì — và khi nào nó hợp lý?',
    question: 'Đầu tư đều đặn (DCA) là gì, và nó có tốt hơn việc bỏ một cục tiền vào một lần không?',
    summary:
      'Đầu tư đều đặn bỏ một số tiền cố định theo lịch cố định, mua nhiều phần hơn khi giá thấp. Với người tiết kiệm từ lương, nó diễn ra tự nhiên; với một khoản tiền lớn bất ngờ, bỏ một cục thường thắng về toán học — DCA thắng về tâm lý.',
    tags: ['tài chính', 'đầu tư', 'đầu tư đều đặn', 'chiến lược'],
    language: 'vi',
    image: {
      prompt: promptOf('dollar-cost-averaging'),
      alt: 'Những giọt sáng đều rơi theo nhịp đều đặn xuống một hồ phẳng ổn định',
    },
    sources: [
      { title: 'Bogleheads wiki — Dollar cost averaging', url: 'https://www.bogleheads.org/wiki/Dollar_cost_averaging' },
      { title: 'Investor.gov (SEC Hoa Kỳ) — kiến thức cơ bản về đầu tư', url: 'https://www.investor.gov' },
    ],
    content: `# Đầu tư đều đặn (trung bình giá) là gì — và khi nào nó hợp lý?

Đầu tư đều đặn (DCA — trung bình giá) nghĩa là bỏ cùng một số tiền vào những khoảng đều nhau — chẳng hạn 5 triệu vào ngày mùng một mỗi tháng — bất kể thị trường đang làm gì. Số tiền cố định mua được nhiều phần hơn khi giá thấp và ít hơn khi giá cao, và nó loại bỏ câu hỏi tệ nhất trong đầu tư ("bây giờ có phải lúc tốt không?") bằng cách biến canh thời điểm thành một việc không phải quyết định.

## Phép tính

Bỏ 3 triệu mỗi tháng vào một quỹ có giá dập dềnh:

| Tháng | Giá | Số phần mua được |
| --- | --- | --- |
| Tháng 1 | 30 | 10,0 |
| Tháng 2 | 20 | 15,0 |
| Tháng 3 | 25 | 12,0 |
| Tháng 4 | 30 | 10,0 |

Bạn chi 12 triệu cho 47 phần — giá vốn trung bình ~25,5 mỗi phần, *thấp hơn* giá trung bình đơn giản (26,25), vì ngân sách cố định tự động dồn trọng số vào tháng rẻ. Đó là lợi thế cơ học: mua đáy có kỷ luật mà không cần dự báo gì cả.

## Hai tình huống rất khác nhau

**1. Đầu tư từ lương (đa số người).** DCA không phải lựa chọn chiến lược — nó là cách duy nhất, vì tiền về theo từng tháng. Tự động hóa nó là thắng hoàn toàn: không phải quyết định, không chần chừ giữa những dòng tin đáng sợ, hàng chục năm kỷ luật cưỡng bức.

**2. Đầu tư một khoản tiền lớn bất ngờ (thưởng, thừa kế, bán tài sản).** Ở đây bạn *có thể* bỏ hết hôm nay hoặc trải ra trong một năm. Về mặt toán học, bỏ một cục trong lịch sử đã thắng việc trải ra khoảng hai trên ba lần, đơn giản vì thị trường tăng thường xuyên hơn giảm và DCA giữ tiền đứng bên lề. Nhưng một phần ba số lần nó thua, nó thua đúng vào thời khắc tâm lý tệ nhất — ngay sau khi bạn vừa bỏ hết vào.

| | Bỏ một cục | DCA trong ~12 tháng |
| --- | --- | --- |
| Kết quả kỳ vọng | Cao hơn (ở trong thị trường lâu hơn) | Hơi thấp hơn |
| Cảm giác trường hợp xấu nhất | Tàn khốc (all-in ngay trước cú sụp) | Có đệm |
| Rủi ro chẳng bao giờ đầu tư | Thấp một khi đã xong | "Tạm dừng" giữa chừng rất hay xảy ra |

Câu trả lời thực dụng: nếu một tháng tệ sẽ khiến bạn bỏ kế hoạch hoặc mất ngủ, hãy DCA khoản tiền lớn đó trong 6–12 tháng theo một lịch viết ra giấy — một chi phí kỳ vọng nhỏ đổi lấy một sự đảm bảo lớn về hành vi. Nếu bạn thật sự có thể nhún vai trước biến động, hãy bỏ hết vào và đi tiếp.

## DCA âm thầm thất bại ở đâu

DCA vào một cổ phiếu đơn lẻ là trung bình giá vào một thứ có thể không bao giờ hồi phục — cơ chế chỉ "mua đáy" một cách hữu ích khi tài sản được phân tán rộng và nghiêng lên về dài hạn. Và dừng góp tiền trong các đợt sụp đổ xóa sạch toàn bộ ý nghĩa: những phần rẻ chính là thứ mà chiến lược này tồn tại để mua.

## Câu hỏi thường gặp

**DCA có đảm bảo có lời không?**
Không — nó định hình *khi nào* bạn mua, không định hình việc tài sản có tăng hay không. Một tài sản đang rớt vẫn lỗ, chỉ là từ một giá vốn trung bình thấp hơn.

**Theo tuần hay theo tháng?**
Trên thực tế gần như giống hệt qua nhiều năm. Khớp với kỳ lương rồi quên nó đi; tranh cãi tần suất là chuyện vặt.

**Tôi có nên tạm dừng DCA khi thị trường trông đắt không?**
Đó là canh thời điểm khoác áo cải trang. Giá trị của chiến lược chính là ở chỗ nó phớt lờ cảm giác của bạn về định giá.${NOTE}`,
  },
  {
    topicKey: 'asset-allocation',
    title: 'Phân bổ tài sản và tái cân bằng, giải thích đơn giản',
    question: 'Phân bổ tài sản là gì, và tái cân bằng thực sự hoạt động ra sao?',
    summary:
      'Phân bổ tài sản — tỷ lệ giữa cổ phiếu, trái phiếu và tiền mặt — quyết định phần lớn rủi ro và hành xử dài hạn của danh mục, hơn hẳn việc chọn quỹ. Tái cân bằng giữ tỷ lệ ấy đúng mục tiêu bằng cách xén bớt phần thắng và bù thêm phần thua.',
    tags: ['tài chính', 'đầu tư', 'phân bổ tài sản', 'danh mục'],
    language: 'vi',
    image: {
      prompt: promptOf('asset-allocation'),
      alt: 'Biểu đồ tròn ba phần phát sáng được giữ cân bằng trên một giá cân',
    },
    sources: [
      { title: 'Bogleheads wiki — Phân bổ tài sản', url: 'https://www.bogleheads.org/wiki/Asset_allocation' },
      { title: 'Investor.gov (SEC Hoa Kỳ) — kiến thức cơ bản về phân bổ tài sản', url: 'https://www.investor.gov' },
    ],
    content: `# Phân bổ tài sản và tái cân bằng, giải thích đơn giản

Phân bổ tài sản là tỷ lệ phần trăm danh mục của bạn chia trên các lớp tài sản — thường là cổ phiếu để tăng trưởng, trái phiếu để ổn định, tiền mặt để dùng ngay. Đó là quyết định duy nhất chi phối cách danh mục của bạn hành xử: nghiên cứu lùi lại hàng chục năm quy phần lớn *biến động* lợi suất của một danh mục phân tán cho cách phân bổ của nó, chứ không phải cho việc quỹ hay cổ phiếu cụ thể nào lấp đầy các giỏ.

## Vì sao tỷ lệ quan trọng hơn việc chọn món

Hai nhà đầu tư cùng nắm những quỹ tuyệt vời, phí thấp sẽ có trải nghiệm hoàn toàn khác nhau nếu một người 90% cổ phiếu còn người kia 30%. Nhà đầu tư 90/10 nên kỳ vọng tăng trưởng dài hạn gần gấp đôi — và các đợt sụt gần −45% trong những cú sụp tệ. Nhà đầu tư 30/70 bỏ đi phần lớn tăng trưởng để đổi lấy các đợt giảm hiếm khi vượt −15%. Không ai sai cả; họ đang trả lời những câu hỏi khác nhau: *khi nào cần tiền, và người này chịu đựng qua được mức nào mà không hoảng loạn?*

Một bản đồ thô:

| Cần tiền trong… | Hình dạng phân bổ thường gặp |
| --- | --- |
| < 3 năm | Chủ yếu tiền mặt và trái phiếu ngắn |
| 3–10 năm | Cân bằng, ví dụ 40–60% cổ phiếu |
| 10–30+ năm | Nặng cổ phiếu, ví dụ 70–90% cổ phiếu |

Những công thức kiểu "110 trừ đi tuổi của bạn ra tỷ lệ cổ phiếu" là điểm xuất phát thô — hữu ích để neo, không phải luật. Năng lực chịu rủi ro (chân trời, độ ổn định thu nhập) và mức chịu đựng rủi ro (cái bạn ngủ yên được qua nó) đều quan trọng, và cái thấp hơn trong hai cái nên thắng.

## Tái cân bằng là gì

Thị trường biến động; tỷ lệ của bạn trôi đi. Sau một năm cổ phiếu rực rỡ, một danh mục 60/40 có thể nằm ở 70/30 — âm thầm rủi ro hơn mức bạn chọn. Tái cân bằng bán bớt cái đã tăng và mua cái đã tụt lại, đưa về mục tiêu. Đó là bảo trì rủi ro, không phải đuổi theo lợi suất: bạn đang chốt lời một cách có hệ thống từ phía đắt và bù thêm cho phía rẻ, đúng lịch, mà không dự báo gì.

Hai cò kích hoạt khả thi — chọn một và tự động hóa:

- **Theo lịch**: một hoặc hai lần mỗi năm, cùng một ngày.
- **Theo ngưỡng**: tái cân bằng khi bất kỳ tài sản nào trôi quá ~5 điểm phần trăm so với mục tiêu.

Với người vẫn đang tiết kiệm, cách rẻ nhất là **tái cân bằng bằng các khoản góp**: hướng tiền mới vào bất cứ thứ gì đang dưới mục tiêu, tránh hoàn toàn việc bán (cùng mọi thuế hay phí).

## Kỷ luật mà nó áp đặt

Siêu năng lực thầm lặng của tái cân bằng nằm ở hành vi: nó buộc bạn mua cổ phiếu sau các cú sụp (khi mục tiêu nói bạn đang thiếu tỷ trọng) và xén bớt sau cơn hưng phấn — đúng những lệnh mà cảm xúc cưỡng lại. Nhà đầu tư tái cân bằng xuyên 2008–09 đã mua gần đáy một cách máy móc mà không cần can đảm, chỉ cần một quy tắc.

## Câu hỏi thường gặp

**Tái cân bằng có làm tăng lợi suất không?**
Đôi khi tăng nhẹ (giữa các tài sản lợi suất tương tự), đôi khi nó tốn một chút (xén bớt một đợt tăng dài). Sản phẩm thực của nó là giữ rủi ro ở mức bạn đã chọn.

**Mục tiêu nên chính xác đến đâu?**
Số tròn, biên độ rộng. 58/42 so với 60/40 là nhiễu; biến phân bổ thành việc chỉnh sửa liên miên là phá hỏng thiết kế.

**Các tài sản khác — bất động sản, vàng, tiền mã hóa — đặt vào đâu?**
Như những lát cắt có chủ đích, có giới hạn (thường ≤5–10% mỗi loại) thêm vào để phân tán — định cỡ sao cho dù sai hoàn toàn về chúng cũng không thay đổi cuộc đời bạn.${NOTE}`,
  },
  {
    topicKey: 'market-timing',
    title: 'Vì sao canh thời điểm thị trường lại khó đến thế (kể cả với dân chuyên nghiệp)',
    question: 'Vì sao canh thời điểm thị trường bị coi là gần như bất khả thi, ngay cả với dân chuyên nghiệp?',
    summary:
      'Canh thời điểm đòi hỏi đúng hai lần — bán trước khi rớt và mua trước khi tăng — chống lại những mức giá đã gói sẵn kỳ vọng. Chỉ cần bỏ lỡ một nhúm ngày tốt nhất, vốn dồn cục bên trong các đợt sụp, là đủ phá tan hàng chục năm lợi suất.',
    tags: ['tài chính', 'đầu tư', 'canh thời điểm', 'hành vi'],
    language: 'vi',
    image: {
      prompt: promptOf('market-timing'),
      alt: 'Những mũi tên cố nhưng hơi trượt khỏi đỉnh và đáy của một con sóng',
    },
    sources: [
      { title: 'SPIVA — bảng so kè quản lý chủ động và tính bền của thành tích', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Aswath Damodaran (NYU Stern) — dữ liệu và phân tích thị trường', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Vì sao canh thời điểm thị trường lại khó đến thế (kể cả với dân chuyên nghiệp)

Canh thời điểm thị trường — thoát ra trước các đợt giảm và quay vào trước các đợt hồi phục — thất bại không phải vì người ta ngốc, mà vì cuộc chơi về mặt cấu trúc gài sẵn để bất lợi cho người chơi. Bạn phải đúng **hai lần**, về **thời điểm**, chống lại **những mức giá đã chứa sẵn đồng thuận**, trong khi những ngày sinh lời lại nấp **bên trong những tuần đáng sợ nhất**. Mỗi trở ngại đứng một mình đã khó; nhân lại với nhau, chúng giải thích vì sao chiến lược canh thời điểm trông tuyệt vời trong các câu chuyện và nghèo nàn trong kết quả đã kiểm toán.

## Bốn vấn đề cấu trúc

**1. Hai lần phán đoán đúng, sai số nhân lên.** Thoát ra đúng cũng vô giá trị trừ khi bạn còn vào lại đúng. Một người chính xác 70% mỗi lần phán đoán — tốt hơn nhiều so với bằng chứng cho thấy — chỉ đúng cả vòng khứ hồi khoảng ~49% số lần, trước khi tính chi phí.

**2. Giá động trước.** Thị trường nhìn về phía trước: đến khi suy thoái lên bản tin, giá đã rớt từ mấy tháng trước; các đợt hồi phục cũng vậy, bắt đầu giữa lúc tin tức kinh hoàng, khi mua vào có cảm giác điên rồ. Hành động theo cái đang diễn ra rõ ràng tức là giao dịch dựa trên thông tin đã nằm trong giá.

**3. Những ngày tốt nhất dồn cục bên trong những quãng tệ nhất.** Các nghiên cứu dài hạn liên tục cho thấy chỉ cần bỏ lỡ 10–20 ngày tốt nhất trong *hàng chục năm* là cắt giảm tài sản cuối cùng một cách kịch tính — thường tới một nửa hoặc hơn — và những ngày đó áp đảo xảy ra trong các đợt sụp và đợt bật lại ngay sau đó, đúng lúc một người canh thời điểm đang ngồi ôm tiền mặt "chờ rõ ràng".

**4. Tỷ lệ nền trừng phạt sự vắng mặt.** Cổ phiếu tăng trong phần lớn các năm; tiền mặt đứng bên lề mặc định phải trả một chi phí cơ hội. Người canh thời điểm không chỉ cần đúng — họ cần đúng *nhiều hơn* mức trôi đi lên của thị trường cộng thuế và chi phí giao dịch.

## Thành tích của dân chuyên nghiệp cho thấy gì

Hàng chục năm bảng so kè SPIVA cho thấy đa số quỹ chuyên nghiệp — kể cả các quỹ chiến thuật và "phân bổ linh hoạt" mà toàn bộ sứ mệnh là canh thời điểm — thua các chuẩn tham chiếu đơn giản qua các cửa sổ dài, và số ít người thắng hiếm khi lặp lại. Các dự báo được khảo sát về "chỉ số sẽ ở đâu sau một năm" trượt xa thường xuyên. Đây là sự thật thực nghiệm vững nhất trong đầu tư cá nhân, và là lý do những lời khuyên nhàm chán thống trị.

## Cái gì hiệu quả thay vào đó

Không phải dự đoán — mà là *cam kết trước*:

| Thay vì… | Hãy… |
| --- | --- |
| "Tôi sẽ thoát ra trước cú sụp tới" | Giữ một phân bổ mà trường hợp xấu nhất bạn sống sót được |
| "Tôi sẽ mua lại ở đáy" | Tự động hóa các khoản góp mua đều mỗi tháng, kể cả những tháng kinh khủng |
| "Ôm tiền mặt cho tới khi mọi thứ rõ ràng hơn" | Chấp nhận rằng sự rõ ràng và giá thấp không bao giờ cùng tồn tại |
| Phản ứng theo tin tiêu đề | Tái cân bằng theo quy tắc lịch/ngưỡng |

Điều này biến canh thời điểm từ một bài toán dự báo (không thắng nổi) thành một bài toán thiết kế (rất khả thi để thắng).

## Câu hỏi thường gặp

**"Mua khi giá giảm" có phải canh thời điểm không?**
Ôm tiền mặt *chờ* các đợt giảm thì có — và trong lịch sử thua việc đơn giản ở lại trong thị trường. Đưa tiền mới về theo lịch vào những đợt giảm chỉ là kỷ luật góp đều.

**Chẳng phải có người nổi tiếng đã đoán đúng các cú sụp lớn sao?**
Luôn có người làm được — mỗi lần một người khác. Phân biệt tầm nhìn với một mẫu lớn những lời đoán lớn tiếng, sau khi sự việc xảy ra, là gần như bất khả thi; đặt cược tiền tiết kiệm vào việc nhận diện trước người đó là cách học thống kê tốn kém nhất.

**Vậy giá không bao giờ đoán được sao?**
Hướng đi ngắn hạn: trên thực tế là không, vì mục đích thực dụng. Lợi suất kỳ vọng dài hạn liên hệ lỏng lẻo với định giá — hữu ích để đặt kỳ vọng, vô dụng làm tín hiệu thoát ra.${NOTE}`,
  },
  {
    topicKey: 'etf-vs-mutual-fund',
    title: 'ETF so với quỹ tương hỗ: nên dùng lớp vỏ nào?',
    question: 'Khác biệt giữa ETF và quỹ tương hỗ là gì, và tôi nên chọn loại nào?',
    summary:
      'ETF và quỹ tương hỗ là những lớp vỏ bọc cùng một ý tưởng — đầu tư gom chung, phân tán. ETF giao dịch như cổ phiếu cả ngày với chi phí thường thấp hơn; quỹ tương hỗ định giá một lần mỗi ngày và tự động hóa khoản góp mượt hơn. Chiến lược bên trong quan trọng hơn lớp vỏ.',
    tags: ['tài chính', 'đầu tư', 'etf', 'quỹ'],
    language: 'vi',
    image: {
      prompt: promptOf('etf-vs-mutual-fund'),
      alt: 'Một giỏ khối trên băng chuyền nhanh, một giỏ được cân điềm tĩnh trên bệ',
    },
    sources: [
      { title: 'Investor.gov (SEC Hoa Kỳ) — Quỹ tương hỗ và ETF', url: 'https://www.investor.gov' },
      { title: 'Morningstar — nghiên cứu quỹ và ETF', url: 'https://www.morningstar.com' },
    ],
    content: `# ETF so với quỹ tương hỗ: nên dùng lớp vỏ nào?

Một ETF (quỹ giao dịch trên sàn) và một quỹ tương hỗ có thể nắm *đúng cùng một danh mục* — cùng chỉ số, cùng cổ phiếu. Khác biệt là lớp vỏ: cách bạn mua, khi nào giá được chốt, nó tốn bao nhiêu, và thuế được tính ra sao. Chọn lớp vỏ là quyết định hậu cần, không phải quyết định chiến lược — và hậu cần vẫn dồn lại đáng kể qua hàng chục năm.

## Các khác biệt cơ học

| | ETF | Quỹ tương hỗ |
| --- | --- | --- |
| Giao dịch | Cả ngày trên sàn, như một cổ phiếu | Một lần mỗi ngày theo NAV đóng cửa |
| Mức tối thiểu | Một phần (hoặc một phần lẻ, tùy môi giới) | Thường có mức tối thiểu cố định (tùy nơi) |
| Chi phí điển hình | Thường là tỷ lệ chi phí thấp nhất; trả chênh lệch mua-bán khi giao dịch | Thấp với bản chỉ số; một số mang phí bán/12b-1 — tránh được |
| Đầu tư tự động | Tùy môi giới, ngày càng được hỗ trợ | Vốn có và liền mạch |
| Hiệu quả thuế (Mỹ) | Tạo/hoàn đổi "bằng hiện vật" thường giảm thiểu phân phối lãi vốn | Nhiều khả năng phân phối lãi chịu thuế hơn (tùy khu vực pháp lý) |
| Rủi ro hành vi | Khả năng giao dịch mời gọi chỉnh sửa | Định giá hằng ngày làm nản lòng lướt sóng |

## Khi nào mỗi lớp vỏ hợp hơn

**ETF tỏa sáng khi** bạn muốn phí thường xuyên thấp nhất, bạn đầu tư qua một tài khoản môi giới hiện đại, bạn quan tâm việc kiểm soát trong phiên hay tính minh bạch của danh mục, hoặc (ở một số khu vực, đáng chú ý là Mỹ) bạn muốn ít các khoản phân phối chịu thuế bất ngờ hơn trong một tài khoản chịu thuế.

**Quỹ tương hỗ tỏa sáng khi** ưu tiên là tự động hóa không ma sát — số tiền cố định hằng tháng, mua chính xác theo số tiền, tái đầu tư cổ tức, các kế hoạch hưu trí gắn với bảng lương — nơi "cài đặt rồi không bao giờ ngó lại" chính là toàn bộ vấn đề, và nơi bản chỉ số tốn gần như y hệt ETF tương đương.

## Những cái bẫy thực sự cần tránh

Cuộc tranh luận lớp vỏ làm xao nhãng những kiểu thất bại thực sự tốn tiền:

- **Quỹ phí cao trong bất kỳ lớp vỏ nào** — một tỷ lệ chi phí 1%+ cho mức tiếp cận kiểu chỉ số mới là thứ cần chạy trốn, không phải lớp vỏ.
- **Phí bán và hoa hồng định kỳ** trên một số quỹ tương hỗ — không bao giờ đáng trả cho mức tiếp cận hàng hóa phổ thông.
- **Cám dỗ giao dịch với ETF** — khả năng bán lúc 10:43 sáng giữa một dòng tin đáng sợ là tính năng với dân lướt và là lỗi với người tiết kiệm.
- **Các ETF ngách giao dịch thưa thớt** — chênh lệch rộng âm thầm đánh thuế mỗi giao dịch; các quỹ chính thống rộng không gặp vấn đề này.

## Câu hỏi thường gặp

**Loại nào an toàn hơn loại nào?**
Danh mục giống nhau thì mang rủi ro thị trường giống nhau. Cả hai lớp vỏ đều được quản lý chặt; cả hai đều không bảo vệ bạn khỏi việc thị trường rớt.

**Vì sao ETF thường thắng về thuế ở Mỹ?**
Việc tạo/hoàn đổi phần của chúng diễn ra "bằng hiện vật" với các nhà tạo lập thị trường, cho phép quỹ trút bỏ các vị thế đã tăng giá mà không phải bán — nên ít khoản phân phối lãi vốn rơi vào người nắm giữ hơn. Lợi thế thu nhỏ lại trong các tài khoản được miễn thuế và khác nhau theo từng quốc gia.

**Tôi có thể chỉ chọn theo tỷ lệ chi phí không?**
Gần như vậy: cùng một chỉ số, rồi chi phí trọn gói thấp nhất (tỷ lệ chi phí + chênh lệch điển hình), rồi lớp vỏ nào tự động hóa quy trình góp tiền của bạn tốt nhất. Chiến lược, tỷ lệ tiết kiệm và phân bổ vẫn lấn át tất cả những thứ này.${NOTE}`,
  },
  {
    topicKey: 'risk-and-return',
    title: 'Rủi ro và lợi suất: sự đánh đổi sau mỗi khoản đầu tư',
    question: 'Rủi ro và lợi suất liên hệ với nhau ra sao, và "rủi ro cao hơn, lợi suất cao hơn" thực sự nghĩa là gì?',
    summary:
      '"Rủi ro cao hơn, lợi suất cao hơn" thực ra nghĩa là lợi suất *kỳ vọng* cao hơn như khoản trả cho việc chấp nhận dải kết quả rộng hơn — kể cả những kết quả xấu. Hiểu biến động, mức sụt và bữa trưa miễn phí của phân tán biến câu sáo rỗng thành công cụ dùng được.',
    tags: ['tài chính', 'đầu tư', 'rủi ro', 'nền tảng'],
    language: 'vi',
    image: {
      prompt: promptOf('risk-and-return'),
      alt: 'Một quả cầu rực rỡ biến động và một quả cầu êm dịu cân trên bập bênh',
    },
    sources: [
      { title: 'Investor.gov (SEC Hoa Kỳ) — kiến thức cơ bản về rủi ro', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) — phần bù rủi ro và lợi suất', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Rủi ro và lợi suất: sự đánh đổi sau mỗi khoản đầu tư

"Rủi ro cao hơn, lợi suất cao hơn" là câu bị trích sai nhiều nhất trong tài chính. Phiên bản chính xác: những khoản đầu tư có dải kết quả rộng hơn, đáng sợ hơn buộc phải đem lại lợi suất **kỳ vọng** cao hơn, nếu không sẽ chẳng ai nắm giữ. Phần lợi suất tăng thêm là *khoản đền bù*, trả trung bình và theo thời gian — không phải phần thưởng phát cho mọi người dám liều. Vô số rủi ro chẳng trả gì cả; kỹ năng là biết rủi ro nào mang phần bù.

## "Rủi ro" ở đây thực sự nghĩa là gì

Vài thứ khác nhau đi chung dưới một từ:

- **Biến động** — giá trị nhảy nhót quanh năm này qua năm khác bao nhiêu. Phiền toái, nhưng sống sót được.
- **Mức sụt** — khoản lỗ từ đỉnh xuống đáy. Các thị trường cổ phiếu rộng đã nhiều lần rớt 30–50%; đó không phải kịch bản đuôi, mà là giá vé vào cửa.
- **Mất mát vĩnh viễn** — thứ duy nhất chí mạng: một công ty phá sản, một vụ cược tập trung nổ tung, hoặc *bạn* bán ở đáy và biến một đợt sụt tạm thời thành một mất mát vĩnh viễn.
- **Rủi ro hụt mục tiêu** — thứ âm thầm: đầu tư thận trọng đến mức tiền không lớn đủ cho mục đích của nó. Những lựa chọn "an toàn" mang nó theo cả mớ.

Biến động của một danh mục cổ phiếu phân tán phần lớn là tạm thời; sự sụp đổ của một cổ phiếu đơn lẻ thường là vĩnh viễn. Cùng một lớp tài sản, tính chất rủi ro khác nhau sâu sắc.

## Rủi ro nào trả phần bù — và rủi ro nào không

| Rủi ro | Có đền bù? | Vì sao |
| --- | --- | --- |
| Rủi ro thị trường cổ phiếu rộng | Có — phần bù vốn cổ phần | Không phân tán đi được; phải có ai đó gánh |
| Cho vay dài hơn / cho người vay yếu hơn | Có — phần bù kỳ hạn và tín dụng | Khả năng mất/xói mòn có thật |
| Nắm một cổ phiếu thay vì nhiều cổ phiếu | **Không** | Phân tán được — thị trường không trả cho rủi ro bạn có thể bỏ đi miễn phí |
| Đầu cơ kiểu xổ số | Trung bình âm | Bạn đang trả tiền cho giấc mơ |

Đây là điều sâu sắc và thực dụng nhất trong bảng: **phân tán loại bỏ rủi ro không được đền bù với chi phí bằng không** — thứ gần nhất với bữa trưa miễn phí trong tài chính. Tập trung chỉ hợp lý khi bạn có lợi thế thực sự hoặc niềm tin cỡ người trong cuộc; ngoài ra nó là rủi ro không công.

## Khớp rủi ro với mục đích

Năng lực chịu rủi ro do *thời gian* đặt: tiền cần năm sau không thể chịu đựng qua một đợt giảm 40%; tiền cần vào năm 2050 có thể phớt lờ cả tá đợt như thế. Mức chịu đựng rủi ro do *tính khí* đặt: phân bổ mà bạn từ bỏ trong hoảng loạn vốn chưa bao giờ là đúng, dù bảng tính nói gì đi nữa. Quy tắc thực dụng — gánh mức rủi ro *hữu ích* tối đa với tiền chân trời dài, và không rủi ro nào không được trả công, ở bất kỳ chân trời nào.

## Câu hỏi thường gặp

**Nếu cổ phiếu rủi ro hơn, vì sao cố vấn vẫn xếp người về hưu vào ít cổ phiếu?**
Vì hưu trí kéo dài hàng chục năm và lạm phát cũng là một rủi ro. Một lát cổ phiếu nhỏ đến vừa chống lại rủi ro hụt mục tiêu trong khi trái phiếu lo những năm trước mắt.

**Biến động có phải thước đo đúng của rủi ro không?**
Nó là đại lượng thay thế đo được, không phải sự thật. Với nhà đầu tư dài hạn, rủi ro thực là mất mát vĩnh viễn và không đạt mục tiêu — biến động chỉ quan trọng khi nó ép hoặc dọa bạn phải bán.

**Tôi có thể đạt lợi suất cao với rủi ro thấp không?**
Bất kỳ ai chào mời tổ hợp đó đều nhầm hoặc đang bán thứ gì đó. Các cơ hội rủi ro thấp/lợi suất cao có thật bị chênh lệch giá ăn sạch trong vài phút — chúng không tới được các tờ rơi quảng cáo.${NOTE}`,
  },
  {
    topicKey: 'credit-card-interest',
    title: 'Lãi thẻ tín dụng thực sự hoạt động ra sao (và vì sao nó cuộn như tuyết lăn)',
    question: 'Lãi thẻ tín dụng thực sự được tính ra sao, và vì sao nợ lớn nhanh đến vậy?',
    summary:
      'Thẻ tín dụng tính một trong những mức lãi cao nhất trong tài chính phổ thông — thường tương đương 15–25%/năm, sinh lãi kép theo ngày một khi bạn để dư nợ. Khoản trả tối thiểu được thiết kế để kéo dài nợ nhiều năm; hiểu cơ chế là lối thoát.',
    tags: ['tài chính', 'thẻ tín dụng', 'nợ', 'lãi suất'],
    language: 'vi',
    image: {
      prompt: promptOf('credit-card-interest'),
      alt: 'Cầu thang xoắn ốc nợ vươn lên từ một tấm thẻ cùng quả cầu tuyết lớn dần',
    },
    sources: [
      { title: 'Cục Bảo vệ Tài chính Người tiêu dùng Hoa Kỳ (CFPB) — tài nguyên về thẻ tín dụng', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# Lãi thẻ tín dụng thực sự hoạt động ra sao (và vì sao nó cuộn như tuyết lăn)

Thẻ tín dụng là hai sản phẩm trong cùng một phong bì: một công cụ thanh toán tuyệt vời nếu bạn trả hết dư nợ mỗi tháng, và một trong những khoản vay đắt nhất trong tài chính phổ thông nếu bạn không trả — thường tương đương 15–25%/năm, với lãi sinh lãi kép. Hiệu ứng tuyết lăn không phải ẩn dụ; đó là số học của lãi suất cao áp lên một dư nợ mà khoản trả tối thiểu hầu như không chạm tới.

## Cơ chế, từng bước một

- **Thời gian miễn lãi.** Trả *toàn bộ số dư sao kê* trước hạn và các giao dịch mua không tốn đồng lãi nào. Đây là chế độ duy nhất mà thẻ là công cụ quản lý tiền miễn phí.
- **Mất nó.** Để bất kỳ dư nợ nào quá hạn và lãi thường áp lên các giao dịch mua từ ngày đầu trở đi — thời gian miễn lãi biến mất cho tới khi bạn trả sạch dư nợ trở lại.
- **Lãi kép theo ngày.** Hầu hết thẻ tính lãi theo ngày: 20%/năm là ~0,0548% mỗi ngày áp lên số dư bình quân hằng ngày của bạn. Lãi cộng dồn lên lãi đã phát sinh trước đó — lãi kép làm việc chống lại bạn ở mức mà cổ phiếu chỉ dám mơ.
- **Cái bẫy trả tối thiểu.** Khoản tối thiểu thường ~1–3% dư nợ. Trên 50 triệu ở mức 20%/năm, riêng lãi năm đầu đã khoảng 10 triệu — một khoản tối thiểu 2% (1 triệu/tháng) hầu như không chạy nhanh hơn lãi, kéo việc trả nợ tới gần một thập kỷ và nhân lên cái giá thật của bất cứ thứ gì bạn đã mua.

## Vì sao món nợ này đứng trên gần như mọi thứ

Trả hết một dư nợ 20%/năm là, không rủi ro, một "lợi suất 20%" — tốt hơn bất kỳ khoản đầu tư chính đáng nào có thể đem lại một cách đáng tin cậy. Thứ tự thực dụng rất thẳng thừng:

| Số tiền có sẵn | Cách dùng tốt nhất, thường là |
| --- | --- |
| Đang gánh nợ thẻ ở 15–25% | Tấn công nó trước khi đầu tư vượt mức công ty thưởng thêm |
| Chọn trả thẻ nào trước | Lãi cao nhất trước ("tuyết lở") — tối ưu về toán học |
| Động lực là nút thắt cổ chai | Dư nợ nhỏ nhất trước ("tuyết lăn") — bám dính về tâm lý |

Cả hai cách sắp xếp đều thắng cách "trả tối thiểu khắp nơi" nhiều năm và nhiều triệu.

## Thoát ra, một cách cụ thể

Ngừng cộng thêm (chuyển chi tiêu hằng ngày sang thẻ ghi nợ trong lúc tấn công dư nợ); trả một khoản *cố định* mạnh tay thay vì khoản tối thiểu đang teo dần; cân nhắc chuyển dư nợ sang một thẻ khuyến mãi 0% *chỉ khi* có kế hoạch viết ra giấy để dọn sạch trong cửa sổ khuyến mãi (phí chuyển ~3–5%, và lãi sau khuyến mãi quay về mức tàn nhẫn); và coi hợp nhất bằng khoản vay cá nhân là giảm lãi, không phải sự xá tội — kiểu chi tiêu đã đắp nên dư nợ phải chấm dứt, nếu không nó sẽ đắp lại.

## Câu hỏi thường gặp

**Trả tối thiểu có bảo vệ điểm tín dụng của tôi không?**
Nó tránh được dấu trễ hạn, đúng — nhưng tỷ lệ sử dụng cao (dư nợ ÷ hạn mức) vẫn kéo điểm xuống. Về điểm số lẫn về chi phí, câu trả lời như nhau: hạ dư nợ xuống.

**Có đáng giữ một dư nợ nhỏ "để nuôi điểm tín dụng" không?**
Một lầm tưởng dai dẳng. Trả đủ vẫn xây cùng một lịch sử thanh toán và tốn không đồng lãi nào; giữ dư nợ chỉ làm giàu cho nhà phát hành thẻ.

**Rút tiền mặt có cùng mức lãi không?**
Thường tệ hơn: lãi cao hơn, một khoản phí trả trước, và **không có thời gian miễn lãi** — lãi bắt đầu ngay khoảnh khắc tiền rời máy. Đó là cái nút đắt nhất trên thẻ.${NOTE}`,
  },
  {
    topicKey: 'retirement-start-early',
    title: 'Vì sao tiết kiệm hưu trí sớm thắng việc để dành nhiều hơn về sau',
    question: 'Tôi nên bắt đầu tiết kiệm hưu trí sớm cỡ nào, và tuổi bắt đầu tạo khác biệt bao nhiêu?',
    summary:
      'Nhờ lãi kép, mỗi thập kỷ trì hoãn gần như làm gấp đôi khoản tiết kiệm hằng tháng cần thiết cho cùng một khoản hưu. Bắt đầu năm 25 thay vì 35 — cùng số tiền mỗi tháng — có thể về đích với gần gấp đôi số tiền.',
    tags: ['tài chính', 'hưu trí', 'tiết kiệm', 'lãi kép'],
    language: 'vi',
    image: {
      prompt: promptOf('retirement-start-early'),
      alt: 'Một dòng sợi khởi đầu sớm phình thành sông ánh sáng cạnh một dòng hẹp bắt đầu muộn',
    },
    sources: [
      { title: 'Investor.gov (SEC Hoa Kỳ) — Công cụ tính lãi kép', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Bogleheads wiki — điểm khởi đầu khi lập kế hoạch hưu trí', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Vì sao tiết kiệm hưu trí sớm thắng việc để dành nhiều hơn về sau

Tiết kiệm hưu trí có một biến số áp đảo, và nó không phải thu nhập, không phải việc chọn quỹ, thậm chí không phải tỷ lệ tiết kiệm — mà là **số năm tiền được sinh lãi kép**. Mỗi thập kỷ trì hoãn gần như làm gấp đôi số tiền bạn phải để dành mỗi tháng để tới cùng một chỗ. Những năm đầu có cảm giác vô nghĩa (số dư nhỏ, tăng trưởng không thấy) nhưng về mặt toán học lại là những năm giá trị nhất bạn từng có.

## Hai dòng thời gian song sinh

Cùng 5 triệu/tháng, cùng lợi suất trung bình 7%/năm, nghỉ hưu năm 65 tuổi:

| Tuổi bắt đầu | Số năm đầu tư | Tổng đã góp | Khoản cuối (xấp xỉ) |
| --- | --- | --- | --- |
| 25 | 40 | 2,4 tỷ | ~13,1 tỷ |
| 35 | 30 | 1,8 tỷ | ~6,1 tỷ |
| 45 | 20 | 1,2 tỷ | ~2,6 tỷ |

Người 25 tuổi chỉ góp nhiều hơn người 35 tuổi 600 triệu mà về đích với gần **7 tỷ nhiều hơn**. Lật ngược lại: để bằng khoản của người bắt đầu sớm, người 35 tuổi phải để dành khoảng 11 triệu/tháng, và người 45 tuổi khoảng 25 triệu — cái giá của sự trì hoãn, xuất hóa đơn hằng tháng.

## Vì sao tiền sớm lại đặc biệt

Một khoản góp ở tuổi 25 sinh lãi kép 40 năm — ở mức 7% nó nhân lên ~15×. Cùng khoản đó ở tuổi 55 nhân lên ~2×. Thập kỷ trước nghỉ hưu của bạn thường *kiếm* nhiều hơn số bạn *góp* trong đó, nhưng chỉ khi các thập kỷ trước đã xây nền móng để nó lớn lên. Lãi kép là một quả cầu tuyết: cú đẩy đầu tiên quan trọng nhất.

## Bắt đầu không hoàn hảo thắng bắt đầu muộn hơn

Trình tự ưu tiên phục vụ đa số người:

1. **Nhận đủ mọi khoản công ty thưởng thêm** — đó là một lợi suất tức thì 50–100%; không khoản đầu tư nào sánh kịp.
2. **Tự động hóa một tỷ lệ phần trăm, không phải một số tiền** — ngay cả 5–10% thu nhập ở tuổi 25 cũng vượt 20% ở tuổi 40. Tăng nó một điểm với mỗi lần tăng lương.
3. **Mặc định chọn các quỹ chỉ số rộng, phí thấp** bên trong bất kỳ tài khoản ưu đãi thuế nào nước bạn cung cấp — chân trời hàng chục năm chính là thứ mà các phân bổ nặng cổ phiếu sinh ra để dành cho.
4. **Đừng chờ "đúng thời điểm"** — với một chân trời 40 năm, mọi điểm xuất phát trong lịch sử, kể cả đêm trước các cú sụp, đều thắng việc chờ nhiều năm để có sự rõ ràng.

## Nếu bạn bắt đầu muộn

Phép toán khắc nghiệt hơn, không phải vô vọng: tỷ lệ tiết kiệm trở thành đòn bẩy (lãi kép có ít đường băng hơn, nên các khoản góp gánh phần nặng hơn), làm việc thêm dù chỉ 2–3 năm giúp gấp đôi (góp nhiều hơn, rút ít năm hơn), và phản ứng tệ nhất là với tay sang những khoản đầu tư xác suất kiểu xổ số để "đuổi kịp" — rủi ro trình tự trừng phạt đúng điều đó.

## Câu hỏi thường gặp

**Tôi có nên tiết kiệm hưu trí trong khi đang trả nợ không?**
Hãy nhận khoản công ty thưởng thêm kể cả khi đó (nó trả công vượt bất kỳ mức lãi thông thường nào); ngoài khoản thưởng thêm, nợ lãi cao thường đáng ưu tiên, nợ lãi thấp thường không.

**7% có phải giả định an toàn không?**
Đó là mức trung bình lịch sử dài hạn của chỉ số cổ phiếu, không phải bảo đảm — kế hoạch thực tế nên thử cả 4–6%. Lưu ý kết luận không đổi: mọi mức giả định đều tưởng thưởng người bắt đầu sớm.

**Tôi sẽ cần tổng cộng bao nhiêu?**
Một mốc lập kế hoạch thô: chi tiêu hằng năm × 25 (đảo ngược "quy tắc 4%") — tinh chỉnh về sau theo bức tranh lương hưu của nước bạn. Con số quan trọng ít hơn ở tuổi 25 so với thói quen; độ chính xác có thể chờ, lãi kép thì không.${NOTE}`,
  },
];
