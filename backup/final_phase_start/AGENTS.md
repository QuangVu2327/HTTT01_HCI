# Quy định phát triển dự án - Agents.md (OpenCode Project)

## 1. Tổng quan dự án (Project Overview)
Dự án này là một **ứng dụng web quản lý & tự động phân công task (Task Assignment System)**, giải quyết vấn đề phân công việc thủ công theo cảm tính hiện nay — quản lý phải tự nhớ ai giỏi gì, ai đang rảnh, dẫn tới phân việc sai người, không cân bằng khối lượng, hoặc bỏ sót năng lực phù hợp.

**Mục tiêu chính:** Tự động **mapping (ghép nối) công việc với thành viên phù hợp nhất** dựa trên dữ liệu kỹ năng yêu cầu và năng lực thực tế, giúp quản lý ra quyết định phân công nhanh, chính xác, minh bạch hơn so với cách làm thủ công.

**Cơ chế hoạt động chính:**
1. **Input danh sách công việc (Task Input):** Quản lý nhập/import danh sách task, gồm: tên task, thời gian dự kiến hoàn thành, kỹ năng yêu cầu (có thể mở rộng thêm trường sau — độ ưu tiên, deadline, mô tả...).
2. **Input danh sách thành viên (Member Input):** Quản lý nhập/import danh sách nhân sự, gồm: năng lực/kỹ năng (role mapping với kỹ năng yêu cầu của task), thời gian làm việc khả dụng (có thể mở rộng thêm — kinh nghiệm, khối lượng đang đảm nhận...).
3. **Tự động mapping & phân chia (Auto-Assignment):** Hệ thống chạy thuật toán đối chiếu (matching) giữa yêu cầu của task và năng lực/thời gian rảnh của từng thành viên, đề xuất phương án phân công tối ưu.
4.    - Quản lý có thể xem trước và **điều chỉnh thủ công** kết quả gợi ý trước khi chốt (không tự động hoàn toàn, tránh sai sót).
5. **Gửi thông báo hàng loạt (Cải tiến):** Quản lý bấm 1 nút để gửi email/thông báo phân công tới toàn bộ nhân viên liên quan.
6. **Nhân viên cập nhật tiến độ (Cải tiến, nếu kịp):** Nhân viên đăng nhập, xem task được giao, đánh dấu hoàn thành → hệ thống tự động cập nhật trạng thái & (có thể) đưa dữ liệu này vào lần mapping tiếp theo.

**Đối tượng người dùng chính:**
- Sinh viên làm đồ án/bài tập nhóm (quản lý = trưởng nhóm, nhân viên = thành viên nhóm).
- Nhóm nhỏ (team công ty, câu lạc bộ, dự án cá nhân) cần công cụ phân việc gọn nhẹ, có gợi ý tự động thay vì phân bằng cảm tính.

## 2. Công nghệ sử dụng (Tech Stack)
- **Frontend:** **React + Vite** — dựng UI dạng dashboard (task table, member table, kết quả mapping).
  - Thư viện UI gợi ý: Tailwind CSS + component nhẹ (không bắt buộc UI kit nặng như MUI, ưu tiên tối giản dễ tùy biến theo bảng màu riêng — xem mục 4).
- **Backend & Database:** **Supabase** (Postgres + Auth + Realtime + Edge Functions).
  - Postgres lưu: dự án quản lý, danh sách task, danh sách thành viên, tag kỹ năng (dùng chung theo từng dự án), kết quả mapping.
  - Edge Functions: chạy thuật toán mapping và gọi dịch vụ gửi email.
  - Auth: chuẩn bị sẵn cấu trúc user/role trong DB, nhưng **việc gán quyền xử lý thủ công** ở giai đoạn này (chưa cần UI phân quyền phức tạp).
- **Gửi email:** Resend (đơn giản, tích hợp tốt với Supabase Edge Function, có free tier phù hợp đồ án).
- **Hosting:** Vercel (deploy nhanh cho React + tích hợp tốt với Supabase).

