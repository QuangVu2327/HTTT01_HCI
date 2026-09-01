# Tiêu chuẩn Wireframe \& Prototype

## Hệ thống hỗ trợ phân công \& quản lý công việc (Skill-based Task Assignment System)

Tài liệu này cụ thể hóa mục **6 (Wireframe)** và **7 (Prototype)** trong bảng rubric, giúp nhóm đạt mức điểm cao nhất: *"giống giao diện thật, chi tiết, màu sắc hài hòa, dùng tool vẽ, tiện dụng, đẹp"* và *"đầy đủ thành phần, minh họa tương tác mới, vững chắc"*.

\---

## PHẦN A — TIÊU CHUẨN CHUNG (ÁP DỤNG CHO MỌI MÀN HÌNH)

### A.1. Công cụ \& tổ chức file

* **Công cụ bắt buộc dùng tool** (không vẽ tay để đạt điểm tối đa mục Wireframe): **Figma** (khuyến nghị) hoặc Adobe XD.
* Tổ chức Figma thành 3 Page riêng biệt:

  1. `01\\\_Wireframe (Lo-fi)` — bố cục xám trắng đen, tập trung layout \& luồng, chưa có màu thương hiệu.
  2. `02\\\_Wireframe (Hi-fi / UI)` — áp màu, font, icon thật, xem như bản dựng gần cuối.
  3. `03\\\_Prototype` — liên kết các frame Hi-fi bằng Figma Prototype (click, transition), có Flow riêng cho từng luồng người dùng.
* Đặt tên frame theo cú pháp: `\\\[Số]\\\_\\\[TênMànHình]\\\_\\\[Trạng thái]` — ví dụ: `04\\\_TaskList\\\_Empty`, `04\\\_TaskList\\\_Filled`.

### A.2. Grid \& kích thước khung hình

|Nền tảng|Frame size|Grid|Gutter|Margin|
|-|-|-|-|-|
|Desktop|1440 × 1024 px|12 cột|24px|80px (hoặc 64px nếu màn hẹp)|
|Mobile|375 × 812 px (iPhone X)|4 cột|16px|16px|

* Bắt buộc dựng **ít nhất 1 phiên bản mobile responsive** cho: Kanban board và Task detail (đúng yêu cầu "Responsive" trong Agents.md mục 4).

### A.3. Spacing scale

Dùng bội số của 4px: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64`. Không dùng số lẻ (ví dụ 15px, 22px) — giữ nhất quán để "trình bày rõ ràng, đẹp".

### A.4. Bảng màu (lấy đúng theo Agents.md mục 4 — không tự chế thêm màu ngoài bảng)

|Vai trò|Mã màu|
|-|-|
|Primary|`#0052CC`|
|Primary Hover|`#0065FF`|
|Nền trang|`#F7F8F9`|
|Nền card|`#FFFFFF`|
|Border|`#DFE1E6`|
|Text chính|`#172B4D`|
|Text phụ|`#6B778C`|
|To do|nền `#DFE1E6` / chữ `#42526E`|
|Doing|nền `#FFF0B3` / chữ `#974F0C`|
|Done|nền `#E3FCEF` / chữ `#006644`|
|Trễ hạn/Gấp|nền `#FFEBE6` / chữ `#BF2600`|
|Score cao|`#00875A`|
|Score trung bình|`#FFAB00`|
|Score thấp|`#DE350B`|

### A.5. Typography

* Font: **Inter** (chính), fallback **Be Vietnam Pro** cho dấu tiếng Việt đầy đủ.
* Scale đề xuất:

|Cấp|Size / Weight|Dùng cho|
|-|-|-|
|H1|24px / Semibold|Tiêu đề trang|
|H2|18px / Semibold|Tiêu đề section/card|
|Body|14px / Regular|Nội dung bảng, form|
|Caption|12px / Regular|Ghi chú, badge, timestamp|
|Button|14px / Medium|Nhãn nút|

### A.6. Component chuẩn cần dựng trong Design System (trước khi vẽ màn hình)

Xây 1 trang `00\\\_Design System` gồm: Button (primary/secondary/disabled/loading), Input field (default/focus/error), Badge trạng thái (To do/Doing/Done/Trễ hạn), Badge score (cao/tb/thấp), Avatar thành viên, Task card, Table row, Modal/Dialog, Toast thông báo, Sidebar navigation, Top navbar. Đây là bằng chứng "dùng tool, tiện dụng" mà giám khảo dễ thấy ngay từ đầu file Figma.

