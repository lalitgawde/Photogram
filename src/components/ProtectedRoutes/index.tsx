/* eslint-disable @typescript-eslint/no-unused-vars */
import UserAuthContext from "@/store/UserAuthContext";
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebaseConfig";
import Error from "@/pages/Error";
import Layout from "../Layout";
import Loader from "../Loader";

type Props = {
  children?: React.ReactNode;
};

const ProtectedRoutes = (_props: Props) => {
  const [user, loading, error] = useAuthState(auth);

  const { isAuthenticated } = useContext(UserAuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  console.log("ProtectedRoutes - isAuthenticated:", isAuthenticated);
  console.log("ProtectedRoutes - user:", user);
  return isAuthenticated && user ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoutes;
