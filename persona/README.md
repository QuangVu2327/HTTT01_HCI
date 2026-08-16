# Persona — Khảo sát & Xây dựng Persona (data-driven)

Bộ tài liệu + skill dựng **user persona từ dữ liệu khảo sát thật** cho môn Human Computer Interaction (CSC12106) — đề tài "Công cụ hỗ trợ lập kế hoạch và phân công việc nhóm".

## Cấu trúc thư mục

```
persona/
├── data/                        # Dữ liệu khảo sát thật
│   └── survey_answers.csv       # Kết quả Google Forms (export từ Sheets)
├── .opencode/skills/persona-maker/SKILL.md   # Skill opencode: dựng persona từ dữ liệu
├── google_form.gs               # Script Apps Script tạo Google Form khảo sát
├── survey.md                    # Bộ câu hỏi chuẩn (17 câu, 5 phần)
├── personas.md                  # 3 personas thiết kế sẵn (để đối chiếu)
├── persona_making_plan.md       # Kế hoạch làm persona
├── persona_making_skill.md      # Cách làm chi tiết (quy trình + template)
├── plan.md                      # Copy của persona_making_plan.md
├── skill.md                     # Copy của persona_making_skill.md
├── survey_answers.md            # Tổng hợp số liệu từ CSV (mode/trung bình theo vai trò)
├── survey_persona.md            # Persona data-driven (kèm dẫn chứng số liệu)
└── AGENTS.md                    # Hướng dẫn làm việc với repo
```

## Cách dùng

1. **Tạo form khảo sát** (nếu chưa có): mở https://script.google.com, dán nội dung `google_form.gs`, chạy hàm `createSurveyForm` → lấy link form + link bảng kết quả.
2. **Thu thập**: gửi link cho đối tượng mục tiêu (trưởng nhóm, thành viên, giảng viên). Mục tiêu ≥5 phiếu/vai trò; ví dụ ghi rõ `(MẪU)`.
3. **Xuất dữ liệu**: tải bảng kết quả Google Sheets về dưới dạng CSV, đặt vào `data/survey_answers.csv`.
4. **Dựng persona**: dùng skill `persona-maker` (opencode) — đọc thẳng CSV, bỏ cột `Timestamp`, tách multi-select, tính mode/trung bình, sinh `survey_answers.md` + `survey_persona.md`.

## Lưu ý

- Dữ liệu trong `data/` là **dữ liệu thật, ẩn danh** (form không thu email). Không trộn với phiếu giả lập `(MẪU)`.
- CSV không có cột "Vai trò" → vai trò Trưởng nhóm/Thành viên/Giảng viên được gán từ câu 1 và hồ sơ người trả lời; xác nhận lại trước khi đưa vào báo cáo.
- Nếu mẫu chưa đủ ≥5 phiếu/vai trò thì ghi rõ giới hạn mẫu thay vì bịa số liệu.
