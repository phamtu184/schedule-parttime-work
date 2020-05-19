import React, { lazy } from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";
// import Page404 from "../errorPage/result";
const Home = lazy(() => import("../home/index"));

export default function Content() {
  return (
    <Layout.Content
      style={{
        margin: "12px 16px",
        padding: 24,
        minHeight: 280,
        background: "#fff",
      }}
    >
      <Route path="/users" exact={true} component={() => <div>users</div>} />
      <Route
        path="/setting"
        exact={true}
        component={() => <div>setting</div>}
      />
      <Route path="/" exact={true} component={Home} />
    </Layout.Content>
  );
}
