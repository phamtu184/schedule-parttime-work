import React from "react";
import translate from "../../../asset/i18n/translate";
import { Form, Button, DatePicker, Divider } from "antd";
import { ScheduleOutlined } from "@ant-design/icons";
import locale from "antd/es/date-picker/locale/vi_VN";

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    md: { span: 9 },
  },
  wrapperCol: {
    md: { span: 18 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    md: { span: 18, offset: 8 },
  },
};
export default function FormStatistic(props) {
  const { selectedRowKeys, statisticData, pageSize, setIsStatistic } = props;
  const [form] = Form.useForm();
  const hasSelected = selectedRowKeys.length > 0;
  const onFinish = async (value) => {
    setIsStatistic(true);
    statisticData(value, 1, pageSize);
  };
  return (
    <>
      <Divider className="text-cap" orientation="left">
        {translate("statistic")}
      </Divider>
      <Form
        form={form}
        {...formItemLayout}
        name="edit-user"
        onFinish={onFinish}
        layout="inline"
      >
        <Form.Item
          name="time"
          label={translate("time")}
          key="time"
          rules={[
            {
              required: true,
              message: translate("require", { title: translate("time") }),
            },
          ]}
        >
          <RangePicker picker="week" locale={locale} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="ghost"
            icon={<ScheduleOutlined />}
            disabled={!hasSelected}
            htmlType="submit"
          >
            {translate("statistic")}
          </Button>
        </Form.Item>
      </Form>
      <Divider />
    </>
  );
}
