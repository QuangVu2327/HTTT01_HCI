# Design Decisions — Wireframe TaskAssign

Giải thích vì sao chọn X/Y trong wireframe, trích nguồn từ 4 web app tham chiếu bạn đã đưa vào `references/` + spec gốc `../AGENTS.md` + `../persona/`.

## 1. Tổng quan lựa chọn
Wireframe là **hybrid Jira + Trello + Asana + Linear (Roadmap)** — không copy 1 app, mà lấy phần tốt nhất cho **nhóm nhỏ 4–5 người** (Nhóm 8, đồ án HCI) theo AGENTS.md §1: cần nhanh, rõ, không học tool nặng. Persona Minh Anh (ngại Jira phức tạp), Dũng (chỉ dùng chat, cần checklist), cô Lan (cần thấy tiến độ thực tế) → ưu tiên **quen mắt + ít học**.

## 2. Bố cục khung (App Shell)

| Chọn gì | Vì sao | Nguồn |
|---|---|---|
| **Rail xanh hẹp 56px + sidebar 220px** | Jira: rail `#0747A6` cho chuyển app nhanh, sidebar liệt kê Boards/Backlog/Reports — sinh viên NHÓM 8 vẫn thấy quen nếu sau này dùng Jira thật nhưng bản wireframe chỉ giữ 9 mục tiếng Việt gọn, bỏ dư (Releases/Components thành Báo cáo/Thành viên). | `Jira-board-1024x572.png` — trái: blue rail + `Teams in Space / Board` active |
| **Topbar tối `#1F242E` + nút Tạo cam + ô Tìm** | Asana: dark header tạo hierarchy, nút Create nổi bật để Minh Anh tạo task nhanh không cần học. Ô search giữa cho Dũng tìm việc của mình. | `productui-helpcenter...webp` — top bar `Create` đỏ + search `website` ở giữa |
| **Project header: icon 🎓 + tên + badge Đúng tiến độ + avatars stack 4** | Asana: icon hồng + title + status pill `On track` giúp cô Lan liếc thấy sức khỏe dự án. Stack 4 avatar (MA/HD/TH/HL) thể hiện **quy mô nhỏ** — không `14` người như tour, đúng 4 như AGENTS.md §7 “4–5 người”. | `productui...webp` — `On Tour: London Event` + `On track` + `Share / Customize` + stack 14 |
| **View tabs gạch chân (Tổng quan / Danh sách / Board / Timeline…)** | Asana: tab underline nhẹ hơn Jira dropdown, Dũng chỉ cần Board, GV có thể qua Timeline. Giữ tiếng Việt theo AGENTS.md §5 “UI mặc định Tiếng Việt”. | `productui...webp` — `Overview List Board Timeline Calendar Workflow` |

## 3. Board & cột

| Chọn gì | Vì sao | Nguồn |
|---|---|---|
| **4 cột: CẦN LÀM 4 / ĐANG LÀM 2 / REVIEW 2 / HOÀN THÀNH 3** | Jira có 4 cột `TO DO 5 / IN PROGRESS 5 / CODE REVIEW 2 / DONE 8` — nhóm nhỏ cần REVIEW thay vì CODE REVIEW để giảng viên duyệt. Đổi “(no section)” thành tiếng Việt rõ nghĩa cho sinh viên. | `Jira-board...png` — 4 columns với count |
| **Nền cột `#F4F5F7` xám, card trắng bo 8px shadow `0 1px 1px rgba(9,30,66,.08)`** | Jira/Trello: contrast cột xám - card trắng giúp lướt nhanh khi 11 task. Hover `border #C1C7D0 + shadow 0 4px 10px` 150ms theo AGENTS.md §4. | `Jira-board...png` + `TrelloGuide...jpg` — cards trắng nổi trên nền be/xám |
| **Card: title 13px semibold + label pill + meta 11px + avatar + score** | Trello: label màu trên cùng để phân loại nhanh (FRONTEND/BACKEND/BA), Jira: priority ▲ + TIS-ID + avatar góc phải. Thêm **score badge** `0.68 / 1.00` (AGENTS.md §3 `w1=0.7 w2=0.3`) là điểm khác biệt — màu `High #00875A / Mid #FFAB00 / Low #DE350B` theo AGENTS.md §4. | `Jira-board...png` — labels vàng/cam/tím + `▲` + `TIS-15` + avatar; `Trello...jpg` — labels xanh/lá + `Sep 20 / Mar 23` + checklist `1/3` |
| **Tiến độ mini `0/3 · 4h` + progress bar 4px `#0052CC`** | Linear Roadmap: thanh mảnh cho % hoàn thành, Trello: `0/3` checklist. Giúp Minh Anh thấy ai quá tải (HD `18/20h` trong persona data-driven). | `roadmap.png` — `38% ▭ , 69%` progress; `Trello...jpg` — `1/3` checklist |
| **Toolbar: + Thêm task ▾ + Lọc:1 (xanh) + Sắp xếp/Nhóm theo/Ẩn** | Asana: `+ Add task` + `Filter:1` pill xanh + Sort/Group by. Cho Minh Anh lọc “việc của Dũng” nhanh. Giữ `Auto-assign: 0.7 skill + 0.3 avail → Chạy lại gợi ý` ở phải để hiện thuật toán minh bạch. | `productui...webp` — `+ Add task ▾  Filter:1  Sort  Group by` |

