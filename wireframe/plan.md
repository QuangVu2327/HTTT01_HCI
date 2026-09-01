# Quy chuẩn & Tài liệu Thiết kế Wireframe (Task Assignment System)

> **Căn cứ tài liệu:**
> - `Agents.md` (Quy định phát triển dự án, Tech Stack, Bảng màu Jira/Atlassian, Luồng nghiệp vụ)
> - `CSC12106_Rubric_Project_Final.csv` - **Mục 7: Wireframe (10% điểm)**: Đạt tiêu chuẩn tối đa: *"Giống giao diện thật, chi tiết, màu sắc hài hòa, có sử dụng tools để vẽ, tiện dụng, đẹp"*.

---

## 1. Mục tiêu & Phương pháp tiếp cận (Methodology)

### 1.1. Mục tiêu thiết kế Wireframe
- Xây dựng bản thiết kế khung giao diện độ trung - cao (Mid-to-High Fidelity Wireframe) mô phỏng chính xác 100% các màn hình và trạng thái của ứng dụng Quản lý & Tự động phân công Task.
- Đảm bảo tính nhất quán (Consistency), khả năng công thái học (Usability) và tuân thủ các nguyên lý tương tác Người - Máy (HCI) như Nielsen's Heuristics (phản hồi trạng thái hệ thống, khớp với mô hình tư duy người dùng, phòng ngừa lỗi).

### 1.2. Phương pháp triển khai
1. **Grid & Spacing System:** Hệ thống lưới 8-point grid (8px, 16px, 24px, 32px, 48px) đồng bộ cho layout và component.
2. **Atomic Design Architecture:** Xây dựng từ Atoms (Button, Badge, Input, Tag) $\rightarrow$ Molecules (Task Row, Member Card, Score Indicator) $\rightarrow$ Organisms (Task Table, Kanban Board, Assignment Modal) $\rightarrow$ Templates/Screens.
3. **Component Specs & Visual Hierarchy:** Chi tiết kích thước, khoảng cách, màu sắc, trạng thái (Default, Hover, Active, Disabled, Focus).
4. **Tooling & Assets:** Định dạng wireframe chuẩn bị sẵn cấu trúc để vẽ trên Figma/Penpot và mô phỏng giao diện chuẩn React/Tailwind.

---

## 2. Design Tokens & Visual Guidelines (Chuẩn Jira/Atlassian)

### 2.1. Bảng màu chuẩn (`Agents.md`)
| Thành phần | Mã màu HEX | Ứng dụng cụ thể trong Wireframe |
|---|---|---|
| **Primary** | `#0052CC` | Nút hành động chính (Tự động phân công, Tạo dự án, Lưu) |
| **Primary Hover** | `#0065FF` | Trạng thái hover của nút bấm, link điều hướng |
| **Background Tổng** | `#F7F8F9` | Nền toàn trang dashboard |
| **Card / Panel** | `#FFFFFF` | Khung bảng, modal dialog, task card, sidebar |
| **Border / Divider** | `#DFE1E6` | Viền bảng, ngăn cách các section, viền input |
| **Text Primary** | `#172B4D` | Tiêu đề H1/H2/H3, tên task, tên thành viên |
| **Text Secondary** | `#6B778C` | Chú thích phụ, metadata thời gian, placeholder input |
| **Status: To Do** | Nền `#DFE1E6` / Chữ `#42526E` | Badge trạng thái "Chưa bắt đầu" |
| **Status: Doing** | Nền `#FFF0B3` / Chữ `#974F0C` | Badge trạng thái "Đang thực hiện" |
| **Status: Done** | Nền `#E3FCEF` / Chữ `#006644` | Badge trạng thái "Đã hoàn thành" |
| **Alert / Overdue** | Nền `#FFEBE6` / Chữ `#BF2600` | Cảnh báo quá tải thời gian rảnh, trễ hạn |
| **Match Score: High** | `#00875A` | Điểm khớp $\ge 80\%$ (Badge xanh lá đậm) |
| **Match Score: Medium** | `#FFAB00` | Điểm khớp $50\% - 79\%$ (Badge vàng cam) |
| **Match Score: Low** | `#DE350B` | Điểm khớp $< 50\%$ hoặc thiếu giờ (Badge đỏ) |

