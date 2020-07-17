import React, { useEffect } from "react";
import { Cascader, Form } from "antd";
import translate from "../../asset/i18n/translate";
import { useDispatch } from "react-redux";
import formatResult from "../common/schedule/formatResult";
import scheduleApi from "../../api/scheduleApi";
import { useIntl } from "react-intl";

export default function SelectSchedule(props) {
  const { options, fentchOption, setLoading, action } = props;
  const dispatch = useDispatch();
  const intl = useIntl();
  useEffect(() => {
    fentchOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChangeCascader = async (value) => {
    if (value.length > 1) {
      setLoading(true);
      try {
        const rs = await scheduleApi.getSchedule({ id: value[1] });
        const { receptionist, server, cook, title, money, shift } = rs;
        dispatch(
          action({
            data: formatResult(receptionist, server, cook),
            title,
            money,
            shift,
          })
        );
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
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
          placeholder={intl.formatMessage({ id: "plsSelect" })}
        />
      </Form.Item>
    </Form>
  );
}
