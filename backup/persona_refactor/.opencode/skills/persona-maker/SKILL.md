---
name: persona-maker
description: Use when building HCI user personas from survey/interview data, recording or summarizing survey answers, or constructing data-driven personas from real responses. Trigger keywords: persona, persona data-driven, survey answers, phiếu khảo sát, kết quả khảo sát, end-users, survey_persona, survey_answers, csv. Works with the files survey.md, personas.md, google_form.gs, persona_making_plan.md, persona_making_skill.md, .csv (survey CSV export) in the HCI project folder.
---

# Người tạo Persona (data-driven)

Hướng dẫn tạo persona cho đề tài "Công cụ hỗ trợ lập kế hoạch và phân công việc nhóm" dựa trên dữ liệu khảo sát/phỏng vấn thực tế. Đọc trước `persona_making_plan.md` (kế hoạch) và `persona_making_skill.md` (cách làm chi tiết), dùng `survey.md` làm bộ câu hỏi chuẩn.

## Quy trình

1. **Chuẩn bị**: nếu form chưa có, báo người dùng chạy `google_form.gs` trong Apps Script để lấy link form + bảng kết quả.
2. **Thu thập**: đối tượng = trưởng nhóm, thành viên, giảng viên; mục tiêu ≥5 phiếu/vai trò.
3. **Ghi phiếu**: nếu có file CSV export từ bảng kết quả Google Forms (ví dụ `.csv` trong dự án) thì **đọc thẳng từ CSV** (xem mục "Đọc dữ liệu từ CSV") thay vì gõ phiếu thủ công. Nếu không có CSV, ghi/điền `survey_answers.md`: mỗi phiếu = 1 block mã N1, N2… theo số câu 1–17 của `survey.md`. **Bắt buộc gắn nhãn `(MẪU)`** cho phiếu ví dụ; không trộn với dữ liệu thật.
4. **Tổng hợp**: câu nhiều lựa chọn → đếm tần suất (mode); câu thang 1–10/1–5 → trung bình; câu 1 lựa chọn → mode. Ghi 2–3 dòng tóm tắt.
5. **Dựng persona**: tạo/điền `survey_persona.md`, chọn modal respondent từ tổng hợp; mỗi mục của persona **phải có dẫn chứng số liệu**.
6. **Đối chiếu**: so sánh với `personas.md`, ghi rõ điểm khớp/lệch.
7. **Kiểm tra**: rà checklist ở `persona_making_skill.md`; sẵn sàng trích vào phần Đánh giá báo cáo.

## Nguyên tắc

- Không bao giờ trình bày phiếu MẪU như dữ liệu thật.
- Không bịa số liệu; nếu chưa đủ 5 phiếu/vai trò thì ghi rõ giới hạn mẫu.
- Persona thiếu dẫn chứng số liệu = chưa hoàn thành.

## Đọc dữ liệu từ CSV (export Google Sheets)

Khi bảng kết quả được tải về dưới dạng CSV (file `*.csv` trong dự án), đọc trực tiếp file này thay vì gõ lại phiếu:

- Cột đầu tiên là `Timestamp` → **bỏ qua**. Các cột còn lại lần lượt là câu **1–17** theo đúng thứ tự `survey.md`; dữ liệu trong CSV là **dữ liệu thật** → các phiếu trích xuất gắn nhãn `(THẬT)`.
- Câu trắc nghiệm nhiều lựa chọn (5, 8, 15): một ô có thể chứa nhiều giá trị phân tách bằng dấu phẩy (", ") → **tách rời từng lựa chọn trước khi đếm tần suất**.
- Câu thang điểm (7: 1–10; 11–13: 1–5): lấy giá trị số → tính **trung bình**.
- **Vai trò không có trong CSV**: không có cột "Vai trò". Dùng câu 1 (`Bạn đang là?`) để gợi ý — `Người đi làm` ≈ giảng viên; `Sinh viên` có thể là trưởng nhóm hoặc thành viên → **hỏi người dùng** cách tách nhóm, hoặc gộp chung và ghi rõ giới hạn mẫu. Không tự bịa vai trò.
- Lưu bản chuẩn hóa hoặc ghi chú nguồn vào `survey_answers.md`, rồi thực hiện tiếp các bước 4–7 (tổng hợp, dựng persona, đối chiếu, kiểm tra) như bình thường. CSV là dữ liệu thật: **không thêm/sửa giá trị** khi xử lý.

## File liên quan

- `survey.md` — bộ câu hỏi (17 câu, 5 phần).
- `*.csv` (vd `.csv`) — export bảng kết quả Google Forms; skill đọc trực tiếp file này.
- `survey_answers.md` — bảng phiếu + tổng hợp.
- `survey_persona.md` — persona data-driven.
- `personas.md` — 3 personas theo vai trò để đối chiếu.
- `google_form.gs` — script tạo Google Form.