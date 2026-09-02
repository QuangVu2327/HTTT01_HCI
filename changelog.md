# Nhật ký Thay đổi - Gốc (Root Changelog)

> Mỗi thay đổi liên quan đến cấu trúc dự án, quy định chung (`AGENTS.md`) và điều phối tổng thể đều được ghi lại tại đây.

## [2026-09-02] - Storyboard Rendered Successfully
- Created structured storyboard JSON (`storyboard.json`) following Pixar's storytelling technique and executed `storyboard_renderer` tools to produce HTML and PNG assets.

## [2026-09-02] - Storyboard Module & Renderer Established
- Created `templates/storyboard.schema.json` and `templates/storyboard.template.html`.
- Created `.opencode/tools/storyboard_renderer/` (`storyboard_json.js`, `storyboard_png.js`).
- Initialized `storyboard/` module with `plan.md`, `skill.md`, `changelog.md`, and `messages.md` following HCI Lecture 7 (Storyboard & Pixar storytelling).

## [2026-09-02] - As-Is & To-Be Scenarios Rendered Successfully
- Generated structured JSON (`scenario_asis.json`, `scenario_tobe.json`) and executed `scenario_renderer` tools to produce HTML and PNG assets for both `scenario_1` and `scenario_2`.

## [2026-09-02] - Scenario Renderer Tools & Templates Established
- Created `templates/scenario.schema.json` and `templates/scenario.template.html` for structured step-by-step scenario rendering.
- Created `.opencode/tools/scenario_renderer/` containing `scenario_json.js` (validation + HTML render) and `scenario_png.js` (Puppeteer snapshot).
- Standardized the scenario pipeline so JSON input directly maps sequential steps with visual arrows/flow.

## [2026-09-02] - Scenario Modules Initialized (As-Is & To-Be)
- Created comprehensive `plan.md` and `skill.md` for `scenario_1` (As-Is Scenario) based on Persona and unsolved Pains.
- Created comprehensive `plan.md` and `skill.md` for `scenario_2` (To-Be Scenario) based on Value Proposition Canvas.
- Initialized raw narrative scenario files (`scenario_asis.md`, `scenario_tobe.md`) following HCI Lecture 6 principles.

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
