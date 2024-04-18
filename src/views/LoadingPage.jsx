import React from "react";
import Icon from "../assets/img/icons/mint-logo.png";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@nextui-org/react";

export const LoadingPage = ({ label }) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <img
          src={Icon}
          alt=""
          className="mb-12 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
        />
      </div>
      <CircularProgress
        label={label}
        className="text-center text-7xl font-medium text-default-700 mb-8 w-15"
      />
    </div>
  );
};
