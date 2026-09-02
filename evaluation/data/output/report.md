# Báo cáo Đánh giá Khả dụng — TaskAssign AI (Bản nháp từ mock n=5)

> Đủ 7 thành phần Rubric Mục 8 để đạt 1.0. Thay mock bằng dữ liệu thật sau khi chạy đủ 5–7 người.

## 1. Goals (Research Questions)

- RQ1: Trưởng nhóm có hoàn thành flow T1–T6 không? (target ≥85%)
- RQ2: Tổng time T1–T6 có <300s (5 phút) không?
- RQ3: Có hiểu score 0.7/0.3 và badge High/Mid/Low không?
- RQ4: SUS có ≥68 không?

## 2. Tasks (T1–T6)

Như `plan.md` B2: Global Tags → Nhập task/member → Chạy mapping → Override → Gửi mail → Kanban.

## 3. Participants

n=5 (mock): 2 trưởng nhóm, 2 thành viên, 1 quen Jira. Tuổi 20–23, đều nhóm 4–5 người. Tuyển từ 23HTTT01 qua chat.

## 4. Data Collection

- Performance: completion rate, time, errors, help requests — quan sát + screen record
- Self-reported: SUS 10 câu + 3 câu phỏng vấn
- Qualitative: think-aloud → note-taker ghi

## 5. Procedure

Lab yên tĩnh, 1 người/lượt, script `facilitator_script.md`, 25 phút/người, không hỗ trợ khi bí.

## 6. Results

### Completion
27/30 (90%) — fail T1 (P04 không thấy pool), T4 (P02 nhầm dropdown), T5 (P04 quên tick).

### Time
Mean 237s (SD 50.8) — t-test vs 300s: t=-2.78, p=0.049 → **đạt ngưỡng 5 phút**.

### SUS
Mean 73.0 (SD 20.6) — Good (>68). P04 42.5 kéo xuống; 3/5 hiểu badge, 2/5 cần tooltip.

### Qualitative
- "Không thấy Global Tags ở Dashboard" (2/5)
- "Low nghĩa là gì? Có nên giao không?" (2/5)
- "Quên tick xác nhận mới được gửi" (1/5)

## 7. Issues & Improvements

| # | Vấn đề | Bằng chứng | Severity | Đề xuất | Re-evaluation Q |
|---|---|---|---|---|---|
| 1 | Pool không nổi bật | 1 fail T1, 2 mention | High | Highlight pool + badge count | T1 success có lên 100%? |
| 2 | Badge Low khó hiểu | 2/5 hỏi | High | Thêm tooltip `skill 30%+avail 20% → Low` | Người dùng có giải thích đúng score? |
| 3 | Quên tick gửi mail | 1 fail T5 | Mid | Auto-focus checkbox + disable Gửi tới khi tick | T5 success 100%? |
| 4 | Dropdown override nhỏ | 1 fail T4 | Mid | Tăng width, thêm label "Chỉnh tay" | T4 error giảm? |

## 8. Kết luận

Prototype đạt 90% effectiveness, efficiency đạt ngưỡng, SUS Good nhưng cần cải tiến High-priority trước khi tích Supabase. Re-evaluation sau sửa dự kiến SUS >80.

---

*Đổ bảng §6–§7 vào `report/src/main.md` Chương 10 và `slides/src/slides.md` slide 10.*
