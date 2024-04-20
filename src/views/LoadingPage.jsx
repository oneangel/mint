import React from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@nextui-org/react";
import { MintIcon } from "../icons/MintIcon";

export const LoadingPage = ({ label }) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <MintIcon className="w-20 mb-5"/>
      </div>
      <CircularProgress
        label={label}
        className="mb-8 font-medium text-center text-7xl text-default-700 w-15"
      />
    </div>
  );
};
