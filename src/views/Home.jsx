import React, { useEffect } from "react";
import Slider from "react-slick";
import {
  CurrentBalance,
  DebitCard,
  NavigationBar,
  TransactionHistory,
} from "../components/dashboard/dashboard-components";
import toast, { Toaster } from "react-hot-toast";

export const Home = () => {
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
    <div>
      <NavigationBar />
      <div className="">
        <div className="flex justify-between">
          <h1 className="pt-10 text-4xl font-semibold pl-20 text-sky-700">
            Home
          </h1>
          <h1 className="pt-10 text-3xl font-light pr-72">¡Hola Lalo!</h1>
        </div>
        <div className="flex pt-8">
          <div className="w-1/4 px-20 ">
            <DebitCard />
          </div>
          <div className="w-2/5 flex px-10">
            <div className="w-1/2">
              <h2 className="text-xl font-semibold mb-3">Ahorros Recientes</h2>
              <Slider {...settings} className="hover:scale-110 transition ">
                <div className="w-[300px] h-[120px] shadow-md bg-sky-50 rounded-3xl"></div>
                <div className="w-[300px] h-[120px] shadow-md bg-sky-50 rounded-3xl"></div>
                <div className="w-[300px] h-[120px] shadow-md bg-sky-50 rounded-3xl"></div>
              </Slider>
            </div>
            <div className="w-1/2 ml-14">
              <h2 className="text-xl font-semibold mb-3">Gastos del Mes</h2>
              <div className="w-[300px] h-[120px] shadow-md bg-sky-50 rounded-3xl flex justify-center items-center hover:scale-110 transition">
                <p className="text-5xl font-semibold text-red-800">$686</p>
              </div>
            </div>
          </div>
          <div className="w-2/5 flex items-center justify-center pr-20">
            <div>
              <CurrentBalance />
            </div>
          </div>
        </div>
        {/* Bottom side */}
        <div className="flex mt-12 px-20">
          <div className="w-3/5 max-h-[400px]">
            <div className="bg-white rounded-3xl shadow-md border-1 border-gray-200 w-[100%] h-[400px]"></div>
          </div>
          <div className="w-2/5 flex items-center justify-end">
            <TransactionHistory />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
