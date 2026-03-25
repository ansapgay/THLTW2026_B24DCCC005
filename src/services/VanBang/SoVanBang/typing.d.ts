declare module SoVanBang {
  /** Sổ văn bằng - một sổ cho mỗi năm */
  export interface IRecord {
    _id: string;
    nam: number; // Năm của sổ
    soVaoSoHienTai: number; // Số vào sổ hiện tại (auto increment)
    soHieuVanBang: string; // Số hiệu văn bằng (tùy tuỳ cấu hình)
    ngayTao?: string; // Ngày tạo sổ
    ghiChu?: string;
    createdAt?: string;
    updatedAt?: string;
  }
}
