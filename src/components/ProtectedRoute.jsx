
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

// Protected Route to check is user authenticated or not
const ProtectedRoute = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
