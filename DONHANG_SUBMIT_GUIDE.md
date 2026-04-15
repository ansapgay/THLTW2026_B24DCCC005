# 📦 Hệ Thống Quản Lý Đơn Hàng - Hướng Dẫn Chi Tiết

## ✅ Hoàn Thành Tất Cả Yêu Cầu

Hệ thống quản lý đơn hàng đã được xây dựng hoàn chỉnh với tất cả các chức năng được yêu cầu:

### 1️⃣ Hiển thị danh sách đơn hàng

✅ Mã đơn hàng  
✅ Khách hàng (tên + SĐT)  
✅ Ngày đặt hàng  
✅ Tổng tiền (được tính tự động)  
✅ Trạng thái (Chờ xác nhận, Đang giao, Hoàn thành, Hủy)

### 2️⃣ Tìm kiếm

✅ Theo mã đơn hàng  
✅ Theo tên khách hàng

### 3️⃣ Lọc

✅ Theo trạng thái đơn hàng (5 trạng thái)

### 4️⃣ Sắp xếp

✅ Theo ngày đặt hàng (tăng/giảm)  
✅ Theo tổng tiền (tăng/giảm)

### 5️⃣ Thêm & Chỉnh sửa

✅ Chọn khách hàng từ danh sách có sẵn (5 khách hàng)  
✅ Chọn sản phẩm từ danh sách (5 sản phẩm)  
✅ Được chọn nhiều sản phẩm  
✅ Tính tổng tiền tự động  
✅ Kiểm tra dữ liệu:

- Không để trống
- Không trùng mã đơn hàng

### 6️⃣ Hủy đơn hàng

✅ Chỉ cho phép hủy khi trạng thái = "Chờ xác nhận"  
✅ Hiển thị cảnh báo trước khi hủy

### 7️⃣ Thêm bonus

✅ Xóa đơn hàng  
✅ Thống kê doanh thu (Tổng đơn, Đơn chờ, Đơn hoàn thành, Doanh thu)  
✅ Giao diện responsive

---

## 📂 Cấu Trúc Thư Mục Tạo Ra

```
baseltw/
├── config/
│   └── routes.ts                    [CẬP NHẬT] Added /don-hang route
├── src/
│   ├── models/
│   │   └── donhang.ts              [MỚI] Model quản lý đơn hàng
│   ├── pages/
│   │   └── DonHang/
│   │       ├── index.tsx            [MỚI] Trang chính
│   │       ├── Form.tsx             [MỚI] Form thêm/sửa
│   │       └── DonHangTable.tsx     [MỚI] Bảng danh sách
│   └── typings.d.ts                [CẬP NHẬT] Added DonHang namespace
├── DONHANG_IMPLEMENTATION.md        [MỚI] Hướng dẫn triển khai
└── DONHANG_SUBMIT_GUIDE.md          [MỚI] Hướng dẫn nộp bài
```

---

## 🚀 Cách Chạy Ứng Dụng

### Câu 1: Cách 1 - Chạy với npm (khuyến nghị)

```bash
cd c:\laptrinhWEB\baseltw
npm install  # Nếu chưa install dependencies
npm run start:dev
```

**Nếu gặp lỗi:** Sử dụng legacy OpenSSL provider (Node.js v17+)

```bash
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run start:dev
```

### Cách 2: Cách 2 - Sử dụng yarn

```bash
cd c:\laptrinhWEB\baseltw
yarn install
yarn dev
```

### Cách 3: Cách 3 - Build và chạy production

```bash
npm run build
npm run serve
```

### ✨ Truy cập ứng dụng

- URL: http://localhost:8000
- Menu: Quản lý đơn hàng (hoặc `/don-hang`)

---

## 💾 Lưu Trữ Dữ Liệu

**Phương pháp**: localStorage **Key**: `'donhang'`

### Mock Data Khách Hàng

1. Nguyễn Văn A (HN)
2. Trần Thị B (TP.HCM)
3. Phạm Viết C (Đà Nẵng)
4. Hoàng Minh D (Hải Phòng)
5. Lê Quốc E (Cần Thơ)

### Mock Data Sản Phẩm

1. Laptop Dell XPS 13 - 25.000.000 đ
2. iPhone 15 Pro Max - 30.000.000 đ
3. Samsung Galaxy S24 - 22.000.000 đ
4. iPad Air M2 - 18.000.000 đ
5. MacBook Air M3 - 28.000.000 đ

### Mock Data Đơn Hàng Ban Đầu

- **DH001**: Nguyễn Văn A, 1x Laptop, 25M, Chờ xác nhận
- **DH002**: Trần Thị B, 2x iPhone, 60M, Đang giao

---

## 🧪 Hướng Dẫn Kiểm Thử

### 1. Kiểm Thử Xem Danh Sách

- [ ] Truy cập trang Quản lý đơn hàng
- [ ] Thấy 2 đơn hàng ban đầu (DH001, DH002)
- [ ] Hiển thị đầy đủ: Mã, Khách hàng, Ngày, Tiền, Trạng thái
- [ ] Thống kê hiển thị đúng

### 2. Kiểm Thử Tìm Kiếm

- [ ] Nhập "DH001" → Thấy chỉ DH001
- [ ] Nhập "A" → Thấy DH001 (Nguyễn Văn A)
- [ ] Xóa text → Thấy lại tất cả đơn

### 3. Kiểm Thử Lọc

- [ ] Chọn "Chờ xác nhận" → Hiển thị DH001
- [ ] Chọn "Đang giao" → Hiển thị DH002
- [ ] Chọn "Tất cả" → Hiển thị cả hai

