# Flows — Task Assignment System

## Flow chính (Trưởng nhóm)
1. Tạo dự án → định nghĩa **tag kỹ năng dùng chung** (vd: Frontend, Backend, Design, BA, Testing) — dùng cho cả Task và Thành viên.
2. Nhập **danh sách công việc**: tên, mô tả, tag yêu cầu, thời gian dự kiến (giờ), ưu tiên, deadline.
3. Nhập **danh sách thành viên**: tên, email, tag kỹ năng (junior/mid/senior), giờ rảnh/tuần, khối lượng đang có.
4. Bấm **Tự động phân công** → hệ thống tính `total_score = 0.7*skill_score + 0.3*availability_score` cho từng cặp (task, member), greedy theo priority/score, trừ giờ rảnh còn lại.
5. Xem bảng **Gợi ý phân công** (hiển thị score + badge High/Mid/Low, lý do) → chỉnh thủ công bằng dropdown nếu cần.
6. Bấm **Gửi thông báo cho tất cả** → dialog xác nhận → gửi email qua Resend (Edge Function) — Phase 1.
7. Theo dõi **Kanban** (To do/Doing/Done) + biểu đồ khối lượng.

## Flow phụ
- **Thành viên**: mở Kanban → lọc "Việc của tôi" → xem task card (tên, tag, deadline, người giao) — Phase 2 mới có đăng nhập/đánh dấu hoàn thành.
- **Giảng viên**: xem Dashboard/Kanban + Gantt tổng quan, nhận cảnh báo nhóm trễ hạn (read-only).

## Edge cases
- Task yêu cầu tag không ai có → score thấp (đỏ), vẫn gán người cao nhất nhưng cảnh báo.
- Member hết giờ rảnh → loại khỏi gợi ý cho task tiếp theo.
- Nhiều task cùng cần 1 người giỏi → task có `total_score` cao nhất được gán trước.

## Personas mapping
- Minh Anh (trưởng nhóm Năm 4, 3-4 dự án/kỳ): cần thấy ai rảnh/quá tải trong tuần, ngại học tool phức tạp → CTA to, loading rõ, chỉnh thủ công dễ.
- Dũng (thành viên Năm 2, 100% dùng chat): cần checklist rõ, cảnh báo quá tải, mobile-friendly.
- Cô Lan (giảng viên): cần tiến độ thực tế + đánh giá đóng góp, không cần thao tác phức tạp.
