import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Skeleton,
  useDisclosure,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import { useAddGoal, useDeleteGoal, useUpdateGoal } from "../hooks/goal.hooks";
import { useGetGoalsList, useAddAmountGoal } from "../hooks/goal.hooks";
import { transactionService } from "../services/services";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { CurrentBalance } from "../components/dashboard/CurrentBalance";
import { IoAddCircle, IoSearch, IoTrash } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { SearchBar } from "../components/dashboard/SearchBar";

const statusColorMap = {
  true: "success",
  false: "danger",
};

const columns = [
  {
    key: "finalDate",
    label: "Fecha Limite",
  },
  {
    key: "description",
    label: "Descripción",
  },
  {
    key: "amountGoal",
    label: "Meta",
  },
  {
    key: "state",
    label: "Estado",
  },
  {
    key: "acciones",
    label: "Acciones",
  },
];

export const Wallet = () => {
  const { register, handleSubmit } = useForm();
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
  } = useQuery("goals", useGetGoalsList);

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

  const addGoalMutation = useMutation(useAddGoal, {
    onSuccess: () => {
      onClose();
      queryClient.refetchQueries("balance");
      queryClient.refetchQueries("goals");
    },
    onError: () => {
      console.error("Hubo un error en la operacion");
    },
  });

  const deleteGoalMutation = useMutation(useDeleteGoal, {
    onSuccess: () => {
      queryClient.refetchQueries("balance");
      queryClient.refetchQueries("goals");
    },
    onError: () => {
      console.error("¡Hubo un error en la operacion!");
    },
  });

  const updateGoalMutation = useMutation(useUpdateGoal, {
    onSuccess: () => {
      queryClient.refetchQueries("balance");
      queryClient.refetchQueries("goals");
    },
    onError: () => {
      console.error("¡Hubo un error en la operacion!");
    },
  });

  const addAmountGoalMutation = useMutation(useAddAmountGoal, {
    onSuccess: () => {
      queryClient.refetchQueries("balance");
      queryClient.refetchQueries("goals");
    },
    onError: () => {
      console.error("¡Hubo un error en la operacion!");
    },
  });

  const onUpdate = (data) => {
    updateGoalMutation.mutate({ selectedItemId, data });
    setShowEditModal(false);
  };

  const onAdd = (data) => {
    addAmountGoalMutation.mutate({ selectedItemId, data });
    setShowAddAmountModal(false);
  };

  const onDelete = (id) => {
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

  const [showAddAmountModal, setShowAddAmountModal] = useState(false);
  useEffect(() => {
    if (!isLoadingGoals && goalsData) {
      setFilteredData(goalsData.data);
    }
  }, [isLoadingGoals, goalsData]);

  return (
    <div className="h-screen overflow-y-auto bg-sky-50/50 dark:bg-zinc-950">
      <NavigationBar />
      <div className="mt-20 md:mt-32">
        <h1 className="hidden pl-20 text-4xl font-semibold md:flex text-sky-700 dark:text-white">
          Cartera
        </h1>

        <div className="grid flex-wrap grid-cols-1 gap-10 mx-4 xl:grid-cols-3 md:mx-20">
          <div className="flex flex-col pt-10 lg:col-span-1">
            <Skeleton isLoaded={!isLoadingBalance} className="">
              {!isLoadingBalance && <CurrentBalance balance={balanceData} />}
            </Skeleton>

            <Skeleton isLoaded={!isLoadingGoals} className="rounded-3xl">
              <div className="bg-white h-[340px] shadow-md mt-8 rounded-3xl border-2 w-full dark:bg-zinc-900 dark:border-zinc-800">
                <div className="w-3/4 mt-4 text-center">
                  <p className="ml-8 text-xl font-semibold text-start">
                    Meta Seleccionada:{" "}
                    {!isLoadingGoals && !isErrorGoals && (
                      <span className="ml-2 font-normal text-default-700">
                        {selectedGoal.description}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap items-center mx-8 mt-10 mb-5">
                  <div className="flex flex-col w-4/5 mx-auto">
                    <p className="font-semibold text-default-800">
                      Fecha de inicio:
                      {!isLoadingGoals &&
                        !isErrorGoals &&
                        selectedGoal.finalDate && (
                          <span className="ml-2 font-normal text-default-700">
                            {new Date(
                              selectedGoal.finalDate
                            ).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        )}
                    </p>
                    <p className="mt-4 font-semibold text-default-800">
                      Fecha límite:
                      {!isLoadingGoals &&
                        !isErrorGoals &&
                        selectedGoal.finalDate && (
                          <span className="ml-2 font-normal text-default-700">
                            {new Date(
                              selectedGoal.finalDate
                            ).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        )}
                    </p>

                    {!isLoadingGoals && !isErrorGoals && (
                      <p className="mt-10 text-4xl font-semibold text-center text-teal-600">
                        ${selectedGoal.amount}
                      </p>
                    )}
                    {!isLoadingGoals && !isErrorGoals && (
                      <div className="flex mt-4">
                        <Progress
                          size="md"
                          value={selectedGoal.amount}
                          maxValue={selectedGoal.amountGoal}
                          color="success"
                          formatOptions={{ style: "currency", currency: "mxn" }}
                          className="w-64 max-w-md"
                          classNames={{
                            value: "text-default-500",
                            indicator: "bg-teal-600",
                          }}
                        />
                      </div>
                    )}
                    <Button
                      className="mt-6 bg-sky-700"
                      color="primary"
                      onPress={() => setShowAddAmountModal(true)}
                    >
                      Agregar monto
                    </Button>
                  </div>
                </div>
              </div>
            </Skeleton>
          </div>

          <div className="max-h-[400px] mt-10 lg:col-span-2">
            <div className="flex flex-wrap">
              <div className="w-3/4">
                <SearchBar
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
              </div>

              <div className="flex justify-end w-1/4">
                <Button
                  className="w-56 text-xl text-white h-14 bg-sky-700"
                  startContent={<IoAddCircle className="text-white size-6" />}
                  onPress={onOpen}
                >
                  Crear Meta
                </Button>

                <Modal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  aria-label="Crear nueva meta"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Crear nueva meta
                        </ModalHeader>
                        <ModalBody>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                              type="text"
                              label="Descripción"
                              name="description"
                              className="mb-5"
                              {...register("description")}
                            />
                            <Input
                              type="number"
                              name="amountGoal"
                              label="Meta"
                              className="mb-5"
                              {...register("amountGoal")}
                            />
                            <Input
                              type="date"
                              name="finalDate"
                              label="Fecha de meta"
                              placeholder="dd/mm/aaaa"
                              className="mb-5"
                              {...register("finalDate")}
                            />
                          </form>
                        </ModalBody>
                        <ModalFooter>
                          <Button variant="light" onPress={onClose}>
                            Cerrar
                          </Button>
                          <Button
                            color="primary"
                            onPress={handleSubmit(onSubmit)}
                            className="text-white bg-sky-700"
                          >
                            Crear
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </div>

            <div className="mt-4">
              {!isLoadingGoals && (
                <Table
                  className="max-h-[600px]"
                  selectionMode="single"
                  aria-label="Lista de Metas"
                  defaultSelectedKeys={["1"]}
                >
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn
                        key={column.key}
                        className="text-xl text-neutral-800 dark:text-neutral-200"
                      >
                        {column.label}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    items={filteredData.slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )}
                    emptyContent={"No existen metas registradas aún."}
                  >
                    {(item) => (
                      <TableRow
                        key={item.idGoal}
                        onClick={() => {
                          setSelectedGoal(item);
                          setSelectedItemId(item._id);
                        }}
                      >
                        {(columnKey) => (
                          <TableCell className="pt-8 text-xl">
                            {columnKey === "acciones" ? (
                              <div className="relative flex items-center gap-2 ml-4">
                                <Tooltip content="Detalles">
                                  <span className="pt-1 text-2xl cursor-pointer text-default-400 active:opacity-50">
                                    <MdOutlineRemoveRedEye />
                                  </span>
                                </Tooltip>
                                <div
                                  onClick={() => {
                                    setSelectedItemId(item._id);
                                    setShowEditModal(true);
                                    setSelectedItem(item);
                                  }}
                                >
                                  <Tooltip content="Editar" aria-label="Editar">
                                    <span className="text-xl cursor-pointer text-default-400 active:opacity-50">
                                      <FaPen />
                                    </span>
                                  </Tooltip>
                                </div>

                                <div
                                  onClick={() => {
                                    setSelectedItemId(item._id);
                                    setShowDeleteModal(true);
                                  }}
                                >
                                  <Tooltip color="danger" content="Eliminar">
                                    <span className="text-xl cursor-pointer text-danger active:opacity-50">
                                      <IoTrash />
                                    </span>
                                  </Tooltip>
                                </div>
                              </div>
                            ) : columnKey === "state" ? (
                              <Chip
                                className="capitalize"
                                color={statusColorMap[item.state]}
                                size="sm"
                                aria-label="Estado"
                                variant="flat"
                              >
                                {item.state ? "Activo" : "Finalizada"}
                              </Chip>
                            ) : columnKey === "finalDate" ? (
                              item.finalDate ? (
                                <span className="ml-2 font-normal text-default-700">
                                  {new Date(item.finalDate).toLocaleDateString(
                                    undefined,
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              ) : null
                            ) : (
                              getKeyValue(item, columnKey)
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
              <Modal
                isOpen={showEditModal}
                onOpenChange={setShowEditModal}
                aria-label="Actualizar meta"
              >
                <ModalContent>
                  <ModalHeader>Editar Meta</ModalHeader>
                  <ModalBody>
                    <form onSubmit={handleSubmit(onUpdate)}>
                      <Input
                        type="text"
                        label="Descripción"
                        name="description"
                        className="mb-5"
                        defaultValue={selectedItem.description}
                        {...register("description")}
                      />
                      <Input
                        type="number"
                        name="amountGoal"
                        label="Meta"
                        className="mb-5"
                        defaultValue={selectedItem.amountGoal}
                        {...register("amountGoal")}
                      />
                      <Input
                        type="date"
                        name="finalDate"
                        label="Fecha de meta"
                        placeholder="dd/mm/aaaa"
                        className="mb-5"
                        defaultValue={
                          selectedItem.finalDate.toString().split("T")[0]
                        }
                        {...register("finalDate")}
                      />
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => setShowEditModal(false)}
                    >
                      Cancelar
                    </Button>
                    <Button color="primary" onClick={handleSubmit(onUpdate)}>
                      Guardar cambios
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              {/* Modal de eliminación */}
              <Modal
                isOpen={showDeleteModal}
                onOpenChange={setShowDeleteModal}
                aria-label="eliminar Meta"
              >
                <ModalContent>
                  <ModalHeader>Eliminar Meta</ModalHeader>
                  <ModalBody>¿Estás seguro de eliminar esta Meta?</ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      variant="light"
                      onPress={() => setShowDeleteModal(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      color="danger"
                      onPress={() => {
                        onDelete(selectedItemId);
                        setShowDeleteModal(false);
                      }}
                    >
                      Eliminar
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={showAddAmountModal}
                onOpenChange={setShowAddAmountModal}
              >
                <ModalContent>
                  <ModalHeader>Agregar Monto</ModalHeader>
                  <ModalBody>
                    <form action="">
                      <Input
                        type="number"
                        label="Monto"
                        name="amount"
                        className="mb-5"
                        defaultValue={0}
                        {...register("amount")}
                      />
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      variant="light"
                      onPress={() => setShowAddAmountModal(false)}
                    >
                      Cancelar
                    </Button>
                    <Button color="primary" onClick={handleSubmit(onAdd)}>
                      Guardar
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
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
    </div>
  );
};
