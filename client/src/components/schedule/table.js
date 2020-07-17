import React from "react";
import { Table, Spin, Typography } from "antd";
import translate from "../../asset/i18n/translate";
import { useSelector } from "react-redux";
const { Title, Text } = Typography;

export default function TableSchedule(props) {
  const { isLoading, dataSource } = props;
  const fullname = useSelector((state) => state.auth.fullname);
  const renderContent = (value, row, index) => {
    const obj = {
      children: value
        ? value === "off"
          ? translate("off")
          : translate("shiftCus", { num: value.slice(-1) })
        : value,
      props: {},
    };
    if (row.isTitle) {
      obj.props.colSpan = 0;
    }
    // if (row.fullname === fullname) {
    //   obj.children = <Text mark>{value}</Text>;
    // }
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
        if (row.fullname === fullname) {
          obj.children = <Text mark>{value}</Text>;
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
  ];
  return (
    <Spin spinning={isLoading}>
      <Table
        className="text-cap"
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 800 }}
        pagination={false}
        bordered
      ></Table>
    </Spin>
  );
}
