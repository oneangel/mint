import React from "react";
import Spline from "@splinetool/react-spline";
import {
  IoArrowForwardOutline,
  IoCall,
  IoCash,
  IoLockClosed,
  IoLogoAndroid,
  IoShieldCheckmark,
} from "react-icons/io5";
import { Header } from "../components/dashboard/Header";
import { Avatar, Button, Chip } from "@nextui-org/react";
import Analytics from "../assets/img/Analytics.png";

const personas = [
  { nombre: "Ricardo López", rol: "Rol de la persona" },
  { nombre: "Carlos Marín", rol: "Rol de la persona" },
  { nombre: "Elio Luján", rol: "Morido Ja ⚰️⚰️☠️" },
  { nombre: "Jesús Mórales", rol: "Rol de la persona" },
  { nombre: "Homero Funtes", rol: "Rol de la persona" },
  { nombre: "Eduardo Gurrola", rol: "Rol de la persona" },
  { nombre: "Jasiel García", rol: "Rol de la persona" },
];

export const Landing = () => {
  return (
    <div className="">
      <Header />
      <div className="h-screen overflow-auto">
        {/* Inicio */}
        <section id="home" className="h-screen w-full bg-white ">
          <div className="w-full h-full grid md:grid-cols-2">
            <div className="bg-red-400 lg:col-span-1 md:col-span-2">
              <div className="mt-64 ml-20 bg-default-200 w-80 rounded-full p-2 flex flex-wrap items-center">
                <Chip
                  variant="shadow"
                  classNames={{
                    base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                    content: "drop-shadow shadow-black text-white",
                  }}
                >
                  New
                </Chip>
                <p className="ml-2 text-sm font-semibold">
                  The Mint Dashboard 1.0 is Live!
                </p>
              </div>
              <div className="mt-4 ml-20">
                <h1 className="text-7xl text-pretty font-bold">
                  Ahorra fresco, vive sin límites 🍃
                </h1>
                <p className="text-default-700 mt-10 text-3xl">
                  Mint te ayuda a controlar tus finanzas de una manera ágil y
                  sencilla para mantener una salud financiera.
                </p>
                <div className="flex flex-wrap mt-6 gap-3">
                  <Button
                    color="primary"
                    size="lg"
                    endContent={<IoArrowForwardOutline />}
                  >
                    Comienza gratis
                  </Button>
                  <Button
                    color="default"
                    size="lg"
                    endContent={
                      <IoLogoAndroid className="size-10 text-green-600" />
                    }
                  >
                    Descargar App
                  </Button>
                </div>
              </div>
            </div>

            <div className="items-center justify-center bg-red-600 lg:col-span-1 lg:block hidden">
              <div className="flex items-center justify-center h-full">
                <img src={Analytics} alt="Mint" className="w-2/3" />
              </div>
            </div>
          </div>
        </section>

        {/* Nosotros */}
        <section id="nosotros" className="h-screen w-full bg-white flex">
          <div className="h-[90%] w-[70%] my-auto mx-auto justify-center grid lg:grid-cols-2 md:grid-cols-1 gap-4">
            <div className="bg-red-400 col-span-2 rounded-3xl"></div>
            <div className="bg-blue-400 lg:col-span-1 md:col-span-2 sm:md:col-span-2 row-span-2 rounded-3xl"></div>
            <div className="bg-orange-400 lg:col-span-1 md:col-span-2 sm:md:col-span-2  rounded-3xl"></div>
            <div className="bg-green-400 lg:col-span-1 md:col-span-2 sm:md:col-span-2 rounded-3xl"></div>
          </div>
        </section>

        <section className="bg-black h-screen w-full">
          <div className="pt-20">
            <h2 className="text-center text-6xl text-white w-1/2 mx-auto font-semibold">
              Comienza a construir tu futuro financiero con Mint
            </h2>
            <Button
              color="primary"
              size="lg"
              endContent={<IoArrowForwardOutline />}
              className="mx-auto flex mt-10"
            >
              Comienza gratis
            </Button>
          </div>
          <hr className="mt-20 mb-10 w-[90%] mx-auto flex " />
          <div className="w-[90%] mx-auto">
            <h3 className="text-default-400 mb-4">Compañia</h3>
            <p className="text-white mb-2">Acerca de nosotros</p>
            <p className="text-white mb-2">Contactanos</p>
            <p className="text-white mb-2">Cookies</p>
            <p className="text-white">Política de privacidad</p>
          </div>
          <hr className="mt-36 w-[90%] mx-auto flex " />
        </section>
      </div>
    </div>
  );
};
