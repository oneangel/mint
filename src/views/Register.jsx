import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as UserServices from "../services/user.service";
import * as ClientServices from "../services/client.service";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { MintIconL } from "../icons/MintIconL";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

export const Register = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const nextStep = () => {
    console.log("hola");
    if (currentIndex < 2) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (currentIndex >= 2) {
      setCurrentIndex(0);
    }
  };

  const previousStep = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      setCurrentIndex(2);
    }
  };

  const onSubmit = async (data) => {
    try {
      const resUser = await UserServices.registerUser({
        username: data.username,
        password: data.password,
      });
      const resClient = await ClientServices.registerClient(data);
      console.log(resUser);
      console.log(resClient);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-2 bg-zinc-700">
      <div className="flex-col col-span-1 lg:flex hidden bg-[#3E70A1]">
        <header className="flex items-center mx-auto h-36">
          <Link
            to="/"
            className="transition duration-200 hover:rotate-6 hover:scale-110"
          >
            <MintIconL className="w-16" />
          </Link>
        </header>
        <div className="flex flex-col max-w-3xl mx-auto my-auto bg-white h-[400px] dark:bg-zinc-800 rounded-3xl">
          <h1 className="mx-10 mt-6 text-5xl font-semibold text-sky-700 dark:text-sky-400">
            Alcanza tus metas financieras más rápido
          </h1>
          <p className="mx-10 mt-16 text-2xl">
            Utiliza Mint y controla tus finanzas de forma ágil y sencilla.
          </p>
          <Button
            color="primary"
            size="lg"
            className="w-40 mx-10 mt-10 bg-sky-600"
            onClick={handleHome}
          >
            Leer más
          </Button>
        </div>
        <p className="max-w-3xl mx-auto mb-20 text-xl text-white">
          Analizar tus gastos anteriores garantiza una mejor retroalimentacion y
          control al tomar una decisión financiera.{" "}
        </p>
      </div>
      <div className="flex flex-col col-span-2 bg-white md:col-span-1 dark:bg-zinc-900">
        <div className="my-auto">
          <h1 className="mb-10 text-6xl font-bold text-center text-gray-800">
            REGISTRARSE
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
            {currentIndex === 0 ? (
              <Step1 control={register} nextStep={nextStep} />
            ) : currentIndex === 1 ? (
              <Step2
                control={register}
                nextStep={nextStep}
                previousStep={previousStep}
              />
            ) : (
              <Step3 control={register} previousStep={previousStep} />
            )}

            {currentIndex === 2 ? (
              <Button
                type="submit"
                isDisabled={!isValid}
                className="w-full px-5 py-8 text-4xl font-medium text-white shadow-md bg-gradient-to-r from-cyan-700 to-cyan-500 hover:to-cyan-700 rounded-2xl"
              >
                Crear cuenta
              </Button>
            ) : (
              <></>
            )}

            <p className="pt-8 text-xl font-semibold text-center">
              ¿Ya tiene cuenta?{" "}
              <Link
                className="font-bold text-sky-700 hover:text-sky-400"
                to="/login"
              >
                Iniciar Sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
