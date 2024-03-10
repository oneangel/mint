import React from "react";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { DebitCard } from "../components/dashboard/DebitCard";

export const Wallet = () => {
  return (
    <div>
      <NavigationBar />
      <h1 className="pt-10 text-4xl font-semibold pl-20 text-sky-700">
        Cartera
      </h1>
      <div className="w-1/4 px-20 mt-10">
        <DebitCard />
      </div>
    </div>
  );
};
