import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../../icons/MoonIcon";
import { SunIcon } from "../../icons/SunIcon";
import {
  IoHome,
  IoNotifications,
  IoSettingsSharp,
  IoSwapVerticalOutline,
  IoWallet,
} from "react-icons/io5";
import { MintIcon } from "../../icons/MintIcon";

export const NavigationBar = () => {
  const location = useLocation();

  return (
    <nav className="w-screen max-h-20 shadow-md">
      <div className="flex justify-between items-center px-10">
        <ul className="flex flex-wrap items-center py-6 font-normal text-xl">
          <MintIcon className="h-10" />
          <li className="px-6 ">
            <Link to="/home">
              <div
                className={`flex items-center justify-center rounded-lg hover:bg-sky-100 hover:scale-110 transition ${
                  location.pathname === "/home"
                    ? "bg-sky-100 hover:bg-sky-200 scale-110"
                    : ""
                }`}
              >
                <div
                  className={`flex items-center hover:text-sky-700 p-2 transition ${
                    location.pathname === "/home" ? "text-sky-700" : "text-zinc-600"
                  }`}
                >
                  <IoHome className="mr-2" />
                  <span>Home</span>
                </div>
              </div>
            </Link>
          </li>
          <li className="px-6">
            <Link to="/transfer">
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
                  <IoSwapVerticalOutline className="mr-2" />
                  <span>Transacción</span>
                </div>
              </div>
            </Link>
          </li>
          <li className="px-6">
            <Link to="/wallet">
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
                  <IoWallet className="mr-2" />
                  <span>Cartera</span>
                </div>
              </div>
            </Link>
          </li>
        </ul>

        <ul className="flex flex-wrap items-center font-normal text-xl">
          <li className="px-3">
            <Switch
              defaultSelected
              size="lg"
              color="secondary"
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
            <div className="h-10 w-10 rounded-full bg-zinc-200/80 flex items-center justify-center">
              <IoSettingsSharp className="text-zinc-600" />
            </div>
          </li>

          <li className="px-3">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/men/36.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
