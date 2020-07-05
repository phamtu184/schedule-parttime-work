import React, { useState, useEffect } from "react";
import Title from "../../common/title";
import TitleTable from "../../common/schedule/title";
import Table from "./tableRegister";
import translate from "../../../asset/i18n/translate";
import formatResult from "../../common/schedule/formatResult";
import scheduleApi from "../../../api/scheduleApi";

export default function RegisterSchedule() {
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [title, setTitle] = useState("");
  const [infoTitle, setInfoTitle] = useState({
    shift1: [],
    shift2: [],
    moneyPerHour: 0,
  });
  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      try {
        const res = await scheduleApi.getRegisterSchedule();
        const {
          receptionist,
          server,
          cook,
          title,
          shift1,
          shift2,
          moneyPerHour,
        } = res;
        setDataSource(formatResult(receptionist, server, cook));
        setTitle(title);
        setLoading(false);
        setInfoTitle({ shift1, shift2, moneyPerHour });
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };
    getSchedule();
  }, []);
  return (
    <>
      <Title>{translate("registerSchedule")}</Title>
      <TitleTable title={title} infoTitle={infoTitle} />
      <Table
        title={title}
        isLoading={isLoading}
        dataSource={dataSource}
        setDataSource={setDataSource}
        infoTitle={infoTitle}
      />
    </>
  );
}
