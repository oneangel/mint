import React from "react";
import { Button, Input } from "@nextui-org/react";
import { IoMailSharp, IoCall, IoPersonCircle } from "react-icons/io5";

export const Step1 = ({ control, nextStep }) => {
  return (
    <>
      {/* Username */}
      <div className="mb-8">
        <div className="relative text-3xl font-light">
          <Input
            isRequired
            type="text"
            name="username"
            label="Nombre de Usuario"
            {...control("username")}
            variant="bordered"
            size="lg"
            classNames={{ label: "text-2xl" }}
            className="rounded-2xl bg-white"
            startContent={
              <IoPersonCircle className="text-2xl text-sky-700 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-8">
        <div className="relative text-3xl font-light">
          <Input
            isRequired
            type="email"
            name="email"
            label="Correo Electronico"
            {...control("email")}
            variant="bordered"
            size="lg"
            classNames={{ label: "text-2xl" }}
            className="rounded-2xl bg-white"
            startContent={
              <IoMailSharp className="text-2xl text-sky-700 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
      </div>

      {/*  Phone number */}
      <div className="mb-12">
        <div className="relative text-3xl font-light">
          <Input
            isRequired
            type="text"
            name="phone"
            label="Número de telefono"
            {...control("phone")}
            variant="bordered"
            size="lg"
            classNames={{ label: "text-2xl" }}
            className="rounded-2xl bg-white"
            startContent={
              <IoCall className="text-2xl text-sky-700 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <p className="text-2xl font-light mt-3">
          Al continuar, confirma que está autorizado para utilizar este número
          de teléfono y acepta recibir mensajes de texto.
        </p>
      </div>

      <div className="text-center mt-20">
        <Button
          className="text-sky-700 border border-sky-700 bg-white font-medium rounded-2xl text-4xl py-8 w-full shadow-lg"
          onClick={nextStep}
        >
          Siguiente
        </Button>
      </div>
    </>
  );
};
