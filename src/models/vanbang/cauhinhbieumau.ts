import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<CauHinhBieuMau.IRecord>('cau-hinh-bieu-mau');
  return {
    ...objInit,
  };
};
