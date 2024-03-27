import React, { useState } from "react";
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

export const rows = [
  {
    key: "1",
    date: "Marz 25, 2024",
    status: "Abono",
    description: "Chuy",
    amount: "70.00",
  },
  {
    key: "2",
    date: "Marz 18, 2024",
    status: "Cargo",
    description: "Angel",
    amount: "750.00",
  },
  {
    key: "3",
    date: "Marz 17, 2024",
    status: "Cargo",
    description: "Didi Food",
    amount: "365.00",
  },
  {
    key: "4",
    date: "Marz 25, 2024",
    status: "Abono",
    description: "Oxxo",
    amount: "37.00",
  },
  {
    key: "5",
    date: "Marz 25, 2024",
    status: "Abono",
    description: "Oxxo",
    amount: "37.00",
  },
  {
    key: "6",
    date: "Marz 27, 2024",
    status: "Cargo",
    description: "Oxxo",
    amount: "37.00",
  },
  {
    key: "7",
    date: "Marz 27, 2024",
    status: "Abono",
    description: "Oxxo",
    amount: "37.00",
  },
  {
    key: "8",
    date: "Marz 28, 2024",
    status: "Abono",
    description: "Oxxo",
    amount: "37.00",
  },
];

const columns = [
  {
    key: "date",
    label: "Fecha",
  },
  {
    key: "status",
    label: "Estado",
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const getStatusIcon = (status) => {
    if (status === "Abono") {
      return <IoArrowUpOutline className="text-green-500" />;
    } else if (status === "Cargo") {
      return <IoArrowDownSharp className="text-red-500" />;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedRows = rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-sky-50/50">
      <NavigationBar />
      <Skeleton isLoaded={isLoaded} className="rounded-3xl mt-10 ml-20 w-1/6">
        <h1 className="text-4xl font-semibold text-sky-700">Transacciones</h1>
      </Skeleton>

      <div className="flex flex-wrap mx-20">
        {/* left side / table */}
        <div className="w-1/2">
          <div className="flex h-16 mt-10 gap-4">
            <div className="w-1/4">
              <Skeleton isLoaded={isLoaded} className="rounded-xl max-w-xs">
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
              <Skeleton isLoaded={isLoaded} className="rounded-xl w-full">
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
                        {columnKey === "status" && (
                          <div className="flex items-center">
                            {getStatusIcon(item.status)}
                            <span className="ml-1">
                              {getKeyValue(item, columnKey)}
                            </span>
                          </div>
                        )}
                        {columnKey !== "status" && getKeyValue(item, columnKey)}
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
