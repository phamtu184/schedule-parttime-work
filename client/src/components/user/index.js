import React, { useState } from "react";
import Title from "../common/title";
import translate from "../../asset/i18n/translate";
import ButtonList from "./buttonList";
import FormSearch from "./formSearch";
import TableUserList from "./tableUserList";
import axios from "axios";
import url from "../../asset/urlConfig";
import { useIntl } from "react-intl";
import notification from "../common/notification";

export default function User() {
  const [userList, setUserList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
    total: 0,
    position: ["bottomCenter"],
  });
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState({});
  const intl = useIntl();
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const fetchData = (current, pageSize) => {
    setLoading(true);
    axios
      .get(`${url.BASE || url.LOCAL}/api/users`, {
        params: { current, pageSize },
      })
      .then((res) => {
        setUserList(res.data.users);
        setPagination({ ...pagination, total: res.data.total, current });
        setLoading(false);
      });
  };
  const searchData = (
    fullname,
    roles,
    status,
    userId,
    username,
    current,
    pageSize
  ) => {
    setLoading(true);
    axios
      .post(
        `${url.BASE || url.LOCAL}/api/users`,
        { fullname, roles, status, userId, username },
        { params: { current, pageSize } }
      )
      .then((res) => {
        setUserList(res.data.users);
        setPagination({ ...pagination, total: res.data.total, current });
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: record.roles.indexOf("manager") > -1,
      // Column configuration not to be checked
      name: record.username,
    }),
  };
  const onFinish = (value) => {
    const { fullname, roles, status, userId, username } = value;
    setSearchValue(value);
    if (
      !fullname &&
      (!roles || roles.length < 1) &&
      !status &&
      !userId &&
      !username
    ) {
      fetchData(pagination.current, pagination.pageSize);
      setIsSearch(false);
    } else {
      searchData(
        fullname,
        roles,
        status,
        userId,
        username,
        pagination.current,
        pagination.pageSize
      );
      setIsSearch(true);
    }
  };
  const deleteUsers = () => {
    setLoading(true);
    axios
      .delete(`${url.BASE || url.LOCAL}/api/users`, { params: selectedRowKeys })
      .then((res) => {
        if (res.status === 200) {
          notification(
            "success",
            intl.formatMessage({ id: "success" }),
            intl.formatMessage({ id: "deleteUserSuccess" })
          );
          fetchData(pagination.current, pagination.pageSize);
          setSelectedRowKeys([]);
        }
      })
      .catch((e) => {
        notification(
          "error",
          intl.formatMessage({ id: "error" }),
          intl.formatMessage({ id: "serverError" })
        );
        setLoading(false);
      });
  };
  const enableUsers = () => {
    setLoading(true);
    axios
      .put(`${url.BASE || url.LOCAL}/api/users`, {
        enableAction: true,
        selectedRowKeys,
      })
      .then((res) => {
        notification(
          "success",
          intl.formatMessage({ id: "success" }),
          intl.formatMessage({ id: "enableUserSuccess" })
        );
        fetchData(pagination.current, pagination.pageSize);
        setSelectedRowKeys([]);
      })
      .catch((e) => {
        notification(
          "error",
          intl.formatMessage({ id: "error" }),
          intl.formatMessage({ id: "serverError" })
        );
        setLoading(false);
      });
  };
  const disableUsers = () => {
    setLoading(true);
    axios
      .put(`${url.BASE || url.LOCAL}/api/users`, {
        enableAction: false,
        selectedRowKeys,
      })
      .then((res) => {
        notification(
          "success",
          intl.formatMessage({ id: "success" }),
          intl.formatMessage({ id: "disableUserSuccess" })
        );
        fetchData(pagination.current, pagination.pageSize);
        setSelectedRowKeys([]);
      })
      .catch((e) => {
        notification(
          "error",
          intl.formatMessage({ id: "error" }),
          intl.formatMessage({ id: "serverError" })
        );
        setLoading(false);
      });
  };
  return (
    <>
      <Title className="color-dark">{translate("users")}</Title>
      <ButtonList
        selectedRowKeys={selectedRowKeys}
        deleteUsers={deleteUsers}
        enableUsers={enableUsers}
        disableUsers={disableUsers}
      />
      <FormSearch
        onFinish={onFinish}
        fetchData={fetchData}
        pagination={pagination}
        setIsSearch={setIsSearch}
      />
      <TableUserList
        rowSelection={rowSelection}
        userList={userList}
        isLoading={isLoading}
        setLoading={setLoading}
        pagination={pagination}
        fetchData={fetchData}
        searchData={searchData}
        isSearch={isSearch}
        searchValue={searchValue}
      />
    </>
  );
}
