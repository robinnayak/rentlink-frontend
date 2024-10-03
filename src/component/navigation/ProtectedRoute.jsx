import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";
const ProtectedRoute = ({ element }) => {
  const token = useSelector((state) => state.auth.token);
  // const token = Cookies.get('token')
  // console.log("protected route token",token)
  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the element (the protected page)
  return element;
};

export default ProtectedRoute;
