import React from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";
// import Page404 from "../errorPage/result";
import Home from "../home";
import User from "../user";
import { useSelector } from "react-redux";
export default function Content() {
  const isThemeLight = useSelector((state) => state.setting.isThemeLight);
  return (
    <Layout.Content
      style={{
        margin: "12px 16px",
        padding: 24,
        minHeight: "800px",
        overflowY: "hidden",
        borderRadius: "5px",
      }}
      className={isThemeLight ? "bg-white" : "bg-dark"}
    >
      <Route
        path="/calendar"
        exact={true}
        component={() => <div>calendar</div>}
      />
      <Route path="/users" exact={true} component={User} />
      <Route
        path="/customer"
        exact={true}
        component={() => <div>customer</div>}
      />
      <Route
        path="/setting"
        exact={true}
        component={() => <div>setting</div>}
      />
      <Route path="/" exact={true} component={Home} />
    </Layout.Content>
  );
}
