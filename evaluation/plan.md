# Kế hoạch Đánh giá (Evaluation Plan) — Task Assignment System

> **Căn cứ:** `knowledge/10_Evaluation.md` (Focus Group, Wizard-of-Oz, Usability Test, Quantitative Analysis) + `knowledge/CSC12106_Rubric_Project_Final.md` **Mục 8: Evaluation (10%)** — yêu cầu *đầy đủ các thành phần của một phương pháp đánh giá đã học* mới đạt 1.0.

## 1. Mục tiêu

- Kiểm chứng prototype `prototype/` + wireframe `wireframe/index.html` có giải quyết được pains của 3 personas (Minh Anh / Dũng / cô Lan) không.
- Đo **hiệu quả, hiệu suất, lỗi, khả năng học, hài lòng** (5 tiêu chí usability — slide 27).
- Thu thập bằng chứng định lượng (task success, time, SUS) để điền vào báo cáo §10 và cải tiến thiết kế trước khi tích Supabase.

## 2. Đầu vào

| Tài liệu | Vai trò |
|---|---|
| `prototype/src/App.jsx` + `assignmentAlgorithm.js` | Sản phẩm cần đánh giá (5 tasks + 4 members, flow 4 tabs) |
| `wireframe/index.html` + `screens/spec.md` | Phương án thay thế để so sánh nếu cần |
| `persona/personas.md` + `survey_answers.csv` (n=15) | Định nghĩa đúng target user |
| `knowledge/10_Evaluation.md` §3 (Usability Test) | Quy trình 7 bước chuẩn |

## 3. Phương pháp đã chọn

**Chính: Usability Test (Lab, Think-Aloud)** — phù hợp rubric, dễ làm với 5–7 người.
**Bổ trợ (tùy chọn):** Focus Group 6–8 người để lấy phản hồi về score minh bạch; Wizard-of-Oz nếu muốn test luồng gửi email trước khi nối Resend thật.

Không dùng đồng thời cả 3 để tránh quá tải; tập trung làm **1 phương pháp thật trọn vẹn** để đạt điểm 1.0.

## 4. Sản phẩm đầu ra

- `evaluation/data/raw/observation_notes.md` — ghi chép quan sát + screen recording log
- `evaluation/data/raw/sus_scores.csv` — điểm SUS 10 câu / người
- `evaluation/data/output/report.md` — báo cáo đánh giá (goals, tasks, participants, metrics, kết quả, vấn đề & cải tiến)
- Cập nhật `report/src/main.md` §10 + `slides/src/slides.md` §10
- Issues cải tiến cho `prototype/` (vd: đổi ngưỡng badge, thêm tooltip)

## 5. Quy trình 7 bước (theo slide 34)

### B1 — Define goals (Research Questions)
- RQ1: Trưởng nhóm có **hoàn thành** được flow "nhập 3 tasks + 2 members → chạy mapping → chỉnh tay → gửi mail" không?
- RQ2: Thời gian hoàn thành có **dưới ngưỡng 5 phút** cho flow chuẩn không? (định trước threshold)
- RQ3: Người dùng có **hiểu** score `0.7 skill + 0.3 avail` và badge High/Mid/Low không?
- RQ4: Mức **hài lòng** (SUS) có ≥ 68 (ngưỡng trung bình) không?

### B2 — Define tasks (Pre-define, slide 32)
| ID | Task | Mô tả thao tác | Thành công khi |
|---|---|---|---|
| T1 | Tạo Global Tags | Thêm 2 tag mới | Tag xuất hiện ở Task/Member dropdown |
| T2 | Nhập task + member | Tạo 1 task "Viết API 6h Backend" + 1 member "An 12h Backend" | Xuất hiện trong bảng |
| T3 | Chạy mapping | Bấm "Chạy Tự động Phân công" | Thấy bảng preview + badge High ≥80% |
| T4 | Manual Override | Đổi assignee của 1 task | Badge cập nhật, toast xác nhận |
| T5 | Gửi thông báo | Bấm "Gửi email" → tick xác nhận → Gửi | Toast "Đã gửi tới N thành viên" |
| T6 | Xem Kanban | Chuyển tab Kanban, lọc "Việc của tôi" | Card đúng cột ToDo/Doing/Done |

Mỗi task có **hướng dẫn verbatim** cho facilitator, không gợi ý cách làm.

