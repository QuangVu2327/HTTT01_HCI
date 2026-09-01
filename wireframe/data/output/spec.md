# Screens Spec

## 1. Dashboard
- Header: tên dự án + tag kỹ năng dùng chung (chips) + nút Tạo tag
- Stats: 4 cards (tổng task, đã gán, chưa gán, giờ rảnh còn lại)
- Quick actions: Tự động phân công (primary #0052CC), Gửi thông báo (secondary)
- Table mini: top 3 task chưa gán + top 3 member quá tải

## 2. Công việc (Task table)
- Toolbar: search, filter tag, filter ưu tiên, Import CSV, + Thêm task
- Table cols: [ ] | Tên task | Tag yêu cầu (badges) | TG dự kiến | Ưu tiên | Deadline | Người được gán | Trạng thái
- Row action: edit/delete
- Form thêm: tên*, tag* (multi-select từ tag dự án), giờ*, ưu tiên, deadline, mô tả

## 3. Thành viên (Member table)
- Toolbar: search, filter kỹ năng, Import CSV, + Thêm thành viên
- Table cols: Tên | Email | Kỹ năng (badges) | Giờ rảnh/tuần | Đã gán (giờ) | Còn lại (progress bar) | Trạng thái tải
- Form thêm: tên*, email, kỹ năng* (chips), giờ rảnh*, ghi chú

## 4. Gợi ý phân công (Mapping)
- Header: nút Chạy lại mapping + trọng số w1/w2 (slider 0.7/0.3)
- Table cols: Task | Yêu cầu | Gợi ý thành viên | Skill score | Avail score | Total score (badge High #00875A Mid #FFAB00 Low #DE350B) | Chỉnh tay (dropdown)
- Footer: Chốt phân công (chuyển sang Kanban)

## 5. Kanban
- 3 cột: To do (#DFE1E6) | Doing (#FFF0B3) | Done (#E3FCEF)
- Task card: tiêu đề, assignee avatar, tag, giờ, deadline, score badge, menu ...
- Toolbar: filter theo member, search, view toggle (Board/Table)

## 6. Dialog Gửi thông báo
- Trigger từ Dashboard/Mapping
- Nội dung: danh sách người nhận (n), preview email, checkbox xác nhận
- Actions: Hủy | Gửi (primary), có loading + toast kết quả

## Components
- Tag badge: nền #DFE1E6 chữ #42526E, bo 4px
- Score badge: High #00875A, Mid #FFAB00, Low #DE350B, chữ trắng
- Card: bg #FFFFFF border #DFE1E6 shadow nhẹ, hover border #0065FF, transition 150ms
- Button primary: #0052CC hover #0065FF, text trắng
