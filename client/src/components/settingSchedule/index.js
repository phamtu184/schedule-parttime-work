import React, { useState } from "react";
import translate from "../../asset/i18n/translate";
import Title from "../common/title";
import ButtonList from "./buttonList";
import DivForm from "../common/roundForm";
import {} from "antd";
import SelectSchedule from "./createSchedule/select";
import { createSchedule } from "../../action/mainSchedule";
import scheduleApi from "../../api/scheduleApi";
import { useSelector } from "react-redux";
import TitleTable from "../common/schedule/title";
import Table from "./table";

export default function SettingSchedule() {
  const [options, setOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const dataSource = useSelector((state) => state.mainSchedule.dataSource);
  const title = useSelector((state) => state.mainSchedule.title);
  const infoTitle = useSelector((state) => state.mainSchedule.infoTitle);
  const fentchOption = async () => {
    try {
      const res = await scheduleApi.getScheduleLazily();
      setOptions(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Title className="color-dark">{translate("settingSchedule")}</Title>
      <ButtonList />
      <DivForm>
        <SelectSchedule
          fentchOption={fentchOption}
          options={options}
          setLoading={setLoading}
          action={createSchedule}
        />
      </DivForm>
      <TitleTable title={title} infoTitle={infoTitle} />
      <Table
        isLoading={isLoading}
        dataSource={dataSource}
        title={title}
        infoTitle={infoTitle}
      />
    </>
  );
}
