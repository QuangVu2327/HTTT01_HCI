# Wireframe — Task Assignment System (Nhóm 8, 4–5 người)

Prototype tĩnh — hybrid Jira + Trello + Asana + Linear, đã chỉnh cho đồ án HCI nhóm nhỏ (không phải tour).

## Cách xem
Mở `index.html` bằng browser (double-click). Không cần server. Xem `screens/wireframe-export.png` nếu chỉ cần ảnh.

## Có gì trong folder
- `index.html` — board 4 cột `CẦN LÀM / ĐANG LÀM / REVIEW / HOÀN THÀNH`, cards có score `0.7 skill + 0.3 avail`, avatars 4 người (Minh Anh, Dũng, Thu Hà, Hữu Long)
- `screens/spec.md` — spec từng màn, `screens/wireframe-export.png` — ảnh render @2x 1440px
- `references/` — 4 ảnh gốc đã copy (Jira, Trello, Asana, Roadmap) để đối chiếu
- `DESIGN_DECISIONS.md` — giải thích từng chọn lựa X/Y trích nguồn website nào
- `flows.md`, `plan.md`, `skill.md`, `.opencode/skills/wireframe-maker/SKILL.md`

## Nguồn spec
- `../AGENTS.md` §1/§3/§4 — mapping + bảng màu Jira `#0052CC`
- `../persona/personas.md` + `survey_persona.md` — Minh Anh (trưởng nhóm) / Dũng (thành viên) / cô Lan (GV)

## Stack
HTML + CSS vars + vanilla JS. Đã xóa `node_modules` sau khi export.

## Changelog
- 2026-09-01: khởi tạo `wire frame/` (spaced) 6 màn → 2026-09-01: redesign theo Jira/Trello/Asana, đổi data sang nhóm nhỏ 4 người, export `wireframe-export.png`
- 2026-09-01: gom về `wireframe/` (no space) + thêm `references/` + `DESIGN_DECISIONS.md`, sẵn sàng commit.
