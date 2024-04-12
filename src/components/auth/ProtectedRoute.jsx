import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNetworkState } from "react-use";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const state = useNetworkState();

  useEffect(() => {
    if (!state.online) {
      toast.error("Se perdio la conexion a internet");
    }
  }, [state]);

  if (isAuthenticated === null) {
    return <Navigate to="/login" replace />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
