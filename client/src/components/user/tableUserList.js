import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import columns from "./columnsItem";

export default function TableUserList(props) {
  const {
    rowSelection,
    fetchData,
    userList,
    isLoading,
    setLoading,
    pagination,
    isSearch,
    searchData,
    searchValue,
    statisticData,
    isStatistic,
    statisticValue
  } = props;
  const handleTableChange = (page) => {
    const { fullname, roles, status, username } = searchValue;
    if(isStatistic){
      statisticData(statisticValue, page.current, page.pageSize)
    } else{
      if (isSearch) {
        searchData(
          fullname,
          roles,
          status,
          username,
          page.current,
          page.pageSize
        );
      } else {
        fetchData(page.current, page.pageSize);
      }
    }
    
  };
  useEffect(() => {
    setLoading(true);
    fetchData(pagination.current, pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Spin spinning={isLoading}>
      <Table
        className="text-cap"
        columns={columns}
        dataSource={userList}
        rowSelection={rowSelection}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
      ></Table>
    </Spin>
  );
}
