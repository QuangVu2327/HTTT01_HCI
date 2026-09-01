# Kế hoạch tạo Persona — Công cụ hỗ trợ lập kế hoạch và phân công việc nhóm

## 1. Mục tiêu

- Xây dựng persona đại diện cho người dùng của web tool (phân công việc nhóm tự động theo kỹ năng).
- Dựa trên dữ liệu **khảo sát + phỏng vấn thực tế** từ end-users, không chỉ phỏng đoán.
- Cung cấp nguồn dữ liệu cho các phần trong báo cáo HCI: Personas, Đánh giá, "Phản hồi từ 5 end-users".

## 2. Đầu vào (nguồn)

| Tài liệu | Vai trò |
|---|---|
| `survey.md` | Bộ câu hỏi khảo sát (17 câu, 5 phần) |
| `google_form.gs` | Script tạo Google Form + bảng kết quả |
| Câu hỏi phỏng vấn sâu | Bổ sung định tính cho 5 end-users |
| `personas.md` | 3 personas thiết kế sẵn theo vai trò (trưởng nhóm / thành viên / giảng viên) |

## 3. Sản phẩm đầu ra

- `survey_answers.md` — bảng ghi phiếu trả lời + phần tổng hợp.
- `survey_persona.md` — persona **data-driven** được dựng từ số liệu tổng hợp.
- Đối chiếu cập nhật `personas.md` (persona thiết kế so với persona dữ liệu).
- Phần "Phản hồi từ 5 end-users" trong báo cáo.

## 4. Quy trình 5 bước (Cập nhật chi tiết)

1.  **Thiết kế công cụ thu thập & xác định Persona Elements:**
    *   Chạy `google_form.gs` để tạo form (lấy link chia sẻ); chuẩn bị câu hỏi phỏng vấn sâu.
    *   Tham khảo `skill.md` để xác định rõ **các yếu tố Persona cần thu thập**: Name, Demographics, Goals, Tasks, Pains, Wishes, Touchpoints, Tags, Quotes. Đảm bảo các câu hỏi khảo sát/phỏng vấn bao quát được các yếu tố này.
2.  **Thu thập dữ liệu:**
    *   Tối thiểu **5 end-users mỗi vai trò** (trưởng nhóm, thành viên, giảng viên).
    *   Gửi link form qua nhóm chat/lớp; ghi chú thời gian thu, kênh gửi.
3.  **Ghi phiếu & Tổng hợp số liệu:**
    *   Nếu có file CSV export: đọc thẳng CSV (xem hướng dẫn trong `skill.md`), chuẩn hóa dữ liệu (tách multi-select, tính trung bình/mode), ghi chú vào `survey_answers.md`.
    *   Nếu không có CSV: ghi phiếu thủ công theo template, **luôn đánh dấu `(MẪU)`** cho phiếu ví dụ.
    *   Tính toán mode/trung bình cho các câu hỏi theo từng vai trò, ghi vào `survey_answers.md` kèm tóm tắt.
4.  **Xây dựng Persona Data-Driven:**
    *   Chọn modal respondent (người trả lời tiêu biểu nhất).
    *   Điền đầy đủ các yếu tố Persona (Name, Demographics, Goals, Tasks, Pains, Wishes, Touchpoints, Tags, Quotes) vào khung trong `skill.md`, **mỗi mục đều phải có dẫn chứng số liệu** từ tổng hợp.
5.  **Kiểm chứng & Trình bày:**
    *   Đối chiếu Persona data-driven với `personas.md` (ghi rõ khớp/lệch).
    *   Rà soát theo checklist chất lượng và đưa kết quả vào báo cáo.

## 5. Tiêu chí chất lượng (Acceptance Criteria)

- Mỗi Persona data-driven có đầy đủ các yếu tố (Name, Demographics, Goals, Tasks, Pains, Wishes, Touchpoints, Tags, Quotes), mỗi yếu tố đều có **dẫn chứng số liệu** (mode/trung bình) từ phiếu.
- Phân biệt rõ phiếu **MẪU** và phiếu **thật** (hoặc dữ liệu từ CSV).
- Đủ tối thiểu **5 end-users mỗi vai trò** (hoặc ghi rõ giới hạn mẫu).
- Nội dung Persona có thể trích trực tiếp vào phần Đánh giá báo cáo.

## 6. Phân công & Timeline gợi ý

| Bước | Người phụ trách | Dự kiến hoàn thành | Sản phẩm |
|---|---|---|---|
| 1. Thiết kế công cụ & Persona Elements | Cả nhóm | Tuần 1 | Link Google Form; Bản ghi chú Persona Elements chi tiết |
| 2. Thu thập | Mỗi thành viên gửi cho ~5 người | Tuần 2–3 | Phiếu trả lời |
| 3. Ghi phiếu & Tổng hợp | 1–2 thành viên | Tuần 3 | `survey_answers.md` |
| 4. Xây dựng Persona Data-Driven | Cả nhóm | Tuần 4 | `survey_persona.md` + đối chiếu `personas.md` |
| 5. Kiểm chứng & Viết báo cáo | Cả nhóm | Tuần 5 | Phần Đánh giá trong báo cáo |

## 7. Rủi ro & Cách xử lý

| Rủi ro | Cách xử lý |
|---|---|
| Không đủ phiếu (ít người trả lời) | Gửi lại qua nhiều kênh, gia hạn, tăng đối tượng mời |
| Mẫu lệch (chỉ có sinh viên, thiếu giảng viên) | Chủ động mời trưởng nhóm/giảng viên cụ thể |
| Số liệu chưa đạt 5/role trước hạn | Ghi rõ giới hạn mẫu trong báo cáo thay vì bỏ qua |
| Nhầm phiếu MẪU với phiếu thật | Luôn đánh dấu `(MẪU)` trên các phiếu ví dụ |
| Persona thiếu các yếu tố hoặc dẫn chứng số liệu | Rà soát lại checklist, bổ sung thông tin từ `skill.md` |
