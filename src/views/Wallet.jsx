import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { transactionService } from "../services/services";
import { goalHooks } from "../hooks/hooks";
import { useForm } from "react-hook-form";
import { Button, Skeleton, useDisclosure, Pagination } from "@nextui-org/react";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { CurrentBalance } from "../components/dashboard/CurrentBalance";
import { IoAddCircle } from "react-icons/io5";
import { SearchBar } from "../components/dashboard/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import { columns2, inputs2, inputsAdd } from "./data";
import { SelectedGoal } from "../components/dashboard/SelectedGoal";
import { TableCustomW } from "../components/dashboard/TableCustomW";
import { DeleteModal, AddModal, EditModal } from "../components/modals/modals";
import { RiHandCoinFill } from "react-icons/ri";
import { PiPiggyBankFill } from "react-icons/pi";
import { goalSchema, addGoalSchema } from "../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate } from "react-router-dom";

export const Wallet = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched", resolver: zodResolver(goalSchema) });

  const {
    register: control,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorAdd, isValid: isValidAdd },
  } = useForm({ mode: "onTouched", resolver: zodResolver(addGoalSchema) });

  const {
    isOpen: isOpenAA,
    onOpen: onOpenAA,
    onClose: onCloseAA,
  } = useDisclosure();
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

  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    amount: 0,
    description: "",
    amountGoal: "",
    finalDate: "0/0/0",
  });

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

  const {
    data: balanceData,
    isLoading: isLoadingBalance,
    isError: isErrorBalance,
  } = useQuery("balance", getBalance);

  const {
    data: goalsData,
    isLoading: isLoadingGoals,
    isError: isErrorGoals,
  } = useQuery("goals", goalHooks.useGetGoalsList);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setFilteredData(
      goalsData?.data.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  };

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const addGoalMutation = useMutation(goalHooks.useAddGoal, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Meta añadida correctamente");
      onClose();
      queryClient.refetchQueries("balance");
      queryClient.refetchQueries("goals");
      reset();
    },
    onError: () => {
      reset();
      toast.dismiss();
      toast.error("¡Hubo un error en la operacion!");
    },

    onMutate: () => {
      toast.loading("Añadiendo meta...");
    },
  });

  const deleteGoalMutation = useMutation(goalHooks.useDeleteGoal, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Meta eliminada correctamente");
      queryClient.refetchQueries("balance");
      queryClient.refetchQueries("goals");
    },
    onError: () => {
      toast.dismiss();
      toast.error("¡Hubo un error en la operacion!");
      console.error("¡Hubo un error en la operacion!");
    },
    onMutate: () => {
      toast.loading("Eliminando meta...");
    },
  });

  const updateGoalMutation = useMutation(goalHooks.useUpdateGoal, {
    onSuccess: () => {
      reset();
      toast.dismiss();
      toast.success("Meta actualizada correctamente");
      queryClient.refetchQueries("balance");
      queryClient.refetchQueries("goals");
    },
    onError: () => {
      reset();
      toast.dismiss();
      toast.error("¡Hubo un error en la operacion!");
      console.error("¡Hubo un error en la operacion!");
    },
    onMutate: () => {
      toast.loading("Actualizando meta...");
    },
  });

  const addAmountGoalMutation = useMutation(goalHooks.useAddAmountGoal, {
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Monto agregado correctamente");
      queryClient.refetchQueries("balance");
      queryClient.refetchQueries("goals");
      setSelectedGoal(data.data);
    },
    onError: () => {
      toast.dismiss();
      toast.error("¡Hubo un error en la operacion!");
      console.error("¡Hubo un error en la operacion!");
    },
    onMutate: () => {
      toast.loading("Agregando monto...");
    },
  });

  const onUpdate = (data) => {
    updateGoalMutation.mutate({ selectedItemId, data });
    setShowEditModal(false);
  };

  const onAdd = (data) => {
    onCloseAA();
    addAmountGoalMutation.mutateAsync({
      selectedItemId,
      amount: parseFloat(data.amount),
    });
  };

  const onDelete = (id) => {
    onCloseD();
    deleteGoalMutation.mutate(id);
  };

  const onSubmit = (data) => {
    addGoalMutation.mutate(data);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [selectedGoal, setSelectedGoal] = useState({
    description: "Ninguna",
    createdAt: "",
    finalDate: "",
    amount: 0,
    amountGoal: 0,
  });

  const getPaginatedRows = (arr) => {
    return arr.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  };

  useEffect(() => {
    if (!isLoadingGoals && goalsData) {
      setFilteredData(goalsData.data);
    }
  }, [isLoadingGoals, goalsData]);

  if (
    (!isLoadingBalance && isErrorBalance) ||
    (!isLoadingGoals && isErrorGoals)
  ) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="h-screen overflow-y-auto bg-sky-50/50 dark:bg-[#1A1A24]">
      <NavigationBar />
      <div className="mt-20 md:mt-32">
        <h1 className="hidden pl-20 text-4xl font-semibold md:flex text-sky-700 dark:text-white">
          Cartera
        </h1>

        <div className="grid flex-wrap grid-cols-1 gap-10 mx-4 xl:grid-cols-3 md:mx-20">
          <div className="flex flex-col pt-10 lg:col-span-1">
            <Skeleton className="rounded-3xl" isLoaded={!isLoadingBalance}>
              {!isLoadingBalance && <CurrentBalance balance={balanceData} />}
            </Skeleton>
            <Skeleton className="mt-8 rounded-3xl" isLoaded={!isLoadingGoals}>
              {!isLoadingGoals && (
                <SelectedGoal
                  selectedGoal={selectedGoal}
                  setShowAddAmountModal={onOpenAA}
                />
              )}
            </Skeleton>
          </div>

          <div className="max-h-[400px] mt-10 lg:col-span-2">
            <div className="flex flex-wrap">
              <div className="w-3/4">
                <Skeleton className="rounded-2xl" isLoaded={!isLoadingGoals}>
                  <SearchBar
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </Skeleton>
              </div>

              <div className="flex justify-end w-1/4">
                <Skeleton className="rounded-2xl" isLoaded={!isLoadingGoals}>
                  <Button
                    className="w-56 text-xl text-white h-14 bg-sky-700"
                    startContent={<IoAddCircle className="text-white size-6" />}
                    onPress={onOpen}
                  >
                    Crear Meta
                  </Button>
                </Skeleton>
              </div>
            </div>

            <div className="mt-4">
              <Skeleton isLoaded={!isLoadingGoals} className="p-1 rounded-3xl">
                <TableCustomW
                  onOpenD={onOpenD}
                  onOpenU={onOpenU}
                  columns={columns2}
                  data={getPaginatedRows(filteredData)}
                  setSelectedGoal={setSelectedGoal}
                  setSelectedItem={setSelectedItem}
                  setSelectedItemId={setSelectedItemId}
                />
              </Skeleton>

              {/* Modal de actualizacion */}
              <EditModal
                isOpen={isOpenU}
                onClose={onCloseU}
                data={inputs2}
                control={register}
                isValid={!isValid}
                selectedItem={selectedGoal}
                title="Actualizar meta"
                errors={errors}
                onSubmit={handleSubmit(onUpdate)}
              />

              {/* Modal de eliminación */}
              <DeleteModal
                isOpen={isOpenD}
                onClose={onCloseD}
                onDelete={() => onDelete(selectedItemId)}
                title="Estas a punto de eliminar una meta"
                subtitle="Esto eliminara tu meta para siempre"
                type={true}
              />

              <AddModal
                control={control}
                data={inputsAdd}
                isOpen={isOpenAA}
                onClose={onCloseAA}
                isValid={!isValidAdd}
                title="Abonar monto"
                icon={
                  <RiHandCoinFill className="text-teal-600 size-40 dark:text-teal-400" />
                }
                errors={errorAdd}
                onSubmit={handleSubmitAdd(onAdd)}
              />

              <AddModal
                control={register}
                data={inputs2}
                isOpen={isOpen}
                onClose={onClose}
                isValid={!isValid}
                title="Crear meta"
                icon={
                  <PiPiggyBankFill className="text-teal-600 size-40 dark:text-teal-400" />
                }
                errors={errors}
                onSubmit={handleSubmit(onSubmit)}
              />

              {!isLoadingGoals && (
                <Pagination
                  showControls
                  className="flex justify-end mt-2"
                  total={Math.ceil(goalsData.data.length / itemsPerPage)}
                  current={currentPage}
                  onChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
