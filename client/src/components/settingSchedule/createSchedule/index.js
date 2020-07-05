import React, { useState } from "react";
import { Row, Col, Button, Popconfirm } from "antd";
import Title from "../../common/title";
import TitleTable from "../../common/schedule/title";
import DivForm from "../../common/roundForm";
import CreateSchedule from "./create";
import SelectSchedule from "./select";
import Table from "./table";
import translate from "../../../asset/i18n/translate";
import notification from "../../common/notification";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { createSchedule, deleteSchedule } from "../../../action/schedule";
import formatResult from "../../common/schedule/formatResult";
import scheduleApi from "../../../api/scheduleApi";

export default function SettingSchedule(props) {
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const intl = useIntl();
  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.schedule.dataSource);
  const title = useSelector((state) => state.schedule.title);
  const infoTitle = useSelector((state) => state.schedule.infoTitle);
  const onFinish = async (value) => {
    const { time, shift1, shift2, moneyPerHour } = value;
    const body = {
      date: `${time.year()}-${time.week()}`,
      shift1: [shift1[0].hours(), shift1[1].hours()],
      shift2: [shift2[0].hours(), shift2[1].hours()],
      money: moneyPerHour,
    };
    setLoading(true);
    try {
      const res = await scheduleApi.createSchedule(body);
      const { receptionist, server, cook, title, infoTitle } = res;
      dispatch(
        createSchedule({
          data: formatResult(receptionist, server, cook),
          title,
          infoTitle,
        })
      );
      fentchOption();
      notification(
        "success",
        intl.formatMessage({ id: "success" }),
        intl.formatMessage({ id: "createSchedule" }) +
          " " +
          intl.formatMessage({ id: "success" })
      );
      setLoading(false);
    } catch (e) {
      notification(
        "error",
        intl.formatMessage({ id: "error" }),
        intl.formatMessage({ id: "registerScheduleFail" })
      );
      setLoading(false);
    }
  };
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
  const pushToHome = async () => {
    try {
      await scheduleApi.putRegisterSchedule({ title });
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
      <Title className="color-dark">{translate("createSchedule")}</Title>
      <DivForm>
        <Row>
          <Col xs={24} lg={12}>
            <CreateSchedule onFinish={onFinish} />
          </Col>
          <Col xs={24} lg={12}>
            <SelectSchedule
              fentchOption={fentchOption}
              options={options}
              setLoading={setLoading}
              action={createSchedule}
            />
          </Col>
        </Row>
        <Button
          type="primary"
          className="text-cap mr-7px"
          disabled={!dataSource.length > 0}
          onClick={pushToHome}
        >
          {translate("uploadToRegister")}
        </Button>
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
      <TitleTable title={title} infoTitle={infoTitle} />
      <Table isLoading={isLoading} dataSource={dataSource} />
    </>
  );
}
