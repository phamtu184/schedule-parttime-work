import React, { useEffect, useState } from "react";
import { Form, Spin, Button, Upload } from "antd";
import { SaveOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import translate from "../../asset/i18n/translate";
import notification from "../common/notification";
import userApi from "../../api/userApi";
import { useSelector } from "react-redux";
import formItems from "./formItems";
import { getBase64 } from "./function";
import Title from "../common/title";
import ImgCrop from "antd-img-crop";

const formItemLayout = {
  labelCol: {
    md: { span: 6 },
    lg: { span: 4 },
  },
  wrapperCol: {
    md: { span: 18 },
    lg: { span: 12 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    md: { span: 18, offset: 6 },
    lg: { span: 12, offset: 4 },
  },
};
export default function Profile() {
  const [isLoading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [form] = Form.useForm();
  const history = useHistory();
  const id = useSelector((state) => state.auth.id);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await userApi.getUser({ id });
        form.setFieldsValue({ username: res.username });
        form.setFieldsValue({ fullname: res.fullname });
        form.setFieldsValue({ phonenumber: res.phonenumber });
        form.setFieldsValue({ roles: res.roles });
        setImgUrl(res.avatar);
        setLoading(false);
      } catch (e) {
        history.push("/");
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const uploadButton = (
    <div>
      {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}
      <div>{translate("upload")}</div>
    </div>
  );
  const intl = useIntl();
  const onFinish = async (value) => {
    setLoading(true);
    const { username, password, fullname, phonenumber, roles } = value;
    try {
      await userApi.editUser({
        username,
        password,
        fullname,
        phonenumber,
        roles,
        avatar: imgUrl,
      });
      notification(
        "success",
        intl.formatMessage({ id: "success" }),
        intl.formatMessage({ id: "editUserSuccess" })
      );
      setLoading(false);
    } catch (err) {
      if (err.response.status === 400) {
        notification(
          "error",
          intl.formatMessage({ id: "error" }),
          intl.formatMessage({ id: "userExist" })
        );
        setLoading(false);
      } else {
        notification(
          "error",
          intl.formatMessage({ id: "error" }),
          intl.formatMessage({ id: "serverError" })
        );
        setLoading(false);
      }
    }
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoadingImg(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoadingImg(false);
        setImgUrl(imageUrl);
      });
    }
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  return (
    <>
      <Title className="color-dark">{translate("profile")}</Title>
      <Spin spinning={isLoading}>
        <Form
          {...formItemLayout}
          name="edit-user"
          onFinish={onFinish}
          scrollToFirstError
          form={form}
        >
          {formItems.map((item) => (
            <Form.Item
              name={item.name}
              label={item.label}
              className="color-dark text-cap"
              key={item.name}
              rules={item.rules}
            >
              {item.input}
            </Form.Item>
          ))}
          <Form.Item
            name="avatar"
            label={translate("avatar")}
            className="color-dark text-cap"
            key="avatar"
          >
            <ImgCrop rotate>
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                onChange={handleChange}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onPreview={onPreview}
              >
                {imgUrl ? (
                  <img src={imgUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="text-cap mr-7px"
              icon={<SaveOutlined className="mr-7px" />}
              loading={isLoading}
            >
              {translate("save")}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}
