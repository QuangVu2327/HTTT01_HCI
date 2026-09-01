# Kỹ năng: Dựng Wireframe cho Task Assignment System

Hướng dẫn tái sử dụng để dựng wireframe từ spec `../AGENTS.md` + personas. Bổ trợ cho `plan.md` — file này là "cách làm" chi tiết.

## Khi nào dùng
- Khi cần dựng/sửa wireframe 6 màn (Dashboard, Công việc, Thành viên, Gợi ý, Kanban, Dialog).
- Khi cần chuyển spec weighted scoring + bảng màu Jira thành component thực tế.
- Khi cần chuẩn bị ảnh/flow cho báo cáo HCI hoặc bàn giao cho `code/`.

## Quy trình chi tiết

### Bước 1 — Khảo spec
- Đọc `../AGENTS.md` §1 (flow), §3 (score = 0.7*skill + 0.3*avail, greedy), §4 (palette, font, card, transition).
- Đọc `../persona/personas.md` + `survey_persona.md` để lấy pain: trưởng nhóm cần thấy ai rảnh/quá tải, thành viên cần checklist mobile, GV cần tiến độ thực tế.
- Chốt **tag dùng chung** (vd: Frontend/Backend/Design/BA/Testing) — tag này khóa cho cả Task và Member.

### Bước 2 — Dựng khung trong `index.html`
- Top nav: logo + 5 tabs (Dashboard, Công việc, Thành viên, Gợi ý, Kanban) + 2 CTA (Gửi thông báo, Tự động phân công primary `#0052CC`).
- Mỗi màn = `<section id="<name>" class="screen">`, tab JS toggle `.active`.
- CSS vars đã có sẵn trong `<style>:root` — không đổi mã màu, chỉ dùng var.
- Font: `Inter` + fallback `Be Vietnam Pro` qua Google Fonts.

### Bước 3 — Điền bảng/card
- **Dashboard**: 4 stat cards, progress bar giờ rảnh, task cần chú ý.
- **Công việc**: table cols [ ] | Tên | Tag | TG | Ưu tiên | Deadline | Gán | Trạng thái; form thêm nhanh 4 cột.
- **Thành viên**: cols Tên | Email | Kỹ năng | Giờ rảnh | Đã gán | Còn lại (progress) | Tải (High/Mid/Low).
- **Gợi ý**: cols Task | Yêu cầu | Gợi ý | Skill | Avail | Total (badge màu) | Chỉnh tay (dropdown). Slider w1/w2 hiển thị 0.7/0.3.
- **Kanban**: 3 `.col` (todo/doing/done) + `.task` card (title, tag, giờ, assignee, deadline, score). Toolbar filter + view toggle.

### Bước 4 — Tương tác
- Tabs: `go(id)` toggle tab/screen, scroll top.
- Dropdown chỉnh tay: `<select class="select">` — đổi assignee, giữ score cũ để demo.
- Dialog Gửi thông báo: `.dialog` overlay, bắt buộc tick "Tôi đã kiểm tra" mới gửi, toast "Đã gửi email".
- Nút Chạy lại mapping: `toast('Đã chạy lại mapping')` — placeholder cho Edge Function sau này.

### Bước 5 — Kiểm chứng & xuất
- Check 3 breakpoint: 1200px (4-col stats), 900px (2-col + kanban 1-col), 600px (table overflow + hide-m).
- Hover: card `border-color #0065FF`, shadow, transition 150ms.
- Chụp `screens/screen-*.png` nếu cần đưa vào báo cáo; cập nhật `screens/spec.md`.

## Templates

### Thêm màn mới
```html
<section id="ten-man" class="screen">
  <div class="card">...</div>
  <div class="table-wrap"><table>...</table></div>
</section>
```
Thêm tab: `<button class="tab" data-s="ten-man">Tên</button>`

### Task card chuẩn
```html
<div class="task">
  <div class="task-title">Tên task <span class="score score-high">0.94</span></div>
  <div class="task-meta"><span class="tag">Backend</span><span>8h</span><span>Minh Anh</span></div>
  <div class="task-meta">DL 07/09 · <span class="badge badge-doing">Doing</span></div>
</div>
```

## Lỗi thường gặp
- **Đổi mã màu thủ công** → luôn dùng `var(--primary)` v.v., không hardcode hex mới.
- **Tag tự do mỗi màn** → phải lấy từ tag dùng chung Dashboard, không tạo tag riêng lẻ.
- **Score không màu** → thiếu `.score-high/mid/low`, mất minh bạch.
- **Dialog gửi không xác nhận** → phải có checkbox tick mới cho gửi.

## Checklist cuối
- [ ] Đủ 6 màn, nav tabs hoạt động, mở `index.html` trực tiếp được
- [ ] Bảng màu đúng Jira tokens, font Inter, transition 150ms
- [ ] Score 3 mức màu + tooltip, Kanban 3 cột đúng màu status
- [ ] CTA primary `#0052CC` hover `#0065FF`, dialog có xác nhận
- [ ] Responsive 1200/900/600, không lỗi overflow
- [ ] `screens/spec.md` khớp với `index.html`
- [ ] Sẵn sàng chụp ảnh cho báo cáo HCI
