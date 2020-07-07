import React from "react";
import { Select, Form } from "antd";
import translate from "../../asset/i18n/translate";
const { Option } = Select;
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: translate("require", { title: translate("shift") }),
            },
          ]}
        >
          <Select style={{ width: 80 }}>
            <Option className="text-cap" value="shift1">
              {translate("shift1")}
            </Option>
            <Option className="text-cap" value="shift2">
              {translate("shift2")}
            </Option>
            <Option className="text-cap" value="all">
              {translate("allDay")}
            </Option>
            <Option className="text-cap" value="off">
              {translate("off")}
            </Option>
          </Select>
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
export default EditableCell;
