import React from "react";
import { InputNumber, DatePicker, TimePicker } from "antd";
import translate from "../../../asset/i18n/translate";
import locale from "antd/es/date-picker/locale/vi_VN";
import checkWeek from "./checkWeek";

const { RangePicker } = TimePicker;
const formItems = [
  {
    name: "time",
    label: translate("time"),
    input: <DatePicker picker="week" locale={locale} />,
    rules: [
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
    ],
  },
  {
    name: "shift1",
    label: translate("shift1"),
    input: <RangePicker format={"HH:mm"} locale={locale} />,
    rules: [
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
    ],
  },
  {
    name: "shift2",
    label: translate("shift2"),
    input: <RangePicker format={"HH:mm"} locale={locale} />,
    rules: [
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
    ],
  },
  {
    name: "moneyReceptionist",
    label: translate("moneyReceptionist"),
    input: (
      <InputNumber
        step={3000}
        min={1000}
        max={100000}
        formatter={(value) => `${value}đ`}
        parser={(value) => value.replace("đ", "")}
      />
    ),
    rules: [
      {
        required: true,
        message: translate("require", {
          title: translate("moneyReceptionist"),
        }),
      },
    ],
  },
  {
    name: "moneyServer",
    label: translate("moneyServer"),
    input: (
      <InputNumber
        step={3000}
        min={1000}
        max={100000}
        formatter={(value) => `${value}đ`}
        parser={(value) => value.replace("đ", "")}
      />
    ),
    rules: [
      {
        required: true,
        message: translate("require", { title: translate("moneyServer") }),
      },
    ],
  },
  {
    name: "moneyCook",
    label: translate("moneyCook"),
    input: (
      <InputNumber
        step={3000}
        min={1000}
        max={100000}
        formatter={(value) => `${value}đ`}
        parser={(value) => value.replace("đ", "")}
      />
    ),
    rules: [
      {
        required: true,
        message: translate("require", { title: translate("moneyCook") }),
      },
    ],
  },
];

export default formItems;
