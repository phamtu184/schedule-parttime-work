import React from "react";
import { Button } from "antd";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  CheckOutlined,
  StopOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const ButtonEdit = styled(Button)`
  margin-right: 8px;
  margin-bottom: 8px;
`;
export default function ButtonList() {
  return (
    <div>
      <ButtonEdit type="primary" icon={<UserAddOutlined />}>
        Thêm
      </ButtonEdit>
      <ButtonEdit type="primary" icon={<UserDeleteOutlined />}>
        Xóa
      </ButtonEdit>
      <ButtonEdit type="primary" icon={<CheckOutlined />}>
        Kích hoạt
      </ButtonEdit>
      <ButtonEdit type="primary" icon={<StopOutlined />}>
        Vô hiệu
      </ButtonEdit>
    </div>
  );
}
