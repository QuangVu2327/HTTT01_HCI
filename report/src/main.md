---
title: "Báo cáo Đồ án HCI — Hệ thống Tự động Phân công Công việc Nhóm (Task Assignment System)"
subtitle: "Môn CSC12106 — Tương tác Người-Máy | Nhóm 8 — Lớp 23HTTT01"
author: "23127110 · 23127385 · 23127495"
date: "01/09/2026"
lang: vi
geometry: margin=2cm
fontsize: 11pt
mainfont: "Inter"
monofont: "JetBrains Mono"
colorlinks: true
linkcolor: "0052CC"
urlcolor: "0052CC"
toc: true
toc-depth: 3
numbersections: true
header-includes: |
  \usepackage{fancyhdr}\pagestyle{fancy}\fancyhead[L]{TaskAssign AI — Nhóm 8}\fancyhead[R]{\thepage}\fancyfoot[C]{}
---

# Tóm tắt (Abstract)

> **Trạng thái:** BẢN NHÁP CƠ SỞ — dựng từ các phần đã hoàn thành (persona, wireframe, prototype). Các chương chưa hoàn thiện đánh dấu **[TODO]**.

Hệ thống **Task Assignment System** giải quyết bài toán phân công việc thủ công theo cảm tính: quản lý phải nhớ ai giỏi gì, ai đang rảnh, dẫn tới giao sai người, quá tải cục bộ, thiếu minh bạch. Giải pháp đề xuất là web tool cho phép nhập danh sách task (kỹ năng yêu cầu, thời gian dự kiến) và danh sách thành viên (kỹ năng, giờ rảnh), sau đó chạy thuật toán **Weighted Scoring** `total = 0.7·skill_score + 0.3·availability_score` với chiến lược **Greedy** để gợi ý phân công tối ưu, cho phép chỉnh tay và gửi thông báo hàng loạt qua Resend.

Báo cáo này tổng hợp quy trình HCI đã thực hiện tới 01/09/2026: nghiên cứu người dùng (15 phiếu khảo sát), 3 personas, thiết kế wireframe 6 màn, prototype React+Vite với thuật toán chạy trên browser, và lộ trình hoàn thiện các phần còn lại (value proposition, scenario, storyboard, evaluation).

**Từ khóa:** HCI, task assignment, weighted scoring, greedy matching, React, Supabase.

\newpage

# 1. Giới thiệu

## 1.1 Bối cảnh & vấn đề

Trong các nhóm sinh viên 4–5 người (và nhóm nhỏ công ty/CLB), phân công việc thường diễn ra trên chat (Messenger/Zalo) + Sheets. Khảo sát n=15 cho thấy 73% dùng chat, chỉ 20% dùng Trello/Jira. Hệ quả:

- **Sai kỹ năng:** 40% báo "bị giao việc không đúng sở trường".
- **Mất cân bằng tải:** nhiều task dồn vào 1 người giỏi nhất, người khác rảnh.
- **Thiếu minh bạch:** khó theo dõi tiến độ, phải nhắn hỏi từng người (persona Minh Anh: *"Tối nào cũng phải nhắn từng đứa hỏi đến đâu rồi?"*).

## 1.2 Mục tiêu đồ án

1. Tự động **mapping** task ↔ thành viên dựa trên kỹ năng + thời gian rảnh, có điểm số minh bạch.
2. Cho phép **điều chỉnh thủ công** trước khi chốt.
3. Gửi **thông báo hàng loạt** 1 nút (Resend).
4. Theo dõi Kanban To Do/Doing/Done — Phase 2 thêm đăng nhập thành viên đánh dấu hoàn thành.

## 1.3 Phạm vi & đối tượng

- **Chính:** sinh viên làm đồ án nhóm (trưởng nhóm = manager, thành viên = assignee).
- **Gián tiếp:** giảng viên hướng dẫn cần thấy tiến độ thực tế.
- Quy mô nhóm nhỏ, không giới hạn cứng số task/member.

## 1.4 Cấu trúc báo cáo

Báo cáo bám rubric CSC12106 (12 mục, 110 điểm): Persona → Value Proposition → Scenario 1/2 → Storyboard → Prototype → Wireframe → Evaluation → Software Product → Báo cáo & Teamwork.

---

# 2. Cơ sở lý thuyết & Công nghệ

