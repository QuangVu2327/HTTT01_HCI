# AGENTS.md — slides/

> Quy định cho agent khi làm việc trong `slides/` — tạo slide thuyết trình import được vào Canva.

## 1. Phạm vi
Chỉ thao tác trong `slides/`. Đọc `AGENTS.md` gốc + `report/plan.md` + `slides/plan.md` để đồng bộ nội dung.

## 2. Nhiệm vụ
Tạo bộ slide 12-15 trang, 16:9, export PDF/PPTX để upload Canva touch-up.

## 3. Quy tắc
- Tuân thủ Design Rules §4 gốc: Primary #0052CC, font Inter, badge ToDo/Doing/Done.
- UI text tiếng Việt, 1 ý/slide, ≤6 bullet.
- Atomic changes: mỗi lần sửa 1-2 slide.
- Backup trước khi sửa >10 dòng vào `backup/slides/<timestamp>/`.
- Không commit key/secret.

## 4. Toolchain
Ưu tiên Marp (`src/slides.md` → PDF/PPTX). Theme đặt ở `slides/theme.css`. Script `npm run slides:pdf` / `slides:pptx`.

## 5. Canva Workflow
Build → Upload Canva → chỉnh mỹ thuật → Download PDF → lưu link Canva vào `slides/README.md`.

## 6. Workflow
Understand (đọc report) → Plan (outline 14 slides) → Implement (viết markdown) → Verify (build + import Canva thử) → Confirm & Log (changelog + messages.md).

> Canonical file là `AGENTS.md` (số nhiều, theo chuẩn opencode). `AGENT.md` là alias đồng bộ 100% để tương thích.
