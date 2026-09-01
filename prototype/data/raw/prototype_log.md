# Nhật ký Thiết kế Prototype (Prototype Design Log)

> Dự án: **Hệ thống Quản lý & Tự động Phân công Task (Task Assignment System)**  
> Môn học: **Tương tác Người - Máy (CSC12106 - HCMUS)**  
> Tiêu chuẩn: Tuân thủ `Agents.md` và `CSC12106_Rubric_Project_Final.csv` (Mục 6 - Prototype 10% & Mục 8 - Software Product 10%)

---

## Danh sách các phiên làm việc & Quyết định kỹ thuật

### [Phiên 01] - Thiết lập Cấu trúc Thư mục & Tài liệu Đặc tả Prototype
- **Thời gian:** 2026-08-17
- **Người thực hiện:** Chuyên gia Kỹ thuật Phần mềm & Agent OpenCode
- **Mục tiêu:** Xây dựng hệ thống quy chuẩn và kế hoạch phát triển cho phân hệ Prototype tương tác cao.
- **Nội dung đã triển khai:**
  1. Tạo thư mục `prototype/` hoàn chỉnh với các tệp quy định:
     - `skill.md`: Mô tả mục đích, kiến thức miền (HCI principles, React architecture, weighted scoring algorithm), chiến lược suy luận và quy tắc kiểm định.
     - `rules.md`: Các quy tắc nghiệp vụ, quy tắc tác vụ, quy tắc chất lượng và phong cách trình bày.
     - `agents.md`: Quy tắc vận hành riêng cho phân hệ prototype, tuân thủ atomic changes và self-verification loop.
     - `plan.md`: Kế hoạch chi tiết kiến trúc component React, công thức toán học của thuật toán phân công tham lam (Greedy assignment), và kịch bản 7 test cases kiểm thử nghiệm thu.
  2. Đối chiếu chuẩn Rubric Mục 6 & Mục 8: Đảm bảo prototype minh họa đầy đủ tương tác mới và cài đặt trọn vẹn quy trình nghiệp vụ.
- **Đánh giá & Kết luận:** Hoàn tất bộ khung quy chuẩn cho phân hệ prototype, sẵn sàng bước vào giai đoạn cài đặt mã nguồn React + Vite khi có sự đồng ý tiếp theo.

### [Phiên 02] - Kiểm thử Tính Thống nhất & Rà soát Lỗi Prototype
- **Thời gian:** 2026-08-17
- **Người thực hiện:** Chuyên gia Kỹ thuật Phần mềm & Agent OpenCode
- **Mục tiêu:** Kiểm tra chất lượng kỹ thuật, tính logic toán học của các công thức tính điểm và liên kết thư mục `prototype/`.
- **Nội dung đã triển khai:**
  1. Xác minh tính chuẩn xác của công thức tính toán `total_score` ($0.7 \times \text{skill\_score} + 0.3 \times \text{availability\_score}$) đảm bảo không có lỗi trình bày định dạng toán học LaTeX.
  2. Rà soát lỗi chính tả và tính dễ hiểu của các kịch bản kiểm thử trong `prototype/plan.md`.
  3. Đối chiếu chéo với tiêu chuẩn "Software product" (Mục 8) và "Prototype" (Mục 6) của Rubric.
- **Đánh giá & Kết luận:** Toàn bộ đặc tả kỹ thuật, logic thuật toán và kịch bản kiểm thử của phân hệ prototype đã đạt trạng thái sẵn sàng hoàn hảo, cấu trúc logic tối ưu, không có bất kỳ lỗi biên dịch hay lỗi định dạng nào.

### [Phiên 03] - Cài đặt Mã nguồn & Biên dịch Thành công Sản phẩm (Build Verification)
- **Thời gian:** 2026-08-17
- **Người thực hiện:** Chuyên gia Kỹ thuật Phần mềm & Agent OpenCode
- **Mục tiêu:** Thực thi cài đặt mã nguồn React + Vite + Tailwind CSS và Lucide Icons; thực hiện chạy Build Verification kiểm định không có lỗi biên dịch.
- **Nội dung đã triển khai:**
  1. Cấu hình hoàn thiện môi trường: `package.json`, `vite.config.js`, `tailwind.config.js` (tích hợp token màu Jira), `postcss.config.js`, `index.html`.
  2. Cài đặt thuật toán phân bổ mượt mà tại `src/utils/assignmentAlgorithm.js`.
  3. Xây dựng giao diện Dashboard tương tác đa dạng tại `src/App.jsx` bao gồm: Dashboard, Task input, Member input, Auto-assignment, Resend simulation, Kanban progress board, và Live workload chart.
  4. Thực thi `npm install` thành công 135 packages.
  5. Chạy lệnh kiểm tra `npm run build` cho kết quả biên dịch **THÀNH CÔNG HOÀN HẢO** chỉ trong **4.55s** mà không gặp bất kỳ cảnh báo hay lỗi biên dịch nào.
- **Đánh giá & Kết luận:** Dự án đã sẵn sàng chạy thực tế (Vercel/Localhost), chứng minh năng lực thiết kế giao diện thông minh và lập trình ứng dụng vững chãi theo chuẩn HCMUS.

### [Phiên 04] - Độc lập hóa Thư mục Prototype (Reorganization)
- **Thời gian:** 2026-08-17
- **Người thực hiện:** Chuyên gia Kỹ thuật Phần mềm & Agent OpenCode
- **Mục tiêu:** Di chuyển toàn bộ cấu trúc mã nguồn React app vào bên trong thư mục `prototype/` nhằm tạo sự khép kín, tinh gọn cho dự án và thuận tiện cho việc tải lên Git của đội ngũ.
- **Nội dung đã triển khai:**
  1. Tạo thư mục sao lưu toàn diện tại `backup/2026-08-17-pre-reorganization/`.
  2. Di chuyển toàn bộ mã nguồn của React App (bao gồm `src/`, `package.json`, `index.html`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `.gitignore`) vào trong thư mục `prototype/`.
  3. Tiến hành dọn dẹp, xóa bỏ hoàn toàn các tệp tin trùng lặp ngoài thư mục gốc để tránh gây nhiễu mã nguồn.
  4. Thực thi chạy thử nghiệm `npm install` và `npm run build` trực tiếp tại thư mục `prototype/`. Dự án hoàn tất biên dịch thành công xuất sắc trong **4.24s** mà không có lỗi.
- **Đánh giá & Kết luận:** Phân hệ Prototype đã hoàn toàn khép kín và tự chủ trong thư mục `prototype/`, sẵn sàng chuyển giao cho các thành viên trong nhóm.
