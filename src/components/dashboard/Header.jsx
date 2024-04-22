import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    localStorage.getItem("token") != null
      ? navigate("/home")
      : navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 bg-white shadow dark:bg-zinc-900">
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
            <a
              className={`px-3 py-2 transition-colors text-zinc-700 dark:text-zinc-200 ${
                location.hash === "#home" ? "text-sky-500" : ""
              }`}
              href="#home"
            >
              Inicio
            </a>
            <a
              className={`px-3 py-2 transition-colors text-zinc-700 dark:text-zinc-200 ${
                location.hash === "#nosotros" ? "text-sky-500" : ""
              }`}
              href="#nosotros"
            >
              Nosotros
            </a>
            <a
              className={`px-3 py-2 transition-colors text-zinc-700 dark:text-zinc-200 ${
                location.hash === "#contacto" ? "text-sky-500" : ""
              }`}
              href="#contacto"
            >
              Contacto
            </a>
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
              ? "Iniciar Sesíon"
              : "Iniciar Sesíon"}
          </Button>
        </div>
      </div>

      {/* Links movil */}
      {isMenuOpen && (
        <div className="py-2 space-y-1 border-t md:hidden">
          <a
            href="#home"
            className="block px-3 py-2 rounded-md text-zinc-700 hover:bg-primary hover:text-white dark:text-zinc-200 dark:hover:text-white"
          >
            Inicio
          </a>
          <a
            href="#nosotros"
            className="block px-3 py-2 rounded-md text-zinc-700 hover:bg-primary hover:text-white dark:text-zinc-200 dark:hover:text-white"
          >
            Nosotros
          </a>
          <a
            href="#contacto"
            className="block px-3 py-2 rounded-md text-zinc-700 hover:bg-primary hover:text-white dark:text-zinc-200 dark:hover:text-white"
          >
            Contacto
          </a>
        </div>
      )}
    </header>
  );
};
