# Kế hoạch phát triển Persona Cards (Final)

## 1. Mục tiêu
- Tạo bộ Persona Cards (HTML/PNG) chuẩn HCI từ dữ liệu JSON đã validate.
- Đảm bảo tính nhất quán, chuyên nghiệp theo phong cách thiết kế của dự án.

## 2. Các bước thực hiện (Atomic Steps)
1. **Validate dữ liệu**: Kiểm tra tính toàn vẹn của JSON so với `templates/persona.schema.json`.
2. **Render**: Gọi các công cụ tại `.opencode/tools/persona_renderer/` (`persona_json.js`, `persona_png.js`) để tạo HTML và PNG.
3. **Kiểm chứng**: Rà soát kết quả đầu ra (độ phân giải, bố cục, thông tin 9 lớp).
4. **Lưu trữ**: Đảm bảo tệp đầu ra nằm đúng tại `persona/final_persona/data/output/`.

## 3. Tiêu chí chất lượng (Acceptance Criteria)
- Ảnh PNG không bị cắt, đầy đủ nội dung.
- Dữ liệu JSON phải vượt qua bước validation của `ajv`.
- Style CSS tuân thủ bảng màu và Font chữ quy định trong `AGENTS.md`.

## 4. Rủi ro & Cách xử lý
- **Lỗi render PNG**: Kiểm tra lại `min-height` trong CSS và `waitUntil` trong Puppeteer.
- **Dữ liệu JSON sai format**: Agent phải yêu cầu xác nhận từ user trước khi thực hiện fix dữ liệu thủ công.
