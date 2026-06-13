import type { DraftArticle } from './types';
import { devPracticesEn } from './dev-practices.en';

// Batch: Programming & Development (bản tiếng Việt bản địa). Cùng chủ đề và
// topicKey với dev-practices.en.ts, viết theo ngữ cảnh lập trình viên Việt.
// Dùng chung ảnh minh họa.

const promptOf = (key: string): string => {
  const hit = devPracticesEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const devPracticesVi: DraftArticle[] = [
  {
    topicKey: 'rebase-vs-merge',
    title: 'Git rebase và merge: khi nào dùng cái nào?',
    question: 'git merge và git rebase khác nhau ở đâu, và khi nào nên dùng từng cái?',
    summary:
      'merge giữ nguyên lịch sử đúng như nó đã diễn ra, tạo một commit hợp nhất; rebase "phát lại" các commit của bạn lên một nền mới để có lịch sử thẳng và gọn. Nhánh dùng chung thì merge, công việc riêng tư của bạn thì rebase trước khi chia sẻ.',
    tags: ['lập trình', 'git', 'quản lý phiên bản', 'công cụ lập trình'],
    language: 'vi',
    image: {
      prompt: promptOf('rebase-vs-merge'),
      alt: 'Hai đường ray hợp nhất tại ngã rẽ so với một ray được đặt lại thành một đường thẳng',
    },
    sources: [
      { title: 'Sách Pro Git — Rebasing', url: 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing' },
      { title: 'Atlassian — Merging vs Rebasing', url: 'https://www.atlassian.com/git/tutorials/merging-vs-rebasing' },
    ],
    content: `# Git rebase và merge: khi nào dùng cái nào?

Cả \`merge\` lẫn \`rebase\` đều giải quyết cùng một bài toán — gộp công việc từ nhánh này vào nhánh kia — nhưng chúng kể hai câu chuyện khác nhau về cách điều đó xảy ra. merge ghi lại lịch sử *đúng như nó thực sự diễn ra*, cả những nhánh rẽ. rebase thì *viết lại* lịch sử cho trông như thể bạn luôn làm việc trên một đường thẳng. Không cái nào "đúng" hơn; chúng được tối ưu cho những mục tiêu khác nhau, và quy tắc nổi tiếng chi phối chúng được suy ra trực tiếp từ chính việc mỗi cái làm.

## Mỗi lệnh thực sự làm gì

**merge** lấy hai nhánh và buộc chúng lại với nhau bằng một **commit hợp nhất** mới có hai commit cha. Các commit trên nhánh của bạn nằm yên tại chỗ; commit hợp nhất nối hai dòng thời gian lại. Lịch sử trở thành một đồ thị trung thực cho thấy "chúng phát triển song song, rồi hợp lại".

**rebase** thì nhấc các commit trên nhánh của bạn lên, đặt sang một bên, di chuyển tới đỉnh của nhánh đích, rồi **phát lại từng commit một** lên trên đó. Kết quả là một đường thẳng — như thể bạn bắt đầu công việc từ đoạn code mới nhất. Nhưng những commit được phát lại đó là *những commit mới với ID mới*; bản gốc bị loại bỏ. Đó là chi tiết then chốt: rebase viết lại lịch sử.

## Sự đánh đổi

| | merge | rebase |
| --- | --- | --- |
| Hình dạng lịch sử | Đồ thị có nhánh rẽ, trung thực với sự kiện | Đường thẳng gọn gàng |
| Tạo commit mới không? | Một commit hợp nhất | Viết lại mọi commit được phát lại |
| Giữ ngữ cảnh | Có — cho thấy khi nào/ở đâu công việc tách nhánh | Không — làm phẳng câu chuyện |
| Xử lý xung đột | Giải một lần, trong lúc hợp nhất | Có thể giải từng commit khi phát lại |
| An toàn trên nhánh dùng chung | Có | Không — viết lại nền của người khác |

## Quy tắc duy nhất ngăn thảm họa

**Đừng bao giờ rebase những commit mà người khác đã có.** Vì rebase thay commit cũ bằng commit mới, nên rebase một nhánh dùng chung/công khai sẽ viết lại lịch sử mà người khác đã dựa vào để làm việc — lần kéo về tiếp theo, lịch sử của họ và của bạn sẽ vênh nhau, sinh ra commit trùng lặp và sự rối ren đau đớn. Quy tắc vàng: *rebase công việc riêng tư, cục bộ; merge bất cứ thứ gì đã dùng chung.*

Một quy trình phổ biến và an toàn kết hợp cả hai: khi tự mình phát triển một nhánh tính năng, hãy định kỳ **rebase nó lên main mới nhất** để theo kịp với lịch sử gọn gàng; rồi để tích hợp nó vào main dùng chung, hãy **merge** (thường qua một pull request). Bạn vừa có lịch sử cục bộ ngăn nắp, vừa có một lần tích hợp trung thực, không phá hủy.

## Hướng dẫn thực tế

- **Dùng merge** để đưa một nhánh đã hoàn thành vào nhánh dùng chung, và bất cứ khi nào nhánh đã công khai.
- **Dùng rebase** để cập nhật nhánh riêng tư đang làm dở lên các commit main mới, và để dọn dẹp những commit cục bộ lộn xộn của chính bạn (rebase tương tác) trước khi review.
- **Tránh rebase** trên \`main\`/nhánh dùng chung, và dừng lại nếu bạn không chắc liệu người khác đã có commit của bạn chưa.

## Câu hỏi thường gặp

**rebase có xóa công việc của tôi không?**
Không — nó viết lại commit nhưng các thay đổi vẫn được giữ (và commit cũ còn lưu trong reflog để khôi phục). Nó thay đổi ID và thứ tự commit, chứ không phải nội dung chỉnh sửa của bạn.

**Tại sao một số nhóm cấm commit hợp nhất?**
Họ thích lịch sử hoàn toàn thẳng để dễ đọc và dễ bisect, nên yêu cầu rebase trước khi merge (hoặc "squash merge"). Đó là một lựa chọn phong cách có đánh đổi thật sự, không phải vấn đề đúng sai.

**squash merge là gì?**
Nó nén tất cả commit của một nhánh thành một commit duy nhất trên nhánh đích — một lịch sử gọn gàng kiểu "một tính năng một commit", đổi lại là mất đi độ chi tiết của từng commit trong nhánh.`,
  },
  {
    topicKey: 'rest-vs-graphql',
    title: 'REST và GraphQL: nên chọn phong cách API nào?',
    question: 'REST và GraphQL API khác nhau ở đâu, và khi nào nên dùng từng cái?',
    summary:
      'REST phơi bày nhiều endpoint cố định, mỗi cái trả về một hình dạng dữ liệu định sẵn; GraphQL chỉ phơi bày một endpoint, nơi client yêu cầu chính xác những trường nó muốn. GraphQL tỏa sáng với nhu cầu dữ liệu phức tạp, đa dạng; REST thì đơn giản hơn, dễ cache và phổ biến khắp nơi.',
    tags: ['lập trình', 'api', 'rest', 'graphql'],
    language: 'vi',
    image: {
      prompt: promptOf('rest-vs-graphql'),
      alt: 'Nhiều ô bán hàng cố định so với một quầy duy nhất phục vụ đúng đơn đặt theo yêu cầu',
    },
    sources: [
      { title: 'GraphQL — giới thiệu chính thức', url: 'https://graphql.org/learn/' },
      { title: 'MDN — Tổng quan về các khái niệm HTTP và REST', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
    ],
    content: `# REST và GraphQL: nên chọn phong cách API nào?

REST và GraphQL là hai cách thiết kế việc "client hỏi server lấy dữ liệu". **REST** cho bạn nhiều URL (endpoint), mỗi cái trả về một khối dữ liệu cố định. **GraphQL** cho bạn một endpoint duy nhất và một ngôn ngữ truy vấn, nên client chỉ rõ *chính xác* nó muốn những trường nào và nhận về đúng những trường đó — không thừa, không thiếu. Điểm tương phản quy về: ai quyết định hình dạng của phản hồi — server (REST) hay client (GraphQL).

## Chúng khác nhau ra sao trong thực tế

Giả sử bạn muốn lấy tên của một người dùng cùng tiêu đề ba bài viết gần nhất của họ.

**Với REST**, bạn thường gọi \`/users/123\` (trả về toàn bộ đối tượng người dùng), rồi gọi \`/users/123/posts\` (trả về các đối tượng bài viết đầy đủ). Bạn nhận về nhiều hơn nhiều so với điều đã hỏi (mọi trường của người dùng và bài viết đều tới), lại còn đi hai lượt khứ hồi. Đây chính là những ma sát kinh điển của REST: **lấy dư** (quá nhiều trường) và **lấy thiếu** (cần gọi thêm để ghép ra một khung nhìn).

**Với GraphQL**, bạn gửi một truy vấn tới một endpoint, hỏi \`user.name\` và \`user.posts(last: 3).title\`, rồi nhận về đúng những trường đó trong một phản hồi. Client lấy được chính xác dữ liệu của mình trong một yêu cầu duy nhất.

## Bảng đánh đổi

| | REST | GraphQL |
| --- | --- | --- |
| Endpoint | Nhiều, theo tài nguyên | Một |
| Hình dạng phản hồi | Server cố định | Client chọn |
| Lấy dư/lấy thiếu | Thường gặp | Tránh được theo thiết kế |
| Cache | Đơn giản (cache HTTP theo URL) | Khó hơn (một URL, truy vấn đa dạng) |
| Đường cong học tập & công cụ | Thấp hơn, phổ quát | Cao hơn; cần schema và tầng server |
| Quản lý phiên bản | Thường /v1, /v2 | Tiến hóa schema, đánh dấu trường lỗi thời |
| Giỏi nhất ở | Tài nguyên đơn giản, ổn định, dễ cache | Dữ liệu phức tạp, lồng nhau, thay đổi theo client |

## Khi nào chọn cái nào

**Hãy chọn REST khi** dữ liệu của bạn tương đối đơn giản và có dạng tài nguyên, bạn muốn dựa vào hệ cache và công cụ HTTP đã trưởng thành, bạn đang xây một API công khai mà nhiều client lạ sẽ dùng, hoặc bạn chỉ muốn lựa chọn ít ma sát nhất, được hiểu phổ quát nhất. REST vẫn là mặc định vì những lý do chính đáng.

**Hãy chọn GraphQL khi** client cần nhiều lát cắt khác nhau từ dữ liệu liên kết phong phú (kinh điển cho ứng dụng di động muốn giảm số lượng yêu cầu, và các bảng điều khiển phức tạp), bạn đang tổng hợp nhiều nguồn backend sau một đồ thị, hoặc các nhóm front-end muốn tự lặp lại nhu cầu dữ liệu mà không phải chờ endpoint mới. Cái giá là độ phức tạp server tăng thêm, một schema phải bảo trì, và cache khó hơn.

## Câu hỏi thường gặp

**GraphQL có "tốt hơn" REST không?**
Không — nó giải quyết việc lấy dư/lấy thiếu một cách thanh lịch, nhưng thêm độ phức tạp và những thách thức về cache. Với API đơn giản, REST thường là lựa chọn kỹ thuật tốt hơn. Hãy khớp công cụ với nhu cầu dữ liệu.

**Tôi có thể dùng cả hai không?**
Có, và rất phổ biến — nhiều hệ thống phơi bày REST cho các bề mặt đơn giản/công khai và GraphQL cho dữ liệu nội bộ/ứng dụng phức tạp, hoặc bọc các dịch vụ REST sau một cổng GraphQL.

**GraphQL có thay thế cơ sở dữ liệu không?**
Không — nó là một tầng truy vấn API nằm giữa client và server. Server của bạn vẫn lấy dữ liệu từ cơ sở dữ liệu hoặc các dịch vụ khác; GraphQL chỉ định hình thứ mà client nhận được.`,
  },
  {
    topicKey: 'sql-vs-nosql',
    title: 'SQL và NoSQL: chọn cơ sở dữ liệu thế nào?',
    question: 'Cơ sở dữ liệu SQL và NoSQL khác nhau ở đâu, và tôi chọn thế nào?',
    summary:
      'Cơ sở dữ liệu SQL lưu các hàng có cấu trúc với schema cố định và truy vấn quan hệ mạnh mẽ; NoSQL đánh đổi một phần cấu trúc đó để lấy sự linh hoạt và khả năng mở rộng ngang dễ hơn. Lựa chọn đúng tùy thuộc vào hình dạng dữ liệu, nhu cầu nhất quán và quy mô của bạn.',
    tags: ['lập trình', 'cơ sở dữ liệu', 'sql', 'nosql'],
    language: 'vi',
    image: {
      prompt: promptOf('sql-vs-nosql'),
      alt: 'Lưới ô vuông đồng nhất được liên kết so với cụm các vật chứa đa dạng, tự do',
    },
    sources: [
      { title: 'MongoDB — NoSQL vs cơ sở dữ liệu SQL', url: 'https://www.mongodb.com/resources/basics/databases/nosql-explained' },
      { title: 'PostgreSQL — giới thiệu (cơ sở dữ liệu quan hệ)', url: 'https://www.postgresql.org/about/' },
    ],
    content: `# SQL và NoSQL: chọn cơ sở dữ liệu thế nào?

"SQL vs NoSQL" phân loại cơ sở dữ liệu theo cách chúng tổ chức dữ liệu. **Cơ sở dữ liệu SQL (quan hệ)** — PostgreSQL, MySQL và những loại khác — lưu dữ liệu trong các bảng gồm hàng và cột với một schema định trước, và liên kết các bảng bằng quan hệ. **NoSQL** là cái ô bao trùm cho mọi thứ còn lại: kho tài liệu, kho khóa-giá trị, cột rộng, và cơ sở dữ liệu đồ thị, chúng nới lỏng cấu trúc bảng cứng nhắc để đổi lấy sự linh hoạt và khả năng mở rộng. Quyết định không phải là chuyện "mới hơn hay cũ hơn"; mà là khớp cơ sở dữ liệu với hình dạng dữ liệu của bạn và yêu cầu của hệ thống.

## Khác biệt cốt lõi: schema và cấu trúc

Một cơ sở dữ liệu **quan hệ** đòi hỏi cấu trúc ngay từ đầu: bạn định nghĩa bảng và kiểu cột, mọi hàng đều tuân theo, và cơ sở dữ liệu cưỡng chế điều đó. Đổi lại, bạn có khả năng truy vấn mạnh mẽ (join SQL giữa các bảng), những đảm bảo vững chắc, và hàng chục năm tin cậy. Cái giá là sự cứng nhắc — về sau đổi schema phải cẩn thận, và mô hình quan hệ theo truyền thống mở rộng *lên* (một máy chủ lớn hơn) tự nhiên hơn là mở rộng *ra* (nhiều máy chủ).

Một cơ sở dữ liệu **NoSQL tài liệu** (loại phổ biến nhất) lưu các tài liệu linh hoạt, giống JSON. Các bản ghi khác nhau có thể có các trường khác nhau; bạn có thể lồng dữ liệu liên quan vào trong một tài liệu. Điều này hợp với dữ liệu tiến hóa nhanh hoặc bất quy tắc, và được thiết kế ngay từ đầu để **mở rộng ngang** trên nhiều máy. Cái giá: ít đảm bảo dựng sẵn hơn, truy vấn xuyên bản ghi yếu hơn, và nguy cơ dữ liệu không nhất quán khi không có schema canh giữ.

## Đánh đổi, theo từng loại

| Loại | Lưu gì | Mạnh ở đâu | Ví dụ dùng |
| --- | --- | --- | --- |
| Quan hệ (SQL) | Bảng, hàng | Truy vấn phức tạp, giao dịch, toàn vẹn | Tài chính, đơn hàng, mọi thứ quan hệ |
| Tài liệu | Tài liệu giống JSON | Schema linh hoạt, dữ liệu lồng nhau | Danh mục, hồ sơ người dùng, nội dung |
| Khóa-giá trị | Khóa → giá trị đơn giản | Tra cứu cực nhanh, cache | Phiên, cache, cờ tính năng |
| Cột rộng | Hàng với cột động | Mở rộng ghi khổng lồ | Chuỗi thời gian, ghi log quy mô lớn |
| Đồ thị | Nút & quan hệ | Dữ liệu liên kết cao | Đồ thị mạng xã hội, gợi ý |

## Chọn thế nào

Hãy hỏi ba câu:

- **Dữ liệu của bạn có quan hệ và tính nhất quán có tối quan trọng không?** (Tiền, hàng tồn kho, bất cứ thứ gì mà một cập nhật làm dở dang là không thể chấp nhận.) → SQL, vì giao dịch và toàn vẹn của nó.
- **Hình dạng dữ liệu của bạn có bất quy tắc hay thay đổi nhanh không, hoặc bạn có cần mở rộng việc ghi ra nhiều máy chủ không?** → Một loại NoSQL khớp với mẫu truy cập.
- **Mẫu truy vấn của bạn là gì?** Nhiều join và báo cáo tùy hứng nghiêng về SQL; tra cứu đơn giản theo khóa nghiêng về khóa-giá trị; duyệt liên kết sâu nghiêng về đồ thị.

Mặc định hiện đại thành thật: **hãy bắt đầu với một cơ sở dữ liệu quan hệ vững chắc (ví dụ PostgreSQL) trừ khi bạn có lý do cụ thể để không làm vậy.** Nó xử lý được vô vàn nhu cầu, nay đã hỗ trợ cột JSON để có sự linh hoạt, và mở rộng xa hơn người ta tưởng. Hãy với tới NoSQL khi một yêu cầu cụ thể — quy mô cực lớn, một mẫu truy cập đặc thù, dữ liệu thực sự không schema — đòi hỏi điều đó.

## Câu hỏi thường gặp

**NoSQL có nhanh hơn SQL không?**
Không phải bẩm sinh — nó có thể nhanh hơn với những mẫu cụ thể (tra cứu khóa đơn giản, ghi ồ ạt) và chậm hơn hoặc vụng hơn với những mẫu khác (join phức tạp). "Nhanh hơn" hoàn toàn tùy vào thao tác.

**Cơ sở dữ liệu SQL có mở rộng được tới các hệ thống lớn không?**
Có — với sao chép, phân mảnh và cache, cơ sở dữ liệu quan hệ vận hành những hệ thống khổng lồ. Lời khẳng định "SQL không mở rộng được" đã lỗi thời; mở rộng chỉ cần thiết kế chủ đích hơn.

**Tôi có buộc phải chỉ chọn một không?**
Không — "lưu trữ đa dạng" rất phổ biến: một cơ sở dữ liệu quan hệ cho bản ghi cốt lõi, cộng thêm một cache khóa-giá trị và có lẽ một kho tìm kiếm hay đồ thị, mỗi cái cho điều nó làm tốt nhất.`,
  },
  {
    topicKey: 'https-how-it-works',
    title: 'HTTPS giữ an toàn cho kết nối của bạn như thế nào',
    question: 'HTTPS thực sự làm gì, và cái ổ khóa giữ dữ liệu của tôi an toàn ra sao?',
    summary:
      'HTTPS bọc lưu lượng web thông thường trong lớp mã hóa để không ai nằm giữa bạn và trang web đọc hay can thiệp được, và dùng chứng chỉ để chứng minh bạn thực sự đang nói chuyện với đúng máy chủ. Nó bảo vệ quyền riêng tư và sự toàn vẹn — nhưng không bảo chứng cho bản thân trang web.',
    tags: ['lập trình', 'bảo mật', 'https', 'web'],
    language: 'vi',
    image: {
      prompt: promptOf('https-how-it-works'),
      alt: 'Một thông điệp đi qua ống bảo vệ, bị xáo trộn với người ngoài, được niêm phong xác thực ở đích',
    },
    sources: [
      { title: 'MDN — HTTPS / TLS là gì', url: 'https://developer.mozilla.org/en-US/docs/Glossary/HTTPS' },
      { title: "Let's Encrypt — cách nó hoạt động", url: 'https://letsencrypt.org/how-it-works/' },
    ],
    content: `# HTTPS giữ an toàn cho kết nối của bạn như thế nào

HTTPS chỉ là HTTP — giao thức yêu cầu/phản hồi cơ bản của web — được bọc thêm một lớp bảo mật ("S" là Secure, do TLS cung cấp). HTTP thuần gửi mọi thứ dưới dạng văn bản đọc được mà bất cứ ai trên đường truyền mạng đều có thể thấy và sửa. HTTPS sửa điều đó bằng hai đảm bảo: **mã hóa** (người ngoài không đọc được lưu lượng của bạn) và **xác thực** (bạn thực sự đang nói chuyện với trang web bạn nghĩ, chứ không phải kẻ mạo danh). Cái ổ khóa là một lời hứa về *kết nối*, và hiểu chính xác nó hứa gì — và không hứa gì — thực sự hữu ích.

## Hai vấn đề nó giải quyết

**1. Nghe lén.** Trên HTTP thuần, mạng WiFi của bạn, nhà cung cấp internet của bạn, hay bất kỳ ai ở giữa, đều có thể đọc mọi trang và mật khẩu bạn gửi. HTTPS mã hóa lưu lượng để nó trở thành chuỗi vô nghĩa không đọc được với bất cứ ai ngoài hai đầu mút — dù nó vẫn đi qua cùng một internet công cộng.

**2. Mạo danh và can thiệp.** Làm sao bạn biết máy chủ đang trả lời thực sự là ngân hàng của bạn chứ không phải một kẻ tấn công đang chặn kết nối? HTTPS dùng **chứng chỉ** do các tổ chức được tin cậy cấp để chứng minh danh tính máy chủ, và các phép kiểm tra toàn vẹn để mọi can thiệp trên đường truyền đều bị phát hiện. Không có lớp này, riêng mã hóa cũng vô dụng — bạn có thể đang trò chuyện "riêng tư" với một tên trộm.

## Quá trình bắt tay diễn ra thế nào (giản lược)

Khi bạn kết nối qua HTTPS, một cuộc thương lượng nhanh diễn ra trước khi bất kỳ dữ liệu thật nào chảy qua:

1. **Kiểm tra chứng chỉ.** Máy chủ trình ra chứng chỉ của nó. Trình duyệt của bạn xác minh nó được một tổ chức được tin cậy cấp cho đúng tên miền này, chưa hết hạn và chưa bị thu hồi — xác nhận danh tính.
2. **Trao đổi khóa.** Dùng mật mã học khéo léo (toán học khóa công khai), hai bên thỏa thuận một khóa bí mật chung *mà không bao giờ gửi nó ra ngoài công khai*, dù có thể có ai đó đang theo dõi.
3. **Phiên mã hóa.** Từ đó, toàn bộ lưu lượng được mã hóa bằng khóa chung đó — mã hóa đối xứng nhanh cho phần còn lại của cuộc trò chuyện.

Phần tinh tế nằm ở bước 2: hai bên thiết lập một khóa riêng qua một kênh công khai, nên ngay cả kẻ nghe lén đã thấy toàn bộ cuộc bắt tay cũng không suy ra được nó.

## Cái ổ khóa nghĩa là gì và không nghĩa là gì

| Ổ khóa đảm bảo | Ổ khóa **KHÔNG** đảm bảo |
| --- | --- |
| Lưu lượng được mã hóa trên đường truyền | Trang web trung thực hay an toàn |
| Bạn đang kết nối tới đúng tên miền thật | Trang web sẽ không lừa bạn |
| Dữ liệu không bị sửa dọc đường | Công ty đứng sau nó đáng tin cậy |

Đây là điểm bị hiểu nhầm nhiều nhất: HTTPS bảo vệ *đường ống*, không phải *điểm đến*. Một trang web lừa đảo cũng có thể có ổ khóa hợp lệ — nó chỉ nghĩa là kết nối của bạn *tới trò lừa đảo* là riêng tư. HTTPS bảo vệ dữ liệu của bạn khỏi bên thứ ba; nó không bảo chứng cho ý đồ của trang web.

## Câu hỏi thường gặp

**HTTPS có chậm hơn HTTP không?**
Ngày nay thì không đáng kể — phần cứng và giao thức hiện đại khiến chi phí mã hóa rất nhỏ, và HTTPS còn thường mở ra những tính năng giao thức nhanh hơn. Nỗi lo cũ "mã hóa thì chậm" đã lỗi thời.

**Tại sao giờ đây cả đến blog cũng yêu cầu HTTPS?**
Vì ngay cả việc đọc một trang cũng để lộ thông tin riêng tư, và các trang không mã hóa có thể bị sửa trên đường truyền (chèn quảng cáo/mã độc). Trình duyệt nay đánh dấu HTTP thuần là "Không an toàn", và chứng chỉ miễn phí đã dỡ bỏ rào cản chi phí.

**HTTPS có bảo vệ dữ liệu sau khi nó tới máy chủ không?**
Không — nó bảo vệ dữ liệu *trên đường truyền*. Một khi dữ liệu tới máy chủ, sự an toàn của nó tùy thuộc vào cách trang web lưu trữ và xử lý nó. HTTPS là một lớp, không phải toàn bộ bảo mật.`,
  },
  {
    topicKey: 'what-is-an-api',
    title: 'API thực ra là gì? Giải thích bằng lời lẽ đời thường',
    question: 'API là gì, và nó thực sự hoạt động ra sao theo cách dễ hiểu?',
    summary:
      'API là một bản hợp đồng cho phép một chương trình yêu cầu dịch vụ từ chương trình khác mà không cần biết bên trong nó — như tấm thực đơn giữa bạn và nhà bếp. Nó quy định bạn có thể gọi gì và sẽ nhận lại gì, giấu đi sự phức tạp đằng sau.',
    tags: ['lập trình', 'api', 'kiến thức nền tảng', 'web'],
    language: 'vi',
    image: {
      prompt: promptOf('what-is-an-api'),
      alt: 'Một tấm thực đơn được đưa qua quầy, giấu đi gian bếp phức tạp, trả về một món ăn hoàn chỉnh',
    },
    sources: [
      { title: 'MDN — Giới thiệu về web API', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction' },
      { title: 'Red Hat — API là gì?', url: 'https://www.redhat.com/en/topics/api/what-are-application-programming-interfaces' },
    ],
    content: `# API thực ra là gì? Giải thích bằng lời lẽ đời thường

API là viết tắt của Application Programming Interface (giao diện lập trình ứng dụng), điều này chẳng giải thích gì cả. Đây là phiên bản hữu ích: API là một **bản hợp đồng cho phép hai phần mềm nói chuyện với nhau** — một chương trình cung cấp dịch vụ, và API quy định chính xác cách một chương trình khác có thể yêu cầu chúng. Phép so sánh kinh điển là một nhà hàng. Bạn (một chương trình) đọc **thực đơn** (API), gọi một món (gửi yêu cầu), và **nhà bếp** (chương trình kia) chuẩn bị rồi bưng ra (phản hồi). Bạn không bao giờ bước vào bếp hay học công thức của nó; thực đơn là giao diện được thỏa thuận giữa hai bên.

## Tại sao điều này quan trọng

Sự sắp đặt kiểu nhà hàng đó nắm bắt toàn bộ điểm mấu chốt: **bạn nhận được thứ mình cần mà không cần biết nó được làm ra thế nào.** Khi một ứng dụng hiển thị cho bạn một tấm bản đồ, nó không chứa địa lý của cả thế giới — nó hỏi một API bản đồ. Khi một trang web cho bạn "thanh toán bằng PayPal", nó không tự xử lý thanh toán — nó gọi API của PayPal. API cho phép phần mềm xây dựng trên phần mềm, nên không ai phải làm lại từ đầu bản đồ, thanh toán, dữ liệu thời tiết, hay hệ thống đăng nhập.

Điều này mang lại ba lợi ích lớn:

- **Trừu tượng hóa** — bạn dùng một dịch vụ mà không cần hiểu bên trong nó (bạn gọi món mà không cần biết bếp vận hành ra sao).
- **Tái sử dụng** — một dịch vụ được xây tốt cấp năng lượng cho hàng nghìn ứng dụng.
- **Tách biệt** — nhà bếp có thể thay đổi hoàn toàn công thức của nó, và miễn là thực đơn không đổi, đơn gọi món của bạn vẫn hiệu lực. Các nhóm có thể thay đổi phần bên trong của mình mà không phá vỡ tất cả những ai phụ thuộc vào họ.

## Một lệnh gọi web API diễn ra thế nào

Các API phổ biến nhất ngày nay là **web API** giao tiếp qua internet. Luồng rất đơn giản:

1. Chương trình của bạn gửi một **yêu cầu** tới một URL cụ thể (món trong "thực đơn"), thường kèm tham số ("một ly cà phê cỡ vừa, không đường").
2. Máy chủ nhận được, làm việc (truy vấn cơ sở dữ liệu, chạy logic), rồi
3. Gửi lại một **phản hồi** — thường là dữ liệu có cấu trúc ở định dạng **JSON**, mà chương trình dễ đọc.

Ví dụ, một ứng dụng thời tiết yêu cầu \`api.weather.com/forecast?city=Tokyo\` và nhận lại JSON với nhiệt độ và điều kiện thời tiết, rồi hiển thị ra đẹp đẽ. Ứng dụng cung cấp câu hỏi; API cung cấp dữ liệu.

## API ở khắp mọi nơi

| Bạn thấy | Đằng sau nó, một lệnh gọi API tới |
| --- | --- |
| "Đăng nhập bằng Google" | API xác thực của Google |
| Một tấm bản đồ nhúng trong ứng dụng | Một API bản đồ |
| Theo dõi vận chuyển trực tiếp | API của đơn vị chuyển phát |
| "Thanh toán bằng thẻ" | API của bên xử lý thanh toán |
| Một chatbot trong ứng dụng | API của một nhà cung cấp AI |

Phần mềm hiện đại phần lớn là **API gọi API** — mỗi ứng dụng là một gian bếp nhỏ đồng thời cũng gọi món từ những bên khác.

## Câu hỏi thường gặp

**API có giống một trang web không?**
Không — một trang web trả về các trang được trình bày cho con người; một API trả về dữ liệu được cấu trúc cho chương trình. Cùng một ý tưởng (yêu cầu → phản hồi), khác đối tượng phục vụ.

**API có tốn tiền không?**
Một số miễn phí, nhiều cái tính phí theo lượng dùng (mỗi yêu cầu hoặc theo khối lượng), và một số yêu cầu một API key để nhận diện và tính tiền bạn. API bản đồ, thanh toán và AI thường đo lường lượng dùng.

**"API key" là gì?**
Một mã thông báo bí mật nhận diện ứng dụng của bạn với API, dùng để xác thực bạn, áp đặt giới hạn và theo dõi lượng dùng — như một tấm thẻ thành viên nói rõ ai đang gọi món.`,
  },
  {
    topicKey: 'sync-vs-async',
    title: 'Đồng bộ và bất đồng bộ: tại sao code phải chờ (hay không)',
    question: 'Lập trình đồng bộ và bất đồng bộ khác nhau ở đâu?',
    summary:
      'Code đồng bộ mỗi lúc làm một việc, chặn lại cho đến khi từng bước xong; code bất đồng bộ có thể khởi động một tác vụ chậm rồi đi làm việc khác, xử lý kết quả sau. Bất đồng bộ giữ cho chương trình luôn phản hồi khi chờ những thứ chậm như mạng và tập tin.',
    tags: ['lập trình', 'bất đồng bộ', 'đồng thời', 'kiến thức nền tảng'],
    language: 'vi',
    image: {
      prompt: promptOf('sync-vs-async'),
      alt: 'Một đầu bếp ngồi không chờ một nồi so với một đầu bếp trông nhiều nồi khi từng nồi sẵn sàng',
    },
    sources: [
      { title: 'MDN — Giới thiệu JavaScript bất đồng bộ', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing' },
    ],
    content: `# Đồng bộ và bất đồng bộ: tại sao code phải chờ (hay không)

Sự phân biệt này nói về **một chương trình làm gì trong khi chờ đợi**. Code **đồng bộ** chạy từng bước một, và mỗi bước phải *hoàn thành trọn vẹn* trước khi bước kế tiếp bắt đầu — nếu một bước chậm, mọi thứ phía sau nó phải chờ. Code **bất đồng bộ** có thể *khởi động* một tác vụ chậm, đặt nó sang một bên, và tiếp tục làm những việc hữu ích khác, xử lý kết quả bất cứ khi nào nó sẵn sàng. Sự khác biệt hầu như chẳng đáng kể với các thao tác nhanh, và quan trọng vô cùng với các thao tác chậm — gọi mạng, đọc tập tin, truy vấn cơ sở dữ liệu — mà đó đúng là nơi chương trình tiêu tốn phần lớn thời gian nhàn rỗi.

## Phép so sánh nhà bếp

Hãy hình dung việc làm bữa sáng. Một đầu bếp **đồng bộ** bỏ bánh mì vào lò nướng rồi *đứng đó nhìn chằm chằm* cho đến khi nó bật lên, không làm gì khác, trước khi bắt đầu pha cà phê. Tổng thời gian: tổng của mọi bước, cái này nối tiếp cái kia, bao gồm cả thời gian chờ.

Một đầu bếp **bất đồng bộ** khởi động việc nướng bánh, và *trong khi bánh đang nướng*, bắt đầu pha cà phê, và *trong khi cà phê đang pha*, đập trứng — trông nom mỗi thứ khi nó xong. Cùng những tác vụ, tổng thời gian ít hơn nhiều, vì thời gian chờ đã chồng lấn với công việc hữu ích. Đầu bếp không nhanh hơn; họ chỉ thôi đứng không.

## Tại sao điều này quan trọng với chương trình thật

Máy tính tiêu tốn rất nhiều thời gian chờ những thứ chậm: một máy chủ trả lời, một đĩa đọc, một cơ sở dữ liệu hồi đáp — mỗi cái là một thiên thu so với tốc độ của bộ xử lý. Code đồng bộ "chặn" trong những lần chờ này sẽ đóng băng mọi thứ phía sau nó. Trong một máy chủ web, một lệnh gọi chặn có thể khiến nó không phục vụ được bất kỳ người dùng nào khác cho đến khi một yêu cầu chậm hoàn thành; trong một ứng dụng, đó là giao diện đông cứng, không phản hồi đáng sợ.

| | Đồng bộ | Bất đồng bộ |
| --- | --- | --- |
| Thứ tự | Nghiêm ngặt một lúc một việc | Có thể chồng lấn các khoảng chờ |
| Khi gặp bước chậm | Mọi thứ phải chờ (chặn) | Công việc khác vẫn tiếp tục |
| Sự đơn giản | Dễ đọc và dễ suy luận hơn | Luồng điều khiển phức tạp hơn |
| Hợp nhất với | Các bước nhanh, phụ thuộc nhau | I/O chậm: mạng, tập tin, cơ sở dữ liệu |

## Bất đồng bộ được diễn đạt trong code thế nào

Bạn không phải tự tay tung hứng việc này — các ngôn ngữ cung cấp công cụ. Những mẫu phổ biến gồm **callback** (chạy cái này khi xong), **promise/future** (một chỗ giữ chỗ cho một kết quả sẽ tới), và cú pháp **async/await** hiện đại cho phép code bất đồng bộ *đọc* gần như code đồng bộ trong khi vẫn không chặn. Mô hình tư duy then chốt: \`await\` nghĩa là "tạm dừng *tác vụ này* tại đây cho đến khi kết quả sẵn sàng, nhưng để các tác vụ khác chạy trong lúc đó" — chứ không phải "đóng băng toàn bộ chương trình".

Sự đánh đổi là có thật: code bất đồng bộ mạnh mẽ hơn cho khả năng phản hồi nhưng khó suy luận hơn (thứ tự, xử lý lỗi, và trạng thái dùng chung đều rối hơn). Cái nghề là dùng nó ở nơi việc chờ đợi thực sự xảy ra, và giữ cho logic đơn giản, nhanh ở dạng đồng bộ.

## Câu hỏi thường gặp

**Bất đồng bộ có giống đa luồng/song song không?**
Không hẳn. Bất đồng bộ là về việc không *chờ đợi nhàn rỗi*; nó có thể chạy trên một luồng duy nhất bằng cách xen kẽ các tác vụ trong thời gian chúng chờ. Song song là thực sự làm nhiều việc *cùng lúc* trên nhiều lõi. Chúng liên quan nhưng khác biệt — bất đồng bộ chồng lấn việc chờ, song song chồng lấn việc làm.

**Bất đồng bộ có làm code của tôi chạy nhanh hơn không?**
Nó không tăng tốc bản thân công việc; nó thôi lãng phí thời gian vào việc chờ, cải thiện thông lượng và khả năng phản hồi. Với công việc nặng về CPU mà không có chờ đợi, riêng bất đồng bộ giúp được ít — đó là chỗ song song ra tay.

**Tại sao code bất đồng bộ có vẻ khó hiểu hơn nhiều?**
Vì sự thực thi không còn chảy từ trên xuống dưới theo thời gian — mọi thứ khởi động bây giờ và kết thúc sau, lỗi tới không theo thứ tự, và bạn phải suy luận về "khi nào" lẫn "cái gì". async/await thuần hóa phần lớn điều này, nhưng tính phi tuyến ở tầng nền mới là khó khăn thực sự.`,
  },
  {
    topicKey: 'what-is-docker',
    title: 'Docker là gì, và tại sao lập trình viên yêu thích container?',
    question: 'Docker là gì, container là gì, và tại sao chúng được dùng rộng rãi đến vậy?',
    summary:
      'Một container đóng gói một ứng dụng cùng mọi thứ nó cần để chạy thành một đơn vị di động, nên nó hành xử y hệt nhau ở mọi nơi — giải quyết câu "máy tôi chạy được mà". Container nhẹ hơn máy ảo vì chúng chia sẻ nhân hệ điều hành của máy chủ.',
    tags: ['lập trình', 'docker', 'container', 'devops'],
    language: 'vi',
    image: {
      prompt: promptOf('what-is-docker'),
      alt: 'Một dãy container niêm phong, mỗi cái chứa một ứng dụng tự túc, có thể xếp lên bất kỳ nền tảng nào',
    },
    sources: [
      { title: 'Docker — container là gì?', url: 'https://www.docker.com/resources/what-container/' },
    ],
    content: `# Docker là gì, và tại sao lập trình viên yêu thích container?

Docker là công cụ đã đưa **container** thành chủ lưu, và container giải quyết một trong những cơn đau đầu dai dẳng nhất của phần mềm: *"máy tôi chạy được mà"* — code chạy ngon với lập trình viên nhưng hỏng ở chỗ khác vì máy tính kia có phiên bản, thiết lập khác hoặc thiếu thứ gì đó. Container sửa điều này bằng cách **đóng gói một ứng dụng cùng mọi thứ nó cần để chạy** — code, runtime, thư viện, công cụ hệ thống, cấu hình — thành một đơn vị niêm phong, di động, hành xử y hệt nhau dù chạy ở đâu. Phép so sánh container vận tải rất chính xác: chuẩn hóa cái thùng, và bất kỳ tàu, cần cẩu hay xe tải nào cũng xử lý được nó mà chẳng cần quan tâm bên trong là gì.

## Vấn đề nó giải quyết

Phần mềm phụ thuộc vào môi trường của nó: một phiên bản ngôn ngữ cụ thể, những thư viện riêng, một số thiết lập hệ thống nhất định. Chuyển ứng dụng sang laptop của đồng nghiệp, một máy chủ kiểm thử, hay môi trường production, và bất kỳ sự lệch nào cũng có thể làm nó hỏng. Tự tay tái tạo môi trường y hệt ở mọi nơi vừa mong manh vừa phát điên. Container đóng gói môi trường *cùng với* ứng dụng, nên "môi trường" đi theo và chẳng có gì để lệch. Xây một lần; nó chạy như nhau trên laptop của bạn, máy của đồng đội, và trên đám mây.

## Container so với máy ảo

Container thường được đem so với máy ảo (VM), thứ cũng cô lập phần mềm — nhưng khác biệt về độ nặng mới là điều then chốt:

| | Máy ảo | Container |
| --- | --- | --- |
| Đóng gói | Cả một hệ điều hành khách + ứng dụng | Chỉ ứng dụng + các phụ thuộc của nó |
| Chia sẻ | Không gì cả — mỗi cái một OS đầy đủ | Nhân OS của máy chủ |
| Kích thước | Hàng gigabyte | Hàng megabyte |
| Khởi động | Vài phút | Vài giây hoặc ít hơn |
| Mật độ | Vài cái mỗi máy | Nhiều cái mỗi máy |

Một VM ảo hóa cả một máy tính, mang theo một hệ điều hành đầy đủ cho mỗi ứng dụng — mạnh mẽ nhưng nặng nề. Một container chia sẻ nhân OS của máy chủ và chỉ cô lập phần nằm trên nó, khiến nó nhẹ hơn hẳn và khởi động nhanh hơn. Bạn có thể chạy nhiều container ở chỗ chỉ nhét vừa vài VM.

## Tại sao lập trình viên và vận hành đều yêu thích chúng

- **Tính nhất quán** — loại bỏ sự trôi dạt môi trường giữa dev, test và production. Cái cớ "máy tôi chạy được mà" cáo chung.
- **Tính di động** — cùng một container image chạy trên bất kỳ máy nào có container runtime, gồm mọi đám mây lớn.
- **Tính cô lập** — mỗi container tự túc, nên các ứng dụng có phụ thuộc xung đột vẫn chung sống êm thấm trên một máy chủ.
- **Tốc độ và mật độ** — khởi động nhẹ khiến chúng lý tưởng cho việc co giãn lên xuống và nhồi nhét hiệu quả vào máy chủ.
- **Nền tảng cho hạ tầng hiện đại** — container là viên gạch xây dựng cho microservice và các hệ thống điều phối (như Kubernetes) chạy chúng ở quy mô lớn.

## Câu hỏi thường gặp

**Docker có giống một container không?**
Không hẳn — container là khái niệm/công nghệ; Docker là bộ công cụ phổ biến xây và chạy chúng. Có những công cụ khác, nhưng Docker đã phổ cập quy trình này và định dạng image.

**Container có thay thế máy ảo không?**
Thường thì có, nhưng không phải lúc nào cũng vậy — chúng thường được dùng *cùng nhau* (container chạy bên trong VM trên đám mây). VM vẫn quan trọng cho sự cô lập mạnh hơn và chạy các hệ điều hành khác nhau; container thắng ở độ nhẹ và tốc độ.

**Container có phải một ranh giới bảo mật không?**
Nó cung cấp sự cô lập, nhưng yếu hơn của VM vì container chia sẻ nhân của máy chủ. Với phần lớn trường hợp dùng thì đủ; với các tải đa khách thuê thù địch, các nhóm bổ sung gia cố thêm hoặc kết hợp với VM.`,
  },
  {
    topicKey: 'big-o-notation',
    title: 'Ký hiệu Big-O giải thích mà không nhức đầu vì toán',
    question: 'Ký hiệu Big-O là gì, và tại sao lập trình viên lại quan tâm đến nó?',
    summary:
      'Big-O mô tả khối lượng công việc của một thuật toán tăng lên thế nào khi đầu vào lớn lên — không phải tốc độ chính xác, mà là hành vi mở rộng. Đó là lý do một cách tiếp cận vẫn nhanh trên hàng triệu phần tử trong khi cách khác ì ạch tới chết, và nó dẫn dắt việc chọn cách tiếp cận đúng.',
    tags: ['lập trình', 'thuật toán', 'khoa học máy tính', 'hiệu năng'],
    language: 'vi',
    image: {
      prompt: promptOf('big-o-notation'),
      alt: 'Nhiều đường cong từ một điểm gốc phân kỳ từ phẳng tới gần như thẳng đứng',
    },
    sources: [
      { title: 'Khan Academy — Ký hiệu tiệm cận', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation' },
    ],
    content: `# Ký hiệu Big-O giải thích mà không nhức đầu vì toán

Ký hiệu Big-O nghe như thứ toán học đáng sợ, nhưng ý tưởng thì đơn giản và thực dụng: nó mô tả **khối lượng công việc một thuật toán làm tăng lên thế nào khi đầu vào lớn dần.** Nó cố tình bỏ qua thời gian chính xác (vốn tùy thuộc phần cứng) và tập trung vào *hình dạng* của sự tăng trưởng. Đó mới là điều thực sự quan trọng ở quy mô lớn: một thuật toán ổn với 100 phần tử có thể mất một phần nhỏ của giây hoặc có thể mất một tuần với 10 triệu phần tử, và Big-O cho bạn biết là cái nào — trước khi bạn phát hiện ra theo cách đau đớn.

## Tại sao "tăng thế nào" thắng "nhanh thế nào"

Thời gian chạy thực tế tùy thuộc vào máy, ngôn ngữ, hôm đó. Big-O lột bỏ những thứ đó đi để so sánh *hành vi mở rộng* — vì đó mới là điều sống sót qua sự tăng trưởng. Một cách tiếp cận nhanh gấp đôi trên đầu vào nhỏ nhưng tăng trưởng tệ hơn sẽ thua thảm hại khi dữ liệu lớn lên. Câu hỏi Big-O trả lời không phải "nó mất bao lâu?" mà là "**chuyện gì xảy ra khi đầu vào lớn lên gấp 10 hay gấp 1000 lần?**" — câu hỏi quyết định liệu phần mềm của bạn năm sau còn dùng được hay không.

## Các lớp thường gặp, bằng lời lẽ đời thường

Hãy hình dung \`n\` là kích thước của đầu vào (số phần tử):

| Big-O | Tên | Ý nghĩa đời thường | Ví dụ |
| --- | --- | --- | --- |
| O(1) | Hằng số | Cùng khối lượng công việc bất kể kích thước | Tra một phần tử theo chỉ số |
| O(log n) | Logarit | Tăng rất chậm; mỗi bước giảm một nửa | Tìm kiếm nhị phân trong dữ liệu đã sắp xếp |
| O(n) | Tuyến tính | Công việc tăng cùng nhịp với đầu vào | Quét qua một danh sách một lần |
| O(n log n) | Tuyến tính-logarit | Hơi tệ hơn tuyến tính | Các thuật toán sắp xếp tốt |
| O(n²) | Bậc hai | Công việc bùng nổ; mỗi phần tử so mỗi phần tử | So sánh tất cả các cặp (cách ngây thơ) |
| O(2ⁿ) | Lũy thừa | Thảm họa; nhân đôi mỗi khi thêm một phần tử | Vét cạn mọi tổ hợp |

Khoảng cách lớn đến kinh ngạc ở quy mô lớn. Với một triệu phần tử, một thuật toán O(n) làm khoảng 1 triệu bước; một thuật toán O(n²) làm khoảng 1.000.000.000.000 — khác biệt giữa tức thì và gần như không bao giờ. Đây là lý do một cách tiếp cận O(n²) giấu trong một vòng lặp là một thảm họa hiệu năng kinh điển, và là lý do tìm được một giải pháp thay thế O(n log n) hoặc O(n) có thể biến một chương trình vô vọng thành nhanh.

## Dùng nó trong thực tế thế nào

Bạn không cần dẫn ra chứng minh. Kỹ năng thực dụng là **nhận diện mẫu hình**: một vòng lặp đơn qua dữ liệu thường là O(n); một vòng lặp lồng trong vòng lặp qua cùng dữ liệu thường là O(n²) — một lá cờ đỏ cần cân nhắc lại; liên tục giảm bài toán đi một nửa gợi ý O(log n). Khi thứ gì đó chậm trên đầu vào lớn, tư duy Big-O chỉ ra thủ phạm (thường là một vòng lặp lồng vô tình hoặc một thao tác tra cứu chậm) và chỉ ra cách sửa (một cấu trúc dữ liệu hoặc thuật toán tốt hơn). Đó cũng là lý do chọn đúng cấu trúc dữ liệu — một bảng băm cho tra cứu O(1) thay vì quét qua một danh sách — là một trong những quyết định hiệu năng có đòn bẩy cao nhất.

## Câu hỏi thường gặp

**Big-O thấp hơn có luôn nghĩa là nhanh hơn không?**
Không phải với đầu vào nhỏ — Big-O mô tả sự tăng trưởng, bỏ qua hằng số, nên một lớp "tệ hơn" có thể thắng trên dữ liệu cực nhỏ. Nó quan trọng nhất khi đầu vào lớn lên; với vài phần tử ít ỏi, sự đơn giản thường thắng tối ưu lý thuyết.

**Khác biệt giữa trường hợp tốt nhất, trung bình và xấu nhất là gì?**
Một thuật toán có thể hành xử khác nhau tùy đầu vào (ví dụ đã sắp xếp sẵn so với ngẫu nhiên). Big-O thường nêu trường hợp xấu nhất như một sự đảm bảo, nhưng trường hợp trung bình thường quan trọng hơn trong thực tế.

**Big-O có chỉ về tốc độ không?**
Không — nó cũng mô tả sự tăng trưởng của **bộ nhớ** (độ phức tạp không gian). Một thuật toán có thể nhanh nhưng dùng bộ nhớ tăng tệ hại theo đầu vào; cả hai chiều đều quan trọng khi chọn cách tiếp cận.`,
  },
  {
    topicKey: 'what-is-caching',
    title: 'Caching là gì, và tại sao nó ở khắp mọi nơi?',
    question: 'Caching là gì, nó hoạt động thế nào, và tại sao nó lại quan trọng đến vậy với hiệu năng?',
    summary:
      'Một cache lưu các bản sao dữ liệu ở nơi dễ với tới hơn, nên các yêu cầu lặp lại bỏ qua được nguồn gốc chậm chạp. Đó là một trong những mẹo tăng tốc mạnh nhất của ngành máy tính — dùng ở mọi tầng — và bài toán khó nhất của nó là biết khi nào bản sao đã cũ.',
    tags: ['lập trình', 'caching', 'hiệu năng', 'hệ thống'],
    language: 'vi',
    image: {
      prompt: promptOf('what-is-caching'),
      alt: 'Một vật hay cần để trên kệ gần (đường ngắn) so với cất trong kho xa (đường dài)',
    },
    sources: [
      { title: 'MDN — Cache HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching' },
      { title: 'Cloudflare — caching là gì', url: 'https://www.cloudflare.com/learning/cdn/what-is-caching/' },
    ],
    content: `# Caching là gì, và tại sao nó ở khắp mọi nơi?

Một cache là một kho các bản sao được giữ ở đâu đó nhanh, để bạn không phải lấy từ đâu đó chậm mỗi lần. Nguyên lý rất trực giác: nếu bạn cứ liên tục với lấy cùng một quyển sách, bạn để nó trên bàn thay vì đi bộ tới thư viện mỗi lần. Trong máy tính, "thư viện" có thể là một cơ sở dữ liệu, một máy chủ ở xa, hoặc một đĩa chậm, còn "bàn của bạn" là bộ nhớ nhanh hơn ở gần. Caching là **một trong những kỹ thuật hiệu năng phổ quát nhất trong toàn bộ ngành máy tính** — hiện diện ở hầu như mọi tầng — vì khoảng cách tốc độ giữa lưu trữ nhanh và chậm là khổng lồ, và phần lớn hệ thống yêu cầu cùng những thứ lặp đi lặp lại.

## Tại sao nó hiệu quả đến vậy

Hai sự thật khiến caching đem lại lợi ích to lớn. Thứ nhất, **chênh lệch tốc độ rất lớn**: đọc từ bộ nhớ có thể nhanh hơn hàng nghìn lần so với từ đĩa hoặc qua mạng. Thứ hai, **việc truy cập có tính lặp lại**: chương trình và người dùng có xu hướng muốn cùng dữ liệu lặp đi lặp lại (video phổ biến, hồ sơ của người dùng đã đăng nhập, trang chủ). Giữ những thứ hay cần ở gần, và đại đa số yêu cầu được phục vụ nhanh, chỉ thi thoảng mới phải trả giá cho đường chậm. Ngay cả việc cache một phần nhỏ dữ liệu "nóng" cũng có thể phục vụ phần lớn lưu lượng.

## Caching ở mọi tầng

Bạn đang được bao quanh bởi các cache làm việc một cách vô hình:

| Cache | Nó tăng tốc cái gì |
| --- | --- |
| Cache CPU | Bộ xử lý với tới dữ liệu nhanh hơn bộ nhớ chính |
| Cache trình duyệt | Tải lại các trang web mà không cần tải lại hình ảnh/script |
| CDN (mạng phân phối nội dung) | Phục vụ nội dung từ một máy chủ ở gần bạn, không phải băng qua nửa vòng trái đất |
| Cache ứng dụng/bộ nhớ (ví dụ Redis) | Tránh các truy vấn cơ sở dữ liệu lặp lại |
| Cache cơ sở dữ liệu | Tái dùng kết quả của các truy vấn gần đây |
| Cache DNS | Bỏ qua các lần tra cứu địa chỉ lặp lại |

Một lần tải trang có thể hưởng lợi từ nửa tá cache xếp chồng lên nhau — đó là lý do lần truy cập thứ hai vào một trang web nhanh hơn nhiều so với lần đầu.

## Phần khó: biết khi nào một bản sao đã cũ

Cái khó nổi tiếng của caching không phải là lưu các bản sao — mà là biết **khi nào một bản sao đã lỗi thời.** Nếu dữ liệu gốc thay đổi mà cache vẫn phục vụ bản sao cũ, người dùng thấy thông tin sai (một mức giá đã đổi, một hồ sơ đã được cập nhật). Đây là "vô hiệu hóa cache", một nửa của câu đùa nổi tiếng về hai bài toán khó nhất trong khoa học máy tính. Các hệ thống quản lý nó bằng những chiến lược như **hết hạn** (bản sao sống một khoảng thời gian định sẵn rồi làm mới), **vô hiệu hóa** (chủ động xóa bản sao khi nguồn thay đổi), và chấp nhận **nhất quán cuối cùng** (chịu đựng sự cũ trong chốc lát để đổi lấy tốc độ). Quyết định dữ liệu phải mới đến đâu — so với phải nhanh đến đâu — là sự đánh đổi cốt lõi của caching.

## Câu hỏi thường gặp

**Sao không cứ cache mọi thứ mãi mãi?**
Vì dữ liệu thay đổi, và các bản sao cũ gây ra lỗi; ngoài ra cache có không gian hữu hạn, nên nó loại bỏ những mục ít dùng hơn. Caching đánh đổi sự tươi mới hoàn hảo để lấy tốc độ — bạn cache những thứ "hơi cũ vẫn an toàn".

**"Xóa cache" sửa được điều gì?**
Nó buộc lấy các bản sao mới từ nguồn. Khi một trang web trông như bị hỏng hoặc lỗi thời, trình duyệt của bạn có thể đang hiển thị các tập tin cache cũ; xóa đi khiến nó lấy lại các phiên bản hiện tại.

**Caching có thể gây ra lỗi không?**
Có — phục vụ dữ liệu cũ là lỗi kinh điển. Một tỷ lệ đáng ngạc nhiên các vấn đề "nó không cập nhật!" là do cache ở đâu đó trong chuỗi đang giữ các bản sao cũ. Mạnh mẽ, nhưng đúng là một nguồn của những vấn đề tinh vi.`,
  },
];