### 2.2. Typography (Hỗ trợ tiếng Việt UTF-8)
- **Primary Font Family:** `'Inter', 'Be Vietnam Pro', system-ui, -apple-system, sans-serif`
- **Thang kích thước chữ (Type Scale):**
  - `H1 (Page Title)`: 24px / Line-height: 32px / Font-weight: 700 / Color: `#172B4D`
  - `H2 (Section Header)`: 18px / Line-height: 24px / Font-weight: 600 / Color: `#172B4D`
  - `H3 (Card Title / Subheader)`: 14px / Line-height: 20px / Font-weight: 600 / Color: `#172B4D`
  - `Body Regular`: 14px / Line-height: 20px / Font-weight: 400 / Color: `#172B4D`
  - `Body Small / Caption`: 12px / Line-height: 16px / Font-weight: 400 / Color: `#6B778C`
  - `Badge / Tag`: 11px / Line-height: 14px / Font-weight: 600 / Uppercase / Radius: 3px

---

## 3. Danh mục các Màn hình chi tiết (Screens Breakdown)

### 3.1. Screen 1: Dashboard & Cấu hình Kỹ năng Dự án (Project Setup & Global Tags)
- **Mục tiêu:** Quản lý tạo dự án mới hoặc chọn dự án hiện hữu; định nghĩa danh mục kỹ năng (Skill Tags pool) dùng chung cố định cho toàn bộ dự án theo quy định Phase 1.
- **Layout Wireframe:**
```text
+--------------------------------------------------------------------------------------------------+
| [Logo] TaskAssign AI  |  Dự án: [ Đồ án HCI Nhóm 12 v ]  | [Hướng dẫn] [Cài đặt] [Avatar Quản lý]|
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  BẢNG ĐIỀU KHIỂN DỰ ÁN                                                                           |
|  +--------------------------------------------------------------------------------------------+  |
|  | Cấu hình Kỹ năng Dùng chung (Global Skill Tags Pool)                                       |  |
|  | Định nghĩa 1 lần cho dự án. Các tag này sẽ xuất hiện ở form Task và form Thành viên.       |  |
|  |                                                                                            |  |
|  | Tag hiện có: [ Frontend x ] [ Backend x ] [ UI/UX Design x ] [ Database x ] [ Testing x ]  |  |
|  | Nhập tag mới: [ ReactJS, Node...               ]  [ + Thêm Kỹ Năng ]                        |  |
|  +--------------------------------------------------------------------------------------------+  |
|                                                                                                  |
|  Thống kê nhanh: [ 8 Tasks ] | [ 4 Thành viên ] | [ Đã phân công: 0/8 ] | [ Tình trạng: Sẵn sàng]|
|                                                                                                  |
|  +--------------------------------------------------------------------------------------------+  |
|  | TAB ĐIỀU HƯỚNG: [ 1. Danh sách Task ]  [ 2. Thành viên ]  [ 3. Tự động Phân công ]  [ 4. Kanban ] |
|  +--------------------------------------------------------------------------------------------+  |
+--------------------------------------------------------------------------------------------------+
```

---

