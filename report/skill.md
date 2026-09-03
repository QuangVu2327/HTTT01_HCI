# Skill — Report Generation & Structuring

## Purpose
Kỹ năng tổng hợp và phân tích toàn diện đồ án HCI dựa trên kiến thức lý thuyết (`knowledge/`), tài liệu tham khảo mẫu (`report/data/assets/`), và dữ liệu thực tế từ các module trong đồ án để biên soạn thành tệp `report.json` chuẩn cấu trúc (`templates/report_schema.json`).

## When to use this skill
- Khi cần xây dựng báo cáo cuối kỳ của đồ án Task Assignment System bám sát Rubric chấm điểm và hướng dẫn `Guide4Project`.
- Khi cần kết hợp các tài liệu tham khảo và kiến thức HCI chuyên sâu vào cấu trúc JSON của báo cáo.

## Required Inputs
- Tài liệu tham khảo mẫu trong `report/data/assets/`.
- Toàn bộ tài liệu kiến thức trong thư mục `knowledge/`.
- Dữ liệu từ các module (`persona`, `value_proposition`, `scenario_1`, `scenario_2`, `storyboard`, `wireframe`, `prototype`, `code`).

## Output
- `report/data/output/report.json` hoàn chỉnh và hợp lệ theo schema.
- Cập nhật đầy đủ `changelog.md` và `messages.md`.

## Workflow
1. Đọc và phân tích các tệp tham khảo trong `report/data/assets/` và `knowledge/`.
2. Trích xuất các tiêu chí đánh giá Rubric (Persona 9 phần, Value Proposition, Scenario, Storyboard, Wireframe/Prototype, Evaluation, Software Product).
3. Biên soạn `report.json` với nội dung chi tiết, headings phân cấp và đường dẫn hình ảnh thực tế.
4. Dừng lại chờ yêu cầu của người dùng trước khi thực thi word renderer.

## Knowledge & Reasoning
- Áp dụng triệt để các nguyên lý HCI (Effectiveness, Efficiency, Learnability, Error Prevention).
- Xây dựng Design Rationale minh bạch từ kết quả nghiên cứu người dùng đến giải pháp thiết kế giao diện.

## Validation Rules
- `report.json` validate thành công với `templates/report_schema.json`.
- Mọi hình ảnh dẫn chiếu trong JSON phải tồn tại thực tế trong repo.
