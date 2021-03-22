import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { authSelectors } from "../store/authSlice";

function PrivateRoute({ children, ...rest }: any) {
  const user = useSelector(authSelectors.user);

  return <Route {...rest}>{children}</Route>;
  // return user ? <Route {...rest}>{children}</Route> : <Redirect to="/login" />;
  // return user ? <Redirect to="/login" /> : <Route {...rest}>{children}</Route>;
}

export default PrivateRoute;
