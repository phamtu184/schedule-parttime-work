import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export default function ErrorPage({ status, title, subTitle }) {
  return (
    <Result
      status={status || "404"}
      title={title || "404"}
      subTitle={subTitle || "Trang này không tồn tại!"}
      extra={
        <Link to="/">
          <Button type="primary">Về trang chủ</Button>
        </Link>
      }
    />
  );
}
