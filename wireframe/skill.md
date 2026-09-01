# Skill: Thiết kế Giao diện Khung (Wireframe & Information Architecture)

## 1. Purpose (Mục đích)
Xây dựng bản thiết kế cấu trúc thông tin (Information Architecture) và khung giao diện (Wireframe) trung - cao cấp (Mid-to-High Fidelity) cho ứng dụng Quản lý & Tự động phân công Task, đảm bảo trực quan hóa chính xác các luồng tương tác người dùng, cơ chế phân công thông minh và trải nghiệm mượt mà theo chuẩn Jira/Atlassian.

## 2. Domain Knowledge (Kiến thức miền)
- **HCI Principles (Nguyên tắc Tương tác Người - Máy):**
  - *Visibility of System Status:* Luôn phản hồi trạng thái hệ thống (loading khi chạy thuật toán, thông báo kết quả phân công).
  - *Match between System and the Real World:* Thuật ngữ quản lý dự án quen thuộc (Task, Thành viên, Kỹ năng, Kanban, Trọng số).
  - *Error Prevention:* Xác nhận kỹ trước khi thực hiện hành động nhạy cảm như gửi email hàng loạt qua Resend.
- **Workflow & Business Logic của Hệ thống:**
  - Định nghĩa Global Skill Tags Pool (dùng chung cố định cho dự án).
  - Khai báo Task (tên, thời gian dự kiến, tag yêu cầu).
  - Khai báo Member (tên, email, quỹ thời gian rảnh, sở trường).
  - Auto-Assignment (Weighted Scoring: $w_1 \times \text{skill\_score} + w_2 \times \text{availability\_score}$, với mặc định $w_1=0.7, w_2=0.3$, giải quyết xung đột bằng thuật toán tham lam - greedy).
  - Manual Override (cho phép quản lý chỉnh sửa thủ công gợi ý hệ thống).

## 3. Reasoning & Inference Strategy (Chiến lược suy luận & Thiết kế)
- **Hierarchical Layout Strategy:** Sắp xếp bố cục theo thứ tự ưu tiên thị giác (Visual Hierarchy): Tiêu đề trang $\rightarrow$ Thanh công cụ / Tabs điều hướng $\rightarrow$ Nội dung chính (Bảng/Kanban) $\rightarrow$ Hành động phụ (Footer actions).
- **Component-Driven Thinking:** Xây dựng các khối UI từ nguyên tử nhỏ nhất (Tag, Badge, Button) đến các tổ hợp lớn (Task Row, Member Card, Assignment Preview Table).
- **Data-Driven Wireframing:** Đảm bảo mọi màn hình wireframe đều phản ánh đúng cấu trúc dữ liệu cơ sở dữ liệu Supabase (Postgres tables: projects, skill_tags, tasks, members, assignments).

## 4. Validation Rules (Quy tắc kiểm định)
- Mọi màn hình cốt lõi theo `Agents.md` phải được mô tả đầy đủ (Dashboard, Task Input, Member Input, Auto-Assignment Workspace, Resend Modal, Kanban Board).
- Phải có chỉ số đánh giá điểm mapping (Match Score) và trực quan hóa tải công việc (Workload bar) để người dùng nắm bắt thông tin nhanh chóng.
- Đảm bảo tính nhất quán về mã màu (Atlassian Blue `#0052CC`, trạng thái To do/Doing/Done, điểm số Xanh/Vàng/Đỏ).

## 5. Failure Handling (Xử lý lỗi & Ngoại lệ)
- **Thiếu thông tin trường dữ liệu:** Bổ sung đầy đủ các cột trạng thái, nút thao tác (`[Sửa]`, `[Xóa]`, `[Thêm]`) trong wireframe bảng.
- **Quá tải thông tin trên màn hình:** Phân chia thành các Tab rõ ràng (Tab 1: Task, Tab 2: Thành viên, Tab 3: Phân công, Tab 4: Kanban) thay vì dồn tất cả vào một trang.
