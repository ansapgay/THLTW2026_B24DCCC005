# Blog Application - Thực Hành 07

## Tổng Quan

Ứng dụng Blog cá nhân cho phép người dùng viết bài, quản lý nội dung và đọc các bài viết. Ứng dụng được xây dựng với React, TypeScript, UmiJS và Ant Design.

## Các Chức Năng Chính

### 1. 📖 Trang Chủ Blog (`/blog`)
- ✅ Hiển thị danh sách bài viết dưới dạng Card gồm:
  - Ảnh đại diện
  - Tiêu đề
  - Tóm tắt
  - Ngày đăng
  - Tác giả
  - Thẻ tag
- ✅ Phân trang - hiển thị 9 bài mỗi trang
- ✅ Lọc bài viết theo thẻ tag (nhấn vào tag để lọc)
- ✅ Tìm kiếm bài viết theo từ khóa với debounce 300ms

### 2. 📄 Trang Chi Tiết Bài Viết (`/blog/:slug`)
- ✅ Hiển thị toàn bộ nội dung bài viết (render Markdown)
- ✅ Hiển thị thông tin tác giả, ngày đăng, danh sách thẻ
- ✅ Số lượt xem (view count) tự động tăng mỗi lần truy cập
- ✅ Phần bài viết liên quan (cùng thẻ, trừ bài đang xem)
- ✅ Nút quay lại danh sách

### 3. 👤 Trang Giới Thiệu (`/blog-about`)
- ✅ Thông tin tác giả: ảnh đại diện, tên, tiểu sử
- ✅ Kỹ năng: Frontend, Backend, Tools
- ✅ Liên kết mạng xã hội: GitHub, LinkedIn, Twitter, Email

### 4. 📝 Quản Lý Bài Viết (`/blog-admin`)
- ✅ Table hiển thị danh sách bài viết:
  - Tiêu đề
  - Trạng thái (Draft/Published)
  - Thẻ
  - Lượt xem
  - Ngày tạo
- ✅ Tìm kiếm theo tiêu đề
- ✅ Lọc theo trạng thái (Nháp / Đã đăng)
- ✅ Thêm bài viết mới: Form với các trường:
  - Tiêu đề
  - Slug
  - Nội dung (Markdown)
  - Ảnh đại diện (URL)
  - Thẻ
  - Trạng thái
- ✅ Sửa bài viết: form điền sẵn thông tin cũ
- ✅ Xóa bài viết: hiển thị Popconfirm xác nhận trước khi xóa

### 5. 🏷️ Quản Lý Thẻ (Tab trong Blog Admin)
- ✅ Danh sách thẻ với tên và số bài viết đang sử dụng
- ✅ Thêm / Sửa / Xóa thẻ (Modal)

## Cấu Trúc Dự Án

```
baseltw/
├── mock/
│   └── blog.ts                      # Mock API cho Blog
├── src/
│   ├── models/
│   │   └── blog.ts                  # TypeScript interfaces cho Blog
│   ├── services/
│   │   └── Blog/
│   │       └── blog.ts              # API service
│   ├── pages/
│   │   ├── Blog/
│   │   │   ├── index.tsx            # Trang chủ blog
│   │   │   ├── detail.tsx           # Trang chi tiết
│   │   │   └── index.less           # Styles
│   │   ├── BlogAdmin/
│   │   │   ├── index.tsx            # Admin page
│   │   │   ├── PostForm.tsx         # Form tạo/sửa bài
│   │   │   ├── TagManagement.tsx    # Quản lý tag
│   │   │   └── admin.less           # Styles
│   │   └── BlogAbout/
│   │       ├── index.tsx            # Trang giới thiệu
│   │       └── about.less           # Styles
│   ├── components/
│   │   └── MarkdownRenderer/        # Component render markdown
│   │       ├── index.tsx
│   │       └── markdown.less
│   └── utils/
│       └── markdownUtil.ts          # Markdown parser utility
├── config/
│   └── routes.ts                    # Routes được cập nhật
```

