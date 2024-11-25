import React, { createContext, useState, PropsWithChildren } from "react";

type AuthContectUserType = any;

export const AuthContext = createContext<AuthContectUserType>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthContectUserType>();

  const handleSetUser = (user: any) => {
    setUser(user);
  };
  return (
    <AuthContext.Provider value={{ user, handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};
