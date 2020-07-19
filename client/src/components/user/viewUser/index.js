import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Descriptions, Spin, Tag } from "antd";
import Title from "../../common/title";
import translate from "../../../asset/i18n/translate";
import userApi from "../../../api/userApi";
import moment from "moment";

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
        <Descriptions
          title={translate("viewUser")}
          className="text-cap"
          bordered
        >
          <Descriptions.Item label={translate("username")}>
            {user.username}
          </Descriptions.Item>
          <Descriptions.Item label={translate("fullname")}>
            {user.fullname}
          </Descriptions.Item>
          <Descriptions.Item label={translate("phonenumber")}>
            {user.phonenumber}
          </Descriptions.Item>
          <Descriptions.Item label={translate("status")}>
            <Tag color={!user.disable ? "green" : "volcano"}>
              {!user.disable ? translate("enable") : translate("disable")}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label={translate("roles")}>
            {user.roles
              ? user.roles.map((tag) => <Tag key={tag}>{translate(tag)}</Tag>)
              : ""}
          </Descriptions.Item>
          <Descriptions.Item label={translate("createdAt")}>
            {moment(user.createdAt).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label={translate("updatedAt")}>
            {moment(user.updatedAt).format("DD/MM/YYYY")}
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </>
  );
}