## 3. Công nghệ phụ trợ (Auxiliary Tech)
- **Thuật toán mapping/phân công tự động (Weighted Scoring):**
  - Với mỗi cặp (task, thành viên), tính điểm phù hợp:
    - `skill_score`: tỉ lệ tag kỹ năng của thành viên trùng khớp với tag yêu cầu của task (VD: task cần 3 tag, thành viên có 2/3 → skill_score = 0.67).
  - `availability_score`: 1 nếu thời gian rảnh của thành viên ≥ thời gian dự kiến task, giảm dần/loại nếu không đủ.
  - `total_score = w1 * skill_score + w2 * availability_score` (trọng số `w1, w2` có thể chỉnh, mặc định đề xuất `w1 = 0.7, w2 = 0.3` — ưu tiên đúng kỹ năng hơn, vì làm sai kỹ năng rủi ro cao hơn trễ giờ).
  - Với mỗi task, chọn thành viên có `total_score` cao nhất **và chưa vượt quá tổng thời gian rảnh còn lại** (tránh 1 người bị gán dồn hết task).
  - Xử lý xung đột (nhiều task cùng cần 1 người giỏi nhất): xử lý tuần tự theo độ ưu tiên task (nếu có) hoặc theo `total_score` giảm dần toàn cục — task nào có độ khớp cao nhất được gán trước, sau đó cập nhật lại thời gian rảnh còn lại của thành viên trước khi mapping task tiếp theo (thuật toán tham lam - greedy, đơn giản và đủ tốt cho quy mô nhóm nhỏ; có thể nâng cấp lên bài toán ghép cặp tối ưu toàn cục — Hungarian Algorithm — nếu cần độ chính xác cao hơn ở giai đoạn sau).
  - Kết quả mapping luôn hiển thị điểm số (score) minh bạch để quản lý biết vì sao hệ thống gợi ý người này, dễ điều chỉnh thủ công nếu cần.
- **Gửi email hàng loạt:** Resend, tích hợp qua Supabase Edge Function, kích hoạt khi quản lý bấm nút "Gửi thông báo phân công".
- **Biểu đồ & dashboard:** Chart.js hoặc Recharts để hiển thị khối lượng công việc/độ khớp kỹ năng theo từng thành viên.
- **Thông báo realtime:** Supabase Realtime Subscriptions — chuẩn bị sẵn cho Phase 2 (khi nhân viên đăng nhập cập nhật trạng thái).
- **Ngày giờ/thời lượng:** `date-fns` hoặc `dayjs` để xử lý thời gian dự kiến, deadline, thời gian rảnh của thành viên.

## 4. Quy tắc thiết kế (Design Rules)
- **Phong cách tổng thể:** Trang quản lý task (dashboard-style) gồm các khu vực chính:
  - Bảng nhập/danh sách công việc (task list/table hoặc form nhập nhanh).
  - Bảng nhập/danh sách thành viên (member list/table).
  - Khu vực kết quả mapping — hiển thị gợi ý phân công theo dạng bảng hoặc **Kanban theo trạng thái** (To do / Doing / Done) để dễ theo dõi sau khi đã chốt phân công.
- **Bảng màu chủ đạo (tham khảo phong cách Jira/Atlassian — sạch, chuyên nghiệp, dễ phân biệt trạng thái):**
  | Vai trò | Mã màu | Ý nghĩa sử dụng |
  |---|---|---|
  | Primary (Atlassian Blue) | `#0052CC` | Nút chính, link, brand color |
  | Primary Hover | `#0065FF` | Trạng thái hover của nút chính |
  | Nền chính | `#F7F8F9` | Background tổng thể trang |
  | Nền card/panel | `#FFFFFF` | Nền cho task card, bảng, panel |
  | Viền/Border | `#DFE1E6` | Đường viền bảng, card |
  | Text chính | `#172B4D` | Màu chữ tiêu đề, nội dung chính |
  | Text phụ | `#6B778C` | Chữ mô tả, ghi chú phụ |
  | To do / Chưa bắt đầu | `#DFE1E6` (nền) + `#42526E` (chữ) | Trạng thái xám trung tính |
  | Doing / Đang làm | `#FFF0B3` (nền) + `#974F0C` (chữ) | Vàng cảnh báo đang xử lý |
  | Done / Hoàn thành | `#E3FCEF` (nền) + `#006644` (chữ) | Xanh lá thành công |
  | Trễ hạn/Gấp | `#FFEBE6` (nền) + `#BF2600` (chữ) | Đỏ cảnh báo |
  | Độ khớp mapping cao | `#00875A` | Badge/score xanh đậm khi score cao |
  | Độ khớp mapping trung bình | `#FFAB00` | Badge/score vàng khi score trung bình |
  | Độ khớp mapping thấp | `#DE350B` | Badge/score đỏ khi score thấp |
