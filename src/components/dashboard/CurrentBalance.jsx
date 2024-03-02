import React from "react";

export const CurrentBalance = () => {
  return (
    <div className="h-[223px] w-[400px] shadow-lg bg-white rounded-3xl">
      <p className="pt-4 pl-4 text-xl font-semibold">Saldo Actual</p>

      <div className="flex flex-col h-full justify-center">
        <h1 className="text-center font-semibold text-5xl text-teal-600 mb-2">
          $25,000
        </h1>
        <p className="text-center pb-10 text-zinc-600"> Martes 11, 2024 <span>6:25 PM</span></p>
      </div>
    </div>
  );
};