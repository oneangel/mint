import React, { useState } from "react";
import { useQuery } from "react-query";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { Pagination, Select, SelectItem, Skeleton } from "@nextui-org/react";
import { animals } from "./data";
import { IoCalendarOutline, IoPieChart } from "react-icons/io5";
import PieChart2 from "../components/charts/PieChart2";
import { TableCustom } from "../components/dashboard/TableCustom";
import { SearchBar } from "../components/dashboard/SearchBar";
import {
  getTransactionList,
  getTotalExpense,
  getTotalIncome,
} from "../hooks/transaction.hooks";

const columns = [
  {
    key: "createdAt",
    label: "Fecha",
  },
  {
    key: "type",
    label: "Tipo",
  },
  {
    key: "description",
    label: "Descripción",
  },
  {
    key: "amount",
    label: "Cantidad",
  },
];

export const Transfer = () => {
  const {
    data: transactionListData,
    isLoading: isLoadingTransactionList,
    isError: isErrorTransactionList,
  } = useQuery("transactionList", getTransactionList);

  const {
    data: totalExpenseData,
    isLoading: isLoadingTotalExpense,
    isError: isErrorTotalExpense,
  } = useQuery("totalExpense", getTotalExpense);

  const {
    data: totalIncomeData,
    isLoading: isLoadingTotalIncome,
    isError: isErrorTotalIncome,
  } = useQuery("totalIncome", getTotalIncome);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 7;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedRows = (arr) => {
    return arr.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = transactionListData?.data.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="h-screen bg-sky-50/50">
      <NavigationBar />
      <h1 className="text-4xl pl-20 font-semibold text-sky-700 pt-32">
        Transacciones
      </h1>

      <div className="flex flex-wrap mx-20">
        {/* left side / table */}
        <div className="w-1/2">
          <div className="flex h-16 mt-10 gap-4">
            <div className="w-1/4">
              <Skeleton
                isLoaded={!isLoadingTransactionList}
                className="rounded-xl max-w-xs"
              >
                <Select
                  variant="bordered"
                  startContent={<IoCalendarOutline className="text-sky-700" />}
                  defaultSelectedKeys={["esta-semana"]}
                  className="max-w-xs text-2xl text-sky-600 bg-white"
                  classNames={{
                    value: [
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60 text-xl",
                    ],
                  }}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              </Skeleton>
            </div>

            <div className="w-3/4">
              <Skeleton
                isLoaded={!isLoadingTransactionList}
                className="rounded-xl w-full"
              >
                <SearchBar
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
              </Skeleton>
            </div>
          </div>

          <div className="mt-4">
            {!isLoadingTransactionList && (
              <TableCustom
                columns={columns}
                data={getPaginatedRows(filteredData)}
              />
            )}

            {!isLoadingTransactionList && (
              <Pagination
                showControls
                className="justify-end flex mt-2"
                total={Math.ceil((filteredData?.length || 0) / itemsPerPage)}
                current={currentPage}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>

        {/* Right side / total-graphs */}
        <div className="w-1/2">
          <div className="flex flex-wrap">
            {/* Abonos */}
            {!isLoadingTotalIncome && (
              <div className="w-1/2 h-52">
                <h2 className="text-center text-2xl font-semibold mb-4">
                  Total de Abonos
                </h2>
                <div className="bg-green-50 m-auto h-32 w-80 rounded-3xl flex flex-col justify-center items-center shadow-md border-1">
                  <span className="text-4xl font-semibold text-teal-600">
                    ${totalIncomeData.data.incomeTotal}
                  </span>
                  <p className="text-lg"> a partir de Marzo 25, 2024 </p>
                </div>
              </div>
            )}

            {/* Cargos */}
            {!isLoadingTotalExpense && (
              <div className="w-1/2 h-52">
                <h2 className="text-center text-2xl font-semibold mb-4">
                  Total de Cargos
                </h2>
                <div className="bg-red-50 m-auto h-32 w-80 rounded-3xl flex flex-col justify-center items-center shadow-md border-1">
                  <span className="text-4xl font-semibold text-red-700">
                    ${totalExpenseData.data.expenseTotal}
                  </span>
                  <p className="text-lg"> a partir de Marzo 18, 2024 </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white border-1 m-auto w-3/5 h-[450px] rounded-3xl shadow-md">
            <div className="pt-6 flex justify-center">
              <IoPieChart className="m-0.5 mr-4 text-2xl" />
              <p className="text-xl text-center font-semibold">
                Comparacion de Abonos y Cargos
              </p>
            </div>

            <div>
              {!isLoadingTotalExpense && (
                <PieChart2
                  expenses={totalExpenseData.data.expenseTotal}
                  incomes={totalIncomeData.data.incomeTotal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