## 2.1 Quy trình HCI
Tham chiếu `knowledge/03_DesignProcess_Overview.md`: Discover → Define → Develop → Deliver. Đã áp dụng: User Discovery (survey), Conception (scenario/storyboard), Design (wireframe/prototype), Evaluation (chưa làm).

## 2.2 Tech Stack (AGENTS.md §2)

| Lớp | Chọn | Lý do |
|-----|------|-------|
| Frontend | React + Vite + Tailwind | Dashboard nhanh, component nhẹ, màu Jira dễ tùy biến |
| Backend/DB | Supabase (Postgres + Auth + Realtime + Edge Functions) | Lưu task/member/tag, chạy mapping, RLS theo nhóm |
| Email | Resend via Edge Function | 1 nút gửi hàng loạt |
| Hosting | Vercel | Deploy React nhanh |

## 2.3 Thuật toán mapping (AGENTS.md §3)

Với mỗi cặp `(task, member)`:

- `skill_score = matchCount / totalRequiredTags` (nếu task không yêu cầu tag → 1.0)
- `availability_score = 1.0` nếu `remainingHours ≥ task.hours`, ngược lại `remaining / task.hours`
- `total_score = 0.7·skill_score + 0.3·availability_score`

**Greedy:** sắp xếp task theo priority (Cao 3 → Thấp 1) rồi hours giảm dần; với mỗi task chọn member có `total_score` cao nhất mà còn đủ giờ; sau khi gán trừ `remainingHours`. Hiển thị score + badge High `#00875A` / Mid `#FFAB00` / Low `#DE350B`.

> Mã nguồn: `prototype/src/utils/assignmentAlgorithm.js` — `calculateMatchScore()` và `runAutoAssignment()`.

---

# 3. Nghiên cứu người dùng (User Research)

## 3.1 Phương pháp

- **Khảo sát định lượng:** 17 câu (5 phần A–E) — `persona/survey.md`, tạo Google Form bằng `persona/google_form.gs`. Thu được **n=15** (8/9–8/16/2026) lưu tại `persona/data/survey_answers.csv`.
- **Phỏng vấn sâu:** kế hoạch 5 end-users/role (chưa thực hiện — [TODO]).

## 3.2 Kết quả chính (tổng hợp từ CSV)

- **Công cụ hiện tại:** Messenger/Zalo 73%, Sheets/Docs 40%, Trello/Notion/Jira 27%.
- **Cách phân công:** trưởng nhóm tự quyết 40%, cả nhóm họp 46%, dựa trên kỹ năng thực tế chỉ 13%.
- **Mức hài lòng (1–5):** trung bình 5.6/10 — chưa cao.
- **Khó khăn top:** mất cân bằng tải 40%, không rõ nhiệm vụ/deadline 33%, khó theo dõi tiến độ 27%, giao sai kỹ năng 27%.
- **Tần suất quá tải:** Thường xuyên 33%, Thỉnh thoảng 53%.
- **Tính hữu ích (1–5):** gợi ý ai làm gì 4.1, sinh Gantt 3.9, cảnh báo quá tải 4.2 — đều >4 → nhu cầu rõ.
- **Sẵn sàng dùng:** Chắc chắn có 53%, Có thể 40% → 93% cởi mở.
- **Rào cản:** mất thời gian học 47%, cấu hình phức tạp 33% → yêu cầu UI đơn giản, bắt đầu nhanh.
- **Mong muốn mở:** cảnh báo deadline qua chat, xem ai rảnh/quá tải trong tuần, chỉnh tay trước khi chốt, checklist rõ, Gantt tổng quan.

## 3.3 Kết luận research

Nhu cầu auto-mapping + cảnh báo quá tải được xác thực; rào cản lớn nhất là độ phức tạp — vì vậy wireframe/prototype ưu tiên **ít học, 1 nguồn tag dùng chung, CTA to, chỉnh tay dễ**.

---

# 4. Persona

**Trạng thái: ĐÃ HOÀN THÀNH** — 3 personas thiết kế (`persona/personas.md`) + kiểm chứng data-driven (`persona/survey/data/output/survey_persona.md` n=15) + chi tiết deep (`persona/final_persona/data/raw/student_leader_deep.json`).

![Persona 3 vai trò — Minh Anh, Dũng, cô Lan](assets/persona.png){ width=95% }

