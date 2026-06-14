import type { DraftArticle } from './types';
import { digitalSecurityEn } from './digital-security.en';

// Batch: Digital Privacy & Security (bản tiếng Việt bản địa). Cùng chủ đề và
// topicKey với digital-security.en.ts; nội dung được viết tự nhiên cho người đọc
// Việt Nam (ví dụ chú ý các tình huống quen thuộc trong nước). Dùng chung ảnh.

const promptOf = (key: string): string => {
  const hit = digitalSecurityEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const digitalSecurityVi: DraftArticle[] = [
  {
    topicKey: 'password-managers',
    title: 'Vì sao bạn nên dùng trình quản lý mật khẩu?',
    question: 'Trình quản lý mật khẩu là gì, và để chung tất cả mật khẩu một chỗ có thực sự an toàn hơn tự nhớ không?',
    summary:
      'Trình quản lý mật khẩu tạo và lưu một mật khẩu mạnh riêng cho từng tài khoản, tất cả nằm sau một mật khẩu chủ, nên một trang bị lộ cũng không mở được các tài khoản khác. Với hầu hết mọi người, đây là thói quen bảo mật hiệu quả nhất.',
    tags: ['bảo mật', 'quyền riêng tư', 'mật khẩu', 'an toàn số'],
    language: 'vi',
    image: {
      prompt: promptOf('password-managers'),
      alt: 'Một chìa khóa chủ mở kho chứa hàng trăm chìa khóa khác nhau',
    },
    sources: [
      { title: 'NIST — Hướng dẫn về Danh tính Số (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Dùng mật khẩu mạnh và trình quản lý mật khẩu', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# Vì sao bạn nên dùng trình quản lý mật khẩu?

Vấn đề cốt lõi mà trình quản lý mật khẩu giải quyết là **việc dùng lại mật khẩu**. Không ai nhớ nổi cả trăm mật khẩu mạnh khác nhau, nên người ta xoay đi xoay lại vài cái — và điều đó có nghĩa là: chỉ cần bất kỳ trang nào bị tấn công, kẻ gian sẽ lấy cặp "email + mật khẩu" đó đem thử vào ngân hàng, email và mọi nơi khác của bạn. Kiểu tấn công tự động này gọi là **dò nhồi thông tin đăng nhập (credential stuffing)**, là một trong những cách phổ biến nhất khiến tài khoản bị chiếm. Trình quản lý mật khẩu chặn nó tận gốc bằng cách cấp cho mỗi tài khoản một mật khẩu ngẫu nhiên, độc nhất.

## Nó hoạt động thế nào

Trình quản lý mật khẩu về bản chất là một kho được mã hóa. Bạn chỉ cần nhớ đúng **một** mật khẩu chủ mạnh; phần còn lại nó nhớ thay bạn:

- **Tạo** ra những mật khẩu dài và ngẫu nhiên (ví dụ \`v8#mQ2!pLx9$\`) mà bạn không bao giờ phải gõ hay nhớ.
- **Lưu trữ** chúng ở dạng mã hóa, khóa lại bằng mật khẩu chủ của bạn.
- **Tự động điền** đúng thông tin đăng nhập vào đúng trang — và như một phần thưởng, nó chống lừa đảo (phishing), vì nó sẽ không điền mật khẩu ngân hàng thật của bạn vào một tên miền giả trông na ná.

Kho được mã hóa đến mức ngay cả công ty cung cấp trình quản lý cũng không đọc được mật khẩu của bạn — đặc tính này gọi là "không kiến thức" (zero-knowledge). Mật khẩu chủ của bạn không bao giờ rời thiết bị ở dạng có thể dùng được.

## Mối lo theo bản năng, trả lời thẳng

Nhiều người theo bản năng lo lắng: "Để hết trứng vào một giỏ chẳng phải nguy hiểm hơn sao?" Cảm giác là vậy, nhưng tính toán lại đi ngược hẳn:

| Không dùng trình quản lý | Dùng trình quản lý |
| --- | --- |
| Ít mật khẩu, dùng lại nhiều | Mỗi trang một mật khẩu riêng |
| Một chỗ lộ → nhiều tài khoản sụp đổ | Một chỗ lộ → chỉ đúng một, được cô lập |
| Chọn mật khẩu yếu cho dễ nhớ | Dài, ngẫu nhiên, không phá được |
| Mật khẩu bị gõ vào trang lừa đảo | Tự động điền từ chối tên miền sai |

Đúng là mật khẩu chủ là một điểm yếu duy nhất — nên bạn bảo vệ *nó* thật tốt (một mật khẩu dài gồm các từ ngẫu nhiên, cộng thêm xác thực hai yếu tố cho chính trình quản lý) và chấp nhận một sự thật: giữ thật chặt một bí mật còn hơn giữ một trăm bí mật một cách hời hợt.

## Chọn thế nào, bắt đầu ra sao

Những trình quản lý có uy tín — dù là dịch vụ đám mây được đánh giá tốt, hay các lựa chọn ngoại tuyến/mã nguồn mở được tôn trọng — đều vượt xa việc dùng lại mật khẩu. Vài lời khuyên thực tế:

- **Mật khẩu chủ**: dùng một cụm mật khẩu dài gồm các từ ngẫu nhiên, độc nhất, chưa từng dùng ở bất cứ đâu khác. Đây là cái duy nhất bạn thật sự phải thuộc lòng.
- **Bật xác thực hai yếu tố** cho chính tài khoản trình quản lý.
- **Chuyển dần dần**: để nó nhập các mật khẩu hiện có, rồi ưu tiên đổi mật khẩu bị dùng lại ở các tài khoản quan trọng trước (email, ngân hàng, mua sắm chính).
- **Ngay cả cái có sẵn trong trình duyệt** cũng hơn việc dùng lại — hành vi then chốt là "mật khẩu riêng ở mọi nơi", không phải một thương hiệu cụ thể nào.

## Câu hỏi thường gặp

**Lỡ quên mật khẩu chủ thì sao?**
Với mã hóa không-kiến-thức thực thụ, nhà cung cấp thường không thể khôi phục cho bạn — đó chính là ý nghĩa của nó. Hãy thiết lập sẵn các phương án khôi phục của trình quản lý (bộ khẩn cấp, mã khôi phục) ngay khi bắt đầu, và lưu ngoại tuyến.

**Đồng bộ qua đám mây có an toàn không?**
Kho được **mã hóa rồi mới** đồng bộ, nên máy chủ đồng bộ luôn chỉ giữ một khối dữ liệu không đọc được. Cái bảo vệ nó là mã hóa, không phải mạng.

**Mật khẩu lưu trong trình duyệt có đủ dùng không?**
Hơn hẳn việc dùng lại, và với nhiều người là đủ. Trình quản lý chuyên dụng cho thêm khả năng dùng xuyên trình duyệt, chia sẻ an toàn, cảnh báo rò rỉ và cô lập mạnh hơn — càng nhiều tài khoản càng đáng dùng.`,
  },
  {
    topicKey: 'two-factor-auth',
    title: 'Xác thực hai yếu tố (2FA): loại nào mới thực sự an toàn?',
    question: 'Xác thực hai yếu tố là gì, và vì sao mã qua SMS là loại yếu nhất?',
    summary:
      'Xác thực hai yếu tố thêm một bằng chứng nữa ngoài mật khẩu, nên chỉ trộm được mật khẩu thôi là chưa đủ. Nhưng các loại không ngang nhau: mã SMS có thể bị chặn hoặc bị "đánh tráo SIM", còn ứng dụng xác thực và khóa phần cứng thì mạnh hơn nhiều.',
    tags: ['bảo mật', 'xác thực hai yếu tố', 'định danh', 'an toàn số'],
    language: 'vi',
    image: {
      prompt: promptOf('two-factor-auth'),
      alt: 'Cánh cửa cần cả chìa khóa lẫn mã động riêng để đi qua',
    },
    sources: [
      { title: 'NIST — Hướng dẫn về Danh tính Số (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Xác thực đa yếu tố (MFA)', url: 'https://www.cisa.gov/MFA' },
    ],
    content: `# Xác thực hai yếu tố (2FA): loại nào mới thực sự an toàn?

Xác thực hai yếu tố (2FA, hay rộng hơn là MFA) nghĩa là việc đăng nhập đòi hỏi **hai loại bằng chứng khác nhau**: thứ bạn *biết* (mật khẩu) cộng với thứ bạn *có* (một mã, một ứng dụng, một khóa vật lý). Ý nghĩa của nó là khả năng chống chịu — dù kẻ gian có trộm được mật khẩu của bạn qua rò rỉ hay lừa đảo, chúng vẫn không vào được nếu thiếu yếu tố thứ hai. Bật nó lên là một trong những việc hiệu quả nhất bạn có thể làm. Nhưng yếu tố thứ hai có nhiều dạng, và chúng rất khác nhau về độ mạnh.

## Bậc thang, từ yếu đến mạnh

| Cách | Hoạt động thế nào | Điểm yếu |
| --- | --- | --- |
| **Mã SMS** | Mã được nhắn tin tới điện thoại bạn | Đánh tráo SIM, chặn trên mạng, có thể bị lừa đảo |
| **Ứng dụng xác thực** | Ứng dụng tạo mã 6 chữ số đổi mới mỗi 30 giây | Vẫn bị lừa nếu bạn gõ nó vào trang giả |
| **Phê duyệt qua thông báo đẩy** | Thông báo "Phê duyệt đăng nhập này?" trên điện thoại | Tấn công "gây mệt mỏi" — dội liên tục đến khi bạn bấm đồng ý |
| **Khóa bảo mật phần cứng / Passkey** | Khóa vật lý hoặc thông tin gắn với thiết bị, ràng buộc mật mã với trang thật | Chống lừa đảo theo thiết kế |

Mọi mục trong danh sách này đều hơn việc chỉ dùng mật khẩu. Nhưng vị trí trên bậc thang rất quan trọng.

## Vì sao SMS là bậc yếu

Mã SMS là dạng 2FA đại chúng đầu tiên và đến nay vẫn phổ biến, nhưng nó có những điểm yếu thật sự và đã bị khai thác:

- **Đánh tráo SIM (SIM swap)**: kẻ gian thuyết phục (hoặc mua chuộc) nhà mạng chuyển số của bạn sang SIM của chúng, và mã của bạn từ đó đến *điện thoại của chúng*. Đây là cách có ghi nhận, lặp đi lặp lại, khiến các tài khoản giá trị cao bị vét sạch.
- **Chặn bắt**: hệ thống báo hiệu của mạng điện thoại nền tảng có những lỗ hổng đã biết, có thể bị dùng để chuyển hướng tin nhắn.
- **Vẫn bị lừa đảo**: một trang đăng nhập giả có thể đơn giản hỏi xin mã SMS của bạn rồi chuyển tiếp ngay tức thì.

Kết luận thẳng thắn: **2FA qua SMS hơn hẳn không có gì** — cứ giữ nó ở nơi nó là lựa chọn duy nhất — nhưng hãy đưa các tài khoản quan trọng (email, tài chính, danh tính chính) lên cao hơn trên bậc thang.

## Thực ra nên dùng gì

- **Mặc định dùng ứng dụng xác thực** (mã xoay vòng) — miễn phí, dễ, không sợ đánh tráo SIM, và được hỗ trợ gần như ở mọi nơi.
- **Với các tài khoản quan trọng nhất, dùng khóa phần cứng hoặc Passkey** — chúng *chống lừa đảo*: thông tin đăng nhập được ràng buộc mật mã với trang web thật, nên nó đơn giản sẽ không xác thực với một trang giả trông na ná, đánh bại đúng kiểu tấn công mà mọi phương pháp dựa-trên-mã đều thua.
- **Bảo vệ email của bạn trước tiên.** Nó là chìa khóa vạn năng — việc đặt lại mật khẩu cho mọi thứ khác đều đi qua nó, nên nó xứng đáng có yếu tố mạnh nhất của bạn.

## Câu hỏi thường gặp

**Có 2FA nào cũng hơn không có chứ?**
Đúng, không cần bàn cãi. Ngay cả SMS cũng chặn được tuyệt đại đa số các cuộc tấn công tự động. Đừng để câu "SMS yếu" khiến bạn không bật nó ở nơi nó là tất cả những gì được cung cấp.

**Nếu mất điện thoại / khóa thì sao?**
Lưu lại các mã sao lưu/khôi phục mà mỗi dịch vụ cấp khi bạn đăng ký, và đăng ký một yếu tố thứ hai (một khóa dự phòng, hoặc cài ứng dụng trên thiết bị thứ hai). Lưu mã khôi phục ngoại tuyến.

**Thông báo đẩy "phê duyệt" có an toàn không?**
Tốt, nhưng dễ bị tấn công gây mệt mỏi — dội thông báo bất tận với hy vọng bạn bấm "phê duyệt" cho nó ngừng. Đừng bao giờ phê duyệt một lần đăng nhập mà bạn không tự khởi tạo; ưu tiên các thông báo có "khớp số" ở nơi nào có.`,
  },
  {
    topicKey: 'passkeys',
    title: 'Passkey là gì, và liệu nó có thay thế mật khẩu không?',
    question: 'Passkey là gì, và nó khác mật khẩu ở điểm nào về bản chất?',
    summary:
      'Passkey thay mật khẩu bằng một cặp khóa mật mã chia đôi giữa trang web và thiết bị của bạn — không có gì bí mật bị gõ hay chia sẻ, nên không còn gì để lừa đảo, dùng lại hay trộm trong một vụ rò rỉ. Đây là kẻ kế nhiệm mật khẩu được ngành công nghiệp chỉ định.',
    tags: ['bảo mật', 'passkey', 'định danh', 'mật khẩu'],
    language: 'vi',
    image: {
      prompt: promptOf('passkeys'),
      alt: 'Hai nửa chìa khóa chứng minh khớp nhau từ xa mà không chạm vào nhau',
    },
    sources: [
      { title: 'Liên minh FIDO — Giới thiệu Passkeys', url: 'https://fidoalliance.org/passkeys/' },
      { title: 'NIST — Hướng dẫn về Danh tính Số (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
    ],
    content: `# Passkey là gì, và liệu nó có thay thế mật khẩu không?

Passkey là một loại thông tin đăng nhập được thiết kế để sửa hai "tội tổ tông" của mật khẩu: mật khẩu là **bí mật được chia sẻ** (bạn và trang web cùng biết một chuỗi ký tự, nên có thể bị trộm từ một trong hai bên) và nó phải **được gõ vào** (nên có thể bị lừa đảo, có thể bị dùng lại). Passkey không chia sẻ cũng không gõ vào. Nó dựa trên mật mã khóa công khai, và một khi hiểu được cái "chia làm đôi" ấy, các lợi ích bảo mật trở nên hiển nhiên.

## Ý tưởng "cặp khóa", nói nôm na

Khi bạn tạo một passkey, thiết bị của bạn sinh ra một **cặp** khóa liên hệ với nhau về mặt toán học:

- Một **khóa riêng tư** không bao giờ rời thiết bị của bạn (điện thoại, máy tính xách tay, hoặc khóa bảo mật), được bảo vệ bằng vân tay, khuôn mặt hoặc mã PIN của thiết bị.
- Một **khóa công khai** được trao cho trang web.

Khóa công khai không phải bí mật — không thể dùng nó để mạo danh bạn. Khi đăng nhập, trang web gửi tới một thử thách; thiết bị của bạn chứng minh nó nắm khóa riêng tư khớp *mà không hề tiết lộ khóa đó*. Không có gì bí mật đi qua mạng, và không có gì dùng lại được được lưu trên máy chủ.

## Vì sao điều này đánh bại các cuộc tấn công thường gặp

| Tấn công | Với mật khẩu | Với passkey |
| --- | --- | --- |
| Rò rỉ cơ sở dữ liệu | Trộm mật khẩu (đã băm) | Chỉ trộm được khóa công khai — vô dụng với kẻ gian |
| Lừa đảo | Trang giả bắt được thứ bạn gõ | Không có gì để gõ; khóa ràng buộc với tên miền thật |
| Dùng lại | Một chỗ lộ mở khóa nhiều trang | Mỗi passkey theo thiết kế là độc nhất và riêng cho một trang |
| Dò nhồi thông tin | Hiệu quả trên quy mô lớn | Không có gì để nhồi |

Chống lừa đảo là điểm nổi bật nhất. Passkey được ràng buộc mật mã với danh tính của trang web thật, nên một tên miền giả trông na ná *hoàn toàn không thể* kích hoạt nó — bịt kín đúng cái khe hở mà ngay cả mã của ứng dụng xác thực vẫn để hở.

## Dùng nó hôm nay

Trên thực tế, dùng passkey thường có cảm giác như **mở khóa điện thoại**: một thông báo hiện ra, bạn xác nhận bằng vân tay hoặc khuôn mặt, thế là vào — không mật khẩu, không mã nào để chép. Passkey thường đồng bộ qua hệ sinh thái thiết bị của bạn (nên điện thoại mới vẫn giữ chúng) hoặc nằm trên một khóa bảo mật phần cứng để có mức bảo đảm cao nhất. Mức độ áp dụng đang rộng và lớn dần trên các nền tảng lớn và các trang web lớn, dù vẫn đang giữa giai đoạn chuyển tiếp: hầu hết các trang có hỗ trợ passkey vẫn giữ mật khẩu làm phương án dự phòng.

## Câu hỏi thường gặp

**Nếu mất thiết bị thì sao?**
Passkey loại đồng bộ có thể khôi phục trên thiết bị mới qua tài khoản nền tảng của bạn (được bảo vệ bằng cơ chế bảo mật mạnh riêng của nó). Với khóa loại gắn-thiết-bị, hãy đăng ký một passkey thứ hai hoặc giữ một phương án dự phòng — cùng nguyên tắc kỷ luật như khi khôi phục 2FA.

**Một công ty bị rò rỉ có thể làm lộ passkey của tôi không?**
Không — máy chủ chỉ giữ khóa công khai của bạn, vốn không phải bí mật và không thể đăng nhập với tư cách là bạn. Đây chính là lợi thế cấu trúc so với cơ sở dữ liệu mật khẩu.

**Tôi vẫn cần trình quản lý mật khẩu chứ?**
Hiện tại thì có — passkey đang được triển khai dần, nên trong vài năm tới bạn sẽ ở trạng thái dùng lẫn lộn. Nhiều trình quản lý mật khẩu đã lưu được cả passkey, dần trở thành một kho thống nhất cho cả hai.`,
  },
  {
    topicKey: 'phishing-scams',
    title: 'Làm sao nhận ra lừa đảo phishing và các trò gian lận trên mạng?',
    question: 'Làm sao nhận ra một email lừa đảo hay tin nhắn gian lận trước khi bị mắc bẫy?',
    summary:
      'Lừa đảo phishing tạo cảm giác cấp bách để bạn "ra tay trước, suy nghĩ sau" — một cảnh báo giả, một món hời trên trời rơi xuống, một đường link "xác minh ngay". Phòng tuyến là thói quen chứ không phải công cụ: chậm lại, kiểm tra người gửi và link thật, đừng bao giờ đăng nhập từ link trong tin nhắn.',
    tags: ['bảo mật', 'lừa đảo', 'gian lận', 'an toàn số'],
    language: 'vi',
    image: {
      prompt: promptOf('phishing-scams'),
      alt: 'Lưỡi câu giả dạng phong bì tiến gần một con cá dừng lại trong vòng sáng bảo vệ',
    },
    sources: [
      { title: 'CISA — Nhận diện và báo cáo lừa đảo phishing', url: 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing' },
      { title: 'FTC — Cách nhận diện và tránh các trò lừa đảo phishing', url: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams' },
    ],
    content: `# Làm sao nhận ra lừa đảo phishing và các trò gian lận trên mạng?

Lừa đảo phishing là một trò bịp khoác áo kỹ thuật. Kẻ tấn công không phá mã hóa của bạn — chúng khiến *chính bạn* tự tay giao ra mật khẩu, mã, hoặc tiền, bằng cách mạo danh một người bạn tin tưởng và dựng nên một khoảnh khắc khiến bạn hành động theo cảm xúc thay vì phán đoán. Chính vì nó nhắm vào phản xạ của con người, nên phòng thủ cũng phải là của con người — vài thói quen có thể bóc mẽ trò bịp một cách đáng tin cậy. Cái hữu ích nhất trong số đó là nhận ra thứ cảm xúc đang bị cố tình tạo ra.

## Dấu hiệu phổ quát: cảm giác cấp bách được dựng lên

Hầu như mọi trò lừa đều cần bạn *nhanh* — ra tay trước khi phần não lo việc suy nghĩ kịp bắt nhịp. Những đòn bẩy cảm xúc là một danh sách ngắn:

- **Sợ hãi**: "Tài khoản của bạn sẽ bị khóa", "phát hiện đăng nhập bất thường", "còn nợ thuế — xử lý ngay".
- **Tham lam**: "Bạn đã trúng thưởng", "nhận tiền hoàn lại", "khoản đầu tư nhân đôi mỗi tuần".
- **Quyền uy**: một tin nhắn "từ" ngân hàng, sếp, công ty giao hàng hoặc cơ quan nhà nước của bạn.
- **Tò mò/sốt sắng**: "Đây có phải là bạn trong tấm ảnh này không?", "giúp mình một việc nhỏ với".

Khi một tin nhắn khiến tim bạn đập nhanh và thúc bạn bấm, trả tiền hoặc chia sẻ *ngay lập tức*, thì chính áp lực đó là lời cảnh báo — các tổ chức chính danh không làm việc theo kiểu "phản hồi trong 10 phút, nếu không thì...".

## Danh sách kiểm tra cụ thể

| Mục kiểm tra | Xem gì |
| --- | --- |
| **Địa chỉ người gửi** | Mở rộng ra xem địa chỉ thật — \`service@paypa1.com\` ≠ \`paypal.com\`. Tên hiển thị thì biết nói dối. |
| **Đường link thật** | Rê chuột (đừng bấm) để thấy đích thực sự; coi chừng các tên miền trông na ná |
| **Lời chào chung chung** | "Kính gửi quý khách" từ một công ty lẽ ra biết tên bạn |
| **Tệp đính kèm bất ngờ** | "Hóa đơn/biên nhận" mà bạn không ngờ tới — một cách phát tán mã độc kinh điển |
| **Đòi hỏi bí mật** | Cơ quan chính danh không bao giờ hỏi mật khẩu, mã PIN đầy đủ hay mã 2FA của bạn |
| **Gây áp lực + bí mật** | "Đừng nói với ai", "chuyển khoản gấp", trả bằng thẻ quà tặng — đều là cờ đỏ khổng lồ |

## Hai quy tắc sắt ngăn được phần lớn thiệt hại

1. **Đừng bao giờ đăng nhập qua link trong tin nhắn.** Email nói tài khoản bạn có vấn đề ư? Đừng bấm — mở một tab mới và tự gõ địa chỉ (hoặc dùng dấu trang/ứng dụng). Chỉ riêng thói quen này đã đánh bại phần lớn lừa đảo chiếm thông tin đăng nhập, vì trang giả không có cơ hội xuất hiện.

2. **Bất cứ việc gì liên quan đến tiền hoặc bí mật, hãy xác minh qua một kênh khác.** "Sếp" bảo bạn chuyển khoản hay mua thẻ quà tặng, "ngân hàng" bảo bạn "chuyển tiền sang tài khoản an toàn", "người thân" bỗng gặp nạn — hãy dừng lại và xác nhận qua một kênh *độc lập, đã biết* (gọi số chính thức, không phải số trong tin nhắn). Cảm giác cấp bách cộng với một phương thức thanh toán bất thường chính là chữ ký đặc trưng của một trò lừa.

## Câu hỏi thường gặp

**Tin nhắn làm như thật — có logo, đúng định dạng, gọi cả tên tôi, vẫn phải nghi ngờ sao?**
Phải. Hình ảnh thuyết phục thì sao chép dễ như bỡn, còn thông tin cá nhân thì rò ra từ các vụ lộ dữ liệu. Hãy phán xét theo *yêu cầu* (cấp bách, đòi bí mật, đòi tiền) và xác minh độc lập, chứ không phải theo việc nó được làm chỉn chu đến đâu.

**Tôi đã bấm link / đã nhập mật khẩu rồi, giờ sao?**
Hành động nhanh: trên một thiết bị đáng tin, đổi mật khẩu đó (và mọi nơi bạn dùng lại nó), bật 2FA, để ý hoạt động bất thường, và liên hệ với cơ quan thật. Tốc độ quyết định mức thiệt hại.

**Điện thoại và tin nhắn SMS cũng là lừa đảo phishing sao?**
Đúng — lừa qua giọng nói (vishing) và qua SMS (smishing) dùng cùng một bài bản, còn công nghệ AI nhân bản giọng nói khiến cuộc gọi càng thuyết phục hơn. Quy tắc vẫn vậy: gác máy, và gọi lại bằng số chính thức mà bạn tự tra được.`,
  },
  {
    topicKey: 'vpn-explained',
    title: 'VPN thực sự làm được gì (và không làm được gì)',
    question: 'VPN thực sự bảo vệ điều gì, và tôi có thật sự cần nó không?',
    summary:
      'VPN mã hóa lưu lượng của bạn tới một máy chủ, giúp che địa chỉ IP và bảo vệ bạn trên các mạng không đáng tin. Nhưng nó không phải là ẩn danh hay an toàn vạn năng — HTTPS đã bảo vệ phần lớn dữ liệu, còn VPN chỉ chuyển "niềm tin" sang nhà cung cấp VPN chứ không xóa bỏ nó.',
    tags: ['bảo mật', 'quyền riêng tư', 'vpn', 'mạng'],
    language: 'vi',
    image: {
      prompt: promptOf('vpn-explained'),
      alt: 'Dữ liệu đi qua đường ống kín giấu nguồn gốc cho đến điểm chuyển tiếp xa',
    },
    sources: [
      { title: 'EFF — Hướng dẫn tự bảo vệ: VPN', url: 'https://ssd.eff.org/module/choosing-vpn-thats-right-you' },
      { title: 'CISA — Hướng dẫn về kết nối an toàn', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# VPN thực sự làm được gì (và không làm được gì)

VPN (mạng riêng ảo) dựng một đường hầm được mã hóa từ thiết bị của bạn tới một máy chủ do nhà cung cấp VPN vận hành; lưu lượng của bạn ra Internet từ *chỗ đó*, mang địa chỉ IP của máy chủ ấy thay vì của chính bạn. Cơ chế chỉ có vậy — và từ đó suy ra cả những lợi ích thực sự lẫn một đống lời quảng cáo thổi phồng. Điều hữu ích nhất cần hiểu là: VPN **chuyển dịch** niềm tin của bạn, chứ không xóa bỏ nhu cầu phải có niềm tin.

## Những gì nó thực sự làm được

- **Che địa chỉ IP của bạn** khỏi các trang web bạn truy cập — chúng thấy vị trí của máy chủ VPN, chứ không phải nhà hay thành phố của bạn. Hữu ích để giảm một dạng theo dõi, và để không lộ danh tính mạng của bạn.
- **Mã hóa lưu lượng trên mạng cục bộ**: trên WiFi công cộng đáng ngờ (quán cà phê, sân bay, mạng khách sạn, và bất kỳ ai dòm ngó trên đó), người ta chỉ thấy một đường hầm được mã hóa, không thấy bạn đang làm gì.
- **Giấu hoạt động của bạn khỏi nhà mạng**: nhà mạng thấy bạn đã kết nối VPN, nhưng không thấy bạn truy cập trang nào.
- **Đổi vị trí biểu kiến của bạn**: đó cũng là lý do có người dùng nó để truy cập nội dung bị giới hạn theo khu vực (tùy theo điều khoản của từng dịch vụ).

## Những gì nó **KHÔNG** làm được

Đây chính là chỗ quảng cáo hứa hẹn quá mức:

| Lầm tưởng | Thực tế |
| --- | --- |
| "VPN khiến bạn ẩn danh" | Còn xa lắm — đăng nhập, cookie, vân tay trình duyệt và tài khoản vẫn nhận ra bạn bất kể |
| "VPN giúp tránh virus/bị hack" | Không — nó là đường hầm, không phải phần mềm diệt virus hay tường lửa chống mã độc |
| "VPN mã hóa mọi việc bạn làm" | Phần lớn trang web vốn đã mã hóa đầu-cuối bằng HTTPS; VPN chủ yếu bảo vệ chặng *cục bộ* |
| "VPN giúp bạn vô hình trước mọi người" | Nhà cung cấp VPN của bạn thấy được lưu lượng của bạn — bạn chỉ chuyển niềm tin sang họ |

Điểm cuối đó là điểm then chốt. Không có VPN, mạng cục bộ và nhà mạng có thể quan sát các kết nối của bạn. *Có* VPN, công ty VPN chiếm vị trí ấy thay vào — nên một VPN chỉ đáng tin đúng bằng mức độ đáng tin của bên vận hành nó. Một VPN miễn phí kiếm tiền bằng cách ghi lại và bán hoạt động của bạn có thể còn tệ hơn không dùng.

## Bạn có cần nó không?

| Tình huống | Kết luận |
| --- | --- |
| Hay dùng WiFi công cộng/không đáng tin | Hợp lý — thêm một lớp thật sự (dù HTTPS đã che phủ khá nhiều) |
| Muốn giấu lịch sử duyệt web khỏi nhà mạng | Có, đây là công dụng cốt lõi |
| Truy cập nội dung bị giới hạn theo khu vực | Công dụng phổ biến (lưu ý điều khoản dịch vụ) |
| Tìm kiếm ẩn danh thật sự | Chỉ riêng VPN thì không làm được |
| Vốn chỉ ở mạng đáng tin, và đang dùng HTTPS | Tùy chọn — lợi ích nhỏ hơn quảng cáo |

Nếu định dùng, hãy chọn một nhà cung cấp trả phí có uy tín, với chính sách "không lưu nhật ký" rõ ràng và lý tưởng là đã được kiểm toán — bạn đang trao cho họ mọi thứ mà nhà mạng từng thấy được.

## Câu hỏi thường gặp

**VPN có ngăn các trang web theo dõi tôi không?**
Chỉ chặn được phần dựa trên IP. Cookie, đăng nhập và vân tay trình duyệt vẫn nhận ra bạn. Chống theo dõi phải nhờ thiết lập/tiện ích của trình duyệt, không phải VPN.

**VPN miễn phí có ổn không?**
Hãy cẩn thận — chạy máy chủ tốn tiền, và một số VPN miễn phí thu hồi vốn bằng cách ghi lại và bán dữ liệu của bạn, đi ngược lại mục đích. Các gói miễn phí đáng tin có tồn tại, nhưng hãy đọc chính sách quyền riêng tư.

**Các trang đều dùng HTTPS rồi, còn cần VPN không?**
HTTPS vốn đã mã hóa đầu-cuối nội dung lưu lượng của bạn. VPN bổ sung việc che IP và bảo vệ siêu dữ liệu trên mạng cục bộ — nhưng khi bạn đã dùng HTTPS, phần nâng cấp nó mang lại nhỏ hơn quảng cáo ngụ ý.`,
  },
  {
    topicKey: 'end-to-end-encryption',
    title: 'Mã hóa đầu cuối là gì?',
    question: 'Mã hóa đầu cuối nghĩa là gì, và vì sao nó quan trọng với nhắn tin?',
    summary:
      'Mã hóa đầu cuối khóa một tin nhắn lại sao cho chỉ người gửi và người nhận đọc được — mạng không đọc được, ngay cả công ty vận hành dịch vụ cũng không. Đó là khác biệt giữa một lá thư niêm phong và một tấm bưu thiếp mà mọi người trên đường đi đều đọc được.',
    tags: ['bảo mật', 'quyền riêng tư', 'mã hóa', 'nhắn tin'],
    language: 'vi',
    image: {
      prompt: promptOf('end-to-end-encryption'),
      alt: 'Tin nhắn niêm phong không đọc được trên đường, chỉ mở khi tới thiết bị đầu kia',
    },
    sources: [
      { title: 'EFF — Hướng dẫn tự bảo vệ: Mã hóa là gì', url: 'https://ssd.eff.org/module/what-encryption' },
      { title: 'NIST — Tiêu chuẩn và hướng dẫn về mật mã', url: 'https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines' },
    ],
    content: `# Mã hóa đầu cuối là gì?

Mã hóa đầu cuối (E2EE) nghĩa là tin nhắn được xáo trộn ngay trên thiết bị của người gửi và chỉ có thể được giải mã trên thiết bị của người nhận — nên ở bất kỳ chặng nào ở giữa, không ai khác đọc được. Quan trọng là, "không ai khác" bao gồm cả công ty vận hành dịch vụ. Phép so sánh kinh điển: một tin nhắn thông thường là một tấm **bưu thiếp** mà mọi người chuyển tay dọc đường đều đọc được; một tin nhắn mã hóa đầu cuối là một **lá thư niêm phong** mà chỉ người nhận mở được. Khác biệt nằm ở chỗ ai *có thể* đọc cuộc trò chuyện của bạn, chứ không chỉ ai *hứa* sẽ không đọc.

## Khác biệt thực sự quan trọng

Hầu hết dịch vụ trực tuyến đều mã hóa dữ liệu "khi truyền" (giữa bạn và máy chủ của họ) và "khi lưu" (trong kho lưu trữ của họ). Điều đó tốt, nhưng trong cả hai trường hợp **công ty vẫn đọc được nội dung của bạn** — chìa khóa nằm trong tay họ. Mã hóa đầu cuối mạnh hơn: chỉ hai đầu giữ chìa khóa, nên về mặt cấu trúc nhà cung cấp không thể đọc tin nhắn của bạn — dù có muốn, có bị hack, hay bị yêu cầu phải giao nộp.

| | Mã hóa khi truyền/khi lưu | Mã hóa đầu cuối |
| --- | --- | --- |
| Chống dòm ngó từ bên ngoài | Có | Có |
| Nhà cung cấp đọc được nội dung | **Có** | **Không** |
| Bị lộ khi nhà cung cấp rò rỉ dữ liệu | Có thể | Nội dung vẫn không đọc được |
| Bị giao nộp theo yêu cầu pháp lý | Có thể | Nhà cung cấp không có gì đọc được để giao |

## Nguyên lý vắn tắt

E2EE dùng đúng ý tưởng khóa công khai nằm sau Passkey và HTTPS. Mỗi người dùng có một khóa công khai (chia sẻ tự do) và một khóa riêng tư (không bao giờ chia sẻ). Để nhắn cho bạn, người gửi mã hóa bằng khóa công khai *của bạn*; chỉ khóa riêng tư *của bạn* mới giải mã được. Các khóa nằm trên thiết bị chứ không phải trên máy chủ — và đó chính là lý do máy chủ không đọc được nội dung. Các ứng dụng nhắn tin tốt còn thêm "bí mật chuyển tiếp" (forward secrecy), xoay vòng khóa sao cho dù một khóa bị lộ trong tương lai cũng không mở được các tin nhắn cũ.

## Bạn dựa vào nó ở đâu

- **Nhắn tin**: một số ứng dụng mã hóa đầu cuối theo mặc định; số khác chỉ trong một chế độ tùy chọn, hoặc không hề có. Nếu bạn coi trọng quyền riêng tư, hãy kiểm tra xem là loại nào.
- **Cuộc gọi**: nhiều ứng dụng thoại/video nay đã cung cấp E2EE.
- **Sao lưu và đám mây**: một lỗ hổng tinh vi — một cuộc trò chuyện có thể là E2EE trong khi *bản sao lưu trên đám mây* của nó thì không, lặng lẽ khiến tin nhắn lại đọc được. Hãy kiểm tra thiết lập sao lưu.
- **Web**: HTTPS là đầu-cuối giữa trình duyệt của bạn và trang web (dù bản thân trang web, với tư cách một đầu mút, vẫn đọc được những gì bạn gửi cho nó).

## Câu hỏi thường gặp

**Nếu ngay cả công ty cũng không đọc được, thì ai đọc được?**
Chỉ những người cầm thiết bị ở mỗi đầu. Điều đó cũng có nghĩa là bảo mật *thiết bị* rất quan trọng — E2EE bảo vệ tin nhắn khi truyền, chứ không bảo vệ một chiếc điện thoại mà ai đó mở khóa được. Ngoài ra, siêu dữ liệu (bạn nói chuyện với ai, khi nào) vẫn có thể nhìn thấy ngay cả khi nội dung thì không.

**E2EE có giúp tội phạm không?**
Đó cũng chính là loại mã hóa bảo vệ ngân hàng, hồ sơ y tế, nhà báo và những cuộc trò chuyện riêng tư của người bình thường — một sự bảo vệ đa dụng. Đồng thuận chính thống trong giới bảo mật là: làm yếu nó đi cho tất cả mọi người (mở một "cửa hậu") khiến tất cả kém an toàn hơn, vì một cửa hậu không thể chỉ dành riêng cho "người tốt".

**Làm sao biết một ứng dụng thật sự dùng nó?**
Hãy tìm dòng ghi rõ "mã hóa đầu cuối" (không chỉ là "đã mã hóa"), ưu tiên các ứng dụng dùng giao thức mở đã được rà soát kỹ, và kiểm tra xem nó bật theo mặc định hay chỉ trong một chế độ đặc biệt.`,
  },
  {
    topicKey: 'public-wifi-safety',
    title: 'WiFi công cộng có thực sự nguy hiểm không?',
    question: 'Dùng WiFi công cộng ở quán cà phê và sân bay có an toàn không, và nên tránh làm gì?',
    summary:
      'WiFi công cộng an toàn hơn xưa rất nhiều vì gần như mọi trang web giờ đều dùng HTTPS, vốn mã hóa dữ liệu của bạn bất kể đang ở mạng nào. Rủi ro còn sót lại thực sự là điểm phát sóng giả và kết nối không mã hóa — quản được bằng vài thói quen.',
    tags: ['bảo mật', 'quyền riêng tư', 'wifi', 'an toàn số'],
    language: 'vi',
    image: {
      prompt: promptOf('public-wifi-safety'),
      alt: 'Máy tính xách tay gửi dữ liệu đã niêm phong sẵn qua WiFi công cộng, cạnh đó là điểm phát giả ẩn nấp',
    },
    sources: [
      { title: 'FTC — WiFi công cộng có an toàn không?', url: 'https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-not-always' },
      { title: 'EFF — Những điều bạn nên biết về HTTPS và mã hóa', url: 'https://ssd.eff.org/module/what-should-i-know-about-encryption' },
    ],
    content: `# WiFi công cộng có thực sự nguy hiểm không?

Cái tiếng đáng sợ của WiFi công cộng phần lớn **đã lỗi thời**. Những lời cảnh báo cũ đến từ thời các trang web gửi dữ liệu ở dạng văn bản trần — khi đó bất kỳ ai trong cùng mạng quán cà phê đều có thể "hít" mật khẩu của bạn ra từ không khí. Thời ấy về cơ bản đã kết thúc: ngày nay tuyệt đại đa số trang web dùng **HTTPS**, vốn mã hóa kết nối của bạn theo kiểu đầu-cuối giữa trình duyệt và trang web — trên bất kỳ mạng nào, đáng tin hay không. Cái ổ khóa trên thanh địa chỉ đang làm phần lớn công việc bảo vệ mà các lời cảnh báo giật gân quy cho VPN.

## Vì sao HTTPS đã thay đổi cục diện

Khi bạn kết nối tới một trang HTTPS, lưu lượng của bạn được mã hóa *trước khi* rời thiết bị, nên một kẻ dòm ngó trên cùng WiFi chỉ thấy một mớ dữ liệu lộn xộn cùng với việc bạn đang vào trang nào — không thấy mật khẩu, tin nhắn hay số thẻ của bạn. Vì các trình duyệt hiện đại nay gắn nhãn "Không an toàn" cho các trang không HTTPS và phần lớn web đã chuyển đổi, kiểu tấn công kinh điển "bị trộm mật khẩu ở quán cà phê" giờ khó hơn xưa nhiều.

## Những rủi ro vẫn còn sót lại

WiFi công cộng không phải là *không* có rủi ro — chỉ là các mối đe dọa đã đổi dạng:

| Rủi ro | Là gì | Phòng thủ |
| --- | --- | --- |
| **Điểm phát sóng sinh đôi độc hại** | Một mạng giả do kẻ gian dựng lên, đặt tên "Airport_Free_WiFi" | Xác nhận tên mạng thật; đừng tự động kết nối mạng lạ |
| **Trang không HTTPS** | Số ít trang vẫn gửi dữ liệu ở dạng văn bản trần | Để ý cảnh báo "Không an toàn"; đừng nhập bí mật ở đó |
| **Nhìn lén qua vai** | Có người đơn giản là nhìn vào màn hình của bạn | Tấm chống nhìn trộm, giữ cảnh giác |
| **Thiết bị lỗi thời** | Lỗ hổng chưa vá có thể bị khai thác trên mạng dùng chung | Cập nhật hệ điều hành và ứng dụng |
| **Tự động kết nối** | Điện thoại lặng lẽ kết nối một mạng độc hại trùng tên | Tắt tự động kết nối với mạng mở |

Rủi ro nổi bật nhất là **điểm sinh đôi**: một điểm phát sóng độc hại với cái tên thân thiện. Nếu bạn kết nối với nó, kẻ gian kiểm soát đường mạng của bạn — nhưng ngay cả khi đó, HTTPS vẫn giữ các phiên đã mã hóa của bạn không đọc được; nguy cơ chủ yếu đến từ bất kỳ lưu lượng không HTTPS nào, và việc bị dụ tới các trang đăng nhập giả.

## Vài thói quen hợp lý (không cần hoảng loạn)

- **Tin vào ổ khóa HTTPS**, và trên WiFi công cộng đừng bao giờ bỏ qua cảnh báo chứng chỉ — đúng cái lúc cảnh báo đó hiện ra là lúc có gì đó không ổn.
- **Xác minh tên mạng** với nhân viên thay vì đoán; hãy nghi ngờ các mạng mở mạo danh một thương hiệu.
- **Tắt tự động kết nối** với mạng mở để thiết bị không lặng lẽ kết nối lại các điểm trông na ná.
- **VPN có thể thêm một lớp**: nó mã hóa cả siêu dữ liệu lẫn bất kỳ lưu lượng không HTTPS nào — một biện pháp bổ sung hợp lý trên mạng không đáng tin, nhưng không phải thứ thiết yếu như quảng cáo ngụ ý, xét đến việc đã có HTTPS.
- **Giữ thiết bị được cập nhật**; phần lớn các cuộc tấn công mạng còn lại nhắm vào những lỗ hổng đã biết và đã được vá.

## Câu hỏi thường gặp

**Có ai trộm được mật khẩu ngân hàng của tôi trên WiFi quán cà phê không?**
Nếu ngân hàng của bạn dùng HTTPS (đúng vậy) và bạn không bỏ qua cảnh báo chứng chỉ hay sa vào trang đăng nhập giả, thì thông tin đăng nhập của bạn được mã hóa trên đường truyền. Mối nguy lớn hơn là lừa đảo, không phải nghe lén.

**Dùng WiFi công cộng có thật sự cần VPN không?**
Đó là một lớp bổ sung hợp lý, nhưng HTTPS vốn đã bảo vệ nội dung lưu lượng của bạn. VPN chủ yếu giúp với lưu lượng không HTTPS, và giúp giấu việc bạn vào trang nào khỏi mạng cục bộ.

**Dữ liệu di động của điện thoại có an toàn hơn WiFi công cộng không?**
Nhìn chung là có — mạng di động có mã hóa và bạn không dùng chung một mạng cục bộ với người lạ. Khi làm việc nhạy cảm trên một mạng lạ, chuyển sang dữ liệu di động là một lựa chọn đơn giản và chắc chắn.`,
  },
  {
    topicKey: 'online-tracking',
    title: 'Theo dõi trên mạng hoạt động ra sao? (Cookie, pixel và vân tay)',
    question: 'Các công ty theo dõi tôi xuyên các trang web bằng cách nào, và tôi có thực sự chặn được không?',
    summary:
      'Các bên theo dõi bám theo bạn bằng cookie, pixel theo dõi vô hình và vân tay trình duyệt để dựng nên một hồ sơ xuyên các trang. Bạn không thể trở nên vô hình, nhưng vài lựa chọn về trình duyệt sẽ cắt giảm đáng kể lượng dữ liệu bị thu thập.',
    tags: ['quyền riêng tư', 'theo dõi', 'cookie', 'web'],
    language: 'vi',
    image: {
      prompt: promptOf('online-tracking'),
      alt: 'Bóng người bước đi để lại dấu chân được ống kính xa ghép lại, một phần bị áo choàng làm tán đi',
    },
    sources: [
      { title: 'EFF — Cover Your Tracks (kiểm tra vân tay trình duyệt)', url: 'https://coveryourtracks.eff.org/' },
      { title: 'FTC — Bảo vệ quyền riêng tư của bạn trên mạng', url: 'https://consumer.ftc.gov/articles/protecting-your-privacy-online' },
    ],
    content: `# Theo dõi trên mạng hoạt động ra sao? (Cookie, pixel và vân tay)

Phần lớn mạng web "miễn phí" được nuôi bằng quảng cáo, mà quảng cáo nhắm mục tiêu thì vận hành dựa trên việc biết bạn là ai và bạn làm gì. Thế nên tồn tại nguyên một ngành công nghiệp chuyên bám theo bạn từ trang này sang trang khác, khâu hoạt động của bạn lại thành một hồ sơ. Nó chủ yếu dựa vào ba kỹ thuật, cái sau trơn tuột hơn cái trước — và hiểu chúng chính là điều khiến các biện pháp phòng thủ trở nên hợp lý.

## Ba kỹ thuật chính

**1. Cookie.** Cookie là một tệp nhỏ mà trang web lưu vào trình duyệt của bạn. Cookie *bên thứ nhất* phần lớn vô hại, thậm chí hữu ích — chúng giữ bạn đăng nhập, nhớ giỏ hàng. Vấn đề theo dõi nằm ở cookie *bên thứ ba*: khi nhiều trang khác nhau cùng nhúng nội dung từ một mạng quảng cáo, mạng quảng cáo đó thả xuống một cookie mà nó nhận ra ở khắp nơi, cho phép nó thấy cùng một trình duyệt đã vào trang A, rồi B, rồi C. Dấu vết xuyên trang đó chính là cơ chế theo dõi kinh điển (và cũng là cái mà các trình duyệt giờ đang chủ động loại bỏ dần).

**2. Pixel theo dõi.** Một tấm ảnh vô hình kích thước 1×1 (hoặc một đoạn mã nhỏ) được tải về từ máy chủ của bên theo dõi. Chỉ riêng việc tải nó — trong một trang web *hay một email* — đã báo cho bên theo dõi biết: bạn đã mở, mở khi nào, và một số chi tiết về thiết bị của bạn. Đó là cách giới marketing biết bạn đã mở email của họ, đã vào một trang, mà không cần bất kỳ cookie nào.

**3. Vân tay trình duyệt.** Loại tinh quái nhất. Thay vì lưu bất cứ thứ gì trên thiết bị của bạn, một trang web *đo lường* tổ hợp đặc điểm độc nhất của thiết bị bạn — kích thước màn hình, phông chữ, hệ điều hành, phiên bản trình duyệt, múi giờ, các đặc thù về đồ họa — những thứ này gộp lại thường đủ độc nhất để nhận ra lại bạn. Vì nó không lưu gì cả, xóa cookie cũng không xóa được nó.

| Kỹ thuật | Có lưu gì không | Xóa cookie có chặn được không |
| --- | --- | --- |
| Cookie bên thứ ba | Có | Được |
| Pixel theo dõi | Dựa vào cookie/nhật ký máy chủ | Được một phần |
| Vân tay | Không | **Không** |

## Những việc thực sự giảm được theo dõi

Bạn không thể vô hình, nhưng có thể thu nhỏ đáng kể bề mặt phơi bày:

- **Dùng một trình duyệt coi trọng quyền riêng tư, hoặc bật tính năng chống theo dõi** — các trình duyệt hiện đại chặn cookie bên thứ ba và các bên theo dõi đã biết theo mặc định hoặc chỉ với một thiết lập.
- **Thêm một trình chặn nội dung/quảng cáo uy tín** — chặn các tập lệnh và pixel theo dõi trước khi chúng tải, nhân tiện làm trang web nhanh hơn.
- **Chặn ảnh từ xa trong email** để vô hiệu hóa pixel theo dõi việc mở thư (hầu hết ứng dụng email đều có tùy chọn này).
- **Kháng cự vân tay**: dùng những trình duyệt chuẩn hóa hoặc ngẫu nhiên hóa vân tay của bạn; đây là loại theo dõi khó chặn nhất, nên việc "ai làm ra trình duyệt của bạn" rất quan trọng.
- **Giảm hồ sơ từ gốc**: hạn chế cá nhân hóa quảng cáo trong thiết lập tài khoản, và dè dặt với những lượt đăng nhập gắn hoạt động vào một danh tính thật.

## Câu hỏi thường gặp

**Những biểu ngữ "Chấp nhận cookie" có thực sự bảo vệ tôi không?**
Chúng là các lời mời đồng ý (do luật về quyền riêng tư thúc đẩy), không phải sự bảo vệ. "Từ chối những cái không thiết yếu" có ích, nhưng việc giảm thật sự đến từ thiết lập trình duyệt và trình chặn, chứ không phải từ việc bấm biểu ngữ.

**Chế độ riêng tư/ẩn danh có chặn được theo dõi không?**
Phần lớn là không. Nó ngăn *trình duyệt của bạn* lưu lịch sử cục bộ và cookie sau khi phiên kết thúc, nhưng các trang web, các bên theo dõi và mạng của bạn vẫn quan sát được bạn trong phiên, và vân tay vẫn hoạt động.

**Vân tay có thật sự không thể chặn được không?**
Không phải không thể, nhưng khó — cách phòng thủ là dùng một trình duyệt cố ý làm cho vân tay của mọi người "trông giống nhau" (để vân tay của bạn không nổi bật). Bạn có thể kiểm tra vân tay của chính mình trên Cover Your Tracks của EFF.`,
  },
  {
    topicKey: 'data-breach-response',
    title: 'Phải làm gì khi dữ liệu của bạn nằm trong một vụ rò rỉ?',
    question: 'Một công ty tôi đang dùng vừa bị rò rỉ dữ liệu — tôi thực sự nên làm gì?',
    summary:
      'Khi một vụ rò rỉ làm lộ dữ liệu của bạn, ưu tiên là ngăn chặn việc dùng lại: đổi mật khẩu đó ở mọi nơi đã từng dùng, bật xác thực hai yếu tố, và đề phòng làn sóng lừa đảo theo sau. Việc cần làm tùy thuộc vào thứ bị lộ — một mật khẩu, một số thẻ, hay thông tin định danh.',
    tags: ['bảo mật', 'quyền riêng tư', 'rò rỉ dữ liệu', 'an toàn số'],
    language: 'vi',
    image: {
      prompt: promptOf('data-breach-response'),
      alt: 'Một kho nhỏ bị rò được khoanh vùng ngăn chặn một cách bài bản qua các kho lân cận',
    },
    sources: [
      { title: 'FTC — Sau khi bị rò rỉ dữ liệu thì làm gì', url: 'https://www.identitytheft.gov/databreach' },
      { title: 'Have I Been Pwned — Kiểm tra tài khoản của bạn có xuất hiện trong các vụ rò rỉ không', url: 'https://haveibeenpwned.com/' },
    ],
    content: `# Phải làm gì khi dữ liệu của bạn nằm trong một vụ rò rỉ?

Rò rỉ dữ liệu giờ đã thành chuyện cơm bữa — nếu bạn đã dùng Internet nhiều năm, thông tin của bạn gần như chắc chắn đã xuất hiện trong một vụ nào đó. Nghe thì đáng sợ, nhưng phần lớn các vụ rò rỉ đều vượt qua được bằng một cách ứng phó bình tĩnh, có trọng tâm. Mấu chốt là để hành động của bạn khớp với **thứ thực sự bị lộ**, bởi vì lộ một mật khẩu, lộ một số thẻ, và lộ thông tin định danh đòi hỏi những bước đi khác nhau. Hoảng loạn và không làm gì là hai kiểu thất bại; một danh sách kiểm tra ngắn thắng cả hai.

## Trước tiên: xác định cái gì đã bị lộ

Thông báo rò rỉ (và các dịch vụ theo dõi rò rỉ) thường nêu rõ dữ liệu nào liên quan. Mức độ nghiêm trọng, xếp đại khái:

| Cái bị lộ | Mức nghiêm trọng | Vì sao |
| --- | --- | --- |
| Chỉ địa chỉ email | Thấp | Phần lớn nghĩa là thêm thư rác/lừa đảo |
| Mật khẩu (kể cả đã băm) | Cao | Dùng lại nghĩa là nhiều tài khoản gặp nguy |
| Thẻ thanh toán | Trung bình | Ngân hàng đảo ngược gian lận được; thẻ thay được |
| Thông tin định danh (số giấy tờ, ngày sinh, địa chỉ) | Cao | Tạo điều kiện cho trộm danh tính; không thể "đặt lại" |

## Ứng phó, theo nội dung bị lộ

**Nếu lộ mật khẩu** (trường hợp khẩn cấp phổ biến nhất):
1. **Đổi nó ngay trên trang bị tấn công.**
2. **Đổi nó ở mọi nơi bạn đã dùng lại** — đây mới là mối nguy thực sự, vì kẻ gian sẽ đem cặp "email-mật khẩu" đó đi thử vào ngân hàng, email và các trang mua sắm (dò nhồi thông tin). Một trình quản lý mật khẩu khiến việc này bớt đau đầu hơn nhiều, và còn ngăn được lần sau.
3. **Bật xác thực hai yếu tố** cho tài khoản đó và các tài khoản quan trọng của bạn.

**Nếu lộ thẻ thanh toán:** theo dõi sao kê, báo cáo mọi khoản chi lạ (ngân hàng nói chung đảo ngược được gian lận), và để ngân hàng phát hành lại thẻ nếu cần. Đây là loại rò rỉ dễ khắc phục nhất.

**Nếu lộ thông tin định danh** (khó nhất, vì bạn không đổi được ngày sinh của mình): ở những nơi khả dĩ, cân nhắc đóng băng tín dụng / cảnh báo gian lận với các cơ quan tín dụng, để ý các tài khoản được mở dưới tên bạn, và đặc biệt hoài nghi với những liên hệ viện dẫn thông tin thật của bạn.

## Sau đó: chuẩn bị cho làn sóng thứ hai

Rủi ro tiếp theo bị xem nhẹ là **lừa đảo nhắm trúng đích**. Sau một vụ rò rỉ, kẻ gian biết bạn dùng công ty nào và nắm một số thông tin thật của bạn, nên chúng gửi tới những tin "[Tên công ty] cảnh báo bảo mật — hãy xác minh tài khoản của bạn" trông rất thuyết phục. Hãy lường trước rằng chúng sẽ đến, và cứ áp dụng quy tắc sắt như mọi khi: đừng bao giờ đăng nhập qua link trong tin nhắn — hãy vào trang web trực tiếp. Một vụ rò rỉ khiến bạn thành mục tiêu bị đánh dấu trong một thời gian.

## Câu hỏi thường gặp

**Làm sao tôi biết mình có nằm trong một vụ rò rỉ?**
Các công ty thường có nghĩa vụ pháp lý phải thông báo cho bạn, nhưng cũng đáng dùng một dịch vụ tra cứu rò rỉ uy tín (như Have I Been Pwned) để kiểm tra email của bạn, và bật cảnh báo rò rỉ của trình quản lý mật khẩu.

**Vụ rò rỉ xảy ra mấy năm trước rồi — tôi còn cần xử lý không?**
Nếu từ đó bạn đã đổi mật khẩu ấy thành độc nhất và đã bật 2FA, thì về cơ bản bạn đã được che chắn. Nếu bạn *vẫn còn* dùng lại mật khẩu đó ở đâu đó, hãy đổi ngay — những mật khẩu cũ bị lộ sẽ bị đem thử suốt nhiều năm.

**Có nên trả tiền cho dịch vụ bảo vệ danh tính không?**
Nhiều khi các biện pháp bảo vệ cốt lõi (đóng băng tín dụng, tự theo dõi sao kê, mật khẩu độc nhất + 2FA) đều miễn phí và làm được phần lớn công việc. Dịch vụ trả phí có thể thêm chút tiện lợi, nhưng không thay thế được những điều căn bản.`,
  },
];
