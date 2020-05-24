import React from "react";
import { Button, Radio } from "antd";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  CheckOutlined,
  StopOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import translate from "../../asset/i18n/translate";
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
  const onChangeRadio = (e) => {
    console.log(`radio checked:${e.target.value}`);
  };
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
        <span className="color-dark" style={{ marginRight: "15px" }}>
          {translate("viewBy")}
        </span>
        <Radio.Group onChange={onChangeRadio} defaultValue="users">
          <Radio.Button className="text-cap" value="users">
            {translate("users")}
          </Radio.Button>
          <Radio.Button className="text-cap" value="roles">
            {translate("roles")}
          </Radio.Button>
        </Radio.Group>
      </div>
    </>
  );
}
