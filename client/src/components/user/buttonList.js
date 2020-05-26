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
import { Link } from "react-router-dom";

const ButtonEdit = styled(Button)`
  margin-right: 8px;
  margin-bottom: 8px;
  text-transform: capitalize;
  span {
    margin-right: 8px;
  }
`;
export default function ButtonList({ selectedRowKeys }) {
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div style={{ marginBottom: "5px" }}>
      <Link to="/users/newuser">
        <ButtonEdit type="primary" icon={<UserAddOutlined />}>
          {translate("new")}
        </ButtonEdit>
      </Link>
      <ButtonEdit
        type="primary"
        icon={<UserDeleteOutlined />}
        disabled={!hasSelected}
      >
        {translate("remove")}
      </ButtonEdit>
      <ButtonEdit
        type="primary"
        icon={<CheckOutlined />}
        disabled={!hasSelected}
      >
        {translate("enable")}
      </ButtonEdit>
      <ButtonEdit
        type="primary"
        icon={<StopOutlined />}
        disabled={!hasSelected}
      >
        {translate("disable")}
      </ButtonEdit>
    </div>
  );
}
