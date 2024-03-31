import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  IoMenu,
  IoSpeedometerSharp
} from "react-icons/io5";
import { MintIcon } from "../../icons/MintIcon";

export const NavigationBar = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Definir la lista de enlaces
  const navLinks = [
    { path: "/home", text: "Home", icon: <IoHome /> },
    { path: "/transfer", text: "Transacción", icon: <IoSwapVerticalOutline /> },
    { path: "/wallet", text: "Cartera", icon: <IoWallet /> },
    { path: "/services", text: "Servicios", icon: <IoSpeedometerSharp /> },
  ];

  return (
    <nav className="w-screen max-h-20 shadow-md fixed top-0 left-0 right-0 z-10 bg-white">
      <div className="flex justify-between items-center px-10">
        <ul className="flex items-center py-6 font-normal text-xl">
          <MintIcon className="h-10" />
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
                    <img
                      src="https://randomuser.me/api/portraits/men/36.jpg"
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">New file</DropdownItem>
                  <DropdownItem key="copy">Copy link</DropdownItem>
                  <DropdownItem key="edit">Edit file</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Delete file
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>

          <div className="md:hidden">
            <IoMenu
              className="h-10 w-10 rounded-full bg-zinc-200/80 flex items-center justify-center"
              onClick={toggleMenu}
            />
            {showMenu && (
              <ul className="absolute top-16 right-0 bg-white rounded-md shadow-lg py-2">
                <li className="px-4 py-2">New file</li>
                <li className="px-4 py-2">Copy link</li>
                <li className="px-4 py-2">Edit file</li>
                <li className="px-4 py-2 text-danger">Delete file</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
