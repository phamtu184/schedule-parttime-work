import React from "react";
import { Form, Button, TimePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import translate from "../../../asset/i18n/translate";
import locale from "antd/es/date-picker/locale/vi_VN";
const { RangePicker } = TimePicker;

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
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    md: { span: 18, offset: 6 },
    lg: { span: 12, offset: 4 },
  },
};
export default function FormDymanic() {
  return (
    <Form.List name="shift">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? translate("shift") : ""}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      message: translate("require", {
                        title: translate("shift"),
                      }),
                    },
                    () => ({
                      validator(rule, value) {
                        if (!value || value[0].hour() !== value[1].hour()) {
                          return Promise.resolve();
                        }
                        return Promise.reject(translate("timeSimilar"));
                      },
                    }),
                  ]}
                  noStyle
                >
                  <RangePicker format={"HH:mm"} locale={locale} />
                </Form.Item>
                {fields.length > 2 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    style={{ margin: "0 8px" }}
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                ) : null}
              </Form.Item>
            ))}
            {fields.length < 5 ? (
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                >
                  <PlusOutlined /> {translate("addShift")}
                </Button>
              </Form.Item>
            ) : (
              ""
            )}
          </div>
        );
      }}
    </Form.List>
  );
}
