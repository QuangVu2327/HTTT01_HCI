# Skill: Persona Card Generation (Mandatory)

## Quy tắc bắt buộc
- **TUYỆT ĐỐI KHÔNG** tạo HTML hoặc ảnh PNG thủ công bằng cách code/edit.
- **BẮT BUỘC** phải sử dụng bộ công cụ tại `.opencode/tools/persona_renderer/` theo trình tự sau:
  1. `persona_json` để tạo HTML.
  2. `persona_png` để tạo ảnh từ HTML.
- Mọi kết quả đầu ra (HTML, PNG) phải được tool tự động sinh ra trong `persona/final_persona/data/output/`.

## Các bước thực hiện
1. Kiểm tra JSON tại `persona/final_persona/data/raw/`.
2. Chạy tool JSON:
   `node .opencode/tools/persona_renderer/persona_json.js persona/final_persona/data/raw/[tên_file].json`
3. Chạy tool PNG:
   `node .opencode/tools/persona_renderer/persona_png.js persona/final_persona/data/output/[tên_file].html`
4. Kiểm tra kết quả trong thư mục `output/`.