## Các Route

| Route | Mô Tả |
|-------|-------|
| `/blog` | Trang chủ blog - danh sách bài viết |
| `/blog/:slug` | Trang chi tiết bài viết |
| `/blog-admin` | Trang quản lý bài viết và thẻ |
| `/blog-about` | Trang giới thiệu tác giả |

## Công Nghệ Sử Dụng

- **Framework**: React 17, TypeScript
- **State Management**: UmiJS (DVA)
- **UI Library**: Ant Design 4.21
- **Markdown**: Custom Markdown Parser
- **Mock API**: Mock server tích hợp
- **Styling**: Less CSS

## Cách Chạy Ứng Dụng

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy development server
```bash
npm start
# hoặc
npm run dev
```

### 3. Truy cập ứng dụng
```
http://localhost:8000/blog
```

## Hướng Dẫn Sử Dụng

### Viết bài viết mới
1. Truy cập `/blog-admin`
2. Click tab "Post Management"
3. Click nút "New Post"
4. Điền thông tin:
   - Tiêu đề
   - Slug (URL-friendly)
   - Tóm tắt
   - Thumbnail URL
   - Nội dung (Markdown format)
   - Chọn thẻ
   - Chọn trạng thái (Draft/Published)
5. Click "Save"

### Quản lý thẻ
1. Truy cập `/blog-admin`
2. Click tab "Tag Management"
3. Có thể:
   - Thêm thẻ mới: Click "New Tag"
   - Sửa thẻ: Click biểu tượng edit
   - Xóa thẻ: Click biểu tượng delete

### Xem bài viết
1. Truy cập `/blog`
2. Tìm kiếm hoặc lọc theo tag
3. Click vào card bài viết để xem chi tiết

## Mock Data

Ứng dụng đi kèm với mock data bao gồm:
- 10 bài viết mẫu (8 published, 2 draft)
- 4 thẻ mẫu (React, TypeScript, UmiJS, Web Development)

Các mock endpoint:
- `GET /api/blog/posts` - Lấy danh sách bài viết
- `GET /api/blog/posts/:slug` - Lấy chi tiết bài viết
- `POST/PUT/DELETE /api/blog/posts/*` - Quản lý bài viết
- `GET/POST/PUT/DELETE /api/blog/tags/*` - Quản lý thẻ

## Markdown Syntax

Ứng dụng hỗ trợ các định dạng Markdown cơ bản:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

[Link text](https://example.com)

`inline code`

\`\`\`javascript
// Code block
const greeting = "Hello, World!";
\`\`\`

- Bullet list item
- Another item

1. Ordered list item
2. Another item

> Block quote

---
Horizontal rule
```

## Tính Năng Nổi Bật

### 1. View Count Tracking
- Mỗi lần truy cập trang chi tiết bài viết, view count tự động tăng 1

### 2. Debounce Search
- Tìm kiếm có delay 300ms để tránh gọi API quá nhiều

### 3. Markdown Rendering
- Support render markdown content thành HTML với formatting đẹp

### 4. Related Posts
- Hiển thị 3 bài viết liên quan dựa trên cùng thẻ

### 5. Tag Filtering
- Nhấn vào tag để lọc bài viết có tag đó
- Toggle để bỏ filter

### 6. Pagination
- Hiển thị 9 bài mỗi trang
- Navigation mượt mà (scroll to top)

## Lưu Ý

- Mock API là in-memory, nên dữ liệu sẽ reset khi refresh page
- Để lưu dữ liệu persistent, cần tích hợp với backend thực

## Thành Phần Thực Hiện

- Blog Models & Types
- Blog Services (API calls)
- Blog Home Page
- Blog Detail Page
- Blog Admin Page
- Post Management
- Tag Management
- About Page
- Markdown Renderer
- Mock API Endpoints

---

**Hạn Nộp**: 17h ngày 22/04/2026  
**Repository**: https://github.com/ansapgay/THLTW2026_B24DCCC005  
**Branch**: TH07
