import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileAddOutlined,
  FileOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import MenuItem from "antd/es/menu/MenuItem";
import { PATH } from "constant";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<NavLink to={PATH.dashboard}>USER</NavLink>, "1", <UserOutlined />),
  getItem("FILMS", "2", <DesktopOutlined />, [
    getItem(
      <NavLink to={PATH.film}>FILM</NavLink>,
      "2",
      <UnorderedListOutlined />
    ),
    getItem(
      <NavLink to={PATH.addFilm}>ADD FILM</NavLink>,
      "4",
      <FileAddOutlined />
    ),
  ]),
  getItem(
    <NavLink to={PATH.showtimes}>SHOWTIMES</NavLink>,
    "3",
    <FileOutlined />
  ),
  // getItem("User", "sub1", <UserOutlined />, [
  //   getItem("Tom", "3"),
  //   getItem("Bill", "4"),
  //   getItem("Alex", "5"),
  // ]),
  // getItem("ShowTimes", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
];

const AdminTemplate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin/dashboard");
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical">
          {" "}
          <img
            src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt=""
            className="my-10"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        ></Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
