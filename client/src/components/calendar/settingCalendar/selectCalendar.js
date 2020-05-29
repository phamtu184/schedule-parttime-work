import React from "react";
import { Cascader, Form } from "antd";
import translate from "../../../asset/i18n/translate";

export default function SelectCalendar(props) {
  const { onChangeCascader } = props;
  return (
    <Form.Item
      label={translate("selectCalendar")}
      name="selectCalendar"
      className="text-cap"
    >
      <Cascader
        onChange={onChangeCascader}
        changeOnSelect
        style={{ width: 240 }}
      />
    </Form.Item>
  );
}
