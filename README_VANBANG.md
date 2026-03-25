# Hệ thống Quản lý Sổ Văn bằng Tốt nghiệp - Bài Thực hành 04

## Mô tả
Ứng dụng giúp **phòng chuyên viên quản lý sổ văn bằng tốt nghiệp** và **người dùng tra cứu thông tin văn bằng**.

## Các chức năng chính

### 1. 📋 Quản lý Sổ Văn Bằng (`/van-bang/so-van-bang`)
- **Tạo/Cập nhật sổ**: Mỗi năm một sổ, số vào sổ tự động tăng từ 1
- **Thông tin sổ**:
  - Năm của sổ
  - Số vào sổ hiện tại (auto increment, reset khi mở sổ mới)
  - Số hiệu văn bằng (cấu hình)
  - Ngày tạo, ghi chú

### 2. 🎓 Quyết định Tốt nghiệp (`/van-bang/quyet-dinh-tot-nghiep`)
- **Quản lý các quyết định**: Trong 1 năm có nhiều đợt sinh viên tốt nghiệp
- **Thông tin quyết định**:
  - Số QĐ (VD: 001-QĐ/2024)
  - Ngày ban hành
  - Trích yếu quyết định
  - Reference đến Sổ văn bằng
  - Trạng thái: Nháp, Hoạt động, Đã đóng

### 3. ⚙️ Cấu hình Biểu mẫu (`/van-bang/cau-hinh-bieu-mau`)
- **Quản trị viên cấu hình trường thông tin**
- **Mỗi trường thông tin**:
  - Tên trường (VD: "Dân tộc", "Nơi sinh", "Điểm TB")
  - Kiểu dữ liệu: String, Number, Date
  - Bắt buộc hay không
  - Thứ tự hiển thị
  - Giá trị mặc định, mô tả
- **Hỗ trợ**: Thêm, Sửa, Xóa trường

### 4. 📄 Thông tin Văn bằng (`/van-bang/thong-tin-van-bang`)
- **CRUD thông tin chi tiết một bằng tốt nghiệp**
- **Mỗi bằng bao gồm**:
  - Số vào sổ (auto từ Sổ, không chỉnh sửa)
  - Số hiệu văn bằng
  - Mã sinh viên
  - Họ tên
  - Ngày sinh (bắt buộc)
  - Các trường thông tin từ biểu mẫu cấu hình
  - Quyết định tốt nghiệp
  - Lượt tra cứu (counter)
- **Hiển thị dynamic form** dựa trên cấu hình biểu mẫu

### 5. 🔍 Tra cứu Văn bằng (`/van-bang-search`) - **PUBLIC**
- **Người dùng có thể tra cứu mà không cần đăng nhập**
- **Tham số tìm kiếm** (yêu cầu ≥ 2 parameter):
  - Số hiệu văn bằng
  - Số vào sổ
  - Mã sinh viên
  - Họ tên
  - Ngày sinh
- **Kết quả**: Hiển thị thông tin văn bằng (không hiển thị toàn bộ dữ liệu nhạy cảm)
- **Ghi nhận**: Tự động tăng `luotTraCuu` khi tra cứu thành công

## Cấu trúc thư mục

```
src/
├── models/vanbang/
│   ├── index.ts                 # Export các hooks
│   ├── sovanbang.ts            # Model Sổ Văn Bằng
│   ├── quyetdinhtotnghiep.ts   # Model Quyết Định
│   ├── cauhinhbieumau.ts       # Model Cấu Hình
│   └── thongtinvanbang.ts      # Model Thông Tin
├── services/VanBang/
│   ├── constant.ts              # Constants
│   ├── SoVanBang/
│   │   ├── index.ts
│   │   └── typing.d.ts         # Interface
│   ├── QuyetDinhTotNghiep/
│   │   ├── index.ts
│   │   └── typing.d.ts
│   ├── CauHinhBieuMau/
│   │   ├── index.ts
│   │   └── typing.d.ts
│   └── ThongTinVanBang/
│       ├── index.ts            # Hỗ trợ search, addViewCount
│       └── typing.d.ts
└── pages/VanBang/
    ├── SoVanBang/
    │   ├── index.tsx           # CRUD page
    │   └── components/
    ├── QuyetDinhTotNghiep/
    │   ├── index.tsx
    │   └── components/
    ├── CauHinhBieuMau/
    │   ├── index.tsx
    │   └── components/
    ├── ThongTinVanBang/
    │   ├── index.tsx           # Dynamic form
    │   └── components/
    └── TraCuuVanBang/
        ├── index.tsx           # Public search page
        └── components/
```

## Routes

```
/van-bang/                      # Menu chính
├── so-van-bang                 # Quản lý sổ
├── quyet-dinh-tot-nghiep       # Quản lý quyết định
├── cau-hinh-bieu-mau           # Cấu hình biểu mẫu
└── thong-tin-van-bang          # Quản lý thông tin

/van-bang-search                # Tra cứu công khai
```

## Công nghệ

- **Frontend**: React + Umi + Ant Design Pro
- **State Management**: useModel hook (tương tự Redux nhưng đơn giản hơn)
- **UI Components**: Ant Design
- **HTTP Client**: Axios

## API Endpoints (giả sử)

Cần backend hỗ trợ:
- `POST /api/so-van-bang` - Thêm sổ
- `GET /api/so-van-bang?page=1&limit=10` - Lấy danh sách
- `PUT /api/so-van-bang/:id` - Cập nhật
- `DELETE /api/so-van-bang/:id` - Xóa

... (tương tự cho các entity khác)

- `POST /api/thong-tin-van-bang/search` - Tra cứu công khai
- `POST /api/thong-tin-van-bang/:id/add-view-count` - Tăng lượt tra cứu

## Hướng phát triển

1. **Backend API** - Cần xây dựng API server (Node.js, Java, Python)
2. **Database Schema** - Design các bảng tương ứng
3. **Authentication** - Intregrate với Keycloak (đã có trong dự án)
4. **Auto-increment Logic** - So vào sổ tự động tăng khi thêm mới
5. **Form Validation** - Validate theo kiểu dữ liệu
6. **Export/Import** - Hỗ trợ xuất nhập Excel

## Ghi chú

- Dự án sử dụng `useModel` hook từ Umi để quản lý state
- Các form tự động được render bởi component `TableBase` với modal CRUD
- Dynamic fields trong "Thông tin Văn bằng" được render dựa trên `CauHinhBieuMau`
- Tra cứu công khai không yêu cầu authentication nhưng PHẢI nhập ≥ 2 tham số

## Liên hệ

- Gửi repo link + mời git của thầy: thanhpq@ptit.edu.vn
- Deadline: 17h ngày 25/03/2026
