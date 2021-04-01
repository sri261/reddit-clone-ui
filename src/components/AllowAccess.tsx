import React from "react";
import SignUpModal from "../components/SignUpModal/SignUpModal";
import { useSelector } from "react-redux";
import { authSelectors } from "../store/authSlice";

interface AllowAccessProps {
  isPrivate: boolean;
  children: JSX.Element;
}
function AllowAccess({ isPrivate, children }: AllowAccessProps) {
  const user = useSelector(authSelectors.user);

  // return user ? <div>{children}</div> : <SignUpModal  />;
}

export default AllowAccess;
