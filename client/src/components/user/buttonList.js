import React from "react";
import { Popconfirm } from "antd";
import Button from "../common/button";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  CheckOutlined,
  StopOutlined,
} from "@ant-design/icons";
import translate from "../../asset/i18n/translate";
import { Link } from "react-router-dom";

export default function ButtonList(props) {
  const { selectedRowKeys, deleteUsers, enableUsers, disableUsers } = props;
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div style={{ marginBottom: "5px" }}>
      <Link to="/users/newuser">
        <Button type="primary" icon={<UserAddOutlined />}>
          {translate("new")}
        </Button>
      </Link>
      <Popconfirm
        title={translate("confirmDelete")}
        onConfirm={deleteUsers}
        okText={translate("yes")}
        cancelText={translate("no")}
        disabled={!hasSelected}
      >
        <Button
          type="primary"
          icon={<UserDeleteOutlined />}
          disabled={!hasSelected}
        >
          {translate("remove")}
        </Button>
      </Popconfirm>
      <Button
        type="primary"
        icon={<CheckOutlined />}
        disabled={!hasSelected}
        onClick={enableUsers}
      >
        {translate("enable")}
      </Button>
      <Button
        type="primary"
        icon={<StopOutlined />}
        disabled={!hasSelected}
        onClick={disableUsers}
      >
        {translate("disable")}
      </Button>
    </div>
  );
}
