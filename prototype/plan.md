# Kế hoạch & Kiến trúc Prototype (Interactive Prototype Plan)

> **Căn cứ tài liệu:**
> - `Agents.md` (Quy định dự án, Tech Stack React + Vite, Supabase, Thuật toán Weighted Scoring)
> - `CSC12106_Rubric_Project_Final.csv` - **Mục 6: Prototype (10%)** & **Mục 8: Software Product (10%)**: Đạt mức tối đa (*"Đầy đủ các thành phần, minh họa được tương tác mới, vững chãi"* và *"Cài đặt trọn vẹn 100% quy trình nghiệp vụ có tính năng tương tác mới"*).

---

## 1. Mục tiêu & Phạm vi Prototype
- Xây dựng bản mô phỏng tương tác cao (Interactive Frontend Prototype) bằng **React + Vite + Tailwind CSS**, hiện thực hóa toàn bộ 6 màn hình từ wireframe thành ứng dụng web chạy thực tế.
- Tích hợp **Thuật toán Tự động Phân công (Weighted Scoring & Greedy Assignment)** chạy trực tiếp trên trình duyệt để quản lý có thể thao tác bấm nút, xem gợi ý, điều chỉnh thủ công và bấm gửi email thông báo giả lập qua Resend.

---

## 2. Kiến trúc & Cấu trúc Mã nguồn Prototype

```text
src/
├── components/
│   ├── Header.jsx             # Thanh điều hướng trên cùng & thông tin dự án
│   ├── SkillPoolConfig.jsx    # Màn hình 1: Quản lý Global Skill Tags Pool
│   ├── TaskManager.jsx        # Màn hình 2: Quản lý danh sách Task & Kỹ năng yêu cầu
│   ├── MemberManager.jsx      # Màn hình 3: Quản lý Thành viên & Thời gian rảnh
│   ├── AssignmentWorkspace.jsx# Màn hình 4: Chạy thuật toán Auto-Assignment & Manual Override
│   ├── ResendModal.jsx        # Màn hình 5: Modal xác nhận gửi email hàng loạt
│   └── KanbanBoard.jsx        # Màn hình 6: Bảng theo dõi tiến độ Kanban 3 cột
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
- Hiển thị kết quả dưới dạng bảng matrix cho phép quản lý bấm dropdown **Manual Override** đổi người nếu muốn.

---

## 4. Kịch bản Kiểm thử & Nghiệm thu (Verification & Test Cases)

| ID Test | Kịch bản kiểm thử | Dữ liệu đầu vào mẫu | Kết quả mong đợi | Trạng thái |
|---|---|---|---|---|
| **TC-01** | Cấu hình Global Tags | Thêm tag: `Frontend`, `Backend`, `UI/UX` | Tag xuất hiện trong danh sách dùng chung | Đã lên kế hoạch |
| **TC-02** | Thêm Task mới | Tên: "Viết API", Thời gian: 6h, Tag: `Backend` | Task được thêm vào bảng task thành công | Đã lên kế hoạch |
| **TC-03** | Thêm Thành viên | Tên: Trần Thị B, Giờ rảnh: 12h, Tag: `Backend` | Thành viên xuất hiện trong danh sách | Đã lên kế hoạch |
| **TC-04** | Chạy Auto-Assignment | Bấm nút "Chạy Tự động Phân công" | Hệ thống tính điểm và gán task cho Trần Thị B (Score ~92%) | Đã lên kế hoạch |
| **TC-05** | Manual Override | Đổi người làm task "Viết API" sang Lê Hoàng C | Điểm số cập nhật lại và cảnh báo nếu thiếu giờ | Đã lên kế hoạch |
| **TC-06** | Gửi thông báo Resend | Bấm "Gửi email thông báo" $\rightarrow$ Xác nhận modal | Hiển thị thông báo gửi email thành công | Đã lên kế hoạch |
| **TC-07** | Kanban Tracking | Chuyển sang Tab Kanban | Task hiển thị đúng ở cột To Do / Doing / Done | Đã lên kế hoạch |
