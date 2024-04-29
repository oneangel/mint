import React from "react";
import Cartera from "../assets/img/cartera.png";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <img src={Cartera} alt="" className="mb-12" />
      </div>
      <h1 className="mb-8 font-medium text-center text-7xl text-default-700">
        PAGE NOT FOUND
      </h1>
      <p className="text-xl text-pretty">Solo hemos encontrado moscas...</p>
      <p className="text-xl text-pretty"> Tal vez esto ayude a regresar.</p>
      <Button
        size="lg"
        onClick={handleHome}
        className="px-16 mt-8 text-2xl text-white shadow-lg bg-gradient-to-r from-cyan-700 to-cyan-500"
      >
        Home
      </Button>
    </div>
  );
};
