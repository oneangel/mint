import React from "react";

export const CurrentBalance = () => {
  return (
    <div className="h-[223px] w-[400px] shadow-md bg-white rounded-3xl hover:scale-110 transition border-1 border-gray-200">
      <p className="pt-4 pl-4 text-xl font-semibold">Saldo Actual</p>

      <div className="flex flex-col h-full justify-center">
        <h1 className="text-center font-semibold text-6xl text-teal-600 mb-2">
          $25,000
        </h1>
        <p className="text-center pb-10 text-lg text-zinc-500">
          {" "}
          Martes 11, 2024 •<span> 6:25 PM</span>
        </p>
      </div>
    </div>
  );
};
