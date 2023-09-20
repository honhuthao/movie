export type LichSuVeDat = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  loaiNguoiDung: LoaiNguoiDung;
  thongTinDatVe: ThongTinDATVe[];
};

export type LoaiNguoiDung = {
  maLoaiNguoiDung: string;
  tenLoai: string;
};

export type ThongTinDATVe = {
  danhSachGhe: DanhSachGhe[];
  maVe: number;
  ngayDat: Date;
  tenPhim: string;
  hinhAnh: string;
  giaVe: number;
  thoiLuongPhim: number;
};

export type DanhSachGhe = {
  maHeThongRap: string;
  tenHeThongRap: string;
  maCumRap: string;
  tenCumRap: string;
  maRap: number;
  tenRap: string;
  maGhe: number;
  tenGhe: string;
};
