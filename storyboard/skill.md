# Skill - Storyboard Development & Rendering

## Purpose
- Hướng dẫn quy trình khép kín từ việc xây dựng nội dung phân cảnh trực quan (Storyboard) theo kỹ thuật Pixar storytelling, tạo tệp JSON chuẩn hóa, và sử dụng `storyboard_renderer` để xuất ra HTML/PNG.

## When to use this skill
- Khi cần tạo bức tranh tổng quan trải nghiệm người dùng (Big picture of user experience) để minh họa cho giải pháp thiết kế trong báo cáo HCI.

## Required Inputs
- Dữ liệu To-Be Scenario (`scenario_2/data/raw/scenario_tobe.json`).
- Schema chuẩn `templates/storyboard.schema.json`.
- Tài liệu lý thuyết HCI (`knowledge/07_Conception_Storyboard.md`).

## Output
- Tệp JSON cấu trúc: `storyboard/data/raw/storyboard.json`.
- Tệp kết quả trong `storyboard/data/output/`: `storyboard.html` và `storyboard.png`.

## Workflow
1. **Soạn thảo JSON**: Phân rã cốt truyện thành 6 panels (`Once upon a time`, `Every day`, `One day`, `Because of that...`, `Until finally`) kèm mô tả hình ảnh, lời thoại và cảm xúc.
2. **Gọi tool JSON**: 
   `node .opencode/tools/storyboard_renderer/storyboard_json.js storyboard/data/raw/storyboard.json`
3. **Gọi tool PNG**:
   `node .opencode/tools/storyboard_renderer/storyboard_png.js storyboard/data/output/storyboard.html`

## Knowledge & Reasoning
- Tuân thủ lý thuyết HCI Lecture 7 (Storyboard), kỹ thuật kể chuyện Pixar, làm rõ Context of use (User, task, environment) và truyền tải Value Proposition.

## Validation Rules
- Dữ liệu JSON bắt buộc phải pass schema `storyboard.schema.json`.
- Tuyệt đối không tự tạo file HTML/PNG thủ công bằng tay ngoài các bước gọi tool render.
