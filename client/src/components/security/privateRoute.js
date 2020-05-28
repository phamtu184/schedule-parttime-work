import React from "react";
import { Route, Redirect } from "react-router-dom";
import checkPrivateRoles from "./checkPrivateRoles";
export default function PrivateRoute({
  component: Component,
  authed,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkPrivateRoles(authed) ? (
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
