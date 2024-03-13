import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, Register, Transfer, Wallet } from "./views/Views.js";
import "./index.css";
import {} from "@nextui-org/react";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/transfer" element={<Transfer />}></Route>
          <Route path="/wallet" element={<Wallet />}></Route>
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
