import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelectors } from "../store/authSlice";

function CheckAuth({ children }: any) {
  const user = useSelector(authSelectors.user);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return user ? <div>{children}</div> : null;
}

export default CheckAuth;
