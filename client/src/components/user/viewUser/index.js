import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Form, Spin, Tag } from "antd";
import Title from "../../common/title";
import translate from "../../../asset/i18n/translate";
import userApi from "../../../api/userApi";

const viewItemLayout = {
  labelCol: {
    md: { span: 6 },
    lg: { span: 4 },
  },
  wrapperCol: {
    md: { span: 18 },
    lg: { span: 12 },
  },
};
export default function ViewUser({ props }) {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const params = { id };
        const res = await userApi.getUser(params);
        setUser(res);
        setLoading(false);
      } catch (e) {
        history.push("/users");
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Title className="color-dark">{translate("viewUser")}</Title>
      <Spin spinning={isLoading}>
        <Form.Item label={translate("username")} {...viewItemLayout}>
          <strong>{user.username}</strong>
        </Form.Item>
        <Form.Item label={translate("fullname")} {...viewItemLayout}>
          <strong>{user.fullname}</strong>
        </Form.Item>
        <Form.Item label={translate("phonenumber")} {...viewItemLayout}>
          <strong>{user.phonenumber}</strong>
        </Form.Item>
        <Form.Item label={translate("status")} {...viewItemLayout}>
          <Tag color={!user.disable ? "green" : "volcano"}>
            {!user.disable ? translate("enable") : translate("disable")}
          </Tag>
        </Form.Item>
        <Form.Item label={translate("roles")} {...viewItemLayout}>
          {user.roles
            ? user.roles.map((tag) => <Tag key={tag}>{translate(tag)}</Tag>)
            : ""}
        </Form.Item>
      </Spin>
    </>
  );
}
