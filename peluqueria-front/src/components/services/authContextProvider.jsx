import { useState } from "react";
import { AuthenticationContext } from "./auth.context";

const TokenValue = localStorage.getItem("token");

export const AuthenticationContextProvider = ({ children }) => {
  const [token, setToken] = useState(TokenValue);

  const handleUserLogin = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthenticationContext value={{ token, handleUserLogin, handleUserLogout }}>
      {children}
    </AuthenticationContext>
  );
};
