import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, token, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) return <Redirect to="/" />;
        return <Component {...props} />;
      }}
    />
  );
}

export { ProtectedRoute };