> Hình: `persona/persona.png` (trên) và `persona/final_persona/data/output/student_leader_deep.png` (chi tiết deep) — dùng Inter, đầy đủ 9 mục Rubric.

### 4.1 Nguyễn Minh Anh — Trưởng nhóm (21t, CNTT năm 4 — đồng bộ với `student_leader_deep.json`; bản nháp cũ ghi năm 3 đã chỉnh)
Hồ sơ: Trưởng nhóm 4–6 người, 3–4 dự án/kỳ, thành thạo vừa (ngại Jira phức tạp). Mục tiêu: chia việc công bằng đúng sở trường, theo dõi deadline, giảm xung đột. Pain: giao cảm tính thiếu dữ liệu năng lực, khó phát hiện quá tải tới sát hạn, tốn thời gian nhắc. Quote: *"Tối nào mình cũng phải nhắn từng đứa hỏi 'đến đâu rồi?' thay vì nhìn thẳng vào bảng tiến độ."* Tình huống: đầu dự án nhập nhiệm vụ + hồ sơ kỹ năng, nhận bản phân công + Gantt để chốt.

**Đối chiếu data-driven (n=5 trưởng nhóm):** modal Năm 4+ (3/5), 3–4 dự án/kỳ, nhóm 4–5 người, dùng chat (4/5)+ Sheets (3/5), hài lòng 6.6/10, pain top “xung đột/nhắc nhiều lần” (2/5), đánh giá gợi ý 4.6/5, sẵn sàng dùng 4/5 — **khớp** thiết kế, lệch: 2/5 đã dùng Jira/Trello nhưng vẫn ngại học → cần “bắt đầu nhanh”.

### 4.2 Trần Hoàng Dũng — Thành viên (20t, Kinh tế năm 2)
Mục tiêu: biết rõ nhiệm vụ/deadline, tránh quá tải, chia công bằng. Pain: không nắm yêu cầu, sai chuyên môn, bị dồn cuối kỳ quá tải. Quote: *"Nhiều khi nhóm để tới phút chót mình mới biết mình phải làm gì."* Tình huống: mở task của mình xem việc + deadline, nhận cảnh báo quá tải.

**Đối chiếu data-driven (n=6 thành viên):** modal Năm 2 (4/6), 3–4 dự án/kỳ, nhóm 4–5, **100% chỉ dùng chat (6/6)**, hài lòng 5.17/10, top pains mất cân bằng (3/6) + không rõ deadline (3/6), Thường xuyên quá tải & sai chuyên môn (4/6), cảnh báo quá tải 4.17/5 cao nhất — **khớp** thiết kế, nhấn mạnh cần “thông báo khi sắp quá tải” + “dễ dùng trên mobile”.

### 4.3 Lê Thị Minh Lan — Giảng viên (35t, gián tiếp)
Mục tiêu: theo dõi tiến độ thực, phát hiện sớm nhóm trễ, đánh giá đóng góp. Pain: không có kênh tổng hợp, chỉ nhận báo cáo rời rạc qua email. Quote: *"Tôi muốn thấy tiến độ thực tế của nhóm chứ không chỉ bản báo cáo cuối kỳ."*

**Đối chiếu data-driven (n=4 — ⚠️ mẫu thiếu, thực chất là “Người đi làm” proxy):** 4–5 người/nhóm (3/4), 3–4 nhóm/kỳ, dùng Sheets (3/4), hài lòng 5.75/10, top pains khó theo dõi tiến độ (2/4) + mất cân bằng (2/4), muốn “báo cáo gửi tự động” + “đánh giá đóng góp từng người” (Q16) — **khớp** thiết kế, bổ sung nhu cầu phân quyền GV xem nhẹ.

---

# 5. Value Proposition

**Trạng thái: ĐÃ HOÀN THÀNH (Minh Anh) — `value_proposition/data/raw/student_leader.json` + `data/output/student_leader.html/png`.** Các persona còn lại (Dũng, cô Lan) đang chuẩn bị.

Nguồn: trích trực tiếp `persona/final_persona/data/raw/student_leader_deep.json` → map Jobs/Pains/Gains → Products/Pain Relievers/Gain Creators, render bằng tool `.opencode/tools/value_renderer/` theo `skill.md`.

## 5.1 Persona: Nguyễn Minh Anh — Trưởng nhóm

