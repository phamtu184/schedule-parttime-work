import React, { useState } from "react";
import Title from "../common/title";
import translate from "../../asset/i18n/translate";
import ButtonList from "./buttonList";
import FormSearch from "./formSearch";
import FormStatistic from "./statistic";
import TableUserList from "./tableUserList";
import { pageSize } from "../../asset/config";
import { useIntl } from "react-intl";
import notification from "../common/notification";
import { roleAdmin, roleManager } from "../security/checkPrivateRoles";
import { useSelector } from "react-redux";
import userApi from "../../api/userApi";

export default function User() {
  const [userList, setUserList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(pageSize);
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState({});
  const intl = useIntl();
  const authed = useSelector((state) => state.auth.roles);
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const fetchData = async (current, pageSize) => {
    setLoading(true);
    try {
      const params = { current, pageSize };
      const res = await userApi.getUsers(params);
      setUserList(res.users);
      setPagination({ ...pagination, total: res.total, current });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const searchData = async (
    fullname,
    roles,
    status,
    username,
    current,
    pageSize
  ) => {
    setLoading(true);
    try {
      const params = { current, pageSize };
      const body = { fullname, roles, status, username };
      const res = await userApi.searchUsers(body, params);
      setUserList(res.users);
      setPagination({ ...pagination, total: res.total, current });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: roleAdmin(authed)
        ? roleAdmin(record.roles)
        : roleManager(record.roles),
      // Column configuration not to be checked
      name: record.username,
    }),
  };
  const onFinish = (value) => {
    const { fullname, roles, status, username } = value;
    setSearchValue(value);
    if (!fullname && (!roles || roles.length < 1) && !status && !username) {
      fetchData(pagination.current, pagination.pageSize);
      setIsSearch(false);
    } else {
      searchData(fullname, roles, status, username, 1, pagination.pageSize);
      setIsSearch(true);
    }
  };
  const deleteUsers = async () => {
    setLoading(true);
    try {
      const params = { selectedRowKeys };
      await userApi.deleteUsers(params);
      notification(
        "success",
        intl.formatMessage({ id: "success" }),
        intl.formatMessage({ id: "deleteUserSuccess" })
      );
      fetchData(1, pagination.pageSize);
      setSelectedRowKeys([]);
      setLoading(false);
    } catch (e) {
      console.log(e);
      notification(
        "error",
        intl.formatMessage({ id: "error" }),
        intl.formatMessage({ id: "serverError" })
      );
      setLoading(false);
    }
  };
  const enableUsers = async () => {
    setLoading(true);
    try {
      const body = { enableAction: true, selectedRowKeys };
      await userApi.enableUsers(body);
      notification(
        "success",
        intl.formatMessage({ id: "success" }),
        intl.formatMessage({ id: "enableUserSuccess" })
      );
      fetchData(pagination.current, pagination.pageSize);
      setSelectedRowKeys([]);
      setLoading(false);
    } catch (e) {
      console.log(e);
      notification(
        "error",
        intl.formatMessage({ id: "error" }),
        intl.formatMessage({ id: "serverError" })
      );
      setLoading(false);
    }
  };
  const disableUsers = async () => {
    setLoading(true);
    try {
      const body = { selectedRowKeys };
      await userApi.enableUsers(body);
      notification(
        "success",
        intl.formatMessage({ id: "success" }),
        intl.formatMessage({ id: "disableUserSuccess" })
      );
      fetchData(pagination.current, pagination.pageSize);
      setSelectedRowKeys([]);
      setLoading(false);
    } catch (e) {
      console.log(e);
      notification(
        "error",
        intl.formatMessage({ id: "error" }),
        intl.formatMessage({ id: "serverError" })
      );
      setLoading(false);
    }
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
      <FormStatistic
        selectedRowKeys={selectedRowKeys}
        setUserList={setUserList}
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
