import React from "react";
import Button from "../common/button";
import { SettingOutlined } from "@ant-design/icons";
import translate from "../../asset/i18n/translate";
import { Link } from "react-router-dom";

export default function ButtonList(props) {
  return (
    <div style={{ marginBottom: "5px" }}>
      <Link to="/calendar/setting">
        <Button type="primary" icon={<SettingOutlined />}>
          {translate("setting")}
        </Button>
      </Link>
    </div>
  );
}