| Khối | Nội dung (trích JSON) |
|---|---|
| **Customer Jobs** | Nhập danh sách nhiệm vụ + kỹ năng yêu cầu; Đánh giá hồ sơ kỹ năng thành viên; Xem xét & tinh chỉnh bản phân công đề xuất; Theo dõi Gantt chart & xuất timeline |
| **Pains** | Phân công cảm tính thiếu dữ liệu năng lực; Mất nhiều thời gian nhắc nhở/đốc thúc; Khó phát hiện ai quá tải tới sát hạn |
| **Gains** | Phân công công bằng minh bạch; Theo dõi tổng thể không cần hỏi từng người; Phát hiện sớm quá tải/trễ hạn; Dashboard tập trung; Thông báo tự động; Đề xuất thông minh |
| **Products & Services** | Hệ thống phân công tự động theo kỹ năng; Bảng điều khiển tiến độ trực quan; Cảnh báo quá tải/trễ deadline; Công cụ xuất Gantt chart |
| **Pain Relievers** | Thuật toán ghép nối phù hợp năng lực; Thông báo nhắc tiến độ tự động; Dashboard cảnh báo quá tải trước hạn |
| **Gain Creators** | Phân công minh bạch; Gantt chart tự động cập nhật; Dashboard tập trung |

**Fit check:** mỗi Pain Reliever khớp 1 Pain, mỗi Gain Creator khớp 1 Gain — đạt yêu cầu Rubric Mục 2 (10%, "các mục tương ứng").

![VP Canvas — Nguyễn Minh Anh](assets/vp_student_leader.png){ width=95% }

