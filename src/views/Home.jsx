import React from "react";
import {
  CurrentBalance,
  DebitCard,
  NavigationBar,
} from "../components/dashboard/dashboard-components";
import { LineChart } from "@mui/x-charts/LineChart";

export const Home = () => {
  return (
    <div>
      <NavigationBar />
      <h1 className="pt-10 text-4xl font-semibold pl-20">Home</h1>
      <div className="flex pt-8">
        <div className="w-1/4 px-20 ">
          <DebitCard />
        </div>
        <div className="w-2/5 flex px-10">
          <div className="w-1/2">
            <h2 className="text-xl font-semibold mb-3">Ahorros Recientes</h2>
            <div className="w-[300px] h-[120px] bg-sky-50 rounded-3xl"></div>
          </div>
          <div className="w-1/2">
            <h2 className="text-xl font-semibold mb-3">Gastos del Mes</h2>
            <div className="w-[300px] h-[120px] bg-sky-50 rounded-3xl flex justify-center items-center">
              <p className="text-4xl font-semibold text-red-800">$686</p>
            </div>
          </div>
        </div>

        <div className="w-2/5 flex items-center justify-center">
          <div>
            <CurrentBalance />
          </div>
        </div>
      </div>
      {/* Bottom side */}

      <div className="flex mt-12 h-[400px]">
        <div className="w-3/5 flex pl-20">
          <div className="bg-white w-[900px] rounded-3xl shadow-lg border-1 border-gray-200 "></div>
        </div>

        <div className="w-2/5"></div>
      </div>
    </div>
  );
};
