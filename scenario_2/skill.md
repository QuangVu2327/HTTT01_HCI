# Skill - scenario_2 (To-Be Scenario Generation & Rendering)

## Purpose
- Hướng dẫn quy trình khép kín từ việc phân tích nội dung kịch bản tương lai (`scenario_tobe.md`), tạo tệp JSON chuẩn hóa, và sử dụng `scenario_renderer` để xuất ra HTML/PNG.

## When to use this skill
- Khi người dùng yêu cầu xây dựng và trực quan hóa To-Be Scenario (kịch bản tương lai với giải pháp).

## Required Inputs
- Dữ liệu Value Proposition (`value_proposition/data/raw/all_personas.json`).
- Tệp mô tả bối cảnh `scenario_2/data/raw/scenario_tobe.md`.
- Schema chuẩn `templates/scenario.schema.json`.

## Output
- Tệp JSON cấu trúc: `scenario_2/data/raw/scenario_tobe.json`.
- Tệp kết quả trong `scenario_2/data/output/`: `scenario_tobe.html` và `scenario_tobe.png`.

## Workflow
1. **Soạn thảo JSON**: Dựa trên nội dung `scenario_tobe.md`, bóc tách thành các bước tuần tự (`steps`) có actors, actions, system responses, notes.
2. **Gọi tool JSON**: 
   `node .opencode/tools/scenario_renderer/scenario_json.js scenario_2/data/raw/scenario_tobe.json`
3. **Gọi tool PNG**:
   `node .opencode/tools/scenario_renderer/scenario_png.js scenario_2/data/output/scenario_tobe.html`

## Knowledge & Reasoning
- Tuân thủ lý thuyết HCI Lecture 6 để trực quan hóa giải pháp, minh họa cách hệ thống tự động phân công task giúp tối ưu hóa công việc.

## Validation Rules
- Dữ liệu JSON bắt buộc phải pass schema `scenario.schema.json`.
- Tuyệt đối không tự tạo file HTML/PNG thủ công bằng tay ngoài các bước gọi tool render.
