import React, { useState } from "react";
import { Row, Col } from "antd";
import Title from "../../common/title";
import DivForm from "../../common/roundForm";
import CreateCalendar from "./createCalendar";
import SelectCalendar from "./selectCalendar";
import translate from "../../../asset/i18n/translate";

export default function SettingCalendar(props) {
  const [date, setDate] = useState("");
  const [option, setOption] = useState({});
  const onChangeDate = (date, dateString) => {
    setDate(dateString);
  };
  const onChangeCascader = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const onFinish = () => {
    console.log(date);
  };
  return (
    <>
      <Title className="color-dark">{translate("setting")}</Title>
      <DivForm>
        <Row>
          <Col xs={24} lg={12}>
            <CreateCalendar onChangeDate={onChangeDate} onFinish={onFinish} />
          </Col>
          <Col xs={24} lg={12}>
            <SelectCalendar
              option={option}
              onChangeCascader={onChangeCascader}
            />
          </Col>
        </Row>
      </DivForm>
    </>
  );
}