- **Font chữ:** **Inter** hoặc **Be Vietnam Pro** — cả hai đều hỗ trợ chuẩn UTF-8, có đầy đủ dấu tiếng Việt, phong cách hiện đại tương tự font hệ thống của Atlassian/Jira. Đề xuất dùng qua Google Fonts, khai báo `font-family` có fallback: `'Inter', 'Be Vietnam Pro', system-ui, sans-serif`.
- **Thẻ task (task card):** Hiển thị rõ tên task, người được gán, kỹ năng yêu cầu (dạng tag/badge), thời gian dự kiến, trạng thái, và điểm mapping (nếu đang ở màn hình xem gợi ý).
- **Tương tác trực quan:**
  - Nút "Tự động phân công" dùng màu Primary (`#0052CC`), có trạng thái loading rõ ràng khi hệ thống đang chạy mapping.
  - Cho phép chọn lại thủ công nếu quản lý muốn chỉnh gợi ý mapping (dropdown chọn thành viên khác cho từng task).
  - Nút "Gửi thông báo cho tất cả nhân viên" cần có bước xác nhận (dialog) trước khi gửi email thật, tránh gửi nhầm.
  - Hover effect rõ ràng trên mọi nút bấm và task card (dùng màu Primary Hover `#0065FF`).
  - Hiệu ứng chuyển động mượt (transition ~150-200ms) khi cập nhật trạng thái/mapping.
- **Responsive:** Giao diện dùng tốt trên cả desktop (quản lý thao tác nhập liệu/mapping) và mobile (xem nhanh trạng thái task).

## 5. Standard Folder Structure
Mỗi thư mục chức năng (module) trong dự án phải tuân thủ cấu trúc sau để đảm bảo tính nhất quán:

```text
module_name/
├── data/          # Lưu trữ toàn bộ dữ liệu, file thô, assets...
│   ├── assets/    # Ảnh gốc, icons, tài nguyên đầu vào
│   ├── output/    # Các tệp kết quả (HTML, CSS, Images, Reports...)
│   └── raw/       # Dữ liệu thô (.csv, .json...)
├── skill.md       # Hướng dẫn thực hiện công việc (kiến thức, tư duy)
├── plan.md        # Kế hoạch triển khai cho module
├── changelog.md   # Nhật ký thay đổi
└── messages.md    # Nhật ký tương tác
```

## 6. Quy tắc bắt buộc (Mandatory Rules)
- **Đọc `Agents.md` trước khi bắt đầu:** Agent phải đọc tệp cấu hình này đầu tiên trong mỗi phiên làm việc mới và tuân thủ nghiêm ngặt các quy định tại đây.
- **Ngôn ngữ giao tiếp:** Linh hoạt sử dụng cả Tiếng Anh và Tiếng Việt trong trao đổi và đánh dấu thông tin; giao diện người dùng (UI text) mặc định bằng **Tiếng Việt**.
- **Phê duyệt:** Luôn hỏi ý kiến và nhận được sự đồng ý của người dùng trước khi viết, sửa đổi hoặc xóa bất kỳ đoạn mã nào trong dự án. Tuyệt đối hỏi ý kiến trước khi xóa bất kỳ tệp hoặc thư mục nào.
- **Bản sao lưu (Backup):**
  - Trước khi sửa đổi bất kỳ tệp nào, giữ bản sao lưu của phiên bản hiện tại trong thư mục `backup/` riêng biệt.
  - Với thay đổi từ 10 dòng trở lên, lưu thêm bản tóm tắt tư duy có ghi dấu thời gian trong thư mục con của `backup/`.
  - Sau mỗi 5 lần thay đổi, có thể xóa bớt backup cũ nhưng phải giữ lại ít nhất một phiên bản hoạt động ổn định nhất.
