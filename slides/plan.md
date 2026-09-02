# Slides Plan — Presentation for Task Assignment System

> Deliverable: bộ slide thuyết trình 12-15 slides, export ra `slides/slides.pdf` hoặc `slides/slides.pptx` để import vào Canva làm final touch-up.

## 1. Mục tiêu
Tóm tắt báo cáo thành bài thuyết trình 10-12 phút, nhấn mạnh vấn đề → persona/scenario → giải pháp auto-mapping → demo prototype → đánh giá.

## 2. Toolchain (chọn 1, đều import được vào Canva)

| Option | Viết ở đâu | Export cho Canva | Khi nào dùng |
|---|---|---|---|
| **A. Marp (Markdown → PDF/PPTX) — Khuyến nghị** | `slides/src/slides.md` với `marp: true` | `npx marp slides/src/slides.md -o slides/slides.pdf` hoặc `--pptx` | Nhanh, version control, dev-friendly |
| **B. PowerPoint (python-pptx)** | `slides/src/build.py` | `python build.py` → `slides.pptx` | Cần layout pixel-perfect |
| **C. Google Slides** | Viết trên Slides | File → Download PPTX/PDF → Upload Canva | Team non-tech collab |
| **D. HTML Reveal.js** | `slides/src/index.html` | Print → PDF | Muốn hiệu ứng động |

Canva import: **Canva → Create design (Presentation 16:9) → Upload → chọn PDF/PPTX** → chỉnh mỹ thuật → Download lại PDF.

## 3. Tỉ lệ & Style
- Tỉ lệ 16:9 (1920×1080), theme theo Design Rules gốc: Primary #0052CC, bg #F7F8F9, text #172B4D
- Font: Inter / Be Vietnam Pro, heading 32-36pt, body 18-20pt
- Badge trạng thái: ToDo #DFE1E6, Doing #FFF0B3, Done #E3FCEF (theo AGENTS.md §4)
- Mỗi slide 1 ý chính, tối đa 6 bullet, hình lớn > chữ nhiều

## 4. Outline 14 Slides (đề xuất)

| # | Tiêu đề | Nội dung chính |
|---|---|---|
| 1 | Cover | Tên đề tài Task Assignment System, nhóm, môn HTTT01_HCI, ngày |
| 2 | Agenda | 4 phần: Vấn đề → Nghiên cứu → Giải pháp → Demo & Đánh giá |
| 3 | Problem | Phân công thủ công: nhớ sai kỹ năng, quá tải 1 người, thiếu minh bạch |
| 4 | User Research | Insight phỏng vấn 3-5 người, pain points chính |
| 5 | Persona | 1-2 persona chính (ảnh + goals + frustrations) — từ /persona |
| 6 | Scenario & Storyboard | Scenario 1/2 + storyboard minh họa luồng hiện tại |
| 7 | Value Proposition | Giải pháp đề xuất, khác biệt vs Jira/Trello (auto-mapping) |
| 8 | Giải pháp — Workflow | 5 bước: Input Task → Input Member → Auto-mapping → Review → Notify |
| 9 | Thuật toán Mapping | Công thức `total = 0.7*skill + 0.3*availability`, greedy theo score |
| 10 | Kiến trúc hệ thống | React+Vite + Supabase (Postgres/Edge Functions/Realtime) + Resend |
| 11 | UI Demo | Ảnh wireframe/prototype: task table, member table, kết quả mapping Kanban |
| 12 | Đánh giá | Usability test / heuristic, điểm mạnh & hạn chế |
| 13 | Roadmap Phase 2 | Login thành viên, realtime Done, Hungarian Algorithm |
| 14 | Q&A / Cảm ơn | Tổng kết 1 câu + liên hệ + QR repo |

## 5. Quy trình Canva Touch-up
1. Build `slides.pdf`/`slides.pptx` từ Marp/pptx
2. Canva → Upload file → kéo vào design Presentation
3. Chỉnh: căn lưới, thay icon (Flaticon), ảnh chất lượng cao, transition 150-200ms
4. Canva → Share → Download → PDF Standard (trình chiếu) hoặc PPTX nếu cần edit tiếp
5. Lưu bản Canva link vào `slides/README.md`

## 6. Script đề xuất

```json
"scripts": {
  "slides:pdf": "npx @marp-team/marp-cli slides/src/slides.md -o slides/slides.pdf --theme slides/theme.css",
  "slides:pptx": "npx @marp-team/marp-cli slides/src/slides.md -o slides/slides.pptx"
}
```

## 7. Checklist
- [ ] 16:9, font embed, màu đúng #0052CC
- [ ] Mỗi slide có số trang + footer tên đề tài
- [ ] Ảnh prototype nét, không vỡ
- [ ] Import Canva thành công, không lỗi font/layout
- [ ] Thời lượng đọc thử 10-12 phút
