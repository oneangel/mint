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
      <div className="h-screen overflow-auto bg-white dark:bg-zinc-950">
        {/* Inicio */}
        <section id="home" className="w-full h-screen ">
          <div className="grid h-full gap-2 mx-auto space-x-5 max-w-7xl md:grid-cols-2">
            <div className="p-10 my-auto lg:col-span-1 md:col-span-2">
              <div className="flex flex-wrap items-center p-2 rounded-full bg-default-200 w-80">
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
              <div className="mt-4">
                <h1 className="font-bold text-7xl text-pretty">
                  Ahorra fresco, vive sin límites 🍃
                </h1>
                <p className="mt-10 text-3xl text-default-700">
                  Mint te ayuda a controlar tus finanzas de una manera ágil y
                  sencilla para mantener una salud financiera.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
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
                      <IoLogoAndroid className="text-green-600 size-10" />
                    }
                  >
                    Descargar App
                  </Button>
                </div>
              </div>
            </div>

            <div className="items-center hidden justify-cemter lg:col-span-1 lg:block">
              <div className="flex items-center justify-center h-full">
                <img src={Analytics} alt="Mint" className="" />
              </div>
            </div>
          </div>
        </section>

        {/* Nosotros */}
        <section id="nosotros" className="flex w-full h-screen">
          <div className="h-[90%] w-[70%] my-auto mx-auto justify-center grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="col-span-2 bg-red-400 md:col-span-2 rounded-3xl"></div>
            <div className="col-span-2 row-span-2 bg-blue-400 md:col-span-1 rounded-3xl"></div>
            <div className="col-span-2 bg-orange-400 md:col-span-1 rounded-3xl"></div>
            <div className="col-span-2 bg-green-400 md:col-span-1 rounded-3xl"></div>
          </div>
        </section>

        <section className="w-full h-screen bg-black">
          <div className="pt-20">
            <h2 className="w-1/2 mx-auto text-6xl font-semibold text-center text-white">
              Comienza a construir tu futuro financiero con Mint
            </h2>
            <Button
              color="primary"
              size="lg"
              endContent={<IoArrowForwardOutline />}
              className="flex mx-auto mt-10"
            >
              Comienza gratis
            </Button>
          </div>
          <hr className="mt-20 mb-10 w-[90%] mx-auto flex " />
          <div className="w-[90%] mx-auto">
            <h3 className="mb-4 text-default-400">Compañia</h3>
            <p className="mb-2 text-white">Acerca de nosotros</p>
            <p className="mb-2 text-white">Contactanos</p>
            <p className="mb-2 text-white">Cookies</p>
            <p className="text-white">Política de privacidad</p>
          </div>
          <hr className="mt-36 w-[90%] mx-auto flex " />
        </section>
      </div>
    </div>
  );
};
