# Hướng dẫn Xây dựng Backend API - Quản lý Sổ Văn bằng

> Tài liệu này hướng dẫn cách xây dựng các API endpoints phía backend để hỗ trợ frontend application.

## Prerequisite

- Node.js, Java, Python hoặc bất kỳ framework nào
- Database: MongoDB, PostgreSQL hoặc bất kỳ DB nào
- RESTful API hoặc GraphQL

## Database Schema

### 1. `SoVanBang` - Sổ Văn Bằng

```json
{
  "_id": "ObjectId",
  "nam": 2024,
  "soVaoSoHienTai": 15,
  "soHieuVanBang": "2024-001-PTIT",
  "ngayTao": "2024-01-15T10:30:00Z",
  "ghiChu": "Sổ năm 2024",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Indexes:**
- `{ nam: 1 }` - Tìm sổ theo năm
- `{ nam: 1, createdAt: -1 }` - Sort sổ theo năm và ngày tạo

**Logic:**
- Khi tạo sổ mới cho năm N, auto set `soVaoSoHienTai = 1`
- Mỗi khi thêm bằng vào sổ, tăng `soVaoSoHienTai` lên 1
- Không cho sửa `soVaoSoHienTai` (auto increment)

---

### 2. `QuyetDinhTotNghiep` - Quyết Định Tốt Nghiệp

```json
{
  "_id": "ObjectId",
  "soQD": "001-QĐ/2024",
  "ngayBanHanh": "2024-06-15",
  "trichYeu": "Quyết định công nhận sinh viên hoàn thành CĐ. VĐV",
  "soVanBangId": "ObjectId of SoVanBang",
  "soVanBangNam": 2024,
  "trangThai": "ACTIVE",
  "ghiChu": "Đợt 1/2024",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Indexes:**
- `{ soQD: 1 }` - Unique index
- `{ soVanBangId: 1 }` - Foreign key to SoVanBang
- `{ soVanBangNam: 1, createdAt: -1 }`

**Constraints:**
- `soQD` phải unique trong hệ thống
- `soVanBangId` PHẢI tồn tại (foreign key)
- `trangThai` chỉ nhận 1 trong 3 giá trị: DRAFT, ACTIVE, CLOSED

---

### 3. `CauHinhBieuMau` - Cấu hình Biểu mẫu

```json
{
  "_id": "ObjectId",
  "tenTruong": "Dân tộc",
  "kieuDuLieu": "String",
  "thuTuHienThi": 1,
  "batBuoc": true,
  "giaTri": "Kinh",
  "moTa": "Dân tộc của sinh viên",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Indexes:**
- `{ thuTuHienThi: 1 }` - Để sort hiển thị
- `{ tenTruong: 1 }` - Unique, không trùng tên trường

**Constraints:**
- `tenTruong` phải unique
- `kieuDuLieu` chỉ nhận: "String", "Number", "Date"
- `thuTuHienThi` > 0

---

### 4. `ThongTinVanBang` - Thông tin Văn bằng

```json
{
  "_id": "ObjectId",
  "soVaoSo": 1,
  "soHieuVanBang": "2024-001/1",
  "soVanBangId": "ObjectId of SoVanBang",
  "quyetDinhId": "ObjectId of QuyetDinhTotNghiep",
  "maSinhVien": "24DCCC005",
  "hoTen": "Phạm Quốc Thành",
  "ngaySinh": "2003-05-10",
  "thongTinThem": {
    "Dân tộc": "Kinh",
    "Nơi sinh": "Hà Nội",
    "Điểm TB": 3.45,
    "Ngày nhập học": "2020-09-01"
  },
  "luotTraCuu": 5,
  "trangThai": "PUBLISHED",
  "ghiChu": "",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Indexes:**
- `{ soVaoSo: 1, soVanBangId: 1 }` - Unique (mỗi sổ có 1 số vào sổ)
- `{ maSinhVien: 1 }` - Tìm kiếm theo MSV
- `{ hoTen: 1 }` - Text index để tìm kiếm full-text
- `{ quyetDinhId: 1 }` - Foreign key
- `{ soVanBangId: 1 }`

**Constraints:**
- `soVaoSo` không cho sửa (auto từ SoVanBang)
- `soVanBangId` và `quyetDinhId` PHẢI tồn tại
- `thongTinThem` là object với keys là tên trường từ CauHinhBieuMau

---

### 5. `SearchLog` - Ghi nhận tra cứu (Optional)

```json
{
  "_id": "ObjectId",
  "vanBangId": "ObjectId of ThongTinVanBang",
  "quyetDinhId": "ObjectId of QuyetDinhTotNghiep",
  "searchParams": {
    "soHieuVanBang": "2024-001/1",
    "maSinhVien": "24DCCC005"
  },
  "ngayTraCuu": "2024-06-20T14:30:00Z",
  "ipAddress": "192.168.1.1"
}
```

---

## API Endpoints

### 1️⃣ Sổ Văn Bằng

#### CREATE - POST `/api/so-van-bang`
```http
POST /api/so-van-bang
Content-Type: application/json
Authorization: Bearer {token}

{
  "nam": 2024,
  "soHieuVanBang": "2024-001-PTIT",
  "ngayTao": "2024-01-15",
  "ghiChu": "Sổ năm 2024"
}

Response: 201 Created
{
  "_id": "...",
  "nam": 2024,
  "soVaoSoHienTai": 1,
  ...
}
```

#### READ - GET `/api/so-van-bang?page=1&limit=10`
```http
GET /api/so-van-bang?page=1&limit=10&sort=-nam
Authorization: Bearer {token}

Response: 200 OK
{
  "data": {
    "result": [...],
    "total": 5,
    "page": 1,
    "limit": 10
  }
}
```

#### UPDATE - PUT `/api/so-van-bang/{id}`
```http
PUT /api/so-van-bang/65a1b2c3d4e5f6g7h8i9j0
Authorization: Bearer {token}

{
  "ghiChu": "Sổ năm 2024 - Updated"
}

Response: 200 OK
```

#### DELETE - DELETE `/api/so-van-bang/{id}`
```http
DELETE /api/so-van-bang/65a1b2c3d4e5f6g7h8i9j0
Authorization: Bearer {token}

Response: 200 OK or 204 No Content
```

---

### 2️⃣ Quyết Định Tốt Nghiệp

#### CREATE - POST `/api/quyet-dinh-tot-nghiep`
```http
POST /api/quyet-dinh-tot-nghiep
Authorization: Bearer {token}

{
  "soQD": "001-QĐ/2024",
  "ngayBanHanh": "2024-06-15",
  "trichYeu": "Công nhận sinh viên...",
  "soVanBangId": "65a1b2c3d4e5f6g7h8i9j0",
  "trangThai": "DRAFT",
  "ghiChu": "Đợt 1/2024"
}

Response: 201 Created
```

#### READ - GET `/api/quyet-dinh-tot-nghiep?page=1&limit=10&soVanBangId=...`
```http
GET /api/quyet-dinh-tot-nghiep?page=1&limit=10&condition[soVanBangId]=...
Authorization: Bearer {token}

Response: 200 OK
{
  "data": {
    "result": [...],
    "total": 3
  }
}
```

#### UPDATE - PUT `/api/quyet-dinh-tot-nghiep/{id}`
#### DELETE - DELETE `/api/quyet-dinh-tot-nghiep/{id}`

---

### 3️⃣ Cấu hình Biểu mẫu

#### CREATE - POST `/api/cau-hinh-bieu-mau`
```http
POST /api/cau-hinh-bieu-mau
Authorization: Bearer {token}

{
  "tenTruong": "Dân tộc",
  "kieuDuLieu": "String",
  "thuTuHienThi": 1,
  "batBuoc": true,
  "giaTri": "Kinh",
  "moTa": "Dân tộc của sinh viên"
}

Response: 201 Created
```

#### READ - GET `/api/cau-hinh-bieu-mau?sort=thuTuHienThi`
```http
GET /api/cau-hinh-bieu-mau?page=1&limit=50&sort=thuTuHienThi
Authorization: Bearer {token}

Response: 200 OK - Trả về list tất cả cấu hình
```

#### UPDATE - PUT `/api/cau-hinh-bieu-mau/{id}`
#### DELETE - DELETE `/api/cau-hinh-bieu-mau/{id}`

---

### 4️⃣ Thông tin Văn bằng

#### CREATE - POST `/api/thong-tin-van-bang`
```http
POST /api/thong-tin-van-bang
Authorization: Bearer {token}

{
  "soVanBangId": "65a1b2c3d4e5f6g7h8i9j0",
  "quyetDinhId": "65a1b2c3d4e5f6g7h8i9j1",
  "maSinhVien": "24DCCC005",
  "hoTen": "Phạm Quốc Thành",
  "ngaySinh": "2003-05-10",
  "thongTinThem": {
    "Dân tộc": "Kinh",
    "Nơi sinh": "Hà Nội"
  },
  "trangThai": "PUBLISHED"
}

Response: 201 Created
{
  "soVaoSo": 1,  // AUTO tính từ SoVanBang.soVaoSoHienTai
  "soHieuVanBang": "2024-001/1",  // Combine từ SoVB + soVaoSo
  ...
}
```

**Logic khi tạo:**
1. Lấy `SoVanBang` có `_id = soVanBangId`
2. Set `soVaoSo = SoVanBang.soVaoSoHienTai`
3. Build `soHieuVanBang = SoVanBang.soHieuVanBang + "/" + soVaoSo`
4. Tăng `SoVanBang.soVaoSoHienTai` lên 1
5. Set `luotTraCuu = 0`

#### READ - GET `/api/thong-tin-van-bang?page=1&limit=10&condition[quyetDinhId]=...`
```http
GET /api/thong-tin-van-bang?page=1&limit=10&condition[quyetDinhId]=...
Authorization: Bearer {token}

Response: 200 OK
```

#### SEARCH (PUBLIC) - POST `/api/thong-tin-van-bang/search`
```http
POST /api/thong-tin-van-bang/search
Content-Type: application/json

{
  "soHieuVanBang": "2024-001/1",
  "maSinhVien": "24DCCC005",
  "hoTen": "Phạm",
  "ngaySinh": "2003-05-10"
}

Response: 200 OK
{
  "data": [
    {
      "maSinhVien": "24DCCC005",
      "hoTen": "Phạm Quốc Thành",
      "soVaoSo": 1,
      "soHieuVanBang": "2024-001/1",
      "ngaySinh": "2003-05-10"
      // Không trả về toàn bộ thông tin chi tiết
    }
  ]
}

⚠️ Validations:
- Yêu cầu ≥ 2 parameter không rỗng
- Nếu < 2 param → return 400 Bad Request
  {
    "error": "Vui lòng nhập ít nhất 2 thông tin tìm kiếm"
  }
```

#### ADD VIEW COUNT - POST `/api/thong-tin-van-bang/{id}/add-view-count`
```http
POST /api/thong-tin-van-bang/65a1b2c3d4e5f6g7h8i9j0/add-view-count
Content-Type: application/json

{
  // Optional: ghi log thêm info
  "ipAddress": "192.168.1.1"
}

Response: 200 OK
{
  "luotTraCuu": 6  // Tăng từ 5 lên 6
}
```

#### UPDATE - PUT `/api/thong-tin-van-bang/{id}`
```http
PUT /api/thong-tin-van-bang/65a1b2c3d4e5f6g7h8i9j0
Authorization: Bearer {token}

{
  "thongTinThem": {
    "Dân tộc": "Tày"
  },
  "ghiChu": "Updated"
}

⚠️ Không được phép sửa: soVaoSo, soHieuVanBang
```

#### DELETE - DELETE `/api/thong-tin-van-bang/{id}`

---

## Các Quy tắc Kinh doanh (Business Logic)

### 1. Tạo Sổ Văn Bằng
- ✅ Năm phải hợp lệ (2000-2100)
- ❌ Không cho tạo 2 sổ trong cùng 1 năm
- ✅ Auto set `soVaoSoHienTai = 1` khi tạo sổ mới

### 2. Tạo Quyết Định
- ✅ `soVanBangId` PHẢI tồn tại
- ❌ Không cho 2 QĐ có cùng `soQD`
- ✅ Chỉ được sửa khi `trangThai = DRAFT`

### 3. Tạo Thông Tin Văn Bằng
- ✅ `soVanBangId` và `quyetDinhId` PHẢI tồn tại
- ✅ Auto tính `soVaoSo` từ `SoVanBang.soVaoSoHienTai`
- ✅ Auto tăng `SoVanBang.soVaoSoHienTai` lên 1
- ✅ `thongTinThem` phải có đầy đủ các trường bắt buộc từ `CauHinhBieuMau`
- ❌ Kiểu dữ liệu của `thongTinThem` phải match với `kieuDuLieu` trong config
- ✅ Auto set `luotTraCuu = 0`

### 4. Tìm Kiếm (Search)
- ❌ Yêu cầu ≥ 2 tham số, nếu < thì return 400 error
- ✅ Search KHÔNG yêu cầu authenticate (public endpoint)
- ✅ Tự động tính toán `luotTraCuu` khi tìm thấy kết quả
- ✅ Search dùng mongoDB: `$or`, `$regex` cho full-text search

### 5. Xóa
- ❌ Không cho xóa `SoVanBang` nếu đã có `ThongTinVanBang` trong đó
- ❌ Không cho xóa `QuyetDinhTotNghiep` nếu đã có `ThongTinVanBang` liên kết
- ✅ Có thể xóa `CauHinhBieuMau` nhưng cần lưu ý rằng dữ liệu cũ trong `thongTinThem` vẫn còn

---

## Error Handling

```json
// 400 Bad Request
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Vui lòng nhập ít nhất 2 thông tin tìm kiếm"
}

// 401 Unauthorized
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Token không hợp lệ hoặc hết hạn"
}

// 403 Forbidden
{
  "statusCode": 403,
  "error": "Forbidden",
  "message": "Bạn không có quyền thực hiện thao tác này"
}

// 404 Not Found
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Không tìm thấy sổ văn bằng"
}

// 409 Conflict
{
  "statusCode": 409,
  "error": "Conflict",
  "message": "Sổ văn bằng năm 2024 đã tồn tại"
}

// 500 Internal Server Error
{
  "statusCode": 500,
  "error": "Internal Server Error",
  "message": "Lỗi server, vui lòng thử lại"
}
```

---

## Authentication & Authorization

### Required Roles
- **`ADMIN` hoặc `QUAN_TRI_VIEN`**: CRUD cho tất cả entities
- **`CHUYEN_VIEN`**: Có thể view, create, update ThongTinVanBang
- **`PUBLIC`**: Chỉ có thể search (endpoint `/api/thong-tin-van-bang/search`)

---

## Response Format

Tất cả API nên trả về format thống nhất:

```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {
    "result": [...],  // hoặc object nếu là GET single
    "total": 10,      // nếu là list
    "page": 1,
    "limit": 10
  }
}
```

---

## Implementation Example (Node.js + Express + MongoDB)

### Installation
```bash
npm install express mongoose cors dotenv
```

### Sample Route
```javascript
// routes/soVanBang.js
const express = require('express');
const router = express.Router();
const SoVanBang = require('../models/SoVanBang');

// CREATE
router.post('/', async (req, res) => {
  try {
    const { nam, soHieuVanBang, ngayTao, ghiChu } = req.body;
    
    // Check unique năm
    const existing = await SoVanBang.findOne({ nam });
    if (existing) {
      return res.status(409).json({
        statusCode: 409,
        error: "Conflict",
        message: "Sổ năm " + nam + " đã tồn tại"
      });
    }
    
    const soVB = new SoVanBang({
      nam,
      soHieuVanBang,
      ngayTao,
      ghiChu,
      soVaoSoHienTai: 1  // Auto set = 1
    });
    
    await soVB.save();
    
    res.status(201).json({
      statusCode: 201,
      message: "Created",
      data: soVB
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: "Internal Server Error",
      message: error.message
    });
  }
});

// READ
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    const result = await SoVanBang
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ nam: -1 });
    
    const total = await SoVanBang.countDocuments();
    
    res.json({
      statusCode: 200,
      message: "Success",
      data: {
        result,
        total,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      error: "Internal Server Error",
      message: error.message
    });
  }
});

module.exports = router;
```

---

## Testing with cURL

```bash
# CREATE
curl -X POST http://localhost:3000/api/so-van-bang \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{
    "nam": 2024,
    "soHieuVanBang": "2024-001-PTIT",
    "ngayTao": "2024-01-15",
    "ghiChu": "Sổ năm 2024"
  }'

# READ
curl http://localhost:3000/api/so-van-bang?page=1&limit=10

# UPDATE
curl -X PUT http://localhost:3000/api/so-van-bang/[id] \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"ghiChu": "Updated"}'

# DELETE
curl -X DELETE http://localhost:3000/api/so-van-bang/[id] \
  -H "Authorization: Bearer token"

# SEARCH (PUBLIC)
curl -X POST http://localhost:3000/api/thong-tin-van-bang/search \
  -H "Content-Type: application/json" \
  -d '{
    "soHieuVanBang": "2024-001/1",
    "maSinhVien": "24DCCC005"
  }'
```

---

## Tổng kết

✅ **Frontend** đã xong - tất cả pages, models, routes đự phòng
❌ **Backend** cần phát triển - API endpoints, database logic
📱 **Mobile** (nếu cần) - có thể dùng các API trên

**Liên hệ**: Nếu có vấn đề, mở issue hoặc email cho thầy!
