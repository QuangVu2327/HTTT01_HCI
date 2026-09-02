# Plan - scenario_1 (As-Is Scenario)

## Goal
- Xây dựng kịch bản hiện tại (As-Is Scenario) mô tả chi tiết từng bước hành động thực tế của người dùng hiện tại (chưa có hệ thống mới), làm nổi bật các nỗi đau (pain points).
- Sử dụng quy trình chuẩn: Dữ liệu thô (`scenario_asis.md`) -> JSON cấu trúc chuẩn (`scenario_asis.json`) -> Tool render HTML (`scenario_json.js`) -> Tool render PNG (`scenario_png.js`).

## Workflow (Atomic Steps)
1. **Understand:** Phân tích dữ liệu từ Persona (`persona/final_persona/data/raw/all_personas.json`) và file mô tả `scenario_asis.md`.
2. **Plan:** Thiết kế tệp JSON chi tiết từng bước hành động tuần tự có liên kết (`scenario_asis.json`) tuân thủ `templates/scenario.schema.json`.
3. **Implement (JSON):** Tạo file JSON chuẩn tại `scenario_1/data/raw/scenario_asis.json`.
4. **Tool Execution (HTML & PNG):** Khi có yêu cầu từ user, gọi bộ công cụ tại `.opencode/tools/scenario_renderer/`:
   - Chạy `node .opencode/tools/scenario_renderer/scenario_json.js scenario_1/data/raw/scenario_asis.json`
   - Chạy `node .opencode/tools/scenario_renderer/scenario_png.js scenario_1/data/output/scenario_asis.html`
5. **Confirm & Log:** Kiểm tra kết quả trong `data/output/`, cập nhật `changelog.md` và `messages.md`.

## Verification Strategy
- Schema Validation: Đảm bảo JSON vượt qua `ajv` validation với `scenario.schema.json`.
- Visual Check: Đảm bảo file HTML và PNG render đầy đủ các bước hành động có mũi tên liên kết.
