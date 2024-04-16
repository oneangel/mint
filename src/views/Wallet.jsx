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
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
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
import Percentage from "../components/charts/Percentage";
import toast, { Toaster } from "react-hot-toast";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
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
      toast.dismiss();
      toast.success("Meta añadida correctamente");
      onClose();
      queryClient.refetchQueries("balance");
      queryClient.refetchQueries("goals");
    },
    onError: () => {
      toast.dismiss();
      toast.error("¡Hubo un error en la operacion!");
    },

    onMutate: () => {
      toast.loading("Añadiendo meta...");
    },
  });

  const deleteGoalMutation = useMutation(useDeleteGoal, {
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

  const updateGoalMutation = useMutation(useUpdateGoal, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Meta actualizada correctamente");
      queryClient.refetchQueries("balance");
      queryClient.refetchQueries("goals");
    },
    onError: () => {
      toast.dismiss();
      toast.error("¡Hubo un error en la operacion!");
      console.error("¡Hubo un error en la operacion!");
    },
    onMutate: () => {
      toast.loading("Actualizando meta...");
    },
  });

  const addAmountGoalMutation = useMutation(useAddAmountGoal, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Monto agregado correctamente");
      queryClient.refetchQueries("balance");
      queryClient.refetchQueries("goals");
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
            {!isLoadingBalance && <CurrentBalance balance={balanceData} />}
            <Skeleton isLoaded={!isLoadingGoals} className="rounded-3xl">
              <Card className="h-[340px] shadow-md mt-8 rounded-3xl border-2 w-full dark:bg-zinc-900 dark:border-zinc-800">
                {!isLoadingGoals && selectedGoal.description == "Ninguna" && (
                  <CardBody className="flex flex-wrap justify-center gap-5 w-full">
                    <p className="text-xl text-center">
                      No hay ninguna meta seleccionada
                    </p>
                  </CardBody>
                )}
                {!isLoadingGoals && selectedGoal.description != "Ninguna" && (
                  <>
                    <CardHeader className="flex gap-3">
                      <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src="https://res.cloudinary.com/dko2qqtae/image/upload/v1713070509/fcyuvxzpbyqhejtkjxdy.png"
                        width={40}
                      />
                      <div className="flex flex-col">
                        <p className="text-md">Meta seleccionada</p>
                        <p className="text-small text-default-500">
                          {selectedGoal.description}
                        </p>
                      </div>
                      <Button
                        color="primary"
                        radius="full"
                        size="sm"
                        variant="solid"
                        onPress={() => setShowAddAmountModal(true)}
                      >
                        Abonar
                      </Button>
                    </CardHeader>

                    <CardBody className="flex flex-wrap justify-center gap-5 w-full">
                      <div className="w-40 flex flex-col items-left">
                        <Percentage value={200} max={selectedGoal.amountGoal} />
                      </div>
                      <div className="w-90 flex flex-col">
                        <div className="w-60">
                          <p className="text-md text-default-500">
                            •Monto actual:
                          </p>
                          <p className="text-2xl">${selectedGoal.amount}</p>
                          <p>Ultimo abono de 30%</p>
                        </div>
                        <div className="w-60 mt-4">
                          <p className="text-md text-default-500">•Meta:</p>
                          <p className="text-2xl">${selectedGoal.amountGoal}</p>
                          <p>Ultimo abono de 30%</p>
                        </div>
                      </div>
                    </CardBody>
                  </>
                )}
              </Card>
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
                              {...register("description", {
                                required: "el campo es obligatorio",
                              })}
                            />
                            <Input
                              type="number"
                              name="amountGoal"
                              label="Meta"
                              className="mb-5"
                              {...register("amountGoal", {
                                required: "el campo es obligatorio",
                              })}
                            />
                            <Input
                              type="date"
                              name="finalDate"
                              label="Fecha de meta"
                              placeholder="dd/mm/aaaa"
                              className="mb-5"
                              {...register("finalDate", {
                                required: "el campo es obligatorio",
                              })}
                            />
                          </form>
                        </ModalBody>
                        <ModalFooter>
                          <Button variant="light" onPress={onClose}>
                            Cerrar
                          </Button>
                          <Button
                            color="primary"
                            disabled={!isValid}
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
                    <form action="" onSubmit={handleSubmit(onAdd)}>
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
      <Toaster />
    </div>
  );
};