### 4. Kiểm Thử Sắp Xếp

- [ ] Sắp xếp theo "Ngày đặt hàng":
  - Giảm dần (mặc định): DH002 trước
  - Tăng dần: DH001 trước
- [ ] Sắp xếp theo "Tổng tiền":
  - Giảm dần: DH002 (60M) trước
  - Tăng dần: DH001 (25M) trước

### 5. Kiểm Thử Thêm Đơn Hàng

- [ ] Nhấn "Thêm đơn hàng"
- [ ] Chọn khách hàng: "Phạm Viết C"
- [ ] Chọn sản phẩm: "iPad Air M2", Số lượng: 2
- [ ] Nhấn "Thêm" → Thêm thành công
- [ ] Chọn sản phẩm tiếp theo: "MacBook Air M3", SL: 1
- [ ] Nhấn "Thêm" → Thêm tiếp theo
- [ ] Bảng sản phẩm hiển thị 2 sản phẩm
- [ ] Tổng tiền = 36M + 28M = 64M
- [ ] Chọn trạng thái: "Chờ xác nhận"
- [ ] Nhấn "Thêm mới" → Thêm đơn hàng thành công
- [ ] Danh sách có 3 đơn hàng (DH003)

### 6. Kiểm Thử Kiểm Tra Dữ Liệu

- [ ] Thêm đơn hàng mà không chọn sản phẩm → Báo lỗi
- [ ] Thêm đơn hàng mà không chọn khách hàng → Báo lỗi
- [ ] Thêm 2 đơn hàng với mã giống nhau → Báo lỗi mã trùng

### 7. Kiểm Thử Chỉnh Sửa

- [ ] Nhấn Edit DH001
- [ ] Modal hiển thị "Chỉnh sửa đơn hàng"
- [ ] Mã đơn hàng disabled (không chỉnh được)
- [ ] Chỉnh sửa khách hàng hoặc thêm sản phẩm
- [ ] Nhấn "Cập nhật" → Thành công

### 8. Kiểm Thử Hủy Đơn Hàng

- [ ] Hủy DH001 (Chờ xác nhận) → Có nút Cancel, nhấn → Xác nhận → Thành công
- [ ] Hủy DH002 (Đang giao) → Nút Cancel disabled, không thể hủy
- [ ] Kiểm tra trạng thái DH001 thay đổi thành "Hủy"

### 9. Kiểm Thử Xóa

- [ ] Nhấn Delete DH003 → Xác nhận → Xóa thành công
- [ ] Chỉ còn 2 đơn hàng

### 10. Kiểm Thử Lưu Trữ

- [ ] Refresh trang (F5)
- [ ] Dữ liệu vẫn còn (lưu từ localStorage)

---

## 📝 Code Structure

### Model (donhang.ts)

- State variables: data, currentOrder, isEdit, visible, filters
- Functions: saveOrder, cancelOrder, deleteOrder, getFilteredData
- Mock data: MOCK_CUSTOMERS, MOCK_PRODUCTS, MOCK_ORDERS

### Form Component (Form.tsx)

- Add products dynamically
- Remove products
- Auto-calculate total
- Validate data before submission

### Table Component (DonHangTable.tsx)

- Columns: STT, Mã, Khách, Ngày, Tiền, Trạng thái, Thao tác
- Search box (mã + tên khách)
- Filter select (trạng thái)
- Sort select (trường sắp xếp)
- Sort order select (tăng/giảm)
- Action buttons: Edit, Cancel, Delete

### Main Page (index.tsx)

- Header + "Thêm đơn hàng" button
- Statistics card (4 stats)
- DonHangTable component
- Modal with form

---

## 🔧 Công Nghệ Sử Dụng

| Công Nghệ    | Phiên Bản | Mục Đích      |
| ------------ | --------- | ------------- |
| React        | 18+       | UI Library    |
| TypeScript   | 4+        | Type Safety   |
| Ant Design   | 4+        | UI Components |
| Umi          | 3+        | Framework     |
| localStorage | Native    | Data Storage  |

---

## ⚠️ Troubleshooting

### Lỗi: "ERR_OSSL_EVP_UNSUPPORTED"

```bash
# Giải pháp:
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run start:dev
```

### Lỗi: "Can't resolve 'react-is'"

```bash
# Giải pháp:
npm install react-is
npm run start:dev
```

### Dữ liệu bị mất sau refresh

- Kiểm tra browser console (F12)
- Xóa localStorage:
  ```javascript
  localStorage.clear();
  ```

### Routes không hoạt động

- Kiểm tra `config/routes.ts` có thêm route `/don-hang` không
- Restart dev server

---

## 📋 Checklist Nộp Bài

- [ ] Code xong
- [ ] Test tất cả chức năng
- [ ] Commit lên KTGK branch
- [ ] Push lên GitHub
- [ ] Copy link repo
- [ ] Nộp bài qua form
- [ ] Mời thầy qua git (thanhpq@ptit.edu.vn)

---

## Git Commands

```bash
# Kiểm tra branches
git branch -a

# Checkout KTGK branch nếu có
git checkout KTGK

# Hoặc tạo mới
git checkout -b KTGK

# Commit
git add .
git commit -m "Implement: Hệ thống quản lý đơn hàng"

# Push
git push origin KTGK
```

---

## 📞 Liên Hệ

**Thầy**: Thành Phan Thanh  
**Email**: thanhpq@ptit.edu.vn

---

**Ngày hoàn thành**: 15/04/2026  
**Hạn nộp**: 16h15 ngày 15/04/2026  
**Status**: ✅ Hoàn thành
