import React from "react";
import { Layout } from "antd";
import { Route, Redirect } from "react-router-dom";
import PrivateRoute from "../security/privateRoute";
import PageError from "../errorPage/result";
import Home from "../home";
import User from "../user";
import NewUser from "../user/newUser";
import ViewUser from "../user/viewUser";
import { useSelector } from "react-redux";

export default function Content() {
  const authed = useSelector((state) => state.auth.roles);
  return (
    <Layout.Content
      style={{
        margin: "12px 16px",
        padding: 24,
        minHeight: "800px",
        overflowY: "hidden",
        borderRadius: "5px",
      }}
      className="bg-white"
    >
      <PrivateRoute exact authed={authed} path="/users" component={User} />
      <PrivateRoute
        exact
        authed={authed}
        path="/users/newuser"
        component={NewUser}
      />
      <PrivateRoute
        exact
        authed={authed}
        path="/users/viewuser/:id"
        component={ViewUser}
      />
      <Route exact path="/customer" component={() => <div>customer</div>} />
      <Route exact path="/setting" component={() => <div>setting</div>} />
      <Route path="/calendar" component={() => <div>calendar</div>} />
      <Route exact path="/404" component={PageError} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Layout.Content>
  );
}
