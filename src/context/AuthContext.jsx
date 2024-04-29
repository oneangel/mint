import React, { useState, useEffect } from "react";
import { useVerifyToken, useVerifyUsername } from "../hooks/client.hooks";
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        // Verifica si hay un token y un nombre de usuario en el localStorage
        if (token && username) {
          await Promise.all([
            useVerifyToken(), // Verifica si el token es válido
            useVerifyUsername(), // Verifica si el nombre de usuario es válido
          ]);
          setIsAuthenticated(true); // Si no hay excepción, ambos son válidos y el usuario está autenticado
        } else {
          setIsAuthenticated(false); // Si no hay token o nombre de usuario, el usuario no está autenticado
        }
      } catch (error) {
        // Si hay una excepción, el token o el nombre de usuario no son válidos o han expirado
        console.error(error.message); // Maneja el error de acuerdo a tus necesidades
        setIsAuthenticated(false); // Establece isAuthenticated en false
      }
    };

    checkAuth();

    const handleStorageChange = () => {
      // Cuando haya un cambio en el localStorage, vuelve a verificar la autenticación
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    // Limpia el event listener cuando el componente se desmonta
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const login = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setIsAuthenticated(true);
  };

  const authContextValue = { isAuthenticated, logout, login };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
