import { Spin } from "antd";
import { Container } from "components/layouts/MainLayout";
import { Button, Card, Carousel } from "components/ui/";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getBannerList } from "store/GetBannerList/Thunk";
import { getListFilmThunk } from "store/QuanLyFilm/Thunk";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/style.css";
import { PlayCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import { Tab } from "components/ui/Tab";
import { getThongTinRap } from "store/GetHeThongRap/Thunk";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getLichSuDatVeThunk } from "store/GetLichSuVeDat/Thunk";
export const HomTemPlate = () => {
  // const [soPhim, setSoPhim] = useState<number>(4);
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);
  const [video, setVideo] = useState<string>();
  const [slideToShow, setSlideToShow] = useState<number>(4);
  const [maxWidth, setMaxWidth] = useState<string>("1400px");
  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
  };
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { listFilm, isFetchMovie } = useSelector(
    (state: RootState) => state.quanLyPhimToolKit
  );

  const { listBanner } = useSelector(
    (state: RootState) => state.layDanhSachBannerToolkit
  );
  // set active cho phim sắp chiếu và đang chiếu
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    dispatch(getListFilmThunk(""));
    dispatch(getBannerList());
    dispatch(getThongTinRap());
    dispatch(getLichSuDatVeThunk());
  }, [dispatch]);
  const renderFilm = () => {
    if (isActive) {
      return listFilm?.map((film) => {
        if (film?.sapChieu) {
          return (
            <Homtemplate
              style={{ maxWidth: "600px" }}
              className="flex mx-auto  flex-col items-center justify-center"
            >
              <Card
                className="css-dev-only-do-not-override-17a39f8 ant-card-hoverable"
                hoverable
                style={{ width: 250, height: 470 }}
                cover={
                  <img
                    alt="example"
                    height={300}
                    width={200}
                    src={film.hinhAnh}
                  />
                }
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-40 text-white play">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setVideo(film?.trailer);
                    }}
                    className="hover:scale-125 transition-all duration-300"
                  >
                    <PlayCircleOutlined />
                  </button>
                </div>
                <Card.Meta
                  title={film.tenPhim}
                  description={"Phim Hay"}
                  className="text-20"
                />
              </Card>
              <div className="mt-10">
                <Button
                  onClick={() => navigate(`/details/${film.maPhim}`)}
                  className="w-[250px] h-[40px] bg-blue-500"
                  style={{ lineHeight: "0px" }}
                  type="primary"
                >
                  <span className="font-500 text-20">THÔNG TIN PHIM</span>
                </Button>
              </div>
            </Homtemplate>
          );
        }
      });
    } else {
      return listFilm?.map((film) => {
        if (film?.dangChieu) {
          return (
            <Homtemplate className="">
              <Card
                hoverable
                style={{ width: 240, height: 470 }}
                cover={<img alt="example" height={300} src={film.hinhAnh} />}
              >
                <div className="overlay"></div>{" "}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-40 text-white play">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setVideo(film?.trailer);
                    }}
                    className="hover:scale-125 transition-all duration-300"
                  >
                    <PlayCircleOutlined />
                  </button>
                </div>
                <Card.Meta
                  title={film.tenPhim}
                  description={"Phim Hay"}
                  className="text-20"
                />
              </Card>
              <div className="mt-10">
                <Button
                  onClick={() => navigate(`details/${film.maPhim}`)}
                  className="w-[240px] h-[40px]"
                  style={{ lineHeight: "20px" }}
                  type="primary"
                  danger
                >
                  <span className="font-500 text-20">MUA VÉ</span>
                </Button>
              </div>
            </Homtemplate>
          );
        }
        // setSoPhim(soPhimDangChieu);
      });
    }
  };
  if (isFetchMovie) {
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
    <Homtemplate className="relative">
      {isOpen && (
        <div className="popupContainer">
          <div
            className="closeButton cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </div>
          <iframe
            className="videoIframe"
            src={video.replace("watch?v=", "embed/")}
            allowFullScreen
          ></iframe>
        </div>
      )}

      <Carousel autoplay>
        {listBanner.map((img) => {
          return (
            <div>
              <img
                src={img.hinhAnh}
                className="w-full"
                alt=""
                style={{ height: "888px" }}
              />
            </div>
          );
        })}
      </Carousel>
      <Container className="!mb-40" style={{ maxWidth: "1400px" }}>
        <div className="text-30 font-400 mb-30 flex justify-center  ">
          <button
            onClick={() => {
              setActive(true);
              setSlideToShow(2);
              setMaxWidth("600px");
            }}
          >
            <span
              className={`cursor-pointer p-15 showFilm ${
                isActive ? `text-[rgba(250,82,56)]` : ""
              } `}
            >
              Sắp chiếu
            </span>
          </button>
          <button
            onClick={() => {
              setActive(false);
              setSlideToShow(4);
              setMaxWidth("1400px");
            }}
          >
            <span
              className={`cursor-pointer p-15 showFilm ${
                isActive ? "" : "text-[rgba(250,82,56)]"
              } `}
            >
              Đang chiếu
            </span>
          </button>
        </div>
        <div className="mx-auto" style={{ maxWidth: maxWidth }}>
          <Slider {...settings}>{renderFilm()}</Slider>
        </div>
        {/* tabs phim */}
        <div className="mt-16">
          <Tab />
        </div>
        <button
          onClick={scrollToTop}
          style={{ display: visible ? "inline" : "none" }}
          className="backToTop"
        >
          <UpCircleOutlined />
        </button>
      </Container>
    </Homtemplate>
  );
};
const Homtemplate = styled.div`
  .ant-card-cover {
    transition: all 0.4s;
  }
  .play {
    display: none;
  }
  .ant-card-hoverable:hover .ant-card-cover::after {
    transition: all 0.4s;
    opacity: 1;
    border-radius: 8px;
    box-shadow: none;
  }
  .ant-card-hoverable:hover .play {
    display: block;
  }
  .ant-card-cover::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: 0.4s all;
    background-image: linear-gradient(
      transparent,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.8)
    );
  }
  .backToTop {
    display: inline-block;
    background-color: #ff9800;
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 4px;
    position: fixed;
    bottom: 30px;
    right: 30px;
    transition: background-color 0.3s, opacity 0.5s, visibility 0.5s;
    opacity: 1;
    /* visibility: hidden; */
    z-index: 100000;
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

  .backToTop {
    /* content: "\f077"; */
    /* font-family: FontAwesome; */
    font-weight: normal;
    font-style: normal;
    font-size: 1.5em;
    line-height: 27px;
    color: #fff;
  }
  .backToTop:hover {
    cursor: pointer;
    background-color: #333;
  }
  .backToTop:active {
    background-color: #555;
  }
  .backToTop.show {
    opacity: 1;
    visibility: visible;
  }

  /* Styles for the content section */
`;
