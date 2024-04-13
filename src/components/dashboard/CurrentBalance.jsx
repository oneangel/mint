import { useNavigate } from "react-router-dom";
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
        onClick={handleBalance}
        className="flex flex-col col-span-1 py-10 max-w-full max-h-full bg-white"
      >
        <div className="w-48 ml-10 rounded-3xl mb-8">
          <p className="text-xl font-semibold">Balance general</p>
        </div>

        <div className="my-auto">
          <div className="flex flex-col justify-center h-full">
            <div className="mx-auto mb-5 rounded-3xl">
              <h1 className="text-5xl font-semibold text-center text-teal-600 md:text-6xl">
                ${balance.data.balance.toFixed(2)}
              </h1>
            </div>
            <div className="mx-auto rounded-3xl">
              <p className="text-lg text-center text-zinc-500">
                {daysOfWeek[currentDay]} •<span> {formattedTime} PM</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Tooltip>
  );
};
