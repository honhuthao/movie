import { CloseOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Spin } from "components/ui/LoadingPages";
import { useEffect } from "react";
import { sortBy } from "lodash";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { getVePhim } from "store/GetDanhSachDatVe/Thunk";
import { addGhe, buyTicket, hoanTat } from "store/GetDanhSachDatVe/slice";
import styled from "styled-components";
import { PATH } from "constant";
import { Tabs, TabsProps } from "antd";
import { getLichSuDatVeThunk } from "store/GetLichSuVeDat/Thunk";
import _ from "lodash";
import moment from "moment";
import { chuyenTab } from "store/ThongTinDatVe/slice";
import { Button } from "components/ui";
import Swal from "sweetalert2";
import { DatVeThunk } from "store/ThongTinDatVe/Thunk";
// checkout

const CheckoutTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { user } = useSelector(
    (state: RootState) => state.quanLyNguoiDungToolkit
  );
  const {
    danhSachVe,
    danhSachGheDangDat,
    isFetchListTicket,
    danhSachGheKhachDat,
  } = useSelector((state: RootState) => state.getVePhimToolkit);
  const { isLoading } = useSelector(
    (state: RootState) => state.ThongTinVeDatToolkit
  );
  console.log(danhSachVe);
  console.log(danhSachGheDangDat);

  useEffect(() => {
    if (!localStorage.getItem("USER")) {
      navigate(PATH.login);
    }
    dispatch(getVePhim(id));
  }, []);
  if (isLoading || isFetchListTicket) {
    return (
      <div
        className="loading flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.1)", height: "100vh" }}
      >
        <Spin className="example" />
      </div>
    );
  }
  const renderSeats = () => {
    return danhSachVe?.danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      let classGheDuocUserDat = "";
      let classGheKhachDangDat = "";
      let indexGheKhachDangDat = danhSachGheKhachDat?.findIndex((gheKD) => {
        return gheKD.maGhe == ghe.maGhe;
      });
      if (indexGheKhachDangDat != -1) {
        classGheKhachDangDat = "gheKhachDangDat";
      }
      let indexGheDangDat = danhSachGheDangDat?.findIndex((gheDD) => {
        return gheDD.tenGhe == ghe.tenGhe;
      });
      if (indexGheDangDat != -1) {
        classGheDangDat = "gheDangDat";
      }
      if (user?.taiKhoan == ghe.taiKhoanNguoiDat) {
        classGheDuocUserDat = "gheDuocUserLoginDat";
      }
      return (
        <button
          onClick={() => dispatch(addGhe(ghe))}
          disabled={ghe.daDat || classGheKhachDangDat !== ""}
          className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDuocUserDat} ${classGheKhachDangDat}`}
          key={index}
        >
          {ghe.daDat ? (
            classGheDuocUserDat != "" ? (
              <UserOutlined />
            ) : (
              <CloseOutlined />
            )
          ) : (
            ghe.stt
          )}
        </button>
      );
    });
  };
  return (
    <Checkout className=" mt-5 min-h-[120vh] text-20">
      <div className="grid grid-cols-12">
        <div className="col-span-9 ">
          <div className="mt-40">
            <div className="bg-black w-4/5 mx-auto h-[30px]"></div>
            <div className="trapezoid text-center">
              <div className="text-center text-black">Màn Hình</div>
            </div>
            <div className="w-[80%] mx-auto">{renderSeats()}</div>
          </div>
          <div className="mt-5 flex justify-center">
            <table className="w-3/4  divide-y-2 divide-gray-200">
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế người khác đã đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế bạn đã đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="text-center">
                    <button className="ghe">00</button>
                  </td>
                  <td className="text-center">
                    <button className="ghe gheDaDat">00</button>
                  </td>
                  <td className="text-center">
                    <button className="ghe gheDangDat">00</button>
                  </td>
                  <td className="text-center">
                    <button className="ghe gheVip">00</button>
                  </td>
                  <td className="text-center">
                    <button className="ghe gheDuocUserLoginDat">00</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-center text-green-500 text-2xl">
            {" "}
            {danhSachGheDangDat
              .reduce((total, gheDaDat) => {
                return (total += gheDaDat.giaVe);
              }, 0)
              .toLocaleString()}
            đ
          </h3>
          <hr />
          <h3 className="text-xl">{danhSachVe?.thongTinPhim.tenPhim}</h3>
          <p>Địa điểm: {danhSachVe?.thongTinPhim.diaChi}</p>
          <p>
            Ngày chiếu : {danhSachVe?.thongTinPhim.ngayChieu}{" "}
            {danhSachVe?.thongTinPhim.gioChieu} {""}
            {danhSachVe?.thongTinPhim.tenRap}
          </p>
          <hr />
          <div className="flex w-10/12 justify-between my-10 text-24">
            <span className="text-red-500">Ghế</span>
            {sortBy(danhSachGheDangDat, ["stt"]).map((gheDaDat) => {
              return <span className="text-blue-500">{gheDaDat.tenGhe}</span>;
            })}

            <span className="text-right text-green-500 ">
              {danhSachGheDangDat
                .reduce((total, gheDaDat) => {
                  return (total += gheDaDat.giaVe);
                }, 0)
                .toLocaleString()}
              đ
            </span>
          </div>
          <hr />
          <div className="my-15">
            <i>Email</i> <br />
            {user?.email}
          </div>
          <hr />
          <div className="my-15">
            <i>Phone</i> <br />
            {user?.soDT}
          </div>
          <hr />
          <div className="flex flex-col  justify-end items-center">
            {danhSachGheDangDat.length ? (
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Xác nhận mua vé?",
                    text: "Vé đã mua không thể hoàn lại được đâu",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Mua!",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      let res = await dispatch(
                        buyTicket({
                          maLichChieu: Number(id),
                          danhSachVe: danhSachGheDangDat?.map((item) => {
                            return { maGhe: item.maGhe, giaVe: item.giaVe };
                          }),
                        })
                      );
                      await dispatch(DatVeThunk(res.payload));
                      if (res.payload.danhSachVe.length) {
                        await dispatch(getVePhim(id));
                        await dispatch(getLichSuDatVeThunk());
                        dispatch(hoanTat());
                        dispatch(chuyenTab("2"));
                      }
                      Swal.fire(
                        "Đã mua!",
                        "Chúc bạn có buổi xem phim vui vẻ",
                        "success"
                      );
                    }
                  });
                }}
                className="text-center cursor-pointer bg-green-500 w-full py-3 font-600 text-3xl text-white"
              >
                Đặt vé
              </button>
            ) : (
              <button
                disabled={true}
                className="text-center cursor-no-drop bg-gray-500 w-full py-3 font-600 text-3xl text-white"
              >
                Đăt vé
              </button>
            )}
          </div>
        </div>
      </div>
    </Checkout>
  );
};
// kết quả đặt vé
const KetQuaDatVe = () => {
  const dispatch = useAppDispatch();
  const { LichSuDatVe } = useSelector(
    (state: RootState) => state.LichSuVeToolkit
  );
  useEffect(() => {
    dispatch(getLichSuDatVeThunk());
  }, []);
  const renderLichSuVeDat = () => {
    return LichSuDatVe?.thongTinDatVe?.map((item) => {
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full text-xl">
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
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">
            Lịch sử đặt vé của khách hàng
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed">
            Chúc bạn có một buổi xem phim vui vẻ cùng với gấu nhé!
          </p>
        </div>
        <div className="flex flex-wrap -m-2">{renderLichSuVeDat()}</div>
      </div>
    </section>
  );
};

const TabsComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(chuyenTab("1"));
  }, []);
  const onChange = (key: string) => {
    dispatch(chuyenTab(key));
    if (key == "3") {
      navigate("/");
    }
  };
  const { user } = useSelector(
    (state: RootState) => state.quanLyNguoiDungToolkit
  );
  const operations = user ? (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="rounded-full bg-red-400 mr-15"
        >
          {user.taiKhoan.substring(0, 1)}
        </div>
        <div className="" onClick={() => navigate(PATH.account)}>
          Xin Chào {user.hoTen}!
        </div>
      </div>
      <Button
        onClick={() => {
          localStorage.removeItem("USER");
          navigate(PATH.login);
        }}
      >
        Đăng xuất
      </Button>
    </div>
  ) : (
    <button>Helo</button>
  );
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "01 ĐẶT VÉ & THANH TOÁN",
      children: <CheckoutTemplate />,
    },
    {
      key: "2",
      label: "02 KẾT QUẢ ĐẶT VÉ",
      children: <KetQuaDatVe />,
    },
    {
      key: "3",
      label: <HomeOutlined className="text-30" />,
      children: "",
    },
  ];
  const { tabAtive } = useSelector((state: RootState) => {
    return state.ThongTinVeDatToolkit;
  });
  return (
    <div className="text-30 font-600">
      <header className="p-40">
        <Tabs
          tabBarExtraContent={operations}
          defaultActiveKey={"1"}
          activeKey={tabAtive}
          items={items}
          onChange={onChange}
        />
      </header>
    </div>
  );
};

const Checkout = styled.div`
  p,
  h3 {
    margin: 15px 0;
    font-weight: 500;
  }
  .ghe {
    width: 35px;
    height: 35px;
    background-color: rgba(123, 122, 122);
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    margin: 15px;
  }
  /* ghế được người khác đặt */
  .gheDaDat {
    background-color: red;
    cursor: no-drop;
  }
  .gheDangDat {
    background-color: #04c104 !important;
  }
  .gheVip {
    background-color: orange;
  }
  /*  ghế được chính mình đặt*/
  .gheDuocUserLoginDat {
    background-color: rgba(246, 246, 246);
    box-shadow: 1px 1px 19px 2px rgba(59, 59, 59, 1);
    -webkit-box-shadow: 1px 1px 19px 2px rgba(59, 59, 59, 1);
    -moz-box-shadow: 1px 1px 19px 2px rgba(59, 59, 59, 1);
    color: orange !important;
  }
  .gheKhachDangDat {
    background-color: rgba(242, 25, 191);
    cursor: no-drop;
  }
  .trapezoid {
    border-bottom: 80px solid
      hsla(0, 0.5025125628140685%, 39.01960784313726%, 0.08);
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    height: 0;
    width: 80%;
    /* background: rgba(0, 0, 0, 0.1); */
    margin: auto;
    filter: drop-shadow(-4px 12px 10px #000);
  }
`;

export default TabsComponent;
