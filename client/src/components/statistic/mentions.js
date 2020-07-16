import React from "react";
import { Mentions, Form, Button } from "antd";
import translate from "../../asset/i18n/translate";
import { useIntl } from "react-intl";
const { Option, getMentions } = Mentions;

export default function (props) {
  const { users, isLoading, onSearch } = props;
  const [form] = Form.useForm();
  const intl = useIntl();
  const checkMention = async (rule, value, callback) => {
    const mentions = getMentions(value);

    if (mentions.length < 2) {
      throw new Error(intl.formatMessage({ id: "requireSelect" }));
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
        <Mentions onSearch={onSearch} loading={isLoading}></Mentions>
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
