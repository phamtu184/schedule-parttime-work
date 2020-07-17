import React, { useEffect } from "react";
import { Cascader, Form } from "antd";
import translate from "../../asset/i18n/translate";
import formatResult from "../common/schedule/formatResult";
import scheduleApi from "../../api/scheduleApi";
import { useIntl } from "react-intl";

export default function SelectSchedule(props) {
  const {
    options,
    fentchOption,
    setLoading,
    setDataSource,
    setShift,
    setMoney,
    setTitle,
  } = props;
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
        setTitle(title);
        setDataSource(formatResult(receptionist, server, cook));
        setShift(shift);
        setMoney(money);
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
