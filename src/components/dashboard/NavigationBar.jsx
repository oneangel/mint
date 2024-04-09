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
} from "@nextui-org/react";
import { MoonIcon } from "../../icons/MoonIcon";
import { SunIcon } from "../../icons/SunIcon";
import {
  IoHome,
  IoNotifications,
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
  const [showMenu, setShowMenu] = useState(false);

  const { data, isLoading, isError } = useQuery("client", getClient);

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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  // Definir la lista de enlaces
  const navLinks = [
    { path: "/home", text: "Home", icon: <IoHome /> },
    { path: "/transfer", text: "Transacción", icon: <IoSwapVerticalOutline /> },
    { path: "/wallet", text: "Cartera", icon: <IoWallet /> },
    { path: "/services", text: "Servicios", icon: <IoSpeedometerSharp /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 w-screen h-20 bg-white shadow-md max-h-20 dark:bg-zinc-900">
      <div className="flex items-center justify-between h-full px-10 md:px-20">
        <MintIcon className="h-10 dark:hidden" />
        <MintIconL className="hidden h-10 dark:block" />

        {/* Ocultar enlaces en pantallas pequeñas */}
        <ul className="items-center hidden py-6 text-xl font-normal md:flex">
          {/* Map de los enlaces */}
          {navLinks.map((link, index) => (
            <li className="px-6" key={index}>
              <Link to={link.path}>
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
            </li>
          ))}
        </ul>

        <div className="flex items-center">
          <ul className="items-center hidden text-xl font-normal md:flex">
            <li className="flex items-center px-3">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full text-zinc-500 hover:text-zinc-800 dark:hover:text-white bg-zinc-200/80 dark:text-zinc-600"
                onClick={handleChangeTheme}
              >
                {themeIcon}
              </button>
            </li>

            <li className="px-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-200/80">
                <IoNotifications className="text-zinc-600" />
              </div>
            </li>

            <li className="px-3">
              <Dropdown>
                <DropdownTrigger>
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    {!isLoading && (
                      <img
                        src={`${data.data.avatar}`}
                        alt="Profile"
                        className="object-cover w-full h-full"
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
            </li>
          </ul>

          <div className="md:hidden">
            <IoMenu className="size-10" onClick={toggleMenu} />
            {showMenu && (
              <ul className="absolute right-0 py-2 bg-white rounded-md shadow-lg top-16 dark:bg-zinc-900">
                {/* Map de los enlaces */}
                {navLinks.map((link, index) => (
                  <li className="px-4 py-2" key={index}>
                    <Link to={link.path}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
