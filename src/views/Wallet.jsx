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
import { useGetGoalsList } from "../hooks/goal.hooks";
import { transactionService } from "../services/services";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { CurrentBalance } from "../components/dashboard/CurrentBalance";
import { IoAddCircle, IoSearch, IoTrash } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useAddGoal, useDeleteGoal, useUpdateGoal } from "../hooks/goal.hooks";

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
    label: "Descripcion",
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
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

  const onUpdate = (data) => {
    console.log(selectedItemId);
    console.log(data);
    updateGoalMutation.mutate({ selectedItemId, data });
    setShowEditModal(false);
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

  return (
    <div className="h-screen overflow-y-auto bg-sky-50/50 dark:bg-zinc-950">
      <NavigationBar />
      <h1 className="pt-32 pl-20 text-4xl font-semibold text-sky-700 dark:text-white">
        Cartera
      </h1>

      <div className="flex flex-wrap mx-20">
        <div className="flex flex-col w-2/5 pt-10 ">
          <Skeleton isLoaded={!isLoadingBalance}>
            {!isLoadingBalance && <CurrentBalance balance={balanceData} />}
          </Skeleton>

          <Skeleton isLoaded={!isLoadingGoals} className="rounded-3xl">
            <div className="bg-white h-[340px] shadow-md mt-8 rounded-3xl border-2 w-[480px] dark:bg-zinc-900 dark:border-zinc-800">
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
                  <p className="font-semibold text-default-800 ">
                    Fecha de inicio:
                    {!isLoadingGoals && !isErrorGoals && (
                      <span className="ml-2 font-normal text-default-700">
                        {new Date(selectedGoal.finalDate).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    )}
                  </p>
                  <p className="mt-4 font-semibold text-default-800">
                    Fecha límite:
                    {!isLoadingGoals && !isErrorGoals && (
                      <span className="ml-2 font-normal text-default-700">
                        {new Date(selectedGoal.finalDate).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
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
                    onPress={() => setShowAddAmountModal(true)}
                  >
                    Agregar monto
                  </Button>
                </div>
              </div>
            </div>
          </Skeleton>
        </div>

        <div className="w-3/5 max-h-[400px] mt-10">
          <div className="flex flex-wrap">
            <div className="w-3/4">
              <Input
                type="text"
                variant="bordered"
                placeholder="Buscar..."
                className="bg-white rounded-3xl"
                classNames={{
                  input: [
                    "text-black/90 dark:text-white/90 text-xl",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-white dark:bg-zinc-900",
                  inputWrapper: [
                    "dark:bg-zinc-900",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "dark:hover:border-zinc-500",
                    "group-data-[focused=true]:bg-default-200/50",
                    "dark:group-data-[focused=true]:bg-default/60",
                    "!cursor-text",
                    "text-2xl",
                  ],
                }}
                startContent={<IoSearch className="text-sky-700" />}
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

              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                aria-label="Goals"
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
                  items={goalsData.data.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )}
                  emptyContent={"No metas aún."}
                >
                  {(item) => (
                    <TableRow
                      key={item.idGoal}
                      onClick={() => {
                        setSelectedGoal(item);
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
                                <Tooltip content="Editar">
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
                              variant="flat"
                            >
                              {item.state ? "Activo" : "Inactivo"}
                            </Chip>
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
            <Modal isOpen={showEditModal} onOpenChange={setShowEditModal}>
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
            <Modal isOpen={showDeleteModal} onOpenChange={setShowDeleteModal}>
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
                    <Input type="number" label="Monto" className="mb-5" />
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
                  <Button
                    color="primary"
                    onPress={() => setShowAddAmountModal(false)}
                  >
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
  );
};
