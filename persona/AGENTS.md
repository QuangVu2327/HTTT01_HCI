# AGENTS.md

## Kho repository

Repo này không phải git repo và không chứa code. Chỉ có một tệp duy nhất:

- `G8_Report.docx` — bài Báo cáo đề xuất dự án giữa kỳ môn **Human Computer Interaction (CSC12106)**, Nhóm 8, lớp 23HTTT01, ngày nộp 09/07/2026.

Thành viên nhóm (theo trang bìa): 23127110, 23127385, 23127495.

## Làm việc với tệp .docx

- `G8_Report.docx` là file OOXML (một ZIP chứa XML). **Không sửa XML bên trong trực tiếp.** Chỉ mở sửa bằng Word/Google Docs hoặc tái sinh nội dung bằng thư viện (python-docx, pandoc …).
- Muốn đọc nội dung: giải nén và lấy `word/document.xml` (mã hóa UTF-8), lọc bỏ thẻ `<w:t>`. Font và ảnh nằm trong `word/fonts/` và `word/media/`.

## Nội dung tài liệu (lưu ý)

- Phần đầu (như trang bìa): đề xuất một web tool hỗ trợ lập kế hoạch và phân công việc nhóm, tự động nối task với thành viên phù hợp theo hồ sơ kỹ năng (junior/mid/senior), sinh timeline/Gantt ước lượng.
- **Lưu ý**: trong cùng tệp còn có một bản thảo báo cáo hoàn chỉnh khác, đề về app hạn chế thời gian sử dụng mạng xã hội, cộng phần khung hướng dẫn báo cáo (Tham khảo). Tài liệu chứa 2 chủ đề — luôn kiểm tra trang tiêu đề trước khi sửa, đừng giả định chủ đề duy nhất.

## Chạy lệnh

- Không có build/test/lint/package manifest, không có CI. Không có gì để chạy ở repo này.

## Persona-making (data-driven)

- Các tệp: `survey.md` (17 câu), `personas.md` (3 personas), `google_form.gs` (tạo Google Form), `persona_making_plan.md` / `persona_making_skill.md` (kế hoạch + cách làm), skill tại `.opencode/skills/persona-maker/SKILL.md`.
- **Kết quả khảo sát thật** lưu dưới dạng CSV export từ Google Sheets — hiện tại là tệp `.csv` ở thư mục gốc (cột `Timestamp` + 17 cột câu hỏi). Skill đọc trực tiếp file CSV này để tổng hợp và dựng persona; xem hướng dẫn trong `SKILL.md` (mục "Đọc dữ liệu từ CSV").
- `mock_survey_answers.md` là dữ liệu giả lập để minh họa — tất cả phiếu đều gắn nhãn `(MẪU)`, không trộn với dữ liệu thật trong `.csv`.