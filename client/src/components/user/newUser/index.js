import React, { useState } from "react";
import Title from "../../common/title";
import translate from "../../../asset/i18n/translate";
import { Form, Button } from "antd";
import { useIntl } from "react-intl";
import formItems from "./formItems";
import { SaveOutlined, UndoOutlined } from "@ant-design/icons";
import axios from "axios";
import url from "../../../asset/urlConfig";
import notification from "../../common/notification";

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
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const intl = useIntl();
  const onFinish = (value) => {
    const { username, password, fullname, phonenumber, roles } = value;
    setLoading(true);
    axios
      .post(`${url.BASE || url.LOCAL}/api/user`, {
        username,
        password,
        fullname,
        phonenumber,
        roles,
      })
      .then((res) => {
        if (res.status === 200) {
          notification(
            "success",
            intl.formatMessage({ id: "success" }),
            intl.formatMessage({ id: "addUserSuccess" })
          );
          setLoading(false);
          form.resetFields();
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          notification(
            "error",
            intl.formatMessage({ id: "error" }),
            intl.formatMessage({ id: "userExist" })
          );
          setLoading(false);
        } else {
          notification(
            "error",
            intl.formatMessage({ id: "error" }),
            intl.formatMessage({ id: "serverError" })
          );
          setLoading(false);
        }
      });
  };
  const onReset = () => {
    form.resetFields();
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
            loading={isLoading}
          >
            {translate("save")}
          </Button>
          <Button
            className="text-cap"
            icon={<UndoOutlined className="mr-7px" />}
            onClick={onReset}
          >
            {translate("reset")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
