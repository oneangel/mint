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
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
} from "@nextui-org/react";
import { animals } from "./data";
import {
  IoCalendarOutline,
  IoPieChart,
  IoAddCircle,
  IoCaretDownCircle,
  IoCaretUpCircle,
} from "react-icons/io5";
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
  useGetIncomesList,
  useGetExpensesList,
} from "../hooks/transaction.hooks"; // Asumiendo que tienes estas funciones en transaction.hooks.js

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { isWithinInterval } from "date-fns";
import LargeAreaChart from "../components/charts/LargeAreaChart";

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
    data: incomeListData,
    isLoading: isLoadingIncomeList,
    isError: isErrorIncomeList,
  } = useQuery("incomeList", useGetIncomesList);

  const {
    data: expenseListData,
    isLoading: isLoadingExpenseList,
    isError: isErrorExpenseList,
  } = useQuery("expenseList", useGetExpensesList);

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
  const [transactionType, setTransactionType] = useState(true);
  const itemsPerPage = 4;

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
      toast.dismiss();
      toast.success("Transaccion agregada con exito");
      queryClient.refetchQueries("transactionList");
      queryClient.refetchQueries("totalIncome");
      queryClient.refetchQueries("totalExpense");
      queryClient.refetchQueries("incomeList");
    },

    onError: () => {
      toast.dismiss();
      toast.error("Hubo un error en la operacion");
    },

    onMutate: () => {
      toast.loading("Agregando transaccion...");
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
      queryClient.refetchQueries("incomeList");
      toast.dismiss();
      toast.success("Transaccion eliminada con exito");
    },

    onError: () => {
      toast.dismiss();
      toast.error("¡Hubo un error en la operacion!");
    },

    onMutate: () => {
      toast.loading("Eliminando transaccion...");
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
      queryClient.refetchQueries("incomeList");
      toast.dismiss();
      toast.success("Transaccion actualizada con exito");
    },

    onError: () => {
      toast.dismiss();
      toast.error("¡Hubo un error en la operacion!");
    },

    onMutate: () => {
      toast.loading("Actualizando transaccion...");
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
              <div className="flex flex-wrap justify-center w-full gap-20 mt-6">
                {/* Abonos */}
                {!isLoadingTotalIncome && (
                  <Card className="flex flex-col items-center h-40 w-80 border-1 dark:bg-teal-950 dark:border-teal-800">
                    <CardHeader className="flex gap-3">
                      <IoCaretUpCircle className="text-teal-600 size-10 dark:text-white" />
                      <div className="flex flex-col">
                        <p className="text-md">Total de Abonos</p>
                        <p className="text-small text-default-500">
                          24 de marzo
                        </p>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <p className="mb-4 text-4xl font-semibold">
                        ${totalIncomeData.data.incomeTotal.toFixed(2)}
                      </p>
                    </CardBody>
                  </Card>
                )}

                {/* Cargos */}
                {!isLoadingTotalExpense && (
                  <Card className="flex flex-col items-center h-40 border-1 w-80 dark:bg-red-950 dark:border-red-800">
                    <CardHeader className="flex gap-4">
                      <IoCaretDownCircle className="text-red-500 size-10 dark:text-white" />
                      <div className="flex flex-col">
                        <p className="text-md">Total de cargos</p>
                        <p className="text-small text-default-500">
                          24 de marzo
                        </p>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <p className="mb-4 text-4xl font-semibold">
                        ${totalExpenseData.data.expenseTotal.toFixed(2)}
                      </p>
                    </CardBody>
                  </Card>
                )}
              </div>
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
                  <Skeleton
                    className="w-full rounded-xl"
                    isLoaded={!isLoadingTransactionList}
                  >
                    <Button
                      className="w-full text-xl text-white h-14 bg-sky-700"
                      startContent={
                        <IoAddCircle className="text-white size-6" />
                      }
                      onPress={onOpen}
                      aria-label="Agregar"
                    >
                      Agregar
                    </Button>
                  </Skeleton>

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
                          isDisabled={!isValid}
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
                  <Card>
                    <CardHeader>
                      <p>Lista de las transacciones</p>
                    </CardHeader>
                    <CardBody>
                      <TableCustom
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        columns={columns}
                        data={getPaginatedRows(filteredData)}
                      />
                    </CardBody>
                  </Card>
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
            <Card className="items-center col-span-1">
              <CardHeader className="flex justify-center pt-6">
                <IoPieChart className="size-10" />
                <div className="flex flex-col ml-2">
                  <p className="text-md">Abonos y cargos</p>
                  <p className="text-small text-default-500">Comparacion</p>
                </div>
                <ButtonGroup className="ml-8">
                  <Button
                    className="text-white bg-teal-600"
                    onClick={() => {
                      if (!transactionType) {
                        setTransactionType(!transactionType);
                      }
                    }}
                  >
                    Ingresos
                  </Button>
                  <Button
                    className="text-white bg-red-500"
                    onClick={() => {
                      if (transactionType) {
                        setTransactionType(!transactionType);
                      }
                    }}
                  >
                    Gastos
                  </Button>
                </ButtonGroup>
              </CardHeader>
              <CardBody>
                {!isLoadingIncomeList && incomeListData && (
                  <LargeAreaChart
                    data={
                      transactionType
                        ? incomeListData.data
                        : expenseListData.data
                    }
                    type={transactionType ? "income" : "expense"}
                  />
                )}
              </CardBody>
            </Card>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};