### A.7. Trạng thái bắt buộc cho mỗi màn hình có dữ liệu động

Mỗi màn hình danh sách/bảng phải có tối thiểu 3 state: **Empty state** (chưa có dữ liệu, có icon + câu hướng dẫn + nút CTA), **Filled state** (dữ liệu mẫu thực tế, tiếng Việt có dấu), **Loading state** (khi hệ thống đang chạy mapping). Thiếu state → bị trừ điểm "không giống giao diện thật".

### A.8. Annotation (chú thích) bắt buộc

Với 2–3 màn hình quan trọng nhất (Task Input, Auto-Assignment Result), thêm lớp chú thích số (1, 2, 3…) trỏ vào từng thành phần kèm mô tả hành vi ở khung bên cạnh — thể hiện tư duy UX, không chỉ là hình đẹp.

\---

## PHẦN B — DANH SÁCH MÀN HÌNH BẮT BUỘC (mapping với Agents.md mục 1 \& Scenario 2)

|#|Màn hình|Loại|Bắt buộc trong Wireframe|Bắt buộc trong Prototype (click-through)|
|-|-|-|-|-|
|1|Đăng nhập / Chọn vai trò|Auth|✔|✔|
|2|Tạo dự án mới (Onboarding)|Setup|✔|✔|
|3|Dashboard tổng quan|Overview|✔|✔|
|4|Nhập/Quản lý danh mục kỹ năng (Skill Tags)|Setup|✔|Tùy chọn|
|5|Nhập danh sách Task|Input|✔|✔|
|6|Nhập danh sách Thành viên|Input|✔|✔|
|7|Màn hình đang chạy Auto-Assignment (Loading)|Process|✔|✔|
|8|Kết quả Mapping đề xuất|Core/Mới|✔|✔|
|9|Điều chỉnh thủ công gợi ý mapping|Core/Mới|✔|✔|
|10|Dialog xác nhận gửi thông báo|Confirm|✔|✔|
|11|Kanban Board (To do/Doing/Done)|Tracking|✔|✔|
|12|Chi tiết Task (Task Detail Drawer/Modal)|Detail|✔|✔|
|13|Chi tiết Thành viên (Member Profile)|Detail|✔|Tùy chọn|
|14|Biểu đồ khối lượng công việc (Workload Chart)|Analytics|✔|Tùy chọn|
|15|Mobile — Kanban rút gọn|Responsive|✔|✔|
|16|Toast/Empty/Error state tổng hợp|System state|✔|Không bắt buộc|

\---

## PHẦN C — CHI TIẾT TỪNG MÀN HÌNH

### 1\. Đăng nhập / Chọn vai trò

* **Mục đích:** vào hệ thống, phân biệt Quản lý (trưởng nhóm) và Thành viên (theo mục 5 Agents.md — phân quyền thủ công ở Phase 1).
* **Thành phần:** Logo, form email/password, nút "Đăng nhập", link "Quên mật khẩu", toggle vai trò demo (vì Auth Phase 1 xử lý thủ công).
* **Trạng thái:** Default, Error (sai mật khẩu — dùng màu Trễ hạn `#FFEBE6`/`#BF2600`), Loading.

### 2\. Tạo dự án mới (Onboarding)

* **Mục đích:** khởi tạo 1 "dự án quản lý" — nơi định nghĩa danh mục kỹ năng dùng chung (theo Agents.md mục 7).
* **Thành phần:** Stepper 3 bước (Thông tin dự án → Định nghĩa kỹ năng → Mời thành viên), input tên dự án, tag input để tạo skill tags, nút "Hoàn tất \& vào Dashboard".
* **Lưu ý fidelity:** đây là màn hình thể hiện rõ nét khác biệt với công cụ cũ (Trello/Asana không có bước định nghĩa skill tag dùng chung) — nên vẽ chi tiết, có annotation.

### 3\. Dashboard tổng quan

