import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import axios from "axios";
import columns from "./columnsItem";
import url from "../../asset/urlConfig";

export default function TableUserList(props) {
  const { rowSelection, setUserList, userList, isLoading, setLoading } = props;
  // const [pagination, setPagination] = useState({
  //   current: 1,
  //   pageSize: 5,
  // });
  // const fetchData = () =>{
  //   axios.get(`${url.BASE || url.LOCAL}/api/users`, { params: pagination }).then((res) => {
  //     console.log(res.data)
  //     // setUserList(res.data.userList);
  //     // setPagination(res.data.pagination)
  //     setLoading(false);
  //   });
  // }
  useEffect(() => {
    setLoading(true);
    axios.get(`${url.BASE || url.LOCAL}/api/users`).then((res) => {
      setUserList(res.data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Spin spinning={isLoading}>
      <Table
        className="text-cap"
        columns={columns}
        dataSource={userList}
        rowSelection={rowSelection}
        scroll={{ x: true, y: 500 }}
      ></Table>
    </Spin>
  );
}
