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
import statisticApi from "../../api/statisticApi";

export default function User() {
  const [userList, setUserList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(pageSize);
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState({});
  const [isStatistic, setIsStatistic] = useState(false);
  const [statisticValue, setStatisticValue] = useState({});
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
    setIsStatistic(false);
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
    setSelectedRowKeys([]);
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
  const statisticData = async (value, current, pageSize) => {
    setIsSearch(false);
    const week1 = {
      week: value.time[0].week(),
      year: value.time[0].year(),
      weeksInYear: value.time[0].weeksInYear(),
    };
    const week2 = {
      week: value.time[1].week(),
      year: value.time[1].year(),
      weeksInYear: value.time[1].weeksInYear(),
    };
    setStatisticValue(value);
    setLoading(true);
    try {
      const rsData = await statisticApi.postStatistic(
        {
          week1,
          week2,
          usersId: selectedRowKeys,
        },
        { current, pageSize }
      );
      setPagination({ ...pagination, total: selectedRowKeys.length, current });
      setLoading(false);
      setUserList(rsData);
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
        setIsStatistic={setIsStatistic}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <FormStatistic
        selectedRowKeys={selectedRowKeys}
        statisticData={statisticData}
        pageSize={pagination.pageSize}
        setIsStatistic={setIsStatistic}
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
        statisticData={statisticData}
        isStatistic={isStatistic}
        statisticValue={statisticValue}
      />
    </>
  );
}
