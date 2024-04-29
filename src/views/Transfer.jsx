import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import {
  Button,
  Skeleton,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
} from "@nextui-org/react";
import { TableCustom } from "../components/dashboard/TableCustom";
import { SearchBar } from "../components/dashboard/SearchBar";
import { transactionHooks } from "../hooks/hooks";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { isWithinInterval } from "date-fns";
import LargeAreaChart from "../components/charts/LargeAreaChart";
import {
  AddModal,
  DeleteModal,
  EditModal,
  RecoverModal,
} from "../components/modals/modals";
import { TotalCard } from "../components/dashboard/TotalCard";
import { SelectCustom } from "../components/dashboard/SelectCustom";
import { columns, inputs } from "./data";
import { IoAddCircle, IoPieChart } from "react-icons/io5";
import { GiSwapBag } from "react-icons/gi";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, updateGoalSchema } from "../schemas/schemas";

export const Transfer = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched", resolver: zodResolver(transactionSchema) });

  const {
    register: update,
    reset: resetUp,
    handleSubmit: handleUpdate,
    formState: { errors: errorsUp, isValid: isValidUp },
  } = useForm({ mode: "onTouched", resolver: zodResolver(updateGoalSchema) });

  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [transactionType, setTransactionType] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const itemsPerPage = 4;
  const [selectedItem, setSelectedItem] = useState({
    description: "",
    amount: "",
    destination: "",
    createdAt: "",
  });

  const {
    data: transactionListData,
    isLoading: isLoadingTransactionList,
    isError: isErrorTransactionList,
  } = useQuery("transactionList", transactionHooks.getTransactionList);

  const {
    data: incomeListData,
    isLoading: isLoadingIncomeList,
    isError: isErrorIncomeList,
  } = useQuery("incomeList", transactionHooks.useGetIncomesList);

  const {
    data: expenseListData,
    isLoading: isLoadingExpenseList,
    isError: isErrorExpenseList,
  } = useQuery("expenseList", transactionHooks.useGetExpensesList);

  const {
    data: totalExpenseData,
    isLoading: isLoadingTotalExpense,
    isError: isErrorTotalExpense,
  } = useQuery("totalExpense", transactionHooks.getTotalExpense);

  const {
    data: totalIncomeData,
    isLoading: isLoadingTotalIncome,
    isError: isErrorTotalIncome,
  } = useQuery("totalIncome", transactionHooks.getTotalIncome);

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
  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onClose: onCloseD,
  } = useDisclosure();
  const {
    isOpen: isOpenU,
    onOpen: onOpenU,
    onClose: onCloseU,
  } = useDisclosure();
  const {
    isOpen: isOpenR,
    onOpen: onOpenR,
    onClose: onCloseR,
  } = useDisclosure();

  const addTransactionMutation = useMutation(
    transactionHooks.useAddTransaction,
    {
      onSuccess: () => {
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
    }
  );

  const onSubmit = (data) => {
    onClose();
    addTransactionMutation.mutate(data);
  };

  const deleteTransactionMutation = useMutation(
    transactionHooks.useDeleteTransaction,
    {
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
    }
  );

  const onDelete = (id) => {
    onCloseD();
    deleteTransactionMutation.mutate(id);
  };

  const deleteFTransactionMutation = useMutation(
    transactionHooks.useDeleteFTransaction,
    {
      onSuccess: () => {
        queryClient.refetchQueries("transactionList");
        queryClient.refetchQueries("totalIncome");
        queryClient.refetchQueries("totalExpense");
        queryClient.refetchQueries("incomeList");
        toast.dismiss();
        toast.success("Transaccion eliminada para siempre con exito");
      },

      onError: () => {
        toast.dismiss();
        toast.error("¡Hubo un error en la operacion!");
      },

      onMutate: () => {
        toast.loading("Eliminando transaccion...");
      },
    }
  );

  const onDeleteF = (id) => {
    onCloseD();
    deleteFTransactionMutation.mutate(id);
  };

  const recoverTransactionMutation = useMutation(
    transactionHooks.useRecoverTransaction,
    {
      onSuccess: () => {
        queryClient.refetchQueries("transactionList");
        queryClient.refetchQueries("totalIncome");
        queryClient.refetchQueries("totalExpense");
        queryClient.refetchQueries("incomeList");
        toast.dismiss();
        toast.success("Transaccion recuperada con exito");
      },

      onError: () => {
        toast.dismiss();
        toast.error("¡Hubo un error en la operacion!");
      },

      onMutate: () => {
        toast.loading("Recuperando la transaccion...");
      },
    }
  );

  const onRecover = (id) => {
    onCloseR();
    recoverTransactionMutation.mutate(id);
  };

  const updateTransactionMutation = useMutation(
    transactionHooks.useUpdateTransaction,
    {
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
    }
  );

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
      <div className="h-screen overflow-auto bg-sky-50/50 dark:bg-[#1A1A24]">
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
                <Skeleton
                  isLoaded={!isLoadingTotalIncome}
                  className="rounded-3xl"
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
                  className="rounded-3xl"
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
              <div className="grid w-full grid-cols-2 gap-4 mt-10 lg:grid-cols-4">
                <div className="col-span-1 lg:col-span-1">
                  <Skeleton
                    isLoaded={!isLoadingTransactionList}
                    className="max-w-xs rounded-xl"
                  >
                    <SelectCustom handleFilterByDate={handleFilterByDate} />
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

                  <AddModal
                    isOpen={isOpen}
                    onClose={() => {
                      reset();
                      onClose();
                    }}
                    title="Agregar Transaccion"
                    data={inputs}
                    control={register}
                    onSubmit={handleSubmit(onSubmit)}
                    isValid={!isValid}
                    errors={errors}
                    icon={
                      <GiSwapBag className="text-teal-600 size-40 dark:text-teal-400" />
                    }
                  />

                  <DeleteModal
                    onDelete={() => {
                      selectedItem.status
                        ? onDelete(selectedItemId)
                        : onDeleteF(selectedItemId);
                    }}
                    isOpen={isOpenD}
                    onClose={onCloseD}
                    title={
                      selectedItem.status
                        ? "Estas a punto de eliminar una transaccion"
                        : "Estas a punto de eliminar una transaccion para siempre"
                    }
                    subtitle={
                      selectedItem.status
                        ? " Esto eliminara tu transaccion, pero podras recuperarla mas tarde"
                        : " Esto eliminara tu transaccion para siempre"
                    }
                    type={selectedItem.status}
                  />

                  <EditModal
                    isOpen={isOpenU}
                    onClose={() => {
                      resetUp();
                      onCloseU();
                    }}
                    title="Editar Transaccion"
                    data={inputs}
                    selectedItem={selectedItem}
                    control={update}
                    onSubmit={handleUpdate(onUpdate)}
                    isValid={!isValidUp}
                    errors={errorsUp}
                  />

                  <RecoverModal
                    isOpen={isOpenR}
                    onClose={onCloseR}
                    title="Recuperar transaccion"
                    onRecover={() => onRecover(selectedItemId)}
                  />
                </div>
              </div>

              <div className="w-full col-span-1 mt-4">
                <Skeleton
                  isLoaded={!isLoadingTransactionList}
                  className="rounded-3xl"
                >
                  {!isLoadingTransactionList && (
                    <>
                      <Card className="bg-transparent border-0">
                        <CardBody>
                          <TableCustom
                            onOpenD={onOpenD}
                            onOpenU={onOpenU}
                            onOpenR={onOpenR}
                            setSelectedItemId={setSelectedItemId}
                            setSelectedItem={setSelectedItem}
                            columns={columns}
                            data={getPaginatedRows(filteredData)}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                            total={Math.ceil(
                              (filteredData?.length || 0) / itemsPerPage
                            )}
                          />
                        </CardBody>
                      </Card>
                    </>
                  )}
                </Skeleton>
              </div>
            </div>

            {/* Right side / total-graphs */}
            <Skeleton
              isLoaded={!isLoadingTotalIncome}
              className="p-1 rounded-3xl"
            >
              <Card className="items-center col-span-1 shadow-sm border-1 dark:border-zinc-800 dark:bg-[#2C2F42]">
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
            </Skeleton>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};
