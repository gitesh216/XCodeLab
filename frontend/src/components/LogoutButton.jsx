import React from "react";
import { userAuthStore } from "../store/userAuthStore";

const LogoutButton = ({ children }) => {
  const { logout } = userAuthStore();
  const onLogout = async () => {
    await logout();
  };
  return (
    <button className="btn btn-primary" onClick={onLogout}>
      {children}
    </button>
  );
};

export default LogoutButton;
