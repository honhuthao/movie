import { useNavigate } from "react-router-dom";
import { PATH } from "../constant/config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "schema/LoginSchema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "store";
import { LoginThunk } from "store/QuanLyNguoiDung/Thunk";
import { Input } from "components/ui/Input";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

export const Logins = () => {
  const navigate = useNavigate();
  const { isLoading } = useSelector(
    (state: RootState) => state.quanLyNguoiDungToolkit
  );
  useEffect(() => {
    if (localStorage.getItem("USER")) {
      navigate("/");
    }
  }, []);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });
  const dispacth = useAppDispatch();
  const onSubmit = async (value) => {
    dispacth(LoginThunk(value))
      .unwrap()
      .then(() => {
        toast.success("Đăng nhập thành công");
        navigate("/");
      })
      .catch((err) => toast.error(err?.response?.data?.content));
  };
  return (
    <form className="pt-[30px] pb-[60px]" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-white text-40 font-600">Sign In</h1>
      <div className="mt-20">
        <Input
          register={register}
          error={errors?.taiKhoan?.message as string}
          name="taiKhoan"
          type="text"
          placeholder="Tài Khoản"
        />
        <Input
          className=""
          register={register}
          error={errors?.matKhau?.message as string}
          placeholder="Mật khẩu"
          name="matKhau"
          type="password"
        ></Input>

        <div className="mt-40">
          {!isLoading ? (
            <div className="">
              <button
                disabled={false}
                className="text-white bg-red-500 font-500 rounded text-20 w-full p-10"
              >
                Sign In
              </button>
            </div>
          ) : (
            <button
              disabled={true}
              className="text-white  justify-center bg-slate-400 font-500 rounded text-20 w-full p-10"
            >
              Sign In
              <LoadingOutlined className="ml-2" />
            </button>
          )}
        </div>
        <p className="text-white p-[10px] font-700">
          Chưa có tài khoản?
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate(PATH.resgister)}
          >
            Đăng ký
          </span>
        </p>
      </div>
    </form>
  );
};
