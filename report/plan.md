# Plan — Report Module (Task Assignment System)

## Goal
Tổng hợp toàn bộ nội dung đồ án HCI từ các module (`persona`, `value_proposition`, `scenario_1`, `scenario_2`, `storyboard`, `wireframe`, `prototype`, `code`), kết hợp đọc tài liệu tham khảo trong `report/data/assets/` (như `G8_Report.docx`) và toàn bộ file kiến thức trong `knowledge/`, phân tích tư duy và xây dựng file `report.json` chuẩn cấu trúc (`templates/report_schema.json`), dừng lại chờ lệnh trước khi tạo file Word.

## Workflow (Atomic Steps)
1. **Understand:** Đọc toàn bộ tài liệu kiến thức `knowledge/`, tài liệu tham khảo trong `report/data/assets/G8_Report.docx`, và dữ liệu từ tất cả các module trong project.
2. **Plan:** Xây dựng TOC chuẩn 9 chương (`Guide4Project`) và thiết lập `report_schema.json`.
3. **Implement:** 
   - Cập nhật `plan.md`, `skill.md`, `changelog.md`, `messages.md`.
   - Xây dựng `templates/report_schema.json`.
   - Biên soạn `report/data/output/report.json` phản ánh đầy đủ tư duy thiết kế HCI, kết quả nghiên cứu người dùng, wireframe, prototype và đánh giá khả dụng.
   - Dừng lại chờ yêu cầu tiếp theo từ người dùng.
4. **Verify:** Kiểm tra tính hợp lệ của `report.json` so với `report_schema.json`.
5. **Confirm & Log:** Cập nhật `changelog.md` và `messages.md`.

## Verification Strategy
- Kiểm tra `report.json` validate thành công với `templates/report_schema.json`.
- Xác nhận các tệp nhật ký `changelog.md`, `messages.md` đầy đủ theo chuẩn dự án.
