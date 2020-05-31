import React, { useState } from "react";
import { Row, Col } from "antd";
import Title from "../../common/title";
import DivForm from "../../common/roundForm";
import CreateSchedule from "./createSchedule";
import SelectSchedule from "./selectSchedule";
import Table from "./tableSchedule";
import translate from "../../../asset/i18n/translate";
import axios from "axios";
import url from "../../../asset/urlConfig";
import notification from "../../common/notification";
import { useIntl } from "react-intl";

export default function SettingSchedule(props) {
  const [date, setDate] = useState("");
  const [option, setOption] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const intl = useIntl();
  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };
  const onChangeCascader = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const onFinish = () => {
    setLoading(true);
    axios
      .post(`${url.BASE || url.LOCAL}/api/registerschedule`, { date })
      .then((res) => {
        const { receptionist, server, cook } = res.data;
        const rs = [
          { key: "counter", fullname: translate("counter"), isTitle: true },
          ...receptionist,
          { key: "dinning", fullname: translate("dinning"), isTitle: true },
          ...server,
          { key: "kitchen", fullname: translate("kitchen"), isTitle: true },
          ...cook,
        ];
        setDataSource(rs);
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
            <SelectSchedule
              option={option}
              onChangeCascader={onChangeCascader}
            />
          </Col>
        </Row>
      </DivForm>
      <Table dataSource={dataSource} isLoading={isLoading} />
    </>
  );
}
