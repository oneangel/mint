import {React, useState} from "react";
import { Input, Label } from "../components/ui/ui-components";
import Header from "../components/Header";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { IoLockClosed } from "react-icons/io5";

export const Step2 = ({ onNextStep, onPrevStep }) => {
  const handleClick = () => {
    onNextStep();
  };
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <section className="flex-grow grid grid-cols-2 gap-0">
          {/* Left Side */}
          <div className="text-center">
            <Header />
            <h1 className="text-8xl font-bold text-gray-800 py-48">
              REGISTRARSE
            </h1>
          </div>

          {/* Right Side / Form */}
          <div className="bg-cyan-100/70 rounded-ss-[130px] rounded-es-[130px] py-28">
            <form className="max-w-xl mx-auto" onSubmit={handleClick}>
              {/* Campos */}
              <div className="mb-12">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative text-3xl font-light">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <IoLockClosed className="text-sky-700" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Contraseña"
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
                  <Input
                    type={showPasswordC ? "text" : "password"}
                    id="passwordC"
                    placeholder="Confirmar Contraseña"
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
                  onClick={onPrevStep}
                  className="text-sky-700 border border-sky-700 bg-white font-medium rounded-2xl text-4xl px-20 py-3 w-1/2 flex justify-center mx-2"
                >
                  Anterior
                </button>
                <button
                  type="submit"
                  className="text-sky-700 border border-sky-700 bg-white font-medium rounded-2xl text-4xl px-20 py-3 w-1/2 flex justify-center"
                >
                  Siguiente
                </button>
              </div>
              <p className="text-center text-xl font-semibold mt-10">
                ¿Ya tiene cuenta?{" "}
                <span className="text-sky-700 font-bold">Iniciar Sesión</span>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
