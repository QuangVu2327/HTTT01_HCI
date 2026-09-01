# Kế hoạch làm Wireframe — Task Assignment System

## 1. Mục tiêu
- Dựng wireframe tương tác cho web tool phân công việc nhóm tự động (mapping theo kỹ năng + thời gian rảnh).
- Dùng để **validate flow với 3 personas** (Minh Anh trưởng nhóm / Dũng thành viên / cô Lan giảng viên) và làm đầu vào cho `code/` (React + Vite + Supabase).
- Cung cấp nguồn hình cho báo cáo HCI: sơ đồ luồng, ảnh màn hình, link prototype.

## 2. Đầu vào (nguồn)
| Tài liệu | Vai trò |
|---|---|
| `../AGENTS.md` §1, §3, §4 | Spec sản phẩm, thuật toán weighted scoring (0.7/0.3 greedy), bảng màu Jira |
| `../persona/personas.md` + `survey_persona.md` | Nhu cầu 3 roles (công bằng, checklist rõ, thấy tiến độ thực tế) |
| `flows.md` | Flow chính đã chốt (nhập task/member → auto-assign → chỉnh tay → gửi thông báo → Kanban) |
| `screens/spec.md` | Spec 6 màn (Dashboard, Công việc, Thành viên, Gợi ý, Kanban, Dialog) |
| `index.html` | Prototype hiện có — chỉnh sửa trực tiếp, không rebuild |

## 3. Sản phẩm đầu ra
- `index.html` — prototype 6 màn, nav tabs, dialog xác nhận, score badges, responsive
- `screens/spec.md` — mô tả cột/bảng/component cho từng màn
- `flows.md` — flow + edge cases
- Ảnh export `screens/screen-*.png` (nếu dùng Figma)
- Phần "Thiết kế giao diện" trong báo cáo HCI

## 4. Quy trình 5 bước
1. **Khảo spec** — đọc `../AGENTS.md` + personas, chốt tag kỹ năng dùng chung, cột bảng, trạng thái Kanban.
2. **Dựng khung** — tạo layout top nav + 6 section trong `index.html`, nhúng CSS vars (Jira palette), font Inter.
3. **Điền dữ liệu mẫu** — task/member giả lập theo personas (vd: Minh Anh 20h, Dũng 90% tải), tính score demo.
4. **Tương tác** — tabs JS, dropdown chỉnh tay, slider w1/w2, dialog Gửi thông báo (có tick xác nhận), toast.
5. **Kiểm chứng & trình bày** — check responsive (desktop table → mobile card), hover/transition 150ms, đối chiếu checklist, chụp ảnh cho báo cáo.

## 5. Tiêu chí chất lượng
- Đủ 6 màn, mỗi màn có toolbar + bảng/card + empty state.
- Score hiển thị 3 mức High `#00875A` / Mid `#FFAB00` / Low `#DE350B`, có tooltip cách tính.
- Kanban 3 cột To do / Doing / Done đúng màu `../AGENTS.md` §4, task card có tag + assignee + deadline + score.
- Nút "Tự động phân công" primary `#0052CC` hover `#0065FF`, có loading; nút "Gửi thông báo" có dialog xác nhận bắt buộc.
- Mở `index.html` trực tiếp không cần server, không dependency nặng.

## 6. Phân công & timeline gợi ý
| Bước | Người phụ trách | Dự kiến | Sản phẩm |
|---|---|---|---|
| 1. Khảo spec | Cả nhóm | Ngày 1 | Tag list + cột bảng chốt |
| 2. Dựng khung | 1 người | Ngày 1–2 | `index.html` 6 section rỗng |
| 3. Điền data | 1 người | Ngày 2 | Data mẫu + score |
| 4. Tương tác | 1 người | Ngày 2–3 | Tabs/dialog/toast |
| 5. Kiểm chứng | Cả nhóm | Ngày 3 | Ảnh + phần báo cáo |

## 7. Rủi ro & cách xử lý
| Rủi ro | Cách xử lý |
|---|---|
| Thiếu tag dùng chung → task/member không khớp | Định nghĩa tag 1 lần ở Dashboard, khóa danh sách tag |
| Prototype quá nặng (framework) | Giữ HTML tĩnh + CSS vars, không thêm npm |
| Không responsive | Test 1200px / 900px / 600px, table → card |
| Score không minh bạch | Luôn hiện skill/avail/total + màu badge |

