import { apiInstance } from "constant"
import { AccountSchemaType } from "schema"
import { LichSuVeDat } from "types/LichSuDatVe"
import { user } from "types/QuanLyNguoiDung"

const api = apiInstance({
    baseURL : import.meta.env.VITE_QUAN_LY_NGUOI_DUNG
})
export const quanLyNguoiDungService = {
    register: (payload)=> api.post('/dangky',payload) ,
    login : (payload) => api.post<ApiReponse<user>>('Dangnhap',payload),
    GetLichSuDatVe : () => api.post<ApiReponse<LichSuVeDat>>('/ThongTinTaiKhoan'),   
    updateUser : (payload : AccountSchemaType | null) =>api.put('CapNhatThongTinNguoiDung',payload)
}