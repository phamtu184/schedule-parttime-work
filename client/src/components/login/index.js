import React, { useRef, useState } from "react";
import { message } from "antd";
import LoginForm from "./loginForm";

const user = {
  tk: "user",
  mk: "123",
};
export default function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const submitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const usernameValue = usernameRef.current.props.value;
    const passwordValue = passwordRef.current.props.value;
    if (!usernameValue || !passwordValue) return setLoading(false);
    return message.success("This is a success message");
  };
  return (
    <LoginForm
      submitLogin={submitLogin}
      isLoading={isLoading}
      usernameRef={usernameRef}
      passwordRef={passwordRef}
    />
  );
}
