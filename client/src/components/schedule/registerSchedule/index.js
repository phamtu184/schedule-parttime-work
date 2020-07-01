import React, { useState, useEffect } from "react";
import Title from "../../common/title";
import TitleTable from "../../common/schedule/title";
import Table from "./tableRegister";
import translate from "../../../asset/i18n/translate";
import axios from "axios";
import url from "../../../asset/urlConfig";
import formatResult from "../../common/schedule/formatResult";

export default function RegisterSchedule() {
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [title, setTitle] = useState("");
  const [infoTitle, setInfoTitle] = useState({
    shift1: [],
    shift2: [],
    money: 0,
  });
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url.BASE || url.LOCAL}/api/registerschedule`)
      .then((res) => {
        const {
          receptionist,
          server,
          cook,
          title,
          shift1,
          shift2,
          moneyPerHour,
        } = res.data;
        setDataSource(formatResult(receptionist, server, cook));
        setTitle(title);
        setLoading(false);
        setInfoTitle({ shift1, shift2, money: moneyPerHour });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Title>{translate("registerSchedule")}</Title>
      <TitleTable
        title={title}
        shift1={infoTitle.shift1}
        shift2={infoTitle.shift2}
        moneyPerHour={infoTitle.money}
      />
      <Table
        isLoading={isLoading}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />
    </>
  );
}
