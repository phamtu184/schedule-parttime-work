import React from "react";
import styled from "styled-components";
import { Form, Row, Col, Button } from "antd";
import formItems from "./formSearchItem";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import translate from "../../asset/i18n/translate";
import axios from "axios";
import url from "../../asset/urlConfig";

const DivForm = styled.div`
  margin-bottom: 16px;
  padding: 24px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(233, 233, 233);
  border-image: initial;
  border-radius: 5px;
  margin-top: 16px;
`;
const formItemLayout = {
  labelCol: {
    md: { span: 6 },
  },
  wrapperCol: {
    md: { span: 18 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    md: { span: 18, offset: 3 },
  },
};
export default function FormSearch(props) {
  const { onFinish, setLoading, setUserList } = props;
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    axios.get(`${url.BASE || url.LOCAL}/api/users`).then((res) => {
      setUserList(res.data);
      setLoading(false);
    });
  };
  return (
    <DivForm>
      <Form
        {...formItemLayout}
        name="searchUser"
        onFinish={onFinish}
        form={form}
      >
        <Row>
          {formItems.map((item) => (
            <Col md={24} lg={12} key={item.name}>
              <Form.Item
                name={item.name}
                label={item.label}
                className="color-dark text-cap"
              >
                {item.input}
              </Form.Item>
            </Col>
          ))}
        </Row>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="text-cap mr-7px"
            icon={<SearchOutlined className="mr-7px" />}
          >
            {translate("search")}
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
    </DivForm>
  );
}
