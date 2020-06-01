import React from "react";
import { DatePicker, Form } from "antd";
import Button from "../../common/button";
import translate from "../../../asset/i18n/translate";
import locale from "antd/es/date-picker/locale/vi_VN";

export default function FormCreateRegister(props) {
  const { onFinish, onChangeDate } = props;
  return (
    <Form onFinish={onFinish} className="text-cap" layout="inline">
      <Form.Item
        label={translate("createRegister")}
        name="createRegister"
        rules={[
          {
            required: true,
            message: translate("require", { title: translate("time") }),
          },
        ]}
      >
        <DatePicker onChange={onChangeDate} picker="week" locale={locale} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {translate("create")}
        </Button>
      </Form.Item>
    </Form>
  );
}
