import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useVerifyToken } from "../../hooks/client.hooks";
import { LoadingPage } from "../../views/LoadingPage";

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

  if (isLoading) {
    return <LoadingPage label={"Cargando..."} />;
  }

  if (!isLoading && isError) {
    logout();
    return children;
  } else if (!isLoading && !isError) {
    return <Navigate to="/home" replace />;
  }
};

export default SesionRoute;
