import React, { useState } from "react";
import { useQuery } from "react-query";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import {
  Input,
  Pagination,
  Select,
  SelectItem,
  Skeleton,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { animals } from "./data";
import {
  IoSearch,
  IoArrowUpOutline,
  IoArrowDownSharp,
  IoCalendarOutline,
  IoPieChart,
} from "react-icons/io5";
import { transactionService } from "../services/services";
import { format } from "date-fns";

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
  const getTransactionList = async () => {
    try {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      const res = await transactionService.getTransactionsList(username, token);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: transactionListData,
    isLoading: isLoadingTransactionList,
    isError: isErrorTransactionList,
  } = useQuery("transactionList", getTransactionList);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const getStatusIcon = (type) => {
    if (type === "income") {
      return <IoArrowUpOutline className="text-green-500" />;
    } else if (type === "expense") {
      return <IoArrowDownSharp className="text-red-500" />;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedRows = (arr) => {
    return arr.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd");
  };

  return (
    <div className="h-screen bg-sky-50/50">
      <NavigationBar />
        <h1 className="text-4xl pl-20 font-semibold text-sky-700 pt-32">Transacciones</h1>


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
                <Input
                  variant="bordered"
                  radius="lg"
                  className="bg-white"
                  classNames={{
                    input: [
                      "text-black/90 dark:text-white/90 text-xl",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-white",
                    inputWrapper: [
                      "dark:bg-default/60",
                      "backdrop-blur-xl",
                      "backdrop-saturate-200",
                      "dark:hover:bg-default/70",
                      "group-data-[focused=true]:bg-default-200/50",
                      "dark:group-data-[focused=true]:bg-default/60",
                      "!cursor-text",
                      "text-2xl",
                    ],
                  }}
                  placeholder="Escribe para buscar la descripción..."
                  startContent={<IoSearch className="text-sky-700" />}
                />
              </Skeleton>
            </div>
          </div>

          <div className="mt-4">
            {!isLoadingTransactionList && (
              <Table className="max-h-[600px]">
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn
                      key={column.key}
                      className="text-xl text-neutral-800"
                    >
                      {column.label}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody
                  items={getPaginatedRows(transactionListData.data)}
                  emptyContent={"No transacciones aún."}
                >
                  {(item) => (
                    <TableRow key={item._id}>
                      {(columnKey) => (
                        <TableCell className="text-xl pt-8">
                          {columnKey === "type" && (
                            <div className="flex items-center">
                              {console.log(item._id)}
                              {getStatusIcon(item.type)}
                              <span className="ml-1">
                                {getKeyValue(
                                  item.type === "income" ? "Ingreso" : "Gasto",
                                  columnKey
                                )}
                              </span>
                            </div>
                          )}

                          {columnKey === "createdAt" && (
                            <span>
                              {formatDate(getKeyValue(item, columnKey))}
                            </span>
                          )}

                          {columnKey != "type" && columnKey != "createdAt" && (
                            <span>{getKeyValue(item, columnKey)}</span>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}

            {!isLoadingTransactionList && (
              <Pagination
                showControls
                className="justify-end flex mt-2"
                total={Math.ceil(
                  transactionListData.data.length / itemsPerPage
                )}
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
            <div className="w-1/2 h-52">
              <h2 className="text-center text-2xl font-semibold mb-4">
                Total de Abonos
              </h2>
              <div className="bg-green-50 m-auto h-32 w-80 rounded-3xl flex flex-col justify-center items-center shadow-md border-1">
                <span className="text-4xl font-semibold text-teal-600">
                  $239.00
                </span>
                <p className="text-lg"> a partir de Marzo 25, 2024 </p>
              </div>
            </div>

            {/* Cargos */}
            <div className="w-1/2 h-52">
              <h2 className="text-center text-2xl font-semibold mb-4">
                Total de Cargos
              </h2>
              <div className="bg-red-50 m-auto h-32 w-80 rounded-3xl flex flex-col justify-center items-center shadow-md border-1">
                <span className="text-4xl font-semibold text-red-700">
                  $2,022.00
                </span>
                <p className="text-lg"> a partir de Marzo 18, 2024 </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-1 m-auto w-3/5 h-[450px] rounded-3xl shadow-md">
            <div className="pt-6 flex justify-center">
              <IoPieChart className="m-0.5 mr-4 text-2xl" />
              <p className="text-xl text-center font-semibold">
                Comparacion de Abonos y Cargos
              </p>
            </div>

            <div>{/* Grafica */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
