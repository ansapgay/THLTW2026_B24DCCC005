declare module QuyetDinhTotNghiep {
  /** Quyết định tốt nghiệp - một quyết định có thể có nhiều sinh viên */
  export interface IRecord {
    _id: string;
    soQD: string; // Số quyết định
    ngayBanHanh: string; // Ngày ban hành (YYYY-MM-DD)
    trichYeu: string; // Trích yếu quyết định
    soVanBangId: string; // Reference đến sổ văn bằng
    soVanBangNam?: number; // Năm của sổ (denormalize)
    trangThai?: 'DRAFT' | 'ACTIVE' | 'CLOSED'; // Trạng thái quyết định
    ghiChu?: string;
    createdAt?: string;
    updatedAt?: string;
  }
}
