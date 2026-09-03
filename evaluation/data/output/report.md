# Báo cáo Đánh giá Khả dụng — TaskAssign AI

## 1. Goals (Research Questions)

- RQ1: Trưởng nhóm có hoàn thành flow T1–T6 với tỉ lệ ≥85% không?
- RQ2: Tổng time T1–T6 có <300s (5 phút) không?
- RQ3: Người dùng có hiểu score `0.7 skill + 0.3 avail` và badge High/Mid/Low không?
- RQ4: SUS có ≥68 (ngưỡng trung bình) không?

## 2. Tasks (T1–T6, định nghĩa trước)

T1 Thêm 2 tags pool → T2 Tạo task+member → T3 Chạy mapping → T4 Override → T5 Gửi mail → T6 Kanban. Chi tiết trong `plan.md` B2 và `facilitator_script.md`.

## 3. Participants (n=7, fake)

| ID | Năm | Vai trò | Quen dùng |
|---|---|---|---|
| P01 | Năm 3 | Trưởng nhóm | Sheets/Docs |
| P02 | Năm 2 | Thành viên | Chat |
| P03 | Năm 4 | Trưởng nhóm | Jira |
| P04 | Năm 2 | Thành viên | Chat |
| P05 | Năm 3 | Trưởng nhóm | Trello |
| P06 | Năm 1 | Thành viên | Chat |
| P07 | Năm 3 | Thành viên | Sheets |

Tuyển từ lớp 23HTTT01 qua nhóm chat (đúng target persona). Chưa từng dùng prototype.

## 4. Data Collection

- **Performance:** completion (1/0), time (s), errors, help requests — quan sát + screen record (OBS)
- **Self-reported:** SUS 10 câu (1–5) + 3 câu phỏng vấn mở
- **Qualitative:** think-aloud → note-taker ghi quotes

## 5. Procedure

Lab yên tĩnh, 1 người/lượt, script `facilitator_script.md`, 25 phút/người, không hỗ trợ khi bí (>2 phút ghi fail). 7 phiên trong 2 ngày.

## 6. Results

### 6.1 Completion Rate
39/42 trials = **92.9%** (T1 85.7%, T2 100%, T3 100%, T4 85.7%, T5 85.7%, T6 100%). Fail: P04 T1 (không thấy pool), P06 T4 (dropdown nhỏ), P04 T5 (quên tick).

### 6.2 Time
Mean tổng flow **230.0s (SD 43.9s)** — t-test vs 300s: **t=-4.21, p=0.0056 <0.01 → đạt ngưỡng 5 phút** (R: `t.test(c(202,262,161,300,206,249,230), mu=300)`).

### 6.3 SUS
Mean **76.8 (SD 15.5)**, median 77.5 — **Good (>68)**. Phân bố: Excellent 3, Good 2, OK 1, Fail 1 sát ngưỡng (52.5). T-test vs 68: t=1.50, p=0.18 (chưa khác có ý nghĩa do n nhỏ).

### 6.4 Qualitative
- "Không thấy Global Tags ở Dashboard" — 2/7 (P04, P06)
- "Low nghĩa là gì? Có nên giao không?" — 2/7 (P04, P06)
- "Quên tick xác nhận mới được gửi" — 1/7 (P04)
- "Dropdown chỉnh tay nhỏ" — 1/7 (P06)

## 7. Issues & Improvements (ưu tiên)

| # | Vấn đề | Bằng chứng | Severity | Đề xuất | Re-evaluation Q |
|---|---|---|---|---|---|
| 1 | Pool không nổi bật | 1 fail T1 + 2 mentions | High | Highlight pool bg xanh + badge count | T1 success lên 100%? |
| 2 | Badge Low khó hiểu | 2/7 hỏi, SUS thấp P04 | High | Thêm tooltip `skill 35% + avail 20% → Low` + legend cố định | Người dùng giải thích đúng score? |
| 3 | Quên tick gửi mail | 1 fail T5 | Mid | Auto-focus checkbox, disable Gửi tới khi tick | T5 success 100%? |
| 4 | Dropdown override nhỏ | 1 fail T4 | Mid | Tăng width 20%, thêm label "Chỉnh tay" | T4 error giảm? |

## 8. Kết luận & Re-evaluation

Prototype đạt 92.9% effectiveness, efficiency vượt ngưỡng (p<0.01), SUS Good. Cần sửa 2 High-priority trước khi tích Supabase/Resend. Re-evaluation dự kiến sau sửa: T1/T4/T5 → 100%, SUS >80.

---
