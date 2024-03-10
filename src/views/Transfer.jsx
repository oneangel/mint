import React from "react";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { animals } from "./data";
import {
  IoSearch,
  IoArrowUpOutline,
  IoArrowDownSharp,
  IoCalendarOutline,
} from "react-icons/io5";

const transactions = [
  { type: "expense", description: "Gimnasio", amount: 50 },
  { type: "income", description: "Alann", amount: 100 },
  { type: "income", description: "Alann", amount: 100 },
];

export const Transfer = () => {
  return (
    <div>
      <NavigationBar />
      <h1 className="pt-10 text-4xl font-semibold pl-20 text-sky-700">
        Transacciones
      </h1>

      <div className="flex w-1/2 h-16 ml-20 mt-10">
        <div className="w-2/5">
          <div className="">
            <Select
              label="Fecha"
              placeholder="Selecciona una fecha"
              startContent={<IoCalendarOutline className="text-sky-600"/>}
              defaultSelectedKeys={["cat"]}
              className="max-w-xs text-xl shadow-xl text-sky-600"
              classNames={{label: "text-xl text-sky-700 "}}
            >
              {animals.map((animal) => (
                <SelectItem key={animal.value} value={animal.value}>
                  {animal.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="bg-white w-3/5">
          <div>
            {" "}
            <Input
              label="Buscar"
              isClearable
              radius="lg"
              classNames={{
                label: "text-black/50 dark:text-white/90 text-xl",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90 text-lg",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-xl",
                  "bg-default-200/50",
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focused=true]:bg-default-200/50",
                  "dark:group-data-[focused=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder="Escribe para buscar..."
              startContent={
                <IoSearch className="text-black/50 mb-1.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
        </div>
      </div>

      {/* transacciones */}
      <div className="w-[20%] items-center justify-between mt-16 ml-20">
        <p>Hoy</p>
        {transactions.map((transaction, index) => (
          <div key={index} className="flex text-lg mt-4">
            <div className="w-1/3 ">
              {transaction.type === "income" ? (
                <IoArrowUpOutline className="text-green-500"/>
              ) : (
                <IoArrowDownSharp className="text-red-500"/>
              )}
            </div>
            <div className="w-1/3">{transaction.description}</div>
            <div className="w-1/3">
              {transaction.type === "income" ? "+" : "-"}${transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
