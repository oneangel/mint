import { React, useState } from "react";
import { Input, Label } from "../components/ui/ui-components";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { IoLockClosed } from "react-icons/io5";

export const Step2 = ({ control, nextStep, previousStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);

  return (
    <>
      <div className="mb-12">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative text-3xl font-light">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <IoLockClosed className="text-sky-700" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            {...control("password")}
          />
          <div className="absolute inset-y-0 end-5 flex items-center ps-3.5">
            {showPassword ? (
              <GoEyeClosed
                className="text-gray-400 mt-1"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <GoEye
                className="text-gray-400 mt-1"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="mb-12">
        <Label htmlFor="passwordC">Confirmar Contraseña</Label>
        <div className="relative text-3xl font-light">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <IoLockClosed className="text-sky-700" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="passwordC"
            {...control("passwordC")}
          />
          <div className="absolute inset-y-0 end-5 flex items-center ps-3.5">
            {showPasswordC ? (
              <GoEyeClosed
                className="text-gray-400 mt-1"
                onClick={() => setShowPasswordC(false)}
              />
            ) : (
              <GoEye
                className="text-gray-400 mt-1"
                onClick={() => setShowPasswordC(true)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-48 flex">
        <button
          className="text-sky-700 border border-sky-700 bg-white font-medium rounded-2xl text-4xl px-20 py-3 w-1/2 flex justify-center mx-2"
          onClick={previousStep}
        >
          Anterior
        </button>
        <button
          type="submit"
          className="text-sky-700 border border-sky-700 bg-white font-medium rounded-2xl text-4xl px-20 py-3 w-1/2 flex justify-center"
          onClick={nextStep}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};
