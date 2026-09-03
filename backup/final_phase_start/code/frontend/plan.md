# Kế hoạch & Kiến trúc Prototype (Interactive Prototype Plan)

> **Căn cứ tài liệu:**
> - `Agents.md` (Quy định dự án, Tech Stack React + Vite, Supabase, Thuật toán Weighted Scoring)
> - Phản hồi người dùng từ khảo sát (`prototype/feedback/summary/feedback_summary.md`): Định hướng tối giản giao diện, tăng tính minh bạch thuật toán và tập trung tối đa vào luồng quản lý & phân công trực quan (không phụ thuộc/giảm trọng tâm vào Kanban rườm rà).
> - `CSC12106_Rubric_Project_Final.csv` - **Mục 6: Prototype (10%)** & **Mục 8: Software Product (10%)**: Đạt mức tối đa (*"Đầy đủ các thành phần, minh họa được tương tác mới, vững chãi"* và *"Cài đặt trọn vẹn 100% quy trình nghiệp vụ có tính năng tương tác mới"*).

---

## 1. Mục tiêu & Định hướng Thiết kế Mới (Design Vision)
- **Giao diện Tinh gọn & Trực quan (Clean & Streamlined UI):** Loại bỏ sự rối mắt, giảm thiểu thông tin dư thừa trên các thẻ task và thành viên; áp dụng nguyên tắc *Progressive Disclosure* (chỉ hiển thị chi tiết khi người dùng tương tác hoặc hover).
- **Minh bạch Thuật toán (Algorithm Transparency):** Tích hợp công cụ giải thích Match Score ngay tại giao diện phân công (`ScoreTooltip` / Chi tiết công thức `0.7 * skill + 0.3 * availability`).
- **Tập trung vào Luồng Quản lý Phân công (Core Assignment Flow):** Hướng sự chú ý của người dùng vào Tab Task, Tab Thành viên và Tab Phân công Tự động (Assignment Workspace) cùng tính năng Manual Override linh hoạt, biến Kanban thành một tính năng phụ trợ theo dõi thay vì bắt buộc tương tác phức tạp.

---

## 2. Kiến trúc & Cấu trúc Mã nguồn Prototype

```text
src/
├── components/
│   ├── Header.jsx             # Thanh điều hướng trên cùng & thông tin dự án
│   ├── SkillPoolConfig.jsx    # Màn hình 1: Quản lý Global Skill Tags Pool
│   ├── TaskManager.jsx        # Màn hình 2: Quản lý danh sách Task & Kỹ năng yêu cầu
│   ├── MemberManager.jsx      # Màn hình 3: Quản lý Thành viên & Thời gian rảnh
│   ├── AssignmentWorkspace.jsx# Màn hình 4: Chạy thuật toán Auto-Assignment & Manual Override (Cải tiến giao diện & Tooltip Match Score)
│   ├── ResendModal.jsx        # Màn hình 5: Modal xác nhận gửi email hàng loạt
│   └── KanbanBoard.jsx        # Màn hình 6: Bảng theo dõi tiến độ phụ trợ (đã tinh gọn)
├── utils/
│   └── assignmentAlgorithm.js # Thuật toán tính điểm (Weighted Scoring) & phân công (Greedy)
├── App.jsx                    # Quản lý State toàn cục & chuyển đổi Tab
└── main.jsx                   # Entry point
```

---

## 3. Chi tiết Kỹ thuật Thuật toán Mapping trong Prototype

### 3.1. Công thức tính điểm (`skill_score` & `availability_score`)
Với mỗi cặp `(task, member)`:
1. **Skill Score (`skill_score`):**
   $$\text{Match Count} = \text{Số lượng tag của task trùng với tag của member}$$
   $$\text{skill\_score} = \frac{\text{Match Count}}{\text{Tổng số tag yêu cầu của task}} \quad (\text{nếu task không yêu cầu tag nào, skill\_score} = 1.0)$$
2. **Availability Score (`availability_score`):**
   - Nếu $\text{Giờ rảnh khả dụng của member} \ge \text{Thời lượng dự kiến của task}$: $\text{availability\_score} = 1.0$.
   - Ngược lại (thiếu giờ): $\text{availability\_score} = \frac{\text{Giờ rảnh còn lại}}{\text{Thời lượng task}}$.
3. **Total Score:**
   $$\text{total\_score} = 0.7 \times \text{skill\_score} + 0.3 \times \text{availability\_score}$$

### 3.2. Thuật toán phân công tham lam (Greedy Assignment)
- Sắp xếp danh sách task theo độ ưu tiên giảm dần (Cao $\rightarrow$ Trung bình $\rightarrow$ Thấp) hoặc thời lượng giảm dần.
- Với mỗi task, quét toàn bộ danh sách thành viên, tính `total_score`, chọn thành viên có điểm cao nhất **và còn đủ quỹ thời gian rảnh**.
- Sau khi gán, trừ trực tiếp thời lượng task vào quỹ thời gian rảnh còn lại của thành viên đó (`remaining_hours`).
- Hiển thị kết quả dưới dạng bảng matrix tinh gọn kèm **Match Score Breakdown Tooltip** và dropdown **Manual Override** đổi người.

---

## 4. Kịch bản Kiểm thử & Nghiệm thu (Verification & Test Cases)

| ID Test | Kịch bản kiểm thử | Dữ liệu đầu vào mẫu | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|
| **TC-01** | Cấu hình Global Tags | Thêm tag: `Frontend`, `Backend`, `UI/UX` | Tag xuất hiện trong danh sách dùng chung | Đã kiểm định |
| **TC-02** | Thêm Task mới | Tên: "Viết API", Thời gian: 6h, Tag: `Backend` | Task được thêm vào bảng task thành công | Đã kiểm định |
| **TC-03** | Thêm Thành viên | Tên: Trần Thị B, Giờ rảnh: 12h, Tag: `Backend` | Thành viên xuất hiện trong danh sách | Đã kiểm định |
| **TC-04** | Chạy Auto-Assignment & Giải thích Score | Bấm "Chạy Tự động Phân công" $\rightarrow$ Hover vào Match Score | Hiển thị điểm số kèm breakdown (0.7 skill + 0.3 availability) rõ ràng | Đã cập nhật theo feedback |
| **TC-05** | Manual Override & Overload Warning | Đổi người làm task sang nhân viên thiếu giờ | Điểm số cập nhật và cảnh báo quá tải hiển thị trực quan, không rối mắt | Đã cập nhật theo feedback |
| **TC-06** | Gửi thông báo Resend | Bấm "Gửi email thông báo" $\rightarrow$ Xác nhận modal | Hiển thị thông báo gửi email thành công | Đã cập nhật |
| **TC-07** | Task Tracking (Non-Kanban Focus) | Quản lý danh sách và trạng thái qua Tab Assignment & Task | Giao diện gọn gàng, thao tác nhanh không phụ thuộc kéo thả phức tạp | Đã định hướng mới |