- **Nhật ký thay đổi (Changelog):** Tạo/cập nhật `changelog.md` sau mỗi lần can thiệp lớn hoặc khi hoàn thành một tính năng, kèm dấu thời gian và lý do thay đổi.
- **Minh bạch lệnh hệ thống:** Giải thích rõ mục đích và tác động của các câu lệnh terminal trước khi thực thi.
- **Thay đổi nguyên tử (Atomic Changes):** Chia nhỏ công việc lớn thành các tác vụ nhỏ, mỗi bước chỉ giải quyết một vấn đề cụ thể để dễ kiểm soát và đảo ngược.
- **Bảo mật thông tin & Supabase:**
  - Không commit API key/secret của Supabase trực tiếp vào code — dùng biến môi trường (`.env`, không đưa lên git).
  - Áp dụng Row Level Security (RLS) trên Supabase để mỗi nhóm chỉ truy cập được dữ liệu của nhóm mình.
  - Không lưu trữ thông tin cá nhân nhạy cảm ngoài phạm vi cần thiết (tên, email liên hệ nhóm là đủ).
- **Chất lượng mã nguồn (Code Quality):**
  - Ưu tiên mã nguồn đơn giản, dễ hiểu, hoạt động ổn định.
  - Tuân thủ nguyên tắc Clean Code; luôn để lại chú thích giải thích mục đích, dùng `---` hoặc `===` để phân chia rõ các phần/chức năng.
  - Tránh viết lại toàn bộ (total rewrite) kiến trúc trung tâm trừ khi có yêu cầu đặc biệt.
  - Viết unit test cho các logic cốt lõi (tính toán trạng thái task, phân công, đồng bộ dữ liệu).
- **Quy định về Knowledge:**
    - **Thư mục `knowledge/`:** Chứa các tài liệu lý thuyết nền tảng và hướng dẫn chi tiết cho các khía cạnh khác nhau của dự án HCI (ví dụ: quy trình thiết kế, kỹ thuật khám phá người dùng, xây dựng persona, đánh giá khả dụng).
    - **Danh sách các tệp trong `knowledge/`:**
      - `00_Welcome_23HTTT.md` — Giới thiệu môn học CSC12106 HCI.
      - `01_Introduction.md` — Tổng quan về HCI.
      - `02_Foundation.md` — Nền tảng con người & máy tính.
      - `03_DesignProcess_Overview.md` — Tổng quan quy trình thiết kế.
      - `04_UserDiscovery_Technique.md` — Kỹ thuật khám phá người dùng.
      - `05_UserDiscovery_Persona_ValueProposition.md` — Persona & Value Proposition Canvas (chứa 9 yếu tố persona chuẩn).
      - `06_Conception_Scenario_Sketching.md` — Kịch bản & Phác thảo ý tưởng.
      - `07_Conception_Storyboard.md` — Kịch bản phân cảnh (Storyboard).
      - `08_Design_Prototype.md` — Thiết kế mẫu thử (Prototyping).
      - `09_Design_Visual_Design.md` — Thiết kế trực quan (Visual Design).
      - `10_Evaluation.md` — Đánh giá độ khả dụng (Usability Evaluation).
    - **Bắt buộc đọc Knowledge trước khi làm việc:** Trước khi thực hiện bất kỳ yêu cầu, phân tích hoặc xây dựng tính năng nào liên quan đến thiết kế, đánh giá, persona, prototype, v.v., AI **bắt buộc** phải truy cập và đọc các tệp kiến thức chuyên môn tương ứng trong thư mục `knowledge/` để đảm bảo mọi giải pháp đều tuân thủ chuẩn khoa học của môn **Tương tác người - máy (HCI - CSC12106)**.

## 6. Template Usage
Khi bắt đầu một module mới, hãy sử dụng các tệp mẫu trong thư mục `templates/` để đảm bảo tính nhất quán:
- Sử dụng `templates/folder.md` để tạo cấu trúc thư mục module.
- Sử dụng `templates/skill.md` để hướng dẫn AI thực hiện các kỹ năng (skills).
- Sử dụng `templates/plan.md` để lên kế hoạch (plan) cho module.
- Sử dụng `templates/persona.md` (nếu cần) khi thực hiện tác vụ liên quan đến Persona.

