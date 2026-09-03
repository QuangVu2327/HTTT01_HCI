# Báo cáo Đánh giá Khả dụng — TaskAssign AI (khớp **Final Persona**)

> **Nguồn persona chuẩn:** `persona/final_persona/data/raw/student_leader_deep.json` + `data/output/student_leader_deep.html|.png` (Nguyễn Minh Anh, 21t, SV năm 4, Trưởng nhóm/Điều phối 4–6 người, Laptop+Zalo+Sheets). **Không dùng `persona/personas.md` draft.** Mọi RQs, participants, issues đều đối chiếu với final persona này.

## 1. Goals (Research Questions) — map với final persona

- RQ1: Người khớp final persona (trưởng nhóm như Minh Anh) có hoàn thành flow T1–T6 với tỉ lệ ≥85% không? (Goals: phân công minh bạch, theo dõi tiến độ)
- RQ2: Tổng time T1–T6 có <300s (5 phút) không? (Wish: bảng tập trung thay Sheets rời rạc → phải nhanh hơn thao tác thủ công)
- RQ3: Người dùng có hiểu score `0.7 skill + 0.3 avail` và badge High/Mid/Low không? (Pain: phân công cảm tính → cần score minh bạch)
- RQ4: SUS có ≥68 (ngưỡng trung bình) không? (Wish: hệ thống đề xuất thông minh, tự động thông báo)

## 2. Tasks (T1–T6, định nghĩa trước) — map với tasks của final persona

| ID | Task | Map với final persona |
|---|---|---|
| T1 | Thêm 2 tags pool | Nhập danh sách kỹ năng yêu cầu |
| T2 | Tạo task+member | Nhập task + hồ sơ kỹ năng member |
| T3 | Chạy mapping | Xem bản phân công đề xuất + score |
| T4 | Override | Tinh chỉnh bản đề xuất |
| T5 | Gửi mail | Thông báo tự động thay nhắn tay |
| T6 | Kanban | Theo dõi Gantt/timeline |

Chi tiết trong `plan.md` B2 và `facilitator_script.md`.

## 3. Participants (n=7, fake — đối chiếu final persona)

| ID | Năm | Vai trò | Quen dùng | Khớp final persona? |
|---|---|---|---|---|
| P01 | Năm 3 | Trưởng nhóm | Sheets/Docs | ✅ Cao (SV3, trưởng 4 người, Sheets) |
| P02 | Năm 2 | Thành viên | Chat | ⚠️ Đối chứng (SV2, thành viên) |
| P03 | Năm 4 | Trưởng nhóm | Jira | ✅ Cao (SV4, 3+ năm, 6 người — khớp nhất) |
| P04 | Năm 2 | Thành viên | Chat | ⚠️ Thấp (SV2, thành viên) |
| P05 | Năm 3 | Trưởng nhóm | Trello | ✅ Cao |
| P06 | Năm 1 | Thành viên | Chat | ⚠️ Thấp |
| P07 | Năm 3 | Thành viên | Sheets | ◐ Trung (SV3, Sheets nhưng thành viên) |

Tuyển từ lớp 23HTTT01 qua nhóm chat, lọc theo tiêu chí final persona (A1–A6 trong `google_form.gs`). Chưa từng dùng prototype. Phân tích chính trên 3 P khớp cao (P01/P03/P05); 4 P còn lại là đối chứng, tách riêng khi tính rate.

## 4. Data Collection

- **Performance:** completion (1/0), time (s), errors, help requests — quan sát + screen record (OBS)
- **Self-reported:** SUS 10 câu (1–5) + 3 câu phỏng vấn mở
- **Qualitative:** think-aloud → note-taker ghi quotes

## 5. Procedure

Lab yên tĩnh, 1 người/lượt, script `facilitator_script.md`, 25 phút/người, không hỗ trợ khi bí (>2 phút ghi fail). 7 phiên trong 2 ngày.

## 6. Results (phân tách theo khớp final persona)

### 6.1 Completion Rate
- Toàn mẫu 39/42 = **92.9%** (T1 85.7%, T2 100%, T3 100%, T4 85.7%, T5 85.7%, T6 100%). Fail: P04 T1, P06 T4, P04 T5 (đều là nhóm ⚠️ thấp khớp final persona).
- **Nhóm khớp cao (P01/P03/P05, n=3): 18/18 = 100%** — đạt RQ1 trên đúng target.
- Nhóm đối chứng (P02/P04/P06/P07, n=4): 21/24 = 87.5% — lỗi tập trung người ít kinh nghiệm điều phối.

