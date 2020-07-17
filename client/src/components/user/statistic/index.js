import React from "react";
import translate from "../../../asset/i18n/translate";
import { Form, Button, DatePicker, Divider } from "antd";
import { ScheduleOutlined } from "@ant-design/icons";
import statisticApi from "../../../api/statisticApi";
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
  const { selectedRowKeys, setUserList } = props;
  const [form] = Form.useForm();
  const hasSelected = selectedRowKeys.length > 0;
  const onFinish = async (value) => {
    const week1 = {
      week: value.time[0].week(),
      year: value.time[0].year(),
      weeksInYear: value.time[0].weeksInYear(),
    };
    const week2 = {
      week: value.time[1].week(),
      year: value.time[1].year(),
      weeksInYear: value.time[1].weeksInYear(),
    };
    const rs = await statisticApi.postStatistic({
      week1,
      week2,
      usersId: selectedRowKeys,
    });
    setUserList(rs);
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
