import React, { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Button, Input } from "@nextui-org/react";

export const Step2 = ({ control, nextStep, previousStep }) => {
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [passwordCIsTouched, setPasswordCIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);

  const isPasswordInvalid = React.useMemo(() => {
    if (password === "" || !passwordIsTouched) return false;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const isLongEnough = password.length >= 8;
    return !(hasNumber && hasLetter && isLongEnough);
  }, [password, passwordIsTouched]);

  const isPasswordCInvalid = React.useMemo(() => {
    if (passwordC === "" || !passwordCIsTouched) return false;
    return passwordC !== password;
  }, [passwordC, passwordCIsTouched, password]);

  const isFormValid = React.useMemo(() => {
    const isAnyFieldTouched = passwordIsTouched || passwordCIsTouched;
    return (
      isAnyFieldTouched &&
      (!passwordIsTouched || !isPasswordInvalid) &&
      (!passwordCIsTouched || !isPasswordCInvalid)
    );
  }, [passwordIsTouched, passwordCIsTouched, isPasswordInvalid, isPasswordCInvalid]);

  return (
    <>
      <div className="mb-8">
        <div className="relative text-3xl font-light">
          <Input
            isRequired
            type={showPassword ? "text" : "password"}
            name="password"
            label="Contraseña"
            {...control("password")}
            variant="bordered"
            size="lg"
            classNames={{ label: "text-2xl" }}
            className="bg-white rounded-2xl"
            onValueChange={(value) => {
              setPassword(value);
              setPasswordIsTouched(true);
            }}
            isInvalid={passwordIsTouched && isPasswordInvalid}
            errorMessage={
              passwordIsTouched &&
              isPasswordInvalid &&
              "La contraseña debe tener al menos 8 caracteres, un número y una letra."
            }
            endContent={
              showPassword ? (
                <GoEyeClosed
                  className="mt-1 text-gray-400"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <GoEye
                  className="mt-1 text-gray-400"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          />
        </div>
      </div>
      <div className="mb-8">
        <div className="relative text-3xl font-light">
          <Input
            isRequired
            type={showPasswordC ? "text" : "password"}
            name="passwordC"
            label="Confirmar Contraseña"
            {...control("passwordC")}
            variant="bordered"
            size="lg"
            classNames={{ label: "text-2xl" }}
            className="bg-white rounded-2xl"
            onValueChange={(value) => {
              setPasswordC(value);
              setPasswordCIsTouched(true);
            }}
            isInvalid={passwordCIsTouched && isPasswordCInvalid}
            errorMessage={passwordCIsTouched && isPasswordCInvalid && "Las contraseñas no coinciden."}
            endContent={
              showPasswordC ? (
                <GoEyeClosed
                  className="mt-1 text-gray-400"
                  onClick={() => setShowPasswordC(false)}
                />
              ) : (
                <GoEye
                  className="mt-1 text-gray-400"
                  onClick={() => setShowPasswordC(true)}
                />
              )
            }
          />
        </div>
      </div>
      <div className="flex gap-4 mt-48 text-center">
        <Button
          className="w-1/2 py-8 text-4xl font-medium bg-white border shadow-lg text-sky-700 border-sky-700 rounded-2xl"
          onClick={previousStep}
        >
          Anterior
        </Button>
        <Button
          type="submit"
          className="w-1/2 py-8 text-4xl font-medium bg-white border shadow-lg text-sky-700 border-sky-700 rounded-2xl"
          onClick={nextStep}
          disabled={!isFormValid}
        >
          Siguiente
        </Button>
      </div>
    </>
  );
};