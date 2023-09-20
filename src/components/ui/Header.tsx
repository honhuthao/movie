import styled from "styled-components";
import "../../assets/style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Popover } from ".";
import { UserOutlined } from "@ant-design/icons";
import { PATH } from "constant";
import { Select, Space } from "antd";
// import { useTranslation } from "react-i18next";
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { setUpNgonNgu } from "store/Language/Slice";

// Hook chuyển  đổi ngôn ngữ

export const Header = () => {
  const dispatch = useDispatch();
  const { language } = useSelector(
    (state: RootState) => state.setUpNgonNguToolkit
  );
  // const { t, i18n } = useTranslation();
  const handleChange = (value: string) => {
    dispatch(setUpNgonNgu(value));
  };
  const { user } = useSelector(
    (state: RootState) => state.quanLyNguoiDungToolkit
  );
  console.log(user);
  const { LichSuDatVe } = useSelector(
    (state: RootState) => state.LichSuVeToolkit
  );
  const renderLogin = () => {
    if (user) {
      return (
        <div
          onClick={async () => {
            localStorage.removeItem("USER");
            navigate(PATH.login);
          }}
          className="p-10 cursor-pointer hover:bg-gray-500 text-16 hover:text-white transition-all duration-300"
        >
          {language == "en" ? "Logout" : "Đăng xuất"}
        </div>
      );
    } else {
      return (
        <div
          onClick={() => navigate(PATH.login)}
          className="p-10 cursor-pointer hover:bg-gray-500 text-16 hover:text-white transition-all duration-300"
        >
          Đăng nhập
        </div>
      );
    }
  };
  const navigate = useNavigate();

  return (
    <HeaderS>
      <div className="header-content flex items-center h-full justify-between">
        <img
          src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
          alt=""
        />
        {/* <h2 className="font-600 text-[30px]">CYBER MOIVE</h2> */}
        <div className="flex justify-around items-center basis-[30%] font-500">
          <NavLink to={"/"} className="link">
            {language == "en" ? "Home" : "Trang chủ"}
          </NavLink>
          <NavLink className="link" to={"/About"}>
            {language == "en" ? "About" : "Liên quan"}
          </NavLink>
          <NavLink className="link" to={"/Contact"}>
            {language == "en" ? "Contact" : "Liên hệ"}
          </NavLink>

          <Popover
            content={
              <div className="p-10">
                <h2 className="p-10 font-600 text-22">{LichSuDatVe?.hoTen}</h2>
                <hr />
                <div
                  onClick={() => navigate(PATH.account)}
                  className="p-10 cursor-pointer hover:bg-gray-500 text-16 hover:text-white transition-all duration-300"
                >
                  {language == "en"
                    ? "Personal information"
                    : "Thông tin cá nhân"}
                </div>
                {renderLogin()}
              </div>
            }
            trigger={"click"}
          >
            <Avatar
              className="cursor-pointer !flex !justify-center !items-center"
              size={40}
              icon={<UserOutlined />}
            />
          </Popover>
          <Space wrap>
            <Select
              defaultValue={language}
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "en", label: "ENG" },
                { value: "vi", label: "VI" },
              ]}
            />
          </Space>
        </div>
      </div>
    </HeaderS>
  );
};
const HeaderS = styled.header`
  height: var(--header-heigth);
  position: fixed;
  z-index: 99;
  top: 0;
  width: 100%;
  background: white;
  box-shadow: 0 0 5px rgba(1, 1, 1, 0.4);
  .header-content {
    max-width: var(--max-width);
    margin: auto;
    .link {
      transition: all 0.5s;
      &:hover {
        color: red;
      }
    }
  }
`;
