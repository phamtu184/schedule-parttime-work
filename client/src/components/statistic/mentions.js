import React from "react";
import { Mentions, Form, Button } from "antd";
import translate from "../../asset/i18n/translate";
const { Option, getMentions } = Mentions;

export default function (props) {
  const { users, isLoading, onSearch } = props;
  const [form] = Form.useForm();
  const checkMention = async (rule, value, callback) => {
    const mentions = getMentions(value);

    if (mentions.length < 2) {
      throw new Error("More than one must be selected!");
    }
  };
  return (
    <Form form={form}>
      <Form.Item
        label={translate("selectUser")}
        name="selectUser"
        className="text-cap"
        rules={[
          {
            validator: checkMention,
          },
        ]}
      >
        <Mentions></Mentions>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" className="text-cap">
          {translate("statistic")}
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button htmlType="button" className="text-cap">
          {translate("reset")}
        </Button>
      </Form.Item>
    </Form>
  );
}
