# Hệ Thống Quản Lý Câu Lạc Bộ và Đăng Ký Thành Viên - TH05

## Mô tả

Bài thực hành 05 xây dựng hệ thống quản lý câu lạc bộ đầy đủ với các chức năng:
- Quản lý danh sách câu lạc bộ (CRUD)
- Quản lý đơn đăng ký thành viên (CRUD + Duyệt/Từ chối hàng loạt)
- Quản lý thành viên câu lạc bộ (Chuyển CLB)
- Báo cáo và thống kê nâng cao

## Chức năng chính

### 1. Danh sách Câu lạc bộ (`/cau-lac-bo`)
- **Bảng quản lý**: Ảnh đại diện, Tên CLB, Ngày thành lập, Mô tả HTML, Chủ nhiệm, Hoạt động
- **Chức năng**: 
  - Thêm mới / Chỉnh sửa / Xóa câu lạc bộ
  - Xem danh sách thành viên
  - Tìm kiếm, sort trực tiếp trên table

### 2. Quản lý Đơn đăng ký Thành viên (`/cau-lac-bo/dang-ky`)
- **Bảng quản lý**: Họ tên, Email, SĐT, Giới tính, Địa chỉ, Sở trường, CLB, Lý do, Trạng thái, Ghi chú
- **Chức năng**:
  - Thêm mới / Xem chi tiết / Chỉnh sửa / Xóa đơn
  - **Duyệt/Từ chối hàng loạt**: Chọn nhiều đơn, duyệt hoặc từ chối cùng lúc
  - **Bắt buộc nhập lý do** khi từ chối
  - **Lịch sử thao tác**: Xem lại tất cả các hành động (duyệt/từ chối, admin, thời gian, lý do)

### 3. Quản lý Thành viên Câu lạc bộ (`/cau-lac-bo/thanh-vien`)
- **Bảng quản lý**: Danh sách thành viên đã duyệt (Approved)
- **Chức năng**:
  - Chọn 1 hoặc nhiều thành viên
  - Chuyển sang câu lạc bộ khác (modal xác nhận số lượng)

### 4. Báo cáo & Thống kê (`/cau-lac-bo/bao-cao`)
- **Thống kê chung**: Số CLB, Số đơn Pending, Approved, Rejected
- **Biểu đồ cột**: Số đơn đăng ký theo từng CLB (3 cột: Pending, Approved, Rejected)
- **Bảng chi tiết**: Thống kê theo từng câu lạc bộ

## Công nghệ sử dụng

- **Framework**: Umi.js (React 17)
- **UI Framework**: Ant Design 4.21
- **State Management**: Umi Models
- **Data Storage**: LocalStorage
- **Biểu đồ**: Recharts
- **Editor**: React Quill
- **Thời gian**: Dayjs

## Cấu trúc thư mục

```
src/
├── models/
│   ├── cauLacBo.ts              # State cho quản lý CLB
│   ├── dangKyThanhVien.ts       # State cho quản lý đơn đăng ký
│   └── thanhVienCauLacBo.ts     # State cho quản lý thành viên CLB
├── pages/
│   ├── CauLacBo/
│   │   ├── index.tsx            # Danh sách CLB
│   │   ├── Form.tsx             # Form CRUD CLB
│   │   └── ViewMembers.tsx      # Xem thành viên CLB
│   ├── DangKyThanhVien/
│   │   ├── index.tsx            # Danh sách đơn đăng ký
│   │   └── Form.tsx             # Form CRUD đơn đăng ký
│   ├── ThanhVienCauLacBo/
│   │   └── index.tsx            # Quản lý thành viên
│   └── BaoCaoThongKe/
│       └── index.tsx            # Báo cáo & thống kê
├── typings.d.ts                 # Type definitions
└── config/
    └── routes.ts                # Routes
```

## Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Chạy development server
```bash
npm start
```

Ứng dụng sẽ chạy tại: `http://localhost:8000`

### 3. Build production
```bash
NODE_OPTIONS="--openssl-legacy-provider" npm run build
```

## Dữ liệu mặc định

Hệ thống tự động tạo dữ liệu mặc định khi lần đầu khởi động:
- 2 câu lạc bộ mẫu
- 1 đơn đăng ký mẫu

## Ghi chú quan trọng

### Lịch sử thao tác
- Mỗi hành động duyệt/từ chối được ghi lại với:
  - Hành động (Approved/Rejected/ChangedCauLacBo)
  - Tên admin thực hiện
  - Thời gian (HH:mm:ss DD/MM/YYYY)
  - Lý do (bắt buộc khi từ chối)

### Chuyển CLB thành viên
- Khi chuyển CLB, lịch sử thao tác cũng được ghi nhận
- Có modal xác nhận trước khi thực hiện

### Dữ liệu lưu trữ
- Tất cả dữ liệu được lưu trong LocalStorage
- Bắt đầu ứng dụng lại sẽ giữ lại dữ liệu

## Náy của bài nộp

- **Repository**: https://gitlab.com/thanhpq1702/baseltw
- **Nhánh**: TH05
- **Commit**: feat: Xay dung he thong quan ly cau lac bo va dang ky thanh vien TH05

## Thời hạn

- **Hạn nộp**: 17h ngày 01/04/2026

## Liên hệ

- **Người hướng dẫn**: Phạm Quốc Thành
- **Email**: thanhpq@ptit.edu.vn

---

**Tác giả**: Bài thực hành TH05  
**Ngày tạo**: 01/04/2026
