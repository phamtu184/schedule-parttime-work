import React from "react";
import { Route, Redirect } from "react-router-dom";
export default function PrivateRoute({
  component: Component,
  authed,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed.indexOf("manager") > -1 ||
        authed.indexOf("storeManager") > -1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/404", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
