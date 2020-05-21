import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Layout } from "antd";
import {
  HomeOutlined,
  UserAddOutlined,
  SettingOutlined,
  CalendarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import translate from "../../asset/i18n/translate";

const DivMenuTitle = styled.div`
  height: 29px;
  margin: 16px;
`;
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
      <DivMenuTitle
        className={isThemeLight ? "bg-white color-dark" : "bg-dark color-white"}
      >
        {isCollapsed ? (
          ""
        ) : (
          <h3
            className={
              isThemeLight
                ? "bg-white color-dark text-cap"
                : "bg-dark color-white text-cap"
            }
          >
            {translate("management")}
          </h3>
        )}
      </DivMenuTitle>
      <Menu
        mode="inline"
        theme={isThemeLight ? "light" : "dark"}
        defaultSelectedKeys={["/"]}
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <NavLink to="/" className="text-cap">
            {translate("home")}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/calendar" icon={<CalendarOutlined />}>
          <NavLink to="/calendar" className="text-cap">
            {translate("calendar")}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/users" icon={<UserAddOutlined />}>
          <NavLink to="/users" className="text-cap">
            {translate("users")}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/customer" icon={<TeamOutlined />}>
          <NavLink to="/customer" className="text-cap">
            {translate("customer")}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/setting" icon={<SettingOutlined />}>
          <NavLink to="/setting" className="text-cap">
            {translate("setting")}
          </NavLink>
        </Menu.Item>
      </Menu>
      {children}
    </Layout.Sider>
  );
}
export default withRouter(MenuSider);
