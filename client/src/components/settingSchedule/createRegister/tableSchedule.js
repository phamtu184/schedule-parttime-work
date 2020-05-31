import React from "react";
import { Table, Spin } from "antd";
import columns from "./columnItem";

export default function TableUserList(props) {
  const { dataSource, isLoading } = props;
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
