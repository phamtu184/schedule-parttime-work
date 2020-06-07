import React from "react";
import { Typography } from "antd";
import translate from "../../../asset/i18n/translate";
const { Title } = Typography;
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (row.isTitle) {
    obj.props.colSpan = 0;
  }
  return obj;
};
const columns = [
  {
    title: translate("fullname"),
    dataIndex: "fullname",
    key: "fullname",
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (row.isTitle) {
        obj.children = <Title level={4}>{value}</Title>;
        obj.props.colSpan = 8;
      }
      return obj;
    },
  },
  {
    title: translate("monday"),
    dataIndex: "monday",
    key: "monday",
    render: renderContent,
  },
  {
    title: translate("tuesday"),
    dataIndex: "tuesday",
    key: "tuesday",
    render: renderContent,
  },
  {
    title: translate("wednesday"),
    dataIndex: "wednesday",
    key: "wednesday",
    render: renderContent,
  },
  {
    title: translate("thursday"),
    dataIndex: "thursday",
    key: "thursday",
    render: renderContent,
  },
  {
    title: translate("friday"),
    dataIndex: "friday",
    key: "friday",
    render: renderContent,
  },
  {
    title: translate("saturday"),
    dataIndex: "saturday",
    key: "saturday",
    render: renderContent,
  },
  {
    title: translate("sunday"),
    dataIndex: "sunday",
    key: "sunday",
    render: renderContent,
  },
  {
    title: translate("action"),
    dataIndex: "action",
    key: "action",
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <a
            href="javascript:;"
            onClick={() => save(record.key)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </a>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a href="javascript:;">Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <a disabled={editingKey !== ""} onClick={() => edit(record)}>
          Edit
        </a>
      );
    },
  },
];
export default columns;
