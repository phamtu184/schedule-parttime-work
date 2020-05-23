import React from "react";
import { Button } from "antd";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  CheckOutlined,
  StopOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import translate from "../../asset/i18n/translate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ButtonEdit = styled(Button)`
  margin-right: 8px;
  margin-bottom: 8px;
  text-transform: capitalize;
  span {
    margin-right: 8px;
  }
`;
export default function ButtonList() {
  const isThemeLight = useSelector((state) => state.setting.isThemeLight);
  return (
    <>
      <div style={{ marginBottom: "5px" }}>
        <Link to="/users/newuser">
          <ButtonEdit type="primary" icon={<UserAddOutlined />}>
            {translate("new")}
          </ButtonEdit>
        </Link>
        <ButtonEdit type="primary" icon={<UserDeleteOutlined />}>
          {translate("remove")}
        </ButtonEdit>
        <ButtonEdit type="primary" icon={<CheckOutlined />}>
          {translate("enable")}
        </ButtonEdit>
        <ButtonEdit type="primary" icon={<StopOutlined />}>
          {translate("disable")}
        </ButtonEdit>
      </div>
      <div className="text-cap">
        <span
          className={isThemeLight ? "color-dark" : "color-white"}
          style={{ marginRight: "15px" }}
        >
          {translate("viewBy")}
        </span>
        <Button
          className={
            isThemeLight
              ? "text-cap"
              : "text-cap color-white bg-dark bg-dark-hover"
          }
        >
          {translate("users")}
        </Button>
        <Button
          className={
            isThemeLight
              ? "text-cap"
              : "text-cap color-white bg-dark bg-dark-hover"
          }
        >
          {translate("roles")}
        </Button>
      </div>
    </>
  );
}
