import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { animals } from "./data";
import { IoCalendarOutline, IoPieChart, IoAddCircle } from "react-icons/io5";
import PieChart2 from "../components/charts/PieChart2";
import { TableCustom } from "../components/dashboard/TableCustom";
import { SearchBar } from "../components/dashboard/SearchBar";
import {
  getTransactionList,
  getTotalExpense,
  getTotalIncome,
  useAddTransaction,
  useDeleteTransaction,
  useUpdateTransaction,
} from "../hooks/transaction.hooks"; // Asumiendo que tienes estas funciones en transaction.hooks.js

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { isWithinInterval } from "date-fns";

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
  {
    key: "acciones",
    label: "Acciones",
  },
];

export const Transfer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const queryClient = useQueryClient();

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
  const [filteredData, setFilteredData] = useState([]);
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
    setFilteredData(
      transactionListData?.data.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  };

  const handleFilterByDate = (startDate, endDate) => {
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);

    if (startDate && endDate) {
      const filteredData = transactionListData?.data.filter((item) =>
        isWithinInterval(new Date(item.createdAt), {
          start: new Date(startDate),
          end: new Date(endDate),
        })
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(transactionListData?.data);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const addTransactionMutation = useMutation(useAddTransaction, {
    onSuccess: () => {
      onClose();
      toast.success("Transaccion agregada con exito");
      queryClient.refetchQueries("transactionList");
      queryClient.refetchQueries("totalIncome");
      queryClient.refetchQueries("totalExpense");
    },

    onError: () => {
      toast.error("Hubo un error en la operacion");
    },
  });

  const onSubmit = (data) => {
    addTransactionMutation.mutate(data);
  };

  const deleteTransactionMutation = useMutation(useDeleteTransaction, {
    onSuccess: () => {
      queryClient.refetchQueries("transactionList");
      queryClient.refetchQueries("totalIncome");
      queryClient.refetchQueries("totalExpense");
    },

    onError: () => {
      toast.error("¡Hubo un error en la operacion!");
    },
  });

  const onDelete = (id) => {
    deleteTransactionMutation.mutate(id);
  };

  const updateTransactionMutation = useMutation(useUpdateTransaction, {
    onSuccess: () => {
      queryClient.refetchQueries("transactionList");
      queryClient.refetchQueries("totalIncome");
      queryClient.refetchQueries("totalExpense");
    },

    onError: () => {
      toast.error("¡Hubo un error en la operacion!");
    },
  });

  const onUpdate = (id, transaction) => {
    updateTransactionMutation.mutate({ id, transaction });
  };

  useEffect(() => {
    if (!isLoadingTransactionList && transactionListData) {
      setFilteredData(transactionListData.data);
    }
  }, [isLoadingTransactionList, transactionListData]);

  return (
    <>
      <div className="h-screen overflow-auto bg-sky-50/50 dark:bg-zinc-950">
        <NavigationBar />
        <div className="mt-20 md:mt-32">
          <h1 className="hidden pl-20 text-4xl font-semibold md:flex text-sky-700 dark:text-white">
            Transacciones
          </h1>
          <div className="grid grid-cols-1 gap-4 mx-4 md:mx-20 md:pt-0 xl:grid-cols-2">
            {/* left side / table */}
            <div className="flex flex-col items-start col-span-1">
              <div className="grid w-full grid-cols-2 gap-4 mt-10 lg:grid-cols-4">
                <div className="col-span-1 lg:col-span-1">
                  <Skeleton
                    isLoaded={!isLoadingTransactionList}
                    className="max-w-xs rounded-xl"
                  >
                    <Select
                      variant="bordered"
                      startContent={
                        <IoCalendarOutline className="text-sky-700" />
                      }
                      defaultSelectedKeys={["esta-semana"]}
                      className="max-w-xs text-2xl bg-white text-sky-600 dark:bg-zinc-900"
                      classNames={{
                        value: [
                          "placeholder:text-default-700/50 dark:placeholder:text-white text-xl",
                        ],
                      }}
                    >
                      {animals.map((animal) => (
                        <SelectItem
                          key={animal.value}
                          value={animal.value}
                          onClick={() =>
                            handleFilterByDate(animal.startDate, animal.endDate)
                          }
                        >
                          {animal.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </Skeleton>
                </div>

                <div className="col-span-1 lg:col-span-2">
                  <Skeleton
                    isLoaded={!isLoadingTransactionList}
                    className="w-full rounded-xl"
                  >
                    <SearchBar
                      searchTerm={searchTerm}
                      handleSearchChange={handleSearchChange}
                    />
                  </Skeleton>
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Button
                    className="w-full text-xl text-white h-14 bg-sky-700"
                    startContent={<IoAddCircle className="text-white size-6" />}
                    onPress={onOpen}
                    aria-label="Agregar"
                  >
                    Agregar
                  </Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                      <ModalHeader className="flex flex-col gap-1">
                        Agregar Transacción
                      </ModalHeader>
                      <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Input
                            type="text"
                            label="Descripción"
                            name="description"
                            className="mb-5"
                            {...register("description", {
                              required: "el campo es onligatorio",
                            })}
                          />
                          <Input
                            type="number"
                            label="Cantidad"
                            name="amount"
                            className="mb-5"
                            {...register("amount", {
                              required: "el campo es onligatorio",
                            })}
                          />
                          <Input
                            type="text"
                            label="Destinatario"
                            name="destination"
                            className="mb-5"
                            description="*A quien esta dirigido el monto"
                            {...register("destination", {
                              required: "el campo es onligatorio",
                            })}
                          />
                          <Input
                            type="date"
                            className="mb-5"
                            {...register("createdAt", {
                              required: "el campo es onligatorio",
                            })}
                          />
                        </form>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          variant="light"
                          onPress={onClose}
                          aria-label="Cerrar"
                        >
                          Cerrar
                        </Button>
                        <Button
                          color="primary"
                          onPress={handleSubmit(onSubmit)}
                          className="text-white bg-sky-700"
                          aria-label="Agregar Transfer"
                          disabled={!isValid}
                        >
                          Agregar
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </div>
              </div>

              <div className="w-full col-span-1 mt-4">
                {!isLoadingTransactionList && (
                  <TableCustom
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    columns={columns}
                    data={getPaginatedRows(filteredData)}
                  />
                )}

                {!isLoadingTransactionList && (
                  <Pagination
                    showControls
                    className="flex justify-end mt-2"
                    total={Math.ceil(
                      (filteredData?.length || 0) / itemsPerPage
                    )}
                    current={currentPage}
                    onChange={handlePageChange}
                  />
                )}
              </div>
            </div>

            {/* Right side / total-graphs */}
            <div className="items-center col-span-1">
              <div className="flex flex-wrap justify-center gap-4">
                {/* Abonos */}
                {!isLoadingTotalIncome && (
                  <div className="flex flex-col items-center">
                    <h2 className="mb-4 text-2xl font-semibold text-center">
                      Total de Abonos
                    </h2>
                    <div className="flex flex-col items-center justify-center h-24 shadow-md w-52 bg-green-50 md:w-60 rounded-2xl border-1 dark:bg-teal-950 dark:border-teal-800">
                      <span className="text-4xl font-semibold text-teal-600 ">
                        ${totalIncomeData.data.incomeTotal}
                      </span>
                      <p className="text-lg text-center">
                        {" "}
                        a partir de Marzo 25, 2024{" "}
                      </p>
                    </div>
                  </div>
                )}

                {/* Cargos */}
                {!isLoadingTotalExpense && (
                  <div className="flex flex-col items-center">
                    <h2 className="mb-4 text-2xl font-semibold text-center">
                      Total de Cargos
                    </h2>
                    <div className="flex flex-col items-center justify-center h-24 shadow-md w-52 bg-red-50 md:w-60 rounded-2xl border-1 dark:bg-red-950 dark:border-red-800">
                      <span className="text-4xl font-semibold text-red-700 dark:text-red-400">
                        ${totalExpenseData.data.expenseTotal}
                      </span>
                      <p className="text-lg text-center">
                        {" "}
                        a partir de Marzo 18, 2024{" "}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full bg-white border-1 m-auto max-w-xl h-[450px] rounded-3xl shadow-md dark:bg-zinc-900 dark:border-zinc-800 mt-20">
                <div className="flex justify-center pt-6">
                  <IoPieChart className="m-0.5 mr-4 text-2xl" />
                  <p className="text-xl font-semibold text-center"></p>
                  Comparacion de Abonos y Cargos
                </div>

                <div>
                  {!isLoadingTotalExpense && !isLoadingTotalIncome && (
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

        <Toaster />
      </div>
    </>
  );
};
