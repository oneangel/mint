import { Skeleton, Tooltip } from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { getDay, format } from "date-fns";

export const CurrentBalance = ({ balance }) => {
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
    "Miercoles",
    "Jueves",
    "Viernes",
  ];

  return (
    <Tooltip content="Presiona para ver mas detalle" color="primary">
      <div className="h-[250px] w-[480px] bg-white rounded-3xl border-1 border-gray-200 shadow-md">
        <p className="pt-4 pl-4 text-xl font-semibold">Balance general</p>

        <div className="flex flex-col h-full justify-center">
          <h1 className="text-center font-semibold text-6xl text-teal-600 mb-2">
            ${balance.data.balance.toFixed(2)}
          </h1>
          <p className="text-center pb-10 text-lg text-zinc-500">
            {daysOfWeek[currentDay]} •<span> {formattedTime} PM</span>
          </p>
        </div>
      </div>
    </Tooltip>
  );
};
