# Kỹ năng: Thực hiện Đánh giá Khả dụng (Usability Evaluation)

Hướng dẫn tái sử dụng để chạy đánh giá cho Task Assignment System. Bổ trợ cho `plan.md` — file này là "cách làm" chi tiết, căn cứ `knowledge/10_Evaluation.md` + Rubric Mục 8.

## When to use this skill

- Khi cần đánh giá prototype `prototype/` / wireframe `wireframe/index.html` trước khi chốt báo cáo.
- Khi cần bằng chứng định lượng (SUS, time, success rate) cho `report/src/main.md` §10.
- Khi cần phát hiện lỗi khả dụng và đề xuất cải tiến có dẫn chứng.

## Required Inputs

- Prototype chạy được (`prototype/` build pass) hoặc `wireframe/index.html`.
- **Final persona duy nhất:** `persona/final_persona/data/raw/student_leader_deep.json` + render `data/output/student_leader_deep.html|.png` (9 lớp: goals/tasks/pains/wishes/...). **Cấm dùng `persona/personas.md` draft** — mọi tuyển người, RQ, tasks phải map với final persona.
- Danh sách tasks T1–T6 đã định nghĩa (plan.md §5 B2) — tasks đã map với tasks/goals của final persona (nhập task/member, chạy mapping, override, gửi mail, Kanban).
- Form SUS 10 câu + script facilitator (đã gắn filter khớp final persona).
- 5–7 participants **khớp final persona** (20–22t, SV năm 3–4, trưởng/điều phối nhóm 3–6 người, Laptop+Zalo+Sheets) — đã tuyển và ghi demographics đối chiếu.

## Output

- `data/raw/observation_notes.md` + `data/raw/sus_scores.csv`
- `data/output/report.md` — báo cáo 7 phần đầy đủ (để đạt Rubric 1.0)
- Issues cải tiến cho prototype.

## Workflow chi tiết

### 1. Chuẩn bị

- In script: lời chào, consent, pre-questionnaire (năm học/role/công cụ quen dùng), hướng dẫn think-aloud 30s mẫu.
- Chuẩn bị SUS form (Google Form hoặc giấy) — 10 câu Likert 1–5, tính điểm: `((Q1-1)+(5-Q2)+...)*2.5`.
- Kiểm tra phòng, screen recorder (OBS), note template:

```md
| Người | T1 time | T1 success | Lỗi | Think-aloud note |
|---|---|---|---|---|
```

### 2. Chạy phiên (B5)

Với mỗi người (25–30 phút):

1. Chào + consent + pre-questionnaire (2p)
2. Đọc verbatim T1 → quan sát, ghi time/error, không giúp (nếu bí >2 phút ghi "fail + help request")
3. Lặp T2–T6, nhắc think-aloud nhẹ: "Bạn đang nghĩ gì?"
4. Sau T6: cho làm SUS + 3 câu phỏng vấn:
   - Điều gì dễ/khó nhất?
   - Score/badge có hiểu không?
   - Bạn muốn cải tiến gì?
5. Cảm ơn + ghi phần thưởng nếu có.

Vai trò: Facilitator dẫn, Note-taker ghi, (optional) Computer đổi màn hình nếu test giấy WoZ.

### 3. Phân tích (B6)

- **Performance:** completion rate = success/total; mean time + SD; error count.
- **SUS:** tính theo công thức trên; mean SUS so ngưỡng 68.
- **Thống kê (nếu cần):**
  - 1 mẫu t-test: `t.test(time, mu=300)` kiểm tra có vượt 5 phút không (ví dụ slide 60).
  - 2 mẫu t-test/ANOVA nếu so 2 version (slide 61): `t.test(time ~ version)`.
  - Chi-squared nếu so tỉ lệ thích/không thích (slide 55): `chisq.test(c(like, dislike))`.
- **Định tính:** gom utterances thành 3–5 issue, gắn severity High/Mid/Low.

### 4. Báo cáo (B7)

Viết `data/output/report.md` theo khung:

```md
# Báo cáo Đánh giá — TaskAssign AI
## 1. Goals (RQs) 2. Tasks (T1–T6) 3. Participants (n, demographics)
## 4. Data collection (metrics + methods) 5. Procedure 6. Results (bảng rate/time/SUS + biểu đồ)
## 7. Issues & Improvements (bảng: Issue | Evidence | Severity | Proposal | Re-evaluation Q)
```

Mỗi issue phải có **bằng chứng** (ví dụ: 3/5 fail T4, quote "không thấy nút Gửi").

### 5. Cập nhật

- Đổ kết quả vào `report/src/main.md` §10 (bảng + biểu đồ) và `slides/src/slides.md` slide Evaluation.
- Tạo issue cho `prototype/` (vd: thêm tooltip score, đổi màu badge Low cho dễ phân biệt).

## Templates

### SUS Form (10 câu chuẩn Brooke)

1. Tôi nghĩ mình sẽ muốn dùng hệ thống này thường xuyên.
2. Tôi thấy hệ thống phức tạp không cần thiết.
... (đủ 10 câu, xen kẽ tích cực/tiêu cực)

### Báo cáo Issue

| # | Vấn đề | Bằng chứng | Mức độ | Đề xuất | Re-evaluation |
|---|---|---|---|---|---|
| 1 | Không hiểu badge Low | 3/5 hỏi "Low là gì?" | High | Thêm tooltip `skill 30% + avail 20% → Low` | Người dùng có giải thích đúng score sau khi thêm tooltip không? |

## Validation Rules

- **Thiếu 1 trong 7 bước** → mất điểm rubric (0.75). Phải đủ Goals→Improve.
- **Participants sai target** (không khớp final persona `student_leader_deep.json`) → kết quả vô nghĩa; luôn ghi demographics và đối chiếu tuổi/role/kinh nghiệm/thiết bị với final persona.
- **Dùng `persona/personas.md` thay final persona** → lỗi nguồn: phải dẫn `final_persona/data/raw/*.json` + PNG/HTML trong mọi báo cáo.
- **Tasks không đo được** → mỗi task phải có tiêu chí success rõ và map với tasks/goals của final persona.
- **Chỉ ghi "thích/không thích"** → phải có rate/time/error + SUS, không chỉ cảm tính.
- **Không ghi re-evaluation Q gắn final persona** → thiếu vòng lặp cải tiến.

## Checklist cuối

- [ ] Đủ 7 phần Goals/Tasks/Participants/Data/Conduct/Analyze/Improve — RQs/tasks map với final persona
- [ ] ≥5 người **khớp final persona** `student_leader_deep.json`, có demographics đối chiếu (tuổi/role/kinh nghiệm/thiết bị/pains)
- [ ] T1–T6 định nghĩa trước, có time/error/SUS, mỗi task map 1 task/goal của final persona
- [ ] Có screen recording + observation notes
- [ ] Đã tính completion rate, mean time, SUS, (t-test nếu so ngưỡng)
- [ ] Liệt kê 3–5 issues có evidence + severity + proposal + re-evaluation Q (mỗi issue gắn pain/wish của final persona)
- [ ] Báo cáo dẫn **final persona PNG/HTML** (`student_leader_deep.png`) thay vì `personas.md` draft
- [ ] Báo cáo sẵn sàng dán vào `report/` + `slides/`

## Failure Handling

- Không đủ người → ghi rõ n thực tế, không ngụy tạo.
- Prototype crash → chuyển sang `wireframe/index.html` backup, ghi chú trong report.
- SUS thấp (<68) → báo trung thực, đề xuất sửa thay vì giấu số liệu.
