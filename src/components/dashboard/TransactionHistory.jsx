import React from "react";
import { IoArrowUpOutline, IoArrowDownSharp } from "react-icons/io5";
import { Skeleton } from "@nextui-org/react";

export const TransactionHistory = ({ transactions }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Skeleton
      isLoaded={isLoaded}
      className="rounded-3xl shadow-md w-[95%] h-[400px]"
    >
      <div className="bg-white rounded-3xl border-1 border-gray-200 h-[400px]">
        <div className="flex justify-between pt-6 px-6">
          <h1 className="text-xl font-semibold">Historial de Transacciones</h1>
          <p className="text-medium font-semibold text-sky-700">Ver Todos</p>
        </div>

        {transactions.slice(0, 3).map((transaction, index) => (
          <div key={index} className="flex flex-wrap px-6 py-3 mt-6">
            <div className="flex items-center w-1/3">
              <div
                className={`flex items-center justify-center mr-4 ${
                  transaction.status === "Abono"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.status === "Abono" ? (
                  <IoArrowDownSharp className="size-8" />
                ) : (
                  <IoArrowUpOutline className="size-8" />
                )}
              </div>
              <div>
                <p className="text-lg font-medium">{transaction.status}</p>
                <p>{transaction.date}</p>
              </div>
            </div>

            <div className="w-1/3 justify-center flex items-center">
              <p>{transaction.description}</p>
            </div>
            <div className="flex items-center justify-end w-1/3">
              <div className="flex flex-wrap items-end">
                <p
                  className={
                    transaction.status === "Abono"
                      ? "text-green-500"
                      : "text-red-600"
                  }
                >
                  {transaction.status === "Abono" ? "+" : "-"}$
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
