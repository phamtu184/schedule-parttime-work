import React from "react";
import { Form } from "antd";
import Button from "../../common/button";
import translate from "../../../asset/i18n/translate";
import notification from "../../common/notification";
import { useIntl } from "react-intl";
import scheduleApi from "../../../api/scheduleApi";
import formItems from "./formItems";
import FormDymanic from "./formDymanic";

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
    const { time, shift, moneyReceptionist, moneyServer, moneyCook } = value;
    const rsShift = shift.map((item, index) => {
      return {
        name: "shift" + (index + 1),
        start: item[0].hours(),
        end: item[1].hours(),
      };
    });
    if (!shift) {
      notification(
        "error",
        intl.formatMessage({ id: "error" }),
        intl.formatMessage({ id: "plsAddShift" })
      );
    } else {
      const body = {
        date: `${time.year()}-${time.week()}`,
        shift: rsShift,
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
      <FormDymanic />
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {translate("create")}
        </Button>
      </Form.Item>
    </Form>
  );
}
