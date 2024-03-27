import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as UserServices from "../services/user.service";
import * as ClientServices from "../services/client.service";
import Header from "../components/Header";
import { ButtonA } from "../components/ui/ButtonA";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { MintIcon } from "../icons/MintIcon";

export const Register = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const changeStep = () => {
    console.log("hola");
    if (currentIndex < 2) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (currentIndex >= 2) {
      setCurrentIndex(0);
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

  return (
    <div className="flex flex-col min-h-screen ">
      <section className="flex-grow grid grid-cols-2 gap-0">
        {/* Left Side */}
        <div className="flex justify-center items-center">
          <MintIcon className="w-96" />
        </div>

        <div className="bg-cyan-100/70 rounded-ss-[130px] rounded-es-[130px] py-10 max-h-screen">
          <h1 className="text-6xl font-bold mb-10 text-center text-gray-800">
            REGISTRARSE
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
            {currentIndex === 0 ? (
              <Step1 control={register} />
            ) : currentIndex === 1 ? (
              <Step2 control={register} />
            ) : (
              <Step3 control={register} />
            )}

            {currentIndex === 2 ? (
              <ButtonA type="submit">Crear cuenta</ButtonA>
            ) : (
              <></>
            )}

            <p className="text-center text-xl font-semibold pt-8">
              ¿Ya tiene cuenta?{" "}
              <span className="text-sky-700 font-bold">Iniciar Sesión</span>
            </p>
          </form>
        </div>

        {/* <button onClick={changeStep}>Siguiente</button> */}
      </section>
    </div>
  );
};
