import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Layout } from "antd";
import {
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
  h3 {
    text-transform: capitalize;
  }
`;
function MenuSider({ children, location }) {
  const isCollapsed = useSelector((state) => state.setting.isCollapsed);
  return (
    <Layout.Sider
      theme="light"
      trigger={null}
      collapsible
      collapsed={isCollapsed}
    >
      <DivMenuTitle>
        {isCollapsed ? "" : <h3>{translate("management")}</h3>}
      </DivMenuTitle>
      <Menu
        mode="inline"
        defaultSelectedKeys={["/"]}
        selectedKeys={["/" + location.pathname.split("/")[1]]}
      >
        {/* <Menu.Item key="/" icon={<HomeOutlined />}>
          <NavLink to="/" className="text-cap">
            {translate("home")}
          </NavLink>
        </Menu.Item> */}
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
