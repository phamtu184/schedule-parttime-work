import React from "react";
import translate from "../../asset/i18n/translate";
import { Avatar, Space, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
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
    sorter: (a, b) => {
      if (a.username < b.username) {
        return -1;
      }
      if (a.username > b.username) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
    title: translate("fullname"),
    dataIndex: "fullname",
    key: "fullname",
    sorter: (a, b) => {
      if (a.fullname < b.fullname) {
        return -1;
      }
      if (a.fullname > b.fullname) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
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
    render: (text, record) => (
      <Space size="middle">
        <Link to={`/users/viewuser/${record._id}`}>{translate("view")}</Link>
        {/* <Link>{translate("edit")}</Link> */}
      </Space>
    ),
  },
];
export default columns;
