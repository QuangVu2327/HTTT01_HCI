# Plan - Storyboard Module

## Goal
- Xây dựng storyboard (phân cảnh trực quan trải nghiệm người dùng) dựa trên kịch bản (Scenario 2 - To-Be) và nguyên lý kể chuyện Pixar (Lecture 7 - Storyboard).
- Chuyển đổi dữ liệu JSON cấu trúc storyboard thành tài liệu trực quan (HTML & PNG) thông qua bộ công cụ chuẩn hóa `.opencode/tools/storyboard_renderer/`.

## Workflow (Atomic Steps)
1. **Understand:** Phân tích bối cảnh, nhân vật và kịch bản To-Be để định hình cốt truyện 6 khung hình (panels).
2. **Plan:** Thiết kế tệp JSON cấu trúc storyboard (`storyboard.json`) tuân thủ `templates/storyboard.schema.json`.
3. **Implement (JSON):** Tạo file JSON chuẩn tại `storyboard/data/raw/storyboard.json`.
4. **Tool Execution (HTML & PNG):** Gọi bộ công cụ tại `.opencode/tools/storyboard_renderer/`:
   - Chạy `node .opencode/tools/storyboard_renderer/storyboard_json.js storyboard/data/raw/storyboard.json`
   - Chạy `node .opencode/tools/storyboard_renderer/storyboard_png.js storyboard/data/output/storyboard.html`
5. **Confirm & Log:** Kiểm tra kết quả trong `data/output/`, cập nhật `changelog.md` và `messages.md`.

## Verification Strategy
- Schema Validation: Đảm bảo JSON vượt qua `ajv` validation với `storyboard.schema.json`.
- Visual Check: Đảm bảo file HTML và PNG hiển thị đầy đủ 6 panels dạng truyện tranh, truyền tải rõ ràng context, cảm xúc và giá trị (Value Proposition).
