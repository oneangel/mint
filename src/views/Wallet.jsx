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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import { getTransactionsByRange } from "../utils/transaction.utils";
import { transactionService } from "../services/services";
import { NavigationBar } from "../components/dashboard/NavigationBar";
import { CurrentBalance } from "../components/dashboard/CurrentBalance";
import {
  IoAddCircle,
  IoSearch,
  IoTrash,
  IoPencilSharp,
  IoEye,
  IoEyeOutline,
} from "react-icons/io5";
import { FaPen } from "react-icons/fa";

const statusColorMap = {
  Activo: "success",
  Terminado: "danger",
};

export const rows = [
  {
    key: "1",
    fechalimit: "10/08/24",
    desc: "Chuy",
    status: "Activo",
    goal: "170.00",
  },
  {
    key: "2",
    fechalimit: "10/08/24",
    desc: "Chuy",
    status: "Activo",
    goal: "170.00",
  },
  {
    key: "3",
    fechalimit: "10/08/24",
    desc: "Chuy",
    status: "Terminado",
    goal: "170.00",
  },
];

const columns = [
  {
    key: "fechalimit",
    label: "Fecha Limite",
  },
  {
    key: "desc",
    label: "Descripcion",
  },
  {
    key: "goal",
    label: "Meta",
  },
  {
    key: "status",
    label: "Estado",
  },

  {
    key: "acciones",
    label: "Acciones",
  },
];
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedRows = rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-screen overflow-y-auto bg-sky-50/50">
      <NavigationBar />
      <h1 className="text-4xl font-semibold pl-20 text-sky-700 pt-32">
        Cartera
      </h1>

      <div className="flex flex-wrap mx-20">
        <div className="w-2/5 flex flex-col pt-10 ">
          {/*           <CurrentBalance isLoading={isLoadingBalance} balance={balanceData} />
           */}
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
                  <p className="font-semibold text-default-800 mb-2">
                    {item.descripcion}
                  </p>
                  <div className="flex">
                    <Progress
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

        <div className="w-3/5 max-h-[400px] mt-10">
          <div className="flex flex-wrap">
            <div className="w-3/4">
              <Input
                type="text"
                variant="bordered"
                placeholder="Buscar..."
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
                startContent={<IoSearch className="text-sky-700" />}
              />
            </div>

            <div className="w-1/4 flex justify-end">
              <Button
                className="w-56 h-14 text-xl text-white bg-sky-700"
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
                        <form action="">
                          <Input
                            type="text"
                            label="Descripción"
                            className="mb-5"
                          />
                          <Input type="number" label="Meta" className="mb-5" />
                          <Input
                            type="date"
                            label="Fecha de meta"
                            placeholder="dd/mm/aaaa"
                            className="mb-5"
                          />
                        </form>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="light" onPress={onClose}>
                          Cerrar
                        </Button>
                        <Button
                          color="primary"
                          onPress={onClose}
                          className="bg-sky-700 text-white"
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
                items={paginatedRows}
                emptyContent={"No transacciones aún."}
              >
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell className="text-xl pt-8">
                        {columnKey === "acciones" ? (
                          <div className="relative flex items-center gap-2 ml-4">
                            <Tooltip content="Detalles">
                              <span className="text-2xl pt-1 text-default-400 cursor-pointer active:opacity-50">
                                <IoEyeOutline />
                              </span>
                            </Tooltip>
                            <Tooltip content="Editar">
                              <span className="text-xl text-default-400 cursor-pointer active:opacity-50">
                                <FaPen />
                              </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Eliminar">
                              <span className="text-xl text-danger cursor-pointer active:opacity-50">
                                <IoTrash />
                              </span>
                            </Tooltip>
                          </div>
                        ) : columnKey === "status" ? (
                          <Chip
                            className="capitalize"
                            color={statusColorMap[item.status]}
                            size="sm"
                            variant="flat"
                          >
                            {item.status}
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

            <Pagination
              showControls
              className="justify-end flex mt-2"
              total={Math.ceil(rows.length / itemsPerPage)}
              current={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
