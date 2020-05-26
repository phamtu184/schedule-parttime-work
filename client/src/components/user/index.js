import React, { useState } from "react";
import styled from "styled-components";
import translate from "../../asset/i18n/translate";
import ButtonList from "./buttonList";
import FormSearch from "./formSearch";
import TableUserList from "./tableUserList";
import axios from "axios";
import url from "../../asset/urlConfig";
import { useIntl } from "react-intl";
import notification from "../common/notification";

const Title = styled.h1`
  margin-bottom: 36px;
  font-size: 24px;
  text-transform: capitalize;
`;
export default function User() {
  const [userList, setUserList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const intl = useIntl();
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
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
  const getUserList = () => {
    axios.get(`${url.BASE || url.LOCAL}/api/users`).then((res) => {
      setUserList(res.data);
      setLoading(false);
    });
  };
  const onFinish = (value) => {
    const { fullname, roles, status, userId, username } = value;
    setLoading(true);
    if (
      !fullname &&
      (!roles || roles.length < 1) &&
      !status &&
      !userId &&
      !username
    ) {
      getUserList();
    } else {
      axios
        .post(`${url.BASE || url.LOCAL}/api/users`, {
          fullname,
          roles,
          status,
          userId,
          username,
        })
        .then((res) => {
          setUserList(res.data);
          setLoading(false);
        })
        .catch((e) => console.log(e));
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
          getUserList();
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
        getUserList();
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
        getUserList();
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
        setLoading={setLoading}
        setUserList={setUserList}
      />
      <TableUserList
        rowSelection={rowSelection}
        userList={userList}
        setUserList={setUserList}
        isLoading={isLoading}
        setLoading={setLoading}
      />
    </>
  );
}
