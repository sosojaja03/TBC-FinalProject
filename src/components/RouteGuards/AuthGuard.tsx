import React, { PropsWithChildren } from "react";
import { useAuthContext } from "../Context/index";
import { Navigate, Outlet } from "react-router-dom";

export const IsAuthorisedGuard: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  return children || <Outlet />;
};

export const IsUnAuthorisedGuard: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/dashboard/MainPage" replace />;
  }

  return children || <Outlet />;
};
