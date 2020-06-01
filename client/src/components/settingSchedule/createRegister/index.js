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

export default function SettingSchedule(props) {
  const [date, setDate] = useState("");
  const [isLoading, setLoading] = useState(false);
  const intl = useIntl();
  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.register.dataSource);
  const title = useSelector((state) => state.register.title);
  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };
  const onFinish = () => {
    setLoading(true);
    axios
      .post(`${url.BASE || url.LOCAL}/api/registerschedule`, { date })
      .then((res) => {
        const { receptionist, server, cook, title } = res.data;
        const rs = [
          { key: "counter", fullname: translate("counter"), isTitle: true },
          ...receptionist,
          { key: "dinning", fullname: translate("dinning"), isTitle: true },
          ...server,
          { key: "kitchen", fullname: translate("kitchen"), isTitle: true },
          ...cook,
        ];
        dispatch(createRegister({ data: rs, title }));
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
  return (
    <>
      <Title className="color-dark">{translate("createRegister")}</Title>
      <DivForm>
        <Row>
          <Col xs={24} lg={12}>
            <CreateSchedule onChangeDate={onChangeDate} onFinish={onFinish} />
          </Col>
          <Col xs={24} lg={12}>
            <SelectSchedule />
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
