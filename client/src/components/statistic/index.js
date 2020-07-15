import React, { useState } from "react";
import Title from "../common/title";
import DivForm from "../common/roundForm";
import Mentions from "./mentions";
import translate from "../../asset/i18n/translate";
import statisticApi from "../../api/statisticApi";
import debounce from "lodash/debounce";

export default function Statistic() {
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const onSearch = (search) => {
    setSearch(search);
    setLoading(!!search);
    console.log("Search:", search);
    debounce(loadUsers(search), 1000);
  };
  const loadUsers = (key) => {
    if (!key) {
      setUsers([]);
      return;
    }
    const rs = statisticApi.getUsers(key);
    setUsers(rs);
    setLoading(false);
    if (search !== key) return;
  };
  return (
    <>
      <Title className="color-dark">{translate("statistic")}</Title>
      <DivForm>
        <Mentions users={users} isLoading={isLoading} onSearch={onSearch} />
      </DivForm>
    </>
  );
}
