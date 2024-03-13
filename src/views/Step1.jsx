import React from "react";
import { Input, Label } from "../components/ui/ui-components";
import { IoMailSharp, IoCall } from "react-icons/io5";

export const Step1 = ({ control }) => {
  return (
    <>
      {/* Username */}
      <div className="mb-12">
        <Label htmlFor="username">Username</Label>
        <div className="relative text-3xl font-light">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <IoMailSharp className="text-sky-700" />
          </div>
          <input name="username" {...control("username")} />
        </div>
      </div>

      {/* Email */}
      <div className="mb-12">
        <Label htmlFor="email">Email</Label>
        <div className="relative text-3xl font-light">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <IoMailSharp className="text-sky-700" />
          </div>
          <input name="email" {...control("email")} />
        </div>
      </div>

      {/*  Phone number */}
      <div className="mb-12">
        <Label htmlFor="phone">Número de telefono</Label>
        <div className="relative text-3xl font-light">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <IoCall className="text-sky-700" />
          </div>
          <input name="phone" {...control("phone")} />
        </div>
        <p className="text-2xl font-light mt-3">
          Al continuar, confirma que está autorizado para utilizar este número
          de teléfono y acepta recibir mensajes de texto.
        </p>
      </div>

      <div className="text-center mt-40">
        <button className="text-sky-700 border border-sky-700 bg-white hover:bg-cyan-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-4xl px-48 py-3 w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Siguiente
        </button>
      </div>
    </>
  );
};
