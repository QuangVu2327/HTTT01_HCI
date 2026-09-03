/**
 * TẠO GOOGLE FORM ĐÁNH GIÁ KHẢ DỤNG — TaskAssign AI (Usability Test)
 * -------------------------------------------------------------------------
 * CÁCH CHẠY (1 lần, ~2 phút):
 *   1. Mở https://script.google.com → New project
 *   2. Xóa code mặc định, dán toàn bộ file này vào
 *   3. Chọn hàm `createEvaluationForm` → Run
 *   4. Authorize → Advanced → Allow
 *   5. View Log (Ctrl+Enter) để lấy:
 *        - LINK FORM (rút gọn): gửi cho người tham gia qua chat
 *        - LINK FORM (dài): backup
 *        - LINK BẢNG KẾT QUẢ: Google Sheet tự động
 *   6. Dán link prototype vào mô tả Part B trước khi gửi:
 *      thay `YOUR_PROTOTYPE_LINK` bằng link Vercel hoặc `wireframe/index.html` Drive link
 */

function createEvaluationForm() {
  var TITLE = 'Đánh giá khả dụng — TaskAssign AI (Usability Test)';
  var PROTOTYPE_LINK = 'YOUR_PROTOTYPE_LINK'; // TODO: thay bằng link prototype/wireframe thật

  var form = FormApp.create(TITLE);
  form.setTitle(TITLE);
  form.setDescription(
    'Cảm ơn bạn tham gia đánh giá công cụ TaskAssign AI (tự động gợi ý phân công việc nhóm).\n' +
    'Mục đích: kiểm tra CÔNG CỤ, không phải kiểm tra bạn. Mọi khó khăn đều là lỗi thiết kế.\n' +
    'Đối tượng chuẩn: FINAL PERSONA Nguyễn Minh Anh (21t, SV năm 4, Trưởng nhóm 3–6 người, Laptop+Zalo+Sheets) — xem persona/final_persona/data/output/student_leader_deep.png. Kết quả sẽ đối chiếu với final persona này.\n' +
    'Thời gian: ~20 phút (6 nhiệm vụ + 10 câu SUS). Dữ liệu ẩn danh, chỉ dùng cho môn CSC12106.\n' +
    'Link prototype: ' + PROTOTYPE_LINK + '\n' +
    'Nếu không mở được prototype, dùng backup: wireframe/index.html (mở trực tiếp).'
  );
  form.setConfirmationMessage('Cảm ơn bạn đã hoàn thành đánh giá! Kết quả đã được ghi nhận.');
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setAcceptingResponses(true);

  // ===== Phần A — Thông tin người tham gia =====
  form.addPageBreakItem().setTitle('Phần A — Thông tin người tham gia (ẩn danh)');

  form.addMultipleChoiceItem()
    .setTitle('A1. Bạn đang là? (so khớp final persona: SV năm 3–4 là chuẩn)')
    .setChoiceValues(['Sinh viên Năm 1', 'Sinh viên Năm 2', 'Sinh viên Năm 3', 'Sinh viên Năm 4+', 'Người đi làm', 'Khác'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('A2. Vai trò khi làm việc nhóm gần nhất? (final persona = Trưởng nhóm/Điều phối 3–6 người)')
    .setChoiceValues(['Trưởng nhóm (hay giao việc) — khớp final persona', 'Thành viên (được giao việc)', 'Giảng viên / Mentor', 'Chưa từng làm nhóm'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('A3. Công cụ bạn hay dùng để quản lý việc nhóm? (chọn nhiều) — final persona dùng Messenger/Zalo + Sheets')
    .setChoiceValues(['Messenger/Zalo nhóm chat', 'Google Sheets/Docs', 'Trello/Notion/Asana/Jira', 'Email', 'Không dùng gì'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('A4. Bạn đã từng dùng TaskAssign AI trước đây chưa?')
    .setChoiceValues(['Chưa từng', 'Đã xem qua 1 lần', 'Đã dùng thử'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('A5. Kinh nghiệm điều phối nhóm (số người / số dự án) — để đối chiếu với final persona (>3 năm, nhóm 4–6 người, 3–4 dự án/kỳ)')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('A6. Thiết bị chính khi làm nhóm? (final persona: Laptop + Smartphone)')
    .setRequired(false);

  // ===== Phần B — Thực hiện 6 nhiệm vụ =====
  form.addPageBreakItem()
    .setTitle('Phần B — Thực hiện 6 nhiệm vụ trên prototype')
    .setHelpText(
      'Mở prototype: ' + PROTOTYPE_LINK + '\n' +
      'Làm lần lượt T1→T6, bấm giờ từng task bằng điện thoại (giây). Ghi lại thời gian + thành công/không.\n' +
      'Hãy nói to suy nghĩ nếu có thể (think-aloud).'
    );

  var tasks = [
    'T1 — Thêm 2 kỹ năng mới (ví dụ ReactJS, Python) vào Global Skill Pool',
    'T2 — Tạo 1 task "Viết API 6h — Backend" + 1 member "An — an@test.com — Backend — 12h rảnh"',
    'T3 — Bấm "Chạy Tự động Phân công" → xem ai được gợi ý cho "Viết API 6h", điểm & màu badge',
    'T4 — Đổi người làm "Viết API 6h" sang người khác bằng dropdown (Manual Override)',
    'T5 — Bấm "Gửi email Thông báo Toàn đội" → tick xác nhận → Gửi',
    'T6 — Sang tab Kanban, tìm card "Viết API 6h" đang ở cột nào'
  ];

  for (var i = 0; i < tasks.length; i++) {
    var idx = i + 1;
    form.addMultipleChoiceItem()
      .setTitle(tasks[i] + ' — Bạn có hoàn thành không?')
      .setChoiceValues(['Hoàn thành', 'Không hoàn thành', 'Cần trợ giúp mới xong'])
      .setRequired(true);

    form.addTextItem()
      .setTitle(tasks[i] + ' — Thời gian (giây, điền số, ví dụ 45)')
      .setRequired(true)
      .setValidation(FormApp.createTextValidation().requireNumber().setHelpText('Chỉ điền số giây, ví dụ 45').build());

    form.addParagraphTextItem()
      .setTitle(tasks[i] + ' — Khó khăn / lỗi gặp (nếu có, bỏ qua nếu suôn sẻ)')
      .setRequired(false);
  }

  // ===== Phần C — SUS 10 câu =====
  form.addPageBreakItem()
    .setTitle('Phần C — Đánh giá cảm nhận (SUS — 10 câu, 1=Hoàn toàn không đồng ý, 5=Hoàn toàn đồng ý)')
    .setHelpText('Chọn 1–5 cho mỗi câu. Xen kẽ câu tích cực/tiêu cực là cố ý.');

  var susQs = [
    'C1. Tôi nghĩ mình sẽ muốn dùng hệ thống này thường xuyên.',
    'C2. Tôi thấy hệ thống phức tạp không cần thiết.',
    'C3. Tôi thấy hệ thống dễ sử dụng.',
    'C4. Tôi nghĩ mình sẽ cần hỗ trợ của người có kỹ thuật để dùng được hệ thống.',
    'C5. Tôi thấy các chức năng được tích hợp tốt.',
    'C6. Tôi thấy có quá nhiều sự không nhất quán.',
    'C7. Tôi nghĩ hầu hết mọi người sẽ học dùng hệ thống rất nhanh.',
    'C8. Tôi thấy hệ thống rất cồng kềnh khi dùng.',
    'C9. Tôi cảm thấy rất tự tin khi dùng hệ thống.',
    'C10. Tôi cần học rất nhiều trước khi dùng được.'
  ];

  for (var j = 0; j < susQs.length; j++) {
    form.addScaleItem()
      .setTitle(susQs[j])
      .setBounds(1, 5)
      .setLabels('Hoàn toàn không đồng ý', 'Hoàn toàn đồng ý')
      .setRequired(true);
  }

  // ===== Phần D — Phỏng vấn mở =====
  form.addPageBreakItem().setTitle('Phần D — Phỏng vấn ngắn (3 câu mở)');

  form.addParagraphTextItem()
    .setTitle('D1. Điều gì DỄ nhất và KHÓ nhất khi làm T1–T6?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('D2. Bạn có hiểu điểm số 0.7 skill + 0.3 thời gian và màu badge High (xanh) / Mid (vàng) / Low (đỏ) không? Chỗ nào chưa rõ?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('D3. Bạn muốn cải tiến gì trước khi dùng cho đồ án thật?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('D4. Góp ý thêm (nếu có)')
    .setRequired(false);

  // Gắn Sheet + in link
  var spreadsheet = SpreadsheetApp.create('TaskAssign AI — Usability Test — Kết quả');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());

  var longUrl = form.getPublishedUrl();
  Logger.log('LINK FORM (rút gọn): ' + form.shortenFormUrl(longUrl));
  Logger.log('LINK FORM (dài): ' + longUrl);
  Logger.log('LINK EDIT (chỉ bạn): ' + form.getEditUrl());
  Logger.log('LINK BẢNG KẾT QUẢ: ' + spreadsheet.getUrl());
  Logger.log('Nhớ thay YOUR_PROTOTYPE_LINK bằng link thật rồi gửi LINK FORM (rút gọn) cho người tham gia!');
}
