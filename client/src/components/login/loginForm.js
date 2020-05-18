import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Background from "../../asset/background.jpg";

const DivBg = styled.div`
  background-image: url(${Background});
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background-size: cover;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 1;
    top: 0px;
  }
`;
const DivForm = styled.div`
  width: 500px;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
  padding: 56px 40px;
  @media (max-width: 575px) {
    width: 100%;
  }
`;
export default function LoginForm(props) {
  const { submitLogin, isLoading, usernameRef, passwordRef } = props;
  return (
    <DivBg>
      <DivForm>
        <Form onSubmitCapture={submitLogin}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tài khoản"
              autoComplete="off"
              ref={usernameRef}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
              autoComplete="off"
              ref={passwordRef}
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              style={{ width: "100%" }}
              htmlType="submit"
              loading={isLoading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </DivForm>
    </DivBg>
  );
}
