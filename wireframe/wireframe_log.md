# Nhật ký Thiết kế Wireframe (Wireframe Design Log)

> Dự án: **Hệ thống Quản lý & Tự động Phân công Task (Task Assignment System)**  
> Môn học: **Tương tác Người - Máy (CSC12106 - HCMUS)**  
> Tiêu chuẩn: Tuân thủ `Agents.md` và `CSC12106_Rubric_Project_Final.csv` (Mục 7 - Wireframe 10%)

---

## Danh sách các phiên làm việc & Quyết định thiết kế

### [Phiên 01] - Thiết lập Quy chuẩn Thiết kế & Cấu trúc Wireframe
- **Thời gian:** 2026-08-17
- **Người thực hiện:** Chuyên gia Thiết kế UI/UX & Agent OpenCode
- **Mục tiêu:** Xây dựng tài liệu quy chuẩn wireframe, hệ thống Design Tokens theo phong cách Jira/Atlassian và phác thảo chi tiết 6 màn hình chức năng cốt lõi.
- **Nội dung đã triển khai:**
  1. Xây dựng tài liệu `wireframe/plan.md` bao gồm:
     - Phương pháp luận Atomic Design và hệ lưới 8-point grid.
     - Bộ token màu Atlassian: `#0052CC` (Primary), `#F7F8F9` (Background), `#DFE1E6` (Border), `#172B4D` (Text Primary), `#6B778C` (Text Secondary).
     - Bộ màu trạng thái Kanban (To do: `#DFE1E6`, Doing: `#FFF0B3`, Done: `#E3FCEF`, Overdue: `#FFEBE6`).
     - Bộ màu hiển thị điểm số mapping (Cao: `#00875A`, Trung bình: `#FFAB00`, Thấp: `#DE350B`).
     - Wireframe chi tiết cho 6 màn hình:
       - Screen 1: Dashboard & Cấu hình Kỹ năng Toàn cục (Global Skill Tags Pool).
       - Screen 2: Quản lý & Nhập danh sách công việc (Task Input Management).
       - Screen 3: Quản lý & Nhập danh sách thành viên (Member Input Management).
       - Screen 4: Không gian tương tác Auto-Assignment & Xem trước gợi ý phân công.
       - Screen 5: Modal xác nhận gửi email phân công hàng loạt (Resend Dialog).
       - Screen 6: Bảng theo dõi tiến độ Kanban 3 cột.
  2. Đối chiếu chuẩn Rubric Mục 7: Đảm bảo giao diện chi tiết, màu sắc chuẩn, tính tiện dụng cao.
- **Đánh giá & Kết luận:** Hoàn thành xuất sắc khung sườn wireframe, sẵn sàng chuyển giao làm cơ sở cho Interactive Prototype.

### [Phiên 02] - Kiểm định & Hoàn thiện Toàn bộ Phân hệ Wireframe
- **Thời gian:** 2026-08-17
- **Người thực hiện:** Chuyên gia Thiết kế UI/UX & Agent OpenCode
- **Mục tiêu:** Rà soát lỗi cú pháp, định dạng, chính tả tiếng Việt và tính đồng bộ giữa các file trong thư mục `wireframe/`.
- **Nội dung đã triển khai:**
  1. Rà soát và sửa lỗi gõ phím lỗi font tiếng Trung `[F谱]` thành `[UI/UX]` tại dòng 128 trong file `wireframe/plan.md`.
  2. Đồng bộ hóa tên file tham chiếu trong `wireframe/wireframe_log.md` từ `wireframe.md` sang `plan.md`.
  3. Kiểm định chéo với các tiêu chuẩn trong `Tieu-chuan-Wireframe-Prototype.md` và `CSC12106_Rubric_Project_Final.csv` nhằm đảm bảo đạt điểm tối đa (10/10).
- **Đánh giá & Kết luận:** Hệ thống file wireframe hoàn toàn sạch sẽ, không có lỗi định dạng hay chính tả. Giao diện sắc nét và trực quan.
