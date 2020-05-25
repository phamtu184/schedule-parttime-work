import React, { useEffect } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Menu, Button, Select } from "antd";
import styled from "styled-components";
import Breadcrumb from "./breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { toggleSider, changeLanguage } from "../../action/setting";
import { logout, login } from "../../action/auth";
import translate from "../../asset/i18n/translate";
import { useHistory } from "react-router-dom";
import axios from "axios";
import url from "../../asset/urlConfig";

const { Option } = Select;
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
  const fullname = useSelector((state) => state.auth.fullname);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.authToken;
    if (token) {
      axios
        .get(`${url.BASE || url.LOCAL}/api/auth`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          dispatch(
            login({ fullname: res.data.fullname, roles: res.data.roles })
          );
        })
        .catch((e) => {
          history.push("/login");
          localStorage.removeItem("authToken");
        });
    } else {
      history.push("/login");
    }
  }, []);
  const logOut = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    history.push("/login");
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <UserOutlined />
        <span className="text-cap">{translate("editProfile")}</span>
      </Menu.Item>
      <Menu.Item onClick={logOut}>
        <LogoutOutlined />
        <span className="text-cap">{translate("logout")}</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <DivHeader>
        <Layout.Header className="bg-white">
          {React.createElement(
            isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger bg-white color-dark color-dark-hover",
              onClick: () => dispatch(toggleSider()),
            }
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
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
              <Button style={{ margin: "0 15px 0 15px" }}>
                {fullname ? fullname : "user"}
              </Button>
            </Dropdown>
          </div>
        </Layout.Header>
      </DivHeader>
      <Breadcrumb />
    </>
  );
}