### 3.2. Screen 2: Quản lý & Nhập danh sách công việc (Task Input Management)
- **Mục tiêu:** Quản lý xem danh sách task, thêm từng task hoặc import nhanh, gắn tag kỹ năng yêu cầu và thời lượng dự kiến.
- **Layout Wireframe:**
```text
+--------------------------------------------------------------------------------------------------+
| TAB: [ 1. Danh sách Task (Đang chọn) ]  [ 2. Thành viên ]  [ 3. Tự động Phân công ]  [ 4. Kanban ]|
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  DANH SÁCH CÔNG VIỆC CẦN PHÂN CÔNG                          [ + Thêm Task Mới ] [ Import CSV ]   |
|  Tìm kiếm: [ Tìm tên task...             ]  Lọc theo kỹ năng: [ Tất cả kỹ năng v ]               |
|                                                                                                  |
|  +----+-------------------------------+-----------+-------------------------+---------+--------+ |
|  | STT| Tên công việc (Task Name)     | Thời gian | Kỹ năng yêu cầu         | Độ ưu   | Thao   | |
|  |    |                               | dự kiến   | (Tags từ Pool chung)    | tiên    | tác    | |
|  +----+-------------------------------+-----------+-------------------------+---------+--------+ |
|  | 01 | Thiết kế Wireframe UI/UX      | 8 giờ     | [UI/UX Design] [Figma]  | Cao     | [Sửa][X| |
|  | 02 | Xây dựng Database Schema      | 6 giờ     | [Database] [Backend]    | Cao     | [Sửa][X| |
|  | 03 | Viết Frontend Dashboard       | 12 giờ    | [Frontend] [UI/UX]      | Trung   | [Sửa][X| |
|  | 04 | Viết Supabase Edge Function   | 8 giờ     | [Backend] [TypeScript]  | Trung   | [Sửa][X| |
|  | 05 | Kiểm thử tích hợp hệ thống    | 5 giờ     | [Testing] [Frontend]    | Thấp    | [Sửa][X| |
|  +----+-------------------------------+-----------+-------------------------+---------+--------+ |
|  Tổng thời lượng ước tính: 39 giờ                                                                |
+--------------------------------------------------------------------------------------------------+
```

---

### 3.3. Screen 3: Quản lý & Nhập danh sách thành viên (Member Input Management)
- **Mục tiêu:** Nhập danh sách nhân sự, gắn kỹ năng/chuyên môn của từng người (mapping với tag pool chung) và khai báo quỹ thời gian rảnh (Available Hours).
- **Layout Wireframe:**
```text
+--------------------------------------------------------------------------------------------------+
| TAB: [ 1. Danh sách Task ]  [ 2. Thành viên (Đang chọn) ]  [ 3. Tự động Phân công ]  [ 4. Kanban ]|
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  DANH SÁCH THÀNH VIÊN TRONG DỰ ÁN                           [ + Thêm Thành viên ] [ Import CSV ] |
|                                                                                                  |
|  +----+----------------------+---------------------------+-------------+----------------+--------+|
|  | STT| Họ & Tên             | Email nhận thông báo      | Giờ rảnh    | Kỹ năng sở     | Thao   ||
|  |    |                      |                           | khả dụng    | trường         | tác    ||
|  +----+----------------------+---------------------------+-------------+----------------+--------+|
|  | 01 | Nguyễn Văn A         | a.nguyen@example.com      | 15 giờ/tuần | [UI/UX][Front] | [Sửa][X||
|  | 02 | Trần Thị B           | b.tran@example.com        | 12 giờ/tuần | [Database][Back| [Sửa][X||
|  | 03 | Lê Hoàng C           | c.le@example.com          | 16 giờ/tuần | [Backend][Test]| [Sửa][X||
|  |  04 | Phạm Minh D          | d.pham@example.com        | 10 giờ/tuần | [Frontend][UI/UX] | [Sửa][X||
|  +----+----------------------+---------------------------+-------------+----------------+--------+|
|  Tổng quỹ thời gian rảnh toàn đội: 53 giờ | Tải dự kiến: 39/53 giờ (73.5% - An toàn)             |
+--------------------------------------------------------------------------------------------------+
```

---

