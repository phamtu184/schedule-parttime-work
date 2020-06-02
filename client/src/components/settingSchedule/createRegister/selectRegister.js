import React, { useEffect } from "react";
import { Cascader, Form } from "antd";
import translate from "../../../asset/i18n/translate";
import axios from "axios";
import url from "../../../asset/urlConfig";
import { useDispatch } from "react-redux";
import { createRegister } from "../../../action/register";
import formatResult from "./formatResult";

export default function SelectSchedule(props) {
  const { options, fentchOption, setLoading } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    fentchOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChangeCascader = (value) => {
    if (value.length > 1) {
      setLoading(true);
      axios
        .get(`${url.BASE || url.LOCAL}/api/registerschedule`, {
          params: { id: value[1] },
        })
        .then((res) => {
          const { receptionist, server, cook, title } = res.data;
          dispatch(
            createRegister({
              data: formatResult(receptionist, server, cook),
              title,
            })
          );
          setLoading(false);
        })
        .catch((e) => console.log(e));
    }
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
