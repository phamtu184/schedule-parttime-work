import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Layout } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

function MenuSider({ children, location }) {
  const isCollapsed = useSelector((state) => state.setting.isCollapsed);
  const isThemeLight = useSelector((state) => state.setting.isThemeLight);
  return (
    <Layout.Sider
      theme={isThemeLight ? "light" : "dark"}
      trigger={null}
      collapsible
      collapsed={isCollapsed}
    >
      <Menu
        mode="inline"
        theme={isThemeLight ? "light" : "dark"}
        defaultSelectedKeys={["/"]}
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/" icon={<PieChartOutlined />}>
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        <Menu.Item key="/users" icon={<DesktopOutlined />}>
          <NavLink to="/users">users</NavLink>
        </Menu.Item>
        <Menu.Item key="/setting" icon={<ContainerOutlined />}>
          <NavLink to="/setting">setting</NavLink>
        </Menu.Item>
      </Menu>
      {children}
    </Layout.Sider>
  );
}
export default withRouter(MenuSider);
