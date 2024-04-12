import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  CurrentBalance,
  NavigationBar,
  TransactionHistory,
} from "../components/dashboard/dashboard-components";
import { useGetMeter } from "../hooks/meter.hooks";
import { Skeleton, CircularProgress } from "@nextui-org/react";
import { PieChart, AreaChart } from "../components/charts/charts";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  getBalance,
  getLastTransactions,
  getTotalExpenseByDate,
  getTotalIncomeByDate,
} from "../hooks/transaction.hooks";
import { getTransactionsByRange } from "../utils/transaction.utils";

export const Home = () => {
  const [month, setMonth] = useState("");

  const useTransactionsByRange = (weeksAgo) => {
    return useQuery(`transactionsByRange${weeksAgo}`, () =>
      getTransactionsByRange(weeksAgo)
    );
  };

  const {
    data: meterData,
    isLoading: isLoadingMeter,
    isError: isErrorMeter,
  } = useQuery("meter", useGetMeter);

  const {
    data: currWeekData,
    isLoading: isLoadingcurr,
    isError: isErrorcurr,
  } = useTransactionsByRange(0);
  const {
    data: lastWeekData,
    isLoading: isLoadinglast,
    isError: isErrorlast,
  } = useTransactionsByRange(1);

  const {
    data: balanceData,
    isLoading: isLoadingBalance,
    isError: isErrorBalance,
  } = useQuery("balance", getBalance);

  const {
    data: lastTransactionsData,
    isLoading: isLoadingLastTransactions,
    isError: isErrorLastTransactions,
  } = useQuery("lastTransactions", getLastTransactions);

  const {
    data: totalExpenseData,
    isLoading: isLoadingTotalExpense,
    isError: isErrorTotalExpense,
  } = useQuery("totalExpenses", getTotalExpenseByDate);

  const {
    data: totalIncomeData,
    isLoading: isLoadingTotalIncome,
    isError: isErrorTotalIncome,
  } = useQuery("totalIncomes", getTotalIncomeByDate);

  useEffect(() => {
    const today = new Date();
    setMonth(format(today, "MMMM", { locale: es }));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="h-screen overflow-auto bg-sky-50/50 dark:bg-zinc-950">
      <NavigationBar />
      <div className="mt-20 md:mt-32">
        <div className="justify-between hidden mx-20 md:flex">
          <h1 className="text-4xl font-semibold text-sky-700 dark:text-white">
            Home
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-10 mx-4 mt-8 md:mx-20 lg:grid-cols-3">
          {/* Gastos generales */}
          <div className="flex items-center w-full col-span-1 bg-white shadow-md rounded-3xl border-1 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="">...</div>
          </div>

          {/* General Balance */}
          {!isLoadingBalance && (
            <CurrentBalance
              balance={balanceData}
              isLoadingBalance={isLoadingBalance}
            />
          )}

          {/* Abonos */}
          <div className="flex justify-center col-span-1">
            <div className="flex flex-wrap gap-5 md:flex-col">
              <div className="flex flex-col items-center">
                <h2 className="mb-2 text-xl font-semibold text-center">
                  Total de Abonos
                </h2>
                <div className="flex flex-col items-center justify-center w-48 h-20 shadow-md bg-green-50 md:w-60 rounded-2xl border-1 dark:bg-teal-950 dark:border-teal-800">
                  {!isLoadingTotalIncome && totalIncomeData && (
                    <span className="text-3xl font-semibold text-teal-600">
                      ${totalIncomeData.data.incomeTotal}
                    </span>
                  )}
                  <p className="text-sm"> a partir de Marzo 25, 2024 </p>
                </div>
              </div>

              {/* Cargos */}
              <div className="flex flex-col items-center md:mt-8">
                <h2 className="mb-2 text-xl font-semibold text-center">
                  Gastos del Mes:{" "}
                  <span className="capitalize text-neutral-600 dark:text-sky-400">
                    {month}
                  </span>
                </h2>
                <div className="flex flex-col items-center justify-center w-48 h-20 shadow-md bg-red-50 md:w-60 rounded-2xl border-1 dark:bg-red-950 dark:border-red-800">
                  <Skeleton isLoaded={!isLoadingTotalExpense}>
                    {!isLoadingTotalExpense && (
                      <span className="text-3xl font-semibold text-red-700 dark:text-red-400">
                        ${totalExpenseData.data.expenseTotal}
                      </span>
                    )}
                  </Skeleton>
                  <p className="text-sm"> a partir de Marzo 18, 2024 </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom side */}
        <div className="grid grid-cols-1 gap-4 mx-4 mt-6 lg:grid-cols-3 md:mx-20">
          <div className="max-h-[400px] col-span-1 lg:col-span-2">
            <Skeleton
              isLoaded={
                !isLoadingcurr && !isLoadinglast && !isErrorcurr && !isErrorlast
              }
              className="shadow-md rounded-3xl border-1 dark:bg-zinc-900 dark:border-zinc-800"
            >
              <div className="bg-white rounded-3xl border-gray-200 w-[100%] h-[400px] dark:bg-zinc-900 dark:border-zinc-800">
                <AreaChart currentData={currWeekData} lastData={lastWeekData} />
              </div>
            </Skeleton>
          </div>
          <div className="flex items-center col-span-1 lg:col-span-1">
            {!isLoadingLastTransactions && (
              <TransactionHistory
                transactions={lastTransactionsData.data}
                isLoading={isLoadingLastTransactions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
