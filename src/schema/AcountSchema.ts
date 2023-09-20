import { z } from "zod";
export const AccountSchema = z.object({
    taiKhoan : z.string().nonempty('Vui lòng nhập tài khoản').max(20,'Nhập tối đa 20 ký tự').min(3,'nhập tối thiểu 3 ký tự'),
    email : z.string().nonempty('Vui lòng nhập email').email('email không tồn tại '),
    soDt : z.string().nonempty('Vui lòng nhập số điện thoại'),
    maNhom : z.string().nonempty('Vui lòng nhập số mã nhóm'),
    hoTen : z.string().nonempty('Vui lòng nhập số họ tên'),
    matKhau :  z.string().nonempty('Vui lòng nhập mật khẩu'),
    maLoaiNguoiDung : z.string().nonempty('Vui lòng nhập mã người dùng'),
})
export type AccountSchemaType = z.infer<typeof AccountSchema>