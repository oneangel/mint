import  React from "react";
import { ButtonA, Input, Label } from "../components/ui/ui-components";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { IoMailSharp, IoCall  } from "react-icons/io5";


export const Register = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-grow grid grid-cols-2 gap-0">
        {/* Left Side */}
        <div className="text-center">
          <Header />
          <h1 className="text-8xl font-bold text-gray-800 py-48">
            REGISTRARSE
          </h1>
        </div>

        {/* Right Side / Form */}
        <div className="bg-cyan-100/70 rounded-ss-[130px] rounded-es-[130px] py-28">
          <form className="max-w-xl mx-auto">
            {/* Campos */}
            <div className="mb-12">
              <Label htmlFor="email">Correo Electronico</Label>
              <div className="relative text-3xl font-light">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoMailSharp className="text-sky-700" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="mint@gmail.com"
                />
              </div>
            </div>
            
            <div className="mb-12">
              <Label htmlFor="phone">Número de telefono</Label>
              <div className="relative text-3xl font-light">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoCall className="text-sky-700" />
                </div>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  placeholder="+54 555 555 5555"
                />
              </div>
              <p className="text-2xl font-light mt-3">Al continuar, confirma que está autorizado para utilizar este número de teléfono y acepta recibir mensajes de texto.</p>
            </div>

            <div className="text-center mt-40">
              <Link
                to="/register"
                className="text-sky-700 border border-sky-700 bg-white hover:bg-cyan-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-4xl px-48 py-3 w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Siguiente
              </Link>
            </div>
            <p className="text-center text-xl font-semibold mt-10">
            ¿Ya tiene cuenta?{" "}
              <span className="text-sky-700 font-bold">Iniciar Sesión</span>
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}
