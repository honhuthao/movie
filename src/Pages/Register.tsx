import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "schema";
import { quanLyNguoiDungService } from "services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

export const Register = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });
  const navigate = useNavigate();
  const onSubmit = async (value) => {
    try {
      setIsPending(true);
      let res = await quanLyNguoiDungService.register(value);
      if (res) {
        setIsPending(false);
      }
      toast.success("Đăng kí thành công");
      setTimeout(() => {
        navigate(PATH.login);
      }, 1000);
    } catch (err) {
      setIsPending(false);
      toast.error(err?.response?.data?.content);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-[30px] pb-[60px]">
      {/* <ToastContainer /> */}
      <h1 className="text-white text-40 font-600">Register</h1>
      <div className="mt-20">
        <div>
          <input
            placeholder="Tài Khoản"
            type="text"
            className="outline-none block w-full p-15 border text-white border-white rounded-lg bg-[#333] focus:ring-blue-600"
            {...register("taiKhoan")}
          />
          <p className="text-red-600">{errors?.taiKhoan?.message as string} </p>
        </div>
        <div className="mt-20">
          <input
            placeholder="Mật Khẩu"
            type="text"
            className="outline-none block w-full p-15 border text-white border-white rounded-lg bg-[#333] focus:ring-blue-600"
            {...register("matKhau")}
          />
          <p className="text-red-600">{errors?.matKhau?.message as string} </p>
        </div>
        <div className="mt-20">
          <input
            placeholder="Email"
            type="text"
            className="outline-none block w-full p-15 border text-white border-white rounded-lg bg-[#333] focus:ring-blue-600"
            {...register("email")}
          />
          <p className="text-red-600">{errors?.email?.message as string} </p>
        </div>
        <div className="mt-20">
          <input
            placeholder="Số Điện Thoại"
            type="text"
            className="outline-none block w-full p-15 border text-white border-white rounded-lg bg-[#333] focus:ring-blue-600"
            {...register("soDt")}
          />
          <p className="text-red-600">{errors?.soDt?.message as string} </p>
        </div>
        <div className="mt-20">
          <input
            placeholder="Mã Nhóm"
            type="text"
            className="outline-none block w-full p-15 border text-white border-white rounded-lg bg-[#333] focus:ring-blue-600"
            {...register("maNhom")}
          />
          <p className="text-red-600">{errors?.maNhom?.message as string} </p>
        </div>
        <div className="mt-20">
          <input
            placeholder="Họ và tên"
            type="text"
            className="outline-none block w-full p-15 border text-white border-white rounded-lg bg-[#333] focus:ring-blue-600"
            {...register("hoTen")}
          />
          <p className="text-red-600">{errors?.hoTen?.message as string} </p>
        </div>
        <div className="mt-20">
          {isPending ? (
            <button
              disabled={true}
              className="text-white bg-slate-400 font-500 rounded text-20 w-full p-[15px]"
            >
              Resgister
              <LoadingOutlined className="ml-2" />
            </button>
          ) : (
            <button
              disabled={false}
              className="text-white bg-red-700 font-500 rounded text-20 w-full p-[15px]"
            >
              Resgister
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
