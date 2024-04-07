import React from "react";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import GaugeChart from "../components/charts/GaugeChart";
import { IoFlash, IoWater } from "react-icons/io5";
import LiquidFillChart from "../components/charts/LiquidFillChart";
import { useMonthMeasure } from "../hooks/service.hooks";
import { useQuery } from "react-query";

export const Services = () => {
  const {
    data: measureData,
    isLoading: isLoadingMeasure,
    isError: isErrorMeasure,
  } = useQuery("measure", useMonthMeasure);

  return (
    <div className="h-screen bg-sky-50/50 dark:bg-zinc-950">
      <NavigationBar />
      <h1 className="text-4xl font-semibold pl-20 text-sky-700 pt-32 dark:text-white">
        Servicios
      </h1>
      <div className="mx-20 flex flex-wrap h-[700px]">
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-[70%] bg-white h-[90%] rounded-3xl border-1 border-default-300 shadow-md dark:bg-zinc-900 dark:border-zinc-800 items-center">
            <p className="pt-10 pl-10 flex items-center text-2xl font-bold text-default-700">
              <span>
                <IoWater className="size-8" />
              </span>
              Agua
            </p>
            <div className="flex items-center justify-center">
              <LiquidFillChart />
            </div>
            

            <div className="flex flex-wrap mx-10">
              <div className="w-1/2">
                <p className="mt-10 text-xl font-semibold">
                  Total de litros:{" "}
                  <span className="ml-2 text-default-400">000L</span>
                </p>
                <p className="mt-2 text-xl font-semibold">
                  Litros gastados:{" "}
                  <span className="ml-2 text-default-400">000L</span>
                </p>
              </div>

              <div className="w-1/2 ">
                <p className="text-center text-xl">Gastos</p>
                <div className="bg-red-50 h-20 mt-2 rounded-3xl mx-4 flex items-center justify-center sha">
                  <p className="text-2xl font-bold text-red-700">$000.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex justify-center items-center">
          <div className="w-[70%] bg-white h-[90%] rounded-3xl border-1 border-default-300 shadow-md dark:bg-zinc-900 dark:border-zinc-800">
            <p className="pt-10 pl-10 flex items-center text-2xl font-bold text-default-700">
              <span>
                <IoFlash className="size-8" />
              </span>
              Energia
            </p>
            {!isLoadingMeasure && (
              <GaugeChart kw={measureData.data.totalMeasure / 100} />
            )}

            <div className="flex flex-wrap mx-10">
              <div className="w-1/2">
                <p className="mt-10 text-xl font-semibold">
                  Total de kW:{" "}
                  {!isLoadingMeasure && (
                    <span className="ml-2 text-default-400">
                      {measureData.data.totalMeasure} kw
                    </span>
                  )}
                </p>
                <p className="mt-2 text-xl font-semibold">
                  Consumo de kWh:{" "}
                  <span className="ml-2 text-default-400">Bajo</span>
                </p>
              </div>

              <div className="w-1/2 ">
                <p className="text-center text-xl">Gastos</p>
                <div className="bg-red-50 h-20 mt-2 rounded-3xl mx-4 flex items-center justify-center sha">
                  <p className="text-2xl font-bold text-red-700">$000.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <GaugeChart /> */}
    </div>
  );
};
