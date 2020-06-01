import React, { useEffect, useState } from "react";
import { Cascader, Form } from "antd";
import translate from "../../../asset/i18n/translate";
import axios from "axios";
import url from "../../../asset/urlConfig";

export default function SelectSchedule(props) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios
      .get(`${url.BASE || url.LOCAL}/api/registerlazily`)
      .then((res) => {
        setOptions(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  const onChangeCascader = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
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
          options={options}
        />
      </Form.Item>
    </Form>
  );
}
