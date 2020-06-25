import React, { useEffect } from "react";
import { Cascader, Form } from "antd";
import translate from "../../../asset/i18n/translate";
import axios from "axios";
import url from "../../../asset/urlConfig";
import { useDispatch } from "react-redux";
import { createSchedule } from "../../../action/schedule";
import formatResult from "../../common/schedule/formatResult";

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
        .get(`${url.BASE || url.LOCAL}/api/schedule`, {
          params: { id: value[1] },
        })
        .then((res) => {
          const { receptionist, server, cook, title } = res.data;
          dispatch(
            createSchedule({
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
          style={{ maxWidth: 240 }}
          options={options}
        />
      </Form.Item>
    </Form>
  );
}
