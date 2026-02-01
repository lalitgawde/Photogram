/* eslint-disable @typescript-eslint/no-unused-vars */
import UserAuthContext from "@/store/UserAuthContext";
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebaseConfig";

type Props = {
  children?: React.ReactNode;
};

const ProtectedRoutes = (_props: Props) => {
  const [user, loading, error] = useAuthState(auth);

  const { isAuthenticated } = useContext(UserAuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="h-15 w-15 animate-spin rounded-full border-6 border-gray-300 border-t-blue-500"></div>
        <div className="mt-2 ml-2 text-lg">Loading...</div>
      </div>
    );
  }

  return isAuthenticated && user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoutes;
