import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<SoVanBang.IRecord>('so-van-bang');
  return {
    ...objInit,
  };
};
