import { useEffect } from "react";
import { Tabs } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getLichSuDatVeThunk } from "store/GetLichSuVeDat/Thunk";
import { Button, Input } from "components/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountSchema, AccountSchemaType } from "schema";
import { upDateThunk } from "store/CapNhatNguoiDung/Thunk";
import _ from "lodash";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant";

const AccountTemplates = () => {
  const navigate = useNavigate();
  const { LichSuDatVe } = useSelector(
    (state: RootState) => state.LichSuVeToolkit
  );
  const { isLoading } = useSelector(
    (state: RootState) => state.CapNhatNguoiDungToolKit
  );
  const { language } = useSelector(
    (state: RootState) => state.setUpNgonNguToolkit
  );

  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(AccountSchema),
  });

  const onSubmit: SubmitHandler<AccountSchemaType> = async (data) => {
    await dispatch(upDateThunk(data));
    dispatch(getLichSuDatVeThunk());
  };
  useEffect(() => {
    reset({ ...LichSuDatVe, soDt: LichSuDatVe?.soDT });
    if (!localStorage.getItem("USER")) {
      navigate(PATH.login);
    }
  }, [LichSuDatVe, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {language == "en" ? "Account" : "Tài Khoản"}
        </label>
        <Input
          register={register}
          name="taiKhoan"
          type="text"
          error={errors?.taiKhoan?.message as string}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {language == "en" ? "Full name" : "Họ tên"}
        </label>
        <Input
          name="hoTen"
          register={register}
          type="text"
          error={errors?.hoTen?.message as string}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {language == "en" ? "Phone number" : "Họ tên"}
        </label>
        <Input
          name="soDt"
          register={register}
          error={errors?.soDt?.message as string}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {language == "en" ? "Email" : "Email"}
        </label>
        <Input
          name="email"
          register={register}
          error={errors?.email?.message as string}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {language == "en" ? "Group code" : "Mã nhóm"}
        </label>
        <Input
          name="maNhom"
          register={register}
          error={errors?.maNhom?.message as string}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {language == "en" ? "User type" : "Loại người dùng"}
        </label>
        <Input
          name="maLoaiNguoiDung"
          register={register}
          error={errors?.maLoaiNguoiDung?.message as string}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {language == "en" ? "Password" : "Mật khẩu"}
        </label>
        <Input
          name="matKhau"
          register={register}
          error={errors?.matKhau?.message as string}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="text-left mt-10">
        <Button
          disabled={isLoading}
          htmlType="submit"
          type="primary"
          className=" bg-slate-500"
        >
          {language ? "Account" : "Tài Khoản"}
        </Button>
      </div>
    </form>
  );
};
const TabsAccount = () => {
  const { LichSuDatVe } = useSelector(
    (state: RootState) => state.LichSuVeToolkit
  );
  const renderLichSuVeDat = () => {
    return LichSuDatVe?.thongTinDatVe?.map((item) => {
      return (
        <div className="p-2 lg:w-[50%] md:w-1/2 w-full text-xl">
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={item.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-red-500 text-2xl title-font font-medium">
                {item.tenPhim}
              </h2>
              <p className="text-gray-500 ">
                <span className="font-600 text-black">Ngày chiếu</span>:{" "}
                {moment(item.ngayDat).format("DD-MM-YYYY")}{" "}
                <span className="font-600 text-black">Giờ chiếu</span> :{" "}
                {moment(item.ngayDat).format("hh:mm")}
              </p>

              <p>
                Địa điểm : {_.first(item.danhSachGhe).tenHeThongRap}{" "}
                {_.first(item.danhSachGhe).tenRap}{" "}
              </p>
              <p>
                Số ghế đã chọn
                {item?.danhSachGhe.map((soGhe) => {
                  return (
                    <span className="mx-4 text-green-500">{soGhe.tenGhe}</span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  const { language } = useSelector(
    (state: RootState) => state.setUpNgonNguToolkit
  );
  return (
    <div>
      <TabsAcc className="container mx-auto mt-100">
        <Tabs
          tabPosition="left"
          className="mt-100"
          defaultActiveKey="1"
          items={[
            {
              label:
                language == "en" ? "Personal information" : "Thông tin cá nhân",
              key: "1",
              children: <AccountTemplates />,
            },
            {
              label: language == "en" ? "Tickets purchased" : "Vé đã mua",
              key: "2",
              children: (
                <div className="flex flex-wrap">{renderLichSuVeDat()}</div>
              ),
            },
          ]}
        />
      </TabsAcc>
    </div>
  );
};
export default TabsAccount;
const TabsAcc = styled.div`
  /* .css-dev-only-do-not-override-17a39f8.ant-tabs > .ant-tabs-nav {
    margin-top: 200px !important;
  } */
`;
