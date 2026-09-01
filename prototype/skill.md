# Skill: Xây dựng Prototype & Tương tác Nâng cao (Interactive Prototype & Software Simulation)

## 1. Purpose (Mục đích)
Hiện thực hóa bản thiết kế wireframe thành một sản phẩm nguyên mẫu tương tác (Interactive Prototype / Frontend Application) hoạt động mượt mà, minh họa trọn vẹn quy trình nghiệp vụ tự động phân công task và gửi thông báo hàng loạt.

## 2. Domain Knowledge (Kiến thức miền)
- **Frontend Architecture (React + Vite + Tailwind CSS):**
  - Xây dựng component dạng modular, dễ quản lý state (danh sách task, danh sách thành viên, trạng thái phân công, modal dialog).
  - Áp dụng chuẩn màu sắc Jira/Atlassian đã quy định trong `Agents.md`.
- **Core Algorithm Implementation (Thuật toán Phân công):**
  - Xây dựng hàm tính điểm phù hợp `calculateMatchScore(task, member)` dựa trên công thức weighted scoring:
    $$\text{Total Score} = w_1 \times \text{Skill Score} + w_2 \times \text{Availability Score}$$
  - Thuật toán Greedy Assignment: Sắp xếp task theo độ ưu tiên / thời lượng, duyệt và gán cho thành viên có điểm cao nhất chưa vượt quá quỹ thời gian rảnh.
- **Notification Simulation (Resend Integration Simulation):**
  - Mô phỏng quá trình gọi API gửi email hàng loạt qua Resend, có bước xác nhận dialog an toàn.

## 3. Reasoning & Inference Strategy (Chiến lược Kỹ thuật & Thực thi)
- **Component State Management:** Sử dụng React Hooks (`useState`, `useEffect`) để đồng bộ dữ liệu giữa Tab Task, Tab Thành viên, Tab Phân công và Tab Kanban.
- **Self-Verification Loop:** Kiểm tra tính chính xác của thuật toán phân công bằng các test case giả định (vd: task yêu cầu Frontend được gán đúng cho nhân viên có skill Frontend và đủ giờ rảnh).
- **Responsive & Usability Check:** Đảm bảo giao diện prototype tương thích tốt trên cả desktop (màn hình quản lý chính) và mobile.

## 4. Validation Rules (Quy tắc Kiểm định Prototype)
- Prototype phải chạy được không có lỗi biên dịch (no compile errors).
- Phải minh họa được tối thiểu 30%-100% quy trình nghiệp vụ cốt lõi theo Mục 8 của Rubric (`Software product`).
- Hiển thị rõ ràng điểm số mapping (Match Score) và cho phép người dùng thay đổi thủ công (Manual Override).

## 5. Failure Handling (Xử lý lỗi & Ngoại lệ)
- **Tràn thời gian rảnh của thành viên:** Hiển thị cảnh báo màu đỏ (`#FFEBE6` / `#BF2600`) khi tổng thời lượng task được gán vượt quá quỹ thời gian rảnh khả dụng của thành viên.
- **Thiếu kỹ năng yêu cầu:** Xử lý hiển thị điểm số thấp (<50%) và badge cảnh báo tương ứng.
