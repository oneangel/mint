import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useVerifyToken } from "../../hooks/client.hooks";

const SesionRoute = ({ children }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const { data, isLoading, isError, error } = useQuery(
    "verify-token",
    useVerifyToken,
    {
      retry: false,
    }
  );

  if (!isLoading && isError) {
    logout();
    return children;
  } else if (!isLoading && !isError) {
    return <Navigate to="/home" replace />;
  }
};

export default SesionRoute;
