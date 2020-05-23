import React from "react";
import { Input, Select } from "antd";
import translate from "../../../asset/i18n/translate";
const { Option } = Select;
const formItems = [
  {
    name: "idUser",
    label: translate("idUser"),
    input: <Input />,
    rules: [
      {
        required: true,
        message: translate("require", { title: translate("idUser") }),
      },
      {
        whitespace: true,
        message: translate("whitespace", { title: translate("idUser") }),
      },
      {
        max: 15,
        message: translate("max", {
          title: translate("idUser"),
          characters: "15",
        }),
      },
    ],
  },
  {
    name: "username",
    label: translate("username"),
    input: <Input />,
    rules: [
      {
        required: true,
        message: translate("require", { title: translate("username") }),
      },
      {
        whitespace: true,
        message: translate("whitespace", { title: translate("username") }),
      },
      {
        max: 50,
        message: translate("max", {
          title: translate("username"),
          characters: "50",
        }),
      },
      {
        min: 3,
        message: translate("min", {
          title: translate("username"),
          characters: "3",
        }),
      },
    ],
  },
  {
    name: "password",
    label: translate("password"),
    input: <Input.Password />,
    rules: [
      {
        required: true,
        message: translate("require", { title: translate("password") }),
      },
      {
        whitespace: true,
        message: translate("whitespace", { title: translate("password") }),
      },
      {
        max: 50,
        message: translate("max", {
          title: translate("password"),
          characters: "50",
        }),
      },
      {
        min: 3,
        message: translate("min", {
          title: translate("password"),
          characters: "3",
        }),
      },
    ],
  },
  {
    name: "confirmPassword",
    label: translate("confirmPassword"),
    input: <Input.Password />,
    rules: [
      {
        required: true,
        message: translate("require", { title: translate("confirmPassword") }),
      },
      {
        whitespace: true,
        message: translate("whitespace", {
          title: translate("confirmPassword"),
        }),
      },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(translate("matchPassword"));
        },
      }),
    ],
  },
  {
    name: "fullname",
    label: translate("fullname"),
    input: <Input />,
    rules: [
      {
        required: true,
        message: translate("require", { title: translate("fullname") }),
      },
      {
        whitespace: true,
        message: translate("whitespace", { title: translate("fullname") }),
      },
      {
        max: 60,
        message: translate("max", {
          title: translate("fullname"),
          characters: "60",
        }),
      },
      {
        min: 3,
        message: translate("min", {
          title: translate("fullname"),
          characters: "3",
        }),
      },
    ],
  },
  {
    name: "phoneNumber",
    label: translate("phoneNumber"),
    input: <Input />,
    rules: [
      {
        required: true,
        message: translate("require", { title: translate("phoneNumber") }),
      },
      {
        whitespace: true,
        message: translate("whitespace", { title: translate("phoneNumber") }),
      },
      {
        len: 10,
        message: translate("len", {
          title: translate("phoneNumber"),
          characters: "10",
        }),
      },
    ],
  },
  {
    name: "roles",
    label: translate("roles"),
    input: (
      <Select mode="tags" style={{ width: "100%" }}>
        <Option value="managament">{translate("manager")}</Option>
        <Option value="leader">{translate("storeManager")}</Option>
        <Option value="cook">{translate("cook")}</Option>
        <Option value="receptionist">{translate("receptionist")}</Option>
        <Option value="server">{translate("server")}</Option>
      </Select>
    ),
    rules: [
      {
        required: true,
        message: translate("require", { title: translate("roles") }),
      },
    ],
  },
];
export default formItems;
