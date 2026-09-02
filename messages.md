# Nhật ký tương tác tổng hợp

- Số lần tương tác tính đến [2026-09-02]: ~30 lần.
- Nội dung: 
  1. Kiểm tra Persona (dữ liệu vs thiết kế).
  2. Xây dựng quy trình tự động hóa Persona Cards (JSON -> HTML -> PNG).
  3. Xây dựng quy trình tự động hóa Value Proposition Canvas (JSON -> HTML -> PNG).
  4. Cấu trúc lại module `persona` (survey/final_persona).
  5. Củng cố pipeline Value Proposition thành quy trình hợp nhất (1 file JSON duy nhất).
  6. Xây dựng plan.md và skill.md cho `scenario_1` (As-Is) và `scenario_2` (To-Be) theo chuẩn HCI Lecture 6 và AGENTS.md.
  7. Thiết lập `templates/scenario.schema.json`, `templates/scenario.template.html` và bộ công cụ `.opencode/tools/scenario_renderer/` (`scenario_json.js`, `scenario_png.js`).
  8. Thực thi render thành công `scenario_asis` và `scenario_tobe` ra các tệp HTML và PNG hoàn chỉnh.
  9. Thiết lập module `storyboard/` với `templates/storyboard.schema.json`, `templates/storyboard.template.html` và `.opencode/tools/storyboard_renderer/` (`storyboard_json.js`, `storyboard_png.js`).
  10. Thực thi tạo tệp `storyboard.json` dựa trên kỹ thuật kể chuyện Pixar và render thành công ra các tệp `storyboard.html` và `storyboard.png` hoàn chỉnh.
  11. Cải tiến tool `storyboard_png.js` sử dụng giao thức `file://` để tải chính xác các ảnh từ thư mục `assets/` vào `storyboard.png`.
  12. Khởi tạo tệp `changelog.md` và `messages.md` trong thư mục `code/` để theo dõi kiến trúc backend, database schema và Edge Functions theo đúng quy chuẩn dự án.
  13. Cập nhật Changelog/Messages theo quy định dự án.
