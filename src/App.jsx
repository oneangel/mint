import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, Register, Transfer, Wallet } from "./views/Views.js";
import "./index.css";
import {} from "@nextui-org/react";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/transfer" element={<Transfer />}></Route>
          <Route path="/wallet" element={<Wallet />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
