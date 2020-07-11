import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Layout } from "antd";
import {
  UserAddOutlined,
  CalendarOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import translate from "../../asset/i18n/translate";
import { roleManager } from "../security/checkPrivateRoles";

const DivMenuTitle = styled.div`
  height: 29px;
  margin: 16px;
  h3 {
    text-transform: capitalize;
  }
`;
function MenuSider({ children, location }) {
  const isCollapsed = useSelector((state) => state.setting.isCollapsed);
  const authed = useSelector((state) => state.auth.roles);
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
        <Menu.Item key="/schedule" icon={<CalendarOutlined />}>
          <NavLink to="/schedule" className="text-cap">
            {translate("schedule")}
          </NavLink>
        </Menu.Item>
        {roleManager(authed) ? (
          <Menu.Item key="/setting" icon={<SettingOutlined />}>
            <NavLink to="/setting" className="text-cap">
              {translate("setting")}
            </NavLink>
          </Menu.Item>
        ) : (
          ""
        )}
        {roleManager(authed) ? (
          <Menu.Item key="/users" icon={<UserAddOutlined />}>
            <NavLink to="/users" className="text-cap">
              {translate("users")}
            </NavLink>
          </Menu.Item>
        ) : (
          ""
        )}
        <Menu.Item key="/statistic" icon={<TeamOutlined />}>
          <NavLink to="/statistic" className="text-cap">
            {translate("statistic")}
          </NavLink>
        </Menu.Item>
      </Menu>
      {children}
    </Layout.Sider>
  );
}
export default withRouter(MenuSider);
