import React from "react";
import { DatePicker, Form, TimePicker, InputNumber } from "antd";
import Button from "../common/button";
import translate from "../../asset/i18n/translate";
import locale from "antd/es/date-picker/locale/vi_VN";
import checkWeek from "./createSchedule/checkWeek";

const { RangePicker } = TimePicker;

export default function FormCreateSchedule(props) {
  const { onFinish } = props;
  return (
    <Form onFinish={onFinish} className="text-cap">
      <Form.Item
        label={translate("time")}
        name="time"
        rules={[
          {
            required: true,
            message: translate("require", { title: translate("time") }),
          },
          () => ({
            validator(rule, value) {
              if (!value || checkWeek(`${value.year()}-${value.week()}`)) {
                return Promise.resolve();
              }
              return Promise.reject(translate("scheduleFuture"));
            },
          }),
        ]}
      >
        <DatePicker picker="week" locale={locale} />
      </Form.Item>
      <Form.Item
        label={translate("shift1")}
        name="shift1"
        rules={[
          {
            required: true,
            message: translate("require", { title: translate("shift1") }),
          },
          () => ({
            validator(rule, value) {
              if (!value || value[0].hour() !== value[1].hour()) {
                return Promise.resolve();
              }
              return Promise.reject(translate("timeSimilar"));
            },
          }),
        ]}
      >
        <RangePicker format={"HH:mm"} locale={locale} />
      </Form.Item>
      <Form.Item
        label={translate("shift2")}
        name="shift2"
        rules={[
          {
            required: true,
            message: translate("require", { title: translate("shift2") }),
          },
          () => ({
            validator(rule, value) {
              if (!value || value[0].hour() !== value[1].hour()) {
                return Promise.resolve();
              }
              return Promise.reject(translate("timeSimilar"));
            },
          }),
        ]}
      >
        <RangePicker format={"HH:mm"} locale={locale} />
      </Form.Item>
      <Form.Item
        label={translate("moneyPerHour")}
        name="moneyPerHour"
        rules={[
          {
            required: true,
            message: translate("require", { title: translate("moneyPerHour") }),
          },
        ]}
      >
        <InputNumber
          step={3000}
          min={1000}
          max={100000}
          formatter={(value) => `${value}đ`}
          parser={(value) => value.replace("đ", "")}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {translate("create")}
        </Button>
      </Form.Item>
    </Form>
  );
}
