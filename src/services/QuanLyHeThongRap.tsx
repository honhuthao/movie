import { apiInstance } from "constant";
import { DetailFilm } from "types/DetailFilm";
import { heThongRapChieu } from "types/HeThongRap";

import { QuanLyRap } from "types/QuanLyRap";

const api = apiInstance({
  baseURL: "https://movienew.cybersoft.edu.vn/api/QuanLyRap",
});
export const QuanLyRapService = {
  getHethongRap() {
    return api.get<ApiReponse<QuanLyRap[]>>("LayThongTinHeThongRap");
  },
  getCumRapTheoHeThong() {
    return api.get<ApiReponse<heThongRapChieu[]>>(
      `LayThongTinLichChieuHeThongRap?maNhom=GP01`
    );
  },
  getDetailFilm(maPhim: string) {
    return api.get<ApiReponse<DetailFilm>>(
      `LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
  },
};
