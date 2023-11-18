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

| Commit Type | Title                    | Description                                                                                                 | Emoji |
| ----------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- | :---: |
| `feat`      | Features                 | A new feature                                                                                               |  ✨   |
| `fix`       | Bug Fixes                | A bug Fix                                                                                                   |  🐛   |
| `docs`      | Documentation            | Documentation only changes                                                                                  |  📚   |
| `style`     | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |  💎   |
| `refactor`  | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                                   |  📦   |
| `perf`      | Performance Improvements | A code change that improves performance                                                                     |  🚀   |
| `test`      | Tests                    | Adding missing tests or correcting existing tests                                                           |  🚨   |
| `build`     | Builds                   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |  🛠   |
| `ci`        | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |  ⚙️   |
| `chore`     | Chores                   | Other changes that don't modify src or test files                                                           |  ♻️   |
| `revert`    | Reverts                  | Reverts a previous commit                                                                                   |  🗑   |

`Scopes` (không bắt buộc):

- `app`: các thay đổi liên quan đến ứng dụng
- `lib`: các thay đổi liên quan đến thư viện
- `config`: các thay đổi liên quan đến cấu hình
- (...)

`Short summary`: sử dụng tiếng Anh hoặc tiếng Việt, tối đa 100 ký tự.

- Không viết in hoa.
- Không dùng dấu chấm cuối câu.

Chi tiết: [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/), [commit types](https://github.com/pvdlg/conventional-commit-types/blob/master/README.md?plain=1), [example](https://nitayneeman.com/posts/understanding-semantic-commit-messages-using-git-and-angular/)

Mẫu:

```bash
feat(app): add login page
```
