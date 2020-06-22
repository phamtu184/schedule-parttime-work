import React from "react";
import { Route, Redirect } from "react-router-dom";
import { roleManager } from "./checkPrivateRoles";
export default function PrivateRoute({
  component: Component,
  authed,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        roleManager(authed) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/403", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
