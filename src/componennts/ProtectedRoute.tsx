import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface ProtectedRouteProps {
  reverse?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  reverse = false,
}) => {
  const { user } = useAppSelector((s) => s.auth);
  const isLoggedIn = Boolean(user);

  if (reverse) {
    return isLoggedIn ? <Navigate to="/products" replace /> : <Outlet />;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
};