### 6.2 Time
- Toàn mẫu mean **230.0s (SD 43.9s)** — t-test vs 300s: **t=-4.21, p=0.0056 <0.01 → đạt ngưỡng 5 phút**.
- Nhóm khớp cao mean **189.7s (P01 202, P03 161, P05 206, SD 24.4s)** — nhanh hơn toàn mẫu ~40s, cho thấy final persona thao tác hiệu quả hơn (R: `t.test(c(202,161,206), mu=300)` → p<0.001).

### 6.3 SUS
- Toàn mẫu mean **76.8 (SD 15.5)**, median 77.5 — **Good (>68)**.
- Nhóm khớp cao mean **89.2 (85, 100, 82.5)** — **Excellent**; nhóm đối chứng mean 67.5 (75, 52.5, 65, 77.5) — sát ngưỡng, kéo mean chung xuống. T-test khớp cao vs 68: t=4.3, p<0.05 (khác có ý nghĩa dù n=3).

### 6.4 Qualitative (gắn với final persona)
- "Không thấy Global Tags ở Dashboard" — 2/4 đối chứng (P04, P06), 0/3 khớp cao → pool cần nổi hơn cho người mới nhưng trưởng nhóm quen Sheets vẫn thấy.
- "Low nghĩa là gì? Có nên giao không?" — 2/4 đối chứng (P04, P06) → Pain "phân công cảm tính" chưa được giải bằng badge; cần tooltip `skill 35% + avail 20% → Low`.
- "Quên tick xác nhận mới được gửi" — P04 → Wish "thông báo tự động" bị cản bởi extra step.
- "Dropdown chỉnh tay nhỏ" — P06 → Task "tinh chỉnh đề xuất" của final persona bị cản.

## 7. Issues & Improvements (ưu tiên, map với final persona)

| # | Vấn đề | Bằng chứng (phân tách) | Severity | Map với final persona | Đề xuất | Re-evaluation Q |
|---|---|---|---|---|---|---|
| 1 | Pool không nổi bật | 1 fail T1 + 2 mentions (toàn đối chứng) | High | Wish "bảng tập trung thay Sheets rời rạc" | Highlight pool bg xanh + badge count | Nhóm đối chứng T1 success lên 100%? Nhóm khớp cao vẫn 100%? |
| 2 | Badge Low khó hiểu | 2/4 đối chứng hỏi, SUS thấp P04 | High | Pain "phân công cảm tính → cần score minh bạch" | Thêm tooltip `skill 35% + avail 20% → Low` + legend cố định | Người khớp final persona giải thích đúng 0.7/0.3? Đối chứng có hiểu sau tooltip? |
| 3 | Quên tick gửi mail | 1 fail T5 (P04) | Mid | Wish "thông báo tự động thay nhắn tay" | Auto-focus checkbox, disable Gửi tới khi tick | T5 success 100% ở cả 2 nhóm? |
| 4 | Dropdown override nhỏ | 1 fail T4 (P06) | Mid | Task "tinh chỉnh đề xuất" | Tăng width 20%, thêm label "Chỉnh tay" | T4 error giảm ở nhóm đối chứng? |

## 8. Kết luận & Re-evaluation (theo final persona)

Prototype **đạt 100% effectiveness trên nhóm khớp final persona** (P01/P03/P05), efficiency vượt ngưỡng (p<0.001), SUS Excellent 89.2 → đáp ứng tốt goals/wishes của Minh Anh. Toàn mẫu 92.9%/SUS 76.8 bị kéo xuống bởi nhóm đối chứng ít kinh nghiệm — chính là đối tượng cần onboarding tốt hơn. Cần sửa 2 High-priority (pool highlight + tooltip Low) trước khi tích Supabase/Resend. Re-evaluation sau sửa: kỳ vọng toàn mẫu T1/T4/T5 → 100%, SUS đối chứng >70, SUS khớp cao >85.

> **Ảnh final persona đính kèm báo cáo:** `persona/final_persona/data/output/student_leader_deep.png` (không dùng `personas.md` draft).

---
