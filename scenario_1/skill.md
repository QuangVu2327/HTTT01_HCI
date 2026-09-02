# Skill - scenario_1 (As-Is Scenario Generation & Rendering)

## Purpose
- Hướng dẫn quy trình khép kín từ việc phân tích nội dung kịch bản hiện tại (`scenario_asis.md`), tạo tệp JSON chuẩn hóa, và sử dụng `scenario_renderer` để xuất ra HTML/PNG.

## When to use this skill
- Khi người dùng yêu cầu xây dựng và trực quan hóa As-Is Scenario (kịch bản hiện tại).

## Required Inputs
- Dữ liệu Persona (`persona/final_persona/data/raw/all_personas.json`).
- Tệp mô tả bối cảnh `scenario_1/data/raw/scenario_asis.md`.
- Schema chuẩn `templates/scenario.schema.json`.

## Output
- Tệp JSON cấu trúc: `scenario_1/data/raw/scenario_asis.json`.
- Tệp kết quả trong `scenario_1/data/output/`: `scenario_asis.html` và `scenario_asis.png`.

## Workflow
1. **Soạn thảo JSON**: Dựa trên nội dung `scenario_asis.md`, bóc tách thành các bước tuần tự (`steps`) có actors, actions, notes.
2. **Gọi tool JSON**: 
   `node .opencode/tools/scenario_renderer/scenario_json.js scenario_1/data/raw/scenario_asis.json`
3. **Gọi tool PNG**:
   `node .opencode/tools/scenario_renderer/scenario_png.js scenario_1/data/output/scenario_asis.html`

## Knowledge & Reasoning
- Tuân thủ lý thuyết HCI Lecture 6 (Conception - Scenario & Sketching) để làm nổi bật các điểm đau (pain points) trong quy trình thủ công hiện tại.

## Validation Rules
- Dữ liệu JSON bắt buộc phải pass schema `scenario.schema.json`.
- Tuyệt đối không tự tạo file thủ công bằng tay ngoài các bước gọi tool render.
