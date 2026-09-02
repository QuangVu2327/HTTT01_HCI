# Kỹ năng: Tạo Persona từ dữ liệu khảo sát

Hướng dẫn tái sử dụng để xây persona cho đề tài HCI dựa trên dữ liệu khảo sát/phỏng vấn thực tế. Bổ trợ cho `persona_making_plan.md` (kế hoạch) — file này là "cách làm" chi tiết.

## Khi nào dùng

- Khi cần xây persona từ số liệu khảo sát (persona **data-driven**).
- Khi cần kiểm chứng persona thiết kế sẵn (`personas.md`) bằng dữ liệu thực.
- Khi cần ghi/tổng hợp phiếu trả lời chuẩn cho báo cáo HCI.

## Quy trình chi tiết

### Bước 1 — Chuẩn bị công cụ thu thập
- Chạy `google_form.gs` trong Apps Script → nhận link form + bảng kết quả (xem `AGENTS.md`/comment trong file nếu cần).
- Soạn câu hỏi phỏng vấn sâu (5 end-users/vai trò) theo các khối: khởi động → vai trò cụ thể → đánh giá ý tưởng → khép mở.

### Bước 2 — Thu thập dữ liệu
- Gửi link form tới đối tượng mục tiêu; ưu tiên **đa dạng vai trò**: trưởng nhóm, thành viên, giảng viên.
- Tối thiểu **5 phiếu mỗi vai trò** (yêu cầu môn học).
- Ghi chú thời gian thu, kênh gửi (để trích trong báo cáo).

### Bước 3 — Ghi phiếu (dùng template bên dưới)
- Nếu dữ liệu có sẵn dưới dạng **CSV export từ Google Sheets** (file `*.csv` trong dự án): đọc thẳng CSV, không gõ lại phiếu (xem mục "Dữ liệu từ CSV" bên dưới).
- Mỗi phiếu = 1 block, mã hóa **N1, N2, N3…**.
- Ghi theo đúng số câu hỏi 1–17 của `survey.md`.
- **Luôn đánh dấu `(MẪU)`** nếu là phiếu ví dụ — không bao giờ trộn với dữ liệu thật.

### Nguồn dữ liệu CSV (export Google Sheets)
- Cột đầu = `Timestamp` (bỏ qua); các cột còn lại tương ứng câu 1–17 theo `survey.md`. Dữ liệu CSV là **thật** → gắn nhãn `(THẬT)`.
- Multi-select (câu 5, 8, 15): tách giá trị theo dấu phẩy (", ") trước khi đếm tần suất.
- Thang điểm (7: 1–10; 11–13: 1–5): dùng giá trị số → tính trung bình.
- CSV **không có cột "Vai trò"**: gợi ý từ câu 1 (`Người đi làm` ≈ giảng viên; `Sinh viên` = trưởng nhóm hoặc thành viên). Hỏi người dùng cách tách hoặc gộp chung và ghi rõ giới hạn mẫu — không tự bịa vai trò.
- Chép bản chuẩn hóa/ghi chú nguồn vào `survey_answers.md` rồi tiếp tục Bước 4.

### Bước 4 — Tổng hợp số liệu
- Câu nhiều lựa chọn (5, 8, 15): **đếm tần suất** từng lựa chọn, chọn mode.
- Câu thang điểm (7: 1–10; 11–13: 1–5): **tính trung bình**.
- Câu 1 lựa chọn: ghi **mode** (lựa chọn xuất hiện nhiều nhất).
- Viết 2–3 dòng tóm tắt: "đa số dùng…, gặp nhiều nhất là…, điểm hữu ích trung bình…".

### Bước 5 — Xây persona data-driven
- Chọn **modal respondent** = tập hợp các câu trả lời phổ biến nhất làm "người trả lời tiêu biểu".
- Điền khung persona (template dưới) — **mỗi mục kèm dẫn chứng số liệu**.
- Đối chiếu với `personas.md`: persona dữ liệu khớp/lệch gì so với persona thiết kế.

### Bước 6 — Kiểm chứng & trình bày
- Rà checklist bên dưới.
- Đưa kết quả vào phần Đánh giá báo cáo ("Phản hồi từ 5 end-users").

## Templates

### Khung ghi phiếu trả lời

```markdown
### Phiếu N1 — (MẪU) / (THẬT)
- **Vai trò:** Trưởng nhóm
- **1.** Sinh viên
- **2.** Năm 3
- **3.** 3–4 lần
- ...
- **17.** [câu mở]
```

### Khung persona data-driven

```markdown
## [Tên đại diện]
| Mục | Nội dung (kèm dẫn chứng số liệu) |
|---|---|
| Hồ sơ | ... |
| Mục tiêu | ... |
| Khó khăn | ... |
| Tình huống sử dụng | ... |
| Trích dẫn | ... |
| Độ thạo công nghệ | ... |
```

## Lỗi thường gặp

- **Nhầm phiếu MẪU với phiếu thật** → luôn gắn nhãn `(MẪU)`.
- **Persona quá chung chung** → mỗi mục phải trỏ tới số liệu (mode/trung bình).
- **Không đủ 5 end-users/vai trò** → ghi rõ giới hạn mẫu thay vì ngụy tạo số liệu.
- **Bỏ qua đối chiếu `personas.md`** → luôn so sánh persona thiết kế vs persona dữ liệu.

## Checklist cuối

- [ ] Đủ ≥5 phiếu/vai trò (hoặc ghi rõ giới hạn).
- [ ] Phiếu MẪU được dán nhãn rõ ràng; dữ liệu từ CSV gắn nhãn (THẬT).
- [ ] CSV: đã bỏ cột Timestamp, tách multi-select, không tự bịa vai trò.
- [ ] Mode/trung bình được tính đúng cho từng loại câu.
- [ ] Persona data-driven có dẫn chứng số liệu ở mọi mục.
- [ ] Đã đối chiếu với `personas.md` và ghi chú khớp/lệch.
- [ ] Kết quả sẵn sàng trích vào phần Đánh giá báo cáo.
