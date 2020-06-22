import React from "react";
import { Select, Form } from "antd";
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
        >
          <Select style={{ width: 80 }}>
            <Option value="am">AM</Option>
            <Option value="pm">PM</Option>
            <Option value="all">ALL</Option>
          </Select>
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
export default EditableCell;
