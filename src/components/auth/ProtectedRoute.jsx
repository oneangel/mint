// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LoadingPage } from "../../views/LoadingPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, logout } = React.useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
