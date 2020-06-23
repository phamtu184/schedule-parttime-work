import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Form, Spin, Button } from "antd";
import formItems from "./formItems";
import axios from "axios";
import url from "../../../asset/urlConfig";
import Title from "../../common/title";
import translate from "../../../asset/i18n/translate";
import { useIntl } from "react-intl";
import { SaveOutlined } from "@ant-design/icons";
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
export default function EditUser({ props }) {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const [form] = Form.useForm();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url.BASE || url.LOCAL}/api/user`, { params: { id } })
      .then((res) => {
        form.setFieldsValue({ username: res.data.username });
        form.setFieldsValue({ password: res.data.password });
        form.setFieldsValue({ confirmPassword: res.data.password });
        form.setFieldsValue({ fullname: res.data.fullname });
        form.setFieldsValue({ phonenumber: res.data.phonenumber });
        form.setFieldsValue({ roles: res.data.roles });
        setLoading(false);
      })
      .catch((e) => history.push("/users"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const intl = useIntl();
  const onFinish = (value) => {
    const { username, password, fullname, phonenumber, roles } = value;
    setLoading(true);
    axios
      .put(`${url.BASE || url.LOCAL}/api/user`, {
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
  return (
    <>
      <Title className="color-dark">{translate("editUser")}</Title>
      <Spin spinning={isLoading}>
        <Form
          {...formItemLayout}
          name="edit-user"
          onFinish={onFinish}
          scrollToFirstError
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
            <Button
              type="primary"
              htmlType="submit"
              className="text-cap mr-7px"
              icon={<SaveOutlined className="mr-7px" />}
              loading={isLoading}
            >
              {translate("save")}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}
