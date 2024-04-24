import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";

export const Step1 = ({
  control,
  nextStep,
  username,
  phone,
  email,
  setUsername,
  setPhone,
  setEmail,
}) => {
  const [usernameError, setUsernameError] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const validatePhone = (value) => value.match(/^\d{10}$/);

  const validateUsername = (value) => value.match(/^[a-zA-Z0-9]+$/);

  const handleUsernameChange = (value) => {
    setUsername(value);
    setUsernameError(
      value
        ? validateUsername(value)
          ? ""
          : "El nombre de usuario no puede contener espacios ni caracteres especiales"
        : "Por favor ingresa un nombre de usuario"
    );
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError(
      value
        ? validateEmail(value)
          ? ""
          : "Por favor ingresa un correo electrónico válido"
        : "El campo es obligatorio"
    );
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setPhoneError(
      value
        ? validatePhone(value)
          ? ""
          : "Por favor ingresa un número de teléfono válido (10 dígitos)"
        : "El campo es obligatorio"
    );
  };

  const isFormValid = username && phone && validateEmail(email);

  const handleNextStep = () => {
    if (!isFormValid) {
      toast.error("Ingresa tus datos correctamente para continuar");
    } else {
      nextStep();
    }
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
            {...control("username", { required: "el campo es obligatorio" })}
            variant="bordered"
            size="lg"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            isInvalid={!!usernameError}
            errorMessage={usernameError}
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
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            isInvalid={!!emailError}
            errorMessage={emailError}
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
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            isInvalid={!!phoneError}
            errorMessage={phoneError}
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
            !isFormValid && !!phoneError && !!emailError && !!usernameError
          }
        >
          Siguiente
        </Button>
      </div>
      <Toaster />
    </>
  );
};
