import React, { useState, useEffect } from "react";
import LoginForm from "./loginForm";
import { useIntl } from "react-intl";
import axios from "axios";
import url from "../../asset/urlConfig";
import notification from "../common/notification";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../action/auth";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.authToken;
    if (token) {
      axios
        .get(`${url.BASE || url.LOCAL}/api/auth`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          dispatch(
            login({ fullname: res.data.fullname, roles: res.data.roles })
          );
          history.push("/");
        })
        .catch((e) => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          dispatch(
            login({ fullname: res.data.fullname, roles: res.data.roles })
          );
          setLoading(false);
          history.push("/");
        }
      })
      .catch((err) => {
        notification(
          "error",
          intl.formatMessage({ id: "error" }),
          intl.formatMessage({ id: "loginFail" })
        );
        setLoading(false);
      });
  };
  return <LoginForm onFinish={onFinish} isLoading={isLoading} />;
}