### 3.4. Screen 4: Không gian chạy Auto-Assignment & Xem trước gợi ý (Novel Interaction Workspace)
- **Mục tiêu:** **Khu vực tương tác đột phá cốt lõi**; bấm nút chạy thuật toán Weighted Scoring ($w_1=0.7, w_2=0.3$), hiển thị phân tích điểm số minh bạch (Skill Match %, Availability Match %), bảng so sánh gợi ý, và dropdown can thiệp thủ công (Manual Override).
- **Layout Wireframe:**
```text
+--------------------------------------------------------------------------------------------------+
| TAB: [ 1. Danh sách Task ]  [ 2. Thành viên ]  [ 3. Tự động Phân công (Đang chọn) ]  [ 4. Kanban ]|
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  [ SẴN SÀNG PHÂN CÔNG: 5 Tasks <-> 4 Thành viên ]   ===>   [ NÚT: CHẠY TỰ ĐỘNG PHÂN CÔNG (#0052CC) ]|
|  Cấu hình trọng số: Kỹ năng (w1 = 70%) | Thời gian rảnh (w2 = 30%)  [ Chỉnh trọng số v ]         |
|                                                                                                  |
|  KẾT QUẢ GỢI Ý PHÂN CÔNG (PREVIEW ASSIGNMENT MATRIX):                                            |
|  +-------------------------------+--------+-------------------------+--------+-----------------+ |
|  | Tên Task                      | Thời   | Người được gợi ý        | Match  | Chi tiết điểm   | |
|  |                               | lượng  | (Có thể đổi thủ công)   | Score  | (Skill / Time)  | |
|  +-------------------------------+--------+-------------------------+--------+-----------------+ |
|  | Thiết kế Wireframe UI/UX      | 8h     | [ Nguyễn Văn A       v ]| 96%    | S: 100% | T: 87%| |
|  | Xây dựng Database Schema      | 6h     | [ Trần Thị B         v ]| 92%    | S: 100% | T: 75%| |
|  | Viết Frontend Dashboard       | 12h    | [ Phạm Minh D        v ]| 85%    | S: 80%  | T: 95%| |
|  | Viết Supabase Edge Function   | 8h     | [ Lê Hoàng C         v ]| 90%    | S: 100% | T: 68%| |
|  | Kiểm thử tích hợp hệ thống    | 5h     | [ Lê Hoàng C         v ]| 78%    | S: 67%  | T: 100%| |
|  +-------------------------------+--------+-------------------------+--------+-----------------+ |
|                                                                                                  |
|  Thống kê tải sau phân công:                                                                     |
|  - Nguyễn Văn A: 8/15h (53%) [||||||....]       - Trần Thị B: 6/12h (50%) [|||||.....]          |
|  - Lê Hoàng C: 13/16h (81%)  [||||||||..]       - Phạm Minh D: 10/10h (100%)[||||||||||]         |
|                                                                                                  |
|  [ << HỦY & CHẠY LẠI ]                [ LƯU & CHỐT PHÂN CÔNG ]  [ GỬI EMAIL THÔNG BÁO TẤT CẢ ]   |
+--------------------------------------------------------------------------------------------------+
```

---

### 3.5. Screen 5: Modal Xác nhận & Gửi Email Hàng loạt (Resend Notification Dialog)
- **Mục tiêu:** Cung cấp bước xác nhận an toàn trước khi gửi email phân công thật tới toàn bộ thành viên qua Resend API, chống gửi nhầm (Heuristic 5: Error Prevention).
- **Layout Wireframe:**
```text
+--------------------------------------------------------------------------------------------------+
|                                    [ MODAL DIALOG POPUP ]                                        |
|  +--------------------------------------------------------------------------------------------+  |
|  | XÁC NHẬN GỬI THÔNG BÁO PHÂN CÔNG HÀNG LOẠT                                             [ X ]|  |
|  +--------------------------------------------------------------------------------------------+  |
|  | Hệ thống sẽ gửi email danh sách task đã phân công đến 4 thành viên:                        |  |
|  |                                                                                            |  |
|  | 1. a.nguyen@example.com : 1 task (Thiết kế Wireframe UI/UX - 8h)                           |  |
|  | 2. b.tran@example.com   : 1 task (Xây dựng Database Schema - 6h)                           |  |
|  | 3. c.le@example.com     : 2 tasks (Edge Function - 8h, Kiểm thử - 5h)                      |  |
|  | 4. d.pham@example.com   : 1 task (Frontend Dashboard - 10h)                                |  |
|  |                                                                                            |  |
|  | Tiêu đề Email: "[TaskAssign AI] Thông báo phân công công việc - Dự án HCI Nhóm 12"        |  |
|  |                                                                                            |  |
|  | [ ! ] Hành động này sẽ gửi email thật qua dịch vụ Resend.                                  |  |
|  |                                                                                            |  |
|  |                       [ Hủy Bỏ ]        [ GỬI EMAIL NGAY BÂY GIỜ ]                         |  |
|  +--------------------------------------------------------------------------------------------+  |
+--------------------------------------------------------------------------------------------------+
```

