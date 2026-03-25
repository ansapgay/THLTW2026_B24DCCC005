import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<ThongTinVanBang.IRecord>('thong-tin-van-bang');
  return {
    ...objInit,
  };
};
