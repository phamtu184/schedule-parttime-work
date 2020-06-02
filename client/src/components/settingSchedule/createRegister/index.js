import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import Title from "../../common/title";
import TitleTable from "./title";
import DivForm from "../../common/roundForm";
import CreateSchedule from "./createRegister";
import SelectSchedule from "./selectRegister";
import Table from "./tableRegister";
import translate from "../../../asset/i18n/translate";
import axios from "axios";
import url from "../../../asset/urlConfig";
import notification from "../../common/notification";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { createRegister } from "../../../action/register";
import formatResult from "./formatResult";

export default function SettingSchedule(props) {
  const [date, setDate] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const intl = useIntl();
  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.register.dataSource);
  const title = useSelector((state) => state.register.title);
  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };
  const onFinish = () => {
    fentchRegister();
  };
  const fentchRegister = () => {
    setLoading(true);
    axios
      .post(`${url.BASE || url.LOCAL}/api/registerschedule`, { date })
      .then((res) => {
        const { receptionist, server, cook, title } = res.data;
        dispatch(
          createRegister({
            data: formatResult(receptionist, server, cook),
            title,
          })
        );
        fentchOption();
        notification(
          "success",
          intl.formatMessage({ id: "success" }),
          intl.formatMessage({ id: "createRegister" }) +
            " " +
            intl.formatMessage({ id: "success" })
        );
        setLoading(false);
      })
      .catch((e) => {
        notification(
          "error",
          intl.formatMessage({ id: "error" }),
          intl.formatMessage({ id: "registerScheduleFail" })
        );
        setLoading(false);
      });
  };
  const fentchOption = () => {
    axios
      .get(`${url.BASE || url.LOCAL}/api/registerlazily`)
      .then((res) => {
        setOptions(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Title className="color-dark">{translate("createRegister")}</Title>
      <DivForm>
        <Row>
          <Col xs={24} lg={12}>
            <CreateSchedule onChangeDate={onChangeDate} onFinish={onFinish} />
          </Col>
          <Col xs={24} lg={12}>
            <SelectSchedule
              fentchOption={fentchOption}
              options={options}
              setLoading={setLoading}
            />
          </Col>
        </Row>
        <Button
          type="primary"
          className="text-cap mr-7px"
          disabled={!dataSource.length > 0}
        >
          {translate("upload")}
        </Button>
        <Button
          danger
          type="primary"
          className="text-cap"
          disabled={!dataSource.length > 0}
        >
          {translate("remove")}
        </Button>
      </DivForm>
      <TitleTable title={title} />
      <Table isLoading={isLoading} dataSource={dataSource} />
    </>
  );
}
