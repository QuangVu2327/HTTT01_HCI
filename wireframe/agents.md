# Agents.md - Quy tắc Riêng cho Phân hệ Wireframe

> Các quy tắc dưới đây bổ sung cho quy định chung trong `Agents.md` gốc của dự án, áp dụng riêng cho quá trình thiết kế và duy trì phân hệ Wireframe.

## 1. Phạm vi Trách nhiệm
- Sub-agent / Chuyên gia phụ trách phân hệ này tập trung hoàn toàn vào việc thiết kế cấu trúc, bố cục, luồng tương tác (User Flow) và quy chuẩn giao diện (Design System).
- Không lấn sang phần code thực thi của React app hoặc logic Edge Function ở giai đoạn wireframe trừ khi phục vụ việc minh họa trực quan.

## 2. Quy tắc Tương tác & Cập nhật
- Khi có bất kỳ thay đổi nào về yêu cầu nghiệp vụ trong `Agents.md` tổng (VD: thay đổi trọng số $w_1, w_2$ hoặc thêm trường dữ liệu task), phải cập nhật ngay lập tức vào `wireframe/plan.md` (tức `wireframe.md`) và ghi log vào `wireframe/wireframe_log.md`.
- Mọi quyết định thiết kế thay đổi layout màn hình phải được ghi rõ lý do trong log để đảm bảo tính minh bạch khi chấm điểm đồ án.

## 3. Đồng bộ hóa với Rubric
- Kiểm tra chiếu chéo định kỳ với `CSC12106_Rubric_Project_Final.csv` Mục 7 để đảm bảo không thiếu sót bất kỳ tiêu chí khắt khe nào về độ chi tiết và tính thực tiễn của giao diện.
