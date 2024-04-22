import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { userService, clientService } from "../services/services";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { MintIconL } from "../icons/MintIconL";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import secureimg from '../assets/img/secure.png'

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

  const registerUserMutation = useMutation(userService.registerUser, {
    onError: (error) => {
      toast.dismiss();
      toast.error("Hubo un error en el registro");
      console.log(error);
    },
    onMutate: () => {
      toast.loading("Registrando...");
    },
  });

  const registerClientMutation = useMutation(clientService.registerClient, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Registro exitoso");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Hubo un error en el registro");
      console.log(error);
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      registerUserMutation.mutateAsync(data).then(() => {
        registerClientMutation.mutate(data);
        /* if (registerUserMutation.isSuccess) {
          return registerClientMutation.mutate(data);
        } else {
          console.log("Hubo un error");
        } */
      });
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
        <div className="flex flex-wrap items-center justify-center max-w-3xl p-10 py-20 mx-auto my-auto bg-white dark:bg-zinc-800 rounded-3xl">
          <h1 className="text-5xl font-semibold w-80 text-sky-700">Tus ingresos están protegidos</h1>
          <img src={secureimg} alt="" />
        </div>
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
      <Toaster />
    </div>
  );
};
