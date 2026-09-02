# Kế hoạch tạo Persona — Công cụ hỗ trợ lập kế hoạch và phân công việc nhóm

## 1. Mục tiêu

- Xây dựng persona đại diện cho người dùng của web tool (phân công việc nhóm tự động theo kỹ năng).
- Dựa trên dữ liệu **khảo sát + phỏng vấn thực tế** từ end-users, không chỉ phỏng đoán.
- Cung cấp nguồn dữ liệu cho các phần trong báo cáo HCI: Personas, Đánh giá, "Phản hồi từ 5 end-users".

## 2. Đầu vào (nguồn)

| Tài liệu | Vai trò |
|---|---|
| `survey.md` | Bộ câu hỏi khảo sát (17 câu, 5 phần) |
| `google_form.gs` | Script tạo Google Form + bảng kết quả |
| Câu hỏi phỏng vấn sâu | Bổ sung định tính cho 5 end-users |
| `personas.md` | 3 personas thiết kế sẵn theo vai trò (trưởng nhóm / thành viên / giảng viên) |

## 3. Sản phẩm đầu ra

- `survey_answers.md` — bảng ghi phiếu trả lời + phần tổng hợp.
- `survey_persona.md` — persona **data-driven** được dựng từ số liệu tổng hợp.
- Đối chiếu cập nhật `personas.md` (persona thiết kế so với persona dữ liệu).
- Phần "Phản hồi từ 5 end-users" trong báo cáo.

## 4. Quy trình 5 bước

1. **Thiết kế công cụ thu thập** — chạy `google_form.gs` để tạo form (lấy link chia sẻ); chuẩn bị câu hỏi phỏng vấn sâu.
2. **Thu thập dữ liệu** — tối thiểu **5 end-users mỗi vai trò** (trưởng nhóm, thành viên, giảng viên). Gửi link qua nhóm chat/lớp.
3. **Ghi & tổng hợp** — ghi từng phiếu theo mẫu thống nhất; đếm tần suất lựa chọn, tính trung bình/mode cho câu thang điểm.
4. **Xây persona data-driven** — chọn "người trả lời tiêu biểu nhất" (modal respondent) từ tổng hợp; đối chiếu với `personas.md`.
5. **Kiểm chứng & trình bày** — rà soát theo tiêu chí chất lượng, đưa kết quả vào báo cáo.

## 5. Tiêu chí chất lượng (acceptance criteria)

- Mỗi persona đều có **dẫn chứng số liệu** (mode/trung bình) từ phiếu.
- Phân biệt rõ phiếu **MẪU (MOCK)** và phiếu **thật** trong `survey_answers.md`.
- Đủ tối thiểu **5 end-users mỗi vai trò** (theo yêu cầu môn học).
- Nội dung trích được trực tiếp vào phần Đánh giá của báo cáo.

## 6. Phân công & timeline gợi ý

| Bước | Người phụ trách | Dự kiến hoàn thành | Sản phẩm |
|---|---|---|---|
| 1. Thiết kế công cụ | Cả nhóm | Tuần 1 | Link Google Form + câu hỏi phỏng vấn |
| 2. Thu thập | Mỗi thành viên gửi cho ~5 người | Tuần 2–3 | Phiếu trả lời |
| 3. Tổng hợp | 1–2 thành viên | Tuần 3 | `survey_answers.md` |
| 4. Dựng persona | Cả nhóm | Tuần 4 | `survey_persona.md` + đối chiếu `personas.md` |
| 5. Kiểm chứng & viết báo cáo | Cả nhóm | Tuần 5 | Phần Đánh giá trong báo cáo |

## 7. Rủi ro & cách xử lý

| Rủi ro | Cách xử lý |
|---|---|
| Không đủ phiếu (ít người trả lời) | Gửi lại qua nhiều kênh, gia hạn, tăng đối tượng mời |
| Mẫu lệch (chỉ có sinh viên, thiếu giảng viên) | Chủ động mời trưởng nhóm/giảng viên cụ thể |
| Số liệu chưa đạt 5/role trước hạn | Ghi rõ giới hạn mẫu trong báo cáo thay vì bỏ qua |
| Nhầm phiếu MẪU với phiếu thật | Luôn đánh dấu `(MẪU)` trên các phiếu ví dụ |