* **Mục đích:** cho Quản lý cái nhìn tổng thể — đúng insight "thiếu minh bạch tiến độ" nêu trong mục 2.1 của báo cáo.
* **Thành phần:** 4 card số liệu (Tổng task / Đang trễ / Hoàn thành / Thành viên quá tải), mini workload chart (Recharts), danh sách task sắp đến hạn, nút CTA nổi bật "Tự động phân công" (màu Primary `#0052CC`).
* **State đặc biệt:** Empty state khi dự án mới tạo (chưa có task nào).

### 4\. Quản lý danh mục kỹ năng (Skill Tags)

* **Thành phần:** Bảng tag kỹ năng, nút "+ Thêm kỹ năng", input tên + màu tag, cảnh báo khi xóa tag đang được task/thành viên sử dụng.

### 5\. Nhập danh sách Task

* **Mục đích:** tương ứng bước 1 quy trình mới trong mục 4.3 Agents.md.
* **Thành phần:** Bảng nhập nhanh (inline table editing) hoặc form modal, các cột: Tên task, Kỹ năng yêu cầu (multi-select badge), Thời gian dự kiến (giờ), Độ ưu tiên (High/Med/Low), Deadline (date picker dùng dayjs). Nút "Import CSV" và "+ Thêm task thủ công".
* **Annotation bắt buộc:** đánh số giải thích ô "Kỹ năng yêu cầu" — vì đây là dữ liệu đầu vào cốt lõi cho thuật toán mapping.

### 6\. Nhập danh sách Thành viên

* **Thành phần:** Bảng thành viên: Avatar, Tên, Email, Kỹ năng (badge + cấp độ Junior/Mid/Senior dùng dropdown), Thời gian khả dụng (giờ/tuần). Nút "+ Thêm thành viên" / "Import".
* **Trạng thái đặc biệt:** cảnh báo màu vàng nếu 1 thành viên chưa gán kỹ năng nào (dữ liệu không đủ để mapping).

### 7\. Màn hình đang chạy Auto-Assignment

* **Mục đích:** thể hiện rõ "tương tác mới" (Scenario 2) — quy trình mới rút gọn còn 1 bước bấm nút thay vì thao tác thủ công.
* **Thành phần:** Overlay/modal loading với progress indicator, dòng chữ trạng thái ("Đang tính điểm phù hợp…", "Đang cân bằng khối lượng…"), nút Hủy.
* Đây là màn hình **bắt buộc có trong prototype** vì rubric Scenario 2 chấm điểm dựa trên việc "thấy được tương tác mới".

### 8\. Kết quả Mapping đề xuất (màn hình quan trọng nhất)

