# 🌍 Ứng dụng Lập Kế hoạch Du lịch (Travel Planning App)

## Mô tả
Ứng dụng lập kế hoạch du lịch cho phép người dùng:
- Khám phá các điểm đến du lịch nổi bật
- Tạo và quản lý lịch trình du lịch
- Quản lý ngân sách chi tiêu
- Xem các thống kê và báo cáo

## 🎯 Tính năng chính

### 1. 🏠 Trang chủ - Khám phá điểm đến
- Hiển thị các điểm đến nổi bật dưới dạng card (Ant Design Card)
- Hiển thị hình ảnh, địa điểm, đánh giá
- **Filter/Sort**: Lọc theo:
  - Loại hình (biển, núi, thành phố)
  - Giá cả
  - Đánh giá
- Chi tiết địa điểm bao gồm thông tin về chi phí (ăn uống, lưu trú, di chuyển)
- **Responsive**: Hỗ trợ tablet, mobile

**Đường dẫn**: `/travel`

### 2. 📝 Tạo lịch trình du lịch
- Chọn ngày bắt đầu và kết thúc
- Thêm/xóa/sắp xếp các điểm đến theo ngày
- Các điểm đến được chọn từ danh sách có sẵn
- Tính toán tự động:
  - Tổng ngân sách
  - Thời gian di chuyển giữa các điểm
- Cho phép lưu và xem lại lịch trình
- **Responsive**: Đầy đủ hỗ trợ mobile

**Đường dẫn**: `/travel/create-itinerary`

### 3. 💰 Quản lý ngân sách
- Hiển thị thông tin tổng nhìn:
  - Tổng ngân sách dự kiến
  - Chi phí đã sử dụng
  - Còn lại
  - Tỷ lệ sử dụng (%)
- Biểu đồ phân bổ ngân sách:
  - Biểu đồ tròn (Pie Chart)
  - Biểu đồ cột (Bar Chart)
- Các hạng mục chi phí:
  - Ăn uống
  - Lưu trú
  - Di chuyển
  - Hoạt động
  - Khác
- **Cảnh báo vượt ngân sách**:
  - Alert khi vượt quá ngân sách dự kiến
  - Cảnh báo khi sử dụng > 80% ngân sách
- Thêm/xóa chi phí dễ dàng
- **Responsive**: Hoạt động tốt trên mọi kích thước màn hình

**Đường dẫn**: `/travel/budget`

### 4. ⚙️ Trang quản trị (Admin)
- **Quản lý điểm đến**:
  - Thêm/sửa/xóa điểm đến
  - Upload hình ảnh
  - Nhập thông tin chi tiết:
    - Mô tả
    - Thời gian tham quan
    - Mức chi cho ăn uống, lưu trú, di chuyển
    - Đánh giá
    - Loại hình
- **Thống kê**:
  - Tổng số lịch trình được tạo
  - Tổng doanh thu
  - Địa điểm phổ biến nhất
  - Đánh giá trung bình
  - Biểu đồ số lượt lịch trình theo tháng
  - Biểu đồ doanh thu theo tháng
  - Danh sách địa điểm phổ biến
  - Phân bổ chi phí theo hạng mục

**Đường dẫn**: `/travel/admin`

## 📁 Cấu trúc thư mục

```
src/
├── models/
│   └── travel.ts                 # Model cho Travel
├── services/
│   └── Travel.ts                 # Service API
├── typings/
│   └── travel.d.ts              # Type definitions
├── pages/
│   ├── TravelDiscovery/         # Trang khám phá
│   │   ├── index.tsx
│   │   └── index.less
│   ├── CreateItinerary/         # Trang tạo lịch trình
│   │   ├── index.tsx
│   │   └── index.less
│   ├── BudgetManagement/        # Trang quản lý ngân sách
│   │   ├── index.tsx
│   │   └── index.less
│   └── TravelAdmin/             # Trang quản trị
│       ├── index.tsx
│       └── index.less
└── components/
    └── Travel/
        ├── DestinationCard.tsx      # Component card điểm đến
        ├── DestinationCard.less
        ├── DestinationFilter.tsx    # Component filter
        └── DestinationFilter.less
```

## 🔄 Data Models

### Destination
```typescript
interface Destination {
  id?: string;
  name: string;
  location: string;
  description?: string;
  type: 'beach' | 'mountain' | 'city' | 'rural' | 'other';
  image?: string;
  imageUrl?: string;
  viewingTime?: number;
  rating: number;
  totalReviews?: number;
  pricePerDay?: number;
  foodCost?: number;
  accommodationCost?: number;
  transportCost?: number;
}
```

### Itinerary
```typescript
interface Itinerary {
  id?: string;
  title: string;
  userId?: string;
  startDate: string;
  endDate: string;
  days: Day[];
  totalBudget: number;
  destinations: Destination[];
  description?: string;
}
```

### Budget
```typescript
interface Budget {
  id?: string;
  itineraryId: string;
  items: BudgetItem[];
  totalBudget: number;
  spentBudget: number;
}
```

## 🌐 Responsive Design

Ứng dụng hỗ trợ đầy đủ:
- **Desktop** (1200px+): Layout đầy đủ với tất cả thông tin
- **Tablet** (768px - 1199px): Layout tối ưu cho tablet
- **Mobile** (< 768px): Layout mobile-first với các thành phần được sắp xếp lại

Breakpoints:
- `xs`: < 480px
- `sm`: 480px - 768px
- `md`: 768px - 1200px
- `lg`: 1200px+

## 🚀 Cách sử dụng

### Cài đặt
```bash
npm install
# hoặc
yarn install
```

### Chạy ứng dụng
```bash
npm start
# hoặc
yarn start
```

### Build
```bash
npm run build
# hoặc
yarn build
```

## 📦 Dependencies
- **antd**: 4.21.0 - UI Component Library
- **recharts**: ^3.8.1 - Charts Library
- **dayjs**: ^1.11.20 - DateTime Library
- **umi**: Framework (built-in)

## 📝 Notes

### Mock Data
Hiện tại, tất cả dữ liệu được mock tại client-side. Để kết nối với backend:

1. Cập nhật endpoints trong `src/services/Travel.ts`
2. Triển khai các API endpoints trên backend
3. Xóa mock data từ components

### Local Storage
Dữ liệu lịch trình và ngân sách có thể được lưu vào localStorage để giữ dữ liệu trong phiên.

### Mở rộng trong tương lai
- Thêm authentication/authorization
- Tích hợp backend API thực
- Thêm export PDF cho lịch trình
- Sharing lịch trình với bạn bè
- Đánh giá và comment từ người dùng
- Notification và reminder

## 👨‍💻 Tác giả
Xây dựng cho bài tập thực hành 06

## 📅 Hạn nộp
17h ngày 08/04/2026

---
**Status**: ✅ Hoàn thành và sẵn sàng test
