# Nhật ký Thay đổi - Phân hệ Prototype (Prototype Changelog)

> Mọi thay đổi lớn, cập nhật tính năng, sửa lỗi lập trình và kiểm định kỹ thuật của phân hệ Prototype đều được ghi lại tại đây.

---

## [2026-09-02] - Tối ưu hóa Kanban & Hoàn thành Kiểm định Test Cases
### Cải tiến Tính năng & Kiểm thử (Atomic Implementation)
- Tối ưu hóa bảng Kanban (giảm bớt thao tác rườm rà, hỗ trợ chuyển trạng thái task mượt mà ngay trên card).
- Hoàn tất kiểm thử và cập nhật trạng thái toàn bộ 7 Test Cases (`TC-01` đến `TC-07`) trong tài liệu kế hoạch.
- Chạy kiểm tra biên dịch sản phẩm thành công tuyệt đối (`npm run build`).

---

## [2026-09-02] - Phát triển `ScoreTooltip` & Tăng tính Minh bạch Thuật toán
### Cải tiến Tính năng (Atomic Implementation)
- Tạo component `ScoreTooltip.jsx` giúp giải thích chi tiết công thức Weighted Scoring (`0.7 * Skill + 0.3 * Availability`) ngay tại bảng preview kết quả phân công.
- Tích hợp thành công component vào `AssignmentWorkspace.jsx` (`App.jsx`).
- Kiểm tra biên dịch sản phẩm hoàn tất thành công (`npm run build`).

---

## [2026-09-02] - Tinh gọn Giao diện & Điều hướng
### Tối ưu hóa UI (Atomic Change)
- Rút gọn nhãn các tab điều hướng trên header (`Tổng quan`, `Tasks`, `Nhân sự`, `Phân công AI`, `Kanban`) giúp giao diện thoáng đãng, dễ thao tác và không bị rối mắt.
- Chạy kiểm tra biên dịch thành công (`npm run build`).

### Thay đổi hệ thống (System Configuration)
- Thiết lập quy trình tự động cập nhật nhật ký (`changelog.md`, `messages.md`) riêng biệt cho từng thư mục con thay vì tập trung tại root.
- Tạo mới `prototype/messages.md` và đồng bộ hóa cấu trúc ghi nhật ký trao đổi theo quy định tại `Agents.md`.

---

## [2026-08-17] - Tổ chức lại Thư mục: Độc lập hóa Phân hệ Prototype

### Thay đổi cấu trúc (Reorganization)
- Di chuyển toàn bộ mã nguồn React app (bao gồm `src/`, `package.json`, `index.html`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `.gitignore`) từ thư mục gốc vào bên trong thư mục `prototype/`.
- Thiết lập `prototype/` thành một module độc lập, khép kín hoàn toàn giúp dễ dàng tải lên Git cho đồng đội.
- Dọn dẹp và xóa bỏ các tệp tin trùng lặp ở thư mục gốc để tránh xung đột mã nguồn.

### Kiểm thử biên dịch (Build Verification)
- Thực thi kiểm thử chạy `npm run build` trực tiếp bên trong thư mục `prototype/` và đạt trạng thái biên dịch thành công xuất sắc (4.24s).

---

## [2026-08-17] - Thực thi Lập trình & Biên dịch Thành công Prototype Trực quan

### Lập trình & Cài đặt
- Thiết lập môi trường React + Vite + Tailwind CSS và Lucide Icons.
- Lập trình giao diện Dashboard tương tác đa dạng tại `src/App.jsx` bao gồm: Dashboard tổng quan, Task input, Member input, Auto-assignment workspace, Resend simulation, Kanban progress board, và Live workload chart.
- Cài đặt thuật toán phân bổ tối ưu tại `src/utils/assignmentAlgorithm.js` dựa trên công thức Weighted Scoring ($w_1=0.7, w_2=0.3$) và Greedy Match.
- Thực thi thành công `npm install` và `npm run build` lần đầu (đạt 4.55s).

---

## [2026-08-17] - Thiết lập Quy chuẩn Kế hoạch Prototype

### Khởi tạo
- Tạo cấu trúc thư mục riêng biệt `prototype/` chứa đầy đủ các tài liệu quy chuẩn kỹ thuật:
  - `skill.md`: Định nghĩa kiến thức React + Vite, thuật toán phân công và kịch bản kiểm thử.
  - `rules.md`: Quy tắc nghiệp vụ, quy tắc chất lượng code và phong cách UI tiếng Việt.
  - `agents.md`: Quy tắc vận hành riêng cho phân hệ prototype và kiểm tra biên dịch.
  - `plan.md`: Kế hoạch chi tiết kiến trúc component React, công thức toán học phân công và kịch bản 7 test cases kiểm thử.
  - `prototype_log.md`: Nhật ký phiên làm việc đầu tiên.
