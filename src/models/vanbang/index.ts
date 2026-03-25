import useInitModel from '@/hooks/useInitModel';

export const useSoVanBangModel = () => {
  return useInitModel<SoVanBang.IRecord>('so-van-bang');
};

export const useQuyetDinhTotNghiepModel = () => {
  return useInitModel<QuyetDinhTotNghiep.IRecord>('quyet-dinh-tot-nghiep');
};

export const useCauHinhBieuMauModel = () => {
  return useInitModel<CauHinhBieuMau.IRecord>('cau-hinh-bieu-mau');
};

export const useThongTinVanBangModel = () => {
  return useInitModel<ThongTinVanBang.IRecord>('thong-tin-van-bang');
};
