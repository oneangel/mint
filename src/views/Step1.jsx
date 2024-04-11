import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";

export const Step1 = ({ control, nextStep }) => {
  const [value, setValue] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [usernameIsTouched, setUsernameIsTouched] = React.useState(false);
  const [phoneIsTouched, setPhoneIsTouched] = React.useState(false);
  const [emailIsTouched, setEmailIsTouched] = React.useState(false);

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isEmailInvalid = React.useMemo(() => {
    if (value === "" || !emailIsTouched) return false;
    return validateEmail(value) ? false : true;
  }, [value, emailIsTouched]);

  const isFormValid = React.useMemo(() => {
    const isAnyFieldTouched = usernameIsTouched || phoneIsTouched || emailIsTouched;
    return (
      isAnyFieldTouched &&
      (username !== "" || !usernameIsTouched) &&
      (phone !== "" || !phoneIsTouched) &&
      (!emailIsTouched || !isEmailInvalid)
    );
  }, [username, phone, isEmailInvalid, usernameIsTouched, phoneIsTouched, emailIsTouched]);

  const handleNextStep = () => {
    if (!isFormValid) {
      toast.error("Ingresa tus datos para continuar");
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
            {...control("username")}
            variant="bordered"
            size="lg"
            onValueChange={(value) => {
              setUsername(value);
              setUsernameIsTouched(true);
            }}
            isInvalid={usernameIsTouched && username === ""}
            errorMessage={usernameIsTouched && username === "" && "Por favor ingresa un nombre de usuario"}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-8">
        <div className="relative text-3xl font-light">
          <Input
            value={value}
            type="email"
            label="Correo Electronico"
            variant="bordered"
            {...control("email")}
            isInvalid={isEmailInvalid}
            errorMessage={isEmailInvalid && "Por favor ingresa un correo valido"}
            onValueChange={(value) => {
              setValue(value);
              setEmailIsTouched(true);
            }}
            size="lg"
          />
        </div>
      </div>

      {/* Phone number */}
      <div className="mb-12">
        <div className="relative text-3xl font-light">
          <Input
            type="text"
            name="phone"
            label="Número de telefono"
            {...control("phone")}
            variant="bordered"
            size="lg"
            onValueChange={(value) => {
              setPhone(value);
              setPhoneIsTouched(true);
            }}
            isInvalid={phoneIsTouched && phone === ""}
            errorMessage={phoneIsTouched && phone === "" && "Por favor ingresa un número de teléfono"}
          />
        </div>
        <p className="mt-3 text-2xl font-light">
          Al continuar, confirma que está autorizado para utilizar este número de teléfono y acepta recibir mensajes de texto.
        </p>
      </div>

      <div className="mt-20 text-center">
        <Button
          className="w-full py-8 text-4xl font-medium bg-white border shadow-lg text-sky-700 border-sky-700 rounded-2xl"
          onClick={handleNextStep}
        >
          Siguiente
        </Button>
      </div>
      <Toaster />
    </>
  );
};