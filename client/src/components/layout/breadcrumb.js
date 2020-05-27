import React from "react";
import { Breadcrumb } from "antd";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import translate from "../../asset/i18n/translate";

const breadcrumbNameMap = {
  "/404": "404",
  "/403": "403",
  "/calendar": translate("calendar"),
  "/users": translate("users"),
  "/users/newuser": translate("newUser"),
  "/users/viewuser": translate("viewUser"),
  "/customer": translate("customer"),
  "/setting": translate("setting"),
};
function MenuBreadcrumb({ location }) {
  const isThemeLight = useSelector((state) => state.setting.isThemeLight);
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link
          className={isThemeLight ? "text-cap" : "color-white text-cap"}
          to={url}
        >
          {breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link
        className={isThemeLight ? "text-cap" : "color-white text-cap"}
        to="/"
      >
        {translate("home")}
      </Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb style={{ margin: "15px 0 0 15px" }}>
      {breadcrumbItems}
    </Breadcrumb>
  );
}
export default withRouter(MenuBreadcrumb);
