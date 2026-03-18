# Hệ Thống Quản Lý Lịch Hẹn (Appointment Booking System)

## Tổng Quan
Hệ thống quản lý lịch hẹn toàn diện giúp khách hàng đặt và quản lý lịch hẹn cho các dịch vụ (cắt tóc, spa, khám bệnh, sửa chữa, v.v.)

## Các Tính Năng Chính

### 1. Quản Lý Nhân Viên & Dịch Vụ
- **Quản lý nhân viên**: Thêm/Sửa/Xóa nhân viên
- **Giới hạn khách**: Mỗi nhân viên có giới hạn số khách tối đa mỗi ngày
- **Lịch làm việc**: Mỗi nhân viên có lịch làm việc riêng (được lưu trữ)
- **Quản lý dịch vụ**: Quản lý danh sách dịch vụ với giá và thời gian thực hiện

### 2. Đặt Lịch Hẹn
- Khách hàng có thể đặt lịch hẹn bằng cách:
  - Nhập thông tin khách hàng (tên, điện thoại, email)
  - Chọn dịch vụ
  - Chọn nhân viên
  - Chọn ngày và giờ
- **Kiểm tra trùng lịch**: Hệ thống tự động kiểm tra và ngăn chặn đặt lịch trùng
- **Kiểm tra giới hạn**: Kiểm tra giành không vượt quá giới hạn khách của nhân viên

### 3. Quản Lý Lịch Hẹn
- Xem danh sách tất cả lịch hẹn
- Cập nhật trạng thái lịch hẹn:
  - **Chờ duyệt** (pending): Lịch hẹn mới được tạo
  - **Xác nhận** (confirmed): Lịch hẹn đã được xác nhận
  - **Hoàn thành** (completed): Dịch vụ đã hoàn thành
  - **Hủy** (cancelled): Lịch hẹn đã bị hủy
- Xóa lịch hẹn

### 4. Đánh Giá Dịch Vụ & Nhân Viên
- Sau khi hoàn thành lịch hẹn, khách hàng có thể:
  - Đánh giá dịch vụ (1-5 sao)
  - Để lại nhận xét
- **Phản hồi từ nhân viên**: Nhân viên có thể phản hồi lại những đánh giá
- **Xem đánh giá trung bình**: Hiển thị điểm đánh giá trung bình của mỗi nhân viên

### 5. Thống Kê & Báo Cáo
- **Tổng quan**: Hiển thị các thống kê chính (tổng lịch hẹn, hoàn thành, chờ duyệt, v.v.)
- **Biểu đồ lịch hẹn**: Lịch hẹn theo ngày/tháng
- **Doanh thu**: 
  - Doanh thu theo dịch vụ
  - Doanh thu theo nhân viên
- **Đánh giá nhân viên**: Biểu đồ đánh giá trung bình của từng nhân viên
- **Trạng thái lịch hẹn**: Biểu đồ tròn thể hiện phân bố trạng thái

## Cấu Trúc Thư Mục

```
src/
├── models/
│   └── QLichHen/
│       └── index.ts          # State management (useModel)
├── services/
│   └── QLichHen/
│       └── api.ts            # API functions for data management
└── pages/
    └── QLichHen/
        ├── index.tsx                   # Main page with tabs
        ├── EmployeeManagement.tsx      # Employee CRUD
        ├── ServiceManagement.tsx       # Service CRUD
        ├── AppointmentBooking.tsx      # Booking form
        ├── AppointmentManagement.tsx   # Appointment status management
        ├── RatingManagement.tsx        # Rating and feedback
        └── Statistics.tsx              # Reports and analytics
```

## Cách Sử Dụng

### Truy Cập Hệ Thống
- Navigatio menu: **Quản lý Lịch hẹn** hoặc truy cập `/lich-hen`

### Các Tab Chính

1. **Quản lý Nhân viên**
   - Xem danh sách nhân viên
   - Thêm nhân viên mới: Click "Thêm nhân viên"
   - Sửa thông tin: Click "Sửa"
   - Xóa: Click "Xóa"

2. **Quản lý Dịch vụ**
   - Xem danh sách dịch vụ với giá và thời gian
   - Thêm/Sửa/Xóa dịch vụ

3. **Đặt lịch hẹn**
   - Nhập thông tin khách hàng
   - Chọn dịch vụ, nhân viên, ngày giờ
   - Click "Đặt lịch hẹn"

4. **Quản lý Lịch hẹn**
   - Xem tất cả lịch hẹn
   - Cập nhật trạng thái (Click "Cập nhật")
   - Xóa lịch hẹn

5. **Đánh giá & Phản hồi**
   - Xem lịch hẹn hoàn thành chưa đánh giá
   - Click "Đánh giá" để thêm đánh giá
   - Nhân viên có thể "Phản hồi" lại đánh giá

6. **Thống kê & Báo cáo**
   - Tab "Tổng quan": Hiển thị KPI chính
   - Tab "Lịch hẹn": Biểu đồ lịch hẹn theo ngày
   - Tab "Doanh thu": Phân tích doanh thu theo dịch vụ và nhân viên

## Lưu Trữ Dữ Liệu
- Dữ liệu được lưu trữ trong localStorage của trình duyệt
- Các key:
  - `qlh_employees`: Danh sách nhân viên
  - `qlh_services`: Danh sách dịch vụ
  - `qlh_appointments`: Danh sách lịch hẹn
  - `qlh_ratings`: Danh sách đánh giá

## Kiểm Tra Xung Đột Lịch Hẹn
- Hệ thống tự động kiểm tra:
  1. Lịch hẹn có trùng với nhân viên không
  2. Có vượt quá giới hạn khách/ngày không
  3. Nhân viên đó có hoạt động không

## Các Tương Tác Chính

### Khách Hàng
1. Đặt lịch hẹn
2. Xem lịch hẹn của mình (qua tab "Quản lý Lịch hẹn")
3. Đánh giá sau khi hoàn thành dịch vụ

### Nhân Viên/Quản Lý
1. Quản lý nhân viên và dịch vụ
2. Kiểm tra và cập nhật trạng thái lịch hẹn
3. Phản hồi lại các đánh giá
4. Xem báo cáo thống kê

## Công Nghệ Sử Dụng
- **Frontend**: React, TypeScript, Ant Design
- **State Management**: UMI useModel
- **Charts**: Recharts
- **Storage**: Browser localStorage
- **Styling**: Less/CSS

## Ghi Chú
- Hiện tại dữ liệu được lưu trữ trong localStorage, có thể mở rộng để sử dụng backend API
- Có thể thêm tính năng email notification, SMS reminder trong tương lai
- Có thể mở rộng lịch làm việc với support cho ca làm việc (sáng, chiều, tối)

---
**Người phát triển**: Student ID: B24DCCC005
**Ngày tạo**: 18/03/2026
