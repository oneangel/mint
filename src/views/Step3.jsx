import { React, useState } from "react";
import { ButtonA, Input, Label } from "../components/ui/ui-components";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export const Step3 = ({ onPrevStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Lógica de inicio de sesión
    navigate("/home");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-grow grid grid-cols-2 gap-0">
        {/* Left Side */}
        <div className="">
          <Header />
          <h1 className="text-center text-8xl font-bold text-gray-800 pt-60">
            REGISTRARSE
          </h1>
          <p className="pl-40 text-3xl text-pretty text">Asegúrese de que coincida con su identificación oficial.</p>
        </div>

        {/* Right Side / Form */}
        <div className="bg-cyan-100/70 rounded-ss-[130px] rounded-es-[130px] py-28">
          <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
            <div className="mb-12">
              <Label htmlFor="text">Nombre legal</Label>
              <div className="relative text-3xl font-light">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Nombre legal"
                />
              </div>
            </div>
            <div className="mb-12">
              <Label htmlFor="text">Apellidos legales</Label>
              <div className="relative text-3xl font-light">
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  placeholder="Apellidos legales"
                />
              </div>
            </div>
            <div className="mb-12">
              <Label htmlFor="email">Fecha de nacimiento</Label>
              <div className="relative text-3xl font-light">
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  placeholder="Fecha de nacimiento"
                />
              </div>
            </div>

            <div className="text-center pt-20">
              <button onClick={onPrevStep} className="text-sky-700 border border-sky-700 bg-white hover:bg-cyan-100 font-medium rounded-2xl text-4xl px-48 py-3 w-full mb-6">Anterior</button>
              <ButtonA type="sumbit">Crear Cuenta</ButtonA>
            </div>
            <p className="text-center text-xl font-semibold mt-10">
              ¿Ya tiene cuenta?{" "}
              <span className="text-sky-700 font-bold">Iniciar Sesión</span>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};
