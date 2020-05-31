import React from "react";
import { Cascader, Form } from "antd";
import translate from "../../../asset/i18n/translate";

export default function SelectSchedule(props) {
  const { onChangeCascader } = props;
  return (
    <Form>
      <Form.Item
        label={translate("selectSchedule")}
        name="selectSchedule"
        className="text-cap"
      >
        <Cascader
          onChange={onChangeCascader}
          changeOnSelect
          style={{ width: 240 }}
        />
      </Form.Item>
    </Form>
  );
}
