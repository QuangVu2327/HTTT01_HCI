/**
 * TẠO GOOGLE FORM KHẢO SÁT — Công cụ hỗ trợ lập kế hoạch và phân công việc nhóm
 * -------------------------------------------------------------------------
 * CÁCH CHẠY (1 lần duy nhất, mất ~2 phút):
 *   1. Mở https://script.google.com  rồi bấm "New project".
 *   2. Xóa code mặc định, dán toàn bộ nội dung file này vào.
 *   3. Trong thanh công cụ, chọn hàm `createGroupSurveyForm` rồi bấm Run.
 *   4. Nếu được hỏi quyền (Authorize) → chọn tài khoản → "Advanced" → Allow.
 *   5. Chờ chạy xong, bấm View Log để lấy 3 đường link:
 *        - Link Form : chia sẻ cho người trả lời (không cần đăng nhập).
 *        - Link câu trả lời: bảng tính Google Sheets chứa kết quả.
 * NOTE: muốn tạo bản mới thì chạy lại hàm (mỗi lần tạo 1 form mới).
 */

function createSurveyForm() {
  var TITLE = 'Khảo sát: Công cụ hỗ trợ lập kế hoạch và phân công việc nhóm';

  var form = FormApp.create(TITLE);
  form.setTitle(TITLE);
  form.setDescription(
    'Khảo sát này tìm hiểu cách bạn làm việc nhóm và đánh giá ý tưởng ' +
    'về một công cụ giúp phân công công việc tự động, dựa trên kỹ năng của từng thành viên. ' +
    'Ý kiến của bạn là ẩn danh. Thời gian trả lời khoảng 5–7 phút.'
  );
  form.setConfirmationMessage('Cảm ơn bạn đã tham gia khảo sát!');
  form.setCollectEmail(false); // Ẩn danh

  // ===== Phần A — Thông tin chung =====
  form.addPageBreakItem().setTitle('Phần A — Thông tin chung');

  form.addMultipleChoiceItem()
    .setTitle('1. Bạn đang là?')
    .setChoiceValues(['Sinh viên', 'Học sinh', 'Người đi làm'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('2. Bạn đang ở năm học nào?')
    .setChoiceValues(['Năm 1', 'Năm 2', 'Năm 3', 'Năm 4+', 'Không phải sinh viên'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('3. Mỗi học kỳ bạn thường tham gia bao nhiêu dự án/công việc nhóm?')
    .setChoiceValues(['Chưa bao giờ', '1–2 lần', '3–4 lần', '5 lần trở lên'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('4. Nhóm của bạn thường có bao nhiêu người?')
    .setChoiceValues(['2–3 người', '4–5 người', '6 người trở lên'])
    .setRequired(true);

  // ===== Phần B — Hiện trạng làm việc nhóm =====
  form.addPageBreakItem().setTitle('Phần B — Hiện trạng làm việc nhóm');

  form.addCheckboxItem()
    .setTitle('5. Bạn dùng công cụ nào để quản lý công việc nhóm? (Chọn nhiều)')
    .setChoiceValues([
      'Messenger, Zalo, nhóm chat',
      'Google Sheets / Google Docs',
      'Trello, Notion, Asana, Jira',
      'Email',
      'Không dùng công cụ nào'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('6. Việc phân công công việc hiện tại diễn ra thế nào? (Chọn 1 nổi bật nhất)')
    .setChoiceValues([
      'Trưởng nhóm tự quyết định và giao việc',
      'Cả nhóm họp bàn và thống nhất',
      'Bốc thăm / tùy tiện',
      'Dựa trên kỹ năng và khối lượng hiện có của từng người'
    ])
    .setRequired(true);

  form.addScaleItem()
    .setTitle('7. Bạn hài lòng đến đâu với cách phân công hiện tại?')
    .setBounds(1, 10)
    .setLabels('Rất không hài lòng', 'Rất hài lòng')
    .setRequired(true);

  // ===== Phần C — Khó khăn =====
  form.addPageBreakItem().setTitle('Phần C — Khó khăn');

  form.addCheckboxItem()
    .setTitle('8. Bạn từng gặp những khó khăn nào khi làm việc nhóm? (Chọn nhiều)')
    .setChoiceValues([
      'Mất cân bằng khối lượng việc giữa các thành viên',
      'Không rõ nhiệm vụ, deadline của mình',
      'Khó theo dõi tiến độ của cả nhóm',
      'Bị giao việc không đúng kỹ năng/sở trường',
      'Xung đột, nhắc nhở nhiều lần',
      'Không gặp khó khăn nào'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('9. Tần suất của tình trạng "người thì quá tải, người thì rảnh"?')
    .setChoiceValues(['Thường xuyên', 'Thỉnh thoảng', 'Hiếm khi', 'Không bao giờ'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('10. Bạn có từng nhận công việc không đúng chuyên môn của mình không?')
    .setChoiceValues(['Thường xuyên', 'Thỉnh thoảng', 'Hiếm khi', 'Không bao giờ'])
    .setRequired(true);

  // ===== Phần D — Giới thiệu và đánh giá giải pháp =====
  form.addPageBreakItem()
    .setTitle('Phần D — Giới thiệu và đánh giá giải pháp')
    .setHelpText(
      'Ý tưởng: trưởng nhóm nhập (1) danh sách nhiệm vụ kèm yêu cầu kỹ năng + độ khó, ' +
      '(2) hồ sơ kỹ năng của từng thành viên (junior/mid/senior) và thời gian rảnh. ' +
      'Hệ thống tự đề xuất cách phân công tối ưu và sinh timeline/Gantt dự kiến cho nhóm.'
    );

  form.addScaleItem()
    .setTitle('11. Mức độ hữu ích của tính năng "tự gợi ý ai nên làm việc gì" (dựa trên kỹ năng)?')
    .setBounds(1, 5)
    .setLabels('Vô ích', 'Rất hữu ích')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('12. Mức độ hữu ích của tính năng "tự sinh timeline/Gantt ước tính"?')
    .setBounds(1, 5)
    .setLabels('Vô ích', 'Rất hữu ích')
    .setRequired(true);

  form.addScaleItem()
    .setTitle('13. Mức độ hữu ích của tính năng "cảnh báo quá tải / rủi ro trễ deadline"?')
    .setBounds(1, 5)
    .setLabels('Vô ích', 'Rất hữu ích')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('14. Bạn có sẵn sàng dùng công cụ này cho dự án tiếp theo không?')
    .setChoiceValues(['Chắc chắn có', 'Có thể', 'Không chắc', 'Không'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('15. Điều gì khiến bạn ngại nhất khi chuyển sang dùng công cụ mới? (Chọn tối đa 2)')
    .setChoiceValues([
      'Mất thời gian học cách dùng',
      'Cấu hình quá phức tạp',
      'Thay đổi cách dùng / thói quen (đang dùng chat, bảng tính)',
      'Không muốn bị công cụ khuyến nghị phân công',
      'Không ngại điều gì'
    ])
    .setRequired(true);

  // ===== Phần E — Ý kiến mở =====
  form.addPageBreakItem().setTitle('Phần E — Ý kiến mở');

  form.addParagraphTextItem()
    .setTitle('16. Tính năng nào bạn mong muốn có thêm ở công cụ này?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('17. Bạn có góp ý hoặc ý tưởng nào khác không?')
    .setRequired(false);

  // Gắn bảng câu trả lời (Google Sheet) + in link
  var spreadsheet = SpreadsheetApp.create('Khảo sát công việc nhóm — Câu trả lời');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());

  var longUrl = form.getPublishedUrl();
  Logger.log('LINK FORM: ' + form.shortenFormUrl(longUrl));
  Logger.log('LINK FORM (dạng dài): ' + longUrl);
  Logger.log('LINK BẢNG KẾT QUẢ: ' + spreadsheet.getUrl());
}