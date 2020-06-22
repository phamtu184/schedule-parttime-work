import React from "react";
import { Input, Select } from "antd";
import translate from "../../asset/i18n/translate";
const { Option } = Select;
const formItems = [
  {
    name: "userId",
    label: translate("userId"),
    input: <Input />,
  },
  {
    name: "username",
    label: translate("username"),
    input: <Input />,
  },
  {
    name: "fullname",
    label: translate("fullname"),
    input: <Input />,
  },
  {
    name: "status",
    label: translate("status"),
    input: (
      <Select allowClear style={{ width: "100%" }}>
        <Option value="enable">{translate("enable")}</Option>
        <Option value="disable">{translate("disable")}</Option>
      </Select>
    ),
  },
  {
    name: "roles",
    label: translate("roles"),
    input: (
      <Select mode="multiple" style={{ width: "100%" }}>
        <Option value="admin">{translate("admin")}</Option>
        <Option value="manager">{translate("manager")}</Option>
        <Option value="cook">{translate("cook")}</Option>
        <Option value="receptionist">{translate("receptionist")}</Option>
        <Option value="server">{translate("server")}</Option>
      </Select>
    ),
  },
];
export default formItems;