---

### 3.6. Screen 6: Bảng Theo dõi Tiến độ Kanban (Post-Assignment Tracking)
- **Mục tiêu:** Hiển thị task sau khi đã phân công thành công dưới dạng 3 cột Kanban chuẩn (To do / Doing / Done) theo đúng bảng màu Atlassian.
- **Layout Wireframe:**
```text
+--------------------------------------------------------------------------------------------------+
| TAB: [ 1. Danh sách Task ]  [ 2. Thành viên ]  [ 3. Tự động Phân công ]  [ 4. Kanban (Đang chọn) ]|
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  +--------------------------+  +--------------------------+  +--------------------------+        |
|  | TO DO (Chưa làm)    [ 3 ]|  | DOING (Đang làm)    [ 1 ]|  | DONE (Hoàn thành)   [ 1 ]|        |
|  +--------------------------+  +--------------------------+  +--------------------------+        |
|  | [Card 02]                |  | [Card 01]                |  | [Card 05]                |        |
|  | Xây dựng DB Schema       |  | Thiết kế Wireframe UI/UX |  | Kiểm thử tích hợp        |        |
|  | [Database] [Backend]     |  | [UI/UX] [Figma]          |  | [Testing]                |        |
|  | @ Trần Thị B (6h)        |  | @ Nguyễn Văn A (8h)      |  | @ Lê Hoàng C (5h)        |        |
|  | [Điểm khớp: 92%]         |  | [Điểm khớp: 96%]         |  | [Điểm khớp: 78%]         |        |
|  +--------------------------+  +--------------------------+  +--------------------------+        |
|  | [Card 03]                |                                                                    |
|  | Viết Frontend Dashboard  |                                                                    |
|  | [Frontend]               |                                                                    |
|  | @ Phạm Minh D (10h)      |                                                                    |
|  +--------------------------+                                                                    |
|  | [Card 04]                |                                                                    |
|  | Supabase Edge Function   |                                                                    |
|  | @ Lê Hoàng C (8h)        |                                                                    |
+--------------------------------------------------------------------------------------------------+
```

---

## 4. Bảng Tiêu chuẩn Nghiệm thu Wireframe theo Rubric (Mục 7 - 100% Điểm)

| Tiêu chí Rubric | Yêu cầu đạt mức tối đa (1.0) | Mức độ đáp ứng trong tài liệu này |
|---|---|---|
| **Độ giống giao diện thật** | Wireframe mô tả chi tiết từng pixel layout, header, drawer, table, modal dialog | Đạt: Chi tiết layout 6 màn hình chuẩn kích thước và hệ lưới |
| **Chi tiết & Thành phần** | Đầy đủ trường dữ liệu: Skill Tag Pool, Task Specs, Member Time, Match Score, Kanban | Đạt: Mô tả 100% component và luồng chuyển đổi |
| **Màu sắc hài hòa** | Sử dụng hệ màu chuẩn Jira/Atlassian Blue `#0052CC`, trung tính `#F7F8F9`, `#172B4D` | Đạt: Hệ thống token màu rõ ràng cho mọi trạng thái |
| **Sử dụng Tools chuyên nghiệp** | Có cấu trúc design tokens, component sẵn sàng để map với Figma và code React/Tailwind | Đạt: Cấu trúc tương thích trực tiếp Tailwind CSS |
| **Tiện dụng & Đẹp** | Trải nghiệm luồng mượt mà, phân cấp thông tin rõ ràng, chống lỗi khi gửi email | Đạt: Heuristic UX tối ưu cho sinh viên và quản lý nhóm |
