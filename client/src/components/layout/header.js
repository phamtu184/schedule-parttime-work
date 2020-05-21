import React from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Menu, Button, Select } from "antd";
import styled from "styled-components";
import Breadcrumb from "./breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { toggleSider, toggleTheme, changeLanguage } from "../../action/setting";
import translate from "../../asset/i18n/translate";

const { Option } = Select;
const menu = (
  <Menu>
    <Menu.Item>
      <UserOutlined />
      <span className="text-cap">{translate("editProfile")}</span>
    </Menu.Item>
    <Menu.Item>
      <LogoutOutlined />
      <span className="text-cap">{translate("logout")}</span>
    </Menu.Item>
  </Menu>
);
const DivHeader = styled.div`
  .ant-layout-header {
    padding: 0;
    marginbottom: "12px";
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
  }
`;
export default function Header() {
  const isCollapsed = useSelector((state) => state.setting.isCollapsed);
  const isThemeLight = useSelector((state) => state.setting.isThemeLight);
  const dispatch = useDispatch();
  return (
    <>
      <DivHeader>
        <Layout.Header className={isThemeLight ? "bg-white" : "bg-dark"}>
          {React.createElement(
            isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: isThemeLight
                ? "trigger bg-white color-dark color-dark-hover"
                : "trigger bg-dark color-white",
              onClick: () => dispatch(toggleSider()),
            }
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CloudOutlined
              style={{ fontSize: "24px" }}
              className={
                isThemeLight ? "color-dark color-dark-hover" : "color-white"
              }
              onClick={() => dispatch(toggleTheme())}
            />
            <Select
              defaultValue="vi-vi"
              style={{ width: 120, margin: "0 0 0 15px" }}
              onChange={(value) => dispatch(changeLanguage(value))}
              className="text-cap"
            >
              <Option className="text-cap" value="vi-vi">
                {translate("vietnamese")}
              </Option>
              <Option className="text-cap" value="en-us">
                {translate("english")}
              </Option>
            </Select>
            <Dropdown
              overlay={menu}
              placement="bottomCenter"
              trigger={["click"]}
            >
              <Button style={{ margin: "0 15px 0 15px" }}>topRight</Button>
            </Dropdown>
          </div>
        </Layout.Header>
      </DivHeader>
      <Breadcrumb />
    </>
  );
}
