# THỰC HÀNH 07 - NỘP BÀI

## Thông Tin Bài Nộp

**Tên Bài**: Xây dựng ứng dụng Blog cá nhân  
**Hạn Nộp**: 17h ngày 22/04/2026  
**Trạng Thái**: ✅ Hoàn thành

## Repository Git

**Link Repository**: https://github.com/ansapgay/THLTW2026_B24DCCC005

**Branch**: `TH07`

**Commit chính**:
- feat: Blog system with post management, tags, and markdown rendering
- docs: Add Blog application README and documentation

## Các Chức Năng Đã Hoàn Thành

### ✅ Trang Chủ Blog
- [x] Danh sách bài viết dạng Card (ảnh, tiêu đề, tóm tắt, ngày đăng, tác giả, tag)
- [x] Phân trang - 9 bài/trang
- [x] Lọc theo tag
- [x] Tìm kiếm với debounce 300ms

### ✅ Trang Chi Tiết Bài Viết
- [x] Render nội dung Markdown
- [x] Thông tin tác giả, ngày đăng, tag
- [x] View count tự động tăng
- [x] Bài viết liên quan (cùng tag)
- [x] Nút quay lại

### ✅ Trang Giới Thiệu
- [x] Thông tin tác giả (avatar, tên, tiểu sử)
- [x] Danh sách kỹ năng
- [x] Liên kết mạng xã hội

### ✅ Quản Lý Bài Viết
- [x] Table: Tiêu đề, Trạng thái, Tag, Lượt xem, Ngày tạo
- [x] Tìm kiếm theo tiêu đề
- [x] Lọc theo trạng thái (Draft/Published)
- [x] Thêm bài viết mới
- [x] Sửa bài viết
- [x] Xóa bài viết (với Popconfirm)

### ✅ Quản Lý Thẻ
- [x] Danh sách thẻ với số bài viết
- [x] Thêm thẻ
- [x] Sửa thẻ
- [x] Xóa thẻ

## Cấu Trúc File

```
src/
├── models/blog.ts                   # TypeScript types
├── services/Blog/blog.ts            # API services
├── pages/
│   ├── Blog/
│   │   ├── index.tsx               # Home page
│   │   ├── detail.tsx              # Detail page
│   │   └── index.less
│   ├── BlogAdmin/
│   │   ├── index.tsx               # Admin dashboard
│   │   ├── PostForm.tsx            # Post form
│   │   ├── TagManagement.tsx       # Tag management
│   │   └── admin.less
│   └── BlogAbout/
│       ├── index.tsx               # About page
│       └── about.less
├── components/
│   └── MarkdownRenderer/           # Markdown renderer
│       ├── index.tsx
│       └── markdown.less
└── utils/markdownUtil.ts           # Markdown parser

config/routes.ts                    # Updated routes
mock/blog.ts                        # Mock API

BLOG_README.md                      # Documentation
```

## Routes

| Route | Tên | Chức Năng |
|-------|-----|----------|
| `/blog` | Blog Home | Danh sách bài viết |
| `/blog/:slug` | Blog Detail | Chi tiết bài viết |
| `/blog-admin` | Blog Admin | Quản lý bài viết & tag |
| `/blog-about` | About | Giới thiệu tác giả |

## Công Nghệ

- React 17 + TypeScript
- UmiJS Framework
- Ant Design
- Mock Server
- Custom Markdown Parser

## Cách Chạy

```bash
# Cài đặt
npm install

# Chạy development server
npm start
# hoặc
npm run dev

# Truy cập
http://localhost:8000/blog
```

## Mock Data

Ứng dụng đi kèm:
- 10 bài viết mẫu
- 4 thẻ mẫu
- Mock API endpoints

## Lưu Ý

- Dữ liệu mock là in-memory (reset khi reload)
- Hỗ trợ Markdown rendering cơ bản
- Tất cả UI responsive trên mobile

## Liên Hệ

**Email Giảng Viên**: thanhpq@ptit.edu.vn

---

**Submitted**: 22/04/2026  
**Branch**: TH07  
**Status**: Ready for Review ✅
