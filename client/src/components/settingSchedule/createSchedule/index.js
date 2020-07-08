import React from "react";
import { Form } from "antd";
import Button from "../../common/button";
import translate from "../../../asset/i18n/translate";
import notification from "../../common/notification";
import { useIntl } from "react-intl";
import scheduleApi from "../../../api/scheduleApi";
import formItems from "./formItems";

const formItemLayout = {
  labelCol: {
    md: { span: 6 },
    lg: { span: 4 },
  },
  wrapperCol: {
    md: { span: 18 },
    lg: { span: 12 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    md: { span: 18, offset: 6 },
    lg: { span: 12, offset: 4 },
  },
};
export default function FormCreateSchedule() {
  const intl = useIntl();
  const [form] = Form.useForm();
  const onFinish = async (value) => {
    const {
      time,
      shift1,
      shift2,
      moneyReceptionist,
      moneyServer,
      moneyCook,
    } = value;
    const body = {
      date: `${time.year()}-${time.week()}`,
      shift1: [shift1[0].hours(), shift1[1].hours()],
      shift2: [shift2[0].hours(), shift2[1].hours()],
      money: { moneyReceptionist, moneyServer, moneyCook },
    };
    try {
      await scheduleApi.createSchedule(body);
      notification(
        "success",
        intl.formatMessage({ id: "success" }),
        intl.formatMessage({ id: "createSchedule" }) +
          " " +
          intl.formatMessage({ id: "success" })
      );
      form.resetFields();
    } catch (e) {
      notification(
        "error",
        intl.formatMessage({ id: "error" }),
        intl.formatMessage({ id: "registerScheduleFail" })
      );
    }
  };
  return (
    <Form
      {...formItemLayout}
      onFinish={onFinish}
      className="text-cap"
      form={form}
    >
      {formItems.map((item) => (
        <Form.Item
          name={item.name}
          label={item.label}
          className="color-dark text-cap"
          key={item.name}
          rules={item.rules}
        >
          {item.input}
        </Form.Item>
      ))}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {translate("create")}
        </Button>
      </Form.Item>
    </Form>
  );
}
