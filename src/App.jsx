import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ErrorPage,
  Home,
  Landing,
  Login,
  Register,
  Services,
  Transfer,
  Wallet,
} from "./views/Views.js";
import "./index.css";
import {} from "@nextui-org/react";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transfer"
                element={
                  <ProtectedRoute>
                    <Transfer />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/wallet"
                element={
                  <ProtectedRoute>
                    <Wallet />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/services"
                element={
                  <ProtectedRoute>
                    <Services />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