## 7. Cơ chế sử dụng Rules (Lazy Loading)
Khi thực hiện các tác vụ, hãy kiểm tra ngữ cảnh và nạp các bộ quy tắc tương ứng từ thư mục `rules/` nếu cần thiết để đảm bảo tính đồng nhất và tối ưu hóa token:
- Nếu task liên quan đến thiết kế người dùng: tham chiếu `@rules/hci.md`.
- Nếu task liên quan đến lập trình/logic: tham chiếu `@rules/reasoning.md`.
- Nếu task yêu cầu chuẩn mực chất lượng: tham chiếu `@rules/quality.md`.
- Khi cần định dạng văn bản: tham chiếu `@rules/style.md`.
- Quy tắc chung của dự án: tham chiếu `@rules/project.md`.

## 8. Workflow (Quy trình làm việc)
Quy trình phát triển dự án tuân thủ nghiêm ngặt theo 5 bước cốt lõi sau:
1. **Understand (Tìm hiểu):**
   - Phân tích yêu cầu, bối cảnh dự án (đội nhóm, quy mô, workflow phân việc thực tế).
   - Khảo sát các ràng buộc kỹ thuật liên quan (Supabase schema, realtime sync, phân quyền).
2. **Plan (Lập kế hoạch):**
   - Chia nhỏ tính năng lớn thành các tác vụ nhỏ (atomic tasks).
   - Trình bày kế hoạch cụ thể cho người dùng và nhận xác nhận trước khi thực thi.
3. **Implement (Thực thi):**
   - Viết mã nguồn và thực hiện thay đổi đúng theo kế hoạch đã duyệt.
   - Thực hiện tuần tự, tránh ảnh hưởng chéo đến các phần khác của hệ thống.
4. **Verify (Kiểm tra):**
   - Chạy Unit Test cho phần logic cốt lõi (phân công, cập nhật trạng thái, đồng bộ realtime).
   - Kiểm tra responsive trên nhiều kích thước màn hình.
   - Kiểm tra kết nối/đồng bộ dữ liệu với Supabase hoạt động đúng.
5. **Confirm & Log (Xác nhận & Nhật ký):**
   - Báo cáo kết quả chi tiết sau khi kiểm thử thành công cho người dùng.
   - Cập nhật dấu thời gian và tóm tắt công việc vào `changelog.md` sau khi hoàn thành mỗi milestone.
   - Với mỗi lần thực hiện trả lời, hãy cập nhật file messages.md (nếu chưa có thì tạo), đếm lại số lần đã trao đổi với người dùng (của người dùng và của AI). thực hiện đếm trên từng folder.
---

## 9. Tổng hợp quyết định đã chốt
| Hạng mục | Quyết định |
|---|---|
| Frontend | React + Vite |
| Database/Backend | Supabase (Postgres + Edge Functions + Realtime) |
| Thuật toán mapping | Weighted scoring (skill_score × 0.7 + availability_score × 0.3), xử lý xung đột theo greedy — task khớp cao nhất được gán trước |
| Tag kỹ năng | Định nghĩa 1 lần khi tạo dự án quản lý mới, dùng chung cố định cho cả trang Task và trang Thành viên |
| Gửi thông báo | Gửi email thật tới thành viên qua Resend, có bước xác nhận trước khi gửi |
| Nhân viên đăng nhập đánh dấu hoàn thành | **Phase 2** — không làm ở bản đầu tiên |
| Phân quyền quản lý/thành viên | Có khái niệm, nhưng xử lý thủ công ở giai đoạn này, chưa cần UI/Auth phức tạp |
| Giới hạn số lượng thành viên/task | Không giới hạn cứng, theo dữ liệu nhập vào lúc khởi tạo |
| Bảng màu | Theo bảng màu phong cách Jira/Atlassian ở mục 4 |
| Font chữ | Inter / Be Vietnam Pro (UTF-8, đầy đủ dấu tiếng Việt) |

> Các quyết định trên là **cấu hình mặc định cho Phase 1**. Khi có thay đổi, cập nhật trực tiếp vào các mục tương ứng ở trên và ghi lại lý do thay đổi trong `changelog.md`.
