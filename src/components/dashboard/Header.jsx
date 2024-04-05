import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../../icons/MoonIcon";
import { SunIcon } from "../../icons/SunIcon";
import { MintIcon } from "../../icons/MintIcon";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <nav className="w-screen max-h-20 fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center px-10">
        <ul className="flex flex-wrap items-center py-6 font-normal text-xl">
          <MintIcon className="h-10" />
        </ul>
        <ul className="flex flex-wrap items-center py-6 font-normal text-xl">
          
          <li className="px-6 ">
            <Link to="/">
              <div
                className={`flex items-center justify-center rounded-lg hover:bg-sky-100 hover:scale-110 transition ${
                  location.pathname === "/"
                    ? "bg-sky-100 hover:bg-sky-200 scale-110"
                    : ""
                }`}
              >
                <div
                  className={`flex items-center hover:text-sky-700 p-2 transition font-semibold ${
                    location.pathname === "/"
                      ? "text-sky-700"
                      : "text-zinc-600"
                  }`}
                >
                  <span>Inicio</span>
                </div>
              </div>
            </Link>
          </li>
          <li className="px-6 ">
            <Link to="/">
              <div
                className={`flex items-center justify-center rounded-lg hover:bg-sky-100 hover:scale-110 transition ${
                  location.pathname === "/transfer"
                    ? "bg-sky-100 hover:bg-sky-200 scale-110"
                    : ""
                }`}
              >
                <div
                  className={`flex items-center hover:text-sky-700 p-2 transition ${
                    location.pathname === "/transfer"
                      ? "text-sky-700"
                      : "text-zinc-600"
                  }`}
                >
                  <span>Nosotros</span>
                </div>
              </div>
            </Link>
          </li>
          <li className="px-6 ">
            <Link to="/">
              <div
                className={`flex items-center justify-center rounded-lg hover:bg-sky-100 hover:scale-110 transition ${
                  location.pathname === "/wallet"
                    ? "bg-sky-100 hover:bg-sky-200 scale-110"
                    : ""
                }`}
              >
                <div
                  className={`flex items-center hover:text-sky-700 p-2 transition ${
                    location.pathname === "/wallet"
                      ? "text-sky-700"
                      : "text-zinc-600"
                  }`}
                >
                  <span>Contacto</span>
                </div>
              </div>
            </Link>
          </li>
        </ul>

        <ul className="flex flex-wrap items-center font-normal text-xl">
          <li className="px-3">
            <button onClick={handleLogin} className="px-6 text-white bg-gradient-to-r from-cyan-700 to-cyan-500 hover:to-cyan-700 font-medium rounded-2xl text-2xl py-1.5 w-full">Iniciar Sesión</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
