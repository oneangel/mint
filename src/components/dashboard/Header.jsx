import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { MintIcon } from "../../icons/MintIcon";
import { MintIconL } from "../../icons/MintIconL";
import { IoMenu, IoMoon, IoSunny } from "react-icons/io5";
import { Button } from "@nextui-org/react";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [themeIcon, setThemeIcon] = useState(
    theme === "light" ? (
      <IoMoon className="size-6" />
    ) : (
      <IoSunny className="size-6" />
    )
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setThemeIcon(
      newTheme === "light" ? (
        <IoMoon className="size-6" />
      ) : (
        <IoSunny className="size-6" />
      )
    );
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getActiveClassName = (isActive) =>
    `block px-3 py-2 rounded-md hover:bg-primary hover:text-white dark:text-zinc-200 dark:hover:text-white ${
      isActive ? "bg-sky-700 text-white" : ""
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 bg-white shadow dark:bg-[#232733]">
      <div className="flex items-center justify-between h-16 mx-auto lg:px-20 ">
        <button
          onClick={toggleMenu}
          className="flex p-1 -ml-1 transition-colors rounded md:hidden text-zinc-500 hover:bg-primary hover:text-slate-200 focus:ring-2 focus:ring-slate-200 dark:text-zinc-200"
        >
          <IoMenu className="size-8" />
        </button>
        <Link
          to="/"
          className="hidden transition duration-200 hover:rotate-6 hover:scale-110 md:flex"
        >
          <MintIcon className="w-10 dark:hidden" />
          <MintIconL className="hidden w-10 dark:flex" />
        </Link>
        <div className="flex items-center -mr-4">
          <Link
            to="/"
            className="flex transition duration-200 hover:rotate-6 hover:scale-110 md:hidden"
          >
            <MintIcon className="w-10 dark:hidden" />
            <MintIconL className="hidden w-10 dark:flex" />
          </Link>
          <div className="hidden ml-8 space-x-8 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-sky-700 font-semibold hover:text-sky-500 hover:scale-110 transition" : "text-zinc-700 dark:text-zinc-200 hover:text-sky-500 hover:scale-110 transition"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/nosotros"
              className={({ isActive }) =>
                isActive ? "text-sky-700 font-semibold hover:text-sky-500 hover:scale-110 transition" : "text-zinc-700 dark:text-zinc-200 hover:text-sky-500 hover:scale-110 transition"
              }
            >
              Nosotros
            </NavLink>
            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                isActive ? "text-sky-700 font-semibold hover:text-sky-500 hover:scale-110 transition" : "text-zinc-700 dark:text-zinc-200 hover:text-sky-500 hover:scale-110 transition"
              }
            >
              Contacto
            </NavLink>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-200 dark:hover:text-white"
            onClick={handleChangeTheme}
          >
            {themeIcon}
          </button>
          <Button className="text-white bg-sky-700" onClick={handleLogin}>
            {localStorage.getItem("token") != null
              ? "Dashboard"
              : "Iniciar Sesión"}
          </Button>
        </div>
      </div>

      {/* Links movil */}
      {isMenuOpen && (
        <div className="py-2 space-y-1 border-t md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) => getActiveClassName(isActive)}
          >
            Inicio
          </NavLink>

          <NavLink
            to="/nosotros"
            className={({ isActive }) => getActiveClassName(isActive)}
          >
            Nosotros
          </NavLink>

          <NavLink
            to="/contacto"
            className={({ isActive }) => getActiveClassName(isActive)}
          >
            Contacto
          </NavLink>
        </div>
      )}
    </header>
  );
};
