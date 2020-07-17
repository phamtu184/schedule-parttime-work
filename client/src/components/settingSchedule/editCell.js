import React from "react";
import { Select, Form } from "antd";
import translate from "../../asset/i18n/translate";
import { useSelector } from "react-redux";
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
  const shift = useSelector((state) => state.schedule.shift);
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
            {shift.map((item) => (
              <Option key={item.name} className="text-cap" value={item.name}>
                {translate("shiftCus", { num: item.name.slice(-1) })}
              </Option>
            ))}
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
