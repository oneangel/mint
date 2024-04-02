import { Button, Input } from "@nextui-org/react";
import { React, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { IoLockClosed } from "react-icons/io5";

export const Step2 = ({ control }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);

  return (
    <>
      <div className="mb-12">
        <Input
          isRequired
          type={showPassword ? "text" : "password"}
          name="password"
          label="Contraseña"
          variant="bordered"
          size="lg"
          {...control("password")}
          className="rounded-2xl bg-white"
          classNames={{ label: "text-2xl" }}
          startContent={
            <IoLockClosed className="text-2xl text-sky-700 pointer-events-none flex-shrink-0" />
          }
          endContent={
            <button className="focus:outline-none my-auto">
              {" "}
              {showPassword ? (
                <GoEyeClosed
                  className="text-2xl text-default-400"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <GoEye
                  className="text-2xl text-default-400"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </button>
          }
        />
      </div>

      <div className="mb-12">
        <Input
          isRequired
          type={showPasswordC ? "text" : "password"}
          name="passwordC"
          label="Confirmar Contraseña"
          variant="bordered"
          size="lg"
          {...control("passwordC")}
          className="rounded-2xl bg-white"
          classNames={{ label: "text-2xl" }}
          startContent={
            <IoLockClosed className="text-2xl text-sky-700 pointer-events-none flex-shrink-0" />
          }
          endContent={
            <button className="focus:outline-none my-auto">
              {" "}
              {showPasswordC ? (
                <GoEyeClosed
                  className="text-2xl text-default-400"
                  onClick={() => setShowPasswordC(false)}
                />
              ) : (
                <GoEye
                  className="text-2xl text-default-400"
                  onClick={() => setShowPasswordC(true)}
                />
              )}
            </button>
          }
        />
      </div>

      <div className="text-center mt-48 flex">
      <Button className="text-sky-700 border border-sky-700 bg-white font-medium rounded-2xl text-4xl py-8 w-full shadow-lg">
        Siguiente
        </Button>
      </div>
    </>
  );
};
