import React from "react";
import { IoArrowForwardOutline, IoLogoAndroid } from "react-icons/io5";
import {
  TbCalculatorFilled,
  TbChartAreaFilled,
  TbCoins,
  TbDeviceHeartMonitorFilled,
} from "react-icons/tb";
import { Header } from "../components/dashboard/Header";
import { useNavigate } from "react-router-dom";
import { Button, Chip } from "@nextui-org/react";
import bg2 from "../assets/img/mint-movil.png";
import { Tilt } from "@jdion/tilt-react";
import { TypeAnimation } from "react-type-animation";

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
  const navigate = useNavigate();
  const handleRegPage = () => {
    navigate("/register");
  };

  const caracteristicas = [
    {
      icono: <TbCalculatorFilled className="size-10" />,
      titulo: "Control de gastos",
      texto:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In at facere asperiores, corrupti, ipsa dolorem, aliquid sit odit placeat fugit temporibus? Inventore nisi hic corporis deleniti laudantium accusantium non earum.",
    },
    {
      icono: <TbChartAreaFilled className="size-10" />,
      titulo: "Analisis financiero",
      texto:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In at facere asperiores, corrupti, ipsa dolorem, aliquid sit odit placeat fugit temporibus? Inventore nisi hic corporis deleniti laudantium accusantium non earum.",
    },
    {
      icono: <TbCoins className="size-10" />,
      titulo: "Control de ingresos",
      texto:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In at facere asperiores, corrupti, ipsa dolorem, aliquid sit odit placeat fugit temporibus? Inventore nisi hic corporis deleniti laudantium accusantium non earum.",
    },
    {
      icono: <TbDeviceHeartMonitorFilled className="size-10" />,
      titulo: "Sevicios basicos",
      texto:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In at facere asperiores, corrupti, ipsa dolorem, aliquid sit odit placeat fugit temporibus? Inventore nisi hic corporis deleniti laudantium accusantium non earum.",
    },
  ];
  return (
    <div className="">
      <Header />
      <div className="h-screen overflow-auto bg-white dark:bg-[#1A1A24]">
        {/* Inicio */}
        <section id="home" className="w-full max-h-screen ">
          <div className="grid h-full gap-2 mx-auto space-x-5 md:grid-cols-2">
            <div className="p-10 my-auto md:px-20 lg:col-span-1 md:col-span-2">
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
                <h1 className="mb-3 text-5xl font-bold md:text-7xl text-pretty">
                  Ahorra fresco, vive sin límites 🍃
                </h1>
                <TypeAnimation
                  sequence={[
                    "Control de ingresos 💵",
                    1000,
                    "Control de gastos 📊",
                    1000,
                    "Interfaz intuitiva 🎨",
                    1000,
                    "Establecete metas 🏁",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="text-2xl font-bold text-sky-700"
                  repeat={Infinity}
                />
                <p className="mt-5 text-2xl text-default-700">
                  Mint te ayuda a controlar tus finanzas de una manera ágil y
                  sencilla para mantener una salud financiera.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <Button
                    size="lg"
                    onClick={handleRegPage}
                    className="text-xs text-white transition size-44 md:w-56 md:text-lg bg-sky-700 hover:scale-110"
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
                <img src={bg2} alt="Mint" className="" />
              </div>
            </div>
          </div>
        </section>

        {/* Nosotros */}
        <section id="nosotros" className="flex flex-col w-full min-h-screen">
          <div className="grid w-screen grid-cols-1 h-[700px] lg:grid-cols-3">
            <div className="col-span-1">
              <h2>Seguridad y Confianza</h2>
            </div>
            <div className="grid grid-cols-1 col-span-2 gap-4 p-16 shadow lg:grid-cols-2 bg-gradient-to-b from-sky-200 to-sky-50 rounded-s-3xl">
              {caracteristicas.map((caracteristica, index) => (
                <Tilt>
                  <div key={index} className="col-span-1 lg:col-span-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="p-1 bg-white text-sky-700 rounded-xl">
                        {caracteristica.icono}
                      </span>
                      <h2 className="text-2xl font-semibold">
                        {caracteristica.titulo}
                      </h2>
                    </div>
                    <p>{caracteristica.texto}</p>
                  </div>
                </Tilt>
              ))}
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