* **Mục đích:** trung tâm của tính năng đột phá — thể hiện rõ "khác biệt và tính mới" (mục 4.2 báo cáo).
* **Thành phần:**

  * Bảng: Task | Thành viên đề xuất | Badge Score (màu theo A.4: `#00875A` cao / `#FFAB00` tb / `#DE350B` thấp) | Thời gian dự kiến hoàn thành (tự tính theo cấp độ — ví dụ Senior 4h vs Junior 8h) | Nút "Xem chi tiết điểm số".
  * Tooltip/Popover khi hover vào score: hiển thị breakdown `skill\\\_score × 0.7 + availability\\\_score × 0.3`.
  * Banner cảnh báo Bottleneck nếu phát hiện 1 thành viên bị dồn quá tải.
  * Nút "Chốt phân công" (Primary) và "Gửi thông báo" (mở dialog #10).
* **Annotation bắt buộc:** giải thích rõ vì sao badge đổi màu, vì đây là điểm "minh bạch" khác biệt lớn nhất so với Jira/Trello nêu trong mục 4.2.

### 9\. Điều chỉnh thủ công gợi ý mapping

* **Thành phần:** Dropdown chọn lại thành viên khác ngay trên dòng task, hiển thị lại score mới ngay khi đổi (real-time recalculation), highlight dòng vừa chỉnh (viền Primary Hover).
* Thể hiện đúng nguyên tắc Agents.md: "không tự động hoàn toàn, tránh sai sót".

### 10\. Dialog xác nhận gửi thông báo

* **Thành phần:** Modal xác nhận số lượng email sẽ gửi, danh sách preview người nhận, nút "Xác nhận gửi" (Primary) / "Hủy" — bắt buộc có theo mục 4 Agents.md ("cần có bước xác nhận, tránh gửi nhầm").
* **Trạng thái:** Success toast sau khi gửi ("Đã gửi thông báo tới 8 thành viên").

### 11\. Kanban Board (To do / Doing / Done)

* **Thành phần:** 3 cột đúng màu bảng A.4, task card gồm avatar người phụ trách, badge kỹ năng, đếm ngày còn lại (đổi màu đỏ nếu trễ hạn), kéo-thả (annotation ghi chú "drag \& drop" dù wireframe tĩnh).
* **Prototype:** dùng Smart Animate của Figma để mô phỏng việc kéo thả 1 card giữa cột To do → Doing.

### 12\. Chi tiết Task (Drawer/Modal)

* **Thành phần:** Mở từ Kanban card, hiển thị đầy đủ: mô tả, kỹ năng yêu cầu, người phụ trách, lịch sử thay đổi trạng thái, khung comment (nếu có).

### 13\. Chi tiết Thành viên (Member Profile)

* **Thành phần:** Avatar lớn, danh sách kỹ năng + cấp độ, biểu đồ mini khối lượng công việc hiện tại/thời gian rảnh còn lại, danh sách task đang đảm nhận.

### 14\. Biểu đồ khối lượng công việc

* **Thành phần:** Bar chart hoặc stacked bar (Recharts) so sánh khối lượng giao vs khả dụng từng thành viên — trực tiếp giải quyết "mất cân bằng khối lượng" nêu ở mục 2.1 báo cáo.

### 15\. Mobile — Kanban rút gọn

* **Thành phần:** Tab chuyển đổi 3 cột thay vì hiển thị song song (do màn hẹp), bottom navigation bar, task card thu gọn.

### 16\. Toast / Empty / Error tổng hợp

* Gom vào 1 frame riêng để giám khảo dễ thấy nhóm đã nghĩ đủ các trạng thái hệ thống: toast thành công (xanh `#006644`), toast lỗi (đỏ `#BF2600`), empty state minh họa icon + câu gợi ý hành động.

\---

## PHẦN D — LUỒNG PROTOTYPE BẮT BUỘC (Figma Flow)

Tạo **2 Flow riêng biệt** trong Prototype để giám khảo phân biệt rõ Scenario 1 (cũ) vs Scenario 2 (mới) như rubric yêu cầu:

**Flow "Quy trình mới" (chính, phải mượt và đầy đủ nhất):**
Đăng nhập → Dashboard → Nhập Task → Nhập Thành viên → Bấm "Tự động phân công" → (Loading) → Kết quả Mapping → Điều chỉnh 1 dòng thủ công → Chốt phân công → Dialog xác nhận gửi thông báo → Toast thành công → Kanban board.

**Flow phụ:** Kanban → Click 1 task card → Task Detail Drawer → Đóng lại.

* Dùng **Smart Animate** cho transition giữa Loading → Kết quả (tạo cảm giác "hệ thống đang tính toán thật").
* Dùng **Overlay** cho tất cả Modal/Dialog (không dùng Navigate, để giữ context nền mờ đi phía sau).
* Thời gian transition: 150–200ms easing "Ease Out" — đúng chuẩn "chuyển động mượt" ghi trong Agents.md mục 4.

\---

## PHẦN E — CHECKLIST TỰ CHẤM TRƯỚC KHI NỘP (đối chiếu rubric)

* \[ ] Toàn bộ 16 màn hình có mặt, dùng đúng bảng màu/font trong Agents.md.
* \[ ] Có Design System riêng (component tái sử dụng) — chứng minh "dùng tool, tiện dụng".
* \[ ] Mỗi màn hình danh sách có ≥3 state (Empty/Filled/Loading).
* \[ ] 2 màn hình lõi (#8 Kết quả Mapping, #5 Nhập Task) có annotation đánh số.
* \[ ] Prototype click-through chạy hết luồng chính không bị gãy (dead-end).
* \[ ] Có bản responsive mobile cho Kanban.
* \[ ] Có ít nhất 1 hiệu ứng Smart Animate thể hiện tương tác mới (loading → kết quả, hoặc kéo-thả Kanban).
* \[ ] Dữ liệu mẫu dùng tiếng Việt có dấu, tên/task thực tế (không để "Lorem Ipsum").

