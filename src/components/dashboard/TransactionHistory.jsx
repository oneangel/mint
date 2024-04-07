import React from "react";
import { IoArrowUpOutline, IoArrowDownSharp } from "react-icons/io5";
import { Skeleton } from "@nextui-org/react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export const TransactionHistory = ({ transactions, isLoading }) => {
  return (
    <Skeleton
      isLoaded={!isLoading}
      className="rounded-3xl shadow-md w-[95%] h-[400px] dark:bg-zinc-900 dark:border-zinc-800"
    >
      <div className="bg-white rounded-3xl border-1 border-gray-200 h-[400px] dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex justify-between pt-6 px-6">
          <h1 className="text-xl font-semibold">Historial de Transacciones</h1>
          <Link
            className="text-medium font-semibold text-sky-700 dark:text-sky-400"
            to="/transfer"
          >
            Ver Todos
          </Link>
        </div>

        {transactions.map((transaction, index) => (
          <div key={index} className="flex flex-wrap px-6 py-3 mt-6">
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

            <div className="w-1/3 justify-center flex items-center">
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
    </Skeleton>
  );
};
