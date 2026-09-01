# Standard Folder Structure Template

Mỗi thư mục chức năng (module) trong dự án phải tuân thủ cấu trúc sau để đảm bảo tính nhất quán, dễ quản lý và đúng quy chuẩn đã thống nhất:

```text
module_name/
├── data/          # Lưu trữ toàn bộ dữ liệu, file thô, assets...
│   ├── assets/    # Ảnh gốc, icons, tài nguyên đầu vào
│   ├── output/    # Các tệp kết quả (HTML, CSS, Images, Reports...)
│   └── raw/       # Dữ liệu thô (.csv, .json...)
├── skill.md       # Hướng dẫn thực hiện công việc (kiến thức, tư duy)
├── plan.md        # Kế hoạch triển khai cho module (atomic steps)
├── changelog.md   # Nhật ký thay đổi (cập nhật sau mỗi thay đổi lớn)
└── messages.md    # Nhật ký tương tác (cập nhật sau mỗi lần AI trả lời)
```

### Quy định bổ sung:
- **Tự động hóa:** Mọi thư mục mới phải được tạo ra với đủ các thành phần này ngay từ đầu.
- **Dọn dẹp:** Các module cũ chưa tuân thủ sẽ được tái cấu trúc (refactor) dần dần khi có tương tác trực tiếp hoặc theo yêu cầu cụ thể của người dùng.
- **Độc lập:** Mỗi thư mục là một đơn vị độc lập, không phụ thuộc vào dữ liệu nằm ngoài trừ khi có quy định khác trong `AGENTS.md`.
- **Generated Assets:** Các tệp được tạo ra trong quá trình làm việc (HTML, CSS, Images, Reports) **bắt buộc** phải lưu vào `data/output/` để giữ không gian module sạch sẽ.
