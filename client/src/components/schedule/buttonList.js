import React from "react";
import Button from "../common/button";
import { DiffOutlined } from "@ant-design/icons";
import translate from "../../asset/i18n/translate";
import { Link } from "react-router-dom";

export default function ButtonList(props) {
  return (
    <div style={{ marginBottom: "5px" }}>
      <Link to="/schedule/register">
        <Button type="primary" icon={<DiffOutlined />}>
          {translate("registerSchedule")}
        </Button>
      </Link>
    </div>
  );
}