## 4. Màu & chữ

| Chọn gì | Vì sao | Nguồn |
|---|---|---|
| **Palette Jira/Atlassian**: Primary `#0052CC` / hover `#0065FF` / bg `#F7F8F9` / border `#DFE1E6` / text `#172B4D` | AGENTS.md §4 bắt buộc, trùng Jira nên sinh viên đã quen. Score dùng đúng mã §4. | `AGENTS.md §4` |
| **Label bổ sung**: vàng `#FFF0B3` cho TESTING, cam `#FF8B00` cho BA, tím `#EAE6FF` cho BACKEND, xanh dương `#DEEBFF` cho SLIDE — phân biệt kỹ năng như Trello label (Marketing xanh lá, Legal vàng). | Trello: mỗi label 1 màu đậm, dễ quét. | `TrelloGuide...jpg` — `Marketing` xanh, `Legal` vàng, `Sales` xanh dương |
| **Font Inter 400/500/600/700** | AGENTS.md §4 `Inter / Be Vietnam Pro`, hỗ trợ TV, giống Jira/Trello system font. Size 13px body, 11px meta — đọc trên mobile cho Dũng. | `AGENTS.md §4` |

## 5. Tương tác & vai trò

| Chọn gì | Vì sao | Nguồn |
|---|---|---|
| **Customize drawer phải 320px (Fields 4 / Sections 16 / Add: Rules/Forms/Apps)** | Asana: drawer `Customize` cho phép thêm Fields mà không rối board chính. Nhúng `Nhóm 4 người` summary xanh lá để cô Lan thấy ngay cơ cấu. | `productui...webp` — drawer `Customize > Fields 4 / Sections 16 > Fields/Rules/Forms` |
| **Không dùng dark Roadmap cho board chính** | `roadmap.png` là Linear dark — chỉ tham khảo progress bar, không áp dark cho toàn app vì nhóm nhỏ cần nền sáng dễ in báo cáo HCI. | `roadmap.png` — `Roadmap Active / Closed / Q4-2020 Title/Teams/Lead/Date/Status` |
| **Ảnh export giữ nguyên tiếng Việt, data nhỏ** | Persona data-driven n=15: đa số dùng chat + Sheets, ghét học tool. Nên task là `Thiết kế UI dashboard`, `Viết API mapping`, `Soạn báo cáo HCI` — việc thật của đồ án, không phải `Space Travel` hay `London Tour`. | `persona/survey_persona.md` — trưởng nhóm “xem ai rảnh/quá tải”, thành viên “không rõ deadline”, GV “cần biết ai làm gì” |

## 6. Những gì KHÔNG lấy

- **Không lấy** `TEAM SUPPORT / SPACE TRAVEL PARTNERS` labels tour — thay bằng `FRONTEND / BACKEND / BA / DESIGN` theo tag dùng chung AGENTS.md §7.
- **Không lấy** dark mode toàn app của Linear — chỉ mượn progress style.
- **Không lấy** Trello nền gradient rực — giữ `F4F5F7` trung tính để in A4 đẹp.

## 7. File tham chiếu trong repo

```
references/Jira-board-1024x572.png        — Jira board 4 cột, label + priority
references/TrelloGuideChapter1.jpg        — Trello labels + checklist + avatars
references/productui-helpcenter...webp    — Asana header + tabs + toolbar + Customize drawer
references/roadmap.png                    — Linear Roadmap Q4-Q1 + % progress
```

Mở `index.html` để xem tương tác; `screens/wireframe-export.png` là ảnh đã render từ chính file này (@2x, 1440px).
