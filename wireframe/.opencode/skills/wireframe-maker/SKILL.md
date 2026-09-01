---
name: wireframe-maker
description: Use when building or editing the Task Assignment System wireframe — 6-screen prototype (Dashboard, Tasks, Members, Mapping, Kanban, Notify dialog), Jira palette, weighted scoring display, or preparing wireframe assets for HCI report. Trigger keywords: wireframe, wire frame, prototype, mapping UI, kanban, task board, dashboard, Gợi ý phân công. Works with wire frame/index.html, wire frame/flows.md, wire frame/screens/spec.md, wire frame/plan.md, wire frame/skill.md in the HCI project.
---

# Wireframe Maker

Dựng/sửa wireframe cho Task Assignment System (phân công theo kỹ năng + giờ rảnh). Đọc trước `plan.md` (kế hoạch 5 bước) và `skill.md` (cách làm chi tiết), dùng `../AGENTS.md` §3-§4 làm spec chuẩn.

## Quy trình
1. **Khảo spec**: `../AGENTS.md` §1/§3/§4 + `../persona/personas.md` → chốt tag dùng chung, cột bảng, màu status/score.
2. **Khung**: `index.html` — top nav 5 tabs + 2 CTA, mỗi màn `<section class="screen">`, CSS vars Jira palette, font Inter.
3. **Điền data**: task/member mẫu theo personas, score demo High `#00875A` Mid `#FFAB00` Low `#DE350B`.
4. **Tương tác**: tabs `go(id)`, dropdown chỉnh tay, slider w1/w2 (0.7/0.3), dialog Gửi thông báo (bắt buộc tick xác nhận), toast.
5. **Kiểm chứng**: responsive 1200/900/600, hover `#0065FF` transition 150ms, chụp `screens/screen-*.png`, đối chiếu `screens/spec.md`.

## Nguyên tắc
- Không đổi token màu — dùng `var(--primary)` v.v. đã nhúng trong `index.html`.
- Tag kỹ năng khóa từ Dashboard — không tạo tag tự do mỗi màn.
- Score phải có màu + minh bạch (skill/avail/total).
- Prototype là HTML tĩnh — không thêm npm/build, mở trực tiếp được.

## File liên quan
- `index.html` — prototype duy nhất (6 màn + dialog)
- `flows.md` — flow trưởng nhóm / thành viên / GV + edge cases
- `screens/spec.md` — spec cột/bảng/card từng màn
- `plan.md` — kế hoạch 5 bước + timeline
- `skill.md` — hướng dẫn chi tiết + template + checklist
- `../AGENTS.md` — nguồn palette/scoring/flow chuẩn
