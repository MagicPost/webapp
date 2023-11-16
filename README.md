## Các lệnh

Nếu chưa cài `pnpm`:

```bash
npm i -g pnpm
```

Chạy development server

```bash
pnpm i
pnpm dev
```

## Cấu trúc thư mục

- `husky`: các hook của git
- `.next`: các file build của nextjs
- `public`: các file tĩnh (css, js, ảnh, ...)
- `src`: source code
  - `app`: các route của ứng dụng
  - `components`: các component dùng chung
  - `lib`: các hàm dùng chung
- Các file config khác (...)

## Các thư viện, framework sử dụng

- [nextjs](https://nextjs.org/)
- [tailwindcss](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Quy tắc

- Các file `.tsx` đặt trong thư mục `src` sẽ được tự động format & kiểm tra lỗi khi commit

### Các quy tắc viết commit message

Commit message phải tuân theo cấu trúc sau:

```bash
<type>(<scope>): <short summary>
```

`Type` là một trong các loại sau:

- `feat`: thêm tính năng mới
- `fix`: sửa lỗi
- `docs`: thay đổi tài liệu
- `refactor`: thay đổi code nhưng không thêm tính năng mới và không sửa lỗi
- `perf`: thay đổi code nhằm cải thiện hiệu năng
- `chore`: thay đổi các công cụ hỗ trợ phát triển (build system, ci, ...)
- `build`: thay đổi cấu hình build
- `ci`: thay đổi cấu hình CI
- `release`: thay đổi phiên bản
- `test`: thêm hoặc sửa test
- `revert`: hoàn tác commit trước đó

`Scopes` (không bắt buộc):

- `app`: các thay đổi liên quan đến ứng dụng
- `lib`: các thay đổi liên quan đến thư viện
- `config`: các thay đổi liên quan đến cấu hình
- (...)

`Short summary`: sử dụng tiếng Anh hoặc tiếng Việt, tối đa 100 ký tự.

- Không viết in hoa.
- Không dùng dấu chấm cuối câu.

Chi tiết: [conventional commits](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-guidelines)

Mẫu:

```bash
feat(app): add login page
```
