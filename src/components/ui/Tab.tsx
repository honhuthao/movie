import { Tabs } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { getCumRap } from "store/GetThongTinCumRap/Thunk";
import moment from "moment";

export const Tab = () => {
  const dispatch = useAppDispatch();
  const { heThongRapChieu } = useSelector(
    (state: RootState) => state.CumRapToolkit
  );
  useEffect(() => {
    dispatch(getCumRap());
  }, []);

  return (
    <>
      <Tabs
        tabPosition={"left"}
        items={heThongRapChieu?.map((heThong, i) => {
          const id = String(i + 1);

          return {
            label: (
              <div>
                <img src={`${heThong.logo}`} width={50} />
              </div>
            ),

            key: id,
            children: (
              <Tabs
                tabPosition="left"
                items={heThong.lstCumRap.slice(0, 12).map((rap, i) => {
                  const index = String(i + 1);
                  return {
                    label: (
                      <div className="flex items-center">
                        <img
                          className="mt-10"
                          src={rap.hinhAnh}
                          width={50}
                          alt=""
                        />
                        <div className="ml-10 text-left">
                          <p className="text-20 font-500 text-green-500">
                            {rap.tenCumRap}
                          </p>
                          <p>{rap.diaChi}</p>
                        </div>
                      </div>
                    ),
                    key: index,
                    children: rap.danhSachPhim?.slice(0, 6).map((phim) => {
                      return (
                        <div>
                          <div className="flex mt-10 items-start">
                            <img
                              style={{
                                width: "80px",
                                height: "80px",
                              }}
                              src={phim.hinhAnh}
                              alt=""
                            />

                            <div className="flex flex-col ml-10 justify-between">
                              <p className="text-20 font-500  text-blue-600 ">
                                {phim.tenPhim}
                              </p>
                              <p className="mt-10 text-20">
                                120 phút - Điểm Cyber 10
                              </p>
                            </div>
                          </div>
                          <p className="text-26">Thời gian chiếu:</p>
                          <div className="grid grid-cols-2 ">
                            {phim.lstLichChieuTheoPhim
                              .slice(0, 6)
                              .map((lichChieu, index) => {
                                return (
                                  <div>
                                    <NavLink
                                      to={`/checkout/${lichChieu.maLichChieu}`}
                                      key={index}
                                      className="font-500 text-20"
                                    >
                                      {moment(
                                        lichChieu.ngayChieuGioChieu
                                      ).format("DD-MM-YYYY HH:mm A")}
                                    </NavLink>
                                  </div>
                                );
                              })}
                          </div>
                          <hr />
                        </div>
                      );
                    }),
                  };
                })}
              />
            ),
          };
        })}
      />
    </>
  );
};
