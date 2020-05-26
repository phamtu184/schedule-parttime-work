import React, { useState } from "react";
import styled from "styled-components";
import translate from "../../asset/i18n/translate";
import ButtonList from "./buttonList";
import FormSearch from "./formSearch";
import TableUserList from "./tableUserList";
import axios from "axios";
import url from "../../asset/urlConfig";

const Title = styled.h1`
  margin-bottom: 36px;
  font-size: 24px;
  text-transform: capitalize;
`;
export default function User() {
  const [userList, setUserList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onFinish = (value) => {
    const { fullname, roles, status, userId, username } = value;
    setLoading(true);
    if (!fullname && !roles && !status && !userId && !username) {
      axios.get(`${url.BASE || url.LOCAL}/api/users`).then((res) => {
        setUserList(res.data);
        setLoading(false);
      });
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
  return (
    <>
      <Title className="color-dark">{translate("users")}</Title>
      <ButtonList selectedRowKeys={selectedRowKeys} />
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
