import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNetworkState } from "react-use";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useVerifyToken } from "../../hooks/client.hooks";
import { LoadingPage } from "../../views/LoadingPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const state = useNetworkState();

  const { data, isLoading, isError, error } = useQuery(
    "verify-token",
    useVerifyToken,
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (!state.online) {
      toast.error("Se perdió la conexión a internet.");
    }
  }, [state]);

  if (isLoading) {
    return <LoadingPage label={"Validando..."} />;
  }

  if (!isLoading && isError) {
    return <Navigate to="/login" replace />;
  }

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isLoading && !isError) {
    return children;
  }
};

export default ProtectedRoute;
