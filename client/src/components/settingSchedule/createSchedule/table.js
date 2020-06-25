import React from "react";
import { Table, Spin } from "antd";
import columns from "../../common/schedule/columnItem";

export default function TableUserList(props) {
  const { isLoading, dataSource } = props;
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
