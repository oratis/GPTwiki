import type { DraftArticle } from './types';
import { aiInPracticeEn } from './ai-in-practice.en';

// Batch: AI in Practice (bản tiếng Việt bản địa / mở rộng ngôn ngữ Phase 2).
// Dùng chung topicKey với bản en/zh/ja; ảnh hero tái sử dụng bản đã cache trên
// GCS theo từng topicKey (không phát sinh chi phí tạo ảnh mới). Nội dung được
// viết lại cho người đọc tiếng Việt, không phải dịch máy.

const promptOf = (key: string): string => {
  const hit = aiInPracticeEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const aiInPracticeVi: DraftArticle[] = [
  {
    topicKey: 'rag-vs-fine-tuning',
    title: 'RAG hay Fine-Tuning: Nên chọn cái nào?',
    question: 'Tôi nên dùng RAG hay fine-tuning để thích ứng một LLM với dữ liệu của mình?',
    summary:
      'RAG đưa kiến thức mới, có thể kiểm chứng vào lúc truy vấn, còn fine-tuning thay đổi cách mô hình hành xử. Hầu hết các nhóm nên bắt đầu bằng RAG và chỉ thêm fine-tuning khi cần văn phong, định dạng hay độ trễ.',
    tags: ['ai', 'llm', 'rag', 'fine-tuning', 'học máy'],
    language: 'vi',
    image: { prompt: promptOf('rag-vs-fine-tuning'), alt: 'Đường ống truy xuất và lưới mô hình tinh chỉnh cùng đổ vào một lõi nơ-ron' },
    sources: [
      { title: 'Lewis và cộng sự, "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (2020)', url: 'https://arxiv.org/abs/2005.11401' },
      { title: 'Hu và cộng sự, "LoRA: Low-Rank Adaptation of Large Language Models" (2021)', url: 'https://arxiv.org/abs/2106.09685' },
      { title: 'Gao và cộng sự, "Retrieval-Augmented Generation for Large Language Models: A Survey" (2023)', url: 'https://arxiv.org/abs/2312.10997' },
    ],
    content: `# RAG hay Fine-Tuning: Nên chọn cái nào?

Trả lời ngắn gọn: nếu vấn đề của bạn là **mô hình biết gì**, hãy dùng sinh tăng cường truy xuất (RAG); nếu vấn đề là **mô hình hành xử ra sao**, hãy dùng fine-tuning. Hai kỹ thuật này không phải đối thủ — các hệ thống trưởng thành thường dùng cả hai — nhưng với khoản đầu tư đầu tiên, RAG rẻ hơn để xây, dễ cập nhật hơn và dễ kiểm tra hơn.

## Mỗi kỹ thuật thực sự làm gì

**RAG** giữ nguyên mô hình và thay đổi *đầu vào* của nó. Vào lúc truy vấn, một bộ truy xuất tìm trong tài liệu của bạn (thường qua embedding trong một chỉ mục vector), rồi dán những đoạn liên quan nhất vào prompt để mô hình trả lời dựa trên chúng. Kiến thức nằm trong một cơ sở dữ liệu bạn có thể chỉnh bất cứ lúc nào.

**Fine-tuning** thay đổi *trọng số* của mô hình. Bạn huấn luyện trên các cặp đầu vào–đầu ra mẫu để mô hình thấm nhuần một giọng điệu, một định dạng, một chính sách hay cách dùng từ chuyên ngành. Với các phương pháp tiết kiệm tham số như LoRA, việc này không còn đòi hỏi phần cứng khổng lồ — nhưng kết quả đã được nung vào trong cho tới khi bạn huấn luyện lại.

## Bảng quyết định

| Tình huống của bạn | Phù hợp hơn | Vì sao |
| --- | --- | --- |
| Sự kiện thay đổi hằng tuần (giá, chính sách, tài liệu) | RAG | Cập nhật chỉ mục, không phải mô hình |
| Câu trả lời phải dẫn nguồn | RAG | Đoạn truy xuất được dùng luôn làm trích dẫn |
| Kho riêng quá lớn để ghi nhớ hết | RAG | Truy xuất co giãn theo dung lượng lưu trữ, không theo tham số |
| Đầu ra phải tuân định dạng hay văn phong nghiêm ngặt | Fine-tuning | Văn phong là hành vi, không phải kiến thức |
| Cần một mô hình chuyên biệt nhỏ, nhanh, rẻ | Fine-tuning | Chưng cất tác vụ vào ít tham số hơn |
| Prompt phình to vì chỉ dẫn và ví dụ | Fine-tuning | Đưa chỉ dẫn lặp lại vào trọng số |
| Mô hình hiểu sai thuật ngữ chuyên ngành | Cả hai | Truy xuất cấp ngữ cảnh; tinh chỉnh sửa cách diễn giải |

## Khi nào RAG là nước đi đầu tiên đúng đắn

- **Tính mới**: kiến thức của bạn đổi nhanh hơn tốc độ bạn có thể huấn luyện lại.
- **Khả năng truy vết**: câu trả lời chịu quản lý và hướng tới khách hàng cần được neo theo kiểu "theo tài liệu X", điều này cũng giảm ảo giác một cách đo lường được.
- **Tốc độ lặp**: một bản mẫu chạy được chỉ tốn vài ngày kỹ thuật; không GPU, không phải gán nhãn dữ liệu huấn luyện.
- **Cô lập theo từng khách**: dữ liệu của mỗi khách hàng nằm trong chỉ mục riêng thay vì rò vào trọng số dùng chung.

Cái giá phải trả là thêm một bộ phận chuyển động: chia đoạn, embedding, chất lượng chỉ mục và đánh giá truy xuất trở thành một phần sản phẩm của bạn. Truy xuất tồi, chứ không phải mô hình, là điểm hỏng thường gặp nhất của các hệ thống RAG.

## Khi nào fine-tuning đáng đồng tiền bát gạo

- **Tuân thủ định dạng**: JSON luôn hợp lệ, một khung báo cáo cố định, giọng điệu của đội hỗ trợ.
- **Độ trễ và chi phí token**: một mô hình đã tinh chỉnh có thể bỏ các ví dụ few-shot và chỉ dẫn dài khỏi mỗi lượt gọi.
- **Chuyển năng lực sang mô hình nhỏ**: fine-tuning một mô hình mở gọn nhẹ cho một tác vụ hẹp có thể sánh ngang một mô hình tổng quát lớn hơn nhiều với chi phí phục vụ chỉ bằng một phần nhỏ.
- **Kỹ năng ngầm**: các tác vụ phân loại, trích xuất và định tuyến có hàng nghìn ví dụ gán nhãn thường vượt prompt.

Cái giá là vận hành: chăm chút dữ liệu huấn luyện, chạy lại đánh giá mỗi lần nâng cấp mô hình nền, và chấp nhận rằng sửa một hành vi xấu nghĩa là một chu kỳ huấn luyện nữa.

## Dùng cả hai

Một mẫu hình phổ biến trong sản phẩm thực tế: fine-tune một mô hình để nó *tuân định dạng và chính sách từ chối một cách đáng tin*, rồi dùng RAG để *cấp cho nó sự kiện cập nhật*. Tinh chỉnh khiến hành vi dự đoán được; truy xuất giữ nội dung đúng và mới.

## Câu hỏi thường gặp

**Fine-tuning có dạy mô hình các sự kiện mới không?**
Rất kém. Cập nhật trọng số có thể ghi nhớ một số sự kiện, nhưng khả năng truy hồi không đáng tin và việc cập nhật đòi hỏi huấn luyện lại. Truy xuất mới là cách đáng tin để thêm kiến thức.

**RAG có luôn rẻ hơn không?**
Để xây dựng thì gần như luôn vậy. Ở lưu lượng truy vấn rất cao, ngữ cảnh truy xuất dài làm phồng chi phí token mỗi lượt gọi, và một mô hình đã tinh chỉnh với prompt ngắn có thể trở nên rẻ hơn. Hãy đo ở mức lưu lượng của chính bạn.

**Tôi có thể bỏ qua cả hai và chỉ dùng cửa sổ ngữ cảnh dài không?**
Với kho nhỏ và ổn định — có, nhồi tài liệu vào prompt (có thể kèm prompt caching) là lựa chọn đơn giản nhất. Vượt quá vài trăm trang hoặc khi cập nhật thường xuyên, truy xuất thắng về chi phí lẫn chất lượng câu trả lời.`,
  },
  {
    topicKey: 'prompt-engineering',
    title: 'Hướng dẫn thực hành về Kỹ thuật Prompt',
    question: 'Làm sao để viết prompt hiệu quả cho các mô hình ngôn ngữ lớn?',
    summary:
      'Phần lớn chất lượng prompt đến từ năm đòn bẩy: chỉ dẫn rõ ràng, ngữ cảnh, ví dụ, định dạng đầu ra tường minh và khoảng để suy luận. Bài viết này bàn những kỹ thuật sống sót khi va chạm với công việc thực.',
    tags: ['ai', 'llm', 'kỹ thuật prompt', 'năng suất'],
    language: 'vi',
    image: { prompt: promptOf('prompt-engineering'), alt: 'Bảng điều khiển bằng kính định hình chùm sáng thành mẫu hình có cấu trúc' },
    sources: [
      { title: 'Wei và cộng sự, "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (2022)', url: 'https://arxiv.org/abs/2201.11903' },
      { title: 'Wang và cộng sự, "Self-Consistency Improves Chain of Thought Reasoning" (2022)', url: 'https://arxiv.org/abs/2203.11171' },
      { title: 'Prompt Engineering Guide (DAIR.AI)', url: 'https://www.promptingguide.ai' },
    ],
    content: `# Hướng dẫn thực hành về Kỹ thuật Prompt

Một prompt là bản đặc tả, không phải câu thần chú. Mô hình làm dở với những yêu cầu mơ hồ vì cùng lý do mà nhà thầu làm dở: yêu cầu chưa bao giờ được nêu ra. Năm đòn bẩy chiếm phần lớn chất lượng bạn có thể đạt được — chỉ dẫn, ngữ cảnh, ví dụ, định dạng đầu ra và khoảng để suy luận.

## Năm đòn bẩy

**1. Nêu tác vụ như một phiếu giao việc.** Bao gồm mục tiêu, đối tượng đọc, ràng buộc và "hoàn thành" trông ra sao. "Tóm tắt các điều khoản chấm dứt của hợp đồng này cho người không phải luật sư, dưới 150 từ, đánh dấu mọi điểm bất thường" thắng "tóm tắt cái này".

**2. Cung cấp ngữ cảnh mà mô hình không thể đoán.** Dán tài liệu liên quan, lược đồ, nhật ký lỗi, cẩm nang văn phong. Tách nó khỏi chỉ dẫn bằng dấu phân tách rõ ràng (thẻ kiểu XML hoặc khối mã) để dữ liệu không bao giờ bị lẫn với mệnh lệnh.

**3. Cho xem, đừng chỉ kể (few-shot).** Hai hay ba ví dụ đầu vào → đầu ra định nghĩa một tác vụ chính xác hơn nhiều đoạn mô tả, và chúng ghim được các trường hợp biên: hãy đưa vào một ví dụ hóc búa, không chỉ những ví dụ dễ.

**4. Cố định định dạng đầu ra.** Yêu cầu một cấu trúc cụ thể — một đối tượng JSON với các trường có tên, một bảng markdown, "đúng ba gạch đầu dòng". Đầu ra có cấu trúc dễ kiểm tra, phân tích và so khác hơn. Nếu nền tảng của bạn hỗ trợ đầu ra ràng buộc theo lược đồ, hãy dùng nó.

**5. Cho khoảng để suy luận.** Với phân tích, toán học hay quyết định nhiều bước, hãy yêu cầu mô hình lần qua vấn đề trước khi trả lời (chuỗi suy luận). Nghiên cứu lẫn thực hành đều đồng ý điều này cải thiện đáng kể độ chính xác trên các tác vụ suy luận; với câu trả lời quan trọng, hãy lấy mẫu nhiều đường suy luận rồi chọn theo đa số (tự nhất quán).

## Kỹ thuật → khi nào nên dùng

| Kỹ thuật | Dùng khi |
| --- | --- |
| Vai trò/nhân cách ("Bạn là một SRE kỳ cựu") | Cần vốn từ và phán đoán khớp với một nghề |
| Dấu phân tách quanh đầu vào | Bất kỳ dữ liệu dán nào, luôn luôn |
| Ví dụ few-shot | Định dạng hay phán đoán khó mô tả trừu tượng |
| Chuỗi suy luận | Toán, logic, quyết định nhiều ràng buộc |
| Phân rã (nhiều lượt gọi) | Tác vụ có các giai đoạn rõ rệt — trích xuất, rồi phán đoán, rồi viết |
| Tự nhất quán (bỏ phiếu qua nhiều mẫu) | Câu trả lời đơn quan trọng đáng thêm chi phí |
| "Nói 'không biết' nếu không chắc" | Truy vấn dữ kiện nơi trả lời sai tệ hơn không trả lời |

## Các mẫu hỏng thường gặp

- **Prompt nhồi nhét tất cả**: hai mươi quy tắc, nửa số mâu thuẫn nhau. Mô hình theo cái cuối và to tiếng nhất; cắt tỉa không thương tiếc.
- **Câu hỏi ẩn**: hỏi hai điều trong một câu rồi chỉ nhận được câu trả lời cho một.
- **Ngữ cảnh ngầm**: nhắc tới "cái tệp" hay "định dạng thường lệ của chúng ta" mà mô hình chưa từng thấy.
- **Ví dụ quá khớp**: ba mẫu few-shot gần giống hệt dạy mẫu hình bề mặt, không phải quy tắc.
- **Không vòng lặp lặp lại**: prompt là mã. Giữ một bộ kiểm thử nhỏ gồm đầu vào thực, chạy nó sau mỗi lần sửa, và quản lý phiên bản prompt.

## Coi prompt như tạo phẩm kỹ thuật

Một khi prompt đã quan trọng trong sản phẩm: quản lý phiên bản nó, kèm một bộ kiểm thử hồi quy gồm các đầu vào tiêu biểu với thuộc tính kỳ vọng, và chạy lại mỗi lần nâng cấp mô hình. Thay đổi phiên bản mô hình âm thầm dịch chuyển hành vi; bộ kiểm thử của bạn bắt được nó trước khi người dùng bắt được.

## Câu hỏi thường gặp

**Những câu thần chú kiểu "hít một hơi thật sâu" có thực sự giúp ích không?**
Thi thoảng, một chút, và không ổn định giữa các mô hình. Cấu trúc, ngữ cảnh và ví dụ lấn át các câu niệm chú.

**Prompt dài tốn tiền hơn — khoản chi đó có đáng không?**
Thường là có với các tác vụ trọng chất lượng, nhưng hãy cắt phần thừa: quy tắc dư thừa và ví dụ cũ kỹ thêm chi phí mà không thêm độ chính xác. Prompt caching khiến các phần đầu cố định dài trở nên rẻ trên hầu hết nền tảng.

**Viết prompt khác thế nào với các mô hình thiên về suy luận?**
Các mô hình tự suy luận bên trong trước khi trả lời cần ít dắt tay hơn về *cách* nghĩ — hãy giữ chỉ dẫn về mục tiêu và ràng buộc, và bỏ việc vi quản từng bước trừ khi chất lượng đầu ra nói khác đi.`,
  },
  {
    topicKey: 'ai-agents',
    title: 'AI Agent là gì — và khi nào bạn thực sự cần nó?',
    question: 'AI agent là gì, và khi nào trường hợp của tôi thực sự cần đến nó?',
    summary:
      'Một AI agent là một LLM chạy trong vòng lặp với công cụ và một mục tiêu, tự quyết bước tiếp theo. Mạnh với các tác vụ mở, nhưng thừa thãi với bất cứ thứ gì một quy trình cố định làm được — bài viết này giải thích sự khác biệt.',
    tags: ['ai', 'llm', 'agent', 'tự động hóa', 'kiến trúc phần mềm'],
    language: 'vi',
    image: { prompt: promptOf('ai-agents'), alt: 'Lõi nơ-ron giữa các công cụ chọn đường đi qua những bệ phân nhánh' },
    sources: [
      { title: 'Yao và cộng sự, "ReAct: Synergizing Reasoning and Acting in Language Models" (2022)', url: 'https://arxiv.org/abs/2210.03629' },
      { title: 'Anthropic Engineering, "Building Effective Agents"', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
      { title: 'Schick và cộng sự, "Toolformer: Language Models Can Teach Themselves to Use Tools" (2023)', url: 'https://arxiv.org/abs/2302.04761' },
    ],
    content: `# AI Agent là gì — và khi nào bạn thực sự cần nó?

Một AI agent là một mô hình ngôn ngữ chạy trong vòng lặp: nó có một mục tiêu, một bộ công cụ, và quyền tự quyết hành động tiếp theo dựa trên kết quả mà hành động trước trả về. Mệnh đề cuối đó mới là điều định nghĩa. Một đoạn script gọi LLM ba lần theo thứ tự cố định là một **quy trình** (workflow); một hệ thống nơi chính mô hình chọn việc làm tiếp theo là một **agent**.

## Giải phẫu một agent

Mọi agent thực dụng đều gồm bốn phần:

- **Một mô hình** có khả năng suy luận nhiều bước và gọi công cụ một cách đáng tin.
- **Công cụ** — các hàm mà mô hình có thể gọi: tìm kiếm, chạy mã, sửa tệp, gọi API, truy vấn cơ sở dữ liệu.
- **Ngữ cảnh/bộ nhớ** — bản ghi đang chạy của các hành động và quan sát (và đôi khi cả ghi chú ngoài sống sót qua phiên).
- **Vòng lặp** — mô hình hành động → môi trường phản hồi → kết quả được nối thêm → mô hình hành động tiếp, cho tới khi nó tuyên bố đã đạt mục tiêu hoặc chạm điều kiện dừng.

Mẫu hình đan xen suy luận với dùng công cụ được phổ biến trong nghiên cứu dưới tên ReAct, và nay là xương sống của các trợ lý lập trình, agent nghiên cứu và hệ thống điều khiển máy tính.

## Agent vs quy trình vs lượt gọi đơn

| Cách tiếp cận | Luồng điều khiển do ai quyết | Tốt nhất cho | Kiểu hỏng |
| --- | --- | --- | --- |
| Lượt gọi LLM đơn | Bạn | Phân loại, soạn thảo, trích xuất | Phạm vi hạn chế |
| Quy trình (chuỗi lượt gọi) | Bạn | Quá trình nhiều bước đã biết, lặp lại được | Cứng nhắc khi đầu vào biến đổi |
| Agent (vòng lặp + công cụ) | Mô hình | Tác vụ mở mà đường đi chưa rõ từ trước | Chi phí và lỗi dồn tích |

## Khi nào agent thực sự là lựa chọn đúng

- **Đường đi không thể biết trước.** Gỡ một bản dựng lỗi, nghiên cứu một câu hỏi mơ hồ, điều khiển trình duyệt — mỗi bước tiếp phụ thuộc vào điều bước trước hé lộ.
- **Môi trường cho phản hồi.** Trình biên dịch, bộ kiểm thử và kết quả tìm kiếm để agent tự kiểm tra việc của mình và tự sửa. Agent phát huy đúng nơi việc kiểm chứng rẻ.
- **Tác vụ chịu được chi phí và độ trễ biến thiên.** Một agent có thể mất năm bước hoặc năm mươi bước.

## Khi nào nó là thừa thãi

Nếu con người viết ra được các bước, hãy viết chúng ra — một quy trình cố định rẻ hơn, nhanh hơn, gỡ lỗi được và dự đoán được. Điền biểu mẫu, đường ống tài liệu, báo cáo định kỳ và ETL tiêu chuẩn hầu như không bao giờ cần agent. Quy tắc kỹ thuật thành thật từ những người làm nghề là: **dùng mẫu hình đơn giản nhất mà chạy được, và chỉ thêm tính tự chủ khi tác vụ đòi hỏi.**

## Cái gì hay hỏng

- **Lỗi dồn tích**: một bước tin cậy 95% có khoảng 60% cơ hội sống sót qua mười bước mà không bị động tới. Vòng lặp dài cần điểm kiểm tra, bước kiểm chứng hoặc cổng duyệt của con người.
- **Chi phí mất kiểm soát**: mỗi vòng lặp lại đọc một bản ghi đang phình to. Hãy đặt ngân sách và trần số bước.
- **Mục tiêu mơ hồ**: một agent được bảo "cải thiện codebase" sẽ làm *một điều gì đó*; có phải điều bạn muốn hay không lại là chuyện khác. Hãy định nghĩa "hoàn thành".
- **Bề mặt an ninh**: các công cụ có thể ghi tệp, tiêu tiền hay gửi tin nhắn cần ranh giới quyền và nhật ký kiểm toán.

## Câu hỏi thường gặp

**"Hệ đa agent" có tốt hơn một agent giỏi không?**
Đôi khi — nghiên cứu song song kèm một bộ tổng hợp là mẫu hình đã được chứng minh. Nhưng phối hợp thêm các kiểu hỏng riêng; đa agent là một tối ưu hóa, không phải điểm khởi đầu.

**Agent có cần mô hình đặc biệt không?**
Chúng cần độ tin cậy gọi công cụ cao và sự nhất quán trên chân trời dài. Các mô hình tổng quát tiên phong hiện là lựa chọn an toàn nhất; mô hình nhỏ phù hợp với các vòng lặp hẹp, được trang bị tốt.

**Tôi đánh giá một agent ra sao?**
Theo kết quả, không theo bước: định nghĩa một bộ tác vụ tiêu biểu với trạng thái cuối kiểm tra được, chạy lặp lại (agent có tính ngẫu nhiên), và theo dõi tỷ lệ thành công, chi phí và số bước tới khi hoàn thành.`,
  },
  {
    topicKey: 'local-llm-hardware',
    title: 'Cần phần cứng gì để chạy LLM cục bộ?',
    question: 'Tôi cần phần cứng gì để chạy một mô hình ngôn ngữ lớn trên máy của chính mình?',
    summary:
      'Bộ nhớ, chứ không phải sức tính, quyết định bạn chạy được gì: một mô hình 8B lượng tử hóa vừa trong 8 GB, 32B cần khoảng 24 GB, và các mô hình lớp 70B muốn 48 GB trở lên. Đây là những con số thực và phần mềm nên dùng.',
    tags: ['ai', 'llm', 'llm cục bộ', 'phần cứng', 'gpu'],
    language: 'vi',
    image: { prompt: promptOf('local-llm-hardware'), alt: 'Khối lưới nơ-ron phát sáng đặt trên card đồ họa trong thùng máy PC mở' },
    sources: [
      { title: 'llama.cpp — suy luận LLM bằng C/C++ (GGUF, lượng tử hóa)', url: 'https://github.com/ggml-org/llama.cpp' },
      { title: 'Ollama — chạy LLM mở cục bộ', url: 'https://ollama.com' },
      { title: 'vLLM — phục vụ LLM thông lượng cao', url: 'https://github.com/vllm-project/vllm' },
    ],
    content: `# Cần phần cứng gì để chạy LLM cục bộ?

Ràng buộc quyết định là **bộ nhớ, không phải tốc độ**. Trọng số của mô hình phải vừa trong VRAM của GPU (hoặc bộ nhớ hợp nhất của Apple) thì hiệu năng mới dùng được, và phép tính thì đơn giản: ở lượng tử hóa 4-bit, một mô hình cần khoảng **0,5–0,7 GB cho mỗi tỷ tham số**, cộng thêm 1–4 GB dôi ra cho bộ nhớ đệm ngữ cảnh.

## Bảng ước lượng nhanh

| Lớp mô hình | Trọng số 4-bit | Cấu hình thoải mái | Ví dụ chạy được |
| --- | --- | --- | --- |
| 3–4B | ~2–3 GB | Laptop hiện đại bất kỳ, RAM 8 GB | Trợ lý nhỏ, gợi ý tự động |
| 7–9B | ~4–6 GB | GPU 8 GB hoặc Mac 16 GB | Các mô hình nhỏ Llama/Qwen/Mistral |
| 13–14B | ~8–10 GB | GPU 12–16 GB hoặc Mac 24 GB | Mô hình trò chuyện và lập trình cỡ vừa |
| 30–34B | ~18–22 GB | GPU 24 GB (vd RTX 3090/4090) hoặc Mac 36–48 GB | Mô hình tổng quát cục bộ mạnh |
| 70–72B | ~40–48 GB | 2×GPU 24 GB hoặc Mac Studio 64 GB+ | Mô hình mở gần tiên phong |
| Mixture-of-experts cỡ lớn | dao động rộng | Lớp workstation/server | Xem tài liệu từng mô hình |

Hai lưu ý khi đọc bảng: lượng tử hóa (GGUF 4-bit và tương tự) đánh đổi một mức giảm chất lượng nhỏ, thường chấp nhận được, lấy mức cắt bộ nhớ 4× so với 16-bit; và ngữ cảnh dài làm phình bộ nhớ đệm KV — trò chuyện ở ngữ cảnh 32k có thể cộng thêm vài GB trên đầu trọng số.

## GPU, Mac, hay CPU?

- **GPU NVIDIA**: thông lượng và hỗ trợ hệ sinh thái tốt nhất. Dung lượng VRAM quan trọng hơn thế hệ GPU — một chiếc RTX 3090 24 GB cũ vẫn là lựa chọn ngân sách được yêu thích cho các mô hình lớp 30B.
- **Apple Silicon**: bộ nhớ hợp nhất khiến Mac âm thầm xuất sắc — một máy M-series 64 GB chạy được các mô hình lớp 70B đã lượng tử hóa, chậm hơn một dàn hai GPU nhưng êm và đơn giản. Hãy mua RAM, không phải số nhân.
- **Chỉ CPU**: chạy được qua llama.cpp, nhưng đừng kỳ vọng quá vài token mỗi giây trên các mô hình nhỏ — ổn cho việc theo lô, khổ sở cho trò chuyện.

## Ngăn xếp phần mềm

- **Ollama** — khởi đầu dễ nhất: một lệnh để tải và chạy một mô hình, kèm API cục bộ tương thích OpenAI.
- **llama.cpp** — cỗ máy nằm dưới phần lớn hệ sinh thái; kiểm soát tối đa về lượng tử hóa và đẩy tải.
- **LM Studio** — giao diện đồ họa để duyệt, tải về và trò chuyện.
- **vLLM** — khi bạn phục vụ nhiều người dùng đồng thời từ một máy chủ GPU thực thay vì một desktop.

## Hãy kỳ vọng một cách thành thật

Một mô hình 8–14B đã lượng tử hóa được chọn khéo sẽ xử lý tóm tắt, soạn thảo, trích xuất và hỗ trợ lập trình kha khá. Các mô hình mở lớp 30B–70B thực sự mạnh nhưng vẫn theo sau các mô hình host tiên phong ở suy luận khó. Lý do để chạy cục bộ là **quyền riêng tư, dùng ngoại tuyến, token không giới hạn với chi phí cố định, và tự do mày mò** — không phải thắng đám mây về chất lượng thuần.

## Câu hỏi thường gặp

**Chạy cục bộ có tiết kiệm tiền không?**
Chỉ khi dùng nặng và liên tục. Phần cứng hoàn vốn nếu nếu không thì bạn sẽ đốt token API mỗi ngày; với dùng thi thoảng, API rẻ hơn.

**Tôi chạy được mô hình lớn hơn VRAM không?**
Có — các lớp có thể tràn xuống RAM hệ thống với cái giá tốc độ rất đắt. Một mô hình vượt VRAM 20% thường vẫn ổn; vượt 2× là cực hình.

**Còn fine-tuning cục bộ thì sao?**
Các phương pháp tiết kiệm tham số (LoRA/QLoRA) khiến fine-tuning mô hình nhỏ khả thi trên GPU 24 GB. Fine-tuning toàn phần các mô hình lớn vẫn thuộc địa hạt trung tâm dữ liệu.`,
  },
  {
    topicKey: 'mcp-explained',
    title: 'MCP (Model Context Protocol) là gì?',
    question: 'Model Context Protocol là gì và nó giải quyết vấn đề gì?',
    summary:
      'MCP là một chuẩn mở cho phép bất kỳ ứng dụng AI nào kết nối với bất kỳ công cụ hay nguồn dữ liệu nào qua một giao thức — thay cho các tích hợp tùy biến theo từng app, từng công cụ. Hãy nghĩ tới USB-C cho ngữ cảnh AI.',
    tags: ['ai', 'mcp', 'llm', 'tích hợp', 'chuẩn mở'],
    language: 'vi',
    image: { prompt: promptOf('mcp-explained'), alt: 'Các cáp dữ liệu nhiều màu hội tụ vào một cổng pha lê đa dụng' },
    sources: [
      { title: 'Model Context Protocol — trang chính thức và đặc tả', url: 'https://modelcontextprotocol.io' },
      { title: 'Anthropic, "Introducing the Model Context Protocol"', url: 'https://www.anthropic.com/news/model-context-protocol' },
    ],
    content: `# MCP (Model Context Protocol) là gì?

Model Context Protocol (MCP) là một chuẩn mở để kết nối ứng dụng AI với các công cụ và dữ liệu bên ngoài. Trước nó, mỗi ứng dụng AI phải dựng một tích hợp tùy biến cho mỗi công cụ — N app × M công cụ nghĩa là N×M bộ chuyển. MCP gói gọn việc đó thành N + M: một app hiện thực giao thức một lần với tư cách *client*, một công cụ phơi bày nó một lần với tư cách *server*, và mọi client đều nói chuyện được với mọi server. Phép so sánh đã trở nên phổ biến vì nó chính xác: **USB-C cho AI**.

## Vì sao nó tồn tại

LLM chỉ hữu ích đến mức ngữ cảnh mà nó vươn tới được. Trợ lý của bạn trở nên mạnh hơn hẳn khi nó đọc được tệp của bạn, truy vấn cơ sở dữ liệu của bạn, tìm trong các ticket, hay gửi một tin nhắn — nhưng đấu nối những thứ đó một cách chắp vá sinh ra các tích hợp mong manh, không di động, phụ thuộc một nhà cung cấp. MCP, do Anthropic giới thiệu cuối năm 2024 và từ đó được ngành áp dụng rộng rãi, chuẩn hóa cách đấu nối ấy. Tính đến năm 2026, hệ sinh thái có hàng nghìn server của cộng đồng lẫn nhà cung cấp cho mọi thứ, từ GitHub và Slack tới cơ sở dữ liệu và trình duyệt.

## Nó hoạt động ra sao

MCP có ba vai trò:

- **Host** — ứng dụng AI mà người dùng đối diện (một app trò chuyện, một IDE, một môi trường chạy agent).
- **Client** — kết nối giao thức mà host mở, mỗi server một kết nối.
- **Server** — một chương trình (thường nhỏ) phơi bày năng lực qua giao thức, hoặc cục bộ qua stdio hoặc từ xa qua HTTP.

Một server có thể cung cấp ba loại năng lực:

| Nguyên thủy | Là gì | Ví dụ |
| --- | --- | --- |
| **Tools** | Các hàm mô hình có thể gọi | \`create_issue\`, \`query_database\` |
| **Resources** | Dữ liệu host có thể đọc vào ngữ cảnh | Một tệp, một lược đồ, một bảng điều khiển |
| **Prompts** | Mẫu có tham số dùng lại được | "Rà PR này theo danh mục kiểm tra của chúng ta" |

Mô hình của host thấy các định nghĩa công cụ, tự quyết khi nào gọi chúng, còn server thực thi và trả kết quả — giao thức xử lý việc khám phá, gọi và truyền tải một cách thống nhất.

## MCP so với gọi hàm thông thường

Gọi hàm là cách một *mô hình* gọi một hàm mà nhà phát triển đã đăng ký trong chính ứng dụng đó. MCP chuẩn hóa lớp bao quanh nó: công cụ đến từ đâu, được khám phá, xác thực và truyền tải ra sao — để cùng một server chạy được trong bất kỳ app hỗ trợ MCP nào mà không cần đổi mã. Chúng kết hợp với nhau: bên dưới, một lượt gọi công cụ MCP vẫn đến với mô hình dưới dạng gọi hàm.

## Bắt đầu thế nào

Đường vào thực tế là dùng các server có sẵn, không phải viết một cái: hầu hết các client AI lớn cho phép bạn thêm một server MCP bằng vài dòng cấu hình, và các SDK chính thức (TypeScript, Python và khác) khiến việc tự viết server thành một dự án trong buổi chiều — định nghĩa vài hàm có kiểu, và mọi client MCP đều dùng được chúng.

## Câu hỏi thường gặp

**MCP có bị buộc vào một nhà cung cấp mô hình không?**
Không. Nó khởi đầu ở Anthropic nhưng là một đặc tả mở với sự áp dụng đa nhà cung cấp và một quy trình quản trị mở; client và server tồn tại trên khắp các hệ sinh thái lớn.

**Kết nối server tùy ý có an toàn không?**
Hãy đối xử với server MCP như tiện ích mở rộng trình duyệt: chúng chạy với quyền thực. Dùng nguồn đáng tin, rà soát công cụ mà một server phơi bày, và ưu tiên các host yêu cầu người dùng phê duyệt tường minh cho mỗi hành động nhạy cảm.

**Khi nào tôi nên tự viết server?**
Khi đội của bạn có một API hay tập dữ liệu nội bộ mà nhiều công cụ AI cần vươn tới — một server làm nó khả dụng cho mọi client hỗ trợ MCP mà công ty bạn dùng.`,
  },
  {
    topicKey: 'vector-databases',
    title: 'Cơ sở dữ liệu vector là gì — và khi nào bạn cần nó?',
    question: 'Cơ sở dữ liệu vector là gì và khi nào tôi thực sự cần đến nó?',
    summary:
      'Cơ sở dữ liệu vector lưu các embedding và tìm theo "nghĩa gần nhất" thay vì khớp chính xác, làm nền cho tìm kiếm ngữ nghĩa và RAG. Dưới ~1 triệu vector, các công cụ đơn giản hơn như pgvector thường là đủ.',
    tags: ['ai', 'cơ sở dữ liệu vector', 'embedding', 'tìm kiếm', 'rag'],
    language: 'vi',
    image: { prompt: promptOf('vector-databases'), alt: 'Một điểm truy vấn lan sóng qua các chòm vector embedding được nhóm theo cụm' },
    sources: [
      { title: 'Malkov & Yashunin, "Efficient and Robust ANN Search Using HNSW Graphs" (2016)', url: 'https://arxiv.org/abs/1603.09320' },
      { title: 'FAISS — thư viện tìm kiếm tương tự hiệu quả', url: 'https://github.com/facebookresearch/faiss' },
      { title: 'pgvector — tương tự vector cho Postgres', url: 'https://github.com/pgvector/pgvector' },
    ],
    content: `# Cơ sở dữ liệu vector là gì — và khi nào bạn cần nó?

Một cơ sở dữ liệu vector lưu **embedding** — những danh sách số biểu diễn nghĩa của văn bản, hình ảnh hay âm thanh — và trả lời cực tốt một câu truy vấn: *"tìm những mục giống nhất với mục này."* Đó là phép toán đứng sau tìm kiếm ngữ nghĩa, truy xuất RAG, gợi ý và phát hiện trùng lặp. Bạn có cần một cái chuyên dụng hay không gần như hoàn toàn phụ thuộc vào quy mô.

## Embedding trong một phút

Một mô hình embedding ánh xạ nội dung thành một điểm trong không gian nhiều chiều (thường 256–3072 chiều) sao cho những nghĩa giống nhau rơi gần nhau. "Làm sao đặt lại mật khẩu" và "Tôi bị khóa khỏi tài khoản" gần như không chung từ vựng nhưng nằm sát nhau dưới dạng vector. Độ tương tự được đo theo hình học — thường là tương tự cosine — nên tìm kiếm trở thành: embed câu truy vấn, tìm các điểm đã lưu gần nhất.

## Điều gì khiến nó thành bài toán *cơ sở dữ liệu*

So câu truy vấn với mọi vector đã lưu (vét cạn) thì chính xác nhưng tuyến tính — ổn với hàng nghìn mục, chậm với hàng triệu. Cơ sở dữ liệu vector dùng các chỉ mục **láng giềng gần nhất xấp xỉ (ANN)**, nổi tiếng nhất là đồ thị HNSW, tìm được ~99% láng giềng thật trong một phần thời gian nhỏ xíu. Quanh cái lõi đó, chúng thêm các tiện nghi cơ sở dữ liệu thường thấy: lọc theo metadata ("chỉ tài liệu của khách này"), cập nhật và xóa, lưu bền, và mở rộng theo chiều ngang.

## Khi nào bạn cần một cái — nói thật

| Quy mô kho | Lựa chọn hợp lý |
| --- | --- |
| Đến ~100k vector | Một mảng trong bộ nhớ, FAISS, hoặc tiện ích SQLite — vét cạn là ổn |
| ~100k–vài triệu | **pgvector trong Postgres bạn đã chạy sẵn** — mặc định thực dụng |
| Hàng triệu, QPS cao, đa khách | Engine chuyên dụng: Qdrant, Milvus, Weaviate, hoặc dịch vụ quản lý như Pinecone |

Lỗi kiến trúc thường gặp nhất là thêm một hạ tầng mới cho 50.000 đoạn. Nếu bạn đã chạy Postgres, pgvector giữ vector ngay cạnh dữ liệu quan hệ, có giao dịch và nối được. Hãy với tới engine chuyên dụng khi bạn có quy mô thực, mục tiêu độ trễ ngặt nghèo, hoặc tìm kiếm lọc nặng.

## Các đòn bẩy chất lượng quan trọng hơn cả cơ sở dữ liệu

- **Chia đoạn**: cách bạn cắt tài liệu ảnh hưởng tới truy xuất nhiều hơn việc chọn engine nào. Đoạn nên là những ý tự chứa, thường 200–800 token có chồng lấn.
- **Chọn mô hình embedding**: các mô hình đa ngôn ngữ mới hơn vượt rõ rệt mô hình cũ; embed lại cả kho thì phiền, nên hãy chọn có chủ đích.
- **Tìm kiếm lai**: kết hợp tương tự vector với chấm điểm từ khóa cổ điển (BM25) bắt được tên riêng, mã hiệu và thuật ngữ hiếm mà embedding làm mờ.
- **Xếp hạng lại**: truy xuất 50 ứng viên một cách rẻ rồi chấm lại top bằng cross-encoder thường nâng chất lượng câu trả lời nhiều hơn việc tinh chỉnh chỉ mục.

## Câu hỏi thường gặp

**Embedding có làm rò dữ liệu của tôi sang nhà cung cấp embedding không?**
Văn bản đi tới bất cứ ai tính embedding. Với API host, đó là nhà cung cấp (xem điều khoản lưu giữ); các mô hình embedding mở chạy hoàn toàn cục bộ.

**Có cập nhật được vector khi tài liệu thay đổi không?**
Có — nhưng chia lại đoạn và embed lại các tài liệu đã đổi là việc của đường ống của bạn. Vector cũ lặng lẽ phục vụ nội dung lỗi thời là lỗi sản phẩm kinh điển.

**Chiều embedding lớn hơn có tốt hơn không?**
Không tự nhiên mà tốt hơn. Chiều cao hơn tốn lưu trữ và độ trễ; nhiều mô hình hiện đại cho chiều cắt được, nơi 512–1024 vẫn giữ gần như trọn chất lượng. Hãy đo trên chính tập truy xuất của bạn.`,
  },
  {
    topicKey: 'ai-coding-assistants',
    title: 'Cách thu được giá trị thực từ Trợ lý lập trình AI',
    question: 'Làm sao dùng trợ lý lập trình AI hiệu quả mà không hại chất lượng mã?',
    summary:
      'Công cụ lập trình AI mang lại thắng lợi lớn nhất ở mã khuôn mẫu, kiểm thử và lãnh địa xa lạ — nếu bạn cấp ngữ cảnh và rà soát đầu ra của chúng. Những thực hành hiệu quả, rủi ro cần quản lý, và thời gian thực sự tiết kiệm ở đâu.',
    tags: ['ai', 'lập trình', 'trợ lý lập trình', 'công cụ lập trình', 'năng suất'],
    language: 'vi',
    image: { prompt: promptOf('ai-coding-assistants'), alt: 'Bàn tay người và bàn tay robot ánh sáng cùng dựng một cây cầu khối mã' },
    sources: [
      { title: 'Peng và cộng sự, "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot" (2023)', url: 'https://arxiv.org/abs/2302.06590' },
      { title: 'SWE-bench — đánh giá LLM trên các issue GitHub thực', url: 'https://www.swebench.com' },
    ],
    content: `# Cách thu được giá trị thực từ Trợ lý lập trình AI

Trợ lý lập trình AI thực sự nâng năng suất — các nghiên cứu có kiểm soát đã cho thấy tăng tốc lớn trên những tác vụ tự chứa, và đến năm 2026 các công cụ kiểu agent biết chạy kiểm thử và sửa nhiều tệp đã vượt xa khỏi gợi ý tự động. Nhưng lợi ích không đều, và chúng có điều kiện ở hai thói quen: **cho công cụ ngữ cảnh thực** và **rà soát những gì nó viết**. Đội nào bỏ qua một trong hai thường chỉ xuất xưởng các lỗi tinh vi nhanh hơn.

## Thắng lợi tập trung ở đâu

- **Mã khuôn mẫu và mã keo**: các endpoint CRUD, cấu hình, tuần tự hóa, lớp bọc client API.
- **Kiểm thử**: sinh các bộ unit test kỹ lưỡng từ mã hiện có là một trong những công dụng có giá trị-mỗi-phút cao nhất.
- **Lãnh địa xa lạ**: một ngôn ngữ, framework hay API mới — trợ lý nén hàng giờ đọc tài liệu xuống còn vài phút.
- **Tái cấu trúc cơ học**: đổi tên, đổi chữ ký hàm, áp một mẫu hình đã biết xuyên các tệp.
- **Giải thích mã**: làm quen một module cũ bằng cách hỏi nó.

Nơi thắng lợi co lại: logic nghiệp vụ sâu, các nhân tử trọng hiệu năng, các quyết định kiến trúc lớn, và mã nơi việc sai thì đắt giá. Ở đó, trợ lý là một đối thủ tập dượt, không phải tác giả.

## Những thực hành phân tách kết quả tốt với kết quả tồi

**Khoanh vùng yêu cầu.** "Thêm phân trang cho endpoint này, theo cách \`listUsers\` làm" thắng "cải thiện API này". Các bước tăng nhỏ, kiểm chứng được cộng dồn theo cấp số nhân; bản sinh nghìn dòng là ác mộng rà soát.

**Cấp ngữ cảnh có chủ đích.** Chỉ cho công cụ các tệp liên quan, thông báo lỗi, lược đồ, quy ước đội. Các trợ lý kiểu agent hiện đại tự tìm được ngữ cảnh — nhưng nêu tên đúng các tệp khởi đầu vẫn cắt một nửa quãng lang thang của chúng.

**Để nó chạy kiểm thử.** Nâng cấp độ tin cậy lớn nhất là một vòng phản hồi: một trợ lý chạy được bộ kiểm thử sẽ bắt lỗi của chính nó thay vì gửi chúng tới bạn.

**Rà soát như PR của một đàn em tự tin.** Mã đọc lên có vẻ hợp lý; chính vì thế lướt qua mới nguy hiểm. Hãy soi các trường hợp biên, xử lý lỗi, và các bề mặt nhạy cảm an ninh (kiểm tra đầu vào, xác thực, truy vấn) với toàn bộ sự chú tâm.

**Giữ kiểm thử và kiểu làm lan can.** Kiểu mạnh và độ phủ tốt biến "AI làm hỏng cái gì đó" từ một sự cố sản phẩm thành một lần CI báo đỏ.

## Loại tác vụ → kỳ vọng thực tế

| Tác vụ | Kỳ vọng |
| --- | --- |
| Unit test cho mã hiện có | Tăng tốc lớn, độ tin cậy cao |
| Khuôn mẫu/dựng khung | Tăng tốc lớn |
| Sửa lỗi có kiểm thử tái lập | Tốt — công cụ kiểu agent thường xử gọn |
| Tính năng trong framework xa lạ | Nén lớn đường cong học tập |
| Việc đồng thời/hiệu năng tinh vi | Giúp vừa phải; kiểm chứng nghiêm ngặt |
| Thiết kế hệ thống | Bạn thảo luận hữu ích, không phải lời sấm |

## Lan can ở cấp đội

Áp dụng tường minh, không lén lút: thống nhất nơi khuyến khích dùng trợ lý, đòi cùng một chuẩn rà soát cho mã được sinh, để mắt tới đầu ra nguyên văn nhạy cảm giấy phép trong các codebase chịu quản lý, và giữ CI là tối thượng. Và hãy gìn giữ vòng học tập — các đàn em dán mà không đọc sẽ chững lại; các đàn em chất vấn trợ lý học nhanh hơn bất kỳ thế hệ nào trước.

## Câu hỏi thường gặp

**Trợ lý có khiến tôi thành một kỹ sư tệ hơn không?**
Chúng bào mòn những kỹ năng bạn ngừng luyện và khuếch đại những kỹ năng bạn điều khiển. Kỹ sư biết đặc tả, phân rã và kiểm chứng có thêm đòn bẩy mỗi năm; tốc độ gõ thuần thôi hết quan trọng.

**Vì sao trợ lý tự tin sinh ra mã không biên dịch được?**
Nó dự đoán mã có vẻ hợp lý, và đôi khi bịa ra API. Hãy coi biên dịch và kiểm thử là trọng tài — và ưu tiên các công cụ biên dịch/chạy mã trước khi cho bạn xem.

**Agent hay gợi ý tự động?**
Cả hai, cho các việc khác nhau: hoàn thành nội dòng để giữ mạch khi bạn viết; chế độ agent cho các tác vụ tự chứa mà bạn mô tả và kiểm chứng được, kiểu "làm cho mấy kiểm thử này qua".`,
  },
  {
    topicKey: 'llm-hallucinations',
    title: 'Vì sao các Mô hình Ngôn ngữ Lớn lại "bịa chuyện"?',
    question: 'Vì sao các mô hình ngôn ngữ lớn bịa ra mọi thứ, và làm sao giảm ảo giác?',
    summary:
      'LLM được huấn luyện để tạo văn bản nghe hợp lý, không phải sự thật đã kiểm chứng — khi kiến thức cạn, sự đoán trôi chảy lấp vào chỗ trống. Vì sao nó xảy ra, khi nào tệ hơn, và những cách giảm thiểu thực sự hiệu quả.',
    tags: ['ai', 'llm', 'ảo giác', 'độ tin cậy', 'học máy'],
    language: 'vi',
    image: { prompt: promptOf('llm-hallucinations'), alt: 'Một chùm sáng từ lõi nơ-ron, nửa kết thành hình khối đặc, nửa tan vào sương' },
    sources: [
      { title: 'Huang và cộng sự, "A Survey on Hallucination in Large Language Models" (2023)', url: 'https://arxiv.org/abs/2311.05232' },
      { title: 'Lin và cộng sự, "TruthfulQA: Measuring How Models Mimic Human Falsehoods" (2021)', url: 'https://arxiv.org/abs/2109.07958' },
      { title: 'Liu và cộng sự, "Lost in the Middle: How Language Models Use Long Contexts" (2023)', url: 'https://arxiv.org/abs/2307.03172' },
    ],
    content: `# Vì sao các Mô hình Ngôn ngữ Lớn lại "bịa chuyện"?

Một mô hình ngôn ngữ được huấn luyện để làm một việc: dự đoán văn bản nối tiếp một cách hợp lý những gì đã có trước đó. Sự thật và sự hợp lý thường trùng nhau — đó là lý do mô hình hữu ích — nhưng khi mô hình thiếu cái dữ kiện bạn hỏi, mục tiêu huấn luyện vẫn đòi một đầu ra trôi chảy. Kết quả là một câu trả lời tự tin, chỉn chu, và sai. Ảo giác không phải lỗi vặt bắt vít thêm vào LLM; nó là hành vi mặc định của những hệ tối đa hóa sự hợp lý khi ở rìa kiến thức của chúng.

## Cơ chế

- **Nén mất mát.** Huấn luyện ép hàng terabyte văn bản vào một tập trọng số cố định. Kiến thức phổ thông sống sót với độ trung thực cao; các dữ kiện hiếm — chi tiết thị trấn nhỏ, bài báo ít người biết, thông số sản phẩm ngách — bị làm mờ hoặc mất, và mô hình không phân biệt được tin cậy là cái nào.
- **Không có bước tra cứu.** Một mô hình trần không tham vấn cơ sở dữ liệu trước khi trả lời; nó sinh từ ký ức thống kê. Không có cờ nội bộ nào nói "đây là dữ kiện truy xuất" so với "đây là hoàn tất mẫu hình".
- **Huấn luyện tưởng thưởng việc trả lời.** Các mô hình tinh chỉnh theo sở thích con người học rằng câu trả lời hữu ích, tự tin, trọn vẹn được chấm cao — về mặt lịch sử, các benchmark và người chấm phạt câu "tôi không biết", dạy mô hình đoán bừa.
- **Lỗi dồn tích.** Sinh văn bản là tuần tự; một token sai sớm (một cái tên bịa, một năm sai) được khai triển thành cả đoạn sai mạch lạc.

## Nơi nó tệ hơn, một cách có thể đoán trước

Trích dẫn và tài liệu tham khảo (định dạng dễ bắt chước, nội dung thì không được ghi nhớ), số liệu và ngày tháng chính xác, các thực thể hiếm, tài liệu dài (mô hình kém chú ý tới phần giữa của ngữ cảnh dài), số học làm ngay trong văn bản, và bất kỳ câu hỏi nào đặt trên một tiền đề sai mà mô hình lịch sự chấp nhận.

## Những cách giảm thiểu hiệu quả

| Cách giảm thiểu | Nó xử lý điều gì |
| --- | --- |
| RAG / neo vào tài liệu truy xuất | Thay ký ức bằng dữ kiện được cấp; cho phép trích dẫn |
| Dùng công cụ (máy tính, mã, tìm kiếm) | Khoán ra ngoài những gì mô hình tính dở nhất |
| "Chỉ trả lời từ ngữ cảnh; nếu không thì nói không biết" | Cho phép từ chối |
| Nhiệt độ thấp cho tác vụ dữ kiện | Cắt bớt sự lấy mẫu sáng tạo-nhưng-sai |
| Tự kiểm chứng / rà soát lượt hai | Bắt mâu thuẫn mà lượt một bỏ sót |
| Bắt buộc trích dẫn + quy trình kiểm tra mẫu | Khiến lỗi con người phát hiện được |
| Mô hình suy luận cho bài toán khó | Lần qua từng bước giảm lỗi không đáng có |

Neo (grounding) là vũ khí hạng nặng: khi đoạn đúng nằm trong ngữ cảnh, việc của mô hình chuyển từ *nhớ lại* sang *đọc*, mà nó làm đáng tin hơn nhiều. Đó là lý do RAG vẫn là kiến trúc tiêu chuẩn cho các sản phẩm dữ kiện.

## Có giải quyết triệt để được không?

Không, với các kiến trúc hiện thời — một hệ buộc phải luôn tạo ra văn bản đôi khi sẽ tạo ra văn bản không có chỗ dựa. Nghiên cứu liên tục giảm tỷ lệ (hiệu chỉnh tốt hơn, huấn luyện mô hình biết kiêng, các lớp kiểm chứng), và các mô hình có khả năng suy luận ít ảo giác hơn trên các bài nhiều bước. Tư thế kỹ thuật, tính đến năm 2026: thiết kế với **giả định** còn dư ảo giác — neo câu trả lời, đòi trích dẫn cho các tuyên bố quan trọng, giữ con người trong vòng nơi lỗi đắt giá.

## Câu hỏi thường gặp

**Vì sao mô hình nghe TỰ TIN hơn khi nó sai?**
Sự trôi chảy và tự tin là các mẫu hình văn phong học từ văn bản, không tương quan với độ chắc chắn nội bộ. Đừng dùng giọng điệu làm tín hiệu của sự thật.

**Hỏi "bạn chắc không?" có giúp ích không?**
Đôi khi nó kích hoạt một lượt tự rà soát hữu ích, đôi khi chỉ là sự nịnh hùa theo nghi ngờ ngầm của bạn. Kiểm chứng độc lập thắng việc chất vấn.

**Mô hình lớn hơn có trung thực hơn không?**
Nhìn chung là có ở tính dữ kiện rộng, nhưng không cỡ nào loại bỏ được việc bịa — và văn phong tự tin cũng lớn theo quy mô. Quy mô làm vấn đề co lại; neo và kiểm chứng quản lý phần còn lại.`,
  },
  {
    topicKey: 'open-vs-closed-llms',
    title: 'LLM nguồn mở vs nguồn đóng: Cách lựa chọn',
    question: 'Tôi nên xây dựng trên các mô hình ngôn ngữ lớn nguồn mở hay nguồn đóng?',
    summary:
      'API đóng mua năng lực tiên phong với không gánh vận hành; mô hình trọng số mở mua quyền kiểm soát, riêng tư và mở rộng giá rẻ. Yếu tố quyết định là độ nhạy của dữ liệu, kinh tế theo lượng, và tác vụ thực sự cần năng lực cao đến đâu.',
    tags: ['ai', 'llm', 'nguồn mở', 'chiến lược', 'hạ tầng'],
    language: 'vi',
    image: { prompt: promptOf('open-vs-closed-llms'), alt: 'Một lõi lưới mở bên cạnh một lõi vỏ bóng kín với một cổng duy nhất' },
    sources: [
      { title: 'LMArena — bảng xếp hạng cộng đồng so sánh mô hình mở và đóng', url: 'https://lmarena.ai' },
      { title: 'Hugging Face — kho mô hình mở', url: 'https://huggingface.co/models' },
    ],
    content: `# LLM nguồn mở vs nguồn đóng: Cách lựa chọn

"Mở hay đóng" ít là câu hỏi ý thức hệ hơn là câu hỏi mua sắm: **ai chạy mô hình, ai thấy dữ liệu của bạn, và ai gánh gánh nặng vận hành.** Các mô hình đóng (phục vụ qua API — các họ GPT, Claude và Gemini) bán năng lực tiên phong với không hạ tầng. Các mô hình trọng số mở (các họ Llama, Qwen, DeepSeek, Mistral và nhiều họ khác) trao cho bạn trọng số và cùng với đó là quyền kiểm soát, sự riêng tư, và hóa đơn phục vụ.

Một lưu ý thuật ngữ quan trọng trong hợp đồng: hầu hết các mô hình "nguồn mở" chính xác là **trọng số mở** — bạn tải về và chạy được, nhưng dữ liệu huấn luyện không được công bố và giấy phép có thể kèm hạn chế sử dụng. Hãy đọc giấy phép, không phải lời quảng cáo.

## Bảng đánh đổi

| Khía cạnh | Đóng (API) | Trọng số mở (tự vận hành) |
| --- | --- | --- |
| Năng lực đỉnh | Tiên phong; mạnh nhất ở suy luận khó | Mô hình mở hàng đầu bám sát, và dẫn đầu về chi phí-trên-chất-lượng |
| Hình dạng chi phí | Theo token, tăng theo mức dùng | Hạ tầng + vận hành cố định, tăng theo công suất |
| Kiểm soát dữ liệu | Dữ liệu đi qua nhà cung cấp (xem điều khoản lưu giữ/huấn luyện) | Không bao giờ rời mạng của bạn |
| Tùy biến | Viết prompt, một ít fine-tune dạng host | Fine-tune toàn phần, lượng tử hóa, mổ xẻ |
| Gánh vận hành | Không | GPU, ngăn xếp phục vụ, nâng cấp, trực |
| Ổn định | Mô hình bị ngừng theo lịch của nhà cung cấp | Trọng số là của bạn mãi mãi |
| Tuân thủ | Chứng nhận của nhà cung cấp | Dễ kể chuyện nhất với quy định cư trú dữ liệu ngặt |

## Khi nào nguồn đóng thắng

Bạn cần khả năng suy luận mạnh nhất hiện có; lượng của bạn vừa phải hoặc thất thường; bạn không có năng lực vận hành GPU/ML; bạn muốn các bước tiến năng lực được trao cho mình liên tục. Với năm đầu của hầu hết các đội sản phẩm, một API tiên phong là con đường nhanh nhất để biết liệu sản phẩm có chạy được hay không — tối ưu sau khi nó chạy.

## Khi nào nguồn mở thắng

Dữ liệu không được rời đi (y tế, quốc phòng, cư trú ngặt); lượng cao bền vững khiến giá theo token chi phối biên lợi nhuận của bạn; bạn cần tùy biến sâu hoặc một mô hình chuyên biệt nhỏ, nhanh chưng cất cho một tác vụ; bạn nhúng một mô hình vào phần cứng hay môi trường cách ly; hoặc khóa cứng vào nhà cung cấp là rủi ro chiến lược mà bạn được trả lương để tránh.

## Mẫu hình mà hầu hết các đội trưởng thành đi đến

**Định tuyến, đừng tuyên thệ trung thành.** Một mô hình đóng mạnh xử cái đuôi khó, ít lưu lượng; một mô hình mở đã tinh chỉnh xử phần lõi nhiều lưu lượng, đã hiểu rõ; tải nhạy cảm ở lại tại chỗ. Các lớp trừu tượng và ngăn xếp phục vụ tương thích OpenAI khiến việc định tuyến đa mô hình rẻ để xây, và khoảng cách giữa các bậc được đo lại mỗi quý — vì tính đến năm 2026 nó vẫn liên tục dịch chuyển.

## Câu hỏi thường gặp

**Mô hình mở có "chậm một thế hệ" không?**
Khoảng cách ở tiên phong vẫn còn nhưng đã thu hẹp đáng kể, và với nhiều tác vụ cụ thể (trích xuất, tóm tắt, lập trình thường lệ) các mô hình mở mạnh đơn giản là đủ. Hãy đo trên tác vụ của bạn, không phải các tít báo.

**Tự vận hành có thực sự rẻ hơn không?**
Chỉ với tỷ lệ sử dụng. Một GPU phục vụ ở 5% công suất là nhà máy token đắt nhất trên đời; các API mô hình mở dạng quản lý là con đường ở giữa — trọng số mở, GPU của người khác.

**Tôi có thể chuyển đổi sau không?**
Hành vi ở cấp prompt chuyển không hoàn hảo giữa các mô hình. Hãy giữ một bộ đánh giá từ ngày đầu; chi phí di trú phần lớn là tái kiểm chứng, và các bộ đánh giá biến nó từ hàng tuần "cảm tính" thành hàng ngày "so khác".`,
  },
  {
    topicKey: 'llm-tokens-pricing',
    title: 'Token là gì, và định giá LLM hoạt động ra sao?',
    question: 'Token chính xác là gì, và các nhà cung cấp LLM tính phí sử dụng thế nào?',
    summary:
      'Token là những mẩu chữ con mà mô hình đọc và viết — mỗi mẩu cỡ khoảng ¾ một từ tiếng Anh. Định giá API là theo mỗi triệu token, với đầu ra đắt gấp vài lần đầu vào, và caching/batching là các đòn bẩy lớn.',
    tags: ['ai', 'llm', 'token', 'định giá', 'api'],
    language: 'vi',
    image: { prompt: promptOf('llm-tokens-pricing'), alt: 'Lăng kính cắt một dải sáng văn bản thành các token được cân trên một cái cân' },
    sources: [
      { title: 'tiktoken — bộ token hóa BPE nhanh mà các mô hình OpenAI dùng', url: 'https://github.com/openai/tiktoken' },
      { title: 'Sennrich và cộng sự, "Neural Machine Translation of Rare Words with Subword Units" (BPE, 2015)', url: 'https://arxiv.org/abs/1508.07909' },
    ],
    content: `# Token là gì, và định giá LLM hoạt động ra sao?

Mô hình không đọc ký tự hay từ — chúng đọc **token**: những mẩu chữ con do một bộ token hóa tạo ra. "Understanding" có thể là một token; "unconstitutionally" có thể là bốn; một emoji hiếm có thể là ba. Mọi giới hạn năng lực (cửa sổ ngữ cảnh) và mọi hóa đơn API đều tính bằng những đơn vị này, nên một cảm nhận sơ bộ về chúng nhanh chóng hoàn vốn.

## Quy tắc ước lượng

- **Tiếng Anh**: 1 token ≈ 4 ký tự ≈ ¾ một từ. Một tài liệu 1.000 từ ≈ 1.300–1.500 token.
- **Mã**: đặc token hơn văn xuôi — dấu câu, thụt lề và định danh đều tốn.
- **Tiếng Trung/Nhật/Hàn**: với các bộ token hóa hiện đại, đại khái 1–2 ký tự mỗi token; xét theo *lượng thông tin truyền tải*, văn bản CJK thường tương đương hoặc đắt hơn tiếng Anh một chút.
- **Số và URL**: đắt một cách bất ngờ; các ID dài bị xé thành nhiều token.

Các bộ token hóa được dựng bằng mã hóa cặp byte (BPE): bắt đầu từ byte và liên tục gộp các cặp xuất hiện nhiều nhất, để các chuỗi thường gặp thành token đơn. Mỗi họ mô hình có bộ token hóa riêng — số đếm khác nhau giữa các nhà cung cấp, đó là lý do so sánh chi phí nên chạy trên *lưu lượng thực tế của chính bạn*.

## Đồng hồ tính phí chạy ra sao

Định giá API có một hình dạng chuẩn xuyên các nhà cung cấp:

| Đồng hồ | Đếm cái gì | Quan hệ điển hình |
| --- | --- | --- |
| **Token đầu vào** | Mọi thứ bạn gửi: system prompt, lịch sử, tài liệu truy xuất, câu hỏi | Mức cơ sở |
| **Token đầu ra** | Mọi thứ mô hình sinh ra, kể cả suy luận ẩn trên một số mô hình suy luận | Thường ~3–5× mức đầu vào |
| **Đầu vào đã cache** | Các phần đầu ổn định lặp lại (system prompt, tài liệu dài) | Thường rẻ hơn đầu vào tươi ~10× |
| **Theo lô/bất đồng bộ** | Các tác vụ không gấp gửi theo lô | Thường ~nửa giá |

Từ đó có hai sự thật cấu trúc. Thứ nhất, **lịch sử hội thoại được gửi lại ở mỗi lượt** — chi phí của một cuộc trò chuyện tăng theo bình phương độ dài trừ khi bạn cắt ngắn, tóm tắt, hay dựa vào caching. Thứ hai, **đầu ra chiếm phần lớn** khi bạn sinh văn bản dài, nên chỉ dẫn "hãy ngắn gọn" và trần đầu ra là các biện pháp kiểm soát chi phí thực, không chỉ là sở thích văn phong.

## Ước tính một khối lượng công việc

Phép tính luôn như nhau: (số yêu cầu mỗi ngày) × (token đầu vào trung bình × mức đầu vào + token đầu ra trung bình × mức đầu ra). Ví dụ minh họa với mức giá giả định — chẳng hạn đầu vào tốn 3 đô và đầu ra 15 đô mỗi triệu token: một bot hỗ trợ trả lời 10.000 truy vấn/ngày với prompt 2.000 token (chỉ dẫn + ngữ cảnh truy xuất) và câu trả lời 300 token tốn 10.000 × (2.000×3 đô + 300×15 đô)/1 triệu ≈ **105 đô/ngày**, hai phần ba trong đó là đầu vào. Tỷ lệ ấy là điển hình cho các app RAG — đó là lý do prompt caching và cắt gọn ngữ cảnh thường tiết kiệm nhiều hơn việc đổi mô hình.

## Các đòn bẩy lớn, xếp hạng

1. **Cache các phần đầu ổn định** — gần như thắng miễn phí cho bất kỳ app nào có một system prompt cố định dài hoặc tài liệu dùng chung.
2. **Chọn đúng cỡ mô hình** — định tuyến lưu lượng dễ sang một bậc rẻ hơn; dành các mô hình tiên phong cho cái đuôi khó.
3. **Cắt gọn ngữ cảnh** — truy xuất ít đoạn hơn nhưng tốt hơn; tóm tắt các lượt trò chuyện cũ; khử trùng lặp phần khuôn mẫu.
4. **Giới hạn và định hình đầu ra** — đặt độ dài tối đa; ưu tiên câu trả lời ngắn có cấu trúc khi có thể.
5. **Gom theo lô những gì không gấp** — phân loại và backfill ban đêm không nên trả giá tương tác.

## Câu hỏi thường gặp

**Vì sao tôi bị tính nhiều token hơn độ dài văn bản gợi ý?**
System prompt, định nghĩa công cụ, định dạng tin nhắn, và (trên các mô hình suy luận) token suy nghĩ đều được đếm, còn văn bản không phải tiếng Anh hoặc nặng mã token hóa đặc hơn quy tắc tiếng Anh.

**Cửa sổ ngữ cảnh có làm đổi định giá không?**
Cửa sổ là giới hạn dung lượng, không phải giá — nhưng lấp đầy nó thì có. Một số nhà cung cấp còn tính mức phụ trội trên các kích thước ngữ cảnh nhất định, nên các lượt gọi ngữ cảnh khổng lồ đáng được soi xét.

**Làm sao đếm token trước khi gửi?**
Dùng thư viện bộ token hóa hoặc endpoint đếm token của nhà cung cấp (với các bộ token hóa họ OpenAI, tiktoken chạy cục bộ). Để lập ngân sách, phép ước lượng ≈4 ký tự thường nằm trong khoảng 20%.`,
  },
];