### B3 — Select participants (slide 33)
- **Số lượng:** 5–7 người (tối thiểu 5 theo HCI, 5–12 là đủ phát hiện 80% lỗi).
- **Tiêu chí:** đã/đang làm nhóm 3–5 người; ít nhất 3 trưởng nhóm + 2 thành viên (khớp persona); chưa từng dùng prototype này.
- **Tuyển:** từ lớp 23HTTT, nhóm chat survey cũ. Ghi demographics (năm học, role, công cụ quen dùng).

### B4 — Define data collection (How)
| Loại | Metric | Cách thu |
|---|---|---|
| Performance | Task completion rate (T1–T6), Time on task, Error count, Help requests | Quan sát + screen recording (mouse/keyboard) |
| Self-reported | SUS 10 câu (Likert 1–5), phỏng vấn ngắn 3 câu sau test | Questionnaire giấy/Google Form |
| Qualitative | Think-aloud utterances, confusion points | Note-taker ghi + ghi âm (xin phép) |

Vai trò WoZ nếu dùng: Facilitator (dẫn), Computer (đổi prototype nếu test giấy), Note-taker.

### B5 — Conduct test
- Lab yên tĩnh, 1 người/lượt, ~25–30 phút/người.
- Kịch bản: chào → ký consent → pre-questionnaire (2 phút) → làm T1–T6 think-aloud (15p) → SUS + interview (5p) → cảm ơn.
- Không hỗ trợ khi user bí, chỉ ghi lỗi.

### B6 — Analyze results
- Tính: completion rate = số người đúng / tổng; mean time + SD; error rate; SUS = (sum odd-1 + 5-even)*2.5.
- Định lượng thêm: t-test 1 mẫu so ngưỡng 5 phút (ví dụ slide 45: `t.test(time, mu=300)`), chi-squared nếu so tỉ lệ thích/không thích giữa 2 version.
- Định tính: gom utterances thành 3–5 vấn đề chính (vd: "không hiểu badge Low").

### B7 — Identify problems & improve
- Mỗi vấn đề ghi: mô tả → bằng chứng (ví dụ: 3/5 người nhầm badge) → mức nghiêm trọng (High/Mid/Low) → đề xuất sửa → re-evaluation question (vd: "Sau khi thêm tooltip, người dùng có hiểu score không?").

## 6. Timeline gợi ý

| Tuần | Việc | Owner |
|---|---|---|
| Tuần 1 | Chốt RQs + tasks T1–T6 + tuyển 5–7 người | Cả nhóm |
| Tuần 1–2 | Chuẩn bị script, SUS form, phòng lab | 1 người |
| Tuần 2 | Chạy 5–7 phiên, ghi chép + quay màn hình | 2 người (facilitator + note-taker) |
| Tuần 2–3 | Phân tích số liệu, t-test/SUS, tổng hợp issues | 1 người |
| Tuần 3 | Viết `report.md` + cập nhật báo cáo/slide + tạo issue cải tiến | Cả nhóm |

## 7. Tiêu chí chất lượng (Rubric 10%)

Để đạt **1.0 (10/10)** phải có **đầy đủ 7 thành phần** trên — thiếu 1 → 0.75, thiếu nửa → 0.5, chỉ 1–2 → 0.25. Checklist:

- [ ] Đủ 7 bước Goals→Tasks→Participants→Data→Conduct→Analyze→Improve
- [ ] ≥5 participants đúng target, ghi demographics
- [ ] Tasks định nghĩa trước, đo được (rate/time/error)
- [ ] Có cả performance + self-reported (SUS) + qualitative
- [ ] Phân tích có số liệu + test thống kê đơn giản (t-test/chi-squared nếu so sánh)
- [ ] Liệt kê vấn đề + đề xuất + câu hỏi re-evaluation

## 8. Rủi ro & cách xử lý

| Rủi ro | Cách xử lý |
|---|---|
| Không đủ 5 người | Mở rộng sang lớp khác, giảm xuống 5 tối thiểu, ghi rõ giới hạn mẫu |
| Người dùng ngại think-aloud | Cho ví dụ 30s, nhắc "hãy nói suy nghĩ" nhẹ nhàng |
| Prototype lỗi giữa test | Chuẩn bị bản build ổn định, có backup `wireframe/index.html` |
| Số liệu không đạt ngưỡng SUS 68 | Ghi nhận trung thực, không làm tròn, đề xuất cải tiến thay vì giấu |

## 9. Liên kết tới các phần khác

- Kết quả đổ vào `report/src/main.md` **Chương 10. Đánh giá** và `slides/src/slides.md` slide 10.
- Issues cải tiến tạo ticket cho `prototype/` và `code/` (Supabase phase).
