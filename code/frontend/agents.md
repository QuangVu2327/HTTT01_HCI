# Agents.md - Quy tắc Riêng cho Phân hệ Prototype

> Các quy tắc dưới đây bổ sung cho quy định chung trong `Agents.md` gốc của dự án, áp dụng riêng cho quá trình phát triển và kiểm thử Prototype.

## 1. Phạm vi Trách nhiệm
- Sub-agent / Chuyên gia phụ trách phân hệ này chịu trách nhiệm hiện thực hóa logic thuật toán mapping, xây dựng giao diện tương tác và kiểm thử kỹ thuật (Build & Verify).

## 2. Quy tắc Thực thi & Kiểm thử
- Trước khi xác nhận hoàn thành bất kỳ tính năng code nào trong prototype, bắt buộc phải chạy kiểm tra biên dịch (build check) để đảm bảo không có lỗi cú pháp hoặc lỗi TypeScript/React.
- Giữ các bản sao lưu trong thư mục `backup/` trước khi thực hiện các thay đổi lớn đối với mã nguồn prototype.

## 3. Đồng bộ hóa với Rubric
- Đối chiếu với Mục 6 (Prototype) và Mục 8 (Software product) trong `CSC12106_Rubric_Project_Final.csv` để đảm bảo tính năng tương tác mới và quy trình nghiệp vụ được cài đặt đạt mức tối đa (100%).
