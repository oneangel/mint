import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  CurrentBalance,
  NavigationBar,
  TransactionHistory,
} from "../components/dashboard/dashboard-components";
import { useGetMeter } from "../hooks/meter.hooks";
import { Skeleton, Card, CardHeader, CardBody } from "@nextui-org/react";
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
import toast, { Toaster } from "react-hot-toast";
import { IoCaretDownCircle } from "react-icons/io5";

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

  useEffect(() => {
    if (isErrorMeter && localStorage.getItem("serial") === null) {
      toast.error("No hay un medidor asociado a la cuenta.");
    }
  }, [meterData]);

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
          <Skeleton
            isLoaded={!isLoadingBalance}
            className="rounded-3xl border-1 dark:bg-zinc-900 dark:border-zinc-800"
          >
            {!isLoadingBalance && <CurrentBalance balance={balanceData} />}
          </Skeleton>

          {/* Abonos */}
          <div className="flex justify-center col-span-1">
            <div className="flex flex-wrap gap-5 md:flex-col">
              <Skeleton
                isLoaded={!isLoadingTotalIncome}
                className="rounded-3xl"
              >
                {!isLoadingTotalIncome && (
                  <Card className="w-80 h-30 flex flex-col items-center shadow-md bg-white md:w-100 rounded-2xl border-1 dark:bg-teal-950 dark:border-teal-800">
                    <CardHeader className="flex gap-4">
                      <IoCaretDownCircle className="w-10 h-10" />
                      <div className="flex flex-col">
                        <p className="text-md">Total de ingresos</p>
                        <p className="text-small text-default-500">
                          24 de marzo
                        </p>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <p className="text-4xl mb-4 font-semibold">
                        ${totalIncomeData.data.incomeTotal.toFixed(2)}
                      </p>
                    </CardBody>
                  </Card>
                )}
              </Skeleton>

              {/* Cargos */}
              <Skeleton
                isLoaded={!isLoadingTotalExpense}
                className="rounded-3xl"
              >
                {!isLoadingTotalExpense && (
                  <Card className="w-80 h-30 flex flex-col items-center shadow-md bg-white md:w-100 rounded-2xl border-1 dark:bg-teal-950 dark:border-teal-800">
                    <CardHeader className="flex gap-4">
                      <IoCaretDownCircle className="w-10 h-10" />
                      <div className="flex flex-col">
                        <p className="text-md">Total de cargos</p>
                        <p className="text-small text-default-500">
                          24 de marzo
                        </p>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <p className="text-4xl mb-4 font-semibold">
                        ${totalExpenseData.data.expenseTotal.toFixed(2)}
                      </p>
                    </CardBody>
                  </Card>
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
              className="shadow-md rounded-3xl border-1 dark:bg-zinc-900 dark:border-zinc-800"
            >
              <div className="bg-white rounded-3xl border-gray-200 w-[100%] h-[400px] dark:bg-zinc-900 dark:border-zinc-800">
                <AreaChart currentData={currWeekData} lastData={lastWeekData} />
              </div>
            </Skeleton>
          </div>

          <Skeleton
            isLoaded={!isLoadingLastTransactions}
            className="rounded-3xl"
          >
            <div className="flex items-center col-span-1 lg:col-span-1 bg-white">
              {!isLoadingLastTransactions && (
                <TransactionHistory
                  transactions={lastTransactionsData.data}
                  isLoading={isLoadingLastTransactions}
                />
              )}
            </div>
          </Skeleton>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
