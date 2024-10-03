import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the element (the protected page)
  return element;
};

export default ProtectedRoute;
