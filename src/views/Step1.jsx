import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";

export const Step1 = ({ control, nextStep, errors, isValid }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleNextStep = () => {
    nextStep();
  };

  return (
    <>
      {/* Username */}
      <div className="mb-8">
        <div className="relative text-3xl font-light">
          <Input
            type="text"
            name="username"
            label="Nombre de Usuario"
            {...control("username", { required: "El campo es obligatorio" })}
            variant="bordered"
            size="lg"
            onChange={(e) => setUsername(e.target.value)}
            isInvalid={!!errors.username}
            errorMessage={errors.username ? errors.username.message : ""}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-8">
        <div className="relative text-3xl font-light">
          <Input
            type="email"
            name="email"
            label="Correo Electrónico"
            {...control("email", { required: "el campo es obligatorio" })}
            variant="bordered"
            size="lg"
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
            errorMessage={errors.email ? errors.email.message : ""}
          />
        </div>
      </div>

      {/* Phone number */}
      <div className="mb-12">
        <div className="relative text-3xl font-light">
          <Input
            type="text"
            name="phone"
            label="Número de Teléfono"
            {...control("phone", { required: "el campo es obligatorio" })}
            variant="bordered"
            size="lg"
            onChange={(e) => setPhone(e.target.value)}
            isInvalid={!!errors.phone}
            errorMessage={errors.phone ? errors.phone.message : ""}
          />
        </div>
        <p className="mt-3 text-2xl font-light">
          Al continuar, confirma que está autorizado para utilizar este número
          de teléfono y acepta recibir mensajes de texto.
        </p>
      </div>

      <div className="mt-20 text-center">
        <Button
          className="w-full py-8 text-4xl font-medium bg-white border shadow-lg text-sky-700 border-sky-700 rounded-2xl"
          onClick={handleNextStep}
          isDisabled={
            username.length === 0 ||
            errors.username ||
            email.length === 0 ||
            errors.email ||
            phone.length === 0 ||
            errors.phone
              ? true
              : false
          }
        >
          Siguiente
        </Button>
      </div>
      <Toaster />
    </>
  );
};
