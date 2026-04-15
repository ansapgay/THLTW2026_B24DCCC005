# Hệ Thống Quản Lý Đơn Hàng - Hướng Dẫn Triển Khai

## 📋 Tóm tắt

Đã xây dựng hệ thống quản lý đơn hàng hoàn chỉnh với tất cả các chức năng được yêu cầu trong bài tập giữa kỳ.

## 📦 Các tệp được tạo/chỉnh sửa

### 1. **Định nghĩa kiểu dữ liệu** (`src/typings.d.ts`)

Thêm namespace `DonHang` với các interface:

- `Customer` - Thông tin khách hàng
- `Product` - Thông tin sản phẩm
- `OrderProduct` - Chi tiết sản phẩm trong đơn hàng
- `Item` - Thông tin đơn hàng

### 2. **Model dữ liệu** (`src/models/donhang.ts`)

- Quản lý trạng thái đơn hàng
- Mock data khách hàng và sản phẩm
- Các hàm xử lý:
  - `saveOrder()` - Thêm/cập nhật đơn hàng
  - `cancelOrder()` - Hủy đơn hàng (chỉ khi trạng thái = "Chờ xác nhận")
  - `deleteOrder()` - Xóa đơn hàng
  - `getFilteredData()` - Tìm kiếm, lọc, sắp xếp
  - `generateOrderId()` - Sinh mã đơn hàng tự động
- Lưu trữ dữ liệu bằng localStorage

### 3. **Trang chính** (`src/pages/DonHang/index.tsx`)

- Hiển thị thống kê:
  - Tổng số đơn hàng
  - Số đơn chờ xác nhận
  - Số đơn hoàn thành
  - Tổng doanh thu
- Nút "Thêm đơn hàng"
- Modal form để thêm/chỉnh sửa

### 4. **Form component** (`src/pages/DonHang/Form.tsx`)

Chứa form để thêm/chỉnh sửa đơn hàng:

- Mã đơn hàng (auto-generate, disabled để edit)
- Chọn khách hàng từ danh sách
- Chọn sản phẩm và số lượng (có thể chọn nhiều sản phẩm)
- Bảng hiển thị danh sách sản phẩm đã chọn
- Tính tổng tiền tự động
- Chọn trạng thái đơn hàng
- Kiểm tra dữ liệu:
  - Không để trống
  - Kiểm tra mã đơn hàng không trùng
  - Yêu cầu chọn ít nhất 1 sản phẩm

### 5. **Bảng dữ liệu** (`src/pages/DonHang/DonHangTable.tsx`)

Hiển thị danh sách đơn hàng với các chức năng:

- **Tìm kiếm**: Theo mã đơn hàng hoặc tên khách hàng
- **Lọc**: Theo trạng thái (Chờ xác nhận, Đang giao, Hoàn thành, Hủy)
- **Sắp xếp**: Theo ngày đặt hàng hoặc tổng tiền (tăng/giảm)
- **Các cột**: STT, Mã đơn, Khách hàng, Ngày đặt, Tổng tiền, Trạng thái
- **Thao tác**:
  - Chỉnh sửa (Edit)
  - Hủy đơn hàng (chỉ khi trạng thái = "Chờ xác nhận")
  - Xóa (Delete)

### 6. **Cấu hình routing** (`config/routes.ts`)

Thêm route mới:

```
/don-hang - Quản lý đơn hàng
```

## 🎯 Chức năng đã triển khai

✅ Hiển thị danh sách đơn hàng với thông tin:

- Mã đơn hàng
- Khách hàng
- Ngày đặt hàng
- Tổng tiền
- Trạng thái

✅ Tìm kiếm theo mã đơn hàng hoặc tên khách hàng

✅ Lọc theo trạng thái đơn hàng

✅ Sắp xếp theo ngày đặt hàng hoặc tổng tiền

✅ Thêm & chỉnh sửa đơn hàng:

- Chọn khách hàng từ danh sách
- Chọn sản phẩm và số lượng (nhiều sản phẩm)
- Tính tổng tiền tự động

✅ Kiểm tra dữ liệu:

- Không để trống
- Không trùng mã đơn hàng

✅ Hủy đơn hàng với điều kiện:

- Chỉ cho phép hủy ở trạng thái "Chờ xác nhận"
- Hiển thị cảnh báo trước khi hủy

## 🚀 Cách sử dụng

1. **Truy cập trang quản lý đơn hàng**:

   - URL: `http://localhost:8000/don-hang`
   - Hoặc từ menu "Quản lý đơn hàng"

2. **Xem danh sách đơn hàng**:

   - Trang sẽ hiển thị tất cả đơn hàng với thống kê

3. **Thêm đơn hàng**:

   - Nhấn nút "Thêm đơn hàng"
   - Chọn khách hàng
   - Thêm sản phẩm bằng cách chọn từ dropdown và nhập số lượng, nhấn "Thêm"
   - Chọn trạng thái
   - Nhấn "Thêm mới"

4. **Chỉnh sửa đơn hàng**:

   - Nhấn icon Edit ở cột "Thao tác"
   - Sửa thông tin (ngoài mã đơn hàng)
   - Nhấn "Cập nhật"

5. **Hủy đơn hàng**:

   - Nhấn icon Close (chỉ hoạt động nếu trạng thái = "Chờ xác nhận")
   - Xác nhận trong dialog

6. **Xóa đơn hàng**:
   - Nhấn icon Delete
   - Xác nhận trong dialog

## 💾 Lưu trữ dữ liệu

- Dữ liệu được lưu trong `localStorage` với key `'donhang'`
- Khi trang load, dữ liệu sẽ được tải từ localStorage
- Mọi thay đổi đều được tự động lưu vào localStorage

## 📝 Ghi chú

- Mock data bao gồm 5 khách hàng và 5 sản phẩm
- Mã đơn hàng được sinh tự động theo format DH001, DH002, ...
- Tổng tiền được tính tự động từ giá × số lượng của từng sản phẩm
- Giao diện responsive (thích ứng với mobile/tablet/desktop)

## 🔧 Công nghệ sử dụng

- React + TypeScript
- Ant Design
- Umi (React framework)
- localStorage API

---

**Ngày hoàn thành**: 15/04/2026 **Hạn nộp**: 16h15 ngày 15/04/2026
