import React from "react";
import styled from "styled-components";
import translate from "../../../asset/i18n/translate";
import { Form, Button } from "antd";
import formItems from "./formItems";
import { SaveOutlined, UndoOutlined } from "@ant-design/icons";

const Title = styled.h1`
  margin-bottom: 36px;
  font-size: 24px;
  text-transform: capitalize;
`;
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
export default function NewUser() {
  const [form] = Form.useForm();
  const onFinish = (value) => {
    console.log(value);
  };
  return (
    <>
      <Title className="color-dark">{translate("newUser")}</Title>
      <Form
        {...formItemLayout}
        name="add-user"
        form={form}
        onFinish={onFinish}
        scrollToFirstError
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
          <Button
            type="primary"
            htmlType="submit"
            className="text-cap mr-7px"
            icon={<SaveOutlined className="mr-7px" />}
          >
            {translate("save")}
          </Button>
          <Button
            className="text-cap"
            icon={<UndoOutlined className="mr-7px" />}
          >
            {translate("reset")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
