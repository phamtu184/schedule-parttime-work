import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import translate from "../../asset/i18n/translate";

export default function ErrorPage({ status, title, subTitle }) {
  return (
    <Result
      status={status || "404"}
      title={title || "404"}
      subTitle={
        subTitle ? translate("pageAuthorized") : translate("pageNotExist")
      }
      className="text-cap"
      extra={
        <Link to="/">
          <Button className="text-cap" type="primary">
            {translate("backHome")}
          </Button>
        </Link>
      }
    />
  );
}
