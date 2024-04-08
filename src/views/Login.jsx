import { React, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { IoMailSharp, IoLockClosed } from "react-icons/io5";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { userService } from "../services/services";
import toast, { Toaster } from "react-hot-toast";
import { MintIcon } from "../icons/MintIcon";
import { MintIconL } from "../icons/MintIconL";
import { useMutation, QueryCache } from "react-query";


export const Login = () => {
  //Create an instance to use our global context
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Define states
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  /* It use the method login of service.js and update the goblal
  state of login and finally it sets a token and a username
  in the localstorage */
  const loginMutation = useMutation(userService.login, {
    onSuccess: (res) => {
      console.log(res);
      auth.login();
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/home");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (data) => {
    try {
      loginMutation.mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="grid grid-cols-2 lg:flex-grow">
        {/* Left Side */}
        <div className="flex items-center justify-center ">
          <MintIcon className="hidden col-span-1 w-96 xl:flex dark:xl:hidden" />
          <MintIconL className="hidden col-span-1 w-96 xl:flex dark:xl:flex" />
        </div>

        {/* Right Side / Form */}
        <div className="bg-cyan-100 dark:bg-zinc-900 xl:rounded-ss-[130px] xl:rounded-es-[130px] py-28 max-h-screen col-span-2 xl:col-span-1">
          <h1 className="mb-10 text-6xl font-bold text-center text-gray-800 dark:text-white ">
            INICIAR SESIÓN
          </h1>
          <form className="max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-12">
              <div className="">
                <Input
                  isRequired
                  type="text"
                  name="username"
                  label="Usuario"
                  variant="bordered"
                  {...register("username")}
                  size="lg"
                  classNames={{ label: "text-2xl" }}
                  className="bg-white rounded-2xl dark:bg-zinc-800"
                  startContent={
                    <IoMailSharp className="flex-shrink-0 text-2xl pointer-events-none text-sky-700" />
                  }
                />
                {errors.username && <p>Username is required.</p>}
              </div>
            </div>
            <div className="mb-12">
              <div className="">
                <Input
                  isRequired
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Contraseña"
                  variant="bordered"
                  size="lg"
                  {...register("password")}
                  className="bg-white rounded-2xl dark:bg-zinc-800"
                  classNames={{ label: "text-2xl" }}
                  startContent={
                    <IoLockClosed className="flex-shrink-0 text-2xl pointer-events-none text-sky-700" />
                  }
                  endContent={
                    <button className="my-auto focus:outline-none">
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
                {errors.password && <p>Last name is required.</p>}
              </div>

              <div className="mt-3 text-end mb-14">
                <a
                  href="/forgotpassword"
                  className="text-xl font-bold text-sky-700"
                >
                  ¿Olvidó su contraseña?
                </a>
              </div>
            </div>
            <div className="text-center">
              <Button
                size="lg"
                type="submit"
                className="w-full py-8 text-4xl font-medium text-white shadow-lg bg-gradient-to-r from-cyan-700 to-cyan-500 hover:to-cyan-700"
              >
                Iniciar Sesión
              </Button>
            </div>
            <p className="mt-10 font-bold text-center">
              ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯{" "}
              <span className="pl-1 text-2xl font-normal">o</span>{" "}
              ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
            </p>

            <div className="mt-10 text-center">
              <Button
                onClick={handleRegisterClick}
                className="w-full py-8 text-4xl font-medium bg-white border shadow-lg text-sky-700 border-sky-700 rounded-2xl"
              >
                Registrarse
              </Button>
            </div>
            <p className="mt-6 text-xl font-semibold text-center">
              Registrándose en nuestros{" "}
              <span className="text-sky-700">Términos y Condiciones</span>
            </p>
          </form>
        </div>
      </section>
      <Toaster />
    </div>
  );
};
