// import React, { PropsWithChildren } from "react";
// import { UseAuthContext } from "../context/hooks/AuthContextHook";
// import { Navigate, Outlet } from "react-router-dom";

// export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
//   const { user } = UseAuthContext();
//   if (!user) {
//     return <Navigate to="/sign-in" replace={true} />;
//   } else if (user) {
//     return <Navigate to="/MainPage" replace={true} />;
//   }
//   return children || <Outlet />;
// };
//     manamde sworad mushaobda mere tavisit agad mushabs idk ra

import React, { PropsWithChildren } from "react";
import { UseAuthContext } from "../context/hooks/AuthContextHook";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = UseAuthContext();
  if (user) {
    // return <Navigate to="/sign-in" replace={true} />;
    return <Navigate to="/MainPage" replace />;
  }
  return children || <Outlet />;
};
