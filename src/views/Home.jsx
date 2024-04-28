import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { transactionHooks, meterHooks } from "../hooks/hooks";
import { getTransactionsByRange } from "../utils/transaction.utils";
import toast, { Toaster } from "react-hot-toast";
import {
  CurrentBalance,
  NavigationBar,
  TransactionHistory,
} from "../components/dashboard/dashboard-components";
import { Skeleton } from "@nextui-org/react";
import { AreaChart } from "../components/charts/charts";
import { TotalCard } from "../components/dashboard/TotalCard";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { logout } = useContext(AuthContext);

  const useTransactionsByRange = (weeksAgo) => {
    return useQuery(`transactionsByRange${weeksAgo}`, () =>
      getTransactionsByRange(weeksAgo)
    );
  };

  const {
    data: meterData,
    isLoading: isLoadingMeter,
    isError: isErrorMeter,
  } = useQuery("meter", meterHooks.useGetMeter);

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
  } = useQuery("balance", transactionHooks.getBalance);

  const {
    data: lastTransactionsData,
    isLoading: isLoadingLastTransactions,
    isError: isErrorLastTransactions,
  } = useQuery("lastTransactions", transactionHooks.getLastTransactions);

  const {
    data: totalExpenseData,
    isLoading: isLoadingTotalExpense,
    isError: isErrorTotalExpense,
  } = useQuery("totalExpenses", transactionHooks.getTotalExpenseByDate);

  const {
    data: totalIncomeData,
    isLoading: isLoadingTotalIncome,
    isError: isErrorTotalIncome,
  } = useQuery("totalIncomes", transactionHooks.getTotalIncomeByDate);

  if (
    (!isLoadingBalance && isErrorBalance) ||
    (!isLoadingLastTransactions && isErrorLastTransactions) ||
    (!isLoadingMeter && isErrorMeter) ||
    (!isLoadingTotalExpense && isErrorTotalExpense) ||
    (!isLoadingTotalIncome && isErrorTotalIncome) ||
    (!isLoadingcurr && isErrorcurr) ||
    (!isLoadinglast && isErrorlast)
  ) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="h-screen overflow-auto bg-sky-50/50 dark:bg-[#1A1A24]">
      <NavigationBar />

      <div className="mt-20 md:mt-32">
        <div className="justify-between hidden mx-20 md:flex">
          <h1 className="text-4xl font-semibold text-sky-700 dark:text-white">
            Inicio
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-10 mx-4 mt-8 md:mx-20 lg:grid-cols-3">
          {/* General Balance */}
          <Skeleton isLoaded={!isLoadingBalance} className="p-1 rounded-3xl">
            {!isLoadingBalance && <CurrentBalance balance={balanceData} />}
          </Skeleton>

          {/* Abonos */}
          <div className="flex justify-center col-span-1">
            <div className="flex flex-wrap justify-center gap-5 md:flex-col">
              <Skeleton
                isLoaded={!isLoadingTotalIncome}
                className="p-1 rounded-3xl"
              >
                {!isLoadingTotalIncome && (
                  <TotalCard
                    title="Total de ingresos"
                    total={totalIncomeData.data.incomeTotal}
                    type="income"
                  />
                )}
              </Skeleton>

              {/* Cargos */}
              <Skeleton
                isLoaded={!isLoadingTotalExpense}
                className="p-1 rounded-3xl"
              >
                {!isLoadingTotalExpense && (
                  <TotalCard
                    title="Total de gastos"
                    total={totalExpenseData.data.expenseTotal}
                    type="expense"
                  />
                )}
              </Skeleton>
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
              className="shadow-md rounded-3xl"
            >
              <div className="bg-white rounded-3xl border-1 border-gray-200 w-[100%] h-[400px] dark:bg-[#2C2F42] dark:border-zinc-800 transition">
                <AreaChart currentData={currWeekData} lastData={lastWeekData} />
              </div>
            </Skeleton>
          </div>
          <Skeleton
            isLoaded={!isLoadingLastTransactions}
            className="p-1 rounded-3xl"
          >
            <div className="flex items-center col-span-1 lg:col-span-1">
              {!isLoadingLastTransactions && (
                <TransactionHistory transactions={lastTransactionsData.data} />
              )}
            </div>
          </Skeleton>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
