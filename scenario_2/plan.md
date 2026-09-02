# Plan - scenario_2 (To-Be Scenario)

## Goal
- Xây dựng kịch bản tương lai (To-Be Scenario) mô tả chi tiết từng bước hành động khi người dùng tương tác với hệ thống mới, làm nổi bật các giải pháp (Pain Relievers, Gain Creators).
- Sử dụng quy trình chuẩn: Dữ liệu thô (`scenario_tobe.md`) -> JSON cấu trúc chuẩn (`scenario_tobe.json`) -> Tool render HTML (`scenario_json.js`) -> Tool render PNG (`scenario_png.js`).

## Workflow (Atomic Steps)
1. **Understand:** Phân tích Value Proposition Canvas và file mô tả `scenario_tobe.md`.
2. **Plan:** Thiết kế tệp JSON chi tiết từng bước hành động tuần tự có liên kết (`scenario_tobe.json`) tuân thủ `templates/scenario.schema.json`.
3. **Implement (JSON):** Tạo file JSON chuẩn tại `scenario_2/data/raw/scenario_tobe.json`.
4. **Tool Execution (HTML & PNG):** Khi có yêu cầu từ user, gọi bộ công cụ tại `.opencode/tools/scenario_renderer/`:
   - Chạy `node .opencode/tools/scenario_renderer/scenario_json.js scenario_2/data/raw/scenario_tobe.json`
   - Chạy `node .opencode/tools/scenario_renderer/scenario_png.js scenario_2/data/output/scenario_tobe.html`
5. **Confirm & Log:** Kiểm tra kết quả trong `data/output/`, cập nhật `changelog.md` và `messages.md`.

## Verification Strategy
- Schema Validation: Đảm bảo JSON vượt qua `ajv` validation với `scenario.schema.json`.
- Visual Check: Đảm bảo file HTML và PNG render đầy đủ các bước hành động giải quyết triệt để nỗi đau.
