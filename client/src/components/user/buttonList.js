import React from "react";
import { Button, Popconfirm } from "antd";
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
export default function ButtonList(props) {
  const { selectedRowKeys, deleteUsers, enableUsers, disableUsers } = props;
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div style={{ marginBottom: "5px" }}>
      <Link to="/users/newuser">
        <ButtonEdit type="primary" icon={<UserAddOutlined />}>
          {translate("new")}
        </ButtonEdit>
      </Link>
      <Popconfirm
        title={translate("confirmDelete")}
        onConfirm={deleteUsers}
        okText={translate("yes")}
        cancelText={translate("no")}
        disabled={!hasSelected}
      >
        <ButtonEdit
          type="primary"
          icon={<UserDeleteOutlined />}
          disabled={!hasSelected}
        >
          {translate("remove")}
        </ButtonEdit>
      </Popconfirm>
      <ButtonEdit
        type="primary"
        icon={<CheckOutlined />}
        disabled={!hasSelected}
        onClick={enableUsers}
      >
        {translate("enable")}
      </ButtonEdit>
      <ButtonEdit
        type="primary"
        icon={<StopOutlined />}
        disabled={!hasSelected}
        onClick={disableUsers}
      >
        {translate("disable")}
      </ButtonEdit>
    </div>
  );
}
