# Skill: Value Proposition Canvas Generation (Mandatory & Data-Driven)

## Quy tắc bắt buộc
- **TUYỆT ĐỐI KHÔNG** tự suy diễn dữ liệu. Mọi thông tin (Jobs, Pains, Gains) **PHẢI** được trích xuất trực tiếp từ tệp JSON tương ứng trong `persona/final_persona/data/raw/`.
- **TUYỆT ĐỐI KHÔNG** tạo HTML hoặc ảnh PNG thủ công.
- **BẮT BUỘC** phải sử dụng bộ công cụ tại `.opencode/tools/value_renderer/` theo trình tự sau:
  1. `vp_json` để tạo HTML.
  2. `vp_png` để tạo ảnh từ HTML.
- Mọi kết quả đầu ra (HTML, PNG) phải được tool tự động sinh ra trong `value_proposition/data/output/`.

## Các bước thực hiện
1. Đọc dữ liệu từ `persona/final_persona/data/raw/[persona].json`.
2. Trích xuất `tasks` -> `jobs`, `painPoints` -> `pains`, `goals` + `wishes` -> `gains`.
3. Tạo file JSON tại `value_proposition/data/raw/` theo schema `templates/vp.schema.json`.
4. Chạy tool JSON:
   `node .opencode/tools/value_renderer/vp_json.js value_proposition/data/raw/[tên_file].json`
5. Chạy tool PNG:
   `node .opencode/tools/value_renderer/vp_png.js value_proposition/data/output/[tên_file].html`
