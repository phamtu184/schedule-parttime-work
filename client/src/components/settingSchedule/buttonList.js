import React from "react";
import Button from "../common/button";
import { PlusOutlined } from "@ant-design/icons";
import translate from "../../asset/i18n/translate";
import { Link } from "react-router-dom";

export default function ButtonList(props) {
  return (
    <div style={{ marginBottom: "5px" }}>
      <Link to="/setting/createRegister">
        <Button type="primary" icon={<PlusOutlined />}>
          {translate("createRegister")}
        </Button>
      </Link>
    </div>
  );
}
