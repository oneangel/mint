import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const SesionRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (token != null) {
    return <Navigate to="/home" replace />;
  }

  if (token == null) {
    return children;
  } else {
    return <Navigate to="/home" replace />;
  }
};

export default SesionRoute;
