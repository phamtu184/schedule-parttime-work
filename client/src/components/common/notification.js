import { notification } from "antd";

const Notification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    className: "text-cap",
  });
};

export default Notification;
