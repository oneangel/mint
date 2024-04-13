import { React, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
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
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  //Define states
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  /* It use the method login of service.js and update the goblal
  state of login and finally it sets a token and a username
  in the localstorage */
  const loginMutation = useMutation(userService.login, {
    onSuccess: (res) => {
      auth.login(res.data.token);
      localStorage.setItem("username", res.data.username);
      toast.dismiss();
      toast.success("Bienvenido");
      navigate("/home");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Credenciales incorrectas");
      console.log(error);
    },
    onMutate: () => {
      toast.loading("Iniciando sesion...");
    },
  });

  const onSubmit = async (data) => {
    try {
      loginMutation.mutate(data);
      if (loginMutation.isLoading && !loginMutation.isSuccess) {
        toast.success("Bienvenido");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

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
          <h1 className="mb-10 text-6xl font-bold text-center text-gray-800 dark:text-white ">
            INICIAR SESIÓN
          </h1>
          <form className="max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-12">
              <div className="">
                <Input
                  type="text"
                  name="username"
                  label="Usuario"
                  variant="bordered"
                  {...register("username", {
                    required: "el campo es obligatorio",
                  })}
                  size="lg"
                  classNames={{ label: "text-2xl" }}
                  className="bg-white rounded-2xl dark:bg-zinc-800"
                  startContent={
                    <IoMailSharp className="flex-shrink-0 text-2xl pointer-events-none text-sky-700" />
                  }
                />
              </div>
            </div>
            <div className="mb-12">
              <div className="">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Contraseña"
                  variant="bordered"
                  size="lg"
                  {...register("password", {
                    required: "el campo es obligatorio",
                  })}
                  className="bg-white rounded-2xl dark:bg-zinc-800"
                  classNames={{ label: "text-2xl" }}
                  startContent={
                    <IoLockClosed className="flex-shrink-0 text-2xl pointer-events-none text-sky-700" />
                  }
                  endContent={
                    <div className="my-auto focus:outline-none">
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
                    </div>
                  }
                />
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
                className="w-full py-8 text-4xl font-medium text-white transition shadow-lg bg-sky-700 hover:bg-sky-600 hover:scale-110"
                onClick={() => {
                  handleSubmit(onSubmit);
                }}
                isDisabled={!isValid}
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
                className="w-full py-8 text-4xl font-medium transition bg-white border shadow-lg text-sky-700 border-sky-700 rounded-2xl hover:bg-sky-100 hover:scale-110"
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
      </div>

      <Toaster />
    </div>
  );
};
