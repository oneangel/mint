import React from "react";
import Spline from "@splinetool/react-spline";
import {
  IoArrowForwardOutline,
  IoCall,
  IoCash,
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
        <section id="home" className="h-screen w-full bg-white">
          <div className="w-full flex flex-wrap h-full">
            <div className="w-1/2">
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

            <div className="w-1/2 flex items-center justify-center">
              <div className="flex items-center justify-center h-full">
                <img src={Analytics} alt="Mint" className="w-2/3" />
              </div>
            </div>
          </div>
        </section>

        {/* Nosotros */}
        <section id="nosotros" className="h-screen w-full bg-white flex">
          <div className="bg-green-500 h-[90%] w-[70%] my-auto mx-auto">
            <div className="w-full h-60 bg-red-500 rounded-3xl">

            </div>
          </div>
        </section>

        <section className="inset-0 -z-10 h-screen w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <h1 className="text-center pt-40 text-sky-700 text-5xl font-semibold">
            Nosotros
          </h1>
          <p className="text-center text-2xl text-default-700 pt-8">
            Comprometidos a operar de acuerdo con los más altos estándares
            éticos en todas nuestras actividades.
          </p>

          <div className="flex flex-wrap mt-20">
            {personas.slice(0, 4).map((persona, index) => (
              <div
                key={index}
                className="w-1/4 flex flex-col items-center justify-center"
              >
                <img
                  src={`https://randomuser.me/api/portraits/men/${index}.jpg`}
                  alt="Profile"
                  className="size-40 object-cover"
                />
                <h2 className="text-lg font-semibold">{persona.nombre}</h2>
                <p className="text-default-700">{persona.rol}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap px-64 mt-20">
            {personas.slice(4).map((persona, index) => (
              <div
                key={index}
                className="w-1/3 flex flex-col items-center justify-center"
              >
                <img
                  src={`https://randomuser.me/api/portraits/men/${
                    index + 4
                  }.jpg`}
                  alt="Profile"
                  className="size-40 object-cover"
                />
                <h2 className="text-lg font-semibold">{persona.nombre}</h2>
                <p className="text-default-700">{persona.rol}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section className="inset-0 -z-10 h-screen w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></section>
      </div>
    </div>
  );
};
