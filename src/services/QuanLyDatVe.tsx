import { apiInstance } from "constant";
import { DanhSachVe, Ve } from "types/DanhSachVePhim";
const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_DAT_VE,
});
export const QuanLyDatVeService = {
  getDanhSachPhongVe: (maLichChieu) => {
    return api.get<ApiReponse<DanhSachVe>>(
      `LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  },
  datVe: (thongTinDatVe: Ve) => {
    return api.post("DatVe", thongTinDatVe);
  },
};
