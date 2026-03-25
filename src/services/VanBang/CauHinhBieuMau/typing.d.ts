declare module CauHinhBieuMau {
  /** Cấu hình trường thông tin trong biểu mẫu văn bằng */
  export interface IRecord {
    _id: string;
    tenTruong: string; // Tên trường (VD: "Dân tộc", "Nơi sinh")
    kieuDuLieu: 'String' | 'Number' | 'Date'; // Kiểu dữ liệu
    thuTuHienThi: number; // Thứ tự hiển thị (để sort)
    batBuoc?: boolean; // Có bắt buộc hay không
    giaTri?: string; // Default value
    moTa?: string; // Mô tả trường
    ghiChu?: string;
    createdAt?: string;
    updatedAt?: string;
  }
}
