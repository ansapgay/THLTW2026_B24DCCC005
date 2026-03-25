declare module ThongTinVanBang {
  /** Thông tin chi tiết của một văn bằng tốt nghiệp */
  export interface IRecord {
    _id: string;
    soVaoSo: number; // Số vào sổ (auto from SoVanBang)
    soHieuVanBang: string; // Số hiệu văn bằng
    soVanBangId: string; // Reference đến sổ văn bằng
    quyetDinhId: string; // Reference đến quyết định tốt nghiệp
    maSinhVien: string; // Mã sinh viên
    hoTen: string; // Họ tên sinh viên
    ngaySinh: string; // Ngày sinh (YYYY-MM-DD)
    
    // Dynamic fields từ biểu mẫu cấu hình
    thongTinThem?: Record<string, any>; // {tenTruong: "value", ...}
    
    luotTraCuu?: number; // Số lượt tra cứu (mặc định 0)
    trangThai?: 'DRAFT' | 'COMPLETED' | 'PUBLISHED';
    ghiChu?: string;
    createdAt?: string;
    updatedAt?: string;
  }
}