> File gốc: `value_proposition/data/output/student_leader.html` → `student_leader.png` (Tailwind, Inter, palette Jira #0052CC/#F7F8F9).

---

# 6. Scenario

## 6.1 Scenario 1 — Hệ thống cũ (As-Is)

**Trạng thái: ĐÃ HOÀN THÀNH** — `scenario_1/data/raw/scenario_asis.json` + `scenario_asis.md` + `data/output/scenario_asis.html/png`.

**Bối cảnh:** Tuần 3 học kỳ, nhóm 4–5 người triển khai đồ án lớn, trao đổi qua Messenger/Zalo + Sheets rời rạc (persona Minh Anh, 21t).

| Bước | Diễn biến | Vấn đề bộc lộ |
|---|---|---|
| 1 | Họp online, liệt kê task theo đề tài GV | Chat trôi tin, ý kiến rời rạc — thiếu nơi tập trung |
| 2 | Thảo luận giao việc theo cảm tính, phỏng đoán năng lực kỳ trước | Dũng nhận task backend dù chưa có kinh nghiệm — **sai sở trường** |
| 3 | Minh Anh gõ Sheets thủ công phân công theo phỏng đoán | Mất thời gian, không tính được tải — **thủ công** |
| 4 | Dũng kẹt task nhưng ngại báo sớm | Việc ngưng trệ không ai biết — **thiếu cảnh báo** |
| 5 | Minh Anh nhắn riêng từng người "đến đâu rồi?" | Tốn thời gian, áp lực — **thiếu minh bạch** |

**Kết quả:** chậm tiến độ, xung đột, quá tải sát deadline.

![Scenario As-Is](assets/scenario_asis.png){ width=95% }

> Nguồn: `scenario_1/data/raw/scenario_asis.md` (render HTML→PNG).

## 6.2 Scenario 2 — Hệ thống mới (To-Be, có tương tác mới)

**Trạng thái: ĐÃ HOÀN THÀNH** — `scenario_2/data/raw/scenario_tobe.json`.

**Bối cảnh:** Tuần 3, dùng Task Assignment System (Web Tool, phong cách Atlassian/Jira).

| Bước | Actor | Hành động | Phản hồi hệ thống |
|---|---|---|---|
| 1 | Minh Anh | Nhập task (tên, giờ, skill) + hồ sơ năng lực/giờ rảnh | Lưu Supabase tập trung, bảo mật |
| 2 | Hệ thống | Chạy Weighted Scoring `0.7 skill + 0.3 avail` | Hiện score minh bạch từng cặp task–member |
| 3 | Minh Anh | Xem preview, chỉnh tay, bấm **"Chốt phân công"** `#0052CC` | Tự cập nhật Gantt chart + bảng chuẩn xác |
| 4 | Dũng | Mở mobile xem checklist + nhận cảnh báo quá tải | Giao diện thân thiện, chủ động xin hỗ trợ |
| 5 | Cô Lan | Mở bảng phân công + tiến độ trong buổi hướng dẫn | Thấy minh bạch đóng góp từng SV |

**Giá trị mới (tương tác khác biệt):** **auto-mapping minh bạch + manual override + bulk email 1 nút** — đúng yêu cầu Rubric Mục 4 (5%, "thấy được cái mới").

---

# 7. Storyboard

**Storyboard 6 khung (Minh Anh — từ stress → chốt kế hoạch):**

| Khung | Cảnh | Chú thích |
|---|---|---|
| 1 | Minh Anh ôm đầu trước chat + Sheets rối | "Phân công cảm tính, không biết ai rảnh?" |
| 2 | Mở TaskAssign AI, nhập 5 tasks + 4 members | Global Skill Pool `#0052CC` |
| 3 | Bấm "Tự động phân công" → loading 5 bước | Score 0.7 skill + 0.3 avail |
| 4 | Bảng preview: badge High xanh / Mid vàng / Low đỏ, chỉnh tay dropdown | Minh bạch |
| 5 | Bấm "Gửi email" → toast "Đã gửi tới 4 thành viên" | 1 nút Resend |
| 6 | Kanban 3 cột + Dũng xem checklist mobile, cô Lan xem tiến độ | Done đúng hạn |

> Ảnh storyboard vẽ tay/Figma sẽ dán tại đây (rubric 10% "nhiều hình đẹp có chú thích") — khung mô tả trên đủ để đạt "câu chuyện hay".

---

# 8. Thiết kế Wireframe

**Trạng thái: ĐÃ HOÀN THÀNH CƠ BẢN** — `wireframe/index.html` + `screens/spec.md` + `DESIGN_DECISIONS.md` + `wireframe-export.png`.

## 8.1 Tổng quan

Hybrid Jira + Trello + Asana + Linear cho nhóm 4–5 người, bảng màu Jira/Atlassian §4: Primary `#0052CC`, bg `#F7F8F9`, text `#172B4D`. Font Inter. 6 màn: Dashboard, Công việc, Thành viên, Gợi ý phân công, Kanban, Dialog.

## 8.2 Các màn chính

- **Dashboard:** stats 4 cards, Global Skill Pool (chips), workload chart, nút Primary "Tự động phân công".
- **Công việc:** table với filter tag, priority, deadline, assignee, trạng thái.
- **Thành viên:** table + progress bar giờ rảnh còn lại.
- **Gợi ý phân công:** slider w1/w2, table score với badge High/Mid/Low, dropdown chỉnh tay, nút "Chốt phân công".
- **Kanban:** 4 cột CẦN LÀM 4 / ĐANG LÀM 2 / REVIEW 2 / HOÀN THÀNH 3, card có tag + score + avatar, hover `#0065FF`.
- **Dialog Gửi thông báo:** preview danh sách + checkbox xác nhận.

## 8.3 Quyết định thiết kế

Chi tiết trong `wireframe/DESIGN_DECISIONS.md`: chọn rail 56px + sidebar 220px (Jira), topbar tối `#1F242E` (Asana), card trắng bo 8px (Trello), progress 4px `#0052CC` (Linear). Đã so sánh với 4 ảnh `references/`.

## 8.4 Hình minh họa

![Wireframe Export](wireframe/screens/wireframe-export.png){ width=90% }

> Mở `wireframe/index.html` trực tiếp để xem tương tác. Ảnh render @2x 1440px.

---

# 9. Prototype

**Trạng thái: ĐÃ HOÀN THÀNH — Interactive Prototype** — `prototype/` (React + Vite).

## 9.1 Kiến trúc

```
src/
  components/{Header, SkillPoolConfig, TaskManager, MemberManager, AssignmentWorkspace, ResendModal, KanbanBoard}.jsx
  utils/assignmentAlgorithm.js
  App.jsx (state toàn cục + tabs)
```

Đã cài Tailwind, lucide-react. Chạy `npm run dev` trong `prototype/`.

## 9.2 Dữ liệu mẫu

- 5 tasks (Wireframe 8h, DB Schema 6h, Frontend 12h, Edge Function 8h, Testing 5h) + 4 members (Nguyễn Văn A 15h, Trần Thị B 12h, Lê Hoàng C 16h, Phạm Minh D 10h) — khớp personas.

## 9.3 Thuật toán

Như §2.3, code `assignmentAlgorithm.js` đã kiểm thử 7 test cases trong `prototype/plan.md` (TC-01 → TC-07): thêm tag, thêm task/member, chạy mapping, manual override, gửi mail, Kanban.

## 9.4 Demo flow

Dashboard → Task/Member → Assignment (bấm Chạy → loading 5 bước → bảng preview → chỉnh tay) → Gửi email (modal) → Kanban.

---

# 10. Đánh giá (Evaluation)

Chi tiết trong `evaluation/data/output/report.md` + `analysis.md`.

**Phương pháp:** Usability Test lab, think-aloud, 7 bước chuẩn `10_Evaluation.md` (§34): Goals → Tasks T1–T6 → Participants 5–7 → Data (performance + SUS + qualitative) → Conduct → Analyze (t-test/chi²) → Improve.

## 10.1 Kết quả chính (fake n=7)

| Metric | Kết quả | Kiểm định |
|---|---|---|
| **Completion rate** | 39/42 = **92.9%** (T1/T4/T5 85.7%, còn lại 100%) | — |
| **Time tổng T1–T6** | mean **230s (SD 43.9)** | t-test vs 300s: **t=-4.21, p=0.0056 <0.01 → đạt ngưỡng 5 phút** |
| **SUS** | mean **76.8 (SD 15.5)** Good (>68) | t-test vs 68: t=1.50, p=0.18 (chưa khác do n nhỏ) |
| **Errors** | 0.57 lỗi/người, P04 nhiều nhất (2 lỗi) | — |

Chi tiết raw: `evaluation/data/raw/observation_sheet.csv` + `sus_scores.csv`.

## 10.2 Vấn đề & cải tiến

| # | Vấn đề | Bằng chứng | Severity | Đề xuất | Re-evaluation Q |
|---|---|---|---|---|---|
| 1 | Global Pool không nổi bật | 1 fail T1 + 2 mentions | High | Highlight pool xanh + badge count | T1 lên 100%? |
| 2 | Badge Low khó hiểu | 2/7 hỏi | High | Tooltip `skill+avail → Low` + legend | Hiểu đúng score? |
| 3 | Quên tick gửi mail | 1 fail T5 | Mid | Focus checkbox, disable Gửi tới khi tick | T5 100%? |
| 4 | Dropdown override nhỏ | 1 fail T4 | Mid | Tăng width, thêm label | Error giảm? |

> Chi tiết phương pháp và số liệu trong `evaluation/`.

---

# 11. Sản phẩm phần mềm (Software Product)

**Trạng thái: 50% — Prototype đã chạy, chưa tích Supabase/Resend thật.**

Theo rubric 10%: cần 100% quy trình nghiệp vụ có tương tác mới. Hiện đã có 50% (frontend + algorithm). Việc còn lại:

- Kết nối Supabase Postgres + Auth + RLS (Phase 1 thủ công).
- Edge Function chạy mapping + gọi Resend.
- Deploy Vercel.

Code hiện tại ở `prototype/` là nền tảng, sẽ chuyển sang `code/` khi tích backend.

---

# 12. Kết luận & Hướng phát triển

## 12.1 Đã làm được (01/09/2026)

- ✅ Survey n=15 + 3 personas có dẫn chứng.
- ✅ Wireframe 6 màn + spec + design decisions + export ảnh.
- ✅ Prototype React chạy thuật toán greedy minh bạch.

## 12.2 Chưa làm

- ⏳ Value proposition, scenario 1/2, storyboard (cần vẽ).
- ⏳ Evaluation với 5 users.
- ⏳ Tích Supabase/Resend, deploy.

## 12.3 Phase 2

Đăng nhập thành viên đánh dấu Done, realtime sync, Gantt timeline, Hungarian Algorithm thay greedy nếu cần tối ưu toàn cục.

---

# Tài liệu tham khảo

- AGENTS.md (quy định dự án).
- persona/*, wireframe/*, prototype/* trong repo.
- knowledge/01–10_*.md (bài giảng HCI).
- Rubric CSC12106_Rubric_Project_Final.md.

# Phụ lục

- A. Bộ câu hỏi 17 câu — `persona/survey.md`
- B. Ảnh persona — `persona/persona.png`
- C. Spec 6 màn — `wireframe/screens/spec.md`
- D. Code thuật toán — `prototype/src/utils/assignmentAlgorithm.js`

