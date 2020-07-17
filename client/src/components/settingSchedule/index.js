import React, { useState } from "react";
import translate from "../../asset/i18n/translate";
import { Link } from "react-router-dom";
import Title from "../common/title";
import DivForm from "../common/roundForm";
import { Button, Popconfirm } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import SelectSchedule from "./select";
import { createSchedule, deleteSchedule } from "../../action/schedule";
import scheduleApi from "../../api/scheduleApi";
import { useSelector, useDispatch } from "react-redux";
import TitleTable from "../common/schedule/title";
import Table from "./table";
import notification from "../common/notification";
import { useIntl } from "react-intl";

export default function SettingSchedule() {
  const [options, setOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const intl = useIntl();
  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.schedule.dataSource);
  const title = useSelector((state) => state.schedule.title);
  const money = useSelector((state) => state.schedule.money);
  const shift = useSelector((state) => state.schedule.shift);

  const fentchOption = async () => {
    try {
      const res = await scheduleApi.getScheduleLazily();
      setOptions(res);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteTable = async () => {
    try {
      await scheduleApi.deleteSchedule({ title });
      dispatch(deleteSchedule());
      fentchOption();
      notification(
        "success",
        intl.formatMessage({ id: "success" }),
        intl.formatMessage({ id: "deleteSchedule" }) +
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
      <Link to="/setting/newschedule">
        <Button type="primary" icon={<FileAddOutlined />}>
          {translate("createSchedule")}
        </Button>
      </Link>
      <DivForm>
        <SelectSchedule
          fentchOption={fentchOption}
          options={options}
          setLoading={setLoading}
          action={createSchedule}
        />
        <Popconfirm
          title={translate("confirmDelete")}
          onConfirm={deleteTable}
          okText={translate("yes")}
          cancelText={translate("no")}
          disabled={!dataSource.length > 0}
        >
          <Button
            danger
            type="primary"
            className="text-cap"
            disabled={!dataSource.length > 0}
          >
            {translate("remove")}
          </Button>
        </Popconfirm>
      </DivForm>
      <TitleTable title={title} money={money} shift={shift} />
      <Table
        isLoading={isLoading}
        dataSource={dataSource}
        title={title}
        money={money}
        shift={shift}
      />
    </>
  );
}
