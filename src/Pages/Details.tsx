import { Container } from "components/layouts/MainLayout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getDetailFilm } from "store/GetDetailFilm/Thunk";
import styled from "styled-components";
import "../assets/Css/circle.css";
import { Rate } from "antd";
import "../assets/style.css";
import "../assets/Scss/BlurBG.scss";
import { Tabs } from "antd";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Spin } from "components/ui/LoadingPages";
import moment from "moment";
import type { TabsProps } from "antd";
import { PATH } from "constant";
import { PlayCircleOutlined } from "@ant-design/icons";

const Details = () => {
  const { DetailFilm, isFetchDetail } = useSelector(
    (state: RootState) => state.GetDetail
  );
  const [isOpen, setIsopen] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!localStorage.getItem("USER")) {
      navigate(PATH.login);
    }
    dispatch(getDetailFilm(id));
  }, [dispatch]);

  const navigate = useNavigate();
  const onChange = () => {};
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <h2 className="tabs">Lịch chiếu</h2>,
      children: (
        <Tabs
          className="bg-white "
          tabPosition={"left"}
          items={DetailFilm?.heThongRapChieu?.map((item, i) => {
            const id = String(i + 1);
            return {
              label: (
                <img
                  src={item.logo}
                  style={{ width: "50px", height: "50px" }}
                />
              ),
              key: id,
              children: item.cumRapChieu.map((hrt, index) => {
                return (
                  <div key={index} className="mt-10">
                    <div className="flex items-center">
                      <img
                        src={hrt.hinhAnh}
                        style={{ width: "50px", height: "55px" }}
                        alt=""
                      />
                      <div className="ml-3">
                        <p className=" font-600 text-2xl">{hrt.tenCumRap}</p>
                        <p className="text-xl">{hrt.diaChi}</p>
                      </div>
                    </div>
                    <div className="thongTinRapChieu grid grid-cols-4">
                      {hrt?.lichChieuPhim
                        .slice(0, 10)
                        .map((lichChieu, index) => {
                          return (
                            <NavLink
                              to={`/checkout/${lichChieu.maLichChieu}`}
                              className=" text-left text-2xl text-blue-500"
                              key={index}
                            >
                              {moment(lichChieu.ngayChieuGioChieu).format(
                                "hh:mm A"
                              )}
                            </NavLink>
                          );
                        })}
                    </div>
                  </div>
                );
              }),
            };
          })}
        />
      ),
    },
    {
      key: "2",
      label: <h2 className="tabs">Thông tin</h2>,
      children: <h1 className="text-2xl font-600">Đang cập nhật</h1>,
    },
    {
      key: "3",
      label: <h2 className="tabs">Đánh giá</h2>,
      children: (
        <h1 className="text-2xl font-600">
          Hãy đánh giá sau khi thưởng thức phim nhá
        </h1>
      ),
    },
  ];

  if (isFetchDetail) {
    return (
      <div
        className="loading flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.1)", height: "100vh" }}
      >
        <Spin className="example" />
      </div>
    );
  }
  return (
    <Banner $backGroundBlur={DetailFilm?.hinhAnh}>
      <div className="overlay"></div>
      {isOpen && (
        <div className="popupContainer">
          <div
            className="closeButton cursor-pointer"
            onClick={() => setIsopen(false)}
          >
            &times;
          </div>
          <iframe
            className="videoIframe"
            src={DetailFilm?.trailer.replace("watch?v=", "embed/")}
            allowFullScreen
          ></iframe>
        </div>
      )}

      <Container
        className="h-full flex justify-center"
        style={{ marginTop: "100px" }}
      >
        <div className="absolute top-[10%] right-[0]  ">
          <div className="flex items-center justify-center">
            <div className="flex items-center  justify-center ">
              <div className="img-card">
                <img src={`${DetailFilm?.hinhAnh}`} className="" alt="" />
                <div className="z-100 absolute top-1/2 left-1/2 text-white -translate-y-1/2 -translate-x-1/2 text-4xl play"></div>

                <div className="overlayCard"></div>
              </div>
              <div className="ml-20 w-1/2 text-white font-600 h-full flex flex-col justify-between">
                <p>
                  Ngày chiếu :{" "}
                  {moment(DetailFilm?.ngayKhoiChieu).format("DD-MM-YYYY")}{" "}
                </p>
                <p className="text-30">{DetailFilm?.tenPhim}</p>
                <p className="mt-10">{DetailFilm?.moTa}</p>
                <div>
                  <button
                    onClick={() => setIsopen(true)}
                    style={{ textAlign: "left" }}
                    className="flex items-center text-blue-500 hover:scale-110 transition-all duration-300 text-[30px]"
                  >
                    <span className="mr-3">Xem trailer</span>
                    <PlayCircleOutlined />
                  </button>
                </div>
              </div>
            </div>
            <div className="-ml-20 flex flex-col justify-between items-center basis-1/2">
              <h1 className="text-2xl text-blue-500 mb-15 flex justify-evenly -ml-9 items-center">
                <Rate allowHalf defaultValue={DetailFilm?.danhGia} />
              </h1>
              ;
              <div className={`c100 p${DetailFilm?.danhGia * 10} big`}>
                <span>{DetailFilm?.danhGia * 10}%</span>
                <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-30 w-[80%] mx-auto">
            <Tabs
              className="bg-white !p-[20px]"
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
            />
          </div>
        </div>
        {/* thông tin phim */}
      </Container>
    </Banner>
  );
};
const Banner = styled.div<{ $backGroundBlur?: string }>`
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  position: absolute;
  overflow-x: hidden;
  .overlay {
    /* overflow-y: hidden; */
    position: absolute;
    width: 100%;
    height: calc(120%);
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 1));
    margin-top: 80px;
  }
  /* .overlayCard {
    position: absolute;
    top: 0;
    z-index: 100;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    /* width: 180%; */

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.$backGroundBlur});
    background-size: cover;
    background-position: center top;
    overflow: hidden;
    -webkit-filter: blur(15px);
    -moz-filter: blur(15px);
    -o-filter: blur(15px);
    -ms-filter: blur(15px);
    filter: blur(15px);
    -webkit-transform: scale(1.2, 1.2);
    -moz-transform: scale(1.2, 1.2);
    -o-transform: scale(1.2, 1.2);
    -ms-transform: scale(1.2, 1.2);
    transform: scale(1.2, 1.2);
  }

  img,
  .img-card {
    width: 200px;
    height: 300px;
    display: inline-block;
    z-index: 90;
  }
  .play {
    display: none;
    transition: all 0.3s;
    /* z-index: 9999999999 99; */
  }
  .img-card {
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    ::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
      transition: all 0.3s;
    }
  }

  .tabs {
    font-size: 20px;
    background-color: white;
    font-weight: 500;
  }
  .popupContainer {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999999999;
  }

  .closeButton {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
  }

  .videoIframe {
    z-index: 99999999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 600px;
  }
`;

export default Details;
