import React from "react";
import { IoArrowForwardOutline, IoLogoAndroid } from "react-icons/io5";
import {
  TbCalculatorFilled,
  TbChartAreaFilled,
  TbCircleCheck,
  TbCircleCheckFilled,
  TbCoins,
  TbDeviceHeartMonitorFilled,
} from "react-icons/tb";
import { Header } from "../components/dashboard/Header";
import { useNavigate } from "react-router-dom";
import { Button, Chip } from "@nextui-org/react";
import bg2 from "../assets/img/mint-movil.png";
import { Tilt } from "@jdion/tilt-react";
import { TypeAnimation } from "react-type-animation";
import techforge from "../assets/img/icons/techforge.webp";

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
        "Esta función te permite registrar y categorizar todos tus gastos diarios y mensuales de manera fácil y rápida. Puedes agregar detalles como la fecha, la cantidad gastada y la descripción del gasto (alimentación, transporte, entretenimiento, etc.)",
    },
    {
      icono: <TbChartAreaFilled className="size-10" />,
      titulo: "Analisis financiero",
      texto:
        "Podrás visualizar tus hábitos de gasto y patrones financieros mediante gráficos claros y fáciles de entender. Podrás ver dónde estás gastando más dinero, identificar áreas de mejora y realizar un seguimiento de tu progreso financiero a lo largo del tiempo.",
    },
    {
      icono: <TbCoins className="size-10" />,
      titulo: "Control de ingresos",
      texto:
        "Puedes registrar todos tus ingresos, ya sean salarios, ingresos adicionales, o cualquier otra fuente de ingresos. Puedes categorizar tus ingresos para un mejor seguimiento y establecer metas de ingresos mensuales o anuales. Esta función te ayuda a tener una visión clara de cuánto dinero estás ganando y cómo se compara con tus gastos.",
    },
    {
      icono: <TbDeviceHeartMonitorFilled className="size-10" />,
      titulo: "Sevicios basicos",
      texto:
        "Este módulo te permite llevar un registro detallado de tus gastos en servicios básicos como agua y luz. Puedes ingresar los montos pagados por cada servicio y obtener un análisis detallado de cuánto estás gastando en ellos mes a mes.",
    },
  ];
  return (
    <div className="">
      <Header />
      <div className="h-screen overflow-auto overflow-x-hidden bg-white dark:bg-[#1A1A24] max-w-screen">
        {/* Inicio */}
        <section className="w-full">
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
                  Nuevo
                </Chip>
                <p className="ml-2 text-sm font-semibold">
                  Dashboard Mint 1.0 esta Activo!
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
              <div className="flex items-center justify-center h-[800px]">
                  <img src={bg2} alt="Mint" className="" />
              </div>
            </div>
          </div>
        </section>

        {/* Nosotros */}
        <section className="flex flex-col w-full min-h-screen">
          <div className="grid w-screen h-auto grid-cols-1 min-h-[700px] lg:grid-cols-3">
            <div className="flex flex-col justify-center col-span-1 p-14">
              <h2 className="gap-2 text-6xl font-semibold">
                Administra tu dinero de manera mas organizada
              </h2>
              <p className="mt-14">
                Mantén un registro claro y detallado de todos tus ingresos y
                gastos para entender mejor tus hábitos financieros.
              </p>
              <span className="flex items-center gap-2 mt-5 font-bold text-sky-700">
                <TbCircleCheckFilled className="size-6" />
                <p className="text-sky-600">Seguimiento Detallado</p>
              </span>
              <span className="flex items-center gap-2 mt-2 font-bold text-sky-700">
                <TbCircleCheckFilled className="size-6" />
                <p className="text-sky-600">Categorización Efectiva</p>
              </span>
              <span className="flex items-center gap-2 mt-2 font-bold text-sky-700">
                <TbCircleCheckFilled className="size-6" />
                <p className="text-sky-600">Planificación Financiera</p>
              </span>
            </div>
            <div className="grid grid-cols-1 col-span-2 gap-4 p-16 shadow lg:grid-cols-2 bg-gradient-to-b from-sky-200 to-sky-50 dark:bg-gradient-to-b dark:from-[#232733] dark:to-[#2C2F42] rounded-s-3xl">
              {caracteristicas.map((caracteristica, index) => (
                <Tilt key={index}>
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

        <section className="w-full h-screen overflow-auto bg-black">
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
          <div className="w-[90%] mx-auto">
            <span className="flex items-center gap-2 mt-4">
              <img src={techforge} alt="techforge logo" className="w-16" />
              <p className="text-white">
                © TechForge. Todos los derechos reservados.
              </p>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
