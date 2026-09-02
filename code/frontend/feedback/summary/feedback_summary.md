# Tóm tắt Phân tích Khảo sát Prototype (Prototype Survey Feedback Summary)

## 1. Tổng quan
- **Tổng số phản hồi:** 4 người dùng tham gia thử nghiệm.
- **Mục tiêu khảo sát:** Đánh giá mức độ hài lòng về tính năng tự động phân công (auto-assignment), độ hợp lý của điểm số khớp (match score), giao diện/UX, và thu thập các điểm cần cải thiện.

## 2. Kết quả chi tiết theo các tiêu chí

### A. Điểm sáng được đánh giá cao (Highlights)
- **Gợi ý phân công tự động (Auto-Assignment):** Là tính năng ấn tượng nhất, được toàn bộ 4/4 người dùng chọn là điểm nổi bật giúp tiết kiệm thời gian và ra quyết định tốt hơn.
- **Mức độ hữu ích (Decision Support):** Điểm đánh giá trung bình về sự hỗ trợ ra quyết định phân việc đạt mức cao (~3.25/5).
- **Độ hợp lý của phân công:** Người dùng đánh giá mức độ đề xuất là *“Tương đối hợp lý, cần chỉnh sửa nhẹ”*, cho thấy thuật toán hoạt động đúng hướng nhưng tính năng điều chỉnh thủ công (manual override) là rất cần thiết.

### B. Các khó khăn & Vấn đề cần khắc phục (Pain Points)
1. **Giao diện & Thông tin:** 
   - 2/4 người dùng phản hồi rằng *"Giao diện có quá nhiều thông tin gây rối mắt"*.
   - 1 người dùng phản hồi luồng tạo task/phân công còn rườm rà.
2. **Độ minh bạch thuật toán:** 
   - Có ý kiến chưa rõ cách hệ thống tính ra **Match Score** (cần giải thích công thức `0.7 * skill + 0.3 * availability` trực quan hơn hoặc hiển thị tooltip chi tiết).
3. **Trải nghiệm tương tác (UX):** 
   - Phản hồi về thao tác kéo thả trên Kanban chưa mượt mà hoặc luồng thao tác còn nhiều bước.

## 3. Đề xuất Hành động Cải tiến (Action Items for Prototype)
- **Cải thiện UI/UX:** Tinh gọn bố cục, giảm bớt thông tin thừa trên màn hình chính/card, làm nổi bật điểm cốt lõi (Match Score, trạng thái quá tải).
- **Tăng độ minh bạch:** Thêm tooltip hoặc phần giải thích ngắn gọn về cách tính `Match Score` ngay tại bảng gợi ý mapping.
- **Tối ưu hóa thao tác:** Rà soát lại luồng thêm task và thao tác kéo thả trên bảng Kanban để mượt mà hơn.
