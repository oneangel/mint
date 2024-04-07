import React, { useState, useContext } from "react";
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
} from "react-icons/io5";
import { MintIcon } from "../../icons/MintIcon";
import { getClient } from "../../hooks/client.hooks";

export const NavigationBar = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const { data, isLoading, isError } = useQuery("client", getClient);

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
    <nav className="w-screen h-20 max-h-20 shadow-md fixed top-0 left-0 right-0 z-10 bg-white">
      <div className="flex justify-between items-center px-10 md:px-20 h-full">
        <MintIcon className="h-10" />

        {/* Ocultar enlaces en pantallas pequeñas */}
        <ul className="hidden md:flex items-center py-6 font-normal text-xl">
          {/* Map de los enlaces */}
          {navLinks.map((link, index) => (
            <li className="px-6" key={index}>
              <Link to={link.path}>
                <div
                  className={`flex items-center justify-center rounded-lg hover:bg-sky-100 hover:scale-110 transition ${
                    location.pathname === link.path
                      ? "bg-sky-100 hover:bg-sky-200 scale-110"
                      : ""
                  }`}
                >
                  <div
                    className={`flex items-center hover:text-sky-700 p-2 transition ${
                      location.pathname === link.path
                        ? "text-sky-700"
                        : "text-zinc-600"
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
          <ul className="hidden md:flex items-center font-normal text-xl">
            <li className="px-1">
              <Switch
                defaultSelected
                size="lg"
                color="primary"
                thumbIcon={({ isSelected, className }) =>
                  isSelected ? (
                    <SunIcon className={className} />
                  ) : (
                    <MoonIcon className={className} />
                  )
                }
              ></Switch>
            </li>

            <li className="px-3">
              <div className="h-10 w-10 rounded-full bg-zinc-200/80 flex items-center justify-center">
                <IoNotifications className="text-zinc-600" />
              </div>
            </li>

            <li className="px-3">
              <Dropdown>
                <DropdownTrigger>
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    {!isLoading && (
                      <img
                        src={`data:image/png;base64,${data.data.avatar}`}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">
                    <Link to="/transfer"></Link>
                  </DropdownItem>
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
              <ul className="absolute top-16 right-0 bg-white rounded-md shadow-lg py-2">
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
