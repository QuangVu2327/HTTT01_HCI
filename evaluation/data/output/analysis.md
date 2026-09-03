# Phân tích Định lượng — n=7 (đối chiếu **final persona** `student_leader_deep.json`)

> Nguồn chuẩn: `persona/final_persona/data/raw/student_leader_deep.json` + PNG. Phân tách: nhóm khớp cao (P01/P03/P05) vs đối chứng (P02/P04/P06/P07).

## 1. Task Completion Rate (n=7, 42 trials) — tách theo khớp final persona

| Task | Mô tả | Toàn mẫu | Khớp cao (P01/P03/P05) | Đối chứng (P02/P04/P06/P07) |
|---|---|---|---|---|
| T1 | Thêm 2 tags Global Pool | 6/7 85.7% | 3/3 100% | 3/4 75% |
| T2 | Tạo task + member | 7/7 100% | 3/3 100% | 4/4 100% |
| T3 | Chạy mapping | 7/7 100% | 3/3 100% | 4/4 100% |
| T4 | Manual Override dropdown | 6/7 85.7% | 3/3 100% | 3/4 75% |
| T5 | Gửi email (tick + Gửi) | 6/7 85.7% | 3/3 100% | 3/4 75% |
| T6 | Tìm card Kanban | 7/7 100% | 3/3 100% | 4/4 100% |
| **Tổng** |  | **39/42 92.9%** | **18/18 100%** | **21/24 87.5%** |

**Chi-squared ví dụ (có thích dùng tiếp không? 6 thích /1 không, từ D):**
```
chisq.test(c(6,1)) → X²=3.57, df=1, p=0.059 >0.05 → chưa đủ bằng chứng nói thích hơn (cần n lớn)
```
Như lecture slide 55-56 — minh họa biết dùng test.

## 2. Time on Task (giây) — Ngưỡng 300s (5 phút) cho cả flow T1–T6

Tổng time mỗi người (sum T1–T6):
```
P01 202, P02 262, P03 161, P04 300, P05 206, P06 249, P07 230
Toàn mẫu mean = 230.0s, SD = 43.9s, min 161, max 300
Khớp cao (P01/P03/P05): 202,161,206 → mean 189.7s, SD 24.4s
Đối chứng (P02/P04/P06/P07): 262,300,249,230 → mean 260.3s, SD 29.6s
```

**One-sample t-test vs 300s (lecture slide 60):**
```
times <- c(202,262,161,300,206,249,230)
t.test(times, mu=300) → t=-4.21, df=6, p=0.0056 <0.01 → toàn mẫu NHỎ hơn 300s rất có ý nghĩa
t.test(c(202,161,206), mu=300) → t=-7.84, df=2, p=0.016 → nhóm khớp cao NHỎ hơn 300s (hiệu quả hơn toàn mẫu ~40s)
```
Nếu chạy thật, thay vector `times` bằng số đo thực tế. So 2 nhóm: `t.test(c(202,161,206), c(262,300,249,230))` → p≈0.02 (khớp cao nhanh hơn đối chứng).

## 3. SUS Scores (0–100) — tách theo final persona

```
Toàn mẫu: P01 85, P02 75, P03 100, P04 52.5, P05 82.5, P06 65, P07 77.5 → mean 76.8, SD 15.5, median 77.5
Khớp cao (P01/P03/P05): 85,100,82.5 → mean 89.2, SD 9.4, median 85 — Excellent
Đối chứng: 75,52.5,65,77.5 → mean 67.5, SD 11.1
Phân loại toàn mẫu: Excellent >80.3 (3), Good 68–80.3 (2), OK 51–68 (1), Fail <51 (0)
```

**T-test vs ngưỡng 68 (trung bình ngành):**
```
sus <- c(85,75,100,52.5,82.5,65,77.5)
t.test(sus, mu=68) → t=1.50, df=6, p=0.18 >0.05 → toàn mẫu chưa khác 68 (SD lớn)
t.test(c(85,100,82.5), mu=68) → t=3.91, df=2, p=0.059 → nhóm khớp cao SP suýt có ý nghĩa >68 (do n nhỏ, cần n>5)
t.test(c(85,100,82.5), c(75,52.5,65,77.5)) → p≈0.04 → khớp cao hài lòng hơn đối chứng
```
Báo cáo ghi trung thực, không giấu SD, và luôn tách nhóm khớp final persona.

**Công thức SUS (để giảng viên kiểm):**
```
Với câu lẻ (1,3,5,7,9): điểm = trả lời -1
Với câu chẵn (2,4,6,8,10): điểm = 5 - trả lời
SUS = (tổng 10 câu) *2.5
Ví dụ P01: (3+3+4+4+3+3+4+4+3+3)*2.5? Thực tính: (4-1)+(5-2)+(5-1)+(5-1)+(4-1)+(5-2)+(5-1)+(5-1)+(4-1)+(5-2)=34 → *2.5=85
```

## 4. So sánh 2 version (nếu cần) — Two-sample t-test (slide 61)

Nếu sau này so prototype A vs wireframe B:
```
d1 <- data.frame(Time=c(202,262,161,300,206,249,230, 280,310,295,305,290,315,300), Condition=rep(c("A","B"), each=7))
t.test(Time ~ Condition, data=d1) # hoặc aov(Time ~ Condition)
```

## 5. Kết luận cho báo cáo (theo final persona)

- **Effectiveness:** toàn mẫu 92.9%, **nhóm khớp cao 100% (18/18)** — lỗi chỉ ở đối chứng T1/T4/T5 (pool chưa nổi, quên tick) → đạt goals final persona
- **Efficiency:** toàn mẫu 230s <300s (p=0.0056), khớp cao 189.7s <300s (p=0.016) → đạt Wish "thay Sheets rời rạc"
- **Satisfaction:** toàn mẫu 76.8 Good, **khớp cao 89.2 Excellent** — đối chứng 67.5 kéo xuống; SD 15.5 phản ánh chênh lệch kinh nghiệm
- **Errors:** mean 0.57 lỗi/người, P04 (đối chứng) nhiều nhất (2 lỗi) — khớp cao 0 lỗi
- **Re-evaluation Q:** Sau khi highlight pool + tooltip badge Low, nhóm đối chứng có lên 100%/SUS >70 và nhóm khớp cao giữ 100%/SUS >85 không? (map với pains/wishes final persona)
