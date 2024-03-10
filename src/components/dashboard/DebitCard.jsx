import React from "react";
import { IoCellular } from "react-icons/io5";
import { ChipIcon } from "../../icons/ChipIcon";

export const DebitCard = () => {
  return (
    <div className="h-[223px] w-[365px] bg-gradient-to-tr from-black to-sky-900 rounded-3xl hover:scale-110 transition">

      <div className="flex justify-between items-center px-6 pt-4">
        <p className="text-white font-semibold text-xl">Tarjeta 1</p>
        <IoCellular className="text-white pr-4" size={40}/>
      </div>

      <div className="flex justify-between items-center px-6 pt-14">
        <p className="text-white text-lg font-light text">1234 1234 1234 1234</p>
        <div className="pr-3"><ChipIcon width={30} height={30}/></div>
      </div>
      <p className="px-6 pt-6 text-white font-bold text-2xl">$ 2,010.00</p>
    </div>
  );
};
