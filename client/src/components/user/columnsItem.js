import React from "react";
import translate from "../../asset/i18n/translate";
import { Avatar, Space, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
const columns = [
  {
    title: translate("avatar"),
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar) => (
      <Avatar
        src={avatar ? avatar : ""}
        icon={avatar ? "" : <UserOutlined />}
      />
    ),
  },
  {
    title: translate("username"),
    dataIndex: "username",
    key: "username",
  },
  {
    title: translate("fullname"),
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: translate("roles"),
    dataIndex: "roles",
    key: "roles",
    render: (tags) => (
      <>
        {tags.map((tag) => (
          <Tag key={tag}>{translate(tag)}</Tag>
        ))}
      </>
    ),
  },
  {
    title: translate("status"),
    dataIndex: "status",
    key: "status",
    render: (tag) => (
      <Tag color={!tag ? "green" : "volcano"}>
        {!tag ? translate("enable") : translate("disable")}
      </Tag>
    ),
  },
  {
    title: translate("action"),
    dataIndex: "action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>{translate("view")}</a>
        <a>{translate("edit")}</a>
      </Space>
    ),
  },
];
export default columns;
