import React from "react";
import Spline from "@splinetool/react-spline";
import { IoCall, IoCash, IoShieldCheckmark } from "react-icons/io5";
import { Header } from "../components/dashboard/Header";

const personas = [
  { nombre: "Ricardo López", rol: "Rol de la persona" },
  { nombre: "Carlos Marín", rol: "Rol de la persona" },
  { nombre: "Elio Luján", rol: "Rol de la persona" },
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
        <section
          id="home"
          className="inset-0 -z-10 h-screen w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] flex flex-col justify-center items-center"
        >
          <h1 className="text-center text-8xl text-sky-700 pt-10 20 font-semibold">
            Mint
          </h1>
          <h2 className="text-center text-3xl mt-8 font-light text-neutral-700">
            Ahorra fresco, vive sin límites.
          </h2>
          <div className="justify-center flex">
            <div className="">
              <Spline scene="https://prod.spline.design/mBSc-eUub6dBJsu8/scene.splinecode" />
            </div>
          </div>
        </section>

        {/* Nosotros */}
        <section
          id="nosotros"
          className="inset-0 -z-10 h-screen w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] flex flex-col justify-center items-center"
        >
          <div className="bg-white w-10/12 h-4/5 border border-default-200 rounded-3xl shadow-xl">
            <h1 className="text-center mt-10 text-sky-700 text-5xl font-semibold">
              Seguridad y Confianza
            </h1>

            <div className="flex flex-wrap w-full mt-14">
              <div className="w-1/3 text-2xl flex flex-col items-center">
                <div className="flex justify-center">
                  <IoCash className="text-6xl text-default-700" />
                </div>
                <div className="mt-5 text-center px-10">
                  <h2 className="text-default-800 font-medium">
                    Fácil acceso a tus ingresos
                  </h2>
                  <p className="text-pretty text-default-600">
                    Acceso rápido y sencillo a tus ingresos para una mejor
                    visualización, análisis y control.
                  </p>
                </div>
              </div>

              <div className="w-1/3 text-2xl flex flex-col items-center">
                <div className="flex justify-center">
                  <IoShieldCheckmark className="text-6xl text-default-700" />
                </div>

                <div className="mt-5 text-center px-10">
                  <h2 className="text-default-800 font-medium">
                    Tus ingresos están protegidos
                  </h2>
                  <p className="text-pretty text-default-600">
                    Proteges tus ingresos gracias a nuestra seguridad,
                    mostrandote donde puedes mejorar para no perder ingresos.
                  </p>
                </div>
              </div>

              <div className="w-1/3 text-2xl flex flex-col items-center">
                <div className="flex justify-center">
                  <IoCall className="text-6xl text-default-700" />
                </div>

                <div className="mt-5 text-center px-10">
                  <h2 className="text-default-800 font-medium">
                    Estamos aquí para ayudarte
                  </h2>
                  <p className="text-pretty text-default-600">
                    Nuestro gran equipo de atención al cliente está listo para
                    responder a tus preguntas al momento que nos necesites.
                  </p>
                </div>
              </div>
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
