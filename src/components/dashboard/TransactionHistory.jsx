import React from "react";
import { IoArrowDownCircle, IoArrowForwardCircle } from "react-icons/io5";

export const TransactionHistory = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md border-1 border-gray-200 w-[95%] h-[400px]">
      <div className="flex justify-between pt-6 px-6">
        <h1 className="text-xl font-semibold">Historial de Transacciones</h1>
        <p className="text-medium font-semibold text-sky-700">Ver Todos</p>
      </div>

      <div className="flex justify-between px-6 py-3 mt-10 hover:scale-110 transition bg-white">
        
        <div className="flex items-center">
          <div className="size-14 bg-sky-100/70 rounded-lg flex items-center justify-center mr-4">
            <IoArrowDownCircle className="size-10 text-sky-800" />
          </div>
          <div>
            <p className="text-lg font-medium">Ingresos</p>
            <p>Feb 14, 2024</p>
          </div>
        </div>

        <div className="pt-3">
          <p className="text-green-500">+ $874</p>
        </div>
      </div>
      <div className="flex justify-between px-6 py-3 hover:scale-110 transition bg-white">
        
        <div className="flex items-center">
          <div className="size-14 bg-sky-100/70 rounded-lg flex items-center justify-center mr-4">
            <IoArrowForwardCircle className="size-10 text-sky-800" />
          </div>
          <div>
            <p className="text-lg font-medium">Retiro</p>
            <p>Feb 18,  2024</p>
          </div>
        </div>

        <div className="pt-3">
          <p className="text-red-600">- $2490</p>
        </div>
      </div>
      <div className="flex justify-between px-6 py-3 hover:scale-110 transition bg-white">
        
        <div className="flex items-center">
          <div className="size-14 bg-sky-100/70 rounded-lg flex items-center justify-center mr-4">
            <IoArrowDownCircle className="size-10 text-sky-800" />
          </div>
          <div>
            <p className="text-lg font-medium">Ingresos</p>
            <p>Marz 01,  2024</p>
          </div>
        </div>

        <div className="pt-3">
          <p className="text-green-500">+ $126</p>
        </div>
      </div>
    </div>
  );
};