import React, { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Button, Input } from "@nextui-org/react";

export const Step2 = ({ control, nextStep, previousStep, errors, isValid }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");

  return (
    <>
      <div className="mb-8">
        <div className="relative text-3xl font-light">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            label="Contraseña"
            {...control("passwords.password", {
              required: "el campo es obligatorio",
            })}
            variant="bordered"
            size="lg"
            classNames={{ label: "text-2xl" }}
            className="bg-white rounded-2xl"
            isInvalid={!!errors.passwords?.password}
            errorMessage={errors.passwords?.password?.message}
            onChange={(e) => setPassword(e.target.value)}
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
            {...control("passwords.confirmPassword", {
              required: "el campo es obligatorio",
            })}
            variant="bordered"
            size="lg"
            classNames={{ label: "text-2xl" }}
            className="bg-white rounded-2xl"
            isInvalid={!!errors.passwords?.confirmPassword}
            errorMessage={errors.passwords?.confirmPassword?.message}
            onChange={(e) => setPasswordC(e.target.value)}
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
          isDisabled={
            password.length === 0 ||
            errors.passwords?.password ||
            passwordC.length === 0 ||
            errors.passwords?.confirmPassword
              ? true
              : false
          }
        >
          Siguiente
        </Button>
      </div>
    </>
  );
};
