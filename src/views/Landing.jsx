import React from "react";
import Spline from "@splinetool/react-spline";
import {
  IoArrowForwardOutline,
  IoArrowUpCircle,
  IoCall,
  IoCash,
  IoLockClosed,
  IoLogoAndroid,
  IoShieldCheckmark,
  IoShieldHalfSharp,
} from "react-icons/io5";
import { Header } from "../components/dashboard/Header";
import { useNavigate } from "react-router-dom";
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
  const handleRegPage = () => {
    navigate("/register");
  };

  const navigate = useNavigate();
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
                <h1 className="text-5xl font-bold md:text-7xl text-pretty">
                  Ahorra fresco, vive sin límites 🍃
                </h1>
                <p className="mt-10 text-2xl md:text-3xl text-default-700">
                  Mint te ayuda a controlar tus finanzas de una manera ágil y
                  sencilla para mantener una salud financiera.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <Button
                    color="primary"
                    size="lg"
                    onClick={handleRegPage}
                    className="text-xs size-44 md:w-56 md:text-lg"
                    endContent={<IoArrowForwardOutline />}
                  >
                    Comienza gratis
                  </Button>
                  <Button
                    color="default"
                    size="lg"
                    className="text-xs size-44 md:w-56 md:text-lg"
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
            <div className="flex flex-col col-span-2 bg-blue-400 md:col-span-2 rounded-3xl ">
              <div className="my-auto ml-10">
                <span className="text-4xl text-orange-400 md:text-6xl">
                  <IoLockClosed />
                </span>
                <p className="text-4xl font-semibold text-white md:mt-10 md:text-6xl ">
                  Seguridad y Confianza
                </p>
              </div>
            </div>
            <div className="flex flex-col col-span-2 row-span-2 bg-blue-200 md:col-span-1 rounded-3xl">
              <div className="my-auto ml-10">
                <span className="text-5xl text-purple-600">
                  <IoArrowUpCircle />
                </span>
                <p className="mt-6 text-5xl font-semibold text-black">
                  Fácil acceso a tus ingresos
                </p>
                <p className="w-2/3 mt-5 text-2xl">Acceso rápido y sencillo a tus ingreos para una mejor visualización, análisis y control.</p>
              </div>
            </div>
            <div className="flex col-span-2 bg-black md:col-span-1 rounded-3xl">
              <div className="my-auto ml-10">
                <span className="text-5xl text-green-400">
                  <IoShieldHalfSharp />
                </span>
                <p className="mt-6 text-4xl font-semibold text-white">
                  Tus ingresos están protegidos
                </p>
              </div>
            </div>
            <div className="flex col-span-2 bg-zinc-200 md:col-span-1 rounded-3xl">
              <div className="my-auto ml-10">
                <span className="text-5xl text-blue-600">
                  <IoCall />
                </span>
                <p className="mt-6 text-4xl font-semibold text-black">
                  Estamos aquí para ayudarte
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contacto"
          className="w-full h-screen overflow-auto bg-black"
        >
          <div className="pt-20">
            <h2 className="w-1/2 mx-auto text-4xl font-semibold text-center text-white md:text-6xl">
              Comienza a construir tu futuro financiero con Mint
            </h2>
            <Button
              color="primary"
              size="lg"
              onClick={handleRegPage}
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
