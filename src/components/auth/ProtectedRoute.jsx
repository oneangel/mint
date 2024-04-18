import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNetworkState } from "react-use";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useVerifyToken } from "../../hooks/client.hooks";
import { LoadingPage } from "../../views/LoadingPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const state = useNetworkState();

  const { data, isLoading, isError, error } = useQuery(
    "verify-token",
    useVerifyToken,
    {
      retry: false,
    }
  );

  useEffect(() => {
    console.log("Entrando al protectedRoute");
  }, []);

  useEffect(() => {
    if (!state.online) {
      toast.error("Se perdió la conexión a internet.");
    }
  }, [state]);

  return (
    <>
      {isLoading && <LoadingPage label={"Validando..."} />}
      {!isLoading && isError && <Navigate to="/login" replace />}
      {!isLoading && !isAuthenticated && <Navigate to="/login" replace />}
      {!isLoading && !isError && isAuthenticated ? (
        children
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
