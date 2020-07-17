import React, { useState } from "react";
import { Table, Spin, Form, Typography, Button } from "antd";
import translate from "../../asset/i18n/translate";
import { useDispatch } from "react-redux";
import EditableCell from "./editCell";
import scheduleApi from "../../api/scheduleApi";
import { useIntl } from "react-intl";
import notification from "../common/notification";
import { setSchedule } from "../../action/schedule";

const { Title } = Typography;
const renderContent = (value, row, index) => {
  const obj = {
    children: value
      ? value === "off"
        ? translate("off")
        : translate("shiftCus", { num: value.slice(-1) })
      : value,
    props: {},
  };
  if (row.isTitle) {
    obj.props.colSpan = 0;
  }
  return obj;
};
export default function TableRegister(props) {
  const { isLoading, dataSource, title, money, shift } = props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const intl = useIntl();
  const dispatch = useDispatch();
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      fullname: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        dispatch(setSchedule({ data: newData }));
        setEditingKey("");
        await scheduleApi.userRegisterSchedule({
          title,
          item: newData[index],
          money,
          shift,
        });
        notification(
          "success",
          intl.formatMessage({ id: "success" }),
          intl.formatMessage({ id: "registerSchedule" }) +
            " " +
            intl.formatMessage({ id: "success" })
        );
      } else {
        newData.push(row);
        dispatch(setSchedule({ data: newData }));
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: translate("fullname"),
      dataIndex: "fullname",
      key: "fullname",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (row.isTitle) {
          obj.children = <Title level={4}>{value}</Title>;
          obj.props.colSpan = 8;
        }
        return obj;
      },
    },
    {
      title: translate("monday"),
      dataIndex: "monday",
      key: "monday",
      editable: true,
      render: renderContent,
    },
    {
      title: translate("tuesday"),
      dataIndex: "tuesday",
      key: "tuesday",
      editable: true,
      render: renderContent,
    },
    {
      title: translate("wednesday"),
      dataIndex: "wednesday",
      key: "wednesday",
      editable: true,
      render: renderContent,
    },
    {
      title: translate("thursday"),
      dataIndex: "thursday",
      key: "thursday",
      editable: true,
      render: renderContent,
    },
    {
      title: translate("friday"),
      dataIndex: "friday",
      key: "friday",
      editable: true,
      render: renderContent,
    },
    {
      title: translate("saturday"),
      dataIndex: "saturday",
      key: "saturday",
      editable: true,
      render: renderContent,
    },
    {
      title: translate("sunday"),
      dataIndex: "sunday",
      key: "sunday",
      editable: true,
      render: renderContent,
    },
    {
      title: translate("action"),
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return !record.isTitle ? (
          editable ? (
            <span>
              <Button
                className="text-cap"
                type="primary"
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                {translate("save")}
              </Button>
              <Button className="text-cap" onClick={cancel}>
                {translate("cancel")}
              </Button>
            </span>
          ) : (
            <Button
              className="text-cap"
              type="primary"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              {translate("edit")}
            </Button>
          )
        ) : (
          ""
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Spin spinning={isLoading}>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          className="text-cap"
          columns={mergedColumns}
          dataSource={dataSource}
          scroll={{ x: 800 }}
          pagination={false}
          bordered
        />
      </Form>
    </Spin>
  );
}
