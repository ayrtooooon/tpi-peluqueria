import { useState } from "react";
import { AuthenticationContext } from "./auth.context";
export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const handleUserLogin = (userData) => {
    setUser(userData);
  };
  const handleUserLogout = () => {
    setUser(null);
  };
  const isLoggedIn = !!user;
  return (
    <AuthenticationContext.Provider
      value={{ user, isLoggedIn, handleUserLogin, handleUserLogout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
