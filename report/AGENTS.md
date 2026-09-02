# AGENTS.md — report/

> Quy định cho agent khi làm việc trong `report/` — tạo báo cáo PDF + DOCX (Word editable).

## 1. Phạm vi
Chỉ làm việc trong `report/`. Nguồn tham chiếu đọc từ `AGENTS.md` gốc, `persona/`, `scenario_*/`, `wireframe/`, `prototype/`, `code/`.

## 2. Nhiệm vụ chính
Biên soạn `report.pdf` + `report.docx` từ cùng nguồn `src/main.md` theo `report/plan.md` — đúng TOC, đúng design rules (màu #0052CC, font Inter). PDF để nộp/in, DOCX để sửa tay.

## 3. Quy tắc
- Không commit `.env` hay Supabase key; dùng placeholder.
- Viết UI text tiếng Việt; trao đổi linh hoạt Việt/Anh.
- Atomic changes: mỗi lần chỉ sửa 1 chương/mục.
- Backup trước khi sửa file >10 dòng vào `backup/report/<timestamp>/`.
- Cập nhật `changelog.md` sau mốc lớn và `messages.md` sau mỗi lần trả lời.

## 4. Toolchain
Ưu tiên `src/main.md` + Pandoc/Eisvogel → PDF + DOCX cùng lúc. Nếu dùng Typst/LaTeX giữ cùng TOC. Scripts: `npm run report:pdf`, `report:docx`, `report:all` (build cả hai). DOCX dùng `--reference-doc=template/reference.docx`.

## 5. Chất lượng
- A4, margin 2cm, heading màu #0052CC, text #172B4D (áp cho cả PDF & DOCX).
- Hình 300dpi, có caption. Bảng có header xanh.
- Kiểm tra cả PDF và DOCX build thành công trước khi báo done; DOCX mở được trên Word/Google Docs không vỡ style.

## 6. Workflow
Understand → Plan (theo plan.md) → Implement (viết markdown) → Verify (build PDF + DOCX, xem thử in & mở Word) → Confirm & Log.

> Canonical file là `AGENTS.md` (số nhiều, theo chuẩn opencode). `AGENT.md` là alias đồng bộ 100% để tương thích.
