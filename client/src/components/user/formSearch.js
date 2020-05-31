import React from "react";
import { Form, Row, Col, Button } from "antd";
import formItems from "./formSearchItem";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import DivForm from "../common/roundForm";
import translate from "../../asset/i18n/translate";

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
  const { onFinish, fetchData, pagination, setIsSearch } = props;
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    fetchData(1, pagination.pageSize);
    setIsSearch(false);
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
            <Col xs={24} lg={12} key={item.name}>
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
