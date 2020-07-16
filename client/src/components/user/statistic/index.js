import React, { useState } from "react";
import translate from "../../../asset/i18n/translate";
import { Form, Button, DatePicker } from "antd";
import { ScheduleOutlined } from "@ant-design/icons";
import statisticApi from "../../../api/statisticApi";
import { useHistory } from "react-router-dom";
import locale from "antd/es/date-picker/locale/vi_VN";
const { RangePicker } = DatePicker;
export default function FormStatistic(props) {
  const { selectedRowKeys } = props;
  const [form] = Form.useForm();
  const hasSelected = selectedRowKeys.length > 0;
  const history = useHistory();
  const onFinish = async (value) => {
    const week1 = {
      week: value.time[0].week(),
      year: value.time[0].year(),
      weeksInYear: value.time[0].weeksInYear(),
    };
    const week2 = {
      week: value.time[1].week(),
      year: value.time[1].year(),
      weeksInYear: value.time[1].weeksInYear(),
    };
    await statisticApi.postStatistic(
      { week1, week2 },
      { params: selectedRowKeys }
    );
    history.push("/users/statistic");
  };
  return (
    <>
      <Form form={form} name="edit-user" onFinish={onFinish}>
        <Form.Item
          name="time"
          label={translate("time")}
          key="time"
          rules={[
            {
              required: true,
              message: translate("require", { title: translate("time") }),
            },
          ]}
        >
          <RangePicker picker="week" locale={locale} />
        </Form.Item>
        <Form.Item>
          <Button
            type="ghost"
            icon={<ScheduleOutlined />}
            disabled={!hasSelected}
            htmlType="submit"
          >
            {translate("statistic")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
