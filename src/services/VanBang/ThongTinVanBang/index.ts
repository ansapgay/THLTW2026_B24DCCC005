// Service for ThongTinVanBang
// All HTTP calls are handled by useInitService hook used in useInitModel

import axios from '@/utils/axios';
import { ip3 } from '@/utils/ip';

/**
 * Tra cứu văn bằng không yêu cầu đăng nhập
 */
export async function searchVanBang(params: {
  soHieuVanBang?: string;
  soVaoSo?: number;
  maSinhVien?: string;
  hoTen?: string;
  ngaySinh?: string;
}) {
  return axios.post(`${ip3}/thong-tin-van-bang/search`, params);
}

/**
 * Tăng lượt tra cứu
 */
export async function addViewCount(vanBangId: string) {
  return axios.post(`${ip3}/thong-tin-van-bang/${vanBangId}/add-view-count`);
}
