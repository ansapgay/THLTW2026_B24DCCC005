import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<QuyetDinhTotNghiep.IRecord>('quyet-dinh-tot-nghiep');
  return {
    ...objInit,
  };
};
