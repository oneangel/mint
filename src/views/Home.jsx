import React, { useEffect } from "react";
import Slider from "react-slick";
import {
  CurrentBalance,
  DebitCard,
  NavigationBar,
  TransactionHistory,
} from "../components/dashboard/dashboard-components";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton, CircularProgress } from "@nextui-org/react";
import {rows} from './Transfer'



export const Home = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    toast.success("¡Bienvenido!");
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="h-screen bg-sky-50/50">
      <NavigationBar />
      <div className="">
        <div className="flex justify-between">
          <Skeleton isLoaded={isLoaded} className="rounded-3xl mt-10 ml-20">
            <h1 className="text-4xl font-semibold text-sky-700">Home</h1>
          </Skeleton>

          <Skeleton isLoaded={isLoaded} className="rounded-3xl mr-72 mt-10">
            {/* <h1 className="text-3xl font-light ">¡Hola Lalo!</h1> */}
          </Skeleton>
        </div>

        <div className="flex mt-8 mx-20 h-72">
          {/* Gastos generales */}
          <div className="w-1/4 flex items-center">
            <div className="bg-white h-[280px] w-[418px] rounded-3xl shadow-md border-1">
              <h1 className="p-4 text-lg font-semibold">Gastos Generales </h1>

              <div className="flex flex-wrap justify-center items-center gap-9">
                <div className="flex flex-col justify-center">
                  <h2 className="font-semibold">Diario</h2>
                  <p>$475</p>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-semibold">Semanal</h2>
                  <p>$3,327</p>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-semibold">Mensual</h2>
                  <p>$10,126</p>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-semibold">Anual</h2>
                  <p>$30,689</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/5 flex justify-center items-center">
            <CurrentBalance />
          </div>

          <div className="w-2/5 flex  justify-center">
          <div className="flex flex-col">
            {/* Abonos */}
            <div className="">
              <h2 className="text-center text-xl font-semibold mb-2">
                Total de Abonos
              </h2>
              <div className="bg-green-50 h-20 w-60 rounded-2xl flex flex-col justify-center items-center shadow-md border-1">
                <span className="text-3xl font-semibold text-teal-600">
                  $239.00
                </span>
                <p className="text-sm"> a partir de Marzo 25, 2024 </p>
              </div>
            </div>

            {/* Cargos */}
            <div className="mt-8">
              <h2 className="text-center text-xl font-semibold mb-2">
                Gastos del Mes: <span className="text-neutral-600">Marzo</span>
              </h2>
              <div className="bg-red-50 h-20 w-60 rounded-2xl flex flex-col justify-center items-center shadow-md border-1">
                <span className="text-3xl font-semibold text-red-700">
                  $2,022.00
                </span>
                <p className="text-sm"> a partir de Marzo 18, 2024 </p>
              </div>
            </div>
          </div>
          </div>
        </div>
        {/* Bottom side */}
        <div className="flex mt-6 px-20">
          <div className="w-3/5 max-h-[400px]">
            <Skeleton isLoaded={isLoaded} className="rounded-3xl shadow-md border-1">
              <div className="bg-white rounded-3xl border-gray-200 w-[100%] h-[400px]"></div>
            </Skeleton>
          </div>
          <div className="w-2/5 flex items-center justify-end">
            <TransactionHistory transactions={rows}/>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};