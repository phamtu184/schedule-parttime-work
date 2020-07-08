import React, { useState, useEffect } from "react";
import translate from "../../asset/i18n/translate";
import Title from "../common/title";
import TitleTable from "../common/schedule/title";
import Table from "./table";
import scheduleApi from "../../api/scheduleApi";
import formatResult from "../common/schedule/formatResult";

export default function Schedule() {
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [title, setTitle] = useState("");
  const [infoTitle, setInfoTitle] = useState({
    shift1: [],
    shift2: [],
    moneyReceptionist: 0,
    moneyServer: 0,
    moneyCook: 0,
  });
  useEffect(() => {
    const getSchedule = async () => {
      setLoading(true);
      try {
        const res = await scheduleApi.getMainSchedule();
        const {
          receptionist,
          server,
          cook,
          title,
          shift1,
          shift2,
          moneyReceptionist,
          moneyServer,
          moneyCook,
        } = res;
        setDataSource(formatResult(receptionist, server, cook));
        setTitle(title);
        setLoading(false);
        setInfoTitle({
          shift1,
          shift2,
          moneyReceptionist,
          moneyServer,
          moneyCook,
        });
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    getSchedule();
  }, []);
  return (
    <>
      <Title className="color-dark">{translate("schedule")}</Title>
      <TitleTable title={title} infoTitle={infoTitle} />
      <Table isLoading={isLoading} dataSource={dataSource} />
    </>
  );
}
