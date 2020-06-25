import React, { useState, useEffect } from "react";
import Title from "../common/title";
import TitleTable from "./title";
import Table from "./tableRegister";
import translate from "../../asset/i18n/translate";
import axios from "axios";
import url from "../../asset/urlConfig";
import formatResult from "../common/schedule/formatResult";

export default function RegisterSchedule() {
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url.BASE || url.LOCAL}/api/scheduleuser`)
      .then((res) => {
        const { receptionist, server, cook, title } = res.data;
        setDataSource(formatResult(receptionist, server, cook));
        setTitle(title);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Title>{translate("registerSchedule")}</Title>
      <TitleTable title={title} />
      <Table
        isLoading={isLoading}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />
    </>
  );
}
