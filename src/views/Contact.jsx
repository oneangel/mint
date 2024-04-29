import React from "react";
import { TbMailFilled, TbMapPinFilled, TbPhoneFilled } from "react-icons/tb";
import { Header } from "../components/dashboard/Header";

export const Contact = () => {
  return (
    <div>
      <Header />
      <section className="h-screen dark:bg-[#1A1A24] flex">
        <div className="grid w-full grid-cols-3 my-auto">
          <div className="flex flex-col items-center justify-center col-span-1 text-center">
            <span className="mb-14"><TbMapPinFilled className="size-28"/></span>
            <p>
              Universidad Tecnológica de Durango Durango - Mezquital, 34308
              Gabino Santillán, Dgo.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 text-center">
          <span className="mb-14"><TbPhoneFilled className="size-28"/></span>
            <p>618 335 0785</p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 text-center">
          <span className="mb-14"><TbMailFilled className="size-28"/></span>
            <p>mintapp@gmail.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};
