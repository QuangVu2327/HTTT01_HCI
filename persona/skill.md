# Kỹ năng: Tạo Persona từ dữ liệu khảo sát

Hướng dẫn tái sử dụng để xây persona cho đề tài HCI dựa trên dữ liệu khảo sát/phỏng vấn thực tế. Bổ trợ cho `persona_making_plan.md` (kế hoạch) — file này là "cách làm" chi tiết.

## When to use this skill
- Khi cần xây persona từ số liệu khảo sát (persona **data-driven**).
- Khi cần kiểm chứng persona thiết kế sẵn (`personas.md`) bằng dữ liệu thực.
- Khi cần ghi/tổng hợp phiếu trả lời chuẩn cho báo cáo HCI.

## Required Inputs
- `survey.md` (Bộ câu hỏi khảo sát).
- `survey_answers.csv` (Kết quả thô xuất từ Google Sheets).
- Kết quả phỏng vấn định tính (định dạng Markdown).
- Persona thiết kế sẵn (`personas.md`).

## Output
- `survey_answers.md`: Bảng tổng hợp phiếu trả lời.
- `survey_persona.md`: Persona data-driven hoàn chỉnh.
- Đối chiếu Persona data-driven vs `personas.md`.

## Workflow
1. **Chuẩn bị:** Chạy `google_form.gs`, soạn câu hỏi phỏng vấn sâu.
2. **Thu thập:** Gửi form, thu ≥5 phiếu/vai trò.
3. **Ghi phiếu:** Chuyển CSV/phiếu thành định dạng Markdown, đánh dấu `(MẪU)` / `(THẬT)`.
4. **Tổng hợp:** Đếm tần suất (mode) câu hỏi trắc nghiệm, tính trung bình thang điểm.
5. **Xây Persona:** Chọn modal respondent, điền mẫu Persona data-driven.
6. **Kiểm chứng:** Đối chiếu với `personas.md`, ghi rõ khớp/lệch.

## Knowledge & Reasoning
- Một persona đại diện cho nhóm người dùng, không phải cá nhân.
- Dữ liệu định lượng (mode/trung bình) giúp persona có căn cứ khoa học.
- Việc đối chiếu với persona thiết kế giúp xác định khoảng cách giữa giả thuyết (design) và thực tế (data).

## Validation Rules
- **Nhầm phiếu MẪU với phiếu thật** → luôn gắn nhãn `(MẪU)`.
- **Persona quá chung chung** → mỗi mục phải trỏ tới số liệu (mode/trung bình).
- **Không đủ 5 end-users/vai trò** → ghi rõ giới hạn mẫu thay vì ngụy tạo số liệu.
- **Bỏ qua đối chiếu `personas.md`** → luôn so sánh persona thiết kế vs persona dữ liệu.
- Checklist cuối:
  - [ ] Đủ ≥5 phiếu/vai trò (hoặc ghi rõ giới hạn).
  - [ ] Phiếu MẪU được dán nhãn rõ ràng; dữ liệu từ CSV gắn nhãn (THẬT).
  - [ ] CSV: đã bỏ cột Timestamp, tách multi-select, không tự bịa vai trò.
  - [ ] Mode/trung bình được tính đúng cho từng loại câu.
  - [ ] Persona data-driven có dẫn chứng số liệu ở mọi mục.
  - [ ] Đã đối chiếu với `personas.md` và ghi chú khớp/lệch.
  - [ ] Kết quả sẵn sàng trích vào phần Đánh giá báo cáo.

## Templates

### Khung ghi phiếu trả lời
...

