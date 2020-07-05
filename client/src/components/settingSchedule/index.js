import React, { useState } from "react";
import translate from "../../asset/i18n/translate";
import Title from "../common/title";
import ButtonList from "./buttonList";
import DivForm from "../common/roundForm";
import { Button } from "antd";
import SelectSchedule from "./createSchedule/select";
import { createSchedule } from "../../action/mainSchedule";
import scheduleApi from "../../api/scheduleApi";
import { useSelector } from "react-redux";
import TitleTable from "../common/schedule/title";
import Table from "./table";
import notification from "../common/notification";
import { useIntl } from "react-intl";

export default function SettingSchedule() {
  const [options, setOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const intl = useIntl();
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
  const pushToHome = async () => {
    try {
      await scheduleApi.putToMainSchedule({ title });
      notification(
        "success",
        intl.formatMessage({ id: "success" }),
        intl.formatMessage({ id: "uploadSchedule" }) +
          " " +
          intl.formatMessage({ id: "success" })
      );
    } catch (e) {
      console.log(e);
      notification(
        "error",
        intl.formatMessage({ id: "error" }),
        intl.formatMessage({ id: "serverError" })
      );
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
        <Button
          type="primary"
          className="text-cap mr-7px"
          disabled={!dataSource.length > 0}
          onClick={pushToHome}
        >
          {translate("uploadToMain")}
        </Button>
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
