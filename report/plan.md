# Report Plan — HTTT01_HCI Task Assignment System

> Deliverable: `report.pdf` (A4, print-ready) + `report.docx` (Word, editable) — cùng nguồn Markdown/LaTeX, export đồng thời PDF & DOCX

## 1. Mục tiêu
Tạo báo cáo PDF tổng hợp toàn bộ quá trình HCI: nghiên cứu người dùng, phân tích vấn đề, đề xuất giải pháp Task Assignment System với auto-mapping, prototype và đánh giá.

## 2. Toolchain (chọn 1)

| Option | Cách làm | Export PDF + DOCX | Phù hợp khi |
|---|---|---|---|
| **A. Markdown → PDF + DOCX (Khuyến nghị)** | Viết `report/src/main.md` → Pandoc | `pandoc main.md -o report.pdf` + `pandoc main.md -o report.docx --reference-doc=template.docx` | Nhanh, version control, ra cả PDF nộp + DOCX sửa tay |
| **B. Typst** | Viết `main.typ` | `typst compile main.typ` → PDF, export DOCX qua Pandoc | PDF đẹp, compile nhanh |
| **C. LaTeX (Overleaf)** | Viết `main.tex` | Overleaf → PDF, Pandoc → DOCX | Chuẩn học thuật chặt |
| **D. Google Docs** | Viết trên Docs | Download PDF + DOCX | Collab non-tech |

Mặc định **A**: 1 nguồn `main.md` → build đồng thời `report.pdf` + `report.docx` (DOCX giữ style để sửa tay dễ, PDF để nộp in).

## 3. Cấu trúc báo cáo (TOC đề xuất ~12-15 trang)

```
1. Bìa (Cover) — tên môn, tên đề tài, nhóm, GVHD, ngày
2. Mục lục + Danh mục hình/bảng
3. Tóm tắt (Abstract — 150-200 từ, TV)
4. 1. Giới thiệu (Introduction) — bối cảnh phân công thủ công, mục tiêu, phạm vi
5. 2. Nghiên cứu người dùng (User Research) — phỏng vấn/khảo sát → pain points
6. 3. Persona & Scenario — link tới /persona, /scenario_1, /scenario_2
7. 4. Phân tích yêu cầu — functional/non-functional, constraints (Supabase, RLS)
8. 5. Giải pháp đề xuất — workflow 5 bước (AGENTS.md §1), weighted scoring (w1=0.7,w2=0.3)
9. 6. Thiết kế hệ thống — kiến trúc React+Supabase, schema DB, thuật toán greedy
10. 7. Thiết kế giao diện — Design Rules (màu Jira #0052CC, font Inter), wireframe /wireframe
11. 8. Prototype — ảnh màn hình /prototype, luồng demo
12. 9. Đánh giá (Evaluation) — usability test, heuristic, phản hồi
13. 10. Kết luận & Hướng phát triển (Phase 2: login thành viên, realtime)
14. Tài liệu tham khảo + Phụ lục
```

Nguồn nội dung lấy sẵn từ: `persona/`, `storyboard/`, `value_proposition/`, `wireframe/`, `prototype/`, `code/`.

## 4. Quy cách PDF & DOCX

- Khổ A4, margin 2cm, font Inter/Be Vietnam Pro 11pt, line-height 1.5 (áp cho cả PDF & DOCX)
- Màu chủ đạo #0052CC cho heading, bảng màu §4 AGENTS.md gốc
- Header/footer: tên đề tài | số trang
- Hình: PNG 300dpi, caption đánh số (Hình 1, 2...)
- PDF: export PDF/A để in không lỗi font
- DOCX: dùng `--reference-doc=report/template/reference.docx` để giữ style heading/bảng/caption đồng nhất với PDF, cho phép sửa tay trực tiếp trên Word/Google Docs

## 5. Quy trình làm việc

1. Draft `report/src/main.md` theo TOC trên
2. Đổ nội dung từ các folder hiện có vào từng chương
3. Chèn hình wireframe/prototype, render bảng
4. Chạy `npm run report:all` → kiểm tra `report/report.pdf` + `report/report.docx`
5. Review DOCX sửa tay nếu cần → re-export PDF final (hoặc đẩy PDF lên Canva chỉnh mỹ thuật)

## 6. Script đề xuất

```json
// package.json
"scripts": {
  "report:pdf": "pandoc report/src/main.md -o report/report.pdf --pdf-engine=xelatex -V mainfont=\"Inter\" --template=eisvogel",
  "report:docx": "pandoc report/src/main.md -o report/report.docx --reference-doc=report/template/reference.docx",
  "report:all": "npm run report:pdf && npm run report:docx"
}
```

DOCX template: tạo 1 lần `report/template/reference.docx` (định dạng heading/bảng/caption theo §4) rồi tái sử dụng.

Hoặc Typst: `typst compile report/src/main.typ report/report.pdf` + `pandoc report/src/main.md -o report/report.docx`

## 7. Timeline

- Ngày 1: Dựng khung + bìa + TOC
- Ngày 2: Viết chương 1-5 (research + giải pháp)
- Ngày 3: Chương 6-8 (thiết kế + prototype)
- Ngày 4: Đánh giá + kết luận + polish PDF

## 8. Checklist trước khi nộp

- [ ] Đủ TOC, đánh số trang, bìa chuẩn trường
- [ ] Tất cả hình có caption & nguồn
- [ ] Thuật toán mapping ghi đúng công thức w1,w2
- [ ] Không lộ API key, tuân thủ .env
- [ ] PDF xem được trên Adobe Reader & in thử
- [ ] DOCX mở được trên Word/Google Docs, style heading/bảng không vỡ, cho sửa tay dễ
