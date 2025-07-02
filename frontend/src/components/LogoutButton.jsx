import React from "react";
import { userAuthStore } from "../store/useAuthStore";

const LogoutButton = ({ children }) => {
  const { logout } = userAuthStore();
  const onLogout = async () => {
    await logout();
  };
  return (
    <button
      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
      onClick={onLogout}
    >
      {children}
    </button>
  );
};

export default LogoutButton;
