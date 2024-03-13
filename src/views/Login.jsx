import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonA, Input, Label } from "../components/ui/ui-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { IoMailSharp, IoLockClosed } from "react-icons/io5";
import { GoEye, GoEyeClosed } from "react-icons/go";
import * as Services from "../services/user.service";
import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Define states
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await Services.login(data);
      navigate("/home");
      console.log(res);
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("¡Credenciales incorrectas!");
      }

      if (error.response.status === 500) {
        toast.error("¡Error con el servidor!");
      }
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-grow grid grid-cols-2 gap-0">
        {/* Left Side */}
        <div>
          <Header />
          <h1 className="text-8xl font-bold text-start mx-56 my-56 text-gray-800 ">
            INICIAR <p></p> <span className="ml-20">SESIÓN</span>
          </h1>
        </div>

        {/* Right Side / Form */}
        <div className="bg-cyan-100/70 rounded-ss-[130px] rounded-es-[130px] py-28">
          <form className="max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-12">
              <Label htmlFor="email">Correo Electronico</Label>
              <div className="relative text-3xl font-light">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoMailSharp className="text-sky-700" />
                </div>
                <input name="username" {...register("username")} />
                {errors.username && <p>Username is required.</p>}
              </div>
            </div>
            <div className="mb-12">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative text-3xl font-light">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoLockClosed className="text-sky-700" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
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
              <ButtonA type="submit">Iniciar Sesión</ButtonA>
            </div>
            <p className="text-center mt-10 font-bold">
              ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯{" "}
              <span className="font-normal pl-1 text-2xl">o</span>{" "}
              ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
            </p>

            <div className="text-center mt-10">
              <button
                onClick={handleRegisterClick}
                className="text-sky-700 border border-sky-700 bg-white hover:bg-cyan-100 font-medium rounded-2xl text-4xl px-48 py-3 w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Registrarse
              </button>
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
