import { React, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Button, Input } from "@nextui-org/react";
import { IoLockClosed } from "react-icons/io5";

export const Step2 = ({ control, nextStep, previousStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);

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
            className="rounded-2xl bg-white"
            startContent={
              <IoLockClosed className="text-2xl text-sky-700 pointer-events-none flex-shrink-0" />
            }
            endContent={
              showPassword ? (
                <GoEyeClosed
                  className="text-gray-400 mt-1"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <GoEye
                  className="text-gray-400 mt-1"
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
            className="rounded-2xl bg-white"
            startContent={
              <IoLockClosed className="text-2xl text-sky-700 pointer-events-none flex-shrink-0" />
            }
            endContent={
              showPasswordC ? (
                <GoEyeClosed
                  className="text-gray-400 mt-1"
                  onClick={() => setShowPasswordC(false)}
                />
              ) : (
                <GoEye
                  className="text-gray-400 mt-1"
                  onClick={() => setShowPasswordC(true)}
                />
              )
            }
          />
        </div>
      </div>

      <div className="text-center mt-48 flex gap-4">
        <Button
          className="text-sky-700 border border-sky-700 bg-white font-medium rounded-2xl text-4xl py-8 w-1/2 shadow-lg"
          onClick={previousStep}
        >
          Anterior
        </Button>
        <Button
          type="submit"
          className="text-sky-700 border border-sky-700 bg-white font-medium rounded-2xl text-4xl py-8 w-1/2 shadow-lg"
          onClick={nextStep}
        >
          Siguiente
        </Button>
      </div>
    </>
  );
};
