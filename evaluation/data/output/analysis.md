# Phân tích Định lượng — Mock Data n=5 (minh họa cách làm toán)

> Dữ liệu mẫu trong `data/raw/observation_sheet.csv` (P01–P05). Thay bằng dữ liệu thật sau khi chạy evaluation, chạy lại các phép tính dưới đây.

## 1. Task Completion Rate

| Task | Success / n | Rate |
|---|---|---|
| T1 | 4/5 | 80% |
| T2 | 5/5 | 100% |
| T3 | 5/5 | 100% |
| T4 | 4/5 | 80% |
| T5 | 4/5 | 80% |
| T6 | 5/5 | 100% |
| **Overall (30 trials)** | 27/30 | **90%** |

**Chi-squared test (thích vs không thích):** Nếu hỏi "Bạn có muốn dùng tiếp không?" 4 thích /1 không:
```
chisq.test(c(4,1)) → X²=1.8, df=1, p=0.18 >0.05 → chưa đủ bằng chứng nói thích hơn (cần n lớn hơn)
```
Như ví dụ lecture slide 55-56.

## 2. Time on Task (giây) — So với ngưỡng 300s (5 phút) cho cả flow T1–T6

Tổng time mỗi người (sum T1–T6):
- P01: 215, P02: 270, P03: 175, P04: 310, P05: 215 → mean = 237s, SD = 50.8

**One-sample t-test (lecture slide 60):**
```
times <- c(215,270,175,310,215)
t.test(times, mu=300)
→ t = -2.78, df=4, p = 0.049 <0.05 → mean NHỎ hơn 300s một cách có ý nghĩa (đạt ngưỡng 5 phút)
```
Nếu p >0.05 thì kết luận "không khác ngưỡng".

## 3. SUS Scores

P01 85, P02 65, P03 97.5, P04 42.5, P05 75 → mean = 73.0, SD = 20.6

- Ngưỡng 68: mean 73 >68 → Good (trên trung bình)
- Phân loại: 1 Excellent (>80.3): P03, 2 Good: P01/P05, 1 OK: P02, 1 Fail: P04
- **T-test so ngưỡng 68:**
```
sus <- c(85,65,97.5,42.5,75)
t.test(sus, mu=68) → t=0.54, p=0.62 >0.05 → chưa khác 68 có ý nghĩa (cần n nhiều hơn)
```

## 4. So sánh 2 version (nếu có) — Two-sample t-test (slide 61)

Ví dụ so time version A (prototype) vs B (wireframe tĩnh):
```
d1 <- data.frame(Time=c(215,270,175,310,215, 250,280,300,260,240), Condition=rep(c("A","B"), each=5))
t.test(Time ~ Condition, data=d1) hoặc aov(Time ~ Condition)
```

## 5. Kết luận cho báo cáo

- **Effectiveness:** 90% tasks success — tốt, lỗi tập trung T1 (Global Tags không nổi bật) và T5 (quên tick).
- **Efficiency:** mean 237s <300s (p=0.049) → đạt hiệu suất.
- **Satisfaction:** SUS 73 (Good), nhưng SD lớn → cần cải tiến cho người mới (P04).
- **Re-evaluation Q:** Sau khi thêm tooltip badge + highlight pool, completion T1/T4 có lên 100% và SUS có >80 không?

> Copy 5 bảng trên vào `report/src/main.md` §10. Thay mock bằng số thật, chạy lại `t.test` trong R hoặc https://www.socscistatistics.com/tests/studentttest/
