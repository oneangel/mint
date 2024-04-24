import React from "react";
import { IoArrowUpOutline, IoArrowDownSharp } from "react-icons/io5";
import { Skeleton } from "@nextui-org/react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export const TransactionHistory = ({ transactions}) => {
  return (
      <div className=" shadow-md w-full dark:border-zinc-800bg-white rounded-3xl border-1 border-gray-200 h-[400px] bg-white dark:bg-[#2C2F42] dark:border-zinc-800 transition">
        <div className="flex justify-between px-6 pt-6">
          <h1 className="text-xl font-semibold">Historial de Transacciones</h1>
          <Link
            className="font-semibold text-medium text-sky-700 dark:text-sky-400"
            to="/transfer"
          >
            Ver Todos
          </Link>
        </div>

        {transactions.map((transaction, index) => (
          <div key={index} className="flex flex-wrap px-6 mt-6">
            <div className="flex items-center w-1/3">
              <div
                className={`flex items-center justify-center mr-4 ${
                  transaction.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.type === "income" ? (
                  <IoArrowDownSharp className="size-8" />
                ) : (
                  <IoArrowUpOutline className="size-8" />
                )}
              </div>
              <div>
                <p className="text-lg font-medium">{transaction.income}</p>
                <p>{format(new Date(transaction.createdAt), "yyyy-MM-dd")}</p>
              </div>
            </div>

            <div className="flex items-center justify-center w-1/3">
              <p>{transaction.description}</p>
            </div>
            <div className="flex items-center justify-end w-1/3">
              <div className="flex flex-wrap items-end">
                <p
                  className={
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-red-600"
                  }
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};
