import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelectors } from "../store/authSlice";

interface Props {
  isPrivate: boolean;
  children: JSX.Element;
  // visibleBeforeLogin: boolean;
}
function CheckAuth({ isPrivate, children }: Props) {
  const user = useSelector(authSelectors.user);

  useEffect(() => {}, [user]);
  return isPrivate ? (
    user ? (
      <div>{children}</div>
    ) : null
  ) : user ? null : (
    <div>{children}</div>
  );
}

export default CheckAuth;
