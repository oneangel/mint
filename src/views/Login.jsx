import { React, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { ButtonA, Label } from "../components/ui/ui-components";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { IoMailSharp, IoLockClosed } from "react-icons/io5";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { userService } from "../services/services";
import toast, { Toaster } from "react-hot-toast";
import { MintIcon } from "../icons/MintIcon";
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
      <section className="flex-grow grid grid-cols-2 gap-0">
        {/* Left Side */}
        <div className="flex justify-center items-center">
          <MintIcon className="w-96" />
        </div>

        {/* Right Side / Form */}
        <div className="bg-cyan-100/70 rounded-ss-[130px] rounded-es-[130px] py-28 max-h-screen">
          <h1 className="text-6xl font-bold text-start mx-56 mb-10 text-gray-800 ">
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
                  className="rounded-2xl bg-white"
                  startContent={
                    <IoMailSharp className="text-2xl text-sky-700 pointer-events-none flex-shrink-0" />
                  }
                />
                {/* <input
                  name="username"
                  {...register("username")}
                  className="bg-white border border-gray- text-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-14 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                /> */}
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
                  className="rounded-2xl bg-white"
                  classNames={{ label: "text-2xl" }}
                  startContent={
                    <IoLockClosed className="text-2xl text-sky-700 pointer-events-none flex-shrink-0" />
                  }
                />
                {/* <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="bg-white border border-gray- text-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-14 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                /> */}
                {errors.password && <p>Last name is required.</p>}
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

              <div className="text-end mt-3 mb-14">
                <a
                  href="/forgotpassword"
                  className="text-sky-700 text-xl font-bold"
                >
                  ¿Olvidó su contraseña?
                </a>
              </div>
            </div>
            <div className="text-center">
              <Button
                size="lg"
                type="submit"
                className="bg-gradient-to-r from-cyan-700 to-cyan-500 hover:to-cyan-700 font-medium text-4xl w-full py-8 text-white shadow-lg"
              >
                Iniciar Sesión
              </Button>
            </div>
            <p className="text-center mt-10 font-bold">
              ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯{" "}
              <span className="font-normal pl-1 text-2xl">o</span>{" "}
              ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
            </p>

            <div className="text-center mt-10">
              <Button
                onClick={handleRegisterClick}
                className="text-sky-700 border border-sky-700 bg-white font-medium rounded-2xl text-4xl py-8 w-full shadow-lg"
              >
                Registrarse
              </Button>
            </div>
            <p className="text-center text-xl font-semibold mt-6">
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
