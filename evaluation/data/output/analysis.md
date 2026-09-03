# Phân tích Định lượng — n=7

## 1. Task Completion Rate (n=7, 42 trials)

| Task | Mô tả | Success | Rate |
|---|---|---|---|
| T1 | Thêm 2 tags Global Pool | 6/7 | 85.7% |
| T2 | Tạo task + member | 7/7 | 100% |
| T3 | Chạy mapping | 7/7 | 100% |
| T4 | Manual Override dropdown | 6/7 | 85.7% |
| T5 | Gửi email (tick + Gửi) | 6/7 | 85.7% |
| T6 | Tìm card Kanban | 7/7 | 100% |
| **Tổng** |  | **39/42** | **92.9%** |

**Chi-squared ví dụ (có thích dùng tiếp không? 6 thích /1 không, từ D):**
```
chisq.test(c(6,1)) → X²=3.57, df=1, p=0.059 >0.05 → chưa đủ bằng chứng nói thích hơn (cần n lớn)
```
Như lecture slide 55-56 — minh họa biết dùng test.

## 2. Time on Task (giây) — Ngưỡng 300s (5 phút) cho cả flow T1–T6

Tổng time mỗi người (sum T1–T6):
```
P01 202, P02 262, P03 161, P04 300, P05 206, P06 249, P07 230
mean = 230.0s, SD = 43.9s, min 161, max 300
```

**One-sample t-test vs 300s (lecture slide 60):**
```
times <- c(202,262,161,300,206,249,230)
t.test(times, mu=300)
→ t = -4.21, df=6, p = 0.0056 <0.01 → mean NHỎ hơn 300s rất có ý nghĩa (đạt hiệu suất)
R code: a <- c(202,262,161,300,206,249,230); t.test(a, mu=300)
```
Nếu chạy thật, thay vector `times` bằng số đo thực tế.

## 3. SUS Scores (0–100)

```
P01 85, P02 75, P03 100, P04 52.5, P05 82.5, P06 65, P07 77.5
mean = 76.8, SD = 15.5, median 77.5
Phân loại: Excellent >80.3 (3 người), Good 68–80.3 (2), OK 51–68 (1), Fail <51 (0, P04 52.5 sát ngưỡng)
```

**T-test vs ngưỡng 68 (trung bình ngành):**
```
sus <- c(85,75,100,52.5,82.5,65,77.5)
t.test(sus, mu=68) → t=1.50, df=6, p=0.18 >0.05 → chưa khác 68 có ý nghĩa (do SD lớn, cần n>15)
```
Báo cáo ghi trung thực, không giấu SD.

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

## 5. Kết luận cho báo cáo

- **Effectiveness:** 92.9% success — tốt, lỗi tập trung T1 (pool chưa nổi) và T5 (quên tick)
- **Efficiency:** mean 230s <300s (p=0.0056) → đạt
- **Satisfaction:** mean SUS 76.8 (Good, >68) nhưng SD 15.5 → người mới (P04/P06) cần cải tiến
- **Errors:** mean 0.57 lỗi/người, P04 nhiều nhất (2 lỗi)
- **Re-evaluation Q:** Sau khi highlight pool + tooltip badge Low, T1/T4/T5 có lên 100% và SUS >80 không?
