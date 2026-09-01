# AGENTS.md — wireframe

## Scope
Folder `wireframe/` chứa toàn bộ wireframe cho Task Assignment System (nhóm nhỏ 4–5 người). Không sửa file ngoài folder này khi làm wireframe. Root `../AGENTS.md` là spec gốc (mapping 0.7/0.3, bảng màu Jira).

## Folder map
- `README.md` — cách xem `index.html` + changelog
- `DESIGN_DECISIONS.md` — giải thích vì sao chọn X/Y, trích nguồn Jira/Trello/Asana/Linear
- `flows.md` — flows trưởng nhóm / thành viên / GV
- `plan.md` + `skill.md` (+ alias `wireframe_making_*`) — kế hoạch & kỹ năng dựng wireframe
- `index.html` — prototype tương tác duy nhất (mở browser, không build)
- `screens/` — `spec.md` + `wireframe-export.png` (ảnh render)
- `references/` — 4 ảnh gốc đã tham chiếu (Jira, Trello, Asana, Roadmap)
- `.opencode/skills/wireframe-maker/SKILL.md` — skill cho agent
- `data/.gitkeep` — giữ folder theo cấu trúc HCI ban đầu

## Làm việc trong folder này
- HTML tĩnh + CSS vars (Jira palette `#0052CC` etc.), font `Inter` + fallback `Be Vietnam Pro`, UI **Tiếng Việt**.
- Mở `index.html` trực tiếp. Thêm màn: copy `<section>` + tab nav, cập nhật `screens/spec.md`.
- Export: Chrome headless `1440×900 @2x fullPage` → `screens/wireframe-export.png` (đã có script puppeteer trong lịch sử, giờ chỉ cần mở lại nếu sửa).

## Design tokens (AGENTS.md §4)
`--primary #0052CC`, `--primary-hover #0065FF`, `--bg #F7F8F9`, `--card #FFFFFF`, `--border #DFE1E6`, `--text #172B4D`, `--text-sub #6B778C`, status To-do `#DFE1E6/#42526E`, Doing `#FFF0B3/#974F0C`, Done `#E3FCEF/#006644`, Urgent `#FFEBE6/#BF2600`, score High `#00875A` Mid `#FFAB00` Low `#DE350B`.

## Quy ước
- Không commit secret, không thêm dependency nặng (đã xóa `node_modules` sau export).
- Ảnh tham chiếu để trong `references/`, ảnh render để trong `screens/`.
- Với mỗi lần trả lời, cập nhật `messages.md` (per-folder, xem `../messages.md` tổng) — theo `../AGENTS.md` §6.
