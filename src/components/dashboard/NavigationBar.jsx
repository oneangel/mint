import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Switch,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import { MoonIcon } from "../../icons/MoonIcon";
import { SunIcon } from "../../icons/SunIcon";
import {
  IoHome,
  IoNotifications,
  IoPersonSharp,
  IoSwapVerticalOutline,
  IoWallet,
  IoSpeedometerSharp,
  IoMenu,
  IoSettingsOutline,
  IoLogOutOutline,
  IoMoon,
  IoSunny,
} from "react-icons/io5";
import { MintIcon } from "../../icons/MintIcon";
import { getClient } from "../../hooks/client.hooks";
import { MintIconL } from "../../icons/MintIconL";

export const NavigationBar = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showMenu, setShowMenu] = useState(false);

  const { data, isLoading, isError } = useQuery("client", getClient);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  // Definir la lista de enlaces
  const navLinks = [
    { path: "/home", text: "Inicio", icon: <IoHome /> },
    { path: "/transfer", text: "Transacción", icon: <IoSwapVerticalOutline /> },
    { path: "/wallet", text: "Cartera", icon: <IoWallet /> },
    { path: "/services", text: "Servicios", icon: <IoSpeedometerSharp /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 px-6 bg-white shadow dark:bg-zinc-900">
      <div className="flex items-center justify-between h-16 mx-auto max-w-7xl ">
        <button
          onClick={toggleMenu}
          className="flex p-1 -ml-1 transition-colors rounded md:hidden text-zinc-500 hover:bg-primary hover:text-slate-200 focus:ring-2 focus:ring-slate-200 dark:text-zinc-200"
        >
          <IoMenu className="size-8" />
        </button>
        <Link
          to="/home"
          className="hidden transition duration-200 hover:rotate-6 hover:scale-110 md:flex"
        >
          <MintIcon className="w-8 dark:hidden" />
          <MintIconL className="hidden w-8 dark:flex" />
        </Link>
        <div className="flex items-center -mr-4">
          <a
            href="#home"
            className="flex transition duration-200 hover:rotate-6 hover:scale-110 md:hidden"
          >
            <MintIcon className="w-8 dark:hidden" />
            <MintIconL className="hidden w-8 dark:flex" />
          </a>
          <div className="hidden ml-8 space-x-8 md:flex">
            {navLinks.map((link, index) => (
              <Link to={link.path} key={index}>
                <div
                  className={`flex items-center justify-center rounded-lg hover:bg-sky-100 dark:hover:bg-sky-600 hover:scale-110 transition ${
                    location.pathname === link.path
                      ? "bg-sky-100 dark:bg-sky-800 hover:bg-sky-200 scale-110"
                      : ""
                  }`}
                >
                  <div
                    className={`flex items-center hover:text-sky-700 p-2 transition ${
                      location.pathname === link.path
                        ? "text-sky-700 dark:text-sky-100"
                        : "text-zinc-600 dark:text-white"
                    }`}
                  >
                    {link.icon && <span className="mr-2">{link.icon}</span>}
                    <span>{link.text}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-200 dark:hover:text-white"
            onClick={handleChangeTheme}
          >
            {themeIcon}
          </button>
          <Dropdown>
            <DropdownTrigger>
              <div className="w-10 h-10 overflow-hidden rounded-full">
                {!isLoading && (
                  <Avatar
                    src={`${data.data.avatar}`}
                    className="object-cover w-full h-full"
                    showFallback
                    fallback={
                      <IoPersonSharp className="w-6 h-6 text-default-500" />
                    }
                  />
                )}
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="edit"
                onClick={handleProfile}
                startContent={<IoSettingsOutline />}
              >
                Editar perfil
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onClick={auth.logout}
                startContent={<IoLogOutOutline />}
              >
                Cerrar Sesion
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Links movil */}
      {isMenuOpen && (
        <div className="py-2 space-y-1 border-t md:hidden">
          {navLinks.map((link, index) => (
            <Link to={link.path}>
              <div
                className={`flex items-center rounded-lg hover:bg-sky-100 dark:hover:bg-sky-600 hover:scale-110 transition ${
                  location.pathname === link.path
                    ? "bg-sky-100 dark:bg-sky-800 hover:bg-sky-200 "
                    : ""
                }`}
              >
                <div
                  className={`flex items-center hover:text-sky-700 p-2 transition ${
                    location.pathname === link.path
                      ? "text-sky-700 dark:text-sky-100"
                      : "text-zinc-600 dark:text-white"
                  }`}
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  <span>{link.text}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
