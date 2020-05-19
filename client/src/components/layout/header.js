import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleSider, toggleTheme } from "../../action/setting";

export default function Header() {
  const isCollapsed = useSelector((state) => state.setting.isCollapsed);
  const isThemeLight = useSelector((state) => state.setting.isThemeLight);
  const dispatch = useDispatch();
  return (
    <Layout.Header
      className={isThemeLight ? "bg-white color-dark" : "bg-dark color-white"}
      style={{ padding: 0, marginBottom: "12px" }}
    >
      {React.createElement(
        isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: () => dispatch(toggleSider()),
        }
      )}

      <button onClick={() => dispatch(toggleTheme())}>change theme</button>
    </Layout.Header>
  );
}
