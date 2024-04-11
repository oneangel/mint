import { useNavigate } from "react-router-dom";
import { Skeleton, Tooltip } from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { getDay, format } from "date-fns";

export const CurrentBalance = ({ balance, isLoadingBalance }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  useEffect(() => {
    console.log(balance.data.balance);
  }, []);

  const formattedTime = format(currentTime, "HH:mm:ss");
  const currentDay = getDay(currentTime);

  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
  ];
  const navigate = useNavigate();
  const handleBalance = () => {
    navigate("/wallet");
  };
  return (
    <Tooltip content="Presiona para ver mas detalle" color="primary">
      <div
        className="flex flex-col max-w-full max-h-full col-span-1 py-10 bg-white border-gray-200 shadow-md rounded-3xl border-1 dark:bg-zinc-900 dark:border-zinc-800"
        onClick={handleBalance}
      >
        <Skeleton
          isLoaded={!isLoadingBalance}
          className="w-48 ml-10 rounded-3xl"
        >
          <p className="text-xl font-semibold">Balance general</p>
        </Skeleton>

        <div className="my-auto">
          <div className="flex flex-col justify-center h-full">
            <Skeleton isLoaded={!isLoadingBalance} className="mx-auto mb-5 rounded-3xl">
              <h1 className="text-5xl font-semibold text-center text-teal-600 md:text-6xl">
                ${balance.data.balance.toFixed(2)}
              </h1>
            </Skeleton>
            <Skeleton isLoaded={!isLoadingBalance} className="mx-auto rounded-3xl">
             <p className="text-lg text-center text-zinc-500">
              {daysOfWeek[currentDay]} •<span> {formattedTime} PM</span>
            </p> 
            </Skeleton>
            
          </div>
        </div>
      </div>
    </Tooltip>
  );
};
