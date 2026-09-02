# Nhật ký Thay đổi - Gốc (Root Changelog)

> Mỗi thay đổi liên quan đến cấu trúc dự án, quy định chung (`AGENTS.md`) và điều phối tổng thể đều được ghi lại tại đây.

## [2026-09-02] - VP Canvas Generated
- Generated VP Canvas JSONs derived directly from Persona data (Student Leader, Team Member, Instructor).
- Executed rendering pipeline to create final HTML/PNG assets for VP Canvas module.

## [2026-09-02] - Pipeline Established for Persona & Value Proposition
- Setup structured modules: `persona/survey`, `persona/final_persona`, and `value_proposition`.
- Created automated rendering tools in `.opencode/tools/persona_renderer` and `.opencode/tools/value_renderer`.
- Implemented automated pipeline (JSON -> HTML -> PNG) using Puppeteer, EJS, and Ajv.
- Updated documentation (`plan.md`, `skill.md`) for all modules to mandate tool-based execution.

## [2026-09-01] - Chuẩn hóa Bố cục Thư mục Dự án & Quản lý Assets
### Thay đổi cấu trúc & Quy định
- Cập nhật định nghĩa cấu trúc module trong `AGENTS.md` và `templates/folder.md`.
- Quy định rõ: Mỗi tệp sinh ra (HTML, CSS, Images) phải được lưu trong `data/output/`.
- Cập nhật `templates/persona.md`: Bổ sung `Touchpoints`, `Data Evidence` (dẫn chứng số liệu) và bảng `Validation` để đối chiếu Persona dữ liệu vs thiết kế.
- Đã thực hiện sao lưu (backup) trước khi sửa đổi theo đúng quy định.
