import React, { useState } from "react";
import LoginForm from "./loginForm";
import { useIntl } from "react-intl";
import axios from "axios";
import url from "../../asset/urlConfig";
import notification from "../common/notification";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const intl = useIntl();
  const history = useHistory();
  const onFinish = (value) => {
    const { username, password } = value;
    setLoading(true);
    axios
      .post(`${url.BASE || url.LOCAL}/api/auth`, { username, password })
      .then((res) => {
        if (res.status === 200) {
          notification(
            "success",
            intl.formatMessage({ id: "success" }),
            intl.formatMessage({ id: "loginSuccess" })
          );
          localStorage.authToken = res.data.token;
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 400) {
          notification(
            "error",
            intl.formatMessage({ id: "error" }),
            intl.formatMessage({ id: "loginFail" })
          );
          setLoading(false);
        } else {
          notification(
            "error",
            intl.formatMessage({ id: "error" }),
            intl.formatMessage({ id: "serverError" })
          );
          setLoading(false);
        }
      });
  };
  return <LoginForm onFinish={onFinish} isLoading={isLoading} />;
}
