import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Progress, Skeleton } from "@nextui-org/react";
import { getTransactionsByRange } from "../utils/transaction.utils";
import { transactionService } from "../services/services";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { CurrentBalance } from "../components/dashboard/CurrentBalance";
import AreaChart from "../components/charts/AreaChart";

export const Wallet = () => {
  const useTransactionsByRange = (weeksAgo) => {
    return useQuery(`transactionsByRange${weeksAgo}`, () =>
      getTransactionsByRange(weeksAgo)
    );
  };

  // lista de datos para las barras de progreso
  const progressData = [
    { descripcion: "PC Gamer", value: 5250, maxValue: 17500 },
    { descripcion: "Televisión", value: 6450, maxValue: 6800 },
    { descripcion: "Televisión", value: 6450, maxValue: 6800 },
  ];

  const getBalance = async () => {
    try {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      const res = await transactionService.getBalance(username, token);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getLastTransactions = async () => {
    try {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      const res = await transactionService.getLastTransactions(username, token);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="h-screen overflow-y-auto bg-sky-50/50">
      <NavigationBar />
      <h1 className="text-4xl font-semibold pl-20 text-sky-700 pt-32">
        Cartera
      </h1>

      <div className="flex flex-wrap mx-20">
        <div className="w-2/5 flex flex-col pt-10 ">
          <CurrentBalance isLoading={isLoadingBalance}
                balance={balanceData}/>

          <div className="bg-white h-[400px] shadow-md mt-8 rounded-3xl border-2 w-[480px]">
            <div className="mt-4 w-1/3 text-center">
              <Skeleton isLoaded={true} className="rounded-3xl">
                <p className="text-xl font-semibold">Mis ahorros</p>
              </Skeleton>
            </div>

            <p className="text-end mx-9 text-default-800 font-semibold">Meta</p>

            {/* mapeo para generar las barras de progreso */}
            {progressData.map((item, index) => (
              <div className="flex flex-wrap mx-8 mb-5" key={index}>
                <div className="flex flex-col w-4/5">
                  <p className="font-semibold text-default-800 mb-2">{item.descripcion}</p>
                  <div className="flex">
                    <Progress
                      aria-label="Downloading..."
                      size="sm"
                      value={item.value}
                      maxValue={item.maxValue}
                      color="success"
                      showValueLabel={true}
                      formatOptions={{ style: "currency", currency: "mxn" }}
                      className="max-w-md w-64"
                      classNames={{
                        value: "text-default-500",
                        indicator: "bg-teal-600",
                      }}
                    />
                  </div>
                </div>
                <div className="justify-end flex items-end w-1/5 text-end">
                  <p className="">{`$${item.maxValue.toLocaleString()}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/5 max-h-[400px]">
          <div className="bg-white rounded-3xl border-gray-300 border-1 w-[100%] h-[400px] shadow-md">
            <Skeleton isLoaded={true} className="rounded-3xl ">
              <AreaChart currentData={currWeekData} lastData={lastWeekData} />
            </Skeleton>
          </div>

          <div className="bg-white rounded-3xl border-gray-300 border-1 mt-10 w-[100%] h-[800px] shadow-md">
            <div>
              <h2 className="mt-4 ml-4 text-xl font-semibold">Actividad</h2>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
