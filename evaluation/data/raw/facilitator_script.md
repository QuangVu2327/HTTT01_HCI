# Facilitator Script — Usability Test TaskAssign AI

> Gửi cho người điều phối (facilitator) + note-taker. Mỗi phiên 25–30 phút, 1 người/lượt. Đọc **verbatim** phần trong `>`.

## Trước phiên (2 phút)

1. Chuẩn bị: laptop mở `prototype/` (hoặc `wireframe/index.html` backup), OBS quay màn hình, form `sus_form.md`, `observation_sheet.csv` đã mở.
2. Chào:

> Xin chào, cảm ơn bạn tham gia đánh giá công cụ phân công việc nhóm TaskAssign AI. Buổi này nhằm kiểm tra **công cụ**, không phải kiểm tra bạn. Mọi thao tác sai đều là lỗi thiết kế — hãy nói to suy nghĩ (think-aloud). Bạn có đồng ý ghi màn hình + ghi âm không? (ký `consent_form.md`)

3. Pre-questionnaire (ghi vào sheet): Năm học / Vai trò (trưởng nhóm / thành viên / GV) / Công cụ quen dùng (chat/Sheets/Trello...)

## Demo think-aloud 30s

> Ví dụ: "Tôi đang nhìn nút màu xanh 'Tự động phân công', tôi đoán bấm vào sẽ gợi ý ai làm gì, tôi sẽ bấm thử..." — Hãy nói như vậy suốt buổi, nếu im lặng mình sẽ nhắc nhẹ "Bạn đang nghĩ gì?".

## Tasks — đọc verbatim, không gợi ý

### T1 — Global Tags (2 phút)
> **Nhiệm vụ 1:** Hãy thêm 2 kỹ năng mới vào danh mục dùng chung, ví dụ "ReactJS" và "Python". Nói cho mình biết bạn thấy chúng ở đâu sau khi thêm.

**Success:** 2 tag xuất hiện trong pool và trong dropdown Task/Member.

### T2 — Nhập Task + Member (3 phút)
> **Nhiệm vụ 2:** Tạo 1 công việc mới tên "Viết API 6h" yêu cầu tag Backend, và thêm 1 thành viên tên "An" email an@test.com có tag Backend và 12h rảnh. Xong hãy chỉ cho mình chúng ở đâu.

**Success:** task + member xuất hiện trong bảng.

### T3 — Chạy mapping (3 phút)
> **Nhiệm vụ 3:** Bấm nút "Chạy Tự động Phân công" và cho biết hệ thống gợi ý ai làm "Viết API 6h", điểm số bao nhiêu, màu badge là gì.

**Success:** thấy bảng preview, đọc được member + totalScore + badge High/Mid/Low.

### T4 — Manual Override (2 phút)
> **Nhiệm vụ 4:** Đổi người làm "Viết API 6h" sang người khác bằng dropdown. Bạn thấy điểm số thay đổi thế nào?

**Success:** dropdown đổi, badge cập nhật, toast "Đã ghi nhận".

### T5 — Gửi thông báo (2 phút)
> **Nhiệm vụ 5:** Bấm "Gửi email Thông báo Toàn đội", tick xác nhận và bấm Gửi. Bạn thấy gì sau đó?

**Success:** modal mở → tick → toast "Đã gửi tới N thành viên".

### T6 — Kanban (2 phút)
> **Nhiệm vụ 6:** Chuyển sang tab Kanban, lọc "Việc của tôi" (hoặc tìm task của An). Card nằm ở cột nào?

**Success:** card đúng cột To Do/Doing/Done, thấy tag + deadline + score.

## Sau tasks (5 phút)

1. Cho làm **SUS 10 câu** (`sus_form.md`, 1–5, ~2 phút)
2. Phỏng vấn ngắn:

> 1. Điều gì dễ nhất / khó nhất vừa rồi?
> 2. Bạn có hiểu điểm số 0.7 skill + 0.3 thời gian và màu High/Mid/Low không? Chỗ nào chưa rõ?
> 3. Bạn muốn cải tiến gì trước khi dùng cho đồ án thật?

3. Cảm ơn: > Cảm ơn bạn rất nhiều, phản hồi của bạn sẽ giúp cải tiến thiết kế!

## Ghi chép

- Ghi `observation_sheet.csv`: time (bấm giờ từ khi đọc task tới success), success (1/0), errors, help requests, quotes.
- Nếu bí >2 phút: ghi `fail` + số lần hỏi help, không chỉ tay.
- Nhắc think-aloud nhẹ nếu im lặng >15s.

## Checklist mang theo

- [ ] Laptop + prototype build OK + backup `wireframe/index.html`
- [ ] OBS / screen record
- [ ] In `facilitator_script.md` + `consent_form.md` + `sus_form.md`
- [ ] `observation_sheet.csv` mở sẵn
- [ ] Bánh/kẹo nhỏ cảm ơn (optional)
